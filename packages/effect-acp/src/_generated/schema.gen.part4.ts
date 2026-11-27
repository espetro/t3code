import * as Schema from "effect/Schema";
import {
  AbsolutePath,
  CancelSessionNotification,
  CompactionId,
  CompactionStatus,
  Cost,
  DeleteSessionRequest,
  DidCloseDocumentNotification,
  DidOpenDocumentNotification,
  DidSaveDocumentNotification,
  DisconnectMcpResponse,
  ElicitationContentValue,
  ElicitationId,
  EnumOption,
  EnvVariable,
  ExtNotification,
  ExtRequest,
  ExtResponse,
  HttpHeader,
  ListProvidersRequest,
  LogoutAuthRequest,
  McpServerAcpId,
  MediaType,
  MessageId,
  MessageMcpResponse,
  NesSuggestionId,
  PermissionOptionId,
  PlanId,
  Position,
  RequestId,
  SessionConfigValueId,
  SessionId,
  StopReason,
  StringFormat,
  TerminalExitStatus,
  TerminalId,
  TerminalOutput,
  ToolCallId,
  Usage,
} from "./schema.gen.part0.ts";
import {
  AcceptNesNotification,
  Annotations,
  CancelRequestNotification,
  CloseNesRequest,
  CloseSessionRequest,
  ConnectMcpResponse,
  CreateElicitationResponse,
  DiffChange,
  DiffPatch,
  DisableProviderRequest,
  EmbeddedResourceResource,
  Error,
  Icon,
  ListSessionsRequest,
  LoginAuthRequest,
  MessageMcpNotification,
  MessageMcpRequest,
  MultiSelectItems,
  PlanEntry,
  RejectNesNotification,
  SetProviderRequest,
  SetSessionConfigOptionRequest,
  StartNesRequest,
} from "./schema.gen.part1.ts";
import {
  ContentBlock,
  DidChangeDocumentNotification,
  DidFocusDocumentNotification,
  ElicitationSchema,
  ForkSessionRequest,
  InitializeRequest,
  NesTextEdit,
  NewSessionRequest,
  PlanUpdateContent,
  PromptRequest,
  RequestPermissionResponse,
  ResumeSessionRequest,
  SessionConfigOption,
  SessionConfigSelectOptions,
  ToolCallContent,
} from "./schema.gen.part2.ts";
import {
  SuggestNesRequest,
  ToolCallUpdate,
} from "./schema.gen.part3.ts";

export type ClientNotification = {
  readonly method: string;
  readonly params?:
    | CancelSessionNotification
    | DidOpenDocumentNotification
    | DidChangeDocumentNotification
    | DidCloseDocumentNotification
    | DidSaveDocumentNotification
    | DidFocusDocumentNotification
    | AcceptNesNotification
    | RejectNesNotification
    | MessageMcpNotification
    | ExtNotification
    | null;
};
export const ClientNotification = Schema.Struct({
  method: Schema.String.annotate({ description: "The notification method name." }),
  params: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.suspend(
          (): Schema.Codec<CancelSessionNotification> => CancelSessionNotification,
        ).annotate({
          title: "CancelSessionNotification",
          description:
            "Cancels ongoing operations for a session.\n\nThis is a notification sent by the client to cancel active work in a\nsession.\n\nUpon receiving this notification, the Agent SHOULD:\n- Stop all language model requests as soon as possible\n- Abort all tool call invocations in progress\n- Send any pending `session/update` notifications\n- Report an idle `state_update` with `StopReason::Cancelled` after\n  cancellation succeeds\n\nSee protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/v2/draft/prompt-lifecycle#cancellation)",
        }),
        Schema.suspend(
          (): Schema.Codec<DidOpenDocumentNotification> => DidOpenDocumentNotification,
        ).annotate({
          title: "DidOpenDocumentNotification",
          description: "**UNSTABLE**\n\nNotification sent when a file is opened in the editor.",
        }),
        Schema.suspend(
          (): Schema.Codec<DidChangeDocumentNotification> => DidChangeDocumentNotification,
        ).annotate({
          title: "DidChangeDocumentNotification",
          description: "**UNSTABLE**\n\nNotification sent when a file is edited.",
        }),
        Schema.suspend(
          (): Schema.Codec<DidCloseDocumentNotification> => DidCloseDocumentNotification,
        ).annotate({
          title: "DidCloseDocumentNotification",
          description: "**UNSTABLE**\n\nNotification sent when a file is closed.",
        }),
        Schema.suspend(
          (): Schema.Codec<DidSaveDocumentNotification> => DidSaveDocumentNotification,
        ).annotate({
          title: "DidSaveDocumentNotification",
          description: "**UNSTABLE**\n\nNotification sent when a file is saved.",
        }),
        Schema.suspend(
          (): Schema.Codec<DidFocusDocumentNotification> => DidFocusDocumentNotification,
        ).annotate({
          title: "DidFocusDocumentNotification",
          description:
            "**UNSTABLE**\n\nNotification sent when a file becomes the active editor tab.",
        }),
        Schema.suspend((): Schema.Codec<AcceptNesNotification> => AcceptNesNotification).annotate({
          title: "AcceptNesNotification",
          description: "**UNSTABLE**\n\nNotification sent when a suggestion is accepted.",
        }),
        Schema.suspend((): Schema.Codec<RejectNesNotification> => RejectNesNotification).annotate({
          title: "RejectNesNotification",
          description: "**UNSTABLE**\n\nNotification sent when a suggestion is rejected.",
        }),
        Schema.suspend((): Schema.Codec<MessageMcpNotification> => MessageMcpNotification).annotate(
          {
            title: "MessageMcpNotification",
            description:
              "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nSends an MCP-over-ACP notification.",
          },
        ),
        Schema.suspend((): Schema.Codec<ExtNotification> => ExtNotification).annotate({
          title: "ExtNotification",
          description:
            "Handles extension notifications from the client.\n\nExtension notifications provide a way to send one-way messages for custom functionality\nwhile maintaining protocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
      ]).annotate({
        description:
          "All possible notifications that a client can send to an agent.\n\nThis enum is used internally for routing RPC notifications. You typically won't need\nto use this directly.\n\nNotifications do not expect a response.",
      }),
      Schema.Null,
    ]).annotate({ description: "Method-specific notification parameters." }),
  ),
}).annotate({ description: "A JSON-RPC notification object." });

export type ClientRequest = {
  readonly id: RequestId;
  readonly method: string;
  readonly params?:
    | InitializeRequest
    | LoginAuthRequest
    | ListProvidersRequest
    | SetProviderRequest
    | DisableProviderRequest
    | LogoutAuthRequest
    | NewSessionRequest
    | ListSessionsRequest
    | DeleteSessionRequest
    | ForkSessionRequest
    | ResumeSessionRequest
    | CloseSessionRequest
    | SetSessionConfigOptionRequest
    | PromptRequest
    | StartNesRequest
    | SuggestNesRequest
    | CloseNesRequest
    | MessageMcpRequest
    | ExtRequest
    | null;
};
export const ClientRequest = Schema.Struct({
  id: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
    description: "The request id used to correlate the matching response.",
  }),
  method: Schema.String.annotate({ description: "The method name to invoke." }),
  params: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.suspend((): Schema.Codec<InitializeRequest> => InitializeRequest).annotate({
          title: "InitializeRequest",
          description:
            "Establishes the connection with a client and negotiates protocol capabilities.\n\nThis method is called once at the beginning of the connection to:\n- Negotiate the protocol version to use\n- Exchange capability information between client and agent\n- Determine available authentication methods\n\nThe agent should respond with its supported protocol version and capabilities.\n\nSee protocol docs: [Initialization](https://agentclientprotocol.com/protocol/v2/draft/initialization)",
        }),
        Schema.suspend((): Schema.Codec<LoginAuthRequest> => LoginAuthRequest).annotate({
          title: "LoginAuthRequest",
          description:
            "Authenticates the client using the specified authentication method.\n\nAgents MUST support this method when their `initialize` response advertised\nat least one valid authentication method. Clients MUST call this method only\nwith a method whose type defines a protocol-driven login flow, and MUST NOT\ncall it when `authMethods` was omitted or empty.\n\nCalled when the agent requires authentication before allowing session creation.\nThe client provides the authentication method ID that was advertised during initialization.\n\nAfter successful authentication, the client can proceed to create sessions with\n`new_session` without receiving an `auth_required` error.\n\nSee protocol docs: [Initialization](https://agentclientprotocol.com/protocol/v2/draft/initialization)",
        }),
        Schema.suspend((): Schema.Codec<ListProvidersRequest> => ListProvidersRequest).annotate({
          title: "ListProvidersRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nLists providers that can be configured by the client.",
        }),
        Schema.suspend((): Schema.Codec<SetProviderRequest> => SetProviderRequest).annotate({
          title: "SetProviderRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nReplaces the configuration for a provider.",
        }),
        Schema.suspend((): Schema.Codec<DisableProviderRequest> => DisableProviderRequest).annotate(
          {
            title: "DisableProviderRequest",
            description:
              "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nDisables a provider.",
          },
        ),
        Schema.suspend((): Schema.Codec<LogoutAuthRequest> => LogoutAuthRequest).annotate({
          title: "LogoutAuthRequest",
          description:
            "Logs out of the current authenticated state.\n\nAgents MUST support this method when their `initialize` response advertised\nat least one valid authentication method. Clients MUST NOT call this method\nwhen `authMethods` was omitted or empty.\n\nAfter a successful logout, authentication-gated requests require the\nclient to complete an advertised authentication flow again. There is no\nguarantee about the behavior of already running sessions.",
        }),
        Schema.suspend((): Schema.Codec<NewSessionRequest> => NewSessionRequest).annotate({
          title: "NewSessionRequest",
          description:
            "Creates a new conversation session with the agent.\n\nSessions represent independent conversation contexts with their own history and state.\n\nThe agent should:\n- Create a new session context\n- Connect to any specified MCP servers\n- Return a unique session ID for future requests\n\nMay return an `auth_required` error if the agent requires authentication.\n\nSee protocol docs: [Session Setup](https://agentclientprotocol.com/protocol/v2/draft/session-setup)",
        }),
        Schema.suspend((): Schema.Codec<ListSessionsRequest> => ListSessionsRequest).annotate({
          title: "ListSessionsRequest",
          description:
            "Lists existing sessions known to the agent.\n\nThe agent should return metadata about sessions with optional filtering and pagination support.",
        }),
        Schema.suspend((): Schema.Codec<DeleteSessionRequest> => DeleteSessionRequest).annotate({
          title: "DeleteSessionRequest",
          description:
            "Deletes an existing session from `session/list`.\n\nThis method is only available if the agent advertises the `session.delete` capability.",
        }),
        Schema.suspend((): Schema.Codec<ForkSessionRequest> => ForkSessionRequest).annotate({
          title: "ForkSessionRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nForks an existing session to create a new independent session.\n\nThis method is only available if the agent advertises the `session.fork` capability.\n\nThe agent should create a new session with the same conversation context as the\noriginal, allowing operations like generating summaries without affecting the\noriginal session's history.",
        }),
        Schema.suspend((): Schema.Codec<ResumeSessionRequest> => ResumeSessionRequest).annotate({
          title: "ResumeSessionRequest",
          description:
            "Resumes an existing session.\n\nThe agent should resume the session context, allowing the conversation\nto continue. If `replayFrom` is set, the agent should replay\nconversation history before responding.",
        }),
        Schema.suspend((): Schema.Codec<CloseSessionRequest> => CloseSessionRequest).annotate({
          title: "CloseSessionRequest",
          description:
            "Closes an active session and frees up any resources associated with it.\n\nThe agent must cancel any ongoing work (as if `session/cancel` was called)\nand then free up any resources associated with the session.",
        }),
        Schema.suspend(
          (): Schema.Codec<SetSessionConfigOptionRequest> => SetSessionConfigOptionRequest,
        ).annotate({
          title: "SetSessionConfigOptionRequest",
          description: "Sets the current value for a session configuration option.",
        }),
        Schema.suspend((): Schema.Codec<PromptRequest> => PromptRequest).annotate({
          title: "PromptRequest",
          description:
            "Processes a user prompt within a session.\n\nThis request accepts the prompt:\n- Receives user messages with optional context (files, images, etc.)\n- Returns once the prompt is accepted\n\nAfter acceptance, the Agent reports the accepted user message,\nprocessing state, output, tool calls, and completion through\n`session/update` notifications.\n\nSee protocol docs: [Prompt Lifecycle](https://agentclientprotocol.com/protocol/v2/draft/prompt-lifecycle)",
        }),
        Schema.suspend((): Schema.Codec<StartNesRequest> => StartNesRequest).annotate({
          title: "StartNesRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nStarts an NES session.",
        }),
        Schema.suspend((): Schema.Codec<SuggestNesRequest> => SuggestNesRequest).annotate({
          title: "SuggestNesRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequests a code suggestion.",
        }),
        Schema.suspend((): Schema.Codec<CloseNesRequest> => CloseNesRequest).annotate({
          title: "CloseNesRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nCloses an active NES session and frees up any resources associated with it.\n\nThe agent must cancel any ongoing work and then free up any resources\nassociated with the NES session.",
        }),
        Schema.suspend((): Schema.Codec<MessageMcpRequest> => MessageMcpRequest).annotate({
          title: "MessageMcpRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nExchanges an MCP-over-ACP message.",
        }),
        Schema.suspend((): Schema.Codec<ExtRequest> => ExtRequest).annotate({
          title: "ExtMethodRequest",
          description:
            "Handles extension method requests from the client.\n\nExtension methods provide a way to add custom functionality while maintaining\nprotocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
      ]).annotate({
        description:
          "All possible requests that a client can send to an agent.\n\nThis enum is used internally for routing RPC requests. You typically won't need\nto use this directly.\n\nThis enum encompasses all method calls from client to agent.",
      }),
      Schema.Null,
    ]).annotate({ description: "Method-specific request parameters." }),
  ),
}).annotate({ description: "A JSON-RPC request object." });

export type ClientResponse =
  | {
      readonly id: RequestId;
      readonly result:
        | RequestPermissionResponse
        | CreateElicitationResponse
        | ConnectMcpResponse
        | DisconnectMcpResponse
        | MessageMcpResponse
        | ExtResponse;
    }
  | { readonly id: RequestId; readonly error: Error };
export const ClientResponse = Schema.Union([
  Schema.Struct({
    id: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
      description: "The id of the request this response answers.",
    }),
    result: Schema.Union([
      Schema.suspend(
        (): Schema.Codec<RequestPermissionResponse> => RequestPermissionResponse,
      ).annotate({
        title: "RequestPermissionResponse",
        description: "Successful result returned for a `session/request_permission` request.",
      }),
      Schema.suspend(
        (): Schema.Codec<CreateElicitationResponse> => CreateElicitationResponse,
      ).annotate({
        title: "CreateElicitationResponse",
        description: "Successful result returned for a `elicitation/create` request.",
      }),
      Schema.suspend((): Schema.Codec<ConnectMcpResponse> => ConnectMcpResponse).annotate({
        title: "ConnectMcpResponse",
        description: "Successful result returned for a `mcp/connect` request.",
      }),
      Schema.suspend((): Schema.Codec<DisconnectMcpResponse> => DisconnectMcpResponse).annotate({
        title: "DisconnectMcpResponse",
        description: "Successful result returned for a `mcp/disconnect` request.",
      }),
      Schema.suspend((): Schema.Codec<MessageMcpResponse> => MessageMcpResponse).annotate({
        title: "MessageMcpResponse",
        description: "Successful result returned by an MCP-over-ACP `mcp/message` request.",
      }),
      Schema.suspend((): Schema.Codec<ExtResponse> => ExtResponse).annotate({
        title: "ExtMethodResponse",
        description:
          "Successful result returned by an extension method outside the core ACP method set.",
      }),
    ]).annotate({ description: "Method-specific response data." }),
  }).annotate({ title: "Result", description: "A successful JSON-RPC response." }),
  Schema.Struct({
    id: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
      description: "The id of the request this response answers.",
    }),
    error: Schema.suspend((): Schema.Codec<Error> => Error).annotate({
      description: "Method-specific error data.",
    }),
  }).annotate({ title: "Error", description: "A failed JSON-RPC response." }),
]).annotate({ description: "A JSON-RPC response object." });

export type CommandPermissionSubject = {
  readonly command: string;
  readonly cwd: AbsolutePath;
  readonly toolCallId?: ToolCallId | null;
  readonly terminalId?: TerminalId | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CommandPermissionSubject = Schema.Struct({
  command: Schema.String.annotate({
    description: "The command that would be run if permission is granted.",
  }),
  cwd: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
    description: "The absolute working directory for the command.",
  }),
  toolCallId: Schema.optionalKey(
    Schema.Union([ToolCallId, Schema.Null]).annotate({
      description: "The associated tool call, when known. Omitted and `null` are equivalent.",
    }),
  ),
  terminalId: Schema.optionalKey(
    Schema.Union([TerminalId, Schema.Null]).annotate({
      description:
        "The associated terminal, when already known. Omitted and `null` are equivalent.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys. Omitted and `null` are equivalent and mean no subject metadata was provided.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Permission request details for a command." });

export type CompactionSummaryChunk = {
  readonly compactionId: CompactionId;
  readonly content: ContentBlock;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CompactionSummaryChunk = Schema.Struct({
  compactionId: Schema.suspend((): Schema.Codec<CompactionId> => CompactionId).annotate({
    description: "ID of the compaction whose summary receives this content.",
  }),
  content: Schema.suspend((): Schema.Codec<ContentBlock> => ContentBlock).annotate({
    description: "One content block to append.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description: "Metadata scoped to this chunk. Omission and `null` both mean absent.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA content block appended to the retained summary of an in-progress\ncompaction. Agents send chunks only after an `in_progress` update and before\nthe terminal update for the same ID.",
});

export type CompactionUpdate = {
  readonly compactionId: CompactionId;
  readonly status: CompactionStatus;
  readonly summary?: ReadonlyArray<ContentBlock> | null;
  readonly error?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CompactionUpdate = Schema.Struct({
  compactionId: Schema.suspend((): Schema.Codec<CompactionId> => CompactionId).annotate({
    description: "The Agent-owned ID of this compaction, unique within the session.",
  }),
  status: Schema.suspend((): Schema.Codec<CompactionStatus> => CompactionStatus).annotate({
    description: "Current lifecycle status.",
  }),
  summary: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ContentBlock).annotate({
        description: "Complete replacement user-displayable summary retained by the compaction.",
      }),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Human-readable description of why the compaction failed.",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description: "Extensible metadata patch for this compaction.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA context compaction upsert. The first update fixes the compaction's\ntimeline position. Later updates with the same ID patch that entity in place.\n\n`summary`, `error`, and `_meta` have patch semantics: omission leaves the\nstored value unchanged, `null` clears it, and a concrete value replaces it.\n`summary: []` also clears the retained summary. A non-empty summary is only\nvalid with `completed`; `error` is only valid with `failed`.",
});

export type ConfigOptionUpdate = {
  readonly configOptions: ReadonlyArray<SessionConfigOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ConfigOptionUpdate = Schema.Struct({
  configOptions: Schema.Array(SessionConfigOption).annotate({
    description: "The full set of configuration options and their current values.",
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
}).annotate({ description: "Session configuration options have been updated." });

export type Content = {
  readonly content: ContentBlock;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Content = Schema.Struct({
  content: Schema.suspend((): Schema.Codec<ContentBlock> => ContentBlock).annotate({
    description: "The actual content block.",
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
}).annotate({ description: "Standard content block (text, images, resources)." });

export type ContentChunk = {
  readonly messageId: MessageId;
  readonly content: ContentBlock;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ContentChunk = Schema.Struct({
  messageId: Schema.suspend((): Schema.Codec<MessageId> => MessageId).annotate({
    description:
      "A unique identifier for the message this chunk belongs to.\n\nAll chunks belonging to the same message share the same `messageId`.\nA change in `messageId` indicates a new message has started.",
  }),
  content: Schema.suspend((): Schema.Codec<ContentBlock> => ContentBlock).annotate({
    description: "A single item of content",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys. This field is chunk-scoped.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A streamed item of message content." });

export type Diff = {
  readonly changes: ReadonlyArray<DiffChange>;
  readonly patch?: DiffPatch | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Diff = Schema.Struct({
  changes: Schema.Array(DiffChange).annotate({
    description:
      "Structured file changes described by this diff.\n\nClients can use this field without parsing patch text to determine affected paths.",
  }),
  patch: Schema.optionalKey(
    Schema.Union([DiffPatch, Schema.Null]).annotate({
      description:
        "Renderable patch text for some or all of the structured changes.\n\nAgents SHOULD provide patch text whenever feasible. Omitted or `null`\nmeans no renderable patch text was provided.",
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
    "File changes produced by a tool call.\n\n`changes` is authoritative for affected absolute paths and operations.\n`patch` optionally carries renderable text for some or all of those changes\nand MUST be consistent with `changes`. Agents SHOULD provide `patch` whenever\nfeasible. Clients MUST handle diffs where `patch` is omitted or `null`.\n\nSee protocol docs: [Content](https://agentclientprotocol.com/protocol/v2/draft/tool-calls#content)",
});

export type DiffPathChange = { readonly path: AbsolutePath };
export const DiffPathChange = Schema.Struct({
  path: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
    description: "Absolute path for the operation.",
  }),
}).annotate({ description: "Operation metadata for add, delete, and modify changes." });

export type DiffPathPairChange = { readonly oldPath: AbsolutePath; readonly path: AbsolutePath };
export const DiffPathPairChange = Schema.Struct({
  oldPath: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
    description: "Absolute path before the operation.",
  }),
  path: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
    description: "Absolute path after the operation.",
  }),
}).annotate({ description: "Operation metadata for move and copy changes." });

export type ElicitationAcceptAction = {
  readonly content?: { readonly [x: string]: ElicitationContentValue } | null;
};
export const ElicitationAcceptAction = Schema.Struct({
  content: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, ElicitationContentValue).annotate({
        description:
          "The user-provided content, if any, as an object matching the requested schema.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "The user accepted the elicitation and provided content." });

export type ElicitationFormMode =
  | {
      readonly requestedSchema: ElicitationSchema;
      readonly sessionId: SessionId;
      readonly toolCallId?: ToolCallId | null;
    }
  | { readonly requestedSchema: ElicitationSchema; readonly requestId: RequestId };
export const ElicitationFormMode = Schema.Union([
  Schema.Struct({
    requestedSchema: Schema.suspend(
      (): Schema.Codec<ElicitationSchema> => ElicitationSchema,
    ).annotate({ description: "A JSON Schema describing the form fields to present to the user." }),
    sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
      description: "The session this elicitation is tied to.",
    }),
    toolCallId: Schema.optionalKey(
      Schema.Union([ToolCallId, Schema.Null]).annotate({
        description:
          "Optional tool call within the session.\n\nOptional. Omitted and `null` are equivalent and mean the elicitation is scoped to the\nsession without a specific tool call.",
      }),
    ),
  }).annotate({
    description:
      "Session-scoped elicitation, optionally tied to a specific tool call.\n\nWhen `tool_call_id` is set, the elicitation is tied to a specific tool call.\nThis is useful when an agent receives an elicitation from an MCP server\nduring a tool call and needs to redirect it to the user.",
  }),
  Schema.Struct({
    requestedSchema: Schema.suspend(
      (): Schema.Codec<ElicitationSchema> => ElicitationSchema,
    ).annotate({ description: "A JSON Schema describing the form fields to present to the user." }),
    requestId: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
      description: "The request this elicitation is tied to.",
    }),
  }).annotate({
    description:
      "Request-scoped elicitation, tied to a specific JSON-RPC request outside of a session\n(e.g., during auth/configuration phases before any session is started).",
  }),
]);

export type ElicitationRequestScope = { readonly requestId: RequestId };
export const ElicitationRequestScope = Schema.Struct({
  requestId: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
    description: "The request this elicitation is tied to.",
  }),
}).annotate({
  description:
    "Request-scoped elicitation, tied to a specific JSON-RPC request outside of a session\n(e.g., during auth/configuration phases before any session is started).",
});

export type ElicitationSessionScope = {
  readonly sessionId: SessionId;
  readonly toolCallId?: ToolCallId | null;
};
export const ElicitationSessionScope = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session this elicitation is tied to.",
  }),
  toolCallId: Schema.optionalKey(
    Schema.Union([ToolCallId, Schema.Null]).annotate({
      description:
        "Optional tool call within the session.\n\nOptional. Omitted and `null` are equivalent and mean the elicitation is scoped to the\nsession without a specific tool call.",
    }),
  ),
}).annotate({
  description:
    "Session-scoped elicitation, optionally tied to a specific tool call.\n\nWhen `tool_call_id` is set, the elicitation is tied to a specific tool call.\nThis is useful when an agent receives an elicitation from an MCP server\nduring a tool call and needs to redirect it to the user.",
});

export type ElicitationUrlMode =
  | {
      readonly elicitationId: ElicitationId;
      readonly url: string;
      readonly sessionId: SessionId;
      readonly toolCallId?: ToolCallId | null;
    }
  | { readonly elicitationId: ElicitationId; readonly url: string; readonly requestId: RequestId };
export const ElicitationUrlMode = Schema.Union([
  Schema.Struct({
    elicitationId: Schema.suspend((): Schema.Codec<ElicitationId> => ElicitationId).annotate({
      description: "The unique identifier for this elicitation.",
    }),
    url: Schema.String.annotate({ description: "The URL to direct the user to.", format: "uri" }),
    sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
      description: "The session this elicitation is tied to.",
    }),
    toolCallId: Schema.optionalKey(
      Schema.Union([ToolCallId, Schema.Null]).annotate({
        description:
          "Optional tool call within the session.\n\nOptional. Omitted and `null` are equivalent and mean the elicitation is scoped to the\nsession without a specific tool call.",
      }),
    ),
  }).annotate({
    description:
      "Session-scoped elicitation, optionally tied to a specific tool call.\n\nWhen `tool_call_id` is set, the elicitation is tied to a specific tool call.\nThis is useful when an agent receives an elicitation from an MCP server\nduring a tool call and needs to redirect it to the user.",
  }),
  Schema.Struct({
    elicitationId: Schema.suspend((): Schema.Codec<ElicitationId> => ElicitationId).annotate({
      description: "The unique identifier for this elicitation.",
    }),
    url: Schema.String.annotate({ description: "The URL to direct the user to.", format: "uri" }),
    requestId: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
      description: "The request this elicitation is tied to.",
    }),
  }).annotate({
    description:
      "Request-scoped elicitation, tied to a specific JSON-RPC request outside of a session\n(e.g., during auth/configuration phases before any session is started).",
  }),
]);

export type EmbeddedResource = {
  readonly resource: EmbeddedResourceResource;
  readonly annotations?: Annotations | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const EmbeddedResource = Schema.Struct({
  resource: Schema.suspend(
    (): Schema.Codec<EmbeddedResourceResource> => EmbeddedResourceResource,
  ).annotate({ description: "Embedded resource payload, either text or binary data." }),
  annotations: Schema.optionalKey(
    Schema.Union([Annotations, Schema.Null]).annotate({
      description:
        "Optional annotations that help clients decide how to display or route this content.",
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
  description: "The contents of a resource, embedded into a prompt or tool call result.",
});

export type IdleStateUpdate = {
  readonly stopReason?: StopReason | null;
  readonly usage?: Usage | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const IdleStateUpdate = Schema.Struct({
  stopReason: Schema.optionalKey(
    Schema.Union([StopReason, Schema.Null]).annotate({
      description:
        "Indicates why foreground work stopped.\n\nOptional. Omitted or `null` both mean the agent is not reporting a stop reason.\nAgents SHOULD include this when the idle transition ends foreground work.",
    }),
  ),
  usage: Schema.optionalKey(
    Schema.Union([Usage, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nToken usage for completed foreground work.\n\nOptional. Omitted or `null` both mean the agent is not reporting token\nusage for this state update.",
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
}).annotate({ description: "The agent is ready to process a new prompt." });

export type ImageContent = {
  readonly data: string;
  readonly mimeType: MediaType;
  readonly uri?: string | null;
  readonly annotations?: Annotations | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ImageContent = Schema.Struct({
  data: Schema.String.annotate({
    description: "Base64-encoded media payload.",
    contentEncoding: "base64",
  }),
  mimeType: Schema.suspend((): Schema.Codec<MediaType> => MediaType).annotate({
    description: "MIME type describing the encoded media payload.",
  }),
  uri: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "URI associated with this resource or media payload.",
        format: "uri",
      }),
      Schema.Null,
    ]),
  ),
  annotations: Schema.optionalKey(
    Schema.Union([Annotations, Schema.Null]).annotate({
      description:
        "Optional annotations that help clients decide how to display or route this content.",
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
}).annotate({ description: "An image provided to or from an LLM." });

export type IntegerPropertySchema = {
  readonly title?: string | null;
  readonly description?: string | null;
  readonly minimum?: number | null;
  readonly maximum?: number | null;
  readonly default?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const IntegerPropertySchema = Schema.Struct({
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional title for the property.\n\nOptional. Omitted and `null` are equivalent and mean no title is provided.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Human-readable description.\n\nOptional. Omitted and `null` are equivalent and mean no description is provided.",
      }),
      Schema.Null,
    ]),
  ),
  minimum: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Minimum value (inclusive).\n\nOptional. Omitted and `null` are equivalent and mean there is no inclusive lower bound.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  maximum: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Maximum value (inclusive).\n\nOptional. Omitted and `null` are equivalent and mean there is no inclusive upper bound.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  default: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Default value.\n\nOptional. Omitted and `null` are equivalent and mean no default value is provided.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
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
}).annotate({ description: "Schema for integer properties in an elicitation form." });

export type McpServerAcp = {
  readonly name: string;
  readonly serverId: McpServerAcpId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const McpServerAcp = Schema.Struct({
  name: Schema.String.annotate({ description: "Human-readable name identifying this MCP server." }),
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
});

export type McpServerHttp = {
  readonly name: string;
  readonly url: string;
  readonly headers?: ReadonlyArray<HttpHeader>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const McpServerHttp = Schema.Struct({
  name: Schema.String.annotate({ description: "Human-readable name identifying this MCP server." }),
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
}).annotate({ description: "HTTP transport configuration for MCP." });

export type McpServerStdio = {
  readonly name: string;
  readonly command: AbsolutePath;
  readonly args?: ReadonlyArray<string>;
  readonly env?: ReadonlyArray<EnvVariable>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const McpServerStdio = Schema.Struct({
  name: Schema.String.annotate({ description: "Human-readable name identifying this MCP server." }),
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
}).annotate({ description: "Stdio transport configuration for MCP." });

export type MultiSelectPropertySchema = {
  readonly title?: string | null;
  readonly description?: string | null;
  readonly minItems?: number | null;
  readonly maxItems?: number | null;
  readonly items: MultiSelectItems;
  readonly default?: ReadonlyArray<string> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const MultiSelectPropertySchema = Schema.Struct({
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional title for the property.\n\nOptional. Omitted and `null` are equivalent and mean no title is provided.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Human-readable description.\n\nOptional. Omitted and `null` are equivalent and mean no description is provided.",
      }),
      Schema.Null,
    ]),
  ),
  minItems: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Minimum number of items to select.\n\nOptional. Omitted and `null` are equivalent and mean there is no minimum selection count.",
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
  maxItems: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Maximum number of items to select.\n\nOptional. Omitted and `null` are equivalent and mean there is no maximum selection count.",
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
  items: Schema.suspend((): Schema.Codec<MultiSelectItems> => MultiSelectItems).annotate({
    description: "The items definition describing allowed values.",
  }),
  default: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Default selected values.\n\nOptional. Omitted and `null` are equivalent and mean no default selections are provided.",
      }),
      Schema.Null,
    ]),
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
}).annotate({ description: "Schema for multi-select (array) properties in an elicitation form." });

export type NesEditSuggestion = {
  readonly suggestionId: NesSuggestionId;
  readonly uri: string;
  readonly edits: ReadonlyArray<NesTextEdit>;
  readonly cursorPosition?: Position | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesEditSuggestion = Schema.Struct({
  suggestionId: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
    description: "Unique identifier for accept/reject tracking.",
  }),
  uri: Schema.String.annotate({ description: "The URI of the file to edit.", format: "uri" }),
  edits: Schema.Array(NesTextEdit)
    .annotate({ description: "The text edits to apply. Must contain at least one edit." })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
  cursorPosition: Schema.optionalKey(
    Schema.Union([Position, Schema.Null]).annotate({
      description: "Optional suggested cursor position after applying edits.",
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
}).annotate({ description: "A text edit suggestion." });

export type NesJumpSuggestion = {
  readonly suggestionId: NesSuggestionId;
  readonly uri: string;
  readonly position: Position;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesJumpSuggestion = Schema.Struct({
  suggestionId: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
    description: "Unique identifier for accept/reject tracking.",
  }),
  uri: Schema.String.annotate({ description: "The file to navigate to.", format: "uri" }),
  position: Schema.suspend((): Schema.Codec<Position> => Position).annotate({
    description: "The target position within the file.",
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
}).annotate({ description: "A jump-to-location suggestion." });

export type NesRenameSuggestion = {
  readonly suggestionId: NesSuggestionId;
  readonly uri: string;
  readonly position: Position;
  readonly newName: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesRenameSuggestion = Schema.Struct({
  suggestionId: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
    description: "Unique identifier for accept/reject tracking.",
  }),
  uri: Schema.String.annotate({
    description: "The file URI containing the symbol.",
    format: "uri",
  }),
  position: Schema.suspend((): Schema.Codec<Position> => Position).annotate({
    description: "The position of the symbol to rename.",
  }),
  newName: Schema.String.annotate({ description: "The new name for the symbol." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A rename symbol suggestion." });

export type NesSearchAndReplaceSuggestion = {
  readonly suggestionId: NesSuggestionId;
  readonly uri: string;
  readonly search: string;
  readonly replace: string;
  readonly isRegex?: boolean | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesSearchAndReplaceSuggestion = Schema.Struct({
  suggestionId: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
    description: "Unique identifier for accept/reject tracking.",
  }),
  uri: Schema.String.annotate({ description: "The file URI to search within.", format: "uri" }),
  search: Schema.String.annotate({ description: "The text or pattern to find." }),
  replace: Schema.String.annotate({ description: "The replacement text." }),
  isRegex: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description: "Whether `search` is a regular expression. Defaults to `false`.",
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
}).annotate({ description: "A search-and-replace suggestion." });

export type NumberPropertySchema = {
  readonly title?: string | null;
  readonly description?: string | null;
  readonly minimum?: number | null;
  readonly maximum?: number | null;
  readonly default?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NumberPropertySchema = Schema.Struct({
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional title for the property.\n\nOptional. Omitted and `null` are equivalent and mean no title is provided.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Human-readable description.\n\nOptional. Omitted and `null` are equivalent and mean no description is provided.",
      }),
      Schema.Null,
    ]),
  ),
  minimum: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Minimum value (inclusive).\n\nOptional. Omitted and `null` are equivalent and mean there is no inclusive lower bound.",
        format: "double",
      }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
      Schema.Null,
    ]),
  ),
  maximum: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Maximum value (inclusive).\n\nOptional. Omitted and `null` are equivalent and mean there is no inclusive upper bound.",
        format: "double",
      }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
      Schema.Null,
    ]),
  ),
  default: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Default value.\n\nOptional. Omitted and `null` are equivalent and mean no default value is provided.",
        format: "double",
      }).check(Schema.isFinite().annotate({ expected: "a finite number" })),
      Schema.Null,
    ]),
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
  description: "Schema for number (floating-point) properties in an elicitation form.",
});

export type PlanFile = {
  readonly planId: PlanId;
  readonly uri: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PlanFile = Schema.Struct({
  planId: Schema.suspend((): Schema.Codec<PlanId> => PlanId).annotate({
    description: "The plan ID to update.",
  }),
  uri: Schema.String.annotate({
    description: "The URI of the file containing the plan.",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA plan represented by a file URI.",
});

export type PlanItems = {
  readonly planId: PlanId;
  readonly entries: ReadonlyArray<PlanEntry>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PlanItems = Schema.Struct({
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A plan represented as structured entries." });

export type PlanMarkdown = {
  readonly planId: PlanId;
  readonly content: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PlanMarkdown = Schema.Struct({
  planId: Schema.suspend((): Schema.Codec<PlanId> => PlanId).annotate({
    description: "The plan ID to update.",
  }),
  content: Schema.String.annotate({ description: "Markdown content for the plan." }),
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA plan represented as raw markdown content.",
});

export type PlanRemoved = {
  readonly planId: PlanId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PlanRemoved = Schema.Struct({
  planId: Schema.suspend((): Schema.Codec<PlanId> => PlanId).annotate({
    description: "The plan ID to remove.",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRemoval notice for a plan identified by ID.",
});

export type PlanUpdate = {
  readonly plan: PlanUpdateContent;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PlanUpdate = Schema.Struct({
  plan: Schema.suspend((): Schema.Codec<PlanUpdateContent> => PlanUpdateContent).annotate({
    description: "The updated plan content.",
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
}).annotate({ description: "A content update for a plan identified by ID." });

export type ProtocolLevelNotification = {
  readonly method: string;
  readonly params?: CancelRequestNotification | null;
};
export const ProtocolLevelNotification = Schema.Struct({
  method: Schema.String.annotate({ description: "The notification method name." }),
  params: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.suspend(
          (): Schema.Codec<CancelRequestNotification> => CancelRequestNotification,
        ).annotate({
          title: "CancelRequestNotification",
          description:
            "Cancels an ongoing request.\n\nThis is a notification sent by the side that sent a request to cancel that request.\n\nUpon receiving this notification, the receiver:\n\n1. MAY cancel the corresponding request activity and all nested activities\n2. MAY send any pending notifications.\n3. MUST send one of these responses for the original request:\n  - Valid response with appropriate data (partial results or cancellation marker)\n  - Error response with code `-32800` (Cancelled)\n\nSee protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/v2/draft/cancellation)",
        }),
      ]).annotate({
        description:
          "General protocol-level notifications that all sides are expected to\nimplement.\n\nNotifications whose methods start with '$/' are messages which\nare protocol implementation dependent and might not be implementable in all\nclients or agents. For example if the implementation uses a single threaded\nsynchronous programming language then there is little it can do to react to\na `$/cancel_request` notification. If an agent or client receives\nnotifications starting with '$/' it is free to ignore the notification.\n\nNotifications do not expect a response.",
      }),
      Schema.Null,
    ]).annotate({ description: "Method-specific notification parameters." }),
  ),
}).annotate({ description: "A JSON-RPC notification object." });

export type ReplayFromStart = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const ReplayFromStart = Schema.Struct({
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
  description: "Inclusive replay cursor requesting replay from the start of the conversation.",
});

export type RequiresActionStateUpdate = {
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const RequiresActionStateUpdate = Schema.Struct({
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Foreground work is blocked on user action." });

export type ResourceLink = {
  readonly name: string;
  readonly uri: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly icons?: ReadonlyArray<Icon> | null;
  readonly mimeType?: MediaType | null;
  readonly size?: number | null;
  readonly annotations?: Annotations | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ResourceLink = Schema.Struct({
  name: Schema.String.annotate({
    description: "Human-readable name shown for this protocol object.",
  }),
  uri: Schema.String.annotate({
    description: "URI associated with this resource or media payload.",
    format: "uri",
  }),
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional display title for end-user UI." }),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable details shown with this protocol object.",
      }),
      Schema.Null,
    ]),
  ),
  icons: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Icon).annotate({
        description: "Optional set of sized icons that the client can display in a user interface.",
      }),
      Schema.Null,
    ]),
  ),
  mimeType: Schema.optionalKey(
    Schema.Union([MediaType, Schema.Null]).annotate({
      description: "MIME type describing the encoded media payload.",
    }),
  ),
  size: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Optional size of the linked resource in bytes, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  annotations: Schema.optionalKey(
    Schema.Union([Annotations, Schema.Null]).annotate({
      description:
        "Optional annotations that help clients decide how to display or route this content.",
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
    "A resource that the server is capable of reading, included in a prompt or tool call result.",
});

export type RunningStateUpdate = { readonly _meta?: { readonly [x: string]: Schema.Json } | null };
export const RunningStateUpdate = Schema.Struct({
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Foreground work is in progress." });

export type SelectedPermissionOutcome = {
  readonly optionId: PermissionOptionId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SelectedPermissionOutcome = Schema.Struct({
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
}).annotate({ description: "The user selected one of the provided options." });

export type SessionConfigBoolean = { readonly currentValue: boolean };
export const SessionConfigBoolean = Schema.Struct({
  currentValue: Schema.Boolean.annotate({
    description: "The current value of the boolean option.",
  }),
}).annotate({ description: "A boolean on/off toggle session configuration option payload." });

export type SessionConfigSelect = {
  readonly currentValue: SessionConfigValueId;
  readonly options: SessionConfigSelectOptions;
};
export const SessionConfigSelect = Schema.Struct({
  currentValue: Schema.suspend(
    (): Schema.Codec<SessionConfigValueId> => SessionConfigValueId,
  ).annotate({ description: "The currently selected value." }),
  options: Schema.suspend(
    (): Schema.Codec<SessionConfigSelectOptions> => SessionConfigSelectOptions,
  ).annotate({ description: "The set of selectable options." }),
}).annotate({
  description: "A single-value selector (dropdown) session configuration option payload.",
});

export type SessionInfoUpdate = {
  readonly title?: string | null;
  readonly updatedAt?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionInfoUpdate = Schema.Struct({
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Human-readable title for the session. Set to null to clear.",
      }),
      Schema.Null,
    ]),
  ),
  updatedAt: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "RFC 3339 timestamp of last activity. Set to null to clear.",
        format: "date-time",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Omitted means no metadata update; `null` is an\nexplicit clear signal. Implementations MUST NOT make assumptions about values at these keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Update to session metadata. All fields are optional to support partial updates.\n\nAgents send this notification to update session information like title or custom metadata.\nThis allows clients to display dynamic session names and track session state changes.\n\nOmitted fields leave the existing session info unchanged. `null` clears the\ncorresponding value.",
});

export type StateUpdate =
  | { readonly state: "running"; readonly _meta?: { readonly [x: string]: Schema.Json } | null }
  | {
      readonly state: "idle";
      readonly stopReason?: StopReason | null;
      readonly usage?: Usage | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly state: "requires_action";
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly state: string } & { readonly [x: string]: Schema.Json });
export const StateUpdate = Schema.Union([
  Schema.Struct({
    state: Schema.Literal("running"),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "Foreground work is in progress." }),
  Schema.Struct({
    state: Schema.Literal("idle"),
    stopReason: Schema.optionalKey(
      Schema.Union([StopReason, Schema.Null]).annotate({
        description:
          "Indicates why foreground work stopped.\n\nOptional. Omitted or `null` both mean the agent is not reporting a stop reason.\nAgents SHOULD include this when the idle transition ends foreground work.",
      }),
    ),
    usage: Schema.optionalKey(
      Schema.Union([Usage, Schema.Null]).annotate({
        description:
          "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nToken usage for completed foreground work.\n\nOptional. Omitted or `null` both mean the agent is not reporting token\nusage for this state update.",
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
  }).annotate({ description: "The agent is ready to process a new prompt." }),
  Schema.Struct({
    state: Schema.Literal("requires_action"),
    _meta: Schema.optionalKey(
      Schema.Union([
        Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
          description:
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "Foreground work is blocked on user action." }),
  Schema.StructWithRest(
    Schema.Struct({
      state: Schema.String.annotate({
        description:
          "Custom or future session state.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp("^(?!(?:\\x72unning|\\x69dle|\\x72equires_action)$)[\\s\\S]*$"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x72unning|\\x69dle|\\x72equires_action)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future session state.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
  }),
]).annotate({
  description:
    "The state of the agent's foreground work has changed.\n\nBackground activity can continue and emit other `session/update` notifications\nwhile `idle`. Those notifications do not change this state.",
});

export type StringMultiSelectItems = {
  readonly enum: ReadonlyArray<string>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const StringMultiSelectItems = Schema.Struct({
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
}).annotate({ description: "String item schema for multi-select enum properties." });

export type StringPropertySchema = {
  readonly title?: string | null;
  readonly description?: string | null;
  readonly minLength?: number | null;
  readonly maxLength?: number | null;
  readonly pattern?: string | null;
  readonly format?: StringFormat | null;
  readonly default?: string | null;
  readonly enum?: ReadonlyArray<string> | null;
  readonly oneOf?: ReadonlyArray<EnumOption> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const StringPropertySchema = Schema.Struct({
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional title for the property.\n\nOptional. Omitted and `null` are equivalent and mean no title is provided.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Human-readable description.\n\nOptional. Omitted and `null` are equivalent and mean no description is provided.",
      }),
      Schema.Null,
    ]),
  ),
  minLength: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Minimum string length.\n\nOptional. Omitted and `null` are equivalent and mean there is no minimum length constraint.",
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
  maxLength: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Maximum string length.\n\nOptional. Omitted and `null` are equivalent and mean there is no maximum length constraint.",
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
  pattern: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Pattern the string must match.\n\nOptional. Omitted and `null` are equivalent and mean there is no pattern constraint.",
        format: "regex",
      }),
      Schema.Null,
    ]),
  ),
  format: Schema.optionalKey(
    Schema.Union([StringFormat, Schema.Null]).annotate({
      description:
        "String format.\n\nOptional. Omitted and `null` are equivalent and mean there is no format constraint.",
    }),
  ),
  default: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Default value.\n\nOptional. Omitted and `null` are equivalent and mean no default value is provided.",
      }),
      Schema.Null,
    ]),
  ),
  enum: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String)
        .annotate({
          description:
            "Enum values for untitled single-select enums.\nMust contain at least one value when present.\nOptional. Omitted and `null` are equivalent and mean no untitled single-select choices are\ndeclared by `enum`.",
        })
        .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
      Schema.Null,
    ]),
  ),
  oneOf: Schema.optionalKey(
    Schema.Union([
      Schema.Array(EnumOption)
        .annotate({
          description:
            "Titled enum options for titled single-select enums.\nMust contain at least one option when present.\nOptional. Omitted and `null` are equivalent and mean no titled single-select choices are\ndeclared by `oneOf`.",
        })
        .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
      Schema.Null,
    ]),
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
  description:
    'Schema for string properties in an elicitation form.\n\nWhen `enum` or `oneOf` is set, this represents a single-select enum\nwith `"type": "string"`.',
});

export type Terminal = {
  readonly terminalId: TerminalId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Terminal = Schema.Struct({
  terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
    description: "The ID of the terminal to display.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys. This metadata is scoped to the content reference. Omitted\nand `null` are equivalent and mean no item metadata was provided.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "A display-only reference to an agent-owned terminal.\n\nTerminal state and output are delivered separately through\n[`TerminalUpdate`] and [`TerminalOutputChunk`].",
});

export type TerminalOutputChunk = {
  readonly terminalId: TerminalId;
  readonly data: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TerminalOutputChunk = Schema.Struct({
  terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
    description: "The terminal receiving these bytes.",
  }),
  data: Schema.String.annotate({
    description: "Independently base64-encoded terminal output bytes.",
    contentEncoding: "base64",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys. This field is chunk-scoped. Omitted and `null` are\nequivalent and mean no chunk metadata was provided.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A chunk of bytes appended to an agent-owned terminal's output." });

export type TerminalUpdate = {
  readonly terminalId: TerminalId;
  readonly command?: string | null;
  readonly cwd?: AbsolutePath | null;
  readonly output?: TerminalOutput | null;
  readonly exitStatus?: TerminalExitStatus | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TerminalUpdate = Schema.Struct({
  terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
    description: "Unique identifier for this terminal within the session.",
  }),
  command: Schema.optionalKey(
    Schema.Union([Schema.String.annotate({ description: "The command being run." }), Schema.Null]),
  ),
  cwd: Schema.optionalKey(
    Schema.Union([AbsolutePath, Schema.Null]).annotate({
      description: "The absolute working directory of the command.",
    }),
  ),
  output: Schema.optionalKey(
    Schema.Union([TerminalOutput, Schema.Null]).annotate({
      description: "An authoritative replacement snapshot of terminal output bytes.",
    }),
  ),
  exitStatus: Schema.optionalKey(
    Schema.Union([TerminalExitStatus, Schema.Null]).annotate({
      description: "Exit information. A concrete object marks the terminal as exited.",
    }),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Omitted means no metadata update; `null` is an\nexplicit clear signal. Implementations MUST NOT make assumptions about values at these keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "An upsert for the stored state of an agent-owned terminal.\n\nOnly [`TerminalUpdate::terminal_id`] is required. Other fields have patch\nsemantics: omitted fields leave the stored value unchanged, `null` clears\nit, and concrete values replace it. When the terminal ID is new, omitted\nfields start unknown.",
});

export type TextCommandInput = {
  readonly hint: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TextCommandInput = Schema.Struct({
  hint: Schema.String.annotate({
    description: "A hint to display when the input hasn't been provided yet",
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
  description: "All text that was typed after the command name is provided as input.",
});

export type TextContent = {
  readonly text: string;
  readonly annotations?: Annotations | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TextContent = Schema.Struct({
  text: Schema.String.annotate({ description: "Text payload carried by this content block." }),
  annotations: Schema.optionalKey(
    Schema.Union([Annotations, Schema.Null]).annotate({
      description:
        "Optional annotations that help clients decide how to display or route this content.",
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
}).annotate({ description: "Text provided to or from an LLM." });

export type ToolCallContentChunk = {
  readonly toolCallId: ToolCallId;
  readonly content: ToolCallContent;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ToolCallContentChunk = Schema.Struct({
  toolCallId: Schema.suspend((): Schema.Codec<ToolCallId> => ToolCallId).annotate({
    description: "The ID of the tool call this content belongs to.",
  }),
  content: Schema.suspend((): Schema.Codec<ToolCallContent> => ToolCallContent).annotate({
    description: "A single item of content produced by the tool call.",
  }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys. This field is chunk-scoped.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "A streamed item of tool-call content.\n\nTool-call content chunks append one [`ToolCallContent`] item to the current\ncontent for the matching [`ToolCallId`]. Agents can use\n[`ToolCallUpdate::content`] when they need to replace the whole content\ncollection instead.",
});

export type ToolCallPermissionSubject = { readonly toolCall: ToolCallUpdate };
export const ToolCallPermissionSubject = Schema.Struct({
  toolCall: Schema.suspend((): Schema.Codec<ToolCallUpdate> => ToolCallUpdate).annotate({
    description: "Details about the tool call requiring permission.",
  }),
}).annotate({ description: "Permission request details for a tool call." });

export type UsageUpdate = {
  readonly used: number;
  readonly size: number;
  readonly cost?: Cost | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const UsageUpdate = Schema.Struct({
  used: Schema.Number.annotate({ description: "Tokens currently in context.", format: "uint64" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  size: Schema.Number.annotate({
    description: "Total context window size in tokens.",
    format: "uint64",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  cost: Schema.optionalKey(
    Schema.Union([Cost, Schema.Null]).annotate({
      description: "Cumulative session cost (optional).",
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
}).annotate({ description: "Context window and cost update for a session." });

export type UserMessage = {
  readonly messageId: MessageId;
  readonly content?: ReadonlyArray<ContentBlock> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const UserMessage = Schema.Struct({
  messageId: Schema.suspend((): Schema.Codec<MessageId> => MessageId).annotate({
    description: "A unique identifier for the message.",
  }),
  content: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ContentBlock).annotate({
        description: "Complete replacement content for this message.",
      }),
      Schema.Null,
    ]),
  ),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys. Omitted means no metadata update; `null` is an explicit clear signal.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "A user message upsert.\n\nOnly [`UserMessage::message_id`] is required. `content` has patch semantics:\nan omitted field leaves existing message content unchanged, `null` clears the\nvalue, and a concrete array replaces the previous value. For a new\n`messageId`, omitted fields use client defaults. `content` is replaced as a\nwhole array; send `[]` or `null` to clear it.\n\nMessage updates and chunks are applied in the order they are received. When\na `user_message` update includes `content`, that array replaces any content\npreviously accumulated for the message, including content from earlier\nchunks. Later chunks with the same `messageId` append to the current\ncontent.",
});
