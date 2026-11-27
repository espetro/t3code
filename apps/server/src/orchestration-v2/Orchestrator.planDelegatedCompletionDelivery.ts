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
// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindPlanDelegatedCompletionDelivery = (ctx: any) =>
  Effect.fn("orchestrationV2.planDelegatedCompletionDelivery")(function* (input: {
    readonly parentProjection: Pick<
      OrchestrationV2ThreadProjection,
      "thread" | "messages" | "runs" | "subagents"
    >;
    readonly parentRun: OrchestrationV2Run | undefined;
    readonly task: OrchestrationV2Subagent;
    readonly updatedTask: OrchestrationV2Subagent;
    readonly now: DateTime.Utc;
  }) {
    const {
      completionDeliveryMessage,
      completionDeliveryRun,
      delegatedCompletionWakeDetail,
      hasLiveRun,
      idAllocator,
      mapDelegatedCompletionError,
      projectionStore,
    } = pickScriptcBindCtx(ctx);

    const taskDelivery = input.updatedTask.completionDelivery;
    if (
      taskDelivery?.state === "acknowledged" ||
      taskDelivery?.state === "delivered" ||
      taskDelivery?.state === "disposed"
    ) {
      return {
        task: input.updatedTask,
        parentRun: undefined,
        message: undefined,
        offer: false,
      };
    }
    const cohort = input.parentRun?.delegatedCompletion;
    if (
      input.parentRun === undefined ||
      input.parentProjection.thread.archivedAt !== null ||
      input.parentProjection.thread.deletedAt !== null ||
      (cohort !== undefined && cohort.disposition !== "open")
    ) {
      return {
        task: {
          ...input.updatedTask,
          completionDelivery: {
            state: "disposed" as const,
            observedByRunId: null,
          },
        },
        parentRun: undefined,
        message: undefined,
        offer: false,
      };
    }
    // settled_only relies on a blocking wait that ends with the spawning turn; later results need another delivery path.
    if (
      (input.task.completionWake ?? "settled_only") === "settled_only" &&
      hasLiveRun({ runs: [input.parentRun] })
    ) {
      return {
        task: input.updatedTask,
        parentRun: undefined,
        message: undefined,
        offer: false,
      };
    }

    const delivery = cohort?.delivery ?? null;
    const deliveryRun = completionDeliveryRun(input.parentProjection, delivery);
    if (delivery !== null) {
      if (deliveryRun?.status === "queued" && deliveryRun.userMessageId === delivery.messageId) {
        const taskIds = Array.from(new Set([...delivery.taskIds, input.task.id]));
        const message = completionDeliveryMessage(input.parentProjection, delivery);
        const nextCohort = {
          ...cohort!,
          delivery: {
            ...delivery,
            taskIds,
          },
        };
        return {
          task: {
            ...input.updatedTask,
            completionDelivery: {
              state: "claimed" as const,
              observedByRunId: null,
            },
          },
          parentRun: {
            ...input.parentRun,
            delegatedCompletion: nextCohort,
          },
          message:
            message === undefined
              ? undefined
              : {
                  ...message,
                  text: delegatedCompletionWakeDetail(
                    taskIds,
                    input.parentProjection.subagents.map((task) =>
                      task.id === input.updatedTask.id ? input.updatedTask : task,
                    ),
                  ),
                  delegatedCompletion: {
                    parentRunId: input.parentRun.id,
                    generation: delivery.generation,
                    taskIds,
                  },
                  updatedAt: input.now,
                },
          offer: false,
        };
      }
      if (deliveryRun !== undefined) {
        // The terminal-run listener reserves successor wakes; keep racing siblings pending to avoid competing deliveries.
        return {
          task: {
            ...input.updatedTask,
            completionDelivery: {
              state: "pending" as const,
              observedByRunId: null,
            },
          },
          parentRun: undefined,
          message: undefined,
          offer: false,
        };
      }
      const taskIds = Array.from(new Set([...delivery.taskIds, input.task.id]));
      const nextCohort = {
        ...cohort!,
        delivery: {
          ...delivery,
          taskIds,
        },
      };
      return {
        task: {
          ...input.updatedTask,
          completionDelivery: {
            state: "claimed" as const,
            observedByRunId: null,
          },
        },
        parentRun: {
          ...input.parentRun,
          delegatedCompletion: nextCohort,
        },
        message: undefined,
        offer: true,
      };
    }

    const generation = cohort?.nextGeneration ?? 1;
    const messageId = yield* mapDelegatedCompletionError(
      idAllocator.allocate.message({
        threadId: input.parentRun.threadId,
        ordinal:
          (yield* mapDelegatedCompletionError(
            projectionStore.getMessageCount(input.parentRun.threadId),
          )) + 1,
      }),
    );
    const nextCohort = {
      ...cohort,
      disposition: "open" as const,
      nextGeneration: generation + 1,
      delivery: {
        generation,
        messageId,
        taskIds: [input.task.id],
      },
    };
    return {
      task: {
        ...input.updatedTask,
        completionDelivery: {
          state: "claimed" as const,
          observedByRunId: null,
        },
      },
      parentRun: {
        ...input.parentRun,
        delegatedCompletion: nextCohort,
      },
      message: undefined,
      offer: true,
    };
  });
