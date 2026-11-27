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

import type { ClaudeApprovalResponse } from "./ClaudeAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindCanUseToolEffect = (ctx: any) =>
  Effect.fn("ClaudeAdapterV2.canUseTool")(function* (
    toolName: Parameters<CanUseTool>[0],
    toolInput: Parameters<CanUseTool>[1],
    callbackOptions: Parameters<CanUseTool>[2],
    options?: { readonly startToolCall?: boolean },
  ) {
    const {
      CLAUDE_PROVIDER,
      activeTurn,
      awaitClaudeApprovalDecision,
      awaitClaudeUserInputAnswers,
      buildApprovalRequestArtifacts,
      cancelWithdrawnRequest,
      claudeApprovalPresentation,
      claudeNativeToolInputFromRecord,
      claudeProposedPlan,
      claudeSdkUserInputAnswers,
      claudeUserInputQuestions,
      emitClaudePlanProjection,
      emitProviderEvent,
      ensureToolCallStarted,
      heldProposedPlansByToolUseId,
      heldToolUseIds,
      inputRecordValue,
      modelCatalog,
      pendingRuntimeRequests,
      pendingSubagentLaunchesByToolUseId,
      permissionResultFromDecision,
      providerRequestKindFromClaudeTool,
      queryContext,
      releaseHeldRootFrames,
      rememberClaudeSubagentLaunch,
      requiresClaudeApproval,
      summarizeClaudeToolRequest,
    } = ctx;

    const context = yield* Ref.get(activeTurn);
    if (context === null) {
      return {
        behavior: "deny",
        message: "Claude V2 adapter has no active turn for this tool request.",
        toolUseID: callbackOptions.toolUseID,
      } satisfies PermissionResult;
    }

    const nativeRequestId = callbackOptions.toolUseID;
    const nativeToolInput = claudeNativeToolInputFromRecord(toolInput);
    const heldForEcho = context.heldRootFrames.length > 0;
    const startToolCall = toolName !== "Agent" && options?.startToolCall !== false;
    if (toolName === "Agent") {
      rememberClaudeSubagentLaunch(
        modelCatalog,
        context,
        pendingSubagentLaunchesByToolUseId,
        nativeRequestId,
        nativeToolInput,
        null,
      );
    } else if (startToolCall && !heldForEcho) {
      yield* ensureToolCallStarted({
        context,
        nativeItemId: nativeRequestId,
        toolName,
        toolInput: nativeToolInput,
        parentToolUseId: null,
      });
    }

    if (
      heldForEcho &&
      toolName !== "ExitPlanMode" &&
      (toolName === "AskUserQuestion" || requiresClaudeApproval(context))
    ) {
      // The SDK blocks prompt echoes on permission answers; release held output except for ExitPlanMode.
      yield* releaseHeldRootFrames(context);
      if (startToolCall) {
        yield* ensureToolCallStarted({
          context,
          nativeItemId: nativeRequestId,
          toolName,
          toolInput: nativeToolInput,
          parentToolUseId: null,
        });
      }
    }

    if (toolName === "AskUserQuestion") {
      const questions = claudeUserInputQuestions(nativeToolInput);
      const artifacts = yield* buildApprovalRequestArtifacts({
        context,
        nativeItemId: nativeRequestId,
        nativeRequestId,
        // No tool node exists for a control request to hang under.
        ...(options?.startToolCall === false ? { parentNodeId: context.input.rootNodeId } : {}),
        requestKind: "user_input",
        questions,
      });
      const answers = yield* Deferred.make<ProviderUserInputAnswers, never>();
      yield* Ref.update(pendingRuntimeRequests, (current) => {
        const updated = new Map(current);
        updated.set(String(artifacts.request.id), {
          type: "user_input",
          answers,
        });
        return updated;
      });
      yield* Effect.all(
        [
          emitProviderEvent({
            type: "node.updated",
            driver: CLAUDE_PROVIDER,
            node: artifacts.node,
          }),
          emitProviderEvent({
            type: "runtime_request.updated",
            driver: CLAUDE_PROVIDER,
            runtimeRequest: artifacts.request,
          }),
          emitProviderEvent({
            type: "turn_item.updated",
            driver: CLAUDE_PROVIDER,
            turnItem: artifacts.turnItem,
          }),
        ],
        { concurrency: 1 },
      );
      const resolvedAnswers = yield* awaitClaudeUserInputAnswers(
        answers,
        callbackOptions.signal,
      ).pipe(
        Effect.ensuring(
          Ref.update(pendingRuntimeRequests, (current) => {
            const updated = new Map(current);
            updated.delete(String(artifacts.request.id));
            return updated;
          }),
        ),
      );
      if (!(yield* Deferred.isDone(answers))) yield* cancelWithdrawnRequest(artifacts);
      return callbackOptions.signal.aborted
        ? ({
            behavior: "deny",
            message: "User cancelled tool execution.",
          } satisfies PermissionResult)
        : ({
            behavior: "allow",
            updatedInput: {
              questions: toolInput.questions,
              answers: claudeSdkUserInputAnswers(resolvedAnswers),
            },
            toolUseID: callbackOptions.toolUseID,
          } satisfies PermissionResult);
    }

    if (toolName === "ExitPlanMode") {
      const markdown = claudeProposedPlan(nativeToolInput);
      if (markdown !== null && heldToolUseIds(context).has(nativeRequestId)) {
        heldProposedPlansByToolUseId.set(nativeRequestId, markdown);
      } else if (markdown !== null) {
        yield* emitClaudePlanProjection({
          context,
          nativeItemId: nativeRequestId,
          kind: "proposed_plan",
          markdown,
        });
      }
      return {
        behavior: "deny",
        message:
          "The client captured your proposed plan. Stop here and wait for the user's feedback or implementation request in a later turn.",
        toolUseID: callbackOptions.toolUseID,
      } satisfies PermissionResult;
    }

    if (
      context.input.runtimePolicy.interactionMode === "plan" &&
      context.input.runtimePolicy.approvalPolicy === "never"
    ) {
      return {
        behavior: "deny",
        message:
          "This tool requires approval in Plan mode, but approvals are disabled for this thread.",
        toolUseID: callbackOptions.toolUseID,
      } satisfies PermissionResult;
    }

    if (!requiresClaudeApproval(context)) {
      return {
        behavior: "allow",
        updatedInput: toolInput,
        toolUseID: callbackOptions.toolUseID,
      } satisfies PermissionResult;
    }

    const activePermissionMode =
      (yield* Ref.get(queryContext))?.permissionMode ?? context.queryPolicy.permissionMode;
    const safetyReason = NodeUtil.stripVTControlCharacters(
      callbackOptions.decisionReason ?? "",
    ).trim();
    // The SDK omits the CLI's dangerousRemoval discriminator, so match its removal warnings.
    if (
      toolName === "Bash" &&
      activePermissionMode === "bypassPermissions" &&
      callbackOptions.matchedAskRule === undefined &&
      (/^Dangerous rm(?:dir)?\b/i.test(safetyReason) ||
        /\bdangerous removal\b/i.test(safetyReason) ||
        safetyReason === "This shell -c script runs rm and could not be checked" ||
        safetyReason === "A permission rule denies a command in this shell -c script")
    ) {
      return {
        behavior: "deny",
        message: `Claude Code's removal safety check denied this command; the user did not reject it. The command did not run. Do not bypass the check by splitting the removal, putting it in a script, or using another tool or shell. If the warning below supplies a safe rewrite, use it and let the same check evaluate it. Otherwise continue the rest of the task without the removal and tell the user what you needed to delete and why. Warning: ${safetyReason}`,
        toolUseID: callbackOptions.toolUseID,
      } satisfies PermissionResult;
    }

    const requestKind = providerRequestKindFromClaudeTool(toolName);
    // The user approves the command itself; Claude's title and description only summarize it.
    const command = inputRecordValue(nativeToolInput, "command");
    const prompt =
      (typeof command === "string" && command.trim() !== "" ? command : undefined) ??
      callbackOptions.title ??
      callbackOptions.description ??
      callbackOptions.decisionReason ??
      summarizeClaudeToolRequest(toolName, nativeToolInput);
    const artifacts = yield* buildApprovalRequestArtifacts({
      context,
      nativeItemId: nativeRequestId,
      nativeRequestId,
      requestKind,
      prompt,
      presentation: claudeApprovalPresentation({
        permissionMode: context.queryPolicy.permissionMode,
        prompt,
        callbackOptions,
      }),
    });
    const decision = yield* Deferred.make<ClaudeApprovalResponse, never>();
    yield* Ref.update(pendingRuntimeRequests, (current) => {
      const updated = new Map(current);
      updated.set(String(artifacts.request.id), {
        type: "approval",
        requestKind,
        decision,
      });
      return updated;
    });
    yield* Effect.all(
      [
        emitProviderEvent({
          type: "node.updated",
          driver: CLAUDE_PROVIDER,
          node: artifacts.node,
        }),
        emitProviderEvent({
          type: "runtime_request.updated",
          driver: CLAUDE_PROVIDER,
          runtimeRequest: artifacts.request,
        }),
        emitProviderEvent({
          type: "turn_item.updated",
          driver: CLAUDE_PROVIDER,
          turnItem: artifacts.turnItem,
        }),
      ],
      { concurrency: 1 },
    );

    const resolvedDecision = yield* awaitClaudeApprovalDecision(
      decision,
      callbackOptions.signal,
    ).pipe(
      Effect.ensuring(
        Ref.update(pendingRuntimeRequests, (current) => {
          const updated = new Map(current);
          updated.delete(String(artifacts.request.id));
          return updated;
        }),
      ),
    );
    if (!(yield* Deferred.isDone(decision))) yield* cancelWithdrawnRequest(artifacts);

    return permissionResultFromDecision({
      toolName,
      ...resolvedDecision,
      toolInput,
      toolUseID: callbackOptions.toolUseID,
      managedCeiling: context.input.runtimePolicy.maxRuntimeMode !== undefined,
      ...(callbackOptions.suggestions === undefined
        ? {}
        : { suggestions: callbackOptions.suggestions }),
    });
  });
