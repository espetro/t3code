import * as HostProcess from "@t3tools/shared/HostProcess";

import { runCliCommand } from "./binMain.ts";
import { isEntrypoint } from "./entrypoint.ts";

HostProcess.markExecutable();

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
  await runCliCommand();
}
