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

import type { PayloadRow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindApply = (ctx: any) =>
  /* This helper runs for individual orchestration events; the enclosing operation owns the span. */
  Effect.fnUntraced(
    function* (event) {
      const {
        ProjectionStoreApplyEventError,
        ProviderBatchProjectionState,
        attributePendingBackgroundTasks,
        decodeProviderThreadPayload,
        decodeProviderTurnPayload,
        decodeThreadPayload,
        encodeCheckpointPayload,
        encodeCheckpointScopePayload,
        encodeContextHandoffPayload,
        encodeContextTransferPayload,
        encodeMessagePayload,
        encodeNodePayload,
        encodePayloadTimestamp,
        encodePlanPayload,
        encodeProviderSessionPayload,
        encodeProviderThreadPayload,
        encodeProviderTurnPayload,
        encodeRestartCancelledBackgroundWork,
        encodeRunAttemptPayload,
        encodeRunOutput,
        encodeRunPayload,
        encodeRuntimeRequestPayload,
        encodeSubagentPayload,
        encodeThreadPayload,
        encodeThreadUpdatedAt,
        encodeTurnItemPayload,
        getThread,
        booleanInt,
        nullableStringField,
        parseEncodedPayload,
        stringField,
        sql,
        timelineIndexes,
        upsertProviderTurn,
        writeThreadTouches,
        apply,
        isInlineWorkOutput,
        keepRecordedRunField,
        keepRecordedRunOutput,
      } = pickScriptcBindCtx(ctx);

      for (const [key, cached] of timelineIndexes) {
        if (cached.index.threadIds.includes(event.threadId)) timelineIndexes.delete(key);
      }
      const batch = yield* ProviderBatchProjectionState;
      // These rewrite the thread row from what they read, so a deferred bump must land first.
      const rewrittenThreadId = event.type.startsWith("thread.")
        ? event.threadId
        : event.type === "provider-thread.updated"
          ? event.payload.appThreadId
          : null;
      const deferredUpdatedAt =
        rewrittenThreadId === null ? undefined : batch?.threadTouches.get(rewrittenThreadId);
      if (batch !== undefined && rewrittenThreadId !== null && deferredUpdatedAt !== undefined) {
        batch.threadTouches.delete(rewrittenThreadId);
        yield* writeThreadTouches(sql, new Map([[rewrittenThreadId, deferredUpdatedAt]]));
      }
      switch (event.type) {
        case "thread.pull-request-link-updated": {
          const thread = yield* getThread(event.threadId);
          yield* apply({
            ...event,
            type: "thread.pull-request-synced",
            payload: applyThreadPullRequestLinkUpdate(thread, event.payload),
          });
          break;
        }
        case "thread.visit-recorded": {
          const thread = yield* getThread(event.threadId);
          yield* apply({
            ...event,
            type: "thread.visited",
            payload: applyOrchestrationV2ThreadVisit(thread, event.payload),
          });
          break;
        }
        case "thread.created":
        case "thread.archived":
        case "thread.unarchived":
        case "thread.deleted":
        case "thread.settled":
        case "thread.unsettled":
        case "thread.snoozed":
        case "thread.unsnoozed":
        case "thread.auto-settle-set":
        case "thread.pinned":
        case "thread.unpinned":
        case "thread.pin-reordered":
        case "thread.active-reordered":
        case "thread.tags-updated":
        case "thread.visited":
        case "thread.marked-unread":
        case "thread.metadata-updated":
        case "thread.pull-request-synced":
        case "thread.issue-synced":
        case "thread.runtime-mode-updated":
        case "thread.interaction-mode-updated":
        case "thread.model-selection-updated":
        case "thread.provider-switched":
        case "thread.guest-share-updated": {
          const payloadJson = yield* encodeThreadPayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_threads (
                thread_id,
                project_id,
                title,
                default_provider,
                provider_instance_id,
                runtime_mode,
                interaction_mode,
                active_provider_thread_id,
                created_at,
                updated_at,
                archived_at,
                deleted_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.projectId},
                ${event.payload.title},
                ${event.payload.providerInstanceId},
                ${event.payload.providerInstanceId},
                ${event.payload.runtimeMode},
                ${event.payload.interactionMode},
                ${event.payload.activeProviderThreadId},
                ${stringField(payload, "createdAt")},
                ${stringField(payload, "updatedAt")},
                ${nullableStringField(payload, "archivedAt")},
                ${nullableStringField(payload, "deletedAt")},
                ${payloadJson}
              )
              ON CONFLICT(thread_id)
              DO UPDATE SET
                project_id = excluded.project_id,
                title = excluded.title,
                default_provider = excluded.default_provider,
                provider_instance_id = excluded.provider_instance_id,
                runtime_mode = excluded.runtime_mode,
                interaction_mode = excluded.interaction_mode,
                active_provider_thread_id = excluded.active_provider_thread_id,
                created_at = excluded.created_at,
                updated_at = excluded.updated_at,
                archived_at = excluded.archived_at,
                deleted_at = excluded.deleted_at,
                payload_json = excluded.payload_json
            `;
          // EventSink applies committed events serially; retries retain the original membership.
          if (event.type === "thread.created" && event.payload.forkedFrom?.type === "run") {
            const fork = event.payload.forkedFrom;
            yield* sql`
                  UPDATE orchestration_v2_projection_threads
                  SET fork_run_ids_json = (
                    SELECT json_group_array(run_id)
                    FROM orchestration_v2_projection_runs
                    WHERE thread_id = ${fork.threadId}
                      AND ordinal <= (
                        SELECT ordinal FROM orchestration_v2_projection_runs
                        WHERE thread_id = ${fork.threadId} AND run_id = ${fork.runId}
                      )
                      AND status <> 'rolled_back'
                  )
                  WHERE thread_id = ${event.threadId} AND fork_run_ids_json IS NULL
                `;
          }
          break;
        }
        case "run.created":
        case "run.updated": {
          const payloadJson = yield* encodeRunPayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_runs (
                run_id,
                thread_id,
                ordinal,
                provider,
                provider_instance_id,
                provider_thread_id,
                status,
                requested_at,
                completed_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.ordinal},
                ${event.payload.providerInstanceId},
                ${event.payload.providerInstanceId},
                ${event.payload.providerThreadId},
                ${event.payload.status},
                ${stringField(payload, "requestedAt")},
                ${nullableStringField(payload, "completedAt")},
                ${payloadJson}
              )
              ON CONFLICT(run_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                ordinal = excluded.ordinal,
                provider = excluded.provider,
                provider_instance_id = excluded.provider_instance_id,
                provider_thread_id = excluded.provider_thread_id,
                status = excluded.status,
                requested_at = excluded.requested_at,
                completed_at = excluded.completed_at,
                payload_json = ${keepRecordedRunOutput(
                  keepRecordedRunField(
                    keepRecordedRunField(
                      keepRecordedRunField(sql`excluded.payload_json`, "$.delegatedCompletion"),
                      "$.restartCancelledBackgroundWork",
                    ),
                    "$.explicitQueue",
                  ),
                )}
            `;
          break;
        }
        case "run.background-work-cancelled": {
          // Only this field changes, so a concurrent lifecycle write is never regressed.
          const workJson = yield* encodeRestartCancelledBackgroundWork(
            event.payload.restartCancelledBackgroundWork,
          );
          yield* sql`
              UPDATE orchestration_v2_projection_runs
              SET payload_json = json_set(
                payload_json,
                '$.restartCancelledBackgroundWork',
                json(${workJson})
              )
              WHERE run_id = ${event.payload.runId} AND thread_id = ${event.threadId}
            `;
          break;
        }
        case "run.output-submitted": {
          // Only this field changes, so a concurrent lifecycle write is never regressed.
          const outputJson = yield* encodeRunOutput(event.payload.output);
          yield* sql`
              UPDATE orchestration_v2_projection_runs
              SET payload_json = json_set(payload_json, '$.output', json(${outputJson}))
              WHERE run_id = ${event.payload.runId} AND thread_id = ${event.threadId}
            `;
          break;
        }
        case "run-attempt.created":
        case "run-attempt.updated": {
          const payloadJson = yield* encodeRunAttemptPayload(event.payload);
          yield* sql`
              INSERT INTO orchestration_v2_projection_run_attempts (
                attempt_id,
                thread_id,
                run_id,
                attempt_ordinal,
                root_node_id,
                provider,
                provider_instance_id,
                provider_thread_id,
                provider_turn_id,
                status,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.threadId},
                ${event.payload.runId},
                ${event.payload.attemptOrdinal},
                ${event.payload.rootNodeId},
                ${event.payload.providerInstanceId},
                ${event.payload.providerInstanceId},
                ${event.payload.providerThreadId},
                ${event.payload.providerTurnId},
                ${event.payload.status},
                ${payloadJson}
              )
              ON CONFLICT(attempt_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                run_id = excluded.run_id,
                attempt_ordinal = excluded.attempt_ordinal,
                root_node_id = excluded.root_node_id,
                provider = excluded.provider,
                provider_instance_id = excluded.provider_instance_id,
                provider_thread_id = excluded.provider_thread_id,
                provider_turn_id = excluded.provider_turn_id,
                status = excluded.status,
                payload_json = excluded.payload_json
            `;
          break;
        }
        case "node.updated": {
          const payloadJson = yield* encodeNodePayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_nodes (
                node_id,
                thread_id,
                run_id,
                parent_node_id,
                root_node_id,
                kind,
                status,
                provider_thread_id,
                provider_turn_id,
                started_at,
                completed_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.runId},
                ${event.payload.parentNodeId},
                ${event.payload.rootNodeId},
                ${event.payload.kind},
                ${event.payload.status},
                ${event.payload.providerThreadId},
                ${event.payload.providerTurnId},
                ${nullableStringField(payload, "startedAt")},
                ${nullableStringField(payload, "completedAt")},
                ${payloadJson}
              )
              ON CONFLICT(node_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                run_id = excluded.run_id,
                parent_node_id = excluded.parent_node_id,
                root_node_id = excluded.root_node_id,
                kind = excluded.kind,
                status = excluded.status,
                provider_thread_id = excluded.provider_thread_id,
                provider_turn_id = excluded.provider_turn_id,
                started_at = excluded.started_at,
                completed_at = excluded.completed_at,
                payload_json = excluded.payload_json
            `;
          batch?.nodeReads.set(event.payload.id, payloadJson);
          break;
        }
        case "subagent.updated": {
          const payloadJson = yield* encodeSubagentPayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_subagents (
                subagent_id,
                thread_id,
                run_id,
                parent_node_id,
                provider,
                driver,
                provider_instance_id,
                provider_thread_id,
                child_thread_id,
                origin,
                status,
                started_at,
                completed_at,
                updated_at,
                completion_delivery_state,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.runId},
                ${event.payload.parentNodeId},
                ${event.payload.providerInstanceId},
                ${event.payload.driver},
                ${event.payload.providerInstanceId},
                ${event.payload.providerThreadId},
                ${event.payload.childThreadId},
                ${event.payload.origin},
                ${event.payload.status},
                ${nullableStringField(payload, "startedAt")},
                ${nullableStringField(payload, "completedAt")},
                ${stringField(payload, "updatedAt")},
                ${event.payload.completionDelivery?.state ?? null},
                ${payloadJson}
              )
              ON CONFLICT(subagent_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                run_id = excluded.run_id,
                parent_node_id = excluded.parent_node_id,
                provider = excluded.provider,
                driver = excluded.driver,
                provider_instance_id = excluded.provider_instance_id,
                provider_thread_id = excluded.provider_thread_id,
                child_thread_id = excluded.child_thread_id,
                origin = excluded.origin,
                status = excluded.status,
                started_at = excluded.started_at,
                completed_at = excluded.completed_at,
                updated_at = excluded.updated_at,
                completion_delivery_state = COALESCE(
                  excluded.completion_delivery_state,
                  orchestration_v2_projection_subagents.completion_delivery_state
                ),
                payload_json = CASE
                  WHEN json_type(excluded.payload_json, '$.completionDelivery') IS NULL
                    AND json_type(orchestration_v2_projection_subagents.payload_json, '$.completionDelivery') IS NOT NULL
                  THEN json_set(
                    excluded.payload_json,
                    '$.completionDelivery',
                    json_extract(
                      orchestration_v2_projection_subagents.payload_json,
                      '$.completionDelivery'
                    )
                  )
                  ELSE excluded.payload_json
                END
            `;
          break;
        }
        case "provider-session.attached":
        case "provider-session.updated": {
          const payloadJson = yield* encodeProviderSessionPayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_provider_sessions (
                provider_session_id,
                thread_id,
                provider,
                driver,
                provider_instance_id,
                status,
                updated_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.threadId},
                ${event.payload.providerInstanceId},
                ${event.payload.driver},
                ${event.payload.providerInstanceId},
                ${event.payload.status},
                ${stringField(payload, "updatedAt")},
                ${payloadJson}
              )
              ON CONFLICT(provider_session_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                provider = excluded.provider,
                driver = excluded.driver,
                provider_instance_id = excluded.provider_instance_id,
                status = excluded.status,
                updated_at = excluded.updated_at,
                payload_json = excluded.payload_json
            `;
          if (event.type === "provider-session.attached") {
            yield* sql`
                INSERT OR IGNORE INTO orchestration_v2_projection_provider_session_bindings (
                  provider_session_id,
                  thread_id
                )
                VALUES (${event.payload.id}, ${event.threadId})
              `;
          }
          break;
        }
        case "provider-session.detached": {
          yield* sql`
              DELETE FROM orchestration_v2_projection_provider_session_bindings
              WHERE provider_session_id = ${event.payload.providerSessionId}
                AND thread_id = ${event.threadId}
            `;
          break;
        }
        case "provider-thread.updated": {
          const existingRows = (event.payload.pendingBackgroundTasks ?? []).some(
            (task) => task.runId === undefined,
          )
            ? yield* sql<PayloadRow>`
                    SELECT payload_json
                    FROM orchestration_v2_projection_provider_threads
                    WHERE provider_thread_id = ${event.payload.id}
                    LIMIT 1
                  `
            : [];
          const existing = existingRows[0];
          const payloadJson = yield* encodeProviderThreadPayload(
            attributePendingBackgroundTasks(
              event.payload,
              existing === undefined
                ? undefined
                : yield* decodeProviderThreadPayload(existing.payload_json),
              event.runId,
            ),
          );
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_provider_threads (
                provider_thread_id,
                thread_id,
                owner_node_id,
                provider,
                driver,
                provider_instance_id,
                provider_session_id,
                status,
                first_run_ordinal,
                last_run_ordinal,
                updated_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.appThreadId},
                ${event.payload.ownerNodeId},
                ${event.payload.providerInstanceId},
                ${event.payload.driver},
                ${event.payload.providerInstanceId},
                ${event.payload.providerSessionId},
                ${event.payload.status},
                ${event.payload.firstRunOrdinal},
                ${event.payload.lastRunOrdinal},
                ${stringField(payload, "updatedAt")},
                ${payloadJson}
              )
              ON CONFLICT(provider_thread_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                owner_node_id = excluded.owner_node_id,
                provider = excluded.provider,
                driver = excluded.driver,
                provider_instance_id = excluded.provider_instance_id,
                provider_session_id = excluded.provider_session_id,
                status = excluded.status,
                first_run_ordinal = excluded.first_run_ordinal,
                last_run_ordinal = excluded.last_run_ordinal,
                updated_at = excluded.updated_at,
                payload_json = excluded.payload_json
            `;
          if (
            event.payload.appThreadId !== null &&
            !isQueuedProviderThreadPlaceholder(event.payload)
          ) {
            const threadRows = yield* sql<PayloadRow>`
                SELECT payload_json
                FROM orchestration_v2_projection_threads
                WHERE thread_id = ${event.payload.appThreadId}
                LIMIT 1
              `;
            const threadRow = threadRows[0];
            if (threadRow !== undefined) {
              const thread = yield* decodeThreadPayload(threadRow.payload_json);
              const updatedThread = {
                ...thread,
                activeProviderThreadId: event.payload.id,
                updatedAt: event.payload.updatedAt,
              };
              const updatedThreadPayloadJson = yield* encodeThreadPayload(updatedThread);
              yield* sql`
                  UPDATE orchestration_v2_projection_threads
                  SET
                    active_provider_thread_id = ${event.payload.id},
                    updated_at = ${stringField(parseEncodedPayload(updatedThreadPayloadJson), "updatedAt")},
                    payload_json = ${updatedThreadPayloadJson}
                  WHERE thread_id = ${event.payload.appThreadId}
                `;
            }
          }
          break;
        }
        case "provider-turn.updated": {
          const existingRows =
            event.payload.tokenUsage === undefined
              ? yield* sql<PayloadRow>`
                    SELECT payload_json
                    FROM orchestration_v2_projection_provider_turns
                    WHERE provider_turn_id = ${event.payload.id}
                    LIMIT 1
                  `
              : [];
          const existing = existingRows[0];
          const providerTurn =
            existing === undefined
              ? event.payload
              : upsertProviderTurn(
                  [yield* decodeProviderTurnPayload(existing.payload_json)],
                  event.payload,
                )[0]!;
          const payloadJson = yield* encodeProviderTurnPayload(providerTurn);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_provider_turns (
                provider_turn_id,
                thread_id,
                provider_thread_id,
                node_id,
                run_attempt_id,
                ordinal,
                status,
                started_at,
                completed_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.threadId},
                ${providerTurn.providerThreadId},
                ${providerTurn.nodeId},
                ${providerTurn.runAttemptId},
                ${providerTurn.ordinal},
                ${providerTurn.status},
                ${nullableStringField(payload, "startedAt")},
                ${nullableStringField(payload, "completedAt")},
                ${payloadJson}
              )
              ON CONFLICT(provider_turn_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                provider_thread_id = excluded.provider_thread_id,
                node_id = excluded.node_id,
                run_attempt_id = excluded.run_attempt_id,
                ordinal = excluded.ordinal,
                status = excluded.status,
                started_at = excluded.started_at,
                completed_at = excluded.completed_at,
                payload_json = excluded.payload_json
            `;
          break;
        }
        case "runtime-request.updated": {
          const payloadJson = yield* encodeRuntimeRequestPayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_runtime_requests (
                runtime_request_id,
                thread_id,
                node_id,
                provider_turn_id,
                kind,
                status,
                created_at,
                resolved_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.threadId},
                ${event.payload.nodeId},
                ${event.payload.providerTurnId},
                ${event.payload.kind},
                ${event.payload.status},
                ${stringField(payload, "createdAt")},
                ${nullableStringField(payload, "resolvedAt")},
                ${payloadJson}
              )
              ON CONFLICT(runtime_request_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                node_id = excluded.node_id,
                provider_turn_id = excluded.provider_turn_id,
                kind = excluded.kind,
                status = excluded.status,
                created_at = excluded.created_at,
                resolved_at = excluded.resolved_at,
                payload_json = excluded.payload_json
            `;
          break;
        }
        case "message.updated": {
          const payloadJson = yield* encodeMessagePayload(event.payload);
          const createdAt = yield* encodePayloadTimestamp(event.payload.createdAt);
          const updatedAt = yield* encodePayloadTimestamp(event.payload.updatedAt);
          yield* sql`
              INSERT INTO orchestration_v2_projection_messages (
                message_id,
                thread_id,
                run_id,
                node_id,
                role,
                streaming,
                created_at,
                updated_at,
                payload_json,
                search_text
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.runId},
                ${event.payload.nodeId},
                ${event.payload.role},
                ${booleanInt(event.payload.streaming)},
                ${createdAt},
                ${updatedAt},
                ${payloadJson},
                ${readableSearchText(event.payload.text)}
              )
              ON CONFLICT(message_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                run_id = excluded.run_id,
                node_id = excluded.node_id,
                role = excluded.role,
                streaming = excluded.streaming,
                created_at = excluded.created_at,
                updated_at = excluded.updated_at,
                payload_json = excluded.payload_json,
                search_text = excluded.search_text
            `;
          break;
        }
        case "plan.updated": {
          const payloadJson = yield* encodePlanPayload(event.payload);
          yield* sql`
              INSERT INTO orchestration_v2_projection_plans (
                plan_id,
                thread_id,
                run_id,
                node_id,
                kind,
                status,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.runId},
                ${event.payload.nodeId},
                ${event.payload.kind},
                ${event.payload.status},
                ${payloadJson}
              )
              ON CONFLICT(plan_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                run_id = excluded.run_id,
                node_id = excluded.node_id,
                kind = excluded.kind,
                status = excluded.status,
                payload_json = excluded.payload_json
            `;
          break;
        }
        case "turn-item.updated": {
          const payloadJson = yield* encodeTurnItemPayload(event.payload);
          const updatedAt = yield* encodePayloadTimestamp(event.payload.updatedAt);
          yield* sql`
              INSERT INTO orchestration_v2_projection_turn_items (
                turn_item_id,
                thread_id,
                run_id,
                node_id,
                provider_thread_id,
                provider_turn_id,
                parent_item_id,
                ordinal,
                type,
                status,
                updated_at,
                payload_json,
                inline_work_output
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.runId},
                ${event.payload.nodeId},
                ${event.payload.providerThreadId},
                ${event.payload.providerTurnId},
                ${event.payload.parentItemId},
                ${event.payload.ordinal},
                ${event.payload.type},
                ${event.payload.status},
                ${updatedAt},
                ${payloadJson},
                ${event.payload.type === "dynamic_tool" && isInlineWorkOutput(payloadJson) ? 1 : 0}
              )
              ON CONFLICT(turn_item_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                run_id = excluded.run_id,
                node_id = excluded.node_id,
                provider_thread_id = excluded.provider_thread_id,
                provider_turn_id = excluded.provider_turn_id,
                parent_item_id = excluded.parent_item_id,
                ordinal = excluded.ordinal,
                type = excluded.type,
                status = excluded.status,
                updated_at = excluded.updated_at,
                payload_json = excluded.payload_json,
                inline_work_output = excluded.inline_work_output
            `;
          break;
        }
        case "checkpoint-scope.created": {
          const payloadJson = yield* encodeCheckpointScopePayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_checkpoint_scopes (
                scope_id,
                thread_id,
                run_id,
                node_id,
                provider_thread_id,
                kind,
                ordinal_within_parent,
                advances_app_run_count,
                created_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.runId},
                ${event.payload.nodeId},
                ${event.payload.providerThreadId},
                ${event.payload.kind},
                ${event.payload.ordinalWithinParent},
                ${booleanInt(event.payload.advancesAppRunCount)},
                ${stringField(payload, "createdAt")},
                ${payloadJson}
              )
              ON CONFLICT(scope_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                run_id = excluded.run_id,
                node_id = excluded.node_id,
                provider_thread_id = excluded.provider_thread_id,
                kind = excluded.kind,
                ordinal_within_parent = excluded.ordinal_within_parent,
                advances_app_run_count = excluded.advances_app_run_count,
                created_at = excluded.created_at,
                payload_json = excluded.payload_json
            `;
          break;
        }
        case "checkpoint.captured": {
          const payloadJson = yield* encodeCheckpointPayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_checkpoints (
                checkpoint_id,
                thread_id,
                scope_id,
                run_id,
                node_id,
                ordinal_within_scope,
                app_run_ordinal,
                status,
                captured_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.scopeId},
                ${event.payload.runId},
                ${event.payload.nodeId},
                ${event.payload.ordinalWithinScope},
                ${event.payload.appRunOrdinal},
                ${event.payload.status},
                ${stringField(payload, "capturedAt")},
                ${payloadJson}
              )
              ON CONFLICT(checkpoint_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                scope_id = excluded.scope_id,
                run_id = excluded.run_id,
                node_id = excluded.node_id,
                ordinal_within_scope = excluded.ordinal_within_scope,
                app_run_ordinal = excluded.app_run_ordinal,
                status = excluded.status,
                captured_at = excluded.captured_at,
                payload_json = excluded.payload_json
            `;
          break;
        }
        case "checkpoint.rollback-requested":
          break;
        case "context-handoff.updated": {
          const payloadJson = yield* encodeContextHandoffPayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_context_handoffs (
                context_handoff_id,
                thread_id,
                target_run_id,
                to_provider_thread_id,
                strategy,
                status,
                updated_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.threadId},
                ${event.payload.targetRunId},
                ${event.payload.toProviderThreadId},
                ${event.payload.strategy},
                ${event.payload.status},
                ${stringField(payload, "updatedAt")},
                ${payloadJson}
              )
              ON CONFLICT(context_handoff_id)
              DO UPDATE SET
                thread_id = excluded.thread_id,
                target_run_id = excluded.target_run_id,
                to_provider_thread_id = excluded.to_provider_thread_id,
                strategy = excluded.strategy,
                status = excluded.status,
                updated_at = excluded.updated_at,
                payload_json = excluded.payload_json
            `;
          break;
        }
        case "context-transfer.created":
        case "context-transfer.updated": {
          const payloadJson = yield* encodeContextTransferPayload(event.payload);
          const payload = parseEncodedPayload(payloadJson);
          yield* sql`
              INSERT INTO orchestration_v2_projection_context_transfers (
                context_transfer_id,
                source_thread_id,
                target_thread_id,
                target_run_id,
                type,
                status,
                updated_at,
                payload_json
              )
              VALUES (
                ${event.payload.id},
                ${event.payload.sourceThreadId},
                ${event.payload.targetThreadId},
                ${event.payload.targetRunId},
                ${event.payload.type},
                ${event.payload.status},
                ${stringField(payload, "updatedAt")},
                ${payloadJson}
              )
              ON CONFLICT(context_transfer_id)
              DO UPDATE SET
                source_thread_id = excluded.source_thread_id,
                target_thread_id = excluded.target_thread_id,
                target_run_id = excluded.target_run_id,
                type = excluded.type,
                status = excluded.status,
                updated_at = excluded.updated_at,
                payload_json = excluded.payload_json
            `;
          break;
        }
      }

      if (
        event.type !== "thread.created" &&
        event.type !== "thread.archived" &&
        event.type !== "thread.unarchived" &&
        event.type !== "thread.deleted" &&
        event.type !== "thread.settled" &&
        event.type !== "thread.unsettled" &&
        event.type !== "thread.snoozed" &&
        event.type !== "thread.unsnoozed" &&
        event.type !== "thread.auto-settle-set" &&
        event.type !== "thread.pinned" &&
        event.type !== "thread.unpinned" &&
        event.type !== "thread.pin-reordered" &&
        event.type !== "thread.active-reordered" &&
        event.type !== "thread.tags-updated" &&
        event.type !== "thread.visited" &&
        event.type !== "thread.visit-recorded" &&
        event.type !== "thread.marked-unread" &&
        event.type !== "thread.metadata-updated" &&
        event.type !== "thread.pull-request-synced" &&
        event.type !== "thread.issue-synced" &&
        event.type !== "thread.pull-request-link-updated" &&
        event.type !== "thread.runtime-mode-updated" &&
        event.type !== "thread.interaction-mode-updated" &&
        event.type !== "thread.model-selection-updated" &&
        event.type !== "thread.provider-switched" &&
        event.type !== "thread.guest-share-updated"
      ) {
        const updatedAt = yield* encodeThreadUpdatedAt(event.occurredAt);
        if (batch !== undefined) batch.threadTouches.set(event.threadId, updatedAt);
        else yield* writeThreadTouches(sql, new Map([[event.threadId, updatedAt]]));
      }
    },
    (effect, event) =>
      effect.pipe(
        Effect.mapError(
          (cause) =>
            new ProjectionStoreApplyEventError({
              eventType: event.type,
              cause,
            }),
        ),
      ),
  );
