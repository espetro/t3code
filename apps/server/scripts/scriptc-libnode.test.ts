// @effect-diagnostics nodeBuiltinImport:off
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import { expect, it } from "vite-plus/test";

import {
  hostLibnodeTarget,
  libnodePackPackage,
  libnodePackProblem,
  resolveLibnodePack,
} from "./scriptc-libnode.ts";

function writeStubPack(directory: string, extra: Record<string, unknown> = {}): string {
  NodeFS.mkdirSync(directory, { recursive: true });
  NodeFS.writeFileSync(NodePath.join(directory, "libnode.so.137"), "libnode\n");
  NodeFS.writeFileSync(NodePath.join(directory, "libscr_node_bridge.so"), "bridge\n");
  NodeFS.writeFileSync(
    NodePath.join(directory, "manifest.json"),
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
        files: {},
        ...extra,
      },
      null,
      2,
    )}\n`,
  );
  return directory;
}

it("names the unpublished host pack package scriptc 0.4.7 would install", () => {
  expect(libnodePackPackage("linux-x64-gnu")).toBe("@scriptc/libnode-linux-x64-gnu");
  expect(libnodePackPackage(hostLibnodeTarget())).not.toBe("");
});

it("rejects a directory that is not a scriptc.libnode-pack.v1 tree", () => {
  const directory = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-libnode-"));
  expect(libnodePackProblem(directory)).toContain("manifest.json");
});

it("prefers SCRIPTC_LIBNODE when it is a usable pack", async () => {
  const root = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-libnode-"));
  const pack = writeStubPack(NodePath.join(root, "pack"));
  const result = await resolveLibnodePack({
    env: { SCRIPTC_LIBNODE: pack, SCRIPTC_LIBNODE_OBTAIN: "0" },
    projectDir: root,
    obtain: false,
  });
  expect(result.ok).toBe(true);
  if (result.ok) {
    expect(result.pack.directory).toBe(pack);
    expect(result.pack.source).toBe("env");
    expect(result.pack.placement).toBe("beside");
    expect(result.pack.nodeVersion).toBe("24.22.1");
  }
});

it("skips obtain when the cache is empty rather than emitting a dead ELF pack path", async () => {
  const root = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-libnode-"));
  const result = await resolveLibnodePack({
    env: {
      SCRIPTC_LIBNODE: "",
      SCRIPTC_LIBNODE_CACHE: NodePath.join(root, "missing"),
      SCRIPTC_LIBNODE_OBTAIN: "0",
    },
    projectDir: root,
    obtain: false,
  });
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.reason).toContain("libnode");
});

it("refuses an installed pack whose version drifted from the compiler pin", async () => {
  const root = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-libnode-"));
  const packageName = libnodePackPackage(hostLibnodeTarget());
  expect(packageName).not.toBeNull();
  writeStubPack(NodePath.join(root, "node_modules", packageName!), { version: "0.0.0" });
  const result = await resolveLibnodePack({
    env: { SCRIPTC_LIBNODE: "", SCRIPTC_LIBNODE_OBTAIN: "0" },
    projectDir: root,
    pin: "0.4.7",
    obtain: false,
  });
  expect(result.ok).toBe(false);
  if (!result.ok) {
    expect(result.reason).toContain("0.0.0");
    expect(result.reason).toContain("not re-pinning");
  }
});
