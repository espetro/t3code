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

import type { ActiveAcpTurn, ActiveTextSegment } from "./adapter.helpers.ts";

export const bindEmitTextSegment = (ctx: any): any =>
  Effect.fnUntraced(function* (
    context: ActiveAcpTurn,
    kind: "user" | "assistant" | "reasoning",
    completed: boolean,
    flushOf?: ActiveTextSegment,
  ) {
    const {
      createdAt,
      driver,
      emitProviderEvent,
      emitTextSegment,
      input,
      providerMessageId,
      providerNodeId,
      providerTurnItemId,
      rememberSnapshotMessage,
      resolveItemOrdinal,
      textEmissionPermit,
      textStreamFor,
    } = pickBindCtx(ctx);

    const stream = textStreamFor(context, kind);
    const segment = stream.current;
    if (segment === null) return;
    if (flushOf !== undefined && (segment !== flushOf || !segment.dirty)) return;
    // The node carries no text, so it changes only when the segment
    // opens and when it completes.
    const emitsNode = completed || !segment.emitted;
    segment.emitted = true;
    segment.dirty = false;
    // Read the text in the same step that clears `dirty`. Chunks keep
    // appending while this emission yields; each one marks the segment
    // dirty again and reaches the next flush or the close.
    const text = segment.text;
    const now = yield* DateTime.now;
    const ordinal = yield* resolveItemOrdinal(context, segment.nativeItemId);
    const nodeId = providerNodeId(segment.nativeItemId);
    const turnItemId = providerTurnItemId(segment.nativeItemId);
    const nativeItemRef = {
      driver,
      nativeId: segment.nativeItemId,
      strength: "weak" as const,
    };
    if (kind !== "user" && emitsNode) {
      yield* emitProviderEvent({
        type: "node.updated",
        driver,
        node: {
          id: nodeId,
          threadId: context.input.threadId,
          runId: context.input.runId,
          parentNodeId: context.input.rootNodeId,
          rootNodeId: context.input.rootNodeId,
          kind: kind === "assistant" ? "assistant_message" : "reasoning",
          status: completed ? "completed" : "running",
          countsForRun: false,
          providerThreadId: context.input.providerThread.id,
          providerTurnId: context.providerTurnId,
          nativeItemRef,
          runtimeRequestId: null,
          checkpointScopeId: null,
          startedAt: segment.startedAt,
          completedAt: completed ? now : null,
        },
      });
    }
    if (kind !== "reasoning") {
      const messageId = providerMessageId(segment.nativeItemId);
      const messageNodeId = kind === "user" ? context.input.rootNodeId : nodeId;
      const message: OrchestrationV2ConversationMessage = {
        createdBy: kind === "user" ? "user" : "agent",
        creationSource: "provider",
        id: messageId,
        threadId: context.input.threadId,
        runId: context.input.runId,
        nodeId: messageNodeId,
        role: kind,
        text,
        attachments: [],
        streaming: !completed,
        createdAt: segment.startedAt,
        updatedAt: now,
      };
      yield* emitProviderEvent({ type: "message.updated", driver, message });
      yield* emitProviderEvent(
        kind === "user"
          ? {
              type: "turn_item.updated",
              driver,
              turnItem: {
                createdBy: "user",
                creationSource: "provider",
                id: turnItemId,
                threadId: context.input.threadId,
                runId: context.input.runId,
                nodeId: messageNodeId,
                providerThreadId: context.input.providerThread.id,
                providerTurnId: context.providerTurnId,
                nativeItemRef,
                parentItemId: null,
                ordinal,
                status: completed ? "completed" : "running",
                title: null,
                startedAt: segment.startedAt,
                completedAt: completed ? now : null,
                updatedAt: now,
                type: "user_message",
                messageId,
                inputIntent: "turn_start",
                text,
                attachments: [],
              },
            }
          : {
              type: "turn_item.updated",
              driver,
              turnItem: {
                id: turnItemId,
                threadId: context.input.threadId,
                runId: context.input.runId,
                nodeId,
                providerThreadId: context.input.providerThread.id,
                providerTurnId: context.providerTurnId,
                nativeItemRef,
                parentItemId: null,
                ordinal,
                status: completed ? "completed" : "running",
                title: null,
                startedAt: segment.startedAt,
                completedAt: completed ? now : null,
                updatedAt: now,
                type: "assistant_message",
                messageId,
                text,
                streaming: !completed,
              },
            },
      );
      if (completed) yield* rememberSnapshotMessage(message);
      return;
    }
    yield* emitProviderEvent({
      type: "turn_item.updated",
      driver,
      turnItem: {
        id: turnItemId,
        threadId: context.input.threadId,
        runId: context.input.runId,
        nodeId,
        providerThreadId: context.input.providerThread.id,
        providerTurnId: context.providerTurnId,
        nativeItemRef,
        parentItemId: null,
        ordinal,
        status: completed ? "completed" : "running",
        title: null,
        startedAt: segment.startedAt,
        completedAt: completed ? now : null,
        updatedAt: now,
        type: "reasoning",
        text,
        streaming: !completed,
      },
    });
  }, textEmissionPermit.withPermit);
