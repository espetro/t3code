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
import type { OrchestratorV2DispatchResult, OrchestratorV2Error } from "./Orchestrator.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindDispatchWithReceiptEffect = (ctx: any) =>
  Effect.fn("orchestrationV2.dispatch.withReceipt")(function* (
    command: OrchestrationV2ServerCommand,
    sideChatIds: ReadonlyArray<ThreadId> = [],
    cancelledTask?: OrchestrationV2Subagent,
  ): Effect.fn.Return<OrchestratorV2DispatchResult, OrchestratorV2Error> {
    const {
      OrchestratorCommandIdConflictError,
      OrchestratorCommandPreviouslyRejectedError,
      OrchestratorCommandRejectedError,
      OrchestratorDispatchError,
      OrchestratorProjectionError,
      OrchestratorRuntimeModeAboveCeilingError,
      OrchestratorV2Error,
      commandReceipts,
      commandThreadId,
      dispatchOnce,
      eventSink,
      isUnobservedAcknowledgement,
      makeSystemEvent,
      mapDispatchError,
      offerDelegatedCompletionDeliveries,
      projectionStore,
      refuseAboveDispatchModeLimit,
      refuseAboveRuntimeModeCeiling,
      replayCommandReceipt,
      requeueUnreadSteers,
      runtimeModeCeiling,
      runtimePolicyCeilingCause,
      startNextQueuedRun,
    } = pickScriptcBindCtx(ctx);

    yield* Effect.annotateCurrentSpan({
      "orchestration_v2.command_id": command.commandId,
      "orchestration_v2.command_type": command.type,
      "orchestration_v2.thread_id": commandThreadId(command),
    });

    const existingReceipt = yield* commandReceipts.getByCommandId(command.commandId).pipe(
      Effect.mapError(
        (cause) =>
          new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause,
          }),
      ),
    );

    if (Option.isSome(existingReceipt)) {
      return yield* replayCommandReceipt(command, existingReceipt.value);
    }

    // Recheck under the lock; the user may have raised modes since sender preflight.
    const limit = yield* DispatchModeLimit;
    if (limit !== undefined) {
      // Fork and merge-back sources are unlocked; validate the modes copied by their dispatch.
      const threadId = commandThreadId(command);
      const shell = yield* projectionStore
        .getThreadShell(threadId)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
      if (shell !== null) yield* refuseAboveDispatchModeLimit(command, threadId, shell);
    }

    // The run-end release can lag behind a new send; start the queue first so the send waits behind it.
    // A restart continuation resumes the ended run, so it must not be overtaken by the queue.
    // A steer follow-up takes its place first and starts the queue after it commits. A send that
    // beats the run-end reaction places the ended run's unread steers before it starts anything.
    if (
      command.type === "message.dispatch" &&
      command.restartContinuationOfRunId === undefined &&
      command.steerFollowUpOfRunId === undefined &&
      (command.dispatchMode.type === "start_immediately" ||
        command.dispatchMode.type === "queue_after_active" ||
        command.dispatchMode.type === "defer_start")
    ) {
      yield* mapDispatchError(command)(
        requeueUnreadSteers(command.threadId).pipe(
          Effect.andThen(startNextQueuedRun(command.threadId, { latestRunEnded: true })),
        ),
      );
    }

    const plan = yield* dispatchOnce(command, sideChatIds).pipe(
      Effect.tap((planned) => refuseAboveRuntimeModeCeiling(command, planned.events)),
      Effect.filterOrFail(
        (planned) =>
          planned.events.length > 0 ||
          isUnobservedAcknowledgement(command) ||
          command.type === "thread.background-work.settle" ||
          // A stale visit changes no read state.
          command.type === "thread.visit" ||
          // A read can answer a watch again before a push's reopen lands; nothing is left to clear.
          command.type === "thread.pull-request-watch.checks-reopen" ||
          command.type === "thread.interrupt.unresponsive" ||
          command.type === "thread.stop" ||
          command.type === "subagent.stop" ||
          // Closing a share again, or after it ended, is not an error.
          command.type === "thread.guest-share.close" ||
          (command.type === "thread.delete" && command.onlyIfUnused === true),
        (_planned) =>
          new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause: "Command produced no domain events.",
          }),
      ),
      Effect.catch((cause) =>
        Effect.gen(function* () {
          // Refusals depend on modes the user can change; a recorded rejection would block the retry.
          if (
            cause._tag === "OrchestratorThreadAboveModeLimitError" ||
            cause._tag === "OrchestratorRuntimeModeAboveCeilingError"
          ) {
            return yield* cause;
          }
          // Resolving a turn's policy refuses the same way, from inside the decision.
          const ceiling = runtimePolicyCeilingCause(cause);
          if (ceiling !== undefined) {
            const { threadId, runtimeMode, maxRuntimeMode, organization } = ceiling;
            return yield* new OrchestratorRuntimeModeAboveCeilingError({
              commandId: command.commandId,
              threadId,
              refused: "turn",
              runtimeMode,
              maxRuntimeMode,
              organization,
            });
          }
          const rejectedAt = yield* DateTime.now;
          const receipt = yield* eventSink
            .commitRejectedCommand({
              commandId: command.commandId,
              threadId: commandThreadId(command),
              commandType: command.type,
              rejectedAt,
              error: cause instanceof Error ? cause.message : String(cause),
            })
            .pipe(
              Effect.mapError(
                (receiptCause) =>
                  new OrchestratorDispatchError({
                    commandId: command.commandId,
                    commandType: command.type,
                    cause: receiptCause,
                  }),
              ),
            );
          if (
            command.type === "queued-run.edit" &&
            receipt.status === "rejected" &&
            cause._tag === "OrchestratorDispatchError"
          ) {
            return yield* new OrchestratorCommandRejectedError({
              commandId: cause.commandId,
              commandType: cause.commandType,
              cause: cause.cause,
            });
          }
          return yield* cause;
        }),
      ),
    );

    if (plan.events.length === 0 && plan.effects.length === 0 && cancelledTask === undefined) {
      // A settle that ended nothing still records its receipt: a replayed Stop
      // effect then finds it instead of settling work that appeared since.
      const { resultSequence, inserted } = yield* Effect.gen(function* () {
        const sequence = yield* eventSink.latestSequence({ threadId: commandThreadId(command) });
        const inserted = yield* commandReceipts.insertIfAbsent({
          commandId: command.commandId,
          threadId: commandThreadId(command),
          commandType: command.type,
          acceptedAt: yield* DateTime.now,
          resultSequence: sequence,
          status: "accepted",
          error: null,
        });
        return { resultSequence: sequence, inserted };
      }).pipe(
        Effect.mapError(
          (cause) =>
            new OrchestratorDispatchError({
              commandId: command.commandId,
              commandType: command.type,
              cause,
            }),
        ),
      );
      if (!inserted) {
        const receipt = yield* mapDispatchError(command)(
          commandReceipts.getByCommandId(command.commandId),
        );
        if (Option.isNone(receipt)) {
          return yield* new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause: "Conflicting receipt is not a thread command receipt.",
          });
        }
        return yield* replayCommandReceipt(command, receipt.value);
      }
      return {
        sequence: resultSequence,
        storedEvents: [],
      } satisfies OrchestratorV2DispatchResult;
    }
    const acceptedAt = plan.events.at(-1)?.occurredAt ?? (yield* DateTime.now);
    const committed = yield* eventSink
      .commitCommand({
        commandId: command.commandId,
        threadId: commandThreadId(command),
        commandType: command.type,
        acceptedAt,
        events:
          cancelledTask === undefined
            ? plan.events
            : [
                ...plan.events,
                yield* makeSystemEvent({
                  type: "subagent.updated",
                  threadId: cancelledTask.threadId,
                  nodeId: cancelledTask.id,
                  occurredAt: cancelledTask.updatedAt,
                  payload: cancelledTask,
                }).pipe(mapDispatchError(command)),
              ],
        effects: plan.effects,
        ...(plan.cancelUnsettledEffects === undefined
          ? {}
          : { cancelUnsettledEffects: plan.cancelUnsettledEffects }),
        ...(plan.updateDelegatedCompletionOnlyRunId === undefined
          ? {}
          : { updateDelegatedCompletionOnlyRunId: plan.updateDelegatedCompletionOnlyRunId }),
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

    if (committed.receipt.status === "rejected") {
      return yield* new OrchestratorCommandPreviouslyRejectedError({
        commandId: command.commandId,
        commandType: command.type,
        detail: committed.receipt.error ?? "Previously rejected.",
      });
    }
    // A concurrent command with this id for another thread can commit first,
    // under that thread's lock; its receipt is not this command's result.
    if (committed.receipt.threadId !== commandThreadId(command)) {
      return yield* new OrchestratorCommandIdConflictError({
        commandId: command.commandId,
        commandType: command.type,
        receiptThreadId: committed.receipt.threadId,
        commandThreadId: commandThreadId(command),
      });
    }
    if (
      command.type === "queue.resume" ||
      command.type === "queued-run.start" ||
      (command.type === "thread.runtime-mode.set" && runtimeModeCeiling !== undefined)
    ) {
      yield* mapDispatchError(command)(
        startNextQueuedRun(command.threadId, {
          userStarted: command.type !== "thread.runtime-mode.set",
          ...(command.type === "queued-run.start" ? { queuedRunId: command.runId } : {}),
        }),
      );
    }
    if (
      command.type === "notification.delivery.accept" ||
      // A steer restart that settled a wake can reserve the next one for its siblings.
      ((command.type === "message.dispatch" ||
        command.type === "queued-message.promote-to-steer") &&
        committed.storedEvents.some(
          ({ event }) =>
            event.type === "subagent.updated" &&
            event.payload.completionDelivery?.state === "claimed",
        ))
    ) {
      yield* mapDispatchError(command)(offerDelegatedCompletionDeliveries(command.threadId));
    }
    if (
      command.type === "delegated_task.wake-policy" ||
      command.type === "delegated_task.remote.complete" ||
      isUnobservedAcknowledgement(command)
    ) {
      yield* mapDispatchError(command)(offerDelegatedCompletionDeliveries(command.parentThreadId));
    }

    if (command.type === "message.dispatch" && command.steerFollowUpOfRunId !== undefined) {
      yield* mapDispatchError(command)(
        startNextQueuedRun(command.threadId, { latestRunEnded: true }),
      );
    }

    return {
      sequence: committed.receipt.resultSequence,
      storedEvents: committed.storedEvents,
      ...(committed.committed ? {} : { replayed: true as const }),
    } satisfies OrchestratorV2DispatchResult;
  }, withCommandMetrics);
