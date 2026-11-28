/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";

export type SessionId = string;
export const SessionId = Schema.String.annotate({
  description:
    "A unique identifier for a conversation session between a client and agent.\n\nSessions maintain their own context, conversation history, and state,\nallowing multiple independent interactions with the same agent.\n\nSee protocol docs: [Session ID](https://agentclientprotocol.com/protocol/session-setup#session-id)",
  identifier: "SessionId",
});

export type NesSuggestionId = string;
export const NesSuggestionId = Schema.String.annotate({
  description: "Unique identifier for a next edit suggestion.",
  identifier: "NesSuggestionId",
});

export type LogoutCapabilities = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const LogoutCapabilities = Schema.Struct({
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
    "Logout capabilities supported by the agent.\n\nSupplying `{}` means the agent supports the logout method.",
  identifier: "LogoutCapabilities",
});

export type PromptCapabilities = {
  readonly image?: boolean;
  readonly audio?: boolean;
  readonly embeddedContext?: boolean;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PromptCapabilities = Schema.Struct({
  image: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Agent supports [`ContentBlock::Image`].",
      default: false,
    }),
  ),
  audio: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Agent supports [`ContentBlock::Audio`].",
      default: false,
    }),
  ),
  embeddedContext: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Agent supports embedded context in `session/prompt` requests.\n\nWhen enabled, the Client is allowed to include [`ContentBlock::Resource`]\nin prompt requests for pieces of context that are referenced in the message.",
      default: false,
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
    "Prompt capabilities supported by the agent in `session/prompt` requests.\n\nBaseline agent functionality requires support for [`ContentBlock::Text`]\nand [`ContentBlock::ResourceLink`] in prompt requests.\n\nOther variants must be explicitly opted in to.\nCapabilities for different types of content in prompt requests.\n\nIndicates which content types beyond the baseline (text and resource links)\nthe agent can process.\n\nSee protocol docs: [Prompt Capabilities](https://agentclientprotocol.com/protocol/initialization#prompt-capabilities)",
  identifier: "PromptCapabilities",
});

export type McpCapabilities = {
  readonly http?: boolean;
  readonly sse?: boolean;
  readonly acp?: boolean;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const McpCapabilities = Schema.Struct({
  http: Schema.optionalKey(
    Schema.Boolean.annotate({ description: "Agent supports [`McpServer::Http`].", default: false }),
  ),
  sse: Schema.optionalKey(
    Schema.Boolean.annotate({ description: "Agent supports [`McpServer::Sse`].", default: false }),
  ),
  acp: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nAgent supports [`McpServer::Acp`].",
      default: false,
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
  description: "MCP capabilities supported by the agent",
  identifier: "McpCapabilities",
});

export type SessionListCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionListCapabilities = Schema.Struct({
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
    "Capabilities for the `session/list` method.\n\nSupplying `{}` means the agent supports listing sessions.",
  identifier: "SessionListCapabilities",
});

export type SessionDeleteCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionDeleteCapabilities = Schema.Struct({
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
    "Capabilities for the `session/delete` method.\n\nSupplying `{}` means the agent supports deleting sessions from `session/list`.",
  identifier: "SessionDeleteCapabilities",
});

export type SessionAdditionalDirectoriesCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionAdditionalDirectoriesCapabilities = Schema.Struct({
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
    "Capabilities for additional session directories support.\n\nSupplying `{}` means the agent supports the `additionalDirectories` field on\nsupported session lifecycle requests. Agents that also support\n`session/list` may return `SessionInfo.additionalDirectories` to report the\ncomplete ordered additional-root list associated with a listed session.",
  identifier: "SessionAdditionalDirectoriesCapabilities",
});

export type SessionForkCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionForkCapabilities = Schema.Struct({
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nCapabilities for the `session/fork` method.\n\nSupplying `{}` means the agent supports forking sessions.",
  identifier: "SessionForkCapabilities",
});

export type SessionResumeCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionResumeCapabilities = Schema.Struct({
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
    "Capabilities for the `session/resume` method.\n\nSupplying `{}` means the agent supports resuming sessions.",
  identifier: "SessionResumeCapabilities",
});

export type SessionCloseCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionCloseCapabilities = Schema.Struct({
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
    "Capabilities for the `session/close` method.\n\nSupplying `{}` means the agent supports closing sessions.",
  identifier: "SessionCloseCapabilities",
});

export type ProvidersCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ProvidersCapabilities = Schema.Struct({
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nProvider configuration capabilities supported by the agent.\n\nSupplying `{}` means the agent supports provider configuration methods.",
  identifier: "ProvidersCapabilities",
});

export type NesDocumentDidOpenCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesDocumentDidOpenCapabilities = Schema.Struct({
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
  description: "Marker for `document/didOpen` capability support.",
  identifier: "NesDocumentDidOpenCapabilities",
});

export type TextDocumentSyncKind = "full" | "incremental";
export const TextDocumentSyncKind = Schema.Union([
  Schema.Literal("full").annotate({
    description: "Client sends the entire file content on each change.",
  }),
  Schema.Literal("incremental").annotate({ description: "Client sends only the changed ranges." }),
]).annotate({
  description: "How the agent wants document changes delivered.",
  identifier: "TextDocumentSyncKind",
});

export type NesDocumentDidCloseCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesDocumentDidCloseCapabilities = Schema.Struct({
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
  description: "Marker for `document/didClose` capability support.",
  identifier: "NesDocumentDidCloseCapabilities",
});

export type NesDocumentDidSaveCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesDocumentDidSaveCapabilities = Schema.Struct({
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
  description: "Marker for `document/didSave` capability support.",
  identifier: "NesDocumentDidSaveCapabilities",
});

export type NesDocumentDidFocusCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesDocumentDidFocusCapabilities = Schema.Struct({
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
  description: "Marker for `document/didFocus` capability support.",
  identifier: "NesDocumentDidFocusCapabilities",
});

export type NesRecentFilesCapabilities = {
  readonly maxCount?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesRecentFilesCapabilities = Schema.Struct({
  maxCount: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Maximum number of recent files the agent can use.",
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
  description: "Capabilities for recent files context.",
  identifier: "NesRecentFilesCapabilities",
});

export type NesRelatedSnippetsCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesRelatedSnippetsCapabilities = Schema.Struct({
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
  description: "Capabilities for related snippets context.",
  identifier: "NesRelatedSnippetsCapabilities",
});

export type NesEditHistoryCapabilities = {
  readonly maxCount?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesEditHistoryCapabilities = Schema.Struct({
  maxCount: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Maximum number of edit history entries the agent can use.",
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
  description: "Capabilities for edit history context.",
  identifier: "NesEditHistoryCapabilities",
});

export type NesUserActionsCapabilities = {
  readonly maxCount?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesUserActionsCapabilities = Schema.Struct({
  maxCount: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Maximum number of user actions the agent can use.",
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
  description: "Capabilities for user actions context.",
  identifier: "NesUserActionsCapabilities",
});

export type NesOpenFilesCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesOpenFilesCapabilities = Schema.Struct({
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
  description: "Capabilities for open files context.",
  identifier: "NesOpenFilesCapabilities",
});

export type NesDiagnosticsCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesDiagnosticsCapabilities = Schema.Struct({
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
  description: "Capabilities for diagnostics context.",
  identifier: "NesDiagnosticsCapabilities",
});

export type PositionEncodingKind = "utf-16" | "utf-32" | "utf-8";
export const PositionEncodingKind = Schema.Union([
  Schema.Literal("utf-16").annotate({
    description: "Character offsets count UTF-16 code units. This is the default.",
  }),
  Schema.Literal("utf-32").annotate({
    description: "Character offsets count Unicode code points.",
  }),
  Schema.Literal("utf-8").annotate({
    description: "Character offsets count UTF-8 code units (bytes).",
  }),
]).annotate({
  description:
    "The encoding used for character offsets in positions.\n\nFollows the same conventions as LSP 3.17. The default is UTF-16.",
  identifier: "PositionEncodingKind",
});

export type Role = "assistant" | "user";
export const Role = Schema.Union([
  Schema.Literal("assistant").annotate({ description: "The assistant side of a conversation." }),
  Schema.Literal("user").annotate({ description: "The user side of a conversation." }),
]).annotate({
  description: "The sender or recipient of messages and data in a conversation.",
  identifier: "Role",
});

export type TextResourceContents = {
  readonly mimeType?: string | null;
  readonly text: string;
  readonly uri: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TextResourceContents = Schema.Struct({
  mimeType: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "MIME type describing the encoded media payload." }),
      Schema.Null,
    ]),
  ),
  text: Schema.String.annotate({ description: "Text payload carried by this content block." }),
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
}).annotate({ description: "Text-based resource contents.", identifier: "TextResourceContents" });

export type BlobResourceContents = {
  readonly blob: string;
  readonly mimeType?: string | null;
  readonly uri: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const BlobResourceContents = Schema.Struct({
  blob: Schema.String.annotate({
    description: "Base64-encoded bytes for a binary resource payload.",
  }),
  mimeType: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "MIME type describing the encoded media payload." }),
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
}).annotate({ description: "Binary resource contents.", identifier: "BlobResourceContents" });

export type MessageId = string;
export const MessageId = Schema.String.annotate({
  description: "Unique identifier for a message within a session.",
  identifier: "MessageId",
});

export type ToolCallId = string;
export const ToolCallId = Schema.String.annotate({
  description: "Unique identifier for a tool call within a session.",
  identifier: "ToolCallId",
});

export type ToolKind =
  | "read"
  | "edit"
  | "delete"
  | "move"
  | "search"
  | "execute"
  | "think"
  | "fetch"
  | "switch_mode"
  | "other";
export const ToolKind = Schema.Union([
  Schema.Literal("read").annotate({ description: "Reading files or data." }),
  Schema.Literal("edit").annotate({ description: "Modifying files or content." }),
  Schema.Literal("delete").annotate({ description: "Removing files or data." }),
  Schema.Literal("move").annotate({ description: "Moving or renaming files." }),
  Schema.Literal("search").annotate({ description: "Searching for information." }),
  Schema.Literal("execute").annotate({ description: "Running commands or code." }),
  Schema.Literal("think").annotate({ description: "Internal reasoning or planning." }),
  Schema.Literal("fetch").annotate({ description: "Retrieving external data." }),
  Schema.Literal("switch_mode").annotate({ description: "Switching the current session mode." }),
  Schema.Literal("other").annotate({ description: "Other tool types (default)." }),
]).annotate({
  description:
    "Categories of tools that can be invoked.\n\nTool kinds help clients choose appropriate icons and optimize how they\ndisplay tool execution progress.\n\nSee protocol docs: [Creating](https://agentclientprotocol.com/protocol/tool-calls#creating)",
  identifier: "ToolKind",
});

export type ToolCallStatus = "pending" | "in_progress" | "completed" | "failed";
export const ToolCallStatus = Schema.Union([
  Schema.Literal("pending").annotate({
    description:
      "The tool call hasn't started running yet because the input is either\nstreaming or we're awaiting approval.",
  }),
  Schema.Literal("in_progress").annotate({ description: "The tool call is currently running." }),
  Schema.Literal("completed").annotate({ description: "The tool call completed successfully." }),
  Schema.Literal("failed").annotate({ description: "The tool call failed with an error." }),
]).annotate({
  description:
    "Execution status of a tool call.\n\nTool calls progress through different statuses during their lifecycle.\n\nSee protocol docs: [Status](https://agentclientprotocol.com/protocol/tool-calls#status)",
  identifier: "ToolCallStatus",
});

export type TerminalId = string;
export const TerminalId = Schema.String.annotate({
  description: "Typed identifier used for terminal values on the wire.",
  identifier: "TerminalId",
});

export type ToolCallLocation = {
  readonly path: string;
  readonly line?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ToolCallLocation = Schema.Struct({
  path: Schema.String.annotate({
    description: "The absolute file path being accessed or modified.",
  }),
  line: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Optional line number within the file.",
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
    'A file location being accessed or modified by a tool.\n\nEnables clients to implement "follow-along" features that track\nwhich files the agent is working with in real-time.\n\nSee protocol docs: [Following the Agent](https://agentclientprotocol.com/protocol/tool-calls#following-the-agent)',
  identifier: "ToolCallLocation",
});

export type PlanEntryPriority = "high" | "medium" | "low";
export const PlanEntryPriority = Schema.Union([
  Schema.Literal("high").annotate({
    description: "High priority task - critical to the overall goal.",
  }),
  Schema.Literal("medium").annotate({
    description: "Medium priority task - important but not critical.",
  }),
  Schema.Literal("low").annotate({
    description: "Low priority task - nice to have but not essential.",
  }),
]).annotate({
  description:
    "Priority levels for plan entries.\n\nUsed to indicate the relative importance or urgency of different\ntasks in the execution plan.\nSee protocol docs: [Plan Entries](https://agentclientprotocol.com/protocol/agent-plan#plan-entries)",
  identifier: "PlanEntryPriority",
});

export type PlanEntryStatus = "pending" | "in_progress" | "completed";
export const PlanEntryStatus = Schema.Union([
  Schema.Literal("pending").annotate({ description: "The task has not started yet." }),
  Schema.Literal("in_progress").annotate({ description: "The task is currently being worked on." }),
  Schema.Literal("completed").annotate({
    description: "The task has been successfully completed.",
  }),
]).annotate({
  description:
    "Status of a plan entry in the execution flow.\n\nTracks the lifecycle of each task from planning through completion.\nSee protocol docs: [Plan Entries](https://agentclientprotocol.com/protocol/agent-plan#plan-entries)",
  identifier: "PlanEntryStatus",
});

export type PlanId = string;
export const PlanId = Schema.String.annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nUnique identifier for a plan within a session.",
  identifier: "PlanId",
});

export type UnstructuredCommandInput = {
  readonly hint: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const UnstructuredCommandInput = Schema.Struct({
  hint: Schema.String.annotate({
    description: "A hint to display when the input hasn't been provided yet",
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
  description: "All text that was typed after the command name is provided as input.",
  identifier: "UnstructuredCommandInput",
});

export type SessionModeId = string;
export const SessionModeId = Schema.String.annotate({
  description: "Unique identifier for a Session Mode.",
  identifier: "SessionModeId",
});

export type SessionConfigId = string;
export const SessionConfigId = Schema.String.annotate({
  description: "Unique identifier for a session configuration option.",
  identifier: "SessionConfigId",
});

export type SessionConfigOptionCategory =
  | "mode"
  | "model"
  | "model_config"
  | "thought_level"
  | string;
export const SessionConfigOptionCategory = Schema.Union([
  Schema.Literal("mode").annotate({ description: "Session mode selector." }),
  Schema.Literal("model").annotate({ description: "Model selector." }),
  Schema.Literal("model_config").annotate({
    description: "Model-related configuration parameter.",
  }),
  Schema.Literal("thought_level").annotate({ description: "Thought/reasoning level selector." }),
  Schema.String.annotate({ title: "other", description: "Unknown / uncategorized selector." }),
]).annotate({
  description:
    "Semantic category for a session configuration option.\n\nThis is intended to help Clients distinguish broadly common selectors (e.g. model selector vs\nsession mode selector vs thought/reasoning level) for UX purposes (keyboard shortcuts, icons,\nplacement). It MUST NOT be required for correctness. Clients MUST handle missing or unknown\ncategories gracefully.\n\nCategory names beginning with `_` are free for custom use, like other ACP extension methods.\nCategory names that do not begin with `_` are reserved for the ACP spec.",
  identifier: "SessionConfigOptionCategory",
});

export type SessionConfigValueId = string;
export const SessionConfigValueId = Schema.String.annotate({
  description: "Unique identifier for a session configuration option value.",
  identifier: "SessionConfigValueId",
});

export type SessionConfigGroupId = string;
export const SessionConfigGroupId = Schema.String.annotate({
  description: "Unique identifier for a session configuration option value group.",
  identifier: "SessionConfigGroupId",
});

export type Cost = {
  readonly amount: number;
  readonly currency: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Cost = Schema.Struct({
  amount: Schema.Number.annotate({
    description: "Total cumulative cost for session.",
    format: "double",
  }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
  currency: Schema.String.annotate({ description: 'ISO 4217 currency code (e.g., "USD", "EUR").' }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Cost information for a session.", identifier: "Cost" });

export type CompactionId = string;
export const CompactionId = Schema.String.annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nUnique identifier for a context compaction within a session.",
  identifier: "CompactionId",
});

export type CompactionStatus = "in_progress" | "completed" | "failed" | "cancelled" | string;
export const CompactionStatus = Schema.Union([
  Schema.Literal("in_progress").annotate({
    description: "Compaction has started and has not finished.",
  }),
  Schema.Literal("completed").annotate({ description: "Compaction finished successfully." }),
  Schema.Literal("failed").annotate({ description: "Compaction finished unsuccessfully." }),
  Schema.Literal("cancelled").annotate({
    description: "Compaction was cancelled before it finished.",
  }),
  Schema.String.annotate({
    title: "other",
    description:
      "Custom or future compaction status.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Other unknown values are reserved for future ACP statuses.",
  }),
]).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nLifecycle state of a context compaction.",
  identifier: "CompactionStatus",
});

export type ElicitationId = string;
export const ElicitationId = Schema.String.annotate({
  description: "Unique identifier for an elicitation.",
  identifier: "ElicitationId",
});

export type McpConnectionId = string;
export const McpConnectionId = Schema.String.annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA unique identifier for an active MCP-over-ACP connection.",
  identifier: "McpConnectionId",
});

export type ExtNotification = Schema.Json;
export const ExtNotification = Schema.Json.annotate({
  expected: "JSON value",
  description:
    "Allows the Agent to send an arbitrary notification that is not part of the ACP spec.\nExtension notifications provide a way to send one-way messages for custom functionality\nwhile maintaining protocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
  identifier: "ExtNotification",
});

export type RequestId = null | number | string;
export const RequestId = Schema.Union([
  Schema.Null.annotate({ title: "Null", description: "The JSON-RPC `null` request id." }),
  Schema.Number.annotate({
    title: "Number",
    description: "A numeric JSON-RPC request id.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  Schema.String.annotate({ title: "Str", description: "A string JSON-RPC request id." }),
]).annotate({
  description:
    "JSON RPC Request Id\n\nAn identifier established by the Client that MUST contain a String, Number, or NULL value if included. If it is not included it is assumed to be a notification. The value SHOULD normally not be Null \\[1\\] and Numbers SHOULD NOT contain fractional parts \\[2\\]\n\nThe Server MUST reply with the same value in the Response object if included. This member is used to correlate the context between the two objects.\n\n\\[1\\] The use of Null as a value for the id member in a Request object is discouraged, because this specification uses a value of Null for Responses with an unknown id. Also, because JSON-RPC 1.0 uses an id value of Null for Notifications this could cause confusion in handling.\n\n\\[2\\] Fractional parts may be problematic, since many decimal fractions cannot be represented exactly as binary fractions.",
  identifier: "RequestId",
});

export type PermissionOptionId = string;
export const PermissionOptionId = Schema.String.annotate({
  description: "Unique identifier for a permission option.",
  identifier: "PermissionOptionId",
});

export type PermissionOptionKind = "allow_once" | "allow_always" | "reject_once" | "reject_always";
export const PermissionOptionKind = Schema.Union([
  Schema.Literal("allow_once").annotate({ description: "Allow this operation only this time." }),
  Schema.Literal("allow_always").annotate({
    description: "Allow this operation and remember the choice.",
  }),
  Schema.Literal("reject_once").annotate({ description: "Reject this operation only this time." }),
  Schema.Literal("reject_always").annotate({
    description: "Reject this operation and remember the choice.",
  }),
]).annotate({
  description:
    "The type of permission option being presented to the user.\n\nHelps clients choose appropriate icons and UI treatment.",
  identifier: "PermissionOptionKind",
});

export type EnvVariable = {
  readonly name: string;
  readonly value: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const EnvVariable = Schema.Struct({
  name: Schema.String.annotate({ description: "The name of the environment variable." }),
  value: Schema.String.annotate({ description: "The value to set for the environment variable." }),
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
  description: "An environment variable to set when launching an MCP server.",
  identifier: "EnvVariable",
});

export type ElicitationSchemaType = "object";
export const ElicitationSchemaType = Schema.Union([
  Schema.Literal("object").annotate({ description: "Object schema type." }),
]).annotate({
  description: "Type discriminator for elicitation schemas.",
  identifier: "ElicitationSchemaType",
});

export type StringFormat = "email" | "uri" | "date" | "date-time";
export const StringFormat = Schema.Union([
  Schema.Literal("email").annotate({ description: "Email address format." }),
  Schema.Literal("uri").annotate({ description: "URI format." }),
  Schema.Literal("date").annotate({ description: "Date format (YYYY-MM-DD)." }),
  Schema.Literal("date-time").annotate({ description: "Date-time format (ISO 8601)." }),
]).annotate({
  description: "String format types for string properties in elicitation schemas.",
  identifier: "StringFormat",
});

export type EnumOption = {
  readonly const: string;
  readonly title: string;
  readonly description?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const EnumOption = Schema.Struct({
  const: Schema.String.annotate({ description: "The constant value for this option." }),
  title: Schema.String.annotate({ description: "Human-readable title for this option." }),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Human-readable description.\n\nOptional. Omitted and `null` are equivalent and mean no description is provided.",
      }),
      Schema.Null,
    ]),
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
  description:
    "A titled enum option with a const value, human-readable title, and optional description.",
  identifier: "EnumOption",
});

export type TitledMultiSelectItems = {
  readonly anyOf: ReadonlyArray<EnumOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TitledMultiSelectItems = Schema.Struct({
  anyOf: Schema.Array(EnumOption).annotate({ description: "Titled enum options." }),
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
  description: "Items definition for titled multi-select enum properties.",
  identifier: "TitledMultiSelectItems",
});

export type McpServerAcpId = string;
export const McpServerAcpId = Schema.String.annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nUnique identifier for an MCP server using the ACP transport.\n\nThe value is opaque and generated by the ACP component providing the MCP server. It is\nused by `mcp/connect` to route connection requests back to the component that declared the\nserver.",
  identifier: "McpServerAcpId",
});

export type ExtRequest = Schema.Json;
export const ExtRequest = Schema.Json.annotate({
  expected: "JSON value",
  description:
    "Allows for sending an arbitrary request that is not part of the ACP spec.\nExtension methods provide a way to add custom functionality while maintaining\nprotocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
  identifier: "ExtRequest",
});

export type ProtocolVersion = number;
export const ProtocolVersion = Schema.Number.annotate({
  description:
    "Protocol version identifier.\n\nThis version is only bumped for breaking changes.\nNon-breaking changes should be introduced via capabilities.",
  format: "uint16",
})
  .check(Schema.isInt().annotate({ expected: "an integer" }))
  .check(
    Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
  )
  .check(
    Schema.isLessThanOrEqualTo(65535).annotate({
      expected: "a value less than or equal to 65535",
      identifier: "ProtocolVersion",
    }),
  );

export type AuthMethodId = string;
export const AuthMethodId = Schema.String.annotate({
  description: "Typed identifier used for auth method values on the wire.",
  identifier: "AuthMethodId",
});

export type Implementation = {
  readonly name: string;
  readonly title?: string | null;
  readonly version: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Implementation = Schema.Struct({
  name: Schema.String.annotate({
    description:
      "Intended for programmatic or logical use, but can be used as a display\nname fallback if title isn’t present.",
  }),
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Intended for UI and end-user contexts — optimized to be human-readable\nand easily understood.\n\nIf not provided, the name should be used for display.",
      }),
      Schema.Null,
    ]),
  ),
  version: Schema.String.annotate({
    description:
      'Version of the implementation. Can be displayed to the user or used\nfor debugging or metrics purposes. (e.g. "1.0.0").',
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
    "Metadata about the implementation of the client or agent.\nDescribes the name and version of an ACP implementation, with an optional\ntitle for UI representation.",
  identifier: "Implementation",
});

export type AuthenticateResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AuthenticateResponse = Schema.Struct({
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
  description: "Response to the `authenticate` method.",
  identifier: "AuthenticateResponse",
});

export type ProviderId = string;
export const ProviderId = Schema.String.annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nUnique identifier for a configurable LLM provider.",
  identifier: "ProviderId",
});

export type LlmProtocol = "anthropic" | "openai" | "azure" | "vertex" | "bedrock" | string;
export const LlmProtocol = Schema.Union([
  Schema.Literal("anthropic").annotate({ description: "Anthropic API protocol." }),
  Schema.Literal("openai").annotate({ description: "OpenAI API protocol." }),
  Schema.Literal("azure").annotate({ description: "Azure OpenAI API protocol." }),
  Schema.Literal("vertex").annotate({ description: "Google Vertex AI API protocol." }),
  Schema.Literal("bedrock").annotate({ description: "AWS Bedrock API protocol." }),
  Schema.String.annotate({ title: "other", description: "Unknown or custom protocol." }),
]).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nWell-known API protocol identifiers for LLM providers.\n\nAgents and clients MUST handle unknown protocol identifiers gracefully.\n\nProtocol names beginning with `_` are free for custom use, like other ACP extension methods.\nProtocol names that do not begin with `_` are reserved for the ACP spec.",
  identifier: "LlmProtocol",
});

export type SetProviderResponse = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const SetProviderResponse = Schema.Struct({
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse to `providers/set`.",
  identifier: "SetProviderResponse",
});

export type DisableProviderResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DisableProviderResponse = Schema.Struct({
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse to `providers/disable`.",
  identifier: "DisableProviderResponse",
});

export type LogoutResponse = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const LogoutResponse = Schema.Struct({
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Response to the `logout` method.", identifier: "LogoutResponse" });

export type DeleteSessionResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DeleteSessionResponse = Schema.Struct({
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
  description: "Response from deleting a session.",
  identifier: "DeleteSessionResponse",
});

export type CloseSessionResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CloseSessionResponse = Schema.Struct({
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
  description: "Response from closing a session.",
  identifier: "CloseSessionResponse",
});

export type SetSessionModeResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SetSessionModeResponse = Schema.Struct({
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
  description: "Response to `session/set_mode` method.",
  identifier: "SetSessionModeResponse",
});

export type StopReason = "end_turn" | "max_tokens" | "max_turn_requests" | "refusal" | "cancelled";
export const StopReason = Schema.Union([
  Schema.Literal("end_turn").annotate({ description: "The turn ended successfully." }),
  Schema.Literal("max_tokens").annotate({
    description: "The turn ended because the agent reached the maximum number of tokens.",
  }),
  Schema.Literal("max_turn_requests").annotate({
    description:
      "The turn ended because the agent reached the maximum number of allowed\nagent requests between user turns.",
  }),
  Schema.Literal("refusal").annotate({
    description:
      "The turn ended because the agent refused to continue. The user prompt\nand everything that comes after it won't be included in the next\nprompt, so this should be reflected in the UI.",
  }),
  Schema.Literal("cancelled").annotate({
    description:
      "The turn was cancelled by the client via `session/cancel`.\n\nThis stop reason MUST be returned when the client sends a `session/cancel`\nnotification, even if the cancellation causes exceptions in underlying operations.\nAgents should catch these exceptions and return this semantically meaningful\nresponse to confirm successful cancellation.",
  }),
]).annotate({
  description:
    "Reasons why an agent stops processing a prompt turn.\n\nSee protocol docs: [Stop Reasons](https://agentclientprotocol.com/protocol/prompt-turn#stop-reasons)",
  identifier: "StopReason",
});

export type Usage = {
  readonly totalTokens: number;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly thoughtTokens?: number | null;
  readonly cachedReadTokens?: number | null;
  readonly cachedWriteTokens?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Usage = Schema.Struct({
  totalTokens: Schema.Number.annotate({
    description: "Sum of all token types across session.",
    format: "uint64",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  inputTokens: Schema.Number.annotate({
    description: "Total input tokens across all turns.",
    format: "uint64",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  outputTokens: Schema.Number.annotate({
    description: "Total output tokens across all turns.",
    format: "uint64",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  thoughtTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ description: "Total thought/reasoning tokens", format: "uint64" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      Schema.Null,
    ]),
  ),
  cachedReadTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ description: "Total cache read tokens.", format: "uint64" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      Schema.Null,
    ]),
  ),
  cachedWriteTokens: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ description: "Total cache write tokens.", format: "uint64" })
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
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nToken usage information for a prompt turn.",
  identifier: "Usage",
});

export type Position = {
  readonly line: number;
  readonly character: number;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Position = Schema.Struct({
  line: Schema.Number.annotate({ description: "Zero-based line number.", format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  character: Schema.Number.annotate({
    description: "Zero-based character offset (encoding-dependent).",
    format: "uint32",
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
  description:
    "A zero-based position in a text document.\n\nThe meaning of `character` depends on the negotiated position encoding.",
  identifier: "Position",
});

export type CloseNesResponse = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const CloseNesResponse = Schema.Struct({
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
  description: "Response from closing an NES session.",
  identifier: "CloseNesResponse",
});

export type ExtResponse = Schema.Json;
export const ExtResponse = Schema.Json.annotate({
  expected: "JSON value",
  description:
    "Allows for sending an arbitrary response to an [`ExtRequest`] that is not part of the ACP spec.\nExtension methods provide a way to add custom functionality while maintaining\nprotocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
  identifier: "ExtResponse",
});

export type MessageMcpResponse = Schema.Json;
export const MessageMcpResponse = Schema.Json.annotate({
  expected: "JSON value",
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse to `mcp/message`.\n\nThis is the inner MCP response result payload. Any JSON value is valid.",
  identifier: "MessageMcpResponse",
});

export type ErrorCode =
  | -32700
  | -32600
  | -32601
  | -32602
  | -32603
  | -32800
  | -32000
  | -32002
  | number;
export const ErrorCode = Schema.Union([
  Schema.Literal(-32700).annotate({
    title: "Parse error",
    description:
      "**Parse error**: Invalid JSON was received by the server.\nAn error occurred on the server while parsing the JSON text.",
    format: "int32",
  }),
  Schema.Literal(-32600).annotate({
    title: "Invalid request",
    description: "**Invalid request**: The JSON sent is not a valid Request object.",
    format: "int32",
  }),
  Schema.Literal(-32601).annotate({
    title: "Method not found",
    description: "**Method not found**: The method does not exist or is not available.",
    format: "int32",
  }),
  Schema.Literal(-32602).annotate({
    title: "Invalid params",
    description: "**Invalid params**: Invalid method parameter(s).",
    format: "int32",
  }),
  Schema.Literal(-32603).annotate({
    title: "Internal error",
    description:
      "**Internal error**: Internal JSON-RPC error.\nReserved for implementation-defined server errors.",
    format: "int32",
  }),
  Schema.Literal(-32800).annotate({
    title: "Request cancelled",
    description:
      "**Request cancelled**: Execution of the method was aborted either due to a cancellation request from the caller or\nbecause of resource constraints or shutdown.",
    format: "int32",
  }),
  Schema.Literal(-32000).annotate({
    title: "Authentication required",
    description:
      "**Authentication required**: Authentication is required before this operation can be performed.",
    format: "int32",
  }),
  Schema.Literal(-32002).annotate({
    title: "Resource not found",
    description: "**Resource not found**: A given resource, such as a file, was not found.",
    format: "int32",
  }),
  Schema.Number.annotate({
    title: "Other",
    description: "Other undefined error code.",
    format: "int32",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
]).annotate({
  description:
    "Predefined error codes for common JSON-RPC and ACP-specific errors.\n\nThese codes follow the JSON-RPC 2.0 specification for standard errors\nand use the reserved range (-32000 to -32099) for protocol-specific errors.",
  identifier: "ErrorCode",
});

export type FileSystemCapabilities = {
  readonly readTextFile?: boolean;
  readonly writeTextFile?: boolean;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const FileSystemCapabilities = Schema.Struct({
  readTextFile: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Whether the Client supports `fs/read_text_file` requests.",
      default: false,
    }),
  ),
  writeTextFile: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Whether the Client supports `fs/write_text_file` requests.",
      default: false,
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
    "File system capabilities that a client may support.\n\nSee protocol docs: [FileSystem](https://agentclientprotocol.com/protocol/initialization#filesystem)",
  identifier: "FileSystemCapabilities",
});

export type CompactionCapabilities = { readonly [x: string]: never };
export const CompactionCapabilities = Schema.Record(Schema.String, Schema.Never).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nClient support for ID-addressed context compaction updates.",
  identifier: "CompactionCapabilities",
});

export type BooleanConfigOptionCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const BooleanConfigOptionCapabilities = Schema.Struct({
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
    "Capabilities for boolean session configuration options.\n\nSupplying `{}` means the client supports boolean session configuration options.",
  identifier: "BooleanConfigOptionCapabilities",
});

export type PlanCapabilities = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const PlanCapabilities = Schema.Struct({
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nCapabilities for receiving `plan_update` and `plan_removed` session updates.",
  identifier: "PlanCapabilities",
});

export type AuthCapabilities = {
  readonly terminal?: boolean;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AuthCapabilities = Schema.Struct({
  terminal: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether the client supports `terminal` authentication methods.\n\nThe client should set this to `true` only when it can reproduce the\nconfigured agent invocation in an interactive terminal. When `true`, the\nagent may include `terminal` entries in its authentication methods.",
      default: false,
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
    "Authentication capabilities supported by the client.\n\nAdvertised during initialization to inform the agent which authentication\nmethod types the client can handle. This governs opt-in types that require\nadditional client-side support.",
  identifier: "AuthCapabilities",
});

export type ElicitationFormCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ElicitationFormCapabilities = Schema.Struct({
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
  description:
    "Form-based elicitation capabilities.\n\nSupplying `{}` means the client supports form-based elicitation.",
  identifier: "ElicitationFormCapabilities",
});

export type ElicitationUrlCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ElicitationUrlCapabilities = Schema.Struct({
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
  description:
    "URL-based elicitation capabilities.\n\nSupplying `{}` means the client supports URL-based elicitation.",
  identifier: "ElicitationUrlCapabilities",
});

export type NesJumpCapabilities = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const NesJumpCapabilities = Schema.Struct({
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
  description: "Marker for jump suggestion support.",
  identifier: "NesJumpCapabilities",
});

export type NesRenameCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesRenameCapabilities = Schema.Struct({
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
  description: "Marker for rename suggestion support.",
  identifier: "NesRenameCapabilities",
});

export type NesSearchAndReplaceCapabilities = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesSearchAndReplaceCapabilities = Schema.Struct({
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
  description: "Marker for search and replace suggestion support.",
  identifier: "NesSearchAndReplaceCapabilities",
});

export type NesRejectReason = "rejected" | "ignored" | "replaced" | "cancelled";
export const NesRejectReason = Schema.Union([
  Schema.Literal("rejected").annotate({
    description: "The user explicitly dismissed the suggestion.",
  }),
  Schema.Literal("ignored").annotate({
    description: "The suggestion was shown but the user continued editing without interacting.",
  }),
  Schema.Literal("replaced").annotate({
    description: "The suggestion was superseded by a newer suggestion.",
  }),
  Schema.Literal("cancelled").annotate({
    description: "The request was cancelled before the agent returned a response.",
  }),
]).annotate({
  description: "The reason a suggestion was rejected.",
  identifier: "NesRejectReason",
});

export type ListProvidersRequest = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ListProvidersRequest = Schema.Struct({
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for `providers/list`.",
  identifier: "ListProvidersRequest",
});

export type LogoutRequest = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const LogoutRequest = Schema.Struct({
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
    "Request parameters for the logout method.\n\nTerminates the current authenticated session.",
  identifier: "LogoutRequest",
});

export type HttpHeader = {
  readonly name: string;
  readonly value: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const HttpHeader = Schema.Struct({
  name: Schema.String.annotate({ description: "The name of the HTTP header." }),
  value: Schema.String.annotate({ description: "The value to set for the HTTP header." }),
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
  description: "An HTTP header to set when making requests to the MCP server.",
  identifier: "HttpHeader",
});

export type ListSessionsRequest = {
  readonly cwd?: string | null;
  readonly cursor?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ListSessionsRequest = Schema.Struct({
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Filter sessions by working directory. Must be an absolute path.",
      }),
      Schema.Null,
    ]),
  ),
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor token from a previous response's nextCursor field for cursor-based pagination",
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
    "Request parameters for listing existing sessions.\n\nOnly available if the Agent supports the `sessionCapabilities.list` capability.",
  identifier: "ListSessionsRequest",
});

export type WorkspaceFolder = {
  readonly uri: string;
  readonly name: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const WorkspaceFolder = Schema.Struct({
  uri: Schema.String.annotate({ description: "The URI of the folder." }),
  name: Schema.String.annotate({ description: "The display name of the folder." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A workspace folder.", identifier: "WorkspaceFolder" });

export type NesRepository = {
  readonly name: string;
  readonly owner: string;
  readonly remoteUrl: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesRepository = Schema.Struct({
  name: Schema.String.annotate({ description: "The repository name." }),
  owner: Schema.String.annotate({ description: "The repository owner." }),
  remoteUrl: Schema.String.annotate({ description: "The remote URL of the repository." }),
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
  description: "Repository metadata for an NES session.",
  identifier: "NesRepository",
});

export type NesTriggerKind = "automatic" | "diagnostic" | "manual";
export const NesTriggerKind = Schema.Union([
  Schema.Literal("automatic").annotate({
    description: "Triggered by user typing or cursor movement.",
  }),
  Schema.Literal("diagnostic").annotate({
    description: "Triggered by a diagnostic appearing at or near the cursor.",
  }),
  Schema.Literal("manual").annotate({
    description: "Triggered by an explicit user action (keyboard shortcut).",
  }),
]).annotate({
  description: "What triggered the suggestion request.",
  identifier: "NesTriggerKind",
});

export type NesRecentFile = {
  readonly uri: string;
  readonly languageId: string;
  readonly text: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesRecentFile = Schema.Struct({
  uri: Schema.String.annotate({ description: "The URI of the file." }),
  languageId: Schema.String.annotate({ description: "The language identifier." }),
  text: Schema.String.annotate({ description: "The full text content of the file." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A recently accessed file.", identifier: "NesRecentFile" });

export type NesExcerpt = {
  readonly startLine: number;
  readonly endLine: number;
  readonly text: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesExcerpt = Schema.Struct({
  startLine: Schema.Number.annotate({
    description: "The start line of the excerpt (zero-based).",
    format: "uint32",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  endLine: Schema.Number.annotate({
    description: "The end line of the excerpt (zero-based).",
    format: "uint32",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  text: Schema.String.annotate({ description: "The text content of the excerpt." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A code excerpt from a file.", identifier: "NesExcerpt" });

export type NesEditHistoryEntry = {
  readonly uri: string;
  readonly diff: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesEditHistoryEntry = Schema.Struct({
  uri: Schema.String.annotate({ description: "The URI of the edited file." }),
  diff: Schema.String.annotate({ description: "A diff representing the edit." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "An entry in the edit history.", identifier: "NesEditHistoryEntry" });

export type NesDiagnosticSeverity = "error" | "warning" | "information" | "hint";
export const NesDiagnosticSeverity = Schema.Union([
  Schema.Literal("error").annotate({ description: "An error." }),
  Schema.Literal("warning").annotate({ description: "A warning." }),
  Schema.Literal("information").annotate({ description: "An informational message." }),
  Schema.Literal("hint").annotate({ description: "A hint." }),
]).annotate({ description: "Severity of a diagnostic.", identifier: "NesDiagnosticSeverity" });

export type WriteTextFileResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const WriteTextFileResponse = Schema.Struct({
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
  description: "Response to `fs/write_text_file`",
  identifier: "WriteTextFileResponse",
});

export type ReadTextFileResponse = {
  readonly content: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ReadTextFileResponse = Schema.Struct({
  content: Schema.String.annotate({ description: "Content payload returned by this response." }),
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
  description: "Response containing the contents of a text file.",
  identifier: "ReadTextFileResponse",
});

export type TerminalExitStatus = {
  readonly exitCode?: number | null;
  readonly signal?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TerminalExitStatus = Schema.Struct({
  exitCode: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "The process exit code (may be null if terminated by signal).",
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
  signal: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "The signal that terminated the process (may be null if exited normally).",
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
  description: "Exit status of a terminal command.",
  identifier: "TerminalExitStatus",
});

export type ReleaseTerminalResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ReleaseTerminalResponse = Schema.Struct({
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
  description: "Response to terminal/release method",
  identifier: "ReleaseTerminalResponse",
});

export type WaitForTerminalExitResponse = {
  readonly exitCode?: number | null;
  readonly signal?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const WaitForTerminalExitResponse = Schema.Struct({
  exitCode: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "The process exit code (may be null if terminated by signal).",
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
  signal: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "The signal that terminated the process (may be null if exited normally).",
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
  description: "Response containing the exit status of a terminal command.",
  identifier: "WaitForTerminalExitResponse",
});

export type KillTerminalResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const KillTerminalResponse = Schema.Struct({
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
  description: "Response to `terminal/kill` method",
  identifier: "KillTerminalResponse",
});

export type ElicitationContentValue = string | number | number | boolean | ReadonlyArray<string>;
export const ElicitationContentValue = Schema.Union([
  Schema.String.annotate({
    title: "String",
    description: "String value accepted in elicitation response content.",
  }),
  Schema.Number.annotate({
    title: "Integer",
    description: "Integer value accepted in elicitation response content.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  Schema.Number.annotate({
    title: "Number",
    description: "Number value accepted in elicitation response content.",
    format: "double",
  }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
  Schema.Boolean.annotate({
    title: "Boolean",
    description: "Boolean value accepted in elicitation response content.",
  }),
  Schema.Array(Schema.String).annotate({
    title: "StringArray",
    description: "String array value accepted in elicitation response content.",
  }),
]).annotate({
  description: "Allowed wire representations for [`ElicitationContentValue`].",
  identifier: "ElicitationContentValue",
});

export type DisconnectMcpResponse = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DisconnectMcpResponse = Schema.Struct({
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse to `mcp/disconnect`.",
  identifier: "DisconnectMcpResponse",
});

export type WriteTextFileRequest = {
  readonly sessionId: SessionId;
  readonly path: string;
  readonly content: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const WriteTextFileRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  path: Schema.String.annotate({ description: "Absolute path to the file to write." }),
  content: Schema.String.annotate({ description: "The text content to write to the file." }),
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
    "Request to write content to a text file.\n\nOnly available if the client supports the `fs.writeTextFile` capability.",
  identifier: "WriteTextFileRequest",
});

export type ReadTextFileRequest = {
  readonly sessionId: SessionId;
  readonly path: string;
  readonly line?: number | null;
  readonly limit?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ReadTextFileRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  path: Schema.String.annotate({ description: "Absolute path to the file to read." }),
  line: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Line number to start reading from (1-based).",
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
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ description: "Maximum number of lines to read.", format: "uint32" })
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
  description:
    "Request to read content from a text file.\n\nOnly available if the client supports the `fs.readTextFile` capability.",
  identifier: "ReadTextFileRequest",
});

export type SessionInfo = {
  readonly sessionId: SessionId;
  readonly cwd: string;
  readonly additionalDirectories?: ReadonlyArray<string>;
  readonly title?: string | null;
  readonly updatedAt?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionInfo = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "Unique identifier for the session",
  }),
  cwd: Schema.String.annotate({
    description: "The working directory for this session. Must be an absolute path.",
  }),
  additionalDirectories: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "Additional workspace roots reported for this session. Each path must be absolute.\n\nWhen present, this is the complete ordered additional-root list reported\nby the Agent. Omitted and empty values are equivalent: the response\nreports no additional roots.",
    }),
  ),
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Human-readable title for the session" }),
      Schema.Null,
    ]),
  ),
  updatedAt: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "ISO 8601 timestamp of last activity" }),
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
  description: "Information about a session returned by session/list",
  identifier: "SessionInfo",
});

export type StartNesResponse = {
  readonly sessionId: SessionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const StartNesResponse = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for the newly started NES session.",
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
}).annotate({ description: "Response to `nes/start`.", identifier: "StartNesResponse" });
