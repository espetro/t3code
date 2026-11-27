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

import type { PayloadRow } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindGetThreadHistoryPage = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      ProjectionStoreReadError,
      ProjectionStoreThreadNotFoundError,
      controlReadError,
      decodeRows,
      decodeSubagentPayload,
      decodeTurnItemPayload,
      encodeTimelineSources,
      openLocalTimeline,
      readSnapshotTimelineIndex,
      selectHistoryPageInWindow,
      sql,
      olderUserTurn,
      encodeIdList,
    } = pickScriptcBindCtx(ctx);
    const __fn = (threadId, cursor, throughEntryId, conversationOnly, workMode) =>
      sql
        .withTransaction(
          Effect.gen(function* () {
            const withWork = workMode !== undefined;
            // A jump to a target entry selects from the whole index.
            const local =
              (workMode === "work") === (throughEntryId !== undefined)
                ? yield* openLocalTimeline(threadId, withWork)
                : null;
            const full =
              local === null ? yield* readSnapshotTimelineIndex(threadId, withWork) : null;
            if ((local ?? full)?.records.thread.deletedAt !== null)
              return yield* new ProjectionStoreThreadNotFoundError({ threadId });
            const revisions = yield* sql<{
              sequence: number;
            }>`SELECT COALESCE(MAX(sequence), 0) AS sequence
          FROM orchestration_events WHERE application_event_version = 2
          AND aggregate_kind = 'thread' AND stream_id = ${threadId}`;
            const snapshotSequence = revisions[0]?.sequence ?? 0;
            const select = (
              indexed: ReadonlyArray<IndexedTimelineRow>,
              prefix?: ThreadHistoryPrefix,
            ) =>
              Effect.try({
                try: () => {
                  const historyItems =
                    workMode === "deferred" ? deferWorkHistoryRows(indexed) : indexed;
                  const policy = olderHistoryPagePolicy({ items: indexed, cursor, throughEntryId });
                  // Folding can hide the cursor's row: a snapshot folds no work in a thread with no
                  // user turn. The page then ends at the first row kept from the cursor on.
                  const cursorRow =
                    indexed[findCursorEndIndex(indexed, decodeThreadHistoryCursor(cursor))];
                  const end =
                    cursorRow === undefined
                      ? -1
                      : historyItems.findIndex(
                          (row) => row.canonicalPosition >= cursorRow.canonicalPosition,
                        );
                  const page =
                    workMode === "work"
                      ? selectDeferredWorkPage({
                          items: indexed,
                          cursor,
                          throughEntryId,
                          snapshotSequence,
                          rowEncodedBytes: () => 0,
                        })
                      : selectHistoryPageFromCursor({
                          items: historyItems,
                          cursor,
                          exclusiveEndIndex: end === -1 ? historyItems.length : end,
                          snapshotSequence,
                          rowEncodedBytes: () => 0,
                          policy,
                          prefix,
                        });
                  return { policy, page, historyItems };
                },
                catch: (cause) => new ProjectionStoreReadError({ threadId, cause }),
              });
            const window =
              local === null
                ? null
                : yield* selectHistoryPageInWindow(
                    local,
                    { cursor, throughEntryId, workMode },
                    select,
                  );
            const whole = Effect.gen(function* () {
              const index = full ?? (yield* readSnapshotTimelineIndex(threadId, withWork));
              const indexed = index.visible.map((row, position): IndexedTimelineRow => ({
                ...row,
                position,
                canonicalPosition: position,
              }));
              let selection = yield* select(indexed);
              // The full index does not say which rows hold inline output: finding it scans
              // payloads, which costs a whole long thread several seconds. Scan only the runs
              // the page spans, then select again with what they hold.
              const scannedRuns = new Set<string>();
              const persistentOutputs = new Set<string>();
              // Rows hidden in a work group move the page, so the scan always reaches the
              // cursor's own row, or the row its stale position falls back to.
              const cursorPosition =
                workMode === undefined
                  ? -1
                  : Math.min(
                      findCursorEndIndex(indexed, decodeThreadHistoryCursor(cursor)),
                      indexed.length - 1,
                    );
              while (workMode !== undefined) {
                const { page } = selection;
                const span = [...page.items.slice(0, 1), ...page.items.slice(-1)].map(
                  (row) => row.canonicalPosition,
                );
                if (cursorPosition >= 0) span.push(cursorPosition);
                if (span.length === 0) break;
                const runs = new Map(
                  // A work page holds rows of one run, which can be the rows that have no run.
                  (workMode === "work"
                    ? page.items.slice(0, 1)
                    : indexed.slice(Math.min(...span), Math.max(...span) + 1)
                  ).flatMap(({ sourceThreadId, item }) =>
                    (workMode === "work" ||
                      (item.runId !== null &&
                        (item.runStatus === "completed" || item.attemptStatus === "superseded"))) &&
                    !scannedRuns.has(`${sourceThreadId}:${item.runId}`)
                      ? [
                          [
                            `${sourceThreadId}:${item.runId}`,
                            { threadId: sourceThreadId, id: item.runId },
                          ] as const,
                        ]
                      : [],
                  ),
                );
                if (runs.size === 0) break;
                for (const run of runs.keys()) scannedRuns.add(run);
                const found = yield* sql<{ thread_id: string; turn_item_id: string }>`
          SELECT item.thread_id, item.turn_item_id
          FROM json_each(${yield* encodeTimelineSources([...runs.values()])}) AS wanted
          CROSS JOIN orchestration_v2_projection_turn_items AS item
            ON item.thread_id = json_extract(wanted.value, '$.threadId')
            AND item.run_id IS json_extract(wanted.value, '$.id')
          WHERE item.status = 'completed' AND item.inline_work_output = 1`;
                if (found.length === 0) break;
                for (const row of found)
                  persistentOutputs.add(`${row.thread_id}:${row.turn_item_id}`);
                selection = yield* select(
                  indexed.map((row) =>
                    persistentOutputs.has(`${row.sourceThreadId}:${row.sourceItemId}`)
                      ? { ...row, item: { ...row.item, persistentOutput: true } }
                      : row,
                  ),
                );
              }
              return {
                indexed,
                selection,
                olderUserTurn: Effect.succeed(false),
                interruptRequests: Effect.succeed(indexed),
              };
            });
            const { indexed, selection, olderUserTurn, interruptRequests } =
              window ?? (yield* whole);
            const { page } = selection;
            const policy = workMode === "work" ? THREAD_HISTORY_PAGE_POLICY : selection.policy;
            const end = (page.items.at(-1)?.canonicalPosition ?? -1) + 1;
            const hasUserTurns =
              conversationOnly === true &&
              (indexed.some(
                (row) => row.canonicalPosition < end && isThreadHistoryUserTurn(row.item),
              ) ||
                (yield* olderUserTurn));
            const materialize = Effect.fn("ProjectionStore.materializeHistoryRows")(function* (
              rows: ReadonlyArray<IndexedTimelineRow>,
            ) {
              if (rows.length === 0) return [];
              const sources = yield* encodeTimelineSources(
                rows
                  .filter((row) => !row.synthetic)
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
              return yield* Effect.forEach(rows, (row) =>
                Effect.gen(function* () {
                  const payload = byIdentity.get(`${row.sourceThreadId}:${row.sourceItemId}`);
                  const item =
                    row.synthetic ??
                    (payload === undefined
                      ? yield* new ProjectionStoreReadError({ threadId })
                      : yield* decodeTurnItemPayload(payload));
                  return {
                    position: row.canonicalPosition,
                    visibility: row.visibility,
                    sourceThreadId: row.sourceThreadId,
                    sourceItemId: row.sourceItemId,
                    item: projectTurnItemForWire(
                      row.item.deferredWork === undefined
                        ? item
                        : { ...item, deferredWork: row.item.deferredWork },
                    ),
                  };
                }),
              );
            });
            const items = yield* materialize(
              hasUserTurns
                ? page.items.filter((row) => isConversationHistoryItem(row.item))
                : page.items,
            );
            const bounded = selectRecentTimelineWindow({ items, snapshotSequence, policy });
            const requests =
              workMode === "work"
                ? []
                : yield* materialize(
                    missingInterruptRequests(
                      bounded.items.some((row) => row.item.type === "run_interrupt_result")
                        ? yield* interruptRequests
                        : [],
                      bounded.items,
                    ),
                  );
            const pageItems = [...requests, ...bounded.items].map((row, position) => ({
              ...row,
              position,
            }));
            const rows = conversationOnly
              ? pageItems.filter((row) => isConversationHistoryItem(row.item))
              : pageItems;
            // A bounded snapshot keeps only recent or active subagents.
            const subagentIds = rows.flatMap(({ sourceThreadId, item }) =>
              item.type === "subagent" && sourceThreadId === threadId ? [item.subagentId] : [],
            );
            const subagents =
              subagentIds.length === 0
                ? []
                : yield* sql<PayloadRow>`
            SELECT payload_json FROM orchestration_v2_projection_subagents
            WHERE thread_id = ${threadId}
              AND subagent_id IN (SELECT value FROM json_each(${encodeIdList(subagentIds)}))
            ORDER BY COALESCE(started_at, ''), subagent_id ASC
          `.pipe(Effect.flatMap(decodeRows(decodeSubagentPayload, threadId)));
            return {
              snapshotSequence,
              items: rows,
              nextCursor: bounded.hasMoreHistory ? bounded.nextCursor : page.nextCursor,
              hasMoreHistory: bounded.hasMoreHistory || page.hasMoreHistory,
              ...(subagents.length === 0 ? {} : { subagents }),
            };
          }),
        )
        .pipe(Effect.mapError(controlReadError(threadId)));
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
