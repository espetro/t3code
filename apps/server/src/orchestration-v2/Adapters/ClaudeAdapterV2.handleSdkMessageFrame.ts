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

import type {
  ActiveClaudeProviderRetry,
  ActiveClaudeTurnContext,
  ClaudeAgentSdkQuerySession,
  ClaudeMessageUsage,
} from "./ClaudeAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindHandleSdkMessageFrame = (ctx: any) =>
  Effect.fnUntraced(function* (input: {
    readonly query: ClaudeAgentSdkQuerySession;
    readonly message: SDKMessage;
    readonly replayed?: boolean;
  }) {
    const {
      CLAUDE_PROVIDER,
      CLAUDE_TASK_TOOL_NAMES,
      EMPTY_CLAUDE_NATIVE_TOOL_INPUT,
      PENDING_CLAUDE_SUBAGENT_CAP,
      PENDING_CLAUDE_SUBAGENT_FRAME_CAP,
      absorbHeldResult,
      activeTurn,
      adapterOptions,
      announceMcpSignIns,
      appliedSessionTitles,
      appliedSubagentOutcomes,
      applyBackgroundTaskRosterMessage,
      applyClaudeTaskTool,
      applyWorkflowProgressWithoutTurn,
      assistantDeltas,
      assistantTextFromSdkMessage,
      backgroundedSubagentTaskIds,
      bufferWakeMessage,
      bufferedResultArrivals,
      canonicalClaudeSubagentModel,
      captureClaudeMcpApp,
      claudeEchoedPromptUuids,
      claudeFocusRequestedPanePlugin,
      claudeForkedSkillToolUseId,
      claudeMessageInputTokens,
      claudeNativeToolInputFromUnknown,
      claudeNativeToolInputValue,
      claudeNativeToolOutputValue,
      claudePromptLifecycle,
      claudeRewrittenVersion,
      claudeSubagentResultText,
      claudeTaskField,
      claudeTaskOutcome,
      claudeTaskSteps,
      claudeTaskTypeFromSdkMessage,
      claudeTodoSteps,
      claudeToolNonExecutionKind,
      claudeToolPresentationsFromAssistantMessage,
      claudeToolResultEntriesFromMessage,
      claudeToolResultSettlesSubagent,
      claudeToolUseBlocksFromAssistantMessage,
      claudeUsageLimitResetAt,
      claudeWritesUpdatesAsThinking,
      clearOpaqueBackgroundTaskReplayTombstone,
      clearUnansweredRequestWatch,
      clearWakeReports,
      completeProviderRetry,
      connectingTurn,
      cutOffStreamedText,
      deliveredAppContext,
      describeClaudeUsageLimit,
      discardBufferedSubagentStarts,
      emitAssistantTextArtifacts,
      emitClaudePlanProjection,
      emitContextUsage,
      emitProviderEvent,
      emitSubagentConversationMessage,
      emitSubagentThinking,
      ensureReasoningBlock,
      ensureToolCallStarted,
      failExpiredProviderRetry,
      failUnansweredRequest,
      fileSystem,
      finalizeActiveTurn,
      findToolCall,
      followForkedSkillTranscript,
      forkedSkillToolUseIdsByTaskId,
      forkedSkillTranscripts,
      hasPendingBackgroundTaskOnNativeThread,
      heldProposedPlansByToolUseId,
      idAllocator,
      interruptedTurns,
      isClaudeActiveSteeringAbortResult,
      isClaudeBackgroundTasksChangedMessage,
      isClaudeBlockedAssistantRateLimit,
      isClaudeGoalAcknowledgement,
      isClaudeLocalCommandEcho,
      isClaudeNonSubagentTask,
      isClaudeProviderContinuationTurn,
      isClaudeTaskNotificationOriginResult,
      isClaudeToolResultError,
      isKnownOpaqueBackgroundTaskOnNativeThread,
      isNestedSubagentTask,
      markAbsorbedWake,
      mergeClaudeStreamUsage,
      modelCatalog,
      nestedSubagentTaskIds,
      normalizeClaudeResultText,
      normalizeClaudeSessionTitle,
      opaqueTaskWakeReport,
      optionalClaudeUsageTokenCount,
      parentToolUseIdFromSdkMessage,
      path,
      pdfBudgets,
      pendingSubagentFramesByToolUseId,
      pendingSubagentLaunchesByToolUseId,
      persistAttachmentBudget,
      providerFailureFromApiRetry,
      providerFailureFromResult,
      providerRetries,
      publishAssistantArtifacts,
      queryContext,
      readClaudeTaskList,
      reasoningDeltas,
      recordWakeReport,
      recoverResumedClaudeSubagent,
      rememberClaudeSubagentLaunch,
      rememberPendingClaudeSubagentLaunch,
      reportStartupPhase,
      requestedQueries,
      resolveItemOrdinal,
      resolveSubagentByToolUseId,
      resultLedgerUsage,
      resultTextFromSdkMessage,
      resultsReportingNewContextWindow,
      sessionScope,
      sessionSubagentTaskIdsByToolUseId,
      sessionSubagentsByTaskId,
      settleToolCall,
      settledTurnByNativeThread,
      settledTurnForSubagentFrame,
      steeredTurns,
      subagentProjectionTarget,
      subagentStopOutcomes,
      taskListsByNativeThread,
      taskOutputTails,
      terminalStatusFromResult,
      toolCallsFor,
      toolNameFromClaudeToolResult,
      trackClaudeGoal,
      trackClaudeMonitorCalls,
      trackClaudeScheduledWakeup,
      transcriptModel,
      updateClaudeSubagentNode,
      wakeBuffers,
      withoutForgedMcpApp,
    } = pickScriptcBindCtx(ctx);

    const liveQuery = yield* Ref.get(queryContext);
    if (liveQuery?.query !== input.query) {
      return;
    }

    const message = input.message;
    if (message.type === "prompt_suggestion") {
      // Arrives after `result`; offer it only while the completed turn is still the latest.
      // A continuation can settle from buffered frames first, so its suggestion may be a user turn's.
      const settled = settledTurnByNativeThread.get(liveQuery.nativeThreadId);
      const text = message.suggestion.trim();
      if (
        settled !== undefined &&
        !isClaudeProviderContinuationTurn(settled.input) &&
        text.length > 0 &&
        (yield* Ref.get(activeTurn)) === null
      ) {
        yield* emitProviderEvent({
          type: "prompt_suggestion.updated",
          driver: CLAUDE_PROVIDER,
          threadId: settled.input.threadId,
          runId: settled.input.runId,
          text,
        });
      }
      return;
    }
    // Track before routing: idle-wake Monitors report tasks before replaying their tool calls.
    yield* trackClaudeMonitorCalls(message);
    yield* trackClaudeScheduledWakeup(liveQuery.nativeThreadId, message);
    // Update before routing because the idle wake gate reads this.
    if (
      message.type === "system" &&
      message.subtype === "task_started" &&
      !isClaudeNonSubagentTask(message) &&
      (message.spawn_depth ?? 1) > 1
    ) {
      yield* Ref.update(nestedSubagentTaskIds, (current) =>
        current.has(message.task_id) ? current : new Set(current).add(message.task_id),
      );
    }
    if (message.type === "rate_limit_event") {
      const rateLimitInfo = message.rate_limit_info;
      if (!rateLimitInfo) return;
      const names = adapterOptions.scopedLimitNames
        ? yield* Ref.get(adapterOptions.scopedLimitNames)
        : { overageIncluded: undefined };
      const update = claudeRateLimitEventToUpdate(rateLimitInfo, names);
      const now = yield* DateTime.now;
      if (update && adapterOptions.onUsageLimits) {
        yield* adapterOptions.onUsageLimits({
          ...update,
          checkedAt: DateTime.formatIso(now),
        });
      }
      const context = yield* Ref.get(activeTurn);
      if (context === null) {
        yield* bufferWakeMessage({
          nativeThreadId: liveQuery.nativeThreadId,
          message,
        });
        return;
      }
      const overageAllowed =
        rateLimitInfo.overageStatus === "allowed" ||
        rateLimitInfo.overageStatus === "allowed_warning" ||
        rateLimitInfo.isUsingOverage === true ||
        rateLimitInfo.overageInUse === true;
      const blocked = rateLimitInfo.status === "rejected" && !overageAllowed;
      const limitType = rateLimitInfo.rateLimitType ?? "unknown";
      if (blocked) {
        context.rejectedRateLimitTypes.add(limitType);
        context.rateLimitResetTimes.set(limitType, claudeUsageLimitResetAt(rateLimitInfo.resetsAt));
      } else if (
        rateLimitInfo.status === "allowed" ||
        rateLimitInfo.status === "allowed_warning" ||
        overageAllowed
      ) {
        context.rejectedRateLimitTypes.delete(limitType);
        context.rateLimitResetTimes.delete(limitType);
      }
      if (blocked) {
        const limitKey = `${limitType}:${rateLimitInfo.resetsAt ?? "unknown"}`;
        if (!context.announcedUsageLimits.has(limitKey)) {
          context.announcedUsageLimits.add(limitKey);
          const nativeItemId = `usage-limit:${context.providerTurnId}:${limitKey}`;
          const notice = describeClaudeUsageLimit(
            rateLimitInfo,
            DateTime.toEpochMillis(now),
            names,
          );
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver: CLAUDE_PROVIDER,
            turnItem: {
              id: idAllocator.derive.turnItemFromProviderItem({
                driver: CLAUDE_PROVIDER,
                nativeItemId,
              }),
              threadId: context.input.threadId,
              runId: context.input.runId,
              nodeId: context.input.rootNodeId,
              providerThreadId: context.input.providerThread.id,
              providerTurnId: context.providerTurnId,
              nativeItemRef: {
                driver: CLAUDE_PROVIDER,
                nativeId: nativeItemId,
                strength: "weak",
              },
              parentItemId: null,
              ordinal: yield* resolveItemOrdinal(context, nativeItemId),
              type: "system_notice",
              status: "completed",
              title: notice,
              message: notice,
              startedAt: now,
              completedAt: now,
              updatedAt: now,
            },
          });
        }
      }
      return;
    }
    const context =
      (yield* Ref.get(activeTurn)) ??
      (yield* settledTurnForSubagentFrame(liveQuery.nativeThreadId, message));
    if (context === null) {
      if (isClaudeLocalCommandEcho(message)) {
        return;
      }
      yield* applyWorkflowProgressWithoutTurn(message);
      // Buffer wake evidence before clearing the task from the roster.
      if (message.type === "system" && message.subtype === "task_notification") {
        yield* bufferWakeMessage({ nativeThreadId: liveQuery.nativeThreadId, message });
        yield* applyBackgroundTaskRosterMessage({
          nativeThreadId: liveQuery.nativeThreadId,
          message,
          activeContext: null,
        });
        const registered = (yield* Ref.get(sessionSubagentsByTaskId)).get(message.task_id);
        const settled = settledTurnByNativeThread.get(liveQuery.nativeThreadId);
        const hasBufferedStart =
          (yield* Ref.get(wakeBuffers))
            .get(liveQuery.nativeThreadId)
            ?.messages.some(
              (entry) =>
                entry.type === "system" &&
                entry.subtype === "task_started" &&
                entry.task_id === message.task_id,
            ) ?? false;
        const canApplyOutcome =
          subagentStopOutcomes.has(message.task_id) ||
          (!hasBufferedStart && registered?.task.workflow === undefined);
        if (registered !== undefined && settled !== undefined && canApplyOutcome) {
          yield* discardBufferedSubagentStarts(liveQuery.nativeThreadId, message.task_id, message);
          yield* updateClaudeSubagentNode({
            context: settled,
            taskId: message.task_id,
            ...(message.tool_use_id === undefined ? {} : { toolUseId: message.tool_use_id }),
            workflowFrame: message,
            nativeOutcome: message,
            result: message.summary,
            status: claudeTaskOutcome(message.status),
            onlyIfRunningInRun: registered.task.runId,
          });
        }
      } else {
        yield* applyBackgroundTaskRosterMessage({
          nativeThreadId: liveQuery.nativeThreadId,
          message,
          activeContext: null,
        });
        yield* bufferWakeMessage({ nativeThreadId: liveQuery.nativeThreadId, message });
      }
      return;
    }
    if (context === (yield* Ref.get(activeTurn))) {
      const lifecycle = claudePromptLifecycle(message);
      if (
        (message.type === "system" &&
          message.subtype === "status" &&
          message.status === "requesting") ||
        (lifecycle?.state === "started" && lifecycle.uuid === context.promptUuid)
      ) {
        if (
          message.type === "system" &&
          message.subtype === "status" &&
          !requestedQueries.has(input.query)
        ) {
          requestedQueries.add(input.query);
          connectingTurn = context;
          yield* reportStartupPhase("connecting");
        }
        const since = yield* DateTime.now;
        context.unansweredRequestSince = since;
        const previousWatch = context.unansweredRequestWatch;
        // Only the wait is interruptible: a fired failure runs on its own fiber.
        context.unansweredRequestWatch = yield* Effect.sleep(PROVIDER_RETRY_BUDGET_MS).pipe(
          Effect.andThen(failUnansweredRequest(context, since).pipe(Effect.forkIn(sessionScope))),
          Effect.forkIn(sessionScope),
        );
        if (previousWatch !== undefined) yield* Fiber.interrupt(previousWatch);
        // A turn that settled meanwhile already cleared its watch, so drop the new one too.
        if ((yield* Ref.get(activeTurn)) !== context) {
          yield* clearUnansweredRequestWatch(context);
        }
      } else if (
        // Background tasks from earlier turns keep streaming while the root request hangs.
        // Only the root starts depth-1 tasks, so such a start (a forked skill) is this turn's.
        Reflect.get(message, "parent_tool_use_id") == null &&
        !(
          message.type === "system" &&
          message.subtype.startsWith("task_") &&
          !(message.subtype === "task_started" && (message.spawn_depth ?? 1) <= 1)
        )
      ) {
        context.unansweredRequestSince = undefined;
        yield* clearUnansweredRequestWatch(context);
        if (connectingTurn === context) {
          connectingTurn = undefined;
          yield* reportStartupPhase(undefined);
        }
      }
    }
    const focusedPlugin = claudeFocusRequestedPanePlugin(message);
    if (focusedPlugin !== null && context === (yield* Ref.get(activeTurn))) {
      yield* Effect.logWarning("orchestration-v2.claude-mod-pane-focus-unsupported", {
        providerTurnId: context.providerTurnId,
        plugin: focusedPlugin,
      });
      liveQuery.stopping = true;
      yield* finalizeActiveTurn({
        context,
        status: "failed",
        completedAt: yield* DateTime.now,
        failure: makeProviderFailure({
          class: "provider_error",
          code: "claude_mod_ui_unsupported",
          message: `The Claude Code mod "${focusedPlugin}" is waiting for input in its terminal pane, which T3 Code cannot show. Disable the mod for sessions run from T3 Code, or run the task in the Claude Code terminal.`,
        }),
      });
      // Closing ends the CLI process and abandons the held tool call
      // without answering it. Not interrupt: the held CLI may never ack it.
      yield* liveQuery.query.close.pipe(Effect.ignore);
      return;
    }
    yield* trackClaudeGoal({ nativeThreadId: liveQuery.nativeThreadId, context, message });

    if (message.type === "stream_event" && !message.parent_tool_use_id) {
      const event = message.event;
      const reasoning = context.reasoning;
      if (event.type === "message_start") {
        reasoning.messageId = event.message.id;
        reasoning.streamBlocks.clear();
        context.assistant.streamBlocks.clear();
        const usage: ClaudeMessageUsage = event.message.usage ?? {};
        context.streamUsage = { messageId: event.message.id, usage };
        yield* emitContextUsage(context, usage, true);
      } else if (event.type === "message_delta") {
        const usage: typeof event.usage | null | undefined = event.usage;
        const stream = context.streamUsage;
        if (stream?.usage && usage != null) {
          stream.usage = mergeClaudeStreamUsage(stream.usage, usage);
          yield* emitContextUsage(context, stream.usage);
        }
      } else if (
        event.type === "content_block_start" &&
        event.content_block.type === "thinking" &&
        reasoning.messageId !== null
      ) {
        const index = reasoning.nextBlockIndex.get(reasoning.messageId) ?? 0;
        reasoning.nextBlockIndex.set(reasoning.messageId, index + 1);
        const itemId = `${reasoning.messageId}:thinking:${index}`;
        reasoning.streamBlocks.set(event.index, itemId);
        yield* ensureReasoningBlock(context, itemId);
        yield* reasoningDeltas.append({
          turnId: context.nativeTurnId,
          itemId,
          delta: event.content_block.thinking,
        });
      } else if (event.type === "content_block_delta" && event.delta.type === "thinking_delta") {
        const itemId = reasoning.streamBlocks.get(event.index);
        if (itemId !== undefined) {
          yield* reasoningDeltas.append({
            turnId: context.nativeTurnId,
            itemId,
            delta: event.delta.thinking,
          });
        }
      } else if (
        event.type === "content_block_start" &&
        event.content_block.type === "text" &&
        reasoning.messageId !== null
      ) {
        const assistant = context.assistant;
        const index = assistant.nextBlockIndex.get(reasoning.messageId) ?? 0;
        assistant.nextBlockIndex.set(reasoning.messageId, index + 1);
        const itemId = `${reasoning.messageId}:text:${index}`;
        assistant.streamBlocks.set(event.index, itemId);
        assistant.lastReply = null;
        assistant.streamItems.set(itemId, {
          startedAt: yield* DateTime.now,
          status: "completed",
          text: null,
        });
        yield* resolveItemOrdinal(context, itemId);
        yield* assistantDeltas.append({
          turnId: context.nativeTurnId,
          itemId,
          delta: event.content_block.text,
        });
      } else if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        const itemId = context.assistant.streamBlocks.get(event.index);
        if (itemId !== undefined) {
          yield* assistantDeltas.append({
            turnId: context.nativeTurnId,
            itemId,
            delta: event.delta.text,
          });
        }
      } else if (event.type === "content_block_stop") {
        const itemId = reasoning.streamBlocks.get(event.index);
        if (itemId !== undefined) {
          yield* reasoningDeltas.complete({
            turnId: context.nativeTurnId,
            itemId,
            emitEmpty: false,
          });
          reasoning.streamBlocks.delete(event.index);
        }
        const textItemId = context.assistant.streamBlocks.get(event.index);
        const textItem =
          textItemId === undefined ? undefined : context.assistant.streamItems.get(textItemId);
        if (textItemId !== undefined && textItem !== undefined) {
          textItem.text = yield* assistantDeltas.complete({
            turnId: context.nativeTurnId,
            itemId: textItemId,
            emitEmpty: false,
          });
          context.assistant.streamBlocks.delete(event.index);
        }
      }
      return;
    }
    // Snapshot text the stream did not deliver, once any of it streamed.
    const unstreamedSnapshotText: Array<string> = [];
    let streamedSnapshotReply: NonNullable<
      ActiveClaudeTurnContext["assistant"]["lastReply"]
    > | null = null;
    if (
      message.type === "assistant" &&
      !message.parent_tool_use_id &&
      !context.reasoning.snapshots.has(message.uuid)
    ) {
      context.reasoning.snapshots.add(message.uuid);
      // The SDK snapshots each completed block; count thinking blocks separately to preserve streamed ids.
      for (const block of message.message.content) {
        if (block.type === "text") {
          const assistant = context.assistant;
          const index = assistant.snapshotBlockIndex.get(message.message.id) ?? 0;
          assistant.snapshotBlockIndex.set(message.message.id, index + 1);
          const itemId = `${message.message.id}:text:${index}`;
          const streamed = assistant.streamItems.get(itemId);
          if (streamed === undefined) {
            unstreamedSnapshotText.push(block.text);
          } else {
            const text =
              streamed.text !== null && (!block.text || block.text === streamed.text)
                ? streamed.text
                : yield* assistantDeltas.complete({
                    turnId: context.nativeTurnId,
                    itemId,
                    ...(block.text ? { finalText: block.text } : {}),
                    emitEmpty: false,
                  });
            streamed.text = text;
            if (text.length > 0) {
              streamedSnapshotReply = {
                nativeItemId: itemId,
                text,
                startedAt: streamed.startedAt,
              };
            }
          }
        }
        if (block.type !== "thinking") {
          const update = context.reasoning.lastThinking;
          context.reasoning.lastThinking = null;
          if (
            block.type === "tool_use" &&
            update !== null &&
            update.text.trim() !== "" &&
            update.messageId === message.message.id &&
            update.followsThinking &&
            claudeWritesUpdatesAsThinking(message.message.model)
          ) {
            yield* emitAssistantTextArtifacts({
              context,
              nativeItemId: update.itemId,
              text: update.text,
            });
          }
          continue;
        }
        const index = context.reasoning.snapshotBlockIndex.get(message.message.id) ?? 0;
        context.reasoning.snapshotBlockIndex.set(message.message.id, index + 1);
        const itemId = `${message.message.id}:thinking:${index}`;
        yield* ensureReasoningBlock(context, itemId);
        const finalText = block.thinking || context.reasoning.blocks.get(itemId)?.text;
        const completedText = yield* reasoningDeltas.complete({
          turnId: context.nativeTurnId,
          itemId,
          ...(finalText ? { finalText } : {}),
          emitEmpty: false,
        });
        const previous = context.reasoning.lastThinking;
        // Empty thinking from default display still precedes a pre-tool update.
        context.reasoning.lastThinking = {
          messageId: message.message.id,
          itemId,
          text: completedText,
          followsThinking: previous !== null && previous.messageId === message.message.id,
        };
      }
      // A repeated snapshot frame must not re-emit streamed text under its uuid.
      if (streamedSnapshotReply !== null && unstreamedSnapshotText.join("").length === 0) {
        context.assistant.emittedNativeItemIds.add(message.uuid);
      }
    }

    if (message.type === "assistant" && input.replayed !== true) {
      if (message.parent_tool_use_id === null) {
        // CLI notices and API errors arrive as assistant messages from "<synthetic>".
        if (message.message.model && message.message.model !== "<synthetic>") {
          context.rootModels.add(message.message.model);
          context.executedModel = resolveClaudeReportedModelSlug(
            modelCatalog,
            message.message.model,
          );
        }
        // Subagent uuids exist only in the sidechain transcript, so resume and fork cannot target them.
        context.nativeMessageCursor = message.uuid;
        context.latestAssistantRateLimit =
          message.error === "rate_limit" ? { type: null, resetAt: null } : null;
        if (message.error === "rate_limit" && isClaudeBlockedAssistantRateLimit(message)) {
          const info = message.api_error_params.rate_limit_info;
          const overageAllowed =
            info.overageStatus === "allowed" ||
            info.overageStatus === "allowed_warning" ||
            info.isUsingOverage === true ||
            info.overageInUse === true;
          if (!overageAllowed) {
            context.latestAssistantRateLimit = {
              type: typeof info.rateLimitType === "string" ? info.rateLimitType : "unknown",
              resetAt: claudeUsageLimitResetAt(info.resetsAt),
            };
          }
        }
        if (message.error === "authentication_failed") {
          context.authenticationFailureMessage = claudeSignedOutMessage({
            configDir: adapterOptions.environment.CLAUDE_CONFIG_DIR,
            cwd: path.resolve(context.input.runtimePolicy.cwd ?? "."),
          });
        }
      }
    }

    if (
      message.type === "system" &&
      message.subtype === "status" &&
      (message.compact_result !== undefined ||
        (message.status === null && message.permissionMode === undefined))
    ) {
      // The CLI reports a compaction it aborted for our interrupt as failed.
      const failed =
        message.compact_result === "failed" &&
        !(yield* Ref.get(interruptedTurns)).has(context.providerTurnId);
      if (message.compact_result !== undefined) {
        context.compactionFailure = failed ? { message: message.compact_error } : null;
      }
      if (context.compaction?.status === "running") {
        const now = yield* DateTime.now;
        context.compaction = {
          ...context.compaction,
          status:
            message.compact_result === "success" ? "completed" : failed ? "failed" : "interrupted",
          title:
            message.compact_result === "success"
              ? "Context compacted"
              : failed
                ? "Context compaction failed"
                : "Context compaction stopped",
          ...(failed && message.compact_error ? { summary: message.compact_error } : {}),
          completedAt: now,
          updatedAt: now,
        };
        yield* emitProviderEvent({
          type: "turn_item.updated",
          driver: CLAUDE_PROVIDER,
          turnItem: context.compaction,
        });
        if (message.compact_result !== "success") {
          context.compaction = null;
          const budget = pdfBudgets.get(context.nativeThreadId);
          if (budget !== undefined) budget.compacting = null;
        }
      }
    }

    // Every trigger discards the conversation, so reset whatever the trigger is.
    if (message.type === "conversation_reset") {
      deliveredAppContext.set(context.nativeThreadId, new Map());
      context.appContextOffered = undefined;
      if (context.streamUsage !== null) context.streamUsage.usage = null;
      context.compactionTokens = 0;
      yield* emitContextUsage(context, 0);
      return;
    }

    if (
      message.type === "system" &&
      (message.subtype === "compact_boundary" ||
        (message.subtype === "status" && message.status === "compacting"))
    ) {
      if (message.subtype === "status" && context.compaction?.status === "running") return;
      const now = yield* DateTime.now;
      const nativeItemId = message.uuid;
      const compaction =
        (message.subtype === "compact_boundary" ? context.compaction : null) ??
        ({
          id: idAllocator.derive.turnItemFromProviderItem({
            driver: CLAUDE_PROVIDER,
            nativeItemId,
          }),
          threadId: context.input.threadId,
          runId: context.input.runId,
          nodeId: context.input.rootNodeId,
          providerThreadId: context.input.providerThread.id,
          providerTurnId: context.providerTurnId,
          nativeItemRef: {
            driver: CLAUDE_PROVIDER,
            nativeId: nativeItemId,
            strength: "strong",
          },
          parentItemId: null,
          ordinal: yield* resolveItemOrdinal(context, nativeItemId),
          type: "compaction",
          driver: CLAUDE_PROVIDER,
          status: "running",
          title: "Compacting context",
          startedAt: now,
          completedAt: null,
          updatedAt: now,
        } satisfies OrchestrationV2TurnItem);
      if (message.subtype === "status") {
        const budget = pdfBudgets.get(context.nativeThreadId);
        // Offers made while compaction runs are outside the history it
        // removes. Pending reservations must survive its boundary too.
        if (budget !== undefined) budget.compacting = { ...budget.committed };
        context.compaction = compaction;
        yield* emitProviderEvent({
          type: "turn_item.updated",
          driver: CLAUDE_PROVIDER,
          turnItem: compaction,
        });
        return;
      }
      const budget = pdfBudgets.get(context.nativeThreadId);
      if (budget !== undefined) {
        // Aggregate persisted usage cannot identify attachments in a
        // preserved segment. Retain it conservatively on partial compacts.
        if (
          message.compact_metadata.preserved_segment === undefined &&
          message.compact_metadata.preserved_messages === undefined
        ) {
          const compacted = budget.compacting ?? { ...budget.committed };
          budget.committed.pages -= compacted.pages;
          budget.committed.bytes -= compacted.bytes;
        }
        budget.compacting = null;
        yield* persistAttachmentBudget(context.nativeThreadId);
      }
      deliveredAppContext.set(context.nativeThreadId, new Map());
      context.appContextOffered = undefined;
      if (context.streamUsage !== null) context.streamUsage.usage = null;
      const postTokens = message.compact_metadata.post_tokens;
      const afterTokenCount =
        typeof postTokens === "number" && Number.isFinite(postTokens) && postTokens > 0
          ? Math.round(postTokens)
          : undefined;
      context.compactionTokens = afterTokenCount;
      if (afterTokenCount !== undefined) yield* emitContextUsage(context, afterTokenCount);
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver: CLAUDE_PROVIDER,
        turnItem: {
          ...compaction,
          status: "completed",
          title: "Context compacted",
          completedAt: compaction.completedAt ?? now,
          updatedAt: now,
          ...(message.compact_metadata.pre_tokens === undefined
            ? {}
            : { beforeTokenCount: message.compact_metadata.pre_tokens }),
          ...(afterTokenCount === undefined ? {} : { afterTokenCount }),
        },
      });
      context.compaction = null;
      return;
    }

    if (
      message.type === "system" &&
      (message.subtype === "model_refusal_fallback" ||
        (message.subtype === "informational" && message.level !== "info"))
    ) {
      context.assistant.noticeTexts.add(message.content);
      // A Stop hook's systemMessage arrives as a passive notice after every turn.
      // Warnings and notices that prevent continuation explain a blocked turn.
      if (
        message.subtype === "informational" &&
        message.level === "notice" &&
        message.content.startsWith("Stop says: ") &&
        message.prevent_continuation !== true
      ) {
        return;
      }
      const now = yield* DateTime.now;
      const nativeItemId = message.uuid;
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver: CLAUDE_PROVIDER,
        turnItem: {
          id: idAllocator.derive.turnItemFromProviderItem({
            driver: CLAUDE_PROVIDER,
            nativeItemId,
          }),
          threadId: context.input.threadId,
          runId: context.input.runId,
          nodeId: context.input.rootNodeId,
          providerThreadId: context.input.providerThread.id,
          providerTurnId: context.providerTurnId,
          nativeItemRef: {
            driver: CLAUDE_PROVIDER,
            nativeId: nativeItemId,
            strength: "strong",
          },
          parentItemId: null,
          ordinal: yield* resolveItemOrdinal(context, nativeItemId),
          type: "system_notice",
          status: "completed",
          title: message.content,
          message: message.content,
          startedAt: now,
          completedAt: now,
          updatedAt: now,
        },
      });
      return;
    }

    if (message.type === "system" && message.subtype === "api_retry") {
      const updatedAt = yield* DateTime.now;
      const previous = (yield* Ref.get(providerRetries)).get(context.providerTurnId);
      const retry: OrchestrationV2ProviderRetry = {
        attempt: Math.max(1, Math.trunc(message.attempt)),
        maxAttempts: Math.max(1, Math.trunc(message.max_retries)),
        retryDelayMs: Math.max(0, Math.trunc(message.retry_delay_ms)),
      };
      const failure = providerFailureFromApiRetry(message);
      const itemOrdinal =
        previous?.itemOrdinal ??
        (yield* resolveItemOrdinal(context, `terminal-failure:${context.providerTurnId}`));
      const state: ActiveClaudeProviderRetry = {
        retry,
        failure,
        startedAt: previous?.startedAt ?? updatedAt,
        itemOrdinal,
      };
      yield* Ref.update(providerRetries, (current) => {
        const updated = new Map(current);
        updated.set(context.providerTurnId, state);
        return updated;
      });
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver: CLAUDE_PROVIDER,
        turnItem: makeProviderRetryTurnItem({
          driver: CLAUDE_PROVIDER,
          threadId: context.input.threadId,
          runId: context.input.runId,
          nodeId: context.input.rootNodeId,
          providerThreadId: context.input.providerThread.id,
          providerTurnId: context.providerTurnId,
          itemOrdinal,
          failure,
          retry,
          status: "running",
          startedAt: state.startedAt,
          updatedAt,
        }),
      });
      if (previous === undefined) {
        yield* failExpiredProviderRetry(context, state.startedAt).pipe(
          Effect.delay(PROVIDER_RETRY_BUDGET_MS),
          Effect.forkIn(sessionScope),
        );
      }
      return;
    }

    if (message.type === "assistant" && input.replayed !== true) {
      if (message.message.model !== "<synthetic>") {
        const now = yield* DateTime.now;
        yield* completeProviderRetry(context, now);
      }
      // CLI-generated <synthetic> frames report zero usage, not context usage.
      if (
        message.parent_tool_use_id === null &&
        message.message.usage != null &&
        message.message.model !== "<synthetic>"
      ) {
        const snapshotUsage = message.message.usage;
        const stream = context.streamUsage;
        if (stream === null || stream.messageId !== message.message.id) {
          context.streamUsage = { messageId: message.message.id, usage: snapshotUsage };
          yield* emitContextUsage(context, snapshotUsage);
        } else if (
          stream.usage !== null &&
          claudeMessageInputTokens(stream.usage) <= 0 &&
          claudeMessageInputTokens(snapshotUsage) > 0
        ) {
          stream.usage = {
            ...snapshotUsage,
            output_tokens: Math.max(
              optionalClaudeUsageTokenCount(snapshotUsage.output_tokens) ?? 0,
              optionalClaudeUsageTokenCount(stream.usage.output_tokens) ?? 0,
            ),
          };
          yield* emitContextUsage(context, stream.usage);
        }
      }
      const parentToolUseId = message.parent_tool_use_id;
      const snapshotModel =
        typeof message.message.model === "string" ? message.message.model.trim() : "";
      // "<synthetic>" identifies CLI notices, not the subagent model.
      const model =
        snapshotModel.length === 0 || snapshotModel === "<synthetic>"
          ? undefined
          : canonicalClaudeSubagentModel(modelCatalog, snapshotModel);
      if (parentToolUseId !== null && model !== undefined) {
        const subagent = yield* resolveSubagentByToolUseId(context, parentToolUseId);
        if (subagent === undefined) {
          rememberPendingClaudeSubagentLaunch(pendingSubagentLaunchesByToolUseId, parentToolUseId, {
            model,
          });
        } else if (subagent.task.status === "running" && subagent.task.model !== model) {
          yield* updateClaudeSubagentNode({
            context,
            taskId: subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id),
            toolUseId: parentToolUseId,
            model,
            status: subagent.task.status,
          });
        }
      }
    }

    const frameParentToolUseId = parentToolUseIdFromSdkMessage(message);
    if (
      frameParentToolUseId !== null &&
      (yield* resolveSubagentByToolUseId(context, frameParentToolUseId)) === undefined
    ) {
      const droppedToolUseId = yield* Ref.modify(pendingSubagentFramesByToolUseId, (current) => {
        const frames = current.get(frameParentToolUseId) ?? [];
        if (frames.length >= PENDING_CLAUDE_SUBAGENT_FRAME_CAP) {
          return [frameParentToolUseId, current] as const;
        }
        const next = new Map(current).set(frameParentToolUseId, [...frames, message]);
        const oldest = next.keys().next();
        if (next.size > PENDING_CLAUDE_SUBAGENT_CAP && !oldest.done) {
          next.delete(oldest.value);
          return [oldest.value, next] as const;
        }
        return [null, next] as const;
      });
      if (droppedToolUseId !== null) {
        yield* Effect.logWarning("orchestration-v2.claude-subagent-frames-dropped", {
          providerTurnId: context.providerTurnId,
          parentToolUseId: droppedToolUseId,
        });
      }
      return;
    }

    if (isClaudeBackgroundTasksChangedMessage(message)) {
      yield* applyBackgroundTaskRosterMessage({
        nativeThreadId: liveQuery.nativeThreadId,
        message,
        activeContext: context,
      });
      return;
    }

    if (message.type === "system" && message.subtype === "task_started") {
      if (isClaudeNonSubagentTask(message)) {
        const tailedCall =
          message.tool_use_id === undefined
            ? undefined
            : findToolCall(context, message.tool_use_id);
        if (
          liveQuery.taskOutputRoot !== undefined &&
          message.task_type === "local_bash" &&
          // Older Claude Code builds omit the flag on foreground calls.
          message.is_backgrounded !== true &&
          tailedCall?.classification.itemType === "command_execution" &&
          !taskOutputTails.has(tailedCall.nativeItemId)
        ) {
          const itemId = idAllocator.derive.turnItemFromProviderItem({
            driver: CLAUDE_PROVIDER,
            nativeItemId: tailedCall.nativeItemId,
          });
          const stop = yield* Deferred.make<void>();
          const fiber = yield* tailClaudeTaskOutput({
            root: liveQuery.taskOutputRoot,
            sessionId: message.session_id,
            taskId: message.task_id,
            stop,
            onChunk: (chunk) =>
              emitProviderEvent({
                type: "command_output.delta",
                driver: CLAUDE_PROVIDER,
                threadId: tailedCall.threadId,
                itemId,
                chunk,
              }),
          }).pipe(
            Effect.provideService(FileSystem.FileSystem, fileSystem),
            Effect.provideService(Path.Path, path),
            Effect.forkIn(sessionScope),
          );
          taskOutputTails.set(tailedCall.nativeItemId, { fiber, stop });
        }
        context.ignoredTaskIds.add(message.task_id);
        yield* applyBackgroundTaskRosterMessage({
          nativeThreadId: liveQuery.nativeThreadId,
          message,
          activeContext: context,
        });
      } else {
        const launch =
          message.tool_use_id === undefined
            ? undefined
            : pendingSubagentLaunchesByToolUseId.get(message.tool_use_id);
        if (message.tool_use_id !== undefined) {
          pendingSubagentLaunchesByToolUseId.delete(message.tool_use_id);
        }
        const owner =
          launch?.ownerToolUseId === undefined
            ? undefined
            : yield* resolveSubagentByToolUseId(context, launch.ownerToolUseId);
        // Nested subagents default to their owner's model.
        const model = launch?.model ?? owner?.task.model ?? undefined;
        if (message.is_backgrounded === true && !(yield* isNestedSubagentTask(message.task_id))) {
          yield* Ref.update(backgroundedSubagentTaskIds, (current) =>
            new Set(current).add(message.task_id),
          );
        }
        yield* recoverResumedClaudeSubagent({
          context,
          nativeThreadId: liveQuery.nativeThreadId,
          taskId: message.task_id,
          toolUseId: message.tool_use_id,
          title: message.description,
        });
        const isWorkflow = claudeTaskTypeFromSdkMessage(message) === CLAUDE_WORKFLOW_TASK_TYPE;
        const workflowName = isWorkflow ? text(field(message, "workflow_name")) : undefined;

        yield* updateClaudeSubagentNode({
          context,
          taskId: message.task_id,
          ...(message.task_type === undefined ? {} : { nativeTaskType: message.task_type }),
          ...(message.tool_use_id === undefined ? {} : { toolUseId: message.tool_use_id }),
          ...(message.prompt === undefined ? {} : { prompt: message.prompt }),
          ...(model === undefined ? {} : { model }),
          ...(launch?.effort === undefined ? {} : { effort: launch.effort }),
          ...(owner === undefined ? {} : { owner }),
          ...(isWorkflow
            ? {
                workflowFrame: message,
                ...(workflowName === undefined ? {} : { workflowName }),
              }
            : {}),

          title: message.description,
          status: "running",
          reopen: true,
          ...(message.run_id === undefined ? {} : { nativeRunId: message.run_id }),
        });
        const forkedSkillToolUseId = claudeForkedSkillToolUseId(message);
        if (forkedSkillToolUseId !== undefined) {
          forkedSkillToolUseIdsByTaskId.set(message.task_id, forkedSkillToolUseId);
          yield* Ref.update(sessionSubagentTaskIdsByToolUseId, (current) =>
            new Map(current).set(forkedSkillToolUseId, message.task_id),
          );
          const previous = forkedSkillTranscripts.get(forkedSkillToolUseId);
          if (previous !== undefined) yield* Fiber.interrupt(previous.fiber);
          const shownUuids = new Set<string>();
          const finish = yield* Deferred.make<void>();
          const fiber = yield* followForkedSkillTranscript(
            context,
            message.task_id,
            shownUuids,
            finish,
          ).pipe(Effect.forkIn(sessionScope));
          forkedSkillTranscripts.set(forkedSkillToolUseId, { fiber, shownUuids, finish });
        }
        yield* Ref.update(wakeBuffers, (current) => {
          const entry = current.get(liveQuery.nativeThreadId);
          if (entry === undefined) return current;
          const replayIndex = entry.messages.indexOf(message);
          const messages = entry.messages.filter(
            (buffered, index) =>
              !(
                (replayIndex === -1 || index < replayIndex) &&
                buffered.type === "system" &&
                (buffered.subtype === "task_started" || buffered.subtype === "task_notification") &&
                buffered.task_id === message.task_id
              ),
          );
          return messages.length === entry.messages.length
            ? current
            : new Map(current).set(liveQuery.nativeThreadId, { ...entry, messages });
        });
      }
    }

    if (
      message.type === "system" &&
      (message.subtype as string) === "session_title_changed" &&
      "title" in message &&
      typeof message.title === "string"
    ) {
      context.nativeSessionTitle = normalizeClaudeSessionTitle(message.title);
    }

    if (
      message.type === "result" &&
      message.subtype === "success" &&
      !message.is_error &&
      message.local_command === "rename" &&
      context.nativeSessionTitle !== null
    ) {
      const title = context.nativeSessionTitle;
      context.nativeSessionTitle = null;
      // The native session already has this title; the next turn must not send it back.
      appliedSessionTitles.set(liveQuery.nativeThreadId, title);
      if (title !== context.input.appThread.title) {
        yield* emitProviderEvent({
          type: "app_thread.created",
          driver: CLAUDE_PROVIDER,
          appThread: { ...context.input.appThread, title },
        });
      }
    }

    if (message.type === "system" && message.subtype === "task_progress") {
      const progress = message.description.trim();
      const isBackgroundTask = yield* hasPendingBackgroundTaskOnNativeThread(
        liveQuery.nativeThreadId,
        message.task_id,
      );
      const carriesWorkflowTelemetry = hasClaudeWorkflowSnapshot(message);
      const isWorkflowCoordinator =
        (yield* Ref.get(sessionSubagentsByTaskId)).get(message.task_id)?.task.workflow !==
        undefined;
      if (
        (carriesWorkflowTelemetry || (progress.length > 0 && !isWorkflowCoordinator)) &&
        !context.ignoredTaskIds.has(message.task_id) &&
        !isBackgroundTask
      ) {
        yield* updateClaudeSubagentNode({
          context,
          taskId: message.task_id,
          ...(message.tool_use_id === undefined ? {} : { toolUseId: message.tool_use_id }),
          ...(progress.length === 0 ? {} : { progress }),
          workflowFrame: message,
          status: "running",
        });
      }
    }

    if (message.type === "system" && message.subtype === "task_notification") {
      const isRegistered = (yield* Ref.get(sessionSubagentsByTaskId)).has(message.task_id);
      // A task whose start is still held for the next wake drain has no
      // node to finish yet; hold its outcome behind that start, or the
      // drain replays the start alone and the task stays running.
      if (!isRegistered) {
        yield* Ref.update(wakeBuffers, (current) => {
          const entry = current.get(liveQuery.nativeThreadId);
          if (
            entry === undefined ||
            entry.messages.includes(message) ||
            !entry.messages.some(
              (buffered) =>
                buffered.type === "system" &&
                buffered.subtype === "task_started" &&
                buffered.task_id === message.task_id,
            )
          ) {
            return current;
          }
          return new Map(current).set(liveQuery.nativeThreadId, {
            ...entry,
            messages: [...entry.messages, message],
          });
        });
      }
      if (!appliedSubagentOutcomes.has(message) && isRegistered) {
        yield* discardBufferedSubagentStarts(liveQuery.nativeThreadId, message.task_id, message);
      }
      const wasBackgroundTask = yield* isKnownOpaqueBackgroundTaskOnNativeThread(
        liveQuery.nativeThreadId,
        message.task_id,
      );
      if (!isClaudeProviderContinuationTurn(context.input)) {
        if (wasBackgroundTask) {
          yield* recordWakeReport(
            liveQuery.nativeThreadId,
            message.task_id,
            yield* opaqueTaskWakeReport(liveQuery.nativeThreadId, message),
          );
        } else if (
          !wasBackgroundTask &&
          (yield* Ref.get(backgroundedSubagentTaskIds)).has(message.task_id)
        ) {
          const registered = (yield* Ref.get(sessionSubagentsByTaskId)).get(message.task_id);
          yield* recordWakeReport(liveQuery.nativeThreadId, message.task_id, {
            kind: "subagent",
            label: registered?.task.title ?? undefined,
            outcome: claudeTaskOutcome(message.status),
            childThreadId: registered?.childThreadId,
          });
        }
      }
      yield* Ref.update(backgroundedSubagentTaskIds, (current) => {
        if (!current.has(message.task_id)) return current;
        const updated = new Set(current);
        updated.delete(message.task_id);
        return updated;
      });
      yield* applyBackgroundTaskRosterMessage({
        nativeThreadId: liveQuery.nativeThreadId,
        message,
        activeContext: context,
      });
      if (
        !wasBackgroundTask &&
        !context.ignoredTaskIds.has(message.task_id) &&
        !appliedSubagentOutcomes.has(message)
      ) {
        // A forked skill's summary is only its name; its last reply is the report.
        const result = forkedSkillToolUseIdsByTaskId.delete(message.task_id)
          ? ((yield* Ref.get(sessionSubagentsByTaskId)).get(message.task_id)?.lastAssistantText ??
            undefined)
          : message.summary;
        yield* updateClaudeSubagentNode({
          context,
          taskId: message.task_id,
          ...(message.tool_use_id === undefined ? {} : { toolUseId: message.tool_use_id }),
          workflowFrame: message,
          nativeOutcome: message,
          ...(result === undefined ? {} : { result }),
          status:
            message.status === "completed"
              ? "completed"
              : message.status === "stopped"
                ? "cancelled"
                : "failed",
        });
      }
      if (wasBackgroundTask) {
        yield* clearOpaqueBackgroundTaskReplayTombstone(liveQuery.nativeThreadId, message.task_id);
      }
    }

    const toolPresentations = claudeToolPresentationsFromAssistantMessage(message);
    for (const toolUse of claudeToolUseBlocksFromAssistantMessage(message)) {
      const nativeToolInput = claudeNativeToolInputFromUnknown(toolUse.input);
      if (toolUse.name === "Agent") {
        rememberClaudeSubagentLaunch(
          modelCatalog,
          context,
          pendingSubagentLaunchesByToolUseId,
          toolUse.id,
          nativeToolInput,
          parentToolUseIdFromSdkMessage(message),
        );
        continue;
      }
      if (toolUse.name === "TodoWrite" && parentToolUseIdFromSdkMessage(message) === null) {
        yield* emitClaudePlanProjection({
          context,
          nativeItemId: toolUse.id,
          kind: "todo_list",
          steps: claudeTodoSteps(nativeToolInput),
        }).pipe(Effect.orDie);
      }
      yield* ensureToolCallStarted({
        context,
        nativeItemId: toolUse.id,
        toolName: toolUse.name,
        toolInput: nativeToolInput,
        parentToolUseId: parentToolUseIdFromSdkMessage(message),
        presentation:
          toolPresentations.get(toolUse.id) ??
          mcpToolPresentation({
            toolName: toolUse.name.replace(/^mcp__claude_ai_/u, "mcp__"),
          }),
      });
      const heldPlan = heldProposedPlansByToolUseId.get(toolUse.id);
      if (heldPlan !== undefined) {
        heldProposedPlansByToolUseId.delete(toolUse.id);
        yield* emitClaudePlanProjection({
          context,
          nativeItemId: toolUse.id,
          kind: "proposed_plan",
          markdown: heldPlan,
        }).pipe(Effect.orDie);
      }
    }

    for (const { toolResult, output } of claudeToolResultEntriesFromMessage(message)) {
      // A foreground fork's stream opens with a placeholder result for its own launch call.
      if (parentToolUseIdFromSdkMessage(message) === toolResult.tool_use_id) continue;
      const subagent = yield* resolveSubagentByToolUseId(context, toolResult.tool_use_id);
      const runHandles = parseClaudeWorkflowRunHandles(claudeNativeToolOutputValue(output));
      if (subagent !== undefined && runHandles !== undefined) {
        yield* updateClaudeSubagentNode({
          context,
          taskId: subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id),
          toolUseId: toolResult.tool_use_id,
          workflowRunHandles: runHandles,
          status: "running",
        });
      }
      // Resume tool results only acknowledge delivery; only Agent launch results may settle subagents.
      // Agent tool_uses project as subagent rows and never enter toolCalls.
      if (subagent !== undefined && findToolCall(context, toolResult.tool_use_id) === undefined) {
        if (!claudeToolResultSettlesSubagent(toolResult, output)) continue;
        const result = claudeSubagentResultText(output);
        yield* updateClaudeSubagentNode({
          context,
          taskId: subagent.task.nativeTaskRef?.nativeId ?? String(subagent.task.id),
          toolUseId: toolResult.tool_use_id,
          ...(result.length === 0 ? {} : { result }),
          status: isClaudeToolResultError(toolResult) ? "failed" : "completed",
        });
        continue;
      }
      const parentToolUseId = parentToolUseIdFromSdkMessage(message);
      const toolCall =
        findToolCall(context, toolResult.tool_use_id) ??
        (yield* ensureToolCallStarted({
          context,
          nativeItemId: toolResult.tool_use_id,
          toolName: toolNameFromClaudeToolResult(toolResult),
          toolInput: EMPTY_CLAUDE_NATIVE_TOOL_INPUT,
          parentToolUseId,
        }));
      const appOutput =
        parentToolUseId === null && toolCall.runId !== null && !isClaudeToolResultError(toolResult)
          ? yield* captureClaudeMcpApp({ liveQuery, toolCall, output })
          : undefined;
      yield* settleToolCall({
        context,
        toolCall,
        registry: toolCallsFor(context, toolCall),
        message,
        toolResult,
        output:
          appOutput ??
          (toolCall.toolName.startsWith("mcp__") ? withoutForgedMcpApp(output) : output),
        completedAt: yield* DateTime.now,
      });
      // Subagents write to the session's shared task store, so their
      // task tools update the parent turn's list. Failed or never-run
      // calls changed nothing.
      if (
        claudeToolNonExecutionKind(message, toolResult.tool_use_id) === undefined &&
        !isClaudeToolResultError(toolResult) &&
        CLAUDE_TASK_TOOL_NAMES.has(toolCall.toolName)
      ) {
        const taskLists = yield* Ref.get(taskListsByNativeThread);
        const knownTaskList = taskLists.get(liveQuery.nativeThreadId);
        const outputValue = claudeNativeToolOutputValue(output);
        // A structured TaskList already supplies a snapshot. Anything else, including
        // a subagent's text-only TaskList, needs Claude's persisted list once;
        // afterward the cache also records an unavailable store.
        const storedTaskList =
          !taskLists.has(liveQuery.nativeThreadId) &&
          !(
            toolCall.toolName === "TaskList" && Array.isArray(claudeTaskField(outputValue, "tasks"))
          )
            ? yield* readClaudeTaskList({
                environment: adapterOptions.environment,
                cwd: context.input.runtimePolicy.cwd,
                nativeThreadId: liveQuery.nativeThreadId,
              }).pipe(
                Effect.provideService(FileSystem.FileSystem, fileSystem),
                Effect.provideService(Path.Path, path),
              )
            : undefined;
        const taskList =
          applyClaudeTaskTool(
            knownTaskList ?? storedTaskList ?? new Map(),
            toolCall.toolName,
            claudeNativeToolInputValue(toolCall.input),
            outputValue,
          ) ?? storedTaskList;
        yield* Ref.set(
          taskListsByNativeThread,
          new Map(taskLists).set(liveQuery.nativeThreadId, taskList ?? knownTaskList),
        );
        if (taskList !== undefined) {
          yield* emitClaudePlanProjection({
            context,
            nativeItemId: `claude-tasks:${context.providerTurnId}`,
            kind: "todo_list",
            steps: claudeTaskSteps(taskList),
          }).pipe(Effect.orDie);
        }
      }
    }

    const assistantParentToolUseId = parentToolUseIdFromSdkMessage(message);
    if (message.type === "assistant" && assistantParentToolUseId !== null) {
      const thinking = message.message.content.flatMap((block) =>
        block.type === "thinking" && block.thinking.trim().length > 0 ? [block.thinking] : [],
      );
      const subagent =
        thinking.length === 0
          ? undefined
          : yield* resolveSubagentByToolUseId(context, assistantParentToolUseId);
      if (subagent !== undefined) {
        yield* emitSubagentThinking(
          subagentProjectionTarget(subagent),
          message,
          yield* DateTime.now,
        );
      }
    }
    const assistantText = assistantTextFromSdkMessage(message);
    if (message.type === "assistant" && assistantParentToolUseId === null) {
      context.assistant.lastReply = streamedSnapshotReply;
    }
    if (
      assistantText !== null &&
      assistantText.text.length > 0 &&
      assistantParentToolUseId !== null
    ) {
      const subagent = yield* resolveSubagentByToolUseId(context, assistantParentToolUseId);
      if (subagent === undefined) {
        return;
      }
      const now = yield* DateTime.now;
      const nativeMessageId =
        message.type === "assistant" && typeof message.message.id === "string"
          ? message.message.id
          : null;
      subagent.lastAssistantText =
        nativeMessageId !== null && nativeMessageId === subagent.lastAssistantMessageId
          ? `${subagent.lastAssistantText ?? ""}\n${assistantText.text}`
          : assistantText.text;
      subagent.lastAssistantMessageId = nativeMessageId;
      yield* emitSubagentConversationMessage({
        nativeItemId: assistantText.nativeItemId,
        threadId: subagent.childThreadId,
        rootNodeId: subagent.childRootNodeId,
        role: "assistant",
        text: assistantText.text,
        ordinal: ++subagent.nextChildItemOrdinal,
        now,
      });
      return;
    }
    if (isClaudeGoalAcknowledgement(message)) {
      // The CLI repeats a local command's output as the turn's result text.
      if (assistantText !== null) {
        context.assistant.noticeTexts.add(normalizeClaudeResultText(assistantText.text));
      }
      return;
    }
    // Claude Code echoes /compact's stdout ("Not enough messages to compact.") as a
    // synthetic assistant message. The compaction item reports that outcome; it is not a
    // reply.
    if (
      message.type === "assistant" &&
      "local_command_source" in message &&
      isCompactionCommandMessage({ role: "user", ...context.input.message })
    ) {
      return;
    }
    if (assistantText !== null && assistantText.text.length > 0) {
      const text =
        streamedSnapshotReply === null ? assistantText.text : unstreamedSnapshotText.join("");
      if (text.length === 0) return;
      const startedAt = yield* emitAssistantTextArtifacts({
        context,
        nativeItemId: assistantText.nativeItemId,
        text,
      });
      if (startedAt !== undefined) {
        context.assistant.lastReply = {
          nativeItemId: assistantText.nativeItemId,
          text,
          startedAt,
        };
      }
      return;
    }

    if (
      isClaudeTaskNotificationOriginResult(message) &&
      !isClaudeProviderContinuationTurn(context.input) &&
      message.num_turns === 0
    ) {
      yield* Effect.logDebug("orchestration-v2.claude-task-notification-result-dropped", {
        providerTurnId: context.providerTurnId,
        num_turns: message.num_turns,
        stop_reason: message.stop_reason,
        terminal_reason: message.terminal_reason,
        uuid: message.uuid,
        session_id: message.session_id,
        createdBy: context.input.message.createdBy,
        creationSource: context.input.message.creationSource,
      });
      return;
    }

    if (
      isClaudeTaskNotificationOriginResult(message) &&
      !isClaudeProviderContinuationTurn(context.input)
    ) {
      yield* clearWakeReports(liveQuery.nativeThreadId);
      yield* Effect.logInfo("orchestration-v2.claude-task-notification-result-accepted", {
        providerTurnId: context.providerTurnId,
        num_turns: message.num_turns,
        stop_reason: message.stop_reason,
        terminal_reason: message.terminal_reason,
        uuid: message.uuid,
        session_id: message.session_id,
        createdBy: context.input.message.createdBy,
        creationSource: context.input.message.creationSource,
      });
    }

    const resultText =
      message.type === "result" &&
      ((message.subtype === "success" && message.is_error) ||
        terminalStatusFromResult(message) === "failed")
        ? null
        : resultTextFromSdkMessage(message);
    if (
      // A /compact's result text reports the compaction ("Not enough messages to
      // compact."), which its compaction item already carries; it is not a reply.
      !(
        message.type === "result" &&
        message.subtype === "success" &&
        message.local_command === "compact"
      ) &&
      context.assistant.emittedNativeItemIds.size === 0 &&
      context.assistant.fallbackText.length === 0 &&
      resultText !== null &&
      resultText.text.length > 0 &&
      !context.assistant.noticeTexts.has(resultText.text) &&
      !context.assistant.noticeTexts.has(normalizeClaudeResultText(resultText.text))
    ) {
      context.assistant.fallbackText = resultText.text;
      context.assistant.fallbackNativeItemId = resultText.nativeItemId;
    }

    if (message.type === "result") {
      if (context === (yield* Ref.get(activeTurn))) {
        yield* announceMcpSignIns(liveQuery, context);
      }
      const contextUsage = context.streamUsage?.usage ?? context.compactionTokens;
      if (resultsReportingNewContextWindow.has(message) && contextUsage !== undefined) {
        yield* emitContextUsage(context, contextUsage);
      }
      const completedAt = yield* DateTime.now;
      const interrupted = (yield* Ref.get(interruptedTurns)).has(context.providerTurnId);
      const wasSteered = (yield* Ref.get(steeredTurns)).has(context.providerTurnId);
      absorbHeldResult(context);
      if (!interrupted && wasSteered && isClaudeActiveSteeringAbortResult(message)) {
        const cutOffReply = context.assistant.lastReply;
        context.assistant.lastReply = null;
        if (message.terminal_reason === "aborted_streaming") {
          yield* cutOffStreamedText(context);
        }
        if (message.terminal_reason === "aborted_streaming" && cutOffReply !== null) {
          yield* publishAssistantArtifacts({
            context,
            ...cutOffReply,
            status: "interrupted",
            completedAt,
          });
        }
        context.steeredSegmentUsage.push(message.usage);
        context.steeredLedgerUsage = addClaudeLedgerUsage(
          context.steeredLedgerUsage,
          resultLedgerUsage.get(message),
        );
        return;
      }
      yield* Ref.update(steeredTurns, (current) => {
        const next = new Set(current);
        next.delete(context.providerTurnId);
        return next;
      });
      for (const taskId of context.subagentsByTaskId.keys()) {
        const model = yield* transcriptModel(context, liveQuery.nativeThreadId, taskId);
        const status = (yield* Ref.get(sessionSubagentsByTaskId)).get(taskId)?.task.status;
        if (
          model !== undefined &&
          (status === "completed" || status === "failed" || status === "cancelled")
        ) {
          yield* updateClaudeSubagentNode({ context, taskId, model, status });
        }
      }
      if (!isClaudeProviderContinuationTurn(context.input)) {
        yield* markAbsorbedWake(liveQuery.nativeThreadId);
      }
      const usageLimited =
        context.authenticationFailureMessage === undefined &&
        (context.rejectedRateLimitTypes.size > 0 || context.latestAssistantRateLimit !== null) &&
        (message.subtype !== "success" ||
          message.api_error_status == null ||
          message.api_error_status === 429) &&
        (message.terminal_reason == null ||
          message.terminal_reason === "api_error" ||
          message.terminal_reason === "blocking_limit");
      // The CLI also labels 403 authentication_failed; show its text because login cannot grant access.
      const permissionDenied = message.subtype === "success" && message.api_error_status === 403;
      const rewrittenVersion = claudeRewrittenVersion(message, liveQuery.claudeCodeVersion);
      const endpointHost =
        rewrittenVersion === undefined
          ? undefined
          : customClaudeApiEndpointHost(
              (yield* readClaudeSettingsEnv(
                adapterOptions.settings,
                context.input.runtimePolicy.cwd ?? undefined,
                adapterOptions.environment,
              ).pipe(
                Effect.provideService(FileSystem.FileSystem, fileSystem),
                Effect.provideService(Path.Path, path),
              )).ANTHROPIC_BASE_URL ?? adapterOptions.environment.ANTHROPIC_BASE_URL,
            );
      const rewrittenVersionError =
        endpointHost === undefined
          ? undefined
          : `The custom API endpoint ${endpointHost} reported Claude Code ${rewrittenVersion}, but this session runs Claude Code ${liveQuery.claudeCodeVersion}. Running claude update will not fix this; the endpoint or a proxy behind it rewrote the version.`;
      const failureHint = permissionDenied
        ? message.result
        : (context.authenticationFailureMessage ??
          (usageLimited
            ? "Claude usage limit reached. Send the message again once the limit resets."
            : rewrittenVersionError));
      // Usage-limited /compact reports success; fail it so queued messages wait for the limit to clear.
      const limitedCompaction =
        usageLimited && message.subtype === "success" && message.local_command === "compact"
          ? context.compactionFailure
          : null;
      const resultFailure = interrupted
        ? null
        : limitedCompaction !== null
          ? makeProviderFailure({
              class: "usage_limit",
              message: limitedCompaction.message ?? failureHint,
              code: "compaction_failed",
            })
          : providerFailureFromResult(
              message,
              bufferedResultArrivals.get(message) ?? completedAt,
              failureHint,
              usageLimited,
            );
      const resultResetAt = resultFailure?.class === "usage_limit" ? resultFailure.resetAt : null;
      // An untyped rejection without a reset is the gateway's own 429; its text names the reset.
      const resetTimes = Array.from(context.rateLimitResetTimes)
        .filter(([type, time]) => !(type === "unknown" && time === null && resultResetAt != null))
        .map(([, time]) => time);
      const assistantLimit = context.latestAssistantRateLimit;
      if (assistantLimit?.type != null && !context.rateLimitResetTimes.has(assistantLimit.type)) {
        resetTimes.push(assistantLimit.resetAt);
      }
      if (resultResetAt != null) {
        resetTimes.push(resultResetAt);
      }
      const resetAt =
        resetTimes.length > 0 && resetTimes.every((time) => time !== null)
          ? resetTimes.reduce((latest, time) => (time! > latest ? time! : latest), "")
          : null;
      const terminalFailure =
        resultFailure?.class === "usage_limit" ? { ...resultFailure, resetAt } : resultFailure;
      const status = interrupted
        ? "interrupted"
        : limitedCompaction !== null
          ? "failed"
          : terminalStatusFromResult(message, failureHint);
      // Claude answers a steer it has not read yet as the next native turn, which echoes
      // the steer. A result without echoes cannot prove that turn will come.
      if (
        status === "completed" &&
        terminalFailure === null &&
        context.pendingSteers.size > 0 &&
        claudeEchoedPromptUuids(message).length > 0
      ) {
        context.heldResult = message;
        // Claude ended its native turn on this reply; the run continues only for the steer.
        const answer = context.assistant.lastReply;
        if (answer !== null) {
          yield* publishAssistantArtifacts({
            context,
            ...answer,
            createdAt: answer.startedAt,
            status: "completed",
            completedAt,
            finalAnswer: true,
          });
        }
        return;
      }
      yield* finalizeActiveTurn({
        context,
        status,
        completedAt,
        result: message,
        ...(terminalFailure === null ? {} : { failure: terminalFailure }),
      });
    }
  });
