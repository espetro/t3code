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
export const bindDispatchThreadStop = (ctx: any) =>
  Effect.fn("Orchestrator.dispatchThreadStop")(function* (
    command: Extract<OrchestrationV2ServerCommand, { readonly type: "thread.stop" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const {
      OrchestratorProjectionError,
      cancelIdleOrphans,
      delegatedTasksStopEffect,
      dispatchRunInterrupt,
      endNativeSubagentTrees,
      hasLiveRun,
      holdStoppedThread,
      mapDispatchError,
      markStoppedRun,
      nativeSubagentRef,
      projectionStore,
    } = pickScriptcBindCtx(ctx);

    const projection = yield* projectionStore
      .getThreadRecords(command.threadId, ["runs", "providerThreads", "turnItems", "subagents"], {
        turnItemTypes: ["command_execution", "dynamic_tool", "subagent"],
        turnItemStatuses: ["pending", "running", "waiting"],
      })
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
        ),
      );
    if (projection.thread.deletedAt !== null) return undefined;
    // Queued after the interrupt, since a thread's effects run in order.
    const stopDelegatedTasks =
      command.stopDelegatedTasks === false ||
      !projection.subagents.some(
        (task) =>
          task.origin === "app_owned" &&
          (task.childThreadId !== null || task.remoteChild !== undefined),
      )
        ? Effect.void
        : Ref.update(effects, (existing) => [...existing, delegatedTasksStopEffect(command)]);
    const latestRun = projection.runs.findLast((run) => run.status !== "queued");
    const target =
      projection.runs.findLast(
        (run) =>
          run.status === "preparing" || run.status === "starting" || run.status === "running",
      ) ??
      (derivePendingBackgroundWork({
        latestRun,
        providerThreads: projection.providerThreads,
        turnItems: projection.turnItems,
        activeProviderThreadId: projection.thread.activeProviderThreadId,
        runs: projection.runs,
      }).length > 0
        ? latestRun
        : undefined);
    if (target !== undefined) {
      const interruptEvents = yield* Ref.make<Array<OrchestrationV2DomainEvent>>([]);
      const interruptEffects = yield* Ref.make<Array<PendingOrchestrationEffectV2>>([]);
      const interrupted = yield* Effect.exit(
        dispatchRunInterrupt(
          {
            type: "run.interrupt",
            commandId: command.commandId,
            threadId: command.threadId,
            runId: target.id,
            holdQueue: true,
            ...(command.reason === undefined ? {} : { reason: command.reason }),
          },
          interruptEvents,
          interruptEffects,
        ),
      );
      // A failed interrupt may have written part of its events, so they are kept apart.
      const interruptOutcome = Exit.match(interrupted, {
        onFailure: (cause) => ({ kind: "failure" as const, cause }),
        onSuccess: (value) => ({ kind: "success" as const, value }),
      });
      if (interruptOutcome.kind === "failure") {
        yield* Effect.logWarning("thread.stop could not interrupt the running turn", {
          threadId: command.threadId,
          runId: target.id,
          cause: interruptOutcome.cause,
        });
      } else {
        const interruptResult = interruptOutcome.value;
        const written = yield* Ref.get(interruptEvents);
        const enqueued = yield* Ref.get(interruptEffects);
        yield* Ref.update(events, (existing) => [...existing, ...written]);
        yield* Ref.update(effects, (existing) => [...existing, ...enqueued]);
        yield* cancelIdleOrphans({ command, events, projection });
        yield* stopDelegatedTasks;
        return interruptResult;
      }
    }
    const now = yield* DateTime.now;
    // Record that Stop reached the turn it could not interrupt and the thread's last executed
    // run, so a late tool call from their agent starts nothing.
    const executed = latestExecutedRun(projection.runs);
    const reached = new Map<RunId, OrchestrationV2Run>();
    if (target !== undefined) reached.set(target.id, target);
    if (executed !== null && !hasLiveRun({ runs: [executed] })) reached.set(executed.id, executed);
    for (const run of reached.values()) {
      yield* markStoppedRun({ command, events, thread: projection.thread, run, now });
    }
    // Record and item are written together, so an active record without a live item lost its end.
    const staleNative = (target === undefined ? projection.subagents : []).filter(
      (subagent) =>
        subagent.origin === "provider_native" &&
        subagent.runId !== null &&
        isOrchestrationV2WorkActive(subagent.status) &&
        !projection.turnItems.some(
          (item) => item.type === "subagent" && item.subagentId === subagent.id,
        ),
    );
    if (staleNative.length > 0) {
      const { nodes } = yield* projectionStore
        .getThreadRecords(command.threadId, ["nodes"])
        .pipe(mapDispatchError(command));
      const threadProjection = {
        nodes,
        subagents: projection.subagents,
        turnItems: projection.turnItems,
      };
      yield* endNativeSubagentTrees({
        command,
        events,
        dying: staleNative.map((subagent) => ({
          projection: threadProjection,
          subagent: nativeSubagentRef(subagent),
        })),
        childThreadIds: new Set(),
        now,
      });
    }
    yield* holdStoppedThread({ command, events, projection, cohortRunIds: [], now });
    yield* cancelIdleOrphans({ command, events, projection });
    yield* stopDelegatedTasks;
    return undefined;
  });
