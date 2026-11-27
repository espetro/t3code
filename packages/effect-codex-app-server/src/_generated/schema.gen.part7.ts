import * as Schema from "effect/Schema";
import {
  ClientRequest__CommandMigration,
  ClientRequest__ExternalAgentConfigMigrationItemType,
  ClientRequest__HookMigration,
  ClientRequest__McpServerMigration,
  ClientRequest__MergeStrategy,
  ClientRequest__PluginsMigration,
  ClientRequest__SessionMigration,
  ClientRequest__SkillMigration,
  ClientRequest__SubagentMigration,
  CommandExecutionRequestApprovalParams__LegacyAppPathString,
  CommandExecutionRequestApprovalParams__NetworkApprovalProtocol,
  CommandExecutionRequestApprovalParams__NetworkPolicyRuleAction,
  CommandExecutionRequestApprovalResponse__NetworkPolicyRuleAction,
  ExecCommandApprovalResponse__NetworkPolicyRuleAction,
  FuzzyFileSearchResponse__FuzzyFileSearchMatchType,
  FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchMatchType,
  JSONRPCMessage__JSONRPCErrorError,
  JSONRPCMessage__RequestId,
  JSONRPCMessage__W3cTraceContext,
  McpServerElicitationRequestParams__McpElicitationBooleanType,
  McpServerElicitationRequestParams__McpElicitationConstOption,
  McpServerElicitationRequestParams__McpElicitationNumberType,
  McpServerElicitationRequestParams__McpElicitationStringFormat,
  McpServerElicitationRequestParams__McpElicitationStringType,
  PermissionsRequestApprovalParams__LegacyAppPathString,
  PermissionsRequestApprovalResponse__LegacyAppPathString,
  ServerNotification__AbsolutePathBuf,
  ServerNotification__AgentPath,
  ServerNotification__ByteRange,
  ServerNotification__CollabAgentStatus,
  ServerNotification__ImageDetail,
  ServerNotification__LegacyAppPathString,
  ServerNotification__McpAppDisplayMode,
  ServerNotification__MemoryCitationEntry,
  ServerNotification__MisalignmentSteer,
  ServerNotification__NonSteerableTurnKind,
  ServerNotification__PatchChangeKind,
  ServerNotification__ReasoningEffort,
  ServerNotification__ThreadActiveFlag,
  ServerNotification__ThreadId,
  ServerNotification__ThreadSectionAppearance,
} from "./schema.gen.part0.ts";
import {
  ServerNotification__AppReview,
  ServerNotification__AppScreenshot,
  ServerNotification__AuthMode,
  ServerNotification__CommandExecOutputStream,
  ServerNotification__CreditsSnapshot,
  ServerNotification__DesktopOnboardingEntrypoint,
  ServerNotification__ExternalAgentConfigMigrationItemType,
  ServerNotification__FuzzyFileSearchMatchType,
  ServerNotification__GatewayOAuthStatus,
  ServerNotification__GuardianApprovalReviewStatus,
  ServerNotification__GuardianRiskLevel,
  ServerNotification__GuardianUserAuthorization,
  ServerNotification__HookOutputEntryKind,
  ServerNotification__McpServerEventNotification,
  ServerNotification__McpServerStartupFailureReason,
  ServerNotification__McpServerStartupState,
  ServerNotification__ModelRerouteReason,
  ServerNotification__ModelVerification,
  ServerNotification__NetworkAccess,
  ServerNotification__PlanType,
  ServerNotification__ProcessOutputStream,
  ServerNotification__ProjectChangeType,
  ServerNotification__RateLimitReachedType,
  ServerNotification__RateLimitWindow,
  ServerNotification__RealtimeConversationVersion,
  ServerNotification__RemoteControlConnectionStatus,
  ServerNotification__RequestId,
  ServerNotification__SpendControlLimitSnapshot,
  ServerNotification__TextPosition,
  ServerNotification__ThreadAttachmentOperation,
  ServerNotification__ThreadGoalStatus,
  ServerNotification__ThreadRealtimeAudioChunk,
  ServerNotification__ThreadRealtimeBemItemPresentation,
  ServerNotification__ThreadRealtimeSessionOutcome,
  ServerNotification__ThreadRealtimeTranscriptRole,
  ServerNotification__TokenUsageBreakdown,
  ServerNotification__TurnPlanStepStatus,
  ServerNotification__WindowsSandboxSetupMode,
  ServerRequest__ChatgptAuthTokensRefreshReason,
  ServerRequest__FileChange,
  ServerRequest__LegacyAppPathString,
  ServerRequest__McpElicitationBooleanType,
  ServerRequest__McpElicitationConstOption,
  ServerRequest__McpElicitationNumberType,
  ServerRequest__McpElicitationStringFormat,
  ServerRequest__McpElicitationStringType,
  ServerRequest__NetworkApprovalProtocol,
  ServerRequest__NetworkPolicyRuleAction,
  ServerRequest__ParsedCommand,
  ServerRequest__ThreadId,
  ServerRequest__ToolRequestUserInputOption,
  ToolRequestUserInputParams__ToolRequestUserInputOption,
  V2AccountRateLimitsUpdatedNotification__CreditsSnapshot,
  V2AccountRateLimitsUpdatedNotification__PlanType,
  V2AccountRateLimitsUpdatedNotification__RateLimitReachedType,
  V2AccountRateLimitsUpdatedNotification__RateLimitWindow,
  V2AccountRateLimitsUpdatedNotification__SpendControlLimitSnapshot,
  V2AppListUpdatedNotification__AppReview,
  V2AppListUpdatedNotification__AppScreenshot,
  V2AppsListResponse__AppReview,
  V2AppsListResponse__AppScreenshot,
  V2AppsReadResponse__AppToolSummary,
  V2CommandExecParams__AbsolutePathBuf,
  V2CommandExecParams__NetworkAccess,
  V2ConfigBatchWriteParams__MergeStrategy,
  V2ConfigReadResponse__AllowDenyRequirement,
  V2ConfigReadResponse__WebSearchContextSize,
  V2ConfigReadResponse__WebSearchLocation,
} from "./schema.gen.part1.ts";

export type ClientRequest__MigrationDetails = {
  readonly commands?: ReadonlyArray<ClientRequest__CommandMigration>;
  readonly hooks?: ReadonlyArray<ClientRequest__HookMigration>;
  readonly mcpServers?: ReadonlyArray<ClientRequest__McpServerMigration>;
  readonly memory?: ReadonlyArray<string>;
  readonly plugins?: ReadonlyArray<ClientRequest__PluginsMigration>;
  readonly sessions?: ReadonlyArray<ClientRequest__SessionMigration>;
  readonly skills?: ReadonlyArray<ClientRequest__SkillMigration>;
  readonly subagents?: ReadonlyArray<ClientRequest__SubagentMigration>;
};
export const ClientRequest__MigrationDetails = Schema.Struct({
  commands: Schema.optionalKey(
    Schema.Array(ClientRequest__CommandMigration).annotate({ default: [] }),
  ),
  hooks: Schema.optionalKey(Schema.Array(ClientRequest__HookMigration).annotate({ default: [] })),
  mcpServers: Schema.optionalKey(
    Schema.Array(ClientRequest__McpServerMigration).annotate({ default: [] }),
  ),
  memory: Schema.optionalKey(Schema.Array(Schema.String)),
  plugins: Schema.optionalKey(
    Schema.Array(ClientRequest__PluginsMigration).annotate({ default: [] }),
  ),
  sessions: Schema.optionalKey(
    Schema.Array(ClientRequest__SessionMigration).annotate({ default: [] }),
  ),
  skills: Schema.optionalKey(Schema.Array(ClientRequest__SkillMigration).annotate({ default: [] })),
  subagents: Schema.optionalKey(
    Schema.Array(ClientRequest__SubagentMigration).annotate({ default: [] }),
  ),
}).annotate({ identifier: "ClientRequest__MigrationDetails" });

export type ClientRequest__ExternalAgentConfigImportItemTypeFailure = {
  readonly cwd?: string | null;
  readonly errorType?: string | null;
  readonly failureStage: string;
  readonly itemType: ClientRequest__ExternalAgentConfigMigrationItemType;
  readonly message: string;
  readonly source?: string | null;
  readonly subErrorType?: string | null;
};
export const ClientRequest__ExternalAgentConfigImportItemTypeFailure = Schema.Struct({
  cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  errorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  failureStage: Schema.String,
  itemType: ClientRequest__ExternalAgentConfigMigrationItemType,
  message: Schema.String,
  source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  subErrorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ClientRequest__ExternalAgentConfigImportItemTypeFailure" });

export type ClientRequest__ExternalAgentConfigImportHistoryRecordSuccessParams = {
  readonly cwd?: string | null;
  readonly itemType: ClientRequest__ExternalAgentConfigMigrationItemType;
  readonly source?: string | null;
  readonly target?: string | null;
  readonly title?: string | null;
};
export const ClientRequest__ExternalAgentConfigImportHistoryRecordSuccessParams = Schema.Struct({
  cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  itemType: ClientRequest__ExternalAgentConfigMigrationItemType,
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
}).annotate({ identifier: "ClientRequest__ExternalAgentConfigImportHistoryRecordSuccessParams" });

export type ClientRequest__ConfigValueWriteParams = {
  readonly expectedVersion?: string | null;
  readonly filePath?: string | null;
  readonly keyPath: string;
  readonly mergeStrategy: ClientRequest__MergeStrategy;
  readonly value: Schema.Json;
};
export const ClientRequest__ConfigValueWriteParams = Schema.Struct({
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
  mergeStrategy: ClientRequest__MergeStrategy,
  value: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({ identifier: "ClientRequest__ConfigValueWriteParams" });

export type ClientRequest__ConfigEdit = {
  readonly keyPath: string;
  readonly mergeStrategy: ClientRequest__MergeStrategy;
  readonly value: Schema.Json;
};
export const ClientRequest__ConfigEdit = Schema.Struct({
  keyPath: Schema.String,
  mergeStrategy: ClientRequest__MergeStrategy,
  value: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({ identifier: "ClientRequest__ConfigEdit" });

export type CommandExecutionRequestApprovalParams__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: CommandExecutionRequestApprovalParams__LegacyAppPathString;
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
export const CommandExecutionRequestApprovalParams__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: CommandExecutionRequestApprovalParams__LegacyAppPathString,
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
).annotate({ identifier: "CommandExecutionRequestApprovalParams__CommandAction" });

export type CommandExecutionRequestApprovalParams__FileSystemSpecialPath =
  | { readonly kind: "root" }
  | { readonly kind: "minimal" }
  | {
      readonly kind: "project_roots";
      readonly subpath?: CommandExecutionRequestApprovalParams__LegacyAppPathString | null;
    }
  | { readonly kind: "tmpdir" }
  | { readonly kind: "slash_tmp" }
  | {
      readonly kind: "unknown";
      readonly path: string;
      readonly subpath?: CommandExecutionRequestApprovalParams__LegacyAppPathString | null;
    };
export const CommandExecutionRequestApprovalParams__FileSystemSpecialPath = Schema.Union(
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
        Schema.Union([CommandExecutionRequestApprovalParams__LegacyAppPathString, Schema.Null]),
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
        Schema.Union([CommandExecutionRequestApprovalParams__LegacyAppPathString, Schema.Null]),
      ),
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "CommandExecutionRequestApprovalParams__FileSystemSpecialPath" });

export type CommandExecutionRequestApprovalParams__NetworkApprovalContext = {
  readonly host: string;
  readonly protocol: CommandExecutionRequestApprovalParams__NetworkApprovalProtocol;
};
export const CommandExecutionRequestApprovalParams__NetworkApprovalContext = Schema.Struct({
  host: Schema.String,
  protocol: CommandExecutionRequestApprovalParams__NetworkApprovalProtocol,
}).annotate({ identifier: "CommandExecutionRequestApprovalParams__NetworkApprovalContext" });

export type CommandExecutionRequestApprovalParams__NetworkPolicyAmendment = {
  readonly action: CommandExecutionRequestApprovalParams__NetworkPolicyRuleAction;
  readonly host: string;
};
export const CommandExecutionRequestApprovalParams__NetworkPolicyAmendment = Schema.Struct({
  action: CommandExecutionRequestApprovalParams__NetworkPolicyRuleAction,
  host: Schema.String,
}).annotate({ identifier: "CommandExecutionRequestApprovalParams__NetworkPolicyAmendment" });

export type CommandExecutionRequestApprovalResponse__NetworkPolicyAmendment = {
  readonly action: CommandExecutionRequestApprovalResponse__NetworkPolicyRuleAction;
  readonly host: string;
};
export const CommandExecutionRequestApprovalResponse__NetworkPolicyAmendment = Schema.Struct({
  action: CommandExecutionRequestApprovalResponse__NetworkPolicyRuleAction,
  host: Schema.String,
}).annotate({ identifier: "CommandExecutionRequestApprovalResponse__NetworkPolicyAmendment" });

export type ExecCommandApprovalResponse__NetworkPolicyAmendment = {
  readonly action: ExecCommandApprovalResponse__NetworkPolicyRuleAction;
  readonly host: string;
};
export const ExecCommandApprovalResponse__NetworkPolicyAmendment = Schema.Struct({
  action: ExecCommandApprovalResponse__NetworkPolicyRuleAction,
  host: Schema.String,
}).annotate({ identifier: "ExecCommandApprovalResponse__NetworkPolicyAmendment" });

export type FuzzyFileSearchResponse__FuzzyFileSearchResult = {
  readonly file_name: string;
  readonly indices?: ReadonlyArray<number> | null;
  readonly match_type: FuzzyFileSearchResponse__FuzzyFileSearchMatchType;
  readonly path: string;
  readonly root: string;
  readonly score: number;
};
export const FuzzyFileSearchResponse__FuzzyFileSearchResult = Schema.Struct({
  file_name: Schema.String,
  indices: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.Number.annotate({ format: "uint32" })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          ),
      ),
      Schema.Null,
    ]),
  ),
  match_type: FuzzyFileSearchResponse__FuzzyFileSearchMatchType,
  path: Schema.String,
  root: Schema.String,
  score: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({
  description: "Superset of [`codex_file_search::FileMatch`]",
  identifier: "FuzzyFileSearchResponse__FuzzyFileSearchResult",
});

export type FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchResult = {
  readonly file_name: string;
  readonly indices?: ReadonlyArray<number> | null;
  readonly match_type: FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchMatchType;
  readonly path: string;
  readonly root: string;
  readonly score: number;
};
export const FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchResult = Schema.Struct({
  file_name: Schema.String,
  indices: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.Number.annotate({ format: "uint32" })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          ),
      ),
      Schema.Null,
    ]),
  ),
  match_type: FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchMatchType,
  path: Schema.String,
  root: Schema.String,
  score: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({
  description: "Superset of [`codex_file_search::FileMatch`]",
  identifier: "FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchResult",
});

export type JSONRPCMessage__JSONRPCResponse = {
  readonly id: JSONRPCMessage__RequestId;
  readonly result: Schema.Json;
};
export const JSONRPCMessage__JSONRPCResponse = Schema.Struct({
  id: JSONRPCMessage__RequestId,
  result: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({
  description: "A successful (non-error) response to a request.",
  identifier: "JSONRPCMessage__JSONRPCResponse",
});

export type JSONRPCMessage__JSONRPCRequest = {
  readonly id: JSONRPCMessage__RequestId;
  readonly method: string;
  readonly params?: Schema.Json;
  readonly trace?: JSONRPCMessage__W3cTraceContext | null;
};
export const JSONRPCMessage__JSONRPCRequest = Schema.Struct({
  id: JSONRPCMessage__RequestId,
  method: Schema.String,
  params: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  trace: Schema.optionalKey(
    Schema.Union([JSONRPCMessage__W3cTraceContext, Schema.Null]).annotate({
      description: "Optional W3C Trace Context for distributed tracing.",
    }),
  ),
}).annotate({
  description: "A request that expects a response.",
  identifier: "JSONRPCMessage__JSONRPCRequest",
});

export type JSONRPCMessage__JSONRPCError = {
  readonly error: JSONRPCMessage__JSONRPCErrorError;
  readonly id: JSONRPCMessage__RequestId;
};
export const JSONRPCMessage__JSONRPCError = Schema.Struct({
  error: JSONRPCMessage__JSONRPCErrorError,
  id: JSONRPCMessage__RequestId,
}).annotate({
  description: "A response to a request that indicates an error occurred.",
  identifier: "JSONRPCMessage__JSONRPCError",
});

export type McpServerElicitationRequestParams__McpElicitationUntitledSingleSelectEnumSchema = {
  readonly default?: string | null;
  readonly description?: string | null;
  readonly enum: ReadonlyArray<string>;
  readonly title?: string | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationStringType;
};
export const McpServerElicitationRequestParams__McpElicitationUntitledSingleSelectEnumSchema =
  Schema.Struct({
    default: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    enum: Schema.Array(Schema.String),
    title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    type: McpServerElicitationRequestParams__McpElicitationStringType,
  }).annotate({
    identifier: "McpServerElicitationRequestParams__McpElicitationUntitledSingleSelectEnumSchema",
  });

export type McpServerElicitationRequestParams__McpElicitationUntitledEnumItems = {
  readonly enum: ReadonlyArray<string>;
  readonly type: McpServerElicitationRequestParams__McpElicitationStringType;
};
export const McpServerElicitationRequestParams__McpElicitationUntitledEnumItems = Schema.Struct({
  enum: Schema.Array(Schema.String),
  type: McpServerElicitationRequestParams__McpElicitationStringType,
}).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationUntitledEnumItems" });

export type McpServerElicitationRequestParams__McpElicitationLegacyTitledEnumSchema = {
  readonly default?: string | null;
  readonly description?: string | null;
  readonly enum: ReadonlyArray<string>;
  readonly enumNames?: ReadonlyArray<string> | null;
  readonly title?: string | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationStringType;
};
export const McpServerElicitationRequestParams__McpElicitationLegacyTitledEnumSchema =
  Schema.Struct({
    default: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    enum: Schema.Array(Schema.String),
    enumNames: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    type: McpServerElicitationRequestParams__McpElicitationStringType,
  }).annotate({
    identifier: "McpServerElicitationRequestParams__McpElicitationLegacyTitledEnumSchema",
  });

export type McpServerElicitationRequestParams__McpElicitationTitledSingleSelectEnumSchema = {
  readonly default?: string | null;
  readonly description?: string | null;
  readonly oneOf: ReadonlyArray<McpServerElicitationRequestParams__McpElicitationConstOption>;
  readonly title?: string | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationStringType;
};
export const McpServerElicitationRequestParams__McpElicitationTitledSingleSelectEnumSchema =
  Schema.Struct({
    default: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    oneOf: Schema.Array(McpServerElicitationRequestParams__McpElicitationConstOption),
    title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    type: McpServerElicitationRequestParams__McpElicitationStringType,
  }).annotate({
    identifier: "McpServerElicitationRequestParams__McpElicitationTitledSingleSelectEnumSchema",
  });

export type McpServerElicitationRequestParams__McpElicitationTitledEnumItems = {
  readonly anyOf: ReadonlyArray<McpServerElicitationRequestParams__McpElicitationConstOption>;
};
export const McpServerElicitationRequestParams__McpElicitationTitledEnumItems = Schema.Struct({
  anyOf: Schema.Array(McpServerElicitationRequestParams__McpElicitationConstOption),
}).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationTitledEnumItems" });

export type McpServerElicitationRequestParams__McpElicitationStringSchema = {
  readonly default?: string | null;
  readonly description?: string | null;
  readonly format?: McpServerElicitationRequestParams__McpElicitationStringFormat | null;
  readonly maxLength?: number | null;
  readonly minLength?: number | null;
  readonly title?: string | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationStringType;
};
export const McpServerElicitationRequestParams__McpElicitationStringSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  format: Schema.optionalKey(
    Schema.Union([McpServerElicitationRequestParams__McpElicitationStringFormat, Schema.Null]),
  ),
  maxLength: Schema.optionalKey(
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
  minLength: Schema.optionalKey(
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
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: McpServerElicitationRequestParams__McpElicitationStringType,
}).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationStringSchema" });

export type McpServerElicitationRequestParams__McpElicitationNumberSchema = {
  readonly default?: number | null;
  readonly description?: string | null;
  readonly maximum?: number | null;
  readonly minimum?: number | null;
  readonly title?: string | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationNumberType;
};
export const McpServerElicitationRequestParams__McpElicitationNumberSchema = Schema.Struct({
  default: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  maximum: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
      Schema.Null,
    ]),
  ),
  minimum: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
      Schema.Null,
    ]),
  ),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: McpServerElicitationRequestParams__McpElicitationNumberType,
}).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationNumberSchema" });

export type McpServerElicitationRequestParams__McpElicitationBooleanSchema = {
  readonly default?: boolean | null;
  readonly description?: string | null;
  readonly title?: string | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationBooleanType;
};
export const McpServerElicitationRequestParams__McpElicitationBooleanSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: McpServerElicitationRequestParams__McpElicitationBooleanType,
}).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationBooleanSchema" });

export type PermissionsRequestApprovalParams__FileSystemSpecialPath =
  | { readonly kind: "root" }
  | { readonly kind: "minimal" }
  | {
      readonly kind: "project_roots";
      readonly subpath?: PermissionsRequestApprovalParams__LegacyAppPathString | null;
    }
  | { readonly kind: "tmpdir" }
  | { readonly kind: "slash_tmp" }
  | {
      readonly kind: "unknown";
      readonly path: string;
      readonly subpath?: PermissionsRequestApprovalParams__LegacyAppPathString | null;
    };
export const PermissionsRequestApprovalParams__FileSystemSpecialPath = Schema.Union(
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
        Schema.Union([PermissionsRequestApprovalParams__LegacyAppPathString, Schema.Null]),
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
        Schema.Union([PermissionsRequestApprovalParams__LegacyAppPathString, Schema.Null]),
      ),
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "PermissionsRequestApprovalParams__FileSystemSpecialPath" });

export type PermissionsRequestApprovalResponse__FileSystemSpecialPath =
  | { readonly kind: "root" }
  | { readonly kind: "minimal" }
  | {
      readonly kind: "project_roots";
      readonly subpath?: PermissionsRequestApprovalResponse__LegacyAppPathString | null;
    }
  | { readonly kind: "tmpdir" }
  | { readonly kind: "slash_tmp" }
  | {
      readonly kind: "unknown";
      readonly path: string;
      readonly subpath?: PermissionsRequestApprovalResponse__LegacyAppPathString | null;
    };
export const PermissionsRequestApprovalResponse__FileSystemSpecialPath = Schema.Union(
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
        Schema.Union([PermissionsRequestApprovalResponse__LegacyAppPathString, Schema.Null]),
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
        Schema.Union([PermissionsRequestApprovalResponse__LegacyAppPathString, Schema.Null]),
      ),
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "PermissionsRequestApprovalResponse__FileSystemSpecialPath" });

export type ServerNotification__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: ServerNotification__NonSteerableTurnKind;
      };
    };
export const ServerNotification__CodexErrorInfo = Schema.Union(
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
      activeTurnNotSteerable: Schema.Struct({ turnKind: ServerNotification__NonSteerableTurnKind }),
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
  identifier: "ServerNotification__CodexErrorInfo",
});

export type ServerNotification__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: ServerNotification__MisalignmentSteer | null;
};
export const ServerNotification__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([ServerNotification__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "ServerNotification__MisalignmentErrorDetails" });

export type ServerNotification__FsChangedNotification = {
  readonly changedPaths: ReadonlyArray<ServerNotification__AbsolutePathBuf>;
  readonly watchId: string;
};
export const ServerNotification__FsChangedNotification = Schema.Struct({
  changedPaths: Schema.Array(ServerNotification__AbsolutePathBuf).annotate({
    description: "File or directory paths associated with this event.",
  }),
  watchId: Schema.String.annotate({
    description: "Watch identifier previously provided to `fs/watch`.",
  }),
}).annotate({
  description: "Filesystem watch notification emitted for `fs/watch` subscribers.",
  identifier: "ServerNotification__FsChangedNotification",
});

export type ServerNotification__Settings = {
  readonly developer_instructions?: string | null;
  readonly model: string;
  readonly reasoning_effort?: ServerNotification__ReasoningEffort | null;
};
export const ServerNotification__Settings = Schema.Struct({
  developer_instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  model: Schema.String,
  reasoning_effort: Schema.optionalKey(
    Schema.Union([ServerNotification__ReasoningEffort, Schema.Null]),
  ),
}).annotate({
  description: "Settings for a collaboration mode.",
  identifier: "ServerNotification__Settings",
});

export type ServerNotification__ThreadSection = {
  readonly appearance?: ServerNotification__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const ServerNotification__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([ServerNotification__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "ServerNotification__ThreadSection",
});

export type ServerNotification__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: ServerNotification__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: ServerNotification__ThreadId;
      };
    }
  | { readonly other: string };
export const ServerNotification__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(Schema.Union([ServerNotification__AgentPath, Schema.Null])),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: ServerNotification__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__SubAgentSource" });

export type ServerNotification__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<ServerNotification__ThreadActiveFlag>;
      readonly type: "active";
    };
export const ServerNotification__ThreadStatus = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("notLoaded").annotate({ title: "NotLoadedThreadStatusType" }),
    }).annotate({ title: "NotLoadedThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("idle").annotate({ title: "IdleThreadStatusType" }),
    }).annotate({ title: "IdleThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("systemError").annotate({ title: "SystemErrorThreadStatusType" }),
    }).annotate({ title: "SystemErrorThreadStatus" }),
    Schema.Struct({
      activeFlags: Schema.Array(ServerNotification__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__ThreadStatus" });

export type ServerNotification__TextElement = {
  readonly byteRange: ServerNotification__ByteRange;
  readonly placeholder?: string | null;
};
export const ServerNotification__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<ServerNotification__ByteRange> => ServerNotification__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ServerNotification__TextElement" });

export type ServerNotification__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: ServerNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: ServerNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const ServerNotification__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ServerNotification__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ServerNotification__ImageDetail, Schema.Null])),
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
  identifier: "ServerNotification__FunctionCallOutputContentItem",
});

export type ServerNotification__MemoryCitation = {
  readonly entries: ReadonlyArray<ServerNotification__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const ServerNotification__MemoryCitation = Schema.Struct({
  entries: Schema.Array(ServerNotification__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "ServerNotification__MemoryCitation" });

export type ServerNotification__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: ServerNotification__LegacyAppPathString;
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
export const ServerNotification__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: ServerNotification__LegacyAppPathString,
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
).annotate({ identifier: "ServerNotification__CommandAction" });

export type ServerNotification__FileSystemSpecialPath =
  | { readonly kind: "root" }
  | { readonly kind: "minimal" }
  | {
      readonly kind: "project_roots";
      readonly subpath?: ServerNotification__LegacyAppPathString | null;
    }
  | { readonly kind: "tmpdir" }
  | { readonly kind: "slash_tmp" }
  | {
      readonly kind: "unknown";
      readonly path: string;
      readonly subpath?: ServerNotification__LegacyAppPathString | null;
    };
export const ServerNotification__FileSystemSpecialPath = Schema.Union(
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
        Schema.Union([ServerNotification__LegacyAppPathString, Schema.Null]),
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
        Schema.Union([ServerNotification__LegacyAppPathString, Schema.Null]),
      ),
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__FileSystemSpecialPath" });

export type ServerNotification__FileUpdateChange = {
  readonly diff: string;
  readonly kind: ServerNotification__PatchChangeKind;
  readonly path: string;
};
export const ServerNotification__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: ServerNotification__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "ServerNotification__FileUpdateChange" });

export type ServerNotification__McpAppUi = {
  readonly preferredModelDisplayMode: ServerNotification__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const ServerNotification__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: ServerNotification__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "ServerNotification__McpAppUi",
});

export type ServerNotification__CollabAgentState = {
  readonly message?: string | null;
  readonly status: ServerNotification__CollabAgentStatus;
};
export const ServerNotification__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: ServerNotification__CollabAgentStatus,
}).annotate({ identifier: "ServerNotification__CollabAgentState" });

export type ServerNotification__ThreadAttachmentUpdatedNotification = {
  readonly attachmentId: string;
  readonly attachmentType: string;
  readonly identityKey: string;
  readonly operation: ServerNotification__ThreadAttachmentOperation;
  readonly threadId: string;
};
export const ServerNotification__ThreadAttachmentUpdatedNotification = Schema.Struct({
  attachmentId: Schema.String,
  attachmentType: Schema.String,
  identityKey: Schema.String,
  operation: ServerNotification__ThreadAttachmentOperation,
  threadId: Schema.String,
}).annotate({
  description: "Notification published after a thread attachment is created or deleted.",
  identifier: "ServerNotification__ThreadAttachmentUpdatedNotification",
});

export type ServerNotification__ThreadGoal = {
  readonly createdAt: number;
  readonly objective: string;
  readonly status: ServerNotification__ThreadGoalStatus;
  readonly threadId: string;
  readonly timeUsedSeconds: number;
  readonly tokenBudget?: number | null;
  readonly tokensUsed: number;
  readonly updatedAt: number;
};
export const ServerNotification__ThreadGoal = Schema.Struct({
  createdAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  objective: Schema.String,
  status: ServerNotification__ThreadGoalStatus,
  threadId: Schema.String,
  timeUsedSeconds: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  tokenBudget: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  tokensUsed: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  updatedAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
}).annotate({ identifier: "ServerNotification__ThreadGoal" });

export type ServerNotification__ProjectChangedNotification = {
  readonly changeType: ServerNotification__ProjectChangeType;
  readonly projectId: string;
};
export const ServerNotification__ProjectChangedNotification = Schema.Struct({
  changeType: ServerNotification__ProjectChangeType,
  projectId: Schema.String,
}).annotate({ identifier: "ServerNotification__ProjectChangedNotification" });

export type ServerNotification__SandboxPolicy =
  | { readonly type: "dangerFullAccess" }
  | { readonly networkAccess?: boolean; readonly type: "readOnly" }
  | { readonly networkAccess?: ServerNotification__NetworkAccess; readonly type: "externalSandbox" }
  | {
      readonly excludeSlashTmp?: boolean;
      readonly excludeTmpdirEnvVar?: boolean;
      readonly networkAccess?: boolean;
      readonly type: "workspaceWrite";
      readonly writableRoots?: ReadonlyArray<ServerNotification__AbsolutePathBuf>;
    };
export const ServerNotification__SandboxPolicy = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("dangerFullAccess").annotate({
        title: "DangerFullAccessSandboxPolicyType",
      }),
    }).annotate({ title: "DangerFullAccessSandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("readOnly").annotate({ title: "ReadOnlySandboxPolicyType" }),
    }).annotate({ title: "ReadOnlySandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<ServerNotification__NetworkAccess> => ServerNotification__NetworkAccess,
        ).annotate({ default: "restricted" }),
      ),
      type: Schema.Literal("externalSandbox").annotate({
        title: "ExternalSandboxSandboxPolicyType",
      }),
    }).annotate({ title: "ExternalSandboxSandboxPolicy" }),
    Schema.Struct({
      excludeSlashTmp: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      excludeTmpdirEnvVar: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("workspaceWrite").annotate({ title: "WorkspaceWriteSandboxPolicyType" }),
      writableRoots: Schema.optionalKey(
        Schema.Array(ServerNotification__AbsolutePathBuf).annotate({ default: [] }),
      ),
    }).annotate({ title: "WorkspaceWriteSandboxPolicy" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__SandboxPolicy" });

export type ServerNotification__ThreadTokenUsage = {
  readonly last: ServerNotification__TokenUsageBreakdown;
  readonly modelContextWindow?: number | null;
  readonly total: ServerNotification__TokenUsageBreakdown;
};
export const ServerNotification__ThreadTokenUsage = Schema.Struct({
  last: ServerNotification__TokenUsageBreakdown,
  modelContextWindow: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  total: ServerNotification__TokenUsageBreakdown,
}).annotate({ identifier: "ServerNotification__ThreadTokenUsage" });

export type ServerNotification__HookOutputEntry = {
  readonly kind: ServerNotification__HookOutputEntryKind;
  readonly text: string;
};
export const ServerNotification__HookOutputEntry = Schema.Struct({
  kind: ServerNotification__HookOutputEntryKind,
  text: Schema.String,
}).annotate({ identifier: "ServerNotification__HookOutputEntry" });

export type ServerNotification__TurnPlanStep = {
  readonly status: ServerNotification__TurnPlanStepStatus;
  readonly step: string;
};
export const ServerNotification__TurnPlanStep = Schema.Struct({
  status: ServerNotification__TurnPlanStepStatus,
  step: Schema.String,
}).annotate({ identifier: "ServerNotification__TurnPlanStep" });

export type ServerNotification__GuardianApprovalReview = {
  readonly rationale?: string | null;
  readonly riskLevel?: ServerNotification__GuardianRiskLevel | null;
  readonly status: ServerNotification__GuardianApprovalReviewStatus;
  readonly userAuthorization?: ServerNotification__GuardianUserAuthorization | null;
};
export const ServerNotification__GuardianApprovalReview = Schema.Struct({
  rationale: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  riskLevel: Schema.optionalKey(Schema.Union([ServerNotification__GuardianRiskLevel, Schema.Null])),
  status: ServerNotification__GuardianApprovalReviewStatus,
  userAuthorization: Schema.optionalKey(
    Schema.Union([ServerNotification__GuardianUserAuthorization, Schema.Null]),
  ),
}).annotate({
  description:
    "[UNSTABLE] Temporary approval auto-review payload used by `item/autoApprovalReview/*` notifications. This shape is expected to change soon.",
  identifier: "ServerNotification__GuardianApprovalReview",
});

export type ServerNotification__CommandExecOutputDeltaNotification = {
  readonly capReached: boolean;
  readonly deltaBase64: string;
  readonly processId: string;
  readonly stream: ServerNotification__CommandExecOutputStream;
};
export const ServerNotification__CommandExecOutputDeltaNotification = Schema.Struct({
  capReached: Schema.Boolean.annotate({
    description:
      "`true` on the final streamed chunk for a stream when `outputBytesCap` truncated later output on that stream.",
  }),
  deltaBase64: Schema.String.annotate({ description: "Base64-encoded output bytes." }),
  processId: Schema.String.annotate({
    description:
      "Client-supplied, connection-scoped `processId` from the original `command/exec` request.",
  }),
  stream: Schema.suspend(
    (): Schema.Codec<ServerNotification__CommandExecOutputStream> =>
      ServerNotification__CommandExecOutputStream,
  ).annotate({ description: "Output stream for this chunk." }),
}).annotate({
  description:
    "Base64-encoded output chunk emitted for a streaming `command/exec` request.\n\nThese notifications are connection-scoped. If the originating connection closes, the server terminates the process.",
  identifier: "ServerNotification__CommandExecOutputDeltaNotification",
});

export type ServerNotification__ProcessOutputDeltaNotification = {
  readonly capReached: boolean;
  readonly deltaBase64: string;
  readonly processHandle: string;
  readonly stream: ServerNotification__ProcessOutputStream;
};
export const ServerNotification__ProcessOutputDeltaNotification = Schema.Struct({
  capReached: Schema.Boolean.annotate({
    description:
      "True on the final streamed chunk for this stream when output was truncated by `outputBytesCap`.",
  }),
  deltaBase64: Schema.String.annotate({ description: "Base64-encoded output bytes." }),
  processHandle: Schema.String.annotate({
    description: "Client-supplied, connection-scoped `processHandle` from `process/spawn`.",
  }),
  stream: Schema.suspend(
    (): Schema.Codec<ServerNotification__ProcessOutputStream> =>
      ServerNotification__ProcessOutputStream,
  ).annotate({ description: "Output stream this chunk belongs to." }),
}).annotate({
  description: "Base64-encoded output chunk emitted for a streaming `process/spawn` request.",
  identifier: "ServerNotification__ProcessOutputDeltaNotification",
});

export type ServerNotification__ServerRequestResolvedNotification = {
  readonly requestId: ServerNotification__RequestId;
  readonly threadId: string;
};
export const ServerNotification__ServerRequestResolvedNotification = Schema.Struct({
  requestId: ServerNotification__RequestId,
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ServerRequestResolvedNotification" });

export type ServerNotification__McpServerStatusUpdatedNotification = {
  readonly error?: string | null;
  readonly failureReason?: ServerNotification__McpServerStartupFailureReason | null;
  readonly name: string;
  readonly status: ServerNotification__McpServerStartupState;
  readonly threadId?: string | null;
};
export const ServerNotification__McpServerStatusUpdatedNotification = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  failureReason: Schema.optionalKey(
    Schema.Union([ServerNotification__McpServerStartupFailureReason, Schema.Null]),
  ),
  name: Schema.String,
  status: ServerNotification__McpServerStartupState,
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__McpServerStatusUpdatedNotification" });

export type ServerNotification__McpServerEventStreamNotification = {
  readonly notification: ServerNotification__McpServerEventNotification;
  readonly subscriptionId: string;
};
export const ServerNotification__McpServerEventStreamNotification = Schema.Struct({
  notification: ServerNotification__McpServerEventNotification,
  subscriptionId: Schema.String,
}).annotate({ identifier: "ServerNotification__McpServerEventStreamNotification" });

export type ServerNotification__AccountUpdatedNotification = {
  readonly authMode?: ServerNotification__AuthMode | null;
  readonly planType?: ServerNotification__PlanType | null;
};
export const ServerNotification__AccountUpdatedNotification = Schema.Struct({
  authMode: Schema.optionalKey(Schema.Union([ServerNotification__AuthMode, Schema.Null])),
  planType: Schema.optionalKey(Schema.Union([ServerNotification__PlanType, Schema.Null])),
}).annotate({ identifier: "ServerNotification__AccountUpdatedNotification" });

export type ServerNotification__GatewayOAuthChangedNotification = {
  readonly authUrl?: string | null;
  readonly error?: string | null;
  readonly providerId: string;
  readonly status: ServerNotification__GatewayOAuthStatus;
};
export const ServerNotification__GatewayOAuthChangedNotification = Schema.Struct({
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
  status: ServerNotification__GatewayOAuthStatus,
}).annotate({ identifier: "ServerNotification__GatewayOAuthChangedNotification" });

export type ServerNotification__RateLimitSnapshot = {
  readonly credits?: ServerNotification__CreditsSnapshot | null;
  readonly individualLimit?: ServerNotification__SpendControlLimitSnapshot | null;
  readonly limitId?: string | null;
  readonly limitName?: string | null;
  readonly normalModelSlug?: string | null;
  readonly planType?: ServerNotification__PlanType | null;
  readonly primary?: ServerNotification__RateLimitWindow | null;
  readonly rateLimitReachedType?: ServerNotification__RateLimitReachedType | null;
  readonly secondary?: ServerNotification__RateLimitWindow | null;
  readonly spendControlReached?: boolean | null;
};
export const ServerNotification__RateLimitSnapshot = Schema.Struct({
  credits: Schema.optionalKey(Schema.Union([ServerNotification__CreditsSnapshot, Schema.Null])),
  individualLimit: Schema.optionalKey(
    Schema.Union([ServerNotification__SpendControlLimitSnapshot, Schema.Null]),
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
  planType: Schema.optionalKey(Schema.Union([ServerNotification__PlanType, Schema.Null])),
  primary: Schema.optionalKey(Schema.Union([ServerNotification__RateLimitWindow, Schema.Null])),
  rateLimitReachedType: Schema.optionalKey(
    Schema.Union([ServerNotification__RateLimitReachedType, Schema.Null]),
  ),
  secondary: Schema.optionalKey(Schema.Union([ServerNotification__RateLimitWindow, Schema.Null])),
  spendControlReached: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description:
          "Backend-reported spend-control state. `None` is unavailable, not a sparse-update recovery.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ServerNotification__RateLimitSnapshot" });

export type ServerNotification__AppMetadata = {
  readonly categories?: ReadonlyArray<string> | null;
  readonly developer?: string | null;
  readonly firstPartyRequiresInstall?: boolean | null;
  readonly review?: ServerNotification__AppReview | null;
  readonly screenshots?: ReadonlyArray<ServerNotification__AppScreenshot> | null;
  readonly seoDescription?: string | null;
  readonly showInComposerWhenUnlinked?: boolean | null;
  readonly subCategories?: ReadonlyArray<string> | null;
  readonly version?: string | null;
  readonly versionId?: string | null;
  readonly versionNotes?: string | null;
};
export const ServerNotification__AppMetadata = Schema.Struct({
  categories: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  developer: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  firstPartyRequiresInstall: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  review: Schema.optionalKey(Schema.Union([ServerNotification__AppReview, Schema.Null])),
  screenshots: Schema.optionalKey(
    Schema.Union([Schema.Array(ServerNotification__AppScreenshot), Schema.Null]),
  ),
  seoDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  showInComposerWhenUnlinked: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  subCategories: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  version: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  versionId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  versionNotes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__AppMetadata" });

export type ServerNotification__RemoteControlStatusChangedNotification = {
  readonly environmentId?: string | null;
  readonly installationId: string;
  readonly serverName: string;
  readonly status: ServerNotification__RemoteControlConnectionStatus;
};
export const ServerNotification__RemoteControlStatusChangedNotification = Schema.Struct({
  environmentId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  installationId: Schema.String,
  serverName: Schema.String,
  status: ServerNotification__RemoteControlConnectionStatus,
}).annotate({
  description: "Current remote-control connection status and remote identity exposed to clients.",
  identifier: "ServerNotification__RemoteControlStatusChangedNotification",
});

export type ServerNotification__ExternalAgentConfigImportItemTypeFailure = {
  readonly cwd?: string | null;
  readonly errorType?: string | null;
  readonly failureStage: string;
  readonly itemType: ServerNotification__ExternalAgentConfigMigrationItemType;
  readonly message: string;
  readonly source?: string | null;
  readonly subErrorType?: string | null;
};
export const ServerNotification__ExternalAgentConfigImportItemTypeFailure = Schema.Struct({
  cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  errorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  failureStage: Schema.String,
  itemType: ServerNotification__ExternalAgentConfigMigrationItemType,
  message: Schema.String,
  source: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  subErrorType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__ExternalAgentConfigImportItemTypeFailure" });

export type ServerNotification__ExternalAgentConfigImportItemTypeSuccess = {
  readonly cwd?: string | null;
  readonly itemType: ServerNotification__ExternalAgentConfigMigrationItemType;
  readonly source?: string | null;
  readonly target?: string | null;
  readonly title?: string | null;
};
export const ServerNotification__ExternalAgentConfigImportItemTypeSuccess = Schema.Struct({
  cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  itemType: ServerNotification__ExternalAgentConfigMigrationItemType,
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
}).annotate({ identifier: "ServerNotification__ExternalAgentConfigImportItemTypeSuccess" });

export type ServerNotification__ModelReroutedNotification = {
  readonly fromModel: string;
  readonly reason: ServerNotification__ModelRerouteReason;
  readonly threadId: string;
  readonly toModel: string;
  readonly turnId: string;
};
export const ServerNotification__ModelReroutedNotification = Schema.Struct({
  fromModel: Schema.String,
  reason: ServerNotification__ModelRerouteReason,
  threadId: Schema.String,
  toModel: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__ModelReroutedNotification" });

export type ServerNotification__ModelVerificationNotification = {
  readonly threadId: string;
  readonly turnId: string;
  readonly verifications: ReadonlyArray<ServerNotification__ModelVerification>;
};
export const ServerNotification__ModelVerificationNotification = Schema.Struct({
  threadId: Schema.String,
  turnId: Schema.String,
  verifications: Schema.Array(ServerNotification__ModelVerification),
}).annotate({ identifier: "ServerNotification__ModelVerificationNotification" });

export type ServerNotification__TextRange = {
  readonly end: ServerNotification__TextPosition;
  readonly start: ServerNotification__TextPosition;
};
export const ServerNotification__TextRange = Schema.Struct({
  end: ServerNotification__TextPosition,
  start: ServerNotification__TextPosition,
}).annotate({ identifier: "ServerNotification__TextRange" });

export type ServerNotification__FuzzyFileSearchResult = {
  readonly file_name: string;
  readonly indices?: ReadonlyArray<number> | null;
  readonly match_type: ServerNotification__FuzzyFileSearchMatchType;
  readonly path: string;
  readonly root: string;
  readonly score: number;
};
export const ServerNotification__FuzzyFileSearchResult = Schema.Struct({
  file_name: Schema.String,
  indices: Schema.optionalKey(
    Schema.Union([
      Schema.Array(
        Schema.Number.annotate({ format: "uint32" })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          ),
      ),
      Schema.Null,
    ]),
  ),
  match_type: ServerNotification__FuzzyFileSearchMatchType,
  path: Schema.String,
  root: Schema.String,
  score: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({
  description: "Superset of [`codex_file_search::FileMatch`]",
  identifier: "ServerNotification__FuzzyFileSearchResult",
});

export type ServerNotification__ThreadRealtimeStartedNotification = {
  readonly realtimeSessionId?: string | null;
  readonly threadId: string;
  readonly version: ServerNotification__RealtimeConversationVersion;
};
export const ServerNotification__ThreadRealtimeStartedNotification = Schema.Struct({
  realtimeSessionId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
  version: ServerNotification__RealtimeConversationVersion,
}).annotate({
  description: "EXPERIMENTAL - emitted when thread realtime startup is accepted.",
  identifier: "ServerNotification__ThreadRealtimeStartedNotification",
});

export type ServerNotification__ThreadRealtimeItem =
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly type: "realtimeSessionStarted";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly role: ServerNotification__ThreadRealtimeTranscriptRole;
      readonly text: string;
      readonly type: "transcriptSegment";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly item_id: string;
      readonly presentation: ServerNotification__ThreadRealtimeBemItemPresentation;
      readonly turn_id: string;
      readonly type: "bemItemPromoted";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly outcome: ServerNotification__ThreadRealtimeSessionOutcome;
      readonly type: "realtimeSessionClosed";
    };
export const ServerNotification__ThreadRealtimeItem = Schema.Union(
  [
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      type: Schema.Literal("realtimeSessionStarted").annotate({
        title: "RealtimeSessionStartedThreadRealtimeItemType",
      }),
    }).annotate({ title: "RealtimeSessionStartedThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      role: ServerNotification__ThreadRealtimeTranscriptRole,
      text: Schema.String,
      type: Schema.Literal("transcriptSegment").annotate({
        title: "TranscriptSegmentThreadRealtimeItemType",
      }),
    }).annotate({ title: "TranscriptSegmentThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      item_id: Schema.String,
      presentation: ServerNotification__ThreadRealtimeBemItemPresentation,
      turn_id: Schema.String,
      type: Schema.Literal("bemItemPromoted").annotate({
        title: "BemItemPromotedThreadRealtimeItemType",
      }),
    }).annotate({ title: "BemItemPromotedThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      outcome: ServerNotification__ThreadRealtimeSessionOutcome,
      type: Schema.Literal("realtimeSessionClosed").annotate({
        title: "RealtimeSessionClosedThreadRealtimeItemType",
      }),
    }).annotate({ title: "RealtimeSessionClosedThreadRealtimeItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "EXPERIMENTAL - a thread-scoped realtime item in the canonical timeline.",
  identifier: "ServerNotification__ThreadRealtimeItem",
});

export type ServerNotification__ThreadRealtimeOutputAudioDeltaNotification = {
  readonly audio: ServerNotification__ThreadRealtimeAudioChunk;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeOutputAudioDeltaNotification = Schema.Struct({
  audio: ServerNotification__ThreadRealtimeAudioChunk,
  threadId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - streamed output audio emitted by thread realtime.",
  identifier: "ServerNotification__ThreadRealtimeOutputAudioDeltaNotification",
});

export type ServerNotification__WindowsSandboxSetupCompletedNotification = {
  readonly error?: string | null;
  readonly mode: ServerNotification__WindowsSandboxSetupMode;
  readonly success: boolean;
};
export const ServerNotification__WindowsSandboxSetupCompletedNotification = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  mode: ServerNotification__WindowsSandboxSetupMode,
  success: Schema.Boolean,
}).annotate({ identifier: "ServerNotification__WindowsSandboxSetupCompletedNotification" });

export type ServerNotification__AccountLoginCompletedNotification = {
  readonly error?: string | null;
  readonly loginId?: string | null;
  readonly onboardingEntrypoint?: ServerNotification__DesktopOnboardingEntrypoint | null;
  readonly success: boolean;
};
export const ServerNotification__AccountLoginCompletedNotification = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  loginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  onboardingEntrypoint: Schema.optionalKey(
    Schema.Union([ServerNotification__DesktopOnboardingEntrypoint, Schema.Null]),
  ),
  success: Schema.Boolean,
}).annotate({ identifier: "ServerNotification__AccountLoginCompletedNotification" });

export type ServerRequest__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: ServerRequest__LegacyAppPathString;
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
export const ServerRequest__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: ServerRequest__LegacyAppPathString,
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
).annotate({ identifier: "ServerRequest__CommandAction" });

export type ServerRequest__FileSystemSpecialPath =
  | { readonly kind: "root" }
  | { readonly kind: "minimal" }
  | { readonly kind: "project_roots"; readonly subpath?: ServerRequest__LegacyAppPathString | null }
  | { readonly kind: "tmpdir" }
  | { readonly kind: "slash_tmp" }
  | {
      readonly kind: "unknown";
      readonly path: string;
      readonly subpath?: ServerRequest__LegacyAppPathString | null;
    };
export const ServerRequest__FileSystemSpecialPath = Schema.Union(
  [
    Schema.Struct({ kind: Schema.Literal("root") }).annotate({
      title: "RootFileSystemSpecialPath",
    }),
    Schema.Struct({ kind: Schema.Literal("minimal") }).annotate({
      title: "MinimalFileSystemSpecialPath",
    }),
    Schema.Struct({
      kind: Schema.Literal("project_roots"),
      subpath: Schema.optionalKey(Schema.Union([ServerRequest__LegacyAppPathString, Schema.Null])),
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
      subpath: Schema.optionalKey(Schema.Union([ServerRequest__LegacyAppPathString, Schema.Null])),
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerRequest__FileSystemSpecialPath" });

export type ServerRequest__NetworkApprovalContext = {
  readonly host: string;
  readonly protocol: ServerRequest__NetworkApprovalProtocol;
};
export const ServerRequest__NetworkApprovalContext = Schema.Struct({
  host: Schema.String,
  protocol: ServerRequest__NetworkApprovalProtocol,
}).annotate({ identifier: "ServerRequest__NetworkApprovalContext" });

export type ServerRequest__NetworkPolicyAmendment = {
  readonly action: ServerRequest__NetworkPolicyRuleAction;
  readonly host: string;
};
export const ServerRequest__NetworkPolicyAmendment = Schema.Struct({
  action: ServerRequest__NetworkPolicyRuleAction,
  host: Schema.String,
}).annotate({ identifier: "ServerRequest__NetworkPolicyAmendment" });

export type ServerRequest__ToolRequestUserInputQuestion = {
  readonly header: string;
  readonly id: string;
  readonly isOther?: boolean;
  readonly isSecret?: boolean;
  readonly options?: ReadonlyArray<ServerRequest__ToolRequestUserInputOption> | null;
  readonly question: string;
};
export const ServerRequest__ToolRequestUserInputQuestion = Schema.Struct({
  header: Schema.String,
  id: Schema.String,
  isOther: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  isSecret: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  options: Schema.optionalKey(
    Schema.Union([Schema.Array(ServerRequest__ToolRequestUserInputOption), Schema.Null]),
  ),
  question: Schema.String,
}).annotate({
  description: "EXPERIMENTAL. Represents one request_user_input question and its required options.",
  identifier: "ServerRequest__ToolRequestUserInputQuestion",
});

export type ServerRequest__McpElicitationUntitledSingleSelectEnumSchema = {
  readonly default?: string | null;
  readonly description?: string | null;
  readonly enum: ReadonlyArray<string>;
  readonly title?: string | null;
  readonly type: ServerRequest__McpElicitationStringType;
};
export const ServerRequest__McpElicitationUntitledSingleSelectEnumSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  enum: Schema.Array(Schema.String),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: ServerRequest__McpElicitationStringType,
}).annotate({ identifier: "ServerRequest__McpElicitationUntitledSingleSelectEnumSchema" });

export type ServerRequest__McpElicitationUntitledEnumItems = {
  readonly enum: ReadonlyArray<string>;
  readonly type: ServerRequest__McpElicitationStringType;
};
export const ServerRequest__McpElicitationUntitledEnumItems = Schema.Struct({
  enum: Schema.Array(Schema.String),
  type: ServerRequest__McpElicitationStringType,
}).annotate({ identifier: "ServerRequest__McpElicitationUntitledEnumItems" });

export type ServerRequest__McpElicitationLegacyTitledEnumSchema = {
  readonly default?: string | null;
  readonly description?: string | null;
  readonly enum: ReadonlyArray<string>;
  readonly enumNames?: ReadonlyArray<string> | null;
  readonly title?: string | null;
  readonly type: ServerRequest__McpElicitationStringType;
};
export const ServerRequest__McpElicitationLegacyTitledEnumSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  enum: Schema.Array(Schema.String),
  enumNames: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: ServerRequest__McpElicitationStringType,
}).annotate({ identifier: "ServerRequest__McpElicitationLegacyTitledEnumSchema" });

export type ServerRequest__McpElicitationTitledSingleSelectEnumSchema = {
  readonly default?: string | null;
  readonly description?: string | null;
  readonly oneOf: ReadonlyArray<ServerRequest__McpElicitationConstOption>;
  readonly title?: string | null;
  readonly type: ServerRequest__McpElicitationStringType;
};
export const ServerRequest__McpElicitationTitledSingleSelectEnumSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  oneOf: Schema.Array(ServerRequest__McpElicitationConstOption),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: ServerRequest__McpElicitationStringType,
}).annotate({ identifier: "ServerRequest__McpElicitationTitledSingleSelectEnumSchema" });

export type ServerRequest__McpElicitationTitledEnumItems = {
  readonly anyOf: ReadonlyArray<ServerRequest__McpElicitationConstOption>;
};
export const ServerRequest__McpElicitationTitledEnumItems = Schema.Struct({
  anyOf: Schema.Array(ServerRequest__McpElicitationConstOption),
}).annotate({ identifier: "ServerRequest__McpElicitationTitledEnumItems" });

export type ServerRequest__McpElicitationStringSchema = {
  readonly default?: string | null;
  readonly description?: string | null;
  readonly format?: ServerRequest__McpElicitationStringFormat | null;
  readonly maxLength?: number | null;
  readonly minLength?: number | null;
  readonly title?: string | null;
  readonly type: ServerRequest__McpElicitationStringType;
};
export const ServerRequest__McpElicitationStringSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  format: Schema.optionalKey(
    Schema.Union([ServerRequest__McpElicitationStringFormat, Schema.Null]),
  ),
  maxLength: Schema.optionalKey(
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
  minLength: Schema.optionalKey(
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
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: ServerRequest__McpElicitationStringType,
}).annotate({ identifier: "ServerRequest__McpElicitationStringSchema" });

export type ServerRequest__McpElicitationNumberSchema = {
  readonly default?: number | null;
  readonly description?: string | null;
  readonly maximum?: number | null;
  readonly minimum?: number | null;
  readonly title?: string | null;
  readonly type: ServerRequest__McpElicitationNumberType;
};
export const ServerRequest__McpElicitationNumberSchema = Schema.Struct({
  default: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  maximum: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
      Schema.Null,
    ]),
  ),
  minimum: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "double" }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
      Schema.Null,
    ]),
  ),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: ServerRequest__McpElicitationNumberType,
}).annotate({ identifier: "ServerRequest__McpElicitationNumberSchema" });

export type ServerRequest__McpElicitationBooleanSchema = {
  readonly default?: boolean | null;
  readonly description?: string | null;
  readonly title?: string | null;
  readonly type: ServerRequest__McpElicitationBooleanType;
};
export const ServerRequest__McpElicitationBooleanSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: ServerRequest__McpElicitationBooleanType,
}).annotate({ identifier: "ServerRequest__McpElicitationBooleanSchema" });

export type ServerRequest__ChatgptAuthTokensRefreshParams = {
  readonly previousAccountId?: string | null;
  readonly reason: ServerRequest__ChatgptAuthTokensRefreshReason;
};
export const ServerRequest__ChatgptAuthTokensRefreshParams = Schema.Struct({
  previousAccountId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Workspace/account identifier that Codex was previously using.\n\nClients that manage multiple accounts/workspaces can use this as a hint to refresh the token for the correct workspace.\n\nThis may be `null` when the prior auth state did not include a workspace identifier (`chatgpt_account_id`).",
      }),
      Schema.Null,
    ]),
  ),
  reason: ServerRequest__ChatgptAuthTokensRefreshReason,
}).annotate({ identifier: "ServerRequest__ChatgptAuthTokensRefreshParams" });

export type ServerRequest__ApplyPatchApprovalParams = {
  readonly callId: string;
  readonly conversationId: ServerRequest__ThreadId;
  readonly fileChanges: { readonly [x: string]: ServerRequest__FileChange };
  readonly grantRoot?: string | null;
  readonly reason?: string | null;
};
export const ServerRequest__ApplyPatchApprovalParams = Schema.Struct({
  callId: Schema.String.annotate({
    description:
      "Use to correlate this with [codex_protocol::protocol::PatchApplyBeginEvent] and [codex_protocol::protocol::PatchApplyEndEvent].",
  }),
  conversationId: ServerRequest__ThreadId,
  fileChanges: Schema.Record(Schema.String, ServerRequest__FileChange),
  grantRoot: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "When set, the agent is asking the user to allow writes under this root for the remainder of the session (unclear if this is honored today).",
      }),
      Schema.Null,
    ]),
  ),
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional explanatory reason (e.g. request for extra write access).",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ServerRequest__ApplyPatchApprovalParams" });

export type ServerRequest__ExecCommandApprovalParams = {
  readonly approvalId?: string | null;
  readonly callId: string;
  readonly command: ReadonlyArray<string>;
  readonly conversationId: ServerRequest__ThreadId;
  readonly cwd: string;
  readonly parsedCmd: ReadonlyArray<ServerRequest__ParsedCommand>;
  readonly reason?: string | null;
};
export const ServerRequest__ExecCommandApprovalParams = Schema.Struct({
  approvalId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Identifier for this specific approval callback." }),
      Schema.Null,
    ]),
  ),
  callId: Schema.String.annotate({
    description:
      "Use to correlate this with [codex_protocol::protocol::ExecCommandBeginEvent] and [codex_protocol::protocol::ExecCommandEndEvent].",
  }),
  command: Schema.Array(Schema.String),
  conversationId: ServerRequest__ThreadId,
  cwd: Schema.String,
  parsedCmd: Schema.Array(ServerRequest__ParsedCommand),
  reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerRequest__ExecCommandApprovalParams" });

export type ToolRequestUserInputParams__ToolRequestUserInputQuestion = {
  readonly header: string;
  readonly id: string;
  readonly isOther?: boolean;
  readonly isSecret?: boolean;
  readonly options?: ReadonlyArray<ToolRequestUserInputParams__ToolRequestUserInputOption> | null;
  readonly question: string;
};
export const ToolRequestUserInputParams__ToolRequestUserInputQuestion = Schema.Struct({
  header: Schema.String,
  id: Schema.String,
  isOther: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  isSecret: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  options: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ToolRequestUserInputParams__ToolRequestUserInputOption),
      Schema.Null,
    ]),
  ),
  question: Schema.String,
}).annotate({
  description: "EXPERIMENTAL. Represents one request_user_input question and its required options.",
  identifier: "ToolRequestUserInputParams__ToolRequestUserInputQuestion",
});

export type V2AccountRateLimitsUpdatedNotification__RateLimitSnapshot = {
  readonly credits?: V2AccountRateLimitsUpdatedNotification__CreditsSnapshot | null;
  readonly individualLimit?: V2AccountRateLimitsUpdatedNotification__SpendControlLimitSnapshot | null;
  readonly limitId?: string | null;
  readonly limitName?: string | null;
  readonly normalModelSlug?: string | null;
  readonly planType?: V2AccountRateLimitsUpdatedNotification__PlanType | null;
  readonly primary?: V2AccountRateLimitsUpdatedNotification__RateLimitWindow | null;
  readonly rateLimitReachedType?: V2AccountRateLimitsUpdatedNotification__RateLimitReachedType | null;
  readonly secondary?: V2AccountRateLimitsUpdatedNotification__RateLimitWindow | null;
  readonly spendControlReached?: boolean | null;
};
export const V2AccountRateLimitsUpdatedNotification__RateLimitSnapshot = Schema.Struct({
  credits: Schema.optionalKey(
    Schema.Union([V2AccountRateLimitsUpdatedNotification__CreditsSnapshot, Schema.Null]),
  ),
  individualLimit: Schema.optionalKey(
    Schema.Union([V2AccountRateLimitsUpdatedNotification__SpendControlLimitSnapshot, Schema.Null]),
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
    Schema.Union([V2AccountRateLimitsUpdatedNotification__PlanType, Schema.Null]),
  ),
  primary: Schema.optionalKey(
    Schema.Union([V2AccountRateLimitsUpdatedNotification__RateLimitWindow, Schema.Null]),
  ),
  rateLimitReachedType: Schema.optionalKey(
    Schema.Union([V2AccountRateLimitsUpdatedNotification__RateLimitReachedType, Schema.Null]),
  ),
  secondary: Schema.optionalKey(
    Schema.Union([V2AccountRateLimitsUpdatedNotification__RateLimitWindow, Schema.Null]),
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
}).annotate({ identifier: "V2AccountRateLimitsUpdatedNotification__RateLimitSnapshot" });

export type V2AppListUpdatedNotification__AppMetadata = {
  readonly categories?: ReadonlyArray<string> | null;
  readonly developer?: string | null;
  readonly firstPartyRequiresInstall?: boolean | null;
  readonly review?: V2AppListUpdatedNotification__AppReview | null;
  readonly screenshots?: ReadonlyArray<V2AppListUpdatedNotification__AppScreenshot> | null;
  readonly seoDescription?: string | null;
  readonly showInComposerWhenUnlinked?: boolean | null;
  readonly subCategories?: ReadonlyArray<string> | null;
  readonly version?: string | null;
  readonly versionId?: string | null;
  readonly versionNotes?: string | null;
};
export const V2AppListUpdatedNotification__AppMetadata = Schema.Struct({
  categories: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  developer: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  firstPartyRequiresInstall: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  review: Schema.optionalKey(Schema.Union([V2AppListUpdatedNotification__AppReview, Schema.Null])),
  screenshots: Schema.optionalKey(
    Schema.Union([Schema.Array(V2AppListUpdatedNotification__AppScreenshot), Schema.Null]),
  ),
  seoDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  showInComposerWhenUnlinked: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  subCategories: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  version: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  versionId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  versionNotes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2AppListUpdatedNotification__AppMetadata" });

export type V2AppsListResponse__AppMetadata = {
  readonly categories?: ReadonlyArray<string> | null;
  readonly developer?: string | null;
  readonly firstPartyRequiresInstall?: boolean | null;
  readonly review?: V2AppsListResponse__AppReview | null;
  readonly screenshots?: ReadonlyArray<V2AppsListResponse__AppScreenshot> | null;
  readonly seoDescription?: string | null;
  readonly showInComposerWhenUnlinked?: boolean | null;
  readonly subCategories?: ReadonlyArray<string> | null;
  readonly version?: string | null;
  readonly versionId?: string | null;
  readonly versionNotes?: string | null;
};
export const V2AppsListResponse__AppMetadata = Schema.Struct({
  categories: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  developer: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  firstPartyRequiresInstall: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  review: Schema.optionalKey(Schema.Union([V2AppsListResponse__AppReview, Schema.Null])),
  screenshots: Schema.optionalKey(
    Schema.Union([Schema.Array(V2AppsListResponse__AppScreenshot), Schema.Null]),
  ),
  seoDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  showInComposerWhenUnlinked: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  subCategories: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  version: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  versionId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  versionNotes: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2AppsListResponse__AppMetadata" });

export type V2AppsReadResponse__ConnectorMetadata = {
  readonly description?: string | null;
  readonly distributionChannel?: string | null;
  readonly iconUrl?: string | null;
  readonly iconUrlDark?: string | null;
  readonly id: string;
  readonly installUrl?: string | null;
  readonly name: string;
  readonly pluginDisplayNames?: ReadonlyArray<string>;
  readonly toolSummaries?: ReadonlyArray<V2AppsReadResponse__AppToolSummary> | null;
};
export const V2AppsReadResponse__ConnectorMetadata = Schema.Struct({
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  distributionChannel: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  iconUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  iconUrlDark: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  id: Schema.String,
  installUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
  pluginDisplayNames: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
  toolSummaries: Schema.optionalKey(
    Schema.Union([Schema.Array(V2AppsReadResponse__AppToolSummary), Schema.Null]),
  ),
}).annotate({
  description: "EXPERIMENTAL - metadata returned by app/read.",
  identifier: "V2AppsReadResponse__ConnectorMetadata",
});

export type V2CommandExecParams__SandboxPolicy =
  | { readonly type: "dangerFullAccess" }
  | { readonly networkAccess?: boolean; readonly type: "readOnly" }
  | {
      readonly networkAccess?: V2CommandExecParams__NetworkAccess;
      readonly type: "externalSandbox";
    }
  | {
      readonly excludeSlashTmp?: boolean;
      readonly excludeTmpdirEnvVar?: boolean;
      readonly networkAccess?: boolean;
      readonly type: "workspaceWrite";
      readonly writableRoots?: ReadonlyArray<V2CommandExecParams__AbsolutePathBuf>;
    };
export const V2CommandExecParams__SandboxPolicy = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("dangerFullAccess").annotate({
        title: "DangerFullAccessSandboxPolicyType",
      }),
    }).annotate({ title: "DangerFullAccessSandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("readOnly").annotate({ title: "ReadOnlySandboxPolicyType" }),
    }).annotate({ title: "ReadOnlySandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<V2CommandExecParams__NetworkAccess> =>
            V2CommandExecParams__NetworkAccess,
        ).annotate({ default: "restricted" }),
      ),
      type: Schema.Literal("externalSandbox").annotate({
        title: "ExternalSandboxSandboxPolicyType",
      }),
    }).annotate({ title: "ExternalSandboxSandboxPolicy" }),
    Schema.Struct({
      excludeSlashTmp: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      excludeTmpdirEnvVar: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("workspaceWrite").annotate({ title: "WorkspaceWriteSandboxPolicyType" }),
      writableRoots: Schema.optionalKey(
        Schema.Array(V2CommandExecParams__AbsolutePathBuf).annotate({ default: [] }),
      ),
    }).annotate({ title: "WorkspaceWriteSandboxPolicy" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2CommandExecParams__SandboxPolicy" });

export type V2ConfigBatchWriteParams__ConfigEdit = {
  readonly keyPath: string;
  readonly mergeStrategy: V2ConfigBatchWriteParams__MergeStrategy;
  readonly value: Schema.Json;
};
export const V2ConfigBatchWriteParams__ConfigEdit = Schema.Struct({
  keyPath: Schema.String,
  mergeStrategy: V2ConfigBatchWriteParams__MergeStrategy,
  value: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({ identifier: "V2ConfigBatchWriteParams__ConfigEdit" });

export type V2ConfigReadResponse__BrowserUseOriginPolicyConfig = {
  readonly access?: V2ConfigReadResponse__AllowDenyRequirement | null;
  readonly downloads?: V2ConfigReadResponse__AllowDenyRequirement | null;
  readonly full_cdp_access?: V2ConfigReadResponse__AllowDenyRequirement | null;
  readonly uploads?: V2ConfigReadResponse__AllowDenyRequirement | null;
};
export const V2ConfigReadResponse__BrowserUseOriginPolicyConfig = Schema.Struct({
  access: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  downloads: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  full_cdp_access: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  uploads: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigReadResponse__BrowserUseOriginPolicyConfig" });

export type V2ConfigReadResponse__ComputerUseMacosConfig = {
  readonly bundle_ids?: { readonly [x: string]: V2ConfigReadResponse__AllowDenyRequirement } | null;
};
export const V2ConfigReadResponse__ComputerUseMacosConfig = Schema.Struct({
  bundle_ids: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, V2ConfigReadResponse__AllowDenyRequirement),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ConfigReadResponse__ComputerUseMacosConfig" });

export type V2ConfigReadResponse__ComputerUseWindowsExeConfig = {
  readonly access: V2ConfigReadResponse__AllowDenyRequirement;
  readonly binary_name?: string | null;
  readonly product_name: string;
  readonly publisher_name: string;
};
export const V2ConfigReadResponse__ComputerUseWindowsExeConfig = Schema.Struct({
  access: V2ConfigReadResponse__AllowDenyRequirement,
  binary_name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  product_name: Schema.String,
  publisher_name: Schema.String,
}).annotate({ identifier: "V2ConfigReadResponse__ComputerUseWindowsExeConfig" });

export type V2ConfigReadResponse__WebSearchToolConfig = {
  readonly allowed_domains?: ReadonlyArray<string> | null;
  readonly context_size?: V2ConfigReadResponse__WebSearchContextSize | null;
  readonly location?: V2ConfigReadResponse__WebSearchLocation | null;
};
export const V2ConfigReadResponse__WebSearchToolConfig = Schema.Struct({
  allowed_domains: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  context_size: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__WebSearchContextSize, Schema.Null]),
  ),
  location: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__WebSearchLocation, Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigReadResponse__WebSearchToolConfig" });
