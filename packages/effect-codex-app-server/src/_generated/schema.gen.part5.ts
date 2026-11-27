import * as Schema from "effect/Schema";

export type V2ThreadRevertResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadRevertResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadRevertResponse__WebSearchAction" });

export type V2ThreadRevertResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadRevertResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadRevertResponse__ImageGenerationFailure" });

export type V2ThreadRevertResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadRevertResponse__TurnItemsView = Schema.Union(
  [
    Schema.Literal("notLoaded").annotate({
      description: "`items` was not loaded for this turn. The field is intentionally empty.",
    }),
    Schema.Literal("summary").annotate({
      description: "`items` contains only a display summary for this turn.",
    }),
    Schema.Literal("full").annotate({
      description:
        "`items` contains every ThreadItem available from persisted app-server history for this turn.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadRevertResponse__TurnItemsView" });

export type V2ThreadRevertResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadRevertResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadRevertResponse__TurnStatus" });

export type V2ThreadSectionCreateParams__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadSectionCreateParams__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadSectionCreateParams__ThreadSectionAppearance",
});

export type V2ThreadSectionCreateResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadSectionCreateResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadSectionCreateResponse__ThreadSectionAppearance",
});

export type V2ThreadSectionListResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadSectionListResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadSectionListResponse__ThreadSectionAppearance",
});

export type V2ThreadSectionUpdateParams__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadSectionUpdateParams__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadSectionUpdateParams__ThreadSectionAppearance",
});

export type V2ThreadSectionUpdateResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadSectionUpdateResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadSectionUpdateResponse__ThreadSectionAppearance",
});

export type V2ThreadSettingsUpdatedNotification__ActivePermissionProfile = {
  readonly extends?: string | null;
  readonly id: string;
};
export const V2ThreadSettingsUpdatedNotification__ActivePermissionProfile = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadSettingsUpdatedNotification__ActivePermissionProfile" });

export type V2ThreadSettingsUpdatedNotification__AskForApproval =
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
export const V2ThreadSettingsUpdatedNotification__AskForApproval = Schema.Union(
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
).annotate({ identifier: "V2ThreadSettingsUpdatedNotification__AskForApproval" });

export type V2ThreadSettingsUpdatedNotification__ApprovalsReviewer =
  | "user"
  | "auto_review"
  | "guardian_subagent";
export const V2ThreadSettingsUpdatedNotification__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2ThreadSettingsUpdatedNotification__ApprovalsReviewer",
});

export type V2ThreadSettingsUpdatedNotification__ModeKind = "plan" | "default";
export const V2ThreadSettingsUpdatedNotification__ModeKind = Schema.Literals([
  "plan",
  "default",
]).annotate({
  description: "Initial collaboration mode to use when the TUI starts.",
  identifier: "V2ThreadSettingsUpdatedNotification__ModeKind",
});

export type V2ThreadSettingsUpdatedNotification__ReasoningEffort = string;
export const V2ThreadSettingsUpdatedNotification__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadSettingsUpdatedNotification__ReasoningEffort",
  }),
);

export type V2ThreadSettingsUpdatedNotification__AbsolutePathBuf = string;
export const V2ThreadSettingsUpdatedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadSettingsUpdatedNotification__AbsolutePathBuf",
});

export type V2ThreadSettingsUpdatedNotification__Personality = "none" | "friendly" | "pragmatic";
export const V2ThreadSettingsUpdatedNotification__Personality = Schema.Literals([
  "none",
  "friendly",
  "pragmatic",
]).annotate({
  description: "Deprecated: `friendly` and `pragmatic` no longer select a style.",
  identifier: "V2ThreadSettingsUpdatedNotification__Personality",
});

export type V2ThreadSettingsUpdatedNotification__NetworkAccess = "restricted" | "enabled";
export const V2ThreadSettingsUpdatedNotification__NetworkAccess = Schema.Literals([
  "restricted",
  "enabled",
]).annotate({ identifier: "V2ThreadSettingsUpdatedNotification__NetworkAccess" });

export type V2ThreadSettingsUpdatedNotification__ReasoningSummary =
  | "auto"
  | "concise"
  | "detailed"
  | "none";
export const V2ThreadSettingsUpdatedNotification__ReasoningSummary = Schema.Union(
  [
    Schema.Literals(["auto", "concise", "detailed"]),
    Schema.Literal("none").annotate({ description: "Option to disable reasoning summaries." }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. See https://platform.openai.com/docs/guides/reasoning?api-mode=responses#reasoning-summaries",
  identifier: "V2ThreadSettingsUpdatedNotification__ReasoningSummary",
});

export type V2ThreadStartedNotification__AbsolutePathBuf = string;
export const V2ThreadStartedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadStartedNotification__AbsolutePathBuf",
});

export type V2ThreadStartedNotification__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadStartedNotification__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadStartedNotification__GitInfo" });

export type V2ThreadStartedNotification__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadStartedNotification__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadStartedNotification__ThreadHistoryMode" });

export type V2ThreadStartedNotification__ReasoningEffort = string;
export const V2ThreadStartedNotification__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadStartedNotification__ReasoningEffort",
  }),
);

export type V2ThreadStartedNotification__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadStartedNotification__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadStartedNotification__ThreadSectionAppearance",
});

export type V2ThreadStartedNotification__AgentPath = string;
export const V2ThreadStartedNotification__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadStartedNotification__AgentPath",
});

export type V2ThreadStartedNotification__ThreadId = string;
export const V2ThreadStartedNotification__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadStartedNotification__ThreadId",
});

export type V2ThreadStartedNotification__ThreadActiveFlag =
  | "waitingOnApproval"
  | "waitingOnUserInput";
export const V2ThreadStartedNotification__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadStartedNotification__ThreadActiveFlag" });

export type V2ThreadStartedNotification__ThreadSource = string;
export const V2ThreadStartedNotification__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadStartedNotification__ThreadSource",
});

export type V2ThreadStartedNotification__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadStartedNotification__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadStartedNotification__NonSteerableTurnKind" });

export type V2ThreadStartedNotification__MisalignmentSteer = { readonly message: string };
export const V2ThreadStartedNotification__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadStartedNotification__MisalignmentSteer" });

export type V2ThreadStartedNotification__ByteRange = {
  readonly end: number;
  readonly start: number;
};
export const V2ThreadStartedNotification__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadStartedNotification__ByteRange" });

export type V2ThreadStartedNotification__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadStartedNotification__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadStartedNotification__ImageDetail" });

export type V2ThreadStartedNotification__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadStartedNotification__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadStartedNotification__HookPromptFragment" });

export type V2ThreadStartedNotification__AgentMessageDelivery = "async";
export const V2ThreadStartedNotification__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadStartedNotification__AgentMessageDelivery",
});

export type V2ThreadStartedNotification__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadStartedNotification__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadStartedNotification__MemoryCitationEntry" });

export type V2ThreadStartedNotification__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2ThreadStartedNotification__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadStartedNotification__MessagePhase",
});

export type V2ThreadStartedNotification__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadStartedNotification__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadStartedNotification__AsyncUserInputQuestion" });

export type V2ThreadStartedNotification__LegacyAppPathString = string;
export const V2ThreadStartedNotification__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadStartedNotification__LegacyAppPathString",
});

export type V2ThreadStartedNotification__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadStartedNotification__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadStartedNotification__CommandExecutionSource" });

export type V2ThreadStartedNotification__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadStartedNotification__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadStartedNotification__CommandExecutionStatus" });

export type V2ThreadStartedNotification__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadStartedNotification__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartedNotification__PatchChangeKind" });

export type V2ThreadStartedNotification__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadStartedNotification__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadStartedNotification__PatchApplyStatus" });

export type V2ThreadStartedNotification__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadStartedNotification__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadStartedNotification__McpToolCallAppContext" });

export type V2ThreadStartedNotification__McpToolCallError = { readonly message: string };
export const V2ThreadStartedNotification__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadStartedNotification__McpToolCallError" });

export type V2ThreadStartedNotification__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadStartedNotification__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadStartedNotification__McpAppDisplayMode" });

export type V2ThreadStartedNotification__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadStartedNotification__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadStartedNotification__McpToolCallResult" });

export type V2ThreadStartedNotification__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadStartedNotification__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadStartedNotification__McpToolCallStatus" });

export type V2ThreadStartedNotification__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadStartedNotification__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartedNotification__DynamicToolCallOutputContentItem" });

export type V2ThreadStartedNotification__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2ThreadStartedNotification__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadStartedNotification__DynamicToolCallStatus" });

export type V2ThreadStartedNotification__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadStartedNotification__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadStartedNotification__CollabAgentStatus" });

export type V2ThreadStartedNotification__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadStartedNotification__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadStartedNotification__CollabAgentToolCallStatus" });

export type V2ThreadStartedNotification__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadStartedNotification__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadStartedNotification__CollabAgentTool" });

export type V2ThreadStartedNotification__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadStartedNotification__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadStartedNotification__SubAgentActivityKind" });

export type V2ThreadStartedNotification__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadStartedNotification__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartedNotification__WebSearchAction" });

export type V2ThreadStartedNotification__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadStartedNotification__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartedNotification__ImageGenerationFailure" });

export type V2ThreadStartedNotification__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadStartedNotification__TurnItemsView = Schema.Union(
  [
    Schema.Literal("notLoaded").annotate({
      description: "`items` was not loaded for this turn. The field is intentionally empty.",
    }),
    Schema.Literal("summary").annotate({
      description: "`items` contains only a display summary for this turn.",
    }),
    Schema.Literal("full").annotate({
      description:
        "`items` contains every ThreadItem available from persisted app-server history for this turn.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartedNotification__TurnItemsView" });

export type V2ThreadStartedNotification__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadStartedNotification__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadStartedNotification__TurnStatus" });

export type V2ThreadStartParams__AskForApproval =
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
export const V2ThreadStartParams__AskForApproval = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartParams__AskForApproval" });

export type V2ThreadStartParams__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const V2ThreadStartParams__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2ThreadStartParams__ApprovalsReviewer",
});

export type V2ThreadStartParams__Personality = "none" | "friendly" | "pragmatic";
export const V2ThreadStartParams__Personality = Schema.Literals([
  "none",
  "friendly",
  "pragmatic",
]).annotate({
  description: "Deprecated: `friendly` and `pragmatic` no longer select a style.",
  identifier: "V2ThreadStartParams__Personality",
});

export type V2ThreadStartParams__SandboxMode =
  | "read-only"
  | "workspace-write"
  | "danger-full-access";
export const V2ThreadStartParams__SandboxMode = Schema.Literals([
  "read-only",
  "workspace-write",
  "danger-full-access",
]).annotate({ identifier: "V2ThreadStartParams__SandboxMode" });

export type V2ThreadStartParams__ThreadStartSource = "startup" | "clear";
export const V2ThreadStartParams__ThreadStartSource = Schema.Literals([
  "startup",
  "clear",
]).annotate({ identifier: "V2ThreadStartParams__ThreadStartSource" });

export type V2ThreadStartParams__ThreadSource = string;
export const V2ThreadStartParams__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadStartParams__ThreadSource",
});

export type V2ThreadStartParams__DynamicToolNamespaceTool = {
  readonly deferLoading?: boolean;
  readonly description: string;
  readonly inputSchema: Schema.Json;
  readonly name: string;
  readonly type: "function";
};
export const V2ThreadStartParams__DynamicToolNamespaceTool = Schema.Union(
  [
    Schema.Struct({
      deferLoading: Schema.optionalKey(Schema.Boolean),
      description: Schema.String,
      inputSchema: Schema.Json.annotate({ expected: "JSON value" }),
      name: Schema.String,
      type: Schema.Literal("function").annotate({ title: "FunctionDynamicToolNamespaceToolType" }),
    }).annotate({ title: "FunctionDynamicToolNamespaceTool" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartParams__DynamicToolNamespaceTool" });

export type V2ThreadStartParams__CapabilityRootLocation = {
  readonly environmentId: string;
  readonly path: string;
  readonly type: "environment";
};
export const V2ThreadStartParams__CapabilityRootLocation = Schema.Union(
  [
    Schema.Struct({
      environmentId: Schema.String,
      path: Schema.String.annotate({
        description: "Absolute path for the root in the selected environment.",
      }),
      type: Schema.Literal("environment").annotate({
        title: "EnvironmentCapabilityRootLocationType",
      }),
    }).annotate({
      title: "EnvironmentCapabilityRootLocation",
      description: "A path owned by an execution environment.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "Location used to resolve a selected capability root.",
  identifier: "V2ThreadStartParams__CapabilityRootLocation",
});

export type V2ThreadStartParams__LegacyAppPathString = string;
export const V2ThreadStartParams__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadStartParams__LegacyAppPathString",
});

export type V2ThreadStartResponse__AskForApproval =
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
export const V2ThreadStartResponse__AskForApproval = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartResponse__AskForApproval" });

export type V2ThreadStartResponse__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const V2ThreadStartResponse__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2ThreadStartResponse__ApprovalsReviewer",
});

export type V2ThreadStartResponse__AbsolutePathBuf = string;
export const V2ThreadStartResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadStartResponse__AbsolutePathBuf",
});

export type V2ThreadStartResponse__LegacyAppPathString = string;
export const V2ThreadStartResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadStartResponse__LegacyAppPathString",
});

export type V2ThreadStartResponse__ReasoningEffort = string;
export const V2ThreadStartResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadStartResponse__ReasoningEffort",
  }),
);

export type V2ThreadStartResponse__NetworkAccess = "restricted" | "enabled";
export const V2ThreadStartResponse__NetworkAccess = Schema.Literals([
  "restricted",
  "enabled",
]).annotate({ identifier: "V2ThreadStartResponse__NetworkAccess" });

export type V2ThreadStartResponse__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadStartResponse__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadStartResponse__GitInfo" });

export type V2ThreadStartResponse__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadStartResponse__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadStartResponse__ThreadHistoryMode" });

export type V2ThreadStartResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadStartResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadStartResponse__ThreadSectionAppearance",
});

export type V2ThreadStartResponse__AgentPath = string;
export const V2ThreadStartResponse__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadStartResponse__AgentPath",
});

export type V2ThreadStartResponse__ThreadId = string;
export const V2ThreadStartResponse__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadStartResponse__ThreadId",
});

export type V2ThreadStartResponse__ThreadActiveFlag = "waitingOnApproval" | "waitingOnUserInput";
export const V2ThreadStartResponse__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadStartResponse__ThreadActiveFlag" });

export type V2ThreadStartResponse__ThreadSource = string;
export const V2ThreadStartResponse__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadStartResponse__ThreadSource",
});

export type V2ThreadStartResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadStartResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadStartResponse__NonSteerableTurnKind" });

export type V2ThreadStartResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadStartResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadStartResponse__MisalignmentSteer" });

export type V2ThreadStartResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadStartResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadStartResponse__ByteRange" });

export type V2ThreadStartResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadStartResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadStartResponse__ImageDetail" });

export type V2ThreadStartResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadStartResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadStartResponse__HookPromptFragment" });

export type V2ThreadStartResponse__AgentMessageDelivery = "async";
export const V2ThreadStartResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadStartResponse__AgentMessageDelivery",
});

export type V2ThreadStartResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadStartResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadStartResponse__MemoryCitationEntry" });

export type V2ThreadStartResponse__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2ThreadStartResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadStartResponse__MessagePhase",
});

export type V2ThreadStartResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadStartResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadStartResponse__AsyncUserInputQuestion" });

export type V2ThreadStartResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadStartResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadStartResponse__CommandExecutionSource" });

export type V2ThreadStartResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadStartResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadStartResponse__CommandExecutionStatus" });

export type V2ThreadStartResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadStartResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartResponse__PatchChangeKind" });

export type V2ThreadStartResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadStartResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadStartResponse__PatchApplyStatus" });

export type V2ThreadStartResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadStartResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadStartResponse__McpToolCallAppContext" });

export type V2ThreadStartResponse__McpToolCallError = { readonly message: string };
export const V2ThreadStartResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadStartResponse__McpToolCallError" });

export type V2ThreadStartResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadStartResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadStartResponse__McpAppDisplayMode" });

export type V2ThreadStartResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadStartResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadStartResponse__McpToolCallResult" });

export type V2ThreadStartResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadStartResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadStartResponse__McpToolCallStatus" });

export type V2ThreadStartResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadStartResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadStartResponse__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadStartResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadStartResponse__DynamicToolCallStatus" });

export type V2ThreadStartResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadStartResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadStartResponse__CollabAgentStatus" });

export type V2ThreadStartResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadStartResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadStartResponse__CollabAgentToolCallStatus" });

export type V2ThreadStartResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadStartResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadStartResponse__CollabAgentTool" });

export type V2ThreadStartResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadStartResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadStartResponse__SubAgentActivityKind" });

export type V2ThreadStartResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadStartResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartResponse__WebSearchAction" });

export type V2ThreadStartResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadStartResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadStartResponse__ImageGenerationFailure" });

export type V2ThreadStartResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadStartResponse__TurnItemsView = Schema.Union(
  [
    Schema.Literal("notLoaded").annotate({
      description: "`items` was not loaded for this turn. The field is intentionally empty.",
    }),
    Schema.Literal("summary").annotate({
      description: "`items` contains only a display summary for this turn.",
    }),
    Schema.Literal("full").annotate({
      description:
        "`items` contains every ThreadItem available from persisted app-server history for this turn.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartResponse__TurnItemsView" });

export type V2ThreadStartResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadStartResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadStartResponse__TurnStatus" });

export type V2ThreadStatusChangedNotification__ThreadActiveFlag =
  | "waitingOnApproval"
  | "waitingOnUserInput";
export const V2ThreadStatusChangedNotification__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadStatusChangedNotification__ThreadActiveFlag" });

export type V2ThreadTokenUsageUpdatedNotification__TokenUsageBreakdown = {
  readonly cacheWriteInputTokens?: number;
  readonly cachedInputTokens: number;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly reasoningOutputTokens: number;
  readonly totalTokens: number;
};
export const V2ThreadTokenUsageUpdatedNotification__TokenUsageBreakdown = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadTokenUsageUpdatedNotification__TokenUsageBreakdown" });

export type V2ThreadTurnsListParams__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadTurnsListParams__TurnItemsView = Schema.Union(
  [
    Schema.Literal("notLoaded").annotate({
      description: "`items` was not loaded for this turn. The field is intentionally empty.",
    }),
    Schema.Literal("summary").annotate({
      description: "`items` contains only a display summary for this turn.",
    }),
    Schema.Literal("full").annotate({
      description:
        "`items` contains every ThreadItem available from persisted app-server history for this turn.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadTurnsListParams__TurnItemsView" });

export type V2ThreadTurnsListParams__SortDirection = "asc" | "desc";
export const V2ThreadTurnsListParams__SortDirection = Schema.Literals(["asc", "desc"]).annotate({
  identifier: "V2ThreadTurnsListParams__SortDirection",
});

export type V2ThreadTurnsListResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadTurnsListResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadTurnsListResponse__NonSteerableTurnKind" });

export type V2ThreadTurnsListResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadTurnsListResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadTurnsListResponse__MisalignmentSteer" });

export type V2ThreadTurnsListResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadTurnsListResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadTurnsListResponse__ByteRange" });

export type V2ThreadTurnsListResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadTurnsListResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadTurnsListResponse__ImageDetail" });

export type V2ThreadTurnsListResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadTurnsListResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadTurnsListResponse__HookPromptFragment" });

export type V2ThreadTurnsListResponse__AgentMessageDelivery = "async";
export const V2ThreadTurnsListResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadTurnsListResponse__AgentMessageDelivery",
});

export type V2ThreadTurnsListResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadTurnsListResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadTurnsListResponse__MemoryCitationEntry" });

export type V2ThreadTurnsListResponse__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2ThreadTurnsListResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadTurnsListResponse__MessagePhase",
});

export type V2ThreadTurnsListResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadTurnsListResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadTurnsListResponse__AsyncUserInputQuestion" });

export type V2ThreadTurnsListResponse__LegacyAppPathString = string;
export const V2ThreadTurnsListResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadTurnsListResponse__LegacyAppPathString",
});

export type V2ThreadTurnsListResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadTurnsListResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadTurnsListResponse__CommandExecutionSource" });

export type V2ThreadTurnsListResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadTurnsListResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadTurnsListResponse__CommandExecutionStatus" });

export type V2ThreadTurnsListResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadTurnsListResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadTurnsListResponse__PatchChangeKind" });

export type V2ThreadTurnsListResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadTurnsListResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadTurnsListResponse__PatchApplyStatus" });

export type V2ThreadTurnsListResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadTurnsListResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadTurnsListResponse__McpToolCallAppContext" });

export type V2ThreadTurnsListResponse__McpToolCallError = { readonly message: string };
export const V2ThreadTurnsListResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadTurnsListResponse__McpToolCallError" });

export type V2ThreadTurnsListResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadTurnsListResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadTurnsListResponse__McpAppDisplayMode" });

export type V2ThreadTurnsListResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadTurnsListResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadTurnsListResponse__McpToolCallResult" });

export type V2ThreadTurnsListResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadTurnsListResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadTurnsListResponse__McpToolCallStatus" });

export type V2ThreadTurnsListResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadTurnsListResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadTurnsListResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadTurnsListResponse__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2ThreadTurnsListResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadTurnsListResponse__DynamicToolCallStatus" });

export type V2ThreadTurnsListResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadTurnsListResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadTurnsListResponse__CollabAgentStatus" });

export type V2ThreadTurnsListResponse__ReasoningEffort = string;
export const V2ThreadTurnsListResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadTurnsListResponse__ReasoningEffort",
  }),
);

export type V2ThreadTurnsListResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadTurnsListResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadTurnsListResponse__CollabAgentToolCallStatus" });

export type V2ThreadTurnsListResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadTurnsListResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadTurnsListResponse__CollabAgentTool" });

export type V2ThreadTurnsListResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadTurnsListResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadTurnsListResponse__SubAgentActivityKind" });

export type V2ThreadTurnsListResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadTurnsListResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadTurnsListResponse__WebSearchAction" });

export type V2ThreadTurnsListResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadTurnsListResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadTurnsListResponse__ImageGenerationFailure" });

export type V2ThreadTurnsListResponse__AbsolutePathBuf = string;
export const V2ThreadTurnsListResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadTurnsListResponse__AbsolutePathBuf",
});

export type V2ThreadTurnsListResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadTurnsListResponse__TurnItemsView = Schema.Union(
  [
    Schema.Literal("notLoaded").annotate({
      description: "`items` was not loaded for this turn. The field is intentionally empty.",
    }),
    Schema.Literal("summary").annotate({
      description: "`items` contains only a display summary for this turn.",
    }),
    Schema.Literal("full").annotate({
      description:
        "`items` contains every ThreadItem available from persisted app-server history for this turn.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadTurnsListResponse__TurnItemsView" });

export type V2ThreadTurnsListResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadTurnsListResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadTurnsListResponse__TurnStatus" });

export type V2ThreadUnarchiveResponse__AbsolutePathBuf = string;
export const V2ThreadUnarchiveResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadUnarchiveResponse__AbsolutePathBuf",
});

export type V2ThreadUnarchiveResponse__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadUnarchiveResponse__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadUnarchiveResponse__GitInfo" });

export type V2ThreadUnarchiveResponse__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadUnarchiveResponse__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__ThreadHistoryMode" });

export type V2ThreadUnarchiveResponse__ReasoningEffort = string;
export const V2ThreadUnarchiveResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadUnarchiveResponse__ReasoningEffort",
  }),
);

export type V2ThreadUnarchiveResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadUnarchiveResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadUnarchiveResponse__ThreadSectionAppearance",
});

export type V2ThreadUnarchiveResponse__AgentPath = string;
export const V2ThreadUnarchiveResponse__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadUnarchiveResponse__AgentPath",
});

export type V2ThreadUnarchiveResponse__ThreadId = string;
export const V2ThreadUnarchiveResponse__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadUnarchiveResponse__ThreadId",
});

export type V2ThreadUnarchiveResponse__ThreadActiveFlag =
  | "waitingOnApproval"
  | "waitingOnUserInput";
export const V2ThreadUnarchiveResponse__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__ThreadActiveFlag" });

export type V2ThreadUnarchiveResponse__ThreadSource = string;
export const V2ThreadUnarchiveResponse__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadUnarchiveResponse__ThreadSource",
});

export type V2ThreadUnarchiveResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadUnarchiveResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__NonSteerableTurnKind" });

export type V2ThreadUnarchiveResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadUnarchiveResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadUnarchiveResponse__MisalignmentSteer" });

export type V2ThreadUnarchiveResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadUnarchiveResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadUnarchiveResponse__ByteRange" });

export type V2ThreadUnarchiveResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadUnarchiveResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__ImageDetail" });

export type V2ThreadUnarchiveResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadUnarchiveResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadUnarchiveResponse__HookPromptFragment" });

export type V2ThreadUnarchiveResponse__AgentMessageDelivery = "async";
export const V2ThreadUnarchiveResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadUnarchiveResponse__AgentMessageDelivery",
});

export type V2ThreadUnarchiveResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadUnarchiveResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadUnarchiveResponse__MemoryCitationEntry" });

export type V2ThreadUnarchiveResponse__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2ThreadUnarchiveResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadUnarchiveResponse__MessagePhase",
});

export type V2ThreadUnarchiveResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadUnarchiveResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadUnarchiveResponse__AsyncUserInputQuestion" });

export type V2ThreadUnarchiveResponse__LegacyAppPathString = string;
export const V2ThreadUnarchiveResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadUnarchiveResponse__LegacyAppPathString",
});

export type V2ThreadUnarchiveResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadUnarchiveResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__CommandExecutionSource" });

export type V2ThreadUnarchiveResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadUnarchiveResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__CommandExecutionStatus" });

export type V2ThreadUnarchiveResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadUnarchiveResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadUnarchiveResponse__PatchChangeKind" });

export type V2ThreadUnarchiveResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadUnarchiveResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__PatchApplyStatus" });

export type V2ThreadUnarchiveResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadUnarchiveResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadUnarchiveResponse__McpToolCallAppContext" });

export type V2ThreadUnarchiveResponse__McpToolCallError = { readonly message: string };
export const V2ThreadUnarchiveResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadUnarchiveResponse__McpToolCallError" });

export type V2ThreadUnarchiveResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadUnarchiveResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__McpAppDisplayMode" });

export type V2ThreadUnarchiveResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadUnarchiveResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadUnarchiveResponse__McpToolCallResult" });

export type V2ThreadUnarchiveResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadUnarchiveResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__McpToolCallStatus" });

export type V2ThreadUnarchiveResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadUnarchiveResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadUnarchiveResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadUnarchiveResponse__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2ThreadUnarchiveResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__DynamicToolCallStatus" });

export type V2ThreadUnarchiveResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadUnarchiveResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__CollabAgentStatus" });

export type V2ThreadUnarchiveResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadUnarchiveResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__CollabAgentToolCallStatus" });

export type V2ThreadUnarchiveResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadUnarchiveResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__CollabAgentTool" });

export type V2ThreadUnarchiveResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadUnarchiveResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__SubAgentActivityKind" });

export type V2ThreadUnarchiveResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadUnarchiveResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadUnarchiveResponse__WebSearchAction" });

export type V2ThreadUnarchiveResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadUnarchiveResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadUnarchiveResponse__ImageGenerationFailure" });

export type V2ThreadUnarchiveResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadUnarchiveResponse__TurnItemsView = Schema.Union(
  [
    Schema.Literal("notLoaded").annotate({
      description: "`items` was not loaded for this turn. The field is intentionally empty.",
    }),
    Schema.Literal("summary").annotate({
      description: "`items` contains only a display summary for this turn.",
    }),
    Schema.Literal("full").annotate({
      description:
        "`items` contains every ThreadItem available from persisted app-server history for this turn.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadUnarchiveResponse__TurnItemsView" });

export type V2ThreadUnarchiveResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadUnarchiveResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadUnarchiveResponse__TurnStatus" });

export type V2ThreadUnsubscribeResponse__ThreadUnsubscribeStatus =
  | "notLoaded"
  | "notSubscribed"
  | "unsubscribed";
export const V2ThreadUnsubscribeResponse__ThreadUnsubscribeStatus = Schema.Literals([
  "notLoaded",
  "notSubscribed",
  "unsubscribed",
]).annotate({ identifier: "V2ThreadUnsubscribeResponse__ThreadUnsubscribeStatus" });

export type V2TurnCompletedNotification__NonSteerableTurnKind = "review" | "compact";
export const V2TurnCompletedNotification__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2TurnCompletedNotification__NonSteerableTurnKind" });

export type V2TurnCompletedNotification__MisalignmentSteer = { readonly message: string };
export const V2TurnCompletedNotification__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2TurnCompletedNotification__MisalignmentSteer" });

export type V2TurnCompletedNotification__ByteRange = {
  readonly end: number;
  readonly start: number;
};
export const V2TurnCompletedNotification__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2TurnCompletedNotification__ByteRange" });

export type V2TurnCompletedNotification__ImageDetail = "auto" | "low" | "high" | "original";
export const V2TurnCompletedNotification__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2TurnCompletedNotification__ImageDetail" });

export type V2TurnCompletedNotification__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2TurnCompletedNotification__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2TurnCompletedNotification__HookPromptFragment" });

export type V2TurnCompletedNotification__AgentMessageDelivery = "async";
export const V2TurnCompletedNotification__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2TurnCompletedNotification__AgentMessageDelivery",
});

export type V2TurnCompletedNotification__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2TurnCompletedNotification__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2TurnCompletedNotification__MemoryCitationEntry" });

export type V2TurnCompletedNotification__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2TurnCompletedNotification__MessagePhase = Schema.Union(
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
  identifier: "V2TurnCompletedNotification__MessagePhase",
});

export type V2TurnCompletedNotification__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2TurnCompletedNotification__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2TurnCompletedNotification__AsyncUserInputQuestion" });

export type V2TurnCompletedNotification__LegacyAppPathString = string;
export const V2TurnCompletedNotification__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2TurnCompletedNotification__LegacyAppPathString",
});

export type V2TurnCompletedNotification__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2TurnCompletedNotification__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2TurnCompletedNotification__CommandExecutionSource" });

export type V2TurnCompletedNotification__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2TurnCompletedNotification__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2TurnCompletedNotification__CommandExecutionStatus" });

export type V2TurnCompletedNotification__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2TurnCompletedNotification__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2TurnCompletedNotification__PatchChangeKind" });
