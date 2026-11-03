// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";
import { expect, it } from "vite-plus/test";

const scriptPath = NodeURL.fileURLToPath(new URL("./scriptc-build.ts", import.meta.url));

it("lists ACP ScriptC entries and their sources", () => {
  const result = NodeChildProcess.spawnSync(
    process.execPath,
    ["--experimental-strip-types", scriptPath],
    { encoding: "utf8" },
  );
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
  const result = NodeChildProcess.spawnSync(
    process.execPath,
    ["--experimental-strip-types", scriptPath, "--exec", "--outdir", outdir],
    {
      encoding: "utf8",
      env: { ...process.env, PATH: "/usr/bin:/bin", GITHUB_OUTPUT: githubOutput },
    },
  );
  expect(result.status).toBe(0);
  expect(NodeFS.existsSync(NodePath.join(outdir, ".skipped"))).toBe(true);
  expect(NodeFS.existsSync(NodePath.join(outdir, "acp-mcp-bridge"))).toBe(false);
  expect(NodeFS.readFileSync(githubOutput, "utf8")).toContain("skipped=true");
});
