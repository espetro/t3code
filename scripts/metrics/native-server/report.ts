// Pure half of native-server-metrics.ts: the JSON it writes, and how Node vs scriptc
// compare. The live-turn gate is a ratio cap (~2× Node); the other four cases must stay ahead.
import * as Schema from "effect/Schema";

import { loadWarnings, MachineState, median, round } from "../core/report.ts";

/** Same client, two servers. Lower wall and RSS are better. */
export const CASES = ["coldStart", "idle", "replay", "liveTurn", "reconnect"] as const;
export type Case = (typeof CASES)[number];

/** Live-turn wall may reach this multiple of Node; anything above fails the gate. */
export const LIVE_TURN_MAX_RATIO = 2;

export const CaseSample = Schema.Struct({
  wallMs: Schema.Number,
  rssPeakKb: Schema.Number,
});
export type CaseSample = typeof CaseSample.Type;

export const Measured = Schema.Struct({
  machine: Schema.optional(MachineState),
  coldStart: CaseSample,
  idle: CaseSample,
  replay: CaseSample,
  liveTurn: CaseSample,
  reconnect: CaseSample,
  /** Stored events the replay case decoded. Not compared. */
  replayEvents: Schema.optional(Schema.Number),
  /** RPC frames the live-turn case received. Not compared. */
  liveTurnFrames: Schema.optional(Schema.Number),
});
export type Measured = typeof Measured.Type;

export const NativeServerMetrics = Schema.Struct({
  meta: Schema.Struct({
    commit: Schema.optional(Schema.String),
    platform: Schema.String,
    /** `node dist/bin.mjs` or the scriptc binary path this file measured. */
    entry: Schema.String,
    kind: Schema.Literals(["node", "scriptc"]),
    runs: Schema.Number,
    artifactBytes: Schema.Number,
    cpus: Schema.optional(Schema.Number),
  }),
  runs: Schema.Array(Measured),
});
export type NativeServerMetrics = typeof NativeServerMetrics.Type;

/** Darwin wait4 ru_maxrss is bytes; Linux (and this bench's VmHWM samples) are kilobytes. */
export function rssKbFromWait4(ruMaxRss: number, platform: string) {
  return platform === "darwin" ? Math.round(ruMaxRss / 1024) : ruMaxRss;
}

const CASE_METRICS = ["wallMs", "rssPeakKb"] as const;

export function seriesFrom(metrics: NativeServerMetrics) {
  const values = new Map<string, number[]>();
  const add = (metric: string, value: number) => {
    const list = values.get(metric) ?? [];
    list.push(value);
    values.set(metric, list);
  };
  for (const run of metrics.runs) {
    for (const name of CASES) {
      add(`${name}.wallMs`, run[name].wallMs);
      add(`${name}.rssPeakKb`, run[name].rssPeakKb);
    }
  }
  add("artifactBytes", metrics.meta.artifactBytes);
  return values;
}

const isLiveTurnWall = (metric: string) => metric === "liveTurn.wallMs";
const isOtherCaseMetric = (metric: string) =>
  CASES.some(
    (name) => name !== "liveTurn" && CASE_METRICS.some((field) => metric === `${name}.${field}`),
  );

export function compareNativeServer(
  node: NativeServerMetrics,
  scriptc: NativeServerMetrics,
  threshold = 10,
) {
  const warnings = [...loadWarnings("node", node), ...loadWarnings("scriptc", scriptc)];
  if (node.meta.platform !== scriptc.meta.platform) {
    return {
      table: "native-server compare refused: the two files were not measured on the same platform.",
      regressed: [] as string[],
      improved: [] as string[],
      compared: 0,
      warnings: [
        ...warnings,
        `platform mismatch: node ${node.meta.platform}, scriptc ${scriptc.meta.platform}`,
      ],
      liveTurnRatio: null as number | null,
    };
  }
  const a = seriesFrom(node);
  const b = seriesFrom(scriptc);
  const lines = ["| metric | node | scriptc | change | |", "| :-- | --: | --: | --: | :-- |"];
  const regressed: string[] = [];
  const improved: string[] = [];
  let compared = 0;
  let liveTurnRatio: number | null = null;
  for (const metric of [...new Set([...a.keys(), ...b.keys()])].toSorted()) {
    const x = a.get(metric);
    const y = b.get(metric);
    if (!x || !y) {
      lines.push(
        `| ${metric} | ${x ? round(median(x)!, 1) : "–"} | ${y ? round(median(y)!, 1) : "–"} | n/a | |`,
      );
      continue;
    }
    compared++;
    const mx = median(x)!;
    const my = median(y)!;
    const percent = mx === 0 ? (my === 0 ? 0 : Infinity) : ((my - mx) / Math.abs(mx)) * 100;
    const shown = Number.isFinite(percent)
      ? `${percent > 0 ? "+" : ""}${Math.round(percent)}%`
      : "new";
    let verdict = "";
    if (isLiveTurnWall(metric)) {
      liveTurnRatio = mx === 0 ? (my === 0 ? 0 : Infinity) : my / mx;
      if (liveTurnRatio > LIVE_TURN_MAX_RATIO) {
        verdict = `worse, ${round(liveTurnRatio, 2)}× Node (gate ${LIVE_TURN_MAX_RATIO}×)`;
        regressed.push(metric);
      } else if (my < mx) {
        verdict = "better";
        improved.push(metric);
      }
    } else if (isOtherCaseMetric(metric) || metric.endsWith("rssPeakKb")) {
      const limit = Math.max(1, (Math.abs(mx) * threshold) / 100);
      if (my - mx > limit) {
        verdict = "worse";
        regressed.push(metric);
      } else if (mx - my > limit) {
        verdict = "better";
        improved.push(metric);
      }
    }
    lines.push(`| ${metric} | ${round(mx, 1)} | ${round(my, 1)} | ${shown} | ${verdict} |`);
  }
  return { table: lines.join("\n"), regressed, improved, compared, warnings, liveTurnRatio };
}
