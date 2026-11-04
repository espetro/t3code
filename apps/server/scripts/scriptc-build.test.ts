// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";
import { expect, it } from "vite-plus/test";
import { libnodePackPackage, hostLibnodeTarget } from "./scriptc-libnode.ts";

const scriptPath = NodeURL.fileURLToPath(new URL("./scriptc-build.ts", import.meta.url));

function run(
  args: ReadonlyArray<string>,
  env: Record<string, string | undefined> = {},
): ReturnType<typeof NodeChildProcess.spawnSync> & { stdout: string } {
  return NodeChildProcess.spawnSync(
    process.execPath,
    ["--experimental-strip-types", scriptPath, ...args],
    {
      encoding: "utf8",
      env: { ...process.env, SCRIPTC_LIBNODE_OBTAIN: "0", ...env },
    },
  );
}

function writeStubPack(directory: string): string {
  const pack = NodePath.join(directory, "libnode-pack");
  NodeFS.mkdirSync(pack, { recursive: true });
  NodeFS.writeFileSync(NodePath.join(pack, "libnode.so.137"), "libnode\n");
  NodeFS.writeFileSync(NodePath.join(pack, "libscr_node_bridge.so"), "bridge\n");
  NodeFS.writeFileSync(
    NodePath.join(pack, "manifest.json"),
    `${JSON.stringify(
      {
        schema: "scriptc.libnode-pack.v1",
        nodeVersion: "24.22.1",
        moduleVersion: 137,
        bridgeAbi: 10,
        platform: "linux",
        arch: "x64",
        libnode: "libnode.so.137",
        bridge: "libscr_node_bridge.so",
        files: {
          "libnode.so.137": { size: 8, sha256: "00".repeat(32) },
          "libscr_node_bridge.so": { size: 7, sha256: "00".repeat(32) },
        },
      },
      null,
      2,
    )}\n`,
  );
  return pack;
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

it("treats a bare -- as an argument separator, not an entry name", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-build-"));
  const result = run(["--", "--exec", "--outdir", outdir], {
    SCRIPTC_BINARY: NodePath.join(outdir, "does-not-exist"),
  });
  expect(result.status).toBe(0);
  expect(NodeFS.existsSync(NodePath.join(outdir, ".skipped"))).toBe(true);
});

it("skips --exec when no libnode pack can be recorded", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-build-"));
  const githubOutput = NodePath.join(outdir, "github-output");
  const fakeBin = NodePath.join(outdir, "scriptc");
  NodeFS.writeFileSync(
    fakeBin,
    '#!/bin/sh\nif [ "$1" = "--version" ]; then echo 0.4.7; exit 0; fi\nexit 1\n',
  );
  NodeFS.chmodSync(fakeBin, 0o755);
  const result = run(["--exec", "--outdir", outdir, "acp-mcp-call"], {
    SCRIPTC_BINARY: fakeBin,
    GITHUB_OUTPUT: githubOutput,
    SCRIPTC_LIBNODE: "",
    SCRIPTC_LIBNODE_CACHE: NodePath.join(outdir, "missing-pack"),
    SCRIPTC_LIBNODE_OBTAIN: "0",
  });
  expect(result.status).toBe(0);
  expect(NodeFS.existsSync(NodePath.join(outdir, ".skipped"))).toBe(true);
  expect(NodeFS.existsSync(NodePath.join(outdir, "acp-mcp-call"))).toBe(false);
  expect(result.stderr).toContain("libnode");
  expect(NodeFS.readFileSync(githubOutput, "utf8")).toContain("skipped=true");
});

it("skips --exec when the compiler wrote an ELF that did not record a libnode pack", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-build-"));
  const githubOutput = NodePath.join(outdir, "github-output");
  const pack = writeStubPack(outdir);
  const fakeBin = NodePath.join(outdir, "scriptc");
  NodeFS.writeFileSync(
    fakeBin,
    `#!/bin/sh
if [ "$1" = "--version" ]; then echo 0.4.7; exit 0; fi
out=""
while [ "$#" -gt 0 ]; do
  if [ "$1" = "--out" ]; then out="$2"; shift 2; continue; fi
  shift
done
printf '%s\\n' '#!/bin/sh' > "$out"
printf '%s\\n' 'echo "scriptc: this program calls into Node.js (@scriptc/node), but no libnode pack was recorded at build time; set SCRIPTC_LIBNODE to a pack directory" >&2' >> "$out"
printf '%s\\n' 'exit 1' >> "$out"
chmod +x "$out"
exit 0
`,
  );
  NodeFS.chmodSync(fakeBin, 0o755);
  const result = run(["--exec", "--outdir", outdir, "acp-mcp-call"], {
    SCRIPTC_BINARY: fakeBin,
    GITHUB_OUTPUT: githubOutput,
    SCRIPTC_LIBNODE: pack,
  });
  expect(result.status).toBe(0);
  expect(NodeFS.existsSync(NodePath.join(outdir, ".skipped"))).toBe(true);
  expect(result.stderr).toContain("did not record a libnode pack");
  expect(NodeFS.readFileSync(githubOutput, "utf8")).toContain("skipped=true");
});

it("invokes the pinned compiler with --out and records a beside libnode pack", () => {
  const outdir = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-scriptc-build-"));
  const githubOutput = NodePath.join(outdir, "github-output");
  const argsLog = NodePath.join(outdir, "args.log");
  const envLog = NodePath.join(outdir, "env.log");
  const pack = writeStubPack(outdir);
  const fakeBin = NodePath.join(outdir, "scriptc");
  NodeFS.writeFileSync(
    fakeBin,
    `#!/bin/sh
if [ "$1" = "--version" ]; then echo 0.4.7; exit 0; fi
printf '%s\\n' "$@" > ${JSON.stringify(argsLog)}
printf '%s\\n' "$SCRIPTC_LIBNODE" > ${JSON.stringify(envLog)}
out=""
while [ "$#" -gt 0 ]; do
  if [ "$1" = "--out" ]; then out="$2"; shift 2; continue; fi
  shift
done
if [ -z "$out" ]; then echo "missing --out" >&2; exit 1; fi
: > "$out"
exit 0
`,
  );
  NodeFS.chmodSync(fakeBin, 0o755);
  const result = run(["--exec", "--outdir", outdir, "acp-mcp-call"], {
    SCRIPTC_BINARY: fakeBin,
    GITHUB_OUTPUT: githubOutput,
    SCRIPTC_LIBNODE: pack,
  });
  expect(result.status).toBe(0);
  const args = NodeFS.readFileSync(argsLog, "utf8");
  expect(args).toContain("--out");
  expect(args).not.toContain("--outfile");
  expect(args).toContain("--libnode");
  expect(args).toContain("beside");
  expect(NodeFS.readFileSync(envLog, "utf8").trim()).toBe(pack);
  expect(NodeFS.existsSync(NodePath.join(outdir, "acp-mcp-call"))).toBe(true);
  expect(JSON.parse(NodeFS.readFileSync(NodePath.join(outdir, "manifest.json"), "utf8"))).toEqual({
    skipped: false,
    scriptcVersion: "0.4.7",
    files: [NodePath.join(outdir, "acp-mcp-call")],
    libnode: {
      recorded: true,
      placement: "path",
      directory: pack,
      source: "env",
      packageName: libnodePackPackage(hostLibnodeTarget()),
      nodeVersion: "24.22.1",
      platform: "linux",
      arch: "x64",
      schema: "scriptc.libnode-pack.v1",
    },
  });
  expect(NodeFS.readFileSync(githubOutput, "utf8")).toContain("skipped=false");
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
