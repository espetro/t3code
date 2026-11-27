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
  acpSubagentStatusIsTerminal,
  makeProviderThread,
  nativeThreadId,
} from "./adapter.helpers.ts";
import type {
  AcpAdapterV2SubagentUpdate,
  ActiveAcpSubagent,
  ActiveAcpTurn,
} from "./adapter.helpers.ts";

export const bindEmitSubagent = (ctx: any): any =>
  Effect.fnUntraced(function* (context: ActiveAcpTurn, reported: AcpAdapterV2SubagentUpdate) {
    const {
      drainSubagentTranscript,
      driver,
      emitProviderEvent,
      emitSubagent,
      emitSubagentAssistant,
      flavor,
      flushSubagentAssistant,
      idAllocator,
      input,
      projectSubagentNotification,
      providerMessageId,
      providerNodeId,
      providerThreadByNativeSessionId,
      providerTurnItemId,
      resolveItemOrdinal,
      startSubagentTrailingTranscriptDrain,
      startSubagentTranscriptFollower,
      stopSubagentTranscriptFollower,
    } = pickBindCtx(ctx);

    // Providers with cancellation detection already classify their subagent failures.
    const update: AcpAdapterV2SubagentUpdate =
      flavor.isCancelledToolCall === undefined &&
      context.interrupted &&
      reported.status === "failed"
        ? { ...reported, status: "interrupted" }
        : reported;
    // Hydration uses a new toolCallId but references the original child by subagent_id or task id.
    const existing =
      context.subagents.get(update.nativeTaskId) ??
      (update.childSessionId !== null
        ? context.subagentsBySessionId.get(update.childSessionId)
        : undefined);
    const updateIsTerminal = acpSubagentStatusIsTerminal(update.status);
    if (
      existing !== undefined &&
      acpSubagentStatusIsTerminal(existing.task.status) &&
      !updateIsTerminal
    ) {
      return;
    }
    if (
      existing !== undefined &&
      existing.task.status === update.status &&
      updateIsTerminal &&
      existing.terminalStatusProjected
    ) {
      return;
    }
    // Empty-prompt hydration must match existing lineage; only spawn ACKs can create it.
    if (existing === undefined) {
      const isHydrationOnly = update.prompt === "" && update.title === null;
      if (isHydrationOnly || update.suppressNormalTool === false) {
        return;
      }
    }
    const now = yield* DateTime.now;
    const nativeTaskId = existing?.task.nativeTaskRef?.nativeId ?? update.nativeTaskId;
    const nativeItemRef = {
      driver,
      nativeId: nativeTaskId,
      strength: "strong" as const,
    };
    const nodeId = existing?.task.id ?? providerNodeId(nativeTaskId);
    const childThreadId =
      existing?.childThreadId ??
      idAllocator.derive.subagentThread({
        driver,
        providerInstanceId: context.input.modelSelection.instanceId,
        nativeThreadId: `${context.nativeThreadId}:task:${nativeTaskId}`,
      });
    const childRootNodeId =
      existing?.childRootNodeId ?? providerNodeId(`${nativeTaskId}:child-root`);
    const turnItemId = existing?.turnItemId ?? providerTurnItemId(nativeTaskId);
    const turnItemOrdinal =
      existing?.turnItemOrdinal ?? (yield* resolveItemOrdinal(context, nativeTaskId));
    const taskStatus = update.status;
    const task: OrchestrationV2Subagent = {
      ...(existing?.task ?? {
        id: nodeId,
        threadId: context.input.threadId,
        runId: context.input.runId,
        parentNodeId: context.input.rootNodeId,
        origin: "provider_native" as const,
        createdBy: "agent" as const,
        driver,
        providerInstanceId: context.input.modelSelection.instanceId,
        providerThreadId: null,
        childThreadId,
        nativeTaskRef: nativeItemRef,
        prompt: update.prompt,
        title: update.title,
        result: null,
        startedAt: now,
      }),
      model: update.model?.trim() || existing?.task.model || null,
      status: taskStatus,
      result: update.result ?? existing?.task.result ?? null,
      completedAt: acpSubagentStatusIsTerminal(taskStatus) ? now : null,
      updatedAt: now,
    };
    const subagent: ActiveAcpSubagent = existing ?? {
      task,
      rootSessionId: context.nativeThreadId,
      childThreadId,
      childRootNodeId,
      turnItemId,
      turnItemOrdinal,
      providerTurnId: context.providerTurnId,
      parentProviderThreadId: context.input.providerThread.id,
      childSessionId: null,
      assistantText: "",
      assistantMessages: new Map(),
      pendingAssistantMessages: new Set(),
      childItemOrdinals: new Map(),
      nextChildOrdinal: 101,
      terminalStatusProjected: false,
      toolState: {
        tools: new Map(),
        toolUpdatesSkipped: new Map(),
        toolStartedAt: new Map(),
      },
      interruptedToolIds: new Set(),
      toolSessionIds: new Map(),
      transcriptEntryFingerprints: new Map(),
      transcriptStartedAt: new Map(),
      transcriptOpenEntries: new Map(),
      lastTranscriptEntryKinds: new Map(),
      transcriptDrainPermit: yield* Semaphore.make(1),
      transcriptFollowerStop: undefined,
      transcriptFollowerStarted: false,
      transcriptTrailingDrainStop: undefined,
      transcriptTrailingDrainStarted: false,
    };
    subagent.task = task;
    context.subagents.set(nativeTaskId, subagent);

    if (existing === undefined) {
      yield* emitProviderEvent({
        type: "app_thread.created",
        driver,
        appThread: makeSubagentChildThread({
          parentThread: context.input.appThread,
          childThreadId,
          parentNodeId: nodeId,
          activeProviderThreadId: null,
          providerInstanceId: context.input.modelSelection.instanceId,
          modelSelection: {
            ...context.input.modelSelection,
            model: task.model ?? context.input.modelSelection.model,
          },
          title: subagentThreadTitle({
            parentTitle: context.input.appThread.title,
            title: update.title,
            prompt: update.prompt,
            ordinal: context.subagents.size,
          }),
          now,
          createdBy: "agent",
          creationSource: "provider",
        }),
      });
      const promptNativeItemId = `${nativeTaskId}:prompt`;
      const promptArtifacts = makeSubagentConversationArtifacts({
        senderThreadId: context.input.threadId,
        messageId: providerMessageId(promptNativeItemId),
        turnItemId: providerTurnItemId(promptNativeItemId),
        threadId: childThreadId,
        rootNodeId: childRootNodeId,
        providerThreadId: null,
        providerTurnId: null,
        nativeItemRef: { driver, nativeId: promptNativeItemId, strength: "weak" },
        role: "user",
        text: update.prompt,
        ordinal: 100,
        now,
      });
      yield* emitProviderEvent({
        type: "message.updated",
        driver,
        message: promptArtifacts.message,
      });
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver,
        turnItem: promptArtifacts.turnItem,
      });
    }

    const childSessionId = update.childSessionId;
    if (childSessionId !== null && subagent.childSessionId === null) {
      subagent.childSessionId = childSessionId;
      context.subagentsBySessionId.set(childSessionId, subagent);
      const providerThread = makeProviderThread({
        driver,
        providerInstanceId: context.input.modelSelection.instanceId,
        idAllocator,
        appThreadId: childThreadId,
        providerSessionId: input.providerSessionId,
        nativeThreadId: childSessionId,
        ...(ctx.itemIdentityVersion === undefined
          ? {}
          : { itemIdentityVersion: ctx.itemIdentityVersion }),
        forkedFrom: {
          providerThreadId: context.input.providerThread.id,
          providerTurnId: context.providerTurnId,
        },
        now,
      });
      subagent.task = { ...subagent.task, providerThreadId: providerThread.id };
      yield* Ref.update(providerThreadByNativeSessionId, (current) =>
        new Map(current).set(childSessionId, providerThread),
      );
      yield* emitProviderEvent({
        type: "provider_thread.updated",
        driver,
        providerThread: { ...providerThread, status: "idle" },
      });
      const buffered = context.pendingSubagentNotifications.get(childSessionId) ?? [];
      context.pendingSubagentNotifications.delete(childSessionId);
      yield* Effect.forEach(
        buffered,
        (notification) => projectSubagentNotification(subagent, notification, context),
        { concurrency: 1, discard: true },
      );
    }

    if (acpSubagentStatusIsTerminal(taskStatus)) {
      yield* stopSubagentTranscriptFollower(subagent);
      yield* drainSubagentTranscript(subagent, true);
      yield* startSubagentTrailingTranscriptDrain(subagent, taskStatus);
    }

    yield* flushSubagentAssistant(subagent);
    // A failed child's result explains the failure; it is not the child's reply.
    if (
      taskStatus !== "running" &&
      reported.status !== "failed" &&
      subagent.assistantText.length === 0 &&
      update.result !== null
    ) {
      yield* emitSubagentAssistant(subagent, update.result);
    }
    const result = update.result ?? subagent.task.result ?? (subagent.assistantText || null);
    subagent.task = {
      ...subagent.task,
      status: taskStatus,
      result,
      completedAt: acpSubagentStatusIsTerminal(taskStatus) ? now : null,
      updatedAt: now,
    };
    const providerThreadId = subagent.task.providerThreadId;
    yield* emitProviderEvent({
      type: "node.updated",
      driver,
      node: {
        id: nodeId,
        threadId: context.input.threadId,
        runId: subagent.task.runId,
        parentNodeId: subagent.task.parentNodeId,
        rootNodeId: subagent.task.parentNodeId,
        kind: "subagent",
        status: taskStatus,
        countsForRun: false,
        providerThreadId: context.input.providerThread.id,
        providerTurnId: subagent.providerTurnId,
        nativeItemRef,
        runtimeRequestId: null,
        checkpointScopeId: null,
        startedAt: subagent.task.startedAt,
        completedAt: subagent.task.completedAt,
      },
    });
    yield* emitProviderEvent({
      type: "node.updated",
      driver,
      node: {
        id: childRootNodeId,
        threadId: childThreadId,
        runId: null,
        parentNodeId: null,
        rootNodeId: childRootNodeId,
        kind: "root_turn",
        status: taskStatus,
        countsForRun: false,
        providerThreadId,
        providerTurnId: null,
        nativeItemRef,
        runtimeRequestId: null,
        checkpointScopeId: null,
        startedAt: subagent.task.startedAt,
        completedAt: subagent.task.completedAt,
      },
    });
    yield* emitProviderEvent({ type: "subagent.updated", driver, subagent: subagent.task });
    yield* emitProviderEvent({
      type: "turn_item.updated",
      driver,
      turnItem: {
        id: turnItemId,
        threadId: context.input.threadId,
        runId: subagent.task.runId,
        nodeId,
        providerThreadId: context.input.providerThread.id,
        providerTurnId: subagent.providerTurnId,
        nativeItemRef,
        parentItemId: null,
        ordinal: turnItemOrdinal,
        status: taskStatus,
        title: subagent.task.title,
        startedAt: subagent.task.startedAt,
        completedAt: subagent.task.completedAt,
        updatedAt: now,
        type: "subagent",
        subagentId: subagent.task.id,
        origin: "provider_native",
        driver,
        providerInstanceId: context.input.modelSelection.instanceId,
        childThreadId,
        prompt: subagent.task.prompt,
        result,
      },
    });
    if (acpSubagentStatusIsTerminal(taskStatus)) {
      subagent.terminalStatusProjected = true;
    } else {
      yield* startSubagentTranscriptFollower(subagent);
    }
  });
