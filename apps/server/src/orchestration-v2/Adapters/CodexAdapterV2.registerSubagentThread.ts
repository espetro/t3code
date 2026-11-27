// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of CodexAdapterV2.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import { pickScriptcBindCtx } from "../scriptcBindScope.ts";
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

import type { ActiveCodexTurnContext, CodexSubagentThreadContext } from "./CodexAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindRegisterSubagentThread = (ctx: any) =>
  /* Provider events include streaming deltas; avoid a span for each update. */
  Effect.fnUntraced(function* (input: {
    readonly context: ActiveCodexTurnContext;
    readonly nativeThreadId: string;
    readonly nativeItemId: string;
    readonly nativeToolCallId: string;
    readonly prompt: string;
    readonly title: string | null;
    readonly model: string | null;
    readonly reasoningEffort?: string | null | undefined;
    readonly ordinal: number;
    readonly emitInitialPrompt: boolean;
  }) {
    const {
      CODEX_PROVIDER,
      CodexChildSelection,
      client,
      codexNativeItemRef,
      completedAt,
      context,
      createdAt,
      current,
      decodeCodexChildModel,
      decodeCodexChildThread,
      emitProviderEvent,
      emitSubagentProviderTurnStarted,
      emitSubagentTaskUpdate,
      idAllocator,
      message,
      messageId,
      model,
      modelSelection,
      nativeId,
      nativeThreadId,
      node,
      options,
      ordinal,
      parentNodeId,
      pendingSubagentTurns,
      providerSessionId,
      providerTurnId,
      resolveItemOrdinal,
      response,
      scope,
      startedAt,
      status,
      subagentSelections,
      subagentThreads,
      text,
      turnItem,
      turnItemId,
      updateSubagentSelection,
      updatedAt,
    } = pickScriptcBindCtx(ctx);

    const registeredSubagents = yield* Ref.get(subagentThreads);
    if (input.model && !subagentSelections.has(input.nativeThreadId)) {
      yield* updateSubagentSelection(input.nativeThreadId, input.model, input.reasoningEffort);
    }
    if (registeredSubagents.has(input.nativeThreadId)) {
      return;
    }

    const now = yield* DateTime.now;
    const subagentNodeId = idAllocator.derive.nodeFromProviderItem({
      driver: CODEX_PROVIDER,
      nativeItemId: input.nativeItemId,
    });
    const childRootNodeId = idAllocator.derive.nodeFromProviderItem({
      driver: CODEX_PROVIDER,
      nativeItemId: `${input.nativeItemId}:thread-root`,
    });
    const childThreadId = idAllocator.derive.subagentThread({
      driver: CODEX_PROVIDER,
      nativeThreadId: input.nativeThreadId,
    });
    const turnItemOrdinal = yield* resolveItemOrdinal(input.context, input.nativeItemId);
    const providerThread = {
      id: idAllocator.derive.providerThread({
        driver: CODEX_PROVIDER,
        nativeThreadId: input.nativeThreadId,
      }),
      driver: CODEX_PROVIDER,
      providerInstanceId: input.context.input.modelSelection.instanceId,
      providerSessionId: input.context.providerThread.providerSessionId,
      appThreadId: childThreadId,
      ownerNodeId: null,
      nativeThreadRef: {
        driver: CODEX_PROVIDER,
        nativeId: input.nativeThreadId,
        strength: "strong" as const,
      },
      nativeConversationHeadRef: null,
      status: "idle" as const,
      firstRunOrdinal: null,
      lastRunOrdinal: null,
      handoffIds: [],
      forkedFrom: {
        providerThreadId: input.context.providerThread.id,
        providerTurnId: input.context.providerTurnId,
      },
      createdAt: now,
      updatedAt: now,
    } satisfies OrchestrationV2ProviderThread;
    const reportedSelection = subagentSelections.get(input.nativeThreadId);
    const task = {
      id: subagentNodeId,
      threadId: input.context.projectionThreadId,
      runId: input.context.projectionRunId,
      parentNodeId: input.context.itemParentNodeId,
      origin: "provider_native",
      createdBy: "agent",
      driver: CODEX_PROVIDER,
      providerInstanceId: input.context.input.modelSelection.instanceId,
      providerThreadId: providerThread.id,
      childThreadId,
      nativeTaskRef: codexNativeItemRef(input.nativeItemId),
      prompt: input.prompt,
      title: input.title,
      model: reportedSelection?.model ?? input.model,
      modelSelection: reportedSelection
        ? {
            instanceId: input.context.input.modelSelection.instanceId,
            ...reportedSelection,
          }
        : undefined,
      status: "running",
      result: null,
      startedAt: now,
      completedAt: null,
      updatedAt: now,
    } satisfies OrchestrationV2Subagent;
    const childThread = makeSubagentChildThread({
      parentThread: input.context.projectionAppThread,
      childThreadId,
      parentNodeId: subagentNodeId,
      activeProviderThreadId: providerThread.id,
      providerInstanceId: input.context.input.modelSelection.instanceId,
      // A child's effort can differ from the parent's. Until Codex reports it, show none.
      modelSelection: task.modelSelection ?? {
        ...input.context.input.modelSelection,
        model: task.model ?? input.context.input.modelSelection.model,
        options: (input.context.input.modelSelection.options ?? []).filter(
          ({ id }) => id !== "reasoningEffort",
        ),
      },
      title: subagentThreadTitle({
        parentTitle: input.context.projectionAppThread.title,
        prompt: task.prompt,
        title: task.title,
        ordinal: input.ordinal,
      }),
      now,
      createdBy: "agent",
      creationSource: "provider",
    });
    const subagent = {
      parentContext: input.context,
      providerThread,
      childThread,
      subagentNodeId,
      childRootNodeId,
      childThreadId,
      nativeTurnIds: new Set<string>(),
      startedAt: now,
      turnItemId: idAllocator.derive.turnItemFromProviderItem({
        driver: CODEX_PROVIDER,
        nativeItemId: input.nativeItemId,
      }),
      turnItemOrdinal,
      task,
    } satisfies CodexSubagentThreadContext;

    yield* Ref.update(subagentThreads, (current) => {
      const updated = new Map(current);
      updated.set(input.nativeThreadId, subagent);
      return updated;
    });
    yield* emitProviderEvent({
      type: "app_thread.created",
      driver: CODEX_PROVIDER,
      appThread: childThread,
    });
    yield* emitProviderEvent({
      type: "node.updated",
      driver: CODEX_PROVIDER,
      node: {
        id: subagentNodeId,
        threadId: input.context.projectionThreadId,
        runId: input.context.projectionRunId,
        parentNodeId: input.context.itemParentNodeId,
        rootNodeId: input.context.rootNodeId,
        kind: "subagent",
        status: "running",
        countsForRun: false,
        providerThreadId: providerThread.id,
        providerTurnId: input.context.providerTurnId,
        nativeItemRef: codexNativeItemRef(input.nativeToolCallId),
        runtimeRequestId: null,
        checkpointScopeId: null,
        startedAt: now,
        completedAt: null,
      },
    });
    yield* emitProviderEvent({
      type: "node.updated",
      driver: CODEX_PROVIDER,
      node: {
        id: childRootNodeId,
        threadId: childThreadId,
        runId: null,
        parentNodeId: null,
        rootNodeId: childRootNodeId,
        kind: "root_turn",
        status: "running",
        countsForRun: false,
        providerThreadId: providerThread.id,
        providerTurnId: null,
        nativeItemRef: codexNativeItemRef(input.nativeItemId),
        runtimeRequestId: null,
        checkpointScopeId: null,
        startedAt: now,
        completedAt: null,
      },
    });
    yield* emitProviderEvent({
      type: "provider_thread.updated",
      driver: CODEX_PROVIDER,
      providerThread,
    });
    if (input.emitInitialPrompt && input.prompt.length > 0) {
      const promptNativeItemId = `${input.nativeItemId}:prompt`;
      const promptArtifacts = makeSubagentConversationArtifacts({
        senderThreadId: input.context.projectionThreadId,
        messageId: idAllocator.derive.messageFromProviderItem({
          driver: CODEX_PROVIDER,
          nativeItemId: promptNativeItemId,
        }),
        turnItemId: idAllocator.derive.turnItemFromProviderItem({
          driver: CODEX_PROVIDER,
          nativeItemId: promptNativeItemId,
        }),
        threadId: childThreadId,
        rootNodeId: childRootNodeId,
        providerThreadId: providerThread.id,
        providerTurnId: null,
        nativeItemRef: codexNativeItemRef(promptNativeItemId),
        role: "user",
        text: input.prompt,
        ordinal: 100,
        now,
      });
      yield* emitProviderEvent({
        type: "message.updated",
        driver: CODEX_PROVIDER,
        message: promptArtifacts.message,
      });
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver: CODEX_PROVIDER,
        turnItem: promptArtifacts.turnItem,
      });
    }
    yield* emitSubagentTaskUpdate({
      subagent,
      status: "running",
    });

    const pendingTurns = yield* Ref.modify(pendingSubagentTurns, (current) => {
      const pending = current.get(input.nativeThreadId) ?? [];
      const updated = new Map(current);
      updated.delete(input.nativeThreadId);
      return [pending, updated];
    });
    for (const pendingTurn of pendingTurns) {
      yield* emitSubagentProviderTurnStarted(subagent, pendingTurn);
    }
    if (task.model === null) {
      yield* client.raw
        .request("thread/read", { threadId: input.nativeThreadId, includeTurns: false })
        .pipe(
          Effect.flatMap(decodeCodexChildThread),
          Effect.map((response): typeof CodexChildSelection.Type | null =>
            response.thread.id === input.nativeThreadId && response.thread.model?.trim()
              ? {
                  thread: response.thread,
                  model: response.thread.model,
                  reasoningEffort: response.thread.reasoningEffort,
                }
              : null,
          ),
          Effect.orElseSucceed(() => null),
          Effect.filterOrElse(
            (response) => !(response === null),
            (_response) =>
              client.raw
                .request("thread/resume", {
                  threadId: input.nativeThreadId,
                  excludeTurns: true,
                })
                .pipe(Effect.flatMap(decodeCodexChildModel)),
          ),
          Effect.timeout("5 seconds"),
          Effect.flatMap((response) =>
            response.thread.id === input.nativeThreadId &&
            !subagentSelections.has(input.nativeThreadId)
              ? updateSubagentSelection(
                  input.nativeThreadId,
                  response.model,
                  response.reasoningEffort,
                  response.serviceTier,
                )
              : Effect.void,
          ),
          Effect.ignore,
          Effect.forkIn(scope),
        );
    }
  });
