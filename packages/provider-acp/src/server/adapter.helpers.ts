/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// @effect-diagnostics nodeBuiltinImport:off

import {
  type ChatAttachment,
  type ModelSelection,
  type OrchestrationV2ConversationMessage,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2PlanArtifact,
  type OrchestrationV2PlanStep,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderThreadNativeMetadata,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2Subagent,
  type OrchestrationV2TurnItem,
  type OrchestrationV2UserInputQuestion,
  type OrchestrationV2WebSearchResult,
  type ProviderApprovalDecision,
  type ProviderApprovalOption,
  type ProviderInstanceId,
  type ProviderInteractionMode,
  type ProviderDriverKind,
  type ProviderRequestKind,
  type ProviderThreadId,
  type ProviderUserInputAnswers,
  type RuntimeMode,
  type RuntimeRequestId,
  type ThreadTokenUsageSnapshot,
  type ThreadId,
  isRuntimeModeAbove,
  type TurnTokenUsage,
} from "@t3tools/contracts";
import { AgentScope, AgentScopeThreadId } from "@t3tools/shared/AgentScope";
import { parseGrepOutput } from "@t3tools/shared/grepOutput";
import * as HostProcess from "@t3tools/shared/HostProcess";
import { HTML_RENDER_TOOL_NAME } from "@t3tools/shared/htmlRender";
import { modelSelectionsEqual } from "@t3tools/shared/model";
import { type SelfInvocation, selfInvocationArgs } from "@t3tools/shared/nodeRuntime";
import { resolveT3McpToolId } from "@t3tools/shared/t3McpToolPresentation";
import {
  compactDynamicToolOutput,
  compactT3McpToolOutput,
  htmlRenderFromToolItem,
  mcpToolResultOutput,
} from "@t3tools/shared/toolOutput";
import { FILE_HEADERS_ONLY, formatPatch, structuredPatch } from "diff";
import * as Cause from "effect/Cause";
import * as Clock from "effect/Clock";
import * as SecureRandom from "effect/crypto/SecureRandom";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Equal from "effect/Equal";
import * as Exit from "effect/Exit";
import * as FileSystem from "effect/FileSystem";
import * as Fiber from "effect/Fiber";
import * as Option from "effect/Option";
import * as Queue from "effect/Queue";
import * as Ref from "effect/Ref";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as Scope from "effect/Scope";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import * as SubscriptionRef from "effect/SubscriptionRef";
import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";
import * as EffectAcpErrors from "effect-acp/errors";
import type * as EffectAcpProtocol from "effect-acp/protocol";
import type * as EffectAcpSchema from "effect-acp/compat";

import {
  formatReadToolLabel,
  formatSearchToolLabel,
  searchToolLabelParts,
} from "@t3tools/shared/toolActivity";
import { isWorkspaceImagePreviewPath } from "@t3tools/shared/mediaPreview";
import * as ProviderHost from "@t3tools/provider-core/server/ProviderHost";
import { makeAcpMcpOverAcpBridge, type AcpMcpOverAcpBridge } from "./mcpOverAcpBridge.ts";
import { mcpToolPresentation } from "@t3tools/provider-core/server/mcpToolPresentation";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import * as McpProviderSession from "@t3tools/provider-core/server/mcpSession";
import {
  applyAcpAgentTerminalUpdate,
  MAX_AGENT_TERMINAL_OUTPUT_CHARS,
  acpContentBlockDisplayText,
  embeddedTerminalIdsFromSessionUpdate,
  extractMcpToolCallIdentity,
  findModelConfigOption,
  makeAcpUnreadToolCalls,
  mergeToolCallState,
  parsePermissionRequest,
  parseSessionUpdateEvent,
  sessionUpdateIsReplay,
  toolCallVisibleOutputChanged,
  unreadToolCallUpdate,
  withTrackedChangedPaths,
  withUnknownChangedPaths,
  withTrackedPermissionToolCall,
  type AcpPlanUpdate,
  type AcpAgentTerminalState,
  type AcpSessionModeState,
  type AcpToolCallState,
} from "./runtimeModel.ts";
import {
  acpClientExecuteDisposition,
  acpMcpToolApprovalElicitationDisposition,
  acpChangedPathsOfToolCall,
  acpPermissionDisposition,
  mergeAcpChangedPaths,
  type AcpPermissionDisposition,
  makeAcpClientPolicyGrants,
  unknownRecord,
} from "./clientPolicy.ts";
import {
  parseElicitationForm,
  withOptionalChoices,
  type ElicitationQuestionForm,
} from "./elicitationForm.ts";
import {
  makeAcpClientTerminals,
  resolveEmbeddedTerminalContent,
  type AcpClientTerminals,
} from "./clientTerminals.ts";
import {
  ACP_EMPTY_OPTION_VALUE,
  ACP_SESSION_MODE_OPTION_ID,
  flattenSelectChoices,
} from "./sessionConfig.ts";
import * as AcpSessionRuntime from "./AcpSessionRuntime.ts";
import {
  t3AcpPromptWithInstructions,
  type T3AcpInstructionState,
} from "@t3tools/provider-core/server/orchestrationInstructions";
import { buildRuntimeInstructions } from "@t3tools/provider-core/server/runtimeInstructions";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import type * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  type BackgroundWork,
  type BackgroundWorkReport,
  backgroundWorkNotification,
} from "@t3tools/provider-core/server/notification";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
} from "@t3tools/provider-core/server/failure";
import { acpSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import {
  isProviderNativeImageAttachment,
  providerMessageTextWithAttachmentPaths,
} from "@t3tools/provider-core/server/attachmentPrompt";
import {
  makeSubagentChildThread,
  makeSubagentConversationArtifacts,
  subagentThreadTitle,
} from "@t3tools/provider-core/server/subagentProjection";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";

export const ACP_PROTOCOL = "acp.ndjson-jsonrpc" as const;

// Grok summaries can trail hydrated tools by over two seconds; shorter waits split the wake.
export const ACP_DEFERRED_FINALIZE_DEBOUNCE: Duration.Input = "3000 millis";
// A model can stay silent this long before the first token of a reply the agent started itself.
export const ACP_OPEN_REPLY_QUIET_LIMIT: Duration.Input = "2 minutes";
export const ACP_BUSY_PROMPT_RETRY_INTERVAL: Duration.Input = "1 second";
// Agents such as omp advertise a loaded session's commands shortly after answering session/load.
export const ACP_LOADED_COMMANDS_WAIT: Duration.Input = "2 seconds";
export const ACP_PROMPT_INACTIVITY_SLICE_MILLIS = 60_000;
export const ACP_HOST_SLEEP_TOLERANCE_MILLIS = 10_000;

// pi-agent-core agents (oh-my-pi) end a turn while background work runs and reject
// prompts until it finishes; the prompt is resent rather than failing the turn.
export function isAgentBusyPromptError(error: EffectAcpErrors.AcpError): boolean {
  return (
    error._tag === "AcpRequestError" && error.errorMessage.startsWith("Agent is already processing")
  );
}

export type AcpAppContextEntry = NonNullable<
  ProviderAdapter.ProviderAdapterV2TurnInput["appContext"]
>[number];

export function formatAcpAppContextEntry(entry: AcpAppContextEntry): string {
  const updatedAt = entry.updatedAt === undefined ? "" : ` updated_at="${entry.updatedAt}"`;
  return `<external_${entry.key}${updatedAt}>${entry.text}</external_${entry.key}>`;
}

export function unsentAcpAppContext(
  appContext: ProviderAdapter.ProviderAdapterV2TurnInput["appContext"],
  seen: ReadonlyMap<string, string> | undefined,
  isNativeSlashCommand: boolean,
): ReadonlyArray<AcpAppContextEntry> {
  if (isNativeSlashCommand || appContext === undefined || appContext.length === 0) return [];
  return appContext.filter((entry) => seen?.get(entry.key) !== entry.text);
}

export function mergeAcpAppContext(
  base: ReadonlyMap<string, string> | undefined,
  entries: ReadonlyArray<AcpAppContextEntry>,
): ReadonlyMap<string, string> {
  const merged = new Map(base);
  for (const entry of entries) {
    merged.set(entry.key, entry.text);
  }
  return merged;
}

export function sendPromptWhenIdle<A>(
  turn: { readonly interrupted: boolean; readonly finalized: boolean },
  prompt: () => Effect.Effect<A, EffectAcpErrors.AcpError>,
  superseded: () => boolean = () => false,
): Effect.Effect<A, EffectAcpErrors.AcpError> {
  // A Stop or a prompt-steer can land during the wait, so both are rechecked before each resend.
  const stopped = () => turn.interrupted || turn.finalized || superseded();
  return prompt().pipe(
    Effect.catchIf(
      (error) => isAgentBusyPromptError(error) && !stopped(),
      (error) =>
        Effect.sleep(ACP_BUSY_PROMPT_RETRY_INTERVAL).pipe(
          Effect.andThen(
            Effect.suspend(() =>
              stopped() ? Effect.fail(error) : sendPromptWhenIdle(turn, prompt, superseded),
            ),
          ),
        ),
    ),
  );
}

/**
 * Emit first chunks and segment-close events immediately; coalesce later chunks into full-text snapshots.
 * This avoids quadratic output; scheduled flushes can run late under host load.
 */
export const ACP_TEXT_FLUSH_INTERVAL: Duration.Input = "50 millis";
// Subagent messages are stored as finished, so they skip the server's paragraph
// throttle and every snapshot is persisted. Match that throttle's 400 ms cadence.
export const ACP_SUBAGENT_TEXT_FLUSH_INTERVAL: Duration.Input = "400 millis";

// Output of the running prompt. Session metadata and unknown updates do not reset its timeout.
export const ACP_PROMPT_ACTIVITY_UPDATES: ReadonlySet<string> = new Set([
  "agent_message",
  "agent_message_chunk",
  "agent_thought",
  "agent_thought_chunk",
  "tool_call",
  "tool_call_update",
  "tool_call_content_chunk",
  "terminal_output_chunk",
  "terminal_update",
  "plan",
  "plan_update",
  "plan_removed",
  "compaction_update",
  "compaction_summary_chunk",
]);

export interface AcpAdapterV2RuntimeInput {
  readonly cwd: string;
  readonly runtimePolicy: ProviderAdapter.ProviderAdapterV2RuntimePolicy;
  readonly extraRoots?: ReadonlyArray<string>;
  readonly mcpServers: ReadonlyArray<EffectAcpSchema.McpServer>;
  readonly acpMcpServers?: ReadonlyArray<EffectAcpSchema.McpServer>;
  readonly httpMcpServers?: ReadonlyArray<EffectAcpSchema.McpServer>;
  readonly processEnvironment?: NodeJS.ProcessEnv;
  readonly resumeSessionId?: string;
  readonly interruptPromptOnCancel?: boolean;
  readonly sessionMeta?: NonNullable<AcpSessionRuntime.AcpSessionRuntimeOptions["sessionMeta"]>;
  readonly clientCapabilities: EffectAcpSchema.InitializeRequest["clientCapabilities"];
  readonly clientInfo: AcpSessionRuntime.AcpSessionRuntimeOptions["clientInfo"];
  readonly requestLogger?: NonNullable<AcpSessionRuntime.AcpSessionRuntimeOptions["requestLogger"]>;
  readonly protocolLogging: NonNullable<
    AcpSessionRuntime.AcpSessionRuntimeOptions["protocolLogging"]
  >;
  readonly onTermination: NonNullable<AcpSessionRuntime.AcpSessionRuntimeOptions["onTermination"]>;
  readonly onOutgoingResponseFailure?: AcpSessionRuntime.AcpSessionRuntimeOptions["onOutgoingResponseFailure"];
  readonly onOutgoingResponse?: AcpSessionRuntime.AcpSessionRuntimeOptions["onOutgoingResponse"];
  readonly onIncomingRequest?: AcpSessionRuntime.AcpSessionRuntimeOptions["onIncomingRequest"];
  readonly onUndecodableNotification?: AcpSessionRuntime.AcpSessionRuntimeOptions["onUndecodableNotification"];
}

export type AcpAdapterV2NativeLogging = Pick<
  AcpSessionRuntime.AcpSessionRuntimeOptions,
  "requestLogger" | "protocolLogging"
>;

export interface AcpAdapterV2UserInputRequest {
  readonly nativeItemId: string;
  readonly nativeRequestId: string;
  readonly questions: ReadonlyArray<OrchestrationV2UserInputQuestion>;
}

export interface AcpAdapterV2ExtensionContext {
  readonly runtime: AcpSessionRuntime.AcpSessionRuntime["Service"];
  readonly reportProviderRetry: (input: {
    readonly sessionId: string;
    readonly failure: OrchestrationV2ProviderFailure;
  }) => Effect.Effect<void>;
  readonly finishSubagent: (notice: {
    readonly sessionId: string;
    readonly childSessionId: string;
    readonly status: "completed" | "failed" | "cancelled";
    readonly result: string | null;
  }) => Effect.Effect<void>;
  readonly applyBackgroundTaskMutation: (mutation: {
    readonly sessionId: string;
    readonly taskId: string;
    readonly status: "running" | "completed" | "failed";
    readonly output?: string;
    readonly report?: BackgroundWork;
  }) => Effect.Effect<void>;
  /** For compactions reported outside ACP `compaction_update`. */
  readonly markSessionCompacted: (sessionId: string) => Effect.Effect<void>;
  /**
   * For agents that hold `session/prompt` past their foreground work on ACP v1. An idle settles
   * the run only after a `running` report during it, so an earlier prompt's idle cannot.
   */
  readonly reportForegroundWork: (notice: {
    readonly sessionId: string;
    readonly state: "running" | "idle";
  }) => Effect.Effect<void>;
  readonly requestUserInput: (
    input: AcpAdapterV2UserInputRequest,
    requestContext: EffectAcpProtocol.AcpRequestContext,
  ) => Effect.Effect<
    {
      readonly acknowledgeNativeResponse: Effect.Effect<void, EffectAcpErrors.AcpError>;
      readonly answers: ProviderUserInputAnswers | null;
    },
    EffectAcpErrors.AcpError
  >;
  readonly captureProposedPlan: (input: { readonly planMarkdown: string }) => Effect.Effect<void>;
  readonly lastProposedPlanMarkdown: Effect.Effect<string | undefined>;
}

/**
 * Raised when an agent does not accept the session's model selection: the
 * session's model option does not offer it, or the agent answers the write
 * with invalid params. `makeProviderFailure` shows its message to the user;
 * the agent's reply stays on `cause`.
 */
export class AcpModelSelectionError extends Schema.TaggedError<AcpModelSelectionError>()(
  "AcpModelSelectionError",
  {
    model: Schema.String,
    cause: Schema.Defect(),
  },
) {
  override get message(): string {
    return `The agent did not accept the model "${this.model}". Choose another model for this provider, then retry.`;
  }
}

export const isAcpModelSelectionError = Schema.is(AcpModelSelectionError);
export const isProviderCompactionUnsupportedError = Schema.is(
  ProviderAdapter.ProviderCompactionUnsupportedError,
);

/**
 * Turn-start refusals that leave the session usable. Other start failures, such as a session that
 * cannot be reopened or a setup step that fails, can mean the agent lost the session, so the
 * server keeps its recovery for them.
 */
export const refusedWithSessionIntact = (cause: unknown) =>
  isAcpModelSelectionError(cause) || isProviderCompactionUnsupportedError(cause);

/** A prompt-steered turn spans several prompts, each reporting its own usage. */
export function addAcpUsage(
  total: EffectAcpSchema.Usage | undefined,
  usage: EffectAcpSchema.Usage | null | undefined,
): EffectAcpSchema.Usage | undefined {
  if (usage == null) return total;
  if (total === undefined) return usage;
  const optional = (left: number | null | undefined, right: number | null | undefined) =>
    left == null && right == null ? {} : { value: (left ?? 0) + (right ?? 0) };
  const thought = optional(total.thoughtTokens, usage.thoughtTokens);
  const cachedRead = optional(total.cachedReadTokens, usage.cachedReadTokens);
  const cachedWrite = optional(total.cachedWriteTokens, usage.cachedWriteTokens);
  return {
    totalTokens: total.totalTokens + usage.totalTokens,
    inputTokens: total.inputTokens + usage.inputTokens,
    outputTokens: total.outputTokens + usage.outputTokens,
    ...("value" in thought ? { thoughtTokens: thought.value } : {}),
    ...("value" in cachedRead ? { cachedReadTokens: cachedRead.value } : {}),
    ...("value" in cachedWrite ? { cachedWriteTokens: cachedWrite.value } : {}),
  };
}

/**
 * Maps one per-turn usage sample (flavors with reportsPerTurnPromptUsage)
 * directly onto TurnTokenUsage: the response's counters already cover exactly
 * this prompt.
 */
export function acpPerTurnPromptUsage(
  usage: EffectAcpSchema.Usage | null | undefined,
  hasSubagents: boolean,
  terminalStatus: OrchestrationV2ProviderTurn["status"],
  geminiUsage = false,
): TurnTokenUsage {
  if (usage == null) {
    return { usageScope: "main_agent", usageStatus: "unavailable", hasSubagents };
  }
  const inputTokens = geminiUsage
    ? usage.inputTokens + (usage.cachedReadTokens ?? 0)
    : usage.inputTokens;
  const outputTokens = usage.outputTokens;
  // TurnTokenUsage contract: input includes cache read + write and reasoning
  // is a subset of output, so clamp counters that exceed their parent and
  // drop the ones the agent left unset. Cache writes are capped at whatever
  // cache reads leave of input, so the pair cannot exceed it.
  const clampSubset = (value: number | null | undefined, parent: number) =>
    value == null ? undefined : Math.min(value, parent);
  const cachedInputTokens = clampSubset(usage.cachedReadTokens, inputTokens);
  const cacheCreationTokens = clampSubset(
    usage.cachedWriteTokens,
    inputTokens - (cachedInputTokens ?? 0),
  );
  const reasoningTokens = clampSubset(usage.thoughtTokens, outputTokens);
  return {
    usageScope: "main_agent",
    usageStatus: terminalStatus === "completed" ? "complete" : "partial",
    hasSubagents,
    inputTokens,
    outputTokens,
    ...(cachedInputTokens === undefined ? {} : { cachedInputTokens }),
    ...(cacheCreationTokens === undefined ? {} : { cacheCreationTokens }),
    ...(reasoningTokens === undefined ? {} : { reasoningTokens }),
  };
}

export interface AcpPromptOutcomeFailure {
  readonly failure: OrchestrationV2ProviderFailure;
  readonly threadDisposition: "reusable" | "broken";
  /** The native session can carry on: the turn resends this prompt once before failing. */
  readonly resumeWith?: string;
}

export interface AcpAdapterV2Flavor {
  readonly buildAttachmentPrompt?: (input: {
    readonly text: string;
    readonly attachments: ReadonlyArray<ChatAttachment>;
    readonly resolveAttachmentPath: (attachment: ChatAttachment) => string | null;
    readonly promptCapabilities: EffectAcpSchema.AgentCapabilities["promptCapabilities"];
  }) => Effect.Effect<ReadonlyArray<EffectAcpSchema.ContentBlock>, EffectAcpErrors.AcpError>;
  readonly promptFailure?: (cause: unknown) => OrchestrationV2ProviderFailure;
  /** The flavor's runtime refuses a version the policy rates broken when it starts. */
  readonly checksVersionAtHandshake?: boolean;
  /**
   * Runs before `session/prompt`. The check reports a failure hidden by a clean stop, or
   * by silence when the inactivity watchdog retires the prompt (`retired`). A failure
   * restarts the runtime; a `broken` thread's next turn starts a fresh session.
   */
  readonly watchPromptOutcome?: (
    sessionId: string,
  ) => Effect.Effect<
    (
      result: EffectAcpSchema.PromptResponse,
      options?: { readonly retired?: boolean },
    ) => Effect.Effect<AcpPromptOutcomeFailure | undefined>
  >;
  readonly requiresSignIn?: (cause: unknown) => boolean;
  /**
   * Runs before attachment paths, T3 instructions and native slash-command detection,
   * so a rewrite can turn the user's text into a native command.
   */
  readonly rewriteUserText?: (
    text: string,
    turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
  ) => Effect.Effect<string, never, ChildProcessSpawner.ChildProcessSpawner>;
  readonly driver: ProviderDriverKind;
  readonly capabilities: OrchestrationV2ProviderCapabilities;
  readonly supportsNativeGoals?: Effect.Effect<boolean>;
  readonly clientCapabilitiesMeta?: NonNullable<
    EffectAcpSchema.InitializeRequest["clientCapabilities"]
  >["_meta"];
  readonly mcpOverHttp?: boolean;
  /** The agent has no tool search of its own, so T3 lists optional tools on demand. */
  readonly deferMcpTools?: boolean;
  readonly normalizeSessionUpdate?: (
    notification: EffectAcpSchema.SessionNotification,
  ) => EffectAcpSchema.SessionNotification;
  /** Extract provider-specific context usage while preserving the original session update. */
  readonly extractContextUsage?: (
    notification: EffectAcpSchema.SessionNotification,
  ) => ThreadTokenUsageSnapshot | undefined;
  /**
   * Agent updates that belong to no turn (Kiro's own cloud-config fetch). They
   * are dropped before anything reads them, so they neither show in the turn
   * nor count as it starting.
   */
  readonly ignoreSessionUpdate?: (notification: EffectAcpSchema.SessionNotification) => boolean;
  readonly onAvailableCommandsUpdate?: (
    commands: ReadonlyArray<EffectAcpSchema.AvailableCommand>,
  ) => Effect.Effect<void>;
  readonly onSessionConfigurationUpdate?: (
    configOptions: ReadonlyArray<EffectAcpSchema.SessionConfigOption>,
    modeState: AcpSessionModeState | undefined,
    modelState: EffectAcpSchema.SessionModelState | null | undefined,
    options?: { readonly lastCatalogKey?: string | null },
  ) => Effect.Effect<string | null | void>;
  readonly onUrlElicitation?: (input: {
    readonly elicitationId: string;
    readonly url: string;
    readonly message: string;
  }) => Effect.Effect<boolean>;
  /**
   * The adapter applies the schema's `required` list to the returned form, so `respond` gets no
   * entry for a single choice the user skipped and leaves that field out of its content.
   */
  readonly extractElicitationForm?: (
    request: EffectAcpSchema.CreateElicitationRequest,
  ) => ElicitationQuestionForm | undefined;
  readonly withRuntimeStartup?: <A, E, R>(effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>;
  readonly makeRuntime: (
    input: AcpAdapterV2RuntimeInput,
  ) => Effect.Effect<
    AcpSessionRuntime.AcpSessionRuntime["Service"],
    EffectAcpErrors.AcpError,
    ChildProcessSpawner.ChildProcessSpawner | SecureRandom.SecureRandom | Scope.Scope
  >;
  readonly customModels?: ReadonlyArray<string>;
  /** The agent may run another model than session/new reports, so the model is always written. */
  readonly alwaysSetModel?: boolean;
  /** Values the client shows for options a new session's selection leaves unset. */
  readonly unsetOptionDefaults?: Effect.Effect<NonNullable<ModelSelection["options"]>>;
  readonly resolveModelId?: (selection: ModelSelection) => string | undefined;
  /**
   * The agent advertises its model option only after `session/new` returns
   * (Kiro sends it in a `config_option_update`), so in-session model switching
   * is not inferred from the setup result.
   */
  readonly modelOptionArrivesLate?: boolean;
  readonly getModelContextWindow?: (
    selection: ModelSelection,
    session: AcpSessionRuntime.AcpSessionRuntimeStartResult,
  ) => number | undefined;
  readonly applyModelSelection?: (input: {
    readonly runtime: AcpSessionRuntime.AcpSessionRuntime["Service"];
    readonly startResult: AcpSessionRuntime.AcpSessionRuntimeStartResult;
    readonly modelSelection: ModelSelection;
  }) => Effect.Effect<string | undefined, EffectAcpErrors.AcpError>;
  /**
   * Model-selection option ids `applyModelSelection` sets itself under a
   * native id, which the generic option loop then skips (Kiro's
   * `reasoningEffort` is its `effortLevel`).
   */
  readonly ownedModelOptionIds?: ReadonlyArray<string>;
  readonly lockSessionModeToPolicy?: true;
  readonly sessionModeForPolicy?: (
    policy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
  ) => string | undefined;
  /**
   * Native select-option values to apply for a runtime policy (e.g. Kiro's
   * `autopilot`), set on every session configure. A value the session does
   * not advertise is skipped; an agent rejecting it fails the session.
   */
  readonly sessionConfigForPolicy?: (
    policy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
  ) => ReadonlyArray<{ readonly id: string; readonly value: string }>;
  /**
   * The runtime mode a native session mode grants, for flavors whose modes are permission levels.
   * A picked mode this does not place within the thread's runtime mode is not applied.
   */
  readonly runtimeModeForSessionMode?: (modeId: string) => RuntimeMode | undefined;
  readonly clientFileSystem?: {
    readonly readTextFile: (
      request: EffectAcpSchema.ReadTextFileRequest,
      cwd: string | null,
    ) => Effect.Effect<EffectAcpSchema.ReadTextFileResponse, EffectAcpErrors.AcpError>;
    readonly writeTextFile?: (
      request: EffectAcpSchema.WriteTextFileRequest,
      cwd: string | null,
    ) => Effect.Effect<EffectAcpSchema.WriteTextFileResponse, EffectAcpErrors.AcpError>;
  };
  readonly extractPermissionQuestion?: (request: EffectAcpSchema.RequestPermissionRequest) =>
    | {
        readonly question: OrchestrationV2UserInputQuestion;
        readonly respond: (
          answers: ProviderUserInputAnswers,
        ) => EffectAcpSchema.RequestPermissionResponse | undefined;
      }
    | undefined;
  /** Grok Auto asks only about classifier refusals; T3 policy must not auto-approve them. */
  readonly permissionDisposition?: (
    policy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
    request: EffectAcpSchema.RequestPermissionRequest,
  ) => AcpPermissionDisposition;
  readonly approvalOptions?: (
    request: EffectAcpSchema.RequestPermissionRequest,
  ) => ReadonlyArray<ProviderApprovalOption>;
  /** Options T3 may answer with; the rest (e.g. Devin's bypass-permissions plan exit) are never sent. */
  readonly answerablePermissionOptions?: (
    request: EffectAcpSchema.RequestPermissionRequest,
  ) => ReadonlyArray<EffectAcpSchema.PermissionOption>;
  readonly onSessionEvent?: (
    event: AcpSessionRuntime.AcpSessionRuntimeEvent,
    cwd: string,
  ) => Effect.Effect<void>;
  readonly subagentsIdleOnTurnCompletion?: boolean;
  /**
   * Subagents the agent goes on running after its prompt, with no update when one ends. Asked
   * when the prompt ends and when a reply the agent started by itself ends; the native task ids
   * it returns hold the turn open and the rest become idle.
   */
  readonly subagentsOutlivingPrompt?: (input: {
    readonly sessionId: string;
    readonly nativeTaskIds: ReadonlyArray<string>;
  }) => Effect.Effect<ReadonlyArray<string>>;
  /**
   * Reads projected timeline entries for a subagent whose provider writes child work to a local
   * transcript instead of streaming child ACP notifications. Called periodically while active and
   * once more with `finalize: true` before transitioning the subagent to a terminal or idle state.
   */
  readonly readSubagentTranscript?: (input: {
    readonly sessionId: string;
    readonly nativeTaskId: string;
    readonly childSessionId: string | null;
    readonly launch: { readonly title: string | null; readonly prompt: string };
    readonly siblings: ReadonlyArray<{
      readonly nativeTaskId: string;
      readonly title: string | null;
      readonly prompt: string;
    }>;
    readonly finalize: boolean;
  }) => Effect.Effect<ReadonlyArray<AcpSubagentTranscriptEntry>>;
  readonly supportsCompaction?: boolean;
  /** Sends `/compact` as a prompt, only to sessions whose advertised commands include `compact`. */
  readonly compactViaAdvertisedCommand?: boolean;
  /**
   * Native steering: `send` queues a message into the running turn and returns the
   * agent's id for it, which `injectedSteerId` reads from the update that delivers it.
   * No id means the running turn reads the message once the agent accepts it.
   */
  readonly steering?: {
    readonly send: (
      runtime: AcpSessionRuntime.AcpSessionRuntime["Service"],
      sessionId: string,
      text: string,
      images: ReadonlyArray<EffectAcpSchema.ContentBlock>,
    ) => Effect.Effect<string | undefined, EffectAcpErrors.AcpError>;
    readonly injectedSteerId?: (
      notification: EffectAcpSchema.SessionNotification,
    ) => string | undefined;
  };
  /**
   * Steers with another `session/prompt` while one runs: the agent answers the running prompt
   * `end_turn` and carries the turn on under the new one, leaving its tools and subagents alone.
   */
  readonly steersWithPrompt?: (
    initializeResult: AcpSessionRuntime.AcpSessionRuntimeStartResult["initializeResult"],
  ) => boolean;
  /**
   * Native fork from an earlier turn. `nativeTurnId` reads the agent's id for a running
   * turn's prompt, which the turn keeps as its native ref; forking from that turn sends
   * `forkMeta(id)` as the `session/fork` `_meta`.
   */
  readonly forkFromTurn?: {
    readonly supported: (
      initializeResult: AcpSessionRuntime.AcpSessionRuntimeStartResult["initializeResult"],
    ) => boolean;
    readonly nativeTurnId: (
      notification: EffectAcpSchema.SessionNotification,
    ) => string | undefined;
    readonly forkMeta: (
      nativeTurnId: string,
    ) => NonNullable<EffectAcpSchema.ForkSessionRequest["_meta"]>;
  };
  /**
   * Compacts with the agent's own request, for agents that answer a `/compact` prompt as chat.
   * Compaction is refused when `supported` rejects the running agent's `initialize` result.
   */
  readonly compactSession?: {
    readonly supported: (
      initializeResult: AcpSessionRuntime.AcpSessionRuntimeStartResult["initializeResult"],
    ) => boolean;
    readonly compact: (
      runtime: AcpSessionRuntime.AcpSessionRuntime["Service"],
      sessionId: string,
    ) => Effect.Effect<void, EffectAcpErrors.AcpError>;
  };
  readonly runtimeHarness?: string;
  readonly registerExtensions?: (
    context: AcpAdapterV2ExtensionContext,
  ) => Effect.Effect<void, EffectAcpErrors.AcpError>;
  readonly extractSubagentSessionEvent?: (
    notification: EffectAcpSchema.SessionNotification,
  ) => AcpSubagentSessionEvent | undefined;
  readonly extractSubagentUpdate?: (
    toolCall: AcpToolCallState,
  ) => AcpAdapterV2SubagentUpdate | undefined;
  readonly isProvisionalSubagentTool?: (toolCall: AcpToolCallState) => boolean;
  readonly normalizeToolCall?: (toolCall: AcpToolCallState) => AcpToolCallState;
  readonly isCancelledToolCall?: (payload: unknown) => boolean;
  readonly extractProposedPlanMarkdown?: (toolCall: AcpToolCallState) => string | undefined;
  readonly extractBackgroundTaskId?: (toolCall: AcpToolCallState) => string | undefined;
  /** Distinguishes commands from monitors when lifecycle notifications omit their kind. */
  readonly isBackgroundCommandTool?: (toolCall: AcpToolCallState) => boolean;
  readonly extractBackgroundToolMutation?: (text: string) => ReadonlyArray<{
    readonly taskId: string;
    readonly status: "running" | "completed" | "failed";
    readonly appendOutput: string;
  }>;
  readonly extractSubagentEndNotice?: (text: string) =>
    | {
        readonly childSessionId: string;
        readonly status: "completed" | "failed";
      }
    | undefined;
  readonly extractBackgroundTaskCompletion?: (toolCall: AcpToolCallState) => ReadonlyArray<{
    readonly taskId: string;
    readonly status: "running" | "completed" | "failed";
    readonly appendOutput: string;
  }>;
  readonly isPersistentBackgroundTool?: (toolCall: AcpToolCallState) => boolean;
  /**
   * A tool the agent goes on running after its prompt ends, and reports on by itself when the
   * tool ends. With `deferFinalizeForBackgroundWork`, the turn stays open until then.
   */
  readonly toolOutlivesPrompt?: (toolCall: AcpToolCallState) => boolean;
  /**
   * Finalize a settled turn held only by running commands once the session has been silent for
   * `timeout`, so a command that never reports back cannot leave the thread in Working forever.
   * Other holds (questions, schedules, subagents) keep the turn open as before.
   */
  readonly postSettleCommandHold?: {
    readonly timeout: Duration.Input;
    readonly isCommand: (toolCall: AcpToolCallState) => boolean;
  };
  readonly isProviderWakeNotification?: (
    notification: EffectAcpSchema.SessionNotification,
  ) => boolean;
  readonly deferFinalizeForBackgroundWork?: AcpNegotiatedFlag;
  /**
   * Every model reply ends with `usage_update`, also the ones the agent starts with no prompt
   * open. A turn that ends on the deferred finalize waits for it instead of the short debounce.
   */
  readonly replyEndsWithUsageUpdate?: boolean;
  /**
   * True when the agent has a queued wake or in-flight reply that has not streamed yet (for
   * example, a second background task finished while the first wake's reply was running).
   * Checked before finalizing a settled prompt or its deferred debounce, so the turn waits
   * through `ACP_OPEN_REPLY_QUIET_LIMIT` instead of closing early.
   */
  readonly hasPendingReply?: (sessionId: string) => Effect.Effect<boolean>;
  readonly assertComplete?: Effect.Effect<void, EffectAcpErrors.AcpError>;
  /** Interrupt the local prompt fiber before `session/cancel` (Grok wedged prompts). */
  readonly interruptPromptOnCancel?: boolean;
  /**
   * Hold `session/cancel` until an update after `session/prompt` matches `isStart`,
   * or `bound` has passed; skip it if the prompt settles first. Kiro 2.27.1 can
   * drop a cancel sent just after the prompt and run the turn to completion.
   */
  readonly cancelAfterPromptStarts?: {
    readonly isStart: (update: EffectAcpSchema.SessionUpdate) => boolean;
    readonly bound: Duration.Input;
  };
  /**
   * The agent's PromptResponse.usage counters read per-turn. The ACP spec
   * leaves usage semantics open, so this stays unset until proven live.
   */
  readonly reportsPerTurnPromptUsage?: boolean;
  /** Antigravity 1.5+ usage: inputTokens leaves out cachedReadTokens, while outputTokens already includes thoughtTokens. */
  readonly geminiPromptUsage?: boolean;
  /**
   * Fails a dispatched prompt after this long with no update for its session while no
   * agent request, tool or subagent is open, and replaces the agent before the next turn.
   */
  readonly promptInactivityTimeout?: Duration.Input;
  /** Grok can retain task_already_running until process exit. */
  readonly restartRuntimeAfterInterrupt?: boolean;
  /** Prompt failures after which the agent process keeps failing until replaced. */
  readonly restartRuntimeAfterPromptError?: (error: unknown) => boolean;
  readonly restartRuntimeOnEveryInterrupt?: boolean;
  readonly terminateRuntimeProcessGroupOnInterrupt?: boolean;
  readonly preserveRuntimeOnSettledInterrupt?: boolean;
  readonly enablePostSettleContinuation?: AcpNegotiatedFlag;
  /** A native request after prompt settlement starts a continuation before it is handled. */
  readonly wakeOnDetachedRequest?: boolean;
  /** Settle on native idle after the accepted user echo, only on negotiated ACP v2. */
  readonly followAgentWorkState?: boolean;
  /**
   * Grok CLI currently accepts and vision-processes image blocks while still
   * reporting the capability as false; without this override, screenshot turns
   * fail before `session/prompt`.
   */
  readonly supportsImagePrompts?: boolean;
  /**
   * True when this session's native system prompt carries T3's PR-linking instructions, so
   * turns omit them. Must use the same negotiated check that sent them on session setup.
   */
  readonly sessionCarriesPullRequestLinking?: (
    initializeResult: EffectAcpSchema.InitializeResponse,
  ) => boolean;
}

/**
 * A flavor flag that is either fixed, or read from the agent's `initialize` result for
 * agents identified only there, such as one launched through a wrapper command.
 */
export type AcpNegotiatedFlag =
  | boolean
  | ((initializeResult: EffectAcpSchema.InitializeResponse) => boolean);

export const readNegotiatedFlag = (
  flag: AcpNegotiatedFlag | undefined,
  initializeResult: EffectAcpSchema.InitializeResponse,
) => (typeof flag === "function" ? flag(initializeResult) : flag === true);

export function acpSupportsImagePrompts(input: {
  readonly flavorSupportsImagePrompts?: boolean | undefined;
  readonly negotiatedImage?: boolean | undefined;
}): boolean {
  return input.flavorSupportsImagePrompts === true || input.negotiatedImage === true;
}

export function acpScopedNativeId(instanceId: ProviderInstanceId, nativeId: string): string {
  return `provider-instance:${encodeURIComponent(instanceId)}:${nativeId}`;
}

export function acpProviderItemNativeId(input: {
  readonly instanceId: ProviderInstanceId;
  readonly itemIdentityVersion: 2 | undefined;
  readonly nativeId: string;
}): string {
  return input.itemIdentityVersion === 2
    ? acpScopedNativeId(input.instanceId, input.nativeId)
    : input.nativeId;
}

export type AcpSubagentSessionEvent =
  | {
      readonly type: "state";
      readonly childSessionId: string;
      readonly parentSessionId: string;
      readonly status: "running" | "completed" | "failed" | "cancelled";
      readonly result: string | null;
    }
  | {
      readonly type: "delegation";
      readonly childSessionId: string;
      readonly parentSessionId: string | null;
      readonly delegationId: string;
      readonly prompt: string;
    };

export interface AcpAdapterV2SubagentUpdate {
  readonly nativeTaskId: string;
  readonly prompt: string;
  readonly title: string | null;
  readonly model: string | null;
  readonly status:
    | "pending"
    | "running"
    | "idle"
    | "completed"
    | "failed"
    | "interrupted"
    | "cancelled";
  readonly childSessionId: string | null;
  readonly result: string | null;
  readonly suppressNormalTool?: boolean;
}

export type AcpSubagentTranscriptEntry = (
  | {
      readonly kind: "reasoning";
      readonly itemId: string;
      readonly text: string;
      readonly status: "running" | "completed";
      readonly title?: string | null | undefined;
      readonly createdAt?: DateTime.Utc | undefined;
    }
  | {
      readonly kind: "tool";
      readonly itemId: string;
      readonly toolCall: AcpToolCallState;
      readonly projectedStatus?: "interrupted" | undefined;
      readonly createdAt?: DateTime.Utc | undefined;
    }
  | {
      readonly kind: "assistant_message";
      readonly itemId: string;
      readonly text: string;
      readonly createdAt?: DateTime.Utc | undefined;
    }
  | {
      readonly kind: "user_message";
      readonly itemId: string;
      readonly text: string;
      readonly createdAt?: DateTime.Utc | undefined;
    }
  | {
      readonly kind: "error";
      readonly itemId: string;
      readonly message: string;
      readonly createdAt?: DateTime.Utc | undefined;
    }
) & {
  /** Names the transcript an entry came from when one subagent call runs several children. */
  readonly childKey?: string | undefined;
};

export interface AcpAdapterV2Options {
  readonly instanceId: ProviderInstanceId;
  readonly flavor: AcpAdapterV2Flavor;
  readonly selfInvocation: SelfInvocation;
  readonly clientTerminals?: {
    readonly environment?: NodeJS.ProcessEnv;
    readonly shellCommands?: boolean;
  };
  readonly nativeLogging?: (threadId: ThreadId) => AcpAdapterV2NativeLogging;
  readonly continuationRequests?: {
    readonly offer: (
      request: ProviderContinuationRequests.ProviderContinuationRequest,
    ) => Effect.Effect<void>;
  };
  readonly testHooks?: {
    readonly onDeferredFinalizeScheduled?: (debounce: Duration.Input) => Effect.Effect<void>;
    /** `cancelAfterPromptStarts`: Stop is holding `session/cancel` until the prompt starts. */
    readonly onCancelHeld?: () => Effect.Effect<void>;
    readonly afterPromptWireSettled?: () => Effect.Effect<void>;
    readonly afterPromptSettledWithBackgroundWork?: () => Effect.Effect<void>;
    readonly afterPromptCallback?: () => Effect.Effect<void>;
    readonly onNativeResponseLifecycle?: (event: {
      readonly generation?: number;
      readonly requestId?: string;
      readonly type:
        | "admission_rejected"
        | "failed"
        | "late_noop"
        | "registered"
        | "removed"
        | "timer_exited"
        | "timer_started"
        | "watcher_exited"
        | "watcher_started";
    }) => Effect.Effect<void>;
  };
}

export const AcpProviderCapabilitiesV2 = {
  sessions: {
    supportsMultipleProviderThreadsPerSession: false,
    supportsModelSwitchInSession: false,
    supportsProviderSwitchingViaHandoff: true,
    supportsRuntimeModeSwitchInSession: false,
    pendingRequestsSurviveRestart: false,
  },
  threads: {
    canCreateEmptyThread: true,
    canReadThreadSnapshot: false,
    canRollbackThread: true,
    canForkThread: false,
    canForkFromTurn: false,
    canForkFromSubagentThread: false,
    exposesNativeThreadId: true,
  },
  turns: {
    exposesNativeTurnId: false,
    emitsTurnStarted: true,
    emitsTurnCompleted: true,
    supportsInterrupt: true,
    supportsNativeResume: false,
    supportsActiveSteering: false,
    supportsSteeringByInterruptRestart: true,
    supportsQueuedMessages: true,
    terminalStatusQuality: "strong",
  },
  streaming: {
    streamsAssistantText: true,
    streamsReasoning: true,
    streamsToolOutput: true,
    streamsPlanText: false,
    emitsMessageCompleted: true,
  },
  tools: {
    exposesToolItemIds: true,
    emitsToolStarted: true,
    emitsToolCompleted: true,
    emitsToolOutput: true,
    supportsMcpTools: false,
    supportsDynamicToolCallbacks: false,
  },
  approvals: {
    supportsCommandApproval: true,
    supportsFileReadApproval: true,
    supportsFileChangeApproval: true,
    supportsApplyPatchApproval: false,
    approvalsHaveNativeRequestIds: false,
    approvalCallbacksAreLiveOnly: true,
    approvalsCanOriginateFromSubagents: false,
  },
  planning: {
    emitsPlanUpdated: true,
    emitsTodoList: true,
    emitsProposedPlan: false,
    supportsStructuredQuestions: true,
    planDeltasHaveItemIds: false,
  },
  subagents: {
    supportsSubagents: false,
    exposesSubagentThreadIds: false,
    emitsSubagentLifecycle: false,
    canWaitForSubagents: false,
    canCloseSubagents: false,
    canForkSubagentThread: false,
  },
  context: {
    acceptsSystemContext: false,
    acceptsDeveloperContext: false,
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
    // ACP lacks truncation; rollback starts a fresh agent session and turn start replays the kept history.
    providerCanRollbackConversation: false,
    providerRollbackReturnsSnapshot: true,
    providerCanReadConversationSnapshot: false,
  },
  identity: {
    nativeThreadIds: "strong",
    nativeTurnIds: "weak",
    nativeItemIds: "weak",
    nativeRequestIds: "weak",
  },
  runtimePolicy: {
    enforcement: "client-boundary",
  },
} satisfies OrchestrationV2ProviderCapabilities;

export function canSwitchModelInSession(
  configOptions: ReadonlyArray<EffectAcpSchema.SessionConfigOption> | null | undefined,
  models: EffectAcpSchema.SessionModelState | null | undefined,
): boolean {
  return findModelConfigOption(configOptions) !== undefined || models != null;
}

export const STEER_DELIVERY_BOUND = "2 seconds";

/**
 * `session/fork` `_meta` for a fork from `providerTurnId`: none for the session head,
 * the flavor's meta for a turn the agent named, or `null` when the agent can't fork there.
 */
export function forkFromTurnMetaFor(input: {
  readonly driver: ProviderDriverKind;
  readonly flavor: Pick<AcpAdapterV2Flavor, "forkFromTurn">;
  readonly canForkFromTurn: boolean;
  readonly forkInput: ProviderAdapter.ProviderAdapterV2ForkThreadInput;
}): NonNullable<EffectAcpSchema.ForkSessionRequest["_meta"]> | undefined | null {
  const { forkInput } = input;
  if (forkInput.providerTurnId === undefined) return undefined;
  const turns = (forkInput.sourceProviderTurns ?? []).filter(
    (turn) => turn.providerThreadId === forkInput.sourceProviderThread.id,
  );
  const target = turns.find((turn) => turn.id === forkInput.providerTurnId);
  if (target === undefined) return null;
  if (turns.every((turn) => turn.ordinal <= target.ordinal)) return undefined;
  const ref = target.nativeTurnRef;
  if (
    input.flavor.forkFromTurn === undefined ||
    !input.canForkFromTurn ||
    ref === null ||
    ref.driver !== input.driver ||
    ref.strength !== "strong" ||
    ref.nativeId === null
  ) {
    return null;
  }
  return input.flavor.forkFromTurn.forkMeta(ref.nativeId);
}

export function isCompactionMessage(
  message: ProviderAdapter.ProviderAdapterV2TurnMessage,
): boolean {
  return message.text.trim() === "/compact" && message.attachments.length === 0;
}

/** `/compact`, optionally followed by preservation instructions that some agents accept. */
export function isCompactCommand(message: ProviderAdapter.ProviderAdapterV2TurnMessage): boolean {
  return /^\/compact(?:\s|$)/.test(message.text.trim()) && message.attachments.length === 0;
}

export function negotiatedCapabilities(
  base: OrchestrationV2ProviderCapabilities,
  started: AcpSessionRuntime.AcpSessionRuntimeStartResult,
  modelOptionArrivesLate: boolean,
  forksFromTurn: boolean,
  steersWithPrompt: boolean,
): OrchestrationV2ProviderCapabilities {
  const agent = started.initializeResult.agentCapabilities ?? {};
  const session = agent.sessionCapabilities;
  const setup = started.sessionSetupResult;
  const canSwitchModel =
    modelOptionArrivesLate || canSwitchModelInSession(setup.configOptions, setup.models);
  const canLoad = agent.loadSession === true;
  const canFork = session?.fork != null;
  return {
    ...base,
    sessions: {
      ...base.sessions,
      supportsModelSwitchInSession: canSwitchModel,
    },
    threads: {
      ...base.threads,
      canReadThreadSnapshot: canLoad,
      canForkThread: canFork,
      canForkFromTurn: canFork && forksFromTurn,
    },
    turns: {
      ...base.turns,
      supportsActiveSteering: base.turns.supportsActiveSteering || steersWithPrompt,
    },
    tools: {
      ...base.tools,
      supportsMcpTools: true,
    },
    checkpointing: {
      ...base.checkpointing,
      providerCanReadConversationSnapshot: canLoad,
    },
  };
}

export interface AcpMcpContext {
  readonly servers: ReadonlyArray<EffectAcpSchema.McpServer>;
  readonly acpServers: ReadonlyArray<EffectAcpSchema.McpServer>;
  readonly httpServers: ReadonlyArray<EffectAcpSchema.McpServer>;
  readonly processEnvironment?: NodeJS.ProcessEnv;
  readonly endpoint?: string;
  readonly authorization?: string;
}

// A GUI-subsystem executable (packaged Windows desktop) does not hold the console, so PowerShell
// neither waits for it nor captures its output or exit code; cmd.exe running a batch file does.
// cmd.exe decodes batch files with the console code page, so paths come from the (UTF-16) environment.
export const ACP_MCP_CALL_LAUNCHER = [
  "@echo off",
  "setlocal EnableExtensions DisableDelayedExpansion",
  'set "ELECTRON_RUN_AS_NODE=1"',
  "if not defined T3_ACP_MCP_ENTRYPOINT goto packaged",
  '"%T3_ACP_MCP_NODE%" "%T3_ACP_MCP_ENTRYPOINT%" acp-mcp-call %*',
  "exit /b %errorlevel%",
  ":packaged",
  '"%T3_ACP_MCP_NODE%" acp-mcp-call %*',
  "",
].join("\r\n");

export const writeAcpMcpCallLauncher = Effect.fn("AcpAdapterV2.writeAcpMcpCallLauncher")(function* (
  stateDir: string,
) {
  if (!(yield* HostProcess.isWindows)) return undefined;
  const fileSystem = yield* FileSystem.FileSystem;
  const dir = `${stateDir}\\acp`;
  const launcherPath = `${dir}\\acp-mcp-call.cmd`;
  return yield* fileSystem.makeDirectory(dir, { recursive: true }).pipe(
    Effect.andThen(fileSystem.writeFileString(launcherPath, ACP_MCP_CALL_LAUNCHER)),
    Effect.as(launcherPath),
    Effect.catch((error) =>
      Effect.logWarning("Could not write the ACP terminal tool launcher.", error).pipe(
        Effect.as(undefined),
      ),
    ),
  );
});

export function acpMcpContext(
  session: McpProviderSession.McpProviderSessionConfig | undefined,
  self: SelfInvocation,
  mcpOverHttp: boolean | undefined,
  deferMcpTools: boolean | undefined,
  callLauncher: string | undefined,
): AcpMcpContext {
  if (session === undefined) {
    return { servers: [], acpServers: [], httpServers: [] };
  }
  // codex-acp 1.2.0 and pi-acp drop injected HTTP servers, so HTTP is opt-in per flavor.
  return {
    servers: [
      {
        name: "t3-code",
        command: self.command,
        args: [...selfInvocationArgs(self, ["acp-mcp-bridge"])],
        env: [
          { name: "ELECTRON_RUN_AS_NODE", value: "1" },
          { name: "T3_ACP_MCP_ENDPOINT", value: session.endpoint },
          { name: "T3_ACP_MCP_AUTHORIZATION", value: session.authorizationHeader },
        ],
      },
    ],
    acpServers: [{ type: "acp", name: "t3-code", serverId: "t3-code" }],
    httpServers:
      mcpOverHttp === true
        ? [
            {
              type: "http",
              name: "t3-code",
              url: session.endpoint,
              headers: [
                { name: "Authorization", value: session.authorizationHeader },
                ...(deferMcpTools === true
                  ? [{ name: McpProviderSession.MCP_TOOL_EXPOSURE_HEADER, value: "deferred" }]
                  : []),
              ],
            },
          ]
        : [],
    endpoint: session.endpoint,
    authorization: session.authorizationHeader,
    processEnvironment: {
      // The thread id every process the agent starts inherits, so a tool run
      // from its shell can find its T3 thread. Claude and Codex sessions set
      // the same variable (PortScanner.AGENT_THREAD_ENV; a string literal here
      // because this package cannot reach apps/server).
      T3CODE_THREAD_ID: session.threadId,
      T3_ACP_MCP_ENDPOINT: session.endpoint,
      T3_ACP_MCP_AUTHORIZATION: session.authorizationHeader,
      T3_ACP_MCP_NODE: self.command,
      ...(self.entrypoint === undefined ? {} : { T3_ACP_MCP_ENTRYPOINT: self.entrypoint }),
      ...(callLauncher === undefined ? {} : { T3_ACP_MCP_CALL: callLauncher }),
    },
  };
}

export function acpMcpActivation(context: AcpMcpContext) {
  return {
    mcpServers: context.servers,
    acpMcpServers: context.acpServers,
    httpMcpServers: context.httpServers,
  };
}

export function nativeThreadId(
  driver: ProviderDriverKind,
  thread: OrchestrationV2ProviderThread,
): Effect.Effect<string, ProviderAdapter.ProviderAdapterProtocolError> {
  const id = thread.nativeThreadRef?.nativeId;
  if (id === null || id === undefined || id.trim().length === 0) {
    return Effect.fail(
      new ProviderAdapter.ProviderAdapterProtocolError({
        driver,
        detail: `Provider thread ${thread.id} is missing its ACP session id`,
      }),
    );
  }
  return Effect.succeed(id);
}

export function makeProviderThread(input: {
  readonly driver: ProviderDriverKind;
  readonly providerInstanceId: ProviderInstanceId;
  readonly idAllocator: IdAllocator.IdAllocatorV2["Service"];
  readonly appThreadId: OrchestrationV2ProviderThread["appThreadId"];
  readonly providerSessionId: OrchestrationV2ProviderThread["providerSessionId"];
  readonly nativeThreadId: string;
  readonly ownerNodeId?: OrchestrationV2ProviderThread["ownerNodeId"];
  readonly forkedFrom?: OrchestrationV2ProviderThread["forkedFrom"];
  readonly itemIdentityVersion?: 2;
  readonly now: DateTime.Utc;
}): OrchestrationV2ProviderThread {
  return {
    id: input.idAllocator.derive.providerThread({
      driver: input.driver,
      providerInstanceId: input.providerInstanceId,
      nativeThreadId: input.nativeThreadId,
    }),
    driver: input.driver,
    providerInstanceId: input.providerInstanceId,
    providerSessionId: input.providerSessionId,
    appThreadId: input.appThreadId,
    ownerNodeId: input.ownerNodeId ?? null,
    nativeThreadRef: {
      driver: input.driver,
      nativeId: input.nativeThreadId,
      strength: "strong",
    },
    nativeConversationHeadRef: null,
    status: "idle",
    firstRunOrdinal: null,
    lastRunOrdinal: null,
    handoffIds: [],
    forkedFrom: input.forkedFrom ?? null,
    contextUsage: null,
    nativeMetadata:
      input.itemIdentityVersion === undefined
        ? null
        : { itemIdentityVersion: input.itemIdentityVersion },
    createdAt: input.now,
    updatedAt: input.now,
  };
}

/** Stop reasons where the agent ended without finishing. ACP asks clients to show refusals. */
export function acpUnfinishedStopMessage(
  stopReason: EffectAcpSchema.StopReason | null | undefined,
): string | undefined {
  switch (stopReason) {
    case "refusal":
      return "The agent refused this request. The agent's next turn won't include this message or its reply.";
    case "max_tokens":
      return "The agent stopped because its reply reached the output token limit.";
    case "max_turn_requests":
      return "The agent stopped because it reached its request limit for this turn.";
    default:
      return undefined;
  }
}

export function appendToolContentText(content: unknown, text: string): unknown[] {
  const next: unknown[] = Array.isArray(content) ? [...content] : [];
  const last = unknownRecord(next.at(-1));
  const lastContent = unknownRecord(last?.content);
  if (
    last?.type === "content" &&
    lastContent?.type === "text" &&
    typeof lastContent.text === "string"
  ) {
    next[next.length - 1] = {
      ...last,
      content: { ...lastContent, text: `${lastContent.text}${text}` },
    };
  } else {
    next.push({ type: "content", content: { type: "text", text } });
  }
  return next;
}

export function acpMcpToolCallOutput(rawOutput: unknown): unknown {
  const record = unknownRecord(rawOutput);
  if (record === undefined) return rawOutput;
  if (!("result" in record) && !("error" in record)) return rawOutput;
  const result = unknownRecord(record.result);
  const resultOutput = result === undefined ? undefined : mcpToolResultOutput(result);
  const errorMessage = unknownRecord(record.error)?.message;
  if (typeof errorMessage !== "string") {
    return resultOutput ?? rawOutput;
  }
  return resultOutput === undefined
    ? { error: errorMessage }
    : { error: errorMessage, result: resultOutput };
}

export function nonEmptyText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

export function decodeByteText(value: unknown): string | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  if (!value.every((entry) => typeof entry === "number" && Number.isInteger(entry))) {
    return undefined;
  }
  try {
    const text = new TextDecoder().decode(Uint8Array.from(value as number[]));
    return text.length > 0 ? text : undefined;
  } catch {
    return undefined;
  }
}

export function textFromUnknown(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value;
  }
  const fromBytes = decodeByteText(value);
  if (fromBytes !== undefined) {
    return fromBytes;
  }
  if (Array.isArray(value)) {
    const parts = value.flatMap((entry) => {
      const text = textFromUnknown(entry);
      return text === undefined || text.length === 0 ? [] : [text];
    });
    return parts.length === 0 ? undefined : parts.join("\n");
  }
  const record = unknownRecord(value);
  if (record === undefined) {
    return undefined;
  }
  for (const key of [
    "output_for_prompt",
    "stdout",
    "stderr",
    "output",
    "combinedOutput",
    "combined_output",
    "content",
    "text",
    "message",
  ]) {
    const direct = record[key];
    if (typeof direct === "string" && direct.length > 0) {
      return direct;
    }
    const decoded = decodeByteText(direct);
    if (decoded !== undefined) {
      return decoded;
    }
    const text = textFromUnknown(direct);
    if (text !== undefined && text.length > 0) {
      return text;
    }
  }
  const result = unknownRecord(record.Result) ?? unknownRecord(record.result);
  if (result !== undefined) {
    return textFromUnknown(result);
  }
  return undefined;
}

export function commandExitCode(value: unknown): number | undefined {
  const record = unknownRecord(value);
  for (const key of ["exitCode", "exit_code", "code"]) {
    const candidate = record?.[key];
    if (typeof candidate === "number" && Number.isInteger(candidate)) {
      return candidate;
    }
  }
  return undefined;
}

/**
 * Mid-stream Grok Bash re-reports carry exit_code 0 while still in progress;
 * interrupted tools must not retain that stale success code.
 */
export function acpProjectedCommandExitCode(
  status: "pending" | "running" | "waiting" | "completed" | "failed" | "interrupted",
  rawOutput: unknown,
): number | undefined {
  if (status !== "completed" && status !== "failed") {
    return undefined;
  }
  return commandExitCode(rawOutput);
}

export function structuredFileChanges(toolCall: AcpToolCallState) {
  const content = toolCall.data.content;
  if (!Array.isArray(content)) return [];
  return content.flatMap((entry) => {
    const diff = unknownRecord(entry);
    if (diff?.type !== "diff" || !Array.isArray(diff.changes)) return [];
    return diff.changes.flatMap((candidate) => {
      const change = unknownRecord(candidate);
      const operation = typeof change?.operation === "string" ? change.operation.trim() : "";
      const path = typeof change?.path === "string" ? change.path.trim() : "";
      if (operation.length === 0 || path.length === 0) return [];
      const oldPath = typeof change?.oldPath === "string" ? change.oldPath.trim() : "";
      const fileType = typeof change?.fileType === "string" ? change.fileType.trim() : "";
      const mimeType = typeof change?.mimeType === "string" ? change.mimeType.trim() : "";
      return [
        {
          operation,
          path,
          ...(oldPath.length === 0 ? {} : { oldPath }),
          ...(fileType.length === 0 ? {} : { fileType }),
          ...(mimeType.length === 0 ? {} : { mimeType }),
        },
      ];
    });
  });
}

// Bound diff search to protect the event loop; empty-sided diffs need no search.
export const ACP_V1_DIFF_MAX_EDITS = 1_000;

/**
 * A `snippet` patch has no known location. Keep its recorded text, so no view numbers it
 * from line 1.
 */
export function acpToolCallSnippetEdit(content: unknown) {
  if (!Array.isArray(content)) return undefined;
  const diffs = content.flatMap((entry) => {
    const diff = unknownRecord(entry);
    return diff?.type === "diff" ? [diff] : [];
  });
  const diff = diffs.length === 1 ? diffs[0] : undefined;
  if (diff === undefined || unknownRecord(diff.patch)?.format !== "snippet") return undefined;
  return typeof diff.oldText === "string" && typeof diff.newText === "string"
    ? { oldStr: diff.oldText, newStr: diff.newText }
    : undefined;
}

/**
 * No preview when a flavor marked a diff `omitted` (too large) or `snippet` (line unknown);
 * the checkpoint diff shows it.
 */
export function acpToolCallDiffUnpreviewable(content: unknown): boolean {
  return (
    Array.isArray(content) &&
    content.some((entry) => {
      const format = unknownRecord(unknownRecord(entry)?.patch)?.format;
      return format === "omitted" || format === "snippet";
    })
  );
}

export function acpToolCallDiffPatch(content: unknown): string | undefined {
  if (!Array.isArray(content) || acpToolCallDiffUnpreviewable(content)) {
    return undefined;
  }
  const diffs = content.flatMap((entry) => {
    const diff = unknownRecord(entry);
    return diff?.type === "diff" ? [diff] : [];
  });
  const patches = diffs.flatMap((diff): ReadonlyArray<{ text: string; path?: string }> => {
    const patch = unknownRecord(diff.patch);
    if (typeof patch?.text === "string") {
      const change =
        Array.isArray(diff.changes) && diff.changes.length === 1
          ? unknownRecord(diff.changes[0])
          : undefined;
      if (
        patch.format === "git_patch" &&
        patch.text.trimStart().startsWith("@@ ") &&
        typeof change?.path === "string"
      ) {
        const oldPath = typeof change.oldPath === "string" ? change.oldPath : change.path;
        const before = change.operation === "add" ? "/dev/null" : JSON.stringify(`a/${oldPath}`);
        const after =
          change.operation === "delete" ? "/dev/null" : JSON.stringify(`b/${change.path}`);
        return [
          {
            text: `diff --git ${JSON.stringify(`a/${oldPath}`)} ${JSON.stringify(`b/${change.path}`)}\n--- ${before}\n+++ ${after}\n${patch.text.trimStart()}`,
          },
        ];
      }
      return [{ text: patch.text }];
    }
    if (typeof diff.path !== "string" || typeof diff.newText !== "string") return [];
    const oldText = typeof diff.oldText === "string" ? diff.oldText : undefined;
    const structured = structuredPatch(
      oldText === undefined ? "/dev/null" : diff.path,
      diff.path,
      oldText ?? "",
      diff.newText,
      undefined,
      undefined,
      {
        context: 3,
        maxEditLength: oldText && diff.newText ? ACP_V1_DIFF_MAX_EDITS : Number.POSITIVE_INFINITY,
      },
    );
    return structured === undefined || structured.hunks.length === 0
      ? []
      : [{ text: formatPatch(structured, FILE_HEADERS_ONLY), path: diff.path }];
  });
  // Diff parsers split at Git headers once one exists, so every section then needs its own.
  const hasGitHeader = patches.some(({ text }) => /^diff --git /m.test(text));
  return patches.length === 0
    ? undefined
    : patches
        .map(({ text, path }) =>
          hasGitHeader && path !== undefined
            ? `diff --git ${JSON.stringify(`a/${path}`)} ${JSON.stringify(`b/${path}`)}\n${text}`
            : text,
        )
        .join("\n");
}

export function resolvedPathInfo(
  toolCall: AcpToolCallState,
): { readonly path: string; readonly fromQuery: boolean } | undefined {
  const locations = toolCall.data.locations;
  if (Array.isArray(locations)) {
    for (const location of locations) {
      const path = unknownRecord(location)?.path;
      if (typeof path === "string" && path.trim().length > 0) {
        return { path: path.trim(), fromQuery: false };
      }
    }
  }
  const rawInput = unknownRecord(toolCall.data.rawInput);
  for (const key of ["path", "filePath", "file_path", "url"]) {
    const candidate = rawInput?.[key];
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return { path: candidate.trim(), fromQuery: false };
    }
  }
  for (const key of ["query", "pattern"]) {
    const candidate = rawInput?.[key];
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return { path: candidate.trim(), fromQuery: true };
    }
  }
  return undefined;
}

export function pathFromToolCall(toolCall: AcpToolCallState): string | undefined {
  return resolvedPathInfo(toolCall)?.path;
}

export function acpBackendWebSearch(
  rawInput: Record<string, unknown> | undefined,
  rawOutput: unknown,
  title?: string | null,
):
  | { readonly query: string | undefined; readonly results: OrchestrationV2WebSearchResult[] }
  | undefined {
  const variant = typeof rawInput?.variant === "string" ? rawInput.variant.toLowerCase() : "";
  const rawOutputRecord = unknownRecord(rawOutput);
  const action = unknownRecord(rawOutputRecord?.action);
  const isWebSearchTitle =
    /^\s*(?:web search|search the web|(?:run(?:ning)?\s+)?(?:web_search|search_web)\s*$)/iu.test(
      title ?? "",
    );
  const isWebSearchVariant = [
    "xsearch",
    "websearch",
    "web_search",
    "search_web",
    "web-search",
  ].includes(variant);
  if (!isWebSearchVariant && action?.type !== "search" && !isWebSearchTitle) {
    return undefined;
  }
  let args: Record<string, unknown> | undefined;
  if (typeof rawOutputRecord?.input === "string") {
    try {
      args = unknownRecord(JSON.parse(rawOutputRecord.input));
    } catch {
      args = undefined;
    }
  }
  const argsText = Object.entries(args ?? {})
    .filter(([, value]) => typeof value === "string" || typeof value === "number")
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
  const query = [
    action?.query,
    args?.query,
    rawInput?.query,
    rawInput?.search_query,
    rawInput?.q,
    argsText,
  ]
    .find((value): value is string => typeof value === "string" && value.trim().length > 0)
    ?.trim();
  const urls = new Set<string>();
  for (const source of Array.isArray(action?.sources) ? action.sources : []) {
    const url = unknownRecord(source)?.url;
    if (typeof url === "string" && url.trim().length > 0) urls.add(url.trim());
  }
  if (urls.size === 0) {
    for (const match of textFromUnknown(rawOutput)?.matchAll(/https?:\/\/[^\s<>"]+/gu) ?? []) {
      urls.add(trimCitationUrl(match[0]));
    }
  }
  return { query, results: [...urls].map((url) => ({ url })) };
}

// Prose citations end in punctuation or a closing bracket that is not part of the URL.
export function trimCitationUrl(raw: string): string {
  let url = raw;
  for (;;) {
    const trimmed = url.replace(/[.,;:]+$/u, "");
    const close = trimmed.at(-1);
    const open = close === ")" ? "(" : close === "]" ? "[" : undefined;
    if (open && close && trimmed.split(open).length < trimmed.split(close).length) {
      url = trimmed.slice(0, -1);
    } else if (trimmed === url) {
      return url;
    } else {
      url = trimmed;
    }
  }
}

export function providerRequestKind(kind: string | "unknown"): ProviderRequestKind {
  switch (kind) {
    case "execute":
      return "command";
    case "read":
    case "search":
    case "fetch":
      return "file-read";
    case "edit":
    case "delete":
    case "move":
      return "file-change";
    default:
      return "command";
  }
}

export function toolStatus(
  status: AcpToolCallState["status"],
): "pending" | "running" | "waiting" | "completed" | "failed" {
  switch (status) {
    case "completed":
      return "completed";
    case "failed":
      return "failed";
    case "pending":
      return "pending";
    case "requiresAction":
      return "waiting";
    default:
      return "running";
  }
}

export type ProjectedToolStatus = ReturnType<typeof toolStatus> | "interrupted";

/**
 * Some agents answer Stop's `session/cancel` by failing the tools and subagents
 * that were running (Kiro: "Tool execution was cancelled by the user."). After
 * Stop, a failure is shown as the interruption it was.
 */
export function stoppedToolStatus(
  turn: Pick<ActiveAcpTurn, "interrupted">,
  tool: AcpToolCallState,
): "interrupted" | undefined {
  return turn.interrupted && tool.status === "failed" ? "interrupted" : undefined;
}

export function nodeStatus(status: ProjectedToolStatus): OrchestrationV2ExecutionNode["status"] {
  return status === "pending" ? "running" : status;
}

export function completedAtForStatus(
  status: ProjectedToolStatus,
  now: DateTime.Utc,
): DateTime.Utc | null {
  return status === "completed" || status === "failed" || status === "interrupted" ? now : null;
}

// Copilot advertises URL ids such as `https://agentclientprotocol.com/protocol/session-modes#plan`.
export function isAcpPlanModeId(id: string): boolean {
  const name = id.slice(id.lastIndexOf("#") + 1);
  return name === "plan" || name === "architect";
}

export function selectPermissionOptionId(
  request: EffectAcpSchema.RequestPermissionRequest,
  decision: Exclude<ProviderApprovalDecision, "cancel">,
): string | undefined {
  const optionIdOfKind = (kind: EffectAcpSchema.PermissionOption["kind"]) =>
    request.options.find((option) => option.kind === kind)?.optionId;
  if (decision === "acceptForSession") {
    // Agents may offer only allow_once, and answering "cancelled" would stop the turn the user approved.
    return optionIdOfKind("allow_always") ?? optionIdOfKind("allow_once");
  }
  return optionIdOfKind(decision === "accept" ? "allow_once" : "reject_once");
}

// Prefer allow-once; allow-always can persist beyond the session.
export function selectAutoApprovedPermissionOption(
  request: EffectAcpSchema.RequestPermissionRequest,
): string | undefined {
  return (
    selectPermissionOptionId(request, "accept") ??
    selectPermissionOptionId(request, "acceptForSession")
  );
}

export interface ActiveTextSegment {
  readonly nativeItemId: string;
  readonly startedAt: DateTime.Utc;
  sourceMessageId: string | null;
  text: string;
  // The running node and first text have been emitted.
  emitted: boolean;
  // Text changed since the last emission; a delayed flush is scheduled.
  dirty: boolean;
}

export interface ActiveTextStream {
  current: ActiveTextSegment | null;
  nextSegment: number;
  readonly closedNamedSegments: Map<string, ActiveTextSegment>;
}

export interface AcpNativeBuildConfiguration {
  readonly modeId?: string;
  readonly configOptions: ReadonlyArray<{ readonly id: string; readonly value: string }>;
}

export interface ActiveAcpTurn {
  readonly input: ProviderAdapter.ProviderAdapterV2TurnInput;
  readonly providerTurnId: OrchestrationV2ProviderTurn["id"];
  readonly nativeThreadId: string;
  readonly nativeTurnId: string;
  readonly startedAt: DateTime.Utc;
  readonly completed: Deferred.Deferred<void, never>;
  readonly itemOrdinals: Map<string, number>;
  readonly outgoingPrompt?: ReadonlyArray<EffectAcpSchema.ContentBlock> | undefined;
  appContextOffered?: ReadonlyMap<string, string> | undefined;
  readonly appContextCommittedSequence: Map<string, number>;
  appContextSequence: number;
  consumedPromptMessageId?: string;
  readonly user: ActiveTextStream;
  readonly assistant: ActiveTextStream;
  readonly reasoning: ActiveTextStream;
  providerRetry?:
    | {
        readonly failure: OrchestrationV2ProviderFailure;
        readonly retry: OrchestrationV2ProviderRetry;
        readonly startedAt: DateTime.Utc;
        readonly itemOrdinal: number;
      }
    | undefined;
  contextUsage: ThreadTokenUsageSnapshot | null;
  nativeMetadata: OrchestrationV2ProviderThreadNativeMetadata | null;
  readonly tools: Map<string, AcpToolCallState & { readonly backgroundCommandTaskId?: string }>;
  /** Confirmed T3 MCP tool outputs keyed by `${toolCallId}\0${tool}\0${inputHash}`. */
  readonly claimedToolResults: Map<string, unknown>;
  /** `${toolCallId}\0${tool}\0${inputHash}` keys that already drained a recorded MCP result. */
  readonly drainedToolResultKeys: Set<string>;
  /** `${toolCallId}\0${tool}\0${inputHash}` keys that reached terminal failure and must never do input-only recovery. */
  readonly blockedInputRecoveryKeys: Set<string>;
  /** `${toolCallId}\0${tool}\0${inputHash}` keys already tried for input-only recovery. */
  readonly attemptedInputRecoveryKeys: Set<string>;
  /** Tools the agent failed after Stop; later updates keep them interrupted. */
  readonly stoppedToolCallIds: Set<string>;
  readonly toolUpdatesSkipped: Map<string, number>;
  readonly toolStartedAt: Map<string, DateTime.Utc>;
  readonly subagents: Map<string, ActiveAcpSubagent>;
  readonly subagentsBySessionId: Map<string, ActiveAcpSubagent>;
  readonly pendingSubagentNotifications: Map<string, Array<EffectAcpSchema.SessionNotification>>;
  readonly toolCallIdsByBackgroundTaskId: Map<string, string>;
  /** Command ACKs register null; terminal results wait here for prompt settlement. */
  readonly backgroundCommands: Map<
    string,
    { readonly status: "completed" | "failed"; readonly output?: string } | null
  >;
  readonly persistentBackgroundTaskIds: Set<string>;
  /** Monitor end notices lack output; wait for hydration or the safety timeout. */
  readonly awaitingBackgroundHydration: Set<string>;
  readonly pendingInjectedReport: Set<string>;
  /** Reports can precede monitor end notices; consume their completion marker without re-arming. */
  earlyInjectedReportObserved: boolean;
  readonly plans: Map<
    string,
    {
      readonly id: OrchestrationV2PlanArtifact["id"];
      readonly startedAt: DateTime.Utc;
      /** The turn that first reported the plan; later turns update its rows. */
      readonly origin: {
        readonly runId: ActiveAcpTurn["input"]["runId"];
        readonly rootNodeId: ActiveAcpTurn["input"]["rootNodeId"];
        readonly providerThreadId: ActiveAcpTurn["input"]["providerThread"]["id"];
        readonly providerTurnId: ActiveAcpTurn["providerTurnId"];
        readonly nativeItemId: string;
        readonly ordinal: number;
      };
      latest: OrchestrationV2PlanArtifact | null;
    }
  >;
  interrupted: boolean;
  finalized: boolean;
  finalizedStatus: "completed" | "interrupted" | "failed" | "cancelled" | null;
  promptSettled: boolean;
  promptSettledStatus: "completed" | "interrupted" | "failed" | "cancelled" | null;
  workAccepted: boolean;
  /** Settles with the turn's latest prompt; a prompt-steer replaces a settled one. */
  promptWireSettled: Deferred.Deferred<void, never>;
  /** Completed once `session/prompt` is the runtime's active prompt. */
  readonly promptDispatched: Deferred.Deferred<void, never>;
  /** Frees the runtime for the next prompt while the agent still holds this one's response. */
  foregroundIdle: Deferred.Deferred<void>;
  /** Counts the turn's prompts; only the latest one settles the turn. */
  promptSequence: number;
  /** The turn already resent a prompt after a resumable outcome failure. */
  outcomeResumed: boolean;
  /** Clock millis just before `session/prompt` was handed to the runtime. */
  promptSentAt: number | null;
  /** Completed when an update after dispatch matches `cancelAfterPromptStarts.isStart`. */
  readonly promptStarted: Deferred.Deferred<void, never>;
  promptUsage: EffectAcpSchema.Usage | undefined;
  backgroundFinalizeGeneration: number;
  /** `replyEndsWithUsageUpdate`: output arrived and its closing `usage_update` has not. */
  replyOpen: boolean;
  /** The agent's own id for this turn's prompt, from `forkFromTurn.nativeTurnId`. */
  nativePromptId: string | undefined;
  /** Clock millis of the prompt's last progress, for `promptInactivityTimeout`. */
  lastProgressAt: number;
  inactivityWatchdog: Fiber.Fiber<void> | undefined;
}

export const PROMPT_OUTCOME_CHECK_TIMEOUT = Duration.seconds(5);

export type PromptOutcomeCheck = Effect.Success<
  ReturnType<NonNullable<AcpAdapterV2Flavor["watchPromptOutcome"]>>
>;

export type AcpRuntimeTeardownState =
  | { readonly _tag: "Idle" }
  | {
      readonly _tag: "InProgress";
      readonly completed: Deferred.Deferred<void, ProviderAdapter.ProviderAdapterProtocolError>;
    }
  | { readonly _tag: "Failed"; readonly error: ProviderAdapter.ProviderAdapterProtocolError };

export function acpRootSessionUpdateIngestsOutput(
  notification: EffectAcpSchema.SessionNotification,
): boolean {
  const update = notification.update;
  switch (update.sessionUpdate) {
    case "agent_message_chunk":
    case "agent_thought_chunk":
      return (acpContentBlockDisplayText(update.content)?.length ?? 0) > 0;
    case "agent_message":
    case "agent_thought":
      return (update.content ?? []).some(
        (content) => (acpContentBlockDisplayText(content)?.length ?? 0) > 0,
      );
    case "tool_call":
    case "tool_call_update":
    case "plan":
    case "plan_update":
    case "plan_removed":
    case "compaction_update":
    case "compaction_summary_chunk":
      return parseSessionUpdateEvent(notification).events.some(
        (event) => event._tag === "ToolCallUpdated" || event._tag === "PlanUpdated",
      );
    default:
      return false;
  }
}

/** Monitor wakes arrive as their own chunk led by a tagged `<monitor-event task_id=…>`; bare mentions are content. */
export const acpIsMonitorChatter = (text: string) =>
  /^\s*(?:<monitor-event\s|Monitor\s+["']?[0-9a-f-]{8,}["']?\s+ended)/i.test(text);

export function acpPostSettleWakeEvidence(
  notification: EffectAcpSchema.SessionNotification,
  flavor: Pick<AcpAdapterV2Flavor, "extractBackgroundToolMutation"> = {},
): boolean {
  if (!acpRootSessionUpdateIngestsOutput(notification)) return false;
  const update = notification.update;
  if (
    (update.sessionUpdate === "user_message_chunk" ||
      update.sessionUpdate === "agent_message_chunk") &&
    update.content.type === "text"
  ) {
    const text = update.content.text;
    if ((flavor.extractBackgroundToolMutation?.(text) ?? []).length > 0) return false;
    if (update.sessionUpdate === "agent_message_chunk" && text.trim().length === 0) return false;
    if (acpIsMonitorChatter(text)) return false;
  }
  return true;
}

/** Still-running tool updates can outlast the quiet window; they must not offer completion wakes. */
export function acpPostSettleContinuationOfferEvidence(
  notification: EffectAcpSchema.SessionNotification,
  flavor: Pick<AcpAdapterV2Flavor, "extractBackgroundToolMutation" | "normalizeToolCall"> = {},
): boolean {
  if (!acpPostSettleWakeEvidence(notification, flavor)) {
    return false;
  }
  const update = notification.update;
  if (update.sessionUpdate === "agent_message_chunk") {
    return (acpContentBlockDisplayText(update.content)?.trim().length ?? 0) > 0;
  }
  if (update.sessionUpdate === "tool_call" || update.sessionUpdate === "tool_call_update") {
    return parseSessionUpdateEvent(notification).events.some((event) => {
      if (event._tag !== "ToolCallUpdated") return false;
      // Grok monitor start ACKs say completed while the task is still running.
      const toolCall = flavor.normalizeToolCall?.(event.toolCall) ?? event.toolCall;
      return toolCall.status === "completed" || toolCall.status === "failed";
    });
  }
  return false;
}

export function acpPostSettleWakeShouldBuffer(
  notification: EffectAcpSchema.SessionNotification,
  backgroundWorkRunning: boolean,
): boolean {
  if (!backgroundWorkRunning) return true;
  const update = notification.update;
  return (
    update.sessionUpdate !== "agent_message_chunk" && update.sessionUpdate !== "agent_thought_chunk"
  );
}

/**
 * An app-owned wake (a delegated child finishing) is injected by the
 * orchestrator, not typed by the user. It reports on a sibling child and says
 * nothing about this session's own pending wake frames, so it must not discard
 * them the way a real user turn does.
 */
export function acpIsAppOwnedWakeTurn(message: {
  readonly createdBy: string;
  readonly creationSource: string;
}): boolean {
  return message.createdBy === "agent" && message.creationSource === "server";
}

export function acpIsProviderContinuationMessage(message: {
  readonly createdBy: string;
  readonly creationSource: string;
}): boolean {
  return message.createdBy === "agent" && message.creationSource === "provider";
}

export function acpCarryoverTerminalShouldClearContinuation(input: {
  readonly continuationOffered: boolean;
  readonly wakeBufferLength: number;
}): boolean {
  return !input.continuationOffered && input.wakeBufferLength === 0;
}

export function acpTurnStartShouldPreserveContinuation(input: {
  readonly continuationRequested: boolean;
  readonly isContinuationTurn: boolean;
  readonly wakeBufferLength: number;
}): boolean {
  return !input.isContinuationTurn && input.continuationRequested && input.wakeBufferLength > 0;
}

export function acpPostSettleMonitorPromptShouldSuppress(
  mutation:
    | {
        readonly taskId: string;
        readonly status: "running" | "completed" | "failed";
      }
    | undefined,
): boolean {
  return mutation?.status === "running";
}

export function acpCompletedTurnShouldTerminalizeTool(
  tool: AcpToolCallState & { readonly backgroundCommandTaskId?: string },
  flavor: Pick<AcpAdapterV2Flavor, "extractBackgroundTaskId" | "extractSubagentUpdate">,
): boolean {
  const status = toolStatus(tool.status);
  if (status !== "pending" && status !== "running") return false;
  // Progress output replaces the start ACK, so the registered task id outlives it.
  if (tool.backgroundCommandTaskId !== undefined) return false;
  if (flavor.extractBackgroundTaskId?.(tool) !== undefined) return false;
  return flavor.extractSubagentUpdate?.(tool) === undefined;
}

export interface ActiveAcpSubagent {
  task: OrchestrationV2Subagent;
  readonly rootSessionId: string;
  readonly childThreadId: ThreadId;
  readonly childRootNodeId: OrchestrationV2ExecutionNode["id"];
  readonly turnItemId: OrchestrationV2TurnItem["id"];
  turnItemOrdinal: number;
  providerTurnId: OrchestrationV2ProviderTurn["id"];
  readonly parentProviderThreadId: ProviderThreadId;
  childSessionId: string | null;
  assistantText: string;
  readonly assistantMessages: Map<string, string>;
  // Messages whose latest text waits for a delayed flush.
  readonly pendingAssistantMessages: Set<string>;
  readonly childItemOrdinals: Map<string, number>;
  nextChildOrdinal: number;
  terminalStatusProjected: boolean;
  readonly toolState: Pick<ActiveAcpTurn, "tools" | "toolUpdatesSkipped" | "toolStartedAt">;
  // ACP has no interrupted tool status; keep forced interruption across late updates.
  readonly interruptedToolIds: Set<string>;
  readonly toolSessionIds: Map<string, string>;
  readonly transcriptEntryFingerprints: Map<string, string>;
  readonly transcriptStartedAt: Map<string, DateTime.Utc>;
  readonly transcriptOpenEntries: Map<string, AcpSubagentTranscriptEntry>;
  readonly lastTranscriptEntryKinds: Map<string, AcpSubagentTranscriptEntry["kind"]>;
  readonly transcriptDrainPermit: Semaphore.Semaphore;
  transcriptFollowerStop: Deferred.Deferred<void> | undefined;
  transcriptFollowerStarted: boolean;
  transcriptTrailingDrainStop: Deferred.Deferred<void> | undefined;
  transcriptTrailingDrainStarted: boolean;
}

export interface AcpNativeChildSession {
  parentSessionId: string | null;
  status: "running" | "completed" | "failed" | "cancelled";
  result: string | null;
  delegationId: string | null;
  prompt: string;
  subagent: ActiveAcpSubagent | undefined;
  owner: ActiveAcpTurn | undefined;
  readonly pending: Array<EffectAcpSchema.SessionNotification>;
}

export function acpSubagentTranscriptEntryFingerprint(entry: AcpSubagentTranscriptEntry): string {
  switch (entry.kind) {
    case "reasoning":
      return JSON.stringify([entry.kind, entry.status, entry.title ?? null, entry.text]);
    case "assistant_message":
    case "user_message":
      return JSON.stringify([entry.kind, entry.text]);
    case "error":
      return JSON.stringify([entry.kind, entry.message]);
    case "tool":
      return JSON.stringify([
        entry.kind,
        entry.projectedStatus ?? null,
        entry.toolCall.status ?? null,
        entry.toolCall.kind ?? null,
        entry.toolCall.title ?? null,
        entry.toolCall.command ?? null,
        entry.toolCall.data,
      ]);
  }
}

export const ACP_SUBAGENT_TRANSCRIPT_POLL_MS = [1_000, 2_000, 5_000] as const;
// A subagent can report idle to its parent before its transcript records the closing reply.
export const ACP_SUBAGENT_TRAILING_DRAIN_POLL_MS = [
  500, 1_000, 1_500, 2_000, 2_000, 3_000, 4_000, 5_000, 5_000, 6_000,
] as const;

export function buildAcpStandardToolTurnItem(input: {
  readonly base: {
    readonly id: OrchestrationV2TurnItem["id"];
    readonly threadId: ThreadId;
    readonly runId: OrchestrationV2TurnItem["runId"];
    readonly nodeId: OrchestrationV2TurnItem["nodeId"];
    readonly providerThreadId: ProviderThreadId | null;
    readonly providerTurnId: OrchestrationV2TurnItem["providerTurnId"];
    readonly nativeItemRef: OrchestrationV2TurnItem["nativeItemRef"];
    readonly parentItemId: null;
    readonly ordinal: number;
    readonly status: ProjectedToolStatus;
    readonly title: string | null;
    readonly startedAt: DateTime.Utc;
    readonly completedAt: DateTime.Utc | null;
    readonly updatedAt: DateTime.Utc;
  };
  readonly toolCall: AcpToolCallState;
  readonly status: ProjectedToolStatus;
  readonly title: string | null;
  readonly rawInput: unknown;
  readonly rawInputRecord: Record<string, unknown> | undefined;
  readonly rawOutput: unknown;
  readonly changes: ReturnType<typeof structuredFileChanges>;
  readonly path: string | undefined;
  readonly diffText: string | undefined;
  readonly monitorCommand: string | undefined;
  readonly projectAsCommandExecution: boolean;
  readonly inputVariant: string;
}): OrchestrationV2TurnItem {
  const {
    base,
    toolCall,
    status,
    title,
    rawInput,
    rawInputRecord,
    rawOutput,
    changes,
    path,
    diffText,
    monitorCommand,
    projectAsCommandExecution,
    inputVariant,
  } = input;
  if (changes.length > 0) {
    return {
      ...base,
      type: "file_change",
      fileName: changes[0]!.path,
      changes,
      ...(diffText === undefined ? {} : { diffStr: diffText }),
    };
  }
  switch (toolCall.kind) {
    case "read":
      return {
        ...base,
        title: path ? formatReadToolLabel(path) : (title ?? "Read file"),
        type: "dynamic_tool",
        toolName: "Read",
        ...(path !== undefined &&
        path.length <= 4096 &&
        !/[\r\n]/.test(path) &&
        isWorkspaceImagePreviewPath(path)
          ? { viewedImagePath: path }
          : {}),
        input:
          path === undefined ||
          ["path", "filePath", "file_path"].some((key) => rawInputRecord?.[key] === path)
            ? (rawInputRecord ?? {})
            : { ...rawInputRecord, path },
        ...(rawOutput === undefined ? {} : { output: rawOutput }),
      };
    case "search": {
      const backendSearch = acpBackendWebSearch(
        rawInputRecord,
        rawOutput,
        typeof toolCall.data.title === "string" ? toolCall.data.title : title,
      );
      if (backendSearch !== undefined) {
        const label = nonEmptyText(toolCall.data.title, title ?? "Web search")
          .replace(/:\s*$/u, "")
          // Antigravity titles the call "Running search_web".
          .replace(/^\s*(?:run(?:ning)?\s+)?(?:web_search|search_web)\s*$/iu, "Web search");
        return {
          ...base,
          title: backendSearch.query === undefined ? label : `${label}: ${backendSearch.query}`,
          type: "web_search",
          ...(backendSearch.query === undefined ? {} : { patterns: [backendSearch.query] }),
          ...(backendSearch.results.length === 0 ? {} : { results: backendSearch.results }),
        };
      }
      const pathIsQuery = resolvedPathInfo(toolCall)?.fromQuery === true;
      const searchOutput = textFromUnknown(rawOutput);
      const grepResults =
        path === undefined || searchOutput === undefined
          ? undefined
          : parseGrepOutput(searchOutput, path);
      const pattern = searchToolLabelParts({ input: rawInputRecord }).query ?? path;
      return {
        ...base,
        title:
          formatSearchToolLabel({
            rawInput: rawInputRecord,
            input: rawInputRecord,
            ...(path === undefined ? {} : { pattern: path }),
          }) ?? title,
        type: "file_search",
        ...(pattern === undefined ? {} : { pattern }),
        ...(path === undefined || (pathIsQuery && searchOutput === undefined)
          ? {}
          : {
              results: grepResults
                ? [...grepResults]
                : [
                    {
                      fileName: path,
                      ...(searchOutput === undefined ? {} : { preview: searchOutput }),
                    },
                  ],
            }),
      };
    }
    case "execute": {
      const exitCode = acpProjectedCommandExitCode(status, rawOutput);
      return {
        ...base,
        type: "command_execution",
        input: toolCall.command ?? monitorCommand ?? "",
        ...(textFromUnknown(rawOutput) === undefined ? {} : { output: textFromUnknown(rawOutput) }),
        ...(exitCode === undefined ? {} : { exitCode }),
      };
    }
    case "edit":
    case "delete":
    case "move": {
      const snippet = acpToolCallSnippetEdit(toolCall.data.content);
      const unpreviewable = acpToolCallDiffUnpreviewable(toolCall.data.content);
      return {
        ...base,
        type: "file_change",
        fileName: path ?? toolCall.title ?? "File change",
        ...(snippet ?? (unpreviewable || diffText === undefined ? {} : { diffStr: diffText })),
      };
    }
    case "fetch": {
      // Grok rawOutput.Content is unreadable by textFromUnknown; bounded content blocks duplicate it.
      const snippet = textFromUnknown(toolCall.data.content) ?? textFromUnknown(rawOutput);
      return {
        ...base,
        type: "web_search",
        ...(path === undefined ? {} : { patterns: [path] }),
        ...(path === undefined
          ? {}
          : {
              results: [
                {
                  url: path,
                  ...(snippet === undefined ? {} : { snippet }),
                },
              ],
            }),
      };
    }
    default:
      if (projectAsCommandExecution) {
        const exitCode = acpProjectedCommandExitCode(status, rawOutput);
        return {
          ...base,
          type: "command_execution",
          input: toolCall.command ?? monitorCommand ?? "",
          ...(textFromUnknown(rawOutput) === undefined
            ? {}
            : { output: textFromUnknown(rawOutput) }),
          ...(exitCode === undefined ? {} : { exitCode }),
          ...(inputVariant === "monitor" ? { monitor: true } : {}),
        };
      }
      return {
        ...base,
        type: "dynamic_tool",
        toolName: toolCall.title ?? toolCall.kind ?? null,
        input: rawInput ?? {},
        ...(rawOutput === undefined ? {} : { output: rawOutput }),
      };
  }
}

// Every child's transcript ends in a reply, so no closing reply is still to come.
export function subagentTranscriptRepliesSettled(subagent: ActiveAcpSubagent): boolean {
  const kinds = [...subagent.lastTranscriptEntryKinds.values()];
  return kinds.length > 0 && kinds.every((kind) => kind === "assistant_message");
}

export function acpSubagentStatusIsTerminal(status: OrchestrationV2Subagent["status"]): boolean {
  return (
    status === "completed" ||
    status === "failed" ||
    status === "interrupted" ||
    status === "cancelled" ||
    status === "idle"
  );
}

export function acpSubagentStatusBlocksTurnSettlement(
  status: OrchestrationV2Subagent["status"],
): boolean {
  return status === "running" || status === "pending";
}

export function acpSubagentHasPendingBackgroundWork(subagent: ActiveAcpSubagent): boolean {
  return (
    acpSubagentStatusBlocksTurnSettlement(subagent.task.status) || !subagent.terminalStatusProjected
  );
}

export type AcpCarryoverSubagents = {
  readonly sessionId: string;
  /** The root's subscriber keeps ingesting, so late child terminals can still project. */
  readonly projectsLateTerminals: boolean;
  readonly subagents: ReadonlyArray<ActiveAcpSubagent>;
};

export type PendingRuntimeRequest = {
  readonly generation: number;
  readonly nativeResponseAcknowledgement: Deferred.Deferred<void, EffectAcpErrors.AcpError>;
  readonly transportRequestId: string;
  readonly requestId: RuntimeRequestId;
  readonly runtimeRequest: OrchestrationV2RuntimeRequest;
  readonly node: OrchestrationV2ExecutionNode;
  readonly turnItem: OrchestrationV2TurnItem;
} & (
  | {
      readonly type: "approval";
      readonly decision: Deferred.Deferred<ProviderApprovalDecision>;
    }
  | {
      readonly type: "user_input";
      readonly answers: Deferred.Deferred<ProviderUserInputAnswers | null>;
    }
);

/** Writers update `order` and `messages` in place; readers copy them out. */
export interface SnapshotMessageState {
  readonly order: Array<string>;
  readonly messages: Map<string, OrchestrationV2ConversationMessage>;
  /** Messages loaded from thought chunks; `messages` stores them as assistant text. */
  readonly reasoningIds: ReadonlySet<OrchestrationV2ConversationMessage["id"]>;
  loadingRole: "user" | "assistant" | "thought" | null;
  loadingMessageId: string | null;
  loadingIndex: number;
}

export const emptySnapshotState = (): SnapshotMessageState => ({
  order: [],
  messages: new Map(),
  reasoningIds: new Set(),
  loadingRole: null,
  loadingMessageId: null,
  loadingIndex: 0,
});

/** How long a Stop waits for the agent to confirm before the user is offered Force stop. */
export const ACP_STOP_CONFIRM_TIMEOUT_MS = 10_000;
export const TOOL_UPDATE_PERSIST_EVERY = 10;

// Agents can resend whole calls while streaming arguments.
export function shouldPersistToolUpdate(
  context: Pick<ActiveAcpTurn, "toolUpdatesSkipped">,
  key: string,
  previous: AcpToolCallState | undefined,
  next: AcpToolCallState,
  reportedStatus: AcpToolCallState["status"],
): boolean {
  const skipped = context.toolUpdatesSkipped.get(key) ?? 0;
  const persist =
    reportedStatus === "completed" ||
    reportedStatus === "failed" ||
    previous === undefined ||
    previous.status !== next.status ||
    previous.title !== next.title ||
    toolCallVisibleOutputChanged(previous, next) ||
    skipped + 1 >= TOOL_UPDATE_PERSIST_EVERY;
  context.toolUpdatesSkipped.set(key, persist ? 0 : skipped + 1);
  return persist;
}
