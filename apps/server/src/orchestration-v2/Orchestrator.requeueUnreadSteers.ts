// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of Orchestrator.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
import type {
  OrchestrationV2ThreadLinkMetadata,
  OrchestrationV2SearchThreadInput,
  OrchestrationV2SearchThreadResult,
  OrchestrationV2ThreadHistoryPage,
} from "@t3tools/contracts/orchestrationV2";
import type { GuestShareId, ProjectId } from "@t3tools/contracts/baseSchemas";
import {
  latestExecutedRun,
  latestRootProviderFailure,
  orchestrationV2WorktreePending,
  runRanAfter,
  usageLimitBlockedRun,
} from "@t3tools/shared/orchestrationV2ThreadError";
import { threadIssueKeysEqual } from "@t3tools/contracts/issue";
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
  isCompactionCommandMessage,
  isDeliveredProviderTurn,
  isOrchestrationV2WorkActive,
  isProviderNativeSubagentThread,
  OrchestrationV2Command,
  type OrchestrationV2InternalCommand,
  type OrchestrationV2LimitRecoveryUpdate,
  type OrchestrationV2Notification,
  type OrchestrationV2ServerCommand,
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
} from "@t3tools/contracts/orchestrationV2";
import {
  type ChatAttachment,
  PROVIDER_SEND_TURN_MAX_INPUT_CHARS,
} from "@t3tools/contracts/chatAttachment";
import {
  CommandId,
  type GuestMessageId,
  MessageId,
  type NodeId,
  type ProviderSessionId,
  RunId,
  ThreadId,
  TurnItemId,
  TrimmedNonEmptyString,
} from "@t3tools/contracts/baseSchemas";
import { type ModelSelection } from "@t3tools/contracts/modelSelection";
import {
  type ThreadPullRequestLink,
  type ThreadPullRequestWatch,
  type PullRequestWatchUntil,
  ThreadLinkedPullRequest,
} from "@t3tools/contracts/threadPullRequest";
import { ProviderInstanceId } from "@t3tools/contracts/providerInstance";
import {
  ProviderInteractionMode,
  isRuntimeModeAbove,
  RuntimeMode,
} from "@t3tools/contracts/providerPolicy";
import {
  resolveProviderInstanceEnabled,
  resolveProjectProviderInstanceEnabled,
} from "@t3tools/contracts/settings";
import { managedRuntimeModeCeilingMessage } from "@t3tools/contracts/managedPolicy";
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
export const bindRequeueUnreadSteers = (ctx: any) =>
  Effect.fn("Orchestrator.requeueUnreadSteers")(function* (
    threadId: ThreadId,
    runIds?: ReadonlyArray<RunId>,
  ) {
    const {
      awaitsCheckpointCapture,
      dispatchWithReceiptEffect,
      effectOutbox,
      idAllocator,
      writeSystemEvents,
      projectionStore,
    } = pickScriptcBindCtx(ctx);

    const { turnItems } = yield* projectionStore.getThreadRecords(threadId, ["turnItems"], {
      turnItemTypes: ["user_message"],
      turnItemStatuses: ["pending"],
      ...(runIds === undefined ? {} : { turnItemRunIds: runIds }),
    });
    const unread = turnItems.filter(
      (item) =>
        item.type === "user_message" &&
        (item.inputIntent === "steer" || item.inputIntent === "promoted_queued_to_steer"),
    );
    if (unread.length === 0) return;
    const projection = yield* projectionStore.getThreadRecords(threadId, ["runs", "messages"], {
      messageIds: unread.flatMap((item) => (item.type === "user_message" ? [item.messageId] : [])),
    });
    const placed = [];
    for (const item of unread) {
      const run = projection.runs.find((candidate) => candidate.id === item.runId);
      const message = projection.messages.find(
        (candidate) =>
          item.type === "user_message" &&
          candidate.id === item.messageId &&
          candidate.runId === item.runId,
      );
      if (
        run === undefined ||
        message === undefined ||
        isActiveRun(run) ||
        (yield* awaitsCheckpointCapture(run))
      ) {
        continue;
      }
      // Stop drops a steer it reached; say so, as the adapter does for steers it still held.
      if (yield* projectionStore.hasRunInterruptRequest(threadId, run.id)) {
        const now = yield* DateTime.now;
        yield* writeSystemEvents([
          {
            type: "turn-item.updated",
            threadId,
            runId: run.id,
            ...(item.nodeId === null ? {} : { nodeId: item.nodeId }),
            providerInstanceId: run.providerInstanceId,
            occurredAt: now,
            payload: { ...item, status: "cancelled" as const, completedAt: now, updatedAt: now },
          },
          {
            type: "turn-item.updated",
            threadId,
            runId: run.id,
            ...(item.nodeId === null ? {} : { nodeId: item.nodeId }),
            providerInstanceId: run.providerInstanceId,
            occurredAt: now,
            payload: {
              id: idAllocator.derive.runSignalTurnItem({
                runId: run.id,
                signal: `unread-steer:${message.id}`,
              }),
              threadId,
              runId: run.id,
              nodeId: item.nodeId,
              providerThreadId: item.providerThreadId ?? null,
              providerTurnId: item.providerTurnId ?? null,
              nativeItemRef: null,
              parentItemId: null,
              ordinal: item.ordinal,
              type: "system_notice" as const,
              status: "completed" as const,
              title: "Steer delivery not confirmed",
              message: `The agent did not confirm reading your steer before Stop. It may not have been delivered. Resend it if needed: "${message.text}"`,
              startedAt: now,
              completedAt: now,
              updatedAt: now,
            },
          },
        ]);
        continue;
      }
      // The message's first steer effect recorded which runs were queued before it was sent; a
      // queued message that was promoted also stays behind only the runs queued before its own.
      const firstSteer = Option.getOrUndefined(
        yield* effectOutbox.firstSteer(threadId, message.id),
      )?.request;
      const steer = firstSteer?.type === "provider-turn.steer" ? firstSteer : undefined;
      const afterRunOrdinal = Math.max(
        0,
        Math.min(
          steer?.steerFollowUpAfterRunOrdinal ??
            Math.max(...projection.runs.map((candidate) => candidate.ordinal)),
          ...projection.runs.flatMap((candidate) =>
            candidate.userMessageId === message.id ? [candidate.ordinal - 1] : [],
          ),
        ),
      );
      placed.push({ item, run, message, steer, afterRunOrdinal });
    }
    // Each requeue starts the queue once it commits, so earlier places go first.
    placed.sort(
      (left, right) =>
        left.afterRunOrdinal - right.afterRunOrdinal || left.item.ordinal - right.item.ordinal,
    );
    for (const { run, message, steer, afterRunOrdinal } of placed) {
      yield* dispatchWithReceiptEffect({
        type: "message.dispatch",
        commandId: CommandId.make(`command:unread-steer:${run.id}:${message.id}`),
        threadId,
        messageId: message.id,
        steerFollowUpOfRunId: run.id,
        steerFollowUpAfterRunOrdinal: afterRunOrdinal,
        ...(message.followsThreadSelection === true
          ? {}
          : { modelSelection: steer?.modelSelection ?? run.modelSelection }),
        text: message.text,
        ...(message.context ? { context: message.context } : {}),
        attachments: message.attachments,
        ...(message.delegatedCompletion === undefined
          ? {}
          : { delegatedCompletion: message.delegatedCompletion }),
        ...(message.notification === undefined ? {} : { notification: message.notification }),
        dispatchMode: { type: "queue_after_active" },
        createdBy: message.createdBy,
        creationSource: message.creationSource,
        ...(message.scheduledTaskId === undefined
          ? {}
          : { scheduledTaskId: message.scheduledTaskId }),
        ...(message.senderThreadId === undefined ? {} : { senderThreadId: message.senderThreadId }),
        ...(message.linkedSender === undefined ? {} : { linkedSender: message.linkedSender }),
      }).pipe(
        Effect.catchCause((cause) =>
          Effect.logWarning("Failed to requeue an unread steer", {
            threadId,
            messageId: message.id,
            cause,
          }),
        ),
      );
    }
  });
