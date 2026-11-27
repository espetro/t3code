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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindBufferWakeMessage = (ctx: any) =>
  Effect.fnUntraced(function* (wakeInput: {
    readonly nativeThreadId: string;
    readonly message: SDKMessage;
  }) {
    const {
      bufferedResultArrivals,
      claudeSettledSubagentToolUseIds,
      claudeTaskOutcome,
      consumeWakeEligibilityForBufferedNotification,
      dropSettledSubagents,
      forgetAbsorbedWake,
      hasRunningClaudeMonitor,
      isClaudeEmptyTaskNotificationSuccess,
      isClaudeNonSubagentTask,
      isClaudeRootTurnFrame,
      isClaudeTurnStartMessage,
      isNestedSubagentTask,
      isWakeEligibleOpaqueBackgroundTaskOnNativeThread,
      monitorEventWakeStarts,
      offerBufferedWake,
      offerWakeContinuation,
      opaqueTaskWakeReport,
      parentToolUseIdFromSdkMessage,
      possibleScheduledWakeStarts,
      recordWakeReport,
      releaseContinuationLatch,
      requestedContinuations,
      sessionSubagentsByTaskId,
      setRetiredLatch,
      wakeBuffers,
    } = ctx;

    const message = wakeInput.message;
    const isNotification = message.type === "system" && message.subtype === "task_notification";
    const isPendingTaskNotification =
      isNotification &&
      (yield* isWakeEligibleOpaqueBackgroundTaskOnNativeThread(
        wakeInput.nativeThreadId,
        message.task_id,
      ));
    const bufferedMessages =
      (yield* Ref.get(wakeBuffers)).get(wakeInput.nativeThreadId)?.messages ?? [];
    const isNestedSubagentNotification =
      isNotification &&
      !isPendingTaskNotification &&
      (yield* isNestedSubagentTask(message.task_id));
    const isPendingSubagentNotification =
      isNotification &&
      !isPendingTaskNotification &&
      !isNestedSubagentNotification &&
      ((yield* Ref.get(sessionSubagentsByTaskId)).get(message.task_id)?.task.status === "running" ||
        bufferedMessages.some(
          (entry) =>
            entry.type === "system" &&
            entry.subtype === "task_started" &&
            entry.task_id === message.task_id,
        ));
    // Idle-wake task_started must reach the continuation drain before child frames can find their owner.
    const isNewSubagentTaskStarted =
      message.type === "system" &&
      message.subtype === "task_started" &&
      !isClaudeNonSubagentTask(message);
    const isKnownSubagentTaskStarted =
      message.type === "system" &&
      message.subtype === "task_started" &&
      (yield* Ref.get(sessionSubagentsByTaskId)).has(message.task_id);
    // A completed subagent that Claude resumes on its own (under its launch
    // call, unlike SendMessage) has no live run left to show it while the
    // root is idle; only a continuation does.
    let isResumedSubagentTaskStarted = false;
    if (
      isKnownSubagentTaskStarted &&
      message.type === "system" &&
      message.subtype === "task_started"
    ) {
      const now = yield* DateTime.now;
      isResumedSubagentTaskStarted = yield* Ref.modify(sessionSubagentsByTaskId, (current) => {
        const registered = current.get(message.task_id);
        if (registered === undefined || registered.task.status === "running") {
          return [false, current] as const;
        }
        const { progress: _staleProgress, ...priorTask } = registered.task;
        return [
          registered.runToolUseId === message.tool_use_id,
          new Map(current).set(message.task_id, {
            ...registered,
            confirmedOutcome: undefined,
            ...(message.run_id === undefined
              ? {}
              : { resultNativeItemId: `task:${message.task_id}:result:${message.run_id}` }),
            resultItemOrdinal: null,
            task: {
              ...priorTask,
              status: "running",
              result: null,
              startedAt: now,
              completedAt: null,
              updatedAt: now,
            },
          }),
        ] as const;
      });
    }
    const isWakeTurnStart = isClaudeTurnStartMessage(message);
    const isWakeEvidence =
      isPendingTaskNotification ||
      isPendingSubagentNotification ||
      isNestedSubagentNotification ||
      isKnownSubagentTaskStarted ||
      isNewSubagentTaskStarted ||
      isWakeTurnStart ||
      message.type === "assistant" ||
      message.type === "user" ||
      message.type === "result" ||
      message.type === "rate_limit_event";
    if (!isWakeEvidence) {
      return;
    }
    const retired = (yield* Ref.get(requestedContinuations)).get(wakeInput.nativeThreadId)?.retired;
    if (retired === "unopened" && (isPendingTaskNotification || isPendingSubagentNotification)) {
      yield* releaseContinuationLatch(wakeInput.nativeThreadId);
    } else if (
      retired != null &&
      (isClaudeRootTurnFrame(message) ||
        message.type === "result" ||
        message.type === "rate_limit_event")
    ) {
      if (isClaudeEmptyTaskNotificationSuccess(message)) {
        yield* setRetiredLatch(wakeInput.nativeThreadId, "unopened");
      } else if (message.type === "result") {
        yield* releaseContinuationLatch(wakeInput.nativeThreadId);
        yield* offerBufferedWake(wakeInput.nativeThreadId);
      } else if (isClaudeRootTurnFrame(message)) {
        yield* setRetiredLatch(wakeInput.nativeThreadId, "opened");
        yield* dropSettledSubagents(
          wakeInput.nativeThreadId,
          claudeSettledSubagentToolUseIds([message]),
        );
      }
      return;
    }
    const notificationSummary =
      isNotification && typeof message.summary === "string" && message.summary.length > 0
        ? message.summary
        : null;
    if (isPendingTaskNotification) {
      yield* recordWakeReport(
        wakeInput.nativeThreadId,
        message.task_id,
        yield* opaqueTaskWakeReport(wakeInput.nativeThreadId, message),
      );
    } else if (isPendingSubagentNotification) {
      const registered = (yield* Ref.get(sessionSubagentsByTaskId)).get(message.task_id);
      const started = bufferedMessages.find(
        (entry) =>
          entry.type === "system" &&
          entry.subtype === "task_started" &&
          entry.task_id === message.task_id,
      );
      yield* recordWakeReport(wakeInput.nativeThreadId, message.task_id, {
        kind: "subagent",
        label:
          registered?.task.title ??
          (started?.type === "system" && started.subtype === "task_started"
            ? started.description
            : undefined),
        outcome: claudeTaskOutcome(message.status),
        childThreadId: registered?.childThreadId,
      });
    }
    if (message.type === "result") {
      bufferedResultArrivals.set(message, yield* DateTime.now);
    }
    if (isClaudeRootTurnFrame(message)) {
      yield* forgetAbsorbedWake(wakeInput.nativeThreadId);
    }
    if (
      isWakeTurnStart &&
      !possibleScheduledWakeStarts.has(message) &&
      (yield* hasRunningClaudeMonitor(wakeInput.nativeThreadId))
    ) {
      monitorEventWakeStarts.add(message);
    }
    yield* Ref.update(wakeBuffers, (current) => {
      const existing = current.get(wakeInput.nativeThreadId);
      const updated = new Map(current);
      updated.set(wakeInput.nativeThreadId, {
        messages: [...(existing?.messages ?? []), message],
        detail: notificationSummary ?? existing?.detail ?? null,
      });
      return updated;
    });
    if (isPendingTaskNotification) {
      yield* consumeWakeEligibilityForBufferedNotification(
        wakeInput.nativeThreadId,
        message.task_id,
      );
    }
    if (message.type === "result" && !isClaudeEmptyTaskNotificationSuccess(message)) {
      yield* Ref.update(requestedContinuations, (current) => {
        const latch = current.get(wakeInput.nativeThreadId);
        if (latch === undefined || latch.end !== undefined) return current;
        return new Map(current).set(wakeInput.nativeThreadId, { ...latch, end: message });
      });
    }
    // Open continuations only after root init, user, assistant, or result frames prove a wake began.
    // Background child frames can stream while the root is idle.
    const buffered = (yield* Ref.get(wakeBuffers)).get(wakeInput.nativeThreadId);
    const hasBufferedNotification =
      buffered?.messages.some(
        (entry) => entry.type === "system" && entry.subtype === "task_notification",
      ) ?? false;
    const isNativeOpaqueWakeFrame =
      hasBufferedNotification &&
      (message.type === "assistant" || message.type === "user") &&
      parentToolUseIdFromSdkMessage(message) === null;
    if (
      !isPendingSubagentNotification &&
      !isResumedSubagentTaskStarted &&
      !isNativeOpaqueWakeFrame &&
      !isWakeTurnStart &&
      message.type !== "result"
    ) {
      return;
    }
    yield* offerWakeContinuation(wakeInput.nativeThreadId);
  });
