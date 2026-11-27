import * as Schema from "effect/Schema";
import {
  ApplyPatchApprovalResponse__NetworkPolicyRuleAction,
  ClientRequest__AbsolutePathBuf,
  ClientRequest__AddCreditsNudgeCreditType,
  ClientRequest__ApprovalsReviewer,
  ClientRequest__AskForApproval,
  ClientRequest__ByteRange,
  ClientRequest__ClientInfo,
  ClientRequest__CommandExecTerminalSize,
  ClientRequest__ImageDetail,
  ClientRequest__InitializeCapabilities,
  ClientRequest__LoginAppBrand,
  ClientRequest__McpResourceReadTarget,
  ClientRequest__McpServerOauthClientRegistration,
  ClientRequest__McpServerStatusDetail,
  ClientRequest__NetworkAccess,
  ClientRequest__Personality,
  ClientRequest__PluginListMarketplaceKind,
  ClientRequest__PluginSharePrincipalType,
  ClientRequest__PluginShareTargetRole,
  ClientRequest__ReasoningEffort,
  ClientRequest__ReviewDelivery,
  ClientRequest__ReviewTarget,
  ClientRequest__SandboxMode,
  ClientRequest__SortDirection,
  ClientRequest__ThreadGoalStatus,
  ClientRequest__ThreadItemsListAnchor,
  ClientRequest__ThreadListCwdFilter,
  ClientRequest__ThreadMetadataGitInfoUpdateParams,
  ClientRequest__ThreadSectionAppearance,
  ClientRequest__ThreadSortKey,
  ClientRequest__ThreadSource,
  ClientRequest__ThreadSourceKind,
  ClientRequest__ThreadStartSource,
  ClientRequest__TurnItemsView,
  ClientRequest__WindowsSandboxSetupMode,
} from "./schema.gen.part0.ts";

export type V2TurnCompletedNotification__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2TurnCompletedNotification__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2TurnCompletedNotification__PatchApplyStatus" });

export type V2TurnCompletedNotification__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2TurnCompletedNotification__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2TurnCompletedNotification__McpToolCallAppContext" });

export type V2TurnCompletedNotification__McpToolCallError = { readonly message: string };
export const V2TurnCompletedNotification__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2TurnCompletedNotification__McpToolCallError" });

export type V2TurnCompletedNotification__McpAppDisplayMode = "inline" | "fullscreen";
export const V2TurnCompletedNotification__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2TurnCompletedNotification__McpAppDisplayMode" });

export type V2TurnCompletedNotification__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2TurnCompletedNotification__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2TurnCompletedNotification__McpToolCallResult" });

export type V2TurnCompletedNotification__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2TurnCompletedNotification__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2TurnCompletedNotification__McpToolCallStatus" });

export type V2TurnCompletedNotification__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2TurnCompletedNotification__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2TurnCompletedNotification__DynamicToolCallOutputContentItem" });

export type V2TurnCompletedNotification__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2TurnCompletedNotification__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2TurnCompletedNotification__DynamicToolCallStatus" });

export type V2TurnCompletedNotification__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2TurnCompletedNotification__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2TurnCompletedNotification__CollabAgentStatus" });

export type V2TurnCompletedNotification__ReasoningEffort = string;
export const V2TurnCompletedNotification__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2TurnCompletedNotification__ReasoningEffort",
  }),
);

export type V2TurnCompletedNotification__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2TurnCompletedNotification__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2TurnCompletedNotification__CollabAgentToolCallStatus" });

export type V2TurnCompletedNotification__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2TurnCompletedNotification__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2TurnCompletedNotification__CollabAgentTool" });

export type V2TurnCompletedNotification__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2TurnCompletedNotification__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2TurnCompletedNotification__SubAgentActivityKind" });

export type V2TurnCompletedNotification__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2TurnCompletedNotification__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2TurnCompletedNotification__WebSearchAction" });

export type V2TurnCompletedNotification__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2TurnCompletedNotification__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2TurnCompletedNotification__ImageGenerationFailure" });

export type V2TurnCompletedNotification__AbsolutePathBuf = string;
export const V2TurnCompletedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2TurnCompletedNotification__AbsolutePathBuf",
});

export type V2TurnCompletedNotification__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2TurnCompletedNotification__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2TurnCompletedNotification__TurnItemsView" });

export type V2TurnCompletedNotification__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2TurnCompletedNotification__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2TurnCompletedNotification__TurnStatus" });

export type V2TurnPlanUpdatedNotification__TurnPlanStepStatus =
  | "pending"
  | "inProgress"
  | "completed";
export const V2TurnPlanUpdatedNotification__TurnPlanStepStatus = Schema.Literals([
  "pending",
  "inProgress",
  "completed",
]).annotate({ identifier: "V2TurnPlanUpdatedNotification__TurnPlanStepStatus" });

export type V2TurnStartedNotification__NonSteerableTurnKind = "review" | "compact";
export const V2TurnStartedNotification__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2TurnStartedNotification__NonSteerableTurnKind" });

export type V2TurnStartedNotification__MisalignmentSteer = { readonly message: string };
export const V2TurnStartedNotification__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2TurnStartedNotification__MisalignmentSteer" });

export type V2TurnStartedNotification__ByteRange = { readonly end: number; readonly start: number };
export const V2TurnStartedNotification__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2TurnStartedNotification__ByteRange" });

export type V2TurnStartedNotification__ImageDetail = "auto" | "low" | "high" | "original";
export const V2TurnStartedNotification__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2TurnStartedNotification__ImageDetail" });

export type V2TurnStartedNotification__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2TurnStartedNotification__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2TurnStartedNotification__HookPromptFragment" });

export type V2TurnStartedNotification__AgentMessageDelivery = "async";
export const V2TurnStartedNotification__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2TurnStartedNotification__AgentMessageDelivery",
});

export type V2TurnStartedNotification__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2TurnStartedNotification__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2TurnStartedNotification__MemoryCitationEntry" });

export type V2TurnStartedNotification__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2TurnStartedNotification__MessagePhase = Schema.Union(
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
  identifier: "V2TurnStartedNotification__MessagePhase",
});

export type V2TurnStartedNotification__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2TurnStartedNotification__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2TurnStartedNotification__AsyncUserInputQuestion" });

export type V2TurnStartedNotification__LegacyAppPathString = string;
export const V2TurnStartedNotification__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2TurnStartedNotification__LegacyAppPathString",
});

export type V2TurnStartedNotification__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2TurnStartedNotification__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2TurnStartedNotification__CommandExecutionSource" });

export type V2TurnStartedNotification__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2TurnStartedNotification__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2TurnStartedNotification__CommandExecutionStatus" });

export type V2TurnStartedNotification__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2TurnStartedNotification__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2TurnStartedNotification__PatchChangeKind" });

export type V2TurnStartedNotification__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2TurnStartedNotification__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2TurnStartedNotification__PatchApplyStatus" });

export type V2TurnStartedNotification__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2TurnStartedNotification__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2TurnStartedNotification__McpToolCallAppContext" });

export type V2TurnStartedNotification__McpToolCallError = { readonly message: string };
export const V2TurnStartedNotification__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2TurnStartedNotification__McpToolCallError" });

export type V2TurnStartedNotification__McpAppDisplayMode = "inline" | "fullscreen";
export const V2TurnStartedNotification__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2TurnStartedNotification__McpAppDisplayMode" });

export type V2TurnStartedNotification__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2TurnStartedNotification__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2TurnStartedNotification__McpToolCallResult" });

export type V2TurnStartedNotification__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2TurnStartedNotification__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2TurnStartedNotification__McpToolCallStatus" });

export type V2TurnStartedNotification__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2TurnStartedNotification__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2TurnStartedNotification__DynamicToolCallOutputContentItem" });

export type V2TurnStartedNotification__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2TurnStartedNotification__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2TurnStartedNotification__DynamicToolCallStatus" });

export type V2TurnStartedNotification__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2TurnStartedNotification__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2TurnStartedNotification__CollabAgentStatus" });

export type V2TurnStartedNotification__ReasoningEffort = string;
export const V2TurnStartedNotification__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2TurnStartedNotification__ReasoningEffort",
  }),
);

export type V2TurnStartedNotification__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2TurnStartedNotification__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2TurnStartedNotification__CollabAgentToolCallStatus" });

export type V2TurnStartedNotification__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2TurnStartedNotification__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2TurnStartedNotification__CollabAgentTool" });

export type V2TurnStartedNotification__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2TurnStartedNotification__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2TurnStartedNotification__SubAgentActivityKind" });

export type V2TurnStartedNotification__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2TurnStartedNotification__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2TurnStartedNotification__WebSearchAction" });

export type V2TurnStartedNotification__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2TurnStartedNotification__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2TurnStartedNotification__ImageGenerationFailure" });

export type V2TurnStartedNotification__AbsolutePathBuf = string;
export const V2TurnStartedNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2TurnStartedNotification__AbsolutePathBuf",
});

export type V2TurnStartedNotification__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2TurnStartedNotification__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2TurnStartedNotification__TurnItemsView" });

export type V2TurnStartedNotification__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2TurnStartedNotification__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2TurnStartedNotification__TurnStatus" });

export type V2TurnStartParams__AskForApproval =
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
export const V2TurnStartParams__AskForApproval = Schema.Union(
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
).annotate({ identifier: "V2TurnStartParams__AskForApproval" });

export type V2TurnStartParams__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const V2TurnStartParams__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2TurnStartParams__ApprovalsReviewer",
});

export type V2TurnStartParams__ReasoningEffort = string;
export const V2TurnStartParams__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2TurnStartParams__ReasoningEffort",
  }),
);

export type V2TurnStartParams__ByteRange = { readonly end: number; readonly start: number };
export const V2TurnStartParams__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2TurnStartParams__ByteRange" });

export type V2TurnStartParams__ImageDetail = "auto" | "low" | "high" | "original";
export const V2TurnStartParams__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2TurnStartParams__ImageDetail" });

export type V2TurnStartParams__Personality = "none" | "friendly" | "pragmatic";
export const V2TurnStartParams__Personality = Schema.Literals([
  "none",
  "friendly",
  "pragmatic",
]).annotate({
  description: "Deprecated: `friendly` and `pragmatic` no longer select a style.",
  identifier: "V2TurnStartParams__Personality",
});

export type V2TurnStartParams__NetworkAccess = "restricted" | "enabled";
export const V2TurnStartParams__NetworkAccess = Schema.Literals(["restricted", "enabled"]).annotate(
  { identifier: "V2TurnStartParams__NetworkAccess" },
);

export type V2TurnStartParams__AbsolutePathBuf = string;
export const V2TurnStartParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2TurnStartParams__AbsolutePathBuf",
});

export type V2TurnStartParams__ReasoningSummary = "auto" | "concise" | "detailed" | "none";
export const V2TurnStartParams__ReasoningSummary = Schema.Union(
  [
    Schema.Literals(["auto", "concise", "detailed"]),
    Schema.Literal("none").annotate({ description: "Option to disable reasoning summaries." }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. See https://platform.openai.com/docs/guides/reasoning?api-mode=responses#reasoning-summaries",
  identifier: "V2TurnStartParams__ReasoningSummary",
});

export type V2TurnStartParams__AdditionalContextKind = "untrusted" | "application";
export const V2TurnStartParams__AdditionalContextKind = Schema.Literals([
  "untrusted",
  "application",
]).annotate({ identifier: "V2TurnStartParams__AdditionalContextKind" });

export type V2TurnStartParams__ModeKind = "plan" | "default";
export const V2TurnStartParams__ModeKind = Schema.Literals(["plan", "default"]).annotate({
  description: "Initial collaboration mode to use when the TUI starts.",
  identifier: "V2TurnStartParams__ModeKind",
});

export type V2TurnStartParams__LegacyAppPathString = string;
export const V2TurnStartParams__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2TurnStartParams__LegacyAppPathString",
});

export type V2TurnStartResponse__NonSteerableTurnKind = "review" | "compact";
export const V2TurnStartResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2TurnStartResponse__NonSteerableTurnKind" });

export type V2TurnStartResponse__MisalignmentSteer = { readonly message: string };
export const V2TurnStartResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2TurnStartResponse__MisalignmentSteer" });

export type V2TurnStartResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2TurnStartResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2TurnStartResponse__ByteRange" });

export type V2TurnStartResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2TurnStartResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2TurnStartResponse__ImageDetail" });

export type V2TurnStartResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2TurnStartResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2TurnStartResponse__HookPromptFragment" });

export type V2TurnStartResponse__AgentMessageDelivery = "async";
export const V2TurnStartResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2TurnStartResponse__AgentMessageDelivery",
});

export type V2TurnStartResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2TurnStartResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2TurnStartResponse__MemoryCitationEntry" });

export type V2TurnStartResponse__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2TurnStartResponse__MessagePhase = Schema.Union(
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
  identifier: "V2TurnStartResponse__MessagePhase",
});

export type V2TurnStartResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2TurnStartResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2TurnStartResponse__AsyncUserInputQuestion" });

export type V2TurnStartResponse__LegacyAppPathString = string;
export const V2TurnStartResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2TurnStartResponse__LegacyAppPathString",
});

export type V2TurnStartResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2TurnStartResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2TurnStartResponse__CommandExecutionSource" });

export type V2TurnStartResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2TurnStartResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2TurnStartResponse__CommandExecutionStatus" });

export type V2TurnStartResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2TurnStartResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2TurnStartResponse__PatchChangeKind" });

export type V2TurnStartResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2TurnStartResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2TurnStartResponse__PatchApplyStatus" });

export type V2TurnStartResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2TurnStartResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2TurnStartResponse__McpToolCallAppContext" });

export type V2TurnStartResponse__McpToolCallError = { readonly message: string };
export const V2TurnStartResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2TurnStartResponse__McpToolCallError" });

export type V2TurnStartResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2TurnStartResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2TurnStartResponse__McpAppDisplayMode" });

export type V2TurnStartResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2TurnStartResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2TurnStartResponse__McpToolCallResult" });

export type V2TurnStartResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2TurnStartResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2TurnStartResponse__McpToolCallStatus" });

export type V2TurnStartResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2TurnStartResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2TurnStartResponse__DynamicToolCallOutputContentItem" });

export type V2TurnStartResponse__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const V2TurnStartResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2TurnStartResponse__DynamicToolCallStatus" });

export type V2TurnStartResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2TurnStartResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2TurnStartResponse__CollabAgentStatus" });

export type V2TurnStartResponse__ReasoningEffort = string;
export const V2TurnStartResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2TurnStartResponse__ReasoningEffort",
  }),
);

export type V2TurnStartResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2TurnStartResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2TurnStartResponse__CollabAgentToolCallStatus" });

export type V2TurnStartResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2TurnStartResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2TurnStartResponse__CollabAgentTool" });

export type V2TurnStartResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2TurnStartResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2TurnStartResponse__SubAgentActivityKind" });

export type V2TurnStartResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2TurnStartResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2TurnStartResponse__WebSearchAction" });

export type V2TurnStartResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2TurnStartResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2TurnStartResponse__ImageGenerationFailure" });

export type V2TurnStartResponse__AbsolutePathBuf = string;
export const V2TurnStartResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2TurnStartResponse__AbsolutePathBuf",
});

export type V2TurnStartResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2TurnStartResponse__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2TurnStartResponse__TurnItemsView" });

export type V2TurnStartResponse__TurnStatus = "completed" | "interrupted" | "failed" | "inProgress";
export const V2TurnStartResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2TurnStartResponse__TurnStatus" });

export type V2TurnSteerParams__ByteRange = { readonly end: number; readonly start: number };
export const V2TurnSteerParams__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2TurnSteerParams__ByteRange" });

export type V2TurnSteerParams__ImageDetail = "auto" | "low" | "high" | "original";
export const V2TurnSteerParams__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2TurnSteerParams__ImageDetail" });

export type V2TurnSteerParams__AdditionalContextKind = "untrusted" | "application";
export const V2TurnSteerParams__AdditionalContextKind = Schema.Literals([
  "untrusted",
  "application",
]).annotate({ identifier: "V2TurnSteerParams__AdditionalContextKind" });

export type V2WindowsSandboxReadinessResponse__WindowsSandboxReadiness =
  | "ready"
  | "notConfigured"
  | "updateRequired";
export const V2WindowsSandboxReadinessResponse__WindowsSandboxReadiness = Schema.Literals([
  "ready",
  "notConfigured",
  "updateRequired",
]).annotate({ identifier: "V2WindowsSandboxReadinessResponse__WindowsSandboxReadiness" });

export type V2WindowsSandboxSetupCompletedNotification__WindowsSandboxSetupMode =
  | "elevated"
  | "unelevated";
export const V2WindowsSandboxSetupCompletedNotification__WindowsSandboxSetupMode = Schema.Literals([
  "elevated",
  "unelevated",
]).annotate({ identifier: "V2WindowsSandboxSetupCompletedNotification__WindowsSandboxSetupMode" });

export type V2WindowsSandboxSetupStartParams__AbsolutePathBuf = string;
export const V2WindowsSandboxSetupStartParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2WindowsSandboxSetupStartParams__AbsolutePathBuf",
});

export type V2WindowsSandboxSetupStartParams__WindowsSandboxSetupMode = "elevated" | "unelevated";
export const V2WindowsSandboxSetupStartParams__WindowsSandboxSetupMode = Schema.Literals([
  "elevated",
  "unelevated",
]).annotate({ identifier: "V2WindowsSandboxSetupStartParams__WindowsSandboxSetupMode" });

export type ApplyPatchApprovalResponse__NetworkPolicyAmendment = {
  readonly action: ApplyPatchApprovalResponse__NetworkPolicyRuleAction;
  readonly host: string;
};
export const ApplyPatchApprovalResponse__NetworkPolicyAmendment = Schema.Struct({
  action: ApplyPatchApprovalResponse__NetworkPolicyRuleAction,
  host: Schema.String,
}).annotate({ identifier: "ApplyPatchApprovalResponse__NetworkPolicyAmendment" });

export type ClientRequest__InitializeParams = {
  readonly capabilities?: ClientRequest__InitializeCapabilities | null;
  readonly clientInfo: ClientRequest__ClientInfo;
};
export const ClientRequest__InitializeParams = Schema.Struct({
  capabilities: Schema.optionalKey(
    Schema.Union([ClientRequest__InitializeCapabilities, Schema.Null]),
  ),
  clientInfo: ClientRequest__ClientInfo,
}).annotate({ identifier: "ClientRequest__InitializeParams" });

export type ClientRequest__ThreadResumeParams = {
  readonly approvalPolicy?: ClientRequest__AskForApproval | null;
  readonly approvalsReviewer?: ClientRequest__ApprovalsReviewer | null;
  readonly baseInstructions?: string | null;
  readonly config?: { readonly [x: string]: Schema.Json } | null;
  readonly cwd?: string | null;
  readonly developerInstructions?: string | null;
  readonly excludeTurns?: boolean;
  readonly model?: string | null;
  readonly modelProvider?: string | null;
  readonly personality?: ClientRequest__Personality | null;
  readonly sandbox?: ClientRequest__SandboxMode | null;
  readonly serviceTier?: string | null;
  readonly threadId: string;
};
export const ClientRequest__ThreadResumeParams = Schema.Struct({
  approvalPolicy: Schema.optionalKey(Schema.Union([ClientRequest__AskForApproval, Schema.Null])),
  approvalsReviewer: Schema.optionalKey(
    Schema.Union([ClientRequest__ApprovalsReviewer, Schema.Null]).annotate({
      description:
        "Override where approval requests are routed for review on this thread and subsequent turns.",
    }),
  ),
  baseInstructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  config: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })),
      Schema.Null,
    ]),
  ),
  cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  developerInstructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  excludeTurns: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true, return only thread metadata and live-resume state without populating `thread.turns`. This is useful when the client plans to call `thread/turns/list` immediately after resuming. Full-history hydration is deprecated for paginated threads; use this with `thread/turns/list` and `thread/items/list` instead.",
    }),
  ),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Configuration overrides for the resumed thread, if any.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  personality: Schema.optionalKey(
    Schema.Union([ClientRequest__Personality, Schema.Null]).annotate({
      description:
        "@deprecated `friendly` and `pragmatic` no longer select a style. Changing this does not rewrite the thread's existing instructions.",
    }),
  ),
  sandbox: Schema.optionalKey(Schema.Union([ClientRequest__SandboxMode, Schema.Null])),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
}).annotate({
  description:
    "There are three ways to resume a thread: 1. By thread_id: load the thread from disk by thread_id and resume it. 2. By history: instantiate the thread from memory and resume it. 3. By path: load the thread from disk by path and resume it.\n\nFor non-running threads, the precedence is: history > non-empty path > thread_id. If using history or a non-empty path for a non-running thread, the thread_id param will be ignored.\n\nIf thread_id identifies a running thread, app-server rejoins that thread and treats a non-empty path as a consistency check against the active rollout path. Empty string path values are treated as absent.\n\nPrefer using thread_id whenever possible.",
  identifier: "ClientRequest__ThreadResumeParams",
});

export type ClientRequest__ThreadStartParams = {
  readonly approvalPolicy?: ClientRequest__AskForApproval | null;
  readonly approvalsReviewer?: ClientRequest__ApprovalsReviewer | null;
  readonly baseInstructions?: string | null;
  readonly config?: { readonly [x: string]: Schema.Json } | null;
  readonly cwd?: string | null;
  readonly developerInstructions?: string | null;
  readonly ephemeral?: boolean | null;
  readonly model?: string | null;
  readonly modelProvider?: string | null;
  readonly personality?: ClientRequest__Personality | null;
  readonly sandbox?: ClientRequest__SandboxMode | null;
  readonly serviceName?: string | null;
  readonly serviceTier?: string | null;
  readonly sessionStartSource?: ClientRequest__ThreadStartSource | null;
  readonly threadSource?: ClientRequest__ThreadSource | null;
};
export const ClientRequest__ThreadStartParams = Schema.Struct({
  approvalPolicy: Schema.optionalKey(Schema.Union([ClientRequest__AskForApproval, Schema.Null])),
  approvalsReviewer: Schema.optionalKey(
    Schema.Union([ClientRequest__ApprovalsReviewer, Schema.Null]).annotate({
      description:
        "Override where approval requests are routed for review on this thread and subsequent turns.",
    }),
  ),
  baseInstructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  config: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })),
      Schema.Null,
    ]),
  ),
  cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  developerInstructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  ephemeral: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  model: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  modelProvider: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  personality: Schema.optionalKey(
    Schema.Union([ClientRequest__Personality, Schema.Null]).annotate({
      description: "@deprecated `friendly` and `pragmatic` no longer select a style.",
    }),
  ),
  sandbox: Schema.optionalKey(Schema.Union([ClientRequest__SandboxMode, Schema.Null])),
  serviceName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sessionStartSource: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadStartSource, Schema.Null]),
  ),
  threadSource: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadSource, Schema.Null]).annotate({
      description: "Optional client-supplied analytics source classification for this thread.",
    }),
  ),
}).annotate({ identifier: "ClientRequest__ThreadStartParams" });

export type ClientRequest__ThreadForkParams = {
  readonly approvalPolicy?: ClientRequest__AskForApproval | null;
  readonly approvalsReviewer?: ClientRequest__ApprovalsReviewer | null;
  readonly baseInstructions?: string | null;
  readonly config?: { readonly [x: string]: Schema.Json } | null;
  readonly cwd?: string | null;
  readonly developerInstructions?: string | null;
  readonly ephemeral?: boolean;
  readonly excludeTurns?: boolean;
  readonly lastTurnId?: string | null;
  readonly model?: string | null;
  readonly modelProvider?: string | null;
  readonly sandbox?: ClientRequest__SandboxMode | null;
  readonly serviceTier?: string | null;
  readonly threadId: string;
  readonly threadSource?: ClientRequest__ThreadSource | null;
};
export const ClientRequest__ThreadForkParams = Schema.Struct({
  approvalPolicy: Schema.optionalKey(Schema.Union([ClientRequest__AskForApproval, Schema.Null])),
  approvalsReviewer: Schema.optionalKey(
    Schema.Union([ClientRequest__ApprovalsReviewer, Schema.Null]).annotate({
      description:
        "Override where approval requests are routed for review on this thread and subsequent turns.",
    }),
  ),
  baseInstructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  config: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })),
      Schema.Null,
    ]),
  ),
  cwd: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  developerInstructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  ephemeral: Schema.optionalKey(Schema.Boolean),
  excludeTurns: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true, return only thread metadata and live fork state without populating `thread.turns`. This is useful when the client plans to call `thread/turns/list` immediately after forking. Full-history hydration is deprecated for paginated threads; use this with `thread/turns/list` and `thread/items/list` instead.",
    }),
  ),
  lastTurnId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional last turn id to fork through, inclusive.\n\nWhen specified, turns after `last_turn_id` are omitted from the fork. The referenced turn cannot be in progress.",
      }),
      Schema.Null,
    ]),
  ),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Configuration overrides for the forked thread, if any.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sandbox: Schema.optionalKey(Schema.Union([ClientRequest__SandboxMode, Schema.Null])),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
  threadSource: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadSource, Schema.Null]).annotate({
      description:
        "Optional client-supplied analytics source classification for this forked thread.",
    }),
  ),
}).annotate({
  description:
    "There are two ways to fork a thread: 1. By thread_id: load the thread from disk by thread_id and fork it into a new thread. 2. By path: load the thread from disk by path and fork it into a new thread.\n\nIf using a non-empty path, the thread_id param will be ignored. Empty string path values are treated as absent.\n\nPrefer using thread_id whenever possible.",
  identifier: "ClientRequest__ThreadForkParams",
});

export type ClientRequest__ThreadGoalSetParams = {
  readonly objective?: string | null;
  readonly status?: ClientRequest__ThreadGoalStatus | null;
  readonly threadId: string;
  readonly tokenBudget?: number | null;
};
export const ClientRequest__ThreadGoalSetParams = Schema.Struct({
  objective: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optionalKey(Schema.Union([ClientRequest__ThreadGoalStatus, Schema.Null])),
  threadId: Schema.String,
  tokenBudget: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ClientRequest__ThreadGoalSetParams" });

export type ClientRequest__ThreadMetadataUpdateParams = {
  readonly gitInfo?: ClientRequest__ThreadMetadataGitInfoUpdateParams | null;
  readonly threadId: string;
};
export const ClientRequest__ThreadMetadataUpdateParams = Schema.Struct({
  gitInfo: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadMetadataGitInfoUpdateParams, Schema.Null]).annotate({
      description:
        "Patch the stored Git metadata for this thread. Omit a field to leave it unchanged, set it to `null` to clear it, or provide a string to replace the stored value.",
    }),
  ),
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadMetadataUpdateParams" });

export type ClientRequest__ThreadListParams = {
  readonly archived?: boolean | null;
  readonly cursor?: string | null;
  readonly cwd?: ClientRequest__ThreadListCwdFilter | null;
  readonly limit?: number | null;
  readonly modelProviders?: ReadonlyArray<string> | null;
  readonly originators?: ReadonlyArray<string> | null;
  readonly searchTerm?: string | null;
  readonly sectionId?: string | null;
  readonly sortDirection?: ClientRequest__SortDirection | null;
  readonly sortKey?: ClientRequest__ThreadSortKey | null;
  readonly sourceKinds?: ReadonlyArray<ClientRequest__ThreadSourceKind> | null;
  readonly useStateDbOnly?: boolean;
};
export const ClientRequest__ThreadListParams = Schema.Struct({
  archived: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description:
          "Optional archived filter; when set to true, only archived threads are returned. If false or null, only non-archived threads are returned.",
      }),
      Schema.Null,
    ]),
  ),
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque pagination cursor returned by a previous call.",
      }),
      Schema.Null,
    ]),
  ),
  cwd: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadListCwdFilter, Schema.Null]).annotate({
      description:
        "Optional cwd filter or filters; when set, only threads whose session cwd exactly matches one of these paths are returned.",
    }),
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
  modelProviders: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Optional provider filter; when set, only sessions recorded under these providers are returned. When present but empty, includes all providers.",
      }),
      Schema.Null,
    ]),
  ),
  originators: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Optional originator allowlist, matching any supplied value exactly. Supported by hosted backends only; the local app-server rejects a nonempty list. Omitted or empty lists leave originators unrestricted.",
      }),
      Schema.Null,
    ]),
  ),
  searchTerm: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional substring filter for the extracted thread title.",
      }),
      Schema.Null,
    ]),
  ),
  sectionId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Omit to include every section, set to `null` for unsectioned threads, or provide a section ID to return only threads in that section.",
      }),
      Schema.Null,
    ]),
  ),
  sortDirection: Schema.optionalKey(
    Schema.Union([ClientRequest__SortDirection, Schema.Null]).annotate({
      description: "Optional sort direction; defaults to descending (newest first).",
    }),
  ),
  sortKey: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadSortKey, Schema.Null]).annotate({
      description: "Optional sort key; defaults to created_at.",
    }),
  ),
  sourceKinds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ClientRequest__ThreadSourceKind).annotate({
        description:
          "Optional source filter; when set, only sessions from these source kinds are returned. When omitted or empty, defaults to interactive sources.",
      }),
      Schema.Null,
    ]),
  ),
  useStateDbOnly: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "If true, return from the state DB without scanning JSONL rollouts to repair thread metadata. Omitted or false preserves scan-and-repair behavior.",
    }),
  ),
}).annotate({ identifier: "ClientRequest__ThreadListParams" });

export type ClientRequest__ThreadSectionCreateParams = {
  readonly appearance?: ClientRequest__ThreadSectionAppearance | null;
  readonly name: string;
};
export const ClientRequest__ThreadSectionCreateParams = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadSectionAppearance, Schema.Null]),
  ),
  name: Schema.String.annotate({ description: "The user-visible name of the section." }),
}).annotate({
  description: "Parameters for creating an independently persisted thread section.",
  identifier: "ClientRequest__ThreadSectionCreateParams",
});

export type ClientRequest__ThreadSectionUpdateParams = {
  readonly appearance?: ClientRequest__ThreadSectionAppearance | null;
  readonly name: string;
  readonly sectionId: string;
};
export const ClientRequest__ThreadSectionUpdateParams = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Omit to preserve appearance, use `null` to clear it, or provide a replacement.",
    }),
  ),
  name: Schema.String.annotate({ description: "The updated user-visible name of the section." }),
  sectionId: Schema.String.annotate({
    description: "The stable, server-generated identity of the section to update.",
  }),
}).annotate({
  description: "Parameters for updating an independently persisted thread section.",
  identifier: "ClientRequest__ThreadSectionUpdateParams",
});

export type ClientRequest__ThreadTurnsListParams = {
  readonly cursor?: string | null;
  readonly itemsView?: ClientRequest__TurnItemsView | null;
  readonly limit?: number | null;
  readonly sortDirection?: ClientRequest__SortDirection | null;
  readonly threadId: string;
};
export const ClientRequest__ThreadTurnsListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque cursor to pass to the next call to continue after the last turn.",
      }),
      Schema.Null,
    ]),
  ),
  itemsView: Schema.optionalKey(
    Schema.Union([ClientRequest__TurnItemsView, Schema.Null]).annotate({
      description: "How much item detail to include for each returned turn; defaults to summary.",
    }),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ description: "Optional turn page size.", format: "uint32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      Schema.Null,
    ]),
  ),
  sortDirection: Schema.optionalKey(
    Schema.Union([ClientRequest__SortDirection, Schema.Null]).annotate({
      description: "Optional turn pagination direction; defaults to descending.",
    }),
  ),
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadTurnsListParams" });

export type ClientRequest__ThreadItemsListCursor = string | ClientRequest__ThreadItemsListAnchor;
export const ClientRequest__ThreadItemsListCursor = Schema.Union([
  Schema.String,
  ClientRequest__ThreadItemsListAnchor,
]).annotate({
  description: "Starting position for an item-history page.",
  identifier: "ClientRequest__ThreadItemsListCursor",
});

export type ClientRequest__SkillsExtraRootsSetParams = {
  readonly extraRoots: ReadonlyArray<ClientRequest__AbsolutePathBuf>;
};
export const ClientRequest__SkillsExtraRootsSetParams = Schema.Struct({
  extraRoots: Schema.Array(ClientRequest__AbsolutePathBuf),
}).annotate({ identifier: "ClientRequest__SkillsExtraRootsSetParams" });

export type ClientRequest__PluginInstalledParams = {
  readonly cwds?: ReadonlyArray<ClientRequest__AbsolutePathBuf> | null;
  readonly installSuggestionPluginNames?: ReadonlyArray<string> | null;
};
export const ClientRequest__PluginInstalledParams = Schema.Struct({
  cwds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ClientRequest__AbsolutePathBuf).annotate({
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
}).annotate({ identifier: "ClientRequest__PluginInstalledParams" });

export type ClientRequest__PluginReadParams = {
  readonly marketplacePath?: ClientRequest__AbsolutePathBuf | null;
  readonly pluginName: string;
  readonly remoteMarketplaceName?: string | null;
};
export const ClientRequest__PluginReadParams = Schema.Struct({
  marketplacePath: Schema.optionalKey(Schema.Union([ClientRequest__AbsolutePathBuf, Schema.Null])),
  pluginName: Schema.String,
  remoteMarketplaceName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ClientRequest__PluginReadParams" });

export type ClientRequest__FsReadFileParams = { readonly path: ClientRequest__AbsolutePathBuf };
export const ClientRequest__FsReadFileParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
  ).annotate({ description: "Absolute path to read." }),
}).annotate({
  description: "Read a file from the host filesystem.",
  identifier: "ClientRequest__FsReadFileParams",
});

export type ClientRequest__FsWriteFileParams = {
  readonly dataBase64: string;
  readonly path: ClientRequest__AbsolutePathBuf;
};
export const ClientRequest__FsWriteFileParams = Schema.Struct({
  dataBase64: Schema.String.annotate({ description: "File contents encoded as base64." }),
  path: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
  ).annotate({ description: "Absolute path to write." }),
}).annotate({
  description: "Write a file on the host filesystem.",
  identifier: "ClientRequest__FsWriteFileParams",
});

export type ClientRequest__FsCreateDirectoryParams = {
  readonly path: ClientRequest__AbsolutePathBuf;
  readonly recursive?: boolean | null;
};
export const ClientRequest__FsCreateDirectoryParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
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
  description: "Create a directory on the host filesystem.",
  identifier: "ClientRequest__FsCreateDirectoryParams",
});

export type ClientRequest__FsGetMetadataParams = { readonly path: ClientRequest__AbsolutePathBuf };
export const ClientRequest__FsGetMetadataParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
  ).annotate({ description: "Absolute path to inspect." }),
}).annotate({
  description: "Request metadata for an absolute path.",
  identifier: "ClientRequest__FsGetMetadataParams",
});

export type ClientRequest__FsReadDirectoryParams = {
  readonly path: ClientRequest__AbsolutePathBuf;
};
export const ClientRequest__FsReadDirectoryParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
  ).annotate({ description: "Absolute directory path to read." }),
}).annotate({
  description: "List direct child names for a directory.",
  identifier: "ClientRequest__FsReadDirectoryParams",
});

export type ClientRequest__FsRemoveParams = {
  readonly force?: boolean | null;
  readonly path: ClientRequest__AbsolutePathBuf;
  readonly recursive?: boolean | null;
};
export const ClientRequest__FsRemoveParams = Schema.Struct({
  force: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description: "Whether missing paths should be ignored. Defaults to `true`.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
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
  description: "Remove a file or directory tree from the host filesystem.",
  identifier: "ClientRequest__FsRemoveParams",
});

export type ClientRequest__FsCopyParams = {
  readonly destinationPath: ClientRequest__AbsolutePathBuf;
  readonly recursive?: boolean;
  readonly sourcePath: ClientRequest__AbsolutePathBuf;
};
export const ClientRequest__FsCopyParams = Schema.Struct({
  destinationPath: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
  ).annotate({ description: "Absolute destination path." }),
  recursive: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Required for directory copies; ignored for file copies.",
    }),
  ),
  sourcePath: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
  ).annotate({ description: "Absolute source path." }),
}).annotate({
  description: "Copy a file or directory tree on the host filesystem.",
  identifier: "ClientRequest__FsCopyParams",
});

export type ClientRequest__FsWatchParams = {
  readonly path: ClientRequest__AbsolutePathBuf;
  readonly watchId: string;
};
export const ClientRequest__FsWatchParams = Schema.Struct({
  path: Schema.suspend(
    (): Schema.Codec<ClientRequest__AbsolutePathBuf> => ClientRequest__AbsolutePathBuf,
  ).annotate({ description: "Absolute file or directory path to watch." }),
  watchId: Schema.String.annotate({
    description: "Connection-scoped watch identifier used for `fs/unwatch` and `fs/changed`.",
  }),
}).annotate({
  description: "Start filesystem watch notifications for an absolute path.",
  identifier: "ClientRequest__FsWatchParams",
});

export type ClientRequest__SkillsConfigWriteParams = {
  readonly enabled: boolean;
  readonly name?: string | null;
  readonly path?: ClientRequest__AbsolutePathBuf | null;
};
export const ClientRequest__SkillsConfigWriteParams = Schema.Struct({
  enabled: Schema.Boolean,
  name: Schema.optionalKey(
    Schema.Union([Schema.String.annotate({ description: "Name-based selector." }), Schema.Null]),
  ),
  path: Schema.optionalKey(
    Schema.Union([ClientRequest__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Path-based selector.",
    }),
  ),
}).annotate({ identifier: "ClientRequest__SkillsConfigWriteParams" });

export type ClientRequest__PluginInstallParams = {
  readonly installAttemptId?: string | null;
  readonly marketplacePath?: ClientRequest__AbsolutePathBuf | null;
  readonly pluginName: string;
  readonly remoteMarketplaceName?: string | null;
};
export const ClientRequest__PluginInstallParams = Schema.Struct({
  installAttemptId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Client-generated identifier used to correlate one installation attempt.",
      }),
      Schema.Null,
    ]),
  ),
  marketplacePath: Schema.optionalKey(Schema.Union([ClientRequest__AbsolutePathBuf, Schema.Null])),
  pluginName: Schema.String,
  remoteMarketplaceName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ClientRequest__PluginInstallParams" });

export type ClientRequest__PluginListParams = {
  readonly cwds?: ReadonlyArray<ClientRequest__AbsolutePathBuf> | null;
  readonly forceRefetch?: boolean;
  readonly marketplaceKinds?: ReadonlyArray<ClientRequest__PluginListMarketplaceKind> | null;
};
export const ClientRequest__PluginListParams = Schema.Struct({
  cwds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ClientRequest__AbsolutePathBuf).annotate({
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
      Schema.Array(ClientRequest__PluginListMarketplaceKind).annotate({
        description:
          "Optional marketplace kind filter. When omitted, only local marketplaces are queried, plus the default remote catalog when enabled by feature flag.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ClientRequest__PluginListParams" });

export type ClientRequest__PluginShareTarget = {
  readonly principalId: string;
  readonly principalType: ClientRequest__PluginSharePrincipalType;
  readonly role: ClientRequest__PluginShareTargetRole;
};
export const ClientRequest__PluginShareTarget = Schema.Struct({
  principalId: Schema.String,
  principalType: ClientRequest__PluginSharePrincipalType,
  role: ClientRequest__PluginShareTargetRole,
}).annotate({ identifier: "ClientRequest__PluginShareTarget" });

export type ClientRequest__Settings = {
  readonly developer_instructions?: string | null;
  readonly model: string;
  readonly reasoning_effort?: ClientRequest__ReasoningEffort | null;
};
export const ClientRequest__Settings = Schema.Struct({
  developer_instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  model: Schema.String,
  reasoning_effort: Schema.optionalKey(Schema.Union([ClientRequest__ReasoningEffort, Schema.Null])),
}).annotate({
  description: "Settings for a collaboration mode.",
  identifier: "ClientRequest__Settings",
});

export type ClientRequest__ConfigurationReasoning = {
  readonly effort: ClientRequest__ReasoningEffort;
};
export const ClientRequest__ConfigurationReasoning = Schema.Struct({
  effort: ClientRequest__ReasoningEffort,
}).annotate({
  description: "Reasoning settings interpreted by the backend for the routed model.",
  identifier: "ClientRequest__ConfigurationReasoning",
});

export type ClientRequest__TextElement = {
  readonly byteRange: ClientRequest__ByteRange;
  readonly placeholder?: string | null;
};
export const ClientRequest__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<ClientRequest__ByteRange> => ClientRequest__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ClientRequest__TextElement" });

export type ClientRequest__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: ClientRequest__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: ClientRequest__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const ClientRequest__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ClientRequest__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ClientRequest__ImageDetail, Schema.Null])),
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
  identifier: "ClientRequest__FunctionCallOutputContentItem",
});

export type ClientRequest__ContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: ClientRequest__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: ClientRequest__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly text: string; readonly type: "output_text" };
export const ClientRequest__ContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({ title: "InputTextContentItemType" }),
    }).annotate({ title: "InputTextContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ClientRequest__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({ title: "InputImageContentItemType" }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ClientRequest__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({ title: "InputImageContentItemType" }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdContentItem" }),
    ]).annotate({ title: "InputImageContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({ title: "InputAudioContentItemType" }),
    }).annotate({ title: "InputAudioContentItem" }),
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("output_text").annotate({ title: "OutputTextContentItemType" }),
    }).annotate({ title: "OutputTextContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ClientRequest__ContentItem" });

export type ClientRequest__SandboxPolicy =
  | { readonly type: "dangerFullAccess" }
  | { readonly networkAccess?: boolean; readonly type: "readOnly" }
  | { readonly networkAccess?: ClientRequest__NetworkAccess; readonly type: "externalSandbox" }
  | {
      readonly excludeSlashTmp?: boolean;
      readonly excludeTmpdirEnvVar?: boolean;
      readonly networkAccess?: boolean;
      readonly type: "workspaceWrite";
      readonly writableRoots?: ReadonlyArray<ClientRequest__AbsolutePathBuf>;
    };
export const ClientRequest__SandboxPolicy = Schema.Union(
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
          (): Schema.Codec<ClientRequest__NetworkAccess> => ClientRequest__NetworkAccess,
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
        Schema.Array(ClientRequest__AbsolutePathBuf).annotate({ default: [] }),
      ),
    }).annotate({ title: "WorkspaceWriteSandboxPolicy" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ClientRequest__SandboxPolicy" });

export type ClientRequest__ReviewStartParams = {
  readonly delivery?: ClientRequest__ReviewDelivery | null;
  readonly target: ClientRequest__ReviewTarget;
  readonly threadId: string;
};
export const ClientRequest__ReviewStartParams = Schema.Struct({
  delivery: Schema.optionalKey(
    Schema.Union([ClientRequest__ReviewDelivery, Schema.Null]).annotate({
      description:
        "Where to run the review: inline (default) on the current thread or detached on a new thread (returned in `reviewThreadId`). Detached delivery is deprecated and emits `deprecationNotice`. Use `thread/start` followed by an inline review for a separate review thread.",
    }),
  ),
  target: ClientRequest__ReviewTarget,
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ReviewStartParams" });

export type ClientRequest__McpServerOauthLoginParams = {
  readonly clientRegistration?: ClientRequest__McpServerOauthClientRegistration | null;
  readonly name: string;
  readonly scopes?: ReadonlyArray<string> | null;
  readonly threadId?: string | null;
  readonly timeoutSecs?: number | null;
};
export const ClientRequest__McpServerOauthLoginParams = Schema.Struct({
  clientRegistration: Schema.optionalKey(
    Schema.Union([ClientRequest__McpServerOauthClientRegistration, Schema.Null]).annotate({
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
}).annotate({ identifier: "ClientRequest__McpServerOauthLoginParams" });

export type ClientRequest__ListMcpServerStatusParams = {
  readonly cursor?: string | null;
  readonly detail?: ClientRequest__McpServerStatusDetail | null;
  readonly limit?: number | null;
  readonly serverName?: string | null;
  readonly threadId?: string | null;
};
export const ClientRequest__ListMcpServerStatusParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque pagination cursor returned by a previous call.",
      }),
      Schema.Null,
    ]),
  ),
  detail: Schema.optionalKey(
    Schema.Union([ClientRequest__McpServerStatusDetail, Schema.Null]).annotate({
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
}).annotate({ identifier: "ClientRequest__ListMcpServerStatusParams" });

export type ClientRequest__McpResourceReadParams = {
  readonly connectorId?: string | null;
  readonly originCallId?: string | null;
  readonly server: string;
  readonly target?: ClientRequest__McpResourceReadTarget | null;
  readonly threadId?: string | null;
  readonly uri: string;
};
export const ClientRequest__McpResourceReadParams = Schema.Struct({
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
    Schema.Union([ClientRequest__McpResourceReadTarget, Schema.Null]).annotate({
      description: "Explicit hosted app/account. Omit to retain legacy resource discovery.",
    }),
  ),
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  uri: Schema.String,
}).annotate({ identifier: "ClientRequest__McpResourceReadParams" });

export type ClientRequest__WindowsSandboxSetupStartParams = {
  readonly cwd?: ClientRequest__AbsolutePathBuf | null;
  readonly mode: ClientRequest__WindowsSandboxSetupMode;
};
export const ClientRequest__WindowsSandboxSetupStartParams = Schema.Struct({
  cwd: Schema.optionalKey(Schema.Union([ClientRequest__AbsolutePathBuf, Schema.Null])),
  mode: ClientRequest__WindowsSandboxSetupMode,
}).annotate({ identifier: "ClientRequest__WindowsSandboxSetupStartParams" });

export type ClientRequest__LoginAccountParams =
  | { readonly apiKey: string; readonly type: "apiKey" }
  | {
      readonly appBrand?: ClientRequest__LoginAppBrand | null;
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
export const ClientRequest__LoginAccountParams = Schema.Union(
  [
    Schema.Struct({
      apiKey: Schema.String,
      type: Schema.Literal("apiKey").annotate({ title: "ApiKeyLoginAccountParamsType" }),
    }).annotate({ title: "ApiKeyLoginAccountParams" }),
    Schema.Struct({
      appBrand: Schema.optionalKey(Schema.Union([ClientRequest__LoginAppBrand, Schema.Null])),
      codexStreamlinedLogin: Schema.optionalKey(Schema.Boolean),
      type: Schema.Literal("chatgpt").annotate({ title: "ChatgptLoginAccountParamsType" }),
      useHostedLoginSuccessPage: Schema.optionalKey(Schema.Boolean),
    }).annotate({ title: "ChatgptLoginAccountParams" }),
    Schema.Struct({
      type: Schema.Literal("chatgptDeviceCode").annotate({
        title: "ChatgptDeviceCodeLoginAccountParamsType",
      }),
    }).annotate({ title: "ChatgptDeviceCodeLoginAccountParams" }),
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
        title: "ChatgptAuthTokensLoginAccountParamsType",
      }),
    }).annotate({
      title: "ChatgptAuthTokensLoginAccountParams",
      description:
        "[UNSTABLE] FOR OPENAI INTERNAL USE ONLY - DO NOT USE. The access token must contain the same scopes that Codex-managed ChatGPT auth tokens have.",
    }),
    Schema.Struct({
      apiKey: Schema.String,
      region: Schema.String,
      type: Schema.Literal("amazonBedrock").annotate({
        title: "AmazonBedrockLoginAccountParamsType",
      }),
    }).annotate({
      title: "AmazonBedrockLoginAccountParams",
      description: "[UNSTABLE] Managed Amazon Bedrock login is experimental.",
    }),
    Schema.Struct({
      accessKeyId: Schema.String,
      region: Schema.String,
      secretAccessKey: Schema.String,
      sessionToken: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("amazonBedrockAccessKeys").annotate({
        title: "AmazonBedrockAccessKeysLoginAccountParamsType",
      }),
    }).annotate({
      title: "AmazonBedrockAccessKeysLoginAccountParams",
      description: "[UNSTABLE] Managed Amazon Bedrock AWS access key login is experimental.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ClientRequest__LoginAccountParams" });

export type ClientRequest__SendAddCreditsNudgeEmailParams = {
  readonly creditType: ClientRequest__AddCreditsNudgeCreditType;
};
export const ClientRequest__SendAddCreditsNudgeEmailParams = Schema.Struct({
  creditType: ClientRequest__AddCreditsNudgeCreditType,
}).annotate({ identifier: "ClientRequest__SendAddCreditsNudgeEmailParams" });

export type ClientRequest__CommandExecResizeParams = {
  readonly processId: string;
  readonly size: ClientRequest__CommandExecTerminalSize;
};
export const ClientRequest__CommandExecResizeParams = Schema.Struct({
  processId: Schema.String.annotate({
    description:
      "Client-supplied, connection-scoped `processId` from the original `command/exec` request.",
  }),
  size: Schema.suspend(
    (): Schema.Codec<ClientRequest__CommandExecTerminalSize> =>
      ClientRequest__CommandExecTerminalSize,
  ).annotate({ description: "New PTY size in character cells." }),
}).annotate({
  description: "Resize a running PTY-backed `command/exec` session.",
  identifier: "ClientRequest__CommandExecResizeParams",
});
