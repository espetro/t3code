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
import {
  bindHandleSdkMessageFrame,
  bindOpenQuery,
  bindUpdateClaudeSubagentNode,
  bindFinalizeActiveTurn,
  bindProjectClaudeWorkflowMembers,
  bindCanUseToolEffect,
  bindOnElicitationEffect,
  bindBufferWakeMessage,
  bindStartTurn,
  bindBuildToolCallArtifacts,
  bindSteerTurn,
  bindHandleSdkMessage,
  bindEmitClaudePlanProjection,
  bindApplyBackgroundTaskRosterMessage,
  bindBuildApprovalRequestArtifacts,
  bindInterruptTurn,
  bindResetBackgroundTaskStateForNativeThreadProcess,
  bindOnUserDialog,
  bindFollowForkedSkillTranscript,
  bindRecoverResumedClaudeSubagent,
  bindRuntime,
} from "./claudeAdapterSplits.ts";
export {
  CLAUDE_DEFAULT_INSTANCE_ID,
  CLAUDE_PROVIDER,
  CLAUDE_QUERY_ENDED_BEFORE_TURN_DETAIL,
  CLAUDE_READ_ONLY_ALLOWED_TOOLS,
  CLAUDE_READ_ONLY_T3_MCP_ALLOWED_TOOLS,
  CLAUDE_T3_MCP_TOOL_TIMEOUT_MS,
  CLAUDE_T3_MCP_TOOL_WILDCARD,
  ClaudeAgentSdkQueryRunner,
  ClaudeAgentSdkQueryRunnerError,
  ClaudeAppendSystemPromptFileError,
  ClaudeAppendSystemPromptMissingValueError,
  ClaudeBackgroundWorkBlocksQueryReplacementError,
  ClaudeCodeRootRefusalError,
  ClaudeCodeStartupExitError,
  ClaudeConversationNotFoundError,
  ClaudeProviderCapabilitiesV2,
  ClaudeSettingsLaunchArgError,
  awaitClaudeApprovalDecision,
  claudeApprovalPresentation,
  claudeAutoModeUnavailableNotice,
  claudeEffectiveQueryPolicyKey,
  claudeHistoryEndsOnFailedRequest,
  claudeMcpElicitationAcceptance,
  claudeMcpQueryOverrides,
  claudeProviderTurnTokenUsage,
  claudeQueryEnvironment,
  claudeQueryMessages,
  claudeResumeSessionAt,
  claudeRuntimeQueryPolicyForRuntimePolicy,
  claudeSdkUserInputAnswers,
  claudeToolSearchOverride,
  claudeUserInputQuestions,
  isClaudePromptUuid,
  layerQueryRunner,
  loggedClaudeQueryOptions,
  makeClaudeDescendantPoll,
  makeClaudeQueryOptions,
  makeClaudeUserMessage,
  permissionResultFromDecision,
  readClaudeLaunchArgSettings,
  resolveClaudeModeAvailability,
  spawnClaudeProcessGroup,
  withoutClaudeCanUseToolShadowedWarning,
} from "./ClaudeAdapterV2.helpers.ts";
export type {
  ActiveClaudeProviderRetry,
  ActiveClaudeSubagent,
  ActiveClaudeToolCall,
  ActiveClaudeTurnContext,
  ClaudeAdapterV2Options,
  ClaudeAgentSdkLoggedQueryOptions,
  ClaudeAgentSdkProtocolLogEvent,
  ClaudeAgentSdkProtocolLogger,
  ClaudeAgentSdkQueryOpenInput,
  ClaudeAgentSdkQueryOptions,
  ClaudeAgentSdkQueryPresetTools,
  ClaudeAgentSdkQueryRunnerShape,
  ClaudeAgentSdkQuerySession,
  ClaudeAgentSdkQueryToolList,
  ClaudeAgentSdkQueryTools,
  ClaudeAgentSdkSessionForkInput,
  ClaudeAgentSdkSubagentLookupInput,
  ClaudeApprovalResponse,
  ClaudeLiveQueryContext,
  ClaudeMessageUsage,
  ClaudePermissionRule,
  ClaudeQueryStreamExit,
  ClaudeRuntimeQueryPolicy,
  ClaudeSubagentProjectionTarget,
} from "./ClaudeAdapterV2.helpers.ts";

export const makeClaudeAdapterV2 = Effect.fn("makeClaudeAdapterV2")(function* (
  adapterOptions: ClaudeAdapterV2Options,
) {
  const mcpSessions = yield* McpProviderSessions.McpProviderSessions;
  // `onElicitation` shows T3 Code's own requests and passes on the person's answer to each.
  yield* mcpSessions.showsApprovalRequests(adapterOptions.instanceId);
  const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
  const serverSettings = yield* Effect.serviceOption(ServerSettings.ServerSettingsService);
  const { attachmentsDir, fileSystem, path, random, idAllocator, queryRunner } = adapterOptions;
  const loadModelCatalog = (
    adapterOptions.modelCatalog ?? Effect.succeed(BUNDLED_CLAUDE_MODEL_CATALOG)
  ).pipe(
    Effect.map((catalog) => scopeClaudeModelCatalog(catalog, adapterOptions.settings.customModels)),
  );
  // Reloaded at each turn and steer so downloaded manifest updates apply without a release.
  let modelCatalog = yield* loadModelCatalog;
  // Results report the window Claude Code compacts against; outside the catalog it is the only source.
  const reportedContextWindows = new Map<string, number>();
  const claudeContextWindow = (modelSelection: ModelSelection): number | null =>
    resolveClaudeCatalogContextWindowTokens(modelCatalog, modelSelection) ??
    reportedContextWindows.get(
      compileClaudeModelSelection(modelSelection, modelCatalog).apiModelId,
    ) ??
    null;
  const continuationRequests = adapterOptions.continuationRequests ?? {
    offer: () => Effect.void,
  };
  const homePath = yield* resolveClaudeHomePath(
    adapterOptions.settings,
    adapterOptions.environment,
  ).pipe(Effect.provideService(Path.Path, path));
  const hostEnvironment = yield* HostProcess.Environment;
  const hostPlatform = yield* HostProcess.Platform;
  const customHome =
    adapterOptions.settings.homePath.trim().length > 0 ||
    adapterOptions.environment.CLAUDE_CONFIG_DIR !== hostEnvironment.CLAUDE_CONFIG_DIR;
  const announcedBypassDowngrades = new Set<ThreadId>();
  // Native session ids, so a resumed session does not repeat its notice.
  const announcedAutoFallbacks = new Set<string>();
  const resolveBypassAvailability = (cwd: string | null) =>
    resolveClaudeModeAvailability({
      settings: adapterOptions.settings,
      homePath,
      customHome,
      cwd,
      fileSystem,
      path,
    });
  const routeModelCatalog = adapterOptions.routeModelCatalog ?? Effect.succeed;

  // Claude Code's own subagent TTL setting, in its precedence order. Unset or unreadable means
  // Anthropic's default applies.
  const resolveSubagentPromptCacheTtl = Effect.fn("ClaudeAdapterV2.resolveSubagentPromptCacheTtl")(
    function* (cwd: string | null) {
      const fromEnvironment = decodeClaudePromptCacheTtl(
        adapterOptions.environment.CLAUDE_CODE_SUBAGENT_PROMPT_CACHE_TTL,
      );
      if (Option.isSome(fromEnvironment)) return fromEnvironment.value;
      const resolved = yield* Effect.tryPromise({
        try: () =>
          resolveClaudeSettings({
            ...(cwd === null ? {} : { cwd }),
            settingSources: customHome ? ["project", "local"] : ["user", "project", "local"],
          }),
        catch: (cause) => queryRunnerError(cause, "resolveSettings"),
      }).pipe(Effect.orElseSucceed(() => undefined));
      const home = customHome
        ? yield* fileSystem.readFileString(path.join(homePath, "settings.json")).pipe(
            Effect.flatMap(decodeClaudeSubagentCacheSettings),
            Effect.orElseSucceed(() => ({ subagentPromptCacheTtl: undefined })),
          )
        : undefined;
      return resolved?.effective.subagentPromptCacheTtl ?? home?.subagentPromptCacheTtl;
    },
  );

  const readSettingsEnv = (filePath: string, name: string) =>
    fileSystem.readFileString(filePath).pipe(
      Effect.flatMap(decodeClaudeEnvSettings),
      Effect.map((settings) => {
        const value = settings.env?.[name];
        return typeof value === "string" ? value : undefined;
      }),
      Effect.orElseSucceed(() => undefined),
    );
  const settingsFilesByPrecedence = Effect.fn("ClaudeAdapterV2.settingsFilesByPrecedence")(
    function* (cwd: string | null) {
      const localDirectory =
        cwd === null
          ? null
          : yield* claudeLocalSettingsDirectory(cwd).pipe(
              Effect.provideService(FileSystem.FileSystem, fileSystem),
              Effect.provideService(Path.Path, path),
            );
      return [
        ...(cwd === null || localDirectory === null
          ? []
          : [
              path.join(localDirectory, ".claude", "settings.local.json"),
              ...(localDirectory === cwd ? [] : [path.join(cwd, ".claude", "settings.local.json")]),
              path.join(cwd, ".claude", "settings.json"),
            ]),
        path.join(homePath, "settings.json"),
      ];
    },
  );
  // Settings env beats the process env, --settings over local over project over user, and a local
  // file an older Claude Code left in cwd applies under the root one. resolveSettings reads local
  // from cwd only.
  const resolveClaudeEnv = Effect.fn("ClaudeAdapterV2.resolveClaudeEnv")(function* (
    cwd: string | null,
    launchArgSettings: ClaudeSdkSettings | undefined,
    name: string,
  ) {
    const launchValue = launchArgSettings?.env?.[name];
    if (typeof launchValue === "string") return launchValue;
    for (const settingsFile of yield* settingsFilesByPrecedence(cwd)) {
      const value = yield* readSettingsEnv(settingsFile, name);
      if (value !== undefined) return value;
    }
    return adapterOptions.environment[name];
  });
  const resolveToolSearchOverride = (
    cwd: string | null,
    launchArgSettings: ClaudeSdkSettings | undefined,
  ) =>
    resolveClaudeEnv(cwd, launchArgSettings, "ENABLE_TOOL_SEARCH").pipe(
      Effect.map(claudeToolSearchOverride),
    );

  const resolveAutoCompactWindow = Effect.fn("ClaudeAdapterV2.resolveAutoCompactWindow")(function* (
    cwd: string | null,
    modelSelection: ModelSelection,
    launchArgSettings: ClaudeSdkSettings | undefined,
  ) {
    // With auto-compaction off Claude never compacts, so there is no threshold to report.
    for (const name of ["DISABLE_COMPACT", "DISABLE_AUTO_COMPACT"]) {
      const value = yield* resolveClaudeEnv(cwd, launchArgSettings, name);
      if (isClaudeEnvTruthy(value)) return "";
    }
    const launchEnabled = launchArgSettings?.autoCompactEnabled;
    let autoCompactEnabled = typeof launchEnabled === "boolean" ? launchEnabled : undefined;
    for (const settingsFile of yield* settingsFilesByPrecedence(cwd)) {
      if (autoCompactEnabled !== undefined) break;
      const settings = yield* fileSystem.readFileString(settingsFile).pipe(
        Effect.flatMap(decodeClaudeCompactSettings),
        Effect.orElseSucceed(() => undefined),
      );
      if (typeof settings?.autoCompactEnabled === "boolean") {
        autoCompactEnabled = settings.autoCompactEnabled;
      }
    }
    if (autoCompactEnabled === false) return "";
    if (adapterOptions.settings.autoCompactWindow !== "")
      return adapterOptions.settings.autoCompactWindow;
    const validWindow = (value: unknown) => {
      const selected = Option.getOrUndefined(decodeClaudeCompactWindow(value));
      return typeof selected === "number" && selected >= 100_000 && selected <= 1_000_000
        ? String(selected)
        : undefined;
    };
    // Claude gives CLAUDE_CODE_AUTO_COMPACT_WINDOW precedence over the autoCompactWindow keys.
    const envValue = yield* resolveClaudeEnv(
      cwd,
      launchArgSettings,
      "CLAUDE_CODE_AUTO_COMPACT_WINDOW",
    );
    const envWindow = envValue === undefined ? undefined : validWindow(Number(envValue));
    if (envWindow !== undefined) return envWindow;
    const model = compileClaudeModelSelection(modelSelection).apiModelId.replace(/\[1m\]$/i, "");
    const windowFrom = (settings: unknown) => {
      if (typeof settings !== "object" || settings === null) return undefined;
      const models = Reflect.get(settings, "modelSettings");
      const modelSetting =
        typeof models === "object" && models !== null ? Reflect.get(models, model) : undefined;
      const modelWindow =
        typeof modelSetting === "object" && modelSetting !== null
          ? Reflect.get(modelSetting, "autoCompactWindow")
          : undefined;
      return modelWindow === "auto"
        ? ""
        : (validWindow(modelWindow) ?? validWindow(Reflect.get(settings, "autoCompactWindow")));
    };
    const launchWindow = windowFrom(launchArgSettings);
    if (launchWindow !== undefined) return launchWindow;
    for (const settingsFile of yield* settingsFilesByPrecedence(cwd)) {
      const settings = yield* fileSystem.readFileString(settingsFile).pipe(
        Effect.flatMap(decodeClaudeCompactSettings),
        Effect.orElseSucceed(() => undefined),
      );
      const value = windowFrom(settings);
      if (value !== undefined) return value;
    }
    return "";
  });

  const userInvocableSkills = (cwd: string | null) =>
    discoverClaudeSkills(
      adapterOptions.settings,
      cwd ?? undefined,
      adapterOptions.environment,
    ).pipe(
      Effect.map(
        (skills) =>
          new Map(
            skills
              .filter((skill) => skill.enabled && skill.userInvocable !== false)
              .map((skill) => [skill.name, skill]),
          ),
      ),
      Effect.provideService(FileSystem.FileSystem, fileSystem),
      Effect.provideService(Path.Path, path),
    );

  // Outlives sessions: idle release reopens one every few minutes. A connected server is forgotten,
  // so losing its sign-in later is announced again.
  const announcedMcpSignIns = new Set<string>();
  const mcpSignInKey = (nativeThreadId: string, server: string) =>
    `${nativeThreadId}\u0000${server}`;

  return ProviderAdapter.ProviderAdapterV2.of({
    instanceId: adapterOptions.instanceId,
    driver: CLAUDE_PROVIDER,
    getCapabilities: Effect.fn("ClaudeAdapterV2.getCapabilities")(function () {
      return Effect.succeed(ClaudeProviderCapabilitiesV2);
    }),
    planSelectionTransition: Effect.fn("ClaudeAdapterV2.planSelectionTransition")(function () {
      return Effect.succeed(turnScopedSelectionTransition());
    }),
    openSession: Effect.fn("ClaudeAdapterV2.openSession")(
      function* (input: ProviderAdapter.ProviderAdapterV2OpenSessionInput) {
        const promptSuggestionsEnabled = input.promptSuggestions ?? Effect.succeed(false);
        const sessionScope = yield* Effect.scope;
        const now = yield* DateTime.now;
        const session = providerSession({
          providerSessionId: input.providerSessionId,
          providerInstanceId: adapterOptions.instanceId,
          cwd: input.runtimePolicy.cwd,
          model: input.modelSelection.model,
          now,
        });
        const readProgram = yield* claudeProgramReader(
          adapterOptions.settings.binaryPath,
          adapterOptions.environment,
        );
        const events = yield* Queue.unbounded<ProviderAdapter.ProviderAdapterV2Event>();
        const activeTurn = yield* Ref.make<ActiveClaudeTurnContext | null>(null);
        const taskOutputTails = new Map<
          string,
          { readonly fiber: Fiber.Fiber<void>; readonly stop: Deferred.Deferred<void> }
        >();
        // Waits for the tail's last read so its output lands before the call settles.
        const stopTaskOutputTail = (toolUseId: string) =>
          Effect.suspend(() => {
            const tail = taskOutputTails.get(toolUseId);
            if (tail === undefined) return Effect.void;
            taskOutputTails.delete(toolUseId);
            return Deferred.succeed(tail.stop, undefined).pipe(
              Effect.andThen(Fiber.await(tail.fiber)),
              Effect.asVoid,
            );
          });
        const sdkMessageLock = yield* Semaphore.make(1);
        // Members can finish after the launching turn; retain state to emit each transition once.
        const workflowMemberStates = yield* Ref.make(
          new Map<
            string,
            {
              readonly status: OrchestrationV2Subagent["status"];
              readonly attempt: number;
              readonly transcriptReadAttempts: number;
              readonly finalTranscriptRead: boolean;
              readonly agentId: string | undefined;
              readonly transcriptCursor: WorkflowAgentTranscriptCursor;
              readonly transcriptMetadata: WorkflowAgentMetadata;
              readonly nextItemOrdinal: number;
              readonly toolCalls: Map<string, ActiveClaudeToolCall>;
              readonly textShown: boolean;
              readonly turnEnded: boolean;
              readonly resultShown: boolean;
              readonly result: string | undefined;
              readonly label: string;
              readonly prompt: string;
              readonly model: string;
              readonly createdAt: DateTime.Utc;
              readonly startedAt: DateTime.Utc | null;
              readonly completedAt: DateTime.Utc | null;
            }
          >(),
        );
        const interruptedTurns = yield* Ref.make(new Set<OrchestrationV2ProviderTurn["id"]>());
        const steeredTurns = yield* Ref.make(new Set<OrchestrationV2ProviderTurn["id"]>());
        const queryContext = yield* Ref.make<ClaudeLiveQueryContext | null>(null);
        // Wake buffers replay result frames, so ledger growth is measured once on arrival.
        const resultLedgerUsage = new WeakMap<SDKMessage, ClaudeLedgerUsage>();
        const resultsReportingNewContextWindow = new WeakSet<SDKMessage>();
        // A worktree handoff changes the project settings even within one session.
        let bypassCache: { cwd: string | null; availability: ClaudeBypassAvailability } | null =
          null;
        const queryPolicyForTurn = Effect.fnUntraced(function* (
          turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
        ) {
          if (
            permissionModeForClaudeRuntimePolicy(turnInput.runtimePolicy) !== "bypassPermissions"
          ) {
            return claudeRuntimeQueryPolicyForRuntimePolicy(turnInput.runtimePolicy);
          }
          const cwd = turnInput.runtimePolicy.cwd;
          if (bypassCache === null || bypassCache.cwd !== cwd) {
            const resolved = yield* resolveBypassAvailability(cwd).pipe(Effect.option);
            if (Option.isNone(resolved)) {
              return claudeRuntimeQueryPolicyForRuntimePolicy(turnInput.runtimePolicy, {
                bypassDisabled: true,
                autoDisabled: false,
              });
            }
            bypassCache = { cwd, availability: resolved.value };
          }
          return claudeRuntimeQueryPolicyForRuntimePolicy(
            turnInput.runtimePolicy,
            bypassCache.availability,
          );
        });
        // Claude says at init whether it runs in auto mode; settings are only one of its reasons.
        const announceAutoFallback = Effect.fnUntraced(function* (
          turn: ActiveClaudeTurnContext,
          live: ClaudeLiveQueryContext,
        ) {
          // A start-up retry runs under another id, and a later turn resumes that one.
          const nativeSessionId =
            clearedNativeSessions.get(live.nativeThreadId) ?? live.nativeThreadId;
          if (
            !live.receivedInit ||
            live.requestedPermissionMode !== "auto" ||
            live.openedPermissionMode === "auto" ||
            turn.nativeThreadId !== live.nativeThreadId ||
            isClaudeProviderContinuationTurn(turn.input) ||
            permissionModeForClaudeRuntimePolicy(turn.input.runtimePolicy) !== "auto" ||
            announcedAutoFallbacks.has(nativeSessionId)
          ) {
            return;
          }
          announcedAutoFallbacks.add(nativeSessionId);
          if (announcedAutoFallbacks.size > 1000) {
            const oldest = announcedAutoFallbacks.values().next().value;
            if (oldest !== undefined) announcedAutoFallbacks.delete(oldest);
          }
          const availability = yield* resolveBypassAvailability(turn.input.runtimePolicy.cwd).pipe(
            Effect.option,
          );
          const notice = claudeAutoModeUnavailableNotice(
            Option.getOrUndefined(availability)?.autoDisabledBy,
          );
          const nativeItemId = `auto-mode-unavailable:${turn.providerTurnId}`;
          const now = yield* DateTime.now;
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver: CLAUDE_PROVIDER,
            turnItem: {
              id: idAllocator.derive.turnItemFromProviderItem({
                driver: CLAUDE_PROVIDER,
                nativeItemId,
              }),
              threadId: turn.input.threadId,
              runId: turn.input.runId,
              nodeId: turn.input.rootNodeId,
              providerThreadId: turn.input.providerThread.id,
              providerTurnId: turn.providerTurnId,
              nativeItemRef: {
                driver: CLAUDE_PROVIDER,
                nativeId: nativeItemId,
                strength: "weak",
              },
              parentItemId: null,
              ordinal: yield* resolveItemOrdinal(turn, nativeItemId),
              type: "system_notice",
              status: "completed",
              title: notice,
              message: notice,
              startedAt: now,
              completedAt: now,
              updatedAt: now,
            },
          });
        });
        const openedNativeThreads = yield* Ref.make(new Set<string>());
        // Sessions Claude Code reported gone on resume; resumeThread fails them into a fresh session.
        const missingNativeThreads = new Set<string>();
        const pdfBudgets = new Map<string, ReturnType<typeof makeClaudeAttachmentBudget>>();
        // Digests of MCP app notes already in each native session's history, by key. Cleared when it
        // compacts; persisted in native metadata so a restarted server does not resend them.
        const deliveredAppContext = new Map<string, ReadonlyMap<string, string>>();
        const latestPlanByKind = yield* Ref.make(new Map<string, OrchestrationV2PlanArtifact>());
        // Claude 5 task tools edit one list per native session, across turns.
        const taskListsByNativeThread = yield* Ref.make(
          new Map<string, ClaudeTaskList | undefined>(),
        );
        const providerRetries = yield* Ref.make(
          new Map<OrchestrationV2ProviderTurn["id"], ActiveClaudeProviderRetry>(),
        );
        const pendingRuntimeRequests = yield* Ref.make(
          new Map<string, PendingClaudeRuntimeRequest>(),
        );
        const mcpElicitationSessionGrants = yield* Ref.make(new Set<string>());
        // Background local_bash tasks can trigger wake turns on the query stream with no active provider turn.
        const lastTurnRouteByNativeThread = yield* Ref.make(
          new Map<
            string,
            { readonly threadId: ThreadId; readonly providerThreadId: ProviderThreadId }
          >(),
        );
        const pendingBackgroundTasksByNativeThread = yield* Ref.make(
          new Map<string, Map<string, OrchestrationV2PendingBackgroundTask>>(),
        );
        // Survives roster REPLACE levels, which rebuild every entry without the agent's mark.
        const awaitedBackgroundTasksByNativeThread = yield* Ref.make(
          new Map<string, Set<string>>(),
        );
        // Wake eligibility is separate from the Waiting roster. It survives empty
        // background_tasks_changed levels (SDK: empty level can precede task_notification) and
        // is consumed when the first idle notification is buffered/offered so duplicates cannot
        // re-buffer.
        const wakeEligibleBackgroundTasksByNativeThread = yield* Ref.make(
          new Map<string, Set<string>>(),
        );
        const opaqueBackgroundTaskReplayTombstonesByNativeThread = yield* Ref.make(
          new Map<string, Set<string>>(),
        );
        const lastProviderThreadByNativeThread = yield* Ref.make(
          new Map<string, OrchestrationV2ProviderThread>(),
        );
        const goalsByNativeThread = new Map<string, OrchestrationV2ProviderGoal | null>();
        // The title T3 last applied to each native session, so a turn renames it only when the
        // thread title changed. A native `/rename` T3 never applied survives later turns.
        const appliedSessionTitles = new Map<string, string>();
        const goalCheckedTurns = new Set<string>();
        // Background subagents can finish after root settlement; retain their registry for wake evidence and hydration.
        const sessionSubagentsByTaskId = yield* Ref.make(new Map<string, ActiveClaudeSubagent>());
        const sessionSubagentTaskIdsByToolUseId = yield* Ref.make(new Map<string, string>());
        // Claude may never answer a background move; later steers must wait on the same request.
        const backgroundMovesByToolUseId = new Map<string, Fiber.Fiber<void>>();
        const subagentToolCalls = new Map<string, ActiveClaudeToolCall>();
        const pendingSubagentLaunchesByToolUseId = new Map<string, PendingClaudeSubagentLaunch>();
        const settledTurnByNativeThread = new Map<string, ActiveClaudeTurnContext>();
        const subagentStopOutcomes = new Map<
          string,
          Deferred.Deferred<ProviderAdapter.ProviderAdapterV2SubagentOutcome>
        >();
        // Claude reports a stopped workflow's members as failed; this is the only evidence it was Stop.
        const workflowStopRequestedAt = new Map<string, number>();
        // Buffered idle outcomes must not settle a resumed child again.
        const appliedSubagentOutcomes = new WeakSet<SDKMessage>();
        // A forked skill's frames arrive only after its task_notification; hold that until they are in.
        const forkedSkillToolUseIdsByTaskId = new Map<string, string>();
        const heldForkedSkillNotifications = new Map<string, SDKMessage>();
        // The stream withholds a fork's frames until it ends, so its transcript is shown while it runs.
        // Frames whose uuid the transcript already showed are skipped when they arrive.
        const forkedSkillTranscripts = new Map<
          string,
          {
            readonly fiber: Fiber.Fiber<void>;
            readonly shownUuids: Set<string>;
            readonly finish: Deferred.Deferred<void>;
          }
        >();
        // Subagent frames can precede the task_started that registers their owner.
        const pendingSubagentFramesByToolUseId = yield* Ref.make(
          new Map<string, ReadonlyArray<SDKMessage>>(),
        );
        // A gateway's relative reset counts from the result's arrival, not its replay.
        const bufferedResultArrivals = new WeakMap<SDKMessage, DateTime.Utc>();
        const wakeBuffers = yield* Ref.make(
          new Map<
            string,
            { readonly messages: ReadonlyArray<SDKMessage>; readonly detail: string | null }
          >(),
        );
        // Wake results lack task ids and can follow queued prompts; retain reports for one user turn.
        // Keep report stamps atomic with turn changes.
        const wakeReportsByNativeThread = yield* Ref.make<{
          readonly userTurns: ReadonlyMap<string, number>;
          readonly reports: ReadonlyMap<
            string,
            ReadonlyMap<string, { readonly report: BackgroundWorkReport; readonly turn: number }>
          >;
        }>({ userTurns: new Map(), reports: new Map() });
        const backgroundedSubagentTaskIds = yield* Ref.make<ReadonlySet<string>>(new Set());
        // Nested subagent completions notify their owner and never wake the root.
        const nestedSubagentTaskIds = yield* Ref.make<ReadonlySet<string>>(new Set());
        const isNestedSubagentTask = (taskId: string) =>
          Ref.get(nestedSubagentTaskIds).pipe(Effect.map((ids) => ids.has(taskId)));
        const recordWakeReport = (
          nativeThreadId: string,
          taskId: string,
          report: BackgroundWorkReport,
        ) =>
          Ref.update(wakeReportsByNativeThread, ({ userTurns, reports }) => ({
            userTurns,
            reports: new Map(reports).set(
              nativeThreadId,
              new Map(reports.get(nativeThreadId)).set(taskId, {
                report,
                turn: userTurns.get(nativeThreadId) ?? 0,
              }),
            ),
          }));
        const startUserTurnForWakeReports = (nativeThreadId: string) =>
          Ref.update(wakeReportsByNativeThread, ({ userTurns, reports }) => {
            const turn = (userTurns.get(nativeThreadId) ?? 0) + 1;
            const updatedTurns = new Map(userTurns).set(nativeThreadId, turn);
            const threadReports = reports.get(nativeThreadId);
            if (threadReports === undefined) return { userTurns: updatedTurns, reports };
            const kept = new Map([...threadReports].filter(([, entry]) => entry.turn >= turn - 1));
            const updatedReports = new Map(reports);
            if (kept.size === 0) updatedReports.delete(nativeThreadId);
            else updatedReports.set(nativeThreadId, kept);
            return { userTurns: updatedTurns, reports: updatedReports };
          });
        const takeWakeReports = (nativeThreadId: string) =>
          Ref.modify(wakeReportsByNativeThread, (current) => {
            const taken = current.reports.get(nativeThreadId);
            if (taken === undefined) return [taken, current] as const;
            const reports = new Map(current.reports);
            reports.delete(nativeThreadId);
            return [taken, { userTurns: current.userTurns, reports }] as const;
          });
        const clearWakeReports = (nativeThreadId: string) =>
          takeWakeReports(nativeThreadId).pipe(Effect.asVoid);
        // Empty roster levels can precede notifications; retain tasks for wake attribution.
        const lastKnownOpaqueTasks = yield* Ref.make(
          new Map<string, OrchestrationV2PendingBackgroundTask>(),
        );
        // Roster entries carry only Claude's task id; the timeline item is keyed by the tool call.
        const toolUseIdsByTaskId = yield* Ref.make(new Map<string, string>());
        const claudeMonitors = yield* Ref.make<{
          readonly calls: ReadonlySet<string>;
          readonly tasks: ReadonlyMap<
            string,
            { readonly toolUseId: string; readonly nativeThreadId: string }
          >;
        }>({ calls: new Set(), tasks: new Map() });
        const trackClaudeMonitorCalls = (message: SDKMessage) => {
          const started = claudeToolUseBlocksFromAssistantMessage(message).flatMap((toolUse) =>
            toolUse.name === "Monitor" ? [toolUse.id] : [],
          );
          const returned = [
            ...claudeToolResultBlocksFromAssistantMessage(message),
            ...claudeToolResultBlocksFromUserMessage(message),
          ].map((toolResult) => toolResult.tool_use_id);
          if (started.length === 0 && returned.length === 0) return Effect.void;
          return Ref.update(claudeMonitors, (current) => {
            const linked = new Set([...current.tasks.values()].map((task) => task.toolUseId));
            const opened = started.filter((id) => !linked.has(id) && !current.calls.has(id));
            const closed = returned.filter((id) => current.calls.has(id));
            if (opened.length === 0 && closed.length === 0) return current;
            const calls = new Set([...current.calls, ...opened]);
            for (const id of closed) calls.delete(id);
            return { ...current, calls };
          });
        };
        // ScheduleWakeup reports no background task: its tool result is the only sign that Claude
        // will start a turn by itself, and Claude keeps one pending wakeup per session. It stays
        // out of pendingBackgroundTasksByNativeThread because a wakeup must not refuse a model or
        // mode change; replacing the process cancels it, and that clears this record too.
        const scheduleWakeupCalls = new Set<string>();
        const scheduledWakeupsByNativeThread = new Map<string, number>();
        // Native threads whose current turn Claude started by itself inside the early-fire margin.
        const possibleEarlyWakeNativeThreads = new Set<string>();
        // Turn starts a due or nearly due ScheduleWakeup may have caused.
        const possibleScheduledWakeStarts = new WeakSet<SDKMessage>();
        // A Monitor event wakes Claude with a bare turn and no task_notification frame, so the
        // only evidence is a turn start while a Monitor runs that no ScheduleWakeup explains.
        const monitorEventWakeStarts = new WeakSet<SDKMessage>();
        const trackClaudeScheduledWakeup = Effect.fnUntraced(function* (
          nativeThreadId: string,
          message: SDKMessage,
        ) {
          if (isClaudeTurnStartMessage(message)) {
            const scheduledFor = scheduledWakeupsByNativeThread.get(nativeThreadId);
            if (scheduledFor === undefined) return;
            const now = DateTime.toEpochMillis(yield* DateTime.now);
            if (now >= scheduledFor - CLAUDE_SCHEDULED_WAKEUP_EARLY_FIRE_MARGIN_MS) {
              possibleScheduledWakeStarts.add(message);
            }
            if (now >= scheduledFor) {
              scheduledWakeupsByNativeThread.delete(nativeThreadId);
            } else if (
              (yield* Ref.get(activeTurn)) === null &&
              now >= scheduledFor - CLAUDE_SCHEDULED_WAKEUP_EARLY_FIRE_MARGIN_MS
            ) {
              possibleEarlyWakeNativeThreads.add(nativeThreadId);
            }
            return;
          }
          // A task notification also starts a turn by itself, so an early turn is the wake only
          // when its result is not a task notification's.
          if (message.type === "result") {
            if (
              possibleEarlyWakeNativeThreads.delete(nativeThreadId) &&
              !isClaudeTaskNotificationOriginResult(message)
            ) {
              scheduledWakeupsByNativeThread.delete(nativeThreadId);
            }
            return;
          }
          for (const toolUse of claudeToolUseBlocksFromAssistantMessage(message)) {
            if (toolUse.name === "ScheduleWakeup") scheduleWakeupCalls.add(toolUse.id);
          }
          if (message.type !== "user") return;
          const returned = claudeToolResultBlocksFromUserMessage(message).filter((toolResult) =>
            scheduleWakeupCalls.delete(toolResult.tool_use_id),
          );
          if (returned.length === 0) return;
          const result = message.tool_use_result;
          const scheduledFor =
            returned.length === 1 && typeof result === "object" && result !== null
              ? Reflect.get(result, "scheduledFor")
              : undefined;
          // stop:true reports scheduledFor 0. A failed call also clears: losing the hold early
          // is recoverable, a hold that outlives its wakeup is not.
          possibleEarlyWakeNativeThreads.delete(nativeThreadId);
          if (typeof scheduledFor === "number" && scheduledFor > 0) {
            scheduledWakeupsByNativeThread.set(nativeThreadId, scheduledFor);
          } else {
            scheduledWakeupsByNativeThread.delete(nativeThreadId);
          }
        });
        const publishedPendingBackgroundTasks = (
          nativeThreadId: string | null,
          roster: ReadonlyMap<string, OrchestrationV2PendingBackgroundTask>,
          awaitedTaskIds: ReadonlySet<string>,
        ): ReadonlyArray<OrchestrationV2PendingBackgroundTask> => {
          const tasks = claudePendingBackgroundTasksFromRoster(roster, awaitedTaskIds);
          return nativeThreadId !== null && scheduledWakeupsByNativeThread.has(nativeThreadId)
            ? [...tasks, CLAUDE_SCHEDULED_WAKEUP_TASK]
            : tasks;
        };
        const isClaudeMonitorTask = (input: {
          readonly nativeThreadId: string;
          readonly taskId: string;
          readonly toolUseId: string | undefined;
        }) =>
          Ref.modify(claudeMonitors, (current) => {
            if (current.tasks.has(input.taskId)) return [true, current] as const;
            if (input.toolUseId === undefined || !current.calls.has(input.toolUseId)) {
              return [false, current] as const;
            }
            const calls = new Set(current.calls);
            calls.delete(input.toolUseId);
            const tasks = new Map(current.tasks).set(input.taskId, {
              toolUseId: input.toolUseId,
              nativeThreadId: input.nativeThreadId,
            });
            return [true, { calls, tasks }] as const;
          });
        const endClaudeMonitorTasks = (
          ended: (taskId: string, task: { readonly nativeThreadId: string }) => boolean,
        ) =>
          Ref.modify(claudeMonitors, (current) => {
            const endedIds = [...current.tasks].filter(([taskId, task]) => ended(taskId, task));
            if (endedIds.length === 0) return [current.tasks, current] as const;
            const tasks = new Map(current.tasks);
            for (const [taskId] of endedIds) tasks.delete(taskId);
            return [tasks, { ...current, tasks }] as const;
          });
        const hasRunningClaudeMonitor = (nativeThreadId: string) =>
          Ref.get(claudeMonitors).pipe(
            Effect.map((current) =>
              [...current.tasks.values()].some((task) => task.nativeThreadId === nativeThreadId),
            ),
          );
        // The buffer's first wake is a Monitor event: its result, once known, is a task notification's.
        const isClaudeMonitorEventWake = (messages: ReadonlyArray<SDKMessage>) => {
          const startIndex = messages.findIndex(isClaudeTurnStartMessage);
          const start = messages[startIndex];
          if (start === undefined || !monitorEventWakeStarts.has(start)) return false;
          const result = messages
            .slice(startIndex + 1)
            .find(
              (entry) => entry.type === "result" && !isClaudeEmptyTaskNotificationSuccess(entry),
            );
          return result === undefined || isClaudeTaskNotificationOriginResult(result);
        };
        const claudeTaskOutcome = (status: "completed" | "failed" | "stopped") =>
          status === "completed" ? "completed" : status === "stopped" ? "cancelled" : "failed";
        // Reads the roster, so call it before the notification clears the task from it.
        const opaqueTaskWakeReport = Effect.fnUntraced(function* (
          nativeThreadId: string,
          message: Extract<SDKMessage, { readonly subtype: "task_notification" }>,
        ): Effect.fn.Return<BackgroundWorkReport> {
          const task =
            rosterForNativeThread(
              yield* Ref.get(pendingBackgroundTasksByNativeThread),
              nativeThreadId,
            ).get(message.task_id) ?? (yield* Ref.get(lastKnownOpaqueTasks)).get(message.task_id);
          yield* Ref.update(lastKnownOpaqueTasks, (current) => {
            if (!current.has(message.task_id)) return current;
            const updated = new Map(current);
            updated.delete(message.task_id);
            return updated;
          });
          const outcome = claudeTaskOutcome(message.status);
          const label = task?.description;
          switch (task?.kind) {
            case "subagent":
              return { kind: "subagent", label, outcome, childThreadId: task.childThreadId };
            case "monitor":
            case "background_task":
              return { kind: task.kind, label, outcome };
            case "command":
            case undefined:
              return { kind: "command", label, outcome };
          }
        });
        // `end` is the offered wake's last frame once known: its result, or the last frame a user turn absorbed.
        // A retired latch belongs to a cancelled wake that has not ended; its root frames are dropped until it does.
        // Claude may never open an "unopened" one, so a later task's notification releases it instead.
        const requestedContinuations = yield* Ref.make(
          new Map<
            string,
            {
              readonly token: symbol;
              readonly end: SDKMessage | undefined;
              readonly retired: "unopened" | "opened" | null;
              // Offered as Monitor progress, which starts no delegated follow-up.
              readonly monitorEvent: boolean;
            }
          >(),
        );
        const absorbedWakes = yield* Ref.make(new Set<string>());
        const heldProposedPlansByToolUseId = new Map<string, string>();
        // /clear moves a live process to a new native session; persist that one so a reopen resumes it.
        const clearedNativeSessions = new Map<string, string>();
        const runtimeContext = yield* Effect.context<never>();
        const runPromise = Effect.runPromiseWith(runtimeContext);

        // Overlays state the adapter owns per native session onto persisted provider metadata.
        const withAdapterNativeMetadata = (
          providerThread: OrchestrationV2ProviderThread,
          nativeThreadId: string,
        ): OrchestrationV2ProviderThread => {
          const budget = pdfBudgets.get(nativeThreadId);
          const hasAppliedTitle = appliedSessionTitles.has(nativeThreadId);
          const recordedTitle = providerThread.nativeMetadata?.title;
          const delivered = deliveredAppContext.get(nativeThreadId);
          if (
            budget === undefined &&
            !hasAppliedTitle &&
            recordedTitle === undefined &&
            delivered === undefined
          ) {
            return providerThread;
          }
          const { claudeDeliveredAppContext: _recorded, ...nativeMetadata } =
            providerThread.nativeMetadata ?? {};
          return {
            ...providerThread,
            nativeMetadata: {
              ...(delivered === undefined ? providerThread.nativeMetadata : nativeMetadata),
              ...(delivered === undefined || delivered.size === 0
                ? {}
                : { claudeDeliveredAppContext: Object.fromEntries(delivered) }),
              ...(budget === undefined
                ? {}
                : {
                    claudeAttachmentBudget: {
                      bytesUsed: budget.committed.bytes,
                      pagesUsed: budget.committed.pages,
                    },
                  }),
              // A cleared title makes the next turn after a restart retry a rename that failed.
              ...(hasAppliedTitle
                ? { title: normalizeClaudeSessionTitle(appliedSessionTitles.get(nativeThreadId)) }
                : recordedTitle === undefined
                  ? {}
                  : { title: null }),
            },
          };
        };

        const emitProviderEvent = (event: ProviderAdapter.ProviderAdapterV2Event) => {
          if (event.type === "provider_thread.updated") {
            const nativeThreadId = event.providerThread.nativeThreadRef?.nativeId ?? "";
            event = {
              ...event,
              providerThread: withAdapterNativeMetadata(event.providerThread, nativeThreadId),
            };
            const nativeSessionId = clearedNativeSessions.get(nativeThreadId);
            if (nativeSessionId !== undefined) {
              event = {
                ...event,
                providerThread: {
                  ...event.providerThread,
                  nativeThreadRef: {
                    driver: CLAUDE_PROVIDER,
                    nativeId: nativeSessionId,
                    strength: "strong",
                  },
                  nativeConversationHeadRef: null,
                },
              };
            }
          }
          return Queue.offer(events, event).pipe(Effect.asVoid);
        };

        let reportedStartupPhase: string | undefined;
        const reportStartupPhase = Effect.fn("ClaudeAdapterV2.reportStartupPhase")(function* (
          phase: string | undefined,
        ) {
          if (phase === reportedStartupPhase) return;
          reportedStartupPhase = phase;
          yield* emitProviderEvent({
            type: "provider_session.updated",
            driver: CLAUDE_PROVIDER,
            providerSession: {
              ...session,
              ...(phase === undefined ? {} : { startupPhase: phase }),
              updatedAt: yield* DateTime.now,
            },
          });
        });
        // Only a process's first API request is startup; a reused process is already connected.
        const requestedQueries = new WeakSet<ClaudeAgentSdkQuerySession>();
        let connectingTurn: ActiveClaudeTurnContext | undefined;

        const persistAttachmentBudget = Effect.fnUntraced(function* (nativeThreadId: string) {
          const providerThread = (yield* Ref.get(lastProviderThreadByNativeThread)).get(
            nativeThreadId,
          );
          if (providerThread === undefined) return;
          const active = yield* Ref.get(activeTurn);
          yield* emitProviderEvent({
            type: "provider_thread.updated",
            driver: CLAUDE_PROVIDER,
            providerThread: {
              ...providerThread,
              status: active?.nativeThreadId === nativeThreadId ? "active" : providerThread.status,
              updatedAt: yield* DateTime.now,
            },
          });
        });

        // Usage without input is a placeholder, not a context measurement.
        const emitContextUsage = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          usage: ClaudeMessageUsage | number,
          requestStarted = false,
        ) {
          const now = yield* DateTime.now;
          // Only message_start marks the request start; an assistant snapshot
          // arrives after generation, so it leaves the cache expiry unknown.
          if (requestStarted && context.streamUsage !== null) context.streamUsage.requestedAt = now;
          const maxTokens = claudeContextWindow(context.input.modelSelection);
          const tokenUsage =
            typeof usage === "number"
              ? {
                  usedTokens: usage,
                  maxTokens,
                  ...claudeAutoCompactThreshold(context.autoCompactWindow, maxTokens),
                  updatedAt: DateTime.formatIso(now),
                }
              : claudeProviderTurnTokenUsage(
                  usage,
                  maxTokens,
                  DateTime.formatIso(now),
                  context.autoCompactWindow,
                  context.streamUsage?.requestedAt,
                );
          if ("inputTokens" in tokenUsage) {
            if (tokenUsage.inputTokens <= 0) return;
            context.compactionTokens = undefined;
          }
          yield* emitProviderEvent({
            type: "provider_turn.updated",
            driver: CLAUDE_PROVIDER,
            threadId: context.input.threadId,
            providerTurn: {
              id: context.providerTurnId,
              providerThreadId: context.input.providerThread.id,
              nodeId: context.input.rootNodeId,
              runAttemptId: context.input.attemptId,
              nativeTurnRef: {
                driver: CLAUDE_PROVIDER,
                nativeId: context.nativeTurnId,
                strength: "strong",
              },
              ordinal: context.providerTurnOrdinal,
              status: "running",
              startedAt: context.startedAt,
              completedAt: null,
              tokenUsage,
              ...(context.executedModel === undefined ? {} : { model: context.executedModel }),
            },
          });
        });

        // Claude has no recovered frame; the next assistant message proves recovery.
        // Runs on every model output frame and is almost always a no-op; only a pending retry gets a span.
        const completeProviderRetry = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          updatedAt: DateTime.Utc,
        ) {
          const providerRetry = yield* Ref.modify(providerRetries, (current) => {
            const retry = current.get(context.providerTurnId);
            if (retry === undefined) {
              return [undefined, current] as const;
            }
            const updated = new Map(current);
            updated.delete(context.providerTurnId);
            return [retry, updated] as const;
          });
          if (providerRetry === undefined) {
            return;
          }
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
              itemOrdinal: providerRetry.itemOrdinal,
              failure: providerRetry.failure,
              retry: providerRetry.retry,
              status: "completed",
              startedAt: providerRetry.startedAt,
              updatedAt,
            }),
          }).pipe(Effect.withSpan("ClaudeAdapterV2.completeProviderRetry"));
        });

        // A hung request can take many minutes per attempt, so the budget spans the
        // whole retry window rather than counting attempts.
        const failExpiredProviderRetry = Effect.fn("ClaudeAdapterV2.failExpiredProviderRetry")(
          function* (context: ActiveClaudeTurnContext, startedAt: DateTime.Utc) {
            const isCurrentRetry = Effect.gen(function* () {
              const retry = (yield* Ref.get(providerRetries)).get(context.providerTurnId);
              return retry?.startedAt === startedAt && (yield* Ref.get(activeTurn)) === context
                ? retry
                : undefined;
            });
            const retry = yield* isCurrentRetry;
            if (retry === undefined) return;
            yield* failStalledTurn(
              context,
              { ...retry.failure, retryable: false },
              Effect.map(isCurrentRetry, (current) => current !== undefined),
            );
          },
        );

        // Partial messages are on, so a started prompt or a sent request streams within seconds.
        // A gateway can hold the request open without ever letting the CLI time out and retry.
        const failUnansweredRequest = Effect.fn("ClaudeAdapterV2.failUnansweredRequest")(function* (
          context: ActiveClaudeTurnContext,
          since: DateTime.Utc,
        ) {
          const isUnanswered = Effect.map(
            Ref.get(activeTurn),
            (active) => active === context && context.unansweredRequestSince === since,
          );
          if (!(yield* isUnanswered)) return;
          yield* failStalledTurn(
            context,
            makeProviderFailure({
              class: "transport_error",
              code: "claude_request_unanswered",
              message: `Claude sent nothing for ${PROVIDER_RETRY_BUDGET_MS / 60_000} minutes. The API or a gateway in front of it is not responding.`,
              retryable: false,
            }),
            // Once the stop is sent, a frame clearing the silence must not skip forced settlement.
            Effect.map(Ref.get(activeTurn), (active) => active === context),
          );
        });

        const clearUnansweredRequestWatch = (context: ActiveClaudeTurnContext) => {
          const watch = context.unansweredRequestWatch;
          context.unansweredRequestWatch = undefined;
          return watch === undefined ? Effect.void : Fiber.interrupt(watch);
        };

        const failStalledTurn = Effect.fn("ClaudeAdapterV2.failStalledTurn")(function* (
          context: ActiveClaudeTurnContext,
          failure: OrchestrationV2ProviderFailure,
          stillStalled: Effect.Effect<boolean>,
        ) {
          // A user Stop already in flight keeps its interrupted outcome.
          if ((yield* Ref.get(interruptedTurns)).has(context.providerTurnId)) return;
          context.retryBudgetFailure = failure;
          const liveQuery = yield* Ref.get(queryContext);
          yield* interruptTurn({
            providerThread: context.input.providerThread,
            providerTurnId: context.providerTurnId,
          }).pipe(
            Effect.timeoutOption(CLAUDE_STOP_CONFIRM_TIMEOUT_MS),
            Effect.catch((cause) =>
              Effect.logWarning("orchestration-v2.claude-retry-budget-stop-failed", { cause }),
            ),
          );
          if (liveQuery === null || !(yield* stillStalled)) return;
          // The CLI did not confirm the stop; settle the turn without it.
          const ownedLiveQuery = yield* Ref.modify(queryContext, (current) =>
            current?.query === liveQuery.query ? [true, null] : [false, current],
          );
          if (!ownedLiveQuery) return;
          liveQuery.stopping = true;
          yield* liveQuery.query.close.pipe(
            Effect.timeoutOption(CLAUDE_STOP_CONFIRM_TIMEOUT_MS),
            Effect.ignore,
          );
          yield* finalizeActiveTurnAfterQueryExit(liveQuery);
          yield* endSubagentCallsOfClosedQuery(liveQuery.nativeThreadId, "interrupted");
          yield* Deferred.succeed(liveQuery.closed, undefined);
        });

        const rememberProviderThread =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (providerThread: OrchestrationV2ProviderThread) {
            const nativeThreadId = providerThread.nativeThreadRef?.nativeId;
            if (nativeThreadId === undefined || nativeThreadId === null) {
              return;
            }
            const enriched = withAdapterNativeMetadata(providerThread, nativeThreadId);
            yield* Ref.update(lastProviderThreadByNativeThread, (current) =>
              new Map(current).set(nativeThreadId, enriched),
            );
          });

        // `claude --resume` shows the native title. A failed or timed-out rename forgets the
        // applied title so the next turn, even after a restart, sends it again.
        const applySessionTitle = Effect.fn("ClaudeAdapterV2.applySessionTitle")(function* (
          query: ClaudeAgentSdkQuerySession,
          nativeThreadId: string,
          title: string,
        ) {
          if (appliedSessionTitles.get(nativeThreadId) === title) return;
          const renamed = yield* query
            .renameSession(title)
            .pipe(Effect.timeout("10 seconds"), Effect.isSuccess);
          if (renamed) {
            appliedSessionTitles.set(nativeThreadId, title);
          } else {
            appliedSessionTitles.delete(nativeThreadId);
          }
          const remembered = (yield* Ref.get(lastProviderThreadByNativeThread)).get(nativeThreadId);
          if (remembered !== undefined) {
            yield* rememberProviderThread(remembered);
          }
        });

        const rosterForNativeThread = (
          all: ReadonlyMap<string, Map<string, OrchestrationV2PendingBackgroundTask>>,
          nativeThreadId: string,
        ): Map<string, OrchestrationV2PendingBackgroundTask> =>
          all.get(nativeThreadId) ?? new Map<string, OrchestrationV2PendingBackgroundTask>();

        const hasPendingBackgroundTaskOnNativeThread = (nativeThreadId: string, taskId: string) =>
          Ref.get(pendingBackgroundTasksByNativeThread).pipe(
            Effect.map((all) => rosterForNativeThread(all, nativeThreadId).has(taskId)),
          );

        const taskIdSetForNativeThread = (
          all: ReadonlyMap<string, Set<string>>,
          nativeThreadId: string,
        ): Set<string> => all.get(nativeThreadId) ?? new Set<string>();

        const addTaskIdsToNativeThreadSet = (
          ref: Ref.Ref<Map<string, Set<string>>>,
          nativeThreadId: string,
          taskIds: ReadonlyArray<string>,
        ) =>
          Ref.update(ref, (current) => {
            if (taskIds.length === 0) {
              return current;
            }
            const next = new Set(taskIdSetForNativeThread(current, nativeThreadId));
            let changed = false;
            for (const taskId of taskIds) {
              if (!next.has(taskId)) {
                next.add(taskId);
                changed = true;
              }
            }
            return changed ? new Map(current).set(nativeThreadId, next) : current;
          });

        const clearTaskIdFromNativeThreadSet = (
          ref: Ref.Ref<Map<string, Set<string>>>,
          nativeThreadId: string,
          taskId: string,
        ) =>
          Ref.update(ref, (current) => {
            const existing = taskIdSetForNativeThread(current, nativeThreadId);
            if (!existing.has(taskId)) {
              return current;
            }
            const next = new Set(existing);
            next.delete(taskId);
            const updated = new Map(current);
            if (next.size === 0) {
              updated.delete(nativeThreadId);
            } else {
              updated.set(nativeThreadId, next);
            }
            return updated;
          });

        const clearNativeThreadTaskIdSet = (
          ref: Ref.Ref<Map<string, Set<string>>>,
          nativeThreadId: string,
        ) =>
          Ref.update(ref, (current) => {
            if (!current.has(nativeThreadId)) {
              return current;
            }
            const updated = new Map(current);
            updated.delete(nativeThreadId);
            return updated;
          });

        const isWakeEligibleOpaqueBackgroundTaskOnNativeThread = (
          nativeThreadId: string,
          taskId: string,
        ) =>
          Ref.get(wakeEligibleBackgroundTasksByNativeThread).pipe(
            Effect.map((all) => taskIdSetForNativeThread(all, nativeThreadId).has(taskId)),
          );

        const hasOpaqueBackgroundTaskReplayTombstoneOnNativeThread = (
          nativeThreadId: string,
          taskId: string,
        ) =>
          Ref.get(opaqueBackgroundTaskReplayTombstonesByNativeThread).pipe(
            Effect.map((all) => taskIdSetForNativeThread(all, nativeThreadId).has(taskId)),
          );

        const isKnownOpaqueBackgroundTaskOnNativeThread =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (nativeThreadId: string, taskId: string) {
            if (yield* hasPendingBackgroundTaskOnNativeThread(nativeThreadId, taskId)) {
              return true;
            }
            if (yield* isWakeEligibleOpaqueBackgroundTaskOnNativeThread(nativeThreadId, taskId)) {
              return true;
            }
            return yield* hasOpaqueBackgroundTaskReplayTombstoneOnNativeThread(
              nativeThreadId,
              taskId,
            );
          });

        const markWakeEligibleOpaqueBackgroundTasks = (
          nativeThreadId: string,
          taskIds: ReadonlyArray<string>,
        ) =>
          addTaskIdsToNativeThreadSet(
            wakeEligibleBackgroundTasksByNativeThread,
            nativeThreadId,
            taskIds,
          );

        const consumeWakeEligibilityForBufferedNotification =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (nativeThreadId: string, taskId: string) {
            yield* clearTaskIdFromNativeThreadSet(
              wakeEligibleBackgroundTasksByNativeThread,
              nativeThreadId,
              taskId,
            );
            yield* addTaskIdsToNativeThreadSet(
              opaqueBackgroundTaskReplayTombstonesByNativeThread,
              nativeThreadId,
              [taskId],
            );
          });

        const clearOpaqueBackgroundTaskReplayTombstone = (nativeThreadId: string, taskId: string) =>
          clearTaskIdFromNativeThreadSet(
            opaqueBackgroundTaskReplayTombstonesByNativeThread,
            nativeThreadId,
            taskId,
          );

        // Untraced with roster emission: this runs for each streamed roster update.
        const owedWakeTasksForNativeThread = Effect.fnUntraced(function* (nativeThreadId: string) {
          const previous = (yield* Ref.get(lastProviderThreadByNativeThread)).get(nativeThreadId);
          const roster = rosterForNativeThread(
            yield* Ref.get(pendingBackgroundTasksByNativeThread),
            nativeThreadId,
          );
          const tasks: OrchestrationV2PendingBackgroundTask[] = [];
          for (const task of previous?.pendingBackgroundTasks ?? []) {
            if (
              !roster.has(task.taskId) &&
              (yield* isKnownOpaqueBackgroundTaskOnNativeThread(nativeThreadId, task.taskId))
            )
              tasks.push(task);
          }
          return tasks;
        });

        const emitProviderThreadRoster = Effect.fnUntraced(function* (input: {
          readonly nativeThreadId: string;
          readonly providerThread: OrchestrationV2ProviderThread;
          readonly status?: OrchestrationV2ProviderThread["status"];
        }) {
          const roster = rosterForNativeThread(
            yield* Ref.get(pendingBackgroundTasksByNativeThread),
            input.nativeThreadId,
          );
          const awaitedTaskIds = taskIdSetForNativeThread(
            yield* Ref.get(awaitedBackgroundTasksByNativeThread),
            input.nativeThreadId,
          );
          const owedWakeTasks = yield* owedWakeTasksForNativeThread(input.nativeThreadId);
          const now = yield* DateTime.now;
          const providerThread: OrchestrationV2ProviderThread = {
            ...input.providerThread,
            providerSessionId: session.id,
            ...(input.status === undefined ? {} : { status: input.status }),
            pendingBackgroundTasks: [
              ...publishedPendingBackgroundTasks(input.nativeThreadId, roster, awaitedTaskIds),
              ...owedWakeTasks,
            ],
            ...(goalsByNativeThread.has(input.nativeThreadId)
              ? { goal: goalsByNativeThread.get(input.nativeThreadId) ?? null }
              : {}),
            updatedAt: now,
          };
          yield* rememberProviderThread(providerThread);
          yield* emitProviderEvent({
            type: "provider_thread.updated",
            driver: CLAUDE_PROVIDER,
            providerThread,
            pendingBackgroundWork: owedWakeTasks.length > 0,
          });
        });

        const trackClaudeGoal = Effect.fnUntraced(function* (input: {
          readonly nativeThreadId: string;
          readonly context: ActiveClaudeTurnContext;
          readonly message: SDKMessage;
        }) {
          const current = goalsByNativeThread.get(input.nativeThreadId) ?? null;
          if (
            current?.status === "active" &&
            input.message.type === "assistant" &&
            input.message.parent_tool_use_id === null &&
            input.message.message.model !== "<synthetic>"
          ) {
            goalCheckedTurns.add(input.context.providerTurnId);
          }
          const next = nextClaudeGoal(current, input.message);
          if (next === undefined || providerGoalsEqual(current, next)) return;
          goalsByNativeThread.set(input.nativeThreadId, next);
          const providerThread = (yield* Ref.get(lastProviderThreadByNativeThread)).get(
            input.nativeThreadId,
          );
          if (providerThread === undefined) return;
          const updated = { ...providerThread, goal: next, updatedAt: yield* DateTime.now };
          yield* rememberProviderThread(updated);
          yield* emitProviderEvent({
            type: "provider_thread.updated",
            driver: CLAUDE_PROVIDER,
            providerThread: updated,
          });
        });

        const rememberOpaqueTasks = (tasks: ReadonlyArray<OrchestrationV2PendingBackgroundTask>) =>
          tasks.length === 0
            ? Effect.void
            : Ref.update(lastKnownOpaqueTasks, (current) => {
                const updated = new Map(current);
                for (const task of tasks) updated.set(task.taskId, task);
                for (const oldest of updated.keys()) {
                  if (updated.size <= 64) break;
                  updated.delete(oldest);
                }
                return updated;
              });

        const replacePendingBackgroundTasks =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (
            nativeThreadId: string,
            tasks: ReadonlyArray<OrchestrationV2PendingBackgroundTask>,
          ) {
            yield* Ref.update(pendingBackgroundTasksByNativeThread, (current) => {
              const updated = new Map(current);
              if (tasks.length === 0) {
                updated.delete(nativeThreadId);
              } else {
                updated.set(
                  nativeThreadId,
                  new Map(
                    tasks.map((task) => {
                      const previous = current.get(nativeThreadId)?.get(task.taskId);
                      return [task.taskId, { ...previous, ...task }] as const;
                    }),
                  ),
                );
              }
              return updated;
            });
            yield* rememberOpaqueTasks(tasks);
            if (tasks.length > 0) {
              yield* markWakeEligibleOpaqueBackgroundTasks(
                nativeThreadId,
                tasks.map((task) => task.taskId),
              );
            }
            const listed = new Set(tasks.map((task) => task.taskId));
            yield* Ref.update(awaitedBackgroundTasksByNativeThread, (current) => {
              const awaited = current.get(nativeThreadId);
              if (awaited === undefined) return current;
              const kept = new Set([...awaited].filter((taskId) => listed.has(taskId)));
              if (kept.size === awaited.size) return current;
              const updated = new Map(current);
              if (kept.size === 0) updated.delete(nativeThreadId);
              else updated.set(nativeThreadId, kept);
              return updated;
            });
          });

        const upsertPendingBackgroundTask =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (
            nativeThreadId: string,
            task: OrchestrationV2PendingBackgroundTask,
          ) {
            const startedWait = yield* Ref.modify(
              pendingBackgroundTasksByNativeThread,
              (current) => {
                const roster = new Map(rosterForNativeThread(current, nativeThreadId));
                const previous = roster.get(task.taskId);
                const startedWait =
                  task.kind === "monitor"
                    ? previous?.kind !== "monitor"
                    : task.kind === "command" &&
                      previous?.command === undefined &&
                      isClaudeSleepTimer(task.command);
                roster.set(task.taskId, task);
                return [startedWait, new Map(current).set(nativeThreadId, roster)] as const;
              },
            );
            if (startedWait) {
              yield* addTaskIdsToNativeThreadSet(
                awaitedBackgroundTasksByNativeThread,
                nativeThreadId,
                [task.taskId],
              );
            }
            yield* rememberOpaqueTasks([task]);
            yield* markWakeEligibleOpaqueBackgroundTasks(nativeThreadId, [task.taskId]);
          });

        const clearPendingBackgroundTask = (nativeThreadId: string, taskId: string) =>
          Ref.modify(pendingBackgroundTasksByNativeThread, (current) => {
            const roster = rosterForNativeThread(current, nativeThreadId);
            if (!roster.has(taskId)) {
              return [false, current] as const;
            }
            const nextRoster = new Map(roster);
            nextRoster.delete(taskId);
            const updated = new Map(current);
            if (nextRoster.size === 0) {
              updated.delete(nativeThreadId);
            } else {
              updated.set(nativeThreadId, nextRoster);
            }
            return [true, updated] as const;
          }).pipe(
            Effect.tap(() =>
              clearTaskIdFromNativeThreadSet(
                awaitedBackgroundTasksByNativeThread,
                nativeThreadId,
                taskId,
              ),
            ),
          );

        const clearPendingBackgroundTasksForNativeThread =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (nativeThreadId: string) {
            yield* Ref.update(pendingBackgroundTasksByNativeThread, (current) => {
              if (!current.has(nativeThreadId)) {
                return current;
              }
              const updated = new Map(current);
              updated.delete(nativeThreadId);
              return updated;
            });
            yield* clearNativeThreadTaskIdSet(awaitedBackgroundTasksByNativeThread, nativeThreadId);
            yield* endClaudeMonitorTasks((_taskId, task) => task.nativeThreadId === nativeThreadId);
          });

        const forgetAbsorbedWake = (nativeThreadId: string) =>
          Ref.update(absorbedWakes, (current) => {
            if (!current.has(nativeThreadId)) return current;
            const updated = new Set(current);
            updated.delete(nativeThreadId);
            return updated;
          });

        const clearWakeStateForNativeThread =
          /* Provider events include streaming deltas; avoid a span for each update. */
          Effect.fnUntraced(function* (nativeThreadId: string) {
            yield* clearWakeReports(nativeThreadId);
            yield* Ref.update(wakeBuffers, (current) => {
              if (!current.has(nativeThreadId)) {
                return current;
              }
              const updated = new Map(current);
              updated.delete(nativeThreadId);
              return updated;
            });
            yield* Ref.update(requestedContinuations, (current) => {
              if (!current.has(nativeThreadId)) {
                return current;
              }
              const updated = new Map(current);
              updated.delete(nativeThreadId);
              return updated;
            });
            yield* forgetAbsorbedWake(nativeThreadId);
          });

        const releaseContinuationLatch = (nativeThreadId: string) =>
          Ref.update(requestedContinuations, (current) => {
            if (!current.has(nativeThreadId)) return current;
            const updated = new Map(current);
            updated.delete(nativeThreadId);
            return updated;
          });

        // Claude runs one root turn at a time, so a user turn's result also ends a wake turn it
        // folded in. The continuation replays that wake's buffered frames but gets no result of its own.
        const markAbsorbedWake = Effect.fnUntraced(function* (nativeThreadId: string) {
          const latch = (yield* Ref.get(requestedContinuations)).get(nativeThreadId);
          if (latch !== undefined && latch.retired !== null) {
            yield* releaseContinuationLatch(nativeThreadId);
            return;
          }
          const messages = (yield* Ref.get(wakeBuffers)).get(nativeThreadId)?.messages ?? [];
          const lastResult = messages.findLastIndex((entry) => entry.type === "result");
          if (!messages.slice(lastResult + 1).some(isClaudeRootTurnFrame)) return;
          yield* Ref.update(absorbedWakes, (current) => new Set(current).add(nativeThreadId));
          if (latch !== undefined && latch.end === undefined) {
            yield* Ref.update(requestedContinuations, (current) =>
              new Map(current).set(nativeThreadId, {
                ...latch,
                end: messages.findLast(isClaudeRootTurnFrame),
              }),
            );
          }
        });

        // The SDK emits no initial roster; reset roster and wake eligibility when opening a live query.
        const resetBackgroundTaskStateForNativeThreadProcess = Effect.fnUntraced(function* (
          nativeThreadId: string,
          options?: {
            readonly status?: OrchestrationV2ProviderThread["status"];
            /** The process exited on its own, taking work whose outcome had not reached the agent. */
            readonly exitedUnexpectedly?: boolean;
          },
        ) {
          return yield* bindResetBackgroundTaskStateForNativeThreadProcess({
            get activeTurn() {
              return activeTurn;
            },
            get addTaskIdsToNativeThreadSet() {
              return addTaskIdsToNativeThreadSet;
            },
            get awaitedBackgroundTasksByNativeThread() {
              return awaitedBackgroundTasksByNativeThread;
            },
            get clearNativeThreadTaskIdSet() {
              return clearNativeThreadTaskIdSet;
            },
            get clearPendingBackgroundTasksForNativeThread() {
              return clearPendingBackgroundTasksForNativeThread;
            },
            get emitProviderEvent() {
              return emitProviderEvent;
            },
            get emitProviderThreadRoster() {
              return emitProviderThreadRoster;
            },
            get lastProviderThreadByNativeThread() {
              return lastProviderThreadByNativeThread;
            },
            get opaqueBackgroundTaskReplayTombstonesByNativeThread() {
              return opaqueBackgroundTaskReplayTombstonesByNativeThread;
            },
            get owedWakeTasksForNativeThread() {
              return owedWakeTasksForNativeThread;
            },
            get pendingBackgroundTasksByNativeThread() {
              return pendingBackgroundTasksByNativeThread;
            },
            get possibleEarlyWakeNativeThreads() {
              return possibleEarlyWakeNativeThreads;
            },
            get requestedContinuations() {
              return requestedContinuations;
            },
            get rosterForNativeThread() {
              return rosterForNativeThread;
            },
            get scheduledWakeupsByNativeThread() {
              return scheduledWakeupsByNativeThread;
            },
            get taskIdSetForNativeThread() {
              return taskIdSetForNativeThread;
            },
            get wakeBuffers() {
              return wakeBuffers;
            },
            get wakeEligibleBackgroundTasksByNativeThread() {
              return wakeEligibleBackgroundTasksByNativeThread;
            },
          })(nativeThreadId, options) as Effect.Effect<any, never, never>;
        });

        const claudeSubagentIds = (context: ActiveClaudeTurnContext, taskId: string) => ({
          nodeId: idAllocator.derive.nodeFromProviderItem({
            driver: CLAUDE_PROVIDER,
            nativeItemId: `task:${taskId}`,
          }),
          childRootNodeId: idAllocator.derive.nodeFromProviderItem({
            driver: CLAUDE_PROVIDER,
            nativeItemId: `task:${taskId}:thread-root`,
          }),
          childThreadId: idAllocator.derive.subagentThread({
            driver: CLAUDE_PROVIDER,
            nativeThreadId: `${context.input.providerThread.id}:${taskId}`,
          }),
          turnItemId: idAllocator.derive.turnItemFromProviderItem({
            driver: CLAUDE_PROVIDER,
            nativeItemId: `task:${taskId}:subagent`,
          }),
        });

        const resolveItemOrdinal = (context: ActiveClaudeTurnContext, nativeItemId: string) =>
          Effect.sync(() => {
            const existing = context.itemOrdinals.get(nativeItemId);
            if (existing !== undefined) {
              return existing;
            }
            const ordinal = context.input.providerTurnOrdinal * 100 + context.itemOrdinals.size + 1;
            context.itemOrdinals.set(nativeItemId, ordinal);
            return ordinal;
          });

        const providerTurnPayload = (input: {
          readonly context: ActiveClaudeTurnContext;
          readonly status: OrchestrationV2ProviderTurn["status"];
          readonly completedAt: DateTime.Utc | null;
        }): OrchestrationV2ProviderTurn => ({
          id: input.context.providerTurnId,
          providerThreadId: input.context.input.providerThread.id,
          nodeId: input.context.input.rootNodeId,
          runAttemptId: input.context.input.attemptId,
          nativeTurnRef: {
            driver: CLAUDE_PROVIDER,
            nativeId: input.context.nativeMessageCursor ?? input.context.nativeTurnId,
            strength: "weak",
          },
          ordinal: input.context.providerTurnOrdinal,
          status: input.status,
          startedAt: input.context.startedAt,
          completedAt: input.completedAt,
          ...(input.context.executedModel === undefined
            ? {}
            : { model: input.context.executedModel }),
        });

        const buildToolCallArtifacts = bindBuildToolCallArtifacts({
          get idAllocator() {
            return idAllocator;
          },
          get input() {
            return input;
          },
        });

        const emitToolCallArtifacts = Effect.fnUntraced(function* (artifacts: {
          readonly node: OrchestrationV2ExecutionNode;
          readonly turnItem: OrchestrationV2TurnItem;
        }) {
          yield* emitProviderEvent({
            type: "node.updated",
            driver: CLAUDE_PROVIDER,
            node: artifacts.node,
          });
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver: CLAUDE_PROVIDER,
            turnItem: artifacts.turnItem,
          });
        });

        // A `context: fork` skill, or a foreground subagent whose replies were never streamed,
        // leaves no model on any frame; only its transcript records it, written once it finishes.
        const transcriptModel = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          nativeThreadId: string,
          taskId: string,
        ) {
          const registered = (yield* Ref.get(sessionSubagentsByTaskId)).get(taskId);
          if (
            registered === undefined ||
            registered.task.model !== null ||
            registered.task.status === "running"
          ) {
            return undefined;
          }
          const model = yield* queryRunner
            .subagentModel({
              sessionId: nativeThreadId,
              agentId: taskId,
              dir: context.input.runtimePolicy.cwd,
              threadId: context.input.threadId,
              providerSessionId: input.providerSessionId,
            })
            .pipe(
              Effect.catch(() =>
                Effect.logWarning("orchestration-v2.claude-subagent-model-lookup-failed", {
                  taskId,
                }).pipe(Effect.as(null)),
              ),
            );
          return model === null || model === "<synthetic>"
            ? undefined
            : canonicalClaudeSubagentModel(modelCatalog, model);
        });

        // Resume frames reference the launch call, but task_started names SendMessage; recover the mapping from CLI storage.
        const recoverResumedClaudeSubagent = Effect.fnUntraced(function* (resume: {
          readonly context: ActiveClaudeTurnContext;
          readonly nativeThreadId: string;
          readonly taskId: string;
          readonly toolUseId: string | undefined;
          readonly title: string;
        }) {
          return yield* bindRecoverResumedClaudeSubagent({
            get claudeSubagentIds() {
              return claudeSubagentIds;
            },
            get findToolCall() {
              return findToolCall;
            },
            get input() {
              return input;
            },
            get queryRunner() {
              return queryRunner;
            },
            get resolveItemOrdinal() {
              return resolveItemOrdinal;
            },
            get sessionSubagentTaskIdsByToolUseId() {
              return sessionSubagentTaskIdsByToolUseId;
            },
            get sessionSubagentsByTaskId() {
              return sessionSubagentsByTaskId;
            },
          })(resume) as Effect.Effect<any, never, never>;
        });

        const withWorkflowMemberThreadIds = (
          workflow: OrchestrationV2SubagentWorkflow,
          coordinatorChildThreadId: ThreadId,
        ): OrchestrationV2SubagentWorkflow => ({
          ...workflow,
          agents: workflow.agents.map((member) => ({
            ...member,
            childThreadId: idAllocator.derive.subagentThread({
              driver: CLAUDE_PROVIDER,
              nativeThreadId: `${coordinatorChildThreadId}:agent:${member.index}`,
            }),
          })),
        });

        const emitSubagentConversationMessage = Effect.fnUntraced(function* (input: {
          readonly nativeItemId: string;
          readonly threadId: ThreadId;
          readonly senderThreadId?: ThreadId;
          readonly rootNodeId: OrchestrationV2ExecutionNode["id"];
          readonly role: "user" | "assistant";
          readonly text: string;
          readonly workflowScript?: boolean;
          readonly ordinal: number;
          readonly now: DateTime.Utc;
        }) {
          const artifacts = makeSubagentConversationArtifacts({
            messageId: idAllocator.derive.messageFromProviderItem({
              driver: CLAUDE_PROVIDER,
              nativeItemId: input.nativeItemId,
            }),
            turnItemId: idAllocator.derive.turnItemFromProviderItem({
              driver: CLAUDE_PROVIDER,
              nativeItemId: input.nativeItemId,
            }),
            threadId: input.threadId,
            ...(input.senderThreadId === undefined ? {} : { senderThreadId: input.senderThreadId }),
            rootNodeId: input.rootNodeId,
            providerThreadId: null,
            providerTurnId: null,
            nativeItemRef: {
              driver: CLAUDE_PROVIDER,
              nativeId: input.nativeItemId,
              strength: "strong",
            },
            role: input.role,
            text: input.text,
            ...(input.workflowScript === undefined ? {} : { workflowScript: input.workflowScript }),
            ordinal: input.ordinal,
            now: input.now,
          });
          yield* emitProviderEvent({
            type: "message.updated",
            driver: CLAUDE_PROVIDER,
            message: artifacts.message,
          });
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver: CLAUDE_PROVIDER,
            turnItem: artifacts.turnItem,
          });
        });

        const projectClaudeWorkflowMembers = Effect.fnUntraced(function* (input: {
          readonly coordinator: ActiveClaudeSubagent;
          readonly workflow: OrchestrationV2SubagentWorkflow;
        }) {
          return yield* bindProjectClaudeWorkflowMembers({
            get CLAUDE_PROVIDER() {
              return CLAUDE_PROVIDER;
            },
            get WORKFLOW_MEMBER_TRANSCRIPT_FLUSH_MS() {
              return WORKFLOW_MEMBER_TRANSCRIPT_FLUSH_MS;
            },
            get adapterOptions() {
              return adapterOptions;
            },
            get emitProviderEvent() {
              return emitProviderEvent;
            },
            get emitSubagentConversationMessage() {
              return emitSubagentConversationMessage;
            },
            get endToolCalls() {
              return endToolCalls;
            },
            get idAllocator() {
              return idAllocator;
            },
            get isClaudeTranscriptTurnEnd() {
              return isClaudeTranscriptTurnEnd;
            },
            get path() {
              return path;
            },
            get projectSubagentTranscriptLine() {
              return projectSubagentTranscriptLine;
            },
            get session() {
              return session;
            },
            get sessionSubagentsByTaskId() {
              return sessionSubagentsByTaskId;
            },
            get workflowMemberStates() {
              return workflowMemberStates;
            },
            get workflowStopRequestedAt() {
              return workflowStopRequestedAt;
            },
          })(input) as Effect.Effect<any, never, never>;
        });

        const confirmedSubagentOutcome = (task: OrchestrationV2Subagent | undefined) => {
          if (
            task === undefined ||
            task.completedAt === null ||
            (task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled")
          )
            return;
          return { status: task.status, completedAt: task.completedAt, result: task.result };
        };

        const discardBufferedSubagentStarts = (
          nativeThreadId: string,
          taskId: string,
          outcome: SDKMessage,
        ) =>
          Ref.update(wakeBuffers, (current) => {
            const entry = current.get(nativeThreadId);
            if (entry === undefined) return current;
            const outcomeIndex = entry.messages.indexOf(outcome);
            const messages = entry.messages.filter(
              (buffered, index) =>
                !(
                  (outcomeIndex === -1 || index < outcomeIndex) &&
                  buffered.type === "system" &&
                  (buffered.subtype === "task_started" || buffered.subtype === "task_progress") &&
                  buffered.task_id === taskId
                ),
            );
            return messages.length === entry.messages.length
              ? current
              : new Map(current).set(nativeThreadId, { ...entry, messages });
          });

        // Claude Code records the effort a subagent ran at only in its transcript.
        const findSubagentTranscriptDir = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          taskId: string,
        ) {
          const cwd = context.input.runtimePolicy.cwd;
          if (cwd === null) return undefined;
          const configured = adapterOptions.environment.CLAUDE_CONFIG_DIR?.trim();
          const configDir = configured ? path.resolve(cwd, configured) : undefined;
          const projectsDir = path.join(
            configDir ?? path.join(yield* HostProcess.HomeDirectory, ".claude"),
            "projects",
          );
          // Claude names the project folder after the resolved, possibly hashed, cwd; find the session instead.
          let found: string | undefined;
          for (const project of yield* fileSystem
            .readDirectory(projectsDir)
            .pipe(Effect.orElseSucceed((): ReadonlyArray<string> => []))) {
            const candidate = path.join(projectsDir, project, context.nativeThreadId, "subagents");
            if (
              yield* fileSystem
                .exists(path.join(candidate, `agent-${taskId}.jsonl`))
                .pipe(Effect.orElseSucceed(() => false))
            ) {
              found = candidate;
              break;
            }
          }
          return found === undefined ? undefined : { transcriptDir: found, configDir };
        });

        const readSubagentTranscriptEffort = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          taskId: string,
          completed: boolean,
        ) {
          const located = yield* findSubagentTranscriptDir(context, taskId);
          if (located === undefined) return undefined;
          const { transcriptDir, configDir } = located;
          let metadata: WorkflowAgentMetadata = {};
          let cursor = initialWorkflowAgentTranscriptCursor;
          const read = Effect.fnUntraced(function* () {
            while (metadata.messageId === undefined) {
              const next = yield* readWorkflowAgentTranscript({
                transcriptDir,
                agentId: taskId,
                cursor,
                ...(configDir === undefined ? {} : { configDir }),
              }).pipe(Effect.option);
              if (Option.isNone(next)) return false;
              metadata = mergeWorkflowAgentMetadata(next.value.lines, metadata);
              const advanced = next.value.cursor.offset !== cursor.offset;
              cursor = next.value.cursor;
              if (!next.value.truncated || !advanced) break;
            }
            return true;
          });
          // A completed subagent can settle before its first reply is flushed; wait out the flush once.
          if ((yield* read()) && completed && metadata.messageId === undefined) {
            yield* Effect.sleep(WORKFLOW_MEMBER_TRANSCRIPT_FLUSH_MS);
            yield* read();
          }
          return metadata.effort;
        });

        const updateClaudeSubagentNode = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext;
          readonly taskId: string;
          readonly toolUseId?: string;
          readonly prompt?: string;
          readonly title?: string;
          readonly model?: string;
          readonly effort?: string;
          readonly owner?: ActiveClaudeSubagent;
          readonly nativeTaskType?: string;
          readonly progress?: string;
          readonly workflowFrame?: unknown;
          readonly workflowName?: string;
          readonly workflowRunHandles?: OrchestrationV2WorkflowRunHandles;
          readonly result?: string;
          readonly status: Extract<
            OrchestrationV2ExecutionNode["status"],
            "running" | "completed" | "failed" | "cancelled"
          >;
          readonly reopen?: boolean;
          readonly nativeRunId?: string;
          readonly nativeOutcome?: Extract<
            SDKMessage,
            { readonly type: "system"; readonly subtype: "task_notification" }
          >;
          // The process that ran it exited, which confirms the outcome as a native one would.
          readonly processExited?: true;
          readonly onlyIfRunningInRun?: RunId | null;
        }) {
          return yield* bindUpdateClaudeSubagentNode({
            get CLAUDE_PROVIDER() {
              return CLAUDE_PROVIDER;
            },
            get appliedSubagentOutcomes() {
              return appliedSubagentOutcomes;
            },
            get claudeSubagentIds() {
              return claudeSubagentIds;
            },
            get claudeSubagentModelSelection() {
              return claudeSubagentModelSelection;
            },
            get confirmedSubagentOutcome() {
              return confirmedSubagentOutcome;
            },
            get emitProviderEvent() {
              return emitProviderEvent;
            },
            get emitSubagentConversationMessage() {
              return emitSubagentConversationMessage;
            },
            get endToolCalls() {
              return endToolCalls;
            },
            get modelCatalog() {
              return modelCatalog;
            },
            get normalizeClaudeResultText() {
              return normalizeClaudeResultText;
            },
            get projectClaudeWorkflowMembers() {
              return projectClaudeWorkflowMembers;
            },
            get readSubagentTranscriptEffort() {
              return readSubagentTranscriptEffort;
            },
            get resolveItemOrdinal() {
              return resolveItemOrdinal;
            },
            get sessionSubagentTaskIdsByToolUseId() {
              return sessionSubagentTaskIdsByToolUseId;
            },
            get sessionSubagentsByTaskId() {
              return sessionSubagentsByTaskId;
            },
            get subagentStopOutcomes() {
              return subagentStopOutcomes;
            },
            get subagentToolCalls() {
              return subagentToolCalls;
            },
            get withWorkflowMemberThreadIds() {
              return withWorkflowMemberThreadIds;
            },
          })(input) as Effect.Effect<any, never, never>;
        });

        const emitClaudePlanProjection = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext;
          readonly nativeItemId: string;
          readonly kind: "todo_list" | "proposed_plan";
          readonly steps?: ReadonlyArray<OrchestrationV2PlanStep>;
          readonly markdown?: string;
        }) {
          return yield* bindEmitClaudePlanProjection({
            get emitProviderEvent() {
              return emitProviderEvent;
            },
            get idAllocator() {
              return idAllocator;
            },
            get latestPlanByKind() {
              return latestPlanByKind;
            },
            get resolveItemOrdinal() {
              return resolveItemOrdinal;
            },
          })(input) as Effect.Effect<any, never, never>;
        });

        const resolveSubagentByToolUseId = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          toolUseId: string,
        ) {
          const taskId = (yield* Ref.get(sessionSubagentTaskIdsByToolUseId)).get(toolUseId);
          const registered =
            taskId === undefined
              ? undefined
              : (yield* Ref.get(sessionSubagentsByTaskId)).get(taskId);
          return registered ?? context.subagentsByToolUseId.get(toolUseId);
        });

        const findToolCall = (context: ActiveClaudeTurnContext, nativeItemId: string) =>
          context.toolCalls.get(nativeItemId) ?? subagentToolCalls.get(nativeItemId);
        const toolCallsFor = (context: ActiveClaudeTurnContext, toolCall: ActiveClaudeToolCall) =>
          toolCall.runId === null ? subagentToolCalls : context.toolCalls;

        const ensureToolCallStarted = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext;
          readonly nativeItemId: string;
          readonly toolName: string;
          readonly toolInput: ClaudeNativeToolInput;
          readonly parentToolUseId: string | null;
          readonly presentation?: ClaudeToolPresentation | undefined;
        }) {
          const existing = findToolCall(input.context, input.nativeItemId);
          if (existing !== undefined) {
            // Permission callbacks can start calls before assistant frames provide their display name and icon.
            if (input.presentation === undefined || existing.presentation !== undefined) {
              return existing;
            }
            const presented = { ...existing, presentation: input.presentation };
            toolCallsFor(input.context, presented).set(input.nativeItemId, presented);
            const updatedAt = yield* DateTime.now;
            yield* emitToolCallArtifacts(
              buildToolCallArtifacts({
                context: input.context,
                nativeItemId: presented.nativeItemId,
                toolName: presented.toolName,
                classification: presented.classification,
                toolInput: presented.input,
                threadId: presented.threadId,
                runId: presented.runId,
                rootNodeId: presented.rootNodeId,
                parentNodeId: presented.parentNodeId,
                ordinal: presented.ordinal,
                output: NO_CLAUDE_NATIVE_TOOL_OUTPUT,
                status: "running",
                startedAt: presented.startedAt,
                updatedAt,
                presentation: input.presentation,
              }),
            );
            return presented;
          }
          const subagent =
            input.parentToolUseId === null
              ? undefined
              : yield* resolveSubagentByToolUseId(input.context, input.parentToolUseId);
          const call = {
            nativeItemId: input.nativeItemId,
            toolName: input.toolName,
            toolInput: input.toolInput,
            presentation: input.presentation,
            startedAt: yield* DateTime.now,
          };
          if (subagent !== undefined) {
            return yield* startSubagentToolCall(subagentProjectionTarget(subagent), call);
          }
          return yield* startToolCall({
            ...call,
            context: input.context,
            threadId: input.context.input.threadId,
            runId: input.context.input.runId,
            rootNodeId: input.context.input.rootNodeId,
            ordinal: yield* resolveItemOrdinal(input.context, input.nativeItemId),
            registry: input.context.toolCalls,
          });
        });

        const startToolCall = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext | null;
          readonly nativeItemId: string;
          readonly toolName: string;
          readonly toolInput: ClaudeNativeToolInput;
          readonly presentation: ClaudeToolPresentation | undefined;
          readonly threadId: ThreadId;
          readonly runId: ProviderAdapter.ProviderAdapterV2TurnInput["runId"] | null;
          readonly rootNodeId: OrchestrationV2ExecutionNode["id"];
          readonly ordinal: number;
          readonly startedAt: DateTime.Utc;
          readonly registry: Map<string, ActiveClaudeToolCall>;
        }) {
          const toolCall: ActiveClaudeToolCall = {
            nativeItemId: input.nativeItemId,
            toolName: input.toolName,
            classification: classifyClaudeNativeTool(input.toolName),
            input: input.toolInput,
            threadId: input.threadId,
            runId: input.runId,
            rootNodeId: input.rootNodeId,
            parentNodeId: input.rootNodeId,
            ordinal: input.ordinal,
            startedAt: input.startedAt,
            ...(input.presentation === undefined ? {} : { presentation: input.presentation }),
          };
          input.registry.set(input.nativeItemId, toolCall);
          yield* emitToolCallArtifacts(
            buildToolCallArtifacts({
              context: input.context,
              nativeItemId: toolCall.nativeItemId,
              toolName: toolCall.toolName,
              classification: toolCall.classification,
              toolInput: toolCall.input,
              threadId: toolCall.threadId,
              runId: toolCall.runId,
              rootNodeId: toolCall.rootNodeId,
              parentNodeId: toolCall.parentNodeId,
              ordinal: toolCall.ordinal,
              output: NO_CLAUDE_NATIVE_TOOL_OUTPUT,
              status: "running",
              startedAt: toolCall.startedAt,
              updatedAt: toolCall.startedAt,
              presentation: input.presentation,
            }),
          );
          return toolCall;
        });

        const subagentProjectionTarget = (
          subagent: ActiveClaudeSubagent,
        ): ClaudeSubagentProjectionTarget => ({
          childThreadId: subagent.childThreadId,
          childRootNodeId: subagent.childRootNodeId,
          nextOrdinal: () => ++subagent.nextChildItemOrdinal,
          toolCalls: subagentToolCalls,
        });

        const startSubagentToolCall = (
          target: ClaudeSubagentProjectionTarget,
          call: {
            readonly nativeItemId: string;
            readonly toolName: string;
            readonly toolInput: ClaudeNativeToolInput;
            readonly presentation: ClaudeToolPresentation | undefined;
            readonly startedAt: DateTime.Utc;
          },
        ) =>
          startToolCall({
            ...call,
            context: null,
            threadId: target.childThreadId,
            runId: null,
            rootNodeId: target.childRootNodeId,
            ordinal: target.nextOrdinal(),
            registry: target.toolCalls,
          });

        const liveQueryForThread = Effect.fn("ClaudeAdapterV2.liveQueryForThread")(function* (
          providerThread: OrchestrationV2ProviderThread,
        ) {
          const liveQuery = yield* Ref.get(queryContext);
          const nativeId = providerThread.nativeThreadRef?.nativeId;
          // After /clear the thread carries the new session id; the live query keeps the old one.
          if (
            liveQuery === null ||
            liveQuery.stopping ||
            (liveQuery.nativeThreadId !== nativeId &&
              clearedNativeSessions.get(liveQuery.nativeThreadId) !== nativeId)
          ) {
            return yield* new ProviderAdapter.ProviderAdapterSessionStoppedError({
              driver: CLAUDE_PROVIDER,
            });
          }
          return liveQuery;
        });

        /** Claude reports a server that needs a sign-in only in its status, which settles after start. */
        const announceMcpSignIns = Effect.fn("ClaudeAdapterV2.announceMcpSignIns")(function* (
          liveQuery: ClaudeLiveQueryContext,
          context: ActiveClaudeTurnContext,
        ) {
          if (!liveQuery.checkMcpSignIns) return;
          const statuses = yield* liveQuery.query.mcpServerStatus.pipe(
            Effect.timeoutOrElse({
              duration: "2 seconds",
              orElse: () => Effect.succeed<ReadonlyArray<ClaudeMcpServerStatus>>([]),
            }),
            Effect.orElseSucceed((): ReadonlyArray<ClaudeMcpServerStatus> => []),
          );
          liveQuery.checkMcpSignIns = statuses.some((status) => status.status === "pending");
          for (const status of statuses) {
            const key = mcpSignInKey(liveQuery.nativeThreadId, status.name);
            if (status.status === "connected") announcedMcpSignIns.delete(key);
            // Every claude.ai connector the user never connected reports this too.
            if (status.status !== "needs-auth" || status.scope === "claudeai") continue;
            if (announcedMcpSignIns.has(key)) continue;
            announcedMcpSignIns.add(key);
            const nativeItemId = `mcp-sign-in:${context.providerTurnId}:${status.name}`;
            const now = yield* DateTime.now;
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
                title: `MCP server ${status.name} needs a sign-in`,
                message: `The ${status.name} MCP server needs a sign-in before Claude can use it.`,
                mcpSignIn: { server: status.name },
                startedAt: now,
                completedAt: now,
                updatedAt: now,
              },
            });
          }
        });

        // App requests never start a CLI; they reuse the live process that ran the tool.
        const mcpAppQuery = Effect.fn("ClaudeAdapterV2.mcpAppQuery")(function* (
          providerThread: OrchestrationV2ProviderThread,
        ) {
          const liveQuery = yield* Ref.get(queryContext);
          if (
            liveQuery === null ||
            liveQuery.stopping ||
            liveQuery.nativeThreadId !== providerThread.nativeThreadRef?.nativeId
          ) {
            return yield* new ProviderAdapter.ProviderAdapterSessionStoppedError({
              driver: CLAUDE_PROVIDER,
            });
          }
          if (!claudeSupportsMcpApps(liveQuery.capabilities)) {
            return yield* new ProviderAdapter.ProviderAdapterProtocolError({
              driver: CLAUDE_PROVIDER,
              detail: "This Claude process does not support MCP Apps.",
            });
          }
          return liveQuery;
        });

        // Servers can connect after capture, and a forged app reference can name a colliding server.
        const mcpAppServerStatuses = Effect.fn("ClaudeAdapterV2.mcpAppServerStatuses")(function* (
          providerThread: OrchestrationV2ProviderThread,
          server: string,
        ) {
          const liveQuery = yield* mcpAppQuery(providerThread);
          const statuses = yield* liveQuery.query.mcpServerStatus.pipe(
            Effect.mapError(
              (cause) =>
                new ProviderAdapter.ProviderAdapterProtocolError({
                  driver: CLAUDE_PROVIDER,
                  detail: "Failed to list Claude MCP tools.",
                  cause,
                }),
            ),
          );
          if (claudeMcpServerPrefixOverlaps(statuses, server)) {
            return yield* new ProviderAdapter.ProviderAdapterProtocolError({
              driver: CLAUDE_PROVIDER,
              detail: "Another MCP server's tool names overlap this app's server.",
            });
          }
          return { liveQuery, statuses };
        });

        /** Reads an app tool's `ui://` document into an attachment; a plain tool row is the fallback. */
        const captureClaudeMcpApp = Effect.fn("ClaudeAdapterV2.captureMcpApp")(
          function* (input: {
            readonly liveQuery: ClaudeLiveQueryContext;
            readonly toolCall: ActiveClaudeToolCall;
            readonly output: ClaudeNativeToolOutput;
          }) {
            const { liveQuery, toolCall } = input;
            if (
              !toolCall.toolName.startsWith("mcp__") ||
              toolCall.toolName.startsWith("mcp__t3-code__") ||
              !claudeSupportsMcpApps(liveQuery.capabilities)
            ) {
              return undefined;
            }
            const match = findClaudeMcpTool(
              yield* liveQuery.query.mcpServerStatus,
              toolCall.toolName,
            );
            const resourceUri = mcpAppToolResourceUri(match?.tool._meta);
            if (match === undefined || resourceUri === undefined) return undefined;
            const { contents } = yield* liveQuery.query.readMcpResource({
              server: match.server,
              uri: resourceUri,
            });
            const reference = yield* snapshotMcpApp({
              attachmentsDir,
              threadId: toolCall.threadId,
              server: match.server,
              tool: match.tool.name,
              resourceUri,
              contents,
            }).pipe(Effect.provideService(FileSystem.FileSystem, fileSystem));
            if (reference === undefined) return undefined;
            return {
              type: "structured_tool_use_result",
              value: {
                [MCP_APP_OUTPUT_KEY]: reference,
                result: claudeMcpCallToolResult(claudeNativeToolOutputValue(input.output)),
              },
            } satisfies ClaudeNativeToolOutput;
          },
          Effect.timeout(CLAUDE_MCP_APP_CAPTURE_TIMEOUT),
          Effect.catchCauseIf(
            (cause) => !Cause.hasInterruptsOnly(cause),
            (cause) =>
              Effect.logWarning("Failed to capture an MCP app; showing a plain tool row.", {
                cause,
              }).pipe(Effect.as(undefined)),
          ),
          Effect.orDie,
        );

        const settleToolCall = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext | null;
          readonly toolCall: ActiveClaudeToolCall;
          readonly registry: Map<string, ActiveClaudeToolCall>;
          readonly message: SDKMessage;
          readonly toolResult: ClaudeToolResultContentBlock;
          readonly output: ClaudeNativeToolOutput;
          readonly completedAt: DateTime.Utc;
          readonly stopped?: boolean;
        }) {
          const { toolCall } = input;
          const toolNonExecutionKind = claudeToolNonExecutionKind(
            input.message,
            input.toolResult.tool_use_id,
          );
          // Stop denial metadata distinguishes cancelled work from a real error
          // that happens to arrive after the turn was interrupted.
          const stopped =
            input.stopped === true ||
            (toolNonExecutionKind === "user-rejected" &&
              input.context !== null &&
              (yield* Ref.get(interruptedTurns)).has(input.context.providerTurnId));
          yield* stopTaskOutputTail(toolCall.nativeItemId);
          yield* emitToolCallArtifacts(
            buildToolCallArtifacts({
              context: input.context,
              nativeItemId: toolCall.nativeItemId,
              toolName: toolCall.toolName,
              classification: toolCall.classification,
              toolInput: toolCall.input,
              threadId: toolCall.threadId,
              runId: toolCall.runId,
              rootNodeId: toolCall.rootNodeId,
              parentNodeId: toolCall.parentNodeId,
              ordinal: toolCall.ordinal,
              output: input.output,
              status:
                toolNonExecutionKind === "cancelled" || toolNonExecutionKind === "interrupted"
                  ? toolNonExecutionKind
                  : isClaudeToolResultError(input.toolResult)
                    ? stopped
                      ? "interrupted"
                      : "failed"
                    : "completed",
              ...(toolNonExecutionKind === undefined ? {} : { toolNonExecutionKind }),
              startedAt: toolCall.startedAt,
              updatedAt: input.completedAt,
              presentation: toolCall.presentation,
            }),
          );
          input.registry.delete(toolCall.nativeItemId);
        });

        const emitSubagentThinking = Effect.fnUntraced(function* (
          target: ClaudeSubagentProjectionTarget,
          message: SDKAssistantMessage,
          at: DateTime.Utc,
        ) {
          const thinking = message.message.content.flatMap((block) =>
            block.type === "thinking" && block.thinking.trim().length > 0 ? [block.thinking] : [],
          );
          for (const [index, text] of thinking.entries()) {
            const nativeItemId = `${message.uuid}:thinking:${index}`;
            yield* emitProviderEvent({
              type: "turn_item.updated",
              driver: CLAUDE_PROVIDER,
              turnItem: {
                id: idAllocator.derive.turnItemFromProviderItem({
                  driver: CLAUDE_PROVIDER,
                  nativeItemId,
                }),
                threadId: target.childThreadId,
                runId: null,
                nodeId: target.childRootNodeId,
                providerThreadId: null,
                providerTurnId: null,
                nativeItemRef: {
                  driver: CLAUDE_PROVIDER,
                  nativeId: nativeItemId,
                  strength: "strong",
                },
                parentItemId: null,
                ordinal: target.nextOrdinal(),
                type: "reasoning",
                title: "Thinking",
                text,
                streaming: false,
                status: "completed",
                startedAt: at,
                completedAt: at,
                updatedAt: at,
              },
            });
          }
        });

        const projectSubagentTranscriptLine = Effect.fnUntraced(function* (
          target: ClaudeSubagentProjectionTarget,
          line: unknown,
        ) {
          if (!isClaudeTranscriptConversationLine(line)) return false;
          const at =
            Option.getOrUndefined(DateTime.make(text(field(line, "timestamp")) ?? "")) ??
            (yield* DateTime.now);
          const presentations = claudeToolPresentationsFromAssistantMessage(line);
          for (const toolUse of claudeToolUseBlocksFromAssistantMessage(line)) {
            if (target.toolCalls.has(toolUse.id)) continue;
            yield* startSubagentToolCall(target, {
              nativeItemId: toolUse.id,
              toolName: toolUse.name,
              toolInput: claudeNativeToolInputFromUnknown(toolUse.input),
              presentation:
                presentations.get(toolUse.id) ??
                mcpToolPresentation({
                  toolName: toolUse.name.replace(/^mcp__claude_ai_/u, "mcp__"),
                }),
              startedAt: at,
            });
          }
          for (const { toolResult, output } of claudeToolResultEntriesFromMessage(line)) {
            const toolCall =
              target.toolCalls.get(toolResult.tool_use_id) ??
              (yield* startSubagentToolCall(target, {
                nativeItemId: toolResult.tool_use_id,
                toolName: toolNameFromClaudeToolResult(toolResult),
                toolInput: EMPTY_CLAUDE_NATIVE_TOOL_INPUT,
                presentation: undefined,
                startedAt: at,
              }));
            yield* settleToolCall({
              context: null,
              toolCall,
              registry: target.toolCalls,
              message: line,
              toolResult,
              output,
              completedAt: at,
              // A denial written before Stop (a declined approval) is not the Stop's.
              stopped:
                target.stopRequestedAt !== undefined &&
                field(line, "toolDenialKind") !== undefined &&
                DateTime.toEpochMillis(at) >= target.stopRequestedAt,
            });
          }
          if (line.type !== "assistant") return false;
          yield* emitSubagentThinking(target, line, at);
          const assistantText = textFromClaudeContent(line.message.content);
          if (assistantText.length === 0) return false;
          yield* emitSubagentConversationMessage({
            nativeItemId: line.uuid,
            threadId: target.childThreadId,
            rootNodeId: target.childRootNodeId,
            role: "assistant",
            text: assistantText,
            ordinal: target.nextOrdinal(),
            now: at,
          });
          return true;
        });

        const followForkedSkillTranscript = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          taskId: string,
          shownUuids: Set<string>,
          finish: Deferred.Deferred<void>,
        ) {
          return yield* bindFollowForkedSkillTranscript({
            get findSubagentTranscriptDir() {
              return findSubagentTranscriptDir;
            },
            get projectSubagentTranscriptLine() {
              return projectSubagentTranscriptLine;
            },
            get sessionSubagentsByTaskId() {
              return sessionSubagentsByTaskId;
            },
            get subagentProjectionTarget() {
              return subagentProjectionTarget;
            },
          })(context, taskId, shownUuids, finish) as Effect.Effect<any, never, never>;
        });

        const buildApprovalRequestArtifacts = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext;
          readonly nativeItemId: string;
          readonly nativeRequestId: string;
          readonly parentNodeId?: OrchestrationV2ExecutionNode["id"];
          readonly requestKind: OrchestrationV2RuntimeRequest["kind"];
          readonly prompt?: string;
          readonly appName?: string;
          readonly pushHooks?: ProviderApprovalPushHooks | undefined;
          readonly options?: ReadonlyArray<ProviderApprovalOption>;
          readonly presentation?: ReturnType<typeof claudeApprovalPresentation>;

          readonly questions?: ReadonlyArray<OrchestrationV2UserInputQuestion>;
        }) {
          return yield* bindBuildApprovalRequestArtifacts({
            get idAllocator() {
              return idAllocator;
            },
            get resolveItemOrdinal() {
              return resolveItemOrdinal;
            },
          })(input) as Effect.Effect<any, never, never>;
        });

        // Claude withdraws a permission request it no longer needs, for example
        // when a PermissionRequest hook answered it. Close the request and its
        // card, which would otherwise wait for an answer nothing reads.
        const cancelWithdrawnRequest = Effect.fnUntraced(function* (
          artifacts: Effect.Success<ReturnType<typeof buildApprovalRequestArtifacts>>,
        ) {
          const now = yield* DateTime.now;
          yield* Effect.all(
            [
              emitProviderEvent({
                type: "runtime_request.updated",
                driver: CLAUDE_PROVIDER,
                runtimeRequest: { ...artifacts.request, status: "cancelled", resolvedAt: now },
              }),
              emitProviderEvent({
                type: "node.updated",
                driver: CLAUDE_PROVIDER,
                node: { ...artifacts.node, status: "cancelled", completedAt: now },
              }),
              emitProviderEvent({
                type: "turn_item.updated",
                driver: CLAUDE_PROVIDER,
                turnItem: {
                  ...artifacts.turnItem,
                  status: "cancelled",
                  completedAt: now,
                  updatedAt: now,
                },
              }),
            ],
            { concurrency: 1 },
          );
        });

        const ensureReasoningBlock = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          itemId: string,
        ) {
          if (!context.reasoning.blocks.has(itemId)) {
            context.reasoning.blocks.set(itemId, {
              startedAt: yield* DateTime.now,
              ordinal: yield* resolveItemOrdinal(context, itemId),
              text: "",
            });
          }
        });
        const reasoningDeltas = yield* makeProviderTextDeltaCoalescer({
          flushIntervalMs: 50,
          emit:
            /* Provider events include streaming deltas; avoid a span for each update. */
            Effect.fnUntraced(function* (update) {
              const context = yield* Ref.get(activeTurn);
              if (context === null || context.nativeTurnId !== update.turnId) return;
              const block = context.reasoning.blocks.get(update.itemId);
              if (block === undefined || update.text.length === 0) return;
              block.text = update.text;
              const now = yield* DateTime.now;
              yield* emitProviderEvent({
                type: "turn_item.updated",
                driver: CLAUDE_PROVIDER,
                turnItem: {
                  id: idAllocator.derive.turnItemFromProviderItem({
                    driver: CLAUDE_PROVIDER,
                    nativeItemId: update.itemId,
                  }),
                  threadId: context.input.threadId,
                  runId: context.input.runId,
                  nodeId: context.input.rootNodeId,
                  providerThreadId: context.input.providerThread.id,
                  providerTurnId: context.providerTurnId,
                  nativeItemRef: {
                    driver: CLAUDE_PROVIDER,
                    nativeId: update.itemId,
                    strength: "strong",
                  },
                  parentItemId: null,
                  ordinal: block.ordinal,
                  type: "reasoning",
                  title: "Thinking",
                  text: update.text,
                  streaming: !update.completed,
                  status: update.completed ? "completed" : "running",
                  startedAt: block.startedAt,
                  completedAt: update.completed ? now : null,
                  updatedAt: now,
                },
              });
            }),
        });

        const publishAssistantArtifacts = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext;
          readonly nativeItemId: string;
          readonly text: string;
          readonly status: "running" | "completed" | "interrupted";
          readonly startedAt: DateTime.Utc;
          readonly completedAt: DateTime.Utc;
          readonly createdAt?: DateTime.Utc;
          readonly finalAnswer?: boolean;
        }) {
          const ordinal = yield* resolveItemOrdinal(input.context, input.nativeItemId);
          const artifacts = buildAssistantArtifacts({
            idAllocator,
            turnInput: input.context.input,
            providerTurnId: input.context.providerTurnId,
            nativeItemId: input.nativeItemId,
            text: input.text,
            ordinal,
            status: input.status,
            startedAt: input.startedAt,
            completedAt: input.completedAt,
            ...(input.createdAt === undefined ? {} : { createdAt: input.createdAt }),
            ...(input.finalAnswer === undefined ? {} : { finalAnswer: input.finalAnswer }),
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
        });

        const assistantDeltas = yield* makeProviderTextDeltaCoalescer({
          flushIntervalMs: 50,
          emit:
            /* Provider events include streaming deltas; avoid a span for each update. */
            Effect.fnUntraced(function* (update) {
              const context = yield* Ref.get(activeTurn);
              if (context === null || context.nativeTurnId !== update.turnId) return;
              const item = context.assistant.streamItems.get(update.itemId);
              if (item === undefined || update.text.length === 0) return;
              context.assistant.emittedNativeItemIds.add(update.itemId);
              yield* publishAssistantArtifacts({
                context,
                nativeItemId: update.itemId,
                text: update.text,
                status: update.completed ? item.status : "running",
                startedAt: item.startedAt,
                createdAt: item.startedAt,
                completedAt: yield* DateTime.now,
              });
            }),
        });

        // Streamed text no snapshot will complete ends where the stream stopped.
        const cutOffStreamedText = Effect.fnUntraced(function* (context: ActiveClaudeTurnContext) {
          for (const item of context.assistant.streamItems.values()) item.status = "interrupted";
          yield* assistantDeltas.flushTurn(context.nativeTurnId);
        });

        const endToolCalls = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext | null;
          readonly toolCalls: ReadonlyArray<ActiveClaudeToolCall>;
          readonly status: Extract<
            OrchestrationV2ProviderTurn["status"],
            "interrupted" | "failed" | "cancelled"
          >;
          readonly completedAt: DateTime.Utc;
        }) {
          for (const toolCall of input.toolCalls) {
            yield* stopTaskOutputTail(toolCall.nativeItemId);
            yield* emitToolCallArtifacts(
              buildToolCallArtifacts({
                context: input.context,
                nativeItemId: toolCall.nativeItemId,
                toolName: toolCall.toolName,
                classification: toolCall.classification,
                toolInput: toolCall.input,
                threadId: toolCall.threadId,
                runId: toolCall.runId,
                rootNodeId: toolCall.rootNodeId,
                parentNodeId: toolCall.parentNodeId,
                ordinal: toolCall.ordinal,
                output: NO_CLAUDE_NATIVE_TOOL_OUTPUT,
                status: input.status,
                startedAt: toolCall.startedAt,
                updatedAt: input.completedAt,
                presentation: toolCall.presentation,
              }),
            );
          }
        });
        const endSubagentCallsOfClosedQuery = Effect.fnUntraced(function* (
          nativeThreadId: string,
          status: "interrupted" | "failed",
        ) {
          const settled = settledTurnByNativeThread.get(nativeThreadId);
          if (settled === undefined || subagentToolCalls.size === 0) {
            return;
          }
          yield* endToolCalls({
            context: settled,
            toolCalls: [...subagentToolCalls.values()],
            status,
            completedAt: yield* DateTime.now,
          });
          subagentToolCalls.clear();
        });

        const emitSteerStatus = (
          context: ActiveClaudeTurnContext,
          messageId: MessageId,
          status: "pending" | "completed" | "cancelled",
        ) =>
          emitProviderEvent({
            type: "steer.updated",
            driver: CLAUDE_PROVIDER,
            threadId: context.input.threadId,
            runId: context.input.runId,
            messageId,
            status,
          });

        // A held result's usage joins the steered segments once another result settles the turn.
        const absorbHeldResult = (context: ActiveClaudeTurnContext) => {
          if (context.heldResult === undefined) return;
          const { assistant } = context;
          if (assistant.fallbackText.length > 0) {
            assistant.earlierFallbackText = joinFallbackText(
              assistant.earlierFallbackText,
              assistant.fallbackText,
            );
            assistant.fallbackText = "";
          }
          context.steeredSegmentUsage.push(context.heldResult.usage);
          context.steeredLedgerUsage = addClaudeLedgerUsage(
            context.steeredLedgerUsage,
            resultLedgerUsage.get(context.heldResult),
          );
          context.heldResult = undefined;
        };

        const markSteersAccepted = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
          message: SDKMessage,
        ) {
          // Completed alone is not proof of acceptance: Claude also completes
          // prompts it never started.
          const lifecycle = claudePromptLifecycle(message);
          const accepted =
            lifecycle === null
              ? claudeEchoedPromptUuids(message)
              : lifecycle.state === "started"
                ? [lifecycle.uuid]
                : [];
          for (const uuid of accepted) {
            const steer = context.pendingSteers.get(uuid);
            if (steer === undefined) continue;
            context.pendingSteers.delete(uuid);
            // Claude now answers this steer, and that answer's result ends the turn.
            absorbHeldResult(context);
            yield* emitSteerStatus(context, steer.messageId, "completed");
          }
          // Claude removed the steer before reading it. Its item stays pending, so the orchestrator
          // sends it as the next turn once this run ends.
          const dropped =
            lifecycle !== null &&
            (lifecycle.state === "cancelled" ||
              lifecycle.state === "discarded" ||
              lifecycle.state === "refused")
              ? context.pendingSteers.get(lifecycle.uuid)
              : undefined;
          if (dropped === undefined || lifecycle === null) return;
          context.pendingSteers.delete(lifecycle.uuid);
          // The follow-up turn sends the same files and notes again.
          if (
            dropped.appContextOffered !== undefined &&
            context.appContextOffered === dropped.appContextOffered
          ) {
            context.appContextOffered = dropped.appContextBefore;
          }
          if (dropped.pdfReservation.delivered && !dropped.pdfReservation.refunded) {
            dropped.pdfReservation.refund();
            yield* persistAttachmentBudget(context.nativeThreadId);
          }
          if (context.pendingSteers.size === 0 && context.heldResult !== undefined) {
            yield* finalizeActiveTurn({
              context,
              status: "completed",
              completedAt: yield* DateTime.now,
              result: context.heldResult,
            });
          }
        });

        const finalizeActiveTurn = Effect.fnUntraced(function* (requested: {
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
          return yield* bindFinalizeActiveTurn({
            get CLAUDE_PROVIDER() {
              return CLAUDE_PROVIDER;
            },
            get activeTurn() {
              return activeTurn;
            },
            get assistantDeltas() {
              return assistantDeltas;
            },
            get awaitedBackgroundTasksByNativeThread() {
              return awaitedBackgroundTasksByNativeThread;
            },
            get buildAssistantArtifacts() {
              return buildAssistantArtifacts;
            },
            get clearNativeThreadTaskIdSet() {
              return clearNativeThreadTaskIdSet;
            },
            get clearPendingBackgroundTasksForNativeThread() {
              return clearPendingBackgroundTasksForNativeThread;
            },
            get clearUnansweredRequestWatch() {
              return clearUnansweredRequestWatch;
            },
            get connectingTurn() {
              return connectingTurn;
            },
            get cutOffStreamedText() {
              return cutOffStreamedText;
            },
            get deliveredAppContext() {
              return deliveredAppContext;
            },
            get emitProviderEvent() {
              return emitProviderEvent;
            },
            get emitSteerStatus() {
              return emitSteerStatus;
            },
            get endToolCalls() {
              return endToolCalls;
            },
            get goalCheckedTurns() {
              return goalCheckedTurns;
            },
            get goalsByNativeThread() {
              return goalsByNativeThread;
            },
            get idAllocator() {
              return idAllocator;
            },
            get interruptedTurns() {
              return interruptedTurns;
            },
            get joinFallbackText() {
              return joinFallbackText;
            },
            get liveProcessRunsBackgroundWork() {
              return liveProcessRunsBackgroundWork;
            },
            get opaqueBackgroundTaskReplayTombstonesByNativeThread() {
              return opaqueBackgroundTaskReplayTombstonesByNativeThread;
            },
            get owedWakeTasksForNativeThread() {
              return owedWakeTasksForNativeThread;
            },
            get pendingBackgroundTasksByNativeThread() {
              return pendingBackgroundTasksByNativeThread;
            },
            get providerRetries() {
              return providerRetries;
            },
            get providerTurnPayload() {
              return providerTurnPayload;
            },
            get publishedPendingBackgroundTasks() {
              return publishedPendingBackgroundTasks;
            },
            get queryContext() {
              return queryContext;
            },
            get reasoningDeltas() {
              return reasoningDeltas;
            },
            get rememberProviderThread() {
              return rememberProviderThread;
            },
            get reportStartupPhase() {
              return reportStartupPhase;
            },
            get resolveItemOrdinal() {
              return resolveItemOrdinal;
            },
            get resultLedgerUsage() {
              return resultLedgerUsage;
            },
            get rosterForNativeThread() {
              return rosterForNativeThread;
            },
            get scheduledWakeupsByNativeThread() {
              return scheduledWakeupsByNativeThread;
            },
            get session() {
              return session;
            },
            get sessionScope() {
              return sessionScope;
            },
            get sessionSubagentsByTaskId() {
              return sessionSubagentsByTaskId;
            },
            get settledTurnByNativeThread() {
              return settledTurnByNativeThread;
            },
            get subagentToolCalls() {
              return subagentToolCalls;
            },
            get taskIdSetForNativeThread() {
              return taskIdSetForNativeThread;
            },
            get updateClaudeSubagentNode() {
              return updateClaudeSubagentNode;
            },
            get wakeEligibleBackgroundTasksByNativeThread() {
              return wakeEligibleBackgroundTasksByNativeThread;
            },
          })(requested) as Effect.Effect<any, never, never>;
        });

        const emitAssistantTextArtifacts = Effect.fnUntraced(function* (input: {
          readonly context: ActiveClaudeTurnContext;
          readonly nativeItemId: string;
          readonly text: string;
        }) {
          if (input.context.assistant.emittedNativeItemIds.has(input.nativeItemId)) {
            return undefined;
          }
          input.context.assistant.emittedNativeItemIds.add(input.nativeItemId);
          const now = yield* DateTime.now;
          yield* publishAssistantArtifacts({
            ...input,
            status: "completed",
            startedAt: now,
            completedAt: now,
          });
          return now;
        });

        const endSubagentsOfClosedQuery = Effect.fnUntraced(function* (input: {
          readonly closedQuery: ClaudeLiveQueryContext;
          readonly context: ActiveClaudeTurnContext;
          readonly subagents: Iterable<readonly [string, ActiveClaudeSubagent]>;
          readonly buffered: ReadonlyArray<SDKMessage> | undefined;
          readonly interrupted: boolean;
        }) {
          for (const [taskId, subagent] of input.subagents) {
            if (
              subagent.task.status !== "running" ||
              input.closedQuery.subagentsFromEarlierProcesses.has(subagent)
            )
              continue;
            const latestLifecycle = input.buffered?.findLast(
              (
                message,
              ): message is Extract<
                SDKMessage,
                { readonly subtype: "task_started" | "task_notification" }
              > =>
                message.type === "system" &&
                (message.subtype === "task_started" || message.subtype === "task_notification") &&
                message.task_id === taskId,
            );
            const completion =
              latestLifecycle?.subtype === "task_notification" ? latestLifecycle : undefined;
            yield* updateClaudeSubagentNode({
              context: input.context,
              taskId,
              status: completion
                ? claudeTaskOutcome(completion.status)
                : input.interrupted
                  ? "cancelled"
                  : "failed",
              ...(completion === undefined
                ? {}
                : { workflowFrame: completion, result: completion.summary }),
              processExited: true,
              onlyIfRunningInRun: subagent.task.runId,
            });
          }
        });

        // A query opened while this one was closing inherited the subagents it ran, so
        // nothing else ends them. Leave the live query's own turn, roster and subagents alone.
        const endSubagentsOfReplacedQuery = Effect.fnUntraced(function* (
          closedQuery: ClaudeLiveQueryContext,
        ) {
          const context = closedQuery.lastTurn;
          if (context === null) return;
          yield* endSubagentsOfClosedQuery({
            closedQuery,
            context,
            subagents: [...(yield* Ref.get(sessionSubagentsByTaskId))].filter(([, subagent]) =>
              closedQuery.handedOffSubagents.has(subagent),
            ),
            buffered: (yield* Ref.get(wakeBuffers)).get(closedQuery.nativeThreadId)?.messages,
            interrupted:
              closedQuery.stopping ||
              (yield* Ref.get(interruptedTurns)).has(context.providerTurnId),
          });
        });

        const finalizeActiveTurnAfterQueryExit = Effect.fnUntraced(function* (
          closedQuery: ClaudeLiveQueryContext,
          cause?: Cause.Cause<ClaudeAgentSdkQueryRunnerError>,
        ) {
          const current = yield* Ref.get(activeTurn);
          // A replacement query can reuse the native thread id; only this query's turn is ours.
          const context = closedQuery.lastTurn;
          if (context === null) return;
          const interrupted =
            closedQuery.stopping || (yield* Ref.get(interruptedTurns)).has(context.providerTurnId);
          // Finalization can yield to a replacement process; capture ownership and outcomes first.
          const subagents = yield* Ref.get(sessionSubagentsByTaskId);
          const buffered = (yield* Ref.get(wakeBuffers)).get(closedQuery.nativeThreadId)?.messages;
          if (current === context) {
            yield* finalizeActiveTurn({
              context,
              status: interrupted ? "interrupted" : "failed",
              completedAt: yield* DateTime.now,
              ...(interrupted
                ? {}
                : {
                    failure: makeProviderFailure({
                      cause: cause === undefined ? undefined : Cause.squash(cause),
                      ...(cause === undefined ? {} : claudeProcessExitFailure(cause)),
                      class: "transport_error",
                    }),
                  }),
            });
          } else {
            yield* resetBackgroundTaskStateForNativeThreadProcess(closedQuery.nativeThreadId, {
              exitedUnexpectedly: !interrupted,
            });
          }
          // Preserve buffered outcomes before Stop clears the wake buffer.
          yield* endSubagentsOfClosedQuery({
            closedQuery,
            context,
            subagents,
            buffered,
            interrupted,
          });
          yield* Ref.update(interruptedTurns, (current) => {
            const next = new Set(current);
            next.delete(context.providerTurnId);
            return next;
          });
          if (cause !== undefined) {
            yield* Effect.logWarning("orchestration-v2.claude-query-stream-failed", {
              providerSessionId: input.providerSessionId,
              providerThreadId: context.input.providerThread.id,
              providerTurnId: context.providerTurnId,
              cause,
            });
          }
        });

        const applyWorkflowProgressWithoutTurn = Effect.fnUntraced(function* (message: SDKMessage) {
          if (message.type !== "system" || message.subtype !== "task_progress") return;
          if (!hasClaudeWorkflowSnapshot(message)) return;
          const taskId = message.task_id;
          const registered = (yield* Ref.get(sessionSubagentsByTaskId)).get(taskId);
          if (
            registered === undefined ||
            registered.task.workflow === undefined ||
            registered.task.status !== "running"
          )
            return;
          const workflow = mergeClaudeWorkflowProgress({
            previous: registered.task.workflow,
            message,
          });
          if (workflow === undefined) return;
          const now = yield* DateTime.now;
          const progress = text(message.description);
          const workflowWithThreads = withWorkflowMemberThreadIds(
            workflow,
            registered.childThreadId,
          );
          const task = {
            ...registered.task,
            ...(progress === undefined ? {} : { progress }),
            workflow: workflowWithThreads,
            updatedAt: now,
          } satisfies OrchestrationV2Subagent;
          const coordinator = { ...registered, task };
          const accepted = yield* Ref.modify(sessionSubagentsByTaskId, (current) => {
            const latest = current.get(taskId);
            if (latest !== registered || latest.task.status !== "running") {
              return [false, current] as const;
            }
            return [true, new Map(current).set(taskId, coordinator)] as const;
          });
          if (!accepted) return;
          yield* emitProviderEvent({
            type: "subagent.updated",
            driver: CLAUDE_PROVIDER,
            subagent: task,
          });
          yield* projectClaudeWorkflowMembers({
            coordinator,
            workflow: workflowWithThreads,
          });
        });

        const bufferWakeMessage = Effect.fnUntraced(function* (wakeInput: {
          readonly nativeThreadId: string;
          readonly message: SDKMessage;
        }) {
          return yield* bindBufferWakeMessage({
            get bufferedResultArrivals() {
              return bufferedResultArrivals;
            },
            get claudeSettledSubagentToolUseIds() {
              return claudeSettledSubagentToolUseIds;
            },
            get claudeTaskOutcome() {
              return claudeTaskOutcome;
            },
            get consumeWakeEligibilityForBufferedNotification() {
              return consumeWakeEligibilityForBufferedNotification;
            },
            get dropSettledSubagents() {
              return dropSettledSubagents;
            },
            get forgetAbsorbedWake() {
              return forgetAbsorbedWake;
            },
            get hasRunningClaudeMonitor() {
              return hasRunningClaudeMonitor;
            },
            get isClaudeEmptyTaskNotificationSuccess() {
              return isClaudeEmptyTaskNotificationSuccess;
            },
            get isClaudeNonSubagentTask() {
              return isClaudeNonSubagentTask;
            },
            get isClaudeRootTurnFrame() {
              return isClaudeRootTurnFrame;
            },
            get isClaudeTurnStartMessage() {
              return isClaudeTurnStartMessage;
            },
            get isNestedSubagentTask() {
              return isNestedSubagentTask;
            },
            get isWakeEligibleOpaqueBackgroundTaskOnNativeThread() {
              return isWakeEligibleOpaqueBackgroundTaskOnNativeThread;
            },
            get monitorEventWakeStarts() {
              return monitorEventWakeStarts;
            },
            get now() {
              return now;
            },
            get offerBufferedWake() {
              return offerBufferedWake;
            },
            get offerWakeContinuation() {
              return offerWakeContinuation;
            },
            get opaqueTaskWakeReport() {
              return opaqueTaskWakeReport;
            },
            get parentToolUseIdFromSdkMessage() {
              return parentToolUseIdFromSdkMessage;
            },
            get possibleScheduledWakeStarts() {
              return possibleScheduledWakeStarts;
            },
            get recordWakeReport() {
              return recordWakeReport;
            },
            get releaseContinuationLatch() {
              return releaseContinuationLatch;
            },
            get requestedContinuations() {
              return requestedContinuations;
            },
            get sessionSubagentsByTaskId() {
              return sessionSubagentsByTaskId;
            },
            get setRetiredLatch() {
              return setRetiredLatch;
            },
            get wakeBuffers() {
              return wakeBuffers;
            },
          })(wakeInput) as Effect.Effect<any, never, never>;
        });

        const offerWakeContinuation = Effect.fnUntraced(function* (nativeThreadId: string) {
          const route = (yield* Ref.get(lastTurnRouteByNativeThread)).get(nativeThreadId);
          if (route === undefined) {
            yield* Effect.logWarning("orchestration-v2.claude-wake-turn-unroutable", {
              providerSessionId: input.providerSessionId,
              nativeThreadId,
            });
            return;
          }
          const buffered = (yield* Ref.get(wakeBuffers)).get(nativeThreadId);
          const token = Symbol(nativeThreadId);
          // A recorded report names finished work, which outranks Monitor progress.
          const monitorEvent =
            ((yield* Ref.get(wakeReportsByNativeThread)).reports.get(nativeThreadId)?.size ?? 0) ===
              0 && isClaudeMonitorEventWake(buffered?.messages ?? []);
          const shouldOffer = yield* Ref.modify(requestedContinuations, (current) => {
            if (current.has(nativeThreadId)) {
              return [false, current] as const;
            }
            const updated = new Map(current);
            updated.set(nativeThreadId, {
              token,
              end: buffered?.messages.find(
                (entry) => entry.type === "result" && !isClaudeEmptyTaskNotificationSuccess(entry),
              ),
              retired: null,
              monitorEvent,
            });
            return [true, updated] as const;
          });
          if (!shouldOffer) {
            return;
          }
          const reports = yield* takeWakeReports(nativeThreadId);
          const notification = backgroundWorkNotification(
            monitorEvent
              ? [{ kind: "monitor", outcome: "updated" }]
              : [...(reports?.values() ?? [])].map((entry) => entry.report),
          );
          yield* Effect.logInfo("orchestration-v2.claude-wake-turn-detected", {
            providerSessionId: input.providerSessionId,
            threadId: route.threadId,
            providerThreadId: route.providerThreadId,
          });
          // A process reset can clear and re-latch this thread; a stale request must not retire the newer wake.
          const retire = (): Effect.Effect<void> =>
            sdkMessageLock.withPermits(1)(retireOfferedWake(nativeThreadId, token));
          yield* continuationRequests.offer({
            threadId: route.threadId,
            providerThreadId: route.providerThreadId,
            driver: CLAUDE_PROVIDER,
            detail: buffered?.detail ?? null,
            ...(notification === null ? {} : { notification }),
            clearIfCurrent: retire,
            onRunEndedWithoutStarting: retire,
          });
        });

        // Drops what the unstarted continuation would have shown. Starts of subagents still running stay
        // because later child frames and notifications resolve their owner from them.
        const retireOfferedWake = Effect.fnUntraced(function* (
          nativeThreadId: string,
          token: symbol,
        ) {
          const latch = (yield* Ref.get(requestedContinuations)).get(nativeThreadId);
          if (latch?.token !== token) return;
          const buffered = (yield* Ref.get(wakeBuffers)).get(nativeThreadId)?.messages;
          const messages = buffered ?? [];
          const endIndex =
            latch.end === undefined ? messages.length - 1 : messages.indexOf(latch.end);
          const retired = messages.slice(0, endIndex + 1);
          const later = messages.slice(endIndex + 1);
          const retiredTaskIds = new Set(
            retired.flatMap((entry) =>
              entry.type === "system" && entry.subtype === "task_notification"
                ? [entry.task_id]
                : [],
            ),
          );
          const settledToolUseIds = claudeSettledSubagentToolUseIds(retired);
          const kept = [
            ...retired.filter(
              (entry) =>
                entry.type === "system" &&
                entry.subtype === "task_started" &&
                !retiredTaskIds.has(entry.task_id) &&
                (entry.tool_use_id === undefined || !settledToolUseIds.has(entry.tool_use_id)),
            ),
            ...later,
          ];
          if (!(yield* replaceWakeBuffer(nativeThreadId, buffered, kept, retiredTaskIds))) return;
          for (const taskId of retiredTaskIds) {
            yield* clearPendingBackgroundTask(nativeThreadId, taskId);
            yield* clearTaskIdFromNativeThreadSet(
              wakeEligibleBackgroundTasksByNativeThread,
              nativeThreadId,
              taskId,
            );
            yield* clearOpaqueBackgroundTaskReplayTombstone(nativeThreadId, taskId);
          }
          yield* endClaudeMonitorTasks((taskId) => retiredTaskIds.has(taskId));
          const providerThread = (yield* Ref.get(lastProviderThreadByNativeThread)).get(
            nativeThreadId,
          );
          if (providerThread !== undefined)
            yield* emitProviderThreadRoster({ nativeThreadId, providerThread });
          if (latch.end === undefined) {
            // A lifecycle result closes the root frames before it without opening the wake's turn.
            const sinceLifecycleResult = retired.slice(
              retired.findLastIndex(isClaudeEmptyTaskNotificationSuccess) + 1,
            );
            yield* setRetiredLatch(
              nativeThreadId,
              sinceLifecycleResult.some(isClaudeRootTurnFrame) ? "opened" : "unopened",
            );
            return;
          }
          yield* releaseContinuationLatch(nativeThreadId);
          yield* forgetAbsorbedWake(nativeThreadId);
          yield* offerBufferedWake(nativeThreadId);
        });

        const setRetiredLatch = (nativeThreadId: string, retired: "unopened" | "opened") =>
          Ref.update(requestedContinuations, (current) => {
            const latch = current.get(nativeThreadId);
            return latch === undefined || latch.retired === retired
              ? current
              : new Map(current).set(nativeThreadId, { ...latch, retired });
          });

        // Compare-and-set: a process reset clears the buffer without the SDK message lock, and must not be undone.
        const replaceWakeBuffer = Effect.fnUntraced(function* (
          nativeThreadId: string,
          expected: ReadonlyArray<SDKMessage> | undefined,
          messages: ReadonlyArray<SDKMessage>,
          droppedTaskIds: ReadonlySet<string>,
        ) {
          const replaced = yield* Ref.modify(wakeBuffers, (current) => {
            if (current.get(nativeThreadId)?.messages !== expected)
              return [false, current] as const;
            const updated = new Map(current);
            if (messages.length === 0) updated.delete(nativeThreadId);
            else
              updated.set(nativeThreadId, { messages, detail: claudeWakeBufferDetail(messages) });
            return [true, updated] as const;
          });
          if (!replaced) return false;
          yield* Ref.update(wakeReportsByNativeThread, ({ userTurns, reports }) => {
            const threadReports = reports.get(nativeThreadId);
            if (threadReports === undefined) return { userTurns, reports };
            const remaining = new Map(
              [...threadReports].filter(([taskId]) => !droppedTaskIds.has(taskId)),
            );
            const updatedReports = new Map(reports);
            if (remaining.size === 0) updatedReports.delete(nativeThreadId);
            else updatedReports.set(nativeThreadId, remaining);
            return { userTurns, reports: updatedReports };
          });
          return true;
        });

        // A retired wake's dropped tool results still settle the subagents it kept for later frames.
        const dropSettledSubagents = Effect.fnUntraced(function* (
          nativeThreadId: string,
          settledToolUseIds: ReadonlySet<string>,
        ) {
          if (settledToolUseIds.size === 0) return;
          const buffered = (yield* Ref.get(wakeBuffers)).get(nativeThreadId)?.messages;
          const messages = buffered ?? [];
          const settledTaskIds = new Set(
            messages.flatMap((entry) =>
              entry.type === "system" &&
              entry.subtype === "task_started" &&
              entry.tool_use_id !== undefined &&
              settledToolUseIds.has(entry.tool_use_id)
                ? [entry.task_id]
                : [],
            ),
          );
          const kept = messages.filter((entry) => {
            const parentToolUseId = parentToolUseIdFromSdkMessage(entry);
            return (
              (parentToolUseId === null || !settledToolUseIds.has(parentToolUseId)) &&
              !(entry.type === "system" && "task_id" in entry && settledTaskIds.has(entry.task_id))
            );
          });
          if (kept.length === messages.length) return;
          yield* replaceWakeBuffer(nativeThreadId, buffered, kept, settledTaskIds);
        });

        // After a retired wake releases its latch, a wake buffered behind it has had no offer of its own.
        const offerBufferedWake = Effect.fnUntraced(function* (nativeThreadId: string) {
          const messages = (yield* Ref.get(wakeBuffers)).get(nativeThreadId)?.messages ?? [];
          if (yield* holdsBufferedWake(nativeThreadId, messages))
            yield* offerWakeContinuation(nativeThreadId);
        });

        const holdsBufferedWake = Effect.fnUntraced(function* (
          nativeThreadId: string,
          messages: ReadonlyArray<SDKMessage>,
        ) {
          const reports = (yield* Ref.get(wakeReportsByNativeThread)).reports.get(nativeThreadId);
          // A lifecycle result ends no turn, and closes the root frames before it.
          return (
            messages
              .slice(messages.findLastIndex(isClaudeEmptyTaskNotificationSuccess) + 1)
              .some(isClaudeRootTurnFrame) ||
            messages.some(
              (entry) =>
                (entry.type === "result" && !isClaudeEmptyTaskNotificationSuccess(entry)) ||
                (entry.type === "system" &&
                  entry.subtype === "task_notification" &&
                  reports?.get(entry.task_id)?.report.kind === "subagent"),
            )
          );
        });

        // Untraced like the roster message handling: it runs for every streamed roster change.
        const emitRosterUpdate = Effect.fnUntraced(function* (
          nativeThreadId: string,
          activeContext: ActiveClaudeTurnContext | null,
        ) {
          const baseThread =
            activeContext?.input.providerThread ??
            (yield* Ref.get(lastProviderThreadByNativeThread)).get(nativeThreadId);
          if (baseThread === undefined) {
            return;
          }
          const status =
            activeContext === null
              ? ("idle" as const)
              : baseThread.status === "idle"
                ? ("active" as const)
                : baseThread.status;
          yield* emitProviderThreadRoster({
            nativeThreadId,
            providerThread: baseThread,
            status,
          });
        });

        const backgroundTaskLaunch = (
          activeContext: ActiveClaudeTurnContext | null,
          toolUseId: string | undefined,
        ): Pick<OrchestrationV2PendingBackgroundTask, "command" | "itemId" | "sourceThreadId"> => {
          // A background subagent keeps launching shells after the root turn settles.
          const launch =
            toolUseId === undefined
              ? undefined
              : (activeContext?.toolCalls.get(toolUseId) ?? subagentToolCalls.get(toolUseId));
          const command =
            launch?.classification.itemType === "command_execution" ||
            launch?.toolName === "Monitor"
              ? firstStringInputField(launch.input, ["command"])
              : undefined;
          if (launch === undefined || command === undefined) return {};
          return {
            command,
            itemId: idAllocator.derive.turnItemFromProviderItem({
              driver: CLAUDE_PROVIDER,
              nativeItemId: launch.nativeItemId,
            }),
            sourceThreadId: launch.threadId,
          };
        };

        const applyBackgroundTaskRosterMessage = Effect.fnUntraced(function* (input: {
          readonly nativeThreadId: string;
          readonly message: SDKMessage;
          readonly activeContext: ActiveClaudeTurnContext | null;
        }) {
          return yield* bindApplyBackgroundTaskRosterMessage({
            get backgroundTaskLaunch() {
              return backgroundTaskLaunch;
            },
            get clearPendingBackgroundTask() {
              return clearPendingBackgroundTask;
            },
            get clearTaskIdFromNativeThreadSet() {
              return clearTaskIdFromNativeThreadSet;
            },
            get emitRosterUpdate() {
              return emitRosterUpdate;
            },
            get endClaudeMonitorTasks() {
              return endClaudeMonitorTasks;
            },
            get isClaudeMonitorTask() {
              return isClaudeMonitorTask;
            },
            get pendingBackgroundTasksByNativeThread() {
              return pendingBackgroundTasksByNativeThread;
            },
            get replacePendingBackgroundTasks() {
              return replacePendingBackgroundTasks;
            },
            get rosterForNativeThread() {
              return rosterForNativeThread;
            },
            get toolUseIdsByTaskId() {
              return toolUseIdsByTaskId;
            },
            get upsertPendingBackgroundTask() {
              return upsertPendingBackgroundTask;
            },
            get wakeEligibleBackgroundTasksByNativeThread() {
              return wakeEligibleBackgroundTasksByNativeThread;
            },
          })(input) as Effect.Effect<any, never, never>;
        });

        const settledTurnForSubagentFrame = Effect.fnUntraced(function* (
          nativeThreadId: string,
          message: SDKMessage,
        ) {
          const settled = settledTurnByNativeThread.get(nativeThreadId);
          if (settled === undefined) {
            return null;
          }
          const userResults = claudeToolResultBlocksFromUserMessage(message);
          if (
            message.type === "user" &&
            userResults.length > 0 &&
            userResults.length === message.message.content.length &&
            userResults.every(
              (toolResult) => findToolCall(settled, toolResult.tool_use_id) !== undefined,
            )
          ) {
            return settled;
          }
          const bufferedStarts = (
            (yield* Ref.get(wakeBuffers)).get(nativeThreadId)?.messages ?? []
          ).flatMap((entry) =>
            entry.type === "system" &&
            entry.subtype === "task_started" &&
            !isClaudeNonSubagentTask(entry)
              ? [entry]
              : [],
          );
          const parentToolUseId = parentToolUseIdFromSdkMessage(message);
          const taskId =
            message.type === "system" && message.subtype === "task_progress"
              ? message.task_id
              : parentToolUseId === null
                ? undefined
                : (yield* Ref.get(sessionSubagentTaskIdsByToolUseId)).get(parentToolUseId);
          const returnedToolUseIds = new Set(
            [...claudeToolResultBlocksFromAssistantMessage(message), ...userResults].map(
              (toolResult) => toolResult.tool_use_id,
            ),
          );
          if (
            bufferedStarts.some(
              (start) =>
                start.task_id === taskId ||
                (start.tool_use_id !== undefined &&
                  (start.tool_use_id === parentToolUseId ||
                    returnedToolUseIds.has(start.tool_use_id))),
            )
          ) {
            return null;
          }
          if (taskId === undefined) {
            return parentToolUseId === null ? null : settled;
          }
          if (
            returnedToolUseIds.size > 0 &&
            bufferedStarts.some((start) => start.tool_use_id === undefined)
          ) {
            return null;
          }
          const subagent = (yield* Ref.get(sessionSubagentsByTaskId)).get(taskId);
          return subagent?.task.status === "running" ? settled : null;
        });

        const handleSdkMessageFrame = Effect.fnUntraced(function* (input: {
          readonly query: ClaudeAgentSdkQuerySession;
          readonly message: SDKMessage;
          readonly replayed?: boolean;
        }) {
          return yield* bindHandleSdkMessageFrame({
            get CLAUDE_PROVIDER() {
              return CLAUDE_PROVIDER;
            },
            get CLAUDE_TASK_TOOL_NAMES() {
              return CLAUDE_TASK_TOOL_NAMES;
            },
            get EMPTY_CLAUDE_NATIVE_TOOL_INPUT() {
              return EMPTY_CLAUDE_NATIVE_TOOL_INPUT;
            },
            get PENDING_CLAUDE_SUBAGENT_CAP() {
              return PENDING_CLAUDE_SUBAGENT_CAP;
            },
            get PENDING_CLAUDE_SUBAGENT_FRAME_CAP() {
              return PENDING_CLAUDE_SUBAGENT_FRAME_CAP;
            },
            get absorbHeldResult() {
              return absorbHeldResult;
            },
            get activeTurn() {
              return activeTurn;
            },
            get adapterOptions() {
              return adapterOptions;
            },
            get announceMcpSignIns() {
              return announceMcpSignIns;
            },
            get appliedSessionTitles() {
              return appliedSessionTitles;
            },
            get appliedSubagentOutcomes() {
              return appliedSubagentOutcomes;
            },
            get applyBackgroundTaskRosterMessage() {
              return applyBackgroundTaskRosterMessage;
            },
            get applyClaudeTaskTool() {
              return applyClaudeTaskTool;
            },
            get applyWorkflowProgressWithoutTurn() {
              return applyWorkflowProgressWithoutTurn;
            },
            get assistantDeltas() {
              return assistantDeltas;
            },
            get assistantTextFromSdkMessage() {
              return assistantTextFromSdkMessage;
            },
            get backgroundedSubagentTaskIds() {
              return backgroundedSubagentTaskIds;
            },
            get bufferWakeMessage() {
              return bufferWakeMessage;
            },
            get bufferedResultArrivals() {
              return bufferedResultArrivals;
            },
            get canonicalClaudeSubagentModel() {
              return canonicalClaudeSubagentModel;
            },
            get captureClaudeMcpApp() {
              return captureClaudeMcpApp;
            },
            get claudeEchoedPromptUuids() {
              return claudeEchoedPromptUuids;
            },
            get claudeFocusRequestedPanePlugin() {
              return claudeFocusRequestedPanePlugin;
            },
            get claudeForkedSkillToolUseId() {
              return claudeForkedSkillToolUseId;
            },
            get claudeMessageInputTokens() {
              return claudeMessageInputTokens;
            },
            get claudeNativeToolInputFromUnknown() {
              return claudeNativeToolInputFromUnknown;
            },
            get claudeNativeToolInputValue() {
              return claudeNativeToolInputValue;
            },
            get claudeNativeToolOutputValue() {
              return claudeNativeToolOutputValue;
            },
            get claudePromptLifecycle() {
              return claudePromptLifecycle;
            },
            get claudeRewrittenVersion() {
              return claudeRewrittenVersion;
            },
            get claudeSubagentResultText() {
              return claudeSubagentResultText;
            },
            get claudeTaskField() {
              return claudeTaskField;
            },
            get claudeTaskOutcome() {
              return claudeTaskOutcome;
            },
            get claudeTaskSteps() {
              return claudeTaskSteps;
            },
            get claudeTaskTypeFromSdkMessage() {
              return claudeTaskTypeFromSdkMessage;
            },
            get claudeTodoSteps() {
              return claudeTodoSteps;
            },
            get claudeToolNonExecutionKind() {
              return claudeToolNonExecutionKind;
            },
            get claudeToolPresentationsFromAssistantMessage() {
              return claudeToolPresentationsFromAssistantMessage;
            },
            get claudeToolResultEntriesFromMessage() {
              return claudeToolResultEntriesFromMessage;
            },
            get claudeToolResultSettlesSubagent() {
              return claudeToolResultSettlesSubagent;
            },
            get claudeToolUseBlocksFromAssistantMessage() {
              return claudeToolUseBlocksFromAssistantMessage;
            },
            get claudeUsageLimitResetAt() {
              return claudeUsageLimitResetAt;
            },
            get claudeWritesUpdatesAsThinking() {
              return claudeWritesUpdatesAsThinking;
            },
            get clearOpaqueBackgroundTaskReplayTombstone() {
              return clearOpaqueBackgroundTaskReplayTombstone;
            },
            get clearUnansweredRequestWatch() {
              return clearUnansweredRequestWatch;
            },
            get clearWakeReports() {
              return clearWakeReports;
            },
            get completeProviderRetry() {
              return completeProviderRetry;
            },
            get connectingTurn() {
              return connectingTurn;
            },
            get cutOffStreamedText() {
              return cutOffStreamedText;
            },
            get deliveredAppContext() {
              return deliveredAppContext;
            },
            get describeClaudeUsageLimit() {
              return describeClaudeUsageLimit;
            },
            get discardBufferedSubagentStarts() {
              return discardBufferedSubagentStarts;
            },
            get emitAssistantTextArtifacts() {
              return emitAssistantTextArtifacts;
            },
            get emitClaudePlanProjection() {
              return emitClaudePlanProjection;
            },
            get emitContextUsage() {
              return emitContextUsage;
            },
            get emitProviderEvent() {
              return emitProviderEvent;
            },
            get emitSubagentConversationMessage() {
              return emitSubagentConversationMessage;
            },
            get emitSubagentThinking() {
              return emitSubagentThinking;
            },
            get ensureReasoningBlock() {
              return ensureReasoningBlock;
            },
            get ensureToolCallStarted() {
              return ensureToolCallStarted;
            },
            get failExpiredProviderRetry() {
              return failExpiredProviderRetry;
            },
            get failUnansweredRequest() {
              return failUnansweredRequest;
            },
            get fileSystem() {
              return fileSystem;
            },
            get finalizeActiveTurn() {
              return finalizeActiveTurn;
            },
            get findToolCall() {
              return findToolCall;
            },
            get followForkedSkillTranscript() {
              return followForkedSkillTranscript;
            },
            get forkedSkillToolUseIdsByTaskId() {
              return forkedSkillToolUseIdsByTaskId;
            },
            get forkedSkillTranscripts() {
              return forkedSkillTranscripts;
            },
            get hasPendingBackgroundTaskOnNativeThread() {
              return hasPendingBackgroundTaskOnNativeThread;
            },
            get heldProposedPlansByToolUseId() {
              return heldProposedPlansByToolUseId;
            },
            get idAllocator() {
              return idAllocator;
            },
            get interruptedTurns() {
              return interruptedTurns;
            },
            get isClaudeActiveSteeringAbortResult() {
              return isClaudeActiveSteeringAbortResult;
            },
            get isClaudeBackgroundTasksChangedMessage() {
              return isClaudeBackgroundTasksChangedMessage;
            },
            get isClaudeBlockedAssistantRateLimit() {
              return isClaudeBlockedAssistantRateLimit;
            },
            get isClaudeGoalAcknowledgement() {
              return isClaudeGoalAcknowledgement;
            },
            get isClaudeLocalCommandEcho() {
              return isClaudeLocalCommandEcho;
            },
            get isClaudeNonSubagentTask() {
              return isClaudeNonSubagentTask;
            },
            get isClaudeProviderContinuationTurn() {
              return isClaudeProviderContinuationTurn;
            },
            get isClaudeTaskNotificationOriginResult() {
              return isClaudeTaskNotificationOriginResult;
            },
            get isClaudeToolResultError() {
              return isClaudeToolResultError;
            },
            get isKnownOpaqueBackgroundTaskOnNativeThread() {
              return isKnownOpaqueBackgroundTaskOnNativeThread;
            },
            get isNestedSubagentTask() {
              return isNestedSubagentTask;
            },
            get markAbsorbedWake() {
              return markAbsorbedWake;
            },
            get mergeClaudeStreamUsage() {
              return mergeClaudeStreamUsage;
            },
            get modelCatalog() {
              return modelCatalog;
            },
            get nestedSubagentTaskIds() {
              return nestedSubagentTaskIds;
            },
            get normalizeClaudeResultText() {
              return normalizeClaudeResultText;
            },
            get normalizeClaudeSessionTitle() {
              return normalizeClaudeSessionTitle;
            },
            get now() {
              return now;
            },
            get opaqueTaskWakeReport() {
              return opaqueTaskWakeReport;
            },
            get optionalClaudeUsageTokenCount() {
              return optionalClaudeUsageTokenCount;
            },
            get parentToolUseIdFromSdkMessage() {
              return parentToolUseIdFromSdkMessage;
            },
            get path() {
              return path;
            },
            get pdfBudgets() {
              return pdfBudgets;
            },
            get pendingSubagentFramesByToolUseId() {
              return pendingSubagentFramesByToolUseId;
            },
            get pendingSubagentLaunchesByToolUseId() {
              return pendingSubagentLaunchesByToolUseId;
            },
            get persistAttachmentBudget() {
              return persistAttachmentBudget;
            },
            get providerFailureFromApiRetry() {
              return providerFailureFromApiRetry;
            },
            get providerFailureFromResult() {
              return providerFailureFromResult;
            },
            get providerRetries() {
              return providerRetries;
            },
            get publishAssistantArtifacts() {
              return publishAssistantArtifacts;
            },
            get queryContext() {
              return queryContext;
            },
            get readClaudeTaskList() {
              return readClaudeTaskList;
            },
            get reasoningDeltas() {
              return reasoningDeltas;
            },
            get recordWakeReport() {
              return recordWakeReport;
            },
            get recoverResumedClaudeSubagent() {
              return recoverResumedClaudeSubagent;
            },
            get rememberClaudeSubagentLaunch() {
              return rememberClaudeSubagentLaunch;
            },
            get rememberPendingClaudeSubagentLaunch() {
              return rememberPendingClaudeSubagentLaunch;
            },
            get reportStartupPhase() {
              return reportStartupPhase;
            },
            get requestedQueries() {
              return requestedQueries;
            },
            get resolveItemOrdinal() {
              return resolveItemOrdinal;
            },
            get resolveSubagentByToolUseId() {
              return resolveSubagentByToolUseId;
            },
            get resultLedgerUsage() {
              return resultLedgerUsage;
            },
            get resultTextFromSdkMessage() {
              return resultTextFromSdkMessage;
            },
            get resultsReportingNewContextWindow() {
              return resultsReportingNewContextWindow;
            },
            get sessionScope() {
              return sessionScope;
            },
            get sessionSubagentTaskIdsByToolUseId() {
              return sessionSubagentTaskIdsByToolUseId;
            },
            get sessionSubagentsByTaskId() {
              return sessionSubagentsByTaskId;
            },
            get settleToolCall() {
              return settleToolCall;
            },
            get settledTurnByNativeThread() {
              return settledTurnByNativeThread;
            },
            get settledTurnForSubagentFrame() {
              return settledTurnForSubagentFrame;
            },
            get steeredTurns() {
              return steeredTurns;
            },
            get subagentProjectionTarget() {
              return subagentProjectionTarget;
            },
            get subagentStopOutcomes() {
              return subagentStopOutcomes;
            },
            get taskListsByNativeThread() {
              return taskListsByNativeThread;
            },
            get taskOutputTails() {
              return taskOutputTails;
            },
            get terminalStatusFromResult() {
              return terminalStatusFromResult;
            },
            get toolCallsFor() {
              return toolCallsFor;
            },
            get toolNameFromClaudeToolResult() {
              return toolNameFromClaudeToolResult;
            },
            get trackClaudeGoal() {
              return trackClaudeGoal;
            },
            get trackClaudeMonitorCalls() {
              return trackClaudeMonitorCalls;
            },
            get trackClaudeScheduledWakeup() {
              return trackClaudeScheduledWakeup;
            },
            get transcriptModel() {
              return transcriptModel;
            },
            get updateClaudeSubagentNode() {
              return updateClaudeSubagentNode;
            },
            get wakeBuffers() {
              return wakeBuffers;
            },
            get withoutForgedMcpApp() {
              return withoutForgedMcpApp;
            },
          })(input) as Effect.Effect<any, never, never>;
        });

        const takeReleasableSubagentFrames = Effect.fnUntraced(function* (message: SDKMessage) {
          if (
            message.type !== "system" ||
            (message.subtype !== "task_started" &&
              message.subtype !== "task_progress" &&
              message.subtype !== "task_notification") ||
            message.tool_use_id === undefined ||
            !(yield* Ref.get(sessionSubagentsByTaskId)).has(message.task_id)
          ) {
            return [];
          }
          const toolUseId = message.tool_use_id;
          const taskId = message.task_id;
          yield* Ref.update(sessionSubagentTaskIdsByToolUseId, (current) =>
            current.get(toolUseId) === taskId ? current : new Map(current).set(toolUseId, taskId),
          );
          return yield* Ref.modify(pendingSubagentFramesByToolUseId, (current) => {
            const frames = current.get(toolUseId);
            if (frames === undefined) {
              return [[] as ReadonlyArray<SDKMessage>, current] as const;
            }
            const next = new Map(current);
            next.delete(toolUseId);
            return [frames, next] as const;
          });
        });

        const routeSdkMessage = Effect.fnUntraced(function* (input: {
          readonly query: ClaudeAgentSdkQuerySession;
          readonly message: SDKMessage;
        }) {
          if (input.message.type !== "system" || input.message.subtype !== "task_started") {
            for (const message of yield* takeReleasableSubagentFrames(input.message)) {
              yield* handleSdkMessageFrame({ query: input.query, message, replayed: true });
            }
          }
          yield* handleSdkMessageFrame(input);
          for (const message of yield* takeReleasableSubagentFrames(input.message)) {
            yield* handleSdkMessageFrame({ query: input.query, message, replayed: true });
          }
        });

        const handleRoutedSdkMessage = Effect.fnUntraced(function* (input: {
          readonly query: ClaudeAgentSdkQuerySession;
          readonly message: SDKMessage;
        }) {
          const parentToolUseId = Reflect.get(input.message, "parent_tool_use_id");
          // The fork's frames end where the root turn resumes; a system frame (init) can come between.
          const forkFramesDone =
            input.message.type === "result" ||
            (input.message.type !== "system" && isClaudeRootTurnFrame(input.message));
          for (const [toolUseId, notification] of heldForkedSkillNotifications) {
            if (!forkFramesDone) break;
            heldForkedSkillNotifications.delete(toolUseId);
            forkedSkillTranscripts.delete(toolUseId);
            yield* routeSdkMessage({ query: input.query, message: notification });
          }
          if (input.message.type === "system" && input.message.subtype === "task_notification") {
            const forkedSkillToolUseId = forkedSkillToolUseIdsByTaskId.get(input.message.task_id);
            if (
              forkedSkillToolUseId !== undefined &&
              !heldForkedSkillNotifications.has(forkedSkillToolUseId)
            ) {
              // Read the rest of the transcript, including the report, before the fork can settle.
              const transcript = forkedSkillTranscripts.get(forkedSkillToolUseId);
              if (transcript !== undefined) {
                yield* Deferred.succeed(transcript.finish, undefined);
                yield* Fiber.join(transcript.fiber);
              }
              heldForkedSkillNotifications.set(forkedSkillToolUseId, input.message);
              return;
            }
          }
          const uuid = text(field(input.message, "uuid"));
          if (
            typeof parentToolUseId === "string" &&
            uuid !== undefined &&
            forkedSkillTranscripts.get(parentToolUseId)?.shownUuids.has(uuid) === true
          ) {
            return;
          }
          yield* routeSdkMessage(input);
        });

        const heldToolUseIds = (context: ActiveClaudeTurnContext): ReadonlySet<string> =>
          new Set(
            context.heldRootFrames.flatMap((frame) =>
              parentToolUseIdFromSdkMessage(frame) === null
                ? claudeToolUseBlocksFromAssistantMessage(frame).map((toolUse) => toolUse.id)
                : [],
            ),
          );

        const releaseHeldRootFrames = Effect.fnUntraced(function* (
          context: ActiveClaudeTurnContext,
        ) {
          context.promptEcho = "confirmed";
          const liveQuery = yield* Ref.get(queryContext);
          const held = context.heldRootFrames.splice(0);
          if (liveQuery === null) {
            return;
          }
          for (const message of held) {
            yield* handleRoutedSdkMessage({ query: liveQuery.query, message });
          }
        });

        const handleSdkMessage = Effect.fnUntraced(function* (input: {
          readonly query: ClaudeAgentSdkQuerySession;
          readonly message: SDKMessage;
        }) {
          return yield* bindHandleSdkMessage({
            get activeTurn() {
              return activeTurn;
            },
            get bufferWakeMessage() {
              return bufferWakeMessage;
            },
            get clearWakeReports() {
              return clearWakeReports;
            },
            get completeProviderRetry() {
              return completeProviderRetry;
            },
            get finalizeActiveTurn() {
              return finalizeActiveTurn;
            },
            get handleRoutedSdkMessage() {
              return handleRoutedSdkMessage;
            },
            get heldToolUseIds() {
              return heldToolUseIds;
            },
            get markSteersAccepted() {
              return markSteersAccepted;
            },
            get queryContext() {
              return queryContext;
            },
            get releaseHeldRootFrames() {
              return releaseHeldRootFrames;
            },
          })(input) as Effect.Effect<any, never, never>;
        });

        const canUseToolEffect = Effect.fn("ClaudeAdapterV2.canUseTool")(function* (
          toolName: Parameters<CanUseTool>[0],
          toolInput: Parameters<CanUseTool>[1],
          callbackOptions: Parameters<CanUseTool>[2],
          options?: { readonly startToolCall?: boolean },
        ) {
          return yield* bindCanUseToolEffect({
            get CLAUDE_PROVIDER() {
              return CLAUDE_PROVIDER;
            },
            get activeTurn() {
              return activeTurn;
            },
            get awaitClaudeApprovalDecision() {
              return awaitClaudeApprovalDecision;
            },
            get awaitClaudeUserInputAnswers() {
              return awaitClaudeUserInputAnswers;
            },
            get buildApprovalRequestArtifacts() {
              return buildApprovalRequestArtifacts;
            },
            get cancelWithdrawnRequest() {
              return cancelWithdrawnRequest;
            },
            get claudeApprovalPresentation() {
              return claudeApprovalPresentation;
            },
            get claudeNativeToolInputFromRecord() {
              return claudeNativeToolInputFromRecord;
            },
            get claudeProposedPlan() {
              return claudeProposedPlan;
            },
            get claudeSdkUserInputAnswers() {
              return claudeSdkUserInputAnswers;
            },
            get claudeUserInputQuestions() {
              return claudeUserInputQuestions;
            },
            get emitClaudePlanProjection() {
              return emitClaudePlanProjection;
            },
            get emitProviderEvent() {
              return emitProviderEvent;
            },
            get ensureToolCallStarted() {
              return ensureToolCallStarted;
            },
            get heldProposedPlansByToolUseId() {
              return heldProposedPlansByToolUseId;
            },
            get heldToolUseIds() {
              return heldToolUseIds;
            },
            get inputRecordValue() {
              return inputRecordValue;
            },
            get modelCatalog() {
              return modelCatalog;
            },
            get pendingRuntimeRequests() {
              return pendingRuntimeRequests;
            },
            get pendingSubagentLaunchesByToolUseId() {
              return pendingSubagentLaunchesByToolUseId;
            },
            get permissionResultFromDecision() {
              return permissionResultFromDecision;
            },
            get providerRequestKindFromClaudeTool() {
              return providerRequestKindFromClaudeTool;
            },
            get queryContext() {
              return queryContext;
            },
            get releaseHeldRootFrames() {
              return releaseHeldRootFrames;
            },
            get rememberClaudeSubagentLaunch() {
              return rememberClaudeSubagentLaunch;
            },
            get requiresClaudeApproval() {
              return requiresClaudeApproval;
            },
            get summarizeClaudeToolRequest() {
              return summarizeClaudeToolRequest;
            },
          })(toolName, toolInput, callbackOptions, options) as Effect.Effect<any, never, never>;
        });

        const canUseTool: CanUseTool = (toolName, toolInput, callbackOptions) =>
          runPromise(canUseToolEffect(toolName, toolInput, callbackOptions));

        const onElicitationEffect = Effect.fn("ClaudeAdapterV2.onElicitation")(function* (
          request: ElicitationRequest,
          callbackOptions: Parameters<NonNullable<ClaudeQueryOptions["onElicitation"]>>[1],
        ) {
          return yield* bindOnElicitationEffect({
            get CLAUDE_MCP_ELICITATION_OPTIONS() {
              return CLAUDE_MCP_ELICITATION_OPTIONS;
            },
            get CLAUDE_PROVIDER() {
              return CLAUDE_PROVIDER;
            },
            get CLAUDE_T3_MCP_SERVER() {
              return CLAUDE_T3_MCP_SERVER;
            },
            get activeTurn() {
              return activeTurn;
            },
            get buildApprovalRequestArtifacts() {
              return buildApprovalRequestArtifacts;
            },
            get claudeMcpElicitationAcceptance() {
              return claudeMcpElicitationAcceptance;
            },
            get emitProviderEvent() {
              return emitProviderEvent;
            },
            get mcpElicitationSessionGrants() {
              return mcpElicitationSessionGrants;
            },
            get mcpSessions() {
              return mcpSessions;
            },
            get now() {
              return now;
            },
            get pendingRuntimeRequests() {
              return pendingRuntimeRequests;
            },
            get releaseHeldRootFrames() {
              return releaseHeldRootFrames;
            },
          })(request, callbackOptions) as Effect.Effect<any, never, never>;
        });

        const onElicitation: NonNullable<ClaudeQueryOptions["onElicitation"]> = (
          request,
          callbackOptions,
        ) => runPromise(onElicitationEffect(request, callbackOptions));

        const onUserDialog: NonNullable<ClaudeQueryOptions["onUserDialog"]> = bindOnUserDialog({
          get adapterOptions() {
            return adapterOptions;
          },
          get canUseToolEffect() {
            return canUseToolEffect;
          },
          get runPromise() {
            return runPromise;
          },
          get serverSettings() {
            return serverSettings;
          },
          get startToolCall() {
            return startToolCall;
          },
        });

        const liveProcessRunsBackgroundWork = Effect.fnUntraced(function* (
          live: ClaudeLiveQueryContext,
          options?: { readonly forGoalCheck?: boolean },
        ) {
          if (
            rosterForNativeThread(
              yield* Ref.get(pendingBackgroundTasksByNativeThread),
              live.nativeThreadId,
            ).size > 0
          ) {
            return true;
          }
          const buffered = (yield* Ref.get(wakeBuffers)).get(live.nativeThreadId)?.messages ?? [];
          for (const [taskId, subagent] of yield* Ref.get(sessionSubagentsByTaskId)) {
            if (
              subagent.task.status === "running" &&
              !live.subagentsFromEarlierProcesses.has(subagent) &&
              (options?.forGoalCheck !== true ||
                subagent.nativeTaskType === undefined ||
                CLAUDE_GOAL_DEFERRING_TASK_TYPES.has(subagent.nativeTaskType)) &&
              !buffered.some(
                (message) =>
                  message.type === "system" &&
                  message.subtype === "task_notification" &&
                  message.task_id === taskId,
              )
            ) {
              return true;
            }
          }
          return false;
        });

        const claudeProjectsDir = Effect.gen(function* () {
          const configuredDir = adapterOptions.environment.CLAUDE_CONFIG_DIR?.trim() ?? "";
          return path.join(
            configuredDir.length > 0
              ? path.resolve(session.cwd, configuredDir)
              : path.join(yield* HostProcess.HomeDirectory, ".claude"),
            "projects",
          );
        });

        const locateClaudeTranscript = Effect.fnUntraced(function* (nativeThreadId: string) {
          const projectsDir = yield* claudeProjectsDir;
          let newest: { readonly path: string; readonly mtime: number } | undefined;
          for (const project of yield* fileSystem.readDirectory(projectsDir)) {
            const candidate = path.join(projectsDir, project, `${nativeThreadId}.jsonl`);
            const info = yield* fileSystem.stat(candidate).pipe(Effect.option);
            if (Option.isNone(info) || info.value.type !== "File") continue;
            const mtime = Option.getOrUndefined(info.value.mtime)?.getTime() ?? 0;
            if (newest === undefined || mtime > newest.mtime) newest = { path: candidate, mtime };
          }
          return newest?.path;
        });

        // A failed read keeps the process: replacing it is only right when the file proves a miss.
        const liveProcessMissedTranscriptMessages = Effect.fn(
          "ClaudeAdapterV2.liveProcessMissedTranscriptMessages",
        )(
          function* (live: ClaudeLiveQueryContext) {
            if (live.emittedMessageUuids.size === 0) return false;
            live.transcriptPath ??= yield* locateClaudeTranscript(live.nativeThreadId);
            const transcriptPath = live.transcriptPath;
            if (transcriptPath === undefined) return false;
            const readTail = (maxBytes: number) =>
              Effect.scoped(
                Effect.gen(function* () {
                  const handle = yield* fileSystem.open(transcriptPath, { flag: "r" });
                  const size = Number((yield* handle.stat).size);
                  const start = Math.max(0, size - maxBytes);
                  yield* handle.seek(BigInt(start), "start");
                  const bytes = yield* handle.readAlloc(size - start);
                  const lines = (
                    Option.isSome(bytes) ? new TextDecoder().decode(bytes.value) : ""
                  ).split("\n");
                  // The last piece is empty or a line Claude is still writing; a cut tail starts
                  // mid-line.
                  lines.pop();
                  if (start > 0) lines.shift();
                  return { lines, wholeFile: start === 0 };
                }),
              );
            for (const maxBytes of [
              CLAUDE_TRANSCRIPT_TAIL_BYTES,
              CLAUDE_TRANSCRIPT_WIDE_TAIL_BYTES,
            ]) {
              const tail = yield* readTail(maxBytes);
              const missed = claudeTranscriptHasUnseenMessages(
                tail.lines,
                live.emittedMessageUuids,
              );
              if (missed !== undefined) return missed;
              if (tail.wholeFile) break;
            }
            return false;
          },
          Effect.orElseSucceed(() => false),
        );

        const routedCatalogFor = (live: ClaudeLiveQueryContext) =>
          routeModelCatalog(modelCatalog, live.settingsCwd, live.launchArgSettings);

        const applySelectionLive = Effect.fnUntraced(function* (
          live: ClaudeLiveQueryContext,
          selection: CompiledClaudeModelSelection,
        ) {
          // Preserve launcher-selected models unless the model changed or a failed update left it unknown.
          yield* (
            live.selection.queryIdentity === "" ||
            live.selection.apiModelId !== selection.apiModelId
              ? live.query.setModel(selection.apiModelId)
              : Effect.void
          ).pipe(
            Effect.andThen(
              live.query.applyFlagSettings(claudeLiveSelectionFlagSettings(selection)),
            ),
            Effect.tapError(() =>
              Effect.sync(() => {
                live.selection = { ...live.selection, queryIdentity: "" };
              }),
            ),
          );
          live.selection = selection;
        });

        const openQuery = Effect.fnUntraced(function* (
          turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
          nativeThreadId: string,
          queryPolicy: Effect.Success<ReturnType<typeof queryPolicyForTurn>>,
        ) {
          return yield* bindOpenQuery({
            get CLAUDE_CODE_PRESET_TOOLS() {
              return CLAUDE_CODE_PRESET_TOOLS;
            },
            get ClaudeAgentSdkQueryRunnerError() {
              return ClaudeAgentSdkQueryRunnerError;
            },
            get ClaudeBackgroundWorkBlocksQueryReplacementError() {
              return ClaudeBackgroundWorkBlocksQueryReplacementError;
            },
            get activeTurn() {
              return activeTurn;
            },
            get adapterOptions() {
              return adapterOptions;
            },
            get announceAutoFallback() {
              return announceAutoFallback;
            },
            get announcedMcpSignIns() {
              return announcedMcpSignIns;
            },
            get appliedSessionTitles() {
              return appliedSessionTitles;
            },
            get applySelectionLive() {
              return applySelectionLive;
            },
            get attachmentsDir() {
              return attachmentsDir;
            },
            get canApplyClaudeSelectionLive() {
              return canApplyClaudeSelectionLive;
            },
            get canUseTool() {
              return canUseTool;
            },
            get claudeEffectiveQueryPolicyKey() {
              return claudeEffectiveQueryPolicyKey;
            },
            get claudeMcpQueryOverrides() {
              return claudeMcpQueryOverrides;
            },
            get claudeQueryEnvironment() {
              return claudeQueryEnvironment;
            },
            get claudeSdkLaunchArgSettings() {
              return claudeSdkLaunchArgSettings;
            },
            get clearWakeStateForNativeThread() {
              return clearWakeStateForNativeThread;
            },
            get clearedNativeSessions() {
              return clearedNativeSessions;
            },
            get endSubagentCallsOfClosedQuery() {
              return endSubagentCallsOfClosedQuery;
            },
            get endSubagentsOfReplacedQuery() {
              return endSubagentsOfReplacedQuery;
            },
            get fileSystem() {
              return fileSystem;
            },
            get finalizeActiveTurnAfterQueryExit() {
              return finalizeActiveTurnAfterQueryExit;
            },
            get getNativeConversationHeadId() {
              return getNativeConversationHeadId;
            },
            get goalsByNativeThread() {
              return goalsByNativeThread;
            },
            get handleSdkMessage() {
              return handleSdkMessage;
            },
            get holdsBufferedWake() {
              return holdsBufferedWake;
            },
            get hostPlatform() {
              return hostPlatform;
            },
            get input() {
              return input;
            },
            get isClaudeConversationNotFound() {
              return isClaudeConversationNotFound;
            },
            get isClaudeProviderContinuationTurn() {
              return isClaudeProviderContinuationTurn;
            },
            get liveProcessMissedTranscriptMessages() {
              return liveProcessMissedTranscriptMessages;
            },
            get liveProcessRunsBackgroundWork() {
              return liveProcessRunsBackgroundWork;
            },
            get makeClaudeQueryOptions() {
              return makeClaudeQueryOptions;
            },
            get mcpSessions() {
              return mcpSessions;
            },
            get mcpSignInKey() {
              return mcpSignInKey;
            },
            get missingNativeThreads() {
              return missingNativeThreads;
            },
            get modelCatalog() {
              return modelCatalog;
            },
            get onElicitation() {
              return onElicitation;
            },
            get onUserDialog() {
              return onUserDialog;
            },
            get openedNativeThreads() {
              return openedNativeThreads;
            },
            get path() {
              return path;
            },
            get promptSuggestionsEnabled() {
              return promptSuggestionsEnabled;
            },
            get queryContext() {
              return queryContext;
            },
            get queryPolicyForTurn() {
              return queryPolicyForTurn;
            },
            get queryRunner() {
              return queryRunner;
            },
            get readClaudeAppendSystemPromptFile() {
              return readClaudeAppendSystemPromptFile;
            },
            get readClaudeLaunchArgSettings() {
              return readClaudeLaunchArgSettings;
            },
            get readProgram() {
              return readProgram;
            },
            get releaseHeldRootFrames() {
              return releaseHeldRootFrames;
            },
            get reportStartupPhase() {
              return reportStartupPhase;
            },
            get reportedContextWindows() {
              return reportedContextWindows;
            },
            get resetBackgroundTaskStateForNativeThreadProcess() {
              return resetBackgroundTaskStateForNativeThreadProcess;
            },
            get resolveSubagentPromptCacheTtl() {
              return resolveSubagentPromptCacheTtl;
            },
            get resolveToolSearchOverride() {
              return resolveToolSearchOverride;
            },
            get resultLedgerUsage() {
              return resultLedgerUsage;
            },
            get resultsReportingNewContextWindow() {
              return resultsReportingNewContextWindow;
            },
            get routeModelCatalog() {
              return routeModelCatalog;
            },
            get runPromise() {
              return runPromise;
            },
            get sandboxPolicyKindForClaudeRuntimePolicy() {
              return sandboxPolicyKindForClaudeRuntimePolicy;
            },
            get scheduledWakeupsByNativeThread() {
              return scheduledWakeupsByNativeThread;
            },
            get sdkMessageLock() {
              return sdkMessageLock;
            },
            get sessionScope() {
              return sessionScope;
            },
            get sessionSubagentsByTaskId() {
              return sessionSubagentsByTaskId;
            },
            get wakeBuffers() {
              return wakeBuffers;
            },
          })(turnInput, nativeThreadId, queryPolicy) as Effect.Effect<any, never, never>;
        });

        const startTurn = Effect.fn("ClaudeAdapterV2.startTurn")(
          function* (turnInput: ProviderAdapter.ProviderAdapterV2TurnInput) {
            return yield* bindStartTurn({
              get absorbedWakes() {
                return absorbedWakes;
              },
              get activeTurn() {
                return activeTurn;
              },
              get announceAutoFallback() {
                return announceAutoFallback;
              },
              get announcedBypassDowngrades() {
                return announcedBypassDowngrades;
              },
              get appliedSessionTitles() {
                return appliedSessionTitles;
              },
              get applySessionTitle() {
                return applySessionTitle;
              },
              get attachmentsDir() {
                return attachmentsDir;
              },
              get deliveredAppContext() {
                return deliveredAppContext;
              },
              get emitProviderEvent() {
                return emitProviderEvent;
              },
              get fileSystem() {
                return fileSystem;
              },
              get finalizeActiveTurn() {
                return finalizeActiveTurn;
              },
              get forgetAbsorbedWake() {
                return forgetAbsorbedWake;
              },
              get goalsByNativeThread() {
                return goalsByNativeThread;
              },
              get handleSdkMessage() {
                return handleSdkMessage;
              },
              get holdsBufferedWake() {
                return holdsBufferedWake;
              },
              get idAllocator() {
                return idAllocator;
              },
              get input() {
                return input;
              },
              get interruptedTurns() {
                return interruptedTurns;
              },
              get lastTurnRouteByNativeThread() {
                return lastTurnRouteByNativeThread;
              },
              get loadModelCatalog() {
                return loadModelCatalog;
              },
              get modelCatalog() {
                return modelCatalog;
              },
              get offerBufferedWake() {
                return offerBufferedWake;
              },
              get opaqueBackgroundTaskReplayTombstonesByNativeThread() {
                return opaqueBackgroundTaskReplayTombstonesByNativeThread;
              },
              get openQuery() {
                return openQuery;
              },
              get owedWakeTasksForNativeThread() {
                return owedWakeTasksForNativeThread;
              },
              get path() {
                return path;
              },
              get pdfBudgets() {
                return pdfBudgets;
              },
              get persistAttachmentBudget() {
                return persistAttachmentBudget;
              },
              get providerTurnPayload() {
                return providerTurnPayload;
              },
              get queryContext() {
                return queryContext;
              },
              get queryPolicyForTurn() {
                return queryPolicyForTurn;
              },
              get random() {
                return random;
              },
              get rememberProviderThread() {
                return rememberProviderThread;
              },
              get requestedContinuations() {
                return requestedContinuations;
              },
              get resolveAutoCompactWindow() {
                return resolveAutoCompactWindow;
              },
              get resolveItemOrdinal() {
                return resolveItemOrdinal;
              },
              get sdkMessageLock() {
                return sdkMessageLock;
              },
              get sessionScope() {
                return sessionScope;
              },
              get spawner() {
                return spawner;
              },
              get startUserTurnForWakeReports() {
                return startUserTurnForWakeReports;
              },
              get taskIdSetForNativeThread() {
                return taskIdSetForNativeThread;
              },
              get userInvocableSkills() {
                return userInvocableSkills;
              },
              get wakeBuffers() {
                return wakeBuffers;
              },
            })(turnInput) as Effect.Effect<any, never, never>;
          },
          (effect, turnInput) =>
            effect.pipe(
              Effect.scoped,
              Effect.mapError(
                (cause) =>
                  new ProviderAdapter.ProviderAdapterTurnStartError({
                    driver: CLAUDE_PROVIDER,
                    threadId: turnInput.threadId,
                    providerThreadId: turnInput.providerThread.id,
                    runId: turnInput.runId,
                    cause,
                  }),
              ),
            ),
        );

        const interruptTurn = Effect.fn("ClaudeAdapterV2.interruptTurn")(
          function* (turnInput: ProviderAdapter.ProviderAdapterV2InterruptInput) {
            return yield* bindInterruptTurn({
              get activeTurn() {
                return activeTurn;
              },
              get clearWakeStateForNativeThread() {
                return clearWakeStateForNativeThread;
              },
              get closeLiveQueryForNativeThread() {
                return closeLiveQueryForNativeThread;
              },
              get input() {
                return input;
              },
              get interruptedTurns() {
                return interruptedTurns;
              },
              get queryContext() {
                return queryContext;
              },
              get resetBackgroundTaskStateForNativeThreadProcess() {
                return resetBackgroundTaskStateForNativeThreadProcess;
              },
            })(turnInput) as Effect.Effect<any, never, never>;
          },
          (effect, turnInput) =>
            effect.pipe(
              Effect.mapError((cause) =>
                cause._tag === "ProviderAdapterInterruptTimeoutError"
                  ? cause
                  : new ProviderAdapter.ProviderAdapterInterruptError({
                      driver: CLAUDE_PROVIDER,
                      providerThreadId: turnInput.providerThread.id,
                      providerTurnId: turnInput.providerTurnId,
                      cause,
                    }),
              ),
            ),
        );

        // Move subagents to the background so a steer reaches Claude without waiting for them to finish.
        const backgroundForegroundSubagents = Effect.fnUntraced(function* (
          live: ClaudeLiveQueryContext,
          deadline: number,
        ) {
          const foreground: Array<{
            readonly taskId: string;
            readonly toolUseId: string;
          }> = [];
          for (const [taskId, subagent] of yield* Ref.get(sessionSubagentsByTaskId)) {
            const toolUseId = subagent.runToolUseId;
            if (
              toolUseId === null ||
              subagent.task.status !== "running" ||
              subagent.task.parentNodeId !== subagent.rootNodeId ||
              live.subagentsFromEarlierProcesses.has(subagent) ||
              (yield* isNestedSubagentTask(taskId))
            ) {
              continue;
            }
            foreground.push({ taskId, toolUseId });
          }
          for (const [toolUseId, move] of backgroundMovesByToolUseId) {
            if (move.pollUnsafe() !== undefined) backgroundMovesByToolUseId.delete(toolUseId);
          }
          const moves: Array<Fiber.Fiber<void>> = [];
          for (const { taskId, toolUseId } of foreground) {
            const inFlight = backgroundMovesByToolUseId.get(toolUseId);
            if (inFlight !== undefined) {
              moves.push(inFlight);
              continue;
            }
            const move = yield* live.query.backgroundTasks(toolUseId).pipe(
              Effect.flatMap((moved) =>
                moved
                  ? Ref.get(sessionSubagentsByTaskId).pipe(
                      Effect.flatMap((registry) =>
                        registry.get(taskId)?.task.status === "running" &&
                        registry.get(taskId)?.runToolUseId === toolUseId
                          ? Ref.update(backgroundedSubagentTaskIds, (current) =>
                              new Set(current).add(taskId),
                            )
                          : Effect.void,
                      ),
                    )
                  : Effect.void,
              ),
              Effect.catch((cause) =>
                Effect.logWarning("orchestration-v2.claude-steer-background-subagent-failed", {
                  taskId,
                  toolUseId,
                  cause,
                }),
              ),
              Effect.forkIn(sessionScope),
            );
            backgroundMovesByToolUseId.set(toolUseId, move);
            moves.push(move);
          }
          const remaining = deadline - (yield* Clock.currentTimeMillis);
          yield* Fiber.joinAll(moves).pipe(Effect.timeoutOption(Math.max(0, remaining)));
        });

        const steerTurn = Effect.fn("ClaudeAdapterV2.steerTurn")(
          function* (turnInput: ProviderAdapter.ProviderAdapterV2SteerInput) {
            return yield* bindSteerTurn({
              get activeTurn() {
                return activeTurn;
              },
              get applySelectionLive() {
                return applySelectionLive;
              },
              get attachmentsDir() {
                return attachmentsDir;
              },
              get backgroundForegroundSubagents() {
                return backgroundForegroundSubagents;
              },
              get deliveredAppContext() {
                return deliveredAppContext;
              },
              get emitSteerStatus() {
                return emitSteerStatus;
              },
              get fileSystem() {
                return fileSystem;
              },
              get loadModelCatalog() {
                return loadModelCatalog;
              },
              get modelCatalog() {
                return modelCatalog;
              },
              get path() {
                return path;
              },
              get pdfBudgets() {
                return pdfBudgets;
              },
              get persistAttachmentBudget() {
                return persistAttachmentBudget;
              },
              get queryContext() {
                return queryContext;
              },
              get random() {
                return random;
              },
              get routedCatalogFor() {
                return routedCatalogFor;
              },
              get spawner() {
                return spawner;
              },
              get steeredTurns() {
                return steeredTurns;
              },
              get userInvocableSkills() {
                return userInvocableSkills;
              },
            })(turnInput) as Effect.Effect<any, never, never>;
          },
          (effect, turnInput) =>
            effect.pipe(
              Effect.scoped,
              Effect.mapError(
                (cause) =>
                  new ProviderAdapter.ProviderAdapterSteerRunError({
                    driver: CLAUDE_PROVIDER,
                    providerThreadId: turnInput.providerThread.id,
                    providerTurnId: turnInput.providerTurnId,
                    cause,
                  }),
              ),
            ),
        );

        const closeSession = Effect.fnUntraced(function* () {
          const existing = yield* Ref.get(queryContext);
          if (existing !== null) {
            // Marked first so a concurrent Stop skips or tolerates writes to the closing CLI;
            // the scope interrupts the stream fiber, so it may never mark its query closed.
            yield* Deferred.succeed(existing.closed, undefined);
            yield* existing.query.close.pipe(Effect.ignore);
          }
          yield* Effect.yieldNow;
          yield* queryRunner.assertComplete.pipe(
            Effect.catchCause((cause) =>
              Effect.logWarning("orchestration-v2.claude-query-runner-incomplete", {
                providerSessionId: input.providerSessionId,
                cause,
              }),
            ),
          );
        });

        const closeLiveQueryForNativeThread = Effect.fnUntraced(function* (nativeThreadId: string) {
          const existing = yield* Ref.get(queryContext);
          if (
            existing === null ||
            (existing.nativeThreadId !== nativeThreadId &&
              clearedNativeSessions.get(existing.nativeThreadId) !== nativeThreadId)
          ) {
            return;
          }

          existing.stopping = true;
          yield* existing.query.close.pipe(Effect.ignore);
          const closed = yield* Deferred.await(existing.closed).pipe(
            Effect.timeoutOption("10 seconds"),
          );
          if (Option.isSome(closed)) {
            return;
          }

          yield* Effect.logWarning("orchestration-v2.claude-query-close-timeout-before-fork", {
            providerSessionId: input.providerSessionId,
            nativeThreadId,
          });
          const ownedLiveQuery = yield* Ref.modify(queryContext, (current) =>
            current?.query === existing.query ? [true, null] : [false, current],
          );
          if (ownedLiveQuery) {
            yield* finalizeActiveTurnAfterQueryExit(existing);
            yield* endSubagentCallsOfClosedQuery(existing.nativeThreadId, "interrupted");
          } else {
            yield* endSubagentsOfReplacedQuery(existing);
          }
          yield* Deferred.succeed(existing.closed, undefined);
        });
        yield* Effect.addFinalizer(() => closeSession());

        // Metadata-only transcripts cannot be resumed or recreated; fail resumeThread to trigger a fresh session and handoff.
        const claudeTranscriptState = Effect.fn("ClaudeAdapterV2.claudeTranscriptState")(function* (
          nativeThreadId: string,
        ) {
          const projectsDir = yield* claudeProjectsDir;
          // Any message in any transcript copy means Claude may still resume it.
          let found = false;
          let unreadable = false;
          for (const project of yield* fileSystem.readDirectory(projectsDir)) {
            const transcriptPath = path.join(projectsDir, project, `${nativeThreadId}.jsonl`);
            // Stray files beside the project dirs fail with ENOTDIR.
            if (
              !(yield* fileSystem.exists(transcriptPath).pipe(Effect.orElseSucceed(() => false)))
            ) {
              continue;
            }
            const conversationLine = yield* fileSystem
              .stream(transcriptPath)
              .pipe(
                Stream.decodeText,
                Stream.splitLines,
                Stream.filter(isClaudeConversationLine),
                Stream.runHead,
                Effect.option,
              );
            if (Option.isNone(conversationLine)) {
              unreadable = true;
              continue;
            }
            if (Option.isSome(conversationLine.value)) {
              return "conversation" as const;
            }
            found = true;
          }
          return found && !unreadable ? ("empty" as const) : ("missing" as const);
        });

        const runtime: ProviderAdapter.ProviderAdapterV2SessionRuntime = bindRuntime({
          get active() {
            return active;
          },
          get activeTurn() {
            return activeTurn;
          },
          get adapterOptions() {
            return adapterOptions;
          },
          get addTaskIdsToNativeThreadSet() {
            return addTaskIdsToNativeThreadSet;
          },
          get appliedSessionTitles() {
            return appliedSessionTitles;
          },
          get applySelectionLive() {
            return applySelectionLive;
          },
          get applySessionTitle() {
            return applySessionTitle;
          },
          get awaitedBackgroundTasksByNativeThread() {
            return awaitedBackgroundTasksByNativeThread;
          },
          get call() {
            return call;
          },
          get claudeContextWindow() {
            return claudeContextWindow;
          },
          get claudeDeliveredAppContext() {
            return claudeDeliveredAppContext;
          },
          get claudeTranscriptState() {
            return claudeTranscriptState;
          },
          get clearTaskIdFromNativeThreadSet() {
            return clearTaskIdFromNativeThreadSet;
          },
          get closeLiveQueryForNativeThread() {
            return closeLiveQueryForNativeThread;
          },
          get current() {
            return current;
          },
          get deliveredAppContext() {
            return deliveredAppContext;
          },
          get emitRosterUpdate() {
            return emitRosterUpdate;
          },
          get events() {
            return events;
          },
          get existing() {
            return existing;
          },
          get idAllocator() {
            return idAllocator;
          },
          get input() {
            return input;
          },
          get interruptTurn() {
            return interruptTurn;
          },
          get liveProcessRunsBackgroundWork() {
            return liveProcessRunsBackgroundWork;
          },
          get liveQuery() {
            return liveQuery;
          },
          get liveQueryForThread() {
            return liveQueryForThread;
          },
          get mcpAppServerStatuses() {
            return mcpAppServerStatuses;
          },
          get messages() {
            return messages;
          },
          get missingNativeThreads() {
            return missingNativeThreads;
          },
          get nativeId() {
            return nativeId;
          },
          get nativeMetadata() {
            return nativeMetadata;
          },
          get now() {
            return now;
          },
          get openedNativeThreads() {
            return openedNativeThreads;
          },
          get outcome() {
            return outcome;
          },
          get pendingBackgroundTasksByNativeThread() {
            return pendingBackgroundTasksByNativeThread;
          },
          get pendingRuntimeRequests() {
            return pendingRuntimeRequests;
          },
          get providerThread() {
            return providerThread;
          },
          get queryContext() {
            return queryContext;
          },
          get queryRunner() {
            return queryRunner;
          },
          get read() {
            return read;
          },
          get recordedTitle() {
            return recordedTitle;
          },
          get rememberProviderThread() {
            return rememberProviderThread;
          },
          get roster() {
            return roster;
          },
          get rosterForNativeThread() {
            return rosterForNativeThread;
          },
          get routedCatalogFor() {
            return routedCatalogFor;
          },
          get scheduledWakeupsByNativeThread() {
            return scheduledWakeupsByNativeThread;
          },
          get sdkMessageLock() {
            return sdkMessageLock;
          },
          get session() {
            return session;
          },
          get sessionSubagentsByTaskId() {
            return sessionSubagentsByTaskId;
          },
          get start() {
            return start;
          },
          get startTurn() {
            return startTurn;
          },
          get status() {
            return status;
          },
          get statuses() {
            return statuses;
          },
          get steerTurn() {
            return steerTurn;
          },
          get subagent() {
            return subagent;
          },
          get subagentStopOutcomes() {
            return subagentStopOutcomes;
          },
          get task() {
            return task;
          },
          get taskId() {
            return taskId;
          },
          get updated() {
            return updated;
          },
          get wakeBuffers() {
            return wakeBuffers;
          },
          get workflowStopRequestedAt() {
            return workflowStopRequestedAt;
          },
        });

        return runtime;
      },
      (effect, input) =>
        effect.pipe(
          Effect.mapError(
            (cause) =>
              new ProviderAdapter.ProviderAdapterOpenSessionError({
                driver: CLAUDE_PROVIDER,
                providerSessionId: input.providerSessionId,
                cause,
              }),
          ),
        ),
    ),
  });
});

export type ClaudeAdapterV2DriverEnv =
  | ChildProcessSpawner.ChildProcessSpawner
  | ClaudeAgentSdkQueryRunner
  | SecureRandom.SecureRandom
  | FileSystem.FileSystem
  | IdAllocator.IdAllocatorV2
  | McpProviderSessions.McpProviderSessions
  | Path.Path
  | ProviderInstallationGate.ProviderInstallationGate
  | ServerConfig.ServerConfig;

export const createClaudeAdapterV2 = Effect.fn("ClaudeAdapterV2Driver.create")(
  function* (
    input: ProviderAdapterDriverCreateInput<ClaudeSettings>,
    hooks: Pick<
      ClaudeAdapterV2Options,
      "scopedLimitNames" | "onUsageLimits" | "onSessionInit" | "modelCatalog" | "routeModelCatalog"
    > = {},
  ) {
    const { instanceId, environment, enabled, config } = input;
    const fileSystem = yield* FileSystem.FileSystem;
    const hostEnvironment = yield* HostProcess.Environment;
    const idAllocator = yield* IdAllocator.IdAllocatorV2;
    const queryRunner = yield* ClaudeAgentSdkQueryRunner;
    const serverConfig = yield* ServerConfig.ServerConfig;
    const continuationRequests = yield* ProviderContinuationRequests.ProviderContinuationRequests;
    const installationGate = yield* ProviderInstallationGate.ProviderInstallationGate;
    const baseEnvironment = yield* mergeClaudeProcessEnvironment(
      config,
      environment,
      hostEnvironment,
    );
    const claudeEnvironment = yield* makeClaudeEnvironment(config, baseEnvironment);
    const path = yield* Path.Path;
    const random = yield* SecureRandom.SecureRandom;
    const binaryPath = yield* resolveClaudeSdkExecutablePath(
      expandHomePath(config.binaryPath, yield* HostProcess.HomeDirectory),
      claudeEnvironment,
    );
    return yield* makeClaudeAdapterV2({
      instanceId,
      settings: { ...config, enabled, binaryPath },
      environment: claudeEnvironment,
      attachmentsDir: serverConfig.attachmentsDir,
      fileSystem,
      path,
      random,
      idAllocator,
      queryRunner,
      continuationRequests,
      installationGate,
      ...hooks,
    });
  },
  (effect, input, _hooks) =>
    effect.pipe(
      Effect.mapError(
        (cause) =>
          new ProviderAdapterDriverCreateError({
            driver: CLAUDE_PROVIDER,
            instanceId: input.instanceId,
            detail: "Failed to create Claude Agent SDK adapter.",
            cause,
          }),
      ),
    ),
);
