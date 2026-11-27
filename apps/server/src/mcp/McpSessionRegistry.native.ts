import type { ThreadId } from "@t3tools/contracts";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

/** Native host: MCP HTTP stays a Node sidecar (effect/http HttpServer SIGABRT on scriptc). */
type NativeMcpFn = (...args: ReadonlyArray<any>) => Effect.Effect<any, never, never>;

export class McpSessionRegistry extends Context.Service<
  McpSessionRegistry,
  {
    readonly resolve: NativeMcpFn;
    readonly issue: NativeMcpFn;
    readonly revokeThread: NativeMcpFn;
    readonly revokeProviderSession: NativeMcpFn;
    readonly [key: string]: NativeMcpFn;
  }
>()("t3/mcp/McpSessionRegistry") {}

export const layer = Layer.succeed(
  McpSessionRegistry,
  new Proxy({} as McpSessionRegistry["Service"], {
    get: () => () => Effect.die("MCP session registry is a Node sidecar"),
  }),
);

export const touchActiveMcpThread = (_threadId: ThreadId): Effect.Effect<void> => Effect.void;
