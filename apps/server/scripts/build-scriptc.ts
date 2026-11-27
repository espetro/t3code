#!/usr/bin/env node
/**
 * From apps/server: scriptc build src/binScriptc.ts --npm-static=effect -o dist/t3
 * Compiles TypeScript source, not vp pack output. Writes src/tsconfig.json so
 * scriptc sees noImplicitOverride: false without a symlink (a link to
 * tsconfig.scriptc.json makes extends "./tsconfig.json" resolve to itself).
 */
// @effect-diagnostics nodeBuiltinImport:off -- Host-side scriptc driver.
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";

const serverDir = NodePath.resolve(NodeURL.fileURLToPath(new URL("..", import.meta.url)));
const srcDir = NodePath.join(serverDir, "src");
const overlayPath = NodePath.join(serverDir, "tsconfig.scriptc.json");
const nearestTsconfig = NodePath.join(srcDir, "tsconfig.json");
const entry = NodePath.join(srcDir, "binScriptc.ts");
const out = NodePath.join(serverDir, "dist", "t3");
const sidecarCopies: ReadonlyArray<{ from: string; to: string }> = [
  {
    from: NodePath.join(srcDir, "preview", "playwrightSidecar.ts"),
    to: NodePath.join(serverDir, "dist", "playwright-sidecar.ts"),
  },
  {
    from: NodePath.join(srcDir, "provider", "cursorSdkWorker.ts"),
    to: NodePath.join(serverDir, "dist", "cursor-sdk-worker.ts"),
  },
];

if (!NodeFS.existsSync(overlayPath)) {
  throw new Error(`Missing scriptc tsconfig overlay: ${overlayPath}`);
}
if (!NodeFS.existsSync(entry)) {
  throw new Error(`Missing scriptc entry: ${entry}`);
}
if (NodeFS.existsSync(nearestTsconfig)) {
  throw new Error(
    `Refusing to replace existing ${nearestTsconfig}; scriptc needs it as a written overlay.`,
  );
}

NodeFS.mkdirSync(NodePath.dirname(out), { recursive: true });
NodeFS.writeFileSync(
  nearestTsconfig,
  `${JSON.stringify(
    {
      extends: "../tsconfig.json",
      compilerOptions: {
        noImplicitOverride: false,
        strict: true,
        strictNullChecks: true,
        skipLibCheck: true,
      },
      // scriptc follows imports from the entry. A parent include of all of src
      // still puts every production file in tsc-ts's program (scriptc#4381).
      include: ["binScriptc.ts"],
      exclude: [
        "**/*.test.ts",
        "**/*.testkit.ts",
        "**/testkit/**",
        "**/*.integration.test.ts",
        "**/*.testFixtures.ts",
      ],
    },
    null,
    2,
  )}\n`,
);

let exitCode = 0;
try {
  const result = NodeChildProcess.spawnSync(
    "scriptc",
    [
      "build",
      entry,
      "--npm-static=effect",
      `--optimization=${process.env.SCRIPTC_OPTIMIZATION ?? "release"}`,
      "-o",
      out,
    ],
    {
      cwd: serverDir,
      stdio: "inherit",
      env: {
        ...process.env,
        // tsc-ts 0.1.3 SIGSEGVs (scriptc#4381) on this program; tsgo is the
        // bundled TypeScript 7 checker and emits the same diagnostics.
        SCRIPTC_CHECKER: "tsgo",
        SCRIPTC_CHECKER_SERVER: "0",
        GOMAXPROCS: process.env.GOMAXPROCS ?? "1",
        // tsgo (Go) otherwise grows past this VM's 15 GiB cgroup and the
        // OOM killer SIGKILLs scriptc (anon-rss ~5.5 GiB, total-vm ~28 GiB).
        GOMEMLIMIT: process.env.GOMEMLIMIT ?? "5GiB",
        GOGC: process.env.GOGC ?? "50",
      },
    },
  );
  process.stderr.write(
    `scriptc status=${String(result.status)} signal=${String(result.signal)} error=${
      result.error === undefined ? "none" : result.error.message
    } out=${String(NodeFS.existsSync(out))}\n`,
  );
  if (result.error && "code" in result.error && result.error.code === "ENOENT") {
    process.stderr.write(
      "scriptc is not installed. Install scriptc 0.4.17 and rerun:\n  scriptc build src/binScriptc.ts --npm-static=effect -o dist/t3\n",
    );
    exitCode = 1;
  } else if (
    result.status !== 0 ||
    (result.signal !== null && result.signal !== undefined) ||
    !NodeFS.existsSync(out)
  ) {
    // scriptc 0.4.17 can print SC3004 after tsc-ts SIGSEGV and still exit 0.
    exitCode = result.status === null || result.status === 0 ? 1 : result.status;
  } else {
    for (const sidecar of sidecarCopies) {
      NodeFS.copyFileSync(sidecar.from, sidecar.to);
    }
  }
} finally {
  try {
    NodeFS.unlinkSync(nearestTsconfig);
  } catch {
    // The overlay file is only for this process.
  }
}
if (exitCode !== 0) process.exit(exitCode);
