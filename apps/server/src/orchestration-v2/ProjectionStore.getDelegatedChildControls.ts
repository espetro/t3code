// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ProjectionStore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
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

import type { PayloadRow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetDelegatedChildControls = (ctx: any) => {
  return ((...args: any[]) => {
    const { controlReadError, decodeRows, decodeRunPayload, getThreadRecords, sql, encodeIdList } =
      ctx;
    const __fn = (threadId, { taskIds, windowSize }) =>
      sql
        .withTransaction(
          Effect.gen(function* () {
            const records = yield* getThreadRecords(
              threadId,
              ["messages", "subagents", "providerThreads"],
              { messageRoles: ["user"], delegatedTaskMessagesOnly: true },
            );
            // Spells migration 84's order and predicate so the window walks that index.
            const windowRows = yield* sql<PayloadRow & { readonly completed_at: string | null }>`
              SELECT payload_json, completed_at FROM orchestration_v2_projection_runs
              WHERE thread_id = ${threadId}
                AND status <> 'queued'
                AND NOT (status = 'cancelled' AND json_extract(payload_json, '$.startedAt') IS NULL)
              ORDER BY (completed_at IS NULL) DESC, completed_at DESC, ordinal DESC, run_id DESC
              LIMIT ${windowSize}
            `;
            const window = yield* decodeRows(decodeRunPayload, threadId)(windowRows);
            const last = window.length < windowSize ? undefined : window.at(-1);
            const floorCompletedAt = windowRows.at(-1)?.completed_at ?? null;
            // A window ending in unfinished runs bounds nothing, so read the whole thread.
            const floor = floorCompletedAt === null ? undefined : last;
            const rest = yield* (
              last !== undefined && floor === undefined
                ? sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_runs
              WHERE thread_id = ${threadId}`
                : sql<PayloadRow>`
              SELECT payload_json FROM orchestration_v2_projection_runs
              WHERE thread_id = ${threadId}
                AND status IN ('preparing', 'queued', 'starting', 'running', 'waiting')
              UNION
              SELECT payload_json FROM orchestration_v2_projection_runs
              WHERE thread_id = ${threadId} AND json_valid(payload_json)
                AND json_extract(payload_json, '$.delegatedTaskId') IS NOT NULL
                AND json_extract(payload_json, '$.delegatedTaskId')
                  IN (SELECT value FROM json_each(${encodeIdList(taskIds)}))
              UNION
              -- Unstarted cancelled runs are outside the window's index.
              SELECT payload_json FROM orchestration_v2_projection_runs
              WHERE thread_id = ${threadId} AND status = 'cancelled'
                ${floor === undefined ? sql`` : sql`AND (completed_at IS NULL OR completed_at >= ${floorCompletedAt})`}`
            ).pipe(Effect.flatMap(decodeRows(decodeRunPayload, threadId)));
            const runs = new Map([...window, ...rest].map((run) => [run.id, run]));
            const requested = new Set<RunId>();
            for (;;) {
              const wakeRunIds = [
                ...new Set(
                  records.messages.flatMap((message) =>
                    message.runId !== null &&
                    message.delegatedCompletion !== undefined &&
                    runs.has(message.delegatedCompletion.parentRunId) &&
                    !runs.has(message.runId) &&
                    !requested.has(message.runId)
                      ? [message.runId]
                      : [],
                  ),
                ),
              ];
              if (wakeRunIds.length === 0) break;
              for (const id of wakeRunIds) requested.add(id);
              const wakes = yield* getThreadRecords(threadId, ["runs"], { runIds: wakeRunIds });
              for (const run of wakes.runs) runs.set(run.id, run);
            }
            return {
              ...records,
              runs: [...runs.values()].toSorted((a, b) => a.ordinal - b.ordinal),
              runsFloor: floor,
            };
          }),
        )
        .pipe(Effect.mapError(controlReadError(threadId)));
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
