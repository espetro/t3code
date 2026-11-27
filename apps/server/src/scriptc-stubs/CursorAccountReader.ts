import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export class CursorAccountReader extends Context.Service<
  CursorAccountReader,
  {
    readonly read: (
      credentialSource: unknown,
      sinceMs: number,
      untilMs: number,
    ) => Effect.Effect<never>;
  }
>()("@t3tools/provider-cursor/server/CursorAccountReader") {}

export const layer = Layer.succeed(CursorAccountReader, {
  read: () => Effect.die("Cursor account usage is not in the native server binary"),
});
