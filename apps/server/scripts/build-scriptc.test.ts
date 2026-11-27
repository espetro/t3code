// @effect-diagnostics nodeBuiltinImport:off -- Reads the overlay JSON and sidecar sources as files.
import * as NodeFS from "node:fs";

import { expect, it } from "vite-plus/test";

it("disables noImplicitOverride in the scriptc tsconfig overlay", () => {
  const overlay = JSON.parse(
    NodeFS.readFileSync(new URL("../tsconfig.scriptc.json", import.meta.url), "utf8"),
  ) as { compilerOptions: { noImplicitOverride: boolean; strict: boolean } };
  expect(overlay.compilerOptions.noImplicitOverride).toBe(false);
  expect(overlay.compilerOptions.strict).toBe(true);
});

it("writes a src overlay whose extends path is not the overlay file", () => {
  const script = NodeFS.readFileSync(new URL("./build-scriptc.ts", import.meta.url), "utf8");
  expect(script).toContain('extends: "../tsconfig.json"');
  expect(script).toContain("**/*.test.ts");
  expect(script).toContain("include: [entryFile]");
  expect(script).toContain('const entryFile = "binScriptc.ts"');
  expect(script).not.toContain("SCRIPTC_ENTRY");
  expect(script).toContain("unlinkSync(NodePath.join(stubDir, spec.stubFile))");
  expect(script).toContain('SCRIPTC_CHECKER: process.env.SCRIPTC_CHECKER ?? "tsgo"');
  expect(script).toContain('GOMEMLIMIT: process.env.GOMEMLIMIT ?? "2500MiB"');
  expect(script).toContain("descendantCheckerPids");
  expect(script).toContain("SCRIPTC_LIBNODE");
  expect(script).toContain("SIGKILL checker pids");
  expect(script).toContain("#t3/built-in-drivers");
  expect(script).toContain("builtInDrivers.native.ts");
  expect(script).toContain("#t3/source-control-definitions");
  expect(script).toContain("sourceControlDefinitions.native.ts");
  expect(script).toContain("GitManager.native.ts");
  expect(script).toContain("GitVcsDriver.native.ts");
  expect(script).toContain("#t3/mcp-session-registry");
  expect(script).toContain("McpSessionRegistry.native.ts");
  expect(script).toContain("scriptcIsland.ts");
  expect(script).toContain("scriptc-stubs/OpenCodeRuntime.ts");
  expect(script).toContain("scriptc-native-schema-stub");
  expect(script).toContain("effect-codex-app-server/schema");
  expect(script).toContain("effect-acp/schema-v1");
  expect(script).not.toContain("symlinkSync");
});

it("native scriptc entry does not import the contracts barrel or server.ts", () => {
  const entry = NodeFS.readFileSync(new URL("../src/binScriptc.ts", import.meta.url), "utf8");
  const serve = NodeFS.readFileSync(new URL("../src/native/serve.ts", import.meta.url), "utf8");
  expect(entry).not.toContain("@t3tools/contracts");
  expect(entry).not.toContain("./cli/server.ts");
  expect(entry).not.toContain("./cli/auth.ts");
  expect(serve).not.toContain('@t3tools/contracts"');
  expect(serve).not.toContain("@t3tools/contracts'");
  expect(serve).toContain("@t3tools/contracts/orchestrationV2");
  expect(serve).not.toContain("../server.ts");
  expect(serve).not.toContain("../ws.ts");
  expect(serve).not.toContain("effect/http");
  expect(serve).not.toContain("effect/rpc");
  expect(serve).not.toContain("@effect/platform-node");
  expect(entry).not.toContain("Flag.optional");
  expect(serve).not.toContain("Effect.never");
});

it("copies Node sidecar workers next to the native binary", () => {
  const script = NodeFS.readFileSync(new URL("./build-scriptc.ts", import.meta.url), "utf8");
  expect(script).toContain("playwright-sidecar.ts");
  expect(script).toContain("cursor-sdk-worker.ts");
  expect(NodeFS.existsSync(new URL("../src/preview/playwrightSidecar.ts", import.meta.url))).toBe(
    true,
  );
  expect(NodeFS.existsSync(new URL("../src/provider/cursorSdkWorker.ts", import.meta.url))).toBe(
    true,
  );
});
