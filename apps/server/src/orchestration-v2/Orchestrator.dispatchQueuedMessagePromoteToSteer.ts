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
export const bindDispatchQueuedMessagePromoteToSteer = (ctx: any) =>
  Effect.fn("Orchestrator.dispatchQueuedMessagePromoteToSteer")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "queued-message.promote-to-steer" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const {
      OrchestratorDispatchError,
      commandPolicy,
      dispatchSteerIntoRun,
      emit,
      ensureGoalCommandSupported,
      ensureSteeringMessage,
      goalDriverFor,
      isLiveRun,
      limitForbidsParkedSteer,
      loadProjectionForCommand,
      mapDispatchError,
      providerAdapters,
      queuedRunModelSelection,
      stopReachedRun,
      stopRunForQueuedCommand,
    } = pickScriptcBindCtx(ctx);

    const projection = yield* loadProjectionForCommand(
      command,
      [
        "runs",
        "nodes",
        "attempts",
        "messages",
        "providerThreads",
        "providerTurns",
        "providerSessions",
        "turnItems",
        "runtimeRequests",
        "subagents",
      ],
      // User messages measure a restart's model switch. Steering reads root and live nodes only.
      { turnItemTypes: ["user_message"], messageRoles: ["user"], omitSettledLeafNodes: true },
    );
    if (projection.thread.archivedAt !== null || projection.thread.deletedAt !== null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is not active.`,
      });
    }
    const queuedRun = projection.runs.find((candidate) => candidate.id === command.queuedRunId);
    if (queuedRun === undefined || queuedRun.status !== "queued") {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Queued run ${command.queuedRunId} is not queued.`,
      });
    }
    const queuedRootNode =
      queuedRun.rootNodeId === null
        ? undefined
        : projection.nodes.find((candidate) => candidate.id === queuedRun.rootNodeId);
    const queuedAttempt =
      queuedRun.activeAttemptId === null
        ? undefined
        : projection.attempts.find((candidate) => candidate.id === queuedRun.activeAttemptId);
    const queuedMessage = projection.messages.find(
      (candidate) => candidate.id === queuedRun.userMessageId,
    );
    if (
      queuedRootNode === undefined ||
      queuedAttempt === undefined ||
      queuedMessage === undefined
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Queued run ${queuedRun.id} is missing message or execution state.`,
      });
    }
    if (
      queuedMessage.delegatedCompletion !== undefined ||
      queuedMessage.notification !== undefined
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: "Automatic completion deliveries cannot be promoted to Steer.",
      });
    }

    const now = yield* DateTime.now;
    const emitEvent = emit(events, command);
    // A scheduled delivery steers on the thread's current pick, so /goal must suit that provider.
    const modelSelection = queuedRunModelSelection(projection, queuedRun);
    const parsedGoalCommand = parseGoalCommand(queuedMessage);
    const goalCommand =
      parsedGoalCommand === null ||
      (yield* goalDriverFor(command, modelSelection.instanceId)) === undefined
        ? null
        : parsedGoalCommand;
    const target = projection.runs.find((run) => run.id === command.targetRunId);
    const targetMessage = projection.messages.find(
      (message) => message.id === target?.userMessageId,
    );
    // A compacting turn cannot take steering input, so steering skips the compaction instead.
    if (
      target !== undefined &&
      targetMessage !== undefined &&
      isCompactionCommandMessage(targetMessage)
    ) {
      if (goalCommand !== null) {
        yield* ensureGoalCommandSupported(command, queuedMessage, modelSelection.instanceId);
      }
      yield* emitEvent({
        type: "run.updated",
        threadId: command.threadId,
        runId: queuedRun.id,
        nodeId: queuedRootNode.id,
        providerInstanceId: queuedRun.providerInstanceId,
        occurredAt: now,
        payload: { ...queuedRun, queuePosition: 1 },
      });
      const stops =
        isLiveRun(target) && !(yield* stopReachedRun(command, command.threadId, target.id));
      return yield* stopRunForQueuedCommand({
        command,
        events,
        effects,
        projection,
        queuedRunId: queuedRun.id,
        targetRunId: stops ? target.id : undefined,
        reason: "Skipped compaction to send a queued message",
        now,
      });
    }
    // Skipping compaction starts the message as its own turn; steering would join the current one.
    if (queuedRun.freshContext === true) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: "A message that starts a fresh session can't steer the current turn.",
      });
    }
    // Steering joins a turn that was not asked for this message's result, so it would be lost.
    if (queuedRun.outputSchema !== undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: "A message that asks for a result can't steer the current turn.",
      });
    }
    // A steered command replaces the turn's task, so promoting one only moves it first.
    if (goalCommand !== null || isSlashCommand(queuedMessage)) {
      if (goalCommand !== null) {
        yield* ensureGoalCommandSupported(command, queuedMessage, modelSelection.instanceId);
      }
      const goal = projection.providerThreads.find(
        (candidate) => candidate.id === target?.providerThreadId,
      )?.goal;
      yield* emitEvent({
        type: "run.updated",
        threadId: command.threadId,
        runId: queuedRun.id,
        nodeId: queuedRootNode.id,
        providerInstanceId: queuedRun.providerInstanceId,
        occurredAt: now,
        payload: { ...queuedRun, queuePosition: 1 },
      });
      const stops =
        goalCommand !== null &&
        target !== undefined &&
        isLiveRun(target) &&
        goalCommandStopsActiveRun(goalCommand, goal?.status ?? null) &&
        (targetMessage === undefined || !isNativeMaintenanceCommand(targetMessage)) &&
        !(yield* stopReachedRun(command, command.threadId, target.id));
      return yield* stopRunForQueuedCommand({
        command,
        events,
        effects,
        projection,
        queuedRunId: queuedRun.id,
        targetRunId: stops ? target.id : undefined,
        reason: "Stopped to apply /goal",
        now,
      });
    }
    if (
      (target?.status === "preparing" ||
        target?.status === "starting" ||
        (target?.status === "running" &&
          !projection.providerTurns.some(
            (turn) => turn.runAttemptId === target.activeAttemptId && turn.status === "running",
          ))) &&
      !(yield* stopReachedRun(command, command.threadId, target.id))
    ) {
      if (yield* limitForbidsParkedSteer) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "The current turn is not running yet. Try again once it is.",
        });
      }
      yield* ensureSteeringMessage(command, queuedMessage);
      const adapter = yield* providerAdapters
        .get(target.providerInstanceId)
        .pipe(mapDispatchError(command));
      const capabilities = yield* adapter.getCapabilities().pipe(mapDispatchError(command));
      yield* commandPolicy
        .decideSteeringExecution({
          commandId: command.commandId,
          threadId: command.threadId,
          providerInstanceId: target.providerInstanceId,
          capabilities,
        })
        .pipe(mapDispatchError(command));
      yield* emitEvent({
        type: "run.updated",
        threadId: command.threadId,
        runId: queuedRun.id,
        nodeId: queuedRootNode.id,
        providerInstanceId: queuedRun.providerInstanceId,
        occurredAt: now,
        payload: { ...queuedRun, steerWhenReadyRunId: target.id },
      });
      return;
    }
    yield* emitEvent({
      type: "run.updated",
      threadId: command.threadId,
      runId: queuedRun.id,
      nodeId: queuedRootNode.id,
      providerInstanceId: queuedRun.providerInstanceId,
      occurredAt: now,
      payload: {
        ...queuedRun,
        status: "cancelled",
        queuePosition: null,
        completedAt: now,
      },
    });
    yield* emitEvent({
      type: "run-attempt.updated",
      threadId: command.threadId,
      runId: queuedRun.id,
      nodeId: queuedRootNode.id,
      providerInstanceId: queuedRun.providerInstanceId,
      occurredAt: now,
      payload: {
        ...queuedAttempt,
        status: "cancelled",
        completedAt: now,
      },
    });
    yield* emitEvent({
      type: "node.updated",
      threadId: command.threadId,
      runId: queuedRun.id,
      nodeId: queuedRootNode.id,
      providerInstanceId: queuedRun.providerInstanceId,
      occurredAt: now,
      payload: {
        ...queuedRootNode,
        status: "cancelled",
        completedAt: now,
      },
    });

    yield* dispatchSteerIntoRun({
      command,
      events,
      effects,
      projection,
      modelSelection,
      targetRunId: command.targetRunId,
      messageId: queuedMessage.id,
      text: queuedMessage.text,
      attachments: queuedMessage.attachments,
      ...(queuedMessage.context ? { context: queuedMessage.context } : {}),
      createdBy: queuedMessage.createdBy,
      creationSource: queuedMessage.creationSource,
      ...(queuedMessage.scheduledTaskId === undefined
        ? {}
        : { scheduledTaskId: queuedMessage.scheduledTaskId }),
      ...(queuedMessage.senderThreadId === undefined
        ? {}
        : { senderThreadId: queuedMessage.senderThreadId }),
      ...(queuedMessage.linkedSender === undefined
        ? {}
        : { linkedSender: queuedMessage.linkedSender }),
      ...(queuedMessage.idleCompaction === undefined
        ? {}
        : { idleCompaction: queuedMessage.idleCompaction }),
      forceRestart: false,
    });
  });
