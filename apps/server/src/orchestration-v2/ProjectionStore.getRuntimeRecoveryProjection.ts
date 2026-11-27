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

import type { PayloadRow, ProjectionRuntimeRecoveryState } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetRuntimeRecoveryProjection = (ctx: any) => {
  const { isProjectionStoreThreadNotFoundError, ProjectionStoreReadError } =
    pickScriptcBindCtx(ctx);
  return Effect.fn("ProjectionStore.getRuntimeRecoveryProjection")(
    function* (threadId) {
      const {
        ProjectionStoreReadError,
        ProjectionStoreThreadNotFoundError,
        decodeMessagePayload,
        decodeNodePayload,
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
        isProjectionStoreThreadNotFoundError,
        sql,
        LIVE_NODES_INDEX,
      } = pickScriptcBindCtx(ctx);

      const threadRows = yield* sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_threads
            WHERE thread_id = ${threadId}
          `;
      if (threadRows[0] === undefined) {
        return yield* new ProjectionStoreThreadNotFoundError({ threadId });
      }
      const thread = yield* decodeThreadPayload(threadRows[0].payload_json);
      // One worker round trip and one SQLite snapshot; decisions still read after the prior commit.
      const queries = {
        runs: sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_runs AS run
              WHERE run.thread_id = ${threadId}
                AND (
                  run.status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                  OR run.run_id = (
                    SELECT latest.run_id FROM orchestration_v2_projection_runs AS latest
                    WHERE latest.thread_id = ${threadId}
                    ORDER BY latest.ordinal DESC LIMIT 1
                  )
                  -- Retain the latest ended run for each provider thread with lost
                  -- background work, including owners used before a handoff. An
                  -- unfinished run is read above and may prove never started.
                  OR run.run_id IN (
                    SELECT (
                      SELECT ended.run_id FROM orchestration_v2_projection_runs AS ended
                      WHERE ended.thread_id = ${threadId}
                        AND ended.provider_thread_id = roster.provider_thread_id
                        AND ended.status NOT IN (
                          'queued', 'preparing', 'starting', 'running', 'waiting', 'rolled_back'
                        )
                        -- A run that never started (see neverStarted) owns no work.
                        AND NOT (
                          json_type(ended.payload_json, '$.startedAt') = 'null'
                          AND json_type(ended.payload_json, '$.restartContinuationOfRunId') IS NULL
                        )
                      ORDER BY ended.completed_at IS NULL DESC, ended.completed_at DESC,
                        ended.ordinal DESC
                      LIMIT 1
                    )
                    FROM orchestration_v2_projection_provider_threads AS roster
                    WHERE roster.thread_id = ${threadId}
                      AND CASE WHEN json_valid(roster.payload_json)
                        THEN json_array_length(roster.payload_json, '$.pendingBackgroundTasks') > 0
                        ELSE 0 END
                  )
                  OR run.run_id IN (
                    SELECT item.run_id FROM orchestration_v2_projection_turn_items AS item
                    WHERE item.thread_id = ${threadId}
                      AND item.type IN ('command_execution', 'dynamic_tool', 'subagent')
                      AND item.status IN ('pending', 'running', 'waiting')
                      AND item.run_id IS NOT NULL
                  )
                )
              ORDER BY run.ordinal ASC
            `,
        attempts: sql<PayloadRow>`
              SELECT attempt.payload_json
              FROM orchestration_v2_projection_run_attempts AS attempt
              WHERE attempt.thread_id = ${threadId}
                AND attempt.run_id IN (
                  SELECT run_id FROM orchestration_v2_projection_runs
                  WHERE thread_id = ${threadId}
                    AND status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                )
              ORDER BY attempt.run_id ASC, attempt.attempt_ordinal ASC
            `,
        nodes: sql<PayloadRow>`
              SELECT node.payload_json FROM orchestration_v2_projection_nodes AS node
                ${LIVE_NODES_INDEX}
              WHERE node.thread_id = ${threadId}
                AND node.status IN ('pending', 'starting', 'running', 'waiting')
                AND (
                  (node.run_id IS NULL AND node.kind = 'root_turn')
                  OR node.node_id IN (
                    SELECT node_id FROM orchestration_v2_projection_runtime_requests
                    WHERE thread_id = ${threadId} AND status = 'pending' AND kind = 'user_input'
                  )
                  OR node.run_id IN (
                    SELECT run_id FROM orchestration_v2_projection_runs
                    WHERE thread_id = ${threadId}
                      AND status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                  )
                  OR node.node_id IN (
                    SELECT item.node_id FROM orchestration_v2_projection_turn_items AS item
                    WHERE item.thread_id = ${threadId}
                      AND item.type IN ('command_execution', 'dynamic_tool', 'subagent')
                      AND item.status IN ('pending', 'running', 'waiting')
                  )
                  OR node.node_id IN (
                    SELECT json_extract(item.payload_json, '$.subagentId')
                    FROM orchestration_v2_projection_turn_items AS item
                    WHERE item.thread_id = ${threadId} AND item.type = 'subagent'
                      AND item.status IN ('pending', 'running', 'waiting')
                  )
                  OR node.node_id IN (
                    SELECT subagent_id FROM orchestration_v2_projection_subagents
                    WHERE thread_id = ${threadId} AND origin = 'provider_native'
                      AND status IN ('pending', 'running', 'waiting')
                  )
                )
              ORDER BY COALESCE(node.started_at, ''), node.node_id ASC
            `,
        subagents: sql<PayloadRow>`
              SELECT subagent.payload_json FROM orchestration_v2_projection_subagents AS subagent
              WHERE subagent.thread_id = ${threadId}
                AND subagent.status IN ('pending', 'starting', 'running', 'waiting')
                AND (
                  subagent.origin = 'provider_native'
                  OR subagent.run_id IN (
                    SELECT run_id FROM orchestration_v2_projection_runs
                    WHERE thread_id = ${threadId}
                      AND status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                  )
                  OR subagent.subagent_id IN (
                    SELECT json_extract(item.payload_json, '$.subagentId')
                    FROM orchestration_v2_projection_turn_items AS item
                    WHERE item.thread_id = ${threadId} AND item.type = 'subagent'
                      AND item.status IN ('pending', 'running', 'waiting')
                  )
                )
              ORDER BY COALESCE(subagent.started_at, ''), subagent.subagent_id ASC
            `,
        providerSessions: sql<PayloadRow>`
              SELECT session.payload_json
              FROM orchestration_v2_projection_provider_sessions AS session
              WHERE (
                  session.provider_session_id IN (
                    SELECT binding.provider_session_id
                    FROM orchestration_v2_projection_provider_session_bindings AS binding
                    WHERE binding.thread_id = ${threadId}
                  )
                  AND (
                    session.status NOT IN ('stopped', 'error')
                    OR (session.status = 'error' AND CASE WHEN json_valid(session.payload_json)
                      THEN json_array_length(session.payload_json, '$.extensionStatuses') > 0
                      ELSE 0 END)
                    OR session.provider_session_id IN (
                      SELECT provider_thread.provider_session_id
                      FROM orchestration_v2_projection_provider_threads AS provider_thread
                      WHERE provider_thread.provider_thread_id IN (
                        SELECT run.provider_thread_id
                        FROM orchestration_v2_projection_runs AS run
                        WHERE run.thread_id = ${threadId}
                          AND run.status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                      )
                    )
                  )
                )
                -- This thread detached it, which keeps its status. Its process
                -- did not outlive the server either, so recovery stops it.
                OR (
                  session.thread_id = ${threadId}
                  AND session.status NOT IN ('stopped', 'error')
                  AND NOT EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_provider_session_bindings AS binding
                    WHERE binding.provider_session_id = session.provider_session_id
                  )
                )
              ORDER BY session.updated_at ASC, session.provider_session_id ASC
            `,
        providerThreads: sql<PayloadRow>`
              SELECT provider_thread.payload_json
              FROM orchestration_v2_projection_provider_threads AS provider_thread
              WHERE provider_thread.provider_thread_id IN (
                  SELECT provider_thread_id FROM orchestration_v2_projection_provider_threads
                  WHERE thread_id = ${threadId}
                  UNION
                  -- Start with non-null owners; a thread can have a large settled node history.
                  SELECT owned.provider_thread_id
                  FROM orchestration_v2_projection_provider_threads AS owned
                    INDEXED BY orchestration_v2_projection_provider_threads_owner_idx
                  CROSS JOIN orchestration_v2_projection_nodes AS owner
                    ON owner.node_id = owned.owner_node_id
                  WHERE owned.owner_node_id IS NOT NULL AND owner.thread_id = ${threadId}
                  UNION
                  SELECT provider_thread_id FROM orchestration_v2_projection_subagents
                  WHERE thread_id = ${threadId} AND provider_thread_id IS NOT NULL
                    AND origin = 'provider_native'
                )
                AND (
                  provider_thread.status = 'active'
                  OR CASE WHEN json_valid(provider_thread.payload_json)
                    THEN json_array_length(provider_thread.payload_json, '$.pendingBackgroundTasks') > 0
                    ELSE 0 END
                  OR provider_thread.provider_thread_id IN (
                    SELECT run.provider_thread_id FROM orchestration_v2_projection_runs AS run
                    WHERE run.thread_id = ${threadId}
                      AND run.status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                  )
                  OR provider_thread.provider_thread_id IN (
                    SELECT item.provider_thread_id
                    FROM orchestration_v2_projection_turn_items AS item
                    WHERE item.thread_id = ${threadId}
                      AND item.status IN ('pending', 'running', 'waiting')
                  )
                  -- A native subagent's item names its own provider thread; the
                  -- run that waits on it (see awaitingProviderThreadId) is woken.
                  OR provider_thread.provider_thread_id IN (
                    SELECT run.provider_thread_id
                    FROM orchestration_v2_projection_turn_items AS item
                    JOIN orchestration_v2_projection_runs AS run ON run.run_id = item.run_id
                    WHERE item.thread_id = ${threadId}
                      AND item.status IN ('pending', 'running', 'waiting')
                  )
                )
              ORDER BY COALESCE(provider_thread.first_run_ordinal, 0), provider_thread.provider_thread_id ASC
            `,
        providerTurns: sql<PayloadRow>`
              SELECT provider_turn.payload_json
              FROM orchestration_v2_projection_provider_turns AS provider_turn
              WHERE provider_turn.thread_id = ${threadId}
                AND provider_turn.status IN ('pending', 'starting', 'running', 'waiting')
                AND (
                  provider_turn.run_attempt_id IN (
                    SELECT attempt_id FROM orchestration_v2_projection_run_attempts
                    WHERE thread_id = ${threadId}
                      AND run_id IN (
                        SELECT run_id FROM orchestration_v2_projection_runs
                        WHERE thread_id = ${threadId}
                          AND status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                      )
                  )
                  OR (
                    provider_turn.run_attempt_id IS NULL
                    AND provider_turn.node_id IN (
                      SELECT node_id FROM orchestration_v2_projection_nodes
                      WHERE thread_id = ${threadId}
                        AND run_id IS NULL
                        AND kind = 'root_turn'
                        AND status IN ('pending', 'running', 'waiting')
                    )
                  )
                )
              ORDER BY provider_turn.provider_thread_id ASC, provider_turn.ordinal ASC
            `,
        runtimeRequests: sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_runtime_requests
              WHERE thread_id = ${threadId} AND status = 'pending'
              ORDER BY created_at ASC, runtime_request_id ASC
            `,
        // CROSS JOIN keeps empty run cohorts out of message history; the run index bounds each lookup.
        messages: sql<PayloadRow>`
              SELECT message.payload_json FROM orchestration_v2_projection_runs AS message_run
              CROSS JOIN orchestration_v2_projection_messages AS message
                INDEXED BY orchestration_v2_projection_messages_run_idx ON message.run_id = message_run.run_id
              WHERE message_run.thread_id = ${threadId}
                AND message_run.status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                AND message.thread_id = ${threadId} AND message.streaming = 1
              ORDER BY message.created_at ASC, message.message_id ASC
            `,
        turnItems: sql<PayloadRow>`
              SELECT item.payload_json FROM orchestration_v2_projection_turn_items AS item
              WHERE item.thread_id = ${threadId}
                AND item.status IN ('pending', 'running', 'waiting')
                AND (
                  item.run_id IN (
                    SELECT run_id FROM orchestration_v2_projection_runs
                    WHERE thread_id = ${threadId}
                      AND status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
                  )
                  OR item.type IN ('command_execution', 'dynamic_tool', 'subagent')
                  OR (
                    item.type = 'user_input_request'
                    AND json_extract(item.payload_json, '$.requestId') IN (
                      SELECT runtime_request_id FROM orchestration_v2_projection_runtime_requests
                      WHERE thread_id = ${threadId} AND status = 'pending' AND kind = 'user_input'
                    )
                  )
                  OR (
                    item.run_id IS NULL
                    AND item.node_id IN (
                      SELECT node_id FROM orchestration_v2_projection_nodes
                      WHERE thread_id = ${threadId}
                        AND run_id IS NULL
                        AND kind = 'root_turn'
                        AND status IN ('pending', 'running', 'waiting')
                    )
                  )
                )
              ORDER BY item.ordinal ASC, item.turn_item_id ASC
            `,
      };
      const sections = Object.entries(queries).map(
        ([section, query]) => sql`
              SELECT ${section} AS section, payload_json, row_number() OVER () AS position
              FROM (${query})
            `,
      );
      const rows = yield* sql<PayloadRow & { readonly section: string }>`
            ${sql.join(" UNION ALL ", false)(sections)}
            ORDER BY section, position
          `;
      const readRows = (section: keyof typeof queries) =>
        rows.filter((row) => row.section === section);
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
        turnItems,
      ] = yield* Effect.all([
        decodeRows(decodeRunPayload, threadId)(readRows("runs")),
        decodeRows(decodeRunAttemptPayload, threadId)(readRows("attempts")),
        decodeRows(decodeNodePayload, threadId)(readRows("nodes")),
        decodeRows(decodeSubagentPayload, threadId)(readRows("subagents")),
        decodeRows(decodeProviderSessionPayload, threadId)(readRows("providerSessions")),
        decodeRows(decodeProviderThreadPayload, threadId)(readRows("providerThreads")),
        decodeRows(decodeProviderTurnPayload, threadId)(readRows("providerTurns")),
        decodeRows(decodeRuntimeRequestPayload, threadId)(readRows("runtimeRequests")),
        decodeRows(decodeMessagePayload, threadId)(readRows("messages")),
        decodeRows(decodeTurnItemPayload, threadId)(readRows("turnItems")),
      ]);
      return {
        thread,
        runs,
        attempts,
        nodes,
        subagents,
        providerSessions,
        providerThreads,
        providerTurns,
        runtimeRequests,
        messages,
        turnItems,
      } satisfies ProjectionRuntimeRecoveryState;
    },
    (effect, threadId) =>
      effect.pipe(
        Effect.mapError((cause) =>
          isProjectionStoreThreadNotFoundError(cause)
            ? cause
            : new ProjectionStoreReadError({ threadId, cause }),
        ),
      ),
  );
};
