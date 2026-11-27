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

import type { ActiveCodexProviderRetry, ActiveCodexTurnContext } from "./CodexAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindRetryCapacityFailure = (ctx: any) =>
  Effect.fn("CodexAdapterV2.retryCapacityFailure")(function* (
    terminal: Parameters<typeof finalizeCodexTurn>[0],
  ) {
    const {
      CODEX_CAPACITY_MAX_RETRIES,
      CODEX_PROVIDER,
      activeTurns,
      capacityContinuations,
      codexErrorInfoCode,
      codexFailureItemId,
      codexFailureItemKey,
      codexRetryTurnItem,
      current,
      emitOrDeferRootTerminal,
      emitProviderEvent,
      finalizeCodexTurn,
      getNativeThreadId,
      goalStops,
      interruptingNativeTurns,
      message,
      modelSelection,
      options,
      providerRetries,
      providerRetry,
      providerTurnId,
      resolveItemOrdinal,
      scope,
      startNativeTurn,
      startedAt,
      turnItem,
      turnTerminalizationPermit,
    } = ctx;

    const context = terminal.context;
    const code =
      terminal.failureErrorInfo == null
        ? context.latestProviderFailure?.nativeCode
        : codexErrorInfoCode(terminal.failureErrorInfo);
    if (
      terminal.status !== "failed" ||
      code !== "serverOverloaded" ||
      context.subagent !== null ||
      (context.input.message.attachments.length === 0 &&
        context.input.message.text.trim().toLowerCase() === "/compact")
    )
      return false;

    return yield* turnTerminalizationPermit.withPermits(1)(
      Effect.gen(function* () {
        if ((yield* Ref.get(activeTurns)).get(terminal.nativeTurnId) !== context) return true;
        if (context.capacityRetryPending !== undefined) return true;
        if (
          (context.capacityRetryAttempt ?? 0) >= CODEX_CAPACITY_MAX_RETRIES ||
          (yield* Ref.get(interruptingNativeTurns)).has(terminal.nativeTurnId)
        )
          return false;

        const attempt = (context.capacityRetryAttempt ?? 0) + 1;
        context.capacityRetryAttempt = attempt;
        const pending = yield* Deferred.make<ActiveCodexTurnContext | undefined>();
        context.capacityRetryPending = pending;
        const retryDelayMs = Math.min(2_000 * 2 ** (attempt - 1), 30_000);
        const now = yield* DateTime.now;
        const previous = (yield* Ref.get(providerRetries)).get(context.providerTurnId);
        const state: ActiveCodexProviderRetry = {
          context: previous?.context ?? context,
          nativeMessage:
            terminal.failureMessage ??
            context.latestProviderFailure?.nativeMessage ??
            "Selected model is at capacity.",
          nativeCode: code,
          failure: makeProviderFailure({
            message: context.latestProviderFailure?.failure.message ?? terminal.failureMessage,
            code,
            class: "provider_error",
            retryable: true,
          }),
          retry: { attempt, maxAttempts: CODEX_CAPACITY_MAX_RETRIES, retryDelayMs },
          itemOrdinal:
            previous?.itemOrdinal ??
            (yield* resolveItemOrdinal(context, codexFailureItemKey(context))),
          id: previous === undefined ? codexFailureItemId(context) : previous.id,
          startedAt: previous?.startedAt ?? now,
        };
        yield* Ref.update(providerRetries, (current) =>
          new Map(current).set(context.providerTurnId, state),
        );
        yield* emitProviderEvent({
          type: "turn_item.updated",
          driver: CODEX_PROVIDER,
          turnItem: codexRetryTurnItem(context, state, "running", now),
        });
        yield* Effect.sleep(retryDelayMs).pipe(
          Effect.andThen(
            Effect.gen(function* () {
              const nativeThreadId = yield* getNativeThreadId(context.providerThread);
              const claimed = yield* turnTerminalizationPermit.withPermits(1)(
                Effect.gen(function* () {
                  if (
                    (yield* Ref.get(activeTurns)).get(terminal.nativeTurnId) !== context ||
                    goalStops.has(nativeThreadId) ||
                    (yield* Ref.get(interruptingNativeTurns)).has(terminal.nativeTurnId)
                  )
                    return false;
                  capacityContinuations.set(nativeThreadId, { context, retry: state });
                  yield* finalizeCodexTurn({ ...terminal, continueRun: true });
                  return true;
                }),
              );
              if (!claimed) return;
              // Notifications before the RPC response also take the terminalization permit.
              yield* startNativeTurn(
                {
                  ...context.input,
                  // A speed changed during the failed attempt outlives the retry.
                  ...(context.appliedServiceTier === undefined
                    ? {}
                    : {
                        modelSelection: {
                          ...context.input.modelSelection,
                          options: [
                            ...(context.input.modelSelection.options ?? []).filter(
                              (option) => option.id !== "serviceTier" && option.id !== "fastMode",
                            ),
                            { id: "serviceTier", value: context.appliedServiceTier },
                          ],
                        },
                      }),
                  providerTurnOrdinal: context.providerTurnOrdinal + 1,
                },
                [],
              ).pipe(
                Effect.catch((cause) =>
                  Effect.gen(function* () {
                    if (yield* Deferred.isDone(pending)) return;
                    yield* Effect.logWarning("orchestration-v2.codex-capacity-retry-start-failed", {
                      providerTurnId: context.providerTurnId,
                      cause,
                    });
                    yield* emitProviderEvent({
                      type: "turn_item.updated",
                      driver: CODEX_PROVIDER,
                      turnItem: codexRetryTurnItem(context, state, "failed", yield* DateTime.now),
                    });
                    yield* Deferred.succeed(pending, undefined);
                    yield* turnTerminalizationPermit.withPermits(1)(
                      emitOrDeferRootTerminal({ ...terminal, providerRetry: state }),
                    );
                  }),
                ),
                Effect.ensuring(
                  Effect.sync(() => {
                    if (capacityContinuations.get(nativeThreadId)?.context === context)
                      capacityContinuations.delete(nativeThreadId);
                  }),
                ),
              );
            }),
          ),
          Effect.forkIn(scope, { startImmediately: true }),
        );
        return true;
      }),
    );
  });
