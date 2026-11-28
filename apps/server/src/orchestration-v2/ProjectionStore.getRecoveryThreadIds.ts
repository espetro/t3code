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

import type { ProjectionRecoveryKind } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetRecoveryThreadIds = (ctx: any) =>
  Effect.fn("ProjectionStore.getRecoveryThreadIds")(
    function* (
      kind: ProjectionRecoveryKind,
      projects?: {
        readonly include?: ReadonlyArray<string>;
        readonly exclude?: ReadonlyArray<string>;
      },
    ) {
      const { ProjectionStoreSetupError, sql, LIVE_NODES_INDEX, encodeIdList } =
        pickScriptcBindCtx(ctx);

      const candidates = (() => {
        switch (kind) {
          case "queued-runs":
            return sql`
                SELECT thread_id FROM orchestration_v2_projection_runs
                WHERE status = 'queued'
                  AND NOT EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_runs AS active
                    WHERE active.thread_id = orchestration_v2_projection_runs.thread_id
                      AND active.status IN ('preparing', 'starting', 'running', 'waiting')
                  )
              `;
          case "unread-steers":
            return sql`
                SELECT item.thread_id FROM orchestration_v2_projection_turn_items AS item
                JOIN orchestration_v2_projection_runs AS run ON run.run_id = item.run_id
                WHERE item.type = 'user_message' AND item.status = 'pending'
                  AND run.status IN ('completed', 'interrupted', 'failed', 'cancelled')
                  AND CASE WHEN json_valid(item.payload_json)
                    THEN json_extract(item.payload_json, '$.inputIntent') IN ('steer', 'promoted_queued_to_steer')
                    ELSE 0 END
              `;
          case "delegated-completions":
            return sql`
                SELECT thread_id FROM orchestration_v2_projection_runs
                WHERE CASE WHEN json_valid(payload_json)
                  THEN json_type(payload_json, '$.delegatedCompletion.delivery') = 'object'
                  ELSE 0 END
              `;
          case "subagent-results":
            return sql`
                SELECT child.thread_id FROM orchestration_v2_projection_threads AS child
                WHERE CASE WHEN json_valid(child.payload_json) THEN
                  json_extract(child.payload_json, '$.lineage.relationshipToParent') = 'subagent'
                  AND json_extract(child.payload_json, '$.lineage.parentThreadId') IS NOT NULL
                  AND json_extract(child.payload_json, '$.forkedFrom.type') = 'node'
                  ELSE 0 END
                  AND (EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_runs AS requested
                    JOIN orchestration_v2_projection_subagents AS task
                      ON task.subagent_id = json_extract(requested.payload_json, '$.delegatedTaskId')
                    WHERE requested.thread_id = child.thread_id
                      AND requested.status IN ('completed', 'interrupted', 'failed', 'cancelled', 'rolled_back')
                      AND task.child_thread_id = child.thread_id
                      AND json_extract(task.payload_json, '$.origin') = 'app_owned'
                      AND json_extract(task.payload_json, '$.result') IS NULL
                  ) OR (
                    -- The original task still waits for the latest unheld work.
                    (SELECT status FROM orchestration_v2_projection_runs
                     WHERE thread_id = child.thread_id
                       AND NOT (status = 'queued' AND json_extract(payload_json, '$.queueHeld') IS 1)
                     ORDER BY ordinal DESC LIMIT 1
                    ) IN ('completed', 'interrupted', 'failed', 'cancelled', 'rolled_back')
                    AND NOT EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_context_transfers
                    WHERE source_thread_id = child.thread_id
                      AND target_thread_id = json_extract(child.payload_json, '$.lineage.parentThreadId')
                      AND type = 'subagent_result'
                  )))
              `;
          case "restart-continuations":
            return sql`
                SELECT thread_id FROM (
                  SELECT bindings.thread_id
                  FROM orchestration_v2_projection_provider_sessions AS sessions
                  JOIN orchestration_v2_projection_provider_session_bindings AS bindings
                    ON bindings.provider_session_id = sessions.provider_session_id
                  WHERE sessions.status NOT IN ('stopped', 'error')
                  UNION
                  SELECT thread_id FROM orchestration_v2_projection_provider_sessions AS sessions
                  WHERE status NOT IN ('stopped', 'error') AND thread_id IS NOT NULL
                    AND NOT EXISTS (
                      SELECT 1 FROM orchestration_v2_projection_provider_session_bindings AS bindings
                      WHERE bindings.provider_session_id = sessions.provider_session_id
                    )
                )
                -- A live session alone continues nothing: restartContinuationRun
                -- also needs an active provider thread or open background work.
                WHERE thread_id IN (
                  SELECT thread_id FROM orchestration_v2_projection_provider_threads
                  WHERE status = 'active'
                    OR CASE WHEN json_valid(payload_json)
                      THEN json_array_length(payload_json, '$.pendingBackgroundTasks') > 0
                      ELSE 0 END
                  UNION
                  SELECT thread_id FROM orchestration_v2_projection_turn_items
                  WHERE type IN ('command_execution', 'dynamic_tool', 'subagent')
                    AND status IN ('pending', 'running', 'waiting')
                )
                UNION
                SELECT thread_id FROM orchestration_v2_projection_runs
                WHERE status = 'starting'
                  AND CASE WHEN json_valid(payload_json)
                    THEN json_extract(payload_json, '$.restartContinuationOfRunId') IS NOT NULL
                    ELSE 0 END
              `;
          case "runtime":
            return sql`
                WITH pending_provider_threads AS MATERIALIZED (
                  SELECT provider_thread_id, thread_id, owner_node_id
                  FROM orchestration_v2_projection_provider_threads
                  WHERE status = 'active'
                    OR CASE WHEN json_valid(payload_json)
                      THEN json_array_length(payload_json, '$.pendingBackgroundTasks') > 0
                      ELSE 0 END
                )
                SELECT thread_id FROM orchestration_v2_projection_runs
                WHERE status IN ('preparing', 'starting', 'running', 'waiting')
                UNION
                -- A held queue already went through recovery; rereading it on
                -- every boot costs a projection read per held thread.
                SELECT thread_id FROM orchestration_v2_projection_runs
                WHERE status = 'queued'
                  AND CASE WHEN json_valid(payload_json)
                    THEN json_extract(payload_json, '$.queueHeld') IS NOT 1
                    ELSE 1 END
                UNION
                SELECT thread_id FROM orchestration_v2_projection_runtime_requests
                WHERE status = 'pending'
                UNION
                -- One bound thread stops a session; the other arms select the
                -- bound threads with work, so idle threads on a shared session stay out.
                SELECT (
                  SELECT bindings.thread_id
                  FROM orchestration_v2_projection_provider_session_bindings AS bindings
                  JOIN orchestration_v2_projection_threads AS threads
                    ON threads.thread_id = bindings.thread_id
                  WHERE bindings.provider_session_id = sessions.provider_session_id
                    AND threads.deleted_at IS NULL
                  ORDER BY bindings.thread_id LIMIT 1
                )
                FROM orchestration_v2_projection_provider_sessions AS sessions
                WHERE sessions.status NOT IN ('stopped', 'error')
                  OR (sessions.status = 'error' AND CASE WHEN json_valid(sessions.payload_json)
                    THEN json_array_length(sessions.payload_json, '$.extensionStatuses') > 0
                    ELSE 0 END)
                UNION
                -- A detach drops the binding but keeps the session's status.
                SELECT sessions.thread_id
                FROM orchestration_v2_projection_provider_sessions AS sessions
                WHERE sessions.status NOT IN ('stopped', 'error')
                  AND sessions.thread_id IS NOT NULL
                  AND NOT EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_provider_session_bindings AS bindings
                    WHERE bindings.provider_session_id = sessions.provider_session_id
                  )
                UNION
                SELECT thread_id FROM pending_provider_threads
                UNION
                SELECT nodes.thread_id FROM pending_provider_threads
                CROSS JOIN orchestration_v2_projection_nodes AS nodes
                  ON nodes.node_id = pending_provider_threads.owner_node_id
                UNION
                SELECT subagents.thread_id FROM pending_provider_threads
                CROSS JOIN orchestration_v2_projection_subagents AS subagents
                  ON subagents.provider_thread_id = pending_provider_threads.provider_thread_id
                -- A delegated task's provider thread belongs to its child thread.
                WHERE subagents.origin = 'provider_native'
                UNION
                SELECT subagents.child_thread_id FROM orchestration_v2_projection_subagents AS subagents
                WHERE subagents.child_thread_id IS NOT NULL
                  AND EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_nodes AS node
                      ${LIVE_NODES_INDEX}
                    WHERE node.thread_id = subagents.child_thread_id
                      AND node.status IN ('pending', 'starting', 'running', 'waiting')
                      AND node.run_id IS NULL
                      AND node.kind = 'root_turn'
                  )
                UNION
                -- No native subagent outlives the provider process that ran it.
                SELECT thread_id FROM orchestration_v2_projection_subagents
                WHERE origin = 'provider_native'
                  AND status IN ('pending', 'running', 'waiting')
                UNION
                SELECT item.thread_id FROM orchestration_v2_projection_turn_items AS item
                WHERE NOT EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_runs AS run
                    WHERE run.run_id = item.run_id AND run.status = 'rolled_back'
                  )
                  AND type IN ('command_execution', 'dynamic_tool', 'subagent')
                  AND status IN ('pending', 'running', 'waiting')
                UNION
                SELECT thread_id FROM orchestration_v2_effect_outbox
                WHERE status IN ('pending', 'running')
              `;
        }
      })();
      const rows = yield* sql<{ readonly thread_id: string }>`
          SELECT thread_id FROM orchestration_v2_projection_threads
          WHERE deleted_at IS NULL
            AND thread_id IN (${candidates})
            ${projects?.include === undefined ? sql`` : sql`AND project_id IN (SELECT value FROM json_each(${encodeIdList(projects.include)}))`}
            ${projects?.exclude === undefined ? sql`` : sql`AND project_id NOT IN (SELECT value FROM json_each(${encodeIdList(projects.exclude)}))`}
            ${kind === "queued-runs" ? sql`AND archived_at IS NULL` : sql``}
          ORDER BY updated_at ASC, thread_id ASC
        `;
      return rows.map((row) => ThreadId.make(row.thread_id));
    },
    Effect.mapError((cause) => new ProjectionStoreSetupError({ cause })),
  );
