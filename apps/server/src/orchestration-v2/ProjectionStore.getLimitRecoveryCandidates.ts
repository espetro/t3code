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

import type {
  ProjectionLimitRecoveryCandidate,
  ProjectionStoreV2Shape,
} from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetLimitRecoveryCandidates = (ctx: any) =>
  Effect.fn("ProjectionStore.getLimitRecoveryCandidates")(
    function* (options: Parameters<ProjectionStoreV2Shape["getLimitRecoveryCandidates"]>[0]) {
      const {
        ProjectionStoreSetupError,
        decodeThreadPayload,
        decodeTurnItemPayload,
        sql,
        booleanInt,
      } = pickScriptcBindCtx(ctx);

      const rows = yield* sql<{
        readonly payload_json: string;
        readonly run_id: string;
        readonly completed_at: string | null;
        readonly failure_payload_json: string;
        readonly last_error: string | null;
      }>`
          SELECT t.payload_json, r.run_id, r.completed_at,
            item.payload_json AS failure_payload_json,
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
            ) AS last_error
          FROM orchestration_v2_projection_threads t
          INNER JOIN orchestration_v2_projection_runs r ON r.run_id = (
            SELECT latest.run_id FROM orchestration_v2_projection_runs latest
            WHERE latest.thread_id = t.thread_id
              AND latest.status <> 'queued'
              AND NOT (
                latest.status = 'cancelled'
                AND json_extract(latest.payload_json, '$.startedAt') IS NULL
              )
            -- latestExecutedRun: the run that ended last (runRanAfter).
            ORDER BY latest.completed_at IS NULL DESC, latest.completed_at DESC,
              latest.ordinal DESC, latest.run_id DESC
            LIMIT 1
          ) AND r.status = 'failed'
          INNER JOIN orchestration_v2_projection_turn_items item ON item.turn_item_id = (
            SELECT error.turn_item_id FROM orchestration_v2_projection_turn_items error
            WHERE error.thread_id = t.thread_id AND error.run_id = r.run_id
              AND error.type = 'error' AND error.status = 'failed'
              AND error.node_id IS json_extract(r.payload_json, '$.rootNodeId')
            ORDER BY error.updated_at DESC, error.ordinal DESC, error.turn_item_id DESC
            LIMIT 1
          )
          WHERE t.deleted_at IS NULL
            -- The sweep runs every scheduler tick. Without this list the latest-run
            -- lookup above sorts every run of every thread, tens of milliseconds
            -- for one long thread; only threads with a usage-limit failure qualify.
            AND t.thread_id IN (
              SELECT failure.thread_id FROM orchestration_v2_projection_turn_items failure
              -- Spelled as in 099_BackgroundRecoveryIndexes so the partial index serves it.
              WHERE failure.type = 'error' AND failure.status = 'failed'
                AND CASE WHEN json_valid(failure.payload_json) THEN
                  json_extract(failure.payload_json, '$.failure.class') = 'usage_limit'
                  ELSE 0 END
            )
            AND t.archived_at IS NULL
            AND json_extract(t.payload_json, '$.settledOverride') IS NOT 'settled'
            AND json_valid(item.payload_json)
            AND json_extract(item.payload_json, '$.failure.class') = 'usage_limit'
            AND json_extract(item.payload_json, '$.failure.resetAt') IS NOT NULL
            AND julianday(json_extract(item.payload_json, '$.failure.resetAt')) > julianday(COALESCE(r.completed_at, json_extract(t.payload_json, '$.updatedAt')))
            AND (
              (
                json_extract(t.payload_json, '$.limitRecovery.runId') IS r.run_id
                AND json_extract(t.payload_json, '$.limitRecovery.resetAt') IS json_extract(item.payload_json, '$.failure.resetAt')
                AND json_extract(t.payload_json, '$.limitRecovery.autoResume') = 1
                AND julianday(json_extract(item.payload_json, '$.failure.resetAt')) <= julianday(${DateTime.formatIso(options.now)})
                AND (
                  json_extract(t.payload_json, '$.snoozedUntil') IS NULL
                  OR julianday(json_extract(t.payload_json, '$.snoozedUntil')) <= julianday(${DateTime.formatIso(options.now)})
                )
              )
              OR (
                (
                  json_extract(t.payload_json, '$.limitRecovery.runId') IS NOT r.run_id
                  OR json_extract(t.payload_json, '$.limitRecovery.resetAt') IS NOT json_extract(item.payload_json, '$.failure.resetAt')
                )
                AND (
                  ${booleanInt(options.autoResume)}
                  OR (${booleanInt(options.snooze)} AND julianday(json_extract(item.payload_json, '$.failure.resetAt')) > julianday(${DateTime.formatIso(options.now)}))
                )
                -- A subagent of a settled, archived or deleted parent is abandoned work.
                AND NOT EXISTS (
                  SELECT 1 FROM orchestration_v2_projection_threads parent
                  WHERE json_extract(t.payload_json, '$.lineage.relationshipToParent') = 'subagent'
                    AND parent.thread_id = json_extract(t.payload_json, '$.lineage.parentThreadId')
                    AND (
                      json_extract(parent.payload_json, '$.settledOverride') = 'settled'
                      OR json_extract(parent.payload_json, '$.archivedAt') IS NOT NULL
                      OR parent.deleted_at IS NOT NULL
                    )
                )
              )
            )
            AND NOT EXISTS (
              SELECT 1 FROM orchestration_v2_projection_runtime_requests request
              WHERE request.thread_id = t.thread_id AND request.status = 'pending'
            )
          ORDER BY t.thread_id
        `;
      const candidates: Array<ProjectionLimitRecoveryCandidate> = [];
      for (const row of rows) {
        const thread = yield* decodeThreadPayload(row.payload_json);
        const item = yield* decodeTurnItemPayload(row.failure_payload_json);
        const summary = threadErrorSummary(
          item.type === "error" ? item.failure : null,
          row.last_error,
        );
        if (summary.lastErrorClass !== "usage_limit") continue;
        candidates.push({
          id: thread.id,
          status: "failed",
          lastErrorClass: summary.lastErrorClass,
          usageLimitResetAt: summary.usageLimitResetAt,
          latestRunId: RunId.make(row.run_id),
          latestRunCompletedAt:
            row.completed_at === null ? null : DateTime.makeUnsafe(row.completed_at),
          updatedAt: thread.updatedAt,
          archivedAt: thread.archivedAt,
          settledOverride: thread.settledOverride,
          pendingRuntimeRequest: null,
          limitRecovery: thread.limitRecovery ?? null,
          snoozedUntil: thread.snoozedUntil ?? null,
        });
      }
      return candidates;
    },
    Effect.mapError((cause) => new ProjectionStoreSetupError({ cause })),
  );
