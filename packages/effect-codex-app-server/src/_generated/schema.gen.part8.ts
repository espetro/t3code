/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  V2ConfigReadResponse__AbsolutePathBuf,
  V2ConfigReadResponse__AppToolApproval,
  V2ConfigReadResponse__ApprovalsReviewer,
  V2ConfigRequirementsReadResponse__AllowDenyRequirement,
  V2ConfigRequirementsReadResponse__BrowserUseAccessApprovalLifetime,
  V2ConfigRequirementsReadResponse__ConfiguredHookHandler,
  V2ConfigRequirementsReadResponse__NetworkDomainPermission,
  V2ConfigRequirementsReadResponse__ReasoningEffort,
  V2ConfigWarningNotification__TextPosition,
  V2ConfigWriteResponse__AbsolutePathBuf,
  V2ErrorNotification__MisalignmentSteer,
  V2ErrorNotification__NonSteerableTurnKind,
  V2ExperimentalFeatureListResponse__ExperimentalFeatureStage,
  V2ExternalAgentConfigDetectResponse__CommandMigration,
  V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorSource,
  V2ExternalAgentConfigDetectResponse__HookMigration,
  V2ExternalAgentConfigDetectResponse__McpServerMigration,
  V2ExternalAgentConfigDetectResponse__PluginsMigration,
  V2ExternalAgentConfigDetectResponse__SessionMigration,
  V2ExternalAgentConfigDetectResponse__SkillMigration,
  V2ExternalAgentConfigDetectResponse__SubagentMigration,
} from "./schema.gen.part1.ts";
import {
  V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType,
  V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigMigrationItemType,
  V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorSource,
  V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType,
  V2ExternalAgentConfigImportParams__CommandMigration,
  V2ExternalAgentConfigImportParams__HookMigration,
  V2ExternalAgentConfigImportParams__McpServerMigration,
  V2ExternalAgentConfigImportParams__PluginsMigration,
  V2ExternalAgentConfigImportParams__SessionMigration,
  V2ExternalAgentConfigImportParams__SkillMigration,
  V2ExternalAgentConfigImportParams__SubagentMigration,
  V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType,
  V2FileChangePatchUpdatedNotification__PatchChangeKind,
  V2GetAccountRateLimitsResponse__CreditsSnapshot,
  V2GetAccountRateLimitsResponse__PlanType,
  V2GetAccountRateLimitsResponse__RateLimitReachedType,
  V2GetAccountRateLimitsResponse__RateLimitResetCreditStatus,
  V2GetAccountRateLimitsResponse__RateLimitResetType,
  V2GetAccountRateLimitsResponse__RateLimitWindow,
  V2GetAccountRateLimitsResponse__SpendControlLimitSnapshot,
  V2GetAccountResponse__PlanType,
  V2GetAccountTokenUsageResponse__ThreadUsageBreakdownGroup,
  V2GetWorkspaceMessagesResponse__WorkspaceMessageType,
  V2HookCompletedNotification__HookOutputEntryKind,
  V2HookStartedNotification__HookOutputEntryKind,
  V2HooksListResponse__AbsolutePathBuf,
  V2HooksListResponse__HookEventName,
  V2HooksListResponse__HookSource,
  V2HooksListResponse__HookTrustStatus,
  V2ItemCompletedNotification__ByteRange,
  V2ItemCompletedNotification__CollabAgentStatus,
  V2ItemCompletedNotification__ImageDetail,
  V2ItemCompletedNotification__LegacyAppPathString,
  V2ItemCompletedNotification__McpAppDisplayMode,
  V2ItemCompletedNotification__MemoryCitationEntry,
  V2ItemCompletedNotification__PatchChangeKind,
  V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewStatus,
  V2ItemGuardianApprovalReviewCompletedNotification__GuardianRiskLevel,
  V2ItemGuardianApprovalReviewCompletedNotification__GuardianUserAuthorization,
  V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
  V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewStatus,
  V2ItemGuardianApprovalReviewStartedNotification__GuardianRiskLevel,
  V2ItemGuardianApprovalReviewStartedNotification__GuardianUserAuthorization,
  V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
  V2ItemStartedNotification__ByteRange,
  V2ItemStartedNotification__CollabAgentStatus,
  V2ItemStartedNotification__ImageDetail,
  V2ItemStartedNotification__LegacyAppPathString,
  V2ItemStartedNotification__McpAppDisplayMode,
  V2ItemStartedNotification__MemoryCitationEntry,
  V2ItemStartedNotification__PatchChangeKind,
  V2ListMcpServerStatusResponse__McpAuthStatus,
  V2ListMcpServerStatusResponse__McpServerConnectionStatus,
  V2ListMcpServerStatusResponse__McpServerInfo,
  V2ListMcpServerStatusResponse__Resource,
  V2ListMcpServerStatusResponse__ResourceTemplate,
  V2ListMcpServerStatusResponse__Tool,
  V2ModelListResponse__CyberAccessProgram,
  V2ModelListResponse__ReasoningEffort,
  V2PluginInstalledResponse__AbsolutePathBuf,
  V2PluginInstalledResponse__PluginSharePrincipalRole,
  V2PluginInstalledResponse__PluginSharePrincipalType,
  V2PluginListResponse__AbsolutePathBuf,
  V2PluginListResponse__PluginSharePrincipalRole,
  V2PluginListResponse__PluginSharePrincipalType,
  V2PluginReadResponse__AbsolutePathBuf,
  V2PluginReadResponse__AppTemplateUnavailableReason,
  V2PluginReadResponse__HookEventName,
} from "./schema.gen.part2.ts";

export type V2ConfigReadResponse__ConfigLayerSource =
  | { readonly file: V2ConfigReadResponse__AbsolutePathBuf; readonly type: "packagedDefaults" }
  | { readonly domain: string; readonly key: string; readonly type: "mdm" }
  | { readonly file: V2ConfigReadResponse__AbsolutePathBuf; readonly type: "system" }
  | { readonly id: string; readonly name: string; readonly type: "enterpriseManaged" }
  | {
      readonly file: V2ConfigReadResponse__AbsolutePathBuf;
      readonly profile?: string | null;
      readonly type: "user";
    }
  | { readonly dotCodexFolder: V2ConfigReadResponse__AbsolutePathBuf; readonly type: "project" }
  | { readonly type: "sessionFlags" }
  | {
      readonly file: V2ConfigReadResponse__AbsolutePathBuf;
      readonly type: "legacyManagedConfigTomlFromFile";
    }
  | { readonly type: "legacyManagedConfigTomlFromMdm" };
export const V2ConfigReadResponse__ConfigLayerSource = Schema.Union(
  [
    Schema.Struct({
      file: Schema.suspend(
        (): Schema.Codec<V2ConfigReadResponse__AbsolutePathBuf> =>
          V2ConfigReadResponse__AbsolutePathBuf,
      ).annotate({ description: "Path to the packaged default configuration file." }),
      type: Schema.Literal("packagedDefaults").annotate({
        title: "PackagedDefaultsConfigLayerSourceType",
      }),
    }).annotate({
      title: "PackagedDefaultsConfigLayerSource",
      description: "Default configuration supplied with the installed Codex package.",
    }),
    Schema.Struct({
      domain: Schema.String,
      key: Schema.String,
      type: Schema.Literal("mdm").annotate({ title: "MdmConfigLayerSourceType" }),
    }).annotate({
      title: "MdmConfigLayerSource",
      description: "Managed preferences layer delivered by MDM (macOS only).",
    }),
    Schema.Struct({
      file: Schema.suspend(
        (): Schema.Codec<V2ConfigReadResponse__AbsolutePathBuf> =>
          V2ConfigReadResponse__AbsolutePathBuf,
      ).annotate({
        description:
          "This is the path to the system config.toml file, though it is not guaranteed to exist.",
      }),
      type: Schema.Literal("system").annotate({ title: "SystemConfigLayerSourceType" }),
    }).annotate({
      title: "SystemConfigLayerSource",
      description: "Managed config layer from a file (usually `managed_config.toml`).",
    }),
    Schema.Struct({
      id: Schema.String.annotate({ description: "Stable identifier for the delivered layer." }),
      name: Schema.String.annotate({
        description:
          "Admin-facing name for the delivered layer. This is surfaced in diagnostics so users know which cloud layer needs administrator attention.",
      }),
      type: Schema.Literal("enterpriseManaged").annotate({
        title: "EnterpriseManagedConfigLayerSourceType",
      }),
    }).annotate({
      title: "EnterpriseManagedConfigLayerSource",
      description: "Enterprise-managed config layer delivered by the cloud config bundle.",
    }),
    Schema.Struct({
      file: Schema.suspend(
        (): Schema.Codec<V2ConfigReadResponse__AbsolutePathBuf> =>
          V2ConfigReadResponse__AbsolutePathBuf,
      ).annotate({
        description:
          "This is the path to the user's config.toml file, though it is not guaranteed to exist.",
      }),
      profile: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Name of the selected profile-v2 config layered on top of the base user config, when this layer represents one.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("user").annotate({ title: "UserConfigLayerSourceType" }),
    }).annotate({
      title: "UserConfigLayerSource",
      description:
        "User config layer from $CODEX_HOME/config.toml. This layer is special in that it is expected to be: - writable by the user - generally outside the workspace directory",
    }),
    Schema.Struct({
      dotCodexFolder: V2ConfigReadResponse__AbsolutePathBuf,
      type: Schema.Literal("project").annotate({ title: "ProjectConfigLayerSourceType" }),
    }).annotate({
      title: "ProjectConfigLayerSource",
      description:
        "Path to a .codex/ folder within a project. There could be multiple of these between `cwd` and the project/repo root.",
    }),
    Schema.Struct({
      type: Schema.Literal("sessionFlags").annotate({ title: "SessionFlagsConfigLayerSourceType" }),
    }).annotate({
      title: "SessionFlagsConfigLayerSource",
      description: "Session-layer overrides supplied via `-c`/`--config`.",
    }),
    Schema.Struct({
      file: V2ConfigReadResponse__AbsolutePathBuf,
      type: Schema.Literal("legacyManagedConfigTomlFromFile").annotate({
        title: "LegacyManagedConfigTomlFromFileConfigLayerSourceType",
      }),
    }).annotate({
      title: "LegacyManagedConfigTomlFromFileConfigLayerSource",
      description:
        '`managed_config.toml` was designed to be a config that was loaded as the last layer on top of everything else. This scheme did not quite work out as intended, but we keep this variant as a "best effort" while we phase out `managed_config.toml` in favor of `requirements.toml`.',
    }),
    Schema.Struct({
      type: Schema.Literal("legacyManagedConfigTomlFromMdm").annotate({
        title: "LegacyManagedConfigTomlFromMdmConfigLayerSourceType",
      }),
    }).annotate({ title: "LegacyManagedConfigTomlFromMdmConfigLayerSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ConfigReadResponse__ConfigLayerSource" });

export type V2ConfigReadResponse__AppsDefaultConfig = {
  readonly approvals_reviewer?: V2ConfigReadResponse__ApprovalsReviewer | null;
  readonly default_tools_approval_mode?: V2ConfigReadResponse__AppToolApproval | null;
  readonly destructive_enabled?: boolean;
  readonly enabled?: boolean;
  readonly open_world_enabled?: boolean;
};
export const V2ConfigReadResponse__AppsDefaultConfig = Schema.Struct({
  approvals_reviewer: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__ApprovalsReviewer, Schema.Null]),
  ),
  default_tools_approval_mode: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AppToolApproval, Schema.Null]),
  ),
  destructive_enabled: Schema.optionalKey(Schema.Boolean.annotate({ default: true })),
  enabled: Schema.optionalKey(Schema.Boolean.annotate({ default: true })),
  open_world_enabled: Schema.optionalKey(Schema.Boolean.annotate({ default: true })),
}).annotate({ identifier: "V2ConfigReadResponse__AppsDefaultConfig" });

export type V2ConfigRequirementsReadResponse__ComputerUseMacosRequirements = {
  readonly bundleIds?: {
    readonly [x: string]: V2ConfigRequirementsReadResponse__AllowDenyRequirement;
  } | null;
};
export const V2ConfigRequirementsReadResponse__ComputerUseMacosRequirements = Schema.Struct({
  bundleIds: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, V2ConfigRequirementsReadResponse__AllowDenyRequirement),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__ComputerUseMacosRequirements" });

export type V2ConfigRequirementsReadResponse__ComputerUseWindowsExeRequirement = {
  readonly access: V2ConfigRequirementsReadResponse__AllowDenyRequirement;
  readonly binaryName?: string | null;
  readonly productName: string;
  readonly publisherName: string;
};
export const V2ConfigRequirementsReadResponse__ComputerUseWindowsExeRequirement = Schema.Struct({
  access: V2ConfigRequirementsReadResponse__AllowDenyRequirement,
  binaryName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  productName: Schema.String,
  publisherName: Schema.String,
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__ComputerUseWindowsExeRequirement" });

export type V2ConfigRequirementsReadResponse__BrowserUseOriginPolicy = {
  readonly access?: V2ConfigRequirementsReadResponse__AllowDenyRequirement | null;
  readonly accessApprovalLifetime?: V2ConfigRequirementsReadResponse__BrowserUseAccessApprovalLifetime | null;
  readonly autoReview?: V2ConfigRequirementsReadResponse__AllowDenyRequirement | null;
  readonly downloads?: V2ConfigRequirementsReadResponse__AllowDenyRequirement | null;
  readonly fullCdpAccess?: V2ConfigRequirementsReadResponse__AllowDenyRequirement | null;
  readonly persistentApproval?: boolean | null;
  readonly uploads?: V2ConfigRequirementsReadResponse__AllowDenyRequirement | null;
};
export const V2ConfigRequirementsReadResponse__BrowserUseOriginPolicy = Schema.Struct({
  access: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  accessApprovalLifetime: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__BrowserUseAccessApprovalLifetime, Schema.Null]),
  ),
  autoReview: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  downloads: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  fullCdpAccess: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  persistentApproval: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  uploads: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__BrowserUseOriginPolicy" });

export type V2ConfigRequirementsReadResponse__NewThreadModelDefaults = {
  readonly model?: string | null;
  readonly modelReasoningEffort?: V2ConfigRequirementsReadResponse__ReasoningEffort | null;
  readonly serviceTier?: string | null;
};
export const V2ConfigRequirementsReadResponse__NewThreadModelDefaults = Schema.Struct({
  model: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  modelReasoningEffort: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__ReasoningEffort, Schema.Null]),
  ),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__NewThreadModelDefaults" });

export type V2ConfigRequirementsReadResponse__ApplicationNetworkRequirements = {
  readonly domains: {
    readonly [x: string]: V2ConfigRequirementsReadResponse__NetworkDomainPermission;
  };
  readonly enabled: boolean;
};
export const V2ConfigRequirementsReadResponse__ApplicationNetworkRequirements = Schema.Struct({
  domains: Schema.Record(Schema.String, V2ConfigRequirementsReadResponse__NetworkDomainPermission),
  enabled: Schema.Boolean.annotate({
    description: "When enabled, only explicitly allowed exact domains may be contacted.",
  }),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__ApplicationNetworkRequirements" });

export type V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup = {
  readonly hooks: ReadonlyArray<V2ConfigRequirementsReadResponse__ConfiguredHookHandler>;
  readonly matcher?: string | null;
};
export const V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup = Schema.Struct({
  hooks: Schema.Array(V2ConfigRequirementsReadResponse__ConfiguredHookHandler),
  matcher: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__ConfiguredHookMatcherGroup" });

export type V2ConfigWarningNotification__TextRange = {
  readonly end: V2ConfigWarningNotification__TextPosition;
  readonly start: V2ConfigWarningNotification__TextPosition;
};
export const V2ConfigWarningNotification__TextRange = Schema.Struct({
  end: V2ConfigWarningNotification__TextPosition,
  start: V2ConfigWarningNotification__TextPosition,
}).annotate({ identifier: "V2ConfigWarningNotification__TextRange" });

export type V2ConfigWriteResponse__ConfigLayerSource =
  | { readonly file: V2ConfigWriteResponse__AbsolutePathBuf; readonly type: "packagedDefaults" }
  | { readonly domain: string; readonly key: string; readonly type: "mdm" }
  | { readonly file: V2ConfigWriteResponse__AbsolutePathBuf; readonly type: "system" }
  | { readonly id: string; readonly name: string; readonly type: "enterpriseManaged" }
  | {
      readonly file: V2ConfigWriteResponse__AbsolutePathBuf;
      readonly profile?: string | null;
      readonly type: "user";
    }
  | { readonly dotCodexFolder: V2ConfigWriteResponse__AbsolutePathBuf; readonly type: "project" }
  | { readonly type: "sessionFlags" }
  | {
      readonly file: V2ConfigWriteResponse__AbsolutePathBuf;
      readonly type: "legacyManagedConfigTomlFromFile";
    }
  | { readonly type: "legacyManagedConfigTomlFromMdm" };
export const V2ConfigWriteResponse__ConfigLayerSource = Schema.Union(
  [
    Schema.Struct({
      file: Schema.suspend(
        (): Schema.Codec<V2ConfigWriteResponse__AbsolutePathBuf> =>
          V2ConfigWriteResponse__AbsolutePathBuf,
      ).annotate({ description: "Path to the packaged default configuration file." }),
      type: Schema.Literal("packagedDefaults").annotate({
        title: "PackagedDefaultsConfigLayerSourceType",
      }),
    }).annotate({
      title: "PackagedDefaultsConfigLayerSource",
      description: "Default configuration supplied with the installed Codex package.",
    }),
    Schema.Struct({
      domain: Schema.String,
      key: Schema.String,
      type: Schema.Literal("mdm").annotate({ title: "MdmConfigLayerSourceType" }),
    }).annotate({
      title: "MdmConfigLayerSource",
      description: "Managed preferences layer delivered by MDM (macOS only).",
    }),
    Schema.Struct({
      file: Schema.suspend(
        (): Schema.Codec<V2ConfigWriteResponse__AbsolutePathBuf> =>
          V2ConfigWriteResponse__AbsolutePathBuf,
      ).annotate({
        description:
          "This is the path to the system config.toml file, though it is not guaranteed to exist.",
      }),
      type: Schema.Literal("system").annotate({ title: "SystemConfigLayerSourceType" }),
    }).annotate({
      title: "SystemConfigLayerSource",
      description: "Managed config layer from a file (usually `managed_config.toml`).",
    }),
    Schema.Struct({
      id: Schema.String.annotate({ description: "Stable identifier for the delivered layer." }),
      name: Schema.String.annotate({
        description:
          "Admin-facing name for the delivered layer. This is surfaced in diagnostics so users know which cloud layer needs administrator attention.",
      }),
      type: Schema.Literal("enterpriseManaged").annotate({
        title: "EnterpriseManagedConfigLayerSourceType",
      }),
    }).annotate({
      title: "EnterpriseManagedConfigLayerSource",
      description: "Enterprise-managed config layer delivered by the cloud config bundle.",
    }),
    Schema.Struct({
      file: Schema.suspend(
        (): Schema.Codec<V2ConfigWriteResponse__AbsolutePathBuf> =>
          V2ConfigWriteResponse__AbsolutePathBuf,
      ).annotate({
        description:
          "This is the path to the user's config.toml file, though it is not guaranteed to exist.",
      }),
      profile: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Name of the selected profile-v2 config layered on top of the base user config, when this layer represents one.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("user").annotate({ title: "UserConfigLayerSourceType" }),
    }).annotate({
      title: "UserConfigLayerSource",
      description:
        "User config layer from $CODEX_HOME/config.toml. This layer is special in that it is expected to be: - writable by the user - generally outside the workspace directory",
    }),
    Schema.Struct({
      dotCodexFolder: V2ConfigWriteResponse__AbsolutePathBuf,
      type: Schema.Literal("project").annotate({ title: "ProjectConfigLayerSourceType" }),
    }).annotate({
      title: "ProjectConfigLayerSource",
      description:
        "Path to a .codex/ folder within a project. There could be multiple of these between `cwd` and the project/repo root.",
    }),
    Schema.Struct({
      type: Schema.Literal("sessionFlags").annotate({ title: "SessionFlagsConfigLayerSourceType" }),
    }).annotate({
      title: "SessionFlagsConfigLayerSource",
      description: "Session-layer overrides supplied via `-c`/`--config`.",
    }),
    Schema.Struct({
      file: V2ConfigWriteResponse__AbsolutePathBuf,
      type: Schema.Literal("legacyManagedConfigTomlFromFile").annotate({
        title: "LegacyManagedConfigTomlFromFileConfigLayerSourceType",
      }),
    }).annotate({
      title: "LegacyManagedConfigTomlFromFileConfigLayerSource",
      description:
        '`managed_config.toml` was designed to be a config that was loaded as the last layer on top of everything else. This scheme did not quite work out as intended, but we keep this variant as a "best effort" while we phase out `managed_config.toml` in favor of `requirements.toml`.',
    }),
    Schema.Struct({
      type: Schema.Literal("legacyManagedConfigTomlFromMdm").annotate({
        title: "LegacyManagedConfigTomlFromMdmConfigLayerSourceType",
      }),
    }).annotate({ title: "LegacyManagedConfigTomlFromMdmConfigLayerSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ConfigWriteResponse__ConfigLayerSource" });

export type V2ErrorNotification__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ErrorNotification__NonSteerableTurnKind;
      };
    };
export const V2ErrorNotification__CodexErrorInfo = Schema.Union(
  [
    Schema.String,
    Schema.Struct({
      httpConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
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
      }),
    }).annotate({ title: "HttpConnectionFailedCodexErrorInfo" }),
    Schema.Struct({
      responseStreamConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
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
      }),
    }).annotate({
      title: "ResponseStreamConnectionFailedCodexErrorInfo",
      description: "Failed to connect to the response SSE stream.",
    }),
    Schema.Struct({
      responseStreamDisconnected: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
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
      }),
    }).annotate({
      title: "ResponseStreamDisconnectedCodexErrorInfo",
      description:
        "The response SSE stream disconnected in the middle of a turn before completion.",
    }),
    Schema.Struct({
      responseTooManyFailedAttempts: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
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
      }),
    }).annotate({
      title: "ResponseTooManyFailedAttemptsCodexErrorInfo",
      description: "Reached the retry limit for responses.",
    }),
    Schema.Struct({
      activeTurnNotSteerable: Schema.Struct({
        turnKind: V2ErrorNotification__NonSteerableTurnKind,
      }),
    }).annotate({
      title: "ActiveTurnNotSteerableCodexErrorInfo",
      description:
        "Returned when `turn/start` or `turn/steer` is submitted while the current active turn cannot accept same-turn steering, for example `/review` or manual `/compact`.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "This translation layer make sure that we expose codex error code in camel case.\n\nWhen an upstream HTTP status is available (for example, from the Responses API or a provider), it is forwarded in `httpStatusCode` on the relevant `codexErrorInfo` variant.",
  identifier: "V2ErrorNotification__CodexErrorInfo",
});

export type V2ErrorNotification__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ErrorNotification__MisalignmentSteer | null;
};
export const V2ErrorNotification__MisalignmentErrorDetails = Schema.Struct({
  detailedExplanation: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "A substantive localized explanation is required before offering continuation.",
      }),
      Schema.Null,
    ]),
  ),
  errorType: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Open-ended classification; clients must accept categories added by Responses.",
      }),
      Schema.Null,
    ]),
  ),
  steer: Schema.optionalKey(
    Schema.Union([V2ErrorNotification__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ErrorNotification__MisalignmentErrorDetails" });

export type V2ExperimentalFeatureListResponse__ExperimentalFeature = {
  readonly announcement?: string | null;
  readonly defaultEnabled: boolean;
  readonly description?: string | null;
  readonly displayName?: string | null;
  readonly enabled: boolean;
  readonly name: string;
  readonly stage: V2ExperimentalFeatureListResponse__ExperimentalFeatureStage;
};
export const V2ExperimentalFeatureListResponse__ExperimentalFeature = Schema.Struct({
  announcement: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Announcement copy shown to users when the feature is introduced. Null when this feature is not in beta.",
      }),
      Schema.Null,
    ]),
  ),
  defaultEnabled: Schema.Boolean.annotate({
    description: "Whether this feature is enabled by default.",
  }),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Short summary describing what the feature does. Null when this feature is not in beta.",
      }),
      Schema.Null,
    ]),
  ),
  displayName: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "User-facing display name shown in the experimental features UI. Null when this feature is not in beta.",
      }),
      Schema.Null,
    ]),
  ),
  enabled: Schema.Boolean.annotate({
    description: "Whether this feature is currently enabled in the loaded config.",
  }),
  name: Schema.String.annotate({
    description: "Stable key used in config.toml and CLI flag toggles.",
  }),
  stage: Schema.suspend(
    (): Schema.Codec<V2ExperimentalFeatureListResponse__ExperimentalFeatureStage> =>
      V2ExperimentalFeatureListResponse__ExperimentalFeatureStage,
  ).annotate({ description: "Lifecycle stage of this feature flag." }),
}).annotate({ identifier: "V2ExperimentalFeatureListResponse__ExperimentalFeature" });

export type V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorCandidate = {
  readonly name: string;
  readonly sessionCount: number;
  readonly source: V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorSource;
};
export const V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorCandidate =
  Schema.Struct({
    name: Schema.String,
    sessionCount: Schema.Number.annotate({ format: "uint32" })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
    source: V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorSource,
  }).annotate({
    identifier: "V2ExternalAgentConfigDetectResponse__ExternalAgentDetectedConnectorCandidate",
  });

export type V2ExternalAgentConfigDetectResponse__MigrationDetails = {
  readonly commands?: ReadonlyArray<V2ExternalAgentConfigDetectResponse__CommandMigration>;
  readonly hooks?: ReadonlyArray<V2ExternalAgentConfigDetectResponse__HookMigration>;
  readonly mcpServers?: ReadonlyArray<V2ExternalAgentConfigDetectResponse__McpServerMigration>;
  readonly memory?: ReadonlyArray<string>;
  readonly plugins?: ReadonlyArray<V2ExternalAgentConfigDetectResponse__PluginsMigration>;
  readonly sessions?: ReadonlyArray<V2ExternalAgentConfigDetectResponse__SessionMigration>;
  readonly skills?: ReadonlyArray<V2ExternalAgentConfigDetectResponse__SkillMigration>;
  readonly subagents?: ReadonlyArray<V2ExternalAgentConfigDetectResponse__SubagentMigration>;
};
export const V2ExternalAgentConfigDetectResponse__MigrationDetails = Schema.Struct({
  commands: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigDetectResponse__CommandMigration).annotate({ default: [] }),
  ),
  hooks: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigDetectResponse__HookMigration).annotate({ default: [] }),
  ),
  mcpServers: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigDetectResponse__McpServerMigration).annotate({ default: [] }),
  ),
  memory: Schema.optionalKey(Schema.Array(Schema.String)),
  plugins: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigDetectResponse__PluginsMigration).annotate({ default: [] }),
  ),
  sessions: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigDetectResponse__SessionMigration).annotate({ default: [] }),
  ),
  skills: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigDetectResponse__SkillMigration).annotate({ default: [] }),
  ),
  subagents: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigDetectResponse__SubagentMigration).annotate({ default: [] }),
  ),
}).annotate({ identifier: "V2ExternalAgentConfigDetectResponse__MigrationDetails" });

export type V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeFailure =
  {
    readonly cwd?: string | null;
    readonly errorType?: string | null;
    readonly failureStage: string;
    readonly itemType: V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType;
    readonly message: string;
    readonly source?: string | null;
    readonly subErrorType?: string | null;
  };
export const V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeFailure =
  Schema.Struct({
    cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    errorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    failureStage: Schema.String,
    itemType:
      V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType,
    message: Schema.String,
    source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    subErrorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeFailure",
  });

export type V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeSuccess =
  {
    readonly cwd?: string | null;
    readonly itemType: V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType;
    readonly source?: string | null;
    readonly target?: string | null;
    readonly title?: string | null;
  };
export const V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeSuccess =
  Schema.Struct({
    cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    itemType:
      V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType,
    source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    target: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Original title for an imported session; null for other item types.",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeSuccess",
  });

export type V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorCandidate =
  {
    readonly name: string;
    readonly sessionCount: number;
    readonly source: V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorSource;
  };
export const V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorCandidate =
  Schema.Struct({
    name: Schema.String,
    sessionCount: Schema.Number.annotate({ format: "uint32" })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
    source: V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorSource,
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentImportedConnectorCandidate",
  });

export type V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeFailure =
  {
    readonly cwd?: string | null;
    readonly errorType?: string | null;
    readonly failureStage: string;
    readonly itemType: V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigMigrationItemType;
    readonly message: string;
    readonly source?: string | null;
    readonly subErrorType?: string | null;
  };
export const V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeFailure =
  Schema.Struct({
    cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    errorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    failureStage: Schema.String,
    itemType:
      V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigMigrationItemType,
    message: Schema.String,
    source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    subErrorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeFailure",
  });

export type V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeSuccess =
  {
    readonly cwd?: string | null;
    readonly itemType: V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigMigrationItemType;
    readonly source?: string | null;
    readonly target?: string | null;
    readonly title?: string | null;
  };
export const V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeSuccess =
  Schema.Struct({
    cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    itemType:
      V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigMigrationItemType,
    source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    target: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Original title for an imported session; null for other item types.",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeSuccess",
  });

export type V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportItemTypeFailure =
  {
    readonly cwd?: string | null;
    readonly errorType?: string | null;
    readonly failureStage: string;
    readonly itemType: V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType;
    readonly message: string;
    readonly source?: string | null;
    readonly subErrorType?: string | null;
  };
export const V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportItemTypeFailure =
  Schema.Struct({
    cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    errorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    failureStage: Schema.String,
    itemType: V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType,
    message: Schema.String,
    source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    subErrorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportItemTypeFailure",
  });

export type V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordSuccessParams =
  {
    readonly cwd?: string | null;
    readonly itemType: V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType;
    readonly source?: string | null;
    readonly target?: string | null;
    readonly title?: string | null;
  };
export const V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordSuccessParams =
  Schema.Struct({
    cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    itemType: V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType,
    source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    target: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Original title for an imported session, when available.",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordSuccessParams",
  });

export type V2ExternalAgentConfigImportParams__MigrationDetails = {
  readonly commands?: ReadonlyArray<V2ExternalAgentConfigImportParams__CommandMigration>;
  readonly hooks?: ReadonlyArray<V2ExternalAgentConfigImportParams__HookMigration>;
  readonly mcpServers?: ReadonlyArray<V2ExternalAgentConfigImportParams__McpServerMigration>;
  readonly memory?: ReadonlyArray<string>;
  readonly plugins?: ReadonlyArray<V2ExternalAgentConfigImportParams__PluginsMigration>;
  readonly sessions?: ReadonlyArray<V2ExternalAgentConfigImportParams__SessionMigration>;
  readonly skills?: ReadonlyArray<V2ExternalAgentConfigImportParams__SkillMigration>;
  readonly subagents?: ReadonlyArray<V2ExternalAgentConfigImportParams__SubagentMigration>;
};
export const V2ExternalAgentConfigImportParams__MigrationDetails = Schema.Struct({
  commands: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigImportParams__CommandMigration).annotate({ default: [] }),
  ),
  hooks: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigImportParams__HookMigration).annotate({ default: [] }),
  ),
  mcpServers: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigImportParams__McpServerMigration).annotate({ default: [] }),
  ),
  memory: Schema.optionalKey(Schema.Array(Schema.String)),
  plugins: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigImportParams__PluginsMigration).annotate({ default: [] }),
  ),
  sessions: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigImportParams__SessionMigration).annotate({ default: [] }),
  ),
  skills: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigImportParams__SkillMigration).annotate({ default: [] }),
  ),
  subagents: Schema.optionalKey(
    Schema.Array(V2ExternalAgentConfigImportParams__SubagentMigration).annotate({ default: [] }),
  ),
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__MigrationDetails" });

export type V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeFailure =
  {
    readonly cwd?: string | null;
    readonly errorType?: string | null;
    readonly failureStage: string;
    readonly itemType: V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType;
    readonly message: string;
    readonly source?: string | null;
    readonly subErrorType?: string | null;
  };
export const V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeFailure =
  Schema.Struct({
    cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    errorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    failureStage: Schema.String,
    itemType: V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType,
    message: Schema.String,
    source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    subErrorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeFailure",
  });

export type V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeSuccess =
  {
    readonly cwd?: string | null;
    readonly itemType: V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType;
    readonly source?: string | null;
    readonly target?: string | null;
    readonly title?: string | null;
  };
export const V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeSuccess =
  Schema.Struct({
    cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    itemType: V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType,
    source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    target: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Original title for an imported session; null for other item types.",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeSuccess",
  });

export type V2FileChangePatchUpdatedNotification__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2FileChangePatchUpdatedNotification__PatchChangeKind;
  readonly path: string;
};
export const V2FileChangePatchUpdatedNotification__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2FileChangePatchUpdatedNotification__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2FileChangePatchUpdatedNotification__FileUpdateChange" });

export type V2GetAccountRateLimitsResponse__RateLimitResetCredit = {
  readonly description?: string | null;
  readonly expiresAt?: number | null;
  readonly grantedAt: number;
  readonly id: string;
  readonly resetType: V2GetAccountRateLimitsResponse__RateLimitResetType;
  readonly status: V2GetAccountRateLimitsResponse__RateLimitResetCreditStatus;
  readonly title?: string | null;
};
export const V2GetAccountRateLimitsResponse__RateLimitResetCredit = Schema.Struct({
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Backend-provided display description for this credit, or `null` when unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  expiresAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Unix timestamp in seconds when the credit expires, or `null` if it does not expire.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  grantedAt: Schema.Number.annotate({
    description: "Unix timestamp in seconds when the credit was granted.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  id: Schema.String.annotate({ description: "Opaque backend identifier for this reset credit." }),
  resetType: V2GetAccountRateLimitsResponse__RateLimitResetType,
  status: V2GetAccountRateLimitsResponse__RateLimitResetCreditStatus,
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Backend-provided display title for this credit, or `null` when unavailable.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2GetAccountRateLimitsResponse__RateLimitResetCredit" });

export type V2GetAccountRateLimitsResponse__RateLimitSnapshot = {
  readonly credits?: V2GetAccountRateLimitsResponse__CreditsSnapshot | null;
  readonly individualLimit?: V2GetAccountRateLimitsResponse__SpendControlLimitSnapshot | null;
  readonly limitId?: string | null;
  readonly limitName?: string | null;
  readonly normalModelSlug?: string | null;
  readonly planType?: V2GetAccountRateLimitsResponse__PlanType | null;
  readonly primary?: V2GetAccountRateLimitsResponse__RateLimitWindow | null;
  readonly rateLimitReachedType?: V2GetAccountRateLimitsResponse__RateLimitReachedType | null;
  readonly secondary?: V2GetAccountRateLimitsResponse__RateLimitWindow | null;
  readonly spendControlReached?: boolean | null;
};
export const V2GetAccountRateLimitsResponse__RateLimitSnapshot = Schema.Struct({
  credits: Schema.optionalKey(
    Schema.Union([V2GetAccountRateLimitsResponse__CreditsSnapshot, Schema.Null]),
  ),
  individualLimit: Schema.optionalKey(
    Schema.Union([V2GetAccountRateLimitsResponse__SpendControlLimitSnapshot, Schema.Null]),
  ),
  limitId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  limitName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  normalModelSlug: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Normal model whose display name and reasoning options describe this quota alias.",
      }),
      Schema.Null,
    ]),
  ),
  planType: Schema.optionalKey(
    Schema.Union([V2GetAccountRateLimitsResponse__PlanType, Schema.Null]),
  ),
  primary: Schema.optionalKey(
    Schema.Union([V2GetAccountRateLimitsResponse__RateLimitWindow, Schema.Null]),
  ),
  rateLimitReachedType: Schema.optionalKey(
    Schema.Union([V2GetAccountRateLimitsResponse__RateLimitReachedType, Schema.Null]),
  ),
  secondary: Schema.optionalKey(
    Schema.Union([V2GetAccountRateLimitsResponse__RateLimitWindow, Schema.Null]),
  ),
  spendControlReached: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description:
          "Backend-reported spend-control state. `None` is unavailable, not a sparse-update recovery.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2GetAccountRateLimitsResponse__RateLimitSnapshot" });

export type V2GetAccountResponse__Account =
  | { readonly type: "apiKey" }
  | {
      readonly email: string | null;
      readonly planType: V2GetAccountResponse__PlanType;
      readonly type: "chatgpt";
    }
  | { readonly type: "amazonBedrock"; readonly usesCodexManagedCredentials?: boolean };
export const V2GetAccountResponse__Account = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("apiKey").annotate({ title: "ApiKeyAccountType" }),
    }).annotate({ title: "ApiKeyAccount" }),
    Schema.Struct({
      email: Schema.Union([Schema.String, Schema.Null]),
      planType: V2GetAccountResponse__PlanType,
      type: Schema.Literal("chatgpt").annotate({ title: "ChatgptAccountType" }),
    }).annotate({ title: "ChatgptAccount" }),
    Schema.Struct({
      type: Schema.Literal("amazonBedrock").annotate({ title: "AmazonBedrockAccountType" }),
      usesCodexManagedCredentials: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
    }).annotate({ title: "AmazonBedrockAccount" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2GetAccountResponse__Account" });

export type V2GetAccountTokenUsageResponse__ThreadUsage = {
  readonly estimatedUsageCreditsMicros: number;
  readonly estimatedUsageUsdMicros?: number | null;
  readonly groups: ReadonlyArray<V2GetAccountTokenUsageResponse__ThreadUsageBreakdownGroup>;
  readonly threadId: string;
};
export const V2GetAccountTokenUsageResponse__ThreadUsage = Schema.Struct({
  estimatedUsageCreditsMicros: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  estimatedUsageUsdMicros: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  groups: Schema.Array(V2GetAccountTokenUsageResponse__ThreadUsageBreakdownGroup),
  threadId: Schema.String,
}).annotate({ identifier: "V2GetAccountTokenUsageResponse__ThreadUsage" });

export type V2GetWorkspaceMessagesResponse__WorkspaceMessage = {
  readonly archivedAt?: number | null;
  readonly createdAt?: number | null;
  readonly messageBody: string;
  readonly messageId: string;
  readonly messageType: V2GetWorkspaceMessagesResponse__WorkspaceMessageType;
};
export const V2GetWorkspaceMessagesResponse__WorkspaceMessage = Schema.Struct({
  archivedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the message was archived.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  createdAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the message was created.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  messageBody: Schema.String,
  messageId: Schema.String,
  messageType: V2GetWorkspaceMessagesResponse__WorkspaceMessageType,
}).annotate({ identifier: "V2GetWorkspaceMessagesResponse__WorkspaceMessage" });

export type V2HookCompletedNotification__HookOutputEntry = {
  readonly kind: V2HookCompletedNotification__HookOutputEntryKind;
  readonly text: string;
};
export const V2HookCompletedNotification__HookOutputEntry = Schema.Struct({
  kind: V2HookCompletedNotification__HookOutputEntryKind,
  text: Schema.String,
}).annotate({ identifier: "V2HookCompletedNotification__HookOutputEntry" });

export type V2HooksListResponse__HookMetadata =
  | {
      readonly additionalContextLimit?: number | null;
      readonly currentHash: string;
      readonly displayOrder: number;
      readonly enabled: boolean;
      readonly eventName: V2HooksListResponse__HookEventName;
      readonly isManaged: boolean;
      readonly key: string;
      readonly matcher?: string | null;
      readonly pluginId?: string | null;
      readonly source: V2HooksListResponse__HookSource;
      readonly sourcePath: V2HooksListResponse__AbsolutePathBuf;
      readonly statusMessage?: string | null;
      readonly timeoutSec: number;
      readonly trustStatus: V2HooksListResponse__HookTrustStatus;
      readonly async?: boolean;
      readonly command: string;
      readonly handlerType: "command";
    }
  | {
      readonly additionalContextLimit?: number | null;
      readonly currentHash: string;
      readonly displayOrder: number;
      readonly enabled: boolean;
      readonly eventName: V2HooksListResponse__HookEventName;
      readonly isManaged: boolean;
      readonly key: string;
      readonly matcher?: string | null;
      readonly pluginId?: string | null;
      readonly source: V2HooksListResponse__HookSource;
      readonly sourcePath: V2HooksListResponse__AbsolutePathBuf;
      readonly statusMessage?: string | null;
      readonly timeoutSec: number;
      readonly trustStatus: V2HooksListResponse__HookTrustStatus;
      readonly handlerType: "mcpTool";
      readonly server: string;
      readonly tool: string;
    }
  | {
      readonly additionalContextLimit?: number | null;
      readonly currentHash: string;
      readonly displayOrder: number;
      readonly enabled: boolean;
      readonly eventName: V2HooksListResponse__HookEventName;
      readonly isManaged: boolean;
      readonly key: string;
      readonly matcher?: string | null;
      readonly pluginId?: string | null;
      readonly source: V2HooksListResponse__HookSource;
      readonly sourcePath: V2HooksListResponse__AbsolutePathBuf;
      readonly statusMessage?: string | null;
      readonly timeoutSec: number;
      readonly trustStatus: V2HooksListResponse__HookTrustStatus;
      readonly handlerType: "prompt";
    }
  | {
      readonly additionalContextLimit?: number | null;
      readonly currentHash: string;
      readonly displayOrder: number;
      readonly enabled: boolean;
      readonly eventName: V2HooksListResponse__HookEventName;
      readonly isManaged: boolean;
      readonly key: string;
      readonly matcher?: string | null;
      readonly pluginId?: string | null;
      readonly source: V2HooksListResponse__HookSource;
      readonly sourcePath: V2HooksListResponse__AbsolutePathBuf;
      readonly statusMessage?: string | null;
      readonly timeoutSec: number;
      readonly trustStatus: V2HooksListResponse__HookTrustStatus;
      readonly handlerType: "agent";
    };
export const V2HooksListResponse__HookMetadata = Schema.Union(
  [
    Schema.Struct({
      additionalContextLimit: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Configured `additionalContext` spill threshold. `null` uses 2,500 tokens; `0` disables spilling.",
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
      currentHash: Schema.String,
      displayOrder: Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      enabled: Schema.Boolean,
      eventName: V2HooksListResponse__HookEventName,
      isManaged: Schema.Boolean,
      key: Schema.String,
      matcher: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      source: V2HooksListResponse__HookSource,
      sourcePath: V2HooksListResponse__AbsolutePathBuf,
      statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      timeoutSec: Schema.Number.annotate({ format: "uint64" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      trustStatus: V2HooksListResponse__HookTrustStatus,
      async: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      command: Schema.String,
      handlerType: Schema.Literal("command"),
    }),
    Schema.Struct({
      additionalContextLimit: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Configured `additionalContext` spill threshold. `null` uses 2,500 tokens; `0` disables spilling.",
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
      currentHash: Schema.String,
      displayOrder: Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      enabled: Schema.Boolean,
      eventName: V2HooksListResponse__HookEventName,
      isManaged: Schema.Boolean,
      key: Schema.String,
      matcher: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      source: V2HooksListResponse__HookSource,
      sourcePath: V2HooksListResponse__AbsolutePathBuf,
      statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      timeoutSec: Schema.Number.annotate({ format: "uint64" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      trustStatus: V2HooksListResponse__HookTrustStatus,
      handlerType: Schema.Literal("mcpTool"),
      server: Schema.String,
      tool: Schema.String,
    }),
    Schema.Struct({
      additionalContextLimit: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Configured `additionalContext` spill threshold. `null` uses 2,500 tokens; `0` disables spilling.",
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
      currentHash: Schema.String,
      displayOrder: Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      enabled: Schema.Boolean,
      eventName: V2HooksListResponse__HookEventName,
      isManaged: Schema.Boolean,
      key: Schema.String,
      matcher: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      source: V2HooksListResponse__HookSource,
      sourcePath: V2HooksListResponse__AbsolutePathBuf,
      statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      timeoutSec: Schema.Number.annotate({ format: "uint64" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      trustStatus: V2HooksListResponse__HookTrustStatus,
      handlerType: Schema.Literal("prompt"),
    }).annotate({ title: "PromptHookMetadata" }),
    Schema.Struct({
      additionalContextLimit: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Configured `additionalContext` spill threshold. `null` uses 2,500 tokens; `0` disables spilling.",
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
      currentHash: Schema.String,
      displayOrder: Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      enabled: Schema.Boolean,
      eventName: V2HooksListResponse__HookEventName,
      isManaged: Schema.Boolean,
      key: Schema.String,
      matcher: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      source: V2HooksListResponse__HookSource,
      sourcePath: V2HooksListResponse__AbsolutePathBuf,
      statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      timeoutSec: Schema.Number.annotate({ format: "uint64" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      trustStatus: V2HooksListResponse__HookTrustStatus,
      handlerType: Schema.Literal("agent"),
    }).annotate({ title: "AgentHookMetadata" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2HooksListResponse__HookMetadata" });

export type V2HookStartedNotification__HookOutputEntry = {
  readonly kind: V2HookStartedNotification__HookOutputEntryKind;
  readonly text: string;
};
export const V2HookStartedNotification__HookOutputEntry = Schema.Struct({
  kind: V2HookStartedNotification__HookOutputEntryKind,
  text: Schema.String,
}).annotate({ identifier: "V2HookStartedNotification__HookOutputEntry" });

export type V2ItemCompletedNotification__TextElement = {
  readonly byteRange: V2ItemCompletedNotification__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ItemCompletedNotification__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ItemCompletedNotification__ByteRange> =>
      V2ItemCompletedNotification__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ItemCompletedNotification__TextElement" });

export type V2ItemCompletedNotification__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ItemCompletedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ItemCompletedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ItemCompletedNotification__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ItemCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ItemCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdFunctionCallOutputContentItem" }),
    ]).annotate({ title: "InputImageFunctionCallOutputContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({
        title: "InputAudioFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioFunctionCallOutputContentItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "EncryptedContentFunctionCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Responses API compatible content items that can be returned by a tool call. This is a subset of ContentItem with the types we support as function call outputs.",
  identifier: "V2ItemCompletedNotification__FunctionCallOutputContentItem",
});

export type V2ItemCompletedNotification__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ItemCompletedNotification__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ItemCompletedNotification__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ItemCompletedNotification__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ItemCompletedNotification__MemoryCitation" });

export type V2ItemCompletedNotification__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ItemCompletedNotification__LegacyAppPathString;
      readonly type: "read";
    }
  | { readonly command: string; readonly path?: string | null; readonly type: "listFiles" }
  | {
      readonly command: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly command: string; readonly type: "unknown" };
export const V2ItemCompletedNotification__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ItemCompletedNotification__LegacyAppPathString,
      type: Schema.Literal("read").annotate({ title: "ReadCommandActionType" }),
    }).annotate({ title: "ReadCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("listFiles").annotate({ title: "ListFilesCommandActionType" }),
    }).annotate({ title: "ListFilesCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchCommandActionType" }),
    }).annotate({ title: "SearchCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownCommandActionType" }),
    }).annotate({ title: "UnknownCommandAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemCompletedNotification__CommandAction" });

export type V2ItemCompletedNotification__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ItemCompletedNotification__PatchChangeKind;
  readonly path: string;
};
export const V2ItemCompletedNotification__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ItemCompletedNotification__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ItemCompletedNotification__FileUpdateChange" });

export type V2ItemCompletedNotification__McpAppUi = {
  readonly preferredModelDisplayMode: V2ItemCompletedNotification__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ItemCompletedNotification__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ItemCompletedNotification__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ItemCompletedNotification__McpAppUi",
});

export type V2ItemCompletedNotification__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ItemCompletedNotification__CollabAgentStatus;
};
export const V2ItemCompletedNotification__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ItemCompletedNotification__CollabAgentStatus,
}).annotate({ identifier: "V2ItemCompletedNotification__CollabAgentState" });

export type V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSpecialPath =
  | { readonly kind: "root" }
  | { readonly kind: "minimal" }
  | {
      readonly kind: "project_roots";
      readonly subpath?: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString | null;
    }
  | { readonly kind: "tmpdir" }
  | { readonly kind: "slash_tmp" }
  | {
      readonly kind: "unknown";
      readonly path: string;
      readonly subpath?: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString | null;
    };
export const V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSpecialPath =
  Schema.Union(
    [
      Schema.Struct({ kind: Schema.Literal("root") }).annotate({
        title: "RootFileSystemSpecialPath",
      }),
      Schema.Struct({ kind: Schema.Literal("minimal") }).annotate({
        title: "MinimalFileSystemSpecialPath",
      }),
      Schema.Struct({
        kind: Schema.Literal("project_roots"),
        subpath: Schema.optionalKey(
          Schema.Union([
            V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
            Schema.Null,
          ]),
        ),
      }).annotate({ title: "KindFileSystemSpecialPath" }),
      Schema.Struct({ kind: Schema.Literal("tmpdir") }).annotate({
        title: "TmpdirFileSystemSpecialPath",
      }),
      Schema.Struct({ kind: Schema.Literal("slash_tmp") }).annotate({
        title: "SlashTmpFileSystemSpecialPath",
      }),
      Schema.Struct({
        kind: Schema.Literal("unknown"),
        path: Schema.String,
        subpath: Schema.optionalKey(
          Schema.Union([
            V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
            Schema.Null,
          ]),
        ),
      }),
    ],
    { mode: "oneOf" },
  ).annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSpecialPath",
  });

export type V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReview = {
  readonly rationale?: string | null;
  readonly riskLevel?: V2ItemGuardianApprovalReviewCompletedNotification__GuardianRiskLevel | null;
  readonly status: V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewStatus;
  readonly userAuthorization?: V2ItemGuardianApprovalReviewCompletedNotification__GuardianUserAuthorization | null;
};
export const V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReview =
  Schema.Struct({
    rationale: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    riskLevel: Schema.optionalKey(
      Schema.Union([
        V2ItemGuardianApprovalReviewCompletedNotification__GuardianRiskLevel,
        Schema.Null,
      ]),
    ),
    status: V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewStatus,
    userAuthorization: Schema.optionalKey(
      Schema.Union([
        V2ItemGuardianApprovalReviewCompletedNotification__GuardianUserAuthorization,
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "[UNSTABLE] Temporary approval auto-review payload used by `item/autoApprovalReview/*` notifications. This shape is expected to change soon.",
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReview",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__FileSystemSpecialPath =
  | { readonly kind: "root" }
  | { readonly kind: "minimal" }
  | {
      readonly kind: "project_roots";
      readonly subpath?: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString | null;
    }
  | { readonly kind: "tmpdir" }
  | { readonly kind: "slash_tmp" }
  | {
      readonly kind: "unknown";
      readonly path: string;
      readonly subpath?: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString | null;
    };
export const V2ItemGuardianApprovalReviewStartedNotification__FileSystemSpecialPath = Schema.Union(
  [
    Schema.Struct({ kind: Schema.Literal("root") }).annotate({
      title: "RootFileSystemSpecialPath",
    }),
    Schema.Struct({ kind: Schema.Literal("minimal") }).annotate({
      title: "MinimalFileSystemSpecialPath",
    }),
    Schema.Struct({
      kind: Schema.Literal("project_roots"),
      subpath: Schema.optionalKey(
        Schema.Union([
          V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
          Schema.Null,
        ]),
      ),
    }).annotate({ title: "KindFileSystemSpecialPath" }),
    Schema.Struct({ kind: Schema.Literal("tmpdir") }).annotate({
      title: "TmpdirFileSystemSpecialPath",
    }),
    Schema.Struct({ kind: Schema.Literal("slash_tmp") }).annotate({
      title: "SlashTmpFileSystemSpecialPath",
    }),
    Schema.Struct({
      kind: Schema.Literal("unknown"),
      path: Schema.String,
      subpath: Schema.optionalKey(
        Schema.Union([
          V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
          Schema.Null,
        ]),
      ),
    }),
  ],
  { mode: "oneOf" },
).annotate({
  identifier: "V2ItemGuardianApprovalReviewStartedNotification__FileSystemSpecialPath",
});

export type V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReview = {
  readonly rationale?: string | null;
  readonly riskLevel?: V2ItemGuardianApprovalReviewStartedNotification__GuardianRiskLevel | null;
  readonly status: V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewStatus;
  readonly userAuthorization?: V2ItemGuardianApprovalReviewStartedNotification__GuardianUserAuthorization | null;
};
export const V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReview =
  Schema.Struct({
    rationale: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    riskLevel: Schema.optionalKey(
      Schema.Union([
        V2ItemGuardianApprovalReviewStartedNotification__GuardianRiskLevel,
        Schema.Null,
      ]),
    ),
    status: V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewStatus,
    userAuthorization: Schema.optionalKey(
      Schema.Union([
        V2ItemGuardianApprovalReviewStartedNotification__GuardianUserAuthorization,
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "[UNSTABLE] Temporary approval auto-review payload used by `item/autoApprovalReview/*` notifications. This shape is expected to change soon.",
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReview",
  });

export type V2ItemStartedNotification__TextElement = {
  readonly byteRange: V2ItemStartedNotification__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ItemStartedNotification__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ItemStartedNotification__ByteRange> => V2ItemStartedNotification__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ItemStartedNotification__TextElement" });

export type V2ItemStartedNotification__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ItemStartedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ItemStartedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ItemStartedNotification__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ItemStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ItemStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdFunctionCallOutputContentItem" }),
    ]).annotate({ title: "InputImageFunctionCallOutputContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({
        title: "InputAudioFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioFunctionCallOutputContentItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "EncryptedContentFunctionCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Responses API compatible content items that can be returned by a tool call. This is a subset of ContentItem with the types we support as function call outputs.",
  identifier: "V2ItemStartedNotification__FunctionCallOutputContentItem",
});

export type V2ItemStartedNotification__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ItemStartedNotification__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ItemStartedNotification__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ItemStartedNotification__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ItemStartedNotification__MemoryCitation" });

export type V2ItemStartedNotification__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ItemStartedNotification__LegacyAppPathString;
      readonly type: "read";
    }
  | { readonly command: string; readonly path?: string | null; readonly type: "listFiles" }
  | {
      readonly command: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly command: string; readonly type: "unknown" };
export const V2ItemStartedNotification__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ItemStartedNotification__LegacyAppPathString,
      type: Schema.Literal("read").annotate({ title: "ReadCommandActionType" }),
    }).annotate({ title: "ReadCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("listFiles").annotate({ title: "ListFilesCommandActionType" }),
    }).annotate({ title: "ListFilesCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchCommandActionType" }),
    }).annotate({ title: "SearchCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownCommandActionType" }),
    }).annotate({ title: "UnknownCommandAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemStartedNotification__CommandAction" });

export type V2ItemStartedNotification__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ItemStartedNotification__PatchChangeKind;
  readonly path: string;
};
export const V2ItemStartedNotification__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ItemStartedNotification__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ItemStartedNotification__FileUpdateChange" });

export type V2ItemStartedNotification__McpAppUi = {
  readonly preferredModelDisplayMode: V2ItemStartedNotification__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ItemStartedNotification__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ItemStartedNotification__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ItemStartedNotification__McpAppUi",
});

export type V2ItemStartedNotification__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ItemStartedNotification__CollabAgentStatus;
};
export const V2ItemStartedNotification__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ItemStartedNotification__CollabAgentStatus,
}).annotate({ identifier: "V2ItemStartedNotification__CollabAgentState" });

export type V2ListMcpServerStatusResponse__McpServerStatus = {
  readonly authStatus: V2ListMcpServerStatusResponse__McpAuthStatus;
  readonly httpOrigin?: string | null;
  readonly name: string;
  readonly pluginId?: string | null;
  readonly resourceTemplates: ReadonlyArray<V2ListMcpServerStatusResponse__ResourceTemplate>;
  readonly resources: ReadonlyArray<V2ListMcpServerStatusResponse__Resource>;
  readonly runtimeStatus?: V2ListMcpServerStatusResponse__McpServerConnectionStatus | null;
  readonly serverCapabilities?: Schema.Json;
  readonly serverInfo?: V2ListMcpServerStatusResponse__McpServerInfo | null;
  readonly tools: { readonly [x: string]: V2ListMcpServerStatusResponse__Tool };
  readonly toolsError?: string | null;
};
export const V2ListMcpServerStatusResponse__McpServerStatus = Schema.Struct({
  authStatus: V2ListMcpServerStatusResponse__McpAuthStatus,
  httpOrigin: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "HTTP origin of the effective configured endpoint, including plugin servers. Excludes credentials, path, query, and fragment; null for non-HTTP transports.",
      }),
      Schema.Null,
    ]),
  ),
  name: Schema.String,
  pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceTemplates: Schema.Array(V2ListMcpServerStatusResponse__ResourceTemplate),
  resources: Schema.Array(V2ListMcpServerStatusResponse__Resource),
  runtimeStatus: Schema.optionalKey(
    Schema.Union([V2ListMcpServerStatusResponse__McpServerConnectionStatus, Schema.Null]).annotate({
      description:
        "Current thread-runtime connection state; null when unavailable or the configuration changed.",
    }),
  ),
  serverCapabilities: Schema.optionalKey(
    Schema.Json.annotate({
      expected: "JSON value",
      description: "Capabilities advertised by the initialized MCP server; null when unavailable.",
    }),
  ),
  serverInfo: Schema.optionalKey(
    Schema.Union([V2ListMcpServerStatusResponse__McpServerInfo, Schema.Null]),
  ),
  tools: Schema.Record(Schema.String, V2ListMcpServerStatusResponse__Tool),
  toolsError: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Tool discovery failed and no catalog was returned. Null when a catalog is returned, including cached or empty catalogs.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ListMcpServerStatusResponse__McpServerStatus" });

export type V2ModelListResponse__ModelAccessPrograms = {
  readonly cyber: ReadonlyArray<V2ModelListResponse__CyberAccessProgram>;
};
export const V2ModelListResponse__ModelAccessPrograms = Schema.Struct({
  cyber: Schema.Array(V2ModelListResponse__CyberAccessProgram).annotate({
    description: "Accepted explicit selections.",
  }),
}).annotate({
  description: "Caller-specific explicit access programs advertised by model discovery.",
  identifier: "V2ModelListResponse__ModelAccessPrograms",
});

export type V2ModelListResponse__ReasoningEffortOption = {
  readonly description: string;
  readonly reasoningEffort: V2ModelListResponse__ReasoningEffort;
};
export const V2ModelListResponse__ReasoningEffortOption = Schema.Struct({
  description: Schema.String,
  reasoningEffort: V2ModelListResponse__ReasoningEffort,
}).annotate({ identifier: "V2ModelListResponse__ReasoningEffortOption" });

export type V2PluginInstalledResponse__MarketplaceLoadErrorInfo = {
  readonly marketplacePath: V2PluginInstalledResponse__AbsolutePathBuf;
  readonly message: string;
};
export const V2PluginInstalledResponse__MarketplaceLoadErrorInfo = Schema.Struct({
  marketplacePath: V2PluginInstalledResponse__AbsolutePathBuf,
  message: Schema.String,
}).annotate({ identifier: "V2PluginInstalledResponse__MarketplaceLoadErrorInfo" });

export type V2PluginInstalledResponse__PluginInterface = {
  readonly brandColor?: string | null;
  readonly capabilities: ReadonlyArray<string>;
  readonly category?: string | null;
  readonly composerIcon?: V2PluginInstalledResponse__AbsolutePathBuf | null;
  readonly composerIconUrl?: string | null;
  readonly defaultPrompt?: ReadonlyArray<string> | null;
  readonly developerName?: string | null;
  readonly displayName?: string | null;
  readonly logo?: V2PluginInstalledResponse__AbsolutePathBuf | null;
  readonly logoDark?: V2PluginInstalledResponse__AbsolutePathBuf | null;
  readonly logoUrl?: string | null;
  readonly logoUrlDark?: string | null;
  readonly longDescription?: string | null;
  readonly privacyPolicyUrl?: string | null;
  readonly screenshotUrls: ReadonlyArray<string>;
  readonly screenshots: ReadonlyArray<V2PluginInstalledResponse__AbsolutePathBuf>;
  readonly shortDescription?: string | null;
  readonly termsOfServiceUrl?: string | null;
  readonly websiteUrl?: string | null;
};
export const V2PluginInstalledResponse__PluginInterface = Schema.Struct({
  brandColor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  capabilities: Schema.Array(Schema.String),
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  composerIcon: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local composer icon path, resolved from the installed plugin package.",
    }),
  ),
  composerIconUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote composer icon URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  defaultPrompt: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Starter prompts for the plugin. Capped at 3 entries with a maximum of 128 characters per entry.",
      }),
      Schema.Null,
    ]),
  ),
  developerName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logo: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local logo path, resolved from the installed plugin package.",
    }),
  ),
  logoDark: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local dark-mode logo path, resolved from the installed plugin package.",
    }),
  ),
  logoUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote logo URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  logoUrlDark: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote dark-mode logo URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  longDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  privacyPolicyUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  screenshotUrls: Schema.Array(Schema.String).annotate({
    description: "Remote screenshot URLs from the plugin catalog.",
  }),
  screenshots: Schema.Array(V2PluginInstalledResponse__AbsolutePathBuf).annotate({
    description: "Local screenshot paths, resolved from the installed plugin package.",
  }),
  shortDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  termsOfServiceUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  websiteUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginInstalledResponse__PluginInterface" });

export type V2PluginInstalledResponse__PluginSource =
  | { readonly path: V2PluginInstalledResponse__AbsolutePathBuf; readonly type: "local" }
  | {
      readonly path?: string | null;
      readonly refName?: string | null;
      readonly sha?: string | null;
      readonly type: "git";
      readonly url: string;
    }
  | {
      readonly package: string;
      readonly registry?: string | null;
      readonly type: "npm";
      readonly version?: string | null;
    }
  | { readonly type: "remote" };
export const V2PluginInstalledResponse__PluginSource = Schema.Union(
  [
    Schema.Struct({
      path: V2PluginInstalledResponse__AbsolutePathBuf,
      type: Schema.Literal("local").annotate({ title: "LocalPluginSourceType" }),
    }).annotate({ title: "LocalPluginSource" }),
    Schema.Struct({
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      refName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("git").annotate({ title: "GitPluginSourceType" }),
      url: Schema.String,
    }).annotate({ title: "GitPluginSource" }),
    Schema.Struct({
      package: Schema.String,
      registry: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Optional HTTPS registry URL. Authentication stays in the user's npm config.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("npm").annotate({ title: "NpmPluginSourceType" }),
      version: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Optional npm version or version range." }),
          Schema.Null,
        ]),
      ),
    }).annotate({ title: "NpmPluginSource" }),
    Schema.Struct({
      type: Schema.Literal("remote").annotate({ title: "RemotePluginSourceType" }),
    }).annotate({
      title: "RemotePluginSource",
      description:
        "The plugin is available in the remote catalog. Download metadata is kept server-side and is not exposed through the app-server API.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginInstalledResponse__PluginSource" });

export type V2PluginInstalledResponse__PluginSharePrincipal = {
  readonly name: string;
  readonly principalId: string;
  readonly principalType: V2PluginInstalledResponse__PluginSharePrincipalType;
  readonly role: V2PluginInstalledResponse__PluginSharePrincipalRole;
};
export const V2PluginInstalledResponse__PluginSharePrincipal = Schema.Struct({
  name: Schema.String,
  principalId: Schema.String,
  principalType: V2PluginInstalledResponse__PluginSharePrincipalType,
  role: V2PluginInstalledResponse__PluginSharePrincipalRole,
}).annotate({ identifier: "V2PluginInstalledResponse__PluginSharePrincipal" });

export type V2PluginListResponse__MarketplaceLoadErrorInfo = {
  readonly marketplacePath: V2PluginListResponse__AbsolutePathBuf;
  readonly message: string;
};
export const V2PluginListResponse__MarketplaceLoadErrorInfo = Schema.Struct({
  marketplacePath: V2PluginListResponse__AbsolutePathBuf,
  message: Schema.String,
}).annotate({ identifier: "V2PluginListResponse__MarketplaceLoadErrorInfo" });

export type V2PluginListResponse__PluginInterface = {
  readonly brandColor?: string | null;
  readonly capabilities: ReadonlyArray<string>;
  readonly category?: string | null;
  readonly composerIcon?: V2PluginListResponse__AbsolutePathBuf | null;
  readonly composerIconUrl?: string | null;
  readonly defaultPrompt?: ReadonlyArray<string> | null;
  readonly developerName?: string | null;
  readonly displayName?: string | null;
  readonly logo?: V2PluginListResponse__AbsolutePathBuf | null;
  readonly logoDark?: V2PluginListResponse__AbsolutePathBuf | null;
  readonly logoUrl?: string | null;
  readonly logoUrlDark?: string | null;
  readonly longDescription?: string | null;
  readonly privacyPolicyUrl?: string | null;
  readonly screenshotUrls: ReadonlyArray<string>;
  readonly screenshots: ReadonlyArray<V2PluginListResponse__AbsolutePathBuf>;
  readonly shortDescription?: string | null;
  readonly termsOfServiceUrl?: string | null;
  readonly websiteUrl?: string | null;
};
export const V2PluginListResponse__PluginInterface = Schema.Struct({
  brandColor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  capabilities: Schema.Array(Schema.String),
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  composerIcon: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local composer icon path, resolved from the installed plugin package.",
    }),
  ),
  composerIconUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote composer icon URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  defaultPrompt: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Starter prompts for the plugin. Capped at 3 entries with a maximum of 128 characters per entry.",
      }),
      Schema.Null,
    ]),
  ),
  developerName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logo: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local logo path, resolved from the installed plugin package.",
    }),
  ),
  logoDark: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local dark-mode logo path, resolved from the installed plugin package.",
    }),
  ),
  logoUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote logo URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  logoUrlDark: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote dark-mode logo URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  longDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  privacyPolicyUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  screenshotUrls: Schema.Array(Schema.String).annotate({
    description: "Remote screenshot URLs from the plugin catalog.",
  }),
  screenshots: Schema.Array(V2PluginListResponse__AbsolutePathBuf).annotate({
    description: "Local screenshot paths, resolved from the installed plugin package.",
  }),
  shortDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  termsOfServiceUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  websiteUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginListResponse__PluginInterface" });

export type V2PluginListResponse__PluginSource =
  | { readonly path: V2PluginListResponse__AbsolutePathBuf; readonly type: "local" }
  | {
      readonly path?: string | null;
      readonly refName?: string | null;
      readonly sha?: string | null;
      readonly type: "git";
      readonly url: string;
    }
  | {
      readonly package: string;
      readonly registry?: string | null;
      readonly type: "npm";
      readonly version?: string | null;
    }
  | { readonly type: "remote" };
export const V2PluginListResponse__PluginSource = Schema.Union(
  [
    Schema.Struct({
      path: V2PluginListResponse__AbsolutePathBuf,
      type: Schema.Literal("local").annotate({ title: "LocalPluginSourceType" }),
    }).annotate({ title: "LocalPluginSource" }),
    Schema.Struct({
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      refName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("git").annotate({ title: "GitPluginSourceType" }),
      url: Schema.String,
    }).annotate({ title: "GitPluginSource" }),
    Schema.Struct({
      package: Schema.String,
      registry: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Optional HTTPS registry URL. Authentication stays in the user's npm config.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("npm").annotate({ title: "NpmPluginSourceType" }),
      version: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Optional npm version or version range." }),
          Schema.Null,
        ]),
      ),
    }).annotate({ title: "NpmPluginSource" }),
    Schema.Struct({
      type: Schema.Literal("remote").annotate({ title: "RemotePluginSourceType" }),
    }).annotate({
      title: "RemotePluginSource",
      description:
        "The plugin is available in the remote catalog. Download metadata is kept server-side and is not exposed through the app-server API.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginListResponse__PluginSource" });

export type V2PluginListResponse__PluginSharePrincipal = {
  readonly name: string;
  readonly principalId: string;
  readonly principalType: V2PluginListResponse__PluginSharePrincipalType;
  readonly role: V2PluginListResponse__PluginSharePrincipalRole;
};
export const V2PluginListResponse__PluginSharePrincipal = Schema.Struct({
  name: Schema.String,
  principalId: Schema.String,
  principalType: V2PluginListResponse__PluginSharePrincipalType,
  role: V2PluginListResponse__PluginSharePrincipalRole,
}).annotate({ identifier: "V2PluginListResponse__PluginSharePrincipal" });

export type V2PluginReadResponse__AppTemplateSummary = {
  readonly canonicalConnectorId?: string | null;
  readonly category?: string | null;
  readonly description?: string | null;
  readonly logoUrl?: string | null;
  readonly logoUrlDark?: string | null;
  readonly materializedAppIds: ReadonlyArray<string>;
  readonly name: string;
  readonly reason?: V2PluginReadResponse__AppTemplateUnavailableReason | null;
  readonly templateId: string;
};
export const V2PluginReadResponse__AppTemplateSummary = Schema.Struct({
  canonicalConnectorId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logoUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logoUrlDark: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  materializedAppIds: Schema.Array(Schema.String),
  name: Schema.String,
  reason: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__AppTemplateUnavailableReason, Schema.Null]),
  ),
  templateId: Schema.String,
}).annotate({ identifier: "V2PluginReadResponse__AppTemplateSummary" });

export type V2PluginReadResponse__PluginHookSummary = {
  readonly eventName: V2PluginReadResponse__HookEventName;
  readonly key: string;
};
export const V2PluginReadResponse__PluginHookSummary = Schema.Struct({
  eventName: V2PluginReadResponse__HookEventName,
  key: Schema.String,
}).annotate({ identifier: "V2PluginReadResponse__PluginHookSummary" });

export type V2PluginReadResponse__SkillInterface = {
  readonly brandColor?: string | null;
  readonly defaultPrompt?: string | null;
  readonly displayName?: string | null;
  readonly iconLarge?: V2PluginReadResponse__AbsolutePathBuf | null;
  readonly iconLargeUrl?: string | null;
  readonly iconSmall?: V2PluginReadResponse__AbsolutePathBuf | null;
  readonly iconSmallUrl?: string | null;
  readonly shortDescription?: string | null;
};
export const V2PluginReadResponse__SkillInterface = Schema.Struct({
  brandColor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  defaultPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  iconLarge: Schema.optionalKey(Schema.Union([V2PluginReadResponse__AbsolutePathBuf, Schema.Null])),
  iconLargeUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote large icon URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  iconSmall: Schema.optionalKey(Schema.Union([V2PluginReadResponse__AbsolutePathBuf, Schema.Null])),
  iconSmallUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote small icon URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  shortDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginReadResponse__SkillInterface" });
