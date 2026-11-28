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
import type { DelegatedChildControls } from "./Orchestrator.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindFinalizeAppOwnedSubagentTask = (ctx: any) =>
  Effect.fn("Orchestrator.finalizeAppOwnedSubagentTask")(function* (
    childControls: DelegatedChildControls,
    options: {
      readonly settledContinuationOf?: RunId;
      readonly syncRunId?: RunId;
      readonly task: OrchestrationV2Subagent;
      readonly resultRun?: OrchestrationV2Run;
    },
  ) {
    const {
      childAwaitsRestartContinuation,
      contextSourcePointForRun,
      delegatedCompletionPlanEvents,
      delegatedTaskTerminalStatus,
      idAllocator,
      offerDelegatedCompletionDelivery,
      planDelegatedCompletionDelivery,
      projectionStore,
      readAllDelegatedChildControls,
      readDelegatedCompletionPlanRecords,
      releaseFinishedDelegateSessions,
      reportRunsRead,
      writeSystemEvents,
    } = pickScriptcBindCtx(ctx);

    const childThreadId = childControls.thread.id;
    const forkedFrom = childControls.thread.forkedFrom;
    if (
      childControls.thread.lineage.relationshipToParent !== "subagent" ||
      childControls.thread.lineage.parentThreadId === null ||
      forkedFrom?.type !== "node"
    ) {
      return;
    }
    const taskRuns = delegatedTaskRuns(childControls, options.task.id);
    const childRun =
      taskRuns.length === 0
        ? options.task.id === forkedFrom.nodeId
          ? options.resultRun
          : undefined
        : delegatedTaskResultRun(taskRuns);
    if (childRun === undefined) return;
    let outcome = runOutcome(childRun);
    let terminalStatus = delegatedTaskTerminalStatus(outcome);
    if (terminalStatus === null) {
      if (childRun.delegatedTaskId === undefined || childRun.id !== options.syncRunId) return;
      const task = options.task;
      const status: OrchestrationV2Subagent["status"] =
        childRun.status === "queued"
          ? childRun.queueHeld === true
            ? "idle"
            : "pending"
          : childRun.status === "waiting"
            ? "waiting"
            : "running";
      if (task.result !== null || task.status === status) return;
      const parent = yield* projectionStore.getThreadRecords(
        childControls.thread.lineage.parentThreadId,
        ["nodes", "turnItems"],
        { nodeIds: [task.id], turnItemNodeIds: [task.id], turnItemTypes: ["subagent"] },
      );
      const now = yield* DateTime.now;
      const scope = {
        threadId: parent.thread.id,
        ...(task.runId === null ? {} : { runId: task.runId }),
        nodeId: task.id,
        providerInstanceId: task.providerInstanceId,
        occurredAt: now,
      };
      const node = parent.nodes.find((row) => row.id === task.id);
      const item = parent.turnItems.find(
        (row) => row.type === "subagent" && row.subagentId === task.id,
      );
      yield* writeSystemEvents([
        {
          ...scope,
          type: "subagent.updated",
          payload: { ...task, status, completedAt: null, updatedAt: now },
        },
        ...(node === undefined
          ? []
          : [
              {
                ...scope,
                type: "node.updated" as const,
                payload: { ...node, status, completedAt: null },
              },
            ]),
        ...(item === undefined
          ? []
          : [
              {
                ...scope,
                type: "turn-item.updated" as const,
                payload: { ...item, status, completedAt: null, updatedAt: now },
              },
            ]),
      ]);
      return;
    }
    // A follow-up ends with the work it awaits, as the original task does. A cancelled task
    // does not wait for the background work its cancel is stopping.
    if (
      delegatedTaskAwaitsWork(
        taskRuns,
        options.task.cancelledRunId === undefined
          ? childControls
          : { subagents: childControls.subagents, providerThreads: [] },
      )
    )
      return;
    if (
      yield* childAwaitsRestartContinuation(
        taskRuns.length === 0 ? childControls.runs : taskRuns,
        childRun,
        options?.settledContinuationOf,
      )
    ) {
      return;
    }

    // A run queued behind the report can end the task without saying anything.
    const reportFrom = { ...childRun, status: outcome };
    let reportRuns = delegatedTaskReportRuns(childControls, reportFrom);
    if (!reportRunsRead(childControls, reportFrom, reportRuns)) {
      reportRuns = delegatedTaskReportRuns(
        yield* readAllDelegatedChildControls(childThreadId),
        reportFrom,
      );
    }
    const resultRunIds = [childRun.id, ...reportRuns.map((run) => run.id)];
    const childResult = yield* projectionStore.getThreadRecords(
      childThreadId,
      ["messages", "turnItems", "providerTurns", "attempts"],
      {
        messageRoles: ["assistant"],
        messageRunIds: resultRunIds,
        turnItemRunIds: resultRunIds,
        turnItemTypes: [...SUBAGENT_RESULT_TURN_ITEM_TYPES, "run_interrupt_request"],
        providerTurnAttemptIds: [childRun, ...reportRuns].flatMap(
          (run) => run.activeAttemptId ?? [],
        ),
        attemptIds: childRun.activeAttemptId === null ? [] : [childRun.activeAttemptId],
      },
    );
    // A steered run's attempt can point at a provider turn that another attempt started.
    const attemptTurnId = childResult.attempts[0]?.providerTurnId;
    const steeredTurns =
      attemptTurnId == null ||
      childResult.providerTurns.some((turn) => turn.runAttemptId === childRun.activeAttemptId)
        ? []
        : (yield* projectionStore.getThreadRecords(childThreadId, ["providerTurns"], {
            providerTurnIds: [attemptTurnId],
          })).providerTurns;
    const childProjection = {
      ...childControls,
      runs: reportRuns,
      messages: childResult.messages,
      turnItems: childResult.turnItems,
      providerTurns: [...childResult.providerTurns, ...steeredTurns],
      attempts: childResult.attempts,
    };
    const parentThreadId = childControls.thread.lineage.parentThreadId;
    // The task's node and turn item share its id.
    const parentTask = yield* projectionStore.getThreadRecords(
      parentThreadId,
      ["subagents", "nodes", "turnItems"],
      {
        subagentIds: [options.task.id],
        nodeIds: [options.task.id],
        turnItemNodeIds: [options.task.id],
        turnItemTypes: ["subagent"],
      },
    );
    const task = parentTask.subagents.find(
      (candidate) =>
        candidate.id === options.task.id &&
        candidate.origin === "app_owned" &&
        candidate.childThreadId === childThreadId,
    );
    if (task === undefined) {
      return;
    }
    // A cancelled task's completed run ends it interrupted, as does one whose provider turn its
    // parent's Stop interrupted to kill background work. Stop's marker on an idle run names no
    // provider turn and interrupted nothing.
    const cancelled = task.cancelledRunId === childRun.id;
    const stopped =
      task.completionDelivery?.state === "disposed" &&
      childResult.turnItems.some(
        (item) =>
          item.runId === childRun.id &&
          item.type === "run_interrupt_request" &&
          item.providerTurnId !== null,
      );
    if ((cancelled || stopped) && terminalStatus === "completed")
      outcome = terminalStatus = "interrupted";
    // Every result the child sent is among its own transfers, far fewer than the parent's.
    const childTransfers = yield* projectionStore.getThreadRecords(childThreadId, [
      "contextTransfers",
    ]);
    const existingResultTransfer = childTransfers.contextTransfers.find(
      (transfer) =>
        transfer.type === "subagent_result" &&
        transfer.sourceThreadId === childThreadId &&
        transfer.targetThreadId === parentThreadId &&
        (transfer.sourcePoint.runId === childRun.id ||
          (options.task.id === forkedFrom.nodeId && transfer.sourcePoint.runId === undefined)),
    );
    if (existingResultTransfer !== undefined) {
      return;
    }

    const now = yield* DateTime.now;
    const result = subagentResultForRun(childProjection, { ...childRun, status: outcome });
    const { parentRun, ...parentProjection } = yield* readDelegatedCompletionPlanRecords(
      parentThreadId,
      task,
    );
    const parentNode = parentTask.nodes.find((candidate) => candidate.id === task.id);
    const parentTurnItem = parentTask.turnItems.find(
      (candidate) => candidate.type === "subagent" && candidate.subagentId === task.id,
    );
    const updatedTask: OrchestrationV2Subagent = {
      ...task,
      providerThreadId: childRun.providerThreadId,
      status: terminalStatus,
      result: result.text,
      completedAt: now,
      updatedAt: now,
      // The cancelling parent gets no wake, and the task records the run it settled from.
      ...(cancelled
        ? {
            cancelledRunId: childRun.id,
            completionDelivery: { state: "disposed" as const, observedByRunId: null },
          }
        : {}),
    };
    const completionPlan = yield* planDelegatedCompletionDelivery({
      parentProjection,
      parentRun,
      task,
      updatedTask,
      now,
    });
    const resultTransferId = yield* idAllocator.allocate.contextTransfer({
      sourceThreadId: childThreadId,
      targetThreadId: parentThreadId,
      type: "subagent_result",
    });
    const resultTransfer: OrchestrationV2ContextTransfer = {
      id: resultTransferId,
      type: "subagent_result",
      sourceThreadId: childThreadId,
      targetThreadId: parentThreadId,
      sourcePoint: {
        ...contextSourcePointForRun(childProjection, childRun),
        ...(result.turnItemId === null ? {} : { turnItemId: result.turnItemId }),
      },
      basePoint: null,
      sourceProviderInstanceId: childRun.providerInstanceId,
      targetProviderInstanceId:
        parentRun?.providerInstanceId ?? parentProjection.thread.providerInstanceId,
      targetRunId: parentRun?.id ?? null,
      status: "consumed",
      resolution: null,
      createdBy: "system",
      error: null,
      createdAt: now,
      updatedAt: now,
      consumedAt: now,
    };

    const completionEvents: ReadonlyArray<Omit<OrchestrationV2DomainEvent, "id">> = [
      {
        type: "subagent.updated",
        threadId: parentThreadId,
        ...(task.runId === null ? {} : { runId: task.runId }),
        nodeId: task.id,
        driver: task.driver,
        occurredAt: now,
        payload: completionPlan.task,
      },
      ...delegatedCompletionPlanEvents(
        parentThreadId,
        completionPlan,
        parentProjection.thread.providerInstanceId,
        now,
      ),
      ...(parentNode === undefined
        ? []
        : [
            {
              type: "node.updated" as const,
              threadId: parentThreadId,
              ...(parentNode.runId === null ? {} : { runId: parentNode.runId }),
              nodeId: parentNode.id,
              driver: task.driver,
              occurredAt: now,
              payload: {
                ...parentNode,
                status: terminalStatus,
                providerThreadId: childRun.providerThreadId,
                completedAt: now,
              },
            },
          ]),
      ...(parentTurnItem === undefined
        ? []
        : [
            {
              type: "turn-item.updated" as const,
              threadId: parentThreadId,
              ...(parentTurnItem.runId === null ? {} : { runId: parentTurnItem.runId }),
              ...(parentTurnItem.nodeId === null ? {} : { nodeId: parentTurnItem.nodeId }),
              driver: task.driver,
              occurredAt: now,
              payload: {
                ...parentTurnItem,
                status: terminalStatus,
                result: result.text,
                completedAt: now,
                updatedAt: now,
              },
            },
          ]),
      {
        type: "context-transfer.created",
        threadId: parentThreadId,
        ...(parentRun === undefined ? {} : { runId: parentRun.id }),
        providerInstanceId: childRun.providerInstanceId,
        occurredAt: now,
        payload: resultTransfer,
      },
    ];
    yield* writeSystemEvents(completionEvents, [], { updateDelegatedCompletionOnly: true });
    yield* releaseFinishedDelegateSessions(childThreadId, childRun.id, task.id);

    if (completionPlan.offer && completionPlan.parentRun !== undefined) {
      yield* offerDelegatedCompletionDelivery(parentThreadId, completionPlan.parentRun.id);
    }
  });
