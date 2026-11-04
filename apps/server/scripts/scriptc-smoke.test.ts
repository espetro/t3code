// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";
import { expect, it } from "vite-plus/test";

const scriptPath = NodeURL.fileURLToPath(new URL("./scriptc-smoke.ts", import.meta.url));

function run(
  args: ReadonlyArray<string>,
  env: Record<string, string | undefined> = {},
): ReturnType<typeof NodeChildProcess.spawnSync> & { stdout: string; stderr: string } {
  return NodeChildProcess.spawnSync(
    process.execPath,
    ["--experimental-strip-types", "--disable-warning=ExperimentalWarning", scriptPath, ...args],
    { encoding: "utf8", env: { ...process.env, ...env } },
  );
}

it("skips honestly when the compile wrote a skip marker", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-smoke-"));
  NodeFS.writeFileSync(NodePath.join(outdir, ".skipped"), "{}\n");
  const result = run(["--outdir", outdir]);
  expect(result.status).toBe(0);
  expect(result.stdout).toContain("skipped");
});

it("fails when binaries and skip marker are both missing", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-smoke-"));
  const result = run(["--outdir", outdir]);
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("missing");
});

it("fails when manifest scriptcVersion drifts from the pin", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-smoke-"));
  NodeFS.writeFileSync(NodePath.join(outdir, "acp-mcp-call"), "#!/bin/sh\nexit 0\n");
  NodeFS.writeFileSync(NodePath.join(outdir, "acp-mcp-bridge"), "#!/bin/sh\nexit 0\n");
  NodeFS.chmodSync(NodePath.join(outdir, "acp-mcp-call"), 0o755);
  NodeFS.chmodSync(NodePath.join(outdir, "acp-mcp-bridge"), 0o755);
  NodeFS.writeFileSync(
    NodePath.join(outdir, "manifest.json"),
    `${JSON.stringify({ skipped: false, scriptcVersion: "0.0.0", files: [], libnode: { recorded: true } }, null, 2)}\n`,
  );
  const result = run(["--outdir", outdir]);
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("0.0.0");
});

it("fails when the compile wrote ELFs without a recorded libnode pack", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-smoke-"));
  NodeFS.writeFileSync(NodePath.join(outdir, "acp-mcp-call"), "#!/bin/sh\nexit 0\n");
  NodeFS.writeFileSync(NodePath.join(outdir, "acp-mcp-bridge"), "#!/bin/sh\nexit 0\n");
  NodeFS.chmodSync(NodePath.join(outdir, "acp-mcp-call"), 0o755);
  NodeFS.chmodSync(NodePath.join(outdir, "acp-mcp-bridge"), 0o755);
  NodeFS.writeFileSync(
    NodePath.join(outdir, "manifest.json"),
    `${JSON.stringify({ skipped: false, scriptcVersion: "0.4.7", files: [] }, null, 2)}\n`,
  );
  const result = run(["--outdir", outdir]);
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("libnode");
});
