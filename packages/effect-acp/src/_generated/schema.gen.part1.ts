import * as Schema from "effect/Schema";
import {
  AbsolutePath,
  AuthMethodId,
  AvailableCommandInput,
  DiffFileType,
  DiffPatchFormat,
  ElicitationContentValue,
  ElicitationFormCapabilities,
  ElicitationId,
  ElicitationUrlCapabilities,
  EnvVariable,
  ErrorCode,
  HttpHeader,
  IconTheme,
  LlmProtocol,
  McpAcpCapabilities,
  McpConnectionId,
  McpHttpCapabilities,
  McpServerAcpId,
  McpStdioCapabilities,
  MediaType,
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
  Position,
  PromptAudioCapabilities,
  PromptEmbeddedContextCapabilities,
  PromptImageCapabilities,
  ProviderId,
  RequestId,
  Role,
  SessionAdditionalDirectoriesCapabilities,
  SessionConfigId,
  SessionConfigValueId,
  SessionDeleteCapabilities,
  SessionForkCapabilities,
  SessionId,
  SessionListCursor,
  TerminalAuthCapabilities,
  TextDocumentSyncKind,
  TitledMultiSelectItems,
  WorkspaceFolder,
} from "./schema.gen.part0.ts";

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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Request parameters for closing an active session.\n\nThe agent **must** cancel any ongoing work related to the session (treat it\nas if `session/cancel` was called) and then free up any resources associated\nwith the session.",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
  readonly suggestionId: NesSuggestionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AcceptNesNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  suggestionId: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
    description: "The ID of the accepted suggestion.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Notification sent when a suggestion is accepted.",
  identifier: "AcceptNesNotification",
});

export type PromptCapabilities = {
  readonly image?: PromptImageCapabilities | null;
  readonly audio?: PromptAudioCapabilities | null;
  readonly embeddedContext?: PromptEmbeddedContextCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PromptCapabilities = Schema.Struct({
  image: Schema.optionalKey(
    Schema.Union([PromptImageCapabilities, Schema.Null]).annotate({
      description:
        "Agent supports [`ContentBlock::Image`].\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports image content in prompts.",
    }),
  ),
  audio: Schema.optionalKey(
    Schema.Union([PromptAudioCapabilities, Schema.Null]).annotate({
      description:
        "Agent supports [`ContentBlock::Audio`].\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports audio content in prompts.",
    }),
  ),
  embeddedContext: Schema.optionalKey(
    Schema.Union([PromptEmbeddedContextCapabilities, Schema.Null]).annotate({
      description:
        "Agent supports embedded context in `session/prompt` requests.\n\nWhen enabled, the Client is allowed to include [`ContentBlock::Resource`]\nin prompt requests for pieces of context that are referenced in the message.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports embedded context in prompts.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Prompt capabilities supported by the agent in `session/prompt` requests.\n\nBaseline agent functionality requires support for [`ContentBlock::Text`]\nand [`ContentBlock::ResourceLink`] in prompt requests.\n\nOther variants must be explicitly opted in to.\nCapabilities for different types of content in prompt requests.\n\nIndicates which content types beyond the baseline (text and resource links)\nthe agent can process.\n\nSee protocol docs: [Prompt Capabilities](https://agentclientprotocol.com/protocol/v2/draft/initialization#prompt-capabilities)",
  identifier: "PromptCapabilities",
});

export type McpCapabilities = {
  readonly stdio?: McpStdioCapabilities | null;
  readonly http?: McpHttpCapabilities | null;
  readonly acp?: McpAcpCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const McpCapabilities = Schema.Struct({
  stdio: Schema.optionalKey(
    Schema.Union([McpStdioCapabilities, Schema.Null]).annotate({
      description:
        "Agent supports [`McpServer::Stdio`].\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports stdio MCP server transports.",
    }),
  ),
  http: Schema.optionalKey(
    Schema.Union([McpHttpCapabilities, Schema.Null]).annotate({
      description:
        "Agent supports [`McpServer::Http`].\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports HTTP MCP server transports.",
    }),
  ),
  acp: Schema.optionalKey(
    Schema.Union([McpAcpCapabilities, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nAgent supports [`McpServer::Acp`].\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports ACP MCP server transports.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "MCP capabilities supported by the agent for session lifecycle requests.",
  identifier: "McpCapabilities",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
        description:
          'Timestamp indicating when the underlying resource was last modified.\n\nMust be an RFC 3339 formatted string (e.g., "2025-01-12T15:00:58Z").',
        format: "date-time",
      }),
      Schema.Null,
    ]),
  ),
  priority: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Relative importance of this content when clients choose what to surface.",
        format: "double",
      })
        .check(Schema.isFinite().annotate({ expected: "a finite number" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        )
        .check(
          Schema.isLessThanOrEqualTo(1).annotate({ expected: "a value less than or equal to 1" }),
        ),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Optional annotations for the client. The client can use annotations to inform how objects are used or displayed",
  identifier: "Annotations",
});

export type TextResourceContents = {
  readonly text: string;
  readonly uri: string;
  readonly mimeType?: MediaType | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TextResourceContents = Schema.Struct({
  text: Schema.String.annotate({ description: "Text payload carried by this content block." }),
  uri: Schema.String.annotate({
    description: "URI associated with this resource or media payload.",
    format: "uri",
  }),
  mimeType: Schema.optionalKey(
    Schema.Union([MediaType, Schema.Null]).annotate({
      description: "MIME type describing the encoded media payload.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Text-based resource contents.", identifier: "TextResourceContents" });

export type BlobResourceContents = {
  readonly blob: string;
  readonly uri: string;
  readonly mimeType?: MediaType | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const BlobResourceContents = Schema.Struct({
  blob: Schema.String.annotate({
    description: "Base64-encoded bytes for a binary resource payload.",
    contentEncoding: "base64",
  }),
  uri: Schema.String.annotate({
    description: "URI associated with this resource or media payload.",
    format: "uri",
  }),
  mimeType: Schema.optionalKey(
    Schema.Union([MediaType, Schema.Null]).annotate({
      description: "MIME type describing the encoded media payload.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Binary resource contents.", identifier: "BlobResourceContents" });

export type Icon = {
  readonly src: string;
  readonly mimeType?: MediaType | null;
  readonly sizes?: ReadonlyArray<string> | null;
  readonly theme?: IconTheme | null;
};
export const Icon = Schema.Struct({
  src: Schema.String.annotate({
    description: "A standard URI pointing to an icon resource.",
    format: "uri",
  }),
  mimeType: Schema.optionalKey(
    Schema.Union([MediaType, Schema.Null]).annotate({
      description: "Optional MIME type override if the source MIME type is missing or generic.",
    }),
  ),
  sizes: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          'Optional array of strings that specify sizes at which the icon can be used.\nEach string should be in `WxH` format (e.g., `"48x48"`, `"96x96"`) or\n`"any"` for scalable formats like SVG.\n\nIf not provided, the client should assume that the icon can be used at any size.',
      }),
      Schema.Null,
    ]),
  ),
  theme: Schema.optionalKey(
    Schema.Union([IconTheme, Schema.Null]).annotate({
      description: "Optional theme this icon is designed for.",
    }),
  ),
}).annotate({
  description: "An optionally-sized icon that can be displayed in a user interface.",
  identifier: "Icon",
});

export type DiffChange =
  | {
      readonly fileType?: DiffFileType | null;
      readonly mimeType?: MediaType | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly operation: "add";
      readonly path: AbsolutePath;
    }
  | {
      readonly fileType?: DiffFileType | null;
      readonly mimeType?: MediaType | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly operation: "delete";
      readonly path: AbsolutePath;
    }
  | {
      readonly fileType?: DiffFileType | null;
      readonly mimeType?: MediaType | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly operation: "modify";
      readonly path: AbsolutePath;
    }
  | {
      readonly fileType?: DiffFileType | null;
      readonly mimeType?: MediaType | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly operation: "move";
      readonly oldPath: AbsolutePath;
      readonly path: AbsolutePath;
    }
  | {
      readonly fileType?: DiffFileType | null;
      readonly mimeType?: MediaType | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly operation: "copy";
      readonly oldPath: AbsolutePath;
      readonly path: AbsolutePath;
    }
  | ({
      readonly fileType?: DiffFileType | null;
      readonly mimeType?: MediaType | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly operation: string;
    } & { readonly [x: string]: Schema.Json });
export const DiffChange = Schema.Union([
  Schema.Struct({
    fileType: Schema.optionalKey(
      Schema.Union([DiffFileType, Schema.Null]).annotate({
        description: "File content kind.\n\nOmitted or `null` means the content kind is unknown.",
      }),
    ),
    mimeType: Schema.optionalKey(
      Schema.Union([MediaType, Schema.Null]).annotate({
        description:
          "MIME type of the file contents.\n\nOmitted or `null` means the MIME type is unknown.",
      }),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    operation: Schema.Literal("add"),
    path: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
      description: "Absolute path for the operation.",
    }),
  }).annotate({ description: "Operation metadata for add, delete, and modify changes." }),
  Schema.Struct({
    fileType: Schema.optionalKey(
      Schema.Union([DiffFileType, Schema.Null]).annotate({
        description: "File content kind.\n\nOmitted or `null` means the content kind is unknown.",
      }),
    ),
    mimeType: Schema.optionalKey(
      Schema.Union([MediaType, Schema.Null]).annotate({
        description:
          "MIME type of the file contents.\n\nOmitted or `null` means the MIME type is unknown.",
      }),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    operation: Schema.Literal("delete"),
    path: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
      description: "Absolute path for the operation.",
    }),
  }).annotate({ description: "Operation metadata for add, delete, and modify changes." }),
  Schema.Struct({
    fileType: Schema.optionalKey(
      Schema.Union([DiffFileType, Schema.Null]).annotate({
        description: "File content kind.\n\nOmitted or `null` means the content kind is unknown.",
      }),
    ),
    mimeType: Schema.optionalKey(
      Schema.Union([MediaType, Schema.Null]).annotate({
        description:
          "MIME type of the file contents.\n\nOmitted or `null` means the MIME type is unknown.",
      }),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    operation: Schema.Literal("modify"),
    path: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
      description: "Absolute path for the operation.",
    }),
  }).annotate({ description: "Operation metadata for add, delete, and modify changes." }),
  Schema.Struct({
    fileType: Schema.optionalKey(
      Schema.Union([DiffFileType, Schema.Null]).annotate({
        description: "File content kind.\n\nOmitted or `null` means the content kind is unknown.",
      }),
    ),
    mimeType: Schema.optionalKey(
      Schema.Union([MediaType, Schema.Null]).annotate({
        description:
          "MIME type of the file contents.\n\nOmitted or `null` means the MIME type is unknown.",
      }),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    operation: Schema.Literal("move"),
    oldPath: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
      description: "Absolute path before the operation.",
    }),
    path: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
      description: "Absolute path after the operation.",
    }),
  }).annotate({ description: "Operation metadata for move and copy changes." }),
  Schema.Struct({
    fileType: Schema.optionalKey(
      Schema.Union([DiffFileType, Schema.Null]).annotate({
        description: "File content kind.\n\nOmitted or `null` means the content kind is unknown.",
      }),
    ),
    mimeType: Schema.optionalKey(
      Schema.Union([MediaType, Schema.Null]).annotate({
        description:
          "MIME type of the file contents.\n\nOmitted or `null` means the MIME type is unknown.",
      }),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    operation: Schema.Literal("copy"),
    oldPath: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
      description: "Absolute path before the operation.",
    }),
    path: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
      description: "Absolute path after the operation.",
    }),
  }).annotate({ description: "Operation metadata for move and copy changes." }),
  Schema.StructWithRest(
    Schema.Struct({
      fileType: Schema.optionalKey(
        Schema.Union([DiffFileType, Schema.Null]).annotate({
          description: "File content kind.\n\nOmitted or `null` means the content kind is unknown.",
        }),
      ),
      mimeType: Schema.optionalKey(
        Schema.Union([MediaType, Schema.Null]).annotate({
          description:
            "MIME type of the file contents.\n\nOmitted or `null` means the MIME type is unknown.",
        }),
      ),
      _meta: Schema.optionalKey(
        Schema.Union([
          Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
            description:
              "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
          }),
          Schema.Null,
        ]),
      ),
      operation: Schema.String.annotate({
        description:
          "Custom or future file operation.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp("^(?!(?:\\x61dd|\\x64elete|\\x6dodify|\\x6dove|\\x63opy)$)[\\s\\S]*$"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x61dd|\\x64elete|\\x6dodify|\\x6dove|\\x63opy)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future file operation.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
  }),
]).annotate({ identifier: "DiffChange" });

export type ToolCallLocation = {
  readonly path: AbsolutePath;
  readonly line?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ToolCallLocation = Schema.Struct({
  path: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    'A file location being accessed or modified by a tool.\n\nEnables clients to implement "follow-along" features that track\nwhich files the agent is working with in real-time.\n\nSee protocol docs: [Following the Agent](https://agentclientprotocol.com/protocol/v2/draft/tool-calls#following-the-agent)',
  identifier: "ToolCallLocation",
});

export type SessionInfo = {
  readonly sessionId: SessionId;
  readonly cwd: AbsolutePath;
  readonly additionalDirectories?: ReadonlyArray<AbsolutePath>;
  readonly title?: string | null;
  readonly updatedAt?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionInfo = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "Unique identifier for the session",
  }),
  cwd: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
    description: "The working directory for this session. Must be an absolute path.",
  }),
  additionalDirectories: Schema.optionalKey(
    Schema.Array(AbsolutePath).annotate({
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
      Schema.String.annotate({
        description: "RFC 3339 timestamp of last activity.",
        format: "date-time",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Information about a session returned by session/list",
  identifier: "SessionInfo",
});

export type DiffPatch = { readonly format: DiffPatchFormat; readonly text: string };
export const DiffPatch = Schema.Struct({
  format: Schema.suspend((): Schema.Codec<DiffPatchFormat> => DiffPatchFormat).annotate({
    description: "Patch format. The only ACP-defined value is `git_patch`.",
  }),
  text: Schema.String.annotate({ description: "Patch text in the format named by `format`." }),
}).annotate({ description: "Renderable patch text and its format.", identifier: "DiffPatch" });

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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "A single entry in the execution plan.\n\nRepresents a task or goal that the assistant intends to accomplish\nas part of fulfilling the user's request.\nSee protocol docs: [Plan Entries](https://agentclientprotocol.com/protocol/v2/draft/agent-plan#plan-entries)",
  identifier: "PlanEntry",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Information about a command.", identifier: "AvailableCommand" });

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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
      readonly value: SessionConfigValueId;
      readonly type: "id";
    }
  | {
      readonly sessionId: SessionId;
      readonly configId: SessionConfigId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly value: boolean;
      readonly type: "boolean";
    }
  | ({
      readonly sessionId: SessionId;
      readonly configId: SessionConfigId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly type: string;
      readonly value: Schema.Json;
    } & { readonly [x: string]: Schema.Json });
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    value: Schema.suspend((): Schema.Codec<SessionConfigValueId> => SessionConfigValueId).annotate({
      description: "The value ID.",
    }),
    type: Schema.Literal("id"),
  }).annotate({ description: 'A [`SessionConfigValueId`] string value (`type: "id"`).' }),
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
    value: Schema.Boolean.annotate({ description: "The boolean value." }),
    type: Schema.Literal("boolean"),
  }).annotate({ description: 'A boolean value (`type: "boolean"`).' }),
  Schema.StructWithRest(
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
              "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.String.annotate({
        description:
          "Custom or future session configuration option value type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(new RegExp("^(?!(?:\\x69d|\\x62oolean)$)[\\s\\S]*$")).annotate({
          expected: "a string matching the RegExp ^(?!(?:\\x69d|\\x62oolean)$)[\\s\\S]*$",
        }),
      ),
      value: Schema.Json.annotate({
        expected: "JSON value",
        description: "Raw value payload for the custom or future value type.",
      }),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future session configuration option value payload.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse to `mcp/connect`.",
  identifier: "ConnectMcpResponse",
});

export type CancelRequestNotification = {
  readonly requestId: RequestId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CancelRequestNotification = Schema.Struct({
  requestId: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
    description: "The ID of the request to cancel.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Notification to cancel an ongoing request.\n\nSee protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/v2/draft/cancellation)",
  identifier: "CancelRequestNotification",
});

export type RequestPermissionOutcome =
  | { readonly outcome: "cancelled" }
  | {
      readonly outcome: "selected";
      readonly optionId: PermissionOptionId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly outcome: string } & { readonly [x: string]: Schema.Json });
export const RequestPermissionOutcome = Schema.Union([
  Schema.Struct({ outcome: Schema.Literal("cancelled") }).annotate({
    description:
      "Active session work was cancelled before the user responded.\n\nWhen a client sends a `session/cancel` notification to cancel active\nsession work, it MUST respond to all pending `session/request_permission`\nrequests with this `Cancelled` outcome.\n\nSee protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/v2/draft/prompt-lifecycle#cancellation)",
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "The user selected one of the provided options." }),
  Schema.StructWithRest(
    Schema.Struct({
      outcome: Schema.String.annotate({
        description:
          "Custom or future permission outcome.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(new RegExp("^(?!(?:\\x63ancelled|\\x73elected)$)[\\s\\S]*$")).annotate({
          expected: "a string matching the RegExp ^(?!(?:\\x63ancelled|\\x73elected)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future permission outcome.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nAgents that do not understand this outcome MUST NOT treat it as approval.\nThey should preserve the raw payload when storing, replaying, proxying, or\nforwarding permission responses, and otherwise fail or decline the\npermission request according to policy.",
  }),
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "An option presented to the user when requesting permission.",
  identifier: "PermissionOption",
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
    enum: Schema.Array(Schema.String)
      .annotate({ description: "Allowed enum values. Must contain at least one value." })
      .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for `mcp/connect`.",
  identifier: "ConnectMcpRequest",
});

export type LoginAuthRequest = {
  readonly methodId: AuthMethodId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const LoginAuthRequest = Schema.Struct({
  methodId: Schema.suspend((): Schema.Codec<AuthMethodId> => AuthMethodId).annotate({
    description:
      "The ID of the authentication method to use.\nMust be one of the methods advertised in the initialize response.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Request parameters for the `auth/login` method.\n\nSpecifies which authentication method to use.\n\nAgents MUST support this method when their `initialize` response advertised\nat least one valid authentication method. Clients MUST NOT call this method\nwhen `authMethods` was omitted or empty.",
  identifier: "LoginAuthRequest",
});

export type AuthMethod =
  | {
      readonly type: "terminal";
      readonly methodId: AuthMethodId;
      readonly name: string;
      readonly description?: string | null;
      readonly args?: ReadonlyArray<string>;
      readonly env?: ReadonlyArray<EnvVariable>;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "agent";
      readonly methodId: AuthMethodId;
      readonly name: string;
      readonly description?: string | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({
      readonly type: string;
      readonly methodId: AuthMethodId;
      readonly name: string;
      readonly description?: string | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    } & { readonly [x: string]: Schema.Json });
export const AuthMethod = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("terminal"),
    methodId: Schema.suspend((): Schema.Codec<AuthMethodId> => AuthMethodId).annotate({
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
    args: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description:
          "Additional arguments to append to the configured agent invocation for terminal auth.",
      }),
    ),
    env: Schema.optionalKey(
      Schema.Array(EnvVariable).annotate({
        description:
          "Additional environment variables to set on the configured agent invocation for terminal auth.\nNames MUST be unique. These values override same-named variables in the\nbase launch configuration.",
      }),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "Terminal-based authentication method.\n\nThe client runs the configured agent program as a separate interactive\nprocess for the user to authenticate via a TUI. Agents MUST advertise this\nmethod only when the client enabled its terminal authentication capability.\nA zero exit status signals success; any other termination signals failure.\nThe client MUST NOT pass this method to `auth/login`.",
  }),
  Schema.Struct({
    type: Schema.Literal("agent"),
    methodId: Schema.suspend((): Schema.Codec<AuthMethodId> => AuthMethodId).annotate({
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "Agent handles authentication itself through `auth/login`.\n\nThe `type` discriminator value is `agent`.",
  }),
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Custom or future authentication method type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(new RegExp("^(?!(?:\\x61gent|\\x74erminal)$)[\\s\\S]*$")).annotate({
          expected: "a string matching the RegExp ^(?!(?:\\x61gent|\\x74erminal)$)[\\s\\S]*$",
        }),
      ),
      methodId: Schema.suspend((): Schema.Codec<AuthMethodId> => AuthMethodId).annotate({
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
              "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
          }),
          Schema.Null,
        ]),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future authentication method.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nClients that do not understand this method type should preserve the raw\npayload when storing, replaying, proxying, or forwarding initialization\ndata, and otherwise ignore the method or display it generically.",
  }),
]).annotate({
  description:
    "Describes an available authentication method.\n\nThe `type` field acts as the discriminator in the serialized JSON form.",
  identifier: "AuthMethod",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
  baseUrl: Schema.String.annotate({
    description: "Base URL currently used by this provider.",
    format: "uri",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
    format: "uri",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for `providers/set`.\n\nReplaces the full configuration for one provider ID.",
  identifier: "SetProviderRequest",
});

export type ListSessionsRequest = {
  readonly cwd?: AbsolutePath | null;
  readonly cursor?: SessionListCursor | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ListSessionsRequest = Schema.Struct({
  cwd: Schema.optionalKey(
    Schema.Union([AbsolutePath, Schema.Null]).annotate({
      description: "Filter sessions by working directory. Must be an absolute path.",
    }),
  ),
  cursor: Schema.optionalKey(
    Schema.Union([SessionListCursor, Schema.Null]).annotate({
      description:
        "Opaque cursor token from a previous response's nextCursor field for cursor-based pagination",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Request parameters for listing existing sessions.",
  identifier: "ListSessionsRequest",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
  uri: Schema.String.annotate({
    description: "The URI of the file where the action occurred.",
    format: "uri",
  }),
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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

export type AuthCapabilities = {
  readonly terminal?: TerminalAuthCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AuthCapabilities = Schema.Struct({
  terminal: Schema.optionalKey(
    Schema.Union([TerminalAuthCapabilities, Schema.Null]).annotate({
      description:
        "Whether the client supports `terminal` authentication methods.\n\nOptional. Omitted or `null` both mean the client does not advertise support.\nThe client should supply `{}` only when it can reproduce the configured\nagent invocation in an interactive terminal. Supplying `{}` means the\nagent may include `terminal` entries in its authentication methods.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Authentication capabilities supported by the client.\n\nAdvertised during initialization to inform the agent which authentication\nmethod types the client can handle. This governs opt-in types that require\nadditional client-side support.",
  identifier: "AuthCapabilities",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
  readonly suggestionId: NesSuggestionId;
  readonly reason?: NesRejectReason | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const RejectNesNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  suggestionId: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Notification sent when a suggestion is rejected.",
  identifier: "RejectNesNotification",
});

export type McpServer =
  | {
      readonly type: "http";
      readonly name: string;
      readonly url: string;
      readonly headers?: ReadonlyArray<HttpHeader>;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "acp";
      readonly name: string;
      readonly serverId: McpServerAcpId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "stdio";
      readonly name: string;
      readonly command: AbsolutePath;
      readonly args?: ReadonlyArray<string>;
      readonly env?: ReadonlyArray<EnvVariable>;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly type: string } & { readonly [x: string]: Schema.Json });
export const McpServer = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("http"),
    name: Schema.String.annotate({
      description: "Human-readable name identifying this MCP server.",
    }),
    url: Schema.String.annotate({ description: "URL to the MCP server.", format: "uri" }),
    headers: Schema.optionalKey(
      Schema.Array(HttpHeader).annotate({
        description: "HTTP headers to set when making requests to the MCP server.",
      }),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "HTTP transport configuration for MCP." }),
  Schema.Struct({
    type: Schema.Literal("acp"),
    name: Schema.String.annotate({
      description: "Human-readable name identifying this MCP server.",
    }),
    serverId: Schema.suspend((): Schema.Codec<McpServerAcpId> => McpServerAcpId).annotate({
      description:
        "Unique identifier for this MCP server, generated by the component providing it.\n\nProviders MUST NOT reuse an ID for multiple ACP-transport MCP servers that are visible\non the same ACP connection.",
    }),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nACP transport configuration for MCP.\n\nThe MCP server is provided by an ACP component and communicates over the ACP channel\nusing `mcp/connect`, `mcp/message`, and `mcp/disconnect`.",
  }),
  Schema.Struct({
    type: Schema.Literal("stdio"),
    name: Schema.String.annotate({
      description: "Human-readable name identifying this MCP server.",
    }),
    command: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
      description: "Absolute path to the MCP server executable.",
    }),
    args: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description: "Command-line arguments to pass to the MCP server.",
      }),
    ),
    env: Schema.optionalKey(
      Schema.Array(EnvVariable).annotate({
        description: "Environment variables to set when launching the MCP server.",
      }),
    ),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "Stdio transport configuration for MCP." }),
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Custom or future MCP server transport type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(new RegExp("^(?!(?:\\x68ttp|\\x73tdio|\\x61cp)$)[\\s\\S]*$")).annotate({
          expected: "a string matching the RegExp ^(?!(?:\\x68ttp|\\x73tdio|\\x61cp)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future MCP server transport configuration.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nReceivers that do not understand this transport should preserve the raw\npayload when storing, replaying, proxying, or forwarding session setup\ndata, and otherwise ignore it or reject the server configuration.",
  }),
]).annotate({
  description:
    "Configuration for connecting to an MCP (Model Context Protocol) server.\n\nMCP servers provide tools and context that the agent can use when\nprocessing prompts.\n\nSee protocol docs: [MCP Servers](https://agentclientprotocol.com/protocol/v2/draft/session-setup#mcp-servers)",
  identifier: "McpServer",
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
      Schema.String.annotate({ description: "The root URI of the workspace.", format: "uri" }),
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
  uri: Schema.String.annotate({
    description: "The URI of the file containing the snippets.",
    format: "uri",
  }),
  excerpts: Schema.Array(NesExcerpt).annotate({ description: "The code excerpts." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "A related code snippet from a file.",
  identifier: "NesRelatedSnippet",
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
              "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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

export type SessionCapabilities = {
  readonly prompt?: PromptCapabilities | null;
  readonly mcp?: McpCapabilities | null;
  readonly delete?: SessionDeleteCapabilities | null;
  readonly additionalDirectories?: SessionAdditionalDirectoriesCapabilities | null;
  readonly fork?: SessionForkCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionCapabilities = Schema.Struct({
  prompt: Schema.optionalKey(
    Schema.Union([PromptCapabilities, Schema.Null]).annotate({
      description:
        "Prompt capabilities supported by the agent in `session/prompt` requests.\n\nOptional. Omitted or `null` both mean the agent does not advertise any\nprompt extensions beyond the baseline text and resource-link content\nrequired by `session/prompt`.",
    }),
  ),
  mcp: Schema.optionalKey(
    Schema.Union([McpCapabilities, Schema.Null]).annotate({
      description:
        "MCP capabilities supported by the agent for session lifecycle requests.\n\nOptional. Omitted or `null` both mean the agent does not advertise MCP\nserver transport support for sessions.",
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
        "Whether the agent supports `additionalDirectories` on supported session lifecycle requests.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports `additionalDirectories` on\nsupported session lifecycle requests.\n\nAgents may return `SessionInfo.additionalDirectories` to report the\ncomplete ordered additional-root list associated with a listed session.",
    }),
  ),
  fork: Schema.optionalKey(
    Schema.Union([SessionForkCapabilities, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nWhether the agent supports `session/fork`.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports forking sessions.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Session capabilities supported by the agent.\n\nSupplying `{}` means the agent supports the baseline session methods:\n`session/new`, `session/list`, `session/resume`, `session/close`,\n`session/prompt`, `session/cancel`, and `session/update`.\n\nAgents that support sessions **MAY** support additional session methods,\nprompt content types, and MCP transports by specifying additional\ncapabilities.\n\nSee protocol docs: [Session Capabilities](https://agentclientprotocol.com/protocol/v2/draft/initialization#session-capabilities)",
  identifier: "SessionCapabilities",
});

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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Document event capabilities the agent wants to receive.",
  identifier: "NesDocumentEventCapabilities",
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
