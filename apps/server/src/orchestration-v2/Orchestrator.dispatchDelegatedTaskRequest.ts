// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of Orchestrator.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
import type {
  OrchestrationV2ThreadLinkMetadata,
  GuestShareId,
  OrchestrationV2SearchThreadInput,
  OrchestrationV2SearchThreadResult,
  OrchestrationV2ThreadHistoryPage,
  ProjectId,
} from "@t3tools/contracts";
import {
  latestExecutedRun,
  latestRootProviderFailure,
  orchestrationV2WorktreePending,
  runRanAfter,
  usageLimitBlockedRun,
} from "@t3tools/shared/orchestrationV2ThreadError";
import { threadIssueKeysEqual } from "@t3tools/contracts";
import { canonicalizeGitCafePullRequestUrl } from "@t3tools/source-control-definitions/registry";
import { threadPullRequestsOf } from "../sourceControl/threadPullRequests.ts";
import {
  normalizeThreadPullRequestKey,
  visibleThreadPullRequests,
  threadPullRequestKeysEqual,
  legacyThreadPullRequestKey,
} from "../sourceControl/threadPullRequests.ts";
import {
  ORCHESTRATION_V2_WORKSPACE_PREPARATION_FAILURE_CODE,
  type ChatAttachment,
  CommandId,
  type GuestMessageId,
  isCompactionCommandMessage,
  isDeliveredProviderTurn,
  isOrchestrationV2WorkActive,
  isProviderNativeSubagentThread,
  MessageId,
  type NodeId,
  type ModelSelection,
  OrchestrationV2Command,
  type OrchestrationV2InternalCommand,
  type OrchestrationV2LimitRecoveryUpdate,
  type OrchestrationV2Notification,
  type OrchestrationV2ServerCommand,
  type ThreadPullRequestLink,
  type ThreadPullRequestWatch,
  type PullRequestWatchUntil,
  type OrchestrationV2AppThread,
  type OrchestrationV2ContextHandoff,
  type OrchestrationV2ContextSourcePoint,
  type OrchestrationV2ContextTransfer,
  type OrchestrationV2ContextTransferResolution,
  type OrchestrationV2ConversationMessage,
  type OrchestrationV2DelegatedCompletionCohort,
  type OrchestrationV2DelegatedCompletionDelivery,
  type OrchestrationV2DomainEvent,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2RemoteTaskChild,
  type OrchestrationV2ModelSwitch,
  type OrchestrationV2Run,
  type OrchestrationV2RunAttempt,
  type OrchestrationV2ThreadShell,
  type OrchestrationV2ThreadShellSnapshot,
  type OrchestrationV2StoredEvent,
  type OrchestrationV2Subagent,
  type OrchestrationV2ThreadProjection,
  type OrchestrationV2TurnItem,
  latestProviderTurnForAttempt,
  repositoryRewindCheckpoint,
  parseGoalCommand,
  orchestrationV2RunWorkStartedAt,
  ProviderInstanceId,
  PROVIDER_SEND_TURN_MAX_INPUT_CHARS,
  ProviderInteractionMode,
  isRuntimeModeAbove,
  resolveProviderInstanceEnabled,
  resolveProjectProviderInstanceEnabled,
  type ProviderSessionId,
  RunId,
  RuntimeMode,
  ThreadLinkedPullRequest,
  ThreadId,
  TurnItemId,
  TrimmedNonEmptyString,
  managedRuntimeModeCeilingMessage,
} from "@t3tools/contracts";
import * as KeyedLock from "@t3tools/shared/KeyedLock";
import { modelSelectionsEqual } from "@t3tools/shared/model";
import { expandAssistantCitationsForProvider } from "@t3tools/shared/assistantCitations";
import { modelSwitchSince } from "./modelSwitch.ts";
import {
  contextBoundaryOrdinal,
  isScheduledFreshRun,
  turnItemsSinceContextBoundary,
} from "./contextBoundary.ts";
import { isPlaceholderThreadTitle } from "./placeholderThreadTitle.ts";
import { combinePullRequestWatchWakes, type PullRequestWatchWake } from "./pullRequestWatch.ts";
import { outputRequestProblem } from "./runOutput.ts";
import * as WorktreeSetupTracker from "../project/WorktreeSetupTracker.ts";
import { recordThreadOpen } from "@t3tools/shared/paletteSearch";
import { isSlashCommand } from "@t3tools/shared/composerTrigger";
import {
  backgroundWorkHoldsCompletion,
  derivePendingBackgroundWork,
  hasPendingBackgroundSubagent,
  pendingBackgroundTurnItems,
} from "@t3tools/shared/orchestrationV2PendingBackgroundWork";
import * as Context from "effect/Context";
import * as DateTime from "effect/DateTime";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as FiberSet from "effect/FiberSet";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Ref from "effect/Ref";
import * as Result from "effect/Result";
import * as Schedule from "effect/Schedule";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";

import * as ProjectStore from "./ProjectStore.ts";
import * as TaskFolderStore from "../workspace/TaskFolderStore.ts";
import {
  isCheckpointRestoreIsolated,
  SHARED_WORKSPACE_RESTORE_MESSAGE,
} from "./CheckpointRestoreSafety.ts";
import { CheckpointServiceV2 } from "./CheckpointService.ts";
import {
  CommandPolicyV2,
  followUpOwnerRun,
  goalCommandStopsActiveRun,
  isActiveRun,
  isNativeMaintenanceCommand,
  providerSwitchWaitsForTurn,
  providerTurnCapabilities,
  resolveMessageDispatch,
  resolveMessageDispatchIntent,
} from "./CommandPolicy.ts";
import { CommandReceiptStoreV2, type CommandReceiptV2 } from "./CommandReceiptStore.ts";
import {
  ContextHandoffServiceV2,
  readForkHistoryItems,
  readInheritedHandoffItems,
  visibleConversationItems,
  visibleDeltaRunOrdinals,
} from "./ContextHandoffService.ts";
import { notificationTurnItem } from "@t3tools/provider-core/server/notification";
import {
  cancelledBeforeStart,
  continuationFailedBeforePrompt,
  continuationStartRetryDelayMs,
  delegatedTaskAwaitsWork,
  delegatedTaskResultRun,
  delegatedTaskRuns,
  isRestartContinuationSource,
  runOutcome,
} from "./RestartBackgroundNote.ts";
import {
  isBufferedProviderNotification,
  isUndeliveredMailboxSteer,
} from "./NotificationMailbox.ts";
import { EventSinkV2 } from "./EventSink.ts";
import {
  decideGuestMessageSend,
  guestShareAfterCancelledSend,
  releasedGuestAttachmentIds,
  withoutGuestAttribution,
  decideGuestShareCommand,
  type GuestShareCommand,
} from "./GuestShareDecider.ts";
import * as EffectOutbox from "./EffectOutbox.ts";
import { withCommandMetrics } from "../observability/Metrics.ts";
import type { OrchestrationEffectRequestV2, PendingOrchestrationEffectV2 } from "./EffectOutbox.ts";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import * as ThreadCommandExecutor from "./ThreadCommandExecutor.ts";
import {
  DispatchModeLimit,
  exceededDispatchModeLimit,
  narrowToCeiling,
  type RuntimeModeCeiling,
  runtimeModeCeilingRefusal,
  threadsStartingWork,
} from "./DispatchModeLimit.ts";
import {
  applyToProjection,
  emptyProjection,
  threadShellFromProjection,
  ProjectionStoreV2,
  type ProjectionRecordField,
  type ProjectionTimelinePage,
  type ProjectionTimelinePageOptions,
  type ProjectionRecordFilter,
  type ProjectionRecords,
  type ProjectionCheckpointContext,
  type OlderSettledThreadsListing,
  type ActiveShellIndexEntry,
  type ActiveThreadListEntry,
  type OlderSettledThreadsQuery,
  type ShellSnapshotOptions,
} from "./ProjectionStore.ts";
import { ProviderAdapterRegistryV2 } from "./ProviderAdapterRegistry.ts";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import { makeProviderFailure } from "@t3tools/provider-core/server/failure";
import * as RunExecutionService from "./RunExecutionService.ts";
import { makeInterruptResultTurnItem } from "./runInterruptResult.ts";
import { ProviderSessionManagerV2 } from "./ProviderSessionManager.ts";
import { ProviderSwitchServiceV2 } from "./ProviderSwitchService.ts";
import { isAutomaticCompletionRun, queuedRunsInDeliveryOrder } from "./QueuedRunOrder.ts";
import { isRuntimePolicyAboveCeilingError, RuntimePolicyV2 } from "./RuntimePolicy.ts";
import {
  endOrphanedNativeSubagent,
  endRunlessRootTurns,
  makeSubagentChildThread,
  SUBAGENT_RESULT_TURN_ITEM_TYPES,
  subagentResultForRun,
  delegatedTaskProgress,
  delegatedTaskReportRuns,
  monitorUpdateRunIds,
  subagentThreadTitle,
} from "@t3tools/provider-core/server/subagentProjection";
import {
  forkableSourceRunStatusError,
  isForkableSourceRunStatus,
  ThreadForkServiceV2,
} from "./ThreadForkService.ts";
import { planThreadDeletion } from "./ThreadDeletion.ts";
import type * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";
import * as ServerSettings from "../serverSettings.ts";
// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindDispatchDelegatedTaskRequest = (ctx: any) =>
  Effect.fn("orchestrationV2.dispatch.delegatedTaskRequest")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "delegated_task.request" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const {
      OrchestratorDispatchError,
      OrchestratorProjectionError,
      OrchestratorProviderAdapterError,
      backgroundSubagentOutlivesRun,
      contextSourcePointForRun,
      dispatchMessage,
      emit,
      getProjectionWithPendingEvents,
      idAllocator,
      mapDispatchError,
      nextTurnItemOrdinal,
      projectionStore,
      providerAdapters,
      providerTurnForRun,
      stopReachedRun,
      subagentCount,
    } = pickScriptcBindCtx(ctx);

    const parentProjection = yield* projectionStore
      .getRunProviderRecords(command.parentThreadId, command.parentRunId, command.parentNodeId)
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: command.parentThreadId, cause }),
        ),
      );
    const parentRun = parentProjection.runs.find(
      (candidate) => candidate.id === command.parentRunId,
    );
    if (
      parentRun === undefined ||
      !(isActiveRun(parentRun) || (yield* backgroundSubagentOutlivesRun(parentRun)))
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Parent run ${command.parentRunId} is not active.`,
      });
    }
    if (yield* stopReachedRun(command, command.parentThreadId, parentRun.id)) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Parent run ${command.parentRunId} is stopping.`,
      });
    }
    const parentNode = parentProjection.nodes.find(
      (candidate) => candidate.id === command.parentNodeId,
    );
    if (
      parentNode === undefined ||
      parentNode.runId !== parentRun.id ||
      parentRun.rootNodeId === null
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Parent node ${command.parentNodeId} is not part of active run ${parentRun.id}.`,
      });
    }

    const targetAdapter = yield* providerAdapters.get(command.modelSelection.instanceId).pipe(
      Effect.mapError(
        (cause) =>
          new OrchestratorProviderAdapterError({
            commandId: command.commandId,
            providerInstanceId: command.modelSelection.instanceId,
            cause,
          }),
      ),
    );

    const now = command.createdAt ?? (yield* DateTime.now);
    const taskNodeId = idAllocator.derive.delegatedTaskNode({
      commandId: command.commandId,
    });
    const childThreadId = idAllocator.derive.delegatedTaskThread({
      commandId: command.commandId,
    });
    const childMessageId = idAllocator.derive.delegatedTaskMessage({
      commandId: command.commandId,
    });
    const taskTurnItemId = idAllocator.derive.delegatedTaskTurnItem({
      commandId: command.commandId,
    });
    const taskTitle = subagentThreadTitle({
      parentTitle: parentProjection.thread.title,
      prompt: command.task,
      ...(command.title === undefined ? {} : { title: command.title }),
      ordinal: (yield* subagentCount(command.parentThreadId)) + 1,
    });
    const childThread: OrchestrationV2AppThread = {
      ...makeSubagentChildThread({
        parentThread: parentProjection.thread,
        childThreadId,
        parentNodeId: taskNodeId,
        activeProviderThreadId: null,
        providerInstanceId: command.modelSelection.instanceId,
        modelSelection: command.modelSelection,
        title: taskTitle,
        now,
        createdBy: command.createdBy,
        creationSource: command.creationSource,
      }),
      runtimeMode: command.runtimeMode,
      interactionMode: command.interactionMode,
      ...(command.workspaceStrategy === undefined ? {} : { branch: null, worktreePath: null }),
    };
    const task: OrchestrationV2Subagent = {
      id: taskNodeId,
      threadId: command.parentThreadId,
      runId: parentRun.id,
      parentNodeId: command.parentNodeId,
      origin: "app_owned",
      createdBy: command.createdBy,
      driver: targetAdapter.driver,
      providerInstanceId: command.modelSelection.instanceId,
      providerThreadId: null,
      childThreadId,
      nativeTaskRef: null,
      prompt: command.task,
      title: command.title ?? null,
      model: command.modelSelection.model,
      modelSelection: command.modelSelection,
      ...(command.completionWake === undefined ? {} : { completionWake: command.completionWake }),
      status: "running",
      result: null,
      startedAt: now,
      completedAt: null,
      updatedAt: now,
    };
    const taskNode: OrchestrationV2ExecutionNode = {
      id: taskNodeId,
      threadId: command.parentThreadId,
      runId: parentRun.id,
      parentNodeId: command.parentNodeId,
      rootNodeId: parentRun.rootNodeId,
      kind: "subagent",
      status: "running",
      countsForRun: false,
      providerThreadId: null,
      providerTurnId: null,
      nativeItemRef: null,
      runtimeRequestId: null,
      checkpointScopeId: null,
      startedAt: now,
      completedAt: null,
    };
    const parentProviderTurn = providerTurnForRun(parentProjection, parentRun);
    const taskTurnItem: OrchestrationV2TurnItem = {
      id: taskTurnItemId,
      threadId: command.parentThreadId,
      runId: parentRun.id,
      nodeId: taskNodeId,
      providerThreadId: parentRun.providerThreadId,
      providerTurnId: parentProviderTurn?.id ?? null,
      nativeItemRef: null,
      parentItemId: null,
      ordinal: yield* nextTurnItemOrdinal(parentProjection),
      status: "running",
      title: command.title ?? taskTitle,
      startedAt: now,
      completedAt: null,
      updatedAt: now,
      type: "subagent",
      subagentId: taskNodeId,
      origin: "app_owned",
      driver: targetAdapter.driver,
      providerInstanceId: command.modelSelection.instanceId,
      childThreadId,
      prompt: command.task,
      result: null,
    };
    const emitEvent = emit(events, command);

    yield* emitEvent({
      type: "thread.created",
      threadId: childThreadId,
      driver: targetAdapter.driver,
      providerInstanceId: command.modelSelection.instanceId,
      occurredAt: now,
      payload: childThread,
    });
    yield* emitEvent({
      type: "node.updated",
      threadId: command.parentThreadId,
      runId: parentRun.id,
      nodeId: taskNodeId,
      driver: targetAdapter.driver,
      providerInstanceId: command.modelSelection.instanceId,
      occurredAt: now,
      payload: taskNode,
    });
    yield* emitEvent({
      type: "subagent.updated",
      threadId: command.parentThreadId,
      runId: parentRun.id,
      nodeId: taskNodeId,
      driver: targetAdapter.driver,
      providerInstanceId: command.modelSelection.instanceId,
      occurredAt: now,
      payload: task,
    });
    yield* emitEvent({
      type: "turn-item.updated",
      threadId: command.parentThreadId,
      runId: parentRun.id,
      nodeId: taskNodeId,
      driver: targetAdapter.driver,
      providerInstanceId: command.modelSelection.instanceId,
      occurredAt: now,
      payload: taskTurnItem,
    });

    const childMessageCommand = {
      type: "message.dispatch",
      createdBy: command.createdBy,
      creationSource: command.creationSource,
      commandId: command.commandId,
      threadId: childThreadId,
      senderThreadId: command.parentThreadId,
      messageId: childMessageId,
      text: command.task,
      attachments: [],
      modelSelection: command.modelSelection,
      dispatchMode:
        command.workspaceStrategy === undefined
          ? { type: "start_immediately" }
          : { type: "defer_start", workspaceStrategy: command.workspaceStrategy },
    } satisfies Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }>;
    yield* dispatchMessage(childMessageCommand, events, effects);

    const childProjection = yield* getProjectionWithPendingEvents(childThreadId, events);
    const childRun = childProjection.runs[0];
    if (childRun === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Delegated child thread ${childThreadId} did not create a run.`,
      });
    }
    const spawnTransferId = yield* mapDispatchError(command)(
      idAllocator.allocate.contextTransfer({
        sourceThreadId: command.parentThreadId,
        targetThreadId: childThreadId,
        type: "subagent_spawn",
      }),
    );
    const spawnTransfer: OrchestrationV2ContextTransfer = {
      id: spawnTransferId,
      type: "subagent_spawn",
      sourceThreadId: command.parentThreadId,
      targetThreadId: childThreadId,
      sourcePoint: {
        ...contextSourcePointForRun(parentProjection, parentRun),
        turnItemId: taskTurnItemId,
      },
      basePoint: null,
      sourceProviderInstanceId: parentRun.providerInstanceId,
      targetProviderInstanceId: command.modelSelection.instanceId,
      targetRunId: childRun.id,
      status: "consumed",
      resolution: null,
      createdBy: command.createdBy,
      error: null,
      createdAt: now,
      updatedAt: now,
      consumedAt: now,
    };
    yield* emitEvent({
      type: "context-transfer.created",
      threadId: childThreadId,
      runId: childRun.id,
      providerInstanceId: command.modelSelection.instanceId,
      occurredAt: now,
      payload: spawnTransfer,
    });
  });
