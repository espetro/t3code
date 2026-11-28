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
  formatAcpAppContextEntry,
  mergeAcpAppContext,
  nativeThreadId,
  sendPromptWhenIdle,
  unsentAcpAppContext,
} from "./adapter.helpers.ts";

export const bindSteerWithPrompt = (ctx: any): any =>
  Effect.fn("AcpAdapterV2.steerWithPrompt")(function* (
    turnInput: ProviderAdapter.ProviderAdapterV2SteerInput,
  ) {
    const {
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
      runtime,
      runtimeCallbackGeneration,
      runtimeTransitionPermit,
      sessionScope,
      steerWithPrompt,
      watchPromptInactivity,
    } = pickBindCtx(ctx);

    const isNativeSlashCommand = turnInput.message.text.trimStart().startsWith("/");
    const text = yield* providerMessageTextWithAttachmentPaths({
      text: turnInput.message.text,
      attachments: turnInput.message.attachments,
      resolveAttachmentPath: host.resolveAttachmentPath,
      resolveExtractedTextPath: host.resolveExtractedTextPath,
    });
    const attachmentBlocks = yield* promptAttachmentBlocks(text, turnInput.message.attachments);
    const [dispatched, context] = yield* runtimeTransitionPermit.withPermit(
      Effect.gen(function* () {
        const {
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
          runtime,
          runtimeCallbackGeneration,
          runtimeTransitionPermit,
          sessionScope,
          steerWithPrompt,
          watchPromptInactivity,
        } = pickBindCtx(ctx);

        const context = yield* Ref.get(activeTurn);
        if (
          context === null ||
          context.finalized ||
          context.interrupted ||
          context.providerTurnId !== turnInput.providerTurnId
        ) {
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver,
            detail: `Provider turn ${turnInput.providerTurnId} is not active and cannot be steered.`,
          });
        }
        const generation = yield* Ref.get(runtimeCallbackGeneration);
        const checkPromptOutcome =
          flavor.watchPromptOutcome === undefined
            ? undefined
            : yield* flavor.watchPromptOutcome(context.nativeThreadId);
        const dispatched = yield* Deferred.make<void, never>();
        const steered = yield* runRuntimeCallbackAtGeneration(
          generation,
          Effect.gen(function* () {
            if (context.finalized || context.interrupted) return false;
            const compactionMarker = (yield* Ref.get(compactionMarkers)).get(
              context.nativeThreadId,
            );
            const seenAppContext =
              context.appContextOffered ??
              (yield* Ref.get(deliveredAppContext)).get(context.nativeThreadId);
            const appContextEntries = unsentAcpAppContext(
              turnInput.appContext,
              seenAppContext,
              isNativeSlashCommand,
            );
            const appContextBefore = context.appContextOffered;
            const appContextOffered =
              appContextEntries.length === 0
                ? undefined
                : mergeAcpAppContext(seenAppContext, appContextEntries);
            const steerAppContext =
              appContextOffered === undefined
                ? undefined
                : {
                    entries: appContextEntries,
                    offered: appContextOffered,
                    before: appContextBefore,
                    compactionMarker,
                    sequence: ++context.appContextSequence,
                  };
            if (appContextOffered !== undefined) {
              context.appContextOffered = appContextOffered;
            }
            const steerPrompt: Array<EffectAcpSchema.ContentBlock> = [
              ...appContextEntries.map((entry) => ({
                type: "text" as const,
                text: formatAcpAppContextEntry(entry),
              })),
              { type: "text", text },
              ...attachmentBlocks,
            ];
            // The steer prompt carries the turn on, also past a prompt that already settled.
            const released = context.foregroundIdle;
            context.foregroundIdle = yield* Deferred.make<void>();
            if (yield* Deferred.isDone(context.promptWireSettled)) {
              context.promptWireSettled = yield* Deferred.make<void, never>();
            }
            context.promptSettled = false;
            context.promptSettledStatus = null;
            context.backgroundFinalizeGeneration += 1;
            context.promptSentAt = yield* Clock.currentTimeMillis;
            context.lastProgressAt = context.promptSentAt;
            const watchdog = context.inactivityWatchdog;
            context.inactivityWatchdog = undefined;
            if (watchdog !== undefined) {
              yield* Fiber.interrupt(watchdog).pipe(Effect.forkDetach, Effect.asVoid);
            }
            if (promptInactivityTimeoutMillis !== undefined) {
              context.inactivityWatchdog = yield* watchPromptInactivity(
                context,
                generation,
                promptInactivityTimeoutMillis,
                checkPromptOutcome,
              ).pipe(Effect.forkIn(sessionScope));
            }
            const releasedForSteer = context.foregroundIdle;
            yield* followPrompt(
              context,
              (superseded) =>
                sendPromptWhenIdle(
                  context,
                  () =>
                    runtime.prompt(
                      { prompt: steerPrompt },
                      { dispatched, released: releasedForSteer },
                    ),
                  superseded,
                ),
              {
                generation,
                checkPromptOutcome,
                promptParts: null,
                appContext: steerAppContext,
                compactSession: undefined,
              },
            ).pipe(Effect.forkIn(sessionScope));
            yield* Deferred.succeed(released, undefined);
            return true;
          }),
        );
        if (!Option.contains(steered, true)) {
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver,
            detail: `Provider turn ${turnInput.providerTurnId} ended before it could be steered.`,
          });
        }
        return [dispatched, context] as const;
      }),
    );
    yield* Deferred.await(dispatched);
    // A wake run sent no prompt, so its inactivity watchdog waits for this one.
    yield* Deferred.succeed(context.promptDispatched, undefined);
  });
