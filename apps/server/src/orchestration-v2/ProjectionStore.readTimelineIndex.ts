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

import type { ProjectionStoreV2Error } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindReadTimelineIndex = (ctx: any) => {
  const {
    isProjectionStoreReadError,
    isProjectionStoreThreadNotFoundError,
    ProjectionStoreReadError,
  } = pickScriptcBindCtx(ctx);
  return Effect.fn("ProjectionStore.readTimelineIndex")(
    function* (threadId: ThreadId, seen: ReadonlySet<ThreadId>, includeAttempts = false) {
      const {
        ProjectionStoreReadError,
        ProjectionStoreV2Error,
        createInheritedTurnItemVisibility,
        forkMemberRunOrdinals,
        getForkSourceRunIds,
        getThreadRecords,
        inheritedRunFork,
        isProjectionStoreReadError,
        isProjectionStoreThreadNotFoundError,
        isTurnItemAtOrBeforeRun,
        makeForkMarkerTurnItem,
        sql,
        readTimelineIndex,
      } = pickScriptcBindCtx(ctx);

      const records = yield* getThreadRecords(threadId, ["runs", "attempts"]);
      const rows = yield* sql<{
        turn_item_id: string;
        run_id: string | null;
        node_id: string | null;
        parent_item_id: string | null;
        type: OrchestrationV2TurnItem["type"];
        input_intent: NonNullable<TimelineIndexItem["inputIntent"]> | null;
        created_by: "user" | "agent" | "system" | null;
        message_id: string | null;
        status: OrchestrationV2TurnItem["status"];
        ordinal: number;
        attempt_id: string | null;
        attempt_status: string | null;
      }>`SELECT item.turn_item_id, item.run_id, item.node_id, item.parent_item_id, item.type, item.status, item.ordinal,
          ${includeAttempts ? sql`attempt.attempt_id` : sql`NULL`} AS attempt_id,
          ${includeAttempts ? sql`attempt.status` : sql`NULL`} AS attempt_status,
          CASE WHEN item.type = 'user_message' THEN json_extract(item.payload_json, '$.inputIntent') END AS input_intent,
          CASE WHEN item.type = 'user_message' THEN json_extract(item.payload_json, '$.createdBy') END AS created_by,
          CASE WHEN item.type IN ('user_message', 'assistant_message') THEN json_extract(item.payload_json, '$.messageId') END AS message_id
        FROM orchestration_v2_projection_turn_items AS item
        ${
          includeAttempts
            ? sql`LEFT JOIN orchestration_v2_projection_nodes AS node ON node.node_id = item.node_id
        LEFT JOIN orchestration_v2_projection_run_attempts AS attempt ON attempt.attempt_id = (
          SELECT attempt_id FROM orchestration_v2_projection_run_attempts
          WHERE run_id = item.run_id AND root_node_id = COALESCE(node.root_node_id, item.node_id)
          ORDER BY attempt_ordinal DESC LIMIT 1
        )`
            : sql``
        }
        WHERE item.thread_id = ${threadId}
        ORDER BY item.ordinal ASC, item.turn_item_id ASC`;
      const runStatuses = new Map(records.runs.map((run) => [String(run.id), run.status]));
      const items: Array<TimelineIndexItem> = rows.map((row) => ({
        id: TurnItemId.make(row.turn_item_id),
        threadId,
        runId: row.run_id === null ? null : RunId.make(row.run_id),
        nodeId: row.node_id === null ? null : NodeId.make(row.node_id),
        parentItemId: row.parent_item_id === null ? null : TurnItemId.make(row.parent_item_id),
        type: row.type,
        status: row.status,
        ordinal: row.ordinal,
        runStatus: row.run_id === null ? undefined : runStatuses.get(row.run_id),
        attemptId: row.attempt_id,
        attemptStatus: row.attempt_status,
        ...(row.input_intent === null ? {} : { inputIntent: row.input_intent }),
        ...(row.created_by === null ? {} : { createdBy: row.created_by }),
        ...(row.message_id === null ? {} : { messageId: MessageId.make(row.message_id) }),
      }));
      const local: Array<TimelineIndexRow> = items.map((item) => ({
        sourceThreadId: threadId,
        sourceItemId: item.id,
        visibility: "local",
        item,
      }));
      const isVisible = createOrchestrationV2TurnItemVisibility({
        runs: records.runs,
        attempts: records.attempts,
        items,
      });
      const visible = local.filter((row) => isVisible(row.item));
      const fork = inheritedRunFork(records.thread);
      if (fork === null || seen.has(fork.threadId))
        return { records, threadIds: [threadId], local, visible };
      const source = yield* readTimelineIndex(
        fork.threadId,
        new Set([...seen, threadId]),
        includeAttempts,
      );
      const sourceRun = source.records.runs.find((run) => run.id === fork.runId);
      let inherited: Array<TimelineIndexRow> = [];
      if (sourceRun !== undefined) {
        const ordinals = forkMemberRunOrdinals(
          source.records.runs,
          yield* getForkSourceRunIds(threadId),
        );
        const isInheritedVisible = createInheritedTurnItemVisibility({
          runs: source.records.runs,
          attempts: source.records.attempts,
          items: source.local.map((row) => row.item),
        });
        inherited = [
          ...source.visible.filter(
            (row) => row.item.threadId !== fork.threadId || row.item.type === "fork",
          ),
          ...source.local.filter(
            (row) =>
              isInheritedVisible(row.item) &&
              isTurnItemAtOrBeforeRun({
                historyOrigin: source.records.thread.historyOrigin,
                itemRunId: row.item.runId,
                runOrdinalById: ordinals,
                sourceRunOrdinal: sourceRun.ordinal,
              }),
          ),
        ].map((row) => ({ ...row, visibility: "inherited" }));
      }
      const marker = makeForkMarkerTurnItem({
        targetProjection: records,
        sourceThreadId: fork.threadId,
        sourceRunId: fork.runId,
      });
      return {
        records,
        threadIds: [threadId, ...source.threadIds],
        local,
        visible: [
          ...inherited,
          {
            sourceThreadId: fork.threadId,
            sourceItemId: marker.id,
            visibility: "synthetic" as const,
            item: marker,
            synthetic: marker,
          },
          ...visible,
        ],
      };
    },
    (effect, threadId, _seen) =>
      effect.pipe(
        Effect.mapError((cause) =>
          isProjectionStoreThreadNotFoundError(cause) || isProjectionStoreReadError(cause)
            ? cause
            : new ProjectionStoreReadError({ threadId, cause }),
        ),
      ),
  );
};
