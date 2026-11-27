import * as Schema from "effect/Schema";

export type V2ThreadListResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadListResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadListResponse__McpToolCallResult" });

export type V2ThreadListResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadListResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadListResponse__McpToolCallStatus" });

export type V2ThreadListResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadListResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadListResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadListResponse__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadListResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadListResponse__DynamicToolCallStatus" });

export type V2ThreadListResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadListResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadListResponse__CollabAgentStatus" });

export type V2ThreadListResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadListResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadListResponse__CollabAgentToolCallStatus" });

export type V2ThreadListResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadListResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadListResponse__CollabAgentTool" });

export type V2ThreadListResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadListResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadListResponse__SubAgentActivityKind" });

export type V2ThreadListResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadListResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadListResponse__WebSearchAction" });

export type V2ThreadListResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadListResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadListResponse__ImageGenerationFailure" });

export type V2ThreadListResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadListResponse__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2ThreadListResponse__TurnItemsView" });

export type V2ThreadListResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadListResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadListResponse__TurnStatus" });

export type V2ThreadMetadataUpdateParams__ThreadMetadataGitInfoUpdateParams = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadMetadataUpdateParams__ThreadMetadataGitInfoUpdateParams = Schema.Struct({
  branch: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Omit to leave the stored branch unchanged, set to `null` to clear it, or provide a non-empty string to replace it.",
      }),
      Schema.Null,
    ]),
  ),
  originUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Omit to leave the stored origin URL unchanged, set to `null` to clear it, or provide a non-empty string to replace it.",
      }),
      Schema.Null,
    ]),
  ),
  sha: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Omit to leave the stored commit unchanged, set to `null` to clear it, or provide a non-empty string to replace it.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadMetadataUpdateParams__ThreadMetadataGitInfoUpdateParams" });

export type V2ThreadMetadataUpdateResponse__AbsolutePathBuf = string;
export const V2ThreadMetadataUpdateResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadMetadataUpdateResponse__AbsolutePathBuf",
});

export type V2ThreadMetadataUpdateResponse__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadMetadataUpdateResponse__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__GitInfo" });

export type V2ThreadMetadataUpdateResponse__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadMetadataUpdateResponse__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__ThreadHistoryMode" });

export type V2ThreadMetadataUpdateResponse__ReasoningEffort = string;
export const V2ThreadMetadataUpdateResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadMetadataUpdateResponse__ReasoningEffort",
  }),
);

export type V2ThreadMetadataUpdateResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadMetadataUpdateResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadMetadataUpdateResponse__ThreadSectionAppearance",
});

export type V2ThreadMetadataUpdateResponse__AgentPath = string;
export const V2ThreadMetadataUpdateResponse__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadMetadataUpdateResponse__AgentPath",
});

export type V2ThreadMetadataUpdateResponse__ThreadId = string;
export const V2ThreadMetadataUpdateResponse__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadMetadataUpdateResponse__ThreadId",
});

export type V2ThreadMetadataUpdateResponse__ThreadActiveFlag =
  | "waitingOnApproval"
  | "waitingOnUserInput";
export const V2ThreadMetadataUpdateResponse__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__ThreadActiveFlag" });

export type V2ThreadMetadataUpdateResponse__ThreadSource = string;
export const V2ThreadMetadataUpdateResponse__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadMetadataUpdateResponse__ThreadSource",
});

export type V2ThreadMetadataUpdateResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadMetadataUpdateResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__NonSteerableTurnKind" });

export type V2ThreadMetadataUpdateResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadMetadataUpdateResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__MisalignmentSteer" });

export type V2ThreadMetadataUpdateResponse__ByteRange = {
  readonly end: number;
  readonly start: number;
};
export const V2ThreadMetadataUpdateResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__ByteRange" });

export type V2ThreadMetadataUpdateResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadMetadataUpdateResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__ImageDetail" });

export type V2ThreadMetadataUpdateResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadMetadataUpdateResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__HookPromptFragment" });

export type V2ThreadMetadataUpdateResponse__AgentMessageDelivery = "async";
export const V2ThreadMetadataUpdateResponse__AgentMessageDelivery = Schema.Literal(
  "async",
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__AgentMessageDelivery" });

export type V2ThreadMetadataUpdateResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadMetadataUpdateResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__MemoryCitationEntry" });

export type V2ThreadMetadataUpdateResponse__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2ThreadMetadataUpdateResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadMetadataUpdateResponse__MessagePhase",
});

export type V2ThreadMetadataUpdateResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadMetadataUpdateResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__AsyncUserInputQuestion" });

export type V2ThreadMetadataUpdateResponse__LegacyAppPathString = string;
export const V2ThreadMetadataUpdateResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadMetadataUpdateResponse__LegacyAppPathString",
});

export type V2ThreadMetadataUpdateResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadMetadataUpdateResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__CommandExecutionSource" });

export type V2ThreadMetadataUpdateResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadMetadataUpdateResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__CommandExecutionStatus" });

export type V2ThreadMetadataUpdateResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadMetadataUpdateResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__PatchChangeKind" });

export type V2ThreadMetadataUpdateResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadMetadataUpdateResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__PatchApplyStatus" });

export type V2ThreadMetadataUpdateResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadMetadataUpdateResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__McpToolCallAppContext" });

export type V2ThreadMetadataUpdateResponse__McpToolCallError = { readonly message: string };
export const V2ThreadMetadataUpdateResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__McpToolCallError" });

export type V2ThreadMetadataUpdateResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadMetadataUpdateResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__McpAppDisplayMode" });

export type V2ThreadMetadataUpdateResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadMetadataUpdateResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__McpToolCallResult" });

export type V2ThreadMetadataUpdateResponse__McpToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2ThreadMetadataUpdateResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__McpToolCallStatus" });

export type V2ThreadMetadataUpdateResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadMetadataUpdateResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadMetadataUpdateResponse__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2ThreadMetadataUpdateResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__DynamicToolCallStatus" });

export type V2ThreadMetadataUpdateResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadMetadataUpdateResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__CollabAgentStatus" });

export type V2ThreadMetadataUpdateResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadMetadataUpdateResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__CollabAgentToolCallStatus" });

export type V2ThreadMetadataUpdateResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadMetadataUpdateResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__CollabAgentTool" });

export type V2ThreadMetadataUpdateResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadMetadataUpdateResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__SubAgentActivityKind" });

export type V2ThreadMetadataUpdateResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadMetadataUpdateResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__WebSearchAction" });

export type V2ThreadMetadataUpdateResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadMetadataUpdateResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__ImageGenerationFailure" });

export type V2ThreadMetadataUpdateResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadMetadataUpdateResponse__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__TurnItemsView" });

export type V2ThreadMetadataUpdateResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadMetadataUpdateResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadMetadataUpdateResponse__TurnStatus" });

export type V2ThreadReadResponse__AbsolutePathBuf = string;
export const V2ThreadReadResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadReadResponse__AbsolutePathBuf",
});

export type V2ThreadReadResponse__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadReadResponse__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadReadResponse__GitInfo" });

export type V2ThreadReadResponse__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadReadResponse__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadReadResponse__ThreadHistoryMode" });

export type V2ThreadReadResponse__ReasoningEffort = string;
export const V2ThreadReadResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadReadResponse__ReasoningEffort",
  }),
);

export type V2ThreadReadResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadReadResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadReadResponse__ThreadSectionAppearance",
});

export type V2ThreadReadResponse__AgentPath = string;
export const V2ThreadReadResponse__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadReadResponse__AgentPath",
});

export type V2ThreadReadResponse__ThreadId = string;
export const V2ThreadReadResponse__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadReadResponse__ThreadId",
});

export type V2ThreadReadResponse__ThreadActiveFlag = "waitingOnApproval" | "waitingOnUserInput";
export const V2ThreadReadResponse__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadReadResponse__ThreadActiveFlag" });

export type V2ThreadReadResponse__ThreadSource = string;
export const V2ThreadReadResponse__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadReadResponse__ThreadSource",
});

export type V2ThreadReadResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadReadResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadReadResponse__NonSteerableTurnKind" });

export type V2ThreadReadResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadReadResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadReadResponse__MisalignmentSteer" });

export type V2ThreadReadResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadReadResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadReadResponse__ByteRange" });

export type V2ThreadReadResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadReadResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadReadResponse__ImageDetail" });

export type V2ThreadReadResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadReadResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadReadResponse__HookPromptFragment" });

export type V2ThreadReadResponse__AgentMessageDelivery = "async";
export const V2ThreadReadResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadReadResponse__AgentMessageDelivery",
});

export type V2ThreadReadResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadReadResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadReadResponse__MemoryCitationEntry" });

export type V2ThreadReadResponse__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2ThreadReadResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadReadResponse__MessagePhase",
});

export type V2ThreadReadResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadReadResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadReadResponse__AsyncUserInputQuestion" });

export type V2ThreadReadResponse__LegacyAppPathString = string;
export const V2ThreadReadResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadReadResponse__LegacyAppPathString",
});

export type V2ThreadReadResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadReadResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadReadResponse__CommandExecutionSource" });

export type V2ThreadReadResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadReadResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadReadResponse__CommandExecutionStatus" });

export type V2ThreadReadResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadReadResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadReadResponse__PatchChangeKind" });

export type V2ThreadReadResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadReadResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadReadResponse__PatchApplyStatus" });

export type V2ThreadReadResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadReadResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadReadResponse__McpToolCallAppContext" });

export type V2ThreadReadResponse__McpToolCallError = { readonly message: string };
export const V2ThreadReadResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadReadResponse__McpToolCallError" });

export type V2ThreadReadResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadReadResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadReadResponse__McpAppDisplayMode" });

export type V2ThreadReadResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadReadResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadReadResponse__McpToolCallResult" });

export type V2ThreadReadResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadReadResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadReadResponse__McpToolCallStatus" });

export type V2ThreadReadResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadReadResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadReadResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadReadResponse__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadReadResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadReadResponse__DynamicToolCallStatus" });

export type V2ThreadReadResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadReadResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadReadResponse__CollabAgentStatus" });

export type V2ThreadReadResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadReadResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadReadResponse__CollabAgentToolCallStatus" });

export type V2ThreadReadResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadReadResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadReadResponse__CollabAgentTool" });

export type V2ThreadReadResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadReadResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadReadResponse__SubAgentActivityKind" });

export type V2ThreadReadResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadReadResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadReadResponse__WebSearchAction" });

export type V2ThreadReadResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadReadResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadReadResponse__ImageGenerationFailure" });

export type V2ThreadReadResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadReadResponse__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2ThreadReadResponse__TurnItemsView" });

export type V2ThreadReadResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadReadResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadReadResponse__TurnStatus" });

export type V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeTranscriptRole =
  | "user"
  | "assistant";
export const V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeTranscriptRole =
  Schema.Literals(["user", "assistant"]).annotate({
    identifier: "V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeTranscriptRole",
  });

export type V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeBemItemPresentation =
  | { readonly type: "wholeItem" }
  | { readonly type: "inlineMarkdown" }
  | { readonly index: number; readonly type: "inlineVisualization" };
export const V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeBemItemPresentation =
  Schema.Union(
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
    identifier: "V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeBemItemPresentation",
  });

export type V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeSessionOutcome =
  | "ended"
  | "failed";
export const V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeSessionOutcome =
  Schema.Literals(["ended", "failed"]).annotate({
    identifier: "V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeSessionOutcome",
  });

export type V2ThreadRealtimeItemStartedNotification__ThreadRealtimeTranscriptRole =
  | "user"
  | "assistant";
export const V2ThreadRealtimeItemStartedNotification__ThreadRealtimeTranscriptRole =
  Schema.Literals(["user", "assistant"]).annotate({
    identifier: "V2ThreadRealtimeItemStartedNotification__ThreadRealtimeTranscriptRole",
  });

export type V2ThreadRealtimeItemStartedNotification__ThreadRealtimeBemItemPresentation =
  | { readonly type: "wholeItem" }
  | { readonly type: "inlineMarkdown" }
  | { readonly index: number; readonly type: "inlineVisualization" };
export const V2ThreadRealtimeItemStartedNotification__ThreadRealtimeBemItemPresentation =
  Schema.Union(
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
    identifier: "V2ThreadRealtimeItemStartedNotification__ThreadRealtimeBemItemPresentation",
  });

export type V2ThreadRealtimeItemStartedNotification__ThreadRealtimeSessionOutcome =
  | "ended"
  | "failed";
export const V2ThreadRealtimeItemStartedNotification__ThreadRealtimeSessionOutcome =
  Schema.Literals(["ended", "failed"]).annotate({
    identifier: "V2ThreadRealtimeItemStartedNotification__ThreadRealtimeSessionOutcome",
  });

export type V2ThreadRealtimeOutputAudioDeltaNotification__ThreadRealtimeAudioChunk = {
  readonly data: string;
  readonly itemId?: string | null;
  readonly numChannels: number;
  readonly sampleRate: number;
  readonly samplesPerChannel?: number | null;
};
export const V2ThreadRealtimeOutputAudioDeltaNotification__ThreadRealtimeAudioChunk = Schema.Struct(
  {
    data: Schema.String,
    itemId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    numChannels: Schema.Number.annotate({ format: "uint16" })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
    sampleRate: Schema.Number.annotate({ format: "uint32" })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
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
  },
).annotate({
  description: "EXPERIMENTAL - thread realtime audio chunk.",
  identifier: "V2ThreadRealtimeOutputAudioDeltaNotification__ThreadRealtimeAudioChunk",
});

export type V2ThreadRealtimeStartedNotification__RealtimeConversationVersion = "v1" | "v2" | "v3";
export const V2ThreadRealtimeStartedNotification__RealtimeConversationVersion = Schema.Literals([
  "v1",
  "v2",
  "v3",
]).annotate({ identifier: "V2ThreadRealtimeStartedNotification__RealtimeConversationVersion" });

export type V2ThreadResumeParams__AskForApproval =
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
export const V2ThreadResumeParams__AskForApproval = Schema.Union(
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
).annotate({ identifier: "V2ThreadResumeParams__AskForApproval" });

export type V2ThreadResumeParams__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const V2ThreadResumeParams__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2ThreadResumeParams__ApprovalsReviewer",
});

export type V2ThreadResumeParams__Personality = "none" | "friendly" | "pragmatic";
export const V2ThreadResumeParams__Personality = Schema.Literals([
  "none",
  "friendly",
  "pragmatic",
]).annotate({
  description: "Deprecated: `friendly` and `pragmatic` no longer select a style.",
  identifier: "V2ThreadResumeParams__Personality",
});

export type V2ThreadResumeParams__SandboxMode =
  | "read-only"
  | "workspace-write"
  | "danger-full-access";
export const V2ThreadResumeParams__SandboxMode = Schema.Literals([
  "read-only",
  "workspace-write",
  "danger-full-access",
]).annotate({ identifier: "V2ThreadResumeParams__SandboxMode" });

export type V2ThreadResumeParams__ReasoningEffort = string;
export const V2ThreadResumeParams__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadResumeParams__ReasoningEffort",
  }),
);

export type V2ThreadResumeParams__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadResumeParams__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadResumeParams__ImageDetail" });

export type V2ThreadResumeParams__InternalChatMessageMetadataPassthrough = {
  readonly turn_id?: string | null;
};
export const V2ThreadResumeParams__InternalChatMessageMetadataPassthrough = Schema.Struct({
  turn_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description:
    "Internal Responses API passthrough metadata copied into underlying chat messages.\n\nResponses API strongly types this payload. Do not modify it without first getting API approval and making the corresponding Responses API change.",
  identifier: "V2ThreadResumeParams__InternalChatMessageMetadataPassthrough",
});

export type V2ThreadResumeParams__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2ThreadResumeParams__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadResumeParams__MessagePhase",
});

export type V2ThreadResumeParams__AgentMessageInputContent =
  | { readonly text: string; readonly type: "input_text" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadResumeParams__AgentMessageInputContent = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextAgentMessageInputContentType",
      }),
    }).annotate({ title: "InputTextAgentMessageInputContent" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentAgentMessageInputContentType",
      }),
    }).annotate({ title: "EncryptedContentAgentMessageInputContent" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeParams__AgentMessageInputContent" });

export type V2ThreadResumeParams__ReasoningItemContent =
  | { readonly text: string; readonly type: "reasoning_text" }
  | { readonly text: string; readonly type: "text" };
export const V2ThreadResumeParams__ReasoningItemContent = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("reasoning_text").annotate({
        title: "ReasoningTextReasoningItemContentType",
      }),
    }).annotate({ title: "ReasoningTextReasoningItemContent" }),
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("text").annotate({ title: "TextReasoningItemContentType" }),
    }).annotate({ title: "TextReasoningItemContent" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeParams__ReasoningItemContent" });

export type V2ThreadResumeParams__ReasoningItemReasoningSummary = {
  readonly text: string;
  readonly type: "summary_text";
};
export const V2ThreadResumeParams__ReasoningItemReasoningSummary = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("summary_text").annotate({
        title: "SummaryTextReasoningItemReasoningSummaryType",
      }),
    }).annotate({ title: "SummaryTextReasoningItemReasoningSummary" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeParams__ReasoningItemReasoningSummary" });

export type V2ThreadResumeParams__LocalShellAction = {
  readonly command: ReadonlyArray<string>;
  readonly env?: { readonly [x: string]: string } | null;
  readonly timeout_ms?: number | null;
  readonly type: "exec";
  readonly user?: string | null;
  readonly working_directory?: string | null;
};
export const V2ThreadResumeParams__LocalShellAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.Array(Schema.String),
      env: Schema.optionalKey(
        Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
      ),
      timeout_ms: Schema.optionalKey(
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
      type: Schema.Literal("exec").annotate({ title: "ExecLocalShellActionType" }),
      user: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      working_directory: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }).annotate({ title: "ExecLocalShellAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeParams__LocalShellAction" });

export type V2ThreadResumeParams__LocalShellStatus = "completed" | "in_progress" | "incomplete";
export const V2ThreadResumeParams__LocalShellStatus = Schema.Literals([
  "completed",
  "in_progress",
  "incomplete",
]).annotate({ identifier: "V2ThreadResumeParams__LocalShellStatus" });

export type V2ThreadResumeParams__ResponsesApiWebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "open_page"; readonly url?: string | null }
  | {
      readonly pattern?: string | null;
      readonly type: "find_in_page";
      readonly url?: string | null;
    }
  | { readonly type: "other" };
export const V2ThreadResumeParams__ResponsesApiWebSearchAction = Schema.Union(
  [
    Schema.Struct({
      queries: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchResponsesApiWebSearchActionType" }),
    }).annotate({ title: "SearchResponsesApiWebSearchAction" }),
    Schema.Struct({
      type: Schema.Literal("open_page").annotate({
        title: "OpenPageResponsesApiWebSearchActionType",
      }),
      url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }).annotate({ title: "OpenPageResponsesApiWebSearchAction" }),
    Schema.Struct({
      pattern: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("find_in_page").annotate({
        title: "FindInPageResponsesApiWebSearchActionType",
      }),
      url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    }).annotate({ title: "FindInPageResponsesApiWebSearchAction" }),
    Schema.Struct({
      type: Schema.Literal("other").annotate({ title: "OtherResponsesApiWebSearchActionType" }),
    }).annotate({ title: "OtherResponsesApiWebSearchAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeParams__ResponsesApiWebSearchAction" });

export type V2ThreadResumeParams__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadResumeParams__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2ThreadResumeParams__TurnItemsView" });

export type V2ThreadResumeParams__SortDirection = "asc" | "desc";
export const V2ThreadResumeParams__SortDirection = Schema.Literals(["asc", "desc"]).annotate({
  identifier: "V2ThreadResumeParams__SortDirection",
});

export type V2ThreadResumeResponse__AskForApproval =
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
export const V2ThreadResumeResponse__AskForApproval = Schema.Union(
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
).annotate({ identifier: "V2ThreadResumeResponse__AskForApproval" });

export type V2ThreadResumeResponse__ApprovalsReviewer =
  | "user"
  | "auto_review"
  | "guardian_subagent";
export const V2ThreadResumeResponse__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2ThreadResumeResponse__ApprovalsReviewer",
});

export type V2ThreadResumeResponse__ModeKind = "plan" | "default";
export const V2ThreadResumeResponse__ModeKind = Schema.Literals(["plan", "default"]).annotate({
  description: "Initial collaboration mode to use when the TUI starts.",
  identifier: "V2ThreadResumeResponse__ModeKind",
});

export type V2ThreadResumeResponse__ReasoningEffort = string;
export const V2ThreadResumeResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadResumeResponse__ReasoningEffort",
  }),
);

export type V2ThreadResumeResponse__AbsolutePathBuf = string;
export const V2ThreadResumeResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadResumeResponse__AbsolutePathBuf",
});

export type V2ThreadResumeResponse__LegacyAppPathString = string;
export const V2ThreadResumeResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadResumeResponse__LegacyAppPathString",
});

export type V2ThreadResumeResponse__NetworkAccess = "restricted" | "enabled";
export const V2ThreadResumeResponse__NetworkAccess = Schema.Literals([
  "restricted",
  "enabled",
]).annotate({ identifier: "V2ThreadResumeResponse__NetworkAccess" });

export type V2ThreadResumeResponse__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadResumeResponse__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadResumeResponse__GitInfo" });

export type V2ThreadResumeResponse__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadResumeResponse__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadResumeResponse__ThreadHistoryMode" });

export type V2ThreadResumeResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadResumeResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadResumeResponse__ThreadSectionAppearance",
});

export type V2ThreadResumeResponse__AgentPath = string;
export const V2ThreadResumeResponse__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadResumeResponse__AgentPath",
});

export type V2ThreadResumeResponse__ThreadId = string;
export const V2ThreadResumeResponse__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadResumeResponse__ThreadId",
});

export type V2ThreadResumeResponse__ThreadActiveFlag = "waitingOnApproval" | "waitingOnUserInput";
export const V2ThreadResumeResponse__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadResumeResponse__ThreadActiveFlag" });

export type V2ThreadResumeResponse__ThreadSource = string;
export const V2ThreadResumeResponse__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadResumeResponse__ThreadSource",
});

export type V2ThreadResumeResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadResumeResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadResumeResponse__NonSteerableTurnKind" });

export type V2ThreadResumeResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadResumeResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadResumeResponse__MisalignmentSteer" });

export type V2ThreadResumeResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadResumeResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadResumeResponse__ByteRange" });

export type V2ThreadResumeResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadResumeResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadResumeResponse__ImageDetail" });

export type V2ThreadResumeResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadResumeResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadResumeResponse__HookPromptFragment" });

export type V2ThreadResumeResponse__AgentMessageDelivery = "async";
export const V2ThreadResumeResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadResumeResponse__AgentMessageDelivery",
});

export type V2ThreadResumeResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadResumeResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadResumeResponse__MemoryCitationEntry" });

export type V2ThreadResumeResponse__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2ThreadResumeResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadResumeResponse__MessagePhase",
});

export type V2ThreadResumeResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadResumeResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadResumeResponse__AsyncUserInputQuestion" });

export type V2ThreadResumeResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadResumeResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadResumeResponse__CommandExecutionSource" });

export type V2ThreadResumeResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadResumeResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadResumeResponse__CommandExecutionStatus" });

export type V2ThreadResumeResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadResumeResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadResumeResponse__PatchChangeKind" });

export type V2ThreadResumeResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadResumeResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadResumeResponse__PatchApplyStatus" });

export type V2ThreadResumeResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadResumeResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadResumeResponse__McpToolCallAppContext" });

export type V2ThreadResumeResponse__McpToolCallError = { readonly message: string };
export const V2ThreadResumeResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadResumeResponse__McpToolCallError" });

export type V2ThreadResumeResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadResumeResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadResumeResponse__McpAppDisplayMode" });

export type V2ThreadResumeResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadResumeResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadResumeResponse__McpToolCallResult" });

export type V2ThreadResumeResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadResumeResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadResumeResponse__McpToolCallStatus" });

export type V2ThreadResumeResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadResumeResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadResumeResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadResumeResponse__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadResumeResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadResumeResponse__DynamicToolCallStatus" });

export type V2ThreadResumeResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadResumeResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadResumeResponse__CollabAgentStatus" });

export type V2ThreadResumeResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadResumeResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadResumeResponse__CollabAgentToolCallStatus" });

export type V2ThreadResumeResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadResumeResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadResumeResponse__CollabAgentTool" });

export type V2ThreadResumeResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadResumeResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadResumeResponse__SubAgentActivityKind" });

export type V2ThreadResumeResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadResumeResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadResumeResponse__WebSearchAction" });

export type V2ThreadResumeResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadResumeResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadResumeResponse__ImageGenerationFailure" });

export type V2ThreadResumeResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadResumeResponse__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2ThreadResumeResponse__TurnItemsView" });

export type V2ThreadResumeResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadResumeResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadResumeResponse__TurnStatus" });

export type V2ThreadRevertResponse__AbsolutePathBuf = string;
export const V2ThreadRevertResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadRevertResponse__AbsolutePathBuf",
});

export type V2ThreadRevertResponse__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadRevertResponse__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadRevertResponse__GitInfo" });

export type V2ThreadRevertResponse__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadRevertResponse__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadRevertResponse__ThreadHistoryMode" });

export type V2ThreadRevertResponse__ReasoningEffort = string;
export const V2ThreadRevertResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadRevertResponse__ReasoningEffort",
  }),
);

export type V2ThreadRevertResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadRevertResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadRevertResponse__ThreadSectionAppearance",
});

export type V2ThreadRevertResponse__AgentPath = string;
export const V2ThreadRevertResponse__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadRevertResponse__AgentPath",
});

export type V2ThreadRevertResponse__ThreadId = string;
export const V2ThreadRevertResponse__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadRevertResponse__ThreadId",
});

export type V2ThreadRevertResponse__ThreadActiveFlag = "waitingOnApproval" | "waitingOnUserInput";
export const V2ThreadRevertResponse__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadRevertResponse__ThreadActiveFlag" });

export type V2ThreadRevertResponse__ThreadSource = string;
export const V2ThreadRevertResponse__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadRevertResponse__ThreadSource",
});

export type V2ThreadRevertResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadRevertResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadRevertResponse__NonSteerableTurnKind" });

export type V2ThreadRevertResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadRevertResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadRevertResponse__MisalignmentSteer" });

export type V2ThreadRevertResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadRevertResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadRevertResponse__ByteRange" });

export type V2ThreadRevertResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadRevertResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadRevertResponse__ImageDetail" });

export type V2ThreadRevertResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadRevertResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadRevertResponse__HookPromptFragment" });

export type V2ThreadRevertResponse__AgentMessageDelivery = "async";
export const V2ThreadRevertResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadRevertResponse__AgentMessageDelivery",
});

export type V2ThreadRevertResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadRevertResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadRevertResponse__MemoryCitationEntry" });

export type V2ThreadRevertResponse__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2ThreadRevertResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadRevertResponse__MessagePhase",
});

export type V2ThreadRevertResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadRevertResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadRevertResponse__AsyncUserInputQuestion" });

export type V2ThreadRevertResponse__LegacyAppPathString = string;
export const V2ThreadRevertResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadRevertResponse__LegacyAppPathString",
});

export type V2ThreadRevertResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadRevertResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadRevertResponse__CommandExecutionSource" });

export type V2ThreadRevertResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadRevertResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadRevertResponse__CommandExecutionStatus" });

export type V2ThreadRevertResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadRevertResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadRevertResponse__PatchChangeKind" });

export type V2ThreadRevertResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadRevertResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadRevertResponse__PatchApplyStatus" });

export type V2ThreadRevertResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadRevertResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadRevertResponse__McpToolCallAppContext" });

export type V2ThreadRevertResponse__McpToolCallError = { readonly message: string };
export const V2ThreadRevertResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadRevertResponse__McpToolCallError" });

export type V2ThreadRevertResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadRevertResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadRevertResponse__McpAppDisplayMode" });

export type V2ThreadRevertResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadRevertResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadRevertResponse__McpToolCallResult" });

export type V2ThreadRevertResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadRevertResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadRevertResponse__McpToolCallStatus" });

export type V2ThreadRevertResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadRevertResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadRevertResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadRevertResponse__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadRevertResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadRevertResponse__DynamicToolCallStatus" });

export type V2ThreadRevertResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadRevertResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadRevertResponse__CollabAgentStatus" });

export type V2ThreadRevertResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadRevertResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadRevertResponse__CollabAgentToolCallStatus" });

export type V2ThreadRevertResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadRevertResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadRevertResponse__CollabAgentTool" });

export type V2ThreadRevertResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadRevertResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadRevertResponse__SubAgentActivityKind" });
