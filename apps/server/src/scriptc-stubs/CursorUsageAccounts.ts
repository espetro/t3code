import type { ProviderInstanceId } from "@t3tools/contracts";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export class CursorUsageAccounts extends Context.Service<
  CursorUsageAccounts,
  {
    readonly scan: (input: {
      readonly instances: ReadonlyArray<{
        readonly instanceId: ProviderInstanceId;
        readonly environment: NodeJS.ProcessEnv;
      }>;
      readonly windowStartMs: number;
      readonly retentionCutoffMs: number;
      readonly awaitRefresh: boolean;
    }) => Effect.Effect<ReadonlyArray<never>>;
    readonly awaitPersisted: Effect.Effect<void>;
  }
>()("@t3tools/provider-cursor/server/CursorUsageAccounts") {}

export const layer = Layer.succeed(CursorUsageAccounts, {
  scan: () => Effect.succeed([]),
  awaitPersisted: Effect.void,
});
