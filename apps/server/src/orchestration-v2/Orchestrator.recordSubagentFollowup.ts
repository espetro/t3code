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
export const bindRecordSubagentFollowup = (ctx: any) =>
  Effect.fnUntraced(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const {
      emit,
      idAllocator,
      mapDispatchError,
      mayStartSubagentFollowup,
      nextTurnItemOrdinal,
      projectionStore,
      providerAdapters,
      providerTurnForRun,
    } = pickScriptcBindCtx(ctx);

    if (!mayStartSubagentFollowup(command)) return;
    const pending = yield* Ref.get(events);
    const message = pending
      .flatMap((event) =>
        event.type === "message.updated" && event.payload.id === command.messageId
          ? [event.payload]
          : [],
      )
      .at(-1);
    if (message?.runId == null) return;
    // Only new attempts can own tasks; steers join an existing snapshot that cannot settle newly bound tasks.
    const startsAttempt = pending.some(
      (event) =>
        (event.type === "run.created" && event.payload.id === message.runId) ||
        (event.type === "run-attempt.created" && event.payload.runId === message.runId),
    );
    if (!startsAttempt) return;
    const child = yield* projectionStore.getThread(command.threadId);
    const parentThreadId = child.lineage.parentThreadId;
    // A send with no sender thread comes from a client acting for the owner, like a user send.
    if (
      child.lineage.relationshipToParent !== "subagent" ||
      parentThreadId === null ||
      (command.notification === undefined &&
        command.createdBy !== "user" &&
        command.usageLimitContinuationOfRunId === undefined &&
        command.senderThreadId !== undefined &&
        command.senderThreadId !== parentThreadId)
    )
      return;
    const run =
      pending
        .flatMap((event) =>
          (event.type === "run.created" || event.type === "run.updated") &&
          event.payload.id === message.runId
            ? [event.payload]
            : [],
        )
        .at(-1) ??
      (yield* projectionStore.getThreadRecords(command.threadId, ["runs"])).runs.find(
        (row) => row.id === message.runId,
      );
    if (run === undefined || run.delegatedTaskId !== undefined) return;
    // A wake continues the latest follow-up while it is open, as it continues the original task.
    const latestFollowupId =
      command.notification === undefined
        ? undefined
        : (yield* projectionStore
            .getThreadRecords(command.threadId, ["runs"])
            .pipe(mapDispatchError(command))).runs
            .filter((row) => row.id !== run.id && row.delegatedTaskId !== undefined)
            .toSorted((a, b) => b.ordinal - a.ordinal)[0]?.delegatedTaskId;
    const parent = yield* projectionStore
      .getThreadRecords(parentThreadId, ["runs", "subagents"], {
        // Every run followUpOwnerRun can pick, so a long parent's history stays unread.
        runStatuses: ["preparing", "starting", "running", "waiting"],
        includeLatestExecutedRun: true,
        subagentIds: [
          ...(child.forkedFrom?.type === "node" ? [child.forkedFrom.nodeId] : []),
          ...(latestFollowupId === undefined ? [] : [latestFollowupId]),
        ],
      })
      .pipe(mapDispatchError(command));
    const original = parent.subagents.find(
      (task) =>
        task.origin === "app_owned" &&
        task.childThreadId === child.id &&
        task.id === (child.forkedFrom?.type === "node" ? child.forkedFrom.nodeId : undefined),
    );
    if (original === undefined || original.result === null) return;
    const openFollowup = parent.subagents.find(
      (task) =>
        task.id === latestFollowupId &&
        task.origin === "app_owned" &&
        task.childThreadId === child.id &&
        task.cancelledRunId === undefined &&
        task.result === null,
    );
    if (openFollowup !== undefined) {
      yield* emit(
        events,
        command,
      )({
        type: "run.updated",
        threadId: child.id,
        runId: run.id,
        occurredAt: message.createdAt,
        payload: { ...run, delegatedTaskId: openFollowup.id },
      });
      return;
    }
    const owner = followUpOwnerRun(parent.runs);
    if (owner === null || owner.rootNodeId === null) return;
    const ownerRecords = yield* projectionStore
      .getRunProviderRecords(parentThreadId, owner.id, owner.rootNodeId)
      .pipe(mapDispatchError(command));
    const now = message.createdAt;
    const adapter = yield* providerAdapters.get(run.providerInstanceId);
    const taskId = idAllocator.derive.delegatedTaskNode({ commandId: command.commandId });
    const task: OrchestrationV2Subagent = {
      ...original,
      createdBy: command.createdBy,
      driver: adapter.driver,
      id: taskId,
      runId: owner.id,
      parentNodeId: owner.rootNodeId,
      providerInstanceId: run.providerInstanceId,
      providerThreadId: run.providerThreadId,
      model: run.modelSelection.model,
      modelSelection: run.modelSelection,
      prompt: command.text,
      title: child.title,
      completionWake: "always",
      completionDelivery: { state: "pending", observedByRunId: null },
      status: run.status === "queued" ? (run.queueHeld === true ? "idle" : "pending") : "running",
      progress: undefined,
      cancelledRunId: undefined,
      result: null,
      startedAt: now,
      completedAt: null,
      updatedAt: now,
    };
    const node: OrchestrationV2ExecutionNode = {
      id: taskId,
      threadId: parentThreadId,
      runId: owner.id,
      parentNodeId: owner.rootNodeId,
      rootNodeId: owner.rootNodeId,
      kind: "subagent",
      status: task.status,
      countsForRun: false,
      providerThreadId: run.providerThreadId,
      providerTurnId: null,
      nativeItemRef: null,
      runtimeRequestId: null,
      checkpointScopeId: null,
      startedAt: now,
      completedAt: null,
    };
    const turnItem: OrchestrationV2TurnItem = {
      id: idAllocator.derive.delegatedTaskTurnItem({ commandId: command.commandId }),
      threadId: parentThreadId,
      runId: owner.id,
      nodeId: taskId,
      providerThreadId: owner.providerThreadId,
      providerTurnId: providerTurnForRun(ownerRecords, owner)?.id ?? null,
      nativeItemRef: null,
      parentItemId: null,
      ordinal: yield* nextTurnItemOrdinal(parent),
      status: task.status,
      title: child.title,
      startedAt: now,
      completedAt: null,
      updatedAt: now,
      type: "subagent",
      subagentId: taskId,
      origin: "app_owned",
      driver: task.driver,
      providerInstanceId: task.providerInstanceId,
      childThreadId: child.id,
      prompt: command.text,
      result: null,
    };
    const emitEvent = emit(events, command);
    // Stop disposed the results owed at the time; a follow-up started after it is owed a wake again.
    // Re-read the owner so a terminal update since `parent` was read is kept.
    const currentOwner =
      owner.delegatedCompletion?.disposition === "stopped"
        ? (yield* projectionStore
            .getThreadRecords(parentThreadId, ["runs"], { runIds: [owner.id] })
            .pipe(mapDispatchError(command))).runs[0]
        : undefined;
    if (currentOwner?.delegatedCompletion?.disposition === "stopped") {
      yield* emitEvent({
        type: "run.updated",
        threadId: parentThreadId,
        runId: currentOwner.id,
        nodeId: owner.rootNodeId,
        providerInstanceId: currentOwner.providerInstanceId,
        occurredAt: now,
        payload: {
          ...currentOwner,
          delegatedCompletion: {
            ...currentOwner.delegatedCompletion,
            disposition: "open",
            reopenedAfterStop: true,
          },
        },
      });
    }
    yield* emitEvent({
      type: "run.updated",
      threadId: child.id,
      runId: run.id,
      occurredAt: now,
      payload: { ...run, delegatedTaskId: taskId },
    });
    yield* emitEvent({
      type: "node.updated",
      threadId: parentThreadId,
      runId: owner.id,
      nodeId: taskId,
      occurredAt: now,
      payload: node,
    });
    yield* emitEvent({
      type: "subagent.updated",
      threadId: parentThreadId,
      runId: owner.id,
      nodeId: taskId,
      occurredAt: now,
      payload: task,
    });
    yield* emitEvent({
      type: "turn-item.updated",
      threadId: parentThreadId,
      runId: owner.id,
      nodeId: taskId,
      occurredAt: now,
      payload: turnItem,
    });
  });
