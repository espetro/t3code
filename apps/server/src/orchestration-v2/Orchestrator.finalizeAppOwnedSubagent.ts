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
export const bindFinalizeAppOwnedSubagent = (ctx: any) =>
  Effect.fn("Orchestrator.finalizeAppOwnedSubagent")(function* (
    childThreadId: ThreadId,
    options?: { readonly settledContinuationOf?: RunId; readonly syncRunId?: RunId },
  ) {
    const {
      childAwaitsRestartContinuation,
      delegatedTaskTerminalStatus,
      dispatchWithReceipt,
      finalizeAppOwnedSubagentTask,
      projectionStore,
      readDelegatedChildControls,
    } = pickScriptcBindCtx(ctx);

    const child = yield* projectionStore.getThreadRecords(childThreadId, ["contextTransfers"]);
    const parentThreadId = child.thread.lineage.parentThreadId;
    const forkedFrom = child.thread.forkedFrom;
    if (
      child.thread.lineage.relationshipToParent !== "subagent" ||
      parentThreadId === null ||
      forkedFrom?.type !== "node"
    )
      return;
    // Each task of this child names it, so the parent's other tasks stay unread.
    const parent = yield* projectionStore.getThreadRecords(parentThreadId, ["subagents"], {
      subagentChildThreadIds: [childThreadId],
    });
    const resultSent = child.contextTransfers.some(
      (transfer) =>
        transfer.type === "subagent_result" &&
        transfer.sourceThreadId === childThreadId &&
        transfer.targetThreadId === parentThreadId,
    );
    const openTasks = parent.subagents.filter(
      (task) =>
        task.origin === "app_owned" &&
        task.childThreadId === childThreadId &&
        !(task.result !== null && resultSent),
    );
    const { controls: childControls, progress } = yield* readDelegatedChildControls(
      childThreadId,
      openTasks.map((task) => task.id),
    );
    const cancelAwaitsWork = progress.state === "working" && !progress.onlyAwaitsUserRun;
    for (const task of openTasks) {
      // A cancelled task does not wait for the work its cancel is stopping.
      const cancelled = task.cancelledRunId !== undefined;
      if (
        task.id === forkedFrom.nodeId &&
        (cancelled ? cancelAwaitsWork : progress.state !== "result_available")
      )
        continue;
      yield* finalizeAppOwnedSubagentTask(childControls, {
        ...options,
        task,
        ...(progress.resultRun === undefined ? {} : { resultRun: progress.resultRun }),
      });
    }

    // Only the run a cancelled task settled from ends with it. The row read above has no
    // such run yet when this call settled the task, from the same result run.
    const { resultRun } = progress;
    const resultTaskId = resultRun?.delegatedTaskId ?? forkedFrom.nodeId;
    const resultTask = parent.subagents.find((task) => task.id === resultTaskId);
    const taskCancelled =
      resultTask?.cancelledRunId !== undefined && resultTask.cancelledRunId === resultRun?.id;
    if (
      resultRun === undefined ||
      (taskCancelled ? cancelAwaitsWork : progress.state !== "result_available")
    )
      return;
    const status = delegatedTaskTerminalStatus(runOutcome(resultRun));
    if (status !== "interrupted" && status !== "cancelled" && !taskCancelled) return;
    if (
      yield* childAwaitsRestartContinuation(
        childControls.runs,
        resultRun,
        options?.settledContinuationOf,
      )
    )
      return;
    // Callers hold the parent lock; dismiss takes the child lock, as follow-up intake does.
    const { runtimeRequests } = yield* projectionStore.getThreadRecords(childThreadId, [
      "runtimeRequests",
    ]);
    const pendingQuestions = runtimeRequests.filter(
      (request) =>
        request.status === "pending" &&
        request.kind === "user_input" &&
        request.responseCapability.type === "message",
    );
    if (pendingQuestions.length === 0) return;
    const { nodes } = yield* projectionStore.getThreadRecords(childThreadId, ["nodes"]);
    const resultRunIds = new Set<RunId>();
    let run: OrchestrationV2Run | undefined = resultRun;
    while (run !== undefined && !resultRunIds.has(run.id)) {
      resultRunIds.add(run.id);
      const previousRunId: RunId | undefined = run.restartContinuationOfRunId;
      run =
        previousRunId === undefined
          ? undefined
          : (childControls.runs.find((candidate) => candidate.id === previousRunId) ??
            (yield* projectionStore.getRun(childThreadId, previousRunId)));
    }
    for (const request of pendingQuestions) {
      if (
        nodes.some(
          (node) =>
            node.id === request.nodeId && node.runId !== null && resultRunIds.has(node.runId),
        )
      ) {
        yield* dispatchWithReceipt({
          type: "thread.user-input.dismiss",
          commandId: CommandId.make(`command:system:delegated-task-question:${request.id}`),
          threadId: childThreadId,
          requestId: request.id,
        }).pipe(
          Effect.catchCause((cause) =>
            Effect.logWarning("Failed to dismiss task question", {
              requestId: request.id,
              cause,
            }),
          ),
        );
      }
    }
  });
