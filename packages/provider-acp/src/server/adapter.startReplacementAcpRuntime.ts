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

import type { AcpAdapterV2RuntimeInput } from "./adapter.helpers.ts";

export const bindStartReplacementAcpRuntime = (ctx: any): any =>
  Effect.fnUntraced(function* (
    threadId: ThreadId | null,
    commitSessionState: (
      replacement: AcpSessionRuntime.AcpSessionRuntimeStartResult,
    ) => Effect.Effect<void>,
  ) {
    const {
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
      prepareTerminalEnvironment,
      projectAcpRuntimeSessionUpdate,
      projectAcpRuntimeSessionUpdateEffect,
      quarantineNativeTransportAtGeneration,
      random,
      readMcpContext,
      runtimeCallbackGeneration,
      runtimeCallbackPermit,
      startReplacementAcpRuntime,
      started,
      wireAcpRuntimeHandlers,
      wireAcpRuntimeMcpHandlers,
      wireAcpRuntimeTerminalHandlers,
    } = pickBindCtx(ctx);

    const previousScope = ctx.runtimeScope;
    const previousGeneration = yield* Ref.get(runtimeCallbackGeneration);
    yield* runtimeCallbackPermit.withPermit(awaitAdmittedNativeResponses);

    // Keep live callbacks active until replacement startup succeeds.
    const replacementGeneration = yield* allocateRuntimeCallbackGeneration;
    const replacementScope = yield* Scope.make();
    const replacementAgentRequests = new Set<string>();
    type CandidateLifecycle =
      | { readonly _tag: "Starting" }
      | { readonly _tag: "Terminated"; readonly error: EffectAcpErrors.AcpError }
      | { readonly _tag: "Committed" };
    const candidateLifecycle = yield* Ref.make<CandidateLifecycle>({ _tag: "Starting" });
    const handleCandidateTermination: AcpAdapterV2RuntimeInput["onTermination"] = (error) =>
      Ref.modify(
        candidateLifecycle,
        (current): readonly [Effect.Effect<void>, CandidateLifecycle] => {
          if (current._tag === "Committed") {
            return [handleRuntimeTerminationAtGeneration(replacementGeneration), current];
          }
          return [
            Effect.void,
            current._tag === "Terminated" ? current : ({ _tag: "Terminated", error } as const),
          ];
        },
      ).pipe(Effect.flatten);
    const stagedSessionUpdates: Array<EffectAcpSchema.SessionNotification> = [];
    let handleCandidateSessionUpdate: (
      notification: EffectAcpSchema.SessionNotification,
    ) => Effect.Effect<void, EffectAcpErrors.AcpError> = (notification) =>
      Effect.sync(() => {
        stagedSessionUpdates.push(notification);
      });
    let replacementMcpBridge: AcpMcpOverAcpBridge | undefined;
    const startup = Effect.gen(function* () {
      const mcpContext = yield* readMcpContext(threadId);
      replacementMcpBridge = yield* makeRuntimeMcpBridge(mcpContext, replacementScope);
      const replacementRuntime = yield* flavor
        .makeRuntime(
          makeRuntimeInput(
            replacementGeneration,
            replacementAgentRequests,
            mcpContext,
            undefined,
            handleCandidateTermination,
          ),
        )
        .pipe(
          Effect.provideService(Scope.Scope, replacementScope),
          Effect.provideService(SecureRandom.SecureRandom, random),
          Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, childProcessSpawner),
          Effect.provideService(AgentScope, agentScope),
          Effect.provideService(AgentScopeThreadId, threadId ?? undefined),
        );
      yield* replacementRuntime.handleSessionUpdate((notification) =>
        Effect.suspend(() => handleCandidateSessionUpdate(notification)),
      );
      yield* wireAcpRuntimeMcpHandlers(replacementRuntime, replacementMcpBridge);
      const started = yield* replacementRuntime.start();
      return { replacementRuntime, started };
    });
    const replacementExit = yield* Effect.exit(
      (flavor.withRuntimeStartup?.(startup) ?? startup).pipe(
        Effect.onInterrupt(() => Scope.close(replacementScope, Exit.void).pipe(Effect.ignore)),
      ),
    );
    if (Exit.isFailure(replacementExit)) {
      yield* runtimeCallbackPermit.withPermit(
        quarantineNativeTransportAtGeneration(replacementGeneration),
      );
      yield* Scope.close(replacementScope, Exit.void).pipe(Effect.ignore);
      return yield* Effect.failCause(replacementExit.cause);
    }

    yield* runtimeCallbackPermit
      .withPermit(
        Effect.uninterruptible(
          Effect.gen(function* () {
            yield* awaitAdmittedNativeResponses;
            yield* wireAcpRuntimeHandlers(
              replacementExit.value.replacementRuntime,
              replacementGeneration,
              {
                sessionUpdates: false,
                terminals: false,
                mcp: false,
                scope: replacementScope,
              },
            );
            const lifecycle = yield* Ref.modify(
              candidateLifecycle,
              (current): readonly [CandidateLifecycle, CandidateLifecycle] =>
                current._tag === "Terminated"
                  ? [current, current]
                  : [{ _tag: "Committed" }, { _tag: "Committed" }],
            );
            if (lifecycle._tag === "Terminated") {
              return yield* lifecycle.error;
            }
            yield* quarantineNativeTransportAtGeneration(previousGeneration);
            ctx.runtime = replacementExit.value.replacementRuntime;
            ctx.runtimeScope = replacementScope;
            ctx.runtimeMcpBridge = replacementMcpBridge;
            ctx.openAgentRequests = replacementAgentRequests;
            yield* Ref.set(runtimeCallbackGeneration, replacementGeneration);
            prepareTerminalEnvironment(
              yield* readMcpContext(threadId),
              replacementExit.value.started.sessionId,
            );
            yield* wireAcpRuntimeTerminalHandlers(replacementExit.value.replacementRuntime);
            yield* commitSessionState(replacementExit.value.started);
            while (true) {
              const buffered = stagedSessionUpdates.splice(0, stagedSessionUpdates.length);
              if (buffered.length === 0) {
                handleCandidateSessionUpdate = (notification) =>
                  projectAcpRuntimeSessionUpdate(replacementGeneration, notification);
                break;
              }
              yield* Effect.forEach(
                buffered,
                (notification) =>
                  projectAcpRuntimeSessionUpdateEffect(notification).pipe(
                    Effect.catchCause((cause) =>
                      Effect.logError("failed to replay staged ACP session update", {
                        driver,
                        cause,
                      }),
                    ),
                  ),
                { discard: true },
              );
            }
            yield* cancelPendingRuntimeRequests();
            if (previousScope !== undefined) {
              yield* Scope.close(previousScope, Exit.void).pipe(
                Effect.catchCause((cause) =>
                  Effect.logError("failed to close replaced ACP ctx.runtime scope", {
                    driver,
                    cause,
                  }),
                ),
              );
            }
          }),
        ),
      )
      .pipe(
        Effect.onExit((exit) =>
          Exit.isFailure(exit)
            ? Ref.get(candidateLifecycle).pipe(
                Effect.flatMap((lifecycle) =>
                  lifecycle._tag === "Committed"
                    ? Effect.void
                    : Scope.close(replacementScope, Exit.void).pipe(Effect.ignore),
                ),
              )
            : Effect.void,
        ),
      );
    return replacementExit.value.started;
  });
