// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ProjectionStore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
import type { ProjectThreadAwarenessV2Input } from "@t3tools/shared/agentAwareness";
import { applyOrchestrationV2ThreadVisit } from "@t3tools/contracts/orchestrationV2";
import { pendingGuestMessageCount } from "@t3tools/contracts/guestShare";
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
} from "@t3tools/contracts/orchestrationV2";
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
} from "@t3tools/contracts/orchestrationV2";
import type {
  PlanId,
  GuestShareId,
  ProviderThreadId,
  ProviderTurnId,
  RunAttemptId,
} from "@t3tools/contracts/baseSchemas";
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
} from "@t3tools/contracts/orchestrationV2";
import {
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
} from "@t3tools/contracts/baseSchemas";
import { ProviderInstanceId } from "@t3tools/contracts/providerInstance";
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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindOpenLocalTimeline = (ctx: any) =>
  Effect.fn("ProjectionStore.openLocalTimeline")(function* (
    threadId: ThreadId,
    includePersistentOutput = false,
  ) {
    const {
      getThreadRecords,
      inheritedRunFork,
      latestThreadEventSequence,
      readTimelineWindow,
      sql,
      timelineIndexes,
      CONVERSATION_INDEX_EXCLUDED_TYPES,
      encodeIdList,
    } = pickScriptcBindCtx(ctx);

    // A read that only the full index can answer left it cached, and it answers faster than
    // a window. The key is the one `readSnapshotTimelineIndex` uses.
    const cached = timelineIndexes.get(`${includePersistentOutput ? "work" : "plain"}:${threadId}`);
    if (
      cached !== undefined &&
      (yield* latestThreadEventSequence(threadId, cached.index.threadIds)) === cached.sequence
    )
      return null;
    // Checked in SQL, so a fork loads no runs and no thread here before the full index does.
    const ownRowsOnly = yield* sql`
        SELECT 1 FROM orchestration_v2_projection_threads
        WHERE thread_id = ${threadId}
          AND NOT (json_extract(payload_json, '$.forkedFrom.type') IS 'run'
            AND json_extract(payload_json, '$.lineage.sideChat') IS NOT 1)`;
    if (ownRowsOnly.length === 0) return null;
    const records = yield* getThreadRecords(threadId, []);
    if (inheritedRunFork(records.thread) !== null) return null;
    // Only these runs and attempts can hide rows, and their columns are all visibility reads.
    const [hidingRuns, superseded] = yield* Effect.all([
      sql<{ id: RunId; status: OrchestrationV2Run["status"] }>`
          SELECT run_id AS id, status FROM orchestration_v2_projection_runs
          WHERE thread_id = ${threadId}
            AND (status IN ('rolled_back', 'queued')
              OR (status = 'cancelled' AND json_extract(payload_json, '$.startedAt') IS NULL))`,
      sql<{ runId: RunId; rootNodeId: NodeId; status: "superseded" }>`
          SELECT run_id AS runId, root_node_id AS rootNodeId, status
          FROM orchestration_v2_projection_run_attempts
          WHERE thread_id = ${threadId} AND status = 'superseded'`,
    ]);
    const stopRequests =
      superseded.length === 0
        ? []
        : yield* sql<{ run_id: string | null }>`
              SELECT DISTINCT run_id FROM orchestration_v2_projection_turn_items
              WHERE thread_id = ${threadId} AND type = 'run_interrupt_request'`;
    const isVisible = createOrchestrationV2TurnItemVisibility({
      runs: hidingRuns,
      attempts: superseded,
      items: stopRequests.map((row) => ({
        type: "run_interrupt_request" as const,
        runId: row.run_id === null ? null : RunId.make(row.run_id),
        nodeId: null,
      })),
    });
    // Only these runs can hide rows: every row of a rolled-back run, the queued turn of a
    // queued run or a cancelled one that never started, and the stop result of a replaced attempt.
    // So the hidden rows are found without reading the thread.
    const stoppedRuns = new Set(stopRequests.map((row) => row.run_id));
    const runsWithStatus = (...statuses: ReadonlyArray<OrchestrationV2Run["status"]>) =>
      hidingRuns.flatMap((run) => (statuses.includes(run.status) ? [String(run.id)] : []));
    const rolledBack = runsWithStatus("rolled_back");
    const heldInput = runsWithStatus("queued", "cancelled");
    const steered = [...new Set(superseded.map((attempt) => String(attempt.runId)))].filter(
      (runId) => !stoppedRuns.has(runId) && !rolledBack.includes(runId),
    );
    type HiddenCandidate = {
      turn_item_id: string;
      run_id: string;
      node_id: string | null;
      type: OrchestrationV2TurnItem["type"];
      ordinal: number;
      input_intent: NonNullable<TimelineIndexItem["inputIntent"]> | null;
    };
    const candidateColumns = sql`item.turn_item_id, item.run_id, item.node_id, item.type,
        item.ordinal, CASE WHEN item.type = 'user_message'
          THEN json_extract(item.payload_json, '$.inputIntent') END AS input_intent`;
    const [rolledBackRows, conversationRows] = yield* Effect.all([
      rolledBack.length === 0
        ? Effect.succeed([])
        : sql<HiddenCandidate>`
              SELECT ${candidateColumns}
              FROM json_each(${encodeIdList(rolledBack)}) AS wanted
              CROSS JOIN orchestration_v2_projection_turn_items AS item
                INDEXED BY orchestration_v2_projection_turn_items_thread_run_idx
                ON item.thread_id = ${threadId} AND item.run_id = wanted.value`,
      // The conversation index holds the type and run of these rows, so only the matches are
      // fetched. Through the run index, every row of each such run would be.
      heldInput.length + steered.length === 0
        ? Effect.succeed([])
        : sql<HiddenCandidate>`
              SELECT ${candidateColumns}
              FROM orchestration_v2_projection_turn_items AS item
                INDEXED BY orchestration_v2_projection_turn_items_conversation_idx
              WHERE item.thread_id = ${threadId}
                AND item.type NOT IN ${CONVERSATION_INDEX_EXCLUDED_TYPES}
                AND ((item.type = 'user_message'
                    AND item.run_id IN (SELECT value FROM json_each(${encodeIdList(heldInput)})))
                  OR (item.type = 'run_interrupt_result'
                    AND item.run_id IN (SELECT value FROM json_each(${encodeIdList(steered)}))))`,
    ]);
    const hidden = [...rolledBackRows, ...conversationRows].filter(
      (row) =>
        !isVisible({
          type: row.type,
          runId: RunId.make(row.run_id),
          nodeId: row.node_id === null ? null : NodeId.make(row.node_id),
          ...(row.input_intent === null ? {} : { inputIntent: row.input_intent }),
        }),
    );
    /** Counts the visible rows that sort before the given ordinal and item id. */
    const visibleBefore = Effect.fn("ProjectionStore.countVisibleTimelineRows")(function* (
      ordinal: number,
      itemId = "",
    ) {
      const rows = yield* sql<{ count: number }>`
          SELECT COUNT(*) AS count FROM orchestration_v2_projection_turn_items
          WHERE thread_id = ${threadId} AND (ordinal, turn_item_id) < (${ordinal}, ${itemId})`;
      const hiddenBefore = hidden.filter(
        (row) =>
          row.ordinal < ordinal ||
          (row.ordinal === ordinal &&
            Buffer.compare(Buffer.from(row.turn_item_id), Buffer.from(itemId)) < 0),
      );
      return (rows[0]?.count ?? 0) - hiddenBefore.length;
    });
    return {
      records,
      isVisible,
      hidden,
      visibleBefore,
      read: (where: Statement.Fragment, limit?: Statement.Fragment) =>
        readTimelineWindow(threadId, includePersistentOutput, where, limit),
    };
  });
