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
  ActiveClaudeSubagent,
  ActiveClaudeToolCall,
  ClaudeSubagentProjectionTarget,
} from "./ClaudeAdapterV2.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindProjectClaudeWorkflowMembers = (ctx: any) =>
  Effect.fnUntraced(function* (input: {
    readonly coordinator: ActiveClaudeSubagent;
    readonly workflow: OrchestrationV2SubagentWorkflow;
  }) {
    const {
      CLAUDE_PROVIDER,
      WORKFLOW_MEMBER_TRANSCRIPT_FLUSH_MS,
      adapterOptions,
      emitProviderEvent,
      emitSubagentConversationMessage,
      endToolCalls,
      idAllocator,
      isClaudeTranscriptTurnEnd,
      path,
      projectSubagentTranscriptLine,
      session,
      sessionSubagentsByTaskId,
      workflowMemberStates,
      workflowStopRequestedAt,
    } = pickScriptcBindCtx(ctx);

    const parentThread = input.coordinator.childThread;
    const taskId = input.coordinator.task.nativeTaskRef?.nativeId;
    if (parentThread === null || taskId === undefined || taskId === null) return;
    const now = yield* DateTime.now;
    const seen = yield* Ref.get(workflowMemberStates);
    const transcriptDir = input.workflow.runHandles?.transcriptDir;
    const membersWithMetadata = input.workflow.agents.slice();

    for (const [memberIndex, member] of input.workflow.agents.entries()) {
      if ((yield* Ref.get(sessionSubagentsByTaskId)).get(taskId) !== input.coordinator) return;
      const memberKey = `${input.coordinator.childThreadId}:agent:${member.index}`;
      const previous = seen.get(memberKey);
      const stopRequestedAt = workflowStopRequestedAt.get(taskId);
      const status =
        (member.state === "queued" || member.state === "running") &&
        input.coordinator.task.status !== "running"
          ? input.coordinator.task.status
          : member.state === "queued"
            ? "pending"
            : member.state === "failed" &&
                stopRequestedAt !== undefined &&
                // lastProgressAt (completedAt) is the last tick, often before Stop for a blocked tool.
                previous?.status !== "failed"
              ? "cancelled"
              : member.state;
      const settled = status !== "pending" && status !== "running";
      const prompt = member.prompt ?? member.label;
      const model = member.model ?? parentThread.modelSelection.model;
      const attempt = member.attempt ?? previous?.attempt ?? 1;
      const restarted = previous !== undefined && attempt > previous.attempt;
      const createdAt = previous?.createdAt ?? now;
      const startedAt =
        status === "pending"
          ? null
          : member.startedAt !== undefined
            ? DateTime.makeUnsafe(member.startedAt)
            : ((restarted ? null : previous?.startedAt) ?? (status === "running" ? now : null));
      const completedAt = settled
        ? member.completedAt !== undefined
          ? DateTime.makeUnsafe(member.completedAt)
          : ((restarted ? null : previous?.completedAt) ?? now)
        : null;
      const changed =
        restarted ||
        previous?.status !== status ||
        !Equal.equals(previous?.startedAt, startedAt) ||
        !Equal.equals(previous?.completedAt, completedAt) ||
        previous?.result !== member.result ||
        previous?.label !== member.label ||
        previous?.prompt !== prompt ||
        previous?.model !== model;
      const agentId = member.agentId;
      const readTranscript =
        settled &&
        transcriptDir !== undefined &&
        agentId !== undefined &&
        (input.coordinator.task.status === "running"
          ? (restarted ? 0 : (previous?.transcriptReadAttempts ?? 0)) < 3
          : restarted || previous?.finalTranscriptRead !== true);
      const readLiveTranscript =
        status === "running" && transcriptDir !== undefined && agentId !== undefined;
      if (!changed && !readTranscript && !readLiveTranscript) continue;

      const nodeId = idAllocator.derive.nodeFromProviderItem({
        driver: CLAUDE_PROVIDER,
        nativeItemId: memberKey,
      });
      const childRootNodeId = idAllocator.derive.nodeFromProviderItem({
        driver: CLAUDE_PROVIDER,
        nativeItemId: `${memberKey}:thread-root`,
      });
      const childThreadId = member.childThreadId;
      if (childThreadId === undefined) continue;

      if (previous === undefined || previous.label !== member.label || previous.model !== model) {
        yield* emitProviderEvent({
          type: "app_thread.created",
          driver: CLAUDE_PROVIDER,
          appThread: makeSubagentChildThread({
            parentThread,
            childThreadId,
            parentNodeId: nodeId,
            activeProviderThreadId: null,
            providerInstanceId: parentThread.providerInstanceId,
            modelSelection: { instanceId: parentThread.providerInstanceId, model },
            title: member.label,
            now: createdAt,
            createdBy: "agent",
            creationSource: "provider",
          }),
        });
      }
      if (previous === undefined || previous.prompt !== prompt) {
        yield* emitSubagentConversationMessage({
          nativeItemId: `${memberKey}:prompt`,
          threadId: childThreadId,
          rootNodeId: childRootNodeId,
          role: "user",
          text: prompt,
          ordinal: 100,
          now,
        });
      }

      const task = {
        id: nodeId,
        threadId: parentThread.id,
        runId: null,
        parentNodeId: input.coordinator.childRootNodeId,
        origin: "provider_native" as const,
        createdBy: "agent" as const,
        driver: CLAUDE_PROVIDER,
        providerInstanceId: parentThread.providerInstanceId,
        providerThreadId: null,
        childThreadId,
        nativeTaskRef: {
          driver: CLAUDE_PROVIDER,
          nativeId: memberKey,
          strength: "strong" as const,
        },
        prompt,
        title: member.label,
        model,
        status,
        result: member.result ?? null,
        startedAt,
        completedAt,
        updatedAt: now,
      } satisfies OrchestrationV2Subagent;

      const nodeBase = {
        runId: null,
        status,
        countsForRun: false,
        providerThreadId: null,
        providerTurnId: null,
        nativeItemRef: task.nativeTaskRef,
        runtimeRequestId: null,
        checkpointScopeId: null,
        startedAt,
        completedAt,
      };
      if (changed) {
        for (const node of [
          {
            ...nodeBase,
            id: nodeId,
            threadId: parentThread.id,
            parentNodeId: input.coordinator.childRootNodeId,
            rootNodeId: input.coordinator.childRootNodeId,
            kind: "subagent" as const,
          },
          {
            ...nodeBase,
            id: childRootNodeId,
            threadId: childThreadId,
            parentNodeId: null,
            rootNodeId: childRootNodeId,
            kind: "root_turn" as const,
          },
        ]) {
          yield* emitProviderEvent({ type: "node.updated", driver: CLAUDE_PROVIDER, node });
        }
        yield* emitProviderEvent({
          type: "subagent.updated",
          driver: CLAUDE_PROVIDER,
          subagent: task,
        });
      }

      const toolCalls = previous?.toolCalls ?? new Map<string, ActiveClaudeToolCall>();
      let nextItemOrdinal = previous?.nextItemOrdinal ?? 100;
      const target: ClaudeSubagentProjectionTarget = {
        childThreadId,
        childRootNodeId,
        nextOrdinal: () => ++nextItemOrdinal,
        toolCalls,
        stopRequestedAt,
      };
      const endOpenToolCalls = Effect.fnUntraced(function* () {
        if (toolCalls.size === 0) return;
        yield* endToolCalls({
          context: null,
          toolCalls: [...toolCalls.values()],
          status: "interrupted",
          completedAt: now,
        });
        toolCalls.clear();
      });
      if (restarted) yield* endOpenToolCalls();
      // Retries can rewrite transcripts past the cursor; rereading from zero repeats only already shown items.
      let transcriptCursor =
        previous === undefined || restarted || previous.agentId !== agentId
          ? initialWorkflowAgentTranscriptCursor
          : previous.transcriptCursor;
      let transcriptMetadata =
        previous === undefined || restarted || previous.agentId !== agentId
          ? {}
          : previous.transcriptMetadata;
      let textShown = !restarted && previous?.textShown === true;
      let resultShown = !restarted && previous?.resultShown === true;
      let turnEnded = !restarted && previous?.turnEnded === true;
      let transcriptRead = false;
      let lastReadAt = now;
      // Pre-tool text is not the reply; wait for turn end.
      const awaitingReply = () => settled && transcriptRead && !turnEnded && !resultShown;
      const flushWindowLeft = (at: DateTime.Utc) =>
        completedAt === null
          ? 0
          : WORKFLOW_MEMBER_TRANSCRIPT_FLUSH_MS -
            (DateTime.toEpochMillis(at) - DateTime.toEpochMillis(completedAt));
      // Drain capped reads; settled replies can lie beyond the cap.
      let transcriptDrained = true;
      if (
        (readTranscript || readLiveTranscript) &&
        transcriptDir !== undefined &&
        agentId !== undefined
      ) {
        const readNext = (cursor: WorkflowAgentTranscriptCursor) =>
          readWorkflowAgentTranscript({
            transcriptDir,
            agentId,
            cursor,
            ...(adapterOptions.environment.CLAUDE_CONFIG_DIR === undefined
              ? {}
              : {
                  configDir: path.resolve(
                    session.cwd,
                    adapterOptions.environment.CLAUDE_CONFIG_DIR,
                  ),
                }),
          }).pipe(Effect.option);
        const drain = Effect.fnUntraced(function* () {
          lastReadAt = yield* DateTime.now;
          transcriptDrained = false;
          while (!transcriptDrained) {
            const read = yield* readNext(transcriptCursor);
            if ((yield* Ref.get(sessionSubagentsByTaskId)).get(taskId) !== input.coordinator)
              return false;
            if (Option.isNone(read)) break;
            transcriptRead = true;
            const advanced = read.value.cursor.offset !== transcriptCursor.offset;
            transcriptCursor = read.value.cursor;
            transcriptMetadata = mergeWorkflowAgentMetadata(read.value.lines, transcriptMetadata);
            for (const line of read.value.lines) {
              if (yield* projectSubagentTranscriptLine(target, line)) textShown = true;
              turnEnded = isClaudeTranscriptTurnEnd(line);
            }
            // A line longer than the cap can't advance; stop rather than spin.
            transcriptDrained = !read.value.truncated || !advanced;
          }
          return true;
        });
        if (!(yield* drain())) return;
        // The coordinator sends no more frames; wait out the transcript flush before using the excerpt.
        const waitLeft = flushWindowLeft(lastReadAt);
        if (
          input.coordinator.task.status !== "running" &&
          awaitingReply() &&
          member.result !== undefined &&
          waitLeft > 0
        ) {
          yield* Effect.sleep(waitLeft);
          if (!(yield* drain())) return;
        }
      }
      if (
        transcriptRead &&
        (transcriptMetadata.effort !== member.effort || transcriptMetadata.speed !== member.speed)
      ) {
        membersWithMetadata[memberIndex] = {
          ...member,
          effort: transcriptMetadata.effort,
          speed: transcriptMetadata.speed,
        };
      }
      if (settled) {
        // Open calls receive no results after their member settles.
        yield* endOpenToolCalls();
        if (
          !textShown &&
          !resultShown &&
          member.result !== undefined &&
          (!transcriptRead || flushWindowLeft(lastReadAt) <= 0)
        ) {
          yield* emitSubagentConversationMessage({
            nativeItemId: `${memberKey}:result:${attempt}`,
            threadId: childThreadId,
            rootNodeId: childRootNodeId,
            role: "assistant",
            text: `Partial answer from workflow progress:\n\n${member.result}`,
            ordinal: target.nextOrdinal(),
            now,
          });
          resultShown = true;
        }
      }

      yield* Ref.update(workflowMemberStates, (current) =>
        new Map(current).set(memberKey, {
          status,
          attempt,
          agentId,
          result: member.result,
          label: member.label,
          prompt,
          model,
          transcriptReadAttempts:
            (restarted ? 0 : (previous?.transcriptReadAttempts ?? 0)) + (readTranscript ? 1 : 0),
          finalTranscriptRead:
            (!restarted && previous?.finalTranscriptRead === true) ||
            (readTranscript &&
              transcriptRead &&
              transcriptDrained &&
              textShown &&
              input.coordinator.task.status !== "running"),
          transcriptCursor,
          transcriptMetadata,
          nextItemOrdinal,
          toolCalls,
          textShown,
          turnEnded,
          resultShown,
          createdAt,
          startedAt,
          completedAt,
        }),
      );
    }
    if (membersWithMetadata.some((member, index) => member !== input.workflow.agents[index])) {
      if ((yield* Ref.get(sessionSubagentsByTaskId)).get(taskId) !== input.coordinator) return;
      input.coordinator.task = {
        ...input.coordinator.task,
        workflow: { ...input.workflow, agents: membersWithMetadata },
      };
      yield* emitProviderEvent({
        type: "subagent.updated",
        driver: CLAUDE_PROVIDER,
        subagent: input.coordinator.task,
      });
    }
  });
