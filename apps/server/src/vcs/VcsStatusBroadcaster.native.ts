import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export class VcsStatusBroadcaster extends Context.Service<VcsStatusBroadcaster, any>()(
  "t3/vcs/VcsStatusBroadcaster",
) {}

export const layer = Layer.succeed(
  VcsStatusBroadcaster,
  new Proxy({} as VcsStatusBroadcaster["Service"], {
    get: () => () => Effect.die("VcsStatusBroadcaster is not in the native server binary"),
  }),
);

export const layerAutoPullPolicy = Layer.empty;
