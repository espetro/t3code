import * as NodeChildProcess from "node:child_process";
import * as NodeReadline from "node:readline";

const HANDLE = Symbol("playwrightSidecarHandle");

export interface PlaywrightSidecarLaunch {
  readonly nodePath: string;
  readonly driverPath: string;
}

/** Packaged: beside the native executable. Dev: the driver next to this module. */
export function playwrightSidecarDriverCandidates(input: {
  readonly execDir: string;
  readonly moduleDir: string;
  readonly source: boolean;
  readonly join: (...parts: ReadonlyArray<string>) => string;
}): ReadonlyArray<string> {
  return [
    input.join(input.execDir, "playwright-sidecar.mjs"),
    input.join(input.execDir, "playwright-sidecar.js"),
    input.join(input.moduleDir, input.source ? "playwrightSidecar.ts" : "playwrightSidecar.mjs"),
  ];
}

type Pending = {
  resolve: (value: unknown) => void;
  reject: (cause: unknown) => void;
};

export interface PlaywrightSidecar {
  readonly chromium: {
    launch: (...args: Array<unknown>) => Promise<unknown>;
    launchPersistentContext: (...args: Array<unknown>) => Promise<unknown>;
    connectOverCDP: (...args: Array<unknown>) => Promise<unknown>;
  };
  stubWorkerBadges(target: unknown): Promise<void>;
  close(): void;
}

export function launchPlaywrightSidecar(launch: PlaywrightSidecarLaunch): PlaywrightSidecar {
  const args = launch.driverPath.endsWith(".ts")
    ? ["--experimental-strip-types", launch.driverPath]
    : [launch.driverPath];
  const child = NodeChildProcess.spawn(launch.nodePath, args, {
    stdio: ["pipe", "pipe", "pipe"],
    windowsHide: true,
  });
  const pending = new Map<number, Pending>();
  const listeners = new Map<string, Set<(...args: Array<unknown>) => void>>();
  let nextId = 1;

  const failAll = (cause: unknown) => {
    for (const waiter of pending.values()) waiter.reject(cause);
    pending.clear();
  };

  child.stdin.on("error", () => {});
  child.on("error", (cause) => failAll(cause));
  child.on("exit", (code) =>
    failAll(new Error(`Playwright sidecar exited${code === null ? "" : ` (code ${code})`}.`)),
  );

  const rpc = {
    proxy(handle: number): unknown {
      const target = Object.assign(() => undefined, { [HANDLE]: handle });
      return new Proxy(target, {
        get: (_obj, prop) => {
          if (prop === HANDLE) return handle;
          if (prop === "then") return undefined;
          if (typeof prop === "symbol") return undefined;
          if (prop === "on" || prop === "once") {
            return (event: string, listener: (...listenerArgs: Array<unknown>) => void) => {
              const key = `${handle}:${event}`;
              const set = listeners.get(key) ?? new Set();
              set.add(listener);
              listeners.set(key, set);
              void send("on", { handle, event });
              return rpc.proxy(handle);
            };
          }
          return (...fnArgs: Array<unknown>) =>
            send("call", { handle, method: String(prop), args: encode(fnArgs) }).then((value) =>
              revive(value),
            );
        },
      });
    },
  };

  function encode(value: unknown): unknown {
    if (value === null || typeof value !== "object") return value;
    if (HANDLE in value) return { $h: (value as { [HANDLE]: number })[HANDLE] };
    if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
      return { $bytes: Buffer.from(value).toString("base64") };
    }
    if (Array.isArray(value)) return value.map(encode);
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, encode(entry)]));
  }

  function revive(value: unknown): unknown {
    if (value === null || typeof value !== "object") return value;
    if (Array.isArray(value)) return value.map(revive);
    const record = value as Record<string, unknown>;
    if (typeof record.$h === "number") return rpc.proxy(record.$h);
    if (typeof record.$bytes === "string") return Buffer.from(record.$bytes, "base64");
    return Object.fromEntries(Object.entries(record).map(([key, entry]) => [key, revive(entry)]));
  }

  function send(op: string, payload: Record<string, unknown>) {
    const id = nextId++;
    return new Promise<unknown>((resolve, reject) => {
      pending.set(id, { resolve, reject });
      child.stdin.write(`${JSON.stringify({ id, op, ...payload })}\n`);
    });
  }

  const lines = NodeReadline.createInterface({ input: child.stdout });
  lines.on("line", (line) => {
    if (line.trim().length === 0) return;
    let message: {
      readonly type?: string;
      readonly id?: number;
      readonly value?: unknown;
      readonly error?: string;
      readonly handle?: number;
      readonly event?: string;
      readonly args?: unknown;
    };
    try {
      message = JSON.parse(line) as typeof message;
    } catch {
      return;
    }
    if (message.type === "event" && message.handle !== undefined && message.event !== undefined) {
      const key = `${message.handle}:${message.event}`;
      for (const listener of listeners.get(key) ?? []) {
        listener(...((revive(message.args) as Array<unknown> | undefined) ?? []));
      }
      return;
    }
    if (typeof message.id !== "number") return;
    const waiter = pending.get(message.id);
    if (waiter === undefined) return;
    pending.delete(message.id);
    if (message.type === "error")
      waiter.reject(new Error(message.error ?? "Playwright sidecar error"));
    else waiter.resolve(message.value);
  });

  return {
    chromium: {
      launch: (...args) => send("chromium", { method: "launch", args: encode(args) }).then(revive),
      launchPersistentContext: (...args) =>
        send("chromium", { method: "launchPersistentContext", args: encode(args) }).then(revive),
      connectOverCDP: (...args) =>
        send("chromium", { method: "connectOverCDP", args: encode(args) }).then(revive),
    },
    async stubWorkerBadges(target: unknown) {
      const handle = (target as { [HANDLE]?: number })[HANDLE];
      if (handle === undefined) return;
      await send("stubWorkerBadges", { handle });
    },
    close() {
      child.kill();
    },
  };
}
