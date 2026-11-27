#!/usr/bin/env node
/**
 * From apps/server: scriptc build src/binScriptc.ts --npm-static=effect -o dist/t3
 * Compiles TypeScript source, not vp pack output. Links tsconfig.scriptc.json
 * (noImplicitOverride: false) as src/tsconfig.json so scriptc sees that overlay.
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

if (!NodeFS.existsSync(overlayPath)) {
  throw new Error(`Missing scriptc tsconfig overlay: ${overlayPath}`);
}
if (!NodeFS.existsSync(entry)) {
  throw new Error(`Missing scriptc entry: ${entry}`);
}
if (NodeFS.existsSync(nearestTsconfig)) {
  throw new Error(
    `Refusing to replace existing ${nearestTsconfig}; scriptc needs it as a link to the overlay.`,
  );
}

NodeFS.mkdirSync(NodePath.dirname(out), { recursive: true });
NodeFS.symlinkSync(NodePath.relative(srcDir, overlayPath), nearestTsconfig);

try {
  const result = NodeChildProcess.spawnSync(
    "scriptc",
    ["build", entry, "--npm-static=effect", "-o", out],
    {
      cwd: serverDir,
      stdio: "inherit",
    },
  );
  if (result.error && "code" in result.error && result.error.code === "ENOENT") {
    console.error(
      "scriptc is not installed. Install scriptc 0.4.17 and rerun:\n  scriptc build src/binScriptc.ts --npm-static=effect -o dist/t3",
    );
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status === null ? 1 : result.status);
  }
} finally {
  try {
    NodeFS.unlinkSync(nearestTsconfig);
  } catch {
    // The overlay link is only for this process.
  }
}
