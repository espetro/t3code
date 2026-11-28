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
  ACP_LOADED_COMMANDS_WAIT,
  acpIsAppOwnedWakeTurn,
  acpIsProviderContinuationMessage,
  acpTurnStartShouldPreserveContinuation,
  isCompactionMessage,
  mergeAcpAppContext,
  nativeThreadId,
  refusedWithSessionIntact,
  sendPromptWhenIdle,
} from "./adapter.helpers.ts";
import type { ActiveAcpSubagent, ActiveAcpTurn } from "./adapter.helpers.ts";

export const bindStartTurnUnlocked = (ctx: any): any =>
  Effect.fn("AcpAdapterV2.startTurn")(
    function* (turnInput: ProviderAdapter.ProviderAdapterV2TurnInput) {
      const {
        activateSession,
        activeInteractionMode,
        activeSelection,
        activeSessionId,
        activeSessionSetup,
        activeTurn,
        advertisedCommandNames,
        awaitRuntimeTeardown,
        carryoverSubagents,
        compactionMarkers,
        configureSession,
        configuredRuntimeMode,
        contextUsageBySessionId,
        continuationGeneration,
        continuationPermit,
        continuationRequested,
        createdAt,
        defersFinalizeForBackgroundWork,
        deliveredAppContext,
        deriveProviderTurnId,
        driver,
        emitProviderEvent,
        finalizeTurn,
        flavor,
        followPrompt,
        followsAgentWorkState,
        handleSessionUpdate,
        handledBackgroundTaskIdsInActiveTurn,
        hasDeferredBackgroundWork,
        idleReportedSubagents,
        input,
        lastTurnRoute,
        loadingSessionId,
        midTurnUnreportedCompletedTaskIds,
        nativeMetadataBySessionId,
        noWakeReports,
        postSettleContinuationEnabled,
        projectDeferredCarryoverTerminals,
        promptInactivityTimeoutMillis,
        providerThreadByNativeSessionId,
        providerTurnPayload,
        rearmDeferredFinalize,
        rememberSnapshotMessage,
        resolvePromptParts,
        restartRuntimeAfterTeardownIfRequired,
        runtime,
        runtimeCallbackGeneration,
        runtimeCallbackPermit,
        scheduleDeferredFinalize,
        schedulePostSettleHoldExpiry,
        sessionScope,
        setActiveSessionSetup,
        settleIdleWork,
        startTurn,
        startTurnUnlocked,
        stoppedRunQuarantine,
        suppressPostSettleMonitorPrompt,
        syncNativeChildren,
        useProviderThreadIdentity,
        validateModelSelection,
        wakeBuffer,
        wakeReports,
        watchPromptInactivity,
      } = pickBindCtx(ctx);

      yield* awaitRuntimeTeardown();
      const existing = yield* Ref.get(activeTurn);
      if (existing !== null) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver,
          detail: `ACP provider turn ${existing.providerTurnId} is still active`,
          reason: "previous_turn_active",
        });
      }
      useProviderThreadIdentity(turnInput.providerThread);
      // load/resume can invoke client methods; install the incoming policy before activation.
      ctx.latestRuntimePolicy = turnInput.runtimePolicy;
      const requestedSessionId = yield* nativeThreadId(driver, turnInput.providerThread);
      const restartAfterInterrupt = yield* restartRuntimeAfterTeardownIfRequired(
        turnInput.threadId,
      );
      const needsSessionActivation =
        (yield* Ref.get(activeSessionId)) !== requestedSessionId || restartAfterInterrupt;
      if (needsSessionActivation) {
        const activated = yield* activateSession(requestedSessionId, turnInput.threadId);
        yield* Ref.set(activeSessionId, activated.sessionId);
        yield* Ref.set(loadingSessionId, null);
        yield* setActiveSessionSetup(activated);
        yield* configureSession(activated, turnInput.modelSelection, turnInput.runtimePolicy);
        yield* Ref.set(activeSelection, turnInput.modelSelection);
        yield* Ref.set(activeInteractionMode, turnInput.runtimePolicy.interactionMode);
      } else {
        const configuredSelection = yield* Ref.get(activeSelection);
        const configuredInteractionMode = yield* Ref.get(activeInteractionMode);
        if (
          configuredSelection === null ||
          !modelSelectionsEqual(configuredSelection, turnInput.modelSelection) ||
          configuredInteractionMode !== turnInput.runtimePolicy.interactionMode ||
          (yield* Ref.get(configuredRuntimeMode)) !== turnInput.runtimePolicy.runtimeMode
        ) {
          const currentSessionSetup = yield* Ref.get(activeSessionSetup);
          if (currentSessionSetup === null) {
            return yield* new ProviderAdapter.ProviderAdapterProtocolError({
              driver,
              detail: `ACP session ${requestedSessionId} has no active setup metadata`,
            });
          }
          yield* configureSession(
            currentSessionSetup,
            turnInput.modelSelection,
            turnInput.runtimePolicy,
          );
          yield* Ref.set(activeSelection, turnInput.modelSelection);
          yield* Ref.set(activeInteractionMode, turnInput.runtimePolicy.interactionMode);
        }
      }
      // Checked after activation: a loaded session advertises its own commands.
      const compactionSetup = yield* Ref.get(activeSessionSetup);
      const sessionCommandNames =
        flavor.compactViaAdvertisedCommand === true && isCompactionMessage(turnInput.message)
          ? yield* SubscriptionRef.changes(advertisedCommandNames).pipe(
              Stream.map((names) => names.get(requestedSessionId)),
              Stream.filter((names) => names !== undefined),
              Stream.runHead,
              Effect.timeoutOption(ACP_LOADED_COMMANDS_WAIT),
              Effect.map(Option.flatten),
            )
          : Option.none<ReadonlySet<string>>();
      if (
        isCompactionMessage(turnInput.message) &&
        ((flavor.compactViaAdvertisedCommand === true &&
          !Option.exists(sessionCommandNames, (names) => names.has("compact"))) ||
          (flavor.compactSession !== undefined &&
            (compactionSetup === null ||
              !flavor.compactSession.supported(compactionSetup.initializeResult))))
      ) {
        return yield* new ProviderAdapter.ProviderCompactionUnsupportedError({
          driver,
          providerThreadId: turnInput.providerThread.id,
        });
      }
      yield* validateModelSelection(turnInput.modelSelection);
      yield* Ref.set(lastTurnRoute, {
        threadId: turnInput.threadId,
        providerThreadId: turnInput.providerThread.id,
      });
      yield* Ref.set(suppressPostSettleMonitorPrompt, false);
      yield* Ref.set(handledBackgroundTaskIdsInActiveTurn, new Set());
      // Continuations consume existing wake traffic without re-prompting ACP.
      const isContinuationTurn =
        (postSettleContinuationEnabled || followsAgentWorkState) &&
        acpIsProviderContinuationMessage(turnInput.message);
      const isAppOwnedWakeTurn = acpIsAppOwnedWakeTurn(turnInput.message);
      if (!isAppOwnedWakeTurn) {
        yield* Ref.set(midTurnUnreportedCompletedTaskIds, new Set());
      }
      const continuationWasRequested = yield* continuationPermit.withPermit(
        Effect.gen(function* () {
          const {
            activateSession,
            activeInteractionMode,
            activeSelection,
            activeSessionId,
            activeSessionSetup,
            activeTurn,
            advertisedCommandNames,
            awaitRuntimeTeardown,
            carryoverSubagents,
            compactionMarkers,
            configureSession,
            configuredRuntimeMode,
            contextUsageBySessionId,
            continuationGeneration,
            continuationPermit,
            continuationRequested,
            createdAt,
            defersFinalizeForBackgroundWork,
            deliveredAppContext,
            deriveProviderTurnId,
            driver,
            emitProviderEvent,
            finalizeTurn,
            flavor,
            followPrompt,
            followsAgentWorkState,
            handleSessionUpdate,
            handledBackgroundTaskIdsInActiveTurn,
            hasDeferredBackgroundWork,
            idleReportedSubagents,
            input,
            lastTurnRoute,
            loadingSessionId,
            midTurnUnreportedCompletedTaskIds,
            nativeMetadataBySessionId,
            noWakeReports,
            postSettleContinuationEnabled,
            projectDeferredCarryoverTerminals,
            promptInactivityTimeoutMillis,
            providerThreadByNativeSessionId,
            providerTurnPayload,
            rearmDeferredFinalize,
            rememberSnapshotMessage,
            resolvePromptParts,
            restartRuntimeAfterTeardownIfRequired,
            runtime,
            runtimeCallbackGeneration,
            runtimeCallbackPermit,
            scheduleDeferredFinalize,
            schedulePostSettleHoldExpiry,
            sessionScope,
            setActiveSessionSetup,
            settleIdleWork,
            startTurn,
            startTurnUnlocked,
            stoppedRunQuarantine,
            suppressPostSettleMonitorPrompt,
            syncNativeChildren,
            useProviderThreadIdentity,
            validateModelSelection,
            wakeBuffer,
            wakeReports,
            watchPromptInactivity,
          } = pickBindCtx(ctx);

          const wasRequested = yield* Ref.get(continuationRequested);
          const preserveBufferedContinuation = acpTurnStartShouldPreserveContinuation({
            continuationRequested: wasRequested,
            isContinuationTurn,
            wakeBufferLength: (yield* Ref.get(wakeBuffer)).length,
          });
          if (!isContinuationTurn && !isAppOwnedWakeTurn && !preserveBufferedContinuation) {
            yield* Ref.set(wakeBuffer, []);
            yield* Ref.set(wakeReports, noWakeReports);
          }
          if (preserveBufferedContinuation) return wasRequested;
          yield* Ref.update(continuationGeneration, (value) => value + 1);
          yield* Ref.set(continuationRequested, false);
          return wasRequested;
        }),
      );
      const promptParts = isContinuationTurn
        ? null
        : yield* resolvePromptParts(turnInput, requestedSessionId);
      const startedAt = yield* DateTime.now;
      const nativeTurnId = `${requestedSessionId}:turn:${turnInput.providerTurnOrdinal}`;
      const providerTurnId = deriveProviderTurnId(nativeTurnId);
      const completed = yield* Deferred.make<void, never>();
      const promptWireSettled = yield* Deferred.make<void, never>();
      const promptDispatched = yield* Deferred.make<void, never>();
      const promptStarted = yield* Deferred.make<void, never>();
      const rememberedContextUsage = (yield* Ref.get(contextUsageBySessionId)).get(
        requestedSessionId,
      );
      const rememberedNativeMetadata = (yield* Ref.get(nativeMetadataBySessionId)).get(
        requestedSessionId,
      );
      const initialNativeMetadata =
        rememberedNativeMetadata === undefined
          ? (turnInput.providerThread.nativeMetadata ?? null)
          : {
              ...turnInput.providerThread.nativeMetadata,
              ...rememberedNativeMetadata,
            };
      if (initialNativeMetadata !== null) {
        yield* Ref.update(nativeMetadataBySessionId, (current) =>
          new Map(current).set(requestedSessionId, initialNativeMetadata),
        );
      }
      const context: ActiveAcpTurn = {
        input: turnInput,
        providerTurnId,
        nativeThreadId: requestedSessionId,
        nativeTurnId,
        startedAt,
        completed,
        itemOrdinals: new Map(),
        outgoingPrompt:
          (yield* Ref.get(activeSessionSetup))?.initializeResult.protocolVersion === 2
            ? promptParts?.prompt
            : undefined,
        appContextOffered:
          promptParts !== null &&
          promptParts.appContextEntries.length > 0 &&
          (yield* Ref.get(compactionMarkers)).get(requestedSessionId) ===
            promptParts.compactionMarker
            ? mergeAcpAppContext(
                (yield* Ref.get(deliveredAppContext)).get(requestedSessionId),
                promptParts.appContextEntries,
              )
            : undefined,
        appContextCommittedSequence: new Map(),
        appContextSequence: 0,
        user: { current: null, nextSegment: 0, closedNamedSegments: new Map() },
        assistant: { current: null, nextSegment: 0, closedNamedSegments: new Map() },
        reasoning: { current: null, nextSegment: 0, closedNamedSegments: new Map() },
        contextUsage: rememberedContextUsage ?? turnInput.providerThread.contextUsage ?? null,
        nativeMetadata: initialNativeMetadata,
        tools: new Map(),
        claimedToolResults: new Map(),
        drainedToolResultKeys: new Set(),
        blockedInputRecoveryKeys: new Set(),
        attemptedInputRecoveryKeys: new Set(),
        stoppedToolCallIds: new Set(),
        toolUpdatesSkipped: new Map(),
        toolStartedAt: new Map(),
        subagents: new Map(),
        subagentsBySessionId: new Map(),
        pendingSubagentNotifications: new Map(),
        toolCallIdsByBackgroundTaskId: new Map(),
        backgroundCommands: new Map(),
        persistentBackgroundTaskIds: new Set(),
        awaitingBackgroundHydration: new Set(),
        pendingInjectedReport: new Set(),
        earlyInjectedReportObserved: false,
        plans: new Map(),
        interrupted: false,
        finalized: false,
        finalizedStatus: null,
        promptSettled: false,
        promptSettledStatus: null,
        workAccepted: false,
        promptWireSettled,
        promptDispatched,
        foregroundIdle: yield* Deferred.make<void>(),
        promptSequence: 0,
        outcomeResumed: false,
        promptSentAt: null,
        promptStarted,
        promptUsage: undefined,
        backgroundFinalizeGeneration: 0,
        replyOpen: false,
        nativePromptId: undefined,
        lastProgressAt: 0,
        inactivityWatchdog: undefined,
      };
      const carryover = yield* Ref.getAndSet(carryoverSubagents, null);
      let rehydratedCarryoverSubagents: ReadonlyArray<ActiveAcpSubagent> = [];
      if (carryover !== null && carryover.sessionId === requestedSessionId) {
        rehydratedCarryoverSubagents = carryover.subagents;
        for (const subagent of carryover.subagents) {
          const nativeId = subagent.task.nativeTaskRef?.nativeId ?? null;
          if (nativeId !== null) {
            context.subagents.set(nativeId, subagent);
          }
          if (subagent.childSessionId !== null) {
            context.subagentsBySessionId.set(subagent.childSessionId, subagent);
          }
        }
      }
      yield* Ref.set(activeTurn, context);
      yield* Ref.set(stoppedRunQuarantine, false);
      const runningTurn = providerTurnPayload(context, "running", null);
      yield* emitProviderEvent({
        type: "provider_turn.updated",
        driver,
        threadId: turnInput.threadId,
        providerTurn: runningTurn,
      });
      const activeProviderThread: OrchestrationV2ProviderThread = {
        ...turnInput.providerThread,
        providerSessionId: input.providerSessionId,
        status: "active",
        contextUsage: context.contextUsage,
        nativeMetadata: context.nativeMetadata,
        updatedAt: startedAt,
      };
      yield* Ref.update(providerThreadByNativeSessionId, (current) =>
        new Map(current).set(requestedSessionId, activeProviderThread),
      );
      yield* emitProviderEvent({
        type: "provider_thread.updated",
        driver,
        providerThread: activeProviderThread,
      });
      yield* rememberSnapshotMessage({
        createdBy: turnInput.message.createdBy,
        creationSource: turnInput.message.creationSource,
        ...(turnInput.message.scheduledTaskId === undefined
          ? {}
          : { scheduledTaskId: turnInput.message.scheduledTaskId }),
        ...(turnInput.message.senderThreadId === undefined
          ? {}
          : { senderThreadId: turnInput.message.senderThreadId }),
        id: turnInput.message.messageId,
        threadId: turnInput.threadId,
        runId: turnInput.runId,
        nodeId: turnInput.rootNodeId,
        role: "user",
        text: turnInput.message.text,
        attachments: [...turnInput.message.attachments],
        streaming: false,
        createdAt: startedAt,
        updatedAt: startedAt,
      });
      if (followsAgentWorkState)
        yield* runtimeCallbackPermit.withPermit(syncNativeChildren(context));
      const attached = ctx.turnAttached;
      ctx.turnAttached = yield* Deferred.make<boolean>();
      yield* Deferred.succeed(attached, true);
      // Every attach ends the deferred-terminal contract, but only the
      // queued provider continuation owns wake traffic. A user turn may
      // start before that continuation and must leave its buffer intact.
      yield* projectDeferredCarryoverTerminals(rehydratedCarryoverSubagents);
      // Retain projected terminals during wake drain so monotonic guards reject replayed spawns.
      if (isContinuationTurn) {
        yield* Ref.set(continuationRequested, false);
        yield* Ref.update(wakeReports, ({ reports, offered }) => ({
          reports: new Map([...reports].filter(([key]) => !offered.has(key))),
          offered: noWakeReports.offered,
        }));
        const takeWakeBuffer = Ref.modify(wakeBuffer, (current) => {
          const next: Array<EffectAcpSchema.SessionNotification> = [];
          return [
            current.filter((notification) => notification.sessionId === requestedSessionId),
            next,
          ] as const;
        });
        if (followsAgentWorkState) {
          yield* runtimeCallbackPermit.withPermit(
            Effect.gen(function* () {
              const liveWork = ctx.agentWork;
              yield* Effect.forEach(yield* takeWakeBuffer, handleSessionUpdate, {
                discard: true,
              });
              ctx.agentWork = liveWork;
              context.workAccepted = true;
              yield* settleIdleWork(context);
            }),
          );
          return;
        }
        const drainedWakeCount = yield* takeWakeBuffer.pipe(
          Effect.tap((drained) =>
            Effect.forEach(drained, handleSessionUpdate, {
              concurrency: 1,
              discard: true,
            }),
          ),
          Effect.map((drained) => drained.length),
        );
        // A root woken after foreground idle ends on its next idle report.
        if (drainedWakeCount > 0 && ctx.rootForegroundWork !== undefined) {
          yield* runtimeCallbackPermit.withPermit(
            Effect.suspend(() => {
              if (ctx.rootForegroundWork === "idle") return finalizeTurn(context, "completed");
              context.workAccepted = true;
              return Effect.void;
            }),
          );
          return;
        }
        context.promptSettled = true;
        context.promptSettledStatus = "completed";
        // The replayed reply ended before the prompt counted as settled.
        yield* idleReportedSubagents(context);
        if (drainedWakeCount === 0) {
          if (continuationWasRequested && defersFinalizeForBackgroundWork) {
            if (hasDeferredBackgroundWork(context)) {
              yield* rearmDeferredFinalize(context);
            } else {
              yield* scheduleDeferredFinalize(context);
            }
          } else {
            yield* finalizeTurn(context, "completed");
          }
          return;
        }
        if (!context.finalized) {
          yield* schedulePostSettleHoldExpiry(context);
          if (hasDeferredBackgroundWork(context)) {
            yield* rearmDeferredFinalize(context);
          } else {
            yield* scheduleDeferredFinalize(context);
          }
        }
        return;
      }
      const checkPromptOutcome =
        flavor.watchPromptOutcome === undefined
          ? undefined
          : yield* flavor.watchPromptOutcome(requestedSessionId);
      const promptGeneration = yield* Ref.get(runtimeCallbackGeneration);
      const promptOptions = {
        dispatched: context.promptDispatched,
        released: context.foregroundIdle,
      };
      context.promptSentAt = yield* Clock.currentTimeMillis;
      if (promptInactivityTimeoutMillis !== undefined) {
        context.inactivityWatchdog = yield* watchPromptInactivity(
          context,
          promptGeneration,
          promptInactivityTimeoutMillis,
          checkPromptOutcome,
        ).pipe(Effect.forkIn(sessionScope));
      }
      const compactSession = isCompactionMessage(turnInput.message)
        ? flavor.compactSession
        : undefined;
      const initialAppContext =
        promptParts !== null && promptParts.appContextEntries.length > 0
          ? {
              entries: promptParts.appContextEntries,
              offered: context.appContextOffered,
              before: undefined,
              compactionMarker: promptParts.compactionMarker,
              sequence: ++context.appContextSequence,
            }
          : undefined;
      yield* followPrompt(
        context,
        (superseded) =>
          compactSession === undefined
            ? sendPromptWhenIdle(
                context,
                () => runtime.prompt({ prompt: promptParts!.prompt }, promptOptions),
                superseded,
              )
            : Deferred.succeed(context.promptDispatched, undefined).pipe(
                Effect.andThen(compactSession.compact(runtime, requestedSessionId)),
                Effect.as({
                  stopReason: "end_turn",
                } satisfies EffectAcpSchema.PromptResponse),
              ),
        {
          generation: promptGeneration,
          checkPromptOutcome,
          promptParts,
          appContext: initialAppContext,
          compactSession,
        },
      ).pipe(Effect.forkIn(sessionScope));
    },
    (effect, turnInput) => {
      const { driver } = pickBindCtx(ctx);
      return effect.pipe(
        Effect.mapError(
          (cause) =>
            new ProviderAdapter.ProviderAdapterTurnStartError({
              driver,
              threadId: turnInput.threadId,
              providerThreadId: turnInput.providerThread.id,
              runId: turnInput.runId,
              cause,
              // The prompt is sent from a forked fiber, and its failures settle the turn
              // instead of reaching here, so no prompt was sent when this fails.
              ...(refusedWithSessionIntact(cause) ? { refusedBeforePrompt: true } : {}),
            }),
        ),
      );
    },
  );
