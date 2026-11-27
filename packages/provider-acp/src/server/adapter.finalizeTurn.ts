// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of adapter.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
import { pickBindCtx } from "./adapter.bindCtx.ts";
// @effect-diagnostics nodeBuiltinImport:off

import {
  type ChatAttachment,
  type ModelSelection,
  type OrchestrationV2ConversationMessage,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2PlanArtifact,
  type OrchestrationV2PlanStep,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderThreadNativeMetadata,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2Subagent,
  type OrchestrationV2TurnItem,
  type OrchestrationV2UserInputQuestion,
  type OrchestrationV2WebSearchResult,
  type ProviderApprovalDecision,
  type ProviderApprovalOption,
  type ProviderInstanceId,
  type ProviderInteractionMode,
  type ProviderDriverKind,
  type ProviderRequestKind,
  type ProviderThreadId,
  type ProviderUserInputAnswers,
  type RuntimeMode,
  type RuntimeRequestId,
  type ThreadTokenUsageSnapshot,
  type ThreadId,
  isRuntimeModeAbove,
  type TurnTokenUsage,
} from "@t3tools/contracts";
import { AgentScope, AgentScopeThreadId } from "@t3tools/shared/AgentScope";
import { parseGrepOutput } from "@t3tools/shared/grepOutput";
import * as HostProcess from "@t3tools/shared/HostProcess";
import { HTML_RENDER_TOOL_NAME } from "@t3tools/shared/htmlRender";
import { modelSelectionsEqual } from "@t3tools/shared/model";
import { type SelfInvocation, selfInvocationArgs } from "@t3tools/shared/nodeRuntime";
import { resolveT3McpToolId } from "@t3tools/shared/t3McpToolPresentation";
import {
  compactDynamicToolOutput,
  compactT3McpToolOutput,
  htmlRenderFromToolItem,
  mcpToolResultOutput,
} from "@t3tools/shared/toolOutput";
import { FILE_HEADERS_ONLY, formatPatch, structuredPatch } from "diff";
import * as Cause from "effect/Cause";
import * as Clock from "effect/Clock";
import * as SecureRandom from "effect/crypto/SecureRandom";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Equal from "effect/Equal";
import * as Exit from "effect/Exit";
import * as FileSystem from "effect/FileSystem";
import * as Fiber from "effect/Fiber";
import * as Option from "effect/Option";
import * as Queue from "effect/Queue";
import * as Ref from "effect/Ref";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as Scope from "effect/Scope";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import * as SubscriptionRef from "effect/SubscriptionRef";
import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";
import * as EffectAcpErrors from "effect-acp/errors";
import type * as EffectAcpProtocol from "effect-acp/protocol";
import type * as EffectAcpSchema from "effect-acp/compat";

import {
  formatReadToolLabel,
  formatSearchToolLabel,
  searchToolLabelParts,
} from "@t3tools/shared/toolActivity";
import { isWorkspaceImagePreviewPath } from "@t3tools/shared/mediaPreview";
import * as ProviderHost from "@t3tools/provider-core/server/ProviderHost";
import { makeAcpMcpOverAcpBridge, type AcpMcpOverAcpBridge } from "./mcpOverAcpBridge.ts";
import { mcpToolPresentation } from "@t3tools/provider-core/server/mcpToolPresentation";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import * as McpProviderSession from "@t3tools/provider-core/server/mcpSession";
import {
  applyAcpAgentTerminalUpdate,
  MAX_AGENT_TERMINAL_OUTPUT_CHARS,
  acpContentBlockDisplayText,
  embeddedTerminalIdsFromSessionUpdate,
  extractMcpToolCallIdentity,
  findModelConfigOption,
  makeAcpUnreadToolCalls,
  mergeToolCallState,
  parsePermissionRequest,
  parseSessionUpdateEvent,
  sessionUpdateIsReplay,
  toolCallVisibleOutputChanged,
  unreadToolCallUpdate,
  withTrackedChangedPaths,
  withUnknownChangedPaths,
  withTrackedPermissionToolCall,
  type AcpPlanUpdate,
  type AcpAgentTerminalState,
  type AcpSessionModeState,
  type AcpToolCallState,
} from "./runtimeModel.ts";
import {
  acpClientExecuteDisposition,
  acpMcpToolApprovalElicitationDisposition,
  acpChangedPathsOfToolCall,
  acpPermissionDisposition,
  mergeAcpChangedPaths,
  type AcpPermissionDisposition,
  makeAcpClientPolicyGrants,
  unknownRecord,
} from "./clientPolicy.ts";
import {
  parseElicitationForm,
  withOptionalChoices,
  type ElicitationQuestionForm,
} from "./elicitationForm.ts";
import {
  makeAcpClientTerminals,
  resolveEmbeddedTerminalContent,
  type AcpClientTerminals,
} from "./clientTerminals.ts";
import {
  ACP_EMPTY_OPTION_VALUE,
  ACP_SESSION_MODE_OPTION_ID,
  flattenSelectChoices,
} from "./sessionConfig.ts";
import * as AcpSessionRuntime from "./AcpSessionRuntime.ts";
import {
  t3AcpPromptWithInstructions,
  type T3AcpInstructionState,
} from "@t3tools/provider-core/server/orchestrationInstructions";
import { buildRuntimeInstructions } from "@t3tools/provider-core/server/runtimeInstructions";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import type * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  type BackgroundWork,
  type BackgroundWorkReport,
  backgroundWorkNotification,
} from "@t3tools/provider-core/server/notification";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
} from "@t3tools/provider-core/server/failure";
import { acpSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import {
  isProviderNativeImageAttachment,
  providerMessageTextWithAttachmentPaths,
} from "@t3tools/provider-core/server/attachmentPrompt";
import {
  makeSubagentChildThread,
  makeSubagentConversationArtifacts,
  subagentThreadTitle,
} from "@t3tools/provider-core/server/subagentProjection";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";

import {
  acpPostSettleContinuationOfferEvidence,
  acpSubagentHasPendingBackgroundWork,
  acpSubagentStatusBlocksTurnSettlement,
  isCompactCommand,
  isCompactionMessage,
  nativeThreadId,
} from "./adapter.helpers.ts";
import type { ActiveAcpTurn } from "./adapter.helpers.ts";

export const bindFinalizeTurn = (ctx: any): any =>
  Effect.fnUntraced(function* (
    context: ActiveAcpTurn,
    status: "completed" | "interrupted" | "failed" | "cancelled",
    failure?: OrchestrationV2ProviderFailure,
    options?: {
      readonly childTurnsContinue?: boolean;
      readonly threadDisposition?: "reusable" | "broken";
    },
  ): Effect.fn.Return<void> {
    const {
      activeSessionId,
      activeTurn,
      carryoverSubagents,
      closeTextStreams,
      compactsContext,
      contextUsageBySessionId,
      detachBackgroundCommands,
      driver,
      emitProviderEvent,
      emitProviderRetry,
      emitSubagent,
      finalizeTurn,
      flavor,
      flushPendingSubagentAssistant,
      followsAgentWorkState,
      hasWorkingDescendant,
      idAllocator,
      input,
      markSessionCompacted,
      mcpSessions,
      midTurnUnreportedCompletedTaskIds,
      offerContinuationRun,
      postSettleContinuationEnabled,
      providerThreadByNativeSessionId,
      providerTurnPayload,
      reportAgentModeChanges,
      resolveItemOrdinal,
      runningBackgroundTaskIds,
      steerInjections,
      stoppedRunQuarantine,
      terminalizeOpenForegroundTools,
      terminalizeOpenRunOwnedItems,
      textEmissionPermit,
      wakeBuffer,
    } = pickBindCtx(ctx);

    if (context.finalized) return;
    const settledStatus = context.interrupted ? "interrupted" : status;
    const threadDisposition = options?.threadDisposition ?? "reusable";
    context.finalizedStatus = settledStatus;
    context.finalized = true;
    const watchdog = context.inactivityWatchdog;
    context.inactivityWatchdog = undefined;
    if (watchdog !== undefined) {
      yield* Fiber.interrupt(watchdog).pipe(Effect.forkDetach, Effect.asVoid);
    }
    const directStopQuarantine = yield* Ref.get(stoppedRunQuarantine);
    if (flavor.subagentsIdleOnTurnCompletion === true) {
      for (const subagent of context.subagents.values()) {
        if (!acpSubagentStatusBlocksTurnSettlement(subagent.task.status)) continue;
        yield* emitSubagent(context, {
          nativeTaskId: subagent.task.nativeTaskRef?.nativeId ?? subagent.task.id,
          prompt: subagent.task.prompt,
          title: subagent.task.title,
          model: subagent.task.model,
          status: settledStatus === "completed" ? "idle" : settledStatus,
          childSessionId: subagent.childSessionId,
          result: null,
        });
      }
    }
    if (settledStatus === "completed") {
      yield* terminalizeOpenForegroundTools(context);
    } else if (settledStatus === "interrupted") {
      yield* terminalizeOpenRunOwnedItems(context, {
        terminalizeSubagents: directStopQuarantine,
      });
    }
    yield* mcpSessions.clearToolResults(context.input.threadId);
    yield* closeTextStreams(context);
    // Ingestion may stop at turn.terminal, before a delayed flush would run.
    yield* textEmissionPermit.withPermit(
      Effect.forEach(context.subagents.values(), flushPendingSubagentAssistant, {
        discard: true,
      }),
    );
    if (settledStatus !== "failed") {
      yield* emitProviderRetry(context, settledStatus);
    }
    if (
      compactsContext &&
      isCompactCommand(context.input.message) &&
      settledStatus === "completed"
    ) {
      yield* markSessionCompacted(context.nativeThreadId);
    }
    const now = yield* DateTime.now;
    if (
      compactsContext &&
      isCompactionMessage(context.input.message) &&
      settledStatus === "completed" &&
      !context.tools.keys().some((id) => id.startsWith("acp-compaction:"))
    ) {
      context.contextUsage = null;
      yield* Ref.update(contextUsageBySessionId, (current) => {
        const updated = new Map(current);
        updated.delete(context.nativeThreadId);
        return updated;
      });
      const nativeItemId = `${context.nativeTurnId}:compaction`;
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver,
        turnItem: {
          id: idAllocator.derive.turnItemFromProviderItem({ driver, nativeItemId }),
          threadId: context.input.threadId,
          runId: context.input.runId,
          nodeId: context.input.rootNodeId,
          providerThreadId: context.input.providerThread.id,
          providerTurnId: context.providerTurnId,
          nativeItemRef: { driver, nativeId: nativeItemId, strength: "weak" },
          parentItemId: null,
          ordinal: yield* resolveItemOrdinal(context, nativeItemId),
          type: "compaction",
          driver,
          status: "completed",
          title: "Context compacted",
          startedAt: context.startedAt,
          completedAt: now,
          updatedAt: now,
        },
      });
    }
    yield* reportAgentModeChanges(context.input.threadId);
    const turn = providerTurnPayload(context, settledStatus, now);
    yield* emitProviderEvent({
      type: "provider_turn.updated",
      driver,
      threadId: context.input.threadId,
      providerTurn: turn,
    });
    const updatedProviderThread: OrchestrationV2ProviderThread = {
      ...context.input.providerThread,
      providerSessionId: input.providerSessionId,
      status: threadDisposition === "broken" ? "error" : "active",
      lastRunOrdinal: context.input.runOrdinal,
      firstRunOrdinal: context.input.providerThread.firstRunOrdinal ?? context.input.runOrdinal,
      contextUsage: context.contextUsage,
      nativeMetadata: context.nativeMetadata,
      updatedAt: now,
    };
    yield* Ref.update(providerThreadByNativeSessionId, (current) =>
      new Map(current).set(context.nativeThreadId, updatedProviderThread),
    );
    yield* emitProviderEvent({
      type: "provider_thread.updated",
      driver,
      providerThread: updatedProviderThread,
    });
    const rootSessionId = yield* Ref.get(activeSessionId);
    const childTurnsContinue =
      settledStatus === "failed" &&
      (options?.childTurnsContinue === true ||
        (followsAgentWorkState && rootSessionId !== null && hasWorkingDescendant(rootSessionId)));
    yield* emitProviderEvent(
      settledStatus === "failed"
        ? {
            type: "turn.terminal",
            driver,
            providerThreadId: context.input.providerThread.id,
            providerTurnId: context.providerTurnId,
            runOrdinal: context.input.runOrdinal,
            failureItemOrdinal: yield* resolveItemOrdinal(
              context,
              `terminal-failure:${context.providerTurnId}`,
            ),
            status: settledStatus,
            ...(childTurnsContinue ? { childTurnsContinue: true } : {}),
            failure: failure ?? makeProviderFailure({ class: "provider_error" }),
            ...(context.providerRetry === undefined
              ? {}
              : {
                  retry: context.providerRetry.retry,
                  retryStartedAt: context.providerRetry.startedAt,
                }),
            threadDisposition,
          }
        : {
            type: "turn.terminal",
            driver,
            providerThreadId: context.input.providerThread.id,
            providerTurnId: context.providerTurnId,
            runOrdinal: context.input.runOrdinal,
            status: settledStatus,
            failure: null,
            threadDisposition,
          },
    );
    const subagentsRequiringCarryover = [...context.subagents.values()].filter(
      acpSubagentHasPendingBackgroundWork,
    );
    if (subagentsRequiringCarryover.length > 0 && !directStopQuarantine) {
      const sessionId = yield* Ref.get(activeSessionId);
      if (sessionId !== null) {
        yield* Ref.set(carryoverSubagents, {
          sessionId,
          projectsLateTerminals: settledStatus === "completed" || childTurnsContinue,
          subagents: subagentsRequiringCarryover,
        });
      }
    }
    yield* Ref.set(activeTurn, null);
    if (settledStatus === "completed" && !directStopQuarantine) {
      yield* detachBackgroundCommands(context);
    }
    steerInjections.clear();
    if (
      postSettleContinuationEnabled &&
      settledStatus === "completed" &&
      !directStopQuarantine &&
      (yield* Ref.get(runningBackgroundTaskIds)).size === 0 &&
      (yield* Ref.get(wakeBuffer)).some((notification) =>
        acpPostSettleContinuationOfferEvidence(notification, flavor),
      )
    ) {
      const sessionId = yield* Ref.get(activeSessionId);
      if (sessionId !== null) {
        yield* offerContinuationRun(sessionId);
      }
    }
    if (settledStatus !== "completed") {
      yield* Ref.set(midTurnUnreportedCompletedTaskIds, new Set());
    }
    yield* Deferred.succeed(context.completed, undefined).pipe(Effect.ignore);
  });
