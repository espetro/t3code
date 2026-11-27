import * as Schema from "effect/Schema";
import {
  AbsolutePath,
  AgentAuthCapabilities,
  AuthMethodId,
  CloseNesResponse,
  CloseSessionResponse,
  CompactionId,
  CompactionStatus,
  Cost,
  DeleteSessionResponse,
  DisableProviderResponse,
  ElicitationId,
  EnvVariable,
  ExtNotification,
  ExtRequest,
  ExtResponse,
  Implementation,
  LoginAuthResponse,
  LogoutAuthResponse,
  MediaType,
  MessageId,
  MessageMcpResponse,
  NesTriggerKind,
  PlanId,
  Position,
  PositionEncodingKind,
  PromptResponse,
  ProtocolVersion,
  ProvidersCapabilities,
  RequestId,
  SessionId,
  SetProviderResponse,
  StartNesResponse,
  StopReason,
  TerminalExitStatus,
  TerminalId,
  TerminalOutput,
  ToolCallId,
  ToolCallStatus,
  ToolKind,
  Usage,
} from "./schema.gen.part0.ts";
import {
  Annotations,
  AuthMethod,
  AvailableCommand,
  CompleteElicitationNotification,
  ConnectMcpRequest,
  DisconnectMcpRequest,
  Error,
  MessageMcpNotification,
  MessageMcpRequest,
  PermissionOption,
  Range,
  RequestPermissionOutcome,
  SessionCapabilities,
  ToolCallLocation,
} from "./schema.gen.part1.ts";
import {
  ContentBlock,
  ElicitationSchema,
  ListProvidersResponse,
  ListSessionsResponse,
  NesCapabilities,
  NesSuggestContext,
  NesSuggestion,
  PlanUpdateContent,
  SessionConfigOption,
  ToolCallContent,
} from "./schema.gen.part2.ts";

export type CreateElicitationRequest =
  | {
      readonly message: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly mode: "form";
      readonly requestedSchema: ElicitationSchema;
      readonly sessionId: SessionId;
      readonly toolCallId?: ToolCallId | null;
    }
  | {
      readonly message: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly mode: "form";
      readonly requestedSchema: ElicitationSchema;
      readonly requestId: RequestId;
    }
  | {
      readonly message: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly mode: "url";
      readonly elicitationId: ElicitationId;
      readonly url: string;
      readonly sessionId: SessionId;
      readonly toolCallId?: ToolCallId | null;
    }
  | {
      readonly message: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly mode: "url";
      readonly elicitationId: ElicitationId;
      readonly url: string;
      readonly requestId: RequestId;
    }
  | ({
      readonly message: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly mode: string;
      readonly sessionId: SessionId;
      readonly toolCallId?: ToolCallId | null;
    } & { readonly [x: string]: Schema.Json })
  | ({
      readonly message: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly mode: string;
      readonly requestId: RequestId;
    } & { readonly [x: string]: Schema.Json });
export const CreateElicitationRequest = Schema.Union([
  Schema.Union([
    Schema.Struct({
      message: Schema.String.annotate({
        description: "A human-readable message describing what input is needed.",
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
      mode: Schema.Literal("form"),
      requestedSchema: Schema.suspend(
        (): Schema.Codec<ElicitationSchema> => ElicitationSchema,
      ).annotate({
        description: "A JSON Schema describing the form fields to present to the user.",
      }),
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
      message: Schema.String.annotate({
        description: "A human-readable message describing what input is needed.",
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
      mode: Schema.Literal("form"),
      requestedSchema: Schema.suspend(
        (): Schema.Codec<ElicitationSchema> => ElicitationSchema,
      ).annotate({
        description: "A JSON Schema describing the form fields to present to the user.",
      }),
      requestId: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
        description: "The request this elicitation is tied to.",
      }),
    }).annotate({
      description:
        "Request-scoped elicitation, tied to a specific JSON-RPC request outside of a session\n(e.g., during auth/configuration phases before any session is started).",
    }),
  ]),
  Schema.Union([
    Schema.Struct({
      message: Schema.String.annotate({
        description: "A human-readable message describing what input is needed.",
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
      mode: Schema.Literal("url"),
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
      message: Schema.String.annotate({
        description: "A human-readable message describing what input is needed.",
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
      mode: Schema.Literal("url"),
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
  ]),
  Schema.Union([
    Schema.StructWithRest(
      Schema.Struct({
        message: Schema.String.annotate({
          description: "A human-readable message describing what input is needed.",
        }),
        _meta: Schema.optionalKey(
          Schema.Union([
            Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate(
              {
                description:
                  "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
              },
            ),
            Schema.Null,
          ]),
        ),
        mode: Schema.String.annotate({
          description:
            "Custom or future elicitation mode.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
        }).check(
          Schema.isPattern(new RegExp("^(?!(?:\\x66orm|\\x75rl)$)[\\s\\S]*$")).annotate({
            expected: "a string matching the RegExp ^(?!(?:\\x66orm|\\x75rl)$)[\\s\\S]*$",
          }),
        ),
        sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
          description: "The session this elicitation is tied to.",
        }),
        toolCallId: Schema.optionalKey(
          Schema.Union([ToolCallId, Schema.Null]).annotate({
            description:
              "Optional tool call within the session.\n\nOptional. Omitted and `null` are equivalent and mean the elicitation is scoped to the\nsession without a specific tool call.",
          }),
        ),
      }),
      [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
    ).annotate({
      title: "other",
      description:
        "Session-scoped elicitation, optionally tied to a specific tool call.\n\nWhen `tool_call_id` is set, the elicitation is tied to a specific tool call.\nThis is useful when an agent receives an elicitation from an MCP server\nduring a tool call and needs to redirect it to the user.",
    }),
    Schema.StructWithRest(
      Schema.Struct({
        message: Schema.String.annotate({
          description: "A human-readable message describing what input is needed.",
        }),
        _meta: Schema.optionalKey(
          Schema.Union([
            Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate(
              {
                description:
                  "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
              },
            ),
            Schema.Null,
          ]),
        ),
        mode: Schema.String.annotate({
          description:
            "Custom or future elicitation mode.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
        }).check(
          Schema.isPattern(new RegExp("^(?!(?:\\x66orm|\\x75rl)$)[\\s\\S]*$")).annotate({
            expected: "a string matching the RegExp ^(?!(?:\\x66orm|\\x75rl)$)[\\s\\S]*$",
          }),
        ),
        requestId: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
          description: "The request this elicitation is tied to.",
        }),
      }),
      [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
    ).annotate({
      title: "other",
      description:
        "Request-scoped elicitation, tied to a specific JSON-RPC request outside of a session\n(e.g., during auth/configuration phases before any session is started).",
    }),
  ]),
]).annotate({ identifier: "CreateElicitationRequest" });

export type SuggestNesResponse = {
  readonly suggestions: ReadonlyArray<NesSuggestion>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SuggestNesResponse = Schema.Struct({
  suggestions: Schema.Array(NesSuggestion).annotate({ description: "The list of suggestions." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Response to `nes/suggest`.", identifier: "SuggestNesResponse" });

export type SuggestNesRequest = {
  readonly sessionId: SessionId;
  readonly uri: string;
  readonly version: number;
  readonly position: Position;
  readonly selection?: Range | null;
  readonly triggerKind: NesTriggerKind;
  readonly context?: NesSuggestContext | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SuggestNesRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  uri: Schema.String.annotate({
    description: "The URI of the document to suggest for.",
    format: "uri",
  }),
  version: Schema.Number.annotate({
    description: "The version number of the document.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  position: Schema.suspend((): Schema.Codec<Position> => Position).annotate({
    description: "The current cursor position.",
  }),
  selection: Schema.optionalKey(
    Schema.Union([Range, Schema.Null]).annotate({
      description: "The current text selection range, if any.",
    }),
  ),
  triggerKind: Schema.suspend((): Schema.Codec<NesTriggerKind> => NesTriggerKind).annotate({
    description: "What triggered this suggestion request.",
  }),
  context: Schema.optionalKey(
    Schema.Union([NesSuggestContext, Schema.Null]).annotate({
      description: "Context for the suggestion, included based on agent capabilities.",
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
}).annotate({ description: "Request for a code suggestion.", identifier: "SuggestNesRequest" });

export type AgentCapabilities = {
  readonly session?: SessionCapabilities | null;
  readonly auth?: AgentAuthCapabilities | null;
  readonly providers?: ProvidersCapabilities | null;
  readonly nes?: NesCapabilities | null;
  readonly positionEncoding?: PositionEncodingKind | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AgentCapabilities = Schema.Struct({
  session: Schema.optionalKey(
    Schema.Union([SessionCapabilities, Schema.Null]).annotate({
      description:
        "Session capabilities supported by the agent.\n\nOptional. Omitted or `null` both mean the agent does not support the\n`session/*` method surface. Supplying `{}` means the agent supports the\nbaseline session methods: `session/new`, `session/prompt`,\n`session/cancel`, and `session/update`.",
    }),
  ),
  auth: Schema.optionalKey(
    Schema.Union([AgentAuthCapabilities, Schema.Null]).annotate({
      description:
        "Authentication-related extension capabilities supported by the agent.\n\nOptional. Omitted or `null` both mean the agent does not advertise any\nauthentication-related extensions. This field does not advertise support\nfor `auth/login` or `auth/logout`; those methods are advertised by a\nnon-empty `authMethods` list in the `initialize` response.",
    }),
  ),
  providers: Schema.optionalKey(
    Schema.Union([ProvidersCapabilities, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nProvider configuration capabilities supported by the agent.\n\nOptional. Omitted or `null` both mean the agent does not advertise support.\nSupplying `{}` means the agent supports provider configuration methods.",
    }),
  ),
  nes: Schema.optionalKey(
    Schema.Union([NesCapabilities, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nNES (Next Edit Suggestions) capabilities supported by the agent.\n\nOptional. Omitted or `null` both mean the agent does not advertise support\nfor NES methods.",
    }),
  ),
  positionEncoding: Schema.optionalKey(
    Schema.Union([PositionEncodingKind, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nThe position encoding selected by the agent from the client's supported encodings.",
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
    "Capabilities supported by the agent.\n\nAdvertised during initialization to inform the client about\navailable features and content types.\n\nSee protocol docs: [Agent Capabilities](https://agentclientprotocol.com/protocol/v2/draft/initialization#agent-capabilities)",
  identifier: "AgentCapabilities",
});

export type ToolCallUpdate = {
  readonly toolCallId: ToolCallId;
  readonly name?: string | null;
  readonly title?: string | null;
  readonly kind?: ToolKind | null;
  readonly status?: ToolCallStatus | null;
  readonly content?: ReadonlyArray<ToolCallContent> | null;
  readonly locations?: ReadonlyArray<ToolCallLocation> | null;
  readonly rawInput?: Schema.Json;
  readonly rawOutput?: Schema.Json;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ToolCallUpdate = Schema.Struct({
  toolCallId: Schema.suspend((): Schema.Codec<ToolCallId> => ToolCallId).annotate({
    description: "Unique identifier for this tool call within the session.",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nProgrammatic name of the tool being invoked.\n\nThis field is optional and has patch semantics. Omission means no\nchange, `null` clears the name, and a string replaces it. For a tool\ncall ID the client has not seen before, omission or `null` means that no\ntool name is available.",
      }),
      Schema.Null,
    ]),
  ),
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Human-readable title describing what the tool is doing.",
      }),
      Schema.Null,
    ]),
  ),
  kind: Schema.optionalKey(
    Schema.Union([ToolKind, Schema.Null]).annotate({
      description:
        "The category of tool being invoked.\nHelps clients choose appropriate icons and UI treatment.",
    }),
  ),
  status: Schema.optionalKey(
    Schema.Union([ToolCallStatus, Schema.Null]).annotate({
      description: "Current execution status of the tool call.",
    }),
  ),
  content: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ToolCallContent).annotate({ description: "Content produced by the tool call." }),
      Schema.Null,
    ]),
  ),
  locations: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ToolCallLocation).annotate({
        description:
          'File locations affected by this tool call.\nEnables "follow-along" features in clients.',
      }),
      Schema.Null,
    ]),
  ),
  rawInput: Schema.optionalKey(
    Schema.Json.annotate({
      expected: "JSON value",
      description: "Raw input parameters sent to the tool.",
    }),
  ),
  rawOutput: Schema.optionalKey(
    Schema.Json.annotate({
      expected: "JSON value",
      description: "Raw output returned by the tool.",
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
    "Represents an upsert for a tool call that the language model has requested.\n\nTool calls are actions that the agent executes on behalf of the language model,\nsuch as reading files, executing code, or fetching data from external sources.\n\nOnly [`ToolCallUpdate::tool_call_id`] is required. Other fields have patch semantics:\nomitted fields leave the existing tool call value unchanged, `null` clears or\nunsets the value, and concrete values replace the previous value. For\ncollection fields, concrete arrays replace the previous collection, and both\n`null` and `[]` clear the collection. When a client receives a tool call ID it\nhas not seen before, omitted fields use client defaults.\n\nSee protocol docs: [Tool Calls](https://agentclientprotocol.com/protocol/v2/draft/tool-calls)",
  identifier: "ToolCallUpdate",
});

export type SessionUpdate =
  | {
      readonly sessionUpdate: "user_message_chunk";
      readonly messageId: MessageId;
      readonly content: ContentBlock;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "user_message";
      readonly messageId: MessageId;
      readonly content?: ReadonlyArray<ContentBlock> | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "agent_message_chunk";
      readonly messageId: MessageId;
      readonly content: ContentBlock;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "agent_message";
      readonly messageId: MessageId;
      readonly content?: ReadonlyArray<ContentBlock> | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "agent_thought_chunk";
      readonly messageId: MessageId;
      readonly content: ContentBlock;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "agent_thought";
      readonly messageId: MessageId;
      readonly content?: ReadonlyArray<ContentBlock> | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "state_update";
      readonly state: "running";
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "state_update";
      readonly state: "idle";
      readonly stopReason?: StopReason | null;
      readonly usage?: Usage | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "state_update";
      readonly state: "requires_action";
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly sessionUpdate: "state_update"; readonly state: string } & {
      readonly [x: string]: Schema.Json;
    })
  | {
      readonly sessionUpdate: "tool_call_content_chunk";
      readonly toolCallId: ToolCallId;
      readonly content: ToolCallContent;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "tool_call_update";
      readonly toolCallId: ToolCallId;
      readonly name?: string | null;
      readonly title?: string | null;
      readonly kind?: ToolKind | null;
      readonly status?: ToolCallStatus | null;
      readonly content?: ReadonlyArray<ToolCallContent> | null;
      readonly locations?: ReadonlyArray<ToolCallLocation> | null;
      readonly rawInput?: Schema.Json;
      readonly rawOutput?: Schema.Json;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "terminal_update";
      readonly terminalId: TerminalId;
      readonly command?: string | null;
      readonly cwd?: AbsolutePath | null;
      readonly output?: TerminalOutput | null;
      readonly exitStatus?: TerminalExitStatus | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "terminal_output_chunk";
      readonly terminalId: TerminalId;
      readonly data: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "plan_update";
      readonly plan: PlanUpdateContent;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "plan_removed";
      readonly planId: PlanId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "available_commands_update";
      readonly availableCommands: ReadonlyArray<AvailableCommand>;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "config_option_update";
      readonly configOptions: ReadonlyArray<SessionConfigOption>;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "session_info_update";
      readonly title?: string | null;
      readonly updatedAt?: string | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "usage_update";
      readonly used: number;
      readonly size: number;
      readonly cost?: Cost | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "compaction_update";
      readonly compactionId: CompactionId;
      readonly status: CompactionStatus;
      readonly summary?: ReadonlyArray<ContentBlock> | null;
      readonly error?: string | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "compaction_summary_chunk";
      readonly compactionId: CompactionId;
      readonly content: ContentBlock;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly sessionUpdate: string } & { readonly [x: string]: Schema.Json });
export const SessionUpdate = Schema.Union([
  Schema.Struct({
    sessionUpdate: Schema.Literal("user_message_chunk"),
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
  }).annotate({ description: "A streamed item of message content." }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("user_message"),
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
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("agent_message_chunk"),
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
  }).annotate({ description: "A streamed item of message content." }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("agent_message"),
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
      "An agent message upsert.\n\nOnly [`AgentMessage::message_id`] is required. `content` has patch semantics:\nan omitted field leaves existing message content unchanged, `null` clears the\nvalue, and a concrete array replaces the previous value. For a new\n`messageId`, omitted fields use client defaults. `content` is replaced as a\nwhole array; send `[]` or `null` to clear it.\n\nMessage updates and chunks are applied in the order they are received. When\nan `agent_message` update includes `content`, that array replaces any\ncontent previously accumulated for the message, including content from\nearlier chunks. Later chunks with the same `messageId` append to the current\ncontent.",
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("agent_thought_chunk"),
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
  }).annotate({ description: "A streamed item of message content." }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("agent_thought"),
    messageId: Schema.suspend((): Schema.Codec<MessageId> => MessageId).annotate({
      description: "A unique identifier for the thought message.",
    }),
    content: Schema.optionalKey(
      Schema.Union([
        Schema.Array(ContentBlock).annotate({
          description: "Complete replacement content for this thought message.",
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
      "An agent thought or reasoning message upsert.\n\nOnly [`AgentThought::message_id`] is required. `content` has patch semantics:\nan omitted field leaves existing thought content unchanged, `null` clears the\nvalue, and a concrete array replaces the previous value. For a new\n`messageId`, omitted fields use client defaults. `content` is replaced as a\nwhole array; send `[]` or `null` to clear it.\n\nMessage updates and chunks are applied in the order they are received. When\nan `agent_thought` update includes `content`, that array replaces any\ncontent previously accumulated for the thought, including content from\nearlier chunks. Later chunks with the same `messageId` append to the current\ncontent.",
  }),
  Schema.Union([
    Schema.Struct({
      sessionUpdate: Schema.Literal("state_update"),
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
      sessionUpdate: Schema.Literal("state_update"),
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
      sessionUpdate: Schema.Literal("state_update"),
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
        sessionUpdate: Schema.Literal("state_update"),
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
  ]),
  Schema.Struct({
    sessionUpdate: Schema.Literal("tool_call_content_chunk"),
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
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("tool_call_update"),
    toolCallId: Schema.suspend((): Schema.Codec<ToolCallId> => ToolCallId).annotate({
      description: "Unique identifier for this tool call within the session.",
    }),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nProgrammatic name of the tool being invoked.\n\nThis field is optional and has patch semantics. Omission means no\nchange, `null` clears the name, and a string replaces it. For a tool\ncall ID the client has not seen before, omission or `null` means that no\ntool name is available.",
        }),
        Schema.Null,
      ]),
    ),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Human-readable title describing what the tool is doing.",
        }),
        Schema.Null,
      ]),
    ),
    kind: Schema.optionalKey(
      Schema.Union([ToolKind, Schema.Null]).annotate({
        description:
          "The category of tool being invoked.\nHelps clients choose appropriate icons and UI treatment.",
      }),
    ),
    status: Schema.optionalKey(
      Schema.Union([ToolCallStatus, Schema.Null]).annotate({
        description: "Current execution status of the tool call.",
      }),
    ),
    content: Schema.optionalKey(
      Schema.Union([
        Schema.Array(ToolCallContent).annotate({
          description: "Content produced by the tool call.",
        }),
        Schema.Null,
      ]),
    ),
    locations: Schema.optionalKey(
      Schema.Union([
        Schema.Array(ToolCallLocation).annotate({
          description:
            'File locations affected by this tool call.\nEnables "follow-along" features in clients.',
        }),
        Schema.Null,
      ]),
    ),
    rawInput: Schema.optionalKey(
      Schema.Json.annotate({
        expected: "JSON value",
        description: "Raw input parameters sent to the tool.",
      }),
    ),
    rawOutput: Schema.optionalKey(
      Schema.Json.annotate({
        expected: "JSON value",
        description: "Raw output returned by the tool.",
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
      "Represents an upsert for a tool call that the language model has requested.\n\nTool calls are actions that the agent executes on behalf of the language model,\nsuch as reading files, executing code, or fetching data from external sources.\n\nOnly [`ToolCallUpdate::tool_call_id`] is required. Other fields have patch semantics:\nomitted fields leave the existing tool call value unchanged, `null` clears or\nunsets the value, and concrete values replace the previous value. For\ncollection fields, concrete arrays replace the previous collection, and both\n`null` and `[]` clear the collection. When a client receives a tool call ID it\nhas not seen before, omitted fields use client defaults.\n\nSee protocol docs: [Tool Calls](https://agentclientprotocol.com/protocol/v2/draft/tool-calls)",
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("terminal_update"),
    terminalId: Schema.suspend((): Schema.Codec<TerminalId> => TerminalId).annotate({
      description: "Unique identifier for this terminal within the session.",
    }),
    command: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "The command being run." }),
        Schema.Null,
      ]),
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
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("terminal_output_chunk"),
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
  }).annotate({ description: "A chunk of bytes appended to an agent-owned terminal's output." }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("plan_update"),
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
  }).annotate({ description: "A content update for a plan identified by ID." }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("plan_removed"),
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
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("available_commands_update"),
    availableCommands: Schema.Array(AvailableCommand).annotate({
      description: "Commands the agent can execute.",
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
  }).annotate({ description: "Available commands are ready or have changed" }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("config_option_update"),
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
  }).annotate({ description: "Session configuration options have been updated." }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("session_info_update"),
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
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("usage_update"),
    used: Schema.Number.annotate({ description: "Tokens currently in context.", format: "uint64" })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
    size: Schema.Number.annotate({
      description: "Total context window size in tokens.",
      format: "uint64",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
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
  }).annotate({ description: "Context window and cost update for a session." }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("compaction_update"),
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
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("compaction_summary_chunk"),
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
  }),
  Schema.StructWithRest(
    Schema.Struct({
      sessionUpdate: Schema.String.annotate({
        description:
          "Custom or future session update type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp(
            "^(?!(?:\\x75ser_message_chunk|\\x75ser_message|\\x61gent_message_chunk|\\x61gent_message|\\x61gent_thought_chunk|\\x61gent_thought|\\x73tate_update|\\x74ool_call_content_chunk|\\x74ool_call_update|\\x74erminal_update|\\x74erminal_output_chunk|\\x70lan_update|\\x61vailable_commands_update|\\x63onfig_option_update|\\x73ession_info_update|\\x70lan_removed|\\x75sage_update|\\x63ompaction_update|\\x63ompaction_summary_chunk)$)[\\s\\S]*$",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x75ser_message_chunk|\\x75ser_message|\\x61gent_message_chunk|\\x61gent_message|\\x61gent_thought_chunk|\\x61gent_thought|\\x73tate_update|\\x74ool_call_content_chunk|\\x74ool_call_update|\\x74erminal_update|\\x74erminal_output_chunk|\\x70lan_update|\\x61vailable_commands_update|\\x63onfig_option_update|\\x73ession_info_update|\\x70lan_removed|\\x75sage_update|\\x63ompaction_update|\\x63ompaction_summary_chunk)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future session update.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nReceivers that do not understand this update type should preserve the\nraw payload when storing, replaying, proxying, or forwarding session\nhistory, and otherwise ignore it or display it generically.",
  }),
]).annotate({
  description:
    "Different types of updates that can be sent while a session exists.\n\nThese updates report messages, progress, and other session activity.\n\nSee protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/v2/draft/prompt-lifecycle#3-agent-reports-output)",
  identifier: "SessionUpdate",
});

export type NewSessionResponse = {
  readonly sessionId: SessionId;
  readonly configOptions?: ReadonlyArray<SessionConfigOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NewSessionResponse = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description:
      "Unique identifier for the created session.\n\nUsed in all subsequent requests for this conversation.",
  }),
  configOptions: Schema.optionalKey(
    Schema.Array(SessionConfigOption).annotate({
      description: "Initial session configuration options.",
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
    "Response from creating a new session.\n\nSee protocol docs: [Creating a Session](https://agentclientprotocol.com/protocol/v2/draft/session-setup#creating-a-session)",
  identifier: "NewSessionResponse",
});

export type ForkSessionResponse = {
  readonly sessionId: SessionId;
  readonly configOptions?: ReadonlyArray<SessionConfigOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ForkSessionResponse = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "Unique identifier for the newly created forked session.",
  }),
  configOptions: Schema.optionalKey(
    Schema.Array(SessionConfigOption).annotate({
      description: "Initial session configuration options.",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse from forking an existing session.",
  identifier: "ForkSessionResponse",
});

export type ResumeSessionResponse = {
  readonly configOptions?: ReadonlyArray<SessionConfigOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ResumeSessionResponse = Schema.Struct({
  configOptions: Schema.optionalKey(
    Schema.Array(SessionConfigOption).annotate({
      description: "Initial session configuration options.",
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
  description: "Response from resuming an existing session.",
  identifier: "ResumeSessionResponse",
});

export type SetSessionConfigOptionResponse = {
  readonly configOptions: ReadonlyArray<SessionConfigOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SetSessionConfigOptionResponse = Schema.Struct({
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
}).annotate({
  description: "Response to `session/set_config_option` method.",
  identifier: "SetSessionConfigOptionResponse",
});

export type InitializeResponse = {
  readonly protocolVersion: ProtocolVersion;
  readonly info: Implementation;
  readonly capabilities?: AgentCapabilities;
  readonly authMethods?: ReadonlyArray<AuthMethod>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const InitializeResponse = Schema.Struct({
  protocolVersion: Schema.suspend((): Schema.Codec<ProtocolVersion> => ProtocolVersion).annotate({
    description:
      "The protocol version the client specified if supported by the agent,\nor the latest protocol version supported by the agent.\n\nThe client should disconnect, if it doesn't support this version.",
  }),
  info: Schema.suspend((): Schema.Codec<Implementation> => Implementation).annotate({
    description: "Information about the implementation sending this initialize response.",
  }),
  capabilities: Schema.optionalKey(
    Schema.suspend((): Schema.Codec<AgentCapabilities> => AgentCapabilities).annotate({
      description: "Capabilities supported by the agent.",
      default: {},
    }),
  ),
  authMethods: Schema.optionalKey(
    Schema.Array(AuthMethod).annotate({
      description:
        "Authentication methods supported by the agent.\n\nOptional. Omitted or empty means the agent does not advertise the\nauthentication method surface. Supplying one or more valid methods means\nthe agent MUST support both `auth/login` and `auth/logout`.",
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
    "Response to the `initialize` method.\n\nContains the negotiated protocol version and agent capabilities.\n\nSee protocol docs: [Initialization](https://agentclientprotocol.com/protocol/v2/draft/initialization)",
  identifier: "InitializeResponse",
});

export type RequestPermissionSubject =
  | { readonly type: "tool_call"; readonly toolCall: ToolCallUpdate }
  | {
      readonly type: "command";
      readonly command: string;
      readonly cwd: AbsolutePath;
      readonly toolCallId?: ToolCallId | null;
      readonly terminalId?: TerminalId | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly type: string } & { readonly [x: string]: Schema.Json });
export const RequestPermissionSubject = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("tool_call"),
    toolCall: Schema.suspend((): Schema.Codec<ToolCallUpdate> => ToolCallUpdate).annotate({
      description: "Details about the tool call requiring permission.",
    }),
  }).annotate({ description: "Permission request details for a tool call." }),
  Schema.Struct({
    type: Schema.Literal("command"),
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
  }).annotate({ description: "Permission request details for a command." }),
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Custom or future permission subject type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(new RegExp("^(?!(?:\\x74ool_call|\\x63ommand)$)[\\s\\S]*$")).annotate({
          expected: "a string matching the RegExp ^(?!(?:\\x74ool_call|\\x63ommand)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future permission subject.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nClients that do not understand this subject type should preserve the raw\npayload when storing, replaying, proxying, or forwarding permission\nrequests, and otherwise display a generic permission prompt or decline it\naccording to policy.",
  }),
]).annotate({
  description: "The operation requiring permission.",
  identifier: "RequestPermissionSubject",
});

export type UpdateSessionNotification = {
  readonly sessionId: SessionId;
  readonly update: SessionUpdate;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const UpdateSessionNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the session this update pertains to.",
  }),
  update: Schema.suspend((): Schema.Codec<SessionUpdate> => SessionUpdate).annotate({
    description: "The actual update content.",
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
    "Notification containing a session update from the agent.\n\nAgents can send session updates at any point while the session exists.\n\nSee protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/v2/draft/prompt-lifecycle#3-agent-reports-output)",
  identifier: "UpdateSessionNotification",
});

export type RequestPermissionRequest = {
  readonly sessionId: SessionId;
  readonly title: string;
  readonly description?: string | null;
  readonly subject?: RequestPermissionSubject | null;
  readonly options: ReadonlyArray<PermissionOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const RequestPermissionRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this request.",
  }),
  title: Schema.String.annotate({
    description:
      "Human-readable title for the permission prompt.\n\nThis title is specific to the permission prompt and does not update any\nsubject's displayed title.",
  }),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional human-readable explanation of why permission is needed.\n\nThis text is specific to the permission prompt and does not update any\nsubject's displayed content. Omitted or `null` both mean no separate\npermission description was provided.",
      }),
      Schema.Null,
    ]),
  ),
  subject: Schema.optionalKey(
    Schema.Union([RequestPermissionSubject, Schema.Null]).annotate({
      description:
        "Optional structured context about the operation requiring permission.\n\nOmitted or `null` both mean no structured subject was provided.",
    }),
  ),
  options: Schema.Array(PermissionOption)
    .annotate({
      description:
        "Available permission options for the user to choose from.\nMust contain at least one option.",
    })
    .check(Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" })),
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
    "Request for user permission to proceed with an operation.\n\nSent when the agent needs authorization before performing a sensitive operation.\n\nSee protocol docs: [Requesting Permission](https://agentclientprotocol.com/protocol/v2/draft/tool-calls#requesting-permission)",
  identifier: "RequestPermissionRequest",
});

export type AgentMessage = {
  readonly messageId: MessageId;
  readonly content?: ReadonlyArray<ContentBlock> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AgentMessage = Schema.Struct({
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
    "An agent message upsert.\n\nOnly [`AgentMessage::message_id`] is required. `content` has patch semantics:\nan omitted field leaves existing message content unchanged, `null` clears the\nvalue, and a concrete array replaces the previous value. For a new\n`messageId`, omitted fields use client defaults. `content` is replaced as a\nwhole array; send `[]` or `null` to clear it.\n\nMessage updates and chunks are applied in the order they are received. When\nan `agent_message` update includes `content`, that array replaces any\ncontent previously accumulated for the message, including content from\nearlier chunks. Later chunks with the same `messageId` append to the current\ncontent.",
});

export type AgentNotification = {
  readonly method: string;
  readonly params?:
    | UpdateSessionNotification
    | CompleteElicitationNotification
    | MessageMcpNotification
    | ExtNotification
    | null;
};
export const AgentNotification = Schema.Struct({
  method: Schema.String.annotate({ description: "The notification method name." }),
  params: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.suspend(
          (): Schema.Codec<UpdateSessionNotification> => UpdateSessionNotification,
        ).annotate({
          title: "UpdateSessionNotification",
          description:
            "Handles session update notifications from the agent.\n\nThis is a notification endpoint (no response expected) that receives\nupdates about session activity, including message updates, message chunks,\ntool calls, and execution plans.\n\nNote: Clients SHOULD continue accepting tool call updates even after\nsending a `session/cancel` notification, as the agent may send final\nupdates before reporting an idle `state_update` with the cancelled\nstop reason.\n\nSee protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/v2/draft/prompt-lifecycle#3-agent-reports-output)",
        }),
        Schema.suspend(
          (): Schema.Codec<CompleteElicitationNotification> => CompleteElicitationNotification,
        ).annotate({
          title: "CompleteElicitationNotification",
          description:
            "Notification that a URL-based elicitation has completed.\n\nSee protocol docs: [Elicitation](https://agentclientprotocol.com/protocol/v2/draft/elicitation#url-completion)",
        }),
        Schema.suspend((): Schema.Codec<MessageMcpNotification> => MessageMcpNotification).annotate(
          {
            title: "MessageMcpNotification",
            description:
              "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nReceives an MCP-over-ACP notification.",
          },
        ),
        Schema.suspend((): Schema.Codec<ExtNotification> => ExtNotification).annotate({
          title: "ExtNotification",
          description:
            "Handles extension notifications from the agent.\n\nAllows the Agent to send an arbitrary notification that is not part of the ACP spec.\nExtension notifications provide a way to send one-way messages for custom functionality\nwhile maintaining protocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
      ]).annotate({
        description:
          "All possible notifications that an agent can send to a client.\n\nThis enum is used internally for routing RPC notifications. You typically won't need\nto use this directly.\n\nNotifications do not expect a response.",
      }),
      Schema.Null,
    ]).annotate({ description: "Method-specific notification parameters." }),
  ),
}).annotate({ description: "A JSON-RPC notification object." });

export type AgentRequest = {
  readonly id: RequestId;
  readonly method: string;
  readonly params?:
    | RequestPermissionRequest
    | CreateElicitationRequest
    | ConnectMcpRequest
    | MessageMcpRequest
    | DisconnectMcpRequest
    | ExtRequest
    | null;
};
export const AgentRequest = Schema.Struct({
  id: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
    description: "The request id used to correlate the matching response.",
  }),
  method: Schema.String.annotate({ description: "The method name to invoke." }),
  params: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
        Schema.suspend(
          (): Schema.Codec<RequestPermissionRequest> => RequestPermissionRequest,
        ).annotate({
          title: "RequestPermissionRequest",
          description:
            "Requests permission from the user for an operation.\n\nCalled by the agent when it needs user authorization before executing\na potentially sensitive operation. The client should present the options\nto the user and return their decision.\n\nIf the client cancels active session work via `session/cancel`, it MUST\nrespond to this request with `RequestPermissionOutcome::Cancelled`.\n\nSee protocol docs: [Requesting Permission](https://agentclientprotocol.com/protocol/v2/draft/tool-calls#requesting-permission)",
        }),
        Schema.suspend(
          (): Schema.Codec<CreateElicitationRequest> => CreateElicitationRequest,
        ).annotate({
          title: "CreateElicitationRequest",
          description:
            "Requests structured user input via a form or URL.\n\nSee protocol docs: [Elicitation](https://agentclientprotocol.com/protocol/v2/draft/elicitation)",
        }),
        Schema.suspend((): Schema.Codec<ConnectMcpRequest> => ConnectMcpRequest).annotate({
          title: "ConnectMcpRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nOpens an MCP-over-ACP connection.",
        }),
        Schema.suspend((): Schema.Codec<MessageMcpRequest> => MessageMcpRequest).annotate({
          title: "MessageMcpRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nExchanges an MCP-over-ACP message.",
        }),
        Schema.suspend((): Schema.Codec<DisconnectMcpRequest> => DisconnectMcpRequest).annotate({
          title: "DisconnectMcpRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nCloses an MCP-over-ACP connection.",
        }),
        Schema.suspend((): Schema.Codec<ExtRequest> => ExtRequest).annotate({
          title: "ExtMethodRequest",
          description:
            "Handles extension method requests from the agent.\n\nAllows the Agent to send an arbitrary request that is not part of the ACP spec.\nExtension methods provide a way to add custom functionality while maintaining\nprotocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
      ]).annotate({
        description:
          "All possible requests that an agent can send to a client.\n\nThis enum is used internally for routing RPC requests. You typically won't need\nto use this directly.\n\nThis enum encompasses all method calls from agent to client.",
      }),
      Schema.Null,
    ]).annotate({ description: "Method-specific request parameters." }),
  ),
}).annotate({ description: "A JSON-RPC request object." });

export type AgentResponse =
  | {
      readonly id: RequestId;
      readonly result:
        | InitializeResponse
        | LoginAuthResponse
        | ListProvidersResponse
        | SetProviderResponse
        | DisableProviderResponse
        | LogoutAuthResponse
        | NewSessionResponse
        | ListSessionsResponse
        | DeleteSessionResponse
        | ForkSessionResponse
        | ResumeSessionResponse
        | CloseSessionResponse
        | SetSessionConfigOptionResponse
        | PromptResponse
        | StartNesResponse
        | SuggestNesResponse
        | CloseNesResponse
        | ExtResponse
        | MessageMcpResponse;
    }
  | { readonly id: RequestId; readonly error: Error };
export const AgentResponse = Schema.Union([
  Schema.Struct({
    id: Schema.suspend((): Schema.Codec<RequestId> => RequestId).annotate({
      description: "The id of the request this response answers.",
    }),
    result: Schema.Union([
      Schema.suspend((): Schema.Codec<InitializeResponse> => InitializeResponse).annotate({
        title: "InitializeResponse",
        description: "Successful result returned for a `initialize` request.",
      }),
      Schema.suspend((): Schema.Codec<LoginAuthResponse> => LoginAuthResponse).annotate({
        title: "LoginAuthResponse",
        description: "Successful result returned for an `auth/login` request.",
      }),
      Schema.suspend((): Schema.Codec<ListProvidersResponse> => ListProvidersResponse).annotate({
        title: "ListProvidersResponse",
        description: "Successful result returned for a `providers/list` request.",
      }),
      Schema.suspend((): Schema.Codec<SetProviderResponse> => SetProviderResponse).annotate({
        title: "SetProviderResponse",
        description: "Successful result returned for a `providers/set` request.",
      }),
      Schema.suspend((): Schema.Codec<DisableProviderResponse> => DisableProviderResponse).annotate(
        {
          title: "DisableProviderResponse",
          description: "Successful result returned for a `providers/disable` request.",
        },
      ),
      Schema.suspend((): Schema.Codec<LogoutAuthResponse> => LogoutAuthResponse).annotate({
        title: "LogoutAuthResponse",
        description: "Successful result returned for an `auth/logout` request.",
      }),
      Schema.suspend((): Schema.Codec<NewSessionResponse> => NewSessionResponse).annotate({
        title: "NewSessionResponse",
        description: "Successful result returned for a `session/new` request.",
      }),
      Schema.suspend((): Schema.Codec<ListSessionsResponse> => ListSessionsResponse).annotate({
        title: "ListSessionsResponse",
        description: "Successful result returned for a `session/list` request.",
      }),
      Schema.suspend((): Schema.Codec<DeleteSessionResponse> => DeleteSessionResponse).annotate({
        title: "DeleteSessionResponse",
        description: "Successful result returned for a `session/delete` request.",
      }),
      Schema.suspend((): Schema.Codec<ForkSessionResponse> => ForkSessionResponse).annotate({
        title: "ForkSessionResponse",
        description: "Successful result returned for a `session/fork` request.",
      }),
      Schema.suspend((): Schema.Codec<ResumeSessionResponse> => ResumeSessionResponse).annotate({
        title: "ResumeSessionResponse",
        description: "Successful result returned for a `session/resume` request.",
      }),
      Schema.suspend((): Schema.Codec<CloseSessionResponse> => CloseSessionResponse).annotate({
        title: "CloseSessionResponse",
        description: "Successful result returned for a `session/close` request.",
      }),
      Schema.suspend(
        (): Schema.Codec<SetSessionConfigOptionResponse> => SetSessionConfigOptionResponse,
      ).annotate({
        title: "SetSessionConfigOptionResponse",
        description: "Successful result returned for a `session/set_config_option` request.",
      }),
      Schema.suspend((): Schema.Codec<PromptResponse> => PromptResponse).annotate({
        title: "PromptResponse",
        description: "Successful result returned for a `session/prompt` request.",
      }),
      Schema.suspend((): Schema.Codec<StartNesResponse> => StartNesResponse).annotate({
        title: "StartNesResponse",
        description: "Successful result returned for a `nes/start` request.",
      }),
      Schema.suspend((): Schema.Codec<SuggestNesResponse> => SuggestNesResponse).annotate({
        title: "SuggestNesResponse",
        description: "Successful result returned for a `nes/suggest` request.",
      }),
      Schema.suspend((): Schema.Codec<CloseNesResponse> => CloseNesResponse).annotate({
        title: "CloseNesResponse",
        description: "Successful result returned for a `nes/close` request.",
      }),
      Schema.suspend((): Schema.Codec<ExtResponse> => ExtResponse).annotate({
        title: "ExtMethodResponse",
        description:
          "Successful result returned by an extension method outside the core ACP method set.",
      }),
      Schema.suspend((): Schema.Codec<MessageMcpResponse> => MessageMcpResponse).annotate({
        title: "MessageMcpResponse",
        description: "Successful result returned by an MCP-over-ACP `mcp/message` request.",
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

export type AgentThought = {
  readonly messageId: MessageId;
  readonly content?: ReadonlyArray<ContentBlock> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AgentThought = Schema.Struct({
  messageId: Schema.suspend((): Schema.Codec<MessageId> => MessageId).annotate({
    description: "A unique identifier for the thought message.",
  }),
  content: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ContentBlock).annotate({
        description: "Complete replacement content for this thought message.",
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
    "An agent thought or reasoning message upsert.\n\nOnly [`AgentThought::message_id`] is required. `content` has patch semantics:\nan omitted field leaves existing thought content unchanged, `null` clears the\nvalue, and a concrete array replaces the previous value. For a new\n`messageId`, omitted fields use client defaults. `content` is replaced as a\nwhole array; send `[]` or `null` to clear it.\n\nMessage updates and chunks are applied in the order they are received. When\nan `agent_thought` update includes `content`, that array replaces any\ncontent previously accumulated for the thought, including content from\nearlier chunks. Later chunks with the same `messageId` append to the current\ncontent.",
});

export type AudioContent = {
  readonly data: string;
  readonly mimeType: MediaType;
  readonly annotations?: Annotations | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AudioContent = Schema.Struct({
  data: Schema.String.annotate({
    description: "Base64-encoded media payload.",
    contentEncoding: "base64",
  }),
  mimeType: Schema.suspend((): Schema.Codec<MediaType> => MediaType).annotate({
    description: "MIME type describing the encoded media payload.",
  }),
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
}).annotate({ description: "Audio provided to or from an LLM." });

export type AuthMethodAgent = {
  readonly methodId: AuthMethodId;
  readonly name: string;
  readonly description?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AuthMethodAgent = Schema.Struct({
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
});

export type AuthMethodTerminal = {
  readonly methodId: AuthMethodId;
  readonly name: string;
  readonly description?: string | null;
  readonly args?: ReadonlyArray<string>;
  readonly env?: ReadonlyArray<EnvVariable>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AuthMethodTerminal = Schema.Struct({
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
});

export type AvailableCommandsUpdate = {
  readonly availableCommands: ReadonlyArray<AvailableCommand>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AvailableCommandsUpdate = Schema.Struct({
  availableCommands: Schema.Array(AvailableCommand).annotate({
    description: "Commands the agent can execute.",
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
}).annotate({ description: "Available commands are ready or have changed" });

export type BooleanPropertySchema = {
  readonly title?: string | null;
  readonly description?: string | null;
  readonly default?: boolean | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const BooleanPropertySchema = Schema.Struct({
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
  default: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description:
          "Default value.\n\nOptional. Omitted and `null` are equivalent and mean no default value is provided.",
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
}).annotate({ description: "Schema for boolean properties in an elicitation form." });
