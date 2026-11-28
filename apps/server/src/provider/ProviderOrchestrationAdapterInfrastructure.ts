import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Path from "effect/Path";
import * as SqlClient from "effect/sql/SqlClient";

import * as ClaudeAdapterV2 from "../orchestration-v2/Adapters/ClaudeAdapterV2.ts";
import * as CodexAdapterV2 from "../orchestration-v2/Adapters/CodexAdapterV2.ts";
import * as ProviderProcesses from "../process/providerProcesses.ts";
import type * as CursorAgentSdk from "@t3tools/provider-cursor/server/CursorAgentSdk";
import * as CursorAgentSdkProcessRunner from "@t3tools/provider-cursor/server/CursorAgentSdkProcessRunner";
import * as CursorSdk from "@t3tools/provider-cursor/server/CursorSdk";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import * as HostProcess from "@t3tools/shared/HostProcess";
import { resolveNodeExecutable } from "@t3tools/shared/nodeRuntime";

export type ProviderOrchestrationAdapterInfrastructure =
  | ClaudeAdapterV2.ClaudeAgentSdkQueryRunner
  | CodexAdapterV2.CodexAppServerClientFactory
  | CursorAgentSdk.CursorAgentSdkRunner
  | CursorSdk.CursorSdk
  | IdAllocator.IdAllocatorV2;

// Subagent threads created before short ids keep their stored id when an adapter resumes them.
export const layerIdAllocator = Layer.unwrap(
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;
    const rows = yield* sql<{ readonly threadId: string }>`
      SELECT thread_id AS "threadId" FROM orchestration_v2_projection_threads
      WHERE thread_id LIKE 'thread:provider:%'
    `.pipe(
      Effect.catch((cause) =>
        Effect.logWarning("orchestration-v2.legacy-subagent-thread-ids-unavailable", {
          cause,
        }).pipe(Effect.as([])),
      ),
    );
    return IdAllocator.layerWithLegacySubagentThreads(new Set(rows.map((row) => row.threadId)));
  }),
);

export function cursorSdkWorkerLaunchFrom(input: {
  readonly isExecutable: boolean;
  readonly hostCommand: string;
  readonly hostEntry: string;
  readonly nodePath: string;
  readonly workerPath: string;
}): { readonly command: string; readonly args: ReadonlyArray<string> } {
  if (!input.isExecutable) {
    return { command: input.hostCommand, args: [input.hostEntry, "__cursor-sdk-worker"] };
  }
  return {
    command: input.nodePath,
    args: input.workerPath.endsWith(".ts")
      ? ["--experimental-strip-types", input.workerPath]
      : [input.workerPath],
  };
}

const resolveCursorSdkWorkerFile = Effect.fn("resolveCursorSdkWorkerFile")(function* () {
  const path = yield* Path.Path;
  const fs = yield* FileSystem.FileSystem;
  const execDir = path.dirname(yield* HostProcess.ExecutablePath);
  for (const name of [
    "cursor-sdk-worker.mjs",
    "cursor-sdk-worker.js",
    "cursor-sdk-worker.ts",
  ] as const) {
    const candidate = path.join(execDir, name);
    if (yield* fs.exists(candidate).pipe(Effect.orElseSucceed(() => false))) return candidate;
  }
  return yield* path
    .fromFileUrl(
      new URL(
        import.meta.url.endsWith(".ts") ? "./cursorSdkWorker.ts" : "./cursorSdkWorker.mjs",
        import.meta.url,
      ),
    )
    .pipe(Effect.orDie);
});

const resolveCursorWorkerLaunch = Effect.gen(function* () {
  const path = yield* Path.Path;
  const command = yield* HostProcess.ExecutablePath;
  const isExecutable = yield* HostProcess.IsExecutable;
  const providerProcesses = yield* ProviderProcesses.ProviderProcesses;
  // In a bundle import.meta.url is bin.mjs; development and tests use this source module.
  const entry = yield* path
    .fromFileUrl(
      new URL(import.meta.url.endsWith(".ts") ? "../bin.ts" : "./bin.mjs", import.meta.url),
    )
    .pipe(Effect.orDie);
  const launch = isExecutable
    ? cursorSdkWorkerLaunchFrom({
        isExecutable: true,
        hostCommand: command,
        hostEntry: entry,
        nodePath: yield* resolveNodeExecutable("Cursor"),
        workerPath: yield* resolveCursorSdkWorkerFile(),
      })
    : cursorSdkWorkerLaunchFrom({
        isExecutable: false,
        hostCommand: command,
        hostEntry: entry,
        nodePath: command,
        workerPath: entry,
      });
  return {
    ...launch,
    ...(providerProcesses.register === undefined
      ? {}
      : { registerProcess: providerProcesses.register }),
  };
});

/** Reuse the continuation worker's exact layer reference so memoization shares one queue. */
export const layer = Layer.mergeAll(
  ClaudeAdapterV2.layerQueryRunner,
  CodexAdapterV2.layerAppServerClientFactory,
  Layer.unwrap(
    Effect.gen(function* () {
      const path = yield* Path.Path;
      const fs = yield* FileSystem.FileSystem;
      return CursorAgentSdkProcessRunner.layer(
        resolveCursorWorkerLaunch.pipe(
          Effect.provideService(Path.Path, path),
          Effect.provideService(FileSystem.FileSystem, fs),
        ),
      );
    }),
  ),
  CursorSdk.layer,
  layerIdAllocator,
  ProviderContinuationRequests.layer,
);
