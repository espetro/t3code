import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import { Command, Flag } from "effect/cli";

import packageJson from "../package.json" with { type: "json" };
import { isEntrypoint } from "./entrypoint.ts";
import { issueNativeSession } from "./native/sessionFile.ts";
import { runNativeServe } from "./native/serve.ts";

const resolveBaseDir = (flag: string) =>
  flag.length > 0 ? flag : (process.env.T3CODE_HOME ?? process.cwd());

const serveFlags = {
  baseDir: Flag.String("base-dir").pipe(Flag.withDefault("")),
  port: Flag.Int("port").pipe(Flag.withDefault(13773)),
  host: Flag.String("host").pipe(Flag.withDefault("127.0.0.1")),
};

const runServe = (flags: {
  readonly baseDir: string;
  readonly port: number;
  readonly host: string;
}) =>
  runNativeServe({
    baseDir: resolveBaseDir(flags.baseDir),
    host: flags.host,
    port: flags.port,
  });

export const serveCommand = Command.make("serve", serveFlags).pipe(
  Command.withShortDescription("Run T3 Code in this terminal, with no browser."),
  Command.withHandler(runServe),
);

export const startCommand = Command.make("start", serveFlags).pipe(
  Command.unlisted,
  Command.withHandler(runServe),
);

const sessionIssueCommand = Command.make("issue", {
  baseDir: Flag.String("base-dir").pipe(Flag.withDefault("")),
  tokenOnly: Flag.Boolean("token-only").pipe(Flag.withDefault(false)),
}).pipe(
  Command.withHandler((flags) => Console.log(issueNativeSession(resolveBaseDir(flags.baseDir)))),
);

const sessionCommand = Command.make("session").pipe(Command.withSubcommands([sessionIssueCommand]));

export const authCommand = Command.make("auth").pipe(Command.withSubcommands([sessionCommand]));

export const pairCommand = Command.make("pair", {
  baseDir: Flag.String("base-dir").pipe(Flag.withDefault("")),
}).pipe(Command.withHandler(() => Console.log("Open the pairing URL printed by `t3 serve`.")));

const cli = Command.make("t3", serveFlags).pipe(
  Command.withDescription(
    "Run T3 Code in this terminal. Native builds include serve, start, pair, and auth.",
  ),
  Command.withHandler(runServe),
  Command.withSubcommands([startCommand, serveCommand, pairCommand, authCommand]),
);

if (
  isEntrypoint({
    moduleUrl: import.meta.url,
    entryPath: process.argv[1],
    runtimeMain: import.meta.main,
  })
) {
  NodeRuntime.runMain(
    Command.run(cli, { version: packageJson.version }).pipe(
      Effect.provide(NodeServices.layer),
    ) as Effect.Effect<void>,
  );
}
