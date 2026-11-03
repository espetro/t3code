#!/usr/bin/env node
// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodeHttp from "node:http";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";

import { SCRIPTC_PINNED_VERSION } from "./scriptc-build.ts";

const serverDir = NodePath.join(NodeURL.fileURLToPath(new URL(".", import.meta.url)), "..");
const nodeCallEntry = NodePath.join(serverDir, "src/scriptc/acpMcpCall.ts");

function parseArgs(argv: ReadonlyArray<string>): { outdir: string } {
  let outdir = NodePath.join(serverDir, "dist-scriptc");
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--") continue;
    if (arg === "--outdir") {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith("--")) {
        throw new Error("--outdir requires a directory path");
      }
      outdir = NodePath.resolve(value);
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return { outdir };
}

function fail(message: string): never {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function readManifest(outdir: string): {
  skipped: boolean;
  scriptcVersion?: string;
  files?: string[];
} {
  const skippedPath = NodePath.join(outdir, ".skipped");
  if (NodeFS.existsSync(skippedPath)) {
    return { skipped: true };
  }
  const manifestPath = NodePath.join(outdir, "manifest.json");
  if (!NodeFS.existsSync(manifestPath)) {
    fail(`scriptc smoke: missing ${manifestPath} (no binaries and no skip marker)`);
  }
  return JSON.parse(NodeFS.readFileSync(manifestPath, "utf8")) as {
    skipped: boolean;
    scriptcVersion?: string;
    files?: string[];
  };
}

function runProcess(
  command: string,
  args: ReadonlyArray<string>,
  env: NodeJS.ProcessEnv,
): { status: number; stdout: string; stderr: string } {
  const result = NodeChildProcess.spawnSync(command, [...args], {
    encoding: "utf8",
    env,
    timeout: 15_000,
  });
  if (result.error !== undefined) {
    fail(`scriptc smoke: failed to spawn ${command}: ${result.error.message}`);
  }
  return {
    status: result.status ?? 1,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

function compare(
  label: string,
  nodeResult: { status: number; stdout: string; stderr: string },
  elfResult: { status: number; stdout: string; stderr: string },
): void {
  if (
    nodeResult.status === elfResult.status &&
    nodeResult.stdout === elfResult.stdout &&
    nodeResult.stderr === elfResult.stderr
  ) {
    process.stdout.write(`ok ${label} (exit ${nodeResult.status})\n`);
    return;
  }
  fail(
    [
      `scriptc smoke: ${label} mismatch`,
      `node exit ${nodeResult.status} stdout=${JSON.stringify(nodeResult.stdout)} stderr=${JSON.stringify(nodeResult.stderr)}`,
      `elf  exit ${elfResult.status} stdout=${JSON.stringify(elfResult.stdout)} stderr=${JSON.stringify(elfResult.stderr)}`,
    ].join("\n"),
  );
}

function nodeCall(args: ReadonlyArray<string>, env: NodeJS.ProcessEnv) {
  return runProcess(
    process.execPath,
    ["--experimental-strip-types", "--disable-warning=ExperimentalWarning", nodeCallEntry, ...args],
    env,
  );
}

function elfCall(elf: string, args: ReadonlyArray<string>, env: NodeJS.ProcessEnv) {
  return runProcess(elf, args, env);
}

async function withMcpFixture<T>(run: (endpoint: string) => T | Promise<T>): Promise<T> {
  const server = NodeHttp.createServer((request, response) => {
    if (request.method === "DELETE") {
      response.statusCode = 204;
      response.end();
      return;
    }
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    request.on("end", () => {
      const body = Buffer.concat(chunks).toString("utf8");
      let message: { id?: unknown; method?: string; params?: unknown } = {};
      try {
        message = JSON.parse(body) as typeof message;
      } catch {
        response.statusCode = 400;
        response.end();
        return;
      }
      if (message.method === "notifications/initialized") {
        response.statusCode = 202;
        response.end();
        return;
      }
      const result =
        message.method === "initialize"
          ? { protocolVersion: "2025-06-18" }
          : { content: [{ type: "text", text: "smoke-ok" }], structuredContent: { ok: true } };
      response.statusCode = 200;
      response.setHeader("content-type", "application/json");
      response.setHeader("mcp-session-id", "smoke-session");
      response.end(JSON.stringify({ jsonrpc: "2.0", id: message.id ?? null, result }));
    });
  });
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (address === null || typeof address === "string") {
    server.close();
    fail("scriptc smoke: MCP fixture did not bind a TCP port");
  }
  try {
    return await run(`http://127.0.0.1:${address.port}/mcp`);
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error !== undefined && error !== null) reject(error);
        else resolve();
      });
    });
  }
}

async function main(): Promise<void> {
  const { outdir } = parseArgs(process.argv.slice(2));
  const manifest = readManifest(outdir);
  if (manifest.skipped === true) {
    process.stdout.write("scriptc smoke: skipped (compiler produced no ELFs)\n");
    return;
  }
  if (manifest.scriptcVersion !== SCRIPTC_PINNED_VERSION) {
    fail(
      `scriptc smoke: manifest scriptcVersion ${JSON.stringify(manifest.scriptcVersion)} !== pin ${SCRIPTC_PINNED_VERSION}`,
    );
  }
  const elf = NodePath.join(outdir, "acp-mcp-call");
  const bridge = NodePath.join(outdir, "acp-mcp-bridge");
  for (const path of [elf, bridge]) {
    if (!NodeFS.existsSync(path)) fail(`scriptc smoke: missing ELF ${path}`);
    const mode = NodeFS.statSync(path).mode;
    if ((mode & 0o111) === 0) fail(`scriptc smoke: ${path} is not executable`);
  }

  const cleanEnv = { ...process.env };
  delete cleanEnv.T3_ACP_MCP_ENDPOINT;
  delete cleanEnv.T3_ACP_MCP_AUTHORIZATION;
  compare(
    "usage: missing env",
    nodeCall(["task_status", "{}"], cleanEnv),
    elfCall(elf, ["task_status", "{}"], cleanEnv),
  );

  const envOnly = {
    ...process.env,
    T3_ACP_MCP_ENDPOINT: "http://127.0.0.1:1/mcp",
    T3_ACP_MCP_AUTHORIZATION: "Bearer smoke",
  };
  compare("usage: missing args", nodeCall([], envOnly), elfCall(elf, [], envOnly));
  compare(
    "usage: invalid json",
    nodeCall(["task_status", "{"], envOnly),
    elfCall(elf, ["task_status", "{"], envOnly),
  );

  await withMcpFixture((endpoint) => {
    const env = {
      ...process.env,
      T3_ACP_MCP_ENDPOINT: endpoint,
      T3_ACP_MCP_AUTHORIZATION: "Bearer smoke",
    };
    compare(
      "fixture: tools/call",
      nodeCall(["task_status", '{"taskId":"task-1"}'], env),
      elfCall(elf, ["task_status", '{"taskId":"task-1"}'], env),
    );
  });
}

if (import.meta.main === true || process.argv[1]?.endsWith("scriptc-smoke.ts")) {
  await main();
}
