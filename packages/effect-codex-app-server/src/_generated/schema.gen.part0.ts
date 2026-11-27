/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";

export type ApplyPatchApprovalParams__ThreadId = string;
export const ApplyPatchApprovalParams__ThreadId = Schema.String.annotate({
  identifier: "ApplyPatchApprovalParams__ThreadId",
});

export type ApplyPatchApprovalParams__FileChange =
  | { readonly content: string; readonly type: "add" }
  | { readonly content: string; readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update"; readonly unified_diff: string };
export const ApplyPatchApprovalParams__FileChange = Schema.Union(
  [
    Schema.Struct({
      content: Schema.String,
      type: Schema.Literal("add").annotate({ title: "AddFileChangeType" }),
    }).annotate({ title: "AddFileChange" }),
    Schema.Struct({
      content: Schema.String,
      type: Schema.Literal("delete").annotate({ title: "DeleteFileChangeType" }),
    }).annotate({ title: "DeleteFileChange" }),
    Schema.Struct({
      move_path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("update").annotate({ title: "UpdateFileChangeType" }),
      unified_diff: Schema.String,
    }).annotate({ title: "UpdateFileChange" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ApplyPatchApprovalParams__FileChange" });

export type ApplyPatchApprovalResponse__NetworkPolicyRuleAction = "allow" | "deny";
export const ApplyPatchApprovalResponse__NetworkPolicyRuleAction = Schema.Literals([
  "allow",
  "deny",
]).annotate({ identifier: "ApplyPatchApprovalResponse__NetworkPolicyRuleAction" });

export type ChatgptAuthTokensRefreshParams__ChatgptAuthTokensRefreshReason = "unauthorized";
export const ChatgptAuthTokensRefreshParams__ChatgptAuthTokensRefreshReason = Schema.Union(
  [
    Schema.Literal("unauthorized").annotate({
      description: "Codex attempted a backend request and received `401 Unauthorized`.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ChatgptAuthTokensRefreshParams__ChatgptAuthTokensRefreshReason" });

export type ClientRequest__RequestId = string | number;
export const ClientRequest__RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ identifier: "ClientRequest__RequestId" });

export type ClientRequest__InitializeCapabilities = {
  readonly experimentalApi?: boolean;
  readonly explicitGatewayOauth?: boolean;
  readonly extensions?: { readonly [x: string]: Schema.Json } | null;
  readonly mcpServerOpenaiFormElicitation?: boolean;
  readonly optOutNotificationMethods?: ReadonlyArray<string> | null;
  readonly requestAttestation?: boolean;
};
export const ClientRequest__InitializeCapabilities = Schema.Struct({
  experimentalApi: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Opt into receiving experimental API methods and fields.",
      default: false,
    }),
  ),
  explicitGatewayOauth: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Use explicit gateway OAuth login instead of automatic browser authorization. Applies to this app-server's gateway runtime; later connections cannot undo it.",
    }),
  ),
  extensions: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description: "MCP extension settings declared by the app-server client.",
      }),
      Schema.Null,
    ]),
  ),
  mcpServerOpenaiFormElicitation: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Legacy opt-in for the `openai/form` MCP extension.\n\nNew clients should declare `openai/form` in [`Self::extensions`].",
    }),
  ),
  optOutNotificationMethods: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Exact notification method names that should be suppressed for this connection (for example `thread/started`).",
      }),
      Schema.Null,
    ]),
  ),
  requestAttestation: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Opt into `attestation/generate` requests for upstream `x-oai-attestation`.",
      default: false,
    }),
  ),
}).annotate({
  description: "Client-declared capabilities negotiated during initialize.",
  identifier: "ClientRequest__InitializeCapabilities",
});

export type ClientRequest__ClientInfo = {
  readonly name: string;
  readonly title?: string | null;
  readonly version: string;
};
export const ClientRequest__ClientInfo = Schema.Struct({
  name: Schema.String,
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  version: Schema.String,
}).annotate({ identifier: "ClientRequest__ClientInfo" });

export type ClientRequest__AskForApproval =
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
export const ClientRequest__AskForApproval = Schema.Union(
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
).annotate({ identifier: "ClientRequest__AskForApproval" });

export type ClientRequest__ApprovalsReviewer = "user" | "auto_review" | "guardian_subagent";
export const ClientRequest__ApprovalsReviewer = Schema.Literals([
  "user",
  "auto_review",
  "guardian_subagent",
]).annotate({
  description:
    "Configures who approval requests are routed to for review. Examples include sandbox escapes, blocked network access, MCP approval prompts, and ARC escalations. Defaults to `user`. `auto_review` uses a carefully prompted subagent to gather relevant context and apply a risk-based decision framework before approving or denying the request. The legacy value `guardian_subagent` is accepted for compatibility.",
  identifier: "ClientRequest__ApprovalsReviewer",
});

export type ClientRequest__Personality = "none" | "friendly" | "pragmatic";
export const ClientRequest__Personality = Schema.Literals([
  "none",
  "friendly",
  "pragmatic",
]).annotate({
  description: "Deprecated: `friendly` and `pragmatic` no longer select a style.",
  identifier: "ClientRequest__Personality",
});

export type ClientRequest__SandboxMode = "read-only" | "workspace-write" | "danger-full-access";
export const ClientRequest__SandboxMode = Schema.Literals([
  "read-only",
  "workspace-write",
  "danger-full-access",
]).annotate({ identifier: "ClientRequest__SandboxMode" });

export type ClientRequest__ThreadStartSource = "startup" | "clear";
export const ClientRequest__ThreadStartSource = Schema.Literals(["startup", "clear"]).annotate({
  identifier: "ClientRequest__ThreadStartSource",
});

export type ClientRequest__ThreadSource = string;
export const ClientRequest__ThreadSource = Schema.String.annotate({
  identifier: "ClientRequest__ThreadSource",
});

export type ClientRequest__ThreadArchiveParams = { readonly threadId: string };
export const ClientRequest__ThreadArchiveParams = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadArchiveParams" });

export type ClientRequest__ThreadDeleteParams = { readonly threadId: string };
export const ClientRequest__ThreadDeleteParams = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadDeleteParams" });

export type ClientRequest__ThreadUnsubscribeParams = { readonly threadId: string };
export const ClientRequest__ThreadUnsubscribeParams = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadUnsubscribeParams" });

export type ClientRequest__ThreadSetNameParams = {
  readonly name: string;
  readonly threadId: string;
};
export const ClientRequest__ThreadSetNameParams = Schema.Struct({
  name: Schema.String,
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadSetNameParams" });

export type ClientRequest__ThreadGoalStatus =
  | "active"
  | "paused"
  | "blocked"
  | "usageLimited"
  | "budgetLimited"
  | "complete";
export const ClientRequest__ThreadGoalStatus = Schema.Literals([
  "active",
  "paused",
  "blocked",
  "usageLimited",
  "budgetLimited",
  "complete",
]).annotate({ identifier: "ClientRequest__ThreadGoalStatus" });

export type ClientRequest__ThreadGoalGetParams = { readonly threadId: string };
export const ClientRequest__ThreadGoalGetParams = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadGoalGetParams" });

export type ClientRequest__ThreadGoalClearParams = { readonly threadId: string };
export const ClientRequest__ThreadGoalClearParams = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadGoalClearParams" });

export type ClientRequest__ThreadMetadataGitInfoUpdateParams = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const ClientRequest__ThreadMetadataGitInfoUpdateParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__ThreadMetadataGitInfoUpdateParams" });

export type ClientRequest__ThreadAttachmentAddParams = {
  readonly attachmentType: string;
  readonly identityKey: string;
  readonly payload: Schema.Json;
  readonly threadId: string;
};
export const ClientRequest__ThreadAttachmentAddParams = Schema.Struct({
  attachmentType: Schema.String,
  identityKey: Schema.String,
  payload: Schema.Json.annotate({ expected: "JSON value" }),
  threadId: Schema.String,
}).annotate({
  description: "Parameters for creating or locating an attachment on its owning thread.",
  identifier: "ClientRequest__ThreadAttachmentAddParams",
});

export type ClientRequest__ThreadAttachmentListParams = {
  readonly cursor?: string | null;
  readonly limit?: number | null;
  readonly threadId: string;
};
export const ClientRequest__ThreadAttachmentListParams = Schema.Struct({
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
  description: "Parameters for listing attachments from one thread.",
  identifier: "ClientRequest__ThreadAttachmentListParams",
});

export type ClientRequest__ThreadAttachmentRemoveParams = {
  readonly attachmentType: string;
  readonly identityKey: string;
  readonly threadId: string;
};
export const ClientRequest__ThreadAttachmentRemoveParams = Schema.Struct({
  attachmentType: Schema.String,
  identityKey: Schema.String,
  threadId: Schema.String,
}).annotate({
  description: "Parameters for deleting an attachment by its stable thread-local identity.",
  identifier: "ClientRequest__ThreadAttachmentRemoveParams",
});

export type ClientRequest__ThreadSectionMoveParams = {
  readonly beforeThreadId?: string | null;
  readonly sectionId: string | null;
  readonly threadId: string;
};
export const ClientRequest__ThreadSectionMoveParams = Schema.Struct({
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
  description: "Parameters for moving a thread within a server-owned section ordering.",
  identifier: "ClientRequest__ThreadSectionMoveParams",
});

export type ClientRequest__ThreadUnarchiveParams = { readonly threadId: string };
export const ClientRequest__ThreadUnarchiveParams = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadUnarchiveParams" });

export type ClientRequest__ThreadCompactStartParams = { readonly threadId: string };
export const ClientRequest__ThreadCompactStartParams = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadCompactStartParams" });

export type ClientRequest__ThreadShellCommandParams = {
  readonly command: string;
  readonly threadId: string;
  readonly timeoutMs?: number | null;
};
export const ClientRequest__ThreadShellCommandParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__ThreadShellCommandParams" });

export type ClientRequest__ThreadApproveGuardianDeniedActionParams = {
  readonly event: Schema.Json;
  readonly threadId: string;
};
export const ClientRequest__ThreadApproveGuardianDeniedActionParams = Schema.Struct({
  event: Schema.Json.annotate({
    expected: "JSON value",
    description: "Serialized `codex_protocol::protocol::GuardianAssessmentEvent`.",
  }),
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadApproveGuardianDeniedActionParams" });

export type ClientRequest__ThreadRevertParams = {
  readonly beforeTurnId: string;
  readonly threadId: string;
};
export const ClientRequest__ThreadRevertParams = Schema.Struct({
  beforeTurnId: Schema.String.annotate({
    description: "Turn excluded from the replacement history, together with every later turn.",
  }),
  threadId: Schema.String,
}).annotate({
  description:
    "Replace a paginated thread's durable history with the prefix before one turn.\n\nThis only changes persisted conversation history. It does not revert local file changes.",
  identifier: "ClientRequest__ThreadRevertParams",
});

export type ClientRequest__ThreadListCwdFilter = string | ReadonlyArray<string>;
export const ClientRequest__ThreadListCwdFilter = Schema.Union([
  Schema.String,
  Schema.Array(Schema.String),
]).annotate({ identifier: "ClientRequest__ThreadListCwdFilter" });

export type ClientRequest__SortDirection = "asc" | "desc";
export const ClientRequest__SortDirection = Schema.Literals(["asc", "desc"]).annotate({
  identifier: "ClientRequest__SortDirection",
});

export type ClientRequest__ThreadSortKey =
  | "created_at"
  | "updated_at"
  | "recency_at"
  | "section_position";
export const ClientRequest__ThreadSortKey = Schema.Literals([
  "created_at",
  "updated_at",
  "recency_at",
  "section_position",
]).annotate({ identifier: "ClientRequest__ThreadSortKey" });

export type ClientRequest__ThreadSourceKind =
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
export const ClientRequest__ThreadSourceKind = Schema.Literals([
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
]).annotate({ identifier: "ClientRequest__ThreadSourceKind" });

export type ClientRequest__ThreadSectionListParams = {
  readonly cursor?: string | null;
  readonly limit?: number | null;
};
export const ClientRequest__ThreadSectionListParams = Schema.Struct({
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
  description: "Parameters for listing independently persisted thread sections.",
  identifier: "ClientRequest__ThreadSectionListParams",
});

export type ClientRequest__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const ClientRequest__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "ClientRequest__ThreadSectionAppearance",
});

export type ClientRequest__ThreadSectionDeleteParams = { readonly sectionId: string };
export const ClientRequest__ThreadSectionDeleteParams = Schema.Struct({
  sectionId: Schema.String.annotate({
    description: "The stable, server-generated identity of the section to delete.",
  }),
}).annotate({
  description: "Parameters for deleting an independently persisted thread section.",
  identifier: "ClientRequest__ThreadSectionDeleteParams",
});

export type ClientRequest__ThreadLoadedListParams = {
  readonly cursor?: string | null;
  readonly limit?: number | null;
};
export const ClientRequest__ThreadLoadedListParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__ThreadLoadedListParams" });

export type ClientRequest__ThreadReadParams = {
  readonly includeTurns?: boolean;
  readonly threadId: string;
};
export const ClientRequest__ThreadReadParams = Schema.Struct({
  includeTurns: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true, include turns and their items from rollout history. Full-history hydration is deprecated for paginated threads; prefer a metadata-only read and page with `thread/turns/list` and `thread/items/list`.",
    }),
  ),
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadReadParams" });

export type ClientRequest__TurnItemsView = "notLoaded" | "summary" | "full";
export const ClientRequest__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "ClientRequest__TurnItemsView" });

export type ClientRequest__ThreadItemsListAnchor = {
  readonly itemId: string;
  readonly type: "item";
};
export const ClientRequest__ThreadItemsListAnchor = Schema.Union(
  [
    Schema.Struct({
      itemId: Schema.String,
      type: Schema.Literal("item").annotate({ title: "ItemThreadItemsListAnchorType" }),
    }).annotate({ title: "ItemThreadItemsListAnchor" }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "An exclusive item position within the requested visible turn.",
  identifier: "ClientRequest__ThreadItemsListAnchor",
});

export type ClientRequest__ThreadInjectItemsParams = {
  readonly items: ReadonlyArray<Schema.Json>;
  readonly threadId: string;
};
export const ClientRequest__ThreadInjectItemsParams = Schema.Struct({
  items: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })).annotate({
    description: "Raw Responses API items to append to the thread's model-visible history.",
  }),
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__ThreadInjectItemsParams" });

export type ClientRequest__SkillsListParams = {
  readonly cwds?: ReadonlyArray<string>;
  readonly forceReload?: boolean;
};
export const ClientRequest__SkillsListParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__SkillsListParams" });

export type ClientRequest__AbsolutePathBuf = string;
export const ClientRequest__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "ClientRequest__AbsolutePathBuf",
});

export type ClientRequest__HooksListParams = { readonly cwds?: ReadonlyArray<string> };
export const ClientRequest__HooksListParams = Schema.Struct({
  cwds: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "When empty, defaults to the current session working directory.",
    }),
  ),
}).annotate({ identifier: "ClientRequest__HooksListParams" });

export type ClientRequest__MarketplaceAddParams = {
  readonly refName?: string | null;
  readonly source: string;
  readonly sparsePaths?: ReadonlyArray<string> | null;
};
export const ClientRequest__MarketplaceAddParams = Schema.Struct({
  refName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  source: Schema.String,
  sparsePaths: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
}).annotate({ identifier: "ClientRequest__MarketplaceAddParams" });

export type ClientRequest__MarketplaceRemoveParams = { readonly marketplaceName: string };
export const ClientRequest__MarketplaceRemoveParams = Schema.Struct({
  marketplaceName: Schema.String,
}).annotate({ identifier: "ClientRequest__MarketplaceRemoveParams" });

export type ClientRequest__MarketplaceUpgradeParams = { readonly marketplaceName?: string | null };
export const ClientRequest__MarketplaceUpgradeParams = Schema.Struct({
  marketplaceName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ClientRequest__MarketplaceUpgradeParams" });

export type ClientRequest__PluginListMarketplaceKind =
  | "local"
  | "vertical"
  | "workspace-directory"
  | "shared-with-me"
  | "created-by-me-remote";
export const ClientRequest__PluginListMarketplaceKind = Schema.Literals([
  "local",
  "vertical",
  "workspace-directory",
  "shared-with-me",
  "created-by-me-remote",
]).annotate({ identifier: "ClientRequest__PluginListMarketplaceKind" });

export type ClientRequest__PluginReconcileParams = { readonly reason?: string | null };
export const ClientRequest__PluginReconcileParams = Schema.Struct({
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional client-provided reason recorded with the reconciliation attempt.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ClientRequest__PluginReconcileParams" });

export type ClientRequest__PluginSkillReadParams = {
  readonly remoteMarketplaceName: string;
  readonly remotePluginId: string;
  readonly skillName: string;
};
export const ClientRequest__PluginSkillReadParams = Schema.Struct({
  remoteMarketplaceName: Schema.String,
  remotePluginId: Schema.String,
  skillName: Schema.String,
}).annotate({ identifier: "ClientRequest__PluginSkillReadParams" });

export type ClientRequest__PluginShareDiscoverability = "LISTED" | "UNLISTED" | "PRIVATE";
export const ClientRequest__PluginShareDiscoverability = Schema.Literals([
  "LISTED",
  "UNLISTED",
  "PRIVATE",
]).annotate({ identifier: "ClientRequest__PluginShareDiscoverability" });

export type ClientRequest__PluginSharePrincipalType = "user" | "group" | "workspace";
export const ClientRequest__PluginSharePrincipalType = Schema.Literals([
  "user",
  "group",
  "workspace",
]).annotate({ identifier: "ClientRequest__PluginSharePrincipalType" });

export type ClientRequest__PluginShareTargetRole = "reader" | "editor";
export const ClientRequest__PluginShareTargetRole = Schema.Literals(["reader", "editor"]).annotate({
  identifier: "ClientRequest__PluginShareTargetRole",
});

export type ClientRequest__PluginShareUpdateDiscoverability = "UNLISTED" | "PRIVATE" | "LISTED";
export const ClientRequest__PluginShareUpdateDiscoverability = Schema.Literals([
  "UNLISTED",
  "PRIVATE",
  "LISTED",
]).annotate({ identifier: "ClientRequest__PluginShareUpdateDiscoverability" });

export type ClientRequest__PluginShareListParams = { readonly [x: string]: Schema.Json };
export const ClientRequest__PluginShareListParams = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ identifier: "ClientRequest__PluginShareListParams" });

export type ClientRequest__PluginShareCheckoutParams = { readonly remotePluginId: string };
export const ClientRequest__PluginShareCheckoutParams = Schema.Struct({
  remotePluginId: Schema.String,
}).annotate({ identifier: "ClientRequest__PluginShareCheckoutParams" });

export type ClientRequest__PluginShareDeleteParams = { readonly remotePluginId: string };
export const ClientRequest__PluginShareDeleteParams = Schema.Struct({
  remotePluginId: Schema.String,
}).annotate({ identifier: "ClientRequest__PluginShareDeleteParams" });

export type ClientRequest__AppsReadParams = {
  readonly appIds: ReadonlyArray<string>;
  readonly includeTools?: boolean;
  readonly threadId?: string | null;
};
export const ClientRequest__AppsReadParams = Schema.Struct({
  appIds: Schema.Array(Schema.String).annotate({
    description:
      "App ids to read. The server accepts at most 100 ids and deduplicates repeated ids while preserving their first-request order.",
  }),
  includeTools: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true, include display-only public tool summaries in the returned metadata.",
    }),
  ),
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional loaded thread id used to evaluate effective app configuration.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "EXPERIMENTAL - read metadata for specific apps/connectors.",
  identifier: "ClientRequest__AppsReadParams",
});

export type ClientRequest__AppsListParams = {
  readonly cursor?: string | null;
  readonly forceRefetch?: boolean;
  readonly limit?: number | null;
  readonly threadId?: string | null;
};
export const ClientRequest__AppsListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque pagination cursor returned by a previous call.",
      }),
      Schema.Null,
    ]),
  ),
  forceRefetch: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "When true, bypass app caches and fetch the latest data from sources.",
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
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional thread id used to evaluate app feature gating from that thread's config.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "EXPERIMENTAL - list available apps/connectors.",
  identifier: "ClientRequest__AppsListParams",
});

export type ClientRequest__AppsInstalledParams = {
  readonly forceRefresh?: boolean;
  readonly threadId?: string | null;
};
export const ClientRequest__AppsInstalledParams = Schema.Struct({
  forceRefresh: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true and Apps are permitted, refresh and publish the hosted connector runtime tool snapshot first.",
    }),
  ),
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional loaded thread id used to evaluate effective app configuration.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Read the committed installed connector runtime snapshot.",
  identifier: "ClientRequest__AppsInstalledParams",
});

export type ClientRequest__FsUnwatchParams = { readonly watchId: string };
export const ClientRequest__FsUnwatchParams = Schema.Struct({
  watchId: Schema.String.annotate({
    description: "Watch identifier previously provided to `fs/watch`.",
  }),
}).annotate({
  description: "Stop filesystem watch notifications for a prior `fs/watch`.",
  identifier: "ClientRequest__FsUnwatchParams",
});

export type ClientRequest__PluginUninstallParams = { readonly pluginId: string };
export const ClientRequest__PluginUninstallParams = Schema.Struct({
  pluginId: Schema.String,
}).annotate({ identifier: "ClientRequest__PluginUninstallParams" });

export type ClientRequest__ReasoningEffort = string;
export const ClientRequest__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "ClientRequest__ReasoningEffort",
  }),
);

export type ClientRequest__ByteRange = { readonly end: number; readonly start: number };
export const ClientRequest__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__ByteRange" });

export type ClientRequest__ImageDetail = "auto" | "low" | "high" | "original";
export const ClientRequest__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "ClientRequest__ImageDetail" });

export type ClientRequest__NetworkAccess = "restricted" | "enabled";
export const ClientRequest__NetworkAccess = Schema.Literals(["restricted", "enabled"]).annotate({
  identifier: "ClientRequest__NetworkAccess",
});

export type ClientRequest__ReasoningSummary = "auto" | "concise" | "detailed" | "none";
export const ClientRequest__ReasoningSummary = Schema.Union(
  [
    Schema.Literals(["auto", "concise", "detailed"]),
    Schema.Literal("none").annotate({ description: "Option to disable reasoning summaries." }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "A summary of the reasoning performed by the model. This can be useful for debugging and understanding the model's reasoning process. See https://platform.openai.com/docs/guides/reasoning?api-mode=responses#reasoning-summaries",
  identifier: "ClientRequest__ReasoningSummary",
});

export type ClientRequest__TurnInterruptParams = {
  readonly threadId: string;
  readonly turnId: string;
};
export const ClientRequest__TurnInterruptParams = Schema.Struct({
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ClientRequest__TurnInterruptParams" });

export type ClientRequest__ReviewDelivery = "inline" | "detached";
export const ClientRequest__ReviewDelivery = Schema.Literals(["inline", "detached"]).annotate({
  identifier: "ClientRequest__ReviewDelivery",
});

export type ClientRequest__ReviewTarget =
  | { readonly type: "uncommittedChanges" }
  | { readonly branch: string; readonly type: "baseBranch" }
  | { readonly sha: string; readonly title?: string | null; readonly type: "commit" }
  | { readonly instructions: string; readonly type: "custom" };
export const ClientRequest__ReviewTarget = Schema.Union(
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
).annotate({ identifier: "ClientRequest__ReviewTarget" });

export type ClientRequest__ModelListParams = {
  readonly cursor?: string | null;
  readonly includeHidden?: boolean | null;
  readonly limit?: number | null;
};
export const ClientRequest__ModelListParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__ModelListParams" });

export type ClientRequest__ModelProviderCapabilitiesReadParams = {
  readonly [x: string]: Schema.Json;
};
export const ClientRequest__ModelProviderCapabilitiesReadParams = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ identifier: "ClientRequest__ModelProviderCapabilitiesReadParams" });

export type ClientRequest__ExperimentalFeatureListParams = {
  readonly cursor?: string | null;
  readonly limit?: number | null;
  readonly threadId?: string | null;
};
export const ClientRequest__ExperimentalFeatureListParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__ExperimentalFeatureListParams" });

export type ClientRequest__PermissionProfileListParams = {
  readonly cursor?: string | null;
  readonly cwd?: string | null;
  readonly limit?: number | null;
};
export const ClientRequest__PermissionProfileListParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__PermissionProfileListParams" });

export type ClientRequest__ExperimentalFeatureEnablementSetParams = {
  readonly enablement: { readonly [x: string]: boolean };
};
export const ClientRequest__ExperimentalFeatureEnablementSetParams = Schema.Struct({
  enablement: Schema.Record(Schema.String, Schema.Boolean).annotate({
    description:
      "Process-wide runtime feature enablement keyed by canonical feature name.\n\nOnly named features are updated. Omitted features are left unchanged. Send an empty map for a no-op.",
  }),
}).annotate({ identifier: "ClientRequest__ExperimentalFeatureEnablementSetParams" });

export type ClientRequest__McpServerOauthClientRegistration = "auto" | "cimd" | "dcr";
export const ClientRequest__McpServerOauthClientRegistration = Schema.Literals([
  "auto",
  "cimd",
  "dcr",
]).annotate({ identifier: "ClientRequest__McpServerOauthClientRegistration" });

export type ClientRequest__McpServerStatusDetail = "full" | "toolsAndAuthOnly";
export const ClientRequest__McpServerStatusDetail = Schema.Literals([
  "full",
  "toolsAndAuthOnly",
]).annotate({ identifier: "ClientRequest__McpServerStatusDetail" });

export type ClientRequest__McpResourceReadTarget = {
  readonly connectorId: string;
  readonly linkId: string | null;
};
export const ClientRequest__McpResourceReadTarget = Schema.Struct({
  connectorId: Schema.String,
  linkId: Schema.Union([
    Schema.String.annotate({
      description: "Null explicitly requests no-auth access, subject to the app's resource policy.",
    }),
    Schema.Null,
  ]),
}).annotate({ identifier: "ClientRequest__McpResourceReadTarget" });

export type ClientRequest__McpServerToolCallParams = {
  readonly _meta?: Schema.Json;
  readonly arguments?: Schema.Json;
  readonly server: string;
  readonly threadId: string;
  readonly tool: string;
};
export const ClientRequest__McpServerToolCallParams = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  arguments: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  server: Schema.String,
  threadId: Schema.String,
  tool: Schema.String,
}).annotate({ identifier: "ClientRequest__McpServerToolCallParams" });

export type ClientRequest__WindowsSandboxSetupMode = "elevated" | "unelevated";
export const ClientRequest__WindowsSandboxSetupMode = Schema.Literals([
  "elevated",
  "unelevated",
]).annotate({ identifier: "ClientRequest__WindowsSandboxSetupMode" });

export type ClientRequest__LoginAppBrand = "codex" | "chatgpt";
export const ClientRequest__LoginAppBrand = Schema.Literals(["codex", "chatgpt"]).annotate({
  identifier: "ClientRequest__LoginAppBrand",
});

export type ClientRequest__CancelLoginAccountParams = { readonly loginId: string };
export const ClientRequest__CancelLoginAccountParams = Schema.Struct({
  loginId: Schema.String,
}).annotate({ identifier: "ClientRequest__CancelLoginAccountParams" });

export type ClientRequest__GetAccountRateLimitsParams = {
  readonly excludeResetCreditDetails?: boolean;
  readonly supportsLunaReserve?: boolean;
};
export const ClientRequest__GetAccountRateLimitsParams = Schema.Struct({
  excludeResetCreditDetails: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Skip the separate reset-credit detail lookup for background usage polls. The usage response still includes the available count; omitted/false preserves detailed reads.",
    }),
  ),
  supportsLunaReserve: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "The client supports automatic Luna Reserve fallback. For eligible ChatGPT CLI users, allow the backend to record experiment exposure after ordinary usage is blocked.",
    }),
  ),
}).annotate({
  description:
    "Usage-read capabilities of the requesting client, never inferred from its experiment arm.",
  identifier: "ClientRequest__GetAccountRateLimitsParams",
});

export type ClientRequest__ConsumeAccountRateLimitResetCreditParams = {
  readonly creditId?: string | null;
  readonly idempotencyKey: string;
};
export const ClientRequest__ConsumeAccountRateLimitResetCreditParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__ConsumeAccountRateLimitResetCreditParams" });

export type ClientRequest__GetAccountTokenUsageParams = { readonly threadId?: string | null };
export const ClientRequest__GetAccountTokenUsageParams = Schema.Struct({
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "When present, read estimated usage for this thread instead of account-wide token activity.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ClientRequest__GetAccountTokenUsageParams" });

export type ClientRequest__AddCreditsNudgeCreditType = "credits" | "usage_limit";
export const ClientRequest__AddCreditsNudgeCreditType = Schema.Literals([
  "credits",
  "usage_limit",
]).annotate({ identifier: "ClientRequest__AddCreditsNudgeCreditType" });

export type ClientRequest__FeedbackUploadParams = {
  readonly classification: string;
  readonly extraLogFiles?: ReadonlyArray<string> | null;
  readonly includeLogs?: boolean;
  readonly reason?: string | null;
  readonly tags?: { readonly [x: string]: string } | null;
  readonly threadId?: string | null;
};
export const ClientRequest__FeedbackUploadParams = Schema.Struct({
  classification: Schema.String,
  extraLogFiles: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  includeLogs: Schema.optionalKey(Schema.Boolean),
  reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  tags: Schema.optionalKey(
    Schema.Union([Schema.Record(Schema.String, Schema.String), Schema.Null]),
  ),
  threadId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ClientRequest__FeedbackUploadParams" });

export type ClientRequest__CommandExecTerminalSize = {
  readonly cols: number;
  readonly rows: number;
};
export const ClientRequest__CommandExecTerminalSize = Schema.Struct({
  cols: Schema.Number.annotate({
    description: "Terminal width in character cells.",
    format: "uint16",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  rows: Schema.Number.annotate({
    description: "Terminal height in character cells.",
    format: "uint16",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({
  description: "PTY size in character cells for `command/exec` PTY sessions.",
  identifier: "ClientRequest__CommandExecTerminalSize",
});

export type ClientRequest__CommandExecWriteParams = {
  readonly closeStdin?: boolean;
  readonly deltaBase64?: string | null;
  readonly processId: string;
};
export const ClientRequest__CommandExecWriteParams = Schema.Struct({
  closeStdin: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Close stdin after writing `deltaBase64`, if present.",
    }),
  ),
  deltaBase64: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional base64-encoded stdin bytes to write." }),
      Schema.Null,
    ]),
  ),
  processId: Schema.String.annotate({
    description:
      "Client-supplied, connection-scoped `processId` from the original `command/exec` request.",
  }),
}).annotate({
  description: "Write stdin bytes to a running `command/exec` session, close stdin, or both.",
  identifier: "ClientRequest__CommandExecWriteParams",
});

export type ClientRequest__CommandExecTerminateParams = { readonly processId: string };
export const ClientRequest__CommandExecTerminateParams = Schema.Struct({
  processId: Schema.String.annotate({
    description:
      "Client-supplied, connection-scoped `processId` from the original `command/exec` request.",
  }),
}).annotate({
  description: "Terminate a running `command/exec` session.",
  identifier: "ClientRequest__CommandExecTerminateParams",
});

export type ClientRequest__ConfigReadParams = {
  readonly cwd?: string | null;
  readonly includeLayers?: boolean;
};
export const ClientRequest__ConfigReadParams = Schema.Struct({
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional working directory to resolve project config layers. If specified, return the effective config as seen from that directory (i.e., including any project layers between `cwd` and the project/repo root).",
      }),
      Schema.Null,
    ]),
  ),
  includeLayers: Schema.optionalKey(Schema.Boolean),
}).annotate({ identifier: "ClientRequest__ConfigReadParams" });

export type ClientRequest__ExternalAgentConfigDetectParams = {
  readonly cwds?: ReadonlyArray<string> | null;
  readonly includeHome?: boolean;
  readonly maxSessionAgeDays?: number | null;
  readonly maxSessions?: number | null;
  readonly migrationSource?: string | null;
  readonly source?: string | null;
};
export const ClientRequest__ExternalAgentConfigDetectParams = Schema.Struct({
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
}).annotate({ identifier: "ClientRequest__ExternalAgentConfigDetectParams" });

export type ClientRequest__CommandMigration = { readonly name: string };
export const ClientRequest__CommandMigration = Schema.Struct({ name: Schema.String }).annotate({
  identifier: "ClientRequest__CommandMigration",
});

export type ClientRequest__HookMigration = { readonly name: string };
export const ClientRequest__HookMigration = Schema.Struct({ name: Schema.String }).annotate({
  identifier: "ClientRequest__HookMigration",
});

export type ClientRequest__McpServerMigration = { readonly name: string };
export const ClientRequest__McpServerMigration = Schema.Struct({ name: Schema.String }).annotate({
  identifier: "ClientRequest__McpServerMigration",
});

export type ClientRequest__PluginsMigration = {
  readonly marketplaceName: string;
  readonly pluginNames: ReadonlyArray<string>;
};
export const ClientRequest__PluginsMigration = Schema.Struct({
  marketplaceName: Schema.String,
  pluginNames: Schema.Array(Schema.String),
}).annotate({ identifier: "ClientRequest__PluginsMigration" });

export type ClientRequest__SessionMigration = {
  readonly cwd: string;
  readonly path: string;
  readonly title?: string | null;
};
export const ClientRequest__SessionMigration = Schema.Struct({
  cwd: Schema.String,
  path: Schema.String,
  title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ClientRequest__SessionMigration" });

export type ClientRequest__SkillMigration = { readonly name: string };
export const ClientRequest__SkillMigration = Schema.Struct({ name: Schema.String }).annotate({
  identifier: "ClientRequest__SkillMigration",
});

export type ClientRequest__SubagentMigration = { readonly name: string };
export const ClientRequest__SubagentMigration = Schema.Struct({ name: Schema.String }).annotate({
  identifier: "ClientRequest__SubagentMigration",
});

export type ClientRequest__ExternalAgentConfigMigrationItemType =
  | "AGENTS_MD"
  | "CONFIG"
  | "SKILLS"
  | "PLUGINS"
  | "MCP_SERVER_CONFIG"
  | "SUBAGENTS"
  | "HOOKS"
  | "COMMANDS"
  | "MEMORY"
  | "SESSIONS";
export const ClientRequest__ExternalAgentConfigMigrationItemType = Schema.Literals([
  "AGENTS_MD",
  "CONFIG",
  "SKILLS",
  "PLUGINS",
  "MCP_SERVER_CONFIG",
  "SUBAGENTS",
  "HOOKS",
  "COMMANDS",
  "MEMORY",
  "SESSIONS",
]).annotate({ identifier: "ClientRequest__ExternalAgentConfigMigrationItemType" });

export type ClientRequest__MergeStrategy = "replace" | "upsert";
export const ClientRequest__MergeStrategy = Schema.Literals(["replace", "upsert"]).annotate({
  identifier: "ClientRequest__MergeStrategy",
});

export type ClientRequest__GetAccountParams = { readonly refreshToken?: boolean };
export const ClientRequest__GetAccountParams = Schema.Struct({
  refreshToken: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When `true`, requests a proactive token refresh before returning.\n\nIn managed auth mode this triggers the normal refresh-token flow. In external auth mode this flag is ignored. Clients should refresh tokens themselves and call `account/login/start` with `chatgptAuthTokens`.",
    }),
  ),
}).annotate({ identifier: "ClientRequest__GetAccountParams" });

export type ClientRequest__FuzzyFileSearchParams = {
  readonly cancellationToken?: string | null;
  readonly query: string;
  readonly roots: ReadonlyArray<string>;
};
export const ClientRequest__FuzzyFileSearchParams = Schema.Struct({
  cancellationToken: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  query: Schema.String,
  roots: Schema.Array(Schema.String),
}).annotate({ identifier: "ClientRequest__FuzzyFileSearchParams" });

export type ClientRequest__AdditionalContextKind = "untrusted" | "application";
export const ClientRequest__AdditionalContextKind = Schema.Literals([
  "untrusted",
  "application",
]).annotate({ identifier: "ClientRequest__AdditionalContextKind" });

export type ClientRequest__ModeKind = "plan" | "default";
export const ClientRequest__ModeKind = Schema.Literals(["plan", "default"]).annotate({
  description: "Initial collaboration mode to use when the TUI starts.",
  identifier: "ClientRequest__ModeKind",
});

export type ClientRequest__DynamicToolNamespaceTool = {
  readonly deferLoading?: boolean;
  readonly description: string;
  readonly inputSchema: Schema.Json;
  readonly name: string;
  readonly type: "function";
};
export const ClientRequest__DynamicToolNamespaceTool = Schema.Union(
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
).annotate({ identifier: "ClientRequest__DynamicToolNamespaceTool" });

export type ClientRequest__InternalChatMessageMetadataPassthrough = {
  readonly turn_id?: string | null;
};
export const ClientRequest__InternalChatMessageMetadataPassthrough = Schema.Struct({
  turn_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description:
    "Internal Responses API passthrough metadata copied into underlying chat messages.\n\nResponses API strongly types this payload. Do not modify it without first getting API approval and making the corresponding Responses API change.",
  identifier: "ClientRequest__InternalChatMessageMetadataPassthrough",
});

export type ClientRequest__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const ClientRequest__MessagePhase = Schema.Union(
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
  identifier: "ClientRequest__MessagePhase",
});

export type ClientRequest__AgentMessageInputContent =
  | { readonly text: string; readonly type: "input_text" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const ClientRequest__AgentMessageInputContent = Schema.Union(
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
).annotate({ identifier: "ClientRequest__AgentMessageInputContent" });

export type ClientRequest__ReasoningItemContent =
  | { readonly text: string; readonly type: "reasoning_text" }
  | { readonly text: string; readonly type: "text" };
export const ClientRequest__ReasoningItemContent = Schema.Union(
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
).annotate({ identifier: "ClientRequest__ReasoningItemContent" });

export type ClientRequest__ReasoningItemReasoningSummary = {
  readonly text: string;
  readonly type: "summary_text";
};
export const ClientRequest__ReasoningItemReasoningSummary = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("summary_text").annotate({
        title: "SummaryTextReasoningItemReasoningSummaryType",
      }),
    }).annotate({ title: "SummaryTextReasoningItemReasoningSummary" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ClientRequest__ReasoningItemReasoningSummary" });

export type ClientRequest__LocalShellAction = {
  readonly command: ReadonlyArray<string>;
  readonly env?: { readonly [x: string]: string } | null;
  readonly timeout_ms?: number | null;
  readonly type: "exec";
  readonly user?: string | null;
  readonly working_directory?: string | null;
};
export const ClientRequest__LocalShellAction = Schema.Union(
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
).annotate({ identifier: "ClientRequest__LocalShellAction" });

export type ClientRequest__LocalShellStatus = "completed" | "in_progress" | "incomplete";
export const ClientRequest__LocalShellStatus = Schema.Literals([
  "completed",
  "in_progress",
  "incomplete",
]).annotate({ identifier: "ClientRequest__LocalShellStatus" });

export type ClientRequest__ResponsesApiWebSearchAction =
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
export const ClientRequest__ResponsesApiWebSearchAction = Schema.Union(
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
).annotate({ identifier: "ClientRequest__ResponsesApiWebSearchAction" });

export type ClientRequest__CapabilityRootLocation = {
  readonly environmentId: string;
  readonly path: string;
  readonly type: "environment";
};
export const ClientRequest__CapabilityRootLocation = Schema.Union(
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
  identifier: "ClientRequest__CapabilityRootLocation",
});

export type ClientRequest__ConversationTextRole = "user" | "developer" | "assistant";
export const ClientRequest__ConversationTextRole = Schema.Literals([
  "user",
  "developer",
  "assistant",
]).annotate({ identifier: "ClientRequest__ConversationTextRole" });

export type ClientRequest__LegacyAppPathString = string;
export const ClientRequest__LegacyAppPathString = Schema.String.annotate({
  identifier: "ClientRequest__LegacyAppPathString",
});

export type CommandExecutionRequestApprovalParams__LegacyAppPathString = string;
export const CommandExecutionRequestApprovalParams__LegacyAppPathString = Schema.String.annotate({
  identifier: "CommandExecutionRequestApprovalParams__LegacyAppPathString",
});

export type CommandExecutionRequestApprovalParams__CommandExecutionApprovalKind =
  | "command"
  | "writeStdin";
export const CommandExecutionRequestApprovalParams__CommandExecutionApprovalKind = Schema.Literals([
  "command",
  "writeStdin",
]).annotate({
  description: "Distinguishes a command approval from input sent to an existing terminal.",
  identifier: "CommandExecutionRequestApprovalParams__CommandExecutionApprovalKind",
});

export type CommandExecutionRequestApprovalParams__NetworkApprovalProtocol =
  | "http"
  | "https"
  | "socks5Tcp"
  | "socks5Udp";
export const CommandExecutionRequestApprovalParams__NetworkApprovalProtocol = Schema.Literals([
  "http",
  "https",
  "socks5Tcp",
  "socks5Udp",
]).annotate({ identifier: "CommandExecutionRequestApprovalParams__NetworkApprovalProtocol" });

export type CommandExecutionRequestApprovalParams__NetworkPolicyRuleAction = "allow" | "deny";
export const CommandExecutionRequestApprovalParams__NetworkPolicyRuleAction = Schema.Literals([
  "allow",
  "deny",
]).annotate({ identifier: "CommandExecutionRequestApprovalParams__NetworkPolicyRuleAction" });

export type CommandExecutionRequestApprovalParams__FileSystemAccessMode = "read" | "write" | "deny";
export const CommandExecutionRequestApprovalParams__FileSystemAccessMode = Schema.Literals([
  "read",
  "write",
  "deny",
]).annotate({ identifier: "CommandExecutionRequestApprovalParams__FileSystemAccessMode" });

export type CommandExecutionRequestApprovalParams__AdditionalNetworkPermissions = {
  readonly enabled?: boolean | null;
};
export const CommandExecutionRequestApprovalParams__AdditionalNetworkPermissions = Schema.Struct({
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "CommandExecutionRequestApprovalParams__AdditionalNetworkPermissions" });

export type CommandExecutionRequestApprovalResponse__NetworkPolicyRuleAction = "allow" | "deny";
export const CommandExecutionRequestApprovalResponse__NetworkPolicyRuleAction = Schema.Literals([
  "allow",
  "deny",
]).annotate({ identifier: "CommandExecutionRequestApprovalResponse__NetworkPolicyRuleAction" });

export type DynamicToolCallResponse__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const DynamicToolCallResponse__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "DynamicToolCallResponse__DynamicToolCallOutputContentItem" });

export type ExecCommandApprovalParams__ThreadId = string;
export const ExecCommandApprovalParams__ThreadId = Schema.String.annotate({
  identifier: "ExecCommandApprovalParams__ThreadId",
});

export type ExecCommandApprovalParams__ParsedCommand =
  | { readonly cmd: string; readonly name: string; readonly path: string; readonly type: "read" }
  | { readonly cmd: string; readonly path?: string | null; readonly type: "list_files" }
  | {
      readonly cmd: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly cmd: string; readonly type: "unknown" };
export const ExecCommandApprovalParams__ParsedCommand = Schema.Union(
  [
    Schema.Struct({
      cmd: Schema.String,
      name: Schema.String,
      path: Schema.String.annotate({
        description:
          "(Best effort) Path to the file being read by the command. When possible, this is an absolute path, though when relative, it should be resolved against the `cwd`` that will be used to run the command to derive the absolute path.",
      }),
      type: Schema.Literal("read").annotate({ title: "ReadParsedCommandType" }),
    }).annotate({ title: "ReadParsedCommand" }),
    Schema.Struct({
      cmd: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("list_files").annotate({ title: "ListFilesParsedCommandType" }),
    }).annotate({ title: "ListFilesParsedCommand" }),
    Schema.Struct({
      cmd: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchParsedCommandType" }),
    }).annotate({ title: "SearchParsedCommand" }),
    Schema.Struct({
      cmd: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownParsedCommandType" }),
    }).annotate({ title: "UnknownParsedCommand" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ExecCommandApprovalParams__ParsedCommand" });

export type ExecCommandApprovalResponse__NetworkPolicyRuleAction = "allow" | "deny";
export const ExecCommandApprovalResponse__NetworkPolicyRuleAction = Schema.Literals([
  "allow",
  "deny",
]).annotate({ identifier: "ExecCommandApprovalResponse__NetworkPolicyRuleAction" });

export type FileChangeRequestApprovalResponse__FileChangeApprovalDecision =
  | "accept"
  | "acceptForSession"
  | "decline"
  | "cancel";
export const FileChangeRequestApprovalResponse__FileChangeApprovalDecision = Schema.Union(
  [
    Schema.Literal("accept").annotate({ description: "User approved the file changes." }),
    Schema.Literal("acceptForSession").annotate({
      description:
        "User approved the file changes and future changes to the same files should run without prompting.",
    }),
    Schema.Literal("decline").annotate({
      description: "User denied the file changes. The agent will continue the turn.",
    }),
    Schema.Literal("cancel").annotate({
      description: "User denied the file changes. The turn will also be immediately interrupted.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "FileChangeRequestApprovalResponse__FileChangeApprovalDecision" });

export type FuzzyFileSearchResponse__FuzzyFileSearchMatchType = "file" | "directory";
export const FuzzyFileSearchResponse__FuzzyFileSearchMatchType = Schema.Literals([
  "file",
  "directory",
]).annotate({ identifier: "FuzzyFileSearchResponse__FuzzyFileSearchMatchType" });

export type FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchMatchType =
  | "file"
  | "directory";
export const FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchMatchType = Schema.Literals([
  "file",
  "directory",
]).annotate({ identifier: "FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchMatchType" });

export type JSONRPCError__JSONRPCErrorError = {
  readonly code: number;
  readonly data?: Schema.Json;
  readonly message: string;
};
export const JSONRPCError__JSONRPCErrorError = Schema.Struct({
  code: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  data: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  message: Schema.String,
}).annotate({ identifier: "JSONRPCError__JSONRPCErrorError" });

export type JSONRPCError__RequestId = string | number;
export const JSONRPCError__RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ identifier: "JSONRPCError__RequestId" });

export type JSONRPCMessage__RequestId = string | number;
export const JSONRPCMessage__RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ identifier: "JSONRPCMessage__RequestId" });

export type JSONRPCMessage__W3cTraceContext = {
  readonly traceparent?: string | null;
  readonly tracestate?: string | null;
};
export const JSONRPCMessage__W3cTraceContext = Schema.Struct({
  traceparent: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  tracestate: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "JSONRPCMessage__W3cTraceContext" });

export type JSONRPCMessage__JSONRPCNotification = {
  readonly method: string;
  readonly params?: Schema.Json;
};
export const JSONRPCMessage__JSONRPCNotification = Schema.Struct({
  method: Schema.String,
  params: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({
  description: "A notification which does not expect a response.",
  identifier: "JSONRPCMessage__JSONRPCNotification",
});

export type JSONRPCMessage__JSONRPCErrorError = {
  readonly code: number;
  readonly data?: Schema.Json;
  readonly message: string;
};
export const JSONRPCMessage__JSONRPCErrorError = Schema.Struct({
  code: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  data: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  message: Schema.String,
}).annotate({ identifier: "JSONRPCMessage__JSONRPCErrorError" });

export type JSONRPCRequest__RequestId = string | number;
export const JSONRPCRequest__RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ identifier: "JSONRPCRequest__RequestId" });

export type JSONRPCRequest__W3cTraceContext = {
  readonly traceparent?: string | null;
  readonly tracestate?: string | null;
};
export const JSONRPCRequest__W3cTraceContext = Schema.Struct({
  traceparent: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  tracestate: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "JSONRPCRequest__W3cTraceContext" });

export type JSONRPCResponse__RequestId = string | number;
export const JSONRPCResponse__RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ identifier: "JSONRPCResponse__RequestId" });

export type McpServerElicitationRequestParams__McpElicitationStringType = "string";
export const McpServerElicitationRequestParams__McpElicitationStringType = Schema.Literal(
  "string",
).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationStringType" });

export type McpServerElicitationRequestParams__McpElicitationConstOption = {
  readonly const: string;
  readonly title: string;
};
export const McpServerElicitationRequestParams__McpElicitationConstOption = Schema.Struct({
  const: Schema.String,
  title: Schema.String,
}).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationConstOption" });

export type McpServerElicitationRequestParams__McpElicitationArrayType = "array";
export const McpServerElicitationRequestParams__McpElicitationArrayType = Schema.Literal(
  "array",
).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationArrayType" });

export type McpServerElicitationRequestParams__McpElicitationStringFormat =
  | "email"
  | "uri"
  | "date"
  | "date-time";
export const McpServerElicitationRequestParams__McpElicitationStringFormat = Schema.Literals([
  "email",
  "uri",
  "date",
  "date-time",
]).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationStringFormat" });

export type McpServerElicitationRequestParams__McpElicitationNumberType = "number" | "integer";
export const McpServerElicitationRequestParams__McpElicitationNumberType = Schema.Literals([
  "number",
  "integer",
]).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationNumberType" });

export type McpServerElicitationRequestParams__McpElicitationBooleanType = "boolean";
export const McpServerElicitationRequestParams__McpElicitationBooleanType = Schema.Literal(
  "boolean",
).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationBooleanType" });

export type McpServerElicitationRequestParams__McpElicitationObjectType = "object";
export const McpServerElicitationRequestParams__McpElicitationObjectType = Schema.Literal(
  "object",
).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationObjectType" });

export type McpServerElicitationRequestResponse__McpServerElicitationAction =
  | "accept"
  | "decline"
  | "cancel";
export const McpServerElicitationRequestResponse__McpServerElicitationAction = Schema.Literals([
  "accept",
  "decline",
  "cancel",
]).annotate({ identifier: "McpServerElicitationRequestResponse__McpServerElicitationAction" });

export type PermissionsRequestApprovalParams__LegacyAppPathString = string;
export const PermissionsRequestApprovalParams__LegacyAppPathString = Schema.String.annotate({
  identifier: "PermissionsRequestApprovalParams__LegacyAppPathString",
});

export type PermissionsRequestApprovalParams__FileSystemAccessMode = "read" | "write" | "deny";
export const PermissionsRequestApprovalParams__FileSystemAccessMode = Schema.Literals([
  "read",
  "write",
  "deny",
]).annotate({ identifier: "PermissionsRequestApprovalParams__FileSystemAccessMode" });

export type PermissionsRequestApprovalParams__AdditionalNetworkPermissions = {
  readonly enabled?: boolean | null;
};
export const PermissionsRequestApprovalParams__AdditionalNetworkPermissions = Schema.Struct({
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "PermissionsRequestApprovalParams__AdditionalNetworkPermissions" });

export type PermissionsRequestApprovalResponse__FileSystemAccessMode = "read" | "write" | "deny";
export const PermissionsRequestApprovalResponse__FileSystemAccessMode = Schema.Literals([
  "read",
  "write",
  "deny",
]).annotate({ identifier: "PermissionsRequestApprovalResponse__FileSystemAccessMode" });

export type PermissionsRequestApprovalResponse__LegacyAppPathString = string;
export const PermissionsRequestApprovalResponse__LegacyAppPathString = Schema.String.annotate({
  identifier: "PermissionsRequestApprovalResponse__LegacyAppPathString",
});

export type PermissionsRequestApprovalResponse__AdditionalNetworkPermissions = {
  readonly enabled?: boolean | null;
};
export const PermissionsRequestApprovalResponse__AdditionalNetworkPermissions = Schema.Struct({
  enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ identifier: "PermissionsRequestApprovalResponse__AdditionalNetworkPermissions" });

export type PermissionsRequestApprovalResponse__PermissionGrantScope = "turn" | "session";
export const PermissionsRequestApprovalResponse__PermissionGrantScope = Schema.Literals([
  "turn",
  "session",
]).annotate({ identifier: "PermissionsRequestApprovalResponse__PermissionGrantScope" });

export type ServerNotification__NonSteerableTurnKind = "review" | "compact";
export const ServerNotification__NonSteerableTurnKind = Schema.Literals([
  "review",
  "compact",
]).annotate({ identifier: "ServerNotification__NonSteerableTurnKind" });

export type ServerNotification__MisalignmentSteer = { readonly message: string };
export const ServerNotification__MisalignmentSteer = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "ServerNotification__MisalignmentSteer" });

export type ServerNotification__AbsolutePathBuf = string;
export const ServerNotification__AbsolutePathBuf = Schema.String.annotate({
  description:
    "A path that is guaranteed to be absolute and normalized (though it is not guaranteed to be canonicalized or exist on the filesystem).\n\nIMPORTANT: When deserializing an `AbsolutePathBuf`, a base path must be set using [AbsolutePathBufGuard::new]. If no base path is set, the deserialization will fail unless the path being deserialized is already absolute.",
  identifier: "ServerNotification__AbsolutePathBuf",
});

export type ServerNotification__GitInfo = {
  readonly branch?: string | null;
  readonly originUrl?: string | null;
  readonly sha?: string | null;
};
export const ServerNotification__GitInfo = Schema.Struct({
  branch: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  originUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__GitInfo" });

export type ServerNotification__ThreadHistoryMode = "legacy" | "paginated";
export const ServerNotification__ThreadHistoryMode = Schema.Literals([
  "legacy",
  "paginated",
]).annotate({ identifier: "ServerNotification__ThreadHistoryMode" });

export type ServerNotification__ReasoningEffort = string;
export const ServerNotification__ReasoningEffort = Schema.String.annotate({
  description: "A non-empty reasoning effort value advertised by the model.",
}).check(
  Schema.isMinLength(1).annotate({
    expected: "a value with a length of at least 1",
    identifier: "ServerNotification__ReasoningEffort",
  }),
);

export type ServerNotification__ThreadSectionAppearance = {
  readonly color?: string | null;
  readonly icon?: string | null;
};
export const ServerNotification__ThreadSectionAppearance = Schema.Struct({
  color: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  icon: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({
  description: "Extensible visual presentation for a custom thread section.",
  identifier: "ServerNotification__ThreadSectionAppearance",
});

export type ServerNotification__AgentPath = string;
export const ServerNotification__AgentPath = Schema.String.annotate({
  identifier: "ServerNotification__AgentPath",
});

export type ServerNotification__ThreadId = string;
export const ServerNotification__ThreadId = Schema.String.annotate({
  identifier: "ServerNotification__ThreadId",
});

export type ServerNotification__ThreadActiveFlag = "waitingOnApproval" | "waitingOnUserInput";
export const ServerNotification__ThreadActiveFlag = Schema.Literals([
  "waitingOnApproval",
  "waitingOnUserInput",
]).annotate({ identifier: "ServerNotification__ThreadActiveFlag" });

export type ServerNotification__ThreadSource = string;
export const ServerNotification__ThreadSource = Schema.String.annotate({
  identifier: "ServerNotification__ThreadSource",
});

export type ServerNotification__ByteRange = { readonly end: number; readonly start: number };
export const ServerNotification__ByteRange = Schema.Struct({
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
}).annotate({ identifier: "ServerNotification__ByteRange" });

export type ServerNotification__ImageDetail = "auto" | "low" | "high" | "original";
export const ServerNotification__ImageDetail = Schema.Literals([
  "auto",
  "low",
  "high",
  "original",
]).annotate({ identifier: "ServerNotification__ImageDetail" });

export type ServerNotification__HookPromptFragment = {
  readonly hookRunId: string;
  readonly text: string;
};
export const ServerNotification__HookPromptFragment = Schema.Struct({
  hookRunId: Schema.String,
  text: Schema.String,
}).annotate({ identifier: "ServerNotification__HookPromptFragment" });

export type ServerNotification__AgentMessageDelivery = "async";
export const ServerNotification__AgentMessageDelivery = Schema.Literal("async").annotate({
  identifier: "ServerNotification__AgentMessageDelivery",
});

export type ServerNotification__MemoryCitationEntry = {
  readonly lineEnd: number;
  readonly lineStart: number;
  readonly note: string;
  readonly path: string;
};
export const ServerNotification__MemoryCitationEntry = Schema.Struct({
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
}).annotate({ identifier: "ServerNotification__MemoryCitationEntry" });

export type ServerNotification__MessagePhase = "commentary" | "partial_answer" | "final_answer";
export const ServerNotification__MessagePhase = Schema.Union(
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
  identifier: "ServerNotification__MessagePhase",
});

export type ServerNotification__AsyncUserInputQuestion = {
  readonly options?: ReadonlyArray<string> | null;
  readonly title: string;
};
export const ServerNotification__AsyncUserInputQuestion = Schema.Struct({
  options: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  title: Schema.String,
}).annotate({ identifier: "ServerNotification__AsyncUserInputQuestion" });

export type ServerNotification__LegacyAppPathString = string;
export const ServerNotification__LegacyAppPathString = Schema.String.annotate({
  identifier: "ServerNotification__LegacyAppPathString",
});

export type ServerNotification__CommandExecutionSource =
  | "agent"
  | "userShell"
  | "unifiedExecStartup"
  | "unifiedExecInteraction";
export const ServerNotification__CommandExecutionSource = Schema.Literals([
  "agent",
  "userShell",
  "unifiedExecStartup",
  "unifiedExecInteraction",
]).annotate({ identifier: "ServerNotification__CommandExecutionSource" });

export type ServerNotification__CommandExecutionStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const ServerNotification__CommandExecutionStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "ServerNotification__CommandExecutionStatus" });

export type ServerNotification__PatchChangeKind =
  | { readonly type: "add" }
  | { readonly type: "delete" }
  | { readonly move_path?: string | null; readonly type: "update" };
export const ServerNotification__PatchChangeKind = Schema.Union(
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
).annotate({ identifier: "ServerNotification__PatchChangeKind" });

export type ServerNotification__PatchApplyStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "declined";
export const ServerNotification__PatchApplyStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "declined",
]).annotate({ identifier: "ServerNotification__PatchApplyStatus" });

export type ServerNotification__McpToolCallAppContext = {
  readonly actionName?: string | null;
  readonly appName?: string | null;
  readonly connectorId: string;
  readonly linkId?: string | null;
  readonly resourceUri?: string | null;
};
export const ServerNotification__McpToolCallAppContext = Schema.Struct({
  actionName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  appName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  connectorId: Schema.String,
  linkId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  resourceUri: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__McpToolCallAppContext" });

export type ServerNotification__McpToolCallError = { readonly message: string };
export const ServerNotification__McpToolCallError = Schema.Struct({
  message: Schema.String,
}).annotate({ identifier: "ServerNotification__McpToolCallError" });

export type ServerNotification__McpAppDisplayMode = "inline" | "fullscreen";
export const ServerNotification__McpAppDisplayMode = Schema.Literals([
  "inline",
  "fullscreen",
]).annotate({ identifier: "ServerNotification__McpAppDisplayMode" });

export type ServerNotification__McpToolCallResult = {
  readonly _meta?: Schema.Json;
  readonly content: ReadonlyArray<Schema.Json>;
  readonly structuredContent?: Schema.Json;
};
export const ServerNotification__McpToolCallResult = Schema.Struct({
  _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  content: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
  structuredContent: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({ identifier: "ServerNotification__McpToolCallResult" });

export type ServerNotification__McpToolCallStatus = "inProgress" | "completed" | "failed";
export const ServerNotification__McpToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "ServerNotification__McpToolCallStatus" });

export type ServerNotification__DynamicToolCallOutputContentItem =
  | { readonly text: string; readonly type: "inputText" }
  | { readonly imageUrl: string; readonly type: "inputImage" }
  | { readonly audioUrl: string; readonly type: "inputAudio" };
export const ServerNotification__DynamicToolCallOutputContentItem = Schema.Union(
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
).annotate({ identifier: "ServerNotification__DynamicToolCallOutputContentItem" });

export type ServerNotification__DynamicToolCallStatus = "inProgress" | "completed" | "failed";
export const ServerNotification__DynamicToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
]).annotate({ identifier: "ServerNotification__DynamicToolCallStatus" });

export type ServerNotification__CollabAgentStatus =
  | "pendingInit"
  | "running"
  | "interrupted"
  | "completed"
  | "errored"
  | "shutdown"
  | "notFound";
export const ServerNotification__CollabAgentStatus = Schema.Literals([
  "pendingInit",
  "running",
  "interrupted",
  "completed",
  "errored",
  "shutdown",
  "notFound",
]).annotate({ identifier: "ServerNotification__CollabAgentStatus" });

export type ServerNotification__CollabAgentToolCallStatus =
  | "inProgress"
  | "completed"
  | "failed"
  | "interrupted";
export const ServerNotification__CollabAgentToolCallStatus = Schema.Literals([
  "inProgress",
  "completed",
  "failed",
  "interrupted",
]).annotate({ identifier: "ServerNotification__CollabAgentToolCallStatus" });

export type ServerNotification__CollabAgentTool =
  | "spawnAgent"
  | "sendInput"
  | "resumeAgent"
  | "wait"
  | "closeAgent"
  | "sendMessage"
  | "followupTask"
  | "interruptAgent"
  | "listAgents";
export const ServerNotification__CollabAgentTool = Schema.Literals([
  "spawnAgent",
  "sendInput",
  "resumeAgent",
  "wait",
  "closeAgent",
  "sendMessage",
  "followupTask",
  "interruptAgent",
  "listAgents",
]).annotate({ identifier: "ServerNotification__CollabAgentTool" });

export type ServerNotification__SubAgentActivityKind =
  | "started"
  | "interacted"
  | "interrupted"
  | "completed";
export const ServerNotification__SubAgentActivityKind = Schema.Literals([
  "started",
  "interacted",
  "interrupted",
  "completed",
]).annotate({ identifier: "ServerNotification__SubAgentActivityKind" });

export type ServerNotification__WebSearchAction =
  | {
      readonly queries?: ReadonlyArray<string> | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly type: "openPage"; readonly url?: string | null }
  | { readonly pattern?: string | null; readonly type: "findInPage"; readonly url?: string | null }
  | { readonly type: "other" };
export const ServerNotification__WebSearchAction = Schema.Union(
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
).annotate({ identifier: "ServerNotification__WebSearchAction" });

export type ServerNotification__ImageGenerationFailure = {
  readonly limitId: string;
  readonly resetsAt?: number | null;
  readonly type: "usageLimitExceeded";
};
export const ServerNotification__ImageGenerationFailure = Schema.Union(
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
).annotate({ identifier: "ServerNotification__ImageGenerationFailure" });

export type ServerNotification__TurnItemsView = "notLoaded" | "summary" | "full";
export const ServerNotification__TurnItemsView = Schema.Union(
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
).annotate({ identifier: "ServerNotification__TurnItemsView" });

export type ServerNotification__TurnStatus = "completed" | "interrupted" | "failed" | "inProgress";
export const ServerNotification__TurnStatus = Schema.Literals([
  "completed",
  "interrupted",
  "failed",
  "inProgress",
]).annotate({ identifier: "ServerNotification__TurnStatus" });

export type ServerNotification__ThreadArchivedNotification = { readonly threadId: string };
export const ServerNotification__ThreadArchivedNotification = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadArchivedNotification" });

export type ServerNotification__ThreadDeletedNotification = { readonly threadId: string };
export const ServerNotification__ThreadDeletedNotification = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadDeletedNotification" });

export type ServerNotification__ThreadUnarchivedNotification = { readonly threadId: string };
export const ServerNotification__ThreadUnarchivedNotification = Schema.Struct({
  threadId: Schema.String,
}).annotate({ identifier: "ServerNotification__ThreadUnarchivedNotification" });
