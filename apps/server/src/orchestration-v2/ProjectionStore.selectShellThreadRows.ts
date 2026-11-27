// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ProjectionStore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
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

import type { ShellSnapshotOptions, ShellThreadRow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindSelectShellThreadRows = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      sql,
      encodeIdList,
      isBackgroundWakeShellRun,
      isIdleCompactionMessage,
      isSilentShellRun,
      presentedShellRunId,
    } = ctx;
    const __fn = (
      threadId?: ThreadId,
      {
        location,
        projectId,
        unsettledOnly = false,
        familyOf,
        worktreePath,
        threadIds,
        listedOnly = false,
        includeDeleted = false,
      }: ShellSnapshotOptions & {
        readonly listedOnly?: boolean;
        // A retained fork still shows the history of a deleted source run.
        readonly includeDeleted?: boolean;
      } = {},
    ) =>
      sql<ShellThreadRow>`
            SELECT
              t.thread_id,
              t.payload_json,
              t.fork_run_ids_json,
              CASE
                WHEN json_extract(t.payload_json, '$.forkedFrom.type') = 'run'
                  AND json_extract(t.payload_json, '$.lineage.sideChat') IS NOT 1
                  THEN json_extract(t.payload_json, '$.forkedFrom.threadId')
                ELSE NULL
              END AS forked_from_run_source_thread_id,
              json_extract(t.payload_json, '$.worktreePath') AS worktree_path,
              presented.run_id AS latest_run_id,
              presented.status AS latest_run_status,
              presented.requested_at AS latest_run_requested_at,
              json_extract(presented.payload_json, '$.startedAt') AS latest_run_started_at,
              presented.completed_at AS latest_run_completed_at,
              EXISTS (
                SELECT 1 FROM orchestration_v2_projection_turn_items stop_request
                WHERE stop_request.thread_id = t.thread_id AND stop_request.run_id = presented.run_id
                  AND stop_request.type = 'run_interrupt_request'
              ) AS latest_run_stop_requested,
              ${isBackgroundWakeShellRun("presented")} AS latest_run_background_wake,
              active.run_id AS active_run_id,
              active.status AS active_run_status,
              (
                SELECT r.status
                -- Read active runs by status. Walking the ordinal index to skip this sort
                -- reads every run of a thread with none active.
                FROM orchestration_v2_projection_runs r
                  INDEXED BY orchestration_v2_projection_runs_thread_status_idx
                WHERE r.thread_id = t.thread_id
                  AND r.status IN ('preparing', 'starting', 'running', 'waiting')
                  AND NOT ${isSilentShellRun("r")}
                ORDER BY r.ordinal DESC, r.run_id DESC
                LIMIT 1
              ) AS activity_run_status,
              (
                -- Mirrors orchestrationV2RunWorkStartedAt.
                SELECT COALESCE(
                  json_extract(r.payload_json, '$.workStartedAt'),
                  json_extract(r.payload_json, '$.startedAt'),
                  r.requested_at
                )
                FROM orchestration_v2_projection_runs r
                  INDEXED BY orchestration_v2_projection_runs_thread_status_idx
                WHERE r.thread_id = t.thread_id
                  AND r.status IN ('preparing', 'starting', 'running', 'waiting')
                  AND NOT ${isSilentShellRun("r")}
                ORDER BY r.ordinal DESC, r.run_id DESC
                LIMIT 1
              ) AS activity_run_started_at,
              (
                SELECT json_extract(session.payload_json, '$.lastError')
                -- Keep bindings outermost: one provider instance can hold every session.
                FROM orchestration_v2_projection_provider_session_bindings binding
                CROSS JOIN orchestration_v2_projection_provider_sessions session
                  ON session.provider_session_id = binding.provider_session_id
                WHERE binding.thread_id = t.thread_id
                  AND session.provider_instance_id = t.provider_instance_id
                ORDER BY session.updated_at DESC, session.provider_session_id DESC
                LIMIT 1
              ) AS last_error,
              (
                SELECT item.payload_json
                FROM orchestration_v2_projection_turn_items item
                WHERE presented.status = 'failed'
                  AND item.thread_id = t.thread_id
                  AND item.run_id = presented.run_id
                  AND item.type = 'error' AND item.status = 'failed'
                  AND item.node_id IS json_extract(presented.payload_json, '$.rootNodeId')
                ORDER BY item.updated_at DESC, item.ordinal DESC, item.turn_item_id DESC
                LIMIT 1
              ) AS terminal_failure_payload_json,
              blocked.run_id AS blocking_run_id,
              blocked.requested_at AS blocking_run_requested_at,
              json_extract(blocked.payload_json, '$.startedAt') AS blocking_run_started_at,
              blocked.completed_at AS blocking_run_completed_at,
              EXISTS (
                SELECT 1 FROM orchestration_v2_projection_turn_items stop_request
                WHERE stop_request.thread_id = t.thread_id AND stop_request.run_id = blocked.run_id
                  AND stop_request.type = 'run_interrupt_request'
              ) AS blocking_run_stop_requested,
              ${isBackgroundWakeShellRun("blocked")} AS blocking_run_background_wake,
              (
                SELECT item.payload_json
                FROM orchestration_v2_projection_turn_items item
                WHERE item.thread_id = t.thread_id
                  AND item.run_id = blocked.run_id
                  AND item.type = 'error' AND item.status = 'failed'
                  AND item.node_id IS json_extract(blocked.payload_json, '$.rootNodeId')
                ORDER BY item.updated_at DESC, item.ordinal DESC, item.turn_item_id DESC
                LIMIT 1
              ) AS blocking_failure_payload_json,
              (
                SELECT request.payload_json
                FROM orchestration_v2_projection_runtime_requests request
                WHERE request.thread_id = t.thread_id
                  AND request.status = 'pending'
                ORDER BY (request.kind = 'user_input') ASC,
                  request.created_at DESC, request.runtime_request_id DESC
                LIMIT 1
              ) AS pending_request_payload_json,
              (
                SELECT secret.payload_json
                -- Keep runs outermost so completed history is never scanned for a pending secret.
                FROM orchestration_v2_projection_runs r
                  INDEXED BY orchestration_v2_projection_runs_thread_status_idx
                CROSS JOIN orchestration_v2_projection_turn_items secret
                  INDEXED BY orchestration_v2_projection_turn_items_thread_run_idx
                WHERE r.thread_id = t.thread_id
                  AND r.status IN ('preparing', 'starting', 'running', 'waiting')
                  AND secret.thread_id = t.thread_id AND secret.run_id = r.run_id
                  AND secret.type = 'secret_request' AND secret.status = 'waiting'
                ORDER BY secret.updated_at DESC, secret.turn_item_id DESC
                LIMIT 1
              ) AS pending_secret_request_payload_json,
              (
                SELECT link.payload_json
                FROM orchestration_v2_projection_turn_items link
                  INDEXED BY orchestration_v2_projection_turn_items_waiting_link_idx
                WHERE link.thread_id = t.thread_id
                  AND link.type = 'link_request' AND link.status = 'waiting'
                ORDER BY link.updated_at DESC, link.turn_item_id DESC
                LIMIT 1
              ) AS pending_link_request_payload_json,
              (
                SELECT message.updated_at
                FROM orchestration_v2_projection_messages message
                WHERE message.thread_id = t.thread_id
                  AND message.role = 'user'
                  AND NOT ${isIdleCompactionMessage("message")}
                ORDER BY message.updated_at DESC, message.message_id DESC
                LIMIT 1
              ) AS latest_user_message_at,
              (
                SELECT message.updated_at
                FROM orchestration_v2_projection_messages message
                WHERE message.thread_id = t.thread_id
                  AND message.role = 'user'
                  AND json_extract(message.payload_json, '$.createdBy') = 'user'
                  AND NOT ${isIdleCompactionMessage("message")}
                ORDER BY message.updated_at DESC, message.message_id DESC
                LIMIT 1
              ) AS latest_user_authored_message_at,
              EXISTS (
                SELECT 1
                FROM orchestration_v2_projection_plans plan
                WHERE plan.thread_id = t.thread_id
                  AND plan.kind = 'proposed_plan'
                  AND plan.status = 'active'
              ) AS has_actionable_proposed_plan
            FROM orchestration_v2_projection_threads t
            LEFT JOIN orchestration_v2_projection_runs active ON active.run_id = (
              SELECT r.run_id
              FROM orchestration_v2_projection_runs r
                INDEXED BY orchestration_v2_projection_runs_thread_status_idx
              WHERE r.thread_id = t.thread_id
                AND r.status IN ('preparing', 'starting', 'running')
                AND NOT ${isSilentShellRun("r")}
              ORDER BY r.ordinal DESC, r.run_id DESC
              LIMIT 1
            )
            LEFT JOIN orchestration_v2_projection_runs presented
              ON presented.run_id = ${presentedShellRunId(sql.literal("t.thread_id"))}
            LEFT JOIN orchestration_v2_projection_runs blocked ON blocked.run_id = (
              SELECT candidate.run_id
              FROM orchestration_v2_projection_runs candidate
              WHERE candidate.thread_id = t.thread_id
                AND candidate.status <> 'queued'
                AND NOT (
                  candidate.status = 'cancelled'
                  AND json_extract(candidate.payload_json, '$.startedAt') IS NULL
                )
              -- latestExecutedRun: the run that ended last (runRanAfter).
              ORDER BY candidate.completed_at IS NULL DESC, candidate.completed_at DESC,
                candidate.ordinal DESC, candidate.run_id DESC
              LIMIT 1
            ) AND blocked.status = 'failed'
            WHERE ${includeDeleted ? sql`1 = 1` : sql`t.deleted_at IS NULL`}${
              listedOnly
                ? sql` AND json_extract(t.payload_json, '$.lineage.relationshipToParent') IS NOT 'subagent'
                    AND json_extract(t.payload_json, '$.lineage.sideChat') IS NOT 1`
                : sql``
            }${threadId === undefined ? sql`` : sql` AND t.thread_id = ${threadId}`}${
              projectId === undefined ? sql`` : sql` AND t.project_id = ${projectId}`
            }${
              location === "active"
                ? sql` AND t.archived_at IS NULL`
                : location === "archive"
                  ? sql` AND t.archived_at IS NOT NULL`
                  : sql``
            }${
              unsettledOnly
                ? sql` AND json_extract(t.payload_json, '$.settledAt') IS NULL AND json_extract(t.payload_json, '$.settledOverride') IS NOT 'settled'`
                : sql``
            }${
              familyOf === undefined
                ? sql``
                : sql` AND CASE WHEN json_valid(t.payload_json)
                    THEN json_extract(t.payload_json, '$.lineage.rootThreadId') END = (
                    SELECT json_extract(member.payload_json, '$.lineage.rootThreadId')
                    FROM orchestration_v2_projection_threads member
                    WHERE member.thread_id = ${familyOf}
                  )`
            }${
              worktreePath === undefined
                ? sql``
                : // Matches orchestration_v2_projection_threads_worktree_path_key_idx, so this never
                  // scans. SQLite lower() folds only ASCII: Windows paths differing only in the case
                  // of another letter are not found. readShellSnapshotRows keeps the exact comparison.
                  sql` AND CASE WHEN json_valid(t.payload_json)
                    THEN lower(rtrim(replace(trim(json_extract(t.payload_json, '$.worktreePath')), '\\', '/'), '/'))
                  END = lower(rtrim(replace(trim(${worktreePath}), '\\', '/'), '/'))`
            }${threadIds === undefined ? sql`` : sql` AND t.thread_id IN (SELECT value FROM json_each(${encodeIdList(threadIds)}))`}
            ORDER BY t.updated_at ASC, t.thread_id ASC
          `;
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
