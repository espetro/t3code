import * as Schema from "effect/Schema";
import {
  PermissionsRequestApprovalParams__AdditionalNetworkPermissions,
  PermissionsRequestApprovalResponse__AdditionalNetworkPermissions,
  ServerNotification__AbsolutePathBuf,
  ServerNotification__GitInfo,
  ServerNotification__ReasoningEffort,
  ServerNotification__ThreadHistoryMode,
  ServerNotification__ThreadSource,
} from "./schema.gen.part0.ts";
import {
  ServerNotification__AdditionalNetworkPermissions,
  ServerRequest__AdditionalNetworkPermissions,
  V2ConfigReadResponse__AnalyticsConfig,
  V2ConfigReadResponse__ApprovalsReviewer,
  V2ConfigReadResponse__AskForApproval,
  V2ConfigReadResponse__AutoCompactTokenLimitScope,
  V2ConfigReadResponse__ForcedChatgptWorkspaceIds,
  V2ConfigReadResponse__ForcedLoginMethod,
  V2ConfigReadResponse__ReasoningEffort,
  V2ConfigReadResponse__ReasoningSummary,
  V2ConfigReadResponse__SandboxMode,
  V2ConfigReadResponse__SandboxWorkspaceWrite,
  V2ConfigReadResponse__Verbosity,
  V2ConfigReadResponse__WebSearchMode,
  V2ConfigRequirementsReadResponse__AskForApproval,
  V2ConfigRequirementsReadResponse__AutoReviewRequirements,
  V2ConfigRequirementsReadResponse__CliAuthCredentialsStoreMode,
  V2ConfigRequirementsReadResponse__FeedbackRequirements,
  V2ConfigRequirementsReadResponse__ForcedLoginMethod,
  V2ConfigRequirementsReadResponse__InAppBrowserRequirements,
  V2ConfigRequirementsReadResponse__ResidencyRequirement,
  V2ConfigRequirementsReadResponse__SandboxMode,
  V2ConfigRequirementsReadResponse__WebSearchMode,
  V2ConfigRequirementsReadResponse__WindowsSandboxImplementation,
} from "./schema.gen.part1.ts";
import {
  V2ItemGuardianApprovalReviewCompletedNotification__AdditionalNetworkPermissions,
  V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
  V2ItemGuardianApprovalReviewStartedNotification__AdditionalNetworkPermissions,
  V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
  V2PluginInstalledResponse__AbsolutePathBuf,
  V2PluginInstalledResponse__MarketplaceInterface,
  V2PluginListResponse__AbsolutePathBuf,
  V2PluginListResponse__MarketplaceInterface,
  V2PluginReadResponse__AbsolutePathBuf,
  V2PluginReadResponse__AppSummary,
} from "./schema.gen.part2.ts";
import {
  V2PluginShareListResponse__AbsolutePathBuf,
  V2ReviewStartResponse__TurnItemsView,
  V2ReviewStartResponse__TurnStatus,
  V2ThreadForkResponse__AbsolutePathBuf,
  V2ThreadForkResponse__GitInfo,
  V2ThreadForkResponse__ReasoningEffort,
  V2ThreadForkResponse__ThreadHistoryMode,
  V2ThreadForkResponse__ThreadSource,
  V2ThreadForkResponse__TurnItemsView,
  V2ThreadForkResponse__TurnStatus,
  V2ThreadListResponse__AbsolutePathBuf,
  V2ThreadListResponse__GitInfo,
  V2ThreadListResponse__ReasoningEffort,
  V2ThreadListResponse__ThreadHistoryMode,
  V2ThreadListResponse__ThreadSource,
} from "./schema.gen.part3.ts";
import {
  V2ThreadListResponse__TurnItemsView,
  V2ThreadListResponse__TurnStatus,
  V2ThreadMetadataUpdateResponse__AbsolutePathBuf,
  V2ThreadMetadataUpdateResponse__GitInfo,
  V2ThreadMetadataUpdateResponse__ReasoningEffort,
  V2ThreadMetadataUpdateResponse__ThreadHistoryMode,
  V2ThreadMetadataUpdateResponse__ThreadSource,
  V2ThreadMetadataUpdateResponse__TurnItemsView,
  V2ThreadMetadataUpdateResponse__TurnStatus,
  V2ThreadReadResponse__AbsolutePathBuf,
  V2ThreadReadResponse__GitInfo,
  V2ThreadReadResponse__ReasoningEffort,
  V2ThreadReadResponse__ThreadHistoryMode,
  V2ThreadReadResponse__ThreadSource,
  V2ThreadReadResponse__TurnItemsView,
  V2ThreadReadResponse__TurnStatus,
  V2ThreadResumeResponse__TurnItemsView,
  V2ThreadResumeResponse__TurnStatus,
} from "./schema.gen.part4.ts";
import {
  V2ThreadRevertResponse__TurnItemsView,
  V2ThreadRevertResponse__TurnStatus,
  V2ThreadStartResponse__TurnItemsView,
  V2ThreadStartResponse__TurnStatus,
  V2ThreadStartedNotification__TurnItemsView,
  V2ThreadStartedNotification__TurnStatus,
  V2ThreadTurnsListResponse__TurnItemsView,
  V2ThreadTurnsListResponse__TurnStatus,
  V2ThreadUnarchiveResponse__TurnItemsView,
  V2ThreadUnarchiveResponse__TurnStatus,
} from "./schema.gen.part5.ts";
import {
  V2TurnCompletedNotification__TurnItemsView,
  V2TurnCompletedNotification__TurnStatus,
  V2TurnStartResponse__TurnItemsView,
  V2TurnStartResponse__TurnStatus,
  V2TurnStartedNotification__TurnItemsView,
  V2TurnStartedNotification__TurnStatus,
} from "./schema.gen.part6.ts";
import {
  McpServerElicitationRequestParams__McpElicitationBooleanSchema,
  McpServerElicitationRequestParams__McpElicitationNumberSchema,
  McpServerElicitationRequestParams__McpElicitationStringSchema,
  ServerNotification__ThreadSection,
  ServerNotification__ThreadStatus,
  ServerRequest__McpElicitationBooleanSchema,
  ServerRequest__McpElicitationNumberSchema,
  ServerRequest__McpElicitationStringSchema,
} from "./schema.gen.part7.ts";
import {
  V2PluginReadResponse__AppTemplateSummary,
  V2PluginReadResponse__PluginHookSummary,
} from "./schema.gen.part8.ts";
import {
  V2ThreadForkResponse__ThreadSection,
  V2ThreadForkResponse__ThreadStatus,
  V2ThreadListResponse__ThreadSection,
  V2ThreadListResponse__ThreadStatus,
  V2ThreadMetadataUpdateResponse__ThreadSection,
  V2ThreadMetadataUpdateResponse__ThreadStatus,
  V2ThreadReadResponse__ThreadSection,
  V2ThreadReadResponse__ThreadStatus,
} from "./schema.gen.part9.ts";
import {
  ServerNotification__SessionSource,
  V2ConfigReadResponse__BrowserUseConfig,
  V2ConfigReadResponse__ToolsV2,
  V2ConfigRequirementsReadResponse__BrowserUseRequirements,
  V2ConfigRequirementsReadResponse__ModelsRequirements,
  V2PluginReadResponse__ScheduledTaskSummary,
  V2PluginReadResponse__SkillSummary,
  V2ReviewStartResponse__TurnError,
  V2ThreadForkResponse__SessionSource,
  V2ThreadForkResponse__TurnError,
  V2ThreadListResponse__SessionSource,
  V2ThreadListResponse__TurnError,
  V2ThreadMetadataUpdateResponse__SessionSource,
  V2ThreadMetadataUpdateResponse__TurnError,
  V2ThreadReadResponse__SessionSource,
} from "./schema.gen.part12.ts";
import {
  V2ConfigReadResponse__ComputerUseConfig,
  V2ConfigRequirementsReadResponse__ComputerUseRequirements,
  V2ThreadReadResponse__TurnError,
  V2ThreadResumeResponse__TurnError,
  V2ThreadRevertResponse__TurnError,
  V2ThreadStartResponse__TurnError,
  V2ThreadStartedNotification__TurnError,
  V2ThreadTurnsListResponse__TurnError,
  V2ThreadUnarchiveResponse__TurnError,
  V2TurnCompletedNotification__TurnError,
  V2TurnStartResponse__TurnError,
  V2TurnStartedNotification__TurnError,
} from "./schema.gen.part13.ts";
import {
  V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSandboxEntry,
  V2ItemGuardianApprovalReviewStartedNotification__FileSystemSandboxEntry,
  V2PluginInstalledResponse__PluginSummary,
  V2PluginListResponse__PluginSummary,
  V2PluginReadResponse__PluginSummary,
  V2PluginShareListResponse__PluginSummary,
  V2ReviewStartResponse__ThreadItem,
} from "./schema.gen.part14.ts";
import {
  V2ThreadForkResponse__ThreadItem,
  V2ThreadItemsListResponse__ThreadItem,
  V2ThreadListResponse__ThreadItem,
  V2ThreadMetadataUpdateResponse__ThreadItem,
  V2ThreadReadResponse__ThreadItem,
} from "./schema.gen.part15.ts";
import {
  V2ThreadResumeResponse__ThreadItem,
  V2ThreadRevertResponse__ThreadItem,
  V2ThreadStartResponse__ThreadItem,
  V2ThreadStartedNotification__ThreadItem,
  V2ThreadTurnsListResponse__ThreadItem,
} from "./schema.gen.part16.ts";
import {
  McpServerElicitationRequestParams__McpElicitationEnumSchema,
  PermissionsRequestApprovalParams__AdditionalFileSystemPermissions,
  PermissionsRequestApprovalResponse__AdditionalFileSystemPermissions,
  ServerNotification__AdditionalFileSystemPermissions,
  ServerNotification__Turn,
  ServerRequest__AdditionalFileSystemPermissions,
  ServerRequest__McpElicitationEnumSchema,
  V2ThreadUnarchiveResponse__ThreadItem,
  V2TurnCompletedNotification__ThreadItem,
  V2TurnStartResponse__ThreadItem,
  V2TurnStartedNotification__ThreadItem,
} from "./schema.gen.part17.ts";

export type V2ConfigReadResponse__Config = {
  readonly analytics?: V2ConfigReadResponse__AnalyticsConfig | null;
  readonly approval_policy?: V2ConfigReadResponse__AskForApproval | null;
  readonly approvals_reviewer?: V2ConfigReadResponse__ApprovalsReviewer | null;
  readonly browser_use?: V2ConfigReadResponse__BrowserUseConfig | null;
  readonly compact_prompt?: string | null;
  readonly computer_use?: V2ConfigReadResponse__ComputerUseConfig | null;
  readonly desktop?: { readonly [x: string]: Schema.Json } | null;
  readonly developer_instructions?: string | null;
  readonly forced_chatgpt_workspace_id?: V2ConfigReadResponse__ForcedChatgptWorkspaceIds | null;
  readonly forced_login_method?: V2ConfigReadResponse__ForcedLoginMethod | null;
  readonly instructions?: string | null;
  readonly model?: string | null;
  readonly model_auto_compact_token_limit?: number | null;
  readonly model_auto_compact_token_limit_scope?: V2ConfigReadResponse__AutoCompactTokenLimitScope | null;
  readonly model_context_window?: number | null;
  readonly model_provider?: string | null;
  readonly model_reasoning_effort?: V2ConfigReadResponse__ReasoningEffort | null;
  readonly model_reasoning_summary?: V2ConfigReadResponse__ReasoningSummary | null;
  readonly model_verbosity?: V2ConfigReadResponse__Verbosity | null;
  readonly review_model?: string | null;
  readonly sandbox_mode?: V2ConfigReadResponse__SandboxMode | null;
  readonly sandbox_workspace_write?: V2ConfigReadResponse__SandboxWorkspaceWrite | null;
  readonly service_tier?: string | null;
  readonly tools?: V2ConfigReadResponse__ToolsV2 | null;
  readonly web_search?: V2ConfigReadResponse__WebSearchMode | null;
} & { readonly [x: string]: Schema.Json };
export const V2ConfigReadResponse__Config = Schema.StructWithRest(
  Schema.Struct({
    analytics: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__AnalyticsConfig, Schema.Null]),
    ),
    approval_policy: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__AskForApproval, Schema.Null]),
    ),
    approvals_reviewer: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__ApprovalsReviewer, Schema.Null]).annotate({
        description:
          "[UNSTABLE] Optional default for where approval requests are routed for review.",
      }),
    ),
    browser_use: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__BrowserUseConfig, Schema.Null]),
    ),
    compact_prompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    computer_use: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__ComputerUseConfig, Schema.Null]),
    ),
    desktop: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })),
        Schema.Null,
      ]),
    ),
    developer_instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    forced_chatgpt_workspace_id: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__ForcedChatgptWorkspaceIds, Schema.Null]),
    ),
    forced_login_method: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__ForcedLoginMethod, Schema.Null]),
    ),
    instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    model: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    model_auto_compact_token_limit: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({ format: "int64" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        Schema.Null,
      ]),
    ),
    model_auto_compact_token_limit_scope: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__AutoCompactTokenLimitScope, Schema.Null]),
    ),
    model_context_window: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({ format: "int64" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        Schema.Null,
      ]),
    ),
    model_provider: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    model_reasoning_effort: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__ReasoningEffort, Schema.Null]),
    ),
    model_reasoning_summary: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__ReasoningSummary, Schema.Null]),
    ),
    model_verbosity: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__Verbosity, Schema.Null]),
    ),
    review_model: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    sandbox_mode: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__SandboxMode, Schema.Null]),
    ),
    sandbox_workspace_write: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__SandboxWorkspaceWrite, Schema.Null]),
    ),
    service_tier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    tools: Schema.optionalKey(Schema.Union([V2ConfigReadResponse__ToolsV2, Schema.Null])),
    web_search: Schema.optionalKey(
      Schema.Union([V2ConfigReadResponse__WebSearchMode, Schema.Null]),
    ),
  }),
  [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
).annotate({ identifier: "V2ConfigReadResponse__Config" });

export type V2ConfigRequirementsReadResponse__ConfigRequirements = {
  readonly additionalDeveloperInstructions?: string | null;
  readonly allowAppshots?: boolean | null;
  readonly allowBrowserAndComputerUse?: boolean | null;
  readonly allowLoginShell?: boolean | null;
  readonly allowManagedHooksOnly?: boolean | null;
  readonly allowRemoteControl?: boolean | null;
  readonly allowedApprovalPolicies?: ReadonlyArray<V2ConfigRequirementsReadResponse__AskForApproval> | null;
  readonly allowedLoginMethods?: ReadonlyArray<V2ConfigRequirementsReadResponse__ForcedLoginMethod> | null;
  readonly allowedPermissionProfiles?: { readonly [x: string]: boolean } | null;
  readonly allowedSandboxModes?: ReadonlyArray<V2ConfigRequirementsReadResponse__SandboxMode> | null;
  readonly allowedWebSearchModes?: ReadonlyArray<V2ConfigRequirementsReadResponse__WebSearchMode> | null;
  readonly allowedWindowsSandboxImplementations?: ReadonlyArray<V2ConfigRequirementsReadResponse__WindowsSandboxImplementation> | null;
  readonly autoReview?: V2ConfigRequirementsReadResponse__AutoReviewRequirements | null;
  readonly browserUse?: V2ConfigRequirementsReadResponse__BrowserUseRequirements | null;
  readonly chatgptBaseUrl?: string | null;
  readonly checkForUpdateOnStartup?: boolean | null;
  readonly cliAuthCredentialsStore?: V2ConfigRequirementsReadResponse__CliAuthCredentialsStoreMode | null;
  readonly computerUse?: V2ConfigRequirementsReadResponse__ComputerUseRequirements | null;
  readonly defaultPermissions?: string | null;
  readonly enforceResidency?: V2ConfigRequirementsReadResponse__ResidencyRequirement | null;
  readonly featureRequirements?: { readonly [x: string]: boolean } | null;
  readonly feedback?: V2ConfigRequirementsReadResponse__FeedbackRequirements | null;
  readonly inAppBrowser?: V2ConfigRequirementsReadResponse__InAppBrowserRequirements | null;
  readonly logDir?: string | null;
  readonly modelCatalogJson?: string | null;
  readonly modelProvider?: string | null;
  readonly modelProviders?: { readonly [x: string]: Schema.Json } | null;
  readonly models?: V2ConfigRequirementsReadResponse__ModelsRequirements | null;
  readonly sqliteHome?: string | null;
};
export const V2ConfigRequirementsReadResponse__ConfigRequirements = Schema.Struct({
  additionalDeveloperInstructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  allowAppshots: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowBrowserAndComputerUse: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowLoginShell: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowManagedHooksOnly: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowRemoteControl: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowedApprovalPolicies: Schema.optionalKey(
    Schema.Union([Schema.Array(V2ConfigRequirementsReadResponse__AskForApproval), Schema.Null]),
  ),
  allowedLoginMethods: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2ConfigRequirementsReadResponse__ForcedLoginMethod).annotate({
        description:
          "Effective login methods after managed, forced-login, and workspace restrictions. An empty list permits no login method. Older servers may omit this field.",
      }),
      Schema.Null,
    ]),
  ),
  allowedPermissionProfiles: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.Boolean), Schema.Null]),
  ),
  allowedSandboxModes: Schema.optionalKey(
    Schema.Union([Schema.Array(V2ConfigRequirementsReadResponse__SandboxMode), Schema.Null]),
  ),
  allowedWebSearchModes: Schema.optionalKey(
    Schema.Union([Schema.Array(V2ConfigRequirementsReadResponse__WebSearchMode), Schema.Null]),
  ),
  allowedWindowsSandboxImplementations: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2ConfigRequirementsReadResponse__WindowsSandboxImplementation),
      Schema.Null,
    ]),
  ),
  autoReview: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__AutoReviewRequirements, Schema.Null]),
  ),
  browserUse: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__BrowserUseRequirements, Schema.Null]),
  ),
  chatgptBaseUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  checkForUpdateOnStartup: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  cliAuthCredentialsStore: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__CliAuthCredentialsStoreMode, Schema.Null]),
  ),
  computerUse: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__ComputerUseRequirements, Schema.Null]),
  ),
  defaultPermissions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  enforceResidency: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__ResidencyRequirement, Schema.Null]),
  ),
  featureRequirements: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.Boolean), Schema.Null]),
  ),
  feedback: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__FeedbackRequirements, Schema.Null]),
  ),
  inAppBrowser: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__InAppBrowserRequirements, Schema.Null]),
  ),
  logDir: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  modelCatalogJson: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  modelProvider: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Exact provider selection required by managed policy.",
      }),
      Schema.Null,
    ]),
  ),
  modelProviders: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description: "Complete required provider definitions, using config.toml field names.",
      }),
      Schema.Null,
    ]),
  ),
  models: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__ModelsRequirements, Schema.Null]),
  ),
  sqliteHome: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__ConfigRequirements" });

export type V2ItemGuardianApprovalReviewCompletedNotification__AdditionalFileSystemPermissions = {
  readonly entries?: ReadonlyArray<V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSandboxEntry> | null;
  readonly globScanMaxDepth?: number | null;
  readonly read?: ReadonlyArray<V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString> | null;
  readonly write?: ReadonlyArray<V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString> | null;
};
export const V2ItemGuardianApprovalReviewCompletedNotification__AdditionalFileSystemPermissions =
  Schema.Struct({
    entries: Schema.optionalKey(
      Schema.Union([
        Schema.Array(V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSandboxEntry),
        Schema.Null,
      ]),
    ),
    globScanMaxDepth: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({ format: "uint" })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(1).annotate({
              expected: "a value greater than or equal to 1",
            }),
          ),
        Schema.Null,
      ]),
    ),
    read: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
        ).annotate({ description: "This will be removed in favor of `entries`." }),
        Schema.Null,
      ]),
    ),
    write: Schema.optionalKey(
      Schema.Union([
        Schema.Array(
          V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
        ).annotate({ description: "This will be removed in favor of `entries`." }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    identifier:
      "V2ItemGuardianApprovalReviewCompletedNotification__AdditionalFileSystemPermissions",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__AdditionalFileSystemPermissions = {
  readonly entries?: ReadonlyArray<V2ItemGuardianApprovalReviewStartedNotification__FileSystemSandboxEntry> | null;
  readonly globScanMaxDepth?: number | null;
  readonly read?: ReadonlyArray<V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString> | null;
  readonly write?: ReadonlyArray<V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString> | null;
};
export const V2ItemGuardianApprovalReviewStartedNotification__AdditionalFileSystemPermissions =
  Schema.Struct({
    entries: Schema.optionalKey(
      Schema.Union([
        Schema.Array(V2ItemGuardianApprovalReviewStartedNotification__FileSystemSandboxEntry),
        Schema.Null,
      ]),
    ),
    globScanMaxDepth: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({ format: "uint" })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(1).annotate({
              expected: "a value greater than or equal to 1",
            }),
          ),
        Schema.Null,
      ]),
    ),
    read: Schema.optionalKey(
      Schema.Union([
        Schema.Array(V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString).annotate(
          { description: "This will be removed in favor of `entries`." },
        ),
        Schema.Null,
      ]),
    ),
    write: Schema.optionalKey(
      Schema.Union([
        Schema.Array(V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString).annotate(
          { description: "This will be removed in favor of `entries`." },
        ),
        Schema.Null,
      ]),
    ),
  }).annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__AdditionalFileSystemPermissions",
  });

export type V2PluginInstalledResponse__PluginMarketplaceEntry = {
  readonly interface?: V2PluginInstalledResponse__MarketplaceInterface | null;
  readonly name: string;
  readonly path?: V2PluginInstalledResponse__AbsolutePathBuf | null;
  readonly plugins: ReadonlyArray<V2PluginInstalledResponse__PluginSummary>;
};
export const V2PluginInstalledResponse__PluginMarketplaceEntry = Schema.Struct({
  interface: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__MarketplaceInterface, Schema.Null]),
  ),
  name: Schema.String,
  path: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description:
        "Local marketplace file path when the marketplace is backed by a local file. Remote-only catalog marketplaces do not have a local path.",
    }),
  ),
  plugins: Schema.Array(V2PluginInstalledResponse__PluginSummary),
}).annotate({ identifier: "V2PluginInstalledResponse__PluginMarketplaceEntry" });

export type V2PluginListResponse__PluginMarketplaceEntry = {
  readonly interface?: V2PluginListResponse__MarketplaceInterface | null;
  readonly name: string;
  readonly path?: V2PluginListResponse__AbsolutePathBuf | null;
  readonly plugins: ReadonlyArray<V2PluginListResponse__PluginSummary>;
};
export const V2PluginListResponse__PluginMarketplaceEntry = Schema.Struct({
  interface: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__MarketplaceInterface, Schema.Null]),
  ),
  name: Schema.String,
  path: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description:
        "Local marketplace file path when the marketplace is backed by a local file. Remote-only catalog marketplaces do not have a local path.",
    }),
  ),
  plugins: Schema.Array(V2PluginListResponse__PluginSummary),
}).annotate({ identifier: "V2PluginListResponse__PluginMarketplaceEntry" });

export type V2PluginReadResponse__PluginDetail = {
  readonly appTemplates: ReadonlyArray<V2PluginReadResponse__AppTemplateSummary>;
  readonly apps: ReadonlyArray<V2PluginReadResponse__AppSummary>;
  readonly description?: string | null;
  readonly hooks: ReadonlyArray<V2PluginReadResponse__PluginHookSummary>;
  readonly marketplaceName: string;
  readonly marketplacePath?: V2PluginReadResponse__AbsolutePathBuf | null;
  readonly mcpServers: ReadonlyArray<string>;
  readonly onboardingSkill?: V2PluginReadResponse__SkillSummary | null;
  readonly scheduledTasks?: ReadonlyArray<V2PluginReadResponse__ScheduledTaskSummary> | null;
  readonly shareUrl?: string | null;
  readonly skills: ReadonlyArray<V2PluginReadResponse__SkillSummary>;
  readonly summary: V2PluginReadResponse__PluginSummary;
};
export const V2PluginReadResponse__PluginDetail = Schema.Struct({
  appTemplates: Schema.Array(V2PluginReadResponse__AppTemplateSummary),
  apps: Schema.Array(V2PluginReadResponse__AppSummary),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  hooks: Schema.Array(V2PluginReadResponse__PluginHookSummary),
  marketplaceName: Schema.String,
  marketplacePath: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__AbsolutePathBuf, Schema.Null]),
  ),
  mcpServers: Schema.Array(Schema.String),
  onboardingSkill: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__SkillSummary, Schema.Null]).annotate({
      description: "The declared onboarding skill, when the plugin and visible skill are enabled.",
    }),
  ),
  scheduledTasks: Schema.optionalKey(
    Schema.Union([Schema.Array(V2PluginReadResponse__ScheduledTaskSummary), Schema.Null]),
  ),
  shareUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  skills: Schema.Array(V2PluginReadResponse__SkillSummary),
  summary: V2PluginReadResponse__PluginSummary,
}).annotate({ identifier: "V2PluginReadResponse__PluginDetail" });

export type V2PluginShareListResponse__PluginShareListItem = {
  readonly localPluginPath?: V2PluginShareListResponse__AbsolutePathBuf | null;
  readonly plugin: V2PluginShareListResponse__PluginSummary;
};
export const V2PluginShareListResponse__PluginShareListItem = Schema.Struct({
  localPluginPath: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__AbsolutePathBuf, Schema.Null]),
  ),
  plugin: V2PluginShareListResponse__PluginSummary,
}).annotate({ identifier: "V2PluginShareListResponse__PluginShareListItem" });

export type V2ReviewStartResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ReviewStartResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ReviewStartResponse__ThreadItem>;
  readonly itemsView?: V2ReviewStartResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ReviewStartResponse__TurnStatus;
};
export const V2ReviewStartResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ReviewStartResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ReviewStartResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ReviewStartResponse__TurnItemsView> =>
        V2ReviewStartResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ReviewStartResponse__TurnStatus,
}).annotate({ identifier: "V2ReviewStartResponse__Turn" });

export type V2ThreadForkResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadForkResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadForkResponse__ThreadItem>;
  readonly itemsView?: V2ThreadForkResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadForkResponse__TurnStatus;
};
export const V2ThreadForkResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadForkResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadForkResponse__TurnItemsView> => V2ThreadForkResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadForkResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadForkResponse__Turn" });

export type V2ThreadItemsListResponse__ThreadItemEntry = {
  readonly completedAtMs?: number | null;
  readonly item: V2ThreadItemsListResponse__ThreadItem;
  readonly startedAtMs?: number | null;
  readonly turnId: string;
};
export const V2ThreadItemsListResponse__ThreadItemEntry = Schema.Struct({
  completedAtMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Unix timestamp (milliseconds) when the item completed, if recorded by the producer.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  item: V2ThreadItemsListResponse__ThreadItem,
  startedAtMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Unix timestamp (milliseconds) when the item started, if recorded by the producer.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  turnId: Schema.String.annotate({ description: "Turn containing this item." }),
}).annotate({ identifier: "V2ThreadItemsListResponse__ThreadItemEntry" });

export type V2ThreadListResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadListResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadListResponse__ThreadItem>;
  readonly itemsView?: V2ThreadListResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadListResponse__TurnStatus;
};
export const V2ThreadListResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadListResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadListResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadListResponse__TurnItemsView> => V2ThreadListResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadListResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadListResponse__Turn" });

export type V2ThreadMetadataUpdateResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadMetadataUpdateResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadMetadataUpdateResponse__ThreadItem>;
  readonly itemsView?: V2ThreadMetadataUpdateResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadMetadataUpdateResponse__TurnStatus;
};
export const V2ThreadMetadataUpdateResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadMetadataUpdateResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadMetadataUpdateResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadMetadataUpdateResponse__TurnItemsView> =>
        V2ThreadMetadataUpdateResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadMetadataUpdateResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__Turn" });

export type V2ThreadReadResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadReadResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadReadResponse__ThreadItem>;
  readonly itemsView?: V2ThreadReadResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadReadResponse__TurnStatus;
};
export const V2ThreadReadResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadReadResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadReadResponse__TurnItemsView> => V2ThreadReadResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadReadResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadReadResponse__Turn" });

export type V2ThreadResumeResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadResumeResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadResumeResponse__ThreadItem>;
  readonly itemsView?: V2ThreadResumeResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadResumeResponse__TurnStatus;
};
export const V2ThreadResumeResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadResumeResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadResumeResponse__TurnItemsView> =>
        V2ThreadResumeResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadResumeResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadResumeResponse__Turn" });

export type V2ThreadRevertResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadRevertResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadRevertResponse__ThreadItem>;
  readonly itemsView?: V2ThreadRevertResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadRevertResponse__TurnStatus;
};
export const V2ThreadRevertResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadRevertResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadRevertResponse__TurnItemsView> =>
        V2ThreadRevertResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadRevertResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadRevertResponse__Turn" });

export type V2ThreadStartedNotification__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadStartedNotification__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadStartedNotification__ThreadItem>;
  readonly itemsView?: V2ThreadStartedNotification__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadStartedNotification__TurnStatus;
};
export const V2ThreadStartedNotification__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadStartedNotification__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadStartedNotification__TurnItemsView> =>
        V2ThreadStartedNotification__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadStartedNotification__TurnStatus,
}).annotate({ identifier: "V2ThreadStartedNotification__Turn" });

export type V2ThreadStartResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadStartResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadStartResponse__ThreadItem>;
  readonly itemsView?: V2ThreadStartResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadStartResponse__TurnStatus;
};
export const V2ThreadStartResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadStartResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadStartResponse__TurnItemsView> =>
        V2ThreadStartResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadStartResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadStartResponse__Turn" });

export type V2ThreadTurnsListResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadTurnsListResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadTurnsListResponse__ThreadItem>;
  readonly itemsView?: V2ThreadTurnsListResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadTurnsListResponse__TurnStatus;
};
export const V2ThreadTurnsListResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadTurnsListResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadTurnsListResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadTurnsListResponse__TurnItemsView> =>
        V2ThreadTurnsListResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadTurnsListResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadTurnsListResponse__Turn" });

export type V2ThreadUnarchiveResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2ThreadUnarchiveResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2ThreadUnarchiveResponse__ThreadItem>;
  readonly itemsView?: V2ThreadUnarchiveResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2ThreadUnarchiveResponse__TurnStatus;
};
export const V2ThreadUnarchiveResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2ThreadUnarchiveResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2ThreadUnarchiveResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadUnarchiveResponse__TurnItemsView> =>
        V2ThreadUnarchiveResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2ThreadUnarchiveResponse__TurnStatus,
}).annotate({ identifier: "V2ThreadUnarchiveResponse__Turn" });

export type V2TurnCompletedNotification__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2TurnCompletedNotification__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2TurnCompletedNotification__ThreadItem>;
  readonly itemsView?: V2TurnCompletedNotification__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2TurnCompletedNotification__TurnStatus;
};
export const V2TurnCompletedNotification__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2TurnCompletedNotification__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2TurnCompletedNotification__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2TurnCompletedNotification__TurnItemsView> =>
        V2TurnCompletedNotification__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2TurnCompletedNotification__TurnStatus,
}).annotate({ identifier: "V2TurnCompletedNotification__Turn" });

export type V2TurnStartedNotification__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2TurnStartedNotification__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2TurnStartedNotification__ThreadItem>;
  readonly itemsView?: V2TurnStartedNotification__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2TurnStartedNotification__TurnStatus;
};
export const V2TurnStartedNotification__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2TurnStartedNotification__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2TurnStartedNotification__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2TurnStartedNotification__TurnItemsView> =>
        V2TurnStartedNotification__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2TurnStartedNotification__TurnStatus,
}).annotate({ identifier: "V2TurnStartedNotification__Turn" });

export type V2TurnStartResponse__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: V2TurnStartResponse__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<V2TurnStartResponse__ThreadItem>;
  readonly itemsView?: V2TurnStartResponse__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: V2TurnStartResponse__TurnStatus;
};
export const V2TurnStartResponse__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([V2TurnStartResponse__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(V2TurnStartResponse__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2TurnStartResponse__TurnItemsView> => V2TurnStartResponse__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: V2TurnStartResponse__TurnStatus,
}).annotate({ identifier: "V2TurnStartResponse__Turn" });

export type McpServerElicitationRequestParams__McpElicitationPrimitiveSchema =
  | McpServerElicitationRequestParams__McpElicitationEnumSchema
  | McpServerElicitationRequestParams__McpElicitationStringSchema
  | McpServerElicitationRequestParams__McpElicitationNumberSchema
  | McpServerElicitationRequestParams__McpElicitationBooleanSchema;
export const McpServerElicitationRequestParams__McpElicitationPrimitiveSchema = Schema.Union([
  McpServerElicitationRequestParams__McpElicitationEnumSchema,
  McpServerElicitationRequestParams__McpElicitationStringSchema,
  McpServerElicitationRequestParams__McpElicitationNumberSchema,
  McpServerElicitationRequestParams__McpElicitationBooleanSchema,
]).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationPrimitiveSchema" });

export type PermissionsRequestApprovalParams__RequestPermissionProfile = {
  readonly fileSystem?: PermissionsRequestApprovalParams__AdditionalFileSystemPermissions | null;
  readonly network?: PermissionsRequestApprovalParams__AdditionalNetworkPermissions | null;
};
export const PermissionsRequestApprovalParams__RequestPermissionProfile = Schema.Struct({
  fileSystem: Schema.optionalKey(
    Schema.Union([PermissionsRequestApprovalParams__AdditionalFileSystemPermissions, Schema.Null]),
  ),
  network: Schema.optionalKey(
    Schema.Union([PermissionsRequestApprovalParams__AdditionalNetworkPermissions, Schema.Null]),
  ),
}).annotate({ identifier: "PermissionsRequestApprovalParams__RequestPermissionProfile" });

export type PermissionsRequestApprovalResponse__GrantedPermissionProfile = {
  readonly fileSystem?: PermissionsRequestApprovalResponse__AdditionalFileSystemPermissions | null;
  readonly network?: PermissionsRequestApprovalResponse__AdditionalNetworkPermissions | null;
};
export const PermissionsRequestApprovalResponse__GrantedPermissionProfile = Schema.Struct({
  fileSystem: Schema.optionalKey(
    Schema.Union([
      PermissionsRequestApprovalResponse__AdditionalFileSystemPermissions,
      Schema.Null,
    ]),
  ),
  network: Schema.optionalKey(
    Schema.Union([PermissionsRequestApprovalResponse__AdditionalNetworkPermissions, Schema.Null]),
  ),
}).annotate({ identifier: "PermissionsRequestApprovalResponse__GrantedPermissionProfile" });

export type ServerNotification__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: ServerNotification__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: ServerNotification__GitInfo | null;
  readonly historyMode?: ServerNotification__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: ServerNotification__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: ServerNotification__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: ServerNotification__SessionSource;
  readonly status: ServerNotification__ThreadStatus;
  readonly threadSource?: ServerNotification__ThreadSource | null;
  readonly turns: ReadonlyArray<ServerNotification__Turn>;
  readonly updatedAt: number;
};
export const ServerNotification__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<ServerNotification__AbsolutePathBuf> => ServerNotification__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([ServerNotification__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<ServerNotification__ThreadHistoryMode> =>
        ServerNotification__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([ServerNotification__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([ServerNotification__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<ServerNotification__SessionSource> => ServerNotification__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<ServerNotification__ThreadStatus> => ServerNotification__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([ServerNotification__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(ServerNotification__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "ServerNotification__Thread" });

export type ServerNotification__TurnStartedNotification = {
  readonly threadId: string;
  readonly turn: ServerNotification__Turn;
};
export const ServerNotification__TurnStartedNotification = Schema.Struct({
  threadId: Schema.String,
  turn: ServerNotification__Turn,
}).annotate({ identifier: "ServerNotification__TurnStartedNotification" });

export type ServerNotification__TurnCompletedNotification = {
  readonly threadId: string;
  readonly turn: ServerNotification__Turn;
};
export const ServerNotification__TurnCompletedNotification = Schema.Struct({
  threadId: Schema.String,
  turn: ServerNotification__Turn,
}).annotate({ identifier: "ServerNotification__TurnCompletedNotification" });

export type ServerNotification__RequestPermissionProfile = {
  readonly fileSystem?: ServerNotification__AdditionalFileSystemPermissions | null;
  readonly network?: ServerNotification__AdditionalNetworkPermissions | null;
};
export const ServerNotification__RequestPermissionProfile = Schema.Struct({
  fileSystem: Schema.optionalKey(
    Schema.Union([ServerNotification__AdditionalFileSystemPermissions, Schema.Null]),
  ),
  network: Schema.optionalKey(
    Schema.Union([ServerNotification__AdditionalNetworkPermissions, Schema.Null]),
  ),
}).annotate({ identifier: "ServerNotification__RequestPermissionProfile" });

export type ServerRequest__RequestPermissionProfile = {
  readonly fileSystem?: ServerRequest__AdditionalFileSystemPermissions | null;
  readonly network?: ServerRequest__AdditionalNetworkPermissions | null;
};
export const ServerRequest__RequestPermissionProfile = Schema.Struct({
  fileSystem: Schema.optionalKey(
    Schema.Union([ServerRequest__AdditionalFileSystemPermissions, Schema.Null]),
  ),
  network: Schema.optionalKey(
    Schema.Union([ServerRequest__AdditionalNetworkPermissions, Schema.Null]),
  ),
}).annotate({ identifier: "ServerRequest__RequestPermissionProfile" });

export type ServerRequest__McpElicitationPrimitiveSchema =
  | ServerRequest__McpElicitationEnumSchema
  | ServerRequest__McpElicitationStringSchema
  | ServerRequest__McpElicitationNumberSchema
  | ServerRequest__McpElicitationBooleanSchema;
export const ServerRequest__McpElicitationPrimitiveSchema = Schema.Union([
  ServerRequest__McpElicitationEnumSchema,
  ServerRequest__McpElicitationStringSchema,
  ServerRequest__McpElicitationNumberSchema,
  ServerRequest__McpElicitationBooleanSchema,
]).annotate({ identifier: "ServerRequest__McpElicitationPrimitiveSchema" });

export type V2ItemGuardianApprovalReviewCompletedNotification__RequestPermissionProfile = {
  readonly fileSystem?: V2ItemGuardianApprovalReviewCompletedNotification__AdditionalFileSystemPermissions | null;
  readonly network?: V2ItemGuardianApprovalReviewCompletedNotification__AdditionalNetworkPermissions | null;
};
export const V2ItemGuardianApprovalReviewCompletedNotification__RequestPermissionProfile =
  Schema.Struct({
    fileSystem: Schema.optionalKey(
      Schema.Union([
        V2ItemGuardianApprovalReviewCompletedNotification__AdditionalFileSystemPermissions,
        Schema.Null,
      ]),
    ),
    network: Schema.optionalKey(
      Schema.Union([
        V2ItemGuardianApprovalReviewCompletedNotification__AdditionalNetworkPermissions,
        Schema.Null,
      ]),
    ),
  }).annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__RequestPermissionProfile",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__RequestPermissionProfile = {
  readonly fileSystem?: V2ItemGuardianApprovalReviewStartedNotification__AdditionalFileSystemPermissions | null;
  readonly network?: V2ItemGuardianApprovalReviewStartedNotification__AdditionalNetworkPermissions | null;
};
export const V2ItemGuardianApprovalReviewStartedNotification__RequestPermissionProfile =
  Schema.Struct({
    fileSystem: Schema.optionalKey(
      Schema.Union([
        V2ItemGuardianApprovalReviewStartedNotification__AdditionalFileSystemPermissions,
        Schema.Null,
      ]),
    ),
    network: Schema.optionalKey(
      Schema.Union([
        V2ItemGuardianApprovalReviewStartedNotification__AdditionalNetworkPermissions,
        Schema.Null,
      ]),
    ),
  }).annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__RequestPermissionProfile",
  });

export type V2ThreadForkResponse__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadForkResponse__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadForkResponse__GitInfo | null;
  readonly historyMode?: V2ThreadForkResponse__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadForkResponse__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadForkResponse__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadForkResponse__SessionSource;
  readonly status: V2ThreadForkResponse__ThreadStatus;
  readonly threadSource?: V2ThreadForkResponse__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadForkResponse__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadForkResponse__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadForkResponse__AbsolutePathBuf> =>
      V2ThreadForkResponse__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadForkResponse__ThreadHistoryMode> =>
        V2ThreadForkResponse__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadForkResponse__SessionSource> => V2ThreadForkResponse__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadForkResponse__ThreadStatus> => V2ThreadForkResponse__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadForkResponse__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadForkResponse__Thread" });

export type V2ThreadListResponse__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadListResponse__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadListResponse__GitInfo | null;
  readonly historyMode?: V2ThreadListResponse__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadListResponse__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadListResponse__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadListResponse__SessionSource;
  readonly status: V2ThreadListResponse__ThreadStatus;
  readonly threadSource?: V2ThreadListResponse__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadListResponse__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadListResponse__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadListResponse__AbsolutePathBuf> =>
      V2ThreadListResponse__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadListResponse__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadListResponse__ThreadHistoryMode> =>
        V2ThreadListResponse__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadListResponse__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadListResponse__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadListResponse__SessionSource> => V2ThreadListResponse__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadListResponse__ThreadStatus> => V2ThreadListResponse__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadListResponse__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadListResponse__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadListResponse__Thread" });

export type V2ThreadMetadataUpdateResponse__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadMetadataUpdateResponse__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadMetadataUpdateResponse__GitInfo | null;
  readonly historyMode?: V2ThreadMetadataUpdateResponse__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadMetadataUpdateResponse__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadMetadataUpdateResponse__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadMetadataUpdateResponse__SessionSource;
  readonly status: V2ThreadMetadataUpdateResponse__ThreadStatus;
  readonly threadSource?: V2ThreadMetadataUpdateResponse__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadMetadataUpdateResponse__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadMetadataUpdateResponse__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadMetadataUpdateResponse__AbsolutePathBuf> =>
      V2ThreadMetadataUpdateResponse__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadMetadataUpdateResponse__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadMetadataUpdateResponse__ThreadHistoryMode> =>
        V2ThreadMetadataUpdateResponse__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadMetadataUpdateResponse__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadMetadataUpdateResponse__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadMetadataUpdateResponse__SessionSource> =>
      V2ThreadMetadataUpdateResponse__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadMetadataUpdateResponse__ThreadStatus> =>
      V2ThreadMetadataUpdateResponse__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadMetadataUpdateResponse__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadMetadataUpdateResponse__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__Thread" });

export type V2ThreadReadResponse__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadReadResponse__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadReadResponse__GitInfo | null;
  readonly historyMode?: V2ThreadReadResponse__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadReadResponse__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadReadResponse__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadReadResponse__SessionSource;
  readonly status: V2ThreadReadResponse__ThreadStatus;
  readonly threadSource?: V2ThreadReadResponse__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadReadResponse__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadReadResponse__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadReadResponse__AbsolutePathBuf> =>
      V2ThreadReadResponse__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadReadResponse__ThreadHistoryMode> =>
        V2ThreadReadResponse__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadReadResponse__SessionSource> => V2ThreadReadResponse__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadReadResponse__ThreadStatus> => V2ThreadReadResponse__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadReadResponse__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadReadResponse__Thread" });
