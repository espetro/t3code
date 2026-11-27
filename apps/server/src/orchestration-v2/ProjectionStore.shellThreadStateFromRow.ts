// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ProjectionStore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import type { ProjectThreadAwarenessV2Input } from "@t3tools/shared/agentAwareness";
import { applyOrchestrationV2ThreadVisit, pendingGuestMessageCount } from "@t3tools/contracts";
import { applyThreadPullRequestLinkUpdate } from "../sourceControl/threadPullRequests.ts";
import { projectTurnItemForWire } from "./WireProjection.ts";
import * as Stream from "effect/Stream";
import * as NodeSqliteClient from "@t3tools/shared/nodeSqliteClient";
import { makeThreadFind } from "./ThreadFind.ts";
import { unsentManualContinuationSource } from "@t3tools/shared/orchestrationV2ManualContinuation";
import type {
  OrchestrationV2ThreadLinkMetadata,
  OrchestrationV2SearchThreadInput,
  OrchestrationV2SearchThreadResult,
  OrchestrationV2ThreadHistoryPage,
} from "@t3tools/contracts";
import {
  latestRootProviderFailure,
  latestUnheldRun,
  runRanAfter,
  threadErrorSummary,
  usageLimitRunPresentedAsLatest,
} from "@t3tools/shared/orchestrationV2ThreadError";
import { threadPullRequestsOf } from "../sourceControl/threadPullRequests.ts";
import {
  anchorsModelSwitch,
  isModelSwitchCandidate,
  isShownUserMessageItem,
} from "./modelSwitch.ts";
import type {
  OrchestrationV2AppThread,
  OrchestrationV2Checkpoint,
  OrchestrationV2CheckpointScope,
  OrchestrationV2ExecutionNode,
  OrchestrationV2PlanArtifact,
  OrchestrationV2PendingRuntimeRequestSummary,
  PlanId,
  OrchestrationV2ConversationMessage,
  OrchestrationV2ContextTransfer,
  OrchestrationV2DomainEvent,
  OrchestrationV2OlderSettledCount,
  OrchestrationV2OlderSettledCursor,
  OrchestrationV2ProjectedTurnItem,
  OrchestrationV2ProviderThread,
  OrchestrationV2ProviderTurn,
  OrchestrationV2Run,
  OrchestrationV2RuntimeRequest,
  OrchestrationV2Subagent,
  OrchestrationV2ThreadShellSnapshot,
  OrchestrationV2ShellThreadStatus,
  OrchestrationV2ThreadShell,
  OrchestrationV2ThreadProjection,
  OrchestrationV2TurnItem,
  GuestShareId,
  ProviderThreadId,
  ProviderTurnId,
  RunAttemptId,
} from "@t3tools/contracts";
import {
  IDLE_COMPACTION_TEXT,
  idleCompactionOf,
  isQueuedProviderThreadPlaceholder,
  OrchestrationV2AppThreadJson as OrchestrationV2AppThreadJsonSchema,
  OrchestrationV2CheckpointJson as OrchestrationV2CheckpointJsonSchema,
  OrchestrationV2CheckpointScopeJson as OrchestrationV2CheckpointScopeJsonSchema,
  OrchestrationV2ContextHandoffJson as OrchestrationV2ContextHandoffJsonSchema,
  OrchestrationV2ContextTransferJson as OrchestrationV2ContextTransferJsonSchema,
  OrchestrationV2ConversationMessageJson as OrchestrationV2ConversationMessageJsonSchema,
  OrchestrationV2ExecutionNodeJson as OrchestrationV2ExecutionNodeJsonSchema,
  OrchestrationV2PlanArtifact as OrchestrationV2PlanArtifactSchema,
  OrchestrationV2ProviderSessionJson as OrchestrationV2ProviderSessionJsonSchema,
  OrchestrationV2ProviderThreadJson as OrchestrationV2ProviderThreadJsonSchema,
  OrchestrationV2ProviderTurnJson as OrchestrationV2ProviderTurnJsonSchema,
  OrchestrationV2RunAttemptJson as OrchestrationV2RunAttemptJsonSchema,
  OrchestrationV2RunJson as OrchestrationV2RunJsonSchema,
  OrchestrationV2RuntimeRequestJson as OrchestrationV2RuntimeRequestJsonSchema,
  OrchestrationV2SubagentJson as OrchestrationV2SubagentJsonSchema,
  OrchestrationV2TurnItemJson as OrchestrationV2TurnItemJsonSchema,
  orchestrationV2RunWorkStartedAt,
  RunId,
  MessageId,
  RuntimeRequestId,
  CheckpointScopeId,
  CheckpointId,
  EnvironmentId,
  ThreadId,
  TurnItemId,
  NodeId,
  ProjectId,
  ProviderInstanceId,
} from "@t3tools/contracts";
import { createOrchestrationV2TurnItemVisibility } from "@t3tools/shared/orchestrationV2Timeline";
import {
  deriveBlockedOnThreadWait,
  derivePendingBackgroundWork,
} from "@t3tools/shared/orchestrationV2PendingBackgroundWork";
import * as Context from "effect/Context";
import * as DateTime from "effect/DateTime";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as SqlClient from "effect/sql/SqlClient";
import type * as Statement from "effect/sql/Statement";

import { MCP_APP_OUTPUT_KEY } from "@t3tools/shared/mcpApp";
import { normalizeProjectPathForComparison } from "@t3tools/shared/path";
import { threadHtmlRenderAttachmentIds } from "../attachmentStore.ts";
import { DELEGATED_TASK_MESSAGE_CONDITION } from "./delegatedTaskMessage.ts";
import {
  DEFERRED_COMMAND_MESSAGE_CONDITION,
  JAVASCRIPT_TRIM_WHITESPACE,
} from "./deferredCommandMessage.ts";
import { readableSearchText } from "./messageSearchIndex.ts";
import {
  isFoldableWorkItem,
  isThreadHistoryUserTurn,
  isConversationHistoryItem,
  THREAD_HISTORY_MAX_RAW_TURNS,
  missingInterruptRequests,
  DEFERRED_WORK_ITEM_TYPES,
  decodeThreadHistoryCursor,
  deferWorkHistoryRows,
  findCursorEndIndex,
  selectDeferredWorkPage,
  encodeThreadHistoryCursor,
  olderHistoryPagePolicy,
  selectHistoryPageFromCursor,
  selectRecentTimelineWindow,
  THREAD_HISTORY_PAGE_POLICY,
  THREAD_HISTORY_INLINE_WORK_ITEM_LIMIT,
  THREAD_HISTORY_TURN_SNAPSHOT_ROW_LIMIT,
  type SelectTimelinePageResult,
  type ThreadHistoryPrefix,
} from "./threadHistoryPaging.ts";
import { routineSpan } from "@t3tools/shared/observability";

import type { ShellRun, ShellThreadRow, ShellThreadState } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindShellThreadStateFromRow = (ctx: any) =>
  /* Runs once per shell row; the enclosing snapshot or thread read owns the span. */
  Effect.fnUntraced(function* (input: {
    readonly row: ShellThreadRow;
    readonly runsByThreadId: ReadonlyMap<ThreadId, Map<RunId, ShellRun>>;
    readonly itemCountsByThreadId: ReadonlyMap<ThreadId, Map<RunId, number>>;
    readonly shellItemCountsByThreadId: ReadonlyMap<
      ThreadId,
      { readonly itemCount: number; readonly runlessItemCount: number }
    >;
    readonly providerThreadsByThreadId: ReadonlyMap<
      ThreadId,
      ReadonlyArray<OrchestrationV2ThreadProjection["providerThreads"][number]>
    >;
    readonly pendingTurnItemsByThreadId: ReadonlyMap<
      ThreadId,
      ReadonlyArray<OrchestrationV2TurnItem>
    >;
  }) {
    const {
      activeProviderGoalForShell,
      decodeForkRunIds,
      decodeRuntimeRequestPayload,
      decodeThreadPayload,
      decodeTurnItemPayload,
      linkCardStillAsks,
      pendingRuntimeRequestSummary,
      providerInstanceHistoryForShell,
      secretRequestAsPendingInput,
      shellStatusFromStoredRunStatus,
    } = ctx;

    const {
      row,
      runsByThreadId,
      itemCountsByThreadId,
      shellItemCountsByThreadId,
      providerThreadsByThreadId,
      pendingTurnItemsByThreadId,
    } = input;
    const thread = yield* decodeThreadPayload(row.payload_json);
    const latestUserAuthoredMessageAt =
      row.latest_user_authored_message_at === null
        ? null
        : DateTime.makeUnsafe(row.latest_user_authored_message_at);
    const waitingCards = [
      row.pending_secret_request_payload_json === null
        ? null
        : yield* decodeTurnItemPayload(row.pending_secret_request_payload_json),
      row.pending_link_request_payload_json === null
        ? null
        : yield* decodeTurnItemPayload(row.pending_link_request_payload_json),
    ]
      .filter((item) => item !== null)
      .filter(
        (item) =>
          item.type !== "link_request" || linkCardStillAsks(item, latestUserAuthoredMessageAt),
      );
    let pendingRuntimeRequest =
      row.pending_request_payload_json !== null
        ? pendingRuntimeRequestSummary(
            yield* decodeRuntimeRequestPayload(row.pending_request_payload_json),
          )
        : null;
    if (
      (pendingRuntimeRequest === null || pendingRuntimeRequest.kind === "user_input") &&
      waitingCards.length > 0
    ) {
      const waitingCard = secretRequestAsPendingInput(
        waitingCards.toSorted(
          (left, right) =>
            DateTime.toEpochMillis(right.updatedAt) - DateTime.toEpochMillis(left.updatedAt),
        )[0] ?? null,
      );
      if (
        waitingCard !== null &&
        (pendingRuntimeRequest === null ||
          DateTime.toEpochMillis(waitingCard.createdAt) >=
            DateTime.toEpochMillis(pendingRuntimeRequest.createdAt))
      ) {
        pendingRuntimeRequest = waitingCard;
      }
    }
    let terminalFailureItem =
      row.terminal_failure_payload_json === null
        ? null
        : yield* decodeTurnItemPayload(row.terminal_failure_payload_json);
    let latestRunId = row.latest_run_id === null ? null : RunId.make(row.latest_run_id);
    let latestRunStatus = shellStatusFromStoredRunStatus(row.latest_run_status);
    let latestRunRequestedAt =
      row.latest_run_requested_at === null
        ? null
        : DateTime.makeUnsafe(row.latest_run_requested_at);
    let latestRunStartedAt =
      row.latest_run_started_at === null ? null : DateTime.makeUnsafe(row.latest_run_started_at);
    let latestRunCompletedAt =
      row.latest_run_completed_at === null
        ? null
        : DateTime.makeUnsafe(row.latest_run_completed_at);
    let latestRunStopRequested = row.latest_run_stop_requested === 1;
    let latestRunBackgroundWake = row.latest_run_background_wake === 1;
    if (row.blocking_run_id !== null && row.blocking_failure_payload_json !== null) {
      const blockingFailure = yield* decodeTurnItemPayload(row.blocking_failure_payload_json).pipe(
        Effect.orElseSucceed(() => null),
      );
      const blocksQueue =
        threadErrorSummary(
          blockingFailure?.type === "error" ? blockingFailure.failure : null,
          row.last_error,
        ).lastErrorClass === "usage_limit";
      if (blocksQueue && blockingFailure !== null) {
        terminalFailureItem = blockingFailure;
        latestRunId = RunId.make(row.blocking_run_id);
        latestRunStopRequested = row.blocking_run_stop_requested === 1;
        latestRunBackgroundWake = row.blocking_run_background_wake === 1;
        latestRunStatus = "failed";
        latestRunRequestedAt =
          row.blocking_run_requested_at === null
            ? null
            : DateTime.makeUnsafe(row.blocking_run_requested_at);
        latestRunStartedAt =
          row.blocking_run_started_at === null
            ? null
            : DateTime.makeUnsafe(row.blocking_run_started_at);
        latestRunCompletedAt =
          row.blocking_run_completed_at === null
            ? null
            : DateTime.makeUnsafe(row.blocking_run_completed_at);
      }
    }
    const pendingBackgroundTasks = [
      ...derivePendingBackgroundWork({
        latestRun:
          latestRunId === null || latestRunStatus === "idle"
            ? null
            : {
                id: latestRunId,
                ordinal: 0,
                status: latestRunStatus,
              },
        providerThreads: providerThreadsByThreadId.get(thread.id) ?? [],
        turnItems: pendingTurnItemsByThreadId.get(thread.id) ?? [],
        activeProviderThreadId: thread.activeProviderThreadId,
        hasActiveRun: row.active_run_id !== null,
        pullRequests: thread.pullRequests,
      }),
    ];
    return {
      thread,
      latestRunId,
      latestRunStatus,
      latestRunRequestedAt,
      latestRunStartedAt,
      latestRunCompletedAt,
      latestRunStopRequested,
      latestRunBackgroundWake,
      activeRunId: row.active_run_id === null ? null : RunId.make(row.active_run_id),
      blockedOnThreadWait: deriveBlockedOnThreadWait({
        activeRun:
          row.active_run_id === null || row.active_run_status !== "running"
            ? null
            : { id: RunId.make(row.active_run_id), status: "running" },
        turnItems: pendingTurnItemsByThreadId.get(thread.id) ?? [],
      }),
      activityRunStartedAt:
        row.activity_run_started_at === null
          ? null
          : DateTime.makeUnsafe(row.activity_run_started_at),
      activityRunStatus:
        row.activity_run_status === "preparing" ||
        row.activity_run_status === "starting" ||
        row.activity_run_status === "running" ||
        row.activity_run_status === "waiting"
          ? row.activity_run_status
          : null,
      ...threadErrorSummary(
        terminalFailureItem?.type === "error" ? terminalFailureItem.failure : null,
        row.last_error,
      ),
      pendingRuntimeRequest,
      latestUserMessageAt:
        row.latest_user_message_at === null
          ? null
          : DateTime.makeUnsafe(row.latest_user_message_at),
      latestUserAuthoredMessageAt,
      hasActionableProposedPlan: row.has_actionable_proposed_plan === 1,
      pendingBackgroundTasks,
      providerInstanceHistory: providerInstanceHistoryForShell({
        threadId: thread.id,
        providerThreads: providerThreadsByThreadId.get(thread.id) ?? [],
      }),
      goal: activeProviderGoalForShell(
        providerThreadsByThreadId.get(thread.id) ?? [],
        thread.activeProviderThreadId,
      ),
      itemCount: shellItemCountsByThreadId.get(thread.id)?.itemCount ?? 0,
      runlessItemCount: shellItemCountsByThreadId.get(thread.id)?.runlessItemCount ?? 0,
      updatedAt: thread.updatedAt,
      runsById: runsByThreadId.get(ThreadId.make(row.thread_id)) ?? new Map(),
      inheritedRunIds:
        row.fork_run_ids_json === null
          ? null
          : new Set(yield* decodeForkRunIds(row.fork_run_ids_json)),
      itemCountByRunId: itemCountsByThreadId.get(ThreadId.make(row.thread_id)) ?? new Map(),
    } satisfies ShellThreadState;
  });
