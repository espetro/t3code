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

export const bindStartNextQueuedRunOnce = (ctx: any) => {
  const { failQueuedRunStart } = pickScriptcBindCtx(ctx);
  return Effect.fn("Orchestrator.startNextQueuedRun")(
    function* (
      threadId: ThreadId,
      options?: {
        readonly failedRunId?: RunId;
        readonly endedRunId?: RunId;
        readonly queuedRunId?: RunId;
        /** Treat the latest executed run as the one that just ended, as its run-end handler would. */
        readonly latestRunEnded?: boolean;
        readonly userStarted?: boolean;
      },
    ) {
      const {
        FRESH_CONTEXT_DETACH_REASON,
        OrchestratorDispatchError,
        OrchestratorProjectionError,
        appendContextHandoffId,
        cancelStaleQuestionWakes,
        checkpointService,
        commandPolicy,
        contextHandoffService,
        contextSourcePointForRun,
        currentPullRequestWatchWake,
        dispatchProviderThread,
        ensureGoalCommandSupported,
        failQueuedRunStart,
        followsCurrentConversation,
        forkTransferSupersededEvent,
        idAllocator,
        isHandoffSourceRun,
        isStalePullRequestWatchWake,
        lastDeliveredRunForProviderThread,
        nextQueuedRun,
        nextRunOrdinal,
        notificationTasks,
        pendingForkTransferForThread,
        projectionStore,
        providerAdapters,
        providerSessionIdFor,
        providerSwitchService,
        providerThreadPredatesBoundary,
        queuedRunCancellationEvents,
        queuedRunModelSelection,
        readCommandProjection,
        readHandoffItems,
        readInheritedItems,
        rootProviderThreadsForProvider,
        runtimeModeCeiling,
        runtimePolicy,
        serverSettings,
        sessionHasBackgroundWork,
        sessionsReleasedByFreshContext,
        uniqueSessions,
        usageLimitHoldsQueue,
        wakeWorkStartedAt,
        writeSystemEvents,
      } = pickScriptcBindCtx(ctx);

      if (!(yield* projectionStore.canStartQueuedRun(threadId))) return;
      let projection = yield* readCommandProjection(threadId);
      if (
        projection.thread.archivedAt !== null ||
        projection.thread.deletedAt !== null ||
        projection.runs.some(isActiveRun)
      ) {
        return;
      }

      if (yield* cancelStaleQuestionWakes(projection)) {
        projection = yield* readCommandProjection(threadId);
      }
      let storedQueuedRun =
        options?.queuedRunId === undefined
          ? nextQueuedRun(projection)
          : projection.runs.find(
              (run) => run.id === options.queuedRunId && run.status === "queued",
            );
      while (
        storedQueuedRun !== undefined &&
        isStalePullRequestWatchWake(projection, storedQueuedRun)
      ) {
        yield* writeSystemEvents(
          queuedRunCancellationEvents(projection, storedQueuedRun, yield* DateTime.now),
        );
        projection = yield* readCommandProjection(threadId);
        storedQueuedRun = nextQueuedRun(projection);
      }
      // A wake that outlived some of its pull requests tells only the current ones.
      const currentWake =
        storedQueuedRun === undefined
          ? undefined
          : currentPullRequestWatchWake(projection, storedQueuedRun);
      if (storedQueuedRun !== undefined && currentWake !== undefined) {
        const now = yield* DateTime.now;
        yield* writeSystemEvents([
          {
            type: "message.updated",
            threadId,
            runId: storedQueuedRun.id,
            ...(storedQueuedRun.rootNodeId === null ? {} : { nodeId: storedQueuedRun.rootNodeId }),
            providerInstanceId: storedQueuedRun.providerInstanceId,
            occurredAt: now,
            payload: { ...currentWake, updatedAt: now },
          },
        ]);
        const runId = storedQueuedRun.id;
        projection = yield* readCommandProjection(threadId);
        storedQueuedRun = projection.runs.find((run) => run.id === runId);
      }
      if (storedQueuedRun === undefined) {
        return;
      }
      const queuedMessage = projection.messages.find(
        (candidate) => candidate.id === storedQueuedRun.userMessageId,
      );
      const modelSelection = queuedRunModelSelection(projection, storedQueuedRun);
      const queuedRun = {
        ...storedQueuedRun,
        modelSelection,
        providerInstanceId: modelSelection.instanceId,
      };
      // A limited provider would fail and consume every waiting message.
      if (
        usageLimitHoldsQueue(
          projection,
          queuedRun.providerInstanceId,
          options?.userStarted === true ? undefined : yield* DateTime.now,
        )
      ) {
        return;
      }
      // Waits without a hold: lowering the thread's mode starts the queue again.
      if (isRuntimeModeAbove(projection.thread.runtimeMode, runtimeModeCeiling?.maxRuntimeMode)) {
        return;
      }
      // Failed worktree creation would run queued work in the project checkout; wait for the user.
      const failedRun = latestExecutedRun(projection.runs);
      const endedRunId = options?.latestRunEnded === true ? failedRun?.id : options?.endedRunId;
      const failedRunId =
        options?.latestRunEnded === true && failedRun?.status === "failed"
          ? failedRun.id
          : options?.failedRunId;
      const failureClass =
        failedRun && failedRunId !== undefined && failedRun.id === failedRunId
          ? latestRootProviderFailure(failedRun, projection.turnItems)?.class
          : undefined;
      const worktreeMissing =
        endedRunId !== undefined &&
        failedRun?.id === endedRunId &&
        failedRun.startedAt === null &&
        failedRun.workspacePreparation?.type === "worktree" &&
        projection.thread.worktreePath === null;
      const settings = yield* serverSettings.getSettings.pipe(Effect.orDie);
      const projectOverride =
        settings.projectSettingsOverrides[projection.thread.projectId]?.providerInstances?.[
          queuedRun.providerInstanceId
        ]?.enabled;
      const machineInstance = Object.hasOwn(
        settings.providerInstances,
        queuedRun.providerInstanceId,
      )
        ? settings.providerInstances[queuedRun.providerInstanceId]
        : undefined;
      const instanceDisabledForProject =
        projectOverride !== undefined
          ? !projectOverride
          : machineInstance !== undefined && !resolveProviderInstanceEnabled(machineInstance);
      const providerFailed =
        failureClass !== undefined &&
        failureClass !== "validation_error" &&
        failedRun?.providerInstanceId === queuedRun.providerInstanceId;
      if (worktreeMissing || instanceDisabledForProject || providerFailed) {
        // A buffered wake prompts nothing: it replays output the CLI already produced.
        const wakes =
          worktreeMissing || instanceDisabledForProject
            ? []
            : queuedRunsInDeliveryOrder(projection).filter((run) => {
                const message = projection.messages.find(
                  (candidate) => candidate.id === run.userMessageId,
                );
                return (
                  run.queueHeld !== true &&
                  message !== undefined &&
                  isBufferedProviderNotification(message)
                );
              });
        const now = yield* DateTime.now;
        yield* writeSystemEvents(
          projection.runs
            .filter((run) => run.status === "queued" && !wakes.some((wake) => wake.id === run.id))
            .map((run) => ({
              type: "run.updated" as const,
              threadId,
              runId: run.id,
              providerInstanceId: run.providerInstanceId,
              occurredAt: now,
              payload: { ...run, queueHeld: true },
            })),
        );
        return wakes.length > 0;
      }
      // Move queued ordinals after runs that started while they waited to preserve transcript and checkpoint order.
      // Started runs have prompts; cancelled queued messages do not.
      const newerRunIds = projection.runs
        .filter((run) => run.status !== "queued" && run.ordinal > queuedRun.ordinal)
        .map((run) => run.id);
      const startedAhead =
        newerRunIds.length > 0 &&
        (yield* projectionStore.getThreadRecords(threadId, ["turnItems"], {
          turnItemTypes: ["user_message", "notification"],
          turnItemRunIds: newerRunIds,
        })).turnItems.length > 0;
      const ordinal = startedAhead ? nextRunOrdinal(projection) : queuedRun.ordinal;
      const commandId = CommandId.make(`command:system:start-queued:${queuedRun.id}`);
      const rootNodeId = queuedRun.rootNodeId;
      const attemptId = queuedRun.activeAttemptId;
      const providerThreadId = queuedRun.providerThreadId;
      if (rootNodeId === null || attemptId === null || providerThreadId === null) {
        return yield* new OrchestratorDispatchError({
          commandId,
          commandType: "message.dispatch",
          cause: `Queued run ${queuedRun.id} is missing execution identity.`,
        });
      }

      const rootNode = projection.nodes.find((candidate) => candidate.id === rootNodeId);
      const attempt = projection.attempts.find((candidate) => candidate.id === attemptId);
      let legacyQueuedTurnItem:
        | Extract<OrchestrationV2TurnItem, { readonly type: "user_message" }>
        | undefined;
      for (const candidate of projection.turnItems) {
        if (
          candidate.type === "user_message" &&
          candidate.runId === queuedRun.id &&
          candidate.messageId === queuedRun.userMessageId
        ) {
          legacyQueuedTurnItem = candidate;
          break;
        }
      }
      const storedProviderThread = projection.providerThreads.find(
        (candidate) => candidate.id === providerThreadId,
      );
      const storedCheckpointScope = projection.checkpointScopes.find(
        (scope) => scope.id === rootNode?.checkpointScopeId,
      );
      if (
        rootNode === undefined ||
        attempt === undefined ||
        queuedMessage === undefined ||
        storedProviderThread === undefined ||
        (rootNode.checkpointScopeId !== null && storedCheckpointScope === undefined)
      ) {
        return yield* new OrchestratorDispatchError({
          commandId,
          commandType: "message.dispatch",
          cause: `Queued run ${queuedRun.id} is missing projection state.`,
        });
      }
      // A scheduled delivery starts on the thread's current pick, so /goal must suit that provider.
      yield* ensureGoalCommandSupported(
        { commandId, type: "message.dispatch" },
        queuedMessage,
        queuedRun.providerInstanceId,
      );

      const now = yield* DateTime.now;
      const targetAdapter = yield* providerAdapters.get(queuedRun.providerInstanceId).pipe(
        Effect.mapError(
          (cause) =>
            new OrchestratorDispatchError({
              commandId,
              commandType: "message.dispatch",
              cause,
            }),
        ),
      );
      const followsCurrent = followsCurrentConversation(queuedMessage);
      const freshContext = queuedRun.freshContext === true;
      // A scheduled fresh run is a side conversation, so it must not drop the fork's context.
      const supersededForkTransfer =
        freshContext && queuedMessage.scheduledTaskId === undefined
          ? pendingForkTransferForThread(projection)
          : undefined;
      const activeProviderThread = dispatchProviderThread(projection, queuedMessage, freshContext);
      const contextBoundary = freshContext ? ordinal : contextBoundaryOrdinal(projection);
      // A run queued before a fresh run started is bound to the conversation that run left behind.
      const followsLatestContext =
        !freshContext &&
        (followsCurrent ||
          storedProviderThread.providerInstanceId !== queuedRun.providerInstanceId ||
          providerThreadPredatesBoundary(storedProviderThread, contextBoundary));
      const targetProviderThread = followsLatestContext
        ? activeProviderThread?.providerInstanceId === queuedRun.providerInstanceId &&
          !providerThreadPredatesBoundary(activeProviderThread, contextBoundary)
          ? activeProviderThread
          : rootProviderThreadsForProvider(projection, queuedRun.providerInstanceId)[0]
        : freshContext &&
            // The reserved row belongs to the instance the run queued on, which may have changed.
            (storedProviderThread.providerInstanceId !== queuedRun.providerInstanceId ||
              storedProviderThread.firstRunOrdinal !== null ||
              storedProviderThread.nativeThreadRef !== null)
          ? undefined
          : storedProviderThread;
      const queuedProviderThread: OrchestrationV2ProviderThread = targetProviderThread ?? {
        id: idAllocator.derive.providerThread({
          driver: targetAdapter.driver,
          // The queue reserved `pending:<run>` for this run; another run may have taken it. An edit
          // that moved the run to another instance of the same driver must not replace that row.
          nativeThreadId: freshContext
            ? `pending:${queuedRun.id}:fresh`
            : storedProviderThread.providerInstanceId === queuedRun.providerInstanceId
              ? `pending:${queuedRun.id}`
              : `pending:${queuedRun.id}:${queuedRun.providerInstanceId}`,
        }),
        driver: targetAdapter.driver,
        providerInstanceId: queuedRun.providerInstanceId,
        providerSessionId: null,
        appThreadId: threadId,
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
      const selectionChanged = !modelSelectionsEqual(
        projection.thread.modelSelection,
        queuedRun.modelSelection,
      );
      // The picker may already have moved ahead of the native conversation.
      const switchFromActiveProvider =
        followsCurrent &&
        activeProviderThread !== undefined &&
        activeProviderThread.providerInstanceId !== queuedRun.providerInstanceId;
      const switchPlan =
        selectionChanged || switchFromActiveProvider
          ? yield* providerSwitchService
              .plan({
                projection: switchFromActiveProvider
                  ? {
                      ...projection,
                      thread: {
                        ...projection.thread,
                        modelSelection: {
                          ...projection.thread.modelSelection,
                          instanceId: activeProviderThread.providerInstanceId,
                        },
                      },
                    }
                  : projection,
                targetModelSelection: queuedRun.modelSelection,
              })
              .pipe(
                Effect.mapError(
                  (cause) =>
                    new OrchestratorDispatchError({
                      commandId,
                      commandType: "message.dispatch",
                      cause,
                    }),
                ),
              )
          : null;
      const releasableSessions = uniqueSessions([
        ...projection.providerSessions.filter(
          (session) =>
            switchPlan?.releaseProviderSessionIds.includes(session.id) &&
            session.status !== "stopped" &&
            session.status !== "error",
        ),
        ...(freshContext ? sessionsReleasedByFreshContext(projection, activeProviderThread) : []),
      ]);
      const busySessionIds = new Set<ProviderSessionId>();
      for (const session of releasableSessions) {
        if (yield* sessionHasBackgroundWork(session, projection.providerThreads)) {
          busySessionIds.add(session.id);
        }
      }
      // Nobody waits on a queued start to refuse it. A handoff runs in its own session, so a
      // busy one stays up; a restart resumes the busy session's native thread, so wait instead.
      // A fresh run resumes nothing, so it never waits.
      if (
        busySessionIds.size > 0 &&
        !freshContext &&
        switchPlan?.transition.type === "restart_and_resume"
      ) {
        yield* Effect.logInfo(
          "Holding the queue: the replaced provider session still runs background work",
          { threadId, runId: queuedRun.id, providerSessionIds: Array.from(busySessionIds) },
        );
        yield* writeSystemEvents(
          projection.runs
            .filter((run) => run.status === "queued")
            .map((run) => ({
              type: "run.updated" as const,
              threadId,
              runId: run.id,
              providerInstanceId: run.providerInstanceId,
              occurredAt: now,
              payload: { ...run, queueHeld: true },
            })),
        );
        return;
      }
      const sessionsToDetach = releasableSessions.filter(
        (session) => !busySessionIds.has(session.id),
      );
      const canResumeAcrossInstances =
        !freshContext &&
        switchPlan?.instanceChanged === true &&
        switchPlan.transition.type === "restart_and_resume" &&
        activeProviderThread !== undefined &&
        activeProviderThread.nativeThreadRef !== null;
      const deliveryProviderThread = canResumeAcrossInstances
        ? {
            ...queuedProviderThread,
            status: activeProviderThread.status,
            nativeThreadRef: activeProviderThread.nativeThreadRef,
            nativeConversationHeadRef: activeProviderThread.nativeConversationHeadRef,
            nativeMetadata: activeProviderThread.nativeMetadata,
          }
        : queuedProviderThread;
      const targetCapabilities = yield* targetAdapter.getCapabilities().pipe(
        Effect.mapError(
          (cause) =>
            new OrchestratorDispatchError({
              commandId,
              commandType: "message.dispatch",
              cause,
            }),
        ),
      );
      const latestCompletedRun = projection.runs.findLast((run) => run.status === "completed");
      const latestHandoffRun = projection.runs.findLast(isHandoffSourceRun);
      const targetLastCompletedRun = lastDeliveredRunForProviderThread(
        projection,
        queuedProviderThread.id,
      );
      const coveredRuns =
        freshContext ||
        canResumeAcrossInstances ||
        latestHandoffRun === undefined ||
        latestHandoffRun.providerInstanceId === queuedRun.providerInstanceId
          ? []
          : projection.runs.filter(
              (run) =>
                isHandoffSourceRun(run) &&
                run.ordinal >= contextBoundary &&
                run.ordinal > (targetLastCompletedRun?.ordinal ?? 0) &&
                run.ordinal <= latestHandoffRun.ordinal,
            );
      const needsFullContext = deliveryProviderThread.nativeThreadRef === null;
      const legacyImportItems =
        projection.thread.historyOrigin === "v1_import" && contextBoundary === 0
          ? yield* readHandoffItems(threadId, [null])
          : [];
      const handoffStrategy = needsFullContext
        ? ("full_thread_summary" as const)
        : ("delta_since_target_last_seen" as const);
      const transferId =
        coveredRuns.length === 0
          ? null
          : yield* idAllocator.allocate
              .contextTransfer({
                sourceThreadId: threadId,
                targetThreadId: threadId,
                type: "provider_handoff",
              })
              .pipe(
                Effect.mapError(
                  (cause) =>
                    new OrchestratorDispatchError({
                      commandId,
                      commandType: "message.dispatch",
                      cause,
                    }),
                ),
              );
      if (transferId !== null) {
        yield* commandPolicy.ensureContextHandoff({
          commandId,
          threadId,
          providerInstanceId: queuedRun.providerInstanceId,
          capabilities: targetCapabilities,
          strategy: needsFullContext ? "full_thread_summary" : "delta_context",
        });
      }
      const handoff =
        transferId === null || latestHandoffRun === undefined
          ? null
          : yield* contextHandoffService
              .prepareProviderHandoff({
                threadId,
                targetRunId: queuedRun.id,
                transferId,
                fromProviderThreadIds: Array.from(
                  new Set(
                    coveredRuns.flatMap((run) =>
                      run.providerThreadId === null ? [] : [run.providerThreadId],
                    ),
                  ),
                ),
                toProviderThreadId: queuedProviderThread.id,
                fromProviderInstanceId: latestHandoffRun.providerInstanceId,
                toProviderInstanceId: queuedRun.providerInstanceId,
                coveredRunOrdinals: {
                  from: coveredRuns[0]!.ordinal,
                  to: coveredRuns.at(-1)!.ordinal,
                },
                runs: projection.runs,
                strategy: handoffStrategy,
                items: [
                  ...(needsFullContext && contextBoundary === 0
                    ? yield* readInheritedItems(projection.thread)
                    : []),
                  ...(needsFullContext && latestCompletedRun !== undefined
                    ? legacyImportItems
                    : []),
                  ...(yield* readHandoffItems(
                    threadId,
                    coveredRuns.map((run) => run.id),
                  )),
                ],
                createdAt: now,
              })
              .pipe(
                Effect.mapError(
                  (cause) =>
                    new OrchestratorDispatchError({
                      commandId,
                      commandType: "message.dispatch",
                      cause,
                    }),
                ),
              );
      const legacyImportRecoveryHandoff =
        latestCompletedRun === undefined && needsFullContext && legacyImportItems.length > 0
          ? yield* contextHandoffService
              .prepareLegacyImport({
                threadId,
                targetRunId: queuedRun.id,
                toProviderThreadId: queuedProviderThread.id,
                toProviderInstanceId: queuedRun.providerInstanceId,
                items: legacyImportItems,
                createdAt: now,
              })
              .pipe(
                Effect.mapError(
                  (cause) =>
                    new OrchestratorDispatchError({
                      commandId,
                      commandType: "message.dispatch",
                      cause,
                    }),
                ),
              )
          : null;
      const activeHandoff = handoff ?? legacyImportRecoveryHandoff;
      const mapQueuedStartError = Effect.mapError(
        (cause: unknown) =>
          new OrchestratorDispatchError({
            commandId,
            commandType: "message.dispatch",
            cause,
          }),
      );
      const executionCwd =
        storedCheckpointScope !== undefined &&
        storedCheckpointScope.cwd === projection.thread.worktreePath
          ? storedCheckpointScope.cwd
          : yield* runtimePolicy
              .resolve({ thread: projection.thread, modelSelection: queuedRun.modelSelection })
              .pipe(
                Effect.map(
                  (resolvedRuntimePolicy) =>
                    resolvedRuntimePolicy.cwd ?? projection.thread.worktreePath ?? process.cwd(),
                ),
                mapQueuedStartError,
              );
      // The thread may have moved between worktree and checkout while this message waited.
      const reusableCheckpointScope =
        storedCheckpointScope?.cwd === executionCwd ? storedCheckpointScope : undefined;
      const checkpointScope =
        reusableCheckpointScope ??
        (yield* checkpointService
          .prepareRootRunScope({
            threadId,
            runId: queuedRun.id,
            rootNodeId: rootNode.id,
            providerThreadId: queuedProviderThread.id,
            cwd: executionCwd,
            createdAt: now,
          })
          .pipe(mapQueuedStartError));
      const providerSessionId =
        (!canResumeAcrossInstances &&
        queuedProviderThread.providerSessionId !== null &&
        !switchPlan?.releaseProviderSessionIds.includes(queuedProviderThread.providerSessionId)
          ? queuedProviderThread.providerSessionId
          : null) ??
        (yield* providerAdapters.get(queuedRun.providerInstanceId).pipe(
          Effect.flatMap((adapter) =>
            providerSessionIdFor({
              adapter,
              providerInstanceId: queuedRun.providerInstanceId,
              threadId,
            }),
          ),
          Effect.mapError(
            (cause) =>
              new OrchestratorDispatchError({
                commandId,
                commandType: "message.dispatch",
                cause,
              }),
          ),
        ));
      const providerThread: OrchestrationV2ProviderThread = {
        ...deliveryProviderThread,
        providerSessionId,
        status: deliveryProviderThread.status === "error" ? "error" : "not_loaded",
        firstRunOrdinal: queuedProviderThread.firstRunOrdinal ?? ordinal,
        lastRunOrdinal: ordinal,
        handoffIds: appendContextHandoffId(
          appendContextHandoffId(queuedProviderThread.handoffIds, handoff?.id ?? null),
          legacyImportRecoveryHandoff?.id ?? null,
        ),
        updatedAt: now,
      };
      // Resume can clear the hold before the stopped run ends; its Stop marker still makes the drain explicit.
      const queueDelivery =
        endedRunId === undefined ||
        queuedRun.queueHeld === true ||
        (yield* projectionStore
          .getThreadRecords(threadId, ["turnItems"], {
            turnItemTypes: ["run_interrupt_request"],
            turnItemRunIds: [endedRunId],
          })
          .pipe(
            Effect.map(({ turnItems }) => turnItems.length > 0),
            Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })),
          ))
          ? "explicit-queue"
          : "automatic-queue";
      const startingRun: OrchestrationV2Run = {
        ...queuedRun,
        providerThreadId: queuedProviderThread.id,
        ordinal,
        status: "starting",
        queuePosition: null,
        startedAt: null,
        contextHandoffId: activeHandoff?.id ?? null,
        ...wakeWorkStartedAt(
          projection,
          {
            createdBy: queuedMessage.createdBy,
            creationSource: queuedMessage.creationSource,
            senderThreadId: queuedMessage.senderThreadId,
            notification: queuedMessage.notification,
            delegatedCompletion: queuedMessage.delegatedCompletion,
            restartContinuationOfRunId: queuedRun.restartContinuationOfRunId,
          },
          queueDelivery,
        ),
      };
      const userTurnItem: OrchestrationV2TurnItem = {
        ...(legacyQueuedTurnItem ?? {
          id: idAllocator.derive.userTurnItem({ messageId: queuedMessage.id }),
          threadId,
          runId: queuedRun.id,
          nodeId: rootNodeId,
          providerThreadId: queuedProviderThread.id,
          providerTurnId: null,
          nativeItemRef: null,
          parentItemId: null,
          ordinal: ordinal * 100,
          status: "completed",
          title: null,
          type: "user_message",
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
        }),
        ...(freshContext ? { freshContext: true } : {}),
        providerThreadId: queuedProviderThread.id,
        inputIntent: "queued_turn",
        status: "completed",
        startedAt: now,
        completedAt: now,
        updatedAt: now,
        ...(activeHandoff === null ? modelSwitchSince(projection, queuedRun.modelSelection) : {}),
      };
      const handoffTurnItem: OrchestrationV2TurnItem | null =
        activeHandoff === null
          ? null
          : {
              id: idAllocator.derive.runSignalTurnItem({
                runId: queuedRun.id,
                signal: `context-handoff:${activeHandoff.id}`,
              }),
              threadId,
              runId: queuedRun.id,
              nodeId: rootNodeId,
              providerThreadId: queuedProviderThread.id,
              providerTurnId: null,
              nativeItemRef: null,
              parentItemId: null,
              ordinal: ordinal * 100 - 1,
              status: "completed",
              title: handoff === null ? "Imported context" : "Provider handoff",
              startedAt: now,
              completedAt: now,
              updatedAt: now,
              type: "handoff",
              contextHandoffId: activeHandoff.id,
              fromProviderThreadIds: activeHandoff.fromProviderThreadIds,
              toProviderThreadId: activeHandoff.toProviderThreadId,
              fromProviderInstanceIds: Array.from(
                new Set(coveredRuns.map((run) => run.providerInstanceId)),
              ),
              toProviderInstanceId: queuedRun.providerInstanceId,
              fromModelSelections: Array.from(
                new Map(
                  coveredRuns.map((run) => [
                    `${run.modelSelection.instanceId}\0${run.modelSelection.model}`,
                    run.modelSelection,
                  ]),
                ).values(),
              ),
              toModel: queuedRun.modelSelection.model,
              strategy: activeHandoff.strategy,
              summary: activeHandoff.summaryText,
            };
      const executionIdentityEvents: ReadonlyArray<Omit<OrchestrationV2DomainEvent, "id">> =
        reusableCheckpointScope === undefined ||
        storedProviderThread.id !== queuedProviderThread.id ||
        attempt.providerInstanceId !== queuedRun.providerInstanceId
          ? [
              {
                type: "checkpoint-scope.created",
                threadId,
                runId: queuedRun.id,
                nodeId: rootNodeId,
                providerInstanceId: queuedRun.providerInstanceId,
                occurredAt: now,
                payload: { ...checkpointScope, providerThreadId: queuedProviderThread.id },
              },
              {
                type: "node.updated",
                threadId,
                runId: queuedRun.id,
                nodeId: rootNodeId,
                providerInstanceId: queuedRun.providerInstanceId,
                occurredAt: now,
                payload: {
                  ...rootNode,
                  providerThreadId: queuedProviderThread.id,
                  checkpointScopeId: checkpointScope.id,
                },
              },
              {
                type: "run-attempt.updated",
                threadId,
                runId: queuedRun.id,
                nodeId: rootNodeId,
                providerInstanceId: queuedRun.providerInstanceId,
                occurredAt: now,
                payload: {
                  ...attempt,
                  providerInstanceId: queuedRun.providerInstanceId,
                  providerThreadId: queuedProviderThread.id,
                },
              },
            ]
          : [];
      const detachReason = freshContext
        ? FRESH_CONTEXT_DETACH_REASON
        : "Provider or model selection changed.";
      yield* writeSystemEvents(
        [
          ...(selectionChanged
            ? [
                {
                  type:
                    queuedRun.providerInstanceId === projection.thread.providerInstanceId
                      ? ("thread.model-selection-updated" as const)
                      : ("thread.provider-switched" as const),
                  threadId,
                  providerInstanceId: queuedRun.providerInstanceId,
                  occurredAt: now,
                  payload: {
                    ...projection.thread,
                    providerInstanceId: queuedRun.providerInstanceId,
                    modelSelection: queuedRun.modelSelection,
                    updatedAt: now,
                  },
                },
              ]
            : []),
          ...(handoff === null || transferId === null || latestHandoffRun === undefined
            ? []
            : [
                {
                  type: "context-transfer.created" as const,
                  threadId,
                  runId: queuedRun.id,
                  providerInstanceId: queuedRun.providerInstanceId,
                  occurredAt: now,
                  payload: {
                    id: transferId,
                    type: "provider_handoff" as const,
                    sourceThreadId: threadId,
                    targetThreadId: threadId,
                    sourcePoint: contextSourcePointForRun(projection, latestHandoffRun),
                    basePoint:
                      needsFullContext || targetLastCompletedRun === undefined
                        ? null
                        : contextSourcePointForRun(projection, targetLastCompletedRun),
                    sourceProviderInstanceId: latestHandoffRun.providerInstanceId,
                    targetProviderInstanceId: queuedRun.providerInstanceId,
                    targetRunId: queuedRun.id,
                    status: "consumed" as const,
                    resolution: {
                      strategy: needsFullContext
                        ? ("portable_context" as const)
                        : ("delta_context" as const),
                      contextHandoffId: handoff.id,
                    },
                    createdBy: queuedMessage.createdBy,
                    error: null,
                    createdAt: now,
                    updatedAt: now,
                    consumedAt: now,
                  },
                },
                {
                  type: "context-handoff.updated" as const,
                  threadId,
                  runId: queuedRun.id,
                  providerInstanceId: queuedRun.providerInstanceId,
                  occurredAt: now,
                  payload: handoff,
                },
              ]),
          ...(legacyImportRecoveryHandoff === null
            ? []
            : [
                {
                  type: "context-handoff.updated" as const,
                  threadId,
                  runId: queuedRun.id,
                  providerInstanceId: queuedRun.providerInstanceId,
                  occurredAt: now,
                  payload: legacyImportRecoveryHandoff,
                },
              ]),
          ...(supersededForkTransfer === undefined
            ? []
            : [
                forkTransferSupersededEvent(
                  supersededForkTransfer,
                  queuedRun.id,
                  queuedRun.providerInstanceId,
                  now,
                ),
              ]),
          ...(handoffTurnItem === null
            ? []
            : [
                {
                  type: "turn-item.updated" as const,
                  threadId,
                  runId: queuedRun.id,
                  nodeId: rootNodeId,
                  providerInstanceId: queuedRun.providerInstanceId,
                  occurredAt: now,
                  payload: handoffTurnItem,
                },
              ]),
          ...sessionsToDetach.map((session) => ({
            type: "provider-session.detached" as const,
            threadId,
            driver: session.driver,
            providerInstanceId: session.providerInstanceId,
            occurredAt: now,
            payload: {
              providerSessionId: session.id,
              detachedAt: now,
              reason: detachReason,
            },
          })),
          ...executionIdentityEvents,
          {
            type: "provider-thread.updated",
            threadId,
            providerInstanceId: queuedRun.providerInstanceId,
            occurredAt: now,
            payload: providerThread,
          },
          {
            type: "turn-item.updated",
            threadId,
            runId: queuedRun.id,
            nodeId: rootNodeId,
            providerInstanceId: queuedRun.providerInstanceId,
            occurredAt: now,
            payload: notificationTurnItem(
              userTurnItem,
              queuedMessage,
              yield* notificationTasks(threadId, queuedMessage, projection.subagents),
            ),
          },
          {
            type: "run.updated",
            threadId,
            runId: queuedRun.id,
            nodeId: rootNodeId,
            providerInstanceId: queuedRun.providerInstanceId,
            occurredAt: now,
            payload: startingRun,
          },
        ],
        [
          ...sessionsToDetach.map((session) => ({
            id: `effect:${commandId}:provider-session.detach:${session.id}`,
            commandId,
            threadId,
            request: {
              type: "provider-session.detach" as const,
              providerSessionId: session.id,
              detail: detachReason,
            },
          })),
          {
            // A restart can return this run to the queue after its previous start effect was cancelled.
            id: `effect:${commandId}:provider-turn.start:${queuedRun.id}:${yield* idAllocator.allocate.event({ threadId, commandId })}`,
            commandId,
            threadId,
            request: { type: "provider-turn.start", runId: queuedRun.id },
          },
        ],
      );
    },
    (effect, threadId, options) =>
      effect.pipe(
        Effect.catch((cause) => failQueuedRunStart(threadId, cause, options?.queuedRunId)),
      ),
  );
};
