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

import { addAcpUsage, nativeThreadId } from "./adapter.helpers.ts";
import type { AcpAdapterV2Flavor, AcpAppContextEntry, ActiveAcpTurn } from "./adapter.helpers.ts";

export const bindFollowPrompt =
  (ctx: any): any =>
  (
    context: ActiveAcpTurn,
    prompt: (
      superseded: () => boolean,
    ) => Effect.Effect<EffectAcpSchema.PromptResponse, EffectAcpErrors.AcpError>,
    settle: {
      readonly generation: number;
      readonly checkPromptOutcome:
        | Effect.Success<ReturnType<NonNullable<AcpAdapterV2Flavor["watchPromptOutcome"]>>>
        | undefined;
      readonly promptParts: Effect.Success<ReturnType<typeof resolvePromptParts>> | null;
      readonly appContext?:
        | {
            readonly entries: ReadonlyArray<AcpAppContextEntry>;
            readonly offered: ReadonlyMap<string, string> | undefined;
            readonly before: ReadonlyMap<string, string> | undefined;
            readonly compactionMarker: symbol | undefined;
            readonly sequence: number;
          }
        | undefined;
      readonly compactSession: AcpAdapterV2Flavor["compactSession"];
    },
  ): Effect.Effect<void> => {
    const {
      closeTextStreams,
      commitAcpAppContext,
      compactionMarkers,
      defersFinalizeForBackgroundWork,
      driver,
      finalizeTurn,
      finishRegisteredBackgroundTool,
      flavor,
      followPrompt,
      followsAgentWorkState,
      hasDeferredBackgroundWork,
      hasSurvivingBackgroundWork,
      idleReportedSubagents,
      input,
      markSessionCompacted,
      options,
      promptInstructionStates,
      promptRuntimeInstructions,
      reportProviderRetry,
      resolvePromptParts,
      runRuntimeCallbackAtGeneration,
      runtime,
      runtimeRestartRequired,
      scheduleDeferredFinalize,
      schedulePostSettleHoldExpiry,
      sessionScope,
      started,
      steerWithPrompt,
      steersWithPrompt,
      stopReasonFailure,
      terminalizeOpenForegroundTools,
    } = pickBindCtx(ctx);

    const sequence = ++context.promptSequence;
    const superseded = () => context.promptSequence !== sequence;
    const rollbackOfferedAppContext = () => {
      if (
        settle.appContext?.offered !== undefined &&
        context.appContextOffered === settle.appContext.offered
      ) {
        context.appContextOffered = settle.appContext.before;
      }
    };
    return prompt(superseded).pipe(
      // Settle the wire before the completion callback's permit so a settled-soft
      // Stop sees the native return. Capture usage only before finalize: a late
      // response must not flip a settled turn.
      Effect.tap((result) =>
        Effect.suspend(() => {
          if (flavor.reportsPerTurnPromptUsage === true && !context.finalized) {
            context.promptUsage = addAcpUsage(context.promptUsage, result.usage);
          }
          return superseded()
            ? Effect.void
            : Deferred.succeed(context.promptWireSettled, undefined).pipe(Effect.asVoid);
        }),
      ),
      Effect.tap(() => options.testHooks?.afterPromptWireSettled?.() ?? Effect.void),
      Effect.flatMap((result) =>
        runRuntimeCallbackAtGeneration(
          settle.generation,
          Effect.gen(function* () {
            // Record delivery only for this runtime: a replacement can reuse the session id.
            // Grok cancels locally, refusals discard the prompt, and errors need a retry.
            // Native compaction sends no prompt, and the compacted session needs the notes.
            if (settle.compactSession !== undefined) {
              yield* markSessionCompacted(context.nativeThreadId);
            } else if (
              result.stopReason !== "cancelled" &&
              result.stopReason !== "refusal" &&
              result.stopReason !== "error"
            ) {
              const promptParts = settle.promptParts;
              yield* Ref.update(promptInstructionStates, (current) => {
                if (promptParts?.instructionState === undefined) return current;
                const updated = new Map(current);
                updated.set(context.nativeThreadId, promptParts.instructionState);
                return updated;
              });
              yield* Ref.update(promptRuntimeInstructions, (current) => {
                if (promptParts?.runtimeInstructions === undefined) return current;
                const updated = new Map(current);
                updated.set(context.nativeThreadId, promptParts.runtimeInstructions);
                return updated;
              });
              if (
                !context.interrupted &&
                !(context.finalized && context.finalizedStatus !== "completed")
              ) {
                if (settle.appContext !== undefined) {
                  yield* commitAcpAppContext({
                    context,
                    entries: settle.appContext.entries,
                    compactionMarker: settle.appContext.compactionMarker,
                    sequence: settle.appContext.sequence,
                  });
                }
              } else {
                rollbackOfferedAppContext();
              }
              yield* Ref.update(compactionMarkers, (current) => {
                if (promptParts?.instructionState === undefined) return current;
                const observedMarker = promptParts.compactionMarker;
                if (
                  observedMarker === undefined ||
                  current.get(context.nativeThreadId) !== observedMarker
                )
                  return current;
                const updated = new Map(current);
                updated.delete(context.nativeThreadId);
                return updated;
              });
            } else {
              rollbackOfferedAppContext();
            }
            if (context.finalized || followsAgentWorkState || superseded()) return;
            // ACP v2 reports a failed prompt through its idle stop reason, not an RPC error.
            const hiddenFailure =
              settle.checkPromptOutcome === undefined ||
              context.interrupted ||
              result.stopReason === "error" ||
              result.stopReason === "cancelled"
                ? undefined
                : yield* settle.checkPromptOutcome(result);
            const resumeWith = hiddenFailure?.resumeWith;
            if (
              hiddenFailure !== undefined &&
              resumeWith !== undefined &&
              steersWithPrompt &&
              !context.outcomeResumed
            ) {
              context.outcomeResumed = true;
              yield* reportProviderRetry({
                sessionId: context.nativeThreadId,
                failure: hiddenFailure.failure,
              });
              yield* steerWithPrompt({
                threadId: context.input.threadId,
                runId: context.input.runId,
                providerThread: context.input.providerThread,
                providerTurnId: context.providerTurnId,
                message: { ...context.input.message, text: resumeWith, attachments: [] },
              }).pipe(
                Effect.catchCause(() =>
                  runRuntimeCallbackAtGeneration(
                    settle.generation,
                    Effect.gen(function* () {
                      if (context.finalized || context.interrupted) return;
                      yield* Ref.set(runtimeRestartRequired, true);
                      yield* terminalizeOpenForegroundTools(context, "failed");
                      yield* finalizeTurn(context, "failed", hiddenFailure.failure, {
                        childTurnsContinue: hasSurvivingBackgroundWork(context),
                        threadDisposition: hiddenFailure.threadDisposition,
                      });
                    }),
                  ),
                ),
                Effect.forkIn(sessionScope),
              );
              return;
            }
            if (hiddenFailure !== undefined) {
              yield* Ref.set(runtimeRestartRequired, true);
            }
            const failure =
              hiddenFailure?.failure ??
              (context.interrupted
                ? undefined
                : stopReasonFailure(result.stopReason, result.error));
            const status =
              failure !== undefined
                ? "failed"
                : result.stopReason === "cancelled"
                  ? context.interrupted
                    ? "interrupted"
                    : "cancelled"
                  : "completed";
            if (defersFinalizeForBackgroundWork && !context.interrupted) {
              context.promptSettled = true;
              context.promptSettledStatus = status;
              for (const [taskId, completion] of context.backgroundCommands) {
                if (completion === null) continue;
                yield* finishRegisteredBackgroundTool({ taskId, ...completion });
              }
            }
            if (failure !== undefined) {
              yield* terminalizeOpenForegroundTools(context, "failed");
              // Unlike an RPC failure, the agent survives an idle error, so its
              // background tools and subagents keep reporting to this run.
              yield* finalizeTurn(context, "failed", failure, {
                childTurnsContinue: hasSurvivingBackgroundWork(context),
                ...(hiddenFailure === undefined
                  ? {}
                  : { threadDisposition: hiddenFailure.threadDisposition }),
              });
              return;
            }
            yield* idleReportedSubagents(context);
            if (context.finalized) return;
            const deferredBackgroundWork =
              defersFinalizeForBackgroundWork &&
              !context.interrupted &&
              hasDeferredBackgroundWork(context);
            const pendingReply =
              !deferredBackgroundWork &&
              defersFinalizeForBackgroundWork &&
              status === "completed" &&
              !context.interrupted &&
              flavor.hasPendingReply !== undefined
                ? yield* flavor.hasPendingReply(context.nativeThreadId)
                : false;
            if (context.finalized) return;
            if (deferredBackgroundWork || pendingReply) {
              yield* closeTextStreams(context);
              yield* schedulePostSettleHoldExpiry(context);
              if (pendingReply) {
                context.replyOpen = true;
                yield* scheduleDeferredFinalize(context);
              }
              yield* options.testHooks?.afterPromptSettledWithBackgroundWork?.() ?? Effect.void;
              return;
            }
            yield* finalizeTurn(context, status);
          }),
        ).pipe(
          Effect.andThen(() => options.testHooks?.afterPromptCallback?.() ?? Effect.void),
          Effect.asVoid,
        ),
      ),
      Effect.catchCause((cause) =>
        runRuntimeCallbackAtGeneration(
          settle.generation,
          Effect.gen(function* () {
            rollbackOfferedAppContext();
            if (context.finalized || superseded()) return;
            const error = Cause.findError(cause);
            // Native close rejects prompts cancelled before insertion with -32800.
            const interrupted =
              context.interrupted ||
              (ctx.pendingStopCloseTurn === context &&
                Result.isSuccess(error) &&
                error.success._tag === "AcpRequestError" &&
                error.success.code === -32800);
            const failure = Cause.squash(cause);
            // A resumed prompt stands in for an outcome failure, which always restarts.
            if (
              !interrupted &&
              (context.outcomeResumed || flavor.restartRuntimeAfterPromptError?.(failure) === true)
            ) {
              yield* Ref.set(runtimeRestartRequired, true);
            }
            // An agent that answered with an error may still finish tools it started,
            // never pending ones; any other failure means its process or pipe is gone.
            const agentAnswered =
              Result.isSuccess(error) && error.success._tag === "AcpRequestError";
            if (!interrupted) {
              yield* terminalizeOpenForegroundTools(context, "failed", {
                unstartedOnly: agentAnswered,
              });
            }
            yield* finalizeTurn(
              context,
              interrupted ? "interrupted" : "failed",
              flavor.promptFailure?.(failure) ??
                makeProviderFailure({
                  cause: failure,
                  class: "provider_error",
                }),
            ).pipe(
              Effect.andThen(
                Effect.logWarning("orchestration-v2.acp-prompt-failed", {
                  driver,
                  providerSessionId: input.providerSessionId,
                  providerThreadId: context.input.providerThread.id,
                  providerTurnId: context.providerTurnId,
                  cause,
                }),
              ),
            );
          }),
        ).pipe(Effect.asVoid),
      ),
    );
  };
