import { describe, expect, it } from "vite-plus/test";

import {
  compareNativeServer,
  LIVE_TURN_MAX_RATIO,
  rssKbFromWait4,
  seriesFrom,
  type Measured,
  type NativeServerMetrics,
} from "./report.ts";

const sample = (wallMs: number, rssPeakKb: number) => ({ wallMs, rssPeakKb });
const measured = (values: {
  readonly coldStart?: number;
  readonly idle?: number;
  readonly replay?: number;
  readonly liveTurn?: number;
  readonly reconnect?: number;
  readonly rss?: number;
}): Measured => {
  const rss = values.rss ?? 80_000;
  const wall = (value: number | undefined, fallback: number) => sample(value ?? fallback, rss);
  return {
    coldStart: wall(values.coldStart, 400),
    idle: wall(values.idle, 50),
    replay: wall(values.replay, 200),
    liveTurn: wall(values.liveTurn, 300),
    reconnect: wall(values.reconnect, 80),
  };
};

const file = (
  kind: "node" | "scriptc",
  runs: ReadonlyArray<Measured>,
  artifactBytes = 40_000_000,
): NativeServerMetrics => ({
  meta: {
    platform: "linux-x64",
    entry: kind === "node" ? "apps/server/dist/bin.mjs" : "apps/server/dist/t3",
    kind,
    runs: runs.length,
    artifactBytes,
  },
  runs: [...runs],
});

describe("rssKbFromWait4", () => {
  it("keeps Linux wait4 ru_maxrss as kilobytes", () => {
    expect(rssKbFromWait4(12_345, "linux")).toBe(12_345);
  });

  it("converts Darwin wait4 ru_maxrss from bytes", () => {
    expect(rssKbFromWait4(12_345 * 1024, "darwin")).toBe(12_345);
  });
});

describe("compareNativeServer", () => {
  const node = file("node", [measured({ liveTurn: 100 }), measured({ liveTurn: 110 })]);

  it("fails live turn past ~2× Node even when the other cases stay ahead", () => {
    const scriptc = file("scriptc", [
      measured({ liveTurn: 250, coldStart: 300, idle: 40, replay: 150, reconnect: 60 }),
      measured({ liveTurn: 260, coldStart: 310, idle: 40, replay: 150, reconnect: 60 }),
    ]);
    const result = compareNativeServer(node, scriptc);
    expect(result.liveTurnRatio).toBeGreaterThan(LIVE_TURN_MAX_RATIO);
    expect(result.regressed).toContain("liveTurn.wallMs");
    expect(result.regressed.some((metric) => metric.startsWith("coldStart"))).toBe(false);
  });

  it("passes live turn under ~2× Node when the other four cases are ahead", () => {
    const scriptc = file("scriptc", [
      measured({ liveTurn: 150, coldStart: 200, idle: 30, replay: 100, reconnect: 40 }),
      measured({ liveTurn: 160, coldStart: 210, idle: 30, replay: 100, reconnect: 40 }),
    ]);
    const result = compareNativeServer(node, scriptc);
    expect(result.liveTurnRatio).toBeLessThanOrEqual(LIVE_TURN_MAX_RATIO);
    expect(result.regressed).toEqual([]);
    expect(result.improved).toContain("coldStart.wallMs");
    expect(result.improved).toContain("replay.wallMs");
  });

  it("fails when a non-live case falls behind Node", () => {
    const scriptc = file("scriptc", [
      measured({ liveTurn: 100, replay: 400 }),
      measured({ liveTurn: 110, replay: 420 }),
    ]);
    const result = compareNativeServer(node, scriptc);
    expect(result.regressed).toContain("replay.wallMs");
  });

  it("refuses files from different platforms", () => {
    const scriptc = {
      ...file("scriptc", [measured({}), measured({})]),
      meta: { ...file("scriptc", [measured({})]).meta, platform: "darwin-arm64", runs: 2 },
    };
    const result = compareNativeServer(node, scriptc);
    expect(result.compared).toBe(0);
    expect(result.warnings.some((warning) => warning.includes("platform mismatch"))).toBe(true);
  });
});

describe("seriesFrom", () => {
  it("records one sample per run for each case", () => {
    const values = seriesFrom(file("node", [measured({ liveTurn: 1 }), measured({ liveTurn: 3 })]));
    expect(values.get("liveTurn.wallMs")).toEqual([1, 3]);
    expect(values.get("artifactBytes")).toEqual([40_000_000]);
  });
});
