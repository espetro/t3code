import * as NodeFS from "node:fs";

import { expect, it } from "vite-plus/test";

it("disables noImplicitOverride in the scriptc tsconfig overlay", () => {
  const overlay = JSON.parse(
    NodeFS.readFileSync(new URL("../tsconfig.scriptc.json", import.meta.url), "utf8"),
  ) as { compilerOptions: { noImplicitOverride: boolean } };
  expect(overlay.compilerOptions.noImplicitOverride).toBe(false);
});
