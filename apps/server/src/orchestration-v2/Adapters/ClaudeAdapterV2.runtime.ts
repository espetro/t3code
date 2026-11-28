// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ClaudeAdapterV2.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
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
  ActiveClaudeSubagent,
  ActiveClaudeToolCall,
  ActiveClaudeTurnContext,
  ClaudeAdapterV2Options,
  ClaudeAgentSdkQuerySession,
  ClaudeBypassAvailability,
  ClaudeLiveQueryContext,
  ClaudeMessageUsage,
  ClaudeNativeToolInput,
  ClaudeNativeToolOutput,
  ClaudeSubagentProjectionTarget,
  ClaudeTaskList,
  ClaudeToolClassification,
  ClaudeToolPresentation,
  ClaudeToolResultContentBlock,
  PendingClaudeRuntimeRequest,
  PendingClaudeSubagentLaunch,
} from "./ClaudeAdapterV2.helpers.ts";
import {
  BACKGROUND_MOVE_TIMEOUT_MS,
  CLAUDE_ATTACHMENT_MAX_BYTES,
  CLAUDE_ATTACHMENT_MAX_PAGES,
  CLAUDE_CODE_PRESET_TOOLS,
  CLAUDE_FORKED_SKILL_TRANSCRIPT_POLL,
  CLAUDE_GOAL_DEFERRING_TASK_TYPES,
  CLAUDE_MCP_APP_CAPTURE_TIMEOUT,
  CLAUDE_MCP_ELICITATION_OPTIONS,
  CLAUDE_PROVIDER,
  CLAUDE_QUERY_ENDED_BEFORE_TURN_DETAIL,
  CLAUDE_SCHEDULED_WAKEUP_EARLY_FIRE_MARGIN_MS,
  CLAUDE_SCHEDULED_WAKEUP_TASK,
  CLAUDE_STOP_CONFIRM_TIMEOUT_MS,
  CLAUDE_T3_MCP_SERVER,
  CLAUDE_TASK_TOOL_NAMES,
  CLAUDE_TRANSCRIPT_TAIL_BYTES,
  CLAUDE_TRANSCRIPT_WIDE_TAIL_BYTES,
  CLAUDE_WAKE_TURN_START_DEADLINE,
  ClaudeAgentSdkQueryRunner,
  ClaudeAgentSdkQueryRunnerError,
  ClaudeBackgroundWorkBlocksQueryReplacementError,
  ClaudeProviderCapabilitiesV2,
  EMPTY_CLAUDE_NATIVE_TOOL_INPUT,
  NO_CLAUDE_NATIVE_TOOL_OUTPUT,
  PENDING_CLAUDE_SUBAGENT_CAP,
  PENDING_CLAUDE_SUBAGENT_FRAME_CAP,
  WEB_FETCH_SNIPPET_MAX_CHARS,
  WORKFLOW_MEMBER_TRANSCRIPT_FLUSH_MS,
  applyClaudeTaskTool,
  assistantTextFromSdkMessage,
  awaitClaudeApprovalDecision,
  awaitClaudeUserInputAnswers,
  buildAssistantArtifacts,
  canApplyClaudeSelectionLive,
  canonicalClaudeSubagentModel,
  classifyClaudeNativeTool,
  claudeAppContextDigests,
  claudeApprovalPresentation,
  claudeAutoCompactThreshold,
  claudeAutoModeUnavailableNotice,
  claudeCommandOutputText,
  claudeEchoedPromptUuids,
  claudeEffectiveQueryPolicyKey,
  claudeFileChangeText,
  claudeFocusRequestedPanePlugin,
  claudeForkedSkillToolUseId,
  claudeFrameToolUseIds,
  claudeLiveSelectionFlagSettings,
  claudeMcpCallToolResult,
  claudeMcpElicitationAcceptance,
  claudeMcpQueryOverrides,
  claudeMcpServerPrefixOverlaps,
  claudeMcpToolForApps,
  claudeMessageInputTokens,
  claudeNativeToolInputFromRecord,
  claudeNativeToolInputFromUnknown,
  claudeNativeToolInputValue,
  claudeNativeToolOutputText,
  claudeNativeToolOutputValue,
  claudePendingBackgroundTask,
  claudePendingBackgroundTasksFromRoster,
  claudeProcessExitFailure,
  claudePromptLifecycle,
  claudeProposedPlan,
  claudeProviderTurnTokenUsage,
  claudeQueryEnvironment,
  claudeRewrittenVersion,
  claudeRulesMayCoverMcpTools,
  claudeRuntimeQueryPolicyForRuntimePolicy,
  claudeSdkLaunchArgSettings,
  claudeSdkUserInputAnswers,
  claudeSettledSubagentToolUseIds,
  claudeSubagentModelSelection,
  claudeSubagentResultText,
  claudeSupportsMcpApps,
  claudeTaskField,
  claudeTaskSteps,
  claudeTaskTypeFromSdkMessage,
  claudeTodoSteps,
  claudeToolNonExecutionKind,
  claudeToolPresentationsFromAssistantMessage,
  claudeToolResultBlocksFromAssistantMessage,
  claudeToolResultBlocksFromUserMessage,
  claudeToolResultEntriesFromMessage,
  claudeToolResultSettlesSubagent,
  claudeToolSearchOverride,
  claudeToolUseBlocksFromAssistantMessage,
  claudeTranscriptHasUnseenMessages,
  claudeUsageLimitResetAt,
  claudeUserInputQuestions,
  claudeWakeBufferDetail,
  claudeWritesUpdatesAsThinking,
  commandInputFromClaudeTool,
  decodeClaudeCompactSettings,
  decodeClaudeCompactWindow,
  decodeClaudeEnvSettings,
  decodeClaudePromptCacheTtl,
  decodeClaudeSubagentCacheSettings,
  describeClaudeUsageLimit,
  fileNameFromClaudeTool,
  findClaudeMcpTool,
  firstStringInputField,
  getNativeConversationHeadId,
  getNativeThreadId,
  inputRecordValue,
  isClaudeActiveSteeringAbortResult,
  isClaudeBackgroundTasksChangedMessage,
  isClaudeBlockedAssistantRateLimit,
  isClaudeConversationLine,
  isClaudeConversationNotFound,
  isClaudeEmptyTaskNotificationSuccess,
  isClaudeEnvTruthy,
  isClaudeGoalAcknowledgement,
  isClaudeLocalCommandEcho,
  isClaudeNonSubagentTask,
  isClaudePromptEchoGatedFrame,
  isClaudePromptUuid,
  isClaudeProviderContinuationTurn,
  isClaudeResultForOtherTurn,
  isClaudeRootTurnFrame,
  isClaudeSleepTimer,
  isClaudeTaskNotificationOriginResult,
  isClaudeToolResultError,
  isClaudeTranscriptConversationLine,
  isClaudeTranscriptTurnEnd,
  isClaudeTurnStartMessage,
  isProviderAdapterRollbackThreadError,
  isProviderAdapterRuntimeRequestResponseError,
  joinFallbackText,
  makeClaudeAttachmentBudget,
  makeClaudeQueryOptions,
  makeClaudeUserMessageWithAttachments,
  makeProviderThread,
  mergeClaudeStreamUsage,
  nextClaudeGoal,
  normalizeClaudeResultText,
  normalizeClaudeSessionTitle,
  optionalClaudeUsageTokenCount,
  parentToolUseIdFromSdkMessage,
  parseClaudeBackgroundTaskEntry,
  permissionModeForClaudeRuntimePolicy,
  permissionResultFromDecision,
  providerFailureFromApiRetry,
  providerFailureFromResult,
  providerGoalsEqual,
  providerRequestKindFromClaudeTool,
  providerSession,
  queryRunnerError,
  readClaudeAppendSystemPromptFile,
  readClaudeLaunchArgSettings,
  readClaudeTaskList,
  rememberClaudeSubagentLaunch,
  rememberPendingClaudeSubagentLaunch,
  requiresClaudeApproval,
  reserveClaudePdfBudget,
  resolveClaudeForkUpToMessageId,
  resolveClaudeModeAvailability,
  resolveClaudeRollbackResumeSessionAt,
  resultTextFromSdkMessage,
  sandboxPolicyKindForClaudeRuntimePolicy,
  summarizeClaudeToolRequest,
  terminalStatusFromResult,
  textFromClaudeContent,
  toolNameFromClaudeToolResult,
  unseenClaudeAppContext,
  webSearchPatternsFromClaudeTool,
  webSearchResultsFromClaudeOutput,
  withClaudeAppContext,
  withoutForgedMcpApp,
  withoutTrailingHighSurrogate,
} from "./ClaudeAdapterV2.helpers.ts";
// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindRuntime = (ctx: any) => {
  const {
    activeTurn,
    adapterOptions,
    addTaskIdsToNativeThreadSet,
    appliedSessionTitles,
    applySelectionLive,
    applySessionTitle,
    awaitedBackgroundTasksByNativeThread,
    call,
    claudeContextWindow,
    claudeTranscriptState,
    clearTaskIdFromNativeThreadSet,
    closeLiveQueryForNativeThread,
    deliveredAppContext,
    emitRosterUpdate,
    events,
    idAllocator,
    input,
    interruptTurn,
    liveProcessRunsBackgroundWork,
    liveQueryForThread,
    mcpAppServerStatuses,
    messages,
    missingNativeThreads,
    nativeId,
    openedNativeThreads,
    pendingBackgroundTasksByNativeThread,
    pendingRuntimeRequests,
    queryContext,
    queryRunner,
    read,
    rememberProviderThread,
    rosterForNativeThread,
    routedCatalogFor,
    scheduledWakeupsByNativeThread,
    sdkMessageLock,
    session,
    sessionSubagentsByTaskId,
    start,
    startTurn,
    steerTurn,
    subagentStopOutcomes,
    wakeBuffers,
    workflowStopRequestedAt,
  } = pickScriptcBindCtx(ctx);
  return {
    instanceId: adapterOptions.instanceId,
    driver: CLAUDE_PROVIDER,
    providerSessionId: input.providerSessionId,
    providerSession: session,
    getModelContextWindow: (selection) => claudeContextWindow(selection) ?? undefined,
    events: Stream.fromEffectRepeat(Queue.take(events)),
    backgroundTasksEndWithProcess: true,
    hasPendingBackgroundWork: Effect.gen(function* () {
      // A wakeup can be up to an hour out, past the idle timeout, and dies with the process.
      if (scheduledWakeupsByNativeThread.size > 0) {
        return true;
      }
      for (const roster of (yield* Ref.get(pendingBackgroundTasksByNativeThread)).values()) {
        if (roster.size > 0) {
          return true;
        }
      }
      for (const subagent of (yield* Ref.get(sessionSubagentsByTaskId)).values()) {
        if (subagent.task.status === "running") {
          return true;
        }
      }
      const buffers = yield* Ref.get(wakeBuffers);
      for (const entry of buffers.values()) {
        if (
          entry.messages.some(
            (message) =>
              message.type === "user" || message.type === "assistant" || message.type === "result",
          )
        ) {
          return true;
        }
      }
      return false;
    }),
    // Untraced: the run's event stream calls this once per provider event.
    hasPendingBackgroundWorkForThread: Effect.fnUntraced(function* (providerThread, options) {
      const nativeThreadId = providerThread.nativeThreadRef?.nativeId;
      if (nativeThreadId === undefined || nativeThreadId === null) {
        return false;
      }
      if (options?.includeSubagents) {
        const live = yield* Ref.get(queryContext);
        if (
          live?.nativeThreadId === nativeThreadId &&
          !live.stopping &&
          (yield* liveProcessRunsBackgroundWork(live))
        )
          return true;
      }
      return (
        rosterForNativeThread(yield* Ref.get(pendingBackgroundTasksByNativeThread), nativeThreadId)
          .size > 0
      );
    }),
    ensureThread: Effect.fn("ClaudeAdapterV2.ensureThread")(
      function* (threadInput: ProviderAdapter.ProviderAdapterV2EnsureThreadInput) {
        const createdAt = yield* DateTime.now;
        const nativeThreadId = yield* queryRunner.allocateSessionId;
        if (threadInput.title !== undefined) {
          appliedSessionTitles.set(nativeThreadId, threadInput.title);
        }
        const providerThread = makeProviderThread({
          idAllocator,
          providerInstanceId: adapterOptions.instanceId,
          appThreadId: threadInput.threadId,
          providerSessionId: input.providerSessionId,
          nativeThreadId,
          ...(threadInput.title !== undefined
            ? { nativeMetadata: { title: normalizeClaudeSessionTitle(threadInput.title) } }
            : {}),
          now: createdAt,
        });
        yield* rememberProviderThread(providerThread);
        return providerThread;
      },
      (effect, threadInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterEnsureThreadError({
                driver: CLAUDE_PROVIDER,
                threadId: threadInput.threadId,
                cause,
              }),
          ),
        ),
    ),
    resumeThread: Effect.fn("ClaudeAdapterV2.resumeThread")(
      function* (threadInput: {
        readonly providerThread: OrchestrationV2ProviderThread;
        readonly importedNativeSession?: boolean;
      }) {
        const nativeThreadId = threadInput.providerThread.nativeThreadRef?.nativeId;
        if (nativeThreadId !== undefined && nativeThreadId !== null) {
          const recordedTitle = threadInput.providerThread.nativeMetadata?.title;
          if (recordedTitle !== undefined && recordedTitle !== null) {
            appliedSessionTitles.set(nativeThreadId, recordedTitle);
          }
        }
        if (
          nativeThreadId !== undefined &&
          nativeThreadId !== null &&
          // A live process holds the conversation even before saving it.
          (yield* Ref.get(queryContext))?.nativeThreadId !== nativeThreadId
        ) {
          if (missingNativeThreads.has(nativeThreadId)) {
            return yield* new ProviderAdapter.ProviderAdapterProtocolError({
              driver: CLAUDE_PROVIDER,
              detail: `Claude Code has no conversation ${nativeThreadId} to resume.`,
            });
          }
          // An unreadable transcript leaves the resume to the CLI.
          const transcript = yield* claudeTranscriptState(nativeThreadId).pipe(
            Effect.orElseSucceed(() => "missing" as const),
          );
          // Opening a missing imported session would start an empty one under its id.
          if (
            transcript === "empty" ||
            (transcript === "missing" && threadInput.importedNativeSession === true)
          ) {
            return yield* new ProviderAdapter.ProviderAdapterProtocolError({
              driver: CLAUDE_PROVIDER,
              detail: `Claude session ${nativeThreadId} has no conversation to resume.`,
            });
          }
          // A session imported from the terminal has history but no T3
          // provider turns; opening it with sessionId fails "already in use".
          if (transcript === "conversation") {
            yield* Ref.update(openedNativeThreads, (current) =>
              current.has(nativeThreadId) ? current : new Set(current).add(nativeThreadId),
            );
          }
        }
        const updatedAt = yield* DateTime.now;
        const appliedTitle =
          nativeThreadId !== undefined && nativeThreadId !== null
            ? appliedSessionTitles.get(nativeThreadId)
            : undefined;
        const providerThread: OrchestrationV2ProviderThread = {
          ...threadInput.providerThread,
          providerSessionId: input.providerSessionId,
          status: "idle" as const,
          ...(appliedTitle !== undefined
            ? {
                nativeMetadata: {
                  ...threadInput.providerThread.nativeMetadata,
                  title: normalizeClaudeSessionTitle(appliedTitle),
                },
              }
            : {}),
          updatedAt,
        };
        yield* rememberProviderThread(providerThread);
        return providerThread;
      },
      (effect, threadInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterResumeThreadError({
                driver: CLAUDE_PROVIDER,
                providerSessionId: input.providerSessionId,
                providerThreadId: threadInput.providerThread.id,
                cause,
              }),
          ),
        ),
    ),
    resumeTurn: (input) => startTurn(ProviderAdapter.resumeTurnInput(input)),
    startTurn,
    compactThread: (turnInput) =>
      startTurn({
        ...turnInput,
        message: { ...turnInput.message, text: "/compact" },
      }),
    steerTurn,
    mcpApps: {
      listTools: Effect.fn("ClaudeAdapterV2.listMcpTools")(function* ({ providerThread, server }) {
        const { liveQuery, statuses } = yield* mcpAppServerStatuses(providerThread, server);
        const status = statuses.find((candidate) => candidate.name === server);
        const rules = yield* liveQuery.query.listPermissionRules.pipe(
          Effect.orElseSucceed(() => null),
        );
        return (status?.tools ?? []).map((tool) => claudeMcpToolForApps(tool, rules));
      }),
      callTool: Effect.fn("ClaudeAdapterV2.callMcpTool")(function* (call) {
        const { liveQuery, statuses } = yield* mcpAppServerStatuses(
          call.providerThread,
          call.server,
        );
        const tool = claudeMcpToolName(call.server, call.tool);
        const sameName = (
          statuses.find((status) => status.name === call.server)?.tools ?? []
        ).filter((candidate) => claudeMcpToolName(call.server, candidate.name) === tool);
        // `refresh.weather` and `refresh_weather` reach Claude as one name, so the checked tool may not be the one run.
        if (sameName.length > 1) {
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver: CLAUDE_PROVIDER,
            detail: "Another tool on this MCP server has the same Claude tool name.",
          });
        }
        // mcp_call skips Claude's permission check, so its deny rules are applied here.
        const rules = yield* liveQuery.query.listPermissionRules.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterProtocolError({
                driver: CLAUDE_PROVIDER,
                detail: `Claude's permission rules could not be read, so ${tool} was not called.`,
                cause,
              }),
          ),
        );
        if (claudeRulesMayCoverMcpTools(rules, ["deny"])) {
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver: CLAUDE_PROVIDER,
            detail: `A Claude deny rule may cover ${tool}, so it was not called.`,
          });
        }
        return claudeMcpCallToolResult(
          yield* liveQuery.query
            .callMcpTool({
              tool,
              arguments: call.arguments,
            })
            .pipe(
              Effect.mapError(
                (cause) =>
                  new ProviderAdapter.ProviderAdapterProtocolError({
                    driver: CLAUDE_PROVIDER,
                    detail: "Claude MCP tool call failed.",
                    cause,
                  }),
              ),
            ),
        );
      }),
      readResource: Effect.fn("ClaudeAdapterV2.readMcpResource")(function* (read) {
        const { liveQuery } = yield* mcpAppServerStatuses(read.providerThread, read.server);
        return yield* liveQuery.query.readMcpResource({ server: read.server, uri: read.uri }).pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterProtocolError({
                driver: CLAUDE_PROVIDER,
                detail: "Claude MCP resource read failed.",
                cause,
              }),
          ),
        );
      }),
    },
    applyModelSelection: Effect.fn("ClaudeAdapterV2.applyModelSelection")(function* ({
      providerThread,
      modelSelection,
    }) {
      const live = yield* Ref.get(queryContext);
      if (
        live === null ||
        live.stopping ||
        live.nativeThreadId !== providerThread.nativeThreadRef?.nativeId
      ) {
        return;
      }
      const selection = compileClaudeModelSelection(modelSelection, yield* routedCatalogFor(live));
      // A model change still waits for the next turn, which checks it against the turn's permission mode.
      if (
        live.selection.queryIdentity === selection.queryIdentity ||
        live.selection.apiModelId !== selection.apiModelId ||
        !canApplyClaudeSelectionLive(live.selection, selection)
      ) {
        return;
      }
      // A failed update clears the live identity, so the next turn applies the selection again.
      yield* applySelectionLive(live, selection).pipe(
        Effect.catch((cause) =>
          Effect.logWarning("orchestration-v2.claude-live-selection-failed", { cause }),
        ),
      );
    }),
    applyThreadTitle: Effect.fn("ClaudeAdapterV2.applyThreadTitle")(function* ({
      providerThread,
      title,
    }) {
      const live = yield* Ref.get(queryContext);
      if (
        live === null ||
        live.stopping ||
        live.nativeThreadId !== providerThread.nativeThreadRef?.nativeId
      ) {
        return;
      }
      yield* applySessionTitle(live.query, live.nativeThreadId, title);
    }),
    mcpSignIn: {
      start: Effect.fn("ClaudeAdapterV2.mcpSignIn.start")(function* ({ providerThread, server }) {
        const liveQuery = yield* liveQueryForThread(providerThread);
        const authorizationUrl = yield* liveQuery.query.mcpAuthenticate(server).pipe(
          Effect.mapError(
            () =>
              new ProviderMcpSignInError({
                server,
                detail: `Claude couldn't start the sign-in to ${server}.`,
              }),
          ),
        );
        return { authorizationUrl };
      }),
      complete: Effect.fn("ClaudeAdapterV2.mcpSignIn.complete")(function* ({
        providerThread,
        server,
        callbackUrl,
      }) {
        const fail = (detail: string) => new ProviderMcpSignInError({ server, detail });
        const liveQuery = yield* liveQueryForThread(providerThread);
        const statuses = yield* liveQuery.query.mcpServerStatus.pipe(
          Effect.mapError(() => fail(`Claude couldn't finish the sign-in to ${server}.`)),
        );
        // A browser on this machine may already have finished it on Claude's own page.
        if (statuses.find((status) => status.name === server)?.status === "connected") return;
        const pasted = yield* Effect.try({
          try: () => pastedUrl(callbackUrl).toString(),
          catch: () => fail("That isn't an address. Paste the whole address from your browser."),
        });
        yield* liveQuery.query
          .mcpSubmitOAuthCallbackUrl({ server, callbackUrl: pasted })
          .pipe(
            Effect.mapError(() =>
              fail(
                "Claude didn't accept that address. Paste the address your browser went to after you approved, or start again.",
              ),
            ),
          );
        // The CLI reconnects after its own callback page, but not after a pasted address.
        yield* liveQuery.query
          .reconnectMcpServer(server)
          .pipe(
            Effect.mapError(() =>
              fail(
                `Signed in, but ${server} didn't reconnect. Restart the agent session to use it.`,
              ),
            ),
          );
      }),
    },
    stopTask: Effect.fn("ClaudeAdapterV2.stopTask")(function* ({ providerThread, taskId }) {
      const liveQuery = yield* Ref.get(queryContext);
      const task = (yield* Ref.get(sessionSubagentsByTaskId)).get(taskId);
      if (
        liveQuery === null ||
        liveQuery.stopping ||
        liveQuery.nativeThreadId !== providerThread.nativeThreadRef?.nativeId ||
        task === undefined ||
        task.task.threadId !== providerThread.appThreadId ||
        task.task.workflow === undefined ||
        task.task.status !== "running" ||
        liveQuery.subagentsFromEarlierProcesses.has(task)
      ) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver: CLAUDE_PROVIDER,
          detail: "No running workflow task belongs to this provider thread",
        });
      }
      workflowStopRequestedAt.set(taskId, DateTime.toEpochMillis(yield* DateTime.now));
      yield* liveQuery.query.stopTask(taskId).pipe(
        Effect.mapError(
          (cause) =>
            new ProviderAdapter.ProviderAdapterProtocolError({
              driver: CLAUDE_PROVIDER,
              detail: "Workflow stop request failed",
              cause,
            }),
        ),
        Effect.onError(() => Effect.sync(() => workflowStopRequestedAt.delete(taskId))),
      );
    }),
    awaitBackgroundTasks: Effect.fn("ClaudeAdapterV2.awaitBackgroundTasks")(
      function* ({ providerThread, taskIds, awaited }) {
        const nativeThreadId = providerThread.nativeThreadRef?.nativeId;
        if (nativeThreadId == null) return { matched: [] };
        const roster = rosterForNativeThread(
          yield* Ref.get(pendingBackgroundTasksByNativeThread),
          nativeThreadId,
        );
        const matched = [...new Set(taskIds)].filter((taskId) => roster.has(taskId));
        if (matched.length === 0) return { matched };
        if (awaited) {
          yield* addTaskIdsToNativeThreadSet(
            awaitedBackgroundTasksByNativeThread,
            nativeThreadId,
            matched,
          );
        } else {
          for (const taskId of matched) {
            yield* clearTaskIdFromNativeThreadSet(
              awaitedBackgroundTasksByNativeThread,
              nativeThreadId,
              taskId,
            );
          }
        }
        const active = yield* Ref.get(activeTurn);
        yield* emitRosterUpdate(
          nativeThreadId,
          active?.nativeThreadId === nativeThreadId ? active : null,
        );
        return { matched };
      },
      (effect) => sdkMessageLock.withPermits(1)(effect),
    ),
    interruptTurn,
    stopSubagent: Effect.fn("ClaudeAdapterV2.stopSubagent")(function* (input) {
      const existing = yield* Ref.get(queryContext);
      const nativeThreadId = input.providerThread.nativeThreadRef?.nativeId;
      const subagent = (yield* Ref.get(sessionSubagentsByTaskId)).get(input.nativeTaskId);
      if (subagent?.task.threadId !== input.providerThread.appThreadId) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver: CLAUDE_PROVIDER,
          detail: "Claude subagent has no known owning task to confirm its outcome.",
        });
      }
      if (
        input.requestedAt !== undefined &&
        subagent.task.startedAt !== null &&
        DateTime.toEpochMillis(subagent.task.startedAt) > DateTime.toEpochMillis(input.requestedAt)
      )
        return;
      const confirmed = subagent.confirmedOutcome;
      if (confirmed !== undefined) return confirmed;
      if (
        existing === null ||
        existing.nativeThreadId !== nativeThreadId ||
        existing.subagentsFromEarlierProcesses.has(subagent)
      ) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver: CLAUDE_PROVIDER,
          detail: "Claude subagent has no live owning query with task stopping support.",
        });
      }
      const outcome =
        subagentStopOutcomes.get(input.nativeTaskId) ??
        (yield* Deferred.make<ProviderAdapter.ProviderAdapterV2SubagentOutcome>());
      subagentStopOutcomes.set(input.nativeTaskId, outcome);
      const recorded = (yield* Ref.get(sessionSubagentsByTaskId)).get(input.nativeTaskId);
      if (
        recorded?.task.startedAt === subagent.task.startedAt &&
        recorded.confirmedOutcome !== undefined
      ) {
        if (subagentStopOutcomes.get(input.nativeTaskId) === outcome)
          subagentStopOutcomes.delete(input.nativeTaskId);
        return recorded.confirmedOutcome;
      }
      const confirmedOutcome = yield* existing.query.stopTask(input.nativeTaskId).pipe(
        Effect.andThen(Deferred.await(outcome)),
        Effect.timeout("2 seconds"),
        Effect.mapError(
          (cause) =>
            new ProviderAdapter.ProviderAdapterProtocolError({
              driver: CLAUDE_PROVIDER,
              detail: "Claude subagent Stop was not confirmed by a native outcome.",
              cause,
            }),
        ),
        Effect.ensuring(
          Effect.sync(() => {
            if (subagentStopOutcomes.get(input.nativeTaskId) === outcome)
              subagentStopOutcomes.delete(input.nativeTaskId);
          }),
        ),
      );
      const current = (yield* Ref.get(sessionSubagentsByTaskId)).get(input.nativeTaskId);
      return current?.task.startedAt === subagent.task.startedAt ? confirmedOutcome : undefined;
    }),
    respondToRuntimeRequest: Effect.fn("ClaudeAdapterV2.respondToRuntimeRequest")(
      function* (requestInput) {
        const pending = (yield* Ref.get(pendingRuntimeRequests)).get(
          String(requestInput.requestId),
        );
        if (pending === undefined) {
          return yield* new ProviderAdapter.ProviderAdapterRuntimeRequestResponseError({
            driver: CLAUDE_PROVIDER,
            requestId: requestInput.requestId,
            cause: new ProviderAdapter.ProviderAdapterProtocolError({
              driver: CLAUDE_PROVIDER,
              detail: `No pending Claude runtime request ${requestInput.requestId}.`,
            }),
          });
        }
        if (pending.type === "user_input") {
          yield* Deferred.succeed(pending.answers, requestInput.answers ?? {});
          return;
        }
        if (requestInput.decision === undefined) {
          return yield* new ProviderAdapter.ProviderAdapterRuntimeRequestResponseError({
            driver: CLAUDE_PROVIDER,
            requestId: requestInput.requestId,
            cause: new ProviderAdapter.ProviderAdapterProtocolError({
              driver: CLAUDE_PROVIDER,
              detail: `Claude ${pending.requestKind} request ${requestInput.requestId} requires an approval decision.`,
            }),
          });
        }
        yield* Deferred.succeed(pending.decision, {
          decision: requestInput.decision,
          ...(requestInput.feedback === undefined ? {} : { feedback: requestInput.feedback }),
        });
      },
      (effect, requestInput) =>
        effect.pipe(
          Effect.mapError((cause) =>
            isProviderAdapterRuntimeRequestResponseError(cause)
              ? cause
              : new ProviderAdapter.ProviderAdapterRuntimeRequestResponseError({
                  driver: CLAUDE_PROVIDER,
                  requestId: requestInput.requestId,
                  cause,
                }),
          ),
        ),
    ),
    readThreadSnapshot: (snapshotInput) =>
      Effect.fail(
        new ProviderAdapter.ProviderAdapterReadThreadSnapshotError({
          driver: CLAUDE_PROVIDER,
          providerThreadId: snapshotInput.providerThread.id,
          cause: "Claude V2 adapter does not implement snapshots.",
        }),
      ),
    rollbackThread: Effect.fn("ClaudeAdapterV2.rollbackThread")(
      function* (rollbackInput) {
        const currentTurn = yield* Ref.get(activeTurn);
        if (currentTurn !== null) {
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver: CLAUDE_PROVIDER,
            detail: `Cannot roll back Claude provider thread ${rollbackInput.providerThread.id} while provider turn ${currentTurn.providerTurnId} is active.`,
          });
        }

        const nativeThreadId = yield* getNativeThreadId(rollbackInput.providerThread);
        yield* closeLiveQueryForNativeThread(nativeThreadId);
        // The rewound history may no longer hold the turns that carried app notes.
        deliveredAppContext.set(nativeThreadId, new Map());
        const now = yield* DateTime.now;
        const resumeSessionAt = yield* resolveClaudeRollbackResumeSessionAt(rollbackInput);

        if (rollbackInput.target.type === "thread_start" && resumeSessionAt === null) {
          const resetNativeThreadId = yield* queryRunner.allocateSessionId;
          return {
            providerThread: {
              ...makeProviderThread({
                idAllocator,
                providerInstanceId: adapterOptions.instanceId,
                appThreadId: rollbackInput.providerThread.appThreadId,
                ...(rollbackInput.providerThread.ownerNodeId === null
                  ? {}
                  : { ownerNodeId: rollbackInput.providerThread.ownerNodeId }),
                providerSessionId: input.providerSessionId,
                nativeThreadId: resetNativeThreadId,
                ...(rollbackInput.providerThread.forkedFrom === null
                  ? {}
                  : { forkedFrom: rollbackInput.providerThread.forkedFrom }),
                now,
              }),
              handoffIds: rollbackInput.providerThread.handoffIds,
            },
            messages: [],
            runtimeRequests: [],
          };
        }

        const { claudeDeliveredAppContext: _delivered, ...nativeMetadata } =
          rollbackInput.providerThread.nativeMetadata ?? {};
        return {
          providerThread: {
            ...rollbackInput.providerThread,
            ...(rollbackInput.providerThread.nativeMetadata === null ? {} : { nativeMetadata }),
            providerSessionId: input.providerSessionId,
            nativeConversationHeadRef:
              resumeSessionAt === null
                ? null
                : {
                    driver: CLAUDE_PROVIDER,
                    nativeId: resumeSessionAt,
                    strength: "weak" as const,
                  },
            status: "idle" as const,
            lastRunOrdinal: rollbackInput.target.appRunOrdinal,
            updatedAt: now,
          },
          messages: [],
          runtimeRequests: [],
        };
      },
      (effect, rollbackInput) =>
        effect.pipe(
          Effect.mapError((cause) =>
            isProviderAdapterRollbackThreadError(cause)
              ? cause
              : new ProviderAdapter.ProviderAdapterRollbackThreadError({
                  driver: CLAUDE_PROVIDER,
                  providerThreadId: rollbackInput.providerThread.id,
                  cause,
                }),
          ),
        ),
    ),
    forkThread: Effect.fn("ClaudeAdapterV2.forkThread")(
      function* (forkInput) {
        const currentTurn = yield* Ref.get(activeTurn);
        if (currentTurn !== null) {
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver: CLAUDE_PROVIDER,
            detail: `Cannot fork Claude provider thread ${forkInput.sourceProviderThread.id} while provider turn ${currentTurn.providerTurnId} is active.`,
          });
        }

        const sourceNativeThreadId = yield* getNativeThreadId(forkInput.sourceProviderThread);
        yield* closeLiveQueryForNativeThread(sourceNativeThreadId);
        const upToMessageId = yield* resolveClaudeForkUpToMessageId(forkInput);
        // A moved project still has its transcript under the original cwd.
        // Let the SDK find the session by ID within this Claude home.
        const forkOptions: ForkSessionOptions =
          upToMessageId === undefined ? {} : { upToMessageId };
        const forked = yield* queryRunner.forkSession({
          sessionId: sourceNativeThreadId,
          options: forkOptions,
          environment: adapterOptions.environment,
          threadId: forkInput.targetThreadId,
          providerSessionId: input.providerSessionId,
        });
        yield* Ref.update(openedNativeThreads, (current) => {
          const updated = new Set(current);
          updated.add(forked.sessionId);
          return updated;
        });
        const now = yield* DateTime.now;
        // Native forks retain document/image history. Inherit full current
        // usage even at an earlier fork point; this is conservative.
        const claudeAttachmentBudget =
          forkInput.sourceProviderThread.nativeMetadata?.claudeAttachmentBudget;
        return makeProviderThread({
          idAllocator,
          providerInstanceId: adapterOptions.instanceId,
          appThreadId: forkInput.targetThreadId,
          ownerNodeId: forkInput.ownerNodeId ?? null,
          providerSessionId: input.providerSessionId,
          nativeThreadId: forked.sessionId,
          forkedFrom: {
            providerThreadId: forkInput.sourceProviderThread.id,
            ...(forkInput.providerTurnId === undefined
              ? {}
              : { providerTurnId: forkInput.providerTurnId }),
          },
          ...(forked.headMessageId === undefined && claudeAttachmentBudget === undefined
            ? {}
            : {
                nativeMetadata: {
                  ...(forked.headMessageId === undefined
                    ? {}
                    : { forkHeadMessageId: forked.headMessageId }),
                  ...(claudeAttachmentBudget === undefined ? {} : { claudeAttachmentBudget }),
                },
              }),
          now,
        });
      },
      (effect, forkInput) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterForkThreadError({
                driver: CLAUDE_PROVIDER,
                providerThreadId: forkInput.sourceProviderThread.id,
                cause,
              }),
          ),
        ),
    ),
  };
};
