// @effect-diagnostics nodeBuiltinImport:off -- Runs before the CLI's Effect runtime loads.
import * as NodeModule from "node:module";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";

export function enableCliCompileCache(): void {
  try {
    // AppImage paths change each launch. ScriptC and Node SEA have no JS modules to cache.
    if (process.env.APPIMAGE || isStandaloneExecutable()) return;
    const cacheRoot =
      process.env.XDG_CACHE_HOME ||
      // oxlint-disable-next-line t3code/no-global-process-runtime -- Runs before the CLI's Effect runtime loads.
      (process.platform === "linux" ? NodePath.join(NodeOS.homedir(), ".cache") : NodeOS.tmpdir());
    NodeModule.enableCompileCache(NodePath.join(cacheRoot, "t3code", "compile-cache"));
  } catch {}
}

function isStandaloneExecutable(): boolean {
  try {
    // Dynamic specifier: a static `node:sea` import is a ScriptC compile error (SC1010).
    const sea = NodeModule.createRequire(import.meta.url)(`node:${"sea"}`) as {
      isSea?: () => boolean;
    };
    return sea.isSea?.() === true;
  } catch {
    return false;
  }
}
