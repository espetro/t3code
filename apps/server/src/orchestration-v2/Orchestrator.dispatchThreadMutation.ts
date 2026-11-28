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
export const bindDispatchThreadMutation = (ctx: any) =>
  Effect.fn("orchestrationV2.dispatch.threadMutation")(function* (
    command: Extract<
      OrchestrationV2ServerCommand,
      {
        readonly type:
          | "thread.archive"
          | "thread.unarchive"
          | "thread.settle"
          | "thread.unsettle"
          | "thread.snooze"
          | "thread.unsnooze"
          | "thread.auto-settle.set"
          | "thread.pin"
          | "thread.unpin"
          | "thread.pin.reorder"
          | "thread.tag.set"
          | "thread.active.reorder"
          | "thread.mark-unread"
          | "thread.metadata.update"
          | "thread.pull-request.link"
          | "thread.pull-request.unlink"
          | "thread.pull-request-link.sync"
          | "thread.issue.link"
          | "thread.issue.unlink"
          | "thread.pull-request.watch"
          | "thread.pull-request-watch.sync"
          | "thread.pull-request-watch.checks-reopen"
          | "thread.pull-request.sync"
          | "thread.title.regeneration.complete"
          | "thread.runtime-mode.set"
          | "thread.interaction-mode.set"
          | "thread.model-selection.set"
          | "provider.switch";
      }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const {
      OrchestratorDispatchError,
      OrchestratorProjectionError,
      OrchestratorProviderAdapterError,
      OrchestratorProviderSelectionBusyError,
      OrchestratorSubagentThreadReadOnlyError,
      WORKSPACE_PREPARATION_INPUT,
      closePendingLinkRequests,
      dispatchQueuedRunCancel,
      dispatchRuntimeRequestRespond,
      disposeAllDelegatedCompletionCohorts,
      emit,
      eventSink,
      getProjectionWithPendingEvents,
      hasRunningDelegatedTasks,
      legacyPullRequestLink,
      loadProjectionForCommand,
      mapDispatchError,
      pendingThreadTitleGenerationEffect,
      projectionStore,
      projects,
      providerAdapters,
      providerSessions,
      providerSwitchService,
      releaseGuestAttachments,
      sessionHasBackgroundWork,
      stopReachedRun,
      syncedPullRequestWatch,
      threadPullRequestLinksEqual,
      usageLimitHoldsQueue,
      withPullRequestWatch,
      withUntil,
      withoutChecksAnswer,
    } = pickScriptcBindCtx(ctx);

    const thread = yield* projectionStore.getThread(command.threadId).pipe(
      Effect.mapError(
        (cause) =>
          new OrchestratorProjectionError({
            threadId: command.threadId,
            cause,
          }),
      ),
    );
    if (thread.deletedAt !== null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is deleted.`,
      });
    }
    if (
      command.type === "thread.pull-request.watch" &&
      command.watching &&
      isProviderNativeSubagentThread(thread)
    ) {
      return yield* new OrchestratorSubagentThreadReadOnlyError({
        commandId: command.commandId,
        threadId: command.threadId,
      });
    }
    if (
      command.type === "thread.pull-request.watch" &&
      command.watching &&
      (thread.settledOverride === "settled" ||
        thread.settledAt !== null ||
        thread.archivedAt !== null)
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is settled or archived and cannot watch pull requests.`,
      });
    }
    // Child tasks report to their parent, which owns PR monitoring; child watches would cause unrelated wakes.
    if (
      command.type === "thread.pull-request.watch" &&
      command.watching &&
      thread.lineage.relationshipToParent === "subagent"
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is a subagent; its parent thread watches pull requests.`,
      });
    }
    // Agent watches use the latest executed run to catch calls racing Stop; users can still watch.
    if (
      command.type === "thread.pull-request.watch" &&
      command.watching &&
      command.link?.source === "agent"
    ) {
      const { runs } = yield* projectionStore
        .getThreadRecords(command.threadId, ["runs"])
        .pipe(mapDispatchError(command));
      const latest = latestExecutedRun(runs);
      if (latest !== null && (yield* stopReachedRun(command, command.threadId, latest.id))) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} was stopped.`,
        });
      }
    }
    if (
      command.type === "thread.metadata.update" &&
      command.expectedWorktreePath !== undefined &&
      command.expectedWorktreePath !== thread.worktreePath
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} worktree changed before the metadata update could be applied.`,
      });
    }
    if (
      command.type === "thread.metadata.update" &&
      command.expectedBranch !== undefined &&
      command.expectedBranch !== thread.branch
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} branch changed before the metadata update could be applied.`,
      });
    }
    if (command.type === "thread.metadata.update" && command.expectedEmpty === true) {
      const records = yield* projectionStore
        .getThreadRecords(command.threadId, ["runs"])
        .pipe(mapDispatchError(command));
      const messageCount = yield* projectionStore
        .getMessageCount(command.threadId)
        .pipe(mapDispatchError(command));
      if (messageCount > 0 || records.runs.length > 0)
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} is no longer empty.`,
        });
    }
    if (command.type === "thread.archive" && thread.archivedAt !== null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is already archived.`,
      });
    }
    if (command.type === "thread.archive") {
      const records = yield* projectionStore
        .getThreadRecords(command.threadId, ["subagents"])
        .pipe(mapDispatchError(command));
      if (hasRunningDelegatedTasks(records.subagents)) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} has running delegated tasks. Wait for them or cancel them before archiving.`,
        });
      }
    }
    if (command.type === "thread.unarchive" && thread.archivedAt === null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is not archived.`,
      });
    }
    if (
      (command.type === "thread.settle" ||
        command.type === "thread.unsettle" ||
        command.type === "thread.snooze" ||
        command.type === "thread.unsnooze" ||
        command.type === "thread.auto-settle.set" ||
        command.type === "thread.pin" ||
        command.type === "thread.unpin" ||
        command.type === "thread.pin.reorder" ||
        command.type === "thread.active.reorder" ||
        command.type === "thread.pull-request.sync") &&
      thread.archivedAt !== null
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is archived.`,
      });
    }
    // Reject reorder after unpin so a raced request cannot restore a cleared pin.
    if (command.type === "thread.pin.reorder" && thread.pinnedAt == null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is not pinned and cannot be reordered.`,
      });
    }
    if (
      command.type === "thread.active.reorder" &&
      (thread.pinnedAt != null || thread.settledOverride === "settled")
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is not active and cannot be reordered.`,
      });
    }
    if (command.type === "thread.pull-request.sync") {
      const project = yield* projects.get(command.projectId).pipe(mapDispatchError(command));
      const currentSequence = yield* eventSink.latestSequence({ threadId: command.threadId }).pipe(
        Effect.mapError(
          (cause) =>
            new OrchestratorProjectionError({
              threadId: command.threadId,
              cause,
            }),
        ),
      );
      if (
        Option.isNone(project) ||
        project.value.deletedAt !== null ||
        project.value.workspaceRoot !== command.expected.workspaceRoot ||
        // A replacement rewrites pullRequests, which the expected fields do not capture.
        (command.linkedPullRequest !== undefined && currentSequence > command.snapshotSequence) ||
        thread.projectId !== command.projectId ||
        thread.branch !== command.expected.branch ||
        thread.worktreePath !== command.expected.worktreePath ||
        !threadPullRequestLinksEqual(
          thread.linkedPullRequest ?? null,
          command.expected.linkedPullRequest,
        ) ||
        !threadPullRequestLinksEqual(
          thread.branchPullRequest ?? null,
          command.expected.branchPullRequest,
        )
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} changed before pull request discovery.`,
        });
      }
    }
    if (command.type === "thread.settle") {
      const projection = yield* loadProjectionForCommand(
        command,
        ["runs", "runtimeRequests", "providerThreads", "turnItems"],
        {
          turnItemTypes: ["command_execution", "dynamic_tool", "subagent"],
          turnItemStatuses: ["pending", "running", "waiting"],
        },
      );
      if (
        command.expectedLatestRunId !== undefined &&
        projection.runs.reduce<OrchestrationV2Run | undefined>(
          (latest, run) => (latest === undefined || run.ordinal > latest.ordinal ? run : latest),
          undefined,
        )?.id !== command.expectedLatestRunId
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "The thread received another run before settlement.",
        });
      }
      const queuedMessages = yield* projectionStore
        .getMessagesById(
          command.threadId,
          projection.runs.filter((run) => run.status === "queued").map((run) => run.userMessageId),
        )
        .pipe(mapDispatchError(command));
      const automaticMessageIds = new Set(
        [...queuedMessages.values()]
          .filter(
            (message) =>
              message.role === "user" &&
              (message.createdBy !== "user" ||
                message.scheduledTaskId !== undefined ||
                message.notification !== undefined ||
                message.delegatedCompletion !== undefined),
          )
          .map((message) => message.id),
      );
      const automaticQueuedRuns = projection.runs.filter(
        (run) => run.status === "queued" && automaticMessageIds.has(run.userMessageId),
      );
      const runningRunExists = projection.runs.some((run) =>
        ["preparing", "starting", "running", "waiting"].includes(run.status),
      );
      const queuedMessageExists = projection.runs.some(
        (run) => run.status === "queued" && !automaticQueuedRuns.includes(run),
      );
      const pendingRequests = projection.runtimeRequests.filter(
        (request) => request.status === "pending",
      );
      const blockingRequestExists = pendingRequests.some(
        (request) => request.kind !== "user_input" || request.responseCapability.type !== "message",
      );
      // Settling detaches the provider session, which ends the work running inside it. Hold for
      // the work auto-settle waits on. Delegated tasks run in their own thread and survive.
      const awaitedSessionWorkExists =
        !runningRunExists &&
        backgroundWorkHoldsCompletion(
          derivePendingBackgroundWork({
            latestRun: projection.runs.findLast((run) => run.status !== "queued"),
            providerThreads: projection.providerThreads,
            turnItems: projection.turnItems.filter(
              (item) => item.type !== "subagent" || item.origin !== "app_owned",
            ),
            activeProviderThreadId: projection.thread.activeProviderThreadId,
            runs: projection.runs,
          }),
        );
      const blocker = blockingRequestExists
        ? "is waiting on an approval or question. Answer it before settling."
        : runningRunExists
          ? "is still running. Stop it before settling."
          : queuedMessageExists
            ? "has a queued message. Send it or remove it from the queue before settling."
            : awaitedSessionWorkExists
              ? "is still running background agents or commands, and settling would end them. Wait for them to finish, or press Stop, then settle."
              : null;
      if (blocker !== null) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} ${blocker}`,
        });
      }

      for (const request of pendingRequests) {
        yield* dispatchRuntimeRequestRespond(
          {
            type: "runtime-request.respond",
            commandId: command.commandId,
            threadId: command.threadId,
            requestId: request.id,
            decision: "cancel",
          },
          events,
          effects,
        );
      }
      for (const run of automaticQueuedRuns) {
        yield* dispatchQueuedRunCancel(
          {
            type: "queued-run.cancel",
            commandId: command.commandId,
            threadId: command.threadId,
            runId: run.id,
          },
          events,
          "cohort",
        );
      }
    }

    const needsProviderState =
      command.type === "thread.runtime-mode.set" ||
      command.type === "thread.model-selection.set" ||
      command.type === "provider.switch" ||
      command.type === "thread.archive" ||
      command.type === "thread.settle" ||
      (command.type === "thread.metadata.update" &&
        command.worktreePath !== undefined &&
        command.worktreePath !== thread.worktreePath);
    const providerContext = needsProviderState
      ? yield* projectionStore
          .getThreadProviderContext(
            command.threadId,
            command.type === "thread.model-selection.set" || command.type === "provider.switch"
              ? command.modelSelection.instanceId
              : undefined,
          )
          .pipe(mapDispatchError(command))
      : null;
    const providerSwitchPlan =
      command.type === "thread.model-selection.set" || command.type === "provider.switch"
        ? yield* Effect.gen(function* () {
            yield* providerAdapters.get(command.modelSelection.instanceId).pipe(
              Effect.mapError(
                (cause) =>
                  new OrchestratorProviderAdapterError({
                    commandId: command.commandId,
                    providerInstanceId: command.modelSelection.instanceId,
                    cause,
                  }),
              ),
            );
            const plan = yield* providerSwitchService
              .plan({
                projection: providerContext!,
                targetModelSelection: command.modelSelection,
              })
              .pipe(mapDispatchError(command));
            if (plan.instanceChanged || plan.releaseProviderSessionIds.length > 0) {
              const projection = yield* loadProjectionForCommand(command, ["runs"], {
                turnItemTypes: [],
              });
              if (projection.runs.some(isActiveRun)) {
                return yield* new OrchestratorProviderSelectionBusyError({
                  commandId: command.commandId,
                  threadId: command.threadId,
                });
              }
            }
            return plan;
          })
        : null;

    // Archive and settle stop idle background work; serialized commands prevent starts racing detach.
    // Settlement rejects active or blocked runs.
    const detachSessionIds = new Set(
      command.type === "thread.archive" || command.type === "thread.settle"
        ? (providerContext?.providerSessions ?? []).map((session) => session.id)
        : command.type === "thread.metadata.update" &&
            command.worktreePath !== undefined &&
            command.worktreePath !== thread.worktreePath
          ? (providerContext?.providerSessions ?? []).map((session) => session.id)
          : command.type === "thread.runtime-mode.set"
            ? (providerContext?.providerSessions ?? [])
                .filter(
                  (session) => !session.capabilities.sessions.supportsRuntimeModeSwitchInSession,
                )
                .map((session) => session.id)
            : (providerSwitchPlan?.releaseProviderSessionIds ?? []),
    );
    const liveSessions = (providerContext?.providerSessions ?? []).filter(
      (session) =>
        detachSessionIds.has(session.id) &&
        session.status !== "stopped" &&
        session.status !== "error",
    );
    if (
      command.type !== "thread.archive" &&
      command.type !== "thread.settle" &&
      liveSessions.length > 0
    ) {
      // The provider context holds only the active and target provider threads; a session kept
      // busy by an earlier queued hand-off owns neither, so probe every thread of this one.
      const { providerThreads } = yield* projectionStore
        .getThreadRecords(command.threadId, ["providerThreads"], {
          omitSettledSubagentRecords: true,
        })
        .pipe(mapDispatchError(command));
      for (const session of liveSessions) {
        if (yield* sessionHasBackgroundWork(session, providerThreads)) {
          return yield* new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause:
              "The current session is still running background agents or commands, and this change would end them. Wait for them to finish, or press Stop, then try again.",
          });
        }
      }
    }

    const now = yield* DateTime.now;
    if (command.type === "thread.metadata.update" && command.limitRecovery != null) {
      const projection = yield* loadProjectionForCommand(
        command,
        ["runs", "runtimeRequests", "turnItems"],
        { turnItemTypes: ["error"] },
      );
      const run = usageLimitBlockedRun(projection.runs, projection.turnItems, null);
      const failure = latestRootProviderFailure(run, projection.turnItems);
      const resetMs = Date.parse(command.limitRecovery.resetAt);
      if (command.limitRecovery.snooze === true && resetMs <= DateTime.toEpochMillis(now)) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "The reset time has passed. Retry the thread manually.",
        });
      }
      if (thread.settledOverride === "settled") {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "The thread is settled. Un-settle it to resume at the reset.",
        });
      }
      if (
        !Number.isFinite(resetMs) ||
        thread.archivedAt !== null ||
        run?.id !== command.limitRecovery.runId ||
        failure?.class !== "usage_limit" ||
        failure.resetAt !== command.limitRecovery.resetAt ||
        resetMs <= DateTime.toEpochMillis(run.completedAt ?? run.requestedAt) ||
        projection.runtimeRequests.some((request) => request.status === "pending")
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "The provider limit changed before recovery could be configured.",
        });
      }
    }
    let restoredUnsettledAt: DateTime.Utc | null | undefined;
    if (command.type === "thread.unsettle" && command.restoreUnsettledAt !== undefined) {
      const parsed =
        command.restoreUnsettledAt === null
          ? Option.some(null)
          : DateTime.make(command.restoreUnsettledAt);
      if (Option.isNone(parsed)) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} unsettle anchor ${command.restoreUnsettledAt} is not a valid time.`,
        });
      }
      restoredUnsettledAt = parsed.value;
    }
    let snoozedUntil: DateTime.Utc | null = null;
    if (command.type === "thread.snooze") {
      const projection = yield* loadProjectionForCommand(command, ["runs", "runtimeRequests"], {
        turnItemTypes: [],
      });
      const parsedSnoozedUntil = DateTime.make(command.snoozedUntil);
      if (
        Option.isNone(parsedSnoozedUntil) ||
        DateTime.toEpochMillis(parsedSnoozedUntil.value) <= DateTime.toEpochMillis(now)
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} snooze wake time ${command.snoozedUntil} is not in the future.`,
        });
      }
      if (
        projection.runtimeRequests.some(
          (request) => request.status === "pending" && request.kind !== "user_input",
        )
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} has a pending approval and cannot be snoozed.`,
        });
      }
      const queuedRuns = projection.runs.filter((run) => run.status === "queued");
      const queuedMessages =
        queuedRuns.length === 0
          ? []
          : (yield* loadProjectionForCommand(command, ["messages"], {
              messageIds: queuedRuns.map((run) => run.userMessageId),
            })).messages;
      const automaticMessageIds = new Set(
        queuedMessages
          .filter(
            (message) =>
              message.notification !== undefined || message.delegatedCompletion !== undefined,
          )
          .map((message) => message.id),
      );
      const userRuns = queuedRuns.filter((run) => !automaticMessageIds.has(run.userMessageId));
      // User work waiting behind a usage limit cannot start until the reset or the user acts.
      const latest = latestExecutedRun(projection.runs);
      const limitRecords =
        userRuns.length === 0 || latest?.status !== "failed"
          ? null
          : yield* loadProjectionForCommand(command, ["turnItems", "providerSessions"], {
              turnItemTypes: ["error"],
              turnItemRunIds: [latest.id],
            });
      const heldBehindLimit =
        limitRecords !== null &&
        userRuns.every((run) =>
          usageLimitHoldsQueue({ ...limitRecords, runs: projection.runs }, run.providerInstanceId),
        );
      if (userRuns.length > 0 && !heldBehindLimit) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} has a queued run and cannot be snoozed.`,
        });
      }
      snoozedUntil = parsedSnoozedUntil.value;
    }
    let markUnreadVisitedAt: DateTime.Utc | null = null;
    if (command.type === "thread.mark-unread") {
      const shell = yield* projectionStore
        .getThreadShell(command.threadId)
        .pipe(
          Effect.mapError(
            (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
          ),
        );
      const latestRunCompletedAt = shell?.latestRunCompletedAt ?? null;
      if (latestRunCompletedAt === null) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Thread ${command.threadId} has no completed run to mark unread.`,
        });
      }
      markUnreadVisitedAt = DateTime.subtract(latestRunCompletedAt, { milliseconds: 1 });
    }
    const updatedThread: OrchestrationV2AppThread = (() => {
      switch (command.type) {
        case "thread.archive":
          return {
            ...thread,
            archivedAt: now,
            titleRegeneration: null,
            guestShare: null,
            pullRequests: thread.pullRequests?.map((link) => withPullRequestWatch(link, undefined)),
            updatedAt: now,
          };
        case "thread.unarchive":
          return { ...thread, archivedAt: null, updatedAt: now };
        case "thread.settle": {
          const wasPinned = thread.pinnedAt != null;
          const alreadySettled =
            thread.settledOverride === "settled" && thread.settledAt !== null && !wasPinned;
          return {
            ...thread,
            settledOverride: "settled",
            settledAt: alreadySettled ? thread.settledAt : (command.settledAt ?? now),
            // Settled threads refuse recovery, so an armed resume would stay hidden until un-settled.
            limitRecovery: thread.limitRecovery
              ? { ...thread.limitRecovery, autoResume: false, snooze: false }
              : thread.limitRecovery,
            pullRequests: thread.pullRequests?.map((link) => withPullRequestWatch(link, undefined)),
            unsettledAt: null,
            pinnedAt: null,
            pinOrderKey: null,
            activeOrderKey: null,
            snoozedUntil: null,
            snoozedAt: null,
            updatedAt:
              alreadySettled && thread.snoozedUntil == null && thread.snoozedAt == null
                ? thread.updatedAt
                : now,
          };
        }
        case "thread.unsettle": {
          const alreadyPinnedActive = thread.settledOverride === "active";
          return {
            ...thread,
            settledOverride: "active",
            settledAt: null,
            unsettledAt: alreadyPinnedActive
              ? (thread.unsettledAt ?? null)
              : restoredUnsettledAt === undefined
                ? now
                : restoredUnsettledAt,
            updatedAt: alreadyPinnedActive ? thread.updatedAt : now,
          };
        }
        case "thread.snooze": {
          // Re-snoozing acknowledges the latest wake even at the same time; commandId deduplicates retries.
          return {
            ...thread,
            snoozedUntil,
            limitRecovery: thread.limitRecovery ? { ...thread.limitRecovery, snooze: false } : null,
            snoozedAt: now,
            updatedAt: now,
          };
        }
        case "thread.unsnooze": {
          const alreadyAwake = thread.snoozedUntil == null;
          return {
            ...thread,
            snoozedUntil: null,
            snoozedAt: null,
            lastSnoozeWakeAt: alreadyAwake ? thread.lastSnoozeWakeAt : now,
            updatedAt: alreadyAwake ? thread.updatedAt : now,
          };
        }
        case "thread.auto-settle.set": {
          const unchanged = command.enabled === (thread.autoSettleDisabledAt == null);
          return {
            ...thread,
            autoSettleDisabledAt: command.enabled ? null : (thread.autoSettleDisabledAt ?? now),
            updatedAt: unchanged ? thread.updatedAt : now,
          };
        }
        case "thread.pin": {
          const alreadyPinned = thread.pinnedAt != null;
          const promotes = thread.settledOverride === "settled" || thread.snoozedUntil != null;
          return {
            ...thread,
            pinnedAt: alreadyPinned ? thread.pinnedAt : now,
            ...(alreadyPinned || command.orderKey === undefined
              ? {}
              : { pinOrderKey: command.orderKey }),
            settledOverride:
              thread.settledOverride === "settled" ? "active" : thread.settledOverride,
            settledAt: thread.settledOverride === "settled" ? null : thread.settledAt,
            ...(thread.settledOverride === "settled" ? { unsettledAt: now } : {}),
            snoozedUntil: null,
            snoozedAt: null,
            lastSnoozeWakeAt: thread.snoozedUntil == null ? thread.lastSnoozeWakeAt : now,
            updatedAt: alreadyPinned && !promotes ? thread.updatedAt : now,
          };
        }
        case "thread.unpin": {
          const alreadyUnpinned = thread.pinnedAt == null;
          return {
            ...thread,
            pinnedAt: null,
            pinOrderKey: null,
            updatedAt: alreadyUnpinned ? thread.updatedAt : now,
          };
        }
        case "thread.pin.reorder": {
          const keyUnchanged = thread.pinOrderKey === command.orderKey;
          return {
            ...thread,
            pinOrderKey: command.orderKey,
            updatedAt: keyUnchanged ? thread.updatedAt : now,
          };
        }
        case "thread.active.reorder": {
          return {
            ...thread,
            activeOrderKey: command.orderKey,
            updatedAt: thread.updatedAt,
          };
        }
        case "thread.tag.set": {
          const current = thread.tags ?? [];
          return {
            ...thread,
            tags: command.tagged
              ? current.includes(command.tag)
                ? current
                : [...current, command.tag]
              : current.filter((tag) => tag !== command.tag),
          };
        }
        case "thread.mark-unread": {
          // Retire the wake before rewinding the visit, preserving its settlement timer.
          const snoozeExpired =
            thread.snoozedUntil != null &&
            DateTime.toEpochMillis(thread.snoozedUntil) <= DateTime.toEpochMillis(now);
          return {
            ...thread,
            lastVisitedAt: markUnreadVisitedAt,
            ...(snoozeExpired
              ? { snoozedUntil: null, snoozedAt: null, lastSnoozeWakeAt: thread.snoozedUntil }
              : {}),
          };
        }
        case "thread.metadata.update": {
          const previousRecovery =
            thread.limitRecovery?.runId === command.limitRecovery?.runId &&
            thread.limitRecovery?.resetAt === command.limitRecovery?.resetAt
              ? thread.limitRecovery
              : null;
          const limitRecovery =
            command.limitRecovery === undefined
              ? thread.limitRecovery
              : command.limitRecovery === null
                ? null
                : {
                    ...command.limitRecovery,
                    autoResume:
                      command.limitRecovery.autoResume ?? previousRecovery?.autoResume ?? false,
                    snooze: command.limitRecovery.snooze ?? previousRecovery?.snooze ?? false,
                    requestId: command.commandId,
                  };
          return {
            ...thread,
            ...(command.title === undefined ? {} : { title: command.title, titleRenamed: true }),
            ...(command.limitRecovery === undefined ? {} : { limitRecovery }),
            ...(command.limitRecovery !== undefined &&
            limitRecovery?.snooze === true &&
            Date.parse(limitRecovery.resetAt) > DateTime.toEpochMillis(now)
              ? {
                  snoozedUntil: DateTime.makeUnsafe(limitRecovery.resetAt),
                  // Recovery updates acknowledge the same stopped run; their timestamps must not trigger fresh failure wakes.
                  snoozedAt: now,
                }
              : command.limitRecovery !== undefined &&
                  thread.limitRecovery?.snooze &&
                  thread.snoozedUntil != null &&
                  DateTime.toEpochMillis(thread.snoozedUntil) ===
                    Date.parse(thread.limitRecovery.resetAt)
                ? { snoozedUntil: null, snoozedAt: null, lastSnoozeWakeAt: now }
                : {}),
            ...(command.branch === undefined ? {} : { branch: command.branch }),
            ...(command.worktreePath === undefined ? {} : { worktreePath: command.worktreePath }),
            ...(command.linkedPullRequest === undefined
              ? {}
              : {
                  linkedPullRequest: command.linkedPullRequest,
                  pullRequests: [
                    ...threadPullRequestsOf(thread).filter(
                      (link) =>
                        !(
                          thread.linkedPullRequest &&
                          threadPullRequestKeysEqual(
                            link,
                            legacyThreadPullRequestKey(thread.linkedPullRequest),
                          )
                        ) &&
                        !(
                          command.linkedPullRequest &&
                          threadPullRequestKeysEqual(
                            link,
                            legacyThreadPullRequestKey(command.linkedPullRequest),
                          )
                        ),
                    ),
                    ...(command.linkedPullRequest
                      ? [legacyPullRequestLink(thread, command.linkedPullRequest, now)]
                      : []),
                  ],
                }),
            ...(command.regenerateTitle === true
              ? { titleRegeneration: { requestId: command.commandId, startedAt: now } }
              : command.regenerateTitle === false || command.title !== undefined
                ? { titleRegeneration: null }
                : {}),
            updatedAt: now,
          };
        }
        case "thread.pull-request.link":
        case "thread.pull-request.unlink":
        case "thread.pull-request-link.sync": {
          const key = normalizeThreadPullRequestKey(command);
          const links = threadPullRequestsOf(thread);
          const existing = links.find((link) => threadPullRequestKeysEqual(link, key));
          let pullRequests = links;
          if (command.type === "thread.pull-request.link") {
            const undismisses =
              existing?.source === "stack-dismissed" &&
              command.source !== "stack" &&
              command.source !== "stack-dismissed";
            if (existing && !undismisses) return thread;
            const link = existing
              ? {
                  ...existing,
                  source: command.source,
                  url: canonicalizeGitCafePullRequestUrl(command.url),
                  ...(command.repositoryWebUrl !== undefined && {
                    repositoryWebUrl: command.repositoryWebUrl,
                  }),
                }
              : {
                  ...key,
                  url: canonicalizeGitCafePullRequestUrl(command.url),
                  ...(command.repositoryWebUrl !== undefined && {
                    repositoryWebUrl: command.repositoryWebUrl,
                  }),
                  source: command.source,
                  linkedAt: DateTime.formatIso(now),
                  snapshot: null,
                  stack: null,
                };
            const branch = thread.branchPullRequest;
            const branchKey = branch ? legacyThreadPullRequestKey(branch) : null;
            // A link hides the branch pull request, so the first one keeps it: always when the
            // user links, and for one opened here when it is in another repository, such as a
            // tracked one.
            const keepsBranchPullRequest =
              command.source === "manual" ||
              (command.source === "created" &&
                branchKey !== null &&
                (branchKey.host !== key.host || branchKey.repository !== key.repository));
            pullRequests = [
              ...(keepsBranchPullRequest &&
              branch &&
              branchKey &&
              visibleThreadPullRequests(links).length === 0 &&
              !threadPullRequestKeysEqual(branchKey, key) &&
              !links.some((entry) => threadPullRequestKeysEqual(entry, branchKey))
                ? [
                    {
                      ...branchKey,
                      url: canonicalizeGitCafePullRequestUrl(branch.url),
                      source: "manual" as const,
                      linkedAt: DateTime.formatIso(now),
                      snapshot: null,
                      stack: null,
                    },
                  ]
                : []),
              ...links.filter((entry) => !threadPullRequestKeysEqual(entry, key)),
              link,
            ];
          } else if (command.type === "thread.pull-request.unlink") {
            if (!existing) return thread;
            const belongsToStack =
              existing.source === "stack" ||
              existing.stack !== null ||
              links.some(
                (link) =>
                  link.host.toLowerCase() === key.host &&
                  link.repository.toLowerCase() === key.repository &&
                  link.stack?.layers.some((layer) => layer.number === key.number),
              );
            pullRequests = belongsToStack
              ? links.map((link) =>
                  link === existing
                    ? {
                        ...withPullRequestWatch(link, undefined),
                        source: "stack-dismissed" as const,
                      }
                    : link,
                )
              : links.filter((link) => link !== existing);
          } else {
            if (!existing) return thread;
            pullRequests = links.map((link) =>
              link === existing
                ? { ...link, snapshot: command.snapshot, stack: command.stack }
                : link,
            );
          }
          return {
            ...thread,
            pullRequests,
            linkedPullRequest:
              thread.linkedPullRequest &&
              pullRequests.some(
                (link) =>
                  link.source !== "stack-dismissed" &&
                  threadPullRequestKeysEqual(
                    link,
                    legacyThreadPullRequestKey(thread.linkedPullRequest!),
                  ),
              )
                ? thread.linkedPullRequest
                : null,
            updatedAt: command.type === "thread.pull-request-link.sync" ? thread.updatedAt : now,
          };
        }
        case "thread.issue.link":
        case "thread.issue.unlink": {
          const links = thread.issues ?? [];
          const existing = links.find((link) => threadIssueKeysEqual(link, command));
          if (command.type === "thread.issue.unlink") {
            if (!existing) return thread;
            return { ...thread, issues: links.filter((link) => link !== existing), updatedAt: now };
          }
          if (existing) return thread;
          return {
            ...thread,
            issues: [
              ...links,
              {
                tracker: command.tracker,
                host: command.host.trim().toLowerCase(),
                scope: command.scope.trim(),
                key: command.key.trim(),
                projectId: command.projectId,
                url: command.url,
                displayKey: command.displayKey,
                title: command.title,
                source: command.source,
                linkedAt: DateTime.formatIso(now),
              },
            ],
            updatedAt: now,
          };
        }
        case "thread.pull-request-watch.checks-reopen": {
          const linked = threadPullRequestsOf(thread);
          if (!linked.some((link) => link.watch?.checksPending !== undefined)) return thread;
          return {
            ...thread,
            pullRequests: linked.map((link) =>
              link.watch?.checksPending === undefined
                ? link
                : { ...link, watch: withoutChecksAnswer(link.watch) },
            ),
          };
        }
        case "thread.pull-request.watch":
        case "thread.pull-request-watch.sync": {
          const key = normalizeThreadPullRequestKey(command);
          const startedAt = DateTime.formatIso(now);
          const linked = threadPullRequestsOf(thread);
          const visible = (link: ThreadPullRequestLink) =>
            link.source !== "stack-dismissed" && threadPullRequestKeysEqual(link, key);
          const dismissed = linked.find((link) => threadPullRequestKeysEqual(link, key));
          const links =
            command.type === "thread.pull-request.watch" &&
            command.watching &&
            command.link !== undefined &&
            !linked.some(visible)
              ? [
                  ...linked.filter((link) => !threadPullRequestKeysEqual(link, key)),
                  {
                    ...key,
                    url: canonicalizeGitCafePullRequestUrl(command.link.url),
                    ...((command.link.repositoryWebUrl ?? dismissed?.repositoryWebUrl) !==
                      undefined && {
                      repositoryWebUrl:
                        command.link.repositoryWebUrl ?? dismissed?.repositoryWebUrl,
                    }),
                    source: command.link.source,
                    linkedAt: startedAt,
                    snapshot: null,
                    stack: null,
                    ...(dismissed?.endedWatch && { endedWatch: dismissed.endedWatch }),
                  },
                ]
              : linked;
          const existing = links.find(visible);
          if (existing === undefined) return thread;
          const watch =
            command.type === "thread.pull-request-watch.sync"
              ? existing.watch?.startedAt === command.startedAt
                ? syncedPullRequestWatch(existing.watch, command)
                : existing.watch
              : !command.watching
                ? undefined
                : withUntil(
                    existing.watch ?? {
                      startedAt,
                      headSha: null,
                      failedChecks: [],
                      passed: false,
                      passedChecks: [],
                      conflicting: false,
                      // Watching again must not repeat check or conflict news the last watch told.
                      ...(existing.endedWatch && {
                        headSha: existing.endedWatch.headSha,
                        failedChecks: existing.endedWatch.failedChecks,
                        passed: existing.endedWatch.passed,
                        passedChecks: existing.endedWatch.passedChecks,
                        conflicting: existing.endedWatch.conflicting,
                        rebaseRequired: existing.endedWatch.rebaseRequired,
                      }),
                      awaitingBaseline: existing.endedWatch
                        ? existing.endedWatch.awaitingBaseline
                        : "all",
                      ...(existing.endedWatch?.owedChecks !== undefined && {
                        owedChecks: existing.endedWatch.owedChecks,
                      }),
                      ...(existing.endedWatch?.awaitingApproval !== undefined && {
                        awaitingApproval: existing.endedWatch.awaitingApproval,
                      }),
                      ...(existing.endedWatch?.approvalAnnounced !== undefined && {
                        approvalAnnounced: existing.endedWatch.approvalAnnounced,
                      }),
                      // CI pending with no failure yet at the start may fail before the first
                      // read. A caller's fresh read beats the link's last sync; a finished-checks
                      // answer kept from the last watch may be an older head's.
                      ...((command.type === "thread.pull-request.watch" &&
                      command.checksPending !== undefined
                        ? command.checksPending
                        : existing.snapshot?.checksState === "pending" ||
                          existing.endedWatch?.checksPending === true) && { checksPending: true }),
                      ...(existing.endedWatch?.checksAwaitedSince !== undefined && {
                        checksAwaitedSince: existing.endedWatch.checksAwaitedSince,
                      }),
                      remarksThrough: startedAt,
                      remarkIds: [],
                      wakes: 0,
                    },
                    command.until,
                  );
          if (watch === existing.watch && links === linked) return thread;
          const final =
            command.type === "thread.pull-request-watch.sync" && watch === undefined
              ? command.endedWatch
              : undefined;
          return {
            ...thread,
            pullRequests: links.map((link) =>
              link === existing
                ? withPullRequestWatch(final ? { ...link, watch: final } : link, watch)
                : link,
            ),
            updatedAt: command.type === "thread.pull-request.watch" ? now : thread.updatedAt,
          };
        }
        case "thread.pull-request.sync":
          return {
            ...thread,
            branchPullRequest: command.branchPullRequest,
            ...(command.linkedPullRequest === undefined
              ? {}
              : {
                  linkedPullRequest: command.linkedPullRequest,
                  pullRequests: [
                    ...threadPullRequestsOf(thread).filter(
                      (link) =>
                        !(
                          thread.linkedPullRequest &&
                          threadPullRequestKeysEqual(
                            link,
                            legacyThreadPullRequestKey(thread.linkedPullRequest),
                          )
                        ) &&
                        !(
                          command.linkedPullRequest &&
                          threadPullRequestKeysEqual(
                            link,
                            legacyThreadPullRequestKey(command.linkedPullRequest),
                          )
                        ),
                    ),
                    ...(command.linkedPullRequest
                      ? [legacyPullRequestLink(thread, command.linkedPullRequest, now)]
                      : []),
                  ],
                }),
            updatedAt: thread.updatedAt,
          };
        case "thread.title.regeneration.complete":
          return thread.titleRegeneration?.requestId === command.requestId
            ? {
                ...thread,
                ...(command.title === undefined
                  ? {}
                  : { title: command.title, titleRenamed: false }),
                ...(command.outcome === undefined
                  ? {}
                  : {
                      lastTitleRegeneration: {
                        ...command.outcome,
                        requestId: command.requestId,
                        completedAt: now,
                      },
                    }),
                titleRegeneration: null,
                updatedAt: now,
              }
            : thread;
        case "thread.runtime-mode.set":
          return { ...thread, runtimeMode: command.runtimeMode, updatedAt: now };
        case "thread.interaction-mode.set":
          return { ...thread, interactionMode: command.interactionMode, updatedAt: now };
        case "thread.model-selection.set":
        case "provider.switch":
          return {
            ...thread,
            providerInstanceId: command.modelSelection.instanceId,
            modelSelection: command.modelSelection,
            updatedAt: now,
          };
      }
    })();
    if (command.type === "thread.pull-request-watch.checks-reopen") {
      if (updatedThread === thread) return;
      yield* emit(
        events,
        command,
      )({
        type: "thread.pull-request-synced",
        threadId: command.threadId,
        providerInstanceId: updatedThread.providerInstanceId,
        occurredAt: now,
        payload: updatedThread,
      });
      return;
    }
    if (
      command.type === "thread.pull-request-link.sync" ||
      command.type === "thread.pull-request-watch.sync"
    ) {
      if (updatedThread === thread) return;
      const link = threadPullRequestsOf(updatedThread).find((candidate) =>
        threadPullRequestKeysEqual(candidate, normalizeThreadPullRequestKey(command)),
      );
      if (link === undefined) return;
      yield* emit(
        events,
        command,
      )({
        type: "thread.pull-request-link-updated",
        threadId: command.threadId,
        providerInstanceId: updatedThread.providerInstanceId,
        occurredAt: now,
        payload: link,
      });
      return;
    }
    const eventType = (() => {
      switch (command.type) {
        case "thread.archive":
          return "thread.archived" as const;
        case "thread.unarchive":
          return "thread.unarchived" as const;
        case "thread.settle":
          return "thread.settled" as const;
        case "thread.unsettle":
          return "thread.unsettled" as const;
        case "thread.snooze":
          return "thread.snoozed" as const;
        case "thread.unsnooze":
          return "thread.unsnoozed" as const;
        case "thread.auto-settle.set":
          return "thread.auto-settle-set" as const;
        case "thread.pin":
          return "thread.pinned" as const;
        case "thread.unpin":
          return "thread.unpinned" as const;
        case "thread.pin.reorder":
          return "thread.pin-reordered" as const;
        case "thread.active.reorder":
          return "thread.active-reordered" as const;
        case "thread.tag.set":
          return "thread.tags-updated" as const;
        case "thread.mark-unread":
          return "thread.marked-unread" as const;
        case "thread.metadata.update":
        case "thread.title.regeneration.complete":
          return "thread.metadata-updated" as const;
        case "thread.pull-request.link":
        case "thread.pull-request.unlink":
        case "thread.pull-request.watch":
        case "thread.pull-request.sync":
          return "thread.pull-request-synced" as const;
        case "thread.issue.link":
        case "thread.issue.unlink":
          return "thread.issue-synced" as const;
        case "thread.runtime-mode.set":
          return "thread.runtime-mode-updated" as const;
        case "thread.interaction-mode.set":
          return "thread.interaction-mode-updated" as const;
        case "thread.model-selection.set":
          return thread.providerInstanceId === command.modelSelection.instanceId
            ? ("thread.model-selection-updated" as const)
            : ("thread.provider-switched" as const);
        case "provider.switch":
          return "thread.provider-switched" as const;
      }
    })();
    yield* emit(
      events,
      command,
    )({
      type: eventType,
      threadId: command.threadId,
      providerInstanceId: updatedThread.providerInstanceId,
      occurredAt: now,
      payload: updatedThread,
    });
    // Archiving ends the guest share, so its waiting files go too.
    yield* releaseGuestAttachments(command, thread.guestShare, updatedThread.guestShare, effects);

    if (
      command.type === "thread.model-selection.set" &&
      providerSwitchPlan !== null &&
      !providerSwitchPlan.instanceChanged &&
      providerSwitchPlan.releaseProviderSessionIds.length === 0
    ) {
      const { providerThread, providerTurn } = yield* projectionStore
        .getRunningTurnContext(command.threadId)
        .pipe(mapDispatchError(command));
      const providerSessionId = providerThread?.providerSessionId;
      if (providerThread !== undefined && providerTurn !== undefined && providerSessionId) {
        const session = yield* providerSessions.get(providerSessionId).pipe(
          Effect.mapError(
            (cause) =>
              new OrchestratorDispatchError({
                commandId: command.commandId,
                commandType: command.type,
                cause,
              }),
          ),
        );
        if (Option.isSome(session) && session.value.applyModelSelection !== undefined) {
          yield* Ref.update(effects, (existing) => [
            ...existing,
            {
              id: `effect:${command.commandId}:provider-session.apply-model-selection`,
              commandId: command.commandId,
              threadId: command.threadId,
              request: {
                type: "provider-session.apply-model-selection",
                providerSessionId,
                providerThreadId: providerThread.id,
                modelSelection: command.modelSelection,
              },
            } satisfies PendingOrchestrationEffectV2,
          ]);
        }
      }
    }

    // Queued even while no session is live: it runs after any in-flight turn start publishes one.
    if (
      (command.type === "thread.metadata.update" ||
        command.type === "thread.title.regeneration.complete") &&
      updatedThread.title !== thread.title
    ) {
      yield* Ref.update(effects, (existing) => [
        ...existing,
        {
          id: `effect:${command.commandId}:provider-session.apply-thread-title`,
          commandId: command.commandId,
          threadId: command.threadId,
          request: { type: "provider-session.apply-thread-title", title: updatedThread.title },
        } satisfies PendingOrchestrationEffectV2,
      ]);
    }

    if (command.type === "thread.metadata.update" && command.regenerateTitle === true) {
      yield* Ref.update(effects, (existing) => [
        ...existing,
        pendingThreadTitleGenerationEffect(command.commandId, command.threadId, {
          type: "regenerate",
        }),
      ]);
    }

    if (command.type === "thread.archive") {
      const projection = yield* loadProjectionForCommand(
        command,
        ["runs", "attempts", "nodes", "subagents", "messages"],
        { turnItemTypes: [], messageRoles: ["user"] },
      );
      const emitEvent = emit(events, command);
      const activeRunIds = new Set(
        projection.runs
          .filter((run) => run.status === "queued" || run.status === "preparing")
          .map((run) => run.id),
      );
      const preparingRuns = projection.runs.filter((run) => run.status === "preparing");
      const preparationItems =
        preparingRuns.length === 0
          ? []
          : (yield* loadProjectionForCommand(command, ["turnItems"], {
              turnItemTypes: ["command_execution"],
              turnItemRunIds: preparingRuns.map((run) => run.id),
            })).turnItems;
      for (const run of projection.runs.filter((candidate) => activeRunIds.has(candidate.id))) {
        yield* emitEvent({
          type: "run.updated",
          threadId: command.threadId,
          runId: run.id,
          providerInstanceId: run.providerInstanceId,
          occurredAt: now,
          payload: { ...run, status: "cancelled", queuePosition: null, completedAt: now },
        });
      }
      for (const run of preparingRuns) {
        const preparationItem = preparationItems.find(
          (item) =>
            item.runId === run.id &&
            item.type === "command_execution" &&
            item.input === WORKSPACE_PREPARATION_INPUT &&
            item.status === "running",
        );
        if (preparationItem === undefined) continue;
        yield* emitEvent({
          type: "turn-item.updated",
          threadId: command.threadId,
          runId: run.id,
          nodeId: preparationItem.nodeId ?? undefined,
          providerInstanceId: run.providerInstanceId,
          occurredAt: now,
          payload: {
            ...preparationItem,
            status: "cancelled",
            title: "Workspace preparation cancelled",
            completedAt: now,
            updatedAt: now,
          },
        });
      }
      for (const attempt of projection.attempts.filter(
        (candidate) =>
          activeRunIds.has(candidate.runId) &&
          (candidate.status === "pending" || candidate.status === "running"),
      )) {
        const run = projection.runs.find((candidate) => candidate.id === attempt.runId)!;
        yield* emitEvent({
          type: "run-attempt.updated",
          threadId: command.threadId,
          runId: attempt.runId,
          nodeId: attempt.rootNodeId,
          providerInstanceId: run.providerInstanceId,
          occurredAt: now,
          payload: { ...attempt, status: "cancelled", completedAt: now },
        });
      }
      for (const node of projection.nodes.filter(
        (candidate) =>
          candidate.runId !== null &&
          activeRunIds.has(candidate.runId) &&
          ["pending", "running", "waiting"].includes(candidate.status),
      )) {
        const run = projection.runs.find((candidate) => candidate.id === node.runId)!;
        yield* emitEvent({
          type: "node.updated",
          threadId: command.threadId,
          runId: run.id,
          nodeId: node.id,
          providerInstanceId: run.providerInstanceId,
          occurredAt: now,
          payload: { ...node, status: "cancelled", completedAt: now },
        });
      }
      yield* disposeAllDelegatedCompletionCohorts({
        command,
        events,
        projection: yield* getProjectionWithPendingEvents(command.threadId, events),
        now,
        cancelQueuedDelivery: false,
      });
    }
    if (command.type === "thread.archive" || command.type === "thread.settle") {
      yield* closePendingLinkRequests({ command, events, threadId: command.threadId, now });
    }

    if (liveSessions.length > 0) {
      yield* Effect.forEach(
        liveSessions,
        (session) =>
          Effect.gen(function* () {
            yield* emit(
              events,
              command,
            )({
              type: "provider-session.detached",
              threadId: command.threadId,
              driver: session.driver,
              providerInstanceId: session.providerInstanceId,
              occurredAt: now,
              payload: {
                providerSessionId: session.id,
                detachedAt: now,
                reason:
                  command.type === "thread.archive"
                    ? "Thread archived."
                    : command.type === "thread.settle"
                      ? "Thread settled."
                      : command.type === "thread.metadata.update"
                        ? "Workspace changed."
                        : command.type === "thread.runtime-mode.set"
                          ? "Runtime mode changed."
                          : "Provider or model selection changed.",
              },
            });
            const pendingEffect = {
              id: `effect:${command.commandId}:provider-session.detach:${session.id}`,
              commandId: command.commandId,
              threadId: command.threadId,
              request: {
                type: "provider-session.detach",
                providerSessionId: session.id,
                detail:
                  command.type === "thread.archive"
                    ? "Thread archived."
                    : command.type === "thread.settle"
                      ? "Thread settled."
                      : command.type === "thread.metadata.update"
                        ? "Workspace changed."
                        : command.type === "thread.runtime-mode.set"
                          ? "Runtime mode changed."
                          : "Provider or model selection changed.",
                // Terminal detaches revoke MCP credentials; reattachments need other detach reasons to preserve them.
                ...(command.type === "thread.archive" ? { revokeMcpCredential: true } : {}),
              },
            } satisfies PendingOrchestrationEffectV2;
            yield* Ref.update(effects, (existing) => [...existing, pendingEffect]);
          }),
        { concurrency: 1, discard: true },
      );
    }

    if (command.type === "thread.archive") {
      yield* Ref.update(effects, (existing) => [
        ...existing,
        {
          id: `effect:${command.commandId}:terminal.cleanup`,
          commandId: command.commandId,
          threadId: command.threadId,
          request: { type: "terminal.cleanup" },
        } satisfies PendingOrchestrationEffectV2,
      ]);
    }
  });
