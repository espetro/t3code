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
  acpCarryoverTerminalShouldClearContinuation,
  acpIsProviderContinuationMessage,
  acpRootSessionUpdateIngestsOutput,
  acpSubagentStatusIsTerminal,
  appendToolContentText,
  nativeThreadId,
  textFromUnknown,
} from "./adapter.helpers.ts";

export const bindHandleSessionUpdate = (ctx: any): any =>
  Effect.fnUntraced(function* (notification: EffectAcpSchema.SessionNotification) {
    const {
      activeSessionId,
      activeTurn,
      appendText,
      appendToolOutputText,
      applyBackgroundTaskMutationRunning,
      applyFinalizedActiveTurnSubagentTerminal,
      applyLateBackgroundMutation,
      bufferPostSettleWake,
      carryoverSubagents,
      clearMidTurnUnreportedTaskIds,
      contextUsageBySessionId,
      continuationRequested,
      emitNotice,
      emitPlan,
      emitProviderRetry,
      emitSubagent,
      emitTool,
      events,
      extractSubagentUpdate,
      finalizeTurn,
      flavor,
      followNativeChild,
      followsAgentWorkState,
      handleSessionUpdate,
      handledBackgroundTaskIdsInActiveTurn,
      hasDeferredBackgroundWork,
      idleReportedSubagents,
      input,
      markAwaitingBackgroundHydration,
      markPendingInjectedReport,
      midTurnUnreportedCompletedTaskIds,
      nativeMetadataBySessionId,
      offerContinuationRun,
      projectAgentTerminalUpdate,
      projectDetachedBackgroundCommand,
      projectExtractedContextUsage,
      projectSubagentNotification,
      projectSubagentTool,
      publishProviderThreadState,
      rearmDeferredFinalize,
      recordLoadedHistory,
      replaceText,
      setToolOutputText,
      settleIdleWork,
      stoppedRunQuarantine,
      suppressPostSettleMonitorPrompt,
      updateCarryoverSubagentStatus,
      wakeBuffer,
    } = pickBindCtx(ctx);

    const context = yield* Ref.get(activeTurn);
    const update = notification.update;
    if (
      followsAgentWorkState &&
      flavor.extractSubagentSessionEvent !== undefined &&
      notification.sessionId !== (yield* Ref.get(activeSessionId)) &&
      (yield* Ref.get(stoppedRunQuarantine))
    )
      return;
    yield* projectExtractedContextUsage(notification, true);
    if (yield* projectAgentTerminalUpdate(notification, context)) return;
    if (yield* projectDetachedBackgroundCommand(notification, context)) return;
    if (flavor.replyEndsWithUsageUpdate === true) {
      if (context === null) {
        // A reply can end before its continuation run starts; replay its end with its output.
        if (update.sessionUpdate === "usage_update" && (yield* Ref.get(wakeBuffer)).length > 0) {
          yield* Ref.update(wakeBuffer, (current) => [...current, notification]);
        }
      } else if (context.nativeThreadId === notification.sessionId) {
        if (update.sessionUpdate === "usage_update") {
          context.replyOpen = false;
          if (context.promptSettled) yield* idleReportedSubagents(context);
          yield* rearmDeferredFinalize(context);
        } else if (acpRootSessionUpdateIngestsOutput(notification)) {
          context.replyOpen = true;
        }
      }
    }
    if (update.sessionUpdate === "usage_update" || update.sessionUpdate === "session_info_update") {
      const stateEvent = parseSessionUpdateEvent(notification).events.find(
        (event) => event._tag === "UsageUpdated" || event._tag === "SessionInfoUpdated",
      );
      if (stateEvent === undefined) return;
      if (stateEvent._tag === "UsageUpdated") {
        yield* Ref.update(contextUsageBySessionId, (current) =>
          new Map(current).set(notification.sessionId, stateEvent.usage),
        );
        if (context?.nativeThreadId === notification.sessionId) {
          context.contextUsage = stateEvent.usage;
        }
      } else {
        const metadata = yield* Ref.modify(nativeMetadataBySessionId, (current) => {
          const merged = {
            ...current.get(notification.sessionId),
            ...stateEvent.metadata,
          };
          return [merged, new Map(current).set(notification.sessionId, merged)] as const;
        });
        if (context?.nativeThreadId === notification.sessionId) {
          context.nativeMetadata = metadata;
        }
      }
      yield* publishProviderThreadState(notification.sessionId, context);
      return;
    }
    if (yield* followNativeChild(notification, context)) return;
    if (
      followsAgentWorkState &&
      !(yield* Ref.get(stoppedRunQuarantine)) &&
      notification.sessionId === (yield* Ref.get(activeSessionId))
    ) {
      if (update.sessionUpdate === "state_update") ctx.agentWork = update;
      if (
        update.sessionUpdate === "user_message" ||
        update.sessionUpdate === "user_message_chunk"
      ) {
        ctx.agentWork = { sessionUpdate: "state_update", state: "running" };
        if (context !== null) {
          context.workAccepted = true;
          if (!context.finalized) return;
        }
      }
      if (context !== null && update.sessionUpdate === "state_update" && update.state === "idle") {
        yield* settleIdleWork(context);
      } else if (
        context === null &&
        !(yield* Ref.get(stoppedRunQuarantine)) &&
        (acpRootSessionUpdateIngestsOutput(notification) ||
          update.sessionUpdate === "user_message" ||
          update.sessionUpdate === "user_message_chunk" ||
          (update.sessionUpdate === "state_update" && update.state === "running"))
      ) {
        yield* Ref.update(wakeBuffer, (current) => [...current, notification]);
        yield* offerContinuationRun(notification.sessionId);
        return;
      }
    }
    if (
      context?.finalized === true &&
      (yield* applyFinalizedActiveTurnSubagentTerminal(context, notification))
    ) {
      return;
    }
    if (
      context !== null &&
      context.finalized &&
      (yield* Ref.get(handledBackgroundTaskIdsInActiveTurn)).size > 0 &&
      (yield* Ref.get(midTurnUnreportedCompletedTaskIds)).size === 0 &&
      (update.sessionUpdate === "agent_message_chunk" ||
        update.sessionUpdate === "agent_thought_chunk")
    ) {
      yield* Ref.set(suppressPostSettleMonitorPrompt, true);
      return;
    }
    if (
      context !== null &&
      (yield* Ref.get(suppressPostSettleMonitorPrompt)) &&
      (update.sessionUpdate === "agent_message_chunk" ||
        update.sessionUpdate === "agent_thought_chunk")
    ) {
      return;
    }
    if (
      context?.finalized === true &&
      update.sessionUpdate === "user_message_chunk" &&
      update.content.type === "text"
    ) {
      const mutations = flavor.extractBackgroundToolMutation?.(update.content.text) ?? [];
      for (const mutation of mutations) {
        yield* applyLateBackgroundMutation(notification.sessionId, mutation);
      }
      return;
    }
    if (context === null) {
      if (yield* Ref.get(stoppedRunQuarantine)) {
        return;
      }
      const bufferOutcome = yield* bufferPostSettleWake(notification);
      // Completed roots retain subscribers and can project terminals now; interrupted roots may lack runId ownership.
      const carryover = yield* Ref.get(carryoverSubagents);
      const rootTerminalCanStillProject =
        carryover !== null &&
        carryover.sessionId === (yield* Ref.get(activeSessionId)) &&
        carryover.projectsLateTerminals;
      const projectCarryover = rootTerminalCanStillProject;
      let carryoverTerminalized = false;
      if (
        flavor.extractSubagentUpdate !== undefined &&
        (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update")
      ) {
        for (const event of parseSessionUpdateEvent(notification).events) {
          if (event._tag !== "ToolCallUpdated") continue;
          const toolCall = flavor.normalizeToolCall?.(event.toolCall) ?? event.toolCall;
          const subagentUpdate = extractSubagentUpdate(toolCall);
          if (subagentUpdate === undefined) continue;
          if (!acpSubagentStatusIsTerminal(subagentUpdate.status)) {
            continue;
          }
          if (
            yield* updateCarryoverSubagentStatus(
              subagentUpdate.nativeTaskId,
              subagentUpdate.status,
              subagentUpdate.result,
              { project: projectCarryover },
            )
          ) {
            carryoverTerminalized = true;
          }
          if (
            subagentUpdate.childSessionId !== null &&
            (yield* updateCarryoverSubagentStatus(
              subagentUpdate.childSessionId,
              subagentUpdate.status,
              subagentUpdate.result,
              { project: projectCarryover },
            ))
          ) {
            carryoverTerminalized = true;
          }
        }
      }
      if (
        update.sessionUpdate === "user_message_chunk" &&
        update.content.type === "text" &&
        flavor.extractSubagentEndNotice !== undefined
      ) {
        const notice = flavor.extractSubagentEndNotice(update.content.text);
        if (
          notice !== undefined &&
          (yield* updateCarryoverSubagentStatus(notice.childSessionId, notice.status, undefined, {
            project: projectCarryover,
          }))
        ) {
          carryoverTerminalized = true;
        }
      }
      const continuationOffered = bufferOutcome.offerContinuation
        ? yield* offerContinuationRun(notification.sessionId)
        : false;
      const wakeOutcome = { ...bufferOutcome, continuationOffered };
      if (carryoverTerminalized && !wakeOutcome.buffered) {
        if (
          acpCarryoverTerminalShouldClearContinuation({
            continuationOffered: wakeOutcome.continuationOffered,
            wakeBufferLength: (yield* Ref.get(wakeBuffer)).length,
          })
        ) {
          yield* Ref.set(continuationRequested, false);
        }
        return;
      }
      if (wakeOutcome.stopProcessing) {
        return;
      }
      yield* recordLoadedHistory(notification, true);
      return;
    }
    if (context.finalized) return;
    const rootSessionId = yield* Ref.get(activeSessionId);
    if (notification.sessionId !== rootSessionId) {
      if (context.finalized) return;
      if (flavor.extractSubagentUpdate === undefined) return;
      const subagent = context.subagentsBySessionId.get(notification.sessionId);
      if (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update") {
        if (subagent === undefined) return;
        const nativeTaskId = subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id);
        for (const event of parseSessionUpdateEvent(notification).events) {
          if (event._tag !== "ToolCallUpdated") continue;
          const toolCall = flavor.normalizeToolCall?.(event.toolCall) ?? event.toolCall;
          const subagentUpdate = extractSubagentUpdate(toolCall);
          if (subagentUpdate !== undefined) {
            if (
              subagentUpdate.nativeTaskId === nativeTaskId ||
              subagentUpdate.childSessionId === notification.sessionId
            ) {
              yield* emitSubagent(context, subagentUpdate);
            }
            continue;
          }
          yield* projectSubagentTool(
            subagent,
            notification.sessionId,
            toolCall,
            undefined,
            context,
          );
        }
        return;
      }
      if (update.sessionUpdate === "tool_call_content_chunk") {
        if (subagent !== undefined)
          yield* projectSubagentTool(subagent, notification.sessionId, update, undefined, context);
        return;
      }
      const isDisplayableAssistantUpdate =
        (update.sessionUpdate === "agent_message_chunk" &&
          acpContentBlockDisplayText(update.content) !== undefined) ||
        (update.sessionUpdate === "agent_message" && update.content !== undefined);
      if (!isDisplayableAssistantUpdate) {
        return;
      }
      if (subagent !== undefined) {
        yield* projectSubagentNotification(subagent, notification, context);
        return;
      }
      const buffered = context.pendingSubagentNotifications.get(notification.sessionId) ?? [];
      buffered.push(notification);
      context.pendingSubagentNotifications.set(notification.sessionId, buffered);
      return;
    }
    // The activeSessionId yield may let idle/prompt settlement finalize this context.
    if (context.finalized) return;
    if (
      context.promptSettled &&
      !acpIsProviderContinuationMessage(context.input.message) &&
      flavor.isProviderWakeNotification?.(notification) === true
    ) {
      if (hasDeferredBackgroundWork(context)) {
        yield* Ref.update(wakeBuffer, (current) => [...current, notification]);
        return;
      }
      yield* finalizeTurn(context, context.promptSettledStatus ?? "completed");
      const wake = yield* bufferPostSettleWake(notification);
      if (wake.offerContinuation) {
        yield* offerContinuationRun(notification.sessionId);
      }
      return;
    }
    if (
      update.sessionUpdate !== "tool_call_update" &&
      update.sessionUpdate !== "plan" &&
      update.sessionUpdate !== "plan_update" &&
      update.sessionUpdate !== "plan_removed" &&
      acpRootSessionUpdateIngestsOutput(notification)
    ) {
      yield* emitProviderRetry(context, "completed");
    }
    if (
      context.outgoingPrompt !== undefined &&
      (update.sessionUpdate === "user_message" || update.sessionUpdate === "user_message_chunk")
    ) {
      // ACP v2 prompt acknowledgments lack a messageId; correlate one full echo by content.
      if (
        context.consumedPromptMessageId === undefined &&
        update.sessionUpdate === "user_message" &&
        Equal.equals(update.content, context.outgoingPrompt)
      ) {
        context.consumedPromptMessageId = update.messageId;
      }
      if (
        context.consumedPromptMessageId !== undefined &&
        context.consumedPromptMessageId === update.messageId
      )
        return;
    }
    switch (update.sessionUpdate) {
      case "state_update": {
        const toolCallId = `${context.nativeTurnId}:requires-action`;
        const existing = context.tools.get(toolCallId);
        if (update.state === "requires_action") {
          yield* emitTool(context, {
            toolCallId,
            kind: "other",
            title: "Action required",
            status: "requiresAction",
            data: { state: "requires_action" },
          });
        } else if (existing?.status === "requiresAction") {
          yield* emitTool(context, {
            ...existing,
            status: "completed",
            data: { ...existing.data, state: update.state },
          });
        }
        break;
      }
      case "agent_message_chunk": {
        const text = acpContentBlockDisplayText(update.content);
        if (text !== undefined) {
          const startsNewAssistantSegment = context.assistant.current === null;
          if (context.pendingInjectedReport.size > 0) {
            const reportedTaskIds = [...context.pendingInjectedReport];
            context.pendingInjectedReport.clear();
            yield* clearMidTurnUnreportedTaskIds(reportedTaskIds);
          } else if (
            startsNewAssistantSegment &&
            context.promptSettled &&
            (yield* Ref.get(midTurnUnreportedCompletedTaskIds)).size > 0
          ) {
            context.earlyInjectedReportObserved = true;
          }
          yield* appendText(context, "assistant", text, update.messageId);
        }
        break;
      }
      case "agent_thought_chunk": {
        const text = acpContentBlockDisplayText(update.content);
        if (text !== undefined) {
          yield* appendText(context, "reasoning", text, update.messageId);
        }
        break;
      }
      case "user_message":
      case "agent_message":
      case "agent_thought": {
        if (update.content === undefined) break;
        const text = (update.content ?? [])
          .flatMap((content) => {
            const display = acpContentBlockDisplayText(content);
            return display === undefined ? [] : [display];
          })
          .join("\n");
        yield* replaceText(
          context,
          update.sessionUpdate === "user_message"
            ? "user"
            : update.sessionUpdate === "agent_message"
              ? "assistant"
              : "reasoning",
          text,
          update.messageId,
        );
        break;
      }
      case "tool_call_content_chunk": {
        const text =
          update.content.type === "content"
            ? acpContentBlockDisplayText(update.content.content)
            : update.content.type === "diff"
              ? "changes" in update.content
                ? update.content.patch?.text
                : update.content.newText
              : undefined;
        // A diff chunk names files the call changes; the tracked call keeps them for policy.
        const chunkPaths = acpChangedPathsOfToolCall({ content: [update.content] });
        const namesPaths = chunkPaths === "unknown" || chunkPaths.length > 0;
        if (text !== undefined || namesPaths) {
          const stored: AcpToolCallState = context.tools.get(update.toolCallId) ?? {
            toolCallId: update.toolCallId,
            status: "inProgress" as const,
            data: { toolCallId: update.toolCallId },
          };
          const previous = namesPaths
            ? {
                ...stored,
                changedPaths: mergeAcpChangedPaths(stored.changedPaths, chunkPaths),
              }
            : stored;
          // Text chunks extend the content list so a later content replacement still shows.
          yield* emitTool(
            context,
            text === undefined
              ? previous
              : update.content.type === "content" && previous.data.rawOutput === undefined
                ? {
                    ...previous,
                    data: {
                      ...previous.data,
                      content: appendToolContentText(previous.data.content, text),
                    },
                  }
                : previous.data.rawOutput === undefined
                  ? setToolOutputText(
                      previous,
                      `${textFromUnknown(previous.data.content) ?? ""}${text}`,
                    )
                  : appendToolOutputText(previous, text),
          );
        }
        break;
      }
      case "compaction_summary_chunk": {
        const text = acpContentBlockDisplayText(update.content);
        if (text !== undefined) {
          const toolCallId = `acp-compaction:${update.compactionId}`;
          const previous = context.tools.get(toolCallId) ?? {
            toolCallId,
            kind: "think",
            title: "Compact context",
            status: "inProgress" as const,
            data: { toolCallId },
          };
          yield* emitTool(context, appendToolOutputText(previous, text));
        }
        break;
      }
      case "user_message_chunk": {
        if (update.content.type === "text" && flavor.extractBackgroundToolMutation) {
          const mutations = flavor.extractBackgroundToolMutation(update.content.text);
          const terminalTaskIds = mutations
            .filter((mutation) => mutation.status !== "running")
            .map((mutation) => mutation.taskId);
          const reportArrivedBeforeNotice =
            context.earlyInjectedReportObserved && terminalTaskIds.length > 0;
          if (reportArrivedBeforeNotice) {
            context.earlyInjectedReportObserved = false;
            yield* clearMidTurnUnreportedTaskIds(terminalTaskIds);
          }
          for (const mutation of mutations) {
            const toolCallId = context.toolCallIdsByBackgroundTaskId.get(mutation.taskId);
            const previous = toolCallId !== undefined ? context.tools.get(toolCallId) : undefined;
            if (previous !== undefined) {
              let nextStatus =
                mutation.status === "running"
                  ? ("inProgress" as const)
                  : mutation.status === "failed"
                    ? ("failed" as const)
                    : ("completed" as const);
              if (nextStatus !== "inProgress") {
                yield* markAwaitingBackgroundHydration(context, mutation.taskId);
                nextStatus = "inProgress";
              }
              yield* emitTool(
                context,
                appendToolOutputText({ ...previous, status: nextStatus }, mutation.appendOutput),
              );
            }
            yield* applyBackgroundTaskMutationRunning(mutation);
            if (mutation.status !== "running" && !reportArrivedBeforeNotice) {
              yield* markPendingInjectedReport(context, mutation.taskId);
            }
          }
        }
        if (update.content.type === "text" && flavor.extractSubagentEndNotice) {
          const notice = flavor.extractSubagentEndNotice(update.content.text);
          const subagent =
            notice !== undefined
              ? context.subagentsBySessionId.get(notice.childSessionId)
              : undefined;
          if (
            notice !== undefined &&
            subagent !== undefined &&
            (subagent.task.status === "running" || subagent.task.status === "pending")
          ) {
            // Agents may answer without hydrating output; finish the subagent so deferred finalize can close.
            yield* emitSubagent(context, {
              nativeTaskId: subagent.task.nativeTaskRef?.nativeId ?? notice.childSessionId,
              prompt: subagent.task.prompt,
              title: subagent.task.title,
              model: subagent.task.model,
              status: notice.status,
              childSessionId: notice.childSessionId,
              result: null,
              suppressNormalTool: true,
            });
          }
        }
        break;
      }
      default: {
        const parsed = parseSessionUpdateEvent(notification);
        for (const event of parsed.events) {
          if (event._tag === "ToolCallUpdated") {
            yield* emitTool(context, event.toolCall, undefined, event.rawPayload);
          } else if (event._tag === "PlanUpdated") {
            yield* emitPlan(context, event.payload, update.sessionUpdate !== "plan");
          } else if (event._tag === "NoticeReceived") {
            yield* emitNotice(context, event);
          } else if (event._tag === "UnknownUpdate") {
            yield* emitTool(context, {
              toolCallId: `${context.nativeTurnId}:unsupported:${event.updateType}`,
              kind: "other",
              title: `Unsupported ACP update: ${event.updateType}`,
              status: "completed",
              data: { updateType: event.updateType },
            });
          }
        }
      }
    }
    yield* rearmDeferredFinalize(context);
  });
