import * as NodeModule from "node:module";
import * as NodeReadline from "node:readline";

const requirePlaywright = NodeModule.createRequire(import.meta.url);
const playwright = requirePlaywright(
  ["playwright", "core"].join("-"),
) as typeof import("playwright-core");

const BADGE_STUB = `if (typeof WorkerNavigator === "function") for (const name of ["setAppBadge", "clearAppBadge"]) WorkerNavigator.prototype[name] = () => Promise.resolve();`;

interface CdpSession {
  send(method: string, params?: object): Promise<unknown>;
  createChildSession(...args: ReadonlyArray<unknown>): CdpSession;
}

const handles = new Map<number, unknown>();
let nextHandle = 1;

function store(value: unknown): number {
  const id = nextHandle++;
  handles.set(id, value);
  return id;
}

function isPlainObject(value: object): boolean {
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function encode(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value;
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    return { $bytes: Buffer.from(value).toString("base64") };
  }
  if (Array.isArray(value)) return value.map(encode);
  if (!isPlainObject(value)) return { $h: store(value) };
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, encode(entry)]));
}

function revive(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(revive);
  const record = value as Record<string, unknown>;
  if (typeof record.$h === "number") return handles.get(record.$h);
  if (typeof record.$bytes === "string") return Buffer.from(record.$bytes, "base64");
  return Object.fromEntries(Object.entries(record).map(([key, entry]) => [key, revive(entry)]));
}

function stubWorkerBadges(client: unknown) {
  const { _connection: connection } = client as {
    readonly _connection?: {
      readonly toImpl?: (
        client: unknown,
      ) =>
        | { readonly _session?: CdpSession; readonly _browser?: { readonly _session?: CdpSession } }
        | undefined;
    };
  };
  const impl = connection?.toImpl?.(client);
  const root = impl?._browser?._session ?? impl?._session;
  if (!root) return;
  const createChildSession = root.createChildSession.bind(root);
  root.createChildSession = (...args) => {
    const session = createChildSession(...args);
    const send = session.send.bind(session);
    session.send = (method, params) => {
      if (method === "Runtime.runIfWaitingForDebugger") {
        void send("Runtime.evaluate", { expression: BADGE_STUB }).catch(() => undefined);
      }
      return send(method, params);
    };
    return session;
  };
}

async function dispatch(message: {
  readonly id: number;
  readonly op: string;
  readonly handle?: number;
  readonly method?: string;
  readonly event?: string;
  readonly args?: unknown;
}): Promise<unknown> {
  if (message.op === "chromium") {
    const method = message.method;
    const args = (revive(message.args) as Array<unknown>) ?? [];
    const chromium = playwright.chromium as unknown as Record<
      string,
      (...fnArgs: Array<unknown>) => unknown
    >;
    if (method === undefined || typeof chromium[method] !== "function") {
      throw new Error(`Unknown chromium method ${method}`);
    }
    return chromium[method](...args);
  }
  if (message.op === "call") {
    const target = handles.get(message.handle ?? -1) as Record<string, unknown> | undefined;
    if (target === undefined) throw new Error(`Unknown playwright handle ${message.handle}`);
    const method = message.method;
    if (method === undefined || typeof target[method] !== "function") {
      throw new Error(`Unknown method ${method}`);
    }
    return (target[method] as (...fnArgs: Array<unknown>) => unknown)(
      ...(((revive(message.args) as Array<unknown>) ?? []) as Array<unknown>),
    );
  }
  if (message.op === "stubWorkerBadges") {
    stubWorkerBadges(handles.get(message.handle ?? -1));
    return null;
  }
  if (message.op === "on") {
    const target = handles.get(message.handle ?? -1) as
      | { on?: (event: string, listener: (...args: Array<unknown>) => void) => void }
      | undefined;
    const event = message.event;
    if (target?.on === undefined || event === undefined) {
      throw new Error("Cannot subscribe to playwright events on this handle.");
    }
    target.on(event, (...args) => {
      write({ type: "event", handle: message.handle, event, args: encode(args) });
    });
    return null;
  }
  throw new Error(`Unknown playwright sidecar op ${message.op}`);
}

function write(payload: unknown) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

const lines = NodeReadline.createInterface({ input: process.stdin });
lines.on("line", (line) => {
  if (line.trim().length === 0) return;
  let message: {
    readonly id: number;
    readonly op: string;
    readonly handle?: number;
    readonly method?: string;
    readonly event?: string;
    readonly args?: unknown;
  };
  try {
    message = JSON.parse(line) as typeof message;
  } catch (cause) {
    write({ type: "error", id: -1, error: String(cause) });
    return;
  }
  void Promise.resolve()
    .then(() => dispatch(message))
    .then(
      (result) => write({ type: "result", id: message.id, value: encode(result) }),
      (cause: unknown) =>
        write({
          type: "error",
          id: message.id,
          error: cause instanceof Error ? cause.message : String(cause),
        }),
    );
});
