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

import type { PayloadRow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetCheckpointCaptureContext = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      ProjectionStoreThreadNotFoundError,
      controlReadError,
      decodeCheckpointScopePayload,
      decodeNodePayload,
      decodeProviderThreadPayload,
      decodeRows,
      decodeRunPayload,
      sql,
      nodesOwningProviderThreads,
    } = pickScriptcBindCtx(ctx);
    const __fn = (threadId, target) =>
      sql
        .withTransaction(
          Effect.gen(function* () {
            const threadRows = yield* sql<{
              readonly side_chat: number | null;
              readonly project_id: ProjectId;
              readonly worktree_path: string | null;
            }>`
          SELECT json_extract(payload_json, '$.lineage.sideChat') AS side_chat,
            json_extract(payload_json, '$.projectId') AS project_id,
            json_extract(payload_json, '$.worktreePath') AS worktree_path
          FROM orchestration_v2_projection_threads WHERE thread_id = ${threadId} LIMIT 1`;
            if (threadRows[0] === undefined) {
              return yield* new ProjectionStoreThreadNotFoundError({ threadId });
            }
            const runRows = yield* sql<PayloadRow>`
          SELECT payload_json FROM orchestration_v2_projection_runs
          WHERE thread_id = ${threadId} AND run_id = ${target.runId}`;
            const run =
              runRows[0] === undefined
                ? undefined
                : yield* decodeRunPayload(runRows[0].payload_json);
            const preservedCheckpoint = sql`(status = 'ready' OR (status IN ('missing', 'error') AND run_id IS NOT NULL))`;
            const [
              nodeRows,
              scopeRows,
              providerRows,
              preservedRows,
              repositoryScopeRows,
              repositoryBaselineRows,
            ] = yield* Effect.all([
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_nodes
            WHERE thread_id = ${threadId} AND node_id = ${run?.rootNodeId ?? null}`,
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_checkpoint_scopes
            WHERE thread_id = ${threadId} AND scope_id = ${target.scopeId}`,
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_provider_threads
            WHERE provider_thread_id = ${run?.providerThreadId ?? null}
              AND (thread_id = ${threadId}
                OR owner_node_id IN (${nodesOwningProviderThreads(threadId)})
                OR provider_thread_id IN (SELECT provider_thread_id FROM orchestration_v2_projection_subagents WHERE thread_id = ${threadId}))`,
              sql<{ readonly ordinal: number }>`SELECT ordinal_within_scope AS ordinal
            FROM orchestration_v2_projection_checkpoints
            WHERE thread_id = ${threadId} AND scope_id = ${target.scopeId}
              AND ${preservedCheckpoint}`,
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_checkpoint_scopes
            WHERE thread_id = ${threadId} AND kind = 'manual' ORDER BY scope_id ASC`,
              sql<{ readonly scope_id: CheckpointScopeId }>`SELECT scope_id
            FROM orchestration_v2_projection_checkpoints
            WHERE thread_id = ${threadId}
              AND ordinal_within_scope = ${Math.max(0, (run?.ordinal ?? 0) - 1)}
              AND scope_id IN (SELECT scope_id FROM orchestration_v2_projection_checkpoint_scopes
                WHERE thread_id = ${threadId} AND kind = 'manual')
              AND ${preservedCheckpoint}`,
            ]);
            return {
              run,
              rootNode:
                nodeRows[0] === undefined
                  ? undefined
                  : yield* decodeNodePayload(nodeRows[0].payload_json),
              scope:
                scopeRows[0] === undefined
                  ? undefined
                  : yield* decodeCheckpointScopePayload(scopeRows[0].payload_json),
              providerThread:
                providerRows[0] === undefined
                  ? undefined
                  : yield* decodeProviderThreadPayload(providerRows[0].payload_json),
              preservedCheckpointOrdinals: preservedRows.map(({ ordinal }) => ordinal),
              sideChat: threadRows[0].side_chat === 1,
              thread: {
                projectId: threadRows[0].project_id,
                worktreePath: threadRows[0].worktree_path,
              },
              repositoryScopes: yield* decodeRows(
                decodeCheckpointScopePayload,
                threadId,
              )(repositoryScopeRows),
              repositoryScopesWithBaseline: repositoryBaselineRows.map((row) => row.scope_id),
            };
          }),
        )
        .pipe(Effect.mapError(controlReadError(threadId)));
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
