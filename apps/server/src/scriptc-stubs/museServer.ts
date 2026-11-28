import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";

class MuseUsageHomeService extends Context.Service<
  MuseUsageHomeService,
  {
    readonly resolve: (input: {
      readonly binaryPath: string;
      readonly environment: NodeJS.ProcessEnv;
      readonly awaitRefresh: boolean;
    }) => Effect.Effect<Option.Option<string | undefined>>;
  }
>()("@t3tools/provider-muse/server/MuseUsageHome") {}

export const MuseUsageHome = {
  MuseUsageHome: MuseUsageHomeService,
  layer: Layer.succeed(MuseUsageHomeService, {
    resolve: () => Effect.succeed(Option.none()),
  }),
};
