// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ProjectionStore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
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

import type {
  PayloadRow,
  ProjectionRecordField,
  ProjectionRecordFilter,
  ProjectionWindow,
} from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindReadCanonicalProjection = (ctx: any) =>
  Effect.fn("ProjectionStore.readCanonicalProjection")(
    function* (
      threadId: ThreadId,
      window?: ProjectionWindow,
      fields?: ReadonlyArray<ProjectionRecordField>,
      filter?: ProjectionRecordFilter,
    ) {
      const {
        PROMPT_NARROWING_BLOCKING_FILTERS,
        ProjectionStoreReadError,
        ProjectionStoreThreadNotFoundError,
        commandTurnItems,
        decodeCheckpointPayload,
        decodeCheckpointScopePayload,
        decodeContextHandoffPayload,
        decodeContextTransferPayload,
        decodeMessagePayload,
        decodeNodePayload,
        decodePlanJson,
        decodeProviderSessionPayload,
        decodeProviderThreadPayload,
        decodeProviderTurnPayload,
        decodeRows,
        decodeRunAttemptPayload,
        decodeRunPayload,
        decodeRuntimeRequestPayload,
        decodeSubagentPayload,
        decodeThreadPayload,
        decodeTurnItemPayload,
        encodeIdList,
        isProjectionStoreThreadNotFoundError,
        matchesNothing,
        nullableStringField,
        runIdsSinceLastCompaction,
        sortMessagesByTurnItemOrder,
        sql,
        LIVE_NODES_INDEX,
        nodesOwningProviderThreads,
        presentedShellRunId,
        retainedWindowRows,
        settledSubagent,
        threadColumn,
        todoListOfSettledRun,
        turnItemMatch,
        unsettledSubagentRowids,
      } = pickScriptcBindCtx(ctx);

      const threadRows = yield* sql<PayloadRow>`
          SELECT payload_json
          FROM orchestration_v2_projection_threads
          WHERE thread_id = ${threadId}
          LIMIT 1
        `;
      const threadRow = threadRows[0];
      if (!threadRow) {
        return yield* new ProjectionStoreThreadNotFoundError({ threadId });
      }
      const recentRuns =
        window === undefined && filter?.sinceLastCompaction !== undefined
          ? yield* runIdsSinceLastCompaction(threadId, filter.sinceLastCompaction)
          : null;
      const recentRunIds = recentRuns === null ? null : encodeIdList(recentRuns);
      const readsWholeHistory =
        (fields === undefined || fields.includes("runs")) &&
        PROMPT_NARROWING_BLOCKING_FILTERS.every((key) => filter?.[key] === undefined);
      const promptRuns = readsWholeHistory ? recentRuns : null;
      const inRecentRuns = (column: string) =>
        recentRunIds === null
          ? sql``
          : sql`AND ${sql.literal(column)} IN (SELECT value FROM json_each(${recentRunIds}))`;
      // Without the hint SQLite reads every row of the thread to find the recent runs' rows.
      const recentRunIndex = (index: string) =>
        recentRunIds === null
          ? sql``
          : sql`INDEXED BY ${sql.literal(`orchestration_v2_projection_${index}`)}`;

      type WindowPayloadRow = PayloadRow & {
        readonly work_last_id?: string | null;
        readonly work_last_ordinal?: number | null;
        readonly work_item_count?: number | null;
      };
      const boundedTurnItemRows: ReadonlyArray<WindowPayloadRow> =
        (fields !== undefined && !fields.includes("turnItems")) ||
        // A compacted thread reads its items once its runs are known.
        promptRuns !== null ||
        (window === undefined &&
          matchesNothing(
            filter?.turnItemRequestIds,
            filter?.turnItemTypes,
            filter?.turnItemStatuses,
            filter?.turnItemRunIds,
            filter?.turnItemNodeIds,
          ))
          ? []
          : window === undefined
            ? yield* sql<PayloadRow>`
                SELECT payload_json
                FROM orchestration_v2_projection_turn_items
                ${
                  filter?.turnItemTypes === undefined && filter?.turnItemStatuses === undefined
                    ? sql`WHERE ${turnItemMatch(threadId, filter)}`
                    : // Matches on the type/status index and fetches only those payloads. Sorted, SQLite would walk the thread by ordinal instead.
                      sql`WHERE rowid IN (
                    SELECT rowid FROM orchestration_v2_projection_turn_items
                    WHERE ${turnItemMatch(threadId, filter)}
                  )`
                }
                ORDER BY ordinal ASC, turn_item_id ASC
              `
            : yield* sql<PayloadRow>`
                ${yield* retainedWindowRows(threadId, window)}
                -- CROSS JOIN keeps the sorted IDs as the outer loop, so SQLite
                -- skips sorting again once the payloads are attached. Carry the
                -- rowid through selection to avoid a second string-key index lookup.
                SELECT item.payload_json, tail.turn_item_id AS work_last_id,
                  deferred.last_ordinal AS work_last_ordinal, deferred.item_count AS work_item_count
                FROM retained
                CROSS JOIN orchestration_v2_projection_turn_items AS item
                  ON item.rowid = retained.item_rowid
                LEFT JOIN deferred_work deferred ON deferred.run_id = item.run_id
                  AND deferred.first_ordinal = item.ordinal
                LEFT JOIN orchestration_v2_projection_turn_items tail
                  ON tail.turn_item_id = (
                    SELECT turn_item_id FROM orchestration_v2_projection_turn_items
                    WHERE thread_id = item.thread_id AND ordinal = deferred.last_ordinal
                    ORDER BY turn_item_id DESC LIMIT 1
                  )
                ORDER BY retained.ordinal ASC, retained.turn_item_id ASC
              `;
      // Decode items once for cohort ids and projection; repeated parsing duplicates retained tool output.
      const decodedTurnItems = yield* decodeRows(
        decodeTurnItemPayload,
        threadId,
      )(boundedTurnItemRows);
      const storedTurnItems = decodedTurnItems.map((item, index) => {
        const row = boundedTurnItemRows[index]!;
        return row.work_last_id == null ||
          row.work_item_count == null ||
          row.work_last_ordinal == null
          ? item
          : {
              ...item,
              deferredWork: {
                cursor: encodeThreadHistoryCursor({
                  snapshotSequence: 0,
                  sourceThreadId: threadId,
                  sourceItemId: TurnItemId.make(row.work_last_id),
                  position: row.work_last_ordinal,
                  inclusive: true,
                }),
                itemCount: row.work_item_count,
                lastOrdinal: row.work_last_ordinal,
              },
            };
      });
      const cohortJson = (field: string) =>
        JSON.stringify(
          storedTurnItems.flatMap((payload) => {
            const value = nullableStringField(payload, field);
            return value === null ? [] : [value];
          }),
        );
      const cohortRunIds = cohortJson("runId");
      const cohortNodeIds =
        window === undefined ||
        (fields !== undefined &&
          fields.every(
            (field) => field === "runs" || field === "attempts" || field === "turnItems",
          ))
          ? cohortJson("nodeId")
          : encodeIdList(
              (yield* sql<{ readonly node_id: string }>`
            WITH RECURSIVE retained(node_id) AS (
              SELECT value FROM json_each(${cohortJson("nodeId")})
              UNION
              SELECT node_id FROM orchestration_v2_projection_nodes AS live
                ${LIVE_NODES_INDEX}
              WHERE thread_id = ${threadId} AND status IN ('pending','starting','running','waiting')
                AND NOT ${todoListOfSettledRun(sql`live`)}
              UNION
              SELECT root_node_id FROM orchestration_v2_projection_run_attempts
              WHERE thread_id = ${threadId} AND (
                status IN ('pending','starting','running','waiting')
                OR run_id IN (SELECT value FROM json_each(${cohortRunIds}))
                OR run_id = ${window.requiredRunId ?? null})
              UNION
              SELECT json_extract(payload_json, '$.rootNodeId') FROM orchestration_v2_projection_runs
              WHERE thread_id = ${threadId} AND (
                status IN ('queued','preparing','starting','running','waiting')
                OR run_id IN (SELECT value FROM json_each(${cohortRunIds}))
                OR run_id = ${window.requiredRunId ?? null})
              UNION
              SELECT node_id FROM orchestration_v2_projection_runtime_requests
              WHERE thread_id = ${threadId} AND status IN ('pending','waiting')
              UNION
              SELECT parent_node_id FROM orchestration_v2_projection_subagents
              WHERE thread_id = ${threadId} AND status IN ('pending','starting','running','waiting')
              UNION
              SELECT node_id FROM orchestration_v2_projection_provider_turns
              WHERE thread_id = ${threadId} AND status IN ('starting','running','waiting')
              UNION
              SELECT parent.parent_node_id FROM orchestration_v2_projection_nodes AS parent
              INNER JOIN retained ON parent.node_id = retained.node_id
              WHERE parent.thread_id = ${threadId} AND parent.parent_node_id IS NOT NULL
            )
            -- Sort IDs before fetching bodies, so large payloads never enter
            -- SQLite's temporary sort. The node read restores this order by key.
            SELECT retained.node_id
            FROM retained
            LEFT JOIN orchestration_v2_projection_nodes AS node
              ON node.node_id = retained.node_id AND node.thread_id = ${threadId}
            WHERE retained.node_id IS NOT NULL
            ORDER BY COALESCE(node.started_at, ''), retained.node_id ASC
          `).map((row) => row.node_id),
            );
      const cohortProviderThreadIds = cohortJson("providerThreadId");
      const cohortProviderTurnIds = cohortJson("providerTurnId");
      const cohortMessageIds = cohortJson("messageId");
      const cohortPlanIds = cohortJson("planId");
      const cohortCheckpointIds = cohortJson("checkpointId");
      const cohortHandoffIds = cohortJson("contextHandoffId");
      // A newer completion must keep an older active list from resurfacing after paging.
      const [latestTodoList] =
        window === undefined ||
        (fields !== undefined &&
          !fields.some(
            (field) => field === "plans" || field === "runs" || field === "providerThreads",
          ))
          ? []
          : yield* sql<{
              readonly plan_id: string;
              readonly run_id: string;
              readonly provider_thread_id: string | null;
              readonly last_plan_id: string;
            }>`
                WITH latest_owner AS MATERIALIZED (
                  SELECT plan.plan_id, owner.run_id, owner.provider_thread_id
                  FROM orchestration_v2_projection_plans AS plan
                  INNER JOIN orchestration_v2_projection_runs AS owner
                    ON owner.thread_id = plan.thread_id AND owner.run_id = plan.run_id
                  WHERE plan.thread_id = ${threadId}
                    AND plan.kind = 'todo_list' AND plan.status <> 'superseded'
                  ORDER BY owner.ordinal DESC, plan.plan_id DESC
                  LIMIT 1
                )
                SELECT COALESCE(CASE WHEN EXISTS (
                  SELECT 1 FROM orchestration_v2_projection_plans
                  WHERE thread_id = ${threadId} AND run_id = owner.run_id
                    AND kind = 'todo_list' AND status <> 'superseded'
                    AND plan_id <> owner.plan_id
                ) THEN (
                  -- Plan UUIDs cannot order replacements within a run.
                  SELECT plan.plan_id
                  FROM orchestration_v2_projection_turn_items AS item
                  CROSS JOIN orchestration_v2_projection_plans AS plan
                    ON plan.plan_id = json_extract(item.payload_json, '$.planId')
                  WHERE item.run_id = owner.run_id AND item.thread_id = ${threadId}
                    AND item.type = 'todo_list'
                    AND plan.run_id = owner.run_id AND plan.thread_id = ${threadId}
                    AND plan.kind = 'todo_list' AND plan.status <> 'superseded'
                  ORDER BY item.ordinal DESC
                  LIMIT 1
                ) END, owner.plan_id) AS plan_id, owner.run_id, owner.provider_thread_id,
                (
                  SELECT MAX(plan_id) FROM orchestration_v2_projection_plans
                  WHERE thread_id = ${threadId} AND run_id = owner.run_id
                ) AS last_plan_id
                FROM latest_owner AS owner
              `;

      const [
        thread,
        runRows,
        attemptRows,
        nodeRows,
        subagentRows,
        providerSessionRows,
        providerThreadRows,
        providerTurnRows,
        runtimeRequestRows,
        messageRows,
        planRows,
        checkpointScopeRows,
        checkpointRows,
        contextHandoffRows,
        contextTransferRows,
      ] = yield* Effect.all([
        decodeThreadPayload(threadRow.payload_json),
        (fields !== undefined && !fields.includes("runs")) ||
        (window === undefined &&
          (matchesNothing(filter?.runIds) ||
            (matchesNothing(filter?.runStatuses) &&
              filter?.includeLatestRun !== true &&
              filter?.includeLatestExecutedRun !== true &&
              filter?.latestRunLimit === undefined)))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_runs
            WHERE ${threadColumn(
              filter?.latestRunLimit === undefined && filter?.includeLatestExecutedRun !== true
                ? filter?.runIds
                : [],
            )} = ${threadId}
              ${filter?.runIds === undefined ? sql`` : sql`AND run_id IN (SELECT value FROM json_each(${encodeIdList(filter.runIds)}))`}
              ${
                filter?.latestRunLimit !== undefined
                  ? sql`AND run_id IN (
                      SELECT run_id FROM (
                        SELECT run_id FROM orchestration_v2_projection_runs
                        WHERE thread_id = ${threadId}
                        ORDER BY ordinal DESC
                        LIMIT ${filter.latestRunLimit}
                      )
                      ${
                        filter.runStatuses === undefined
                          ? sql``
                          : sql`UNION
                      SELECT run_id FROM orchestration_v2_projection_runs
                      WHERE thread_id = ${threadId}
                        AND status IN (SELECT value FROM json_each(${encodeIdList(filter.runStatuses)}))`
                      }
                    )
                    ORDER BY ordinal ASC`
                  : filter?.runStatuses === undefined
                    ? sql`ORDER BY ordinal ASC`
                    : filter.includeLatestRun !== true && filter.includeLatestExecutedRun !== true
                      ? // `+ordinal` stops SQLite from walking every run in the (thread_id, ordinal)
                        // index to skip a sort; a status index reads only matching runs.
                        sql`AND status IN (SELECT value FROM json_each(${encodeIdList(filter.runStatuses)}))
                    ORDER BY +ordinal ASC`
                      : filter.includeLatestExecutedRun === true
                        ? sql`AND run_id IN (
                      SELECT run_id FROM orchestration_v2_projection_runs
                      WHERE thread_id = ${threadId}
                        AND status IN (SELECT value FROM json_each(${encodeIdList(filter.runStatuses)}))
                      UNION
                      SELECT run_id FROM (
                        SELECT run_id FROM orchestration_v2_projection_runs
                        WHERE thread_id = ${threadId}
                          AND status <> 'queued'
                          AND NOT (
                            status = 'cancelled'
                            AND json_extract(payload_json, '$.startedAt') IS NULL
                          )
                        -- latestExecutedRun: the run that ended last (runRanAfter).
                        ORDER BY completed_at IS NULL DESC, completed_at DESC, ordinal DESC,
                          run_id DESC
                        LIMIT 1
                      )
                    )
                    ORDER BY ordinal ASC`
                        : sql`AND (status IN (SELECT value FROM json_each(${encodeIdList(filter.runStatuses)}))
                    OR run_id = (
                      SELECT run_id FROM orchestration_v2_projection_runs
                      WHERE thread_id = ${threadId}
                        AND (status <> 'cancelled' OR json_extract(payload_json, '$.startedAt') IS NOT NULL)
                      ORDER BY ordinal DESC
                      LIMIT 1
                    ))
                    ORDER BY ordinal ASC`
              }
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_runs
            WHERE thread_id = ${threadId}
              AND (status IN ('queued','preparing','starting','running','waiting')
                OR run_id IN (SELECT value FROM json_each(${cohortRunIds}))
                OR run_id = ${window.requiredRunId ?? null}
                ${
                  // Keep the shell's latest run even when its items are outside the newest window.
                  window.anchorItemId === undefined && window.requiredRunId === undefined
                    ? sql`OR run_id = ${presentedShellRunId(sql`${threadId}`)}`
                    : sql``
                }
                -- Queued or cancelled turns must not hide the latest actual session.
                OR run_id = ${latestTodoList?.run_id ?? null}
                OR run_id = (
                  SELECT run_id FROM orchestration_v2_projection_runs
                  WHERE thread_id = ${threadId}
                    AND provider_thread_id IS NOT NULL
                    AND json_extract(payload_json, '$.startedAt') IS NOT NULL
                    AND ${latestTodoList?.plan_id ?? null} IS NOT NULL
                  ORDER BY ordinal DESC
                  LIMIT 1
                ))
            ORDER BY ordinal ASC
          `,
        (fields !== undefined && !fields.includes("attempts")) ||
        (window === undefined && matchesNothing(filter?.attemptIds))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_run_attempts
            WHERE ${threadColumn(filter?.attemptIds)} = ${threadId}
              ${filter?.attemptIds === undefined ? sql`` : sql`AND attempt_id IN (SELECT value FROM json_each(${encodeIdList(filter.attemptIds)}))`}
              ${inRecentRuns("run_id")}
            ORDER BY run_id ASC, attempt_ordinal ASC
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_run_attempts
            WHERE thread_id = ${threadId}
              AND (status IN ('pending','starting','running','waiting')
                OR run_id IN (SELECT value FROM json_each(${cohortRunIds})))
            ORDER BY run_id ASC, attempt_ordinal ASC
          `,
        (fields !== undefined && !fields.includes("nodes")) ||
        (window === undefined && matchesNothing(filter?.nodeIds))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_nodes AS node
            WHERE ${
              filter?.omitSettledLeafNodes === true
                ? // Seeks the kept nodes. One filter over the thread reads every settled leaf to
                  // drop it. The first predicate must match migration 083's index expression. A
                  // node's run is always a run of its own thread, and an active run is recent.
                  sql`node.rowid IN (
                    SELECT rowid FROM orchestration_v2_projection_nodes
                      ${recentRunIndex("nodes_thread_run_idx")}
                    WHERE thread_id = ${threadId}
                      AND (kind IN ('tool_call', 'assistant_message', 'reasoning')
                        AND status IN ('completed', 'interrupted', 'failed', 'cancelled', 'rolled_back')
                        AND run_id IS NOT NULL) = 0
                      ${inRecentRuns("run_id")}
                    ${
                      filter.omitSettledSubagentRecords === true
                        ? // A subagent's node shares its id. Both indexes hold every column
                          // read here, so no settled subagent or node row is fetched.
                          sql`EXCEPT
                    SELECT settled_node.rowid
                    FROM orchestration_v2_projection_subagents AS settled
                      INDEXED BY orchestration_v2_projection_subagents_thread_idx
                    CROSS JOIN orchestration_v2_projection_nodes AS settled_node
                      ON settled_node.node_id = settled.subagent_id
                    WHERE settled.thread_id = ${threadId}
                      AND settled.rowid NOT IN (${unsettledSubagentRowids(threadId)})`
                        : sql``
                    }
                    UNION ALL
                    SELECT rowid FROM orchestration_v2_projection_nodes
                    WHERE thread_id = ${threadId}
                      AND run_id IN (
                        SELECT run_id FROM orchestration_v2_projection_runs
                        WHERE thread_id = ${threadId}
                          AND status IN ('preparing', 'queued', 'starting', 'running', 'waiting')
                      )
                      AND kind IN ('tool_call', 'assistant_message', 'reasoning')
                      AND status IN ('completed', 'interrupted', 'failed', 'cancelled', 'rolled_back')
                  )`
                : sql`${threadColumn(filter?.nodeIds, "node.thread_id")} = ${threadId}
                    ${inRecentRuns("node.run_id")}`
            }
              ${filter?.nodeIds === undefined ? sql`` : sql`AND node.node_id IN (SELECT value FROM json_each(${encodeIdList(filter.nodeIds)}))`}
            ORDER BY COALESCE(node.started_at, ''), node.node_id ASC
              `
            : sql<PayloadRow & { readonly position: number }>`
            -- Keep retained IDs outermost so SQLite looks up each node by its
            -- primary key instead of scanning every historical node in the thread.
            SELECT node.payload_json, retained.key AS position
            FROM json_each(${cohortNodeIds}) AS retained
            CROSS JOIN orchestration_v2_projection_nodes AS node
              ON node.node_id = retained.value
            WHERE node.thread_id = ${threadId}
          `.pipe(
                Effect.map((rows) =>
                  rows.toSorted((left, right) => left.position - right.position),
                ),
              ),
        (fields !== undefined && !fields.includes("subagents")) ||
        (window === undefined &&
          matchesNothing(
            filter?.subagentIds,
            filter?.subagentRunIds,
            filter?.subagentChildThreadIds,
          ))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_subagents AS subagent
            WHERE ${threadColumn(filter?.subagentIds ?? filter?.subagentChildThreadIds)} = ${threadId}
              ${filter?.subagentIds === undefined ? sql`` : sql`AND subagent_id IN (SELECT value FROM json_each(${encodeIdList(filter.subagentIds)}))`}
              ${filter?.subagentChildThreadIds === undefined ? sql`` : sql`AND child_thread_id IN (SELECT value FROM json_each(${encodeIdList(filter.subagentChildThreadIds)}))`}
              ${filter?.subagentRunIds === undefined ? sql`` : sql`AND run_id IN (SELECT value FROM json_each(${encodeIdList(filter.subagentRunIds)}))`}
              ${
                filter?.omitSettledSubagents === true
                  ? sql`AND subagent.rowid IN (${unsettledSubagentRowids(threadId)})`
                  : filter?.omitSettledSubagents !== undefined
                    ? sql`AND (
                      subagent_id IN (SELECT value FROM json_each(${encodeIdList(filter.omitSettledSubagents.except)}))
                      OR NOT ${settledSubagent(sql`subagent`)}
                    )`
                    : sql``
              }
            ORDER BY COALESCE(started_at, ''), subagent_id ASC
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_subagents
            WHERE thread_id = ${threadId}
              AND (status IN ('pending','starting','running','waiting')
                OR run_id IN (SELECT value FROM json_each(${cohortRunIds}))
                OR parent_node_id IN (SELECT value FROM json_each(${cohortNodeIds})))
            ORDER BY COALESCE(started_at, ''), subagent_id ASC
          `,
        fields !== undefined && !fields.includes("providerSessions")
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT sessions.payload_json
            FROM orchestration_v2_projection_provider_sessions AS sessions
            INNER JOIN orchestration_v2_projection_provider_session_bindings AS bindings
              ON bindings.provider_session_id = sessions.provider_session_id
            WHERE bindings.thread_id = ${threadId}
            ORDER BY sessions.updated_at ASC, sessions.provider_session_id ASC
          `
            : sql<PayloadRow>`
            SELECT DISTINCT sessions.payload_json
            FROM orchestration_v2_projection_provider_sessions AS sessions
            INNER JOIN orchestration_v2_projection_provider_session_bindings AS bindings
              ON bindings.provider_session_id = sessions.provider_session_id
            LEFT JOIN orchestration_v2_projection_provider_threads AS threads
              ON threads.provider_session_id = sessions.provider_session_id
            WHERE bindings.thread_id = ${threadId}
              AND (sessions.status IN ('starting','running','waiting')
                OR threads.provider_thread_id IN (SELECT value FROM json_each(${cohortProviderThreadIds})))
            ORDER BY sessions.updated_at ASC, sessions.provider_session_id ASC
          `,
        (fields !== undefined && !fields.includes("providerThreads")) ||
        (window === undefined && matchesNothing(filter?.providerThreadIds))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_provider_threads
            WHERE ${
              filter?.omitSettledSubagentRecords === true
                ? // A dispatcher's settled tasks' provider threads belong to the child threads;
                  // only a session this thread also uses is probed when it detaches. Most rows
                  // lack an owner or session, so ANALYZE rates those indexes as matching every
                  // row and SQLite scans for an OR of them; each union branch seeks instead.
                  sql`rowid IN (
              SELECT rowid FROM orchestration_v2_projection_provider_threads
              WHERE thread_id = ${threadId}
              UNION
              SELECT rowid FROM orchestration_v2_projection_provider_threads
                INDEXED BY orchestration_v2_projection_provider_threads_owner_idx
              WHERE owner_node_id IN (${nodesOwningProviderThreads(threadId)})
              UNION
              SELECT rowid FROM orchestration_v2_projection_provider_threads
              WHERE provider_thread_id IN (
                SELECT provider_thread_id
                FROM orchestration_v2_projection_subagents
                WHERE rowid IN (${unsettledSubagentRowids(threadId)})
                  AND provider_thread_id IS NOT NULL
              )
              UNION
              SELECT rowid FROM orchestration_v2_projection_provider_threads AS shared
                INDEXED BY orchestration_v2_projection_provider_threads_session_idx
              WHERE provider_session_id IN (
                  SELECT provider_session_id
                  FROM orchestration_v2_projection_provider_session_bindings
                  WHERE thread_id = ${threadId}
                )
                AND EXISTS (
                  SELECT 1 FROM orchestration_v2_projection_subagents AS owner
                  WHERE owner.provider_thread_id = shared.provider_thread_id
                    AND owner.thread_id = ${threadId}
                )
            )`
                : sql`(thread_id = ${threadId}
               OR owner_node_id IN (${nodesOwningProviderThreads(threadId)})
               OR provider_thread_id IN (
                 SELECT provider_thread_id
                 FROM orchestration_v2_projection_subagents
                 WHERE thread_id = ${threadId}
                   AND provider_thread_id IS NOT NULL
               ))`
            }
              ${filter?.providerThreadIds === undefined ? sql`` : sql`AND provider_thread_id IN (SELECT value FROM json_each(${encodeIdList(filter.providerThreadIds)}))`}
            ORDER BY COALESCE(first_run_ordinal, 0), provider_thread_id ASC
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_provider_threads
            WHERE (thread_id = ${threadId} AND status = 'active')
              OR provider_thread_id IN (SELECT value FROM json_each(${cohortProviderThreadIds}))
              OR owner_node_id IN (SELECT value FROM json_each(${cohortNodeIds}))
              OR (thread_id = ${threadId}
                AND provider_thread_id = ${latestTodoList?.provider_thread_id ?? null})
            ORDER BY COALESCE(first_run_ordinal, 0), provider_thread_id ASC
          `,
        (fields !== undefined && !fields.includes("providerTurns")) ||
        (window === undefined &&
          matchesNothing(
            filter?.providerTurnIds,
            filter?.providerTurnAttemptIds,
            filter?.providerTurnThreadIds,
          ))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_provider_turns
            WHERE ${threadColumn(filter?.providerTurnIds ?? filter?.providerTurnAttemptIds)} = ${threadId}
              ${filter?.providerTurnIds === undefined ? sql`` : sql`AND provider_turn_id IN (SELECT value FROM json_each(${encodeIdList(filter.providerTurnIds)}))`}
              ${
                recentRunIds === null
                  ? sql``
                  : sql`AND run_attempt_id IN (
                      SELECT attempt_id FROM orchestration_v2_projection_run_attempts
                      WHERE thread_id = ${threadId} ${inRecentRuns("run_id")})`
              }
              ${filter?.providerTurnAttemptIds === undefined ? sql`` : sql`AND run_attempt_id IN (SELECT value FROM json_each(${encodeIdList(filter.providerTurnAttemptIds)}))`}
              ${filter?.providerTurnThreadIds === undefined ? sql`` : sql`AND provider_thread_id IN (SELECT value FROM json_each(${encodeIdList(filter.providerTurnThreadIds)}))`}
              ${
                filter?.latestProviderTurnUsageOnly === true
                  ? sql`AND json_extract(payload_json, '$.tokenUsage') IS NOT NULL
            ORDER BY julianday(json_extract(payload_json, '$.tokenUsage.updatedAt')) DESC,
              provider_thread_id ASC, ordinal ASC
            LIMIT 1`
                  : sql`ORDER BY provider_thread_id ASC, ordinal ASC`
              }
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_provider_turns
            WHERE thread_id = ${threadId}
              AND (status IN ('starting','running','waiting')
                OR provider_turn_id IN (SELECT value FROM json_each(${cohortProviderTurnIds}))
                OR node_id IN (SELECT value FROM json_each(${cohortNodeIds})))
            ORDER BY provider_thread_id ASC, ordinal ASC
          `,
        (fields !== undefined && !fields.includes("runtimeRequests")) ||
        (window === undefined && matchesNothing(filter?.runtimeRequestStatuses))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_runtime_requests
            WHERE thread_id = ${threadId}
              ${filter?.runtimeRequestStatuses === undefined ? sql`` : sql`AND status IN (SELECT value FROM json_each(${encodeIdList(filter.runtimeRequestStatuses)}))`}
            ORDER BY created_at ASC, runtime_request_id ASC
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_runtime_requests
            WHERE thread_id = ${threadId}
              AND (status IN ('pending','waiting')
                OR node_id IN (SELECT value FROM json_each(${cohortNodeIds}))
                OR provider_turn_id IN (SELECT value FROM json_each(${cohortProviderTurnIds})))
            ORDER BY created_at ASC, runtime_request_id ASC
          `,
        (fields !== undefined && !fields.includes("messages")) ||
        (window === undefined &&
          matchesNothing(filter?.messageIds, filter?.messageRoles, filter?.messageRunIds))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
                SELECT payload_json FROM orchestration_v2_projection_messages
                ${recentRunIndex("messages_run_idx")}
                WHERE ${recentRunIds === null ? threadColumn(filter?.messageIds) : sql.literal("thread_id")} = ${threadId}
                  ${inRecentRuns("run_id")}
                  ${filter?.messageIds === undefined ? sql`` : sql`AND message_id IN (SELECT value FROM json_each(${encodeIdList(filter.messageIds)}))`}
                  ${filter?.messageRoles === undefined ? sql`` : sql`AND role IN (SELECT value FROM json_each(${encodeIdList(filter.messageRoles)}))`}
                  ${filter?.monitorNotificationsOnly === true ? sql`AND json_extract(payload_json, '$.notification.source.kind') = 'monitor'` : sql``}
                  ${filter?.delegatedTaskMessagesOnly === true ? sql`AND ${sql.literal(DELEGATED_TASK_MESSAGE_CONDITION)}` : sql``}
                  ${filter?.messageRunIds === undefined ? sql`` : sql`AND run_id IN (SELECT value FROM json_each(${encodeIdList(filter.messageRunIds)}))`}
                ORDER BY created_at ASC, message_id ASC
              `
            : sql<PayloadRow>`
                -- Look the window's messages up by key and the live runs' by run. One filter
                -- over the thread reads every message the thread ever had.
                SELECT payload_json FROM (
                  SELECT message.payload_json, message.created_at, message.message_id
                  FROM json_each(${cohortMessageIds}) AS wanted
                  CROSS JOIN orchestration_v2_projection_messages AS message
                    ON message.message_id = wanted.value
                  WHERE message.thread_id = ${threadId}
                  UNION
                  SELECT message.payload_json, message.created_at, message.message_id
                  FROM orchestration_v2_projection_runs AS run
                  CROSS JOIN orchestration_v2_projection_messages AS message
                    ON message.run_id = run.run_id
                  WHERE run.thread_id = ${threadId}
                    AND run.status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                    AND message.thread_id = ${threadId}
                )
                ORDER BY created_at ASC, message_id ASC
              `,
        fields !== undefined && !fields.includes("plans")
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
                SELECT payload_json FROM orchestration_v2_projection_plans
                WHERE thread_id = ${threadId} ORDER BY plan_id ASC
              `
            : sql<PayloadRow>`
                SELECT payload_json FROM orchestration_v2_projection_plans AS plan
                WHERE plan.thread_id = ${threadId}
                  AND (
                    (plan.status = 'active' AND NOT ${todoListOfSettledRun(sql`plan`)})
                    OR plan.plan_id = ${latestTodoList?.plan_id ?? null}
                    OR plan.plan_id IN (
                      SELECT value FROM json_each(${cohortPlanIds})
                    )
                  )
                -- Keep the selected artifact last within its run for equal-run consumers.
                ORDER BY CASE WHEN plan_id = ${latestTodoList?.plan_id ?? null}
                  THEN ${latestTodoList?.last_plan_id ?? null} ELSE plan_id END ASC,
                  plan_id = ${latestTodoList?.plan_id ?? null} ASC
              `,
        fields !== undefined && !fields.includes("checkpointScopes")
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_checkpoint_scopes
            WHERE thread_id = ${threadId}
            ORDER BY ordinal_within_parent ASC, scope_id ASC
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_checkpoint_scopes
            WHERE thread_id = ${threadId}
              AND (run_id IN (SELECT value FROM json_each(${cohortRunIds}))
                OR node_id IN (SELECT value FROM json_each(${cohortNodeIds}))
                -- A repository scope names the run that first used it; every later run's
                -- checkpoints still need its label.
                OR kind = 'manual')
            ORDER BY ordinal_within_parent ASC, scope_id ASC
          `,
        (fields !== undefined && !fields.includes("checkpoints")) ||
        (window === undefined && matchesNothing(filter?.checkpointIds))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_checkpoints
            WHERE ${threadColumn(filter?.checkpointIds)} = ${threadId}
              ${filter?.checkpointIds === undefined ? sql`` : sql`AND checkpoint_id IN (SELECT value FROM json_each(${encodeIdList(filter.checkpointIds)}))`}
            ORDER BY scope_id ASC, ordinal_within_scope ASC
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_checkpoints
            WHERE thread_id = ${threadId}
              AND (status IN ('pending','capturing')
                OR (run_id IS NULL AND ordinal_within_scope = 0 AND status = 'ready')
                -- The diff of the last finished turn stays in reach while a long run is at work.
                OR checkpoint_id = (
                  SELECT checkpoint_id FROM orchestration_v2_projection_checkpoints
                  WHERE thread_id = ${threadId} AND status = 'ready'
                    AND app_run_ordinal IS NOT NULL
                  ORDER BY app_run_ordinal DESC LIMIT 1
                )
                OR checkpoint_id IN (SELECT value FROM json_each(${cohortCheckpointIds}))
                OR run_id IN (SELECT value FROM json_each(${cohortRunIds}))
                OR node_id IN (SELECT value FROM json_each(${cohortNodeIds})))
            ORDER BY scope_id ASC, ordinal_within_scope ASC
          `,
        fields !== undefined && !fields.includes("contextHandoffs")
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
                SELECT payload_json FROM orchestration_v2_projection_context_handoffs
                WHERE thread_id = ${threadId} ORDER BY rowid ASC
              `
            : sql<PayloadRow>`
                -- Megabytes on a long thread, and projectContextHandoffForWire drops both.
                SELECT json_remove(payload_json, '$.history', '$.delivery') AS payload_json
                FROM orchestration_v2_projection_context_handoffs AS handoff
                WHERE handoff.thread_id = ${threadId}
                  AND (
                    handoff.status IN ('pending', 'ready')
                    OR handoff.context_handoff_id IN (
                      SELECT value FROM json_each(${cohortHandoffIds})
                    )
                  )
                ORDER BY rowid ASC
              `,
        (fields !== undefined && !fields.includes("contextTransfers")) ||
        (window === undefined && matchesNothing(filter?.contextTransferStatuses))
          ? Effect.succeed([])
          : window === undefined
            ? sql<PayloadRow>`
            SELECT payload_json
            FROM orchestration_v2_projection_context_transfers
            WHERE ${
              filter?.contextTransferStatuses === undefined
                ? sql`(source_thread_id = ${threadId} OR target_thread_id = ${threadId})`
                : // Each side seeks its (thread, status) index. One OR over both sides checks the
                  // status on every row the thread ever sent or received.
                  sql`rowid IN (
                    SELECT rowid FROM orchestration_v2_projection_context_transfers
                    WHERE source_thread_id = ${threadId}
                      AND status IN (SELECT value FROM json_each(${encodeIdList(filter.contextTransferStatuses)}))
                    UNION
                    SELECT rowid FROM orchestration_v2_projection_context_transfers
                    WHERE target_thread_id = ${threadId}
                      AND status IN (SELECT value FROM json_each(${encodeIdList(filter.contextTransferStatuses)}))
                  )`
            }
            ORDER BY rowid ASC
          `
            : sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_context_transfers
            WHERE (source_thread_id = ${threadId} OR target_thread_id = ${threadId})
              AND (status IN ('pending','running','waiting')
                OR target_run_id IN (SELECT value FROM json_each(${cohortRunIds}))
                OR json_extract(payload_json, '$.contextHandoffId') IN
                  (SELECT value FROM json_each(${cohortHandoffIds})))
            ORDER BY rowid ASC
          `,
      ]);

      const [
        runs,
        attempts,
        nodes,
        subagents,
        providerSessions,
        providerThreads,
        providerTurns,
        runtimeRequests,
        messages,
        plans,
        checkpointScopes,
        checkpoints,
        contextHandoffs,
        contextTransfers,
      ] = yield* Effect.all([
        decodeRows(decodeRunPayload, threadId)(runRows),
        decodeRows(decodeRunAttemptPayload, threadId)(attemptRows),
        decodeRows(decodeNodePayload, threadId)(nodeRows),
        decodeRows(decodeSubagentPayload, threadId)(subagentRows),
        decodeRows(decodeProviderSessionPayload, threadId)(providerSessionRows),
        decodeRows(decodeProviderThreadPayload, threadId)(providerThreadRows),
        decodeRows(decodeProviderTurnPayload, threadId)(providerTurnRows),
        decodeRows(decodeRuntimeRequestPayload, threadId)(runtimeRequestRows),
        decodeRows(decodeMessagePayload, threadId)(messageRows),
        decodeRows(decodePlanJson, threadId)(planRows),
        decodeRows(decodeCheckpointScopePayload, threadId)(checkpointScopeRows),
        decodeRows(decodeCheckpointPayload, threadId)(checkpointRows),
        decodeRows(decodeContextHandoffPayload, threadId)(contextHandoffRows),
        decodeRows(decodeContextTransferPayload, threadId)(contextTransferRows),
      ]);
      const turnItems =
        promptRuns === null || (fields !== undefined && !fields.includes("turnItems"))
          ? storedTurnItems
          : yield* commandTurnItems(threadId, runs, promptRuns);
      const messageOrdinals = new Map<string, number>();
      // Only user items can name a user message, so a user-only read needs no assistant items.
      const userOnly = messages.every((message) => message.role === "user");
      // The loaded items already order the messages when they hold every item the lookup reads.
      const loadsEveryItemOf = (type: OrchestrationV2TurnItem["type"]) =>
        window === undefined &&
        promptRuns === null &&
        (fields === undefined || fields.includes("turnItems")) &&
        filter?.turnItemRequestIds === undefined &&
        filter?.turnItemStatuses === undefined &&
        filter?.turnItemRunId === undefined &&
        filter?.turnItemRunIds === undefined &&
        filter?.turnItemNodeIds === undefined &&
        (filter?.turnItemTypes === undefined || filter.turnItemTypes.includes(type));
      if (
        fields !== undefined &&
        fields.includes("messages") &&
        messages.length > 1 &&
        !(loadsEveryItemOf("user_message") && (userOnly || loadsEveryItemOf("assistant_message")))
      ) {
        // Broad role reads keep the original query to avoid per-ID lookup overhead.
        const loadedMessageIds =
          filter?.messageIds === undefined &&
          filter?.messageRunIds === undefined &&
          (filter?.messageRoles === undefined ||
            (filter.messageRoles.includes("user") && filter.messageRoles.includes("assistant")))
            ? undefined
            : messages.map((message) => message.id);
        // Migration 94 indexes exactly this expression, type list and json_valid term: changing
        // any, even the IN order, silently drops the index. ProjectionStore.test.ts asserts the plan.
        const rows = yield* sql<{ message_id: string; ordinal: number }>`
            SELECT json_extract(payload_json, '$.messageId') AS message_id, MIN(ordinal) AS ordinal
            FROM orchestration_v2_projection_turn_items
            WHERE thread_id = ${threadId} AND type IN ('user_message', 'assistant_message')
              AND json_valid(payload_json)
              ${loadedMessageIds === undefined ? sql`` : sql`AND json_extract(payload_json, '$.messageId') IN (SELECT value FROM json_each(${encodeIdList(loadedMessageIds)}))`}
            GROUP BY json_extract(payload_json, '$.messageId')
          `;
        for (const row of rows) messageOrdinals.set(row.message_id, row.ordinal);
      }
      const orderedMessages = sortMessagesByTurnItemOrder(messages, turnItems, messageOrdinals);
      const projection = {
        thread,
        runs,
        attempts,
        nodes,
        subagents,
        providerSessions,
        providerThreads,
        providerTurns,
        runtimeRequests,
        messages: orderedMessages,
        plans,
        turnItems,
        checkpointScopes,
        checkpoints,
        contextHandoffs,
        contextTransfers,
        visibleTurnItems: [],
        updatedAt: thread.updatedAt,
      } satisfies OrchestrationV2ThreadProjection;
      return projection;
    },
    (effect, threadId, _window?, _fields?, _filter?) =>
      effect.pipe(
        Effect.mapError((cause) =>
          isProjectionStoreThreadNotFoundError(cause)
            ? cause
            : new ProjectionStoreReadError({
                threadId,
                cause,
              }),
        ),
      ),
  );
