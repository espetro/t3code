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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetUnreadableThreadIds = (ctx: any) =>
  Effect.fn("ProjectionStore.getUnreadableThreadIds")(
    function* () {
      const {
        ProjectionStoreSetupError,
        decodeCheckpointPayload,
        decodeCheckpointScopePayload,
        decodeContextHandoffPayload,
        decodeContextTransferPayload,
        decodeMessagePayload,
        decodeNodePayload,
        decodePlanJson,
        decodeProviderSessionPayload,
        decodeProviderThreadPayload,
        decodeProviderTurnPayload,
        decodeRunAttemptPayload,
        decodeRunPayload,
        decodeRuntimeRequestPayload,
        decodeSubagentPayload,
        decodeThreadPayload,
        decodeTurnItemPayload,
        sql,
      } = pickScriptcBindCtx(ctx);

      const actualThreadIds = new Set<ThreadId>();
      const unreadable = new Set<ThreadId>();
      const forkChildren = new Map<ThreadId, Array<ThreadId>>();
      const tables: ReadonlyArray<{
        readonly name: string;
        readonly id: string;
        readonly decode: (payload: string, entityId: string) => Effect.Effect<unknown, unknown>;
      }> = [
        {
          name: "threads",
          id: "thread_id",
          decode: (payload: string, entityId: string) =>
            decodeThreadPayload(payload).pipe(
              Effect.tap((thread) =>
                Effect.sync(() => {
                  if (thread.forkedFrom?.type !== "run") return;
                  const sourceId = thread.forkedFrom.threadId;
                  const children = forkChildren.get(sourceId) ?? [];
                  children.push(ThreadId.make(entityId));
                  forkChildren.set(sourceId, children);
                }),
              ),
            ),
        },
        { name: "runs", id: "run_id", decode: (payload) => decodeRunPayload(payload) },
        {
          name: "run_attempts",
          id: "attempt_id",
          decode: (payload) => decodeRunAttemptPayload(payload),
        },
        { name: "nodes", id: "node_id", decode: (payload) => decodeNodePayload(payload) },
        {
          name: "subagents",
          id: "subagent_id",
          decode: (payload) => decodeSubagentPayload(payload),
        },
        {
          name: "provider_sessions",
          id: "provider_session_id",
          decode: (payload) => decodeProviderSessionPayload(payload),
        },
        {
          name: "provider_threads",
          id: "provider_thread_id",
          decode: (payload) => decodeProviderThreadPayload(payload),
        },
        {
          name: "provider_turns",
          id: "provider_turn_id",
          decode: (payload) => decodeProviderTurnPayload(payload),
        },
        {
          name: "runtime_requests",
          id: "runtime_request_id",
          decode: (payload) => decodeRuntimeRequestPayload(payload),
        },
        {
          name: "messages",
          id: "message_id",
          decode: (payload) => decodeMessagePayload(payload),
        },
        { name: "plans", id: "plan_id", decode: (payload) => decodePlanJson(payload) },
        {
          name: "turn_items",
          id: "turn_item_id",
          decode: (payload) => decodeTurnItemPayload(payload),
        },
        {
          name: "checkpoint_scopes",
          id: "scope_id",
          decode: (payload) => decodeCheckpointScopePayload(payload),
        },
        {
          name: "checkpoints",
          id: "checkpoint_id",
          decode: (payload) => decodeCheckpointPayload(payload),
        },
        {
          name: "context_handoffs",
          id: "context_handoff_id",
          decode: (payload) => decodeContextHandoffPayload(payload),
        },
        {
          name: "context_transfers",
          id: "context_transfer_id",
          decode: (payload) => decodeContextTransferPayload(payload),
        },
      ];
      const pageSize = 500;
      for (const table of tables) {
        let afterRowId = 0;
        while (true) {
          const rows = yield* sql<{
            readonly row_id: number;
            readonly entity_id: string;
            readonly thread_id: string | null;
            readonly target_thread_id: string | null;
            readonly payload_json: string;
          }>`
              SELECT rowid AS row_id, ${sql(table.id)} AS entity_id,
                ${sql(table.name === "context_transfers" ? "source_thread_id" : "thread_id")} AS thread_id,
                ${table.name === "context_transfers" ? sql`target_thread_id` : sql`NULL`} AS target_thread_id,
                payload_json
              FROM ${sql(`orchestration_v2_projection_${table.name}`)}
              WHERE rowid > ${afterRowId}
              ORDER BY rowid ASC LIMIT ${pageSize}
            `;
          for (const row of rows) {
            if (table.name === "threads") actualThreadIds.add(ThreadId.make(row.entity_id));
            const decoded = yield* Effect.exit(
              Effect.suspend(() => table.decode(row.payload_json, row.entity_id)),
            );
            if (decoded._tag === "Success") continue;
            if (table.name === "provider_sessions") {
              const bindings = yield* sql<{ readonly thread_id: string }>`
                  SELECT thread_id FROM orchestration_v2_projection_provider_session_bindings
                  WHERE provider_session_id = ${row.entity_id}
                `;
              for (const binding of bindings) unreadable.add(ThreadId.make(binding.thread_id));
            } else {
              if (row.thread_id !== null) unreadable.add(ThreadId.make(row.thread_id));
              if (row.target_thread_id !== null)
                unreadable.add(ThreadId.make(row.target_thread_id));
            }
            if (table.name === "provider_threads") {
              const owners = yield* sql<{ readonly thread_id: string }>`
                  SELECT thread_id FROM orchestration_v2_projection_nodes
                  WHERE node_id = (
                    SELECT owner_node_id FROM orchestration_v2_projection_provider_threads
                    WHERE provider_thread_id = ${row.entity_id}
                  )
                  UNION
                  SELECT thread_id FROM orchestration_v2_projection_subagents
                  WHERE provider_thread_id = ${row.entity_id}
                `;
              for (const owner of owners) unreadable.add(ThreadId.make(owner.thread_id));
            }
          }
          if (rows.length < pageSize) break;
          afterRowId = rows[rows.length - 1]!.row_id;
          yield* Effect.yieldNow;
        }
      }
      const pending = [
        ...unreadable,
        ...[...forkChildren.keys()].filter((sourceId) => !actualThreadIds.has(sourceId)),
      ];
      for (let index = 0; index < pending.length; index += 1) {
        for (const childId of forkChildren.get(pending[index]!) ?? []) {
          if (unreadable.has(childId)) continue;
          unreadable.add(childId);
          pending.push(childId);
        }
      }
      return [...unreadable].filter((threadId) => actualThreadIds.has(threadId)).sort();
    },
    Effect.mapError((cause) => new ProjectionStoreSetupError({ cause })),
  );
