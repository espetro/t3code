// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ProjectionStore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
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

import type { PayloadRow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetTurnStartContext = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      ProjectionStoreReadError,
      decodeCheckpointScopePayload,
      decodeContextHandoffPayload,
      decodeContextTransferPayload,
      decodeMessagePayload,
      decodeNodePayload,
      decodeProviderSessionPayload,
      decodeProviderThreadPayload,
      decodeProviderTurnPayload,
      decodeRows,
      decodeRunAttemptPayload,
      decodeRunPayload,
      decodeSubagentPayload,
      decodeTurnItemPayload,
      getThread,
      inheritsForkConversation,
      isProjectionStoreThreadNotFoundError,
      sql,
    } = pickScriptcBindCtx(ctx);
    const __fn = (threadId, runId) =>
      sql
        .withTransaction(
          Effect.gen(function* () {
            const thread = yield* getThread(threadId);
            const runs = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_runs
              WHERE thread_id = ${threadId} ORDER BY ordinal ASC
            `.pipe(Effect.flatMap(decodeRows(decodeRunPayload, threadId)));
            const attempts = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_run_attempts
              WHERE thread_id = ${threadId} ORDER BY run_id ASC, attempt_ordinal ASC
            `.pipe(Effect.flatMap(decodeRows(decodeRunAttemptPayload, threadId)));
            const nodes = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_nodes
              -- Look up the root node by key, not every node in the thread.
              INDEXED BY sqlite_autoindex_orchestration_v2_projection_nodes_1
              WHERE thread_id = ${threadId} AND node_id IN (SELECT json_extract(payload_json, '$.rootNodeId') FROM orchestration_v2_projection_runs WHERE thread_id = ${threadId} AND run_id = ${runId}) ORDER BY node_id ASC
            `.pipe(Effect.flatMap(decodeRows(decodeNodePayload, threadId)));
            // Only the completed provider-native ones are routed. A long thread holds thousands of delegated ones.
            const subagents = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_subagents
              WHERE thread_id = ${threadId} AND origin = 'provider_native' AND status = 'completed' ORDER BY subagent_id ASC
            `.pipe(Effect.flatMap(decodeRows(decodeSubagentPayload, threadId)));
            const providerThreads = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_provider_threads
              WHERE thread_id = ${threadId} ORDER BY COALESCE(first_run_ordinal, 0), provider_thread_id ASC
            `.pipe(Effect.flatMap(decodeRows(decodeProviderThreadPayload, threadId)));
            const providerTurns = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_provider_turns
              WHERE thread_id = ${threadId} ORDER BY provider_thread_id ASC, ordinal ASC
            `.pipe(Effect.flatMap(decodeRows(decodeProviderTurnPayload, threadId)));
            const checkpointScopes = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_checkpoint_scopes
              WHERE thread_id = ${threadId} AND scope_id IN ${sql.in(nodes.flatMap((node) => (node.checkpointScopeId === null ? [] : [node.checkpointScopeId])))} ORDER BY ordinal_within_parent ASC, scope_id ASC
            `.pipe(Effect.flatMap(decodeRows(decodeCheckpointScopePayload, threadId)));
            const contextHandoffs = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_context_handoffs
              WHERE thread_id = ${threadId} ORDER BY rowid ASC
            `.pipe(Effect.flatMap(decodeRows(decodeContextHandoffPayload, threadId)));
            // The fork into this thread and the transfers its handoffs came from, not the thousands of delegated results.
            const contextTransfers = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_context_transfers
              WHERE (target_thread_id = ${threadId} AND type = 'fork')
                OR context_transfer_id IN (
                  SELECT json_extract(payload_json, '$.transferId')
                  FROM orchestration_v2_projection_context_handoffs WHERE thread_id = ${threadId}
                )
              ORDER BY rowid ASC
            `.pipe(Effect.flatMap(decodeRows(decodeContextTransferPayload, threadId)));
            const turnItems = yield* sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_turn_items
              -- Look up one run's items by key, not by walking the thread's whole history in ordinal order.
              INDEXED BY orchestration_v2_projection_turn_items_run_ordinal_idx
              WHERE thread_id = ${threadId} AND run_id = ${runId} ORDER BY ordinal ASC, turn_item_id ASC
            `.pipe(Effect.flatMap(decodeRows(decodeTurnItemPayload, threadId)));
            const providerSessions = yield* sql<PayloadRow>`
              SELECT sessions.payload_json FROM orchestration_v2_projection_provider_sessions AS sessions
              INNER JOIN orchestration_v2_projection_provider_session_bindings AS bindings
                ON bindings.provider_session_id = sessions.provider_session_id
              WHERE bindings.thread_id = ${threadId}
              ORDER BY sessions.updated_at ASC, sessions.provider_session_id ASC
            `.pipe(Effect.flatMap(decodeRows(decodeProviderSessionPayload, threadId)));
            const run = runs.find((source) => source.id === runId);
            const unsentSource = unsentManualContinuationSource(run, {
              runs,
              attempts,
              providerTurns,
            });
            const messageIds = [run, unsentSource].flatMap((source) =>
              source === undefined ? [] : [source.userMessageId],
            );
            // Earlier slash command turns defer context too; isSlashCommandMessage narrows the match.
            const messages = yield* sql<PayloadRow>`
              SELECT payload_json FROM (
                SELECT payload_json, created_at, message_id FROM orchestration_v2_projection_messages
                WHERE thread_id = ${threadId} AND message_id IN ${sql.in(messageIds)}
                UNION
                SELECT payload_json, created_at, message_id FROM orchestration_v2_projection_messages
                WHERE thread_id = ${threadId} AND ${sql.literal(DEFERRED_COMMAND_MESSAGE_CONDITION)}
              ) ORDER BY created_at ASC, message_id ASC
            `.pipe(Effect.flatMap(decodeRows(decodeMessagePayload, threadId)));
            const conversation = yield* sql<{ present: number }>`
              SELECT EXISTS(
                SELECT 1 FROM orchestration_v2_projection_messages
                WHERE thread_id = ${threadId} AND role = 'user'
                    AND (lower(trim(json_extract(payload_json, '$.text'), ${JAVASCRIPT_TRIM_WHITESPACE})) <> '/compact'
                      OR json_array_length(payload_json, '$.attachments') > 0)
              ) AS present
            `;
            return {
              hasConversation:
                conversation[0]?.present === 1 ||
                inheritsForkConversation({ thread, contextTransfers, contextHandoffs }),
              thread,
              runs,
              attempts,
              nodes,
              subagents,
              providerSessions,
              providerThreads,
              providerTurns,
              messages,
              checkpointScopes,
              contextHandoffs,
              contextTransfers,
              turnItems,
            };
          }),
        )
        .pipe(
          Effect.mapError((cause) =>
            isProjectionStoreThreadNotFoundError(cause)
              ? cause
              : new ProjectionStoreReadError({ threadId, cause }),
          ),
        );
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
