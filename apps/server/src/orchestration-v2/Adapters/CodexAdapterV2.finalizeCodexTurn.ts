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

import type {
  ActiveCodexProviderRetry,
  ActiveCodexTurnContext,
  CodexErrorInfo,
} from "./CodexAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindFinalizeCodexTurn = (ctx: any) => {
  return ((...args: any[]) => {
    const {
      CODEX_PROVIDER,
      activeTurns,
      agentMessageDeltas,
      buildWebSearchArtifacts,
      capacityContinuations,
      clearImageWork,
      codexNativeSubagentDetail,
      codexNativeSubagentLabel,
      codexRetryTurnItem,
      completedAt,
      completedFinalAnswerTextsByTurn,
      context,
      continuationRequests,
      continuedRuns,
      emitCompactionItem,
      emitImageWorkState,
      emitOrDeferRootTerminal,
      emitProviderEvent,
      emitSubagentTaskUpdate,
      finalAnswerItemIdsByTurn,
      flushReadyRootTerminals,
      goalActivations,
      goalsByNativeThread,
      imageTurns,
      input,
      interruptingNativeTurns,
      model,
      nativeId,
      node,
      nodeId,
      ordinal,
      parentNodeId,
      planDeltas,
      projectGeneratedImages,
      providerRetries,
      providerThread,
      providerTurn,
      providerTurnId,
      providerTurnStatusToTerminal,
      reasoningDeltas,
      reasoningParts,
      releaseSettledTurnIfIdle,
      reportedTurnModel,
      runningCommandItemsByTurn,
      runningDynamicToolsByTurn,
      samplePromptSuggestion,
      scope,
      settleExitedCommandItems,
      settledTurns,
      startedAt,
      state,
      status,
      subagent,
      terminalizeMcpAppCaptures,
      terminalizeRunningCommandItems,
      terminalizeRunningDynamicTools,
      terminalizedNonCompletedNativeTurns,
      turnHasRetainedBackgroundWork,
      turnItem,
      turnTerminalizationPermit,
      turnWaiters,
      updatedAt,
      usageStateForThread,
    } = pickScriptcBindCtx(ctx);
    const __fn = (input: {
      readonly context: ActiveCodexTurnContext;
      readonly nativeTurnId: string;
      readonly status: OrchestrationV2ProviderTurn["status"];
      readonly completedAt: DateTime.Utc;
      readonly promptDropped?: true;
      readonly failureMessage?: string;
      readonly failureErrorInfo?: CodexErrorInfo;
      readonly continueRun?: boolean;
      readonly stalledRetry?: {
        readonly state: ActiveCodexProviderRetry;
        readonly failure: NonNullable<ActiveCodexTurnContext["latestProviderFailure"]>;
      };
    }) =>
      // Capacity continuation already holds the permit across finalization and restart.
      (input.continueRun ? Function.identity : turnTerminalizationPermit.withPermits(1))(
        Effect.gen(function* () {
          const current = (yield* Ref.get(activeTurns)).get(input.nativeTurnId);
          if (current !== input.context) {
            return false;
          }
          if (input.stalledRetry !== undefined) {
            // Checked under the permit so item/started cannot clear the retry mid-finalize.
            const retries = yield* Ref.get(providerRetries);
            if (
              retries.get(input.context.providerTurnId) !== input.stalledRetry.state ||
              (yield* Ref.get(interruptingNativeTurns)).has(input.nativeTurnId)
            )
              return false;
            input.context.latestProviderFailure ??= input.stalledRetry.failure;
          }
          input.context.fileChangeKindsByItem.clear();
          const providerRetry = yield* Ref.modify(providerRetries, (current) => {
            const retry = current.get(input.context.providerTurnId);
            if (retry === undefined) {
              return [undefined, current] as const;
            }
            const updated = new Map(current);
            updated.delete(input.context.providerTurnId);
            return [retry, updated] as const;
          });
          if (
            providerRetry !== undefined &&
            !input.continueRun &&
            (providerRetry.context !== undefined ||
              input.status !== "failed" ||
              input.context.subagent !== null)
          ) {
            yield* emitProviderEvent({
              type: "turn_item.updated",
              driver: CODEX_PROVIDER,
              turnItem: codexRetryTurnItem(
                input.context,
                providerRetry,
                input.status === "failed" &&
                  providerRetry.context !== input.context &&
                  providerRetry.context !== undefined
                  ? "interrupted"
                  : providerTurnStatusToTerminal(input.status),
                input.completedAt,
              ),
            });
          }
          if (input.status !== "completed" && !input.continueRun) {
            yield* Ref.update(terminalizedNonCompletedNativeTurns, (current) => {
              const updated = new Set(current);
              for (const turn of continuedRuns.get(input.context.providerTurnId) ?? [input.context])
                updated.add(turn.nativeTurnId);
              return updated;
            });
          }
          yield* agentMessageDeltas.flushTurn(input.nativeTurnId);
          yield* reasoningDeltas.flushTurn(input.nativeTurnId);
          yield* planDeltas.flushTurn(input.nativeTurnId);
          for (const [key, part] of reasoningParts) {
            if (part.turnId === input.nativeTurnId) reasoningParts.delete(key);
          }
          // Failed compaction can end the turn without item/completed.
          for (const nativeItemId of input.context.runningCompactionItemIds) {
            yield* emitCompactionItem(
              input.context,
              nativeItemId,
              providerTurnStatusToTerminal(input.status),
              input.completedAt,
            );
          }
          yield* projectGeneratedImages(input.context, input.nativeTurnId);
          if (input.status !== "completed") {
            yield* clearImageWork(input.context);
          } else {
            const images = imageTurns.get(input.nativeTurnId);
            if (images !== undefined) {
              yield* emitImageWorkState(input.context, images.running.size > 0);
            }
          }
          const nativeThreadId = input.context.providerThread.nativeThreadRef?.nativeId;
          const activation =
            nativeThreadId == null ? undefined : goalActivations.get(nativeThreadId);
          const holdsForGoal =
            input.context.subagent === null &&
            input.status === "completed" &&
            nativeThreadId != null &&
            (goalsByNativeThread.get(nativeThreadId)?.status === "active" ||
              (activation !== undefined && !activation.stopped));
          const executedModel = reportedTurnModel(nativeThreadId ?? "", input.nativeTurnId);
          const completedTurn: OrchestrationV2ProviderTurn = {
            id: input.context.providerTurnId,
            providerThreadId: input.context.providerThread.id,
            nodeId: input.context.providerNodeId,
            runAttemptId: input.context.subagent === null ? input.context.input.attemptId : null,
            nativeTurnRef: {
              driver: CODEX_PROVIDER,
              nativeId: input.nativeTurnId,
              strength: "strong",
            },
            ordinal: input.context.providerTurnOrdinal,
            status: input.status,
            startedAt: input.context.startedAt,
            completedAt: input.completedAt,
            ...(input.promptDropped === true ? { promptDropped: true } : {}),
            turnTokenUsage: completeCodexTurnTokenUsage(
              usageStateForThread(
                input.context.providerThread.nativeThreadRef?.nativeId ??
                  String(input.context.providerThread.id),
              ),
              input.nativeTurnId,
              input.status === "completed",
              executedModel,
            ),
            ...(executedModel === undefined ? {} : { model: executedModel }),
          };
          if (!holdsForGoal) {
            yield* emitProviderEvent({
              type: "provider_turn.updated",
              driver: CODEX_PROVIDER,
              threadId: input.context.projectionThreadId,
              providerTurn: completedTurn,
            });
          }
          if (input.context.subagent !== null) {
            yield* emitProviderEvent({
              type: "node.updated",
              driver: CODEX_PROVIDER,
              node: {
                id: input.context.providerNodeId,
                threadId: input.context.projectionThreadId,
                runId: null,
                parentNodeId: null,
                rootNodeId: input.context.rootNodeId,
                kind: "root_turn",
                status: input.status,
                countsForRun: false,
                providerThreadId: input.context.providerThread.id,
                providerTurnId: input.context.providerTurnId,
                nativeItemRef: input.context.subagent.task.nativeTaskRef,
                runtimeRequestId: null,
                checkpointScopeId: null,
                startedAt: input.context.providerNodeStartedAt,
                completedAt: input.completedAt,
              },
            });
            yield* emitProviderEvent({
              type: "provider_thread.updated",
              driver: CODEX_PROVIDER,
              providerThread: {
                ...input.context.providerThread,
                status: "idle",
                updatedAt: input.completedAt,
              },
            });
            yield* emitProviderEvent({
              type: "node.updated",
              driver: CODEX_PROVIDER,
              node: {
                id: input.context.subagent.subagentNodeId,
                threadId: input.context.subagent.parentContext.projectionThreadId,
                runId: input.context.subagent.parentContext.projectionRunId,
                parentNodeId: input.context.subagent.parentContext.itemParentNodeId,
                rootNodeId: input.context.subagent.parentContext.rootNodeId,
                kind: "subagent",
                status: input.status,
                countsForRun: false,
                providerThreadId: input.context.providerThread.id,
                providerTurnId: input.context.subagent.parentContext.providerTurnId,
                nativeItemRef: input.context.subagent.task.nativeTaskRef,
                runtimeRequestId: null,
                checkpointScopeId: null,
                startedAt: input.context.subagent.startedAt,
                completedAt: input.completedAt,
              },
            });
            yield* emitSubagentTaskUpdate({
              subagent: input.context.subagent,
              status: input.status,
              completedAt: input.completedAt,
            });
            // Codex does not wake a completed parent turn, leaving child results unread.
            // Only direct children wake an idle root turn; grandchildren report to their
            // own parent, and running root turns receive results natively.
            const parent = input.context.subagent.parentContext;
            const parentNativeThreadId = parent.providerThread.nativeThreadRef?.nativeId;
            if (
              continuationRequests !== undefined &&
              parent.subagent === null &&
              (input.status === "completed" || input.status === "failed") &&
              !(yield* Ref.get(terminalizedNonCompletedNativeTurns)).has(parent.nativeTurnId) &&
              (parentNativeThreadId == null || !capacityContinuations.has(parentNativeThreadId)) &&
              ![...(yield* Ref.get(activeTurns)).values()].some(
                (active) =>
                  active.subagent === null && active.providerThread.id === parent.providerThread.id,
              )
            ) {
              const task = input.context.subagent.task;
              yield* continuationRequests.offer({
                threadId: parent.projectionThreadId,
                providerThreadId: parent.providerThread.id,
                driver: CODEX_PROVIDER,
                detail: codexNativeSubagentDetail(task),
                // The detail is the whole wake; Codex buffers no output for it.
                delivery: "message_text",
                notification: backgroundWorkNotification([
                  {
                    kind: "subagent",
                    label: codexNativeSubagentLabel(task),
                    outcome: input.status,
                    childThreadId: input.context.subagent.childThreadId,
                  },
                ]),
              });
            }
          }
          if (input.status === "interrupted" || input.status === "failed") {
            yield* terminalizeRunningCommandItems(
              input.context,
              input.nativeTurnId,
              input.status,
              input.completedAt,
            );
            yield* terminalizeMcpAppCaptures(input.context, input.nativeTurnId);
          }
          const unfinishedToolStatus: "cancelled" | "interrupted" | "failed" =
            input.status === "interrupted" || input.status === "failed"
              ? input.status
              : "cancelled";
          // A completed turn does not establish whether an unfinished search succeeded.
          for (const item of input.context.runningWebSearchItems.values()) {
            const artifacts = yield* buildWebSearchArtifacts({
              context: input.context,
              item,
              status: unfinishedToolStatus,
              updatedAt: input.completedAt,
            });
            yield* emitProviderEvent({
              type: "node.updated",
              driver: CODEX_PROVIDER,
              node: artifacts.node,
            });
            yield* emitProviderEvent({
              type: "turn_item.updated",
              driver: CODEX_PROVIDER,
              turnItem: artifacts.turnItem,
            });
          }
          input.context.runningWebSearchItems.clear();
          yield* terminalizeRunningDynamicTools(
            input.context,
            input.nativeTurnId,
            unfinishedToolStatus,
            input.completedAt,
            input.status === "interrupted" || input.status === "failed",
          );
          if (input.context.subagent === null && !input.continueRun) {
            yield* emitOrDeferRootTerminal({
              ...input,
              ...(providerRetry === undefined ? {} : { providerRetry }),
              ...(holdsForGoal ? { goalHoldTurn: completedTurn } : {}),
            });
          }
          const waiter = (yield* Ref.get(turnWaiters)).get(input.nativeTurnId);
          if (waiter !== undefined) {
            yield* Deferred.succeed(waiter, undefined);
          }
          const interruptInProgress = (yield* Ref.get(interruptingNativeTurns)).has(
            input.nativeTurnId,
          );
          const retainSettledContext =
            input.status === "completed" &&
            (yield* turnHasRetainedBackgroundWork(input.nativeTurnId));
          // A held goal predicts when settleGoalHold completes it.
          if (
            input.status === "completed" &&
            input.context.subagent === null &&
            !input.continueRun &&
            !holdsForGoal &&
            nativeThreadId != null
          ) {
            yield* samplePromptSuggestion(input.context, nativeThreadId, input.nativeTurnId).pipe(
              Effect.forkIn(scope),
            );
          }
          if (retainSettledContext) {
            yield* Ref.update(settledTurns, (current) => {
              const updated = new Map(current);
              updated.set(input.nativeTurnId, input.context);
              return updated;
            });
            // Recheck after recording settlement; background work may have finished before a settled turn existed to release.
            yield* releaseSettledTurnIfIdle(input.nativeTurnId);
            const commands = (yield* Ref.get(runningCommandItemsByTurn)).get(input.nativeTurnId);
            if (nativeThreadId != null && commands !== undefined && commands.size > 0) {
              // Fork requests off the notification reader so it can read their responses.
              yield* settleExitedCommandItems(nativeThreadId, input.nativeTurnId).pipe(
                Effect.forkIn(scope, { startImmediately: true }),
              );
            }
          }
          yield* Ref.update(activeTurns, (current) => {
            const updated = new Map(current);
            updated.delete(input.nativeTurnId);
            return updated;
          });
          if (input.context.nativeStartReady !== undefined) {
            yield* Deferred.succeed(input.context.nativeStartReady, undefined);
          }
          if (!input.continueRun && input.context.capacityRetryPending !== undefined) {
            yield* Deferred.succeed(input.context.capacityRetryPending, undefined);
          }
          yield* flushReadyRootTerminals();
          if (!retainSettledContext && !interruptInProgress) {
            yield* Ref.update(runningCommandItemsByTurn, (current) => {
              if (!current.has(input.nativeTurnId)) {
                return current;
              }
              const updated = new Map(current);
              updated.delete(input.nativeTurnId);
              return updated;
            });
            yield* Ref.update(runningDynamicToolsByTurn, (current) => {
              if (!current.has(input.nativeTurnId)) {
                return current;
              }
              const updated = new Map(current);
              updated.delete(input.nativeTurnId);
              return updated;
            });
          }
          if (!retainSettledContext) {
            yield* Ref.update(completedFinalAnswerTextsByTurn, (current) => {
              if (!current.has(input.nativeTurnId)) {
                return current;
              }
              const updated = new Map(current);
              updated.delete(input.nativeTurnId);
              return updated;
            });
            imageTurns.delete(input.nativeTurnId);
            yield* Ref.update(finalAnswerItemIdsByTurn, (current) => {
              if (!current.has(input.nativeTurnId)) {
                return current;
              }
              const updated = new Map(current);
              updated.delete(input.nativeTurnId);
              return updated;
            });
          }
          return true;
        }),
      );
    return typeof __fn === "function" ? __fn(...args) : __fn;
  }) as any;
};
