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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindStartNativeTurn = (ctx: any) =>
  Effect.fn("CodexAdapterV2.startNativeTurn")(
    function* (
      turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
      codexInput: ReadonlyArray<CodexSchema.V2TurnStartParams__UserInput>,
    ) {
      const {
        CODEX_PROVIDER,
        activeTurns,
        adapterOptions,
        additionalContextByThread,
        appThreadByNativeThread,
        buildCodexTurnStartParams,
        client,
        codexCyberAccess,
        codexTimestamp,
        current,
        getNativeThreadId,
        mcpSessions,
        modelSelection,
        nativeThreadId,
        pendingRootTurns,
        registerRootTurn,
        reportStartupPhase,
        response,
        settledTurns,
        startedAt,
        withAppServerDeadline,
      } = ctx;

      const threadId = yield* getNativeThreadId(turnInput.providerThread);
      // A thread can reach its first turn without ensureThread or resumeThread, like a fork.
      if (!appThreadByNativeThread.has(threadId)) {
        appThreadByNativeThread.set(threadId, turnInput.threadId);
        yield* reportStartupPhase();
      }
      const mcpSession = yield* mcpSessions.read(turnInput.threadId);
      const models = adapterOptions.models === undefined ? [] : yield* adapterOptions.models;
      const configuredReasoningSummary = yield* client
        .request("config/read", { cwd: turnInput.runtimePolicy.cwd, includeLayers: false })
        .pipe(
          Effect.map((response) => response.config.model_reasoning_summary ?? undefined),
          Effect.catch(() =>
            Effect.logDebug("Codex config read failed.").pipe(Effect.as(undefined)),
          ),
          withAppServerDeadline("config/read"),
        );
      const turnStartParams = yield* buildCodexTurnStartParams({
        cyberAccess: codexCyberAccess(models, turnInput.modelSelection.model),
        nativeThreadId: threadId,
        codexInput,
        runtimePolicy: turnInput.runtimePolicy,
        modelSelection: turnInput.modelSelection,
        hasT3Mcp: mcpSession !== undefined,
        agentFeedback: turnInput.agentFeedback ?? "off",
        browserToolsAvailable: mcpSession?.browserToolsAvailable ?? true,
        deviceToolsAvailable: mcpSession?.capabilities?.has("device") ?? false,
        omitServiceTier: adapterOptions.resolveRuntime !== undefined,
        ...(turnInput.appContext === undefined ? {} : { appContext: turnInput.appContext }),
        ...(configuredReasoningSummary === undefined ? {} : { configuredReasoningSummary }),
      });
      const pendingTurn = { turnInput, hasPrompt: codexInput.length > 0 };
      yield* Ref.update(pendingRootTurns, (current) => {
        const updated = new Map(current);
        updated.set(threadId, pendingTurn);
        return updated;
      });
      yield* Ref.update(additionalContextByThread, (current) => {
        const next = new Map(current);
        if (turnStartParams.additionalContext)
          next.set(threadId, turnStartParams.additionalContext);
        else next.delete(threadId);
        return next;
      });
      // Completion can remove the old context while turn/start is in flight.
      const previousTurns = new Map([
        ...(yield* Ref.get(settledTurns)),
        ...(yield* Ref.get(activeTurns)),
      ]);
      const started = yield* client
        .request("turn/start", turnStartParams)
        .pipe(withAppServerDeadline("turn/start"));
      const previousTurn =
        previousTurns.get(started.turn.id) ?? (yield* Ref.get(activeTurns)).get(started.turn.id);
      if (previousTurn !== undefined && previousTurn.input.attemptId !== turnInput.attemptId) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver: CODEX_PROVIDER,
          detail:
            "Codex returned a turn belonging to an earlier run. Stop the existing turn before retrying this message.",
        });
      }
      // A turn/started notification may have registered and completed this turn already.
      if ((yield* Ref.get(pendingRootTurns)).get(threadId) !== pendingTurn) return;
      yield* registerRootTurn({
        ...pendingTurn,
        nativeTurnId: started.turn.id,
        startedAt: codexTimestamp(started.turn.startedAt),
        waitForNativeStart: started.turn.startedAt === null,
      });
    },
    (effect, turnInput) =>
      effect.pipe(
        Effect.ensuring(
          Effect.flatMap(getNativeThreadId(turnInput.providerThread), (threadId) =>
            Ref.update(pendingRootTurns, (current) => {
              if (current.get(threadId)?.turnInput !== turnInput) return current;
              const updated = new Map(current);
              updated.delete(threadId);
              return updated;
            }),
          ).pipe(Effect.ignore),
        ),
      ),
  );
