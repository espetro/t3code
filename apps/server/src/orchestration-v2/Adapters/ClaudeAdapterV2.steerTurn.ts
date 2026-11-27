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
export const bindSteerTurn = (ctx: any) =>
  Effect.fn("ClaudeAdapterV2.steerTurn")(
    function* (turnInput: ProviderAdapter.ProviderAdapterV2SteerInput) {
      const {
        activeTurn,
        applySelectionLive,
        attachmentsDir,
        backgroundForegroundSubagents,
        deliveredAppContext,
        emitSteerStatus,
        fileSystem,
        loadModelCatalog,
        modelCatalog,
        path,
        pdfBudgets,
        persistAttachmentBudget,
        queryContext,
        random,
        routedCatalogFor,
        spawner,
        steeredTurns,
        userInvocableSkills,
      } = ctx;

      modelCatalog = yield* loadModelCatalog;
      // Measured from the request, not from when the moves are forked:
      // building the message and the moves can take clock time a timer
      // started later would not count, and the steer would wait past it.
      const backgroundDeadline = (yield* Clock.currentTimeMillis) + BACKGROUND_MOVE_TIMEOUT_MS;
      const existing = yield* Ref.get(queryContext);
      if (existing === null) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver: CLAUDE_PROVIDER,
          detail: `Claude provider thread ${turnInput.providerThread.id} has no live query.`,
        });
      }
      const currentTurn = yield* Ref.get(activeTurn);
      if (currentTurn?.providerTurnId !== turnInput.providerTurnId) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver: CLAUDE_PROVIDER,
          detail: `Claude provider turn ${turnInput.providerTurnId} is not the active turn.`,
        });
      }
      // Claude echoes this uuid once it accepts the steer.
      const steerUuid = yield* random.uuidV4().pipe(
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
      const pdfReservation = yield* reserveClaudePdfBudget(
        pdfBudgets.get(existing.nativeThreadId) ??
          makeClaudeAttachmentBudget({
            pagesUsed: CLAUDE_ATTACHMENT_MAX_PAGES,
            bytesUsed: CLAUDE_ATTACHMENT_MAX_BYTES,
          }),
        persistAttachmentBudget(existing.nativeThreadId),
      );
      // A selection sent with the steer applies to the running turn when the live process can switch to it.
      const steerSelection =
        turnInput.modelSelection === undefined
          ? undefined
          : compileClaudeModelSelection(
              turnInput.modelSelection,
              yield* routedCatalogFor(existing),
            );
      const liveSteerSelection =
        steerSelection !== undefined &&
        existing.selection.queryIdentity !== steerSelection.queryIdentity &&
        canApplyClaudeSelectionLive(existing.selection, steerSelection) &&
        (existing.selection.apiModelId === steerSelection.apiModelId ||
          existing.openedPermissionMode === currentTurn.queryPolicy.permissionMode)
          ? steerSelection
          : undefined;
      const steerMessage = yield* makeClaudeUserMessageWithAttachments({
        text: applyClaudePromptEffortPrefix(
          turnInput.message.text,
          (
            liveSteerSelection ??
            compileClaudeModelSelection(currentTurn.input.modelSelection, modelCatalog)
          ).promptEffort,
        ),
        attachments: turnInput.message.attachments,
        // "now" makes Claude Code cancel the tool calls in flight and report them as a user refusal.
        priority: "next",
        uuid: steerUuid,
        attachmentsDir,
        fileSystem,
        pdfReservation,
        skills: yield* userInvocableSkills(currentTurn.input.runtimePolicy.cwd),
      }).pipe(
        Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner),
        Effect.provideService(Path.Path, path),
      );
      // Notes this turn's prompt or an earlier steer already carried are not sent again.
      const appContext = turnInput.appContext ?? [];
      const seenAppContext =
        currentTurn.appContextOffered ?? deliveredAppContext.get(existing.nativeThreadId);
      const userMessage = withClaudeAppContext(
        steerMessage,
        unseenClaudeAppContext(appContext, seenAppContext),
        pdfReservation,
      );
      // `offer` may call this twice; a second call must not restore notes compaction cleared.
      let offerCommitted = false;
      const appContextBefore = currentTurn.appContextOffered;
      const appContextOffered =
        userMessage === steerMessage ? undefined : claudeAppContextDigests(appContext);
      const commitOffer = () => {
        if (offerCommitted) return;
        offerCommitted = true;
        pdfReservation.commit();
        if (appContextOffered !== undefined) {
          currentTurn.appContextOffered = appContextOffered;
        }
      };
      yield* backgroundForegroundSubagents(existing, backgroundDeadline);
      if (liveSteerSelection !== undefined) {
        yield* applySelectionLive(existing, liveSteerSelection);
      }
      // The turn can end while the moves or the selection change are answered.
      // A steer offered then would start a new turn the orchestrator never
      // asked for, so the steer fails and the orchestrator starts the follow-up turn.
      if (
        (yield* Ref.get(activeTurn))?.providerTurnId !== turnInput.providerTurnId ||
        (yield* Ref.get(queryContext)) !== existing ||
        // No yield between this check and the set below.
        currentTurn.steersClosed
      ) {
        return yield* new ProviderAdapter.ProviderAdapterProtocolError({
          driver: CLAUDE_PROVIDER,
          detail: `Claude provider turn ${turnInput.providerTurnId} ended before the steer was sent.`,
        });
      }
      // Register before offering: Claude can start the steer and end the turn before offer returns.
      const messageId = turnInput.message.messageId;
      currentTurn.steerUuids.add(steerUuid);
      currentTurn.pendingSteers.set(steerUuid, {
        messageId,
        text: turnInput.message.text,
        liveQuery: existing,
        pdfReservation,
        appContextOffered,
        appContextBefore,
      });
      yield* Ref.update(steeredTurns, (current) => {
        const next = new Set(current);
        next.add(turnInput.providerTurnId);
        return next;
      });
      yield* emitSteerStatus(currentTurn, messageId, "pending");
      yield* Effect.uninterruptibleMask((restore) =>
        restore(existing.query.offer(userMessage, commitOffer)).pipe(
          Effect.tap(() => Effect.sync(commitOffer)),
        ),
      ).pipe(
        Effect.onError(() =>
          currentTurn.pendingSteers.delete(steerUuid)
            ? emitSteerStatus(currentTurn, messageId, "completed")
            : Effect.void,
        ),
      );
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
