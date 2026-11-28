// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ProjectionStore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
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

export const bindGetTimelinePage = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      ProjectionStoreReadError,
      decodeTurnItemPayload,
      encodeTimelineSources,
      isProjectionStoreReadError,
      isProjectionStoreThreadNotFoundError,
      openLocalTimeline,
      readLocalTimelinePage,
      readSnapshotTimelineIndex,
      sql,
    } = pickScriptcBindCtx(ctx);
    const __fn = (threadId, options) =>
      sql
        .withTransaction(
          Effect.gen(function* () {
            const local =
              options.attachmentId === undefined &&
              Number.isSafeInteger(options.limit) &&
              options.limit >= 0 &&
              Number.isSafeInteger(options.afterPosition ?? -1) &&
              (options.beforePosition === undefined ||
                options.beforePosition === Number.POSITIVE_INFINITY ||
                Number.isSafeInteger(options.beforePosition))
                ? yield* openLocalTimeline(threadId)
                : null;
            const whole = Effect.gen(function* () {
              const index = yield* readSnapshotTimelineIndex(threadId, false);
              const attachmentOwners =
                options.attachmentId === undefined
                  ? undefined
                  : new Set(
                      (yield* sql<{ thread_id: string; turn_item_id: string }>`
          SELECT item.thread_id, item.turn_item_id
          FROM orchestration_v2_projection_turn_items AS item,
            json_each(item.payload_json, '$.attachments') AS attachment
          WHERE item.thread_id IN ${sql.in([...new Set(index.visible.map((row) => row.sourceThreadId))])}
            AND item.type = 'user_message'
            AND json_extract(attachment.value, '$.id') = ${options.attachmentId}`).map(
                        (row) => `${row.thread_id}:${row.turn_item_id}`,
                      ),
                    );
              const inView = index.visible
                .map((row, position) => ({ ...row, position }))
                .filter((row) =>
                  options.itemId === undefined
                    ? options.view === "activity" ||
                      ["user_message", "assistant_message", "proposed_plan"].includes(row.item.type)
                    : row.sourceItemId === options.itemId,
                )
                .filter(
                  (row) =>
                    attachmentOwners?.has(`${row.sourceThreadId}:${row.sourceItemId}`) ?? true,
                );
              const before = options.beforePosition ?? Number.POSITIVE_INFINITY;
              const matching =
                options.itemId === undefined
                  ? inView.filter(
                      (row) =>
                        row.position > (options.afterPosition ?? -1) && row.position < before,
                    )
                  : inView;
              const page =
                options.beforePosition === undefined
                  ? matching.slice(0, options.limit)
                  : matching.slice(Math.max(0, matching.length - options.limit));
              const pageStart = page[0]?.position ?? (options.afterPosition ?? -1) + 1;
              return {
                page,
                totalItems: index.visible.length,
                hasMore:
                  options.beforePosition === undefined
                    ? matching.length > page.length
                    : (inView.at(-1)?.position ?? -1) >= before,
                hasEarlier: (inView[0]?.position ?? Number.POSITIVE_INFINITY) < pageStart,
              };
            });
            const { page, totalItems, hasMore, hasEarlier } =
              local === null ? yield* whole : yield* readLocalTimelinePage(local, options);
            const sources = yield* encodeTimelineSources(
              page
                .filter((row) => row.synthetic === undefined)
                .map((row) => ({ threadId: row.sourceThreadId, id: row.sourceItemId })),
            );
            const payloads = yield* sql<{
              thread_id: string;
              turn_item_id: string;
              payload_json: string;
            }>`
          SELECT item.thread_id, item.turn_item_id, item.payload_json
          FROM orchestration_v2_projection_turn_items item JOIN json_each(${sources}) wanted
          ON item.thread_id = json_extract(wanted.value, '$.threadId')
            AND item.turn_item_id = json_extract(wanted.value, '$.id')`;
            const byIdentity = new Map(
              payloads.map((row) => [`${row.thread_id}:${row.turn_item_id}`, row.payload_json]),
            );
            const items = yield* Effect.forEach(page, (row) =>
              Effect.gen(function* () {
                if (row.synthetic !== undefined)
                  return {
                    position: row.position,
                    sourceThreadId: row.sourceThreadId,
                    sourceItemId: row.sourceItemId,
                    visibility: row.visibility,
                    item: row.synthetic,
                  };
                const payload = byIdentity.get(`${row.sourceThreadId}:${row.sourceItemId}`);
                if (payload === undefined)
                  return yield* new ProjectionStoreReadError({
                    threadId,
                    cause: "Timeline item disappeared during snapshot",
                  });
                const item = yield* decodeTurnItemPayload(payload).pipe(
                  Effect.mapError(
                    (cause) =>
                      new ProjectionStoreReadError({ threadId: row.sourceThreadId, cause }),
                  ),
                );
                return {
                  position: row.position,
                  sourceThreadId: row.sourceThreadId,
                  sourceItemId: row.sourceItemId,
                  visibility: row.visibility,
                  item,
                };
              }),
            );
            return { items, totalItems, hasMore, hasEarlier };
          }),
        )
        .pipe(Effect.mapError((cause) => new ProjectionStoreReadError({ threadId, cause })));
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
