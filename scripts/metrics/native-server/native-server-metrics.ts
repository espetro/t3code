#!/usr/bin/env node
// Same RPC peer against `node dist/bin.mjs` and a scriptc binary of that entry.
// No device: `--lib` iOS/Android archives have no RN runtime. Bare invoke prints
// help; compare with `ab` on one machine. See docs/internals/16_performance-regressions.md.
// @effect-diagnostics nodeBuiltinImport:off - wait4/VmHWM peak RSS is a Linux proc file.
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";

import * as NodeHttpClient from "@effect/platform-node/NodeHttpClient";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import * as NodeSocket from "@effect/platform-node/NodeSocket";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as NodeSqliteClient from "@t3tools/shared/nodeSqliteClient";
import { fromJsonStringPretty } from "@t3tools/shared/schemaJson";
import {
  CommandId,
  MessageId,
  ORCHESTRATION_PROTOCOL_QUERY_PARAM,
  ORCHESTRATION_PROTOCOL_VERSION,
  ORCHESTRATION_V2_WS_METHODS,
  type OrchestrationV2ThreadStreamItem,
  ThreadId,
  WsRpcGroup,
} from "@t3tools/contracts";
import * as Console from "effect/Console";
import * as Deferred from "effect/Deferred";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import * as Schema from "effect/Schema";
import * as SqlClient from "effect/sql/SqlClient";
import * as Stream from "effect/Stream";
import { Argument, Command, Flag } from "effect/cli";
import { HttpClient, HttpClientRequest } from "effect/http";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import { RpcClient, RpcSerialization } from "effect/rpc";
import * as Socket from "effect/socket/Socket";

import { run } from "../../scenarios/shell.ts";
import { describeFailure, round } from "../core/report.ts";
import {
  descendantsOf,
  freePort,
  MetricsError,
  nowMs,
  output,
  runAbRounds,
  watchMachine,
} from "../core/run.ts";
import {
  CASES,
  compareNativeServer,
  LIVE_TURN_MAX_RATIO,
  NativeServerMetrics,
  type CaseSample,
  type Measured,
} from "./report.ts";

const PositiveInt = Schema.Int.check(Schema.isGreaterThanOrEqualTo(1));
const DEFAULT_RUNS = 15;
const REPLAY_EVENTS = 3_000;
const encodeMetrics = Schema.encodeEffect(fromJsonStringPretty(NativeServerMetrics));
const decodeMetrics = Schema.decodeUnknownEffect(Schema.fromJsonString(NativeServerMetrics));
const decodeTicket = Schema.decodeUnknownEffect(
  Schema.fromJsonString(Schema.Struct({ ticket: Schema.String })),
);
const TERMINAL_RUN = new Set(["completed", "interrupted", "failed", "cancelled", "rolled_back"]);

const pairingUrlOf = (text: string) => /https?:\/\/\S+\/pair#token=\S+/.exec(text)?.[0];

const childEnv = (baseDir: string): Record<string, string> => ({
  ...Object.fromEntries(
    Object.entries(process.env).filter(
      (entry): entry is [string, string] => entry[1] !== undefined,
    ),
  ),
  T3CODE_HOME: baseDir,
  T3CODE_DEV_SEED: "0",
  OTEL_SDK_DISABLED: "true",
});

/** Linux VmHWM is wait4 ru_maxrss (kB). Darwin `ps -o rss=` is already kB. */
const peakRssKb = (pid: number, platform: string) => {
  if (platform === "linux") {
    try {
      const status = NodeFS.readFileSync(`/proc/${pid}/status`, "utf8");
      const kb = /VmHWM:\s+(\d+)\s+kB/.exec(status)?.[1];
      return kb === undefined ? 0 : Number(kb);
    } catch {
      return 0;
    }
  }
  if (platform === "darwin") {
    try {
      const rss = NodeChildProcess.execFileSync("ps", ["-o", "rss=", "-p", String(pid)], {
        encoding: "utf8",
      });
      return Number(rss.trim()) || 0;
    } catch {
      return 0;
    }
  }
  return 0;
};

const serveArgs = (port: number, baseDir: string) => [
  "serve",
  "--base-dir",
  baseDir,
  "--port",
  `${port}`,
  "--host",
  "127.0.0.1",
];

const spawnServer = Effect.fn("nativeServer.spawn")(function* (options: {
  readonly bin: string;
  readonly launcher: "node" | "direct";
  readonly baseDir: string;
  readonly port: number;
}) {
  const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  const platform = yield* HostProcess.Platform;
  const program = options.launcher === "node" ? process.execPath : options.bin;
  const args =
    options.launcher === "node"
      ? [options.bin, ...serveArgs(options.port, options.baseDir)]
      : serveArgs(options.port, options.baseDir);
  const child = yield* spawner.spawn(
    ChildProcess.make(program, args, {
      cwd: NodePath.dirname(options.bin),
      env: childEnv(options.baseDir),
      extendEnv: false,
      stdin: "ignore",
      stdout: "pipe",
      stderr: "pipe",
    }),
  );
  const pid = Number(child.pid);
  const log = yield* Ref.make("");
  const append = (chunk: string) => Ref.update(log, (text) => (text + chunk).slice(-12_000));
  yield* child.stdout.pipe(
    Stream.decodeText(),
    Stream.runForEach(append),
    Effect.ignore,
    Effect.forkScoped,
  );
  yield* child.stderr.pipe(
    Stream.decodeText(),
    Stream.runForEach(append),
    Effect.ignore,
    Effect.forkScoped,
  );
  yield* Effect.addFinalizer(() =>
    Effect.gen(function* () {
      const spawned = yield* descendantsOf(pid).pipe(Effect.orElseSucceed(() => []));
      yield* child
        .kill({ killSignal: "SIGTERM", forceKillAfter: Duration.seconds(10) })
        .pipe(Effect.timeout(Duration.seconds(15)), Effect.ignore);
      if (spawned.length > 0) yield* output("kill", ["-9", ...spawned.map(String)]);
    }).pipe(Effect.ignore),
  );
  return { child, pid, platform, log, port: options.port, baseDir: options.baseDir };
});

const waitUntilPaired = Effect.fn("nativeServer.waitUntilPaired")(function* (server: {
  readonly log: Ref.Ref<string>;
  readonly port: number;
}) {
  const http = yield* HttpClient.HttpClient;
  const origin = `http://127.0.0.1:${server.port}`;
  const started = yield* nowMs;
  yield* Effect.gen(function* () {
    const text = yield* Ref.get(server.log);
    if (pairingUrlOf(text) === undefined) {
      return yield* new MetricsError({ message: "pairing URL not printed yet" });
    }
    const response = yield* http.execute(HttpClientRequest.get(`${origin}/pair`));
    if (response.status >= 500) {
      return yield* new MetricsError({ message: `/pair answered ${response.status}` });
    }
  }).pipe(
    Effect.retry({ schedule: Schedule.spaced(Duration.millis(100)), times: 3_000 }),
    Effect.timeoutOrElse({
      duration: Duration.seconds(60),
      orElse: () =>
        Ref.get(server.log).pipe(
          Effect.flatMap(
            (text) => new MetricsError({ message: `server never accepted pairing:\n${text}` }),
          ),
        ),
    }),
  );
  return Math.round((yield* nowMs) - started);
});

const issueToken = (baseDir: string, bin: string, launcher: "node" | "direct") =>
  run(
    launcher === "node" ? process.execPath : bin,
    launcher === "node"
      ? [bin, "auth", "session", "issue", "--token-only", "--base-dir", baseDir]
      : ["auth", "session", "issue", "--token-only", "--base-dir", baseDir],
    { cwd: NodePath.dirname(bin), env: childEnv(baseDir), allowExit: [0, 1] },
  ).pipe(
    Effect.flatMap(({ stdout, stderr, exitCode }) => {
      const token = stdout.trim();
      if (exitCode !== 0 || token.length === 0) {
        return Effect.fail(
          new MetricsError({
            message: `auth session issue failed: ${stderr.trim() || stdout.trim()}`,
          }),
        );
      }
      return Effect.succeed(token);
    }),
    Effect.mapError((error) =>
      error._tag === "MetricsError" ? error : new MetricsError({ message: String(error) }),
    ),
  );

const attachPeer = Effect.fn("nativeServer.attachPeer")(function* (options: {
  readonly origin: string;
  readonly token: string;
}) {
  const http = yield* HttpClient.HttpClient;
  const ticketBody = yield* http
    .execute(
      HttpClientRequest.post(`${options.origin}/api/auth/websocket-ticket`).pipe(
        HttpClientRequest.bearerToken(options.token),
      ),
    )
    .pipe(
      Effect.flatMap((response) => response.text),
      Effect.timeoutOrElse({
        duration: Duration.seconds(15),
        orElse: () => new MetricsError({ message: "the WebSocket ticket never arrived" }),
      }),
    );
  const { ticket } = yield* decodeTicket(ticketBody);
  const protocol = yield* Layer.build(
    RpcClient.layerProtocolSocket({}).pipe(
      Layer.provide(
        Socket.layerWebSocket(
          `${options.origin.replace(/^http/, "ws")}/ws?${ORCHESTRATION_PROTOCOL_QUERY_PARAM}=${ORCHESTRATION_PROTOCOL_VERSION}&wsTicket=${encodeURIComponent(ticket)}`,
        ),
      ),
      Layer.provide(RpcSerialization.layerJson),
    ),
  );
  return yield* RpcClient.make(WsRpcGroup).pipe(Effect.provideContext(protocol));
});

const sampleCase = (pid: number, platform: string, wallMs: number): CaseSample => ({
  wallMs,
  rssPeakKb: peakRssKb(pid, platform),
});

const seedReplayEvents = Effect.fn("nativeServer.seedReplay")(function* (
  sqlite: string,
  threadId: string,
  count: number,
) {
  const sql = yield* SqlClient.SqlClient;
  const now = "2026-01-01T00:00:00.000Z";
  yield* sql.withTransaction(
    Effect.forEach(
      Array.from({ length: count }, (_, index) => index),
      (index) => {
        const payload = JSON.stringify({
          id: `item:bench-replay:${index}`,
          type: "command_execution",
          threadId,
          runId: null,
          nodeId: null,
          providerThreadId: null,
          providerTurnId: null,
          nativeItemRef: null,
          parentItemId: null,
          ordinal: index + 1,
          title: "ok",
          status: "completed",
          input: "ok",
          startedAt: now,
          completedAt: now,
          updatedAt: now,
        });
        return sql`
          INSERT INTO orchestration_events (
            event_id, aggregate_kind, stream_id, stream_version, event_type,
            occurred_at, actor_kind, payload_json, metadata_json, application_event_version
          ) VALUES (
            ${`event:bench-replay:${index}`}, 'thread', ${threadId}, ${index + 1},
            'turn-item.updated', ${now}, 'provider', ${payload}, '{}', 2
          )
        `;
      },
      { discard: true },
    ),
  );
});

const subscribeUntilSynchronized = <E, R>(
  stream: Stream.Stream<OrchestrationV2ThreadStreamItem, E, R>,
) =>
  stream.pipe(
    Stream.takeUntil((item) => item.kind === "synchronized"),
    Stream.runCount,
    Effect.timeoutOrElse({
      duration: Duration.seconds(30),
      orElse: () => new MetricsError({ message: "subscribeThread never synchronized" }),
    }),
  );

const runConnected = Effect.fn("nativeServer.connected")(function* (options: {
  readonly origin: string;
  readonly token: string;
  readonly pid: number;
  readonly platform: string;
  readonly sqlite: string;
  readonly replayEvents: number;
}) {
  const client = yield* attachPeer({ origin: options.origin, token: options.token });
  const connectedAt = yield* nowMs;
  const idle = sampleCase(options.pid, options.platform, Math.round((yield* nowMs) - connectedAt));
  const threadId = ThreadId.make("thread:native-server-bench");
  yield* seedReplayEvents(options.sqlite, threadId, options.replayEvents).pipe(
    Effect.provide(NodeSqliteClient.layer({ filename: options.sqlite })),
    Effect.mapError(
      (cause) =>
        new MetricsError({
          message: `replay seed failed: ${describeFailure(cause)}`,
        }),
    ),
  );
  const replayStarted = yield* nowMs;
  yield* subscribeUntilSynchronized(
    client[ORCHESTRATION_V2_WS_METHODS.subscribeThread]({
      threadId,
      afterSequence: 0,
      requestCompletionMarker: true,
    }),
  );
  const replay = sampleCase(
    options.pid,
    options.platform,
    Math.round((yield* nowMs) - replayStarted),
  );

  const liveCount = yield* Ref.make(0);
  const synchronized = yield* Deferred.make<void>();
  const finished = yield* Deferred.make<void>();
  yield* client[ORCHESTRATION_V2_WS_METHODS.subscribeThread]({
    threadId,
    afterSequence: options.replayEvents,
    requestCompletionMarker: true,
  }).pipe(
    Stream.runForEach((item) =>
      Effect.gen(function* () {
        if (item.kind === "synchronized") {
          yield* Deferred.succeed(synchronized, undefined);
          return;
        }
        if (item.kind !== "event") return;
        if (item.event.type === "turn-item.updated") {
          yield* Ref.update(liveCount, (value) => value + 1);
        }
        if (item.event.type === "run.updated" && TERMINAL_RUN.has(item.event.payload.status)) {
          yield* Deferred.succeed(finished, undefined);
        }
      }),
    ),
    Effect.forkScoped,
  );
  yield* Deferred.await(synchronized).pipe(
    Effect.timeoutOrElse({
      duration: Duration.seconds(30),
      orElse: () => new MetricsError({ message: "live subscribeThread never synchronized" }),
    }),
  );
  const liveStarted = yield* nowMs;
  yield* client[ORCHESTRATION_V2_WS_METHODS.dispatchCommand]({
    type: "message.dispatch",
    commandId: CommandId.make("command:native-server-bench"),
    threadId,
    messageId: MessageId.make("message:native-server-bench"),
    text: "Reply with a short coding turn.",
    attachments: [],
    createdBy: "user",
    creationSource: "web",
    dispatchMode: { type: "start_immediately" },
  }).pipe(Effect.ignore);
  yield* Deferred.await(finished).pipe(Effect.timeout(Duration.seconds(30)), Effect.ignore);
  const liveTurn = sampleCase(
    options.pid,
    options.platform,
    Math.round((yield* nowMs) - liveStarted),
  );

  return {
    idle,
    replay,
    liveTurn,
    liveTurnFrames: yield* Ref.get(liveCount),
    replayEvents: options.replayEvents,
  };
});

const runOnce = Effect.fn("nativeServer.runOnce")(function* (options: {
  readonly bin: string;
  readonly launcher: "node" | "direct";
  readonly replayEvents: number;
}) {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const platform = yield* HostProcess.Platform;
  const directory = yield* fs.makeTempDirectoryScoped();
  const baseDir = path.join(directory, "t3");
  yield* fs.makeDirectory(path.join(baseDir, "userdata"), { recursive: true });
  const port = yield* freePort;
  const stopWatching = yield* watchMachine;
  const server = yield* spawnServer({
    bin: options.bin,
    launcher: options.launcher,
    baseDir,
    port,
  });
  const coldStart = sampleCase(server.pid, platform, yield* waitUntilPaired(server));
  const origin = `http://127.0.0.1:${port}`;
  const token = yield* issueToken(baseDir, options.bin, options.launcher);
  const sqlite = path.join(baseDir, "userdata/statev2.sqlite");
  const connected = yield* runConnected({
    origin,
    token,
    pid: server.pid,
    platform,
    sqlite,
    replayEvents: options.replayEvents,
  }).pipe(Effect.scoped);
  const reconnectStarted = yield* nowMs;
  yield* Effect.scoped(
    Effect.gen(function* () {
      const client = yield* attachPeer({ origin, token });
      yield* subscribeUntilSynchronized(
        client[ORCHESTRATION_V2_WS_METHODS.subscribeThread]({
          threadId: ThreadId.make("thread:native-server-bench"),
          afterSequence: 0,
          requestCompletionMarker: true,
        }),
      );
    }),
  );
  const reconnect = sampleCase(server.pid, platform, Math.round((yield* nowMs) - reconnectStarted));
  const machine = yield* stopWatching;
  const measured: Measured = {
    machine,
    coldStart,
    idle: connected.idle,
    replay: connected.replay,
    liveTurn: connected.liveTurn,
    reconnect,
    replayEvents: connected.replayEvents,
    liveTurnFrames: connected.liveTurnFrames,
  };
  return measured;
});

const artifactBytesOf = (bin: string) =>
  Effect.sync(() => {
    try {
      return NodeFS.statSync(bin).size;
    } catch {
      return 0;
    }
  });

const writeMetrics = Effect.fn("nativeServer.write")(function* (
  out: Option.Option<string>,
  metrics: NativeServerMetrics,
) {
  const encoded = yield* encodeMetrics(metrics);
  if (Option.isSome(out)) {
    const fs = yield* FileSystem.FileSystem;
    yield* fs.writeFileString(out.value, encoded);
  }
  yield* Console.log(encoded);
});

const metaFor = Effect.fn("nativeServer.meta")(function* (options: {
  readonly bin: string;
  readonly launcher: "node" | "direct";
  readonly runs: number;
}) {
  const commit = yield* output("git", ["rev-parse", "--short", "HEAD"]);
  const platform = yield* HostProcess.Platform;
  const architecture = yield* HostProcess.Architecture;
  return {
    ...(Option.isSome(commit) ? { commit: commit.value } : {}),
    platform: `${platform}-${architecture}`,
    entry: options.bin,
    kind: (options.launcher === "node" ? "node" : "scriptc") as "node" | "scriptc",
    runs: options.runs,
    artifactBytes: yield* artifactBytesOf(options.bin),
    cpus: NodeOS.cpus().length,
  };
});

const runCommand = Command.make(
  "run",
  {
    bin: Flag.String("bin").pipe(
      Flag.withDescription("Server entry: Node `dist/bin.mjs` or a scriptc binary of that entry."),
    ),
    launcher: Flag.Literals("launcher", ["node", "direct"]).pipe(
      Flag.withDefault("node" as const),
      Flag.withDescription("`node` prefixes the Node runtime; `direct` execs a scriptc binary."),
    ),
    out: Flag.String("out").pipe(Flag.withDescription("JSON file to write."), Flag.optional),
    runs: Flag.Int("runs").pipe(
      Flag.withSchema(PositiveInt),
      Flag.withDefault(DEFAULT_RUNS),
      Flag.withDescription("Independent spawns. Default 15."),
    ),
    replayEvents: Flag.Int("replay-events").pipe(
      Flag.withSchema(PositiveInt),
      Flag.withDefault(REPLAY_EVENTS),
      Flag.withDescription("Stored events the replay case decodes."),
    ),
  },
  Effect.fn("nativeServer.run")(function* (input) {
    const meta = yield* metaFor(input);
    const runs: Measured[] = [];
    for (let index = 0; index < input.runs; index++) {
      yield* Console.error(`run ${index + 1}/${input.runs}: ${input.launcher} ${input.bin}`);
      runs.push(
        yield* runOnce({
          bin: input.bin,
          launcher: input.launcher,
          replayEvents: input.replayEvents,
        }).pipe(Effect.scoped),
      );
    }
    yield* writeMetrics(input.out, { meta, runs });
  }),
).pipe(
  Command.withDescription(
    `Measure one server entry (${CASES.join(", ")}). Default ${DEFAULT_RUNS} runs. Does not compare Node vs scriptc; use ab for that.`,
  ),
);

const printComparison = Effect.fn("nativeServer.printComparison")(function* (
  node: NativeServerMetrics,
  scriptc: NativeServerMetrics,
  threshold: number,
) {
  const { table, regressed, improved, compared, warnings, liveTurnRatio } = compareNativeServer(
    node,
    scriptc,
    threshold,
  );
  yield* Console.log(table);
  if (liveTurnRatio !== null) {
    yield* Console.error(
      `liveTurn wall ratio scriptc/node: ${round(liveTurnRatio, 2)}× (gate ${LIVE_TURN_MAX_RATIO}×)`,
    );
  }
  for (const warning of warnings) yield* Console.error(`Warning: ${warning}`);
  if (compared === 0) {
    return yield* new MetricsError({ message: "the two files share no metric" });
  }
  if (improved.length) yield* Console.error(`Better: ${improved.join(", ")}`);
  if (regressed.length === 0) return;
  yield* Console.error(`Worse: ${regressed.join(", ")}`);
  yield* Effect.sync(() => {
    process.exitCode = 1;
  });
});

const abCommand = Command.make(
  "ab",
  {
    nodeBin: Flag.String("node-bin").pipe(
      Flag.withDescription("Baseline `node dist/bin.mjs` entry."),
    ),
    scriptcBin: Flag.String("scriptc-bin").pipe(
      Flag.withDescription("Candidate scriptc binary of the same entry."),
    ),
    rounds: Flag.Int("rounds").pipe(
      Flag.withSchema(PositiveInt),
      Flag.withDefault(DEFAULT_RUNS),
      Flag.withDescription(
        "A/B rounds; each runs Node and scriptc once, alternating which goes first.",
      ),
    ),
    outDir: Flag.String("out-dir").pipe(
      Flag.withDescription("Directory for node.json and scriptc.json."),
      Flag.withDefault("native-server-metrics-ab"),
    ),
    replayEvents: Flag.Int("replay-events").pipe(
      Flag.withSchema(PositiveInt),
      Flag.withDefault(REPLAY_EVENTS),
    ),
    threshold: Flag.Int("threshold").pipe(
      Flag.withDefault(10),
      Flag.withDescription("Percent a non-live-turn metric must move to count."),
    ),
  },
  Effect.fn("nativeServer.ab")(function* (input) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const outDir = path.resolve(input.outDir);
    yield* fs.makeDirectory(outDir, { recursive: true });
    const sides = [
      { bin: input.nodeBin, launcher: "node" as const, out: path.join(outDir, "node.json") },
      {
        bin: input.scriptcBin,
        launcher: "direct" as const,
        out: path.join(outDir, "scriptc.json"),
      },
    ] as const;
    const metas = [
      yield* metaFor({ ...sides[0], runs: input.rounds }),
      yield* metaFor({ ...sides[1], runs: input.rounds }),
    ];
    yield* runAbRounds({
      rounds: input.rounds,
      outDir,
      runSide: (side) =>
        runOnce({
          bin: sides[side].bin,
          launcher: sides[side].launcher,
          replayEvents: input.replayEvents,
        }).pipe(Effect.scoped),
      save: (side, runs) =>
        encodeMetrics({ meta: metas[side]!, runs }).pipe(
          Effect.flatMap((json) => fs.writeFileString(sides[side].out, json)),
        ),
    });
    yield* printComparison(
      yield* decodeMetrics(yield* fs.readFileString(sides[0].out)),
      yield* decodeMetrics(yield* fs.readFileString(sides[1].out)),
      input.threshold,
    );
  }),
).pipe(
  Command.withDescription(
    `Compare Node vs scriptc on one machine, alternating sides. Live turn must stay under ~${LIVE_TURN_MAX_RATIO}× Node; the other four cases must stay ahead. Do not run this from a default PR check.`,
  ),
);

const compareCommand = Command.make(
  "compare",
  {
    node: Argument.String("node-json").pipe(Argument.withDescription("Node `run --out` file.")),
    scriptc: Argument.String("scriptc-json").pipe(
      Argument.withDescription("scriptc `run --out` file."),
    ),
    threshold: Flag.Int("threshold").pipe(Flag.withDefault(10)),
  },
  Effect.fn("nativeServer.compare")(function* (input) {
    const fs = yield* FileSystem.FileSystem;
    yield* printComparison(
      yield* decodeMetrics(yield* fs.readFileString(input.node)),
      yield* decodeMetrics(yield* fs.readFileString(input.scriptc)),
      input.threshold,
    );
  }),
).pipe(
  Command.withDescription(
    `Print the Node vs scriptc table and exit 1 when live turn exceeds ~${LIVE_TURN_MAX_RATIO}× Node or another case falls behind.`,
  ),
);

const nativeServerCommand = Command.make("native-server-metrics").pipe(
  Command.withDescription(
    `Same client, two servers (Node vs scriptc). No device. Never builds iOS/Android --lib archives.

Cases: ${CASES.join(", ")}. Live turn gate: under ~${LIVE_TURN_MAX_RATIO}× Node, the other four ahead.
Trust ab on one machine. Running this binary with no subcommand prints help and measures nothing.`,
  ),
  Command.withSubcommands([runCommand, abCommand, compareCommand]),
);

if (import.meta.main) {
  Command.run(nativeServerCommand, { version: "0.0.0" }).pipe(
    Effect.provide(
      Layer.mergeAll(
        NodeServices.layer,
        NodeHttpClient.layerUndici,
        NodeSocket.layerWebSocketConstructor,
      ),
    ),
    Effect.catchTags({
      MetricsError: (error) =>
        Console.error(`native-server-metrics: ${error.message}`).pipe(
          Effect.andThen(
            Effect.sync(() => {
              process.exitCode = 1;
            }),
          ),
        ),
    }),
    NodeRuntime.runMain,
  );
}
