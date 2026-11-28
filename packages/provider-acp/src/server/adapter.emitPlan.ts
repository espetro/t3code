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

import { nativeThreadId, nonEmptyText } from "./adapter.helpers.ts";
import type { ActiveAcpTurn } from "./adapter.helpers.ts";

export const bindEmitPlan = (ctx: any): any =>
  Effect.fnUntraced(function* (
    context: ActiveAcpTurn,
    update: AcpPlanUpdate,
    sessionScoped: boolean,
  ) {
    const {
      closeTextStreams,
      driver,
      emitPlan,
      emitProviderEvent,
      idAllocator,
      input,
      plansBySessionId,
      providerNodeId,
      providerTurnItemId,
      resolveItemOrdinal,
    } = pickBindCtx(ctx);

    yield* closeTextStreams(context);
    let plans = sessionScoped ? plansBySessionId.get(context.nativeThreadId) : context.plans;
    if (plans === undefined) {
      plans = new Map();
      plansBySessionId.set(context.nativeThreadId, plans);
    }
    const existing = plans.get(update.nativePlanId);
    if (update.kind === "removed" && existing === undefined) return;
    const now = yield* DateTime.now;
    let planState = existing;
    if (planState === undefined) {
      const nativeItemId = `${context.nativeTurnId}:plan:${encodeURIComponent(update.nativePlanId)}`;
      planState = {
        id: yield* idAllocator.allocate.plan({
          threadId: context.input.threadId,
          runId: context.input.runId,
          driver,
        }),
        startedAt: now,
        origin: {
          runId: context.input.runId,
          rootNodeId: context.input.rootNodeId,
          providerThreadId: context.input.providerThread.id,
          providerTurnId: context.providerTurnId,
          nativeItemId,
          ordinal: yield* resolveItemOrdinal(context, nativeItemId),
        },
        latest: null,
      };
    }
    const { origin } = planState;
    const nodeId = providerNodeId(origin.nativeItemId);
    const turnItemId = providerTurnItemId(origin.nativeItemId);
    const planId = planState.id;
    const nativeItemRef = {
      driver,
      nativeId: origin.nativeItemId,
      strength: "weak" as const,
    };
    const base = {
      id: planId,
      threadId: context.input.threadId,
      runId: origin.runId,
      nodeId,
    } as const;
    let plan: OrchestrationV2PlanArtifact;
    if (update.kind === "removed") {
      if (planState.latest === null) return;
      plan = { ...planState.latest, status: "superseded" };
    } else if (update.kind === "items") {
      // A cancelled entry is not outstanding work, and plan steps have no
      // cancelled status, so drop it rather than show it as pending.
      const steps: ReadonlyArray<OrchestrationV2PlanStep> = update.plan.flatMap((step, index) =>
        step.status === "cancelled"
          ? []
          : [
              {
                id: `acp-step-${index + 1}`,
                text: nonEmptyText(step.step, `Step ${index + 1}`),
                status:
                  step.status === "inProgress"
                    ? "running"
                    : step.status === "completed"
                      ? "completed"
                      : "pending",
              },
            ],
      );
      const completed =
        update.plan.length > 0 && steps.every((step) => step.status === "completed");
      plan = {
        ...base,
        status: completed ? "completed" : "active",
        kind: "todo_list",
        steps,
        ...(update.explanation == null ? {} : { explanation: update.explanation }),
      };
    } else {
      const markdown =
        update.kind === "markdown"
          ? update.markdown
          : update.kind === "file"
            ? `Plan file: ${update.uri}`
            : `[Unsupported ACP plan content: ${update.contentType}]`;
      plan = {
        ...base,
        status: "active",
        kind: "proposed_plan",
        markdown,
      };
    }
    planState.latest = plan;
    plans.set(update.nativePlanId, planState);
    const completed = plan.status === "completed" || plan.status === "superseded";
    const nodeKind = plan.kind === "todo_list" ? "todo_list" : "plan";
    yield* emitProviderEvent({
      type: "node.updated",
      driver,
      node: {
        id: nodeId,
        threadId: context.input.threadId,
        runId: origin.runId,
        parentNodeId: origin.rootNodeId,
        rootNodeId: origin.rootNodeId,
        kind: nodeKind,
        status: completed ? "completed" : "running",
        countsForRun: false,
        providerThreadId: origin.providerThreadId,
        providerTurnId: origin.providerTurnId,
        nativeItemRef,
        runtimeRequestId: null,
        checkpointScopeId: null,
        startedAt: planState.startedAt,
        completedAt: completed ? now : null,
      },
    });
    yield* emitProviderEvent({ type: "plan.updated", driver, plan });
    yield* emitProviderEvent({
      type: "turn_item.updated",
      driver,
      turnItem: {
        id: turnItemId,
        threadId: context.input.threadId,
        runId: origin.runId,
        nodeId,
        providerThreadId: origin.providerThreadId,
        providerTurnId: origin.providerTurnId,
        nativeItemRef,
        parentItemId: null,
        ordinal: origin.ordinal,
        status: completed ? "completed" : "running",
        title: null,
        startedAt: planState.startedAt,
        completedAt: completed ? now : null,
        updatedAt: now,
        ...(plan.kind === "todo_list"
          ? {
              type: "todo_list" as const,
              planId,
              steps: plan.steps,
              ...(plan.explanation === undefined ? {} : { explanation: plan.explanation }),
            }
          : {
              type: "proposed_plan" as const,
              planId,
              markdown: plan.markdown,
              streaming: !completed,
            }),
      },
    });
  });
