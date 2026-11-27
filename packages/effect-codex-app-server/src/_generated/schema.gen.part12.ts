import * as Schema from "effect/Schema";
import {
  PermissionsRequestApprovalResponse__LegacyAppPathString,
  ServerNotification__AbsolutePathBuf,
  ServerNotification__ImageDetail,
  ServerNotification__LegacyAppPathString,
} from "./schema.gen.part0.ts";
import {
  ServerNotification__AppBranding,
  ServerNotification__ExternalAgentConfigMigrationItemType,
  ServerNotification__HookEventName,
  ServerNotification__HookExecutionMode,
  ServerNotification__HookHandlerType,
  ServerNotification__HookRunStatus,
  ServerNotification__HookScope,
  ServerNotification__HookSource,
  ServerNotification__ModeKind,
  ServerRequest__CommandExecutionApprovalKind,
  ServerRequest__LegacyAppPathString,
  ServerRequest__McpElicitationArrayType,
  V2AppListUpdatedNotification__AppBranding,
  V2AppsListResponse__AppBranding,
  V2ConfigReadResponse__AllowDenyRequirement,
  V2ConfigRequirementsReadResponse__AllowDenyRequirement,
} from "./schema.gen.part1.ts";
import {
  V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItemType,
  V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType,
  V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType,
  V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItemType,
  V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType,
  V2HookCompletedNotification__AbsolutePathBuf,
  V2HookCompletedNotification__HookEventName,
  V2HookCompletedNotification__HookExecutionMode,
  V2HookCompletedNotification__HookHandlerType,
  V2HookCompletedNotification__HookRunStatus,
  V2HookCompletedNotification__HookScope,
  V2HookCompletedNotification__HookSource,
  V2HookStartedNotification__AbsolutePathBuf,
  V2HookStartedNotification__HookEventName,
  V2HookStartedNotification__HookExecutionMode,
  V2HookStartedNotification__HookHandlerType,
  V2HookStartedNotification__HookRunStatus,
  V2HookStartedNotification__HookScope,
  V2HookStartedNotification__HookSource,
  V2HooksListResponse__HookErrorInfo,
  V2ItemCompletedNotification__ImageDetail,
  V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
  V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
  V2ItemStartedNotification__ImageDetail,
  V2ModelListResponse__InputModality,
  V2ModelListResponse__ModelAvailabilityNux,
  V2ModelListResponse__ModelServiceTier,
  V2ModelListResponse__ModelUpgradeInfo,
  V2ModelListResponse__MultiAgentVersion,
  V2ModelListResponse__ReasoningEffort,
  V2PluginInstalledResponse__PluginShareDiscoverability,
  V2PluginListResponse__PluginShareDiscoverability,
  V2PluginReadResponse__AbsolutePathBuf,
} from "./schema.gen.part2.ts";
import {
  V2PluginReadResponse__PluginShareDiscoverability,
  V2PluginShareListResponse__PluginShareDiscoverability,
  V2ReviewStartResponse__ImageDetail,
  V2SkillsListResponse__AbsolutePathBuf,
  V2SkillsListResponse__SkillScope,
  V2ThreadForkResponse__ImageDetail,
  V2ThreadItemsListResponse__ImageDetail,
  V2ThreadListResponse__ImageDetail,
} from "./schema.gen.part3.ts";
import { V2ThreadMetadataUpdateResponse__ImageDetail } from "./schema.gen.part4.ts";
import {
  PermissionsRequestApprovalResponse__FileSystemSpecialPath,
  ServerNotification__AppMetadata,
  ServerNotification__CodexErrorInfo,
  ServerNotification__ExternalAgentConfigImportItemTypeFailure,
  ServerNotification__ExternalAgentConfigImportItemTypeSuccess,
  ServerNotification__FileSystemSpecialPath,
  ServerNotification__FileUpdateChange,
  ServerNotification__FunctionCallOutputContentItem,
  ServerNotification__FuzzyFileSearchResult,
  ServerNotification__HookOutputEntry,
  ServerNotification__MisalignmentErrorDetails,
  ServerNotification__RateLimitSnapshot,
  ServerNotification__Settings,
  ServerNotification__SubAgentSource,
  ServerNotification__TextElement,
  ServerNotification__TextRange,
  ServerNotification__ThreadGoal,
  ServerNotification__ThreadRealtimeItem,
  ServerNotification__ThreadStatus,
  ServerNotification__ThreadTokenUsage,
  ServerNotification__TurnPlanStep,
  ServerRequest__CommandAction,
  ServerRequest__FileSystemSpecialPath,
  ServerRequest__McpElicitationTitledEnumItems,
  ServerRequest__McpElicitationTitledSingleSelectEnumSchema,
  ServerRequest__McpElicitationUntitledEnumItems,
  ServerRequest__McpElicitationUntitledSingleSelectEnumSchema,
  ServerRequest__NetworkApprovalContext,
  ServerRequest__NetworkPolicyAmendment,
  ServerRequest__ToolRequestUserInputQuestion,
  V2AppListUpdatedNotification__AppMetadata,
  V2AppsListResponse__AppMetadata,
  V2ConfigReadResponse__BrowserUseOriginPolicyConfig,
  V2ConfigReadResponse__ComputerUseWindowsExeConfig,
  V2ConfigReadResponse__WebSearchToolConfig,
} from "./schema.gen.part7.ts";
import {
  V2ConfigReadResponse__ConfigLayerSource,
  V2ConfigRequirementsReadResponse__BrowserUseOriginPolicy,
  V2ConfigRequirementsReadResponse__ComputerUseWindowsExeRequirement,
  V2ConfigRequirementsReadResponse__NewThreadModelDefaults,
  V2ConfigWriteResponse__ConfigLayerSource,
  V2ErrorNotification__CodexErrorInfo,
  V2ErrorNotification__MisalignmentErrorDetails,
  V2ExternalAgentConfigDetectResponse__MigrationDetails,
  V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeFailure,
  V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeSuccess,
  V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeFailure,
  V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeSuccess,
  V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordSuccessParams,
  V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportItemTypeFailure,
  V2ExternalAgentConfigImportParams__MigrationDetails,
  V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeFailure,
  V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeSuccess,
  V2GetAccountRateLimitsResponse__RateLimitResetCredit,
  V2HookCompletedNotification__HookOutputEntry,
  V2HookStartedNotification__HookOutputEntry,
  V2HooksListResponse__HookMetadata,
  V2ItemCompletedNotification__FunctionCallOutputContentItem,
  V2ItemCompletedNotification__TextElement,
  V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSpecialPath,
  V2ItemGuardianApprovalReviewStartedNotification__FileSystemSpecialPath,
  V2ItemStartedNotification__FunctionCallOutputContentItem,
  V2ItemStartedNotification__TextElement,
  V2ModelListResponse__ModelAccessPrograms,
  V2ModelListResponse__ReasoningEffortOption,
  V2PluginInstalledResponse__PluginSharePrincipal,
  V2PluginListResponse__PluginSharePrincipal,
  V2PluginReadResponse__SkillInterface,
} from "./schema.gen.part8.ts";
import {
  V2PluginReadResponse__PluginSharePrincipal,
  V2PluginReadResponse__ScheduledTaskSchedule,
  V2PluginShareListResponse__PluginSharePrincipal,
  V2RawResponseItemCompletedNotification__FunctionCallOutputContentItem,
  V2ReviewStartResponse__CodexErrorInfo,
  V2ReviewStartResponse__FunctionCallOutputContentItem,
  V2ReviewStartResponse__MisalignmentErrorDetails,
  V2ReviewStartResponse__TextElement,
  V2SkillsListResponse__SkillDependencies,
  V2SkillsListResponse__SkillInterface,
  V2ThreadForkResponse__CodexErrorInfo,
  V2ThreadForkResponse__FunctionCallOutputContentItem,
  V2ThreadForkResponse__MisalignmentErrorDetails,
  V2ThreadForkResponse__SubAgentSource,
  V2ThreadForkResponse__TextElement,
  V2ThreadItemsListResponse__FunctionCallOutputContentItem,
  V2ThreadItemsListResponse__TextElement,
  V2ThreadListResponse__CodexErrorInfo,
  V2ThreadListResponse__FunctionCallOutputContentItem,
  V2ThreadListResponse__MisalignmentErrorDetails,
  V2ThreadListResponse__SubAgentSource,
  V2ThreadListResponse__TextElement,
  V2ThreadMetadataUpdateResponse__CodexErrorInfo,
  V2ThreadMetadataUpdateResponse__FunctionCallOutputContentItem,
  V2ThreadMetadataUpdateResponse__MisalignmentErrorDetails,
  V2ThreadMetadataUpdateResponse__SubAgentSource,
  V2ThreadMetadataUpdateResponse__TextElement,
  V2ThreadReadResponse__SubAgentSource,
} from "./schema.gen.part9.ts";

export type PermissionsRequestApprovalResponse__FileSystemPath =
  | {
      readonly path: PermissionsRequestApprovalResponse__LegacyAppPathString;
      readonly type: "path";
    }
  | { readonly pattern: string; readonly type: "glob_pattern" }
  | {
      readonly type: "special";
      readonly value: PermissionsRequestApprovalResponse__FileSystemSpecialPath;
    };
export const PermissionsRequestApprovalResponse__FileSystemPath = Schema.Union(
  [
    Schema.Struct({
      path: PermissionsRequestApprovalResponse__LegacyAppPathString,
      type: Schema.Literal("path").annotate({ title: "PathFileSystemPathType" }),
    }).annotate({ title: "PathFileSystemPath" }),
    Schema.Struct({
      pattern: Schema.String,
      type: Schema.Literal("glob_pattern").annotate({ title: "GlobPatternFileSystemPathType" }),
    }).annotate({ title: "GlobPatternFileSystemPath" }),
    Schema.Struct({
      type: Schema.Literal("special").annotate({ title: "SpecialFileSystemPathType" }),
      value: PermissionsRequestApprovalResponse__FileSystemSpecialPath,
    }).annotate({ title: "SpecialFileSystemPath" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "PermissionsRequestApprovalResponse__FileSystemPath" });

export type ServerNotification__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: ServerNotification__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: ServerNotification__MisalignmentErrorDetails | null;
};
export const ServerNotification__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([ServerNotification__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([ServerNotification__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "ServerNotification__TurnError" });

export type ServerNotification__CollaborationMode = {
  readonly mode: ServerNotification__ModeKind;
  readonly settings: ServerNotification__Settings;
};
export const ServerNotification__CollaborationMode = Schema.Struct({
  mode: ServerNotification__ModeKind,
  settings: ServerNotification__Settings,
}).annotate({
  description: "Collaboration mode for a Codex session.",
  identifier: "ServerNotification__CollaborationMode",
});

export type ServerNotification__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: ServerNotification__SubAgentSource };
export const ServerNotification__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: ServerNotification__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__SessionSource" });

export type ServerNotification__ThreadStatusChangedNotification = {
  readonly status: ServerNotification__ThreadStatus;
  readonly threadId: string;
};
export const ServerNotification__ThreadStatusChangedNotification = Schema.Struct({
  status: ServerNotification__ThreadStatus,
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadStatusChangedNotification" });

export type ServerNotification__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<ServerNotification__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: ServerNotification__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: ServerNotification__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: ServerNotification__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const ServerNotification__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(ServerNotification__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ServerNotification__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ServerNotification__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([ServerNotification__ImageDetail, Schema.Null])),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__UserInput" });

export type ServerNotification__FunctionCallOutputBody =
  | string
  | ReadonlyArray<ServerNotification__FunctionCallOutputContentItem>;
export const ServerNotification__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(ServerNotification__FunctionCallOutputContentItem),
]).annotate({ identifier: "ServerNotification__FunctionCallOutputBody" });

export type ServerNotification__FileSystemPath =
  | { readonly path: ServerNotification__LegacyAppPathString; readonly type: "path" }
  | { readonly pattern: string; readonly type: "glob_pattern" }
  | { readonly type: "special"; readonly value: ServerNotification__FileSystemSpecialPath };
export const ServerNotification__FileSystemPath = Schema.Union(
  [
    Schema.Struct({
      path: ServerNotification__LegacyAppPathString,
      type: Schema.Literal("path").annotate({ title: "PathFileSystemPathType" }),
    }).annotate({ title: "PathFileSystemPath" }),
    Schema.Struct({
      pattern: Schema.String,
      type: Schema.Literal("glob_pattern").annotate({ title: "GlobPatternFileSystemPathType" }),
    }).annotate({ title: "GlobPatternFileSystemPath" }),
    Schema.Struct({
      type: Schema.Literal("special").annotate({ title: "SpecialFileSystemPathType" }),
      value: ServerNotification__FileSystemSpecialPath,
    }).annotate({ title: "SpecialFileSystemPath" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__FileSystemPath" });

export type ServerNotification__FileChangePatchUpdatedNotification = {
  readonly changes: ReadonlyArray<ServerNotification__FileUpdateChange>;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__FileChangePatchUpdatedNotification = Schema.Struct({
  changes: Schema.Array(ServerNotification__FileUpdateChange),
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__FileChangePatchUpdatedNotification" });

export type ServerNotification__ThreadGoalUpdatedNotification = {
  readonly goal: ServerNotification__ThreadGoal;
  readonly threadId: string;
  readonly turnId?: string | null;
};
export const ServerNotification__ThreadGoalUpdatedNotification = Schema.Struct({
  goal: ServerNotification__ThreadGoal,
  threadId: Schema.String,
  turnId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__ThreadGoalUpdatedNotification" });

export type ServerNotification__ThreadTokenUsageUpdatedNotification = {
  readonly threadId: string;
  readonly tokenUsage: ServerNotification__ThreadTokenUsage;
  readonly turnId: string;
};
export const ServerNotification__ThreadTokenUsageUpdatedNotification = Schema.Struct({
  threadId: Schema.String,
  tokenUsage: ServerNotification__ThreadTokenUsage,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadTokenUsageUpdatedNotification" });

export type ServerNotification__HookRunSummary = {
  readonly completedAt?: number | null;
  readonly displayOrder: number;
  readonly durationMs?: number | null;
  readonly entries: ReadonlyArray<ServerNotification__HookOutputEntry>;
  readonly eventName: ServerNotification__HookEventName;
  readonly executionMode: ServerNotification__HookExecutionMode;
  readonly handlerType: ServerNotification__HookHandlerType;
  readonly id: string;
  readonly scope: ServerNotification__HookScope;
  readonly source?: ServerNotification__HookSource;
  readonly sourcePath: ServerNotification__AbsolutePathBuf;
  readonly startedAt: number;
  readonly status: ServerNotification__HookRunStatus;
  readonly statusMessage?: string | null;
};
export const ServerNotification__HookRunSummary = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  displayOrder: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  entries: Schema.Array(ServerNotification__HookOutputEntry),
  eventName: ServerNotification__HookEventName,
  executionMode: ServerNotification__HookExecutionMode,
  handlerType: ServerNotification__HookHandlerType,
  id: Schema.String,
  scope: ServerNotification__HookScope,
  source: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<ServerNotification__HookSource> => ServerNotification__HookSource,
    ).annotate({ default: "unknown" }),
  ),
  sourcePath: ServerNotification__AbsolutePathBuf,
  startedAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  status: ServerNotification__HookRunStatus,
  statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__HookRunSummary" });

export type ServerNotification__TurnPlanUpdatedNotification = {
  readonly explanation?: string | null;
  readonly plan: ReadonlyArray<ServerNotification__TurnPlanStep>;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__TurnPlanUpdatedNotification = Schema.Struct({
  explanation: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  plan: Schema.Array(ServerNotification__TurnPlanStep),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__TurnPlanUpdatedNotification" });

export type ServerNotification__AccountRateLimitsUpdatedNotification = {
  readonly rateLimits: ServerNotification__RateLimitSnapshot;
};
export const ServerNotification__AccountRateLimitsUpdatedNotification = Schema.Struct({
  rateLimits: ServerNotification__RateLimitSnapshot,
}).annotate({
  description:
    "Sparse rolling rate-limit update.\n\nClients should merge available values into the most recent `account/rateLimits/read` response or refetch that snapshot. Nullable account metadata may be unavailable in a rolling update and does not clear a previously observed value.",
  identifier: "ServerNotification__AccountRateLimitsUpdatedNotification",
});

export type ServerNotification__AppInfo = {
  readonly appMetadata?: ServerNotification__AppMetadata | null;
  readonly branding?: ServerNotification__AppBranding | null;
  readonly description?: string | null;
  readonly distributionChannel?: string | null;
  readonly iconAssets?: { readonly [x: string]: string } | null;
  readonly iconDarkAssets?: { readonly [x: string]: string } | null;
  readonly id: string;
  readonly installUrl?: string | null;
  readonly isAccessible?: boolean;
  readonly isEnabled?: boolean;
  readonly labels?: { readonly [x: string]: string } | null;
  readonly logoUrl?: string | null;
  readonly logoUrlDark?: string | null;
  readonly name: string;
  readonly pluginDisplayNames?: ReadonlyArray<string>;
};
export const ServerNotification__AppInfo = Schema.Struct({
  appMetadata: Schema.optionalKey(Schema.Union([ServerNotification__AppMetadata, Schema.Null])),
  branding: Schema.optionalKey(Schema.Union([ServerNotification__AppBranding, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  distributionChannel: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  iconAssets: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  iconDarkAssets: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  id: Schema.String,
  installUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  isAccessible: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  isEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether this app is enabled in config.toml. Example: ```toml [apps.bad_app] enabled = false ```",
      default: true,
    }),
  ),
  labels: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  logoUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logoUrlDark: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
  pluginDisplayNames: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
}).annotate({
  description: "EXPERIMENTAL - app metadata returned by app-list APIs.",
  identifier: "ServerNotification__AppInfo",
});

export type ServerNotification__ExternalAgentConfigImportTypeResult = {
  readonly failures: ReadonlyArray<ServerNotification__ExternalAgentConfigImportItemTypeFailure>;
  readonly itemType: ServerNotification__ExternalAgentConfigMigrationItemType;
  readonly successes: ReadonlyArray<ServerNotification__ExternalAgentConfigImportItemTypeSuccess>;
};
export const ServerNotification__ExternalAgentConfigImportTypeResult = Schema.Struct({
  failures: Schema.Array(ServerNotification__ExternalAgentConfigImportItemTypeFailure),
  itemType: ServerNotification__ExternalAgentConfigMigrationItemType,
  successes: Schema.Array(ServerNotification__ExternalAgentConfigImportItemTypeSuccess),
}).annotate({ identifier: "ServerNotification__ExternalAgentConfigImportTypeResult" });

export type ServerNotification__ConfigWarningNotification = {
  readonly details?: string | null;
  readonly path?: string | null;
  readonly range?: ServerNotification__TextRange | null;
  readonly summary: string;
};
export const ServerNotification__ConfigWarningNotification = Schema.Struct({
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
    Schema.Union([ServerNotification__TextRange, Schema.Null]).annotate({
      description: "Optional range for the error location inside the config file.",
    }),
  ),
  summary: Schema.String.annotate({ description: "Concise summary of the warning." }),
}).annotate({ identifier: "ServerNotification__ConfigWarningNotification" });

export type ServerNotification__FuzzyFileSearchSessionUpdatedNotification = {
  readonly files: ReadonlyArray<ServerNotification__FuzzyFileSearchResult>;
  readonly query: string;
  readonly sessionId: string;
};
export const ServerNotification__FuzzyFileSearchSessionUpdatedNotification = Schema.Struct({
  files: Schema.Array(ServerNotification__FuzzyFileSearchResult),
  query: Schema.String,
  sessionId: Schema.String,
}).annotate({ identifier: "ServerNotification__FuzzyFileSearchSessionUpdatedNotification" });

export type ServerNotification__ThreadRealtimeItemStartedNotification = {
  readonly item: ServerNotification__ThreadRealtimeItem;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeItemStartedNotification = Schema.Struct({
  item: ServerNotification__ThreadRealtimeItem,
  threadId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - a realtime timeline item started before its content streams.",
  identifier: "ServerNotification__ThreadRealtimeItemStartedNotification",
});

export type ServerNotification__ThreadRealtimeItemCompletedNotification = {
  readonly item: ServerNotification__ThreadRealtimeItem;
  readonly threadId: string;
};
export const ServerNotification__ThreadRealtimeItemCompletedNotification = Schema.Struct({
  item: ServerNotification__ThreadRealtimeItem,
  threadId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - a realtime timeline item published after canonical commit.",
  identifier: "ServerNotification__ThreadRealtimeItemCompletedNotification",
});

export type ServerRequest__FileSystemPath =
  | { readonly path: ServerRequest__LegacyAppPathString; readonly type: "path" }
  | { readonly pattern: string; readonly type: "glob_pattern" }
  | { readonly type: "special"; readonly value: ServerRequest__FileSystemSpecialPath };
export const ServerRequest__FileSystemPath = Schema.Union(
  [
    Schema.Struct({
      path: ServerRequest__LegacyAppPathString,
      type: Schema.Literal("path").annotate({ title: "PathFileSystemPathType" }),
    }).annotate({ title: "PathFileSystemPath" }),
    Schema.Struct({
      pattern: Schema.String,
      type: Schema.Literal("glob_pattern").annotate({ title: "GlobPatternFileSystemPathType" }),
    }).annotate({ title: "GlobPatternFileSystemPath" }),
    Schema.Struct({
      type: Schema.Literal("special").annotate({ title: "SpecialFileSystemPathType" }),
      value: ServerRequest__FileSystemSpecialPath,
    }).annotate({ title: "SpecialFileSystemPath" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerRequest__FileSystemPath" });

export type ServerRequest__CommandExecutionRequestApprovalParams = {
  readonly approvalId?: string | null;
  readonly command?: string | null;
  readonly commandActions?: ReadonlyArray<ServerRequest__CommandAction> | null;
  readonly cwd?: ServerRequest__LegacyAppPathString | null;
  readonly environmentId?: string | null;
  readonly itemId: string;
  readonly kind?: ServerRequest__CommandExecutionApprovalKind;
  readonly networkApprovalContext?: ServerRequest__NetworkApprovalContext | null;
  readonly proposedExecpolicyAmendment?: ReadonlyArray<string> | null;
  readonly proposedNetworkPolicyAmendments?: ReadonlyArray<ServerRequest__NetworkPolicyAmendment> | null;
  readonly reason?: string | null;
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerRequest__CommandExecutionRequestApprovalParams = Schema.Struct({
  approvalId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Unique identifier for this specific approval callback.\n\nFor regular shell/unified_exec approvals, this is null.\n\nFor zsh-exec-bridge subcommand approvals, multiple callbacks can belong to one parent `itemId`, so `approvalId` is a distinct opaque callback id (a UUID) used to disambiguate routing. Stdin approvals also use a distinct callback id; inspect `kind` to distinguish them.",
      }),
      Schema.Null,
    ]),
  ),
  command: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "The command to be executed." }),
      Schema.Null,
    ]),
  ),
  commandActions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ServerRequest__CommandAction).annotate({
        description: "Best-effort parsed command actions for friendly display.",
      }),
      Schema.Null,
    ]),
  ),
  cwd: Schema.optionalKey(
    Schema.Union([ServerRequest__LegacyAppPathString, Schema.Null]).annotate({
      description: "The command's working directory.",
    }),
  ),
  environmentId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Environment in which the command will run." }),
      Schema.Null,
    ]),
  ),
  itemId: Schema.String,
  kind: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<ServerRequest__CommandExecutionApprovalKind> =>
        ServerRequest__CommandExecutionApprovalKind,
    ).annotate({
      description: "Kind of action under review. Defaults to `command` for older servers.",
      default: "command",
    }),
  ),
  networkApprovalContext: Schema.optionalKey(
    Schema.Union([ServerRequest__NetworkApprovalContext, Schema.Null]).annotate({
      description: "Optional context for a managed-network approval prompt.",
    }),
  ),
  proposedExecpolicyAmendment: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Optional proposed execpolicy amendment to allow similar commands without prompting.",
      }),
      Schema.Null,
    ]),
  ),
  proposedNetworkPolicyAmendments: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ServerRequest__NetworkPolicyAmendment).annotate({
        description:
          "Optional proposed network policy amendments (allow/deny host) for future requests.",
      }),
      Schema.Null,
    ]),
  ),
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional explanatory reason (e.g. request for network access).",
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
}).annotate({ identifier: "ServerRequest__CommandExecutionRequestApprovalParams" });

export type ServerRequest__ToolRequestUserInputParams = {
  readonly autoResolutionMs?: number | null;
  readonly isBlocking: boolean;
  readonly itemId: string;
  readonly questions: ReadonlyArray<ServerRequest__ToolRequestUserInputQuestion>;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerRequest__ToolRequestUserInputParams = Schema.Struct({
  autoResolutionMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "@deprecated Use `isBlocking` to decide whether the request should block.",
        format: "uint64",
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
  isBlocking: Schema.Boolean,
  itemId: Schema.String,
  questions: Schema.Array(ServerRequest__ToolRequestUserInputQuestion),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  description: "EXPERIMENTAL. Params sent with a request_user_input event.",
  identifier: "ServerRequest__ToolRequestUserInputParams",
});

export type ServerRequest__McpElicitationUntitledMultiSelectEnumSchema = {
  readonly default?: ReadonlyArray<string> | null;
  readonly description?: string | null;
  readonly items: ServerRequest__McpElicitationUntitledEnumItems;
  readonly maxItems?: number | null;
  readonly minItems?: number | null;
  readonly title?: string | null;
  readonly type: ServerRequest__McpElicitationArrayType;
};
export const ServerRequest__McpElicitationUntitledMultiSelectEnumSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  items: ServerRequest__McpElicitationUntitledEnumItems,
  maxItems: Schema.optionalKey(
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
  minItems: Schema.optionalKey(
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
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: ServerRequest__McpElicitationArrayType,
}).annotate({ identifier: "ServerRequest__McpElicitationUntitledMultiSelectEnumSchema" });

export type ServerRequest__McpElicitationSingleSelectEnumSchema =
  | ServerRequest__McpElicitationUntitledSingleSelectEnumSchema
  | ServerRequest__McpElicitationTitledSingleSelectEnumSchema;
export const ServerRequest__McpElicitationSingleSelectEnumSchema = Schema.Union([
  ServerRequest__McpElicitationUntitledSingleSelectEnumSchema,
  ServerRequest__McpElicitationTitledSingleSelectEnumSchema,
]).annotate({ identifier: "ServerRequest__McpElicitationSingleSelectEnumSchema" });

export type ServerRequest__McpElicitationTitledMultiSelectEnumSchema = {
  readonly default?: ReadonlyArray<string> | null;
  readonly description?: string | null;
  readonly items: ServerRequest__McpElicitationTitledEnumItems;
  readonly maxItems?: number | null;
  readonly minItems?: number | null;
  readonly title?: string | null;
  readonly type: ServerRequest__McpElicitationArrayType;
};
export const ServerRequest__McpElicitationTitledMultiSelectEnumSchema = Schema.Struct({
  default: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  items: ServerRequest__McpElicitationTitledEnumItems,
  maxItems: Schema.optionalKey(
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
  minItems: Schema.optionalKey(
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
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: ServerRequest__McpElicitationArrayType,
}).annotate({ identifier: "ServerRequest__McpElicitationTitledMultiSelectEnumSchema" });

export type V2AppListUpdatedNotification__AppInfo = {
  readonly appMetadata?: V2AppListUpdatedNotification__AppMetadata | null;
  readonly branding?: V2AppListUpdatedNotification__AppBranding | null;
  readonly description?: string | null;
  readonly distributionChannel?: string | null;
  readonly iconAssets?: { readonly [x: string]: string } | null;
  readonly iconDarkAssets?: { readonly [x: string]: string } | null;
  readonly id: string;
  readonly installUrl?: string | null;
  readonly isAccessible?: boolean;
  readonly isEnabled?: boolean;
  readonly labels?: { readonly [x: string]: string } | null;
  readonly logoUrl?: string | null;
  readonly logoUrlDark?: string | null;
  readonly name: string;
  readonly pluginDisplayNames?: ReadonlyArray<string>;
};
export const V2AppListUpdatedNotification__AppInfo = Schema.Struct({
  appMetadata: Schema.optionalKey(
    Schema.Union([V2AppListUpdatedNotification__AppMetadata, Schema.Null]),
  ),
  branding: Schema.optionalKey(
    Schema.Union([V2AppListUpdatedNotification__AppBranding, Schema.Null]),
  ),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  distributionChannel: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  iconAssets: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  iconDarkAssets: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  id: Schema.String,
  installUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  isAccessible: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  isEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether this app is enabled in config.toml. Example: ```toml [apps.bad_app] enabled = false ```",
      default: true,
    }),
  ),
  labels: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  logoUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logoUrlDark: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
  pluginDisplayNames: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
}).annotate({
  description: "EXPERIMENTAL - app metadata returned by app-list APIs.",
  identifier: "V2AppListUpdatedNotification__AppInfo",
});

export type V2AppsListResponse__AppInfo = {
  readonly appMetadata?: V2AppsListResponse__AppMetadata | null;
  readonly branding?: V2AppsListResponse__AppBranding | null;
  readonly description?: string | null;
  readonly distributionChannel?: string | null;
  readonly iconAssets?: { readonly [x: string]: string } | null;
  readonly iconDarkAssets?: { readonly [x: string]: string } | null;
  readonly id: string;
  readonly installUrl?: string | null;
  readonly isAccessible?: boolean;
  readonly isEnabled?: boolean;
  readonly labels?: { readonly [x: string]: string } | null;
  readonly logoUrl?: string | null;
  readonly logoUrlDark?: string | null;
  readonly name: string;
  readonly pluginDisplayNames?: ReadonlyArray<string>;
};
export const V2AppsListResponse__AppInfo = Schema.Struct({
  appMetadata: Schema.optionalKey(Schema.Union([V2AppsListResponse__AppMetadata, Schema.Null])),
  branding: Schema.optionalKey(Schema.Union([V2AppsListResponse__AppBranding, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  distributionChannel: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  iconAssets: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  iconDarkAssets: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  id: Schema.String,
  installUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  isAccessible: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
  isEnabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether this app is enabled in config.toml. Example: ```toml [apps.bad_app] enabled = false ```",
      default: true,
    }),
  ),
  labels: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  logoUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logoUrlDark: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.String,
  pluginDisplayNames: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
}).annotate({
  description: "EXPERIMENTAL - app metadata returned by app-list APIs.",
  identifier: "V2AppsListResponse__AppInfo",
});

export type V2ConfigReadResponse__BrowserUseConfig = {
  readonly allow_history_access?: boolean | null;
  readonly default_origin_policy?: V2ConfigReadResponse__BrowserUseOriginPolicyConfig | null;
  readonly origins?: {
    readonly [x: string]: V2ConfigReadResponse__BrowserUseOriginPolicyConfig;
  } | null;
};
export const V2ConfigReadResponse__BrowserUseConfig = Schema.Struct({
  allow_history_access: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  default_origin_policy: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__BrowserUseOriginPolicyConfig, Schema.Null]),
  ),
  origins: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, V2ConfigReadResponse__BrowserUseOriginPolicyConfig),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ConfigReadResponse__BrowserUseConfig" });

export type V2ConfigReadResponse__ComputerUseWindowsConfig = {
  readonly aumids?: { readonly [x: string]: V2ConfigReadResponse__AllowDenyRequirement } | null;
  readonly exes?: ReadonlyArray<V2ConfigReadResponse__ComputerUseWindowsExeConfig> | null;
};
export const V2ConfigReadResponse__ComputerUseWindowsConfig = Schema.Struct({
  aumids: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, V2ConfigReadResponse__AllowDenyRequirement),
      Schema.Null,
    ]),
  ),
  exes: Schema.optionalKey(
    Schema.Union([Schema.Array(V2ConfigReadResponse__ComputerUseWindowsExeConfig), Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigReadResponse__ComputerUseWindowsConfig" });

export type V2ConfigReadResponse__ToolsV2 = {
  readonly web_search?: V2ConfigReadResponse__WebSearchToolConfig | null;
};
export const V2ConfigReadResponse__ToolsV2 = Schema.Struct({
  web_search: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__WebSearchToolConfig, Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigReadResponse__ToolsV2" });

export type V2ConfigReadResponse__ConfigLayer = {
  readonly config: Schema.Json;
  readonly disabledReason?: string | null;
  readonly name: V2ConfigReadResponse__ConfigLayerSource;
  readonly version: string;
};
export const V2ConfigReadResponse__ConfigLayer = Schema.Struct({
  config: Schema.Json.annotate({ expected: "JSON value" }),
  disabledReason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  name: V2ConfigReadResponse__ConfigLayerSource,
  version: Schema.String,
}).annotate({ identifier: "V2ConfigReadResponse__ConfigLayer" });

export type V2ConfigReadResponse__ConfigLayerMetadata = {
  readonly name: V2ConfigReadResponse__ConfigLayerSource;
  readonly version: string;
};
export const V2ConfigReadResponse__ConfigLayerMetadata = Schema.Struct({
  name: V2ConfigReadResponse__ConfigLayerSource,
  version: Schema.String,
}).annotate({ identifier: "V2ConfigReadResponse__ConfigLayerMetadata" });

export type V2ConfigRequirementsReadResponse__ComputerUseWindowsRequirements = {
  readonly aumids?: {
    readonly [x: string]: V2ConfigRequirementsReadResponse__AllowDenyRequirement;
  } | null;
  readonly exes?: ReadonlyArray<V2ConfigRequirementsReadResponse__ComputerUseWindowsExeRequirement> | null;
};
export const V2ConfigRequirementsReadResponse__ComputerUseWindowsRequirements = Schema.Struct({
  aumids: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, V2ConfigRequirementsReadResponse__AllowDenyRequirement),
      Schema.Null,
    ]),
  ),
  exes: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2ConfigRequirementsReadResponse__ComputerUseWindowsExeRequirement),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__ComputerUseWindowsRequirements" });

export type V2ConfigRequirementsReadResponse__BrowserUseRequirements = {
  readonly allowGlobalPersistentApproval?: boolean | null;
  readonly allowHistoryAccess?: boolean | null;
  readonly allowWebmcp?: boolean | null;
  readonly defaultOriginPolicy?: V2ConfigRequirementsReadResponse__BrowserUseOriginPolicy | null;
  readonly disableAutoReview?: boolean | null;
  readonly origins?: {
    readonly [x: string]: V2ConfigRequirementsReadResponse__BrowserUseOriginPolicy;
  } | null;
};
export const V2ConfigRequirementsReadResponse__BrowserUseRequirements = Schema.Struct({
  allowGlobalPersistentApproval: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowHistoryAccess: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowWebmcp: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  defaultOriginPolicy: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__BrowserUseOriginPolicy, Schema.Null]),
  ),
  disableAutoReview: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  origins: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, V2ConfigRequirementsReadResponse__BrowserUseOriginPolicy),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__BrowserUseRequirements" });

export type V2ConfigRequirementsReadResponse__ModelsRequirements = {
  readonly newThread?: V2ConfigRequirementsReadResponse__NewThreadModelDefaults | null;
};
export const V2ConfigRequirementsReadResponse__ModelsRequirements = Schema.Struct({
  newThread: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__NewThreadModelDefaults, Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__ModelsRequirements" });

export type V2ConfigWriteResponse__ConfigLayerMetadata = {
  readonly name: V2ConfigWriteResponse__ConfigLayerSource;
  readonly version: string;
};
export const V2ConfigWriteResponse__ConfigLayerMetadata = Schema.Struct({
  name: V2ConfigWriteResponse__ConfigLayerSource,
  version: Schema.String,
}).annotate({ identifier: "V2ConfigWriteResponse__ConfigLayerMetadata" });

export type V2ErrorNotification__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ErrorNotification__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ErrorNotification__MisalignmentErrorDetails | null;
};
export const V2ErrorNotification__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ErrorNotification__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ErrorNotification__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ErrorNotification__TurnError" });

export type V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItem = {
  readonly cwd?: string | null;
  readonly description: string;
  readonly details?: V2ExternalAgentConfigDetectResponse__MigrationDetails | null;
  readonly itemType: V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItemType;
};
export const V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItem = Schema.Struct({
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Null or empty means home-scoped migration; non-empty means repo-scoped migration.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.String,
  details: Schema.optionalKey(
    Schema.Union([V2ExternalAgentConfigDetectResponse__MigrationDetails, Schema.Null]),
  ),
  itemType: V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItemType,
}).annotate({
  identifier: "V2ExternalAgentConfigDetectResponse__ExternalAgentConfigMigrationItem",
});

export type V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportTypeResult =
  {
    readonly failures: ReadonlyArray<V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeFailure>;
    readonly itemType: V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType;
    readonly successes: ReadonlyArray<V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeSuccess>;
  };
export const V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportTypeResult =
  Schema.Struct({
    failures: Schema.Array(
      V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeFailure,
    ),
    itemType:
      V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigMigrationItemType,
    successes: Schema.Array(
      V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportItemTypeSuccess,
    ),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportCompletedNotification__ExternalAgentConfigImportTypeResult",
  });

export type V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportHistory = {
  readonly completedAtMs: number;
  readonly failures: ReadonlyArray<V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeFailure>;
  readonly importId: string;
  readonly providerId?: string | null;
  readonly successes: ReadonlyArray<V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeSuccess>;
};
export const V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportHistory =
  Schema.Struct({
    completedAtMs: Schema.Number.annotate({ format: "int64" }).check(
      Schema.isInt().annotate({ expected: "an integer" }),
    ),
    failures: Schema.Array(
      V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeFailure,
    ),
    importId: Schema.String,
    providerId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    successes: Schema.Array(
      V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportItemTypeSuccess,
    ),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoriesReadResponse__ExternalAgentConfigImportHistory",
  });

export type V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordTypeResultParams =
  {
    readonly failures: ReadonlyArray<V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportItemTypeFailure>;
    readonly itemType: V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType;
    readonly successes: ReadonlyArray<V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordSuccessParams>;
  };
export const V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordTypeResultParams =
  Schema.Struct({
    failures: Schema.Array(
      V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportItemTypeFailure,
    ),
    itemType: V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigMigrationItemType,
    successes: Schema.Array(
      V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordSuccessParams,
    ),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportHistoryRecordParams__ExternalAgentConfigImportHistoryRecordTypeResultParams",
  });

export type V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItem = {
  readonly cwd?: string | null;
  readonly description: string;
  readonly details?: V2ExternalAgentConfigImportParams__MigrationDetails | null;
  readonly itemType: V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItemType;
};
export const V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItem = Schema.Struct({
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Null or empty means home-scoped migration; non-empty means repo-scoped migration.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.String,
  details: Schema.optionalKey(
    Schema.Union([V2ExternalAgentConfigImportParams__MigrationDetails, Schema.Null]),
  ),
  itemType: V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItemType,
}).annotate({ identifier: "V2ExternalAgentConfigImportParams__ExternalAgentConfigMigrationItem" });

export type V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportTypeResult = {
  readonly failures: ReadonlyArray<V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeFailure>;
  readonly itemType: V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType;
  readonly successes: ReadonlyArray<V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeSuccess>;
};
export const V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportTypeResult =
  Schema.Struct({
    failures: Schema.Array(
      V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeFailure,
    ),
    itemType: V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigMigrationItemType,
    successes: Schema.Array(
      V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportItemTypeSuccess,
    ),
  }).annotate({
    identifier:
      "V2ExternalAgentConfigImportProgressNotification__ExternalAgentConfigImportTypeResult",
  });

export type V2GetAccountRateLimitsResponse__RateLimitResetCreditsSummary = {
  readonly availableCount: number;
  readonly credits?: ReadonlyArray<V2GetAccountRateLimitsResponse__RateLimitResetCredit> | null;
};
export const V2GetAccountRateLimitsResponse__RateLimitResetCreditsSummary = Schema.Struct({
  availableCount: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  credits: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2GetAccountRateLimitsResponse__RateLimitResetCredit).annotate({
        description:
          "Detail rows for available reset credits, when the backend provides them.\n\n`null` means only `availableCount` is known, while an empty array means details were fetched and no available credits were returned. The backend may cap this list, so its length can be less than `availableCount`.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2GetAccountRateLimitsResponse__RateLimitResetCreditsSummary" });

export type V2HookCompletedNotification__HookRunSummary = {
  readonly completedAt?: number | null;
  readonly displayOrder: number;
  readonly durationMs?: number | null;
  readonly entries: ReadonlyArray<V2HookCompletedNotification__HookOutputEntry>;
  readonly eventName: V2HookCompletedNotification__HookEventName;
  readonly executionMode: V2HookCompletedNotification__HookExecutionMode;
  readonly handlerType: V2HookCompletedNotification__HookHandlerType;
  readonly id: string;
  readonly scope: V2HookCompletedNotification__HookScope;
  readonly source?: V2HookCompletedNotification__HookSource;
  readonly sourcePath: V2HookCompletedNotification__AbsolutePathBuf;
  readonly startedAt: number;
  readonly status: V2HookCompletedNotification__HookRunStatus;
  readonly statusMessage?: string | null;
};
export const V2HookCompletedNotification__HookRunSummary = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  displayOrder: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  entries: Schema.Array(V2HookCompletedNotification__HookOutputEntry),
  eventName: V2HookCompletedNotification__HookEventName,
  executionMode: V2HookCompletedNotification__HookExecutionMode,
  handlerType: V2HookCompletedNotification__HookHandlerType,
  id: Schema.String,
  scope: V2HookCompletedNotification__HookScope,
  source: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2HookCompletedNotification__HookSource> =>
        V2HookCompletedNotification__HookSource,
    ).annotate({ default: "unknown" }),
  ),
  sourcePath: V2HookCompletedNotification__AbsolutePathBuf,
  startedAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  status: V2HookCompletedNotification__HookRunStatus,
  statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2HookCompletedNotification__HookRunSummary" });

export type V2HooksListResponse__HooksListEntry = {
  readonly cwd: string;
  readonly errors: ReadonlyArray<V2HooksListResponse__HookErrorInfo>;
  readonly hooks: ReadonlyArray<V2HooksListResponse__HookMetadata>;
  readonly warnings: ReadonlyArray<string>;
};
export const V2HooksListResponse__HooksListEntry = Schema.Struct({
  cwd: Schema.String,
  errors: Schema.Array(V2HooksListResponse__HookErrorInfo),
  hooks: Schema.Array(V2HooksListResponse__HookMetadata),
  warnings: Schema.Array(Schema.String),
}).annotate({ identifier: "V2HooksListResponse__HooksListEntry" });

export type V2HookStartedNotification__HookRunSummary = {
  readonly completedAt?: number | null;
  readonly displayOrder: number;
  readonly durationMs?: number | null;
  readonly entries: ReadonlyArray<V2HookStartedNotification__HookOutputEntry>;
  readonly eventName: V2HookStartedNotification__HookEventName;
  readonly executionMode: V2HookStartedNotification__HookExecutionMode;
  readonly handlerType: V2HookStartedNotification__HookHandlerType;
  readonly id: string;
  readonly scope: V2HookStartedNotification__HookScope;
  readonly source?: V2HookStartedNotification__HookSource;
  readonly sourcePath: V2HookStartedNotification__AbsolutePathBuf;
  readonly startedAt: number;
  readonly status: V2HookStartedNotification__HookRunStatus;
  readonly statusMessage?: string | null;
};
export const V2HookStartedNotification__HookRunSummary = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  displayOrder: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  entries: Schema.Array(V2HookStartedNotification__HookOutputEntry),
  eventName: V2HookStartedNotification__HookEventName,
  executionMode: V2HookStartedNotification__HookExecutionMode,
  handlerType: V2HookStartedNotification__HookHandlerType,
  id: Schema.String,
  scope: V2HookStartedNotification__HookScope,
  source: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2HookStartedNotification__HookSource> =>
        V2HookStartedNotification__HookSource,
    ).annotate({ default: "unknown" }),
  ),
  sourcePath: V2HookStartedNotification__AbsolutePathBuf,
  startedAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  status: V2HookStartedNotification__HookRunStatus,
  statusMessage: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2HookStartedNotification__HookRunSummary" });

export type V2ItemCompletedNotification__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ItemCompletedNotification__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ItemCompletedNotification__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ItemCompletedNotification__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ItemCompletedNotification__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ItemCompletedNotification__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ItemCompletedNotification__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ItemCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ItemCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2ItemCompletedNotification__ImageDetail, Schema.Null]),
      ),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemCompletedNotification__UserInput" });

export type V2ItemCompletedNotification__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ItemCompletedNotification__FunctionCallOutputContentItem>;
export const V2ItemCompletedNotification__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ItemCompletedNotification__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ItemCompletedNotification__FunctionCallOutputBody" });

export type V2ItemGuardianApprovalReviewCompletedNotification__FileSystemPath =
  | {
      readonly path: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString;
      readonly type: "path";
    }
  | { readonly pattern: string; readonly type: "glob_pattern" }
  | {
      readonly type: "special";
      readonly value: V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSpecialPath;
    };
export const V2ItemGuardianApprovalReviewCompletedNotification__FileSystemPath = Schema.Union(
  [
    Schema.Struct({
      path: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
      type: Schema.Literal("path").annotate({ title: "PathFileSystemPathType" }),
    }).annotate({ title: "PathFileSystemPath" }),
    Schema.Struct({
      pattern: Schema.String,
      type: Schema.Literal("glob_pattern").annotate({ title: "GlobPatternFileSystemPathType" }),
    }).annotate({ title: "GlobPatternFileSystemPath" }),
    Schema.Struct({
      type: Schema.Literal("special").annotate({ title: "SpecialFileSystemPathType" }),
      value: V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSpecialPath,
    }).annotate({ title: "SpecialFileSystemPath" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemGuardianApprovalReviewCompletedNotification__FileSystemPath" });

export type V2ItemGuardianApprovalReviewStartedNotification__FileSystemPath =
  | {
      readonly path: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString;
      readonly type: "path";
    }
  | { readonly pattern: string; readonly type: "glob_pattern" }
  | {
      readonly type: "special";
      readonly value: V2ItemGuardianApprovalReviewStartedNotification__FileSystemSpecialPath;
    };
export const V2ItemGuardianApprovalReviewStartedNotification__FileSystemPath = Schema.Union(
  [
    Schema.Struct({
      path: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
      type: Schema.Literal("path").annotate({ title: "PathFileSystemPathType" }),
    }).annotate({ title: "PathFileSystemPath" }),
    Schema.Struct({
      pattern: Schema.String,
      type: Schema.Literal("glob_pattern").annotate({ title: "GlobPatternFileSystemPathType" }),
    }).annotate({ title: "GlobPatternFileSystemPath" }),
    Schema.Struct({
      type: Schema.Literal("special").annotate({ title: "SpecialFileSystemPathType" }),
      value: V2ItemGuardianApprovalReviewStartedNotification__FileSystemSpecialPath,
    }).annotate({ title: "SpecialFileSystemPath" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemGuardianApprovalReviewStartedNotification__FileSystemPath" });

export type V2ItemStartedNotification__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ItemStartedNotification__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ItemStartedNotification__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ItemStartedNotification__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ItemStartedNotification__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ItemStartedNotification__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ItemStartedNotification__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ItemStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ItemStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2ItemStartedNotification__ImageDetail, Schema.Null]),
      ),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ItemStartedNotification__UserInput" });

export type V2ItemStartedNotification__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ItemStartedNotification__FunctionCallOutputContentItem>;
export const V2ItemStartedNotification__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ItemStartedNotification__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ItemStartedNotification__FunctionCallOutputBody" });

export type V2ModelListResponse__Model = {
  readonly additionalSpeedTiers?: ReadonlyArray<string>;
  readonly availabilityNux?: V2ModelListResponse__ModelAvailabilityNux | null;
  readonly availableAccessPrograms?: V2ModelListResponse__ModelAccessPrograms | null;
  readonly defaultReasoningEffort: V2ModelListResponse__ReasoningEffort;
  readonly defaultServiceTier?: string | null;
  readonly description: string;
  readonly displayName: string;
  readonly hidden: boolean;
  readonly id: string;
  readonly inputModalities?: ReadonlyArray<V2ModelListResponse__InputModality>;
  readonly isDefault: boolean;
  readonly model: string;
  readonly modelSpecialty?: string | null;
  readonly multiAgentVersion?: V2ModelListResponse__MultiAgentVersion | null;
  readonly serviceTiers?: ReadonlyArray<V2ModelListResponse__ModelServiceTier>;
  readonly supportedReasoningEfforts: ReadonlyArray<V2ModelListResponse__ReasoningEffortOption>;
  readonly supportsPersonality?: boolean;
  readonly upgrade?: string | null;
  readonly upgradeInfo?: V2ModelListResponse__ModelUpgradeInfo | null;
};
export const V2ModelListResponse__Model = Schema.Struct({
  additionalSpeedTiers: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "Deprecated: use `serviceTiers` instead.",
      default: [],
    }),
  ),
  availabilityNux: Schema.optionalKey(
    Schema.Union([V2ModelListResponse__ModelAvailabilityNux, Schema.Null]),
  ),
  availableAccessPrograms: Schema.optionalKey(
    Schema.Union([V2ModelListResponse__ModelAccessPrograms, Schema.Null]).annotate({
      description: "Null when the catalog does not provide access-program metadata.",
    }),
  ),
  defaultReasoningEffort: V2ModelListResponse__ReasoningEffort,
  defaultServiceTier: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Catalog default service tier id for this model, when one is configured.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.String,
  displayName: Schema.String,
  hidden: Schema.Boolean,
  id: Schema.String,
  inputModalities: Schema.optionalKey(
    Schema.Array(V2ModelListResponse__InputModality).annotate({ default: ["text", "image"] }),
  ),
  isDefault: Schema.Boolean,
  model: Schema.String,
  modelSpecialty: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  multiAgentVersion: Schema.optionalKey(
    Schema.Union([V2ModelListResponse__MultiAgentVersion, Schema.Null]).annotate({
      description: "Multi-agent runtime declared by this model, when available.",
    }),
  ),
  serviceTiers: Schema.optionalKey(
    Schema.Array(V2ModelListResponse__ModelServiceTier).annotate({ default: [] }),
  ),
  supportedReasoningEfforts: Schema.Array(V2ModelListResponse__ReasoningEffortOption),
  supportsPersonality: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "@deprecated Always false; models no longer support personality selection.",
      default: false,
    }),
  ),
  upgrade: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  upgradeInfo: Schema.optionalKey(
    Schema.Union([V2ModelListResponse__ModelUpgradeInfo, Schema.Null]),
  ),
}).annotate({ identifier: "V2ModelListResponse__Model" });

export type V2PluginInstalledResponse__PluginShareContext = {
  readonly canPublishToWorkspace?: boolean | null;
  readonly creatorAccountUserId?: string | null;
  readonly creatorName?: string | null;
  readonly discoverability?: V2PluginInstalledResponse__PluginShareDiscoverability | null;
  readonly remotePluginId: string;
  readonly remoteVersion?: string | null;
  readonly sharePrincipals?: ReadonlyArray<V2PluginInstalledResponse__PluginSharePrincipal> | null;
  readonly shareUrl?: string | null;
};
export const V2PluginInstalledResponse__PluginShareContext = Schema.Struct({
  canPublishToWorkspace: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  creatorAccountUserId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  creatorName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  discoverability: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__PluginShareDiscoverability, Schema.Null]),
  ),
  remotePluginId: Schema.String,
  remoteVersion: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version of the remote shared plugin release when available.",
      }),
      Schema.Null,
    ]),
  ),
  sharePrincipals: Schema.optionalKey(
    Schema.Union([Schema.Array(V2PluginInstalledResponse__PluginSharePrincipal), Schema.Null]),
  ),
  shareUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginInstalledResponse__PluginShareContext" });

export type V2PluginListResponse__PluginShareContext = {
  readonly canPublishToWorkspace?: boolean | null;
  readonly creatorAccountUserId?: string | null;
  readonly creatorName?: string | null;
  readonly discoverability?: V2PluginListResponse__PluginShareDiscoverability | null;
  readonly remotePluginId: string;
  readonly remoteVersion?: string | null;
  readonly sharePrincipals?: ReadonlyArray<V2PluginListResponse__PluginSharePrincipal> | null;
  readonly shareUrl?: string | null;
};
export const V2PluginListResponse__PluginShareContext = Schema.Struct({
  canPublishToWorkspace: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  creatorAccountUserId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  creatorName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  discoverability: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__PluginShareDiscoverability, Schema.Null]),
  ),
  remotePluginId: Schema.String,
  remoteVersion: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version of the remote shared plugin release when available.",
      }),
      Schema.Null,
    ]),
  ),
  sharePrincipals: Schema.optionalKey(
    Schema.Union([Schema.Array(V2PluginListResponse__PluginSharePrincipal), Schema.Null]),
  ),
  shareUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginListResponse__PluginShareContext" });

export type V2PluginReadResponse__SkillSummary = {
  readonly description: string;
  readonly enabled: boolean;
  readonly interface?: V2PluginReadResponse__SkillInterface | null;
  readonly name: string;
  readonly path?: V2PluginReadResponse__AbsolutePathBuf | null;
  readonly shortDescription?: string | null;
};
export const V2PluginReadResponse__SkillSummary = Schema.Struct({
  description: Schema.String,
  enabled: Schema.Boolean,
  interface: Schema.optionalKey(Schema.Union([V2PluginReadResponse__SkillInterface, Schema.Null])),
  name: Schema.String,
  path: Schema.optionalKey(Schema.Union([V2PluginReadResponse__AbsolutePathBuf, Schema.Null])),
  shortDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginReadResponse__SkillSummary" });

export type V2PluginReadResponse__ScheduledTaskSummary = {
  readonly key: string;
  readonly name: string;
  readonly prompt: string;
  readonly schedule: V2PluginReadResponse__ScheduledTaskSchedule;
};
export const V2PluginReadResponse__ScheduledTaskSummary = Schema.Struct({
  key: Schema.String,
  name: Schema.String,
  prompt: Schema.String,
  schedule: V2PluginReadResponse__ScheduledTaskSchedule,
}).annotate({ identifier: "V2PluginReadResponse__ScheduledTaskSummary" });

export type V2PluginReadResponse__PluginShareContext = {
  readonly canPublishToWorkspace?: boolean | null;
  readonly creatorAccountUserId?: string | null;
  readonly creatorName?: string | null;
  readonly discoverability?: V2PluginReadResponse__PluginShareDiscoverability | null;
  readonly remotePluginId: string;
  readonly remoteVersion?: string | null;
  readonly sharePrincipals?: ReadonlyArray<V2PluginReadResponse__PluginSharePrincipal> | null;
  readonly shareUrl?: string | null;
};
export const V2PluginReadResponse__PluginShareContext = Schema.Struct({
  canPublishToWorkspace: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  creatorAccountUserId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  creatorName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  discoverability: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__PluginShareDiscoverability, Schema.Null]),
  ),
  remotePluginId: Schema.String,
  remoteVersion: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version of the remote shared plugin release when available.",
      }),
      Schema.Null,
    ]),
  ),
  sharePrincipals: Schema.optionalKey(
    Schema.Union([Schema.Array(V2PluginReadResponse__PluginSharePrincipal), Schema.Null]),
  ),
  shareUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginReadResponse__PluginShareContext" });

export type V2PluginShareListResponse__PluginShareContext = {
  readonly canPublishToWorkspace?: boolean | null;
  readonly creatorAccountUserId?: string | null;
  readonly creatorName?: string | null;
  readonly discoverability?: V2PluginShareListResponse__PluginShareDiscoverability | null;
  readonly remotePluginId: string;
  readonly remoteVersion?: string | null;
  readonly sharePrincipals?: ReadonlyArray<V2PluginShareListResponse__PluginSharePrincipal> | null;
  readonly shareUrl?: string | null;
};
export const V2PluginShareListResponse__PluginShareContext = Schema.Struct({
  canPublishToWorkspace: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  creatorAccountUserId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  creatorName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  discoverability: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__PluginShareDiscoverability, Schema.Null]),
  ),
  remotePluginId: Schema.String,
  remoteVersion: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version of the remote shared plugin release when available.",
      }),
      Schema.Null,
    ]),
  ),
  sharePrincipals: Schema.optionalKey(
    Schema.Union([Schema.Array(V2PluginShareListResponse__PluginSharePrincipal), Schema.Null]),
  ),
  shareUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginShareListResponse__PluginShareContext" });

export type V2RawResponseItemCompletedNotification__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2RawResponseItemCompletedNotification__FunctionCallOutputContentItem>;
export const V2RawResponseItemCompletedNotification__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2RawResponseItemCompletedNotification__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2RawResponseItemCompletedNotification__FunctionCallOutputBody" });

export type V2ReviewStartResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ReviewStartResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ReviewStartResponse__MisalignmentErrorDetails | null;
};
export const V2ReviewStartResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ReviewStartResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ReviewStartResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ReviewStartResponse__TurnError" });

export type V2ReviewStartResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ReviewStartResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ReviewStartResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ReviewStartResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ReviewStartResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ReviewStartResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ReviewStartResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ReviewStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ReviewStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2ReviewStartResponse__ImageDetail, Schema.Null])),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ReviewStartResponse__UserInput" });

export type V2ReviewStartResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ReviewStartResponse__FunctionCallOutputContentItem>;
export const V2ReviewStartResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ReviewStartResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ReviewStartResponse__FunctionCallOutputBody" });

export type V2SkillsListResponse__SkillMetadata = {
  readonly dependencies?: V2SkillsListResponse__SkillDependencies | null;
  readonly description: string;
  readonly enabled: boolean;
  readonly interface?: V2SkillsListResponse__SkillInterface | null;
  readonly name: string;
  readonly path: V2SkillsListResponse__AbsolutePathBuf;
  readonly pluginId?: string | null;
  readonly scope: V2SkillsListResponse__SkillScope;
  readonly shortDescription?: string | null;
};
export const V2SkillsListResponse__SkillMetadata = Schema.Struct({
  dependencies: Schema.optionalKey(
    Schema.Union([V2SkillsListResponse__SkillDependencies, Schema.Null]),
  ),
  description: Schema.String,
  enabled: Schema.Boolean,
  interface: Schema.optionalKey(Schema.Union([V2SkillsListResponse__SkillInterface, Schema.Null])),
  name: Schema.String,
  path: V2SkillsListResponse__AbsolutePathBuf,
  pluginId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Owning plugin ID, matching `PluginSummary.id`, when known.",
      }),
      Schema.Null,
    ]),
  ),
  scope: V2SkillsListResponse__SkillScope,
  shortDescription: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Legacy short_description from SKILL.md. Prefer SKILL.json interface.short_description.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2SkillsListResponse__SkillMetadata" });

export type V2ThreadForkResponse__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadForkResponse__SubAgentSource };
export const V2ThreadForkResponse__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadForkResponse__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadForkResponse__SessionSource" });

export type V2ThreadForkResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadForkResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadForkResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadForkResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadForkResponse__TurnError" });

export type V2ThreadForkResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadForkResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadForkResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadForkResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadForkResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadForkResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadForkResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadForkResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadForkResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2ThreadForkResponse__ImageDetail, Schema.Null])),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadForkResponse__UserInput" });

export type V2ThreadForkResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadForkResponse__FunctionCallOutputContentItem>;
export const V2ThreadForkResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadForkResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadForkResponse__FunctionCallOutputBody" });

export type V2ThreadItemsListResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadItemsListResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadItemsListResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadItemsListResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadItemsListResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadItemsListResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadItemsListResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadItemsListResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadItemsListResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2ThreadItemsListResponse__ImageDetail, Schema.Null]),
      ),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadItemsListResponse__UserInput" });

export type V2ThreadItemsListResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadItemsListResponse__FunctionCallOutputContentItem>;
export const V2ThreadItemsListResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadItemsListResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadItemsListResponse__FunctionCallOutputBody" });

export type V2ThreadListResponse__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadListResponse__SubAgentSource };
export const V2ThreadListResponse__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadListResponse__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadListResponse__SessionSource" });

export type V2ThreadListResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadListResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadListResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadListResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadListResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadListResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadListResponse__TurnError" });

export type V2ThreadListResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadListResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadListResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadListResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadListResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadListResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadListResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadListResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadListResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2ThreadListResponse__ImageDetail, Schema.Null])),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadListResponse__UserInput" });

export type V2ThreadListResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadListResponse__FunctionCallOutputContentItem>;
export const V2ThreadListResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadListResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadListResponse__FunctionCallOutputBody" });

export type V2ThreadMetadataUpdateResponse__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadMetadataUpdateResponse__SubAgentSource };
export const V2ThreadMetadataUpdateResponse__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadMetadataUpdateResponse__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__SessionSource" });

export type V2ThreadMetadataUpdateResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadMetadataUpdateResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadMetadataUpdateResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadMetadataUpdateResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadMetadataUpdateResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadMetadataUpdateResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__TurnError" });

export type V2ThreadMetadataUpdateResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadMetadataUpdateResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadMetadataUpdateResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadMetadataUpdateResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadMetadataUpdateResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadMetadataUpdateResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadMetadataUpdateResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadMetadataUpdateResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadMetadataUpdateResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2ThreadMetadataUpdateResponse__ImageDetail, Schema.Null]),
      ),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__UserInput" });

export type V2ThreadMetadataUpdateResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadMetadataUpdateResponse__FunctionCallOutputContentItem>;
export const V2ThreadMetadataUpdateResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadMetadataUpdateResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__FunctionCallOutputBody" });

export type V2ThreadReadResponse__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadReadResponse__SubAgentSource };
export const V2ThreadReadResponse__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadReadResponse__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadReadResponse__SessionSource" });
