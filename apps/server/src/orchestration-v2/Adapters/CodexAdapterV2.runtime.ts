// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of CodexAdapterV2.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
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
import type { ActiveCodexTurnContext } from "./CodexAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindRuntime = (ctx: any) => {
  const {
    CODEX_PROVIDER,
    CODEX_STOP_CONFIRM_TIMEOUT_MS,
    CODEX_THREAD_IN_USE_MESSAGE,
    LOOPBACK_HOSTNAMES,
    activateGoal,
    activeTurns,
    adapterOptions,
    additionalContextByThread,
    appThreadByNativeThread,
    applyServiceTier,
    applyThreadName,
    canReuseCodexContextUsage,
    capacityContinuations,
    clearImageWork,
    client,
    codexThreadRuntimeParams,
    codexTimestamp,
    current,
    decodeCodexResumeMetadata,
    ensureInitialized,
    events,
    finalizeCodexTurn,
    getNativeThreadId,
    goalStops,
    goalUpdatesHeld,
    goalsByNativeThread,
    goalsPausedForWake,
    heldGoalTurn,
    idAllocator,
    imageTurns,
    input,
    interruptingNativeTurns,
    isCodexActiveWriterError,
    isDescendantCodexTurn,
    isProviderAdapterRuntimeRequestResponseError,
    isProviderMcpSignInError,
    key,
    latestRunTurnId,
    mcpApps,
    mcpSessions,
    mcpSignIns,
    modelSelection,
    nativeId,
    normalizeCodexThreadLoadModelSelection,
    pendingMcpAppCaptures,
    pendingRootTurns,
    pendingRuntimeRequests,
    providerSession,
    providerThread,
    providerThreadFromCodexThread,
    readCodexThreadHistoryMetadata,
    readMcpSession,
    readStdioMcpServers,
    rejectIfRetired,
    releaseGoalUpdates,
    releaseSettledTurnIfIdle,
    reportStartupPhase,
    reportingResume,
    resolveCodexForkBoundary,
    resolveCodexRollbackTurnCount,
    resolveGoalStopTarget,
    resumeNativeThread,
    rootProviderThreads,
    runGoalCommand,
    runningCommandItemsByTurn,
    runningDynamicToolsByTurn,
    scope,
    session,
    sessionApprovals,
    settledTurns,
    startNativeTurn,
    subagentThreads,
    terminalizeMcpAppCaptures,
    terminalizeRunningCommandItems,
    terminalizeRunningDynamicTools,
    terminateBackgroundTerminal,
    text,
    threadClosings,
    toCodexInput,
    toProtocolError,
    turnHasRetainedBackgroundWork,
    turnTerminalizationPermit,
    turnTokenUsageByThread,
    turnWaiters,
    updatedAt,
    withAppServerDeadline,
    withLoadedThread,
    withStartupPhase,
  } = pickScriptcBindCtx(ctx);
  return {
    instanceId: adapterOptions.instanceId,
    driver: CODEX_PROVIDER,
    providerSessionId: input.providerSessionId,
    // Turn start republishes this record, so it carries the step MCP startup is still on.
    get providerSession() {
      return withStartupPhase(session);
    },
    events: Stream.fromEffectRepeat(Queue.take(events)),
    canReuseContextUsage: canReuseCodexContextUsage,
    normalizeThreadLoadModelSelection: normalizeCodexThreadLoadModelSelection,
    // Exec sessions, background terminals and subagents all live in the app-server process.
    backgroundTasksEndWithProcess: true,
    // Idle release can beat delayed subagent resumes: Codex reports them completed between turns with no resume-expected signal.
    hasPendingBackgroundWork: Effect.gen(function* () {
      for (const items of (yield* Ref.get(runningCommandItemsByTurn)).values()) {
        if (items.size > 0) {
          return true;
        }
      }
      for (const items of (yield* Ref.get(runningDynamicToolsByTurn)).values()) {
        if (items.size > 0) {
          return true;
        }
      }
      if ((yield* Ref.get(pendingMcpAppCaptures)).size > 0) {
        return true;
      }
      for (const state of imageTurns.values()) {
        if (state.running.size > 0 || state.saved.size > 0) return true;
      }
      for (const subagent of (yield* Ref.get(subagentThreads)).values()) {
        if (subagent.task.status === "running") {
          return true;
        }
      }
      return false;
    }),
    // Untraced: the run's event stream calls this once per provider event.
    hasPendingBackgroundWorkForThread: Effect.fnUntraced(function* (providerThread) {
      const contexts = [
        ...(yield* Ref.get(activeTurns)).values(),
        ...(yield* Ref.get(settledTurns)).values(),
      ];
      const roots = contexts.filter((context) => context.providerThread.id === providerThread.id);
      for (const context of contexts) {
        if (!roots.some((root) => context === root || isDescendantCodexTurn(context, root)))
          continue;
        if (yield* turnHasRetainedBackgroundWork(context.nativeTurnId)) return true;
        if (context.subagent !== null && (yield* Ref.get(activeTurns)).has(context.nativeTurnId))
          return true;
      }
      return false;
    }),
    ensureThread: (threadInput) =>
      rejectIfRetired.pipe(
        Effect.andThen(ensureInitialized),
        Effect.andThen(
          Effect.all([
            mcpSessions.read(threadInput.threadId),
            readStdioMcpServers(threadInput.runtimePolicy.cwd),
          ]),
        ),
        Effect.flatMap(([mcpSession, stdioMcpServers]) =>
          client.request("thread/start", {
            ...codexThreadRuntimeParams({
              threadId: threadInput.threadId,
              mcpSession,
              stdioMcpServers,
              modelSelection: threadInput.modelSelection,
              runtimePolicy: threadInput.runtimePolicy,
            }),
            // Codex tags the child's MCP calls with thread_source "subagent".
            ...(IdAllocator.isDelegatedTaskThread(threadInput.threadId)
              ? { threadSource: "subagent" }
              : {}),
          }),
        ),
        Effect.tap((response) => {
          appThreadByNativeThread.set(response.thread.id, threadInput.threadId);
          return reportStartupPhase();
        }),
        Effect.map((response): OrchestrationV2ProviderThread =>
          providerThreadFromCodexThread({
            appThreadId: threadInput.threadId,
            idAllocator,
            ownerNodeId: null,
            providerSessionId: input.providerSessionId,
            providerInstanceId: adapterOptions.instanceId,
            thread: response.thread,
          }),
        ),
        withAppServerDeadline("thread/start"),
        Effect.mapError(
          (cause) =>
            new ProviderAdapter.ProviderAdapterEnsureThreadError({
              driver: CODEX_PROVIDER,
              threadId: threadInput.threadId,
              cause,
            }),
        ),
      ),
    resumeThread: Effect.fn("CodexAdapterV2.resumeThread")(
      function* (threadInput) {
        yield* rejectIfRetired;
        const nativeThreadId = yield* getNativeThreadId(threadInput.providerThread);
        const appThreadId = threadInput.threadId ?? threadInput.providerThread.appThreadId;
        if (appThreadId != null) appThreadByNativeThread.set(nativeThreadId, appThreadId);
        const resume = resumeNativeThread(nativeThreadId, {
          excludeTurns: true,
          ...codexThreadRuntimeParams({
            threadId: appThreadId,
            mcpSession: yield* readMcpSession(appThreadId),
            stdioMcpServers: yield* readStdioMcpServers(threadInput.runtimePolicy?.cwd),
            ...(threadInput.modelSelection === undefined
              ? {}
              : { modelSelection: threadInput.modelSelection }),
            ...(threadInput.runtimePolicy === undefined
              ? {}
              : { runtimePolicy: threadInput.runtimePolicy }),
          }),
        });
        // Codex resumes an active goal's turns right after the response; own them before it.
        const previousRoot = rootProviderThreads.get(nativeThreadId);
        rootProviderThreads.set(nativeThreadId, threadInput.providerThread);
        goalUpdatesHeld.add(nativeThreadId);
        const response = yield* ensureInitialized.pipe(
          Effect.andThen(appThreadId == null ? resume : reportingResume(appThreadId, resume)),
          withAppServerDeadline("thread/resume"),
          Effect.flatMap(decodeCodexResumeMetadata),
          // Stay registered: a lost or undecodable response may still have resumed the thread.
          Effect.onError(() =>
            Effect.suspend(() => {
              if (previousRoot !== undefined) {
                rootProviderThreads.set(nativeThreadId, previousRoot);
              }
              return releaseGoalUpdates(nativeThreadId);
            }),
          ),
        );
        const resumed = {
          ...threadInput.providerThread,
          providerSessionId: input.providerSessionId,
          providerInstanceId: adapterOptions.instanceId,
          status: "idle",
          nativeThreadRef: {
            driver: CODEX_PROVIDER,
            nativeId: response.thread.id,
            strength: "strong",
          },
          nativeConversationHeadRef: threadInput.providerThread.nativeConversationHeadRef,
          updatedAt: codexTimestamp(response.thread.updatedAt),
        } satisfies OrchestrationV2ProviderThread;
        rootProviderThreads.set(nativeThreadId, resumed);
        yield* releaseGoalUpdates(nativeThreadId);
        return rootProviderThreads.get(nativeThreadId) ?? resumed;
      },
      (effect, threadInput) =>
        effect.pipe(
          Effect.mapError((cause) =>
            isCodexActiveWriterError(cause)
              ? new ProviderAdapter.ProviderAdapterThreadInUseError({
                  driver: CODEX_PROVIDER,
                  providerThreadId: threadInput.providerThread.id,
                  detail: CODEX_THREAD_IN_USE_MESSAGE,
                  cause,
                })
              : new ProviderAdapter.ProviderAdapterResumeThreadError({
                  driver: CODEX_PROVIDER,
                  providerSessionId: input.providerSessionId,
                  providerThreadId: threadInput.providerThread.id,
                  cause,
                }),
          ),
        ),
    ),
    compactThread: Effect.fn("CodexAdapterV2.compactThread")(
      function* (turnInput) {
        const threadId = yield* getNativeThreadId(turnInput.providerThread);
        yield* Ref.update(pendingRootTurns, (current) =>
          new Map(current).set(threadId, { turnInput }),
        );
        // Clear on interruption; a late turn/started must not be adopted after an interrupted start.
        yield* client.request("thread/compact/start", { threadId }).pipe(
          Effect.onError(() =>
            Ref.update(pendingRootTurns, (current) => {
              const next = new Map(current);
              next.delete(threadId);
              return next;
            }),
          ),
        );
      },
      (effect, turnInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterTurnStartError({
                driver: CODEX_PROVIDER,
                threadId: turnInput.threadId,
                providerThreadId: turnInput.providerThread.id,
                runId: turnInput.runId,
                cause,
              }),
          ),
        ),
    ),
    injectHistory: Effect.fn("CodexAdapterV2.injectHistory")(
      function* (input) {
        const threadId = yield* getNativeThreadId(input.providerThread);
        return yield* client
          .request("thread/inject_items", {
            threadId,
            items: historyResponseItems(input.messages, input.context),
          })
          .pipe(
            Effect.as(true),
            // Retry only unknown-method errors, which precede history mutation. Transport or payload errors leave delivery ambiguous.
            Effect.catchTags({
              CodexAppServerRequestError: (error) =>
                error.code === -32601 ? Effect.succeed(false) : Effect.fail(error),
            }),
          );
      },
      Effect.mapError(
        (cause) =>
          new ProviderAdapter.ProviderAdapterProtocolError({
            driver: CODEX_PROVIDER,
            detail: "Failed to inject historical context",
            cause,
          }),
      ),
    ),
    resumeTurn: (input) => runtime.startTurn(ProviderAdapter.resumeTurnInput(input)),
    startTurn: (turnInput) => {
      const continuation =
        turnInput.restartContinuationOfRunId !== undefined || turnInput.resume === true;
      const goalCommand = !continuation ? parseGoalCommand(turnInput.message) : null;
      if (goalCommand !== null) return runGoalCommand(turnInput, goalCommand);
      const nativeThreadId = turnInput.providerThread.nativeThreadRef?.nativeId;
      return Effect.gen(function* () {
        yield* rejectIfRetired;
        if (
          !continuation &&
          nativeThreadId != null &&
          goalsPausedForWake.has(nativeThreadId) &&
          goalsByNativeThread.get(nativeThreadId)?.status === "paused"
        ) {
          return yield* activateGoal(turnInput, nativeThreadId, toCodexInput(turnInput));
        }
        // Not in startNativeTurn: a capacity retry would replay its captured, possibly stale title.
        if (nativeThreadId != null) {
          yield* applyThreadName(nativeThreadId, turnInput.appThread.title);
        }
        yield* startNativeTurn(turnInput, !continuation ? yield* toCodexInput(turnInput) : []);
      }).pipe(
        Effect.mapError(
          (cause) =>
            new ProviderAdapter.ProviderAdapterTurnStartError({
              driver: CODEX_PROVIDER,
              threadId: turnInput.threadId,
              providerThreadId: turnInput.providerThread.id,
              runId: turnInput.runId,
              cause,
            }),
        ),
      );
    },
    steerTurn: Effect.fn("CodexAdapterV2.steerTurn")(
      function* (turnInput) {
        const threadId = yield* getNativeThreadId(turnInput.providerThread);
        const latestTurnId = latestRunTurnId(turnInput.providerTurnId);
        const held = heldGoalTurn(turnInput.providerThread, latestTurnId);
        const providerTurnId =
          held === undefined
            ? latestTurnId
            : ((yield* Deferred.await(held.hold.next))?.providerTurnId ?? latestTurnId);
        let activeTurn = Array.from((yield* Ref.get(activeTurns)).values()).find(
          (candidate) => candidate.providerTurnId === providerTurnId,
        );
        const startingRetry = capacityContinuations.get(threadId)?.context;
        if (activeTurn === undefined && startingRetry?.providerTurnId === providerTurnId) {
          activeTurn = startingRetry;
        }
        while (activeTurn?.capacityRetryPending !== undefined) {
          activeTurn = yield* Deferred.await(activeTurn.capacityRetryPending);
        }
        if (activeTurn === undefined) {
          return yield* toProtocolError(
            `Provider turn ${turnInput.providerTurnId} is not active and cannot be steered.`,
          );
        }

        yield* applyServiceTier(threadId, turnInput.modelSelection);
        const codexInput = yield* toCodexInput(turnInput);
        // turn/steer takes no additionalContext, so notes the thread has not been sent go
        // as quoted user input, the way restoreAdditionalContext resends them.
        const sentContext = (yield* Ref.get(additionalContextByThread)).get(threadId);
        const unsentNotes = (turnInput.appContext ?? []).filter(
          (entry) => sentContext?.[entry.key]?.value !== entry.text,
        );
        yield* client.request("turn/steer", {
          expectedTurnId: activeTurn.nativeTurnId,
          input: [
            ...unsentNotes.map((entry) => ({
              type: "text" as const,
              text: `<external_${entry.key}>${entry.text}</external_${entry.key}>`,
            })),
            ...codexInput,
          ],
          threadId,
        });
        if (unsentNotes.length > 0) {
          yield* Ref.update(additionalContextByThread, (current) => {
            const next = new Map(current);
            next.set(threadId, {
              ...current.get(threadId),
              ...Object.fromEntries(
                unsentNotes.map((entry) => [
                  entry.key,
                  { kind: "untrusted" as const, value: entry.text },
                ]),
              ),
            });
            return next;
          });
        }
      },
      (effect, turnInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterSteerRunError({
                driver: CODEX_PROVIDER,
                providerThreadId: turnInput.providerThread.id,
                providerTurnId: turnInput.providerTurnId,
                cause,
              }),
          ),
        ),
    ),
    applyThreadTitle: Effect.fn("CodexAdapterV2.applyThreadTitle")(function* ({
      providerThread,
      title,
    }) {
      const nativeThreadId = providerThread.nativeThreadRef?.nativeId;
      if (nativeThreadId != null) yield* applyThreadName(nativeThreadId, title);
    }),
    applyModelSelection: Effect.fn("CodexAdapterV2.applyModelSelection")(function* ({
      providerThread,
      modelSelection,
    }) {
      const threadId = providerThread.nativeThreadRef?.nativeId;
      if (threadId != null) yield* applyServiceTier(threadId, modelSelection);
    }),
    // Dropping this connection's subscription lets the shared app-server
    // shut the native thread (and its MCP servers) down once it is idle.
    unloadThread: Effect.fn("CodexAdapterV2.unloadThread")(
      function* (unloadInput) {
        const nativeThreadId = yield* getNativeThreadId(unloadInput.providerThread);
        sessionApprovals.delete(nativeThreadId);
        // Archive also unloads, inline and without thread/closed; resumeNativeThread
        // unarchives it on the next turn.
        if (unloadInput.archive === true) {
          yield* client.request("thread/archive", { threadId: nativeThreadId });
        } else {
          // A resume may already wait on the pending entry; replacing it would strand that wait.
          if (!threadClosings.has(nativeThreadId)) {
            threadClosings.set(nativeThreadId, yield* Deferred.make<void>());
          }
          yield* client.request("thread/unsubscribe", { threadId: nativeThreadId });
        }
        // No turn/completed arrives for an unloaded thread, so a Stop Codex never
        // confirmed would otherwise keep its turn open for the life of the session.
        const interrupting = yield* Ref.get(interruptingNativeTurns);
        const completedAt = yield* DateTime.now;
        for (const context of (yield* Ref.get(activeTurns)).values()) {
          if (
            context.providerThread.id !== unloadInput.providerThread.id ||
            !interrupting.has(context.nativeTurnId)
          )
            continue;
          yield* finalizeCodexTurn({
            context,
            nativeTurnId: context.nativeTurnId,
            status: "interrupted",
            completedAt,
          });
        }
      },
      (effect, unloadInput) =>
        effect.pipe(
          Effect.mapError((cause) =>
            cause._tag === "ProviderAdapterProtocolError"
              ? cause
              : new ProviderAdapter.ProviderAdapterProtocolError({
                  driver: CODEX_PROVIDER,
                  detail: `Failed to unload Codex thread for provider thread ${unloadInput.providerThread.id}`,
                  cause,
                }),
          ),
        ),
    ),
    interruptTurn: Effect.fn("CodexAdapterV2.interruptTurn")(
      function* (requestedInput) {
        const nativeThreadId = requestedInput.providerThread.nativeThreadRef?.nativeId;
        const capacityRetry =
          nativeThreadId == null ? undefined : capacityContinuations.get(nativeThreadId)?.context;
        const startingRetry =
          capacityRetry?.providerTurnId === latestRunTurnId(requestedInput.providerTurnId)
            ? capacityRetry
            : undefined;
        if (startingRetry?.capacityRetryPending !== undefined) {
          const started = yield* Deferred.await(startingRetry.capacityRetryPending).pipe(
            Effect.timeoutOption("10 seconds"),
          );
          if (Option.isNone(started))
            return yield* toProtocolError(
              "Codex did not start the capacity retry within 10 seconds; Stop could not be delivered.",
            );
        }
        const { turnInput, goalTurns } = yield* resolveGoalStopTarget(requestedInput);
        const [activeTurnContexts, settledTurnContexts] =
          yield* turnTerminalizationPermit.withPermits(1)(
            Effect.gen(function* () {
              return [
                Array.from((yield* Ref.get(activeTurns)).values()),
                Array.from((yield* Ref.get(settledTurns)).values()),
              ] as const;
            }),
          );
        const activeTurn =
          activeTurnContexts.find(
            (candidate) => candidate.providerTurnId === turnInput.providerTurnId,
          ) ??
          (turnInput.requestRuntimeRestart === true
            ? settledTurnContexts.find(
                (candidate) => candidate.providerThread.id === turnInput.providerThread.id,
              )
            : undefined);
        const lineageRoots = Array.from(
          new Set([
            ...(activeTurn === undefined ? [] : [activeTurn]),
            ...(startingRetry === undefined ? [] : [startingRetry]),
            ...goalTurns,
          ]),
        );
        const inLineage = (context: ActiveCodexTurnContext) =>
          lineageRoots.some((root) => context === root || isDescendantCodexTurn(context, root));
        const interruptTargetContexts = [
          ...(activeTurn === undefined ? [] : [activeTurn]),
          ...activeTurnContexts.filter(
            (candidate) => candidate !== activeTurn && inLineage(candidate),
          ),
          ...settledTurnContexts.filter(
            (candidate) =>
              candidate !== activeTurn &&
              ((turnInput.requestRuntimeRestart === true &&
                candidate.providerThread.id === turnInput.providerThread.id) ||
                inLineage(candidate)),
          ),
        ];
        if (interruptTargetContexts.length === 0) {
          if (turnInput.requestRuntimeRestart === true) return;
          return yield* toProtocolError(
            `Provider turn ${turnInput.providerTurnId} is not active and cannot be interrupted.`,
          );
        }
        const interruptTargets: Array<{
          readonly context: ActiveCodexTurnContext;
          readonly completion: Deferred.Deferred<void, never>;
        }> = [];
        const trackedInterruptNativeTurnIds = new Set<string>();
        let joinedPendingStop = false;
        // Untraced: runs once per lineage turn inside the interruptTurn span.
        const trackInterruptTarget = Effect.fnUntraced(function* (context: ActiveCodexTurnContext) {
          const fresh = yield* Deferred.make<void>();
          // An earlier Stop may still wait on this turn; replacing its waiter would strand it.
          const completion = yield* Ref.modify(turnWaiters, (current) => {
            const pending = current.get(context.nativeTurnId);
            return pending === undefined
              ? [fresh, new Map(current).set(context.nativeTurnId, fresh)]
              : [pending, current];
          });
          joinedPendingStop ||= completion !== fresh;
          yield* Ref.update(interruptingNativeTurns, (current) =>
            new Set(current).add(context.nativeTurnId),
          );
          interruptTargets.push({ context, completion });
          trackedInterruptNativeTurnIds.add(context.nativeTurnId);
        });
        for (const context of interruptTargetContexts) {
          yield* trackInterruptTarget(context);
        }
        const registeredActiveTurns = yield* Ref.get(activeTurns);
        for (const target of interruptTargets) {
          if (registeredActiveTurns.get(target.context.nativeTurnId) !== target.context) {
            yield* Deferred.succeed(target.completion, undefined);
          }
        }

        const cleanupInterruptState = Effect.gen(function* () {
          yield* Ref.update(turnWaiters, (current) => {
            const updated = new Map(current);
            for (const target of interruptTargets) {
              updated.delete(target.context.nativeTurnId);
            }
            return updated;
          });
          yield* Ref.update(interruptingNativeTurns, (current) => {
            const updated = new Set(current);
            for (const target of interruptTargets) {
              updated.delete(target.context.nativeTurnId);
            }
            return updated;
          });
          yield* Ref.update(runningCommandItemsByTurn, (current) => {
            const updated = new Map(current);
            for (const target of interruptTargets) {
              if (settledTurnContexts.includes(target.context)) continue;
              updated.delete(target.context.nativeTurnId);
            }
            return updated;
          });
        });

        const finalizeRemainingInterruptLineage = Effect.gen(function* () {
          while (true) {
            const newlyDiscovered: Array<ActiveCodexTurnContext> = [];
            const activeLineage = yield* turnTerminalizationPermit.withPermits(1)(
              Effect.gen(function* () {
                const lineage = Array.from((yield* Ref.get(activeTurns)).values()).filter(
                  inLineage,
                );
                for (const context of lineage) {
                  if (trackedInterruptNativeTurnIds.has(context.nativeTurnId)) {
                    continue;
                  }
                  yield* trackInterruptTarget(context);
                  newlyDiscovered.push(context);
                }
                return lineage;
              }),
            );
            if (activeLineage.length === 0) {
              return;
            }
            if (newlyDiscovered.length > 0) {
              const completed = yield* Effect.forEach(
                newlyDiscovered,
                (context) =>
                  Effect.flatMap(getNativeThreadId(context.providerThread), (threadId) =>
                    client.request("turn/interrupt", {
                      threadId,
                      turnId: context.nativeTurnId,
                    }),
                  ).pipe(
                    Effect.catch((cause) =>
                      Effect.logWarning(
                        "orchestration-v2.codex-remaining-lineage-interrupt-failed",
                        {
                          nativeTurnId: context.nativeTurnId,
                          providerSessionId: input.providerSessionId,
                          cause,
                        },
                      ),
                    ),
                  ),
                { concurrency: "unbounded", discard: true },
              ).pipe(Effect.timeoutOption("10 seconds"));
              if (Option.isNone(completed)) {
                yield* Effect.logWarning(
                  "orchestration-v2.codex-remaining-lineage-interrupt-timeout",
                  {
                    nativeTurnIds: newlyDiscovered.map((context) => context.nativeTurnId),
                    providerSessionId: input.providerSessionId,
                  },
                );
              }
            }
            const completedAt = yield* DateTime.now;
            for (const context of activeLineage) {
              yield* finalizeCodexTurn({
                context,
                nativeTurnId: context.nativeTurnId,
                status: "interrupted",
                completedAt,
              });
            }
          }
        });

        const interruptLateDescendants = Effect.gen(function* () {
          const activeLineage = yield* turnTerminalizationPermit.withPermits(1)(
            Effect.gen(function* () {
              const lineage = Array.from((yield* Ref.get(activeTurns)).values()).filter(
                (context) =>
                  !lineageRoots.includes(context) &&
                  inLineage(context) &&
                  !trackedInterruptNativeTurnIds.has(context.nativeTurnId),
              );
              for (const context of lineage) {
                yield* trackInterruptTarget(context);
              }
              return lineage;
            }),
          );
          const completed = yield* Effect.forEach(
            activeLineage,
            (context) =>
              Effect.flatMap(getNativeThreadId(context.providerThread), (threadId) =>
                client.request("turn/interrupt", {
                  threadId,
                  turnId: context.nativeTurnId,
                }),
              ),
            { concurrency: "unbounded", discard: true },
          ).pipe(Effect.timeoutOption("10 seconds"));
          if (Option.isNone(completed)) {
            yield* Effect.logWarning("orchestration-v2.codex-late-descendant-interrupt-timeout", {
              nativeTurnIds: activeLineage.map((context) => context.nativeTurnId),
              providerSessionId: input.providerSessionId,
            });
          }
        });

        const containedTerminalKeys = new Set<string>();
        const attemptedTerminalKeys = new Set<string>();
        const collectTrackedTerminals = Effect.fn("CodexAdapterV2.collectTrackedTerminals")(
          function* (targets: typeof interruptTargets) {
            const trackedTerminals = new Map<
              string,
              { readonly nativeThreadId: string; readonly processId: string }
            >();
            const runningItems = yield* Ref.get(runningCommandItemsByTurn);
            for (const target of targets) {
              const nativeThreadId = yield* getNativeThreadId(target.context.providerThread);
              const items = runningItems.get(target.context.nativeTurnId);
              for (const item of items?.values() ?? []) {
                if (item.processId !== undefined) {
                  trackedTerminals.set(`${nativeThreadId}:${item.processId}`, {
                    nativeThreadId,
                    processId: item.processId,
                  });
                }
              }
            }
            return trackedTerminals;
          },
        );
        const terminateTrackedTerminals = Effect.fn("CodexAdapterV2.terminateTrackedTerminals")(
          function* (targets: typeof interruptTargets) {
            const trackedTerminals = yield* collectTrackedTerminals(targets);
            const pendingTerminals = Array.from(trackedTerminals.entries())
              .filter(([key]) => !containedTerminalKeys.has(key))
              .sort(
                ([leftKey], [rightKey]) =>
                  Number(attemptedTerminalKeys.has(leftKey)) -
                  Number(attemptedTerminalKeys.has(rightKey)),
              );
            return yield* Effect.forEach(pendingTerminals, ([key, { nativeThreadId, processId }]) =>
              Effect.gen(function* () {
                attemptedTerminalKeys.add(key);
                yield* terminateBackgroundTerminal(nativeThreadId, processId);
                containedTerminalKeys.add(key);
              }).pipe(
                Effect.as({ success: true as const }),
                Effect.catch((error) => Effect.succeed({ success: false as const, error })),
              ),
            );
          },
        );
        const settleInterruptedLineage = Effect.gen(function* () {
          yield* interruptLateDescendants;
          yield* finalizeRemainingInterruptLineage;

          const terminationResults = yield* terminateTrackedTerminals(interruptTargets);
          const failedTermination = terminationResults.find((result) => !result.success);
          if (failedTermination !== undefined && !failedTermination.success) {
            return yield* failedTermination.error;
          }
          yield* turnTerminalizationPermit.withPermits(1)(
            Effect.gen(function* () {
              const completedAt = yield* DateTime.now;
              for (const target of interruptTargets) {
                const context = target.context;
                if ((yield* Ref.get(settledTurns)).get(context.nativeTurnId) !== context) continue;
                yield* terminalizeRunningCommandItems(
                  context,
                  context.nativeTurnId,
                  "interrupted",
                  completedAt,
                );
                yield* terminalizeRunningDynamicTools(
                  context,
                  context.nativeTurnId,
                  "interrupted",
                  completedAt,
                  true,
                );
                yield* terminalizeMcpAppCaptures(context, context.nativeTurnId);
                yield* Ref.update(runningCommandItemsByTurn, (current) => {
                  const updated = new Map(current);
                  updated.delete(context.nativeTurnId);
                  return updated;
                });
                yield* clearImageWork(context);
                yield* releaseSettledTurnIfIdle(context.nativeTurnId);
              }
            }),
          );
        });
        // Codex may still be working, so a root stays open and marked interrupting.
        // Whatever ends it later (Codex, Force stop) settles the rest of this Stop.
        const deferToActiveRoots = Effect.gen(function* () {
          const registered = yield* Ref.get(activeTurns);
          const roots = interruptTargets.filter(
            ({ context }) =>
              lineageRoots.includes(context) && registered.get(context.nativeTurnId) === context,
          );
          if (roots.length === 0) return false;
          for (const { context } of roots) {
            yield* Effect.logWarning("orchestration-v2.codex-interrupt-timeout", {
              providerSessionId: input.providerSessionId,
              providerThreadId: context.providerThread.id,
              providerTurnId: context.providerTurnId,
              nativeTurnId: context.nativeTurnId,
            });
          }
          yield* Effect.forEach(roots, (target) => Deferred.await(target.completion), {
            concurrency: "unbounded",
            discard: true,
          }).pipe(
            Effect.andThen(settleInterruptedLineage),
            Effect.catchCause((cause) =>
              Cause.hasInterruptsOnly(cause)
                ? Effect.void
                : Effect.logWarning("orchestration-v2.codex-late-stop-settle-failed", {
                    providerSessionId: input.providerSessionId,
                    cause,
                  }),
            ),
            Effect.ensuring(cleanupInterruptState),
            Effect.forkIn(scope),
          );
          return true;
        });

        const unconfirmed = yield* Effect.gen(function* () {
          for (const target of interruptTargets) {
            const context = target.context;
            if (context.capacityRetryPending !== undefined) {
              yield* finalizeCodexTurn({
                context,
                nativeTurnId: context.nativeTurnId,
                status: "interrupted",
                completedAt: yield* DateTime.now,
              });
              continue;
            }
            // Null start timestamps ACK queued turns; interruption must wait for turn/started.
            if (context.nativeStartReady !== undefined) {
              const ready = yield* Deferred.await(context.nativeStartReady).pipe(
                Effect.timeoutOption("10 seconds"),
              );
              if (Option.isNone(ready)) {
                return yield* toProtocolError(
                  "Codex did not start the queued turn within 10 seconds; Stop could not be delivered.",
                );
              }
            }
            if ((yield* Ref.get(activeTurns)).get(context.nativeTurnId) !== context) {
              continue;
            }
            yield* client.request("turn/interrupt", {
              threadId: yield* getNativeThreadId(context.providerThread),
              turnId: context.nativeTurnId,
            });
          }
          const [, completed] = yield* Effect.all(
            [
              terminateTrackedTerminals(interruptTargets),
              Effect.forEach(interruptTargets, (target) => Deferred.await(target.completion), {
                concurrency: "unbounded",
                discard: true,
              }).pipe(Effect.timeoutOption(CODEX_STOP_CONFIRM_TIMEOUT_MS)),
            ],
            { concurrency: "unbounded" },
          );
          if (Option.isSome(completed) || !(yield* deferToActiveRoots)) {
            yield* settleInterruptedLineage;
            return false;
          }
          return true;
        }).pipe(
          Effect.onExit((exit) => {
            if (Exit.isSuccess(exit)) return exit.value ? Effect.void : cleanupInterruptState;
            const abandon = finalizeRemainingInterruptLineage.pipe(
              Effect.ensuring(cleanupInterruptState),
            );
            // Neither a caller's deadline nor a failed retry of a pending Stop confirms
            // that the turn ended.
            return Cause.hasInterruptsOnly(exit.cause) || joinedPendingStop
              ? Effect.flatMap(deferToActiveRoots, (deferred) => (deferred ? Effect.void : abandon))
              : abandon;
          }),
        );
        if (unconfirmed) {
          return yield* new ProviderAdapter.ProviderAdapterInterruptTimeoutError({
            driver: CODEX_PROVIDER,
            providerThreadId: turnInput.providerThread.id,
            providerTurnId: turnInput.providerTurnId,
            timeoutMs: CODEX_STOP_CONFIRM_TIMEOUT_MS,
          });
        }
      },
      (effect, requestedInput) =>
        Effect.acquireUseRelease(
          Effect.sync(() => {
            const nativeThreadId = requestedInput.providerThread.nativeThreadRef?.nativeId;
            if (nativeThreadId != null)
              goalStops.set(nativeThreadId, (goalStops.get(nativeThreadId) ?? 0) + 1);
            return nativeThreadId;
          }),
          () => effect,
          (nativeThreadId) =>
            Effect.sync(() => {
              if (nativeThreadId == null) return;
              const stops = (goalStops.get(nativeThreadId) ?? 1) - 1;
              if (stops > 0) goalStops.set(nativeThreadId, stops);
              else goalStops.delete(nativeThreadId);
            }),
        ).pipe(
          Effect.mapError((cause) =>
            cause._tag === "ProviderAdapterInterruptTimeoutError"
              ? cause
              : new ProviderAdapter.ProviderAdapterInterruptError({
                  driver: CODEX_PROVIDER,
                  providerThreadId: requestedInput.providerThread.id,
                  providerTurnId: requestedInput.providerTurnId,
                  cause,
                }),
          ),
        ),
    ),
    respondToRuntimeRequest: Effect.fn("CodexAdapterV2.respondToRuntimeRequest")(
      function* (requestInput) {
        const pending = (yield* Ref.get(pendingRuntimeRequests)).get(
          String(requestInput.requestId),
        );
        if (pending === undefined) {
          return yield* new ProviderAdapter.ProviderAdapterRuntimeRequestResponseError({
            driver: CODEX_PROVIDER,
            requestId: requestInput.requestId,
            cause: toProtocolError(`No pending Codex runtime request ${requestInput.requestId}.`),
          });
        }
        if (pending.type === "user_input") {
          if (requestInput.answers === undefined) {
            return yield* new ProviderAdapter.ProviderAdapterRuntimeRequestResponseError({
              driver: CODEX_PROVIDER,
              requestId: requestInput.requestId,
              cause: toProtocolError(
                `Codex user input request ${requestInput.requestId} requires answers.`,
              ),
            });
          }
          yield* Deferred.succeed(pending.answers, requestInput.answers);
          return;
        }
        if (requestInput.decision === undefined) {
          return yield* new ProviderAdapter.ProviderAdapterRuntimeRequestResponseError({
            driver: CODEX_PROVIDER,
            requestId: requestInput.requestId,
            cause: toProtocolError(
              `Codex ${pending.requestKind} request ${requestInput.requestId} requires an approval decision.`,
            ),
          });
        }
        yield* Deferred.succeed(pending.decision, requestInput.decision);
      },
      (effect, requestInput) =>
        effect.pipe(
          Effect.mapError((cause) =>
            isProviderAdapterRuntimeRequestResponseError(cause)
              ? cause
              : new ProviderAdapter.ProviderAdapterRuntimeRequestResponseError({
                  driver: CODEX_PROVIDER,
                  requestId: requestInput.requestId,
                  cause,
                }),
          ),
        ),
    ),
    uploadFeedback: Effect.fn("CodexAdapterV2.uploadFeedback")(
      function* (feedbackInput) {
        const threadId = yield* getNativeThreadId(feedbackInput.providerThread);
        const response = yield* ensureInitialized.pipe(
          Effect.andThen(
            client.request("feedback/upload", {
              classification: "bug",
              includeLogs: true,
              ...(feedbackInput.reason ? { reason: feedbackInput.reason } : {}),
              threadId,
            }),
          ),
        );
        return { feedbackId: response.threadId };
      },
      Effect.mapError(
        (cause) =>
          new ProviderAdapter.ProviderAdapterProtocolError({
            driver: CODEX_PROVIDER,
            detail: "Failed to upload Codex thread feedback.",
            payload: cause,
          }),
      ),
    ),
    mcpApps,
    mcpSignIn: {
      start: Effect.fn("CodexAdapterV2.mcpSignIn.start")(
        function* ({ providerThread, server }) {
          const threadId = yield* getNativeThreadId(providerThread);
          // A notice can outlive its problem, as when another client signed the server in.
          const status = yield* ensureInitialized.pipe(
            Effect.andThen(
              withLoadedThread(
                providerThread,
                threadId,
                client.request("mcpServerStatus/list", {
                  serverName: server,
                  threadId,
                  detail: "toolsAndAuthOnly",
                }),
              ),
            ),
            Effect.orElseSucceed(() => ({ data: [] })),
          );
          if (status.data.some((entry) => entry.runtimeStatus === "connected")) {
            return { authorizationUrl: null };
          }
          // With the thread, Codex reconnects the server there once the sign-in succeeds.
          const { authorizationUrl } = yield* ensureInitialized.pipe(
            Effect.andThen(
              withLoadedThread(
                providerThread,
                threadId,
                client.request("mcpServer/oauth/login", { name: server, threadId }),
              ),
            ),
          );
          const params = yield* Effect.try({
            try: () => new URL(authorizationUrl).searchParams,
            catch: () =>
              new ProviderMcpSignInError({
                server,
                detail: `Codex returned a sign-in page for ${server} that T3 Code can't open.`,
              }),
          });
          const redirectUri = params.get("redirect_uri");
          const state = params.get("state");
          if (redirectUri !== null && state !== null) {
            mcpSignIns.set(server, {
              redirectUri,
              state,
              succeeded: yield* Deferred.make<boolean>(),
            });
          }
          return { authorizationUrl };
        },
        Effect.mapError((cause) =>
          isProviderMcpSignInError(cause)
            ? cause
            : new ProviderAdapter.ProviderAdapterProtocolError({
                driver: CODEX_PROVIDER,
                detail: "Failed to start a Codex MCP sign-in.",
                payload: cause,
              }),
        ),
      ),
      complete: Effect.fn("CodexAdapterV2.mcpSignIn.complete")(function* ({ server, callbackUrl }) {
        const fail = (detail: string) => new ProviderMcpSignInError({ server, detail });
        const signIn = mcpSignIns.get(server);
        if (signIn === undefined) return yield* fail(`Start the sign-in to ${server} again.`);
        // A browser on this machine may already have opened Codex's callback page.
        let delivered = true;
        if (!(yield* Deferred.isDone(signIn.succeeded))) {
          const callback = yield* Effect.try({
            try: () => oauthCallbackUrl(callbackUrl, signIn.redirectUri, signIn.state),
            catch: () =>
              fail(
                "That address isn't from this sign-in. Paste the address your browser went to after you approved.",
              ),
          });
          if (!LOOPBACK_HOSTNAMES.has(callback.hostname)) {
            return yield* fail(
              `Codex takes this sign-in at ${callback.host}. Finish it in a browser that can reach that address.`,
            );
          }
          // Codex listens on the machine it runs on, which may not be the browser's. Its
          // listener closes once a browser reached it, so a refused request can still win.
          delivered = yield* HttpClient.get(callback).pipe(
            Effect.provide(FetchHttpClient.layer),
            Effect.provideService(FetchHttpClient.RequestInit, { redirect: "manual" }),
            Effect.provideService(HttpClient.TracerPropagationEnabled, false),
            Effect.timeout("10 seconds"),
            Effect.as(true),
            Effect.orElseSucceed(() => false),
          );
        }
        const succeeded = yield* Deferred.await(signIn.succeeded).pipe(
          Effect.timeoutOrElse({
            duration: delivered ? "30 seconds" : "2 seconds",
            orElse: () =>
              Effect.fail(
                fail(
                  delivered
                    ? `Codex didn't finish the sign-in to ${server}. Start again.`
                    : `Codex didn't take the sign-in to ${server}. Start again.`,
                ),
              ),
          }),
        );
        // A newer start may have replaced this sign-in while it finished.
        if (mcpSignIns.get(server) === signIn) mcpSignIns.delete(server);
        if (!succeeded) {
          return yield* fail(`${server} didn't accept the sign-in. Start again.`);
        }
      }),
    },
    readThreadSnapshot: Effect.fn("CodexAdapterV2.readThreadSnapshot")(
      function* (threadInput) {
        const threadId = yield* getNativeThreadId(threadInput.providerThread);
        const response = yield* ensureInitialized.pipe(
          Effect.andThen(client.request("thread/read", { threadId, includeTurns: true })),
        );
        return {
          providerThread: {
            ...threadInput.providerThread,
            nativeThreadRef: {
              driver: CODEX_PROVIDER,
              nativeId: response.thread.id,
              strength: "strong" as const,
            },
            nativeConversationHeadRef: threadInput.providerThread.nativeConversationHeadRef,
            updatedAt: codexTimestamp(response.thread.updatedAt),
          },
          messages: [],
          runtimeRequests: [],
          providerPayload: response.thread,
        };
      },
      (effect, threadInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterReadThreadSnapshotError({
                driver: CODEX_PROVIDER,
                providerThreadId: threadInput.providerThread.id,
                cause,
              }),
          ),
        ),
    ),
    rollbackThread: Effect.fn("CodexAdapterV2.rollbackThread")(
      function* (threadInput) {
        const threadId = yield* getNativeThreadId(threadInput.providerThread);
        const numTurns = yield* resolveCodexRollbackTurnCount(threadInput);
        const nativeConversationHeadRef =
          threadInput.target.type === "provider_turn"
            ? threadInput.target.providerTurn.nativeTurnRef
            : null;
        if (numTurns === 0) {
          return {
            providerThread: {
              ...threadInput.providerThread,
              nativeConversationHeadRef,
              status: "idle" as const,
            },
            messages: [],
            runtimeRequests: [],
          };
        }
        const { historyMode, loaded } = yield* ensureInitialized.pipe(
          Effect.andThen(readCodexThreadHistoryMetadata(client.raw, threadId)),
        );
        if (historyMode !== "paginated") {
          return yield* new ProviderAdapter.ProviderAdapterRollbackThreadError({
            driver: CODEX_PROVIDER,
            providerThreadId: threadInput.providerThread.id,
            cause: `Cannot roll back Codex thread ${threadId}: the thread uses legacy history, which Codex 0.156 cannot revert.`,
          });
        }
        // thread/revert requires the thread loaded in this app-server; resume after restart or idle release.
        // Like withLoadedThread, resume with the thread's saved model and cwd, not the session's.
        if (!loaded) {
          yield* resumeNativeThread(threadId, {
            excludeTurns: true,
            ...codexThreadRuntimeParams({
              threadId: threadInput.providerThread.appThreadId,
              mcpSession: yield* readMcpSession(threadInput.providerThread.appThreadId),
              stdioMcpServers: yield* readStdioMcpServers(undefined),
            }),
          });
        }
        const response = yield* ensureInitialized.pipe(
          Effect.andThen(revertCodexThread(client, threadId, numTurns)),
        );
        turnTokenUsageByThread.delete(threadId);
        return {
          providerThread: {
            ...threadInput.providerThread,
            nativeThreadRef: {
              driver: CODEX_PROVIDER,
              nativeId: response.thread.id,
              strength: "strong" as const,
            },
            nativeConversationHeadRef,
            status: "idle" as const,
            updatedAt: codexTimestamp(response.thread.updatedAt),
          },
          messages: [],
          runtimeRequests: [],
          providerPayload: response.thread,
        };
      },
      (effect, threadInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterRollbackThreadError({
                driver: CODEX_PROVIDER,
                providerThreadId: threadInput.providerThread.id,
                cause,
              }),
          ),
        ),
    ),
    forkThread: Effect.fn("CodexAdapterV2.forkThread")(
      function* (threadInput) {
        const threadId = yield* getNativeThreadId(threadInput.sourceProviderThread);
        const boundary = yield* resolveCodexForkBoundary(threadInput);
        const fork = client.request("thread/fork", {
          threadId,
          excludeTurns: true,
          ...(boundary.lastTurnId === undefined ? {} : { lastTurnId: boundary.lastTurnId }),
          ...codexThreadRuntimeParams({
            threadId: threadInput.targetThreadId,
            mcpSession: yield* mcpSessions.read(threadInput.targetThreadId),
            stdioMcpServers: yield* readStdioMcpServers(threadInput.runtimePolicy?.cwd),
            ...(threadInput.modelSelection === undefined
              ? {}
              : { modelSelection: threadInput.modelSelection }),
            ...(threadInput.runtimePolicy === undefined
              ? {}
              : { runtimePolicy: threadInput.runtimePolicy }),
          }),
        });
        const response = yield* ensureInitialized.pipe(
          Effect.andThen(
            fork.pipe(
              Effect.catchTags({
                CodexAppServerRequestError: (cause) =>
                  /\bsession \S+ is archived\b|\bcodex unarchive\b/i.test(cause.errorMessage)
                    ? client.raw
                        .request("thread/unarchive", { threadId })
                        .pipe(Effect.andThen(fork))
                    : Effect.fail(cause),
              }),
            ),
          ),
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterForkThreadError({
                driver: CODEX_PROVIDER,
                providerThreadId: threadInput.sourceProviderThread.id,
                cause,
              }),
          ),
        );
        let forkedThread = response.thread;
        if (boundary.rollbackTurnCount > 0) {
          const { historyMode } = yield* ensureInitialized.pipe(
            Effect.andThen(readCodexThreadHistoryMetadata(client.raw, response.thread.id)),
          );
          if (historyMode !== "paginated") {
            return yield* new ProviderAdapter.ProviderAdapterForkThreadError({
              driver: CODEX_PROVIDER,
              providerThreadId: threadInput.sourceProviderThread.id,
              cause: `Cannot fork Codex thread ${threadId} at provider turn ${threadInput.providerTurnId}: the source turn has no native Codex turn reference, and the forked thread uses legacy history which Codex 0.156 cannot revert.`,
            });
          }
          forkedThread = (yield* ensureInitialized.pipe(
            Effect.andThen(
              revertCodexThread(client, response.thread.id, boundary.rollbackTurnCount),
            ),
            Effect.mapError(
              (cause) =>
                new ProviderAdapter.ProviderAdapterForkThreadError({
                  driver: CODEX_PROVIDER,
                  providerThreadId: threadInput.sourceProviderThread.id,
                  cause,
                }),
            ),
          )).thread;
        }
        return providerThreadFromCodexThread({
          appThreadId: threadInput.targetThreadId,
          idAllocator,
          ownerNodeId: threadInput.ownerNodeId ?? null,
          providerSessionId: input.providerSessionId,
          providerInstanceId: adapterOptions.instanceId,
          thread: forkedThread,
          forkedFrom: {
            providerThreadId: threadInput.sourceProviderThread.id,
            ...(threadInput.providerTurnId === undefined
              ? {}
              : { providerTurnId: threadInput.providerTurnId }),
          },
        });
      },
      (effect, threadInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterForkThreadError({
                driver: CODEX_PROVIDER,
                providerThreadId: threadInput.sourceProviderThread.id,
                cause,
              }),
          ),
        ),
    ),
  };
};
