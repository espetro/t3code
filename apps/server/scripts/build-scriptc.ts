#!/usr/bin/env node
/**
 * From apps/server: scriptc build src/binScriptc.ts --npm-static=effect -o dist/t3
 * Compiles TypeScript source, not vp pack output. Writes src/tsconfig.json so
 * scriptc sees noImplicitOverride: false without a symlink (a link to
 * tsconfig.scriptc.json makes extends "./tsconfig.json" resolve to itself).
 * Overlay paths stub generated Codex/ACP Schema barrels (~2.5MB) out of the
 * checker program; adapters keep their runtime source.
 */
// @effect-diagnostics nodeBuiltinImport:off -- Host-side scriptc driver.
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import * as NodeURL from "node:url";

const serverDir = NodePath.resolve(NodeURL.fileURLToPath(new URL("..", import.meta.url)));
const srcDir = NodePath.join(serverDir, "src");
const repoRoot = NodePath.resolve(serverDir, "../..");
const overlayPath = NodePath.join(serverDir, "tsconfig.scriptc.json");
const nearestTsconfig = NodePath.join(srcDir, "tsconfig.json");
const stubDir = NodePath.join(srcDir, "scriptc-stubs");
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

type SchemaBarrel = {
  readonly specifier: string;
  readonly stubFile: string;
  readonly dir: string;
  readonly barrel: string;
  readonly partPrefix: string;
  readonly extras: ReadonlyArray<string>;
};

const schemaBarrels: ReadonlyArray<SchemaBarrel> = [
  {
    specifier: "effect-codex-app-server/schema",
    stubFile: "codex-schema.ts",
    dir: NodePath.join(repoRoot, "packages/effect-codex-app-server/src/_generated"),
    barrel: "schema.gen.ts",
    partPrefix: "schema.gen.part",
    extras: ["export const MAX_THREAD_GOAL_OBJECTIVE_CHARS = 4_000;"],
  },
  {
    specifier: "effect-acp/schema",
    stubFile: "acp-schema.ts",
    dir: NodePath.join(repoRoot, "packages/effect-acp/src/_generated"),
    barrel: "schema.gen.ts",
    partPrefix: "schema.gen.part",
    extras: [
      "export type CancelNotification = any;",
      "export const CancelNotification = Schema.Any;",
      "export type AuthenticateRequest = any;",
      "export const AuthenticateRequest = Schema.Any;",
      "export type AuthenticateResponse = any;",
      "export const AuthenticateResponse = Schema.Any;",
      "export type LogoutRequest = any;",
      "export const LogoutRequest = Schema.Any;",
      "export type LogoutResponse = any;",
      "export const LogoutResponse = Schema.Any;",
      "export type LoadSessionRequest = any;",
      "export const LoadSessionRequest = Schema.Any;",
      "export type LoadSessionResponse = any;",
      "export const LoadSessionResponse = Schema.Any;",
      "export type SessionNotification = any;",
      "export const SessionNotification = Schema.Any;",
    ],
  },
  {
    specifier: "effect-acp/schema-v1",
    stubFile: "acp-schema-v1.ts",
    dir: NodePath.join(repoRoot, "packages/effect-acp/src/_generated"),
    barrel: "schema-v1.gen.ts",
    partPrefix: "schema-v1.gen.part",
    extras: [],
  },
];

function partFiles(spec: SchemaBarrel): ReadonlyArray<string> {
  return NodeFS.readdirSync(spec.dir)
    .filter((name) => name.startsWith(spec.partPrefix) && name.endsWith(".ts"))
    .sort((a, b) => {
      const na = Number(/part(\d+)\.ts$/.exec(a)?.[1] ?? 0);
      const nb = Number(/part(\d+)\.ts$/.exec(b)?.[1] ?? 0);
      return na - nb;
    });
}

function restoreBarrel(spec: SchemaBarrel): void {
  const barrelPath = NodePath.join(spec.dir, spec.barrel);
  const body = `${partFiles(spec)
    .map((name) => `export * from "./${name}";`)
    .join("\n")}\n`;
  NodeFS.writeFileSync(barrelPath, body);
}

function collectExportNames(spec: SchemaBarrel): ReadonlyArray<string> {
  const names = new Set<string>();
  for (const name of partFiles(spec)) {
    const source = NodeFS.readFileSync(NodePath.join(spec.dir, name), "utf8");
    for (const match of source.matchAll(/^export (?:type|const) (\w+)/gm)) {
      names.add(match[1]!);
    }
  }
  return [...names].sort();
}

function schemaStubSource(spec: SchemaBarrel): string {
  const names = collectExportNames(spec);
  const decls = names.flatMap((name) => [
    `export type ${name} = any;`,
    `export const ${name} = Schema.Any;`,
  ]);
  return [
    "// scriptc-native-schema-stub",
    'import * as Schema from "effect/Schema";',
    "",
    ...decls,
    ...spec.extras,
    "",
  ].join("\n");
}

function applySchemaStubs(): void {
  NodeFS.mkdirSync(stubDir, { recursive: true });
  for (const spec of schemaBarrels) {
    restoreBarrel(spec);
    const stub = schemaStubSource(spec);
    NodeFS.writeFileSync(NodePath.join(stubDir, spec.stubFile), stub);
    // client.ts imports ./_generated/schema.gen.ts relative — path maps miss it.
    NodeFS.writeFileSync(NodePath.join(spec.dir, spec.barrel), stub);
  }
}

if (!NodeFS.existsSync(overlayPath)) {
  throw new Error(`Missing scriptc tsconfig overlay: ${overlayPath}`);
}
if (!NodeFS.existsSync(entry)) {
  throw new Error(`Missing scriptc entry: ${entry}`);
}
if (NodeFS.existsSync(nearestTsconfig)) {
  NodeFS.unlinkSync(nearestTsconfig);
}

const schemaPaths: Record<string, ReadonlyArray<string>> = {};
for (const spec of schemaBarrels) {
  schemaPaths[spec.specifier] = [`./scriptc-stubs/${spec.stubFile}`];
}

async function main(): Promise<number> {
  applySchemaStubs();
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
          baseUrl: ".",
          paths: {
            "#t3/built-in-drivers": ["./provider/builtInDrivers.native.ts"],
            "#t3/adapter-infra": [
              "./provider/ProviderOrchestrationAdapterInfrastructure.native.ts",
            ],
            "#t3/source-control-definitions": ["./sourceControl/sourceControlDefinitions.native.ts"],
            "#t3/git-manager": ["./git/GitManager.native.ts"],
            "#t3/git-vcs-driver": ["./vcs/GitVcsDriver.native.ts"],
            "#t3/pull-request-service": ["./pullRequest/PullRequestService.native.ts"],
            "#t3/storage-cleanup": ["./storageCleanup.native.ts"],
            "@t3tools/provider-opencode/server/OpenCodeRuntime": [
              "./scriptc-stubs/OpenCodeRuntime.ts",
            ],
            "@t3tools/provider-opencode/server/OpenCodeServerLedger": [
              "./scriptc-stubs/OpenCodeServerLedger.ts",
            ],
            "@t3tools/provider-acp-registry/server/AcpRegistrySupport": [
              "./scriptc-stubs/AcpRegistrySupport.ts",
            ],
            "@t3tools/issue-tracker-linear/server/driver": ["./scriptc-stubs/linearDriver.ts"],
            "@t3tools/provider-muse/server": ["./scriptc-stubs/museServer.ts"],
            "@t3tools/provider-cursor/server/CursorAccountReader": [
              "./scriptc-stubs/CursorAccountReader.ts",
            ],
            "@t3tools/provider-cursor/server/CursorUsageAccounts": [
              "./scriptc-stubs/CursorUsageAccounts.ts",
            ],
            ...schemaPaths,
          },
        },
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
    const npmStatic = process.env.SCRIPTC_NPM_STATIC ?? "effect";
    const child = NodeChildProcess.spawn(
      "scriptc",
      [
        "build",
        entry,
        ...(npmStatic === "0" || npmStatic === "" ? [] : [`--npm-static=${npmStatic}`]),
        `--optimization=${process.env.SCRIPTC_OPTIMIZATION ?? "dev"}`,
        "-o",
        out,
      ],
      {
        cwd: serverDir,
        stdio: "inherit",
        env: {
          ...process.env,
          SCRIPTC_CHECKER: process.env.SCRIPTC_CHECKER ?? "tsgo",
          SCRIPTC_CHECKER_SERVER: "0",
          GOMAXPROCS: process.env.GOMAXPROCS ?? "1",
          GOMEMLIMIT: process.env.GOMEMLIMIT ?? "5GiB",
          GOGC: process.env.GOGC ?? "50",
          SCRIPTC_CHECK_STREAM_MODE: process.env.SCRIPTC_CHECK_STREAM_MODE ?? "1",
          SCRIPTC_INCR_LOWERING: process.env.SCRIPTC_INCR_LOWERING ?? "1",
        },
      },
    );
    process.stderr.write(`scriptc pid=${String(child.pid ?? "none")} overlay-driver\n`);
    const result = await new Promise<{
      status: number | null;
      signal: NodeJS.Signals | null;
      error: Error | undefined;
    }>((resolve) => {
      child.once("error", (error) => {
        resolve({ status: null, signal: null, error });
      });
      child.once("exit", (status, signal) => {
        resolve({ status, signal, error: undefined });
      });
    });
    process.stderr.write(
      `scriptc status=${String(result.status)} signal=${String(result.signal)} error=${
        result.error === undefined ? "none" : result.error.message
      } out=${String(NodeFS.existsSync(out))}\n`,
    );
    if (result.error && "code" in result.error && result.error.code === "ENOENT") {
      process.stderr.write("scriptc is not installed.\n");
      exitCode = 1;
    } else if (
      result.status !== 0 ||
      (result.signal !== null && result.signal !== undefined) ||
      !NodeFS.existsSync(out)
    ) {
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
      // overlay is compile-only
    }
    for (const spec of schemaBarrels) {
      try {
        restoreBarrel(spec);
      } catch {
        // parts remain
      }
    }
  }
  return exitCode;
}

const exitCode = await main();
if (exitCode !== 0) process.exit(exitCode);
