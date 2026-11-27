/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  V2ConfigReadResponse__AppToolApproval,
  V2ConfigReadResponse__ApprovalsReviewer,
  V2ConfigRequirementsReadResponse__NetworkDomainPermission,
  V2ConfigRequirementsReadResponse__NetworkUnixSocketPermission,
  V2ConfigValueWriteParams__MergeStrategy,
  V2ConfigWriteResponse__AbsolutePathBuf,
  V2ConfigWriteResponse__WriteStatus,
  V2ConsumeAccountRateLimitResetCreditResponse__ConsumeAccountRateLimitResetCreditOutcome,
} from "./schema.gen.part1.ts";
import {
  V2FsChangedNotification__AbsolutePathBuf,
  V2FsCopyParams__AbsolutePathBuf,
  V2FsCreateDirectoryParams__AbsolutePathBuf,
  V2FsGetMetadataParams__AbsolutePathBuf,
  V2FsReadDirectoryParams__AbsolutePathBuf,
  V2FsReadDirectoryResponse__FsReadDirectoryEntry,
  V2FsReadFileParams__AbsolutePathBuf,
  V2FsRemoveParams__AbsolutePathBuf,
  V2FsWatchParams__AbsolutePathBuf,
  V2FsWatchResponse__AbsolutePathBuf,
  V2FsWriteFileParams__AbsolutePathBuf,
  V2GatewayOAuthChangedNotification__GatewayOAuthStatus,
  V2GatewayOAuthReadResponse__GatewayOAuthStatus,
  V2GetAccountResponse__AccountRoutingOverride,
  V2GetAccountTokenUsageResponse__AccountTokenUsageDailyBucket,
  V2GetAccountTokenUsageResponse__AccountTokenUsageSummary,
  V2ItemGuardianApprovalReviewCompletedNotification__AutoReviewDecisionSource,
  V2ListMcpServerStatusParams__McpServerStatusDetail,
  V2LoginAccountParams__LoginAppBrand,
  V2MarketplaceAddResponse__AbsolutePathBuf,
  V2MarketplaceRemoveResponse__AbsolutePathBuf,
  V2MarketplaceUpgradeResponse__AbsolutePathBuf,
  V2MarketplaceUpgradeResponse__MarketplaceUpgradeErrorInfo,
  V2McpResourceReadParams__McpResourceReadTarget,
  V2McpResourceReadResponse__ResourceContent,
  V2McpServerEventStreamNotification__McpServerEventNotification,
  V2McpServerOauthLoginParams__McpServerOauthClientRegistration,
  V2McpServerStatusUpdatedNotification__McpServerStartupFailureReason,
  V2McpServerStatusUpdatedNotification__McpServerStartupState,
  V2ModelReroutedNotification__ModelRerouteReason,
  V2ModelVerificationNotification__ModelVerification,
  V2NullableGetAccountRateLimitsParams__GetAccountRateLimitsParams,
  V2NullableGetAccountTokenUsageParams__GetAccountTokenUsageParams,
  V2PermissionProfileListResponse__PermissionProfileSummary,
  V2PluginInstallParams__AbsolutePathBuf,
  V2PluginInstallResponse__AppSummary,
  V2PluginInstallResponse__PluginAuthPolicy,
  V2PluginInstalledParams__AbsolutePathBuf,
  V2PluginListParams__AbsolutePathBuf,
  V2PluginListParams__PluginListMarketplaceKind,
  V2PluginReadParams__AbsolutePathBuf,
} from "./schema.gen.part2.ts";
import {
  V2PluginReconcileResponse__PluginReconcileChangedPlugin,
  V2PluginShareCheckoutResponse__AbsolutePathBuf,
  V2PluginShareSaveParams__AbsolutePathBuf,
  V2PluginShareSaveParams__PluginShareDiscoverability,
  V2PluginShareUpdateTargetsParams__PluginShareUpdateDiscoverability,
  V2PluginShareUpdateTargetsResponse__PluginShareDiscoverability,
  V2ProcessOutputDeltaNotification__ProcessOutputStream,
  V2ProjectChangedNotification__ProjectChangeType,
  V2RawResponseCompletedNotification__ResponseUsageMetadata,
  V2RawResponseCompletedNotification__TokenUsageBreakdown,
  V2RemoteControlStatusChangedNotification__RemoteControlConnectionStatus,
  V2ReviewStartParams__ReviewDelivery,
  V2ReviewStartParams__ReviewTarget,
  V2SendAddCreditsNudgeEmailParams__AddCreditsNudgeCreditType,
  V2SendAddCreditsNudgeEmailResponse__AddCreditsNudgeEmailStatus,
  V2ServerRequestResolvedNotification__RequestId,
  V2SkillsConfigWriteParams__AbsolutePathBuf,
} from "./schema.gen.part3.ts";
import {
  V2ConfigReadResponse__AppsDefaultConfig,
  V2ConfigRequirementsReadResponse__ApplicationNetworkRequirements,
  V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup,
  V2ConfigWarningNotification__TextRange,
  V2ExperimentalFeatureListResponse__ExperimentalFeature,
  V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorCandidate,
  V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorCandidate,
  V2FileChangePatchUpdatedNotification__FileUpdateChange,
  V2GetAccountRateLimitsResponse__RateLimitSnapshot,
  V2GetAccountResponse__Account,
  V2GetAccountTokenUsageResponse__ThreadUsage,
  V2GetWorkspaceMessagesResponse__WorkspaceMessage,
  V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReview,
  V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReview,
  V2ListMcpServerStatusResponse__McpServerStatus,
  V2PluginInstalledResponse__MarketplaceLoadErrorInfo,
  V2PluginListResponse__MarketplaceLoadErrorInfo,
} from "./schema.gen.part8.ts";
import {
  V2PluginShareSaveParams__PluginShareTarget,
  V2PluginShareUpdateTargetsParams__PluginShareTarget,
  V2PluginShareUpdateTargetsResponse__PluginSharePrincipal,
} from "./schema.gen.part9.ts";
import {
  V2ErrorNotification__TurnError,
  V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItem,
  V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportTypeResult,
  V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportHistory,
  V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordTypeResultParams,
  V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItem,
  V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportTypeResult,
  V2GetAccountRateLimitsResponse__RateLimitResetCreditsSummary,
  V2HookCompletedNotification__HookRunSummary,
  V2HookStartedNotification__HookRunSummary,
  V2HooksListResponse__HooksListEntry,
  V2ModelListResponse__Model,
} from "./schema.gen.part12.ts";
import { V2ConfigWriteResponse__OverriddenMetadata } from "./schema.gen.part13.ts";
import {
  V2ItemCompletedNotification__ThreadItem,
  V2ItemStartedNotification__ThreadItem,
  V2RawResponseItemCompletedNotification__ResponseItem,
} from "./schema.gen.part14.ts";
import {
  V2ConfigRequirementsReadResponse__ConfigRequirements,
  V2PluginInstalledResponse__PluginMarketplaceEntry,
  V2PluginListResponse__PluginMarketplaceEntry,
  V2PluginReadResponse__PluginDetail,
  V2PluginShareListResponse__PluginShareListItem,
  V2ReviewStartResponse__Turn,
} from "./schema.gen.part18.ts";
import {
  V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewAction,
  V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewAction,
} from "./schema.gen.part19.ts";

export type V2ConfigReadResponse__AppLinkConfig = {
  readonly approvals_reviewer?: V2ConfigReadResponse__ApprovalsReviewer | null;
  readonly default_tools_approval_mode?: V2ConfigReadResponse__AppToolApproval | null;
};
export const V2ConfigReadResponse__AppLinkConfig = Schema.Struct({
  approvals_reviewer: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__ApprovalsReviewer, Schema.Null]),
  ),
  default_tools_approval_mode: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AppToolApproval, Schema.Null]),
  ),
}).annotate({ description: "Approval settings for a connected account within an app." });

export type V2ConfigReadResponse__AppsConfig = {
  readonly _default?: V2ConfigReadResponse__AppsDefaultConfig | null;
};
export const V2ConfigReadResponse__AppsConfig = Schema.Struct({
  _default: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AppsDefaultConfig, Schema.Null]),
  ),
});

export type V2ConfigReadResponse__AppToolConfig = {
  readonly approval_mode?: V2ConfigReadResponse__AppToolApproval | null;
  readonly enabled?: boolean | null;
};
export const V2ConfigReadResponse__AppToolConfig = Schema.Struct({
  approval_mode: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AppToolApproval, Schema.Null]),
  ),
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
});

export type V2ConfigRequirementsReadResponse = {
  readonly requirements?: V2ConfigRequirementsReadResponse__ConfigRequirements | null;
};
export const V2ConfigRequirementsReadResponse = Schema.Struct({
  requirements: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__ConfigRequirements, Schema.Null]).annotate({
      description:
        "Null if no requirements are configured (e.g. no requirements.toml/MDM entries).",
    }),
  ),
}).annotate({ title: "ConfigRequirementsReadResponse" });

export type V2ConfigRequirementsReadResponse__ApplicationRequirements = {
  readonly network?: V2ConfigRequirementsReadResponse__ApplicationNetworkRequirements | null;
};
export const V2ConfigRequirementsReadResponse__ApplicationRequirements = Schema.Struct({
  network: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__ApplicationNetworkRequirements, Schema.Null]),
  ),
});

export type V2ConfigRequirementsReadResponse__ApprovalsReviewer =
  | "user"
  | "auto_review"
  | "guardian_subagent";
export const V2ConfigRequirementsReadResponse__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
});

export type V2ConfigRequirementsReadResponse__ManagedHooksRequirements = {
  readonly Interrupt?: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly PermissionRequest: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly PostCompact: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly PostToolUse: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly PreCompact: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly PreToolUse: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly SessionEnd?: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly SessionStart: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly Stop: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly SubagentStart: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly SubagentStop: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly UserPromptSubmit: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup>;
  readonly managedDir?: string | null;
  readonly windowsManagedDir?: string | null;
};
export const V2ConfigRequirementsReadResponse__ManagedHooksRequirements = Schema.Struct({
  Interrupt: Schema.optionalKey(
    Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup).annotate({
      default: [],
    }),
  ),
  PermissionRequest: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  PostCompact: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  PostToolUse: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  PreCompact: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  PreToolUse: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  SessionEnd: Schema.optionalKey(
    Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup).annotate({
      default: [],
    }),
  ),
  SessionStart: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  Stop: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  SubagentStart: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  SubagentStop: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  UserPromptSubmit: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup),
  managedDir: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  windowsManagedDir: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});

export type V2ConfigRequirementsReadResponse__NetworkRequirements = {
  readonly allowLocalBinding?: boolean | null;
  readonly allowUnixSockets?: ReadonlyArray<string> | null;
  readonly allowUpstreamProxy?: boolean | null;
  readonly allowedDomains?: ReadonlyArray<string> | null;
  readonly dangerouslyAllowAllUnixSockets?: boolean | null;
  readonly dangerouslyAllowNonLoopbackProxy?: boolean | null;
  readonly deniedDomains?: ReadonlyArray<string> | null;
  readonly domains?: {
    readonly [x: string]: V2ConfigRequirementsReadResponse__NetworkDomainPermission;
  } | null;
  readonly enabled?: boolean | null;
  readonly httpPort?: number | null;
  readonly managedAllowedDomainsOnly?: boolean | null;
  readonly socksPort?: number | null;
  readonly unixSockets?: {
    readonly [x: string]: V2ConfigRequirementsReadResponse__NetworkUnixSocketPermission;
  } | null;
};
export const V2ConfigRequirementsReadResponse__NetworkRequirements = Schema.Struct({
  allowLocalBinding: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowUnixSockets: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description: "Legacy compatibility view derived from `unix_sockets`.",
      }),
      Schema.Null,
    ]),
  ),
  allowUpstreamProxy: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowedDomains: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description: "Legacy compatibility view derived from `domains`.",
      }),
      Schema.Null,
    ]),
  ),
  dangerouslyAllowAllUnixSockets: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  dangerouslyAllowNonLoopbackProxy: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  deniedDomains: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description: "Legacy compatibility view derived from `domains`.",
      }),
      Schema.Null,
    ]),
  ),
  domains: Schema.optionalKey(
    Schema.Union([
      Schema.Record(
        Schema.String,
        V2ConfigRequirementsReadResponse__NetworkDomainPermission,
      ).annotate({ description: "Canonical network permission map for `experimental_network`." }),
      Schema.Null,
    ]),
  ),
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  httpPort: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "uint16" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      Schema.Null,
    ]),
  ),
  managedAllowedDomainsOnly: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description:
          "When true, only managed allowlist entries are respected while managed network enforcement is active.",
      }),
      Schema.Null,
    ]),
  ),
  socksPort: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "uint16" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      Schema.Null,
    ]),
  ),
  unixSockets: Schema.optionalKey(
    Schema.Union([
      Schema.Record(
        Schema.String,
        V2ConfigRequirementsReadResponse__NetworkUnixSocketPermission,
      ).annotate({
        description: "Canonical unix socket permission map for `experimental_network`.",
      }),
      Schema.Null,
    ]),
  ),
});

export type V2ConfigValueWriteParams = {
  readonly expectedVersion?: string | null;
  readonly filePath?: string | null;
  readonly keyPath: string;
  readonly mergeStrategy: V2ConfigValueWriteParams__MergeStrategy;
  readonly value: Schema.Json;
};
export const V2ConfigValueWriteParams = Schema.Struct({
  expectedVersion: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  filePath: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Path to the config file to write; defaults to the user's `config.toml` when omitted.",
      }),
      Schema.Null,
    ]),
  ),
  keyPath: Schema.String,
  mergeStrategy: V2ConfigValueWriteParams__MergeStrategy,
  value: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({ title: "ConfigValueWriteParams" });

export type V2ConfigWarningNotification = {
  readonly details?: string | null;
  readonly path?: string | null;
  readonly range?: V2ConfigWarningNotification__TextRange | null;
  readonly summary: string;
};
export const V2ConfigWarningNotification = Schema.Struct({
  details: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional extra guidance or error details." }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional path to the config file that triggered the warning.",
      }),
      Schema.Null,
    ]),
  ),
  range: Schema.optionalKey(
    Schema.Union([V2ConfigWarningNotification__TextRange, Schema.Null]).annotate({
      description: "Optional range for the error location inside the config file.",
    }),
  ),
  summary: Schema.String.annotate({ description: "Concise summary of the warning." }),
}).annotate({ title: "ConfigWarningNotification" });

export type V2ConfigWriteResponse = {
  readonly filePath: V2ConfigWriteResponse__AbsolutePathBuf;
  readonly overriddenMetadata?: V2ConfigWriteResponse__OverriddenMetadata | null;
  readonly status: V2ConfigWriteResponse__WriteStatus;
  readonly version: string;
};
export const V2ConfigWriteResponse = Schema.Struct({
  filePath: Schema.suspend(
    (): Schema.Codec<V2ConfigWriteResponse__AbsolutePathBuf> =>
      V2ConfigWriteResponse__AbsolutePathBuf,
  ).annotate({ description: "Canonical path to the config file that was written." }),
  overriddenMetadata: Schema.optionalKey(
    Schema.Union([V2ConfigWriteResponse__OverriddenMetadata, Schema.Null]),
  ),
  status: V2ConfigWriteResponse__WriteStatus,
  version: Schema.String,
}).annotate({ title: "ConfigWriteResponse" });

export type V2ConsumeAccountRateLimitResetCreditParams = {
  readonly creditId?: string | null;
  readonly idempotencyKey: string;
};
export const V2ConsumeAccountRateLimitResetCreditParams = Schema.Struct({
  creditId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque reset-credit identifier to redeem. When omitted, the backend selects the next available credit.",
      }),
      Schema.Null,
    ]),
  ),
  idempotencyKey: Schema.String.annotate({
    description:
      "Identifies one logical reset attempt. A UUID is recommended; reuse the same value when retrying that attempt.",
  }),
}).annotate({ title: "ConsumeAccountRateLimitResetCreditParams" });

export type V2ConsumeAccountRateLimitResetCreditResponse = {
  readonly outcome: V2ConsumeAccountRateLimitResetCreditResponse__ConsumeAccountRateLimitResetCreditOutcome;
};
export const V2ConsumeAccountRateLimitResetCreditResponse = Schema.Struct({
  outcome: V2ConsumeAccountRateLimitResetCreditResponse__ConsumeAccountRateLimitResetCreditOutcome,
}).annotate({ title: "ConsumeAccountRateLimitResetCreditResponse" });

export type V2ContextCompactedNotification = { readonly threadId: string; readonly turnId: string };
export const V2ContextCompactedNotification = Schema.Struct({
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  title: "ContextCompactedNotification",
  description: "Deprecated: Use `ContextCompaction` item type instead.",
});

export type V2DeprecationNoticeNotification = {
  readonly details?: string | null;
  readonly summary: string;
};
export const V2DeprecationNoticeNotification = Schema.Struct({
  details: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional extra guidance, such as migration steps or rationale.",
      }),
      Schema.Null,
    ]),
  ),
  summary: Schema.String.annotate({ description: "Concise summary of what is deprecated." }),
}).annotate({ title: "DeprecationNoticeNotification" });

export type V2EnvironmentConnectionNotification = {
  readonly environmentId: string;
  readonly threadId: string;
};
export const V2EnvironmentConnectionNotification = Schema.Struct({
  environmentId: Schema.String,
  threadId: Schema.String,
}).annotate({ title: "EnvironmentConnectionNotification" });

export type V2ErrorNotification = {
  readonly error: V2ErrorNotification__TurnError;
  readonly threadId: string;
  readonly turnId: string;
  readonly willRetry: boolean;
};
export const V2ErrorNotification = Schema.Struct({
  error: V2ErrorNotification__TurnError,
  threadId: Schema.String,
  turnId: Schema.String,
  willRetry: Schema.Boolean,
}).annotate({ title: "ErrorNotification" });

export type V2ExperimentalFeatureEnablementSetParams = {
  readonly enablement: { readonly [x: string]: boolean };
};
export const V2ExperimentalFeatureEnablementSetParams = Schema.Struct({
  enablement: Schema.Record(Schema.String, Schema.Boolean).annotate({
    description:
      "Process-wide runtime feature enablement keyed by canonical feature name.\n\nOnly named features are updated. Omitted features are left unchanged. Send an empty map for a no-op.",
  }),
}).annotate({ title: "ExperimentalFeatureEnablementSetParams" });

export type V2ExperimentalFeatureEnablementSetResponse = {
  readonly enablement: { readonly [x: string]: boolean };
};
export const V2ExperimentalFeatureEnablementSetResponse = Schema.Struct({
  enablement: Schema.Record(Schema.String, Schema.Boolean).annotate({
    description: "Feature enablement entries updated by this request.",
  }),
}).annotate({ title: "ExperimentalFeatureEnablementSetResponse" });

export type V2ExperimentalFeatureListParams = {
  readonly cursor?: string | null;
  readonly limit?: number | null;
  readonly threadId?: string | null;
};
export const V2ExperimentalFeatureListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque pagination cursor returned by a previous call.",
      }),
      Schema.Null,
    ]),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Optional page size; defaults to a reasonable server-side value.",
        format: "uint32",
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
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional loaded thread id. Pass this when showing feature state for an existing thread so enablement is computed from that thread's refreshed config, including project-local config for the thread's cwd.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ExperimentalFeatureListParams" });

export type V2ExperimentalFeatureListResponse = {
  readonly data: ReadonlyArray<V2ExperimentalFeatureListResponse__ExperimentalFeature>;
  readonly nextCursor?: string | null;
};
export const V2ExperimentalFeatureListResponse = Schema.Struct({
  data: Schema.Array(V2ExperimentalFeatureListResponse__ExperimentalFeature),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last item. If None, there are no more items to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ExperimentalFeatureListResponse" });

export type V2ExternalAgentConfigDetectParams = {
  readonly cwds?: ReadonlyArray<string> | null;
  readonly includeHome?: boolean;
  readonly maxSessionAgeDays?: number | null;
  readonly maxSessions?: number | null;
  readonly migrationSource?: string | null;
  readonly source?: string | null;
};
export const V2ExternalAgentConfigDetectParams = Schema.Struct({
  cwds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description: "Zero or more working directories to include for repo-scoped detection.",
      }),
      Schema.Null,
    ]),
  ),
  includeHome: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "If true, include detection under the user's home directory.",
    }),
  ),
  maxSessionAgeDays: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Maximum age in days for detected sessions. Missing values use the default limit.",
        format: "uint32",
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
  maxSessions: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Maximum number of sessions to detect. Missing values use the default limit.",
        format: "uint32",
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
  migrationSource: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional migration-source selector. Missing or unrecognized values use the default source.",
      }),
      Schema.Null,
    ]),
  ),
  source: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Deprecated field retained for compatibility. This field is ignored; use `migrationSource` to select the migration source.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ExternalAgentConfigDetectParams" });

export type V2ExternalAgentConfigDetectResponse = {
  readonly connectors?: ReadonlyArray<V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorCandidate>;
  readonly items: ReadonlyArray<V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItem>;
};
export const V2ExternalAgentConfigDetectResponse = Schema.Struct({
  connectors: Schema.optionalKey(
    Schema.Array(
      V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorCandidate,
    ).annotate({ default: [] }),
  ),
  items: Schema.Array(V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItem),
}).annotate({ title: "ExternalAgentConfigDetectResponse" });

export type V2ExternalAgentConfigImportCompletedNotification = {
  readonly importId: string;
  readonly itemTypeResults: ReadonlyArray<V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportTypeResult>;
};
export const V2ExternalAgentConfigImportCompletedNotification = Schema.Struct({
  importId: Schema.String,
  itemTypeResults: Schema.Array(
    V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportTypeResult,
  ),
}).annotate({ title: "ExternalAgentConfigImportCompletedNotification" });

export type V2ExternalAgentConfigImportHistoriesReadResponse = {
  readonly connectors: ReadonlyArray<V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorCandidate>;
  readonly data: ReadonlyArray<V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportHistory>;
};
export const V2ExternalAgentConfigImportHistoriesReadResponse = Schema.Struct({
  connectors: Schema.Array(
    V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorCandidate,
  ),
  data: Schema.Array(
    V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportHistory,
  ),
}).annotate({ title: "ExternalAgentConfigImportHistoriesReadResponse" });

export type V2ExternalAgentConfigImportHistoryRecordParams = {
  readonly itemTypeResults: ReadonlyArray<V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordTypeResultParams>;
  readonly providerId: string;
};
export const V2ExternalAgentConfigImportHistoryRecordParams = Schema.Struct({
  itemTypeResults: Schema.Array(
    V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordTypeResultParams,
  ).annotate({ description: "Completed results grouped by imported item type." }),
  providerId: Schema.String.annotate({
    description: "Opaque provider identifier for the externally completed import.",
  }),
}).annotate({ title: "ExternalAgentConfigImportHistoryRecordParams" });

export type V2ExternalAgentConfigImportHistoryRecordResponse = { readonly importId: string };
export const V2ExternalAgentConfigImportHistoryRecordResponse = Schema.Struct({
  importId: Schema.String,
}).annotate({ title: "ExternalAgentConfigImportHistoryRecordResponse" });

export type V2ExternalAgentConfigImportParams = {
  readonly migrationItems: ReadonlyArray<V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItem>;
  readonly migrationSource?: string | null;
  readonly providerId?: string | null;
  readonly source?: string | null;
};
export const V2ExternalAgentConfigImportParams = Schema.Struct({
  migrationItems: Schema.Array(V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItem),
  migrationSource: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Migration-source selector used to produce the migration items. Pass the same value to detection and import; missing or unrecognized values use the default source.",
      }),
      Schema.Null,
    ]),
  ),
  providerId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque provider identifier supplied by the caller for analytics attribution and import history display. This does not select the migration source.",
      }),
      Schema.Null,
    ]),
  ),
  source: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional identifier for the product that initiated the import.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ExternalAgentConfigImportParams" });

export type V2ExternalAgentConfigImportProgressNotification = {
  readonly importId: string;
  readonly itemTypeResults: ReadonlyArray<V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportTypeResult>;
};
export const V2ExternalAgentConfigImportProgressNotification = Schema.Struct({
  importId: Schema.String,
  itemTypeResults: Schema.Array(
    V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportTypeResult,
  ),
}).annotate({ title: "ExternalAgentConfigImportProgressNotification" });

export type V2ExternalAgentConfigImportResponse = { readonly importId: string };
export const V2ExternalAgentConfigImportResponse = Schema.Struct({
  importId: Schema.String,
}).annotate({ title: "ExternalAgentConfigImportResponse" });

export type V2FeedbackUploadParams = {
  readonly classification: string;
  readonly extraLogFiles?: ReadonlyArray<string> | null;
  readonly includeLogs?: boolean;
  readonly reason?: string | null;
  readonly tags?: { readonly [x: string]: string } | null;
  readonly threadId?: string | null;
};
export const V2FeedbackUploadParams = Schema.Struct({
  classification: Schema.String,
  extraLogFiles: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  includeLogs: Schema.optionalKey(Schema.Boolean),
  reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  tags: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "FeedbackUploadParams" });

export type V2FeedbackUploadResponse = {
  readonly promptHash?: string | null;
  readonly threadId: string;
};
export const V2FeedbackUploadResponse = Schema.Struct({
  promptHash: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Whitespace-normalized SHA-256 of the session base instructions, matching the uploaded `prompt_hash` tag. Does not include later developer messages. Null when the reported rollout has no prompt metadata.",
      }),
      Schema.Null,
    ]),
  ),
  threadId: Schema.String,
}).annotate({ title: "FeedbackUploadResponse" });

export type V2FileChangeOutputDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2FileChangeOutputDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  title: "FileChangeOutputDeltaNotification",
  description:
    "Deprecated legacy notification for `apply_patch` textual output.\n\nThe server no longer emits this notification.",
});

export type V2FileChangePatchUpdatedNotification = {
  readonly changes: ReadonlyArray<V2FileChangePatchUpdatedNotification__FileUpdateChange>;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2FileChangePatchUpdatedNotification = Schema.Struct({
  changes: Schema.Array(V2FileChangePatchUpdatedNotification__FileUpdateChange),
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "FileChangePatchUpdatedNotification" });

export type V2FsChangedNotification = {
  readonly changedPaths: ReadonlyArray<V2FsChangedNotification__AbsolutePathBuf>;
  readonly watchId: string;
};
export const V2FsChangedNotification = Schema.Struct({
  changedPaths: Schema.Array(V2FsChangedNotification__AbsolutePathBuf).annotate({
    description: "File or directory paths associated with this event.",
  }),
  watchId: Schema.String.annotate({
    description: "Watch identifier previously provided to `fs/watch`.",
  }),
}).annotate({
  title: "FsChangedNotification",
  description: "Filesystem watch notification emitted for `fs/watch` subscribers.",
});

export type V2FsCopyParams = {
  readonly destinationPath: V2FsCopyParams__AbsolutePathBuf;
  readonly recursive?: boolean;
  readonly sourcePath: V2FsCopyParams__AbsolutePathBuf;
};
export const V2FsCopyParams = Schema.Struct({
  destinationPath: Schema.suspend(
    (): Schema.Codec<V2FsCopyParams__AbsolutePathBuf> => V2FsCopyParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute destination path." }),
  recursive: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Required for directory copies; ignored for file copies.",
    }),
  ),
  sourcePath: Schema.suspend(
    (): Schema.Codec<V2FsCopyParams__AbsolutePathBuf> => V2FsCopyParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute source path." }),
}).annotate({
  title: "FsCopyParams",
  description: "Copy a file or directory tree on the host filesystem.",
});

export type V2FsCopyResponse = { readonly [x: string]: Schema.Json };
export const V2FsCopyResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "FsCopyResponse", description: "Successful response for `fs/copy`." });

export type V2FsCreateDirectoryParams = {
  readonly path: V2FsCreateDirectoryParams__AbsolutePathBuf;
  readonly recursive?: boolean | null;
};
export const V2FsCreateDirectoryParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<V2FsCreateDirectoryParams__AbsolutePathBuf> =>
      V2FsCreateDirectoryParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute directory path to create." }),
  recursive: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description: "Whether parent directories should also be created. Defaults to `true`.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  title: "FsCreateDirectoryParams",
  description: "Create a directory on the host filesystem.",
});

export type V2FsCreateDirectoryResponse = { readonly [x: string]: Schema.Json };
export const V2FsCreateDirectoryResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "FsCreateDirectoryResponse",
  description: "Successful response for `fs/createDirectory`.",
});

export type V2FsGetMetadataParams = { readonly path: V2FsGetMetadataParams__AbsolutePathBuf };
export const V2FsGetMetadataParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<V2FsGetMetadataParams__AbsolutePathBuf> =>
      V2FsGetMetadataParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute path to inspect." }),
}).annotate({
  title: "FsGetMetadataParams",
  description: "Request metadata for an absolute path.",
});

export type V2FsGetMetadataResponse = {
  readonly createdAtMs: number;
  readonly isDirectory: boolean;
  readonly isFile: boolean;
  readonly isSymlink: boolean;
  readonly modifiedAtMs: number;
};
export const V2FsGetMetadataResponse = Schema.Struct({
  createdAtMs: Schema.Number.annotate({
    description: "File creation time in Unix milliseconds when available, otherwise `0`.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  isDirectory: Schema.Boolean.annotate({
    description: "Whether the path resolves to a directory.",
  }),
  isFile: Schema.Boolean.annotate({ description: "Whether the path resolves to a regular file." }),
  isSymlink: Schema.Boolean.annotate({
    description: "Whether the path itself is a symbolic link.",
  }),
  modifiedAtMs: Schema.Number.annotate({
    description: "File modification time in Unix milliseconds when available, otherwise `0`.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({
  title: "FsGetMetadataResponse",
  description: "Metadata returned by `fs/getMetadata`.",
});

export type V2FsReadDirectoryParams = { readonly path: V2FsReadDirectoryParams__AbsolutePathBuf };
export const V2FsReadDirectoryParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<V2FsReadDirectoryParams__AbsolutePathBuf> =>
      V2FsReadDirectoryParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute directory path to read." }),
}).annotate({
  title: "FsReadDirectoryParams",
  description: "List direct child names for a directory.",
});

export type V2FsReadDirectoryResponse = {
  readonly entries: ReadonlyArray<V2FsReadDirectoryResponse__FsReadDirectoryEntry>;
};
export const V2FsReadDirectoryResponse = Schema.Struct({
  entries: Schema.Array(V2FsReadDirectoryResponse__FsReadDirectoryEntry).annotate({
    description: "Direct child entries in the requested directory.",
  }),
}).annotate({
  title: "FsReadDirectoryResponse",
  description: "Directory entries returned by `fs/readDirectory`.",
});

export type V2FsReadFileParams = { readonly path: V2FsReadFileParams__AbsolutePathBuf };
export const V2FsReadFileParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<V2FsReadFileParams__AbsolutePathBuf> => V2FsReadFileParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute path to read." }),
}).annotate({ title: "FsReadFileParams", description: "Read a file from the host filesystem." });

export type V2FsReadFileResponse = { readonly dataBase64: string };
export const V2FsReadFileResponse = Schema.Struct({
  dataBase64: Schema.String.annotate({ description: "File contents encoded as base64." }),
}).annotate({
  title: "FsReadFileResponse",
  description: "Base64-encoded file contents returned by `fs/readFile`.",
});

export type V2FsRemoveParams = {
  readonly force?: boolean | null;
  readonly path: V2FsRemoveParams__AbsolutePathBuf;
  readonly recursive?: boolean | null;
};
export const V2FsRemoveParams = Schema.Struct({
  force: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description: "Whether missing paths should be ignored. Defaults to `true`.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.suspend(
    (): Schema.Codec<V2FsRemoveParams__AbsolutePathBuf> => V2FsRemoveParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute path to remove." }),
  recursive: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description: "Whether directory removal should recurse. Defaults to `true`.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  title: "FsRemoveParams",
  description: "Remove a file or directory tree from the host filesystem.",
});

export type V2FsRemoveResponse = { readonly [x: string]: Schema.Json };
export const V2FsRemoveResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "FsRemoveResponse", description: "Successful response for `fs/remove`." });

export type V2FsUnwatchParams = { readonly watchId: string };
export const V2FsUnwatchParams = Schema.Struct({
  watchId: Schema.String.annotate({
    description: "Watch identifier previously provided to `fs/watch`.",
  }),
}).annotate({
  title: "FsUnwatchParams",
  description: "Stop filesystem watch notifications for a prior `fs/watch`.",
});

export type V2FsUnwatchResponse = { readonly [x: string]: Schema.Json };
export const V2FsUnwatchResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "FsUnwatchResponse", description: "Successful response for `fs/unwatch`." });

export type V2FsWatchParams = {
  readonly path: V2FsWatchParams__AbsolutePathBuf;
  readonly watchId: string;
};
export const V2FsWatchParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<V2FsWatchParams__AbsolutePathBuf> => V2FsWatchParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute file or directory path to watch." }),
  watchId: Schema.String.annotate({
    description: "Connection-scoped watch identifier used for `fs/unwatch` and `fs/changed`.",
  }),
}).annotate({
  title: "FsWatchParams",
  description: "Start filesystem watch notifications for an absolute path.",
});

export type V2FsWatchResponse = { readonly path: V2FsWatchResponse__AbsolutePathBuf };
export const V2FsWatchResponse = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<V2FsWatchResponse__AbsolutePathBuf> => V2FsWatchResponse__AbsolutePathBuf,
  ).annotate({ description: "Canonicalized path associated with the watch." }),
}).annotate({ title: "FsWatchResponse", description: "Successful response for `fs/watch`." });

export type V2FsWriteFileParams = {
  readonly dataBase64: string;
  readonly path: V2FsWriteFileParams__AbsolutePathBuf;
};
export const V2FsWriteFileParams = Schema.Struct({
  dataBase64: Schema.String.annotate({ description: "File contents encoded as base64." }),
  path: Schema.suspend(
    (): Schema.Codec<V2FsWriteFileParams__AbsolutePathBuf> => V2FsWriteFileParams__AbsolutePathBuf,
  ).annotate({ description: "Absolute path to write." }),
}).annotate({ title: "FsWriteFileParams", description: "Write a file on the host filesystem." });

export type V2FsWriteFileResponse = { readonly [x: string]: Schema.Json };
export const V2FsWriteFileResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "FsWriteFileResponse",
  description: "Successful response for `fs/writeFile`.",
});

export type V2GatewayOAuthCancelResponse = { readonly [x: string]: Schema.Json };
export const V2GatewayOAuthCancelResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "GatewayOAuthCancelResponse" });

export type V2GatewayOAuthChangedNotification = {
  readonly authUrl?: string | null;
  readonly error?: string | null;
  readonly providerId: string;
  readonly status: V2GatewayOAuthChangedNotification__GatewayOAuthStatus;
};
export const V2GatewayOAuthChangedNotification = Schema.Struct({
  authUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Authorization handoff, sent only to the connection that started login.",
      }),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  providerId: Schema.String,
  status: V2GatewayOAuthChangedNotification__GatewayOAuthStatus,
}).annotate({ title: "GatewayOAuthChangedNotification" });

export type V2GatewayOAuthLoginResponse = { readonly [x: string]: Schema.Json };
export const V2GatewayOAuthLoginResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "GatewayOAuthLoginResponse" });

export type V2GatewayOAuthReadResponse = {
  readonly error?: string | null;
  readonly providerId: string;
  readonly providerName: string;
  readonly required: boolean;
  readonly status?: V2GatewayOAuthReadResponse__GatewayOAuthStatus | null;
};
export const V2GatewayOAuthReadResponse = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  providerId: Schema.String,
  providerName: Schema.String,
  required: Schema.Boolean.annotate({
    description: "Whether the selected provider uses gateway OAuth, even when already signed in.",
  }),
  status: Schema.optionalKey(
    Schema.Union([V2GatewayOAuthReadResponse__GatewayOAuthStatus, Schema.Null]).annotate({
      description: "Null when the effective provider does not use gateway OAuth.",
    }),
  ),
}).annotate({
  title: "GatewayOAuthReadResponse",
  description:
    "Current effective gateway policy and credential readiness; never contains credentials.",
});

export type V2GetAccountParams = { readonly refreshToken?: boolean };
export const V2GetAccountParams = Schema.Struct({
  refreshToken: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When `true`, requests a proactive token refresh before returning.\n\nIn managed auth mode this triggers the normal refresh-token flow. In external auth mode this flag is ignored. Clients should refresh tokens themselves and call `account/login/start` with `chatgptAuthTokens`.",
    }),
  ),
}).annotate({ title: "GetAccountParams" });

export type V2GetAccountRateLimitsResponse = {
  readonly accountId?: string | null;
  readonly ordinaryUsageAllowed?: boolean | null;
  readonly rateLimitResetCredits?: V2GetAccountRateLimitsResponse__RateLimitResetCreditsSummary | null;
  readonly rateLimitUpsell?: Schema.Json;
  readonly rateLimits: V2GetAccountRateLimitsResponse__RateLimitSnapshot;
  readonly rateLimitsByLimitId?: {
    readonly [x: string]: V2GetAccountRateLimitsResponse__RateLimitSnapshot;
  } | null;
};
export const V2GetAccountRateLimitsResponse = Schema.Struct({
  accountId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Account associated with this usage snapshot, when supplied by the backend.",
      }),
      Schema.Null,
    ]),
  ),
  ordinaryUsageAllowed: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description:
          "Backend permission for ordinary included usage, validated against the active account. Null means unavailable; clients must not infer recovery from percentages or reset times.",
      }),
      Schema.Null,
    ]),
  ),
  rateLimitResetCredits: Schema.optionalKey(
    Schema.Union([V2GetAccountRateLimitsResponse__RateLimitResetCreditsSummary, Schema.Null]),
  ),
  rateLimitUpsell: Schema.optionalKey(
    Schema.Json.annotate({
      expected: "JSON value",
      description:
        "Optional backend-owned banner from the same usage read. Its nested keys retain the backend's snake_case contract; an absent banner leaves the client's existing UI unchanged.",
    }),
  ),
  rateLimits: Schema.suspend(
    (): Schema.Codec<V2GetAccountRateLimitsResponse__RateLimitSnapshot> =>
      V2GetAccountRateLimitsResponse__RateLimitSnapshot,
  ).annotate({
    description: "Backward-compatible single-bucket view; mirrors the historical payload.",
  }),
  rateLimitsByLimitId: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, V2GetAccountRateLimitsResponse__RateLimitSnapshot).annotate({
        description: "Multi-bucket view keyed by metered `limit_id` (for example, `codex`).",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "GetAccountRateLimitsResponse" });

export type V2GetAccountResponse = {
  readonly account?: V2GetAccountResponse__Account | null;
  readonly requiresOpenaiAuth: boolean;
};
export const V2GetAccountResponse = Schema.Struct({
  account: Schema.optionalKey(Schema.Union([V2GetAccountResponse__Account, Schema.Null])),
  requiresOpenaiAuth: Schema.Boolean,
}).annotate({ title: "GetAccountResponse" });

export type V2GetAccountResponse__WorkspaceRouting = {
  readonly accountRoutingOverride: V2GetAccountResponse__AccountRoutingOverride;
  readonly backendOrigin: string;
  readonly chatgptAccountId: string;
};
export const V2GetAccountResponse__WorkspaceRouting = Schema.Struct({
  accountRoutingOverride: V2GetAccountResponse__AccountRoutingOverride,
  backendOrigin: Schema.String,
  chatgptAccountId: Schema.String,
});

export type V2GetAccountTokenUsageResponse = {
  readonly dailyUsageBuckets?: ReadonlyArray<V2GetAccountTokenUsageResponse__AccountTokenUsageDailyBucket> | null;
  readonly summary: V2GetAccountTokenUsageResponse__AccountTokenUsageSummary;
  readonly threadUsage?: V2GetAccountTokenUsageResponse__ThreadUsage | null;
};
export const V2GetAccountTokenUsageResponse = Schema.Struct({
  dailyUsageBuckets: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2GetAccountTokenUsageResponse__AccountTokenUsageDailyBucket),
      Schema.Null,
    ]),
  ),
  summary: V2GetAccountTokenUsageResponse__AccountTokenUsageSummary,
  threadUsage: Schema.optionalKey(
    Schema.Union([V2GetAccountTokenUsageResponse__ThreadUsage, Schema.Null]).annotate({
      description:
        "Estimated usage when a thread was requested and its billing route is available.",
    }),
  ),
}).annotate({ title: "GetAccountTokenUsageResponse" });

export type V2GetWorkspaceMessagesResponse = {
  readonly featureEnabled: boolean;
  readonly messages: ReadonlyArray<V2GetWorkspaceMessagesResponse__WorkspaceMessage>;
};
export const V2GetWorkspaceMessagesResponse = Schema.Struct({
  featureEnabled: Schema.Boolean.annotate({
    description: "Whether the workspace-message backend route is available for this client.",
  }),
  messages: Schema.Array(V2GetWorkspaceMessagesResponse__WorkspaceMessage).annotate({
    description: "Active workspace messages returned by the backend.",
  }),
}).annotate({ title: "GetWorkspaceMessagesResponse" });

export type V2GuardianWarningNotification = { readonly message: string; readonly threadId: string };
export const V2GuardianWarningNotification = Schema.Struct({
  message: Schema.String.annotate({
    description: "Concise guardian warning message for the user.",
  }),
  threadId: Schema.String.annotate({ description: "Thread target for the guardian warning." }),
}).annotate({ title: "GuardianWarningNotification" });

export type V2HookCompletedNotification = {
  readonly run: V2HookCompletedNotification__HookRunSummary;
  readonly threadId: string;
  readonly turnId?: string | null;
};
export const V2HookCompletedNotification = Schema.Struct({
  run: V2HookCompletedNotification__HookRunSummary,
  threadId: Schema.String,
  turnId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "HookCompletedNotification" });

export type V2HooksListParams = { readonly cwds?: ReadonlyArray<string> };
export const V2HooksListParams = Schema.Struct({
  cwds: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "When empty, defaults to the current session working directory.",
    }),
  ),
}).annotate({ title: "HooksListParams" });

export type V2HooksListResponse = {
  readonly data: ReadonlyArray<V2HooksListResponse__HooksListEntry>;
};
export const V2HooksListResponse = Schema.Struct({
  data: Schema.Array(V2HooksListResponse__HooksListEntry),
}).annotate({ title: "HooksListResponse" });

export type V2HookStartedNotification = {
  readonly run: V2HookStartedNotification__HookRunSummary;
  readonly threadId: string;
  readonly turnId?: string | null;
};
export const V2HookStartedNotification = Schema.Struct({
  run: V2HookStartedNotification__HookRunSummary,
  threadId: Schema.String,
  turnId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "HookStartedNotification" });

export type V2ItemCompletedNotification = {
  readonly completedAtMs: number;
  readonly item: V2ItemCompletedNotification__ThreadItem;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2ItemCompletedNotification = Schema.Struct({
  completedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this item lifecycle completed.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  item: V2ItemCompletedNotification__ThreadItem,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "ItemCompletedNotification" });

export type V2ItemGuardianApprovalReviewCompletedNotification = {
  readonly action: V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewAction;
  readonly completedAtMs: number;
  readonly decisionSource: V2ItemGuardianApprovalReviewCompletedNotification__AutoReviewDecisionSource;
  readonly review: V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReview;
  readonly reviewId: string;
  readonly startedAtMs: number;
  readonly targetItemId?: string | null;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2ItemGuardianApprovalReviewCompletedNotification = Schema.Struct({
  action: V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewAction,
  completedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this review completed.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  decisionSource: V2ItemGuardianApprovalReviewCompletedNotification__AutoReviewDecisionSource,
  review: V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReview,
  reviewId: Schema.String.annotate({ description: "Stable identifier for this review." }),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this review started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  targetItemId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Identifier for the reviewed item or tool call when one exists.\n\nIn most cases, one review maps to one target item. The exceptions are - execve reviews, where a single command may contain multiple execve calls to review (only possible when using the shell_zsh_fork feature) - stdin reviews, which refer to the existing parent command item and have a separate approval ID in the action payload - network policy reviews, where there is no target item\n\nA network call is triggered by a CommandExecution item, so having a target_item_id set to the CommandExecution item would be misleading because the review is about the network call, not the command execution. Therefore, target_item_id is set to None for network policy reviews.",
      }),
      Schema.Null,
    ]),
  ),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  title: "ItemGuardianApprovalReviewCompletedNotification",
  description:
    "[UNSTABLE] Temporary notification payload for approval auto-review. This shape is expected to change soon.",
});

export type V2ItemGuardianApprovalReviewStartedNotification = {
  readonly action: V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewAction;
  readonly review: V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReview;
  readonly reviewId: string;
  readonly startedAtMs: number;
  readonly targetItemId?: string | null;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2ItemGuardianApprovalReviewStartedNotification = Schema.Struct({
  action: V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewAction,
  review: V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReview,
  reviewId: Schema.String.annotate({ description: "Stable identifier for this review." }),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this review started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  targetItemId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Identifier for the reviewed item or tool call when one exists.\n\nIn most cases, one review maps to one target item. The exceptions are - execve reviews, where a single command may contain multiple execve calls to review (only possible when using the shell_zsh_fork feature) - stdin reviews, which refer to the existing parent command item and have a separate approval ID in the action payload - network policy reviews, where there is no target item\n\nA network call is triggered by a CommandExecution item, so having a target_item_id set to the CommandExecution item would be misleading because the review is about the network call, not the command execution. Therefore, target_item_id is set to None for network policy reviews.",
      }),
      Schema.Null,
    ]),
  ),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  title: "ItemGuardianApprovalReviewStartedNotification",
  description:
    "[UNSTABLE] Temporary notification payload for approval auto-review. This shape is expected to change soon.",
});

export type V2ItemStartedNotification = {
  readonly item: V2ItemStartedNotification__ThreadItem;
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2ItemStartedNotification = Schema.Struct({
  item: V2ItemStartedNotification__ThreadItem,
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this item lifecycle started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "ItemStartedNotification" });

export type V2ListMcpServerStatusParams = {
  readonly cursor?: string | null;
  readonly detail?: V2ListMcpServerStatusParams__McpServerStatusDetail | null;
  readonly limit?: number | null;
  readonly serverName?: string | null;
  readonly threadId?: string | null;
};
export const V2ListMcpServerStatusParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque pagination cursor returned by a previous call.",
      }),
      Schema.Null,
    ]),
  ),
  detail: Schema.optionalKey(
    Schema.Union([V2ListMcpServerStatusParams__McpServerStatusDetail, Schema.Null]).annotate({
      description:
        "Controls how much MCP inventory data to fetch for each server. Defaults to `Full` when omitted.",
    }),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Optional page size; defaults to a server-defined value.",
        format: "uint32",
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
  serverName: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Limit discovery to one server. With a thread ID, reuse that thread's MCP connection.",
      }),
      Schema.Null,
    ]),
  ),
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "ListMcpServerStatusParams" });

export type V2ListMcpServerStatusResponse = {
  readonly data: ReadonlyArray<V2ListMcpServerStatusResponse__McpServerStatus>;
  readonly nextCursor?: string | null;
};
export const V2ListMcpServerStatusResponse = Schema.Struct({
  data: Schema.Array(V2ListMcpServerStatusResponse__McpServerStatus),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last item. If None, there are no more items to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ListMcpServerStatusResponse" });

export type V2LoginAccountParams =
  | { readonly apiKey: string; readonly type: "apiKey" }
  | {
      readonly appBrand?: V2LoginAccountParams__LoginAppBrand | null;
      readonly codexStreamlinedLogin?: boolean;
      readonly type: "chatgpt";
      readonly useHostedLoginSuccessPage?: boolean;
    }
  | { readonly type: "chatgptDeviceCode" }
  | {
      readonly accessToken: string;
      readonly chatgptAccountId: string;
      readonly chatgptPlanType?: string | null;
      readonly type: "chatgptAuthTokens";
    }
  | { readonly apiKey: string; readonly region: string; readonly type: "amazonBedrock" }
  | {
      readonly accessKeyId: string;
      readonly region: string;
      readonly secretAccessKey: string;
      readonly sessionToken?: string | null;
      readonly type: "amazonBedrockAccessKeys";
    };
export const V2LoginAccountParams = Schema.Union(
  [
    Schema.Struct({
      apiKey: Schema.String,
      type: Schema.Literal("apiKey").annotate({ title: "ApiKeyv2::LoginAccountParamsType" }),
    }).annotate({ title: "ApiKeyv2::LoginAccountParams" }),
    Schema.Struct({
      appBrand: Schema.optionalKey(
        Schema.Union([V2LoginAccountParams__LoginAppBrand, Schema.Null]),
      ),
      codexStreamlinedLogin: Schema.optionalKey(Schema.Boolean),
      type: Schema.Literal("chatgpt").annotate({ title: "Chatgptv2::LoginAccountParamsType" }),
      useHostedLoginSuccessPage: Schema.optionalKey(Schema.Boolean),
    }).annotate({ title: "Chatgptv2::LoginAccountParams" }),
    Schema.Struct({
      type: Schema.Literal("chatgptDeviceCode").annotate({
        title: "ChatgptDeviceCodev2::LoginAccountParamsType",
      }),
    }).annotate({ title: "ChatgptDeviceCodev2::LoginAccountParams" }),
    Schema.Struct({
      accessToken: Schema.String.annotate({
        description:
          "Access token (JWT) supplied by the client. This token is used for backend API requests and email extraction.",
      }),
      chatgptAccountId: Schema.String.annotate({
        description: "Workspace/account identifier supplied by the client.",
      }),
      chatgptPlanType: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Optional plan type supplied by the client.\n\nWhen `null`, Codex attempts to derive the plan type from access-token claims. If unavailable, the plan defaults to `unknown`.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("chatgptAuthTokens").annotate({
        title: "ChatgptAuthTokensv2::LoginAccountParamsType",
      }),
    }).annotate({
      title: "ChatgptAuthTokensv2::LoginAccountParams",
      description:
        "[UNSTABLE] FOR OPENAI INTERNAL USE ONLY - DO NOT USE. The access token must contain the same scopes that Codex-managed ChatGPT auth tokens have.",
    }),
    Schema.Struct({
      apiKey: Schema.String,
      region: Schema.String,
      type: Schema.Literal("amazonBedrock").annotate({
        title: "AmazonBedrockv2::LoginAccountParamsType",
      }),
    }).annotate({
      title: "AmazonBedrockv2::LoginAccountParams",
      description: "[UNSTABLE] Managed Amazon Bedrock login is experimental.",
    }),
    Schema.Struct({
      accessKeyId: Schema.String,
      region: Schema.String,
      secretAccessKey: Schema.String,
      sessionToken: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("amazonBedrockAccessKeys").annotate({
        title: "AmazonBedrockAccessKeysv2::LoginAccountParamsType",
      }),
    }).annotate({
      title: "AmazonBedrockAccessKeysv2::LoginAccountParams",
      description: "[UNSTABLE] Managed Amazon Bedrock AWS access key login is experimental.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ title: "LoginAccountParams" });

export type V2LoginAccountResponse =
  | { readonly type: "apiKey" }
  | { readonly authUrl: string; readonly loginId: string; readonly type: "chatgpt" }
  | {
      readonly loginId: string;
      readonly type: "chatgptDeviceCode";
      readonly userCode: string;
      readonly verificationUrl: string;
    }
  | { readonly type: "chatgptAuthTokens" }
  | { readonly type: "amazonBedrock" };
export const V2LoginAccountResponse = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("apiKey").annotate({ title: "ApiKeyv2::LoginAccountResponseType" }),
    }).annotate({ title: "ApiKeyv2::LoginAccountResponse" }),
    Schema.Struct({
      authUrl: Schema.String.annotate({
        description: "URL the client should open in a browser to initiate the OAuth flow.",
      }),
      loginId: Schema.String,
      type: Schema.Literal("chatgpt").annotate({ title: "Chatgptv2::LoginAccountResponseType" }),
    }).annotate({ title: "Chatgptv2::LoginAccountResponse" }),
    Schema.Struct({
      loginId: Schema.String,
      type: Schema.Literal("chatgptDeviceCode").annotate({
        title: "ChatgptDeviceCodev2::LoginAccountResponseType",
      }),
      userCode: Schema.String.annotate({
        description: "One-time code the user must enter after signing in.",
      }),
      verificationUrl: Schema.String.annotate({
        description:
          "URL the client should open in a browser to complete device code authorization.",
      }),
    }).annotate({ title: "ChatgptDeviceCodev2::LoginAccountResponse" }),
    Schema.Struct({
      type: Schema.Literal("chatgptAuthTokens").annotate({
        title: "ChatgptAuthTokensv2::LoginAccountResponseType",
      }),
    }).annotate({ title: "ChatgptAuthTokensv2::LoginAccountResponse" }),
    Schema.Struct({
      type: Schema.Literal("amazonBedrock").annotate({
        title: "AmazonBedrockv2::LoginAccountResponseType",
      }),
    }).annotate({ title: "AmazonBedrockv2::LoginAccountResponse" }),
  ],
  { mode: "oneOf" },
).annotate({ title: "LoginAccountResponse" });

export type V2LogoutAccountResponse = { readonly [x: string]: Schema.Json };
export const V2LogoutAccountResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "LogoutAccountResponse" });

export type V2MarketplaceAddParams = {
  readonly refName?: string | null;
  readonly source: string;
  readonly sparsePaths?: ReadonlyArray<string> | null;
};
export const V2MarketplaceAddParams = Schema.Struct({
  refName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  source: Schema.String,
  sparsePaths: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
}).annotate({ title: "MarketplaceAddParams" });

export type V2MarketplaceAddResponse = {
  readonly alreadyAdded: boolean;
  readonly installedRoot: V2MarketplaceAddResponse__AbsolutePathBuf;
  readonly marketplaceName: string;
};
export const V2MarketplaceAddResponse = Schema.Struct({
  alreadyAdded: Schema.Boolean,
  installedRoot: V2MarketplaceAddResponse__AbsolutePathBuf,
  marketplaceName: Schema.String,
}).annotate({ title: "MarketplaceAddResponse" });

export type V2MarketplaceRemoveParams = { readonly marketplaceName: string };
export const V2MarketplaceRemoveParams = Schema.Struct({ marketplaceName: Schema.String }).annotate(
  { title: "MarketplaceRemoveParams" },
);

export type V2MarketplaceRemoveResponse = {
  readonly installedRoot?: V2MarketplaceRemoveResponse__AbsolutePathBuf | null;
  readonly marketplaceName: string;
};
export const V2MarketplaceRemoveResponse = Schema.Struct({
  installedRoot: Schema.optionalKey(
    Schema.Union([V2MarketplaceRemoveResponse__AbsolutePathBuf, Schema.Null]),
  ),
  marketplaceName: Schema.String,
}).annotate({ title: "MarketplaceRemoveResponse" });

export type V2MarketplaceUpgradeParams = { readonly marketplaceName?: string | null };
export const V2MarketplaceUpgradeParams = Schema.Struct({
  marketplaceName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "MarketplaceUpgradeParams" });

export type V2MarketplaceUpgradeResponse = {
  readonly errors: ReadonlyArray<V2MarketplaceUpgradeResponse__MarketplaceUpgradeErrorInfo>;
  readonly selectedMarketplaces: ReadonlyArray<string>;
  readonly upgradedRoots: ReadonlyArray<V2MarketplaceUpgradeResponse__AbsolutePathBuf>;
};
export const V2MarketplaceUpgradeResponse = Schema.Struct({
  errors: Schema.Array(V2MarketplaceUpgradeResponse__MarketplaceUpgradeErrorInfo),
  selectedMarketplaces: Schema.Array(Schema.String),
  upgradedRoots: Schema.Array(V2MarketplaceUpgradeResponse__AbsolutePathBuf),
}).annotate({ title: "MarketplaceUpgradeResponse" });

export type V2McpResourceReadParams = {
  readonly connectorId?: string | null;
  readonly originCallId?: string | null;
  readonly server: string;
  readonly target?: V2McpResourceReadParams__McpResourceReadTarget | null;
  readonly threadId?: string | null;
  readonly uri: string;
};
export const V2McpResourceReadParams = Schema.Struct({
  connectorId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originCallId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Originating MCP tool call used to select the resource's app.",
      }),
      Schema.Null,
    ]),
  ),
  server: Schema.String,
  target: Schema.optionalKey(
    Schema.Union([V2McpResourceReadParams__McpResourceReadTarget, Schema.Null]).annotate({
      description: "Explicit hosted app/account. Omit to retain legacy resource discovery.",
    }),
  ),
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  uri: Schema.String,
}).annotate({ title: "McpResourceReadParams" });

export type V2McpResourceReadResponse = {
  readonly contents: ReadonlyArray<V2McpResourceReadResponse__ResourceContent>;
  readonly originCallId?: string | null;
};
export const V2McpResourceReadResponse = Schema.Struct({
  contents: Schema.Array(V2McpResourceReadResponse__ResourceContent),
  originCallId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Originating call when the server applied app-specific resource scoping.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "McpResourceReadResponse" });

export type V2McpServerEventStreamNotification = {
  readonly notification: V2McpServerEventStreamNotification__McpServerEventNotification;
  readonly subscriptionId: string;
};
export const V2McpServerEventStreamNotification = Schema.Struct({
  notification: V2McpServerEventStreamNotification__McpServerEventNotification,
  subscriptionId: Schema.String,
}).annotate({ title: "McpServerEventStreamNotification" });

export type V2McpServerOauthLoginCompletedNotification = {
  readonly error?: string | null;
  readonly name: string;
  readonly success: boolean;
  readonly threadId?: string | null;
};
export const V2McpServerOauthLoginCompletedNotification = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
  success: Schema.Boolean,
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "McpServerOauthLoginCompletedNotification" });

export type V2McpServerOauthLoginParams = {
  readonly clientRegistration?: V2McpServerOauthLoginParams__McpServerOauthClientRegistration | null;
  readonly name: string;
  readonly scopes?: ReadonlyArray<string> | null;
  readonly threadId?: string | null;
  readonly timeoutSecs?: number | null;
};
export const V2McpServerOauthLoginParams = Schema.Struct({
  clientRegistration: Schema.optionalKey(
    Schema.Union([
      V2McpServerOauthLoginParams__McpServerOauthClientRegistration,
      Schema.Null,
    ]).annotate({
      description:
        "Registration strategy for this login only; omission selects automatic discovery.",
    }),
  ),
  name: Schema.String,
  scopes: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  timeoutSecs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "McpServerOauthLoginParams" });

export type V2McpServerOauthLoginResponse = { readonly authorizationUrl: string };
export const V2McpServerOauthLoginResponse = Schema.Struct({
  authorizationUrl: Schema.String,
}).annotate({ title: "McpServerOauthLoginResponse" });

export type V2McpServerRefreshResponse = { readonly [x: string]: Schema.Json };
export const V2McpServerRefreshResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "McpServerRefreshResponse" });

export type V2McpServerStatusUpdatedNotification = {
  readonly error?: string | null;
  readonly failureReason?: V2McpServerStatusUpdatedNotification__McpServerStartupFailureReason | null;
  readonly name: string;
  readonly status: V2McpServerStatusUpdatedNotification__McpServerStartupState;
  readonly threadId?: string | null;
};
export const V2McpServerStatusUpdatedNotification = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  failureReason: Schema.optionalKey(
    Schema.Union([
      V2McpServerStatusUpdatedNotification__McpServerStartupFailureReason,
      Schema.Null,
    ]),
  ),
  name: Schema.String,
  status: V2McpServerStatusUpdatedNotification__McpServerStartupState,
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "McpServerStatusUpdatedNotification" });

export type V2McpServerToolCallParams = {
  readonly _meta?: Schema.Json;
  readonly arguments?: Schema.Json;
  readonly server: string;
  readonly threadId: string;
  readonly tool: string;
};
export const V2McpServerToolCallParams = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  arguments: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  server: Schema.String,
  threadId: Schema.String,
  tool: Schema.String,
}).annotate({ title: "McpServerToolCallParams" });

export type V2McpServerToolCallResponse = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly isError?: boolean | null;
  readonly structuredContent?: Schema.Json;
};
export const V2McpServerToolCallResponse = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  isError: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ title: "McpServerToolCallResponse" });

export type V2McpToolCallProgressNotification = {
  readonly itemId: string;
  readonly message: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2McpToolCallProgressNotification = Schema.Struct({
  itemId: Schema.String,
  message: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "McpToolCallProgressNotification" });

export type V2ModelListParams = {
  readonly cursor?: string | null;
  readonly includeHidden?: boolean | null;
  readonly limit?: number | null;
};
export const V2ModelListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque pagination cursor returned by a previous call.",
      }),
      Schema.Null,
    ]),
  ),
  includeHidden: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description: "When true, include models that are hidden from the default picker list.",
      }),
      Schema.Null,
    ]),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Optional page size; defaults to a reasonable server-side value.",
        format: "uint32",
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
}).annotate({ title: "ModelListParams" });

export type V2ModelListResponse = {
  readonly data: ReadonlyArray<V2ModelListResponse__Model>;
  readonly nextCursor?: string | null;
};
export const V2ModelListResponse = Schema.Struct({
  data: Schema.Array(V2ModelListResponse__Model),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last item. If None, there are no more items to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ModelListResponse" });

export type V2ModelProviderCapabilitiesReadParams = { readonly [x: string]: Schema.Json };
export const V2ModelProviderCapabilitiesReadParams = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ModelProviderCapabilitiesReadParams" });

export type V2ModelProviderCapabilitiesReadResponse = {
  readonly imageGeneration: boolean;
  readonly namespaceTools: boolean;
  readonly webSearch: boolean;
};
export const V2ModelProviderCapabilitiesReadResponse = Schema.Struct({
  imageGeneration: Schema.Boolean,
  namespaceTools: Schema.Boolean,
  webSearch: Schema.Boolean,
}).annotate({ title: "ModelProviderCapabilitiesReadResponse" });

export type V2ModelReroutedNotification = {
  readonly fromModel: string;
  readonly reason: V2ModelReroutedNotification__ModelRerouteReason;
  readonly threadId: string;
  readonly toModel: string;
  readonly turnId: string;
};
export const V2ModelReroutedNotification = Schema.Struct({
  fromModel: Schema.String,
  reason: V2ModelReroutedNotification__ModelRerouteReason,
  threadId: Schema.String,
  toModel: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "ModelReroutedNotification" });

export type V2ModelSafetyBufferingUpdatedNotification = {
  readonly fasterModel?: string | null;
  readonly model: string;
  readonly reasons: ReadonlyArray<string>;
  readonly showBufferingUi: boolean;
  readonly threadId: string;
  readonly turnId: string;
  readonly useCases: ReadonlyArray<string>;
};
export const V2ModelSafetyBufferingUpdatedNotification = Schema.Struct({
  fasterModel: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  model: Schema.String,
  reasons: Schema.Array(Schema.String),
  showBufferingUi: Schema.Boolean,
  threadId: Schema.String,
  turnId: Schema.String,
  useCases: Schema.Array(Schema.String),
}).annotate({ title: "ModelSafetyBufferingUpdatedNotification" });

export type V2ModelVerificationNotification = {
  readonly threadId: string;
  readonly turnId: string;
  readonly verifications: ReadonlyArray<V2ModelVerificationNotification__ModelVerification>;
};
export const V2ModelVerificationNotification = Schema.Struct({
  threadId: Schema.String,
  turnId: Schema.String,
  verifications: Schema.Array(V2ModelVerificationNotification__ModelVerification),
}).annotate({ title: "ModelVerificationNotification" });

export type V2NullableGetAccountRateLimitsParams =
  V2NullableGetAccountRateLimitsParams__GetAccountRateLimitsParams | null;
export const V2NullableGetAccountRateLimitsParams = Schema.Union([
  V2NullableGetAccountRateLimitsParams__GetAccountRateLimitsParams,
  Schema.Null,
]).annotate({ title: "Nullable_GetAccountRateLimitsParams" });

export type V2NullableGetAccountTokenUsageParams =
  V2NullableGetAccountTokenUsageParams__GetAccountTokenUsageParams | null;
export const V2NullableGetAccountTokenUsageParams = Schema.Union([
  V2NullableGetAccountTokenUsageParams__GetAccountTokenUsageParams,
  Schema.Null,
]).annotate({ title: "Nullable_GetAccountTokenUsageParams" });

export type V2PermissionProfileListParams = {
  readonly cursor?: string | null;
  readonly cwd?: string | null;
  readonly limit?: number | null;
};
export const V2PermissionProfileListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque pagination cursor returned by a previous call.",
      }),
      Schema.Null,
    ]),
  ),
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional working directory to resolve project config layers.",
      }),
      Schema.Null,
    ]),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Optional page size; defaults to the full result set.",
        format: "uint32",
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
}).annotate({ title: "PermissionProfileListParams" });

export type V2PermissionProfileListResponse = {
  readonly data: ReadonlyArray<V2PermissionProfileListResponse__PermissionProfileSummary>;
  readonly nextCursor?: string | null;
};
export const V2PermissionProfileListResponse = Schema.Struct({
  data: Schema.Array(V2PermissionProfileListResponse__PermissionProfileSummary),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last item. If None, there are no more items to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "PermissionProfileListResponse" });

export type V2PlanDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2PlanDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  title: "PlanDeltaNotification",
  description:
    "EXPERIMENTAL - proposed plan streaming deltas for plan items. Clients should not assume concatenated deltas match the completed plan item content.",
});

export type V2PluginInstalledParams = {
  readonly cwds?: ReadonlyArray<V2PluginInstalledParams__AbsolutePathBuf> | null;
  readonly installSuggestionPluginNames?: ReadonlyArray<string> | null;
};
export const V2PluginInstalledParams = Schema.Struct({
  cwds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2PluginInstalledParams__AbsolutePathBuf).annotate({
        description: "Optional working directories used to discover repo marketplaces.",
      }),
      Schema.Null,
    ]),
  ),
  installSuggestionPluginNames: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Additional uninstalled plugin names that should be returned when present locally. This is used by mention surfaces that intentionally expose install entrypoints.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "PluginInstalledParams" });

export type V2PluginInstalledResponse = {
  readonly marketplaceLoadErrors?: ReadonlyArray<V2PluginInstalledResponse__MarketplaceLoadErrorInfo>;
  readonly marketplaces: ReadonlyArray<V2PluginInstalledResponse__PluginMarketplaceEntry>;
};
export const V2PluginInstalledResponse = Schema.Struct({
  marketplaceLoadErrors: Schema.optionalKey(
    Schema.Array(V2PluginInstalledResponse__MarketplaceLoadErrorInfo).annotate({ default: [] }),
  ),
  marketplaces: Schema.Array(V2PluginInstalledResponse__PluginMarketplaceEntry),
}).annotate({ title: "PluginInstalledResponse" });

export type V2PluginInstallParams = {
  readonly installAttemptId?: string | null;
  readonly marketplacePath?: V2PluginInstallParams__AbsolutePathBuf | null;
  readonly pluginName: string;
  readonly remoteMarketplaceName?: string | null;
};
export const V2PluginInstallParams = Schema.Struct({
  installAttemptId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Client-generated identifier used to correlate one installation attempt.",
      }),
      Schema.Null,
    ]),
  ),
  marketplacePath: Schema.optionalKey(
    Schema.Union([V2PluginInstallParams__AbsolutePathBuf, Schema.Null]),
  ),
  pluginName: Schema.String,
  remoteMarketplaceName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "PluginInstallParams" });

export type V2PluginInstallResponse = {
  readonly appsNeedingAuth: ReadonlyArray<V2PluginInstallResponse__AppSummary>;
  readonly authPolicy: V2PluginInstallResponse__PluginAuthPolicy;
};
export const V2PluginInstallResponse = Schema.Struct({
  appsNeedingAuth: Schema.Array(V2PluginInstallResponse__AppSummary),
  authPolicy: V2PluginInstallResponse__PluginAuthPolicy,
}).annotate({ title: "PluginInstallResponse" });

export type V2PluginListParams = {
  readonly cwds?: ReadonlyArray<V2PluginListParams__AbsolutePathBuf> | null;
  readonly forceRefetch?: boolean;
  readonly marketplaceKinds?: ReadonlyArray<V2PluginListParams__PluginListMarketplaceKind> | null;
};
export const V2PluginListParams = Schema.Struct({
  cwds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2PluginListParams__AbsolutePathBuf).annotate({
        description:
          "Optional working directories used to discover repo marketplaces. When omitted, only home-scoped marketplaces and the official curated marketplace are considered.",
      }),
      Schema.Null,
    ]),
  ),
  forceRefetch: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Whether the client requests a fresh remote plugin catalog fetch.",
    }),
  ),
  marketplaceKinds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2PluginListParams__PluginListMarketplaceKind).annotate({
        description:
          "Optional marketplace kind filter. When omitted, only local marketplaces are queried, plus the default remote catalog when enabled by feature flag.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "PluginListParams" });

export type V2PluginListResponse = {
  readonly featuredPluginIds?: ReadonlyArray<string>;
  readonly marketplaceLoadErrors?: ReadonlyArray<V2PluginListResponse__MarketplaceLoadErrorInfo>;
  readonly marketplaces: ReadonlyArray<V2PluginListResponse__PluginMarketplaceEntry>;
};
export const V2PluginListResponse = Schema.Struct({
  featuredPluginIds: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
  marketplaceLoadErrors: Schema.optionalKey(
    Schema.Array(V2PluginListResponse__MarketplaceLoadErrorInfo).annotate({ default: [] }),
  ),
  marketplaces: Schema.Array(V2PluginListResponse__PluginMarketplaceEntry),
}).annotate({ title: "PluginListResponse" });

export type V2PluginReadParams = {
  readonly marketplacePath?: V2PluginReadParams__AbsolutePathBuf | null;
  readonly pluginName: string;
  readonly remoteMarketplaceName?: string | null;
};
export const V2PluginReadParams = Schema.Struct({
  marketplacePath: Schema.optionalKey(
    Schema.Union([V2PluginReadParams__AbsolutePathBuf, Schema.Null]),
  ),
  pluginName: Schema.String,
  remoteMarketplaceName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "PluginReadParams" });

export type V2PluginReadResponse = { readonly plugin: V2PluginReadResponse__PluginDetail };
export const V2PluginReadResponse = Schema.Struct({
  plugin: V2PluginReadResponse__PluginDetail,
}).annotate({ title: "PluginReadResponse" });

export type V2PluginReconcileParams = { readonly reason?: string | null };
export const V2PluginReconcileParams = Schema.Struct({
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional client-provided reason recorded with the reconciliation attempt.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "PluginReconcileParams" });

export type V2PluginReconcileResponse = {
  readonly changedPlugins: ReadonlyArray<V2PluginReconcileResponse__PluginReconcileChangedPlugin>;
  readonly failedMaterializationRemotePluginIds: ReadonlyArray<string>;
  readonly failedRemotePluginIds: ReadonlyArray<string>;
};
export const V2PluginReconcileResponse = Schema.Struct({
  changedPlugins: Schema.Array(V2PluginReconcileResponse__PluginReconcileChangedPlugin).annotate({
    description:
      "Plugins affected by bundle changes, enablement changes, or removals. Installed-state changes compare against the previous cached snapshot, including cached reinstalls. Removal hints survive cache cleanup failures; unchanged plugins are omitted.",
  }),
  failedMaterializationRemotePluginIds: Schema.Array(Schema.String).annotate({
    description:
      "Subset of failures for which the requested bundle could not be materialized. A previously cached version may still be available.",
  }),
  failedRemotePluginIds: Schema.Array(Schema.String).annotate({
    description: "Backend remote plugin IDs whose bundle or identity update failed.",
  }),
}).annotate({
  title: "PluginReconcileResponse",
  description:
    "Bundle and installed-state changes observed by this pass, not a runtime-readiness acknowledgement or a cumulative diff since the client's last request. Other metadata-only changes are not listed.",
});

export type V2PluginShareCheckoutParams = { readonly remotePluginId: string };
export const V2PluginShareCheckoutParams = Schema.Struct({
  remotePluginId: Schema.String,
}).annotate({ title: "PluginShareCheckoutParams" });

export type V2PluginShareCheckoutResponse = {
  readonly marketplaceName: string;
  readonly marketplacePath: V2PluginShareCheckoutResponse__AbsolutePathBuf;
  readonly pluginId: string;
  readonly pluginName: string;
  readonly pluginPath: V2PluginShareCheckoutResponse__AbsolutePathBuf;
  readonly remotePluginId: string;
  readonly remoteVersion?: string | null;
};
export const V2PluginShareCheckoutResponse = Schema.Struct({
  marketplaceName: Schema.String,
  marketplacePath: V2PluginShareCheckoutResponse__AbsolutePathBuf,
  pluginId: Schema.String,
  pluginName: Schema.String,
  pluginPath: V2PluginShareCheckoutResponse__AbsolutePathBuf,
  remotePluginId: Schema.String,
  remoteVersion: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "PluginShareCheckoutResponse" });

export type V2PluginShareDeleteParams = { readonly remotePluginId: string };
export const V2PluginShareDeleteParams = Schema.Struct({ remotePluginId: Schema.String }).annotate({
  title: "PluginShareDeleteParams",
});

export type V2PluginShareDeleteResponse = { readonly [x: string]: Schema.Json };
export const V2PluginShareDeleteResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "PluginShareDeleteResponse" });

export type V2PluginShareListParams = { readonly [x: string]: Schema.Json };
export const V2PluginShareListParams = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "PluginShareListParams" });

export type V2PluginShareListResponse = {
  readonly data: ReadonlyArray<V2PluginShareListResponse__PluginShareListItem>;
};
export const V2PluginShareListResponse = Schema.Struct({
  data: Schema.Array(V2PluginShareListResponse__PluginShareListItem),
}).annotate({ title: "PluginShareListResponse" });

export type V2PluginShareSaveParams = {
  readonly discoverability?: V2PluginShareSaveParams__PluginShareDiscoverability | null;
  readonly pluginPath: V2PluginShareSaveParams__AbsolutePathBuf;
  readonly remotePluginId?: string | null;
  readonly shareTargets?: ReadonlyArray<V2PluginShareSaveParams__PluginShareTarget> | null;
};
export const V2PluginShareSaveParams = Schema.Struct({
  discoverability: Schema.optionalKey(
    Schema.Union([V2PluginShareSaveParams__PluginShareDiscoverability, Schema.Null]),
  ),
  pluginPath: V2PluginShareSaveParams__AbsolutePathBuf,
  remotePluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  shareTargets: Schema.optionalKey(
    Schema.Union([Schema.Array(V2PluginShareSaveParams__PluginShareTarget), Schema.Null]),
  ),
}).annotate({ title: "PluginShareSaveParams" });

export type V2PluginShareSaveResponse = {
  readonly canPublishToWorkspace?: boolean | null;
  readonly remotePluginId: string;
  readonly shareUrl: string;
};
export const V2PluginShareSaveResponse = Schema.Struct({
  canPublishToWorkspace: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  remotePluginId: Schema.String,
  shareUrl: Schema.String,
}).annotate({ title: "PluginShareSaveResponse" });

export type V2PluginShareUpdateTargetsParams = {
  readonly discoverability: V2PluginShareUpdateTargetsParams__PluginShareUpdateDiscoverability;
  readonly remotePluginId: string;
  readonly shareTargets: ReadonlyArray<V2PluginShareUpdateTargetsParams__PluginShareTarget>;
};
export const V2PluginShareUpdateTargetsParams = Schema.Struct({
  discoverability: V2PluginShareUpdateTargetsParams__PluginShareUpdateDiscoverability,
  remotePluginId: Schema.String,
  shareTargets: Schema.Array(V2PluginShareUpdateTargetsParams__PluginShareTarget),
}).annotate({ title: "PluginShareUpdateTargetsParams" });

export type V2PluginShareUpdateTargetsResponse = {
  readonly discoverability: V2PluginShareUpdateTargetsResponse__PluginShareDiscoverability;
  readonly principals: ReadonlyArray<V2PluginShareUpdateTargetsResponse__PluginSharePrincipal>;
};
export const V2PluginShareUpdateTargetsResponse = Schema.Struct({
  discoverability: V2PluginShareUpdateTargetsResponse__PluginShareDiscoverability,
  principals: Schema.Array(V2PluginShareUpdateTargetsResponse__PluginSharePrincipal),
}).annotate({ title: "PluginShareUpdateTargetsResponse" });

export type V2PluginSkillReadParams = {
  readonly remoteMarketplaceName: string;
  readonly remotePluginId: string;
  readonly skillName: string;
};
export const V2PluginSkillReadParams = Schema.Struct({
  remoteMarketplaceName: Schema.String,
  remotePluginId: Schema.String,
  skillName: Schema.String,
}).annotate({ title: "PluginSkillReadParams" });

export type V2PluginSkillReadResponse = { readonly contents?: string | null };
export const V2PluginSkillReadResponse = Schema.Struct({
  contents: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "PluginSkillReadResponse" });

export type V2PluginUninstallParams = { readonly pluginId: string };
export const V2PluginUninstallParams = Schema.Struct({ pluginId: Schema.String }).annotate({
  title: "PluginUninstallParams",
});

export type V2PluginUninstallResponse = { readonly [x: string]: Schema.Json };
export const V2PluginUninstallResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "PluginUninstallResponse" });

export type V2ProcessExitedNotification = {
  readonly exitCode: number;
  readonly processHandle: string;
  readonly stderr: string;
  readonly stderrCapReached: boolean;
  readonly stdout: string;
  readonly stdoutCapReached: boolean;
};
export const V2ProcessExitedNotification = Schema.Struct({
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
  title: "ProcessExitedNotification",
  description: "Final process exit notification for `process/spawn`.",
});

export type V2ProcessOutputDeltaNotification = {
  readonly capReached: boolean;
  readonly deltaBase64: string;
  readonly processHandle: string;
  readonly stream: V2ProcessOutputDeltaNotification__ProcessOutputStream;
};
export const V2ProcessOutputDeltaNotification = Schema.Struct({
  capReached: Schema.Boolean.annotate({
    description:
      "True on the final streamed chunk for this stream when output was truncated by `outputBytesCap`.",
  }),
  deltaBase64: Schema.String.annotate({ description: "Base64-encoded output bytes." }),
  processHandle: Schema.String.annotate({
    description: "Client-supplied, connection-scoped `processHandle` from `process/spawn`.",
  }),
  stream: Schema.suspend(
    (): Schema.Codec<V2ProcessOutputDeltaNotification__ProcessOutputStream> =>
      V2ProcessOutputDeltaNotification__ProcessOutputStream,
  ).annotate({ description: "Output stream this chunk belongs to." }),
}).annotate({
  title: "ProcessOutputDeltaNotification",
  description: "Base64-encoded output chunk emitted for a streaming `process/spawn` request.",
});

export type V2ProjectChangedNotification = {
  readonly changeType: V2ProjectChangedNotification__ProjectChangeType;
  readonly projectId: string;
};
export const V2ProjectChangedNotification = Schema.Struct({
  changeType: V2ProjectChangedNotification__ProjectChangeType,
  projectId: Schema.String,
}).annotate({ title: "ProjectChangedNotification" });

export type V2RawResponseCompletedNotification = {
  readonly responseId: string;
  readonly threadId: string;
  readonly turnId: string;
  readonly usage?: V2RawResponseCompletedNotification__TokenUsageBreakdown | null;
  readonly usageMetadata?: V2RawResponseCompletedNotification__ResponseUsageMetadata | null;
};
export const V2RawResponseCompletedNotification = Schema.Struct({
  responseId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
  usage: Schema.optionalKey(
    Schema.Union([V2RawResponseCompletedNotification__TokenUsageBreakdown, Schema.Null]),
  ),
  usageMetadata: Schema.optionalKey(
    Schema.Union([V2RawResponseCompletedNotification__ResponseUsageMetadata, Schema.Null]),
  ),
}).annotate({
  title: "RawResponseCompletedNotification",
  description:
    "Internal-only notification containing the exact usage from one upstream Responses API completion.",
});

export type V2RawResponseItemCompletedNotification = {
  readonly item: V2RawResponseItemCompletedNotification__ResponseItem;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2RawResponseItemCompletedNotification = Schema.Struct({
  item: V2RawResponseItemCompletedNotification__ResponseItem,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "RawResponseItemCompletedNotification" });

export type V2ReasoningSummaryPartAddedNotification = {
  readonly itemId: string;
  readonly summaryIndex: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2ReasoningSummaryPartAddedNotification = Schema.Struct({
  itemId: Schema.String,
  summaryIndex: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "ReasoningSummaryPartAddedNotification" });

export type V2ReasoningSummaryTextDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly summaryIndex: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2ReasoningSummaryTextDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  summaryIndex: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "ReasoningSummaryTextDeltaNotification" });

export type V2ReasoningTextDeltaNotification = {
  readonly contentIndex: number;
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2ReasoningTextDeltaNotification = Schema.Struct({
  contentIndex: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "ReasoningTextDeltaNotification" });

export type V2RemoteControlStatusChangedNotification = {
  readonly environmentId?: string | null;
  readonly installationId: string;
  readonly serverName: string;
  readonly status: V2RemoteControlStatusChangedNotification__RemoteControlConnectionStatus;
};
export const V2RemoteControlStatusChangedNotification = Schema.Struct({
  environmentId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  installationId: Schema.String,
  serverName: Schema.String,
  status: V2RemoteControlStatusChangedNotification__RemoteControlConnectionStatus,
}).annotate({
  title: "RemoteControlStatusChangedNotification",
  description: "Current remote-control connection status and remote identity exposed to clients.",
});

export type V2ReviewStartParams = {
  readonly delivery?: V2ReviewStartParams__ReviewDelivery | null;
  readonly target: V2ReviewStartParams__ReviewTarget;
  readonly threadId: string;
};
export const V2ReviewStartParams = Schema.Struct({
  delivery: Schema.optionalKey(
    Schema.Union([V2ReviewStartParams__ReviewDelivery, Schema.Null]).annotate({
      description:
        "Where to run the review: inline (default) on the current thread or detached on a new thread (returned in `reviewThreadId`). Detached delivery is deprecated and emits `deprecationNotice`. Use `thread/start` followed by an inline review for a separate review thread.",
    }),
  ),
  target: V2ReviewStartParams__ReviewTarget,
  threadId: Schema.String,
}).annotate({ title: "ReviewStartParams" });

export type V2ReviewStartResponse = {
  readonly reviewThreadId: string;
  readonly turn: V2ReviewStartResponse__Turn;
};
export const V2ReviewStartResponse = Schema.Struct({
  reviewThreadId: Schema.String.annotate({
    description:
      "Identifies the thread where the review runs.\n\nFor inline reviews, this is the original thread id. For detached reviews, this is the id of the new review thread.",
  }),
  turn: V2ReviewStartResponse__Turn,
}).annotate({ title: "ReviewStartResponse" });

export type V2SendAddCreditsNudgeEmailParams = {
  readonly creditType: V2SendAddCreditsNudgeEmailParams__AddCreditsNudgeCreditType;
};
export const V2SendAddCreditsNudgeEmailParams = Schema.Struct({
  creditType: V2SendAddCreditsNudgeEmailParams__AddCreditsNudgeCreditType,
}).annotate({ title: "SendAddCreditsNudgeEmailParams" });

export type V2SendAddCreditsNudgeEmailResponse = {
  readonly status: V2SendAddCreditsNudgeEmailResponse__AddCreditsNudgeEmailStatus;
};
export const V2SendAddCreditsNudgeEmailResponse = Schema.Struct({
  status: V2SendAddCreditsNudgeEmailResponse__AddCreditsNudgeEmailStatus,
}).annotate({ title: "SendAddCreditsNudgeEmailResponse" });

export type V2ServerRequestResolvedNotification = {
  readonly requestId: V2ServerRequestResolvedNotification__RequestId;
  readonly threadId: string;
};
export const V2ServerRequestResolvedNotification = Schema.Struct({
  requestId: V2ServerRequestResolvedNotification__RequestId,
  threadId: Schema.String,
}).annotate({ title: "ServerRequestResolvedNotification" });

export type V2SkillsChangedNotification = { readonly [x: string]: Schema.Json };
export const V2SkillsChangedNotification = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "SkillsChangedNotification",
  description:
    "Notification emitted when watched local skill files change.\n\nTreat this as an invalidation signal and re-run `skills/list` with the client's current parameters when refreshed skill metadata is needed.",
});

export type V2SkillsConfigWriteParams = {
  readonly enabled: boolean;
  readonly name?: string | null;
  readonly path?: V2SkillsConfigWriteParams__AbsolutePathBuf | null;
};
export const V2SkillsConfigWriteParams = Schema.Struct({
  enabled: Schema.Boolean,
  name: Schema.optionalKey(
    Schema.Union([Schema.String.annotate({ description: "Name-based selector." }), Schema.Null]),
  ),
  path: Schema.optionalKey(
    Schema.Union([V2SkillsConfigWriteParams__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Path-based selector.",
    }),
  ),
}).annotate({ title: "SkillsConfigWriteParams" });
