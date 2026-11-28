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
  acpMcpToolCallOutput,
  acpToolCallDiffPatch,
  buildAcpStandardToolTurnItem,
  commandExitCode,
  completedAtForStatus,
  nativeThreadId,
  nodeStatus,
  pathFromToolCall,
  shouldPersistToolUpdate,
  stoppedToolStatus,
  structuredFileChanges,
  textFromUnknown,
  toolStatus,
} from "./adapter.helpers.ts";
import type { ActiveAcpTurn, ProjectedToolStatus } from "./adapter.helpers.ts";

export const bindEmitTool = (ctx: any): any =>
  Effect.fnUntraced(function* (
    context: ActiveAcpTurn,
    incoming: AcpToolCallState,
    projectedStatus?: ProjectedToolStatus,
    rawPayload?: unknown,
  ) {
    const {
      appendToolOutputText,
      applyBackgroundTaskMutationRunning,
      closeTextStream,
      contextUsageBySessionId,
      detachedBackgroundCommandTurn,
      driver,
      embeddedTerminalCommands,
      emitProviderEvent,
      emitSubagent,
      emitTool,
      extractSubagentUpdate,
      flavor,
      followsAgentWorkState,
      handledBackgroundTaskIdsInActiveTurn,
      input,
      isMonitorEndNoticeText,
      markSessionCompacted,
      mcpSessions,
      midTurnUnreportedCompletedTaskIds,
      providerNodeId,
      providerTurnItemId,
      rearmDeferredFinalize,
      resolveItemOrdinal,
      setBackgroundTaskRunning,
      setToolOutputText,
      syncNativeChildren,
      toolOutputText,
    } = pickBindCtx(ctx);

    if (context.assistant.current?.sourceMessageId == null)
      yield* closeTextStream(context, "assistant");
    if (context.reasoning.current?.sourceMessageId == null)
      yield* closeTextStream(context, "reasoning");
    yield* closeTextStream(context, "user");
    const previous = context.tools.get(incoming.toolCallId);
    const merged = mergeToolCallState(previous, incoming);
    const normalized = flavor.normalizeToolCall?.(merged) ?? merged;
    const backgroundTaskId = flavor.extractBackgroundTaskId?.(normalized);
    const backgroundCommandTaskId =
      flavor.isBackgroundCommandTool?.(normalized) === true
        ? backgroundTaskId
        : previous?.backgroundCommandTaskId;
    if (
      backgroundCommandTaskId !== undefined &&
      !context.backgroundCommands.has(backgroundCommandTaskId)
    ) {
      context.backgroundCommands.set(backgroundCommandTaskId, null);
    }
    const completion =
      context.promptSettled && backgroundCommandTaskId !== undefined
        ? (context.backgroundCommands.get(backgroundCommandTaskId) ?? undefined)
        : undefined;
    // Preserve hydrated output; only a replayed start ACK needs its output restored.
    const toolCall =
      completion === undefined
        ? normalized
        : {
            ...(backgroundTaskId === undefined || completion.output === undefined
              ? normalized
              : setToolOutputText(normalized, completion.output)),
            status: completion.status,
          };
    context.tools.set(
      toolCall.toolCallId,
      backgroundCommandTaskId === undefined ? toolCall : { ...toolCall, backgroundCommandTaskId },
    );
    // A failure racing Stop needs the provider's cancellation signal before relabeling it.
    const previousStatus = previous === undefined ? undefined : toolStatus(previous.status);
    if (
      context.interrupted &&
      toolCall.status === "failed" &&
      flavor.isCancelledToolCall?.(rawPayload) === true &&
      (previousStatus === undefined ||
        previousStatus === "pending" ||
        previousStatus === "running" ||
        previousStatus === "waiting")
    ) {
      context.stoppedToolCallIds.add(toolCall.toolCallId);
    }
    const stoppedStatus =
      projectedStatus ??
      (toolCall.status === "failed" && context.stoppedToolCallIds.has(toolCall.toolCallId)
        ? "interrupted"
        : undefined);
    if (
      followsAgentWorkState &&
      projectedStatus === undefined &&
      flavor.isProvisionalSubagentTool?.(toolCall)
    ) {
      yield* rearmDeferredFinalize(context);
      return;
    }
    if (backgroundTaskId !== undefined) {
      context.toolCallIdsByBackgroundTaskId.set(backgroundTaskId, toolCall.toolCallId);
      if (flavor.isPersistentBackgroundTool?.(toolCall) === true) {
        context.persistentBackgroundTaskIds.add(backgroundTaskId);
      }
      const backgroundStatus = projectedStatus ?? toolStatus(toolCall.status);
      yield* setBackgroundTaskRunning(
        backgroundTaskId,
        backgroundStatus === "pending" || backgroundStatus === "running",
      );
      if (
        !context.promptSettled &&
        backgroundStatus !== "pending" &&
        backgroundStatus !== "running"
      ) {
        yield* Ref.update(handledBackgroundTaskIdsInActiveTurn, (current) =>
          new Set(current).add(backgroundTaskId),
        );
        yield* Ref.update(midTurnUnreportedCompletedTaskIds, (current) => {
          if (!current.has(backgroundTaskId)) return current;
          const next = new Set(current);
          next.delete(backgroundTaskId);
          return next;
        });
      }
    }

    const backgroundCompletions =
      projectedStatus === undefined
        ? (flavor.extractBackgroundTaskCompletion?.(toolCall) ?? [])
        : [];
    let hydratedRegisteredMonitor = false;
    for (const backgroundCompletion of backgroundCompletions) {
      yield* applyBackgroundTaskMutationRunning(backgroundCompletion);
      if (backgroundCompletion.status !== "running") {
        yield* Ref.update(handledBackgroundTaskIdsInActiveTurn, (current) =>
          new Set(current).add(backgroundCompletion.taskId),
        );
        yield* Ref.update(midTurnUnreportedCompletedTaskIds, (current) => {
          if (!current.has(backgroundCompletion.taskId)) return current;
          const next = new Set(current);
          next.delete(backgroundCompletion.taskId);
          return next;
        });
      }
      if (backgroundCompletion.status !== "running") {
        context.awaitingBackgroundHydration.delete(backgroundCompletion.taskId);
      }
      const owner = context.toolCallIdsByBackgroundTaskId.has(backgroundCompletion.taskId)
        ? context
        : ((yield* detachedBackgroundCommandTurn(backgroundCompletion.taskId)) ?? context);
      const targetToolCallId = owner.toolCallIdsByBackgroundTaskId.get(backgroundCompletion.taskId);
      if (targetToolCallId !== undefined) {
        hydratedRegisteredMonitor = true;
      }
      const target = targetToolCallId !== undefined ? owner.tools.get(targetToolCallId) : undefined;
      if (target !== undefined && target.toolCallId !== toolCall.toolCallId) {
        const nextStatus =
          backgroundCompletion.status === "running"
            ? ("inProgress" as const)
            : backgroundCompletion.status === "failed"
              ? ("failed" as const)
              : ("completed" as const);
        const hydrated =
          backgroundCompletion.appendOutput.length > 0
            ? isMonitorEndNoticeText(toolOutputText(target)) ||
              toolOutputText(target).trim().length === 0
              ? setToolOutputText(
                  { ...target, status: nextStatus },
                  backgroundCompletion.appendOutput,
                )
              : appendToolOutputText(
                  { ...target, status: nextStatus },
                  backgroundCompletion.appendOutput,
                )
            : { ...target, status: nextStatus };
        // BackgroundTaskStarted normalization can reopen this row, so keep the
        // completion for settlement when no task_completed recorded one.
        if (
          backgroundCompletion.status !== "running" &&
          owner.backgroundCommands.get(backgroundCompletion.taskId) === null
        ) {
          owner.backgroundCommands.set(backgroundCompletion.taskId, {
            status: backgroundCompletion.status,
            output: toolOutputText(hydrated),
          });
        }
        yield* emitTool(owner, hydrated);
      }
    }

    // Monitor TaskOutput resembles subagent hydration; do not invent a subagent.
    const subagentUpdate = hydratedRegisteredMonitor ? undefined : extractSubagentUpdate(toolCall);
    if (subagentUpdate !== undefined) {
      yield* emitSubagent(
        context,
        stoppedStatus === "interrupted" && subagentUpdate.status === "failed"
          ? { ...subagentUpdate, status: "interrupted" }
          : subagentUpdate,
      );
      if (followsAgentWorkState) yield* syncNativeChildren(context);
      if (subagentUpdate.suppressNormalTool !== false) {
        yield* rearmDeferredFinalize(context);
        return;
      }
    }
    if (
      stoppedStatus === undefined &&
      !shouldPersistToolUpdate(context, toolCall.toolCallId, previous, toolCall, merged.status)
    ) {
      yield* rearmDeferredFinalize(context);
      return;
    }
    const status =
      stoppedStatus ??
      (flavor.isCancelledToolCall === undefined
        ? stoppedToolStatus(context, toolCall)
        : undefined) ??
      toolStatus(toolCall.status);
    const now = yield* DateTime.now;
    const nativeItemId = `${context.nativeThreadId}:tool:${toolCall.toolCallId}`;
    const ordinal = yield* resolveItemOrdinal(context, nativeItemId);
    const nodeId = providerNodeId(nativeItemId);
    const turnItemId = providerTurnItemId(nativeItemId);
    const nativeItemRef = {
      driver,
      nativeId: toolCall.toolCallId,
      strength: "strong" as const,
    };
    const startedAt = context.toolStartedAt.get(toolCall.toolCallId) ?? now;
    context.toolStartedAt.set(toolCall.toolCallId, startedAt);
    const completedAt = completedAtForStatus(status, now);
    const title = toolCall.title ?? null;
    yield* emitProviderEvent({
      type: "node.updated",
      driver,
      node: {
        id: nodeId,
        threadId: context.input.threadId,
        runId: context.input.runId,
        parentNodeId: context.input.rootNodeId,
        rootNodeId: context.input.rootNodeId,
        kind: "tool_call",
        status: nodeStatus(status),
        countsForRun: true,
        providerThreadId: context.input.providerThread.id,
        providerTurnId: context.providerTurnId,
        nativeItemRef,
        runtimeRequestId: null,
        checkpointScopeId: null,
        startedAt,
        completedAt,
      },
    });

    const base = {
      id: turnItemId,
      threadId: context.input.threadId,
      runId: context.input.runId,
      nodeId,
      providerThreadId: context.input.providerThread.id,
      providerTurnId: context.providerTurnId,
      nativeItemRef,
      parentItemId: null,
      ordinal,
      status,
      title,
      startedAt,
      completedAt,
      updatedAt: now,
    } as const;
    const rawInput = toolCall.data.rawInput;
    const rawOutput = toolCall.data.rawOutput ?? toolCall.data.content;
    const changes = structuredFileChanges(toolCall);
    const path = changes[0]?.path ?? pathFromToolCall(toolCall);
    const diffText = acpToolCallDiffPatch(toolCall.data.content) ?? textFromUnknown(rawOutput);
    const rawInputRecord = unknownRecord(rawInput);
    const inputVariant =
      typeof rawInputRecord?.variant === "string"
        ? rawInputRecord.variant.trim().toLowerCase()
        : "";
    const rawOutputRecord = unknownRecord(rawOutput);
    const outputCommand =
      typeof rawOutputRecord?.command === "string" && rawOutputRecord.command.trim().length > 0
        ? rawOutputRecord.command.trim()
        : undefined;
    const monitorCommand =
      (typeof rawInputRecord?.command === "string" && rawInputRecord.command.trim().length > 0
        ? rawInputRecord.command.trim()
        : undefined) ?? outputCommand;
    const outputIsBashResult =
      typeof rawOutputRecord?.type === "string" &&
      rawOutputRecord.type.trim().toLowerCase() === "bash" &&
      commandExitCode(rawOutput) !== undefined;
    const projectAsCommandExecution = inputVariant === "monitor" || outputIsBashResult;
    const mcpIdentity = extractMcpToolCallIdentity(toolCall, {
      embeddedTerminalCommands: embeddedTerminalCommands(
        context.nativeThreadId,
        toolCall.toolCallId,
      ),
    });
    let turnItem: OrchestrationV2TurnItem;
    if (toolCall.toolCallId.startsWith("acp-compaction:")) {
      const summary =
        (status === "failed" ? textFromUnknown(toolCall.data.compactionError) : undefined) ||
        textFromUnknown(rawOutput);
      turnItem = {
        ...base,
        type: "compaction",
        driver,
        ...(summary === undefined ? {} : { summary }),
        ...(context.contextUsage?.usedTokens === undefined
          ? {}
          : { beforeTokenCount: context.contextUsage.usedTokens }),
      };
      if (status === "completed") {
        context.contextUsage = null;
        yield* Ref.update(contextUsageBySessionId, (current) => {
          const updated = new Map(current);
          updated.delete(context.nativeThreadId);
          return updated;
        });
        // A completion projected at turn end must not swallow the agent's later real one.
        yield* markSessionCompacted(
          context.nativeThreadId,
          projectedStatus === undefined
            ? toolCall.toolCallId.slice("acp-compaction:".length)
            : undefined,
        );
      }
    } else if (mcpIdentity !== undefined) {
      const toolName = `${mcpIdentity.server}.${mcpIdentity.tool}`;
      const input =
        mcpIdentity.input ?? unknownRecord(rawInputRecord?.arguments) ?? rawInputRecord ?? {};
      let output = rawOutput === undefined ? undefined : acpMcpToolCallOutput(rawOutput);
      const resolvedT3Tool = resolveT3McpToolId(toolName);
      const isHtmlRender = resolvedT3Tool === HTML_RENDER_TOOL_NAME;
      const isError =
        compactDynamicToolOutput(output)?.isError === true ||
        compactDynamicToolOutput(rawOutputRecord?.result)?.isError === true;
      const callInputKey =
        resolvedT3Tool !== null && !isHtmlRender
          ? `${toolCall.toolCallId}\0${resolvedT3Tool}\0${McpProviderSessions.hashToolInput(input)}`
          : undefined;
      if (
        status === "completed" &&
        resolvedT3Tool !== null &&
        callInputKey !== undefined &&
        isError
      ) {
        // Unwrapping `{ result: { isError: true, content/structuredContent } }` drops the
        // error flag (and diagnostic content when structuredContent is also present);
        // preserve the diagnostic error envelope and remember it across summary replays.
        const rawResult = unknownRecord(rawOutputRecord?.result);
        if (compactDynamicToolOutput(output)?.isError !== true) {
          output =
            rawResult !== undefined && compactDynamicToolOutput(rawResult)?.isError === true
              ? rawResult
              : output === undefined
                ? { isError: true }
                : Array.isArray(output)
                  ? { isError: true, content: output }
                  : typeof output === "object" && output !== null
                    ? { ...(output as Record<string, unknown>), isError: true }
                    : { isError: true, content: [{ type: "text", text: String(output) }] };
        }
        context.blockedInputRecoveryKeys.add(callInputKey);
        context.claimedToolResults.set(callInputKey, output);
      }
      if (resolvedT3Tool !== null && (status === "failed" || (status === "completed" && isError))) {
        // A failed call may have completed on T3's MCP server before the provider lost its result.
        if (isHtmlRender) {
          if (previous?.status !== "failed" && previous?.status !== "completed") {
            yield* mcpSessions.takeHtmlRender(
              context.input.threadId,
              input,
              htmlRenderFromToolItem({ toolName, output }),
            );
          }
        } else if (callInputKey !== undefined) {
          const reportedError = compactT3McpToolOutput(resolvedT3Tool, output);
          context.blockedInputRecoveryKeys.add(callInputKey);
          // Only drain when the failed call reported an explicit output to match;
          // a bare failure without output must not consume a sibling's cached record.
          if (!context.drainedToolResultKeys.has(callInputKey) && reportedError !== undefined) {
            const drained = yield* mcpSessions.takeToolResult(
              context.input.threadId,
              resolvedT3Tool,
              input,
              reportedError,
            );
            if (drained !== undefined) {
              context.drainedToolResultKeys.add(callInputKey);
            }
          }
        }
      }
      if (status === "completed" && isHtmlRender && !isError) {
        const reportedPage = htmlRenderFromToolItem({ toolName, output });
        // Antigravity replaces MCP results with summaries, including on repeated completions.
        const previousPage = htmlRenderFromToolItem({
          toolName,
          output: acpMcpToolCallOutput(previous?.data.rawOutput ?? previous?.data.content),
        });
        const page = reportedPage
          ? yield* mcpSessions.takeHtmlRender(context.input.threadId, input, reportedPage)
          : (previousPage ?? (yield* mcpSessions.takeHtmlRender(context.input.threadId, input)));
        if (reportedPage === undefined && page !== undefined) {
          output = { htmlRender: page };
          context.tools.set(toolCall.toolCallId, {
            ...toolCall,
            data: { ...toolCall.data, rawOutput: output },
          });
        }
      }
      if (
        status === "completed" &&
        resolvedT3Tool !== null &&
        callInputKey !== undefined &&
        !isError
      ) {
        const reportedOutput = compactT3McpToolOutput(resolvedT3Tool, output);
        // ACP runtimes may omit or summarize MCP results, including across repeated or
        // interleaved in_progress updates. Claims are keyed by (callId, tool, inputHash).
        const claimedOutput = context.claimedToolResults.get(callInputKey);
        if (reportedOutput !== undefined) {
          context.claimedToolResults.set(callInputKey, reportedOutput);
          if (!context.drainedToolResultKeys.has(callInputKey)) {
            const drained = yield* mcpSessions.takeToolResult(
              context.input.threadId,
              resolvedT3Tool,
              input,
              reportedOutput,
            );
            if (drained !== undefined) {
              context.drainedToolResultKeys.add(callInputKey);
            }
          }
        } else {
          let recoveredOutput = claimedOutput;
          if (
            recoveredOutput === undefined &&
            projectedStatus === undefined &&
            !context.blockedInputRecoveryKeys.has(callInputKey) &&
            !context.attemptedInputRecoveryKeys.has(callInputKey)
          ) {
            context.attemptedInputRecoveryKeys.add(callInputKey);
            recoveredOutput = yield* mcpSessions.takeToolResult(
              context.input.threadId,
              resolvedT3Tool,
              input,
              undefined,
            );
            if (recoveredOutput !== undefined) {
              context.drainedToolResultKeys.add(callInputKey);
            }
          }
          if (recoveredOutput !== undefined) {
            context.claimedToolResults.set(callInputKey, recoveredOutput);
            output = recoveredOutput;
          }
        }
      }
      turnItem = {
        ...base,
        title: null,
        ...mcpToolPresentation({
          serverName: mcpIdentity.server,
          toolName: mcpIdentity.tool,
          source: unknownRecord((unknownRecord(rawOutputRecord?.result) ?? rawOutputRecord)?._meta)
            ?.source,
        }),
        type: "dynamic_tool",
        toolName,
        input,
        ...(output === undefined ? {} : { output }),
      };
      yield* emitProviderEvent({ type: "turn_item.updated", driver, turnItem });
      yield* rearmDeferredFinalize(context);
      return;
    } else {
      turnItem = buildAcpStandardToolTurnItem({
        base,
        toolCall,
        status,
        title,
        rawInput,
        rawInputRecord,
        rawOutput,
        changes,
        path,
        diffText,
        monitorCommand,
        projectAsCommandExecution,
        inputVariant,
      });
    }
    yield* emitProviderEvent({ type: "turn_item.updated", driver, turnItem });
    yield* rearmDeferredFinalize(context);
  });
