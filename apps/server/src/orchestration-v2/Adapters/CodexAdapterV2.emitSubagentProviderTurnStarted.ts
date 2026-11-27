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

import type {
  ActiveCodexTurnContext,
  CodexSubagentThreadContext,
  PendingCodexSubagentTurnStarted,
} from "./CodexAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindEmitSubagentProviderTurnStarted = (ctx: any) =>
  /* Provider events include streaming deltas; avoid a span for each update. */
  Effect.fnUntraced(function* (
    subagent: CodexSubagentThreadContext,
    turn: PendingCodexSubagentTurnStarted,
  ) {
    const {
      CODEX_PROVIDER,
      activeTurns,
      beginTurnTokenUsage,
      client,
      completedAt,
      current,
      emitProviderEvent,
      emitSubagentTaskUpdate,
      endSessionApprovalsOnModeChange,
      findActiveTurnByNativeThreadId,
      getNativeThreadId,
      idAllocator,
      input,
      nativeId,
      nextProviderTurnOrdinal,
      node,
      nodeId,
      ordinal,
      parentNodeId,
      providerThread,
      providerTurn,
      scope,
      startedAt,
      status,
      terminalizedNonCompletedNativeTurns,
      updatedAt,
    } = ctx;

    if (subagent.nativeTurnIds.has(turn.nativeTurnId)) return;
    subagent.nativeTurnIds.add(turn.nativeTurnId);
    const parentNativeThreadId = yield* getNativeThreadId(subagent.parentContext.providerThread);
    const currentParent = yield* findActiveTurnByNativeThreadId(parentNativeThreadId);
    if (currentParent !== undefined) subagent.parentContext = currentParent;
    const terminalizedNativeTurns = yield* Ref.get(terminalizedNonCompletedNativeTurns);
    let ancestor: ActiveCodexTurnContext | undefined = subagent.parentContext;
    while (ancestor !== undefined) {
      if (terminalizedNativeTurns.has(ancestor.nativeTurnId)) {
        const nativeThreadId = yield* getNativeThreadId(subagent.providerThread);
        // Fork requests off the notification reader so it can read their responses.
        yield* client
          .request("turn/interrupt", {
            threadId: nativeThreadId,
            turnId: turn.nativeTurnId,
          })
          .pipe(
            Effect.catch((cause) =>
              Effect.logWarning("orchestration-v2.codex-late-subagent-interrupt-failed", {
                nativeThreadId,
                nativeTurnId: turn.nativeTurnId,
                cause,
              }),
            ),
            Effect.timeoutOrElse({
              duration: "10 seconds",
              orElse: () =>
                Effect.logWarning("orchestration-v2.codex-late-subagent-interrupt-timeout", {
                  nativeThreadId,
                  nativeTurnId: turn.nativeTurnId,
                }),
            }),
            Effect.forkIn(scope),
          );
        return;
      }
      ancestor = ancestor.subagent?.parentContext;
    }
    const providerTurnId = idAllocator.derive.providerTurn({
      driver: CODEX_PROVIDER,
      nativeTurnId: turn.nativeTurnId,
    });
    const providerTurnOrdinal = yield* nextProviderTurnOrdinal(subagent.providerThread.id, 1);
    const providerNodeId =
      providerTurnOrdinal === 1
        ? subagent.childRootNodeId
        : idAllocator.derive.nodeFromProviderItem({
            driver: CODEX_PROVIDER,
            nativeItemId: `${turn.nativeTurnId}:thread-root`,
          });
    const activeContext: ActiveCodexTurnContext = {
      input: subagent.parentContext.input,
      projectionAppThread: subagent.childThread,
      projectionThreadId: subagent.childThreadId,
      projectionRunId: null,
      nativeTurnId: turn.nativeTurnId,
      providerThread: subagent.providerThread,
      providerTurnId,
      providerTurnOrdinal,
      providerNodeId,
      providerNodeStartedAt: turn.startedAt,
      itemParentNodeId: providerNodeId,
      rootNodeId: providerNodeId,
      subagent,
      startedAt: turn.startedAt,
      itemPositions: new Map(),
      fileChangeKindsByItem: new Map(),
      messagePhases: new Map(),
      asyncMessageIds: new Set(),
      runningCompactionItemIds: new Set(),
      runningWebSearchItems: new Map(),
    };
    beginTurnTokenUsage(activeContext);
    endSessionApprovalsOnModeChange(activeContext);
    yield* Ref.update(activeTurns, (current) => {
      const updated = new Map(current);
      updated.set(turn.nativeTurnId, activeContext);
      return updated;
    });
    yield* emitSubagentTaskUpdate({
      subagent,
      status: "running",
      startedAt: turn.startedAt,
      ...(providerTurnOrdinal > 1 ? { reopen: true, result: null } : {}),
    });
    const now = yield* DateTime.now;
    yield* emitProviderEvent({
      type: "provider_thread.updated",
      driver: CODEX_PROVIDER,
      providerThread: {
        ...subagent.providerThread,
        status: "active",
        updatedAt: now,
      },
    });
    yield* emitProviderEvent({
      type: "provider_turn.updated",
      driver: CODEX_PROVIDER,
      threadId: subagent.childThreadId,
      providerTurn: {
        id: providerTurnId,
        providerThreadId: subagent.providerThread.id,
        nodeId: providerNodeId,
        runAttemptId: null,
        nativeTurnRef: {
          driver: CODEX_PROVIDER,
          nativeId: turn.nativeTurnId,
          strength: "strong",
        },
        ordinal: activeContext.providerTurnOrdinal,
        status: "running",
        startedAt: turn.startedAt,
        completedAt: null,
      },
    });
    yield* emitProviderEvent({
      type: "node.updated",
      driver: CODEX_PROVIDER,
      node: {
        id: providerNodeId,
        threadId: subagent.childThreadId,
        runId: null,
        parentNodeId: null,
        rootNodeId: providerNodeId,
        kind: "root_turn",
        status: "running",
        countsForRun: false,
        providerThreadId: subagent.providerThread.id,
        providerTurnId,
        nativeItemRef: subagent.task.nativeTaskRef,
        runtimeRequestId: null,
        checkpointScopeId: null,
        startedAt: turn.startedAt,
        completedAt: null,
      },
    });
  });
