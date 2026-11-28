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
  expect(script).toContain("include: [compileFile]");
  expect(script).toContain('const entryFile = "binScriptc.ts"');
  expect(script).not.toContain("SCRIPTC_ENTRY");
  expect(script).toContain("unlinkSync(NodePath.join(stubDir, spec.stubFile))");
  expect(script).toContain('SCRIPTC_CHECKER: process.env.SCRIPTC_CHECKER ?? "tsgo"');
  expect(script).toContain('GOMEMLIMIT: process.env.GOMEMLIMIT ?? "6144MiB"');
  expect(script).toContain("CHECKER_KEEPALIVE_REMAINING_KB");
  expect(script).toContain("remaining > CHECKER_KEEPALIVE_REMAINING_KB");
  expect(script).not.toContain("rss < 2.5 * 1024 * 1024");
  expect(script).toContain("noImplicitAny: false");
  expect(script).toContain("exactOptionalPropertyTypes: false");
  expect(script).toContain("descendantCheckerPids");
  expect(script).toContain("SCRIPTC_LIBNODE");
  expect(script).toContain('T3_SCRIPTC_NATIVE: "1"');
  expect(script).toContain("SIGKILL checker pids");
  expect(script).toContain("#t3/built-in-drivers");
  expect(script).toContain("builtInDrivers.native.ts");
  expect(script).toContain("#t3/source-control-definitions");
  expect(script).toContain("sourceControlDefinitions.native.ts");
  expect(script).toContain("GitManager.native.ts");
  expect(script).toContain("#t3/git-workflow-service");
  expect(script).toContain("GitWorkflowService.native.ts");
  expect(script).toContain("GitVcsDriver.native.ts");
  expect(script).toContain("#t3/vcs-status-broadcaster");
  expect(script).toContain("VcsStatusBroadcaster.native.ts");
  expect(script).toContain("#t3/mcp-session-registry");
  expect(script).toContain("McpSessionRegistry.native.ts");
  expect(script).toContain("scriptcIsland.ts");
  expect(script).toContain('"@t3tools/contracts/orchestrationV2"');
  expect(script).toContain('"@t3tools/contracts/baseSchemas"');
  expect(script).toContain('"@t3tools/contracts/applicationEvent"');
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
  expect(serve).toContain("./intake.ts");
  expect(serve).not.toContain("../server.ts");
  expect(serve).not.toContain("../ws.ts");
  expect(serve).not.toContain("effect/http");
  expect(serve).not.toContain("effect/rpc");
  expect(serve).not.toContain("@effect/platform-node");
  expect(entry).not.toContain("Flag.optional");
  expect(serve).not.toContain("Effect.never");
  const intake = NodeFS.readFileSync(new URL("../src/native/intake.ts", import.meta.url), "utf8");
  expect(intake).not.toContain('@t3tools/contracts"');
  expect(intake).not.toContain("@t3tools/contracts'");
  expect(intake).toContain("@t3tools/contracts/auth");
  expect(intake).toContain("@t3tools/contracts/orchestrationV2");
  expect(intake).not.toContain("../auth/RpcAuthorization");
  expect(intake).not.toContain("../orchestration-v2/ThreadMessageIntake");
  expect(intake).not.toContain("effect/rpc");
  const eventStore = NodeFS.readFileSync(
    new URL("../src/orchestration-v2/EventStore.ts", import.meta.url),
    "utf8",
  );
  expect(eventStore).not.toContain('@t3tools/contracts"');
  expect(eventStore).not.toContain("@t3tools/contracts'");
  expect(eventStore).toContain("@t3tools/contracts/orchestrationV2");
  expect(eventStore).toContain("@t3tools/contracts/baseSchemas");
  expect(eventStore).toContain("@t3tools/contracts/applicationEvent");
  const persistence = NodeFS.readFileSync(
    new URL("../src/persistence/OrchestrationEventStore.ts", import.meta.url),
    "utf8",
  );
  expect(persistence).not.toContain('@t3tools/contracts"');
  expect(persistence).not.toContain("@t3tools/contracts'");
  expect(persistence).toContain("@t3tools/contracts/orchestrationV2");
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
