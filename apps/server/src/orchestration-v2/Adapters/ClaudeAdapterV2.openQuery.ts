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

import type { ClaudeLiveQueryContext, ClaudeQueryStreamExit } from "./ClaudeAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindOpenQuery = (ctx: any) =>
  Effect.fnUntraced(function* (
    turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
    nativeThreadId: string,
    queryPolicy: any,
  ) {
    const {
      CLAUDE_CODE_PRESET_TOOLS,
      ClaudeAgentSdkQueryRunnerError,
      ClaudeBackgroundWorkBlocksQueryReplacementError,
      activeTurn,
      adapterOptions,
      announceAutoFallback,
      announcedMcpSignIns,
      appliedSessionTitles,
      applySelectionLive,
      attachmentsDir,
      canApplyClaudeSelectionLive,
      canUseTool,
      claudeEffectiveQueryPolicyKey,
      claudeMcpQueryOverrides,
      claudeQueryEnvironment,
      claudeSdkLaunchArgSettings,
      clearWakeStateForNativeThread,
      clearedNativeSessions,
      endSubagentCallsOfClosedQuery,
      endSubagentsOfReplacedQuery,
      fileSystem,
      finalizeActiveTurnAfterQueryExit,
      getNativeConversationHeadId,
      goalsByNativeThread,
      handleSdkMessage,
      holdsBufferedWake,
      hostPlatform,
      input,
      isClaudeConversationNotFound,
      isClaudeProviderContinuationTurn,
      liveProcessMissedTranscriptMessages,
      liveProcessRunsBackgroundWork,
      makeClaudeQueryOptions,
      mcpSessions,
      mcpSignInKey,
      missingNativeThreads,
      modelCatalog,
      onElicitation,
      onUserDialog,
      openedNativeThreads,
      path,
      promptSuggestionsEnabled,
      queryContext,
      queryPolicyForTurn,
      queryRunner,
      readClaudeAppendSystemPromptFile,
      readClaudeLaunchArgSettings,
      readProgram,
      releaseHeldRootFrames,
      reportStartupPhase,
      reportedContextWindows,
      resetBackgroundTaskStateForNativeThreadProcess,
      resolveSubagentPromptCacheTtl,
      resolveToolSearchOverride,
      resultLedgerUsage,
      resultsReportingNewContextWindow,
      routeModelCatalog,
      runPromise,
      sandboxPolicyKindForClaudeRuntimePolicy,
      scheduledWakeupsByNativeThread,
      sdkMessageLock,
      sessionScope,
      sessionSubagentsByTaskId,
      wakeBuffers,
    } = ctx;

    const mcpSession = yield* mcpSessions.read(turnInput.threadId);
    // Claude Code defers its goal Stop hook only for its own background tasks, so a goal
    // re-prompts in a loop while T3 work that will wake this thread is still running.
    const onStop: HookCallback = () =>
      runPromise(
        Effect.gen(function* () {
          if (goalsByNativeThread.get(nativeThreadId)?.status !== "active") return {};
          const pendingWake = (yield* mcpSessions.read(turnInput.threadId))?.hasPendingWake;
          return pendingWake !== undefined && (yield* pendingWake) ? { continue: false } : {};
        }),
      );
    const mcpOverrides = claudeMcpQueryOverrides({
      mcpSession,
      readOnlySandbox:
        sandboxPolicyKindForClaudeRuntimePolicy(turnInput.runtimePolicy) === "readOnly",
      ...(queryPolicy.allowedTools === undefined ? {} : { allowedTools: queryPolicy.allowedTools }),
    });
    const queryPolicyKey = claudeEffectiveQueryPolicyKey(
      queryPolicy,
      mcpOverrides,
      turnInput.runtimePolicy.workspace,
    );
    const resumeSessionAt = yield* getNativeConversationHeadId(turnInput.providerThread);
    const existing = yield* Ref.get(queryContext);
    // Continuations drain existing output without prompting; retain the live process regardless of selection.
    if (
      existing !== null &&
      existing.nativeThreadId === nativeThreadId &&
      !existing.stopping &&
      isClaudeProviderContinuationTurn(turnInput)
    ) {
      return existing;
    }
    let replaceStaleProcess = false;
    if (
      !turnInput.resume &&
      existing !== null &&
      existing.nativeThreadId === nativeThreadId &&
      existing.queryPolicyKey === queryPolicyKey &&
      !existing.stopping &&
      // A pinned head already decides where a fresh process resumes.
      resumeSessionAt === undefined
    ) {
      // Decided before the transcript read: with no pending wakeup then, none can fire during it.
      const keepsWork =
        (yield* liveProcessRunsBackgroundWork(existing)) ||
        scheduledWakeupsByNativeThread.has(nativeThreadId) ||
        (yield* holdsBufferedWake(
          nativeThreadId,
          (yield* Ref.get(wakeBuffers)).get(nativeThreadId)?.messages ?? [],
        ));
      if (yield* liveProcessMissedTranscriptMessages(existing)) {
        if (keepsWork) {
          yield* Effect.logWarning(
            "orchestration-v2.claude-stale-process-kept-for-background-work",
            { threadId: turnInput.threadId, nativeThreadId },
          );
        } else {
          replaceStaleProcess = true;
        }
      }
    }
    const reuseLaunchSettings =
      existing !== null &&
      existing.nativeThreadId === nativeThreadId &&
      existing.queryPolicyKey === queryPolicyKey &&
      !existing.stopping;
    const readLaunchSettings = readClaudeLaunchArgSettings({
      settings: adapterOptions.settings,
      cwd: turnInput.runtimePolicy.cwd,
      fileSystem,
      path,
    });
    let launchArgSettings = reuseLaunchSettings
      ? existing.launchArgSettings
      : yield* readLaunchSettings;
    let catalog = yield* routeModelCatalog(
      modelCatalog,
      turnInput.runtimePolicy.cwd,
      launchArgSettings,
    );
    let compiledSelection = compileClaudeModelSelection(turnInput.modelSelection, catalog);
    // Once an update replaces the running CLI, a model other than the one
    // it started with moves to the new CLI unless background work is active.
    const startsUpdatedProgram =
      !turnInput.resume &&
      existing !== null &&
      existing.nativeThreadId === nativeThreadId &&
      existing.queryPolicyKey === queryPolicyKey &&
      !existing.stopping &&
      existing.startedWithApiModelId !== compiledSelection.apiModelId &&
      claudeProgramWasReplaced(existing.program, yield* readProgram) &&
      !(yield* liveProcessRunsBackgroundWork(existing));
    if (
      !startsUpdatedProgram &&
      !turnInput.resume &&
      existing !== null &&
      existing.nativeThreadId === nativeThreadId &&
      existing.queryPolicyKey === queryPolicyKey &&
      !existing.stopping &&
      !replaceStaleProcess &&
      existing.selection.queryIdentity !== compiledSelection.queryIdentity &&
      canApplyClaudeSelectionLive(existing.selection, compiledSelection) &&
      (existing.selection.apiModelId === compiledSelection.apiModelId ||
        existing.openedPermissionMode === queryPolicy.permissionMode)
    ) {
      yield* applySelectionLive(existing, compiledSelection);
    }
    if (
      !startsUpdatedProgram &&
      !turnInput.resume &&
      existing !== null &&
      existing.nativeThreadId === nativeThreadId &&
      existing.queryPolicyKey === queryPolicyKey &&
      !existing.stopping &&
      !replaceStaleProcess &&
      existing.selection.queryIdentity === compiledSelection.queryIdentity
    ) {
      // A denied ExitPlanMode leaves Claude in plan mode. Restore only from plan:
      // Auto/default may reflect a policy restriction that forbids restoring bypass.
      if (existing.permissionMode === "plan" && existing.openedPermissionMode !== "plan") {
        existing.permissionMode = yield* existing.query
          .setPermissionMode(existing.openedPermissionMode)
          .pipe(
            Effect.as(existing.openedPermissionMode),
            Effect.catchTags({
              ClaudeAgentSdkQueryRunnerError: (error) =>
                existing.openedPermissionMode === "bypassPermissions"
                  ? existing.query.setPermissionMode("default").pipe(Effect.as("default" as const))
                  : Effect.fail(error),
            }),
          );
      }
      return existing;
    }

    // Replacing this thread's process kills its background work, even with a new native identity.
    if (
      existing !== null &&
      (existing.nativeThreadId === nativeThreadId ||
        existing.lastTurn?.input.threadId === turnInput.threadId) &&
      !existing.stopping &&
      (yield* liveProcessRunsBackgroundWork(existing))
    ) {
      return yield* new ClaudeBackgroundWorkBlocksQueryReplacementError();
    }

    if (reuseLaunchSettings) {
      launchArgSettings = yield* readLaunchSettings;
      catalog = yield* routeModelCatalog(
        modelCatalog,
        turnInput.runtimePolicy.cwd,
        launchArgSettings,
      );
      compiledSelection = compileClaudeModelSelection(turnInput.modelSelection, catalog);
    }

    // Read before closing the live process so a bad path leaves it running.
    const [appendSystemPromptFileText, toolSearchOverride] = yield* Effect.all(
      [
        readClaudeAppendSystemPromptFile({
          settings: adapterOptions.settings,
          cwd: turnInput.runtimePolicy.cwd,
          fileSystem,
          path,
        }),
        resolveToolSearchOverride(turnInput.runtimePolicy.cwd, launchArgSettings),
      ],
      { concurrency: "unbounded" },
    );
    const closedExistingNativeThreadId = existing !== null ? existing.nativeThreadId : null;
    clearedNativeSessions.delete(nativeThreadId);
    if (existing !== null) {
      existing.stopping = true;
      yield* existing.query.close.pipe(Effect.ignore);
      if (existing.nativeThreadId !== nativeThreadId) {
        yield* clearWakeStateForNativeThread(existing.nativeThreadId);
        yield* resetBackgroundTaskStateForNativeThreadProcess(existing.nativeThreadId, {
          status: "idle",
        });
      }
    }

    const openedWithResume = (yield* Ref.get(openedNativeThreads)).has(nativeThreadId);
    // Idle release loses openedNativeThreads; persisted turns still require resume to avoid "already in use".
    const hasPersistedProviderTurn =
      turnInput.nativeThreadHasTurns ?? turnInput.providerTurnOrdinal > 1;
    const shouldResume =
      resumeSessionAt !== undefined || openedWithResume || hasPersistedProviderTurn;
    const queryOptions = makeClaudeQueryOptions({
      agentFeedback: turnInput.agentFeedback ?? "off",
      modelSelection: turnInput.modelSelection,
      modelCatalog: catalog,
      nativeThreadId,
      title: turnInput.appThread.title,
      resume: shouldResume,
      ...(resumeSessionAt === undefined ? {} : { resumeSessionAt }),
      cwd: turnInput.runtimePolicy.cwd,
      ...(turnInput.runtimePolicy.workspace === undefined
        ? {}
        : { workspace: turnInput.runtimePolicy.workspace }),
      attachmentsDir,
      settings: adapterOptions.settings,
      // Delegated threads have no one typing, so they never ask for suggestions.
      promptSuggestions:
        !isDelegatedAppThread(turnInput.appThread) && (yield* promptSuggestionsEnabled),
      ...(launchArgSettings === undefined
        ? {}
        : { sdkSettings: claudeSdkLaunchArgSettings(launchArgSettings) }),
      environment: claudeQueryEnvironment(
        adapterOptions.environment,
        turnInput.appThread,
        turnInput.appThread.lineage.relationshipToParent === "subagent"
          ? yield* resolveSubagentPromptCacheTtl(turnInput.runtimePolicy.cwd)
          : undefined,
        shouldResume,
      ),
      tools: queryPolicy.tools ?? CLAUDE_CODE_PRESET_TOOLS,
      ...(mcpOverrides.allowedTools === undefined
        ? {}
        : { allowedTools: mcpOverrides.allowedTools }),
      ...(mcpOverrides.mcpServers === undefined ? {} : { mcpServers: mcpOverrides.mcpServers }),
      deviceToolsAvailable: mcpSession?.capabilities?.has("device") === true,
      permissionMode: queryPolicy.permissionMode,
      ...(queryPolicy.allowDangerouslySkipPermissions === undefined
        ? {}
        : {
            allowDangerouslySkipPermissions: queryPolicy.allowDangerouslySkipPermissions,
          }),
      canUseTool,
      onUserDialog,
      onElicitation,
      onStop,
      supportedDialogKinds: ["resume_return"],
      ...(appendSystemPromptFileText === undefined ? {} : { appendSystemPromptFileText }),
      ...(toolSearchOverride === undefined ? {} : { toolSearchOverride }),
    });
    const resolvedTurnCwd = yield* fileSystem
      .realPath(turnInput.runtimePolicy.cwd ?? ".")
      .pipe(Effect.orElseSucceed(() => turnInput.runtimePolicy.cwd));
    // Read right before opening so an update during startup counts too.
    const openQueryRuntime = readProgram.pipe(
      Effect.flatMap((program) =>
        queryRunner
          .open({
            threadId: turnInput.threadId,
            providerSessionId: input.providerSessionId,
            options: queryOptions,
            ...(turnInput.resume ? { resume: true } : {}),
            onStartupPhase: reportStartupPhase,
          })
          .pipe(
            Effect.map((querySession) => ({ program, querySession })),
            Effect.ensuring(Effect.suspend(() => reportStartupPhase(undefined))),
          ),
      ),
    );
    // The SDK spawns the CLI when a query opens, so only the open waits for a provider update.
    const { program, querySession } = yield* (
      adapterOptions.installationGate === undefined
        ? openQueryRuntime
        : adapterOptions.installationGate.execute(adapterOptions.instanceId, openQueryRuntime)
    ).pipe(
      Effect.onError(() =>
        closedExistingNativeThreadId === nativeThreadId
          ? Effect.gen(function* () {
              yield* clearWakeStateForNativeThread(nativeThreadId);
              yield* resetBackgroundTaskStateForNativeThreadProcess(nativeThreadId, {
                status: "idle",
              });
            })
          : Effect.void,
      ),
    );
    // Mark only successful opens; retries must not resume sessions that failed to create.
    yield* Ref.update(openedNativeThreads, (current) => {
      if (current.has(nativeThreadId)) {
        return current;
      }
      const updated = new Set(current);
      updated.add(nativeThreadId);
      return updated;
    });
    // A new session's spawn applied this turn's title. A resume keeps the session's stored
    // title, so the last applied one stays authoritative until a turn compares again.
    if (!shouldResume) {
      appliedSessionTitles.set(nativeThreadId, turnInput.appThread.title);
    }
    yield* resetBackgroundTaskStateForNativeThreadProcess(nativeThreadId, {
      status: "active",
    });
    const closed = yield* Deferred.make<void, never>();
    const context: ClaudeLiveQueryContext = {
      queryPolicy,
      nativeThreadId,
      settingsCwd: turnInput.runtimePolicy.cwd,
      launchArgSettings,
      query: querySession,
      queryPolicyKey,
      selection: compiledSelection,
      program,
      startedWithApiModelId: compiledSelection.apiModelId,
      closed,
      lastTurn: null,
      promptEchoMode: "unknown",
      requestedPermissionMode: queryOptions.permissionMode,
      openedPermissionMode: queryOptions.permissionMode,
      receivedInit: false,
      checkMcpSignIns: false,
      capabilities: new Set(),
      claudeCodeVersion: undefined,
      permissionMode: queryOptions.permissionMode,
      stopping: false,
      exitCause: undefined,
      handedOffSubagents: new Set(),
      subagentsFromEarlierProcesses: new Set(
        [...(yield* Ref.get(sessionSubagentsByTaskId)).values()].filter(
          (subagent) => subagent.task.status === "running",
        ),
      ),
      modelLedger: new Map(),
      taskOutputRoot: claudeTaskOutputRoot(
        adapterOptions.environment,
        path,
        resolvedTurnCwd,
        hostPlatform,
      ),
      emittedMessageUuids: new Set(),
      transcriptPath: undefined,
    };
    // One step, so the replaced process cannot exit between the install and the handoff.
    yield* Ref.update(queryContext, (replaced) => {
      if (replaced !== null) {
        replaced.handedOffSubagents = new Set(
          [...context.subagentsFromEarlierProcesses].filter(
            (subagent) => !replaced.subagentsFromEarlierProcesses.has(subagent),
          ),
        );
      }
      return context;
    });
    yield* querySession.messages.pipe(
      Stream.runForEach((message) =>
        sdkMessageLock.withPermits(1)(
          Effect.suspend(() => {
            let firstInit = false;
            if (
              (message.type === "assistant" || message.type === "user") &&
              message.parent_tool_use_id === null &&
              message.uuid !== undefined
            ) {
              context.emittedMessageUuids.add(message.uuid);
            }
            if (message.type === "system" && message.subtype === "init" && !context.receivedInit) {
              firstInit = true;
              context.openedPermissionMode = message.permissionMode ?? context.openedPermissionMode;
              context.receivedInit = true;
              context.capabilities = new Set(message.capabilities ?? []);
              context.claudeCodeVersion = message.claude_code_version;
            }
            if (message.type === "system" && message.subtype === "init") {
              for (const server of message.mcp_servers ?? []) {
                if (server.status === "connected") {
                  announcedMcpSignIns.delete(mcpSignInKey(context.nativeThreadId, server.name));
                }
              }
              // Recorded frames from older CLIs can omit the list.
              context.checkMcpSignIns = (message.mcp_servers ?? []).some(
                (server) =>
                  (server.status === "pending" || server.status === "needs-auth") &&
                  // claude.ai connectors the user never connected need a sign-in too.
                  !server.name.startsWith("claude.ai "),
              );
            }
            if (
              message.type === "system" &&
              message.subtype === "init" &&
              message.session_id.length > 0 &&
              message.session_id !== context.nativeThreadId
            ) {
              clearedNativeSessions.set(context.nativeThreadId, message.session_id);
            }
            if (
              message.type === "system" &&
              (message.subtype === "init" || message.subtype === "status") &&
              message.permissionMode !== undefined
            ) {
              context.permissionMode = message.permissionMode;
            }
            if (message.type === "result") {
              const ledger = claudeModelLedger(message.modelUsage);
              const growth = claudeLedgerDelta(context.modelLedger, ledger);
              if (growth !== undefined) resultLedgerUsage.set(message, growth);
              // A ledger that went backwards cannot anchor the next turn's growth.
              context.modelLedger =
                growth === undefined && context.modelLedger !== undefined ? undefined : ledger;
              for (const [model, window] of claudeReportedContextWindows(message.modelUsage)) {
                if (reportedContextWindows.get(model) === window) continue;
                reportedContextWindows.set(model, window);
                resultsReportingNewContextWindow.add(message);
              }
            }
            const isInit = message.type === "system" && message.subtype === "init";
            const handled = handleSdkMessage({ query: querySession, message }).pipe(
              Effect.andThen(
                isInit
                  ? Ref.get(activeTurn).pipe(
                      Effect.flatMap((turn) =>
                        turn === null ? Effect.void : announceAutoFallback(turn, context),
                      ),
                    )
                  : Effect.void,
              ),
            );
            const reportedCwd = turnInput.runtimePolicy.cwd;
            if (!firstInit || reportedCwd === null || !adapterOptions.onSessionInit) {
              return handled;
            }
            return adapterOptions.onSessionInit(reportedCwd).pipe(Effect.andThen(handled));
          }),
        ),
      ),
      Effect.exit,
      Effect.flatMap(
        Effect.fnUntraced(function* (exit: ClaudeQueryStreamExit) {
          if (exit._tag === "Failure") {
            context.exitCause = exit.cause;
            if (isClaudeConversationNotFound(exit.cause)) {
              missingNativeThreads.add(context.nativeThreadId);
            }
          }
          const heldContext = yield* Ref.get(activeTurn);
          if (
            (yield* Ref.get(queryContext))?.query === querySession &&
            heldContext !== null &&
            heldContext.heldRootFrames.length > 0
          ) {
            yield* releaseHeldRootFrames(heldContext);
          }
          const ownsLiveQuery = yield* Ref.modify(queryContext, (current) =>
            current?.query === querySession ? [true, null] : [false, current],
          );
          if (ownsLiveQuery) {
            yield* finalizeActiveTurnAfterQueryExit(
              context,
              exit._tag === "Failure" ? exit.cause : undefined,
            );
            yield* endSubagentCallsOfClosedQuery(
              context.nativeThreadId,
              context.stopping ? "interrupted" : "failed",
            );
          } else {
            yield* endSubagentsOfReplacedQuery(context);
          }
        }),
      ),
      Effect.ensuring(Deferred.succeed(closed, undefined)),
      Effect.forkIn(sessionScope),
    );
    return context;
  });
