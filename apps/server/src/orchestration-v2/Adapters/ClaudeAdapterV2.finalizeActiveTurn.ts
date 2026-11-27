// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ClaudeAdapterV2.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import { pickScriptcBindCtx } from "../scriptcBindScope.ts";
import * as DocumentText from "../../provider/DocumentText.ts";
import {
  compactDynamicToolOutput,
  mcpToolResultOutput,
  toolOutputImages,
} from "@t3tools/shared/toolOutput";
import { makeProviderTextDeltaCoalescer } from "./ProviderTextDeltaCoalescer.ts";
import { claudeTaskOutputRoot, tailClaudeTaskOutput } from "./ClaudeTaskOutputTail.ts";
import {
  dynamicToolTitle,
  formatReadToolLabel,
  formatSearchToolLabel,
} from "@t3tools/shared/toolActivity";
import { field, text } from "../unknownField.ts";
import { mergeWorkflowAgentMetadata, type WorkflowAgentMetadata } from "../workflowAgentAnswers.ts";
import {
  initialWorkflowAgentTranscriptCursor,
  readWorkflowAgentTranscript,
  type WorkflowAgentTranscriptCursor,
} from "../workflowAgentTranscript.ts";
import {
  CLAUDE_WORKFLOW_TASK_TYPE,
  hasClaudeWorkflowSnapshot,
  mergeClaudeWorkflowProgress,
  parseClaudeWorkflowRunHandles,
} from "./claudeWorkflowProgress.ts";

import { isWorkspaceImagePreviewPath } from "@t3tools/shared/filePreview";
import { pastedUrl } from "@t3tools/shared/oauthCallback";
import {
  addClaudeLedgerUsage,
  claudeLedgerDelta,
  claudeModelLedger,
  claudeReportedContextWindows,
  normalizeClaudeTurnTokenUsage,
  type ClaudeLedgerUsage,
  type ClaudeModelLedger,
} from "../../provider/ClaudeTurnTokenUsage.ts";
import { toMcpElicitationResponse } from "../../provider/CodexMcpElicitation.ts";
import {
  type CanUseTool,
  type ElicitationRequest,
  type ElicitationResult,
  forkSession as forkClaudeSession,
  type EffortLevel,
  type ForkSessionOptions,
  type ForkSessionResult,
  getSessionMessages,
  getSubagentMessages,
  type HookCallback,
  type McpServerStatus as ClaudeMcpServerStatus,
  query,
  resolveSettings as resolveClaudeSettings,
  type Options as ClaudeQueryOptions,
  type PermissionMode,
  type PermissionResult,
  type PermissionUpdate,
  type Query as ClaudeQuery,
  type Settings as ClaudeSdkSettings,
  type SpawnOptions as ClaudeSpawnOptions,
  type SpawnedProcess as ClaudeSpawnedProcess,
  type SDKAssistantMessage,
  type SDKAPIRetryMessage,
  type SDKMessage,
  type SDKRateLimitInfo,
  type SDKResultMessage,
  type SDKUserMessage,
} from "@anthropic-ai/claude-agent-sdk";
import type {
  AskUserQuestionInput,
  WebSearchOutput,
} from "@anthropic-ai/claude-agent-sdk/sdk-tools";
// @effect-diagnostics-next-line nodeBuiltinImport:off -- the SDK takes a Node ChildProcess for the CLI.
import * as NodeChildProcess from "node:child_process";
import * as NodeUtil from "node:util";
import { parseCliArgs } from "@t3tools/shared/cliArgs";
import { fromLenientJson } from "@t3tools/shared/schemaJson";
import {
  claudeMcpToolName,
  claudeMcpToolNamePart,
  claudeMcpToolPrefix,
  MCP_APP_OUTPUT_KEY,
  mcpAppToolResourceUri,
} from "@t3tools/shared/mcpApp";
import { AgentScope } from "@t3tools/shared/AgentScope";
import * as ProviderProcesses from "../../process/providerProcesses.ts";
import * as SpawnWorker from "../../process/SpawnWorker.ts";
import * as HostProcess from "@t3tools/shared/HostProcess";
import { applyClaudePromptEffortPrefix } from "@t3tools/shared/model";
import { compareSemverVersions } from "@t3tools/shared/semver";
import {
  CLAUDE_RESUME_COMPACTION_COMPACT_ANSWER,
  CLAUDE_RESUME_COMPACTION_NEVER_ANSWER,
  formatClaudeResumeCompactionQuestion,
} from "@t3tools/shared/claudeCompaction";
import {
  type AgentFeedbackMode,
  type ChatAttachment,
  PROVIDER_SEND_TURN_MAX_FILE_BYTES,
  ClaudeSettings,
  TrimmedNonEmptyString,
  defaultInstanceIdForDriver,
  isCompactionCommandMessage,
  parseGoalCommand,
  type MessageId,
  type ModelSelection,
  type OrchestrationV2ConversationMessage,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  OrchestrationV2ProviderGoal,
  type OrchestrationV2PlanArtifact,
  type OrchestrationV2PlanStep,
  type OrchestrationV2PendingBackgroundTask,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2UserInputQuestion,
  type OrchestrationV2Subagent,
  type OrchestrationV2AppThread,
  type OrchestrationV2SubagentWorkflow,
  type OrchestrationV2WorkflowRunHandles,
  type OrchestrationV2TurnItem,
  type OrchestrationV2WebSearchResult,
  type ProviderApprovalDecision,
  type ProviderApprovalFullAccessOverride,
  ProviderMcpSignInError,
  type ProviderApprovalOption,
  type ProviderApprovalPushHooks,
  ProviderDriverKind,
  type ProviderInstanceId,
  type ProviderRuntimeModeLimitReason,
  type ProviderRequestKind,
  type ProviderUserInputAnswers,
  type ProviderThreadId,
  type RunId,
  type ThreadId,
  resolveIdleCompaction,
  isDelegatedAppThread,
} from "@t3tools/contracts";

import { FILE_HEADERS_ONLY, formatPatch, structuredPatch } from "diff";
// @effect-diagnostics-next-line nodeBuiltinImport:off -- A synchronous digest inside the pure note filter.
import * as NodeCrypto from "node:crypto";
import * as Cause from "effect/Cause";
import * as Predicate from "effect/Predicate";
import * as Clock from "effect/Clock";
import * as Context from "effect/Context";
import * as SecureRandom from "effect/crypto/SecureRandom";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Equal from "effect/Equal";
import * as Exit from "effect/Exit";
import * as Fiber from "effect/Fiber";
import * as Schedule from "effect/Schedule";
import * as FileSystem from "effect/FileSystem";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Queue from "effect/Queue";
import * as Ref from "effect/Ref";
import * as Schema from "effect/Schema";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import * as ChildProcess from "effect/process/ChildProcess";
import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";

import { resolveAttachmentPath } from "../../attachmentStore.ts";
import { snapshotMcpApp } from "../../mcpApps/McpAppSnapshot.ts";
import {
  claudeProgramReader,
  claudeProgramWasReplaced,
  resolveClaudeSdkExecutablePath,
} from "../../provider/Drivers/ClaudeExecutable.ts";
import * as ProviderInstallationGate from "../../provider/ProviderInstallationGate.ts";
import {
  planClaudeSkillDispatch,
  type ClaudeSkillTarget,
} from "../../provider/Drivers/ClaudeSkillDispatch.ts";
import {
  claudeLaunchArgDirectories,
  claudeLaunchArgParseOptions,
  claudeLaunchArgPluginDirectories,
  customClaudeApiEndpointHost,
  discoverClaudeSkills,
  readClaudeSettingsEnv,
} from "../../provider/Drivers/ClaudeSkills.ts";
import {
  compileClaudeModelSelection,
  type CompiledClaudeModelSelection,
} from "../../claudeModelOptions.ts";
import * as ServerConfig from "../../config.ts";
import { NativeTelemetryClient } from "../../resourceTelemetry/NativeTelemetryClient.ts";
import * as PortScanner from "../../preview/PortScanner.ts";
import * as ProcessRunner from "../../processRunner.ts";
import * as ServerSettings from "../../serverSettings.ts";
import { expandHomePath } from "@t3tools/provider-core/server/pathExpansion";
import { spawnAndCollect } from "@t3tools/provider-core/server/snapshotProbe";
import { signalProcessGroup } from "@t3tools/provider-core/server/processGroup";
import {
  claudeLocalSettingsDirectory,
  claudeSignedOutMessage,
  makeClaudeEnvironment,
  mergeClaudeProcessEnvironment,
  resolveClaudeHomePath,
} from "../../provider/Drivers/ClaudeHome.ts";
import {
  BUNDLED_CLAUDE_MODEL_CATALOG,
  resolveClaudeCatalogContextWindowTokens,
  type ClaudeModelCatalog,
  getClaudeCatalogModelCapabilities,
  resolveClaudeModelSlug,
  resolveClaudeReportedModelSlug,
  scopeClaudeModelCatalog,
} from "../../provider/ClaudeModelCatalog.ts";
import {
  boundProviderEventForLogging,
  shouldPersistProviderEvent,
} from "../../provider/EventNdjsonLogger.ts";
import * as ProviderEventLoggers from "@t3tools/provider-core/server/ProviderEventLoggers";
import {
  claudeRateLimitEventToUpdate,
  type ClaudeScopedLimitNames,
} from "../../provider/claudeUsageLimits.ts";
import type { ManagedServerProvider } from "@t3tools/provider-core/server/snapshot";
import {
  T3_CODE_DEVICE_TOOL_INSTRUCTIONS_WITH_TOOL_SEARCH,
  T3_CODE_ORCHESTRATION_INSTRUCTIONS,
} from "@t3tools/provider-core/server/orchestrationInstructions";
import { buildRuntimeInstructions } from "@t3tools/provider-core/server/runtimeInstructions";
import {
  mcpToolPresentation,
  normalizeMcpText,
} from "@t3tools/provider-core/server/mcpToolPresentation";
import * as McpProviderSession from "@t3tools/provider-core/server/mcpSession";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
  PROVIDER_RETRY_BUDGET_MS,
  providerProcessExitGuidance,
} from "@t3tools/provider-core/server/failure";
import { turnScopedSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import { providerMessageTextWithAttachmentPaths } from "@t3tools/provider-core/server/attachmentPrompt";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";
import {
  ProviderAdapterDriverCreateError,
  type ProviderAdapterDriverCreateInput,
} from "@t3tools/provider-core/server/adapterDriver";
import {
  type BackgroundWorkReport,
  backgroundWorkNotification,
} from "@t3tools/provider-core/server/notification";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  makeSubagentChildThread,
  makeSubagentConversationArtifacts,
  subagentThreadTitle,
} from "@t3tools/provider-core/server/subagentProjection";

import type { ActiveClaudeTurnContext } from "./ClaudeAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindFinalizeActiveTurn = (ctx: any) =>
  Effect.fnUntraced(function* (requested: {
    readonly context: ActiveClaudeTurnContext;
    readonly status: Extract<
      OrchestrationV2ProviderTurn["status"],
      "completed" | "interrupted" | "failed" | "cancelled"
    >;
    readonly completedAt: DateTime.Utc;
    readonly failure?: OrchestrationV2ProviderFailure;
    readonly threadDisposition?: "reusable" | "broken";
    readonly result?: SDKResultMessage;
  }) {
    const {
      CLAUDE_PROVIDER,
      activeTurn,
      assistantDeltas,
      awaitedBackgroundTasksByNativeThread,
      buildAssistantArtifacts,
      clearNativeThreadTaskIdSet,
      clearPendingBackgroundTasksForNativeThread,
      clearUnansweredRequestWatch,
      connectingTurn,
      cutOffStreamedText,
      deliveredAppContext,
      emitProviderEvent,
      emitSteerStatus,
      endToolCalls,
      goalCheckedTurns,
      goalsByNativeThread,
      idAllocator,
      interruptedTurns,
      joinFallbackText,
      liveProcessRunsBackgroundWork,
      opaqueBackgroundTaskReplayTombstonesByNativeThread,
      owedWakeTasksForNativeThread,
      pendingBackgroundTasksByNativeThread,
      providerRetries,
      providerTurnPayload,
      publishedPendingBackgroundTasks,
      queryContext,
      reasoningDeltas,
      rememberProviderThread,
      reportStartupPhase,
      resolveItemOrdinal,
      resultLedgerUsage,
      rosterForNativeThread,
      scheduledWakeupsByNativeThread,
      session,
      sessionScope,
      sessionSubagentsByTaskId,
      settledTurnByNativeThread,
      subagentToolCalls,
      taskIdSetForNativeThread,
      updateClaudeSubagentNode,
      wakeEligibleBackgroundTasksByNativeThread,
    } = pickScriptcBindCtx(ctx);

    // A turn stopped by the retry budget settles as failed with the retry's error.
    const retryBudgetFailure = requested.context.retryBudgetFailure;
    const input =
      requested.status === "interrupted" && retryBudgetFailure !== undefined
        ? { ...requested, status: "failed" as const, failure: retryBudgetFailure }
        : requested;
    input.context.steersClosed = true;
    if (connectingTurn === input.context) {
      connectingTurn = undefined;
      yield* reportStartupPhase(undefined);
    }
    yield* reasoningDeltas.flushTurn(input.context.nativeTurnId);
    if (input.status === "completed") {
      yield* assistantDeltas.flushTurn(input.context.nativeTurnId);
    } else {
      yield* cutOffStreamedText(input.context);
    }
    if (input.status === "completed" && input.context.appContextOffered !== undefined) {
      deliveredAppContext.set(input.context.nativeThreadId, input.context.appContextOffered);
    }
    // A live Claude still runs a steer queued at a completed result, and Stop drops them unread
    // with a notice below. A steer whose process exited stays pending: nothing can read it now,
    // so the orchestrator sends it as the next turn.
    const droppedSteers = [...input.context.pendingSteers];
    input.context.pendingSteers.clear();
    const currentQuery = yield* Ref.get(queryContext);
    for (const [, { messageId, liveQuery }] of droppedSteers) {
      if (input.status !== "interrupted" && liveQuery !== currentQuery) continue;
      yield* emitSteerStatus(
        input.context,
        messageId,
        input.status === "completed" ? "completed" : "cancelled",
      );
    }
    if (input.context.compaction?.status === "running") {
      const reason = input.result?.subtype === "success" ? input.result.result.trim() : "";
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver: CLAUDE_PROVIDER,
        turnItem: {
          ...input.context.compaction,
          status: input.status === "completed" ? "failed" : input.status,
          title:
            input.status === "completed" || input.status === "failed"
              ? "Context compaction failed"
              : "Context compaction stopped",
          ...(reason === "" ? {} : { summary: reason }),
          completedAt: input.completedAt,
          updatedAt: input.completedAt,
        },
      });
    }
    input.context.compaction = null;
    if (input.status !== "completed") {
      const liveQuery = yield* Ref.get(queryContext);
      for (const [taskId, subagent] of yield* Ref.get(sessionSubagentsByTaskId)) {
        if (
          subagent.task.workflow === undefined ||
          subagent.task.status !== "running" ||
          subagent.task.runId !== input.context.input.runId
        )
          continue;
        if (liveQuery !== null && !liveQuery.stopping) {
          // An unanswered stop must not delay turn settlement.
          yield* liveQuery.query
            .stopTask(taskId)
            .pipe(Effect.timeout("15 seconds"), Effect.ignore, Effect.forkIn(sessionScope));
        }
        yield* updateClaudeSubagentNode({
          context: input.context,
          taskId,
          status: input.status === "failed" ? "failed" : "cancelled",
          onlyIfRunningInRun: input.context.input.runId,
        });
      }
    }
    const liveQuery = yield* Ref.get(queryContext);
    const runningChildThreadIds = new Set(
      [...(yield* Ref.get(sessionSubagentsByTaskId)).values()].flatMap((subagent) =>
        subagent.task.status === "running" &&
        (input.status === "completed" ||
          (liveQuery !== null && subagent.task.runId !== input.context.input.runId)) &&
        liveQuery?.subagentsFromEarlierProcesses.has(subagent) !== true
          ? [subagent.childThreadId]
          : [],
      ),
    );
    const endingSubagentCalls = [...subagentToolCalls.values()].filter(
      (toolCall) => !runningChildThreadIds.has(toolCall.threadId),
    );
    yield* endToolCalls({
      context: input.context,
      toolCalls: [...input.context.toolCalls.values(), ...endingSubagentCalls],
      status: input.status === "completed" ? "failed" : input.status,
      completedAt: input.completedAt,
    });
    input.context.toolCalls.clear();
    for (const toolCall of endingSubagentCalls) {
      subagentToolCalls.delete(toolCall.nativeItemId);
    }

    const fallbackText = joinFallbackText(
      input.context.assistant.earlierFallbackText,
      input.context.assistant.fallbackText,
    );
    if (input.context.assistant.emittedNativeItemIds.size === 0 && fallbackText.length > 0) {
      const ordinal = yield* resolveItemOrdinal(
        input.context,
        input.context.assistant.fallbackNativeItemId,
      );
      const artifacts = buildAssistantArtifacts({
        idAllocator,
        turnInput: input.context.input,
        providerTurnId: input.context.providerTurnId,
        nativeItemId: input.context.assistant.fallbackNativeItemId,
        text: fallbackText,
        ordinal,
        startedAt: input.context.startedAt,
        completedAt: input.completedAt,
      });
      yield* Effect.all(
        [
          emitProviderEvent({
            type: "node.updated",
            driver: CLAUDE_PROVIDER,
            node: artifacts.node,
          }),
          emitProviderEvent({
            type: "message.updated",
            driver: CLAUDE_PROVIDER,
            message: artifacts.message,
          }),
          emitProviderEvent({
            type: "turn_item.updated",
            driver: CLAUDE_PROVIDER,
            turnItem: artifacts.turnItem,
          }),
        ],
        { concurrency: 1 },
      );
    }

    const providerRetry = yield* Ref.modify(providerRetries, (current) => {
      const retry = current.get(input.context.providerTurnId);
      if (retry === undefined) {
        return [undefined, current] as const;
      }
      const updated = new Map(current);
      updated.delete(input.context.providerTurnId);
      return [retry, updated] as const;
    });
    if (providerRetry !== undefined && input.status !== "failed") {
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver: CLAUDE_PROVIDER,
        turnItem: makeProviderRetryTurnItem({
          driver: CLAUDE_PROVIDER,
          threadId: input.context.input.threadId,
          runId: input.context.input.runId,
          nodeId: input.context.input.rootNodeId,
          providerThreadId: input.context.input.providerThread.id,
          providerTurnId: input.context.providerTurnId,
          itemOrdinal: providerRetry.itemOrdinal,
          failure: providerRetry.failure,
          retry: providerRetry.retry,
          status: input.status,
          startedAt: providerRetry.startedAt,
          updatedAt: input.completedAt,
        }),
      });
    }

    if (input.status === "interrupted") {
      for (const [uuid, { text, liveQuery }] of droppedSteers) {
        // Only a CLI proven to echo prompt uuids can leave a steer unconfirmed.
        if (liveQuery.promptEchoMode !== "early" && liveQuery.promptEchoMode !== "result_only") {
          continue;
        }
        const nativeItemId = `unread-steer:${uuid}`;
        const notice = `Claude did not confirm reading your steer before Stop. It may not have been delivered. Resend it if needed: "${text}"`;
        yield* emitProviderEvent({
          type: "turn_item.updated",
          driver: CLAUDE_PROVIDER,
          turnItem: {
            id: idAllocator.derive.turnItemFromProviderItem({
              driver: CLAUDE_PROVIDER,
              nativeItemId,
            }),
            threadId: input.context.input.threadId,
            runId: input.context.input.runId,
            nodeId: input.context.input.rootNodeId,
            providerThreadId: input.context.input.providerThread.id,
            providerTurnId: input.context.providerTurnId,
            nativeItemRef: {
              driver: CLAUDE_PROVIDER,
              nativeId: nativeItemId,
              strength: "weak",
            },
            parentItemId: null,
            ordinal: yield* resolveItemOrdinal(input.context, nativeItemId),
            type: "system_notice",
            status: "completed",
            title: "Steer delivery not confirmed",
            message: notice,
            startedAt: input.completedAt,
            completedAt: input.completedAt,
            updatedAt: input.completedAt,
          },
        });
      }
    }

    const threadDisposition = input.threadDisposition ?? "reusable";
    const terminalEvent: ProviderAdapter.ProviderAdapterV2Event =
      input.status === "failed"
        ? {
            type: "turn.terminal",
            driver: CLAUDE_PROVIDER,
            providerThreadId: input.context.input.providerThread.id,
            providerTurnId: input.context.providerTurnId,
            runOrdinal: input.context.input.runOrdinal,
            failureItemOrdinal: yield* resolveItemOrdinal(
              input.context,
              `terminal-failure:${input.context.providerTurnId}`,
            ),
            status: input.status,
            failure: input.failure ?? makeProviderFailure({ class: "provider_error" }),
            ...(providerRetry === undefined
              ? {}
              : {
                  retry: providerRetry.retry,
                  retryStartedAt: providerRetry.startedAt,
                }),
            threadDisposition,
          }
        : {
            type: "turn.terminal",
            driver: CLAUDE_PROVIDER,
            providerThreadId: input.context.input.providerThread.id,
            providerTurnId: input.context.providerTurnId,
            runOrdinal: input.context.input.runOrdinal,
            status: input.status,
            failure: null,
            threadDisposition,
          };
    yield* Effect.all(
      [
        emitProviderEvent({
          type: "provider_turn.updated",
          driver: CLAUDE_PROVIDER,
          providerTurn: {
            ...providerTurnPayload({
              context: input.context,
              status: input.status,
              completedAt: input.completedAt,
            }),
            turnTokenUsage: normalizeClaudeTurnTokenUsage(
              input.result,
              input.context.subagentsByTaskId.size > 0 ||
                input.context.subagentsByToolUseId.size > 0,
              input.status,
              input.context.steeredSegmentUsage,
              {
                rootModels: input.context.rootModels,
                ...(input.result === undefined
                  ? {}
                  : {
                      ledger: addClaudeLedgerUsage(
                        input.context.steeredLedgerUsage,
                        resultLedgerUsage.get(input.result),
                      ),
                    }),
              },
            ),
          },
        }),
        // Emit the roster before root settlement so writeFinalRunEvents preserves it.
        Effect.gen(function* () {
          const nativeThreadId =
            input.context.input.providerThread.nativeThreadRef?.nativeId ?? null;
          const liveQuery = yield* Ref.get(queryContext);
          // Background tasks outlive a failed turn while the process that ran it stays open.
          const processKeepsTasks =
            input.status === "failed" &&
            liveQuery !== null &&
            !liveQuery.stopping &&
            liveQuery.lastTurn === input.context;
          if (nativeThreadId !== null) {
            if (input.status !== "completed" && !processKeepsTasks) {
              // Stop cancels Claude's wakeup and an exited process loses it; a failed
              // turn on a live process leaves it pending. Process exits null the query first.
              if (input.status !== "failed" || liveQuery === null) {
                scheduledWakeupsByNativeThread.delete(nativeThreadId);
              }
              yield* clearPendingBackgroundTasksForNativeThread(nativeThreadId);
              yield* clearNativeThreadTaskIdSet(
                wakeEligibleBackgroundTasksByNativeThread,
                nativeThreadId,
              );
              yield* clearNativeThreadTaskIdSet(
                opaqueBackgroundTaskReplayTombstonesByNativeThread,
                nativeThreadId,
              );
            }
          }
          const roster =
            nativeThreadId === null
              ? new Map<string, OrchestrationV2PendingBackgroundTask>()
              : rosterForNativeThread(
                  yield* Ref.get(pendingBackgroundTasksByNativeThread),
                  nativeThreadId,
                );
          const awaitedTaskIds =
            nativeThreadId === null
              ? new Set<string>()
              : taskIdSetForNativeThread(
                  yield* Ref.get(awaitedBackgroundTasksByNativeThread),
                  nativeThreadId,
                );
          const owedWakeTasks =
            nativeThreadId === null ? [] : yield* owedWakeTasksForNativeThread(nativeThreadId);
          // A stopped turn that wrote to the transcript moved past the pinned head.
          const clearConversationHead =
            (input.status === "completed" || input.context.nativeMessageCursor !== null) &&
            input.context.input.providerThread.nativeConversationHeadRef !== null;
          const goal =
            nativeThreadId === null ? undefined : goalsByNativeThread.get(nativeThreadId);
          const goalChecked = goalCheckedTurns.delete(input.context.providerTurnId);
          const terminalReason = input.result?.terminal_reason;
          if (
            nativeThreadId !== null &&
            goal?.status === "active" &&
            goalChecked &&
            input.status === "completed" &&
            (terminalReason === undefined || terminalReason === "completed") &&
            roster.size === 0 &&
            !(
              liveQuery?.nativeThreadId === nativeThreadId &&
              (yield* liveProcessRunsBackgroundWork(liveQuery, { forGoalCheck: true }))
            )
          ) {
            goalsByNativeThread.set(nativeThreadId, {
              objective: goal.objective,
              status: "complete",
              ...(goal.checks === undefined ? {} : { checks: goal.checks }),
            });
          }
          const providerThread: OrchestrationV2ProviderThread = {
            ...input.context.input.providerThread,
            providerSessionId: session.id,
            ...(clearConversationHead ? { nativeConversationHeadRef: null } : {}),
            ...(nativeThreadId !== null && goalsByNativeThread.has(nativeThreadId)
              ? { goal: goalsByNativeThread.get(nativeThreadId) ?? null }
              : {}),
            firstRunOrdinal:
              input.context.input.providerThread.firstRunOrdinal ?? input.context.input.runOrdinal,
            lastRunOrdinal: input.context.input.runOrdinal,
            pendingBackgroundTasks: [
              ...publishedPendingBackgroundTasks(nativeThreadId, roster, awaitedTaskIds),
              ...owedWakeTasks,
            ],
            status: input.status === "completed" ? "active" : "idle",
            updatedAt: input.completedAt,
          };
          yield* rememberProviderThread(providerThread);
          yield* emitProviderEvent({
            type: "provider_thread.updated" as const,
            driver: CLAUDE_PROVIDER,
            providerThread,
            pendingBackgroundWork: owedWakeTasks.length > 0,
          });
        }),
        emitProviderEvent(terminalEvent),
      ],
      { concurrency: 1 },
    );
    yield* Ref.update(activeTurn, (current) =>
      current?.providerTurnId === input.context.providerTurnId ? null : current,
    );
    yield* clearUnansweredRequestWatch(input.context);
    if (input.status === "completed") {
      settledTurnByNativeThread.set(input.context.nativeThreadId, input.context);
    } else {
      settledTurnByNativeThread.delete(input.context.nativeThreadId);
    }
    yield* Ref.update(interruptedTurns, (current) => {
      const next = new Set(current);
      next.delete(input.context.providerTurnId);
      return next;
    });
  });
