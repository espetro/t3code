// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of Orchestrator.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
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
export const bindFinalizeDelegatedCompletionDelivery = (ctx: any) =>
  Effect.fn("Orchestrator.finalizeDelegatedCompletionDelivery")(function* (
    threadId: ThreadId,
    runId: RunId,
  ) {
    const {
      idAllocator,
      isTerminalDelegatedTaskStatus,
      mapDelegatedCompletionError,
      offerDelegatedCompletionDelivery,
      projectionStore,
      writeSystemEvents,
    } = ctx;

    // Ordinary turns do not own a delegated delivery. Read just their input
    // before loading the cohort state needed to settle an actual delivery.
    const message = yield* projectionStore.getRunMessage(threadId, runId);
    if (message?.delegatedCompletion === undefined) return;
    const projection = yield* projectionStore.getThreadRecords(
      threadId,
      ["runs", "messages", "subagents"],
      {
        runIds: [runId, message.delegatedCompletion.parentRunId],
        messageIds: [message.id],
        subagentRunIds: [message.delegatedCompletion.parentRunId],
      },
    );
    const deliveryRun = projection.runs.find((candidate) => candidate.id === runId);
    const deliveryMessage =
      deliveryRun === undefined
        ? undefined
        : projection.messages.find((candidate) => candidate.id === deliveryRun.userMessageId);
    const messageOwnership = deliveryMessage?.delegatedCompletion;
    if (deliveryRun === undefined || messageOwnership === undefined) {
      return;
    }
    const parentRun = projection.runs.find(
      (candidate) => candidate.id === messageOwnership.parentRunId,
    );
    const cohort = parentRun?.delegatedCompletion;
    const delivery = cohort?.delivery;
    if (
      parentRun === undefined ||
      cohort === undefined ||
      delivery === null ||
      delivery === undefined ||
      delivery.messageId !== deliveryRun.userMessageId ||
      delivery.generation !== messageOwnership.generation
    ) {
      return;
    }

    const now = yield* DateTime.now;
    const nextTaskStates = new Map<
      OrchestrationV2Subagent["id"],
      OrchestrationV2Subagent["completionDelivery"]
    >();
    for (const task of projection.subagents) {
      if (
        task.origin !== "app_owned" ||
        task.runId !== parentRun.id ||
        !delivery.taskIds.includes(task.id) ||
        task.completionDelivery?.state !== "claimed"
      ) {
        continue;
      }
      nextTaskStates.set(task.id, {
        state: deliveryRun.status === "cancelled" ? "pending" : "delivered",
        observedByRunId: null,
      });
    }
    const pendingTaskIds = projection.subagents
      .filter(
        (task) =>
          task.origin === "app_owned" &&
          task.runId === parentRun.id &&
          isTerminalDelegatedTaskStatus(task.status) &&
          (task.completionDelivery?.state === "pending" ||
            nextTaskStates.get(task.id)?.state === "pending"),
      )
      .map((task) => task.id);
    const canReserveFollowUp =
      cohort.disposition === "open" &&
      projection.thread.archivedAt === null &&
      projection.thread.deletedAt === null &&
      pendingTaskIds.length > 0;
    const nextDelivery = canReserveFollowUp
      ? {
          generation: cohort.nextGeneration,
          messageId: yield* mapDelegatedCompletionError(
            idAllocator.allocate.message({
              threadId,
              ordinal:
                (yield* mapDelegatedCompletionError(
                  projectionStore.getMessageCount(projection.thread.id),
                )) + 1,
            }),
          ),
          taskIds: pendingTaskIds,
        }
      : null;
    if (nextDelivery !== null) {
      for (const taskId of pendingTaskIds) {
        nextTaskStates.set(taskId, {
          state: "claimed",
          observedByRunId: null,
        });
      }
    }
    const updatedParentRun: OrchestrationV2Run = {
      ...parentRun,
      delegatedCompletion: {
        ...cohort,
        nextGeneration: nextDelivery === null ? cohort.nextGeneration : cohort.nextGeneration + 1,
        delivery: nextDelivery,
      },
    };
    const taskEvents = projection.subagents.flatMap((task) => {
      const completionDelivery = nextTaskStates.get(task.id);
      if (completionDelivery === undefined) {
        return [];
      }
      return [
        {
          type: "subagent.updated" as const,
          threadId,
          ...(task.runId === null ? {} : { runId: task.runId }),
          nodeId: task.id,
          driver: task.driver,
          providerInstanceId: task.providerInstanceId,
          occurredAt: now,
          payload: {
            ...task,
            completionDelivery,
            updatedAt: now,
          },
        },
      ];
    });
    yield* writeSystemEvents([
      ...taskEvents,
      {
        type: "run.updated",
        threadId,
        runId: updatedParentRun.id,
        ...(updatedParentRun.rootNodeId === null ? {} : { nodeId: updatedParentRun.rootNodeId }),
        providerInstanceId: updatedParentRun.providerInstanceId,
        occurredAt: now,
        payload: updatedParentRun,
      },
    ]);
    if (nextDelivery !== null) {
      yield* offerDelegatedCompletionDelivery(threadId, parentRun.id);
    }
  });
