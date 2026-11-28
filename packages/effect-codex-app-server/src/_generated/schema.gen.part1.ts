/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";

export type ServerNotification__ThreadClosedNotification = { readonly threadId: string };
export const ServerNotification__ThreadClosedNotification = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadClosedNotification" });

export type ServerNotification__ThreadRevertedNotification = { readonly threadId: string };
export const ServerNotification__ThreadRevertedNotification = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadRevertedNotification" });

export type ServerNotification__SkillsChangedNotification = { readonly [x: string]: Schema.Json };
export const ServerNotification__SkillsChangedNotification = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  description:
    "Notification emitted when watched local skill files change.\n\nTreat this as an invalidation signal and re-run `skills/list` with the client's current parameters when refreshed skill metadata is needed.",
  identifier: "ServerNotification__SkillsChangedNotification",
});

export type ServerNotification__ThreadNameUpdatedNotification = {
  readonly threadId: string;
  readonly threadName?: string | null;
};
export const ServerNotification__ThreadNameUpdatedNotification = Schema.Struct({
  threadId: Schema.String,
  threadName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__ThreadNameUpdatedNotification" });

export type ServerNotification__ThreadAttachmentOperation = "created" | "deleted";
export const ServerNotification__ThreadAttachmentOperation = Schema.Literals([
  "created",
  "deleted",
]).annotate({
  description: "The persisted attachment change represented by a notification.",
  identifier: "ServerNotification__ThreadAttachmentOperation",
});

export type ServerNotification__ThreadGoalStatus =
  | "active"
  | "paused"
  | "blocked"
  | "usageLimited"
  | "budgetLimited"
  | "complete";
export const ServerNotification__ThreadGoalStatus = Schema.Literals([
  "active",
  "paused",
  "blocked",
  "usageLimited",
  "budgetLimited",
  "complete",
]).annotate({ identifier: "ServerNotification__ThreadGoalStatus" });

export type ServerNotification__ThreadGoalClearedNotification = { readonly threadId: string };
export const ServerNotification__ThreadGoalClearedNotification = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadGoalClearedNotification" });

export type ServerNotification__ThreadQueueChangedNotification = { readonly threadId: string };
export const ServerNotification__ThreadQueueChangedNotification = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadQueueChangedNotification" });

export type ServerNotification__ProjectChangeType = "created" | "updated" | "deleted";
export const ServerNotification__ProjectChangeType = Schema.Literals([
  "created",
  "updated",
  "deleted",
]).annotate({ identifier: "ServerNotification__ProjectChangeType" });

export type ServerNotification__ThreadProjectUpdatedNotification = {
  readonly projectId: string | null;
  readonly threadId: string;
};
export const ServerNotification__ThreadProjectUpdatedNotification = Schema.Struct({
  projectId: Schema.Union([Schema.String, Schema.Null]),
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadProjectUpdatedNotification" });

export type ServerNotification__EnvironmentConnectionNotification = {
  readonly environmentId: string;
  readonly threadId: string;
};
export const ServerNotification__EnvironmentConnectionNotification = Schema.Struct({
  environmentId: Schema.String,
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__EnvironmentConnectionNotification" });

export type ServerNotification__ActivePermissionProfile = {
  readonly extends?: string | null;
  readonly id: string;
};
export const ServerNotification__ActivePermissionProfile = Schema.Struct({
  extends: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Parent profile identifier from the selected permissions profile's `extends` setting, when present.",
      }),
      Schema.Null,
    ]),
  ),
  id: Schema.String.annotate({
    description:
      "Identifier from `default_permissions` or the implicit built-in default, such as `:workspace` or a user-defined `[permissions.<id>]` profile.",
  }),
}).annotate({ identifier: "ServerNotification__ActivePermissionProfile" });

export type ServerNotification__AskForApproval =
  | "untrusted"
  | "on-request"
  | "never"
  | {
      readonly granular: {
        readonly mcp_elicitations: boolean;
        readonly request_permissions?: boolean;
        readonly rules: boolean;
        readonly sandbox_approval: boolean;
        readonly skill_approval?: boolean;
      };
    };
export const ServerNotification__AskForApproval = Schema.Union(
  [
    Schema.Literals(["untrusted", "on-request", "never"]),
    Schema.Struct({
      granular: Schema.Struct({
        mcp_elicitations: Schema.Boolean,
        request_permissions: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
        rules: Schema.Boolean,
        sandbox_approval: Schema.Boolean,
        skill_approval: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      }),
    }).annotate({ title: "GranularAskForApproval" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__AskForApproval" });

export type ServerNotification__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const ServerNotification__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "ServerNotification__ApprovalsReviewer",
});

export type ServerNotification__ModeKind = "plan" | "default";
export const ServerNotification__ModeKind = Schema.Literals(["plan", "default"]).annotate({
  description: "Initial collaboration mode to use when the TUI starts.",
  identifier: "ServerNotification__ModeKind",
});

export type ServerNotification__Personality = "none" | "friendly" | "pragmatic";
export const ServerNotification__Personality = Schema.Literals([
  "none",
  "friendly",
  "pragmatic",
]).annotate({
  description: "Deprecated: `friendly` and `pragmatic` no longer select a style.",
  identifier: "ServerNotification__Personality",
});

export type ServerNotification__NetworkAccess = "restricted" | "enabled";
export const ServerNotification__NetworkAccess = Schema.Literals([
  "restricted",
  "enabled",
]).annotate({ identifier: "ServerNotification__NetworkAccess" });

export type ServerNotification__ReasoningSummary = "auto" | "concise" | "detailed" | "none";
export const ServerNotification__ReasoningSummary = Schema.Union(
  [
    Schema.Literals(["auto", "concise", "detailed"]),
    Schema.Literal("none").annotate({ description: "Option to disable reasoning summaries." }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. See https://platform.openai.com/docs/guides/reasoning?api-mode=responses#reasoning-summaries",
  identifier: "ServerNotification__ReasoningSummary",
});

export type ServerNotification__TokenUsageBreakdown = {
  readonly cacheWriteInputTokens?: number;
  readonly cachedInputTokens: number;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly reasoningOutputTokens: number;
  readonly totalTokens: number;
};
export const ServerNotification__TokenUsageBreakdown = Schema.Struct({
  cacheWriteInputTokens: Schema.optionalKey(
    Schema.Number.annotate({ default: 0, format: "int64" }).check(
      Schema.isInt().annotate({ expected: "an integer" }),
    ),
  ),
  cachedInputTokens: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  inputTokens: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  outputTokens: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  reasoningOutputTokens: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  totalTokens: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
}).annotate({ identifier: "ServerNotification__TokenUsageBreakdown" });

export type ServerNotification__HookOutputEntryKind =
  | "warning"
  | "stop"
  | "feedback"
  | "context"
  | "error";
export const ServerNotification__HookOutputEntryKind = Schema.Literals([
  "warning",
  "stop",
  "feedback",
  "context",
  "error",
]).annotate({ identifier: "ServerNotification__HookOutputEntryKind" });

export type ServerNotification__HookEventName = string;
export const ServerNotification__HookEventName = Schema.String.annotate({
  identifier: "ServerNotification__HookEventName",
});

export type ServerNotification__HookExecutionMode = "sync" | "async";
export const ServerNotification__HookExecutionMode = Schema.Literals(["sync", "async"]).annotate({
  identifier: "ServerNotification__HookExecutionMode",
});

export type ServerNotification__HookHandlerType = "command" | "mcpTool" | "prompt" | "agent";
export const ServerNotification__HookHandlerType = Schema.Literals([
  "command",
  "mcpTool",
  "prompt",
  "agent",
]).annotate({ identifier: "ServerNotification__HookHandlerType" });

export type ServerNotification__HookScope = "thread" | "turn";
export const ServerNotification__HookScope = Schema.Literals(["thread", "turn"]).annotate({
  identifier: "ServerNotification__HookScope",
});

export type ServerNotification__HookSource =
  | "system"
  | "user"
  | "project"
  | "mdm"
  | "sessionFlags"
  | "plugin"
  | "cloudRequirements"
  | "cloudManagedConfig"
  | "legacyManagedConfigFile"
  | "legacyManagedConfigMdm"
  | "unknown";
export const ServerNotification__HookSource = Schema.Literals([
  "system",
  "user",
  "project",
  "mdm",
  "sessionFlags",
  "plugin",
  "cloudRequirements",
  "cloudManagedConfig",
  "legacyManagedConfigFile",
  "legacyManagedConfigMdm",
  "unknown",
]).annotate({ identifier: "ServerNotification__HookSource" });

export type ServerNotification__HookRunStatus =
  | "running"
  | "completed"
  | "failed"
  | "blocked"
  | "stopped";
export const ServerNotification__HookRunStatus = Schema.Literals([
  "running",
  "completed",
  "failed",
  "blocked",
  "stopped",
]).annotate({ identifier: "ServerNotification__HookRunStatus" });

export type ServerNotification__TurnDiffUpdatedNotification = {
  readonly diff: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__TurnDiffUpdatedNotification = Schema.Struct({
  diff: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  description:
    "Notification that the turn-level unified diff has changed. Contains the latest aggregated diff across all file changes in the turn.",
  identifier: "ServerNotification__TurnDiffUpdatedNotification",
});

export type ServerNotification__TurnPlanStepStatus = "pending" | "inProgress" | "completed";
export const ServerNotification__TurnPlanStepStatus = Schema.Literals([
  "pending",
  "inProgress",
  "completed",
]).annotate({ identifier: "ServerNotification__TurnPlanStepStatus" });

export type ServerNotification__GuardianCommandSource = "shell" | "unifiedExec";
export const ServerNotification__GuardianCommandSource = Schema.Literals([
  "shell",
  "unifiedExec",
]).annotate({ identifier: "ServerNotification__GuardianCommandSource" });

export type ServerNotification__NetworkApprovalProtocol =
  | "http"
  | "https"
  | "socks5Tcp"
  | "socks5Udp";
export const ServerNotification__NetworkApprovalProtocol = Schema.Literals([
  "http",
  "https",
  "socks5Tcp",
  "socks5Udp",
]).annotate({ identifier: "ServerNotification__NetworkApprovalProtocol" });

export type ServerNotification__FileSystemAccessMode = "read" | "write" | "deny";
export const ServerNotification__FileSystemAccessMode = Schema.Literals([
  "read",
  "write",
  "deny",
]).annotate({ identifier: "ServerNotification__FileSystemAccessMode" });

export type ServerNotification__AdditionalNetworkPermissions = {
  readonly enabled?: boolean | null;
};
export const ServerNotification__AdditionalNetworkPermissions = Schema.Struct({
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "ServerNotification__AdditionalNetworkPermissions" });

export type ServerNotification__GuardianRiskLevel = "low" | "medium" | "high" | "critical";
export const ServerNotification__GuardianRiskLevel = Schema.Literals([
  "low",
  "medium",
  "high",
  "critical",
]).annotate({
  description: "[UNSTABLE] Risk level assigned by approval auto-review.",
  identifier: "ServerNotification__GuardianRiskLevel",
});

export type ServerNotification__GuardianApprovalReviewStatus =
  | "inProgress"
  | "approved"
  | "denied"
  | "timedOut"
  | "aborted";
export const ServerNotification__GuardianApprovalReviewStatus = Schema.Literals([
  "inProgress",
  "approved",
  "denied",
  "timedOut",
  "aborted",
]).annotate({
  description: "[UNSTABLE] Lifecycle state for an approval auto-review.",
  identifier: "ServerNotification__GuardianApprovalReviewStatus",
});

export type ServerNotification__GuardianUserAuthorization = "unknown" | "low" | "medium" | "high";
export const ServerNotification__GuardianUserAuthorization = Schema.Literals([
  "unknown",
  "low",
  "medium",
  "high",
]).annotate({
  description: "[UNSTABLE] Authorization level assigned by approval auto-review.",
  identifier: "ServerNotification__GuardianUserAuthorization",
});

export type ServerNotification__AutoReviewDecisionSource = "agent";
export const ServerNotification__AutoReviewDecisionSource = Schema.Literal("agent").annotate({
  description: "[UNSTABLE] Source that produced a terminal approval auto-review decision.",
  identifier: "ServerNotification__AutoReviewDecisionSource",
});

export type ServerNotification__StrictReviewRequiredNotification = {
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__StrictReviewRequiredNotification = Schema.Struct({
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this review started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__StrictReviewRequiredNotification" });

export type ServerNotification__AgentMessageDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__AgentMessageDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__AgentMessageDeltaNotification" });

export type ServerNotification__PlanDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__PlanDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  description:
    "EXPERIMENTAL - proposed plan streaming deltas for plan items. Clients should not assume concatenated deltas match the completed plan item content.",
  identifier: "ServerNotification__PlanDeltaNotification",
});

export type ServerNotification__CommandExecOutputStream = "stdout" | "stderr";
export const ServerNotification__CommandExecOutputStream = Schema.Union(
  [
    Schema.Literal("stdout").annotate({
      description: "stdout stream. PTY mode multiplexes terminal output here.",
    }),
    Schema.Literal("stderr").annotate({ description: "stderr stream." }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "Stream label for `command/exec/outputDelta` notifications.",
  identifier: "ServerNotification__CommandExecOutputStream",
});

export type ServerNotification__ProcessOutputStream = "stdout" | "stderr";
export const ServerNotification__ProcessOutputStream = Schema.Union(
  [
    Schema.Literal("stdout").annotate({
      description: "stdout stream. PTY mode multiplexes terminal output here.",
    }),
    Schema.Literal("stderr").annotate({ description: "stderr stream." }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "Stream label for `process/outputDelta` notifications.",
  identifier: "ServerNotification__ProcessOutputStream",
});

export type ServerNotification__ProcessExitedNotification = {
  readonly exitCode: number;
  readonly processHandle: string;
  readonly stderr: string;
  readonly stderrCapReached: boolean;
  readonly stdout: string;
  readonly stdoutCapReached: boolean;
};
export const ServerNotification__ProcessExitedNotification = Schema.Struct({
  exitCode: Schema.Number.annotate({ description: "Process exit code.", format: "int32" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  processHandle: Schema.String.annotate({
    description: "Client-supplied, connection-scoped `processHandle` from `process/spawn`.",
  }),
  stderr: Schema.String.annotate({
    description:
      "Buffered stderr capture.\n\nEmpty when stderr was streamed via `process/outputDelta`.",
  }),
  stderrCapReached: Schema.Boolean.annotate({
    description:
      "Whether stderr reached `outputBytesCap`.\n\nIn streaming mode, stderr is empty and cap state is also reported on the final stderr `process/outputDelta` notification.",
  }),
  stdout: Schema.String.annotate({
    description:
      "Buffered stdout capture.\n\nEmpty when stdout was streamed via `process/outputDelta`.",
  }),
  stdoutCapReached: Schema.Boolean.annotate({
    description:
      "Whether stdout reached `outputBytesCap`.\n\nIn streaming mode, stdout is empty and cap state is also reported on the final stdout `process/outputDelta` notification.",
  }),
}).annotate({
  description: "Final process exit notification for `process/spawn`.",
  identifier: "ServerNotification__ProcessExitedNotification",
});

export type ServerNotification__CommandExecutionOutputDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__CommandExecutionOutputDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__CommandExecutionOutputDeltaNotification" });

export type ServerNotification__TerminalInteractionNotification = {
  readonly itemId: string;
  readonly processId: string;
  readonly stdin: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__TerminalInteractionNotification = Schema.Struct({
  itemId: Schema.String,
  processId: Schema.String,
  stdin: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__TerminalInteractionNotification" });

export type ServerNotification__FileChangeOutputDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__FileChangeOutputDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  description:
    "Deprecated legacy notification for `apply_patch` textual output.\n\nThe server no longer emits this notification.",
  identifier: "ServerNotification__FileChangeOutputDeltaNotification",
});

export type ServerNotification__RequestId = string | number;
export const ServerNotification__RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ identifier: "ServerNotification__RequestId" });

export type ServerNotification__McpToolCallProgressNotification = {
  readonly itemId: string;
  readonly message: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__McpToolCallProgressNotification = Schema.Struct({
  itemId: Schema.String,
  message: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__McpToolCallProgressNotification" });

export type ServerNotification__McpServerOauthLoginCompletedNotification = {
  readonly error?: string | null;
  readonly name: string;
  readonly success: boolean;
  readonly threadId?: string | null;
};
export const ServerNotification__McpServerOauthLoginCompletedNotification = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
  success: Schema.Boolean,
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__McpServerOauthLoginCompletedNotification" });

export type ServerNotification__McpServerStartupFailureReason = "reauthenticationRequired";
export const ServerNotification__McpServerStartupFailureReason = Schema.Literal(
  "reauthenticationRequired",
).annotate({ identifier: "ServerNotification__McpServerStartupFailureReason" });

export type ServerNotification__McpServerStartupState =
  | "starting"
  | "ready"
  | "failed"
  | "cancelled";
export const ServerNotification__McpServerStartupState = Schema.Literals([
  "starting",
  "ready",
  "failed",
  "cancelled",
]).annotate({ identifier: "ServerNotification__McpServerStartupState" });

export type ServerNotification__McpServerEventNotification = {
  readonly method: string;
  readonly params: Schema.Json;
};
export const ServerNotification__McpServerEventNotification = Schema.Struct({
  method: Schema.String,
  params: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({ identifier: "ServerNotification__McpServerEventNotification" });

export type ServerNotification__AuthMode =
  | "apikey"
  | "chatgpt"
  | "chatgptAuthTokens"
  | "headers"
  | "agentIdentity"
  | "personalAccessToken"
  | "bedrockApiKey"
  | "bedrockAccessKeys";
export const ServerNotification__AuthMode = Schema.Union(
  [
    Schema.Literal("apikey").annotate({
      description: "OpenAI API key provided by the caller and stored by Codex.",
    }),
    Schema.Literal("chatgpt").annotate({
      description: "ChatGPT OAuth managed by Codex (tokens persisted and refreshed by Codex).",
    }),
    Schema.Literal("chatgptAuthTokens").annotate({
      description:
        "[UNSTABLE] FOR OPENAI INTERNAL USE ONLY - DO NOT USE.\n\nChatGPT auth tokens are supplied by an external host app and are only stored in memory. Token refresh must be handled by the external host app.",
    }),
    Schema.Literal("headers").annotate({
      description: "Backend auth supplied as request headers.",
    }),
    Schema.Literal("agentIdentity").annotate({
      description: "Programmatic Codex auth backed by a registered Agent Identity.",
    }),
    Schema.Literal("personalAccessToken").annotate({
      description: "Programmatic Codex auth backed by a personal access token.",
    }),
    Schema.Literal("bedrockApiKey").annotate({
      description: "Amazon Bedrock bearer token managed by Codex.",
    }),
    Schema.Literal("bedrockAccessKeys").annotate({
      description: "Amazon Bedrock AWS access keys managed by Codex.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "Authentication mode for OpenAI-backed providers.",
  identifier: "ServerNotification__AuthMode",
});

export type ServerNotification__PlanType = string;
export const ServerNotification__PlanType = Schema.String.annotate({
  identifier: "ServerNotification__PlanType",
});

export type ServerNotification__GatewayOAuthStatus =
  | "notReady"
  | "started"
  | "succeeded"
  | "failed";
export const ServerNotification__GatewayOAuthStatus = Schema.Literals([
  "notReady",
  "started",
  "succeeded",
  "failed",
]).annotate({ identifier: "ServerNotification__GatewayOAuthStatus" });

export type ServerNotification__CreditsSnapshot = {
  readonly balance?: string | null;
  readonly hasCredits: boolean;
  readonly unlimited: boolean;
};
export const ServerNotification__CreditsSnapshot = Schema.Struct({
  balance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  hasCredits: Schema.Boolean,
  unlimited: Schema.Boolean,
}).annotate({ identifier: "ServerNotification__CreditsSnapshot" });

export type ServerNotification__SpendControlLimitSnapshot = {
  readonly limit: string;
  readonly remainingPercent: number;
  readonly resetsAt: number;
  readonly used: string;
};
export const ServerNotification__SpendControlLimitSnapshot = Schema.Struct({
  limit: Schema.String,
  remainingPercent: Schema.Number.annotate({ format: "int32" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  resetsAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  used: Schema.String,
}).annotate({ identifier: "ServerNotification__SpendControlLimitSnapshot" });

export type ServerNotification__RateLimitWindow = {
  readonly resetsAt?: number | null;
  readonly usedPercent: number;
  readonly windowDurationMins?: number | null;
};
export const ServerNotification__RateLimitWindow = Schema.Struct({
  resetsAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  usedPercent: Schema.Number.annotate({ format: "int32" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  windowDurationMins: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ServerNotification__RateLimitWindow" });

export type ServerNotification__RateLimitReachedType =
  | "rate_limit_reached"
  | "workspace_owner_credits_depleted"
  | "workspace_member_credits_depleted"
  | "workspace_owner_usage_limit_reached"
  | "workspace_member_usage_limit_reached";
export const ServerNotification__RateLimitReachedType = Schema.Literals([
  "rate_limit_reached",
  "workspace_owner_credits_depleted",
  "workspace_member_credits_depleted",
  "workspace_owner_usage_limit_reached",
  "workspace_member_usage_limit_reached",
]).annotate({ identifier: "ServerNotification__RateLimitReachedType" });

export type ServerNotification__AppReview = { readonly status: string };
export const ServerNotification__AppReview = Schema.Struct({ status: Schema.String }).annotate({
  identifier: "ServerNotification__AppReview",
});

export type ServerNotification__AppScreenshot = {
  readonly fileId?: string | null;
  readonly url?: string | null;
  readonly userPrompt: string;
};
export const ServerNotification__AppScreenshot = Schema.Struct({
  fileId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  userPrompt: Schema.String,
}).annotate({ identifier: "ServerNotification__AppScreenshot" });

export type ServerNotification__AppBranding = {
  readonly category?: string | null;
  readonly developer?: string | null;
  readonly isDiscoverableApp: boolean;
  readonly privacyPolicy?: string | null;
  readonly termsOfService?: string | null;
  readonly website?: string | null;
};
export const ServerNotification__AppBranding = Schema.Struct({
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  developer: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  isDiscoverableApp: Schema.Boolean,
  privacyPolicy: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  termsOfService: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  website: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "EXPERIMENTAL - app metadata returned by app-list APIs.",
  identifier: "ServerNotification__AppBranding",
});

export type ServerNotification__RemoteControlConnectionStatus =
  | "disabled"
  | "connecting"
  | "connected"
  | "errored";
export const ServerNotification__RemoteControlConnectionStatus = Schema.Literals([
  "disabled",
  "connecting",
  "connected",
  "errored",
]).annotate({ identifier: "ServerNotification__RemoteControlConnectionStatus" });

export type ServerNotification__ExternalAgentConfigMigrationItemType =
  | "AGENTS_MD"
  | "CONFIG"
  | "SKILLS"
  | "PLUGINS"
  | "MCP_SERVER_CONFIG"
  | "SUBAGENTS"
  | "HOOKS"
  | "COMMANDS"
  | "MEMORY"
  | "SESSIONS";
export const ServerNotification__ExternalAgentConfigMigrationItemType = Schema.Literals([
  "AGENTS_MD",
  "CONFIG",
  "SKILLS",
  "PLUGINS",
  "MCP_SERVER_CONFIG",
  "SUBAGENTS",
  "HOOKS",
  "COMMANDS",
  "MEMORY",
  "SESSIONS",
]).annotate({ identifier: "ServerNotification__ExternalAgentConfigMigrationItemType" });

export type ServerNotification__ReasoningSummaryTextDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly summaryIndex: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__ReasoningSummaryTextDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  summaryIndex: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__ReasoningSummaryTextDeltaNotification" });

export type ServerNotification__ReasoningSummaryPartAddedNotification = {
  readonly itemId: string;
  readonly summaryIndex: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__ReasoningSummaryPartAddedNotification = Schema.Struct({
  itemId: Schema.String,
  summaryIndex: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__ReasoningSummaryPartAddedNotification" });

export type ServerNotification__ReasoningTextDeltaNotification = {
  readonly contentIndex: number;
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__ReasoningTextDeltaNotification = Schema.Struct({
  contentIndex: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__ReasoningTextDeltaNotification" });

export type ServerNotification__ContextCompactedNotification = {
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__ContextCompactedNotification = Schema.Struct({
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  description: "Deprecated: Use `ContextCompaction` item type instead.",
  identifier: "ServerNotification__ContextCompactedNotification",
});

export type ServerNotification__ModelRerouteReason = "highRiskCyberActivity";
export const ServerNotification__ModelRerouteReason = Schema.Literal(
  "highRiskCyberActivity",
).annotate({ identifier: "ServerNotification__ModelRerouteReason" });

export type ServerNotification__ModelVerification = "trustedAccessForCyber";
export const ServerNotification__ModelVerification = Schema.Literal(
  "trustedAccessForCyber",
).annotate({ identifier: "ServerNotification__ModelVerification" });

export type ServerNotification__AuthRecoveryNotification = {
  readonly message: string;
  readonly provider: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__AuthRecoveryNotification = Schema.Struct({
  message: Schema.String,
  provider: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__AuthRecoveryNotification" });

export type ServerNotification__TurnModerationMetadataNotification = {
  readonly metadata: Schema.Json;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__TurnModerationMetadataNotification = Schema.Struct({
  metadata: Schema.Json.annotate({ expected: "JSON value" }),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__TurnModerationMetadataNotification" });

export type ServerNotification__ModelSafetyBufferingUpdatedNotification = {
  readonly fasterModel?: string | null;
  readonly model: string;
  readonly reasons: ReadonlyArray<string>;
  readonly showBufferingUi: boolean;
  readonly threadId: string;
  readonly turnId: string;
  readonly useCases: ReadonlyArray<string>;
};
export const ServerNotification__ModelSafetyBufferingUpdatedNotification = Schema.Struct({
  fasterModel: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  model: Schema.String,
  reasons: Schema.Array(Schema.String),
  showBufferingUi: Schema.Boolean,
  threadId: Schema.String,
  turnId: Schema.String,
  useCases: Schema.Array(Schema.String),
}).annotate({ identifier: "ServerNotification__ModelSafetyBufferingUpdatedNotification" });

export type ServerNotification__WarningNotification = {
  readonly message: string;
  readonly threadId?: string | null;
};
export const ServerNotification__WarningNotification = Schema.Struct({
  message: Schema.String.annotate({ description: "Concise warning message for the user." }),
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional thread target when the warning applies to a specific thread.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ServerNotification__WarningNotification" });

export type ServerNotification__GuardianWarningNotification = {
  readonly message: string;
  readonly threadId: string;
};
export const ServerNotification__GuardianWarningNotification = Schema.Struct({
  message: Schema.String.annotate({
    description: "Concise guardian warning message for the user.",
  }),
  threadId: Schema.String.annotate({ description: "Thread target for the guardian warning." }),
}).annotate({ identifier: "ServerNotification__GuardianWarningNotification" });

export type ServerNotification__DeprecationNoticeNotification = {
  readonly details?: string | null;
  readonly summary: string;
};
export const ServerNotification__DeprecationNoticeNotification = Schema.Struct({
  details: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional extra guidance, such as migration steps or rationale.",
      }),
      Schema.Null,
    ]),
  ),
  summary: Schema.String.annotate({ description: "Concise summary of what is deprecated." }),
}).annotate({ identifier: "ServerNotification__DeprecationNoticeNotification" });

export type ServerNotification__TextPosition = { readonly column: number; readonly line: number };
export const ServerNotification__TextPosition = Schema.Struct({
  column: Schema.Number.annotate({
    description: "1-based column number (in Unicode scalar values).",
    format: "uint",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  line: Schema.Number.annotate({ description: "1-based line number.", format: "uint" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({ identifier: "ServerNotification__TextPosition" });

export type ServerNotification__FuzzyFileSearchMatchType = "file" | "directory";
export const ServerNotification__FuzzyFileSearchMatchType = Schema.Literals([
  "file",
  "directory",
]).annotate({ identifier: "ServerNotification__FuzzyFileSearchMatchType" });

export type ServerNotification__FuzzyFileSearchSessionCompletedNotification = {
  readonly sessionId: string;
};
export const ServerNotification__FuzzyFileSearchSessionCompletedNotification = Schema.Struct({
  sessionId: Schema.String,
}).annotate({ identifier: "ServerNotification__FuzzyFileSearchSessionCompletedNotification" });

export type ServerNotification__RealtimeConversationVersion = "v1" | "v2" | "v3";
export const ServerNotification__RealtimeConversationVersion = Schema.Literals([
  "v1",
  "v2",
  "v3",
]).annotate({ identifier: "ServerNotification__RealtimeConversationVersion" });

export type ServerNotification__ThreadRealtimeItemAddedNotification = {
  readonly item: Schema.Json;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeItemAddedNotification = Schema.Struct({
  item: Schema.Json.annotate({ expected: "JSON value" }),
  threadId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - raw non-audio thread realtime item emitted by the backend.",
  identifier: "ServerNotification__ThreadRealtimeItemAddedNotification",
});

export type ServerNotification__ThreadRealtimeTranscriptRole = "user" | "assistant";
export const ServerNotification__ThreadRealtimeTranscriptRole = Schema.Literals([
  "user",
  "assistant",
]).annotate({ identifier: "ServerNotification__ThreadRealtimeTranscriptRole" });

export type ServerNotification__ThreadRealtimeBemItemPresentation =
  | { readonly type: "wholeItem" }
  | { readonly type: "inlineMarkdown" }
  | { readonly index: number; readonly type: "inlineVisualization" };
export const ServerNotification__ThreadRealtimeBemItemPresentation = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("wholeItem").annotate({
        title: "WholeItemThreadRealtimeBemItemPresentationType",
      }),
    }).annotate({ title: "WholeItemThreadRealtimeBemItemPresentation" }),
    Schema.Struct({
      type: Schema.Literal("inlineMarkdown").annotate({
        title: "InlineMarkdownThreadRealtimeBemItemPresentationType",
      }),
    }).annotate({ title: "InlineMarkdownThreadRealtimeBemItemPresentation" }),
    Schema.Struct({
      index: Schema.Number.annotate({ format: "uint32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      type: Schema.Literal("inlineVisualization").annotate({
        title: "InlineVisualizationThreadRealtimeBemItemPresentationType",
      }),
    }).annotate({ title: "InlineVisualizationThreadRealtimeBemItemPresentation" }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "EXPERIMENTAL - how an existing agent item appears in a realtime conversation.",
  identifier: "ServerNotification__ThreadRealtimeBemItemPresentation",
});

export type ServerNotification__ThreadRealtimeSessionOutcome = "ended" | "failed";
export const ServerNotification__ThreadRealtimeSessionOutcome = Schema.Literals([
  "ended",
  "failed",
]).annotate({ identifier: "ServerNotification__ThreadRealtimeSessionOutcome" });

export type ServerNotification__ThreadRealtimeItemTranscriptDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeItemTranscriptDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - text appended to an active realtime transcript item.",
  identifier: "ServerNotification__ThreadRealtimeItemTranscriptDeltaNotification",
});

export type ServerNotification__ThreadRealtimeTranscriptDeltaNotification = {
  readonly delta: string;
  readonly role: string;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeTranscriptDeltaNotification = Schema.Struct({
  delta: Schema.String.annotate({ description: "Live transcript delta from the realtime event." }),
  role: Schema.String,
  threadId: Schema.String,
}).annotate({
  description:
    "EXPERIMENTAL - flat transcript delta emitted whenever realtime transcript text changes.",
  identifier: "ServerNotification__ThreadRealtimeTranscriptDeltaNotification",
});

export type ServerNotification__ThreadRealtimeTranscriptDoneNotification = {
  readonly role: string;
  readonly text: string;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeTranscriptDoneNotification = Schema.Struct({
  role: Schema.String,
  text: Schema.String.annotate({ description: "Final complete text for the transcript part." }),
  threadId: Schema.String,
}).annotate({
  description:
    "EXPERIMENTAL - final transcript text emitted when realtime completes a transcript part.",
  identifier: "ServerNotification__ThreadRealtimeTranscriptDoneNotification",
});

export type ServerNotification__ThreadRealtimeAudioChunk = {
  readonly data: string;
  readonly itemId?: string | null;
  readonly numChannels: number;
  readonly sampleRate: number;
  readonly samplesPerChannel?: number | null;
};
export const ServerNotification__ThreadRealtimeAudioChunk = Schema.Struct({
  data: Schema.String,
  itemId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  numChannels: Schema.Number.annotate({ format: "uint16" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  sampleRate: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  samplesPerChannel: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "uint32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "EXPERIMENTAL - thread realtime audio chunk.",
  identifier: "ServerNotification__ThreadRealtimeAudioChunk",
});

export type ServerNotification__ThreadRealtimeSdpNotification = {
  readonly sdp: string;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeSdpNotification = Schema.Struct({
  sdp: Schema.String,
  threadId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - emitted with the remote SDP for a WebRTC realtime session.",
  identifier: "ServerNotification__ThreadRealtimeSdpNotification",
});

export type ServerNotification__ThreadRealtimeErrorNotification = {
  readonly message: string;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeErrorNotification = Schema.Struct({
  message: Schema.String,
  threadId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - emitted when thread realtime encounters an error.",
  identifier: "ServerNotification__ThreadRealtimeErrorNotification",
});

export type ServerNotification__ThreadRealtimeClosedNotification = {
  readonly reason?: string | null;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeClosedNotification = Schema.Struct({
  reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - emitted when thread realtime transport closes.",
  identifier: "ServerNotification__ThreadRealtimeClosedNotification",
});

export type ServerNotification__WindowsWorldWritableWarningNotification = {
  readonly extraCount: number;
  readonly failedScan: boolean;
  readonly samplePaths: ReadonlyArray<string>;
};
export const ServerNotification__WindowsWorldWritableWarningNotification = Schema.Struct({
  extraCount: Schema.Number.annotate({ format: "uint" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  failedScan: Schema.Boolean,
  samplePaths: Schema.Array(Schema.String),
}).annotate({ identifier: "ServerNotification__WindowsWorldWritableWarningNotification" });

export type ServerNotification__WindowsSandboxSetupMode = "elevated" | "unelevated";
export const ServerNotification__WindowsSandboxSetupMode = Schema.Literals([
  "elevated",
  "unelevated",
]).annotate({ identifier: "ServerNotification__WindowsSandboxSetupMode" });

export type ServerNotification__DesktopOnboardingEntrypoint = "life_sciences";
export const ServerNotification__DesktopOnboardingEntrypoint = Schema.Literal(
  "life_sciences",
).annotate({ identifier: "ServerNotification__DesktopOnboardingEntrypoint" });

export type ServerRequest__RequestId = string | number;
export const ServerRequest__RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ identifier: "ServerRequest__RequestId" });

export type ServerRequest__LegacyAppPathString = string;
export const ServerRequest__LegacyAppPathString = Schema.String.annotate({
  identifier: "ServerRequest__LegacyAppPathString",
});

export type ServerRequest__CommandExecutionApprovalKind = "command" | "writeStdin";
export const ServerRequest__CommandExecutionApprovalKind = Schema.Literals([
  "command",
  "writeStdin",
]).annotate({
  description: "Distinguishes a command approval from input sent to an existing terminal.",
  identifier: "ServerRequest__CommandExecutionApprovalKind",
});

export type ServerRequest__NetworkApprovalProtocol = "http" | "https" | "socks5Tcp" | "socks5Udp";
export const ServerRequest__NetworkApprovalProtocol = Schema.Literals([
  "http",
  "https",
  "socks5Tcp",
  "socks5Udp",
]).annotate({ identifier: "ServerRequest__NetworkApprovalProtocol" });

export type ServerRequest__NetworkPolicyRuleAction = "allow" | "deny";
export const ServerRequest__NetworkPolicyRuleAction = Schema.Literals(["allow", "deny"]).annotate({
  identifier: "ServerRequest__NetworkPolicyRuleAction",
});

export type ServerRequest__FileChangeRequestApprovalParams = {
  readonly grantRoot?: string | null;
  readonly itemId: string;
  readonly reason?: string | null;
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerRequest__FileChangeRequestApprovalParams = Schema.Struct({
  grantRoot: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "[UNSTABLE] When set, the agent is asking the user to allow writes under this root for the remainder of the session (unclear if this is honored today).",
      }),
      Schema.Null,
    ]),
  ),
  itemId: Schema.String,
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional explanatory reason (e.g. request for extra write access).",
      }),
      Schema.Null,
    ]),
  ),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this approval request started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerRequest__FileChangeRequestApprovalParams" });

export type ServerRequest__ToolRequestUserInputOption = {
  readonly description: string;
  readonly label: string;
};
export const ServerRequest__ToolRequestUserInputOption = Schema.Struct({
  description: Schema.String,
  label: Schema.String,
}).annotate({
  description: "EXPERIMENTAL. Defines a single selectable option for request_user_input.",
  identifier: "ServerRequest__ToolRequestUserInputOption",
});

export type ServerRequest__McpElicitationStringType = "string";
export const ServerRequest__McpElicitationStringType = Schema.Literal("string").annotate({
  identifier: "ServerRequest__McpElicitationStringType",
});

export type ServerRequest__McpElicitationConstOption = {
  readonly const: string;
  readonly title: string;
};
export const ServerRequest__McpElicitationConstOption = Schema.Struct({
  const: Schema.String,
  title: Schema.String,
}).annotate({ identifier: "ServerRequest__McpElicitationConstOption" });

export type ServerRequest__McpElicitationArrayType = "array";
export const ServerRequest__McpElicitationArrayType = Schema.Literal("array").annotate({
  identifier: "ServerRequest__McpElicitationArrayType",
});

export type ServerRequest__McpElicitationStringFormat = "email" | "uri" | "date" | "date-time";
export const ServerRequest__McpElicitationStringFormat = Schema.Literals([
  "email",
  "uri",
  "date",
  "date-time",
]).annotate({ identifier: "ServerRequest__McpElicitationStringFormat" });

export type ServerRequest__McpElicitationNumberType = "number" | "integer";
export const ServerRequest__McpElicitationNumberType = Schema.Literals([
  "number",
  "integer",
]).annotate({ identifier: "ServerRequest__McpElicitationNumberType" });

export type ServerRequest__McpElicitationBooleanType = "boolean";
export const ServerRequest__McpElicitationBooleanType = Schema.Literal("boolean").annotate({
  identifier: "ServerRequest__McpElicitationBooleanType",
});

export type ServerRequest__McpElicitationObjectType = "object";
export const ServerRequest__McpElicitationObjectType = Schema.Literal("object").annotate({
  identifier: "ServerRequest__McpElicitationObjectType",
});

export type ServerRequest__FileSystemAccessMode = "read" | "write" | "deny";
export const ServerRequest__FileSystemAccessMode = Schema.Literals([
  "read",
  "write",
  "deny",
]).annotate({ identifier: "ServerRequest__FileSystemAccessMode" });

export type ServerRequest__AdditionalNetworkPermissions = { readonly enabled?: boolean | null };
export const ServerRequest__AdditionalNetworkPermissions = Schema.Struct({
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "ServerRequest__AdditionalNetworkPermissions" });

export type ServerRequest__DynamicToolCallParams = {
  readonly arguments: Schema.Json;
  readonly callId: string;
  readonly namespace?: string | null;
  readonly threadId: string;
  readonly tool: string;
  readonly turnId: string;
};
export const ServerRequest__DynamicToolCallParams = Schema.Struct({
  arguments: Schema.Json.annotate({ expected: "JSON value" }),
  callId: Schema.String,
  namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
  tool: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerRequest__DynamicToolCallParams" });

export type ServerRequest__ChatgptAuthTokensRefreshReason = "unauthorized";
export const ServerRequest__ChatgptAuthTokensRefreshReason = Schema.Union(
  [
    Schema.Literal("unauthorized").annotate({
      description: "Codex attempted a backend request and received `401 Unauthorized`.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerRequest__ChatgptAuthTokensRefreshReason" });

export type ServerRequest__AttestationGenerateParams = { readonly [x: string]: Schema.Json };
export const ServerRequest__AttestationGenerateParams = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ identifier: "ServerRequest__AttestationGenerateParams" });

export type ServerRequest__ThreadId = string;
export const ServerRequest__ThreadId = Schema.String.annotate({
  identifier: "ServerRequest__ThreadId",
});

export type ServerRequest__FileChange =
  | { readonly content: string; readonly type: "add" }
  | { readonly content: string; readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update"; readonly unified_diff: string };
export const ServerRequest__FileChange = Schema.Union(
  [
    Schema.Struct({
      content: Schema.String,
      type: Schema.Literal("add").annotate({ title: "AddFileChangeType" }),
    }).annotate({ title: "AddFileChange" }),
    Schema.Struct({
      content: Schema.String,
      type: Schema.Literal("delete").annotate({ title: "DeleteFileChangeType" }),
    }).annotate({ title: "DeleteFileChange" }),
    Schema.Struct({
      move_path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("update").annotate({ title: "UpdateFileChangeType" }),
      unified_diff: Schema.String,
    }).annotate({ title: "UpdateFileChange" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerRequest__FileChange" });

export type ServerRequest__ParsedCommand =
  | { readonly cmd: string; readonly name: string; readonly path: string; readonly type: "read" }
  | { readonly cmd: string; readonly path?: string | null; readonly type: "list_files" }
  | {
      readonly cmd: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly cmd: string; readonly type: "unknown" };
export const ServerRequest__ParsedCommand = Schema.Union(
  [
    Schema.Struct({
      cmd: Schema.String,
      name: Schema.String,
      path: Schema.String.annotate({
        description:
          "(Best effort) Path to the file being read by the command. When possible, this is an absolute path, though when relative, it should be resolved against the `cwd`` that will be used to run the command to derive the absolute path.",
      }),
      type: Schema.Literal("read").annotate({ title: "ReadParsedCommandType" }),
    }).annotate({ title: "ReadParsedCommand" }),
    Schema.Struct({
      cmd: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("list_files").annotate({ title: "ListFilesParsedCommandType" }),
    }).annotate({ title: "ListFilesParsedCommand" }),
    Schema.Struct({
      cmd: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchParsedCommandType" }),
    }).annotate({ title: "SearchParsedCommand" }),
    Schema.Struct({
      cmd: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownParsedCommandType" }),
    }).annotate({ title: "UnknownParsedCommand" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerRequest__ParsedCommand" });

export type ToolRequestUserInputParams__ToolRequestUserInputOption = {
  readonly description: string;
  readonly label: string;
};
export const ToolRequestUserInputParams__ToolRequestUserInputOption = Schema.Struct({
  description: Schema.String,
  label: Schema.String,
}).annotate({
  description: "EXPERIMENTAL. Defines a single selectable option for request_user_input.",
  identifier: "ToolRequestUserInputParams__ToolRequestUserInputOption",
});

export type ToolRequestUserInputResponse__ToolRequestUserInputAnswer = {
  readonly answers: ReadonlyArray<string>;
};
export const ToolRequestUserInputResponse__ToolRequestUserInputAnswer = Schema.Struct({
  answers: Schema.Array(Schema.String),
}).annotate({
  description: "EXPERIMENTAL. Captures a user's answer to a request_user_input question.",
  identifier: "ToolRequestUserInputResponse__ToolRequestUserInputAnswer",
});

export type V1InitializeParams__InitializeCapabilities = {
  readonly experimentalApi?: boolean;
  readonly explicitGatewayOauth?: boolean;
  readonly extensions?: { readonly [x: string]: Schema.Json } | null;
  readonly mcpServerOpenaiFormElicitation?: boolean;
  readonly optOutNotificationMethods?: ReadonlyArray<string> | null;
  readonly requestAttestation?: boolean;
};
export const V1InitializeParams__InitializeCapabilities = Schema.Struct({
  experimentalApi: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Opt into receiving experimental API methods and fields.",
      default: false,
    }),
  ),
  explicitGatewayOauth: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Use explicit gateway OAuth login instead of automatic browser authorization. Applies to this app-server's gateway runtime; later connections cannot undo it.",
    }),
  ),
  extensions: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description: "MCP extension settings declared by the app-server client.",
      }),
      Schema.Null,
    ]),
  ),
  mcpServerOpenaiFormElicitation: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Legacy opt-in for the `openai/form` MCP extension.\n\nNew clients should declare `openai/form` in [`Self::extensions`].",
    }),
  ),
  optOutNotificationMethods: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Exact notification method names that should be suppressed for this connection (for example `thread/started`).",
      }),
      Schema.Null,
    ]),
  ),
  requestAttestation: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Opt into `attestation/generate` requests for upstream `x-oai-attestation`.",
      default: false,
    }),
  ),
}).annotate({
  description: "Client-declared capabilities negotiated during initialize.",
  identifier: "V1InitializeParams__InitializeCapabilities",
});

export type V1InitializeParams__ClientInfo = {
  readonly name: string;
  readonly title?: string | null;
  readonly version: string;
};
export const V1InitializeParams__ClientInfo = Schema.Struct({
  name: Schema.String,
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  version: Schema.String,
}).annotate({ identifier: "V1InitializeParams__ClientInfo" });

export type V1InitializeResponse__AbsolutePathBuf = string;
export const V1InitializeResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V1InitializeResponse__AbsolutePathBuf",
});

export type V2AccountLoginCompletedNotification__DesktopOnboardingEntrypoint = "life_sciences";
export const V2AccountLoginCompletedNotification__DesktopOnboardingEntrypoint = Schema.Literal(
  "life_sciences",
).annotate({ identifier: "V2AccountLoginCompletedNotification__DesktopOnboardingEntrypoint" });

export type V2AccountRateLimitsUpdatedNotification__CreditsSnapshot = {
  readonly balance?: string | null;
  readonly hasCredits: boolean;
  readonly unlimited: boolean;
};
export const V2AccountRateLimitsUpdatedNotification__CreditsSnapshot = Schema.Struct({
  balance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  hasCredits: Schema.Boolean,
  unlimited: Schema.Boolean,
}).annotate({ identifier: "V2AccountRateLimitsUpdatedNotification__CreditsSnapshot" });

export type V2AccountRateLimitsUpdatedNotification__SpendControlLimitSnapshot = {
  readonly limit: string;
  readonly remainingPercent: number;
  readonly resetsAt: number;
  readonly used: string;
};
export const V2AccountRateLimitsUpdatedNotification__SpendControlLimitSnapshot = Schema.Struct({
  limit: Schema.String,
  remainingPercent: Schema.Number.annotate({ format: "int32" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  resetsAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  used: Schema.String,
}).annotate({ identifier: "V2AccountRateLimitsUpdatedNotification__SpendControlLimitSnapshot" });

export type V2AccountRateLimitsUpdatedNotification__PlanType = string;
export const V2AccountRateLimitsUpdatedNotification__PlanType = Schema.String.annotate({
  identifier: "V2AccountRateLimitsUpdatedNotification__PlanType",
});

export type V2AccountRateLimitsUpdatedNotification__RateLimitWindow = {
  readonly resetsAt?: number | null;
  readonly usedPercent: number;
  readonly windowDurationMins?: number | null;
};
export const V2AccountRateLimitsUpdatedNotification__RateLimitWindow = Schema.Struct({
  resetsAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  usedPercent: Schema.Number.annotate({ format: "int32" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  windowDurationMins: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2AccountRateLimitsUpdatedNotification__RateLimitWindow" });

export type V2AccountRateLimitsUpdatedNotification__RateLimitReachedType =
  | "rate_limit_reached"
  | "workspace_owner_credits_depleted"
  | "workspace_member_credits_depleted"
  | "workspace_owner_usage_limit_reached"
  | "workspace_member_usage_limit_reached";
export const V2AccountRateLimitsUpdatedNotification__RateLimitReachedType = Schema.Literals([
  "rate_limit_reached",
  "workspace_owner_credits_depleted",
  "workspace_member_credits_depleted",
  "workspace_owner_usage_limit_reached",
  "workspace_member_usage_limit_reached",
]).annotate({ identifier: "V2AccountRateLimitsUpdatedNotification__RateLimitReachedType" });

export type V2AccountUpdatedNotification__AuthMode =
  | "apikey"
  | "chatgpt"
  | "chatgptAuthTokens"
  | "headers"
  | "agentIdentity"
  | "personalAccessToken"
  | "bedrockApiKey"
  | "bedrockAccessKeys";
export const V2AccountUpdatedNotification__AuthMode = Schema.Union(
  [
    Schema.Literal("apikey").annotate({
      description: "OpenAI API key provided by the caller and stored by Codex.",
    }),
    Schema.Literal("chatgpt").annotate({
      description: "ChatGPT OAuth managed by Codex (tokens persisted and refreshed by Codex).",
    }),
    Schema.Literal("chatgptAuthTokens").annotate({
      description:
        "[UNSTABLE] FOR OPENAI INTERNAL USE ONLY - DO NOT USE.\n\nChatGPT auth tokens are supplied by an external host app and are only stored in memory. Token refresh must be handled by the external host app.",
    }),
    Schema.Literal("headers").annotate({
      description: "Backend auth supplied as request headers.",
    }),
    Schema.Literal("agentIdentity").annotate({
      description: "Programmatic Codex auth backed by a registered Agent Identity.",
    }),
    Schema.Literal("personalAccessToken").annotate({
      description: "Programmatic Codex auth backed by a personal access token.",
    }),
    Schema.Literal("bedrockApiKey").annotate({
      description: "Amazon Bedrock bearer token managed by Codex.",
    }),
    Schema.Literal("bedrockAccessKeys").annotate({
      description: "Amazon Bedrock AWS access keys managed by Codex.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "Authentication mode for OpenAI-backed providers.",
  identifier: "V2AccountUpdatedNotification__AuthMode",
});

export type V2AccountUpdatedNotification__PlanType = string;
export const V2AccountUpdatedNotification__PlanType = Schema.String.annotate({
  identifier: "V2AccountUpdatedNotification__PlanType",
});

export type V2AppListUpdatedNotification__AppReview = { readonly status: string };
export const V2AppListUpdatedNotification__AppReview = Schema.Struct({
  status: Schema.String,
}).annotate({ identifier: "V2AppListUpdatedNotification__AppReview" });

export type V2AppListUpdatedNotification__AppScreenshot = {
  readonly fileId?: string | null;
  readonly url?: string | null;
  readonly userPrompt: string;
};
export const V2AppListUpdatedNotification__AppScreenshot = Schema.Struct({
  fileId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  userPrompt: Schema.String,
}).annotate({ identifier: "V2AppListUpdatedNotification__AppScreenshot" });

export type V2AppListUpdatedNotification__AppBranding = {
  readonly category?: string | null;
  readonly developer?: string | null;
  readonly isDiscoverableApp: boolean;
  readonly privacyPolicy?: string | null;
  readonly termsOfService?: string | null;
  readonly website?: string | null;
};
export const V2AppListUpdatedNotification__AppBranding = Schema.Struct({
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  developer: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  isDiscoverableApp: Schema.Boolean,
  privacyPolicy: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  termsOfService: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  website: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "EXPERIMENTAL - app metadata returned by app-list APIs.",
  identifier: "V2AppListUpdatedNotification__AppBranding",
});

export type V2AppsInstalledResponse__InstalledApp = {
  readonly callable: boolean;
  readonly enabled: boolean;
  readonly id: string;
  readonly runtimeName?: string | null;
};
export const V2AppsInstalledResponse__InstalledApp = Schema.Struct({
  callable: Schema.Boolean.annotate({
    description:
      "Whether the connector is enabled and has a non-synthetic, model-visible tool allowed by effective MCP and app/tool policy in the committed runtime snapshot.",
  }),
  enabled: Schema.Boolean.annotate({
    description:
      "Effective enabled state after applying global, workspace, local, and managed configuration at read time.",
  }),
  id: Schema.String,
  runtimeName: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Best-effort name carried by the runtime tool catalog. Canonical app metadata remains owned by `app/read`.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Installed connector runtime state.",
  identifier: "V2AppsInstalledResponse__InstalledApp",
});

export type V2AppsListResponse__AppReview = { readonly status: string };
export const V2AppsListResponse__AppReview = Schema.Struct({ status: Schema.String }).annotate({
  identifier: "V2AppsListResponse__AppReview",
});

export type V2AppsListResponse__AppScreenshot = {
  readonly fileId?: string | null;
  readonly url?: string | null;
  readonly userPrompt: string;
};
export const V2AppsListResponse__AppScreenshot = Schema.Struct({
  fileId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  userPrompt: Schema.String,
}).annotate({ identifier: "V2AppsListResponse__AppScreenshot" });

export type V2AppsListResponse__AppBranding = {
  readonly category?: string | null;
  readonly developer?: string | null;
  readonly isDiscoverableApp: boolean;
  readonly privacyPolicy?: string | null;
  readonly termsOfService?: string | null;
  readonly website?: string | null;
};
export const V2AppsListResponse__AppBranding = Schema.Struct({
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  developer: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  isDiscoverableApp: Schema.Boolean,
  privacyPolicy: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  termsOfService: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  website: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "EXPERIMENTAL - app metadata returned by app-list APIs.",
  identifier: "V2AppsListResponse__AppBranding",
});

export type V2AppsReadResponse__AppToolSummary = {
  readonly description: string;
  readonly disabledReason?: string | null;
  readonly isEnabled?: boolean;
  readonly isReadOnly?: boolean;
  readonly name: string;
  readonly title?: string | null;
};
export const V2AppsReadResponse__AppToolSummary = Schema.Struct({
  description: Schema.String,
  disabledReason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  isEnabled: Schema.optionalKey(Schema.Boolean.annotate({ default: true })),
  isReadOnly: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  name: Schema.String,
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "EXPERIMENTAL - metadata returned by app/read.",
  identifier: "V2AppsReadResponse__AppToolSummary",
});

export type V2CancelLoginAccountResponse__CancelLoginAccountStatus = "canceled" | "notFound";
export const V2CancelLoginAccountResponse__CancelLoginAccountStatus = Schema.Literals([
  "canceled",
  "notFound",
]).annotate({ identifier: "V2CancelLoginAccountResponse__CancelLoginAccountStatus" });

export type V2CommandExecOutputDeltaNotification__CommandExecOutputStream = "stdout" | "stderr";
export const V2CommandExecOutputDeltaNotification__CommandExecOutputStream = Schema.Union(
  [
    Schema.Literal("stdout").annotate({
      description: "stdout stream. PTY mode multiplexes terminal output here.",
    }),
    Schema.Literal("stderr").annotate({ description: "stderr stream." }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "Stream label for `command/exec/outputDelta` notifications.",
  identifier: "V2CommandExecOutputDeltaNotification__CommandExecOutputStream",
});

export type V2CommandExecParams__NetworkAccess = "restricted" | "enabled";
export const V2CommandExecParams__NetworkAccess = Schema.Literals([
  "restricted",
  "enabled",
]).annotate({ identifier: "V2CommandExecParams__NetworkAccess" });

export type V2CommandExecParams__AbsolutePathBuf = string;
export const V2CommandExecParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2CommandExecParams__AbsolutePathBuf",
});

export type V2CommandExecParams__CommandExecTerminalSize = {
  readonly cols: number;
  readonly rows: number;
};
export const V2CommandExecParams__CommandExecTerminalSize = Schema.Struct({
  cols: Schema.Number.annotate({
    description: "Terminal width in character cells.",
    format: "uint16",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  rows: Schema.Number.annotate({
    description: "Terminal height in character cells.",
    format: "uint16",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({
  description: "PTY size in character cells for `command/exec` PTY sessions.",
  identifier: "V2CommandExecParams__CommandExecTerminalSize",
});

export type V2CommandExecResizeParams__CommandExecTerminalSize = {
  readonly cols: number;
  readonly rows: number;
};
export const V2CommandExecResizeParams__CommandExecTerminalSize = Schema.Struct({
  cols: Schema.Number.annotate({
    description: "Terminal width in character cells.",
    format: "uint16",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  rows: Schema.Number.annotate({
    description: "Terminal height in character cells.",
    format: "uint16",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({
  description: "PTY size in character cells for `command/exec` PTY sessions.",
  identifier: "V2CommandExecResizeParams__CommandExecTerminalSize",
});

export type V2ConfigBatchWriteParams__MergeStrategy = "replace" | "upsert";
export const V2ConfigBatchWriteParams__MergeStrategy = Schema.Literals([
  "replace",
  "upsert",
]).annotate({ identifier: "V2ConfigBatchWriteParams__MergeStrategy" });

export type V2ConfigReadResponse__AnalyticsConfig = { readonly enabled?: boolean | null } & {
  readonly [x: string]: Schema.Json;
};
export const V2ConfigReadResponse__AnalyticsConfig = Schema.StructWithRest(
  Schema.Struct({ enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])) }),
  [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
).annotate({ identifier: "V2ConfigReadResponse__AnalyticsConfig" });

export type V2ConfigReadResponse__AskForApproval =
  | "untrusted"
  | "on-request"
  | "never"
  | {
      readonly granular: {
        readonly mcp_elicitations: boolean;
        readonly request_permissions?: boolean;
        readonly rules: boolean;
        readonly sandbox_approval: boolean;
        readonly skill_approval?: boolean;
      };
    };
export const V2ConfigReadResponse__AskForApproval = Schema.Union(
  [
    Schema.Literals(["untrusted", "on-request", "never"]),
    Schema.Struct({
      granular: Schema.Struct({
        mcp_elicitations: Schema.Boolean,
        request_permissions: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
        rules: Schema.Boolean,
        sandbox_approval: Schema.Boolean,
        skill_approval: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      }),
    }).annotate({ title: "GranularAskForApproval" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ConfigReadResponse__AskForApproval" });

export type V2ConfigReadResponse__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const V2ConfigReadResponse__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2ConfigReadResponse__ApprovalsReviewer",
});

export type V2ConfigReadResponse__AllowDenyRequirement = "allow" | "deny";
export const V2ConfigReadResponse__AllowDenyRequirement = Schema.Literals([
  "allow",
  "deny",
]).annotate({ identifier: "V2ConfigReadResponse__AllowDenyRequirement" });

export type V2ConfigReadResponse__ForcedChatgptWorkspaceIds = string | ReadonlyArray<string>;
export const V2ConfigReadResponse__ForcedChatgptWorkspaceIds = Schema.Union([
  Schema.String,
  Schema.Array(Schema.String),
]).annotate({
  description: "Backward-compatible API shape for ChatGPT workspace login restrictions.",
  identifier: "V2ConfigReadResponse__ForcedChatgptWorkspaceIds",
});

export type V2ConfigReadResponse__ForcedLoginMethod = "chatgpt" | "api";
export const V2ConfigReadResponse__ForcedLoginMethod = Schema.Literals(["chatgpt", "api"]).annotate(
  { identifier: "V2ConfigReadResponse__ForcedLoginMethod" },
);

export type V2ConfigReadResponse__AutoCompactTokenLimitScope = "total" | "body_after_prefix";
export const V2ConfigReadResponse__AutoCompactTokenLimitScope = Schema.Union(
  [
    Schema.Literal("total").annotate({
      description: "Count the full active context against the limit.",
    }),
    Schema.Literal("body_after_prefix").annotate({
      description: "Count sampled output and later growth after the carried window prefix.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Selects which part of the active context is charged against `model_auto_compact_token_limit`.",
  identifier: "V2ConfigReadResponse__AutoCompactTokenLimitScope",
});

export type V2ConfigReadResponse__ReasoningEffort = string;
export const V2ConfigReadResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ConfigReadResponse__ReasoningEffort",
  }),
);

export type V2ConfigReadResponse__ReasoningSummary = "auto" | "concise" | "detailed" | "none";
export const V2ConfigReadResponse__ReasoningSummary = Schema.Union(
  [
    Schema.Literals(["auto", "concise", "detailed"]),
    Schema.Literal("none").annotate({ description: "Option to disable reasoning summaries." }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. See https://platform.openai.com/docs/guides/reasoning?api-mode=responses#reasoning-summaries",
  identifier: "V2ConfigReadResponse__ReasoningSummary",
});

export type V2ConfigReadResponse__Verbosity = "low" | "medium" | "high";
export const V2ConfigReadResponse__Verbosity = Schema.Literals(["low", "medium", "high"]).annotate({
  description:
    "Controls output length/detail on GPT-5 models via the Responses API. Serialized with lowercase values to match the OpenAI API.",
  identifier: "V2ConfigReadResponse__Verbosity",
});

export type V2ConfigReadResponse__SandboxMode =
  | "read-only"
  | "workspace-write"
  | "danger-full-access";
export const V2ConfigReadResponse__SandboxMode = Schema.Literals([
  "read-only",
  "workspace-write",
  "danger-full-access",
]).annotate({ identifier: "V2ConfigReadResponse__SandboxMode" });

export type V2ConfigReadResponse__SandboxWorkspaceWrite = {
  readonly exclude_slash_tmp?: boolean;
  readonly exclude_tmpdir_env_var?: boolean;
  readonly network_access?: boolean;
  readonly writable_roots?: ReadonlyArray<string>;
};
export const V2ConfigReadResponse__SandboxWorkspaceWrite = Schema.Struct({
  exclude_slash_tmp: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  exclude_tmpdir_env_var: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  network_access: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  writable_roots: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
}).annotate({ identifier: "V2ConfigReadResponse__SandboxWorkspaceWrite" });

export type V2ConfigReadResponse__WebSearchContextSize = "low" | "medium" | "high";
export const V2ConfigReadResponse__WebSearchContextSize = Schema.Literals([
  "low",
  "medium",
  "high",
]).annotate({ identifier: "V2ConfigReadResponse__WebSearchContextSize" });

export type V2ConfigReadResponse__WebSearchLocation = {
  readonly city?: string | null;
  readonly country?: string | null;
  readonly region?: string | null;
  readonly timezone?: string | null;
};
export const V2ConfigReadResponse__WebSearchLocation = Schema.Struct({
  city: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  country: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  region: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  timezone: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ConfigReadResponse__WebSearchLocation" });

export type V2ConfigReadResponse__WebSearchMode = "disabled" | "cached" | "indexed" | "live";
export const V2ConfigReadResponse__WebSearchMode = Schema.Literals([
  "disabled",
  "cached",
  "indexed",
  "live",
]).annotate({ identifier: "V2ConfigReadResponse__WebSearchMode" });

export type V2ConfigReadResponse__AbsolutePathBuf = string;
export const V2ConfigReadResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ConfigReadResponse__AbsolutePathBuf",
});

export type V2ConfigReadResponse__AppToolApproval = "auto" | "prompt" | "writes" | "approve";
export const V2ConfigReadResponse__AppToolApproval = Schema.Literals([
  "auto",
  "prompt",
  "writes",
  "approve",
]).annotate({ identifier: "V2ConfigReadResponse__AppToolApproval" });

export type V2ConfigReadResponse__AppLinksConfig = { readonly [x: string]: Schema.Json };
export const V2ConfigReadResponse__AppLinksConfig = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  description: "Account settings for a single app.",
  identifier: "V2ConfigReadResponse__AppLinksConfig",
});

export type V2ConfigReadResponse__ToolExposureSurface = "code_mode" | "deferred" | "direct";
export const V2ConfigReadResponse__ToolExposureSurface = Schema.Union(
  [
    Schema.Literal("code_mode").annotate({
      description: "Nested tools available to Code Mode scripts.",
    }),
    Schema.Literal("deferred").annotate({
      description: "Tools discovered later through tool search.",
    }),
    Schema.Literal("direct").annotate({
      description: "Tools present in the model's initial tool list.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "A model-facing surface on which a tool can be exposed.",
  identifier: "V2ConfigReadResponse__ToolExposureSurface",
});

export type V2ConfigReadResponse__AppToolsConfig = { readonly [x: string]: Schema.Json };
export const V2ConfigReadResponse__AppToolsConfig = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ identifier: "V2ConfigReadResponse__AppToolsConfig" });

export type V2ConfigRequirementsReadResponse__AskForApproval =
  | "untrusted"
  | "on-request"
  | "never"
  | {
      readonly granular: {
        readonly mcp_elicitations: boolean;
        readonly request_permissions?: boolean;
        readonly rules: boolean;
        readonly sandbox_approval: boolean;
        readonly skill_approval?: boolean;
      };
    };
export const V2ConfigRequirementsReadResponse__AskForApproval = Schema.Union(
  [
    Schema.Literals(["untrusted", "on-request", "never"]),
    Schema.Struct({
      granular: Schema.Struct({
        mcp_elicitations: Schema.Boolean,
        request_permissions: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
        rules: Schema.Boolean,
        sandbox_approval: Schema.Boolean,
        skill_approval: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      }),
    }).annotate({ title: "GranularAskForApproval" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ConfigRequirementsReadResponse__AskForApproval" });

export type V2ConfigRequirementsReadResponse__ForcedLoginMethod = "chatgpt" | "api";
export const V2ConfigRequirementsReadResponse__ForcedLoginMethod = Schema.Literals([
  "chatgpt",
  "api",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__ForcedLoginMethod" });

export type V2ConfigRequirementsReadResponse__SandboxMode =
  | "read-only"
  | "workspace-write"
  | "danger-full-access";
export const V2ConfigRequirementsReadResponse__SandboxMode = Schema.Literals([
  "read-only",
  "workspace-write",
  "danger-full-access",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__SandboxMode" });

export type V2ConfigRequirementsReadResponse__WebSearchMode =
  | "disabled"
  | "cached"
  | "indexed"
  | "live";
export const V2ConfigRequirementsReadResponse__WebSearchMode = Schema.Literals([
  "disabled",
  "cached",
  "indexed",
  "live",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__WebSearchMode" });

export type V2ConfigRequirementsReadResponse__WindowsSandboxImplementation =
  | "elevated"
  | "unelevated"
  | "mxc";
export const V2ConfigRequirementsReadResponse__WindowsSandboxImplementation = Schema.Literals([
  "elevated",
  "unelevated",
  "mxc",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__WindowsSandboxImplementation" });

export type V2ConfigRequirementsReadResponse__AutoReviewRequirements = {
  readonly ignoreRules?: ReadonlyArray<string> | null;
  readonly requiredOnModels?: ReadonlyArray<string> | null;
};
export const V2ConfigRequirementsReadResponse__AutoReviewRequirements = Schema.Struct({
  ignoreRules: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  requiredOnModels: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__AutoReviewRequirements" });

export type V2ConfigRequirementsReadResponse__AllowDenyRequirement = "allow" | "deny";
export const V2ConfigRequirementsReadResponse__AllowDenyRequirement = Schema.Literals([
  "allow",
  "deny",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__AllowDenyRequirement" });

export type V2ConfigRequirementsReadResponse__BrowserUseAccessApprovalLifetime = "turn" | "thread";
export const V2ConfigRequirementsReadResponse__BrowserUseAccessApprovalLifetime = Schema.Literals([
  "turn",
  "thread",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__BrowserUseAccessApprovalLifetime" });

export type V2ConfigRequirementsReadResponse__CliAuthCredentialsStoreMode =
  | "file"
  | "keyring"
  | "auto"
  | "ephemeral";
export const V2ConfigRequirementsReadResponse__CliAuthCredentialsStoreMode = Schema.Literals([
  "file",
  "keyring",
  "auto",
  "ephemeral",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__CliAuthCredentialsStoreMode" });

export type V2ConfigRequirementsReadResponse__ResidencyRequirement = "us";
export const V2ConfigRequirementsReadResponse__ResidencyRequirement = Schema.Literal("us").annotate(
  { identifier: "V2ConfigRequirementsReadResponse__ResidencyRequirement" },
);

export type V2ConfigRequirementsReadResponse__FeedbackRequirements = {
  readonly enabled?: boolean | null;
};
export const V2ConfigRequirementsReadResponse__FeedbackRequirements = Schema.Struct({
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__FeedbackRequirements" });

export type V2ConfigRequirementsReadResponse__InAppBrowserRequirements = {
  readonly allowExternalBrowserSettingsImport?: boolean | null;
};
export const V2ConfigRequirementsReadResponse__InAppBrowserRequirements = Schema.Struct({
  allowExternalBrowserSettingsImport: Schema.optionalKey(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__InAppBrowserRequirements" });

export type V2ConfigRequirementsReadResponse__ReasoningEffort = string;
export const V2ConfigRequirementsReadResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ConfigRequirementsReadResponse__ReasoningEffort",
  }),
);

export type V2ConfigRequirementsReadResponse__NetworkDomainPermission = "allow" | "deny";
export const V2ConfigRequirementsReadResponse__NetworkDomainPermission = Schema.Literals([
  "allow",
  "deny",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__NetworkDomainPermission" });

export type V2ConfigRequirementsReadResponse__ConfiguredHookHandler =
  | {
      readonly additionalContextLimit?: number | null;
      readonly async: boolean;
      readonly command: string;
      readonly commandWindows?: string | null;
      readonly statusMessage?: string | null;
      readonly timeoutSec?: number | null;
      readonly type: "command";
    }
  | {
      readonly input: { readonly [x: string]: Schema.Json };
      readonly server: string;
      readonly statusMessage?: string | null;
      readonly timeoutSec?: number | null;
      readonly tool: string;
      readonly type: "mcp_tool";
    }
  | { readonly type: "prompt" }
  | { readonly type: "agent" };
export const V2ConfigRequirementsReadResponse__ConfiguredHookHandler = Schema.Union(
  [
    Schema.Struct({
      additionalContextLimit: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Approximate token threshold for spilling this hook's `additionalContext` to disk. `null` uses 2,500 tokens; `0` disables spilling for this hook. The threshold is evaluated against the original context; a spilled preview also includes recovery metadata.",
            format: "uint",
          })
            .check(Schema.isInt().annotate({ expected: "an integer" }))
            .check(
              Schema.isGreaterThanOrEqualTo(0).annotate({
                expected: "a value greater than or equal to 0",
              }),
            ),
          Schema.Null,
        ]),
      ),
      async: Schema.Boolean,
      command: Schema.String,
      commandWindows: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      timeoutSec: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "uint64" })
            .check(Schema.isInt().annotate({ expected: "an integer" }))
            .check(
              Schema.isGreaterThanOrEqualTo(0).annotate({
                expected: "a value greater than or equal to 0",
              }),
            ),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("command").annotate({ title: "CommandConfiguredHookHandlerType" }),
    }).annotate({ title: "CommandConfiguredHookHandler" }),
    Schema.Struct({
      input: Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })),
      server: Schema.String,
      statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      timeoutSec: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "uint64" })
            .check(Schema.isInt().annotate({ expected: "an integer" }))
            .check(
              Schema.isGreaterThanOrEqualTo(0).annotate({
                expected: "a value greater than or equal to 0",
              }),
            ),
          Schema.Null,
        ]),
      ),
      tool: Schema.String,
      type: Schema.Literal("mcp_tool").annotate({ title: "McpToolConfiguredHookHandlerType" }),
    }).annotate({ title: "McpToolConfiguredHookHandler" }),
    Schema.Struct({
      type: Schema.Literal("prompt").annotate({ title: "PromptConfiguredHookHandlerType" }),
    }).annotate({ title: "PromptConfiguredHookHandler" }),
    Schema.Struct({
      type: Schema.Literal("agent").annotate({ title: "AgentConfiguredHookHandlerType" }),
    }).annotate({ title: "AgentConfiguredHookHandler" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ConfigRequirementsReadResponse__ConfiguredHookHandler" });

export type V2ConfigRequirementsReadResponse__NetworkUnixSocketPermission = "allow" | "deny";
export const V2ConfigRequirementsReadResponse__NetworkUnixSocketPermission = Schema.Literals([
  "allow",
  "deny",
]).annotate({ identifier: "V2ConfigRequirementsReadResponse__NetworkUnixSocketPermission" });

export type V2ConfigValueWriteParams__MergeStrategy = "replace" | "upsert";
export const V2ConfigValueWriteParams__MergeStrategy = Schema.Literals([
  "replace",
  "upsert",
]).annotate({ identifier: "V2ConfigValueWriteParams__MergeStrategy" });

export type V2ConfigWarningNotification__TextPosition = {
  readonly column: number;
  readonly line: number;
};
export const V2ConfigWarningNotification__TextPosition = Schema.Struct({
  column: Schema.Number.annotate({
    description: "1-based column number (in Unicode scalar values).",
    format: "uint",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  line: Schema.Number.annotate({ description: "1-based line number.", format: "uint" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({ identifier: "V2ConfigWarningNotification__TextPosition" });

export type V2ConfigWriteResponse__AbsolutePathBuf = string;
export const V2ConfigWriteResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ConfigWriteResponse__AbsolutePathBuf",
});

export type V2ConfigWriteResponse__WriteStatus = "ok" | "okOverridden";
export const V2ConfigWriteResponse__WriteStatus = Schema.Literals(["ok", "okOverridden"]).annotate({
  identifier: "V2ConfigWriteResponse__WriteStatus",
});

export type V2ConsumeAccountRateLimitResetCreditResponse__ConsumeAccountRateLimitResetCreditOutcome =
  | "reset"
  | "nothingToReset"
  | "noCredit"
  | "alreadyRedeemed";
export const V2ConsumeAccountRateLimitResetCreditResponse__ConsumeAccountRateLimitResetCreditOutcome =
  Schema.Union(
    [
      Schema.Literal("reset").annotate({
        description: "A reset credit was consumed and the eligible rate-limit windows were reset.",
      }),
      Schema.Literal("nothingToReset").annotate({
        description: "No current rate-limit window is eligible for a reset.",
      }),
      Schema.Literal("noCredit").annotate({
        description: "The account has no earned reset credits available.",
      }),
      Schema.Literal("alreadyRedeemed").annotate({
        description: "The same idempotency key already completed a reset successfully.",
      }),
    ],
    { mode: "oneOf" },
  ).annotate({
    identifier:
      "V2ConsumeAccountRateLimitResetCreditResponse__ConsumeAccountRateLimitResetCreditOutcome",
  });

export type V2ErrorNotification__NonSteerableTurnKind = "review" | "compact";
export const V2ErrorNotification__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ErrorNotification__NonSteerableTurnKind" });

export type V2ErrorNotification__MisalignmentSteer = { readonly message: string };
export const V2ErrorNotification__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ErrorNotification__MisalignmentSteer" });

export type V2ExperimentalFeatureListResponse__ExperimentalFeatureStage =
  | "beta"
  | "underDevelopment"
  | "stable"
  | "deprecated"
  | "removed";
export const V2ExperimentalFeatureListResponse__ExperimentalFeatureStage = Schema.Union(
  [
    Schema.Literal("beta").annotate({
      description: "Feature is available for user testing and feedback.",
    }),
    Schema.Literal("underDevelopment").annotate({
      description: "Feature is still being built and not ready for broad use.",
    }),
    Schema.Literal("stable").annotate({ description: "Feature is production-ready." }),
    Schema.Literal("deprecated").annotate({
      description: "Feature is deprecated and should be avoided.",
    }),
    Schema.Literal("removed").annotate({
      description: "Feature flag is retained only for backwards compatibility.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ExperimentalFeatureListResponse__ExperimentalFeatureStage" });

export type V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorSource =
  | "remoteMcpServersConfig"
  | "sessionToolUse";
export const V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorSource =
  Schema.Literals(["remoteMcpServersConfig", "sessionToolUse"]).annotate({
    identifier: "V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorSource",
  });

export type V2ExternalAgentConfigDetectResponse__CommandMigration = { readonly name: string };
export const V2ExternalAgentConfigDetectResponse__CommandMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigDetectResponse__CommandMigration" });

export type V2ExternalAgentConfigDetectResponse__HookMigration = { readonly name: string };
export const V2ExternalAgentConfigDetectResponse__HookMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigDetectResponse__HookMigration" });

export type V2ExternalAgentConfigDetectResponse__McpServerMigration = { readonly name: string };
export const V2ExternalAgentConfigDetectResponse__McpServerMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigDetectResponse__McpServerMigration" });

export type V2ExternalAgentConfigDetectResponse__PluginsMigration = {
  readonly marketplaceName: string;
  readonly pluginNames: ReadonlyArray<string>;
};
export const V2ExternalAgentConfigDetectResponse__PluginsMigration = Schema.Struct({
  marketplaceName: Schema.String,
  pluginNames: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ExternalAgentConfigDetectResponse__PluginsMigration" });

export type V2ExternalAgentConfigDetectResponse__SessionMigration = {
  readonly cwd: string;
  readonly path: string;
  readonly title?: string | null;
};
export const V2ExternalAgentConfigDetectResponse__SessionMigration = Schema.Struct({
  cwd: Schema.String,
  path: Schema.String,
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ExternalAgentConfigDetectResponse__SessionMigration" });

export type V2ExternalAgentConfigDetectResponse__SkillMigration = { readonly name: string };
export const V2ExternalAgentConfigDetectResponse__SkillMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigDetectResponse__SkillMigration" });

export type V2ExternalAgentConfigDetectResponse__SubagentMigration = { readonly name: string };
export const V2ExternalAgentConfigDetectResponse__SubagentMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigDetectResponse__SubagentMigration" });
