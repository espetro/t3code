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

import type { ClaudeApprovalResponse } from "./ClaudeAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindOnElicitationEffect = (ctx: any) =>
  Effect.fn("ClaudeAdapterV2.onElicitation")(function* (
    request: ElicitationRequest,
    callbackOptions: Parameters<NonNullable<ClaudeQueryOptions["onElicitation"]>>[1],
  ) {
    const {
      CLAUDE_MCP_ELICITATION_OPTIONS,
      CLAUDE_PROVIDER,
      CLAUDE_T3_MCP_SERVER,
      activeTurn,
      buildApprovalRequestArtifacts,
      claudeMcpElicitationAcceptance,
      emitProviderEvent,
      mcpElicitationSessionGrants,
      mcpSessions,
      pendingRuntimeRequests,
      releaseHeldRootFrames,
    } = pickScriptcBindCtx(ctx);

    if (callbackOptions.signal.aborted) return { action: "cancel" } satisfies ElicitationResult;
    const acceptance = claudeMcpElicitationAcceptance(request);
    const context = yield* Ref.get(activeTurn);
    if (acceptance === undefined || context === null) {
      yield* Effect.logWarning("Cancelled an MCP elicitation the approval card cannot answer.", {
        serverName: request.serverName,
        mode: request.mode,
        activeTurn: context !== null,
      });
      // No card was shown, so the user made no choice. MCP reserves
      // "decline" for an explicit no; "cancel" tells the server the
      // request was dismissed and may be asked another way.
      return { action: "cancel" } satisfies ElicitationResult;
    }
    // T3's own tools leave what they ask with the thread's MCP session while they wait.
    // A request is T3's when it is one of those, whatever a server calls itself.
    const ownRequest =
      request.serverName === CLAUDE_T3_MCP_SERVER
        ? yield* mcpSessions.findApprovalRequest(context.input.threadId, request.message)
        : undefined;
    const grantKey = `${request.serverName}\u0000${request.message}`;
    // T3 Code asks only when a person has to answer, so its own request is never answered
    // from an earlier answer and offers none to remember.
    if (ownRequest === undefined && (yield* Ref.get(mcpElicitationSessionGrants)).has(grantKey)) {
      return acceptance;
    }
    // The CLI waits on this answer, so a turn held for its prompt echo
    // must show its output now, as canUseTool does.
    if (context.heldRootFrames.length > 0) {
      yield* releaseHeldRootFrames(context);
    }

    // The SDK's requestId names this control request; T3 allocates its own
    // runtime request id from it.
    const nativeRequestId = `mcp-elicitation:${callbackOptions.requestId}`;
    const artifacts = yield* buildApprovalRequestArtifacts({
      context,
      nativeItemId: nativeRequestId,
      nativeRequestId,
      requestKind: "mcp-elicitation",
      prompt: request.message,
      // T3 Code asking is the app itself, so there is no other app to name.
      ...(ownRequest === undefined
        ? { appName: request.displayName ?? request.title ?? request.serverName }
        : { pushHooks: ownRequest.pushHooks }),
      options:
        ownRequest === undefined
          ? CLAUDE_MCP_ELICITATION_OPTIONS
          : CLAUDE_MCP_ELICITATION_OPTIONS.filter(
              (option) => option.decision !== "acceptForSession",
            ),
    });
    const decision = yield* Deferred.make<ClaudeApprovalResponse>();
    yield* Ref.update(pendingRuntimeRequests, (current) => {
      const updated = new Map(current);
      updated.set(String(artifacts.request.id), {
        type: "approval",
        requestKind: "mcp-elicitation",
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

    // Closing the query aborts the signal, so a stopped session settles
    // this as cancel and a late response finds no pending request.
    const { decision: resolved } = yield* awaitClaudeApprovalDecision(
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
    if (resolved === "cancel" && callbackOptions.signal.aborted) {
      const now = yield* DateTime.now;
      yield* emitProviderEvent({
        type: "node.updated",
        driver: CLAUDE_PROVIDER,
        node: { ...artifacts.node, status: "cancelled", completedAt: now },
      });
      yield* emitProviderEvent({
        type: "turn_item.updated",
        driver: CLAUDE_PROVIDER,
        turnItem: {
          ...artifacts.turnItem,
          status: "cancelled",
          completedAt: now,
          updatedAt: now,
        },
      });
      yield* emitProviderEvent({
        type: "runtime_request.updated",
        driver: CLAUDE_PROVIDER,
        runtimeRequest: { ...artifacts.request, status: "cancelled", resolvedAt: now },
      });
    }
    // The person's answer in the app is what T3 Code's own request goes by, so it is
    // left with the request before the CLI carries a reply back.
    if (ownRequest !== undefined) {
      yield* mcpSessions.answerApprovalRequests(
        context.input.threadId,
        request.message,
        resolved === "accept" || resolved === "acceptForSession",
      );
    }
    if (resolved === "acceptForSession") {
      if (ownRequest === undefined) {
        yield* Ref.update(mcpElicitationSessionGrants, (current) => new Set(current).add(grantKey));
      }
      return acceptance;
    }
    // Never null: the SDK reads null as answered out of band and leaves
    // the server waiting.
    return resolved === "accept"
      ? acceptance
      : ({
          action: resolved === "cancel" ? "cancel" : "decline",
        } satisfies ElicitationResult);
  });
