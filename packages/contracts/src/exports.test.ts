import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";

import { expect, it } from "vite-plus/test";

const packageJson = JSON.parse(
  NodeFS.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { exports: Record<string, { import: string }> };

it("publishes orchestration subpaths so native never needs the contracts barrel", () => {
  expect(packageJson.exports["./orchestrationV2"]?.import).toBe("./src/orchestrationV2.ts");
  expect(packageJson.exports["./applicationEvent"]?.import).toBe("./src/applicationEvent.ts");
  expect(packageJson.exports["./orchestrationDispatch"]?.import).toBe(
    "./src/orchestrationDispatch.ts",
  );
  expect(packageJson.exports["./auth"]?.import).toBe("./src/auth.ts");
  expect(packageJson.exports["./baseSchemas"]?.import).toBe("./src/baseSchemas.ts");
});

it("scriptc island omits Effect RpcGroup and HttpApi barrels", () => {
  const island = NodeFS.readFileSync(new URL("./scriptcIsland.ts", import.meta.url), "utf8");
  expect(island).not.toContain("./rpc.ts");
  expect(island).not.toContain("./environmentHttp.ts");
  expect(island).not.toContain("./clientRpcPermissions.ts");
  expect(island).not.toContain("./ipc.ts");
  expect(island).toContain("./orchestrationV2.ts");
  expect(island).toContain("./applicationEvent.ts");
  const rpcPath = NodePath.join(NodeURL.fileURLToPath(new URL("./rpc.ts", import.meta.url)));
  expect(NodeFS.existsSync(rpcPath)).toBe(true);
});
