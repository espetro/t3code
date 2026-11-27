import * as Schema from "effect/Schema";
import {
  AuthMethodId,
  BlobResourceContents,
  BooleanConfigOptionCapabilities,
  ElicitationContentValue,
  ElicitationFormCapabilities,
  ElicitationId,
  ElicitationUrlCapabilities,
  EnvVariable,
  ErrorCode,
  LlmProtocol,
  LogoutCapabilities,
  McpConnectionId,
  McpServerAcpId,
  NesDiagnosticsCapabilities,
  NesDocumentDidCloseCapabilities,
  NesDocumentDidFocusCapabilities,
  NesDocumentDidOpenCapabilities,
  NesDocumentDidSaveCapabilities,
  NesEditHistoryCapabilities,
  NesExcerpt,
  NesJumpCapabilities,
  NesOpenFilesCapabilities,
  NesRecentFilesCapabilities,
  NesRejectReason,
  NesRelatedSnippetsCapabilities,
  NesRenameCapabilities,
  NesRepository,
  NesSearchAndReplaceCapabilities,
  NesSuggestionId,
  NesUserActionsCapabilities,
  PermissionOptionId,
  PermissionOptionKind,
  PlanEntryPriority,
  PlanEntryStatus,
  PlanId,
  Position,
  ProviderId,
  Role,
  SessionAdditionalDirectoriesCapabilities,
  SessionCloseCapabilities,
  SessionConfigGroupId,
  SessionConfigId,
  SessionConfigValueId,
  SessionDeleteCapabilities,
  SessionForkCapabilities,
  SessionId,
  SessionInfo,
  SessionListCapabilities,
  SessionModeId,
  SessionResumeCapabilities,
  StopReason,
  TerminalExitStatus,
  TerminalId,
  TextDocumentSyncKind,
  TextResourceContents,
  TitledMultiSelectItems,
  UnstructuredCommandInput,
  Usage,
  WorkspaceFolder,
} from "./schema-v1.gen.part0.ts";

export type CancelNotification = {
  readonly sessionId: SessionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CancelNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the session to cancel operations for.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Notification to cancel ongoing operations for a session.\n\nSee protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/prompt-turn#cancellation)",
  identifier: "CancelNotification",
});

export type DidOpenDocumentNotification = {
  readonly sessionId: SessionId;
  readonly uri: string;
  readonly languageId: string;
  readonly version: number;
  readonly text: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DidOpenDocumentNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  uri: Schema.String.annotate({ description: "The URI of the opened document." }),
  languageId: Schema.String.annotate({
    description: 'The language identifier of the document (e.g., "rust", "python").',
  }),
  version: Schema.Number.annotate({
    description: "The version number of the document.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  text: Schema.String.annotate({ description: "The full text content of the document." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Notification sent when a file is opened in the editor.",
  identifier: "DidOpenDocumentNotification",
});

export type DidCloseDocumentNotification = {
  readonly sessionId: SessionId;
  readonly uri: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DidCloseDocumentNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  uri: Schema.String.annotate({ description: "The URI of the closed document." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Notification sent when a file is closed.",
  identifier: "DidCloseDocumentNotification",
});

export type DidSaveDocumentNotification = {
  readonly sessionId: SessionId;
  readonly uri: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DidSaveDocumentNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  uri: Schema.String.annotate({ description: "The URI of the saved document." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Notification sent when a file is saved.",
  identifier: "DidSaveDocumentNotification",
});

export type DeleteSessionRequest = {
  readonly sessionId: SessionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DeleteSessionRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the session to delete.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Request parameters for deleting an existing session from `session/list`.\n\nOnly available if the Agent supports the `sessionCapabilities.delete` capability.",
  identifier: "DeleteSessionRequest",
});

export type CloseSessionRequest = {
  readonly sessionId: SessionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CloseSessionRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the session to close.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Request parameters for closing an active session.\n\nIf supported, the agent **must** cancel any ongoing work related to the session\n(treat it as if `session/cancel` was called) and then free up any resources\nassociated with the session.\n\nOnly available if the Agent supports the `sessionCapabilities.close` capability.",
  identifier: "CloseSessionRequest",
});

export type CloseNesRequest = {
  readonly sessionId: SessionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CloseNesRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the NES session to close.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Request to close an NES session.\n\nThe agent **must** cancel any ongoing work related to the NES session\nand then free up any resources associated with the session.",
  identifier: "CloseNesRequest",
});

export type AcceptNesNotification = {
  readonly sessionId: SessionId;
  readonly id: NesSuggestionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AcceptNesNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  id: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
    description: "The ID of the accepted suggestion.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Notification sent when a suggestion is accepted.",
  identifier: "AcceptNesNotification",
});

export type AgentAuthCapabilities = {
  readonly logout?: LogoutCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AgentAuthCapabilities = Schema.Struct({
  logout: Schema.optionalKey(
    Schema.Union([LogoutCapabilities, Schema.Null]).annotate({
      description:
        "Whether the agent supports the logout method.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports the logout method.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Authentication-related capabilities supported by the agent.",
  identifier: "AgentAuthCapabilities",
});

export type SessionCapabilities = {
  readonly list?: SessionListCapabilities | null;
  readonly delete?: SessionDeleteCapabilities | null;
  readonly additionalDirectories?: SessionAdditionalDirectoriesCapabilities | null;
  readonly fork?: SessionForkCapabilities | null;
  readonly resume?: SessionResumeCapabilities | null;
  readonly close?: SessionCloseCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionCapabilities = Schema.Struct({
  list: Schema.optionalKey(
    Schema.Union([SessionListCapabilities, Schema.Null]).annotate({
      description:
        "Whether the agent supports `session/list`.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports listing sessions.",
    }),
  ),
  delete: Schema.optionalKey(
    Schema.Union([SessionDeleteCapabilities, Schema.Null]).annotate({
      description:
        "Whether the agent supports `session/delete`.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports deleting sessions from `session/list`.",
    }),
  ),
  additionalDirectories: Schema.optionalKey(
    Schema.Union([SessionAdditionalDirectoriesCapabilities, Schema.Null]).annotate({
      description:
        "Whether the agent supports `additionalDirectories` on supported session lifecycle requests.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports `additionalDirectories` on\nsupported session lifecycle requests.\n\nAgents that also support `session/list` may return\n`SessionInfo.additionalDirectories` to report the complete ordered\nadditional-root list associated with a listed session.",
    }),
  ),
  fork: Schema.optionalKey(
    Schema.Union([SessionForkCapabilities, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nWhether the agent supports `session/fork`.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports forking sessions.",
    }),
  ),
  resume: Schema.optionalKey(
    Schema.Union([SessionResumeCapabilities, Schema.Null]).annotate({
      description:
        "Whether the agent supports `session/resume`.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports resuming sessions.",
    }),
  ),
  close: Schema.optionalKey(
    Schema.Union([SessionCloseCapabilities, Schema.Null]).annotate({
      description:
        "Whether the agent supports `session/close`.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports closing sessions.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Session capabilities supported by the agent.\n\nAs a baseline, all Agents **MUST** support `session/new`, `session/prompt`, `session/cancel`, and `session/update`.\n\nOptionally, they **MAY** support other session methods and notifications by specifying additional capabilities.\n\nNote: `session/load` is still handled by the top-level `load_session` capability. This will be unified in future versions of the protocol.\n\nSee protocol docs: [Session Capabilities](https://agentclientprotocol.com/protocol/initialization#session-capabilities)",
  identifier: "SessionCapabilities",
});

export type NesDocumentDidChangeCapabilities = {
  readonly syncKind: TextDocumentSyncKind;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesDocumentDidChangeCapabilities = Schema.Struct({
  syncKind: Schema.suspend((): Schema.Codec<TextDocumentSyncKind> => TextDocumentSyncKind).annotate(
    { description: 'The sync kind the agent wants: `"full"` or `"incremental"`.' },
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Capabilities for `document/didChange` events.",
  identifier: "NesDocumentDidChangeCapabilities",
});

export type NesContextCapabilities = {
  readonly recentFiles?: NesRecentFilesCapabilities | null;
  readonly relatedSnippets?: NesRelatedSnippetsCapabilities | null;
  readonly editHistory?: NesEditHistoryCapabilities | null;
  readonly userActions?: NesUserActionsCapabilities | null;
  readonly openFiles?: NesOpenFilesCapabilities | null;
  readonly diagnostics?: NesDiagnosticsCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesContextCapabilities = Schema.Struct({
  recentFiles: Schema.optionalKey(
    Schema.Union([NesRecentFilesCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants recent files context.",
    }),
  ),
  relatedSnippets: Schema.optionalKey(
    Schema.Union([NesRelatedSnippetsCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants related snippets context.",
    }),
  ),
  editHistory: Schema.optionalKey(
    Schema.Union([NesEditHistoryCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants edit history context.",
    }),
  ),
  userActions: Schema.optionalKey(
    Schema.Union([NesUserActionsCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants user actions context.",
    }),
  ),
  openFiles: Schema.optionalKey(
    Schema.Union([NesOpenFilesCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants open files context.",
    }),
  ),
  diagnostics: Schema.optionalKey(
    Schema.Union([NesDiagnosticsCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants diagnostics context.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Context capabilities the agent wants attached to each suggestion request.",
  identifier: "NesContextCapabilities",
});

export type Annotations = {
  readonly audience?: ReadonlyArray<Role> | null;
  readonly lastModified?: string | null;
  readonly priority?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Annotations = Schema.Struct({
  audience: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Role).annotate({
        description: "Intended recipients for this content, such as the user or assistant.",
      }),
      Schema.Null,
    ]),
  ),
  lastModified: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Timestamp indicating when the underlying resource was last modified.",
      }),
      Schema.Null,
    ]),
  ),
  priority: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Relative importance of this content when clients choose what to surface.",
        format: "double",
      }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Optional annotations for the client. The client can use annotations to inform how objects are used or displayed",
  identifier: "Annotations",
});

export type EmbeddedResourceResource = TextResourceContents | BlobResourceContents;
export const EmbeddedResourceResource = Schema.Union([
  Schema.suspend((): Schema.Codec<TextResourceContents> => TextResourceContents).annotate({
    title: "TextResourceContents",
    description: "Text resource contents embedded directly in the message.",
  }),
  Schema.suspend((): Schema.Codec<BlobResourceContents> => BlobResourceContents).annotate({
    title: "BlobResourceContents",
    description: "Binary resource contents embedded directly in the message.",
  }),
]).annotate({
  description: "Resource content that can be embedded in a message.",
  identifier: "EmbeddedResourceResource",
});

export type TerminalOutputRequest = {
  readonly sessionId: SessionId;
  readonly terminalId: TerminalId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TerminalOutputRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
    description: "The ID of the terminal to get output from.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Request to get the current output and status of a terminal.",
  identifier: "TerminalOutputRequest",
});

export type ReleaseTerminalRequest = {
  readonly sessionId: SessionId;
  readonly terminalId: TerminalId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ReleaseTerminalRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
    description: "The ID of the terminal to release.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Request to release a terminal and free its resources.",
  identifier: "ReleaseTerminalRequest",
});

export type WaitForTerminalExitRequest = {
  readonly sessionId: SessionId;
  readonly terminalId: TerminalId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const WaitForTerminalExitRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
    description: "The ID of the terminal to wait for.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Request to wait for a terminal command to exit.",
  identifier: "WaitForTerminalExitRequest",
});

export type KillTerminalRequest = {
  readonly sessionId: SessionId;
  readonly terminalId: TerminalId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const KillTerminalRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
    description: "The ID of the terminal to kill.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Request to kill a terminal without releasing it.",
  identifier: "KillTerminalRequest",
});

export type CreateTerminalResponse = {
  readonly terminalId: TerminalId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CreateTerminalResponse = Schema.Struct({
  terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
    description: "The unique identifier for the created terminal.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Response containing the ID of the created terminal.",
  identifier: "CreateTerminalResponse",
});

export type PlanEntry = {
  readonly content: string;
  readonly priority: PlanEntryPriority;
  readonly status: PlanEntryStatus;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PlanEntry = Schema.Struct({
  content: Schema.String.annotate({
    description: "Human-readable description of what this task aims to accomplish.",
  }),
  priority: Schema.suspend((): Schema.Codec<PlanEntryPriority> => PlanEntryPriority).annotate({
    description:
      "The relative importance of this task.\nUsed to indicate which tasks are most critical to the overall goal.",
  }),
  status: Schema.suspend((): Schema.Codec<PlanEntryStatus> => PlanEntryStatus).annotate({
    description: "Current execution status of this task.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "A single entry in the execution plan.\n\nRepresents a task or goal that the assistant intends to accomplish\nas part of fulfilling the user's request.\nSee protocol docs: [Plan Entries](https://agentclientprotocol.com/protocol/agent-plan#plan-entries)",
  identifier: "PlanEntry",
});

export type AvailableCommandInput = UnstructuredCommandInput;
export const AvailableCommandInput = Schema.Union([
  Schema.suspend((): Schema.Codec<UnstructuredCommandInput> => UnstructuredCommandInput).annotate({
    title: "unstructured",
    description: "All text that was typed after the command name is provided as input.",
  }),
]).annotate({
  description: "The input specification for a command.",
  identifier: "AvailableCommandInput",
});

export type SessionMode = {
  readonly id: SessionModeId;
  readonly name: string;
  readonly description?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionMode = Schema.Struct({
  id: Schema.suspend((): Schema.Codec<SessionModeId> => SessionModeId).annotate({
    description: "Stable identifier used to refer to this protocol object in later messages.",
  }),
  name: Schema.String.annotate({
    description: "Human-readable name shown for this protocol object.",
  }),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable details shown with this protocol object.",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "A mode the agent can operate in.\n\nSee protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)",
  identifier: "SessionMode",
});

export type SetSessionModeRequest = {
  readonly sessionId: SessionId;
  readonly modeId: SessionModeId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SetSessionModeRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the session to set the mode for.",
  }),
  modeId: Schema.suspend((): Schema.Codec<SessionModeId> => SessionModeId).annotate({
    description: "The ID of the mode to set.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Request parameters for setting a session mode.",
  identifier: "SetSessionModeRequest",
});

export type SessionConfigSelectOption = {
  readonly value: SessionConfigValueId;
  readonly name: string;
  readonly description?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionConfigSelectOption = Schema.Struct({
  value: Schema.suspend((): Schema.Codec<SessionConfigValueId> => SessionConfigValueId).annotate({
    description: "Unique identifier for this option value.",
  }),
  name: Schema.String.annotate({ description: "Human-readable label for this option value." }),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional description for this option value." }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "A possible value for a session configuration option.",
  identifier: "SessionConfigSelectOption",
});

export type SetSessionConfigOptionRequest =
  | {
      readonly sessionId: SessionId;
      readonly configId: SessionConfigId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly value: boolean;
      readonly type: "boolean";
    }
  | {
      readonly sessionId: SessionId;
      readonly configId: SessionConfigId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly value: SessionConfigValueId;
    };
export const SetSessionConfigOptionRequest = Schema.Union([
  Schema.Struct({
    sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
      description: "The ID of the session to set the configuration option for.",
    }),
    configId: Schema.suspend((): Schema.Codec<SessionConfigId> => SessionConfigId).annotate({
      description: "The ID of the configuration option to set.",
    }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    value: Schema.Boolean.annotate({ description: "The boolean value." }),
    type: Schema.Literal("boolean"),
  }).annotate({ description: 'A boolean value (`type: "boolean"`).' }),
  Schema.Struct({
    sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
      description: "The ID of the session to set the configuration option for.",
    }),
    configId: Schema.suspend((): Schema.Codec<SessionConfigId> => SessionConfigId).annotate({
      description: "The ID of the configuration option to set.",
    }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    value: Schema.suspend((): Schema.Codec<SessionConfigValueId> => SessionConfigValueId).annotate({
      description: "The value ID.",
    }),
  }).annotate({
    title: "value_id",
    description:
      "A [`SessionConfigValueId`] string value.\n\nThis is the default when `type` is absent on the wire. Unknown `type`\nvalues with string payloads also gracefully deserialize into this\nvariant.",
  }),
]).annotate({ identifier: "SetSessionConfigOptionRequest" });

export type CompleteElicitationNotification = {
  readonly elicitationId: ElicitationId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CompleteElicitationNotification = Schema.Struct({
  elicitationId: Schema.suspend((): Schema.Codec<ElicitationId> => ElicitationId).annotate({
    description: "The ID of the elicitation that completed.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Notification sent by the agent when a URL-based elicitation is complete.",
  identifier: "CompleteElicitationNotification",
});

export type MessageMcpNotification = {
  readonly connectionId: McpConnectionId;
  readonly method: string;
  readonly params?: { readonly [x: string]: Schema.Json } | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const MessageMcpNotification = Schema.Struct({
  connectionId: Schema.suspend((): Schema.Codec<McpConnectionId> => McpConnectionId).annotate({
    description: "The MCP-over-ACP connection this message is sent on.",
  }),
  method: Schema.String.annotate({ description: "The inner MCP method name." }),
  params: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "Optional inner MCP params.\n\nIf omitted or set to `null`, the inner MCP message has no params.",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nNotification parameters for `mcp/message`.\n\nThis is used when the wrapped MCP message is a notification and the outer JSON-RPC\nenvelope has no `id`.",
  identifier: "MessageMcpNotification",
});

export type MessageMcpRequest = {
  readonly connectionId: McpConnectionId;
  readonly method: string;
  readonly params?: { readonly [x: string]: Schema.Json } | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const MessageMcpRequest = Schema.Struct({
  connectionId: Schema.suspend((): Schema.Codec<McpConnectionId> => McpConnectionId).annotate({
    description: "The MCP-over-ACP connection this message is sent on.",
  }),
  method: Schema.String.annotate({ description: "The inner MCP method name." }),
  params: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "Optional inner MCP params.\n\nIf omitted or set to `null`, the inner MCP message has no params.",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for `mcp/message`.",
  identifier: "MessageMcpRequest",
});

export type DisconnectMcpRequest = {
  readonly connectionId: McpConnectionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DisconnectMcpRequest = Schema.Struct({
  connectionId: Schema.suspend((): Schema.Codec<McpConnectionId> => McpConnectionId).annotate({
    description: "The MCP-over-ACP connection to close.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for `mcp/disconnect`.",
  identifier: "DisconnectMcpRequest",
});

export type ConnectMcpResponse = {
  readonly connectionId: McpConnectionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ConnectMcpResponse = Schema.Struct({
  connectionId: Schema.suspend((): Schema.Codec<McpConnectionId> => McpConnectionId).annotate({
    description: "The unique identifier for this MCP-over-ACP connection.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse to `mcp/connect`.",
  identifier: "ConnectMcpResponse",
});

export type RequestPermissionOutcome =
  | { readonly outcome: "cancelled" }
  | {
      readonly outcome: "selected";
      readonly optionId: PermissionOptionId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    };
export const RequestPermissionOutcome = Schema.Union([
  Schema.Struct({ outcome: Schema.Literal("cancelled") }).annotate({
    description:
      "The prompt turn was cancelled before the user responded.\n\nWhen a client sends a `session/cancel` notification to cancel an ongoing\nprompt turn, it MUST respond to all pending `session/request_permission`\nrequests with this `Cancelled` outcome.\n\nSee protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/prompt-turn#cancellation)",
  }),
  Schema.Struct({
    outcome: Schema.Literal("selected"),
    optionId: Schema.suspend((): Schema.Codec<PermissionOptionId> => PermissionOptionId).annotate({
      description: "The ID of the option the user selected.",
    }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "The user selected one of the provided options." }),
]).annotate({
  description: "The outcome of a permission request.",
  identifier: "RequestPermissionOutcome",
});

export type PermissionOption = {
  readonly optionId: PermissionOptionId;
  readonly name: string;
  readonly kind: PermissionOptionKind;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PermissionOption = Schema.Struct({
  optionId: Schema.suspend((): Schema.Codec<PermissionOptionId> => PermissionOptionId).annotate({
    description: "Unique identifier for this permission option.",
  }),
  name: Schema.String.annotate({ description: "Human-readable label to display to the user." }),
  kind: Schema.suspend((): Schema.Codec<PermissionOptionKind> => PermissionOptionKind).annotate({
    description: "Hint about the nature of this permission option.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "An option presented to the user when requesting permission.",
  identifier: "PermissionOption",
});

export type CreateTerminalRequest = {
  readonly sessionId: SessionId;
  readonly command: string;
  readonly args?: ReadonlyArray<string>;
  readonly env?: ReadonlyArray<EnvVariable>;
  readonly cwd?: string | null;
  readonly outputByteLimit?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CreateTerminalRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  command: Schema.String.annotate({ description: "The command to execute." }),
  args: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({ description: "Array of command arguments." }),
  ),
  env: Schema.optionalKey(
    Schema.Array(EnvVariable).annotate({ description: "Environment variables for the command." }),
  ),
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Working directory for the command. Must be an absolute path.",
      }),
      Schema.Null,
    ]),
  ),
  outputByteLimit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Maximum number of output bytes to retain.\n\nWhen the limit is exceeded, the Client truncates from the beginning of the output\nto stay within the limit.\n\nThe Client MUST ensure truncation happens at a character boundary to maintain valid\nstring output, even if this means the retained output is slightly less than the\nspecified limit.",
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
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Request to create a new terminal and execute a command.",
  identifier: "CreateTerminalRequest",
});

export type McpServerStdio = {
  readonly name: string;
  readonly command: string;
  readonly args: ReadonlyArray<string>;
  readonly env: ReadonlyArray<EnvVariable>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const McpServerStdio = Schema.Struct({
  name: Schema.String.annotate({ description: "Human-readable name identifying this MCP server." }),
  command: Schema.String.annotate({ description: "Absolute path to the MCP server executable." }),
  args: Schema.Array(Schema.String).annotate({
    description: "Command-line arguments to pass to the MCP server.",
  }),
  env: Schema.Array(EnvVariable).annotate({
    description: "Environment variables to set when launching the MCP server.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Stdio transport configuration for MCP.",
  identifier: "McpServerStdio",
});

export type MultiSelectItems =
  | {
      readonly type: "string";
      readonly enum: ReadonlyArray<string>;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly type: string } & { readonly [x: string]: Schema.Json })
  | TitledMultiSelectItems;
export const MultiSelectItems = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("string"),
    enum: Schema.Array(Schema.String).annotate({ description: "Allowed enum values." }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "String item schema for multi-select enum properties." }),
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Custom or future multi-select item type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(new RegExp("^(?!(?:\\x73tring)$)[\\s\\S]*$")).annotate({
          expected: "a string matching the RegExp ^(?!(?:\\x73tring)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({ title: "other", description: "Custom or future typed multi-select items." }),
  Schema.suspend((): Schema.Codec<TitledMultiSelectItems> => TitledMultiSelectItems).annotate({
    title: "titled",
    description: "Titled multi-select items with human-readable labels.",
  }),
]).annotate({
  description: "Items for a multi-select (array) property schema.",
  identifier: "MultiSelectItems",
});

export type ConnectMcpRequest = {
  readonly serverId: McpServerAcpId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ConnectMcpRequest = Schema.Struct({
  serverId: Schema.suspend((): Schema.Codec<McpServerAcpId> => McpServerAcpId).annotate({
    description:
      "The ACP MCP server ID that was provided by the component declaring the MCP server.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for `mcp/connect`.",
  identifier: "ConnectMcpRequest",
});

export type AuthMethodAgent = {
  readonly id: AuthMethodId;
  readonly name: string;
  readonly description?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AuthMethodAgent = Schema.Struct({
  id: Schema.suspend((): Schema.Codec<AuthMethodId> => AuthMethodId).annotate({
    description: "Unique identifier for this authentication method.",
  }),
  name: Schema.String.annotate({
    description: "Human-readable name of the authentication method.",
  }),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional description providing more details about this authentication method.",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Agent handles authentication itself through `authenticate`.\n\nThis is the default authentication method type.",
  identifier: "AuthMethodAgent",
});

export type AuthenticateRequest = {
  readonly methodId: AuthMethodId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AuthenticateRequest = Schema.Struct({
  methodId: Schema.suspend((): Schema.Codec<AuthMethodId> => AuthMethodId).annotate({
    description:
      "The ID of the authentication method to use.\nMust be one of the methods advertised in the initialize response.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Request parameters for the authenticate method.\n\nSpecifies which authentication method to use.",
  identifier: "AuthenticateRequest",
});

export type DisableProviderRequest = {
  readonly providerId: ProviderId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DisableProviderRequest = Schema.Struct({
  providerId: Schema.suspend((): Schema.Codec<ProviderId> => ProviderId).annotate({
    description: "Provider ID to disable.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for `providers/disable`.",
  identifier: "DisableProviderRequest",
});

export type ProviderCurrentConfig = {
  readonly apiType: LlmProtocol;
  readonly baseUrl: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ProviderCurrentConfig = Schema.Struct({
  apiType: Schema.suspend((): Schema.Codec<LlmProtocol> => LlmProtocol).annotate({
    description: "Protocol currently used by this provider.",
  }),
  baseUrl: Schema.String.annotate({ description: "Base URL currently used by this provider." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nCurrent effective non-secret routing configuration for a provider.",
  identifier: "ProviderCurrentConfig",
});

export type SetProviderRequest = {
  readonly providerId: ProviderId;
  readonly apiType: LlmProtocol;
  readonly baseUrl: string;
  readonly headers?: { readonly [x: string]: string };
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SetProviderRequest = Schema.Struct({
  providerId: Schema.suspend((): Schema.Codec<ProviderId> => ProviderId).annotate({
    description: "Provider ID to configure.",
  }),
  apiType: Schema.suspend((): Schema.Codec<LlmProtocol> => LlmProtocol).annotate({
    description: "Protocol type for this provider.",
  }),
  baseUrl: Schema.String.annotate({
    description: "Base URL for requests sent through this provider.",
  }),
  headers: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Full headers map for this provider.\nMay include authorization, routing, or other integration-specific headers.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for `providers/set`.\n\nReplaces the full configuration for one provider ID.",
  identifier: "SetProviderRequest",
});

export type PromptResponse = {
  readonly stopReason: StopReason;
  readonly usage?: Usage | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PromptResponse = Schema.Struct({
  stopReason: Schema.suspend((): Schema.Codec<StopReason> => StopReason).annotate({
    description: "Indicates why the agent stopped processing the turn.",
  }),
  usage: Schema.optionalKey(
    Schema.Union([Usage, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nToken usage for this turn (optional).",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Response from processing a user prompt.\n\nSee protocol docs: [Check for Completion](https://agentclientprotocol.com/protocol/prompt-turn#4-check-for-completion)",
  identifier: "PromptResponse",
});

export type Range = {
  readonly start: Position;
  readonly end: Position;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Range = Schema.Struct({
  start: Schema.suspend((): Schema.Codec<Position> => Position).annotate({
    description: "The start position (inclusive).",
  }),
  end: Schema.suspend((): Schema.Codec<Position> => Position).annotate({
    description: "The end position (exclusive).",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "A range in a text document, expressed as start and end positions.",
  identifier: "Range",
});

export type NesUserAction = {
  readonly action: string;
  readonly uri: string;
  readonly position: Position;
  readonly timestampMs: number;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesUserAction = Schema.Struct({
  action: Schema.String.annotate({
    description: 'The kind of action (e.g., "insertChar", "cursorMovement").',
  }),
  uri: Schema.String.annotate({ description: "The URI of the file where the action occurred." }),
  position: Schema.suspend((): Schema.Codec<Position> => Position).annotate({
    description: "The position where the action occurred.",
  }),
  timestampMs: Schema.Number.annotate({
    description: "Timestamp in milliseconds since epoch.",
    format: "uint64",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "A user action (typing, cursor movement, etc.).",
  identifier: "NesUserAction",
});

export type Error = {
  readonly code: ErrorCode;
  readonly message: string;
  readonly data?: Schema.Json;
};
export const Error = Schema.Struct({
  code: Schema.suspend((): Schema.Codec<ErrorCode> => ErrorCode).annotate({
    description:
      "A number indicating the error type that occurred.\nThis must be an integer as defined in the JSON-RPC specification.",
  }),
  message: Schema.String.annotate({
    description:
      "A string providing a short description of the error.\nThe message should be limited to a concise single sentence.",
  }),
  data: Schema.optionalKey(
    Schema.Json.annotate({
      expected: "JSON value",
      description:
        "Optional primitive or structured value that contains additional information about the error.\nThis may include debugging information or context-specific details.",
    }),
  ),
}).annotate({
  description:
    "JSON-RPC error object.\n\nRepresents an error that occurred during method execution, following the\nJSON-RPC 2.0 error object specification with optional additional data.\n\nSee protocol docs: [JSON-RPC Error Object](https://www.jsonrpc.org/specification#error_object)",
  identifier: "Error",
});

export type SessionConfigOptionsCapabilities = {
  readonly boolean?: BooleanConfigOptionCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionConfigOptionsCapabilities = Schema.Struct({
  boolean: Schema.optionalKey(
    Schema.Union([BooleanConfigOptionCapabilities, Schema.Null]).annotate({
      description:
        'Whether the client supports boolean session configuration options.\n\nOptional. Omitted or `null` both mean the client does not advertise support.\nSupplying `{}` means agents may include `type: "boolean"` entries in\n`configOptions`, and the client may send `session/set_config_option`\nrequests with `type: "boolean"` and a boolean `value`.',
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Session configuration option capabilities supported by the client.",
  identifier: "SessionConfigOptionsCapabilities",
});

export type ElicitationCapabilities = {
  readonly form?: ElicitationFormCapabilities | null;
  readonly url?: ElicitationUrlCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ElicitationCapabilities = Schema.Struct({
  form: Schema.optionalKey(
    Schema.Union([ElicitationFormCapabilities, Schema.Null]).annotate({
      description:
        "Whether the client supports form-based elicitation.\n\nOptional. Omitted and `null` are equivalent and mean form support is not advertised.\nSupplying `{}` explicitly advertises form support.",
    }),
  ),
  url: Schema.optionalKey(
    Schema.Union([ElicitationUrlCapabilities, Schema.Null]).annotate({
      description:
        "Whether the client supports URL-based elicitation.\n\nOptional. Omitted or `null` both mean the client does not advertise support.\nSupplying `{}` means the client supports URL-based elicitation.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Elicitation capabilities supported by the client.",
  identifier: "ElicitationCapabilities",
});

export type ClientNesCapabilities = {
  readonly jump?: NesJumpCapabilities | null;
  readonly rename?: NesRenameCapabilities | null;
  readonly searchAndReplace?: NesSearchAndReplaceCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ClientNesCapabilities = Schema.Struct({
  jump: Schema.optionalKey(
    Schema.Union([NesJumpCapabilities, Schema.Null]).annotate({
      description: "Whether the client supports the `jump` suggestion kind.",
    }),
  ),
  rename: Schema.optionalKey(
    Schema.Union([NesRenameCapabilities, Schema.Null]).annotate({
      description: "Whether the client supports the `rename` suggestion kind.",
    }),
  ),
  searchAndReplace: Schema.optionalKey(
    Schema.Union([NesSearchAndReplaceCapabilities, Schema.Null]).annotate({
      description: "Whether the client supports the `searchAndReplace` suggestion kind.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "NES capabilities advertised by the client during initialization.",
  identifier: "ClientNesCapabilities",
});

export type RejectNesNotification = {
  readonly sessionId: SessionId;
  readonly id: NesSuggestionId;
  readonly reason?: NesRejectReason | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const RejectNesNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  id: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
    description: "The ID of the rejected suggestion.",
  }),
  reason: Schema.optionalKey(
    Schema.Union([NesRejectReason, Schema.Null]).annotate({
      description: "The reason for rejection.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Notification sent when a suggestion is rejected.",
  identifier: "RejectNesNotification",
});

export type StartNesRequest = {
  readonly workspaceUri?: string | null;
  readonly workspaceFolders?: ReadonlyArray<WorkspaceFolder> | null;
  readonly repository?: NesRepository | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const StartNesRequest = Schema.Struct({
  workspaceUri: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "The root URI of the workspace." }),
      Schema.Null,
    ]),
  ),
  workspaceFolders: Schema.optionalKey(
    Schema.Union([
      Schema.Array(WorkspaceFolder).annotate({ description: "The workspace folders." }),
      Schema.Null,
    ]),
  ),
  repository: Schema.optionalKey(
    Schema.Union([NesRepository, Schema.Null]).annotate({
      description: "Repository metadata, if the workspace is a git repository.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Request to start an NES session.", identifier: "StartNesRequest" });

export type NesRelatedSnippet = {
  readonly uri: string;
  readonly excerpts: ReadonlyArray<NesExcerpt>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesRelatedSnippet = Schema.Struct({
  uri: Schema.String.annotate({ description: "The URI of the file containing the snippets." }),
  excerpts: Schema.Array(NesExcerpt).annotate({ description: "The code excerpts." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "A related code snippet from a file.",
  identifier: "NesRelatedSnippet",
});

export type TerminalOutputResponse = {
  readonly output: string;
  readonly truncated: boolean;
  readonly exitStatus?: TerminalExitStatus | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TerminalOutputResponse = Schema.Struct({
  output: Schema.String.annotate({ description: "The terminal output captured so far." }),
  truncated: Schema.Boolean.annotate({
    description: "Whether the output was truncated due to byte limits.",
  }),
  exitStatus: Schema.optionalKey(
    Schema.Union([TerminalExitStatus, Schema.Null]).annotate({
      description: "Exit status if the command has completed.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Response containing the terminal output and exit status.",
  identifier: "TerminalOutputResponse",
});

export type CreateElicitationResponse =
  | {
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly action: "accept";
      readonly content?: { readonly [x: string]: ElicitationContentValue } | null;
    }
  | { readonly _meta?: { readonly [x: string]: Schema.Json } | null; readonly action: "decline" }
  | { readonly _meta?: { readonly [x: string]: Schema.Json } | null; readonly action: "cancel" }
  | ({ readonly _meta?: { readonly [x: string]: Schema.Json } | null; readonly action: string } & {
      readonly [x: string]: Schema.Json;
    });
export const CreateElicitationResponse = Schema.Union([
  Schema.Struct({
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    action: Schema.Literal("accept"),
    content: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, ElicitationContentValue).annotate({
          description:
            "The user-provided content, if any, as an object matching the requested schema.",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "The user accepted the elicitation and provided content." }),
  Schema.Struct({
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    action: Schema.Literal("decline"),
  }).annotate({ description: "The user declined the elicitation." }),
  Schema.Struct({
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    action: Schema.Literal("cancel"),
  }).annotate({ description: "The elicitation was cancelled." }),
  Schema.StructWithRest(
    Schema.Struct({
      _meta: Schema.optionalKey(
        Schema.Union([
          Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
            description:
              "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
          }),
          Schema.Null,
        ]),
      ),
      action: Schema.String.annotate({
        description:
          "Custom or future elicitation action.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp("^(?!(?:\\x61ccept|\\x64ecline|\\x63ancel)$)[\\s\\S]*$"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x61ccept|\\x64ecline|\\x63ancel)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future elicitation action.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nAgents that do not understand this action should preserve the raw\npayload when storing, replaying, proxying, or forwarding elicitation\nresponses. They MUST NOT treat it as a known elicitation action.",
  }),
]).annotate({ identifier: "CreateElicitationResponse" });

export type ListSessionsResponse = {
  readonly sessions: ReadonlyArray<SessionInfo>;
  readonly nextCursor?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ListSessionsResponse = Schema.Struct({
  sessions: Schema.Array(SessionInfo).annotate({
    description: "Array of session information objects",
  }),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor token. If present, pass this in the next request's cursor parameter\nto fetch the next page. If absent, there are no more results.",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Response from listing sessions.", identifier: "ListSessionsResponse" });

export type NesDocumentEventCapabilities = {
  readonly didOpen?: NesDocumentDidOpenCapabilities | null;
  readonly didChange?: NesDocumentDidChangeCapabilities | null;
  readonly didClose?: NesDocumentDidCloseCapabilities | null;
  readonly didSave?: NesDocumentDidSaveCapabilities | null;
  readonly didFocus?: NesDocumentDidFocusCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesDocumentEventCapabilities = Schema.Struct({
  didOpen: Schema.optionalKey(
    Schema.Union([NesDocumentDidOpenCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants `document/didOpen` events.",
    }),
  ),
  didChange: Schema.optionalKey(
    Schema.Union([NesDocumentDidChangeCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants `document/didChange` events, and the sync kind.",
    }),
  ),
  didClose: Schema.optionalKey(
    Schema.Union([NesDocumentDidCloseCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants `document/didClose` events.",
    }),
  ),
  didSave: Schema.optionalKey(
    Schema.Union([NesDocumentDidSaveCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants `document/didSave` events.",
    }),
  ),
  didFocus: Schema.optionalKey(
    Schema.Union([NesDocumentDidFocusCapabilities, Schema.Null]).annotate({
      description: "Whether the agent wants `document/didFocus` events.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Document event capabilities the agent wants to receive.",
  identifier: "NesDocumentEventCapabilities",
});

export type ContentBlock =
  | {
      readonly type: "text";
      readonly annotations?: Annotations | null;
      readonly text: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "image";
      readonly annotations?: Annotations | null;
      readonly data: string;
      readonly mimeType: string;
      readonly uri?: string | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "audio";
      readonly annotations?: Annotations | null;
      readonly data: string;
      readonly mimeType: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "resource_link";
      readonly annotations?: Annotations | null;
      readonly description?: string | null;
      readonly mimeType?: string | null;
      readonly name: string;
      readonly size?: number | null;
      readonly title?: string | null;
      readonly uri: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "resource";
      readonly annotations?: Annotations | null;
      readonly resource: EmbeddedResourceResource;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    };
export const ContentBlock = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("text"),
    annotations: Schema.optionalKey(
      Schema.Union([Annotations, Schema.Null]).annotate({
        description:
          "Optional annotations that help clients decide how to display or route this content.",
      }),
    ),
    text: Schema.String.annotate({ description: "Text payload carried by this content block." }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "Text provided to or from an LLM." }),
  Schema.Struct({
    type: Schema.Literal("image"),
    annotations: Schema.optionalKey(
      Schema.Union([Annotations, Schema.Null]).annotate({
        description:
          "Optional annotations that help clients decide how to display or route this content.",
      }),
    ),
    data: Schema.String.annotate({ description: "Base64-encoded media payload." }),
    mimeType: Schema.String.annotate({
      description: "MIME type describing the encoded media payload.",
    }),
    uri: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "URI associated with this resource or media payload.",
        }),
        Schema.Null,
      ]),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "An image provided to or from an LLM." }),
  Schema.Struct({
    type: Schema.Literal("audio"),
    annotations: Schema.optionalKey(
      Schema.Union([Annotations, Schema.Null]).annotate({
        description:
          "Optional annotations that help clients decide how to display or route this content.",
      }),
    ),
    data: Schema.String.annotate({ description: "Base64-encoded media payload." }),
    mimeType: Schema.String.annotate({
      description: "MIME type describing the encoded media payload.",
    }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "Audio provided to or from an LLM." }),
  Schema.Struct({
    type: Schema.Literal("resource_link"),
    annotations: Schema.optionalKey(
      Schema.Union([Annotations, Schema.Null]).annotate({
        description:
          "Optional annotations that help clients decide how to display or route this content.",
      }),
    ),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Optional human-readable details shown with this protocol object.",
        }),
        Schema.Null,
      ]),
    ),
    mimeType: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "MIME type describing the encoded media payload." }),
        Schema.Null,
      ]),
    ),
    name: Schema.String.annotate({
      description: "Human-readable name shown for this protocol object.",
    }),
    size: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description: "Optional size of the linked resource in bytes, if known.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
    ),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Optional display title for end-user UI." }),
        Schema.Null,
      ]),
    ),
    uri: Schema.String.annotate({
      description: "URI associated with this resource or media payload.",
    }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "A resource that the server is capable of reading, included in a prompt or tool call result.",
  }),
  Schema.Struct({
    type: Schema.Literal("resource"),
    annotations: Schema.optionalKey(
      Schema.Union([Annotations, Schema.Null]).annotate({
        description:
          "Optional annotations that help clients decide how to display or route this content.",
      }),
    ),
    resource: Schema.suspend(
      (): Schema.Codec<EmbeddedResourceResource> => EmbeddedResourceResource,
    ).annotate({ description: "Embedded resource payload, either text or binary data." }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description: "The contents of a resource, embedded into a prompt or tool call result.",
  }),
]).annotate({
  description:
    "Content blocks represent displayable information in the Agent Client Protocol.\n\nThey provide a structured way to handle various types of user-facing content—whether\nit's text from language models, images for analysis, or embedded resources for context.\n\nContent blocks appear in:\n- User prompts sent via `session/prompt`\n- Language model output streamed through `session/update` notifications\n- Progress updates and results from tool calls\n\nThis structure is compatible with the Model Context Protocol (MCP), enabling\nagents to seamlessly forward content from MCP tool outputs without transformation.\n\nSee protocol docs: [Content](https://agentclientprotocol.com/protocol/content)",
  identifier: "ContentBlock",
});

export type PlanUpdateContent =
  | {
      readonly type: "items";
      readonly planId: PlanId;
      readonly entries: ReadonlyArray<PlanEntry>;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "file";
      readonly planId: PlanId;
      readonly uri: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "markdown";
      readonly planId: PlanId;
      readonly content: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    };
export const PlanUpdateContent = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("items"),
    planId: Schema.suspend((): Schema.Codec<PlanId> => PlanId).annotate({
      description: "The plan ID to update.",
    }),
    entries: Schema.Array(PlanEntry).annotate({
      description:
        "The list of tasks to be accomplished.\n\nWhen updating an item-based plan, the agent must send a complete list of all entries\nwith their current status. The client replaces that plan with each update.",
    }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA plan represented as structured entries.",
  }),
  Schema.Struct({
    type: Schema.Literal("file"),
    planId: Schema.suspend((): Schema.Codec<PlanId> => PlanId).annotate({
      description: "The plan ID to update.",
    }),
    uri: Schema.String.annotate({ description: "The URI of the file containing the plan." }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA plan represented by a file URI.",
  }),
  Schema.Struct({
    type: Schema.Literal("markdown"),
    planId: Schema.suspend((): Schema.Codec<PlanId> => PlanId).annotate({
      description: "The plan ID to update.",
    }),
    content: Schema.String.annotate({ description: "Markdown content for the plan." }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA plan represented as raw markdown content.",
  }),
]).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nUpdated content for a plan.",
  identifier: "PlanUpdateContent",
});

export type AvailableCommand = {
  readonly name: string;
  readonly description: string;
  readonly input?: AvailableCommandInput | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AvailableCommand = Schema.Struct({
  name: Schema.String.annotate({
    description: "Command name (e.g., `create_plan`, `research_codebase`).",
  }),
  description: Schema.String.annotate({
    description: "Human-readable description of what the command does.",
  }),
  input: Schema.optionalKey(
    Schema.Union([AvailableCommandInput, Schema.Null]).annotate({
      description: "Input for the command if required",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Information about a command.", identifier: "AvailableCommand" });

export type SessionModeState = {
  readonly currentModeId: SessionModeId;
  readonly availableModes: ReadonlyArray<SessionMode>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionModeState = Schema.Struct({
  currentModeId: Schema.suspend((): Schema.Codec<SessionModeId> => SessionModeId).annotate({
    description: "The current mode the Agent is in.",
  }),
  availableModes: Schema.Array(SessionMode).annotate({
    description: "The set of modes that the Agent can operate in",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "The set of modes and the one currently active.",
  identifier: "SessionModeState",
});

export type SessionConfigSelectGroup = {
  readonly group: SessionConfigGroupId;
  readonly name: string;
  readonly options: ReadonlyArray<SessionConfigSelectOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionConfigSelectGroup = Schema.Struct({
  group: Schema.suspend((): Schema.Codec<SessionConfigGroupId> => SessionConfigGroupId).annotate({
    description: "Unique identifier for this group.",
  }),
  name: Schema.String.annotate({ description: "Human-readable label for this group." }),
  options: Schema.Array(SessionConfigSelectOption).annotate({
    description: "The set of option values in this group.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "A group of possible values for a session configuration option.",
  identifier: "SessionConfigSelectGroup",
});

export type RequestPermissionResponse = {
  readonly outcome: RequestPermissionOutcome;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const RequestPermissionResponse = Schema.Struct({
  outcome: Schema.suspend(
    (): Schema.Codec<RequestPermissionOutcome> => RequestPermissionOutcome,
  ).annotate({ description: "The user's decision on the permission request." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Response to a permission request.",
  identifier: "RequestPermissionResponse",
});
