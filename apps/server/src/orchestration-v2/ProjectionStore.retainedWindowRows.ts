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

import type { ProjectionWindow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindRetainedWindowRows = (ctx: any) =>
  Effect.fn("ProjectionStore.retainedWindowRows")(function* (
    threadId: ThreadId,
    window: ProjectionWindow,
  ) {
    const { sql, CONVERSATION_INDEX_EXCLUDED_TYPES } = ctx;

    const eligible = sql`
                WITH eligible AS NOT MATERIALIZED (
                  SELECT item.rowid AS item_rowid, item.payload_json, item.ordinal, item.turn_item_id,
                    item.run_id, item.node_id, item.type, item.status, item.inline_work_output,
                    run.status AS run_status,
                    attempt.attempt_id, attempt.status AS attempt_status
                  FROM orchestration_v2_projection_turn_items AS item
                  LEFT JOIN orchestration_v2_projection_runs AS run
                    ON run.run_id = item.run_id
                  LEFT JOIN orchestration_v2_projection_nodes AS node
                    ON ${window.deferWork ? 1 : 0} = 1 AND node.node_id = item.node_id
                  LEFT JOIN orchestration_v2_projection_run_attempts AS attempt
                    ON ${window.deferWork ? 1 : 0} = 1 AND attempt.attempt_id = (
                      SELECT attempt_id FROM orchestration_v2_projection_run_attempts
                      WHERE run_id = item.run_id AND root_node_id = COALESCE(node.root_node_id, item.node_id)
                      ORDER BY attempt_ordinal DESC LIMIT 1
                    )
                  WHERE item.thread_id = ${threadId}
                    AND item.ordinal <= COALESCE(
                      (
                        SELECT ordinal
                        FROM orchestration_v2_projection_turn_items
                        WHERE thread_id = ${threadId}
                          AND turn_item_id = ${window.anchorItemId ?? null}
                        LIMIT 1
                      ),
                      9223372036854775807
                    )
                    -- The fork cutoff below filters rewound runs; undelivered queued input stays hidden.
                    AND (
                      ${window.requiredRunId ?? null} IS NOT NULL
                      OR run.status IS NULL
                      OR run.status <> 'rolled_back'
                    )
                    AND NOT (
                      item.type = 'user_message'
                      AND (
                        COALESCE(run.status IN ('queued', 'cancelled'), 0)
                        OR (
                          run.status = 'rolled_back'
                          AND EXISTS (
                            SELECT 1
                            FROM orchestration_v2_projection_run_attempts AS attempt
                            WHERE attempt.run_id = run.run_id
                              AND attempt.status = 'cancelled'
                          )
                        )
                      )
                      AND json_extract(item.payload_json, '$.inputIntent') = 'queued_turn'
                      AND (run.status = 'queued' OR json_extract(run.payload_json, '$.startedAt') IS NULL)
                    )
                    AND (
                      ${window.requiredRunId ?? null} IS NULL
                      OR (
                        item.run_id IS NULL
                        AND EXISTS (
                          SELECT 1
                          FROM orchestration_v2_projection_threads AS source_thread
                          WHERE source_thread.thread_id = item.thread_id
                            AND json_extract(source_thread.payload_json, '$.historyOrigin') = 'v1_import'
                        )
                      )
                      OR (
                        run.ordinal <= (
                          SELECT required_run.ordinal
                          FROM orchestration_v2_projection_runs AS required_run
                          WHERE required_run.thread_id = item.thread_id
                            AND required_run.run_id = ${window.requiredRunId ?? null}
                          LIMIT 1
                        )
                        AND run.run_id IN (SELECT value FROM json_each(${window.forkRunIdsJson ?? "[]"}))
                      )
                    )
                    AND NOT (
                      item.type = 'run_interrupt_result'
                      AND EXISTS (
                        SELECT 1
                        FROM orchestration_v2_projection_run_attempts AS attempt
                        WHERE attempt.run_id = item.run_id
                          AND attempt.root_node_id = item.node_id
                          AND attempt.status = 'superseded'
                      )
                      AND NOT EXISTS (
                        SELECT 1
                        FROM orchestration_v2_projection_turn_items AS request
                        WHERE request.thread_id = item.thread_id
                          AND request.run_id = item.run_id
                          AND request.type = 'run_interrupt_request'
                      )
                    )
                )`;
    // Resolve anchors separately: repeated CTE expansion exceeds SQLite's subquery limit.
    const anchors = yield* sql<{ readonly ordinal: number; readonly latest: number | null }>`
                ${eligible}, run_starts AS (
                  -- A wake (PR watch, task completion) starts its run with a
                  -- notification instead of a user message. Read the first
                  -- input of each run, newest run first, and add the
                  -- notifications to the user-message turn starts. A run
                  -- without an eligible first input (queued, rolled back) is
                  -- skipped, so it cannot hide older turns. CROSS JOIN keeps
                  -- the runs as the outer loop, and each probe reads only the
                  -- first rows of a run.
                  SELECT start.ordinal, start.type
                  FROM orchestration_v2_projection_runs AS recent_run
                  CROSS JOIN eligible AS start ON start.item_rowid = (
                    SELECT first_input.rowid
                    FROM orchestration_v2_projection_turn_items AS first_input
                    WHERE first_input.run_id = recent_run.run_id
                      AND first_input.type IN ('user_message', 'notification')
                    ORDER BY first_input.ordinal
                    LIMIT 1
                  )
                  WHERE recent_run.thread_id = ${threadId}
                    AND recent_run.ordinal <= COALESCE(
                      (
                        SELECT anchor_run.ordinal
                        FROM orchestration_v2_projection_turn_items AS anchor_item
                        JOIN orchestration_v2_projection_runs AS anchor_run
                          ON anchor_run.run_id = anchor_item.run_id
                        WHERE anchor_item.thread_id = ${threadId}
                          AND anchor_item.turn_item_id = ${window.anchorItemId ?? null}
                        LIMIT 1
                      ),
                      9223372036854775807
                    )
                    AND ${window.userTurnLimit ?? null} IS NOT NULL
                  ORDER BY recent_run.ordinal DESC
                  LIMIT ${THREAD_HISTORY_MAX_RAW_TURNS + 2}
                ), turn_anchors AS (
                  SELECT ordinal, payload_json
                  FROM (
                    SELECT ordinal, payload_json
                    FROM eligible
                    WHERE type = 'user_message'
                      AND json_extract(payload_json, '$.inputIntent') IN ('turn_start', 'queued_turn')
                      AND ${window.userTurnLimit ?? null} IS NOT NULL
                    ORDER BY ordinal DESC
                    LIMIT ${THREAD_HISTORY_MAX_RAW_TURNS + 2}
                  )
                  UNION ALL
                  SELECT ordinal, NULL FROM run_starts WHERE type = 'notification'
                  ORDER BY ordinal DESC
                  LIMIT ${THREAD_HISTORY_MAX_RAW_TURNS + 2}
                ), user_anchors AS (
                  SELECT ordinal
                  FROM turn_anchors
                  WHERE json_extract(payload_json, '$.createdBy') = 'user'
                  ORDER BY ordinal DESC
                  LIMIT ${(window.userTurnLimit ?? 0) + 2}
                ), boundary AS (
                  SELECT CASE
                    WHEN COUNT(*) >= ${(window.userTurnLimit ?? 0) + 2} THEN MIN(ordinal)
                    WHEN (SELECT COUNT(*) FROM turn_anchors) >= ${THREAD_HISTORY_MAX_RAW_TURNS + 2}
                      THEN (SELECT MIN(ordinal) FROM turn_anchors)
                    ELSE 0
                  END AS ordinal
                  FROM user_anchors
                )
                SELECT ordinal, (SELECT MAX(ordinal) FROM user_anchors) AS latest FROM boundary
              `;
    const boundary = anchors[0]!;
    // Folding needs whole segments, so the window would walk every item since the boundary.
    // It stays above the newest `tailRows` rows that are sure to keep their own row. Start at
    // the latest segment start of each run that reaches that point, clamped to it so runless
    // rows below stay in the scan.
    const tailRows = Math.max(window.rowLimit, THREAD_HISTORY_TURN_SNAPSHOT_ROW_LIMIT);
    // The newest rows sure to keep their own row: conversation rows, and every row of the
    // running run, which folds nothing. More of them than a whole turn may hold means the
    // window pages from inside the newest turn with the row limit, so the tail shrinks to
    // that limit. A turn of thousands of rows is then not walked to return the newest few.
    const tailWorkStart = sql<{
      readonly ordinal: number | null;
      readonly long_turn: number;
    }>`
                ${eligible}, live_run AS (
                  -- The oldest live run is the one at work; queued runs follow it.
                  SELECT live.run_id FROM orchestration_v2_projection_runs AS live
                  WHERE live.thread_id = ${threadId}
                    AND live.status IN ('queued','preparing','starting','running','waiting')
                    AND ${window.requiredRunId ?? null} IS NULL
                    AND NOT EXISTS (
                      SELECT 1 FROM orchestration_v2_projection_run_attempts
                      WHERE run_id = live.run_id AND status = 'superseded'
                    )
                  ORDER BY +live.ordinal ASC LIMIT 1
                ), visible_tail AS (
                  SELECT ordinal FROM (
                    SELECT ordinal FROM eligible
                    WHERE ordinal >= ${boundary.ordinal}
                      AND type NOT IN ${CONVERSATION_INDEX_EXCLUDED_TYPES}
                    ORDER BY ordinal DESC
                    LIMIT ${tailRows}
                  )
                  UNION
                  SELECT ordinal FROM (
                    SELECT live_item.ordinal
                    FROM orchestration_v2_projection_turn_items AS live_item
                    -- The unary plus keeps this on the run index, whose ordinal order ends
                    -- the walk at the limit.
                    WHERE live_item.run_id = (SELECT run_id FROM live_run)
                      AND +live_item.thread_id = ${threadId}
                      AND live_item.ordinal >= ${boundary.ordinal}
                      AND live_item.ordinal <= COALESCE(
                        (
                          SELECT ordinal FROM orchestration_v2_projection_turn_items
                          WHERE thread_id = ${threadId}
                            AND turn_item_id = ${window.anchorItemId ?? null}
                          LIMIT 1
                        ),
                        9223372036854775807
                      )
                    ORDER BY live_item.ordinal DESC
                    LIMIT ${tailRows}
                  )
                  ORDER BY ordinal DESC
                  LIMIT ${tailRows}
                ), turn AS (
                  SELECT (
                    SELECT COUNT(*) FROM visible_tail WHERE ordinal >= ${boundary.latest}
                  ) > ${THREAD_HISTORY_PAGE_POLICY.maxTurnItems} AS long_turn
                ), tail AS (
                  SELECT visible_tail.ordinal FROM visible_tail
                  ORDER BY visible_tail.ordinal DESC
                  LIMIT 1 OFFSET (
                    SELECT MAX(CASE WHEN long_turn THEN ${window.rowLimit} ELSE ${tailRows} END, 1) - 1
                    FROM turn
                  )
                ), tail_runs AS (
                  SELECT DISTINCT item.run_id
                  FROM tail CROSS JOIN eligible AS item
                  WHERE item.ordinal >= tail.ordinal AND item.run_id IS NOT NULL
                )
                SELECT MIN(MIN(CASE
                  -- Only a completed run or a superseded attempt folds work, and folding is
                  -- what needs the whole segment. Any other run keeps every row.
                  WHEN (
                    SELECT status FROM orchestration_v2_projection_runs
                    WHERE run_id = tail_runs.run_id
                  ) IS NOT 'completed' AND NOT EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_run_attempts
                    WHERE run_id = tail_runs.run_id AND status = 'superseded'
                  ) THEN tail.ordinal
                  ELSE COALESCE(
                    (
                      SELECT start.ordinal FROM eligible AS start
                      WHERE start.run_id = tail_runs.run_id AND start.type = 'user_message'
                        AND start.ordinal <= tail.ordinal
                      ORDER BY start.ordinal DESC LIMIT 1
                    ),
                    (
                      SELECT MIN(first.ordinal) FROM orchestration_v2_projection_turn_items AS first
                      WHERE first.thread_id = ${threadId} AND first.run_id = tail_runs.run_id
                    ),
                    tail.ordinal
                  )
                END, tail.ordinal)) AS ordinal, (SELECT long_turn FROM turn) AS long_turn
                FROM tail LEFT JOIN tail_runs
              `;
    // A negative or fractional limit makes SQLite's LIMIT disagree with `tailRows`; keep the old start.
    const tail =
      window.deferWork === true &&
      boundary.latest !== null &&
      Number.isSafeInteger(window.rowLimit) &&
      window.rowLimit >= 0
        ? (yield* tailWorkStart)[0]
        : undefined;
    const longTurn = tail?.long_turn === 1;
    const workStart = Math.max(boundary.ordinal, tail?.ordinal ?? 0);
    return sql`
                ${eligible}, blocked_runs AS MATERIALIZED (
                  SELECT DISTINCT run_id FROM orchestration_v2_projection_turn_items
                  WHERE thread_id = ${threadId} AND run_id IS NOT NULL
                    AND ${window.deferWork ? 1 : 0} = 1
                    -- Only a run that can fold asks whether it is blocked. A live run cannot,
                    -- and this check would read every row it ever wrote.
                    AND run_id IN (
                      SELECT run_id FROM eligible
                      WHERE ordinal >= ${workStart} AND run_id IS NOT NULL
                        AND (run_status = 'completed' OR attempt_status = 'superseded')
                    )
                    AND (type IN ('run_interrupt_request', 'run_interrupt_result')
                      OR (type = 'error' AND status = 'failed' AND parent_item_id IS NULL))
                ), work_segments AS (
                  SELECT item_rowid, ordinal, turn_item_id, run_id, type, attempt_id,
                    MAX(CASE WHEN type = 'user_message' THEN ordinal ELSE 0 END)
                      OVER (PARTITION BY run_id ORDER BY ordinal) AS segment,
                    CASE WHEN status = 'completed' AND (run_status = 'completed' OR attempt_status = 'superseded')
                      AND type IN ${sql.in(DEFERRED_WORK_ITEM_TYPES)}
                      AND inline_work_output = 0
                      AND run_id NOT IN (SELECT run_id FROM blocked_runs)
                      THEN 1 ELSE 0 END AS can_defer
                  FROM eligible AS item
                  WHERE ${window.deferWork ? 1 : 0} = 1
                    AND ${boundary.latest === null ? 0 : 1} = 1
                    AND ordinal >= ${workStart}
                ), deferred_work AS (
                  SELECT run_id, segment, attempt_id, MIN(ordinal) AS first_ordinal,
                    MAX(ordinal) AS last_ordinal, COUNT(*) AS item_count
                  FROM work_segments WHERE can_defer = 1
                  GROUP BY run_id, segment, attempt_id HAVING COUNT(*) > ${THREAD_HISTORY_INLINE_WORK_ITEM_LIMIT}
                ), window_items AS NOT MATERIALIZED (
                  SELECT item_rowid, ordinal, turn_item_id, run_id, type
                  FROM eligible WHERE ${window.deferWork ? 1 : 0} = 0
                    OR ${boundary.latest === null ? 1 : 0} = 1
                  UNION ALL
                  SELECT item.item_rowid, item.ordinal, item.turn_item_id, item.run_id, item.type
                  FROM work_segments item LEFT JOIN deferred_work deferred
                    ON deferred.run_id = item.run_id AND deferred.segment = item.segment
                    AND deferred.attempt_id IS item.attempt_id
                  WHERE item.can_defer = 0 OR deferred.run_id IS NULL OR item.ordinal = deferred.first_ordinal
                ), latest_user_turn AS (
                  -- Mirrors selectOlderTimelinePage: whole turns while the
                  -- newest user turn fits the turn row budget, otherwise the
                  -- window pages from inside that turn with the row limit.
                  SELECT COUNT(*) AS row_count
                  FROM (
                    SELECT 1
                    FROM window_items
                    WHERE ordinal >= ${boundary.latest}
                    LIMIT ${THREAD_HISTORY_PAGE_POLICY.maxTurnItems + 1}
                  )
                ), selected AS (
                  -- Choose and sort rows by ID, then fetch payloads in that
                  -- order. A turn window can hold megabytes of tool output, and
                  -- carrying it through the union and sort cost about a second.
                  SELECT item_rowid, ordinal, turn_item_id, run_id, type
                  FROM window_items
                  WHERE ordinal >= ${boundary.ordinal}
                  ORDER BY ordinal DESC, turn_item_id DESC
                  -- Every LIMIT here and in latest_user_turn must stay <= tailRows, or rows below workStart go missing.
                  LIMIT CASE
                    WHEN ${window.rowLimit} = 0 THEN 0
                    WHEN ${longTurn ? 1 : 0} = 1 THEN ${window.rowLimit}
                    WHEN (SELECT row_count FROM latest_user_turn)
                      BETWEEN 1 AND ${THREAD_HISTORY_PAGE_POLICY.maxTurnItems}
                      THEN ${THREAD_HISTORY_TURN_SNAPSHOT_ROW_LIMIT}
                    ELSE ${window.rowLimit}
                  END
                ), retained AS MATERIALIZED (
                  SELECT item_rowid, ordinal, turn_item_id FROM selected
                  UNION
                  SELECT request.rowid AS item_rowid, request.ordinal, request.turn_item_id
                  FROM orchestration_v2_projection_turn_items AS request
                  WHERE request.run_id IN (
                      SELECT run_id FROM selected
                      WHERE type = 'run_interrupt_result' AND run_id IS NOT NULL
                    )
                    AND request.type = 'run_interrupt_request'
                  UNION
                  SELECT latest.item_rowid, latest.ordinal, latest.turn_item_id
                  FROM (
                    SELECT rowid AS item_rowid, ordinal, turn_item_id
                    FROM orchestration_v2_projection_turn_items
                    WHERE thread_id = ${threadId}
                      AND ${window.anchorItemId ?? null} IS NULL
                      AND ${window.requiredRunId ?? null} IS NULL
                    ORDER BY ordinal DESC, turn_item_id DESC
                    LIMIT 1
                  ) AS latest
                  ORDER BY ordinal ASC, turn_item_id ASC
                )
              `;
  });
