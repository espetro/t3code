import * as Schema from "effect/Schema";

export type V2PluginReadResponse__ScheduledTaskWeekday =
  | "MO"
  | "TU"
  | "WE"
  | "TH"
  | "FR"
  | "SA"
  | "SU";
export const V2PluginReadResponse__ScheduledTaskWeekday = Schema.Literals([
  "MO",
  "TU",
  "WE",
  "TH",
  "FR",
  "SA",
  "SU",
]).annotate({ identifier: "V2PluginReadResponse__ScheduledTaskWeekday" });

export type V2PluginReadResponse__PluginAuthPolicy = "ON_INSTALL" | "ON_USE";
export const V2PluginReadResponse__PluginAuthPolicy = Schema.Literals([
  "ON_INSTALL",
  "ON_USE",
]).annotate({ identifier: "V2PluginReadResponse__PluginAuthPolicy" });

export type V2PluginReadResponse__PluginAvailability = "DISABLED_BY_ADMIN" | "AVAILABLE";
export const V2PluginReadResponse__PluginAvailability = Schema.Union(
  [
    Schema.Literal("DISABLED_BY_ADMIN"),
    Schema.Literal("AVAILABLE").annotate({
      description:
        'Plugin-service currently sends `"ENABLED"` for available remote plugins. Codex app-server exposes `"AVAILABLE"` in its API; the alias keeps decoding compatible with that upstream response.',
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginReadResponse__PluginAvailability" });

export type V2PluginReadResponse__PluginDisabledReason =
  | "disabled_by_admin"
  | "plan_not_eligible"
  | "required_app_unavailable"
  | "unknown";
export const V2PluginReadResponse__PluginDisabledReason = Schema.Literals([
  "disabled_by_admin",
  "plan_not_eligible",
  "required_app_unavailable",
  "unknown",
]).annotate({ identifier: "V2PluginReadResponse__PluginDisabledReason" });

export type V2PluginReadResponse__PluginInstallPolicy =
  | "NOT_AVAILABLE"
  | "AVAILABLE"
  | "INSTALLED_BY_DEFAULT";
export const V2PluginReadResponse__PluginInstallPolicy = Schema.Literals([
  "NOT_AVAILABLE",
  "AVAILABLE",
  "INSTALLED_BY_DEFAULT",
]).annotate({ identifier: "V2PluginReadResponse__PluginInstallPolicy" });

export type V2PluginReadResponse__PluginInstallPolicySource =
  | "WORKSPACE_SETTING"
  | "IMPLICIT_CANONICAL_APP";
export const V2PluginReadResponse__PluginInstallPolicySource = Schema.Literals([
  "WORKSPACE_SETTING",
  "IMPLICIT_CANONICAL_APP",
]).annotate({ identifier: "V2PluginReadResponse__PluginInstallPolicySource" });

export type V2PluginReadResponse__PluginShareDiscoverability = "LISTED" | "UNLISTED" | "PRIVATE";
export const V2PluginReadResponse__PluginShareDiscoverability = Schema.Literals([
  "LISTED",
  "UNLISTED",
  "PRIVATE",
]).annotate({ identifier: "V2PluginReadResponse__PluginShareDiscoverability" });

export type V2PluginReadResponse__PluginSharePrincipalType = "user" | "group" | "workspace";
export const V2PluginReadResponse__PluginSharePrincipalType = Schema.Literals([
  "user",
  "group",
  "workspace",
]).annotate({ identifier: "V2PluginReadResponse__PluginSharePrincipalType" });

export type V2PluginReadResponse__PluginSharePrincipalRole = "reader" | "editor" | "owner";
export const V2PluginReadResponse__PluginSharePrincipalRole = Schema.Literals([
  "reader",
  "editor",
  "owner",
]).annotate({ identifier: "V2PluginReadResponse__PluginSharePrincipalRole" });

export type V2PluginReconcileResponse__PluginReconcileChangedPlugin = {
  readonly hasApps: boolean;
  readonly hasHooks: boolean;
  readonly hasMcps: boolean;
  readonly hasSkills: boolean;
  readonly id: string;
};
export const V2PluginReconcileResponse__PluginReconcileChangedPlugin = Schema.Struct({
  hasApps: Schema.Boolean,
  hasHooks: Schema.Boolean,
  hasMcps: Schema.Boolean,
  hasSkills: Schema.Boolean.annotate({
    description:
      "Whether either bundle declares skill roots; not a validated inventory of enabled skills.",
  }),
  id: Schema.String.annotate({
    description: "Local plugin ID (`name@marketplace`), matching `PluginSummary.id`.",
  }),
}).annotate({
  description:
    "Runtime categories affected by this change, not just capabilities currently present. Flags describe declarations before runtime policy filtering. Updates OR the old and new bundle flags; enablement changes and cached reinstalls use the cached bundle; removals retain the old bundle's flags.",
  identifier: "V2PluginReconcileResponse__PluginReconcileChangedPlugin",
});

export type V2PluginShareCheckoutResponse__AbsolutePathBuf = string;
export const V2PluginShareCheckoutResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginShareCheckoutResponse__AbsolutePathBuf",
});

export type V2PluginShareListResponse__AbsolutePathBuf = string;
export const V2PluginShareListResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginShareListResponse__AbsolutePathBuf",
});

export type V2PluginShareListResponse__PluginAuthPolicy = "ON_INSTALL" | "ON_USE";
export const V2PluginShareListResponse__PluginAuthPolicy = Schema.Literals([
  "ON_INSTALL",
  "ON_USE",
]).annotate({ identifier: "V2PluginShareListResponse__PluginAuthPolicy" });

export type V2PluginShareListResponse__PluginAvailability = "DISABLED_BY_ADMIN" | "AVAILABLE";
export const V2PluginShareListResponse__PluginAvailability = Schema.Union(
  [
    Schema.Literal("DISABLED_BY_ADMIN"),
    Schema.Literal("AVAILABLE").annotate({
      description:
        'Plugin-service currently sends `"ENABLED"` for available remote plugins. Codex app-server exposes `"AVAILABLE"` in its API; the alias keeps decoding compatible with that upstream response.',
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginShareListResponse__PluginAvailability" });

export type V2PluginShareListResponse__PluginDisabledReason =
  | "disabled_by_admin"
  | "plan_not_eligible"
  | "required_app_unavailable"
  | "unknown";
export const V2PluginShareListResponse__PluginDisabledReason = Schema.Literals([
  "disabled_by_admin",
  "plan_not_eligible",
  "required_app_unavailable",
  "unknown",
]).annotate({ identifier: "V2PluginShareListResponse__PluginDisabledReason" });

export type V2PluginShareListResponse__PluginInstallPolicy =
  | "NOT_AVAILABLE"
  | "AVAILABLE"
  | "INSTALLED_BY_DEFAULT";
export const V2PluginShareListResponse__PluginInstallPolicy = Schema.Literals([
  "NOT_AVAILABLE",
  "AVAILABLE",
  "INSTALLED_BY_DEFAULT",
]).annotate({ identifier: "V2PluginShareListResponse__PluginInstallPolicy" });

export type V2PluginShareListResponse__PluginInstallPolicySource =
  | "WORKSPACE_SETTING"
  | "IMPLICIT_CANONICAL_APP";
export const V2PluginShareListResponse__PluginInstallPolicySource = Schema.Literals([
  "WORKSPACE_SETTING",
  "IMPLICIT_CANONICAL_APP",
]).annotate({ identifier: "V2PluginShareListResponse__PluginInstallPolicySource" });

export type V2PluginShareListResponse__PluginShareDiscoverability =
  | "LISTED"
  | "UNLISTED"
  | "PRIVATE";
export const V2PluginShareListResponse__PluginShareDiscoverability = Schema.Literals([
  "LISTED",
  "UNLISTED",
  "PRIVATE",
]).annotate({ identifier: "V2PluginShareListResponse__PluginShareDiscoverability" });

export type V2PluginShareListResponse__PluginSharePrincipalType = "user" | "group" | "workspace";
export const V2PluginShareListResponse__PluginSharePrincipalType = Schema.Literals([
  "user",
  "group",
  "workspace",
]).annotate({ identifier: "V2PluginShareListResponse__PluginSharePrincipalType" });

export type V2PluginShareListResponse__PluginSharePrincipalRole = "reader" | "editor" | "owner";
export const V2PluginShareListResponse__PluginSharePrincipalRole = Schema.Literals([
  "reader",
  "editor",
  "owner",
]).annotate({ identifier: "V2PluginShareListResponse__PluginSharePrincipalRole" });

export type V2PluginShareSaveParams__PluginShareDiscoverability = "LISTED" | "UNLISTED" | "PRIVATE";
export const V2PluginShareSaveParams__PluginShareDiscoverability = Schema.Literals([
  "LISTED",
  "UNLISTED",
  "PRIVATE",
]).annotate({ identifier: "V2PluginShareSaveParams__PluginShareDiscoverability" });

export type V2PluginShareSaveParams__AbsolutePathBuf = string;
export const V2PluginShareSaveParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2PluginShareSaveParams__AbsolutePathBuf",
});

export type V2PluginShareSaveParams__PluginSharePrincipalType = "user" | "group" | "workspace";
export const V2PluginShareSaveParams__PluginSharePrincipalType = Schema.Literals([
  "user",
  "group",
  "workspace",
]).annotate({ identifier: "V2PluginShareSaveParams__PluginSharePrincipalType" });

export type V2PluginShareSaveParams__PluginShareTargetRole = "reader" | "editor";
export const V2PluginShareSaveParams__PluginShareTargetRole = Schema.Literals([
  "reader",
  "editor",
]).annotate({ identifier: "V2PluginShareSaveParams__PluginShareTargetRole" });

export type V2PluginShareUpdateTargetsParams__PluginShareUpdateDiscoverability =
  | "UNLISTED"
  | "PRIVATE"
  | "LISTED";
export const V2PluginShareUpdateTargetsParams__PluginShareUpdateDiscoverability = Schema.Literals([
  "UNLISTED",
  "PRIVATE",
  "LISTED",
]).annotate({ identifier: "V2PluginShareUpdateTargetsParams__PluginShareUpdateDiscoverability" });

export type V2PluginShareUpdateTargetsParams__PluginSharePrincipalType =
  | "user"
  | "group"
  | "workspace";
export const V2PluginShareUpdateTargetsParams__PluginSharePrincipalType = Schema.Literals([
  "user",
  "group",
  "workspace",
]).annotate({ identifier: "V2PluginShareUpdateTargetsParams__PluginSharePrincipalType" });

export type V2PluginShareUpdateTargetsParams__PluginShareTargetRole = "reader" | "editor";
export const V2PluginShareUpdateTargetsParams__PluginShareTargetRole = Schema.Literals([
  "reader",
  "editor",
]).annotate({ identifier: "V2PluginShareUpdateTargetsParams__PluginShareTargetRole" });

export type V2PluginShareUpdateTargetsResponse__PluginShareDiscoverability =
  | "LISTED"
  | "UNLISTED"
  | "PRIVATE";
export const V2PluginShareUpdateTargetsResponse__PluginShareDiscoverability = Schema.Literals([
  "LISTED",
  "UNLISTED",
  "PRIVATE",
]).annotate({ identifier: "V2PluginShareUpdateTargetsResponse__PluginShareDiscoverability" });

export type V2PluginShareUpdateTargetsResponse__PluginSharePrincipalType =
  | "user"
  | "group"
  | "workspace";
export const V2PluginShareUpdateTargetsResponse__PluginSharePrincipalType = Schema.Literals([
  "user",
  "group",
  "workspace",
]).annotate({ identifier: "V2PluginShareUpdateTargetsResponse__PluginSharePrincipalType" });

export type V2PluginShareUpdateTargetsResponse__PluginSharePrincipalRole =
  | "reader"
  | "editor"
  | "owner";
export const V2PluginShareUpdateTargetsResponse__PluginSharePrincipalRole = Schema.Literals([
  "reader",
  "editor",
  "owner",
]).annotate({ identifier: "V2PluginShareUpdateTargetsResponse__PluginSharePrincipalRole" });

export type V2ProcessOutputDeltaNotification__ProcessOutputStream = "stdout" | "stderr";
export const V2ProcessOutputDeltaNotification__ProcessOutputStream = Schema.Union(
  [
    Schema.Literal("stdout").annotate({
      description: "stdout stream. PTY mode multiplexes terminal output here.",
    }),
    Schema.Literal("stderr").annotate({ description: "stderr stream." }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "Stream label for `process/outputDelta` notifications.",
  identifier: "V2ProcessOutputDeltaNotification__ProcessOutputStream",
});

export type V2ProjectChangedNotification__ProjectChangeType = "created" | "updated" | "deleted";
export const V2ProjectChangedNotification__ProjectChangeType = Schema.Literals([
  "created",
  "updated",
  "deleted",
]).annotate({ identifier: "V2ProjectChangedNotification__ProjectChangeType" });

export type V2RawResponseCompletedNotification__TokenUsageBreakdown = {
  readonly cacheWriteInputTokens?: number;
  readonly cachedInputTokens: number;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly reasoningOutputTokens: number;
  readonly totalTokens: number;
};
export const V2RawResponseCompletedNotification__TokenUsageBreakdown = Schema.Struct({
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
}).annotate({ identifier: "V2RawResponseCompletedNotification__TokenUsageBreakdown" });

export type V2RawResponseCompletedNotification__ResponseUsageMetadata = {
  readonly amount?: string | null;
  readonly metadata?: Schema.Json;
};
export const V2RawResponseCompletedNotification__ResponseUsageMetadata = Schema.Struct({
  amount: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  metadata: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({
  description: "Usage metadata reported for one upstream response.",
  identifier: "V2RawResponseCompletedNotification__ResponseUsageMetadata",
});

export type V2RawResponseItemCompletedNotification__ImageDetail =
  | "auto"
  | "low"
  | "high"
  | "original";
export const V2RawResponseItemCompletedNotification__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2RawResponseItemCompletedNotification__ImageDetail" });

export type V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough = {
  readonly turn_id?: string | null;
};
export const V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough =
  Schema.Struct({
    turn_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  }).annotate({
    description:
      "Internal Responses API passthrough metadata copied into underlying chat messages.\n\nResponses API strongly types this payload. Do not modify it without first getting API approval and making the corresponding Responses API change.",
    identifier: "V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough",
  });

export type V2RawResponseItemCompletedNotification__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2RawResponseItemCompletedNotification__MessagePhase = Schema.Union(
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
  identifier: "V2RawResponseItemCompletedNotification__MessagePhase",
});

export type V2RawResponseItemCompletedNotification__AgentMessageInputContent =
  | { readonly text: string; readonly type: "input_text" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2RawResponseItemCompletedNotification__AgentMessageInputContent = Schema.Union(
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
).annotate({ identifier: "V2RawResponseItemCompletedNotification__AgentMessageInputContent" });

export type V2RawResponseItemCompletedNotification__ReasoningItemContent =
  | { readonly text: string; readonly type: "reasoning_text" }
  | { readonly text: string; readonly type: "text" };
export const V2RawResponseItemCompletedNotification__ReasoningItemContent = Schema.Union(
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
).annotate({ identifier: "V2RawResponseItemCompletedNotification__ReasoningItemContent" });

export type V2RawResponseItemCompletedNotification__ReasoningItemReasoningSummary = {
  readonly text: string;
  readonly type: "summary_text";
};
export const V2RawResponseItemCompletedNotification__ReasoningItemReasoningSummary = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("summary_text").annotate({
        title: "SummaryTextReasoningItemReasoningSummaryType",
      }),
    }).annotate({ title: "SummaryTextReasoningItemReasoningSummary" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2RawResponseItemCompletedNotification__ReasoningItemReasoningSummary" });

export type V2RawResponseItemCompletedNotification__LocalShellAction = {
  readonly command: ReadonlyArray<string>;
  readonly env?: { readonly [x: string]: string } | null;
  readonly timeout_ms?: number | null;
  readonly type: "exec";
  readonly user?: string | null;
  readonly working_directory?: string | null;
};
export const V2RawResponseItemCompletedNotification__LocalShellAction = Schema.Union(
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
).annotate({ identifier: "V2RawResponseItemCompletedNotification__LocalShellAction" });

export type V2RawResponseItemCompletedNotification__LocalShellStatus =
  | "completed"
  | "in_progress"
  | "incomplete";
export const V2RawResponseItemCompletedNotification__LocalShellStatus = Schema.Literals([
  "completed",
  "in_progress",
  "incomplete",
]).annotate({ identifier: "V2RawResponseItemCompletedNotification__LocalShellStatus" });

export type V2RawResponseItemCompletedNotification__ResponsesApiWebSearchAction =
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
export const V2RawResponseItemCompletedNotification__ResponsesApiWebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2RawResponseItemCompletedNotification__ResponsesApiWebSearchAction" });

export type V2RawResponseItemCompletedNotification__ReasoningEffort = string;
export const V2RawResponseItemCompletedNotification__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2RawResponseItemCompletedNotification__ReasoningEffort",
  }),
);

export type V2RemoteControlStatusChangedNotification__RemoteControlConnectionStatus =
  | "disabled"
  | "connecting"
  | "connected"
  | "errored";
export const V2RemoteControlStatusChangedNotification__RemoteControlConnectionStatus =
  Schema.Literals(["disabled", "connecting", "connected", "errored"]).annotate({
    identifier: "V2RemoteControlStatusChangedNotification__RemoteControlConnectionStatus",
  });

export type V2ReviewStartParams__ReviewDelivery = "inline" | "detached";
export const V2ReviewStartParams__ReviewDelivery = Schema.Literals(["inline", "detached"]).annotate(
  { identifier: "V2ReviewStartParams__ReviewDelivery" },
);

export type V2ReviewStartParams__ReviewTarget =
  | { readonly type: "uncommittedChanges" }
  | { readonly branch: string; readonly type: "baseBranch" }
  | { readonly sha: string; readonly title?: string | null; readonly type: "commit" }
  | { readonly instructions: string; readonly type: "custom" };
export const V2ReviewStartParams__ReviewTarget = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("uncommittedChanges").annotate({
        title: "UncommittedChangesReviewTargetType",
      }),
    }).annotate({
      title: "UncommittedChangesReviewTarget",
      description: "Review the working tree: staged, unstaged, and untracked files.",
    }),
    Schema.Struct({
      branch: Schema.String,
      type: Schema.Literal("baseBranch").annotate({ title: "BaseBranchReviewTargetType" }),
    }).annotate({
      title: "BaseBranchReviewTarget",
      description: "Review changes between the current branch and the given base branch.",
    }),
    Schema.Struct({
      sha: Schema.String,
      title: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Optional human-readable label (e.g., commit subject) for UIs.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("commit").annotate({ title: "CommitReviewTargetType" }),
    }).annotate({
      title: "CommitReviewTarget",
      description: "Review the changes introduced by a specific commit.",
    }),
    Schema.Struct({
      instructions: Schema.String,
      type: Schema.Literal("custom").annotate({ title: "CustomReviewTargetType" }),
    }).annotate({
      title: "CustomReviewTarget",
      description: "Arbitrary instructions, equivalent to the old free-form prompt.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ReviewStartParams__ReviewTarget" });

export type V2ReviewStartResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ReviewStartResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ReviewStartResponse__NonSteerableTurnKind" });

export type V2ReviewStartResponse__MisalignmentSteer = { readonly message: string };
export const V2ReviewStartResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ReviewStartResponse__MisalignmentSteer" });

export type V2ReviewStartResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ReviewStartResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ReviewStartResponse__ByteRange" });

export type V2ReviewStartResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ReviewStartResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ReviewStartResponse__ImageDetail" });

export type V2ReviewStartResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ReviewStartResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ReviewStartResponse__HookPromptFragment" });

export type V2ReviewStartResponse__AgentMessageDelivery = "async";
export const V2ReviewStartResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ReviewStartResponse__AgentMessageDelivery",
});

export type V2ReviewStartResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ReviewStartResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ReviewStartResponse__MemoryCitationEntry" });

export type V2ReviewStartResponse__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2ReviewStartResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ReviewStartResponse__MessagePhase",
});

export type V2ReviewStartResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ReviewStartResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ReviewStartResponse__AsyncUserInputQuestion" });

export type V2ReviewStartResponse__LegacyAppPathString = string;
export const V2ReviewStartResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ReviewStartResponse__LegacyAppPathString",
});

export type V2ReviewStartResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ReviewStartResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ReviewStartResponse__CommandExecutionSource" });

export type V2ReviewStartResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ReviewStartResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ReviewStartResponse__CommandExecutionStatus" });

export type V2ReviewStartResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ReviewStartResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ReviewStartResponse__PatchChangeKind" });

export type V2ReviewStartResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ReviewStartResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ReviewStartResponse__PatchApplyStatus" });

export type V2ReviewStartResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ReviewStartResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ReviewStartResponse__McpToolCallAppContext" });

export type V2ReviewStartResponse__McpToolCallError = { readonly message: string };
export const V2ReviewStartResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ReviewStartResponse__McpToolCallError" });

export type V2ReviewStartResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ReviewStartResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ReviewStartResponse__McpAppDisplayMode" });

export type V2ReviewStartResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ReviewStartResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ReviewStartResponse__McpToolCallResult" });

export type V2ReviewStartResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ReviewStartResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ReviewStartResponse__McpToolCallStatus" });

export type V2ReviewStartResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ReviewStartResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ReviewStartResponse__DynamicToolCallOutputContentItem" });

export type V2ReviewStartResponse__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ReviewStartResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ReviewStartResponse__DynamicToolCallStatus" });

export type V2ReviewStartResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ReviewStartResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ReviewStartResponse__CollabAgentStatus" });

export type V2ReviewStartResponse__ReasoningEffort = string;
export const V2ReviewStartResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ReviewStartResponse__ReasoningEffort",
  }),
);

export type V2ReviewStartResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ReviewStartResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ReviewStartResponse__CollabAgentToolCallStatus" });

export type V2ReviewStartResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ReviewStartResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ReviewStartResponse__CollabAgentTool" });

export type V2ReviewStartResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ReviewStartResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ReviewStartResponse__SubAgentActivityKind" });

export type V2ReviewStartResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ReviewStartResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ReviewStartResponse__WebSearchAction" });

export type V2ReviewStartResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ReviewStartResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ReviewStartResponse__ImageGenerationFailure" });

export type V2ReviewStartResponse__AbsolutePathBuf = string;
export const V2ReviewStartResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ReviewStartResponse__AbsolutePathBuf",
});

export type V2ReviewStartResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ReviewStartResponse__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2ReviewStartResponse__TurnItemsView" });

export type V2ReviewStartResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ReviewStartResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ReviewStartResponse__TurnStatus" });

export type V2SendAddCreditsNudgeEmailParams__AddCreditsNudgeCreditType = "credits" | "usage_limit";
export const V2SendAddCreditsNudgeEmailParams__AddCreditsNudgeCreditType = Schema.Literals([
  "credits",
  "usage_limit",
]).annotate({ identifier: "V2SendAddCreditsNudgeEmailParams__AddCreditsNudgeCreditType" });

export type V2SendAddCreditsNudgeEmailResponse__AddCreditsNudgeEmailStatus =
  | "sent"
  | "cooldown_active";
export const V2SendAddCreditsNudgeEmailResponse__AddCreditsNudgeEmailStatus = Schema.Literals([
  "sent",
  "cooldown_active",
]).annotate({ identifier: "V2SendAddCreditsNudgeEmailResponse__AddCreditsNudgeEmailStatus" });

export type V2ServerRequestResolvedNotification__RequestId = string | number;
export const V2ServerRequestResolvedNotification__RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ identifier: "V2ServerRequestResolvedNotification__RequestId" });

export type V2SkillsConfigWriteParams__AbsolutePathBuf = string;
export const V2SkillsConfigWriteParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2SkillsConfigWriteParams__AbsolutePathBuf",
});

export type V2SkillsExtraRootsSetParams__AbsolutePathBuf = string;
export const V2SkillsExtraRootsSetParams__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2SkillsExtraRootsSetParams__AbsolutePathBuf",
});

export type V2SkillsListResponse__SkillErrorInfo = {
  readonly message: string;
  readonly path: string;
};
export const V2SkillsListResponse__SkillErrorInfo = Schema.Struct({
  message: Schema.String,
  path: Schema.String,
}).annotate({ identifier: "V2SkillsListResponse__SkillErrorInfo" });

export type V2SkillsListResponse__SkillToolDependency = {
  readonly command?: string | null;
  readonly description?: string | null;
  readonly transport?: string | null;
  readonly type: string;
  readonly url?: string | null;
  readonly value: string;
};
export const V2SkillsListResponse__SkillToolDependency = Schema.Struct({
  command: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  transport: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  type: Schema.String,
  url: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  value: Schema.String,
}).annotate({ identifier: "V2SkillsListResponse__SkillToolDependency" });

export type V2SkillsListResponse__AbsolutePathBuf = string;
export const V2SkillsListResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2SkillsListResponse__AbsolutePathBuf",
});

export type V2SkillsListResponse__SkillScope = "user" | "repo" | "system" | "admin";
export const V2SkillsListResponse__SkillScope = Schema.Literals([
  "user",
  "repo",
  "system",
  "admin",
]).annotate({ identifier: "V2SkillsListResponse__SkillScope" });

export type V2ThreadAttachmentAddResponse__ThreadAttachment = {
  readonly attachmentType: string;
  readonly createdAt: number;
  readonly id: string;
  readonly identityKey: string;
  readonly payload: Schema.Json;
};
export const V2ThreadAttachmentAddResponse__ThreadAttachment = Schema.Struct({
  attachmentType: Schema.String,
  createdAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  id: Schema.String,
  identityKey: Schema.String,
  payload: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({
  description: "An independently persisted attachment associated with a thread.",
  identifier: "V2ThreadAttachmentAddResponse__ThreadAttachment",
});

export type V2ThreadAttachmentAddResponse__ThreadAttachmentAddOutcome = "created" | "existing";
export const V2ThreadAttachmentAddResponse__ThreadAttachmentAddOutcome = Schema.Literals([
  "created",
  "existing",
]).annotate({
  description: "Result of attempting to associate an attachment with a thread.",
  identifier: "V2ThreadAttachmentAddResponse__ThreadAttachmentAddOutcome",
});

export type V2ThreadAttachmentListResponse__ThreadAttachment = {
  readonly attachmentType: string;
  readonly createdAt: number;
  readonly id: string;
  readonly identityKey: string;
  readonly payload: Schema.Json;
};
export const V2ThreadAttachmentListResponse__ThreadAttachment = Schema.Struct({
  attachmentType: Schema.String,
  createdAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  id: Schema.String,
  identityKey: Schema.String,
  payload: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({
  description: "An independently persisted attachment associated with a thread.",
  identifier: "V2ThreadAttachmentListResponse__ThreadAttachment",
});

export type V2ThreadAttachmentUpdatedNotification__ThreadAttachmentOperation =
  | "created"
  | "deleted";
export const V2ThreadAttachmentUpdatedNotification__ThreadAttachmentOperation = Schema.Literals([
  "created",
  "deleted",
]).annotate({
  description: "The persisted attachment change represented by a notification.",
  identifier: "V2ThreadAttachmentUpdatedNotification__ThreadAttachmentOperation",
});

export type V2ThreadForkParams__AskForApproval =
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
export const V2ThreadForkParams__AskForApproval = Schema.Union(
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
).annotate({ identifier: "V2ThreadForkParams__AskForApproval" });

export type V2ThreadForkParams__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const V2ThreadForkParams__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2ThreadForkParams__ApprovalsReviewer",
});

export type V2ThreadForkParams__SandboxMode =
  | "read-only"
  | "workspace-write"
  | "danger-full-access";
export const V2ThreadForkParams__SandboxMode = Schema.Literals([
  "read-only",
  "workspace-write",
  "danger-full-access",
]).annotate({ identifier: "V2ThreadForkParams__SandboxMode" });

export type V2ThreadForkParams__ThreadSource = string;
export const V2ThreadForkParams__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadForkParams__ThreadSource",
});

export type V2ThreadForkResponse__AskForApproval =
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
export const V2ThreadForkResponse__AskForApproval = Schema.Union(
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
).annotate({ identifier: "V2ThreadForkResponse__AskForApproval" });

export type V2ThreadForkResponse__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const V2ThreadForkResponse__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "V2ThreadForkResponse__ApprovalsReviewer",
});

export type V2ThreadForkResponse__AbsolutePathBuf = string;
export const V2ThreadForkResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadForkResponse__AbsolutePathBuf",
});

export type V2ThreadForkResponse__LegacyAppPathString = string;
export const V2ThreadForkResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadForkResponse__LegacyAppPathString",
});

export type V2ThreadForkResponse__ReasoningEffort = string;
export const V2ThreadForkResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadForkResponse__ReasoningEffort",
  }),
);

export type V2ThreadForkResponse__NetworkAccess = "restricted" | "enabled";
export const V2ThreadForkResponse__NetworkAccess = Schema.Literals([
  "restricted",
  "enabled",
]).annotate({ identifier: "V2ThreadForkResponse__NetworkAccess" });

export type V2ThreadForkResponse__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadForkResponse__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadForkResponse__GitInfo" });

export type V2ThreadForkResponse__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadForkResponse__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadForkResponse__ThreadHistoryMode" });

export type V2ThreadForkResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadForkResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadForkResponse__ThreadSectionAppearance",
});

export type V2ThreadForkResponse__AgentPath = string;
export const V2ThreadForkResponse__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadForkResponse__AgentPath",
});

export type V2ThreadForkResponse__ThreadId = string;
export const V2ThreadForkResponse__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadForkResponse__ThreadId",
});

export type V2ThreadForkResponse__ThreadActiveFlag = "waitingOnApproval" | "waitingOnUserInput";
export const V2ThreadForkResponse__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadForkResponse__ThreadActiveFlag" });

export type V2ThreadForkResponse__ThreadSource = string;
export const V2ThreadForkResponse__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadForkResponse__ThreadSource",
});

export type V2ThreadForkResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadForkResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadForkResponse__NonSteerableTurnKind" });

export type V2ThreadForkResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadForkResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadForkResponse__MisalignmentSteer" });

export type V2ThreadForkResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadForkResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadForkResponse__ByteRange" });

export type V2ThreadForkResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadForkResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadForkResponse__ImageDetail" });

export type V2ThreadForkResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadForkResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadForkResponse__HookPromptFragment" });

export type V2ThreadForkResponse__AgentMessageDelivery = "async";
export const V2ThreadForkResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadForkResponse__AgentMessageDelivery",
});

export type V2ThreadForkResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadForkResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadForkResponse__MemoryCitationEntry" });

export type V2ThreadForkResponse__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2ThreadForkResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadForkResponse__MessagePhase",
});

export type V2ThreadForkResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadForkResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadForkResponse__AsyncUserInputQuestion" });

export type V2ThreadForkResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadForkResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadForkResponse__CommandExecutionSource" });

export type V2ThreadForkResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadForkResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadForkResponse__CommandExecutionStatus" });

export type V2ThreadForkResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadForkResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadForkResponse__PatchChangeKind" });

export type V2ThreadForkResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadForkResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadForkResponse__PatchApplyStatus" });

export type V2ThreadForkResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadForkResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadForkResponse__McpToolCallAppContext" });

export type V2ThreadForkResponse__McpToolCallError = { readonly message: string };
export const V2ThreadForkResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadForkResponse__McpToolCallError" });

export type V2ThreadForkResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadForkResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadForkResponse__McpAppDisplayMode" });

export type V2ThreadForkResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadForkResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadForkResponse__McpToolCallResult" });

export type V2ThreadForkResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadForkResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadForkResponse__McpToolCallStatus" });

export type V2ThreadForkResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadForkResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadForkResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadForkResponse__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadForkResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadForkResponse__DynamicToolCallStatus" });

export type V2ThreadForkResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadForkResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadForkResponse__CollabAgentStatus" });

export type V2ThreadForkResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadForkResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadForkResponse__CollabAgentToolCallStatus" });

export type V2ThreadForkResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadForkResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadForkResponse__CollabAgentTool" });

export type V2ThreadForkResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadForkResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadForkResponse__SubAgentActivityKind" });

export type V2ThreadForkResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadForkResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadForkResponse__WebSearchAction" });

export type V2ThreadForkResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadForkResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadForkResponse__ImageGenerationFailure" });

export type V2ThreadForkResponse__TurnItemsView = "notLoaded" | "summary" | "full";
export const V2ThreadForkResponse__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "V2ThreadForkResponse__TurnItemsView" });

export type V2ThreadForkResponse__TurnStatus =
  | "completed"
  | "interrupted"
  | "failed"
  | "inProgress";
export const V2ThreadForkResponse__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "V2ThreadForkResponse__TurnStatus" });

export type V2ThreadGoalGetResponse__ThreadGoalStatus =
  | "active"
  | "paused"
  | "blocked"
  | "usageLimited"
  | "budgetLimited"
  | "complete";
export const V2ThreadGoalGetResponse__ThreadGoalStatus = Schema.Literals([
  "active",
  "paused",
  "blocked",
  "usageLimited",
  "budgetLimited",
  "complete",
]).annotate({ identifier: "V2ThreadGoalGetResponse__ThreadGoalStatus" });

export type V2ThreadGoalSetParams__ThreadGoalStatus =
  | "active"
  | "paused"
  | "blocked"
  | "usageLimited"
  | "budgetLimited"
  | "complete";
export const V2ThreadGoalSetParams__ThreadGoalStatus = Schema.Literals([
  "active",
  "paused",
  "blocked",
  "usageLimited",
  "budgetLimited",
  "complete",
]).annotate({ identifier: "V2ThreadGoalSetParams__ThreadGoalStatus" });

export type V2ThreadGoalSetResponse__ThreadGoalStatus =
  | "active"
  | "paused"
  | "blocked"
  | "usageLimited"
  | "budgetLimited"
  | "complete";
export const V2ThreadGoalSetResponse__ThreadGoalStatus = Schema.Literals([
  "active",
  "paused",
  "blocked",
  "usageLimited",
  "budgetLimited",
  "complete",
]).annotate({ identifier: "V2ThreadGoalSetResponse__ThreadGoalStatus" });

export type V2ThreadGoalUpdatedNotification__ThreadGoalStatus =
  | "active"
  | "paused"
  | "blocked"
  | "usageLimited"
  | "budgetLimited"
  | "complete";
export const V2ThreadGoalUpdatedNotification__ThreadGoalStatus = Schema.Literals([
  "active",
  "paused",
  "blocked",
  "usageLimited",
  "budgetLimited",
  "complete",
]).annotate({ identifier: "V2ThreadGoalUpdatedNotification__ThreadGoalStatus" });

export type V2ThreadItemsListParams__ThreadItemsListAnchor = {
  readonly itemId: string;
  readonly type: "item";
};
export const V2ThreadItemsListParams__ThreadItemsListAnchor = Schema.Union(
  [
    Schema.Struct({
      itemId: Schema.String,
      type: Schema.Literal("item").annotate({ title: "ItemThreadItemsListAnchorType" }),
    }).annotate({ title: "ItemThreadItemsListAnchor" }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "An exclusive item position within the requested visible turn.",
  identifier: "V2ThreadItemsListParams__ThreadItemsListAnchor",
});

export type V2ThreadItemsListParams__SortDirection = "asc" | "desc";
export const V2ThreadItemsListParams__SortDirection = Schema.Literals(["asc", "desc"]).annotate({
  identifier: "V2ThreadItemsListParams__SortDirection",
});

export type V2ThreadItemsListResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadItemsListResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadItemsListResponse__ByteRange" });

export type V2ThreadItemsListResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadItemsListResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadItemsListResponse__ImageDetail" });

export type V2ThreadItemsListResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadItemsListResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadItemsListResponse__HookPromptFragment" });

export type V2ThreadItemsListResponse__AgentMessageDelivery = "async";
export const V2ThreadItemsListResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadItemsListResponse__AgentMessageDelivery",
});

export type V2ThreadItemsListResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadItemsListResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadItemsListResponse__MemoryCitationEntry" });

export type V2ThreadItemsListResponse__MessagePhase =
  | "commentary"
  | "partial_answer"
  | "final_answer";
export const V2ThreadItemsListResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadItemsListResponse__MessagePhase",
});

export type V2ThreadItemsListResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadItemsListResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadItemsListResponse__AsyncUserInputQuestion" });

export type V2ThreadItemsListResponse__LegacyAppPathString = string;
export const V2ThreadItemsListResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadItemsListResponse__LegacyAppPathString",
});

export type V2ThreadItemsListResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadItemsListResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadItemsListResponse__CommandExecutionSource" });

export type V2ThreadItemsListResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadItemsListResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadItemsListResponse__CommandExecutionStatus" });

export type V2ThreadItemsListResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadItemsListResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadItemsListResponse__PatchChangeKind" });

export type V2ThreadItemsListResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadItemsListResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadItemsListResponse__PatchApplyStatus" });

export type V2ThreadItemsListResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadItemsListResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadItemsListResponse__McpToolCallAppContext" });

export type V2ThreadItemsListResponse__McpToolCallError = { readonly message: string };
export const V2ThreadItemsListResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadItemsListResponse__McpToolCallError" });

export type V2ThreadItemsListResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadItemsListResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadItemsListResponse__McpAppDisplayMode" });

export type V2ThreadItemsListResponse__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const V2ThreadItemsListResponse__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "V2ThreadItemsListResponse__McpToolCallResult" });

export type V2ThreadItemsListResponse__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const V2ThreadItemsListResponse__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadItemsListResponse__McpToolCallStatus" });

export type V2ThreadItemsListResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const V2ThreadItemsListResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "V2ThreadItemsListResponse__DynamicToolCallOutputContentItem" });

export type V2ThreadItemsListResponse__DynamicToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed";
export const V2ThreadItemsListResponse__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "V2ThreadItemsListResponse__DynamicToolCallStatus" });

export type V2ThreadItemsListResponse__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const V2ThreadItemsListResponse__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "V2ThreadItemsListResponse__CollabAgentStatus" });

export type V2ThreadItemsListResponse__ReasoningEffort = string;
export const V2ThreadItemsListResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadItemsListResponse__ReasoningEffort",
  }),
);

export type V2ThreadItemsListResponse__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const V2ThreadItemsListResponse__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "V2ThreadItemsListResponse__CollabAgentToolCallStatus" });

export type V2ThreadItemsListResponse__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const V2ThreadItemsListResponse__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "V2ThreadItemsListResponse__CollabAgentTool" });

export type V2ThreadItemsListResponse__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const V2ThreadItemsListResponse__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "V2ThreadItemsListResponse__SubAgentActivityKind" });

export type V2ThreadItemsListResponse__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const V2ThreadItemsListResponse__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "V2ThreadItemsListResponse__WebSearchAction" });

export type V2ThreadItemsListResponse__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const V2ThreadItemsListResponse__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "V2ThreadItemsListResponse__ImageGenerationFailure" });

export type V2ThreadItemsListResponse__AbsolutePathBuf = string;
export const V2ThreadItemsListResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadItemsListResponse__AbsolutePathBuf",
});

export type V2ThreadListParams__ThreadListCwdFilter = string | ReadonlyArray<string>;
export const V2ThreadListParams__ThreadListCwdFilter = Schema.Union([
  Schema.String,
  Schema.Array(Schema.String),
]).annotate({ identifier: "V2ThreadListParams__ThreadListCwdFilter" });

export type V2ThreadListParams__SortDirection = "asc" | "desc";
export const V2ThreadListParams__SortDirection = Schema.Literals(["asc", "desc"]).annotate({
  identifier: "V2ThreadListParams__SortDirection",
});

export type V2ThreadListParams__ThreadSortKey =
  | "created_at"
  | "updated_at"
  | "recency_at"
  | "section_position";
export const V2ThreadListParams__ThreadSortKey = Schema.Literals([
  "created_at",
  "updated_at",
  "recency_at",
  "section_position",
]).annotate({ identifier: "V2ThreadListParams__ThreadSortKey" });

export type V2ThreadListParams__ThreadSourceKind =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "subAgent"
  | "subAgentReview"
  | "subAgentCompact"
  | "subAgentThreadSpawn"
  | "subAgentOther"
  | "unknown";
export const V2ThreadListParams__ThreadSourceKind = Schema.Literals([
  "cli",
  "vscode",
  "exec",
  "appServer",
  "subAgent",
  "subAgentReview",
  "subAgentCompact",
  "subAgentThreadSpawn",
  "subAgentOther",
  "unknown",
]).annotate({ identifier: "V2ThreadListParams__ThreadSourceKind" });

export type V2ThreadListResponse__AbsolutePathBuf = string;
export const V2ThreadListResponse__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "V2ThreadListResponse__AbsolutePathBuf",
});

export type V2ThreadListResponse__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const V2ThreadListResponse__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadListResponse__GitInfo" });

export type V2ThreadListResponse__ThreadHistoryMode = "legacy" | "paginated";
export const V2ThreadListResponse__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "V2ThreadListResponse__ThreadHistoryMode" });

export type V2ThreadListResponse__ReasoningEffort = string;
export const V2ThreadListResponse__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "V2ThreadListResponse__ReasoningEffort",
  }),
);

export type V2ThreadListResponse__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const V2ThreadListResponse__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "V2ThreadListResponse__ThreadSectionAppearance",
});

export type V2ThreadListResponse__AgentPath = string;
export const V2ThreadListResponse__AgentPath = Schema.String.annotate({
  identifier: "V2ThreadListResponse__AgentPath",
});

export type V2ThreadListResponse__ThreadId = string;
export const V2ThreadListResponse__ThreadId = Schema.String.annotate({
  identifier: "V2ThreadListResponse__ThreadId",
});

export type V2ThreadListResponse__ThreadActiveFlag = "waitingOnApproval" | "waitingOnUserInput";
export const V2ThreadListResponse__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "V2ThreadListResponse__ThreadActiveFlag" });

export type V2ThreadListResponse__ThreadSource = string;
export const V2ThreadListResponse__ThreadSource = Schema.String.annotate({
  identifier: "V2ThreadListResponse__ThreadSource",
});

export type V2ThreadListResponse__NonSteerableTurnKind = "review" | "compact";
export const V2ThreadListResponse__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "V2ThreadListResponse__NonSteerableTurnKind" });

export type V2ThreadListResponse__MisalignmentSteer = { readonly message: string };
export const V2ThreadListResponse__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadListResponse__MisalignmentSteer" });

export type V2ThreadListResponse__ByteRange = { readonly end: number; readonly start: number };
export const V2ThreadListResponse__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadListResponse__ByteRange" });

export type V2ThreadListResponse__ImageDetail = "auto" | "low" | "high" | "original";
export const V2ThreadListResponse__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "V2ThreadListResponse__ImageDetail" });

export type V2ThreadListResponse__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const V2ThreadListResponse__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "V2ThreadListResponse__HookPromptFragment" });

export type V2ThreadListResponse__AgentMessageDelivery = "async";
export const V2ThreadListResponse__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "V2ThreadListResponse__AgentMessageDelivery",
});

export type V2ThreadListResponse__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const V2ThreadListResponse__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "V2ThreadListResponse__MemoryCitationEntry" });

export type V2ThreadListResponse__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const V2ThreadListResponse__MessagePhase = Schema.Union(
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
  identifier: "V2ThreadListResponse__MessagePhase",
});

export type V2ThreadListResponse__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const V2ThreadListResponse__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "V2ThreadListResponse__AsyncUserInputQuestion" });

export type V2ThreadListResponse__LegacyAppPathString = string;
export const V2ThreadListResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "V2ThreadListResponse__LegacyAppPathString",
});

export type V2ThreadListResponse__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const V2ThreadListResponse__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "V2ThreadListResponse__CommandExecutionSource" });

export type V2ThreadListResponse__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadListResponse__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadListResponse__CommandExecutionStatus" });

export type V2ThreadListResponse__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const V2ThreadListResponse__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "V2ThreadListResponse__PatchChangeKind" });

export type V2ThreadListResponse__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const V2ThreadListResponse__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "V2ThreadListResponse__PatchApplyStatus" });

export type V2ThreadListResponse__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const V2ThreadListResponse__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2ThreadListResponse__McpToolCallAppContext" });

export type V2ThreadListResponse__McpToolCallError = { readonly message: string };
export const V2ThreadListResponse__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "V2ThreadListResponse__McpToolCallError" });

export type V2ThreadListResponse__McpAppDisplayMode = "inline" | "fullscreen";
export const V2ThreadListResponse__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "V2ThreadListResponse__McpAppDisplayMode" });
