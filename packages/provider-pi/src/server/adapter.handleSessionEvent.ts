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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindHandleSessionEvent = (ctx: any) =>
Effect.fnUntraced(function* (event: PiRpcRecord) {
    const {
      PI_COMPACTING_PROMPT_REJECTION,
      PI_PROVIDER,
      PI_UNSOLICITED_ACTIVITY_ERROR,
      SETTLE_PROBE_MAX_ATTEMPTS,
      SETTLE_PROBE_RETRY_DELAY,
      adoptLiveSessionFile,
      cancelPrompt,
      clearExtensionStatuses,
      closed,
      compactionNativeItemId,
      completeOpenStreamItems,
      completeStreamItem,
      completed,
      connection,
      content,
      detail,
      emit,
      emitCompaction,
      emitExtensionError,
      emitProviderRetry,
      emitSteerStatus,
      emitToolItem,
      events,
      extensionStatusReset,
      failed,
      finalizeTurn,
      handleExtensionUiRequest,
      heldPrompts,
      id,
      interrupted,
      itemOrdinal,
      messageId,
      method,
      model,
      nativeCompacting,
      nativeItemId,
      nonNegativeInteger,
      now,
      outOfTurnExtensionErrors,
      output,
      pendingCompactResponses,
      pendingPromptResponses,
      pendingPromptResponsesDrained,
      pendingPrompts,
      pendingWake,
      provider,
      providerThreadId,
      providerTurnId,
      queued,
      rejectedHeldCount,
      releasedPromptTurnId,
      reportLiveUsage,
      request,
      rollbackBarrier,
      scheduleSettleProbe,
      scheduleStreamFlush,
      scope,
      sessionEntity,
      sessionEventPermit,
      settleProbeGeneration,
      start,
      status,
      stopPendingWake,
      stopReason,
      stopRequested,
      streamItemFor,
      streamItemId,
      text,
      threadId,
      threadState,
      unsolicitedActivityDetected,
      updateExtensionStatus,
      updateProviderSession
    } = pickScriptcBindCtx(ctx);

        if (event["type"] === "t3.extension_status_reset") {
          const reset = extensionStatusReset;
          if (reset !== null && event["reset"] === reset) {
            reset.previous = sessionEntity.extensionStatuses ?? [];
            reset.touched.clear();
            yield* clearExtensionStatuses();
            yield* Deferred.succeed(reset.ready, undefined);
          }
          return;
        }
        // A native wake may wait for a turn owner; status belongs to the live session immediately.
        if (event["type"] === "extension_ui_request" && event["method"] === "setStatus") {
          yield* updateExtensionStatus(event);
          return;
        }
        // Model hooks can show dialogs before turn ownership; keep requests session-scoped and buffer output.
        const interactiveUiRequest =
          event["type"] === "extension_ui_request" &&
          ["select", "confirm", "input", "editor"].includes(String(event["method"]));
        if (
          threadState?.activeTurn === null &&
          pendingWake !== null &&
          !interactiveUiRequest &&
          !String(event["type"]).startsWith("t3.") &&
          event["type"] !== "response"
        ) {
          pendingWake.events.push(event);
          if (event["type"] === "agent_start") yield* updateProviderSession("running", null);
          if (event["type"] === "agent_settled") yield* updateProviderSession("ready", null);
          return;
        }
        const state = threadState;
        const turn = state?.activeTurn ?? null;
        switch (event["type"]) {
          case "agent_start": {
            if (
              turn === null &&
              state?.providerThread.appThreadId != null &&
              continuationRequests !== undefined &&
              !closed &&
              !stopRequested
            ) {
              const wake: PiWake = { state, events: [event] };
              pendingWake = wake;
              if (rollbackBarrier !== null) {
                yield* stopPendingWake(wake);
                return;
              }
              yield* updateProviderSession("running", null);
              yield* continuationRequests
                .offer({
                  threadId: state.providerThread.appThreadId,
                  providerThreadId: state.providerThread.id,
                  driver: PI_PROVIDER,
                  detail: null,
                  delivery: "adapter_buffered",
                  dispatchIfCurrent: (dispatch) =>
                    sessionEventPermit.withPermits(1)(
                      Effect.suspend(() =>
                        pendingWake === wake && threadState === state && !closed
                          ? dispatch.pipe(
                              Effect.asSome,
                              Effect.tapError(() => stopPendingWake(wake)),
                            )
                          : Effect.succeedNone,
                      ),
                    ),
                  clearIfCurrent: () => sessionEventPermit.withPermits(1)(stopPendingWake(wake)),
                })
                .pipe(Effect.tapError(() => stopPendingWake(wake)));
              return;
            }
            if (turn === null) {
              unsolicitedActivityDetected = true;
              yield* updateProviderSession("error", PI_UNSOLICITED_ACTIVITY_ERROR);
              yield* connection.terminate;
              return;
            }
            turn.sawAgentActivity = true;
            turn.nativeAborted = false;
            turn.settleProbeGeneration += 1;
            return;
          }
          case "message_start": {
            const role = recordString(event["message"], "role");
            if (turn !== null && role === "assistant") {
              turn.sawAgentActivity = true;
              turn.messageOrdinal += 1;
            }
            const readSteer = role === "user" ? turn?.unreadSteers.shift() : undefined;
            if (turn !== null && readSteer !== undefined) {
              yield* emitSteerStatus(turn, readSteer, "completed");
            }
            return;
          }
          case "message_update": {
            if (turn === null) return;
            turn.sawAgentActivity = true;
            // Pi sends auto_retry_end only after the message ends; streamed output is recovery.
            if (turn.activeProviderRetry !== null) {
              const recoveredAt = yield* DateTime.now;
              yield* emitProviderRetry(turn, turn.activeProviderRetry, "completed", recoveredAt);
              turn.activeProviderRetry = null;
            }
            yield* reportLiveUsage(turn, event["usage"]);
            const delta = event["assistantMessageEvent"];
            const deltaType = recordString(delta, "type");
            const contentIndex = recordNumber(delta, "contentIndex") ?? 0;
            if (deltaType === "text_start" || deltaType === "thinking_start") {
              // A provider that reconnects mid-block starts it again; its earlier text is abandoned.
              const restarted = turn.streamItems.get(streamItemId(turn, contentIndex));
              if (restarted !== undefined && !restarted.completed) restarted.text = "";
              return;
            }
            if (deltaType === "text_delta" || deltaType === "thinking_delta") {
              const item = yield* streamItemFor(
                turn,
                deltaType === "text_delta" ? "assistant_message" : "reasoning",
                contentIndex,
              );
              item.text += recordString(delta, "delta") ?? "";
              yield* scheduleStreamFlush(turn, item);
              return;
            }
            if (deltaType === "text_end" || deltaType === "thinking_end") {
              const item = yield* streamItemFor(
                turn,
                deltaType === "text_end" ? "assistant_message" : "reasoning",
                contentIndex,
              );
              yield* completeStreamItem(
                turn,
                item,
                recordString(delta, "content") ?? recordString(delta, "thinking"),
              );
              return;
            }
            return;
          }
          case "message_end": {
            if (turn === null) return;
            const message = event["message"];
            if (recordString(message, "role") !== "assistant") return;
            yield* completeOpenStreamItems(turn);
            const reportedProvider = recordString(message, "provider");
            const reportedModelId = recordString(message, "model");
            if (reportedProvider && reportedModelId) {
              turn.reportedModel = `${reportedProvider}/${reportedModelId}`;
            }
            if (recordString(message, "stopReason") === "error" && turn.failure === null) {
              turn.failure = makeProviderFailure({
                message: recordString(message, "errorMessage") ?? "Pi reported a model error.",
                class: "provider_error",
              });
            }
            return;
          }
          case "tool_execution_start":
            if (turn !== null) {
              turn.sawAgentActivity = true;
              yield* emitToolItem(turn, event, "start");
            }
            return;
          case "tool_execution_update":
            if (turn !== null) yield* emitToolItem(turn, event, "update");
            return;
          case "tool_execution_end":
            if (turn !== null) yield* emitToolItem(turn, event, "end");
            return;
          case "compaction_start": {
            if (turn === null) return;
            turn.settleProbeGeneration += 1;
            if (turn.activeCompaction !== null) {
              yield* emitCompaction(turn, turn.activeCompaction, "cancelled");
            }
            const startedAt = yield* DateTime.now;
            const compaction = {
              nativeItemId: compactionNativeItemId(turn),
              startedAt,
            } satisfies PiCompactionState;
            turn.activeCompaction = compaction;
            yield* emitCompaction(turn, compaction, "running");
            return;
          }
          case "compaction_end": {
            if (turn === null) return;
            const observedAt = yield* DateTime.now;
            const compaction = turn.activeCompaction ?? {
              nativeItemId: compactionNativeItemId(turn),
              startedAt: observedAt,
            };
            turn.activeCompaction = null;
            turn.compactionCancelled = event["aborted"] === true;
            const result = event["result"];
            if (result === null || result === undefined) {
              if (event["aborted"] === true) {
                yield* emitCompaction(turn, compaction, "cancelled");
                if (
                  (turn.settleWhenIdle || !turn.sawAgentActivity) &&
                  releasedPromptTurnId !== turn.providerTurn.id
                ) {
                  yield* scheduleSettleProbe(turn, turn.settleWhenIdle);
                }
                return;
              }
              const errorMessage =
                recordString(event, "errorMessage") ?? "Pi context compaction failed.";
              yield* emitCompaction(turn, compaction, "failed", {
                summary: errorMessage.slice(0, 1_000),
              });
              if (
                (turn.settleWhenIdle || !turn.sawAgentActivity) &&
                releasedPromptTurnId !== turn.providerTurn.id
              ) {
                yield* scheduleSettleProbe(turn, turn.settleWhenIdle);
              }
              return;
            }
            // Clear overflow failures only when compaction will retry; ordinary compaction must retain exhausted retries.
            if (event["willRetry"] === true) turn.failure = null;
            turn.latestCompactionAfterTokens =
              nonNegativeInteger(result, "estimatedTokensAfter") ?? null;
            const summary = recordString(result, "summary");
            const beforeTokenCount = nonNegativeInteger(result, "tokensBefore");
            const afterTokenCount = nonNegativeInteger(result, "estimatedTokensAfter");
            yield* emitCompaction(turn, compaction, "completed", {
              ...(summary === undefined ? {} : { summary }),
              ...(beforeTokenCount === undefined ? {} : { beforeTokenCount }),
              ...(afterTokenCount === undefined ? {} : { afterTokenCount }),
            });
            if (
              (turn.settleWhenIdle || !turn.sawAgentActivity) &&
              releasedPromptTurnId !== turn.providerTurn.id
            ) {
              yield* scheduleSettleProbe(turn, turn.settleWhenIdle);
            }
            return;
          }
          case "auto_retry_start": {
            if (turn === null) return;
            const emittedAt = yield* DateTime.now;
            const attempt = Math.max(1, Math.trunc(recordNumber(event, "attempt") ?? 1));
            const maxAttempts = Math.max(
              attempt,
              Math.trunc(recordNumber(event, "maxAttempts") ?? attempt),
            );
            const retryDelayMs = Math.max(0, Math.trunc(recordNumber(event, "delayMs") ?? 0));
            const failure = makeProviderFailure({
              message: recordString(event, "errorMessage") ?? "Pi provider request failed.",
              class: "provider_error",
              retryable: true,
            });
            const current = turn.activeProviderRetry;
            const providerRetry = {
              retry: { attempt, maxAttempts, retryDelayMs },
              failure,
              startedAt: current?.startedAt ?? emittedAt,
              itemOrdinal:
                current?.itemOrdinal ??
                itemOrdinal(turn, `terminal-failure:${turn.providerTurn.id}`),
            } satisfies PiProviderRetryState;
            turn.activeProviderRetry = providerRetry;
            yield* emitProviderRetry(turn, providerRetry, "running", emittedAt);
            return;
          }
          case "auto_retry_end": {
            if (turn === null) return;
            const emittedAt = yield* DateTime.now;
            if (event["success"] === true) {
              // Successful retries supersede the failure agent_settled would reuse.
              if (turn.activeProviderRetry !== null) {
                const attempt = Math.max(
                  1,
                  Math.trunc(
                    recordNumber(event, "attempt") ?? turn.activeProviderRetry.retry.attempt,
                  ),
                );
                const recoveredRetry = {
                  ...turn.activeProviderRetry,
                  retry: { ...turn.activeProviderRetry.retry, attempt },
                };
                yield* emitProviderRetry(turn, recoveredRetry, "completed", emittedAt);
                turn.activeProviderRetry = null;
              }
              turn.failure = null;
              return;
            }
            const failure = makeProviderFailure({
              message: recordString(event, "finalError") ?? "Pi auto-retry failed.",
              class: "provider_error",
              retryable: false,
            });
            const attempt = Math.max(1, Math.trunc(recordNumber(event, "attempt") ?? 1));
            const current = turn.activeProviderRetry;
            const providerRetry = {
              retry: {
                attempt,
                maxAttempts: current?.retry.maxAttempts ?? attempt,
                retryDelayMs: current?.retry.retryDelayMs ?? null,
              },
              failure,
              startedAt: current?.startedAt ?? emittedAt,
              itemOrdinal:
                current?.itemOrdinal ??
                itemOrdinal(turn, `terminal-failure:${turn.providerTurn.id}`),
            } satisfies PiProviderRetryState;
            turn.activeProviderRetry = providerRetry;
            turn.failure = failure;
            yield* emitProviderRetry(turn, providerRetry, "failed", emittedAt);
            return;
          }
          case "extension_ui_request":
            yield* handleExtensionUiRequest(event);
            return;
          case "extension_error": {
            yield* emitExtensionError(event);
            return;
          }
          case "agent_settled": {
            if (turn?.interrupted === true) {
              if (state === null) return;
              const liveState = yield* request({ type: "get_state" }, 2_000).pipe(
                Effect.orElseSucceed(() => undefined),
              );
              adoptLiveSessionFile(state, liveState);
              yield* finalizeTurn(state);
              return;
            }
            if (turn !== null) {
              turn.nativeAborted = event["aborted"] === true;
              turn.settleWhenIdle = true;
              turn.settleProbeGeneration += 1;
              if (
                turn.adoptedWake &&
                pendingPromptResponses.some(
                  (pending) =>
                    pending.providerTurnId === turn.providerTurn.id &&
                    pending.kind === "turn_start",
                )
              )
                return;
              yield* scheduleSettleProbe(turn, true);
            }
            return;
          }
          case "response": {
            const command = recordString(event, "command");
            if (command === "compact") {
              const pendingCompact = pendingCompactResponses.shift();
              const compactTurn =
                pendingCompact?.providerTurnId === turn?.providerTurn.id ? turn : null;
              if (compactTurn !== null) compactTurn.manualCompactInFlight = false;
              if (event["success"] === true) {
                if (
                  compactTurn !== null &&
                  (compactTurn.settleWhenIdle ||
                    (compactTurn.promptMayBeCommandOnly && !compactTurn.sawAgentActivity))
                ) {
                  yield* scheduleSettleProbe(compactTurn, compactTurn.settleWhenIdle);
                }
                return;
              }
              if (event["success"] !== false) return;
              if (compactTurn === null) return;
              if (compactTurn.activeCompaction !== null) return;
              if (pendingCompact?.kind === "steer") {
                yield* Effect.logWarning("Pi rejected a compact steer.", {
                  errorLength: recordString(event, "error")?.length,
                });
                if (
                  compactTurn.settleWhenIdle ||
                  (compactTurn.promptMayBeCommandOnly && !compactTurn.sawAgentActivity)
                ) {
                  yield* scheduleSettleProbe(compactTurn, compactTurn.settleWhenIdle);
                }
                return;
              }
              if (!compactTurn.compactionCancelled) {
                compactTurn.failure = makeProviderFailure({
                  message: recordString(event, "error") ?? "Pi compact failed.",
                  class: "provider_error",
                });
                if (state !== null) yield* finalizeTurn(state);
                return;
              }
              if (!compactTurn.sawAgentActivity) {
                yield* scheduleSettleProbe(compactTurn);
              }
              return;
            }
            const responseId = recordString(event, "id");
            const promptIndex =
              command !== "prompt"
                ? -1
                : responseId === undefined
                  ? 0
                  : pendingPromptResponses.findIndex((pending) => pending.id === responseId);
            const pendingPrompt =
              promptIndex < 0 ? undefined : pendingPromptResponses.splice(promptIndex, 1)[0];
            if (
              pendingPrompt !== undefined &&
              pendingPromptResponses.length === 0 &&
              pendingPromptResponsesDrained !== null
            ) {
              yield* Deferred.succeed(pendingPromptResponsesDrained, undefined);
              pendingPromptResponsesDrained = null;
            }
            const responseTurn =
              pendingPrompt?.providerTurnId === turn?.providerTurn.id ? turn : null;
            if (
              event["success"] === false &&
              nativeCompacting &&
              recordString(event, "error")?.startsWith(PI_COMPACTING_PROMPT_REJECTION) === true &&
              pendingPrompt !== undefined &&
              responseTurn !== null
            ) {
              heldPrompts.splice(rejectedHeldCount++, 0, pendingPrompt);
              return;
            }
            if (
              event["success"] === true &&
              pendingPrompt?.kind === "turn_start" &&
              responseTurn !== null &&
              recordString(event["data"], "disposition") === "handled"
            ) {
              responseTurn.promptMayBeCommandOnly = true;
            }
            const consumedInputIsIdleCandidate =
              responseTurn !== null &&
              (responseTurn.settleWhenIdle ||
                (responseTurn.promptMayBeCommandOnly && !responseTurn.sawAgentActivity)) &&
              !pendingPromptResponses.some(
                (pending) => pending.providerTurnId === responseTurn.providerTurn.id,
              );
            if (event["success"] === true) {
              if (
                pendingPrompt?.messageId !== undefined &&
                responseTurn !== null &&
                recordString(recordField(event, "data"), "disposition") === "queued"
              ) {
                responseTurn.unreadSteers.push(pendingPrompt.messageId);
                yield* emitSteerStatus(responseTurn, pendingPrompt.messageId, "pending");
              }
              // Consumed input may emit no agent_settled; probe idle behind preceding native events.
              if (
                responseTurn !== null &&
                (consumedInputIsIdleCandidate ||
                  (pendingPrompt?.kind === "turn_start" &&
                    responseTurn.adoptedWake &&
                    (responseTurn.settleWhenIdle || responseTurn.promptMayBeCommandOnly)))
              ) {
                yield* scheduleSettleProbe(
                  responseTurn,
                  responseTurn.adoptedWake || responseTurn.settleWhenIdle,
                );
              }
              return;
            }
            if (event["success"] !== false) return;
            if (command === "steer" || pendingPrompt?.kind === "steer") {
              // A rejected steer refuses only that message; its target turn keeps running.
              yield* Effect.logWarning("Pi rejected a steer message.", {
                errorLength: recordString(event, "error")?.length,
              });
              if (consumedInputIsIdleCandidate && responseTurn !== null)
                yield* scheduleSettleProbe(responseTurn, responseTurn.settleWhenIdle);
              return;
            }
            const failedTurn =
              command === "prompt" && pendingPrompt?.kind === "turn_start"
                ? responseTurn
                : command === "parse"
                  ? turn
                  : null;
            if (failedTurn !== null) {
              const failure = makeProviderFailure({
                message: recordString(event, "error") ?? "Pi rejected the prompt.",
                class: "provider_error",
              });
              if (failedTurn.adoptedWake && command === "prompt") {
                failedTurn.rejectedPromptFailure = failure;
                failedTurn.settleWhenIdle = true;
                yield* scheduleSettleProbe(failedTurn, true);
              } else {
                failedTurn.failure = failure;
                if (state !== null) yield* finalizeTurn(state);
              }
            }
            return;
          }
          case "t3.ui_request_expired": {
            const requestId = recordString(event, "requestId");
            if (requestId === undefined) return;
            const pending = pendingPrompts.get(requestId);
            if (pending === undefined || pending !== event["pending"]) return;
            pendingPrompts.delete(requestId);
            yield* cancelPrompt(pending, yield* DateTime.now);
            return;
          }
          case "t3.flush_extension_errors": {
            for (const extensionError of outOfTurnExtensionErrors.splice(0)) {
              yield* emitExtensionError(extensionError);
            }
            return;
          }
          case "t3.rollback_barrier": {
            if (rollbackBarrier !== null && event["barrier"] === rollbackBarrier)
              yield* Deferred.succeed(rollbackBarrier, undefined);
            return;
          }
          case "t3.settle_probe": {
            const data = event["data"];
            const probeFailed = event["probeFailed"] === true;
            const settleAfterAgentActivity = event["settleAfterAgentActivity"] === true;
            const attempt = Math.max(1, Math.trunc(recordNumber(event, "attempt") ?? 1));
            if (
              turn === null ||
              turn.providerTurn.id !== event["providerTurnId"] ||
              turn.settleProbeGeneration !== event["settleProbeGeneration"] ||
              (!settleAfterAgentActivity && turn.sawAgentActivity) ||
              turn.activeCompaction !== null
            ) {
              return;
            }
            if (
              turn.manualCompactInFlight ||
              pendingCompactResponses.some(
                (pending) => pending.providerTurnId === turn.providerTurn.id,
              ) ||
              pendingPromptResponses.some(
                (pending) => pending.providerTurnId === turn.providerTurn.id,
              )
            ) {
              turn.settleWhenIdle = true;
              return;
            }
            if (probeFailed) {
              if (!settleAfterAgentActivity) {
                if (state !== null) yield* finalizeTurn(state);
                return;
              }
              if (attempt < SETTLE_PROBE_MAX_ATTEMPTS) {
                yield* Effect.sleep(SETTLE_PROBE_RETRY_DELAY).pipe(
                  Effect.andThen(scheduleSettleProbe(turn, true, attempt + 1)),
                  Effect.forkIn(scope),
                );
                return;
              }
              stopRequested = true;
              yield* connection.terminate;
              return;
            }
            if (
              recordField(data, "isStreaming") !== true &&
              recordField(data, "isCompacting") !== true &&
              (recordNumber(data, "pendingMessageCount") ?? 0) === 0
            ) {
              turn.settleWhenIdle = false;
              if (state === null) return;
              adoptLiveSessionFile(state, data);
              yield* finalizeTurn(state);
            }
            return;
          }
          default:
            return;
        }
      });
