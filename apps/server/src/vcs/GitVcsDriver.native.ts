import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export class GitVcsDriver extends Context.Service<
  GitVcsDriver,
  Record<string, (...args: ReadonlyArray<never>) => Effect.Effect<never>>
>()("t3/vcs/GitVcsDriver") {}

export const layer = Layer.succeed(
  GitVcsDriver,
  new Proxy({} as GitVcsDriver["Service"], {
    get: () => () => Effect.die("GitVcsDriver is not in the native server binary"),
  }),
);

export const layerVcs = Layer.empty;

export function isNonRepositoryGitStderr(_stderr: string): boolean {
  return false;
}
