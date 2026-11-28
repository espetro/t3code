// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ProjectionStore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
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

import type { ProjectionSettlementCandidate, SettlementThreadRow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetSettlementCandidates = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      ProjectionStoreSetupError,
      decodeThreadPayload,
      pendingBackgroundDataByThreadId,
      selectShellPendingTurnItemRows,
      selectShellProviderThreadRows,
      shellStatusFromStoredRunStatus,
      sql,
      isIdleCompactionMessage,
      isSilentShellRun,
    } = pickScriptcBindCtx(ctx);
    const __fn = (threadId) =>
      sql
        .withTransaction(
          Effect.gen(function* () {
            const rows = yield* sql<SettlementThreadRow>`
            SELECT t.thread_id, t.payload_json,
              r.run_id AS latest_run_id,
              r.status AS latest_run_status,
              r.requested_at AS latest_run_requested_at,
              json_extract(r.payload_json, '$.startedAt') AS latest_run_started_at,
              r.completed_at AS latest_run_completed_at,
              (
                SELECT message.updated_at
                FROM orchestration_v2_projection_messages message
                WHERE message.thread_id = t.thread_id AND message.role = 'user'
                  AND NOT ${isIdleCompactionMessage("message")}
                ORDER BY message.updated_at DESC, message.message_id DESC
                LIMIT 1
              ) AS latest_user_message_at,
              (
                SELECT message.updated_at
                FROM orchestration_v2_projection_messages message
                WHERE message.thread_id = t.thread_id AND message.role = 'user'
                  AND NOT ${isIdleCompactionMessage("message")}
                  AND (
                    json_extract(message.payload_json, '$.createdBy') = 'user'
                    OR (
                      json_extract(message.payload_json, '$.createdBy') = 'agent'
                      AND json_extract(message.payload_json, '$.creationSource') = 'mcp'
                    )
                  )
                ORDER BY message.updated_at DESC, message.message_id DESC
                LIMIT 1
              ) AS latest_resuming_message_at
            FROM orchestration_v2_projection_threads t
            LEFT JOIN orchestration_v2_projection_runs r ON r.run_id = (
              SELECT latest.run_id FROM orchestration_v2_projection_runs latest
              WHERE latest.thread_id = t.thread_id
                AND NOT ${isSilentShellRun("latest")}
              ORDER BY latest.ordinal DESC, latest.run_id DESC
              LIMIT 1
            )
            WHERE t.deleted_at IS NULL${threadId === undefined ? sql`` : sql` AND t.thread_id = ${threadId}`}
              AND json_extract(t.payload_json, '$.archivedAt') IS NULL
              AND json_extract(t.payload_json, '$.settledOverride') IS NULL
              AND json_extract(t.payload_json, '$.pinnedAt') IS NULL
              AND json_extract(t.payload_json, '$.autoSettleDisabledAt') IS NULL
              AND (
                json_extract(t.payload_json, '$.lineage.relationshipToParent') IS NOT 'subagent'
                OR NOT EXISTS (
                  SELECT 1 FROM orchestration_v2_projection_threads parent
                  WHERE parent.thread_id = json_extract(t.payload_json, '$.lineage.parentThreadId')
                    AND parent.deleted_at IS NULL
                    AND json_extract(parent.payload_json, '$.archivedAt') IS NULL
                    AND json_extract(parent.payload_json, '$.settledOverride') IS NOT 'settled'
                )
                -- A pinned or long-lived parent may never settle, so a child also settles once
                -- its own run has ended and its parent holds every result it produced. A
                -- provider-native child has no run of its own; its task record carries its state.
                OR (
                  (
                    r.status IN ('completed', 'interrupted', 'failed', 'cancelled', 'rolled_back')
                    OR (
                      r.run_id IS NULL
                      AND EXISTS (
                        SELECT 1 FROM orchestration_v2_projection_subagents task
                        WHERE task.child_thread_id = t.thread_id
                      )
                    )
                  )
                  AND NOT EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_subagents task
                    WHERE task.child_thread_id = t.thread_id
                      AND (
                        task.status NOT IN ('completed', 'failed', 'cancelled', 'interrupted')
                        OR task.completion_delivery_state IN ('pending', 'claimed')
                      )
                  )
                )
              )
              AND NOT EXISTS (
                SELECT 1 FROM orchestration_v2_projection_runs active
                WHERE active.thread_id = t.thread_id
                  AND active.status IN ('preparing', 'starting', 'running', 'waiting')
              )
              AND NOT EXISTS (
                SELECT 1 FROM orchestration_v2_projection_runtime_requests request
                WHERE request.thread_id = t.thread_id AND request.status = 'pending'
              )
              AND NOT EXISTS (
                SELECT 1 FROM orchestration_v2_projection_turn_items link
                  INDEXED BY orchestration_v2_projection_turn_items_waiting_link_idx
                WHERE link.thread_id = t.thread_id
                  AND link.type = 'link_request' AND link.status = 'waiting'
                  -- linkCardStillAsks: once the user writes after the card, it stops asking.
                  AND NOT EXISTS (
                    SELECT 1 FROM orchestration_v2_projection_messages message
                    WHERE message.thread_id = t.thread_id AND message.role = 'user'
                      AND json_extract(message.payload_json, '$.createdBy') = 'user'
                      AND NOT ${isIdleCompactionMessage("message")}
                      AND message.updated_at > COALESCE(
                        json_extract(link.payload_json, '$.startedAt'), link.updated_at
                      )
                  )
              )
            ORDER BY t.updated_at ASC, t.thread_id ASC
          `;
            if (rows.length === 0) return [];
            const threadIds = rows.map((row) => ThreadId.make(row.thread_id));
            const { providerThreadsByThreadId, pendingTurnItemsByThreadId } =
              yield* pendingBackgroundDataByThreadId({
                providerThreadRows: yield* selectShellProviderThreadRows(threadIds),
                pendingTurnItemRows: yield* selectShellPendingTurnItemRows(threadIds),
              });
            return yield* Effect.forEach(rows, (row) =>
              Effect.gen(function* () {
                const thread = yield* decodeThreadPayload(row.payload_json);
                const status = shellStatusFromStoredRunStatus(row.latest_run_status);
                const latestRunId =
                  row.latest_run_id === null ? null : RunId.make(row.latest_run_id);
                return {
                  ...thread,
                  pinnedAt: thread.pinnedAt ?? null,

                  autoSettleDisabledAt: thread.autoSettleDisabledAt ?? null,
                  snoozedUntil: thread.snoozedUntil ?? null,
                  snoozedAt: thread.snoozedAt ?? null,
                  status,
                  latestRunId,
                  latestRunRequestedAt:
                    row.latest_run_requested_at === null
                      ? null
                      : DateTime.makeUnsafe(row.latest_run_requested_at),
                  latestRunStartedAt:
                    row.latest_run_started_at === null
                      ? null
                      : DateTime.makeUnsafe(row.latest_run_started_at),
                  latestRunCompletedAt:
                    row.latest_run_completed_at === null
                      ? null
                      : DateTime.makeUnsafe(row.latest_run_completed_at),
                  latestUserMessageAt:
                    row.latest_user_message_at === null
                      ? null
                      : DateTime.makeUnsafe(row.latest_user_message_at),
                  latestResumingMessageAt:
                    row.latest_resuming_message_at === null
                      ? null
                      : DateTime.makeUnsafe(row.latest_resuming_message_at),
                  activityRunStatus: null,
                  activityRunStartedAt: null,
                  pendingRuntimeRequest: null,
                  pendingGuestMessageCount: pendingGuestMessageCount(thread.guestShare),
                  pendingBackgroundTasks: derivePendingBackgroundWork({
                    latestRun:
                      latestRunId === null || status === "idle"
                        ? null
                        : { id: latestRunId, ordinal: 0, status },
                    providerThreads: providerThreadsByThreadId.get(thread.id) ?? [],
                    turnItems: pendingTurnItemsByThreadId.get(thread.id) ?? [],
                    activeProviderThreadId: thread.activeProviderThreadId,
                    hasActiveRun: false,
                    pullRequests: thread.pullRequests,
                  }),
                } satisfies ProjectionSettlementCandidate;
              }),
            );
          }),
        )
        .pipe(Effect.mapError((cause) => new ProjectionStoreSetupError({ cause })));
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
