// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of ClaudeAdapterV2.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
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
export const bindStartTurn = (ctx: any) =>
  Effect.fn("ClaudeAdapterV2.startTurn")(
    function* (turnInput: ProviderAdapter.ProviderAdapterV2TurnInput) {
      const {
        absorbedWakes,
        activeTurn,
        announceAutoFallback,
        announcedBypassDowngrades,
        appliedSessionTitles,
        applySessionTitle,
        attachmentsDir,
        deliveredAppContext,
        emitProviderEvent,
        fileSystem,
        finalizeActiveTurn,
        forgetAbsorbedWake,
        goalsByNativeThread,
        handleSdkMessage,
        holdsBufferedWake,
        idAllocator,
        input,
        interruptedTurns,
        lastTurnRouteByNativeThread,
        loadModelCatalog,
        modelCatalog,
        offerBufferedWake,
        opaqueBackgroundTaskReplayTombstonesByNativeThread,
        openQuery,
        owedWakeTasksForNativeThread,
        path,
        pdfBudgets,
        persistAttachmentBudget,
        providerTurnPayload,
        queryContext,
        queryPolicyForTurn,
        random,
        rememberProviderThread,
        requestedContinuations,
        resolveAutoCompactWindow,
        resolveItemOrdinal,
        sdkMessageLock,
        sessionScope,
        spawner,
        startUserTurnForWakeReports,
        taskIdSetForNativeThread,
        userInvocableSkills,
        wakeBuffers,
      } = ctx;

      modelCatalog = yield* loadModelCatalog;
      const startedAt = yield* DateTime.now;
      const nativeThreadId = yield* getNativeThreadId(turnInput.providerThread);
      const nativeTurnId = `turn:${turnInput.attemptId}`;
      // Use fresh uuids: native sessions can outlive this database, and Claude skips previously recorded prompts.
      const promptUuid = isClaudeProviderContinuationTurn(turnInput)
        ? null
        : yield* random.uuidV4().pipe(
            Effect.filterOrFail(isClaudePromptUuid),
            Effect.mapError(
              (cause) =>
                new ProviderAdapter.ProviderAdapterProtocolError({
                  driver: CLAUDE_PROVIDER,
                  detail: "Failed to allocate a Claude prompt uuid.",
                  payload: cause,
                }),
            ),
          );
      const providerTurnId = idAllocator.derive.providerTurn({
        driver: CLAUDE_PROVIDER,
        nativeTurnId,
      });
      const providerTurnOrdinal = turnInput.providerTurnOrdinal;
      const currentTurn = yield* Ref.get(activeTurn);
      if (currentTurn !== null) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver: CLAUDE_PROVIDER,
          detail: `Claude provider turn ${currentTurn.providerTurnId} is still active.`,
          reason: "previous_turn_active",
        });
      }
      yield* Ref.update(lastTurnRouteByNativeThread, (current) => {
        const updated = new Map(current);
        updated.set(nativeThreadId, {
          threadId: turnInput.threadId,
          providerThreadId: turnInput.providerThread.id,
        });
        return updated;
      });
      // A queued turn's snapshot can predate another task's exit.
      const owedWakeTasks = yield* owedWakeTasksForNativeThread(nativeThreadId);
      yield* rememberProviderThread(
        owedWakeTasks.length === 0
          ? turnInput.providerThread
          : {
              ...turnInput.providerThread,
              pendingBackgroundTasks: [
                ...(turnInput.providerThread.pendingBackgroundTasks ?? []),
                ...owedWakeTasks.filter(
                  (task) =>
                    !(turnInput.providerThread.pendingBackgroundTasks ?? []).some(
                      (current) => current.taskId === task.taskId,
                    ),
                ),
              ],
            },
      );
      if (!goalsByNativeThread.has(nativeThreadId)) {
        goalsByNativeThread.set(nativeThreadId, turnInput.providerThread.goal ?? null);
      }
      if (!pdfBudgets.has(nativeThreadId)) {
        // Older sessions did not record retained attachments. Keep their
        // existing native-image allowance rather than disabling images.
        const used = turnInput.providerThread.nativeMetadata?.claudeAttachmentBudget;
        pdfBudgets.set(nativeThreadId, makeClaudeAttachmentBudget(used));
      }
      if (!deliveredAppContext.has(nativeThreadId)) {
        const recorded = turnInput.providerThread.nativeMetadata?.claudeDeliveredAppContext;
        if (recorded !== undefined) {
          deliveredAppContext.set(nativeThreadId, new Map(Object.entries(recorded)));
        }
      }
      if (!appliedSessionTitles.has(nativeThreadId)) {
        const recordedTitle = turnInput.providerThread.nativeMetadata?.title;
        if (recordedTitle !== undefined && recordedTitle !== null) {
          appliedSessionTitles.set(nativeThreadId, recordedTitle);
        }
      }
      const [skills, queryPolicy] = yield* Effect.all(
        [
          promptUuid === null ? Effect.undefined : userInvocableSkills(turnInput.runtimePolicy.cwd),
          queryPolicyForTurn(turnInput),
        ],
        { concurrency: "unbounded" },
      );
      const pdfReservation = yield* reserveClaudePdfBudget(
        pdfBudgets.get(nativeThreadId)!,
        persistAttachmentBudget(nativeThreadId),
      );
      const promptText = applyClaudePromptEffortPrefix(
        turnInput.message.text,
        compileClaudeModelSelection(turnInput.modelSelection, modelCatalog).promptEffort,
      );
      const appContext = turnInput.appContext ?? [];
      const delivered = deliveredAppContext.get(nativeThreadId);
      let appContextSent = false;
      const userMessage =
        promptUuid === null
          ? null
          : turnInput.resume
            ? {
                type: "user" as const,
                message: { role: "user" as const, content: [] },
                parent_tool_use_id: null,
                uuid: promptUuid,
              }
            : yield* makeClaudeUserMessageWithAttachments({
                text: promptText,
                // Mentions in inline handoff history are history, not this turn's skill.
                ...(turnInput.inlineContextLength === undefined
                  ? {}
                  : {
                      skillMentionsFrom:
                        promptText.length -
                        turnInput.message.text.slice(turnInput.inlineContextLength).trimEnd()
                          .length,
                    }),
                attachments: turnInput.message.attachments,
                attachmentsDir,
                fileSystem,
                pdfReservation,
                ...(skills === undefined ? {} : { skills }),
                uuid: promptUuid,
              }).pipe(
                Effect.map((message) => {
                  const withContext = withClaudeAppContext(
                    message,
                    unseenClaudeAppContext(appContext, delivered),
                    pdfReservation,
                  );
                  appContextSent = withContext !== message;
                  return withContext;
                }),
                Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner),
                Effect.provideService(Path.Path, path),
              );
      const querySession = yield* openQuery(turnInput, nativeThreadId, queryPolicy);
      yield* applySessionTitle(querySession.query, nativeThreadId, turnInput.appThread.title);
      const autoCompactWindow = yield* resolveAutoCompactWindow(
        querySession.settingsCwd,
        turnInput.modelSelection,
        querySession.launchArgSettings,
      );
      const context: ActiveClaudeTurnContext = {
        input: turnInput,
        autoCompactWindow,
        queryPolicy: querySession.queryPolicy,
        nativeThreadId,
        nativeTurnId,
        nativeMessageCursor: null,
        providerTurnId,
        providerTurnOrdinal,
        startedAt,
        itemOrdinals: new Map(),
        planIds: new Map(),
        assistant: {
          fallbackText: "",
          earlierFallbackText: "",
          fallbackNativeItemId: `assistant:${turnInput.runId}`,
          emittedNativeItemIds: new Set(),
          streamBlocks: new Map(),
          nextBlockIndex: new Map(),
          snapshotBlockIndex: new Map(),
          streamItems: new Map(),
          lastReply: null,
          noticeTexts: new Set(),
        },
        reasoning: {
          messageId: null,
          streamBlocks: new Map(),
          nextBlockIndex: new Map(),
          snapshotBlockIndex: new Map(),
          lastThinking: null,
          snapshots: new Set(),
          blocks: new Map(),
        },
        streamUsage: null,
        compactionTokens: undefined,
        toolCalls: new Map(),
        compaction: null,
        ignoredTaskIds: new Set(),
        announcedUsageLimits: new Set(),
        authenticationFailureMessage: undefined,
        rejectedRateLimitTypes: new Set(),
        rateLimitResetTimes: new Map(),
        latestAssistantRateLimit: null,
        compactionFailure: null,
        nativeSessionTitle: null,
        steeredSegmentUsage: [],
        steersClosed: false,
        steeredLedgerUsage: { inputTokens: 0, outputTokens: 0 },
        rootModels: new Set(),
        subagentsByTaskId: new Map(),
        subagentsByToolUseId: new Map(),
        promptUuid,
        promptEcho:
          isClaudeProviderContinuationTurn(turnInput) || turnInput.resume ? "confirmed" : "pending",
        promptStarted: false,
        nativeWakeStarted: false,
        gatedFramesBeforeEcho: 0,
        heldRootFrames: [],
        pendingSteers: new Map(),
        steerUuids: new Set(),
        heldResult: undefined,
        executedModel: undefined,
      };
      const attachTurn = Effect.gen(function* () {
        // Set before claiming: a query that exits after the claim finalizes this turn; one that exits before it fails the start.
        yield* Ref.set(activeTurn, context);
        const attached = yield* Ref.modify(queryContext, (current) => {
          if (current?.query !== querySession.query || querySession.stopping) {
            return [false, current];
          }
          querySession.lastTurn = context;
          return [true, current];
        });
        if (!attached) {
          yield* Ref.update(activeTurn, (current) => (current === context ? null : current));
          return yield* new ProviderAdapter.ProviderAdapterProtocolError({
            driver: CLAUDE_PROVIDER,
            detail: CLAUDE_QUERY_ENDED_BEFORE_TURN_DETAIL,
            ...(querySession.exitCause === undefined ? {} : { cause: querySession.exitCause }),
          });
        }
        if (
          !isClaudeProviderContinuationTurn(turnInput) &&
          permissionModeForClaudeRuntimePolicy(turnInput.runtimePolicy) === "bypassPermissions" &&
          context.queryPolicy.permissionMode !== "bypassPermissions" &&
          !announcedBypassDowngrades.has(turnInput.threadId)
        ) {
          announcedBypassDowngrades.add(turnInput.threadId);
          if (announcedBypassDowngrades.size > 1000) {
            const oldest = announcedBypassDowngrades.values().next().value;
            if (oldest !== undefined) announcedBypassDowngrades.delete(oldest);
          }
          const nativeItemId = `bypass-policy-downgrade:${context.providerTurnId}`;
          const notice =
            "T3 could not confirm Claude bypass permissions here, so Full access is running with approval checks.";
          yield* emitProviderEvent({
            type: "turn_item.updated",
            driver: CLAUDE_PROVIDER,
            turnItem: {
              id: idAllocator.derive.turnItemFromProviderItem({
                driver: CLAUDE_PROVIDER,
                nativeItemId,
              }),
              threadId: turnInput.threadId,
              runId: turnInput.runId,
              nodeId: turnInput.rootNodeId,
              providerThreadId: turnInput.providerThread.id,
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
              startedAt,
              completedAt: startedAt,
              updatedAt: startedAt,
            },
          });
        }
        // An init that arrived before this turn attached, as on a reused session.
        yield* announceAutoFallback(context, querySession);
        yield* emitProviderEvent({
          type: "provider_turn.updated",
          driver: CLAUDE_PROVIDER,
          providerTurn: providerTurnPayload({
            context,
            status: "running",
            completedAt: null,
          }),
        });
      });
      // `offer` may call this twice; a second call must not restore notes compaction cleared.
      let offerCommitted = false;
      const commitOffer = () => {
        if (offerCommitted) return;
        offerCommitted = true;
        pdfReservation.commit();
        if (appContextSent) {
          context.appContextOffered = claudeAppContextDigests(appContext);
        }
      };
      const offerUserMessage =
        userMessage === null
          ? Effect.void
          : startUserTurnForWakeReports(nativeThreadId).pipe(
              Effect.andThen(
                Effect.uninterruptibleMask((restore) =>
                  restore(querySession.query.offer(userMessage, commitOffer)).pipe(
                    Effect.tap(() => Effect.sync(commitOffer)),
                  ),
                ),
              ),
            );
      if (userMessage !== null && !turnInput.resume) {
        yield* attachTurn;
        yield* offerUserMessage;
        return;
      }
      // Transcript reads suspend replay; hold SDK frames until the buffer is applied to preserve order.
      yield* sdkMessageLock.withPermits(1)(
        Effect.gen(function* () {
          yield* attachTurn;
          const buffered = (yield* Ref.get(wakeBuffers)).get(nativeThreadId)?.messages ?? [];
          const latch = (yield* Ref.get(requestedContinuations)).get(nativeThreadId);
          // This run carries the Monitor tag, which starts no delegated follow-up, so a wake
          // buffered behind the Monitor event is left for a continuation of its own.
          const ownEndIndex =
            latch?.monitorEvent === true && latch.end !== undefined
              ? buffered.indexOf(latch.end)
              : -1;
          const leavesLaterWake =
            ownEndIndex !== -1 &&
            (yield* holdsBufferedWake(nativeThreadId, buffered.slice(ownEndIndex + 1)));
          const drained = leavesLaterWake ? buffered.slice(0, ownEndIndex + 1) : buffered;
          yield* Ref.update(requestedContinuations, (current) => {
            const updated = new Map(current);
            updated.delete(nativeThreadId);
            return updated;
          });
          // A root frame clears the absorbed marker, so behind a split it is the later wake's
          // and stays; the split wake was absorbed when its end is not a result.
          const wakeAbsorbed = leavesLaterWake
            ? latch?.end?.type !== "result"
            : (yield* Ref.get(absorbedWakes)).has(nativeThreadId);
          if (!leavesLaterWake) yield* forgetAbsorbedWake(nativeThreadId);
          if (drained.length === 0) {
            if (turnInput.resume) return;
            const completedAt = yield* DateTime.now;
            yield* finalizeActiveTurn({ context, status: "completed", completedAt });
            return;
          }
          // Replay results last to avoid rebuffering later frames. An empty turn's result must not settle a newer running turn.
          const lastResultIndex = drained.findLastIndex((entry) => entry.type === "result");
          const tailResult = drained[lastResultIndex];
          const emptyTurnBeforeNextTurn =
            tailResult?.type === "result" &&
            tailResult.num_turns === 0 &&
            !tailResult.is_error &&
            terminalStatusFromResult(tailResult) === "completed" &&
            drained.slice(lastResultIndex + 1).some((entry) => isClaudeTurnStartMessage(entry));
          // The CLI can append empty task successes after a failure. Filter
          // those for replay without changing the raw-tail successor guard.
          const replayResultIndex = drained.findLastIndex(
            (entry) => entry.type === "result" && !isClaudeEmptyTaskNotificationSuccess(entry),
          );
          const lastResult =
            drained[replayResultIndex === -1 ? lastResultIndex : replayResultIndex];
          const opaqueReplayTombstones = taskIdSetForNativeThread(
            yield* Ref.get(opaqueBackgroundTaskReplayTombstonesByNativeThread),
            nativeThreadId,
          );
          const hasOpaqueTaskNotification = drained.some(
            (entry) =>
              entry.type === "system" &&
              entry.subtype === "task_notification" &&
              opaqueReplayTombstones.has(entry.task_id),
          );
          for (const entry of drained) {
            if (!(yield* Ref.get(wakeBuffers)).get(nativeThreadId)?.messages.includes(entry)) {
              continue;
            }
            if (entry.type !== "result") {
              yield* handleSdkMessage({ query: querySession.query, message: entry });
            }
            yield* Ref.update(wakeBuffers, (current) => {
              const buffered = current.get(nativeThreadId);
              if (buffered === undefined) return current;
              const index = buffered.messages.indexOf(entry);
              if (index === -1) return current;
              const messages = [
                ...buffered.messages.slice(0, index),
                ...buffered.messages.slice(index + 1),
              ];
              const next = new Map(current);
              if (messages.length === 0) next.delete(nativeThreadId);
              else next.set(nativeThreadId, { ...buffered, messages });
              return next;
            });
          }
          if (lastResult !== undefined && !emptyTurnBeforeNextTurn) {
            yield* handleSdkMessage({ query: querySession.query, message: lastResult });
            if (leavesLaterWake) yield* offerBufferedWake(nativeThreadId);
            return;
          }
          if (wakeAbsorbed || (hasOpaqueTaskNotification && !context.nativeWakeStarted)) {
            const completedAt = yield* DateTime.now;
            yield* finalizeActiveTurn({ context, status: "completed", completedAt });
            if (leavesLaterWake) yield* offerBufferedWake(nativeThreadId);
          } else if (!context.nativeWakeStarted && !turnInput.resume) {
            yield* Effect.sleep(CLAUDE_WAKE_TURN_START_DEADLINE).pipe(
              Effect.andThen(
                sdkMessageLock.withPermits(1)(
                  Effect.gen(function* () {
                    if (
                      (yield* Ref.get(activeTurn)) !== context ||
                      (yield* Ref.get(queryContext)) !== querySession ||
                      querySession.stopping ||
                      context.nativeWakeStarted ||
                      (yield* Ref.get(interruptedTurns)).has(context.providerTurnId)
                    )
                      return;
                    yield* Effect.logWarning("orchestration-v2.claude-wake-turn-never-opened", {
                      providerTurnId: context.providerTurnId,
                      nativeThreadId,
                    });
                    const completedAt = yield* DateTime.now;
                    yield* finalizeActiveTurn({ context, status: "completed", completedAt });
                  }),
                ),
              ),
              Effect.forkIn(sessionScope),
            );
          }
        }),
      );
      if (userMessage !== null) {
        yield* sdkMessageLock.withPermits(1)(
          Effect.gen(function* () {
            if ((yield* Ref.get(activeTurn)) === context) yield* offerUserMessage;
          }),
        );
      }
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
