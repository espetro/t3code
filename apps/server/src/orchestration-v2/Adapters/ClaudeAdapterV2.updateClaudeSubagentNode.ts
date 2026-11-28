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

import type { ActiveClaudeSubagent, ActiveClaudeTurnContext } from "./ClaudeAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindUpdateClaudeSubagentNode = (ctx: any) =>
  Effect.fnUntraced(function* (input: {
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
    const {
      CLAUDE_PROVIDER,
      appliedSubagentOutcomes,
      claudeSubagentIds,
      claudeSubagentModelSelection,
      confirmedSubagentOutcome,
      emitProviderEvent,
      emitSubagentConversationMessage,
      endToolCalls,
      modelCatalog,
      normalizeClaudeResultText,
      projectClaudeWorkflowMembers,
      readSubagentTranscriptEffort,
      resolveItemOrdinal,
      sessionSubagentTaskIdsByToolUseId,
      sessionSubagentsByTaskId,
      subagentStopOutcomes,
      subagentToolCalls,
      withWorkflowMemberThreadIds,
    } = pickScriptcBindCtx(ctx);

    const registeredSubagent = (yield* Ref.get(sessionSubagentsByTaskId)).get(input.taskId);
    const existingSubagent =
      input.onlyIfRunningInRun !== undefined
        ? registeredSubagent
        : (input.context.subagentsByTaskId.get(input.taskId) ??
          (input.toolUseId === undefined
            ? undefined
            : input.context.subagentsByToolUseId.get(input.toolUseId)) ??
          registeredSubagent);
    if (existingSubagent === undefined && input.status !== "running") {
      return;
    }
    if (
      input.onlyIfRunningInRun !== undefined &&
      (existingSubagent?.task.status !== "running" ||
        existingSubagent.task.runId !== input.onlyIfRunningInRun)
    )
      return;
    // Only task_started may reopen a terminal task id on resume; late task_progress must not.
    const isReopen =
      input.reopen === true &&
      existingSubagent !== undefined &&
      existingSubagent.task.status !== "running" &&
      input.status === "running";
    if (
      existingSubagent !== undefined &&
      existingSubagent.task.status !== "running" &&
      input.status === "running" &&
      !isReopen
    ) {
      return;
    }
    // Resume task_started uses the SendMessage tool_use_id and sent message as its prompt.
    const resumeToolUseId =
      input.reopen === true &&
      existingSubagent !== undefined &&
      input.toolUseId !== undefined &&
      input.toolUseId !== existingSubagent.runToolUseId &&
      input.prompt !== undefined
        ? input.toolUseId
        : null;
    const lifecycleChanged =
      existingSubagent === undefined ||
      existingSubagent.task.status !== input.status ||
      (input.reopen === true && input.status === "running");

    const now = yield* DateTime.now;
    const nativeItemId = `task:${input.taskId}`;
    const derivedIds = claudeSubagentIds(input.context, input.taskId);
    const nodeId = existingSubagent?.task.id ?? derivedIds.nodeId;
    const childRootNodeId = existingSubagent?.childRootNodeId ?? derivedIds.childRootNodeId;
    const childThreadId = existingSubagent?.childThreadId ?? derivedIds.childThreadId;
    const turnItemOrdinal =
      existingSubagent?.turnItemOrdinal ??
      (yield* resolveItemOrdinal(input.context, `${nativeItemId}:subagent`));
    const priorTask =
      existingSubagent === undefined
        ? undefined
        : isReopen
          ? (({ progress: _staleProgress, ...rest }) => ({ ...rest, result: null }))(
              existingSubagent.task,
            )
          : existingSubagent.task;
    const workflow = mergeClaudeWorkflowProgress({
      previous: priorTask?.workflow,
      ...(input.workflowName === undefined ? {} : { name: input.workflowName }),
      ...(input.workflowRunHandles === undefined ? {} : { runHandles: input.workflowRunHandles }),
      message: input.workflowFrame,
    });
    const workflowWithThreads =
      workflow === undefined ? undefined : withWorkflowMemberThreadIds(workflow, childThreadId);
    // Unstated effort stays unknown until the transcript reports it: a custom agent definition may override the owner's.
    // Read it before the settle: a run stops consuming events once its subagents settle.
    const effort =
      existingSubagent === undefined
        ? input.effort
        : (existingSubagent.effort ??
          (lifecycleChanged &&
          input.status !== "running" &&
          existingSubagent.task.modelSelection !== undefined &&
          (input.nativeTaskType ?? existingSubagent.nativeTaskType) !== CLAUDE_WORKFLOW_TASK_TYPE
            ? yield* readSubagentTranscriptEffort(
                input.context,
                input.taskId,
                input.status === "completed",
              )
            : undefined));
    const model = input.model ?? priorTask?.model ?? null;
    const movesToCurrentRun =
      input.reopen === true && input.status === "running" && existingSubagent !== undefined;
    const task = {
      ...(priorTask ?? {
        id: nodeId,
        threadId: input.context.input.threadId,
        runId: input.context.input.runId,
        parentNodeId: input.owner?.task.id ?? input.context.input.rootNodeId,
        origin: "provider_native" as const,
        createdBy: "agent" as const,
        driver: CLAUDE_PROVIDER,
        providerInstanceId: input.context.input.modelSelection.instanceId,
        providerThreadId: null,
        childThreadId,
        nativeTaskRef: {
          driver: CLAUDE_PROVIDER,
          nativeId: input.taskId,
          strength: "strong" as const,
        },
        prompt: input.prompt ?? "",
        title: input.title ?? null,
        model: input.model ?? null,
        result: null,
        startedAt: now,
      }),
      status: input.status,
      ...(movesToCurrentRun ? { runId: input.context.input.runId } : {}),
      ...(input.prompt === undefined ? {} : { prompt: input.prompt }),
      ...(input.title === undefined ? {} : { title: input.title }),
      model,
      ...(existingSubagent === undefined || existingSubagent.task.modelSelection !== undefined
        ? {
            modelSelection: claudeSubagentModelSelection(
              modelCatalog,
              input.context.input.modelSelection.instanceId,
              model || input.context.input.modelSelection.model,
              effort,
            ),
          }
        : {}),
      ...(input.progress === undefined ? {} : { progress: input.progress }),
      ...(workflowWithThreads === undefined ? {} : { workflow: workflowWithThreads }),
      ...(input.result === undefined ? {} : { result: input.result }),
      ...(isReopen ? { startedAt: now } : {}),
      completedAt: input.status === "running" ? null : (priorTask?.completedAt ?? now),
      updatedAt: now,
    } satisfies OrchestrationV2Subagent;
    const subagent = {
      task,
      nativeTaskType: input.nativeTaskType ?? existingSubagent?.nativeTaskType,
      confirmedOutcome:
        input.nativeOutcome !== undefined || input.processExited === true
          ? confirmedSubagentOutcome(task)
          : isReopen
            ? undefined
            : existingSubagent?.confirmedOutcome,
      rootNodeId: existingSubagent?.rootNodeId ?? input.context.input.rootNodeId,
      childThreadId,
      childRootNodeId,
      turnItemId: existingSubagent?.turnItemId ?? derivedIds.turnItemId,
      turnItemOrdinal,
      providerTurnId:
        existingSubagent === undefined || movesToCurrentRun
          ? input.context.providerTurnId
          : existingSubagent.providerTurnId,
      runToolUseId:
        existingSubagent === undefined
          ? (input.toolUseId ?? null)
          : (resumeToolUseId ?? existingSubagent.runToolUseId),
      childThread: existingSubagent?.childThread ?? null,
      effort,
      nextChildItemOrdinal: existingSubagent?.nextChildItemOrdinal ?? 100,
      resultNativeItemId:
        existingSubagent === undefined
          ? `${nativeItemId}:result`
          : isReopen && input.nativeRunId !== undefined
            ? `${nativeItemId}:result:${input.nativeRunId}`
            : existingSubagent.resultNativeItemId,
      resultItemOrdinal: isReopen ? null : (existingSubagent?.resultItemOrdinal ?? null),
      lastAssistantText:
        input.reopen === true ? null : (existingSubagent?.lastAssistantText ?? null),
      lastAssistantMessageId:
        input.reopen === true ? null : (existingSubagent?.lastAssistantMessageId ?? null),
    } satisfies ActiveClaudeSubagent;
    // Ingestion can terminalize after lookup; reopen only that generation to preserve newer results.
    const accepted = yield* Ref.modify(sessionSubagentsByTaskId, (current) => {
      const registered = current.get(input.taskId);
      if (
        (input.onlyIfRunningInRun !== undefined &&
          (registered?.task.status !== "running" ||
            registered.task.runId !== input.onlyIfRunningInRun)) ||
        (registered !== undefined &&
          registered.task.status !== "running" &&
          input.status === "running" &&
          !(isReopen && registered === existingSubagent))
      ) {
        return [false, current] as const;
      }
      return [true, new Map(current).set(input.taskId, subagent)] as const;
    });
    if (!accepted) return;
    if (input.nativeOutcome !== undefined) appliedSubagentOutcomes.add(input.nativeOutcome);
    if (existingSubagent !== undefined && input.status !== "running") {
      const openCalls = [...subagentToolCalls.values()].filter(
        (toolCall) => toolCall.threadId === existingSubagent.childThreadId,
      );
      yield* endToolCalls({
        context: input.context,
        toolCalls: openCalls,
        status: input.status === "cancelled" ? "interrupted" : "failed",
        completedAt: yield* DateTime.now,
      });
      for (const toolCall of openCalls) {
        subagentToolCalls.delete(toolCall.nativeItemId);
      }
    }
    input.context.subagentsByTaskId.set(input.taskId, subagent);
    if (input.toolUseId !== undefined) {
      input.context.subagentsByToolUseId.set(input.toolUseId, subagent);
      const toolUseId = input.toolUseId;
      yield* Ref.update(sessionSubagentTaskIdsByToolUseId, (current) =>
        current.get(toolUseId) === input.taskId
          ? current
          : new Map(current).set(toolUseId, input.taskId),
      );
    }

    if (subagent.childThread === null) {
      const childThread = makeSubagentChildThread({
        parentThread: input.context.input.appThread,
        childThreadId,
        parentNodeId: nodeId,
        activeProviderThreadId: null,
        providerInstanceId: input.context.input.modelSelection.instanceId,
        modelSelection: task.modelSelection ?? input.context.input.modelSelection,
        title: subagentThreadTitle({
          parentTitle: input.context.input.appThread.title,
          prompt: task.prompt,
          title:
            workflowWithThreads === undefined
              ? task.title
              : `Workflow · ${workflowWithThreads.name ?? task.title ?? "Untitled"}`,
          ordinal: input.context.subagentsByTaskId.size,
        }),
        now,
        createdBy: "agent",
        creationSource: "provider",
      });
      // Recovery cannot tell whether the child thread was already persisted.
      yield* emitProviderEvent({
        type: "app_thread.created",
        driver: CLAUDE_PROVIDER,
        appThread: childThread,
        ...(existingSubagent === undefined ? {} : { createOnly: true }),
      });
      subagent.childThread = childThread;
    }

    if (lifecycleChanged) {
      yield* emitProviderEvent({
        type: "node.updated",
        driver: CLAUDE_PROVIDER,
        node: {
          id: nodeId,
          threadId: task.threadId,
          runId: task.runId,
          parentNodeId: task.parentNodeId,
          rootNodeId: subagent.rootNodeId,
          kind: "subagent",
          status: input.status,
          countsForRun: false,
          providerThreadId: input.context.input.providerThread.id,
          providerTurnId: input.context.providerTurnId,
          nativeItemRef: {
            driver: CLAUDE_PROVIDER,
            nativeId: input.taskId,
            strength: "strong",
          },
          runtimeRequestId: null,
          checkpointScopeId: null,
          startedAt: task.startedAt,
          completedAt: task.completedAt,
        },
      });
    }
    // Emit before child records so the resumed run can adopt the child thread.
    yield* emitProviderEvent({
      type: "subagent.updated",
      driver: CLAUDE_PROVIDER,
      subagent: task,
    });
    if (lifecycleChanged) {
      yield* emitProviderEvent({
        type: "node.updated",
        driver: CLAUDE_PROVIDER,
        node: {
          id: childRootNodeId,
          threadId: childThreadId,
          runId: null,
          parentNodeId: null,
          rootNodeId: childRootNodeId,
          kind: "root_turn",
          status: input.status,
          countsForRun: false,
          providerThreadId: null,
          providerTurnId: null,
          nativeItemRef: task.nativeTaskRef,
          runtimeRequestId: null,
          checkpointScopeId: null,
          startedAt: task.startedAt,
          completedAt: task.completedAt,
        },
      });
    }
    const promptNativeItemId =
      existingSubagent === undefined
        ? `${nativeItemId}:prompt`
        : resumeToolUseId === null
          ? null
          : `${nativeItemId}:prompt:${resumeToolUseId}`;
    if (promptNativeItemId !== null) {
      yield* emitSubagentConversationMessage({
        nativeItemId: promptNativeItemId,
        senderThreadId: input.context.input.threadId,
        threadId: childThreadId,
        rootNodeId: childRootNodeId,
        role: "user",
        text: task.prompt,
        // Workflow prompts are collapsed scripts; clients open with the plan. A brief must not be mistaken for a script.
        ...(existingSubagent === undefined ? { workflowScript: task.workflow !== undefined } : {}),
        ordinal: existingSubagent === undefined ? 100 : ++subagent.nextChildItemOrdinal,
        now,
      });
    }
    if (workflowWithThreads !== undefined) {
      yield* projectClaudeWorkflowMembers({
        coordinator: subagent,
        workflow: workflowWithThreads,
      });
      if ((yield* Ref.get(sessionSubagentsByTaskId)).get(input.taskId) !== subagent) return;
    }
    yield* emitProviderEvent({
      type: "turn_item.updated",
      driver: CLAUDE_PROVIDER,
      turnItem: {
        id: subagent.turnItemId,
        threadId: task.threadId,
        runId: task.runId,
        nodeId: task.id,
        providerThreadId: input.context.input.providerThread.id,
        providerTurnId: subagent.providerTurnId,
        nativeItemRef: task.nativeTaskRef,
        parentItemId: null,
        ordinal: subagent.turnItemOrdinal,
        status: task.status,
        title: task.title,
        startedAt: task.startedAt,
        completedAt: task.completedAt,
        updatedAt: task.updatedAt,
        type: "subagent",
        subagentId: task.id,
        origin: task.origin,
        driver: task.driver,
        providerInstanceId: task.providerInstanceId,
        childThreadId: task.childThreadId,
        prompt: task.prompt,
        ...(task.progress === undefined ? {} : { progress: task.progress }),
        result: task.result,
      },
    });

    if (input.nativeOutcome !== undefined && subagent.confirmedOutcome !== undefined) {
      const outcome = subagentStopOutcomes.get(input.taskId);
      if (outcome !== undefined) yield* Deferred.succeed(outcome, subagent.confirmedOutcome);
    }

    const resultAlreadyShown =
      input.status === "completed" &&
      input.result !== undefined &&
      normalizeClaudeResultText(subagent.lastAssistantText ?? "") ===
        normalizeClaudeResultText(input.result);
    if (
      input.result !== undefined &&
      input.result.trim().length > 0 &&
      input.status !== "running" &&
      !resultAlreadyShown
    ) {
      const resultItemOrdinal = subagent.resultItemOrdinal ?? ++subagent.nextChildItemOrdinal;
      subagent.resultItemOrdinal = resultItemOrdinal;
      yield* emitSubagentConversationMessage({
        nativeItemId: subagent.resultNativeItemId,
        threadId: childThreadId,
        rootNodeId: childRootNodeId,
        role: "assistant",
        text: input.result,
        ordinal: resultItemOrdinal,
        now,
      });
    }
  });
