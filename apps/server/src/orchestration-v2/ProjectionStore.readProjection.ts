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

import type { ProjectionStoreV2Error, ProjectionWindow } from "./ProjectionStore.ts";

export const bindReadProjection = (ctx: any) => {
  const {
    isProjectionStoreReadError,
    isProjectionStoreThreadNotFoundError,
    ProjectionStoreReadError,
  } = pickScriptcBindCtx(ctx);
  return Effect.fn("ProjectionStore.readProjection")(
    function* (
      threadId: ThreadId,
      seenThreadIds: ReadonlySet<ThreadId>,
      window?: ProjectionWindow,
    ) {
      const {
        ProjectionStoreReadError,
        ProjectionStoreV2Error,
        activeLocalTurnItems,
        buildVisibleTurnItems,
        encodeForkRunIds,
        forkRunIdsJson,
        getForkSourceRunIds,
        inheritedRunFork,
        isProjectionStoreReadError,
        isProjectionStoreThreadNotFoundError,
        readCanonicalProjection,
        sql,
        withLocalVisibleTurnItems,
        readProjection,
        retainedWindowRows,
      } = pickScriptcBindCtx(ctx);

      const localWindow =
        window?.suppressLocal === true ||
        (window?.historyAnchor !== undefined && window.historyAnchor.threadId !== threadId)
          ? { ...window, rowLimit: 0, anchorItemId: undefined }
          : window;
      const projection = yield* readCanonicalProjection(
        threadId,
        localWindow,
        window !== undefined && seenThreadIds.size > 0
          ? ["runs", "attempts", "turnItems"]
          : undefined,
      );
      const forkedFrom = inheritedRunFork(projection.thread);
      if (forkedFrom === null || seenThreadIds.has(forkedFrom.threadId)) {
        return withLocalVisibleTurnItems(projection);
      }

      // Page unanchored local segments fully before inherited turns affect the boundary.
      if (
        window?.userTurnLimit !== undefined &&
        localWindow !== undefined &&
        localWindow.rowLimit > 0 &&
        projection.turnItems.length >= localWindow.rowLimit &&
        !projection.turnItems.some(isThreadHistoryUserTurn)
      ) {
        return withLocalVisibleTurnItems(projection);
      }

      const inheritedRunIds = yield* getForkSourceRunIds(threadId);
      const sourceWindow =
        window === undefined
          ? undefined
          : yield* Effect.gen(function* () {
              const historyAnchor = window.historyAnchor;
              const anchorBelongsToSource = historyAnchor?.threadId === forkedFrom.threadId;
              const rows = yield* sql<{ readonly turn_item_id: string }>`
                  WITH fork_run AS (
                    SELECT ordinal
                    FROM orchestration_v2_projection_runs
                    WHERE thread_id = ${forkedFrom.threadId}
                      AND run_id = ${forkedFrom.runId}
                    LIMIT 1
                  ), fork_boundary AS (
                    SELECT (
                      SELECT item.ordinal
                      FROM orchestration_v2_projection_turn_items AS item
                      WHERE item.run_id = run.run_id
                      ORDER BY item.ordinal DESC
                      LIMIT 1
                    ) AS ordinal
                    FROM orchestration_v2_projection_runs AS run
                    WHERE run.thread_id = ${forkedFrom.threadId}
                      AND run.ordinal <= (SELECT ordinal FROM fork_run)
                      AND EXISTS (
                        SELECT 1
                        FROM orchestration_v2_projection_turn_items AS item
                        WHERE item.run_id = run.run_id
                        LIMIT 1
                      )
                    ORDER BY run.ordinal DESC
                    LIMIT 1
                  ), effective_boundary AS (
                    SELECT COALESCE(
                      (SELECT ordinal FROM fork_boundary),
                      (
                        SELECT ordinal
                        FROM orchestration_v2_projection_turn_items
                        WHERE thread_id = ${forkedFrom.threadId}
                          AND run_id IS NULL
                          AND json_extract(payload_json, '$.historyOrigin') = 'v1_import'
                        ORDER BY ordinal DESC, turn_item_id DESC
                        LIMIT 1
                      ),
                      -1
                    ) AS ordinal
                  )
                  SELECT turn_item_id
                  FROM orchestration_v2_projection_turn_items
                  WHERE thread_id = ${forkedFrom.threadId}
                    AND ordinal <= COALESCE(
                      (SELECT ordinal FROM effective_boundary),
                      -1
                    )
                    AND (
                      ${anchorBelongsToSource ? 1 : 0} = 0
                      OR ordinal <= COALESCE(
                        (SELECT ordinal FROM orchestration_v2_projection_turn_items
                         WHERE thread_id = ${forkedFrom.threadId}
                           AND turn_item_id = ${historyAnchor?.itemId ?? null}
                         LIMIT 1),
                        (SELECT ordinal FROM effective_boundary),
                        -1
                      )
                    )
                  ORDER BY ordinal DESC, turn_item_id DESC
                  LIMIT 1
                `;
              const anchor = rows[0]?.turn_item_id;
              const anchorIsInDescendant =
                historyAnchor !== undefined &&
                historyAnchor.threadId !== threadId &&
                historyAnchor.threadId !== forkedFrom.threadId;
              return {
                rowLimit: window.rowLimit,
                userTurnLimit: window.userTurnLimit,
                deferWork: window.deferWork,
                requiredRunId: forkedFrom.runId,
                forkRunIdsJson: yield* encodeForkRunIds(inheritedRunIds),
                suppressLocal: anchor === undefined || anchorIsInDescendant,
                ...(anchor === undefined || anchorIsInDescendant
                  ? {}
                  : { anchorItemId: TurnItemId.make(anchor) }),
                ...(historyAnchor === undefined || historyAnchor.threadId === threadId
                  ? {}
                  : { historyAnchor }),
              };
            });

      // Filled local pages need only the inherited count for cursor positions.
      // Run-forked parents still need the recursive read to include their ancestry.
      if (
        window?.userTurnLimit !== undefined &&
        window.historyAnchor === undefined &&
        seenThreadIds.size === 0 &&
        sourceWindow !== undefined &&
        activeLocalTurnItems(projection).filter((row) => isThreadHistoryUserTurn(row.item))
          .length >= Math.max(window.userTurnLimit, THREAD_HISTORY_PAGE_POLICY.maxUserTurns)
      ) {
        const counted = yield* sql<{ readonly inherited_rows: number | null }>`
            ${yield* retainedWindowRows(forkedFrom.threadId, {
              ...sourceWindow,
              rowLimit: sourceWindow.suppressLocal ? 0 : sourceWindow.rowLimit,
            })}
            SELECT CASE
              WHEN json_extract(source.payload_json, '$.forkedFrom.type') = 'run' THEN NULL
              WHEN NOT EXISTS (
                SELECT 1 FROM orchestration_v2_projection_runs
                WHERE thread_id = source.thread_id AND run_id = ${forkedFrom.runId}
              ) THEN 0
              ELSE (SELECT COUNT(*) FROM retained)
            END AS inherited_rows
            FROM orchestration_v2_projection_threads AS source
            WHERE source.thread_id = ${forkedFrom.threadId}
          `;
        const inheritedRowCount = counted[0]?.inherited_rows ?? null;
        if (inheritedRowCount !== null) {
          return {
            ...projection,
            visibleTurnItems: buildVisibleTurnItems({
              projection,
              sourceProjection: null,
              inheritedRowCount,
            }),
          };
        }
      }

      const sourceProjection = yield* readProjection(
        forkedFrom.threadId,
        new Set([...seenThreadIds, threadId]),
        sourceWindow,
      );
      return {
        ...projection,
        visibleTurnItems: buildVisibleTurnItems({
          projection,
          sourceProjection,
          inheritedRunIds,
        }),
      };
    },
    (effect, threadId, _seenThreadIds, _window) =>
      effect.pipe(Effect.mapError((cause) => new ProjectionStoreReadError({ threadId, cause }))),
  );
};
