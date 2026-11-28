import * as NodeServices from "@effect/platform-node/NodeServices";
import { runCursorSdkWorker } from "@t3tools/provider-cursor/server/worker";

await runCursorSdkWorker(NodeServices.layer);
