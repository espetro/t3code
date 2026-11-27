// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of adapter.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
import * as Path from "effect/Path";
import * as Option from "effect/Option";
import * as NodeURL from "node:url";

import {
  AbsolutePath,
  Agent,
  Form,
  Location,
  Model,
  Permission,
  Provider,
  Session,
  SessionMessage,
  Skill,
  type OpenCodeEvent,
} from "@opencode/client/effect";
import * as Shell from "@opencode/schema/shell";
import { Mcp } from "@opencode/schema/mcp";
import {
  PROVIDER_SEND_TURN_MAX_IMAGE_BYTES,
  isOrchestrationV2WorkActive,
  parseGoalCommand,
  type ChatAttachment,
  type OrchestrationV2AppThread,
  type OrchestrationV2ConversationMessage,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2PlanStep,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2Subagent,
  type OrchestrationV2TurnItem,
  type OrchestrationV2UserInputQuestion,
  type MessageId,
  type ModelSelection,
  type PlanId,
  type ProviderApprovalDecision,
  type ProviderInstanceId,
  type RunId,
  type RuntimeRequestId,
} from "@t3tools/contracts";
import type * as Cause from "effect/Cause";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Digest from "effect/crypto/Digest";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Hex from "effect/encoding/Hex";
import * as Exit from "effect/Exit";
import * as P from "effect/Predicate";
import * as FileSystem from "effect/FileSystem";
import * as Queue from "effect/Queue";
import * as Schedule from "effect/Schedule";
import * as Scope from "effect/Scope";
import * as Schema from "effect/Schema";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";

import * as ProviderHost from "@t3tools/provider-core/server/ProviderHost";
import * as OpenCode2Client from "./OpenCode2Client.ts";
import * as OpenCode2Server from "./OpenCode2Server.ts";
import * as OpenCodeRuntime from "../OpenCodeRuntime.ts";
import { readableProviderErrorMessage } from "../providerErrorMessage.ts";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import { buildRuntimeInstructions } from "@t3tools/provider-core/server/runtimeInstructions";
import { t3OrchestrationSystemPrompt } from "@t3tools/provider-core/server/orchestrationInstructions";
import { SKILL_MENTION_PATTERN } from "@t3tools/shared/composerInlineTokens";
import { HTML_RENDER_TOOL_NAME } from "@t3tools/shared/htmlRender";
import {
  htmlRenderFromToolItem,
  SEND_TO_USER_TOOL_NAME,
  sentMessageFromToolItem,
} from "@t3tools/shared/toolOutput";
import { compareSemverVersions } from "@t3tools/shared/semver";
import * as KeyedLock from "@t3tools/shared/KeyedLock";
import { modelSelectionsEqual } from "@t3tools/shared/model";
import { causeErrorTag } from "@t3tools/shared/observability";

import {
  isProviderNativeImageAttachment,
  providerMessageTextWithAttachmentPaths,
} from "@t3tools/provider-core/server/attachmentPrompt";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import {
  backgroundWorkNotification,
  type BackgroundWorkReport,
} from "@t3tools/provider-core/server/notification";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
} from "@t3tools/provider-core/server/failure";
import {
  makeSubagentChildThread,
  makeSubagentConversationArtifacts,
  subagentThreadTitle,
} from "@t3tools/provider-core/server/subagentProjection";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";
import { turnScopedSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import { OPENCODE_PROVIDER, openCodePermissionRequestKind } from "../adapter.ts";
import {
  openCodeCodeModeHtmlRenders,
  openCodeCodeModeSentMessages,
  openCodeCommandFailed,
  openCodeToolTurnItem,
  stripOpenCodeReturnedSentMessage,
} from "../toolItems.ts";
import { bindOnTurnEvent } from "./adapter.onTurnEvent.ts";
import { bindRoute } from "./adapter.route.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindFinishTurn = (ctx: any) =>
Effect.fnUntraced(function* (
      state: ThreadState,
      terminal: TurnTerminal,
      threadDisposition: "reusable" | "broken" = "reusable",
    ) {
    const {
      answer,
      calls,
      callsAbove,
      callsAttachedTo,
      directoryOf,
      driver,
      emit,
      emitCompaction,
      emitProviderThread,
      emitProviderTurn,
      emitRetry,
      emitText,
      emitTool,
      events,
      message,
      model,
      modelSelection,
      models,
      next,
      now,
      ordinalOf,
      output,
      parent,
      pending,
      providerThread,
      providerThreadId,
      providerTurn,
      retainedRequestsOf,
      retry,
      rootNodeId,
      sessionId,
      sessionScope,
      setSessionStatus,
      settleCall,
      startedAt,
      state,
      status,
      subagent,
      text,
      threads,
      turnTokenUsage,
      updatedAt,
      values,
      windowOf
    } = pickScriptcBindCtx(ctx);

      const turn = state.active;
      if (turn === undefined) return;
      const promptDropped = terminal.status === "interrupted" && turn.unsent;
      state.active = undefined;
      for (const inboxID of turn.steers) state.strandedSteers.add(inboxID);
      for (const entry of pending.values()) {
        const background = callsAbove(entry.sessionId).some((call) => call.background);
        if (
          entry.sessionId === state.sessionId ||
          (entry.turn === turn && !(background && terminal.status !== "failed"))
        ) {
          yield* settleRequest(entry, "cancelled");
        }
      }
      const completedAt = yield* DateTime.now;
      for (const open of turn.texts.values()) {
        yield* emitText(state, turn, open.block, open.kind, (text) => text, true);
      }
      for (const id of turn.tools.keys()) {
        if ([...state.imageJobs.values()].some((job) => job.turn === turn && job.toolId === id))
          continue;
        yield* emitTool(
          state,
          turn,
          id,
          terminal.status === "completed" ? "completed" : "interrupted",
        );
      }
      for (const call of Array.from(state.calls.values())) {
        if (call.turn !== turn) continue;
        if (call.background && terminal.status !== "failed") continue;
        yield* settleCall(call, terminal.status === "completed" ? "completed" : terminal.status);
      }
      if (state.subagent !== undefined) {
        yield* emit({
          type: "node.updated",
          driver,
          node: {
            id: turn.input.rootNodeId,
            threadId: turn.input.threadId,
            runId: null,
            parentNodeId: null,
            rootNodeId: turn.input.rootNodeId,
            kind: "root_turn",
            status: terminal.status,
            countsForRun: false,
            providerThreadId: state.providerThread.id,
            providerTurnId: turn.providerTurn.id,
            nativeItemRef: turn.providerTurn.nativeTurnRef,
            runtimeRequestId: null,
            checkpointScopeId: null,
            startedAt: turn.providerTurn.startedAt,
            completedAt,
          },
        });
      }
      yield* emitCompaction(state, turn, terminal.status === "failed" ? "failed" : "interrupted");
      yield* emitRetry(
        state,
        turn,
        terminal.status,
        terminal.status === "failed" ? terminal.failure : undefined,
      );
      const window = windowOf(turn.input.runtimePolicy.cwd, turn.input.modelSelection.model);
      const lastStep = turn.lastStep;
      yield* emitProviderTurn(turn, {
        ...turn.providerTurn,
        status: terminal.status,
        completedAt,
        ...(promptDropped ? { promptDropped: true } : {}),
        turnTokenUsage: turnTokenUsage(turn, terminal.status),
        ...(lastStep === undefined
          ? {}
          : {
              tokenUsage: {
                usedTokens:
                  lastStep.input + lastStep.cache.read + lastStep.cache.write + lastStep.output,
                maxTokens: window ?? null,
                inputTokens: lastStep.input + lastStep.cache.read + lastStep.cache.write,
                cachedInputTokens: lastStep.cache.read,
                outputTokens: lastStep.output,
                reasoningOutputTokens: lastStep.reasoning,
                updatedAt: DateTime.formatIso(completedAt),
              },
            }),
      });
      // Subagent turns are runless; their calls own settlement.
      if (state.subagent !== undefined) {
        const call = state.subagent.call;
        for (const attached of callsAttachedTo(state)) {
          if (attached.run === state.subagent.turns) attached.answer = turn.answer;
        }
        if (!call.background && terminal.status !== "completed") {
          yield* settleCall(call, terminal.status);
        }
        if (terminal.status === "failed") {
          // Background calls settle when the parent reads a report; failed children have no report.
          // Fail every attached call so earlier background calls cannot leave phantom work,
          // regardless of which call joined last or is still foreground.
          for (const attached of callsAttachedTo(state)) {
            yield* settleCall(attached, terminal.status, terminal.failure.message);
          }
        }
        return;
      }
      state.providerThread = {
        ...state.providerThread,
        status: threadDisposition === "broken" ? "error" : "idle",
        updatedAt: completedAt,
      };
      yield* emitProviderThread(state);
      const anyActive = [...threads.values()].some(
        (candidate) => candidate.subagent === undefined && candidate.active !== undefined,
      );
      yield* setSessionStatus(pending.size > 0 ? "waiting" : anyActive ? "running" : "ready", null);
      const base = {
        type: "turn.terminal" as const,
        driver,
        // Native forks change thread IDs; terminal events must retain the recorded start identity.
        providerThreadId: turn.providerTurn.providerThreadId,
        providerTurnId: turn.providerTurn.id,
        runOrdinal: turn.input.runOrdinal,
        threadDisposition,
        ...(promptDropped ? { promptDropped: true as const } : {}),
        ...retainedRequestsOf(turn),
      };
      yield* emit(
        terminal.status === "failed"
          ? {
              ...base,
              status: "failed",
              failure: terminal.failure,
              failureItemOrdinal: ordinalOf(turn, `terminal-failure:${turn.providerTurn.id}`),
              ...(turn.retry === undefined
                ? {}
                : { retry: turn.retry.retry, retryStartedAt: turn.retry.startedAt }),
            }
          : { ...base, status: terminal.status, failure: null },
      );
      // Cold servers list models lazily; refresh unknown windows off-stream for the next turn.
      if (window === undefined) {
        yield* Effect.forkIn(readModels(directoryOf(turn.input.runtimePolicy.cwd)), sessionScope);
      }
    });
