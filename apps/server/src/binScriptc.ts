import * as HostProcess from "@t3tools/shared/HostProcess";
import * as NetService from "@t3tools/shared/Net";
import * as NodeCrypto from "@effect/platform-node/NodeCrypto";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { Command } from "effect/cli";

import packageJson from "../package.json" with { type: "json" };
import { authCommand } from "./cli/auth.ts";
import { sharedServerCommandFlags } from "./cli/config.ts";
import { pairCommand } from "./cli/pair.ts";
import { runDefaultServerCommand, serveCommand, startCommand } from "./cli/server.ts";
import { isEntrypoint } from "./entrypoint.ts";
import {
  extendConnectionAttemptTimeout,
  ignoreMacosTypeOfServiceEinval,
  keepOutboundFetchOnHttp1,
} from "./outboundHttp.ts";

// Native builds skip unused CLI (doctor, update, Connect, …) so tsc-ts/tsgo see a
// smaller program (scriptc#4381). serve/start/pair/auth remain so web/mobile and
// the five-case native-server suite can talk to this binary.
HostProcess.markExecutable();
ignoreMacosTypeOfServiceEinval();

const layerCliRuntime = Layer.mergeAll(NodeServices.layer, NodeCrypto.layer, NetService.layer);

const cli = Command.make("t3", { ...sharedServerCommandFlags }).pipe(
  Command.withDescription(
    "Run T3 Code in this terminal. Native builds include serve, start, pair, and auth.",
  ),
  Command.withHandler(runDefaultServerCommand),
  Command.withSubcommands([startCommand, serveCommand, pairCommand, authCommand]),
);

function ignoreOutputError(): void {}

if (
  isEntrypoint({
    moduleUrl: import.meta.url,
    entryPath: process.argv[1],
    runtimeMain: import.meta.main,
  })
) {
  process.stdout.on("error", ignoreOutputError);
  process.stderr.on("error", ignoreOutputError);
  extendConnectionAttemptTimeout();
  keepOutboundFetchOnHttp1();
  Command.run(cli, { version: packageJson.version }).pipe(
    Effect.scoped,
    Effect.provide(layerCliRuntime),
    NodeRuntime.runMain,
  );
}
