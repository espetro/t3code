// @ts-nocheck scriptc#4381 factory split; helper types live in adapter.helpers.ts.
/* oxlint-disable typescript/no-unused-vars -- factory split; helpers own the typed surface */
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
  ACP_DEFERRED_FINALIZE_DEBOUNCE,
  ACP_HOST_SLEEP_TOLERANCE_MILLIS,
  ACP_OPEN_REPLY_QUIET_LIMIT,
  ACP_PROMPT_ACTIVITY_UPDATES,
  ACP_PROMPT_INACTIVITY_SLICE_MILLIS,
  ACP_SUBAGENT_TEXT_FLUSH_INTERVAL,
  ACP_SUBAGENT_TRAILING_DRAIN_POLL_MS,
  ACP_SUBAGENT_TRANSCRIPT_POLL_MS,
  ACP_TEXT_FLUSH_INTERVAL,
  AcpModelSelectionError,
  PROMPT_OUTCOME_CHECK_TIMEOUT,
  acpCompletedTurnShouldTerminalizeTool,
  acpIsMonitorChatter,
  acpMcpActivation,
  acpMcpContext,
  acpPerTurnPromptUsage,
  acpPostSettleContinuationOfferEvidence,
  acpPostSettleMonitorPromptShouldSuppress,
  acpPostSettleWakeEvidence,
  acpPostSettleWakeShouldBuffer,
  acpProviderItemNativeId,
  acpSubagentHasPendingBackgroundWork,
  acpSubagentStatusBlocksTurnSettlement,
  acpSubagentStatusIsTerminal,
  acpSupportsImagePrompts,
  acpUnfinishedStopMessage,
  appendToolContentText,
  canSwitchModelInSession,
  completedAtForStatus,
  emptySnapshotState,
  formatAcpAppContextEntry,
  mergeAcpAppContext,
  nativeThreadId,
  negotiatedCapabilities,
  providerRequestKind,
  readNegotiatedFlag,
  shouldPersistToolUpdate,
  stoppedToolStatus,
  subagentTranscriptRepliesSettled,
  textFromUnknown,
  toolStatus,
  unsentAcpAppContext,
  writeAcpMcpCallLauncher,
} from "./adapter.helpers.ts";
import type {
  AcpAdapterV2Options,
  AcpAdapterV2RuntimeInput,
  AcpAdapterV2SubagentUpdate,
  AcpAdapterV2UserInputRequest,
  AcpAppContextEntry,
  AcpCarryoverSubagents,
  AcpMcpContext,
  AcpNativeBuildConfiguration,
  AcpNativeChildSession,
  AcpRuntimeTeardownState,
  AcpSubagentTranscriptEntry,
  ActiveAcpSubagent,
  ActiveAcpTurn,
  ActiveTextSegment,
  ActiveTextStream,
  PendingRuntimeRequest,
  ProjectedToolStatus,
  PromptOutcomeCheck,
} from "./adapter.helpers.ts";
import {
  bindHandleSessionUpdate,
  bindWireAcpRuntimeHandlers,
  bindEmitTool,
  bindStartTurnUnlocked,
  bindFollowPrompt,
  bindConfigureSession,
  bindEmitSubagent,
  bindFinalizeTurn,
  bindProjectSubagentTranscriptEntry,
  bindSteerWithPrompt,
  bindStartReplacementAcpRuntime,
  bindSessionRuntime,
  bindEmitTextSegment,
  bindEmitPlan,
} from "./adapterSplits.ts";
export {
  ACP_PROTOCOL,
  acpPerTurnPromptUsage,
  acpScopedNativeId,
  AcpProviderCapabilitiesV2,
  acpUnfinishedStopMessage,
  acpToolCallSnippetEdit,
  acpToolCallDiffPatch,
  acpPostSettleWakeEvidence,
  acpPostSettleContinuationOfferEvidence,
  acpCompletedTurnShouldTerminalizeTool,
} from "./adapter.helpers.ts";
export type {
  AcpAdapterV2RuntimeInput,
  AcpAdapterV2NativeLogging,
  AcpAdapterV2UserInputRequest,
  AcpAdapterV2ExtensionContext,
  AcpAdapterV2Flavor,
  AcpSubagentSessionEvent,
  AcpAdapterV2SubagentUpdate,
  AcpSubagentTranscriptEntry,
  AcpAdapterV2Options,
} from "./adapter.helpers.ts";

export const makeAcpAdapterV2 = Effect.fn("makeAcpAdapterV2")(function* (
  options: AcpAdapterV2Options,
) {
  const random = yield* SecureRandom.SecureRandom;
  const fileSystem = yield* FileSystem.FileSystem;
  const childProcessSpawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  const agentScope = yield* AgentScope;
  const idAllocator = yield* IdAllocator.IdAllocatorV2;
  const host = yield* ProviderHost.ProviderHost;
  const mcpSessions = yield* McpProviderSessions.McpProviderSessions;
  const { flavor, selfInvocation: self } = options;
  const callLauncher = yield* writeAcpMcpCallLauncher(host.paths.stateDir);
  const readMcpContext = (threadId: ThreadId | null) =>
    threadId === null
      ? Effect.succeed(
          acpMcpContext(undefined, self, flavor.mcpOverHttp, flavor.deferMcpTools, callLauncher),
        )
      : mcpSessions
          .read(threadId)
          .pipe(
            Effect.map((session) =>
              acpMcpContext(session, self, flavor.mcpOverHttp, flavor.deferMcpTools, callLauncher),
            ),
          );
  const driver = flavor.driver;
  const continuationRequests = options.continuationRequests;

  const readCapabilities = Effect.gen(function* () {
    if (flavor.supportsNativeGoals === undefined) return flavor.capabilities;
    return {
      ...flavor.capabilities,
      turns: {
        ...flavor.capabilities.turns,
        supportsNativeGoals: yield* flavor.supportsNativeGoals,
      },
    };
  });

  return ProviderAdapter.ProviderAdapterV2.of({
    instanceId: options.instanceId,
    driver,
    checksVersionAtHandshake: flavor.checksVersionAtHandshake === true,
    getCapabilities: Effect.fn("AcpAdapter.getCapabilities")(function* () {
      return yield* readCapabilities;
    }),
    planSelectionTransition: Effect.fn("AcpAdapter.planSelectionTransition")(function (input) {
      return Effect.succeed(acpSelectionTransition(input));
    }),
    openSession: Effect.fn("AcpAdapterV2.openSession")(
      function* (input: ProviderAdapter.ProviderAdapterV2OpenSessionInput) {
        const sessionScope = yield* Effect.scope;
        let itemIdentityVersion: 2 | undefined =
          input.initialProviderItemIdentityVersion ??
          (input.initialNativeThreadId === undefined ? 2 : undefined);
        const providerNativeId = (nativeId: string) =>
          acpProviderItemNativeId({
            instanceId: options.instanceId,
            itemIdentityVersion,
            nativeId,
          });
        const providerNodeId = (nativeItemId: string) =>
          idAllocator.derive.nodeFromProviderItem({
            driver,
            nativeItemId: providerNativeId(nativeItemId),
          });
        const providerMessageId = (nativeItemId: string) =>
          idAllocator.derive.messageFromProviderItem({
            driver,
            nativeItemId: providerNativeId(nativeItemId),
          });
        const providerTurnItemId = (nativeItemId: string) =>
          idAllocator.derive.turnItemFromProviderItem({
            driver,
            nativeItemId: providerNativeId(nativeItemId),
          });
        const deriveProviderTurnId = (nativeTurnId: string) =>
          idAllocator.derive.providerTurn({
            driver,
            nativeTurnId: providerNativeId(nativeTurnId),
          });
        const useProviderThreadIdentity = (thread: OrchestrationV2ProviderThread): void => {
          itemIdentityVersion = thread.nativeMetadata?.itemIdentityVersion;
        };
        const terminalEnvironmentBySessionId = new Map<string, NodeJS.ProcessEnv>();
        interface PendingTerminalEnvironment {
          readonly environment: NodeJS.ProcessEnv | undefined;
          readonly claimUnknownSession: boolean;
          readonly sessionId: string | null;
        }
        let pendingTerminalEnvironment: PendingTerminalEnvironment | null = {
          environment: (yield* readMcpContext(input.threadId)).processEnvironment,
          claimUnknownSession: input.initialNativeThreadId === undefined,
          sessionId: input.initialNativeThreadId ?? null,
        };
        const prepareTerminalEnvironment = (
          mcpContext: AcpMcpContext,
          sessionId?: string,
        ): void => {
          pendingTerminalEnvironment = {
            environment: mcpContext.processEnvironment,
            claimUnknownSession: false,
            sessionId: sessionId ?? null,
          };
        };
        const prepareClaimableTerminalEnvironment = (mcpContext: AcpMcpContext): void => {
          pendingTerminalEnvironment = {
            environment: mcpContext.processEnvironment,
            claimUnknownSession: true,
            sessionId: null,
          };
        };
        const rememberTerminalEnvironment = (
          sessionId: string,
          mcpContext: AcpMcpContext,
        ): void => {
          const environment = mcpContext.processEnvironment;
          pendingTerminalEnvironment = null;
          if (environment === undefined) {
            terminalEnvironmentBySessionId.delete(sessionId);
          } else {
            terminalEnvironmentBySessionId.set(sessionId, environment);
          }
        };
        const clientTerminals: AcpClientTerminals | undefined =
          options.clientTerminals === undefined
            ? undefined
            : yield* makeAcpClientTerminals({
                defaultCwd: input.runtimePolicy.cwd ?? process.cwd(),
                environment: options.clientTerminals.environment,
                shellCommands: options.clientTerminals.shellCommands,
                environmentForSession: (sessionId) => {
                  const remembered = terminalEnvironmentBySessionId.get(sessionId);
                  if (remembered !== undefined) return remembered;
                  if (pendingTerminalEnvironment === null) return undefined;
                  if (
                    pendingTerminalEnvironment.sessionId === null &&
                    pendingTerminalEnvironment.claimUnknownSession
                  ) {
                    pendingTerminalEnvironment = {
                      ...pendingTerminalEnvironment,
                      sessionId,
                    };
                  }
                  return pendingTerminalEnvironment.sessionId === sessionId
                    ? pendingTerminalEnvironment.environment
                    : undefined;
                },
              }).pipe(
                Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, childProcessSpawner),
              );
        if (clientTerminals !== undefined) {
          yield* Scope.addFinalizer(sessionScope, clientTerminals.disposeAll);
        }
        const sessionScopedId = (sessionId: string, nativeId: string): string =>
          JSON.stringify([sessionId, nativeId]);
        const embeddedTerminalsByToolCallId = new Map<
          string,
          {
            readonly sessionId: string;
            readonly terminalIds: ReadonlyArray<string>;
            readonly toolCallId: string;
          }
        >();
        const toolCallIdsByAgentTerminalId = new Map<string, Set<string>>();
        const agentTerminalsById = new Map<string, AcpAgentTerminalState>();
        const rememberEmbeddedTerminals = (input: {
          readonly sessionId: string;
          readonly toolCallId: string;
          readonly terminalIds: ReadonlyArray<string>;
        }): void => {
          const toolCallKey = sessionScopedId(input.sessionId, input.toolCallId);
          for (const terminalId of embeddedTerminalsByToolCallId.get(toolCallKey)?.terminalIds ??
            []) {
            const terminalKey = sessionScopedId(input.sessionId, terminalId);
            const toolCallIds = toolCallIdsByAgentTerminalId.get(terminalKey);
            toolCallIds?.delete(input.toolCallId);
            if (toolCallIds?.size === 0) toolCallIdsByAgentTerminalId.delete(terminalKey);
          }
          embeddedTerminalsByToolCallId.delete(toolCallKey);
          embeddedTerminalsByToolCallId.set(toolCallKey, {
            sessionId: input.sessionId,
            terminalIds: input.terminalIds,
            toolCallId: input.toolCallId,
          });
          for (const terminalId of input.terminalIds) {
            const terminalKey = sessionScopedId(input.sessionId, terminalId);
            const toolCallIds = toolCallIdsByAgentTerminalId.get(terminalKey) ?? new Set<string>();
            toolCallIds.add(input.toolCallId);
            toolCallIdsByAgentTerminalId.set(terminalKey, toolCallIds);
          }
          for (const oldest of embeddedTerminalsByToolCallId.keys()) {
            if (embeddedTerminalsByToolCallId.size <= 256) break;
            const remembered = embeddedTerminalsByToolCallId.get(oldest);
            if (remembered === undefined) continue;
            for (const terminalId of remembered.terminalIds) {
              const terminalKey = sessionScopedId(remembered.sessionId, terminalId);
              const toolCallIds = toolCallIdsByAgentTerminalId.get(terminalKey);
              toolCallIds?.delete(remembered.toolCallId);
              if (toolCallIds?.size === 0) toolCallIdsByAgentTerminalId.delete(terminalKey);
            }
            embeddedTerminalsByToolCallId.delete(oldest);
          }
        };
        const embeddedTerminalCommands = (
          sessionId: string,
          toolCallId: string,
        ): ReadonlyArray<string> =>
          (
            embeddedTerminalsByToolCallId.get(sessionScopedId(sessionId, toolCallId))
              ?.terminalIds ?? []
          ).flatMap((terminalId) => {
            const command =
              clientTerminals?.readCommandLine(terminalId) ??
              agentTerminalsById.get(sessionScopedId(sessionId, terminalId))?.command;
            return command === undefined ? [] : [command];
          });
        // Client terminals run with server privileges; apply turn policy and prior user approvals.
        const clientPolicyGrants = makeAcpClientPolicyGrants();
        let latestRuntimePolicy: ProviderAdapter.ProviderAdapterV2RuntimePolicy =
          input.runtimePolicy;
        const events = yield* Queue.unbounded<ProviderAdapter.ProviderAdapterV2Event>();
        const activeTurn = yield* Ref.make<ActiveAcpTurn | null>(null);
        // Keyed by the agent's steer id; an injection can arrive before its send returns.
        const steerInjections = new Map<string, Deferred.Deferred<void>>();
        const steerInjection = (steerId: string) => {
          const existing = steerInjections.get(steerId);
          if (existing !== undefined) return existing;
          const created = Deferred.makeUnsafe<void>();
          steerInjections.set(steerId, created);
          return created;
        };
        let pendingStopCloseTurn: ActiveAcpTurn | null = null;
        let followsAgentWorkState = false;
        let postSettleContinuationEnabled = false;
        let defersFinalizeForBackgroundWork = false;
        let agentWork: Extract<
          EffectAcpSchema.SessionUpdate,
          { sessionUpdate: "state_update" }
        > | null = null;
        // The root's last reportForegroundWork state; undefined until the agent reports one.
        let rootForegroundWork: "running" | "idle" | undefined;
        const agentRequests = new Set<object>();
        const nativeChildren = new Map<string, AcpNativeChildSession>();
        const extractSubagentUpdate = (tool: AcpToolCallState) =>
          flavor.extractSubagentSessionEvent !== undefined && !followsAgentWorkState
            ? undefined
            : flavor.extractSubagentUpdate?.(tool);
        let turnAttached = yield* Deferred.make<boolean>();
        const activeSessionId = yield* Ref.make<string | null>(null);
        // Reported through hasPendingBackgroundWorkForThread so the run keeps ingesting their replies.
        const trailingTranscriptDrains = new Set<ActiveAcpSubagent>();
        const unreadToolCalls = makeAcpUnreadToolCalls();
        // session/load replays history before activeSessionId names the loaded session.
        const loadingSessionId = yield* Ref.make<string | null>(null);
        const contextUsageBySessionId = yield* Ref.make(
          new Map<string, ThreadTokenUsageSnapshot>(),
        );
        const nativeMetadataBySessionId = yield* Ref.make(
          new Map<string, OrchestrationV2ProviderThreadNativeMetadata>(),
        );
        const providerThreadByNativeSessionId = yield* Ref.make(
          new Map<string, OrchestrationV2ProviderThread>(),
        );
        const nativeBuildConfigurationBySessionId = new Map<string, AcpNativeBuildConfiguration>();
        const plansBySessionId = new Map<string, ActiveAcpTurn["plans"]>();
        const initialSessionActivationFailure = yield* Ref.make<{
          readonly sessionId: string;
          readonly error: EffectAcpErrors.AcpError;
        } | null>(null);
        const activeSessionSetup =
          yield* Ref.make<AcpSessionRuntime.AcpSessionRuntimeStartResult | null>(null);
        const lastPublishedCatalogKey = yield* Ref.make<{
          readonly epoch: number;
          readonly key: string | null;
        }>({ epoch: 0, key: null });
        const sessionConfigurationPublishPermit = yield* Semaphore.make(1);
        const resetPublishedCatalogKey = Ref.update(lastPublishedCatalogKey, (current) => ({
          epoch: current.epoch + 1,
          key: null,
        }));
        // Per-update session config publication shares the enclosing session update/config span.
        const publishSessionConfiguration = Effect.fnUntraced(function* (
          targetRuntime: AcpSessionRuntime.AcpSessionRuntime["Service"],
        ) {
          const onSessionConfigurationUpdate = flavor.onSessionConfigurationUpdate;
          if (onSessionConfigurationUpdate === undefined) return;
          yield* sessionConfigurationPublishPermit.withPermit(
            Effect.gen(function* () {
              const { epoch, key } = yield* Ref.get(lastPublishedCatalogKey);
              const configOptions = yield* targetRuntime.getConfigOptions;
              const modeState = yield* targetRuntime.getModeState;
              const modelState = (yield* Ref.get(activeSessionSetup))?.sessionSetupResult.models;
              const nextKey = yield* onSessionConfigurationUpdate(
                configOptions,
                modeState,
                modelState,
                { lastCatalogKey: key },
              );
              if (nextKey === null || typeof nextKey === "string") {
                yield* Ref.update(lastPublishedCatalogKey, (current) =>
                  current.epoch === epoch ? { epoch, key: nextKey } : current,
                );
              }
            }),
          );
        });
        const setActiveSessionSetup = Effect.fnUntraced(function* (
          setup: AcpSessionRuntime.AcpSessionRuntimeStartResult,
        ) {
          followsAgentWorkState =
            flavor.followAgentWorkState === true &&
            continuationRequests !== undefined &&
            setup.initializeResult.protocolVersion === 2;
          postSettleContinuationEnabled =
            continuationRequests !== undefined &&
            readNegotiatedFlag(flavor.enablePostSettleContinuation, setup.initializeResult);
          defersFinalizeForBackgroundWork = readNegotiatedFlag(
            flavor.deferFinalizeForBackgroundWork,
            setup.initializeResult,
          );
          agentWork = null;
          rootForegroundWork = undefined;
          agentRequests.clear();
          nativeChildren.clear();
          yield* Ref.set(activeSessionSetup, setup);
          yield* resetPublishedCatalogKey;
        });
        const activeSelection = yield* Ref.make<ModelSelection | null>(null);
        const activeInteractionMode = yield* Ref.make<ProviderInteractionMode | null>(null);
        // Mode values configureSession left the agent in; a later difference is the agent's own change.
        const configuredModes = yield* Ref.make<ReadonlyMap<string, string>>(new Map());
        const readModes = Effect.gen(function* () {
          const modes = new Map<string, string>();
          for (const option of yield* runtime.getConfigOptions) {
            if (
              option.type === "select" &&
              (option.category === "mode" || option.category === "collaboration_mode")
            ) {
              modes.set(option.id, option.currentValue);
            }
          }
          const modeId = (yield* runtime.getModeState)?.currentModeId;
          if (modeId !== undefined && !modes.has(ACP_SESSION_MODE_OPTION_ID)) {
            modes.set(ACP_SESSION_MODE_OPTION_ID, modeId);
          }
          return modes;
        });
        const configuredRuntimeMode = yield* Ref.make<
          ProviderAdapter.ProviderAdapterV2RuntimePolicy["runtimeMode"] | null
        >(null);
        const promptInstructionStates = yield* Ref.make(new Map<string, T3AcpInstructionState>());
        const promptRuntimeInstructions = yield* Ref.make(new Map<string, string>());
        const deliveredAppContext = yield* Ref.make(new Map<string, ReadonlyMap<string, string>>());
        // Unique markers keep delayed prompt completions from clearing later compactions.
        const compactionMarkers = yield* Ref.make(new Map<string, symbol>());
        // ACP may patch a completed compaction again; each compaction id marks its session once.
        const completedCompactionIds = yield* Ref.make(new Set<string>());
        // The next prompt in a compacted session resends T3's instructions and runtime notes.
        // Only root sessions get prompts, so a marker on a child session is never read.
        const markSessionCompacted = Effect.fn("AcpAdapterV2.markSessionCompacted")(function* (
          sessionId: string,
          compactionId?: string,
        ) {
          if (compactionId !== undefined) {
            const key = `${sessionId}\u0000${compactionId}`;
            const alreadyMarked = yield* Ref.modify(
              completedCompactionIds,
              (current): [boolean, Set<string>] =>
                current.has(key) ? [true, current] : [false, new Set(current).add(key)],
            );
            if (alreadyMarked) return;
          }
          yield* Ref.update(compactionMarkers, (current) =>
            new Map(current).set(sessionId, Symbol()),
          );
          yield* Ref.update(deliveredAppContext, (current) => {
            if (!current.has(sessionId)) return current;
            const updated = new Map(current);
            updated.delete(sessionId);
            return updated;
          });
          const currentTurn = yield* Ref.get(activeTurn);
          if (currentTurn !== null && currentTurn.nativeThreadId === sessionId) {
            currentTurn.appContextOffered = undefined;
            currentTurn.appContextCommittedSequence.clear();
          }
        });
        const advertisedCommandNames = yield* SubscriptionRef.make(
          new Map<string, ReadonlySet<string>>(),
        );
        const compactsContext =
          flavor.supportsCompaction === true ||
          flavor.compactSession !== undefined ||
          flavor.compactViaAdvertisedCommand === true;
        const runtimeRestartRequired = yield* Ref.make(false);
        const runtimeTeardownState = yield* Ref.make<AcpRuntimeTeardownState>({ _tag: "Idle" });
        const runtimeCallbackGeneration = yield* Ref.make(0);
        const runtimeCallbackGenerationCounter = yield* Ref.make(0);
        const allocateRuntimeCallbackGeneration = Ref.updateAndGet(
          runtimeCallbackGenerationCounter,
          (generation) => generation + 1,
        );
        const advanceRuntimeCallbackGeneration = allocateRuntimeCallbackGeneration.pipe(
          Effect.tap((generation) => Ref.set(runtimeCallbackGeneration, generation)),
        );
        const runtimeCallbackPermit = yield* Semaphore.make(1);
        const runtimeTransitionPermit = yield* Semaphore.make(1);
        const nativeResponseAcknowledgements = yield* Ref.make(
          new Map<
            string,
            {
              readonly acknowledgement: Deferred.Deferred<void, EffectAcpErrors.AcpError>;
              readonly generation: number;
            }
          >(),
        );
        const pendingRuntimeRequests = yield* Ref.make(new Map<string, PendingRuntimeRequest>());
        const emitNativeResponseLifecycle =
          options.testHooks?.onNativeResponseLifecycle ?? (() => Effect.void);
        const nextElicitationOrdinal = yield* Ref.make(0);
        const snapshot = yield* Ref.make(emptySnapshotState());

        const awaitRuntimeTeardown = Effect.fnUntraced(function* () {
          const state = yield* Ref.get(runtimeTeardownState);
          if (state._tag === "InProgress") {
            yield* Deferred.await(state.completed);
          } else if (state._tag === "Failed") {
            return yield* state.error;
          }
        });
        const runRuntimeCallbackAtGeneration = <A, E, R>(
          generation: number,
          effect: Effect.Effect<A, E, R>,
        ) =>
          runtimeCallbackPermit.withPermit(
            Effect.gen(function* () {
              if ((yield* Ref.get(runtimeTeardownState))._tag !== "Idle") {
                return Option.none<A>();
              }
              if ((yield* Ref.get(runtimeCallbackGeneration)) !== generation) {
                return Option.none<A>();
              }
              return Option.some(yield* effect);
            }),
          );
        const registerNativeResponseAcknowledgement =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (
            generation: number,
            transportRequestId: string,
            acknowledgement: Deferred.Deferred<void, EffectAcpErrors.AcpError>,
          ) {
            yield* Ref.update(nativeResponseAcknowledgements, (current) => {
              const updated = new Map(current);
              updated.set(transportRequestId, { acknowledgement, generation });
              return updated;
            });
            yield* emitNativeResponseLifecycle({
              type: "registered",
              generation,
              requestId: transportRequestId,
            });
            if (!(yield* Deferred.isDone(acknowledgement))) return;
            yield* Ref.update(nativeResponseAcknowledgements, (current) => {
              if (current.get(transportRequestId)?.acknowledgement !== acknowledgement) {
                return current;
              }
              const updated = new Map(current);
              updated.delete(transportRequestId);
              return updated;
            });
          });
        const acknowledgeNativeResponse = (generation: number, transportRequestId: string) =>
          runRuntimeCallbackAtGeneration(generation, Effect.void).pipe(
            Effect.flatMap((registered) =>
              Option.isSome(registered)
                ? Effect.void
                : emitNativeResponseLifecycle({
                    type: "admission_rejected",
                    generation,
                    requestId: transportRequestId,
                  }).pipe(
                    Effect.andThen(
                      new EffectAcpErrors.AcpTransportError({
                        detail: "The ACP runtime closed before its response could be admitted",
                        cause: "Native response registration rejected during teardown",
                      }),
                    ),
                  ),
            ),
          );
        const awaitNativeResponseAcknowledgements = Effect.fnUntraced(function* (
          acknowledgements: ReadonlyArray<
            readonly [string | undefined, Deferred.Deferred<void, EffectAcpErrors.AcpError>]
          >,
        ) {
          if (acknowledgements.length === 0) return true;
          const completed = yield* Deferred.make<"settled" | "timeout">();
          yield* emitNativeResponseLifecycle({ type: "watcher_started" });
          const acknowledgementFiber = yield* Effect.forEach(
            acknowledgements,
            ([, acknowledgement]) => Deferred.await(acknowledgement).pipe(Effect.exit),
            { concurrency: "unbounded", discard: true },
          ).pipe(
            Effect.andThen(Deferred.succeed(completed, "settled")),
            Effect.interruptible,
            Effect.ensuring(emitNativeResponseLifecycle({ type: "watcher_exited" })),
            Effect.forkDetach,
          );
          yield* emitNativeResponseLifecycle({ type: "timer_started" });
          const timerFiber = yield* Effect.sleep("2 seconds").pipe(
            Effect.andThen(Deferred.succeed(completed, "timeout")),
            Effect.interruptible,
            Effect.ensuring(emitNativeResponseLifecycle({ type: "timer_exited" })),
            Effect.forkDetach,
          );
          const outcome = yield* Deferred.await(completed);
          yield* Fiber.interrupt(acknowledgementFiber);
          yield* Fiber.interrupt(timerFiber);
          if (outcome === "settled") return true;

          yield* Ref.update(nativeResponseAcknowledgements, (current) => {
            const updated = new Map(current);
            for (const [requestId, acknowledgement] of acknowledgements) {
              if (
                requestId !== undefined &&
                updated.get(requestId)?.acknowledgement === acknowledgement
              ) {
                updated.delete(requestId);
              }
            }
            return updated;
          });
          yield* Effect.forEach(
            acknowledgements,
            ([requestId]) =>
              emitNativeResponseLifecycle({
                type: "removed",
                ...(requestId === undefined ? {} : { requestId }),
              }),
            { concurrency: "unbounded", discard: true },
          );
          const timeoutError = new EffectAcpErrors.AcpTransportError({
            detail: "Timed out waiting for an admitted ACP response to reach the transport queue",
            cause: "Native response acknowledgement timed out",
          });
          yield* Effect.forEach(
            acknowledgements,
            ([requestId, acknowledgement]) =>
              Deferred.fail(acknowledgement, timeoutError).pipe(
                Effect.andThen(
                  emitNativeResponseLifecycle({
                    type: "failed",
                    ...(requestId === undefined ? {} : { requestId }),
                  }),
                ),
              ),
            { concurrency: "unbounded", discard: true },
          );
          return false;
        });
        const awaitAdmittedNativeResponses = Ref.get(nativeResponseAcknowledgements).pipe(
          Effect.flatMap((current) =>
            awaitNativeResponseAcknowledgements(
              [...current.entries()].map(
                ([requestId, entry]) => [requestId, entry.acknowledgement] as const,
              ),
            ),
          ),
        );
        const quarantineNativeTransportAtGeneration = Effect.fnUntraced(function* (
          generation: number,
        ) {
          const quarantined = yield* Ref.modify(nativeResponseAcknowledgements, (current) => {
            const updated = new Map(current);
            const acknowledgements: Array<Deferred.Deferred<void, EffectAcpErrors.AcpError>> = [];
            for (const [requestId, entry] of updated) {
              if (entry.generation !== generation) continue;
              updated.delete(requestId);
              acknowledgements.push(entry.acknowledgement);
            }
            return [acknowledgements, updated] as const;
          });
          const error = new EffectAcpErrors.AcpTransportError({
            detail: "The ACP runtime was replaced before its response reached the transport queue",
            cause: "ACP runtime transport was quarantined during teardown",
          });
          yield* Effect.forEach(
            quarantined,
            (acknowledgement) => Deferred.fail(acknowledgement, error),
            { concurrency: "unbounded", discard: true },
          );
        });
        const closeNativeTransport = runtimeCallbackPermit.withPermit(
          Effect.gen(function* () {
            yield* advanceRuntimeCallbackGeneration;
            const acknowledgements = yield* Ref.getAndSet(
              nativeResponseAcknowledgements,
              new Map(),
            );
            const error = new EffectAcpErrors.AcpTransportError({
              detail: "The ACP session closed before its admitted response reached the transport",
              cause: "ACP session transport closed",
            });
            yield* Effect.forEach(
              acknowledgements,
              ([requestId, entry]) =>
                Deferred.fail(entry.acknowledgement, error).pipe(
                  Effect.andThen(
                    emitNativeResponseLifecycle({
                      type: "removed",
                      generation: entry.generation,
                      requestId,
                    }),
                  ),
                  Effect.andThen(
                    emitNativeResponseLifecycle({
                      type: "failed",
                      generation: entry.generation,
                      requestId,
                    }),
                  ),
                ),
              { concurrency: "unbounded", discard: true },
            );
            return acknowledgements.size > 0;
          }),
        );
        const lastTurnRoute = yield* Ref.make<{
          readonly threadId: ThreadId;
          readonly providerThreadId: ProviderThreadId;
        } | null>(null);
        const wakeBuffer = yield* Ref.make<Array<EffectAcpSchema.SessionNotification>>([]);
        const noWakeReports = {
          reports: new Map<string, BackgroundWorkReport>(),
          offered: new Set<string>(),
        };
        const wakeReports = yield* Ref.make<{
          readonly reports: ReadonlyMap<string, BackgroundWorkReport>;
          readonly offered: ReadonlySet<string>;
        }>(noWakeReports);
        const recordWakeReport = Effect.fnUntraced(function* (
          key: string,
          report: BackgroundWorkReport,
        ) {
          const context = yield* Ref.get(activeTurn);
          if (context !== null && !context.promptSettled && !context.finalized) return;
          yield* Ref.update(wakeReports, ({ reports, offered }) => ({
            reports: new Map(reports).set(key, report),
            offered,
          }));
        });
        const continuationRequested = yield* Ref.make(false);
        const continuationGeneration = yield* Ref.make(0);
        const continuationPermit = yield* Semaphore.make(1);
        const continuationClosed = yield* Ref.make(false);
        // Quarantine stopped-run events so they cannot wake or attach to later runs.
        const stoppedRunQuarantine = yield* Ref.make(false);
        // Native subagents can outlive interrupts; carry lineage forward to finish their original turn items.
        const carryoverSubagents = yield* Ref.make<AcpCarryoverSubagents | null>(null);
        const handledBackgroundTaskIdsInActiveTurn = yield* Ref.make<ReadonlySet<string>>(
          new Set(),
        );
        const midTurnUnreportedCompletedTaskIds = yield* Ref.make<ReadonlySet<string>>(new Set());
        // Grok re-prompts on stale monitor notices; suppress output until a genuine terminal or app turn.
        const suppressPostSettleMonitorPrompt = yield* Ref.make(false);
        const runningBackgroundTaskIds = yield* Ref.make<ReadonlySet<string>>(new Set());
        // Background command task id → the completed turn that owns its row. Ended commands stay,
        // bounded, so a later authoritative terminal still corrects the row on its run.
        const detachedBackgroundCommands = yield* Ref.make<ReadonlyMap<string, ActiveAcpTurn>>(
          new Map(),
        );
        const endedDetachedBackgroundCommandLimit = 16;
        const detachedBackgroundCommandTurn = (taskId: string) =>
          Ref.get(detachedBackgroundCommands).pipe(Effect.map((turns) => turns.get(taskId)));
        /** The turn a background task's terminal belongs to: its detached turn, else the live one. */
        const backgroundCommandTurn = Effect.fnUntraced(function* (taskId: string) {
          const detached = yield* detachedBackgroundCommandTurn(taskId);
          if (detached !== undefined) return detached;
          const active = yield* Ref.get(activeTurn);
          return active?.finalized === false ? active : undefined;
        });
        const detachBackgroundCommands = (context: ActiveAcpTurn) =>
          Ref.update(detachedBackgroundCommands, (current) => {
            const next = new Map(current);
            for (const taskId of context.backgroundCommands.keys()) next.set(taskId, context);
            const ended = [...next].filter(([taskId, turn]) => {
              const toolCallId = turn.toolCallIdsByBackgroundTaskId.get(taskId);
              const tool = toolCallId === undefined ? undefined : turn.tools.get(toolCallId);
              const status = tool === undefined ? "completed" : toolStatus(tool.status);
              return status !== "pending" && status !== "running";
            });
            for (const [taskId] of ended.slice(0, -endedDetachedBackgroundCommandLimit)) {
              next.delete(taskId);
            }
            return next;
          });
        // Tombstones prevent mid-stream exit_code 0 and stale monitor events from resurrecting ended tasks.
        const endedBackgroundTaskIds = yield* Ref.make<ReadonlySet<string>>(new Set());
        const endedBackgroundTaskIdLimit = 128;

        const setBackgroundTaskRunning =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (taskId: string, running: boolean) {
            if (running && (yield* Ref.get(endedBackgroundTaskIds)).has(taskId)) {
              return;
            }
            yield* Ref.update(runningBackgroundTaskIds, (current) => {
              if (current.has(taskId) === running) return current;
              const next = new Set(current);
              if (running) {
                next.add(taskId);
              } else {
                next.delete(taskId);
              }
              return next;
            });
          });

        const markBackgroundTaskEnded = (taskId: string) =>
          Ref.update(endedBackgroundTaskIds, (current) => {
            if (current.has(taskId)) return current;
            const next = new Set(current).add(taskId);
            for (const oldest of next) {
              if (next.size <= endedBackgroundTaskIdLimit) break;
              next.delete(oldest);
            }
            return next;
          }).pipe(Effect.andThen(setBackgroundTaskRunning(taskId, false)));

        const applyBackgroundTaskMutationRunning = (mutation: {
          readonly taskId: string;
          readonly status: "running" | "completed" | "failed";
        }) =>
          mutation.status === "running"
            ? setBackgroundTaskRunning(mutation.taskId, true)
            : markBackgroundTaskEnded(mutation.taskId);

        const trackRunningBackgroundTools =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (
            notification: EffectAcpSchema.SessionNotification,
          ): Effect.fn.Return<void> {
            if (flavor.extractBackgroundTaskId === undefined) return;
            for (const event of parseSessionUpdateEvent(notification).events) {
              if (event._tag !== "ToolCallUpdated") continue;
              const toolCall = flavor.normalizeToolCall?.(event.toolCall) ?? event.toolCall;
              const taskId = flavor.extractBackgroundTaskId(toolCall);
              if (taskId === undefined) continue;
              const status = toolStatus(toolCall.status);
              yield* setBackgroundTaskRunning(taskId, status === "pending" || status === "running");
            }
          });

        const emitProviderEvent = (event: ProviderAdapter.ProviderAdapterV2Event) =>
          Queue.offer(events, event).pipe(Effect.asVoid);
        const withModelContextWindow = Effect.fnUntraced(function* (
          sessionId: string,
          usage: ThreadTokenUsageSnapshot,
        ) {
          if (sessionId !== (yield* Ref.get(activeSessionId))) return usage;
          const selection = yield* Ref.get(activeSelection);
          const setup = yield* Ref.get(activeSessionSetup);
          if (selection === null || setup === null) return usage;
          const maxTokens = flavor.getModelContextWindow?.(selection, setup);
          return maxTokens === undefined ? usage : { ...usage, maxTokens };
        });
        const publishProviderThreadState = Effect.fnUntraced(function* (
          sessionId: string,
          context: ActiveAcpTurn | null,
        ) {
          const knownProviderThread = (yield* Ref.get(providerThreadByNativeSessionId)).get(
            sessionId,
          );
          if (knownProviderThread === undefined) return;
          const now = yield* DateTime.now;
          const providerThread: OrchestrationV2ProviderThread = {
            ...knownProviderThread,
            // The settled turn's snapshot is still cached as active; no turn runs now.
            ...(context === null && knownProviderThread.status === "active"
              ? { status: "idle" as const }
              : {}),
            contextUsage:
              (yield* Ref.get(contextUsageBySessionId)).get(sessionId) ??
              knownProviderThread.contextUsage ??
              null,
            nativeMetadata:
              (yield* Ref.get(nativeMetadataBySessionId)).get(sessionId) ??
              knownProviderThread.nativeMetadata ??
              null,
            updatedAt: now,
          };
          yield* Ref.update(providerThreadByNativeSessionId, (current) =>
            new Map(current).set(sessionId, providerThread),
          );
          yield* emitProviderEvent({
            type: "provider_thread.updated",
            driver,
            providerThread,
            // Agents like Kimi report usage after the prompt settles, when no run receives it.
            ...(context === null ? { sessionScoped: true } : {}),
          });
        });
        // Replayed history only records the snapshot; `ensureThread` publishes it.
        const projectExtractedContextUsage = Effect.fnUntraced(function* (
          notification: EffectAcpSchema.SessionNotification,
          live: boolean,
        ) {
          if (notification.update.sessionUpdate === "usage_update") return;
          const reportedUsage = flavor.extractContextUsage?.(notification);
          if (reportedUsage === undefined) return;
          const previous = (yield* Ref.get(contextUsageBySessionId)).get(notification.sessionId);
          const usage = yield* withModelContextWindow(notification.sessionId, {
            ...previous,
            ...reportedUsage,
          });
          if (previous !== undefined && Equal.equals(previous, usage)) return;
          yield* Ref.update(contextUsageBySessionId, (current) =>
            new Map(current).set(notification.sessionId, usage),
          );
          const context = yield* Ref.get(activeTurn);
          if (context?.nativeThreadId === notification.sessionId) context.contextUsage = usage;
          if (live) yield* publishProviderThreadState(notification.sessionId, context);
        });
        let scheduleDeferredFinalize: (context: ActiveAcpTurn) => Effect.Effect<void> = () =>
          Effect.void;
        let refreshModelSwitchCapability: Effect.Effect<void> = Effect.void;
        let reportStartupPhase: (phase: string | undefined) => Effect.Effect<void> = () =>
          Effect.void;
        // openSession configures the session itself; a late setup that lands
        // first waits here and is adopted once that configuration is in place.
        const lateSessionSetup: {
          openSessionConfigured: boolean;
          pending: Effect.Effect<void> | null;
        } = { openSessionConfigured: false, pending: null };

        const nativeLogging = options.nativeLogging?.(input.threadId);
        const promptInactivityTimeoutMillis =
          flavor.promptInactivityTimeout === undefined
            ? undefined
            : Duration.toMillis(flavor.promptInactivityTimeout);
        // Each runtime owns its unanswered agent requests, so a dead process's leftovers
        // and late callbacks never reach its replacement.
        let openAgentRequests = new Set<string>();
        const notePromptProgress =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (notification?: EffectAcpSchema.SessionNotification) {
            if (
              promptInactivityTimeoutMillis === undefined &&
              flavor.postSettleCommandHold === undefined
            ) {
              return;
            }
            if (
              notification !== undefined &&
              !ACP_PROMPT_ACTIVITY_UPDATES.has(notification.update.sessionUpdate)
            ) {
              return;
            }
            const context = yield* Ref.get(activeTurn);
            if (
              context === null ||
              (notification !== undefined &&
                notification.sessionId !== context.nativeThreadId &&
                !context.subagentsBySessionId.has(notification.sessionId))
            ) {
              return;
            }
            context.lastProgressAt = yield* Clock.currentTimeMillis;
          });
        const closeAgentRequest = (agentRequests: Set<string>, requestId: string) =>
          Effect.suspend(() =>
            agentRequests.delete(requestId) && agentRequests === openAgentRequests
              ? notePromptProgress()
              : Effect.void,
          );
        const handleRuntimeTerminationAtGeneration = (runtimeGeneration: number) =>
          runRuntimeCallbackAtGeneration(
            runtimeGeneration,
            Effect.gen(function* () {
              yield* Ref.set(runtimeRestartRequired, true);
              if (!followsAgentWorkState) {
                // An open prompt fails with its transport. A turn held open for a running tool
                // has no prompt, so nothing else ends it.
                const held = yield* Ref.get(activeTurn);
                if (
                  flavor.toolOutlivesPrompt === undefined ||
                  held === null ||
                  !held.promptSettled ||
                  held.finalized ||
                  !hasDeferredBackgroundWork(held)
                )
                  return;
                for (const tool of held.tools.values()) {
                  const status = toolStatus(tool.status);
                  if (status === "pending" || status === "running" || status === "waiting") {
                    yield* emitTool(held, tool, "failed");
                  }
                }
                yield* finalizeTurn(
                  held,
                  "failed",
                  makeProviderFailure({ class: "transport_error" }),
                );
                return;
              }
              agentWork = { sessionUpdate: "state_update", state: "idle", stopReason: "error" };
              for (const child of nativeChildren.values()) {
                if (child.status !== "running") continue;
                child.status = "failed";
                child.result = null;
              }
              for (const child of nativeChildren.values()) {
                if (
                  child.subagent === undefined ||
                  acpSubagentStatusIsTerminal(child.subagent.task.status)
                )
                  continue;
                child.result = null;
                yield* publishNativeChildStatus(child, "failed");
              }
              agentRequests.clear();
              yield* Ref.set(wakeBuffer, []);
              yield* Ref.set(continuationRequested, false);
              yield* cancelPendingRuntimeRequests();
              const context = yield* Ref.get(activeTurn);
              if (context !== null) {
                if (!context.finalized && !context.interrupted) {
                  yield* terminalizeOpenForegroundTools(context, "failed");
                }
                yield* finalizeTurn(
                  context,
                  "failed",
                  makeProviderFailure({ class: "transport_error" }),
                );
              }
            }),
          ).pipe(Effect.asVoid);
        // A tool-call notification that was dropped may have named a path, so the calls it
        // could describe are recorded before the next message is read.
        const noteUndecodableNotification = Effect.fn("AcpAdapterV2.noteUndecodableNotification")(
          function* (method: string, payload: unknown) {
            const unread = unreadToolCallUpdate(method, payload);
            if (unread === undefined) return;
            const fromRootSession =
              unread.sessionId === undefined ||
              unread.sessionId === (yield* Ref.get(activeSessionId));
            unreadToolCalls.add(
              unread,
              fromRootSession ? ((yield* Ref.get(activeTurn))?.tools.keys() ?? []) : [],
            );
          },
        );
        const makeRuntimeInput = (
          runtimeGeneration: number,
          agentRequests: Set<string>,
          mcpContext: AcpMcpContext,
          resumeSessionId?: string,
          onTermination: AcpAdapterV2RuntimeInput["onTermination"] = () =>
            handleRuntimeTerminationAtGeneration(runtimeGeneration),
        ): AcpAdapterV2RuntimeInput => {
          return {
            cwd: input.runtimePolicy.cwd ?? process.cwd(),
            runtimePolicy: input.runtimePolicy,
            ...(input.runtimePolicy.workspace === undefined
              ? {}
              : { extraRoots: input.runtimePolicy.workspace.extraRoots }),
            mcpServers: mcpContext.servers,
            acpMcpServers: mcpContext.acpServers,
            httpMcpServers: mcpContext.httpServers,
            ...(mcpContext.processEnvironment === undefined
              ? {}
              : { processEnvironment: mcpContext.processEnvironment }),
            ...(resumeSessionId === undefined ? {} : { resumeSessionId }),
            interruptPromptOnCancel: flavor.interruptPromptOnCancel ?? false,
            clientCapabilities: {
              fs: {
                readTextFile: flavor.clientFileSystem !== undefined,
                writeTextFile: flavor.clientFileSystem?.writeTextFile !== undefined,
              },
              terminal: clientTerminals !== undefined,
              elicitation: { form: {}, ...(flavor.onUrlElicitation ? { url: {} } : {}) },
              ...(flavor.clientCapabilitiesMeta ? { _meta: flavor.clientCapabilitiesMeta } : {}),
            },
            clientInfo: { name: "t3-code", version: "0.0.0" },
            onTermination: (error) =>
              Effect.sync(() => agentRequests.clear()).pipe(Effect.andThen(onTermination(error))),
            ...(promptInactivityTimeoutMillis === undefined
              ? {}
              : {
                  onIncomingRequest: (requestId: string) =>
                    Effect.sync(() => {
                      agentRequests.add(requestId);
                    }),
                }),
            onUndecodableNotification: noteUndecodableNotification,
            onOutgoingResponseFailure: (requestId, error) =>
              Ref.modify(nativeResponseAcknowledgements, (current) => {
                const entry = current.get(requestId);
                if (entry === undefined || entry.generation !== runtimeGeneration) {
                  return [
                    emitNativeResponseLifecycle({
                      type: "late_noop",
                      generation: runtimeGeneration,
                      requestId,
                    }),
                    current,
                  ] as const;
                }
                const updated = new Map(current);
                updated.delete(requestId);
                return [
                  Deferred.fail(entry.acknowledgement, error).pipe(
                    Effect.andThen(
                      emitNativeResponseLifecycle({
                        type: "removed",
                        generation: runtimeGeneration,
                        requestId,
                      }),
                    ),
                    Effect.asVoid,
                  ),
                  updated,
                ] as const;
              }).pipe(Effect.flatten, Effect.andThen(closeAgentRequest(agentRequests, requestId))),
            onOutgoingResponse: (requestId) =>
              Ref.modify(nativeResponseAcknowledgements, (current) => {
                const entry = current.get(requestId);
                if (entry === undefined || entry.generation !== runtimeGeneration) {
                  return [
                    emitNativeResponseLifecycle({
                      type: "late_noop",
                      generation: runtimeGeneration,
                      requestId,
                    }),
                    current,
                  ] as const;
                }
                const updated = new Map(current);
                updated.delete(requestId);
                return [
                  Deferred.succeed(entry.acknowledgement, undefined).pipe(
                    Effect.andThen(
                      emitNativeResponseLifecycle({
                        type: "removed",
                        generation: runtimeGeneration,
                        requestId,
                      }),
                    ),
                    Effect.asVoid,
                  ),
                  updated,
                ] as const;
              }).pipe(Effect.flatten, Effect.andThen(closeAgentRequest(agentRequests, requestId))),
            ...(nativeLogging?.requestLogger === undefined
              ? {}
              : { requestLogger: nativeLogging.requestLogger }),
            protocolLogging: nativeLogging?.protocolLogging ?? {
              logIncoming: false,
              logOutgoing: false,
              logger: () => Effect.void,
            },
          };
        };
        let runtimeScope: Scope.Closeable | undefined;
        let runtime!: AcpSessionRuntime.AcpSessionRuntime["Service"];
        let runtimeMcpBridge: AcpMcpOverAcpBridge | undefined;
        yield* Effect.addFinalizer(() =>
          runtimeScope === undefined
            ? Effect.void
            : Scope.close(runtimeScope, Exit.void).pipe(Effect.ignore),
        );

        const resolveItemOrdinal = (context: ActiveAcpTurn, nativeItemId: string) =>
          Effect.sync(() => {
            const existing = context.itemOrdinals.get(nativeItemId);
            if (existing !== undefined) return existing;
            const ordinal = context.input.providerTurnOrdinal * 100 + context.itemOrdinals.size + 1;
            context.itemOrdinals.set(nativeItemId, ordinal);
            return ordinal;
          });

        const resolveSubagentChildOrdinal = (subagent: ActiveAcpSubagent, nativeItemId: string) => {
          const existing = subagent.childItemOrdinals.get(nativeItemId);
          if (existing !== undefined) return existing;
          const ordinal = subagent.nextChildOrdinal++;
          subagent.childItemOrdinals.set(nativeItemId, ordinal);
          return ordinal;
        };

        const emitProviderRetry = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          status: "running" | "completed" | "interrupted" | "cancelled",
        ) {
          const state = context.providerRetry;
          if (state === undefined) return;
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver,
            turnItem: makeProviderRetryTurnItem({
              driver,
              threadId: context.input.threadId,
              runId: context.input.runId,
              nodeId: context.input.rootNodeId,
              providerThreadId: context.input.providerThread.id,
              providerTurnId: context.providerTurnId,
              ...state,
              status,
              updatedAt: yield* DateTime.now,
            }),
          });
          if (status !== "running") context.providerRetry = undefined;
        });

        const reportProviderRetry = Effect.fnUntraced(function* (notice: {
          readonly sessionId: string;
          readonly failure: OrchestrationV2ProviderFailure;
        }) {
          const context = yield* Ref.get(activeTurn);
          if (
            context === null ||
            context.finalized ||
            context.interrupted ||
            context.nativeThreadId !== notice.sessionId ||
            (yield* Ref.get(stoppedRunQuarantine))
          )
            return;
          const previous = context.providerRetry;
          context.providerRetry = {
            failure: notice.failure,
            retry: {
              attempt: (previous?.retry.attempt ?? 0) + 1,
              maxAttempts: null,
              retryDelayMs: null,
            },
            startedAt: previous?.startedAt ?? (yield* DateTime.now),
            itemOrdinal:
              previous?.itemOrdinal ??
              (yield* resolveItemOrdinal(context, `terminal-failure:${context.providerTurnId}`)),
          };
          yield* emitProviderRetry(context, "running");
        });

        const lastCapturedProposedPlan = yield* Ref.make<{
          readonly nativeTurnId: string;
          readonly markdown: string;
          readonly planId: OrchestrationV2PlanArtifact["id"];
        } | null>(null);
        const captureProposedPlan = Effect.fnUntraced(function* (input: {
          readonly planMarkdown: string;
        }) {
          const context = yield* Ref.get(activeTurn);
          if (context === null) return;
          const markdown = input.planMarkdown.trim();
          if (markdown.length === 0) return;
          const previous = yield* Ref.get(lastCapturedProposedPlan);
          if (
            previous !== null &&
            previous.nativeTurnId === context.nativeTurnId &&
            previous.markdown === markdown
          ) {
            return;
          }
          const nativeItemId = `${context.nativeTurnId}:proposed-plan`;
          const planId =
            previous !== null && previous.nativeTurnId === context.nativeTurnId
              ? previous.planId
              : yield* idAllocator.allocate
                  .plan({
                    threadId: context.input.threadId,
                    runId: context.input.runId,
                    driver,
                  })
                  .pipe(Effect.orDie);
          yield* Ref.set(lastCapturedProposedPlan, {
            nativeTurnId: context.nativeTurnId,
            markdown,
            planId,
          });
          const now = yield* DateTime.now;
          const nodeId = idAllocator.derive.nodeFromProviderItem({ driver, nativeItemId });
          const turnItemId = idAllocator.derive.turnItemFromProviderItem({ driver, nativeItemId });
          const ordinal = yield* resolveItemOrdinal(context, nativeItemId);
          const nativeItemRef = { driver, nativeId: nativeItemId, strength: "weak" as const };
          yield* emitProviderEvent({
            type: "node.updated",
            driver,
            node: {
              id: nodeId,
              threadId: context.input.threadId,
              runId: context.input.runId,
              parentNodeId: context.input.rootNodeId,
              rootNodeId: context.input.rootNodeId,
              kind: "plan",
              status: "completed",
              countsForRun: false,
              providerThreadId: context.input.providerThread.id,
              providerTurnId: context.providerTurnId,
              nativeItemRef,
              runtimeRequestId: null,
              checkpointScopeId: null,
              startedAt: context.startedAt,
              completedAt: now,
            },
          });
          yield* emitProviderEvent({
            type: "plan.updated",
            driver,
            plan: {
              id: planId,
              threadId: context.input.threadId,
              runId: context.input.runId,
              nodeId,
              kind: "proposed_plan",
              status: "completed",
              markdown,
            },
          });
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver,
            turnItem: {
              id: turnItemId,
              threadId: context.input.threadId,
              runId: context.input.runId,
              nodeId,
              providerThreadId: context.input.providerThread.id,
              providerTurnId: context.providerTurnId,
              nativeItemRef,
              parentItemId: null,
              ordinal,
              status: "completed",
              title: null,
              startedAt: context.startedAt,
              completedAt: now,
              updatedAt: now,
              type: "proposed_plan",
              planId,
              markdown,
              streaming: false,
            },
          });
        });
        const lastProposedPlanMarkdown = Effect.gen(function* () {
          const context = yield* Ref.get(activeTurn);
          const previous = yield* Ref.get(lastCapturedProposedPlan);
          return context !== null && previous?.nativeTurnId === context.nativeTurnId
            ? previous.markdown
            : undefined;
        });

        const rememberSnapshotMessage = (message: OrchestrationV2ConversationMessage) =>
          Ref.update(snapshot, (current) => {
            const key = String(message.id);
            if (!current.messages.has(key)) current.order.push(key);
            current.messages.set(key, message);
            return current;
          });

        const textStreamFor = (
          context: ActiveAcpTurn,
          kind: "user" | "assistant" | "reasoning",
        ): ActiveTextStream =>
          kind === "user"
            ? context.user
            : kind === "assistant"
              ? context.assistant
              : context.reasoning;

        const textEmissionPermit = yield* Semaphore.make(1);
        /**
         * Emits the stream's current segment. A `flushOf` call is a delayed
         * flush: it emits only while that segment is still current and has
         * unsent text. The permit keeps a flush from landing after the
         * segment's completed snapshot.
         */
        const emitTextSegment = bindEmitTextSegment({
          driver,
          emitProviderEvent,
          input,
          providerMessageId,
          providerNodeId,
          providerTurnItemId,
          rememberSnapshotMessage,
          resolveItemOrdinal,
          textEmissionPermit,
          textStreamFor,
          get createdAt() {
            return createdAt;
          },
          get emitTextSegment() {
            return emitTextSegment;
          },
        });

        /**
         * Publishes a text change. A segment's first text emits at once so
         * live output starts immediately; later changes coalesce into one
         * snapshot per ACP_TEXT_FLUSH_INTERVAL. Closing the segment emits its
         * final text and makes a pending flush a no-op.
         */
        const publishTextSegment = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          kind: "user" | "assistant" | "reasoning",
        ) {
          const segment = textStreamFor(context, kind).current;
          if (segment === null) return;
          if (!segment.emitted) return yield* emitTextSegment(context, kind, false);
          if (segment.dirty) return;
          segment.dirty = true;
          yield* emitTextSegment(context, kind, false, segment).pipe(
            Effect.delay(ACP_TEXT_FLUSH_INTERVAL),
            Effect.forkIn(sessionScope),
          );
        });

        const closeTextStream = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          kind: "user" | "assistant" | "reasoning",
        ) {
          const stream = textStreamFor(context, kind);
          const segment = stream.current;
          if (segment === null) return;
          yield* emitTextSegment(context, kind, true);
          if (segment.sourceMessageId !== null) {
            stream.closedNamedSegments.set(segment.sourceMessageId, segment);
          }
          stream.current = null;
        });

        const closeTextStreams = Effect.fnUntraced(function* (context: ActiveAcpTurn) {
          yield* closeTextStream(context, "user");
          yield* closeTextStream(context, "reasoning");
          yield* closeTextStream(context, "assistant");
        });

        const openTextSegment = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          kind: "user" | "assistant" | "reasoning",
          sourceMessageId: string | null,
        ) {
          const stream = textStreamFor(context, kind);
          const closed =
            sourceMessageId === null ? undefined : stream.closedNamedSegments.get(sourceMessageId);
          // A new object, so a flush scheduled before the close stays a no-op.
          const segment: ActiveTextSegment =
            closed === undefined
              ? {
                  nativeItemId:
                    sourceMessageId === null
                      ? `${context.nativeTurnId}:${kind}:${stream.nextSegment}`
                      : `${context.nativeTurnId}:${kind}:message:${sourceMessageId}`,
                  startedAt: yield* DateTime.now,
                  sourceMessageId,
                  text: "",
                  emitted: false,
                  dirty: false,
                }
              : { ...closed, emitted: false, dirty: false };
          if (closed === undefined) stream.nextSegment += 1;
          stream.current = segment;
          return segment;
        });

        const appendText = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          kind: "user" | "assistant" | "reasoning",
          text: string,
          messageId?: string | null,
        ) {
          if (text.length === 0) return;
          for (const other of ["user", "reasoning", "assistant"] as const) {
            if (other !== kind) yield* closeTextStream(context, other);
          }
          const stream = textStreamFor(context, kind);
          const sourceMessageId = messageId || null;
          if (
            stream.current !== null &&
            sourceMessageId !== null &&
            stream.current.sourceMessageId !== null &&
            stream.current.sourceMessageId !== sourceMessageId
          ) {
            yield* closeTextStream(context, kind);
          }
          let segment = stream.current;
          if (segment === null) {
            segment = yield* openTextSegment(context, kind, sourceMessageId);
          } else if (segment.sourceMessageId === null && sourceMessageId !== null) {
            // Agents may omit the first messageId; retain projected identity until the first later id.
            segment.sourceMessageId = sourceMessageId;
          }
          segment.text += text;
          yield* publishTextSegment(context, kind);
        });

        const replaceText = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          kind: "user" | "assistant" | "reasoning",
          text: string,
          messageId: string,
        ) {
          for (const other of ["user", "reasoning", "assistant"] as const) {
            if (other !== kind) yield* closeTextStream(context, other);
          }
          let segment = textStreamFor(context, kind).current;
          if (segment?.sourceMessageId !== messageId) {
            yield* closeTextStream(context, kind);
            segment = yield* openTextSegment(context, kind, messageId);
          }
          segment.text = text;
          yield* publishTextSegment(context, kind);
        });

        const emitSubagentAssistant = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
          text: string,
          mode: "append" | "replace" = "append",
          messageId?: string | null,
        ) {
          if (text.length === 0 && mode === "append") return;
          const nativeItemId = `${subagent.task.nativeTaskRef?.nativeId ?? subagent.task.id}:message:${messageId ?? "result"}`;
          const previous = subagent.assistantMessages.get(nativeItemId);
          const messageText = mode === "replace" ? text : `${previous ?? ""}${text}`;
          subagent.assistantMessages.set(nativeItemId, messageText);
          subagent.assistantText = messageText;
          if (mode === "append" && previous !== undefined) {
            if (subagent.pendingAssistantMessages.has(nativeItemId)) return;
            subagent.pendingAssistantMessages.add(nativeItemId);
            yield* writeSubagentAssistant(subagent, nativeItemId, true).pipe(
              Effect.delay(ACP_SUBAGENT_TEXT_FLUSH_INTERVAL),
              Effect.forkIn(sessionScope),
            );
            return;
          }
          subagent.pendingAssistantMessages.delete(nativeItemId);
          yield* writeSubagentAssistant(subagent, nativeItemId, false);
        });

        // Reads the pending set under the permit, so it also waits for a write in progress.
        const flushPendingSubagentAssistant = (subagent: ActiveAcpSubagent) =>
          Effect.suspend(() =>
            Effect.forEach(
              [...subagent.pendingAssistantMessages],
              (nativeItemId) => writeSubagentAssistantUnlocked(subagent, nativeItemId, true),
              { discard: true },
            ),
          );

        const flushSubagentAssistant = (subagent: ActiveAcpSubagent) =>
          textEmissionPermit.withPermit(flushPendingSubagentAssistant(subagent));

        const writeSubagentAssistant = (
          subagent: ActiveAcpSubagent,
          nativeItemId: string,
          onlyIfPending: boolean,
        ) =>
          textEmissionPermit.withPermit(
            writeSubagentAssistantUnlocked(subagent, nativeItemId, onlyIfPending),
          );

        const writeSubagentAssistantUnlocked = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
          nativeItemId: string,
          onlyIfPending: boolean,
        ) {
          if (onlyIfPending && !subagent.pendingAssistantMessages.delete(nativeItemId)) return;
          const text = subagent.assistantMessages.get(nativeItemId);
          if (text === undefined) return;
          const now = yield* DateTime.now;
          const ordinal = resolveSubagentChildOrdinal(subagent, nativeItemId);
          const artifacts = makeSubagentConversationArtifacts({
            messageId: providerMessageId(nativeItemId),
            turnItemId: providerTurnItemId(nativeItemId),
            threadId: subagent.childThreadId,
            rootNodeId: subagent.childRootNodeId,
            providerThreadId: subagent.task.providerThreadId,
            providerTurnId: null,
            nativeItemRef: { driver, nativeId: nativeItemId, strength: "weak" },
            role: "assistant",
            text,
            ordinal,
            now,
          });
          yield* emitProviderEvent({ type: "message.updated", driver, message: artifacts.message });
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver,
            turnItem: artifacts.turnItem,
          });
        });

        const projectSubagentNotification = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
          notification: EffectAcpSchema.SessionNotification,
          owner: ActiveAcpTurn,
        ) {
          const update = notification.update;
          if (update.sessionUpdate === "agent_message_chunk") {
            const text = acpContentBlockDisplayText(update.content);
            if (text !== undefined) {
              yield* emitSubagentAssistant(subagent, text, "append", update.messageId);
            }
          } else if (update.sessionUpdate === "tool_call_content_chunk") {
            yield* projectSubagentTool(subagent, notification.sessionId, update, undefined, owner);
          } else if (update.sessionUpdate === "agent_message") {
            if (update.content === undefined) return;
            const text = (update.content ?? [])
              .flatMap((content) => {
                const display = acpContentBlockDisplayText(content);
                return display === undefined ? [] : [display];
              })
              .join("\n");
            yield* emitSubagentAssistant(subagent, text, "replace", update.messageId);
          }
        });

        const projectSubagentTool = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
          sessionId: string,
          toolCall:
            | AcpToolCallState
            | Extract<EffectAcpSchema.SessionUpdate, { sessionUpdate: "tool_call_content_chunk" }>,
          projectedStatus?: ProjectedToolStatus,
          owner?: ActiveAcpTurn,
        ) {
          const nativeTaskId = subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id);
          const key =
            sessionId === subagent.childSessionId
              ? `${nativeTaskId}:tool:${toolCall.toolCallId}`
              : `${nativeTaskId}:session:${sessionId}:tool:${toolCall.toolCallId}`;
          const context = subagent.toolState;
          const rootSessionId = yield* Ref.get(activeSessionId);
          subagent.toolSessionIds.set(key, sessionId);
          const previous = context.tools.get(key);
          if ("sessionUpdate" in toolCall) {
            if (toolCall.content.type !== "content") return;
            const text = acpContentBlockDisplayText(toolCall.content.content);
            if (text === undefined || text.length === 0) return;
            toolCall = {
              toolCallId: toolCall.toolCallId,
              data: { content: appendToolContentText(previous?.data.content, text) },
            };
          }
          const merged = mergeToolCallState(previous, toolCall);
          projectedStatus ??= owner === undefined ? undefined : stoppedToolStatus(owner, merged);
          if (merged.status !== "failed") subagent.interruptedToolIds.delete(key);
          if (projectedStatus === "interrupted") subagent.interruptedToolIds.add(key);
          if (merged.status === "failed" && subagent.interruptedToolIds.has(key))
            projectedStatus = "interrupted";
          context.tools.set(key, merged);
          if (
            projectedStatus === undefined &&
            !shouldPersistToolUpdate(context, key, previous, merged, merged.status)
          )
            return;
          const mcpIdentity = extractMcpToolCallIdentity(merged, {
            embeddedTerminalCommands: [
              ...embeddedTerminalCommands(sessionId, toolCall.toolCallId),
              ...(rootSessionId === null
                ? []
                : embeddedTerminalCommands(rootSessionId, toolCall.toolCallId)),
            ],
          });
          const now = yield* DateTime.now;
          const status = projectedStatus ?? toolStatus(merged.status);
          const startedAt = context.toolStartedAt.get(key) ?? now;
          context.toolStartedAt.set(key, startedAt);
          const ordinal = resolveSubagentChildOrdinal(subagent, key);
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver,
            turnItem: {
              id: providerTurnItemId(key),
              threadId: subagent.childThreadId,
              runId: null,
              nodeId: subagent.childRootNodeId,
              providerThreadId: subagent.task.providerThreadId,
              providerTurnId: null,
              nativeItemRef: { driver, nativeId: key, strength: "strong" },
              parentItemId: null,
              ordinal,
              status,
              title: merged.title ?? merged.kind ?? "Tool",
              startedAt,
              completedAt: completedAtForStatus(status, now),
              updatedAt: now,
              type: "dynamic_tool",
              ...(mcpIdentity === undefined
                ? {}
                : mcpToolPresentation({
                    serverName: mcpIdentity.server,
                    toolName: mcpIdentity.tool,
                    source: unknownRecord(
                      (
                        unknownRecord(unknownRecord(merged.data.rawOutput)?.result) ??
                        unknownRecord(merged.data.rawOutput)
                      )?._meta,
                    )?.source,
                  })),
              toolName:
                mcpIdentity === undefined
                  ? (merged.title ?? merged.kind ?? "Tool")
                  : `${mcpIdentity.server}.${mcpIdentity.tool}`,
              input: merged.data.rawInput ?? null,
              output: merged.data.rawOutput ?? merged.data.content ?? null,
            },
          });
        });

        const terminalizeSubagentTools = Effect.fnUntraced(function* (subagent: ActiveAcpSubagent) {
          for (const [key, tool] of subagent.toolState.tools) {
            if (
              toolStatus(tool.status) !== "running" &&
              toolStatus(tool.status) !== "pending" &&
              toolStatus(tool.status) !== "waiting"
            )
              continue;
            const sessionId = subagent.toolSessionIds.get(key);
            if (sessionId !== undefined)
              yield* projectSubagentTool(
                subagent,
                sessionId,
                { ...tool, status: "failed" },
                "interrupted",
              );
          }
        });

        const projectSubagentTranscriptEntry = bindProjectSubagentTranscriptEntry({
          driver,
          emitProviderEvent,
          input,
          providerMessageId,
          providerTurnItemId,
          resolveSubagentChildOrdinal,
          get createdAt() {
            return createdAt;
          },
          get projectSubagentTranscriptEntry() {
            return projectSubagentTranscriptEntry;
          },
        });

        const subagentSiblings = Effect.fnUntraced(function* (subagent: ActiveAcpSubagent) {
          const selfNativeId = subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id);
          const active = yield* Ref.get(activeTurn);
          const carryover = yield* Ref.get(carryoverSubagents);
          const pool = [...(active?.subagents.values() ?? []), ...(carryover?.subagents ?? [])];
          const seen = new Set<string>([selfNativeId]);
          const siblings: Array<{
            readonly nativeTaskId: string;
            readonly title: string | null;
            readonly prompt: string;
          }> = [];
          for (const candidate of pool) {
            if (candidate.rootSessionId !== subagent.rootSessionId) continue;
            const nativeTaskId =
              candidate.task.nativeTaskRef?.nativeId ?? String(candidate.task.id);
            if (seen.has(nativeTaskId)) continue;
            seen.add(nativeTaskId);
            siblings.push({
              nativeTaskId,
              title: candidate.task.title,
              prompt: candidate.task.prompt,
            });
          }
          return siblings;
        });

        const drainSubagentTranscript = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
          finalize: boolean,
        ) {
          const readTranscript = flavor.readSubagentTranscript;
          if (readTranscript === undefined) return false;
          return yield* subagent.transcriptDrainPermit.withPermit(
            Effect.gen(function* () {
              const nativeTaskId =
                subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id);
              const siblings = yield* subagentSiblings(subagent);
              const entries = yield* readTranscript({
                sessionId: subagent.rootSessionId,
                nativeTaskId,
                childSessionId: subagent.childSessionId,
                launch: { title: subagent.task.title, prompt: subagent.task.prompt },
                siblings,
                finalize,
              }).pipe(
                Effect.catchCause(() =>
                  Effect.succeed([] as ReadonlyArray<AcpSubagentTranscriptEntry>),
                ),
              );
              let changed = false;
              const seenIds = new Set<string>();
              for (const entry of entries) {
                seenIds.add(entry.itemId);
                if (yield* projectSubagentTranscriptEntry(subagent, entry)) {
                  changed = true;
                }
              }
              if (entries.length > 0) {
                for (const entry of entries) {
                  subagent.lastTranscriptEntryKinds.set(entry.childKey ?? "", entry.kind);
                }
              }
              if (finalize && subagent.transcriptOpenEntries.size > 0) {
                // Settle open entries that scrolled out of the transcript tail cap before finishing.
                for (const [itemId, openEntry] of subagent.transcriptOpenEntries) {
                  if (seenIds.has(itemId)) continue;
                  const settled: AcpSubagentTranscriptEntry =
                    openEntry.kind === "reasoning"
                      ? { ...openEntry, status: "completed" }
                      : openEntry.kind === "tool"
                        ? {
                            ...openEntry,
                            toolCall: { ...openEntry.toolCall, status: "failed" },
                            projectedStatus: "interrupted",
                          }
                        : openEntry;
                  if (yield* projectSubagentTranscriptEntry(subagent, settled)) {
                    changed = true;
                  }
                  subagent.transcriptOpenEntries.delete(itemId);
                }
              }
              return changed;
            }),
          );
        });

        const stopSubagentTranscriptFollower = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
        ) {
          const stop = subagent.transcriptFollowerStop;
          if (stop !== undefined) {
            yield* Deferred.succeed(stop, undefined).pipe(Effect.ignore);
          }
          const trailingStop = subagent.transcriptTrailingDrainStop;
          if (trailingStop !== undefined) {
            yield* Deferred.succeed(trailingStop, undefined).pipe(Effect.ignore);
          }
        });

        // Starts before the terminal status is emitted, so the run never sees it without this drain pending.
        const startSubagentTrailingTranscriptDrain = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
          status: OrchestrationV2Subagent["status"],
        ) {
          if (
            flavor.readSubagentTranscript === undefined ||
            subagent.transcriptTrailingDrainStarted ||
            (status !== "idle" && status !== "completed") ||
            subagentTranscriptRepliesSettled(subagent)
          ) {
            return;
          }
          subagent.transcriptTrailingDrainStarted = true;
          trailingTranscriptDrains.add(subagent);
          const stop = yield* Deferred.make<void>();
          subagent.transcriptTrailingDrainStop = stop;
          yield* Effect.gen(function* () {
            for (const pollMs of ACP_SUBAGENT_TRAILING_DRAIN_POLL_MS) {
              const stopped = yield* Deferred.await(stop).pipe(
                Effect.as(true),
                Effect.timeoutOrElse({
                  duration: Duration.millis(pollMs),
                  orElse: () => Effect.succeed(false),
                }),
              );
              if (stopped) break;
              if (subagent.task.status !== "idle" && subagent.task.status !== "completed") break;
              const changed = yield* drainSubagentTranscript(subagent, true);
              if (changed && subagent.task.result === null && subagent.assistantText.length > 0) {
                const now = yield* DateTime.now;
                subagent.task = {
                  ...subagent.task,
                  result: subagent.assistantText,
                  updatedAt: now,
                };
                yield* emitProviderEvent({
                  type: "subagent.updated",
                  driver,
                  subagent: subagent.task,
                });
              }
              if (subagentTranscriptRepliesSettled(subagent)) break;
            }
          }).pipe(
            Effect.ignoreCause,
            // Re-emitting the settled subagent makes the run re-check its pending work.
            Effect.ensuring(
              Effect.suspend(() => {
                trailingTranscriptDrains.delete(subagent);
                return emitProviderEvent({
                  type: "subagent.updated",
                  driver,
                  subagent: subagent.task,
                });
              }).pipe(Effect.ignoreCause),
            ),
            Effect.forkIn(sessionScope),
          );
        });

        const startSubagentTranscriptFollower = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
        ) {
          if (flavor.readSubagentTranscript === undefined || subagent.transcriptFollowerStarted) {
            return;
          }
          subagent.transcriptFollowerStarted = true;
          const stop = yield* Deferred.make<void>();
          subagent.transcriptFollowerStop = stop;
          yield* Effect.gen(function* () {
            let idleStep = 0;
            while (acpSubagentStatusBlocksTurnSettlement(subagent.task.status)) {
              const changed = yield* drainSubagentTranscript(subagent, false);
              idleStep = changed
                ? 0
                : Math.min(idleStep + 1, ACP_SUBAGENT_TRANSCRIPT_POLL_MS.length - 1);
              if (!acpSubagentStatusBlocksTurnSettlement(subagent.task.status)) break;
              const pollMs = ACP_SUBAGENT_TRANSCRIPT_POLL_MS[idleStep] ?? 5_000;
              const stopped = yield* Deferred.await(stop).pipe(
                Effect.as(true),
                Effect.timeoutOrElse({
                  duration: Duration.millis(pollMs),
                  orElse: () => Effect.succeed(false),
                }),
              );
              if (stopped) break;
            }
          }).pipe(Effect.ignoreCause, Effect.forkIn(sessionScope));
        });

        const emitSubagent = bindEmitSubagent({
          drainSubagentTranscript,
          driver,
          emitProviderEvent,
          emitSubagentAssistant,
          flavor,
          flushSubagentAssistant,
          idAllocator,
          input,
          get itemIdentityVersion() {
            return itemIdentityVersion;
          },
          set itemIdentityVersion(value) {
            itemIdentityVersion = value;
          },
          projectSubagentNotification,
          providerMessageId,
          providerNodeId,
          providerThreadByNativeSessionId,
          providerTurnItemId,
          resolveItemOrdinal,
          startSubagentTrailingTranscriptDrain,
          startSubagentTranscriptFollower,
          stopSubagentTranscriptFollower,
          get emitSubagent() {
            return emitSubagent;
          },
        });

        const nativeChild = (sessionId: string) => {
          let child = nativeChildren.get(sessionId);
          if (child === undefined) {
            child = {
              parentSessionId: null,
              status: "running",
              result: null,
              delegationId: null,
              prompt: "",
              subagent: undefined,
              owner: undefined,
              pending: [],
            };
            nativeChildren.set(sessionId, child);
          }
          return child;
        };

        const setNativeChildState = Effect.fnUntraced(function* (
          child: AcpNativeChildSession,
          status: AcpNativeChildSession["status"],
          result: string | null,
        ) {
          if (child.status !== "running" && status === "running" && child.subagent !== undefined) {
            yield* flushSubagentAssistant(child.subagent);
            // A new execution replaces its result; live ownership transfers keep their progress.
            child.subagent.task = { ...child.subagent.task, result: null };
            child.subagent.assistantText = "";
            child.subagent.assistantMessages.clear();
            child.subagent.pendingAssistantMessages.clear();
          }
          child.status = status;
          child.result = result;
        });

        const nativeChildOwner = (sessionId: string): AcpNativeChildSession | undefined => {
          const visited = new Set<string>();
          let child = nativeChildren.get(sessionId);
          while (child !== undefined && !visited.has(sessionId)) {
            if (child.subagent !== undefined) return child;
            visited.add(sessionId);
            if (child.parentSessionId === null) return;
            sessionId = child.parentSessionId;
            child = nativeChildren.get(sessionId);
          }
        };

        const hasWorkingDescendant = (sessionId: string) => {
          for (const [id, child] of nativeChildren) {
            if (id === sessionId || child.status !== "running") continue;
            const visited = new Set<string>();
            let parent = child.parentSessionId;
            while (parent !== null && !visited.has(parent)) {
              if (parent === sessionId) return true;
              visited.add(parent);
              parent = nativeChildren.get(parent)?.parentSessionId ?? null;
            }
          }
          return false;
        };

        const publishNativeChildStatus = Effect.fnUntraced(function* (
          child: AcpNativeChildSession,
          status: AcpAdapterV2SubagentUpdate["status"],
        ) {
          const { subagent, owner } = child;
          if (subagent === undefined || owner === undefined) return;
          if (acpSubagentStatusIsTerminal(status)) yield* terminalizeSubagentTools(subagent);
          yield* emitSubagent(owner, {
            nativeTaskId: subagent.task.nativeTaskRef?.nativeId ?? subagent.task.id,
            childSessionId: subagent.childSessionId,
            prompt: subagent.task.prompt,
            title: subagent.task.title,
            model: subagent.task.model,
            status,
            result: child.result,
          });
        });

        const syncNativeChildren = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
        ): Effect.fn.Return<void> {
          const rootSessionId = yield* Ref.get(activeSessionId);
          for (const [sessionId, child] of nativeChildren) {
            if (child.parentSessionId !== rootSessionId) continue;
            if (child.subagent === undefined && child.delegationId !== null) {
              const subagent = context.subagents.get(child.delegationId);
              if (subagent !== undefined) {
                child.subagent = subagent;
                child.owner = context;
                yield* emitSubagent(context, {
                  nativeTaskId: child.delegationId,
                  childSessionId: sessionId,
                  prompt: subagent.task.prompt,
                  title: subagent.task.title,
                  model: subagent.task.model,
                  status: "running",
                  result: child.result,
                });
              }
            }
            const subagent = child.subagent;
            if (subagent === undefined) continue;
            const newDelegation =
              child.delegationId !== null &&
              child.delegationId !== subagent.task.nativeTaskRef?.nativeId &&
              !subagent.childItemOrdinals.has(`${sessionId}:prompt:${child.delegationId}`);
            if (newDelegation && child.status !== "running")
              yield* setNativeChildState(child, "running", null);
            const hasNativeWork = child.status === "running" || hasWorkingDescendant(sessionId);
            if (
              (hasNativeWork && acpSubagentStatusIsTerminal(subagent.task.status)) ||
              (child.owner !== context &&
                (child.owner?.finalizedStatus !== "completed" || newDelegation) &&
                (hasNativeWork || child.pending.length > 0))
            ) {
              // The ownership event precedes child tools so the old run can detach first.
              child.owner = context;
              subagent.task = {
                ...subagent.task,
                runId: context.input.runId,
                parentNodeId: context.input.rootNodeId,
                status: "running",
                completedAt: null,
              };
              subagent.providerTurnId = context.providerTurnId;
              subagent.turnItemOrdinal = yield* resolveItemOrdinal(
                context,
                subagent.task.nativeTaskRef?.nativeId ?? subagent.task.id,
              );
              subagent.terminalStatusProjected = false;
              context.subagents.set(
                subagent.task.nativeTaskRef?.nativeId ?? subagent.task.id,
                subagent,
              );
              context.subagentsBySessionId.set(sessionId, subagent);
              yield* publishNativeChildStatus(child, "running");
              for (const [key, tool] of subagent.toolState.tools) {
                const toolSessionId = subagent.toolSessionIds.get(key);
                if (
                  toolSessionId === undefined ||
                  (toolStatus(tool.status) !== "running" && toolStatus(tool.status) !== "pending")
                )
                  continue;
                subagent.toolState.toolUpdatesSkipped.delete(key);
                yield* projectSubagentTool(
                  subagent,
                  toolSessionId,
                  tool,
                  toolStatus(tool.status),
                  context,
                );
              }
            }
            if (
              child.delegationId !== null &&
              child.delegationId !== subagent.task.nativeTaskRef?.nativeId
            ) {
              const nativeItemId = `${sessionId}:prompt:${child.delegationId}`;
              if (!subagent.childItemOrdinals.has(nativeItemId)) {
                const now = yield* DateTime.now;
                const artifacts = makeSubagentConversationArtifacts({
                  senderThreadId: subagent.task.threadId,
                  messageId: providerMessageId(nativeItemId),
                  turnItemId: providerTurnItemId(nativeItemId),
                  threadId: subagent.childThreadId,
                  rootNodeId: subagent.childRootNodeId,
                  providerThreadId: subagent.task.providerThreadId,
                  providerTurnId: null,
                  nativeItemRef: { driver, nativeId: nativeItemId, strength: "weak" },
                  role: "user",
                  text: child.prompt,
                  ordinal: resolveSubagentChildOrdinal(subagent, nativeItemId),
                  now,
                });
                yield* emitProviderEvent({
                  type: "message.updated",
                  driver,
                  message: artifacts.message,
                });
                yield* emitProviderEvent({
                  type: "turn_item.updated",
                  driver,
                  turnItem: artifacts.turnItem,
                });
              }
            }
          }
          for (const [sessionId, child] of nativeChildren) {
            const owner = nativeChildOwner(sessionId);
            if (owner?.owner !== context && owner?.owner?.finalizedStatus !== "completed") continue;
            for (const notification of child.pending.splice(0))
              yield* projectNativeChildFrame(notification);
            if (
              child.subagent?.childSessionId != null &&
              child.status !== "running" &&
              !hasWorkingDescendant(child.subagent.childSessionId)
            ) {
              yield* publishNativeChildStatus(child, child.status);
            }
          }
        });

        const projectNativeChildFrame = Effect.fnUntraced(function* (
          notification: EffectAcpSchema.SessionNotification,
        ): Effect.fn.Return<void> {
          const child = nativeChild(notification.sessionId);
          const owner = nativeChildOwner(notification.sessionId);
          const subagent = owner?.subagent;
          if (
            subagent === undefined ||
            owner?.owner === undefined ||
            (owner.owner.finalized && owner.owner.finalizedStatus !== "completed") ||
            (acpSubagentStatusIsTerminal(subagent.task.status) && child.status === "running")
          ) {
            if (child.pending.length < 256) child.pending.push(notification);
            if (subagent !== undefined) {
              const root = yield* Ref.get(activeSessionId);
              if (root !== null) yield* offerContinuationRun(root);
            }
            return;
          }
          const update = notification.update;
          if (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update") {
            for (const event of parseSessionUpdateEvent(notification).events) {
              if (event._tag === "ToolCallUpdated") {
                const tool = flavor.normalizeToolCall?.(event.toolCall) ?? event.toolCall;
                yield* projectSubagentTool(
                  subagent,
                  notification.sessionId,
                  tool,
                  undefined,
                  owner.owner,
                );
              }
            }
          } else {
            yield* projectSubagentNotification(subagent, notification, owner.owner);
          }
        });

        const followNativeChild = Effect.fnUntraced(function* (
          notification: EffectAcpSchema.SessionNotification,
          context: ActiveAcpTurn | null,
        ): Effect.fn.Return<boolean> {
          if (!followsAgentWorkState || flavor.extractSubagentSessionEvent === undefined)
            return false;
          const root = yield* Ref.get(activeSessionId);
          const event = flavor.extractSubagentSessionEvent(notification);
          if (event !== undefined) {
            if (yield* Ref.get(stoppedRunQuarantine)) return true;
            const child = nativeChild(event.childSessionId);
            child.parentSessionId = event.parentSessionId ?? child.parentSessionId;
            if (event.type === "state") {
              yield* setNativeChildState(child, event.status, event.result);
            } else {
              child.delegationId = event.delegationId;
              child.prompt = event.prompt;
            }
            if (context !== null) yield* syncNativeChildren(context);
            const owner = nativeChildOwner(event.childSessionId);
            if (owner?.subagent !== undefined && owner.owner !== undefined) {
              const sessionId = owner.subagent.childSessionId;
              if (
                owner.status !== "running" &&
                sessionId !== null &&
                !hasWorkingDescendant(sessionId)
              ) {
                yield* publishNativeChildStatus(owner, owner.status);
              } else if (acpSubagentStatusIsTerminal(owner.subagent.task.status)) {
                if (context !== null) yield* syncNativeChildren(context);
                else if (root !== null) yield* offerContinuationRun(root);
              }
            }
            return true;
          }
          if (
            notification.sessionId === root ||
            notification.sessionId === (yield* Ref.get(loadingSessionId))
          )
            return false;
          if (yield* Ref.get(stoppedRunQuarantine)) return true;
          const update = notification.update;
          if (update.sessionUpdate === "state_update") {
            const child = nativeChild(notification.sessionId);
            const unfinishedMessage =
              update.state === "idle" ? acpUnfinishedStopMessage(update.stopReason) : undefined;
            yield* setNativeChildState(
              child,
              update.state !== "idle"
                ? "running"
                : update.stopReason === "error" || unfinishedMessage !== undefined
                  ? "failed"
                  : update.stopReason === "cancelled"
                    ? "cancelled"
                    : "completed",
              update.state === "idle" ? (update.error?.message ?? unfinishedMessage ?? null) : null,
            );
          }
          if (context !== null) yield* syncNativeChildren(context);
          yield* projectNativeChildFrame(notification);
          const owner = nativeChildOwner(notification.sessionId);
          if (
            owner?.subagent?.childSessionId != null &&
            owner.status !== "running" &&
            !hasWorkingDescendant(owner.subagent.childSessionId)
          ) {
            yield* publishNativeChildStatus(owner, owner.status);
          }
          return true;
        });

        const toolOutputText = (toolCall: AcpToolCallState): string => {
          if (typeof toolCall.data.rawOutput === "string") {
            return toolCall.data.rawOutput;
          }
          if (
            typeof (toolCall.data.rawOutput as { text?: unknown } | undefined)?.text === "string"
          ) {
            return String((toolCall.data.rawOutput as { text: string }).text);
          }
          return textFromUnknown(toolCall.data.rawOutput) ?? "";
        };

        const setToolOutputText = (toolCall: AcpToolCallState, text: string): AcpToolCallState => ({
          ...toolCall,
          data: {
            ...toolCall.data,
            rawOutput: {
              type: "Text",
              text,
            },
          },
        });

        const appendToolOutputText = (
          toolCall: AcpToolCallState,
          appendOutput: string,
        ): AcpToolCallState => {
          if (appendOutput.length === 0) return toolCall;
          return setToolOutputText(toolCall, `${toolOutputText(toolCall)}${appendOutput}`);
        };

        const isMonitorEndNoticeText = (text: string): boolean =>
          /Monitor\s+["']?[0-9a-f-]{8,}/i.test(text) && /ended/i.test(text);

        const hasDeferredBackgroundWork = (
          context: ActiveAcpTurn,
          ignoreTool?: (tool: AcpToolCallState) => boolean,
        ): boolean => {
          if (flavor.wakeOnDetachedRequest && agentRequests.size > 0) return true;
          if (flavor.toolOutlivesPrompt !== undefined) {
            // A tool that never started has nothing to report later.
            for (const tool of context.tools.values()) {
              if (ignoreTool?.(tool) === true) continue;
              if (toolStatus(tool.status) === "running" && flavor.toolOutlivesPrompt(tool))
                return true;
            }
          }
          if (context.awaitingBackgroundHydration.size > 0) return true;
          if (context.pendingInjectedReport.size > 0) return true;
          for (const [taskId, toolCallId] of context.toolCallIdsByBackgroundTaskId) {
            if (context.persistentBackgroundTaskIds.has(taskId)) continue;
            // Commands are as often a dev server as a wait; only their wake follows up.
            if (context.backgroundCommands.has(taskId)) continue;
            const tool = context.tools.get(toolCallId);
            if (tool === undefined) continue;
            const status = toolStatus(tool.status);
            if (status === "pending" || status === "running") return true;
          }
          // finalizeTurn idles these subagents, so waiting on them would never settle.
          if (
            flavor.subagentsIdleOnTurnCompletion === true &&
            flavor.subagentsOutlivingPrompt === undefined
          )
            return false;
          for (const subagent of context.subagents.values()) {
            if (acpSubagentStatusBlocksTurnSettlement(subagent.task.status)) {
              return true;
            }
          }
          return false;
        };

        const idleReportedSubagents = Effect.fn("AcpAdapterV2.idleReportedSubagents")(function* (
          context: ActiveAcpTurn,
        ) {
          if (flavor.subagentsOutlivingPrompt === undefined) return;
          const nativeTaskId = (subagent: ActiveAcpSubagent) =>
            subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id);
          const running = [...context.subagents.values()].filter((subagent) =>
            acpSubagentStatusBlocksTurnSettlement(subagent.task.status),
          );
          if (running.length === 0) return;
          const atWork = yield* flavor.subagentsOutlivingPrompt({
            sessionId: context.nativeThreadId,
            nativeTaskIds: running.map(nativeTaskId),
          });
          if (context.finalized) return;
          for (const subagent of running) {
            if (
              atWork.includes(nativeTaskId(subagent)) ||
              !acpSubagentStatusBlocksTurnSettlement(subagent.task.status)
            )
              continue;
            yield* emitSubagent(context, {
              nativeTaskId: nativeTaskId(subagent),
              prompt: subagent.task.prompt,
              title: subagent.task.title,
              model: subagent.task.model,
              status: "idle",
              childSessionId: subagent.childSessionId,
              result: null,
            });
          }
        });

        const hasSurvivingBackgroundWork = (context: ActiveAcpTurn): boolean =>
          [...context.toolCallIdsByBackgroundTaskId.values()].some((toolCallId) => {
            const tool = context.tools.get(toolCallId);
            const status = tool === undefined ? undefined : toolStatus(tool.status);
            return status === "pending" || status === "running";
          }) ||
          [...context.subagents.values()].some((subagent) =>
            acpSubagentStatusBlocksTurnSettlement(subagent.task.status),
          );

        const rearmDeferredFinalize =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (context: ActiveAcpTurn) {
            if (!defersFinalizeForBackgroundWork) return;
            if (!context.promptSettled || context.finalized) return;
            if (hasDeferredBackgroundWork(context)) return;
            yield* scheduleDeferredFinalize(context);
          });

        // let breaks circular inference from monitor hydration re-entry.
        let emitTool: (
          context: ActiveAcpTurn,
          incoming: AcpToolCallState,
          projectedStatus?: ProjectedToolStatus,
          rawPayload?: unknown,
        ) => Effect.Effect<void> = () => Effect.void;

        const markAwaitingBackgroundHydration =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (context: ActiveAcpTurn, taskId: string) {
            if (context.awaitingBackgroundHydration.has(taskId)) return;
            context.awaitingBackgroundHydration.add(taskId);
            yield* Effect.gen(function* () {
              yield* Effect.sleep("60000 millis");
              if (context.finalized || !context.awaitingBackgroundHydration.has(taskId)) return;
              context.awaitingBackgroundHydration.delete(taskId);
              const toolCallId = context.toolCallIdsByBackgroundTaskId.get(taskId);
              const tool = toolCallId !== undefined ? context.tools.get(toolCallId) : undefined;
              if (tool !== undefined) {
                const status = toolStatus(tool.status);
                if (status === "pending" || status === "running") {
                  yield* emitTool(context, { ...tool, status: "completed" });
                }
              }
              yield* rearmDeferredFinalize(context);
            }).pipe(Effect.forkIn(sessionScope), Effect.asVoid);
          });

        const markPendingInjectedReport =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (context: ActiveAcpTurn, taskId: string) {
            if (!context.promptSettled) return;
            if (context.pendingInjectedReport.has(taskId)) return;
            context.pendingInjectedReport.add(taskId);
            yield* Effect.gen(function* () {
              yield* Effect.sleep("25000 millis");
              if (context.finalized || !context.pendingInjectedReport.has(taskId)) return;
              context.pendingInjectedReport.delete(taskId);
              yield* rearmDeferredFinalize(context);
            }).pipe(Effect.forkIn(sessionScope), Effect.asVoid);
          });

        const clearMidTurnUnreportedTaskIds = (taskIds: ReadonlyArray<string>) =>
          Ref.update(midTurnUnreportedCompletedTaskIds, (current) => {
            let next: Set<string> | null = null;
            for (const taskId of taskIds) {
              if (!current.has(taskId)) continue;
              if (next === null) next = new Set(current);
              next.delete(taskId);
            }
            return next ?? current;
          });

        emitTool = bindEmitTool({
          appendToolOutputText,
          applyBackgroundTaskMutationRunning,
          closeTextStream,
          contextUsageBySessionId,
          detachedBackgroundCommandTurn,
          driver,
          embeddedTerminalCommands,
          emitProviderEvent,
          emitSubagent,
          get emitTool() {
            return emitTool;
          },
          set emitTool(value) {
            emitTool = value;
          },
          extractSubagentUpdate,
          flavor,
          get followsAgentWorkState() {
            return followsAgentWorkState;
          },
          set followsAgentWorkState(value) {
            followsAgentWorkState = value;
          },
          handledBackgroundTaskIdsInActiveTurn,
          input,
          isMonitorEndNoticeText,
          markSessionCompacted,
          mcpSessions,
          midTurnUnreportedCompletedTaskIds,
          providerNodeId,
          providerTurnItemId,
          rearmDeferredFinalize,
          resolveItemOrdinal,
          setBackgroundTaskRunning,
          setToolOutputText,
          syncNativeChildren,
          toolOutputText,
        });

        /**
         * Notices have no id; each is its own item, numbered by the turn's item count.
         * A notice is not conversation content, so an open message keeps streaming across it.
         */
        const emitNotice = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          notice: { readonly title: string; readonly description?: string },
        ) {
          const nativeItemId = `${context.nativeTurnId}:notice:${context.itemOrdinals.size}`;
          const now = yield* DateTime.now;
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver,
            turnItem: {
              id: providerTurnItemId(nativeItemId),
              threadId: context.input.threadId,
              runId: context.input.runId,
              nodeId: context.input.rootNodeId,
              providerThreadId: context.input.providerThread.id,
              providerTurnId: context.providerTurnId,
              nativeItemRef: { driver, nativeId: nativeItemId, strength: "weak" },
              parentItemId: null,
              ordinal: yield* resolveItemOrdinal(context, nativeItemId),
              type: "system_notice",
              status: "completed",
              title: notice.title,
              message:
                notice.description === undefined
                  ? notice.title
                  : `${notice.title}\n\n${notice.description}`,
              startedAt: now,
              completedAt: now,
              updatedAt: now,
            },
          });
        });

        const emitPlan = bindEmitPlan({
          closeTextStreams,
          driver,
          emitProviderEvent,
          idAllocator,
          input,
          plansBySessionId,
          providerNodeId,
          providerTurnItemId,
          resolveItemOrdinal,
          get emitPlan() {
            return emitPlan;
          },
        });

        const appendLoadedHistory =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (
            notification: EffectAcpSchema.SessionNotification,
            role: "user" | "assistant" | "thought",
            text: string,
            replace = false,
          ) {
            if (text.length === 0 && !replace) return;
            const now = yield* DateTime.now;
            yield* Ref.update(snapshot, (current) => {
              const update = notification.update;
              const sourceMessageId =
                (update.sessionUpdate === "user_message_chunk" ||
                  update.sessionUpdate === "agent_message_chunk" ||
                  update.sessionUpdate === "agent_thought_chunk" ||
                  update.sessionUpdate === "user_message" ||
                  update.sessionUpdate === "agent_message" ||
                  update.sessionUpdate === "agent_thought") &&
                update.messageId
                  ? update.messageId
                  : null;
              const startsNew =
                current.loadingRole !== role ||
                (sourceMessageId !== null && current.loadingMessageId !== sourceMessageId);
              const loadingIndex = startsNew ? current.loadingIndex + 1 : current.loadingIndex;
              const nativeItemId =
                sourceMessageId === null
                  ? `${notification.sessionId}:history:${role}:${loadingIndex}`
                  : `${notification.sessionId}:history:${role}:message:${sourceMessageId}`;
              const messageId = providerMessageId(nativeItemId);
              const key = String(messageId);
              const previous = current.messages.get(key);
              if (previous === undefined) current.order.push(key);
              current.messages.set(key, {
                createdBy: previous?.createdBy ?? (role === "user" ? "user" : "agent"),
                creationSource: previous?.creationSource ?? "provider",
                id: messageId,
                threadId: input.threadId,
                runId: null,
                nodeId: null,
                role: role === "user" ? "user" : "assistant",
                text: replace ? text : `${previous?.text ?? ""}${text}`,
                attachments: [],
                streaming: false,
                createdAt: previous?.createdAt ?? now,
                updatedAt: now,
              });
              return {
                ...current,
                reasoningIds:
                  role === "thought" && !current.reasoningIds.has(messageId)
                    ? new Set(current.reasoningIds).add(messageId)
                    : current.reasoningIds,
                loadingRole: role,
                loadingMessageId: sourceMessageId ?? (startsNew ? null : current.loadingMessageId),
                loadingIndex,
              };
            });
          });

        const offerContinuationRun = Effect.fnUntraced(function* (_sessionId: string) {
          if (continuationRequests === undefined) {
            return false;
          }
          const pending = yield* continuationPermit.withPermit(
            Effect.gen(function* () {
              if (yield* Ref.get(continuationClosed)) return Option.none();
              if (yield* Ref.get(stoppedRunQuarantine)) return Option.none();
              if (yield* Ref.get(continuationRequested)) return Option.none();
              const route = yield* Ref.get(lastTurnRoute);
              if (route === null) return Option.none();
              yield* Ref.set(continuationRequested, true);
              const generation = yield* Ref.updateAndGet(
                continuationGeneration,
                (value) => value + 1,
              );
              const reports = yield* Ref.modify(wakeReports, ({ reports }) => [
                reports,
                { reports, offered: new Set(reports.keys()) },
              ]);
              return Option.some({ route, generation, reports });
            }),
          );
          if (Option.isNone(pending)) return false;
          const { route, generation, reports } = pending.value;
          const notification = backgroundWorkNotification([...reports.values()]);
          yield* Effect.logInfo("orchestration-v2.acp-wake-turn-detected", {
            driver,
            providerSessionId: input.providerSessionId,
            threadId: route.threadId,
            providerThreadId: route.providerThreadId,
          });
          yield* continuationRequests.offer({
            threadId: route.threadId,
            providerThreadId: route.providerThreadId,
            driver,
            detail: null,
            ...(notification === null ? {} : { notification }),
            clearIfCurrent: () =>
              continuationPermit.withPermit(
                Effect.gen(function* () {
                  if ((yield* Ref.get(continuationGeneration)) === generation) {
                    yield* Ref.set(continuationRequested, false);
                  }
                }),
              ),
            dispatchIfCurrent: (effect) =>
              continuationPermit.withPermit(
                Effect.gen(function* () {
                  const clearIfOwner = Effect.gen(function* () {
                    if ((yield* Ref.get(continuationGeneration)) === generation) {
                      yield* Ref.set(continuationRequested, false);
                    }
                  });
                  if (yield* Ref.get(stoppedRunQuarantine)) {
                    yield* clearIfOwner;
                    return Option.none();
                  }
                  if ((yield* Ref.get(continuationGeneration)) !== generation) {
                    return Option.none();
                  }
                  if (!(yield* Ref.get(continuationRequested))) return Option.none();
                  // Retain the dispatch flag until continuation starts so late frames cannot enqueue duplicates.
                  const exit = yield* Effect.exit(effect);
                  if (Exit.isFailure(exit)) {
                    yield* clearIfOwner;
                    return yield* Effect.failCause(exit.cause);
                  }
                  return Option.some(exit.value);
                }),
              ),
          });
          return true;
        });

        const applyLateBackgroundMutation = Effect.fnUntraced(function* (
          sessionId: string,
          mutation: {
            readonly taskId: string;
            readonly status: "running" | "completed" | "failed";
          },
        ) {
          const taskAlreadyEnded = (yield* Ref.get(endedBackgroundTaskIds)).has(mutation.taskId);
          yield* applyBackgroundTaskMutationRunning(mutation);
          if (mutation.status === "running") {
            if (taskAlreadyEnded && acpPostSettleMonitorPromptShouldSuppress(mutation)) {
              yield* Ref.set(suppressPostSettleMonitorPrompt, true);
            }
            return;
          }
          // Only a new terminal may un-suppress output; re-delivery must not revive monitor ACK chatter.
          if (!taskAlreadyEnded) {
            yield* Ref.set(suppressPostSettleMonitorPrompt, false);
          }
          const activeContext = yield* Ref.get(activeTurn);
          if (activeContext !== null && !activeContext.finalized) {
            const handled = yield* Ref.get(handledBackgroundTaskIdsInActiveTurn);
            if (
              !activeContext.promptSettled &&
              !handled.has(mutation.taskId) &&
              activeContext.toolCallIdsByBackgroundTaskId.has(mutation.taskId)
            ) {
              yield* Ref.update(midTurnUnreportedCompletedTaskIds, (current) =>
                new Set(current).add(mutation.taskId),
              );
            }
            return;
          }
          if (
            postSettleContinuationEnabled &&
            (yield* Ref.get(activeSessionId)) === sessionId &&
            (yield* Ref.get(runningBackgroundTaskIds)).size === 0 &&
            (yield* Ref.get(wakeBuffer)).some((notification) =>
              acpPostSettleContinuationOfferEvidence(notification, flavor),
            )
          ) {
            yield* offerContinuationRun(sessionId);
          }
        });

        // Structured task ends are authoritative, but emitting before prompt
        // settlement marks the result handled and suppresses its continuation.
        const finishRegisteredBackgroundTool = Effect.fnUntraced(function* (mutation: {
          readonly taskId: string;
          readonly status: "completed" | "failed";
          readonly output?: string;
        }) {
          const context = yield* backgroundCommandTurn(mutation.taskId);
          if (context === undefined || !context.promptSettled) return;
          const toolCallId = context.toolCallIdsByBackgroundTaskId.get(mutation.taskId);
          const tool = toolCallId === undefined ? undefined : context.tools.get(toolCallId);
          if (tool === undefined) return;
          const status = toolStatus(tool.status);
          if (
            status !== "pending" &&
            status !== "running" &&
            !context.backgroundCommands.has(mutation.taskId)
          ) {
            return;
          }
          context.awaitingBackgroundHydration.delete(mutation.taskId);
          const finished = { ...tool, status: mutation.status };
          yield* emitTool(
            context,
            mutation.output === undefined ? finished : setToolOutputText(finished, mutation.output),
            mutation.status,
          );
          yield* rearmDeferredFinalize(context);
        });

        // Output and replays for a detached command land on its row, not in the wake buffer.
        const projectDetachedBackgroundCommand = Effect.fnUntraced(function* (
          notification: EffectAcpSchema.SessionNotification,
          active: ActiveAcpTurn | null,
        ) {
          const update = notification.update;
          if (update.sessionUpdate !== "tool_call" && update.sessionUpdate !== "tool_call_update") {
            return false;
          }
          if (active?.finalized === false && active.tools.has(update.toolCallId)) return false;
          if (notification.sessionId !== (yield* Ref.get(activeSessionId))) return false;
          const owner = [...(yield* Ref.get(detachedBackgroundCommands)).values()].find(
            (turn) => turn.tools.get(update.toolCallId)?.backgroundCommandTaskId !== undefined,
          );
          if (owner === undefined) return false;
          for (const event of parseSessionUpdateEvent(notification).events) {
            if (event._tag === "ToolCallUpdated") yield* emitTool(owner, event.toolCall);
          }
          return true;
        });

        const bufferPostSettleWake = Effect.fnUntraced(function* (
          notification: EffectAcpSchema.SessionNotification,
        ) {
          if (!postSettleContinuationEnabled || continuationRequests === undefined) {
            return {
              buffered: false,
              offerContinuation: false,
              stopProcessing: false,
            };
          }
          if (yield* Ref.get(stoppedRunQuarantine)) {
            return {
              buffered: false,
              offerContinuation: false,
              stopProcessing: true,
            };
          }
          const rootSessionId = yield* Ref.get(activeSessionId);
          if (rootSessionId === null || notification.sessionId !== rootSessionId) {
            return {
              buffered: false,
              offerContinuation: false,
              stopProcessing: false,
            };
          }
          if (!acpPostSettleWakeEvidence(notification, flavor)) {
            return {
              buffered: false,
              offerContinuation: false,
              stopProcessing: false,
            };
          }
          const update = notification.update;
          let alreadyHandledToolUpdate = false;
          if (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update") {
            yield* trackRunningBackgroundTools(notification);
            // Long-timeout get_command_or_subagent_output consumption ends with TaskOutput alone.
            for (const event of parseSessionUpdateEvent(notification).events) {
              if (event._tag !== "ToolCallUpdated") continue;
              const toolCall = flavor.normalizeToolCall?.(event.toolCall) ?? event.toolCall;
              const proposedPlanMarkdown = flavor.extractProposedPlanMarkdown?.(toolCall);
              if (proposedPlanMarkdown !== undefined && proposedPlanMarkdown.length > 0) {
                yield* captureProposedPlan({ planMarkdown: proposedPlanMarkdown });
              }
              const toolTaskId = flavor.extractBackgroundTaskId?.(toolCall);
              if (
                toolTaskId !== undefined &&
                (yield* Ref.get(handledBackgroundTaskIdsInActiveTurn)).has(toolTaskId)
              ) {
                alreadyHandledToolUpdate = true;
              }
              if (flavor.extractBackgroundTaskCompletion !== undefined) {
                for (const completion of flavor.extractBackgroundTaskCompletion(toolCall)) {
                  alreadyHandledToolUpdate =
                    alreadyHandledToolUpdate ||
                    (yield* Ref.get(handledBackgroundTaskIdsInActiveTurn)).has(completion.taskId);
                  yield* applyBackgroundTaskMutationRunning(completion);
                }
              }
            }
          }
          const backgroundWorkRunning = (yield* Ref.get(runningBackgroundTaskIds)).size > 0;
          const handledInTurnCount = (yield* Ref.get(handledBackgroundTaskIdsInActiveTurn)).size;
          // Chunks carry no task id: while an unpolled completion awaits its report, keep them.
          const isInTurnHandledAgentChatter =
            handledInTurnCount > 0 &&
            (yield* Ref.get(midTurnUnreportedCompletedTaskIds)).size === 0 &&
            (update.sessionUpdate === "agent_message_chunk" ||
              update.sessionUpdate === "agent_thought_chunk");
          // Grok re-prompts for each post-settle monitor event; retaining them would replay the whole burst.
          let buffered = false;
          if (
            !alreadyHandledToolUpdate &&
            !isInTurnHandledAgentChatter &&
            acpPostSettleWakeShouldBuffer(notification, backgroundWorkRunning)
          ) {
            yield* Ref.update(wakeBuffer, (current) => [...current, notification]);
            buffered = true;
          }
          if (!acpPostSettleContinuationOfferEvidence(notification, flavor)) {
            return {
              buffered,
              offerContinuation: false,
              stopProcessing: true,
            };
          }
          if (backgroundWorkRunning) {
            return {
              buffered,
              offerContinuation: false,
              stopProcessing: true,
            };
          }
          if (alreadyHandledToolUpdate) {
            if (!(yield* Ref.get(continuationRequested))) {
              yield* Ref.set(wakeBuffer, []);
            }
            return {
              buffered,
              offerContinuation: false,
              stopProcessing: true,
            };
          }
          // Preserve wake frames for other tasks until their completion offers.
          if (isInTurnHandledAgentChatter) {
            return {
              buffered,
              offerContinuation: false,
              stopProcessing: true,
            };
          }
          return {
            buffered,
            offerContinuation: true,
            stopProcessing: true,
          };
        });

        let applyFinalizedActiveTurnSubagentTerminal: (
          context: ActiveAcpTurn,
          notification: EffectAcpSchema.SessionNotification,
        ) => Effect.Effect<boolean> = () => Effect.succeed(false);

        const projectAgentTerminalUpdate = Effect.fnUntraced(function* (
          notification: EffectAcpSchema.SessionNotification,
          context: ActiveAcpTurn | null,
        ) {
          const update = notification.update;
          if (
            update.sessionUpdate !== "terminal_update" &&
            update.sessionUpdate !== "terminal_output_chunk"
          ) {
            return false;
          }
          const terminalKey = sessionScopedId(notification.sessionId, update.terminalId);
          const next = applyAcpAgentTerminalUpdate(agentTerminalsById.get(terminalKey), update);
          agentTerminalsById.set(terminalKey, next);
          if (context === null || notification.sessionId !== context.nativeThreadId) return true;
          const status =
            next.exitStatus === undefined
              ? ("inProgress" as const)
              : next.exitStatus.exitCode === 0
                ? ("completed" as const)
                : ("failed" as const);
          const embeddedToolCallIds = toolCallIdsByAgentTerminalId.get(terminalKey);
          const linked = embeddedToolCallIds !== undefined && embeddedToolCallIds.size > 0;
          const projectedToolCallIds = linked
            ? [...embeddedToolCallIds]
            : [`acp-agent-terminal:${update.terminalId}`];
          const output = next.output.slice(-MAX_AGENT_TERMINAL_OUTPUT_CHARS);
          for (const toolCallId of projectedToolCallIds) {
            const existing = context.tools.get(toolCallId);
            const seeded: AcpToolCallState =
              existing ??
              ({
                toolCallId,
                kind: "execute",
                title: next.command ?? "Terminal",
                status,
                ...(next.command === undefined ? {} : { command: next.command }),
                data: { toolCallId },
              } satisfies AcpToolCallState);
            yield* emitTool(
              context,
              setToolOutputText(
                {
                  ...seeded,
                  // An agent-reported tool owns its status; terminal state only drives the synthetic one.
                  status: (linked ? existing?.status : undefined) ?? status,
                  ...(next.command === undefined ? {} : { command: next.command }),
                },
                output,
              ),
            );
          }
          return true;
        });

        const idleErrorFailure = (error: EffectAcpSchema.PromptResponse["error"]) =>
          flavor.promptFailure?.(
            new EffectAcpErrors.AcpRequestError({
              code: error?.code ?? -32603,
              errorMessage: error?.message ?? "Provider turn failed.",
              ...(error?.data === undefined ? {} : { data: error.data }),
            }),
          ) ??
          makeProviderFailure({
            message: error?.message,
            code: error == null ? null : String(error.code),
            class: "provider_error",
          });

        const stopReasonFailure = (
          stopReason: EffectAcpSchema.StopReason | null | undefined,
          error: EffectAcpSchema.PromptResponse["error"],
        ) => {
          if (stopReason === "error") return idleErrorFailure(error);
          const message = acpUnfinishedStopMessage(stopReason);
          return message === undefined
            ? undefined
            : makeProviderFailure({ message, code: stopReason, class: "provider_error" });
        };

        const settleIdleWork = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
        ): Effect.fn.Return<void> {
          if (
            !followsAgentWorkState ||
            context.finalized ||
            (!context.workAccepted && !context.interrupted) ||
            agentWork?.state !== "idle" ||
            agentRequests.size > 0
          )
            return;
          const work = agentWork;
          // Native close sends cancelled idle before acknowledging the user's Stop.
          if (work.stopReason === "cancelled" && pendingStopCloseTurn === context) {
            context.interrupted = true;
          }
          const failure = context.interrupted
            ? undefined
            : stopReasonFailure(work.stopReason, work.error);
          if (failure !== undefined) yield* terminalizeOpenForegroundTools(context, "failed");
          yield* finalizeTurn(
            context,
            failure !== undefined
              ? "failed"
              : work.stopReason === "cancelled"
                ? "cancelled"
                : "completed",
            failure,
          );
        });

        const awaitRequestTurn = Effect.fnUntraced(function* (generation: number) {
          if (
            !followsAgentWorkState &&
            !(postSettleContinuationEnabled && flavor.wakeOnDetachedRequest)
          )
            return true;
          while (true) {
            const waiting = yield* runRuntimeCallbackAtGeneration(
              generation,
              Effect.gen(function* () {
                if (yield* Ref.get(stoppedRunQuarantine)) return false;
                if ((yield* Ref.get(activeTurn)) !== null) return null;
                const sessionId = yield* Ref.get(activeSessionId);
                if (sessionId !== null) yield* offerContinuationRun(sessionId);
                return turnAttached;
              }),
            );
            if (Option.isNone(waiting)) return yield* Effect.never;
            if (waiting.value === false) return false;
            if (waiting.value === null) return true;
            if (!(yield* Deferred.await(waiting.value))) return false;
          }
        });

        const holdingAgentRequest =
          (generation: number) =>
          <A, E, R>(effect: Effect.Effect<A, E, R>) =>
            Effect.suspend(() =>
              !followsAgentWorkState &&
              !(postSettleContinuationEnabled && flavor.wakeOnDetachedRequest)
                ? effect
                : Effect.acquireUseRelease(
                    runRuntimeCallbackAtGeneration(
                      generation,
                      Effect.sync(() => {
                        const token = {};
                        agentRequests.add(token);
                        return token;
                      }),
                    ),
                    (token) => (Option.isNone(token) ? Effect.never : effect),
                    (token) =>
                      runRuntimeCallbackAtGeneration(
                        generation,
                        Effect.gen(function* () {
                          if (Option.isSome(token)) agentRequests.delete(token.value);
                          const context = yield* Ref.get(activeTurn);
                          if (context !== null) yield* settleIdleWork(context);
                          if (context !== null && flavor.wakeOnDetachedRequest) {
                            // The agent goes on with its reply once the request is answered.
                            if (flavor.replyEndsWithUsageUpdate === true) context.replyOpen = true;
                            yield* rearmDeferredFinalize(context);
                          }
                        }),
                      ).pipe(Effect.asVoid),
                  ),
            );

        const recordLoadedHistory = Effect.fnUntraced(function* (
          notification: EffectAcpSchema.SessionNotification,
          live: boolean,
        ) {
          const update = notification.update;
          if (
            notification.sessionId !==
            ((yield* Ref.get(loadingSessionId)) ?? (yield* Ref.get(activeSessionId)))
          )
            return;
          if (
            update.sessionUpdate === "user_message_chunk" ||
            update.sessionUpdate === "agent_message_chunk" ||
            update.sessionUpdate === "agent_thought_chunk"
          ) {
            const text = acpContentBlockDisplayText(update.content);
            if (text === undefined) return;
            const lateBackgroundMutations =
              update.content.type === "text"
                ? (flavor.extractBackgroundToolMutation?.(text) ?? [])
                : [];
            if (live) {
              for (const lateBackgroundMutation of lateBackgroundMutations) {
                yield* applyLateBackgroundMutation(notification.sessionId, lateBackgroundMutation);
              }
            }
            if (lateBackgroundMutations.length === 0 && !acpIsMonitorChatter(text)) {
              yield* appendLoadedHistory(
                notification,
                update.sessionUpdate === "user_message_chunk"
                  ? "user"
                  : update.sessionUpdate === "agent_thought_chunk"
                    ? "thought"
                    : "assistant",
                text,
              );
            }
          } else if (
            update.sessionUpdate === "user_message" ||
            update.sessionUpdate === "agent_message" ||
            update.sessionUpdate === "agent_thought"
          ) {
            if (update.content === undefined) return;
            const text = (update.content ?? [])
              .flatMap((content) => {
                const display = acpContentBlockDisplayText(content);
                return display === undefined ? [] : [display];
              })
              .join("\n");
            yield* appendLoadedHistory(
              notification,
              update.sessionUpdate === "user_message"
                ? "user"
                : update.sessionUpdate === "agent_thought"
                  ? "thought"
                  : "assistant",
              text,
              true,
            );
          } else if (
            update.sessionUpdate === "tool_call" ||
            update.sessionUpdate === "tool_call_update" ||
            update.sessionUpdate === "plan" ||
            update.sessionUpdate === "plan_update" ||
            update.sessionUpdate === "plan_removed"
          ) {
            yield* Ref.update(snapshot, (current) => ({
              ...current,
              loadingRole: null,
              loadingMessageId: null,
            }));
          }
        });

        const handleSessionUpdate = bindHandleSessionUpdate({
          activeSessionId,
          activeTurn,
          get agentWork() {
            return agentWork;
          },
          set agentWork(value) {
            agentWork = value;
          },
          appendText,
          appendToolOutputText,
          applyBackgroundTaskMutationRunning,
          get applyFinalizedActiveTurnSubagentTerminal() {
            return applyFinalizedActiveTurnSubagentTerminal;
          },
          set applyFinalizedActiveTurnSubagentTerminal(value) {
            applyFinalizedActiveTurnSubagentTerminal = value;
          },
          applyLateBackgroundMutation,
          bufferPostSettleWake,
          carryoverSubagents,
          clearMidTurnUnreportedTaskIds,
          contextUsageBySessionId,
          continuationRequested,
          emitNotice,
          emitPlan,
          emitProviderRetry,
          emitSubagent,
          get emitTool() {
            return emitTool;
          },
          set emitTool(value) {
            emitTool = value;
          },
          events,
          extractSubagentUpdate,
          flavor,
          followNativeChild,
          get followsAgentWorkState() {
            return followsAgentWorkState;
          },
          set followsAgentWorkState(value) {
            followsAgentWorkState = value;
          },
          handledBackgroundTaskIdsInActiveTurn,
          hasDeferredBackgroundWork,
          idleReportedSubagents,
          input,
          markAwaitingBackgroundHydration,
          markPendingInjectedReport,
          midTurnUnreportedCompletedTaskIds,
          nativeMetadataBySessionId,
          offerContinuationRun,
          projectAgentTerminalUpdate,
          projectDetachedBackgroundCommand,
          projectExtractedContextUsage,
          projectSubagentNotification,
          projectSubagentTool,
          publishProviderThreadState,
          rearmDeferredFinalize,
          recordLoadedHistory,
          replaceText,
          setToolOutputText,
          settleIdleWork,
          stoppedRunQuarantine,
          suppressPostSettleMonitorPrompt,
          wakeBuffer,
          get finalizeTurn() {
            return finalizeTurn;
          },
          get handleSessionUpdate() {
            return handleSessionUpdate;
          },
          get updateCarryoverSubagentStatus() {
            return updateCarryoverSubagentStatus;
          },
        });

        const activeContext = Effect.gen(function* () {
          const context = yield* Ref.get(activeTurn);
          if (context === null) {
            return yield* new EffectAcpErrors.AcpTransportError({
              detail: "ACP agent requested input without an active turn",
              cause: "No active ACP turn",
            });
          }
          return context;
        });

        const beginApprovalRequest = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          params: EffectAcpSchema.RequestPermissionRequest,
          generation: number,
          transportRequestId: string,
        ) {
          yield* closeTextStreams(context);
          const parsed = parsePermissionRequest(params);
          const approvalOptions = flavor.approvalOptions?.(params);
          const nativeRequestId = params.toolCall.toolCallId;
          const requestId = yield* idAllocator.allocate.runtimeRequest({
            driver,
            providerTurnId: context.providerTurnId,
            nativeRequestId,
          });
          const decision = yield* Deferred.make<ProviderApprovalDecision>();
          const nativeResponseAcknowledgement = yield* Deferred.make<
            void,
            EffectAcpErrors.AcpError
          >();
          yield* registerNativeResponseAcknowledgement(
            generation,
            transportRequestId,
            nativeResponseAcknowledgement,
          );
          const now = yield* DateTime.now;
          const nodeId = idAllocator.derive.approvalNode({ requestId });
          const requestKind = providerRequestKind(parsed.kind);
          const nativeItemRef = { driver, nativeId: nativeRequestId, strength: "weak" as const };
          const ordinal = yield* resolveItemOrdinal(
            context,
            `${context.nativeTurnId}:approval:${nativeRequestId}`,
          );
          const runtimeRequest: OrchestrationV2RuntimeRequest = {
            id: requestId,
            nodeId,
            providerTurnId: context.providerTurnId,
            nativeRequestRef: nativeItemRef,
            kind: requestKind,
            status: "pending",
            responseCapability: {
              type: "live",
              providerSessionId: input.providerSessionId,
            },
            createdAt: now,
            resolvedAt: null,
          };
          const node: OrchestrationV2ExecutionNode = {
            id: nodeId,
            threadId: context.input.threadId,
            runId: context.input.runId,
            parentNodeId: context.input.rootNodeId,
            rootNodeId: context.input.rootNodeId,
            kind: "approval_request",
            status: "waiting",
            countsForRun: false,
            providerThreadId: context.input.providerThread.id,
            providerTurnId: context.providerTurnId,
            nativeItemRef,
            runtimeRequestId: requestId,
            checkpointScopeId: null,
            startedAt: now,
            completedAt: null,
          };
          const turnItem: OrchestrationV2TurnItem = {
            id: idAllocator.derive.approvalTurnItem({ requestId }),
            threadId: context.input.threadId,
            runId: context.input.runId,
            nodeId,
            providerThreadId: context.input.providerThread.id,
            providerTurnId: context.providerTurnId,
            nativeItemRef,
            parentItemId: null,
            ordinal,
            status: "waiting",
            title: null,
            startedAt: now,
            completedAt: null,
            updatedAt: now,
            type: "approval_request",
            requestId,
            requestKind,
            ...(parsed.detail === undefined ? {} : { prompt: parsed.detail }),
            ...(approvalOptions === undefined ? {} : { options: approvalOptions }),
          };
          yield* Ref.update(pendingRuntimeRequests, (current) => {
            const updated = new Map(current);
            updated.set(String(requestId), {
              type: "approval",
              generation,
              nativeResponseAcknowledgement,
              requestId,
              transportRequestId,
              decision,
              runtimeRequest,
              node,
              turnItem,
            });
            return updated;
          });
          yield* emitProviderEvent({
            type: "node.updated",
            driver,
            node,
          });
          yield* emitProviderEvent({
            type: "runtime_request.updated",
            driver,
            threadId: context.input.threadId,
            runtimeRequest,
          });
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver,
            turnItem,
          });
          return {
            context,
            decision,
            nativeResponseAcknowledgement,
            requestId,
            transportRequestId,
          } as const;
        });

        const beginUserInputRequest = Effect.fnUntraced(function* (
          request: AcpAdapterV2UserInputRequest,
          generation: number,
          transportRequestId: string,
        ) {
          const context = yield* activeContext;
          yield* closeTextStreams(context);
          const requestId = yield* idAllocator.allocate.runtimeRequest({
            driver,
            providerTurnId: context.providerTurnId,
            nativeRequestId: request.nativeRequestId,
          });
          const answers = yield* Deferred.make<ProviderUserInputAnswers | null>();
          const nativeResponseAcknowledgement = yield* Deferred.make<
            void,
            EffectAcpErrors.AcpError
          >();
          yield* registerNativeResponseAcknowledgement(
            generation,
            transportRequestId,
            nativeResponseAcknowledgement,
          );
          const now = yield* DateTime.now;
          const nodeId = providerNodeId(request.nativeItemId);
          const turnItemId = providerTurnItemId(request.nativeItemId);
          const nativeItemRef = {
            driver,
            nativeId: request.nativeItemId,
            strength: "weak" as const,
          };
          const ordinal = yield* resolveItemOrdinal(context, request.nativeItemId);
          const runtimeRequest: OrchestrationV2RuntimeRequest = {
            id: requestId,
            nodeId,
            providerTurnId: context.providerTurnId,
            nativeRequestRef: {
              driver,
              nativeId: request.nativeRequestId,
              strength: "weak",
            },
            kind: "user_input",
            status: "pending",
            responseCapability: {
              type: "live",
              providerSessionId: input.providerSessionId,
            },
            createdAt: now,
            resolvedAt: null,
          };
          const node: OrchestrationV2ExecutionNode = {
            id: nodeId,
            threadId: context.input.threadId,
            runId: context.input.runId,
            parentNodeId: context.input.rootNodeId,
            rootNodeId: context.input.rootNodeId,
            kind: "user_input_request",
            status: "waiting",
            countsForRun: false,
            providerThreadId: context.input.providerThread.id,
            providerTurnId: context.providerTurnId,
            nativeItemRef,
            runtimeRequestId: requestId,
            checkpointScopeId: null,
            startedAt: now,
            completedAt: null,
          };
          const turnItem: OrchestrationV2TurnItem = {
            id: turnItemId,
            threadId: context.input.threadId,
            runId: context.input.runId,
            nodeId,
            providerThreadId: context.input.providerThread.id,
            providerTurnId: context.providerTurnId,
            nativeItemRef,
            parentItemId: null,
            ordinal,
            status: "waiting",
            title: null,
            startedAt: now,
            completedAt: null,
            updatedAt: now,
            type: "user_input_request",
            requestId,
            questions: [...request.questions],
          };
          yield* Ref.update(pendingRuntimeRequests, (current) => {
            const updated = new Map(current);
            updated.set(String(requestId), {
              type: "user_input",
              generation,
              nativeResponseAcknowledgement,
              requestId,
              transportRequestId,
              answers,
              runtimeRequest,
              node,
              turnItem,
            });
            return updated;
          });
          yield* emitProviderEvent({
            type: "node.updated",
            driver,
            node,
          });
          yield* emitProviderEvent({
            type: "runtime_request.updated",
            driver,
            threadId: context.input.threadId,
            runtimeRequest,
          });
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver,
            turnItem,
          });
          return {
            answers,
            context,
            nativeResponseAcknowledgement,
            requestId,
            transportRequestId,
          } as const;
        });

        const requestUserInputWithAdmission = Effect.fn(
          "AcpAdapterV2.requestUserInputWithAdmission",
        )(
          function* (
            generation: number,
            request: Effect.Effect<AcpAdapterV2UserInputRequest>,
            transportRequestId: string,
          ) {
            if (!(yield* awaitRequestTurn(generation))) {
              return { answers: null, acknowledgeNativeResponse: Effect.void };
            }
            return yield* runRuntimeCallbackAtGeneration(
              generation,
              request.pipe(
                Effect.flatMap((value) =>
                  beginUserInputRequest(value, generation, transportRequestId),
                ),
              ),
            ).pipe(
              Effect.flatMap((pending) => {
                if (Option.isNone(pending)) return Effect.never;
                const { answers, requestId, transportRequestId } = pending.value;
                return Deferred.await(answers).pipe(
                  Effect.flatMap((result) =>
                    runRuntimeCallbackAtGeneration(generation, Effect.succeed(result)).pipe(
                      Effect.flatMap((checked) =>
                        Option.isSome(checked)
                          ? Effect.succeed({
                              acknowledgeNativeResponse: acknowledgeNativeResponse(
                                generation,
                                transportRequestId,
                              ),
                              answers: checked.value,
                            })
                          : Effect.never,
                      ),
                    ),
                  ),
                  Effect.ensuring(
                    runRuntimeCallbackAtGeneration(
                      generation,
                      Ref.update(pendingRuntimeRequests, (current) => {
                        const updated = new Map(current);
                        updated.delete(String(requestId));
                        return updated;
                      }),
                    ).pipe(Effect.asVoid),
                  ),
                );
              }),
            );
          },
          Effect.mapError(
            (cause) =>
              new EffectAcpErrors.AcpTransportError({
                detail: "Failed to handle ACP user input request",
                cause,
              }),
          ),
        );

        const cancelPendingRuntimeRequests = Effect.fnUntraced(function* (
          options: { readonly stopMcpCalls: boolean } = { stopMcpCalls: true },
        ) {
          const waiting = turnAttached;
          turnAttached = yield* Deferred.make<boolean>();
          yield* Deferred.succeed(waiting, false);
          // session/cancel does not end the agent's MCP calls; T3 runs them, so it stops them.
          if (options.stopMcpCalls && runtimeMcpBridge !== undefined) {
            yield* runtimeMcpBridge.stopCalls;
          }
          const requests = yield* Ref.modify(pendingRuntimeRequests, (current) => [
            [...current.values()],
            new Map<string, PendingRuntimeRequest>(),
          ]);
          if (requests.length === 0) return;

          const now = yield* DateTime.now;
          yield* Effect.forEach(
            requests,
            (request) =>
              Effect.gen(function* () {
                const cancelled = yield* request.type === "approval"
                  ? Deferred.succeed(request.decision, "cancel")
                  : Deferred.succeed(request.answers, null);
                if (!cancelled) return;

                yield* emitProviderEvent({
                  type: "runtime_request.updated",
                  driver,
                  threadId: request.node.threadId,
                  runtimeRequest: {
                    ...request.runtimeRequest,
                    status: "cancelled",
                    resolvedAt: now,
                  },
                });
                yield* emitProviderEvent({
                  type: "node.updated",
                  driver,
                  node: {
                    ...request.node,
                    status: "cancelled",
                    completedAt: now,
                  },
                });
                yield* emitProviderEvent({
                  type: "turn_item.updated",
                  driver,
                  turnItem: {
                    ...request.turnItem,
                    status: "cancelled",
                    completedAt: now,
                    updatedAt: now,
                  },
                });
              }),
            { concurrency: 1, discard: true },
          );
        });

        const mutateCarryoverSubagentStatus = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
          status: OrchestrationV2Subagent["status"],
          resultOverride?: string | null,
        ) {
          const now = yield* DateTime.now;
          const result =
            resultOverride !== undefined && resultOverride !== null && resultOverride.length > 0
              ? resultOverride
              : (subagent.task.result ?? (subagent.assistantText || null));
          const completedAt = acpSubagentStatusIsTerminal(status) ? now : null;
          subagent.task = {
            ...subagent.task,
            status,
            result,
            completedAt,
            updatedAt: now,
          };
        });

        const projectCarryoverSubagentStatus = Effect.fnUntraced(function* (
          subagent: ActiveAcpSubagent,
          status: OrchestrationV2Subagent["status"],
          resultOverride?: string | null,
        ) {
          if (acpSubagentStatusIsTerminal(status)) {
            yield* stopSubagentTranscriptFollower(subagent);
            yield* drainSubagentTranscript(subagent, true);
            yield* startSubagentTrailingTranscriptDrain(subagent, status);
          }
          yield* flushSubagentAssistant(subagent);
          yield* mutateCarryoverSubagentStatus(subagent, status, resultOverride);
          const now = subagent.task.updatedAt;
          const nativeTaskId = subagent.task.nativeTaskRef?.nativeId ?? subagent.task.id;
          const nativeItemRef = {
            driver,
            nativeId: nativeTaskId,
            strength: "strong" as const,
          };
          const parentProviderThreadId = subagent.parentProviderThreadId;
          const result = subagent.task.result;
          const completedAt = subagent.task.completedAt;
          yield* emitProviderEvent({
            type: "node.updated",
            driver,
            node: {
              id: subagent.task.id,
              threadId: subagent.task.threadId,
              runId: subagent.task.runId,
              parentNodeId: subagent.task.parentNodeId,
              rootNodeId: subagent.task.parentNodeId,
              kind: "subagent",
              status,
              countsForRun: false,
              providerThreadId: parentProviderThreadId,
              providerTurnId: subagent.providerTurnId,
              nativeItemRef,
              runtimeRequestId: null,
              checkpointScopeId: null,
              startedAt: subagent.task.startedAt,
              completedAt,
            },
          });
          yield* emitProviderEvent({
            type: "node.updated",
            driver,
            node: {
              id: subagent.childRootNodeId,
              threadId: subagent.childThreadId,
              runId: null,
              parentNodeId: null,
              rootNodeId: subagent.childRootNodeId,
              kind: "root_turn",
              status,
              countsForRun: false,
              providerThreadId: subagent.task.providerThreadId,
              providerTurnId: null,
              nativeItemRef,
              runtimeRequestId: null,
              checkpointScopeId: null,
              startedAt: subagent.task.startedAt,
              completedAt,
            },
          });
          yield* emitProviderEvent({
            type: "subagent.updated",
            driver,
            subagent: subagent.task,
          });
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver,
            turnItem: {
              id: subagent.turnItemId,
              threadId: subagent.task.threadId,
              runId: subagent.task.runId,
              nodeId: subagent.task.id,
              providerThreadId: parentProviderThreadId,
              providerTurnId: subagent.providerTurnId,
              nativeItemRef,
              parentItemId: null,
              ordinal: subagent.turnItemOrdinal,
              status,
              title: subagent.task.title,
              startedAt: subagent.task.startedAt,
              completedAt,
              updatedAt: now,
              type: "subagent",
              subagentId: subagent.task.id,
              origin: "provider_native",
              driver,
              providerInstanceId: subagent.task.providerInstanceId,
              childThreadId: subagent.childThreadId,
              prompt: subagent.task.prompt,
              result,
            },
          });
          if (acpSubagentStatusIsTerminal(status)) {
            subagent.terminalStatusProjected = true;
          }
        });

        const updateCarryoverSubagentStatus = Effect.fnUntraced(function* (
          nativeIdOrChildSessionId: string,
          status: OrchestrationV2Subagent["status"],
          result?: string | null,
          options?: { readonly project?: boolean },
        ) {
          const carryover = yield* Ref.get(carryoverSubagents);
          if (carryover === null) return false;
          const match = carryover.subagents.find((subagent) => {
            const nativeId = subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id);
            return (
              nativeId === nativeIdOrChildSessionId ||
              subagent.childSessionId === nativeIdOrChildSessionId
            );
          });
          if (match === undefined) return false;
          const shouldProject = options?.project !== false;
          if (match.task.status === status) {
            if (!shouldProject || match.terminalStatusProjected) {
              return true;
            }
            yield* projectCarryoverSubagentStatus(match, status, result);
            return true;
          }
          if (match.task.status !== "running" && match.task.status !== "pending") {
            return false;
          }
          if (!shouldProject) {
            yield* mutateCarryoverSubagentStatus(match, status, result);
          } else {
            yield* projectCarryoverSubagentStatus(match, status, result);
          }
          return true;
        });

        const finishSubagentFromNotice = Effect.fnUntraced(function* (notice: {
          readonly childSessionId: string;
          readonly status: "completed" | "failed" | "cancelled";
          readonly result: string | null;
        }) {
          const context = yield* Ref.get(activeTurn);
          const subagent =
            context === null ? undefined : context.subagentsBySessionId.get(notice.childSessionId);
          const known =
            subagent ??
            (yield* Ref.get(carryoverSubagents))?.subagents.find(
              (candidate) =>
                candidate.childSessionId === notice.childSessionId ||
                candidate.task.nativeTaskRef?.nativeId === notice.childSessionId,
            );
          if (known !== undefined && acpSubagentStatusBlocksTurnSettlement(known.task.status)) {
            yield* recordWakeReport(notice.childSessionId, {
              kind: "subagent",
              label: known.task.title ?? known.task.prompt,
              outcome: notice.status,
              childThreadId: known.childThreadId,
            });
          }
          if (context !== null && subagent !== undefined && !context.finalized) {
            if (!acpSubagentStatusBlocksTurnSettlement(subagent.task.status)) return;
            yield* emitSubagent(context, {
              nativeTaskId: subagent.task.nativeTaskRef?.nativeId ?? notice.childSessionId,
              prompt: subagent.task.prompt,
              title: subagent.task.title,
              model: subagent.task.model,
              status: notice.status,
              childSessionId: notice.childSessionId,
              result: notice.result,
              suppressNormalTool: true,
            });
            yield* rearmDeferredFinalize(context);
            return;
          }
          const carryover = yield* Ref.get(carryoverSubagents);
          yield* updateCarryoverSubagentStatus(
            notice.childSessionId,
            notice.status,
            notice.result,
            {
              project:
                carryover !== null &&
                carryover.sessionId === (yield* Ref.get(activeSessionId)) &&
                carryover.projectsLateTerminals,
            },
          );
        });

        applyFinalizedActiveTurnSubagentTerminal = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          notification: EffectAcpSchema.SessionNotification,
        ) {
          if (flavor.extractSubagentUpdate === undefined) return false;

          const applyTerminal = Effect.fnUntraced(function* (
            subagent: ActiveAcpSubagent,
            update: AcpAdapterV2SubagentUpdate,
          ) {
            if (!acpSubagentStatusIsTerminal(update.status)) return false;
            if (acpSubagentStatusIsTerminal(subagent.task.status)) {
              if (subagent.terminalStatusProjected || context.finalizedStatus !== "completed") {
                return true;
              }
            }
            if (context.finalizedStatus === "completed") {
              yield* emitSubagent(context, update);
            } else {
              yield* mutateCarryoverSubagentStatus(subagent, update.status, update.result);
            }
            return true;
          });

          const sessionUpdate = notification.update;
          if (
            sessionUpdate.sessionUpdate === "tool_call" ||
            sessionUpdate.sessionUpdate === "tool_call_update"
          ) {
            for (const event of parseSessionUpdateEvent(notification).events) {
              if (event._tag !== "ToolCallUpdated") continue;
              const toolCall = flavor.normalizeToolCall?.(event.toolCall) ?? event.toolCall;
              const subagentUpdate = extractSubagentUpdate(toolCall);
              if (
                subagentUpdate === undefined ||
                !acpSubagentStatusIsTerminal(subagentUpdate.status)
              ) {
                continue;
              }
              const subagent =
                context.subagents.get(subagentUpdate.nativeTaskId) ??
                (subagentUpdate.childSessionId === null
                  ? undefined
                  : context.subagentsBySessionId.get(subagentUpdate.childSessionId)) ??
                context.subagentsBySessionId.get(notification.sessionId);
              if (subagent === undefined) continue;
              const nativeTaskId =
                subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id);
              if (
                subagentUpdate.nativeTaskId !== nativeTaskId &&
                (subagentUpdate.childSessionId === null ||
                  (subagentUpdate.childSessionId !== subagent.childSessionId &&
                    subagentUpdate.childSessionId !== notification.sessionId))
              ) {
                continue;
              }
              if (yield* applyTerminal(subagent, subagentUpdate)) return true;
            }
          }

          if (
            sessionUpdate.sessionUpdate === "user_message_chunk" &&
            sessionUpdate.content.type === "text" &&
            flavor.extractSubagentEndNotice !== undefined
          ) {
            const notice = flavor.extractSubagentEndNotice(sessionUpdate.content.text);
            const subagent =
              notice === undefined
                ? undefined
                : context.subagentsBySessionId.get(notice.childSessionId);
            if (notice !== undefined && subagent !== undefined) {
              return yield* applyTerminal(subagent, {
                nativeTaskId: subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id),
                prompt: subagent.task.prompt,
                title: subagent.task.title,
                model: subagent.task.model,
                status: notice.status,
                childSessionId: notice.childSessionId,
                result: null,
                suppressNormalTool: true,
              });
            }
          }

          return false;
        });

        const projectDeferredCarryoverTerminals = Effect.fnUntraced(function* (
          subagents: ReadonlyArray<ActiveAcpSubagent>,
        ) {
          for (const subagent of subagents) {
            if (
              subagent.task.status === "running" ||
              subagent.task.status === "pending" ||
              subagent.terminalStatusProjected
            ) {
              continue;
            }
            yield* projectCarryoverSubagentStatus(
              subagent,
              subagent.task.status,
              subagent.task.result,
            );
          }
        });

        const terminalizeCarryoverSubagents = Effect.fnUntraced(function* (
          carryover: AcpCarryoverSubagents | null,
        ) {
          if (carryover === null) return;
          for (const subagent of carryover.subagents) {
            yield* terminalizeSubagentTools(subagent);
            if (acpSubagentStatusIsTerminal(subagent.task.status)) {
              if (!subagent.terminalStatusProjected) {
                yield* projectCarryoverSubagentStatus(
                  subagent,
                  subagent.task.status,
                  subagent.task.result,
                );
              }
              continue;
            }
            yield* projectCarryoverSubagentStatus(subagent, "interrupted");
          }
        });

        // Only the flavor's own start marker counts: agents also send late
        // updates for the previous prompt (Kiro's context usage) and echoes
        // that arrive before they would honor a cancel.
        const markPromptStarted = Effect.fnUntraced(function* (
          notification: EffectAcpSchema.SessionNotification,
        ) {
          const promptStarts = flavor.cancelAfterPromptStarts?.isStart;
          if (promptStarts === undefined) return;
          const context = yield* Ref.get(activeTurn);
          if (context === null || context.nativeThreadId !== notification.sessionId) return;
          if (!(yield* Deferred.isDone(context.promptDispatched))) return;
          if (!promptStarts(notification.update)) return;
          yield* Deferred.succeed(context.promptStarted, undefined);
        });
        const projectAcpRuntimeSessionUpdateEffect =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(
            function* (rawNotification: EffectAcpSchema.SessionNotification) {
              if (flavor.ignoreSessionUpdate?.(rawNotification) === true) return;
              // Replayed history feeds snapshots only; it must not drive live turn or wake state.
              if (sessionUpdateIsReplay(rawNotification)) {
                const normalized =
                  flavor.normalizeSessionUpdate?.(rawNotification) ?? rawNotification;
                yield* projectExtractedContextUsage(normalized, false);
                yield* recordLoadedHistory(normalized, false);
                return;
              }
              yield* notePromptProgress(rawNotification);
              const nativePromptId = flavor.forkFromTurn?.nativeTurnId(rawNotification);
              if (nativePromptId !== undefined) {
                const context = yield* Ref.get(activeTurn);
                if (context !== null && context.nativeThreadId === rawNotification.sessionId) {
                  context.nativePromptId ??= nativePromptId;
                }
              }
              const injectedSteerId = flavor.steering?.injectedSteerId?.(rawNotification);
              if (injectedSteerId !== undefined) {
                yield* Deferred.succeed(steerInjection(injectedSteerId), undefined);
              }
              yield* markPromptStarted(rawNotification);
              const embedded = embeddedTerminalIdsFromSessionUpdate(rawNotification);
              if (embedded !== undefined) {
                rememberEmbeddedTerminals({
                  ...embedded,
                  sessionId: rawNotification.sessionId,
                });
              }
              const notification =
                clientTerminals === undefined
                  ? rawNotification
                  : resolveEmbeddedTerminalContent(
                      rawNotification,
                      clientTerminals.readOutputSnapshot,
                    );
              if (notification.update.sessionUpdate === "available_commands_update") {
                const sessionId = rawNotification.sessionId;
                const advertisedCommands = notification.update.availableCommands;
                yield* SubscriptionRef.update(advertisedCommandNames, (current) => {
                  const updated = new Map(current);
                  updated.set(
                    sessionId,
                    new Set(advertisedCommands.map((command) => command.name.trim().toLowerCase())),
                  );
                  return updated;
                });
                yield* flavor.onAvailableCommandsUpdate?.(advertisedCommands) ?? Effect.void;
              }
              if (
                notification.update.sessionUpdate === "config_option_update" ||
                notification.update.sessionUpdate === "current_mode_update"
              ) {
                yield* publishSessionConfiguration(runtime);
              }
              const normalized = flavor.normalizeSessionUpdate?.(notification) ?? notification;
              // Turn projection misses compactions that finish while idle or after settlement.
              if (
                normalized.update.sessionUpdate === "compaction_update" &&
                normalized.update.status === "completed"
              ) {
                yield* markSessionCompacted(normalized.sessionId, normalized.update.compactionId);
              }
              yield* handleSessionUpdate(normalized);
            },
            Effect.mapError(
              (cause) =>
                new EffectAcpErrors.AcpTransportError({
                  detail: "Failed to project an ACP session update",
                  cause,
                }),
            ),
          );
        const projectAcpRuntimeSessionUpdate = (
          handlerGeneration: number,
          rawNotification: EffectAcpSchema.SessionNotification,
        ) =>
          runRuntimeCallbackAtGeneration(
            handlerGeneration,
            projectAcpRuntimeSessionUpdateEffect(rawNotification),
          ).pipe(Effect.asVoid);

        // Post-settle background work retains the latest turn policy.
        const clientPolicyContext = Effect.map(Ref.get(activeTurn), (context) => ({
          policy: context?.input.runtimePolicy ?? latestRuntimePolicy,
          turnKey: context === null ? null : String(context.providerTurnId),
        }));

        const denyClientRequest = (operation: string, disposition: "ask" | "deny") =>
          Effect.logWarning("ACP client policy denied a client-mediated operation", {
            operation,
            disposition,
          }).pipe(
            Effect.andThen(
              Effect.fail(
                EffectAcpErrors.AcpRequestError.internalError(
                  disposition === "ask"
                    ? `The active T3 runtime policy requires approval for ${operation}. Request permission with session/request_permission before retrying.`
                    : `The active T3 runtime policy does not allow ${operation}.`,
                ),
              ),
            ),
          );

        const guardClientTerminalCreate = clientPolicyContext.pipe(
          Effect.flatMap(({ policy, turnKey }) => {
            const disposition = acpClientExecuteDisposition(policy);
            if (
              disposition === "allow" ||
              (disposition === "ask" && clientPolicyGrants.allowsExecute(turnKey))
            ) {
              return Effect.void;
            }
            return denyClientRequest("terminal/create", disposition);
          }),
        );

        const wireAcpRuntimeTerminalHandlers = Effect.fnUntraced(function* (
          targetRuntime: AcpSessionRuntime.AcpSessionRuntime["Service"],
        ) {
          if (clientTerminals === undefined) return;
          yield* targetRuntime.handleCreateTerminal((request) =>
            guardClientTerminalCreate.pipe(Effect.andThen(clientTerminals.create(request))),
          );
          yield* targetRuntime.handleTerminalOutput(clientTerminals.output);
          yield* targetRuntime.handleTerminalWaitForExit(clientTerminals.waitForExit);
          yield* targetRuntime.handleTerminalKill(clientTerminals.kill);
          yield* targetRuntime.handleTerminalRelease(clientTerminals.release);
        });

        const wireAcpRuntimeMcpHandlers = Effect.fnUntraced(function* (
          targetRuntime: AcpSessionRuntime.AcpSessionRuntime["Service"],
          mcpBridge: AcpMcpOverAcpBridge | undefined,
        ) {
          if (mcpBridge === undefined) return;
          const mapMcpBridgeError = Effect.mapError(
            (error: Error) =>
              new EffectAcpErrors.AcpRequestError({
                code: -32603,
                errorMessage: error.message,
                cause: error,
              }),
          );
          yield* targetRuntime.handleMcpConnect((request) =>
            mcpBridge.connect(request).pipe(mapMcpBridgeError),
          );
          yield* targetRuntime.handleMcpMessage((request) =>
            mcpBridge.message(request).pipe(mapMcpBridgeError),
          );
          yield* targetRuntime.handleMcpNotification((request) =>
            mcpBridge.notification(request).pipe(mapMcpBridgeError),
          );
          yield* targetRuntime.handleMcpDisconnect((request) =>
            mcpBridge.disconnect(request).pipe(mapMcpBridgeError),
          );
        });

        // The adopted response never passes through the raw session-update
        // handler, so this is its one catalog publication.
        const adoptLateSessionSetup = Effect.fnUntraced(function* (
          targetRuntime: AcpSessionRuntime.AcpSessionRuntime["Service"],
          result: AcpSessionRuntime.AcpSessionRuntimeStartResult,
          provisionalBuildSnapshot: AcpNativeBuildConfiguration | undefined,
        ) {
          const current = yield* Ref.get(activeSessionSetup);
          if (current === null || current.sessionId !== result.sessionId) {
            return;
          }
          yield* Ref.set(activeSessionSetup, result);
          yield* resetPublishedCatalogKey;
          // The selection was configured against the provisional setup's
          // options, so the next turn re-applies it against the real ones.
          yield* Ref.set(activeSelection, null);
          yield* Ref.set(activeInteractionMode, null);
          // A build snapshot saved before the adoption was seen holds the
          // provisional state; one saved by a deferred openSession
          // configuration already read the adopted options and stays.
          if (
            provisionalBuildSnapshot !== undefined &&
            nativeBuildConfigurationBySessionId.get(result.sessionId) === provisionalBuildSnapshot
          ) {
            nativeBuildConfigurationBySessionId.delete(result.sessionId);
          }
          yield* refreshModelSwitchCapability;
          yield* publishSessionConfiguration(targetRuntime);
        });

        const wireAcpRuntimeHandlers = bindWireAcpRuntimeHandlers({
          acknowledgeNativeResponse,
          activeContext,
          activeSessionId,
          activeTurn,
          adoptLateSessionSetup,
          applyLateBackgroundMutation,
          awaitRequestTurn,
          backgroundCommandTurn,
          beginApprovalRequest,
          captureProposedPlan,
          clientPolicyContext,
          clientPolicyGrants,
          finishRegisteredBackgroundTool,
          finishSubagentFromNotice,
          flavor,
          get followsAgentWorkState() {
            return followsAgentWorkState;
          },
          set followsAgentWorkState(value) {
            followsAgentWorkState = value;
          },
          handleSessionUpdate,
          handledBackgroundTaskIdsInActiveTurn,
          holdingAgentRequest,
          input,
          lastProposedPlanMarkdown,
          lateSessionSetup,
          get latestRuntimePolicy() {
            return latestRuntimePolicy;
          },
          set latestRuntimePolicy(value) {
            latestRuntimePolicy = value;
          },
          markSessionCompacted,
          nativeBuildConfigurationBySessionId,
          nextElicitationOrdinal,
          options,
          pendingRuntimeRequests,
          get postSettleContinuationEnabled() {
            return postSettleContinuationEnabled;
          },
          set postSettleContinuationEnabled(value) {
            postSettleContinuationEnabled = value;
          },
          projectAcpRuntimeSessionUpdate,
          recordWakeReport,
          get refreshModelSwitchCapability() {
            return refreshModelSwitchCapability;
          },
          set refreshModelSwitchCapability(value) {
            refreshModelSwitchCapability = value;
          },
          registerNativeResponseAcknowledgement,
          reportProviderRetry,
          requestUserInputWithAdmission,
          get rootForegroundWork() {
            return rootForegroundWork;
          },
          set rootForegroundWork(value) {
            rootForegroundWork = value;
          },
          runRuntimeCallbackAtGeneration,
          get runtime() {
            return runtime;
          },
          set runtime(value) {
            runtime = value;
          },
          get runtimeMcpBridge() {
            return runtimeMcpBridge;
          },
          set runtimeMcpBridge(value) {
            runtimeMcpBridge = value;
          },
          get runtimeScope() {
            return runtimeScope;
          },
          set runtimeScope(value) {
            runtimeScope = value;
          },
          sessionScope,
          stoppedRunQuarantine,
          toolOutputText,
          unreadToolCalls,
          wireAcpRuntimeMcpHandlers,
          wireAcpRuntimeTerminalHandlers,
          get finalizeTurn() {
            return finalizeTurn;
          },
          get wireAcpRuntimeHandlers() {
            return wireAcpRuntimeHandlers;
          },
        });

        const makeRuntimeMcpBridge = Effect.fnUntraced(function* (
          mcpContext: AcpMcpContext,
          scope: Scope.Scope,
        ) {
          if (mcpContext.endpoint === undefined || mcpContext.authorization === undefined) {
            return undefined;
          }
          const mcpBridge = yield* makeAcpMcpOverAcpBridge({
            endpoint: mcpContext.endpoint,
            authorization: mcpContext.authorization,
            allocateConnectionId: random.uuidV4(),
          });
          yield* Scope.addFinalizer(scope, mcpBridge.dispose);
          return mcpBridge;
        });

        const spawnAcpRuntime = Effect.fnUntraced(function* (
          threadId: ThreadId | null,
          resumeSessionId?: string,
        ) {
          if (runtimeScope !== undefined) {
            yield* Scope.close(runtimeScope, Exit.void);
          }
          runtimeScope = yield* Scope.make();
          const mcpContext = yield* readMcpContext(threadId);
          runtimeMcpBridge = yield* makeRuntimeMcpBridge(mcpContext, runtimeScope);
          const runtimeGeneration = yield* Ref.get(runtimeCallbackGeneration);
          openAgentRequests = new Set();
          runtime = yield* flavor
            .makeRuntime(
              makeRuntimeInput(runtimeGeneration, openAgentRequests, mcpContext, resumeSessionId),
            )
            .pipe(
              Effect.provideService(Scope.Scope, runtimeScope),
              Effect.provideService(SecureRandom.SecureRandom, random),
              Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, childProcessSpawner),
              Effect.provideService(AgentScope, agentScope),
              Effect.provideService(AgentScopeThreadId, threadId ?? undefined),
            );
        });

        const startAcpRuntime = Effect.fnUntraced(function* (
          threadId: ThreadId | null,
          resumeSessionId?: string,
        ) {
          if (resumeSessionId !== undefined) yield* Ref.set(loadingSessionId, resumeSessionId);
          const startup = Effect.gen(function* () {
            yield* spawnAcpRuntime(threadId, resumeSessionId);
            yield* wireAcpRuntimeHandlers(runtime, yield* Ref.get(runtimeCallbackGeneration));
            return yield* runtime.start();
          });
          return yield* (flavor.withRuntimeStartup?.(startup) ?? startup).pipe(
            Effect.onError(() => Ref.set(loadingSessionId, null)),
          );
        });

        const restartAcpRuntime = Effect.fnUntraced(function* (threadId: ThreadId | null) {
          yield* spawnAcpRuntime(threadId);
          yield* wireAcpRuntimeHandlers(runtime, yield* Ref.get(runtimeCallbackGeneration));
        });

        const startReplacementAcpRuntime = bindStartReplacementAcpRuntime({
          agentScope,
          allocateRuntimeCallbackGeneration,
          awaitAdmittedNativeResponses,
          cancelPendingRuntimeRequests,
          childProcessSpawner,
          driver,
          flavor,
          handleRuntimeTerminationAtGeneration,
          handleSessionUpdate,
          makeRuntimeInput,
          makeRuntimeMcpBridge,
          get openAgentRequests() {
            return openAgentRequests;
          },
          set openAgentRequests(value) {
            openAgentRequests = value;
          },
          prepareTerminalEnvironment,
          projectAcpRuntimeSessionUpdate,
          projectAcpRuntimeSessionUpdateEffect,
          quarantineNativeTransportAtGeneration,
          random,
          readMcpContext,
          get runtime() {
            return runtime;
          },
          set runtime(value) {
            runtime = value;
          },
          runtimeCallbackGeneration,
          runtimeCallbackPermit,
          get runtimeMcpBridge() {
            return runtimeMcpBridge;
          },
          set runtimeMcpBridge(value) {
            runtimeMcpBridge = value;
          },
          get runtimeScope() {
            return runtimeScope;
          },
          set runtimeScope(value) {
            runtimeScope = value;
          },
          wireAcpRuntimeHandlers,
          wireAcpRuntimeMcpHandlers,
          wireAcpRuntimeTerminalHandlers,
          get startReplacementAcpRuntime() {
            return startReplacementAcpRuntime;
          },
          get started() {
            return started;
          },
        });

        const commitReplacementSession = Effect.fn("AcpAdapterV2.commitReplacementSession")(
          function* (
            threadId: ThreadId | null,
            candidate: AcpSessionRuntime.AcpSessionRuntimeStartResult,
          ) {
            rememberTerminalEnvironment(candidate.sessionId, yield* readMcpContext(threadId));
            yield* Ref.set(runtimeRestartRequired, false);
            yield* Ref.set(activeSessionId, candidate.sessionId);
            yield* setActiveSessionSetup(candidate);
            yield* Ref.set(activeSelection, null);
            yield* Ref.set(activeInteractionMode, null);
            yield* Ref.set(promptInstructionStates, new Map());
            yield* Ref.set(promptRuntimeInstructions, new Map());
            yield* Ref.set(deliveredAppContext, new Map());
            yield* Ref.set(compactionMarkers, new Map());
            yield* Ref.set(completedCompactionIds, new Set());
            yield* Ref.set(snapshot, emptySnapshotState());
            yield* continuationPermit.withPermit(
              Effect.gen(function* () {
                yield* Ref.update(continuationGeneration, (value) => value + 1);
                yield* Ref.set(stoppedRunQuarantine, false);
                yield* Ref.set(wakeBuffer, []);
                yield* Ref.set(wakeReports, noWakeReports);
                yield* Ref.set(continuationRequested, false);
                yield* Ref.set(runningBackgroundTaskIds, new Set());
                yield* Ref.set(detachedBackgroundCommands, new Map());
                yield* Ref.set(endedBackgroundTaskIds, new Set());
                yield* Ref.set(midTurnUnreportedCompletedTaskIds, new Set());
                yield* Ref.set(handledBackgroundTaskIdsInActiveTurn, new Set());
                const previousCarryover = yield* Ref.getAndSet(carryoverSubagents, null);
                if (previousCarryover !== null) {
                  yield* Effect.forEach(
                    previousCarryover.subagents,
                    stopSubagentTranscriptFollower,
                    { discard: true },
                  );
                }
                yield* Ref.set(suppressPostSettleMonitorPrompt, false);
                yield* Ref.set(lastTurnRoute, null);
              }),
            );
          },
        );

        // Read before the session exists: its own config updates replace what the client showed.
        const unsetOptionDefaults = yield* flavor.unsetOptionDefaults ?? Effect.succeed([]);
        const initialStart = yield* Effect.result(
          startAcpRuntime(input.threadId, input.initialNativeThreadId),
        );
        const started = Result.isSuccess(initialStart)
          ? initialStart.success
          : yield* Effect.gen(function* () {
              const failedMethod =
                "method" in initialStart.failure ? initialStart.failure.method : undefined;
              if (
                input.initialNativeThreadId === undefined ||
                (failedMethod !== "session/load" && failedMethod !== "session/resume")
              ) {
                return yield* initialStart.failure;
              }
              yield* Ref.set(initialSessionActivationFailure, {
                sessionId: input.initialNativeThreadId,
                error: initialStart.failure,
              });
              itemIdentityVersion = 2;
              yield* Ref.set(runtimeRestartRequired, false);
              prepareClaimableTerminalEnvironment(yield* readMcpContext(input.threadId));
              return yield* startAcpRuntime(input.threadId);
            });
        yield* Ref.set(activeSessionId, started.sessionId);
        yield* Ref.set(loadingSessionId, null);
        yield* setActiveSessionSetup(started);
        rememberTerminalEnvironment(started.sessionId, yield* readMcpContext(input.threadId));
        yield* runtime.drainEvents;
        const steersWithPrompt = flavor.steersWithPrompt?.(started.initializeResult) === true;
        const capabilities = negotiatedCapabilities(
          yield* readCapabilities,
          started,
          flavor.modelOptionArrivesLate === true,
          flavor.forkFromTurn?.supported(started.initializeResult) === true,
          steersWithPrompt,
        );
        const canLoadSession = started.initializeResult.agentCapabilities?.loadSession === true;
        const canResumeSession =
          started.initializeResult.agentCapabilities?.sessionCapabilities?.resume != null;
        const supportsImagePrompts = acpSupportsImagePrompts({
          flavorSupportsImagePrompts: flavor.supportsImagePrompts,
          negotiatedImage:
            started.initializeResult.agentCapabilities?.promptCapabilities?.image === true,
        });

        const activateSession = Effect.fnUntraced(function* (
          sessionId: string,
          threadId: ThreadId | null,
        ) {
          const initialFailure = yield* Ref.modify(initialSessionActivationFailure, (failure) =>
            failure?.sessionId === sessionId ? [failure.error, null] : [undefined, failure],
          );
          if (initialFailure !== undefined) {
            return yield* initialFailure;
          }
          const mcpContext = yield* readMcpContext(threadId);
          const activationOptions = acpMcpActivation(mcpContext);
          prepareTerminalEnvironment(mcpContext, sessionId);
          yield* Ref.set(loadingSessionId, sessionId);
          const activated = yield* Effect.gen(function* () {
            if (!canLoadSession && !canResumeSession) {
              return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                driver,
                detail: `ACP driver cannot load or resume session ${sessionId}`,
              });
            }
            yield* reportStartupPhase("resume");
            return canLoadSession
              ? yield* runtime.loadSession(sessionId, activationOptions)
              : yield* runtime.resumeSession(sessionId, activationOptions);
          }).pipe(
            Effect.onError(() => Ref.set(loadingSessionId, null)),
            Effect.ensuring(Effect.suspend(() => reportStartupPhase(undefined))),
          );
          rememberTerminalEnvironment(activated.sessionId, yield* readMcpContext(threadId));
          return activated;
        });

        const validateModelSelection = Effect.fn("AcpAdapterV2.validateModelSelection")(function* (
          modelSelection: ModelSelection,
        ) {
          const model = flavor.resolveModelId?.(modelSelection) ?? modelSelection.model;
          if (
            flavor.applyModelSelection !== undefined ||
            model.length === 0 ||
            model === "default" ||
            model === "auto" ||
            flavor.customModels?.includes(model) === true
          )
            return;
          const option = findModelConfigOption(yield* runtime.getConfigOptions);
          const models = (yield* Ref.get(activeSessionSetup))?.sessionSetupResult.models;
          const available =
            option?.type === "select"
              ? flattenSelectChoices(option.options).some((choice) => choice.value === model)
              : models?.availableModels.some((choice) => choice.modelId === model);
          if (available === false) {
            return yield* new AcpModelSelectionError({
              model: modelSelection.model,
              cause: EffectAcpErrors.AcpRequestError.invalidParams(
                "The requested model is not available in this session.",
              ),
            });
          }
        });

        const configureSession = bindConfigureSession({
          activeSelection,
          activeSessionSetup,
          configuredModes,
          configuredRuntimeMode,
          driver,
          flavor,
          nativeBuildConfigurationBySessionId,
          options,
          publishSessionConfiguration,
          readModes,
          get runtime() {
            return runtime;
          },
          set runtime(value) {
            runtime = value;
          },
          unsetOptionDefaults,
          validateModelSelection,
          get configureSession() {
            return configureSession;
          },
        });

        yield* configureSession(
          started,
          input.modelSelection,
          input.runtimePolicy,
          started.sessionId !== input.initialNativeThreadId ? unsetOptionDefaults : [],
        );
        yield* Ref.set(activeSelection, input.modelSelection);
        yield* Ref.set(activeInteractionMode, input.runtimePolicy.interactionMode);
        const createdAt = yield* DateTime.now;
        let providerSession: OrchestrationV2ProviderSession = {
          id: input.providerSessionId,
          driver,
          providerInstanceId: options.instanceId,
          status: "ready",
          cwd: input.runtimePolicy.cwd ?? process.cwd(),
          model: input.modelSelection.model,
          capabilities: {
            ...capabilities,
            sessions: {
              ...capabilities.sessions,
              supportsModelSwitchInSession:
                capabilities.sessions.supportsModelSwitchInSession ||
                canSwitchModelInSession(
                  yield* runtime.getConfigOptions,
                  (yield* Ref.get(activeSessionSetup))?.sessionSetupResult.models,
                ),
            },
          },
          createdAt,
          updatedAt: createdAt,
          lastError: null,
        };
        // Config options can first offer a model after setup, e.g. when a
        // session/load response arrives after replay idle. Upgrade-only: a
        // later partial config update must not revoke the switch mid-session.
        refreshModelSwitchCapability = Effect.gen(function* () {
          const { capabilities } = providerSession;
          if (capabilities.sessions.supportsModelSwitchInSession) {
            return;
          }
          const supportsModelSwitchInSession = canSwitchModelInSession(
            yield* runtime.getConfigOptions,
            (yield* Ref.get(activeSessionSetup))?.sessionSetupResult.models,
          );
          if (!supportsModelSwitchInSession) {
            return;
          }
          providerSession = {
            ...providerSession,
            capabilities: {
              ...capabilities,
              sessions: { ...capabilities.sessions, supportsModelSwitchInSession },
            },
            updatedAt: yield* DateTime.now,
          };
          yield* emitProviderEvent({ type: "provider_session.updated", driver, providerSession });
        });
        reportStartupPhase = Effect.fn("AcpAdapterV2.reportStartupPhase")(function* (
          phase: string | undefined,
        ) {
          if (providerSession.startupPhase === phase) return;
          const { startupPhase: _reported, ...reported } = providerSession;
          providerSession = {
            ...reported,
            ...(phase === undefined ? {} : { startupPhase: phase }),
            updatedAt: yield* DateTime.now,
          };
          yield* emitProviderEvent({ type: "provider_session.updated", driver, providerSession });
        });
        lateSessionSetup.openSessionConfigured = true;
        const pendingLateSessionSetup = lateSessionSetup.pending;
        lateSessionSetup.pending = null;
        if (pendingLateSessionSetup !== null) {
          yield* pendingLateSessionSetup;
        }

        const providerTurnPayload = (
          context: ActiveAcpTurn,
          status: OrchestrationV2ProviderTurn["status"],
          completedAt: DateTime.Utc | null,
        ): OrchestrationV2ProviderTurn => ({
          id: context.providerTurnId,
          providerThreadId: context.input.providerThread.id,
          nodeId: context.input.rootNodeId,
          runAttemptId: context.input.attemptId,
          nativeTurnRef:
            context.nativePromptId === undefined
              ? { driver, nativeId: context.nativeTurnId, strength: "weak" }
              : { driver, nativeId: context.nativePromptId, strength: "strong" },
          ordinal: context.input.providerTurnOrdinal,
          status,
          startedAt: context.startedAt,
          completedAt,
          ...(status === "running" || status === "pending"
            ? {}
            : {
                // The prompt tap only captures usage for flavors that declared
                // per-turn counters, so undeclared agents stay unavailable here.
                turnTokenUsage: acpPerTurnPromptUsage(
                  context.promptUsage,
                  context.subagents.size > 0,
                  status,
                  flavor.geminiPromptUsage,
                ),
              }),
        });

        const terminalizeOpenRunOwnedItems = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          options: { readonly terminalizeSubagents: boolean },
        ) {
          for (const tool of context.tools.values()) {
            const status = toolStatus(tool.status);
            if (status === "pending" || status === "running" || status === "waiting") {
              yield* emitTool(context, tool, "interrupted");
            }
          }
          if (!options.terminalizeSubagents) return;
          for (const subagent of context.subagents.values()) {
            yield* terminalizeSubagentTools(subagent);
            if (subagent.task.status !== "running" && subagent.task.status !== "pending") {
              continue;
            }
            yield* emitSubagent(context, {
              nativeTaskId: subagent.task.nativeTaskRef?.nativeId ?? subagent.task.id,
              prompt: subagent.task.prompt,
              title: subagent.task.title,
              model: subagent.task.model,
              status: "interrupted",
              childSessionId: subagent.childSessionId,
              result: subagent.task.result,
              suppressNormalTool: true,
            });
          }
        });

        const terminalizeOpenForegroundTools = Effect.fnUntraced(function* (
          context: ActiveAcpTurn,
          status: "completed" | "failed" = "completed",
          options?: { readonly unstartedOnly?: boolean },
        ) {
          for (const tool of context.tools.values()) {
            if (!acpCompletedTurnShouldTerminalizeTool(tool, { ...flavor, extractSubagentUpdate }))
              continue;
            if (options?.unstartedOnly === true && tool.status !== "pending") continue;
            yield* emitTool(context, tool, status);
          }
        });

        /**
         * `cancelAfterPromptStarts`: waits until the agent started the prompt or the
         * bound passed since `session/prompt` (since Stop, if none was sent). False
         * when the prompt settled first, so there is nothing to cancel.
         */
        const promptStillRunsAfterHold = Effect.fnUntraced(function* (context: ActiveAcpTurn) {
          const hold = flavor.cancelAfterPromptStarts;
          if (hold === undefined) return true;
          if (yield* Deferred.isDone(context.promptStarted)) return true;
          yield* options.testHooks?.onCancelHeld?.() ?? Effect.void;
          const boundPassed = Effect.gen(function* () {
            const now = yield* Clock.currentTimeMillis;
            const elapsed = now - (context.promptSentAt ?? now);
            yield* Effect.sleep(
              Duration.millis(Math.max(0, Duration.toMillis(hold.bound) - elapsed)),
            );
          });
          return yield* Effect.raceFirst(
            Effect.raceFirst(Deferred.await(context.promptStarted), boundPassed).pipe(
              Effect.as(true),
            ),
            Deferred.await(context.completed).pipe(Effect.as(false)),
          );
        });
        const quarantineStoppedRun = Effect.fnUntraced(function* () {
          yield* continuationPermit.withPermit(
            Effect.gen(function* () {
              yield* Ref.update(continuationGeneration, (value) => value + 1);
              yield* Ref.set(stoppedRunQuarantine, true);
              yield* Ref.set(wakeBuffer, []);
              yield* Ref.set(wakeReports, noWakeReports);
              yield* Ref.set(continuationRequested, false);
              yield* Ref.set(runningBackgroundTaskIds, new Set());
              yield* Ref.set(detachedBackgroundCommands, new Map());
              yield* Ref.set(midTurnUnreportedCompletedTaskIds, new Set());
              const previousCarryover = yield* Ref.getAndSet(carryoverSubagents, null);
              if (previousCarryover !== null) {
                yield* Effect.forEach(previousCarryover.subagents, stopSubagentTranscriptFollower, {
                  discard: true,
                });
              }
              yield* Ref.set(lastTurnRoute, null);
            }),
          );
        });

        // Re-applying the thread's mode would undo a deliberate exit, such as leaving plan mode once
        // the plan was approved. Report it instead, so picking the old mode again is a real change.
        const reportAgentModeChanges = Effect.fnUntraced(function* (threadId: ThreadId) {
          const selection = yield* Ref.get(activeSelection);
          if (selection === null || selection.options === undefined) return;
          const configured = yield* Ref.get(configuredModes);
          const live = yield* readModes;
          const changes: Array<{ id: string; from: string; to: string }> = [];
          const options = selection.options.map((option) => {
            const value = live.get(option.id);
            if (
              value === undefined ||
              typeof option.value !== "string" ||
              value === configured.get(option.id) ||
              value === option.value
            ) {
              return option;
            }
            changes.push({ id: option.id, from: option.value, to: value });
            return { ...option, value };
          });
          if (changes.length === 0) return;
          yield* Ref.set(activeSelection, { ...selection, options });
          yield* Ref.set(configuredModes, live);
          yield* emitProviderEvent({
            type: "thread_model_selection.updated",
            driver,
            threadId,
            instanceId: selection.instanceId,
            changes,
          });
        });

        const finalizeTurn = bindFinalizeTurn({
          activeSessionId,
          activeTurn,
          carryoverSubagents,
          closeTextStreams,
          compactsContext,
          contextUsageBySessionId,
          detachBackgroundCommands,
          driver,
          emitProviderEvent,
          emitProviderRetry,
          emitSubagent,
          flavor,
          flushPendingSubagentAssistant,
          get followsAgentWorkState() {
            return followsAgentWorkState;
          },
          set followsAgentWorkState(value) {
            followsAgentWorkState = value;
          },
          hasWorkingDescendant,
          idAllocator,
          input,
          markSessionCompacted,
          mcpSessions,
          midTurnUnreportedCompletedTaskIds,
          offerContinuationRun,
          options,
          get postSettleContinuationEnabled() {
            return postSettleContinuationEnabled;
          },
          set postSettleContinuationEnabled(value) {
            postSettleContinuationEnabled = value;
          },
          providerThreadByNativeSessionId,
          providerTurnPayload,
          reportAgentModeChanges,
          resolveItemOrdinal,
          runningBackgroundTaskIds,
          steerInjections,
          stoppedRunQuarantine,
          terminalizeOpenForegroundTools,
          terminalizeOpenRunOwnedItems,
          textEmissionPermit,
          wakeBuffer,
          get finalizeTurn() {
            return finalizeTurn;
          },
        });

        scheduleDeferredFinalize = Effect.fn("scheduleDeferredFinalize")(function* (context) {
          if (!defersFinalizeForBackgroundWork) return;
          if (!context.promptSettled || context.finalized || context.interrupted) return;
          if (hasDeferredBackgroundWork(context)) return;
          context.backgroundFinalizeGeneration += 1;
          const generation = context.backgroundFinalizeGeneration;
          const replyOpen = context.replyOpen;
          const debounce = replyOpen ? ACP_OPEN_REPLY_QUIET_LIMIT : ACP_DEFERRED_FINALIZE_DEBOUNCE;
          yield* Effect.gen(function* () {
            yield* Effect.sleep(debounce);
            const stillCurrent = () =>
              !context.finalized &&
              !context.interrupted &&
              context.backgroundFinalizeGeneration === generation &&
              !hasDeferredBackgroundWork(context);
            if (!stillCurrent()) return;
            const pendingReply =
              !replyOpen && flavor.hasPendingReply !== undefined
                ? yield* flavor.hasPendingReply(context.nativeThreadId)
                : false;
            if (!stillCurrent()) return;
            if (pendingReply) {
              context.replyOpen = true;
              yield* scheduleDeferredFinalize(context);
              return;
            }
            const status = context.promptSettledStatus ?? "completed";
            yield* finalizeTurn(context, status);
          }).pipe(Effect.forkIn(sessionScope), Effect.asVoid);
          yield* options.testHooks?.onDeferredFinalizeScheduled?.(debounce) ?? Effect.void;
        });

        const schedulePostSettleHoldExpiry = Effect.fn("AcpAdapterV2.schedulePostSettleHoldExpiry")(
          function* (context: ActiveAcpTurn) {
            const hold = flavor.postSettleCommandHold;
            if (hold === undefined) return;
            if (!context.promptSettled || context.finalized) return;
            const timeoutMillis = Duration.toMillis(hold.timeout);
            const isRunningCommand = (tool: AcpToolCallState) =>
              toolStatus(tool.status) === "running" && hold.isCommand(tool);
            let quietSince = yield* Clock.currentTimeMillis;
            // Armed even without a command yet: a pending reply can still start one.
            yield* Effect.gen(function* () {
              while (!context.finalized) {
                quietSince = Math.max(quietSince, context.lastProgressAt);
                const now = yield* Clock.currentTimeMillis;
                const remaining = quietSince + timeoutMillis - now;
                if (remaining > 0) {
                  yield* Effect.sleep(Duration.millis(remaining));
                  continue;
                }
                if (
                  context.tools.values().some(isRunningCommand) &&
                  !hasDeferredBackgroundWork(context, isRunningCommand)
                ) {
                  yield* finalizeTurn(context, context.promptSettledStatus ?? "completed");
                  return;
                }
                // Something else still holds the turn; count silence again once it clears.
                quietSince = now;
              }
            }).pipe(Effect.forkIn(sessionScope), Effect.asVoid);
          },
        );

        const promptInactivityPaused = Effect.fn("AcpAdapterV2.promptInactivityPaused")(function* (
          context: ActiveAcpTurn,
        ) {
          if (openAgentRequests.size > 0) return true;
          if ((yield* Ref.get(pendingRuntimeRequests)).size > 0) return true;
          for (const tool of context.tools.values()) {
            const status = toolStatus(tool.status);
            if (status === "pending" || status === "running" || status === "waiting") return true;
          }
          for (const subagent of context.subagents.values()) {
            if (acpSubagentStatusBlocksTurnSettlement(subagent.task.status)) return true;
          }
          return false;
        });

        /**
         * Holds the transition permit from the deadline check through process teardown,
         * so Stop and the next turn see either a running prompt or a replaced runtime.
         */
        const retireInactivePrompt = Effect.fn("AcpAdapterV2.retireInactivePrompt")(function* (
          context: ActiveAcpTurn,
          generation: number,
          timeoutMillis: number,
          checkPromptOutcome: PromptOutcomeCheck | undefined,
        ) {
          const retired = yield* runRuntimeCallbackAtGeneration(
            generation,
            Effect.gen(function* () {
              if (context.finalized || context.interrupted) return "done" as const;
              if ((yield* Ref.get(activeTurn)) !== context) return "done" as const;
              if (yield* Deferred.isDone(context.promptWireSettled)) return "done" as const;
              const now = yield* Clock.currentTimeMillis;
              if (context.lastProgressAt + timeoutMillis > now) return "rearm" as const;
              if (yield* promptInactivityPaused(context)) {
                context.lastProgressAt = now;
                return "rearm" as const;
              }
              context.inactivityWatchdog = undefined;
              openAgentRequests.clear();
              yield* quarantineNativeTransportAtGeneration(generation);
              yield* advanceRuntimeCallbackGeneration;
              yield* Ref.set(runtimeRestartRequired, true);
              yield* cancelPendingRuntimeRequests();
              yield* terminalizeOpenForegroundTools(context, "failed");
              // Bounded: it runs under the transition permit that Stop and the next turn wait on.
              const recorded =
                checkPromptOutcome === undefined
                  ? undefined
                  : yield* checkPromptOutcome({ stopReason: "end_turn" }, { retired: true }).pipe(
                      Effect.timeout(PROMPT_OUTCOME_CHECK_TIMEOUT),
                      Effect.catchCause((cause) =>
                        Effect.logError("failed to check a silent ACP prompt's outcome", {
                          driver,
                          cause,
                        }).pipe(Effect.as(undefined)),
                      ),
                    );
              const minutes = Math.max(1, Math.round(timeoutMillis / 60_000));
              yield* finalizeTurn(
                context,
                "failed",
                recorded?.failure ??
                  makeProviderFailure({
                    class: "provider_error",
                    message: `${flavor.runtimeHarness ?? driver} sent nothing for ${minutes} ${minutes === 1 ? "minute" : "minutes"}, so T3 Code stopped the turn and restarted the agent. Send a message to continue.`,
                  }),
                recorded === undefined
                  ? undefined
                  : { threadDisposition: recorded.threadDisposition },
              );
              return "retired" as const;
            }),
          );
          if (Option.isNone(retired) || retired.value !== "retired") {
            return Option.getOrElse(retired, () => "done" as const);
          }
          yield* Effect.logWarning("orchestration-v2.acp-prompt-inactive", {
            driver,
            providerSessionId: input.providerSessionId,
            providerTurnId: context.providerTurnId,
            timeoutMillis,
          });
          if (runtimeScope !== undefined) {
            yield* Scope.close(runtimeScope, Exit.void).pipe(Effect.ignore);
          }
          return "retired" as const;
        });

        const watchPromptInactivity = Effect.fn("AcpAdapterV2.watchPromptInactivity")(function* (
          context: ActiveAcpTurn,
          generation: number,
          timeoutMillis: number,
          checkPromptOutcome: PromptOutcomeCheck | undefined,
        ) {
          yield* Deferred.await(context.promptDispatched);
          context.lastProgressAt = yield* Clock.currentTimeMillis;
          while (true) {
            const sliceStartedAt = yield* Clock.currentTimeMillis;
            const remaining = context.lastProgressAt + timeoutMillis - sliceStartedAt;
            if (remaining > 0) {
              const slice = Math.min(remaining, ACP_PROMPT_INACTIVITY_SLICE_MILLIS);
              yield* Effect.sleep(Duration.millis(slice));
              // Host sleep is not agent silence. Timers either fire late on wake (macOS, Windows)
              // or pause while the wall clock jumps (Linux); both overrun a short slice.
              const now = yield* Clock.currentTimeMillis;
              if (now - sliceStartedAt > slice + ACP_HOST_SLEEP_TOLERANCE_MILLIS) {
                context.lastProgressAt = now;
              }
              continue;
            }
            const outcome = yield* runtimeTransitionPermit.withPermit(
              retireInactivePrompt(context, generation, timeoutMillis, checkPromptOutcome),
            );
            if (outcome !== "rearm") return;
          }
        });

        const imageAttachmentBlocks = Effect.fnUntraced(function* (
          attachments: ReadonlyArray<ChatAttachment>,
        ) {
          const blocks: Array<EffectAcpSchema.ContentBlock> = [];
          for (const attachment of attachments.filter(isProviderNativeImageAttachment)) {
            const path = host.resolveAttachmentPath(attachment as ChatAttachment);
            if (path === null) {
              return yield* new ProviderAdapter.ProviderAdapterProtocolError({
                driver,
                detail: `Invalid attachment id '${attachment.id}'`,
              });
            }
            const bytes = yield* fileSystem.readFile(path).pipe(
              Effect.mapError(
                (cause) =>
                  new ProviderAdapter.ProviderAdapterProtocolError({
                    driver,
                    detail: `Failed to read attachment '${attachment.id}'`,
                    reason: "attachment_unreadable",
                    payload: cause,
                  }),
              ),
            );
            blocks.push({
              type: "image",
              data: Buffer.from(bytes).toString("base64"),
              mimeType: attachment.mimeType,
            });
          }
          return blocks;
        });

        const promptAttachmentBlocks = Effect.fnUntraced(function* (
          messageText: string,
          attachments: ReadonlyArray<ChatAttachment>,
        ) {
          // Without image prompts the saved path already in the message text is how the agent
          // reaches the image; a flavor's own builder checks the capabilities it is handed.
          if (!flavor.buildAttachmentPrompt) {
            return supportsImagePrompts ? yield* imageAttachmentBlocks(attachments) : [];
          }
          const setup = yield* Ref.get(activeSessionSetup);
          return yield* flavor
            .buildAttachmentPrompt({
              text: messageText,
              attachments,
              resolveAttachmentPath: host.resolveAttachmentPath,
              promptCapabilities: setup?.initializeResult.agentCapabilities?.promptCapabilities,
            })
            .pipe(
              Effect.mapError(
                (cause) =>
                  new ProviderAdapter.ProviderAdapterProtocolError({
                    driver,
                    detail: "Failed to build ACP attachment prompt",
                    payload: cause,
                  }),
              ),
            );
        });

        const resolvePromptParts = Effect.fnUntraced(function* (
          turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
          sessionId: string,
        ) {
          const mcpSession = yield* mcpSessions.read(turnInput.threadId);
          const instructionState = {
            interactionMode: turnInput.runtimePolicy.interactionMode,
            hasT3Mcp: mcpSession !== undefined,
            hasDeviceTools: mcpSession?.capabilities?.has("device") === true,
          } satisfies T3AcpInstructionState;
          const userText =
            flavor.rewriteUserText === undefined
              ? turnInput.message.text
              : yield* flavor
                  .rewriteUserText(turnInput.message.text, turnInput)
                  .pipe(
                    Effect.provideService(
                      ChildProcessSpawner.ChildProcessSpawner,
                      childProcessSpawner,
                    ),
                  );
          const messageText = yield* providerMessageTextWithAttachmentPaths({
            text: userText,
            attachments: turnInput.message.attachments,
            resolveAttachmentPath: host.resolveAttachmentPath,
            resolveExtractedTextPath: host.resolveExtractedTextPath,
          });
          const isNativeSlashCommand = userText.trimStart().startsWith("/");
          const attachmentBlocks = yield* promptAttachmentBlocks(
            messageText,
            turnInput.message.attachments,
          );
          // Read delivery state after the awaits above, so a compaction that lands
          // while the prompt is prepared still resends the notes in this prompt.
          const previousInstructionState = (yield* Ref.get(promptInstructionStates)).get(sessionId);
          const compactionMarker = (yield* Ref.get(compactionMarkers)).get(sessionId);
          const deliveredContext = (yield* Ref.get(deliveredAppContext)).get(sessionId);
          const appContextEntries = unsentAcpAppContext(
            turnInput.appContext,
            deliveredContext,
            isNativeSlashCommand,
          );
          const text = t3AcpPromptWithInstructions({
            prompt: messageText,
            state: instructionState,
            ...(previousInstructionState === undefined || compactionMarker !== undefined
              ? {}
              : { previousState: previousInstructionState }),
          });
          const sessionSetup = yield* Ref.get(activeSessionSetup);
          const runtimeInstructions = buildRuntimeInstructions({
            agentFeedback: instructionState.hasT3Mcp ? (turnInput.agentFeedback ?? "off") : "off",
            harness: flavor.runtimeHarness ?? driver,
            model: turnInput.modelSelection.model,
            runtimePolicy: turnInput.runtimePolicy,
            pullRequestLinking:
              sessionSetup === null ||
              flavor.sessionCarriesPullRequestLinking?.(sessionSetup.initializeResult) !== true,
          });
          // The agent keeps its own history, so resend only after compaction or when the text changes.
          const sendRuntimeInstructions =
            !isNativeSlashCommand &&
            (compactionMarker !== undefined ||
              (yield* Ref.get(promptRuntimeInstructions)).get(sessionId) !== runtimeInstructions);
          const promptText = flavor.buildAttachmentPrompt ? text.trim() : text;
          const prompt: Array<EffectAcpSchema.ContentBlock> =
            promptText.length > 0 ? [{ type: "text", text: promptText }] : [];
          prompt.push(...attachmentBlocks);
          if (prompt.length === 0) {
            return yield* new ProviderAdapter.ProviderAdapterProtocolError({
              driver,
              detail: "ACP turn requires non-empty text or attachments",
            });
          }
          if (appContextEntries.length > 0) {
            prompt.unshift(
              ...appContextEntries.map((entry) => ({
                type: "text" as const,
                text: formatAcpAppContextEntry(entry),
              })),
            );
          }
          if (sendRuntimeInstructions) {
            prompt.push({ type: "text", text: runtimeInstructions });
          }
          return {
            prompt,
            instructionState: text === messageText ? undefined : instructionState,
            runtimeInstructions: sendRuntimeInstructions ? runtimeInstructions : undefined,
            appContextEntries,
            compactionMarker,
          };
        });

        const restartRuntimeAfterTeardownIfRequired = Effect.fnUntraced(function* (
          threadId: ThreadId | null,
        ) {
          const restartRequired = yield* Ref.get(runtimeRestartRequired);
          if (!restartRequired) return false;
          yield* restartAcpRuntime(threadId);
          yield* Ref.set(runtimeRestartRequired, false);
          yield* Ref.set(activeSessionId, null);
          yield* Ref.set(activeSessionSetup, null);
          yield* resetPublishedCatalogKey;
          yield* Ref.set(activeSelection, null);
          yield* Ref.set(activeInteractionMode, null);
          // A failed prompt may have been dropped, so the fresh runtime sends T3's notes again.
          yield* Ref.set(promptInstructionStates, new Map());
          yield* Ref.set(promptRuntimeInstructions, new Map());
          yield* Ref.set(deliveredAppContext, new Map());
          yield* Ref.set(compactionMarkers, new Map());
          yield* Ref.set(completedCompactionIds, new Set());
          yield* Ref.set(snapshot, emptySnapshotState());
          return true;
        });

        const commitAcpAppContext = Effect.fnUntraced(function* (input: {
          readonly context: ActiveAcpTurn;
          readonly entries: ReadonlyArray<AcpAppContextEntry>;
          readonly compactionMarker: symbol | undefined;
          readonly sequence: number;
        }) {
          if (input.entries.length === 0) return;
          if (
            (yield* Ref.get(compactionMarkers)).get(input.context.nativeThreadId) !==
            input.compactionMarker
          ) {
            return;
          }
          const freshEntries = input.entries.filter(
            (entry) =>
              (input.context.appContextCommittedSequence.get(entry.key) ?? 0) < input.sequence,
          );
          if (freshEntries.length === 0) return;
          for (const entry of freshEntries) {
            input.context.appContextCommittedSequence.set(entry.key, input.sequence);
          }
          yield* Ref.update(deliveredAppContext, (current) => {
            const updated = new Map(current);
            updated.set(
              input.context.nativeThreadId,
              mergeAcpAppContext(current.get(input.context.nativeThreadId), freshEntries),
            );
            return updated;
          });
        });

        /** Follows a turn's `session/prompt`; a prompt-steer's prompt supersedes the one before. */
        const followPrompt = bindFollowPrompt({
          closeTextStreams,
          commitAcpAppContext,
          compactionMarkers,
          get defersFinalizeForBackgroundWork() {
            return defersFinalizeForBackgroundWork;
          },
          set defersFinalizeForBackgroundWork(value) {
            defersFinalizeForBackgroundWork = value;
          },
          driver,
          finalizeTurn,
          finishRegisteredBackgroundTool,
          flavor,
          get followsAgentWorkState() {
            return followsAgentWorkState;
          },
          set followsAgentWorkState(value) {
            followsAgentWorkState = value;
          },
          hasDeferredBackgroundWork,
          hasSurvivingBackgroundWork,
          idleReportedSubagents,
          input,
          markSessionCompacted,
          options,
          get pendingStopCloseTurn() {
            return pendingStopCloseTurn;
          },
          set pendingStopCloseTurn(value) {
            pendingStopCloseTurn = value;
          },
          promptInstructionStates,
          promptRuntimeInstructions,
          reportProviderRetry,
          resolvePromptParts,
          runRuntimeCallbackAtGeneration,
          get runtime() {
            return runtime;
          },
          set runtime(value) {
            runtime = value;
          },
          runtimeRestartRequired,
          get scheduleDeferredFinalize() {
            return scheduleDeferredFinalize;
          },
          set scheduleDeferredFinalize(value) {
            scheduleDeferredFinalize = value;
          },
          schedulePostSettleHoldExpiry,
          sessionScope,
          started,
          steersWithPrompt,
          stopReasonFailure,
          terminalizeOpenForegroundTools,
          get followPrompt() {
            return followPrompt;
          },
          get steerWithPrompt() {
            return steerWithPrompt;
          },
        });

        const startTurnUnlocked = bindStartTurnUnlocked({
          activateSession,
          activeInteractionMode,
          activeSelection,
          activeSessionId,
          activeSessionSetup,
          activeTurn,
          advertisedCommandNames,
          get agentWork() {
            return agentWork;
          },
          set agentWork(value) {
            agentWork = value;
          },
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
          get defersFinalizeForBackgroundWork() {
            return defersFinalizeForBackgroundWork;
          },
          set defersFinalizeForBackgroundWork(value) {
            defersFinalizeForBackgroundWork = value;
          },
          deliveredAppContext,
          deriveProviderTurnId,
          driver,
          emitProviderEvent,
          finalizeTurn,
          flavor,
          followPrompt,
          get followsAgentWorkState() {
            return followsAgentWorkState;
          },
          set followsAgentWorkState(value) {
            followsAgentWorkState = value;
          },
          handleSessionUpdate,
          handledBackgroundTaskIdsInActiveTurn,
          hasDeferredBackgroundWork,
          idleReportedSubagents,
          input,
          lastTurnRoute,
          get latestRuntimePolicy() {
            return latestRuntimePolicy;
          },
          set latestRuntimePolicy(value) {
            latestRuntimePolicy = value;
          },
          loadingSessionId,
          midTurnUnreportedCompletedTaskIds,
          nativeMetadataBySessionId,
          noWakeReports,
          get postSettleContinuationEnabled() {
            return postSettleContinuationEnabled;
          },
          set postSettleContinuationEnabled(value) {
            postSettleContinuationEnabled = value;
          },
          projectDeferredCarryoverTerminals,
          promptInactivityTimeoutMillis,
          providerThreadByNativeSessionId,
          providerTurnPayload,
          rearmDeferredFinalize,
          rememberSnapshotMessage,
          resolvePromptParts,
          restartRuntimeAfterTeardownIfRequired,
          get rootForegroundWork() {
            return rootForegroundWork;
          },
          set rootForegroundWork(value) {
            rootForegroundWork = value;
          },
          get runtime() {
            return runtime;
          },
          set runtime(value) {
            runtime = value;
          },
          runtimeCallbackGeneration,
          runtimeCallbackPermit,
          get scheduleDeferredFinalize() {
            return scheduleDeferredFinalize;
          },
          set scheduleDeferredFinalize(value) {
            scheduleDeferredFinalize = value;
          },
          schedulePostSettleHoldExpiry,
          sessionScope,
          setActiveSessionSetup,
          settleIdleWork,
          stoppedRunQuarantine,
          suppressPostSettleMonitorPrompt,
          syncNativeChildren,
          get turnAttached() {
            return turnAttached;
          },
          set turnAttached(value) {
            turnAttached = value;
          },
          useProviderThreadIdentity,
          validateModelSelection,
          wakeBuffer,
          wakeReports,
          watchPromptInactivity,
          get startTurn() {
            return startTurn;
          },
          get startTurnUnlocked() {
            return startTurnUnlocked;
          },
        });

        const startTurn = Effect.fn("AcpAdapterV2.startTurn.transition")(function* (
          turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
        ) {
          return yield* runtimeTransitionPermit.withPermit(startTurnUnlocked(turnInput));
        });

        const steerWithPrompt = bindSteerWithPrompt({
          activeTurn,
          compactionMarkers,
          deliveredAppContext,
          driver,
          flavor,
          followPrompt,
          host,
          promptAttachmentBlocks,
          promptInactivityTimeoutMillis,
          runRuntimeCallbackAtGeneration,
          get runtime() {
            return runtime;
          },
          set runtime(value) {
            runtime = value;
          },
          runtimeCallbackGeneration,
          runtimeTransitionPermit,
          sessionScope,
          watchPromptInactivity,
          get steerWithPrompt() {
            return steerWithPrompt;
          },
        });

        yield* Effect.addFinalizer(() =>
          Effect.gen(function* () {
            yield* continuationPermit.withPermit(
              Effect.gen(function* () {
                yield* Ref.set(continuationClosed, true);
                yield* Ref.update(continuationGeneration, (value) => value + 1);
              }),
            );
            // A session released mid-prompt (worktree handoff) never sees its prompt settle.
            const openTurn = yield* Ref.get(activeTurn);
            if (openTurn !== null && !openTurn.finalized) {
              openTurn.interrupted = true;
              yield* finalizeTurn(openTurn, "interrupted");
            }
            const requests = [...(yield* Ref.get(pendingRuntimeRequests)).values()];
            yield* Effect.forEach(
              requests,
              (request) =>
                request.type === "approval"
                  ? Deferred.succeed(request.decision, "cancel").pipe(Effect.ignore)
                  : Deferred.succeed(request.answers, null).pipe(Effect.ignore),
              { discard: true },
            );
            const closingError = new EffectAcpErrors.AcpTransportError({
              detail: "The ACP session closed before its admitted response reached the transport",
              cause: "ACP session transport closed",
            });
            yield* Effect.forEach(
              requests,
              (request) => Deferred.fail(request.nativeResponseAcknowledgement, closingError),
              { discard: true },
            );
            const transportHadOutstandingResponses = yield* closeNativeTransport;
            const sessionCapabilities =
              started.initializeResult.agentCapabilities?.sessionCapabilities;
            if (sessionCapabilities?.close != null) {
              yield* runtimeTransitionPermit.withPermitsIfAvailable(1)(
                Effect.gen(function* () {
                  const teardownState = yield* Ref.get(runtimeTeardownState);
                  const restartRequired = yield* Ref.get(runtimeRestartRequired);
                  if (
                    teardownState._tag === "Idle" &&
                    !restartRequired &&
                    !transportHadOutstandingResponses
                  ) {
                    // Finalizers can't be interrupted, so an agent that never
                    // answers would keep its process and this scope open.
                    yield* runtime
                      .closeSession()
                      .pipe(Effect.timeoutOption("10 seconds"), Effect.ignore);
                  }
                }),
              );
            }
            if (flavor.assertComplete !== undefined) {
              yield* flavor.assertComplete.pipe(Effect.orDie);
            }
            if (runtimeScope !== undefined) {
              yield* Scope.close(runtimeScope, Exit.void).pipe(Effect.ignore);
            }
          }),
        );

        // A replacement agent can negotiate capabilities the initial agent did not have.
        const canReportBackgroundWork =
          continuationRequests !== undefined &&
          (flavor.followAgentWorkState === true || Boolean(flavor.enablePostSettleContinuation));
        const sessionHasPendingBackgroundWork = Effect.gen(function* () {
          if (!postSettleContinuationEnabled && !followsAgentWorkState) return false;
          const rootSessionId = yield* Ref.get(activeSessionId);
          if (
            followsAgentWorkState &&
            rootSessionId !== null &&
            hasWorkingDescendant(rootSessionId)
          )
            return true;
          if (
            followsAgentWorkState &&
            (agentWork?.state === "running" ||
              agentWork?.state === "requires_action" ||
              agentRequests.size > 0)
          )
            return true;
          if ((yield* Ref.get(wakeBuffer)).length > 0) return true;
          if ((yield* Ref.get(midTurnUnreportedCompletedTaskIds)).size > 0) return true;
          if (yield* Ref.get(continuationRequested)) return true;
          if ((yield* Ref.get(runningBackgroundTaskIds)).size > 0) return true;
          const active = yield* Ref.get(activeTurn);
          if (
            active !== null &&
            [...active.subagents.values()].some(acpSubagentHasPendingBackgroundWork)
          ) {
            return true;
          }
          const carryover = yield* Ref.get(carryoverSubagents);
          if (carryover !== null && carryover.subagents.some(acpSubagentHasPendingBackgroundWork)) {
            return true;
          }
          return false;
        });
        const sessionRuntime = bindSessionRuntime({
          activateSession,
          activeInteractionMode,
          activeSelection,
          activeSessionId,
          activeSessionSetup,
          activeTurn,
          advanceRuntimeCallbackGeneration,
          agentRequests,
          get agentWork() {
            return agentWork;
          },
          set agentWork(value) {
            agentWork = value;
          },
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
          get defersFinalizeForBackgroundWork() {
            return defersFinalizeForBackgroundWork;
          },
          set defersFinalizeForBackgroundWork(value) {
            defersFinalizeForBackgroundWork = value;
          },
          deliveredAppContext,
          driver,
          events,
          finalizeTurn,
          flavor,
          get followsAgentWorkState() {
            return followsAgentWorkState;
          },
          set followsAgentWorkState(value) {
            followsAgentWorkState = value;
          },
          host,
          idAllocator,
          imageAttachmentBlocks,
          input,
          get itemIdentityVersion() {
            return itemIdentityVersion;
          },
          set itemIdentityVersion(value) {
            itemIdentityVersion = value;
          },
          loadingSessionId,
          nativeChildren,
          options,
          pendingRuntimeRequests,
          get pendingStopCloseTurn() {
            return pendingStopCloseTurn;
          },
          set pendingStopCloseTurn(value) {
            pendingStopCloseTurn = value;
          },
          prepareTerminalEnvironment,
          promptStillRunsAfterHold,
          get providerSession() {
            return providerSession;
          },
          set providerSession(value) {
            providerSession = value;
          },
          providerThreadByNativeSessionId,
          quarantineNativeTransportAtGeneration,
          quarantineStoppedRun,
          readMcpContext,
          rememberTerminalEnvironment,
          restartRuntimeAfterTeardownIfRequired,
          get runtime() {
            return runtime;
          },
          set runtime(value) {
            runtime = value;
          },
          runtimeCallbackGeneration,
          runtimeCallbackPermit,
          runtimeRestartRequired,
          runtimeTeardownState,
          runtimeTransitionPermit,
          sessionHasPendingBackgroundWork,
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
          get sessionRuntime() {
            return sessionRuntime;
          },
        });
        return sessionRuntime;
      },
      (effect, input) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterOpenSessionError({
                driver,
                providerSessionId: input.providerSessionId,
                ...(flavor.requiresSignIn?.(cause) === true ? { requiresSignIn: true } : {}),
                cause,
              }),
          ),
        ),
    ),
  });
});
