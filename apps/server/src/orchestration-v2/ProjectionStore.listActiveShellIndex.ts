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

import type { ActiveShellIndexEntry } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindListActiveShellIndex = (ctx: any) =>
  Effect.fn("ProjectionStore.listActiveShellIndex")(function* () {
    const { shellIndexLineage, shellSnapshotReadError, sql, PENDING_ITEMS_INDEX, indexedField } =
      ctx;

    const rows = yield* sql<{
      readonly thread_id: string;
      readonly project_id: string;
      readonly relationship_to_parent: string | null;
      readonly parent_thread_id: string | null;
      readonly root_thread_id: string;
      readonly side_chat: number | null;
      readonly settled_override: string | null;
      readonly settled_at: string | null;
      readonly pinned_at: string | null;
      readonly pin_order_key: string | null;
      readonly snoozed_until: string | null;
      readonly may_be_live: number;
      readonly has_remote_tasks: number;
    }>`
        SELECT
          t.thread_id,
          t.project_id,
          ${indexedField("$.lineage.relationshipToParent")} AS relationship_to_parent,
          ${indexedField("$.lineage.parentThreadId")} AS parent_thread_id,
          ${indexedField("$.lineage.rootThreadId")} AS root_thread_id,
          ${indexedField("$.lineage.sideChat")} AS side_chat,
          ${indexedField("$.settledOverride")} AS settled_override,
          ${indexedField("$.settledAt")} AS settled_at,
          ${indexedField("$.pinnedAt")} AS pinned_at,
          ${indexedField("$.pinOrderKey")} AS pin_order_key,
          ${indexedField("$.snoozedUntil")} AS snoozed_until,
          -- A superset of isLiveSubagentShell: the sources of its run status, pending request,
          -- and pending background work. Each source is one list for the whole read, found
          -- through its partial index, so finished threads cost no lookups.
          (
            t.thread_id IN (
              SELECT r.thread_id FROM orchestration_v2_projection_runs r
              WHERE r.status IN ('queued', 'preparing', 'starting', 'running', 'waiting')
            )
            OR t.thread_id IN (
              SELECT request.thread_id FROM orchestration_v2_projection_runtime_requests request
              WHERE request.status = 'pending'
            )
            -- Same predicates as the shell's pending item and link reads, for their partial indexes.
            OR t.thread_id IN (
              SELECT item.thread_id
              FROM orchestration_v2_projection_turn_items item ${PENDING_ITEMS_INDEX}
              WHERE item.type IN ('command_execution', 'dynamic_tool', 'subagent')
                AND item.status NOT IN ('completed', 'interrupted', 'failed', 'cancelled')
            )
            OR t.thread_id IN (
              SELECT link_request.thread_id FROM orchestration_v2_projection_turn_items link_request
              WHERE link_request.type = 'link_request' AND link_request.status = 'waiting'
            )
            OR t.thread_id IN (
              SELECT provider_thread.thread_id
              FROM orchestration_v2_projection_provider_threads provider_thread
              WHERE CASE WHEN json_valid(provider_thread.payload_json)
                THEN json_array_length(provider_thread.payload_json, '$.pendingBackgroundTasks') > 0
                ELSE 0 END
            )
            -- Only a thread with a pull request link reads its payload. CASE, not AND: SQLite
            -- 3.50 evaluates both AND operands here.
            OR CASE WHEN ${indexedField("$.pullRequests[0]", "json_type")} IS NOT NULL
              THEN EXISTS (
                SELECT 1 FROM json_each(t.payload_json, '$.pullRequests') link
                WHERE json_type(link.value, '$.watch') IS NOT NULL
              )
              ELSE 0 END
          ) AS may_be_live,
          -- One list for the whole read, found through the child_thread_id index. A lookup per
          -- thread would parse the payload of every subagent row.
          t.thread_id IN (
            SELECT subagent.thread_id FROM orchestration_v2_projection_subagents subagent
            WHERE subagent.origin = 'app_owned'
              AND subagent.child_thread_id IS NULL
              AND json_type(subagent.payload_json, '$.remoteChild') = 'object'
          ) AS has_remote_tasks
        FROM orchestration_v2_projection_threads t
        WHERE t.deleted_at IS NULL
          AND t.archived_at IS NULL
        ORDER BY t.updated_at ASC, t.thread_id ASC
      `;
    return rows.map((row): ActiveShellIndexEntry => ({
      id: ThreadId.make(row.thread_id),
      projectId: ProjectId.make(row.project_id),
      lineage: shellIndexLineage(row),
      settledOverride:
        row.settled_override === "settled" || row.settled_override === "active"
          ? row.settled_override
          : null,
      settledAt: row.settled_at === null ? null : DateTime.makeUnsafe(row.settled_at),
      pinnedAt: row.pinned_at === null ? null : DateTime.makeUnsafe(row.pinned_at),
      pinOrderKey: row.pin_order_key,
      snoozedUntil: row.snoozed_until === null ? null : DateTime.makeUnsafe(row.snoozed_until),
      mayBeLive: row.may_be_live === 1,
      hasRemoteTasks: row.has_remote_tasks === 1,
    }));
  }, Effect.mapError(shellSnapshotReadError));
