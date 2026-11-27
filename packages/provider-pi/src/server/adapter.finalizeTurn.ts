// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of adapter.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as NodeUtil from "node:util";
import { AgentScope } from "@t3tools/shared/AgentScope";
import { getModelSelectionStringOptionValue } from "@t3tools/shared/model";
import { readToolOutputImage } from "@t3tools/shared/toolOutput";
import { isWorkspaceImagePreviewPath } from "@t3tools/shared/filePreview";
import * as Predicate from "effect/Predicate";
import {
  ProviderDriverKind,
  type ChatAttachment,
  type ModelSelection,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  type OrchestrationV2ProviderRef,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2Subagent,
  type OrchestrationV2TurnItem,
  type OrchestrationV2UserInputQuestion,
  type ProviderApprovalDecision,
  type ProviderInstanceId,
  type MessageId,
  type OrchestrationV2ProviderTurnTokenUsage,
} from "@t3tools/contracts";
import { PiSettings } from "../settings.ts";
import * as Cause from "effect/Cause";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Exit from "effect/Exit";
import * as Scope from "effect/Scope";
import * as Fiber from "effect/Fiber";
import * as Queue from "effect/Queue";
import * as Schema from "effect/Schema";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";

import * as ProviderHost from "@t3tools/provider-core/server/ProviderHost";
import { providerMessageTextWithAttachmentPaths } from "@t3tools/provider-core/server/attachmentPrompt";
import { mcpToolPresentation } from "@t3tools/provider-core/server/mcpToolPresentation";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import { parsePiCompactCommand, type PiCompactCommand } from "./commands.ts";
import { mergeProviderInstanceEnvironment } from "@t3tools/provider-core/server/instanceEnvironment";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  ProviderAdapterDriverCreateError,
  type ProviderAdapterDriver,
  type ProviderAdapterDriverCreateInput,
} from "@t3tools/provider-core/server/adapterDriver";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
} from "@t3tools/provider-core/server/failure";
import { turnScopedSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import {
  findReportedPiModel,
  makePiRpcConnection,
  resolvePiModelSlug,
  piRecordField as recordField,
  piRecordNumber as recordNumber,
  piRecordString as recordString,
  type PiRpcConnection,
  type PiRpcError,
  type PiRpcRecord,
} from "./rpc.ts";
import {
  buildPiRpcLaunch,
  materializePiT3McpExtension,
  resolvePiLaunchArgs,
} from "./mcpInjection.ts";
import { PI_FILE_CHANGE_TOOLS, PI_T3_SERVICE_TIER_COMMAND } from "./mcpExtensionSource.ts";
import { PI_STANDARD_SERVICE_TIER } from "./modelCapabilities.ts";
import { bindHandleSessionEvent } from "./adapter.handleSessionEvent.ts";
import { bindHandleExtensionUiRequest } from "./adapter.handleExtensionUiRequest.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindFinalizeTurn = (ctx: any) =>
Effect.fnUntraced(function* (state: PiThreadState, readUsage = true) {
    const {
      PI_PROVIDER,
      baseItemFields,
      cancelPendingPrompts,
      captureTurnTreeRefs,
      closed,
      completeOpenStreamItems,
      completed,
      emit,
      emitCompaction,
      emitProviderRetry,
      emitSteerStatus,
      failed,
      id,
      itemOrdinal,
      message,
      model,
      now,
      piAsyncRuns,
      providerRef,
      providerTurnId,
      readTokenUsage,
      run,
      startedAt,
      state,
      updateProviderSession,
      updateProviderThread,
      updated
    } = pickScriptcBindCtx(ctx);

        const turn = state.activeTurn;
        if (turn === null) return;
        state.activeTurn = null;
        const interrupted = turn.interrupted || turn.nativeAborted;
        const completedAt = yield* DateTime.now;
        yield* completeOpenStreamItems(turn);
        if (turn.activeCompaction !== null) {
          const status = interrupted ? "cancelled" : turn.failure === null ? "completed" : "failed";
          yield* emitCompaction(turn, turn.activeCompaction, status);
          turn.activeCompaction = null;
        }
        if (turn.activeProviderRetry !== null) {
          if (interrupted) {
            yield* emitProviderRetry(turn, turn.activeProviderRetry, "interrupted", completedAt);
            turn.activeProviderRetry = null;
          } else if (turn.failure === null) {
            yield* emitProviderRetry(turn, turn.activeProviderRetry, "completed", completedAt);
            turn.activeProviderRetry = null;
          }
        }
        yield* cancelPendingPrompts(completedAt);
        // Stop clears Pi's queue, so an unread steer was dropped; otherwise Pi read it before settling.
        for (const messageId of turn.unreadSteers.splice(0)) {
          yield* emitSteerStatus(turn, messageId, interrupted ? "cancelled" : "completed");
        }
        const treeRefs =
          turn.stopTreeRefs !== undefined ? turn.stopTreeRefs : yield* captureTurnTreeRefs();
        const tokenUsage = readUsage ? yield* readTokenUsage(turn, completedAt) : undefined;
        const failure = interrupted ? null : (turn.rejectedPromptFailure ?? turn.failure);
        yield* emit({
          type: "provider_turn.updated",
          driver: PI_PROVIDER,
          threadId: turn.turnInput.threadId,
          providerTurn: {
            ...turn.providerTurn,
            ...(treeRefs === null || treeRefs.nativeTurnRef === undefined
              ? {}
              : { nativeTurnRef: treeRefs.nativeTurnRef }),
            ...(state.providerThread.nativeThreadRef === null
              ? {}
              : { nativeThreadRef: state.providerThread.nativeThreadRef }),
            status: interrupted ? "interrupted" : failure !== null ? "failed" : "completed",
            completedAt,
            ...(tokenUsage === undefined ? {} : { tokenUsage }),
            ...(turn.reportedModel === undefined ? {} : { model: turn.reportedModel }),
          },
        });
        yield* updateProviderThread(
          state,
          {
            status: "idle",
            ...(treeRefs === null
              ? {}
              : {
                  nativeConversationHeadRef:
                    treeRefs.leafId === null ? null : providerRef(treeRefs.leafId),
                }),
          },
          treeRefs?.retainedNativeTurnIds,
        );
        yield* updateProviderSession(
          failure !== null ? "error" : "ready",
          failure?.message ?? null,
        );
        if (failure !== null) {
          const failureItemId = `terminal-failure:${turn.providerTurn.id}`;
          if (turn.activeProviderRetry !== null) {
            yield* emitProviderRetry(
              turn,
              { ...turn.activeProviderRetry, failure },
              "failed",
              completedAt,
            );
          } else {
            yield* emit({
              type: "turn_item.updated",
              driver: PI_PROVIDER,
              turnItem: {
                ...baseItemFields(turn, failureItemId, completedAt, completedAt),
                status: "failed",
                title: null,
                completedAt,
                type: "error",
                failure,
              },
            });
          }
          yield* emit({
            type: "turn.terminal",
            driver: PI_PROVIDER,
            providerThreadId: state.providerThread.id,
            providerTurnId: turn.providerTurn.id,
            runOrdinal: turn.turnInput.runOrdinal,
            failureItemOrdinal: itemOrdinal(turn, failureItemId),
            status: "failed",
            failure,
            ...(!closed && [...piAsyncRuns.values()].some((run) => run.turn === turn)
              ? { childTurnsContinue: true }
              : {}),
            ...(turn.activeProviderRetry === null
              ? {}
              : {
                  retry: turn.activeProviderRetry.retry,
                  retryStartedAt: turn.activeProviderRetry.startedAt,
                }),
            threadDisposition: "reusable",
          });
        } else {
          yield* emit({
            type: "turn.terminal",
            driver: PI_PROVIDER,
            providerThreadId: state.providerThread.id,
            providerTurnId: turn.providerTurn.id,
            runOrdinal: turn.turnInput.runOrdinal,
            status: interrupted ? "interrupted" : "completed",
            failure: null,
            threadDisposition: "reusable",
          });
        }
      });
