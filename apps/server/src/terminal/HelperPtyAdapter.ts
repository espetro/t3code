import * as NodeChildProcess from "node:child_process";

import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as HostProcess from "@t3tools/shared/HostProcess";

import * as PtyAdapter from "@t3tools/shared/PtyAdapter";
import {
  FrameDecoder,
  Request,
  Response,
  encodeKill,
  encodeResize,
  encodeSpawn,
  frame,
} from "./fancyPtyProtocol.ts";

const HELPER_BASENAME = "fancy-pty-helper";

export function fancyPtyHelperFileName(platform: NodeJS.Platform): string {
  return platform === "win32" ? `${HELPER_BASENAME}.exe` : HELPER_BASENAME;
}

/** Lookup for the fancy-pty helper shipped next to the native server executable. */
export function fancyPtyHelperCandidates(input: {
  readonly execPath: string;
  readonly platform: NodeJS.Platform;
  readonly architecture: string;
  readonly join: (...parts: ReadonlyArray<string>) => string;
  readonly dirname: (filePath: string) => string;
}): ReadonlyArray<string> {
  const fileName = fancyPtyHelperFileName(input.platform);
  const execDir = input.dirname(input.execPath);
  const platformKey = `${input.platform}-${input.architecture}`;
  return [
    input.join(execDir, fileName),
    input.join(execDir, "bin", platformKey, fileName),
    input.join(execDir, "pty", fileName),
  ];
}

type HelperSpawner = (helperPath: string) => NodeChildProcess.ChildProcessWithoutNullStreams;

const spawnHelperProcess: HelperSpawner = (helperPath) =>
  NodeChildProcess.spawn(helperPath, [], {
    stdio: ["pipe", "pipe", "pipe"],
    windowsHide: true,
  }) as NodeChildProcess.ChildProcessWithoutNullStreams;

export const HelperPtySpawnerRef = Context.Reference<HelperSpawner>(
  "server/terminal/HelperPtySpawner",
  { defaultValue: () => spawnHelperProcess },
);

export const HelperPtyHelperPathRef = Context.Reference<string | undefined>(
  "server/terminal/HelperPtyHelperPath",
  { defaultValue: () => undefined },
);

const resolveHelperPath = Effect.fn("HelperPtyAdapter.resolveHelperPath")(function* (input: {
  readonly override: string | undefined;
  readonly fs: FileSystem.FileSystem;
  readonly path: Path.Path;
  readonly execPath: string;
  readonly platform: NodeJS.Platform;
  readonly architecture: string;
}) {
  if (input.override !== undefined) return input.override;
  const candidates = fancyPtyHelperCandidates({
    execPath: input.execPath,
    platform: input.platform,
    architecture: input.architecture,
    join: input.path.join,
    dirname: input.path.dirname,
  });
  for (const candidate of candidates) {
    if (yield* input.fs.exists(candidate).pipe(Effect.orElseSucceed(() => false))) return candidate;
  }
  return yield* new PtyAdapter.PtySpawnError({
    adapter: "fancy-pty-helper",
    cause: new Error(
      `fancy-pty helper not found beside ${input.execPath}. Looked in: ${candidates.join(", ")}.`,
    ),
  });
});

class HelperPtyProcess implements PtyAdapter.PtyProcess {
  private childPid: number | undefined;
  private exitEvent: PtyAdapter.PtyExitEvent | undefined;
  private readonly dataListeners = new Set<(data: string) => void>();
  private readonly exitListeners = new Set<(event: PtyAdapter.PtyExitEvent) => void>();

  constructor(
    private readonly child: NodeChildProcess.ChildProcessWithoutNullStreams,
    private readonly platform: NodeJS.Platform,
  ) {
    const decoder = new FrameDecoder();
    child.stdout.on("data", (chunk: Buffer) => {
      let frames;
      try {
        frames = decoder.push(chunk);
      } catch {
        this.finishExit({ exitCode: 1, signal: null });
        child.kill();
        return;
      }
      for (const decoded of frames) {
        if (decoded.kind === Response.Data) {
          const text = decoded.payload.toString("utf8");
          for (const listener of this.dataListeners) listener(text);
        } else if (decoded.kind === Response.Pid && decoded.payload.length >= 4) {
          this.childPid = decoded.payload.readUInt32LE(0);
        } else if (decoded.kind === Response.Exit || decoded.kind === Response.Killed) {
          this.finishExit({
            exitCode: decoded.payload.length >= 4 ? decoded.payload.readUInt32LE(0) : 1,
            signal: null,
          });
        } else if (decoded.kind === Response.Error) {
          this.finishExit({ exitCode: 1, signal: null });
        }
      }
    });
    child.stdin.on("error", () => {});
    child.on("close", (code) => {
      this.finishExit({ exitCode: code ?? 1, signal: null });
    });
  }

  private finishExit(event: PtyAdapter.PtyExitEvent) {
    if (this.exitEvent) return;
    this.exitEvent = event;
    for (const listener of this.exitListeners) listener(event);
    this.exitListeners.clear();
  }

  private send(payload: Buffer): boolean {
    const stdin = this.child.stdin;
    if (this.exitEvent || stdin.destroyed || !stdin.writable) return false;
    stdin.write(payload);
    return true;
  }

  get pid(): number {
    return this.childPid ?? this.child.pid ?? 0;
  }

  write(data: string | Buffer): void {
    this.send(frame(Request.Data, Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8")));
  }

  resize(cols: number, rows: number): void {
    this.send(frame(Request.Resize, encodeResize(cols, rows)));
  }

  kill(signal?: string): void {
    this.send(frame(Request.Kill, encodeKill()));
    if (this.platform !== "win32" && signal !== undefined) {
      this.child.kill(signal as NodeJS.Signals);
    }
  }

  onData(callback: (data: string) => void): () => void {
    this.dataListeners.add(callback);
    return () => {
      this.dataListeners.delete(callback);
    };
  }

  onExit(callback: (event: PtyAdapter.PtyExitEvent) => void): () => void {
    if (this.exitEvent) {
      callback(this.exitEvent);
      return () => {};
    }
    this.exitListeners.add(callback);
    return () => {
      this.exitListeners.delete(callback);
    };
  }
}

const make = Effect.fn("HelperPtyAdapter.make")(function* () {
  const spawnHelper = yield* HelperPtySpawnerRef;
  const platform = yield* HostProcess.Platform;
  const helperInput = {
    override: yield* HelperPtyHelperPathRef,
    fs: yield* FileSystem.FileSystem,
    path: yield* Path.Path,
    execPath: yield* HostProcess.ExecutablePath,
    platform,
    architecture: yield* HostProcess.Architecture,
  };

  return PtyAdapter.PtyAdapter.of({
    spawn: Effect.fn("HelperPtyAdapter.spawn")(function* (input) {
      const helperPath = yield* resolveHelperPath(helperInput);
      const env =
        platform === "win32" && input.env["TERM"] === undefined
          ? { ...input.env, TERM: "xterm-256color" }
          : input.env;
      const argv = [input.shell, ...(input.args ?? [])];
      const spawnFrame = frame(
        Request.Spawn,
        encodeSpawn({
          argv,
          cwd: input.cwd,
          env,
          cols: input.cols,
          rows: input.rows,
        }),
      );
      const child = yield* Effect.try({
        try: () => spawnHelper(helperPath),
        catch: (cause) =>
          new PtyAdapter.PtySpawnError({
            adapter: "fancy-pty-helper",
            shell: input.shell,
            cause,
          }),
      });
      const process = new HelperPtyProcess(child, platform);
      if (!child.stdin.write(spawnFrame)) {
        child.kill();
        return yield* new PtyAdapter.PtySpawnError({
          adapter: "fancy-pty-helper",
          shell: input.shell,
          cause: new Error("fancy-pty helper stdin closed before spawn."),
        });
      }
      return process;
    }),
  });
});

export const layer = Layer.effect(PtyAdapter.PtyAdapter, make());
