/**
 * Native orchestration island: EventSink + Orchestrator, empty provider adapters.
 * Stays off apps/server ws.ts, Effect HttpRouter/RpcServer, and N-API adapters.
 */
import * as NodeCrypto from "@effect/platform-node/NodeCrypto";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { DEFAULT_SIGNAL_EXPORT } from "@t3tools/shared/observability";
import * as OtelEnvironment from "@t3tools/shared/otelEnvironment";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

import * as CheckpointStore from "../checkpointing/CheckpointStore.ts";
import * as ServerConfig from "../config.ts";
import * as OrchestrationCommandReceipts from "../persistence/OrchestrationCommandReceipts.ts";
import * as OrchestrationEventStore from "../persistence/OrchestrationEventStore.ts";
import * as SqlitePersistence from "../persistence/Sqlite.ts";
import * as WorktreeSetupTracker from "../project/WorktreeSetupTracker.ts";
import * as ServerSettings from "../serverSettings.ts";
import * as TaskFolderStore from "../workspace/TaskFolderStore.ts";
import * as WorkspaceFolders from "../workspace/WorkspaceFolders.ts";
import * as CheckpointService from "../orchestration-v2/CheckpointService.ts";
import * as CommandPolicy from "../orchestration-v2/CommandPolicy.ts";
import * as CommandReceiptStore from "../orchestration-v2/CommandReceiptStore.ts";
import * as ContextHandoffService from "../orchestration-v2/ContextHandoffService.ts";
import * as EffectOutbox from "../orchestration-v2/EffectOutbox.ts";
import * as EventSink from "../orchestration-v2/EventSink.ts";
import * as EventStore from "../orchestration-v2/EventStore.ts";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import * as Orchestrator from "../orchestration-v2/Orchestrator.ts";
import * as ProjectionStore from "../orchestration-v2/ProjectionStore.ts";
import * as ProjectStore from "../orchestration-v2/ProjectStore.ts";
import * as ProviderAdapterRegistry from "../orchestration-v2/ProviderAdapterRegistry.ts";
import * as ProviderSessionManager from "../orchestration-v2/ProviderSessionManager.ts";
import * as ProviderSwitchService from "../orchestration-v2/ProviderSwitchService.ts";
import * as RuntimePolicy from "../orchestration-v2/RuntimePolicy.ts";
import * as ThreadForkService from "../orchestration-v2/ThreadForkService.ts";
import * as ThreadViewers from "../orchestration-v2/ThreadViewers.ts";
import * as TurnItemPositionStore from "../orchestration-v2/TurnItemPositionStore.ts";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";

const layerEmptyAdapters = ProviderAdapterRegistry.layerFromAdapters([]);

const layerCheckpointStoreNative = Layer.mock(CheckpointStore.CheckpointStore)({
  isGitRepository: () => Effect.succeed(false),
  captureCheckpoint: () => Effect.succeed(null),
  resolveCleanHead: () => Effect.succeed(null),
  captureHeadCheckpoint: () => Effect.void,
  hasCheckpointRef: () => Effect.succeed(false),
  copyCheckpointRef: () => Effect.succeed(false),
  restoreCheckpoint: () => Effect.succeed(false),
  diffCheckpoints: () => Effect.succeed(""),
  listAuthoredPaths: () => Effect.succeed(null),
  deleteCheckpointRefs: () => Effect.void,
});

const layerRuntimePolicyNative = Layer.succeed(RuntimePolicy.RuntimePolicyV2, {
  resolve: (input) =>
    Effect.succeed(
      ProviderAdapter.ProviderAdapterV2RuntimePolicy.make({
        runtimeMode: input.thread.runtimeMode,
        interactionMode: input.thread.interactionMode,
        cwd: input.thread.worktreePath ?? process.cwd(),
      }),
    ),
});

const layerProviderSessionsNative = Layer.mock(ProviderSessionManager.ProviderSessionManagerV2)({});

const layerEventInfrastructure = Layer.mergeAll(
  OrchestrationEventStore.layer,
  OrchestrationCommandReceipts.layer,
);

const layerStores = Layer.mergeAll(
  layerEventInfrastructure,
  EventStore.layerFromOrchestrationEventStore.pipe(Layer.provide(layerEventInfrastructure)),
  CommandReceiptStore.layerFromApplicationReceipts.pipe(Layer.provide(layerEventInfrastructure)),
  ProjectionStore.layer,
  ProjectStore.layer,
  EffectOutbox.layer,
  TurnItemPositionStore.layer,
  TaskFolderStore.layer,
);

const layerEventSink = EventSink.layerFromStores.pipe(
  Layer.provide(Layer.mergeAll(layerStores, ThreadViewers.layer)),
);

const layerWorkspaceFolders = WorkspaceFolders.layer.pipe(Layer.provide(layerStores));

const layerCheckpointService = CheckpointService.layer.pipe(
  Layer.provide(
    Layer.mergeAll(layerCheckpointStoreNative, IdAllocator.layer, layerWorkspaceFolders),
  ),
);

const layerContextHandoff = ContextHandoffService.layer.pipe(Layer.provide(IdAllocator.layer));

const layerProviderSwitch = ProviderSwitchService.layer.pipe(Layer.provide(layerEmptyAdapters));

const layerNativeIsland = Orchestrator.layer.pipe(
  Layer.provide(
    Layer.mergeAll(
      layerCheckpointService,
      CommandPolicy.layer,
      layerStores,
      layerEventSink,
      layerContextHandoff,
      IdAllocator.layer,
      ProjectStore.layer,
      TaskFolderStore.layer,
      layerEmptyAdapters,
      layerProviderSessionsNative,
      layerProviderSwitch,
      layerRuntimePolicyNative,
      ThreadForkService.layer,
      WorktreeSetupTracker.layer,
      ServerSettings.layerTest(),
    ),
  ),
  Layer.provideMerge(layerEventSink),
  Layer.provideMerge(layerStores),
);

const layerNativeServerConfig = (baseDir: string) =>
  Layer.effect(
    ServerConfig.ServerConfig,
    Effect.gen(function* () {
      const derivedPaths = yield* ServerConfig.deriveServerPaths(baseDir, undefined, {
        baseDirIsExplicit: true,
      });
      yield* ServerConfig.ensureServerDirectories(derivedPaths);
      return ServerConfig.make({
        logLevel: "Error",
        traceMinLevel: "Info",
        traceTimingEnabled: true,
        traceBatchWindowMs: 200,
        traceMaxBytes: 10 * 1024 * 1024,
        traceMaxFiles: 10,
        otlpTracesUrl: undefined,
        otlpMetricsUrl: undefined,
        otlpLogsUrl: undefined,
        otlpTracesExport: DEFAULT_SIGNAL_EXPORT,
        otlpMetricsExport: DEFAULT_SIGNAL_EXPORT,
        otlpLogsExport: DEFAULT_SIGNAL_EXPORT,
        otelEnvironment: OtelEnvironment.none,
        cwd: process.cwd(),
        baseDir,
        ...derivedPaths,
        mode: "web",
        autoBootstrapProjectFromCwd: false,
        logWebSocketEvents: false,
        tailscaleServeEnabled: false,
        tailscaleServePort: 443,
        port: 0,
        host: undefined,
        desktopBootstrapToken: undefined,
        staticDir: undefined,
        devUrl: undefined,
        devAllowedOrigins: [],
        noBrowser: true,
        startupPresentation: "headless",
      });
    }),
  );

export const layerNativeServe = (baseDir: string) =>
  layerNativeIsland.pipe(
    Layer.provide(SqlitePersistence.layerConfig),
    Layer.provide(layerNativeServerConfig(baseDir)),
    Layer.provide(Layer.mergeAll(NodeServices.layer, NodeCrypto.layer)),
  );

export const layerNativeTest = layerNativeIsland.pipe(
  Layer.provide(SqlitePersistence.layerMemory),
  Layer.provide(ServerConfig.layerTest(process.cwd(), { prefix: "t3-native-island-" })),
  Layer.provide(Layer.mergeAll(NodeServices.layer, NodeCrypto.layer)),
);
