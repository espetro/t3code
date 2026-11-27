import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export type PullRequestError = any;
export type SupportedProject = any;

export class PullRequestService extends Context.Service<PullRequestService, any>()(
  "t3/pullRequest/PullRequestService",
) {}

export const layer = Layer.succeed(
  PullRequestService,
  new Proxy({} as PullRequestService["Service"], {
    get: () => () => Effect.die("PullRequestService is not in the native server binary"),
  }),
);
