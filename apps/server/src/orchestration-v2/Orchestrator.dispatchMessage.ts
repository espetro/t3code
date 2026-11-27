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
export const bindDispatchMessage = (ctx: any) =>
  Effect.fn("Orchestrator.dispatchMessage")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const {
      FRESH_CONTEXT_DETACH_REASON,
      OrchestratorDispatchError,
      OrchestratorProjectionError,
      OrchestratorProviderAdapterError,
      WORKSPACE_PREPARATION_INPUT,
      appendContextHandoffId,
      checkpointService,
      commandPolicy,
      contextHandoffService,
      contextSourcePointForRun,
      delegatedCompletionWakeDetail,
      dispatchProviderThread,
      dispatchSteerIntoRun,
      emit,
      ensureGoalCommandSupported,
      ensureSteeringMessage,
      followsCurrentConversation,
      forkTransferSupersededEvent,
      getProjectionWithPendingEvents,
      goalDriverFor,
      hasTitleSetBeforeFirstMessage,
      idAllocator,
      isHandoffSourceRun,
      isLiveRun,
      isStaleQuestionWake,
      lastDeliveredRunForProviderThread,
      latestContextTransfer,
      limitForbidsParkedSteer,
      mapDispatchError,
      nextRunOrdinal,
      nextTurnItemOrdinal,
      notificationTasks,
      pendingForkTransferForThread,
      pendingMergeBackTransfersForThread,
      pendingThreadTitleGenerationEffect,
      projectionStore,
      providerAdapters,
      providerSessionIdFor,
      providerSessions,
      providerSwitchService,
      providerThreadForRun,
      queueTailModelSelection,
      readHandoffItems,
      readInheritedItems,
      rootProviderThreadsForProvider,
      runtimePolicy,
      sessionHasBackgroundWork,
      sessionsReleasedByFreshContext,
      shouldPrepareLegacyImportHandoff,
      stopReachedRun,
      stopRunForQueuedCommand,
      uniqueSessions,
      wakeWorkStartedAt,
      worktreeSetupPending,
    } = pickScriptcBindCtx(ctx);

    // A compacted thread reads every run, but attempts, nodes, messages, provider turns and prompts
    // only for its recent runs and the runs this command names. An idle compaction reads in full:
    // its busy check below looks for a delegated result's message under any old run.
    let projection = yield* getProjectionWithPendingEvents(
      command.threadId,
      events,
      command.idleCompaction === undefined
        ? {
            keepRunIds: [
              command.manualContinuationOfRunId,
              command.restartContinuationOfRunId,
              command.usageLimitContinuationOfRunId,
              command.steerFollowUpOfRunId,
              ...(command.dispatchMode.type === "steer_active" ||
              command.dispatchMode.type === "restart_active"
                ? [command.dispatchMode.targetRunId]
                : []),
            ].flatMap((runId) => (runId === undefined ? [] : [runId])),
            keepMessageId: command.messageId,
          }
        : undefined,
    );
    if (command.steerFollowUpOfRunId !== undefined) {
      const source = projection.runs.find((run) => run.id === command.steerFollowUpOfRunId);
      if (
        source === undefined ||
        command.dispatchMode.type !== "queue_after_active" ||
        !projection.messages.some(
          (message) => message.id === command.messageId && message.runId === source.id,
        ) ||
        projection.thread.archivedAt !== null ||
        projection.thread.deletedAt !== null ||
        (yield* stopReachedRun(command, command.threadId, source.id))
      ) {
        yield* emit(
          events,
          command,
        )({
          type: "thread.metadata-updated",
          threadId: command.threadId,
          occurredAt: yield* DateTime.now,
          payload: projection.thread,
        });
        return;
      }
    }
    if (yield* isStaleQuestionWake(projection, command.messageId, command.notification)) {
      yield* emit(
        events,
        command,
      )({
        type: "thread.metadata-updated",
        threadId: command.threadId,
        occurredAt: yield* DateTime.now,
        payload: projection.thread,
      });
      return;
    }
    const activeProviderInstanceId = projection.providerThreads.find(
      (candidate) => candidate.id === projection.thread.activeProviderThreadId,
    )?.providerInstanceId;
    // Another provider is handed what ran since it last saw the thread, which can be older than
    // the compaction, so a provider switch reads the whole history.
    if (
      activeProviderInstanceId !== undefined &&
      activeProviderInstanceId !==
        (command.modelSelection ?? projection.thread.modelSelection).instanceId
    ) {
      projection = yield* getProjectionWithPendingEvents(command.threadId, events);
    }
    if (command.manualContinuationOfRunId !== undefined) {
      const source = projection.runs.find((run) => run.id === command.manualContinuationOfRunId);
      const limited = latestRootProviderFailure(source ?? null, projection.turnItems);
      if (
        command.dispatchMode.type !== "start_immediately" ||
        source === undefined ||
        (source.status !== "interrupted" &&
          !(source.status === "failed" && limited?.class === "usage_limit")) ||
        latestExecutedRun(projection.runs)?.id !== source.id ||
        projection.thread.archivedAt !== null ||
        projection.thread.deletedAt !== null ||
        projection.runtimeRequests.some((request) => request.status === "pending")
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "This thread can no longer be resumed from that run.",
        });
      }
    }
    if (command.usageLimitContinuationOfRunId !== undefined) {
      const run = usageLimitBlockedRun(projection.runs, projection.turnItems, null);
      const failure = latestRootProviderFailure(run, projection.turnItems);
      const recovery = projection.thread.limitRecovery;
      const now = yield* DateTime.now;
      if (
        run?.id !== command.usageLimitContinuationOfRunId ||
        failure?.class !== "usage_limit" ||
        threadShellFromProjection(projection).lastErrorClass !== "usage_limit" ||
        !recovery?.autoResume ||
        recovery.requestId !== command.usageLimitRecoveryRequestId ||
        recovery.runId !== run.id ||
        recovery.resetAt !== failure.resetAt ||
        Date.parse(recovery.resetAt) > DateTime.toEpochMillis(now) ||
        projection.thread.archivedAt !== null ||
        projection.thread.deletedAt !== null ||
        projection.thread.settledOverride === "settled" ||
        projection.thread.providerInstanceId !== run.providerInstanceId ||
        projection.runtimeRequests.some((request) => request.status === "pending") ||
        (projection.thread.snoozedUntil != null &&
          DateTime.toEpochMillis(projection.thread.snoozedUntil) > DateTime.toEpochMillis(now))
      ) {
        yield* emit(
          events,
          command,
        )({
          type: "thread.metadata-updated",
          threadId: command.threadId,
          occurredAt: now,
          payload: {
            ...projection.thread,
            ...(recovery?.autoResume &&
            recovery.requestId === command.usageLimitRecoveryRequestId &&
            recovery.runId === command.usageLimitContinuationOfRunId &&
            projection.thread.snoozedUntil != null &&
            DateTime.toEpochMillis(projection.thread.snoozedUntil) > DateTime.toEpochMillis(now)
              ? { limitRecovery: { ...recovery, requestId: command.commandId } }
              : {}),
          },
        });
        return;
      }
    }

    if (command.restartContinuationOfRunId !== undefined) {
      const source = projection.runs.find((run) => run.id === command.restartContinuationOfRunId);
      if (
        !source ||
        !(
          isRestartContinuationSource(source, projection.providerTurns) ||
          continuationFailedBeforePrompt(source, projection.providerTurns)
        ) ||
        projection.thread.archivedAt !== null ||
        projection.thread.deletedAt !== null ||
        projection.thread.providerInstanceId !== source.providerInstanceId ||
        projection.runs.some(
          (run) =>
            run.id !== source.id &&
            run.status !== "queued" &&
            !cancelledBeforeStart(run) &&
            runRanAfter(run, source),
        ) ||
        (yield* stopReachedRun(command, command.threadId, source.id))
      ) {
        // Preserve the current row so stale automatic deliveries receive an
        // accepted receipt without changing work or repeatedly retrying.
        yield* emit(
          events,
          command,
        )({
          type: "thread.metadata-updated",
          threadId: command.threadId,
          occurredAt: yield* DateTime.now,
          payload: projection.thread,
        });
        return;
      }
    }

    // The service checked idleness before this command; a run or a delegated result that landed
    // since makes the thread busy, and that turn refreshes the cache anyway.
    if (
      command.idleCompaction === "beforeCacheExpires" &&
      projection.runs.some(
        (run) =>
          run.status === "queued" ||
          isActiveRun(run) ||
          (run.delegatedCompletion?.disposition === "open" &&
            run.delegatedCompletion.delivery !== null &&
            !projection.messages.some(
              (message) => message.id === run.delegatedCompletion?.delivery?.messageId,
            )),
      )
    ) {
      yield* emit(
        events,
        command,
      )({
        type: "thread.metadata-updated",
        threadId: command.threadId,
        occurredAt: yield* DateTime.now,
        payload: projection.thread,
      });
      return;
    }

    if (projection.thread.lastVisitedAt === null && !isNativeMaintenanceCommand(command)) {
      const now = yield* DateTime.now;
      // Null keeps imported history read. The first fresh dispatch establishes
      // a read watermark so its completion can be unread on every client.
      // Offset it so a completion in the same millisecond is still unread.
      const event = yield* emit(
        events,
        command,
      )({
        type: "thread.metadata-updated",
        threadId: command.threadId,
        providerInstanceId: projection.thread.providerInstanceId,
        occurredAt: now,
        payload: {
          ...projection.thread,
          lastVisitedAt: DateTime.subtract(now, { milliseconds: 1 }),
        },
      });
      projection = applyToProjection(projection, event);
    }

    // A run the thread queues for itself continues the task of the run that sent it.
    const continuedTaskId = projection.runs.find((run) =>
      command.restartContinuationOfRunId === undefined
        ? command.senderThreadId === command.threadId && isActiveRun(run)
        : run.id === command.restartContinuationOfRunId,
    )?.delegatedTaskId;

    if (projection.thread.settledOverride !== null) {
      const now = yield* DateTime.now;
      const thread: OrchestrationV2AppThread = {
        ...projection.thread,
        settledOverride: null,
        settledAt: null,
        unsettledAt:
          projection.thread.settledOverride === "active"
            ? (projection.thread.unsettledAt ?? null)
            : now,
        updatedAt: now,
      };
      const event = yield* emit(
        events,
        command,
      )({
        type: "thread.unsettled",
        threadId: command.threadId,
        providerInstanceId: thread.providerInstanceId,
        occurredAt: now,
        payload: thread,
      });
      projection = applyToProjection(projection, event);
    }
    // Background wakes, delegated completions and scheduled-task runs continue work the user
    // already snoozed, so only a message someone actually sent ends the snooze.
    const automaticWake =
      command.notification !== undefined ||
      command.delegatedCompletion !== undefined ||
      command.scheduledTaskId !== undefined;
    if (projection.thread.snoozedUntil != null && !automaticWake) {
      const now = yield* DateTime.now;
      const thread: OrchestrationV2AppThread = {
        ...projection.thread,
        snoozedUntil: null,
        snoozedAt: null,
        updatedAt: now,
      };
      const event = yield* emit(
        events,
        command,
      )({
        type: "thread.unsnoozed",
        threadId: command.threadId,
        providerInstanceId: thread.providerInstanceId,
        occurredAt: now,
        payload: thread,
      });
      projection = applyToProjection(projection, event);
    }
    const userMessages = projection.messages.filter((message) => message.role === "user");
    // The recent runs of a compacted thread can hold only a `/compact` while an older prompt
    // exists, so when every loaded prompt is one, every user message is checked.
    const onlyMaintenanceHistory = [
      ...userMessages,
      ...projection.turnItems.flatMap((item) => (item.type === "user_message" ? [item] : [])),
    ].every(isNativeMaintenanceCommand)
      ? projectionStore
          .getThreadRecords(command.threadId, ["messages"], { messageRoles: ["user"] })
          .pipe(
            // A thread this command creates has no stored messages yet.
            Effect.catchTags({
              ProjectionStoreThreadNotFoundError: () => Effect.succeed({ messages: [] }),
            }),
            Effect.map(({ messages }) => [...messages, ...userMessages]),
            Effect.map((all) => all.length > 0 && all.every(isNativeMaintenanceCommand)),
            mapDispatchError(command),
          )
      : Effect.succeed(false);
    // A thread named before its first message (for example by an MCP launch that tracks an issue)
    // keeps that name instead of a title generated from a terse prompt such as "work on this".
    const seedsUntitledThread =
      command.titleSeed !== undefined &&
      (yield* projectionStore.getMessageCount(command.threadId).pipe(mapDispatchError(command))) ===
        0 &&
      !hasTitleSetBeforeFirstMessage(projection.thread, command.titleSeed);
    if (
      !isNativeMaintenanceCommand(command) &&
      (seedsUntitledThread ||
        (command.createdBy === "user" &&
          // A draft opened by `/compact` is titled after it, so only a chosen title stays here.
          projection.thread.titleRenamed !== true &&
          (yield* onlyMaintenanceHistory)))
    ) {
      const now = yield* DateTime.now;
      const thread: OrchestrationV2AppThread = {
        ...projection.thread,
        title: command.titleSeed ?? projection.thread.title,
        titleRegeneration: { requestId: command.commandId, startedAt: now },
        updatedAt: now,
      };
      const event = yield* emit(
        events,
        command,
      )({
        type: "thread.metadata-updated",
        threadId: command.threadId,
        providerInstanceId: thread.providerInstanceId,
        occurredAt: now,
        payload: thread,
      });
      yield* Ref.update(effects, (existing) => [
        ...existing,
        pendingThreadTitleGenerationEffect(command.commandId, command.threadId, {
          type: "initial",
          messageId: command.messageId,
        }),
      ]);
      projection = applyToProjection(projection, event);
    }
    let modelSelection = command.modelSelection ?? projection.thread.modelSelection;
    // Native goal commands must not steer an existing turn.
    const parsedGoalCommand = parseGoalCommand(command);
    const goalCommand =
      parsedGoalCommand === null ||
      (yield* goalDriverFor(command, modelSelection.instanceId)) === undefined
        ? null
        : parsedGoalCommand;
    // A goal command keeps the run it was sent at; the goal handling below queues it.
    let dispatchMode =
      goalCommand === null
        ? resolveMessageDispatch(projection, command)
        : resolveMessageDispatchIntent(projection, command.dispatchMode, command.deliveryIntent);
    if (dispatchMode.type === "steer_active" || dispatchMode.type === "restart_active") {
      const targetRunId = dispatchMode.targetRunId;
      const target = projection.runs.find((run) => run.id === targetRunId);
      const turn = latestProviderTurnForAttempt(
        projection.providerTurns.filter((candidate) => candidate.nodeId === target?.rootNodeId),
        target?.activeAttemptId,
      );
      // The client may still show a running turn while its completion is being
      // projected. Preserve the submission as a new turn when steering is too late.
      if (
        target !== undefined &&
        (target.status === "completed" ||
          (dispatchMode.type === "restart_active" && !isActiveRun(target)) ||
          ((target.status === "running" || target.status === "waiting") &&
            turn !== undefined &&
            (turn.status === "completed" ||
              (dispatchMode.type === "restart_active" &&
                turn.status !== "pending" &&
                turn.status !== "running"))))
      ) {
        dispatchMode = { type: "start_immediately" };
      }
    }
    // Stop leaves the run reading as running until its provider stops. A plain
    // send in that window queues behind the stopped queue instead of steering
    // text the agent never receives, and like any user send it releases the
    // hold; an explicit steer still fails below.
    if (
      command.deliveryIntent === "auto" &&
      (dispatchMode.type === "steer_active" || dispatchMode.type === "restart_active") &&
      (yield* stopReachedRun(command, command.threadId, dispatchMode.targetRunId))
    ) {
      dispatchMode = { type: "queue_after_active" };
    }
    // An agent's automatic send must not overtake its own earlier message still queued
    // (e.g. behind /compact), or the agent receives them out of send order. A message it
    // explicitly queued as a later turn is no such barrier.
    if (
      command.deliveryIntent === "auto" &&
      command.createdBy === "agent" &&
      (dispatchMode.type === "steer_active" || dispatchMode.type === "restart_active")
    ) {
      const queuedRuns = projection.runs.filter(
        (run) => run.status === "queued" && run.queueHeld !== true && run.explicitQueue !== true,
      );
      if (queuedRuns.length > 0) {
        const queuedMessages = yield* projectionStore
          .getMessagesById(
            command.threadId,
            queuedRuns.map((run) => run.userMessageId),
          )
          .pipe(mapDispatchError(command));
        if (
          [...queuedMessages.values()].some(
            (message) =>
              message.createdBy === "agent" && message.senderThreadId === command.senderThreadId,
          )
        ) {
          dispatchMode = { type: "queue_after_active" };
        }
      }
    }
    // An explicit restart that Stop reached has only its start left, so it
    // queues behind the stopping run like any other start.
    if (
      dispatchMode.type === "restart_active" &&
      (yield* stopReachedRun(command, command.threadId, dispatchMode.targetRunId))
    ) {
      dispatchMode = { type: "start_immediately" };
    }
    const freshContext = command.freshContext === true;
    // A result is asked of one whole turn, so a send that declares one never joins a running turn.
    // A run that continues one cut short still owes that run's result.
    const continuedRunId =
      command.restartContinuationOfRunId ??
      command.usageLimitContinuationOfRunId ??
      command.manualContinuationOfRunId;
    const outputSchema =
      command.outputSchema ??
      (continuedRunId === undefined
        ? undefined
        : projection.runs.find((run) => run.id === continuedRunId)?.outputSchema);
    const schemaProblem =
      command.outputSchema === undefined
        ? null
        : outputRequestProblem(command.outputSchema, command);
    if (schemaProblem !== null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: schemaProblem,
      });
    }
    const output = outputSchema === undefined ? {} : { outputSchema };
    if (
      (freshContext || command.outputSchema !== undefined) &&
      (dispatchMode.type === "steer_active" || dispatchMode.type === "restart_active")
    ) {
      dispatchMode = { type: "queue_after_active" };
    }
    let queuedRunStop:
      | { readonly runId: RunId; readonly reason: string; readonly skipsHeldQueue?: true }
      | undefined;
    if (goalCommand !== null) {
      // A goal command never joins a running turn. One that starts or ends goal
      // work stops the run and goes first in the queue; the rest wait. A send
      // that asked to be queued (no delivery intent) only queues, and a run
      // that is only finishing or running background work is never stopped.
      const resolvedMode = dispatchMode;
      const target =
        resolvedMode.type === "steer_active" || resolvedMode.type === "restart_active"
          ? projection.runs.find((run) => run.id === resolvedMode.targetRunId)
          : resolvedMode.type === "queue_after_active" && command.deliveryIntent !== undefined
            ? projection.runs.findLast(isLiveRun)
            : undefined;
      if (target !== undefined) {
        const goal = projection.providerThreads.find(
          (candidate) => candidate.id === target.providerThreadId,
        )?.goal;
        const targetMessage = projection.messages.find(
          (message) => message.id === target.userMessageId,
        );
        if (
          isLiveRun(target) &&
          goalCommandStopsActiveRun(goalCommand, goal?.status ?? null) &&
          (targetMessage === undefined || !isNativeMaintenanceCommand(targetMessage)) &&
          !(yield* stopReachedRun(command, command.threadId, target.id))
        ) {
          queuedRunStop = { runId: target.id, reason: "Stopped to apply /goal" };
        }
        dispatchMode = { type: "queue_after_active" };
      }
    }
    if (
      command.notification !== undefined &&
      (command.createdBy !== "agent" ||
        (command.creationSource !== "server" && command.creationSource !== "provider") ||
        (dispatchMode.type !== "queue_after_active" &&
          !(
            command.restartContinuationOfRunId !== undefined &&
            dispatchMode.type === "start_immediately"
          )))
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: "Notifications must be server- or provider-created queued messages.",
      });
    }
    let delegatedCompletion: OrchestrationV2ConversationMessage["delegatedCompletion"] | undefined;
    if (command.delegatedCompletion !== undefined) {
      const requestedCompletion = command.delegatedCompletion;
      if (
        command.createdBy !== "agent" ||
        command.creationSource !== "server" ||
        dispatchMode.type !== "queue_after_active"
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "Delegated completion delivery must be a server-created queued message.",
        });
      }
      const parentRun = projection.runs.find(
        (candidate) => candidate.id === requestedCompletion.parentRunId,
      );
      const delivery = parentRun?.delegatedCompletion?.delivery;
      if (
        parentRun?.delegatedCompletion?.disposition !== "open" ||
        delivery === null ||
        delivery === undefined ||
        delivery.generation !== requestedCompletion.generation ||
        delivery.messageId !== command.messageId ||
        (projection.messages.some((candidate) => candidate.id === command.messageId) &&
          command.steerFollowUpOfRunId === undefined &&
          !isUndeliveredMailboxSteer(projection, command.messageId))
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "Delegated completion delivery is no longer dispatchable.",
        });
      }
      delegatedCompletion = {
        parentRunId: requestedCompletion.parentRunId,
        generation: delivery.generation,
        taskIds: delivery.taskIds,
      };
    }
    // A steer that switches provider needs a new turn. A provider that cannot restart its
    // turn for new input takes it after the turn, like a provider that cannot steer at all.
    // An explicit steer that Stop reached still fails below.
    if (dispatchMode.type === "steer_active" && command.modelSelection !== undefined) {
      const targetRunId = dispatchMode.targetRunId;
      const target = projection.runs.find((run) => run.id === targetRunId);
      if (
        target !== undefined &&
        isActiveRun(target) &&
        target.providerInstanceId !== command.modelSelection.instanceId &&
        !(yield* stopReachedRun(command, command.threadId, target.id))
      ) {
        // Before the provider session starts, the adapter's capabilities stand in for its own.
        const turns =
          providerTurnCapabilities(projection, target) ??
          (yield* providerAdapters.get(target.providerInstanceId).pipe(
            Effect.flatMap((adapter) => adapter.getCapabilities()),
            mapDispatchError(command),
          )).turns;
        if (providerSwitchWaitsForTurn(turns)) {
          dispatchMode = { type: "queue_after_active" };
        }
      }
    }
    // A provider that can stop a turn but not restart it with new input runs a
    // restart as the next turn: first in the queue, with the running turn stopped.
    if (dispatchMode.type === "restart_active" && !isNativeMaintenanceCommand(command)) {
      const targetRunId = dispatchMode.targetRunId;
      const target = projection.runs.find((run) => run.id === targetRunId);
      const providerSessionId = projection.providerThreads.find(
        (candidate) => candidate.id === target?.providerThreadId,
      )?.providerSessionId;
      const turns = projection.providerSessions.find((session) => session.id === providerSessionId)
        ?.capabilities.turns;
      const targetMessage = projection.messages.find(
        (message) => message.id === target?.userMessageId,
      );
      if (
        target?.status === "running" &&
        turns !== undefined &&
        turns.supportsInterrupt &&
        turns.supportsQueuedMessages &&
        !turns.supportsSteeringByInterruptRestart &&
        (targetMessage === undefined || !isNativeMaintenanceCommand(targetMessage)) &&
        !(yield* stopReachedRun(command, command.threadId, target.id))
      ) {
        // The restart replaces the stopped turn, so an older held queue does not hold it.
        queuedRunStop = {
          runId: target.id,
          reason: "Stopped to send a new message",
          skipsHeldQueue: true,
        };
        dispatchMode = { type: "queue_after_active" };
      }
    }
    // Steer mailbox deliveries, delegated task questions, and command notices
    // into an active goal under the thread lock: queued behind a long turn or a
    // goal run, they are never seen. Never interrupt/restart a turn for one.
    const noticeKind = command.notification?.source.kind;
    const commandNotice = noticeKind === "command" && command.creationSource === "server";
    if (
      !freshContext &&
      // A steer follow-up was declined by the active turn; steering it again loses it.
      command.steerFollowUpOfRunId === undefined &&
      // Steering refuses a command, so a notice that reads like one stays queued.
      !isSlashCommand(command) &&
      (delegatedCompletion !== undefined
        ? delegatedCompletion.taskIds.every(
            (id) =>
              projection.subagents.find((task) => task.id === id)?.completionWake === "always",
          )
        : noticeKind === "delegated_task" || commandNotice)
    ) {
      const active = projection.runs.find((run) => run.status === "running");
      const providerThread = projection.providerThreads.find(
        (row) => row.id === active?.providerThreadId,
      );
      const activeTurn = projection.providerTurns.find(
        (turn) => turn.runAttemptId === active?.activeAttemptId && turn.status === "running",
      );
      const activeMessage = projection.messages.find(
        (message) => message.id === active?.userMessageId,
      );
      if (
        active !== undefined &&
        activeTurn !== undefined &&
        providerThread?.providerSessionId != null &&
        (!commandNotice || providerThread.goal?.status === "active") &&
        (activeMessage === undefined || !isNativeMaintenanceCommand(activeMessage))
      ) {
        const session = yield* providerSessions
          .get(providerThread.providerSessionId)
          .pipe(Effect.orElseSucceed(() => Option.none()));
        if (
          Option.isSome(session) &&
          session.value.providerSession.capabilities.turns.supportsActiveSteering &&
          session.value.providerSession.capabilities.turns.activeSteeringInterruptsTools !== true &&
          !(yield* stopReachedRun(command, command.threadId, active.id))
        ) {
          dispatchMode = { type: "steer_active", targetRunId: active.id };
        }
      }
    }
    const notification =
      command.manualContinuationOfRunId === undefined
        ? command.notification
        : {
            source: { kind: "system" as const },
            outcome: "updated" as const,
            summary: "Resumed thread",
          };
    const dispatchText =
      command.manualContinuationOfRunId !== undefined
        ? ""
        : delegatedCompletion === undefined
          ? command.text
          : delegatedCompletionWakeDetail(delegatedCompletion.taskIds, projection.subagents);
    const sourcePlanProjection =
      command.sourcePlanRef === undefined
        ? null
        : yield* getProjectionWithPendingEvents(command.sourcePlanRef.threadId, events);
    const sourcePlanArtifact =
      command.sourcePlanRef === undefined
        ? undefined
        : yield* projectionStore
            .getPlan(command.sourcePlanRef.threadId, command.sourcePlanRef.planId)
            .pipe(mapDispatchError(command));
    const sourcePlan = sourcePlanArtifact?.kind === "proposed_plan" ? sourcePlanArtifact : null;
    if (command.sourcePlanRef !== undefined && sourcePlan === null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Proposed plan ${command.sourcePlanRef.planId} does not exist on thread ${command.sourcePlanRef.threadId}.`,
      });
    }
    if (
      sourcePlanProjection !== null &&
      sourcePlanProjection.thread.projectId !== projection.thread.projectId
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Proposed plan ${command.sourcePlanRef?.planId} belongs to a different project.`,
      });
    }
    if (sourcePlan !== null && sourcePlan.status !== "active") {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Proposed plan ${sourcePlan.id} is not active.`,
      });
    }
    const completeSourcePlan = (occurredAt: DateTime.Utc) =>
      sourcePlan === null
        ? Effect.void
        : emit(
            events,
            command,
          )({
            type: "plan.updated",
            threadId: sourcePlan.threadId,
            ...(sourcePlan.runId === null ? {} : { runId: sourcePlan.runId }),
            nodeId: sourcePlan.nodeId,
            occurredAt,
            payload: { ...sourcePlan, status: "completed" },
          });

    let steerWhenReadyRunId: RunId | undefined;
    if (dispatchMode.type === "steer_active") {
      const targetRunId = dispatchMode.targetRunId;
      const target = projection.runs.find((run) => run.id === targetRunId);
      if (
        (target?.status === "preparing" ||
          target?.status === "starting" ||
          (target?.status === "running" &&
            !projection.providerTurns.some(
              (turn) => turn.runAttemptId === target.activeAttemptId && turn.status === "running",
            ))) &&
        !(yield* stopReachedRun(command, command.threadId, target.id))
      ) {
        // Such a caller's message waits for its own turn instead.
        if (yield* limitForbidsParkedSteer) {
          dispatchMode = { type: "queue_after_active" };
        } else {
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
          yield* ensureSteeringMessage(command, command);
          steerWhenReadyRunId = target.id;
          dispatchMode = { type: "queue_after_active" };
        }
      }
    }
    if (dispatchMode.type === "steer_active" || dispatchMode.type === "restart_active") {
      yield* ensureGoalCommandSupported(command, command, modelSelection.instanceId);
      yield* dispatchSteerIntoRun({
        command,
        events,
        effects,
        projection,
        modelSelection:
          delegatedCompletion === undefined && notification === undefined
            ? modelSelection
            : (projection.runs.find((run) => run.id === dispatchMode.targetRunId)?.modelSelection ??
              modelSelection),
        delegatedCompletion,
        ...(notification === undefined ? {} : { notification }),
        targetRunId: dispatchMode.targetRunId,
        messageId: command.messageId,
        text: dispatchText,
        ...(command.context ? { context: command.context } : {}),
        attachments: command.attachments,
        createdBy: command.createdBy,
        creationSource: command.creationSource,
        ...(command.scheduledTaskId === undefined
          ? {}
          : { scheduledTaskId: command.scheduledTaskId }),
        ...(command.senderThreadId === undefined ? {} : { senderThreadId: command.senderThreadId }),
        ...(command.linkedSender === undefined ? {} : { linkedSender: command.linkedSender }),
        ...(command.idleCompaction === undefined ? {} : { idleCompaction: command.idleCompaction }),
        forceRestart: dispatchMode.type === "restart_active",
      });
      return;
    }

    const activeProviderThread = dispatchProviderThread(
      projection,
      { ...command, delegatedCompletion },
      freshContext,
    );
    const activeRun = projection.runs.find(isActiveRun);
    // Messages after failed or stopped worktree setup must wait for a worktree,
    // rather than start in the project checkout.
    const latestRun = latestExecutedRun(projection.runs);
    const worktreeMissingRun =
      activeRun === undefined &&
      (dispatchMode.type === "queue_after_active" || dispatchMode.type === "start_immediately") &&
      (latestRun?.status === "failed" || latestRun?.status === "interrupted") &&
      latestRun.startedAt === null &&
      latestRun.workspacePreparation?.type === "worktree" &&
      projection.thread.worktreePath === null
        ? latestRun
        : undefined;
    // A steer whose run already ended still keeps its place in the queue.
    const steerFollowUpSource =
      command.steerFollowUpOfRunId === undefined
        ? undefined
        : projection.runs.find((run) => run.id === command.steerFollowUpOfRunId);
    const queueBehindRun = activeRun ?? worktreeMissingRun ?? steerFollowUpSource;
    const pendingMergeBackTransfers = pendingMergeBackTransfersForThread(projection);
    const startsOrQueuesRun =
      dispatchMode.type === "defer_start" ||
      dispatchMode.type === "start_immediately" ||
      dispatchMode.type === "queue_after_active";
    const shouldQueue = queueBehindRun !== undefined && startsOrQueuesRun;
    // An explicit pick queued ahead reaches the thread only when its run starts. A goal or
    // restart command that stops the active run goes first, so nothing queued applies before it.
    // Buffered provider wakes drain output their own provider already produced.
    const incomingMessage = { ...command, delegatedCompletion };
    // A message that names no model runs on the thread's pick when it starts, not a copy from now.
    const followsThreadSelection =
      command.modelSelection === undefined &&
      (command.scheduledTaskId !== undefined ||
        (shouldQueue &&
          !followsCurrentConversation(incomingMessage) &&
          !isBufferedProviderNotification(incomingMessage)));
    if (
      shouldQueue &&
      // A steer whose run ended keeps the thread's selection, as it did before it queued.
      queueBehindRun !== steerFollowUpSource &&
      steerWhenReadyRunId === undefined &&
      command.modelSelection === undefined &&
      queuedRunStop === undefined &&
      !followsCurrentConversation(incomingMessage) &&
      !isBufferedProviderNotification(incomingMessage)
    ) {
      modelSelection = queueTailModelSelection(projection);
    }
    yield* ensureGoalCommandSupported(command, command, modelSelection.instanceId);
    // Client messages resume held queues; server continuations and scheduled tasks do not.
    // Provider failure or usage limits re-hold the queue.
    const worktreeSetupUnresolved = worktreeSetupPending(projection);
    const sentByUserFromClient =
      command.steerFollowUpOfRunId === undefined &&
      command.createdBy === "user" &&
      (command.creationSource === "web" || command.creationSource === "mobile") &&
      command.scheduledTaskId === undefined;
    const heldRunsToRelease =
      sentByUserFromClient && startsOrQueuesRun && !worktreeSetupUnresolved
        ? projection.runs.filter((run) => run.status === "queued" && run.queueHeld === true)
        : [];
    const releasedAt = yield* DateTime.now;
    for (const held of heldRunsToRelease) {
      yield* emit(
        events,
        command,
      )({
        type: "run.updated",
        threadId: command.threadId,
        runId: held.id,
        providerInstanceId: held.providerInstanceId,
        occurredAt: releasedAt,
        payload: { ...held, queueHeld: false },
      });
    }
    if (shouldQueue) {
      if (pendingMergeBackTransfers.length > 0) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} has a pending merge-back transfer; queued merge-back consumption is not implemented yet.`,
        });
      }
      const queueProviderThread =
        activeProviderThread ??
        projection.providerThreads.find(
          (candidate) => candidate.id === queueBehindRun.providerThreadId,
        );
      if (queueProviderThread === undefined) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Active run ${queueBehindRun.id} has no provider thread for queued dispatch.`,
        });
      }
      const now = yield* DateTime.now;
      const ordinal = nextRunOrdinal(projection);
      const runId = idAllocator.derive.run({ threadId: command.threadId, ordinal });
      const targetProviderThread = freshContext
        ? undefined
        : modelSelection.instanceId === queueProviderThread.providerInstanceId
          ? queueProviderThread
          : rootProviderThreadsForProvider(projection, modelSelection.instanceId)[0];
      const queuedAdapter = yield* providerAdapters
        .get(modelSelection.instanceId)
        .pipe(mapDispatchError(command));
      const selectedProviderSession =
        targetProviderThread?.providerSessionId === null ||
        targetProviderThread?.providerSessionId === undefined
          ? undefined
          : projection.providerSessions.find(
              (candidate) => candidate.id === targetProviderThread.providerSessionId,
            );
      const queuedCapabilities =
        selectedProviderSession?.capabilities ??
        (yield* queuedAdapter.getCapabilities().pipe(mapDispatchError(command)));
      yield* mapDispatchError(command)(
        commandPolicy.ensureQueuedMessages({
          commandId: command.commandId,
          threadId: command.threadId,
          providerInstanceId: modelSelection.instanceId,
          capabilities: queuedCapabilities,
        }),
      );
      const queuedProviderThread: OrchestrationV2ProviderThread = targetProviderThread ?? {
        id: idAllocator.derive.providerThread({
          driver: queuedAdapter.driver,
          nativeThreadId: `pending:${runId}`,
        }),
        driver: queuedAdapter.driver,
        providerInstanceId: modelSelection.instanceId,
        providerSessionId: null,
        appThreadId: command.threadId,
        ownerNodeId: null,
        nativeThreadRef: null,
        nativeConversationHeadRef: null,
        status: "not_loaded",
        firstRunOrdinal: null,
        lastRunOrdinal: null,
        handoffIds: [],
        forkedFrom: null,
        createdAt: now,
        updatedAt: now,
      };
      const attemptId = idAllocator.derive.runAttempt({ runId, attemptOrdinal: 1 });
      const rootNodeId = idAllocator.derive.rootNode({ runId });
      const checkpointScope =
        queueBehindRun.status === "preparing" || worktreeMissingRun !== undefined
          ? null
          : yield* runtimePolicy.resolve({ thread: projection.thread, modelSelection }).pipe(
              Effect.flatMap((resolvedRuntimePolicy) =>
                checkpointService.prepareRootRunScope({
                  threadId: command.threadId,
                  runId,
                  rootNodeId,
                  providerThreadId: queuedProviderThread.id,
                  cwd:
                    resolvedRuntimePolicy.cwd ??
                    selectedProviderSession?.cwd ??
                    projection.thread.worktreePath ??
                    process.cwd(),
                  createdAt: now,
                }),
              ),
              Effect.mapError(
                (cause) =>
                  new OrchestratorDispatchError({
                    commandId: command.commandId,
                    commandType: command.type,
                    cause,
                  }),
              ),
            );
      const queueIsHeld = projection.runs.some(
        (candidate) => candidate.status === "queued" && candidate.queueHeld === true,
      );
      // Buffered wakes need a T3 run for output the CLI already started producing.
      // Stop still holds wakes that arrive before the active run settles.
      const wakeSkipsHold =
        !worktreeSetupUnresolved &&
        activeRun !== undefined &&
        queueIsHeld &&
        command.createdBy === "agent" &&
        command.creationSource === "provider" &&
        !(yield* stopReachedRun(command, command.threadId, activeRun.id));
      let steerFollowUpQueuePosition: number | undefined;
      if (command.steerFollowUpAfterRunOrdinal !== undefined) {
        const afterRunOrdinal = command.steerFollowUpAfterRunOrdinal;
        const steerOrdinal =
          projection.turnItems.find(
            (item) => item.type === "user_message" && item.messageId === command.messageId,
          )?.ordinal ?? -1;
        // Earlier declined steers have newer runs but retain their original turn-item ordinals.
        const earlierSteerMessageIds = new Set(
          projection.turnItems.flatMap((item) =>
            item.type === "user_message" && item.ordinal < steerOrdinal ? [item.messageId] : [],
          ),
        );
        steerFollowUpQueuePosition =
          Math.max(
            0,
            ...projection.runs
              .filter(
                (candidate) =>
                  candidate.status === "queued" &&
                  (candidate.ordinal <= afterRunOrdinal ||
                    earlierSteerMessageIds.has(candidate.userMessageId)),
              )
              .map((candidate) => candidate.queuePosition ?? candidate.ordinal),
          ) + 1;
      }
      const run: OrchestrationV2Run = {
        id: runId,
        threadId: command.threadId,
        ordinal,
        providerInstanceId: modelSelection.instanceId,
        modelSelection,
        providerThreadId: queuedProviderThread.id,
        userMessageId: command.messageId,
        rootNodeId,
        activeAttemptId: attemptId,
        status: "queued",
        ...(command.explicitQueue === true ? { explicitQueue: true as const } : {}),
        ...(steerWhenReadyRunId === undefined ? {} : { steerWhenReadyRunId }),
        // A restart cancels its run; nobody knows whether the provider read the steer, so a person decides.
        ...(worktreeMissingRun !== undefined ||
        steerFollowUpSource?.status === "cancelled" ||
        (heldRunsToRelease.length === 0 &&
          queueIsHeld &&
          !wakeSkipsHold &&
          queuedRunStop?.skipsHeldQueue !== true)
          ? { queueHeld: true }
          : {}),
        queuePosition:
          queuedRunStop !== undefined
            ? 1
            : (steerFollowUpQueuePosition ??
              Math.max(
                0,
                ...projection.runs
                  .filter((candidate) => candidate.status === "queued")
                  .map((candidate) => candidate.queuePosition ?? candidate.ordinal),
              ) + 1),
        requestedAt: now,
        startedAt: null,
        completedAt: null,
        checkpointId: null,
        contextHandoffId: null,
        ...(command.sourcePlanRef === undefined ? {} : { sourcePlanRef: command.sourcePlanRef }),
        ...(command.restartContinuationOfRunId === undefined
          ? {}
          : { restartContinuationOfRunId: command.restartContinuationOfRunId }),
        ...(command.manualContinuationOfRunId === undefined
          ? {}
          : { manualContinuationOfRunId: command.manualContinuationOfRunId }),
        ...(command.usageLimitContinuationOfRunId === undefined
          ? {}
          : { usageLimitContinuationOfRunId: command.usageLimitContinuationOfRunId }),
        ...(continuedTaskId === undefined ? {} : { delegatedTaskId: continuedTaskId }),
        ...(freshContext ? { freshContext: true } : {}),
        ...output,
      };
      const attempt: OrchestrationV2RunAttempt = {
        id: attemptId,
        runId,
        attemptOrdinal: 1,
        rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        providerThreadId: queuedProviderThread.id,
        providerTurnId: null,
        reason: "initial",
        status: "pending",
        startedAt: null,
        completedAt: null,
      };
      const rootNode: OrchestrationV2ExecutionNode = {
        id: rootNodeId,
        threadId: command.threadId,
        runId,
        parentNodeId: null,
        rootNodeId,
        kind: "root_turn",
        status: "pending",
        countsForRun: true,
        providerThreadId: queuedProviderThread.id,
        providerTurnId: null,
        nativeItemRef: null,
        runtimeRequestId: null,
        checkpointScopeId: checkpointScope?.id ?? null,
        startedAt: null,
        completedAt: null,
      };
      const message: OrchestrationV2ConversationMessage = {
        createdBy: command.createdBy,
        creationSource: command.creationSource,
        ...(command.scheduledTaskId === undefined
          ? {}
          : { scheduledTaskId: command.scheduledTaskId }),
        ...(command.senderThreadId === undefined ? {} : { senderThreadId: command.senderThreadId }),
        ...(command.linkedSender === undefined ? {} : { linkedSender: command.linkedSender }),
        ...(command.idleCompaction === undefined ? {} : { idleCompaction: command.idleCompaction }),
        ...(followsThreadSelection ? { followsThreadSelection: true as const } : {}),
        id: command.messageId,
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        role: "user",
        text: dispatchText,
        ...(command.context ? { context: command.context } : {}),
        attachments: command.attachments,
        streaming: false,
        createdAt: now,
        updatedAt: now,
        ...(delegatedCompletion === undefined ? {} : { delegatedCompletion }),
        ...(notification === undefined ? {} : { notification }),
      };
      const emitEvent = emit(events, command);
      if (targetProviderThread === undefined) {
        yield* emitEvent({
          type: "provider-thread.updated",
          threadId: command.threadId,
          providerInstanceId: modelSelection.instanceId,
          occurredAt: now,
          payload: queuedProviderThread,
        });
      }
      yield* emitEvent({
        type: "run.created",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: run,
      });
      if (steerFollowUpQueuePosition !== undefined) {
        for (const queued of projection.runs) {
          if (
            queued.status !== "queued" ||
            (queued.queuePosition ?? queued.ordinal) < steerFollowUpQueuePosition
          )
            continue;
          yield* emitEvent({
            type: "run.updated",
            threadId: command.threadId,
            runId: queued.id,
            providerInstanceId: queued.providerInstanceId,
            occurredAt: now,
            payload: {
              ...queued,
              ...(heldRunsToRelease.includes(queued) ? { queueHeld: false } : {}),
              queuePosition: (queued.queuePosition ?? queued.ordinal) + 1,
            },
          });
        }
      }
      yield* completeSourcePlan(now);
      yield* emitEvent({
        type: "run-attempt.created",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: attempt,
      });
      yield* emitEvent({
        type: "node.updated",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: rootNode,
      });
      if (checkpointScope !== null) {
        yield* emitEvent({
          type: "checkpoint-scope.created",
          threadId: command.threadId,
          runId,
          nodeId: rootNodeId,
          providerInstanceId: modelSelection.instanceId,
          occurredAt: now,
          payload: checkpointScope,
        });
      }
      yield* emitEvent({
        type: "message.updated",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: message,
      });
      const existingItem = projection.turnItems.find(
        (item) => item.type === "user_message" && item.messageId === command.messageId,
      );
      if (existingItem?.type === "user_message") {
        yield* emitEvent({
          type: "turn-item.updated",
          threadId: command.threadId,
          runId,
          nodeId: rootNodeId,
          providerInstanceId: modelSelection.instanceId,
          occurredAt: now,
          payload: {
            ...existingItem,
            runId,
            nodeId: rootNodeId,
            providerThreadId: queuedProviderThread.id,
            providerTurnId: null,
            inputIntent: "queued_turn",
            status: "pending",
            startedAt: null,
            completedAt: null,
            updatedAt: now,
          },
        });
      }
      if (queuedRunStop !== undefined) {
        return yield* stopRunForQueuedCommand({
          command,
          events,
          effects,
          projection: yield* getProjectionWithPendingEvents(command.threadId, events),
          queuedRunId: runId,
          targetRunId: queuedRunStop.runId,
          reason: queuedRunStop.reason,
          now,
        });
      }
      return;
    }
    // A scheduled fresh run is a side conversation, so it must not drop the fork's context.
    const supersedesForkTransfer = freshContext && command.scheduledTaskId === undefined;
    const pendingForkTransfer = supersedesForkTransfer
      ? undefined
      : pendingForkTransferForThread(projection);
    const pendingMergeBackSourceThreadIds = new Set(
      pendingMergeBackTransfers.map((transfer) => transfer.sourceThreadId),
    );
    if (pendingMergeBackSourceThreadIds.size > 1) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} has pending merge-back transfers from multiple forks.`,
      });
    }
    const pendingMergeBackTransfer = latestContextTransfer(pendingMergeBackTransfers);
    const supersededMergeBackTransfers = pendingMergeBackTransfers.filter(
      (transfer) => transfer.id !== pendingMergeBackTransfer?.id,
    );
    const now = yield* DateTime.now;
    if (
      !modelSelectionsEqual(projection.thread.modelSelection, modelSelection) ||
      projection.thread.providerInstanceId !== modelSelection.instanceId
    ) {
      yield* emit(
        events,
        command,
      )({
        type:
          projection.thread.providerInstanceId === modelSelection.instanceId
            ? "thread.model-selection-updated"
            : "thread.provider-switched",
        threadId: command.threadId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: {
          ...projection.thread,
          providerInstanceId: modelSelection.instanceId,
          modelSelection,
          updatedAt: now,
        },
      });
    }
    if (
      freshContext &&
      (pendingForkTransfer !== undefined || pendingMergeBackTransfer !== undefined)
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause:
          pendingMergeBackTransfer !== undefined
            ? "Send a message without /clear to apply the merged context first."
            : "A fresh session can't start while a fork or merge is still being applied.",
      });
    }
    const ordinal = nextRunOrdinal(projection);
    const runId = idAllocator.derive.run({ threadId: command.threadId, ordinal });
    const contextBoundary = freshContext ? ordinal : contextBoundaryOrdinal(projection);
    const latestCompletedRun = projection.runs.findLast((run) => run.status === "completed");
    const latestHandoffRun = projection.runs.findLast(isHandoffSourceRun);
    const legacyImportItems =
      projection.thread.historyOrigin === "v1_import" && contextBoundary === 0
        ? yield* readHandoffItems(command.threadId, [null])
        : [];
    const isProviderSwitch =
      activeProviderThread !== undefined &&
      activeProviderThread.providerInstanceId !== modelSelection.instanceId;
    // Account overlays share native history. Selection commands may already
    // have updated the app thread, so classify against the native thread's owner.
    const providerSwitchPlan = isProviderSwitch
      ? yield* providerSwitchService
          .plan({
            projection: {
              ...projection,
              thread: {
                ...projection.thread,
                modelSelection: {
                  ...projection.thread.modelSelection,
                  instanceId: activeProviderThread.providerInstanceId,
                },
              },
            },
            targetModelSelection: modelSelection,
          })
          .pipe(mapDispatchError(command))
      : null;
    const canResumeAcrossInstances =
      !freshContext &&
      isProviderSwitch &&
      activeProviderThread.nativeThreadRef !== null &&
      providerSwitchPlan?.transition.type === "restart_and_resume";
    const releasableSessions = uniqueSessions([
      ...projection.providerSessions.filter(
        (session) =>
          providerSwitchPlan?.releaseProviderSessionIds.includes(session.id) &&
          session.status !== "stopped" &&
          session.status !== "error",
      ),
      ...(freshContext ? sessionsReleasedByFreshContext(projection, activeProviderThread) : []),
    ]);
    const sessionsToDetach: Array<OrchestrationV2ProviderSession> = [];
    for (const detaching of releasableSessions) {
      if (yield* sessionHasBackgroundWork(detaching, projection.providerThreads)) {
        // A schedule has nobody to wait or press Stop; like a queued fresh start, leave it running.
        if (freshContext && command.scheduledTaskId !== undefined) continue;
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: freshContext
            ? "The current session is still running background agents or commands, and a fresh session would end them. Wait for them to finish, or press Stop, then send the message again."
            : "The previous provider is still running background agents or commands, and switching would end them. Wait for them to finish, or press Stop, then send the message again.",
        });
      }
      sessionsToDetach.push(detaching);
    }

    if (
      pendingForkTransfer === undefined &&
      pendingMergeBackTransfer === undefined &&
      (!isProviderSwitch || freshContext)
    ) {
      const reusableProviderThread = freshContext ? undefined : activeProviderThread;
      const adapter = yield* providerAdapters.get(modelSelection.instanceId).pipe(
        Effect.mapError(
          (cause) =>
            new OrchestratorProviderAdapterError({
              commandId: command.commandId,
              providerInstanceId: modelSelection.instanceId,
              cause,
            }),
        ),
      );
      const providerSessionId =
        reusableProviderThread?.providerSessionId ??
        (yield* mapDispatchError(command)(
          providerSessionIdFor({
            adapter,
            providerInstanceId: modelSelection.instanceId,
            threadId: command.threadId,
          }),
        ));
      const providerThreadId =
        reusableProviderThread?.id ??
        idAllocator.derive.providerThread({
          driver: adapter.driver,
          nativeThreadId: `pending:${runId}`,
        });
      const legacyImportHandoff = shouldPrepareLegacyImportHandoff({
        hasNativeHistory:
          activeProviderThread !== undefined && activeProviderThread.nativeThreadRef !== null,
        historyOrigin: projection.thread.historyOrigin,
        hasCompletedRun: latestCompletedRun !== undefined,
        legacyImportItemCount: legacyImportItems.length,
      })
        ? yield* contextHandoffService
            .prepareLegacyImport({
              threadId: command.threadId,
              targetRunId: runId,
              toProviderThreadId: providerThreadId,
              toProviderInstanceId: modelSelection.instanceId,
              items: legacyImportItems,
              createdAt: now,
            })
            .pipe(mapDispatchError(command))
        : null;
      const providerThread: OrchestrationV2ProviderThread =
        reusableProviderThread === undefined
          ? {
              id: providerThreadId,
              driver: adapter.driver,
              providerInstanceId: modelSelection.instanceId,
              providerSessionId,
              appThreadId: command.threadId,
              ownerNodeId: null,
              nativeThreadRef: null,
              nativeConversationHeadRef: null,
              status: "not_loaded",
              firstRunOrdinal: ordinal,
              lastRunOrdinal: ordinal,
              handoffIds: legacyImportHandoff === null ? [] : [legacyImportHandoff.id],
              forkedFrom: null,
              createdAt: now,
              updatedAt: now,
            }
          : {
              ...reusableProviderThread,
              providerSessionId,
              lastRunOrdinal: ordinal,
              handoffIds: appendContextHandoffId(
                reusableProviderThread.handoffIds,
                legacyImportHandoff?.id ?? null,
              ),
              updatedAt: now,
            };
      const attemptId = idAllocator.derive.runAttempt({ runId, attemptOrdinal: 1 });
      const rootNodeId = idAllocator.derive.rootNode({ runId });
      const checkpointScope =
        dispatchMode.type === "defer_start"
          ? null
          : yield* runtimePolicy
              .resolve({
                thread: projection.thread,
                modelSelection,
              })
              .pipe(
                mapDispatchError(command),
                Effect.flatMap((resolvedRuntimePolicy) =>
                  checkpointService.prepareRootRunScope({
                    threadId: command.threadId,
                    runId,
                    rootNodeId,
                    providerThreadId,
                    cwd:
                      resolvedRuntimePolicy.cwd ?? projection.thread.worktreePath ?? process.cwd(),
                    createdAt: now,
                  }),
                ),
                mapDispatchError(command),
              );
      const run: OrchestrationV2Run = {
        id: runId,
        threadId: command.threadId,
        ordinal,
        providerInstanceId: modelSelection.instanceId,
        modelSelection,
        providerThreadId,
        userMessageId: command.messageId,
        rootNodeId,
        activeAttemptId: attemptId,
        status: dispatchMode.type === "defer_start" ? "preparing" : "starting",
        queuePosition: null,
        requestedAt: now,
        startedAt: null,
        completedAt: null,
        checkpointId: null,
        contextHandoffId: legacyImportHandoff?.id ?? null,
        ...(command.sourcePlanRef === undefined ? {} : { sourcePlanRef: command.sourcePlanRef }),
        ...(command.restartContinuationOfRunId === undefined
          ? {}
          : { restartContinuationOfRunId: command.restartContinuationOfRunId }),
        ...(command.manualContinuationOfRunId === undefined
          ? {}
          : { manualContinuationOfRunId: command.manualContinuationOfRunId }),
        ...(command.usageLimitContinuationOfRunId === undefined
          ? {}
          : { usageLimitContinuationOfRunId: command.usageLimitContinuationOfRunId }),
        ...(dispatchMode.type === "defer_start" && dispatchMode.workspaceStrategy !== undefined
          ? { workspacePreparation: dispatchMode.workspaceStrategy }
          : {}),
        ...(continuedTaskId === undefined ? {} : { delegatedTaskId: continuedTaskId }),
        ...wakeWorkStartedAt(projection, command),
        ...(freshContext ? { freshContext: true } : {}),
        ...output,
      };
      const attempt: OrchestrationV2RunAttempt = {
        id: attemptId,
        runId,
        attemptOrdinal: 1,
        rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        providerThreadId,
        providerTurnId: null,
        reason: "initial",
        status: "pending",
        startedAt: null,
        completedAt: null,
      };
      const rootNode: OrchestrationV2ExecutionNode = {
        id: rootNodeId,
        threadId: command.threadId,
        runId,
        parentNodeId: null,
        rootNodeId,
        kind: "root_turn",
        status: "pending",
        countsForRun: true,
        providerThreadId,
        providerTurnId: null,
        nativeItemRef: null,
        runtimeRequestId: null,
        checkpointScopeId: checkpointScope?.id ?? null,
        startedAt: null,
        completedAt: null,
      };
      const message: OrchestrationV2ConversationMessage = {
        createdBy: command.createdBy,
        creationSource: command.creationSource,
        ...(command.scheduledTaskId === undefined
          ? {}
          : { scheduledTaskId: command.scheduledTaskId }),
        ...(command.senderThreadId === undefined ? {} : { senderThreadId: command.senderThreadId }),
        ...(command.linkedSender === undefined ? {} : { linkedSender: command.linkedSender }),
        ...(command.idleCompaction === undefined ? {} : { idleCompaction: command.idleCompaction }),
        ...(followsThreadSelection ? { followsThreadSelection: true as const } : {}),
        id: command.messageId,
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        role: "user",
        text: dispatchText,
        ...(command.context ? { context: command.context } : {}),
        attachments: command.attachments,
        streaming: false,
        createdAt: now,
        updatedAt: now,
        ...(delegatedCompletion === undefined ? {} : { delegatedCompletion }),
        ...(notification === undefined ? {} : { notification }),
      };
      const turnItem: OrchestrationV2TurnItem = {
        createdBy: command.createdBy,
        creationSource: command.creationSource,
        ...(command.scheduledTaskId === undefined
          ? {}
          : { scheduledTaskId: command.scheduledTaskId }),
        ...(command.senderThreadId === undefined ? {} : { senderThreadId: command.senderThreadId }),
        ...(command.linkedSender === undefined ? {} : { linkedSender: command.linkedSender }),
        ...(command.idleCompaction === undefined ? {} : { idleCompaction: command.idleCompaction }),
        id: idAllocator.derive.userTurnItem({ messageId: command.messageId }),
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerThreadId,
        providerTurnId: null,
        nativeItemRef: null,
        parentItemId: null,
        ordinal: yield* nextTurnItemOrdinal(projection),
        status: "completed",
        title: null,
        startedAt: now,
        completedAt: now,
        updatedAt: now,
        type: "user_message",
        messageId: command.messageId,
        inputIntent: "turn_start",
        text: dispatchText,
        ...(command.context ? { context: command.context } : {}),
        attachments: command.attachments,
        ...(freshContext ? { freshContext: true } : {}),
        ...(run.contextHandoffId === null ? modelSwitchSince(projection, modelSelection) : {}),
      };
      const preparationTurnItem: OrchestrationV2TurnItem | null =
        dispatchMode.type === "defer_start"
          ? {
              id: idAllocator.derive.turnItemFromProviderItem({
                driver: adapter.driver,
                nativeItemId: `workspace-preparation:${runId}`,
              }),
              threadId: command.threadId,
              runId,
              nodeId: rootNodeId,
              providerThreadId,
              providerTurnId: null,
              nativeItemRef: null,
              parentItemId: null,
              ordinal: turnItem.ordinal + 1,
              status: "running",
              title: WORKSPACE_PREPARATION_INPUT,
              startedAt: now,
              completedAt: null,
              updatedAt: now,
              type: "command_execution",
              input: WORKSPACE_PREPARATION_INPUT,
            }
          : null;
      const emitEvent = emit(events, command);
      yield* emitEvent({
        type: "provider-thread.updated",
        threadId: command.threadId,
        driver: adapter.driver,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: providerThread,
      });
      if (legacyImportHandoff !== null) {
        yield* emitEvent({
          type: "context-handoff.updated",
          threadId: command.threadId,
          runId,
          providerInstanceId: modelSelection.instanceId,
          occurredAt: now,
          payload: legacyImportHandoff,
        });
      }
      yield* emitEvent({
        type: "run.created",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: run,
      });
      yield* completeSourcePlan(now);
      const supersededForkTransfer = supersedesForkTransfer
        ? pendingForkTransferForThread(projection)
        : undefined;
      if (supersededForkTransfer !== undefined) {
        yield* emitEvent(
          forkTransferSupersededEvent(
            supersededForkTransfer,
            runId,
            modelSelection.instanceId,
            now,
          ),
        );
      }
      yield* emitEvent({
        type: "run-attempt.created",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: attempt,
      });
      yield* emitEvent({
        type: "node.updated",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: rootNode,
      });
      if (checkpointScope !== null) {
        yield* emitEvent({
          type: "checkpoint-scope.created",
          threadId: command.threadId,
          runId,
          nodeId: rootNodeId,
          providerInstanceId: modelSelection.instanceId,
          occurredAt: now,
          payload: checkpointScope,
        });
      }
      yield* emitEvent({
        type: "message.updated",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: message,
      });
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: notificationTurnItem(
          turnItem,
          message,
          yield* notificationTasks(command.threadId, message, projection.subagents),
        ),
      });
      if (preparationTurnItem !== null) {
        yield* emitEvent({
          type: "turn-item.updated",
          threadId: command.threadId,
          runId,
          nodeId: rootNodeId,
          providerInstanceId: modelSelection.instanceId,
          occurredAt: now,
          payload: preparationTurnItem,
        });
      }
      for (const session of sessionsToDetach) {
        if (session.id === providerSessionId) continue;
        yield* emitEvent({
          type: "provider-session.detached",
          threadId: command.threadId,
          driver: session.driver,
          providerInstanceId: session.providerInstanceId,
          occurredAt: now,
          payload: {
            providerSessionId: session.id,
            detachedAt: now,
            reason: FRESH_CONTEXT_DETACH_REASON,
          },
        });
        yield* Ref.update(effects, (existing) => [
          ...existing,
          {
            id: `effect:${command.commandId}:provider-session.detach:${session.id}`,
            commandId: command.commandId,
            threadId: command.threadId,
            request: {
              type: "provider-session.detach",
              providerSessionId: session.id,
              detail: FRESH_CONTEXT_DETACH_REASON,
            },
          } satisfies PendingOrchestrationEffectV2,
        ]);
      }
      const pendingEffect = {
        id: `effect:${command.commandId}:provider-turn.start:${runId}`,
        commandId: command.commandId,
        threadId: command.threadId,
        request: { type: "provider-turn.start", runId },
      } satisfies PendingOrchestrationEffectV2;
      if (dispatchMode.type !== "defer_start") {
        yield* Ref.update(effects, (existing) => [...existing, pendingEffect]);
      }
      return;
    }
    const sourceProjection =
      pendingForkTransfer === undefined
        ? null
        : yield* projectionStore
            .getThreadRecords(pendingForkTransfer.sourceThreadId, [
              "runs",
              "attempts",
              "providerThreads",
              "providerTurns",
            ])
            .pipe(
              Effect.mapError(
                (cause) =>
                  new OrchestratorProjectionError({
                    threadId: pendingForkTransfer.sourceThreadId,
                    cause,
                  }),
              ),
            );
    const sourceRun =
      pendingForkTransfer?.sourcePoint.runId === undefined || sourceProjection === null
        ? null
        : (sourceProjection.runs.find(
            (candidate) => candidate.id === pendingForkTransfer.sourcePoint.runId,
          ) ?? null);
    const sourceProviderThread =
      sourceProjection === null || sourceRun === null
        ? undefined
        : providerThreadForRun(sourceProjection, sourceRun);
    const sourceProviderTurnId =
      sourceProjection === null || sourceRun === null || sourceRun.activeAttemptId === null
        ? undefined
        : (latestProviderTurnForAttempt(sourceProjection.providerTurns, sourceRun.activeAttemptId)
            ?.id ??
          sourceProjection.attempts.find((candidate) => candidate.id === sourceRun.activeAttemptId)
            ?.providerTurnId ??
          undefined);
    const sideChatFork =
      pendingForkTransfer !== undefined && projection.thread.lineage.sideChat === true;
    // Opened during the parent's first turn: the digest is the whole context.
    const sideChatWithoutSource =
      sideChatFork && pendingForkTransfer.sourcePoint.runId === undefined;
    if (pendingForkTransfer !== undefined) {
      if (!sideChatWithoutSource && (sourceRun === null || sourceProviderThread === undefined)) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Pending fork transfer ${pendingForkTransfer.id} has no resolvable source provider thread.`,
        });
      }
      if (pendingForkTransfer.sourceProviderInstanceId === null) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Pending fork transfer ${pendingForkTransfer.id} has no source provider.`,
        });
      }
    }

    const adapter = yield* providerAdapters.get(modelSelection.instanceId).pipe(
      Effect.mapError(
        (cause) =>
          new OrchestratorProviderAdapterError({
            commandId: command.commandId,
            providerInstanceId: modelSelection.instanceId,
            cause,
          }),
      ),
    );
    const targetProviderThread =
      isProviderSwitch && !canResumeAcrossInstances
        ? rootProviderThreadsForProvider(projection, modelSelection.instanceId)[0]
        : activeProviderThread;
    const providerSessionId =
      (canResumeAcrossInstances ? undefined : targetProviderThread?.providerSessionId) ??
      (yield* mapDispatchError(command)(
        providerSessionIdFor({
          adapter,
          providerInstanceId: modelSelection.instanceId,
          threadId: command.threadId,
        }),
      ));
    const existingProviderSession = projection.providerSessions.find(
      (candidate) => candidate.id === providerSessionId,
    );
    const resolvedRuntimePolicy = yield* runtimePolicy
      .resolve({ thread: projection.thread, modelSelection })
      .pipe(
        Effect.mapError(
          (cause) =>
            new OrchestratorDispatchError({
              commandId: command.commandId,
              commandType: command.type,
              cause,
            }),
        ),
      );

    const capabilities = yield* adapter.getCapabilities().pipe(
      Effect.mapError(
        (cause) =>
          new OrchestratorProviderAdapterError({
            commandId: command.commandId,
            providerInstanceId: modelSelection.instanceId,
            cause,
          }),
      ),
    );
    const sourceRunsAfterFork =
      sourceProjection === null
        ? []
        : sourceProjection.runs.filter(
            (candidate) => sourceRun === null || candidate.ordinal > sourceRun.ordinal,
          );
    const forkExecution =
      pendingForkTransfer === undefined || sourceRun === null
        ? null
        : yield* mapDispatchError(command)(
            commandPolicy.decideForkExecution({
              commandId: command.commandId,
              threadId: command.threadId,
              providerInstanceId: modelSelection.instanceId,
              capabilities,
              sameProvider:
                pendingForkTransfer.sourceProviderInstanceId === modelSelection.instanceId,
              hasStrongNativeSource: sourceProviderThread?.nativeThreadRef?.strength === "strong",
              hasNativeTurnBoundary:
                sourceProjection?.providerTurns.find((turn) => turn.id === sourceProviderTurnId)
                  ?.nativeTurnRef != null,
              sourceRunStatus: sourceRun.status,
              fromSpecificTurn: sourceRun !== null,
              sourceBusy: sourceRunsAfterFork.some(isActiveRun),
            }),
          );
    const canResolveForkNatively = forkExecution === "native_fork";
    const requiresPortableFork = forkExecution === "portable_context";

    if (canResolveForkNatively) {
      yield* mapDispatchError(command)(
        commandPolicy.ensureNativeFork({
          commandId: command.commandId,
          threadId: command.threadId,
          providerInstanceId: modelSelection.instanceId,
          capabilities,
          fromSpecificTurn: sourceRun !== null,
        }),
      );
    }

    const ensuredProviderThread: OrchestrationV2ProviderThread =
      targetProviderThread === undefined
        ? {
            id: idAllocator.derive.providerThread({
              driver: adapter.driver,
              nativeThreadId: `pending:${runId}`,
            }),
            driver: adapter.driver,
            providerInstanceId: modelSelection.instanceId,
            providerSessionId,
            appThreadId: command.threadId,
            ownerNodeId: null,
            nativeThreadRef: null,
            nativeConversationHeadRef: null,
            status: "not_loaded",
            firstRunOrdinal: ordinal,
            lastRunOrdinal: ordinal,
            handoffIds: [],
            forkedFrom:
              canResolveForkNatively && sourceProviderThread !== undefined
                ? {
                    providerThreadId: sourceProviderThread.id,
                    ...(sourceProviderTurnId === undefined
                      ? {}
                      : { providerTurnId: sourceProviderTurnId }),
                  }
                : null,
            createdAt: now,
            updatedAt: now,
          }
        : {
            ...targetProviderThread,
            providerInstanceId: modelSelection.instanceId,
            providerSessionId,
            updatedAt: now,
          };
    const portableForkItems =
      !requiresPortableFork || sourceProjection === null || sourceRun === null
        ? []
        : yield* readForkHistoryItems(
            projectionStore,
            sourceProjection,
            sourceRun,
            projection.thread,
          ).pipe(
            Effect.mapError(
              (cause) =>
                new OrchestratorProjectionError({ threadId: sourceProjection.thread.id, cause }),
            ),
          );
    const portableForkHandoff =
      !requiresPortableFork ||
      pendingForkTransfer === undefined ||
      sourceProjection === null ||
      sourceRun === null
        ? null
        : yield* contextHandoffService
            .prepareProviderHandoff({
              threadId: command.threadId,
              sourceThreadId: sourceProjection.thread.id,
              targetRunId: runId,
              transferId: pendingForkTransfer.id,
              fromProviderThreadIds:
                sourceProviderThread === undefined ? [] : [sourceProviderThread.id],
              toProviderThreadId: ensuredProviderThread.id,
              fromProviderInstanceId: sourceRun.providerInstanceId,
              toProviderInstanceId: modelSelection.instanceId,
              coveredRunOrdinals: visibleDeltaRunOrdinals(sourceProjection, portableForkItems),
              strategy: "full_thread_summary",
              items: portableForkItems,
              runs: sourceProjection.runs,
              createdAt: now,
            })
            .pipe(
              Effect.mapError(
                (cause) =>
                  new OrchestratorDispatchError({
                    commandId: command.commandId,
                    commandType: command.type,
                    cause,
                  }),
              ),
            );
    // Without a source run the digest covers the parent's whole history: inherited fork rows
    // first, so the cap truncates them first, then imported and run items.
    const sideChatParentRunIds = [
      // Queued messages have not reached the main thread yet.
      ...sourceRunsAfterFork.filter((run) => run.status !== "queued").map((run) => run.id),
      ...(sourceRun === null && sourceProjection?.thread.historyOrigin === "v1_import"
        ? [null]
        : []),
    ];
    const sideChatParentItems =
      !sideChatFork || sourceProjection === null
        ? []
        : [
            ...(sideChatWithoutSource ? yield* readInheritedItems(sourceProjection.thread) : []),
            ...(sideChatParentRunIds.length === 0
              ? []
              : visibleConversationItems(
                  sourceProjection,
                  yield* readHandoffItems(sourceProjection.thread.id, sideChatParentRunIds),
                )),
          ];
    // The framing note goes in even when the parent has no activity after the fork point.
    const sideChatContextHandoff =
      !sideChatFork || pendingForkTransfer === undefined || sourceProjection === null
        ? null
        : yield* contextHandoffService
            .prepareSideChatContext({
              threadId: command.threadId,
              parentThreadId: sourceProjection.thread.id,
              targetRunId: runId,
              transferId: pendingForkTransfer.id,
              toProviderThreadId: ensuredProviderThread.id,
              fromProviderInstanceId:
                pendingForkTransfer.sourceProviderInstanceId ?? modelSelection.instanceId,
              toProviderInstanceId: modelSelection.instanceId,
              coveredRunOrdinals: visibleDeltaRunOrdinals(sourceProjection, sideChatParentItems),
              parentItems: sideChatParentItems,
              createdAt: now,
            })
            .pipe(mapDispatchError(command));
    const requiresFullProviderSwitchContext =
      isProviderSwitch && pendingMergeBackTransfer !== undefined;
    const targetLastCompletedRun =
      targetProviderThread === undefined
        ? undefined
        : lastDeliveredRunForProviderThread(projection, targetProviderThread.id);
    const providerSwitchCoveredRuns =
      !isProviderSwitch || canResumeAcrossInstances || latestHandoffRun === undefined
        ? []
        : projection.runs.filter(
            (run) =>
              isHandoffSourceRun(run) &&
              run.ordinal >= contextBoundary &&
              run.ordinal >
                (requiresFullProviderSwitchContext ? 0 : (targetLastCompletedRun?.ordinal ?? 0)) &&
              run.ordinal <= latestHandoffRun.ordinal,
          );
    const providerSwitchNeedsFullContext =
      targetProviderThread === undefined ||
      targetProviderThread.nativeThreadRef === null ||
      requiresFullProviderSwitchContext;
    const providerSwitchItems =
      providerSwitchCoveredRuns.length === 0
        ? []
        : [
            ...(providerSwitchNeedsFullContext && contextBoundary === 0
              ? yield* readInheritedItems(projection.thread)
              : []),
            ...(latestCompletedRun !== undefined && providerSwitchNeedsFullContext
              ? legacyImportItems
              : []),
            ...(yield* readHandoffItems(
              command.threadId,
              providerSwitchCoveredRuns.map((run) => run.id),
            )),
          ];
    const providerSwitchTransferId =
      providerSwitchCoveredRuns.length === 0 || latestHandoffRun === undefined
        ? null
        : yield* mapDispatchError(command)(
            idAllocator.allocate.contextTransfer({
              sourceThreadId: command.threadId,
              targetThreadId: command.threadId,
              type: "provider_handoff",
            }),
          );
    if (providerSwitchTransferId !== null) {
      yield* mapDispatchError(command)(
        commandPolicy.ensureContextHandoff({
          commandId: command.commandId,
          threadId: command.threadId,
          providerInstanceId: modelSelection.instanceId,
          capabilities,
          strategy: providerSwitchNeedsFullContext ? "full_thread_summary" : "delta_context",
        }),
      );
    }
    const providerSwitchHandoff =
      providerSwitchTransferId === null || latestHandoffRun === undefined
        ? null
        : yield* contextHandoffService
            .prepareProviderHandoff({
              threadId: command.threadId,
              targetRunId: runId,
              transferId: providerSwitchTransferId,
              fromProviderThreadIds: Array.from(
                new Set(
                  providerSwitchCoveredRuns.flatMap((run) =>
                    run.providerThreadId === null ? [] : [run.providerThreadId],
                  ),
                ),
              ),
              toProviderThreadId: ensuredProviderThread.id,
              fromProviderInstanceId: latestHandoffRun.providerInstanceId,
              toProviderInstanceId: modelSelection.instanceId,
              coveredRunOrdinals: {
                from: providerSwitchCoveredRuns[0]!.ordinal,
                to: providerSwitchCoveredRuns.at(-1)!.ordinal,
              },
              strategy: providerSwitchNeedsFullContext
                ? "full_thread_summary"
                : "delta_since_target_last_seen",
              items: providerSwitchItems,
              runs: projection.runs,
              createdAt: now,
            })
            .pipe(
              Effect.mapError(
                (cause) =>
                  new OrchestratorDispatchError({
                    commandId: command.commandId,
                    commandType: command.type,
                    cause,
                  }),
              ),
            );
    const legacyImportRecoveryHandoff =
      isProviderSwitch &&
      !canResumeAcrossInstances &&
      ensuredProviderThread.nativeThreadRef === null &&
      latestCompletedRun === undefined &&
      legacyImportItems.length > 0
        ? yield* contextHandoffService
            .prepareLegacyImport({
              threadId: command.threadId,
              targetRunId: runId,
              toProviderThreadId: ensuredProviderThread.id,
              toProviderInstanceId: modelSelection.instanceId,
              items: legacyImportItems,
              createdAt: now,
            })
            .pipe(mapDispatchError(command))
        : null;
    const providerThread: OrchestrationV2ProviderThread = {
      ...ensuredProviderThread,
      status: ensuredProviderThread.status === "error" ? "error" : "active",
      firstRunOrdinal: ensuredProviderThread.firstRunOrdinal ?? ordinal,
      lastRunOrdinal: ordinal,
      handoffIds: [
        ...ensuredProviderThread.handoffIds,
        ...[
          portableForkHandoff,
          sideChatContextHandoff,
          providerSwitchHandoff,
          legacyImportRecoveryHandoff,
        ].flatMap((handoff) => (handoff === null ? [] : [handoff.id])),
      ],
      updatedAt: now,
    };

    const attemptId = idAllocator.derive.runAttempt({ runId, attemptOrdinal: 1 });
    const rootNodeId = idAllocator.derive.rootNode({ runId });
    const emitEvent = emit(events, command);
    const mergeBackSourceProjection =
      pendingMergeBackTransfer === undefined
        ? null
        : yield* projectionStore
            .getThreadRecords(pendingMergeBackTransfer.sourceThreadId, [
              "runs",
              "attempts",
              "providerThreads",
              "providerTurns",
            ])
            .pipe(
              Effect.mapError(
                (cause) =>
                  new OrchestratorProjectionError({
                    threadId: pendingMergeBackTransfer.sourceThreadId,
                    cause,
                  }),
              ),
            );
    const mergeBackSourceRun =
      pendingMergeBackTransfer?.sourcePoint.runId === undefined ||
      mergeBackSourceProjection === null
        ? null
        : (mergeBackSourceProjection.runs.find(
            (candidate) => candidate.id === pendingMergeBackTransfer.sourcePoint.runId,
          ) ?? null);
    if (pendingMergeBackTransfer !== undefined && mergeBackSourceRun === null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Pending merge-back transfer ${pendingMergeBackTransfer.id} has no resolvable source run.`,
      });
    }
    const mergeBackSourceProviderThread =
      mergeBackSourceProjection === null || mergeBackSourceRun === null
        ? undefined
        : providerThreadForRun(mergeBackSourceProjection, mergeBackSourceRun);
    if (pendingMergeBackTransfer !== undefined && mergeBackSourceProviderThread === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Pending merge-back transfer ${pendingMergeBackTransfer.id} has no resolvable source provider thread.`,
      });
    }
    if (pendingMergeBackTransfer !== undefined) {
      yield* mapDispatchError(command)(
        commandPolicy.ensureContextHandoff({
          commandId: command.commandId,
          threadId: command.threadId,
          providerInstanceId: modelSelection.instanceId,
          capabilities,
          strategy: "fork_delta_context",
        }),
      );
    }
    const mergeBackDeltaItems =
      mergeBackSourceProjection === null || mergeBackSourceRun === null
        ? []
        : yield* Effect.gen(function* () {
            const sourceRuns = mergeBackSourceProjection.runs.filter(
              (run) => run.ordinal <= mergeBackSourceRun.ordinal,
            );
            const rawItems = yield* readHandoffItems(
              mergeBackSourceProjection.thread.id,
              sourceRuns.map((run) => run.id),
            );
            const { turnItems } = turnItemsSinceContextBoundary({
              runs: sourceRuns,
              turnItems: rawItems,
            });
            return visibleConversationItems(mergeBackSourceProjection, turnItems);
          });
    const mergeBackHandoff =
      pendingMergeBackTransfer === undefined ||
      mergeBackSourceProjection === null ||
      mergeBackSourceRun === null ||
      mergeBackSourceProviderThread === undefined
        ? null
        : yield* contextHandoffService
            .prepareForkDelta({
              sourceThreadId: pendingMergeBackTransfer.sourceThreadId,
              targetThreadId: command.threadId,
              targetRunId: runId,
              transferId: pendingMergeBackTransfer.id,
              fromProviderThreadIds: [mergeBackSourceProviderThread.id],
              toProviderThreadId: providerThread.id,
              fromProviderInstanceId: mergeBackSourceRun.providerInstanceId,
              toProviderInstanceId: modelSelection.instanceId,
              coveredRunOrdinals: visibleDeltaRunOrdinals(
                mergeBackSourceProjection,
                mergeBackDeltaItems,
              ),
              deltaItems: mergeBackDeltaItems,
              createdAt: now,
            })
            .pipe(
              Effect.mapError(
                (cause) =>
                  new OrchestratorDispatchError({
                    commandId: command.commandId,
                    commandType: command.type,
                    cause,
                  }),
              ),
            );
    const checkpointScope = yield* checkpointService
      .prepareRootRunScope({
        threadId: command.threadId,
        runId,
        rootNodeId,
        providerThreadId: providerThread.id,
        cwd:
          resolvedRuntimePolicy.cwd ??
          existingProviderSession?.cwd ??
          projection.thread.worktreePath ??
          process.cwd(),
        createdAt: now,
      })
      .pipe(
        Effect.mapError(
          (cause) =>
            new OrchestratorDispatchError({
              commandId: command.commandId,
              commandType: command.type,
              cause,
            }),
        ),
      );
    const run: OrchestrationV2Run = {
      id: runId,
      threadId: command.threadId,
      ordinal,
      providerInstanceId: modelSelection.instanceId,
      modelSelection,
      providerThreadId: providerThread.id,
      userMessageId: command.messageId,
      rootNodeId,
      activeAttemptId: attemptId,
      status: "starting",
      queuePosition: null,
      requestedAt: now,
      startedAt: null,
      completedAt: null,
      checkpointId: null,
      contextHandoffId:
        portableForkHandoff?.id ??
        providerSwitchHandoff?.id ??
        mergeBackHandoff?.id ??
        legacyImportRecoveryHandoff?.id ??
        null,
      ...(command.sourcePlanRef === undefined ? {} : { sourcePlanRef: command.sourcePlanRef }),
      ...(command.restartContinuationOfRunId === undefined
        ? {}
        : { restartContinuationOfRunId: command.restartContinuationOfRunId }),
      ...(command.manualContinuationOfRunId === undefined
        ? {}
        : { manualContinuationOfRunId: command.manualContinuationOfRunId }),
      ...(command.usageLimitContinuationOfRunId === undefined
        ? {}
        : { usageLimitContinuationOfRunId: command.usageLimitContinuationOfRunId }),
      ...(continuedTaskId === undefined ? {} : { delegatedTaskId: continuedTaskId }),
      ...wakeWorkStartedAt(projection, command),
      ...output,
    };
    const attempt: OrchestrationV2RunAttempt = {
      id: attemptId,
      runId,
      attemptOrdinal: 1,
      rootNodeId,
      providerInstanceId: modelSelection.instanceId,
      providerThreadId: providerThread.id,
      providerTurnId: null,
      reason: "initial",
      status: "pending",
      startedAt: null,
      completedAt: null,
    };
    const rootNode: OrchestrationV2ExecutionNode = {
      id: rootNodeId,
      threadId: command.threadId,
      runId,
      parentNodeId: null,
      rootNodeId,
      kind: "root_turn",
      status: "pending",
      countsForRun: true,
      providerThreadId: providerThread.id,
      providerTurnId: null,
      nativeItemRef: null,
      runtimeRequestId: null,
      checkpointScopeId: checkpointScope.id,
      startedAt: null,
      completedAt: null,
    };
    const message: OrchestrationV2ConversationMessage = {
      createdBy: command.createdBy,
      creationSource: command.creationSource,
      ...(command.scheduledTaskId === undefined
        ? {}
        : { scheduledTaskId: command.scheduledTaskId }),
      ...(command.senderThreadId === undefined ? {} : { senderThreadId: command.senderThreadId }),
      ...(command.linkedSender === undefined ? {} : { linkedSender: command.linkedSender }),
      ...(command.idleCompaction === undefined ? {} : { idleCompaction: command.idleCompaction }),
      id: command.messageId,
      threadId: command.threadId,
      runId,
      nodeId: rootNodeId,
      role: "user",
      text: dispatchText,
      ...(command.context ? { context: command.context } : {}),
      attachments: command.attachments,
      streaming: false,
      createdAt: now,
      updatedAt: now,
      ...(delegatedCompletion === undefined ? {} : { delegatedCompletion }),
      ...(notification === undefined ? {} : { notification }),
    };
    const turnItem: OrchestrationV2TurnItem = {
      createdBy: command.createdBy,
      creationSource: command.creationSource,
      ...(command.scheduledTaskId === undefined
        ? {}
        : { scheduledTaskId: command.scheduledTaskId }),
      ...(command.senderThreadId === undefined ? {} : { senderThreadId: command.senderThreadId }),
      ...(command.linkedSender === undefined ? {} : { linkedSender: command.linkedSender }),
      ...(command.idleCompaction === undefined ? {} : { idleCompaction: command.idleCompaction }),
      id: idAllocator.derive.userTurnItem({ messageId: command.messageId }),
      threadId: command.threadId,
      runId,
      nodeId: rootNodeId,
      providerThreadId: providerThread.id,
      providerTurnId: null,
      nativeItemRef: null,
      parentItemId: null,
      ordinal: ordinal * 100,
      status: "completed",
      title: null,
      startedAt: now,
      completedAt: now,
      updatedAt: now,
      type: "user_message",
      messageId: command.messageId,
      inputIntent: "turn_start",
      text: dispatchText,
      ...(command.context ? { context: command.context } : {}),
      attachments: command.attachments,
      ...(run.contextHandoffId === null
        ? modelSwitchSince(
            projection,
            modelSelection,
            // Side chats do not show the parent's runs.
            sideChatFork ? undefined : sourceRun?.modelSelection,
          )
        : {}),
    };
    // A side chat's "Context from" divider already marks its copied context.
    const activeHandoff =
      (sideChatFork ? null : portableForkHandoff) ?? mergeBackHandoff ?? providerSwitchHandoff;
    const handoffSourceRuns =
      portableForkHandoff !== null
        ? sourceRun === null
          ? []
          : [sourceRun]
        : providerSwitchHandoff === null
          ? mergeBackSourceRun === null
            ? []
            : [mergeBackSourceRun]
          : providerSwitchCoveredRuns;
    const handoffFromModelSelections = Array.from(
      new Map(
        handoffSourceRuns.map((run) => [
          `${run.modelSelection.instanceId}\0${run.modelSelection.model}`,
          run.modelSelection,
        ]),
      ).values(),
    );
    const handoffTurnItem: OrchestrationV2TurnItem | null =
      activeHandoff === null
        ? null
        : {
            id: idAllocator.derive.runSignalTurnItem({
              runId,
              signal: `context-handoff:${activeHandoff.id}`,
            }),
            threadId: command.threadId,
            runId,
            nodeId: rootNodeId,
            providerThreadId: providerThread.id,
            providerTurnId: null,
            nativeItemRef: null,
            parentItemId: null,
            ordinal: ordinal * 100 - 1,
            status: "completed",
            title:
              portableForkHandoff !== null
                ? "Fork context"
                : providerSwitchHandoff !== null
                  ? "Provider handoff"
                  : "Merge-back context",
            startedAt: now,
            completedAt: now,
            updatedAt: now,
            type: "handoff",
            contextHandoffId: activeHandoff.id,
            fromProviderThreadIds: activeHandoff.fromProviderThreadIds,
            toProviderThreadId: activeHandoff.toProviderThreadId,
            fromProviderInstanceIds: Array.from(
              new Set(handoffSourceRuns.map((run) => run.providerInstanceId)),
            ),
            toProviderInstanceId: modelSelection.instanceId,
            fromModelSelections: handoffFromModelSelections,
            toModel: modelSelection.model,
            strategy: activeHandoff.strategy,
            summary: activeHandoff.summaryText,
          };
    const nativeForkResolution: OrchestrationV2ContextTransferResolution | null =
      !canResolveForkNatively || providerThread.nativeThreadRef === null
        ? null
        : {
            strategy: "native_fork",
            providerThreadRef: providerThread.nativeThreadRef,
          };
    const portableForkContext =
      portableForkHandoff ?? (sideChatWithoutSource ? sideChatContextHandoff : null);
    const portableForkResolution: OrchestrationV2ContextTransferResolution | null =
      pendingForkTransfer === undefined || portableForkContext === null
        ? null
        : {
            strategy: "portable_context",
            contextHandoffId: portableForkContext.id,
          };
    const mergeBackResolution: OrchestrationV2ContextTransferResolution | null =
      pendingMergeBackTransfer === undefined || mergeBackHandoff === null
        ? null
        : {
            strategy: "fork_delta_context",
            contextHandoffId: mergeBackHandoff.id,
          };

    if (pendingForkTransfer !== undefined && canResolveForkNatively) {
      yield* emitEvent({
        type: "context-transfer.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: {
          ...pendingForkTransfer,
          targetProviderInstanceId: modelSelection.instanceId,
          targetRunId: runId,
          status: "pending",
          resolution: null,
          error: null,
          updatedAt: now,
        },
      });
    }
    if (pendingForkTransfer !== undefined && portableForkResolution !== null) {
      yield* emitEvent({
        type: "context-transfer.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: {
          ...pendingForkTransfer,
          targetProviderInstanceId: modelSelection.instanceId,
          targetRunId: runId,
          status: "resolved_portable",
          resolution: portableForkResolution,
          error: null,
          updatedAt: now,
        },
      });
    }
    yield* emitEvent({
      type: "provider-thread.updated",
      threadId: command.threadId,
      providerInstanceId: modelSelection.instanceId,
      occurredAt: now,
      payload: providerThread,
    });
    if (portableForkHandoff !== null) {
      yield* emitEvent({
        type: "context-handoff.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: portableForkHandoff,
      });
    }
    if (sideChatContextHandoff !== null) {
      yield* emitEvent({
        type: "context-handoff.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: sideChatContextHandoff,
      });
    }
    if (legacyImportRecoveryHandoff !== null) {
      yield* emitEvent({
        type: "context-handoff.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: legacyImportRecoveryHandoff,
      });
    }
    if (
      providerSwitchTransferId !== null &&
      providerSwitchHandoff !== null &&
      latestHandoffRun !== undefined
    ) {
      const transfer: OrchestrationV2ContextTransfer = {
        id: providerSwitchTransferId,
        type: "provider_handoff",
        sourceThreadId: command.threadId,
        targetThreadId: command.threadId,
        sourcePoint: contextSourcePointForRun(projection, latestHandoffRun),
        basePoint:
          requiresFullProviderSwitchContext || targetLastCompletedRun === undefined
            ? null
            : contextSourcePointForRun(projection, targetLastCompletedRun),
        sourceProviderInstanceId: latestHandoffRun.providerInstanceId,
        targetProviderInstanceId: modelSelection.instanceId,
        targetRunId: runId,
        status: "consumed",
        resolution: {
          strategy:
            providerSwitchHandoff.strategy === "full_thread_summary"
              ? "portable_context"
              : "delta_context",
          contextHandoffId: providerSwitchHandoff.id,
        },
        createdBy: command.createdBy,
        error: null,
        createdAt: now,
        updatedAt: now,
        consumedAt: now,
      };
      yield* emitEvent({
        type: "context-transfer.created",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: transfer,
      });
      yield* emitEvent({
        type: "context-handoff.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: providerSwitchHandoff,
      });
    }
    if (mergeBackHandoff !== null) {
      yield* emitEvent({
        type: "context-handoff.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: mergeBackHandoff,
      });
    }
    for (const supersededTransfer of supersededMergeBackTransfers) {
      yield* emitEvent({
        type: "context-transfer.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: {
          ...supersededTransfer,
          status: "superseded",
          error:
            pendingMergeBackTransfer === undefined
              ? "Superseded while consuming merge-back transfer."
              : `Superseded by merge-back transfer ${pendingMergeBackTransfer.id}.`,
          updatedAt: now,
        },
      });
    }
    if (pendingMergeBackTransfer !== undefined && mergeBackResolution !== null) {
      yield* emitEvent({
        type: "context-transfer.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: {
          ...pendingMergeBackTransfer,
          targetProviderInstanceId: modelSelection.instanceId,
          targetRunId: runId,
          status: "consumed",
          resolution: mergeBackResolution,
          error: null,
          updatedAt: now,
          consumedAt: now,
        },
      });
    }
    yield* emitEvent({
      type: "run.created",
      threadId: command.threadId,
      runId,
      nodeId: rootNodeId,
      providerInstanceId: modelSelection.instanceId,
      occurredAt: now,
      payload: run,
    });
    yield* completeSourcePlan(now);
    yield* emitEvent({
      type: "run-attempt.created",
      threadId: command.threadId,
      runId,
      nodeId: rootNodeId,
      providerInstanceId: modelSelection.instanceId,
      occurredAt: now,
      payload: attempt,
    });
    yield* emitEvent({
      type: "node.updated",
      threadId: command.threadId,
      runId,
      nodeId: rootNodeId,
      providerInstanceId: modelSelection.instanceId,
      occurredAt: now,
      payload: rootNode,
    });
    yield* emitEvent({
      type: "checkpoint-scope.created",
      threadId: command.threadId,
      runId,
      nodeId: rootNodeId,
      providerInstanceId: modelSelection.instanceId,
      occurredAt: now,
      payload: checkpointScope,
    });
    if (handoffTurnItem !== null) {
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        runId,
        nodeId: rootNodeId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: handoffTurnItem,
      });
    }
    yield* emitEvent({
      type: "message.updated",
      threadId: command.threadId,
      runId,
      nodeId: rootNodeId,
      providerInstanceId: modelSelection.instanceId,
      occurredAt: now,
      payload: message,
    });
    yield* emitEvent({
      type: "turn-item.updated",
      threadId: command.threadId,
      runId,
      nodeId: rootNodeId,
      providerInstanceId: modelSelection.instanceId,
      occurredAt: now,
      payload: notificationTurnItem(
        turnItem,
        message,
        yield* notificationTasks(command.threadId, message, projection.subagents),
      ),
    });
    const forkResolution = nativeForkResolution ?? portableForkResolution;
    if (pendingForkTransfer !== undefined && forkResolution !== null) {
      yield* emitEvent({
        type: "context-transfer.updated",
        threadId: command.threadId,
        runId,
        providerInstanceId: modelSelection.instanceId,
        occurredAt: now,
        payload: {
          ...pendingForkTransfer,
          targetProviderInstanceId: modelSelection.instanceId,
          targetRunId: runId,
          status: "consumed",
          resolution: forkResolution,
          error: null,
          updatedAt: now,
          consumedAt: now,
        },
      });
    }

    const detachDetail = canResumeAcrossInstances
      ? "Provider account changed; continuing the native thread."
      : "Provider or model selection changed.";
    for (const session of sessionsToDetach) {
      yield* emitEvent({
        type: "provider-session.detached",
        threadId: command.threadId,
        driver: session.driver,
        providerInstanceId: session.providerInstanceId,
        occurredAt: now,
        payload: {
          providerSessionId: session.id,
          detachedAt: now,
          reason: detachDetail,
        },
      });
      yield* Ref.update(effects, (existing) => [
        ...existing,
        {
          id: `effect:${command.commandId}:provider-session.detach:${session.id}`,
          commandId: command.commandId,
          threadId: command.threadId,
          request: {
            type: "provider-session.detach",
            providerSessionId: session.id,
            detail: detachDetail,
          },
        } satisfies PendingOrchestrationEffectV2,
      ]);
    }
    const pendingEffect = {
      id: `effect:${command.commandId}:provider-turn.start:${runId}`,
      commandId: command.commandId,
      threadId: command.threadId,
      request: { type: "provider-turn.start", runId },
    } satisfies PendingOrchestrationEffectV2;
    yield* Ref.update(effects, (existing) => [...existing, pendingEffect]);
  });
