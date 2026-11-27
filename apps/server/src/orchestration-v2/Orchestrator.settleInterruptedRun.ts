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
export const bindSettleInterruptedRun = (ctx: any) =>
  Effect.fn("Orchestrator.settleInterruptedRun")(function* (input: {
    readonly command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "run.interrupt" | "thread.background-work.settle" }
    >;
    readonly projection: Pick<
      OrchestrationV2ThreadProjection,
      | "runs"
      | "attempts"
      | "nodes"
      | "subagents"
      | "runtimeRequests"
      | "messages"
      | "turnItems"
      | "providerThreads"
    >;
    readonly providerTurn: OrchestrationV2ProviderTurn;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>;
    readonly now: DateTime.Utc;
  }) {
    const { emit, idAllocator, mapDispatchError, projectionStore, runInterruptReason } = ctx;

    const attempt = input.projection.attempts.find(
      (candidate) => candidate.id === input.providerTurn.runAttemptId,
    );
    const run = input.projection.runs.find((candidate) => candidate.id === attempt?.runId);
    const rootNode = input.projection.nodes.find((candidate) => candidate.id === run?.rootNodeId);
    if (
      attempt === undefined ||
      run === undefined ||
      rootNode === undefined ||
      run.activeAttemptId !== attempt.id ||
      run.status !== "running" ||
      attempt.status === "pending"
    )
      return;
    const emitEvent = emit(input.events, input.command);
    const base = {
      threadId: input.command.threadId,
      runId: run.id,
      nodeId: rootNode.id,
      providerInstanceId: run.providerInstanceId,
      occurredAt: input.now,
    };
    if (input.providerTurn.status === "running") {
      yield* emitEvent({
        ...base,
        type: "provider-turn.updated",
        payload: {
          ...input.providerTurn,
          status: "interrupted",
          completedAt: input.now,
        },
      });
    }
    // An attempt that already ended keeps its status; only its run was left running.
    if (attempt.status === "running") {
      yield* emitEvent({
        ...base,
        type: "run-attempt.updated",
        payload: {
          ...attempt,
          status: "interrupted",
          completedAt: input.now,
        },
      });
    }
    const providerThread = input.projection.providerThreads.find(
      (candidate) => candidate.id === input.providerTurn.providerThreadId,
    );
    if (providerThread?.status === "active" && providerThread.lastRunOrdinal === run.ordinal) {
      yield* emitEvent({
        ...base,
        type: "provider-thread.updated",
        payload: { ...providerThread, status: "idle", updatedAt: input.now },
      });
    }
    for (const message of input.projection.messages) {
      if (message.runId !== run.id || !message.streaming) continue;
      yield* emitEvent({
        ...base,
        ...(message.nodeId === null ? {} : { nodeId: message.nodeId }),
        type: "message.updated",
        payload: { ...message, streaming: false, updatedAt: input.now },
      });
    }
    const delegatedNodeIds = new Set(
      input.projection.subagents
        .filter((subagent) => subagent.origin === "app_owned")
        .map((subagent) => subagent.id),
    );
    // Callers load only tool and message items; the request cards close with the requests below.
    const requestCards = yield* projectionStore
      .getThreadRecords(run.threadId, ["turnItems"], {
        turnItemTypes: ["approval_request", "user_input_request"],
        turnItemRunIds: [run.id],
        turnItemStatuses: ["waiting"],
      })
      .pipe(mapDispatchError(input.command));
    const cascaded = yield* RunExecutionService.cascadeTerminalizeRunOwnedSubagents({
      run,
      status: "interrupted",
      completedAt: input.now,
      allocateEventId: () =>
        idAllocator.allocate.event({
          threadId: input.command.threadId,
          commandId: input.command.commandId,
        }),
      open: {
        subagents: new Map(
          input.projection.subagents
            .filter((task) => task.runId === run.id && task.origin !== "app_owned")
            .map((task) => [task.id, task]),
        ),
        nodes: new Map(
          input.projection.nodes
            .filter((node) => node.runId === run.id && !delegatedNodeIds.has(node.id))
            .map((node) => [node.id, node]),
        ),
        turnItems: new Map(),
        childTurnItems: new Map(
          [
            ...input.projection.turnItems.filter(
              (item) =>
                item.runId === run.id &&
                (item.type === "assistant_message" || item.type === "reasoning"),
            ),
            ...requestCards.turnItems,
          ].map((item) => [item.id, item]),
        ),
        linkedChildThreadIds: new Set([run.threadId]),
      },
    }).pipe(mapDispatchError(input.command));
    yield* Ref.update(input.events, (events) => [...events, ...cascaded]);
    for (const request of input.projection.runtimeRequests) {
      if (
        request.status !== "pending" ||
        !input.projection.nodes.some((node) => node.id === request.nodeId && node.runId === run.id)
      )
        continue;
      yield* emitEvent({
        ...base,
        nodeId: request.nodeId,
        type: "runtime-request.updated",
        payload: {
          ...request,
          status: "cancelled",
          resolvedAt: input.now,
          responseCapability: { type: "not_resumable", reason: "The run was interrupted." },
        },
      });
    }
    if (providerThread !== undefined) {
      yield* emitEvent({
        ...base,
        type: "turn-item.updated",
        payload: makeInterruptResultTurnItem({
          idAllocator,
          run,
          rootNode,
          providerThread,
          reason:
            (input.command.type === "thread.background-work.settle"
              ? input.command.reason
              : undefined) ?? (yield* runInterruptReason(input.command, input.events, run.id)),
          completedAt: input.now,
        }),
      });
    }
    const { delegatedCompletion: _delegatedCompletion, ...runWithoutDelegatedCompletion } = run;
    yield* emitEvent({
      ...base,
      type: "run.updated",
      payload: {
        ...runWithoutDelegatedCompletion,
        status: "interrupted",
        completedAt: input.now,
      },
    });
    const scopeId = rootNode.checkpointScopeId;
    if (scopeId !== null) {
      yield* Ref.update(input.effects, (effects) => [
        ...effects,
        {
          id: `effect:checkpoint.capture:${run.id}`,
          commandId: CommandId.make(`command:effect:checkpoint.capture:${run.id}`),
          threadId: input.command.threadId,
          request: {
            type: "checkpoint.capture",
            runId: run.id,
            scopeId,
          },
        } satisfies PendingOrchestrationEffectV2,
      ]);
    }
  });
