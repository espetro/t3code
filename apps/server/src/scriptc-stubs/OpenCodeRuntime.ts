import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import type * as Scope from "effect/Scope";

export class OpenCodeRuntimeError extends Schema.TaggedError<OpenCodeRuntimeError>()(
  "OpenCodeRuntimeError",
  { cause: Schema.Defect() },
) {}

const unavailable = () =>
  new OpenCodeRuntimeError({ cause: "OpenCode is not in the native server binary" });

export class OpenCodeRuntime extends Context.Service<
  OpenCodeRuntime,
  {
    readonly startOpenCodeServerProcess: (input: unknown) => Effect.Effect<
      never,
      OpenCodeRuntimeError,
      Scope.Scope
    >;
    readonly connectToOpenCodeServer: (input: unknown) => Effect.Effect<
      never,
      OpenCodeRuntimeError,
      Scope.Scope
    >;
    readonly runOpenCodeCommand: (input: unknown) => Effect.Effect<never, OpenCodeRuntimeError>;
    readonly createOpenCodeSdkClient: (input: unknown) => never;
    readonly loadOpenCodeInventory: (client: unknown) => Effect.Effect<never, OpenCodeRuntimeError>;
    readonly loadOpenCodeSkills: (client: unknown) => Effect.Effect<never, OpenCodeRuntimeError>;
  }
>()("@t3tools/provider-opencode/server/OpenCodeRuntime") {}

export const layer = Layer.succeed(OpenCodeRuntime, {
  startOpenCodeServerProcess: unavailable,
  connectToOpenCodeServer: unavailable,
  runOpenCodeCommand: unavailable,
  createOpenCodeSdkClient: () => {
    throw new Error("OpenCode is not in the native server binary");
  },
  loadOpenCodeInventory: unavailable,
  loadOpenCodeSkills: unavailable,
});
