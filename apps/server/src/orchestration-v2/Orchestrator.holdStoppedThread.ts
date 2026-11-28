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
export const bindHoldStoppedThread = (ctx: any) =>
  Effect.fn("Orchestrator.holdStoppedThread")(function* (input: {
    readonly command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "run.interrupt" | "thread.stop" }
    >;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly projection: Pick<OrchestrationV2ThreadProjection, "thread" | "runs" | "subagents">;
    readonly cohortRunIds: ReadonlyArray<RunId>;
    readonly now: DateTime.Utc;
  }) {
    const {
      OrchestratorProjectionError,
      awaitsRestartContinuation,
      closePendingLinkRequests,
      dispatchQueuedRunCancel,
      disposeDelegatedCompletionCohort,
      emit,
      getProjectionWithPendingEvents,
      mapDispatchError,
      markStoppedRun,
      projectionStore,
      withPullRequestWatch,
    } = pickScriptcBindCtx(ctx);

    const emitEvent = emit(input.events, input.command);
    const { runs, subagents } = input.projection;
    let { thread } = input.projection;
    let recovery = thread.limitRecovery;
    const latest = latestExecutedRun(runs);
    if (latest?.status === "failed") {
      const { turnItems } = yield* projectionStore
        .getThreadRecords(thread.id, ["turnItems"], {
          turnItemTypes: ["error"],
          turnItemRunIds: [latest.id],
        })
        .pipe(mapDispatchError(input.command));
      const failure = latestRootProviderFailure(latest, turnItems);
      if (
        failure?.class === "usage_limit" &&
        failure.resetAt != null &&
        Number.isFinite(Date.parse(failure.resetAt)) &&
        (recovery?.runId !== latest.id || recovery.resetAt !== failure.resetAt)
      ) {
        recovery = {
          runId: latest.id,
          resetAt: failure.resetAt,
          autoResume: false,
          snooze: false,
        };
      }
    }
    if (recovery && (recovery !== thread.limitRecovery || recovery.autoResume)) {
      thread = {
        ...thread,
        limitRecovery: {
          ...recovery,
          autoResume: false,
          requestId: input.command.commandId,
        },
        updatedAt: input.now,
      };
      yield* emitEvent({
        type: "thread.metadata-updated",
        threadId: thread.id,
        occurredAt: input.now,
        payload: thread,
      });
    }
    const queuedRuns = runs.filter((run) => run.status === "queued");
    const queuedMessages =
      queuedRuns.length === 0
        ? []
        : (yield* projectionStore
            .getThreadRecords(thread.id, ["messages"], {
              messageIds: queuedRuns.map((run) => run.userMessageId),
            })
            .pipe(
              Effect.mapError(
                (cause) => new OrchestratorProjectionError({ threadId: thread.id, cause }),
              ),
            )).messages;
    const bufferedMessageIds = new Set(
      queuedMessages.filter(isBufferedProviderNotification).map((message) => message.id),
    );
    for (const run of runs) {
      // A resumed queue can have a lower ordinal than a pending continuation source.
      // Stop must reach those sources even when interrupting the resumed run succeeds.
      if (
        (run.status === "cancelled" ||
          (run.status === "failed" && run.restartContinuationOfRunId !== undefined)) &&
        (yield* awaitsRestartContinuation(run).pipe(mapDispatchError(input.command)))
      ) {
        yield* markStoppedRun({ ...input, thread, run });
      }
      if (run.status !== "queued") continue;
      if (bufferedMessageIds.has(run.userMessageId)) {
        yield* dispatchQueuedRunCancel(
          {
            type: "queued-run.cancel",
            commandId: input.command.commandId,
            threadId: thread.id,
            runId: run.id,
          },
          input.events,
        );
        continue;
      }
      if (run.queueHeld === true) continue;
      yield* emitEvent({
        type: "run.updated",
        threadId: thread.id,
        runId: run.id,
        providerInstanceId: run.providerInstanceId,
        occurredAt: input.now,
        payload: { ...run, queueHeld: true },
      });
    }
    const pullRequests = thread.pullRequests ?? [];
    if (pullRequests.some((link) => link.watch !== undefined)) {
      yield* emitEvent({
        type: "thread.pull-request-synced",
        threadId: thread.id,
        providerInstanceId: thread.providerInstanceId,
        occurredAt: input.now,
        payload: {
          ...thread,
          pullRequests: pullRequests.map((link) => withPullRequestWatch(link, undefined)),
        },
      });
    }
    const cohortRunIds = new Set(input.cohortRunIds);
    for (const run of runs) {
      if (run.delegatedCompletion?.delivery != null) cohortRunIds.add(run.id);
    }
    for (const task of subagents) {
      const delivery = task.completionDelivery?.state;
      if (
        task.origin === "app_owned" &&
        task.runId !== null &&
        delivery !== "acknowledged" &&
        delivery !== "delivered" &&
        delivery !== "disposed"
      ) {
        cohortRunIds.add(task.runId);
      }
    }
    // Each disposal reads the events the ones before it wrote.
    for (const parentRunId of cohortRunIds) {
      yield* disposeDelegatedCompletionCohort({
        command: input.command,
        events: input.events,
        projection: yield* getProjectionWithPendingEvents(thread.id, input.events),
        parentRunId,
        disposition: "stopped",
        now: input.now,
      });
    }
    yield* closePendingLinkRequests({ ...input, threadId: thread.id });
  });
