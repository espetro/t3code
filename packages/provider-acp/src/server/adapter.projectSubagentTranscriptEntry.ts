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
  acpSubagentTranscriptEntryFingerprint,
  acpToolCallDiffPatch,
  buildAcpStandardToolTurnItem,
  commandExitCode,
  completedAtForStatus,
  pathFromToolCall,
  structuredFileChanges,
  textFromUnknown,
  toolStatus,
} from "./adapter.helpers.ts";
import type { AcpSubagentTranscriptEntry, ActiveAcpSubagent } from "./adapter.helpers.ts";

export const bindProjectSubagentTranscriptEntry = (ctx: any): any =>
  Effect.fnUntraced(function* (subagent: ActiveAcpSubagent, entry: AcpSubagentTranscriptEntry) {
    const {
      createdAt,
      driver,
      emitProviderEvent,
      input,
      projectSubagentTranscriptEntry,
      providerMessageId,
      providerTurnItemId,
      resolveSubagentChildOrdinal,
    } = pickBindCtx(ctx);

    const fingerprint = acpSubagentTranscriptEntryFingerprint(entry);
    if (subagent.transcriptEntryFingerprints.get(entry.itemId) === fingerprint) {
      return false;
    }
    subagent.transcriptEntryFingerprints.set(entry.itemId, fingerprint);
    const nativeTaskId = subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id);
    const nativeItemId = `${subagent.rootSessionId}:${nativeTaskId}:transcript:${entry.itemId}`;
    const now = yield* DateTime.now;
    const startedAt = subagent.transcriptStartedAt.get(entry.itemId) ?? entry.createdAt ?? now;
    subagent.transcriptStartedAt.set(entry.itemId, startedAt);
    const ordinal = resolveSubagentChildOrdinal(subagent, nativeItemId);
    const nativeItemRef = {
      driver,
      nativeId: nativeItemId,
      strength: "strong" as const,
    };

    switch (entry.kind) {
      case "reasoning": {
        if (entry.status === "running") {
          subagent.transcriptOpenEntries.set(entry.itemId, entry);
        } else {
          subagent.transcriptOpenEntries.delete(entry.itemId);
        }
        yield* emitProviderEvent({
          type: "turn_item.updated",
          driver,
          turnItem: {
            id: providerTurnItemId(nativeItemId),
            threadId: subagent.childThreadId,
            runId: null,
            nodeId: subagent.childRootNodeId,
            providerThreadId: subagent.task.providerThreadId,
            providerTurnId: null,
            nativeItemRef,
            parentItemId: null,
            ordinal,
            status: entry.status,
            title: entry.title ?? "Thinking",
            startedAt,
            completedAt: entry.status === "completed" ? now : null,
            updatedAt: now,
            type: "reasoning",
            text: entry.text,
            streaming: entry.status === "running",
          },
        });
        return true;
      }
      case "assistant_message": {
        const artifacts = makeSubagentConversationArtifacts({
          messageId: providerMessageId(nativeItemId),
          turnItemId: providerTurnItemId(nativeItemId),
          threadId: subagent.childThreadId,
          rootNodeId: subagent.childRootNodeId,
          providerThreadId: subagent.task.providerThreadId,
          providerTurnId: null,
          nativeItemRef: { driver, nativeId: nativeItemId, strength: "weak" },
          role: "assistant",
          text: entry.text,
          ordinal,
          now: entry.createdAt ?? now,
        });
        subagent.assistantMessages.set(nativeItemId, entry.text);
        subagent.assistantText = entry.text;
        yield* emitProviderEvent({
          type: "message.updated",
          driver,
          message: artifacts.message,
        });
        yield* emitProviderEvent({
          type: "turn_item.updated",
          driver,
          turnItem: artifacts.turnItem,
        });
        return true;
      }
      case "user_message": {
        const artifacts = makeSubagentConversationArtifacts({
          senderThreadId: subagent.task.threadId,
          messageId: providerMessageId(nativeItemId),
          turnItemId: providerTurnItemId(nativeItemId),
          threadId: subagent.childThreadId,
          rootNodeId: subagent.childRootNodeId,
          providerThreadId: subagent.task.providerThreadId,
          providerTurnId: null,
          nativeItemRef: { driver, nativeId: nativeItemId, strength: "weak" },
          role: "user",
          text: entry.text,
          ordinal,
          now: entry.createdAt ?? now,
        });
        yield* emitProviderEvent({
          type: "message.updated",
          driver,
          message: artifacts.message,
        });
        yield* emitProviderEvent({
          type: "turn_item.updated",
          driver,
          turnItem: artifacts.turnItem,
        });
        return true;
      }
      case "error": {
        yield* emitProviderEvent({
          type: "turn_item.updated",
          driver,
          turnItem: {
            id: providerTurnItemId(nativeItemId),
            threadId: subagent.childThreadId,
            runId: null,
            nodeId: subagent.childRootNodeId,
            providerThreadId: subagent.task.providerThreadId,
            providerTurnId: null,
            nativeItemRef,
            parentItemId: null,
            ordinal,
            status: "failed",
            title: null,
            startedAt,
            completedAt: now,
            updatedAt: now,
            type: "error",
            failure: makeProviderFailure({
              class: "provider_error",
              message: entry.message,
            }),
          },
        });
        return true;
      }
      case "tool": {
        const toolCall = entry.toolCall;
        const status = entry.projectedStatus ?? toolStatus(toolCall.status);
        if (status === "running" || status === "pending" || status === "waiting") {
          subagent.transcriptOpenEntries.set(entry.itemId, entry);
        } else {
          subagent.transcriptOpenEntries.delete(entry.itemId);
        }
        const completedAt = completedAtForStatus(status, now);
        const title = toolCall.title ?? null;
        const base = {
          id: providerTurnItemId(nativeItemId),
          threadId: subagent.childThreadId,
          runId: null,
          nodeId: subagent.childRootNodeId,
          providerThreadId: subagent.task.providerThreadId,
          providerTurnId: null,
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
        const mcpIdentity = extractMcpToolCallIdentity(toolCall);
        const turnItem: OrchestrationV2TurnItem =
          mcpIdentity !== undefined
            ? {
                ...base,
                ...mcpToolPresentation({
                  serverName: mcpIdentity.server,
                  toolName: mcpIdentity.tool,
                  source: unknownRecord(
                    (unknownRecord(rawOutputRecord?.result) ?? rawOutputRecord)?._meta,
                  )?.source,
                }),
                type: "dynamic_tool",
                toolName: `${mcpIdentity.server}.${mcpIdentity.tool}`,
                input:
                  mcpIdentity.input ??
                  unknownRecord(rawInputRecord?.arguments) ??
                  rawInputRecord ??
                  {},
                ...(rawOutput === undefined ? {} : { output: acpMcpToolCallOutput(rawOutput) }),
              }
            : buildAcpStandardToolTurnItem({
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
        yield* emitProviderEvent({ type: "turn_item.updated", driver, turnItem });
        return true;
      }
    }
  });
