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

import type { PayloadRow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetThreadSnapshotWindow = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      ORCHESTRATION_V2_PROJECTION_SCHEMA_VERSION,
      ProjectionStoreReadError,
      ProjectionStoreThreadNotFoundError,
      decodeRows,
      decodeTurnItemPayload,
      isProjectionStoreReadError,
      isProjectionStoreThreadNotFoundError,
      readProjection,
      sql,
    } = ctx;
    const __fn = (threadId, options) =>
      sql
        .withTransaction(
          Effect.gen(function* () {
            const historyAnchor =
              options.anchorItemId === undefined
                ? undefined
                : {
                    itemId: options.anchorItemId,
                    threadId:
                      options.anchorThreadId ??
                      (yield* sql<{ readonly thread_id: string }>`
                        SELECT thread_id
                        FROM orchestration_v2_projection_turn_items
                        WHERE turn_item_id = ${options.anchorItemId}
                        LIMIT 1
                      `).map((row) => ThreadId.make(row.thread_id))[0] ??
                      threadId,
                  };
            const projection = yield* readProjection(threadId, new Set(), {
              rowLimit: options.rowLimit,
              userTurnLimit: options.userTurnLimit,
              deferWork: options.deferWork,
              ...(historyAnchor?.threadId === threadId
                ? { anchorItemId: historyAnchor.itemId }
                : {}),
              ...(historyAnchor === undefined ? {} : { historyAnchor }),
            });
            if (projection.thread.deletedAt !== null)
              return yield* new ProjectionStoreThreadNotFoundError({ threadId });
            // Pending requests outlive their turn's window; clients read their prompt from the card.
            const retainedIds = new Set(projection.turnItems.map((item) => item.id));
            const pendingCards = (yield* decodeRows(
              decodeTurnItemPayload,
              threadId,
            )(
              yield* sql<PayloadRow>`
                SELECT item.payload_json
                FROM orchestration_v2_projection_runtime_requests AS request
                CROSS JOIN orchestration_v2_projection_turn_items AS item
                  ON item.node_id = request.node_id
                  AND item.type IN ('approval_request', 'user_input_request')
                  AND json_extract(item.payload_json, '$.requestId') = request.runtime_request_id
                WHERE request.thread_id = ${threadId} AND request.status = 'pending'
                  AND item.thread_id = ${threadId}
              `,
            )).filter((item) => !retainedIds.has(item.id));
            const windowProjection =
              pendingCards.length === 0
                ? projection
                : {
                    ...projection,
                    turnItems: [...projection.turnItems, ...pendingCards].toSorted(
                      (left, right) =>
                        left.ordinal - right.ordinal || left.id.localeCompare(right.id),
                    ),
                  };
            const rows = yield* sql<{ readonly snapshot_sequence: number | null }>`
              SELECT MAX(sequence) AS snapshot_sequence
              FROM orchestration_events
              WHERE application_event_version = 2
                AND aggregate_kind = 'thread'
                AND stream_id = ${threadId}
            `;
            return {
              schemaVersion: ORCHESTRATION_V2_PROJECTION_SCHEMA_VERSION,
              snapshotSequence: rows[0]?.snapshot_sequence ?? 0,
              projection: windowProjection,
            };
          }),
        )
        .pipe(
          Effect.mapError((cause) =>
            isProjectionStoreThreadNotFoundError(cause) || isProjectionStoreReadError(cause)
              ? cause
              : new ProjectionStoreReadError({ threadId, cause }),
          ),
        );
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
