#!/usr/bin/env node
// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";

const serverDir = NodePath.join(NodeURL.fileURLToPath(new URL(".", import.meta.url)), "..");

/** First ScriptC targets: ACP fast paths spawned per session/tool call today. */
const SCRIPTC_ENTRIES = [
  { name: "acp-mcp-bridge", source: "src/scriptc/acpMcpBridge.ts" },
  { name: "acp-mcp-call", source: "src/scriptc/acpMcpCall.ts" },
] as const;

function selectedEntries(names: ReadonlyArray<string>) {
  if (names.length === 0) return SCRIPTC_ENTRIES;
  const wanted = new Set(names);
  const missing = names.filter((name) => !SCRIPTC_ENTRIES.some((entry) => entry.name === name));
  if (missing.length > 0) {
    throw new Error(`Unknown ScriptC entry: ${missing.join(", ")}`);
  }
  return SCRIPTC_ENTRIES.filter((entry) => wanted.has(entry.name));
}

function main(): void {
  const argv = process.argv.slice(2);
  const exec = argv.includes("--exec");
  const names = argv.filter((arg) => arg !== "--exec");
  const entries = selectedEntries(names).map((entry) => ({
    ...entry,
    sourcePath: NodePath.join(serverDir, entry.source),
  }));

  if (!exec) {
    process.stdout.write(`${JSON.stringify({ entries }, null, 2)}\n`);
    return;
  }

  for (const entry of entries) {
    const spawned = NodeChildProcess.spawnSync("scriptc", ["build", entry.sourcePath], {
      cwd: serverDir,
      stdio: "inherit",
    });
    const code = (spawned.error as NodeJS.ErrnoException | undefined)?.code;
    if (code === "ENOENT") {
      process.stderr.write(
        "scriptc is not on PATH; native ACP entry builds belong to the scriptc toolchain.\n",
      );
      process.exitCode = 0;
      return;
    }
    if (spawned.status !== 0) {
      process.exitCode = spawned.status === null ? 1 : spawned.status;
      return;
    }
  }
}

if (import.meta.main === true || process.argv[1]?.endsWith("scriptc-build.ts")) {
  main();
}
