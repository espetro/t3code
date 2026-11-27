import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export type GitLocalStatusOptions = any;
export type GitRemoteStatusOptions = any;
export type GitRunStackedActionOptions = any;

export class GitManager extends Context.Service<GitManager, any>()("t3/git/GitManager") {}

export const layer = Layer.succeed(
  GitManager,
  new Proxy({} as GitManager["Service"], {
    get: () => () => Effect.die("GitManager is not in the native server binary"),
  }),
);
