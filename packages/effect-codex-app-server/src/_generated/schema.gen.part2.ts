/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";

export type V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItemType =
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
export const V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItemType =
  Schema.Literals([
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
  ]).annotate({
    identifier: "V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItemType",
  });

export type V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType =
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
export const V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType =
  Schema.Literals([
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
  ]).annotate({
    identifier:
      "V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType",
  });

export type V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorSource =
  "remoteMcpServersConfig";
export const V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorSource =
  Schema.Literal("remoteMcpServersConfig").annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorSource",
  });

export type V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigMigrationItemType =
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
export const V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigMigrationItemType =
  Schema.Literals([
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
  ]).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigMigrationItemType",
  });

export type V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType =
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
export const V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType =
  Schema.Literals([
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
  ]).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType",
  });

export type V2ExternalAgentConfigImportParams__CommandMigration = { readonly name: string };
export const V2ExternalAgentConfigImportParams__CommandMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__CommandMigration" });

export type V2ExternalAgentConfigImportParams__HookMigration = { readonly name: string };
export const V2ExternalAgentConfigImportParams__HookMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__HookMigration" });

export type V2ExternalAgentConfigImportParams__McpServerMigration = { readonly name: string };
export const V2ExternalAgentConfigImportParams__McpServerMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__McpServerMigration" });

export type V2ExternalAgentConfigImportParams__PluginsMigration = {
  readonly marketplaceName: string;
  readonly pluginNames: ReadonlyArray<string>;
};
export const V2ExternalAgentConfigImportParams__PluginsMigration = Schema.Struct({
  marketplaceName: Schema.String,
  pluginNames: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__PluginsMigration" });

export type V2ExternalAgentConfigImportParams__SessionMigration = {
  readonly cwd: string;
  readonly path: string;
  readonly title?: string | null;
};
export const V2ExternalAgentConfigImportParams__SessionMigration = Schema.Struct({
  cwd: Schema.String,
  path: Schema.String,
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__SessionMigration" });

export type V2ExternalAgentConfigImportParams__SkillMigration = { readonly name: string };
export const V2ExternalAgentConfigImportParams__SkillMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__SkillMigration" });

export type V2ExternalAgentConfigImportParams__SubagentMigration = { readonly name: string };
export const V2ExternalAgentConfigImportParams__SubagentMigration = Schema.Struct({
  name: Schema.String,
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__SubagentMigration" });

export type V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItemType =
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
export const V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItemType =
  Schema.Literals([
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
  ]).annotate({
    identifier: "V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItemType",
  });

export type V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType =
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
export const V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType =
  Schema.Literals([
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
  ]).annotate({
    identifier:
      "V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType",
  });

export type V2FileChangePatchUpdatedNotification__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2FileChangePatchUpdatedNotification__PatchChangeKind = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("add").annotate({ title: "AddPatchChangeKindType" }),
    }).annotate({ title: "AddPatchChangeKind" }),
    Schema.Struct({
      type: Schema.Literal("delete").annotate({ title: "DeletePatchChangeKindType" }),
    }).annotate({ title: "DeletePatchChangeKind" }),
    Schema.Struct({
      move_path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("update").annotate({ title: "UpdatePatchChangeKindType" }),
    }).annotate({ title: "UpdatePatchChangeKind" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2FileChangePatchUpdatedNotification__PatchChangeKind" });

export type V2FsChangedNotification__AbsolutePathBuf = string;
export const V2FsChangedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsChangedNotification__AbsolutePathBuf",
});

export type V2FsCopyParams__AbsolutePathBuf = string;
export const V2FsCopyParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsCopyParams__AbsolutePathBuf",
});

export type V2FsCreateDirectoryParams__AbsolutePathBuf = string;
export const V2FsCreateDirectoryParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsCreateDirectoryParams__AbsolutePathBuf",
});

export type V2FsGetMetadataParams__AbsolutePathBuf = string;
export const V2FsGetMetadataParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsGetMetadataParams__AbsolutePathBuf",
});

export type V2FsReadDirectoryParams__AbsolutePathBuf = string;
export const V2FsReadDirectoryParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsReadDirectoryParams__AbsolutePathBuf",
});

export type V2FsReadDirectoryResponse__FsReadDirectoryEntry = {
  readonly fileName: string;
  readonly isDirectory: boolean;
  readonly isFile: boolean;
};
export const V2FsReadDirectoryResponse__FsReadDirectoryEntry = Schema.Struct({
  fileName: Schema.String.annotate({
    description: "Direct child entry name only, not an absolute or relative path.",
  }),
  isDirectory: Schema.Boolean.annotate({
    description: "Whether this entry resolves to a directory.",
  }),
  isFile: Schema.Boolean.annotate({
    description: "Whether this entry resolves to a regular file.",
  }),
}).annotate({
  description: "A directory entry returned by `fs/readDirectory`.",
  identifier: "V2FsReadDirectoryResponse__FsReadDirectoryEntry",
});

export type V2FsReadFileParams__AbsolutePathBuf = string;
export const V2FsReadFileParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsReadFileParams__AbsolutePathBuf",
});

export type V2FsRemoveParams__AbsolutePathBuf = string;
export const V2FsRemoveParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsRemoveParams__AbsolutePathBuf",
});

export type V2FsWatchParams__AbsolutePathBuf = string;
export const V2FsWatchParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsWatchParams__AbsolutePathBuf",
});

export type V2FsWatchResponse__AbsolutePathBuf = string;
export const V2FsWatchResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsWatchResponse__AbsolutePathBuf",
});

export type V2FsWriteFileParams__AbsolutePathBuf = string;
export const V2FsWriteFileParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2FsWriteFileParams__AbsolutePathBuf",
});

export type V2GatewayOAuthChangedNotification__GatewayOAuthStatus =
  | "notReady"
  | "started"
  | "succeeded"
  | "failed";
export const V2GatewayOAuthChangedNotification__GatewayOAuthStatus = Schema.Literals([
  "notReady",
  "started",
  "succeeded",
  "failed",
]).annotate({ identifier: "V2GatewayOAuthChangedNotification__GatewayOAuthStatus" });

export type V2GatewayOAuthReadResponse__GatewayOAuthStatus =
  | "notReady"
  | "started"
  | "succeeded"
  | "failed";
export const V2GatewayOAuthReadResponse__GatewayOAuthStatus = Schema.Literals([
  "notReady",
  "started",
  "succeeded",
  "failed",
]).annotate({ identifier: "V2GatewayOAuthReadResponse__GatewayOAuthStatus" });

export type V2GetAccountRateLimitsResponse__RateLimitResetType = "codexRateLimits" | "unknown";
export const V2GetAccountRateLimitsResponse__RateLimitResetType = Schema.Literals([
  "codexRateLimits",
  "unknown",
]).annotate({ identifier: "V2GetAccountRateLimitsResponse__RateLimitResetType" });

export type V2GetAccountRateLimitsResponse__RateLimitResetCreditStatus =
  | "available"
  | "redeeming"
  | "redeemed"
  | "unknown";
export const V2GetAccountRateLimitsResponse__RateLimitResetCreditStatus = Schema.Literals([
  "available",
  "redeeming",
  "redeemed",
  "unknown",
]).annotate({ identifier: "V2GetAccountRateLimitsResponse__RateLimitResetCreditStatus" });

export type V2GetAccountRateLimitsResponse__CreditsSnapshot = {
  readonly balance?: string | null;
  readonly hasCredits: boolean;
  readonly unlimited: boolean;
};
export const V2GetAccountRateLimitsResponse__CreditsSnapshot = Schema.Struct({
  balance: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  hasCredits: Schema.Boolean,
  unlimited: Schema.Boolean,
}).annotate({ identifier: "V2GetAccountRateLimitsResponse__CreditsSnapshot" });

export type V2GetAccountRateLimitsResponse__SpendControlLimitSnapshot = {
  readonly limit: string;
  readonly remainingPercent: number;
  readonly resetsAt: number;
  readonly used: string;
};
export const V2GetAccountRateLimitsResponse__SpendControlLimitSnapshot = Schema.Struct({
  limit: Schema.String,
  remainingPercent: Schema.Number.annotate({ format: "int32" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  resetsAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  used: Schema.String,
}).annotate({ identifier: "V2GetAccountRateLimitsResponse__SpendControlLimitSnapshot" });

export type V2GetAccountRateLimitsResponse__PlanType = string;
export const V2GetAccountRateLimitsResponse__PlanType = Schema.String.annotate({
  identifier: "V2GetAccountRateLimitsResponse__PlanType",
});

export type V2GetAccountRateLimitsResponse__RateLimitWindow = {
  readonly resetsAt?: number | null;
  readonly usedPercent: number;
  readonly windowDurationMins?: number | null;
};
export const V2GetAccountRateLimitsResponse__RateLimitWindow = Schema.Struct({
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
}).annotate({ identifier: "V2GetAccountRateLimitsResponse__RateLimitWindow" });

export type V2GetAccountRateLimitsResponse__RateLimitReachedType =
  | "rate_limit_reached"
  | "workspace_owner_credits_depleted"
  | "workspace_member_credits_depleted"
  | "workspace_owner_usage_limit_reached"
  | "workspace_member_usage_limit_reached";
export const V2GetAccountRateLimitsResponse__RateLimitReachedType = Schema.Literals([
  "rate_limit_reached",
  "workspace_owner_credits_depleted",
  "workspace_member_credits_depleted",
  "workspace_owner_usage_limit_reached",
  "workspace_member_usage_limit_reached",
]).annotate({ identifier: "V2GetAccountRateLimitsResponse__RateLimitReachedType" });

export type V2GetAccountResponse__PlanType = string;
export const V2GetAccountResponse__PlanType = Schema.String.annotate({
  identifier: "V2GetAccountResponse__PlanType",
});

export type V2GetAccountResponse__AccountRoutingOverride = "NO_CONSTRAINT" | "us" | "us_cr";
export const V2GetAccountResponse__AccountRoutingOverride = Schema.Literals([
  "NO_CONSTRAINT",
  "us",
  "us_cr",
]).annotate({
  description: "Backend routing policy. Wire values match the accounts/check contract.",
  identifier: "V2GetAccountResponse__AccountRoutingOverride",
});

export type V2GetAccountTokenUsageResponse__AccountTokenUsageDailyBucket = {
  readonly startDate: string;
  readonly tokens: number;
};
export const V2GetAccountTokenUsageResponse__AccountTokenUsageDailyBucket = Schema.Struct({
  startDate: Schema.String,
  tokens: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
}).annotate({ identifier: "V2GetAccountTokenUsageResponse__AccountTokenUsageDailyBucket" });

export type V2GetAccountTokenUsageResponse__AccountTokenUsageSummary = {
  readonly currentStreakDays?: number | null;
  readonly lifetimeTokens?: number | null;
  readonly longestRunningTurnSec?: number | null;
  readonly longestStreakDays?: number | null;
  readonly peakDailyTokens?: number | null;
};
export const V2GetAccountTokenUsageResponse__AccountTokenUsageSummary = Schema.Struct({
  currentStreakDays: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  lifetimeTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  longestRunningTurnSec: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  longestStreakDays: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  peakDailyTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2GetAccountTokenUsageResponse__AccountTokenUsageSummary" });

export type V2GetAccountTokenUsageResponse__ThreadUsageBreakdownGroup = {
  readonly cachedInputTokens?: number | null;
  readonly estimatedUsageCreditsMicros: number;
  readonly inputTokens?: number | null;
  readonly model?: string | null;
  readonly netNewInputTokens?: number | null;
  readonly outputTokens?: number | null;
  readonly reasoningEffort?: string | null;
  readonly speed?: string | null;
  readonly totalTokens?: number | null;
};
export const V2GetAccountTokenUsageResponse__ThreadUsageBreakdownGroup = Schema.Struct({
  cachedInputTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  estimatedUsageCreditsMicros: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  inputTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  model: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  netNewInputTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  outputTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  reasoningEffort: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  speed: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  totalTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2GetAccountTokenUsageResponse__ThreadUsageBreakdownGroup" });

export type V2GetWorkspaceMessagesResponse__WorkspaceMessageType =
  | "headline"
  | "announcement"
  | "unknown";
export const V2GetWorkspaceMessagesResponse__WorkspaceMessageType = Schema.Literals([
  "headline",
  "announcement",
  "unknown",
]).annotate({ identifier: "V2GetWorkspaceMessagesResponse__WorkspaceMessageType" });

export type V2HookCompletedNotification__HookOutputEntryKind =
  | "warning"
  | "stop"
  | "feedback"
  | "context"
  | "error";
export const V2HookCompletedNotification__HookOutputEntryKind = Schema.Literals([
  "warning",
  "stop",
  "feedback",
  "context",
  "error",
]).annotate({ identifier: "V2HookCompletedNotification__HookOutputEntryKind" });

export type V2HookCompletedNotification__HookEventName = string;
export const V2HookCompletedNotification__HookEventName = Schema.String.annotate({
  identifier: "V2HookCompletedNotification__HookEventName",
});

export type V2HookCompletedNotification__HookExecutionMode = "sync" | "async";
export const V2HookCompletedNotification__HookExecutionMode = Schema.Literals([
  "sync",
  "async",
]).annotate({ identifier: "V2HookCompletedNotification__HookExecutionMode" });

export type V2HookCompletedNotification__HookHandlerType =
  | "command"
  | "mcpTool"
  | "prompt"
  | "agent";
export const V2HookCompletedNotification__HookHandlerType = Schema.Literals([
  "command",
  "mcpTool",
  "prompt",
  "agent",
]).annotate({ identifier: "V2HookCompletedNotification__HookHandlerType" });

export type V2HookCompletedNotification__HookScope = "thread" | "turn";
export const V2HookCompletedNotification__HookScope = Schema.Literals(["thread", "turn"]).annotate({
  identifier: "V2HookCompletedNotification__HookScope",
});

export type V2HookCompletedNotification__HookSource =
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
export const V2HookCompletedNotification__HookSource = Schema.Literals([
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
]).annotate({ identifier: "V2HookCompletedNotification__HookSource" });

export type V2HookCompletedNotification__AbsolutePathBuf = string;
export const V2HookCompletedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2HookCompletedNotification__AbsolutePathBuf",
});

export type V2HookCompletedNotification__HookRunStatus =
  | "running"
  | "completed"
  | "failed"
  | "blocked"
  | "stopped";
export const V2HookCompletedNotification__HookRunStatus = Schema.Literals([
  "running",
  "completed",
  "failed",
  "blocked",
  "stopped",
]).annotate({ identifier: "V2HookCompletedNotification__HookRunStatus" });

export type V2HooksListResponse__HookErrorInfo = {
  readonly message: string;
  readonly path: string;
};
export const V2HooksListResponse__HookErrorInfo = Schema.Struct({
  message: Schema.String,
  path: Schema.String,
}).annotate({ identifier: "V2HooksListResponse__HookErrorInfo" });

export type V2HooksListResponse__HookEventName = string;
export const V2HooksListResponse__HookEventName = Schema.String.annotate({
  identifier: "V2HooksListResponse__HookEventName",
});

export type V2HooksListResponse__HookSource =
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
export const V2HooksListResponse__HookSource = Schema.Literals([
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
]).annotate({ identifier: "V2HooksListResponse__HookSource" });

export type V2HooksListResponse__AbsolutePathBuf = string;
export const V2HooksListResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2HooksListResponse__AbsolutePathBuf",
});

export type V2HooksListResponse__HookTrustStatus = "managed" | "untrusted" | "trusted" | "modified";
export const V2HooksListResponse__HookTrustStatus = Schema.Literals([
  "managed",
  "untrusted",
  "trusted",
  "modified",
]).annotate({ identifier: "V2HooksListResponse__HookTrustStatus" });

export type V2HookStartedNotification__HookOutputEntryKind =
  | "warning"
  | "stop"
  | "feedback"
  | "context"
  | "error";
export const V2HookStartedNotification__HookOutputEntryKind = Schema.Literals([
  "warning",
  "stop",
  "feedback",
  "context",
  "error",
]).annotate({ identifier: "V2HookStartedNotification__HookOutputEntryKind" });

export type V2HookStartedNotification__HookEventName = string;
export const V2HookStartedNotification__HookEventName = Schema.String.annotate({
  identifier: "V2HookStartedNotification__HookEventName",
});

export type V2HookStartedNotification__HookExecutionMode = "sync" | "async";
export const V2HookStartedNotification__HookExecutionMode = Schema.Literals([
  "sync",
  "async",
]).annotate({ identifier: "V2HookStartedNotification__HookExecutionMode" });

export type V2HookStartedNotification__HookHandlerType = "command" | "mcpTool" | "prompt" | "agent";
export const V2HookStartedNotification__HookHandlerType = Schema.Literals([
  "command",
  "mcpTool",
  "prompt",
  "agent",
]).annotate({ identifier: "V2HookStartedNotification__HookHandlerType" });

export type V2HookStartedNotification__HookScope = "thread" | "turn";
export const V2HookStartedNotification__HookScope = Schema.Literals(["thread", "turn"]).annotate({
  identifier: "V2HookStartedNotification__HookScope",
});

export type V2HookStartedNotification__HookSource =
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
export const V2HookStartedNotification__HookSource = Schema.Literals([
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
]).annotate({ identifier: "V2HookStartedNotification__HookSource" });

export type V2HookStartedNotification__AbsolutePathBuf = string;
export const V2HookStartedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2HookStartedNotification__AbsolutePathBuf",
});

export type V2HookStartedNotification__HookRunStatus =
  | "running"
  | "completed"
  | "failed"
  | "blocked"
  | "stopped";
export const V2HookStartedNotification__HookRunStatus = Schema.Literals([
  "running",
  "completed",
  "failed",
  "blocked",
  "stopped",
]).annotate({ identifier: "V2HookStartedNotification__HookRunStatus" });

export type V2ItemCompletedNotification__ByteRange = {
  readonly end: number;
  readonly start: number;
};
export const V2ItemCompletedNotification__ByteRange = Schema.Struct({
  end: Schema.Number.annotate({ format: "uint" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  start: Schema.Number.annotate({ format: "uint" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({ identifier: "V2ItemCompletedNotification__ByteRange" });

export type V2ItemCompletedNotification__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ItemCompletedNotification__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ItemCompletedNotification__ImageDetail" });

export type V2ItemCompletedNotification__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ItemCompletedNotification__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ItemCompletedNotification__HookPromptFragment" });

export type V2ItemCompletedNotification__AgentMessageDelivery = "async";
export const V2ItemCompletedNotification__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ItemCompletedNotification__AgentMessageDelivery",
});

export type V2ItemCompletedNotification__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ItemCompletedNotification__MemoryCitationEntry = Schema.Struct({
  lineEnd: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  lineStart: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  note: Schema.String,
  path: Schema.String,
}).annotate({ identifier: "V2ItemCompletedNotification__MemoryCitationEntry" });

export type V2ItemCompletedNotification__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2ItemCompletedNotification__MessagePhase = Schema.Union(
  [
    Schema.Literal("commentary").annotate({
      description:
        "Mid-turn assistant text (for example preamble/progress narration).\n\nAdditional tool calls or assistant output may follow before turn completion.",
    }),
    Schema.Literal("partial_answer").annotate({
      description: "Stable answer text that may be followed by more assistant output or tools.",
    }),
    Schema.Literal("final_answer").annotate({
      description: "The assistant's terminal answer text for the current turn.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    'Classifies an assistant message as interim commentary or final answer text.\n\nProviders do not emit this consistently, so callers must treat `None` as "phase unknown" and keep compatibility behavior for legacy models.',
  identifier: "V2ItemCompletedNotification__MessagePhase",
});

export type V2ItemCompletedNotification__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ItemCompletedNotification__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ItemCompletedNotification__AsyncUserInputQuestion" });

export type V2ItemCompletedNotification__LegacyAppPathString = string;
export const V2ItemCompletedNotification__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ItemCompletedNotification__LegacyAppPathString",
});

export type V2ItemCompletedNotification__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ItemCompletedNotification__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ItemCompletedNotification__CommandExecutionSource" });

export type V2ItemCompletedNotification__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ItemCompletedNotification__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ItemCompletedNotification__CommandExecutionStatus" });

export type V2ItemCompletedNotification__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ItemCompletedNotification__PatchChangeKind = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("add").annotate({ title: "AddPatchChangeKindType" }),
    }).annotate({ title: "AddPatchChangeKind" }),
    Schema.Struct({
      type: Schema.Literal("delete").annotate({ title: "DeletePatchChangeKindType" }),
    }).annotate({ title: "DeletePatchChangeKind" }),
    Schema.Struct({
      move_path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("update").annotate({ title: "UpdatePatchChangeKindType" }),
    }).annotate({ title: "UpdatePatchChangeKind" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemCompletedNotification__PatchChangeKind" });

export type V2ItemCompletedNotification__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ItemCompletedNotification__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ItemCompletedNotification__PatchApplyStatus" });

export type V2ItemCompletedNotification__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ItemCompletedNotification__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ItemCompletedNotification__McpToolCallAppContext" });

export type V2ItemCompletedNotification__McpToolCallError = { readonly message: string };
export const V2ItemCompletedNotification__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ItemCompletedNotification__McpToolCallError" });

export type V2ItemCompletedNotification__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ItemCompletedNotification__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ItemCompletedNotification__McpAppDisplayMode" });

export type V2ItemCompletedNotification__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ItemCompletedNotification__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ItemCompletedNotification__McpToolCallResult" });

export type V2ItemCompletedNotification__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ItemCompletedNotification__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ItemCompletedNotification__McpToolCallStatus" });

export type V2ItemCompletedNotification__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ItemCompletedNotification__DynamicToolCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("inputText").annotate({
        title: "InputTextDynamicToolCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextDynamicToolCallOutputContentItem" }),
    Schema.Struct({
      imageUrl: Schema.String,
      type: Schema.Literal("inputImage").annotate({
        title: "InputImageDynamicToolCallOutputContentItemType",
      }),
    }).annotate({ title: "InputImageDynamicToolCallOutputContentItem" }),
    Schema.Struct({
      audioUrl: Schema.String,
      type: Schema.Literal("inputAudio").annotate({
        title: "InputAudioDynamicToolCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioDynamicToolCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemCompletedNotification__DynamicToolCallOutputContentItem" });

export type V2ItemCompletedNotification__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2ItemCompletedNotification__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ItemCompletedNotification__DynamicToolCallStatus" });

export type V2ItemCompletedNotification__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ItemCompletedNotification__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ItemCompletedNotification__CollabAgentStatus" });

export type V2ItemCompletedNotification__ReasoningEffort = string;
export const V2ItemCompletedNotification__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ItemCompletedNotification__ReasoningEffort",
  }),
);

export type V2ItemCompletedNotification__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ItemCompletedNotification__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ItemCompletedNotification__CollabAgentToolCallStatus" });

export type V2ItemCompletedNotification__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ItemCompletedNotification__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ItemCompletedNotification__CollabAgentTool" });

export type V2ItemCompletedNotification__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ItemCompletedNotification__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ItemCompletedNotification__SubAgentActivityKind" });

export type V2ItemCompletedNotification__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ItemCompletedNotification__WebSearchAction = Schema.Union(
  [
    Schema.Struct({
      queries: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchWebSearchActionType" }),
    }).annotate({ title: "SearchWebSearchAction" }),
    Schema.Struct({
      type: Schema.Literal("openPage").annotate({ title: "OpenPageWebSearchActionType" }),
      url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }).annotate({ title: "OpenPageWebSearchAction" }),
    Schema.Struct({
      pattern: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("findInPage").annotate({ title: "FindInPageWebSearchActionType" }),
      url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }).annotate({ title: "FindInPageWebSearchAction" }),
    Schema.Struct({
      type: Schema.Literal("other").annotate({ title: "OtherWebSearchActionType" }),
    }).annotate({ title: "OtherWebSearchAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemCompletedNotification__WebSearchAction" });

export type V2ItemCompletedNotification__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ItemCompletedNotification__ImageGenerationFailure = Schema.Union(
  [
    Schema.Struct({
      limitId: Schema.String,
      resetsAt: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "int64" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("usageLimitExceeded").annotate({
        title: "UsageLimitExceededImageGenerationFailureType",
      }),
    }).annotate({ title: "UsageLimitExceededImageGenerationFailure" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemCompletedNotification__ImageGenerationFailure" });

export type V2ItemCompletedNotification__AbsolutePathBuf = string;
export const V2ItemCompletedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ItemCompletedNotification__AbsolutePathBuf",
});

export type V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString = string;
export const V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString =
  Schema.String.annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__GuardianCommandSource =
  | "shell"
  | "unifiedExec";
export const V2ItemGuardianApprovalReviewCompletedNotification__GuardianCommandSource =
  Schema.Literals(["shell", "unifiedExec"]).annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__GuardianCommandSource",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__AbsolutePathBuf = string;
export const V2ItemGuardianApprovalReviewCompletedNotification__AbsolutePathBuf =
  Schema.String.annotate({
    description:
      "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__AbsolutePathBuf",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__NetworkApprovalProtocol =
  | "http"
  | "https"
  | "socks5Tcp"
  | "socks5Udp";
export const V2ItemGuardianApprovalReviewCompletedNotification__NetworkApprovalProtocol =
  Schema.Literals(["http", "https", "socks5Tcp", "socks5Udp"]).annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__NetworkApprovalProtocol",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__FileSystemAccessMode =
  | "read"
  | "write"
  | "deny";
export const V2ItemGuardianApprovalReviewCompletedNotification__FileSystemAccessMode =
  Schema.Literals(["read", "write", "deny"]).annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__FileSystemAccessMode",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__AdditionalNetworkPermissions = {
  readonly enabled?: boolean | null;
};
export const V2ItemGuardianApprovalReviewCompletedNotification__AdditionalNetworkPermissions =
  Schema.Struct({
    enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }).annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__AdditionalNetworkPermissions",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__AutoReviewDecisionSource = "agent";
export const V2ItemGuardianApprovalReviewCompletedNotification__AutoReviewDecisionSource =
  Schema.Literal("agent").annotate({
    description: "[UNSTABLE] Source that produced a terminal approval auto-review decision.",
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__AutoReviewDecisionSource",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__GuardianRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";
export const V2ItemGuardianApprovalReviewCompletedNotification__GuardianRiskLevel = Schema.Literals(
  ["low", "medium", "high", "critical"],
).annotate({
  description: "[UNSTABLE] Risk level assigned by approval auto-review.",
  identifier: "V2ItemGuardianApprovalReviewCompletedNotification__GuardianRiskLevel",
});

export type V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewStatus =
  | "inProgress"
  | "approved"
  | "denied"
  | "timedOut"
  | "aborted";
export const V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewStatus =
  Schema.Literals(["inProgress", "approved", "denied", "timedOut", "aborted"]).annotate({
    description: "[UNSTABLE] Lifecycle state for an approval auto-review.",
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewStatus",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__GuardianUserAuthorization =
  | "unknown"
  | "low"
  | "medium"
  | "high";
export const V2ItemGuardianApprovalReviewCompletedNotification__GuardianUserAuthorization =
  Schema.Literals(["unknown", "low", "medium", "high"]).annotate({
    description: "[UNSTABLE] Authorization level assigned by approval auto-review.",
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__GuardianUserAuthorization",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString = string;
export const V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString =
  Schema.String.annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__GuardianCommandSource =
  | "shell"
  | "unifiedExec";
export const V2ItemGuardianApprovalReviewStartedNotification__GuardianCommandSource =
  Schema.Literals(["shell", "unifiedExec"]).annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__GuardianCommandSource",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__AbsolutePathBuf = string;
export const V2ItemGuardianApprovalReviewStartedNotification__AbsolutePathBuf =
  Schema.String.annotate({
    description:
      "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__AbsolutePathBuf",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__NetworkApprovalProtocol =
  | "http"
  | "https"
  | "socks5Tcp"
  | "socks5Udp";
export const V2ItemGuardianApprovalReviewStartedNotification__NetworkApprovalProtocol =
  Schema.Literals(["http", "https", "socks5Tcp", "socks5Udp"]).annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__NetworkApprovalProtocol",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__FileSystemAccessMode =
  | "read"
  | "write"
  | "deny";
export const V2ItemGuardianApprovalReviewStartedNotification__FileSystemAccessMode =
  Schema.Literals(["read", "write", "deny"]).annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__FileSystemAccessMode",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__AdditionalNetworkPermissions = {
  readonly enabled?: boolean | null;
};
export const V2ItemGuardianApprovalReviewStartedNotification__AdditionalNetworkPermissions =
  Schema.Struct({
    enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  }).annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__AdditionalNetworkPermissions",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__GuardianRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";
export const V2ItemGuardianApprovalReviewStartedNotification__GuardianRiskLevel = Schema.Literals([
  "low",
  "medium",
  "high",
  "critical",
]).annotate({
  description: "[UNSTABLE] Risk level assigned by approval auto-review.",
  identifier: "V2ItemGuardianApprovalReviewStartedNotification__GuardianRiskLevel",
});

export type V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewStatus =
  | "inProgress"
  | "approved"
  | "denied"
  | "timedOut"
  | "aborted";
export const V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewStatus =
  Schema.Literals(["inProgress", "approved", "denied", "timedOut", "aborted"]).annotate({
    description: "[UNSTABLE] Lifecycle state for an approval auto-review.",
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewStatus",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__GuardianUserAuthorization =
  | "unknown"
  | "low"
  | "medium"
  | "high";
export const V2ItemGuardianApprovalReviewStartedNotification__GuardianUserAuthorization =
  Schema.Literals(["unknown", "low", "medium", "high"]).annotate({
    description: "[UNSTABLE] Authorization level assigned by approval auto-review.",
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__GuardianUserAuthorization",
  });

export type V2ItemStartedNotification__ByteRange = { readonly end: number; readonly start: number };
export const V2ItemStartedNotification__ByteRange = Schema.Struct({
  end: Schema.Number.annotate({ format: "uint" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  start: Schema.Number.annotate({ format: "uint" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({ identifier: "V2ItemStartedNotification__ByteRange" });

export type V2ItemStartedNotification__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ItemStartedNotification__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ItemStartedNotification__ImageDetail" });

export type V2ItemStartedNotification__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ItemStartedNotification__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ItemStartedNotification__HookPromptFragment" });

export type V2ItemStartedNotification__AgentMessageDelivery = "async";
export const V2ItemStartedNotification__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ItemStartedNotification__AgentMessageDelivery",
});

export type V2ItemStartedNotification__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ItemStartedNotification__MemoryCitationEntry = Schema.Struct({
  lineEnd: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  lineStart: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  note: Schema.String,
  path: Schema.String,
}).annotate({ identifier: "V2ItemStartedNotification__MemoryCitationEntry" });

export type V2ItemStartedNotification__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2ItemStartedNotification__MessagePhase = Schema.Union(
  [
    Schema.Literal("commentary").annotate({
      description:
        "Mid-turn assistant text (for example preamble/progress narration).\n\nAdditional tool calls or assistant output may follow before turn completion.",
    }),
    Schema.Literal("partial_answer").annotate({
      description: "Stable answer text that may be followed by more assistant output or tools.",
    }),
    Schema.Literal("final_answer").annotate({
      description: "The assistant's terminal answer text for the current turn.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    'Classifies an assistant message as interim commentary or final answer text.\n\nProviders do not emit this consistently, so callers must treat `None` as "phase unknown" and keep compatibility behavior for legacy models.',
  identifier: "V2ItemStartedNotification__MessagePhase",
});

export type V2ItemStartedNotification__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ItemStartedNotification__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ItemStartedNotification__AsyncUserInputQuestion" });

export type V2ItemStartedNotification__LegacyAppPathString = string;
export const V2ItemStartedNotification__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ItemStartedNotification__LegacyAppPathString",
});

export type V2ItemStartedNotification__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ItemStartedNotification__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ItemStartedNotification__CommandExecutionSource" });

export type V2ItemStartedNotification__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ItemStartedNotification__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ItemStartedNotification__CommandExecutionStatus" });

export type V2ItemStartedNotification__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ItemStartedNotification__PatchChangeKind = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("add").annotate({ title: "AddPatchChangeKindType" }),
    }).annotate({ title: "AddPatchChangeKind" }),
    Schema.Struct({
      type: Schema.Literal("delete").annotate({ title: "DeletePatchChangeKindType" }),
    }).annotate({ title: "DeletePatchChangeKind" }),
    Schema.Struct({
      move_path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("update").annotate({ title: "UpdatePatchChangeKindType" }),
    }).annotate({ title: "UpdatePatchChangeKind" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemStartedNotification__PatchChangeKind" });

export type V2ItemStartedNotification__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ItemStartedNotification__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ItemStartedNotification__PatchApplyStatus" });

export type V2ItemStartedNotification__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ItemStartedNotification__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ItemStartedNotification__McpToolCallAppContext" });

export type V2ItemStartedNotification__McpToolCallError = { readonly message: string };
export const V2ItemStartedNotification__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ItemStartedNotification__McpToolCallError" });

export type V2ItemStartedNotification__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ItemStartedNotification__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ItemStartedNotification__McpAppDisplayMode" });

export type V2ItemStartedNotification__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ItemStartedNotification__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ItemStartedNotification__McpToolCallResult" });

export type V2ItemStartedNotification__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ItemStartedNotification__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ItemStartedNotification__McpToolCallStatus" });

export type V2ItemStartedNotification__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ItemStartedNotification__DynamicToolCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("inputText").annotate({
        title: "InputTextDynamicToolCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextDynamicToolCallOutputContentItem" }),
    Schema.Struct({
      imageUrl: Schema.String,
      type: Schema.Literal("inputImage").annotate({
        title: "InputImageDynamicToolCallOutputContentItemType",
      }),
    }).annotate({ title: "InputImageDynamicToolCallOutputContentItem" }),
    Schema.Struct({
      audioUrl: Schema.String,
      type: Schema.Literal("inputAudio").annotate({
        title: "InputAudioDynamicToolCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioDynamicToolCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemStartedNotification__DynamicToolCallOutputContentItem" });

export type V2ItemStartedNotification__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2ItemStartedNotification__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ItemStartedNotification__DynamicToolCallStatus" });

export type V2ItemStartedNotification__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ItemStartedNotification__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ItemStartedNotification__CollabAgentStatus" });

export type V2ItemStartedNotification__ReasoningEffort = string;
export const V2ItemStartedNotification__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ItemStartedNotification__ReasoningEffort",
  }),
);

export type V2ItemStartedNotification__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ItemStartedNotification__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ItemStartedNotification__CollabAgentToolCallStatus" });

export type V2ItemStartedNotification__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ItemStartedNotification__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ItemStartedNotification__CollabAgentTool" });

export type V2ItemStartedNotification__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ItemStartedNotification__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ItemStartedNotification__SubAgentActivityKind" });

export type V2ItemStartedNotification__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ItemStartedNotification__WebSearchAction = Schema.Union(
  [
    Schema.Struct({
      queries: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchWebSearchActionType" }),
    }).annotate({ title: "SearchWebSearchAction" }),
    Schema.Struct({
      type: Schema.Literal("openPage").annotate({ title: "OpenPageWebSearchActionType" }),
      url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }).annotate({ title: "OpenPageWebSearchAction" }),
    Schema.Struct({
      pattern: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("findInPage").annotate({ title: "FindInPageWebSearchActionType" }),
      url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }).annotate({ title: "FindInPageWebSearchAction" }),
    Schema.Struct({
      type: Schema.Literal("other").annotate({ title: "OtherWebSearchActionType" }),
    }).annotate({ title: "OtherWebSearchAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemStartedNotification__WebSearchAction" });

export type V2ItemStartedNotification__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ItemStartedNotification__ImageGenerationFailure = Schema.Union(
  [
    Schema.Struct({
      limitId: Schema.String,
      resetsAt: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({ format: "int64" }).check(
            Schema.isInt().annotate({ expected: "an integer" }),
          ),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("usageLimitExceeded").annotate({
        title: "UsageLimitExceededImageGenerationFailureType",
      }),
    }).annotate({ title: "UsageLimitExceededImageGenerationFailure" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemStartedNotification__ImageGenerationFailure" });

export type V2ItemStartedNotification__AbsolutePathBuf = string;
export const V2ItemStartedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ItemStartedNotification__AbsolutePathBuf",
});

export type V2ListMcpServerStatusParams__McpServerStatusDetail = "full" | "toolsAndAuthOnly";
export const V2ListMcpServerStatusParams__McpServerStatusDetail = Schema.Literals([
  "full",
  "toolsAndAuthOnly",
]).annotate({ identifier: "V2ListMcpServerStatusParams__McpServerStatusDetail" });

export type V2ListMcpServerStatusResponse__McpAuthStatus =
  | "unknown"
  | "unsupported"
  | "notLoggedIn"
  | "bearerToken"
  | "oAuth";
export const V2ListMcpServerStatusResponse__McpAuthStatus = Schema.Literals([
  "unknown",
  "unsupported",
  "notLoggedIn",
  "bearerToken",
  "oAuth",
]).annotate({ identifier: "V2ListMcpServerStatusResponse__McpAuthStatus" });

export type V2ListMcpServerStatusResponse__ResourceTemplate = {
  readonly annotations?: Schema.Json;
  readonly description?: string | null;
  readonly mimeType?: string | null;
  readonly name: string;
  readonly title?: string | null;
  readonly uriTemplate: string;
};
export const V2ListMcpServerStatusResponse__ResourceTemplate = Schema.Struct({
  annotations: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  mimeType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  uriTemplate: Schema.String,
}).annotate({
  description: "A template description for resources available on the server.",
  identifier: "V2ListMcpServerStatusResponse__ResourceTemplate",
});

export type V2ListMcpServerStatusResponse__Resource = {
  readonly _meta?: Schema.Json;
  readonly annotations?: Schema.Json;
  readonly description?: string | null;
  readonly icons?: ReadonlyArray<Schema.Json> | null;
  readonly mimeType?: string | null;
  readonly name: string;
  readonly size?: number | null;
  readonly title?: string | null;
  readonly uri: string;
};
export const V2ListMcpServerStatusResponse__Resource = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  annotations: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icons: Schema.optionalKey(
    Schema.Union([Schema.Array(Schema.Json.annotate({ expected: "JSON value" })), Schema.Null]),
  ),
  mimeType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
  size: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  uri: Schema.String,
}).annotate({
  description: "A known resource that the server is capable of reading.",
  identifier: "V2ListMcpServerStatusResponse__Resource",
});

export type V2ListMcpServerStatusResponse__McpServerConnectionStatus =
  | "notStarted"
  | "starting"
  | "connected"
  | "authenticationRequired"
  | "failed"
  | "cancelled"
  | "disabled";
export const V2ListMcpServerStatusResponse__McpServerConnectionStatus = Schema.Literals([
  "notStarted",
  "starting",
  "connected",
  "authenticationRequired",
  "failed",
  "cancelled",
  "disabled",
]).annotate({ identifier: "V2ListMcpServerStatusResponse__McpServerConnectionStatus" });

export type V2ListMcpServerStatusResponse__McpServerInfo = {
  readonly description?: string | null;
  readonly icons?: ReadonlyArray<Schema.Json> | null;
  readonly name: string;
  readonly title?: string | null;
  readonly version: string;
  readonly websiteUrl?: string | null;
};
export const V2ListMcpServerStatusResponse__McpServerInfo = Schema.Struct({
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icons: Schema.optionalKey(
    Schema.Union([Schema.Array(Schema.Json.annotate({ expected: "JSON value" })), Schema.Null]),
  ),
  name: Schema.String,
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  version: Schema.String,
  websiteUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Presentation metadata advertised by an initialized MCP server.",
  identifier: "V2ListMcpServerStatusResponse__McpServerInfo",
});

export type V2ListMcpServerStatusResponse__Tool = {
  readonly _meta?: Schema.Json;
  readonly annotations?: Schema.Json;
  readonly description?: string | null;
  readonly icons?: ReadonlyArray<Schema.Json> | null;
  readonly inputSchema: Schema.Json;
  readonly name: string;
  readonly outputSchema?: Schema.Json;
  readonly title?: string | null;
};
export const V2ListMcpServerStatusResponse__Tool = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  annotations: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icons: Schema.optionalKey(
    Schema.Union([Schema.Array(Schema.Json.annotate({ expected: "JSON value" })), Schema.Null]),
  ),
  inputSchema: Schema.Json.annotate({ expected: "JSON value" }),
  name: Schema.String,
  outputSchema: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Definition for a tool the client can call.",
  identifier: "V2ListMcpServerStatusResponse__Tool",
});

export type V2LoginAccountParams__LoginAppBrand = "codex" | "chatgpt";
export const V2LoginAccountParams__LoginAppBrand = Schema.Literals(["codex", "chatgpt"]).annotate({
  identifier: "V2LoginAccountParams__LoginAppBrand",
});

export type V2MarketplaceAddResponse__AbsolutePathBuf = string;
export const V2MarketplaceAddResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2MarketplaceAddResponse__AbsolutePathBuf",
});

export type V2MarketplaceRemoveResponse__AbsolutePathBuf = string;
export const V2MarketplaceRemoveResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2MarketplaceRemoveResponse__AbsolutePathBuf",
});

export type V2MarketplaceUpgradeResponse__MarketplaceUpgradeErrorInfo = {
  readonly marketplaceName: string;
  readonly message: string;
};
export const V2MarketplaceUpgradeResponse__MarketplaceUpgradeErrorInfo = Schema.Struct({
  marketplaceName: Schema.String,
  message: Schema.String,
}).annotate({ identifier: "V2MarketplaceUpgradeResponse__MarketplaceUpgradeErrorInfo" });

export type V2MarketplaceUpgradeResponse__AbsolutePathBuf = string;
export const V2MarketplaceUpgradeResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2MarketplaceUpgradeResponse__AbsolutePathBuf",
});

export type V2McpResourceReadParams__McpResourceReadTarget = {
  readonly connectorId: string;
  readonly linkId: string | null;
};
export const V2McpResourceReadParams__McpResourceReadTarget = Schema.Struct({
  connectorId: Schema.String,
  linkId: Schema.Union([
    Schema.String.annotate({
      description: "Null explicitly requests no-auth access, subject to the app's resource policy.",
    }),
    Schema.Null,
  ]),
}).annotate({ identifier: "V2McpResourceReadParams__McpResourceReadTarget" });

export type V2McpResourceReadResponse__ResourceContent =
  | {
      readonly _meta?: Schema.Json;
      readonly mimeType?: string | null;
      readonly text: string;
      readonly uri: string;
    }
  | {
      readonly _meta?: Schema.Json;
      readonly blob: string;
      readonly mimeType?: string | null;
      readonly uri: string;
    };
export const V2McpResourceReadResponse__ResourceContent = Schema.Union([
  Schema.Struct({
    _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
    mimeType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    text: Schema.String,
    uri: Schema.String.annotate({ description: "The URI of this resource." }),
  }),
  Schema.Struct({
    _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
    blob: Schema.String,
    mimeType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    uri: Schema.String.annotate({ description: "The URI of this resource." }),
  }),
]).annotate({
  description: "Contents returned when reading a resource from an MCP server.",
  identifier: "V2McpResourceReadResponse__ResourceContent",
});

export type V2McpServerEventStreamNotification__McpServerEventNotification = {
  readonly method: string;
  readonly params: Schema.Json;
};
export const V2McpServerEventStreamNotification__McpServerEventNotification = Schema.Struct({
  method: Schema.String,
  params: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({ identifier: "V2McpServerEventStreamNotification__McpServerEventNotification" });

export type V2McpServerOauthLoginParams__McpServerOauthClientRegistration = "auto" | "cimd" | "dcr";
export const V2McpServerOauthLoginParams__McpServerOauthClientRegistration = Schema.Literals([
  "auto",
  "cimd",
  "dcr",
]).annotate({ identifier: "V2McpServerOauthLoginParams__McpServerOauthClientRegistration" });

export type V2McpServerStatusUpdatedNotification__McpServerStartupFailureReason =
  "reauthenticationRequired";
export const V2McpServerStatusUpdatedNotification__McpServerStartupFailureReason = Schema.Literal(
  "reauthenticationRequired",
).annotate({ identifier: "V2McpServerStatusUpdatedNotification__McpServerStartupFailureReason" });

export type V2McpServerStatusUpdatedNotification__McpServerStartupState =
  | "starting"
  | "ready"
  | "failed"
  | "cancelled";
export const V2McpServerStatusUpdatedNotification__McpServerStartupState = Schema.Literals([
  "starting",
  "ready",
  "failed",
  "cancelled",
]).annotate({ identifier: "V2McpServerStatusUpdatedNotification__McpServerStartupState" });

export type V2ModelListResponse__ModelAvailabilityNux = { readonly message: string };
export const V2ModelListResponse__ModelAvailabilityNux = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ModelListResponse__ModelAvailabilityNux" });

export type V2ModelListResponse__CyberAccessProgram = "standard" | "daybreakBlue" | "daybreakRed";
export const V2ModelListResponse__CyberAccessProgram = Schema.Literals([
  "standard",
  "daybreakBlue",
  "daybreakRed",
]).annotate({
  description:
    "Requested cyber treatment for a ChatGPT-authenticated Codex turn. Authorization and model-tier restrictions remain server-owned.",
  identifier: "V2ModelListResponse__CyberAccessProgram",
});

export type V2ModelListResponse__ReasoningEffort = string;
export const V2ModelListResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ModelListResponse__ReasoningEffort",
  }),
);

export type V2ModelListResponse__InputModality = "text" | "image" | "audio";
export const V2ModelListResponse__InputModality = Schema.Union(
  [
    Schema.Literal("text").annotate({ description: "Plain text turns and tool payloads." }),
    Schema.Literal("image").annotate({ description: "Image attachments included in user turns." }),
    Schema.Literal("audio").annotate({ description: "Audio attachments included in user turns." }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "Canonical user-input modality tags advertised by a model.",
  identifier: "V2ModelListResponse__InputModality",
});

export type V2ModelListResponse__MultiAgentVersion = "disabled" | "v1" | "v2";
export const V2ModelListResponse__MultiAgentVersion = Schema.Literals([
  "disabled",
  "v1",
  "v2",
]).annotate({
  description: "Multi-agent runtime supported by a model.",
  identifier: "V2ModelListResponse__MultiAgentVersion",
});

export type V2ModelListResponse__ModelServiceTier = {
  readonly description: string;
  readonly id: string;
  readonly name: string;
};
export const V2ModelListResponse__ModelServiceTier = Schema.Struct({
  description: Schema.String,
  id: Schema.String,
  name: Schema.String,
}).annotate({ identifier: "V2ModelListResponse__ModelServiceTier" });

export type V2ModelListResponse__ModelUpgradeInfo = {
  readonly migrationMarkdown?: string | null;
  readonly model: string;
  readonly modelLink?: string | null;
  readonly retirementAt?: number | null;
  readonly upgradeCopy?: string | null;
};
export const V2ModelListResponse__ModelUpgradeInfo = Schema.Struct({
  migrationMarkdown: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  model: Schema.String,
  modelLink: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  retirementAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Informational Unix timestamp for this upgrade's scheduled retirement, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  upgradeCopy: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ModelListResponse__ModelUpgradeInfo" });

export type V2ModelReroutedNotification__ModelRerouteReason = "highRiskCyberActivity";
export const V2ModelReroutedNotification__ModelRerouteReason = Schema.Literal(
  "highRiskCyberActivity",
).annotate({ identifier: "V2ModelReroutedNotification__ModelRerouteReason" });

export type V2ModelVerificationNotification__ModelVerification = "trustedAccessForCyber";
export const V2ModelVerificationNotification__ModelVerification = Schema.Literal(
  "trustedAccessForCyber",
).annotate({ identifier: "V2ModelVerificationNotification__ModelVerification" });

export type V2NullableGetAccountRateLimitsParams__GetAccountRateLimitsParams = {
  readonly excludeResetCreditDetails?: boolean;
  readonly supportsLunaReserve?: boolean;
};
export const V2NullableGetAccountRateLimitsParams__GetAccountRateLimitsParams = Schema.Struct({
  excludeResetCreditDetails: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Skip the separate reset-credit detail lookup for background usage polls. The usage response still includes the available count; omitted/false preserves detailed reads.",
    }),
  ),
  supportsLunaReserve: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "The client supports automatic Luna Reserve fallback. For eligible ChatGPT CLI users, allow the backend to record experiment exposure after ordinary usage is blocked.",
    }),
  ),
}).annotate({
  description:
    "Usage-read capabilities of the requesting client, never inferred from its experiment arm.",
  identifier: "V2NullableGetAccountRateLimitsParams__GetAccountRateLimitsParams",
});

export type V2NullableGetAccountTokenUsageParams__GetAccountTokenUsageParams = {
  readonly threadId?: string | null;
};
export const V2NullableGetAccountTokenUsageParams__GetAccountTokenUsageParams = Schema.Struct({
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "When present, read estimated usage for this thread instead of account-wide token activity.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2NullableGetAccountTokenUsageParams__GetAccountTokenUsageParams" });

export type V2PermissionProfileListResponse__PermissionProfileSummary = {
  readonly allowed: boolean;
  readonly description?: string | null;
  readonly id: string;
};
export const V2PermissionProfileListResponse__PermissionProfileSummary = Schema.Struct({
  allowed: Schema.Boolean.annotate({
    description: "Whether the effective requirements allow selecting this profile.",
  }),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional user-facing description for display in clients.",
      }),
      Schema.Null,
    ]),
  ),
  id: Schema.String.annotate({ description: "Available permission profile identifier." }),
}).annotate({ identifier: "V2PermissionProfileListResponse__PermissionProfileSummary" });

export type V2PluginInstalledParams__AbsolutePathBuf = string;
export const V2PluginInstalledParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginInstalledParams__AbsolutePathBuf",
});

export type V2PluginInstalledResponse__AbsolutePathBuf = string;
export const V2PluginInstalledResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginInstalledResponse__AbsolutePathBuf",
});

export type V2PluginInstalledResponse__MarketplaceInterface = {
  readonly displayName?: string | null;
};
export const V2PluginInstalledResponse__MarketplaceInterface = Schema.Struct({
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginInstalledResponse__MarketplaceInterface" });

export type V2PluginInstalledResponse__PluginAuthPolicy = "ON_INSTALL" | "ON_USE";
export const V2PluginInstalledResponse__PluginAuthPolicy = Schema.Literals([
  "ON_INSTALL",
  "ON_USE",
]).annotate({ identifier: "V2PluginInstalledResponse__PluginAuthPolicy" });

export type V2PluginInstalledResponse__PluginAvailability = "DISABLED_BY_ADMIN" | "AVAILABLE";
export const V2PluginInstalledResponse__PluginAvailability = Schema.Union(
  [
    Schema.Literal("DISABLED_BY_ADMIN"),
    Schema.Literal("AVAILABLE").annotate({
      description:
        'Plugin-service currently sends `"ENABLED"` for available remote plugins. Codex app-server exposes `"AVAILABLE"` in its API; the alias keeps decoding compatible with that upstream response.',
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginInstalledResponse__PluginAvailability" });

export type V2PluginInstalledResponse__PluginDisabledReason =
  | "disabled_by_admin"
  | "plan_not_eligible"
  | "required_app_unavailable"
  | "unknown";
export const V2PluginInstalledResponse__PluginDisabledReason = Schema.Literals([
  "disabled_by_admin",
  "plan_not_eligible",
  "required_app_unavailable",
  "unknown",
]).annotate({ identifier: "V2PluginInstalledResponse__PluginDisabledReason" });

export type V2PluginInstalledResponse__PluginInstallPolicy =
  | "NOT_AVAILABLE"
  | "AVAILABLE"
  | "INSTALLED_BY_DEFAULT";
export const V2PluginInstalledResponse__PluginInstallPolicy = Schema.Literals([
  "NOT_AVAILABLE",
  "AVAILABLE",
  "INSTALLED_BY_DEFAULT",
]).annotate({ identifier: "V2PluginInstalledResponse__PluginInstallPolicy" });

export type V2PluginInstalledResponse__PluginInstallPolicySource =
  | "WORKSPACE_SETTING"
  | "IMPLICIT_CANONICAL_APP";
export const V2PluginInstalledResponse__PluginInstallPolicySource = Schema.Literals([
  "WORKSPACE_SETTING",
  "IMPLICIT_CANONICAL_APP",
]).annotate({ identifier: "V2PluginInstalledResponse__PluginInstallPolicySource" });

export type V2PluginInstalledResponse__PluginShareDiscoverability =
  | "LISTED"
  | "UNLISTED"
  | "PRIVATE";
export const V2PluginInstalledResponse__PluginShareDiscoverability = Schema.Literals([
  "LISTED",
  "UNLISTED",
  "PRIVATE",
]).annotate({ identifier: "V2PluginInstalledResponse__PluginShareDiscoverability" });

export type V2PluginInstalledResponse__PluginSharePrincipalType = "user" | "group" | "workspace";
export const V2PluginInstalledResponse__PluginSharePrincipalType = Schema.Literals([
  "user",
  "group",
  "workspace",
]).annotate({ identifier: "V2PluginInstalledResponse__PluginSharePrincipalType" });

export type V2PluginInstalledResponse__PluginSharePrincipalRole = "reader" | "editor" | "owner";
export const V2PluginInstalledResponse__PluginSharePrincipalRole = Schema.Literals([
  "reader",
  "editor",
  "owner",
]).annotate({ identifier: "V2PluginInstalledResponse__PluginSharePrincipalRole" });

export type V2PluginInstallParams__AbsolutePathBuf = string;
export const V2PluginInstallParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginInstallParams__AbsolutePathBuf",
});

export type V2PluginInstallResponse__AppSummary = {
  readonly category?: string | null;
  readonly description?: string | null;
  readonly id: string;
  readonly installUrl?: string | null;
  readonly name: string;
};
export const V2PluginInstallResponse__AppSummary = Schema.Struct({
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  id: Schema.String,
  installUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - app metadata summary for plugin responses.",
  identifier: "V2PluginInstallResponse__AppSummary",
});

export type V2PluginInstallResponse__PluginAuthPolicy = "ON_INSTALL" | "ON_USE";
export const V2PluginInstallResponse__PluginAuthPolicy = Schema.Literals([
  "ON_INSTALL",
  "ON_USE",
]).annotate({ identifier: "V2PluginInstallResponse__PluginAuthPolicy" });

export type V2PluginListParams__AbsolutePathBuf = string;
export const V2PluginListParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginListParams__AbsolutePathBuf",
});

export type V2PluginListParams__PluginListMarketplaceKind =
  | "local"
  | "vertical"
  | "workspace-directory"
  | "shared-with-me"
  | "created-by-me-remote";
export const V2PluginListParams__PluginListMarketplaceKind = Schema.Literals([
  "local",
  "vertical",
  "workspace-directory",
  "shared-with-me",
  "created-by-me-remote",
]).annotate({ identifier: "V2PluginListParams__PluginListMarketplaceKind" });

export type V2PluginListResponse__AbsolutePathBuf = string;
export const V2PluginListResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginListResponse__AbsolutePathBuf",
});

export type V2PluginListResponse__MarketplaceInterface = { readonly displayName?: string | null };
export const V2PluginListResponse__MarketplaceInterface = Schema.Struct({
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginListResponse__MarketplaceInterface" });

export type V2PluginListResponse__PluginAuthPolicy = "ON_INSTALL" | "ON_USE";
export const V2PluginListResponse__PluginAuthPolicy = Schema.Literals([
  "ON_INSTALL",
  "ON_USE",
]).annotate({ identifier: "V2PluginListResponse__PluginAuthPolicy" });

export type V2PluginListResponse__PluginAvailability = "DISABLED_BY_ADMIN" | "AVAILABLE";
export const V2PluginListResponse__PluginAvailability = Schema.Union(
  [
    Schema.Literal("DISABLED_BY_ADMIN"),
    Schema.Literal("AVAILABLE").annotate({
      description:
        'Plugin-service currently sends `"ENABLED"` for available remote plugins. Codex app-server exposes `"AVAILABLE"` in its API; the alias keeps decoding compatible with that upstream response.',
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginListResponse__PluginAvailability" });

export type V2PluginListResponse__PluginDisabledReason =
  | "disabled_by_admin"
  | "plan_not_eligible"
  | "required_app_unavailable"
  | "unknown";
export const V2PluginListResponse__PluginDisabledReason = Schema.Literals([
  "disabled_by_admin",
  "plan_not_eligible",
  "required_app_unavailable",
  "unknown",
]).annotate({ identifier: "V2PluginListResponse__PluginDisabledReason" });

export type V2PluginListResponse__PluginInstallPolicy =
  | "NOT_AVAILABLE"
  | "AVAILABLE"
  | "INSTALLED_BY_DEFAULT";
export const V2PluginListResponse__PluginInstallPolicy = Schema.Literals([
  "NOT_AVAILABLE",
  "AVAILABLE",
  "INSTALLED_BY_DEFAULT",
]).annotate({ identifier: "V2PluginListResponse__PluginInstallPolicy" });

export type V2PluginListResponse__PluginInstallPolicySource =
  | "WORKSPACE_SETTING"
  | "IMPLICIT_CANONICAL_APP";
export const V2PluginListResponse__PluginInstallPolicySource = Schema.Literals([
  "WORKSPACE_SETTING",
  "IMPLICIT_CANONICAL_APP",
]).annotate({ identifier: "V2PluginListResponse__PluginInstallPolicySource" });

export type V2PluginListResponse__PluginShareDiscoverability = "LISTED" | "UNLISTED" | "PRIVATE";
export const V2PluginListResponse__PluginShareDiscoverability = Schema.Literals([
  "LISTED",
  "UNLISTED",
  "PRIVATE",
]).annotate({ identifier: "V2PluginListResponse__PluginShareDiscoverability" });

export type V2PluginListResponse__PluginSharePrincipalType = "user" | "group" | "workspace";
export const V2PluginListResponse__PluginSharePrincipalType = Schema.Literals([
  "user",
  "group",
  "workspace",
]).annotate({ identifier: "V2PluginListResponse__PluginSharePrincipalType" });

export type V2PluginListResponse__PluginSharePrincipalRole = "reader" | "editor" | "owner";
export const V2PluginListResponse__PluginSharePrincipalRole = Schema.Literals([
  "reader",
  "editor",
  "owner",
]).annotate({ identifier: "V2PluginListResponse__PluginSharePrincipalRole" });

export type V2PluginReadParams__AbsolutePathBuf = string;
export const V2PluginReadParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginReadParams__AbsolutePathBuf",
});

export type V2PluginReadResponse__AppTemplateUnavailableReason =
  | "NOT_CONFIGURED_FOR_WORKSPACE"
  | "NO_ACTIVE_WORKSPACE";
export const V2PluginReadResponse__AppTemplateUnavailableReason = Schema.Literals([
  "NOT_CONFIGURED_FOR_WORKSPACE",
  "NO_ACTIVE_WORKSPACE",
]).annotate({ identifier: "V2PluginReadResponse__AppTemplateUnavailableReason" });

export type V2PluginReadResponse__AppSummary = {
  readonly category?: string | null;
  readonly description?: string | null;
  readonly id: string;
  readonly installUrl?: string | null;
  readonly name: string;
};
export const V2PluginReadResponse__AppSummary = Schema.Struct({
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  id: Schema.String,
  installUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - app metadata summary for plugin responses.",
  identifier: "V2PluginReadResponse__AppSummary",
});

export type V2PluginReadResponse__HookEventName = string;
export const V2PluginReadResponse__HookEventName = Schema.String.annotate({
  identifier: "V2PluginReadResponse__HookEventName",
});

export type V2PluginReadResponse__AbsolutePathBuf = string;
export const V2PluginReadResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginReadResponse__AbsolutePathBuf",
});
