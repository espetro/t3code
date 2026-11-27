import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export class OpenCodeServerLedger extends Context.Service<
  OpenCodeServerLedger,
  {
    readonly track: (input: unknown) => Effect.Effect<Effect.Effect<void>>;
  }
>()("@t3tools/provider-opencode/server/OpenCodeServerLedger") {}

export const layer = (_input: { readonly stateDir: string }) =>
  Layer.succeed(
    OpenCodeServerLedger,
    OpenCodeServerLedger.of({
      track: () => Effect.succeed(Effect.void),
    }),
  );

export const layerTest = layer({ stateDir: "/tmp" });
