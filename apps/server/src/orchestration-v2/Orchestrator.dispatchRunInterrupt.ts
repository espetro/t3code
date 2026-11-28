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

export const bindDispatchRunInterrupt = (ctx: any) =>
  Effect.fn("Orchestrator.dispatchRunInterrupt")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "run.interrupt" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const {
      OrchestratorDispatchError,
      OrchestratorProviderAdapterError,
      WORKSPACE_PREPARATION_INPUT,
      commandPolicy,
      disposeDelegatedCompletionCohort,
      emit,
      getProjectionWithPendingEvents,
      holdStoppedThread,
      idAllocator,
      loadProjectionForCommand,
      mapDispatchError,
      nextTurnItemOrdinal,
      providerSessions,
      settleBackgroundWork,
      settleInterruptedRun,
    } = pickScriptcBindCtx(ctx);

    const projection = yield* loadProjectionForCommand(
      command,
      [
        "runs",
        "nodes",
        "providerThreads",
        "providerTurns",
        "messages",
        "attempts",
        "turnItems",
        "subagents",
        "runtimeRequests",
      ],
      // Thread-wide, like the Waiting strip: a settled thread's background
      // work can belong to an earlier run than the one Stop targets.
      {
        turnItemTypes: [
          "command_execution",
          "dynamic_tool",
          "subagent",
          "assistant_message",
          "reasoning",
        ],
        turnItemStatuses: ["pending", "running", "waiting"],
        // Stop reads root nodes and ends open ones; a settled leaf has nothing left to end.
        omitSettledLeafNodes: true,
      },
    );
    const run = projection.runs.find((candidate) => candidate.id === command.runId);
    const rootNode =
      run?.rootNodeId === null
        ? undefined
        : projection.nodes.find((candidate) => candidate.id === run?.rootNodeId);
    const providerThread =
      run?.providerThreadId === null
        ? undefined
        : projection.providerThreads.find((candidate) => candidate.id === run?.providerThreadId);
    const hasBackgroundWork =
      run?.id === projection.runs.findLast((candidate) => candidate.status !== "queued")?.id &&
      derivePendingBackgroundWork({
        latestRun: run,
        providerThreads: projection.providerThreads,
        turnItems: projection.turnItems,
        activeProviderThreadId: projection.thread.activeProviderThreadId,
        runs: projection.runs,
      }).length > 0;
    // A failed start has no provider turn. Background work still belongs
    // to the provider thread, so Stop reaches its latest accepted turn.
    const providerTurn =
      projection.providerTurns.findLast(
        (candidate) =>
          candidate.runAttemptId === run?.activeAttemptId &&
          (run?.status === "running" || candidate.status === "running" || hasBackgroundWork),
      ) ??
      (hasBackgroundWork
        ? projection.providerTurns.findLast(
            (candidate) => candidate.providerThreadId === run?.providerThreadId,
          )
        : undefined);
    if (run === undefined || rootNode === undefined || providerThread === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Run ${command.runId} is not interruptible.`,
      });
    }
    const now = yield* DateTime.now;
    const completionMessage = projection.messages.find(
      (candidate) => candidate.id === run.userMessageId,
    );
    const completionCohortRunId = completionMessage?.delegatedCompletion?.parentRunId ?? run.id;
    const stopRemainingWork = () =>
      command.holdQueue === true
        ? holdStoppedThread({
            command,
            events,
            projection,
            cohortRunIds: [completionCohortRunId],
            now,
          })
        : Effect.gen(function* () {
            for (const parentRunId of new Set([completionCohortRunId, run.id])) {
              yield* disposeDelegatedCompletionCohort({
                command,
                events,
                projection: yield* getProjectionWithPendingEvents(command.threadId, events),
                parentRunId,
                disposition: "stopped",
                now,
                ...(parentRunId !== run.id && completionMessage?.delegatedCompletion !== undefined
                  ? { interruptedWakeTaskIds: completionMessage.delegatedCompletion.taskIds }
                  : {}),
              });
            }
          });

    const emitEvent = emit(events, command);
    const interruptRequestItem: OrchestrationV2TurnItem = {
      id: idAllocator.derive.runSignalTurnItem({
        runId: run.id,
        signal: "interrupt-request",
      }),
      threadId: command.threadId,
      runId: run.id,
      nodeId: rootNode.id,
      providerThreadId: providerThread.id,
      providerTurnId: providerTurn?.id ?? null,
      nativeItemRef: null,
      parentItemId: null,
      ordinal: yield* nextTurnItemOrdinal(projection),
      status: "completed",
      title: "Interrupt requested",
      startedAt: now,
      completedAt: now,
      updatedAt: now,
      type: "run_interrupt_request",
      message: command.reason ?? RunExecutionService.USER_STOP_REASON,
    };

    const otherProviderInterrupts: Array<PendingOrchestrationEffectV2> = [];
    if (hasBackgroundWork || command.holdQueue === true) {
      const runOrdinals = new Map(
        projection.runs.map((candidate) => [candidate.id, candidate.ordinal]),
      );
      const runOrdinalOf = (item: (typeof projection.turnItems)[number]) =>
        item.runId === null ? -1 : (runOrdinals.get(item.runId) ?? -1);
      // Interrupt each provider thread at its latest pending turn so settlement covers all its work.
      // Use the item's provider turn: native subagent items name the child thread but the parent turn,
      // and interrupting the parent turn reaches the subagent.
      const latestTurnByProviderThread = new Map<
        OrchestrationV2ProviderThread["id"],
        { readonly turn: (typeof projection.providerTurns)[number]; readonly runOrdinal: number }
      >();
      for (const item of pendingBackgroundTurnItems({
        turnItems: projection.turnItems,
        runs: projection.runs,
      })) {
        const turn = projection.providerTurns.find(
          (candidate) => candidate.id === item.providerTurnId,
        );
        if (turn === undefined || turn.providerThreadId === providerThread.id) continue;
        const runOrdinal = runOrdinalOf(item);
        const latest = latestTurnByProviderThread.get(turn.providerThreadId);
        if (latest === undefined || runOrdinal > latest.runOrdinal) {
          latestTurnByProviderThread.set(turn.providerThreadId, { turn, runOrdinal });
        }
      }
      for (const { turn } of latestTurnByProviderThread.values()) {
        const owner = projection.providerThreads.find(
          (candidate) => candidate.id === turn.providerThreadId,
        );
        if (owner === undefined || owner.providerSessionId === null) continue;
        const ownerSession = yield* providerSessions
          .get(owner.providerSessionId)
          .pipe(Effect.orElseSucceed(() => Option.none()));
        if (Option.isNone(ownerSession)) continue;
        otherProviderInterrupts.push({
          id: `effect:${command.commandId}:provider-turn.interrupt:${turn.id}`,
          commandId: command.commandId,
          threadId: command.threadId,
          request: {
            type: "provider-turn.interrupt",
            providerSessionId: owner.providerSessionId,
            providerThreadId: owner.id,
            providerTurnId: turn.id,
          },
        });
      }
    }

    if (
      providerTurn === undefined &&
      (run.status === "preparing" || run.status === "starting" || run.status === "running")
    ) {
      const attempt = projection.attempts.find((candidate) => candidate.id === run.activeAttemptId);
      if (attempt === undefined) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Run ${command.runId} has no active attempt to interrupt.`,
        });
      }
      const interruptResultItem: OrchestrationV2TurnItem = {
        id: idAllocator.derive.runSignalTurnItem({
          runId: run.id,
          signal: "interrupt-result",
        }),
        threadId: command.threadId,
        runId: run.id,
        nodeId: rootNode.id,
        providerThreadId: providerThread.id,
        providerTurnId: null,
        nativeItemRef: null,
        parentItemId: interruptRequestItem.id,
        ordinal: interruptRequestItem.ordinal + 1,
        status: "interrupted",
        title: "Interrupted",
        startedAt: now,
        completedAt: now,
        updatedAt: now,
        type: "run_interrupt_result",
        message: "Run interrupted before provider start",
      };
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        runId: run.id,
        nodeId: rootNode.id,
        providerInstanceId: run.providerInstanceId,
        occurredAt: now,
        payload: interruptRequestItem,
      });
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        runId: run.id,
        nodeId: rootNode.id,
        providerInstanceId: run.providerInstanceId,
        occurredAt: now,
        payload: interruptResultItem,
      });
      let preparationItem:
        | Extract<OrchestrationV2TurnItem, { readonly type: "command_execution" }>
        | undefined;
      for (const candidate of projection.turnItems) {
        if (
          candidate.runId === run.id &&
          candidate.type === "command_execution" &&
          candidate.input === WORKSPACE_PREPARATION_INPUT &&
          candidate.status === "running"
        ) {
          preparationItem = candidate;
          break;
        }
      }
      if (preparationItem !== undefined) {
        yield* emitEvent({
          type: "turn-item.updated",
          threadId: command.threadId,
          runId: run.id,
          nodeId: rootNode.id,
          providerInstanceId: run.providerInstanceId,
          occurredAt: now,
          payload: {
            ...preparationItem,
            status: "interrupted",
            title: "Workspace preparation interrupted",
            output: command.reason ?? "Interrupted before provider start",
            completedAt: now,
            updatedAt: now,
          },
        });
      }
      yield* emitEvent({
        type: "run-attempt.updated",
        threadId: command.threadId,
        runId: run.id,
        nodeId: rootNode.id,
        providerInstanceId: run.providerInstanceId,
        occurredAt: now,
        payload: { ...attempt, status: "interrupted", completedAt: now },
      });
      yield* emitEvent({
        type: "node.updated",
        threadId: command.threadId,
        runId: run.id,
        nodeId: rootNode.id,
        providerInstanceId: run.providerInstanceId,
        occurredAt: now,
        payload: { ...rootNode, status: "interrupted", completedAt: now },
      });
      yield* emitEvent({
        type: "run.updated",
        threadId: command.threadId,
        runId: run.id,
        nodeId: rootNode.id,
        providerInstanceId: run.providerInstanceId,
        occurredAt: now,
        payload: { ...run, status: "interrupted", completedAt: now },
      });
      // Stop cancels a pending restart, so it must end the turn that restart could not stop.
      const supersededTurn = projection.providerTurns.findLast(
        (candidate) =>
          candidate.status === "running" &&
          projection.attempts.some(
            (attempt) => attempt.id === candidate.runAttemptId && attempt.runId === run.id,
          ),
      );
      const supersededOwner =
        supersededTurn === undefined
          ? undefined
          : projection.providerThreads.find(
              (candidate) => candidate.id === supersededTurn.providerThreadId,
            );
      if (
        supersededTurn !== undefined &&
        supersededOwner !== undefined &&
        supersededOwner.providerSessionId !== null &&
        Option.isSome(
          yield* providerSessions
            .get(supersededOwner.providerSessionId)
            .pipe(Effect.orElseSucceed(() => Option.none())),
        )
      ) {
        const id = `effect:${command.commandId}:provider-turn.interrupt:${supersededTurn.id}`;
        if (!otherProviderInterrupts.some((effect) => effect.id === id)) {
          otherProviderInterrupts.push({
            id,
            commandId: command.commandId,
            threadId: command.threadId,
            request: {
              type: "provider-turn.interrupt",
              providerSessionId: supersededOwner.providerSessionId,
              providerThreadId: supersededOwner.id,
              providerTurnId: supersededTurn.id,
            },
          });
        }
      }
      yield* stopRemainingWork();
      yield* Ref.update(effects, (existing) => [...existing, ...otherProviderInterrupts]);
      return {
        effectTypes: ["provider-turn.start", "provider-turn.restart"],
        reason: `Run ${run.id} was interrupted before its provider turn started.`,
      } satisfies {
        readonly effectTypes: ReadonlyArray<OrchestrationEffectRequestV2["type"]>;
        readonly reason: string;
      };
    }

    if (providerTurn === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Run ${command.runId} is not interruptible.`,
      });
    }
    const sessionOption =
      providerThread.providerSessionId === null
        ? Option.none()
        : yield* providerSessions.get(providerThread.providerSessionId).pipe(
            Effect.mapError(
              (cause) =>
                new OrchestratorProviderAdapterError({
                  commandId: command.commandId,
                  providerInstanceId: run.providerInstanceId,
                  cause,
                }),
            ),
          );
    if (Option.isNone(sessionOption)) {
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        runId: run.id,
        nodeId: rootNode.id,
        providerInstanceId: run.providerInstanceId,
        occurredAt: now,
        payload: interruptRequestItem,
      });
      yield* stopRemainingWork();
      yield* settleInterruptedRun({ command, projection, providerTurn, events, effects, now });
      yield* settleBackgroundWork({
        command,
        events,
        projection,
        stoppedProviderThreadId: providerThread.id,
        throughRunOrdinal: run.ordinal,
        now,
      });
      yield* Ref.update(effects, (existing) => [...existing, ...otherProviderInterrupts]);
      return undefined;
    }
    if (providerThread.providerSessionId === null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Provider thread ${providerThread.id} has no active provider session.`,
      });
    }
    const providerSessionId = providerThread.providerSessionId;
    yield* mapDispatchError(command)(
      commandPolicy.ensureInterrupt({
        commandId: command.commandId,
        threadId: command.threadId,
        providerInstanceId: run.providerInstanceId,
        capabilities: sessionOption.value.providerSession.capabilities,
      }),
    );

    yield* emitEvent({
      type: "turn-item.updated",
      threadId: command.threadId,
      runId: run.id,
      nodeId: rootNode.id,
      providerInstanceId: run.providerInstanceId,
      occurredAt: now,
      payload: interruptRequestItem,
    });
    yield* stopRemainingWork();
    yield* Ref.update(effects, (existing) => [
      ...existing,
      {
        id: `effect:${command.commandId}:provider-turn.interrupt:${providerTurn.id}`,
        commandId: command.commandId,
        threadId: command.threadId,
        request: {
          type: "provider-turn.interrupt",
          providerSessionId,
          providerThreadId: providerThread.id,
          providerTurnId: providerTurn.id,
        },
      } satisfies PendingOrchestrationEffectV2,
      ...otherProviderInterrupts,
    ]);
    return undefined;
  });
