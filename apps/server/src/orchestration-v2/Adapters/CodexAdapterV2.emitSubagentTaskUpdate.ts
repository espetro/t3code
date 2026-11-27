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
import type { CodexSubagentThreadContext } from "./CodexAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindEmitSubagentTaskUpdate = (ctx: any) =>
  /* Provider events include streaming deltas; avoid a span for each update. */
  Effect.fnUntraced(function* (input: {
    readonly subagent: CodexSubagentThreadContext;
    readonly status: OrchestrationV2Subagent["status"];
    readonly result?: string | null;
    readonly completedAt?: DateTime.Utc | null;
    readonly startedAt?: DateTime.Utc;
    readonly reopen?: boolean;
    readonly progress?: string;
  }) {
    const {
      CODEX_PROVIDER,
      emitProviderEvent,
      nodeId,
      ordinal,
      startedAt,
      subagent,
      turnItem,
      updatedAt,
    } = ctx;

    const now = yield* DateTime.now;
    const prior = input.reopen
      ? (({ progress: _staleProgress, ...rest }) => rest)(input.subagent.task)
      : input.subagent.task;
    const settled = !isOrchestrationV2WorkActive(prior.status);
    // Late snapshots must not reopen completed children; only new turns may.
    if (settled && isOrchestrationV2WorkActive(input.status) && !input.reopen) return;
    const status = settled && !input.reopen ? prior.status : input.status;
    const completedAt = isOrchestrationV2WorkActive(status)
      ? null
      : (prior.completedAt ?? input.completedAt ?? now);
    const task = {
      ...prior,
      status,
      ...(input.reopen
        ? {
            runId: input.subagent.parentContext.projectionRunId,
            parentNodeId: input.subagent.parentContext.itemParentNodeId,
          }
        : {}),
      startedAt: input.startedAt ?? prior.startedAt,
      ...(input.progress === undefined ? {} : { progress: input.progress }),
      result: input.result === undefined ? input.subagent.task.result : input.result,
      completedAt,
      updatedAt: now,
    } satisfies OrchestrationV2Subagent;
    input.subagent.task = task;
    if (input.startedAt !== undefined) input.subagent.startedAt = input.startedAt;

    yield* emitProviderEvent({
      type: "subagent.updated",
      driver: CODEX_PROVIDER,
      subagent: task,
    });
    yield* emitProviderEvent({
      type: "turn_item.updated",
      driver: CODEX_PROVIDER,
      turnItem: {
        id: input.subagent.turnItemId,
        threadId: task.threadId,
        runId: task.runId,
        nodeId: task.id,
        providerThreadId: task.providerThreadId,
        providerTurnId: input.subagent.parentContext.providerTurnId,
        nativeItemRef: task.nativeTaskRef,
        parentItemId: null,
        ordinal: input.subagent.turnItemOrdinal,
        status: task.status,
        title: task.title,
        startedAt: task.startedAt,
        completedAt: task.completedAt,
        updatedAt: task.updatedAt,
        type: "subagent",
        subagentId: task.id,
        origin: task.origin,
        driver: task.driver,
        providerInstanceId: task.providerInstanceId,
        childThreadId: task.childThreadId,
        prompt: task.prompt,
        ...(task.progress === undefined ? {} : { progress: task.progress }),
        result: task.result,
      },
    });
  });
