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
import {
  bindDispatchMessage,
  bindDispatchThreadMutation,
  bindStartNextQueuedRunOnce,
  bindDispatchSteerIntoRun,
  bindDispatchOnce,
  bindDispatchRunInterrupt,
  bindDispatchRuntimeRequestRespond,
  bindFinalizeAppOwnedSubagentTask,
  bindDispatchWithReceiptEffect,
  bindDispatchQueuedMessagePromoteToSteer,
  bindDispatchDelegatedTaskRequest,
  bindDispatchCheckpointRollback,
  bindRecordSubagentFollowup,
  bindDispatchDelegatedTaskCompletionDeliveryResolution,
  bindDispatchLinkRequestRecord,
  bindDispatchThreadMergeBack,
  bindSettleInterruptedRun,
  bindDispatchQueuedRunEdit,
  bindRequeueUnreadSteers,
  bindDispatchRemoteDelegatedTaskComplete,
  bindPlanDelegatedCompletionDelivery,
  bindDispatchBackgroundWorkSettle,
  bindHoldStoppedThread,
  bindDispatchThreadStop,
  bindDispatchThreadFork,
  bindDispatchRemoteDelegatedTaskRequest,
  bindSettleBackgroundWork,
  bindFinalizeDelegatedCompletionDelivery,
  bindFailQueuedRunStart,
  bindDispatchSecretRequestRecord,
  bindFinalizeAppOwnedSubagent,
  bindRecoverDelegatedTasks,
  bindDispatchSubagentStop,
  bindDispatchCreatedThreadRecord,
  bindDispatchDelegatedTaskWakePolicy,
  bindCancelIdleOrphans,
  bindDispatchThreadCreate,
  bindDispatchPullRequestWatchSync,
  bindDispatchFeedbackRequestRecord,
  bindDisposeDelegatedCompletionCohort,
  bindAcceptDelegatedCompletionDelivery,
  bindDispatchPreparedRunRelease,
  bindDispatchPreparedRunRetry,
  bindDispatchPreparedRunFail,
  bindDispatchQueuedRunReorder,
  bindHandleRunUpdate,
  bindEndNativeSubagentTrees,
  bindStopRunForQueuedCommand,
  bindDispatchWithReceipt,
} from "./orchestratorSplits.ts";
import { yieldNativeSplit } from "./scriptcBindScope.ts";

const isMessageQuestionAnswer = (answer: unknown): boolean => {
  if (typeof answer === "string") return answer.trim().length > 0;
  if (!Array.isArray(answer) || answer.length === 0) return false;
  for (const item of answer) {
    if (typeof item !== "string" || item.trim().length === 0) return false;
  }
  return true;
};

export class OrchestratorDispatchError extends Schema.TaggedError<OrchestratorDispatchError>()(
  "OrchestratorDispatchError",
  {
    commandId: CommandId,
    commandType: Schema.String,
    cause: Schema.optional(Schema.Defect()),
  },
) {
  override get message(): string {
    return `Failed to dispatch orchestration command ${this.commandType} (${this.commandId}).`;
  }
}

export class OrchestratorThreadAlreadyExistsError extends Schema.TaggedError<OrchestratorThreadAlreadyExistsError>()(
  "OrchestratorThreadAlreadyExistsError",
  { commandId: CommandId, threadId: ThreadId },
) {
  override get message(): string {
    return `Thread ${this.threadId} already exists. Use a new thread id.`;
  }
}

export class OrchestratorCommandRejectedError extends Schema.TaggedError<OrchestratorCommandRejectedError>()(
  "OrchestratorCommandRejectedError",
  { commandId: CommandId, commandType: Schema.String, cause: Schema.optional(Schema.Defect()) },
) {
  override get message(): string {
    return `Orchestration command ${this.commandType} (${this.commandId}) was rejected before commit.`;
  }
}

export class OrchestratorProjectionError extends Schema.TaggedError<OrchestratorProjectionError>()(
  "OrchestratorProjectionError",
  {
    threadId: ThreadId,
    cause: Schema.optional(Schema.Defect()),
  },
) {
  override get message(): string {
    return `Failed to load orchestration projection for thread ${this.threadId}.`;
  }
}

const isOrchestratorProjectionError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  Reflect.get(error, "_tag") === "OrchestratorProjectionError";

export class OrchestratorDomainEventStreamError extends Schema.TaggedError<OrchestratorDomainEventStreamError>()(
  "OrchestratorDomainEventStreamError",
  {
    cause: Schema.optional(Schema.Defect()),
  },
) {
  override get message(): string {
    return "Failed while streaming orchestration domain events.";
  }
}

export class OrchestratorProviderAdapterError extends Schema.TaggedError<OrchestratorProviderAdapterError>()(
  "OrchestratorProviderAdapterError",
  {
    commandId: CommandId,
    providerInstanceId: ProviderInstanceId,
    cause: Schema.optional(Schema.Defect()),
  },
) {
  override get message(): string {
    return `Provider adapter failed while dispatching orchestration command ${this.commandId}.`;
  }
}

export class OrchestratorSubagentThreadReadOnlyError extends Schema.TaggedError<OrchestratorSubagentThreadReadOnlyError>()(
  "OrchestratorSubagentThreadReadOnlyError",
  { commandId: CommandId, threadId: ThreadId },
) {
  override get message(): string {
    return "This subagent is run by its provider and cannot take messages. Message the parent thread instead.";
  }
}

export class OrchestratorThreadAboveModeLimitError extends Schema.TaggedError<OrchestratorThreadAboveModeLimitError>()(
  "OrchestratorThreadAboveModeLimitError",
  {
    commandId: CommandId,
    threadId: ThreadId,
    mode: Schema.Literals(["runtime", "interaction"]),
    runtimeMode: RuntimeMode,
    interactionMode: ProviderInteractionMode,
  },
) {
  override get message(): string {
    return `Thread ${this.threadId} now runs in ${this.runtimeMode}/${this.interactionMode} mode, above what this caller may change.`;
  }
}

export class OrchestratorProviderSelectionBusyError extends Schema.TaggedError<OrchestratorProviderSelectionBusyError>()(
  "OrchestratorProviderSelectionBusyError",
  { commandId: CommandId, threadId: ThreadId },
) {
  override get message(): string {
    return `Thread ${this.threadId} has an active turn. Wait for it to finish, then retry the provider selection change.`;
  }
}

/** The ceiling refusal under however many dispatch errors wrapped it on the way out. */
function runtimePolicyCeilingCause(error: unknown) {
  let current: unknown = error;
  while (typeof current === "object" && current !== null) {
    const tag = Reflect.get(current, "_tag");
    if (tag !== "OrchestratorDispatchError") break;
    current = Reflect.get(current, "cause");
  }
  if (
    !isRuntimePolicyAboveCeilingError(current) ||
    typeof current !== "object" ||
    current === null
  ) {
    return undefined;
  }
  const threadId = Reflect.get(current, "threadId");
  const runtimeMode = Reflect.get(current, "runtimeMode");
  const maxRuntimeMode = Reflect.get(current, "maxRuntimeMode");
  const organization = Reflect.get(current, "organization");
  if (
    typeof threadId !== "string" ||
    typeof organization !== "string" ||
    (runtimeMode !== "approval-required" &&
      runtimeMode !== "auto-accept-edits" &&
      runtimeMode !== "auto" &&
      runtimeMode !== "full-access") ||
    (maxRuntimeMode !== "approval-required" &&
      maxRuntimeMode !== "auto-accept-edits" &&
      maxRuntimeMode !== "auto" &&
      maxRuntimeMode !== "full-access")
  ) {
    return undefined;
  }
  return {
    threadId: ThreadId.make(threadId),
    runtimeMode,
    maxRuntimeMode,
    organization,
  };
}

export class OrchestratorRuntimeModeAboveCeilingError extends Schema.TaggedError<OrchestratorRuntimeModeAboveCeilingError>()(
  "OrchestratorRuntimeModeAboveCeilingError",
  {
    commandId: CommandId,
    threadId: ThreadId,
    refused: Schema.Literals(["mode", "turn"]),
    runtimeMode: RuntimeMode,
    maxRuntimeMode: RuntimeMode,
    organization: Schema.String,
  },
) {
  override get message(): string {
    const limit = managedRuntimeModeCeilingMessage(this.organization, this.maxRuntimeMode);
    return this.refused === "turn" ? `${limit} Switch this thread's mode to continue.` : limit;
  }
}

export class OrchestratorCommandPreviouslyRejectedError extends Schema.TaggedError<OrchestratorCommandPreviouslyRejectedError>()(
  "OrchestratorCommandPreviouslyRejectedError",
  {
    commandId: CommandId,
    commandType: Schema.String,
    detail: Schema.String,
  },
) {
  override get message(): string {
    return `Command ${this.commandId} was previously rejected: ${this.detail}`;
  }
}

export class OrchestratorCommandIdConflictError extends Schema.TaggedError<OrchestratorCommandIdConflictError>()(
  "OrchestratorCommandIdConflictError",
  {
    commandId: CommandId,
    commandType: Schema.String,
    receiptThreadId: ThreadId,
    commandThreadId: ThreadId,
  },
) {
  override get message(): string {
    return `Command ${this.commandId} was already handled for thread ${this.receiptThreadId} and cannot be replayed for ${this.commandThreadId}.`;
  }
}

export const OrchestratorV2Error = Schema.Union([
  OrchestratorDispatchError,
  OrchestratorThreadAlreadyExistsError,
  OrchestratorCommandRejectedError,
  OrchestratorProjectionError,
  OrchestratorDomainEventStreamError,
  OrchestratorProviderAdapterError,
  OrchestratorCommandPreviouslyRejectedError,
  OrchestratorCommandIdConflictError,
  OrchestratorSubagentThreadReadOnlyError,
  OrchestratorThreadAboveModeLimitError,
  OrchestratorProviderSelectionBusyError,
  OrchestratorRuntimeModeAboveCeilingError,
]);
export type OrchestratorV2Error = typeof OrchestratorV2Error.Type;

export interface OrchestratorV2DispatchResult {
  readonly sequence: number;
  readonly storedEvents: ReadonlyArray<OrchestrationV2StoredEvent>;
  /** The command id was already accepted; analytics skip it. */
  readonly replayed?: true;
}

export interface OrchestratorV2Shape {
  readonly resumeQueuedRuns: Effect.Effect<number, OrchestratorV2Error>;
  readonly recoverDelegatedTasks: Effect.Effect<void>;
  readonly recoverDelegatedTask: (
    threadId: ThreadId,
    options?: { readonly sourceRunId?: RunId; readonly completedRunId?: RunId },
  ) => Effect.Effect<void, OrchestratorProjectionError>;
  /** Commits cancellation with the child's Stop after descendants accept stopping. */
  readonly cancelDelegatedTask: <E, R>(input: {
    readonly parentThreadId: ThreadId;
    readonly taskId: NodeId;
    readonly command: Extract<OrchestrationV2ServerCommand, { readonly type: "thread.stop" }>;
    readonly stopDescendants: (
      dispatch: OrchestratorV2Shape["dispatch"],
    ) => Effect.Effect<void, E, R>;
  }) => Effect.Effect<void, E | OrchestratorV2Error, R>;
  readonly delegatedTaskResultPending: (
    childThreadId: ThreadId,
    taskId?: NodeId,
  ) => Effect.Effect<boolean, OrchestratorProjectionError>;
  readonly restartContinuationPending: (run: OrchestrationV2Run) => Effect.Effect<boolean>;
  /** Declined continuations emit no thread event; this still wakes waiters. */
  readonly awaitRestartContinuation: (run: OrchestrationV2Run) => Effect.Effect<void>;
  readonly dispatch: (
    command: OrchestrationV2ServerCommand,
  ) => Effect.Effect<OrchestratorV2DispatchResult, OrchestratorV2Error>;
  readonly autoArmLimitRecovery: (input: {
    readonly commandId: CommandId;
    readonly threadId: ThreadId;
    readonly limitRecovery: OrchestrationV2LimitRecoveryUpdate;
  }) => Effect.Effect<void, OrchestratorV2Error>;
  readonly searchThreadStream: (
    input: OrchestrationV2SearchThreadInput,
  ) => Stream.Stream<OrchestrationV2SearchThreadResult, OrchestratorV2Error>;
  readonly searchThread: (
    input: OrchestrationV2SearchThreadInput,
  ) => Effect.Effect<OrchestrationV2SearchThreadResult, OrchestratorV2Error>;
  readonly getThreadHistoryPage: (
    threadId: ThreadId,
    cursor: string,
    throughEntryId?: string,
    conversationOnly?: boolean,
    workMode?: "deferred" | "work",
  ) => Effect.Effect<OrchestrationV2ThreadHistoryPage, OrchestratorV2Error>;
  readonly getTimelinePage: (
    threadId: ThreadId,
    options: ProjectionTimelinePageOptions,
  ) => Effect.Effect<ProjectionTimelinePage, OrchestratorProjectionError>;
  readonly getMessageCount: (threadId: ThreadId) => Effect.Effect<number, OrchestratorV2Error>;
  readonly getRunCount: (threadId: ThreadId) => Effect.Effect<number, OrchestratorV2Error>;
  readonly getMessagesById: (
    threadId: ThreadId,
    messageIds: ReadonlyArray<MessageId>,
  ) => Effect.Effect<
    ReadonlyMap<MessageId, OrchestrationV2ConversationMessage>,
    OrchestratorV2Error
  >;
  readonly getTranscriptByteFloor: (
    threadId: ThreadId,
    limit: number,
  ) => Effect.Effect<number, OrchestratorV2Error>;
  readonly getTurnItem: (input: {
    readonly threadId: ThreadId;
    readonly itemId: TurnItemId;
  }) => Effect.Effect<OrchestrationV2TurnItem | null, OrchestratorV2Error>;
  readonly getThreadRecords: <K extends ProjectionRecordField>(
    threadId: ThreadId,
    fields: ReadonlyArray<K>,
    filter?: ProjectionRecordFilter,
  ) => Effect.Effect<ProjectionRecords<K>, OrchestratorV2Error>;
  readonly listAppOwnedChildThreadIds: (
    threadId: ThreadId,
  ) => Effect.Effect<ReadonlyArray<ThreadId>, OrchestratorV2Error>;
  readonly getThreadProjection: (
    threadId: ThreadId,
  ) => Effect.Effect<OrchestrationV2ThreadProjection, OrchestratorV2Error>;
  readonly getCheckpointContext: (
    threadId: ThreadId,
  ) => Effect.Effect<ProjectionCheckpointContext, OrchestratorV2Error>;
  readonly getThreadSnapshot: (threadId: ThreadId) => Effect.Effect<
    {
      readonly schemaVersion: number;
      readonly snapshotSequence: number;
      readonly projection: OrchestrationV2ThreadProjection;
    },
    OrchestratorV2Error
  >;
  readonly getThreadSnapshotWindow: (
    threadId: ThreadId,
    options: Parameters<ProjectionStoreV2["Service"]["getThreadSnapshotWindow"]>[1],
  ) => Effect.Effect<
    {
      readonly schemaVersion: number;
      readonly snapshotSequence: number;
      readonly projection: OrchestrationV2ThreadProjection;
    },
    OrchestratorV2Error
  >;
  readonly getPullRequestSnapshot: (
    options: Parameters<ProjectionStoreV2["Service"]["getPullRequestSnapshot"]>[0],
  ) => Effect.Effect<
    Effect.Success<ReturnType<ProjectionStoreV2["Service"]["getPullRequestSnapshot"]>>,
    OrchestratorV2Error
  >;
  readonly getAgentAwarenessSnapshot: (
    threadId?: ThreadId,
  ) => Effect.Effect<
    Effect.Success<ReturnType<ProjectionStoreV2["Service"]["getAgentAwarenessSnapshot"]>>,
    OrchestratorV2Error
  >;
  readonly getShellSnapshot: (
    options?: ShellSnapshotOptions,
  ) => Effect.Effect<OrchestrationV2ThreadShellSnapshot, OrchestratorV2Error>;
  readonly listActiveSubagentThreadIds: () => Effect.Effect<
    ReadonlyArray<ThreadId>,
    OrchestratorV2Error
  >;
  readonly countThreads: () => Effect.Effect<number, OrchestratorV2Error>;
  readonly listActiveShellIndex: () => Effect.Effect<
    ReadonlyArray<ActiveShellIndexEntry>,
    OrchestratorV2Error
  >;
  readonly listActiveThreads: (
    projectId?: ProjectId,
  ) => Effect.Effect<ReadonlyArray<ActiveThreadListEntry>, OrchestratorV2Error>;
  readonly listOlderSettledThreads: (
    query: OlderSettledThreadsQuery,
  ) => Effect.Effect<OlderSettledThreadsListing, OrchestratorV2Error>;
  readonly readShellSnapshot: (
    options?: ShellSnapshotOptions,
  ) => Effect.Effect<
    Effect.Effect<OrchestrationV2ThreadShellSnapshot, OrchestratorV2Error>,
    OrchestratorV2Error
  >;
  readonly getThreadShell: (
    threadId: ThreadId,
  ) => Effect.Effect<OrchestrationV2ThreadShell | null, OrchestratorV2Error>;
  readonly findGuestShareThreadId: (
    shareId: GuestShareId,
  ) => Effect.Effect<ThreadId | null, OrchestratorV2Error>;
  /** Titles of the given threads that exist, archived ones included. */
  readonly getThreadLinkMetadata: (
    threadIds: ReadonlyArray<ThreadId>,
  ) => Effect.Effect<Record<ThreadId, OrchestrationV2ThreadLinkMetadata>, OrchestratorV2Error>;
  readonly getThreadTitles: (
    threadIds: ReadonlyArray<ThreadId>,
  ) => Effect.Effect<Record<ThreadId, string>, OrchestratorV2Error>;
  readonly getThreadEventSequence: (
    threadId: ThreadId,
  ) => Effect.Effect<number, OrchestratorV2Error>;
  readonly streamStoredEvents: Stream.Stream<OrchestrationV2StoredEvent, OrchestratorV2Error>;
  /** Events arrive projected for the wire and shared by every subscriber; never mutate them. */
  readonly streamStoredEventsFrom: (input?: {
    readonly threadId?: ThreadId;
    readonly afterSequence?: number;
    readonly eventType?: OrchestrationV2DomainEvent["type"];
  }) => Stream.Stream<OrchestrationV2StoredEvent, OrchestratorV2Error>;
  readonly streamDomainEvents: Stream.Stream<OrchestrationV2DomainEvent, OrchestratorV2Error>;
}

export class OrchestratorV2 extends Context.Service<OrchestratorV2, OrchestratorV2Shape>()(
  "t3/orchestration-v2/Orchestrator/OrchestratorV2",
) {}

/** Run ordinals can skip values: a queued run moves past newer runs when it starts. */
function nextRunOrdinal(projection: Pick<OrchestrationV2ThreadProjection, "runs">): number {
  return projection.runs.reduce((max, run) => Math.max(max, run.ordinal), 0) + 1;
}

/**
 * Stamp at wake start; queued prompts lack start times and delegated results jump the queue.
 * Auto-drained agent messages continue active work; explicit queue starts reset it.
 */
function wakeWorkStartedAt(
  projection: Pick<OrchestrationV2ThreadProjection, "runs" | "subagents">,
  trigger: Pick<
    OrchestrationV2ConversationMessage,
    "createdBy" | "creationSource" | "senderThreadId"
  > & {
    readonly notification?: unknown;
    readonly delegatedCompletion?: unknown;
    readonly restartContinuationOfRunId?: RunId | undefined;
  },
  delivery: "immediate" | "automatic-queue" | "explicit-queue" = "immediate",
): Pick<OrchestrationV2Run, "workStartedAt"> {
  if (
    trigger.notification === undefined &&
    trigger.delegatedCompletion === undefined &&
    trigger.restartContinuationOfRunId === undefined &&
    !(
      trigger.createdBy === "agent" &&
      trigger.creationSource === "mcp" &&
      trigger.senderThreadId !== undefined &&
      (delivery === "automatic-queue" ||
        (delivery === "immediate" &&
          projection.subagents.some(
            (subagent) =>
              subagent.origin === "app_owned" && subagent.childThreadId === trigger.senderThreadId,
          )))
    )
  ) {
    return {};
  }
  const previous = projection.runs
    .flatMap((run) => (run.startedAt === null ? [] : [{ run, startedAt: run.startedAt }]))
    .toSorted(
      (left, right) =>
        DateTime.Order(right.startedAt, left.startedAt) || right.run.ordinal - left.run.ordinal,
    )[0]?.run;
  return previous === undefined ? {} : { workStartedAt: orchestrationV2RunWorkStartedAt(previous) };
}

const threadPullRequestLinksEqual = Schema.toEquivalence(Schema.NullOr(ThreadLinkedPullRequest));

/** Unfinished runs (including queued) or open requests block moving a thread to another project. */
export function threadHasUnfinishedWork(records: {
  readonly runs: ReadonlyArray<{ readonly status: string }>;
  readonly runtimeRequests: ReadonlyArray<{ readonly status: string }>;
}): boolean {
  return (
    records.runs.some(
      (run) =>
        run.status !== "completed" &&
        run.status !== "failed" &&
        run.status !== "cancelled" &&
        run.status !== "interrupted" &&
        run.status !== "rolled_back",
    ) || records.runtimeRequests.some((request) => request.status === "pending")
  );
}

function commandThreadId(command: OrchestrationV2ServerCommand): ThreadId {
  switch (command.type) {
    case "thread.create":
    case "thread.archive":
    case "thread.unarchive":
    case "thread.delete":
    case "thread.guest-share.open":
    case "thread.guest-share.redeem":
    case "thread.guest-share.close":
    case "thread.guest-message.submit":
    case "thread.guest-message.dismiss":
    case "thread.settle":
    case "thread.auto-settle":
    case "thread.unsettle":
    case "thread.snooze":
    case "thread.unsnooze":
    case "thread.auto-settle.set":
    case "thread.pin":
    case "thread.unpin":
    case "thread.pin.reorder":
    case "thread.active.reorder":
    case "thread.tag.set":
    case "thread.visit":
    case "thread.mark-unread":
    case "thread.metadata.update":
    case "thread.pull-request.link":
    case "thread.pull-request.unlink":
    case "thread.pull-request-link.sync":
    case "thread.issue.link":
    case "thread.issue.unlink":
    case "thread.pull-request.watch":
    case "thread.pull-request-watch.sync":
    case "thread.pull-request-watch.checks-reopen":
    case "thread.pull-request.sync":
    case "thread.title.regeneration.complete":
    case "thread.project.adopt-folder":
    case "thread.runtime-mode.set":
    case "thread.interaction-mode.set":
    case "thread.model-selection.set":
    case "provider-session.detach":
    case "message.dispatch":
    case "notification.delivery.accept":
    case "prepared-run.release":
    case "prepared-run.progress":
    case "prepared-run.fail":
    case "prepared-run.retry":
    case "subagent.stop":
    case "run.interrupt":
    case "run.output.submit":
    case "queued-message.promote-to-steer":
    case "queued-run.start":
    case "queue.resume":
    case "queued-run.reorder":
    case "queued-run.cancel":
    case "queued-run.edit":
    case "runtime-request.respond":
    case "runtime-request.delivery.fail":
    case "thread.user-input.dismiss":
    case "checkpoint.rollback":
    case "checkpoint.rollback.fail":
    case "thread.background-work.settle":
    case "thread.interrupt.unresponsive":
    case "thread.stop":
    case "provider.switch":
      return command.threadId;
    case "delegated_task.request":
    case "delegated_task.remote.request":
    case "delegated_task.remote.complete":
    case "delegated_task.remote.stop":
    case "delegated_task.wake-policy":
    case "delegated_task.completion-delivery.acknowledge":
    case "delegated_task.completion-delivery.dispose":
    case "thread.created.record":
      return command.parentThreadId;
    case "secret_request.record":
    case "link_request.record":
    case "feedback_request.record":
      return command.threadId;
    case "thread.fork":
    case "thread.merge_back":
      return command.targetThreadId;
  }
}

// Validate before resolving the request: adapters may otherwise coerce unusable answers.
const decodeUserInputAnswers = Schema.decodeUnknownEffect(
  Schema.Record(
    Schema.String,
    Schema.Union([
      Schema.String,
      Schema.Array(Schema.String),
      Schema.Struct({ answers: Schema.Array(Schema.String) }),
    ]),
  ),
);

function pendingThreadTitleGenerationEffect(
  commandId: CommandId,
  threadId: ThreadId,
  kind:
    | { readonly type: "initial"; readonly messageId: MessageId }
    | { readonly type: "regenerate" },
): PendingOrchestrationEffectV2 {
  return {
    id: `effect:${commandId}:thread-title.generate`,
    commandId,
    threadId,
    request: { type: "thread-title.generate", kind },
  };
}

// Clients seed a new thread with its first message, and empty threads start as "New thread" or
// an agent's placeholder. Any other title on a thread without messages was chosen on purpose.
// A fork or side chat starts with a title its first message replaces, so only a rename keeps it.
function hasTitleSetBeforeFirstMessage(
  thread: OrchestrationV2AppThread,
  titleSeed: string | undefined,
): boolean {
  if (thread.titleRenamed === true) return true;
  const title = thread.title.trim();
  return (
    thread.forkedFrom === null &&
    thread.lineage.sideChat !== true &&
    title.length > 0 &&
    title !== "New thread" &&
    !isPlaceholderThreadTitle(title) &&
    title !== titleSeed?.trim()
  );
}

function delegatedTasksStopEffect(command: {
  readonly commandId: CommandId;
  readonly threadId: ThreadId;
  readonly reason?: string | undefined;
}): PendingOrchestrationEffectV2 {
  return {
    id: `effect:${command.commandId}:delegated-tasks.stop`,
    commandId: command.commandId,
    threadId: command.threadId,
    request: {
      type: "delegated-tasks.stop",
      ...(command.reason === undefined ? {} : { reason: command.reason }),
    },
  };
}

const WORKSPACE_PREPARATION_INPUT = "Preparing workspace";
/** How long automatic settlement waits for a queued turn to start. */
export const QUEUED_TURN_START_GRACE_MS = 2 * 60 * 1_000;
const RUNTIME_REQUEST_DELIVERY_FAILED_MESSAGE =
  "T3 Code could not confirm that your answer reached the agent. If the run stays stuck, stop it and try again.";

function withoutPreparationResult(
  item: Extract<OrchestrationV2TurnItem, { readonly type: "command_execution" }>,
) {
  const { output: _output, exitCode: _exitCode, outputIndicatesFailure: _failure, ...rest } = item;
  return rest;
}

/** Stop ended this task, so its result is not delivered to the parent agent. */
function cancelledAppOwnedTask(
  task: OrchestrationV2Subagent,
  now: DateTime.Utc,
): OrchestrationV2Subagent {
  return {
    ...task,
    status: "cancelled",
    completedAt: now,
    updatedAt: now,
    completionDelivery: { state: "disposed", observedByRunId: null },
  };
}

function askedForLinkedMachine(
  card: Extract<OrchestrationV2TurnItem, { readonly type: "link_request" }>,
  linked: Extract<OrchestrationV2InternalCommand, { readonly type: "link_request.record" }>,
): boolean {
  if (card.requestedAccess !== linked.requestedAccess) return false;
  if (card.environmentId !== undefined) return card.environmentId === linked.linkedEnvironmentId;
  if (card.url !== undefined) return linked.url !== undefined && card.url === linked.url;
  const normalize = (text: string | undefined) => text?.trim().toLowerCase() ?? "";
  const hint = normalize(card.hint);
  return hint !== "" && hint === normalize(linked.hint) && hint === normalize(linked.linkedLabel);
}

// A workspace change detaches the session, which can settle the calling run at once. Queuing its
// follow-up in a later command would let a delegated task report its result before that exists.
function metadataUpdateContinuation(
  command: Extract<OrchestrationV2Command, { readonly type: "thread.metadata.update" }>,
): Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }> | undefined {
  return command.continuation === undefined
    ? undefined
    : {
        type: "message.dispatch",
        commandId: command.commandId,
        threadId: command.threadId,
        messageId: command.continuation.messageId,
        text: command.continuation.text,
        attachments: [],
        dispatchMode: { type: "queue_after_active" },
        createdBy: "agent",
        creationSource: "mcp",
      };
}

// A later command for the first message would leave the new thread committed with no run,
// and every client would show it idle until that command landed.
function threadCreateInitialMessage(
  command: Extract<OrchestrationV2Command, { readonly type: "thread.create" }>,
): Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }> | undefined {
  if (command.initialMessage === undefined) return undefined;
  const { workspaceStrategy, ...message } = command.initialMessage;
  return {
    ...message,
    type: "message.dispatch",
    commandId: command.commandId,
    threadId: command.threadId,
    modelSelection: command.modelSelection,
    dispatchMode:
      workspaceStrategy === undefined
        ? { type: "start_immediately" }
        : { type: "defer_start", workspaceStrategy },
    createdBy: command.createdBy,
    creationSource: command.creationSource,
  };
}

// Provider wakes can start follow-up work; monitor updates only report progress.
// Dispatch takes the parent's lock for follow-ups because intake writes the parent.
function mayStartSubagentFollowup(
  command: Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }>,
): boolean {
  if (command.scheduledTaskId !== undefined || command.restartContinuationOfRunId !== undefined)
    return false;
  if (isCompactionCommandMessage({ role: "user", ...command })) return false;
  if (command.notification !== undefined)
    return (
      command.notification.source.kind !== "monitor" || command.notification.outcome !== "updated"
    );
  return (
    command.createdBy === "user" ||
    command.creationSource === "mcp" ||
    command.usageLimitContinuationOfRunId !== undefined
  );
}

/** Waiting runs only drain post-terminal output; their agent turn is over and still needs a wake. */
function isLiveRun(run: OrchestrationV2Run): boolean {
  return run.status === "preparing" || run.status === "starting" || run.status === "running";
}

function hasLiveRun(projection: Pick<OrchestrationV2ThreadProjection, "runs">): boolean {
  return projection.runs.some(isLiveRun);
}

function withPullRequestWatch(
  link: ThreadPullRequestLink,
  watch: ThreadPullRequestWatch | undefined,
): ThreadPullRequestLink {
  const { watch: previous, endedWatch, ...rest } = link;
  if (watch !== undefined) return { ...rest, watch };
  const ended = previous ?? endedWatch;
  return ended === undefined ? rest : { ...rest, endedWatch: ended };
}

function syncedPullRequestWatch(
  existing: ThreadPullRequestWatch | undefined,
  command: {
    readonly watch: ThreadPullRequestWatch | null;
    readonly checksPendingBefore?: boolean | undefined;
  },
): ThreadPullRequestWatch | undefined {
  if (command.watch === null) return undefined;
  // Only the agent sets `until`, so a read in flight keeps what the watch has now.
  const watch = withUntil(command.watch, existing?.until ?? "checks");
  // A push cleared the answer while this read was in flight, so its answer is the old head's.
  if (command.checksPendingBefore === undefined || existing?.checksPending !== undefined) {
    return watch;
  }
  return withoutChecksAnswer(watch);
}

function withUntil(
  watch: ThreadPullRequestWatch,
  until: PullRequestWatchUntil | undefined,
): ThreadPullRequestWatch {
  if (until === undefined || until === (watch.until ?? "checks")) return watch;
  if (until === "merged") return { ...watch, until };
  const { until: _checks, ...rest } = watch;
  return rest;
}

const withoutChecksAnswer = ({
  checksPending: _answer,
  ...watch
}: ThreadPullRequestWatch): ThreadPullRequestWatch => watch;

function legacyPullRequestLink(
  thread: OrchestrationV2AppThread,
  linked: ThreadLinkedPullRequest,
  now: DateTime.Utc,
): ThreadPullRequestLink {
  const key = legacyThreadPullRequestKey(linked);
  const existing = threadPullRequestsOf(thread).find((link) =>
    threadPullRequestKeysEqual(link, key),
  );
  return withPullRequestWatch(
    {
      ...key,
      url: canonicalizeGitCafePullRequestUrl(linked.url),
      source: "manual",
      linkedAt: DateTime.formatIso(now),
      snapshot: null,
      stack: null,
      ...(existing?.repositoryWebUrl !== undefined && {
        repositoryWebUrl: existing.repositoryWebUrl,
      }),
      ...(existing?.endedWatch && { endedWatch: existing.endedWatch }),
    },
    existing?.watch,
  );
}

const DELEGATED_RESULT_INLINE_BYTES = 16_000;

function delegatedCompletionWakeDetail(
  taskIds: ReadonlyArray<string>,
  tasks: ReadonlyArray<OrchestrationV2Subagent>,
): string {
  let remainingBytes = DELEGATED_RESULT_INLINE_BYTES;
  return taskIds
    .map((taskId) => {
      const task = tasks.find((candidate) => candidate.id === taskId);
      // A follow-up gets a fresh task id; the child thread links it to the task delegate_task returned.
      const thread = task?.childThreadId == null ? "" : ` in child thread ${task.childThreadId}`;
      const label = `Delegated task ${taskId}${task?.title == null ? "" : ` (${task.title})`}${thread}${task === undefined ? " reached a terminal state" : ` [${task.status}]`}`;
      if (task?.result != null) {
        const detail = `${label}:\n${task.result}`;
        const bytes = Buffer.byteLength(detail);
        if (bytes <= remainingBytes) {
          remainingBytes -= bytes;
          return detail;
        }
      }
      return `${label}. Use task_status with taskId ${taskId} to read the result.`;
    })
    .join("\n\n");
}

// Startup recovery settles whatever is still missed after this window.
const parentTaskSyncRetry = Schedule.exponential("1 second").pipe(
  Schedule.modifyDelay(({ duration }) =>
    Effect.succeed(Duration.min(duration, Duration.seconds(30))),
  ),
  Schedule.upTo({ duration: Duration.hours(1) }),
);

function isTerminalDelegatedTaskStatus(status: OrchestrationV2Subagent["status"]): boolean {
  return (
    status === "completed" ||
    status === "failed" ||
    status === "cancelled" ||
    status === "interrupted"
  );
}

function delegatedTaskTerminalStatus(
  status: OrchestrationV2Run["status"],
): OrchestrationV2Subagent["status"] | null {
  switch (status) {
    case "completed":
    case "failed":
    case "cancelled":
    case "interrupted":
      return status;
    case "rolled_back":
      return "cancelled";
    case "preparing":
    case "queued":
    case "starting":
    case "running":
    case "waiting":
      return null;
  }
}

/**
 * Failed worktree setup keeps the queue held so queued messages cannot start in the project checkout.
 * A run that started had its worktree, so ending it later is not a failed setup.
 */
function worktreeSetupPending(
  projection: Pick<OrchestrationV2ThreadProjection, "thread" | "runs">,
): boolean {
  return (
    projection.thread.worktreePath === null &&
    projection.runs.some(
      (run) =>
        (run.status === "failed" || run.status === "interrupted") &&
        run.startedAt === null &&
        run.workspacePreparation?.type === "worktree",
    )
  );
}

function nextQueuedRun(
  projection: Pick<OrchestrationV2ThreadProjection, "runs" | "messages">,
): OrchestrationV2Run | undefined {
  return queuedRunsInDeliveryOrder(projection).find((run) => run.queueHeld !== true);
}

// Delegated completions, monitor notifications and queued messages that name no model never choose a
// model, so a queued one runs on the thread's current pick rather than the one frozen at queue time.
function followsCurrentConversation(
  message:
    | Pick<
        OrchestrationV2ConversationMessage,
        | "createdBy"
        | "creationSource"
        | "notification"
        | "delegatedCompletion"
        | "followsThreadSelection"
      >
    | undefined,
): boolean {
  return (
    message?.delegatedCompletion !== undefined ||
    message?.followsThreadSelection === true ||
    (message?.notification?.source.kind === "monitor" && !isBufferedProviderNotification(message))
  );
}

function queuedRunModelSelection(
  projection: Pick<OrchestrationV2ThreadProjection, "thread" | "messages">,
  run: OrchestrationV2Run,
): ModelSelection {
  const message = projection.messages.find((candidate) => candidate.id === run.userMessageId);
  return followsCurrentConversation(message)
    ? projection.thread.modelSelection
    : run.modelSelection;
}

/** The selection the thread will be on once every queued run has started. */
function queueTailModelSelection(
  projection: Pick<OrchestrationV2ThreadProjection, "thread" | "runs" | "messages">,
): ModelSelection {
  return (
    queuedRunsInDeliveryOrder(projection).findLast(
      (run) =>
        !followsCurrentConversation(
          projection.messages.find((message) => message.id === run.userMessageId),
        ),
    )?.modelSelection ?? projection.thread.modelSelection
  );
}

/**
 * The provider's latest run stopped on its usage limit and nothing ran after it.
 * With `now` (automatic starts), a run on another provider since does not lift
 * a reported reset still in the future; an unknown reset is lifted, as transient 429s are.
 */
function usageLimitHoldsQueue(
  projection: Pick<OrchestrationV2ThreadProjection, "runs" | "turnItems" | "providerSessions">,
  providerInstanceId: ModelSelection["instanceId"],
  now?: DateTime.Utc,
): boolean {
  let latestSession: OrchestrationV2ThreadProjection["providerSessions"][number] | undefined;
  for (const session of projection.providerSessions) {
    if (
      session.providerInstanceId === providerInstanceId &&
      (latestSession === undefined ||
        DateTime.isGreaterThan(session.updatedAt, latestSession.updatedAt))
    ) {
      latestSession = session;
    }
  }
  const limited = usageLimitBlockedRun(
    projection.runs.filter((run) => run.providerInstanceId === providerInstanceId),
    projection.turnItems,
    latestSession?.lastError ?? null,
  );
  if (limited === null) return false;
  if (latestExecutedRun(projection.runs)?.id === limited.id) return true;
  if (now === undefined) return false;
  const resetAt = latestRootProviderFailure(limited, projection.turnItems)?.resetAt;
  return resetAt != null && Date.parse(resetAt) > DateTime.toEpochMillis(now);
}

function pullRequestSnapshotEndsWatch(
  snapshot: ThreadPullRequestLink["snapshot"],
  watchStartedAt: ThreadPullRequestWatch["startedAt"],
): boolean {
  return (
    snapshot?.state === "merged" ||
    // A restarted watch can see a closed snapshot from before the PR reopened.
    (snapshot?.state === "closed" &&
      DateTime.isGreaterThanOrEqualTo(
        DateTime.makeUnsafe(snapshot.syncedAt),
        DateTime.makeUnsafe(watchStartedAt),
      ))
  );
}

type MonitorPullRequestStamp = NonNullable<
  Extract<OrchestrationV2Notification["source"], { readonly kind: "monitor" }>["pullRequest"]
>;

function monitorPullRequestStamps(
  source: OrchestrationV2Notification["source"] | undefined,
): ReadonlyArray<MonitorPullRequestStamp> {
  if (source?.kind !== "monitor" || source.pullRequest === undefined) return [];
  return [source.pullRequest, ...(source.otherPullRequests ?? [])];
}

function isStalePullRequestWatchStamp(
  projection: Pick<OrchestrationV2ThreadProjection, "thread" | "messages">,
  stamp: MonitorPullRequestStamp,
): boolean {
  const link = threadPullRequestsOf(projection.thread).find(
    (candidate) =>
      candidate.source !== "stack-dismissed" && threadPullRequestKeysEqual(candidate, stamp),
  );
  if (link === undefined) return true;
  if (stamp.watchEnded === true) {
    // The final notice outlives its watch, but a replacement watch supersedes it.
    const latestWatch = link.watch ?? link.endedWatch;
    return latestWatch?.startedAt !== stamp.watchStartedAt;
  }
  if (link.watch === undefined) {
    // A watch the server ended with a final notice still owes the wakes it queued before it.
    const endedWithNotice = projection.messages.some((message) =>
      monitorPullRequestStamps(message.notification?.source).some(
        (ending) =>
          ending.watchEnded === true &&
          ending.watchStartedAt === stamp.watchStartedAt &&
          threadPullRequestKeysEqual(ending, stamp),
      ),
    );
    return (
      !endedWithNotice ||
      link.endedWatch?.startedAt !== stamp.watchStartedAt ||
      pullRequestSnapshotEndsWatch(link.snapshot, stamp.watchStartedAt)
    );
  }
  return (
    link.watch.startedAt !== stamp.watchStartedAt ||
    (stamp.headSha !== null && link.watch.headSha !== stamp.headSha) ||
    pullRequestSnapshotEndsWatch(link.snapshot, link.watch.startedAt)
  );
}

function isStalePullRequestWatchWake(
  projection: Pick<OrchestrationV2ThreadProjection, "thread" | "messages">,
  run: OrchestrationV2Run,
): boolean {
  const stamps = monitorPullRequestStamps(
    projection.messages.find((message) => message.id === run.userMessageId)?.notification?.source,
  );
  return (
    stamps.length > 0 && stamps.every((stamp) => isStalePullRequestWatchStamp(projection, stamp))
  );
}

/**
 * A queued wake covering several pull requests, rebuilt from the ones still current, or
 * undefined when it needs no change.
 */
function currentPullRequestWatchWake(
  projection: Pick<OrchestrationV2ThreadProjection, "thread" | "messages">,
  run: OrchestrationV2Run,
): OrchestrationV2ConversationMessage | undefined {
  const message = projection.messages.find((candidate) => candidate.id === run.userMessageId);
  const stamps = monitorPullRequestStamps(message?.notification?.source);
  if (message === undefined || stamps.length < 2) return undefined;
  const current = stamps.filter((stamp) => !isStalePullRequestWatchStamp(projection, stamp));
  const [first, ...rest] = current;
  if (first === undefined || rest.length === stamps.length - 1) return undefined;
  const sections = current.flatMap(({ section }) => (section === undefined ? [] : [section]));
  if (sections.length !== current.length) return undefined;
  const wake = combinePullRequestWatchWakes(
    sections.map(({ text, outcome, summary }) => ({
      text,
      notification: { source: { kind: "monitor" }, outcome, summary },
    })) as [PullRequestWatchWake, ...Array<PullRequestWatchWake>],
  );
  return {
    ...message,
    text: wake.text,
    notification: {
      ...wake.notification,
      source: {
        kind: "monitor",
        pullRequest: rest.length === 0 ? withoutSection(first) : first,
        ...(rest.length === 0 ? {} : { otherPullRequests: rest }),
      },
    },
  };
}

function withoutSection({ section: _, ...stamp }: MonitorPullRequestStamp) {
  return stamp;
}

function queuedRunCancellationEvents(
  projection: Pick<OrchestrationV2ThreadProjection, "nodes" | "attempts">,
  run: OrchestrationV2Run,
  now: DateTime.Utc,
): ReadonlyArray<Omit<OrchestrationV2DomainEvent, "id">> {
  const rootNode = projection.nodes.find((node) => node.id === run.rootNodeId);
  const attempt = projection.attempts.find((candidate) => candidate.id === run.activeAttemptId);
  const events: Array<Omit<OrchestrationV2DomainEvent, "id">> = [
    {
      type: "run.updated",
      threadId: run.threadId,
      runId: run.id,
      ...(run.rootNodeId === null ? {} : { nodeId: run.rootNodeId }),
      providerInstanceId: run.providerInstanceId,
      occurredAt: now,
      payload: { ...run, status: "cancelled", queuePosition: null, completedAt: now },
    },
  ];
  if (attempt !== undefined && rootNode !== undefined) {
    events.push({
      type: "run-attempt.updated",
      threadId: run.threadId,
      runId: run.id,
      nodeId: rootNode.id,
      providerInstanceId: run.providerInstanceId,
      occurredAt: now,
      payload: { ...attempt, status: "cancelled", completedAt: now },
    });
  }
  if (rootNode !== undefined) {
    events.push({
      type: "node.updated",
      threadId: run.threadId,
      runId: run.id,
      nodeId: rootNode.id,
      providerInstanceId: run.providerInstanceId,
      occurredAt: now,
      payload: { ...rootNode, status: "cancelled", completedAt: now },
    });
  }
  return events;
}

function latestStartedRun(runs: ReadonlyArray<OrchestrationV2Run>): OrchestrationV2Run | undefined {
  return runs
    .filter((run) => run.status !== "queued")
    .reduce<OrchestrationV2Run | undefined>(
      (latest, run) => (latest === undefined || run.ordinal > latest.ordinal ? run : latest),
      undefined,
    );
}

function latestStableRun(
  projection: Pick<OrchestrationV2ThreadProjection, "runs">,
): OrchestrationV2Run | null {
  return (
    projection.runs
      .filter((run) => run.status === "completed" && run.checkpointId !== null)
      .toSorted((left, right) => right.ordinal - left.ordinal)[0] ?? null
  );
}

function runForSourcePoint(
  projection: Pick<OrchestrationV2ThreadProjection, "runs" | "checkpoints">,
  sourcePoint: Extract<
    OrchestrationV2Command,
    { readonly type: "thread.fork" | "thread.merge_back" }
  >["sourcePoint"],
): OrchestrationV2Run | null {
  switch (sourcePoint.type) {
    case "latest_stable":
      return latestStableRun(projection);
    case "run":
      return projection.runs.find((run) => run.id === sourcePoint.runId) ?? null;
    case "checkpoint": {
      const checkpoint = projection.checkpoints.find(
        (candidate) => candidate.id === sourcePoint.checkpointId,
      );
      return checkpoint?.runId === null || checkpoint === undefined
        ? null
        : (projection.runs.find((run) => run.id === checkpoint.runId) ?? null);
    }
  }
}

const DELEGATED_CHILD_RUN_WINDOW = 20;

export type DelegatedChildControls = ProjectionRecords<
  "runs" | "messages" | "subagents" | "providerThreads"
> & {
  /** Set when `runs` holds only what ran since this run, plus older unfinished and task runs. */
  readonly runsFloor?: OrchestrationV2Run | undefined;
};

function ranSince(run: OrchestrationV2Run, floor: OrchestrationV2Run): boolean {
  return run.id === floor.id || runRanAfter(run, floor);
}

/** The walk back to a report is exact when it stops at a run that ran since the floor. */
function reportRunsRead(
  controls: DelegatedChildControls,
  run: OrchestrationV2Run,
  reportRuns: ReadonlyArray<OrchestrationV2Run>,
): boolean {
  const floor = controls.runsFloor;
  if (floor === undefined || run.status !== "completed") return true;
  const oldest = reportRuns.at(-1) ?? run;
  if (!ranSince(oldest, floor)) return false;
  const monitorRuns = monitorUpdateRunIds(controls.messages);
  return controls.runs.some(
    (candidate) =>
      candidate.id !== run.id &&
      candidate.startedAt !== null &&
      candidate.status !== "rolled_back" &&
      !monitorRuns.has(candidate.id) &&
      runRanAfter(oldest, candidate) &&
      ranSince(candidate, floor),
  );
}

function providerThreadForRun(
  projection: Pick<OrchestrationV2ThreadProjection, "providerThreads">,
  run: OrchestrationV2Run,
): OrchestrationV2ProviderThread | undefined {
  return run.providerThreadId === null
    ? undefined
    : projection.providerThreads.find((candidate) => candidate.id === run.providerThreadId);
}

export function providerTurnForRun(
  projection: Pick<OrchestrationV2ThreadProjection, "providerTurns" | "attempts">,
  run: OrchestrationV2Run,
): OrchestrationV2ProviderTurn | undefined {
  if (run.activeAttemptId === null) {
    return undefined;
  }
  const latest = latestProviderTurnForAttempt(projection.providerTurns, run.activeAttemptId);
  if (latest !== undefined) {
    return latest;
  }
  const namedTurnId = projection.attempts.find(
    (candidate) => candidate.id === run.activeAttemptId,
  )?.providerTurnId;
  return namedTurnId === undefined || namedTurnId === null
    ? undefined
    : projection.providerTurns.find((turn) => turn.id === namedTurnId);
}

function contextSourcePointForRun(
  projection: Pick<
    OrchestrationV2ThreadProjection,
    "thread" | "providerThreads" | "providerTurns" | "attempts"
  >,
  run: OrchestrationV2Run,
): OrchestrationV2ContextSourcePoint {
  const providerThread = providerThreadForRun(projection, run);
  const providerTurn = providerTurnForRun(projection, run);
  return {
    threadId: projection.thread.id,
    runId: run.id,
    ...(run.checkpointId === null ? {} : { checkpointId: run.checkpointId }),
    ...(providerThread?.nativeThreadRef === null || providerThread?.nativeThreadRef === undefined
      ? {}
      : { providerThreadRef: providerThread.nativeThreadRef }),
    ...(providerTurn?.nativeTurnRef === null || providerTurn?.nativeTurnRef === undefined
      ? {}
      : { providerTurnRef: providerTurn.nativeTurnRef }),
  };
}

function pendingForkTransferForThread(
  projection: Pick<OrchestrationV2ThreadProjection, "contextTransfers" | "thread">,
): OrchestrationV2ContextTransfer | undefined {
  return projection.contextTransfers.find(
    (transfer) =>
      transfer.type === "fork" &&
      transfer.targetThreadId === projection.thread.id &&
      transfer.status === "pending",
  );
}

/** A fork transfer still pending when a fresh run starts would bring the parent's context back. */
function forkTransferSupersededEvent(
  transfer: OrchestrationV2ContextTransfer,
  runId: RunId,
  providerInstanceId: ProviderInstanceId,
  now: DateTime.Utc,
): Omit<OrchestrationV2DomainEvent, "id"> {
  return {
    type: "context-transfer.updated",
    threadId: transfer.targetThreadId,
    runId,
    providerInstanceId,
    occurredAt: now,
    payload: {
      ...transfer,
      status: "superseded",
      error: "Superseded by a fresh session.",
      updatedAt: now,
    },
  };
}

function pendingMergeBackTransfersForThread(
  projection: Pick<OrchestrationV2ThreadProjection, "contextTransfers" | "thread">,
): ReadonlyArray<OrchestrationV2ContextTransfer> {
  return projection.contextTransfers.filter(
    (transfer) =>
      transfer.type === "merge_back" &&
      transfer.targetThreadId === projection.thread.id &&
      transfer.status === "pending",
  );
}

function latestContextTransfer(
  transfers: ReadonlyArray<OrchestrationV2ContextTransfer>,
): OrchestrationV2ContextTransfer | undefined {
  return transfers.reduce<OrchestrationV2ContextTransfer | undefined>((latest, transfer) => {
    if (latest === undefined) {
      return transfer;
    }
    return DateTime.toEpochMillis(transfer.updatedAt) >= DateTime.toEpochMillis(latest.updatedAt)
      ? transfer
      : latest;
  }, undefined);
}

export function shouldPrepareLegacyImportHandoff(input: {
  readonly hasNativeHistory?: boolean;
  readonly hasCompletedRun: boolean;
  readonly historyOrigin: OrchestrationV2AppThread["historyOrigin"];
  readonly legacyImportItemCount: number;
}): boolean {
  return (
    input.historyOrigin === "v1_import" &&
    !input.hasNativeHistory &&
    !input.hasCompletedRun &&
    input.legacyImportItemCount > 0
  );
}

function appendContextHandoffId(
  handoffIds: OrchestrationV2ProviderThread["handoffIds"],
  handoffId: OrchestrationV2ContextHandoff["id"] | null,
): OrchestrationV2ProviderThread["handoffIds"] {
  return handoffId === null ? handoffIds : Array.from(new Set([...handoffIds, handoffId]));
}

/** The provider thread a message continues: the active one, unless a fresh-session schedule run started it or it predates the latest fresh start. */
function conversationProviderThread(
  projection: Pick<
    OrchestrationV2ThreadProjection,
    "thread" | "providerThreads" | "runs" | "turnItems"
  >,
): OrchestrationV2ProviderThread | undefined {
  const startedByScheduledFreshRun = (providerThread: OrchestrationV2ProviderThread) =>
    projection.runs.some(
      (run) =>
        run.ordinal === providerThread.firstRunOrdinal &&
        isScheduledFreshRun(run, projection.turnItems),
    );
  const active = projection.providerThreads.find(
    (candidate) => candidate.id === projection.thread.activeProviderThreadId,
  );
  if (active === undefined) return active;
  const boundary = contextBoundaryOrdinal(projection);
  // A pre-clear session that is still alive (background work) can become active again on its updates.
  if (!startedByScheduledFreshRun(active) && !providerThreadPredatesBoundary(active, boundary)) {
    return active;
  }
  return (
    projection.providerThreads
      .filter(
        (candidate) =>
          candidate.appThreadId === projection.thread.id &&
          candidate.ownerNodeId === null &&
          candidate.lastRunOrdinal !== null &&
          !providerThreadPredatesBoundary(candidate, boundary) &&
          !startedByScheduledFreshRun(candidate),
      )
      .toSorted((left, right) => (right.lastRunOrdinal ?? 0) - (left.lastRunOrdinal ?? 0))[0] ??
    active
  );
}

/** Wakes and fresh starts act on the active session; a message continues the conversation. */
function dispatchProviderThread(
  projection: Pick<
    OrchestrationV2ThreadProjection,
    "thread" | "providerThreads" | "runs" | "turnItems"
  >,
  message: Pick<OrchestrationV2ConversationMessage, "notification" | "delegatedCompletion">,
  freshContext: boolean,
): OrchestrationV2ProviderThread | undefined {
  return freshContext ||
    message.notification !== undefined ||
    message.delegatedCompletion !== undefined
    ? projection.providerThreads.find(
        (candidate) => candidate.id === projection.thread.activeProviderThreadId,
      )
    : conversationProviderThread(projection);
}

/** Threads with no started run (imported, or reserved by another queued run) never cross it. */
function providerThreadPredatesBoundary(
  providerThread: Pick<OrchestrationV2ProviderThread, "firstRunOrdinal">,
  boundary: number,
): boolean {
  return (
    boundary > 0 &&
    (providerThread.firstRunOrdinal === null || providerThread.firstRunOrdinal < boundary)
  );
}

/** A provider that hosts one native thread per session keeps the old conversation alive otherwise. */
function sessionsReleasedByFreshContext(
  projection: Pick<OrchestrationV2ThreadProjection, "providerSessions">,
  activeProviderThread: OrchestrationV2ProviderThread | undefined,
): ReadonlyArray<OrchestrationV2ProviderSession> {
  const sessionId = activeProviderThread?.providerSessionId ?? null;
  return projection.providerSessions.filter(
    (session) =>
      session.id === sessionId &&
      session.status !== "stopped" &&
      session.status !== "error" &&
      !session.capabilities.sessions.supportsMultipleProviderThreadsPerSession,
  );
}

const FRESH_CONTEXT_DETACH_REASON = "Started a fresh session.";

function uniqueSessions(
  sessions: ReadonlyArray<OrchestrationV2ProviderSession>,
): ReadonlyArray<OrchestrationV2ProviderSession> {
  return Array.from(new Map(sessions.map((session) => [session.id, session])).values());
}

function rootProviderThreadsForProvider(
  projection: Pick<
    OrchestrationV2ThreadProjection,
    "providerThreads" | "thread" | "runs" | "turnItems"
  >,
  providerInstanceId: ModelSelection["instanceId"],
): ReadonlyArray<OrchestrationV2ProviderThread> {
  const boundary = contextBoundaryOrdinal(projection);
  return projection.providerThreads
    .filter(
      (providerThread) =>
        providerThread.providerInstanceId === providerInstanceId &&
        providerThread.appThreadId === projection.thread.id &&
        providerThread.ownerNodeId === null &&
        !providerThreadPredatesBoundary(providerThread, boundary),
    )
    .toSorted(
      (left, right) =>
        (right.lastRunOrdinal ?? 0) - (left.lastRunOrdinal ?? 0) ||
        DateTime.toEpochMillis(right.updatedAt) - DateTime.toEpochMillis(left.updatedAt),
    );
}

function isHandoffSourceRun(run: OrchestrationV2Run): boolean {
  return (
    run.status === "completed" ||
    run.status === "failed" ||
    run.status === "interrupted" ||
    // A queued request cancelled before it started never reached any provider.
    (run.status === "cancelled" && run.startedAt !== null)
  );
}

function lastDeliveredRunForProviderThread(
  projection: Pick<OrchestrationV2ThreadProjection, "runs" | "providerTurns">,
  providerThreadId: OrchestrationV2ProviderThread["id"],
): OrchestrationV2Run | undefined {
  return projection.runs.findLast(
    (run) =>
      isHandoffSourceRun(run) &&
      run.providerThreadId === providerThreadId &&
      (run.status === "completed" ||
        projection.providerTurns.some(
          (turn) => turn.runAttemptId === run.activeAttemptId && isDeliveredProviderTurn(turn),
        )),
  );
}

export type DyingNativeSubagent = {
  readonly projection: Pick<OrchestrationV2ThreadProjection, "nodes" | "subagents" | "turnItems">;
  readonly subagent: Pick<
    Extract<OrchestrationV2TurnItem, { readonly type: "subagent" }>,
    "subagentId" | "origin" | "childThreadId" | "providerInstanceId"
  >;
};

const nativeSubagentRef = (subagent: OrchestrationV2Subagent): DyingNativeSubagent["subagent"] => ({
  subagentId: subagent.id,
  origin: subagent.origin,
  childThreadId: subagent.childThreadId,
  providerInstanceId: subagent.providerInstanceId,
});

const hasRunningDelegatedTasks = (subagents: ReadonlyArray<OrchestrationV2Subagent>) =>
  subagents.some(
    (task) =>
      task.origin === "app_owned" &&
      task.childThreadId !== null &&
      isOrchestrationV2WorkActive(task.status),
  );

const makeOrchestrator = Effect.fn("orchestrationV2.Orchestrator.layer")(function* () {
  const checkpointService = yield* CheckpointServiceV2;
  const commandPolicy = yield* CommandPolicyV2;
  const contextHandoffService = yield* ContextHandoffServiceV2;
  const eventSink = yield* EventSinkV2;
  const commandReceipts = yield* CommandReceiptStoreV2;
  const idAllocator = yield* IdAllocator.IdAllocatorV2;
  const projects = yield* ProjectStore.ProjectStoreV2;
  const taskFolderStore = yield* TaskFolderStore.TaskFolderStore;
  const worktreeSetupTracker = yield* WorktreeSetupTracker.WorktreeSetupTracker;
  const projectionStore = yield* ProjectionStoreV2;
  const effectOutbox = yield* EffectOutbox.EffectOutboxV2;
  const nextTurnItemOrdinal = (
    projection: Pick<OrchestrationV2ThreadProjection, "thread"> &
      Partial<Pick<OrchestrationV2ThreadProjection, "turnItems">>,
  ) =>
    projectionStore.getNextTurnItemOrdinal(projection.thread.id).pipe(
      Effect.mapError(
        (cause) => new OrchestratorProjectionError({ threadId: projection.thread.id, cause }),
      ),
      Effect.map((next) =>
        (projection.turnItems ?? []).reduce(
          (ordinal, item) => Math.max(ordinal, item.ordinal + 1),
          next,
        ),
      ),
    );

  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const providerAdapters = yield* ProviderAdapterRegistryV2;
  const continuationRequests = yield* ProviderContinuationRequests.ProviderContinuationRequests;
  const providerSessions = yield* ProviderSessionManagerV2;
  const providerSwitchService = yield* ProviderSwitchServiceV2;
  const serverSettings = yield* ServerSettings.ServerSettingsService;
  const runtimePolicy = yield* RuntimePolicyV2;
  const threadForkService = yield* ThreadForkServiceV2;
  const threadDispatch = yield* ThreadCommandExecutor.ThreadCommandExecutor;
  const messageIntake = yield* KeyedLock.make<ThreadId>();
  // Read once: the policy is fixed for the server's life, and dispatch takes it as an input.
  const { managedPolicy } = serverSettings;
  const runtimeModeCeiling: RuntimeModeCeiling | undefined =
    managedPolicy?.limits?.maxRuntimeMode === undefined
      ? undefined
      : {
          organization: managedPolicy.organization,
          maxRuntimeMode: managedPolicy.limits.maxRuntimeMode,
        };

  /** The driver when this provider runs `/goal` natively, else undefined. */
  const goalDriverFor = Effect.fn("Orchestrator.goalDriverFor")(function* (
    command: Pick<OrchestrationV2ServerCommand, "commandId" | "type">,
    providerInstanceId: ProviderInstanceId,
  ) {
    const adapter = yield* providerAdapters.get(providerInstanceId).pipe(mapDispatchError(command));
    const { driver } = adapter;
    if (driver === "opencode" || driver === "antigravity") {
      const capabilities = yield* adapter.getCapabilities().pipe(mapDispatchError(command));
      return capabilities.turns.supportsNativeGoals === true ? driver : undefined;
    }
    return driver === "codex" || driver === "claudeAgent" ? driver : undefined;
  });

  /** Unsupported goal controls can become new objectives in native providers. */
  const ensureGoalCommandSupported = Effect.fn("Orchestrator.ensureGoalCommandSupported")(
    function* (
      command: Pick<OrchestrationV2ServerCommand, "commandId" | "type">,
      message: { readonly text: string; readonly attachments: ReadonlyArray<ChatAttachment> },
      providerInstanceId: ProviderInstanceId,
    ) {
      const goalCommand = parseGoalCommand(message);
      if (goalCommand === null || goalCommand.type === "set") return;
      const driver = yield* goalDriverFor(command, providerInstanceId);
      if (driver === "antigravity") {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause:
            "Antigravity accepts /goal followed by an objective. Interrupt the running turn, then ask Antigravity to stop the current goal.",
        });
      }
      if (goalCommand.type !== "pause" && goalCommand.type !== "resume") return;
      if (driver !== "claudeAgent") return;
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: "Claude goals cannot be paused or resumed. Send /goal clear to remove the goal.",
      });
    },
  );

  const mapDispatchError =
    (command: Pick<OrchestrationV2ServerCommand, "commandId" | "type">) =>
    <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, OrchestratorDispatchError, R> =>
      effect.pipe(
        Effect.mapError(
          (cause) =>
            new OrchestratorDispatchError({
              commandId: command.commandId,
              commandType: command.type,
              cause,
            }),
        ),
      );

  const mapDelegatedCompletionError = <A, E, R>(effect: Effect.Effect<A, E, R>) =>
    effect.pipe(
      Effect.mapError(
        (cause) =>
          new OrchestratorDispatchError({
            commandId: CommandId.make("command:system:delegated-completion-delivery"),
            commandType: "delegated_task.completion-delivery",
            cause,
          }),
      ),
    );

  const providerSessionIdFor = (input: {
    readonly adapter: ProviderAdapter.ProviderAdapterV2["Service"];
    readonly providerInstanceId: ProviderInstanceId;
    readonly threadId: ThreadId;
  }) =>
    input.adapter.getCapabilities().pipe(
      Effect.flatMap((capabilities) =>
        capabilities.sessions.supportsMultipleProviderThreadsPerSession
          ? Effect.succeed(
              idAllocator.derive.providerSession({
                providerInstanceId: input.providerInstanceId,
              }),
            )
          : idAllocator.allocate.providerSession({
              providerInstanceId: input.providerInstanceId,
              threadId: input.threadId,
            }),
      ),
    );

  const makeEvent =
    /* This helper runs for individual orchestration events; the enclosing operation owns the span. */
    Effect.fnUntraced(function* <Event extends OrchestrationV2DomainEvent>(
      command: OrchestrationV2ServerCommand,
      event: Omit<Event, "id">,
    ) {
      const eventId = yield* mapDispatchError(command)(
        idAllocator.allocate.event({
          threadId: event.threadId,
          commandId: command.commandId,
        }),
      );
      const allocated: any = Object.assign({}, event, { id: eventId });
      return allocated;
    });

  const emit =
    (events: Ref.Ref<Array<OrchestrationV2DomainEvent>>, command: OrchestrationV2ServerCommand) =>
    <Event extends OrchestrationV2DomainEvent>(event: Omit<Event, "id">) =>
      Effect.gen(function* () {
        const withId = yield* makeEvent(command, event);
        yield* Ref.update(events, (existing) => [...existing, withId]);
        return withId;
      });

  // Detaching kills background work running inside the provider process.
  // Probe even with an empty roster: Claude's native subagents never reach
  // pendingBackgroundTasks. Sessions shared across threads probe per thread.
  const sessionHasBackgroundWork = Effect.fn("Orchestrator.sessionHasBackgroundWork")(function* (
    detaching: OrchestrationV2ThreadProjection["providerSessions"][number],
    providerThreads: OrchestrationV2ThreadProjection["providerThreads"],
  ) {
    const session = yield* providerSessions
      .get(detaching.id)
      .pipe(Effect.orElseSucceed(() => Option.none()));
    const runtime = Option.getOrUndefined(session);
    if (runtime === undefined) return false;
    const probes =
      !detaching.capabilities.sessions.supportsMultipleProviderThreadsPerSession &&
      runtime.hasPendingBackgroundWork !== undefined
        ? [runtime.hasPendingBackgroundWork]
        : providerThreads.flatMap((providerThread) =>
            providerThread.providerSessionId === detaching.id &&
            runtime.hasPendingBackgroundWorkForThread !== undefined
              ? [runtime.hasPendingBackgroundWorkForThread(providerThread)]
              : [],
          );
    for (const probe of probes) {
      // A failed probe cannot confirm that the work ended.
      if (yield* probe.pipe(Effect.catchCause(() => Effect.succeed(true)))) return true;
    }
    return false;
  });

  // Runs in every command transaction; avoid reading thousands of finished leaf nodes.
  const readCommandProjection = (
    threadId: ThreadId,
    recent?: ProjectionRecordFilter["sinceLastCompaction"],
  ) =>
    projectionStore
      .getThreadRecords(
        threadId,
        [
          "runs",
          "attempts",
          "nodes",
          "subagents",
          "providerSessions",
          "providerThreads",
          "providerTurns",
          "runtimeRequests",
          "messages",
          "turnItems",
          "checkpointScopes",
          "contextTransfers",
        ],
        {
          turnItemTypes: ["user_message", "error"],
          messageRoles: ["user"],
          omitSettledLeafNodes: true,
          // Commands here read only undelivered or active tasks; a dispatcher thread keeps
          // thousands of delivered ones, each carrying its full prompt.
          omitSettledSubagents: true,
          // No command reads a settled task's node or its child's provider thread.
          omitSettledSubagentRecords: true,
          // Commands act on pending forks and merge-backs only; consumed ones stay unread.
          contextTransferStatuses: ["pending"],
          ...(recent === undefined ? {} : { sinceLastCompaction: recent }),
        },
      )
      .pipe(
        Effect.map((records): OrchestrationV2ThreadProjection => ({
          ...records,
          checkpoints: [],
          plans: [],
          contextHandoffs: [],
          visibleTurnItems: [],
          updatedAt: records.thread.updatedAt,
        })),
        Effect.flatMap(holdRunAwaitingCapture),
        Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })),
      );

  // Commands decide as if the latest run were still `waiting` until its turn-end capture commits:
  // the capture keeps the thread's effect lane, and steers and queued turns must line up behind it.
  const holdRunAwaitingCapture = Effect.fn("Orchestrator.holdRunAwaitingCapture")(function* (
    projection: OrchestrationV2ThreadProjection,
  ) {
    const latest = latestStartedRun(projection.runs);
    if (latest === undefined || !(yield* awaitsCheckpointCapture(latest))) return projection;
    return {
      ...projection,
      runs: projection.runs.map((run) =>
        run.id === latest.id ? { ...run, status: "waiting" as const, completedAt: null } : run,
      ),
    };
  });

  // Command reads omit settled tasks, but a completion notice counts its whole cohort.
  const notificationTasks = (
    threadId: ThreadId,
    message: Pick<OrchestrationV2ConversationMessage, "delegatedCompletion">,
    loaded: ReadonlyArray<OrchestrationV2Subagent>,
  ) =>
    message.delegatedCompletion === undefined
      ? Effect.succeed(loaded)
      : projectionStore
          .getThreadRecords(threadId, ["subagents"], {
            subagentRunIds: [message.delegatedCompletion.parentRunId],
          })
          .pipe(
            Effect.map((records) => records.subagents),
            Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })),
          );

  const readHandoffItems = (threadId: ThreadId, runIds?: ReadonlyArray<RunId | null>) =>
    projectionStore
      .getThreadRecords(
        threadId,
        ["turnItems"],
        runIds === undefined ? undefined : { turnItemRunIds: runIds },
      )
      .pipe(
        Effect.map((records) => records.turnItems),
        Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })),
      );

  const readInheritedItems = (thread: OrchestrationV2AppThread) =>
    readInheritedHandoffItems(projectionStore, thread).pipe(
      Effect.mapError((cause) => new OrchestratorProjectionError({ threadId: thread.id, cause })),
    );

  /** Includes tombstones, which still reserve their id. */
  const findThread = (threadId: ThreadId) =>
    projectionStore
      .findThread(threadId)
      .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));

  /** Side chats live inside their parent, so deleting or archiving the parent takes them too. */
  const liveSideChatIds = Effect.fn("Orchestrator.liveSideChatIds")(
    function* (threadId: ThreadId) {
      const { contextTransfers } = yield* projectionStore
        .getThreadRecords(threadId, ["contextTransfers"])
        .pipe(
          Effect.catchTags({
            ProjectionStoreThreadNotFoundError: () => Effect.succeed({ contextTransfers: [] }),
          }),
        );
      const sideChatIds: Array<ThreadId> = [];
      for (const transfer of contextTransfers) {
        if (transfer.type !== "fork" || transfer.sourceThreadId !== threadId) continue;
        const child = yield* projectionStore.findThread(transfer.targetThreadId);
        if (child?.lineage.sideChat === true && child.deletedAt === null) {
          sideChatIds.push(child.id);
        }
      }
      return sideChatIds;
    },
    (effect, threadId) =>
      effect.pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause }))),
  );

  const getProjectionWithPendingEvents =
    /* This helper runs for individual orchestration events; the enclosing operation owns the span. */
    Effect.fnUntraced(function* (
      threadId: ThreadId,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      recent?: ProjectionRecordFilter["sinceLastCompaction"],
    ) {
      const pending = (yield* Ref.get(events)).filter((event) => event.threadId === threadId);
      let created:
        | Extract<OrchestrationV2DomainEvent, { readonly type: "thread.created" }>
        | undefined;
      for (const event of pending) {
        if (event.type === "thread.created") {
          created = event;
          break;
        }
      }
      // A thread created here has no stored row: create and fork refuse used ids, delegation derives a fresh one.
      let projection: OrchestrationV2ThreadProjection;
      if (created === undefined) {
        projection = yield* readCommandProjection(threadId, recent);
      } else {
        projection = emptyProjection(created);
      }

      for (const event of pending) {
        if (event.type === "thread.created" && projection.thread.id === event.payload.id) {
          projection = { ...projection, thread: event.payload, updatedAt: event.occurredAt };
          continue;
        }
        projection = applyToProjection(projection, event);
      }
      return projection;
    });

  const makeSystemEvent =
    /* This helper runs for individual orchestration events; the enclosing operation owns the span. */
    Effect.fnUntraced(function* <Event extends OrchestrationV2DomainEvent>(
      event: Omit<Event, "id">,
    ) {
      const eventId = yield* idAllocator.allocate.event({
        threadId: event.threadId,
      });
      const allocated: any = Object.assign({}, event, { id: eventId });
      return allocated;
    });

  const writeSystemEvents =
    /* This helper runs for individual orchestration events; the enclosing operation owns the span. */
    Effect.fnUntraced(function* (
      events: ReadonlyArray<Omit<OrchestrationV2DomainEvent, "id">>,
      effects: ReadonlyArray<PendingOrchestrationEffectV2> = [],
      options: { readonly updateDelegatedCompletionOnly?: boolean } = {},
    ) {
      const withIds = yield* Effect.forEach(events, (event) => makeSystemEvent(event));
      yield* eventSink.writeWithEffects({ events: withIds, effects, ...options });
    });

  const completionDeliveryRun = (
    projection: Pick<OrchestrationV2ThreadProjection, "messages" | "runs">,
    delivery: OrchestrationV2DelegatedCompletionDelivery | null | undefined,
  ) => {
    if (delivery == null) return undefined;
    const message = projection.messages.find((candidate) => candidate.id === delivery.messageId);
    return projection.runs.find((candidate) => candidate.id === message?.runId);
  };

  const completionDeliveryMessage = (
    projection: Pick<OrchestrationV2ThreadProjection, "messages">,
    delivery: OrchestrationV2DelegatedCompletionDelivery | null | undefined,
  ) =>
    delivery === null || delivery === undefined
      ? undefined
      : projection.messages.find((candidate) => candidate.id === delivery.messageId);

  const isUnobservedAcknowledgement = (command: OrchestrationV2ServerCommand): boolean =>
    command.type === "delegated_task.completion-delivery.acknowledge" &&
    command.observedByRunId === null;

  /** Parent run and wake message events that commit a planDelegatedCompletionDelivery result. */
  const delegatedCompletionPlanEvents = (
    threadId: ThreadId,
    plan: {
      readonly parentRun: OrchestrationV2Run | undefined;
      readonly message: OrchestrationV2ThreadProjection["messages"][number] | undefined;
    },
    threadProviderInstanceId: ProviderInstanceId,
    occurredAt: DateTime.Utc,
  ): ReadonlyArray<Omit<OrchestrationV2DomainEvent, "id">> => [
    ...(plan.parentRun === undefined
      ? []
      : [
          {
            type: "run.updated" as const,
            threadId,
            runId: plan.parentRun.id,
            ...(plan.parentRun.rootNodeId === null ? {} : { nodeId: plan.parentRun.rootNodeId }),
            providerInstanceId: plan.parentRun.providerInstanceId,
            occurredAt,
            payload: plan.parentRun,
          },
        ]),
    ...(plan.message === undefined
      ? []
      : [
          {
            type: "message.updated" as const,
            threadId,
            ...(plan.message.runId === null ? {} : { runId: plan.message.runId }),
            ...(plan.message.nodeId === null ? {} : { nodeId: plan.message.nodeId }),
            providerInstanceId: plan.parentRun?.providerInstanceId ?? threadProviderInstanceId,
            occurredAt,
            payload: plan.message,
          },
        ]),
  ];

  /** The parent records `planDelegatedCompletionDelivery` reads for one task: its run, and the queued wake's message, run and tasks. */
  const readDelegatedCompletionPlanRecords =
    /* The delegated task operation that calls this owns the span. */
    Effect.fnUntraced(function* (parentThreadId: ThreadId, task: OrchestrationV2Subagent) {
      const {
        thread,
        runs: [parentRun],
      } = yield* projectionStore.getThreadRecords(parentThreadId, ["runs"], {
        runIds: task.runId === null ? [] : [task.runId],
      });
      const delivery = parentRun?.delegatedCompletion?.delivery;
      if (delivery == null) return { thread, parentRun, runs: [], messages: [], subagents: [] };
      const { messages } = yield* projectionStore.getThreadRecords(parentThreadId, ["messages"], {
        messageIds: [delivery.messageId],
        messageRoles: ["user"],
      });
      const deliveryRunId = messages[0]?.runId;
      const { runs, subagents } = yield* projectionStore.getThreadRecords(
        parentThreadId,
        ["runs", "subagents"],
        {
          runIds: deliveryRunId == null ? [] : [deliveryRunId],
          subagentIds: [...delivery.taskIds, task.id],
        },
      );
      return { thread, parentRun, runs, messages, subagents };
    });

  const offerDelegatedCompletionDelivery =
    /* This helper runs for individual orchestration events; the enclosing operation owns the span. */
    Effect.fnUntraced(function* (threadId: ThreadId, parentRunId: RunId) {
      const controls = yield* projectionStore.getThreadRecords(threadId, ["runs"], {
        runIds: [parentRunId],
      });
      const parentRun = controls.runs[0];
      const cohort = parentRun?.delegatedCompletion;
      const delivery = cohort?.delivery;
      if (
        parentRun === undefined ||
        cohort?.disposition !== "open" ||
        delivery == null ||
        delivery.taskIds.length === 0 ||
        controls.thread.archivedAt !== null ||
        controls.thread.deletedAt !== null
      )
        return;
      const messages = yield* projectionStore.getThreadRecords(threadId, ["messages"], {
        messageIds: [delivery.messageId],
      });
      const message = messages.messages[0];
      if (message !== undefined) {
        if (message.delegatedCompletion === undefined || message.runId === null) return;
        const runs = yield* projectionStore.getThreadRecords(threadId, ["runs"], {
          runIds: [message.runId],
        });
        const run = runs.runs[0];
        const turns = yield* projectionStore.getThreadRecords(threadId, ["providerTurns"], {
          providerTurnAttemptIds: run?.activeAttemptId == null ? [] : [run.activeAttemptId],
        });
        if (!isUndeliveredMailboxSteer({ ...messages, ...runs, ...turns }, delivery.messageId))
          return;
      }
      const projection = yield* projectionStore.getThreadRecords(threadId, ["providerThreads"], {
        providerThreadIds: parentRun.providerThreadId === null ? [] : [parentRun.providerThreadId],
      });
      const providerThread =
        parentRun.providerThreadId === null
          ? undefined
          : projection.providerThreads.find(
              (candidate) => candidate.id === parentRun.providerThreadId,
            );
      if (providerThread === undefined) {
        return;
      }
      yield* continuationRequests.offer({
        threadId,
        providerThreadId: providerThread.id,
        driver: providerThread.driver,
        detail: null,
        delivery: "message_text",
        delegatedCompletion: {
          parentRunId,
          generation: delivery.generation,
          messageId: delivery.messageId,
        },
      });
    });

  const offerDelegatedCompletionDeliveries =
    /* This helper runs for individual orchestration events; the enclosing operation owns the span. */
    Effect.fnUntraced(function* (threadId: ThreadId) {
      const projection = yield* projectionStore.getThreadRecords(threadId, ["runs"]);
      for (const run of projection.runs) {
        if (
          run.delegatedCompletion?.delivery !== undefined &&
          run.delegatedCompletion.delivery !== null
        ) {
          yield* offerDelegatedCompletionDelivery(threadId, run.id);
        }
      }
    });

  const offerChildTaskDeliveries =
    /* This helper runs for individual orchestration events; the enclosing operation owns the span. */
    Effect.fnUntraced(function* (parentThreadId: ThreadId, childThreadId: ThreadId) {
      // A task's wake lives on the run that requested it; the parent's other wakes are not this child's.
      const { subagents } = yield* projectionStore.getThreadRecords(parentThreadId, ["subagents"], {
        subagentChildThreadIds: [childThreadId],
      });
      const parentRunIds = new Set(
        subagents.flatMap((task) =>
          task.childThreadId === childThreadId && task.runId !== null ? [task.runId] : [],
        ),
      );
      for (const parentRunId of parentRunIds) {
        yield* offerDelegatedCompletionDelivery(parentThreadId, parentRunId);
      }
    });

  /** Marks a wake the provider received delivered and reserves the next one for pending siblings. */
  const acceptDelegatedCompletionDelivery = Effect.fn(
    "Orchestrator.acceptDelegatedCompletionDelivery",
  )(function* (input: {
    readonly command: OrchestrationV2ServerCommand;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly projection: Pick<
      OrchestrationV2ThreadProjection,
      "thread" | "runs" | "messages" | "subagents"
    >;
    readonly messageId: OrchestrationV2ConversationMessage["id"];
    readonly now: DateTime.Utc;
  }) {
    return yield* yieldNativeSplit(
      bindAcceptDelegatedCompletionDelivery({
        get emit() {
          return emit;
        },
        get hasLiveRun() {
          return hasLiveRun;
        },
        get idAllocator() {
          return idAllocator;
        },
        get isTerminalDelegatedTaskStatus() {
          return isTerminalDelegatedTaskStatus;
        },
        get mapDelegatedCompletionError() {
          return mapDelegatedCompletionError;
        },
        get projectionStore() {
          return projectionStore;
        },
      })(input),
    );
  });

  const emitQueuedRunCancellation = Effect.fn("Orchestrator.emitQueuedRunCancellation")(
    function* (input: {
      readonly command: OrchestrationV2ServerCommand;
      readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
      readonly projection: Pick<OrchestrationV2ThreadProjection, "nodes" | "attempts">;
      readonly run: OrchestrationV2Run;
      readonly now: DateTime.Utc;
    }) {
      const emitEvent = emit(input.events, input.command);
      for (const event of queuedRunCancellationEvents(input.projection, input.run, input.now)) {
        yield* emitEvent(event);
      }
    },
  );

  const failQueuedRunStart = Effect.fn("Orchestrator.failQueuedRunStart")(function* (
    threadId: ThreadId,
    cause: unknown,
    queuedRunId?: RunId,
  ) {
    return yield* yieldNativeSplit(
      bindFailQueuedRunStart({
        get idAllocator() {
          return idAllocator;
        },
        get nextQueuedRun() {
          return nextQueuedRun;
        },
        get nextTurnItemOrdinal() {
          return nextTurnItemOrdinal;
        },
        get projectionStore() {
          return projectionStore;
        },
        get writeSystemEvents() {
          return writeSystemEvents;
        },
      })(threadId, cause, queuedRunId),
    );
  });

  const isStaleQuestionWake = Effect.fn("Orchestrator.isStaleQuestionWake")(function* (
    projection: Pick<OrchestrationV2ThreadProjection, "thread" | "subagents">,
    messageId: MessageId,
    notification: OrchestrationV2ThreadProjection["messages"][number]["notification"],
  ) {
    if (notification?.source.kind !== "delegated_task" || notification.outcome !== "updated")
      return false;
    const source = notification.source;
    const threadId = projection.thread.id;
    const task =
      projection.subagents.find((candidate) => source.taskIds.includes(candidate.id)) ??
      // Command projections omit settled tasks whose result was already handed over.
      (yield* projectionStore
        .getThreadRecords(threadId, ["subagents"], { subagentIds: source.taskIds })
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause }))))
        .subagents[0];
    // An unknown task gives no evidence the question is obsolete.
    if (task === undefined) return false;
    const childThreadId = task.childThreadId;
    if (
      childThreadId === null ||
      ["completed", "failed", "cancelled", "interrupted"].includes(task.status)
    )
      return true;
    const child = yield* projectionStore
      .getThreadRecords(childThreadId, ["runtimeRequests"])
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: childThreadId, cause }),
        ),
      );
    return !child.runtimeRequests.some(
      (request) =>
        request.kind === "user_input" &&
        request.status === "pending" &&
        messageId === `message:delegated-task-question:${threadId}:${request.id}`,
    );
  });

  const cancelStaleQuestionWakes = Effect.fn("Orchestrator.cancelStaleQuestionWakes")(function* (
    projection: OrchestrationV2ThreadProjection,
  ) {
    const events = yield* Ref.make<Array<OrchestrationV2DomainEvent>>([]);
    for (const run of projection.runs) {
      if (run.status !== "queued") continue;
      const message = projection.messages.find((candidate) => candidate.id === run.userMessageId);
      if (
        message === undefined ||
        !(yield* isStaleQuestionWake(projection, message.id, message.notification).pipe(
          // A child thread read must not fail the parent's unrelated next queued run.
          Effect.catchTags({
            OrchestratorProjectionError: (cause) =>
              Effect.logWarning("Failed to check a queued task question wake", {
                runId: run.id,
                cause,
              }).pipe(Effect.as(false)),
          }),
        ))
      )
        continue;
      yield* emitQueuedRunCancellation({
        command: {
          type: "queued-run.cancel",
          commandId: CommandId.make(`command:system:stale-question:${run.id}`),
          threadId: projection.thread.id,
          runId: run.id,
        },
        events,
        projection,
        run,
        now: yield* DateTime.now,
      });
    }
    const cancellations = yield* Ref.get(events);
    if (cancellations.length === 0) return false;
    yield* writeSystemEvents(cancellations);
    return true;
  });

  const startNextQueuedRunOnce = Effect.fn("Orchestrator.startNextQueuedRun")(
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
      return yield* yieldNativeSplit(
        bindStartNextQueuedRunOnce({
          get FRESH_CONTEXT_DETACH_REASON() {
            return FRESH_CONTEXT_DETACH_REASON;
          },
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get appendContextHandoffId() {
            return appendContextHandoffId;
          },
          get cancelStaleQuestionWakes() {
            return cancelStaleQuestionWakes;
          },
          get checkpointService() {
            return checkpointService;
          },
          get commandPolicy() {
            return commandPolicy;
          },
          get contextHandoffService() {
            return contextHandoffService;
          },
          get contextSourcePointForRun() {
            return contextSourcePointForRun;
          },
          get currentPullRequestWatchWake() {
            return currentPullRequestWatchWake;
          },
          get dispatchProviderThread() {
            return dispatchProviderThread;
          },
          get ensureGoalCommandSupported() {
            return ensureGoalCommandSupported;
          },
          get failQueuedRunStart() {
            return failQueuedRunStart;
          },
          get followsCurrentConversation() {
            return followsCurrentConversation;
          },
          get forkTransferSupersededEvent() {
            return forkTransferSupersededEvent;
          },
          get idAllocator() {
            return idAllocator;
          },
          get isHandoffSourceRun() {
            return isHandoffSourceRun;
          },
          get isStalePullRequestWatchWake() {
            return isStalePullRequestWatchWake;
          },
          get lastDeliveredRunForProviderThread() {
            return lastDeliveredRunForProviderThread;
          },
          get nextQueuedRun() {
            return nextQueuedRun;
          },
          get nextRunOrdinal() {
            return nextRunOrdinal;
          },
          get notificationTasks() {
            return notificationTasks;
          },
          get pendingForkTransferForThread() {
            return pendingForkTransferForThread;
          },
          get projectionStore() {
            return projectionStore;
          },
          get providerAdapters() {
            return providerAdapters;
          },
          get providerSessionIdFor() {
            return providerSessionIdFor;
          },
          get providerSwitchService() {
            return providerSwitchService;
          },
          get providerThreadPredatesBoundary() {
            return providerThreadPredatesBoundary;
          },
          get queuedRunCancellationEvents() {
            return queuedRunCancellationEvents;
          },
          get queuedRunModelSelection() {
            return queuedRunModelSelection;
          },
          get readCommandProjection() {
            return readCommandProjection;
          },
          get readHandoffItems() {
            return readHandoffItems;
          },
          get readInheritedItems() {
            return readInheritedItems;
          },
          get rootProviderThreadsForProvider() {
            return rootProviderThreadsForProvider;
          },
          get runtimeModeCeiling() {
            return runtimeModeCeiling;
          },
          get runtimePolicy() {
            return runtimePolicy;
          },
          get serverSettings() {
            return serverSettings;
          },
          get sessionHasBackgroundWork() {
            return sessionHasBackgroundWork;
          },
          get sessionsReleasedByFreshContext() {
            return sessionsReleasedByFreshContext;
          },
          get uniqueSessions() {
            return uniqueSessions;
          },
          get usageLimitHoldsQueue() {
            return usageLimitHoldsQueue;
          },
          get wakeWorkStartedAt() {
            return wakeWorkStartedAt;
          },
          get writeSystemEvents() {
            return writeSystemEvents;
          },
        })(threadId, options),
      );
    },
    (effect, threadId, options) =>
      effect.pipe(
        Effect.catch((cause) => failQueuedRunStart(threadId, cause, options?.queuedRunId)),
      ),
  );

  // A provider failure hold leaves buffered wakes unheld, so a second pass starts the first one.
  const startNextQueuedRun = (...args: Parameters<typeof startNextQueuedRunOnce>) =>
    startNextQueuedRunOnce(...args).pipe(
      Effect.flatMap((wakeLeftUnheld) =>
        wakeLeftUnheld === true ? startNextQueuedRunOnce(args[0]) : Effect.void,
      ),
    );

  // Under load a resumed provider can time out before taking the prompt; the restart still owes the turn.
  const retryContinuationStart = Effect.fn("Orchestrator.retryContinuationStart")(function* (
    threadId: ThreadId,
    runId: RunId,
  ) {
    const projection = yield* projectionStore.getThreadRecords(
      threadId,
      ["runs", "providerTurns", "turnItems"],
      { turnItemTypes: ["error"], turnItemRunIds: [runId] },
    );
    const run = projection.runs.find((candidate) => candidate.id === runId);
    if (run === undefined) return;
    const delayMs = continuationStartRetryDelayMs(run, projection);
    if (delayMs === undefined) return;
    const commandId = CommandId.make(`command:restart-continuation-retry:${run.id}`);
    // A start retry is not a crash: carry the crash budget forward unchanged.
    const previous =
      run.restartContinuationOfRunId === undefined
        ? undefined
        : Option.getOrUndefined(
            yield* effectOutbox.get(
              `effect:restart-continuation:${run.restartContinuationOfRunId}`,
            ),
          )?.request;
    const processLossCount =
      previous?.type === "provider-runtime.continue" ? previous.processLossCount : undefined;
    yield* writeSystemEvents(
      [],
      [
        {
          id: `effect:restart-continuation:${run.id}`,
          commandId,
          threadId,
          request: {
            type: "provider-runtime.continue",
            sourceRunId: run.id,
            ...(processLossCount === undefined ? {} : { processLossCount }),
          },
          availableAt: DateTime.add(yield* DateTime.now, { milliseconds: delayMs }),
        },
      ],
    );
  });

  // A hold waits for a person to review what they queued. Nobody reviews messages from agents,
  // the server or scheduled tasks, so a later completed run releases those unless it was stopped.
  const releaseUnattendedHolds = Effect.fn("Orchestrator.releaseUnattendedHolds")(function* (
    threadId: ThreadId,
    completedRunId: RunId,
  ) {
    const held = yield* projectionStore.getHeldQueuedRuns(threadId);
    if (held.length === 0) return;
    const projection = yield* projectionStore.getThreadRecords(
      threadId,
      ["runs", "messages", "turnItems"],
      {
        messageIds: held.map((run) => run.userMessageId),
        turnItemTypes: ["run_interrupt_request"],
        turnItemRunIds: [completedRunId],
      },
    );
    // Only the newest run completing shows the thread moved past the hold; a late or
    // bookkeeping update to an older run, overtaken by a failure or Stop, does not.
    if (
      latestExecutedRun(projection.runs)?.id !== completedRunId ||
      projection.turnItems.length > 0 ||
      worktreeSetupPending(projection)
    )
      return;
    const { messages } = projection;
    const unattended = new Set(
      messages
        .filter((message) => message.createdBy !== "user" || message.scheduledTaskId !== undefined)
        .map((message) => message.id),
    );
    const now = yield* DateTime.now;
    const released = held.filter((run) => unattended.has(run.userMessageId));
    if (released.length === 0) return;
    yield* writeSystemEvents(
      released.map((run) => ({
        type: "run.updated" as const,
        threadId,
        runId: run.id,
        providerInstanceId: run.providerInstanceId,
        occurredAt: now,
        payload: { ...run, queueHeld: false },
      })),
    );
  });

  // A steer still pending after its run ended was never read: the provider marks one it read
  // completed, and one Stop dropped cancelled. It runs next, in its place among waiting messages.
  // A run completes before its turn-end checkpoint capture. Steers and queued turns advance when
  // the capture commits and repeats the update, after the deliveries ahead of it on the lane.
  const awaitsCheckpointCapture = (run: OrchestrationV2Run) =>
    run.status !== "completed" || run.checkpointId !== null
      ? Effect.succeed(false)
      : effectOutbox.get(`effect:checkpoint.capture:${run.id}`).pipe(
          Effect.map(
            Option.exists((effect) => effect.status === "pending" || effect.status === "running"),
          ),
          Effect.orElseSucceed(() => false),
        );

  const awaitLatestRunCapture = Effect.fn("Orchestrator.awaitLatestRunCapture")(
    function* (threadId: ThreadId) {
      const { runs } = yield* projectionStore.getThreadRecords(threadId, ["runs"]);
      const latest = latestStartedRun(runs);
      if (latest === undefined || !(yield* awaitsCheckpointCapture(latest))) return;
      yield* effectOutbox.awaitSettled(`effect:checkpoint.capture:${latest.id}`);
    },
    (effect) => Effect.ignore(effect),
  );

  const requeueUnreadSteers = Effect.fn("Orchestrator.requeueUnreadSteers")(function* (
    threadId: ThreadId,
    runIds?: ReadonlyArray<RunId>,
  ) {
    return yield* yieldNativeSplit(
      bindRequeueUnreadSteers({
        get awaitsCheckpointCapture() {
          return awaitsCheckpointCapture;
        },
        get dispatchWithReceiptEffect() {
          return dispatchWithReceiptEffect;
        },
        get effectOutbox() {
          return effectOutbox;
        },
        get idAllocator() {
          return idAllocator;
        },
        get writeSystemEvents() {
          return writeSystemEvents;
        },
        get projectionStore() {
          return projectionStore;
        },
      })(threadId, runIds),
    );
  });

  const resumeQueuedRuns = Effect.gen(function* () {
    const threadIds = yield* projectionStore.getRecoveryThreadIds("queued-runs");
    let resumed = 0;
    for (const threadId of threadIds) {
      const resumedThread = yield* Effect.gen(function* () {
        if (!(yield* projectionStore.canStartQueuedRun(threadId))) return false;
        yield* threadDispatch.withLock(threadId, startNextQueuedRun(threadId));
        return true;
      }).pipe(
        Effect.catch((cause) =>
          Effect.logWarning("Failed to resume queued V2 run after recovery", {
            threadId,
            cause,
          }).pipe(Effect.as(false)),
        ),
      );
      if (resumedThread) {
        resumed += 1;
      }
    }
    return resumed;
  }).pipe(
    Effect.mapError(
      (cause) =>
        new OrchestratorDispatchError({
          commandId: CommandId.make("command:system:resume-queued-runs"),
          commandType: "message.dispatch",
          cause,
        }),
    ),
  );

  const dispatchDelegatedTaskCompletionDeliveryResolution = Effect.fn(
    "Orchestrator.dispatchDelegatedTaskCompletionDeliveryResolution",
  )(function* (
    command: Extract<
      OrchestrationV2Command,
      {
        readonly type:
          | "delegated_task.completion-delivery.acknowledge"
          | "delegated_task.completion-delivery.dispose";
      }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchDelegatedTaskCompletionDeliveryResolution({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get completionDeliveryMessage() {
          return completionDeliveryMessage;
        },
        get completionDeliveryRun() {
          return completionDeliveryRun;
        },
        get delegatedCompletionPlanEvents() {
          return delegatedCompletionPlanEvents;
        },
        get delegatedCompletionWakeDetail() {
          return delegatedCompletionWakeDetail;
        },
        get emit() {
          return emit;
        },
        get emitQueuedRunCancellation() {
          return emitQueuedRunCancellation;
        },
        get isLiveRun() {
          return isLiveRun;
        },
        get isTerminalDelegatedTaskStatus() {
          return isTerminalDelegatedTaskStatus;
        },
        get isUnobservedAcknowledgement() {
          return isUnobservedAcknowledgement;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get planDelegatedCompletionDelivery() {
          return planDelegatedCompletionDelivery;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
      })(command, events),
    );
  });

  const disposeDelegatedCompletionCohort = Effect.fn(
    "Orchestrator.disposeDelegatedCompletionCohort",
  )(function* (input: {
    readonly command: OrchestrationV2ServerCommand;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly projection: Pick<
      OrchestrationV2ThreadProjection,
      "runs" | "subagents" | "messages" | "nodes" | "attempts"
    >;
    readonly parentRunId: RunId;
    readonly disposition: "stopped" | "disposed";
    readonly now: DateTime.Utc;
    readonly cancelQueuedDelivery?: boolean;
    // An interrupted or cancelled wake disposes only the results it carried. The cohort stays
    // open, and its delivery stays the wake's, so the wake's terminal reserves any sibling's result.
    readonly interruptedWakeTaskIds?: ReadonlyArray<NodeId>;
  }) {
    return yield* yieldNativeSplit(
      bindDisposeDelegatedCompletionCohort({
        get completionDeliveryRun() {
          return completionDeliveryRun;
        },
        get emit() {
          return emit;
        },
        get emitQueuedRunCancellation() {
          return emitQueuedRunCancellation;
        },
      })(input),
    );
  });

  const disposeAllDelegatedCompletionCohorts = (input: {
    readonly command: OrchestrationV2Command;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly projection: Pick<
      OrchestrationV2ThreadProjection,
      "runs" | "subagents" | "messages" | "nodes" | "attempts"
    >;
    readonly now: DateTime.Utc;
    readonly cancelQueuedDelivery?: boolean;
  }) =>
    Effect.forEach(
      Array.from(
        new Set([
          ...input.projection.runs
            .filter((run) => run.delegatedCompletion !== undefined)
            .map((run) => run.id),
          ...input.projection.subagents
            .filter((task) => task.origin === "app_owned" && task.runId !== null)
            .map((task) => task.runId!),
        ]),
      ),
      (parentRunId) =>
        disposeDelegatedCompletionCohort({
          ...input,
          parentRunId,
          disposition: "disposed",
        }),
      { concurrency: 1, discard: true },
    );

  const dispatchThreadCreate = Effect.fn("orchestrationV2.dispatch.threadCreate")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "thread.create" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchThreadCreate({
        get OrchestratorThreadAlreadyExistsError() {
          return OrchestratorThreadAlreadyExistsError;
        },
        get emit() {
          return emit;
        },
        get findThread() {
          return findThread;
        },
        get idAllocator() {
          return idAllocator;
        },
      })(command, events),
    );
  });

  const dispatchThreadVisit = Effect.fn("orchestrationV2.dispatch.threadVisit")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "thread.visit" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const thread = yield* projectionStore
      .getThread(command.threadId)
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
        ),
      );
    if (thread.deletedAt !== null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} is deleted.`,
      });
    }
    const visitedAt = Option.getOrUndefined(DateTime.make(command.visitedAt));
    if (visitedAt === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} visit time ${command.visitedAt} is not a valid timestamp.`,
      });
    }
    const movesForward =
      thread.lastVisitedAt === null ||
      DateTime.toEpochMillis(visitedAt) > DateTime.toEpochMillis(thread.lastVisitedAt);
    const occurredAt = yield* DateTime.now;
    // Opens are timed by the server clock so devices with skewed clocks agree.
    const opens = command.opened
      ? recordThreadOpen(
          thread.opens ?? null,
          DateTime.toEpochMillis(occurredAt),
          command.searchQuery,
        )
      : null;
    if (!movesForward && opens === null) return;
    // Viewing a thread changes read state only. Loading its transcript, bumping
    // updatedAt, or copying the thread into the event makes a read receipt scale with it.
    yield* emit(
      events,
      command,
    )({
      type: "thread.visit-recorded",
      threadId: command.threadId,
      providerInstanceId: thread.providerInstanceId,
      occurredAt,
      payload: {
        lastVisitedAt: movesForward ? visitedAt : thread.lastVisitedAt,
        ...(opens ? { opens } : {}),
      },
    });
  });

  // Recheck under the lock after reading the host. Record the watch first so wake events carry it.
  const dispatchPullRequestWatchSync = Effect.fn("orchestrationV2.dispatch.pullRequestWatchSync")(
    function* (
      command: Extract<
        OrchestrationV2ServerCommand,
        { readonly type: "thread.pull-request-watch.sync" }
      >,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchPullRequestWatchSync({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get dispatchMessage() {
            return dispatchMessage;
          },
          get dispatchThreadMutation() {
            return dispatchThreadMutation;
          },
          get projectionStore() {
            return projectionStore;
          },
          get pullRequestSnapshotEndsWatch() {
            return pullRequestSnapshotEndsWatch;
          },
        })(command, events, effects),
      );
    },
  );

  // Deleted after the share change commits: the files of waiting messages it dismissed or dropped.
  const releaseGuestAttachments = (
    command: { readonly commandId: CommandId; readonly threadId: ThreadId },
    before: OrchestrationV2AppThread["guestShare"],
    after: OrchestrationV2AppThread["guestShare"],
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) => {
    const attachmentIds = releasedGuestAttachmentIds(before ?? null, after ?? null);
    return attachmentIds.length === 0
      ? Effect.void
      : Ref.update(effects, (existing) => [
          ...existing,
          {
            id: `effect:${command.commandId}:guest-attachment.cleanup`,
            commandId: command.commandId,
            threadId: command.threadId,
            request: { type: "attachment.cleanup", attachmentIds: [...attachmentIds] },
          } satisfies PendingOrchestrationEffectV2,
        ]);
  };

  const dispatchGuestShare = Effect.fn("orchestrationV2.dispatch.guestShare")(function* (
    command: GuestShareCommand,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    const projection = yield* projectionStore
      .getThreadRecords(command.threadId, [])
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
        ),
      );
    const thread = projection.thread;
    const now = yield* DateTime.now;
    const decided =
      thread.deletedAt !== null
        ? Result.fail(`Thread ${command.threadId} is deleted.`)
        : decideGuestShareCommand({
            thread,
            command,
            now,
          });
    const guestShareUpdate = Result.match(decided, {
      onFailure: (failure) => ({ failure }) as const,
      onSuccess: (success) => ({ success }) as const,
    });
    if ("failure" in guestShareUpdate) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: guestShareUpdate.failure,
      });
    }
    if (guestShareUpdate.success === thread) return;
    yield* emit(
      events,
      command,
    )({
      type: "thread.guest-share-updated",
      threadId: command.threadId,
      providerInstanceId: thread.providerInstanceId,
      occurredAt: now,
      payload: guestShareUpdate.success,
    });
    yield* releaseGuestAttachments(
      command,
      thread.guestShare,
      guestShareUpdate.success.guestShare,
      effects,
    );
  });

  // Emitted before the message so the send and the status change commit together, and so
  // `dispatchMessage`, which reads pending events, keeps the updated share.
  const emitGuestMessageSent = Effect.fn("orchestrationV2.dispatch.guestMessageSent")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }>,
    guestMessageId: GuestMessageId,
    thread: OrchestrationV2AppThread,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const now = yield* DateTime.now;
    const decided = decideGuestMessageSend({ thread, guestMessageId, now });
    const guestMessageDecision = Result.match(decided, {
      onFailure: (failure) => ({ failure }) as const,
      onSuccess: (success) => ({ success }) as const,
    });
    if ("failure" in guestMessageDecision) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: guestMessageDecision.failure,
      });
    }
    yield* emit(
      events,
      command,
    )({
      type: "thread.guest-share-updated",
      threadId: command.threadId,
      providerInstanceId: thread.providerInstanceId,
      occurredAt: now,
      payload: guestMessageDecision.success.thread,
    });
    return guestMessageDecision.success;
  });

  const dispatchThreadMutation = Effect.fn("orchestrationV2.dispatch.threadMutation")(function* (
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
    return yield* yieldNativeSplit(
      bindDispatchThreadMutation({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get OrchestratorProviderAdapterError() {
          return OrchestratorProviderAdapterError;
        },
        get OrchestratorProviderSelectionBusyError() {
          return OrchestratorProviderSelectionBusyError;
        },
        get OrchestratorSubagentThreadReadOnlyError() {
          return OrchestratorSubagentThreadReadOnlyError;
        },
        get WORKSPACE_PREPARATION_INPUT() {
          return WORKSPACE_PREPARATION_INPUT;
        },
        get closePendingLinkRequests() {
          return closePendingLinkRequests;
        },
        get dispatchQueuedRunCancel() {
          return dispatchQueuedRunCancel;
        },
        get dispatchRuntimeRequestRespond() {
          return dispatchRuntimeRequestRespond;
        },
        get disposeAllDelegatedCompletionCohorts() {
          return disposeAllDelegatedCompletionCohorts;
        },
        get emit() {
          return emit;
        },
        get eventSink() {
          return eventSink;
        },
        get getProjectionWithPendingEvents() {
          return getProjectionWithPendingEvents;
        },
        get hasRunningDelegatedTasks() {
          return hasRunningDelegatedTasks;
        },
        get legacyPullRequestLink() {
          return legacyPullRequestLink;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get pendingThreadTitleGenerationEffect() {
          return pendingThreadTitleGenerationEffect;
        },
        get projectionStore() {
          return projectionStore;
        },
        get projects() {
          return projects;
        },
        get providerAdapters() {
          return providerAdapters;
        },
        get providerSessions() {
          return providerSessions;
        },
        get providerSwitchService() {
          return providerSwitchService;
        },
        get releaseGuestAttachments() {
          return releaseGuestAttachments;
        },
        get sessionHasBackgroundWork() {
          return sessionHasBackgroundWork;
        },
        get stopReachedRun() {
          return stopReachedRun;
        },
        get syncedPullRequestWatch() {
          return syncedPullRequestWatch;
        },
        get threadPullRequestLinksEqual() {
          return threadPullRequestLinksEqual;
        },
        get usageLimitHoldsQueue() {
          return usageLimitHoldsQueue;
        },
        get withPullRequestWatch() {
          return withPullRequestWatch;
        },
        get withUntil() {
          return withUntil;
        },
        get withoutChecksAnswer() {
          return withoutChecksAnswer;
        },
      })(command, events, effects),
    );
  });

  const dispatchProviderSessionDetach = Effect.fn("orchestrationV2.dispatch.providerSessionDetach")(
    function* (
      command: Extract<OrchestrationV2Command, { readonly type: "provider-session.detach" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      const projection = yield* projectionStore
        .getThreadRecords(command.threadId, ["providerSessions"])
        .pipe(
          Effect.mapError(
            (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
          ),
        );
      const session = projection.providerSessions.find(
        (candidate) => candidate.id === command.providerSessionId,
      );
      if (session === undefined) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Provider session ${command.providerSessionId} does not belong to thread ${command.threadId}.`,
        });
      }
      const now = yield* DateTime.now;
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
          ...(command.reason === undefined ? {} : { reason: command.reason }),
        },
      });
      const pendingEffect = {
        id: `effect:${command.commandId}:provider-session.detach:${command.providerSessionId}`,
        commandId: command.commandId,
        threadId: command.threadId,
        request: {
          type: "provider-session.detach",
          providerSessionId: command.providerSessionId,
          ...(command.reason === undefined ? {} : { detail: command.reason }),
        },
      } satisfies PendingOrchestrationEffectV2;
      yield* Ref.update(effects, (existing) => [...existing, pendingEffect]);
    },
  );

  const dispatchThreadProjectAdoptFolder = Effect.fn(
    "orchestrationV2.dispatch.threadProjectAdoptFolder",
  )(function* (
    command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "thread.project.adopt-folder" }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const reject = (cause: string) =>
      new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Thread ${command.threadId} ${cause}`,
      });
    const projection = yield* projectionStore
      .getThreadRecords(command.threadId, ["runs", "runtimeRequests"], { turnItemTypes: [] })
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
        ),
      );
    const thread = projection.thread;
    if (thread.deletedAt !== null) return yield* reject("is deleted.");
    if (threadHasUnfinishedWork(projection)) {
      return yield* reject("still has work in progress. Finish or stop it first.");
    }
    const current = yield* projects.get(thread.projectId).pipe(mapDispatchError(command));
    const target = Option.getOrUndefined(
      yield* projects.get(command.projectId).pipe(mapDispatchError(command)),
    );
    if (target === undefined || target.deletedAt !== null) {
      return yield* reject(`cannot move to missing project ${command.projectId}.`);
    }
    // The thread always lands in the project root, so the move must not change its cwd.
    const cwd = thread.worktreePath ?? Option.getOrUndefined(current)?.workspaceRoot;
    if (cwd !== target.workspaceRoot) {
      return yield* reject(`does not work in ${target.workspaceRoot}.`);
    }
    const now = yield* DateTime.now;
    yield* emit(
      events,
      command,
    )({
      type: "thread.metadata-updated",
      threadId: command.threadId,
      providerInstanceId: thread.providerInstanceId,
      occurredAt: now,
      payload: { ...thread, projectId: command.projectId, worktreePath: null, updatedAt: now },
    });
  });

  // A turn keeps the modes it started with, so a thread lowered since can hold a broader one.
  // A turn that recorded none is taken as unrestricted.
  const turnStartedModes = (
    attempts: ReadonlyArray<OrchestrationV2RunAttempt>,
    run: OrchestrationV2Run | undefined,
  ) =>
    attempts.find((attempt) => attempt.id === run?.activeAttemptId)?.startedModes ?? {
      runtimeMode: "full-access" as const,
      interactionMode: "default" as const,
    };

  // A parked steer is delivered later by the server, without the caller's limit, into a turn
  // whose modes are not recorded yet. Only a caller allowed any turn may park or rewrite one.
  const limitForbidsParkedSteer = Effect.gen(function* () {
    const limit = narrowToCeiling(yield* DispatchModeLimit, runtimeModeCeiling);
    return (
      limit !== undefined &&
      exceededDispatchModeLimit(limit, {
        runtimeMode: "full-access",
        interactionMode: "default",
      }) !== undefined
    );
  });

  const refuseAboveDispatchModeLimit = Effect.fn("orchestrationV2.dispatch.refuseAboveModeLimit")(
    function* (
      command: OrchestrationV2ServerCommand,
      threadId: ThreadId,
      modes: {
        readonly runtimeMode: RuntimeMode;
        readonly interactionMode: ProviderInteractionMode;
      },
    ) {
      const limit = narrowToCeiling(yield* DispatchModeLimit, runtimeModeCeiling);
      const exceeded = limit === undefined ? undefined : exceededDispatchModeLimit(limit, modes);
      if (limit === undefined || exceeded === undefined) return;
      const refusal = {
        threadId,
        mode: exceeded,
        runtimeMode: modes.runtimeMode,
        interactionMode: modes.interactionMode,
      };
      if (limit.refused !== undefined) yield* Ref.set(limit.refused, refusal);
      return yield* new OrchestratorThreadAboveModeLimitError({
        commandId: command.commandId,
        ...refusal,
      });
    },
  );

  const refuseAboveRuntimeModeCeiling = Effect.fn(
    "orchestrationV2.dispatch.refuseAboveRuntimeModeCeiling",
  )(function* (
    command: OrchestrationV2ServerCommand,
    events: ReadonlyArray<OrchestrationV2DomainEvent>,
  ) {
    if (runtimeModeCeiling === undefined) return;
    const runtimeModes = new Map<ThreadId, RuntimeMode>();
    for (const threadId of threadsStartingWork(events)) {
      const thread = yield* findThread(threadId);
      if (thread !== null) runtimeModes.set(threadId, thread.runtimeMode);
    }
    const refusal = runtimeModeCeilingRefusal(
      runtimeModeCeiling.maxRuntimeMode,
      events,
      runtimeModes,
    );
    if (refusal === undefined) return;
    return yield* new OrchestratorRuntimeModeAboveCeilingError({
      commandId: command.commandId,
      ...refusal,
      ...runtimeModeCeiling,
    });
  });

  const dispatchThreadFork = Effect.fn("orchestrationV2.dispatch.threadFork")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "thread.fork" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchThreadFork({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get OrchestratorThreadAlreadyExistsError() {
          return OrchestratorThreadAlreadyExistsError;
        },
        get contextSourcePointForRun() {
          return contextSourcePointForRun;
        },
        get emit() {
          return emit;
        },
        get findThread() {
          return findThread;
        },
        get idAllocator() {
          return idAllocator;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get projectionStore() {
          return projectionStore;
        },
        get providerThreadForRun() {
          return providerThreadForRun;
        },
        get providerTurnForRun() {
          return providerTurnForRun;
        },
        get refuseAboveDispatchModeLimit() {
          return refuseAboveDispatchModeLimit;
        },
        get runForSourcePoint() {
          return runForSourcePoint;
        },
        get worktreeSetupTracker() {
          return worktreeSetupTracker;
        },
        get threadForkService() {
          return threadForkService;
        },
      })(command, events),
    );
  });

  const dispatchThreadMergeBack = Effect.fn("orchestrationV2.dispatch.threadMergeBack")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "thread.merge_back" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchThreadMergeBack({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get contextSourcePointForRun() {
          return contextSourcePointForRun;
        },
        get emit() {
          return emit;
        },
        get idAllocator() {
          return idAllocator;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get projectionStore() {
          return projectionStore;
        },
        get providerThreadForRun() {
          return providerThreadForRun;
        },
        get refuseAboveDispatchModeLimit() {
          return refuseAboveDispatchModeLimit;
        },
        get runForSourcePoint() {
          return runForSourcePoint;
        },
      })(command, events),
    );
  });

  const ensureSteeringMessage = Effect.fn("Orchestrator.ensureSteeringMessage")(function* (
    command: Extract<
      OrchestrationV2Command,
      { readonly type: "message.dispatch" | "queued-message.promote-to-steer" }
    >,
    message: Pick<OrchestrationV2ConversationMessage, "text" | "attachments" | "context">,
  ) {
    if (
      expandAssistantCitationsForProvider(message.text).length > PROVIDER_SEND_TURN_MAX_INPUT_CHARS
    ) {
      return yield* new OrchestratorCommandRejectedError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Message exceeds ${PROVIDER_SEND_TURN_MAX_INPUT_CHARS.toLocaleString("en-US")} characters after expanding quotes. Shorten it and try again.`,
      });
    }
    if (isNativeMaintenanceCommand(message)) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause:
          message.text.trim().toLowerCase() === "/compact"
            ? "Context compaction must run as a separate turn. Queue it or wait for the active turn to finish."
            : "Signing out must run as a separate turn. Queue it or wait for the active turn to finish.",
      });
    }
    if (parseGoalCommand(message) !== null) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause:
          "Goal commands must run as a separate turn. Queue it or wait for the active turn to finish.",
      });
    }
  });

  const dispatchSteerIntoRun = Effect.fn("Orchestrator.dispatchSteerIntoRun")(function* (input: {
    readonly command: Extract<
      OrchestrationV2Command,
      { readonly type: "message.dispatch" | "queued-message.promote-to-steer" }
    >;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>;
    readonly projection: Pick<
      OrchestrationV2ThreadProjection,
      | "runs"
      | "messages"
      | "providerSessions"
      | "providerThreads"
      | "providerTurns"
      | "subagents"
      | "attempts"
      | "nodes"
      | "thread"
      | "turnItems"
    >;
    readonly modelSelection: ModelSelection;
    readonly targetRunId: OrchestrationV2Run["id"];
    readonly messageId: OrchestrationV2ConversationMessage["id"];
    readonly text: string;
    readonly attachments: ReadonlyArray<ChatAttachment>;
    readonly context?: import("@t3tools/contracts").OrchestrationMessageContext | undefined;
    readonly createdBy: OrchestrationV2ConversationMessage["createdBy"];
    readonly creationSource: OrchestrationV2ConversationMessage["creationSource"];
    readonly scheduledTaskId?: OrchestrationV2ConversationMessage["scheduledTaskId"];
    readonly senderThreadId?: OrchestrationV2ConversationMessage["senderThreadId"];
    readonly linkedSender?: OrchestrationV2ConversationMessage["linkedSender"];
    readonly idleCompaction?: OrchestrationV2ConversationMessage["idleCompaction"];
    readonly delegatedCompletion?: OrchestrationV2ConversationMessage["delegatedCompletion"];
    readonly notification?: OrchestrationV2ConversationMessage["notification"];
    readonly forceRestart: boolean;
  }) {
    return yield* yieldNativeSplit(
      bindDispatchSteerIntoRun({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProviderAdapterError() {
          return OrchestratorProviderAdapterError;
        },
        get acceptDelegatedCompletionDelivery() {
          return acceptDelegatedCompletionDelivery;
        },
        get checkpointService() {
          return checkpointService;
        },
        get commandPolicy() {
          return commandPolicy;
        },
        get contextHandoffService() {
          return contextHandoffService;
        },
        get contextSourcePointForRun() {
          return contextSourcePointForRun;
        },
        get emit() {
          return emit;
        },
        get ensureSteeringMessage() {
          return ensureSteeringMessage;
        },
        get idAllocator() {
          return idAllocator;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get nextTurnItemOrdinal() {
          return nextTurnItemOrdinal;
        },
        get notificationTasks() {
          return notificationTasks;
        },
        get providerAdapters() {
          return providerAdapters;
        },
        get providerSessionIdFor() {
          return providerSessionIdFor;
        },
        get providerSessions() {
          return providerSessions;
        },
        get providerSwitchService() {
          return providerSwitchService;
        },
        get readHandoffItems() {
          return readHandoffItems;
        },
        get refuseAboveDispatchModeLimit() {
          return refuseAboveDispatchModeLimit;
        },
        get rootProviderThreadsForProvider() {
          return rootProviderThreadsForProvider;
        },
        get runtimePolicy() {
          return runtimePolicy;
        },
        get stopReachedRun() {
          return stopReachedRun;
        },
        get turnStartedModes() {
          return turnStartedModes;
        },
      })(input),
    );
  });

  // Providers own native subagent conversations; messages cannot target them, and adapters ask questions on the parent.
  const refuseNativeSubagentMessage = Effect.fnUntraced(function* (
    command: Pick<OrchestrationV2Command, "commandId"> & { readonly threadId: ThreadId },
  ) {
    const thread = yield* projectionStore
      .getThread(command.threadId)
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
        ),
      );
    if (isProviderNativeSubagentThread(thread)) {
      return yield* new OrchestratorSubagentThreadReadOnlyError({
        commandId: command.commandId,
        threadId: command.threadId,
      });
    }
    return thread;
  });

  const dispatchMessage = Effect.fn("Orchestrator.dispatchMessage")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchMessage({
        get FRESH_CONTEXT_DETACH_REASON() {
          return FRESH_CONTEXT_DETACH_REASON;
        },
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get OrchestratorProviderAdapterError() {
          return OrchestratorProviderAdapterError;
        },
        get WORKSPACE_PREPARATION_INPUT() {
          return WORKSPACE_PREPARATION_INPUT;
        },
        get appendContextHandoffId() {
          return appendContextHandoffId;
        },
        get checkpointService() {
          return checkpointService;
        },
        get commandPolicy() {
          return commandPolicy;
        },
        get contextHandoffService() {
          return contextHandoffService;
        },
        get contextSourcePointForRun() {
          return contextSourcePointForRun;
        },
        get delegatedCompletionWakeDetail() {
          return delegatedCompletionWakeDetail;
        },
        get dispatchProviderThread() {
          return dispatchProviderThread;
        },
        get dispatchSteerIntoRun() {
          return dispatchSteerIntoRun;
        },
        get emit() {
          return emit;
        },
        get ensureGoalCommandSupported() {
          return ensureGoalCommandSupported;
        },
        get ensureSteeringMessage() {
          return ensureSteeringMessage;
        },
        get followsCurrentConversation() {
          return followsCurrentConversation;
        },
        get forkTransferSupersededEvent() {
          return forkTransferSupersededEvent;
        },
        get getProjectionWithPendingEvents() {
          return getProjectionWithPendingEvents;
        },
        get goalDriverFor() {
          return goalDriverFor;
        },
        get hasTitleSetBeforeFirstMessage() {
          return hasTitleSetBeforeFirstMessage;
        },
        get idAllocator() {
          return idAllocator;
        },
        get isHandoffSourceRun() {
          return isHandoffSourceRun;
        },
        get isLiveRun() {
          return isLiveRun;
        },
        get isStaleQuestionWake() {
          return isStaleQuestionWake;
        },
        get lastDeliveredRunForProviderThread() {
          return lastDeliveredRunForProviderThread;
        },
        get latestContextTransfer() {
          return latestContextTransfer;
        },
        get limitForbidsParkedSteer() {
          return limitForbidsParkedSteer;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get nextRunOrdinal() {
          return nextRunOrdinal;
        },
        get nextTurnItemOrdinal() {
          return nextTurnItemOrdinal;
        },
        get notificationTasks() {
          return notificationTasks;
        },
        get pendingForkTransferForThread() {
          return pendingForkTransferForThread;
        },
        get pendingMergeBackTransfersForThread() {
          return pendingMergeBackTransfersForThread;
        },
        get pendingThreadTitleGenerationEffect() {
          return pendingThreadTitleGenerationEffect;
        },
        get projectionStore() {
          return projectionStore;
        },
        get providerAdapters() {
          return providerAdapters;
        },
        get providerSessionIdFor() {
          return providerSessionIdFor;
        },
        get providerSessions() {
          return providerSessions;
        },
        get providerSwitchService() {
          return providerSwitchService;
        },
        get providerThreadForRun() {
          return providerThreadForRun;
        },
        get queueTailModelSelection() {
          return queueTailModelSelection;
        },
        get readHandoffItems() {
          return readHandoffItems;
        },
        get readInheritedItems() {
          return readInheritedItems;
        },
        get rootProviderThreadsForProvider() {
          return rootProviderThreadsForProvider;
        },
        get runtimePolicy() {
          return runtimePolicy;
        },
        get sessionHasBackgroundWork() {
          return sessionHasBackgroundWork;
        },
        get sessionsReleasedByFreshContext() {
          return sessionsReleasedByFreshContext;
        },
        get shouldPrepareLegacyImportHandoff() {
          return shouldPrepareLegacyImportHandoff;
        },
        get stopReachedRun() {
          return stopReachedRun;
        },
        get stopRunForQueuedCommand() {
          return stopRunForQueuedCommand;
        },
        get uniqueSessions() {
          return uniqueSessions;
        },
        get wakeWorkStartedAt() {
          return wakeWorkStartedAt;
        },
        get worktreeSetupPending() {
          return worktreeSetupPending;
        },
      })(command, events, effects),
    );
  });

  // A native background subagent keeps working, and delegating, after the latest run settles.
  const backgroundSubagentOutlivesRun = (run: OrchestrationV2Run) =>
    projectionStore.getThreadShell(run.threadId).pipe(
      Effect.map(
        (shell) =>
          shell !== null &&
          shell.archivedAt === null &&
          shell.activeRunId === null &&
          shell.latestRunId === run.id &&
          hasPendingBackgroundSubagent(shell.pendingBackgroundTasks, run.providerInstanceId),
      ),
      Effect.mapError(
        (cause) => new OrchestratorProjectionError({ threadId: run.threadId, cause }),
      ),
    );

  const dispatchDelegatedTaskRequest = Effect.fn("orchestrationV2.dispatch.delegatedTaskRequest")(
    function* (
      command: Extract<OrchestrationV2Command, { readonly type: "delegated_task.request" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchDelegatedTaskRequest({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get OrchestratorProviderAdapterError() {
            return OrchestratorProviderAdapterError;
          },
          get backgroundSubagentOutlivesRun() {
            return backgroundSubagentOutlivesRun;
          },
          get contextSourcePointForRun() {
            return contextSourcePointForRun;
          },
          get dispatchMessage() {
            return dispatchMessage;
          },
          get emit() {
            return emit;
          },
          get getProjectionWithPendingEvents() {
            return getProjectionWithPendingEvents;
          },
          get idAllocator() {
            return idAllocator;
          },
          get mapDispatchError() {
            return mapDispatchError;
          },
          get nextTurnItemOrdinal() {
            return nextTurnItemOrdinal;
          },
          get projectionStore() {
            return projectionStore;
          },
          get providerAdapters() {
            return providerAdapters;
          },
          get providerTurnForRun() {
            return providerTurnForRun;
          },
          get stopReachedRun() {
            return stopReachedRun;
          },
          get subagentCount() {
            return subagentCount;
          },
        })(command, events, effects),
      );
    },
  );

  const recordSubagentFollowup = Effect.fnUntraced(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "message.dispatch" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindRecordSubagentFollowup({
        get emit() {
          return emit;
        },
        get idAllocator() {
          return idAllocator;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get mayStartSubagentFollowup() {
          return mayStartSubagentFollowup;
        },
        get nextTurnItemOrdinal() {
          return nextTurnItemOrdinal;
        },
        get projectionStore() {
          return projectionStore;
        },
        get providerAdapters() {
          return providerAdapters;
        },
        get providerTurnForRun() {
          return providerTurnForRun;
        },
      })(command, events),
    );
  });

  /**
   * Records a task that runs in a linked environment on its parent: the
   * task, its node and its turn item, as a local delegation does, but no child
   * thread here. The parent's own checks are the local request's.
   */
  const dispatchRemoteDelegatedTaskRequest = Effect.fn(
    "orchestrationV2.dispatch.remoteDelegatedTaskRequest",
  )(function* (
    command: Extract<
      OrchestrationV2InternalCommand,
      { readonly type: "delegated_task.remote.request" }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchRemoteDelegatedTaskRequest({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get emit() {
          return emit;
        },
        get idAllocator() {
          return idAllocator;
        },
        get nextTurnItemOrdinal() {
          return nextTurnItemOrdinal;
        },
        get projectionStore() {
          return projectionStore;
        },
        get providerTurnForRun() {
          return providerTurnForRun;
        },
        get stopReachedRun() {
          return stopReachedRun;
        },
        get subagentCount() {
          return subagentCount;
        },
      })(command, events),
    );
  });

  /**
   * Completes a task that ran in a linked environment: the parent half of
   * `finalizeAppOwnedSubagent`, with the result its thread there ended with.
   * It runs under the parent's lock, so it never interleaves with a wake
   * policy change or a delivery on the same task.
   */
  const dispatchRemoteDelegatedTaskComplete = Effect.fn(
    "orchestrationV2.dispatch.remoteDelegatedTaskComplete",
  )(function* (
    command: Extract<
      OrchestrationV2InternalCommand,
      { readonly type: "delegated_task.remote.complete" }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchRemoteDelegatedTaskComplete({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get delegatedCompletionPlanEvents() {
          return delegatedCompletionPlanEvents;
        },
        get emit() {
          return emit;
        },
        get emitRemoteStopOwed() {
          return emitRemoteStopOwed;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get planDelegatedCompletionDelivery() {
          return planDelegatedCompletionDelivery;
        },
        get projectionStore() {
          return projectionStore;
        },
      })(command, events),
    );
  });

  /**
   * Owes a stop to the thread there of a remote task that already has its
   * result. Only `remoteChild.stoppedThere` changes, so the result and its
   * delivery stand; the follower sends the stop and clears it.
   */
  const dispatchRemoteDelegatedTaskStop = Effect.fn(
    "orchestrationV2.dispatch.remoteDelegatedTaskStop",
  )(function* (
    command: Extract<
      OrchestrationV2InternalCommand,
      { readonly type: "delegated_task.remote.stop" }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const { subagents } = yield* projectionStore
      .getThreadRecords(command.parentThreadId, ["subagents"])
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: command.parentThreadId, cause }),
        ),
      );
    const task = subagents.find(
      (candidate) =>
        candidate.id === command.taskId &&
        candidate.origin === "app_owned" &&
        candidate.remoteChild !== undefined &&
        candidate.result !== null,
    );
    if (task?.remoteChild === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Delegated task ${command.taskId} is not a finished remote task of thread ${command.parentThreadId}.`,
      });
    }
    yield* emitRemoteStopOwed(events, command, task, task.remoteChild);
  });

  const emitRemoteStopOwed = Effect.fn("orchestrationV2.dispatch.remoteStopOwed")(function* (
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    command: Extract<
      OrchestrationV2InternalCommand,
      { readonly type: "delegated_task.remote.complete" | "delegated_task.remote.stop" }
    >,
    task: OrchestrationV2Subagent,
    remoteChild: OrchestrationV2RemoteTaskChild,
  ) {
    const now = yield* DateTime.now;
    yield* emit(
      events,
      command,
    )({
      type: "subagent.updated",
      threadId: command.parentThreadId,
      ...(task.runId === null ? {} : { runId: task.runId }),
      nodeId: task.id,
      driver: task.driver,
      occurredAt: now,
      payload: {
        ...task,
        remoteChild: {
          ...remoteChild,
          stoppedThere: false,
          stopCount: (remoteChild.stopCount ?? 0) + 1,
        },
        updatedAt: now,
      },
    });
  });

  // After blocking waits time out, enable later completions to wake the parent.
  // Hold the parent dispatch lock shared with finalization to serialize full-row writes.
  const dispatchDelegatedTaskWakePolicy = Effect.fn(
    "orchestrationV2.dispatch.delegatedTaskWakePolicy",
  )(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "delegated_task.wake-policy" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchDelegatedTaskWakePolicy({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get emit() {
          return emit;
        },
        get hasLiveRun() {
          return hasLiveRun;
        },
        get isTerminalDelegatedTaskStatus() {
          return isTerminalDelegatedTaskStatus;
        },
        get planDelegatedCompletionDelivery() {
          return planDelegatedCompletionDelivery;
        },
        get projectionStore() {
          return projectionStore;
        },
      })(command, events),
    );
  });

  const dispatchCreatedThreadRecord = Effect.fn("orchestrationV2.dispatch.createdThreadRecord")(
    function* (
      command: Extract<OrchestrationV2Command, { readonly type: "thread.created.record" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchCreatedThreadRecord({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get emit() {
            return emit;
          },
          get idAllocator() {
            return idAllocator;
          },
          get nextTurnItemOrdinal() {
            return nextTurnItemOrdinal;
          },
          get projectionStore() {
            return projectionStore;
          },
          get providerTurnForRun() {
            return providerTurnForRun;
          },
        })(command, events),
      );
    },
  );

  const dispatchSecretRequestRecord = Effect.fn("orchestrationV2.dispatch.secretRequestRecord")(
    function* (
      command: Extract<OrchestrationV2InternalCommand, { readonly type: "secret_request.record" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchSecretRequestRecord({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get emit() {
            return emit;
          },
          get nextTurnItemOrdinal() {
            return nextTurnItemOrdinal;
          },
          get projectionStore() {
            return projectionStore;
          },
          get providerTurnForRun() {
            return providerTurnForRun;
          },
        })(command, events),
      );
    },
  );

  /** Records or updates the card for a feedback report the user asked the agent to send. */
  const dispatchFeedbackRequestRecord = Effect.fn("orchestrationV2.dispatch.feedbackRequestRecord")(
    function* (
      command: Extract<
        OrchestrationV2InternalCommand,
        { readonly type: "feedback_request.record" }
      >,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchFeedbackRequestRecord({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get emit() {
            return emit;
          },
          get nextTurnItemOrdinal() {
            return nextTurnItemOrdinal;
          },
          get projectionStore() {
            return projectionStore;
          },
          get providerTurnForRun() {
            return providerTurnForRun;
          },
        })(command, events),
      );
    },
  );

  /**
   * Records or updates the card for a link an agent asked the user to make.
   * The pairing code goes straight to the link and never through orchestration.
   */
  const dispatchLinkRequestRecord = Effect.fn("orchestrationV2.dispatch.linkRequestRecord")(
    function* (
      command: Extract<OrchestrationV2InternalCommand, { readonly type: "link_request.record" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchLinkRequestRecord({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get askedForLinkedMachine() {
            return askedForLinkedMachine;
          },
          get dispatchMessage() {
            return dispatchMessage;
          },
          get emit() {
            return emit;
          },
          get nextTurnItemOrdinal() {
            return nextTurnItemOrdinal;
          },
          get projectionStore() {
            return projectionStore;
          },
          get providerTurnForRun() {
            return providerTurnForRun;
          },
          get stopReachedRun() {
            return stopReachedRun;
          },
        })(command, events, effects),
      );
    },
  );

  /**
   * Closes the link cards still waiting for the user. Their agent stopped
   * waiting long ago, so nobody is woken: stopping, settling or archiving the
   * thread means the user is done with it.
   */
  const closePendingLinkRequests = Effect.fn("orchestrationV2.closePendingLinkRequests")(
    function* (input: {
      readonly command: OrchestrationV2ServerCommand;
      readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
      readonly threadId: ThreadId;
      readonly now: DateTime.Utc;
    }) {
      const { turnItems } = yield* projectionStore
        .getThreadRecords(input.threadId, ["turnItems"], {
          turnItemTypes: ["link_request"],
          turnItemStatuses: ["waiting"],
          messageRoles: [],
        })
        .pipe(mapDispatchError(input.command));
      for (const item of turnItems) {
        if (item.type !== "link_request" || item.linkStatus !== "pending") continue;
        yield* emit(
          input.events,
          input.command,
        )({
          type: "turn-item.updated",
          threadId: input.threadId,
          ...(item.runId === null ? {} : { runId: item.runId }),
          ...(item.nodeId === null ? {} : { nodeId: item.nodeId }),
          occurredAt: input.now,
          payload: {
            ...item,
            status: "cancelled",
            linkStatus: "cancelled",
            completedAt: input.now,
            updatedAt: input.now,
          },
        });
      }
    },
  );

  const dispatchRuntimeRequestRespond = Effect.fn("Orchestrator.dispatchRuntimeRequestRespond")(
    function* (
      command: Extract<OrchestrationV2Command, { readonly type: "runtime-request.respond" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchRuntimeRequestRespond({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get decodeUserInputAnswers() {
            return decodeUserInputAnswers;
          },
          get dispatchMessage() {
            return dispatchMessage;
          },
          get emit() {
            return emit;
          },
          get idAllocator() {
            return idAllocator;
          },
          get isMessageQuestionAnswer() {
            return isMessageQuestionAnswer;
          },
          get mapDispatchError() {
            return mapDispatchError;
          },
          get projectionStore() {
            return projectionStore;
          },
          get providerSessions() {
            return providerSessions;
          },
          get recordSubagentFollowup() {
            return recordSubagentFollowup;
          },
          get refuseAboveDispatchModeLimit() {
            return refuseAboveDispatchModeLimit;
          },
          get serverSettings() {
            return serverSettings;
          },
          get turnStartedModes() {
            return turnStartedModes;
          },
        })(command, events, effects),
      );
    },
  );

  /**
   * Respond resolves the request before delivery, and a failed delivery cannot
   * tell whether the provider is still waiting, so the answer stays recorded and
   * the timeline shows the failure instead of a run spinning with no question.
   */
  const dispatchRuntimeRequestDeliveryFail = Effect.fn(
    "Orchestrator.dispatchRuntimeRequestDeliveryFail",
  )(function* (
    command: Extract<
      OrchestrationV2InternalCommand,
      { readonly type: "runtime-request.delivery.fail" }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const thread = yield* projectionStore
      .getThread(command.threadId)
      .pipe(mapDispatchError(command));
    if (thread.deletedAt !== null) return;
    const node = (yield* projectionStore
      .getRuntimeResponseContext(command.threadId, command.requestId)
      .pipe(mapDispatchError(command))).node;
    if (node === undefined) return;
    const now = yield* DateTime.now;
    yield* emit(
      events,
      command,
    )({
      type: "turn-item.updated",
      threadId: command.threadId,
      ...(node.runId === null ? {} : { runId: node.runId }),
      nodeId: node.id,
      providerInstanceId: thread.providerInstanceId,
      occurredAt: now,
      payload: {
        id: TurnItemId.make(`turn-item:runtime-request-delivery-failure:${command.requestId}`),
        threadId: command.threadId,
        runId: node.runId,
        nodeId: node.id,
        providerThreadId: node.providerThreadId,
        providerTurnId: node.providerTurnId,
        nativeItemRef: null,
        parentItemId: null,
        ordinal: yield* nextTurnItemOrdinal({ thread }),
        status: "failed",
        title: "Answer delivery not confirmed",
        startedAt: now,
        completedAt: now,
        updatedAt: now,
        type: "error",
        failure: {
          class: "transport_error",
          message: RUNTIME_REQUEST_DELIVERY_FAILED_MESSAGE,
          code: null,
          retryable: null,
        },
      },
    });
  });

  const dispatchThreadUserInputDismiss = Effect.fn("Orchestrator.dispatchThreadUserInputDismiss")(
    function* (
      command: Extract<OrchestrationV2Command, { readonly type: "thread.user-input.dismiss" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      const request = yield* projectionStore
        .getRuntimeRequest(command.threadId, command.requestId)
        .pipe(
          Effect.mapError(
            (cause) => new OrchestratorProjectionError({ threadId: command.threadId, cause }),
          ),
        );
      if (request === undefined || request.status !== "pending") {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "This question has already been answered.",
        });
      }
      if (request.kind !== "user_input" || request.responseCapability.type !== "message") {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: "This question needs an answer. Answer it or stop the turn.",
        });
      }
      yield* dispatchRuntimeRequestRespond(
        {
          type: "runtime-request.respond",
          commandId: command.commandId,
          threadId: command.threadId,
          requestId: command.requestId,
          decision: "cancel",
        },
        events,
        effects,
      );
    },
  );

  const dispatchQueuedMessagePromoteToSteer = Effect.fn(
    "Orchestrator.dispatchQueuedMessagePromoteToSteer",
  )(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "queued-message.promote-to-steer" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchQueuedMessagePromoteToSteer({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get commandPolicy() {
          return commandPolicy;
        },
        get dispatchSteerIntoRun() {
          return dispatchSteerIntoRun;
        },
        get emit() {
          return emit;
        },
        get ensureGoalCommandSupported() {
          return ensureGoalCommandSupported;
        },
        get ensureSteeringMessage() {
          return ensureSteeringMessage;
        },
        get goalDriverFor() {
          return goalDriverFor;
        },
        get isLiveRun() {
          return isLiveRun;
        },
        get limitForbidsParkedSteer() {
          return limitForbidsParkedSteer;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get providerAdapters() {
          return providerAdapters;
        },
        get queuedRunModelSelection() {
          return queuedRunModelSelection;
        },
        get stopReachedRun() {
          return stopReachedRun;
        },
        get stopRunForQueuedCommand() {
          return stopRunForQueuedCommand;
        },
      })(command, events, effects),
    );
  });

  const dispatchQueuedRunReorder = Effect.fn("Orchestrator.dispatchQueuedRunReorder")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "queued-run.reorder" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchQueuedRunReorder({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get emit() {
          return emit;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
      })(command, events),
    );
  });

  const dispatchQueuedRunCancel = Effect.fn("Orchestrator.dispatchQueuedRunCancel")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "queued-run.cancel" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    // Settling disposes a cancelled wake's whole cohort, so a sibling's late result cannot unsettle it.
    disposes: "wake" | "cohort" = "wake",
  ) {
    const projection = yield* loadProjectionForCommand(
      command,
      ["runs", "messages", "nodes", "attempts", "subagents", "turnItems"],
      // Cancelling reads the queued run's own message and root node, never a settled leaf.
      {
        turnItemTypes: [],
        messageRoles: ["user"],
        messageRunIds: [command.runId],
        omitSettledLeafNodes: true,
      },
    );
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
    const now = yield* DateTime.now;
    if (queuedMessage?.delegatedCompletion !== undefined) {
      yield* disposeDelegatedCompletionCohort({
        command,
        events,
        projection,
        parentRunId: queuedMessage.delegatedCompletion.parentRunId,
        disposition: "disposed",
        now,
        cancelQueuedDelivery: false,
        ...(disposes === "wake"
          ? { interruptedWakeTaskIds: queuedMessage.delegatedCompletion.taskIds }
          : {}),
      });
    }
    yield* emitQueuedRunCancellation({ command, events, projection, run: queuedRun, now });
    const emitEvent = emit(events, command);
    const guest = queuedMessage?.context?.guest;
    if (guest !== undefined) {
      const thread = guestShareAfterCancelledSend(projection.thread, guest, now);
      if (thread !== projection.thread) {
        yield* emitEvent({
          type: "thread.guest-share-updated",
          threadId: command.threadId,
          providerInstanceId: thread.providerInstanceId,
          occurredAt: now,
          payload: thread,
        });
      }
    }
  });

  const dispatchRunOutputSubmit = Effect.fn("Orchestrator.dispatchRunOutputSubmit")(function* (
    command: Extract<OrchestrationV2InternalCommand, { readonly type: "run.output.submit" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const projection = yield* projectionStore
      .getThreadRecords(command.threadId, ["runs"])
      .pipe(mapDispatchError(command));
    const run = projection.runs.find((candidate) => candidate.id === command.runId);
    if (run?.outputSchema === undefined) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Run ${command.runId} was not asked for a result.`,
      });
    }
    // The service picks the active run, but the run can end before this command is its turn. A
    // turn that completed without its result still owes it, and a later turn may give it.
    const owes = run.status === "completed" && run.output === undefined;
    if (!isActiveRun(run) && !owes) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Run ${command.runId} is ${run.status} and takes no result.`,
      });
    }
    // A stopped run stays active until its provider settles; what it submits then is not kept.
    if (yield* stopReachedRun(command, command.threadId, run.id)) {
      return yield* new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
        cause: `Run ${command.runId} was stopped and takes no result.`,
      });
    }
    const now = yield* DateTime.now;
    yield* emit(
      events,
      command,
    )({
      type: "run.output-submitted",
      threadId: command.threadId,
      runId: run.id,
      ...(run.rootNodeId === null ? {} : { nodeId: run.rootNodeId }),
      providerInstanceId: run.providerInstanceId,
      occurredAt: now,
      payload: {
        runId: run.id,
        output: { value: command.value, submittedAt: DateTime.formatIso(now) },
      },
    });
  });

  const dispatchQueuedRunEdit = Effect.fn("Orchestrator.dispatchQueuedRunEdit")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "queued-run.edit" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchQueuedRunEdit({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get emit() {
          return emit;
        },
        get ensureGoalCommandSupported() {
          return ensureGoalCommandSupported;
        },
        get limitForbidsParkedSteer() {
          return limitForbidsParkedSteer;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
        get queuedRunModelSelection() {
          return queuedRunModelSelection;
        },
      })(command, events, effects),
    );
  });

  const subagentCount = (threadId: ThreadId) =>
    projectionStore
      .getSubagentCount(threadId)
      .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));

  const loadProjectionForCommand = <K extends ProjectionRecordField>(
    command: OrchestrationV2Command,
    fields: ReadonlyArray<K>,
    filter?: ProjectionRecordFilter,
  ) =>
    projectionStore
      .getThreadRecords(commandThreadId(command), fields, filter)
      .pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: commandThreadId(command), cause }),
        ),
      );

  const preparedRunState = (
    command: Extract<
      OrchestrationV2Command,
      {
        readonly type:
          | "prepared-run.release"
          | "prepared-run.progress"
          | "prepared-run.fail"
          | "prepared-run.retry";
      }
    >,
    projection: Pick<
      OrchestrationV2ThreadProjection,
      "runs" | "attempts" | "nodes" | "providerThreads" | "turnItems"
    >,
  ) => {
    const run = projection.runs.find((candidate) => candidate.id === command.runId);
    const attempt = projection.attempts.find((candidate) => candidate.id === run?.activeAttemptId);
    const rootNode = projection.nodes.find((candidate) => candidate.id === run?.rootNodeId);
    const providerThread = projection.providerThreads.find(
      (candidate) => candidate.id === run?.providerThreadId,
    );
    let preparationItem:
      | Extract<OrchestrationV2TurnItem, { readonly type: "command_execution" }>
      | undefined;
    for (const candidate of projection.turnItems) {
      if (
        candidate.runId === command.runId &&
        candidate.type === "command_execution" &&
        candidate.input === WORKSPACE_PREPARATION_INPUT
      ) {
        preparationItem = candidate;
        break;
      }
    }
    if (
      run?.status !== (command.type === "prepared-run.retry" ? "failed" : "preparing") ||
      attempt === undefined ||
      rootNode === undefined ||
      providerThread === undefined ||
      preparationItem === undefined
    ) {
      return null;
    }
    return { run, attempt, rootNode, providerThread, preparationItem } as const;
  };

  const dispatchPreparedRunProgress = Effect.fn("Orchestrator.dispatchPreparedRunProgress")(
    function* (
      command: Extract<OrchestrationV2Command, { readonly type: "prepared-run.progress" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    ) {
      const projection = yield* loadProjectionForCommand(
        command,
        ["runs", "attempts", "nodes", "providerThreads", "turnItems"],
        { turnItemTypes: ["command_execution"], turnItemRunId: command.runId },
      );
      const state = preparedRunState(command, projection);
      if (state === null) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Run ${command.runId} is not awaiting workspace preparation.`,
        });
      }
      const now = yield* DateTime.now;
      yield* emit(
        events,
        command,
      )({
        type: "turn-item.updated",
        threadId: command.threadId,
        runId: state.run.id,
        nodeId: state.rootNode.id,
        providerInstanceId: state.run.providerInstanceId,
        occurredAt: now,
        payload: {
          ...state.preparationItem,
          title: command.phase === "worktree" ? "Preparing worktree" : "Starting setup script",
          updatedAt: now,
        },
      });
    },
  );

  const dispatchPreparedRunRelease = Effect.fn("Orchestrator.dispatchPreparedRunRelease")(
    function* (
      command: Extract<OrchestrationV2Command, { readonly type: "prepared-run.release" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchPreparedRunRelease({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get checkpointService() {
            return checkpointService;
          },
          get emit() {
            return emit;
          },
          get loadProjectionForCommand() {
            return loadProjectionForCommand;
          },
          get mapDispatchError() {
            return mapDispatchError;
          },
          get preparedRunState() {
            return preparedRunState;
          },
          get runtimePolicy() {
            return runtimePolicy;
          },
        })(command, events, effects),
      );
    },
  );

  const dispatchPreparedRunFail = Effect.fn("Orchestrator.dispatchPreparedRunFail")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "prepared-run.fail" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchPreparedRunFail({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get emit() {
          return emit;
        },
        get idAllocator() {
          return idAllocator;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
        get nextTurnItemOrdinal() {
          return nextTurnItemOrdinal;
        },
        get preparedRunState() {
          return preparedRunState;
        },
      })(command, events),
    );
  });

  const dispatchPreparedRunRetry = Effect.fn("Orchestrator.dispatchPreparedRunRetry")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "prepared-run.retry" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchPreparedRunRetry({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get WORKSPACE_PREPARATION_INPUT() {
          return WORKSPACE_PREPARATION_INPUT;
        },
        get emit() {
          return emit;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
        get preparedRunState() {
          return preparedRunState;
        },
        get withoutPreparationResult() {
          return withoutPreparationResult;
        },
      })(command, events),
    );
  });

  // Ends each native subagent's record, its own thread's runless root turns, and the
  // subagents it started there, which a provider can record on that thread rather than its parent's.
  const endNativeSubagentTrees = Effect.fn("Orchestrator.endNativeSubagentTrees")(
    function* (input: {
      readonly command: Extract<
        OrchestrationV2ServerCommand,
        { readonly type: "run.interrupt" | "thread.background-work.settle" | "thread.stop" }
      >;
      readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
      readonly dying: ReadonlyArray<DyingNativeSubagent>;
      readonly childThreadIds: Set<ThreadId>;
      readonly now: DateTime.Utc;
    }) {
      return yield* yieldNativeSplit(
        bindEndNativeSubagentTrees({
          get idAllocator() {
            return idAllocator;
          },
          get mapDispatchError() {
            return mapDispatchError;
          },
          get nativeSubagentRef() {
            return nativeSubagentRef;
          },
          get projectionStore() {
            return projectionStore;
          },
        })(input),
      );
    },
  );

  const settleBackgroundWork = Effect.fn("Orchestrator.settleBackgroundWork")(function* (input: {
    readonly command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "run.interrupt" | "thread.background-work.settle" }
    >;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly projection: Pick<
      OrchestrationV2ThreadProjection,
      "runs" | "nodes" | "subagents" | "turnItems" | "providerThreads"
    >;
    readonly stoppedProviderThreadId: OrchestrationV2ProviderThread["id"] | null;
    readonly throughRunOrdinal: number;
    readonly now: DateTime.Utc;
  }) {
    return yield* yieldNativeSplit(
      bindSettleBackgroundWork({
        get emit() {
          return emit;
        },
        get endNativeSubagentTrees() {
          return endNativeSubagentTrees;
        },
        get providerSessions() {
          return providerSessions;
        },
      })(input),
    );
  });

  const runInterruptReason = Effect.fnUntraced(function* (
    command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "run.interrupt" | "thread.background-work.settle" }
    >,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    runId: RunId,
  ) {
    const requestMessage = (items: ReadonlyArray<OrchestrationV2TurnItem>) => {
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (item !== undefined && item.runId === runId && item.type === "run_interrupt_request") {
          return item.message;
        }
      }
      return undefined;
    };
    const pending = requestMessage(
      (yield* Ref.get(events)).flatMap((event) =>
        event.type === "turn-item.updated" ? [event.payload] : [],
      ),
    );
    if (pending !== undefined) return pending;
    const { turnItems } = yield* projectionStore
      .getThreadRecords(command.threadId, ["turnItems"], {
        turnItemTypes: ["run_interrupt_request"],
        turnItemRunIds: [runId],
      })
      .pipe(mapDispatchError(command));
    return requestMessage(turnItems);
  });

  // A successful Stop may have no terminal event to ingest: the session or
  // native turn already died, or its final write failed when storage filled.
  const settleInterruptedRun = Effect.fn("Orchestrator.settleInterruptedRun")(function* (input: {
    readonly command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "run.interrupt" | "thread.background-work.settle" }
    >;
    readonly projection: Pick<
      OrchestrationV2ThreadProjection,
      | "runs"
      | "attempts"
      | "nodes"
      | "subagents"
      | "runtimeRequests"
      | "messages"
      | "turnItems"
      | "providerThreads"
    >;
    readonly providerTurn: OrchestrationV2ProviderTurn;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>;
    readonly now: DateTime.Utc;
  }) {
    return yield* yieldNativeSplit(
      bindSettleInterruptedRun({
        get emit() {
          return emit;
        },
        get idAllocator() {
          return idAllocator;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get projectionStore() {
          return projectionStore;
        },
        get runInterruptReason() {
          return runInterruptReason;
        },
      })(input),
    );
  });

  /** Late tool calls and restart continuations must not outlive Stop. */
  const stopReachedRun = (
    command: OrchestrationV2ServerCommand,
    threadId: ThreadId,
    runId: RunId,
  ) => projectionStore.hasRunInterruptRequest(threadId, runId).pipe(mapDispatchError(command));

  const markStoppedRun = Effect.fnUntraced(function* (input: {
    readonly command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "run.interrupt" | "thread.stop" }
    >;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly thread: OrchestrationV2AppThread;
    readonly run: OrchestrationV2Run;
    readonly now: DateTime.Utc;
  }) {
    const { command, events, thread, run, now } = input;
    if (run.rootNodeId === null || run.providerThreadId === null) return;
    const pendingItems = (yield* Ref.get(events)).flatMap((event) =>
      event.type === "turn-item.updated" ? [event.payload] : [],
    );
    if (
      pendingItems.some((item) => item.runId === run.id && item.type === "run_interrupt_request") ||
      (yield* stopReachedRun(command, thread.id, run.id))
    ) {
      return;
    }
    yield* emit(
      events,
      command,
    )({
      type: "turn-item.updated",
      threadId: thread.id,
      runId: run.id,
      nodeId: run.rootNodeId,
      providerInstanceId: run.providerInstanceId,
      occurredAt: now,
      payload: {
        id: idAllocator.derive.runSignalTurnItem({ runId: run.id, signal: "interrupt-request" }),
        threadId: thread.id,
        runId: run.id,
        nodeId: run.rootNodeId,
        providerThreadId: run.providerThreadId,
        providerTurnId: null,
        nativeItemRef: null,
        parentItemId: null,
        ordinal: yield* nextTurnItemOrdinal({ thread, turnItems: pendingItems }),
        status: "completed",
        title: "Interrupt requested",
        startedAt: now,
        completedAt: now,
        updatedAt: now,
        type: "run_interrupt_request",
        message: command.reason ?? RunExecutionService.USER_STOP_REASON,
      },
    });
  });

  const holdStoppedThread = Effect.fn("Orchestrator.holdStoppedThread")(function* (input: {
    readonly command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "run.interrupt" | "thread.stop" }
    >;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly projection: Pick<OrchestrationV2ThreadProjection, "thread" | "runs" | "subagents">;
    readonly cohortRunIds: ReadonlyArray<RunId>;
    readonly now: DateTime.Utc;
  }) {
    return yield* yieldNativeSplit(
      bindHoldStoppedThread({
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get awaitsRestartContinuation() {
          return awaitsRestartContinuation;
        },
        get closePendingLinkRequests() {
          return closePendingLinkRequests;
        },
        get dispatchQueuedRunCancel() {
          return dispatchQueuedRunCancel;
        },
        get disposeDelegatedCompletionCohort() {
          return disposeDelegatedCompletionCohort;
        },
        get emit() {
          return emit;
        },
        get getProjectionWithPendingEvents() {
          return getProjectionWithPendingEvents;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get markStoppedRun() {
          return markStoppedRun;
        },
        get projectionStore() {
          return projectionStore;
        },
        get withPullRequestWatch() {
          return withPullRequestWatch;
        },
      })(input),
    );
  });

  const dispatchInterruptUnresponsive = Effect.fn("Orchestrator.dispatchInterruptUnresponsive")(
    function* (
      command: Extract<
        OrchestrationV2InternalCommand,
        { readonly type: "thread.interrupt.unresponsive" }
      >,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    ) {
      const { providerTurn } = yield* projectionStore
        .getProviderControlContext(command.threadId, {
          providerThreadId: command.providerThreadId,
          providerTurnId: command.providerTurnId,
        })
        .pipe(mapDispatchError(command));
      const { runs } = yield* projectionStore
        .getThreadRecords(command.threadId, ["runs"])
        .pipe(mapDispatchError(command));
      const run = runs.find(
        (candidate) =>
          providerTurn !== undefined && candidate.activeAttemptId === providerTurn.runAttemptId,
      );
      // A settled run still counts: Stop may have targeted its background work.
      if (run === undefined) return;
      const { turnItems } = yield* projectionStore
        .getThreadRecords(command.threadId, ["turnItems"], {
          turnItemTypes: ["run_interrupt_request", "run_interrupt_result"],
          turnItemRunIds: [run.id],
        })
        .pipe(mapDispatchError(command));
      // A provider that stopped late already wrote the result; it needs no Force stop.
      if (turnItems.some((item) => item.type === "run_interrupt_result")) return;
      const request = turnItems.find((item) => item.type === "run_interrupt_request");
      if (request?.type !== "run_interrupt_request" || request.unresponsiveAt !== undefined) return;
      const now = yield* DateTime.now;
      yield* emit(
        events,
        command,
      )({
        type: "turn-item.updated",
        threadId: command.threadId,
        runId: run.id,
        ...(request.nodeId === null ? {} : { nodeId: request.nodeId }),
        providerInstanceId: run.providerInstanceId,
        occurredAt: now,
        payload: { ...request, unresponsiveAt: now, updatedAt: now },
      });
    },
  );

  const dispatchBackgroundWorkSettle = Effect.fn("Orchestrator.dispatchBackgroundWorkSettle")(
    function* (
      command: Extract<
        OrchestrationV2InternalCommand,
        { readonly type: "thread.background-work.settle" }
      >,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchBackgroundWorkSettle({
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get idAllocator() {
            return idAllocator;
          },
          get mapDispatchError() {
            return mapDispatchError;
          },
          get projectionStore() {
            return projectionStore;
          },
          get settleBackgroundWork() {
            return settleBackgroundWork;
          },
          get settleInterruptedRun() {
            return settleInterruptedRun;
          },
        })(command, events, effects),
      );
    },
  );

  const dispatchSubagentStop = Effect.fn("Orchestrator.dispatchSubagentStop")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "subagent.stop" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchSubagentStop({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get cancelledAppOwnedTask() {
          return cancelledAppOwnedTask;
        },
        get emit() {
          return emit;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
        get projectionStore() {
          return projectionStore;
        },
        get writeAppOwnedTask() {
          return writeAppOwnedTask;
        },
      })(command, events, effects),
    );
  });

  const dispatchRunInterrupt = Effect.fn("Orchestrator.dispatchRunInterrupt")(function* (
    command: Extract<OrchestrationV2Command, { readonly type: "run.interrupt" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchRunInterrupt({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProviderAdapterError() {
          return OrchestratorProviderAdapterError;
        },
        get WORKSPACE_PREPARATION_INPUT() {
          return WORKSPACE_PREPARATION_INPUT;
        },
        get commandPolicy() {
          return commandPolicy;
        },
        get disposeDelegatedCompletionCohort() {
          return disposeDelegatedCompletionCohort;
        },
        get emit() {
          return emit;
        },
        get getProjectionWithPendingEvents() {
          return getProjectionWithPendingEvents;
        },
        get holdStoppedThread() {
          return holdStoppedThread;
        },
        get idAllocator() {
          return idAllocator;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get nextTurnItemOrdinal() {
          return nextTurnItemOrdinal;
        },
        get providerSessions() {
          return providerSessions;
        },
        get settleBackgroundWork() {
          return settleBackgroundWork;
        },
        get settleInterruptedRun() {
          return settleInterruptedRun;
        },
      })(command, events, effects),
    );
  });

  /** Writes a parent's app-owned task, and sets its node and turn items to the task's status. */
  const writeAppOwnedTask = Effect.fn("Orchestrator.writeAppOwnedTask")(function* (input: {
    readonly command: Extract<
      OrchestrationV2ServerCommand,
      { readonly type: "run.interrupt" | "thread.stop" | "subagent.stop" }
    >;
    readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
    readonly task: OrchestrationV2Subagent;
    readonly nodes: ReadonlyArray<OrchestrationV2ExecutionNode>;
    readonly turnItems: ReadonlyArray<OrchestrationV2TurnItem>;
    readonly now: DateTime.Utc;
  }) {
    const { command, task, now } = input;
    const emitEvent = emit(input.events, command);
    yield* emitEvent({
      type: "subagent.updated",
      threadId: command.threadId,
      nodeId: task.id,
      occurredAt: now,
      payload: task,
    });
    const node = input.nodes.find((candidate) => candidate.id === task.id);
    if (node !== undefined)
      yield* emitEvent({
        type: "node.updated",
        threadId: command.threadId,
        nodeId: node.id,
        occurredAt: now,
        payload: { ...node, status: task.status, completedAt: task.completedAt },
      });
    for (const item of input.turnItems) {
      if (item.type !== "subagent" || item.subagentId !== task.id) continue;
      yield* emitEvent({
        type: "turn-item.updated",
        threadId: command.threadId,
        nodeId: task.id,
        occurredAt: now,
        payload: { ...item, status: task.status, completedAt: task.completedAt, updatedAt: now },
      });
    }
  });

  const cancelIdleOrphans = Effect.fn("Orchestrator.cancelIdleOrphans")(
    function* (input: {
      readonly command: Extract<
        OrchestrationV2ServerCommand,
        { readonly type: "run.interrupt" | "thread.stop" }
      >;
      readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
      readonly projection: Pick<OrchestrationV2ThreadProjection, "subagents" | "turnItems">;
    }) {
      return yield* yieldNativeSplit(
        bindCancelIdleOrphans({
          get OrchestratorProjectionError() {
            return OrchestratorProjectionError;
          },
          get awaitsRestartContinuation() {
            return awaitsRestartContinuation;
          },
          get cancelledAppOwnedTask() {
            return cancelledAppOwnedTask;
          },
          get isOrchestratorProjectionError() {
            return isOrchestratorProjectionError;
          },
          get projectionStore() {
            return projectionStore;
          },
          get writeAppOwnedTask() {
            return writeAppOwnedTask;
          },
        })(input),
      );
    },
    (effect, input) =>
      effect.pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: input.command.threadId, cause }),
        ),
      ),
  );

  /** Puts a queued command first and, given a target, stops the run in its way. */
  const stopRunForQueuedCommand = Effect.fn("Orchestrator.stopRunForQueuedCommand")(
    function* (input: {
      readonly command: Extract<
        OrchestrationV2Command,
        { readonly type: "message.dispatch" | "queued-message.promote-to-steer" }
      >;
      readonly events: Ref.Ref<Array<OrchestrationV2DomainEvent>>;
      readonly effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>;
      readonly projection: Pick<OrchestrationV2ThreadProjection, "runs" | "messages">;
      readonly queuedRunId: RunId;
      readonly targetRunId: RunId | undefined;
      readonly reason: string;
      readonly now: DateTime.Utc;
    }) {
      return yield* yieldNativeSplit(
        bindStopRunForQueuedCommand({
          get dispatchRunInterrupt() {
            return dispatchRunInterrupt;
          },
          get emit() {
            return emit;
          },
        })(input),
      );
    },
  );

  const dispatchThreadStop = Effect.fn("Orchestrator.dispatchThreadStop")(function* (
    command: Extract<OrchestrationV2ServerCommand, { readonly type: "thread.stop" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
  ) {
    return yield* yieldNativeSplit(
      bindDispatchThreadStop({
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get cancelIdleOrphans() {
          return cancelIdleOrphans;
        },
        get delegatedTasksStopEffect() {
          return delegatedTasksStopEffect;
        },
        get dispatchRunInterrupt() {
          return dispatchRunInterrupt;
        },
        get endNativeSubagentTrees() {
          return endNativeSubagentTrees;
        },
        get hasLiveRun() {
          return hasLiveRun;
        },
        get holdStoppedThread() {
          return holdStoppedThread;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get markStoppedRun() {
          return markStoppedRun;
        },
        get nativeSubagentRef() {
          return nativeSubagentRef;
        },
        get projectionStore() {
          return projectionStore;
        },
      })(command, events, effects),
    );
  });

  const dispatchCheckpointRollback = Effect.fn("Orchestrator.dispatchCheckpointRollback")(
    function* (
      command: Extract<OrchestrationV2Command, { readonly type: "checkpoint.rollback" }>,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
      effects: Ref.Ref<Array<PendingOrchestrationEffectV2>>,
    ) {
      return yield* yieldNativeSplit(
        bindDispatchCheckpointRollback({
          get OrchestratorDispatchError() {
            return OrchestratorDispatchError;
          },
          get OrchestratorProviderAdapterError() {
            return OrchestratorProviderAdapterError;
          },
          get commandPolicy() {
            return commandPolicy;
          },
          get emit() {
            return emit;
          },
          get fileSystem() {
            return fileSystem;
          },
          get loadProjectionForCommand() {
            return loadProjectionForCommand;
          },
          get mapDispatchError() {
            return mapDispatchError;
          },
          get path() {
            return path;
          },
          get projectionStore() {
            return projectionStore;
          },
          get projects() {
            return projects;
          },
          get providerAdapters() {
            return providerAdapters;
          },
          get providerTurnForRun() {
            return providerTurnForRun;
          },
          get taskFolderStore() {
            return taskFolderStore;
          },
        })(command, events, effects),
      );
    },
  );

  const dispatchCheckpointRollbackFail = Effect.fn("Orchestrator.dispatchCheckpointRollbackFail")(
    function* (
      command: Extract<
        OrchestrationV2InternalCommand,
        { readonly type: "checkpoint.rollback.fail" }
      >,
      events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
    ) {
      const thread = yield* projectionStore
        .getThread(command.threadId)
        .pipe(mapDispatchError(command));
      if (thread.deletedAt !== null) return;
      if (thread.rollbackRequestId !== command.requestId) {
        return yield* new OrchestratorDispatchError({
          commandId: command.commandId,
          commandType: command.type,
          cause: `Rollback ${command.requestId} is no longer the thread's current rollback.`,
        });
      }
      const now = yield* DateTime.now;
      yield* emit(
        events,
        command,
      )({
        type: "thread.metadata-updated",
        threadId: command.threadId,
        providerInstanceId: thread.providerInstanceId,
        occurredAt: now,
        payload: {
          ...thread,
          rollbackFailure: { requestId: command.requestId, message: command.message },
          updatedAt: now,
        },
      });
    },
  );

  /**
   * Thread lineage and fork origin are immutable, so this
   * is safe to read without holding either thread's dispatch lock.
   */
  const appOwnedSubagentParentThreadId = Effect.fn("Orchestrator.appOwnedSubagentParentThreadId")(
    function* (childThreadId: ThreadId) {
      const childThread = yield* projectionStore.getThread(childThreadId);
      const lineage = childThread.lineage;
      return lineage.relationshipToParent === "subagent" &&
        lineage.parentThreadId !== null &&
        childThread.forkedFrom?.type === "node"
        ? lineage.parentThreadId
        : undefined;
    },
  );

  const awaitsRestartContinuation = (run: OrchestrationV2Run) =>
    effectOutbox
      .get(`effect:restart-continuation:${run.id}`)
      .pipe(
        Effect.map(
          Option.exists((effect) => effect.status === "pending" || effect.status === "running"),
        ),
      );

  const childAwaitsRestartContinuation = (
    runs: ReadonlyArray<OrchestrationV2Run>,
    resultRun: OrchestrationV2Run,
    settledContinuationOf?: RunId,
  ) =>
    Effect.forEach(
      runs.filter(
        (run) =>
          run.id !== settledContinuationOf &&
          (run.id === resultRun.id || runRanAfter(run, resultRun)),
      ),
      awaitsRestartContinuation,
    ).pipe(Effect.map((pending) => pending.includes(true)));

  const planDelegatedCompletionDelivery = Effect.fn(
    "orchestrationV2.planDelegatedCompletionDelivery",
  )(function* (input: {
    readonly parentProjection: Pick<
      OrchestrationV2ThreadProjection,
      "thread" | "messages" | "runs" | "subagents"
    >;
    readonly parentRun: OrchestrationV2Run | undefined;
    readonly task: OrchestrationV2Subagent;
    readonly updatedTask: OrchestrationV2Subagent;
    readonly now: DateTime.Utc;
  }) {
    return yield* yieldNativeSplit(
      bindPlanDelegatedCompletionDelivery({
        get completionDeliveryMessage() {
          return completionDeliveryMessage;
        },
        get completionDeliveryRun() {
          return completionDeliveryRun;
        },
        get delegatedCompletionWakeDetail() {
          return delegatedCompletionWakeDetail;
        },
        get hasLiveRun() {
          return hasLiveRun;
        },
        get idAllocator() {
          return idAllocator;
        },
        get mapDelegatedCompletionError() {
          return mapDelegatedCompletionError;
        },
        get projectionStore() {
          return projectionStore;
        },
      })(input),
    );
  });

  // A finished delegate otherwise keeps its provider process until the idle timeout. Callers hold
  // the parent lock; the child lock orders this after any follow-up that started a run meanwhile.
  const releaseFinishedDelegateSessions = Effect.fn("Orchestrator.releaseFinishedDelegateSessions")(
    function* (childThreadId: ThreadId, resultRunId: RunId, taskId: NodeId) {
      yield* threadDispatch.withLock(
        childThreadId,
        Effect.gen(function* () {
          const { controls: child, progress } = yield* readDelegatedChildControls(childThreadId, [
            taskId,
          ]);
          // Unawaited background tasks still allow a result but die with the process; the idle
          // timer keeps their process pinned.
          if (
            progress.state !== "result_available" ||
            child.providerThreads.some((thread) => (thread.pendingBackgroundTasks ?? []).length > 0)
          )
            return;
          const { providerSessions } = yield* projectionStore.getThreadRecords(childThreadId, [
            "providerSessions",
          ]);
          for (const session of providerSessions) {
            // Shared processes unload their threads themselves; only a per-thread process lingers.
            if (
              session.status === "stopped" ||
              session.status === "error" ||
              session.capabilities.sessions.supportsMultipleProviderThreadsPerSession
            )
              continue;
            yield* dispatchWithReceiptEffect({
              type: "provider-session.detach",
              commandId: CommandId.make(
                `command:system:delegated-task-release:${resultRunId}:${session.id}`,
              ),
              threadId: childThreadId,
              providerSessionId: session.id,
              reason: "Delegated task finished.",
            });
          }
        }),
      );
    },
    Effect.catchCause((cause) =>
      Effect.logWarning("Failed to release a finished delegate's provider session", { cause }),
    ),
  );

  const readAllDelegatedChildControls = (childThreadId: ThreadId) =>
    projectionStore.getThreadRecords(
      childThreadId,
      ["runs", "messages", "subagents", "providerThreads"],
      { messageRoles: ["user"], delegatedTaskMessagesOnly: true },
    );

  const readDelegatedChildControls = Effect.fn("Orchestrator.readDelegatedChildControls")(
    function* (childThreadId: ThreadId, taskIds: ReadonlyArray<NodeId>) {
      // Progress tells a held wake from a held message the user wrote by the run's message.
      const withHeldMessages = Effect.fn("Orchestrator.readHeldRunMessages")(function* <
        A extends Omit<DelegatedChildControls, "runsFloor">,
      >(read: A) {
        const heldRunIds = read.runs.flatMap((run) =>
          run.status === "queued" && run.queueHeld === true ? [run.id] : [],
        );
        if (heldRunIds.length === 0) return read;
        const { messages } = yield* projectionStore.getThreadRecords(childThreadId, ["messages"], {
          messageRoles: ["user"],
          messageRunIds: heldRunIds,
        });
        return { ...read, messages: [...read.messages, ...messages] };
      });
      const controls: DelegatedChildControls = yield* withHeldMessages(
        yield* projectionStore.getDelegatedChildControls(childThreadId, {
          taskIds,
          windowSize: DELEGATED_CHILD_RUN_WINDOW,
        }),
      );
      const progress = delegatedTaskProgress(controls);
      // The latest result may have ended before the runs read above; then read them all.
      if (
        controls.runsFloor !== undefined &&
        (progress.resultRun === undefined || !ranSince(progress.resultRun, controls.runsFloor))
      ) {
        const all = yield* withHeldMessages(yield* readAllDelegatedChildControls(childThreadId));
        return { controls: all, progress: delegatedTaskProgress(all) };
      }
      return { controls, progress };
    },
  );

  /**
   * Callers must hold the parent thread's dispatch lock: wake-policy updates the same
   * subagent row with full-row payloads, so unserialized writers clobber policy or terminal status.
   */
  const finalizeAppOwnedSubagentTask = Effect.fn("Orchestrator.finalizeAppOwnedSubagentTask")(
    function* (
      childControls: DelegatedChildControls,
      options: {
        readonly settledContinuationOf?: RunId;
        readonly syncRunId?: RunId;
        readonly task: OrchestrationV2Subagent;
        readonly resultRun?: OrchestrationV2Run;
      },
    ) {
      return yield* yieldNativeSplit(
        bindFinalizeAppOwnedSubagentTask({
          get childAwaitsRestartContinuation() {
            return childAwaitsRestartContinuation;
          },
          get contextSourcePointForRun() {
            return contextSourcePointForRun;
          },
          get delegatedCompletionPlanEvents() {
            return delegatedCompletionPlanEvents;
          },
          get delegatedTaskTerminalStatus() {
            return delegatedTaskTerminalStatus;
          },
          get idAllocator() {
            return idAllocator;
          },
          get offerDelegatedCompletionDelivery() {
            return offerDelegatedCompletionDelivery;
          },
          get planDelegatedCompletionDelivery() {
            return planDelegatedCompletionDelivery;
          },
          get projectionStore() {
            return projectionStore;
          },
          get readAllDelegatedChildControls() {
            return readAllDelegatedChildControls;
          },
          get readDelegatedCompletionPlanRecords() {
            return readDelegatedCompletionPlanRecords;
          },
          get releaseFinishedDelegateSessions() {
            return releaseFinishedDelegateSessions;
          },
          get reportRunsRead() {
            return reportRunsRead;
          },
          get writeSystemEvents() {
            return writeSystemEvents;
          },
        })(childControls, options),
      );
    },
  );

  // A waiting run has ended its turn, so its task waits only on the work it left.
  const progressAfterTurn = (child: Parameters<typeof delegatedTaskProgress>[0]) =>
    delegatedTaskProgress({
      ...child,
      runs: child.runs.map((run) =>
        run.status === "waiting" ? { ...run, status: "completed" as const } : run,
      ),
    });

  const finalizeAppOwnedSubagent = Effect.fn("Orchestrator.finalizeAppOwnedSubagent")(function* (
    childThreadId: ThreadId,
    options?: { readonly settledContinuationOf?: RunId; readonly syncRunId?: RunId },
  ) {
    return yield* yieldNativeSplit(
      bindFinalizeAppOwnedSubagent({
        get childAwaitsRestartContinuation() {
          return childAwaitsRestartContinuation;
        },
        get delegatedTaskTerminalStatus() {
          return delegatedTaskTerminalStatus;
        },
        get dispatchWithReceipt() {
          return dispatchWithReceipt;
        },
        get finalizeAppOwnedSubagentTask() {
          return finalizeAppOwnedSubagentTask;
        },
        get projectionStore() {
          return projectionStore;
        },
        get readDelegatedChildControls() {
          return readDelegatedChildControls;
        },
      })(childThreadId, options),
    );
  });

  const finalizeDelegatedCompletionDelivery = Effect.fn(
    "Orchestrator.finalizeDelegatedCompletionDelivery",
  )(function* (threadId: ThreadId, runId: RunId) {
    return yield* yieldNativeSplit(
      bindFinalizeDelegatedCompletionDelivery({
        get idAllocator() {
          return idAllocator;
        },
        get isTerminalDelegatedTaskStatus() {
          return isTerminalDelegatedTaskStatus;
        },
        get mapDelegatedCompletionError() {
          return mapDelegatedCompletionError;
        },
        get offerDelegatedCompletionDelivery() {
          return offerDelegatedCompletionDelivery;
        },
        get projectionStore() {
          return projectionStore;
        },
        get writeSystemEvents() {
          return writeSystemEvents;
        },
      })(threadId, runId),
    );
  });

  const dispatchNotificationAccepted = Effect.fn("orchestrationV2.notificationAccepted")(function* (
    command: Extract<OrchestrationV2Command, { type: "notification.delivery.accept" }>,
    events: Ref.Ref<Array<OrchestrationV2DomainEvent>>,
  ) {
    const projection = yield* getProjectionWithPendingEvents(command.threadId, events);
    const now = yield* DateTime.now;
    const parentRunId = yield* acceptDelegatedCompletionDelivery({
      command,
      events,
      projection,
      messageId: command.messageId,
      now,
    });
    if (parentRunId === undefined) {
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
    return parentRunId;
  });

  const dispatchUnsupported = (command: OrchestrationV2ServerCommand) =>
    Effect.fail(
      new OrchestratorDispatchError({
        commandId: command.commandId,
        commandType: command.type,
      }),
    );

  const dispatchOnce = Effect.fn("orchestrationV2.dispatch.once")(function* (
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
    return yield* yieldNativeSplit(
      bindDispatchOnce({
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get OrchestratorV2Error() {
          return OrchestratorV2Error;
        },
        get QUEUED_TURN_START_GRACE_MS() {
          return QUEUED_TURN_START_GRACE_MS;
        },
        get cancelIdleOrphans() {
          return cancelIdleOrphans;
        },
        get commandThreadId() {
          return commandThreadId;
        },
        get delegatedTasksStopEffect() {
          return delegatedTasksStopEffect;
        },
        get dispatchBackgroundWorkSettle() {
          return dispatchBackgroundWorkSettle;
        },
        get dispatchCheckpointRollback() {
          return dispatchCheckpointRollback;
        },
        get dispatchCheckpointRollbackFail() {
          return dispatchCheckpointRollbackFail;
        },
        get dispatchCreatedThreadRecord() {
          return dispatchCreatedThreadRecord;
        },
        get dispatchDelegatedTaskCompletionDeliveryResolution() {
          return dispatchDelegatedTaskCompletionDeliveryResolution;
        },
        get dispatchDelegatedTaskRequest() {
          return dispatchDelegatedTaskRequest;
        },
        get dispatchDelegatedTaskWakePolicy() {
          return dispatchDelegatedTaskWakePolicy;
        },
        get dispatchFeedbackRequestRecord() {
          return dispatchFeedbackRequestRecord;
        },
        get dispatchGuestShare() {
          return dispatchGuestShare;
        },
        get dispatchInterruptUnresponsive() {
          return dispatchInterruptUnresponsive;
        },
        get dispatchLinkRequestRecord() {
          return dispatchLinkRequestRecord;
        },
        get dispatchMessage() {
          return dispatchMessage;
        },
        get dispatchNotificationAccepted() {
          return dispatchNotificationAccepted;
        },
        get dispatchPreparedRunFail() {
          return dispatchPreparedRunFail;
        },
        get dispatchPreparedRunProgress() {
          return dispatchPreparedRunProgress;
        },
        get dispatchPreparedRunRelease() {
          return dispatchPreparedRunRelease;
        },
        get dispatchPreparedRunRetry() {
          return dispatchPreparedRunRetry;
        },
        get dispatchProviderSessionDetach() {
          return dispatchProviderSessionDetach;
        },
        get dispatchPullRequestWatchSync() {
          return dispatchPullRequestWatchSync;
        },
        get dispatchQueuedMessagePromoteToSteer() {
          return dispatchQueuedMessagePromoteToSteer;
        },
        get dispatchQueuedRunCancel() {
          return dispatchQueuedRunCancel;
        },
        get dispatchQueuedRunEdit() {
          return dispatchQueuedRunEdit;
        },
        get dispatchQueuedRunReorder() {
          return dispatchQueuedRunReorder;
        },
        get dispatchRemoteDelegatedTaskComplete() {
          return dispatchRemoteDelegatedTaskComplete;
        },
        get dispatchRemoteDelegatedTaskRequest() {
          return dispatchRemoteDelegatedTaskRequest;
        },
        get dispatchRemoteDelegatedTaskStop() {
          return dispatchRemoteDelegatedTaskStop;
        },
        get dispatchRunInterrupt() {
          return dispatchRunInterrupt;
        },
        get dispatchRunOutputSubmit() {
          return dispatchRunOutputSubmit;
        },
        get dispatchRuntimeRequestDeliveryFail() {
          return dispatchRuntimeRequestDeliveryFail;
        },
        get dispatchRuntimeRequestRespond() {
          return dispatchRuntimeRequestRespond;
        },
        get dispatchSecretRequestRecord() {
          return dispatchSecretRequestRecord;
        },
        get dispatchSubagentStop() {
          return dispatchSubagentStop;
        },
        get dispatchThreadCreate() {
          return dispatchThreadCreate;
        },
        get dispatchThreadFork() {
          return dispatchThreadFork;
        },
        get dispatchThreadMergeBack() {
          return dispatchThreadMergeBack;
        },
        get dispatchThreadMutation() {
          return dispatchThreadMutation;
        },
        get dispatchThreadProjectAdoptFolder() {
          return dispatchThreadProjectAdoptFolder;
        },
        get dispatchThreadStop() {
          return dispatchThreadStop;
        },
        get dispatchThreadUserInputDismiss() {
          return dispatchThreadUserInputDismiss;
        },
        get dispatchThreadVisit() {
          return dispatchThreadVisit;
        },
        get dispatchUnsupported() {
          return dispatchUnsupported;
        },
        get emit() {
          return emit;
        },
        get emitGuestMessageSent() {
          return emitGuestMessageSent;
        },
        get findThread() {
          return findThread;
        },
        get hasRunningDelegatedTasks() {
          return hasRunningDelegatedTasks;
        },
        get idAllocator() {
          return idAllocator;
        },
        get loadProjectionForCommand() {
          return loadProjectionForCommand;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get metadataUpdateContinuation() {
          return metadataUpdateContinuation;
        },
        get projectionStore() {
          return projectionStore;
        },
        get queuedRunModelSelection() {
          return queuedRunModelSelection;
        },
        get recordSubagentFollowup() {
          return recordSubagentFollowup;
        },
        get refuseNativeSubagentMessage() {
          return refuseNativeSubagentMessage;
        },
        get threadCreateInitialMessage() {
          return threadCreateInitialMessage;
        },
        get usageLimitHoldsQueue() {
          return usageLimitHoldsQueue;
        },
        get worktreeSetupPending() {
          return worktreeSetupPending;
        },
      })(command, sideChatIds),
    );
  });

  const replayCommandReceipt = Effect.fn("orchestrationV2.dispatch.replayReceipt")(function* (
    command: OrchestrationV2ServerCommand,
    receipt: CommandReceiptV2,
  ) {
    if (receipt.status === "rejected") {
      return yield* new OrchestratorCommandPreviouslyRejectedError({
        commandId: command.commandId,
        commandType: command.type,
        detail: receipt.error ?? "Previously rejected.",
      });
    }
    const dispatchThreadId = commandThreadId(command);
    // Receipts only prove execution for the thread they were recorded against.
    if (receipt.threadId !== dispatchThreadId) {
      return yield* new OrchestratorCommandIdConflictError({
        commandId: command.commandId,
        commandType: command.type,
        receiptThreadId: receipt.threadId,
        commandThreadId: dispatchThreadId,
      });
    }
    const storedEvents = yield* eventSink.readByCommandId({ commandId: command.commandId }).pipe(
      Stream.runCollect,
      Effect.map((events): ReadonlyArray<OrchestrationV2StoredEvent> => Array.from(events)),
      Effect.mapError(
        (cause) =>
          new OrchestratorDispatchError({
            commandId: command.commandId,
            commandType: command.type,
            cause,
          }),
      ),
    );
    if (command.type === "queue.resume" || command.type === "queued-run.start") {
      yield* mapDispatchError(command)(
        startNextQueuedRun(command.threadId, {
          userStarted: true,
          ...(command.type === "queued-run.start" ? { queuedRunId: command.runId } : {}),
        }),
      );
    }
    return {
      sequence: receipt.resultSequence,
      storedEvents,
      replayed: true,
    } satisfies OrchestratorV2DispatchResult;
  });

  /** `sideChatIds` are the live side chats a delete, archive, or unarchive cascades to, read under their locks. */
  const dispatchWithReceiptEffect = Effect.fn("orchestrationV2.dispatch.withReceipt")(function* (
    command: OrchestrationV2ServerCommand,
    sideChatIds: ReadonlyArray<ThreadId> = [],
    cancelledTask?: OrchestrationV2Subagent,
  ): Effect.fn.Return<OrchestratorV2DispatchResult, OrchestratorV2Error> {
    return yield* yieldNativeSplit(
      bindDispatchWithReceiptEffect({
        get OrchestratorCommandIdConflictError() {
          return OrchestratorCommandIdConflictError;
        },
        get OrchestratorCommandPreviouslyRejectedError() {
          return OrchestratorCommandPreviouslyRejectedError;
        },
        get OrchestratorCommandRejectedError() {
          return OrchestratorCommandRejectedError;
        },
        get OrchestratorDispatchError() {
          return OrchestratorDispatchError;
        },
        get OrchestratorProjectionError() {
          return OrchestratorProjectionError;
        },
        get OrchestratorRuntimeModeAboveCeilingError() {
          return OrchestratorRuntimeModeAboveCeilingError;
        },
        get OrchestratorV2Error() {
          return OrchestratorV2Error;
        },
        get commandReceipts() {
          return commandReceipts;
        },
        get commandThreadId() {
          return commandThreadId;
        },
        get dispatchOnce() {
          return dispatchOnce;
        },
        get eventSink() {
          return eventSink;
        },
        get isUnobservedAcknowledgement() {
          return isUnobservedAcknowledgement;
        },
        get makeSystemEvent() {
          return makeSystemEvent;
        },
        get mapDispatchError() {
          return mapDispatchError;
        },
        get offerDelegatedCompletionDeliveries() {
          return offerDelegatedCompletionDeliveries;
        },
        get projectionStore() {
          return projectionStore;
        },
        get refuseAboveDispatchModeLimit() {
          return refuseAboveDispatchModeLimit;
        },
        get refuseAboveRuntimeModeCeiling() {
          return refuseAboveRuntimeModeCeiling;
        },
        get replayCommandReceipt() {
          return replayCommandReceipt;
        },
        get requeueUnreadSteers() {
          return requeueUnreadSteers;
        },
        get runtimeModeCeiling() {
          return runtimeModeCeiling;
        },
        get runtimePolicyCeilingCause() {
          return runtimePolicyCeilingCause;
        },
        get startNextQueuedRun() {
          return startNextQueuedRun;
        },
      })(command, sideChatIds, cancelledTask),
    );
  }, withCommandMetrics);

  // Follow-up intake and Stop serialize on the parent before taking the child lock.
  const withSubagentParentLock = <A, E, R>(threadId: ThreadId, dispatch: Effect.Effect<A, E, R>) =>
    appOwnedSubagentParentThreadId(threadId).pipe(
      Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })),
      Effect.flatMap((parentThreadId) =>
        parentThreadId === undefined ? dispatch : threadDispatch.withLock(parentThreadId, dispatch),
      ),
    );

  // dispatchWithReceiptEffect owns the dispatch span; this wrapper selects the thread locks.
  const dispatchWithReceipt = Effect.fnUntraced(function* (command: OrchestrationV2ServerCommand) {
    return yield* yieldNativeSplit(
      bindDispatchWithReceipt({
        get awaitLatestRunCapture() {
          return awaitLatestRunCapture;
        },
        get commandThreadId() {
          return commandThreadId;
        },
        get dispatchWithReceiptEffect() {
          return dispatchWithReceiptEffect;
        },
        get findThread() {
          return findThread;
        },
        get liveSideChatIds() {
          return liveSideChatIds;
        },
        get mayStartSubagentFollowup() {
          return mayStartSubagentFollowup;
        },
        get messageIntake() {
          return messageIntake;
        },
        get metadataUpdateContinuation() {
          return metadataUpdateContinuation;
        },
        get threadDispatch() {
          return threadDispatch;
        },
        get withSubagentParentLock() {
          return withSubagentParentLock;
        },
      })(command),
    );
  });

  const parentTaskSyncRetries = yield* FiberSet.make();
  const syncDelegatedParentTask = Effect.fn("Orchestrator.syncDelegatedParentTask")(function* (
    childThreadId: ThreadId,
    options: { readonly syncRunId: RunId | undefined; readonly retry: boolean },
  ) {
    const parentThreadId = yield* appOwnedSubagentParentThreadId(childThreadId);
    if (parentThreadId === undefined) return;
    const finalize = finalizeAppOwnedSubagent(
      childThreadId,
      options.syncRunId === undefined ? undefined : { syncRunId: options.syncRunId },
    );
    yield* threadDispatch.withLock(
      parentThreadId,
      // A failed attempt may have committed the result before offering its wake.
      options.retry
        ? offerChildTaskDeliveries(parentThreadId, childThreadId).pipe(Effect.andThen(finalize))
        : finalize,
    );
  });
  // Only these reactions tell a parent about its child before a restart; a dropped one leaves its task running.
  const updateDelegatedParentTask = Effect.fn("Orchestrator.updateDelegatedParentTask")(function* (
    childThreadId: ThreadId,
    syncRunId?: RunId,
  ) {
    const context = {
      threadId: childThreadId,
      ...(syncRunId === undefined ? {} : { runId: syncRunId }),
    };
    yield* syncDelegatedParentTask(childThreadId, { syncRunId, retry: false }).pipe(
      Effect.catchCause((cause) =>
        Effect.logWarning("Retrying a delegated task update for its parent", {
          ...context,
          cause,
        }).pipe(
          Effect.andThen(
            syncDelegatedParentTask(childThreadId, { syncRunId, retry: true }).pipe(
              Effect.retry({ schedule: parentTaskSyncRetry }),
              Effect.delay("1 second"),
              Effect.catchCause((cause) =>
                Effect.logWarning("Failed to update a delegated task for its parent", {
                  ...context,
                  cause,
                }),
              ),
              FiberSet.run(parentTaskSyncRetries),
            ),
          ),
        ),
      ),
    );
  });
  const handleRunUpdate = Effect.fn("Orchestrator.handleRunUpdate")(
    function* (stored: OrchestrationV2StoredEvent) {
      return yield* yieldNativeSplit(
        bindHandleRunUpdate({
          get awaitsCheckpointCapture() {
            return awaitsCheckpointCapture;
          },
          get delegatedTaskTerminalStatus() {
            return delegatedTaskTerminalStatus;
          },
          get finalizeDelegatedCompletionDelivery() {
            return finalizeDelegatedCompletionDelivery;
          },
          get releaseUnattendedHolds() {
            return releaseUnattendedHolds;
          },
          get requeueUnreadSteers() {
            return requeueUnreadSteers;
          },
          get retryContinuationStart() {
            return retryContinuationStart;
          },
          get startNextQueuedRun() {
            return startNextQueuedRun;
          },
          get threadDispatch() {
            return threadDispatch;
          },
          get updateDelegatedParentTask() {
            return updateDelegatedParentTask;
          },
        })(stored),
      );
    },
    (effect, stored) =>
      effect.pipe(
        Effect.catchCause((cause) =>
          Effect.logWarning("Failed to react to V2 run update", {
            threadId: stored.event.threadId,
            sequence: stored.sequence,
            cause,
          }),
        ),
      ),
  );

  // One thread's reactions run in event order; a reaction waiting on one thread's lock must
  // not hold up another thread's.
  const threadReactions = yield* KeyedLock.makeRunner<ThreadId>();

  // Projections already contain historical terminals; replaying them delays startup queue promotion with database size.
  const terminalEventsAfterSequence = yield* eventSink.latestSequence().pipe(Effect.orDie);
  // Filter run updates before buffering so blocked queue promotion does not retain unrelated tool bodies.
  yield* eventSink
    .stream({ afterSequence: terminalEventsAfterSequence, eventType: "run.updated" })
    .pipe(
      Stream.filter(
        (stored) =>
          stored.event.type === "run.updated" &&
          (!String(stored.commandId).startsWith("command:runtime-reconcile:") ||
            (stored.event.payload.delegatedTaskId !== undefined &&
              stored.event.payload.status === "queued" &&
              stored.event.payload.queueHeld === true)) &&
          ((stored.event.payload.delegatedTaskId !== undefined &&
            (stored.event.payload.status === "queued" ||
              stored.event.payload.status === "starting" ||
              stored.event.payload.status === "waiting")) ||
            stored.event.payload.status === "completed" ||
            stored.event.payload.status === "interrupted" ||
            stored.event.payload.status === "failed" ||
            stored.event.payload.status === "cancelled" ||
            stored.event.payload.status === "rolled_back"),
      ),
      Stream.runForEach((stored) =>
        threadReactions.run(stored.event.threadId, handleRunUpdate(stored)),
      ),
      Effect.forkScoped,
    );

  yield* eventSink
    .stream({ afterSequence: terminalEventsAfterSequence, eventType: "provider-turn.updated" })
    .pipe(
      Stream.filter(
        (stored) =>
          stored.event.type === "provider-turn.updated" &&
          stored.event.payload.status === "running",
      ),
      Stream.runForEach(
        Effect.fn("Orchestrator.deliverDeferredSteers")(
          function* (stored) {
            if (stored.event.type !== "provider-turn.updated") return;
            const threadId = stored.event.threadId;
            const turn = stored.event.payload;
            const projection = yield* projectionStore.getThreadRecords(threadId, ["runs"], {
              runStatuses: ["queued", "running"],
            });
            const run = projection.runs.find(
              (candidate) =>
                candidate.activeAttemptId === turn.runAttemptId && candidate.status === "running",
            );
            if (run === undefined) return;
            const pending = projection.runs
              .filter(
                (queued) => queued.status === "queued" && queued.steerWhenReadyRunId === run.id,
              )
              .toSorted(
                (left, right) =>
                  (left.queuePosition ?? left.ordinal) - (right.queuePosition ?? right.ordinal),
              );
            for (const queued of pending) {
              yield* dispatchWithReceiptEffect({
                type: "queued-message.promote-to-steer",
                commandId: CommandId.make(
                  `command:deferred-steer:${queued.id}:${run.id}:${turn.runAttemptId}`,
                ),
                threadId,
                queuedRunId: queued.id,
                targetRunId: run.id,
              }).pipe(
                Effect.catchCause((cause) =>
                  Effect.logWarning("Failed to deliver a deferred steer", {
                    threadId,
                    runId: queued.id,
                    cause,
                  }),
                ),
              );
            }
          },
          (effect, stored) => threadDispatch.withLock(stored.event.threadId, effect),
          Effect.catchCause((cause) =>
            Effect.logWarning("Failed to deliver deferred steering", { cause }),
          ),
          (effect, stored) => threadReactions.run(stored.event.threadId, effect),
        ),
      ),
      Effect.forkScoped,
    );

  // A child whose run ends while its background tasks or its own subagents still run has no
  // result yet. When that work settles there is no run update to finalize it, so these events
  // do it. A roster counts when a task seen holding leaves it, since that may be one follow-up's.
  const holdingTaskIdsByProviderThread = new Map<string, ReadonlySet<string>>();
  const settlesChildWork = (stored: OrchestrationV2StoredEvent) => {
    const { event } = stored;
    if (event.type === "subagent.updated")
      return !isOrchestrationV2WorkActive(event.payload.status);
    if (event.type !== "provider-thread.updated") return false;
    const holding = new Set(
      (event.payload.pendingBackgroundTasks ?? [])
        .filter((task) => backgroundWorkHoldsCompletion([task]))
        .map((task) => task.taskId),
    );
    const previous = holdingTaskIdsByProviderThread.get(event.payload.id);
    if (holding.size > 0) holdingTaskIdsByProviderThread.set(event.payload.id, holding);
    else holdingTaskIdsByProviderThread.delete(event.payload.id);
    return previous !== undefined && [...previous].some((taskId) => !holding.has(taskId));
  };
  yield* Stream.merge(
    eventSink.stream({
      afterSequence: terminalEventsAfterSequence,
      eventType: "provider-thread.updated",
    }),
    eventSink.stream({ afterSequence: terminalEventsAfterSequence, eventType: "subagent.updated" }),
  ).pipe(
    Stream.filter(settlesChildWork),
    Stream.runForEach((stored) =>
      threadReactions.run(stored.event.threadId, updateDelegatedParentTask(stored.event.threadId)),
    ),
    Effect.forkScoped,
  );

  const recoverDelegatedTasks = Effect.gen(function* () {
    return yield* yieldNativeSplit(
      bindRecoverDelegatedTasks({
        get delegatedTaskTerminalStatus() {
          return delegatedTaskTerminalStatus;
        },
        get finalizeAppOwnedSubagent() {
          return finalizeAppOwnedSubagent;
        },
        get finalizeDelegatedCompletionDelivery() {
          return finalizeDelegatedCompletionDelivery;
        },
        get offerDelegatedCompletionDelivery() {
          return offerDelegatedCompletionDelivery;
        },
        get projectionStore() {
          return projectionStore;
        },
        get requeueUnreadSteers() {
          return requeueUnreadSteers;
        },
        get threadDispatch() {
          return threadDispatch;
        },
      })(),
    );
  });

  const delegatedTaskResultPending = Effect.fn("Orchestrator.delegatedTaskResultPending")(
    function* (childThreadId: ThreadId, taskId?: NodeId) {
      const child = yield* projectionStore.getThreadRecords(
        childThreadId,
        ["runs", "messages", "subagents", "providerThreads", "providerTurns", "attempts"],
        { messageRoles: ["user"] },
      );
      if (taskId !== undefined) {
        const runs = delegatedTaskRuns(child, taskId);
        const run = delegatedTaskResultRun(runs);
        if (
          run === undefined ||
          delegatedTaskTerminalStatus(run.status) === null ||
          delegatedTaskAwaitsWork(runs, child)
        )
          return true;
        return yield* childAwaitsRestartContinuation(runs, run);
      }
      const progress = delegatedTaskProgress(child);
      if (progress.state !== "result_available") return true;
      if (progress.resultRun === undefined) return false;
      return yield* childAwaitsRestartContinuation(child.runs, progress.resultRun);
    },
    (effect, childThreadId, _taskId) =>
      effect.pipe(
        Effect.mapError(
          (cause) => new OrchestratorProjectionError({ threadId: childThreadId, cause }),
        ),
      ),
  );

  const recoverDelegatedTask = Effect.fn("Orchestrator.recoverDelegatedTask")(
    function* (
      threadId: ThreadId,
      options?: { readonly sourceRunId?: RunId; readonly completedRunId?: RunId },
    ) {
      const completedRunId = options?.completedRunId;
      if (completedRunId !== undefined) {
        yield* threadDispatch.withLock(
          threadId,
          Effect.gen(function* () {
            const message = yield* projectionStore.getRunMessage(threadId, completedRunId);
            if (message?.delegatedCompletion === undefined) return;
            // A prior attempt may have committed the next generation before offering its wake.
            yield* offerDelegatedCompletionDelivery(
              threadId,
              message.delegatedCompletion.parentRunId,
            );
            yield* finalizeDelegatedCompletionDelivery(threadId, completedRunId);
          }),
        );
      }
      const sourceRunId = options?.sourceRunId;
      const parentThreadId = yield* appOwnedSubagentParentThreadId(threadId);
      if (parentThreadId === undefined) return;
      if (
        sourceRunId === undefined &&
        !(yield* projectionStore.hasPendingDelegatedCompletion(threadId))
      )
        return;
      yield* threadDispatch.withLock(
        parentThreadId,
        offerChildTaskDeliveries(parentThreadId, threadId).pipe(
          Effect.andThen(
            finalizeAppOwnedSubagent(
              threadId,
              sourceRunId === undefined ? undefined : { settledContinuationOf: sourceRunId },
            ),
          ),
        ),
      );
    },
    (effect, threadId, _options) =>
      effect.pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause }))),
  );

  const cancelDelegatedTask: OrchestratorV2Shape["cancelDelegatedTask"] = Effect.fn(
    "Orchestrator.cancelDelegatedTask",
  )(function* (input) {
    const { command } = input;
    return yield* threadDispatch.withLock(
      input.parentThreadId,
      Effect.gen(function* () {
        const { subagents } = yield* projectionStore
          .getThreadRecords(input.parentThreadId, ["subagents"], { subagentIds: [input.taskId] })
          .pipe(mapDispatchError(command));
        const task = subagents.find(
          (candidate) =>
            candidate.id === input.taskId &&
            candidate.origin === "app_owned" &&
            candidate.childThreadId === command.threadId &&
            isOrchestrationV2WorkActive(candidate.status),
        );
        const child = yield* projectionStore
          .getThreadRecords(
            command.threadId,
            ["runs", "messages", "subagents", "providerThreads"],
            { messageRoles: ["user"] },
          )
          .pipe(mapDispatchError(command));
        const followUpRun = child.runs
          .filter((run) => run.delegatedTaskId === input.taskId)
          .toSorted((a, b) => b.ordinal - a.ordinal)[0];
        const unsettled =
          followUpRun === undefined
            ? child.thread.forkedFrom?.type === "node" &&
              child.thread.forkedFrom.nodeId === input.taskId &&
              progressAfterTurn(child).state !== "result_available"
            : delegatedTaskTerminalStatus(runOutcome(followUpRun)) === null ||
              delegatedTaskAwaitsWork(delegatedTaskRuns(child, input.taskId), child);
        yield* threadDispatch.withLock(
          command.threadId,
          Effect.gen(function* () {
            // Hold intake closed until descendants stop and this thread's Stop commits.
            yield* input.stopDescendants((command) =>
              commandThreadId(command) === input.command.threadId
                ? dispatchWithReceiptEffect(command)
                : dispatchWithReceipt(command),
            );
            const child = yield* projectionStore
              .getThreadRecords(
                command.threadId,
                ["runs", "messages", "subagents", "providerThreads"],
                { messageRoles: ["user"] },
              )
              .pipe(mapDispatchError(command));
            const followUpRun = child.runs
              .filter((run) => run.delegatedTaskId === input.taskId)
              .toSorted((a, b) => b.ordinal - a.ordinal)[0];
            const monitorRunIds = new Set(
              child.messages
                .filter((message) => message.notification?.source.kind === "monitor")
                .map((message) => message.runId),
            );
            const activeRun = child.runs
              .filter((run) => isLiveRun(run) && !monitorRunIds.has(run.id))
              .toSorted((a, b) => b.ordinal - a.ordinal)[0];
            const cancelledRun = followUpRun ?? activeRun ?? progressAfterTurn(child).resultRun;
            const now = yield* DateTime.now;
            const cancelledTask =
              task !== undefined && unsettled && cancelledRun !== undefined
                ? { ...task, cancelledRunId: cancelledRun.id, updatedAt: now }
                : undefined;
            // The marker, Stop receipt and interrupt outbox commit together under both locks.
            yield* dispatchWithReceiptEffect(command, [], cancelledTask);
          }),
        );
        yield* finalizeAppOwnedSubagent(command.threadId).pipe(mapDispatchError(command));
      }),
    );
  });

  const shellProjectionError = (cause: unknown) =>
    new OrchestratorProjectionError({ threadId: ThreadId.make("thread:shell"), cause });

  return OrchestratorV2.of({
    resumeQueuedRuns,
    recoverDelegatedTasks,
    recoverDelegatedTask,
    cancelDelegatedTask,
    delegatedTaskResultPending,
    restartContinuationPending: Effect.fn("OrchestratorV2.restartContinuationPending")(
      function (run) {
        return awaitsRestartContinuation(run).pipe(Effect.orElseSucceed(() => false));
      },
    ),
    awaitRestartContinuation: Effect.fn("OrchestratorV2.awaitRestartContinuation")(function (run) {
      return effectOutbox.awaitSettled(`effect:restart-continuation:${run.id}`).pipe(Effect.ignore);
    }),
    dispatch: dispatchWithReceipt,
    autoArmLimitRecovery: Effect.fn("OrchestratorV2.autoArmLimitRecovery")(function (input) {
      return threadDispatch.withLock(
        input.threadId,
        Effect.gen(function* () {
          const thread = yield* projectionStore
            .getThread(input.threadId)
            .pipe(
              Effect.mapError(
                (cause) => new OrchestratorProjectionError({ threadId: input.threadId, cause }),
              ),
            );
          // Stop or an explicit recovery choice can commit after the sweep reads its candidate.
          if (
            thread.limitRecovery?.runId === input.limitRecovery.runId &&
            thread.limitRecovery.resetAt === input.limitRecovery.resetAt
          )
            return;
          const command = { type: "thread.metadata.update", ...input } as const;
          // A Stop that reached the run before its limit failure landed had nothing to disarm.
          const stopped = yield* stopReachedRun(command, input.threadId, input.limitRecovery.runId);
          yield* dispatchWithReceiptEffect(
            stopped
              ? {
                  ...command,
                  limitRecovery: { ...input.limitRecovery, autoResume: false, snooze: false },
                }
              : command,
          );
        }),
      );
    }),
    searchThreadStream: (input) =>
      projectionStore
        .searchThreadStream(input)
        .pipe(
          Stream.mapError(
            (cause) => new OrchestratorProjectionError({ threadId: input.threadId, cause }),
          ),
        ),
    searchThread: Effect.fn("OrchestratorV2.searchThread")(function (input) {
      return projectionStore
        .searchThread(input)
        .pipe(
          Effect.mapError(
            (cause) => new OrchestratorProjectionError({ threadId: input.threadId, cause }),
          ),
        );
    }),
    getThreadHistoryPage: Effect.fn("OrchestratorV2.getThreadHistoryPage")(
      function (threadId, cursor, throughEntryId, conversationOnly, workMode) {
        return projectionStore
          .getThreadHistoryPage(threadId, cursor, throughEntryId, conversationOnly, workMode)
          .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
      },
    ),
    getTimelinePage: Effect.fn("OrchestratorV2.getTimelinePage")(function (threadId, options) {
      return projectionStore
        .getTimelinePage(threadId, options)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    getMessageCount: Effect.fn("OrchestratorV2.getMessageCount")(function (threadId) {
      return projectionStore
        .getMessageCount(threadId)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    getRunCount: Effect.fn("OrchestratorV2.getRunCount")(function (threadId) {
      return projectionStore
        .getRunCount(threadId)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    getMessagesById: Effect.fn("OrchestratorV2.getMessagesById")(function (threadId, messageIds) {
      return projectionStore
        .getMessagesById(threadId, messageIds)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    getTranscriptByteFloor: Effect.fn("OrchestratorV2.getTranscriptByteFloor")(
      function (threadId, limit) {
        return projectionStore
          .getTranscriptByteFloor(threadId, limit)
          .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
      },
    ),
    getTurnItem: Effect.fn("OrchestratorV2.getTurnItem")(function (input) {
      return projectionStore
        .getTurnItem(input)
        .pipe(
          Effect.mapError(
            (cause) => new OrchestratorProjectionError({ threadId: input.threadId, cause }),
          ),
        );
    }),
    getThreadRecords: Effect.fn("OrchestratorV2.getThreadRecords")(
      function (threadId, fields, filter) {
        return projectionStore
          .getThreadRecords(threadId, fields, filter)
          .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
      },
    ),
    listAppOwnedChildThreadIds: Effect.fn("OrchestratorV2.listAppOwnedChildThreadIds")(
      function (threadId) {
        return projectionStore
          .listAppOwnedChildThreadIds(threadId)
          .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
      },
    ),
    getThreadProjection: Effect.fn("OrchestratorV2.getThreadProjection")(function (threadId) {
      return projectionStore
        .getThreadProjection(threadId)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    getCheckpointContext: Effect.fn("OrchestratorV2.getCheckpointContext")(function (threadId) {
      return projectionStore
        .getCheckpointContext(threadId)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    getThreadSnapshot: Effect.fn("OrchestratorV2.getThreadSnapshot")(function (threadId) {
      return projectionStore
        .getThreadSnapshot(threadId)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    getThreadSnapshotWindow: Effect.fn("OrchestratorV2.getThreadSnapshotWindow")(
      function (threadId, options) {
        return projectionStore
          .getThreadSnapshotWindow(threadId, options)
          .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
      },
    ),
    getPullRequestSnapshot: Effect.fn("OrchestratorV2.getPullRequestSnapshot")(function (options) {
      return projectionStore
        .getPullRequestSnapshot(options)
        .pipe(Effect.mapError(shellProjectionError));
    }),
    getAgentAwarenessSnapshot: Effect.fn("OrchestratorV2.getAgentAwarenessSnapshot")(
      function (threadId) {
        return projectionStore
          .getAgentAwarenessSnapshot(threadId)
          .pipe(Effect.mapError(shellProjectionError));
      },
    ),
    getShellSnapshot: Effect.fn("OrchestratorV2.getShellSnapshot")(function (options) {
      return projectionStore.getShellSnapshot(options).pipe(Effect.mapError(shellProjectionError));
    }),
    listActiveSubagentThreadIds: Effect.fn("OrchestratorV2.listActiveSubagentThreadIds")(
      function () {
        return projectionStore
          .listActiveSubagentThreadIds()
          .pipe(Effect.mapError(shellProjectionError));
      },
    ),
    countThreads: Effect.fn("OrchestratorV2.countThreads")(function () {
      return projectionStore.countThreads().pipe(Effect.mapError(shellProjectionError));
    }),
    listActiveShellIndex: Effect.fn("OrchestratorV2.listActiveShellIndex")(function () {
      return projectionStore.listActiveShellIndex().pipe(Effect.mapError(shellProjectionError));
    }),
    listActiveThreads: Effect.fn("OrchestratorV2.listActiveThreads")(function (projectId) {
      return projectionStore
        .listActiveThreads(projectId)
        .pipe(Effect.mapError(shellProjectionError));
    }),
    listOlderSettledThreads: Effect.fn("OrchestratorV2.listOlderSettledThreads")(function (query) {
      return projectionStore
        .listOlderSettledThreads(query)
        .pipe(Effect.mapError(shellProjectionError));
    }),
    readShellSnapshot: Effect.fn("OrchestratorV2.readShellSnapshot")(function (options) {
      return projectionStore
        .readShellSnapshot(options)
        .pipe(
          Effect.mapError(shellProjectionError),
          Effect.map(Effect.mapError(shellProjectionError)),
        );
    }),
    getThreadShell: Effect.fn("OrchestratorV2.getThreadShell")(function (threadId) {
      return projectionStore
        .getThreadShell(threadId)
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    findGuestShareThreadId: Effect.fn("OrchestratorV2.findGuestShareThreadId")(function (shareId) {
      return projectionStore
        .findGuestShareThreadId(shareId)
        .pipe(Effect.mapError(shellProjectionError));
    }),
    getThreadLinkMetadata: Effect.fn("OrchestratorV2.getThreadLinkMetadata")(function (threadIds) {
      return projectionStore
        .getThreadLinkMetadata(threadIds)
        .pipe(Effect.mapError(shellProjectionError));
    }),
    getThreadTitles: Effect.fn("OrchestratorV2.getThreadTitles")(function (threadIds) {
      return projectionStore.getThreadTitles(threadIds).pipe(Effect.mapError(shellProjectionError));
    }),
    getThreadEventSequence: Effect.fn("OrchestratorV2.getThreadEventSequence")(function (threadId) {
      return eventSink
        .latestSequence({ threadId })
        .pipe(Effect.mapError((cause) => new OrchestratorProjectionError({ threadId, cause })));
    }),
    streamStoredEvents: eventSink.stream().pipe(
      Stream.mapError(
        (cause) =>
          new OrchestratorDomainEventStreamError({
            cause,
          }),
      ),
    ),
    streamStoredEventsFrom: (input) =>
      eventSink.stream({ ...input, bounded: true }).pipe(
        Stream.mapError(
          (cause) =>
            new OrchestratorDomainEventStreamError({
              cause,
            }),
        ),
      ),
    // Start at the latest sequence; awareness needs no historical replay.
    streamDomainEvents: Stream.unwrap(
      eventSink
        .latestSequence()
        .pipe(Effect.map((latest) => eventSink.stream({ afterSequence: latest }))),
    ).pipe(
      Stream.map((stored) => stored.event),
      Stream.mapError(
        (cause) =>
          new OrchestratorDomainEventStreamError({
            cause,
          }),
      ),
    ),
  });
});

export const layer: Layer.Layer<
  OrchestratorV2,
  never,
  | CheckpointServiceV2
  | FileSystem.FileSystem
  | Path.Path
  | CommandPolicyV2
  | CommandReceiptStoreV2
  | ContextHandoffServiceV2
  | EffectOutbox.EffectOutboxV2
  | EventSinkV2
  | IdAllocator.IdAllocatorV2
  | ProjectStore.ProjectStoreV2
  | ProviderAdapterRegistryV2
  | ProviderSessionManagerV2
  | ProviderSwitchServiceV2
  | ProjectionStoreV2
  | RuntimePolicyV2
  | ServerSettings.ServerSettingsService
  | TaskFolderStore.TaskFolderStore
  | ThreadForkServiceV2
> = Layer.effect(OrchestratorV2, makeOrchestrator()).pipe(
  // Layers memoize by reference, so this is the tracker ThreadLaunchService holds workspaces in.
  Layer.provide(Layer.merge(ThreadCommandExecutor.layer, WorktreeSetupTracker.layer)),
);
