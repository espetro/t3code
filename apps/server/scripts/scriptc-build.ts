#!/usr/bin/env node
// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";

import { resolveLibnodePack, SCRIPTC_PINNED_VERSION } from "./scriptc-libnode.ts";

export { SCRIPTC_PINNED_VERSION };

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
    if (arg === "--") continue;
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

function elfReportsUnrecordedPack(elf: string): boolean {
  const env = { ...process.env };
  delete env.SCRIPTC_LIBNODE;
  const result = NodeChildProcess.spawnSync(elf, [], {
    encoding: "utf8",
    env,
    timeout: 10_000,
  });
  if (result.error !== undefined) return false;
  return `${result.stderr}${result.stdout}`.includes("no libnode pack was recorded at build time");
}

function skip(outdir: string, reason: string): void {
  NodeFS.mkdirSync(outdir, { recursive: true });
  const manifestPath = NodePath.join(outdir, "manifest.json");
  if (NodeFS.existsSync(manifestPath)) NodeFS.rmSync(manifestPath);
  NodeFS.writeFileSync(
    NodePath.join(outdir, SKIPPED_MARKER),
    `${JSON.stringify({ skipped: true, reason }, null, 2)}\n`,
  );
  process.stderr.write(`${reason}\n`);
  writeGitHubOutput({ skipped: "true", files: "" });
  process.exitCode = 0;
}

/**
 * The installed scriptc binary, preferring the workspace (pinned devDependency)
 * over whatever happens to be on PATH. `SCRIPTC_BINARY` overrides both, for
 * tests and for locally built compilers.
 */
function resolveScriptcBinary(): string | null {
  const override = process.env.SCRIPTC_BINARY;
  if (override !== undefined && override.length > 0) {
    return NodeFS.existsSync(override) ? override : null;
  }
  const workspaceBinary = NodePath.join(serverDir, "node_modules", ".bin", "scriptc");
  if (NodeFS.existsSync(workspaceBinary)) return workspaceBinary;
  const onPath = NodeChildProcess.spawnSync("scriptc", ["--version"], { encoding: "utf8" });
  return onPath.error === undefined ? "scriptc" : null;
}

/** Null when the version cannot be determined; the caller decides how strict to be. */
function scriptcVersion(binary: string): string | null {
  const result = NodeChildProcess.spawnSync(binary, ["--version"], { encoding: "utf8" });
  if (result.error !== undefined || result.status !== 0) return null;
  const version = result.stdout.trim();
  return version.length > 0 ? version : null;
}

async function main(): Promise<void> {
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

  const binary = resolveScriptcBinary();
  if (binary === null) {
    skip(
      outdir,
      "scriptc is not installed; native ACP entry builds belong to the scriptc toolchain.",
    );
    return;
  }
  const version = scriptcVersion(binary);
  if (version === null) {
    skip(outdir, `could not determine the scriptc version reported by ${binary}.`);
    return;
  }
  if (version !== SCRIPTC_PINNED_VERSION) {
    process.stderr.write(
      `scriptc ${version} does not match the pinned ${SCRIPTC_PINNED_VERSION}; update apps/server/package.json and scripts/scriptc-libnode.ts together.\n`,
    );
    process.exitCode = 1;
    writeGitHubOutput({ skipped: "true", files: "" });
    return;
  }

  const libnode = await resolveLibnodePack({ projectDir: serverDir, pin: version });
  if (!libnode.ok) {
    skip(outdir, libnode.reason);
    return;
  }

  NodeFS.mkdirSync(outdir, { recursive: true });
  const skippedPath = NodePath.join(outdir, SKIPPED_MARKER);
  if (NodeFS.existsSync(skippedPath)) NodeFS.rmSync(skippedPath);

  const produced: string[] = [];
  for (const entry of entries) {
    const spawned = NodeChildProcess.spawnSync(
      binary,
      ["build", entry.sourcePath, "--out", entry.outfile, "--libnode", "beside"],
      {
        cwd: serverDir,
        env: { ...process.env, SCRIPTC_LIBNODE: libnode.pack.directory },
        stdio: "inherit",
      },
    );
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

  const unrecorded = produced.find((elf) => elfReportsUnrecordedPack(elf));
  if (unrecorded !== undefined) {
    skip(
      outdir,
      `scriptc ${version} compiled ${unrecorded} but did not record a libnode pack (Node islands are report-only in this compiler; Effect is SC8001). The ${libnode.pack.nodeVersion} pack is at ${libnode.pack.directory}; the ELF still cannot load @scriptc/node until the compiler embeds the island module manifest.`,
    );
    return;
  }

  const beside = produced.every((elf) =>
    NodeFS.existsSync(NodePath.join(`${elf}.libnode`, "manifest.json")),
  );

  NodeFS.writeFileSync(
    NodePath.join(outdir, "manifest.json"),
    `${JSON.stringify(
      {
        skipped: false,
        scriptcVersion: version,
        files: produced,
        libnode: {
          recorded: true,
          placement: beside ? "beside" : "path",
          directory: libnode.pack.directory,
          source: libnode.pack.source,
          packageName: libnode.pack.packageName,
          nodeVersion: libnode.pack.nodeVersion,
          platform: libnode.pack.platform,
          arch: libnode.pack.arch,
          schema: libnode.pack.schema,
        },
      },
      null,
      2,
    )}\n`,
  );
  writeGitHubOutput({ skipped: "false", files: produced.join("\n") });
}

if (import.meta.main === true || process.argv[1]?.endsWith("scriptc-build.ts")) {
  await main();
}
