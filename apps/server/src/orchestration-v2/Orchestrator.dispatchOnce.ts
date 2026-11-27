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

import type { OrchestratorV2Error } from "./Orchestrator.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindDispatchOnce = (ctx: any) =>
  Effect.fn("orchestrationV2.dispatch.once")(function* (
    command: OrchestrationV2ServerCommand,
    sideChatIds: ReadonlyArray<ThreadId>,
  ): Effect.fn.Return<
    {
      readonly events: ReadonlyArray<OrchestrationV2DomainEvent>;
      readonly effects: ReadonlyArray<PendingOrchestrationEffectV2>;
      readonly cancelUnsettledEffects?: {
        readonly effectTypes: ReadonlyArray<OrchestrationEffectRequestV2["type"]>;
        readonly reason: string;
      };
      readonly updateDelegatedCompletionOnlyRunId?: RunId;
    },
    OrchestratorV2Error
  > {
    const {
      OrchestratorDispatchError,
      OrchestratorProjectionError,
      OrchestratorV2Error,
      QUEUED_TURN_START_GRACE_MS,
      cancelIdleOrphans,
      commandThreadId,
      delegatedTasksStopEffect,
      dispatchBackgroundWorkSettle,
      dispatchCheckpointRollback,
      dispatchCheckpointRollbackFail,
      dispatchCreatedThreadRecord,
      dispatchDelegatedTaskCompletionDeliveryResolution,
      dispatchDelegatedTaskRequest,
      dispatchDelegatedTaskWakePolicy,
      dispatchFeedbackRequestRecord,
      dispatchGuestShare,
      dispatchInterruptUnresponsive,
      dispatchLinkRequestRecord,
      dispatchMessage,
      dispatchNotificationAccepted,
      dispatchPreparedRunFail,
      dispatchPreparedRunProgress,
      dispatchPreparedRunRelease,
      dispatchPreparedRunRetry,
      dispatchProviderSessionDetach,
      dispatchPullRequestWatchSync,
      dispatchQueuedMessagePromoteToSteer,
      dispatchQueuedRunCancel,
      dispatchQueuedRunEdit,
      dispatchQueuedRunReorder,
      dispatchRemoteDelegatedTaskComplete,
      dispatchRemoteDelegatedTaskRequest,
      dispatchRemoteDelegatedTaskStop,
      dispatchRunInterrupt,
      dispatchRunOutputSubmit,
      dispatchRuntimeRequestDeliveryFail,
      dispatchRuntimeRequestRespond,
      dispatchSecretRequestRecord,
      dispatchSubagentStop,
      dispatchThreadCreate,
      dispatchThreadFork,
      dispatchThreadMergeBack,
      dispatchThreadMutation,
      dispatchThreadProjectAdoptFolder,
      dispatchThreadStop,
      dispatchThreadUserInputDismiss,
      dispatchThreadVisit,
      dispatchUnsupported,
      emit,
      emitGuestMessageSent,
      findThread,
      hasRunningDelegatedTasks,
      idAllocator,
      loadProjectionForCommand,
      mapDispatchError,
      metadataUpdateContinuation,
      projectionStore,
      queuedRunModelSelection,
      recordSubagentFollowup,
      refuseNativeSubagentMessage,
      threadCreateInitialMessage,
      usageLimitHoldsQueue,
      worktreeSetupPending,
    } = pickScriptcBindCtx(ctx);

    yield* Effect.annotateCurrentSpan({
      "orchestration_v2.command_id": command.commandId,
      "orchestration_v2.command_type": command.type,
      "orchestration_v2.thread_id": commandThreadId(command),
    });

    const events = yield* Ref.make<Array<OrchestrationV2DomainEvent>>([]);
    const effects = yield* Ref.make<Array<PendingOrchestrationEffectV2>>([]);
    let cancelUnsettledEffects:
      | {
          readonly effectTypes: ReadonlyArray<OrchestrationEffectRequestV2["type"]>;
          readonly reason: string;
        }
      | undefined;
    let updateDelegatedCompletionOnlyRunId: RunId | undefined;
    switch (command.type) {
      case "thread.create": {
        yield* dispatchThreadCreate(command, events);
        const initialMessage = threadCreateInitialMessage(command);
        if (initialMessage !== undefined) {
          cancelUnsettledEffects = yield* dispatchMessage(
            withoutGuestAttribution(initialMessage),
            events,
            effects,
          );
        }
        break;
      }
      case "thread.visit":
        yield* dispatchThreadVisit(command, events);
        break;
      case "thread.auto-settle": {
        // Recheck live state; changes and explicit overrides take precedence over the sweep snapshot.
        const thread = yield* projectionStore
          .getThread(command.threadId)
          .pipe(
            Effect.mapError(
              (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
            ),
          );
        if (
          thread.settledOverride !== null ||
          DateTime.toEpochMillis(thread.updatedAt) > DateTime.toEpochMillis(command.snapshotAt)
        ) {
          return yield* new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause: `Thread ${command.threadId} changed before automatic settlement.`,
          });
        }
        // The completion reaction starts or holds the queue just after a run ends; settling
        // first would cancel an automatic wake it was about to start.
        const { runs } = yield* loadProjectionForCommand(command, ["runs"]);
        const endedAt = latestExecutedRun(runs)?.completedAt;
        if (
          endedAt != null &&
          runs.some((run) => run.status === "queued") &&
          Math.abs(DateTime.toEpochMillis(yield* DateTime.now) - DateTime.toEpochMillis(endedAt)) <
            QUEUED_TURN_START_GRACE_MS
        ) {
          return yield* new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause: `Thread ${command.threadId} has a queued run that may still start.`,
          });
        }
        yield* dispatchThreadMutation(
          {
            type: "thread.settle",
            commandId: command.commandId,
            threadId: command.threadId,
            ...(command.settledAt === undefined ? {} : { settledAt: command.settledAt }),
          },
          events,
          effects,
        );
        break;
      }
      case "thread.delete": {
        const now = yield* DateTime.now;
        const planDeletion = Effect.fn("Orchestrator.planDeletion")(function* (
          deletion: typeof command,
        ) {
          const projection = yield* projectionStore
            .getThreadRecords(deletion.threadId, [
              "runs",
              "attempts",
              "nodes",
              "runtimeRequests",
              "subagents",
              "providerSessions",
            ])
            .pipe(
              Effect.mapError(
                (cause) => new OrchestratorProjectionError({ threadId: deletion.threadId, cause }),
              ),
            );
          return yield* mapDispatchError(command)(
            planThreadDeletion({
              command: deletion,
              projection,
              attachmentIds: yield* projectionStore
                .getThreadAttachmentIds(deletion.threadId)
                .pipe(mapDispatchError(command)),
              now,
              idAllocator,
            }),
          );
        });
        // Checked under the thread lock: a message sent since the client looked keeps the thread.
        if (command.onlyIfUnused === true) {
          const usage = yield* projectionStore
            .getThreadRecords(command.threadId, ["runs", "messages"])
            .pipe(
              Effect.mapError(
                (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
              ),
            );
          if (usage.runs.length > 0 || usage.messages.length > 0) {
            return { events: [], effects: [] };
          }
        }
        // The dispatch wrapper holds each side chat's lock, so none can commit after this plan.
        const plans = [
          yield* planDeletion(command),
          ...(yield* Effect.forEach(sideChatIds, (threadId) =>
            planDeletion({
              ...command,
              commandId: CommandId.make(`${command.commandId}:side-chat:${threadId}`),
              threadId,
            }),
          )),
        ];
        return {
          events: plans.flatMap((plan) => plan.events),
          effects: plans.flatMap((plan) => plan.effects),
          // A continuation would hold off the purge, and a late title would bring text back.
          cancelUnsettledEffects: {
            effectTypes: ["provider-runtime.continue", "thread-title.generate"],
            reason: "Thread deleted.",
          },
        };
      }
      case "thread.archive":
      case "thread.unarchive": {
        const parentArchivedAt = (yield* findThread(command.threadId))?.archivedAt ?? null;
        yield* dispatchThreadMutation(command, events, effects);
        // Unarchive restores the side chats this parent's archive took, not ones archived before it.
        for (const threadId of sideChatIds) {
          const sideChatArchivedAt = (yield* findThread(threadId))?.archivedAt ?? null;
          const follows =
            command.type === "thread.archive"
              ? sideChatArchivedAt === null
              : sideChatArchivedAt !== null &&
                parentArchivedAt !== null &&
                DateTime.toEpochMillis(sideChatArchivedAt) >=
                  DateTime.toEpochMillis(parentArchivedAt);
          if (!follows) continue;
          // Archive refuses a side chat still waiting on delegated tasks, so it stays active.
          if (command.type === "thread.archive") {
            const { subagents } = yield* projectionStore
              .getThreadRecords(threadId, ["subagents"])
              .pipe(mapDispatchError(command));
            if (hasRunningDelegatedTasks(subagents)) continue;
          }
          yield* dispatchThreadMutation(
            {
              ...command,
              commandId: CommandId.make(`${command.commandId}:side-chat:${threadId}`),
              threadId,
            },
            events,
            effects,
          );
        }
        break;
      }
      case "thread.settle":
      case "thread.unsettle":
      case "thread.snooze":
      case "thread.unsnooze":
      case "thread.auto-settle.set":
      case "thread.pin":
      case "thread.unpin":
      case "thread.pin.reorder":
      case "thread.active.reorder":
      case "thread.tag.set":
      case "thread.mark-unread":
      case "thread.pull-request.link":
      case "thread.pull-request.unlink":
      case "thread.pull-request-link.sync":
      case "thread.issue.link":
      case "thread.issue.unlink":
      case "thread.pull-request.watch":
      case "thread.pull-request.sync":
      case "thread.title.regeneration.complete":
      case "thread.runtime-mode.set":
      case "thread.interaction-mode.set":
      case "thread.model-selection.set":
      case "provider.switch":
        yield* dispatchThreadMutation(command, events, effects);
        break;
      case "thread.metadata.update": {
        const continuation = metadataUpdateContinuation(command);
        if (continuation !== undefined) yield* refuseNativeSubagentMessage(command);
        yield* dispatchThreadMutation(command, events, effects);
        if (continuation !== undefined) {
          cancelUnsettledEffects = yield* dispatchMessage(continuation, events, effects);
          yield* recordSubagentFollowup(continuation, events).pipe(mapDispatchError(command));
        }
        break;
      }
      case "thread.pull-request-watch.checks-reopen":
        yield* dispatchThreadMutation(command, events, effects);
        break;
      case "thread.pull-request-watch.sync":
        yield* dispatchPullRequestWatchSync(command, events, effects);
        break;
      case "thread.guest-share.open":
      case "thread.guest-share.redeem":
      case "thread.guest-share.close":
      case "thread.guest-message.submit":
      case "thread.guest-message.dismiss":
        yield* dispatchGuestShare(command, events, effects);
        break;
      case "provider-session.detach":
        yield* dispatchProviderSessionDetach(command, events, effects);
        break;
      case "thread.project.adopt-folder":
        yield* dispatchThreadProjectAdoptFolder(command, events);
        break;
      case "message.dispatch": {
        const thread = yield* refuseNativeSubagentMessage(command);
        const guestSend =
          command.guestMessageId === undefined
            ? undefined
            : yield* emitGuestMessageSent(command, command.guestMessageId, thread, events);
        const dispatched =
          guestSend === undefined
            ? withoutGuestAttribution(command)
            : {
                ...command,
                text: guestSend.text,
                context: { version: 1 as const, records: [], guest: guestSend.guest },
              };
        cancelUnsettledEffects = yield* dispatchMessage(dispatched, events, effects);
        yield* recordSubagentFollowup(dispatched, events).pipe(mapDispatchError(command));
        break;
      }
      case "notification.delivery.accept":
        updateDelegatedCompletionOnlyRunId = yield* dispatchNotificationAccepted(command, events);
        break;
      case "prepared-run.release":
        yield* dispatchPreparedRunRelease(command, events, effects);
        break;
      case "prepared-run.progress":
        yield* dispatchPreparedRunProgress(command, events);
        break;
      case "prepared-run.fail":
        yield* dispatchPreparedRunFail(command, events);
        break;
      case "prepared-run.retry":
        yield* dispatchPreparedRunRetry(command, events);
        break;
      case "runtime-request.respond":
        yield* dispatchRuntimeRequestRespond(command, events, effects);
        break;
      case "thread.user-input.dismiss":
        yield* dispatchThreadUserInputDismiss(command, events, effects);
        break;
      case "subagent.stop":
        yield* dispatchSubagentStop(command, events, effects);
        break;
      case "run.interrupt":
        cancelUnsettledEffects = yield* dispatchRunInterrupt(command, events, effects);
        if (command.holdQueue === true) {
          // Stop must still commit when a child can't be read, so a failed repair's
          // partial events are dropped.
          const repairEvents = yield* Ref.make(yield* Ref.get(events));
          const repaired = yield* Effect.exit(
            loadProjectionForCommand(command, ["subagents", "turnItems"], {
              turnItemTypes: ["subagent"],
              turnItemStatuses: ["pending", "running", "waiting"],
            }).pipe(
              Effect.flatMap((projection) =>
                cancelIdleOrphans({ command, events: repairEvents, projection }),
              ),
            ),
          );
          if (Exit.isSuccess(repaired)) yield* Ref.set(events, yield* Ref.get(repairEvents));
          else
            yield* Effect.logWarning("Stop could not cancel orphaned delegated follow-ups", {
              threadId: command.threadId,
              cause: repaired.cause,
            });
          yield* Ref.update(effects, (existing) => [
            ...existing,
            delegatedTasksStopEffect(command),
          ]);
        }
        break;
      case "thread.stop":
        cancelUnsettledEffects = yield* dispatchThreadStop(command, events, effects);
        break;
      case "queued-message.promote-to-steer":
        cancelUnsettledEffects = yield* dispatchQueuedMessagePromoteToSteer(
          command,
          events,
          effects,
        );
        break;
      case "queued-run.start":
      case "queue.resume": {
        const projection = yield* loadProjectionForCommand(
          command,
          ["runs", "turnItems", "providerSessions", "messages"],
          { turnItemTypes: ["error"], messageRoles: ["user"] },
        );
        if (projection.thread.archivedAt !== null || projection.thread.deletedAt !== null) {
          return yield* new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause: `Thread ${command.threadId} is not active.`,
          });
        }
        const selectedRunId = command.type === "queued-run.start" ? command.runId : undefined;
        const selectedRun =
          selectedRunId === undefined
            ? undefined
            : projection.runs.find((run) => run.id === selectedRunId && run.status === "queued");
        if (selectedRunId !== undefined) {
          const selectedMessage = projection.messages.find(
            (message) => message.id === selectedRun?.userMessageId,
          );
          if (
            selectedRun === undefined ||
            selectedMessage === undefined ||
            selectedMessage.delegatedCompletion !== undefined ||
            selectedMessage.notification !== undefined ||
            projection.runs.some(isActiveRun)
          ) {
            return yield* new OrchestratorDispatchError({
              commandId: command.commandId,
              commandType: command.type,
              cause: "A queued user message can only be sent now while the thread is stopped.",
            });
          }
        }
        const nextRun = selectedRun ?? queuedRunsInDeliveryOrder(projection)[0];
        if (
          usageLimitHoldsQueue(
            projection,
            nextRun === undefined
              ? projection.thread.providerInstanceId
              : queuedRunModelSelection(projection, nextRun).instanceId,
          )
        ) {
          return yield* new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause: "Continue the limited thread before resuming its queue.",
          });
        }
        if (worktreeSetupPending(projection)) {
          return yield* new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause: "Retry worktree setup or choose a workspace before resuming the queue.",
          });
        }
        const now = yield* DateTime.now;
        const queued = projection.runs.filter((run) => run.status === "queued");
        for (const run of queued) {
          yield* emit(
            events,
            command,
          )({
            type: "run.updated",
            threadId: command.threadId,
            runId: run.id,
            providerInstanceId: run.providerInstanceId,
            occurredAt: now,
            payload: { ...run, queueHeld: false },
          });
        }
        if (queued.length === 0) {
          yield* emit(
            events,
            command,
          )({
            type: "thread.metadata-updated",
            threadId: command.threadId,
            occurredAt: now,
            payload: projection.thread,
          });
        }
        break;
      }
      case "queued-run.reorder":
        yield* dispatchQueuedRunReorder(command, events);
        break;
      case "queued-run.cancel":
        yield* dispatchQueuedRunCancel(command, events);
        break;
      case "queued-run.edit":
        yield* dispatchQueuedRunEdit(command, events, effects);
        break;
      case "run.output.submit":
        yield* dispatchRunOutputSubmit(command, events);
        break;
      case "checkpoint.rollback":
        yield* dispatchCheckpointRollback(command, events, effects);
        break;
      case "checkpoint.rollback.fail":
        yield* dispatchCheckpointRollbackFail(command, events);
        break;
      case "runtime-request.delivery.fail":
        yield* dispatchRuntimeRequestDeliveryFail(command, events);
        break;
      case "thread.background-work.settle":
        yield* dispatchBackgroundWorkSettle(command, events, effects);
        break;
      case "thread.interrupt.unresponsive":
        yield* dispatchInterruptUnresponsive(command, events);
        break;
      case "thread.fork":
        yield* dispatchThreadFork(command, events);
        break;
      case "thread.merge_back":
        yield* dispatchThreadMergeBack(command, events);
        break;
      case "delegated_task.request":
        yield* dispatchDelegatedTaskRequest(command, events, effects);
        break;
      case "delegated_task.remote.request":
        yield* dispatchRemoteDelegatedTaskRequest(command, events);
        break;
      case "delegated_task.remote.complete":
        yield* dispatchRemoteDelegatedTaskComplete(command, events);
        break;
      case "delegated_task.remote.stop":
        yield* dispatchRemoteDelegatedTaskStop(command, events);
        break;
      case "delegated_task.wake-policy":
        updateDelegatedCompletionOnlyRunId = yield* dispatchDelegatedTaskWakePolicy(
          command,
          events,
        );
        break;
      case "delegated_task.completion-delivery.acknowledge":
      case "delegated_task.completion-delivery.dispose":
        updateDelegatedCompletionOnlyRunId =
          yield* dispatchDelegatedTaskCompletionDeliveryResolution(command, events);
        break;
      case "thread.created.record":
        yield* dispatchCreatedThreadRecord(command, events);
        break;
      case "secret_request.record":
        yield* dispatchSecretRequestRecord(command, events);
        break;
      case "feedback_request.record":
        yield* dispatchFeedbackRequestRecord(command, events);
        break;
      case "link_request.record":
        yield* dispatchLinkRequestRecord(command, events, effects);
        break;
      default:
        return yield* dispatchUnsupported(command);
    }
    return {
      events: yield* Ref.get(events),
      effects: yield* Ref.get(effects),
      ...(cancelUnsettledEffects === undefined ? {} : { cancelUnsettledEffects }),
      ...(updateDelegatedCompletionOnlyRunId === undefined
        ? {}
        : { updateDelegatedCompletionOnlyRunId }),
    };
  });
