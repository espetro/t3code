/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  V2SkillsExtraRootsSetParams__AbsolutePathBuf,
  V2ThreadAttachmentAddResponse__ThreadAttachment,
  V2ThreadAttachmentAddResponse__ThreadAttachmentAddOutcome,
  V2ThreadAttachmentListResponse__ThreadAttachment,
  V2ThreadAttachmentUpdatedNotification__ThreadAttachmentOperation,
  V2ThreadForkParams__ApprovalsReviewer,
  V2ThreadForkParams__AskForApproval,
  V2ThreadForkParams__SandboxMode,
  V2ThreadForkParams__ThreadSource,
  V2ThreadForkResponse__AbsolutePathBuf,
  V2ThreadForkResponse__ApprovalsReviewer,
  V2ThreadForkResponse__AskForApproval,
  V2ThreadForkResponse__LegacyAppPathString,
  V2ThreadForkResponse__ReasoningEffort,
  V2ThreadGoalSetParams__ThreadGoalStatus,
  V2ThreadItemsListParams__SortDirection,
  V2ThreadListParams__SortDirection,
  V2ThreadListParams__ThreadListCwdFilter,
  V2ThreadListParams__ThreadSortKey,
  V2ThreadListParams__ThreadSourceKind,
  V2ThreadListResponse__LegacyAppPathString,
} from "./schema.gen.part3.ts";
import {
  V2ThreadMetadataUpdateParams__ThreadMetadataGitInfoUpdateParams,
  V2ThreadMetadataUpdateResponse__LegacyAppPathString,
  V2ThreadReadResponse__LegacyAppPathString,
  V2ThreadRealtimeOutputAudioDeltaNotification__ThreadRealtimeAudioChunk,
  V2ThreadRealtimeStartedNotification__RealtimeConversationVersion,
  V2ThreadResumeParams__AgentMessageInputContent,
  V2ThreadResumeParams__ApprovalsReviewer,
  V2ThreadResumeParams__AskForApproval,
  V2ThreadResumeParams__InternalChatMessageMetadataPassthrough,
  V2ThreadResumeParams__LocalShellAction,
  V2ThreadResumeParams__LocalShellStatus,
  V2ThreadResumeParams__MessagePhase,
  V2ThreadResumeParams__Personality,
  V2ThreadResumeParams__ReasoningItemContent,
  V2ThreadResumeParams__ReasoningItemReasoningSummary,
  V2ThreadResumeParams__ResponsesApiWebSearchAction,
  V2ThreadResumeParams__SandboxMode,
  V2ThreadResumeParams__SortDirection,
  V2ThreadResumeParams__TurnItemsView,
  V2ThreadResumeResponse__AbsolutePathBuf,
  V2ThreadResumeResponse__ApprovalsReviewer,
  V2ThreadResumeResponse__AskForApproval,
  V2ThreadResumeResponse__LegacyAppPathString,
  V2ThreadResumeResponse__ReasoningEffort,
  V2ThreadRevertResponse__LegacyAppPathString,
} from "./schema.gen.part4.ts";
import {
  V2ThreadSectionCreateParams__ThreadSectionAppearance,
  V2ThreadSectionUpdateParams__ThreadSectionAppearance,
  V2ThreadStartParams__ApprovalsReviewer,
  V2ThreadStartParams__AskForApproval,
  V2ThreadStartParams__CapabilityRootLocation,
  V2ThreadStartParams__DynamicToolNamespaceTool,
  V2ThreadStartParams__LegacyAppPathString,
  V2ThreadStartParams__Personality,
  V2ThreadStartParams__SandboxMode,
  V2ThreadStartParams__ThreadSource,
  V2ThreadStartParams__ThreadStartSource,
  V2ThreadStartResponse__AbsolutePathBuf,
  V2ThreadStartResponse__ApprovalsReviewer,
  V2ThreadStartResponse__AskForApproval,
  V2ThreadStartResponse__LegacyAppPathString,
  V2ThreadStartResponse__ReasoningEffort,
  V2ThreadStartedNotification__LegacyAppPathString,
  V2ThreadTurnsListParams__SortDirection,
  V2ThreadTurnsListParams__TurnItemsView,
  V2ThreadUnarchiveResponse__LegacyAppPathString,
  V2ThreadUnsubscribeResponse__ThreadUnsubscribeStatus,
} from "./schema.gen.part5.ts";
import {
  V2ThreadForkResponse__SandboxPolicy,
  V2ThreadGoalGetResponse__ThreadGoal,
  V2ThreadGoalSetResponse__ThreadGoal,
  V2ThreadGoalUpdatedNotification__ThreadGoal,
  V2ThreadItemsListParams__ThreadItemsListCursor,
} from "./schema.gen.part9.ts";
import {
  V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeItem,
  V2ThreadRealtimeItemStartedNotification__ThreadRealtimeItem,
  V2ThreadResumeParams__ConfigurationReasoning,
  V2ThreadResumeParams__ContentItem,
  V2ThreadResumeResponse__SandboxPolicy,
  V2ThreadSectionCreateResponse__ThreadSection,
  V2ThreadSectionListResponse__ThreadSection,
  V2ThreadSectionUpdateResponse__ThreadSection,
  V2ThreadStartResponse__SandboxPolicy,
  V2ThreadStatusChangedNotification__ThreadStatus,
  V2ThreadTokenUsageUpdatedNotification__ThreadTokenUsage,
} from "./schema.gen.part10.ts";
import { V2TurnPlanUpdatedNotification__TurnPlanStep } from "./schema.gen.part11.ts";
import {
  V2ThreadResumeParams__FunctionCallOutputBody,
  V2ThreadResumeResponse__CollaborationMode,
} from "./schema.gen.part13.ts";
import { V2SkillsListResponse__SkillsListEntry } from "./schema.gen.part14.ts";
import { V2ThreadSettingsUpdatedNotification__ThreadSettings } from "./schema.gen.part16.ts";
import {
  V2ThreadForkResponse__Thread,
  V2ThreadItemsListResponse__ThreadItemEntry,
  V2ThreadListResponse__Thread,
  V2ThreadMetadataUpdateResponse__Thread,
  V2ThreadReadResponse__Thread,
  V2ThreadResumeResponse__Turn,
  V2ThreadTurnsListResponse__Turn,
  V2TurnCompletedNotification__Turn,
  V2TurnStartedNotification__Turn,
} from "./schema.gen.part18.ts";
import {
  V2ThreadResumeResponse__Thread,
  V2ThreadRevertResponse__Thread,
  V2ThreadStartResponse__Thread,
  V2ThreadStartedNotification__Thread,
  V2ThreadUnarchiveResponse__Thread,
} from "./schema.gen.part19.ts";

export type V2SkillsConfigWriteResponse = { readonly effectiveEnabled: boolean };
export const V2SkillsConfigWriteResponse = Schema.Struct({
  effectiveEnabled: Schema.Boolean,
}).annotate({ title: "SkillsConfigWriteResponse" });

export type V2SkillsExtraRootsSetParams = {
  readonly extraRoots: ReadonlyArray<V2SkillsExtraRootsSetParams__AbsolutePathBuf>;
};
export const V2SkillsExtraRootsSetParams = Schema.Struct({
  extraRoots: Schema.Array(V2SkillsExtraRootsSetParams__AbsolutePathBuf),
}).annotate({ title: "SkillsExtraRootsSetParams" });

export type V2SkillsExtraRootsSetResponse = { readonly [x: string]: Schema.Json };
export const V2SkillsExtraRootsSetResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "SkillsExtraRootsSetResponse" });

export type V2SkillsListParams = {
  readonly cwds?: ReadonlyArray<string>;
  readonly forceReload?: boolean;
};
export const V2SkillsListParams = Schema.Struct({
  cwds: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "When empty, defaults to the current session working directory.",
    }),
  ),
  forceReload: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "When true, bypass the skills cache and re-scan skills from disk.",
    }),
  ),
}).annotate({ title: "SkillsListParams" });

export type V2SkillsListResponse = {
  readonly data: ReadonlyArray<V2SkillsListResponse__SkillsListEntry>;
};
export const V2SkillsListResponse = Schema.Struct({
  data: Schema.Array(V2SkillsListResponse__SkillsListEntry),
}).annotate({ title: "SkillsListResponse" });

export type V2StrictReviewRequiredNotification = {
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2StrictReviewRequiredNotification = Schema.Struct({
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this review started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "StrictReviewRequiredNotification" });

export type V2TerminalInteractionNotification = {
  readonly itemId: string;
  readonly processId: string;
  readonly stdin: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2TerminalInteractionNotification = Schema.Struct({
  itemId: Schema.String,
  processId: Schema.String,
  stdin: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "TerminalInteractionNotification" });

export type V2ThreadApproveGuardianDeniedActionParams = {
  readonly event: Schema.Json;
  readonly threadId: string;
};
export const V2ThreadApproveGuardianDeniedActionParams = Schema.Struct({
  event: Schema.Json.annotate({
    expected: "JSON value",
    description: "Serialized `codex_protocol::protocol::GuardianAssessmentEvent`.",
  }),
  threadId: Schema.String,
}).annotate({ title: "ThreadApproveGuardianDeniedActionParams" });

export type V2ThreadApproveGuardianDeniedActionResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadApproveGuardianDeniedActionResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadApproveGuardianDeniedActionResponse" });

export type V2ThreadArchivedNotification = { readonly threadId: string };
export const V2ThreadArchivedNotification = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadArchivedNotification",
});

export type V2ThreadArchiveParams = { readonly threadId: string };
export const V2ThreadArchiveParams = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadArchiveParams",
});

export type V2ThreadArchiveResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadArchiveResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadArchiveResponse" });

export type V2ThreadAttachmentAddParams = {
  readonly attachmentType: string;
  readonly identityKey: string;
  readonly payload: Schema.Json;
  readonly threadId: string;
};
export const V2ThreadAttachmentAddParams = Schema.Struct({
  attachmentType: Schema.String,
  identityKey: Schema.String,
  payload: Schema.Json.annotate({ expected: "JSON value" }),
  threadId: Schema.String,
}).annotate({
  title: "ThreadAttachmentAddParams",
  description: "Parameters for creating or locating an attachment on its owning thread.",
});

export type V2ThreadAttachmentAddResponse = {
  readonly attachment: V2ThreadAttachmentAddResponse__ThreadAttachment;
  readonly outcome: V2ThreadAttachmentAddResponse__ThreadAttachmentAddOutcome;
};
export const V2ThreadAttachmentAddResponse = Schema.Struct({
  attachment: V2ThreadAttachmentAddResponse__ThreadAttachment,
  outcome: V2ThreadAttachmentAddResponse__ThreadAttachmentAddOutcome,
}).annotate({
  title: "ThreadAttachmentAddResponse",
  description: "The created or existing attachment.",
});

export type V2ThreadAttachmentListParams = {
  readonly cursor?: string | null;
  readonly limit?: number | null;
  readonly threadId: string;
};
export const V2ThreadAttachmentListParams = Schema.Struct({
  cursor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  limit: Schema.optionalKey(
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
  threadId: Schema.String,
}).annotate({
  title: "ThreadAttachmentListParams",
  description: "Parameters for listing attachments from one thread.",
});

export type V2ThreadAttachmentListResponse = {
  readonly data: ReadonlyArray<V2ThreadAttachmentListResponse__ThreadAttachment>;
  readonly nextCursor?: string | null;
};
export const V2ThreadAttachmentListResponse = Schema.Struct({
  data: Schema.Array(V2ThreadAttachmentListResponse__ThreadAttachment),
  nextCursor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  title: "ThreadAttachmentListResponse",
  description: "One page of attachments associated with the requested thread.",
});

export type V2ThreadAttachmentRemoveParams = {
  readonly attachmentType: string;
  readonly identityKey: string;
  readonly threadId: string;
};
export const V2ThreadAttachmentRemoveParams = Schema.Struct({
  attachmentType: Schema.String,
  identityKey: Schema.String,
  threadId: Schema.String,
}).annotate({
  title: "ThreadAttachmentRemoveParams",
  description: "Parameters for deleting an attachment by its stable thread-local identity.",
});

export type V2ThreadAttachmentRemoveResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadAttachmentRemoveResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "ThreadAttachmentRemoveResponse",
  description: "Successful deletion does not return additional attachment data.",
});

export type V2ThreadAttachmentUpdatedNotification = {
  readonly attachmentId: string;
  readonly attachmentType: string;
  readonly identityKey: string;
  readonly operation: V2ThreadAttachmentUpdatedNotification__ThreadAttachmentOperation;
  readonly threadId: string;
};
export const V2ThreadAttachmentUpdatedNotification = Schema.Struct({
  attachmentId: Schema.String,
  attachmentType: Schema.String,
  identityKey: Schema.String,
  operation: V2ThreadAttachmentUpdatedNotification__ThreadAttachmentOperation,
  threadId: Schema.String,
}).annotate({
  title: "ThreadAttachmentUpdatedNotification",
  description: "Notification published after a thread attachment is created or deleted.",
});

export type V2ThreadClosedNotification = { readonly threadId: string };
export const V2ThreadClosedNotification = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadClosedNotification",
});

export type V2ThreadCompactStartParams = { readonly threadId: string };
export const V2ThreadCompactStartParams = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadCompactStartParams",
});

export type V2ThreadCompactStartResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadCompactStartResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadCompactStartResponse" });

export type V2ThreadDeletedNotification = { readonly threadId: string };
export const V2ThreadDeletedNotification = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadDeletedNotification",
});

export type V2ThreadDeleteParams = { readonly threadId: string };
export const V2ThreadDeleteParams = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadDeleteParams",
});

export type V2ThreadDeleteResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadDeleteResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadDeleteResponse" });

export type V2ThreadForkParams = {
  readonly approvalPolicy?: V2ThreadForkParams__AskForApproval | null;
  readonly approvalsReviewer?: V2ThreadForkParams__ApprovalsReviewer | null;
  readonly baseInstructions?: string | null;
  readonly config?: { readonly [x: string]: Schema.Json } | null;
  readonly cwd?: string | null;
  readonly developerInstructions?: string | null;
  readonly ephemeral?: boolean;
  readonly excludeTurns?: boolean;
  readonly lastTurnId?: string | null;
  readonly model?: string | null;
  readonly modelProvider?: string | null;
  readonly sandbox?: V2ThreadForkParams__SandboxMode | null;
  readonly serviceTier?: string | null;
  readonly threadId: string;
  readonly threadSource?: V2ThreadForkParams__ThreadSource | null;
};
export const V2ThreadForkParams = Schema.Struct({
  approvalPolicy: Schema.optionalKey(
    Schema.Union([V2ThreadForkParams__AskForApproval, Schema.Null]),
  ),
  approvalsReviewer: Schema.optionalKey(
    Schema.Union([V2ThreadForkParams__ApprovalsReviewer, Schema.Null]).annotate({
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
  sandbox: Schema.optionalKey(Schema.Union([V2ThreadForkParams__SandboxMode, Schema.Null])),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadForkParams__ThreadSource, Schema.Null]).annotate({
      description:
        "Optional client-supplied analytics source classification for this forked thread.",
    }),
  ),
}).annotate({
  title: "ThreadForkParams",
  description:
    "There are two ways to fork a thread: 1. By thread_id: load the thread from disk by thread_id and fork it into a new thread. 2. By path: load the thread from disk by path and fork it into a new thread.\n\nIf using a non-empty path, the thread_id param will be ignored. Empty string path values are treated as absent.\n\nPrefer using thread_id whenever possible.",
});

export type V2ThreadForkParams__AbsolutePathBuf = string;
export const V2ThreadForkParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
});

export type V2ThreadForkResponse = {
  readonly approvalPolicy: V2ThreadForkResponse__AskForApproval;
  readonly approvalsReviewer: V2ThreadForkResponse__ApprovalsReviewer;
  readonly cwd: V2ThreadForkResponse__AbsolutePathBuf;
  readonly disabledPluginIds?: ReadonlyArray<string>;
  readonly instructionSources?: ReadonlyArray<V2ThreadForkResponse__LegacyAppPathString>;
  readonly model: string;
  readonly modelProvider: string;
  readonly reasoningEffort?: V2ThreadForkResponse__ReasoningEffort | null;
  readonly sandbox: V2ThreadForkResponse__SandboxPolicy;
  readonly serviceTier?: string | null;
  readonly thread: V2ThreadForkResponse__Thread;
};
export const V2ThreadForkResponse = Schema.Struct({
  approvalPolicy: V2ThreadForkResponse__AskForApproval,
  approvalsReviewer: Schema.suspend(
    (): Schema.Codec<V2ThreadForkResponse__ApprovalsReviewer> =>
      V2ThreadForkResponse__ApprovalsReviewer,
  ).annotate({ description: "Reviewer currently used for approval requests on this thread." }),
  cwd: V2ThreadForkResponse__AbsolutePathBuf,
  disabledPluginIds: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "Saved list of disabled plugin IDs. Does not yet filter plugin capabilities.",
      default: [],
    }),
  ),
  instructionSources: Schema.optionalKey(
    Schema.Array(V2ThreadForkResponse__LegacyAppPathString).annotate({
      description:
        "Environment-native paths to instruction source files currently loaded for this thread.",
      default: [],
    }),
  ),
  model: Schema.String,
  modelProvider: Schema.String,
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__ReasoningEffort, Schema.Null]),
  ),
  sandbox: Schema.suspend(
    (): Schema.Codec<V2ThreadForkResponse__SandboxPolicy> => V2ThreadForkResponse__SandboxPolicy,
  ).annotate({
    description:
      "Legacy sandbox policy retained for compatibility. Experimental clients should prefer `activePermissionProfile` for profile provenance.",
  }),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  thread: V2ThreadForkResponse__Thread,
}).annotate({ title: "ThreadForkResponse" });

export type V2ThreadForkResponse__ActivePermissionProfile = {
  readonly extends?: string | null;
  readonly id: string;
};
export const V2ThreadForkResponse__ActivePermissionProfile = Schema.Struct({
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
});

export type V2ThreadForkResponse__MultiAgentMode =
  | "explicitRequestOnly"
  | "proactive"
  | { readonly custom: string };
export const V2ThreadForkResponse__MultiAgentMode = Schema.Union(
  [
    Schema.Literals(["explicitRequestOnly", "proactive"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomMultiAgentMode" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Controls the effective multi-agent delegation instructions for a turn. `custom` means the configured mode hint defines the policy instead of a built-in policy.",
});

export type V2ThreadForkResponse__ThreadEnvironment = {
  readonly cwd: V2ThreadForkResponse__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadForkResponse__LegacyAppPathString>;
};
export const V2ThreadForkResponse__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadForkResponse__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadForkResponse__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadForkResponse__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadForkResponse__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadGoalClearedNotification = { readonly threadId: string };
export const V2ThreadGoalClearedNotification = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadGoalClearedNotification",
});

export type V2ThreadGoalClearParams = { readonly threadId: string };
export const V2ThreadGoalClearParams = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadGoalClearParams",
});

export type V2ThreadGoalClearResponse = { readonly cleared: boolean };
export const V2ThreadGoalClearResponse = Schema.Struct({ cleared: Schema.Boolean }).annotate({
  title: "ThreadGoalClearResponse",
});

export type V2ThreadGoalGetParams = { readonly threadId: string };
export const V2ThreadGoalGetParams = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadGoalGetParams",
});

export type V2ThreadGoalGetResponse = {
  readonly goal?: V2ThreadGoalGetResponse__ThreadGoal | null;
};
export const V2ThreadGoalGetResponse = Schema.Struct({
  goal: Schema.optionalKey(Schema.Union([V2ThreadGoalGetResponse__ThreadGoal, Schema.Null])),
}).annotate({ title: "ThreadGoalGetResponse" });

export type V2ThreadGoalSetParams = {
  readonly objective?: string | null;
  readonly status?: V2ThreadGoalSetParams__ThreadGoalStatus | null;
  readonly threadId: string;
  readonly tokenBudget?: number | null;
};
export const V2ThreadGoalSetParams = Schema.Struct({
  objective: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: Schema.optionalKey(Schema.Union([V2ThreadGoalSetParams__ThreadGoalStatus, Schema.Null])),
  threadId: Schema.String,
  tokenBudget: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadGoalSetParams" });

export type V2ThreadGoalSetResponse = { readonly goal: V2ThreadGoalSetResponse__ThreadGoal };
export const V2ThreadGoalSetResponse = Schema.Struct({
  goal: V2ThreadGoalSetResponse__ThreadGoal,
}).annotate({ title: "ThreadGoalSetResponse" });

export type V2ThreadGoalUpdatedNotification = {
  readonly goal: V2ThreadGoalUpdatedNotification__ThreadGoal;
  readonly threadId: string;
  readonly turnId?: string | null;
};
export const V2ThreadGoalUpdatedNotification = Schema.Struct({
  goal: V2ThreadGoalUpdatedNotification__ThreadGoal,
  threadId: Schema.String,
  turnId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "ThreadGoalUpdatedNotification" });

export type V2ThreadInjectItemsParams = {
  readonly items: ReadonlyArray<Schema.Json>;
  readonly threadId: string;
};
export const V2ThreadInjectItemsParams = Schema.Struct({
  items: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })).annotate({
    description: "Raw Responses API items to append to the thread's model-visible history.",
  }),
  threadId: Schema.String,
}).annotate({ title: "ThreadInjectItemsParams" });

export type V2ThreadInjectItemsResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadInjectItemsResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadInjectItemsResponse" });

export type V2ThreadItemsListParams = {
  readonly cursor?: V2ThreadItemsListParams__ThreadItemsListCursor | null;
  readonly limit?: number | null;
  readonly sortDirection?: V2ThreadItemsListParams__SortDirection | null;
  readonly threadId: string;
  readonly turnId?: string | null;
};
export const V2ThreadItemsListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([V2ThreadItemsListParams__ThreadItemsListCursor, Schema.Null]).annotate({
      description:
        "Opaque continuation cursor or an exclusive item anchor in the requested visible turn. An item anchor requires a non-empty `turnId`; ascending (the default) returns items after it, and descending returns items before it. Continue with the returned string cursor.",
    }),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ description: "Optional item page size.", format: "uint32" })
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
    Schema.Union([V2ThreadItemsListParams__SortDirection, Schema.Null]).annotate({
      description: "Optional item pagination direction; defaults to ascending.",
    }),
  ),
  threadId: Schema.String,
  turnId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional turn id to filter by. When omitted, returns items across the thread.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadItemsListParams" });

export type V2ThreadItemsListResponse = {
  readonly backwardsCursor?: string | null;
  readonly data: ReadonlyArray<V2ThreadItemsListResponse__ThreadItemEntry>;
  readonly nextCursor?: string | null;
};
export const V2ThreadItemsListResponse = Schema.Struct({
  backwardsCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass as `cursor` when reversing `sortDirection`. This is only populated when the page contains at least one item.",
      }),
      Schema.Null,
    ]),
  ),
  data: Schema.Array(V2ThreadItemsListResponse__ThreadItemEntry),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last item. if None, there are no more items to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadItemsListResponse" });

export type V2ThreadListParams = {
  readonly archived?: boolean | null;
  readonly cursor?: string | null;
  readonly cwd?: V2ThreadListParams__ThreadListCwdFilter | null;
  readonly limit?: number | null;
  readonly modelProviders?: ReadonlyArray<string> | null;
  readonly originators?: ReadonlyArray<string> | null;
  readonly searchTerm?: string | null;
  readonly sectionId?: string | null;
  readonly sortDirection?: V2ThreadListParams__SortDirection | null;
  readonly sortKey?: V2ThreadListParams__ThreadSortKey | null;
  readonly sourceKinds?: ReadonlyArray<V2ThreadListParams__ThreadSourceKind> | null;
  readonly useStateDbOnly?: boolean;
};
export const V2ThreadListParams = Schema.Struct({
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
    Schema.Union([V2ThreadListParams__ThreadListCwdFilter, Schema.Null]).annotate({
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
    Schema.Union([V2ThreadListParams__SortDirection, Schema.Null]).annotate({
      description: "Optional sort direction; defaults to descending (newest first).",
    }),
  ),
  sortKey: Schema.optionalKey(
    Schema.Union([V2ThreadListParams__ThreadSortKey, Schema.Null]).annotate({
      description: "Optional sort key; defaults to created_at.",
    }),
  ),
  sourceKinds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2ThreadListParams__ThreadSourceKind).annotate({
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
}).annotate({ title: "ThreadListParams" });

export type V2ThreadListResponse = {
  readonly backwardsCursor?: string | null;
  readonly data: ReadonlyArray<V2ThreadListResponse__Thread>;
  readonly nextCursor?: string | null;
};
export const V2ThreadListResponse = Schema.Struct({
  backwardsCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass as `cursor` when reversing `sortDirection`. This is only populated when the page contains at least one thread. Use it with the opposite `sortDirection`; for timestamp sorts it anchors at the start of the page timestamp so same-second updates are not skipped.",
      }),
      Schema.Null,
    ]),
  ),
  data: Schema.Array(V2ThreadListResponse__Thread),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last item. if None, there are no more items to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadListResponse" });

export type V2ThreadListResponse__ThreadEnvironment = {
  readonly cwd: V2ThreadListResponse__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadListResponse__LegacyAppPathString>;
};
export const V2ThreadListResponse__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadListResponse__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadListResponse__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadListResponse__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadListResponse__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadLoadedListParams = {
  readonly cursor?: string | null;
  readonly limit?: number | null;
};
export const V2ThreadLoadedListParams = Schema.Struct({
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
        description: "Optional page size; defaults to no limit.",
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
}).annotate({ title: "ThreadLoadedListParams" });

export type V2ThreadLoadedListResponse = {
  readonly data: ReadonlyArray<string>;
  readonly nextCursor?: string | null;
};
export const V2ThreadLoadedListResponse = Schema.Struct({
  data: Schema.Array(Schema.String).annotate({
    description: "Thread ids for sessions currently loaded in memory.",
  }),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last item. if None, there are no more items to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadLoadedListResponse" });

export type V2ThreadMetadataUpdateParams = {
  readonly gitInfo?: V2ThreadMetadataUpdateParams__ThreadMetadataGitInfoUpdateParams | null;
  readonly threadId: string;
};
export const V2ThreadMetadataUpdateParams = Schema.Struct({
  gitInfo: Schema.optionalKey(
    Schema.Union([
      V2ThreadMetadataUpdateParams__ThreadMetadataGitInfoUpdateParams,
      Schema.Null,
    ]).annotate({
      description:
        "Patch the stored Git metadata for this thread. Omit a field to leave it unchanged, set it to `null` to clear it, or provide a string to replace the stored value.",
    }),
  ),
  threadId: Schema.String,
}).annotate({ title: "ThreadMetadataUpdateParams" });

export type V2ThreadMetadataUpdateResponse = {
  readonly thread: V2ThreadMetadataUpdateResponse__Thread;
};
export const V2ThreadMetadataUpdateResponse = Schema.Struct({
  thread: V2ThreadMetadataUpdateResponse__Thread,
}).annotate({ title: "ThreadMetadataUpdateResponse" });

export type V2ThreadMetadataUpdateResponse__ThreadEnvironment = {
  readonly cwd: V2ThreadMetadataUpdateResponse__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadMetadataUpdateResponse__LegacyAppPathString>;
};
export const V2ThreadMetadataUpdateResponse__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadMetadataUpdateResponse__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadMetadataUpdateResponse__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadMetadataUpdateResponse__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadMetadataUpdateResponse__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadNameUpdatedNotification = {
  readonly threadId: string;
  readonly threadName?: string | null;
};
export const V2ThreadNameUpdatedNotification = Schema.Struct({
  threadId: Schema.String,
  threadName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "ThreadNameUpdatedNotification" });

export type V2ThreadProjectUpdatedNotification = {
  readonly projectId: string | null;
  readonly threadId: string;
};
export const V2ThreadProjectUpdatedNotification = Schema.Struct({
  projectId: Schema.Union([Schema.String, Schema.Null]),
  threadId: Schema.String,
}).annotate({ title: "ThreadProjectUpdatedNotification" });

export type V2ThreadQueueChangedNotification = { readonly threadId: string };
export const V2ThreadQueueChangedNotification = Schema.Struct({ threadId: Schema.String }).annotate(
  { title: "ThreadQueueChangedNotification" },
);

export type V2ThreadReadParams = { readonly includeTurns?: boolean; readonly threadId: string };
export const V2ThreadReadParams = Schema.Struct({
  includeTurns: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true, include turns and their items from rollout history. Full-history hydration is deprecated for paginated threads; prefer a metadata-only read and page with `thread/turns/list` and `thread/items/list`.",
    }),
  ),
  threadId: Schema.String,
}).annotate({ title: "ThreadReadParams" });

export type V2ThreadReadResponse = { readonly thread: V2ThreadReadResponse__Thread };
export const V2ThreadReadResponse = Schema.Struct({
  thread: V2ThreadReadResponse__Thread,
}).annotate({ title: "ThreadReadResponse" });

export type V2ThreadReadResponse__ThreadEnvironment = {
  readonly cwd: V2ThreadReadResponse__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadReadResponse__LegacyAppPathString>;
};
export const V2ThreadReadResponse__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadReadResponse__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadReadResponse__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadReadResponse__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadReadResponse__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadRealtimeClosedNotification = {
  readonly reason?: string | null;
  readonly threadId: string;
};
export const V2ThreadRealtimeClosedNotification = Schema.Struct({
  reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeClosedNotification",
  description: "EXPERIMENTAL - emitted when thread realtime transport closes.",
});

export type V2ThreadRealtimeErrorNotification = {
  readonly message: string;
  readonly threadId: string;
};
export const V2ThreadRealtimeErrorNotification = Schema.Struct({
  message: Schema.String,
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeErrorNotification",
  description: "EXPERIMENTAL - emitted when thread realtime encounters an error.",
});

export type V2ThreadRealtimeItemAddedNotification = {
  readonly item: Schema.Json;
  readonly threadId: string;
};
export const V2ThreadRealtimeItemAddedNotification = Schema.Struct({
  item: Schema.Json.annotate({ expected: "JSON value" }),
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeItemAddedNotification",
  description: "EXPERIMENTAL - raw non-audio thread realtime item emitted by the backend.",
});

export type V2ThreadRealtimeItemCompletedNotification = {
  readonly item: V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeItem;
  readonly threadId: string;
};
export const V2ThreadRealtimeItemCompletedNotification = Schema.Struct({
  item: V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeItem,
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeItemCompletedNotification",
  description: "EXPERIMENTAL - a realtime timeline item published after canonical commit.",
});

export type V2ThreadRealtimeItemStartedNotification = {
  readonly item: V2ThreadRealtimeItemStartedNotification__ThreadRealtimeItem;
  readonly threadId: string;
};
export const V2ThreadRealtimeItemStartedNotification = Schema.Struct({
  item: V2ThreadRealtimeItemStartedNotification__ThreadRealtimeItem,
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeItemStartedNotification",
  description: "EXPERIMENTAL - a realtime timeline item started before its content streams.",
});

export type V2ThreadRealtimeItemTranscriptDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
};
export const V2ThreadRealtimeItemTranscriptDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeItemTranscriptDeltaNotification",
  description: "EXPERIMENTAL - text appended to an active realtime transcript item.",
});

export type V2ThreadRealtimeOutputAudioDeltaNotification = {
  readonly audio: V2ThreadRealtimeOutputAudioDeltaNotification__ThreadRealtimeAudioChunk;
  readonly threadId: string;
};
export const V2ThreadRealtimeOutputAudioDeltaNotification = Schema.Struct({
  audio: V2ThreadRealtimeOutputAudioDeltaNotification__ThreadRealtimeAudioChunk,
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeOutputAudioDeltaNotification",
  description: "EXPERIMENTAL - streamed output audio emitted by thread realtime.",
});

export type V2ThreadRealtimeSdpNotification = { readonly sdp: string; readonly threadId: string };
export const V2ThreadRealtimeSdpNotification = Schema.Struct({
  sdp: Schema.String,
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeSdpNotification",
  description: "EXPERIMENTAL - emitted with the remote SDP for a WebRTC realtime session.",
});

export type V2ThreadRealtimeStartedNotification = {
  readonly realtimeSessionId?: string | null;
  readonly threadId: string;
  readonly version: V2ThreadRealtimeStartedNotification__RealtimeConversationVersion;
};
export const V2ThreadRealtimeStartedNotification = Schema.Struct({
  realtimeSessionId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
  version: V2ThreadRealtimeStartedNotification__RealtimeConversationVersion,
}).annotate({
  title: "ThreadRealtimeStartedNotification",
  description: "EXPERIMENTAL - emitted when thread realtime startup is accepted.",
});

export type V2ThreadRealtimeTranscriptDeltaNotification = {
  readonly delta: string;
  readonly role: string;
  readonly threadId: string;
};
export const V2ThreadRealtimeTranscriptDeltaNotification = Schema.Struct({
  delta: Schema.String.annotate({ description: "Live transcript delta from the realtime event." }),
  role: Schema.String,
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeTranscriptDeltaNotification",
  description:
    "EXPERIMENTAL - flat transcript delta emitted whenever realtime transcript text changes.",
});

export type V2ThreadRealtimeTranscriptDoneNotification = {
  readonly role: string;
  readonly text: string;
  readonly threadId: string;
};
export const V2ThreadRealtimeTranscriptDoneNotification = Schema.Struct({
  role: Schema.String,
  text: Schema.String.annotate({ description: "Final complete text for the transcript part." }),
  threadId: Schema.String,
}).annotate({
  title: "ThreadRealtimeTranscriptDoneNotification",
  description:
    "EXPERIMENTAL - final transcript text emitted when realtime completes a transcript part.",
});

export type V2ThreadResumeParams = {
  readonly approvalPolicy?: V2ThreadResumeParams__AskForApproval | null;
  readonly approvalsReviewer?: V2ThreadResumeParams__ApprovalsReviewer | null;
  readonly baseInstructions?: string | null;
  readonly config?: { readonly [x: string]: Schema.Json } | null;
  readonly cwd?: string | null;
  readonly developerInstructions?: string | null;
  readonly excludeTurns?: boolean;
  readonly model?: string | null;
  readonly modelProvider?: string | null;
  readonly personality?: V2ThreadResumeParams__Personality | null;
  readonly sandbox?: V2ThreadResumeParams__SandboxMode | null;
  readonly serviceTier?: string | null;
  readonly threadId: string;
};
export const V2ThreadResumeParams = Schema.Struct({
  approvalPolicy: Schema.optionalKey(
    Schema.Union([V2ThreadResumeParams__AskForApproval, Schema.Null]),
  ),
  approvalsReviewer: Schema.optionalKey(
    Schema.Union([V2ThreadResumeParams__ApprovalsReviewer, Schema.Null]).annotate({
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
    Schema.Union([V2ThreadResumeParams__Personality, Schema.Null]).annotate({
      description:
        "@deprecated `friendly` and `pragmatic` no longer select a style. Changing this does not rewrite the thread's existing instructions.",
    }),
  ),
  sandbox: Schema.optionalKey(Schema.Union([V2ThreadResumeParams__SandboxMode, Schema.Null])),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
}).annotate({
  title: "ThreadResumeParams",
  description:
    "There are three ways to resume a thread: 1. By thread_id: load the thread from disk by thread_id and resume it. 2. By history: instantiate the thread from memory and resume it. 3. By path: load the thread from disk by path and resume it.\n\nFor non-running threads, the precedence is: history > non-empty path > thread_id. If using history or a non-empty path for a non-running thread, the thread_id param will be ignored.\n\nIf thread_id identifies a running thread, app-server rejoins that thread and treats a non-empty path as a consistency check against the active rollout path. Empty string path values are treated as absent.\n\nPrefer using thread_id whenever possible.",
});

export type V2ThreadResumeParams__AbsolutePathBuf = string;
export const V2ThreadResumeParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
});

export type V2ThreadResumeParams__ResponseItem =
  | {
      readonly content: ReadonlyArray<V2ThreadResumeParams__ContentItem>;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly phase?: V2ThreadResumeParams__MessagePhase | null;
      readonly role: string;
      readonly type: "message";
    }
  | {
      readonly author: string;
      readonly content: ReadonlyArray<V2ThreadResumeParams__AgentMessageInputContent>;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly recipient: string;
      readonly type: "agent_message";
    }
  | {
      readonly content?: ReadonlyArray<V2ThreadResumeParams__ReasoningItemContent> | null;
      readonly encrypted_content?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly summary: ReadonlyArray<V2ThreadResumeParams__ReasoningItemReasoningSummary>;
      readonly type: "reasoning";
    }
  | {
      readonly action: V2ThreadResumeParams__LocalShellAction;
      readonly call_id?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly status: V2ThreadResumeParams__LocalShellStatus;
      readonly type: "local_shell_call";
    }
  | {
      readonly arguments: string;
      readonly call_id: string;
      readonly encrypted_function_args?: ReadonlyArray<string> | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly name: string;
      readonly namespace?: string | null;
      readonly type: "function_call";
    }
  | {
      readonly arguments: Schema.Json;
      readonly call_id?: string | null;
      readonly execution: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly status?: string | null;
      readonly type: "tool_search_call";
    }
  | {
      readonly call_id?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly name?: string | null;
      readonly namespace?: string | null;
      readonly output: V2ThreadResumeParams__FunctionCallOutputBody;
      readonly type: "function_call_output";
    }
  | {
      readonly call_id: string;
      readonly id?: string | null;
      readonly input: string;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly name: string;
      readonly namespace?: string | null;
      readonly status?: string | null;
      readonly type: "custom_tool_call";
    }
  | {
      readonly call_id: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly name?: string | null;
      readonly output: V2ThreadResumeParams__FunctionCallOutputBody;
      readonly type: "custom_tool_call_output";
    }
  | {
      readonly call_id?: string | null;
      readonly execution: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly status: string;
      readonly tools: ReadonlyArray<Schema.Json>;
      readonly type: "tool_search_output";
    }
  | {
      readonly action?: V2ThreadResumeParams__ResponsesApiWebSearchAction | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly status?: string | null;
      readonly type: "web_search_call";
    }
  | {
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly result: string;
      readonly revised_prompt?: string | null;
      readonly status: string;
      readonly type: "image_generation_call";
    }
  | {
      readonly encrypted_content: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly type: "compaction";
    }
  | {
      readonly reasoning: V2ThreadResumeParams__ConfigurationReasoning;
      readonly type: "configuration_update";
    }
  | { readonly type: "compaction_trigger" }
  | {
      readonly encrypted_content?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2ThreadResumeParams__InternalChatMessageMetadataPassthrough | null;
      readonly type: "context_compaction";
    }
  | { readonly type: "other" };
export const V2ThreadResumeParams__ResponseItem = Schema.Union(
  [
    Schema.Struct({
      content: Schema.Array(V2ThreadResumeParams__ContentItem),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2ThreadResumeParams__MessagePhase, Schema.Null])),
      role: Schema.String,
      type: Schema.Literal("message").annotate({ title: "MessageResponseItemType" }),
    }).annotate({ title: "MessageResponseItem" }),
    Schema.Struct({
      author: Schema.String,
      content: Schema.Array(V2ThreadResumeParams__AgentMessageInputContent),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      recipient: Schema.String,
      type: Schema.Literal("agent_message").annotate({ title: "AgentMessageResponseItemType" }),
    }).annotate({ title: "AgentMessageResponseItem" }),
    Schema.Struct({
      content: Schema.optionalKey(
        Schema.Union([Schema.Array(V2ThreadResumeParams__ReasoningItemContent), Schema.Null]),
      ),
      encrypted_content: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      summary: Schema.Array(V2ThreadResumeParams__ReasoningItemReasoningSummary),
      type: Schema.Literal("reasoning").annotate({ title: "ReasoningResponseItemType" }),
    }).annotate({ title: "ReasoningResponseItem" }),
    Schema.Struct({
      action: V2ThreadResumeParams__LocalShellAction,
      call_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Set when using the Responses API." }),
          Schema.Null,
        ]),
      ),
      id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Legacy id field retained for compatibility with older payloads.",
          }),
          Schema.Null,
        ]),
      ),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      status: V2ThreadResumeParams__LocalShellStatus,
      type: Schema.Literal("local_shell_call").annotate({
        title: "LocalShellCallResponseItemType",
      }),
    }).annotate({ title: "LocalShellCallResponseItem" }),
    Schema.Struct({
      arguments: Schema.String,
      call_id: Schema.String,
      encrypted_function_args: Schema.optionalKey(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("function_call").annotate({ title: "FunctionCallResponseItemType" }),
    }).annotate({ title: "FunctionCallResponseItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      call_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      execution: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      status: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("tool_search_call").annotate({
        title: "ToolSearchCallResponseItemType",
      }),
    }).annotate({ title: "ToolSearchCallResponseItem" }),
    Schema.Struct({
      call_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadResumeParams__FunctionCallOutputBody,
      type: Schema.Literal("function_call_output").annotate({
        title: "FunctionCallOutputResponseItemType",
      }),
    }).annotate({ title: "FunctionCallOutputResponseItem" }),
    Schema.Struct({
      call_id: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      input: Schema.String,
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      status: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("custom_tool_call").annotate({
        title: "CustomToolCallResponseItemType",
      }),
    }).annotate({ title: "CustomToolCallResponseItem" }),
    Schema.Struct({
      call_id: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadResumeParams__FunctionCallOutputBody,
      type: Schema.Literal("custom_tool_call_output").annotate({
        title: "CustomToolCallOutputResponseItemType",
      }),
    }).annotate({ title: "CustomToolCallOutputResponseItem" }),
    Schema.Struct({
      call_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      execution: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      status: Schema.String,
      tools: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
      type: Schema.Literal("tool_search_output").annotate({
        title: "ToolSearchOutputResponseItemType",
      }),
    }).annotate({ title: "ToolSearchOutputResponseItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__ResponsesApiWebSearchAction, Schema.Null]),
      ),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      status: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("web_search_call").annotate({ title: "WebSearchCallResponseItemType" }),
    }).annotate({ title: "WebSearchCallResponseItem" }),
    Schema.Struct({
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      result: Schema.String,
      revised_prompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      status: Schema.String,
      type: Schema.Literal("image_generation_call").annotate({
        title: "ImageGenerationCallResponseItemType",
      }),
    }).annotate({ title: "ImageGenerationCallResponseItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      type: Schema.Literal("compaction").annotate({ title: "CompactionResponseItemType" }),
    }).annotate({ title: "CompactionResponseItem" }),
    Schema.Struct({
      reasoning: V2ThreadResumeParams__ConfigurationReasoning,
      type: Schema.Literal("configuration_update").annotate({
        title: "ConfigurationUpdateResponseItemType",
      }),
    }).annotate({
      title: "ConfigurationUpdateResponseItem",
      description: "A durable input control interpreted by the backend at its position in history.",
    }),
    Schema.Struct({
      type: Schema.Literal("compaction_trigger").annotate({
        title: "CompactionTriggerResponseItemType",
      }),
    }).annotate({ title: "CompactionTriggerResponseItem" }),
    Schema.Struct({
      encrypted_content: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([V2ThreadResumeParams__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      type: Schema.Literal("context_compaction").annotate({
        title: "ContextCompactionResponseItemType",
      }),
    }).annotate({ title: "ContextCompactionResponseItem" }),
    Schema.Struct({
      type: Schema.Literal("other").annotate({ title: "OtherResponseItemType" }),
    }).annotate({ title: "OtherResponseItem" }),
  ],
  { mode: "oneOf" },
);

export type V2ThreadResumeParams__ThreadResumeInitialTurnsPageParams = {
  readonly itemsView?: V2ThreadResumeParams__TurnItemsView | null;
  readonly limit?: number | null;
  readonly sortDirection?: V2ThreadResumeParams__SortDirection | null;
};
export const V2ThreadResumeParams__ThreadResumeInitialTurnsPageParams = Schema.Struct({
  itemsView: Schema.optionalKey(
    Schema.Union([V2ThreadResumeParams__TurnItemsView, Schema.Null]).annotate({
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
    Schema.Union([V2ThreadResumeParams__SortDirection, Schema.Null]).annotate({
      description: "Optional turn pagination direction; defaults to descending.",
    }),
  ),
});

export type V2ThreadResumeResponse = {
  readonly approvalPolicy: V2ThreadResumeResponse__AskForApproval;
  readonly approvalsReviewer: V2ThreadResumeResponse__ApprovalsReviewer;
  readonly collaborationMode?: V2ThreadResumeResponse__CollaborationMode | null;
  readonly cwd: V2ThreadResumeResponse__AbsolutePathBuf;
  readonly disabledPluginIds?: ReadonlyArray<string>;
  readonly instructionSources?: ReadonlyArray<V2ThreadResumeResponse__LegacyAppPathString>;
  readonly itemsBackwardsCursor?: string | null;
  readonly model: string;
  readonly modelProvider: string;
  readonly reasoningEffort?: V2ThreadResumeResponse__ReasoningEffort | null;
  readonly sandbox: V2ThreadResumeResponse__SandboxPolicy;
  readonly serviceTier?: string | null;
  readonly thread: V2ThreadResumeResponse__Thread;
  readonly turnsBackwardsCursor?: string | null;
};
export const V2ThreadResumeResponse = Schema.Struct({
  approvalPolicy: V2ThreadResumeResponse__AskForApproval,
  approvalsReviewer: Schema.suspend(
    (): Schema.Codec<V2ThreadResumeResponse__ApprovalsReviewer> =>
      V2ThreadResumeResponse__ApprovalsReviewer,
  ).annotate({ description: "Reviewer currently used for approval requests on this thread." }),
  collaborationMode: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__CollaborationMode, Schema.Null]).annotate({
      description: "Effective collaboration mode. Absent when resuming from an older server.",
    }),
  ),
  cwd: V2ThreadResumeResponse__AbsolutePathBuf,
  disabledPluginIds: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "Saved list of disabled plugin IDs. Does not yet filter plugin capabilities.",
      default: [],
    }),
  ),
  instructionSources: Schema.optionalKey(
    Schema.Array(V2ThreadResumeResponse__LegacyAppPathString).annotate({
      description:
        "Environment-native paths to instruction source files currently loaded for this thread.",
      default: [],
    }),
  ),
  itemsBackwardsCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          'Opaque cursor for hydrating paginated items backwards.\n\nPass this as `cursor` to `thread/items/list` with `sortDirection: "desc"`. The first page includes the item identified by the cursor.',
      }),
      Schema.Null,
    ]),
  ),
  model: Schema.String,
  modelProvider: Schema.String,
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__ReasoningEffort, Schema.Null]),
  ),
  sandbox: Schema.suspend(
    (): Schema.Codec<V2ThreadResumeResponse__SandboxPolicy> =>
      V2ThreadResumeResponse__SandboxPolicy,
  ).annotate({
    description:
      "Legacy sandbox policy retained for compatibility. Experimental clients should prefer `activePermissionProfile` for profile provenance.",
  }),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  thread: V2ThreadResumeResponse__Thread,
  turnsBackwardsCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          'Opaque cursor for hydrating paginated turns backwards.\n\nPass this as `cursor` to `thread/turns/list` with `sortDirection: "desc"`. The first page includes the turn identified by the cursor.',
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadResumeResponse" });

export type V2ThreadResumeResponse__ActivePermissionProfile = {
  readonly extends?: string | null;
  readonly id: string;
};
export const V2ThreadResumeResponse__ActivePermissionProfile = Schema.Struct({
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
});

export type V2ThreadResumeResponse__MultiAgentMode =
  | "explicitRequestOnly"
  | "proactive"
  | { readonly custom: string };
export const V2ThreadResumeResponse__MultiAgentMode = Schema.Union(
  [
    Schema.Literals(["explicitRequestOnly", "proactive"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomMultiAgentMode" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Controls the effective multi-agent delegation instructions for a turn. `custom` means the configured mode hint defines the policy instead of a built-in policy.",
});

export type V2ThreadResumeResponse__ThreadEnvironment = {
  readonly cwd: V2ThreadResumeResponse__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadResumeResponse__LegacyAppPathString>;
};
export const V2ThreadResumeResponse__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadResumeResponse__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadResumeResponse__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadResumeResponse__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadResumeResponse__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadResumeResponse__TurnsPage = {
  readonly backwardsCursor?: string | null;
  readonly data: ReadonlyArray<V2ThreadResumeResponse__Turn>;
  readonly nextCursor?: string | null;
};
export const V2ThreadResumeResponse__TurnsPage = Schema.Struct({
  backwardsCursor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  data: Schema.Array(V2ThreadResumeResponse__Turn),
  nextCursor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
});

export type V2ThreadRevertedNotification = { readonly threadId: string };
export const V2ThreadRevertedNotification = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadRevertedNotification",
});

export type V2ThreadRevertParams = { readonly beforeTurnId: string; readonly threadId: string };
export const V2ThreadRevertParams = Schema.Struct({
  beforeTurnId: Schema.String.annotate({
    description: "Turn excluded from the replacement history, together with every later turn.",
  }),
  threadId: Schema.String,
}).annotate({
  title: "ThreadRevertParams",
  description:
    "Replace a paginated thread's durable history with the prefix before one turn.\n\nThis only changes persisted conversation history. It does not revert local file changes.",
});

export type V2ThreadRevertResponse = {
  readonly itemsBackwardsCursor?: string | null;
  readonly thread: V2ThreadRevertResponse__Thread;
  readonly turnsBackwardsCursor?: string | null;
};
export const V2ThreadRevertResponse = Schema.Struct({
  itemsBackwardsCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          'Opaque cursor for hydrating paginated items backwards.\n\nPass this as `cursor` to `thread/items/list` with `sortDirection: "desc"`. The first page includes the item identified by the cursor.',
      }),
      Schema.Null,
    ]),
  ),
  thread: Schema.suspend(
    (): Schema.Codec<V2ThreadRevertResponse__Thread> => V2ThreadRevertResponse__Thread,
  ).annotate({
    description:
      "Updated loaded thread metadata. `turns` is always empty; hydrate retained history through `thread/turns/list`.",
  }),
  turnsBackwardsCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          'Opaque cursor for hydrating paginated turns backwards.\n\nPass this as `cursor` to `thread/turns/list` with `sortDirection: "desc"`. The first page includes the turn identified by the cursor.',
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadRevertResponse" });

export type V2ThreadRevertResponse__ThreadEnvironment = {
  readonly cwd: V2ThreadRevertResponse__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadRevertResponse__LegacyAppPathString>;
};
export const V2ThreadRevertResponse__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadRevertResponse__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadRevertResponse__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadRevertResponse__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadRevertResponse__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadSectionCreateParams = {
  readonly appearance?: V2ThreadSectionCreateParams__ThreadSectionAppearance | null;
  readonly name: string;
};
export const V2ThreadSectionCreateParams = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadSectionCreateParams__ThreadSectionAppearance, Schema.Null]),
  ),
  name: Schema.String.annotate({ description: "The user-visible name of the section." }),
}).annotate({
  title: "ThreadSectionCreateParams",
  description: "Parameters for creating an independently persisted thread section.",
});

export type V2ThreadSectionCreateResponse = {
  readonly section: V2ThreadSectionCreateResponse__ThreadSection;
};
export const V2ThreadSectionCreateResponse = Schema.Struct({
  section: V2ThreadSectionCreateResponse__ThreadSection,
}).annotate({
  title: "ThreadSectionCreateResponse",
  description: "The independently persisted section created by the server.",
});

export type V2ThreadSectionDeleteParams = { readonly sectionId: string };
export const V2ThreadSectionDeleteParams = Schema.Struct({
  sectionId: Schema.String.annotate({
    description: "The stable, server-generated identity of the section to delete.",
  }),
}).annotate({
  title: "ThreadSectionDeleteParams",
  description: "Parameters for deleting an independently persisted thread section.",
});

export type V2ThreadSectionDeleteResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadSectionDeleteResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "ThreadSectionDeleteResponse",
  description: "Successful deletion does not return additional section data.",
});

export type V2ThreadSectionListParams = {
  readonly cursor?: string | null;
  readonly limit?: number | null;
};
export const V2ThreadSectionListParams = Schema.Struct({
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
        description: "Maximum number of sections to return.",
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
}).annotate({
  title: "ThreadSectionListParams",
  description: "Parameters for listing independently persisted thread sections.",
});

export type V2ThreadSectionListResponse = {
  readonly data: ReadonlyArray<V2ThreadSectionListResponse__ThreadSection>;
  readonly nextCursor?: string | null;
};
export const V2ThreadSectionListResponse = Schema.Struct({
  data: Schema.Array(V2ThreadSectionListResponse__ThreadSection),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque cursor for the next page, or `null` when no sections remain.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  title: "ThreadSectionListResponse",
  description: "One page of independently persisted thread sections.",
});

export type V2ThreadSectionMoveParams = {
  readonly beforeThreadId?: string | null;
  readonly sectionId: string | null;
  readonly threadId: string;
};
export const V2ThreadSectionMoveParams = Schema.Struct({
  beforeThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Existing thread to insert before; omission or null appends to the section.",
      }),
      Schema.Null,
    ]),
  ),
  sectionId: Schema.Union([
    Schema.String.annotate({
      description: "Destination section, or `null` to remove the thread from its section.",
    }),
    Schema.Null,
  ]),
  threadId: Schema.String.annotate({
    description: "Thread to move into, within, or out of a section.",
  }),
}).annotate({
  title: "ThreadSectionMoveParams",
  description: "Parameters for moving a thread within a server-owned section ordering.",
});

export type V2ThreadSectionMoveResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadSectionMoveResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadSectionMoveResponse" });

export type V2ThreadSectionUpdateParams = {
  readonly appearance?: V2ThreadSectionUpdateParams__ThreadSectionAppearance | null;
  readonly name: string;
  readonly sectionId: string;
};
export const V2ThreadSectionUpdateParams = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadSectionUpdateParams__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Omit to preserve appearance, use `null` to clear it, or provide a replacement.",
    }),
  ),
  name: Schema.String.annotate({ description: "The updated user-visible name of the section." }),
  sectionId: Schema.String.annotate({
    description: "The stable, server-generated identity of the section to update.",
  }),
}).annotate({
  title: "ThreadSectionUpdateParams",
  description: "Parameters for updating an independently persisted thread section.",
});

export type V2ThreadSectionUpdateResponse = {
  readonly section: V2ThreadSectionUpdateResponse__ThreadSection;
};
export const V2ThreadSectionUpdateResponse = Schema.Struct({
  section: V2ThreadSectionUpdateResponse__ThreadSection,
}).annotate({
  title: "ThreadSectionUpdateResponse",
  description: "The independently persisted section after its name is updated.",
});

export type V2ThreadSetNameParams = { readonly name: string; readonly threadId: string };
export const V2ThreadSetNameParams = Schema.Struct({
  name: Schema.String,
  threadId: Schema.String,
}).annotate({ title: "ThreadSetNameParams" });

export type V2ThreadSetNameResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadSetNameResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadSetNameResponse" });

export type V2ThreadSettingsUpdatedNotification = {
  readonly threadId: string;
  readonly threadSettings: V2ThreadSettingsUpdatedNotification__ThreadSettings;
};
export const V2ThreadSettingsUpdatedNotification = Schema.Struct({
  threadId: Schema.String,
  threadSettings: V2ThreadSettingsUpdatedNotification__ThreadSettings,
}).annotate({ title: "ThreadSettingsUpdatedNotification" });

export type V2ThreadSettingsUpdatedNotification__MultiAgentMode =
  | "explicitRequestOnly"
  | "proactive"
  | { readonly custom: string };
export const V2ThreadSettingsUpdatedNotification__MultiAgentMode = Schema.Union(
  [
    Schema.Literals(["explicitRequestOnly", "proactive"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomMultiAgentMode" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Controls the effective multi-agent delegation instructions for a turn. `custom` means the configured mode hint defines the policy instead of a built-in policy.",
});

export type V2ThreadShellCommandParams = {
  readonly command: string;
  readonly threadId: string;
  readonly timeoutMs?: number | null;
};
export const V2ThreadShellCommandParams = Schema.Struct({
  command: Schema.String.annotate({
    description:
      "Shell command string evaluated by the thread's configured shell. Unlike `command/exec`, this intentionally preserves shell syntax such as pipes, redirects, and quoting. This runs unsandboxed with full access rather than inheriting the thread sandbox policy.",
  }),
  threadId: Schema.String,
  timeoutMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Maximum execution time in milliseconds. Defaults to one hour when omitted or null. Must be non-negative; zero requests an immediate timeout, not unlimited execution. Does not affect the immediate RPC acknowledgement.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadShellCommandParams" });

export type V2ThreadShellCommandResponse = { readonly [x: string]: Schema.Json };
export const V2ThreadShellCommandResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadShellCommandResponse" });

export type V2ThreadStartedNotification = { readonly thread: V2ThreadStartedNotification__Thread };
export const V2ThreadStartedNotification = Schema.Struct({
  thread: V2ThreadStartedNotification__Thread,
}).annotate({ title: "ThreadStartedNotification" });

export type V2ThreadStartedNotification__ThreadEnvironment = {
  readonly cwd: V2ThreadStartedNotification__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadStartedNotification__LegacyAppPathString>;
};
export const V2ThreadStartedNotification__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadStartedNotification__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadStartedNotification__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadStartedNotification__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadStartedNotification__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadStartParams = {
  readonly approvalPolicy?: V2ThreadStartParams__AskForApproval | null;
  readonly approvalsReviewer?: V2ThreadStartParams__ApprovalsReviewer | null;
  readonly baseInstructions?: string | null;
  readonly config?: { readonly [x: string]: Schema.Json } | null;
  readonly cwd?: string | null;
  readonly developerInstructions?: string | null;
  readonly ephemeral?: boolean | null;
  readonly model?: string | null;
  readonly modelProvider?: string | null;
  readonly personality?: V2ThreadStartParams__Personality | null;
  readonly sandbox?: V2ThreadStartParams__SandboxMode | null;
  readonly serviceName?: string | null;
  readonly serviceTier?: string | null;
  readonly sessionStartSource?: V2ThreadStartParams__ThreadStartSource | null;
  readonly threadSource?: V2ThreadStartParams__ThreadSource | null;
};
export const V2ThreadStartParams = Schema.Struct({
  approvalPolicy: Schema.optionalKey(
    Schema.Union([V2ThreadStartParams__AskForApproval, Schema.Null]),
  ),
  approvalsReviewer: Schema.optionalKey(
    Schema.Union([V2ThreadStartParams__ApprovalsReviewer, Schema.Null]).annotate({
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
    Schema.Union([V2ThreadStartParams__Personality, Schema.Null]).annotate({
      description: "@deprecated `friendly` and `pragmatic` no longer select a style.",
    }),
  ),
  sandbox: Schema.optionalKey(Schema.Union([V2ThreadStartParams__SandboxMode, Schema.Null])),
  serviceName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sessionStartSource: Schema.optionalKey(
    Schema.Union([V2ThreadStartParams__ThreadStartSource, Schema.Null]),
  ),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadStartParams__ThreadSource, Schema.Null]).annotate({
      description: "Optional client-supplied analytics source classification for this thread.",
    }),
  ),
}).annotate({ title: "ThreadStartParams" });

export type V2ThreadStartParams__AbsolutePathBuf = string;
export const V2ThreadStartParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
});

export type V2ThreadStartParams__DynamicToolSpec =
  | {
      readonly deferLoading?: boolean;
      readonly description: string;
      readonly inputSchema: Schema.Json;
      readonly name: string;
      readonly type: "function";
    }
  | {
      readonly description: string;
      readonly name: string;
      readonly tools: ReadonlyArray<V2ThreadStartParams__DynamicToolNamespaceTool>;
      readonly type: "namespace";
    };
export const V2ThreadStartParams__DynamicToolSpec = Schema.Union(
  [
    Schema.Struct({
      deferLoading: Schema.optionalKey(Schema.Boolean),
      description: Schema.String,
      inputSchema: Schema.Json.annotate({ expected: "JSON value" }),
      name: Schema.String,
      type: Schema.Literal("function").annotate({ title: "FunctionDynamicToolSpecType" }),
    }).annotate({ title: "FunctionDynamicToolSpec" }),
    Schema.Struct({
      description: Schema.String,
      name: Schema.String,
      tools: Schema.Array(V2ThreadStartParams__DynamicToolNamespaceTool),
      type: Schema.Literal("namespace").annotate({ title: "NamespaceDynamicToolSpecType" }),
    }).annotate({ title: "NamespaceDynamicToolSpec" }),
  ],
  { mode: "oneOf" },
);

export type V2ThreadStartParams__MultiAgentMode =
  | "explicitRequestOnly"
  | "proactive"
  | { readonly custom: string };
export const V2ThreadStartParams__MultiAgentMode = Schema.Union(
  [
    Schema.Literals(["explicitRequestOnly", "proactive"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomMultiAgentMode" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Controls the effective multi-agent delegation instructions for a turn. `custom` means the configured mode hint defines the policy instead of a built-in policy.",
});

export type V2ThreadStartParams__SelectedCapabilityRoot = {
  readonly id: string;
  readonly location: V2ThreadStartParams__CapabilityRootLocation;
};
export const V2ThreadStartParams__SelectedCapabilityRoot = Schema.Struct({
  id: Schema.String.annotate({
    description: "Stable identifier supplied by the capability selection platform.",
  }),
  location: Schema.suspend(
    (): Schema.Codec<V2ThreadStartParams__CapabilityRootLocation> =>
      V2ThreadStartParams__CapabilityRootLocation,
  ).annotate({ description: "Where the selected root can be resolved." }),
}).annotate({
  description: "A user-selected root that can expose one or more runtime capabilities.",
});

export type V2ThreadStartParams__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadStartParams__ThreadHistoryMode = Schema.Literals(["legacy", "paginated"]);

export type V2ThreadStartParams__TurnEnvironmentParams = {
  readonly cwd: V2ThreadStartParams__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots?: ReadonlyArray<V2ThreadStartParams__LegacyAppPathString> | null;
};
export const V2ThreadStartParams__TurnEnvironmentParams = Schema.Struct({
  cwd: V2ThreadStartParams__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2ThreadStartParams__LegacyAppPathString).annotate({
        description: "Environment-native runtime workspace roots. Omitted defaults to `cwd`.",
      }),
      Schema.Null,
    ]),
  ),
});

export type V2ThreadStartResponse = {
  readonly approvalPolicy: V2ThreadStartResponse__AskForApproval;
  readonly approvalsReviewer: V2ThreadStartResponse__ApprovalsReviewer;
  readonly cwd: V2ThreadStartResponse__AbsolutePathBuf;
  readonly disabledPluginIds?: ReadonlyArray<string>;
  readonly instructionSources?: ReadonlyArray<V2ThreadStartResponse__LegacyAppPathString>;
  readonly model: string;
  readonly modelProvider: string;
  readonly reasoningEffort?: V2ThreadStartResponse__ReasoningEffort | null;
  readonly sandbox: V2ThreadStartResponse__SandboxPolicy;
  readonly serviceTier?: string | null;
  readonly thread: V2ThreadStartResponse__Thread;
};
export const V2ThreadStartResponse = Schema.Struct({
  approvalPolicy: V2ThreadStartResponse__AskForApproval,
  approvalsReviewer: Schema.suspend(
    (): Schema.Codec<V2ThreadStartResponse__ApprovalsReviewer> =>
      V2ThreadStartResponse__ApprovalsReviewer,
  ).annotate({ description: "Reviewer currently used for approval requests on this thread." }),
  cwd: V2ThreadStartResponse__AbsolutePathBuf,
  disabledPluginIds: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "Saved list of disabled plugin IDs. Does not yet filter plugin capabilities.",
      default: [],
    }),
  ),
  instructionSources: Schema.optionalKey(
    Schema.Array(V2ThreadStartResponse__LegacyAppPathString).annotate({
      description:
        "Environment-native paths to instruction source files currently loaded for this thread.",
      default: [],
    }),
  ),
  model: Schema.String,
  modelProvider: Schema.String,
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__ReasoningEffort, Schema.Null]),
  ),
  sandbox: Schema.suspend(
    (): Schema.Codec<V2ThreadStartResponse__SandboxPolicy> => V2ThreadStartResponse__SandboxPolicy,
  ).annotate({
    description:
      "Legacy sandbox policy retained for compatibility. Experimental clients should prefer `activePermissionProfile` for profile provenance.",
  }),
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  thread: V2ThreadStartResponse__Thread,
}).annotate({ title: "ThreadStartResponse" });

export type V2ThreadStartResponse__ActivePermissionProfile = {
  readonly extends?: string | null;
  readonly id: string;
};
export const V2ThreadStartResponse__ActivePermissionProfile = Schema.Struct({
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
});

export type V2ThreadStartResponse__MultiAgentMode =
  | "explicitRequestOnly"
  | "proactive"
  | { readonly custom: string };
export const V2ThreadStartResponse__MultiAgentMode = Schema.Union(
  [
    Schema.Literals(["explicitRequestOnly", "proactive"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomMultiAgentMode" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Controls the effective multi-agent delegation instructions for a turn. `custom` means the configured mode hint defines the policy instead of a built-in policy.",
});

export type V2ThreadStartResponse__ThreadEnvironment = {
  readonly cwd: V2ThreadStartResponse__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadStartResponse__LegacyAppPathString>;
};
export const V2ThreadStartResponse__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadStartResponse__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadStartResponse__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadStartResponse__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadStartResponse__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadStatusChangedNotification = {
  readonly status: V2ThreadStatusChangedNotification__ThreadStatus;
  readonly threadId: string;
};
export const V2ThreadStatusChangedNotification = Schema.Struct({
  status: V2ThreadStatusChangedNotification__ThreadStatus,
  threadId: Schema.String,
}).annotate({ title: "ThreadStatusChangedNotification" });

export type V2ThreadTokenUsageUpdatedNotification = {
  readonly threadId: string;
  readonly tokenUsage: V2ThreadTokenUsageUpdatedNotification__ThreadTokenUsage;
  readonly turnId: string;
};
export const V2ThreadTokenUsageUpdatedNotification = Schema.Struct({
  threadId: Schema.String,
  tokenUsage: V2ThreadTokenUsageUpdatedNotification__ThreadTokenUsage,
  turnId: Schema.String,
}).annotate({ title: "ThreadTokenUsageUpdatedNotification" });

export type V2ThreadTurnsListParams = {
  readonly cursor?: string | null;
  readonly itemsView?: V2ThreadTurnsListParams__TurnItemsView | null;
  readonly limit?: number | null;
  readonly sortDirection?: V2ThreadTurnsListParams__SortDirection | null;
  readonly threadId: string;
};
export const V2ThreadTurnsListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque cursor to pass to the next call to continue after the last turn.",
      }),
      Schema.Null,
    ]),
  ),
  itemsView: Schema.optionalKey(
    Schema.Union([V2ThreadTurnsListParams__TurnItemsView, Schema.Null]).annotate({
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
    Schema.Union([V2ThreadTurnsListParams__SortDirection, Schema.Null]).annotate({
      description: "Optional turn pagination direction; defaults to descending.",
    }),
  ),
  threadId: Schema.String,
}).annotate({ title: "ThreadTurnsListParams" });

export type V2ThreadTurnsListResponse = {
  readonly backwardsCursor?: string | null;
  readonly data: ReadonlyArray<V2ThreadTurnsListResponse__Turn>;
  readonly nextCursor?: string | null;
};
export const V2ThreadTurnsListResponse = Schema.Struct({
  backwardsCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass as `cursor` when reversing `sortDirection`. This is only populated when the page contains at least one turn. Use it with the opposite `sortDirection` to include the anchor turn again and catch updates to that turn.",
      }),
      Schema.Null,
    ]),
  ),
  data: Schema.Array(V2ThreadTurnsListResponse__Turn),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last turn. if None, there are no more turns to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ThreadTurnsListResponse" });

export type V2ThreadUnarchivedNotification = { readonly threadId: string };
export const V2ThreadUnarchivedNotification = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadUnarchivedNotification",
});

export type V2ThreadUnarchiveParams = { readonly threadId: string };
export const V2ThreadUnarchiveParams = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadUnarchiveParams",
});

export type V2ThreadUnarchiveResponse = { readonly thread: V2ThreadUnarchiveResponse__Thread };
export const V2ThreadUnarchiveResponse = Schema.Struct({
  thread: V2ThreadUnarchiveResponse__Thread,
}).annotate({ title: "ThreadUnarchiveResponse" });

export type V2ThreadUnarchiveResponse__ThreadEnvironment = {
  readonly cwd: V2ThreadUnarchiveResponse__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<V2ThreadUnarchiveResponse__LegacyAppPathString>;
};
export const V2ThreadUnarchiveResponse__ThreadEnvironment = Schema.Struct({
  cwd: V2ThreadUnarchiveResponse__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(V2ThreadUnarchiveResponse__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type V2ThreadUnarchiveResponse__ThreadExtra = { readonly [x: string]: Schema.Json };
export const V2ThreadUnarchiveResponse__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type V2ThreadUnsubscribeParams = { readonly threadId: string };
export const V2ThreadUnsubscribeParams = Schema.Struct({ threadId: Schema.String }).annotate({
  title: "ThreadUnsubscribeParams",
});

export type V2ThreadUnsubscribeResponse = {
  readonly status: V2ThreadUnsubscribeResponse__ThreadUnsubscribeStatus;
};
export const V2ThreadUnsubscribeResponse = Schema.Struct({
  status: V2ThreadUnsubscribeResponse__ThreadUnsubscribeStatus,
}).annotate({ title: "ThreadUnsubscribeResponse" });

export type V2TurnCompletedNotification = {
  readonly threadId: string;
  readonly turn: V2TurnCompletedNotification__Turn;
};
export const V2TurnCompletedNotification = Schema.Struct({
  threadId: Schema.String,
  turn: V2TurnCompletedNotification__Turn,
}).annotate({ title: "TurnCompletedNotification" });

export type V2TurnDiffUpdatedNotification = {
  readonly diff: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2TurnDiffUpdatedNotification = Schema.Struct({
  diff: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  title: "TurnDiffUpdatedNotification",
  description:
    "Notification that the turn-level unified diff has changed. Contains the latest aggregated diff across all file changes in the turn.",
});

export type V2TurnInterruptParams = { readonly threadId: string; readonly turnId: string };
export const V2TurnInterruptParams = Schema.Struct({
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "TurnInterruptParams" });

export type V2TurnInterruptResponse = { readonly [x: string]: Schema.Json };
export const V2TurnInterruptResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "TurnInterruptResponse" });

export type V2TurnModerationMetadataNotification = {
  readonly metadata: Schema.Json;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2TurnModerationMetadataNotification = Schema.Struct({
  metadata: Schema.Json.annotate({ expected: "JSON value" }),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "TurnModerationMetadataNotification" });

export type V2TurnPlanUpdatedNotification = {
  readonly explanation?: string | null;
  readonly plan: ReadonlyArray<V2TurnPlanUpdatedNotification__TurnPlanStep>;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2TurnPlanUpdatedNotification = Schema.Struct({
  explanation: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  plan: Schema.Array(V2TurnPlanUpdatedNotification__TurnPlanStep),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "TurnPlanUpdatedNotification" });

export type V2TurnStartedNotification = {
  readonly threadId: string;
  readonly turn: V2TurnStartedNotification__Turn;
};
export const V2TurnStartedNotification = Schema.Struct({
  threadId: Schema.String,
  turn: V2TurnStartedNotification__Turn,
}).annotate({ title: "TurnStartedNotification" });
