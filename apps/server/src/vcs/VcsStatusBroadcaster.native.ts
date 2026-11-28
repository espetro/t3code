import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

type NativeVcsLocalStatus = {
  readonly refName: string | null;
  readonly isDefaultRef?: boolean;
};

export class VcsStatusBroadcaster extends Context.Service<
  VcsStatusBroadcaster,
  {
    readonly refreshLocalStatus: (cwd: string) => Effect.Effect<NativeVcsLocalStatus>;
    readonly refreshPullRequestStatus: (cwd: string) => Effect.Effect<void>;
  }
>()("t3/vcs/VcsStatusBroadcaster") {}

export const layer = Layer.succeed(
  VcsStatusBroadcaster,
  new Proxy({} as VcsStatusBroadcaster["Service"], {
    get: () => () => Effect.die("VcsStatusBroadcaster is not in the native server binary"),
  }),
);

export const layerAutoPullPolicy = Layer.empty;
