#!/usr/bin/env node
// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";

const serverDir = NodePath.join(NodeURL.fileURLToPath(new URL(".", import.meta.url)), "..");

/** First ScriptC targets: ACP fast paths spawned per session/tool call today. */
const SCRIPTC_ENTRIES = [
  { name: "acp-mcp-bridge", source: "src/scriptc/acpMcpBridge.ts" },
  { name: "acp-mcp-call", source: "src/scriptc/acpMcpCall.ts" },
] as const;

const SKIPPED_MARKER = ".skipped";

function selectedEntries(names: ReadonlyArray<string>) {
  if (names.length === 0) return SCRIPTC_ENTRIES;
  const wanted = new Set(names);
  const missing = names.filter((name) => !SCRIPTC_ENTRIES.some((entry) => entry.name === name));
  if (missing.length > 0) {
    throw new Error(`Unknown ScriptC entry: ${missing.join(", ")}`);
  }
  return SCRIPTC_ENTRIES.filter((entry) => wanted.has(entry.name));
}

function parseArgs(argv: ReadonlyArray<string>): {
  exec: boolean;
  outdir: string;
  names: ReadonlyArray<string>;
} {
  const names: string[] = [];
  let exec = false;
  let outdir = NodePath.join(serverDir, "dist-scriptc");
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--exec") {
      exec = true;
      continue;
    }
    if (arg === "--outdir") {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error("--outdir requires a directory path");
      }
      outdir = NodePath.resolve(value);
      index += 1;
      continue;
    }
    if (arg !== undefined) names.push(arg);
  }
  return { exec, outdir, names };
}

function writeGitHubOutput(values: Record<string, string>): void {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (outputPath === undefined || outputPath.length === 0) return;
  const lines = Object.entries(values).map(([key, value]) => `${key}=${value}\n`);
  NodeFS.appendFileSync(outputPath, lines.join(""));
}

function skip(outdir: string, reason: string): void {
  NodeFS.mkdirSync(outdir, { recursive: true });
  NodeFS.writeFileSync(
    NodePath.join(outdir, SKIPPED_MARKER),
    `${JSON.stringify({ skipped: true, reason }, null, 2)}\n`,
  );
  process.stderr.write(`${reason}\n`);
  writeGitHubOutput({ skipped: "true", files: "" });
  process.exitCode = 0;
}

function main(): void {
  const { exec, outdir, names } = parseArgs(process.argv.slice(2));
  const entries = selectedEntries(names).map((entry) => ({
    ...entry,
    sourcePath: NodePath.join(serverDir, entry.source),
    outfile: NodePath.join(outdir, entry.name),
  }));

  if (!exec) {
    process.stdout.write(`${JSON.stringify({ entries, outdir }, null, 2)}\n`);
    return;
  }

  NodeFS.mkdirSync(outdir, { recursive: true });
  const skippedPath = NodePath.join(outdir, SKIPPED_MARKER);
  if (NodeFS.existsSync(skippedPath)) NodeFS.rmSync(skippedPath);

  const produced: string[] = [];
  for (const entry of entries) {
    const spawned = NodeChildProcess.spawnSync(
      "scriptc",
      ["build", entry.sourcePath, "--outfile", entry.outfile],
      {
        cwd: serverDir,
        stdio: "inherit",
      },
    );
    const code = (spawned.error as NodeJS.ErrnoException | undefined)?.code;
    if (code === "ENOENT") {
      skip(
        outdir,
        "scriptc is not on PATH; native ACP entry builds belong to the scriptc toolchain.",
      );
      return;
    }
    if (spawned.status !== 0) {
      process.exitCode = spawned.status === null ? 1 : spawned.status;
      writeGitHubOutput({ skipped: "true", files: "" });
      return;
    }
    if (!NodeFS.existsSync(entry.outfile)) {
      process.stderr.write(`scriptc build succeeded but did not write ${entry.outfile}\n`);
      process.exitCode = 1;
      writeGitHubOutput({ skipped: "true", files: "" });
      return;
    }
    produced.push(entry.outfile);
  }

  NodeFS.writeFileSync(
    NodePath.join(outdir, "manifest.json"),
    `${JSON.stringify({ skipped: false, files: produced }, null, 2)}\n`,
  );
  writeGitHubOutput({ skipped: "false", files: produced.join("\n") });
}

if (import.meta.main === true || process.argv[1]?.endsWith("scriptc-build.ts")) {
  main();
}
