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
export const bindDispatchDelegatedTaskCompletionDeliveryResolution = (ctx: any) =>
  Effect.fn("Orchestrator.dispatchDelegatedTaskCompletionDeliveryResolution")(function* (
    command: Extract<
      OrchestrationV2Command,
      {
        readonly type:
          | "delegated_task.completion-delivery.acknowledge"
          | "delegated_task.completion-delivery.dispose";
      }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const {
      OrchestratorDispatchError,
      completionDeliveryMessage,
      completionDeliveryRun,
      delegatedCompletionPlanEvents,
      delegatedCompletionWakeDetail,
      emit,
      emitQueuedRunCancellation,
      isLiveRun,
      isTerminalDelegatedTaskStatus,
      isUnobservedAcknowledgement,
      mapDispatchError,
      planDelegatedCompletionDelivery,
      loadProjectionForCommand,
    } = ctx;

    const projection = yield* loadProjectionForCommand(command, ["subagents"], {
      subagentIds: [command.taskId],
    });
    const task = projection.subagents.find(
      (candidate) => candidate.id === command.taskId && candidate.origin === "app_owned",
    );
    if (task === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Delegated task ${command.taskId} is not an app-owned task of thread ${command.parentThreadId}.`,
      });
    }
    const state =
      command.type === "delegated_task.completion-delivery.acknowledge"
        ? "acknowledged"
        : "disposed";
    const now = yield* DateTime.now;
    const emitEvent = emit(events, command);
    const {
      runs: [parentRun],
    } = yield* loadProjectionForCommand(command, ["runs"], {
      runIds: task.runId === null ? [] : [task.runId],
    });
    // A late wait can arrive after finalization held the result for its still-live spawning run.
    if (isUnobservedAcknowledgement(command)) {
      if (
        !isTerminalDelegatedTaskStatus(task.status) ||
        task.completionDelivery?.state !== "pending"
      )
        return;
      if (parentRun !== undefined && isLiveRun(parentRun)) return;
      const records = yield* loadProjectionForCommand(
        command,
        ["runs", "subagents", "messages", "providerTurns"],
        { messageRoles: ["user"] },
      );
      const plan = yield* planDelegatedCompletionDelivery({
        parentProjection: records,
        parentRun,
        task,
        updatedTask: task,
        now,
      }).pipe(mapDispatchError(command));
      if (plan.task.completionDelivery?.state === "pending") return;
      yield* emitEvent({
        type: "subagent.updated",
        threadId: command.parentThreadId,
        ...(task.runId === null ? {} : { runId: task.runId }),
        nodeId: task.id,
        driver: task.driver,
        providerInstanceId: task.providerInstanceId,
        occurredAt: now,
        payload: plan.task,
      });
      for (const event of delegatedCompletionPlanEvents(
        command.parentThreadId,
        plan,
        projection.thread.providerInstanceId,
        now,
      )) {
        yield* emitEvent(event);
      }
      return plan.parentRun?.id;
    }
    // task_status and t3_thread_read use distinct command IDs, so two
    // valid observations can race after their read preflight. Re-emit the
    // existing task row so the second dispatch is a successful idempotent
    // no-op rather than "already acknowledged/disposed" or empty-events.
    if (
      task.completionDelivery?.state === state ||
      (command.type === "delegated_task.completion-delivery.acknowledge" &&
        task.completionDelivery?.state === "disposed")
    ) {
      yield* emitEvent({
        type: "subagent.updated",
        threadId: command.parentThreadId,
        ...(task.runId === null ? {} : { runId: task.runId }),
        nodeId: task.id,
        driver: task.driver,
        providerInstanceId: task.providerInstanceId,
        occurredAt: now,
        payload: task,
      });
      return;
    }
    const updatedTask: OrchestrationV2Subagent = {
      ...task,
      completionDelivery: {
        state,
        observedByRunId:
          command.type === "delegated_task.completion-delivery.acknowledge"
            ? command.observedByRunId
            : null,
      },
      updatedAt: now,
    };
    yield* emitEvent({
      type: "subagent.updated",
      threadId: command.parentThreadId,
      ...(task.runId === null ? {} : { runId: task.runId }),
      nodeId: task.id,
      driver: task.driver,
      providerInstanceId: task.providerInstanceId,
      occurredAt: now,
      payload: updatedTask,
    });

    const cohort = parentRun?.delegatedCompletion;
    const delivery = cohort?.delivery;
    if (
      parentRun === undefined ||
      cohort === undefined ||
      delivery === null ||
      delivery === undefined
    ) {
      return;
    }
    if (!delivery.taskIds.includes(task.id)) {
      return;
    }

    const { messages } = yield* loadProjectionForCommand(command, ["messages"], {
      messageRoles: ["user"],
      messageIds: [delivery.messageId],
    });
    const deliveryRunId = completionDeliveryMessage({ messages }, delivery)?.runId ?? null;
    const { runs } = yield* loadProjectionForCommand(command, ["runs"], {
      runIds: deliveryRunId === null ? [] : [deliveryRunId],
    });
    const deliveryProjection = { messages, runs };
    const remainingTaskIds = delivery.taskIds.filter((taskId) => taskId !== task.id);
    const deliveryRun = completionDeliveryRun(deliveryProjection, delivery);
    const clearDelivery =
      remainingTaskIds.length === 0 &&
      (deliveryRun === undefined || deliveryRun.status === "queued");
    const updatedCohort: OrchestrationV2DelegatedCompletionCohort = {
      ...cohort,
      delivery: clearDelivery
        ? null
        : {
            ...delivery,
            taskIds: remainingTaskIds,
          },
    };
    yield* emitEvent({
      type: "run.updated",
      threadId: command.parentThreadId,
      runId: parentRun.id,
      ...(parentRun.rootNodeId === null ? {} : { nodeId: parentRun.rootNodeId }),
      providerInstanceId: parentRun.providerInstanceId,
      occurredAt: now,
      payload: {
        ...parentRun,
        delegatedCompletion: updatedCohort,
      },
    });

    if (deliveryRun?.status === "queued") {
      if (remainingTaskIds.length === 0) {
        const rootNodeFilter = {
          nodeIds: deliveryRun.rootNodeId === null ? [] : [deliveryRun.rootNodeId],
        };
        yield* emitQueuedRunCancellation({
          command,
          events,
          // Attempts have no id filter; a wake that never started has no attempt to cancel.
          projection:
            deliveryRun.activeAttemptId === null
              ? {
                  attempts: [],
                  ...(yield* loadProjectionForCommand(command, ["nodes"], rootNodeFilter)),
                }
              : yield* loadProjectionForCommand(command, ["nodes", "attempts"], rootNodeFilter),
          run: deliveryRun,
          now,
        });
        return parentRun.id;
      }
      const message = completionDeliveryMessage(deliveryProjection, delivery);
      if (message !== undefined) {
        const { subagents: remainingTasks } = yield* loadProjectionForCommand(
          command,
          ["subagents"],
          { subagentIds: remainingTaskIds },
        );
        yield* emitEvent({
          type: "message.updated",
          threadId: command.parentThreadId,
          runId: deliveryRun.id,
          ...(deliveryRun.rootNodeId === null ? {} : { nodeId: deliveryRun.rootNodeId }),
          providerInstanceId: deliveryRun.providerInstanceId,
          occurredAt: now,
          payload: {
            ...message,
            text: delegatedCompletionWakeDetail(remainingTaskIds, remainingTasks),
            delegatedCompletion: {
              parentRunId: parentRun.id,
              generation: delivery.generation,
              taskIds: remainingTaskIds,
            },
            updatedAt: now,
          },
        });
      }
    }
    return parentRun.id;
  });
