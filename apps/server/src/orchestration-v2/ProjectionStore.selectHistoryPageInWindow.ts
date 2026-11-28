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

import type { ProjectionStoreV2Error } from "./ProjectionStore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindSelectHistoryPageInWindow = (ctx: any) =>
  Effect.fn("ProjectionStore.selectHistoryPageInWindow")(function* <
    Selection extends {
      readonly page: SelectTimelinePageResult<IndexedTimelineRow>;
      readonly historyItems: ReadonlyArray<IndexedTimelineRow>;
    },
  >(
    local: LocalTimeline,
    input: {
      readonly cursor: string;
      readonly throughEntryId: string | undefined;
      readonly workMode: "deferred" | "work" | undefined;
    },
    select: (
      indexed: ReadonlyArray<IndexedTimelineRow>,
      prefix?: ThreadHistoryPrefix,
    ) => Effect.Effect<Selection, ProjectionStoreV2Error>,
  ) {
    const threadId = local.records.thread.id;
    const decoded = Result.try(() => decodeThreadHistoryCursor(input.cursor));
    if (Result.isFailure(decoded) || decoded.success.st !== threadId) return null;
    const cursor = decoded.success;
    // Looked up by key alone: with the thread in the query, SQLite scans the thread's index.
    const ends = (yield* sql<{ turn_item_id: string; thread_id: string; ordinal: number }>`
          SELECT turn_item_id, thread_id, ordinal FROM orchestration_v2_projection_turn_items
          WHERE turn_item_id IN (${cursor.si}, ${input.throughEntryId ?? cursor.si})`).filter(
      (row) => row.thread_id === threadId,
    );
    const upper = ends.find((row) => row.turn_item_id === cursor.si)?.ordinal;
    if (upper === undefined) return null;
    /* Runs for each window this operation tries; the operation owns the span. */
    const indexFrom = Effect.fnUntraced(function* (
      items: ReadonlyArray<TimelineIndexItem>,
      from: number | null,
    ) {
      const {
        ProjectionStoreV2Error,
        encodeIdList,
        localTimelineRow,
        olderUserTurn,
        runsStartedBefore,
        sql,
      } = pickScriptcBindCtx(ctx);

      const base = from === null ? 0 : yield* local.visibleBefore(from);
      return items.filter(local.isVisible).map((item, offset): IndexedTimelineRow => ({
        ...localTimelineRow(item),
        position: base + offset,
        canonicalPosition: base + offset,
      }));
    });
    const isCursorRow = (row: TimelineIndexRow) => row.sourceItemId === cursor.si;
    // The ordinals come from the stop request index, so this does not walk the thread.
    const interruptRequests = local
      .read(
        sql`AND item.type = 'run_interrupt_request' AND item.ordinal IN (
              SELECT ordinal FROM orchestration_v2_projection_turn_items
                INDEXED BY orchestration_v2_projection_turn_items_stop_request_idx
              WHERE thread_id = ${threadId} AND type = 'run_interrupt_request')`,
      )
      .pipe(Effect.flatMap((items) => indexFrom(items, null)));

    if (input.workMode === "work") {
      // A work group lies between its first row and the cursor, so that range is the read.
      const lower = ends.find((row) => row.turn_item_id === input.throughEntryId)?.ordinal;
      if (lower === undefined) return null;
      const indexed = yield* indexFrom(
        yield* local.read(sql`AND item.ordinal >= ${lower} AND item.ordinal <= ${upper}`),
        lower,
      );
      if (!indexed.some(isCursorRow)) return null;
      if (!indexed.some((row) => row.sourceItemId === input.throughEntryId)) return null;
      return {
        indexed,
        selection: yield* select(indexed),
        olderUserTurn: olderUserTurn(local, lower),
        interruptRequests,
      };
    }

    const rowsBelow = (ordinal: number, count: number) =>
      sql<{ ordinal: number }>`
            SELECT ordinal FROM orchestration_v2_projection_turn_items
            WHERE thread_id = ${threadId} AND ordinal < ${ordinal}
            ORDER BY ordinal DESC LIMIT 1 OFFSET ${count - 1}`.pipe(
        Effect.map((rows) => rows[0]?.ordinal ?? null),
      );
    // `trusted` is the lowest ordinal the page may reach. `lower` can sit below it, because
    // a run that folds work is read whole.
    let step = THREAD_HISTORY_TURN_SNAPSHOT_ROW_LIMIT;
    let trusted = yield* rowsBelow(upper, step);
    let lower = trusted;
    let higher = upper;
    let items = yield* local.read(
      lower === null
        ? sql`AND item.ordinal <= ${upper}`
        : sql`AND item.ordinal >= ${lower} AND item.ordinal <= ${upper}`,
    );
    const wholeRuns = new Set<string>();
    while (true) {
      if (input.workMode === "deferred") {
        // Folding needs every row of a run: its stop and error rows, and its group sizes.
        const folding = new Set<string>();
        for (const item of items) {
          if (item.runId === null || wholeRuns.has(item.runId)) continue;
          if (item.ordinal > upper || (trusted !== null && item.ordinal < trusted)) continue;
          if (isFoldableWorkItem(item) && local.isVisible(item)) folding.add(item.runId);
        }
        if (folding.size > 0) {
          const runs = encodeIdList([...folding]);
          const [extent] = yield* sql<{ lower: number; higher: number }>`
                SELECT MIN(run.lower) AS lower, MAX(run.higher) AS higher FROM (
                  SELECT
                    (SELECT MIN(ordinal) FROM orchestration_v2_projection_turn_items
                      WHERE run_id = wanted.value) AS lower,
                    (SELECT MAX(ordinal) FROM orchestration_v2_projection_turn_items
                      WHERE run_id = wanted.value) AS higher
                  FROM json_each(${runs}) AS wanted
                ) AS run`;
          if (extent !== undefined && lower !== null && extent.lower < lower) {
            const below = yield* local.read(
              sql`AND item.ordinal >= ${extent.lower} AND item.ordinal < ${lower}`,
            );
            items = below.concat(items);
            lower = extent.lower;
          }
          if (extent !== undefined && extent.higher > higher) {
            const newer = yield* local.read(
              sql`AND item.ordinal > ${higher} AND item.ordinal <= ${extent.higher}`,
            );
            items = items.concat(newer);
            higher = extent.higher;
          }
          for (const runId of folding) wholeRuns.add(runId);
        }
      }
      const indexed = yield* indexFrom(items, lower);
      const end = indexed.findIndex(isCursorRow);
      if (end < 0) return null;
      const older = lower === null ? Effect.succeed(false) : olderUserTurn(local, lower);
      const prefix: ThreadHistoryPrefix | undefined =
        lower === null
          ? undefined
          : {
              hasUserTurn: indexed.slice(0, end).some((row) => isThreadHistoryUserTurn(row.item))
                ? false
                : yield* older,
              startedRuns: yield* runsStartedBefore(local, lower, indexed),
            };
      const selection = yield* select(indexed, prefix);
      // Without its row the cursor falls back to a position, which only the full index has.
      if (!selection.historyItems.some(isCursorRow)) return null;
      const oldest = selection.page.oldestScanned;
      if (
        lower === null ||
        (trusted !== null &&
          oldest !== undefined &&
          oldest !== selection.historyItems[0] &&
          oldest.item.ordinal >= trusted)
      ) {
        return { indexed, selection, olderUserTurn: older, interruptRequests };
      }
      step *= 2;
      trusted = trusted === null ? null : yield* rowsBelow(trusted, step);
      if (trusted === null || trusted < lower) {
        const below = yield* local.read(
          trusted === null
            ? sql`AND item.ordinal < ${lower}`
            : sql`AND item.ordinal >= ${trusted} AND item.ordinal < ${lower}`,
        );
        items = below.concat(items);
        lower = trusted;
      }
    }
  });
