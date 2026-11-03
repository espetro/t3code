// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";
import { expect, it } from "vite-plus/test";

const scriptPath = NodeURL.fileURLToPath(new URL("./scriptc-build.ts", import.meta.url));

function run(
  args: ReadonlyArray<string>,
  env: Record<string, string | undefined> = {},
): ReturnType<typeof NodeChildProcess.spawnSync> & { stdout: string } {
  return NodeChildProcess.spawnSync(
    process.execPath,
    ["--experimental-strip-types", scriptPath, ...args],
    { encoding: "utf8", env: { ...process.env, ...env } },
  );
}

it("lists ACP ScriptC entries and their sources", () => {
  const result = run([]);
  expect(result.status).toBe(0);
  const listed = JSON.parse(result.stdout) as {
    entries: ReadonlyArray<{ name: string; sourcePath: string }>;
  };
  expect(listed.entries.map((entry) => entry.name)).toEqual(["acp-mcp-bridge", "acp-mcp-call"]);
  for (const entry of listed.entries) {
    expect(NodeFS.existsSync(entry.sourcePath)).toBe(true);
  }
});

it("skips --exec when scriptc is missing instead of writing binaries", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-build-"));
  const githubOutput = NodePath.join(outdir, "github-output");
  const result = run(["--exec", "--outdir", outdir], {
    SCRIPTC_BINARY: NodePath.join(outdir, "does-not-exist"),
    GITHUB_OUTPUT: githubOutput,
  });
  expect(result.status).toBe(0);
  expect(NodeFS.existsSync(NodePath.join(outdir, ".skipped"))).toBe(true);
  expect(NodeFS.existsSync(NodePath.join(outdir, "acp-mcp-bridge"))).toBe(false);
  expect(NodeFS.readFileSync(githubOutput, "utf8")).toContain("skipped=true");
});

it("fails --exec when the installed scriptc does not match the pin", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-build-"));
  const githubOutput = NodePath.join(outdir, "github-output");
  const fakeBin = NodePath.join(outdir, "scriptc");
  NodeFS.writeFileSync(
    fakeBin,
    '#!/bin/sh\nif [ "$1" = "--version" ]; then echo 0.0.0; exit 0; fi\nexit 1\n',
  );
  NodeFS.chmodSync(fakeBin, 0o755);
  const result = run(["--exec", "--outdir", outdir], {
    SCRIPTC_BINARY: fakeBin,
    GITHUB_OUTPUT: githubOutput,
  });
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("0.0.0");
  expect(NodeFS.readFileSync(githubOutput, "utf8")).toContain("skipped=true");
  expect(NodeFS.existsSync(NodePath.join(outdir, "acp-mcp-bridge"))).toBe(false);
});

it("skips --exec when scriptc cannot report its version", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-build-"));
  const githubOutput = NodePath.join(outdir, "github-output");
  const fakeBin = NodePath.join(outdir, "scriptc");
  NodeFS.writeFileSync(fakeBin, "#!/bin/sh\nexit 3\n");
  NodeFS.chmodSync(fakeBin, 0o755);
  const result = run(["--exec", "--outdir", outdir], {
    SCRIPTC_BINARY: fakeBin,
    GITHUB_OUTPUT: githubOutput,
  });
  expect(result.status).toBe(0);
  expect(NodeFS.existsSync(NodePath.join(outdir, ".skipped"))).toBe(true);
  expect(NodeFS.readFileSync(githubOutput, "utf8")).toContain("skipped=true");
});
