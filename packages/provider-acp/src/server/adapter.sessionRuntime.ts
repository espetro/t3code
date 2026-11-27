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
  ACP_PROTOCOL,
  ACP_STOP_CONFIRM_TIMEOUT_MS,
  STEER_DELIVERY_BOUND,
  acpMcpActivation,
  emptySnapshotState,
  forkFromTurnMetaFor,
  formatAcpAppContextEntry,
  makeProviderThread,
  mergeAcpAppContext,
  nativeThreadId,
  toolStatus,
  unsentAcpAppContext,
} from "./adapter.helpers.ts";

export const bindSessionRuntime = (ctx: any): any => {
  const {
    activateSession,
    activeInteractionMode,
    activeSelection,
    activeSessionId,
    activeSessionSetup,
    activeTurn,
    advanceRuntimeCallbackGeneration,
    agentRequests,
    awaitAdmittedNativeResponses,
    awaitNativeResponseAcknowledgements,
    awaitRuntimeTeardown,
    canLoadSession,
    canReportBackgroundWork,
    canResumeSession,
    cancelPendingRuntimeRequests,
    capabilities,
    carryoverSubagents,
    commitAcpAppContext,
    commitReplacementSession,
    compactionMarkers,
    compactsContext,
    configureSession,
    contextUsageBySessionId,
    defersFinalizeForBackgroundWork,
    deliveredAppContext,
    driver,
    events,
    finalizeTurn,
    flavor,
    followsAgentWorkState,
    host,
    idAllocator,
    imageAttachmentBlocks,
    input,
    loadingSessionId,
    nativeChildren,
    options,
    pendingRuntimeRequests,
    prepareTerminalEnvironment,
    promptStillRunsAfterHold,
    providerThreadByNativeSessionId,
    quarantineNativeTransportAtGeneration,
    quarantineStoppedRun,
    readMcpContext,
    rememberTerminalEnvironment,
    restartRuntimeAfterTeardownIfRequired,
    runtime,
    runtimeCallbackGeneration,
    runtimeCallbackPermit,
    runtimeRestartRequired,
    runtimeTeardownState,
    runtimeTransitionPermit,
    sessionHasPendingBackgroundWork,
    sessionRuntime,
    sessionScope,
    setActiveSessionSetup,
    snapshot,
    startReplacementAcpRuntime,
    startTurn,
    steerInjection,
    steerInjections,
    steerWithPrompt,
    steersWithPrompt,
    stoppedRunQuarantine,
    terminalizeCarryoverSubagents,
    trailingTranscriptDrains,
    useProviderThreadIdentity,
    withModelContextWindow,
  } = pickBindCtx(ctx);
  return {
    instanceId: options.instanceId,
    driver,
    providerSessionId: input.providerSessionId,
    get providerSession() {
      return ctx.providerSession;
    },
    canResumeAfterRestart: canLoadSession || canResumeSession,
    events: Stream.fromEffectRepeat(Queue.take(events)),
    ...(flavor.getModelContextWindow === undefined
      ? {}
      : {
          getModelContextWindow: (selection) => {
            const session = Ref.getUnsafe(activeSessionSetup);
            return session === null
              ? undefined
              : flavor.getModelContextWindow?.(selection, session);
          },
        }),
    ...(canReportBackgroundWork
      ? { hasPendingBackgroundWork: sessionHasPendingBackgroundWork }
      : {}),
    // Root-subscription probe: only T3's own trailing transcript reads. Replacement checks
    // (includeSubagents) keep the session-wide answer they used before this probe existed.
    hasPendingBackgroundWorkForThread: (providerThread, options) =>
      options?.includeSubagents === true
        ? canReportBackgroundWork
          ? sessionHasPendingBackgroundWork
          : Effect.succeed(false)
        : Effect.sync(() =>
            [...trailingTranscriptDrains].some(
              (subagent) => subagent.rootSessionId === providerThread.nativeThreadRef?.nativeId,
            ),
          ),
    ensureThread: Effect.fn("AcpAdapterV2.ensureThread")(
      function* (threadInput: ProviderAdapter.ProviderAdapterV2EnsureThreadInput) {
        return yield* runtimeTransitionPermit.withPermit(
          Effect.gen(function* () {
            if (threadInput.forceNewNativeThread) {
              const currentTurn = yield* Ref.get(activeTurn);
              const pendingWork = yield* (
                sessionRuntime.hasPendingBackgroundWork ?? Effect.succeed(false)
              );
              if (currentTurn !== null || pendingWork)
                return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                  driver,
                  detail: "Cannot replace ACP session while a turn or background work is active",
                });
              yield* awaitRuntimeTeardown();
              const previousItemIdentityVersion = ctx.itemIdentityVersion;
              ctx.itemIdentityVersion = 2;
              prepareTerminalEnvironment(yield* readMcpContext(threadInput.threadId));
              yield* startReplacementAcpRuntime(threadInput.threadId, (candidate) =>
                commitReplacementSession(threadInput.threadId, candidate),
              ).pipe(
                Effect.tapError(() =>
                  Effect.sync(() => {
                    ctx.itemIdentityVersion = previousItemIdentityVersion;
                  }),
                ),
              );
            }
            const now = yield* DateTime.now;
            const sessionId = yield* Ref.get(activeSessionId);
            if (sessionId === null) {
              return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                driver,
                detail: "ACP runtime did not produce a session id",
              });
            }
            const created = makeProviderThread({
              driver,
              providerInstanceId: options.instanceId,
              idAllocator,
              appThreadId: threadInput.threadId,
              providerSessionId: input.providerSessionId,
              nativeThreadId: sessionId,
              ...(ctx.itemIdentityVersion === undefined
                ? {}
                : { itemIdentityVersion: ctx.itemIdentityVersion }),
              now,
            });
            const replayedUsage = (yield* Ref.get(contextUsageBySessionId)).get(sessionId);
            const contextUsage =
              replayedUsage === undefined
                ? null
                : yield* withModelContextWindow(sessionId, replayedUsage);
            if (contextUsage !== null) {
              yield* Ref.update(contextUsageBySessionId, (current) =>
                new Map(current).set(sessionId, contextUsage),
              );
            }
            const providerThread =
              threadInput.forceNewNativeThread && threadInput.existingProviderThread
                ? { ...created, id: threadInput.existingProviderThread.id }
                : { ...created, contextUsage };
            yield* Ref.update(providerThreadByNativeSessionId, (current) =>
              new Map(current).set(sessionId, providerThread),
            );
            return providerThread;
          }),
        );
      },
      (effect, threadInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterEnsureThreadError({
                driver,
                threadId: threadInput.threadId,
                cause,
              }),
          ),
        ),
    ),
    resumeThread: Effect.fn("AcpAdapterV2.resumeThread")(
      function* (threadInput: {
        readonly providerThread: OrchestrationV2ProviderThread;
        readonly modelSelection?: ModelSelection;
        readonly runtimePolicy?: ProviderAdapter.ProviderAdapterV2RuntimePolicy;
      }) {
        if (threadInput.providerThread.status === "error") {
          // A broken turn left this native history unusable; the caller recovers in a fresh session.
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver,
            detail: "The native session history is unusable.",
          });
        }
        return yield* runtimeTransitionPermit.withPermit(
          Effect.gen(function* () {
            yield* awaitRuntimeTeardown();
            const sessionId = yield* nativeThreadId(driver, threadInput.providerThread);
            const previousItemIdentityVersion = ctx.itemIdentityVersion;
            useProviderThreadIdentity(threadInput.providerThread);
            const restorePreviousItemIdentity = Effect.sync(() => {
              ctx.itemIdentityVersion = previousItemIdentityVersion;
            });
            const restartAfterInterrupt = yield* restartRuntimeAfterTeardownIfRequired(
              threadInput.providerThread.appThreadId,
            ).pipe(Effect.tapError(() => restorePreviousItemIdentity));
            if ((yield* Ref.get(activeSessionId)) !== sessionId || restartAfterInterrupt) {
              yield* Ref.set(snapshot, emptySnapshotState());
              const activated = yield* activateSession(
                sessionId,
                threadInput.providerThread.appThreadId,
              ).pipe(Effect.tapError(() => restorePreviousItemIdentity));
              yield* Ref.set(activeSessionId, activated.sessionId);
              yield* Ref.set(loadingSessionId, null);
              yield* setActiveSessionSetup(activated);
              const nextSelection = threadInput.modelSelection ?? input.modelSelection;
              const nextRuntimePolicy = threadInput.runtimePolicy ?? input.runtimePolicy;
              yield* configureSession(activated, nextSelection, nextRuntimePolicy);
              yield* Ref.set(activeSelection, nextSelection);
              yield* Ref.set(activeInteractionMode, nextRuntimePolicy.interactionMode);
            }
            const now = yield* DateTime.now;
            return {
              ...threadInput.providerThread,
              providerSessionId: input.providerSessionId,
              status: "idle" as const,
              updatedAt: now,
            };
          }),
        );
      },
      (effect, threadInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterResumeThreadError({
                driver,
                providerSessionId: input.providerSessionId,
                providerThreadId: threadInput.providerThread.id,
                cause,
              }),
          ),
        ),
    ),
    startTurn,
    ...(compactsContext
      ? {
          compactThread: Effect.fn("AcpAdapterV2.compactThread")(function* (
            turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
          ) {
            return yield* startTurn({
              ...turnInput,
              message: { ...turnInput.message, text: "/compact" },
            });
          }),
        }
      : {}),
    steerTurn: Effect.fn("AcpAdapterV2.steerTurn")(
      function* (turnInput) {
        if (steersWithPrompt) return yield* steerWithPrompt(turnInput);
        const steering = flavor.steering;
        // A text-only steer leaves attachments to the orchestrator's restart.
        if (
          steering === undefined ||
          (turnInput.message.attachments.length > 0 &&
            flavor.capabilities.turns.activeSteeringAcceptsAttachments === false)
        ) {
          return yield* new ProviderAdapter.ProviderAdapterSteerRunUnsupportedError({
            driver,
            providerThreadId: turnInput.providerThread.id,
          });
        }
        const context = yield* Ref.get(activeTurn);
        if (
          context === null ||
          context.finalized ||
          context.providerTurnId !== turnInput.providerTurnId
        ) {
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver,
            detail: `Provider turn ${turnInput.providerTurnId} is not active and cannot be steered.`,
          });
        }
        // An agent that drops an early cancel drops an early steer too.
        const startHold = flavor.cancelAfterPromptStarts;
        if (startHold !== undefined) {
          yield* Deferred.await(context.promptStarted).pipe(Effect.timeoutOption(startHold.bound));
        }
        const text = yield* providerMessageTextWithAttachmentPaths({
          text: turnInput.message.text,
          attachments: turnInput.message.attachments,
          resolveAttachmentPath: host.resolveAttachmentPath,
          resolveExtractedTextPath: host.resolveExtractedTextPath,
        });
        const images = yield* imageAttachmentBlocks(turnInput.message.attachments);
        const isNativeSlashCommand = turnInput.message.text.trimStart().startsWith("/");
        const compactionMarker = (yield* Ref.get(compactionMarkers)).get(context.nativeThreadId);
        const seenAppContext =
          context.appContextOffered ??
          (yield* Ref.get(deliveredAppContext)).get(context.nativeThreadId);
        const appContextEntries = unsentAcpAppContext(
          turnInput.appContext,
          seenAppContext,
          isNativeSlashCommand,
        );
        const steerText =
          appContextEntries.length === 0
            ? text
            : text.length > 0
              ? `${appContextEntries.map(formatAcpAppContextEntry).join("\n")}\n\n${text}`
              : appContextEntries.map(formatAcpAppContextEntry).join("\n");
        const appContextSequence =
          appContextEntries.length === 0 ? 0 : ++context.appContextSequence;
        const steerId = yield* steering.send(runtime, context.nativeThreadId, steerText, images);
        let steerConfirmed = true;
        if (steerId !== undefined) {
          const injected = steerInjection(steerId);
          // The agent reads a steer at its next step. One that lands after the last
          // step is dropped, and the turn settles right after; the orchestrator then
          // sends it as a follow-up. The bound keeps Stop from queueing behind a tool.
          const outcome = yield* Effect.raceFirst(
            Deferred.await(injected).pipe(Effect.as("injected" as const)),
            Deferred.await(context.promptWireSettled).pipe(Effect.as("settled" as const)),
          ).pipe(Effect.timeoutOption(STEER_DELIVERY_BOUND));
          steerInjections.delete(steerId);
          if (Option.contains(outcome, "settled") && !(yield* Deferred.isDone(injected))) {
            return yield* new ProviderAdapter.ProviderAdapterProtocolError({
              driver,
              detail: `Provider turn ${turnInput.providerTurnId} ended before it read the steering message.`,
            });
          }
          // A steer still unread at the bound may yet be dropped, so its notes stay unsent.
          steerConfirmed = yield* Deferred.isDone(injected);
        }
        if (
          steerConfirmed &&
          appContextEntries.length > 0 &&
          !context.interrupted &&
          (yield* Ref.get(compactionMarkers)).get(context.nativeThreadId) === compactionMarker
        ) {
          context.appContextOffered = mergeAcpAppContext(
            context.appContextOffered ??
              (yield* Ref.get(deliveredAppContext)).get(context.nativeThreadId),
            appContextEntries,
          );
          yield* commitAcpAppContext({
            context,
            entries: appContextEntries,
            compactionMarker,
            sequence: appContextSequence,
          });
        }
      },
      (effect, turnInput) =>
        effect.pipe(
          Effect.mapError((cause) =>
            cause._tag === "ProviderAdapterSteerRunUnsupportedError"
              ? cause
              : new ProviderAdapter.ProviderAdapterSteerRunError({
                  driver,
                  providerThreadId: turnInput.providerThread.id,
                  providerTurnId: turnInput.providerTurnId,
                  cause,
                }),
          ),
        ),
    ),
    // The held turn already waits on these commands; their tool calls carry no task id,
    // so any id matches while one runs on this thread.
    ...(flavor.toolOutlivesPrompt === undefined
      ? {}
      : {
          awaitBackgroundTasks: Effect.fn("AcpAdapterV2.awaitBackgroundTasks")(function* ({
            providerThread,
            taskIds,
          }) {
            const outlives = flavor.toolOutlivesPrompt;
            const context = yield* Ref.get(activeTurn);
            const holdsCommand =
              outlives !== undefined &&
              defersFinalizeForBackgroundWork &&
              context !== null &&
              !context.finalized &&
              context.nativeThreadId === providerThread.nativeThreadRef?.nativeId &&
              [...context.tools.values()].some(
                (tool) => toolStatus(tool.status) === "running" && outlives(tool),
              );
            return { matched: holdsCommand ? [...new Set(taskIds)] : [] };
          }),
        }),
    interruptTurn: Effect.fn("AcpAdapterV2.interruptTurn")(
      function* (turnInput: ProviderAdapter.ProviderAdapterV2InterruptInput) {
        return yield* Effect.uninterruptibleMask((restore) =>
          Effect.gen(function* () {
            yield* restore(runtimeTransitionPermit.take(1));
            // Stop's caller times out on this call. The transition runs in its own fiber so
            // a stalled hard teardown keeps its state and permit without holding the caller.
            const transitionFiber = yield* Effect.gen(function* () {
              const transition = yield* Effect.gen(function* () {
                const interruptContext = yield* Ref.get(activeTurn);
                if (
                  followsAgentWorkState &&
                  turnInput.requestRuntimeRestart === true &&
                  (interruptContext === null ||
                    interruptContext.providerTurnId === turnInput.providerTurnId)
                ) {
                  // ACP cancel leaves native children alive; close confirms session-wide Stop.
                  ctx.pendingStopCloseTurn = interruptContext;
                  // Interruptible, or neither this timeout nor the caller's could end a hung close.
                  const closed = yield* restore(
                    runtime.closeSession().pipe(Effect.timeoutOption(ACP_STOP_CONFIRM_TIMEOUT_MS)),
                  ).pipe(
                    Effect.mapError(
                      (cause) =>
                        new ProviderAdapter.ProviderAdapterProtocolError({
                          driver,
                          detail:
                            "The agent refused to close its session; background work may still run",
                          cause,
                        }),
                    ),
                  );
                  if (Option.isNone(closed)) {
                    return yield* new ProviderAdapter.ProviderAdapterInterruptTimeoutError({
                      driver,
                      providerThreadId: turnInput.providerThread.id,
                      providerTurnId: turnInput.providerTurnId,
                      timeoutMs: ACP_STOP_CONFIRM_TIMEOUT_MS,
                    });
                  }
                  yield* runtimeCallbackPermit.withPermit(
                    Effect.gen(function* () {
                      // Callbacks can settle the turn while close is awaiting confirmation.
                      const context = yield* Ref.get(activeTurn);
                      const carryover = yield* Ref.get(carryoverSubagents);
                      yield* Ref.set(stoppedRunQuarantine, true);
                      yield* Ref.set(runtimeRestartRequired, true);
                      ctx.agentWork = null;
                      agentRequests.clear();
                      nativeChildren.clear();
                      yield* quarantineStoppedRun();
                      if (context !== null) context.interrupted = true;
                      yield* cancelPendingRuntimeRequests();
                      yield* terminalizeCarryoverSubagents(carryover);
                      if (context !== null) {
                        yield* finalizeTurn(context, "interrupted");
                      }
                    }),
                  );
                  return undefined;
                }
                const softSteerCandidate =
                  flavor.preserveRuntimeOnSettledInterrupt === true &&
                  turnInput.requestRuntimeRestart !== true &&
                  interruptContext?.providerTurnId === turnInput.providerTurnId;
                // Native return can precede its callback; drain responses under the permit and check wire settlement before cancel.
                let settledSoftInterrupt = false;
                if (softSteerCandidate && interruptContext !== null) {
                  const promptSettledUnderPermit = yield* runtimeCallbackPermit.withPermit(
                    awaitAdmittedNativeResponses.pipe(
                      Effect.andThen(Effect.sync(() => interruptContext.promptSettled === true)),
                    ),
                  );
                  const wireSettled = yield* Deferred.isDone(interruptContext.promptWireSettled);
                  settledSoftInterrupt = promptSettledUnderPermit || wireSettled;
                }
                const restartRuntime =
                  !settledSoftInterrupt &&
                  (turnInput.requestRuntimeRestart === true ||
                    flavor.restartRuntimeOnEveryInterrupt === true);
                const hardRestart =
                  restartRuntime && flavor.terminateRuntimeProcessGroupOnInterrupt === true;
                if (hardRestart) {
                  const teardownState = yield* Ref.get(runtimeTeardownState);
                  if (teardownState._tag === "Failed") {
                    return yield* teardownState.error;
                  }
                  if (teardownState._tag === "InProgress") {
                    yield* Effect.logInfo("ACP interrupt awaiting in-progress hard teardown", {
                      driver,
                      providerTurnId: turnInput.providerTurnId,
                    });
                    yield* Deferred.await(teardownState.completed);
                    return undefined;
                  }
                }
                const context = interruptContext;
                if (context?.providerTurnId !== turnInput.providerTurnId) {
                  // Contain orphan runtimes on Stop; session-wide teardown must not touch another active turn.
                  const containOrphanRuntime =
                    context === null && hardRestart && turnInput.requestRuntimeRestart === true;
                  yield* Effect.logWarning(
                    containOrphanRuntime
                      ? "ACP Stop raced a soft interrupt that cleared the turn; containing the orphan runtime"
                      : "ACP interrupt raced transport teardown or a prior Stop; treating as already interrupted",
                    {
                      driver,
                      requestedProviderTurnId: turnInput.providerTurnId,
                      activeProviderTurnId: context?.providerTurnId ?? null,
                      hardRestart,
                      requestRuntimeRestart: turnInput.requestRuntimeRestart === true,
                      teardownState: (yield* Ref.get(runtimeTeardownState))._tag,
                    },
                  );
                  if (containOrphanRuntime) {
                    const teardownBarrier = yield* Deferred.make<
                      void,
                      ProviderAdapter.ProviderAdapterProtocolError
                    >();
                    yield* runtimeCallbackPermit.withPermit(
                      Effect.gen(function* () {
                        yield* awaitAdmittedNativeResponses;
                        const stoppedGeneration = yield* Ref.get(runtimeCallbackGeneration);
                        yield* quarantineNativeTransportAtGeneration(stoppedGeneration);
                        yield* Ref.set(runtimeTeardownState, {
                          _tag: "InProgress",
                          completed: teardownBarrier,
                        });
                        yield* advanceRuntimeCallbackGeneration;
                      }),
                    );
                    const orphanCarryover = yield* Ref.getAndSet(carryoverSubagents, null);
                    yield* quarantineStoppedRun();
                    yield* cancelPendingRuntimeRequests();
                    yield* terminalizeCarryoverSubagents(orphanCarryover);
                    if (runtime.terminateProcessGroup === undefined) {
                      const error = new ProviderAdapter.ProviderAdapterProtocolError({
                        driver,
                        detail:
                          "ACP runtime does not expose its required process-group teardown; the session is poisoned",
                      });
                      yield* Ref.set(runtimeTeardownState, { _tag: "Failed", error });
                      yield* Deferred.fail(teardownBarrier, error).pipe(Effect.ignore);
                      return yield* error;
                    }
                    const teardownExit = yield* runtime.terminateProcessGroup.pipe(Effect.exit);
                    if (Exit.isFailure(teardownExit)) {
                      const error = new ProviderAdapter.ProviderAdapterProtocolError({
                        driver,
                        detail:
                          "ACP orphan runtime process-group teardown failed; the session is poisoned",
                        payload: Cause.squash(teardownExit.cause),
                      });
                      yield* Ref.set(runtimeTeardownState, { _tag: "Failed", error });
                      yield* Deferred.fail(teardownBarrier, error).pipe(Effect.ignore);
                      return yield* error;
                    }
                    yield* Ref.set(runtimeRestartRequired, true);
                    yield* Ref.set(runtimeTeardownState, { _tag: "Idle" });
                    yield* Deferred.succeed(teardownBarrier, undefined).pipe(Effect.ignore);
                  }
                  return undefined;
                }
                const teardownBarrier = hardRestart
                  ? yield* Deferred.make<void, ProviderAdapter.ProviderAdapterProtocolError>()
                  : null;
                if (teardownBarrier !== null) {
                  yield* runtimeCallbackPermit.withPermit(
                    Effect.gen(function* () {
                      yield* awaitAdmittedNativeResponses;
                      const stoppedGeneration = yield* Ref.get(runtimeCallbackGeneration);
                      yield* quarantineNativeTransportAtGeneration(stoppedGeneration);
                      yield* Ref.set(runtimeTeardownState, {
                        _tag: "InProgress",
                        completed: teardownBarrier,
                      });
                      yield* advanceRuntimeCallbackGeneration;
                    }),
                  );
                }
                return {
                  context,
                  restartRuntime,
                  hardRestart,
                  teardownBarrier,
                  settledSoftInterrupt,
                };
              }).pipe(
                Effect.ensuring(
                  Effect.sync(() => {
                    ctx.pendingStopCloseTurn = null;
                  }),
                ),
              );
              if (transition === undefined) return;
              const {
                context,
                restartRuntime,
                hardRestart,
                teardownBarrier,
                settledSoftInterrupt,
              } = transition;
              const poisonTeardown = Effect.fnUntraced(function* (
                detail: string,
                payload?: unknown,
              ) {
                const error = new ProviderAdapter.ProviderAdapterProtocolError({
                  driver,
                  detail,
                  ...(payload === undefined ? {} : { payload }),
                });
                yield* Ref.set(runtimeTeardownState, { _tag: "Failed", error });
                yield* Deferred.fail(teardownBarrier!, error).pipe(Effect.ignore);
                return error;
              });
              const runTransition = Effect.gen(function* () {
                context.interrupted = true;
                if (hardRestart || turnInput.requestRuntimeRestart === true) {
                  yield* quarantineStoppedRun();
                }
                // A settled soft interrupt keeps background subagents, and with them their MCP calls.
                yield* cancelPendingRuntimeRequests({ stopMcpCalls: !settledSoftInterrupt });
                // Finalize before killing so projection catches up and concurrent interrupts see activeTurn cleared.
                if (
                  (hardRestart || context.promptSettled || settledSoftInterrupt) &&
                  !context.finalized
                ) {
                  yield* finalizeTurn(context, "interrupted");
                }
                if (hardRestart) {
                  if (runtime.terminateProcessGroup === undefined) {
                    return yield* poisonTeardown(
                      "ACP runtime does not expose its required process-group teardown; the session is poisoned",
                    ).pipe(Effect.flatMap(Effect.fail));
                  }
                  const teardownExit = yield* runtime.terminateProcessGroup!.pipe(Effect.exit);
                  if (Exit.isFailure(teardownExit)) {
                    return yield* poisonTeardown(
                      "ACP runtime process-group teardown failed; the session is poisoned",
                      Cause.squash(teardownExit.cause),
                    ).pipe(Effect.flatMap(Effect.fail));
                  }
                  yield* Ref.set(runtimeRestartRequired, true);
                  yield* Ref.set(runtimeTeardownState, { _tag: "Idle" });
                  yield* Deferred.succeed(teardownBarrier!, undefined).pipe(Effect.ignore);
                } else {
                  // Settled soft interrupts have no prompt to cancel; cancel could kill background subagents.
                  if (!settledSoftInterrupt && (yield* promptStillRunsAfterHold(context))) {
                    yield* runtime.cancel;
                  }
                  if (restartRuntime && flavor.restartRuntimeAfterInterrupt === true) {
                    yield* Ref.set(runtimeRestartRequired, true);
                  }
                }
                const stopped = yield* Deferred.await(context.completed).pipe(
                  Effect.timeoutOption(ACP_STOP_CONFIRM_TIMEOUT_MS),
                );
                // The turn stays open: the agent may still be working, and the user
                // decides whether to Force stop it.
                if (Option.isNone(stopped)) {
                  return yield* new ProviderAdapter.ProviderAdapterInterruptTimeoutError({
                    driver,
                    providerThreadId: turnInput.providerThread.id,
                    providerTurnId: turnInput.providerTurnId,
                    timeoutMs: ACP_STOP_CONFIRM_TIMEOUT_MS,
                  });
                }
              });
              if (!hardRestart) {
                return yield* restore(runTransition);
              }
              return yield* runTransition.pipe(
                Effect.catchCause((cause) =>
                  Effect.gen(function* () {
                    const state = yield* Ref.get(runtimeTeardownState);
                    if (state._tag === "InProgress") {
                      yield* poisonTeardown(
                        "ACP hard teardown failed unexpectedly; the session is poisoned",
                        Cause.squash(cause),
                      );
                    }
                    return yield* Effect.failCause(cause);
                  }),
                ),
              );
            }).pipe(
              Effect.ensuring(runtimeTransitionPermit.release(1)),
              Effect.forkIn(sessionScope, { startImmediately: true, uninterruptible: true }),
            );
            return yield* restore(Fiber.join(transitionFiber)).pipe(
              Effect.onInterrupt(() =>
                Fiber.interrupt(transitionFiber).pipe(Effect.forkDetach, Effect.asVoid),
              ),
            );
          }),
        );
      },
      (effect, turnInput) =>
        effect.pipe(
          Effect.mapError((cause) =>
            cause._tag === "ProviderAdapterInterruptTimeoutError"
              ? cause
              : new ProviderAdapter.ProviderAdapterInterruptError({
                  driver,
                  providerThreadId: turnInput.providerThread.id,
                  providerTurnId: turnInput.providerTurnId,
                  cause,
                }),
          ),
        ),
    ),
    respondToRuntimeRequest: (requestInput) =>
      Effect.uninterruptibleMask((restore) =>
        Effect.gen(function* () {
          yield* restore(runtimeTransitionPermit.take(1));
          return yield* Effect.gen(function* () {
            yield* awaitRuntimeTeardown();
            const generation = yield* Ref.get(runtimeCallbackGeneration);
            const pending = (yield* Ref.get(pendingRuntimeRequests)).get(
              String(requestInput.requestId),
            );
            if (pending === undefined || pending.generation !== generation) {
              return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                driver,
                detail: `No pending ACP runtime request ${requestInput.requestId}`,
              });
            }
            const settled =
              pending.type === "user_input"
                ? yield* Deferred.succeed(pending.answers, requestInput.answers ?? null)
                : requestInput.decision === undefined
                  ? yield* new ProviderAdapter.ProviderAdapterProtocolError({
                      driver,
                      detail: `ACP approval request ${requestInput.requestId} requires a decision`,
                    })
                  : yield* Deferred.succeed(pending.decision, requestInput.decision);
            if (!settled) {
              return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                driver,
                detail: `ACP runtime request ${requestInput.requestId} was already resolved`,
              });
            }
            yield* awaitNativeResponseAcknowledgements([
              [pending.transportRequestId, pending.nativeResponseAcknowledgement],
            ]);
            yield* Deferred.await(pending.nativeResponseAcknowledgement);
          }).pipe(Effect.ensuring(runtimeTransitionPermit.release(1)));
        }),
      ).pipe(
        Effect.mapError(
          (cause) =>
            new ProviderAdapter.ProviderAdapterRuntimeRequestResponseError({
              driver,
              requestId: requestInput.requestId,
              cause,
            }),
        ),
      ),
    readThreadSnapshot: Effect.fn("AcpAdapterV2.readThreadSnapshot")(
      function* (snapshotInput) {
        return yield* runtimeTransitionPermit.withPermit(
          Effect.gen(function* () {
            yield* awaitRuntimeTeardown();
            useProviderThreadIdentity(snapshotInput.providerThread);
            yield* restartRuntimeAfterTeardownIfRequired(snapshotInput.providerThread.appThreadId);
            const sessionId = yield* nativeThreadId(driver, snapshotInput.providerThread);
            if ((yield* Ref.get(activeSessionId)) !== sessionId) {
              if (!capabilities.threads.canReadThreadSnapshot) {
                return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                  driver,
                  detail: "ACP driver does not support session/load snapshots",
                });
              }
              yield* Ref.set(snapshot, emptySnapshotState());
              const mcpContext = yield* readMcpContext(snapshotInput.providerThread.appThreadId);
              prepareTerminalEnvironment(mcpContext, sessionId);
              yield* Ref.set(loadingSessionId, sessionId);
              const activated = yield* runtime
                .loadSession(sessionId, acpMcpActivation(mcpContext))
                .pipe(Effect.onError(() => Ref.set(loadingSessionId, null)));
              rememberTerminalEnvironment(
                activated.sessionId,
                yield* readMcpContext(snapshotInput.providerThread.appThreadId),
              );
              yield* Ref.set(activeSessionId, activated.sessionId);
              yield* Ref.set(loadingSessionId, null);
              yield* setActiveSessionSetup(activated);
              yield* Ref.set(activeSelection, null);
              yield* Ref.set(activeInteractionMode, null);
            }
            const state = yield* Ref.get(snapshot);
            const messages = state.order.flatMap((key) => {
              const message = state.messages.get(key);
              return message === undefined ||
                (message.text.trim().length === 0 && message.attachments.length === 0)
                ? []
                : [message];
            });
            const now = yield* DateTime.now;
            return {
              providerThread: {
                ...snapshotInput.providerThread,
                providerSessionId: input.providerSessionId,
                status: "idle" as const,
                updatedAt: now,
              },
              // Imports read only the transcript; turns reach orchestration as events.
              messages,
              reasoningMessageIds: [...state.reasoningIds],
              runtimeRequests: [],
              providerPayload: { protocol: ACP_PROTOCOL, sessionId },
            };
          }),
        );
      },
      (effect, snapshotInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterReadThreadSnapshotError({
                driver,
                providerThreadId: snapshotInput.providerThread.id,
                cause,
              }),
          ),
        ),
    ),
    rollbackThread: (rollbackInput) =>
      runtimeTransitionPermit
        .withPermit(
          Effect.gen(function* () {
            const currentTurn = yield* Ref.get(activeTurn);
            if (currentTurn !== null) {
              return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                driver,
                detail: `Cannot roll back ACP provider thread ${rollbackInput.providerThread.id} while turn ${currentTurn.providerTurnId} is active`,
              });
            }
            yield* awaitRuntimeTeardown();
            ctx.itemIdentityVersion = 2;
            prepareTerminalEnvironment(
              yield* readMcpContext(rollbackInput.providerThread.appThreadId),
            );
            const replacement = yield* startReplacementAcpRuntime(
              rollbackInput.providerThread.appThreadId,
              (candidate) =>
                commitReplacementSession(rollbackInput.providerThread.appThreadId, candidate),
            ).pipe(Effect.retry({ times: 1 }));
            const now = yield* DateTime.now;
            return {
              providerThread: {
                ...rollbackInput.providerThread,
                nativeThreadRef: {
                  driver,
                  nativeId: replacement.sessionId,
                  strength: "strong" as const,
                },
                nativeConversationHeadRef: null,
                nativeMetadata: {
                  ...rollbackInput.providerThread.nativeMetadata,
                  itemIdentityVersion: 2 as const,
                },
                status: "idle" as const,
                updatedAt: now,
              },
              messages: [],
              runtimeRequests: [],
            };
          }),
        )
        .pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterRollbackThreadError({
                driver,
                providerThreadId: rollbackInput.providerThread.id,
                checkpointId: rollbackInput.target.checkpointId,
                cause,
              }),
          ),
        ),
    forkThread: Effect.fn("AcpAdapterV2.forkThread")(
      function* (forkInput) {
        return yield* runtimeTransitionPermit.withPermit(
          Effect.gen(function* () {
            yield* awaitRuntimeTeardown();
            useProviderThreadIdentity(forkInput.sourceProviderThread);
            yield* restartRuntimeAfterTeardownIfRequired(
              forkInput.sourceProviderThread.appThreadId,
            );
            if (!capabilities.threads.canForkThread) {
              return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                driver,
                detail: "ACP driver did not negotiate session/fork",
              });
            }
            const forkMeta = forkFromTurnMetaFor({
              driver,
              flavor,
              canForkFromTurn: capabilities.threads.canForkFromTurn,
              forkInput,
            });
            if (forkMeta === null) {
              return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                driver,
                detail: "ACP session/fork can only fork the current session head",
              });
            }
            const sourceSessionId = yield* nativeThreadId(driver, forkInput.sourceProviderThread);
            const mcpContext = yield* readMcpContext(forkInput.targetThreadId);
            prepareTerminalEnvironment(mcpContext);
            const forked = yield* runtime.forkSession(
              sourceSessionId,
              acpMcpActivation(mcpContext),
              forkMeta,
            );
            rememberTerminalEnvironment(
              forked.sessionId,
              yield* readMcpContext(forkInput.targetThreadId),
            );
            yield* Ref.set(activeSessionId, forked.sessionId);
            yield* setActiveSessionSetup(forked);
            yield* Ref.set(activeSelection, null);
            yield* Ref.set(activeInteractionMode, null);
            ctx.itemIdentityVersion = 2;
            const now = yield* DateTime.now;
            const providerThread = makeProviderThread({
              driver,
              providerInstanceId: options.instanceId,
              idAllocator,
              appThreadId: forkInput.targetThreadId,
              providerSessionId: input.providerSessionId,
              nativeThreadId: forked.sessionId,
              itemIdentityVersion: 2,
              ...(forkInput.ownerNodeId === undefined
                ? {}
                : { ownerNodeId: forkInput.ownerNodeId }),
              forkedFrom: {
                providerThreadId: forkInput.sourceProviderThread.id,
                ...(forkInput.providerTurnId === undefined
                  ? {}
                  : { providerTurnId: forkInput.providerTurnId }),
              },
              now,
            });
            yield* Ref.update(providerThreadByNativeSessionId, (current) =>
              new Map(current).set(forked.sessionId, providerThread),
            );
            return providerThread;
          }),
        );
      },
      (effect, forkInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterForkThreadError({
                driver,
                providerThreadId: forkInput.sourceProviderThread.id,
                cause,
              }),
          ),
        ),
    ),
  };
};
