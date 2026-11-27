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
  expect(script).toContain('include: ["binScriptc.ts"]');
  expect(script).toContain('SCRIPTC_CHECKER: "tsgo"');
  expect(script).toContain('GOMEMLIMIT: process.env.GOMEMLIMIT ?? "5GiB"');
  expect(script).not.toContain("symlinkSync");
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
