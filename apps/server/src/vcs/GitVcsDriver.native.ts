import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export type GitRemoteStatusDetails = any;
export type CreateWorktreeOptions = any;
export type GitWorktreeBaseRemote = any;
export type GitDeleteLocalBranchInput = any;
export type GitLocalStatusOptions = any;
export type GitRemoteStatusOptions = any;
export type ExecuteGitInput = any;
export type ExecuteGitResult = any;
export const WORK_TREE_PROBE_OPERATION = "work-tree-probe";

export const makeVcsDriver = Effect.succeed({} as any);

export function isNonRepositoryGitStderr(_stderr: string): boolean {
  return false;
}

type NativeGitFn = (...args: ReadonlyArray<any>) => Effect.Effect<any, never, never>;

export class GitVcsDriver extends Context.Service<
  GitVcsDriver,
  { readonly [key: string]: NativeGitFn }
>()("t3/vcs/GitVcsDriver") {}

export const layer = Layer.succeed(
  GitVcsDriver,
  new Proxy({} as GitVcsDriver["Service"], {
    get: () => () => Effect.die("GitVcsDriver is not in the native server binary"),
  }),
);

export const layerVcs = Layer.empty;
