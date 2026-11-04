#!/usr/bin/env node
/* oxlint-disable t3code/no-global-process-runtime -- Standalone scriptc pack obtain has no Effect runtime. */
// @effect-diagnostics nodeBuiltinImport:off globalFetch:off - standalone pack obtain; no Effect HttpClient in this toolchain script.
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";

const serverDir = NodePath.join(NodeURL.fileURLToPath(new URL(".", import.meta.url)), "..");

/** scriptc's runtime pack ABI moves every release; libnode packs match this compiler. */
export const SCRIPTC_PINNED_VERSION = "0.4.7";

/** The manifest schema scriptc 0.4.7's pack reader accepts. */
export const LIBNODE_PACK_SCHEMA = "scriptc.libnode-pack.v1";

/** Platform packages scriptc records when they are installed; still unpublished on npm. */
const PACK_PACKAGES: Readonly<Record<string, string>> = {
  "linux-x64-gnu": "@scriptc/libnode-linux-x64-gnu",
  "linux-arm64-gnu": "@scriptc/libnode-linux-arm64-gnu",
  "macos-arm64": "@scriptc/libnode-darwin-arm64",
  "macos-x64": "@scriptc/libnode-darwin-x64",
};

const SCRIPTC_LIBNODE_SOURCES = [
  "packages/libnode-common/fetch-dev-pack.mjs",
  "packages/libnode-common/build-pack.mjs",
  "packages/libnode-common/dev-pack.json",
  "packages/libnode-common/bridge/scr_node_bridge.cc",
  "packages/runtime/src/scr_node_bridge.h",
] as const;

export type LibnodePackSource = "env" | "npm" | "cache" | "assembled";

export type LibnodePackInfo = {
  directory: string;
  source: LibnodePackSource;
  packageName: string | null;
  nodeVersion: string;
  platform: string;
  arch: string;
  schema: string;
  placement: "beside";
};

export type LibnodeResolveResult =
  | { ok: true; pack: LibnodePackInfo }
  | { ok: false; reason: string };

type PackManifest = {
  schema?: string;
  nodeVersion?: string;
  platform?: string;
  arch?: string;
  libnode?: string;
  bridge?: string;
  package?: string;
  version?: string;
};

export function hostLibnodeTarget(
  platform: string = NodeOS.platform(),
  arch: string = NodeOS.arch(),
): string {
  return platform === "darwin" ? `macos-${arch}` : `${platform}-${arch}-gnu`;
}

export function libnodePackPackage(targetName: string): string | null {
  return PACK_PACKAGES[targetName] ?? null;
}

export function defaultLibnodeCacheDir(
  pin: string = SCRIPTC_PINNED_VERSION,
  target: string = hostLibnodeTarget(),
): string {
  return NodePath.join(serverDir, ".scriptc-libnode", pin, target);
}

function obtainEnabled(env: NodeJS.ProcessEnv): boolean {
  const value = env.SCRIPTC_LIBNODE_OBTAIN;
  return value !== "0" && value !== "false";
}

function readJson(path: string): unknown {
  return JSON.parse(NodeFS.readFileSync(path, "utf8"));
}

export function readLibnodePackManifest(directory: string): PackManifest | null {
  const manifestPath = NodePath.join(directory, "manifest.json");
  if (!NodeFS.existsSync(manifestPath)) return null;
  try {
    return readJson(manifestPath) as PackManifest;
  } catch {
    return null;
  }
}

export function libnodePackProblem(directory: string): string | null {
  const manifest = readLibnodePackManifest(directory);
  if (manifest === null) {
    return `no libnode pack at ${directory} (manifest.json is missing or unreadable)`;
  }
  if (manifest.schema !== LIBNODE_PACK_SCHEMA) {
    return `the libnode pack at ${directory} has schema ${JSON.stringify(manifest.schema)}, expected ${LIBNODE_PACK_SCHEMA}`;
  }
  if (typeof manifest.nodeVersion !== "string" || manifest.nodeVersion.length === 0) {
    return `the libnode pack at ${directory} has no nodeVersion`;
  }
  if (typeof manifest.libnode !== "string" || typeof manifest.bridge !== "string") {
    return `the libnode pack at ${directory} does not name libnode and bridge files`;
  }
  for (const name of [manifest.libnode, manifest.bridge]) {
    if (!NodeFS.existsSync(NodePath.join(directory, name))) {
      return `the libnode pack at ${directory} is missing ${name}`;
    }
  }
  return null;
}

function infoFromDirectory(
  directory: string,
  source: LibnodePackSource,
  packageName: string | null,
): LibnodePackInfo | null {
  if (libnodePackProblem(directory) !== null) return null;
  const manifest = readLibnodePackManifest(directory);
  if (manifest === null || manifest.nodeVersion === undefined) return null;
  return {
    directory: NodePath.resolve(directory),
    source,
    packageName: packageName ?? manifest.package ?? null,
    nodeVersion: manifest.nodeVersion,
    platform: typeof manifest.platform === "string" ? manifest.platform : NodeOS.platform(),
    arch: typeof manifest.arch === "string" ? manifest.arch : NodeOS.arch(),
    schema: LIBNODE_PACK_SCHEMA,
    placement: "beside",
  };
}

function findInstalledPack(packageName: string, from: string): string | null {
  let dir = NodePath.resolve(from);
  for (;;) {
    const candidate = NodePath.join(dir, "node_modules", packageName);
    if (NodeFS.existsSync(NodePath.join(candidate, "manifest.json"))) return candidate;
    const parent = NodePath.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

async function registryJson(url: string): Promise<{ status: number; body: unknown }> {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(15_000),
  });
  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }
  return { status: response.status, body };
}

async function publishedPackNotice(packageName: string, pin: string): Promise<string | null> {
  const encoded = encodeURIComponent(packageName).replace("%40", "@");
  const { status, body } = await registryJson(`https://registry.npmjs.org/${encoded}`);
  if (status === 404) return null;
  if (status !== 200 || body === null || typeof body !== "object") return null;
  const latest = (body as { "dist-tags"?: { latest?: string } })["dist-tags"]?.latest;
  if (typeof latest === "string" && latest !== pin) {
    return `${packageName} is published as ${latest}, but this build is pinned to scriptc ${pin}; not re-pinning. Assemble the ${pin} development pack or bump the pin explicitly.`;
  }
  return null;
}

async function tryInstallPublishedPack(
  packageName: string,
  pin: string,
  destination: string,
): Promise<LibnodePackInfo | { notice: string } | null> {
  const encoded = encodeURIComponent(packageName).replace("%40", "@");
  const { status } = await registryJson(`https://registry.npmjs.org/${encoded}/${pin}`);
  if (status === 404) {
    const notice = await publishedPackNotice(packageName, pin);
    return notice === null ? null : { notice };
  }
  if (status !== 200) return null;
  const work = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-libnode-npm-"));
  try {
    const packed = NodeChildProcess.spawnSync(
      "npm",
      ["pack", `${packageName}@${pin}`, "--pack-destination", work],
      { encoding: "utf8", timeout: 60_000 },
    );
    if (packed.status !== 0) return null;
    const tarball = NodeFS.readdirSync(work).find((name) => name.endsWith(".tgz"));
    if (tarball === undefined) return null;
    NodeFS.rmSync(destination, { recursive: true, force: true });
    NodeFS.mkdirSync(destination, { recursive: true });
    const extract = NodeChildProcess.spawnSync(
      "tar",
      ["-xzf", NodePath.join(work, tarball), "-C", destination, "--strip-components=1"],
      { encoding: "utf8" },
    );
    if (extract.status !== 0) return null;
    return infoFromDirectory(destination, "npm", packageName);
  } finally {
    NodeFS.rmSync(work, { recursive: true, force: true });
  }
}

async function fetchGithubFile(pin: string, relative: string, destination: string): Promise<void> {
  const url = `https://raw.githubusercontent.com/vercel-labs/scriptc/v${pin}/${relative}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching ${url}`);
  }
  NodeFS.mkdirSync(NodePath.dirname(destination), { recursive: true });
  NodeFS.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
}

async function assembleDevPack(pin: string, destination: string): Promise<LibnodePackInfo | null> {
  const cxx =
    process.env.CXX ??
    (NodeChildProcess.spawnSync("g++", ["--version"], { encoding: "utf8" }).status === 0
      ? "g++"
      : null);
  if (cxx === null) return null;
  const work = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-libnode-src-"));
  try {
    for (const relative of SCRIPTC_LIBNODE_SOURCES) {
      await fetchGithubFile(pin, relative, NodePath.join(work, relative));
    }
    NodeFS.rmSync(destination, { recursive: true, force: true });
    NodeFS.mkdirSync(destination, { recursive: true });
    const assembled = NodeChildProcess.spawnSync(
      process.execPath,
      [NodePath.join(work, "packages/libnode-common/fetch-dev-pack.mjs"), "--out", destination],
      { encoding: "utf8", stdio: "inherit", env: { ...process.env, CXX: cxx } },
    );
    if (assembled.status !== 0) return null;
    return infoFromDirectory(destination, "assembled", libnodePackPackage(hostLibnodeTarget()));
  } finally {
    NodeFS.rmSync(work, { recursive: true, force: true });
  }
}

export async function resolveLibnodePack(
  options: {
    env?: NodeJS.ProcessEnv;
    projectDir?: string;
    pin?: string;
    obtain?: boolean;
  } = {},
): Promise<LibnodeResolveResult> {
  const env = options.env ?? process.env;
  const projectDir = options.projectDir ?? serverDir;
  const pin = options.pin ?? SCRIPTC_PINNED_VERSION;
  const target = hostLibnodeTarget();
  const packageName = libnodePackPackage(target);
  const cacheDir = env.SCRIPTC_LIBNODE_CACHE ?? defaultLibnodeCacheDir(pin, target);
  const shouldObtain = options.obtain ?? obtainEnabled(env);

  const fromEnv = env.SCRIPTC_LIBNODE;
  if (fromEnv !== undefined && fromEnv.length > 0) {
    const pack = infoFromDirectory(fromEnv, "env", packageName);
    if (pack !== null) return { ok: true, pack };
    return {
      ok: false,
      reason: `SCRIPTC_LIBNODE=${fromEnv} is not a usable libnode pack (${libnodePackProblem(fromEnv)}).`,
    };
  }

  if (packageName !== null) {
    const installed = findInstalledPack(packageName, projectDir);
    if (installed !== null) {
      const problem = libnodePackProblem(installed);
      const manifest = readLibnodePackManifest(installed);
      if (problem === null && manifest?.version !== undefined && manifest.version !== pin) {
        return {
          ok: false,
          reason: `installed ${packageName}@${manifest.version} does not match scriptc ${pin}; not re-pinning.`,
        };
      }
      const pack = infoFromDirectory(installed, "npm", packageName);
      if (pack !== null) return { ok: true, pack };
    }
  }

  const cached = infoFromDirectory(cacheDir, "cache", packageName);
  if (cached !== null) return { ok: true, pack: cached };

  if (!shouldObtain) {
    return {
      ok: false,
      reason:
        packageName === null
          ? `this program calls into Node.js (@scriptc/node), but there is no libnode pack for ${target}: set SCRIPTC_LIBNODE to a pack directory.`
          : `no libnode pack at ${cacheDir}; set SCRIPTC_LIBNODE, install ${packageName}@${pin}, or allow obtain (SCRIPTC_LIBNODE_OBTAIN).`,
    };
  }

  if (packageName !== null) {
    try {
      const published = await tryInstallPublishedPack(packageName, pin, cacheDir);
      if (published !== null && "notice" in published) {
        process.stderr.write(`${published.notice}\n`);
      } else if (published !== null) {
        return { ok: true, pack: published };
      }
    } catch (error) {
      process.stderr.write(
        `could not install ${packageName}@${pin} from npm: ${error instanceof Error ? error.message : String(error)}\n`,
      );
    }
  }

  try {
    process.stderr.write(
      `assembling scriptc ${pin} development libnode pack for ${target} into ${cacheDir}\n`,
    );
    const assembled = await assembleDevPack(pin, cacheDir);
    if (assembled !== null) return { ok: true, pack: assembled };
  } catch (error) {
    return {
      ok: false,
      reason: `could not assemble a libnode pack for ${target}: ${error instanceof Error ? error.message : String(error)}`,
    };
  }

  return {
    ok: false,
    reason:
      packageName === null
        ? `this program calls into Node.js (@scriptc/node), but there is no libnode pack for ${target} and the development pack could not be assembled. Set SCRIPTC_LIBNODE.`
        : `${packageName}@${pin} is not on npm (vercel-labs/scriptc#2915) and assembling the development pack for ${target} failed. Set SCRIPTC_LIBNODE to a pack directory.`,
  };
}

if (import.meta.main === true || process.argv[1]?.endsWith("scriptc-libnode.ts")) {
  const result = await resolveLibnodePack({ obtain: true });
  if (!result.ok) {
    process.stderr.write(`${result.reason}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(`${JSON.stringify(result.pack, null, 2)}\n`);
  }
}
