import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

export class GitWorkflowService extends Context.Service<GitWorkflowService, any>()(
  "t3/git/GitWorkflowService",
) {}

export const layer = Layer.succeed(
  GitWorkflowService,
  new Proxy({} as GitWorkflowService["Service"], {
    get: () => () => Effect.die("GitWorkflowService is not in the native server binary"),
  }),
);
