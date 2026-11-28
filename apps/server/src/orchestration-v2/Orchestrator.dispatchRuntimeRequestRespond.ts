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
export const bindDispatchRuntimeRequestRespond = (ctx: any) =>
  Effect.fn("Orchestrator.dispatchRuntimeRequestRespond")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "runtime-request.respond" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const {
      OrchestratorDispatchError,
      OrchestratorProjectionError,
      decodeUserInputAnswers,
      dispatchMessage,
      emit,
      idAllocator,
      isMessageQuestionAnswer,
      mapDispatchError,
      projectionStore,
      providerSessions,
      recordSubagentFollowup,
      refuseAboveDispatchModeLimit,
      serverSettings,
      turnStartedModes,
    } = pickScriptcBindCtx(ctx);

    const context = yield* projectionStore
      .getRuntimeResponseContext(command.threadId, command.requestId)
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
        ),
      );
    const runtimeRequest = context.request;
    if (runtimeRequest === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Runtime request ${command.requestId} was not found.`,
      });
    }
    if (runtimeRequest.status !== "pending") {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Runtime request ${command.requestId} is ${runtimeRequest.status}.`,
      });
    }
    if (runtimeRequest.responseCapability.type === "not_resumable") {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: runtimeRequest.responseCapability.reason,
      });
    }
    if (
      command.feedback !== undefined &&
      (runtimeRequest.responseCapability.type !== "live" ||
        !runtimeRequest.responseCapability.supportsFeedback ||
        runtimeRequest.kind === "user_input" ||
        command.decision !== "decline" ||
        !command.feedback.trim())
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: "Feedback requires a live approval that supports it and a decline decision.",
      });
    }
    const providerSessionId =
      runtimeRequest.responseCapability.type === "live"
        ? runtimeRequest.responseCapability.providerSessionId
        : null;
    if (providerSessionId !== null && (yield* DispatchModeLimit) !== undefined) {
      // The answer goes into the turn that asked, which keeps the modes it started with.
      const live = yield* projectionStore
        .getThreadRecords(command.threadId, ["runs", "attempts"])
        .pipe(
          Effect.mapError(
            (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
          ),
        );
      yield* refuseAboveDispatchModeLimit(
        command,
        command.threadId,
        turnStartedModes(
          live.attempts,
          live.runs.find((run) => run.id === context.node?.runId),
        ),
      );
    }
    const providerSession = context.session;
    if (providerSessionId !== null && providerSession === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Provider session ${providerSessionId} was not found.`,
      });
    }
    let answers = command.answers;
    if (runtimeRequest.kind === "user_input" && answers !== undefined) {
      const decoded = yield* decodeUserInputAnswers(answers).pipe(mapDispatchError(command));
      answers = Object.fromEntries(
        Object.entries(decoded).map(([questionId, answer]) => [
          questionId,
          typeof answer === "object" && "answers" in answer ? answer.answers : answer,
        ]),
      );
    }

    const approvalTurnItem = context.item;
    const resolvedNodeStatus =
      command.decision === "decline" || command.decision === "cancel"
        ? ("cancelled" as const)
        : ("completed" as const);
    const replies: string[] = [];
    if (
      runtimeRequest.responseCapability.type === "message" &&
      resolvedNodeStatus !== "cancelled"
    ) {
      if (approvalTurnItem?.type !== "user_input_request") {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "The question for this request was not found.",
        });
      }
      const thread = yield* projectionStore
        .getThread(command.threadId)
        .pipe(mapDispatchError(command));
      const settings = yield* serverSettings.getSettings.pipe(Effect.orDie);
      if (
        !resolveProjectProviderInstanceEnabled(
          settings,
          thread.projectId,
          thread.providerInstanceId,
        )
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "The provider for this project is disabled.",
        });
      }
      const questionIds = new Set(approvalTurnItem.questions.map((question) => question.id));
      if (
        !Object.entries(answers ?? {}).every(
          ([questionId, answer]) => questionIds.has(questionId) || isMessageQuestionAnswer(answer),
        )
      ) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "Answer each question before sending.",
        });
      }
      for (const question of approvalTurnItem.questions) {
        const answer = answers?.[question.id];
        if (
          question.multiSelect === true &&
          question.required !== true &&
          Array.isArray(answer) &&
          answer.length === 0
        ) {
          replies.push(`${question.question}\nNone selected`);
          continue;
        }
        const answered = isMessageQuestionAnswer(answer);
        // Clients send "" for a skipped optional question or an attachment-only answer.
        if (!answered && !command.attachmentsByQuestionId?.[question.id]?.length) {
          if (question.required === false) continue;
          return yield* new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause: "Answer each question before sending.",
          });
        }
        if (!answered) {
          replies.push(question.question);
          continue;
        }
        const text = typeof answer === "string" ? answer : answer.join(", ");
        replies.push(`${question.question}\n${text.trim()}`);
      }
      if (replies.length === 0) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "Enter an answer before sending.",
        });
      }
    }

    const now = yield* DateTime.now;
    const resolvedRequest = {
      ...runtimeRequest,
      status: "resolved" as const,
      resolvedAt: now,
      ...(command.decision === undefined ? {} : { decision: command.decision }),
      ...(command.feedback === undefined ? {} : { feedback: command.feedback }),
      ...(answers === undefined ? {} : { answers }),
    };
    const emitEvent = emit(events, command);
    const requestNode = context.node;
    if (command.feedback !== undefined) {
      const messageId = MessageId.make(`approval-feedback:${command.requestId}`);
      // Record the reply for every client without dispatching a prompt to the parent agent.
      yield* emitEvent({
        type: "message.updated",
        threadId: command.threadId,
        ...(requestNode?.runId == null ? {} : { runId: requestNode.runId }),
        nodeId: runtimeRequest.nodeId,
        occurredAt: now,
        payload: {
          id: messageId,
          threadId: command.threadId,
          runId: requestNode?.runId ?? null,
          nodeId: runtimeRequest.nodeId,
          role: "user",
          text: command.feedback,
          attachments: [],
          streaming: false,
          createdBy: "user",
          creationSource: "server",
          createdAt: now,
          updatedAt: now,
        },
      });
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        ...(requestNode?.runId == null ? {} : { runId: requestNode.runId }),
        nodeId: runtimeRequest.nodeId,
        occurredAt: now,
        payload: {
          id: idAllocator.derive.userTurnItem({ messageId }),
          threadId: command.threadId,
          runId: requestNode?.runId ?? null,
          nodeId: runtimeRequest.nodeId,
          providerThreadId: context.item?.providerThreadId ?? requestNode?.providerThreadId ?? null,
          providerTurnId: runtimeRequest.providerTurnId,
          nativeItemRef: null,
          parentItemId: null,
          ordinal: yield* projectionStore
            .getNextTurnItemOrdinal(command.threadId)
            .pipe(
              Effect.mapError(
                (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
              ),
            ),
          status: "completed",
          title: null,
          startedAt: now,
          completedAt: now,
          updatedAt: now,
          type: "user_message",
          messageId,
          inputIntent: "steer",
          text: command.feedback,
          attachments: [],
          createdBy: "user",
          creationSource: "server",
        },
      });
    }
    yield* emitEvent({
      type: "runtime-request.updated",
      threadId: command.threadId,
      ...(requestNode?.runId == null ? {} : { runId: requestNode.runId }),
      nodeId: runtimeRequest.nodeId,
      ...(providerSession === undefined
        ? {}
        : {
            driver: providerSession.driver,
            providerInstanceId: providerSession.providerInstanceId,
          }),
      occurredAt: now,
      payload: resolvedRequest,
    });
    if (requestNode !== undefined) {
      yield* emitEvent({
        type: "node.updated",
        threadId: command.threadId,
        ...(requestNode.runId === null ? {} : { runId: requestNode.runId }),
        nodeId: requestNode.id,
        ...(providerSession === undefined
          ? {}
          : {
              driver: providerSession.driver,
              providerInstanceId: providerSession.providerInstanceId,
            }),
        occurredAt: now,
        payload: {
          ...requestNode,
          status: resolvedNodeStatus,
          completedAt: now,
        },
      });
    }

    if (approvalTurnItem !== undefined) {
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        ...(approvalTurnItem.runId === null ? {} : { runId: approvalTurnItem.runId }),
        ...(approvalTurnItem.nodeId === null ? {} : { nodeId: approvalTurnItem.nodeId }),
        ...(providerSession === undefined
          ? {}
          : {
              driver: providerSession.driver,
              providerInstanceId: providerSession.providerInstanceId,
            }),
        occurredAt: now,
        payload: {
          ...approvalTurnItem,
          ...(approvalTurnItem.type === "user_input_request" && answers !== undefined
            ? {
                questionAnswer: {
                  requestId: command.requestId,
                  answers,
                  attachmentsByQuestionId: command.attachmentsByQuestionId ?? {},
                  questionTextById: Object.fromEntries(
                    approvalTurnItem.questions.map((question) => [question.id, question.question]),
                  ),
                },
              }
            : {}),
          status: resolvedNodeStatus,
          completedAt: now,
          updatedAt: now,
        },
      });
    }
    if (runtimeRequest.responseCapability.type === "message") {
      if (resolvedNodeStatus === "cancelled") return;
      let dispatchMode: Extract<
        OrchestrationV2Command,
        { type: "message.dispatch" }
      >["dispatchMode"] = {
        type: "queue_after_active",
      };
      const {
        run: activeRun,
        providerThread: activeProviderThread,
        providerTurn: activeProviderTurn,
      } = yield* projectionStore
        .getRunningTurnContext(command.threadId)
        .pipe(mapDispatchError(command));
      if (activeRun && activeProviderTurn && activeProviderThread?.providerSessionId) {
        const activeSession = yield* providerSessions
          .get(activeProviderThread.providerSessionId)
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
        const activeSessionRuntime = Option.getOrUndefined(activeSession);
        if (
          activeSessionRuntime !== undefined &&
          activeSessionRuntime.providerSession.capabilities.turns.supportsActiveSteering
        ) {
          dispatchMode = { type: "steer_active", targetRunId: activeRun.id };
        }
      }
      const answer = {
        type: "message.dispatch" as const,
        commandId: command.commandId,
        threadId: command.threadId,
        messageId: MessageId.make(`async-answer:${command.requestId}`),
        text: replies.join("\n\n"),
        attachments: Object.values(command.attachmentsByQuestionId ?? {}).flat(),
        createdBy: "user" as const,
        creationSource: "server" as const,
        dispatchMode,
      };
      yield* dispatchMessage(answer, events, effects);
      return yield* recordSubagentFollowup(answer, events).pipe(mapDispatchError(answer));
    }
    if (providerSessionId === null) return;
    if (runtimeRequest.kind === "user_input" && resolvedNodeStatus === "completed") {
      const thread = yield* projectionStore
        .getThread(command.threadId)
        .pipe(mapDispatchError(command));
      if (thread.snoozedUntil != null) {
        yield* emitEvent({
          type: "thread.unsnoozed",
          threadId: command.threadId,
          providerInstanceId: thread.providerInstanceId,
          occurredAt: now,
          payload: { ...thread, snoozedUntil: null, snoozedAt: null, updatedAt: now },
        });
      }
    }
    yield* Ref.update(effects, (existing) => [
      ...existing,
      {
        id: `effect:${command.commandId}:runtime-request.respond:${command.requestId}`,
        commandId: command.commandId,
        threadId: command.threadId,
        request: {
          type: "runtime-request.respond",
          providerSessionId,
          requestId: command.requestId,
          ...(command.decision === undefined ? {} : { decision: command.decision }),
          ...(command.feedback === undefined ? {} : { feedback: command.feedback }),
          ...(answers === undefined ? {} : { answers }),
        },
      } satisfies PendingOrchestrationEffectV2,
    ]);
  });
