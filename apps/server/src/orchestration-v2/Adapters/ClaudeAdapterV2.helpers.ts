// Split out of ClaudeAdapterV2.ts so scriptc tsc-ts can compile the native server (scriptc#4381).
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

export const CLAUDE_PROVIDER = ProviderDriverKind.make("claudeAgent");
/** The query exited before the turn attached, so the prompt was never offered. */
export const CLAUDE_QUERY_ENDED_BEFORE_TURN_DETAIL =
  "Claude provider query ended before the turn could start.";
export const CLAUDE_AGENT_SDK_QUERY_PROTOCOL = "claude-agent-sdk.query" as const;

export interface ClaudeCacheCreation {
  readonly ephemeral_1h_input_tokens: number;
  readonly ephemeral_5m_input_tokens: number;
}

export function claudePromptCacheTtlMs(
  cacheCreation: ClaudeCacheCreation | null | undefined,
): number | undefined {
  if (!cacheCreation) return undefined;
  if (cacheCreation.ephemeral_1h_input_tokens > 0) return 60 * 60_000;
  if (cacheCreation.ephemeral_5m_input_tokens > 0) return 5 * 60_000;
  return undefined;
}

// Claude caps the window at the model's context, so a setting at or above it never applies.
// Below that, Claude compacts 33,000 tokens short of the window: Claude Code 2.1.305's
// getContextUsage reports a 150,000 window as a 117,000 threshold, for every catalog model.
export const CLAUDE_AUTO_COMPACT_RESERVE_TOKENS = 33_000;

// Claude Code's isEnvTruthy.
export function isClaudeEnvTruthy(value: string | undefined): boolean {
  return value !== undefined && ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

export function claudeAutoCompactThreshold(autoCompactWindow: string, maxTokens: number | null) {
  const windowTokens = Number(autoCompactWindow);
  return windowTokens > 0 && (maxTokens === null || windowTokens < maxTokens)
    ? { autoCompactThreshold: windowTokens - CLAUDE_AUTO_COMPACT_RESERVE_TOKENS }
    : {};
}

export function optionalClaudeUsageTokenCount(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : undefined;
}

export function claudeMessageInputTokens(usage: {
  readonly input_tokens?: number | null | undefined;
  readonly cache_creation_input_tokens?: number | null | undefined;
  readonly cache_read_input_tokens?: number | null | undefined;
}): number {
  return (
    (optionalClaudeUsageTokenCount(usage.input_tokens) ?? 0) +
    (optionalClaudeUsageTokenCount(usage.cache_creation_input_tokens) ?? 0) +
    (optionalClaudeUsageTokenCount(usage.cache_read_input_tokens) ?? 0)
  );
}

export function claudeProviderTurnTokenUsage(
  usage: {
    readonly iterations?: SDKAssistantMessage["message"]["usage"]["iterations"] | undefined;
    readonly input_tokens?: number | null | undefined;
    readonly cache_creation_input_tokens?: number | null | undefined;
    readonly cache_read_input_tokens?: number | null | undefined;
    readonly cache_creation?: ClaudeCacheCreation | null | undefined;
    readonly output_tokens?: number | null | undefined;
  },
  maxTokens: number | null,
  updatedAt: string,
  autoCompactWindow = "",
  requestedAt?: DateTime.Utc,
) {
  // After an advisor call, the response totals can count the same context twice.
  const sample = usage.iterations?.findLast((iteration) => iteration.type === "message") ?? usage;
  const inputTokens = claudeMessageInputTokens(sample);
  const outputTokens = optionalClaudeUsageTokenCount(sample.output_tokens) ?? 0;
  const cachedInputTokens = optionalClaudeUsageTokenCount(sample.cache_read_input_tokens) ?? 0;
  const promptCacheTtlMs = claudePromptCacheTtlMs(usage.cache_creation);
  // The cache lifetime starts with the request, not when its response ends.
  const promptCacheExpiresAt =
    promptCacheTtlMs === undefined || requestedAt === undefined
      ? undefined
      : DateTime.formatIso(DateTime.add(requestedAt, { milliseconds: promptCacheTtlMs }));
  return {
    usedTokens: inputTokens + outputTokens,
    maxTokens,
    inputTokens,
    cachedInputTokens,
    outputTokens,
    reasoningOutputTokens: 0,
    ...(promptCacheTtlMs === undefined ? {} : { promptCacheTtlMs }),
    ...claudeAutoCompactThreshold(autoCompactWindow, maxTokens),
    ...(promptCacheExpiresAt === undefined ? {} : { promptCacheExpiresAt }),
    updatedAt,
  };
}

export type ClaudeMessageUsage = Parameters<typeof claudeProviderTurnTokenUsage>[0];

// message_delta usage is per-message cumulative; null or absent fields retain message_start values and zeros replace them.
export function mergeClaudeStreamUsage(
  current: ClaudeMessageUsage,
  delta: ClaudeMessageUsage,
): ClaudeMessageUsage {
  return {
    ...current,
    iterations: delta.iterations ?? current.iterations,
    input_tokens:
      optionalClaudeUsageTokenCount(delta.input_tokens) ??
      optionalClaudeUsageTokenCount(current.input_tokens) ??
      0,
    cache_creation_input_tokens:
      optionalClaudeUsageTokenCount(delta.cache_creation_input_tokens) ??
      optionalClaudeUsageTokenCount(current.cache_creation_input_tokens) ??
      null,
    cache_read_input_tokens:
      optionalClaudeUsageTokenCount(delta.cache_read_input_tokens) ??
      optionalClaudeUsageTokenCount(current.cache_read_input_tokens) ??
      null,
    output_tokens:
      optionalClaudeUsageTokenCount(delta.output_tokens) ??
      optionalClaudeUsageTokenCount(current.output_tokens) ??
      0,
  };
}
export const CLAUDE_DEFAULT_INSTANCE_ID = defaultInstanceIdForDriver(CLAUDE_PROVIDER);
export const CLAUDE_SCRIPT_EXTENSIONS = [".js", ".mjs", ".tsx", ".ts", ".jsx"];
// The SDK has no control-request deadline; the CLI waits up to 30 s per MCP server.
export const CLAUDE_MCP_REGISTRATION_TIMEOUT = "90 seconds";
export const CLAUDE_BOOT_TIMEOUT = "5 minutes";
// Claude can consume a subagent result before the launching turn ends, leaving
// its notification with no native wake turn to answer the continuation.
export const CLAUDE_WAKE_TURN_START_DEADLINE = "2 minutes";
// Claude Code flushes transcript writes every 100 ms, so a workflow member's
// reply can land after the progress frame that settles it. Its transcript
// stays the source of its answer this long after it settles.
export const WORKFLOW_MEMBER_TRANSCRIPT_FLUSH_MS = 500;
// A steer waits at most this long, from its request, for its foreground
// subagents to move to the background before it is sent.
export const BACKGROUND_MOVE_TIMEOUT_MS = 5_000;
// How long a Stop waits for the CLI to exit before the user is offered Force stop.
export const CLAUDE_STOP_CONFIRM_TIMEOUT_MS = 10_000;
// Matches the stderr tail the SDK keeps for a CLI it spawns itself.
export const CLAUDE_STDERR_TAIL_LENGTH = 2_048;
// The process group is killed on exit, so its stderr closes promptly.
export const CLAUDE_STDERR_DRAIN_TIMEOUT = Duration.seconds(1);
// How often a working CLI's process tree is recorded when no agent scope will stop what it leaves.
export const CLAUDE_DESCENDANT_POLL = "1 second";
export const CLAUDE_FORKED_SKILL_TRANSCRIPT_POLL = "1 second";
// Claude Code's refusal of bypassPermissions as root, which it explains only on stderr.
export const CLAUDE_ROOT_REFUSAL =
  "--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons";
// Claude Code's answer to a --resume whose session store is gone, as a result error and on stderr.
export const CLAUDE_CONVERSATION_NOT_FOUND = "No conversation found with session ID:";

// fd 4 gates the launch until the server has recorded the process it is about to become.
// The shell enters the cwd itself: as a native cwd, a mount that hangs chdir freezes the server.
export const CLAUDE_GROUP_WATCH_SCRIPT = [
  "read -r _ <&4 || exit 1",
  "exec 4<&-",
  "{ trap '' TERM; read -r _ <&3; kill -TERM 0; sleep 5; kill -KILL 0; } </dev/null >/dev/null 2>&1 &",
  'cd -P -- "$1" || exit 125',
  "shift",
  'exec "$@" 3<&-',
].join("\n");

/**
 * Kill the CLI's group on exit to stop MCP grandchildren; `onExit` stops its agent scope for
 * setsid daemons. The CLI keeps working after its pipes close, so a watcher stops the group on
 * EOF from a pipe only this server holds, including when the server crashes. `register` records
 * the CLI before it may run, so a restarted server can reap it if the watcher did not.
 */
export function spawnClaudeProcessGroup(
  options: ClaudeSpawnOptions,
  onExit?: () => void,
  onStderr: (text: string) => void = () => {},
  onStderrClose: () => void = () => {},
  register?: (pid: number) => () => void,
): ClaudeSpawnedProcess & Pick<NodeChildProcess.ChildProcess, "pid"> {
  // Relative to the server's cwd, as a native cwd is; the `./` keeps CDPATH out of it.
  const cwd = options.cwd ?? ".";
  const child = NodeChildProcess.spawn(
    "/bin/sh",
    [
      "-c",
      CLAUDE_GROUP_WATCH_SCRIPT,
      "t3-claude",
      cwd.startsWith("/") ? cwd : `./${cwd}`,
      options.command,
      ...options.args,
    ],
    {
      env: options.env,
      signal: options.signal,
      stdio: ["pipe", "pipe", "pipe", "pipe", "pipe"],
      detached: true,
    },
  );
  let forget: (() => void) | undefined;
  // Always drained, so a chatty CLI never blocks on a full stderr pipe.
  child.stderr?.setEncoding("utf8").on("data", onStderr).once("close", onStderrClose);
  child.once("exit", () => {
    try {
      signalProcessGroup(child.pid ?? 0, "SIGKILL");
    } catch {}
    try {
      forget?.();
    } catch {}
    onExit?.();
  });
  const gate = child.stdio[4];
  if (child.pid !== undefined && gate !== null && gate !== undefined && "end" in gate) {
    try {
      forget = register?.(child.pid);
      gate.on("error", () => child.kill("SIGKILL"));
      gate.end("ready\n");
    } catch (cause) {
      child.kill("SIGKILL");
      gate.destroy();
      throw cause;
    }
  }
  // Node's typings make stdin and stdout nullable once stdio has a fourth entry; both are pipes.
  return child as ClaudeSpawnedProcess & Pick<NodeChildProcess.ChildProcess, "pid">;
}

export interface ClaudeProcessRow {
  readonly pid: number;
  readonly ppid: number;
  readonly pgid: number;
  readonly startTimeSeconds: number;
  readonly startTimeMicros?: number;
}

export const isClaudeProcessRow = Schema.is(
  Schema.Struct({
    pid: Schema.Int,
    ppid: Schema.Int,
    pgid: Schema.Int,
    startTimeSeconds: Schema.Int,
  }),
);

/** Parses the C-locale, UTC output of `ps -A -o pid=,ppid=,pgid=,lstart=`. */
export function parseClaudeProcessTable(table: string): ReadonlyArray<ClaudeProcessRow> {
  return table.split("\n").flatMap((line) => {
    const [pid, ppid, pgid, ...started] = line.trim().split(/\s+/);
    const start = DateTime.make(started.join(" ") + " GMT");
    if (Option.isNone(start)) return [];
    const row = {
      pid: Number(pid),
      ppid: Number(ppid),
      pgid: Number(pgid),
      startTimeSeconds: DateTime.toEpochSeconds(start.value),
    };
    return isClaudeProcessRow(row) ? [row] : [];
  });
}

// A job leading its own group takes the processes it started since with it.
export function killClaudeDescendant(row: ClaudeProcessRow) {
  try {
    if (row.pgid === row.pid) signalProcessGroup(row.pid, "SIGKILL");
    else process.kill(row.pid, "SIGKILL");
  } catch {}
}

export function indexClaudeProcessTable(rows: ReadonlyArray<ClaudeProcessRow>) {
  return {
    byPid: new Map(rows.map((row) => [row.pid, row] as const)),
    children: Map.groupBy(rows, (row) => row.ppid),
  };
}

export type ClaudeProcessTable = ReturnType<typeof indexClaudeProcessTable>;

export function claudeDescendants(
  { children }: ClaudeProcessTable,
  rootPids: ReadonlyArray<number>,
): ReadonlyArray<ClaudeProcessRow> {
  const found: Array<ClaudeProcessRow> = [];
  const seen = new Set<number>(rootPids);
  const pending = [...rootPids];
  for (let parent = pending.pop(); parent !== undefined; parent = pending.pop()) {
    for (const child of children.get(parent) ?? []) {
      if (seen.has(child.pid)) continue;
      seen.add(child.pid);
      found.push(child);
      pending.push(child.pid);
    }
  }
  return found;
}

/** What one CLI started, validated by pid and start time on every successful read. */
export function makeClaudeDescendantTracker(cliPid: number) {
  const tracked = new Map<number, ClaudeProcessRow>();
  const record = (table: ClaudeProcessTable, cliRunning: boolean) => {
    // An empty table means the read failed. Keep the previous observations for a later read.
    if (table.byPid.size === 0) return;
    const roots = cliRunning ? [cliPid] : [];
    for (const [pid, row] of tracked) {
      const current = table.byPid.get(pid);
      if (
        current?.startTimeSeconds === row.startTimeSeconds &&
        (current.startTimeMicros === undefined ||
          row.startTimeMicros === undefined ||
          current.startTimeMicros === row.startTimeMicros)
      ) {
        roots.push(pid);
        // Preserve the finer identity across an intervening ps fallback.
        tracked.set(
          pid,
          current.startTimeMicros === undefined && row.startTimeMicros !== undefined
            ? { ...current, startTimeMicros: row.startTimeMicros }
            : current,
        );
      } else tracked.delete(pid);
    }
    for (const row of claudeDescendants(table, roots)) tracked.set(row.pid, row);
  };
  return { tracked: tracked as ReadonlyMap<number, ClaudeProcessRow>, record };
}

/**
 * Process table reads for every working CLI. A poll reads the table once for all of them, so the
 * `ps` cost does not grow with open sessions. Jobs start only while a CLI works, so an idle CLI is
 * left out of polls; its turn ends with one last read.
 */
export function makeClaudeDescendantPoll(
  readProcessTable: Effect.Effect<ReadonlyArray<ClaudeProcessRow>>,
) {
  const live = new Set<ReturnType<typeof makeClaudeDescendantTracker>>();
  // Polls, session closes and exits read one at a time, so each table is newer than all recorded,
  // and a pid and start time it no longer lists never run again.
  const reading = Semaphore.makeUnsafe(1);
  const indexedTable = readProcessTable.pipe(Effect.map(indexClaudeProcessTable));
  const read = <A>(apply: (table: ClaudeProcessTable) => A) =>
    reading.withPermits(1)(indexedTable.pipe(Effect.map(apply)));
  return {
    // A table read before a CLI started may list an older process under its pid, so a poll records
    // only into the CLIs working when its read began.
    poll: Effect.suspend(() =>
      live.size === 0
        ? Effect.void
        : reading
            .withPermits(1)(
              Effect.suspend(() => {
                const working = [...live];
                return indexedTable.pipe(
                  Effect.map((rows) => {
                    for (const tracker of working)
                      if (live.has(tracker)) tracker.record(rows, true);
                  }),
                );
              }),
            )
            .pipe(Effect.withSpan("ClaudeAgentSdkQueryRunner.trackDescendants")),
    ),
    track: (cliPid: number) => {
      const tracker = makeClaudeDescendantTracker(cliPid);
      let exited = false;
      const refresh = read((rows) => void tracker.record(rows, !exited));
      return {
        tracked: tracker.tracked,
        refresh,
        /** Polls this CLI from now until its turn settles. */
        work: () => {
          if (!exited) live.add(tracker);
        },
        settle: Effect.suspend(() => {
          live.delete(tracker);
          return exited ? Effect.void : refresh;
        }),
        /** Reads the table after the CLI exited: what it left that is still the same process. */
        leftovers: Effect.sync(() => {
          exited = true;
          live.delete(tracker);
        }).pipe(
          Effect.andThen(
            read((rows) => {
              tracker.record(rows, false);
              return rows.byPid.size === 0 ? [] : [...tracker.tracked.values()];
            }),
          ),
        ),
      };
    },
    hasLive: () => live.size > 0,
  };
}

export const ClaudeProviderCapabilitiesV2 = {
  sessions: {
    supportsMultipleProviderThreadsPerSession: false,
    supportsModelSwitchInSession: true,
    supportsProviderSwitchingViaHandoff: true,
    supportsRuntimeModeSwitchInSession: false,
    pendingRequestsSurviveRestart: false,
  },
  threads: {
    canCreateEmptyThread: true,
    canReadThreadSnapshot: false,
    canRollbackThread: true,
    canForkThread: true,
    canForkFromTurn: true,
    canForkWhileSourceRunning: true,
    canForkFromSubagentThread: false,
    exposesNativeThreadId: true,
  },
  turns: {
    exposesNativeTurnId: false,
    emitsTurnStarted: true,
    emitsTurnCompleted: true,
    supportsInterrupt: true,
    supportsNativeResume: true,
    supportsActiveSteering: true,
    activeSteeringInterruptsTools: false,
    supportsSteeringByInterruptRestart: false,
    supportsQueuedMessages: true,
    terminalStatusQuality: "strong",
  },
  streaming: {
    streamsAssistantText: true,
    streamsReasoning: true,
    streamsToolOutput: false,
    streamsPlanText: false,
    emitsMessageCompleted: true,
  },
  tools: {
    exposesToolItemIds: true,
    emitsToolStarted: true,
    emitsToolCompleted: true,
    emitsToolOutput: true,
    supportsMcpTools: true,
    supportsDynamicToolCallbacks: true,
    supportsBackgroundWait: true,
  },
  approvals: {
    supportsCommandApproval: true,
    supportsFileReadApproval: true,
    supportsFileChangeApproval: true,
    supportsApplyPatchApproval: false,
    approvalsHaveNativeRequestIds: true,
    approvalCallbacksAreLiveOnly: true,
    approvalsCanOriginateFromSubagents: false,
  },
  planning: {
    emitsPlanUpdated: true,
    emitsTodoList: true,
    emitsProposedPlan: true,
    supportsStructuredQuestions: true,
    planDeltasHaveItemIds: false,
  },
  subagents: {
    supportsSubagents: true,
    exposesSubagentThreadIds: false,
    emitsSubagentLifecycle: true,
    canWaitForSubagents: false,
    canCloseSubagents: false,
    canForkSubagentThread: false,
  },
  context: {
    acceptsSystemContext: true,
    acceptsDeveloperContext: true,
    acceptsSyntheticUserContext: true,
    canGenerateSummaries: true,
    canConsumeHandoffSummaries: true,
    supportsDeltaHandoff: true,
    supportsFullThreadHandoff: true,
    maxRecommendedHandoffChars: null,
  },
  checkpointing: {
    appCanCheckpointFilesystem: true,
    supportsNestedCheckpointScopes: true,
    providerCanRollbackConversation: true,
    providerRollbackReturnsSnapshot: true,
    providerCanReadConversationSnapshot: false,
  },
  identity: {
    nativeThreadIds: "strong",
    nativeTurnIds: "weak",
    nativeItemIds: "strong",
    nativeRequestIds: "strong",
  },
  runtimePolicy: {
    enforcement: "native",
  },
} satisfies OrchestrationV2ProviderCapabilities;

export const CLAUDE_CODE_PRESET_TOOLS = {
  type: "preset",
  preset: "claude_code",
} satisfies NonNullable<ClaudeQueryOptions["tools"]>;

export type ClaudeAgentSdkQueryToolList = ReadonlyArray<string>;
export interface ClaudeAgentSdkQueryPresetTools {
  readonly type: "preset";
  readonly preset: "claude_code";
}
export type ClaudeAgentSdkQueryTools = ClaudeAgentSdkQueryToolList | ClaudeAgentSdkQueryPresetTools;

export const CLAUDE_READ_ONLY_ALLOWED_TOOLS = ["Read", "Glob", "Grep"] as const;

export function claudeAgentSdkQueryToolsForSdk(
  tools: ClaudeAgentSdkQueryTools,
): NonNullable<ClaudeQueryOptions["tools"]> {
  if (isClaudeAgentSdkQueryToolList(tools)) {
    return [...tools];
  }
  return { type: tools.type, preset: tools.preset };
}

export function isClaudeAgentSdkQueryToolList(
  tools: ClaudeAgentSdkQueryTools,
): tools is ClaudeAgentSdkQueryToolList {
  return Array.isArray(tools);
}

export type ClaudeAgentSdkThreadIdentity =
  | {
      readonly sessionId: string;
      readonly resume?: never;
    }
  | {
      readonly sessionId?: never;
      readonly resume: string;
    };

export type ClaudeAgentSdkQueryOptions = Omit<
  ClaudeQueryOptions,
  "maxTurns" | "model" | "permissionMode" | "resume" | "sessionId" | "tools"
> & {
  readonly model: string;
  readonly tools: NonNullable<ClaudeQueryOptions["tools"]>;
  readonly permissionMode: NonNullable<ClaudeQueryOptions["permissionMode"]>;
} & ClaudeAgentSdkThreadIdentity;

export interface ClaudeAgentSdkQueryOpenInput {
  readonly resume?: true;
  readonly options: ClaudeAgentSdkQueryOptions;
  readonly threadId: ThreadId;
  readonly providerSessionId: OrchestrationV2ProviderSession["id"];
  /** Reports the step the CLI is on before the turn can start, such as `mcp`; `undefined` ends it. */
  readonly onStartupPhase?: (phase: string | undefined) => Effect.Effect<void>;
}

export interface ClaudeAgentSdkQuerySession {
  readonly messages: Stream.Stream<SDKMessage, ClaudeAgentSdkQueryRunnerError>;
  readonly offer: (
    message: SDKUserMessage,
    onQueued?: () => void,
  ) => Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  readonly setModel: (model: string) => Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  readonly applyFlagSettings: (
    settings: ClaudeFlagSettings,
  ) => Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  readonly setPermissionMode: (
    mode: PermissionMode,
  ) => Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  readonly renameSession: (title: string) => Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  readonly stopTask: (taskId: string) => Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  readonly backgroundTasks: (
    toolUseId: string,
  ) => Effect.Effect<boolean, ClaudeAgentSdkQueryRunnerError>;
  readonly mcpServerStatus: Effect.Effect<
    ReadonlyArray<ClaudeMcpServerStatus>,
    ClaudeAgentSdkQueryRunnerError
  >;
  readonly readMcpResource: (input: {
    readonly server: string;
    readonly uri: string;
  }) => Effect.Effect<
    { readonly contents: ReadonlyArray<unknown> },
    ClaudeAgentSdkQueryRunnerError
  >;
  /** Starts an MCP server's sign-in. The CLI never opens a browser; null means none is needed. */
  readonly mcpAuthenticate: (
    server: string,
  ) => Effect.Effect<string | null, ClaudeAgentSdkQueryRunnerError>;
  /** Finishes it with the address the browser was sent to; the CLI checks its state. */
  readonly mcpSubmitOAuthCallbackUrl: (input: {
    readonly server: string;
    readonly callbackUrl: string;
  }) => Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  readonly reconnectMcpServer: (
    server: string,
  ) => Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  /** Runs an MCP tool without a model turn and returns the server's raw `CallToolResult`. */
  readonly callMcpTool: (input: {
    readonly tool: string;
    readonly arguments: Record<string, unknown>;
  }) => Effect.Effect<unknown, ClaudeAgentSdkQueryRunnerError>;
  readonly listPermissionRules: Effect.Effect<
    ReadonlyArray<ClaudePermissionRule>,
    ClaudeAgentSdkQueryRunnerError
  >;
  readonly interrupt: Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
  readonly close: Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
}

export type ClaudeQueryStreamExit = Exit.Exit<void, ClaudeAgentSdkQueryRunnerError>;

export class ClaudeAgentSdkQueryRunnerError extends Schema.TaggedError<ClaudeAgentSdkQueryRunnerError>()(
  "ClaudeAgentSdkQueryRunnerError",
  {
    method: Schema.String,
    cause: Schema.Defect(),
  },
) {
  override get message(): string {
    return "Claude Agent SDK query failed.";
  }
}

export class ClaudeCodeRootRefusalError extends Schema.TaggedError<ClaudeCodeRootRefusalError>()(
  "ClaudeCodeRootRefusalError",
  {
    cause: Schema.Defect(),
  },
) {
  override get message(): string {
    return `Claude Code exited before it started: ${CLAUDE_ROOT_REFUSAL}`;
  }
}

export class ClaudeConversationNotFoundError extends Schema.TaggedError<ClaudeConversationNotFoundError>()(
  "ClaudeConversationNotFoundError",
  {
    cause: Schema.Defect(),
  },
) {
  override get message(): string {
    return "Claude Code could not find this conversation to resume. Send the message again to continue in a new Claude session with this thread's history.";
  }
}

export class ClaudeCodeStartupExitError extends Schema.TaggedError<ClaudeCodeStartupExitError>()(
  "ClaudeCodeStartupExitError",
  {
    status: Schema.String,
    guidance: Schema.String,
    cause: Schema.Defect(),
  },
) {
  override get message(): string {
    return `${this.status} before it started. ${this.guidance}`;
  }
}

export class ClaudeMcpRegistrationTimeoutError extends Schema.TaggedError<ClaudeMcpRegistrationTimeoutError>()(
  "ClaudeMcpRegistrationTimeoutError",
  { phase: Schema.Literals(["initialize", "setMcpServers"]) },
) {
  override get message(): string {
    return this.phase === "initialize"
      ? "Claude timed out while starting up. Retry the turn; if it keeps failing, check Claude and the server logs."
      : "Claude timed out while registering its MCP tools. Retry the turn; if it keeps failing, check Claude and the server logs.";
  }
}

export class ClaudeBackgroundWorkBlocksQueryReplacementError extends Schema.TaggedError<ClaudeBackgroundWorkBlocksQueryReplacementError>()(
  "ClaudeBackgroundWorkBlocksQueryReplacementError",
  {},
) {
  override get message(): string {
    return "Claude is still running background agents or commands, and this model or setting change would end them. Wait for them to finish, or press Stop, then send the message again.";
  }
}

export class ClaudeAppendSystemPromptFileError extends Schema.TaggedError<ClaudeAppendSystemPromptFileError>()(
  "ClaudeAppendSystemPromptFileError",
  {
    path: Schema.String,
    cause: Schema.optional(Schema.Defect()),
  },
) {
  override get message(): string {
    return `Claude could not read the --append-system-prompt-file launch argument at ${this.path}. Fix the path in the Claude launch arguments, then send the message again.`;
  }
}

export class ClaudeAppendSystemPromptMissingValueError extends Schema.TaggedError<ClaudeAppendSystemPromptMissingValueError>()(
  "ClaudeAppendSystemPromptMissingValueError",
  { flag: Schema.Literals(["--append-system-prompt", "--append-system-prompt-file"]) },
) {
  override get message(): string {
    return `The ${this.flag} launch argument has no ${this.flag === "--append-system-prompt" ? "text" : "file path"}. Add it after the flag in the Claude launch arguments, then send the message again.`;
  }
}

export class ClaudeSettingsLaunchArgError extends Schema.TaggedError<ClaudeSettingsLaunchArgError>()(
  "ClaudeSettingsLaunchArgError",
  {
    path: Schema.optional(Schema.String),
    cause: Schema.optional(Schema.Defect()),
  },
) {
  override get message(): string {
    return `Claude could not read the --settings launch argument${this.path === undefined ? "" : ` at ${this.path}`} as a JSON object. Fix it in the Claude launch arguments, then send the message again.`;
  }
}

export interface ClaudeAgentSdkQueryRunnerShape {
  readonly allocateSessionId: Effect.Effect<string, ClaudeAgentSdkQueryRunnerError>;
  readonly open: (
    input: ClaudeAgentSdkQueryOpenInput,
  ) => Effect.Effect<ClaudeAgentSdkQuerySession, ClaudeAgentSdkQueryRunnerError>;
  readonly forkSession: (
    input: ClaudeAgentSdkSessionForkInput,
  ) => Effect.Effect<
    ForkSessionResult & { readonly headMessageId?: string },
    ClaudeAgentSdkQueryRunnerError
  >;
  readonly subagentLaunchToolUseId: (
    input: ClaudeAgentSdkSubagentLookupInput,
  ) => Effect.Effect<string | null, ClaudeAgentSdkQueryRunnerError>;
  /** The model a subagent's transcript says it ran on. */
  readonly subagentModel: (
    input: ClaudeAgentSdkSubagentLookupInput,
  ) => Effect.Effect<string | null, ClaudeAgentSdkQueryRunnerError>;
  readonly assertComplete: Effect.Effect<void, ClaudeAgentSdkQueryRunnerError>;
}

export class ClaudeAgentSdkQueryRunner extends Context.Service<
  ClaudeAgentSdkQueryRunner,
  ClaudeAgentSdkQueryRunnerShape
>()("t3/orchestration-v2/Adapters/ClaudeAdapterV2/ClaudeAgentSdkQueryRunner") {}

export interface ClaudeAgentSdkSessionForkInput {
  readonly sessionId: string;
  readonly options: ForkSessionOptions;
  readonly environment: NodeJS.ProcessEnv;
  readonly threadId: ThreadId;
  readonly providerSessionId: OrchestrationV2ProviderSession["id"];
}

export interface ClaudeAgentSdkSubagentLookupInput {
  readonly sessionId: string;
  readonly agentId: string;
  readonly dir: string | null;
  readonly threadId: ThreadId;
  readonly providerSessionId: OrchestrationV2ProviderSession["id"];
}

export const isClaudeAgentSdkQueryRunnerError = Schema.is(ClaudeAgentSdkQueryRunnerError);

export const isClaudeConversationNotFound = (
  cause: Cause.Cause<ClaudeAgentSdkQueryRunnerError>,
) => {
  const error = Cause.squash(cause);
  return (
    isClaudeAgentSdkQueryRunnerError(error) &&
    Predicate.isTagged(error.cause, "ClaudeConversationNotFoundError")
  );
};
export const isClaudeMcpRegistrationTimeoutError = Schema.is(ClaudeMcpRegistrationTimeoutError);
export const isProviderAdapterRuntimeRequestResponseError = Schema.is(
  ProviderAdapter.ProviderAdapterRuntimeRequestResponseError,
);
export const isProviderAdapterRollbackThreadError = Schema.is(
  ProviderAdapter.ProviderAdapterRollbackThreadError,
);

export function queryRunnerError(cause: unknown, method: string): ClaudeAgentSdkQueryRunnerError {
  return isClaudeAgentSdkQueryRunnerError(cause)
    ? cause
    : new ClaudeAgentSdkQueryRunnerError({ cause, method });
}

export const CLAUDE_PROCESS_EXIT_ERROR_CLASSES: ReadonlySet<unknown> = new Set([
  "process_killed_by_signal",
  "process_exited_nonzero",
]);

// The SDK's exit Error appends Claude's stderr tail to `message`; `telemetryMessage` omits it.
export function claudeProcessExit(
  sdkError: unknown,
): { readonly status: string; readonly code: string } | undefined {
  if (typeof sdkError !== "object" || sdkError === null) return undefined;
  const { errorClass, telemetryMessage } = sdkError as Record<string, unknown>;
  return typeof errorClass === "string" &&
    CLAUDE_PROCESS_EXIT_ERROR_CLASSES.has(errorClass) &&
    typeof telemetryMessage === "string"
    ? { status: telemetryMessage, code: errorClass }
    : undefined;
}

export function claudeProcessExitFailure(
  cause: Cause.Cause<ClaudeAgentSdkQueryRunnerError>,
): { readonly message: string; readonly code: string } | undefined {
  const error = Cause.squash(cause);
  const exit = claudeProcessExit(isClaudeAgentSdkQueryRunnerError(error) ? error.cause : error);
  return exit === undefined ? undefined : { message: `${exit.status}.`, code: exit.code };
}

export function closeClaudeQuery(queryRuntime: ClaudeQuery) {
  return Effect.try({
    try: () => queryRuntime.close(),
    catch: (cause) => queryRunnerError(cause, "close"),
  });
}

// SDK 0.3.316 types `mcp_call` and `list_permission_rules` but has no Query method for them; its own readMcpResource sends control requests this way.
export async function sendClaudeControlRequest(
  queryRuntime: ClaudeQuery,
  request: {
    readonly subtype:
      | "mcp_call"
      | "list_permission_rules"
      | "rename_session"
      | "mcp_authenticate"
      | "mcp_oauth_callback_url";
    readonly [key: string]: unknown;
  },
): Promise<unknown> {
  const send: unknown = Reflect.get(queryRuntime, "request");
  if (typeof send !== "function") {
    throw new Error(`This Claude Agent SDK cannot send ${request.subtype}.`);
  }
  const reply: unknown = await Reflect.apply(send, queryRuntime, [request]);
  return Predicate.isObject(reply) ? reply.response : undefined;
}

export const decodeClaudeMcpAuthenticateReply = Schema.decodeUnknownEffect(
  Schema.Struct({
    authUrl: Schema.optional(Schema.String),
    requiresUserAction: Schema.optional(Schema.Boolean),
  }),
);

export const ClaudePermissionRules = Schema.Struct({
  state: Schema.Struct({
    rules: Schema.Array(
      Schema.Struct({
        behavior: Schema.Literals(["allow", "deny", "ask"]),
        rule: Schema.String,
        notInEffect: Schema.optional(Schema.Boolean),
      }),
    ),
    errors: Schema.optional(Schema.Array(Schema.Unknown)),
  }),
});
export type ClaudePermissionRule = (typeof ClaudePermissionRules.Type)["state"]["rules"][number];
export const decodeClaudePermissionRules = Schema.decodeUnknownEffect(ClaudePermissionRules);

// Without these, tools carry no `_meta.ui` and a model-shaped result would reach the app.
export const CLAUDE_MCP_APP_CAPABILITIES = [
  "mcp_tool_ui_meta_v1",
  "mcp_read_resource_v1",
  "mcp_call_result_not_for_model_v1",
] as const;
// Captured inline, unlike Codex's shared app-server: a slow read delays only this session's stream, and only this long.
export const CLAUDE_MCP_APP_CAPTURE_TIMEOUT = "20 seconds";

export function claudeSupportsMcpApps(capabilities: ReadonlySet<string>): boolean {
  return CLAUDE_MCP_APP_CAPABILITIES.every((capability) => capabilities.has(capability));
}

// Claude Code routes `mcp__a__b__tool` to server `a` even when `a__b` is connected, so either prefix is ambiguous.
export function claudeMcpServerPrefixOverlaps(
  statuses: ReadonlyArray<ClaudeMcpServerStatus>,
  server: string,
): boolean {
  const prefix = claudeMcpToolPrefix(server);
  return statuses.some((status) => {
    if (status.name === server) return false;
    const other = claudeMcpToolPrefix(status.name);
    return other.startsWith(prefix) || prefix.startsWith(other);
  });
}

export function findClaudeMcpTool(
  statuses: ReadonlyArray<ClaudeMcpServerStatus>,
  toolName: string,
):
  | { readonly server: string; readonly tool: NonNullable<ClaudeMcpServerStatus["tools"]>[number] }
  | undefined {
  const matches = statuses.flatMap((status) => {
    if (status.status !== "connected") return [];
    const prefix = claudeMcpToolPrefix(status.name);
    if (!toolName.startsWith(prefix)) return [];
    return (status.tools ?? [])
      .filter((tool) => `${prefix}${claudeMcpToolNamePart(tool.name)}` === toolName)
      .map((tool) => ({ server: status.name, tool }));
  });
  const [match, ...others] = matches;
  return match === undefined ||
    others.length > 0 ||
    claudeMcpServerPrefixOverlaps(statuses, match.server)
    ? undefined
    : match;
}

// Only this adapter writes app references. Claude's normalised tool names cannot tie one in raw MCP output to its server.
export function withoutForgedMcpApp(output: ClaudeNativeToolOutput): ClaudeNativeToolOutput {
  const value = claudeNativeToolOutputValue(output);
  return compactDynamicToolOutput(value)?.[MCP_APP_OUTPUT_KEY] === undefined
    ? output
    : { type: "structured_tool_use_result", value: { result: value } };
}

/**
 * Deliberately broader than Claude's matcher: Claude also matches rules against server aliases T3
 * can't list, and an alias may contain `__`, so any `mcp__` rule or wildcard may cover any MCP tool.
 * A false match only refuses a card's call, or asks first.
 */
export function claudeRulesMayCoverMcpTools(
  rules: ReadonlyArray<ClaudePermissionRule>,
  behaviors: ReadonlyArray<ClaudePermissionRule["behavior"]>,
): boolean {
  return rules.some((entry) => {
    const name = entry.rule.split("(", 1)[0] ?? entry.rule;
    return (
      behaviors.includes(entry.behavior) &&
      entry.notInEffect !== true &&
      (name.startsWith("mcp__") || name.includes("*"))
    );
  });
}

/**
 * Claude reports `annotations` as `readOnly`/`destructive`/`openWorld`; apps expect MCP's `*Hint` names.
 * Card calls skip Claude's permission check, so `readOnlyHint`, which skips T3's prompt, needs readable
 * rules (null when not) with no ask or deny rule that may cover the tool.
 */
export function claudeMcpToolForApps(
  tool: NonNullable<ClaudeMcpServerStatus["tools"]>[number],
  rules: ReadonlyArray<ClaudePermissionRule> | null,
) {
  const annotations = tool.annotations ?? {};
  const readOnlyHint =
    annotations.readOnly !== true ||
    (rules !== null && !claudeRulesMayCoverMcpTools(rules, ["ask", "deny"]))
      ? annotations.readOnly
      : undefined;
  return {
    name: tool.name,
    ...(tool.description === undefined ? {} : { description: tool.description }),
    // The CLI reports no input schemas; apps require one in `hostContext.toolInfo.tool`.
    inputSchema: { type: "object" },
    ...(tool._meta === undefined ? {} : { _meta: tool._meta }),
    annotations: {
      ...(readOnlyHint === undefined ? {} : { readOnlyHint }),
      ...(annotations.destructive === undefined
        ? {}
        : { destructiveHint: annotations.destructive }),
      ...(annotations.openWorld === undefined ? {} : { openWorldHint: annotations.openWorld }),
    },
  };
}

/** A model-turn MCP `tool_use_result` flattens text `content` to a string; app calls return MCP's raw `CallToolResult`. */
export function claudeMcpCallToolResult(
  value: unknown,
): ProviderAdapter.ProviderAdapterV2McpCallToolResult {
  const record = Predicate.isObject(value) && !Array.isArray(value) ? value : undefined;
  const content = record === undefined ? value : record.content;
  return {
    content:
      typeof content === "string"
        ? [{ type: "text", text: content }]
        : Array.isArray(content)
          ? content
          : [],
    ...(record?.structuredContent === undefined
      ? {}
      : { structuredContent: record.structuredContent }),
    ...(record?.isError === true ? { isError: true } : {}),
    ...(record?._meta === undefined ? {} : { _meta: record._meta }),
  };
}

// Iterate Query itself: the raw generator's return() queues behind a pending CLI read and deadlocks interruption.
export function claudeQueryMessages(queryRuntime: ClaudeQuery): AsyncIterable<SDKMessage, void> {
  return { [Symbol.asyncIterator]: () => queryRuntime };
}

export interface ClaudeAgentSdkLoggedQueryOptions {
  readonly model: ClaudeAgentSdkQueryOptions["model"];
  readonly tools: ClaudeAgentSdkQueryOptions["tools"];
  readonly permissionMode: ClaudeAgentSdkQueryOptions["permissionMode"];
  readonly sessionId?: string;
  readonly resume?: string;
  readonly resumeSessionAt?: ClaudeAgentSdkQueryOptions["resumeSessionAt"];
  readonly cwd?: ClaudeAgentSdkQueryOptions["cwd"];
  readonly allowedTools?: ClaudeAgentSdkQueryOptions["allowedTools"];
  readonly disallowedTools?: ClaudeAgentSdkQueryOptions["disallowedTools"];
  readonly settingKeys?: ReadonlyArray<string>;
  readonly effort?: ClaudeAgentSdkQueryOptions["effort"];
  readonly includePartialMessages?: true;
  readonly pathToClaudeCodeExecutable?: ClaudeAgentSdkQueryOptions["pathToClaudeCodeExecutable"];
  readonly hasExtraArgs?: true;
  readonly allowDangerouslySkipPermissions?: true;
  readonly hasCanUseTool?: true;
  readonly hasEnvironment?: true;
  readonly hasMcpServers?: true;
}

export type ClaudeAgentSdkProtocolLogEvent =
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.open";
        readonly options: ClaudeAgentSdkLoggedQueryOptions;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "prompt.offer";
        readonly message: SDKUserMessage;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.set_model";
        readonly model: string;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.apply_flag_settings";
        readonly settings: ClaudeFlagSettings;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.set_permission_mode";
        readonly mode: PermissionMode;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.rename_session";
        readonly title: string;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.stop_task";
        readonly taskId: string;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.background_tasks";
        readonly toolUseId: string;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.interrupt";
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "query.close";
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "session.fork";
        readonly sessionId: string;
        readonly options: ForkSessionOptions;
      };
    }
  | {
      readonly direction: "incoming";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "session.forked";
        readonly sessionId: string;
      };
    }
  | {
      readonly direction: "outgoing";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "subagent.lookup";
        readonly sessionId: string;
        readonly agentId: string;
      };
    }
  | {
      readonly direction: "incoming";
      readonly stage: "decoded";
      readonly payload: {
        readonly type: "subagent.found";
        readonly toolUseId: string | null;
      };
    }
  | {
      readonly direction: "incoming";
      readonly stage: "decoded";
      readonly payload: SDKMessage;
    };

export type ClaudeAgentSdkProtocolLogger = (
  event: ClaudeAgentSdkProtocolLogEvent,
) => Effect.Effect<void>;

export function loggedClaudeQueryOptions(
  options: ClaudeAgentSdkQueryOptions,
): ClaudeAgentSdkLoggedQueryOptions {
  return {
    model: options.model,
    tools: options.tools,
    permissionMode: options.permissionMode,
    ...(options.sessionId === undefined ? {} : { sessionId: options.sessionId }),
    ...(options.resume === undefined ? {} : { resume: options.resume }),
    ...(options.resumeSessionAt === undefined ? {} : { resumeSessionAt: options.resumeSessionAt }),
    ...(options.cwd === undefined ? {} : { cwd: options.cwd }),
    ...(options.allowedTools === undefined ? {} : { allowedTools: options.allowedTools }),
    ...(options.disallowedTools === undefined ? {} : { disallowedTools: options.disallowedTools }),
    // Settings can carry the user's --settings values, such as an env block with credentials.
    ...(typeof options.settings === "object" && options.settings !== null
      ? { settingKeys: Object.keys(options.settings) }
      : {}),
    ...(options.effort === undefined ? {} : { effort: options.effort }),
    ...(options.includePartialMessages === true ? { includePartialMessages: true } : {}),
    ...(options.pathToClaudeCodeExecutable === undefined
      ? {}
      : { pathToClaudeCodeExecutable: options.pathToClaudeCodeExecutable }),
    ...(options.extraArgs === undefined ? {} : { hasExtraArgs: true }),
    ...(options.allowDangerouslySkipPermissions === true
      ? { allowDangerouslySkipPermissions: true }
      : {}),
    ...(options.canUseTool === undefined ? {} : { hasCanUseTool: true }),
    ...(options.env === undefined ? {} : { hasEnvironment: true }),
    ...(options.mcpServers === undefined ? {} : { hasMcpServers: true }),
  };
}

export function makeClaudeAgentSdkProtocolLogger(input: {
  readonly nativeEventLogger: ProviderEventLoggers.EventNdjsonLogger | undefined;
  readonly threadId: ThreadId;
  readonly providerSessionId: OrchestrationV2ProviderSession["id"];
}): ClaudeAgentSdkProtocolLogger | undefined {
  const { nativeEventLogger } = input;
  if (nativeEventLogger === undefined) {
    return undefined;
  }

  return (event) => {
    if (!shouldPersistProviderEvent("native", event)) return Effect.void;
    return nativeEventLogger
      .write(
        {
          provider: CLAUDE_PROVIDER,
          protocol: CLAUDE_AGENT_SDK_QUERY_PROTOCOL,
          kind: "protocol",
          providerSessionId: input.providerSessionId,
          event: boundProviderEventForLogging(event),
        },
        input.threadId,
      )
      .pipe(Effect.ignore);
  };
}

export const encodeClaudeJson = Schema.encodeSync(Schema.fromJsonString(Schema.Unknown));
export const decodeClaudeHistoryFork = Schema.decodeUnknownEffect(
  Schema.fromJsonString(
    Schema.Struct({ sessionId: Schema.String, headMessageId: Schema.optionalKey(Schema.String) }),
  ),
);

export const decodeClaudeHistoryMessages = Schema.decodeUnknownEffect(
  Schema.fromJsonString(
    Schema.Array(
      Schema.Struct({
        type: Schema.String,
        uuid: Schema.String,
        message: Schema.Struct({ content: Schema.Unknown, model: Schema.optional(Schema.Unknown) }),
      }),
    ),
  ),
);

export interface ClaudeHistoryMessage {
  readonly type: string;
  readonly uuid: string;
  readonly message: { readonly content: unknown; readonly model?: unknown };
}

// The placeholder reply the CLI records for a failed request.
export function claudeHistoryEndsOnFailedRequest(
  messages: ReadonlyArray<ClaudeHistoryMessage>,
): boolean {
  const last = messages.at(-1);
  return last?.type === "assistant" && last.message.model === "<synthetic>";
}

// Claude's interactive reply-on-resume removes native abort rows before querying the saved history.
export function claudeMessagesBeforeTrailingAborts(
  messages: ReadonlyArray<ClaudeHistoryMessage>,
): number {
  let end = messages.length;
  let toolInterrupted = false;
  while (end > 0) {
    const message = messages[end - 1]!;
    const content = message.message.content;
    const blocks = typeof content === "string" ? [{ type: "text", text: content }] : content;
    if (message.type !== "user" || !Array.isArray(blocks) || blocks.length === 0) break;
    const stop = blocks.every(
      (block: unknown) =>
        Predicate.isObject(block) &&
        block.type === "text" &&
        (block.text === "[Request interrupted by user]" ||
          block.text === "[Request interrupted by user for tool use]"),
    );
    if (stop) {
      toolInterrupted ||= blocks.some(
        (block: unknown) =>
          Predicate.isObject(block) && block.text === "[Request interrupted by user for tool use]",
      );
      end--;
      continue;
    }
    if (
      toolInterrupted &&
      blocks.every(
        (block: unknown) =>
          Predicate.isObject(block) &&
          block.type === "tool_result" &&
          block.is_error === true &&
          typeof block.content === "string" &&
          block.content.startsWith("The user doesn't want to proceed with this tool use."),
      )
    ) {
      end--;
      continue;
    }
    break;
  }
  return end;
}

export function claudeResumeSessionAt(
  messages: ReadonlyArray<ClaudeHistoryMessage>,
): string | undefined {
  const end = claudeMessagesBeforeTrailingAborts(messages);
  return end === messages.length ? undefined : messages[end - 1]?.uuid;
}

// Transcript lines can exceed 100 KB; the tail only has to reach this process's last message.
export const CLAUDE_TRANSCRIPT_TAIL_BYTES = 2 * 1024 * 1024;
// A long terminal exchange pushes that message out of the tail; one wider read looks for it.
export const CLAUDE_TRANSCRIPT_WIDE_TAIL_BYTES = 32 * 1024 * 1024;

/** Whether a live process missed messages a terminal `claude --resume` appended to its session.
 * Anchors on the last message the process emitted; Claude flushes the file after streaming, so
 * an emitted message can be missing from it. Lines with no anchor before them prove nothing:
 * they can all predate the process, so the answer is undefined. */
export function claudeTranscriptHasUnseenMessages(
  lines: ReadonlyArray<string>,
  emittedUuids: ReadonlySet<string>,
): boolean | undefined {
  let anchored = false;
  let unseen: Array<ClaudeHistoryMessage> = [];
  for (const line of lines) {
    let entry: unknown;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    const uuid = field(entry, "uuid");
    if (typeof uuid !== "string" || !isClaudeTranscriptConversationLine(entry)) continue;
    if (emittedUuids.has(uuid)) {
      anchored = true;
      unseen = [];
      continue;
    }
    if (
      field(entry, "isSidechain") === true ||
      field(entry, "isMeta") === true ||
      field(entry, "isCompactSummary") === true
    ) {
      continue;
    }
    unseen.push({ type: entry.type, uuid, message: { content: entry.message.content } });
  }
  return anchored ? claudeMessagesBeforeTrailingAborts(unseen) > 0 : undefined;
}

export const claudeConfigDirOf = (
  path: Path.Path,
  environment: NodeJS.ProcessEnv,
  homeDirectory: string,
) => path.resolve(environment.CLAUDE_CONFIG_DIR ?? path.join(homeDirectory, ".claude"));

// The SDK reads CLAUDE_CONFIG_DIR from process.env. Isolate custom homes in a
// worker so concurrent providers keep the server's environment.
export const runClaudeWorker = Effect.fn("runClaudeWorker")(function* (input: {
  readonly method: "forkSession" | "getSessionMessages";
  readonly sessionId: string;
  readonly options?: ForkSessionOptions;
  readonly environment: NodeJS.ProcessEnv;
}) {
  const path = yield* Path.Path;
  const fromSource = import.meta.url.endsWith(".ts");
  // A single executable hosts the worker itself; it has no sibling script.
  const workerArguments = (yield* HostProcess.IsExecutable)
    ? ["__claude-history"]
    : [
        ...(fromSource ? ["--experimental-strip-types"] : []),
        yield* path.fromFileUrl(
          new URL(
            fromSource ? "../../claude-history-worker.ts" : "./claude-history-worker.mjs",
            import.meta.url,
          ),
        ),
      ];
  const executablePath = yield* HostProcess.ExecutablePath;
  const result = yield* spawnAndCollect(
    executablePath,
    ChildProcess.make(
      executablePath,
      [...workerArguments, input.method, input.sessionId, encodeClaudeJson(input.options ?? {})],
      {
        env: {
          ...input.environment,
          ELECTRON_RUN_AS_NODE: "1",
        },
      },
    ),
    // Complete session histories have no status-probe size limit; stderr stays bounded.
    input.method === "getSessionMessages"
      ? { maxStdoutBytes: Number.POSITIVE_INFINITY }
      : undefined,
  ).pipe(Effect.timeout("30 seconds"));
  if (result.code !== 0) {
    return yield* new ClaudeAgentSdkQueryRunnerError({
      method: input.method,
      cause: result.stderr.trim() || `Claude history worker exited with code ${result.code}.`,
    });
  }
  return result.stdout;
});

export const forkClaudeSessionInWorker = Effect.fn("forkClaudeSessionInWorker")(function* (
  input: ClaudeAgentSdkSessionForkInput,
) {
  return yield* runClaudeWorker({ ...input, method: "forkSession" }).pipe(
    Effect.flatMap(decodeClaudeHistoryFork),
  );
});

export const CLAUDE_CAN_USE_TOOL_SHADOWED_WARNING = "CLAUDE_SDK_CAN_USE_TOOL_SHADOWED";

// query() warns when canUseTool meets bypassPermissions or bare allowedTools. T3 installs
// canUseTool in every mode on purpose (AskUserQuestion, ask rules), so it is per-session noise.
export function withoutClaudeCanUseToolShadowedWarning<A>(run: () => A): A {
  const emitWarning = process.emitWarning;
  process.emitWarning = function (this: NodeJS.Process, ...args: Parameters<typeof emitWarning>) {
    const [, options] = args;
    if (typeof options === "object" && options.code === CLAUDE_CAN_USE_TOOL_SHADOWED_WARNING) {
      return;
    }
    return Reflect.apply(emitWarning, this, args);
  } as typeof emitWarning;
  try {
    return run();
  } finally {
    process.emitWarning = emitWarning;
  }
}

export const layerQueryRunner: Layer.Layer<
  ClaudeAgentSdkQueryRunner,
  never,
  | ChildProcessSpawner.ChildProcessSpawner
  | SecureRandom.SecureRandom
  | Path.Path
  | PortScanner.PortDiscovery
  | ProviderEventLoggers.ProviderEventLoggers
> = Layer.effect(
  ClaudeAgentSdkQueryRunner,
  Effect.gen(function* () {
    const random = yield* SecureRandom.SecureRandom;
    const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;
    const path = yield* Path.Path;
    const { native: nativeEventLogger } = yield* ProviderEventLoggers.ProviderEventLoggers;
    const agentScope = yield* AgentScope;
    const providerProcesses = yield* ProviderProcesses.ProviderProcesses;
    const platform = yield* HostProcess.Platform;
    const runFork = Effect.runForkWith(yield* Effect.context<never>());
    const hostEnvironment = yield* HostProcess.Environment;
    const portDiscovery = yield* PortScanner.PortDiscovery;
    const processRunner = yield* ProcessRunner.make();
    const psProcessTable = processRunner
      .run({
        command: "ps",
        args: ["-A", "-o", "pid=,ppid=,pgid=,lstart="],
        env: { LC_ALL: "C", TZ: "UTC0" },
        timeout: "5 seconds",
      })
      .pipe(
        Effect.map((result) => (result.code === 0 ? parseClaudeProcessTable(result.stdout) : [])),
        Effect.orElseSucceed(() => []),
      );
    const monitor = Option.getOrUndefined(yield* Effect.serviceOption(NativeTelemetryClient));
    const nativeTable = platform === "darwin" ? monitor?.processIdentities : undefined;
    // Both readers use epoch seconds so a sidecar restart preserves tracked orphans.
    const readProcessTable =
      nativeTable === undefined
        ? psProcessTable
        : nativeTable.pipe(
            Effect.flatMap((rows) => {
              const table: ClaudeProcessRow[] = [];
              for (const { pid, ppid, pgid, startTimeMicros } of rows) {
                if (pgid === undefined || startTimeMicros === undefined) return psProcessTable;
                table.push({
                  pid,
                  ppid,
                  pgid,
                  startTimeSeconds: Math.floor(startTimeMicros / 1_000_000),
                  startTimeMicros,
                });
              }
              return table.length === 0 ? psProcessTable : Effect.succeed(table);
            }),
            Effect.catch(() => psProcessTable),
          );
    // Without an agent scope, a job that left the CLI's group escapes the group kill and is
    // re-parented once the CLI exits. So the CLI's tree is recorded while it runs, and what is
    // still the same process (pid and start time) is stopped after it exits.
    const descendantPoll = makeClaudeDescendantPoll(readProcessTable);
    // One poll serves every CLI. The first tracked CLI starts it; it stops once none is left.
    let polling: Fiber.Fiber<unknown> | undefined;
    const startPolling = () => {
      polling ??= runFork(
        descendantPoll.poll.pipe(
          Effect.repeat({
            schedule: Schedule.spaced(CLAUDE_DESCENDANT_POLL),
            // Cleared in the same step that ends the poll, so the next tracked CLI starts a new one.
            while: () => {
              if (descendantPoll.hasLive()) return true;
              polling = undefined;
              return false;
            },
          }),
        ),
      );
    };
    const trackDescendants = (cliPid: number) => {
      const tracker = descendantPoll.track(cliPid);
      const work = () => {
        tracker.work();
        startPolling();
      };
      work();
      const stop = tracker.leftovers.pipe(
        Effect.map((rows) => {
          for (const row of rows) killClaudeDescendant(row);
        }),
      );
      return { refresh: tracker.refresh, work, settle: tracker.settle, stop };
    };

    // The open span below is the tracing boundary for both attempts.
    const openQuery = Effect.fnUntraced(function* (input: ClaudeAgentSdkQueryOpenInput) {
      const protocolLogger = makeClaudeAgentSdkProtocolLogger({
        nativeEventLogger,
        threadId: input.threadId,
        providerSessionId: input.providerSessionId,
      });
      const logProtocolEvent = (event: ClaudeAgentSdkProtocolLogEvent) =>
        protocolLogger === undefined ? Effect.void : protocolLogger(event);
      // A failed open shuts down its queue before retrying, so the old CLI cannot take the prompt.
      const promptQueue = yield* Queue.unbounded<SDKUserMessage>();
      const prompt = Stream.fromQueue(promptQueue).pipe(
        Stream.catchCause((cause) =>
          Cause.hasInterruptsOnly(cause) ? Stream.empty : Stream.failCause(cause),
        ),
        Stream.toAsyncIterable,
      );
      // Send MCP credentials over stdin to keep them out of SDK argv and inherited command environments.
      const { mcpServers, ...sdkOptions } = input.options;
      // Jobs the agent starts inherit the thread, so port discovery can attribute their servers.
      let resumeSessionAt = sdkOptions.resumeSessionAt;
      let endsOnFailedRequest = false;
      if (input.resume && sdkOptions.resume !== undefined) {
        const messages = yield* runClaudeWorker({
          method: "getSessionMessages",
          sessionId: sdkOptions.resume,
          options: sdkOptions.cwd === undefined ? {} : { dir: sdkOptions.cwd },
          environment: sdkOptions.env ?? hostEnvironment,
        }).pipe(
          Effect.flatMap(decodeClaudeHistoryMessages),
          Effect.mapError((cause) => queryRunnerError(cause, "getSessionMessages")),
          Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner),
          Effect.provideService(Path.Path, path),
        );
        const boundary =
          resumeSessionAt === undefined
            ? messages.length
            : messages.findIndex((message) => message.uuid === resumeSessionAt) + 1;
        const history = messages.slice(0, boundary);
        endsOnFailedRequest = claudeHistoryEndsOnFailedRequest(history);
        resumeSessionAt = claudeResumeSessionAt(history) ?? resumeSessionAt;
      }
      const queryOptions = {
        ...sdkOptions,
        ...(resumeSessionAt === undefined ? {} : { resumeSessionAt }),
        env: {
          ...(sdkOptions.env ?? hostEnvironment),
          // The CLI would re-run a failed request by itself, then run the resume prompt as a second turn.
          ...(input.resume && !endsOnFailedRequest
            ? {
                CLAUDE_CODE_RESUME_INTERRUPTED_TURN: "1",
                CLAUDE_CODE_RESUME_REASON: "user_resume",
              }
            : {}),
          [PortScanner.AGENT_THREAD_ENV]: input.threadId,
        },
      };
      // The SDK can prepend a scope wrapper to native binaries; script entries run through node.
      const binaryPath = queryOptions.pathToClaudeCodeExecutable;
      const launch =
        binaryPath === undefined || CLAUDE_SCRIPT_EXTENSIONS.some((ext) => binaryPath.endsWith(ext))
          ? undefined
          : yield* agentScope.wrap({
              command: binaryPath,
              args: [],
              name: "claude",
              threadId: input.threadId,
              env: queryOptions.env,
            });
      const options =
        launch === undefined || launch.args.length === 0
          ? queryOptions
          : {
              ...queryOptions,
              pathToClaudeCodeExecutable: launch.command,
              executableArgs: [...launch.args, ...(queryOptions.executableArgs ?? [])],
            };
      const unit = launch?.unit;
      const stopScope = unit === undefined ? undefined : () => void runFork(agentScope.stop(unit));
      // Only a CLI that fails before its first message explains itself on
      // stderr. The known root refusal becomes a curated failure; any other
      // stderr can hold private text, so it stays out of turn failures.
      let stderrTail = "";
      let stderrClosed: Promise<void> = Promise.resolve();
      let answered = false;
      let conversationMissing = false;
      const appendStderr = (text: string) => {
        if (answered) return;
        stderrTail = (stderrTail + text).slice(-CLAUDE_STDERR_TAIL_LENGTH);
      };
      let descendants: ReturnType<typeof trackDescendants> | undefined;
      const spawnProcess =
        options.spawnClaudeCodeProcess ??
        ((spawnOptions: ClaudeSpawnOptions) => {
          if (platform !== "win32") {
            // Node can report "exit" before it has read the stderr the CLI wrote.
            let stderrDone = () => {};
            stderrClosed = new Promise((resolve) => (stderrDone = resolve));
            const child = spawnClaudeProcessGroup(
              spawnOptions,
              stopScope,
              appendStderr,
              stderrDone,
              providerProcesses.register,
            );
            if (unit === undefined && child.pid !== undefined) {
              const tracker = trackDescendants(child.pid);
              child.once("exit", () => runFork(tracker.stop));
              descendants = tracker;
            }
            return child;
          }
          const child = SpawnWorker.spawnPiped(spawnOptions.command, spawnOptions.args, {
            cwd: spawnOptions.cwd,
            env: spawnOptions.env,
            signal: spawnOptions.signal,
            windowsHide: true,
          });
          child.stderr.setEncoding("utf8").on("data", (chunk: string) => options.stderr?.(chunk));
          return child;
        });
      let spawnedProcess: ClaudeSpawnedProcess | undefined;
      let processExited = false;
      let processExit: Promise<void> | undefined;
      const spawnClaudeCodeProcess = (spawnOptions: ClaudeSpawnOptions) => {
        const child = spawnProcess(spawnOptions);
        spawnedProcess = child;
        // A spawn that fails emits only "error".
        const releaseAgent = portDiscovery.trackAgent();
        child.once("exit", releaseAgent);
        child.on("error", releaseAgent);
        processExited = child.exitCode !== null || child.signalCode != null;
        processExit = new Promise<void>((resolve) => {
          if (processExited) resolve();
          else
            child.once("exit", () => {
              processExited = true;
              resolve();
            });
        });
        return child;
      };
      const queryRuntime = yield* Effect.uninterruptibleMask((restore) =>
        Effect.try({
          try: () =>
            withoutClaudeCanUseToolShadowedWarning(() =>
              query({
                prompt,
                options: { ...options, spawnClaudeCodeProcess },
              }),
            ),
          catch: (cause) => queryRunnerError(cause, "query"),
        }).pipe(
          Effect.tap((queryRuntime) =>
            restore(
              Effect.gen(function* () {
                if (mcpServers !== undefined) {
                  const timedOut = (phase: ClaudeMcpRegistrationTimeoutError["phase"]) => () =>
                    Effect.logWarning("orchestration-v2.claude-mcp-registration-timeout", {
                      threadId: input.threadId,
                      providerSessionId: input.providerSessionId,
                      phase,
                    }).pipe(
                      Effect.andThen(
                        Effect.fail(
                          queryRunnerError(new ClaudeMcpRegistrationTimeoutError({ phase }), phase),
                        ),
                      ),
                    );
                  // The SDK leaves query() boot unbounded, and it takes about a minute on a host
                  // with CPUs 12x oversubscribed, so it gets its own, longer deadline.
                  yield* Effect.promise(() =>
                    queryRuntime.initializationResult().catch(() => undefined),
                  ).pipe(
                    Effect.timeoutOrElse({
                      duration: CLAUDE_BOOT_TIMEOUT,
                      orElse: timedOut("initialize"),
                    }),
                  );
                  const onStartupPhase = input.onStartupPhase ?? (() => Effect.void);
                  yield* onStartupPhase("mcp");
                  // Errors and mcp_status can echo headers; log only server names.
                  const failed = yield* Effect.tryPromise({
                    try: () => queryRuntime.setMcpServers(mcpServers),
                    catch: (cause) => queryRunnerError(cause, "setMcpServers"),
                  }).pipe(
                    Effect.map((result) => Object.keys(result.errors)),
                    Effect.orElseSucceed(() => Object.keys(mcpServers)),
                    Effect.timeoutOrElse({
                      duration: CLAUDE_MCP_REGISTRATION_TIMEOUT,
                      orElse: timedOut("setMcpServers"),
                    }),
                    // A timed-out registration reopens the CLI, which boots before it registers again.
                    Effect.ensuring(Effect.suspend(() => onStartupPhase(undefined))),
                  );
                  if (failed.length > 0) {
                    yield* Effect.logWarning("orchestration-v2.claude-mcp-servers-unavailable", {
                      threadId: input.threadId,
                      servers: failed,
                    });
                  }
                }
                yield* logProtocolEvent({
                  direction: "outgoing",
                  stage: "decoded",
                  payload: {
                    type: "query.open",
                    options: loggedClaudeQueryOptions(input.options),
                  },
                });
              }),
            ).pipe(
              Effect.onError(() =>
                Queue.shutdown(promptQueue).pipe(
                  // SDK disposal can return before process exit; await the owned child's exit before retrying.
                  Effect.andThen(
                    Effect.tryPromise({
                      try: async () => {
                        if (spawnedProcess !== undefined && !processExited) {
                          spawnedProcess.kill("SIGKILL");
                        }
                        await processExit;
                      },
                      catch: (cause) => queryRunnerError(cause, "close"),
                    }).pipe(Effect.timeout("10 seconds")),
                  ),
                  Effect.ensuring(
                    Effect.tryPromise({
                      try: () => queryRuntime[Symbol.asyncDispose](),
                      catch: (cause) => queryRunnerError(cause, "close"),
                    }).pipe(Effect.orDie),
                  ),
                  Effect.orDie,
                ),
              ),
            ),
          ),
        ),
      );

      return {
        messages: Stream.fromAsyncIterable(
          claudeQueryMessages(queryRuntime),
          (cause) => cause,
        ).pipe(
          Stream.catch((cause) =>
            Stream.fromEffect(
              Effect.gen(function* () {
                if (!answered) {
                  yield* Effect.promise(() => stderrClosed).pipe(
                    Effect.timeoutOption(CLAUDE_STDERR_DRAIN_TIMEOUT),
                  );
                }
                const refusedRoot = !answered && stderrTail.includes(CLAUDE_ROOT_REFUSAL);
                const startupExit = answered ? undefined : claudeProcessExit(cause);
                if (startupExit !== undefined) {
                  // The turn failure omits this output, so the log is the only place it is kept.
                  yield* Effect.logWarning("orchestration-v2.claude-startup-exit", {
                    threadId: input.threadId,
                    status: startupExit.status,
                    stderr: stderrTail,
                  });
                }
                return yield* queryRunnerError(
                  refusedRoot
                    ? new ClaudeCodeRootRefusalError({ cause })
                    : conversationMissing ||
                        (!answered && stderrTail.includes(CLAUDE_CONVERSATION_NOT_FOUND))
                      ? new ClaudeConversationNotFoundError({ cause })
                      : startupExit !== undefined
                        ? new ClaudeCodeStartupExitError({
                            status: startupExit.status,
                            guidance: providerProcessExitGuidance(stderrTail),
                            cause,
                          })
                        : cause,
                  "fromAsyncIterable",
                );
              }),
            ),
          ),
          Stream.tap((message) =>
            Effect.sync(() => {
              answered = true;
              if (
                message.type === "result" &&
                message.subtype !== "success" &&
                message.errors.some((error) => error.startsWith(CLAUDE_CONVERSATION_NOT_FOUND))
              ) {
                conversationMissing = true;
              }
            }),
          ),
          // The result waits for the turn's last tree read, so a session closed on it keeps that job.
          Stream.tap((message) =>
            descendants === undefined
              ? Effect.void
              : message.type === "result"
                ? descendants.settle
                : message.type === "assistant"
                  ? Effect.sync(descendants.work)
                  : Effect.void,
          ),
          Stream.tap((message) =>
            logProtocolEvent({
              direction: "incoming",
              stage: "decoded",
              payload: message,
            }),
          ),
        ),
        offer: (message, onQueued) =>
          Effect.uninterruptibleMask((restore) =>
            restore(Queue.offer(promptQueue, message)).pipe(
              Effect.tap(() =>
                Effect.sync(() => {
                  descendants?.work();
                  onQueued?.();
                }),
              ),
            ),
          ).pipe(
            Effect.asVoid,
            Effect.tap(() =>
              logProtocolEvent({
                direction: "outgoing",
                stage: "decoded",
                payload: {
                  type: "prompt.offer",
                  message,
                },
              }),
            ),
          ),
        setModel: (model) =>
          Effect.tryPromise({
            try: () => queryRuntime.setModel(model),
            catch: (cause) => queryRunnerError(cause, "setModel"),
          }).pipe(
            Effect.tap(() =>
              logProtocolEvent({
                direction: "outgoing",
                stage: "decoded",
                payload: {
                  type: "query.set_model",
                  model,
                },
              }),
            ),
          ),
        applyFlagSettings: (settings) =>
          Effect.tryPromise({
            try: () => queryRuntime.applyFlagSettings(settings),
            catch: (cause) => queryRunnerError(cause, "applyFlagSettings"),
          }).pipe(
            Effect.tap(() =>
              logProtocolEvent({
                direction: "outgoing",
                stage: "decoded",
                payload: {
                  type: "query.apply_flag_settings",
                  settings,
                },
              }),
            ),
          ),
        setPermissionMode: (mode) =>
          Effect.tryPromise({
            try: () => queryRuntime.setPermissionMode(mode),
            catch: (cause) => queryRunnerError(cause, "setPermissionMode"),
          }).pipe(
            Effect.tap(() =>
              logProtocolEvent({
                direction: "outgoing",
                stage: "decoded",
                payload: {
                  type: "query.set_permission_mode",
                  mode,
                },
              }),
            ),
          ),
        renameSession: (title) =>
          Effect.tryPromise({
            try: () =>
              sendClaudeControlRequest(queryRuntime, {
                subtype: "rename_session",
                title,
                source: "host",
              }),
            catch: (cause) => queryRunnerError(cause, "renameSession"),
          }).pipe(
            Effect.asVoid,
            Effect.tap(() =>
              logProtocolEvent({
                direction: "outgoing",
                stage: "decoded",
                payload: {
                  type: "query.rename_session",
                  title,
                },
              }),
            ),
          ),
        stopTask: (taskId) =>
          Effect.tryPromise({
            try: () => queryRuntime.stopTask(taskId),
            catch: (cause) => queryRunnerError(cause, "stopTask"),
          }).pipe(
            Effect.tap(() =>
              logProtocolEvent({
                direction: "outgoing",
                stage: "decoded",
                payload: { type: "query.stop_task", taskId },
              }),
            ),
          ),
        backgroundTasks: (toolUseId) =>
          Effect.tryPromise({
            try: () => queryRuntime.backgroundTasks(toolUseId),
            catch: (cause) => queryRunnerError(cause, "backgroundTasks"),
          }).pipe(
            Effect.tap(() =>
              logProtocolEvent({
                direction: "outgoing",
                stage: "decoded",
                payload: { type: "query.background_tasks", toolUseId },
              }),
            ),
          ),
        mcpServerStatus: Effect.tryPromise({
          try: () => queryRuntime.mcpServerStatus(),
          catch: (cause) => queryRunnerError(cause, "mcpServerStatus"),
        }),
        readMcpResource: ({ server, uri }) =>
          Effect.tryPromise({
            try: () => queryRuntime.readMcpResource(server, uri),
            catch: (cause) => queryRunnerError(cause, "readMcpResource"),
          }),
        mcpAuthenticate: (server) =>
          Effect.tryPromise({
            try: () =>
              sendClaudeControlRequest(queryRuntime, {
                subtype: "mcp_authenticate",
                serverName: server,
              }),
            catch: (cause) => queryRunnerError(cause, "mcpAuthenticate"),
          }).pipe(
            Effect.flatMap(decodeClaudeMcpAuthenticateReply),
            Effect.map((reply) =>
              reply.requiresUserAction === true && reply.authUrl !== undefined
                ? reply.authUrl
                : null,
            ),
            Effect.mapError((cause) => queryRunnerError(cause, "mcpAuthenticate")),
          ),
        mcpSubmitOAuthCallbackUrl: ({ server, callbackUrl }) =>
          Effect.tryPromise({
            try: () =>
              sendClaudeControlRequest(queryRuntime, {
                subtype: "mcp_oauth_callback_url",
                serverName: server,
                callbackUrl,
              }),
            catch: (cause) => queryRunnerError(cause, "mcpSubmitOAuthCallbackUrl"),
          }).pipe(Effect.asVoid),
        reconnectMcpServer: (server) =>
          Effect.tryPromise({
            try: () => queryRuntime.reconnectMcpServer(server),
            catch: (cause) => queryRunnerError(cause, "reconnectMcpServer"),
          }),
        callMcpTool: (call) =>
          Effect.tryPromise({
            try: () =>
              sendClaudeControlRequest(queryRuntime, {
                subtype: "mcp_call",
                tool: call.tool,
                arguments: call.arguments,
                result_not_for_model: true,
              }),
            catch: (cause) => queryRunnerError(cause, "callMcpTool"),
          }),
        listPermissionRules: Effect.tryPromise({
          try: () => sendClaudeControlRequest(queryRuntime, { subtype: "list_permission_rules" }),
          catch: (cause) => queryRunnerError(cause, "listPermissionRules"),
        }).pipe(
          Effect.flatMap(decodeClaudePermissionRules),
          // A settings file Claude couldn't parse was skipped, so its rules are missing from the list.
          Effect.filterOrFail(
            ({ state }) => (state.errors ?? []).length === 0,
            ({ state }) => new Error(`Claude skipped ${state.errors?.length} settings file(s)`),
          ),
          Effect.map(({ state }) => state.rules),
          Effect.mapError((cause) => queryRunnerError(cause, "listPermissionRules")),
        ),
        interrupt: Effect.tryPromise({
          try: () => queryRuntime.interrupt(),
          catch: (cause) => queryRunnerError(cause, "interrupt"),
        }).pipe(
          Effect.tap(() =>
            logProtocolEvent({
              direction: "outgoing",
              stage: "decoded",
              payload: {
                type: "query.interrupt",
              },
            }),
          ),
        ),
        // A job started since the last poll is recorded before the CLI is told to exit.
        close: Effect.suspend(() =>
          processExited || descendants === undefined ? Effect.void : descendants.refresh,
        ).pipe(
          Effect.andThen(Queue.shutdown(promptQueue)),
          Effect.andThen(closeClaudeQuery(queryRuntime)),
          Effect.tap(() =>
            logProtocolEvent({
              direction: "outgoing",
              stage: "decoded",
              payload: {
                type: "query.close",
              },
            }),
          ),
        ),
      } satisfies ClaudeAgentSdkQuerySession;
    });

    return ClaudeAgentSdkQueryRunner.of({
      allocateSessionId: random.uuidV4(),
      open: Effect.fn("ClaudeAgentSdkQueryRunner.open")(function* (
        input: ClaudeAgentSdkQueryOpenInput,
      ) {
        // A fresh ID may already have a transcript, so a fresh session retries under a new ID;
        // the adapter adopts it from the init message, as it does after /clear.
        return yield* openQuery(input).pipe(
          Effect.catchIf(
            (error) => isClaudeMcpRegistrationTimeoutError(error.cause),
            Effect.fnUntraced(function* () {
              const { resume, ...options } = input.options;
              if (resume !== undefined) return yield* openQuery(input);
              const sessionId = yield* random.uuidV4();
              return yield* openQuery({ ...input, options: { ...options, sessionId } });
            }),
          ),
        );
      }),
      forkSession: Effect.fn("ClaudeAgentSdkQueryRunner.forkSession")(function* (
        input: ClaudeAgentSdkSessionForkInput,
      ) {
        const protocolLogger = makeClaudeAgentSdkProtocolLogger({
          nativeEventLogger,
          threadId: input.threadId,
          providerSessionId: input.providerSessionId,
        });
        const logProtocolEvent = (event: ClaudeAgentSdkProtocolLogEvent) =>
          protocolLogger === undefined ? Effect.void : protocolLogger(event);
        yield* logProtocolEvent({
          direction: "outgoing",
          stage: "decoded",
          payload: {
            type: "session.fork",
            sessionId: input.sessionId,
            options: input.options,
          },
        });
        const hostEnvironment = yield* HostProcess.Environment;
        const homeDirectory = yield* HostProcess.HomeDirectory;
        const usesHostConfig =
          claudeConfigDirOf(path, input.environment, homeDirectory) ===
          claudeConfigDirOf(path, hostEnvironment, homeDirectory);
        const fork: Effect.Effect<
          ForkSessionResult & { readonly headMessageId?: string },
          unknown
        > = usesHostConfig
          ? Effect.tryPromise({
              try: () => forkClaudeSession(input.sessionId, input.options),
              catch: (cause) => queryRunnerError(cause, "forkSession"),
            })
          : forkClaudeSessionInWorker(input).pipe(
              Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner),
              Effect.provideService(Path.Path, path),
            );
        const result = yield* fork.pipe(
          Effect.mapError((cause) => queryRunnerError(cause, "forkSession")),
        );
        yield* logProtocolEvent({
          direction: "incoming",
          stage: "decoded",
          payload: {
            type: "session.forked",
            sessionId: result.sessionId,
          },
        });
        // The SDK remaps copied UUIDs. Capture the inherited head before the
        // fork's first run appends messages.
        const headMessageId = usesHostConfig
          ? yield* Effect.tryPromise({
              try: () =>
                getSessionMessages(
                  result.sessionId,
                  input.options.dir === undefined ? {} : { dir: input.options.dir },
                ),
              catch: (cause) => queryRunnerError(cause, "getSessionMessages"),
            }).pipe(
              Effect.map((messages) => messages.at(-1)?.uuid),
              Effect.orElseSucceed(() => undefined),
            )
          : result.headMessageId;
        return headMessageId === undefined ? result : { ...result, headMessageId };
      }),
      subagentLaunchToolUseId: Effect.fn("ClaudeAgentSdkQueryRunner.subagentLaunchToolUseId")(
        function* (input: ClaudeAgentSdkSubagentLookupInput) {
          const protocolLogger = makeClaudeAgentSdkProtocolLogger({
            nativeEventLogger,
            threadId: input.threadId,
            providerSessionId: input.providerSessionId,
          });
          const logProtocolEvent = (event: ClaudeAgentSdkProtocolLogEvent) =>
            protocolLogger === undefined ? Effect.void : protocolLogger(event);
          yield* logProtocolEvent({
            direction: "outgoing",
            stage: "decoded",
            payload: {
              type: "subagent.lookup",
              sessionId: input.sessionId,
              agentId: input.agentId,
            },
          });
          const messages = yield* Effect.tryPromise({
            try: () =>
              getSubagentMessages(input.sessionId, input.agentId, {
                ...(input.dir === null ? {} : { dir: input.dir }),
                limit: 1,
              }),
            catch: (cause) => queryRunnerError(cause, "getSubagentMessages"),
          });
          const toolUseId = messages[0]?.parent_tool_use_id ?? null;
          yield* logProtocolEvent({
            direction: "incoming",
            stage: "decoded",
            payload: { type: "subagent.found", toolUseId },
          });
          return toolUseId;
        },
      ),
      subagentModel: Effect.fn("ClaudeAgentSdkQueryRunner.subagentModel")(function* (
        input: ClaudeAgentSdkSubagentLookupInput,
      ) {
        const messages = yield* Effect.tryPromise({
          try: () =>
            getSubagentMessages(
              input.sessionId,
              input.agentId,
              input.dir === null ? {} : { dir: input.dir },
            ),
          catch: (cause) => queryRunnerError(cause, "getSubagentMessages"),
        });
        return (
          messages
            .toReversed()
            .flatMap((message) =>
              message.type === "assistant" ? [text(field(message.message, "model"))] : [],
            )
            .find((model) => model !== undefined) ?? null
        );
      }),
      assertComplete: Effect.void,
    });
  }),
);

export type ClaudeFlagSettings = Parameters<ClaudeQuery["applyFlagSettings"]>[0];

/** Thinking requires a new process. Clearing effort also requires one to reload user settings instead of model defaults. */
export function canApplyClaudeSelectionLive(
  live: CompiledClaudeModelSelection,
  next: CompiledClaudeModelSelection,
): boolean {
  return (
    live.settings.alwaysThinkingEnabled === next.settings.alwaysThinkingEnabled &&
    (next.effort !== undefined || live.effort === undefined) &&
    live.pinnedAlias === next.pinnedAlias
  );
}

export function claudeLiveSelectionFlagSettings(
  selection: CompiledClaudeModelSelection,
): ClaudeFlagSettings {
  return {
    ...(selection.effort === undefined ? {} : { effortLevel: selection.effort as EffortLevel }),
    fastMode: selection.settings.fastMode ?? null,
    ultracode: selection.settings.ultracode ?? null,
  };
}

// A delegated child is its own SDK session, so Claude Code gives it the main-conversation cache
// TTL. When the user sets Claude's subagentPromptCacheTtl, the child follows it like a native
// subagent would. A resumed session's first request otherwise goes out before its MCP servers
// connect, and Claude Code tells the agent they disconnected. Explicit instance values still win.
export function claudeQueryEnvironment(
  environment: NodeJS.ProcessEnv,
  appThread: Pick<OrchestrationV2AppThread, "lineage">,
  subagentPromptCacheTtl: "5m" | "1h" | undefined,
  resume = false,
): NodeJS.ProcessEnv {
  const promptCacheTtl =
    appThread.lineage.relationshipToParent === "subagent" &&
    subagentPromptCacheTtl !== undefined &&
    environment.CLAUDE_CODE_PROMPT_CACHE_TTL === undefined
      ? subagentPromptCacheTtl
      : undefined;
  const blockingMcpConnect = resume && environment.MCP_CONNECTION_NONBLOCKING === undefined;
  if (promptCacheTtl === undefined && !blockingMcpConnect) {
    return environment;
  }
  return {
    ...environment,
    ...(promptCacheTtl === undefined ? {} : { CLAUDE_CODE_PROMPT_CACHE_TTL: promptCacheTtl }),
    ...(blockingMcpConnect ? { MCP_CONNECTION_NONBLOCKING: "0" } : {}),
  };
}

// Claude Code's auto tool search sends every MCP schema in full while they fit under a share of the
// context window, which T3's tools do on 1M models. auto:0 already means on and auto:100 off.
export function claudeToolSearchOverride(value: string | undefined): "true" | undefined {
  if (value === undefined) return undefined;
  if (value === "auto") return "true";
  if (!value.startsWith("auto:")) return undefined;
  const percent = parseClaudeInteger(value.slice("auto:".length));
  // Claude Code treats an unparsable auto:N as auto, and clamps N to 0..100.
  if (Number.isNaN(percent)) return "true";
  const clamped = Math.min(100, Math.max(0, percent));
  return clamped > 0 && clamped < 100 ? "true" : undefined;
}

// Claude Code 2.1.310's integer parsing for auto:N. Scientific notation counts only when it is an
// integer, grouped digits (1_000, 1,000, or 1 000) are joined, and anything else uses parseInt.
export const CLAUDE_SCIENTIFIC_INTEGER = /^[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+$/;
export const CLAUDE_GROUPED_INTEGER = /^[+-]?\d{1,3}([_,\u00A0\u202F ])\d{3}(?:\1\d{3})*$/;
export function parseClaudeInteger(text: string): number {
  const value = text.trim();
  if (value.length <= 32 && CLAUDE_SCIENTIFIC_INTEGER.test(value)) {
    const number = Number(value);
    return Number.isInteger(number) ? number : Number.NaN;
  }
  if (value.length <= 32 && CLAUDE_GROUPED_INTEGER.test(value)) {
    return Number.parseInt(value.replace(/[_,\u00A0\u202F ]/g, ""), 10);
  }
  return Number.parseInt(value, 10);
}

export const CLAUDE_SLEEP_DURATION = String.raw`(?:\d[\w.]*|\$\(\([\d\s+*/%-]+\)\)|\$\{\w+(?::?[-=]\d[\w.]*)?\}|\$\w+)`;
export const CLAUDE_SLEEP_TIMER_START = new RegExp(
  String.raw`^[ \t\n]*sleep[ \t]+(?:${CLAUDE_SLEEP_DURATION}|"${CLAUDE_SLEEP_DURATION}"|'\d[\w.]*')[ \t]*(?:$|;|&&|\n)`,
);
// Bash separates words only with spaces and tabs, so `\s` would read `true\rnpm` as `true`.
export const CLAUDE_SLEEP_TIMER_REPORT = /^[ \t]*(?:$|(?:date|echo|printf|true|:)(?:[ \t]|$))/;

// A background command that only sleeps for a finite time, then at most prints the time or a
// note, is a timer the agent set to check back, which Claude wakes it for when it ends. Any other
// step (`sleep 5 && npm run dev`) may never end, so that command is not a timer.
export function isClaudeSleepTimer(command: string | undefined): boolean {
  const start = command === undefined ? null : CLAUDE_SLEEP_TIMER_START.exec(command);
  if (command === undefined || start === null) return false;
  const steps = splitClaudeSleepTimerSteps(command.slice(start[0].length));
  return steps !== undefined && steps.every((step) => CLAUDE_SLEEP_TIMER_REPORT.test(step));
}

// Splits at unquoted `;`, `&&` and newlines. Gives up on anything a report never needs that could
// run or hide another command: pipes, `||`, a lone `&`, subshells, heredocs, substitutions, `${…}`,
// `$'…'`, comments, and unbalanced quotes or escapes.
export function splitClaudeSleepTimerSteps(tail: string): string[] | undefined {
  const steps: string[] = [];
  let step = "";
  let quote: string | undefined;
  for (let index = 0; index < tail.length; index++) {
    const char = tail[index] ?? "";
    const next = tail[index + 1] ?? "";
    if (quote === "'") {
      if (char === "'") quote = undefined;
      step += char;
      continue;
    }
    if (char === "\\") {
      if (next === "") return undefined;
      step += char + next;
      index++;
      continue;
    }
    if (char === "`" || (char === "$" && "({'\"".includes(next) && next !== "")) return undefined;
    if (quote === '"') {
      if (char === '"') quote = undefined;
      step += char;
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
    } else if (char === ";" || char === "\n" || (char === "&" && next === "&")) {
      steps.push(step);
      step = "";
      if (char === "&") index++;
      continue;
    } else if (char === "&" ? next !== ">" && tail[index - 1] !== ">" : "|()<#".includes(char)) {
      return undefined;
    }
    step += char;
  }
  if (quote !== undefined) return undefined;
  steps.push(step);
  return steps;
}

// Claude Code defers MCP tools behind ToolSearch, so the agent only finds
// t3_background_wait when the system prompt says when to reach for it.
export const CLAUDE_BACKGROUND_WAIT_INSTRUCTIONS = `

### Background work you wait on

To wait for a background command or Monitor you started (tests, a build), call \`t3_background_wait\` with its task ID before you end your turn. Do not mark work you leave running, or PRs. T3 MCP tools are deferred: load one with ToolSearch before you call it.
`;

// Claude 5.1+ returns text written before a tool call as a progress update, which the API
// returns only as a summary.
export const CLAUDE_SEND_TO_USER_INSTRUCTIONS = `
### Text the user must read mid-turn

Text you write before a tool call may reach the user only as a one-line summary. When the user must read something in full before your turn ends, such as a draft, a code block, or what a question you're about to ask refers to, send it with \`send_to_user\`. Put everything else in your final reply.
`;

// Native subagents start from their task, not this session's system prompt.
export const subagentDeviceInstructions: HookCallback = () =>
  Promise.resolve({
    hookSpecificOutput: {
      hookEventName: "SubagentStart",
      additionalContext: T3_CODE_DEVICE_TOOL_INSTRUCTIONS_WITH_TOOL_SEARCH,
    },
  });

export function makeClaudeQueryOptions(input: {
  readonly modelSelection: ModelSelection;
  readonly modelCatalog?: ClaudeModelCatalog;
  readonly nativeThreadId: string;
  readonly title?: string;
  readonly resume: boolean;
  readonly resumeSessionAt?: string;
  readonly cwd: string | null;
  /** The thread's other folders: listed in the system prompt and granted as directories. */
  readonly workspace?: ProviderAdapter.ProviderAdapterV2RuntimePolicy["workspace"];
  readonly attachmentsDir?: string;
  readonly settings?: ClaudeSettings;
  readonly promptSuggestions?: boolean;
  readonly sdkSettings?: string | ClaudeSdkSettings;
  readonly environment?: NodeJS.ProcessEnv;
  readonly mcpServers?: ClaudeQueryOptions["mcpServers"];
  readonly agentFeedback?: AgentFeedbackMode;
  /** The thread's T3 MCP session holds the `device` capability. */
  readonly deviceToolsAvailable?: boolean;
  readonly tools?: ClaudeAgentSdkQueryTools;
  readonly allowedTools?: ReadonlyArray<string>;
  readonly disallowedTools?: ReadonlyArray<string>;
  readonly permissionMode?: PermissionMode;
  readonly canUseTool?: CanUseTool;
  readonly onUserDialog?: ClaudeQueryOptions["onUserDialog"];
  readonly onElicitation?: ClaudeQueryOptions["onElicitation"];
  readonly onStop?: HookCallback;
  readonly supportedDialogKinds?: ClaudeQueryOptions["supportedDialogKinds"];
  readonly allowDangerouslySkipPermissions?: boolean;
  readonly appendSystemPromptFileText?: string;
  // Flag settings, because a user's settings.json env beats the process env in Claude Code.
  readonly toolSearchOverride?: "true";
}): ClaudeAgentSdkQueryOptions {
  const compiledSelection = compileClaudeModelSelection(input.modelSelection, input.modelCatalog);
  const {
    // claudeLaunchArgDirectories reads every --add-dir into additionalDirectories.
    "add-dir": _launchArgAddDir,
    // claudeLaunchArgPluginDirectories reads every --plugin-dir into plugins.
    "plugin-dir": launchArgPluginDir,
    "permission-mode": launchArgPermissionMode,
    "dangerously-skip-permissions": launchArgSkipPermissions,
    "append-system-prompt": launchArgAppendSystemPrompt,
    "append-system-prompt-file": _launchArgAppendSystemPromptFile,
    // The SDK replaces this flag with options.settings, so it arrives read as sdkSettings.
    settings: _launchArgSettings,
    ...extraArgs
  } = input.settings === undefined
    ? {}
    : parseCliArgs(input.settings.launchArgs, claudeLaunchArgParseOptions).flags;
  // Claude Code overwrites its CLI append text with the SDK's initialize
  // appendSystemPrompt, so launch-argument text has to travel in that value.
  // The CLI puts file text before inline text and trims one trailing newline.
  const launchAppendSystemPrompt = [
    input.appendSystemPromptFileText?.replace(/\r?\n$/, ""),
    launchArgAppendSystemPrompt,
  ].filter((text): text is string => typeof text === "string" && text.length > 0);
  const requestThinkingSummaries =
    compiledSelection.settings.alwaysThinkingEnabled !== false &&
    extraArgs["thinking-display"] !== "omitted";
  if (requestThinkingSummaries && extraArgs["thinking-display"] === undefined) {
    extraArgs["thinking-display"] = "summarized";
  }
  const pluginDirectories =
    input.settings === undefined ? [] : claudeLaunchArgPluginDirectories(input.settings.launchArgs);
  // A bare --plugin-dir still reaches Claude, which reports the missing path.
  if (launchArgPluginDir === null) extraArgs["plugin-dir"] = null;
  const threadIdentity: ClaudeAgentSdkThreadIdentity = input.resume
    ? { resume: input.nativeThreadId }
    : { sessionId: input.nativeThreadId };
  const selectedTools = input.tools ?? CLAUDE_CODE_PRESET_TOOLS;
  const selectionSettings =
    Object.keys(compiledSelection.settings).length === 0
      ? undefined
      : (compiledSelection.settings as ClaudeSdkSettings);
  const querySettings =
    selectionSettings === undefined
      ? input.sdkSettings
      : typeof input.sdkSettings === "object" && input.sdkSettings !== null
        ? ({ ...input.sdkSettings, ...selectionSettings } as ClaudeSdkSettings)
        : selectionSettings;
  const autoCompactWindow =
    input.settings?.autoCompactWindow === undefined || input.settings.autoCompactWindow.length === 0
      ? undefined
      : input.settings.autoCompactWindow;
  const compactQuerySettings =
    autoCompactWindow === undefined
      ? querySettings
      : ({
          ...(typeof querySettings === "object" && querySettings !== null ? querySettings : {}),
          autoCompactWindow: Number(autoCompactWindow),
        } as ClaudeSdkSettings);
  // Claude Code expands a bare alias to its own model, so a custom model with an alias's name
  // pins the alias to itself.
  const aliasOverrideEnv =
    compiledSelection.pinnedAlias === undefined
      ? undefined
      : {
          [`ANTHROPIC_DEFAULT_${compiledSelection.pinnedAlias.toUpperCase()}_MODEL`]:
            compiledSelection.pinnedAlias,
        };
  // A settings file path cannot take extra keys, so it goes through unchanged.
  const effectiveQuerySettings =
    (input.toolSearchOverride === undefined &&
      aliasOverrideEnv === undefined &&
      autoCompactWindow === undefined) ||
    typeof compactQuerySettings === "string"
      ? compactQuerySettings
      : ({
          ...compactQuerySettings,
          env: {
            ...compactQuerySettings?.env,
            ...aliasOverrideEnv,
            // Claude Code ranks this env var above the autoCompactWindow setting.
            ...(autoCompactWindow === undefined
              ? {}
              : { CLAUDE_CODE_AUTO_COMPACT_WINDOW: autoCompactWindow }),
            ...(input.toolSearchOverride === undefined
              ? {}
              : { ENABLE_TOOL_SEARCH: input.toolSearchOverride }),
          },
        } as ClaudeSdkSettings);
  const deviceInstructions = input.mcpServers !== undefined && input.deviceToolsAvailable === true;
  const agentFeedback = input.mcpServers === undefined ? "off" : (input.agentFeedback ?? "off");
  const options: ClaudeAgentSdkQueryOptions = {
    model: compiledSelection.apiModelId,
    // T3 names threads; a supplied title skips Claude's redundant naming request.
    ...(input.title === undefined ? {} : { title: input.title }),
    tools: claudeAgentSdkQueryToolsForSdk(selectedTools),
    permissionMode:
      (launchArgPermissionMode as PermissionMode | null | undefined) ??
      (launchArgSkipPermissions === null || launchArgSkipPermissions === "true"
        ? "bypassPermissions"
        : (input.permissionMode ?? "default")),
    includePartialMessages: true,
    promptSuggestions: input.promptSuggestions === true,
    ...(compiledSelection.effort === undefined
      ? {}
      : {
          effort: compiledSelection.effort as NonNullable<ClaudeQueryOptions["effort"]>,
        }),
    ...threadIdentity,
    ...(input.resumeSessionAt === undefined ? {} : { resumeSessionAt: input.resumeSessionAt }),
    ...(input.allowedTools === undefined ? {} : { allowedTools: [...input.allowedTools] }),
    ...(input.disallowedTools === undefined ? {} : { disallowedTools: [...input.disallowedTools] }),
    ...(input.canUseTool === undefined ? {} : { canUseTool: input.canUseTool }),
    ...(input.allowDangerouslySkipPermissions === true
      ? { allowDangerouslySkipPermissions: true }
      : {}),
    ...(requestThinkingSummaries
      ? {
          thinking: { type: "adaptive" as const, display: "summarized" as const },
          settings:
            typeof effectiveQuerySettings === "string"
              ? effectiveQuerySettings
              : {
                  ...effectiveQuerySettings,
                  showThinkingSummaries: true,
                },
        }
      : effectiveQuerySettings === undefined
        ? {}
        : { settings: effectiveQuerySettings }),
    ...(input.onUserDialog === undefined ? {} : { onUserDialog: input.onUserDialog }),
    ...(input.onElicitation === undefined ? {} : { onElicitation: input.onElicitation }),
    ...(input.supportedDialogKinds === undefined
      ? {}
      : { supportedDialogKinds: input.supportedDialogKinds }),
    ...(input.settings?.binaryPath
      ? { pathToClaudeCodeExecutable: input.settings.binaryPath }
      : {}),
    ...(input.environment === undefined ? {} : { env: input.environment }),
    ...(input.mcpServers === undefined ? {} : { mcpServers: input.mcpServers }),
    systemPrompt: {
      type: "preset" as const,
      preset: "claude_code" as const,
      append: [
        buildRuntimeInstructions({
          harness: "Claude Code",
          agentFeedback,
          runtimePolicy: { cwd: input.cwd, workspace: input.workspace },
        }) +
          (input.mcpServers === undefined
            ? ""
            : T3_CODE_ORCHESTRATION_INSTRUCTIONS +
              CLAUDE_BACKGROUND_WAIT_INSTRUCTIONS +
              CLAUDE_SEND_TO_USER_INSTRUCTIONS +
              (deviceInstructions
                ? `\n${T3_CODE_DEVICE_TOOL_INSTRUCTIONS_WITH_TOOL_SEARCH}\n`
                : "")),
        ...launchAppendSystemPrompt,
      ].join("\n\n"),
    },
    ...(deviceInstructions || input.onStop !== undefined
      ? {
          hooks: {
            ...(deviceInstructions
              ? { SubagentStart: [{ hooks: [subagentDeviceInstructions] }] }
              : {}),
            ...(input.onStop === undefined ? {} : { Stop: [{ hooks: [input.onStop] }] }),
          },
        }
      : {}),
    ...(pluginDirectories.length === 0
      ? {}
      : { plugins: pluginDirectories.map((path) => ({ type: "local" as const, path })) }),
    ...(Object.keys(extraArgs).length === 0 ? {} : { extraArgs }),
  };
  const additionalDirectories = [
    ...(input.cwd === null ? [] : [input.cwd]),
    ...(input.workspace?.extraRoots ?? []),
    ...(input.attachmentsDir === undefined ? [] : [input.attachmentsDir]),
    ...claudeLaunchArgDirectories(input.settings?.launchArgs),
  ];
  const withDirectories =
    additionalDirectories.length === 0 ? options : { ...options, additionalDirectories };
  return input.cwd === null ? withDirectories : { ...withDirectories, cwd: input.cwd };
}

/**
 * Checks the append launch arguments the way the Claude CLI would and reads the
 * file (leading ~ expanded) relative to the thread's cwd. makeClaudeQueryOptions
 * folds these flags out of extraArgs, so a value the CLI would have rejected has
 * to be rejected here or it silently disappears.
 */
export const readClaudeAppendSystemPromptFile = Effect.fnUntraced(function* (input: {
  readonly settings: ClaudeSettings | undefined;
  readonly cwd: string | null;
  readonly fileSystem: FileSystem.FileSystem;
  readonly path: Path.Path;
}) {
  if (input.settings === undefined) return undefined;
  const flags = parseCliArgs(input.settings.launchArgs, claudeLaunchArgParseOptions).flags;
  // parseCliArgs gives null for a flag with no following value. An explicit
  // `--append-system-prompt ""` is a value the CLI accepts, so it stays.
  if (flags["append-system-prompt"] === null) {
    return yield* new ClaudeAppendSystemPromptMissingValueError({
      flag: "--append-system-prompt",
    });
  }
  const file = flags["append-system-prompt-file"];
  if (file === undefined) return undefined;
  // `--append-system-prompt-file=` is "" and names no file either.
  if (file === null || file === "") {
    return yield* new ClaudeAppendSystemPromptMissingValueError({
      flag: "--append-system-prompt-file",
    });
  }
  const filePath = input.path.resolve(
    input.cwd ?? ".",
    expandHomePath(file, yield* HostProcess.HomeDirectory),
  );
  return yield* input.fileSystem
    .readFileString(filePath)
    .pipe(
      Effect.mapError((cause) => new ClaudeAppendSystemPromptFileError({ path: filePath, cause })),
    );
});

export const decodeClaudeLaunchArgSettings = Schema.decodeUnknownEffect(
  fromLenientJson(Schema.Record(Schema.String, Schema.Unknown)),
);

/**
 * Reads the --settings launch argument: a value starting with a brace is inline
 * JSON, anything else is a file path that expands a leading ~ and is otherwise
 * relative to the thread's cwd (the project or its worktree).
 * makeClaudeQueryOptions merges the result beneath T3's own settings.
 */
export const readClaudeLaunchArgSettings = Effect.fn("ClaudeAdapterV2.readLaunchArgSettings")(
  function* (input: {
    readonly settings: ClaudeSettings | undefined;
    readonly cwd: string | null;
    readonly fileSystem: FileSystem.FileSystem;
    readonly path: Path.Path;
  }) {
    if (input.settings === undefined) return undefined;
    const value = parseCliArgs(input.settings.launchArgs, claudeLaunchArgParseOptions).flags
      .settings;
    if (value === undefined) return undefined;
    const trimmed = value?.trim() ?? "";
    if (trimmed.length === 0) return yield* new ClaudeSettingsLaunchArgError({});
    // The CLI also wants a closing brace, but then malformed JSON, secrets included, would
    // become the file path in the error message.
    if (trimmed.startsWith("{")) {
      return (yield* decodeClaudeLaunchArgSettings(trimmed).pipe(
        Effect.mapError((cause) => new ClaudeSettingsLaunchArgError({ cause })),
      )) as ClaudeSdkSettings;
    }
    const filePath = input.path.resolve(
      input.cwd ?? ".",
      expandHomePath(trimmed, yield* HostProcess.HomeDirectory),
    );
    return (yield* input.fileSystem.readFileString(filePath).pipe(
      Effect.flatMap(decodeClaudeLaunchArgSettings),
      Effect.mapError((cause) => new ClaudeSettingsLaunchArgError({ path: filePath, cause })),
    )) as ClaudeSdkSettings;
  },
);

export const CLAUDE_T3_MCP_TOOL_WILDCARD = "mcp__t3-code__*";

// Keep in sync with OrchestratorToolkit Tool.Readonly annotations; ClaudeAdapterV2.test.ts checks this.
export const CLAUDE_READ_ONLY_T3_MCP_ALLOWED_TOOLS: ReadonlyArray<string> = [
  "mcp__t3-code__orchestrator_capabilities",
  "mcp__t3-code__list_scheduled_tasks",
  "mcp__t3-code__t3_background_wait",
  "mcp__t3-code__t3_thread_list",
  "mcp__t3-code__t3_thread_wait",
  "mcp__t3-code__t3_worktree_status",
  "mcp__t3-code__t3_worktree_list",
  "mcp__t3-code__t3_project_list",
  "mcp__t3-code__t3_project_read",
  "mcp__t3-code__t3_thread_search",
  "mcp__t3-code__t3_preview_list",
  "mcp__t3-code__t3_environment_read",
  "mcp__t3-code__t3_environment_links",
  "mcp__t3-code__t3_theme_read",
  "mcp__t3-code__html_preview",
  "mcp__t3-code__html_render",
  "mcp__t3-code__send_to_user",
  "mcp__t3-code__t3_submit_output",
];

// The name this adapter registers T3's MCP server under, and so the one Claude gives for it.
export const CLAUDE_T3_MCP_SERVER = "t3-code";

// request_secret can wait an hour; exceed Claude's default 60 s timeout.
export const CLAUDE_T3_MCP_TOOL_TIMEOUT_MS = 65 * 60 * 1_000;

// allowedTools pre-approves calls; tools controls availability. Pre-approve T3 tools for headless modes,
// limited to annotated read-only tools in read-only sandboxes.

export function claudeMcpQueryOverrides(input: {
  readonly mcpSession: McpProviderSession.McpProviderSessionConfig | undefined;
  readonly readOnlySandbox: boolean;
  readonly allowedTools?: ReadonlyArray<string>;
}): {
  readonly allowedTools?: ReadonlyArray<string>;
  readonly mcpServers?: ClaudeQueryOptions["mcpServers"];
} {
  const session = input.mcpSession;
  if (session === undefined) {
    return input.allowedTools === undefined ? {} : { allowedTools: input.allowedTools };
  }
  const mcpAllowedTools = input.readOnlySandbox
    ? CLAUDE_READ_ONLY_T3_MCP_ALLOWED_TOOLS
    : [CLAUDE_T3_MCP_TOOL_WILDCARD];
  return {
    allowedTools: Array.from(new Set([...(input.allowedTools ?? []), ...mcpAllowedTools])),
    mcpServers: {
      [CLAUDE_T3_MCP_SERVER]: {
        type: "http",
        url: session.endpoint,
        headers: {
          Authorization: session.authorizationHeader,
        },
        timeout: CLAUDE_T3_MCP_TOOL_TIMEOUT_MS,
      },
    },
  };
}

export function providerSession(input: {
  readonly providerSessionId: OrchestrationV2ProviderSession["id"];
  readonly providerInstanceId: ProviderInstanceId;
  readonly cwd: string | null;
  readonly model: string;
  readonly now: DateTime.Utc;
}): OrchestrationV2ProviderSession {
  return {
    id: input.providerSessionId,
    driver: CLAUDE_PROVIDER,
    providerInstanceId: input.providerInstanceId,
    status: "ready",
    cwd: input.cwd ?? process.cwd(),
    model: input.model,
    capabilities: ClaudeProviderCapabilitiesV2,
    createdAt: input.now,
    updatedAt: input.now,
    lastError: null,
  };
}

export function textFromClaudeContent(content: SDKAssistantMessage["message"]["content"]): string {
  return content.flatMap((part) => (part.type === "text" ? [part.text] : [])).join("");
}

// Claude 5.1+ emits pre-tool text as thinking; treat a second thinking block as text (the first may be empty in default display).
export function claudeWritesUpdatesAsThinking(model: string): boolean {
  const match = /claude-[a-z]+-(\d+)(?:-(\d{1,2}))?(?!\d)/u.exec(model);
  if (match === null) return false;
  const major = Number(match[1]);
  return major > 5 || (major === 5 && Number(match[2] ?? 0) >= 1);
}

// In SDK mode, /goal appears only in transcripts: command output names it and Stop hooks report unmet checks.
export const CLAUDE_GOAL_SET_PREFIX = "Goal set: ";
export const CLAUDE_GOAL_ACTIVE =
  /^Goal active: ([\s\S]+?) \((?:not yet evaluated|(\d+) turns?)\)/u;

export function nextClaudeGoal(
  current: OrchestrationV2ProviderGoal | null,
  message: SDKMessage,
): OrchestrationV2ProviderGoal | null | undefined {
  // The CLI drops a goal on a context-limit, auth, or billing failure and reports it only here.
  if (
    message.type === "system" &&
    message.subtype === "informational" &&
    message.content.startsWith("Goal cleared after an unrecoverable error (")
  ) {
    return null;
  }
  if (message.type === "assistant") {
    if (message.parent_tool_use_id !== null || message.message.model !== "<synthetic>") {
      return undefined;
    }
    const text = textFromClaudeContent(message.message.content).trim();
    if (text.startsWith(CLAUDE_GOAL_SET_PREFIX)) {
      const objective = text.slice(CLAUDE_GOAL_SET_PREFIX.length).trim();
      return objective.length === 0 ? undefined : { objective, status: "active", checks: 0 };
    }
    if (text.startsWith("Goal cleared: ") || text.startsWith("No goal set")) return null;
    const active = CLAUDE_GOAL_ACTIVE.exec(text);
    if (active?.[1] === undefined) return undefined;
    return {
      ...(current?.objective === active[1] ? current : {}),
      objective: active[1],
      status: "active",
      checks: Number(active[2] ?? 0),
    };
  }
  if (
    message.type !== "user" ||
    message.parent_tool_use_id !== null ||
    message.isSynthetic !== true ||
    current === null
  ) {
    return undefined;
  }
  const prefix = `Stop hook feedback:\n[${current.objective}]: `;
  const content = message.message.content;
  const text =
    typeof content === "string"
      ? content
      : content.flatMap((part) => (part.type === "text" ? [part.text] : [])).join("");
  if (!text.startsWith(prefix)) return undefined;
  return {
    ...current,
    status: "active",
    checks: (current.checks ?? 0) + 1,
    lastCheck: text.slice(prefix.length).trim(),
  };
}

/** The CLI confirms a goal change as a synthetic reply; the goal row shows that change instead. */
export function isClaudeGoalAcknowledgement(message: SDKMessage): boolean {
  if (
    message.type !== "assistant" ||
    message.parent_tool_use_id !== null ||
    message.message.model !== "<synthetic>"
  ) {
    return false;
  }
  const text = textFromClaudeContent(message.message.content).trim();
  return text.startsWith(CLAUDE_GOAL_SET_PREFIX) || text.startsWith("Goal cleared: ");
}

export const providerGoalsEqual = Schema.toEquivalence(Schema.NullOr(OrchestrationV2ProviderGoal));

export function normalizeClaudeResultText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function assistantTextFromSdkMessage(
  message: SDKMessage,
): { readonly nativeItemId: string; readonly text: string } | null {
  if (message.type !== "assistant") {
    return null;
  }
  return {
    nativeItemId: message.uuid,
    text: textFromClaudeContent(message.message.content),
  };
}

export function resultTextFromSdkMessage(
  message: SDKMessage,
): { readonly nativeItemId: string; readonly text: string } | null {
  if (message.type !== "result" || message.subtype !== "success") {
    return null;
  }
  return {
    nativeItemId: message.uuid,
    text: message.result,
  };
}

export function normalizeClaudeSessionTitle(title: string | null | undefined): string | null {
  if (title === null || title === undefined) return null;
  const trimmed = title.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function makeProviderThread(input: {
  readonly idAllocator: IdAllocator.IdAllocatorV2["Service"];
  readonly providerInstanceId: ProviderInstanceId;
  readonly appThreadId: OrchestrationV2ProviderThread["appThreadId"];
  readonly ownerNodeId?: OrchestrationV2ProviderThread["ownerNodeId"];
  readonly providerSessionId: OrchestrationV2ProviderThread["providerSessionId"];
  readonly nativeThreadId: string;
  readonly forkedFrom?: NonNullable<OrchestrationV2ProviderThread["forkedFrom"]>;
  readonly nativeMetadata?: NonNullable<OrchestrationV2ProviderThread["nativeMetadata"]>;
  readonly now: DateTime.Utc;
}): OrchestrationV2ProviderThread {
  return {
    id: input.idAllocator.derive.providerThread({
      driver: CLAUDE_PROVIDER,
      nativeThreadId: input.nativeThreadId,
    }),
    driver: CLAUDE_PROVIDER,
    providerInstanceId: input.providerInstanceId,
    providerSessionId: input.providerSessionId,
    appThreadId: input.appThreadId,
    ownerNodeId: input.ownerNodeId ?? null,
    nativeThreadRef: {
      driver: CLAUDE_PROVIDER,
      nativeId: input.nativeThreadId,
      strength: "strong",
    },
    nativeConversationHeadRef: null,
    status: "idle",
    firstRunOrdinal: null,
    lastRunOrdinal: null,
    handoffIds: [],
    forkedFrom: input.forkedFrom ?? null,
    ...(input.nativeMetadata === undefined ? {} : { nativeMetadata: input.nativeMetadata }),
    createdAt: input.now,
    updatedAt: input.now,
  };
}

export const decodeClaudeTranscriptLine = Schema.decodeUnknownOption(
  Schema.fromJsonString(Schema.Struct({ type: Schema.String })),
);

export const isClaudeConversationLine = (line: string): boolean =>
  Option.match(decodeClaudeTranscriptLine(line), {
    onNone: () => false,
    onSome: (entry) => entry.type === "user" || entry.type === "assistant",
  });

export const getNativeThreadId = Effect.fnUntraced(function* (
  providerThread: OrchestrationV2ProviderThread,
) {
  const nativeThreadId = providerThread.nativeThreadRef?.nativeId;
  if (nativeThreadId === undefined || nativeThreadId === null) {
    return yield* new ProviderAdapter.ProviderAdapterProtocolError({
      driver: CLAUDE_PROVIDER,
      detail: `Provider thread ${providerThread.id} is missing a native Claude session id.`,
    });
  }
  return nativeThreadId;
});

export const isSyntheticClaudeTurnId = (nativeTurnId: string): boolean =>
  nativeTurnId.startsWith("turn:");

export const claudeTurnCursor = (turn: OrchestrationV2ProviderTurn): string | null => {
  const ref = turn.nativeTurnRef;
  return ref !== null &&
    ref.driver === CLAUDE_PROVIDER &&
    ref.nativeId !== null &&
    !isSyntheticClaudeTurnId(ref.nativeId)
    ? ref.nativeId
    : null;
};

export const isTerminalProviderTurn = (turn: OrchestrationV2ProviderTurn): boolean =>
  turn.status === "completed" ||
  turn.status === "interrupted" ||
  turn.status === "failed" ||
  turn.status === "cancelled";

export const getNativeConversationHeadId = Effect.fnUntraced(function* (
  providerThread: OrchestrationV2ProviderThread,
) {
  const nativeHeadRef = providerThread.nativeConversationHeadRef;
  if (nativeHeadRef === null) {
    return undefined;
  }
  if (nativeHeadRef.driver !== CLAUDE_PROVIDER) {
    return yield* new ProviderAdapter.ProviderAdapterProtocolError({
      driver: CLAUDE_PROVIDER,
      detail: `Provider thread ${providerThread.id} has a non-Claude native conversation head reference.`,
    });
  }
  if (nativeHeadRef.nativeId === null) {
    return yield* new ProviderAdapter.ProviderAdapterProtocolError({
      driver: CLAUDE_PROVIDER,
      detail: `Provider thread ${providerThread.id} has a Claude native conversation head reference without a native id.`,
    });
  }
  return nativeHeadRef.nativeId;
});

export const resolveClaudeForkUpToMessageId = Effect.fn("ClaudeAdapterV2.resolveForkUpToMessageId")(
  function* (input: ProviderAdapter.ProviderAdapterV2ForkThreadInput) {
    if (input.providerTurnId === undefined || input.sourceProviderTurns === undefined) {
      return undefined;
    }

    const sourceTurns = input.sourceProviderTurns
      .filter((turn) => turn.providerThreadId === input.sourceProviderThread.id)
      .toSorted((left, right) => left.ordinal - right.ordinal);
    const boundaryIndex = sourceTurns.findIndex((turn) => turn.id === input.providerTurnId);
    if (boundaryIndex < 0) {
      return yield* new ProviderAdapter.ProviderAdapterForkThreadError({
        driver: CLAUDE_PROVIDER,
        providerThreadId: input.sourceProviderThread.id,
        cause: `Cannot fork Claude thread from provider turn ${input.providerTurnId}: source turn was not found in provider thread ${input.sourceProviderThread.id}.`,
      });
    }

    const boundaryNativeId = sourceTurns[boundaryIndex]?.nativeTurnRef?.nativeId;
    if (
      boundaryNativeId !== undefined &&
      boundaryNativeId !== null &&
      !isSyntheticClaudeTurnId(boundaryNativeId)
    ) {
      return boundaryNativeId;
    }

    // The head only marks this boundary when no later turn, finished or still running, wrote after it.
    if (sourceTurns.length === boundaryIndex + 1) {
      // Rollback pins the head but leaves the rolled-back turns in Claude's transcript.
      return yield* getNativeConversationHeadId(input.sourceProviderThread);
    }

    return yield* new ProviderAdapter.ProviderAdapterForkThreadError({
      driver: CLAUDE_PROVIDER,
      providerThreadId: input.sourceProviderThread.id,
      cause: `Cannot fork Claude thread from prior provider turn ${input.providerTurnId}: no SDK assistant message cursor was recorded for that turn.`,
    });
  },
);

export const resolveClaudeRollbackResumeSessionAt = Effect.fn(
  "ClaudeAdapterV2.resolveRollbackResumeSessionAt",
)(function* (input: ProviderAdapter.ProviderAdapterV2RollbackThreadInput) {
  switch (input.target.type) {
    case "thread_start":
      return input.providerThread.nativeMetadata?.forkHeadMessageId ?? null;
    case "provider_turn": {
      const target = input.target;
      if (target.providerTurn.providerThreadId !== input.providerThread.id) {
        return yield* new ProviderAdapter.ProviderAdapterRollbackThreadError({
          driver: CLAUDE_PROVIDER,
          providerThreadId: input.providerThread.id,
          cause: `Cannot roll back Claude thread ${input.providerThread.id} to provider turn ${target.providerTurn.id}: target turn belongs to provider thread ${target.providerTurn.providerThreadId}.`,
        });
      }

      const cursor = claudeTurnCursor(target.providerTurn);
      if (cursor !== null) {
        return cursor;
      }

      const providerTurnsAfterTarget = input.providerThreadTurns.filter(
        (turn) => turn.ordinal > target.providerTurn.ordinal && isTerminalProviderTurn(turn),
      );
      if (providerTurnsAfterTarget.length === 0) {
        return null;
      }

      // Only compaction can be omitted without dropping a retained user prompt.
      if (target.message !== undefined && isCompactionCommandMessage(target.message)) {
        const earlierTurn = input.providerThreadTurns
          .filter((turn) => turn.ordinal < target.providerTurn.ordinal)
          .toSorted((left, right) => left.ordinal - right.ordinal)
          .at(-1);
        const earlierCursor = earlierTurn === undefined ? null : claudeTurnCursor(earlierTurn);
        if (earlierCursor != null) {
          return earlierCursor;
        }
      }

      return yield* new ProviderAdapter.ProviderAdapterRollbackThreadError({
        driver: CLAUDE_PROVIDER,
        providerThreadId: input.providerThread.id,
        cause: `Cannot roll back Claude thread ${input.providerThread.id} to provider turn ${target.providerTurn.id}: no SDK assistant message cursor was recorded for that turn.`,
      });
    }
  }
});

export type ClaudeUserContent = SDKUserMessage["message"]["content"];
export type ClaudeUserContentBlock = Exclude<ClaudeUserContent, string>[number];

export const SUPPORTED_CLAUDE_IMAGE_MIME_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;
export type SupportedClaudeImageMimeType = (typeof SUPPORTED_CLAUDE_IMAGE_MIME_TYPES)[number];
export const supportedClaudeImageMimeTypes = new Set<string>(SUPPORTED_CLAUDE_IMAGE_MIME_TYPES);

export function isSupportedClaudeImageMimeType(
  mimeType: string,
): mimeType is SupportedClaudeImageMimeType {
  return supportedClaudeImageMimeTypes.has(mimeType);
}

export function makeClaudeUserMessage(input: {
  readonly text: string;
  readonly priority?: SDKUserMessage["priority"];
  readonly skills?: ReadonlyMap<string, ClaudeSkillTarget>;
  readonly skillMentionsFrom?: number;
  readonly uuid?: SDKUserMessage["uuid"];
}): SDKUserMessage {
  // Claude expands a skill only when `/name` starts the last text block.
  // Keep the whole request before that block; see ClaudeSkillDispatch.
  const dispatch =
    input.skills === undefined
      ? undefined
      : planClaudeSkillDispatch(input.text, input.skills, input.skillMentionsFrom);
  // Claude runs `/goal` only when it opens the prompt, so a goal stays one block.
  const isGoalCommand = parseGoalCommand({ text: input.text }) !== null;
  return {
    type: "user",
    message: {
      role: "user",
      content: isGoalCommand
        ? (dispatch?.leadingText ?? input.text)
        : dispatch
          ? [
              ...(dispatch.leadingText === undefined
                ? []
                : [{ type: "text" as const, text: dispatch.leadingText }]),
              { type: "text" as const, text: dispatch.commandText },
            ]
          : input.text,
    },
    parent_tool_use_id: null,
    ...(input.priority === undefined ? {} : { priority: input.priority }),
    ...(input.uuid === undefined ? {} : { uuid: input.uuid }),
  };
}

// Never decode streams just to enforce a provider limit. Only accept an explicit,
// uncompressed page tree whose /Count agrees with the visible page objects.
export const estimateClaudePdfPages = (bytes: Buffer): number | null => {
  if (bytes.length > 20 * 1024 * 1024 || bytes.subarray(0, 5).toString() !== "%PDF-") return null;
  if (!bytes.subarray(-1024).includes("%%EOF")) return null;
  let pages = 0;
  let count = 0;
  let catalog = false;
  let pageTree = false;
  let previous = "";
  const delimiter = (byte: number) =>
    byte <= 32 || "()<>[]{}/%".includes(String.fromCharCode(byte));
  for (let i = 0; i < bytes.length;) {
    const byte = bytes[i]!;
    if (byte === 37) {
      while (i < bytes.length && bytes[i] !== 10 && bytes[i] !== 13) i++;
      continue;
    }
    if (byte <= 32) {
      i++;
      continue;
    }
    if (previous === "/Type" && byte !== 47) return null;
    if (previous === "/Kids") {
      if (byte !== 91) return null;
      previous = "";
    }
    if (byte === 40) {
      let depth = 1;
      for (i++; i < bytes.length && depth > 0; i++) {
        if (bytes[i] === 92) i++;
        else if (bytes[i] === 40) depth++;
        else if (bytes[i] === 41) depth--;
      }
      if (depth !== 0) return null;
      previous = "";
      continue;
    }
    if (byte === 60 && bytes[i + 1] !== 60) {
      i = bytes.indexOf(62, i + 1);
      if (i < 0) return null;
      i++;
      previous = "";
      continue;
    }
    if (byte === 60 && bytes[i + 1] === 60) {
      i += 2;
      previous = "";
      continue;
    }
    if (delimiter(byte) && byte !== 47) {
      i++;
      continue;
    }
    const start = i++;
    while (i < bytes.length && !delimiter(bytes[i]!)) i++;
    if (i - start > 64) return null;
    const token = bytes.toString("latin1", start, i);
    if (token.includes("#") || ["/ObjStm", "/XRef", "/Encrypt", "/Prev"].includes(token))
      return null;
    if (token === "stream") {
      i = bytes.indexOf("endstream", i);
      if (i < 0) return null;
      i += 9;
      previous = "";
      continue;
    }
    if (previous === "/Type") {
      if (token === "/Page") pages++;
      if (token === "/Catalog") catalog = true;
      if (token === "/Pages") pageTree = true;
    }
    if (previous === "/Count") {
      if (!/^[1-9]\d{0,8}$/.test(token)) return null;
      let next = i;
      while (next < bytes.length) {
        if (bytes[next]! <= 32) next++;
        else if (bytes[next] === 37) {
          while (next < bytes.length && bytes[next] !== 10 && bytes[next] !== 13) next++;
        } else break;
      }
      // A second scalar is an indirect reference, not a direct page count.
      if (next < bytes.length && !delimiter(bytes[next]!)) return null;
      count = Math.max(count, Number(token));
    }
    previous = token;
  }
  return catalog && pageTree && pages > 0 && count === pages ? pages : null;
};

export const CLAUDE_ATTACHMENT_MAX_BYTES = 28 * 1024 * 1024;
export const CLAUDE_ATTACHMENT_MAX_PAGES = 100;

export const makeClaudeAttachmentBudget = (used?: { pagesUsed: number; bytesUsed: number }) => ({
  committed: { pages: used?.pagesUsed ?? 0, bytes: used?.bytesUsed ?? 0 },
  pending: { pages: 0, bytes: 0 },
  compacting: null as { pages: number; bytes: number } | null,
  get remainingPages() {
    return CLAUDE_ATTACHMENT_MAX_PAGES - this.committed.pages - this.pending.pages;
  },
  get remainingBytes() {
    return CLAUDE_ATTACHMENT_MAX_BYTES - this.committed.bytes - this.pending.bytes;
  },
});

export const joinFallbackText = (earlier: string, current: string) =>
  earlier.length === 0 ? current : current.length === 0 ? earlier : `${earlier}\n\n${current}`;

export const reserveClaudePdfBudget = (
  budget: ReturnType<typeof makeClaudeAttachmentBudget>,
  persist: Effect.Effect<void>,
) =>
  Effect.acquireRelease(
    Effect.sync(() => ({
      budget,
      pages: 0,
      bytes: 0,
      delivered: false,
      refunded: false,
      commit() {
        if (this.delivered) return;
        this.delivered = true;
        budget.pending.pages -= this.pages;
        budget.pending.bytes -= this.bytes;
        budget.committed.pages += this.pages;
        budget.committed.bytes += this.bytes;
      },
      // Claude dropped the message unread, so its files never entered the session.
      refund() {
        if (!this.delivered || this.refunded) return;
        this.refunded = true;
        budget.committed.pages -= this.pages;
        budget.committed.bytes -= this.bytes;
      },
    })),
    (reservation) =>
      Effect.sync(() => {
        if (reservation.delivered) return;
        budget.pending.pages -= reservation.pages;
        budget.pending.bytes -= reservation.bytes;
      }).pipe(Effect.andThen(persist)),
  );

export type ClaudeAppContext = NonNullable<
  ProviderAdapter.ProviderAdapterV2TurnInput["appContext"]
>;

// Digests keep the persisted record of delivered notes small; notes can be 16 KiB each.
export const claudeAppContextDigests = (
  appContext: ClaudeAppContext,
): ReadonlyMap<string, string> =>
  new Map(
    appContext.map((entry) => [
      entry.key,
      NodeCrypto.createHash("sha256").update(entry.text).digest("base64url"),
    ]),
  );

export const unseenClaudeAppContext = (
  appContext: ClaudeAppContext,
  seen: ReadonlyMap<string, string> | undefined,
): ClaudeAppContext => {
  const digests = claudeAppContextDigests(appContext);
  return appContext.filter((entry) => seen?.get(entry.key) !== digests.get(entry.key));
};

// MCP app notes are app-written, so they go as quoted user input like Codex's untrusted context.
// A slash command runs only when it opens a plain-text prompt; its note waits for the next turn.
// Returns `message` itself when it adds nothing.
export const withClaudeAppContext = (
  message: SDKUserMessage,
  appContext: ClaudeAppContext,
  reservation: Effect.Success<ReturnType<typeof reserveClaudePdfBudget>>,
): SDKUserMessage => {
  const content = message.message.content;
  if (appContext.length === 0 || (typeof content === "string" && content.startsWith("/"))) {
    return message;
  }
  const contextBlocks = appContext.map((entry) => {
    const updatedAt = entry.updatedAt === undefined ? "" : ` updated_at="${entry.updatedAt}"`;
    return {
      type: "text" as const,
      text: `<external_${entry.key}${updatedAt}>${entry.text}</external_${entry.key}>`,
    };
  });
  const bytes = Buffer.byteLength(encodeClaudeJson(contextBlocks));
  reservation.budget.pending.bytes += bytes;
  reservation.bytes += bytes;
  return {
    ...message,
    message: {
      ...message.message,
      content: [
        ...contextBlocks,
        ...(typeof content === "string" ? [{ type: "text" as const, text: content }] : content),
      ],
    },
  };
};

export const makeClaudeUserMessageWithAttachments = Effect.fnUntraced(function* (input: {
  readonly text: string;
  readonly attachments: ReadonlyArray<ChatAttachment>;
  readonly priority?: SDKUserMessage["priority"];
  readonly uuid?: SDKUserMessage["uuid"];
  readonly attachmentsDir: string;
  readonly fileSystem: FileSystem.FileSystem;
  readonly pdfReservation: Effect.Success<ReturnType<typeof reserveClaudePdfBudget>>;
  readonly skills?: ReadonlyMap<string, ClaudeSkillTarget>;
  readonly skillMentionsFrom?: number;
}) {
  if (input.attachments.length === 0) {
    const message = makeClaudeUserMessage({
      text: input.text,
      ...(input.skills === undefined ? {} : { skills: input.skills }),
      ...(input.skillMentionsFrom === undefined
        ? {}
        : { skillMentionsFrom: input.skillMentionsFrom }),
      ...(input.priority === undefined ? {} : { priority: input.priority }),
      ...(input.uuid === undefined ? {} : { uuid: input.uuid }),
    });
    const bytes = Buffer.byteLength(encodeClaudeJson(message.message.content));
    input.pdfReservation.budget.pending.bytes += bytes;
    input.pdfReservation.bytes += bytes;
    return message;
  }

  const textWithAttachmentPaths = yield* providerMessageTextWithAttachmentPaths({
    text: input.text,
    attachments: input.attachments,
    resolveExtractedTextPath: (path) =>
      DocumentText.resolveExtractedTextPath(path).pipe(
        Effect.provideService(FileSystem.FileSystem, input.fileSystem),
      ),
    resolveAttachmentPath: (attachment) =>
      resolveAttachmentPath({ attachmentsDir: input.attachmentsDir, attachment }),
  });

  const dispatch =
    input.skills === undefined
      ? undefined
      : planClaudeSkillDispatch(textWithAttachmentPaths, input.skills, input.skillMentionsFrom);
  const content: Array<ClaudeUserContentBlock> = [];
  // Base64 adds a third to the payload. Leave room below Anthropic's 32 MB
  // request limit for text, instructions, and SDK framing. The SDK does not
  // expose document/context-window capabilities, so use the 100-page limit
  // that also applies to models with less than a 1M-token context window.
  if (dispatch?.leadingText !== undefined) {
    content.push({ type: "text", text: dispatch.leadingText });
  }

  // Reserve all text and actual image bytes before considering any document,
  // including images that follow it in attachment order.
  const images = new Map<number, ClaudeUserContentBlock>();
  const textBytes = Buffer.byteLength(
    encodeClaudeJson(
      dispatch
        ? [
            ...(dispatch.leadingText === undefined
              ? []
              : [{ type: "text", text: dispatch.leadingText }]),
            { type: "text", text: dispatch.commandText },
          ]
        : [{ type: "text", text: textWithAttachmentPaths }],
    ),
  );
  input.pdfReservation.budget.pending.bytes += textBytes;
  input.pdfReservation.bytes += textBytes;
  for (const [index, attachment] of input.attachments.entries()) {
    if (attachment.type !== "image") continue;
    if (!isSupportedClaudeImageMimeType(attachment.mimeType)) {
      return yield* new ProviderAdapter.ProviderAdapterProtocolError({
        driver: CLAUDE_PROVIDER,
        detail: `Unsupported Claude image attachment type '${attachment.mimeType}'`,
      });
    }
    const attachmentPath = resolveAttachmentPath({
      attachmentsDir: input.attachmentsDir,
      attachment,
    });
    if (attachmentPath === null) {
      return yield* new ProviderAdapter.ProviderAdapterProtocolError({
        driver: CLAUDE_PROVIDER,
        detail: `Invalid attachment id '${attachment.id}'`,
      });
    }
    const bytes = yield* input.fileSystem.readFile(attachmentPath).pipe(
      Effect.mapError(
        (cause) =>
          new ProviderAdapter.ProviderAdapterProtocolError({
            driver: CLAUDE_PROVIDER,
            detail: `Failed to read attachment '${attachment.id}'`,
            reason: "attachment_unreadable",
            payload: cause,
          }),
      ),
    );
    const retainedBytes = 4 * Math.ceil(bytes.length / 3) + 128;
    if (retainedBytes > input.pdfReservation.budget.remainingBytes) continue;
    input.pdfReservation.budget.pending.bytes += retainedBytes;
    input.pdfReservation.bytes += retainedBytes;
    const block: ClaudeUserContentBlock = {
      type: "image",
      source: {
        type: "base64",
        media_type: attachment.mimeType,
        data: Buffer.from(bytes).toString("base64"),
      },
    };
    images.set(index, block);
  }
  for (const [index, attachment] of input.attachments.entries()) {
    if (attachment.type === "file") {
      if (
        input.pdfReservation.budget.remainingPages <= 0 ||
        attachment.mimeType.toLowerCase().split(";", 1)[0]?.trim() !== "application/pdf" ||
        ("source" in attachment && attachment.source?._tag === "pasted-text")
      )
        continue;
      const attachmentPath = resolveAttachmentPath({
        attachmentsDir: input.attachmentsDir,
        attachment,
      });
      if (attachmentPath === null) continue;
      const remainingBytes = Math.min(
        PROVIDER_SEND_TURN_MAX_FILE_BYTES,
        20 * 1024 * 1024,
        Math.floor(((input.pdfReservation.budget.remainingBytes - 1024) * 3) / 4),
      );
      const info = yield* input.fileSystem
        .stat(attachmentPath)
        .pipe(Effect.orElseSucceed(() => null));
      if (info?.type !== "File" || Number(info.size) > remainingBytes || remainingBytes <= 0)
        continue;
      const bytes = yield* input.fileSystem
        .stream(attachmentPath, { bytesToRead: remainingBytes + 1 })
        .pipe(
          Stream.runCollect,
          Effect.map((chunks) => Buffer.concat(chunks)),
          Effect.orElseSucceed(() => null),
        );
      if (bytes === null || bytes.length > remainingBytes) continue;
      const pageCount = estimateClaudePdfPages(bytes);
      if (pageCount === null) {
        yield* Effect.logDebug("Claude PDF page count is unknown; keeping attachment path-only.");
        continue;
      }
      const retainedBytes = 4 * Math.ceil(bytes.length / 3) + 128;
      if (
        pageCount <= 0 ||
        pageCount > input.pdfReservation.budget.remainingPages ||
        retainedBytes > input.pdfReservation.budget.remainingBytes
      )
        continue;
      input.pdfReservation.budget.pending.pages += pageCount;
      input.pdfReservation.pages += pageCount;
      const block: ClaudeUserContentBlock = {
        type: "document",
        source: { type: "base64", media_type: "application/pdf", data: bytes.toString("base64") },
      };
      input.pdfReservation.budget.pending.bytes += retainedBytes;
      input.pdfReservation.bytes += retainedBytes;
      content.push(block);
      continue;
    }
    const image = images.get(index);
    if (image !== undefined) content.push(image);
  }

  // Images must precede the command block for skill expansion.
  if (dispatch) {
    content.push({ type: "text", text: dispatch.commandText });
  } else if (textWithAttachmentPaths.length > 0) {
    content.push({ type: "text", text: textWithAttachmentPaths });
  }

  return {
    type: "user",
    message: {
      role: "user",
      content,
    },
    parent_tool_use_id: null,
    ...(input.priority === undefined ? {} : { priority: input.priority }),
    ...(input.uuid === undefined ? {} : { uuid: input.uuid }),
  } satisfies SDKUserMessage;
});

export function isClaudePromptUuid(value: string): value is NonNullable<SDKUserMessage["uuid"]> {
  return /^[^-]+-[^-]+-[^-]+-[^-]+-[^-]+$/.test(value);
}

export type ClaudeAssistantContentBlock = SDKAssistantMessage["message"]["content"][number];
export type ClaudeToolUseContentBlock = Extract<
  ClaudeAssistantContentBlock,
  {
    readonly id: string;
    readonly name: string;
    readonly input: unknown;
  }
>;
export type ClaudeAssistantToolResultContentBlock = Extract<
  ClaudeAssistantContentBlock,
  {
    readonly tool_use_id: string;
  }
>;
export type ClaudeUserToolResultContentBlock = Extract<
  ClaudeUserContentBlock,
  {
    readonly tool_use_id: string;
  }
>;
export type ClaudeToolResultContentBlock =
  | ClaudeAssistantToolResultContentBlock
  | ClaudeUserToolResultContentBlock;
export type ClaudeTypedToolResultContentBlock = Exclude<
  ClaudeToolResultContentBlock,
  { readonly type: "mcp_tool_result" | "tool_result" }
>;
export type ClaudeTypedToolResultContent = ClaudeTypedToolResultContentBlock["content"];
export type ClaudeToolResultOutput =
  | Extract<ClaudeToolResultContentBlock, { readonly type: "tool_result" }>["content"]
  | Extract<ClaudeToolResultContentBlock, { readonly type: "mcp_tool_result" }>["content"]
  | ClaudeTypedToolResultContent;

export function assertNever(value: never): never {
  throw new Error(`Unhandled Claude SDK variant: ${jsonStringifyForTool(value)}`);
}

export const ClaudeRuntimeSandboxPolicyKind = Schema.Struct({
  type: Schema.Literals(["dangerFullAccess", "externalSandbox", "readOnly", "workspaceWrite"]),
});
export type ClaudeRuntimeSandboxPolicy = typeof ClaudeRuntimeSandboxPolicyKind.Type;
export type ClaudeRuntimeSandboxPolicyKindName = ClaudeRuntimeSandboxPolicy["type"];
export const isClaudeRuntimeSandboxPolicyKind = Schema.is(ClaudeRuntimeSandboxPolicyKind);

export const ClaudeRuntimeReadOnlyFullAccessSandboxPolicy = Schema.Struct({
  type: Schema.Literal("readOnly"),
  access: Schema.Struct({
    type: Schema.Literal("fullAccess"),
  }),
});
export const isClaudeRuntimeReadOnlyFullAccessSandboxPolicy = Schema.is(
  ClaudeRuntimeReadOnlyFullAccessSandboxPolicy,
);

export function sandboxPolicyKindForClaudeRuntimePolicy(
  runtimePolicy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
): ClaudeRuntimeSandboxPolicyKindName | undefined {
  return runtimePolicy.sandboxPolicy !== undefined &&
    isClaudeRuntimeSandboxPolicyKind(runtimePolicy.sandboxPolicy)
    ? runtimePolicy.sandboxPolicy.type
    : undefined;
}

export function readOnlyPolicyAllowsGlobalReads(
  runtimePolicy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
): boolean {
  return (
    runtimePolicy.sandboxPolicy !== undefined &&
    isClaudeRuntimeReadOnlyFullAccessSandboxPolicy(runtimePolicy.sandboxPolicy)
  );
}

export function permissionModeForClaudeRuntimePolicy(
  runtimePolicy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
): PermissionMode {
  if (runtimePolicy.interactionMode === "plan") {
    return "plan";
  }
  if (runtimePolicy.approvalPolicy === "never") {
    switch (sandboxPolicyKindForClaudeRuntimePolicy(runtimePolicy)) {
      case "readOnly":
        return "dontAsk";
      case "dangerFullAccess":
      case "externalSandbox":
        return "bypassPermissions";
      case "workspaceWrite":
      case undefined:
        return runtimePolicy.runtimeMode === "approval-required"
          ? "dontAsk"
          : runtimePolicy.runtimeMode === "auto-accept-edits"
            ? "acceptEdits"
            : "bypassPermissions";
    }
  }
  if (runtimePolicy.approvalPolicy !== undefined && runtimePolicy.approvalPolicy !== "never") {
    return "default";
  }

  switch (sandboxPolicyKindForClaudeRuntimePolicy(runtimePolicy)) {
    case "readOnly":
      return "dontAsk";
    case "dangerFullAccess":
      return runtimePolicy.runtimeMode === "approval-required" ? "default" : "bypassPermissions";
    case "externalSandbox":
    case "workspaceWrite":
    case undefined:
      break;
  }

  switch (runtimePolicy.runtimeMode) {
    case "approval-required":
      return "default";
    case "auto-accept-edits":
      return "acceptEdits";
    case "auto":
      return "auto";
    case "full-access":
      return "bypassPermissions";
  }
}

export interface ClaudeRuntimeQueryPolicy {
  readonly permissionMode: PermissionMode;
  readonly tools?: ClaudeAgentSdkQueryTools;
  readonly allowedTools?: ReadonlyArray<string>;
  readonly allowDangerouslySkipPermissions?: true;
  readonly installPermissionCallback: boolean;
}

export interface ClaudeBypassAvailability {
  readonly bypassDisabled: boolean;
  readonly autoDisabled: boolean;
  /** The settings that turn auto mode off; the broadest one when several do. */
  readonly autoDisabledBy?: ProviderRuntimeModeLimitReason;
}

export const CLAUDE_BYPASS_FULLY_AVAILABLE: ClaudeBypassAvailability = {
  bypassDisabled: false,
  autoDisabled: false,
};

export function claudeRuntimeQueryPolicyForRuntimePolicy(
  runtimePolicy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
  availability: ClaudeBypassAvailability = CLAUDE_BYPASS_FULLY_AVAILABLE,
): ClaudeRuntimeQueryPolicy {
  const requestedMode = permissionModeForClaudeRuntimePolicy(runtimePolicy);
  const downgraded = requestedMode === "bypassPermissions" && availability.bypassDisabled;
  const permissionMode = downgraded
    ? availability.autoDisabled
      ? "default"
      : "auto"
    : requestedMode;
  const readOnlyTools =
    sandboxPolicyKindForClaudeRuntimePolicy(runtimePolicy) === "readOnly"
      ? CLAUDE_READ_ONLY_ALLOWED_TOOLS
      : undefined;
  const allowedTools =
    readOnlyTools !== undefined && readOnlyPolicyAllowsGlobalReads(runtimePolicy)
      ? readOnlyTools
      : undefined;
  // acceptEdits approves edits before the callback; the callback must ask for everything else.
  // Auto sends back what its review leaves open, and every tool where Claude cannot run in Auto.
  const installPermissionCallback =
    downgraded ||
    permissionMode === "auto" ||
    (runtimePolicy.approvalPolicy === undefined
      ? runtimePolicy.runtimeMode === "approval-required" ||
        runtimePolicy.runtimeMode === "auto-accept-edits"
      : runtimePolicy.approvalPolicy !== "never");

  if (permissionMode === "plan") {
    return {
      permissionMode,
      ...(readOnlyTools === undefined ? {} : { tools: readOnlyTools }),
      ...(allowedTools === undefined ? {} : { allowedTools }),
      // Claude routes Plan-mode writes to the callback even in Auto or Full access.
      installPermissionCallback: true,
    };
  }

  return {
    permissionMode,
    ...(readOnlyTools === undefined ? {} : { tools: readOnlyTools }),
    ...(allowedTools === undefined ? {} : { allowedTools }),
    ...(permissionMode === "bypassPermissions" ? { allowDangerouslySkipPermissions: true } : {}),
    installPermissionCallback,
  };
}

export const ClaudeBypassSettings = Schema.StructWithRest(
  Schema.Struct({
    disableAutoMode: Schema.optionalKey(Schema.Literals(["disable", false])),
    permissions: Schema.optionalKey(
      Schema.StructWithRest(
        Schema.Struct({
          disableBypassPermissionsMode: Schema.optionalKey(Schema.Literals(["disable", false])),
          disableAutoMode: Schema.optionalKey(Schema.Literals(["disable", false])),
        }),
        [Schema.Record(Schema.String, Schema.Unknown)],
      ),
    ),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
export const decodeClaudeBypassSettings = Schema.decodeUnknownEffect(
  fromLenientJson(ClaudeBypassSettings),
);
export const decodeClaudeLaunchArgBypassSettings = Schema.decodeUnknownEffect(ClaudeBypassSettings);

export function claudeSdkBypassSettings(settings: typeof ClaudeBypassSettings.Type) {
  const { disableAutoMode, permissions, ...rest } = settings;
  const {
    disableBypassPermissionsMode,
    disableAutoMode: nestedAutoMode,
    ...permissionRest
  } = permissions ?? {};
  return {
    ...rest,
    ...(disableAutoMode === "disable" ? { disableAutoMode } : {}),
    ...(permissions
      ? {
          permissions: {
            ...permissionRest,
            ...(disableBypassPermissionsMode === "disable" ? { disableBypassPermissionsMode } : {}),
            ...(nestedAutoMode === "disable" ? { disableAutoMode: nestedAutoMode } : {}),
          },
        }
      : {}),
  };
}

// --settings travels to the SDK as options.settings, whose type only allows "disable".
// Shapes the schema rejects keep their current pass-through; resolveBypassAvailability
// already treats them as a bypass failure.
export const decodeClaudeLaunchArgBypassSettingsOption =
  Schema.decodeUnknownOption(ClaudeBypassSettings);
export function claudeSdkLaunchArgSettings(settings: ClaudeSdkSettings): ClaudeSdkSettings {
  const decoded = decodeClaudeLaunchArgBypassSettingsOption(settings);
  return Option.isNone(decoded)
    ? settings
    : (claudeSdkBypassSettings(decoded.value) as ClaudeSdkSettings);
}

export const ClaudePromptCacheTtl = Schema.Literals(["5m", "1h"]);
export const decodeClaudePromptCacheTtl = Schema.decodeUnknownOption(ClaudePromptCacheTtl);
export const decodeClaudeSubagentCacheSettings = Schema.decodeUnknownEffect(
  fromLenientJson(
    Schema.StructWithRest(
      Schema.Struct({ subagentPromptCacheTtl: Schema.optionalKey(ClaudePromptCacheTtl) }),
      [Schema.Record(Schema.String, Schema.Unknown)],
    ),
  ),
);
export const decodeClaudeCompactSettings = Schema.decodeUnknownEffect(
  Schema.fromJsonString(
    Schema.Struct({
      autoCompactEnabled: Schema.optionalKey(Schema.Unknown),
      autoCompactWindow: Schema.optionalKey(Schema.Unknown),
      modelSettings: Schema.optionalKey(Schema.Unknown),
    }),
  ),
);
export const decodeClaudeCompactWindow = Schema.decodeUnknownOption(Schema.Int);
export const decodeClaudeEnvSettings = Schema.decodeUnknownEffect(
  fromLenientJson(
    Schema.StructWithRest(
      Schema.Struct({ env: Schema.optionalKey(Schema.Record(Schema.String, Schema.Unknown)) }),
      [Schema.Record(Schema.String, Schema.Unknown)],
    ),
  ),
);

export function claudeBypassAvailability(
  settings: typeof ClaudeBypassSettings.Type,
): ClaudeBypassAvailability {
  return {
    bypassDisabled: settings.permissions?.disableBypassPermissionsMode === "disable",
    autoDisabled:
      settings.disableAutoMode === "disable" || settings.permissions?.disableAutoMode === "disable",
  };
}

export const CLAUDE_AUTO_DISABLED_BY_ORDER = [
  "managed-settings",
  "user-settings",
  "project-settings",
] as const satisfies ReadonlyArray<ProviderRuntimeModeLimitReason>;

/**
 * Which of Claude's permission modes its settings turn off for `cwd`, read from the settings
 * files without starting Claude. A setting cannot say what Claude decides at start-up, so a mode
 * reported available here can still be refused.
 */
export const resolveClaudeModeAvailability = Effect.fn("ClaudeAdapterV2.resolveModeAvailability")(
  function* (input: {
    readonly settings: ClaudeSettings;
    readonly homePath: string;
    /** The SDK's user source is the host's home, so a custom one is read here. */
    readonly customHome: boolean;
    readonly cwd: string | null;
    readonly fileSystem: FileSystem.FileSystem;
    readonly path: Path.Path;
  }) {
    const { fileSystem, path, homePath, customHome, cwd } = input;
    const readBypassSettings = (filePath: string) =>
      fileSystem.readFileString(filePath).pipe(
        Effect.flatMap(decodeClaudeBypassSettings),
        Effect.catchReason("PlatformError", "NotFound", () =>
          Effect.succeed({} as typeof ClaudeBypassSettings.Type),
        ),
      );
    // resolveSettings does not initialize remote-cache eligibility in the SDK host.
    // Keep the payload intact so the SDK also honors managedSourcesBehavior.
    const remote = yield* readBypassSettings(path.join(homePath, "remote-settings.json"));
    const home = customHome ? yield* readBypassSettings(path.join(homePath, "settings.json")) : {};
    const resolved = yield* Effect.tryPromise({
      try: () =>
        resolveClaudeSettings({
          ...(cwd === null ? {} : { cwd }),
          settingSources: customHome ? ["project", "local"] : ["user", "project", "local"],
          serverManagedSettings: claudeSdkBypassSettings(remote),
        }),
      catch: (cause) => queryRunnerError(cause, "resolveSettings"),
    });
    const launchArgSettings = yield* readClaudeLaunchArgSettings({
      settings: input.settings,
      cwd,
      fileSystem,
      path,
    });
    const launch = yield* decodeClaudeLaunchArgBypassSettings(launchArgSettings ?? {});
    const sources = [resolved.effective, home, remote, launch].map(claudeBypassAvailability);
    const autoDisabledBy = new Set<ProviderRuntimeModeLimitReason>();
    if (claudeBypassAvailability(remote).autoDisabled) autoDisabledBy.add("managed-settings");
    // T3's own launch arguments and a custom Claude home are the person's, like user settings.
    if ([home, launch].some((source) => claudeBypassAvailability(source).autoDisabled)) {
      autoDisabledBy.add("user-settings");
    }
    for (const { source, settings } of resolved.sources) {
      if (!claudeBypassAvailability(settings).autoDisabled) continue;
      autoDisabledBy.add(
        source === "managed"
          ? "managed-settings"
          : source === "user"
            ? "user-settings"
            : source === "project" || source === "local"
              ? "project-settings"
              : "settings",
      );
    }
    const autoDisabled = sources.some((source) => source.autoDisabled);
    return {
      bypassDisabled: sources.some((source) => source.bypassDisabled),
      autoDisabled,
      ...(autoDisabled
        ? {
            autoDisabledBy:
              CLAUDE_AUTO_DISABLED_BY_ORDER.find((reason) => autoDisabledBy.has(reason)) ??
              ("settings" as const),
          }
        : {}),
    } satisfies ClaudeBypassAvailability;
  },
);

/**
 * What a thread shows when it was asked for Auto and Claude is not running in it. The row shows
 * one line, so the consequence and the reason come first.
 */
export function claudeAutoModeUnavailableNotice(
  reason: ProviderRuntimeModeLimitReason | undefined,
): string {
  const switchMode = "Switch this thread to Supervised or Auto-accept edits";
  switch (reason) {
    case "managed-settings":
      return `Asking about each action: your organization's Claude settings turn auto mode off. ${switchMode}.`;
    case "user-settings":
      return `Asking about each action: your Claude settings turn auto mode off. ${switchMode}, or change the setting.`;
    case "project-settings":
      return `Asking about each action: this project's Claude settings turn auto mode off. ${switchMode}, or change the setting.`;
    case "settings":
      return `Asking about each action: Claude's settings turn auto mode off. ${switchMode}, or change the setting.`;
    case undefined:
      return `Asking about each action: Claude's auto mode is unavailable here, and Claude did not say why. Some models have none. ${switchMode}, or try another model.`;
  }
}

export function requiresClaudeApproval(context: ActiveClaudeTurnContext): boolean {
  // CLI-forwarded requests need a person's decision even under bypass (ask rules,
  // safety checks, or settings fallback). Do not wait for queued init/status updates.
  const policy = context.queryPolicy;
  return policy.installPermissionCallback || policy.permissionMode === "bypassPermissions";
}

export function claudeRuntimeQueryPolicyKey(policy: ClaudeRuntimeQueryPolicy): string {
  return JSON.stringify({
    permissionMode: policy.permissionMode,
    tools: policy.tools,
    allowedTools: policy.allowedTools,
    allowDangerouslySkipPermissions: policy.allowDangerouslySkipPermissions,
    installPermissionCallback: policy.installPermissionCallback,
  });
}

// Live-query reuse must include MCP pre-approvals, which can differ for the same policy key.
export function claudeEffectiveQueryPolicyKey(
  queryPolicy: ClaudeRuntimeQueryPolicy,
  mcpOverrides: {
    readonly allowedTools?: ReadonlyArray<string>;
    readonly mcpServers?: ClaudeQueryOptions["mcpServers"];
  },
  // Folders are fixed when a query starts, so a changed list needs a new one.
  workspace?: ProviderAdapter.ProviderAdapterV2RuntimePolicy["workspace"],
): string {
  return JSON.stringify({
    workspace,
    runtimePolicy: claudeRuntimeQueryPolicyKey({
      ...queryPolicy,
      ...(mcpOverrides.allowedTools === undefined
        ? {}
        : { allowedTools: mcpOverrides.allowedTools }),
    }),
    mcpServers: mcpOverrides.mcpServers,
  });
}

export type ClaudeToolItemType = Extract<
  OrchestrationV2TurnItem["type"],
  "command_execution" | "file_change" | "dynamic_tool" | "web_search"
>;

export interface ClaudeToolClassification {
  readonly normalizedName: string;
  readonly itemType: ClaudeToolItemType;
  readonly requestKind: ProviderRequestKind;
}

export function normalizedClaudeToolName(toolName: string): string {
  return toolName.toLowerCase().replaceAll(/[\s_-]/g, "");
}

export const CLAUDE_KNOWN_TOOL_CLASSIFICATIONS: Record<
  string,
  {
    readonly itemType: ClaudeToolItemType;
    readonly requestKind: ProviderRequestKind;
  }
> = {
  agent: { itemType: "dynamic_tool", requestKind: "command" },
  bash: { itemType: "command_execution", requestKind: "command" },
  edit: { itemType: "file_change", requestKind: "file-change" },
  glob: { itemType: "dynamic_tool", requestKind: "file-read" },
  grep: { itemType: "dynamic_tool", requestKind: "file-read" },
  ls: { itemType: "dynamic_tool", requestKind: "file-read" },
  monitor: { itemType: "dynamic_tool", requestKind: "command" },
  multiedit: { itemType: "file_change", requestKind: "file-change" },
  notebookedit: { itemType: "file_change", requestKind: "file-change" },
  read: { itemType: "dynamic_tool", requestKind: "file-read" },
  sendmessage: { itemType: "dynamic_tool", requestKind: "command" },
  task: { itemType: "dynamic_tool", requestKind: "command" },
  taskstop: { itemType: "dynamic_tool", requestKind: "command" },
  todowrite: { itemType: "dynamic_tool", requestKind: "command" },
  toolsearch: { itemType: "dynamic_tool", requestKind: "command" },
  webfetch: { itemType: "web_search", requestKind: "command" },
  websearch: { itemType: "web_search", requestKind: "command" },
  write: { itemType: "file_change", requestKind: "file-change" },
};

export function classifyClaudeNativeTool(toolName: string): ClaudeToolClassification {
  const normalizedName = normalizedClaudeToolName(toolName);
  const known = CLAUDE_KNOWN_TOOL_CLASSIFICATIONS[normalizedName];
  return known === undefined
    ? {
        normalizedName,
        itemType: "dynamic_tool",
        requestKind: "command",
      }
    : {
        normalizedName,
        ...known,
      };
}

export function providerRequestKindFromClaudeTool(toolName: string): ProviderRequestKind {
  return classifyClaudeNativeTool(toolName).requestKind;
}

export function isClaudeWebSearchOutput(output: unknown): output is WebSearchOutput {
  return (
    typeof output === "object" &&
    output !== null &&
    typeof Reflect.get(output, "query") === "string" &&
    Array.isArray(Reflect.get(output, "results")) &&
    typeof Reflect.get(output, "durationSeconds") === "number"
  );
}

export const ClaudeNativeToolInputRecord = Schema.Record(Schema.String, Schema.Unknown);
export type ClaudeNativeToolInputRecord = typeof ClaudeNativeToolInputRecord.Type;
export const isClaudeNativeToolInputRecord = Schema.is(ClaudeNativeToolInputRecord);

export type ClaudeNativeToolInput =
  | {
      readonly type: "record";
      readonly value: ClaudeNativeToolInputRecord;
    }
  | {
      readonly type: "non_record";
      readonly value: unknown;
    };

export const EMPTY_CLAUDE_NATIVE_TOOL_INPUT = {
  type: "record",
  value: {},
} satisfies ClaudeNativeToolInput;

export function claudeNativeToolInputFromUnknown(input: unknown): ClaudeNativeToolInput {
  return isClaudeNativeToolInputRecord(input)
    ? { type: "record", value: input }
    : { type: "non_record", value: input };
}

export function claudeNativeToolInputFromRecord(
  input: Record<string, unknown>,
): ClaudeNativeToolInput {
  return { type: "record", value: input };
}

export function claudeNativeToolInputValue(input: ClaudeNativeToolInput): unknown {
  return input.value;
}

export function inputRecordValue(input: ClaudeNativeToolInput, key: string): unknown {
  return input.type === "record" ? input.value[key] : undefined;
}

export function firstStringInputField(
  input: ClaudeNativeToolInput,
  keys: ReadonlyArray<string>,
): string | undefined {
  for (const key of keys) {
    const value = inputRecordValue(input, key);
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}

export function jsonStringifyForTool(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value) ?? String(value);
}

export function commandInputFromClaudeTool(toolName: string, input: ClaudeNativeToolInput): string {
  return (
    firstStringInputField(input, ["command", "cmd", "script"]) ??
    `${toolName}: ${jsonStringifyForTool(claudeNativeToolInputValue(input))}`
  );
}

// background_tasks_changed can include subagents already counted by their lifecycle.
export const CLAUDE_OPAQUE_BACKGROUND_TASK_KINDS: ReadonlyMap<
  string,
  Exclude<OrchestrationV2PendingBackgroundTask["kind"], "subagent">
> = new Map([["local_bash", "command"]]);

// Claude Code 2.1.292 defers its goal Stop hook for these subagent types.
// local_bash tasks defer it through the opaque-task roster.
export const CLAUDE_GOAL_DEFERRING_TASK_TYPES: ReadonlySet<string> = new Set([
  "local_agent",
  "remote_agent",
  "in_process_teammate",
  "local_workflow",
]);

export function isClaudeOpaqueBackgroundTaskType(taskType: string | null | undefined): boolean {
  return typeof taskType === "string" && CLAUDE_OPAQUE_BACKGROUND_TASK_KINDS.has(taskType);
}

export function claudePendingBackgroundTask(input: {
  readonly taskId: string;
  readonly taskType: string | null;
  // Only the launching Monitor tool distinguishes a local_bash Monitor from background Bash.
  readonly startedByMonitor: boolean;
  readonly description: string | undefined;
  // Undeclared SDK field: the subagent whose own background work this is.
  readonly parentTaskId: unknown;
  readonly toolUseId: string | undefined;
}): OrchestrationV2PendingBackgroundTask {
  return {
    taskId: input.taskId,
    kind: input.startedByMonitor
      ? "monitor"
      : ((input.taskType === null
          ? undefined
          : CLAUDE_OPAQUE_BACKGROUND_TASK_KINDS.get(input.taskType)) ?? "background_task"),
    ...(input.description !== undefined && input.description.trim().length > 0
      ? { description: input.description }
      : {}),
    ...(typeof input.parentTaskId === "string" && input.parentTaskId.trim().length > 0
      ? { parentTaskId: input.parentTaskId }
      : {}),
    ...(input.toolUseId === undefined ? {} : { nativeItemId: input.toolUseId }),
  };
}

export function claudeTaskTypeFromSdkMessage(message: SDKMessage): string | null {
  if (typeof message !== "object" || message === null) {
    return null;
  }
  const taskType = Reflect.get(message, "task_type");
  return typeof taskType === "string" ? taskType : null;
}

export function isClaudeNonSubagentTask(message: SDKMessage): boolean {
  return isClaudeOpaqueBackgroundTaskType(claudeTaskTypeFromSdkMessage(message));
}

// A `context: fork` skill's task_started names no tool call; its frames use this parent id instead.
export function claudeForkedSkillToolUseId(
  message: Extract<SDKMessage, { readonly type: "system"; readonly subtype: "task_started" }>,
): string | undefined {
  const skill = message.description.trim();
  return message.tool_use_id === undefined &&
    message.task_type === "local_agent" &&
    (message.spawn_depth ?? 1) <= 1 &&
    skill.length > 1 &&
    skill.startsWith("/")
    ? `forked-command-${skill.slice(1)}`
    : undefined;
}

export function isClaudeBackgroundTasksChangedMessage(message: SDKMessage): boolean {
  return message.type === "system" && (message.subtype as string) === "background_tasks_changed";
}

export function isClaudeTurnStartMessage(message: SDKMessage): boolean {
  return message.type === "system" && message.subtype === "init";
}

export function isClaudeRootTurnFrame(message: SDKMessage): boolean {
  return (
    isClaudeTurnStartMessage(message) ||
    ((message.type === "user" || message.type === "assistant" || message.type === "stream_event") &&
      message.parent_tool_use_id == null)
  );
}

// One stable id per native thread: a new ScheduleWakeup replaces the pending one.
export const CLAUDE_SCHEDULED_WAKEUP_TASK: OrchestrationV2PendingBackgroundTask = {
  taskId: "claude-scheduled-wakeup",
  kind: "background_task",
  description: "Scheduled wakeup",
};

// Claude Code jitters one-shot wakeups early but never before the requested time, which is at
// most 60 s before the minute-rounded scheduledFor it reports; the rest is slack.
export const CLAUDE_SCHEDULED_WAKEUP_EARLY_FIRE_MARGIN_MS = 120_000;

// The CLI answers a control request such as setModel with a replayed local-command user frame.
// It belongs to no turn, so on an idle session it is not the start of a wake.
export function isClaudeLocalCommandEcho(message: SDKMessage): boolean {
  if (message.type !== "user" || !("isReplay" in message) || !message.isReplay) return false;
  const content = message.message.content;
  return typeof content === "string" && content.startsWith("<local-command-stdout>");
}

export function claudePendingBackgroundTasksFromRoster(
  roster: ReadonlyMap<string, OrchestrationV2PendingBackgroundTask>,
  awaitedTaskIds: ReadonlySet<string>,
): ReadonlyArray<OrchestrationV2PendingBackgroundTask> {
  return Array.from(roster.values(), (task) =>
    awaitedTaskIds.has(task.taskId) ? { ...task, awaited: true as const } : task,
  );
}

export function parseClaudeBackgroundTaskEntry(
  entry: unknown,
  monitorTasks: ReadonlyMap<string, unknown>,
  toolUseIds: ReadonlyMap<string, string>,
): OrchestrationV2PendingBackgroundTask | null {
  if (entry === null || typeof entry !== "object") {
    return null;
  }
  const taskId = Reflect.get(entry, "task_id");
  if (typeof taskId !== "string" || taskId.length === 0) {
    return null;
  }
  const rawTaskType = Reflect.get(entry, "task_type");
  const taskType = typeof rawTaskType === "string" ? rawTaskType : null;
  if (!isClaudeOpaqueBackgroundTaskType(taskType)) {
    return null;
  }
  const description = Reflect.get(entry, "description");
  return claudePendingBackgroundTask({
    taskId,
    taskType,
    startedByMonitor: monitorTasks.has(taskId),
    description: typeof description === "string" ? description : undefined,
    parentTaskId: Reflect.get(entry, "parent_task_id"),
    toolUseId: toolUseIds.get(taskId),
  });
}

export function fileNameFromClaudeTool(toolName: string, input: ClaudeNativeToolInput): string {
  return (
    firstStringInputField(input, ["file_path", "notebook_path", "path", "filename", "fileName"]) ??
    `${toolName} result`
  );
}

export type ClaudeNativeToolOutput =
  | {
      readonly type: "none";
    }
  | {
      readonly type: "content_block";
      readonly value: ClaudeToolResultOutput;
    }
  | {
      readonly type: "structured_tool_use_result";
      readonly value: unknown;
      readonly fallbackValue?: ClaudeToolResultOutput;
    };

export const NO_CLAUDE_NATIVE_TOOL_OUTPUT = { type: "none" } satisfies ClaudeNativeToolOutput;

export function claudeNativeToolOutputFromToolResult(
  toolResult: ClaudeToolResultContentBlock,
): ClaudeNativeToolOutput {
  const value = outputFromClaudeToolResult(toolResult);
  return value === undefined ? NO_CLAUDE_NATIVE_TOOL_OUTPUT : { type: "content_block", value };
}

export function claudeNativeToolOutputFromStructuredResult(input: {
  readonly structuredOutput: unknown;
  readonly fallbackValue?: ClaudeToolResultOutput;
}): ClaudeNativeToolOutput {
  return {
    type: "structured_tool_use_result",
    value: input.structuredOutput,
    ...(input.fallbackValue === undefined ? {} : { fallbackValue: input.fallbackValue }),
  };
}

export function claudeNativeToolOutputValue(output: ClaudeNativeToolOutput): unknown | undefined {
  switch (output.type) {
    case "none":
      return undefined;
    case "content_block":
      return output.value;
    case "structured_tool_use_result":
      if (toolOutputImages(output.value).length === 0) {
        return mcpToolResultOutput({
          content: output.fallbackValue,
          structuredContent: output.value,
        });
      }
      return output.value;
    default:
      return assertNever(output);
  }
}

export function claudeNativeToolOutputText(output: ClaudeNativeToolOutput): string {
  const value = claudeNativeToolOutputValue(output);
  return typeof value === "string" ? value : value === undefined ? "" : jsonStringifyForTool(value);
}

export const decodeClaudeFileEditResult = Schema.decodeUnknownOption(
  Schema.Struct({
    type: Schema.optional(Schema.String),
    filePath: Schema.String,
    content: Schema.optional(Schema.String),
    structuredPatch: Schema.mutable(
      Schema.Array(
        Schema.Struct({
          oldStart: Schema.Number,
          oldLines: Schema.Number,
          newStart: Schema.Number,
          newLines: Schema.Number,
          lines: Schema.mutable(Schema.Array(Schema.String)),
        }),
      ),
    ),
  }),
);

export function claudeFileChangeText(output: ClaudeNativeToolOutput): string {
  const result =
    output.type === "structured_tool_use_result"
      ? Option.getOrUndefined(decodeClaudeFileEditResult(output.value))
      : undefined;
  if (result === undefined) return claudeNativeToolOutputText(output);
  const patch =
    result.structuredPatch.length === 0 && result.type === "create" && result.content !== undefined
      ? structuredPatch("/dev/null", result.filePath, "", result.content)
      : {
          oldFileName: result.filePath,
          newFileName: result.filePath,
          oldHeader: undefined,
          newHeader: undefined,
          hunks: result.structuredPatch,
        };
  return patch.hunks.length === 0 ? "" : formatPatch(patch, FILE_HEADERS_ONLY);
}

export function claudeCommandOutputText(output: ClaudeNativeToolOutput): string {
  const value = claudeNativeToolOutputValue(output);
  if (typeof value === "object" && value !== null) {
    const stdout = Reflect.get(value, "stdout");
    const stderr = Reflect.get(value, "stderr");
    if (typeof stdout === "string" || typeof stderr === "string") {
      const out = typeof stdout === "string" && stdout.trim().length > 0 ? stdout : "";
      const err = typeof stderr === "string" && stderr.trim().length > 0 ? stderr : "";
      // Claude trims each stream's trailing newline, so stderr may need one to start its line.
      const text =
        out.length > 0 && err.length > 0 && !out.endsWith("\n") ? `${out}\n${err}` : out + err;
      if (text.length > 0) return text;
      return output.type === "structured_tool_use_result" && output.fallbackValue !== undefined
        ? claudeSubagentResultText({ type: "content_block", value: output.fallbackValue })
        : "";
    }
  }
  return claudeNativeToolOutputText(output);
}

// Claude Code wraps a foreground Agent result in notes for the parent model, not the report: the
// tools it used, a hand-back frame that indents each report line by two spaces, and a trailer.
export const CLAUDE_TOOLS_USED_NOTE =
  /^\s*<tools-used-before-summary>[^<]*<\/tools-used-before-summary>\s*/;
export const CLAUDE_HAND_BACK_FRAME =
  /^\[Subagent hand-back\] The text below is the final report of a subagent [^\n]* The report follows:\n/;
export const CLAUDE_USAGE_TRAILER = /(?:^|\n)<usage>[^<]*<\/usage>\s*$/;
export const CLAUDE_AGENT_ID_TRAILER =
  /(?:^|\n)agentId: ([\w-]+) \(use SendMessage with to: '\1'[^\n]*\)\s*$/;

export function claudeSubagentResultText(output: ClaudeNativeToolOutput): string {
  const unwrapped = claudeSubagentRawResultText(output)
    .replace(CLAUDE_TOOLS_USED_NOTE, "")
    .replace(CLAUDE_USAGE_TRAILER, "")
    .replace(CLAUDE_AGENT_ID_TRAILER, "");
  const report = unwrapped.replace(CLAUDE_HAND_BACK_FRAME, "");
  return report === unwrapped ? report : report.replace(/^ {2}/gm, "");
}

export function claudeSubagentRawResultText(output: ClaudeNativeToolOutput): string {
  const value = claudeNativeToolOutputValue(output);
  const content = Array.isArray(value)
    ? value
    : typeof value === "object" && value !== null && "content" in value
      ? value.content
      : undefined;
  if (Array.isArray(content)) {
    const text = content
      .flatMap((part) =>
        typeof part === "object" &&
        part !== null &&
        "type" in part &&
        part.type === "text" &&
        "text" in part &&
        typeof part.text === "string"
          ? [part.text]
          : [],
      )
      .join("\n");
    if (text.length > 0) {
      return text;
    }
  }
  return claudeNativeToolOutputText(output);
}

export function isClaudeSubagentAsyncLaunchAck(output: ClaudeNativeToolOutput): boolean {
  const value = claudeNativeToolOutputValue(output);
  if (typeof value === "object" && value !== null) {
    if ("isAsync" in value && value.isAsync === true) {
      return true;
    }
    if ("status" in value && value.status === "async_launched") {
      return true;
    }
  }
  // A framed foreground report may itself start with this text; only the bare ACK counts.
  return claudeSubagentRawResultText(output)
    .replace(CLAUDE_TOOLS_USED_NOTE, "")
    .startsWith("Async agent launched successfully.");
}

// Background Agent launches ACK immediately and workflow launches return run handles; only task_notification settles those.
export function claudeToolResultSettlesSubagent(
  toolResult: ClaudeToolResultContentBlock,
  output: ClaudeNativeToolOutput,
): boolean {
  return (
    isClaudeToolResultError(toolResult) ||
    (parseClaudeWorkflowRunHandles(claudeNativeToolOutputValue(output)) === undefined &&
      !isClaudeSubagentAsyncLaunchAck(output))
  );
}

export function claudeSettledSubagentToolUseIds(
  messages: ReadonlyArray<SDKMessage>,
): ReadonlySet<string> {
  return new Set(
    messages.flatMap((entry) =>
      entry.type === "user" && entry.parent_tool_use_id == null
        ? claudeToolResultEntriesFromMessage(entry).flatMap(({ toolResult, output }) =>
            claudeToolResultSettlesSubagent(toolResult, output) ? [toolResult.tool_use_id] : [],
          )
        : [],
    ),
  );
}

export function claudeWakeBufferDetail(messages: ReadonlyArray<SDKMessage>): string | null {
  return (
    messages
      .flatMap((entry) =>
        entry.type === "system" &&
        entry.subtype === "task_notification" &&
        typeof entry.summary === "string" &&
        entry.summary.length > 0
          ? [entry.summary]
          : [],
      )
      .at(-1) ?? null
  );
}

export const WEB_FETCH_SNIPPET_MAX_CHARS = 8_000;

export function webSearchPatternsFromClaudeTool(input: {
  readonly toolInput: ClaudeNativeToolInput;
  readonly output: ClaudeNativeToolOutput;
}): ReadonlyArray<string> {
  const output = claudeNativeToolOutputValue(input.output);
  const pattern =
    firstStringInputField(input.toolInput, ["query", "url", "pattern"]) ??
    (isClaudeWebSearchOutput(output) ? output.query : undefined);
  return pattern === undefined || pattern.trim().length === 0 ? [] : [pattern];
}

export function webSearchResultsFromClaudeOutput(
  output: ClaudeNativeToolOutput,
): ReadonlyArray<OrchestrationV2WebSearchResult> {
  const value = claudeNativeToolOutputValue(output);
  if (!isClaudeWebSearchOutput(value)) {
    return [];
  }

  return value.results.flatMap((result) => {
    if (typeof result === "string") {
      return [];
    }
    return result.content.map((content) => ({
      title: content.title,
      url: content.url,
    }));
  });
}

// A code-unit slice can split a surrogate pair; drop the lone high half it leaves.
export function withoutTrailingHighSurrogate(text: string): string {
  const last = text.charCodeAt(text.length - 1);
  return last >= 0xd800 && last <= 0xdbff ? text.slice(0, -1) : text;
}

export function summarizeClaudeToolRequest(toolName: string, input: ClaudeNativeToolInput): string {
  const command = firstStringInputField(input, ["command", "cmd", "script"]);
  if (command !== undefined) {
    return `${toolName}: ${withoutTrailingHighSurrogate(command.slice(0, 400))}`;
  }
  const path = firstStringInputField(input, ["file_path", "path", "filename", "fileName"]);
  if (path !== undefined) {
    return `${toolName}: ${withoutTrailingHighSurrogate(path.slice(0, 400))}`;
  }
  const serialized = jsonStringifyForTool(claudeNativeToolInputValue(input));
  return serialized.length <= 400
    ? `${toolName}: ${serialized}`
    : `${toolName}: ${withoutTrailingHighSurrogate(serialized.slice(0, 397))}...`;
}

export function outputFromClaudeToolResult(
  toolResult: ClaudeToolResultContentBlock,
): ClaudeToolResultOutput | undefined {
  switch (toolResult.type) {
    case "tool_result":
      return toolResult.content;
    case "mcp_tool_result":
      return toolResult.content;
    case "bash_code_execution_tool_result":
    case "code_execution_tool_result":
    case "advisor_tool_result":
    case "text_editor_code_execution_tool_result":
    case "tool_search_tool_result":
    case "web_fetch_tool_result":
    case "web_search_tool_result":
      return toolResult.content;
    default:
      return assertNever(toolResult);
  }
}

export function isClaudeTypedToolResultErrorContent(
  content: ClaudeTypedToolResultContent,
): boolean {
  if (Array.isArray(content)) {
    return false;
  }

  switch (content.type) {
    case "advisor_tool_result_error":
    case "bash_code_execution_tool_result_error":
    case "code_execution_tool_result_error":
    case "text_editor_code_execution_tool_result_error":
    case "tool_search_tool_result_error":
    case "web_fetch_tool_result_error":
    case "web_search_tool_result_error":
      return true;
    default:
      return false;
  }
}

export function isClaudeToolResultError(toolResult: ClaudeToolResultContentBlock): boolean {
  switch (toolResult.type) {
    case "tool_result":
      return toolResult.is_error === true;
    case "mcp_tool_result":
      return toolResult.is_error;
    case "bash_code_execution_tool_result":
    case "code_execution_tool_result":
    case "advisor_tool_result":
    case "text_editor_code_execution_tool_result":
    case "tool_search_tool_result":
    case "web_fetch_tool_result":
    case "web_search_tool_result":
      return isClaudeTypedToolResultErrorContent(toolResult.content);
    default:
      return assertNever(toolResult);
  }
}

export function toolNameFromClaudeToolResult(toolResult: ClaudeToolResultContentBlock): string {
  switch (toolResult.type) {
    case "bash_code_execution_tool_result":
      return "bash_code_execution";
    case "code_execution_tool_result":
      return "code_execution";
    case "advisor_tool_result":
      return "advisor";
    case "mcp_tool_result":
      return "mcp_tool";
    case "text_editor_code_execution_tool_result":
      return "text_editor_code_execution";
    case "tool_result":
      return "tool";
    case "tool_search_tool_result":
      return "tool_search";
    case "web_fetch_tool_result":
      return "web_fetch";
    case "web_search_tool_result":
      return "web_search";
    default:
      return assertNever(toolResult);
  }
}

export function isClaudeAssistantToolResultContentBlock(
  part: ClaudeAssistantContentBlock,
): part is ClaudeAssistantToolResultContentBlock {
  return "tool_use_id" in part && typeof part.tool_use_id === "string";
}

export function isClaudeUserToolResultContentBlock(
  part: ClaudeUserContentBlock,
): part is ClaudeUserToolResultContentBlock {
  return "tool_use_id" in part && typeof part.tool_use_id === "string";
}

export function isClaudeToolUseContentBlock(
  part: ClaudeAssistantContentBlock,
): part is ClaudeToolUseContentBlock {
  return (
    "id" in part &&
    typeof part.id === "string" &&
    "name" in part &&
    typeof part.name === "string" &&
    "input" in part
  );
}

export function claudeToolUseBlocksFromAssistantMessage(
  message: SDKMessage,
): ReadonlyArray<ClaudeToolUseContentBlock> {
  if (message.type !== "assistant") {
    return [];
  }
  return message.message.content.filter(isClaudeToolUseContentBlock);
}

export type ClaudeToolPresentation = ReturnType<typeof mcpToolPresentation>;

export function claudeToolPresentationsFromAssistantMessage(
  message: SDKMessage,
): ReadonlyMap<string, ClaudeToolPresentation> {
  const presentations = new Map<string, ClaudeToolPresentation>();
  const meta = message.type === "assistant" ? Reflect.get(message, "tool_use_meta") : undefined;
  if (!Array.isArray(meta)) return presentations;
  const toolNames = new Map(
    claudeToolUseBlocksFromAssistantMessage(message).map((tool) => [
      tool.id,
      tool.name.replace(/^mcp__claude_ai_/u, "mcp__"),
    ]),
  );
  for (const entry of meta) {
    if (typeof entry !== "object" || entry === null) continue;
    const id = normalizeMcpText(Reflect.get(entry, "id"), 512);
    if (id === undefined) continue;
    presentations.set(
      id,
      mcpToolPresentation({
        toolName: toolNames.get(id),
        title: Reflect.get(entry, "display_name"),
        serverDisplayName: Reflect.get(entry, "server_display_name"),
        iconUrl: Reflect.get(entry, "icon_url"),
      }),
    );
  }
  return presentations;
}

export function claudeToolResultBlocksFromAssistantMessage(
  message: SDKMessage,
): ReadonlyArray<ClaudeToolResultContentBlock> {
  if (message.type !== "assistant") {
    return [];
  }
  return message.message.content.filter(isClaudeAssistantToolResultContentBlock);
}

export function claudeToolResultBlocksFromUserMessage(
  message: SDKMessage,
): ReadonlyArray<ClaudeToolResultContentBlock> {
  if (message.type !== "user" || typeof message.message.content === "string") {
    return [];
  }
  return message.message.content.filter(isClaudeUserToolResultContentBlock);
}

export function claudeToolResultEntriesFromMessage(message: SDKMessage): ReadonlyArray<{
  readonly toolResult: ClaudeToolResultContentBlock;
  readonly output: ClaudeNativeToolOutput;
}> {
  const assistantResults = claudeToolResultBlocksFromAssistantMessage(message).map(
    (toolResult) => ({ toolResult, output: claudeNativeToolOutputFromToolResult(toolResult) }),
  );
  const userResults = claudeToolResultBlocksFromUserMessage(message);
  const structuredOutput =
    message.type === "user" && userResults.length === 1 ? message.tool_use_result : undefined;
  return [
    ...assistantResults,
    ...userResults.map((toolResult) => ({
      toolResult,
      output:
        structuredOutput === undefined
          ? claudeNativeToolOutputFromToolResult(toolResult)
          : claudeNativeToolOutputFromStructuredResult({
              structuredOutput,
              fallbackValue: outputFromClaudeToolResult(toolResult),
            }),
    })),
  ];
}

export const ClaudeToolResultMetadata = Schema.Struct({
  tool_result_meta: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      non_execution_kind: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  ),
});
export const isClaudeToolResultMetadata = Schema.is(ClaudeToolResultMetadata);

export function claudeToolNonExecutionKind(message: SDKMessage, toolUseId: string) {
  return isClaudeToolResultMetadata(message)
    ? (message.tool_result_meta.find((meta) => meta.id === toolUseId)?.non_execution_kind ??
        undefined)
    : undefined;
}

export function parentToolUseIdFromSdkMessage(message: SDKMessage): string | null {
  return message.type === "assistant" || message.type === "user"
    ? message.parent_tool_use_id
    : null;
}

export const CLAUDE_NO_STANDING_GRANT_OPTIONS = [
  { decision: "decline", label: "Decline" },
  { decision: "accept", label: "Approve" },
] satisfies ReadonlyArray<ProviderApprovalOption>;

export function claudeApprovalPresentation(input: {
  readonly permissionMode: PermissionMode;
  readonly prompt: string;
  readonly callbackOptions: Pick<
    Parameters<CanUseTool>[2],
    "decisionReason" | "matchedAskRule" | "suppressAlwaysAllowRule"
  >;
}): {
  readonly reason?: string;
  readonly fullAccessOverride?: ProviderApprovalFullAccessOverride;
  readonly options?: ReadonlyArray<ProviderApprovalOption>;
} {
  // The reason can carry terminal escapes from the CLI's own prompt renderer.
  const reason = NodeUtil.stripVTControlCharacters(
    input.callbackOptions.decisionReason ?? "",
  ).trim();
  // Bypass auto-allows everything it can, so any ask that still reaches the
  // callback is one bypass refused. The SDK drops the CLI's decision_reason_type,
  // leaving the matched ask rule as the only way to tell the two causes apart.
  const fullAccessOverride: ProviderApprovalFullAccessOverride | undefined =
    input.permissionMode !== "bypassPermissions"
      ? undefined
      : input.callbackOptions.matchedAskRule === undefined
        ? "provider_check"
        : "ask_rule";
  return {
    ...(reason === "" || reason === input.prompt ? {} : { reason }),
    ...(fullAccessOverride === undefined ? {} : { fullAccessOverride }),
    ...(input.callbackOptions.suppressAlwaysAllowRule === true
      ? { options: CLAUDE_NO_STANDING_GRANT_OPTIONS }
      : {}),
  };
}

export function permissionResultFromDecision(input: {
  readonly toolName: string;
  readonly decision: ProviderApprovalDecision;
  readonly toolInput: Record<string, unknown>;
  readonly toolUseID: string;
  readonly suggestions?: Parameters<CanUseTool>[2]["suggestions"];
  readonly feedback?: string;
  /** Under an administrator's ceiling, T3 Code's mode is the only one; Claude cannot switch it. */
  readonly managedCeiling?: boolean;
}): PermissionResult {
  if (input.decision === "accept" || input.decision === "acceptForSession") {
    return {
      behavior: "allow",
      updatedInput: input.toolInput,
      toolUseID: input.toolUseID,
      decisionClassification:
        input.decision === "acceptForSession" ? "user_permanent" : "user_temporary",
      ...(input.decision === "acceptForSession"
        ? {
            updatedPermissions: toSessionPermissionUpdates(
              input.toolName,
              input.managedCeiling === true
                ? input.suggestions?.filter((suggestion) => suggestion.type !== "setMode")
                : input.suggestions,
            ),
          }
        : {}),
    };
  }

  const feedback = input.feedback?.trim();
  return {
    behavior: "deny",
    message: feedback
      ? `The user declined this tool call and said:\n${feedback}`
      : input.decision === "cancel"
        ? "User cancelled tool execution."
        : "User declined tool execution.",
    toolUseID: input.toolUseID,
    decisionClassification: "user_reject",
    ...(input.decision === "cancel" ? { interrupt: true } : {}),
  };
}

export function toSessionPermissionUpdates(
  toolName: string,
  suggestions: ReadonlyArray<PermissionUpdate> | undefined,
): Array<PermissionUpdate> {
  const updates = (suggestions ?? []).map((suggestion): PermissionUpdate => ({
    ...suggestion,
    destination: "session",
  }));
  if (updates.length > 0) {
    return updates;
  }
  return [
    {
      type: "addRules",
      rules: [{ toolName }],
      behavior: "allow",
      destination: "session",
    },
  ];
}

export const awaitClaudeApprovalDecision = Effect.fn("awaitClaudeApprovalDecision")(function* (
  decision: Deferred.Deferred<ClaudeApprovalResponse>,
  signal: AbortSignal,
) {
  const cancellation = Effect.callback<ClaudeApprovalResponse>((resume) => {
    const abort = () => resume(Effect.succeed({ decision: "cancel" }));
    signal.addEventListener("abort", abort, { once: true });
    if (signal.aborted) {
      abort();
    }
    return Effect.sync(() => signal.removeEventListener("abort", abort));
  });
  return yield* Effect.raceFirst(Deferred.await(decision), cancellation);
});

// MCP servers such as Computer Use ask on every call and expect the client to
// remember a session grant, as Codex does. The CLI drops a reply's `_meta.persist`.
export const CLAUDE_MCP_ELICITATION_OPTIONS: ReadonlyArray<ProviderApprovalOption> = [
  { decision: "cancel", label: "Cancel" },
  { decision: "decline", label: "Decline" },
  { decision: "acceptForSession", label: "Always allow this session" },
  { decision: "accept", label: "Approve" },
];

export type ClaudeMcpElicitationContent = NonNullable<ElicitationResult["content"]>;

export const isClaudeMcpElicitationValue = (
  value: unknown,
): value is ClaudeMcpElicitationContent[string] =>
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean" ||
  (Array.isArray(value) && value.every((item) => typeof item === "string"));

export const withoutSchemaDefaults = (schema: Record<string, unknown>): Record<string, unknown> => {
  const properties = schema.properties;
  if (typeof properties !== "object" || properties === null || Array.isArray(properties)) {
    return schema;
  }
  return {
    ...schema,
    properties: Object.fromEntries(
      Object.entries(properties).map(([key, field]) => [
        key,
        typeof field === "object" && field !== null
          ? Object.fromEntries(Object.entries(field).filter(([name]) => name !== "default"))
          : field,
      ]),
    ),
  };
};

// The card collects consent only; schema defaults must never grant unseen permissions.
export function claudeMcpElicitationAcceptance(
  request: ElicitationRequest,
): ElicitationResult | undefined {
  if (request.mode === "url" || request.requestedSchema === undefined) return undefined;
  const response = toMcpElicitationResponse(
    { mode: "form", requestedSchema: withoutSchemaDefaults(request.requestedSchema) },
    "accept",
  );
  // The helper leaves content out when the schema is not a form it can read.
  const filled = response.content;
  if (
    response.action !== "accept" ||
    typeof filled !== "object" ||
    filled === null ||
    Array.isArray(filled)
  ) {
    return undefined;
  }
  const content: ClaudeMcpElicitationContent = {};
  for (const [key, value] of Object.entries(filled)) {
    if (!isClaudeMcpElicitationValue(value)) return undefined;
    content[key] = value;
  }
  return { action: "accept", content };
}

export const awaitClaudeUserInputAnswers = Effect.fn("awaitClaudeUserInputAnswers")(function* (
  answers: Deferred.Deferred<ProviderUserInputAnswers>,
  signal: AbortSignal,
) {
  const cancellation = Effect.callback<ProviderUserInputAnswers>((resume) => {
    const abort = () => resume(Effect.succeed({}));
    signal.addEventListener("abort", abort, { once: true });
    if (signal.aborted) abort();
    return Effect.sync(() => signal.removeEventListener("abort", abort));
  });
  return yield* Effect.raceFirst(Deferred.await(answers), cancellation);
});

/** Exclude CLI-internal "[ede_diagnostic] ..." telemetry from error banners. */
export function resultUserFacingError(result: SDKResultMessage): string | undefined {
  const errors = "errors" in result && Array.isArray(result.errors) ? result.errors : [];
  if (result.subtype === "success" && !result.is_error) {
    return undefined;
  }
  return errors.find(
    (error): error is string => typeof error === "string" && !error.startsWith("[ede_diagnostic]"),
  );
}

export const CONTEXT_WINDOW_FULL_ERROR =
  "Claude stopped: the prompt exceeds the model's context window. Run /compact or start a new thread.";

export function terminalResultError(
  reason: SDKResultMessage["terminal_reason"],
  failureHint?: string,
): string | undefined {
  switch (reason) {
    case "api_error":
      return failureHint ?? "Claude gave up after repeated API errors.";
    case "malformed_tool_use_exhausted":
      return "Claude gave up after repeated malformed tool calls.";
    case "budget_exhausted":
      return "Claude stopped: the turn's token budget was exhausted.";
    case "structured_output_retry_exhausted":
      return "Claude could not produce the requested structured output.";
    case "tool_deferred_unavailable":
      return "Claude could not resume a deferred tool call: the tool is no longer available.";
    case "turn_setup_failed":
      return "Claude could not start the turn.";
    case "blocking_limit":
      // blocking_limit also means context exhaustion; only rate-limit evidence sets the hint.
      return failureHint ?? CONTEXT_WINDOW_FULL_ERROR;
    case "rapid_refill_breaker":
      return "Claude stopped: the context refilled too quickly after compaction.";
    case "prompt_too_long":
      return CONTEXT_WINDOW_FULL_ERROR;
    case "image_error":
      return "Claude stopped: an image in the conversation could not be processed.";
    case "model_error":
      return "Claude stopped: the model returned an error.";
    default:
      return undefined;
  }
}

export function isOverloadedResult(result: SDKResultMessage): boolean {
  return result.subtype === "success" && result.api_error_status === 529;
}

export function terminalStatusFromResult(
  message: SDKResultMessage,
  failureHint?: string,
): Extract<
  OrchestrationV2ProviderTurn["status"],
  "completed" | "interrupted" | "failed" | "cancelled"
> {
  // Explicit abort reasons override success envelopes with is_error=false.
  if (
    message.terminal_reason === "aborted_tools" ||
    message.terminal_reason === "aborted_streaming"
  ) {
    return "interrupted";
  }
  if (message.subtype === "success") {
    // The SDK can report API failures as subtype "success" with is_error set.
    return isOverloadedResult(message) ||
      message.api_error_status === 429 ||
      terminalResultError(message.terminal_reason, failureHint) !== undefined ||
      (message.is_error && failureHint !== undefined)
      ? "failed"
      : "completed";
  }
  const errorText = message.errors.join("\n").toLowerCase();
  if (errorText.includes("interrupt")) {
    return "interrupted";
  }
  if (errorText.includes("cancel")) {
    return "cancelled";
  }
  return "failed";
}

export function isClaudeActiveSteeringAbortResult(message: SDKResultMessage): boolean {
  return (
    message.terminal_reason === "aborted_streaming" || message.terminal_reason === "aborted_tools"
  );
}

export function isClaudeProviderContinuationTurn(
  input: ProviderAdapter.ProviderAdapterV2TurnInput,
): boolean {
  return input.message.createdBy === "agent" && input.message.creationSource === "provider";
}

export function isClaudePromptEchoGatedFrame(message: SDKMessage): boolean {
  switch (message.type) {
    case "assistant":
    case "stream_event":
    case "user":
      return message.parent_tool_use_id === null;
    case "result":
      return true;
    default:
      return false;
  }
}

export function claudeFrameToolUseIds(message: SDKMessage): ReadonlyArray<string> {
  const ids: Array<string> = [];
  const parent = Reflect.get(message, "parent_tool_use_id");
  if (typeof parent === "string") {
    ids.push(parent);
  }
  if (message.type === "system") {
    const toolUseId = Reflect.get(message, "tool_use_id");
    if (typeof toolUseId === "string") {
      ids.push(toolUseId);
    }
  }
  return ids;
}

export function claudeEchoedPromptUuids(message: SDKMessage): ReadonlyArray<string> {
  const uuids = Reflect.get(message, "user_message_uuids");
  if (Array.isArray(uuids)) {
    return uuids.filter((uuid): uuid is string => typeof uuid === "string");
  }
  const uuid = Reflect.get(message, "user_message_uuid");
  return typeof uuid === "string" ? [uuid] : [];
}

export function claudePromptLifecycle(
  message: SDKMessage,
): { readonly uuid: string; readonly state: string } | null {
  const type: unknown = Reflect.get(message, "type");
  if (type !== "command_lifecycle") return null;
  const uuid: unknown = Reflect.get(message, "command_uuid");
  const state: unknown = Reflect.get(message, "state");
  return typeof uuid === "string" && typeof state === "string" ? { uuid, state } : null;
}

// Without an echo, non-human origin proves a foreign turn only on CLIs known to echo prompts.
export function isClaudeResultForOtherTurn(input: {
  readonly message: SDKResultMessage;
  readonly promptUuid: string;
  readonly steerUuids: ReadonlySet<string>;
  readonly promptEchoMode: ClaudeLiveQueryContext["promptEchoMode"];
}): boolean {
  const echoed = claudeEchoedPromptUuids(input.message);
  if (echoed.length > 0) {
    return !echoed.some((uuid) => uuid === input.promptUuid || input.steerUuids.has(uuid));
  }
  return (
    input.promptEchoMode !== "unknown" &&
    input.message.origin !== undefined &&
    input.message.origin.kind !== "human"
  );
}

export function isClaudeTaskNotificationOriginResult(
  message: SDKMessage,
): message is SDKResultMessage & {
  readonly origin: Extract<
    NonNullable<SDKResultMessage["origin"]>,
    { readonly kind: "task-notification" }
  >;
} {
  return message.type === "result" && message.origin?.kind === "task-notification";
}

// A session-task lifecycle result: it can precede a wake's real turn and ends no turn.
export function isClaudeEmptyTaskNotificationSuccess(message: SDKMessage): boolean {
  return (
    isClaudeTaskNotificationOriginResult(message) &&
    message.subtype === "success" &&
    !message.is_error &&
    message.num_turns === 0 &&
    message.result.length === 0 &&
    terminalStatusFromResult(message) === "completed"
  );
}

// The CLI throttles unchanged rate_limit_event frames, but repeats this
// undeclared payload on each blocked assistant response.
export const isClaudeBlockedAssistantRateLimit = Schema.is(
  Schema.Struct({
    api_error_params: Schema.Struct({
      rate_limit_info: Schema.Struct({
        status: Schema.Literal("rejected"),
        rateLimitType: Schema.optionalKey(Schema.Unknown),
        resetsAt: Schema.optionalKey(Schema.Unknown),
        overageStatus: Schema.optionalKey(Schema.String),
        isUsingOverage: Schema.optionalKey(Schema.Boolean),
        overageInUse: Schema.optionalKey(Schema.Boolean),
      }),
    }),
  }),
);

export function claudeUsageLimitResetAt(resetsAt: unknown): string | null {
  const resetMs = typeof resetsAt === "number" ? resetsAt * 1000 : NaN;
  return Number.isFinite(resetMs) && resetMs > 0 && resetMs < 8.64e15
    ? DateTime.formatIso(DateTime.makeUnsafe(resetMs))
    : null;
}

export function gatewayCooldownResetAt(
  cooldown: RegExpExecArray | null,
  completedAt: DateTime.Utc,
): string | undefined {
  if (cooldown === null) return undefined;
  const seconds =
    Number(cooldown[1] ?? 0) * 3_600 + Number(cooldown[2] ?? 0) * 60 + Number(cooldown[3] ?? 0);
  const resetMs = DateTime.toEpochMillis(completedAt) + seconds * 1_000;
  return seconds > 0 && resetMs < 8.64e15
    ? DateTime.formatIso(DateTime.makeUnsafe(resetMs))
    : undefined;
}

export const CLAUDE_UNSUPPORTED_VERSION_ERROR =
  /^API Error: 400 Claude Code (\d+\.\d+\.\d+) does not support this model; version (\d+\.\d+\.\d+) or newer is required\./;

/** The version a gateway sent in place of the session's own, when the session itself meets the requirement. */
export function claudeRewrittenVersion(
  message: SDKResultMessage,
  sessionVersion: string | undefined,
): string | undefined {
  if (message.subtype !== "success" || message.terminal_reason !== "api_error") return undefined;
  const [, reported, required] = CLAUDE_UNSUPPORTED_VERSION_ERROR.exec(message.result.trim()) ?? [];
  if (reported === undefined || required === undefined || sessionVersion === undefined) {
    return undefined;
  }
  return compareSemverVersions(reported, sessionVersion) < 0 &&
    compareSemverVersions(sessionVersion, required) >= 0
    ? reported
    : undefined;
}

export function providerFailureFromResult(
  message: SDKResultMessage,
  receivedAt: DateTime.Utc,
  failureHint?: string,
  usageLimited = false,
): OrchestrationV2ProviderFailure | null {
  const gatewayResetAt =
    failureHint === undefined &&
    message.subtype === "success" &&
    message.is_error &&
    message.terminal_reason === "api_error" &&
    message.api_error_status === 503
      ? gatewayCooldownResetAt(
          /^API Error: 503 \[[^\]\r\n]+\] \[429\]: \{"type":"error","error":\{"type":"rate_limit_error",[^\r\n]*\} \(reset after (?:(\d+)h ?)?(?:(\d+)m ?)?(?:(\d+)s)?\)/.exec(
            message.result,
          ),
          receivedAt,
        )
      : undefined;
  if (gatewayResetAt !== undefined) {
    return makeProviderFailure({
      class: "usage_limit",
      message: "Claude API rate limit reached. Try again later.",
      code: "api_error_429",
      retryable: true,
      resetAt: gatewayResetAt,
    });
  }
  const failureClass =
    (message.subtype === "success" && message.api_error_status === 429) || usageLimited
      ? "usage_limit"
      : "provider_error";
  const listedError = resultUserFacingError(message);
  const apiErrorMessage =
    message.subtype === "success" &&
    message.terminal_reason === "api_error" &&
    message.result.trim().startsWith("API Error:")
      ? withoutTrailingHighSurrogate(
          makeProviderFailure({ message: message.result }).message.slice(0, 500),
        )
      : undefined;
  const structuredError = isOverloadedResult(message)
    ? "Claude API is overloaded (529). Try again shortly."
    : message.subtype === "success" && message.api_error_status === 429
      ? "Claude API rate limit reached. Try again later."
      : terminalResultError(message.terminal_reason, failureHint ?? apiErrorMessage);
  if (message.subtype !== "success") {
    return makeProviderFailure({
      message: listedError ?? structuredError ?? message.errors.join("\n"),
      code: message.subtype,
      class: failureClass,
    });
  }
  if (!message.is_error && structuredError === undefined) {
    return null;
  }
  const apiErrorStatus = message.api_error_status ?? null;
  // API-key sessions get no rate_limit_info, so a gateway's 429 carries its reset only as text.
  const resetAt =
    apiErrorStatus === 429 && message.result.startsWith("API Error:")
      ? gatewayCooldownResetAt(
          // CLIProxyAPI nests upstream errors in its message; only its own cooldown counts.
          message.result.startsWith(
            "API Error: Request rejected (429) · All credentials for model ",
          )
            ? (/^API Error: Request rejected \(429\) · All credentials for model [^\s()]+ are cooling down \(reset after (?:(\d+)h ?)?(?:(\d+)m ?)?(?:(\d+)s)?\)/.exec(
                message.result,
              ) ??
                /^API Error: Request rejected \(429\) · All credentials for model [^\s()]+ are cooling down \(last error: [\s\S]*\) \(reset after (?:(\d+)h ?)?(?:(\d+)m ?)?(?:(\d+)s)?\)$/.exec(
                  message.result,
                ))
            : /\(reset after (?:(\d+)h ?)?(?:(\d+)m ?)?(?:(\d+)s)?\)/.exec(message.result),
          receivedAt,
        )
      : undefined;
  return makeProviderFailure({
    message: listedError ?? structuredError ?? failureHint ?? message.result,
    code:
      apiErrorStatus === null
        ? (message.terminal_reason ?? "sdk_result_error")
        : `api_error_${apiErrorStatus}`,
    class: failureClass,
    retryable: apiErrorStatus === 429 || apiErrorStatus === 529 ? true : null,
    resetAt: resetAt ?? null,
  });
}

export function providerFailureFromApiRetry(
  message: SDKAPIRetryMessage,
): OrchestrationV2ProviderFailure {
  const errorName = message.error.replaceAll("_", " ");
  return makeProviderFailure({
    message: `Claude API ${errorName}.`,
    code:
      message.error_status === null
        ? message.error
        : `api_error_${Math.trunc(message.error_status)}`,
    class:
      message.error_status === 429
        ? "usage_limit"
        : message.error_status === null
          ? "transport_error"
          : "provider_error",
    retryable: true,
  });
}

export function buildAssistantArtifacts(input: {
  readonly idAllocator: IdAllocator.IdAllocatorV2["Service"];
  readonly turnInput: ProviderAdapter.ProviderAdapterV2TurnInput;
  readonly providerTurnId: OrchestrationV2ProviderTurn["id"];
  readonly nativeItemId: string;
  readonly text: string;
  readonly ordinal: number;
  readonly status?: "running" | "completed" | "interrupted";
  readonly startedAt: DateTime.Utc;
  readonly completedAt: DateTime.Utc;
  // A streamed message keeps its first timestamp across updates.
  readonly createdAt?: DateTime.Utc;
  readonly finalAnswer?: boolean;
}): {
  readonly node: OrchestrationV2ExecutionNode;
  readonly message: OrchestrationV2ConversationMessage;
  readonly turnItem: OrchestrationV2TurnItem;
} {
  const nodeId = input.idAllocator.derive.nodeFromProviderItem({
    driver: CLAUDE_PROVIDER,
    nativeItemId: input.nativeItemId,
  });
  const messageId = input.idAllocator.derive.messageFromProviderItem({
    driver: CLAUDE_PROVIDER,
    nativeItemId: input.nativeItemId,
  });
  const turnItemId = input.idAllocator.derive.turnItemFromProviderItem({
    driver: CLAUDE_PROVIDER,
    nativeItemId: input.nativeItemId,
  });
  const nativeItemRef = {
    driver: CLAUDE_PROVIDER,
    nativeId: input.nativeItemId,
    strength: "strong" as const,
  };
  const status = input.status ?? "completed";
  const streaming = status === "running";
  const completedAt = streaming ? null : input.completedAt;

  return {
    node: {
      id: nodeId,
      threadId: input.turnInput.threadId,
      runId: input.turnInput.runId,
      parentNodeId: input.turnInput.rootNodeId,
      rootNodeId: input.turnInput.rootNodeId,
      kind: "assistant_message",
      status,
      countsForRun: false,
      providerThreadId: input.turnInput.providerThread.id,
      providerTurnId: input.providerTurnId,
      nativeItemRef,
      runtimeRequestId: null,
      checkpointScopeId: null,
      startedAt: input.startedAt,
      completedAt,
    },
    message: {
      createdBy: "agent",
      creationSource: "provider",
      id: messageId,
      threadId: input.turnInput.threadId,
      runId: input.turnInput.runId,
      nodeId,
      role: "assistant",
      text: input.text,
      attachments: [],
      streaming,
      createdAt: input.createdAt ?? input.completedAt,
      updatedAt: input.completedAt,
    },
    turnItem: {
      id: turnItemId,
      threadId: input.turnInput.threadId,
      runId: input.turnInput.runId,
      nodeId,
      providerThreadId: input.turnInput.providerThread.id,
      providerTurnId: input.providerTurnId,
      nativeItemRef,
      parentItemId: null,
      ordinal: input.ordinal,
      status,
      title: null,
      startedAt: input.startedAt,
      completedAt,
      updatedAt: input.completedAt,
      type: "assistant_message",
      ...(input.finalAnswer === true ? { phase: "final_answer" as const } : {}),
      messageId,
      text: input.text,
      streaming,
    },
  };
}

export const CLAUDE_USAGE_LIMIT_WINDOWS = {
  five_hour: "5-hour",
  seven_day: "7-day",
  seven_day_opus: "7-day Opus",
  seven_day_sonnet: "7-day Sonnet",
  seven_day_overage_included: "7-day model",
  overage: "overage",
} satisfies Record<NonNullable<SDKRateLimitInfo["rateLimitType"]>, string>;

export const CLAUDE_USAGE_LIMIT_MAX_WAIT_MS = 30 * 24 * 60 * 60 * 1000;

export function describeClaudeUsageLimit(
  info: SDKRateLimitInfo,
  nowMs: number,
  names: ClaudeScopedLimitNames,
): string {
  const label =
    info.rateLimitType === "seven_day_overage_included" && names.overageIncluded
      ? `7-day ${names.overageIncluded}`
      : info.rateLimitType
        ? CLAUDE_USAGE_LIMIT_WINDOWS[info.rateLimitType]
        : undefined;
  const resetsAtMs = info.resetsAt === undefined ? undefined : info.resetsAt * 1000;
  const waitMs =
    resetsAtMs === undefined || !Number.isFinite(nowMs) ? undefined : resetsAtMs - nowMs;
  const wait =
    waitMs !== undefined && waitMs > 0 && waitMs <= CLAUDE_USAGE_LIMIT_MAX_WAIT_MS
      ? formatClaudeUsageLimitWait(waitMs)
      : undefined;
  return `Claude usage limit reached. This turn is paused until the ${
    label ? `${label} ` : ""
  }limit resets${wait ? ` in ${wait}` : ""}.`;
}

export function formatClaudeUsageLimitWait(waitMs: number): string {
  const totalMinutes = Math.ceil(waitMs / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${totalMinutes}m`;
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}

export interface ActiveClaudeTurnContext {
  retryBudgetFailure?: OrchestrationV2ProviderFailure;
  // Set when the prompt starts or a request goes out; cleared by the turn's next frame.
  unansweredRequestSince?: DateTime.Utc | undefined;
  // Interrupted once the silence clears, so the session scope stops holding this context.
  unansweredRequestWatch?: Fiber.Fiber<unknown> | undefined;
  readonly queryPolicy: ClaudeRuntimeQueryPolicy;
  readonly input: ProviderAdapter.ProviderAdapterV2TurnInput;
  readonly autoCompactWindow: string;
  readonly nativeThreadId: string;
  readonly nativeTurnId: string;
  nativeMessageCursor: string | null;
  readonly providerTurnId: OrchestrationV2ProviderTurn["id"];
  readonly providerTurnOrdinal: number;
  readonly startedAt: DateTime.Utc;
  readonly itemOrdinals: Map<string, number>;
  readonly planIds: Map<string, OrchestrationV2PlanArtifact["id"]>;
  readonly assistant: {
    fallbackText: string;
    // Result-only replies of steered segments that ended before the current one.
    earlierFallbackText: string;
    fallbackNativeItemId: string;
    emittedNativeItemIds: Set<string>;
    // Text blocks stream as `${message.id}:text:${n}`; the block's snapshot has its own uuid.
    readonly streamBlocks: Map<number, string>;
    readonly nextBlockIndex: Map<string, number>;
    readonly snapshotBlockIndex: Map<string, number>;
    readonly streamItems: Map<
      string,
      {
        readonly startedAt: DateTime.Utc;
        status: "completed" | "interrupted";
        // Set when the block stops; the snapshot only corrects it.
        text: string | null;
      }
    >;
    // The root reply the latest assistant frame carried; a steer's aborted_streaming cuts it off.
    lastReply: {
      readonly nativeItemId: string;
      readonly text: string;
      readonly startedAt: DateTime.Utc;
    } | null;
    // The CLI repeats a notice that ends a prompt as the turn's result text.
    noticeTexts: Set<string>;
  };
  readonly reasoning: {
    messageId: string | null;
    readonly streamBlocks: Map<number, string>;
    readonly nextBlockIndex: Map<string, number>;
    readonly snapshotBlockIndex: Map<string, number>;
    readonly snapshots: Set<string>;
    lastThinking: {
      readonly messageId: string;
      readonly itemId: string;
      readonly text: string;
      readonly followsThinking: boolean;
    } | null;
    readonly blocks: Map<
      string,
      { readonly startedAt: DateTime.Utc; readonly ordinal: number; text: string }
    >;
  };
  // Snapshots repeat message_start input, sometimes as zeros, so only fill gaps in streamed usage.
  // Compaction clears usage without forgetting the root request.
  // `requestedAt` starts the request's prompt cache lifetime.
  streamUsage: {
    readonly messageId: string;
    requestedAt?: DateTime.Utc;
    usage: ClaudeMessageUsage | null;
  } | null;
  compactionTokens: number | undefined;
  readonly toolCalls: Map<string, ActiveClaudeToolCall>;
  // A successful status can precede the boundary that supplies its token counts.
  compaction: Extract<OrchestrationV2TurnItem, { type: "compaction" }> | null;
  readonly ignoredTaskIds: Set<string>;
  readonly announcedUsageLimits: Set<string>;
  authenticationFailureMessage: string | undefined;
  readonly rejectedRateLimitTypes: Set<string>;
  readonly rateLimitResetTimes: Map<string, string | null>;
  latestAssistantRateLimit: {
    readonly type: string | null;
    readonly resetAt: string | null;
  } | null;
  // Set while this turn's latest compaction status reports a failure, with
  // Claude's error text when it sent one.
  compactionFailure: { readonly message: string | undefined } | null;
  // The title a `session_title_changed` frame reported; a `/rename` result applies it to the thread.
  nativeSessionTitle: string | null;
  // Steers end segments whose usage is excluded from the final result; bill them too, oldest first.
  readonly steeredSegmentUsage: Array<SDKResultMessage["usage"]>;
  // Set as finalization starts: a steer admitted later would stay pending
  // forever, so it fails and the orchestrator follows up instead.
  steersClosed: boolean;
  // Ledger growth of the steered segments; undefined once any segment's growth is unknown.
  steeredLedgerUsage: ClaudeLedgerUsage | undefined;
  readonly rootModels: Set<string>;
  readonly subagentsByTaskId: Map<string, ActiveClaudeSubagent>;
  readonly subagentsByToolUseId: Map<string, ActiveClaudeSubagent>;
  readonly promptUuid: string | null;
  promptEcho: "pending" | "confirmed";
  // MCP app notes this turn's prompt carries, recorded as delivered only if the turn completes.
  appContextOffered?: ReadonlyMap<string, string> | undefined;
  promptStarted: boolean;
  nativeWakeStarted: boolean;
  gatedFramesBeforeEcho: number;
  readonly heldRootFrames: Array<SDKMessage>;
  // Steers Claude has not started or echoed yet, by prompt uuid. Claude holds
  // a steer behind a running foreground tool call without saying so, and Stop
  // drops it unread.
  readonly pendingSteers: Map<
    string,
    {
      readonly messageId: MessageId;
      readonly text: string;
      readonly liveQuery: ClaudeLiveQueryContext;
      readonly pdfReservation: Effect.Success<ReturnType<typeof reserveClaudePdfBudget>>;
      readonly appContextOffered: ReadonlyMap<string, string> | undefined;
      readonly appContextBefore: ReadonlyMap<string, string> | undefined;
    }
  >;
  // Claude may settle a turn with a result that echoes only a steer's uuid.
  readonly steerUuids: Set<string>;
  // A completed result whose turn stays open while Claude still holds a steer; it settles the
  // turn if Claude drops that steer instead of starting it.
  heldResult: SDKResultMessage | undefined;
  // Claude can run another model than requested, such as when an organization disallows it.
  executedModel: string | undefined;
}

export interface ActiveClaudeProviderRetry {
  readonly retry: OrchestrationV2ProviderRetry;
  readonly failure: OrchestrationV2ProviderFailure;
  readonly startedAt: DateTime.Utc;
  readonly itemOrdinal: number;
}

export interface ActiveClaudeSubagent {
  task: OrchestrationV2Subagent;
  readonly nativeTaskType: string | undefined;
  readonly confirmedOutcome: ProviderAdapter.ProviderAdapterV2SubagentOutcome | undefined;
  readonly rootNodeId: OrchestrationV2ExecutionNode["id"];
  readonly childThreadId: ThreadId;
  childThread: OrchestrationV2AppThread | null;
  readonly childRootNodeId: OrchestrationV2ExecutionNode["id"];
  readonly turnItemId: OrchestrationV2TurnItem["id"];
  readonly turnItemOrdinal: number;
  // Clients group cards by launching turn; later updates can arrive during another turn.
  readonly providerTurnId: OrchestrationV2ProviderTurn["id"];
  readonly runToolUseId: string | null;
  readonly effort: string | undefined;
  nextChildItemOrdinal: number;
  // Keyed on Claude's per-run id so a resumed run's result never replaces an earlier one.
  resultNativeItemId: string;
  resultItemOrdinal: number | null;
  lastAssistantText: string | null;
  lastAssistantMessageId: string | null;
}

export interface ClaudeLiveQueryContext {
  readonly queryPolicy: ClaudeRuntimeQueryPolicy;
  readonly nativeThreadId: string;
  readonly settingsCwd: string | null;
  readonly launchArgSettings: ClaudeSdkSettings | undefined;
  readonly query: ClaudeAgentSdkQuerySession;
  readonly queryPolicyKey: string;
  selection: CompiledClaudeModelSelection;
  readonly program: string | undefined;
  readonly startedWithApiModelId: string;
  readonly closed: Deferred.Deferred<void, never>;
  lastTurn: ActiveClaudeTurnContext | null;
  // "early" echoes on the first frame; "acknowledged" confirms uuid acceptance, but resume turns can still precede the prompt.
  promptEchoMode: "unknown" | "acknowledged" | "early" | "result_only";
  // What the CLI was asked for; launch arguments can make it differ from the thread's mode.
  readonly requestedPermissionMode: PermissionMode;
  // The CLI may fall back from the requested mode on its first init frame.
  openedPermissionMode: PermissionMode;
  receivedInit: boolean;
  // Init listed a server still connecting or needing a sign-in; a result checks which it was.
  checkMcpSignIns: boolean;
  // From system/init; feature-detects control requests such as MCP Apps.
  capabilities: ReadonlySet<string>;
  claudeCodeVersion: string | undefined;
  permissionMode: PermissionMode;
  stopping: boolean;
  // A turn that had not attached when the CLI exited fails its start with this cause.
  exitCause: Cause.Cause<ClaudeAgentSdkQueryRunnerError> | undefined;
  readonly subagentsFromEarlierProcesses: ReadonlySet<ActiveClaudeSubagent>;
  // Subagents this process still ran when a replacement took over; only its exit can end them.
  handedOffSubagents: ReadonlySet<ActiveClaudeSubagent>;
  // The SDK's per-process model ledger at the last result; a new process starts at zero.
  modelLedger: ClaudeModelLedger | undefined;
  // Per process, not per session: a relative temp dir follows the cwd this CLI
  // was launched in, and a later turn's cwd can differ.
  readonly taskOutputRoot: string | undefined;
  // Root messages this process streamed; what it holds beyond the history it resumed.
  readonly emittedMessageUuids: Set<string>;
  transcriptPath: string | undefined;
}

export interface ActiveClaudeToolCall {
  readonly nativeItemId: string;
  readonly toolName: string;
  readonly classification: ClaudeToolClassification;
  readonly input: ClaudeNativeToolInput;
  readonly threadId: ThreadId;
  readonly runId: ProviderAdapter.ProviderAdapterV2TurnInput["runId"] | null;
  readonly rootNodeId: OrchestrationV2ExecutionNode["id"];
  readonly parentNodeId: OrchestrationV2ExecutionNode["id"];
  readonly ordinal: number;
  readonly startedAt: DateTime.Utc;
  readonly presentation?: ClaudeToolPresentation;
}

export interface ClaudeSubagentProjectionTarget {
  readonly childThreadId: ThreadId;
  readonly childRootNodeId: OrchestrationV2ExecutionNode["id"];
  readonly nextOrdinal: () => number;
  readonly toolCalls: Map<string, ActiveClaudeToolCall>;
  readonly stopRequestedAt?: number | undefined;
}

/** Claude writes blocks separately with stop_reason null until the last.
 * Missing stop_reason keeps the turn open; pre-tool text is not the reply. */
export function isClaudeTranscriptTurnEnd(entry: unknown): boolean {
  if (field(entry, "type") !== "assistant") return false;
  const stopReason = field(field(entry, "message"), "stop_reason");
  return typeof stopReason === "string" && stopReason !== "tool_use";
}

export function isClaudeTranscriptConversationLine(
  entry: unknown,
): entry is SDKAssistantMessage | SDKUserMessage {
  const type = field(entry, "type");
  const content = field(field(entry, "message"), "content");
  return (
    typeof field(entry, "uuid") === "string" &&
    ((type === "assistant" && Array.isArray(content)) ||
      (type === "user" && (Array.isArray(content) || typeof content === "string")))
  );
}

export interface PendingClaudeSubagentLaunch {
  readonly model?: string;
  readonly effort?: string;
  readonly ownerToolUseId?: string;
}

export function canonicalClaudeSubagentModel(catalog: ClaudeModelCatalog, model: string): string {
  return resolveClaudeModelSlug(catalog, model);
}

export function claudeSubagentModelSelection(
  catalog: ClaudeModelCatalog,
  instanceId: ModelSelection["instanceId"],
  model: string,
  effort: string | undefined,
): ModelSelection {
  const descriptor = getClaudeCatalogModelCapabilities(catalog, model).optionDescriptors?.find(
    (candidate) => candidate.id === "effort",
  );
  const offered =
    effort !== undefined &&
    descriptor?.type === "select" &&
    descriptor.options.some((option) => option.id === effort);
  return { instanceId, model, ...(offered ? { options: [{ id: "effort", value: effort }] } : {}) };
}

export const PENDING_CLAUDE_SUBAGENT_CAP = 64;
export const PENDING_CLAUDE_SUBAGENT_FRAME_CAP = 256;

export function rememberPendingClaudeSubagentLaunch(
  pending: Map<string, PendingClaudeSubagentLaunch>,
  toolUseId: string,
  launch: PendingClaudeSubagentLaunch,
): void {
  pending.set(toolUseId, { ...pending.get(toolUseId), ...launch });
  if (pending.size <= PENDING_CLAUDE_SUBAGENT_CAP) {
    return;
  }
  const oldest = pending.keys().next();
  if (!oldest.done) {
    pending.delete(oldest.value);
  }
}

export function rememberClaudeSubagentLaunch(
  catalog: ClaudeModelCatalog,
  context: ActiveClaudeTurnContext,
  pending: Map<string, PendingClaudeSubagentLaunch>,
  toolUseId: string,
  input: ClaudeNativeToolInput,
  ownerToolUseId: string | null,
): void {
  if (context.subagentsByToolUseId.has(toolUseId)) return;
  const requested = firstStringInputField(input, ["model"]);
  const model =
    requested !== "inherit"
      ? requested && canonicalClaudeSubagentModel(catalog, requested)
      : ownerToolUseId === null
        ? context.input.modelSelection.model
        : undefined;
  const effort = firstStringInputField(input, ["effort"]);
  const launch: PendingClaudeSubagentLaunch = {
    ...(model === undefined || pending.get(toolUseId)?.model !== undefined ? {} : { model }),
    ...(effort === undefined ? {} : { effort }),
    ...(ownerToolUseId === null ? {} : { ownerToolUseId }),
  };
  if (
    launch.model !== undefined ||
    launch.effort !== undefined ||
    launch.ownerToolUseId !== undefined
  ) {
    rememberPendingClaudeSubagentLaunch(pending, toolUseId, launch);
  }
}

export type ClaudeApprovalResponse = {
  readonly decision: ProviderApprovalDecision;
  readonly feedback?: string;
};

export type PendingClaudeRuntimeRequest =
  | {
      readonly type: "approval";
      readonly requestKind: ProviderRequestKind;
      readonly decision: Deferred.Deferred<ClaudeApprovalResponse, never>;
    }
  | {
      readonly type: "user_input";
      readonly answers: Deferred.Deferred<ProviderUserInputAnswers, never>;
    };

export function claudeUserInputQuestions(
  input: unknown,
): ReadonlyArray<OrchestrationV2UserInputQuestion> {
  const value =
    typeof input === "object" && input !== null && Reflect.get(input, "type") === "record"
      ? Reflect.get(input, "value")
      : input;
  const questions =
    typeof value === "object" && value !== null ? Reflect.get(value, "questions") : undefined;
  if (!Array.isArray(questions)) return [];
  return questions.flatMap((value: unknown, index: number) => {
    if (typeof value !== "object" || value === null) return [];
    const record = value as Record<string, unknown>;
    const question = typeof record.question === "string" ? record.question.trim() : "";
    if (question.length === 0) return [];
    const header =
      typeof record.header === "string" && record.header.trim().length > 0
        ? record.header.trim()
        : `Question ${index + 1}`;
    const options = Array.isArray(record.options)
      ? record.options.flatMap((option) => {
          if (typeof option !== "object" || option === null) return [];
          const optionRecord = option as Record<string, unknown>;
          const label = typeof optionRecord.label === "string" ? optionRecord.label.trim() : "";
          if (label.length === 0) return [];
          const description =
            typeof optionRecord.description === "string" ? optionRecord.description.trim() : "";
          return [
            {
              label,
              description: description || label,
              ...(typeof optionRecord.preview === "string"
                ? { preview: optionRecord.preview }
                : {}),
            },
          ];
        })
      : [];
    return [
      {
        id: question,
        header,
        question,
        options,
        multiSelect: record.multiSelect === true,
      },
    ];
  });
}

export function claudeSdkUserInputAnswers(
  answers: ProviderUserInputAnswers,
): NonNullable<AskUserQuestionInput["answers"]> {
  return Object.fromEntries(
    Object.entries(answers).map(([question, answer]) => [
      question,
      Array.isArray(answer)
        ? answer.filter((value): value is string => typeof value === "string").join(", ")
        : typeof answer === "string"
          ? answer
          : String(answer ?? ""),
    ]),
  );
}

export function claudeTodoSteps(input: unknown): ReadonlyArray<OrchestrationV2PlanStep> {
  const value =
    typeof input === "object" && input !== null && Reflect.get(input, "type") === "record"
      ? Reflect.get(input, "value")
      : input;
  const todos =
    typeof value === "object" && value !== null ? Reflect.get(value, "todos") : undefined;
  if (!Array.isArray(todos)) return [];
  return todos.flatMap((todo, index) => {
    if (typeof todo !== "object" || todo === null) return [];
    const text =
      typeof Reflect.get(todo, "content") === "string"
        ? String(Reflect.get(todo, "content")).trim()
        : "";
    if (text.length === 0) return [];
    const nativeStatus = Reflect.get(todo, "status");
    return [
      {
        id: `todo-${index}`,
        text,
        status:
          nativeStatus === "completed"
            ? "completed"
            : nativeStatus === "in_progress"
              ? "running"
              : "pending",
      },
    ];
  });
}

export type ClaudeTaskList = ReadonlyMap<string, Omit<OrchestrationV2PlanStep, "id">>;

export function claudeTaskField(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Reflect.get(value, key) : undefined;
}

export function claudeTaskString(value: unknown, key: string): string | undefined {
  const field = claudeTaskField(value, key);
  return typeof field === "string" && field.trim().length > 0 ? field.trim() : undefined;
}

// A Claude Code mod can hold a tool call until the user acts in its terminal
// pane. T3 cannot provide the requested pane interaction.
// Passive panes never request focus and keep working.
export function claudeFocusRequestedPanePlugin(message: SDKMessage): string | null {
  if (message.type !== "system" || claudeTaskField(message, "subtype") !== "ui_panes") return null;
  const paneId = claudeTaskString(message, "focus_requested_id");
  if (paneId === undefined) return null;
  const panes = claudeTaskField(message, "panes");
  const pane = Array.isArray(panes)
    ? panes.find((entry) => claudeTaskField(entry, "id") === paneId)
    : undefined;
  return claudeTaskString(pane, "plugin") ?? paneId;
}

export function claudeTaskStatus(value: unknown): OrchestrationV2PlanStep["status"] | undefined {
  switch (value) {
    case "pending":
      return "pending";
    case "in_progress":
      return "running";
    case "completed":
      return "completed";
    default:
      return undefined;
  }
}

export function applyClaudeTaskTool(
  tasks: ClaudeTaskList,
  toolName: string,
  input: unknown,
  result: unknown,
): ClaudeTaskList | undefined {
  if (toolName === "TaskList") {
    const listed = claudeTaskField(result, "tasks");
    if (!Array.isArray(listed)) return undefined;
    const next = new Map<string, Omit<OrchestrationV2PlanStep, "id">>();
    for (const task of listed) {
      const id = claudeTaskString(task, "id");
      const text = claudeTaskString(task, "subject");
      const status = claudeTaskStatus(claudeTaskField(task, "status"));
      if (id !== undefined && text !== undefined && status !== undefined) {
        next.set(id, { text, status });
      }
    }
    return next.size === 0 && tasks.size === 0 ? undefined : next;
  }
  if (toolName === "TaskCreate") {
    const created = claudeTaskField(result, "task");
    const fromText = claudeCreatedTaskFromText(result);
    const id = claudeTaskString(created, "id") ?? fromText?.id;
    const text =
      claudeTaskString(created, "subject") ??
      fromText?.subject ??
      claudeTaskString(input, "subject");
    if (id === undefined || text === undefined) return undefined;
    return new Map(tasks).set(id, { text, status: "pending" });
  }
  if (
    toolName !== "TaskUpdate" ||
    claudeTaskField(result, "success") === false ||
    (typeof result === "string" && !result.startsWith("Updated task #"))
  ) {
    return undefined;
  }
  const id = claudeTaskString(input, "taskId") ?? claudeTaskString(result, "taskId");
  const task = id === undefined ? undefined : tasks.get(id);
  if (id === undefined || task === undefined) return undefined;
  const nativeStatus = claudeTaskField(input, "status");
  if (nativeStatus === "deleted") {
    const next = new Map(tasks);
    next.delete(id);
    return next;
  }
  const text = claudeTaskString(input, "subject") ?? task.text;
  const status = claudeTaskStatus(nativeStatus) ?? task.status;
  if (text === task.text && status === task.status) return undefined;
  return new Map(tasks).set(id, { text, status });
}

// Subagent results carry no structured `tool_use_result`, only the text
// "Task #3 created successfully: <subject>".
export function claudeCreatedTaskFromText(
  result: unknown,
): { readonly id: string; readonly subject: string } | undefined {
  const match =
    typeof result === "string" ? /^Task #(\S+) created successfully: (.+)$/s.exec(result) : null;
  return match === null ? undefined : { id: match[1]!, subject: match[2]!.trim() };
}

export const CLAUDE_TASK_TOOL_NAMES = new Set(["TaskCreate", "TaskUpdate", "TaskList"]);
export const decodeClaudeTaskFile = Schema.decodeUnknownOption(
  Schema.fromJsonString(
    Schema.Struct({
      id: TrimmedNonEmptyString,
      subject: TrimmedNonEmptyString,
      status: Schema.Literals(["pending", "in_progress", "completed"]),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ),
);

export const readClaudeTaskList = Effect.fnUntraced(
  function* (input: {
    readonly environment: NodeJS.ProcessEnv;
    readonly cwd: string | null | undefined;
    readonly nativeThreadId: string;
  }) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const configDirOverride = input.environment.CLAUDE_CONFIG_DIR?.trim();
    const configDir = configDirOverride
      ? path.resolve(input.cwd ?? ".", configDirOverride)
      : yield* resolveClaudeHomePath({ homePath: "" });
    const listId = input.environment.CLAUDE_CODE_TASK_LIST_ID?.trim() || input.nativeThreadId;
    const directory = path.join(configDir, "tasks", listId.replace(/[^a-zA-Z0-9_-]/g, "-"));
    const tasks = new Map<string, Omit<OrchestrationV2PlanStep, "id">>();
    const names = (yield* fileSystem.readDirectory(directory))
      .filter((name) => /^\d+\.json$/.test(name))
      .toSorted((left, right) => Number.parseInt(left, 10) - Number.parseInt(right, 10));
    for (const name of names) {
      const contents = yield* fileSystem
        .readFileString(path.join(directory, name))
        .pipe(Effect.orElseSucceed(() => ""));
      const task = Option.getOrUndefined(decodeClaudeTaskFile(contents));
      if (task === undefined || task.metadata?._internal) continue;
      tasks.set(task.id, {
        text: task.subject,
        status: task.status === "in_progress" ? "running" : task.status,
      });
    }
    return tasks;
  },
  Effect.orElseSucceed((): ClaudeTaskList | undefined => undefined),
);

export function claudeTaskSteps(tasks: ClaudeTaskList): ReadonlyArray<OrchestrationV2PlanStep> {
  return [...tasks].map(([id, task]) => ({ id: `task-${id}`, ...task }));
}

export function claudeProposedPlan(input: unknown): string | null {
  const value =
    typeof input === "object" && input !== null && Reflect.get(input, "type") === "record"
      ? Reflect.get(input, "value")
      : input;
  const plan = typeof value === "object" && value !== null ? Reflect.get(value, "plan") : undefined;
  return typeof plan === "string" && plan.trim().length > 0 ? plan.trim() : null;
}

export interface ClaudeAdapterV2Options {
  readonly instanceId: ProviderInstanceId;
  readonly settings: ClaudeSettings;
  readonly modelCatalog?: Effect.Effect<ClaudeModelCatalog>;
  readonly environment: NodeJS.ProcessEnv;
  readonly attachmentsDir: string;
  readonly fileSystem: FileSystem.FileSystem;
  readonly path: Path.Path;
  readonly random: SecureRandom.SecureRandom["Service"];
  readonly idAllocator: IdAllocator.IdAllocatorV2["Service"];
  readonly queryRunner: ClaudeAgentSdkQueryRunnerShape;
  readonly scopedLimitNames?: Ref.Ref<ClaudeScopedLimitNames>;
  readonly onUsageLimits?: ManagedServerProvider["applyUsageLimits"];
  /**
   * Called with the requested cwd on a process's first init message, after its synchronous
   * SessionStart hooks have run, so cwd-keyed workspace scans can be refreshed.
   */
  readonly onSessionInit?: (cwd: string) => Effect.Effect<void>;
  /**
   * Applies Claude Code's reported model ids for a turn's cwd, so turns send ids its backend
   * accepts. Defaults to the catalog unchanged.
   */
  readonly routeModelCatalog?: (
    catalog: ClaudeModelCatalog,
    cwd: string | null,
    launchSettings?: ClaudeSdkSettings,
  ) => Effect.Effect<ClaudeModelCatalog>;
  readonly continuationRequests?: {
    readonly offer: (
      request: ProviderContinuationRequests.ProviderContinuationRequest,
    ) => Effect.Effect<void>;
  };
  readonly installationGate?: ProviderInstallationGate.ProviderInstallationGate["Service"];
}
