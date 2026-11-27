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
export const bindDispatchQueuedRunEdit = (ctx: any) =>
  Effect.fn("Orchestrator.dispatchQueuedRunEdit")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "queued-run.edit" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const {
      OrchestratorDispatchError,
      emit,
      ensureGoalCommandSupported,
      limitForbidsParkedSteer,
      loadProjectionForCommand,
      queuedRunModelSelection,
    } = ctx;

    if (command.text.trim().length === 0) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Queued run ${command.runId} cannot be edited to an empty message.`,
      });
    }
    const projection = yield* loadProjectionForCommand(command, ["runs", "messages", "turnItems"], {
      turnItemTypes: ["user_message"],
      messageRoles: ["user"],
    });
    const queuedRun = projection.runs.find((candidate) => candidate.id === command.runId);
    if (queuedRun === undefined || queuedRun.status !== "queued") {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Run ${command.runId} is not queued.`,
      });
    }
    const queuedMessage = projection.messages.find(
      (candidate) => candidate.id === queuedRun.userMessageId,
    );
    if (queuedMessage === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Queued run ${queuedRun.id} has no user message.`,
      });
    }
    if (
      queuedMessage.delegatedCompletion !== undefined ||
      queuedMessage.notification !== undefined
    ) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: "Automatic completion deliveries cannot be edited.",
      });
    }
    // The agent text and the shown text of a guest message must stay the guest's words.
    if (queuedMessage.context?.guest !== undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: "A guest's message cannot be edited. Cancel it instead.",
      });
    }
    const modelSelection = command.modelSelection ?? queuedRunModelSelection(projection, queuedRun);
    yield* ensureGoalCommandSupported(
      command,
      { text: command.text, attachments: command.attachments ?? queuedMessage.attachments },
      modelSelection.instanceId,
    );
    const editProblem =
      queuedRun.outputSchema === undefined
        ? null
        : outputRequestProblem(queuedRun.outputSchema, {
            text: command.text,
            attachments: command.attachments ?? queuedMessage.attachments,
          });
    if (editProblem !== null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: editProblem,
      });
    }
    const queuedTurnItem = projection.turnItems.find(
      (candidate) => candidate.type === "user_message" && candidate.messageId === queuedMessage.id,
    );

    const now = yield* DateTime.now;
    const emitEvent = emit(events, command);
    let updatedRun =
      command.modelSelection === undefined
        ? queuedRun
        : { ...queuedRun, modelSelection, providerInstanceId: modelSelection.instanceId };
    if (
      updatedRun.steerWhenReadyRunId !== undefined &&
      (isSlashCommand({
        text: command.text,
        attachments: command.attachments ?? queuedMessage.attachments,
      }) ||
        (yield* limitForbidsParkedSteer))
    ) {
      const { steerWhenReadyRunId: _, ...queued } = updatedRun;
      updatedRun = queued;
    }
    if (updatedRun !== queuedRun) {
      yield* emitEvent({
        type: "run.updated",
        threadId: command.threadId,
        runId: queuedRun.id,
        ...(queuedRun.rootNodeId === null ? {} : { nodeId: queuedRun.rootNodeId }),
        providerInstanceId: updatedRun.providerInstanceId,
        occurredAt: now,
        payload: updatedRun,
      });
    }
    const editedAttachments =
      command.attachments === undefined ? {} : { attachments: command.attachments };
    const { followsThreadSelection: _followsThreadSelection, ...pinnedMessage } = queuedMessage;
    yield* emitEvent({
      type: "message.updated",
      threadId: command.threadId,
      runId: queuedRun.id,
      ...(queuedRun.rootNodeId === null ? {} : { nodeId: queuedRun.rootNodeId }),
      providerInstanceId: queuedRun.providerInstanceId,
      occurredAt: now,
      payload: withoutGuestAttribution({
        ...(command.modelSelection === undefined ? queuedMessage : pinnedMessage),
        text: command.text,
        ...editedAttachments,
        ...(command.context ? { context: command.context } : {}),
        updatedAt: now,
      }),
    });
    if (queuedTurnItem !== undefined && queuedTurnItem.type === "user_message") {
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        runId: queuedRun.id,
        ...(queuedRun.rootNodeId === null ? {} : { nodeId: queuedRun.rootNodeId }),
        providerInstanceId: queuedRun.providerInstanceId,
        occurredAt: now,
        payload: withoutGuestAttribution({
          ...queuedTurnItem,
          text: command.text,
          ...editedAttachments,
          ...(command.context ? { context: command.context } : {}),
          updatedAt: now,
        }),
      });
    }
    // Thread deletion only cleans files the thread still references.
    const keptAttachmentIds = new Set(
      (command.attachments ?? queuedMessage.attachments).map((attachment) => attachment.id),
    );
    const droppedAttachmentIds = queuedMessage.attachments
      .map((attachment) => attachment.id)
      .filter((id) => !keptAttachmentIds.has(id));
    if (droppedAttachmentIds.length > 0) {
      yield* Ref.update(effects, (existing) => [
        ...existing,
        {
          id: `effect:${command.commandId}:attachment.cleanup`,
          commandId: command.commandId,
          threadId: command.threadId,
          request: {
            type: "attachment.cleanup",
            attachmentIds: droppedAttachmentIds,
            skipReferenced: true,
          },
        } satisfies PendingOrchestrationEffectV2,
      ]);
    }
  });
