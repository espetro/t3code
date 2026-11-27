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

import type { AgentAwarenessThread } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetAgentAwarenessSnapshot = (ctx: any) =>
  Effect.fn("ProjectionStore.getAgentAwarenessSnapshot")(function* (threadId?: ThreadId) {
    const {
      pendingBackgroundDataByThreadId,
      selectShellPendingTurnItemRows,
      selectShellProviderThreadRows,
      selectShellThreadRows,
      shellSnapshotReadError,
      shellThreadStateFromRow,
      sql,
    } = pickScriptcBindCtx(ctx);

    const { threadRows, providerThreadRows, pendingTurnItemRows, sequenceRows } =
      yield* sql.withTransaction(
        Effect.gen(function* () {
          const threadRows = yield* selectShellThreadRows(
            threadId,
            threadId === undefined ? { location: "active", listedOnly: true } : {},
          );
          const ids = threadRows.map((row) => ThreadId.make(row.thread_id));
          const providerThreadRows =
            ids.length === 0 ? [] : yield* selectShellProviderThreadRows(ids);
          const pendingTurnItemRows =
            ids.length === 0
              ? []
              : yield* selectShellPendingTurnItemRows(
                  ids,
                  threadRows.flatMap((row) =>
                    row.active_run_id !== null && row.active_run_status === "running"
                      ? [row.active_run_id]
                      : [],
                  ),
                );
          const sequenceRows = yield* sql<{ readonly snapshot_sequence: number | null }>`
              SELECT MAX(sequence) AS snapshot_sequence FROM orchestration_events
              WHERE application_event_version = 2 AND aggregate_kind = 'thread'
            `;
          return { threadRows, providerThreadRows, pendingTurnItemRows, sequenceRows };
        }),
      );
    const { providerThreadsByThreadId, pendingTurnItemsByThreadId } =
      yield* pendingBackgroundDataByThreadId({ providerThreadRows, pendingTurnItemRows });
    const threads = yield* Effect.forEach(threadRows, (row) =>
      shellThreadStateFromRow({
        row,
        // Awareness never consumes timeline counts or inherited fork history.
        runsByThreadId: new Map(),
        itemCountsByThreadId: new Map(),
        shellItemCountsByThreadId: new Map(),
        providerThreadsByThreadId,
        pendingTurnItemsByThreadId,
      }).pipe(
        Effect.map((state): AgentAwarenessThread => ({
          id: state.thread.id,
          projectId: state.thread.projectId,
          creationSource: state.thread.creationSource,
          archivedAt: state.thread.archivedAt,
          snoozedUntil: state.thread.snoozedUntil ?? null,
          snoozedAt: state.thread.snoozedAt ?? null,
          pendingGuestMessageCount: pendingGuestMessageCount(state.thread.guestShare),
          activeRunId: state.activeRunId,
          latestRunId: state.latestRunId,
          hasActionableProposedPlan: state.hasActionableProposedPlan,
          title: state.thread.title,
          lineage: state.thread.lineage,
          modelSelection: state.thread.modelSelection,
          settledOverride: state.thread.settledOverride,
          updatedAt: state.updatedAt,
          status: state.latestRunStatus,
          activityRunStatus: state.activityRunStatus,
          latestRunCompletedAt: state.latestRunCompletedAt,
          latestRunStopRequested: state.latestRunStopRequested,
          latestRunBackgroundWake: state.latestRunBackgroundWake,
          pendingRuntimeRequest: state.pendingRuntimeRequest,
          pendingBackgroundTasks: state.pendingBackgroundTasks,
        })),
      ),
    );
    return { snapshotSequence: sequenceRows[0]?.snapshot_sequence ?? 0, threads };
  }, Effect.mapError(shellSnapshotReadError));
