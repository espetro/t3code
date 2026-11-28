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

import type { PayloadRow, ProjectionCheckpointRollbackContext } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetCheckpointRollbackContext = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      controlReadError,
      decodeCheckpointPayload,
      decodeCheckpointScopePayload,
      decodeNodePayload,
      decodeProviderSessionPayload,
      decodeProviderThreadPayload,
      decodeProviderTurnPayload,
      decodeRollbackTargetAttempts,
      decodeRows,
      decodeRunPayload,
      getThread,
      sql,
      nodesOwningProviderThreads,
    } = pickScriptcBindCtx(ctx);
    const __fn = (threadId, target) =>
      sql
        .withTransaction(
          Effect.gen(function* () {
            const thread = yield* getThread(threadId);
            const [providerRows, checkpointRows, scopeRows] = yield* Effect.all([
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_provider_threads
            WHERE provider_thread_id = ${target.providerThreadId}
              AND (thread_id = ${threadId}
                OR owner_node_id IN (${nodesOwningProviderThreads(threadId)})
                OR provider_thread_id IN (SELECT provider_thread_id FROM orchestration_v2_projection_subagents WHERE thread_id = ${threadId}))`,
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_checkpoints
            WHERE thread_id = ${threadId} AND checkpoint_id = ${target.checkpointId}`,
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_checkpoint_scopes
            WHERE thread_id = ${threadId} AND scope_id = ${target.scopeId}`,
            ]);
            const providerThread =
              providerRows[0] === undefined
                ? undefined
                : yield* decodeProviderThreadPayload(providerRows[0].payload_json);
            const checkpoint =
              checkpointRows[0] === undefined
                ? undefined
                : yield* decodeCheckpointPayload(checkpointRows[0].payload_json);
            const scope =
              scopeRows[0] === undefined
                ? undefined
                : yield* decodeCheckpointScopePayload(scopeRows[0].payload_json);
            const context: ProjectionCheckpointRollbackContext = {
              thread,
              providerThread,
              checkpoint,
              scope,
              providerSession: undefined,
              targetAttempt: undefined,
              providerTurns: [],
              rolledBackAttemptIds: [],
              runsToRollback: [],
              rootNodes: [],
              staleCheckpoints: [],
            };
            if (
              providerThread === undefined ||
              providerThread.providerSessionId === null ||
              checkpoint === undefined ||
              scope === undefined ||
              checkpoint.scopeId !== scope.id ||
              checkpoint.status === "stale" ||
              providerThread.id !== thread.activeProviderThreadId ||
              providerThread.providerInstanceId !== thread.modelSelection.instanceId
            )
              return context;

            const targetOrdinal = checkpoint.appRunOrdinal ?? 0;
            const [attemptRows, runRows, sessionRows, rolledBackAttempts, staleRows] =
              yield* Effect.all([
                sql`SELECT attempt.attempt_id AS id, attempt.provider_turn_id AS "providerTurnId"
            FROM orchestration_v2_projection_run_attempts AS attempt
            JOIN orchestration_v2_projection_runs AS run
              ON attempt.attempt_id = json_extract(run.payload_json, '$.activeAttemptId')
            WHERE run.thread_id = ${threadId} AND run.ordinal = ${targetOrdinal}
              AND run.status != 'rolled_back' AND attempt.thread_id = ${threadId}`,
                sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_runs
            WHERE thread_id = ${threadId} AND ordinal > ${targetOrdinal}
              AND status IN ('completed', 'interrupted', 'failed', 'cancelled')
            ORDER BY ordinal ASC`,
                sql<PayloadRow>`SELECT session.payload_json
            FROM orchestration_v2_projection_provider_sessions AS session
            JOIN orchestration_v2_projection_provider_session_bindings AS binding
              ON binding.provider_session_id = session.provider_session_id
            WHERE binding.thread_id = ${threadId}
              AND session.provider_session_id = ${providerThread.providerSessionId}`,
                sql<{ readonly id: RunAttemptId }>`SELECT attempt.attempt_id AS id
            FROM orchestration_v2_projection_run_attempts AS attempt
            JOIN orchestration_v2_projection_runs AS run ON run.run_id = attempt.run_id
            WHERE run.thread_id = ${threadId} AND run.status = 'rolled_back'
              AND attempt.thread_id = ${threadId}`,
                sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_checkpoints
            WHERE thread_id = ${threadId} AND status = 'ready'
              AND ((scope_id = ${scope.id} AND app_run_ordinal > ${targetOrdinal})
                -- Repository checkpoints carry no app run ordinal; theirs is the run's ordinal.
                OR (ordinal_within_scope > ${targetOrdinal} AND scope_id IN (
                  SELECT scope_id FROM orchestration_v2_projection_checkpoint_scopes
                  WHERE thread_id = ${threadId} AND kind = 'manual')))
            ORDER BY scope_id = ${scope.id} DESC, scope_id ASC, ordinal_within_scope ASC`,
              ]);
            const targetAttempt = (yield* decodeRollbackTargetAttempts(attemptRows))[0];
            const runsToRollback = yield* decodeRows(decodeRunPayload, threadId)(runRows);
            const [nodeRows, turnRows] = yield* Effect.all([
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_nodes
            WHERE thread_id = ${threadId} AND ${sql.in(
              "node_id",
              runsToRollback.map((run) => run.rootNodeId),
            )}
            ORDER BY node_id ASC`,
              sql<PayloadRow>`SELECT payload_json FROM orchestration_v2_projection_provider_turns
            WHERE thread_id = ${threadId} AND (
              provider_thread_id = ${providerThread.id}
              OR provider_turn_id = ${targetAttempt?.providerTurnId ?? null}
              OR run_attempt_id = ${targetAttempt?.id ?? null})
            ORDER BY provider_thread_id ASC, ordinal ASC`,
            ]);
            return {
              ...context,
              targetAttempt,
              runsToRollback,
              providerSession:
                sessionRows[0] === undefined
                  ? undefined
                  : yield* decodeProviderSessionPayload(sessionRows[0].payload_json),
              rolledBackAttemptIds: rolledBackAttempts.map(({ id }) => id),
              rootNodes: yield* decodeRows(decodeNodePayload, threadId)(nodeRows),
              providerTurns: yield* decodeRows(decodeProviderTurnPayload, threadId)(turnRows),
              staleCheckpoints: yield* decodeRows(decodeCheckpointPayload, threadId)(staleRows),
            };
          }),
        )
        .pipe(Effect.mapError(controlReadError(threadId)));
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
