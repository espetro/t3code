// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of CodexAdapterV2.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import { pipe } from "effect/Function";
import * as DocumentText from "../../provider/DocumentText.ts";
import { brokenRuntimeError } from "../../provider/providerCompatibility.ts";
import { revertCodexThread } from "../../provider/CodexThreadRevert.ts";
import { historyResponseItems } from "@t3tools/provider-core/server/handoffBudget";
import { makeProviderTextDeltaCoalescer } from "./ProviderTextDeltaCoalescer.ts";
import {
  mcpToolPresentation,
  type McpToolPresentation,
} from "../../provider/CodexToolPresentation.ts";
import {
  makeCodexTurnTokenUsageState,
  getCodexTurnAccumulator,
  accumulateCodexTurnTokenUsage,
  completeCodexTurnTokenUsage,
  type CodexTurnTokenUsageState,
} from "../../provider/CodexTurnTokenUsage.ts";
import type { ManagedServerProvider } from "@t3tools/provider-core/server/snapshot";
import type { CodexEffectiveRuntime } from "../../provider/CodexManagedRuntime.ts";
import { classifyCodexManagedError } from "../../provider/CodexManagedErrors.ts";
import {
  buildCodexInitializeParams,
  codexAppServerEnvironment,
  codexDefaultReasoningEffortOverride,
} from "../../provider/CodexProvider.ts";
import {
  codexRateLimitsToUpdate,
  mergeCodexRateLimits,
  codexMessageResetAt,
  codexTimeZone,
  codexUsageLimitResetAt,
  type CodexRateLimitSnapshot,
} from "../../provider/codexUsageLimits.ts";
import {
  type AgentFeedbackMode,
  CodexSettings,
  defaultInstanceIdForDriver,
  isOrchestrationV2WorkActive,
  type OrchestrationV2GoalCommand,
  OrchestrationV2ProviderGoal,
  parseGoalCommand,
  ProviderDriverKind,
  ProviderMcpSignInError,
  ProviderSetupError,
  type ServerProviderCompatibilityAdvisory,
  type ServerProviderModel,
  isDelegatedAppThread,
  ThreadId,
  type TurnItemId,
} from "@t3tools/contracts";
import { SKILL_MENTION_PATTERN } from "@t3tools/shared/composerInlineTokens";
import { AgentScope } from "@t3tools/shared/AgentScope";
import * as HostProcess from "@t3tools/shared/HostProcess";
import {
  COMPUTER_USE_TOOL_SOURCE,
  dynamicToolSurface,
  dynamicToolTitle,
} from "@t3tools/shared/toolActivity";
import { getModelSelectionStringOptionValue, modelSelectionsEqual } from "@t3tools/shared/model";
import { appendGeneratedImageEmbeds } from "@t3tools/shared/generatedImageMarkdown";
import { parseSemver } from "@t3tools/shared/semver";
import { resolveSpawnCommand } from "@t3tools/shared/shell";
import { mcpToolResultOutput } from "@t3tools/shared/toolOutput";
import { oauthCallbackUrl } from "@t3tools/shared/oauthCallback";
import type {
  ChatAttachment,
  OrchestrationV2AppThread,
  OrchestrationV2ConversationMessage,
  OrchestrationV2ExecutionNode,
  ModelSelection,
  OrchestrationV2PlanArtifact,
  OrchestrationV2ProviderCapabilities,
  OrchestrationV2ProviderFailure,
  OrchestrationV2ProviderRetry,
  OrchestrationV2ProviderSession,
  OrchestrationV2ProviderThread,
  OrchestrationV2ProviderTurn,
  OrchestrationV2PlanStep,
  OrchestrationV2RuntimeRequest,
  OrchestrationV2Subagent,
  OrchestrationV2TurnItem,
  ProviderUserInputAnswers,
  ProviderApprovalDecision,
  ProviderApprovalOption,
  ProviderApprovalPushHooks,
  ProviderRequestKind,
  ProviderThreadId,
  ProviderTurnId,
  ProviderInstanceId,
  RuntimeMode,
} from "@t3tools/contracts";
import * as CodexClient from "effect-codex-app-server/client";
import * as CodexErrors from "effect-codex-app-server/errors";
import * as CodexSchema from "effect-codex-app-server/schema";
import * as Cause from "effect/Cause";
import * as Context from "effect/Context";
import * as Digest from "effect/crypto/Digest";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Fiber from "effect/Fiber";
import * as FileSystem from "effect/FileSystem";
import * as Function from "effect/Function";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Queue from "effect/Queue";
import * as Ref from "effect/Ref";
import * as Schema from "effect/Schema";
import * as Scope from "effect/Scope";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import { FetchHttpClient, HttpClient } from "effect/http";
import { ChildProcess, ChildProcessSpawner } from "effect/process";

import { resolveAttachmentPath, resolveAttachmentPathById } from "../../attachmentStore.ts";
import * as PortScanner from "../../preview/PortScanner.ts";
import { getCodexServiceTierOptionValue } from "../../codexModelOptions.ts";
import { ServerConfig } from "../../config.ts";
import { expandHomePath } from "@t3tools/provider-core/server/pathExpansion";
import { buildCodexAdditionalContext } from "../../provider/CodexDeveloperInstructions.ts";
import {
  describeMcpElicitation,
  toMcpElicitationResponse,
} from "../../provider/CodexMcpElicitation.ts";
import {
  codexHomeLaunchArgs,
  materializeCodexShadowHome,
  resolveCodexHomeLayout,
} from "../../provider/Drivers/CodexHomeLayout.ts";
import {
  boundProviderEventForLogging,
  shouldPersistProviderEvent,
} from "../../provider/EventNdjsonLogger.ts";
import * as ProviderEventLoggers from "@t3tools/provider-core/server/ProviderEventLoggers";
import { codexAppServerArgs, resolveCodexLaunchArgs } from "../../provider/codexLaunchArgs.ts";
import { mergeProviderInstanceEnvironment } from "@t3tools/provider-core/server/instanceEnvironment";
import * as McpProviderSession from "@t3tools/provider-core/server/mcpSession";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import {
  MCP_APP_EXTENSION_ID,
  MCP_APP_MIME_TYPE,
  MCP_APP_OUTPUT_KEY,
  MCP_APP_RESOURCE_SCHEME,
} from "@t3tools/shared/mcpApp";
import { snapshotMcpApp } from "../../mcpApps/McpAppSnapshot.ts";
import {
  ProviderAdapterDriverCreateError,
  type ProviderAdapterDriverCreateInput,
} from "@t3tools/provider-core/server/adapterDriver";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import { backgroundWorkNotification } from "@t3tools/provider-core/server/notification";
import {
  makeProviderFailure,
  makeProviderFailureTurnItem,
  makeProviderRetryTurnItem,
  PROVIDER_RETRY_BUDGET_MS,
} from "@t3tools/provider-core/server/failure";
import { turnScopedSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import {
  isProviderNativeImageAttachment,
  providerMessageTextWithAttachmentPaths,
} from "@t3tools/provider-core/server/attachmentPrompt";
import {
  makeSubagentChildThread,
  makeSubagentConversationArtifacts,
  subagentThreadTitle,
} from "@t3tools/provider-core/server/subagentProjection";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";
import { buildWorkspaceInstructions } from "@t3tools/provider-core/server/runtimeInstructions";
import type { ActiveCodexTurnContext } from "./CodexAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindBuildTodoListArtifacts = (ctx: any) =>
  Effect.fn("CodexAdapterV2.buildTodoListArtifacts")(function* (input: {
    readonly context: ActiveCodexTurnContext;
    readonly nativeItemId: string;
    readonly status: OrchestrationV2PlanArtifact["status"];
    readonly steps: ReadonlyArray<OrchestrationV2PlanStep>;
    readonly explanation?: string;
    readonly completed?: boolean;
  }) {
    const {
      CODEX_PROVIDER,
      codexNativeItemRef,
      context,
      idAllocator,
      resolveItemPosition,
      resolvePlanId,
      status,
    } = ctx;

    const updatedAt = yield* DateTime.now;
    const completedAt = input.completed === true ? updatedAt : null;
    const planId = yield* resolvePlanId(input.context, input.nativeItemId);
    const nodeId = idAllocator.derive.nodeFromProviderItem({
      driver: CODEX_PROVIDER,
      nativeItemId: input.nativeItemId,
    });
    const turnItemId = idAllocator.derive.turnItemFromProviderItem({
      driver: CODEX_PROVIDER,
      nativeItemId: input.nativeItemId,
    });
    const { ordinal, startedAt } = yield* resolveItemPosition(input.context, input.nativeItemId);
    const plan: OrchestrationV2PlanArtifact = {
      id: planId,
      threadId: input.context.projectionThreadId,
      runId: input.context.projectionRunId,
      nodeId,
      kind: "todo_list",
      status: input.status,
      steps: [...input.steps],
      ...(input.explanation === undefined ? {} : { explanation: input.explanation }),
    };
    const node: OrchestrationV2ExecutionNode = {
      id: nodeId,
      threadId: input.context.projectionThreadId,
      runId: input.context.projectionRunId,
      parentNodeId: input.context.itemParentNodeId,
      rootNodeId: input.context.rootNodeId,
      kind: "todo_list",
      status: input.completed === true ? "completed" : "running",
      countsForRun: false,
      providerThreadId: input.context.providerThread.id,
      providerTurnId: input.context.providerTurnId,
      nativeItemRef: codexNativeItemRef(input.nativeItemId),
      runtimeRequestId: null,
      checkpointScopeId: null,
      startedAt,
      completedAt,
    };
    const turnItem: OrchestrationV2TurnItem = {
      id: turnItemId,
      threadId: input.context.projectionThreadId,
      runId: input.context.projectionRunId,
      nodeId,
      providerThreadId: input.context.providerThread.id,
      providerTurnId: input.context.providerTurnId,
      nativeItemRef: codexNativeItemRef(input.nativeItemId),
      parentItemId: null,
      ordinal,
      status: input.completed === true ? "completed" : "running",
      title: null,
      startedAt,
      completedAt,
      updatedAt,
      type: "todo_list",
      planId,
      steps: [...input.steps],
      ...(input.explanation === undefined ? {} : { explanation: input.explanation }),
    };
    return { node, plan, turnItem };
  });
