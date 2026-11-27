/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  AuthMethodId,
  AuthenticateResponse,
  CloseNesResponse,
  CloseSessionResponse,
  CompactionId,
  CompactionStatus,
  Cost,
  DeleteSessionResponse,
  DisableProviderResponse,
  DisconnectMcpResponse,
  ElicitationContentValue,
  ElicitationId,
  ExtNotification,
  ExtRequest,
  ExtResponse,
  Implementation,
  KillTerminalResponse,
  ListProvidersRequest,
  ListSessionsRequest,
  LogoutRequest,
  LogoutResponse,
  MessageId,
  MessageMcpResponse,
  PlanId,
  ProtocolVersion,
  ReadTextFileRequest,
  ReadTextFileResponse,
  ReleaseTerminalResponse,
  RequestId,
  SessionId,
  SessionModeId,
  SetProviderResponse,
  SetSessionModeResponse,
  StartNesResponse,
  StopReason,
  TerminalId,
  ToolCallId,
  ToolCallLocation,
  ToolCallStatus,
  ToolKind,
  WaitForTerminalExitResponse,
  WriteTextFileRequest,
  WriteTextFileResponse,
} from "./schema-v1.gen.part0.ts";
import {
  AcceptNesNotification,
  Annotations,
  AuthenticateRequest,
  AvailableCommand,
  CancelNotification,
  CloseNesRequest,
  CloseSessionRequest,
  CompleteElicitationNotification,
  ConnectMcpRequest,
  ConnectMcpResponse,
  ContentBlock,
  CreateElicitationResponse,
  CreateTerminalRequest,
  CreateTerminalResponse,
  DeleteSessionRequest,
  DidCloseDocumentNotification,
  DidOpenDocumentNotification,
  DidSaveDocumentNotification,
  DisableProviderRequest,
  DisconnectMcpRequest,
  EmbeddedResourceResource,
  Error,
  KillTerminalRequest,
  ListSessionsResponse,
  MessageMcpNotification,
  MessageMcpRequest,
  PlanEntry,
  PlanUpdateContent,
  PromptResponse,
  RejectNesNotification,
  ReleaseTerminalRequest,
  RequestPermissionOutcome,
  RequestPermissionResponse,
  SessionModeState,
  SetProviderRequest,
  SetSessionConfigOptionRequest,
  SetSessionModeRequest,
  StartNesRequest,
  TerminalOutputRequest,
  TerminalOutputResponse,
  WaitForTerminalExitRequest,
} from "./schema-v1.gen.part1.ts";
import {
  AgentCapabilities,
  AuthMethod,
  ClientSessionCapabilities,
  CreateElicitationRequest,
  DidChangeDocumentNotification,
  DidFocusDocumentNotification,
  ElicitationSchema,
  ForkSessionRequest,
  InitializeRequest,
  ListProvidersResponse,
  LoadSessionRequest,
  NewSessionRequest,
  PromptRequest,
  RequestPermissionRequest,
  ResumeSessionRequest,
  SessionConfigOption,
  SuggestNesRequest,
  SuggestNesResponse,
  ToolCallContent,
} from "./schema-v1.gen.part2.ts";

export type SessionUpdate =
  | {
      readonly sessionUpdate: "user_message_chunk";
      readonly content: ContentBlock;
      readonly messageId?: MessageId | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "agent_message_chunk";
      readonly content: ContentBlock;
      readonly messageId?: MessageId | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "agent_thought_chunk";
      readonly content: ContentBlock;
      readonly messageId?: MessageId | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "tool_call";
      readonly toolCallId: ToolCallId;
      readonly title: string;
      readonly name?: string | null;
      readonly kind?: ToolKind;
      readonly status?: ToolCallStatus;
      readonly content?: ReadonlyArray<ToolCallContent>;
      readonly locations?: ReadonlyArray<ToolCallLocation>;
      readonly rawInput?: Schema.Json;
      readonly rawOutput?: Schema.Json;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "tool_call_update";
      readonly toolCallId: ToolCallId;
      readonly kind?: ToolKind | null;
      readonly status?: ToolCallStatus | null;
      readonly title?: string | null;
      readonly name?: string | null;
      readonly content?: ReadonlyArray<ToolCallContent> | null;
      readonly locations?: ReadonlyArray<ToolCallLocation> | null;
      readonly rawInput?: Schema.Json;
      readonly rawOutput?: Schema.Json;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly sessionUpdate: "plan";
      readonly entries: ReadonlyArray<PlanEntry>;
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
      readonly sessionUpdate: "current_mode_update";
      readonly currentModeId: SessionModeId;
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
    };
export const SessionUpdate = Schema.Union([
  Schema.Struct({
    sessionUpdate: Schema.Literal("user_message_chunk"),
    content: Schema.suspend((): Schema.Codec<ContentBlock> => ContentBlock).annotate({
      description: "A single item of content",
    }),
    messageId: Schema.optionalKey(
      Schema.Union([MessageId, Schema.Null]).annotate({
        description:
          "A unique identifier for the message this chunk belongs to.\n\nAll chunks belonging to the same message share the same `messageId`.\nA change in `messageId` indicates a new message has started.",
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
  }).annotate({ description: "A streamed item of content" }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("agent_message_chunk"),
    content: Schema.suspend((): Schema.Codec<ContentBlock> => ContentBlock).annotate({
      description: "A single item of content",
    }),
    messageId: Schema.optionalKey(
      Schema.Union([MessageId, Schema.Null]).annotate({
        description:
          "A unique identifier for the message this chunk belongs to.\n\nAll chunks belonging to the same message share the same `messageId`.\nA change in `messageId` indicates a new message has started.",
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
  }).annotate({ description: "A streamed item of content" }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("agent_thought_chunk"),
    content: Schema.suspend((): Schema.Codec<ContentBlock> => ContentBlock).annotate({
      description: "A single item of content",
    }),
    messageId: Schema.optionalKey(
      Schema.Union([MessageId, Schema.Null]).annotate({
        description:
          "A unique identifier for the message this chunk belongs to.\n\nAll chunks belonging to the same message share the same `messageId`.\nA change in `messageId` indicates a new message has started.",
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
  }).annotate({ description: "A streamed item of content" }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("tool_call"),
    toolCallId: Schema.suspend((): Schema.Codec<ToolCallId> => ToolCallId).annotate({
      description: "Unique identifier for this tool call within the session.",
    }),
    title: Schema.String.annotate({
      description: "Human-readable title describing what the tool is doing.",
    }),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nProgrammatic name of the tool being invoked.\n\nThis field is optional. Omitting it or sending `null` both mean that no\ntool name is available.",
        }),
        Schema.Null,
      ]),
    ),
    kind: Schema.optionalKey(
      Schema.suspend((): Schema.Codec<ToolKind> => ToolKind).annotate({
        description:
          "The category of tool being invoked.\nHelps clients choose appropriate icons and UI treatment.",
      }),
    ),
    status: Schema.optionalKey(
      Schema.suspend((): Schema.Codec<ToolCallStatus> => ToolCallStatus).annotate({
        description: "Current execution status of the tool call.",
      }),
    ),
    content: Schema.optionalKey(
      Schema.Array(ToolCallContent).annotate({ description: "Content produced by the tool call." }),
    ),
    locations: Schema.optionalKey(
      Schema.Array(ToolCallLocation).annotate({
        description:
          'File locations affected by this tool call.\nEnables "follow-along" features in clients.',
      }),
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "Represents a tool call that the language model has requested.\n\nTool calls are actions that the agent executes on behalf of the language model,\nsuch as reading files, executing code, or fetching data from external sources.\n\nSee protocol docs: [Tool Calls](https://agentclientprotocol.com/protocol/tool-calls)",
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("tool_call_update"),
    toolCallId: Schema.suspend((): Schema.Codec<ToolCallId> => ToolCallId).annotate({
      description: "The ID of the tool call being updated.",
    }),
    kind: Schema.optionalKey(
      Schema.Union([ToolKind, Schema.Null]).annotate({ description: "Update the tool kind." }),
    ),
    status: Schema.optionalKey(
      Schema.Union([ToolCallStatus, Schema.Null]).annotate({
        description: "Update the execution status.",
      }),
    ),
    title: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "Update the human-readable title." }),
        Schema.Null,
      ]),
    ),
    name: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nUpdate the programmatic name of the tool being invoked.\n\nThis field is optional. Omitting it or sending `null` both mean that\nthe existing name is left unchanged.",
        }),
        Schema.Null,
      ]),
    ),
    content: Schema.optionalKey(
      Schema.Union([
        Schema.Array(ToolCallContent).annotate({ description: "Replace the content collection." }),
        Schema.Null,
      ]),
    ),
    locations: Schema.optionalKey(
      Schema.Union([
        Schema.Array(ToolCallLocation).annotate({
          description: "Replace the locations collection.",
        }),
        Schema.Null,
      ]),
    ),
    rawInput: Schema.optionalKey(
      Schema.Json.annotate({ expected: "JSON value", description: "Update the raw input." }),
    ),
    rawOutput: Schema.optionalKey(
      Schema.Json.annotate({ expected: "JSON value", description: "Update the raw output." }),
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
      "An update to an existing tool call.\n\nUsed to report progress and results as tools execute. All fields except\nthe tool call ID are optional - only changed fields need to be included.\n\nSee protocol docs: [Updating](https://agentclientprotocol.com/protocol/tool-calls#updating)",
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("plan"),
    entries: Schema.Array(PlanEntry).annotate({
      description:
        "The list of tasks to be accomplished.\n\nWhen updating a plan, the agent must send a complete list of all entries\nwith their current status. The client replaces the entire plan with each update.",
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
      "An execution plan for accomplishing complex tasks.\n\nPlans consist of multiple entries representing individual tasks or goals.\nAgents report plans to clients to provide visibility into their execution strategy.\nPlans can evolve during execution as the agent discovers new requirements or completes tasks.\n\nSee protocol docs: [Agent Plan](https://agentclientprotocol.com/protocol/agent-plan)",
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("plan_update"),
    plan: Schema.suspend((): Schema.Codec<PlanUpdateContent> => PlanUpdateContent).annotate({
      description: "The updated plan content.",
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
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA content update for a plan identified by ID.",
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("plan_removed"),
    planId: Schema.suspend((): Schema.Codec<PlanId> => PlanId).annotate({
      description: "The plan ID to remove.",
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
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRemoval notice for a plan identified by ID.",
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("available_commands_update"),
    availableCommands: Schema.Array(AvailableCommand).annotate({
      description: "Commands the agent can execute",
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
  }).annotate({ description: "Available commands are ready or have changed" }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("current_mode_update"),
    currentModeId: Schema.suspend((): Schema.Codec<SessionModeId> => SessionModeId).annotate({
      description: "The ID of the current mode",
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
      "The current mode of the session has changed\n\nSee protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)",
  }),
  Schema.Struct({
    sessionUpdate: Schema.Literal("config_option_update"),
    configOptions: Schema.Array(SessionConfigOption).annotate({
      description: "The full set of configuration options and their current values.",
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
          description: "ISO 8601 timestamp of last activity. Set to null to clear.",
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
      "Update to session metadata. All fields are optional to support partial updates.\n\nAgents send this notification to update session information like title or custom metadata.\nThis allows clients to display dynamic session names and track session state changes.",
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
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
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA context compaction upsert. The first update fixes the compaction's\ntimeline position. Later updates with the same ID patch that entity in place.\nAgents MUST only send this update when the Client advertised\n[`ClientSessionCapabilities::compaction`].\n\n`summary`, `error`, and `_meta` have patch semantics: omission leaves the\nstored value unchanged, `null` clears it, and a concrete value replaces it.\n`summary: []` also clears the retained summary. A non-empty summary is only\nvalid with `completed`; `error` is only valid with `failed`.",
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
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA content block appended to the retained summary of an in-progress\ncompaction. Agents send chunks only after an `in_progress` update and before\nthe terminal update for the same ID. Agents MUST only send this update when\nthe Client advertised [`ClientSessionCapabilities::compaction`].",
  }),
]).annotate({
  description:
    "Different types of updates that can be sent during session processing.\n\nThese updates provide real-time feedback about the agent's progress.\n\nSee protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/prompt-turn#3-agent-reports-output)",
  identifier: "SessionUpdate",
});

export type NewSessionResponse = {
  readonly sessionId: SessionId;
  readonly modes?: SessionModeState | null;
  readonly configOptions?: ReadonlyArray<SessionConfigOption> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NewSessionResponse = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description:
      "Unique identifier for the created session.\n\nUsed in all subsequent requests for this conversation.",
  }),
  modes: Schema.optionalKey(
    Schema.Union([SessionModeState, Schema.Null]).annotate({
      description:
        "Initial mode state if supported by the Agent\n\nSee protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)",
    }),
  ),
  configOptions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(SessionConfigOption).annotate({
        description: "Initial session configuration options if supported by the Agent.",
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
    "Response from creating a new session.\n\nSee protocol docs: [Creating a Session](https://agentclientprotocol.com/protocol/session-setup#creating-a-session)",
  identifier: "NewSessionResponse",
});

export type LoadSessionResponse = {
  readonly modes?: SessionModeState | null;
  readonly configOptions?: ReadonlyArray<SessionConfigOption> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const LoadSessionResponse = Schema.Struct({
  modes: Schema.optionalKey(
    Schema.Union([SessionModeState, Schema.Null]).annotate({
      description:
        "Initial mode state if supported by the Agent\n\nSee protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)",
    }),
  ),
  configOptions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(SessionConfigOption).annotate({
        description: "Initial session configuration options if supported by the Agent.",
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
  description: "Response from loading an existing session.",
  identifier: "LoadSessionResponse",
});

export type ForkSessionResponse = {
  readonly sessionId: SessionId;
  readonly modes?: SessionModeState | null;
  readonly configOptions?: ReadonlyArray<SessionConfigOption> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ForkSessionResponse = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "Unique identifier for the newly created forked session.",
  }),
  modes: Schema.optionalKey(
    Schema.Union([SessionModeState, Schema.Null]).annotate({
      description:
        "Initial mode state if supported by the Agent\n\nSee protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)",
    }),
  ),
  configOptions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(SessionConfigOption).annotate({
        description: "Initial session configuration options if supported by the Agent.",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse from forking an existing session.",
  identifier: "ForkSessionResponse",
});

export type ResumeSessionResponse = {
  readonly modes?: SessionModeState | null;
  readonly configOptions?: ReadonlyArray<SessionConfigOption> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ResumeSessionResponse = Schema.Struct({
  modes: Schema.optionalKey(
    Schema.Union([SessionModeState, Schema.Null]).annotate({
      description:
        "Initial mode state if supported by the Agent\n\nSee protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)",
    }),
  ),
  configOptions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(SessionConfigOption).annotate({
        description: "Initial session configuration options if supported by the Agent.",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
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
  readonly agentCapabilities?: AgentCapabilities;
  readonly authMethods?: ReadonlyArray<AuthMethod>;
  readonly agentInfo?: Implementation | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const InitializeResponse = Schema.Struct({
  protocolVersion: Schema.suspend((): Schema.Codec<ProtocolVersion> => ProtocolVersion).annotate({
    description:
      "The protocol version the client specified if supported by the agent,\nor the latest protocol version supported by the agent.\n\nThe client should disconnect, if it doesn't support this version.",
  }),
  agentCapabilities: Schema.optionalKey(
    Schema.suspend((): Schema.Codec<AgentCapabilities> => AgentCapabilities).annotate({
      description: "Capabilities supported by the agent.",
      default: {
        loadSession: false,
        promptCapabilities: { image: false, audio: false, embeddedContext: false },
        mcpCapabilities: { http: false, sse: false, acp: false },
        sessionCapabilities: {},
        auth: {},
      },
    }),
  ),
  authMethods: Schema.optionalKey(
    Schema.Array(AuthMethod).annotate({
      description: "Authentication methods supported by the agent.",
      default: [],
    }),
  ),
  agentInfo: Schema.optionalKey(
    Schema.Union([Implementation, Schema.Null]).annotate({
      description:
        "Information about the Agent name and version sent to the Client.\n\nNote: in future versions of the protocol, this will be required.",
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
    "Response to the `initialize` method.\n\nContains the negotiated protocol version and agent capabilities.\n\nSee protocol docs: [Initialization](https://agentclientprotocol.com/protocol/initialization)",
  identifier: "InitializeResponse",
});

export type SessionNotification = {
  readonly sessionId: SessionId;
  readonly update: SessionUpdate;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionNotification = Schema.Struct({
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Notification containing a session update from the agent.\n\nUsed to stream real-time progress and results during prompt processing.\n\nSee protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/prompt-turn#3-agent-reports-output)",
  identifier: "SessionNotification",
});

export type AgentNotification = {
  readonly method: string;
  readonly params?:
    | SessionNotification
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
        Schema.suspend((): Schema.Codec<SessionNotification> => SessionNotification).annotate({
          title: "SessionNotification",
          description:
            "Handles session update notifications from the agent.\n\nThis is a notification endpoint (no response expected) that receives\nreal-time updates about session progress, including message chunks,\ntool calls, and execution plans.\n\nNote: Clients SHOULD continue accepting tool call updates even after\nsending a `session/cancel` notification, as the agent may send final\nupdates before responding with the cancelled stop reason.\n\nSee protocol docs: [Agent Reports Output](https://agentclientprotocol.com/protocol/prompt-turn#3-agent-reports-output)",
        }),
        Schema.suspend(
          (): Schema.Codec<CompleteElicitationNotification> => CompleteElicitationNotification,
        ).annotate({
          title: "CompleteElicitationNotification",
          description:
            "Notification that a URL-based elicitation has completed.\n\nSee protocol docs: [Elicitation](https://agentclientprotocol.com/protocol/elicitation#url-completion)",
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
            "Handles extension notifications from the agent.\n\nAllows the Agent to send an arbitrary notification that is not part of the ACP spec.\nExtension notifications provide a way to send one-way messages for custom functionality\nwhile maintaining protocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
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
    | WriteTextFileRequest
    | ReadTextFileRequest
    | RequestPermissionRequest
    | CreateTerminalRequest
    | TerminalOutputRequest
    | ReleaseTerminalRequest
    | WaitForTerminalExitRequest
    | KillTerminalRequest
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
        Schema.suspend((): Schema.Codec<WriteTextFileRequest> => WriteTextFileRequest).annotate({
          title: "WriteTextFileRequest",
          description:
            "Writes content to a text file in the client's file system.\n\nOnly available if the client advertises the `fs.writeTextFile` capability.\nAllows the agent to create or modify files within the client's environment.\n\nSee protocol docs: [Client](https://agentclientprotocol.com/protocol/overview#client)",
        }),
        Schema.suspend((): Schema.Codec<ReadTextFileRequest> => ReadTextFileRequest).annotate({
          title: "ReadTextFileRequest",
          description:
            "Reads content from a text file in the client's file system.\n\nOnly available if the client advertises the `fs.readTextFile` capability.\nAllows the agent to access file contents within the client's environment.\n\nSee protocol docs: [Client](https://agentclientprotocol.com/protocol/overview#client)",
        }),
        Schema.suspend(
          (): Schema.Codec<RequestPermissionRequest> => RequestPermissionRequest,
        ).annotate({
          title: "RequestPermissionRequest",
          description:
            "Requests permission from the user for a tool call operation.\n\nCalled by the agent when it needs user authorization before executing\na potentially sensitive operation. The client should present the options\nto the user and return their decision.\n\nIf the client cancels the prompt turn via `session/cancel`, it MUST\nrespond to this request with `RequestPermissionOutcome::Cancelled`.\n\nSee protocol docs: [Requesting Permission](https://agentclientprotocol.com/protocol/tool-calls#requesting-permission)",
        }),
        Schema.suspend((): Schema.Codec<CreateTerminalRequest> => CreateTerminalRequest).annotate({
          title: "CreateTerminalRequest",
          description:
            "Executes a command in a new terminal\n\nOnly available if the `terminal` Client capability is set to `true`.\n\nReturns a `TerminalId` that can be used with other terminal methods\nto get the current output, wait for exit, and kill the command.\n\nThe `TerminalId` can also be used to embed the terminal in a tool call\nby using the `ToolCallContent::Terminal` variant.\n\nThe Agent is responsible for releasing the terminal by using the `terminal/release`\nmethod.\n\nSee protocol docs: [Terminals](https://agentclientprotocol.com/protocol/terminals)",
        }),
        Schema.suspend((): Schema.Codec<TerminalOutputRequest> => TerminalOutputRequest).annotate({
          title: "TerminalOutputRequest",
          description:
            "Gets the terminal output and exit status\n\nReturns the current content in the terminal without waiting for the command to exit.\nIf the command has already exited, the exit status is included.\n\nSee protocol docs: [Terminals](https://agentclientprotocol.com/protocol/terminals)",
        }),
        Schema.suspend((): Schema.Codec<ReleaseTerminalRequest> => ReleaseTerminalRequest).annotate(
          {
            title: "ReleaseTerminalRequest",
            description:
              "Releases a terminal\n\nThe command is killed if it hasn't exited yet. Use `terminal/wait_for_exit`\nto wait for the command to exit before releasing the terminal.\n\nAfter release, the `TerminalId` can no longer be used with other `terminal/*` methods,\nbut tool calls that already contain it, continue to display its output.\n\nThe `terminal/kill` method can be used to terminate the command without releasing\nthe terminal, allowing the Agent to call `terminal/output` and other methods.\n\nSee protocol docs: [Terminals](https://agentclientprotocol.com/protocol/terminals)",
          },
        ),
        Schema.suspend(
          (): Schema.Codec<WaitForTerminalExitRequest> => WaitForTerminalExitRequest,
        ).annotate({
          title: "WaitForTerminalExitRequest",
          description:
            "Waits for the terminal command to exit and return its exit status\n\nSee protocol docs: [Terminals](https://agentclientprotocol.com/protocol/terminals)",
        }),
        Schema.suspend((): Schema.Codec<KillTerminalRequest> => KillTerminalRequest).annotate({
          title: "KillTerminalRequest",
          description:
            "Kills the terminal command without releasing the terminal\n\nWhile `terminal/release` will also kill the command, this method will keep\nthe `TerminalId` valid so it can be used with other methods.\n\nThis method can be helpful when implementing command timeouts which terminate\nthe command as soon as elapsed, and then get the final output so it can be sent\nto the model.\n\nNote: Call `terminal/release` when `TerminalId` is no longer needed.\n\nSee protocol docs: [Terminals](https://agentclientprotocol.com/protocol/terminals)",
        }),
        Schema.suspend(
          (): Schema.Codec<CreateElicitationRequest> => CreateElicitationRequest,
        ).annotate({
          title: "CreateElicitationRequest",
          description:
            "Requests structured user input via a form or URL.\n\nSee protocol docs: [Elicitation](https://agentclientprotocol.com/protocol/elicitation)",
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
            "Handles extension method requests from the agent.\n\nAllows the Agent to send an arbitrary request that is not part of the ACP spec.\nExtension methods provide a way to add custom functionality while maintaining\nprotocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
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
        | AuthenticateResponse
        | ListProvidersResponse
        | SetProviderResponse
        | DisableProviderResponse
        | LogoutResponse
        | NewSessionResponse
        | LoadSessionResponse
        | ListSessionsResponse
        | DeleteSessionResponse
        | ForkSessionResponse
        | ResumeSessionResponse
        | CloseSessionResponse
        | SetSessionModeResponse
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
      Schema.suspend((): Schema.Codec<AuthenticateResponse> => AuthenticateResponse).annotate({
        title: "AuthenticateResponse",
        description: "Successful result returned for a `authenticate` request.",
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
      Schema.suspend((): Schema.Codec<LogoutResponse> => LogoutResponse).annotate({
        title: "LogoutResponse",
        description: "Successful result returned for a `logout` request.",
      }),
      Schema.suspend((): Schema.Codec<NewSessionResponse> => NewSessionResponse).annotate({
        title: "NewSessionResponse",
        description: "Successful result returned for a `session/new` request.",
      }),
      Schema.suspend((): Schema.Codec<LoadSessionResponse> => LoadSessionResponse).annotate({
        title: "LoadSessionResponse",
        description: "Successful result returned for a `session/load` request.",
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
      Schema.suspend((): Schema.Codec<SetSessionModeResponse> => SetSessionModeResponse).annotate({
        title: "SetSessionModeResponse",
        description: "Successful result returned for a `session/set_mode` request.",
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

export type AudioContent = {
  readonly annotations?: Annotations | null;
  readonly data: string;
  readonly mimeType: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AudioContent = Schema.Struct({
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
}).annotate({ description: "Audio provided to or from an LLM." });

export type AuthMethodTerminal = {
  readonly id: AuthMethodId;
  readonly name: string;
  readonly description?: string | null;
  readonly args?: ReadonlyArray<string>;
  readonly env?: { readonly [x: string]: string };
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AuthMethodTerminal = Schema.Struct({
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
  args: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "Additional arguments to append to the configured agent invocation for terminal auth.",
    }),
  ),
  env: Schema.optionalKey(
    Schema.Record(Schema.String, Schema.String).annotate({
      description:
        "Additional environment variables to set on the configured agent invocation for terminal auth.\nThese values override same-named variables in the base launch configuration.",
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
    "Terminal-based authentication method.\n\nThe client runs the configured agent program as a separate interactive\nprocess for the user to authenticate via a TUI. Agents MUST advertise this\nmethod only when the client enabled its terminal authentication capability.\nA zero exit status signals success; any other termination signals failure.\nThe client MUST NOT pass this method to `authenticate`.",
});

export type AvailableCommandsUpdate = {
  readonly availableCommands: ReadonlyArray<AvailableCommand>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const AvailableCommandsUpdate = Schema.Struct({
  availableCommands: Schema.Array(AvailableCommand).annotate({
    description: "Commands the agent can execute",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nOptional. Omitted and `null` are equivalent and mean no metadata.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Schema for boolean properties in an elicitation form." });

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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description:
    "Notification to cancel an ongoing request.\n\nSee protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/cancellation)",
});

export type ClientNotification = {
  readonly method: string;
  readonly params?:
    | CancelNotification
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
        Schema.suspend((): Schema.Codec<CancelNotification> => CancelNotification).annotate({
          title: "CancelNotification",
          description:
            "Cancels ongoing operations for a session.\n\nThis is a notification sent by the client to cancel an ongoing prompt turn.\n\nUpon receiving this notification, the Agent SHOULD:\n- Stop all language model requests as soon as possible\n- Abort all tool call invocations in progress\n- Send any pending `session/update` notifications\n- Respond to the original `session/prompt` request with `StopReason::Cancelled`\n\nSee protocol docs: [Cancellation](https://agentclientprotocol.com/protocol/prompt-turn#cancellation)",
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
            "Handles extension notifications from the client.\n\nExtension notifications provide a way to send one-way messages for custom functionality\nwhile maintaining protocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
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
    | AuthenticateRequest
    | ListProvidersRequest
    | SetProviderRequest
    | DisableProviderRequest
    | LogoutRequest
    | NewSessionRequest
    | LoadSessionRequest
    | ListSessionsRequest
    | DeleteSessionRequest
    | ForkSessionRequest
    | ResumeSessionRequest
    | CloseSessionRequest
    | SetSessionModeRequest
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
            "Establishes the connection with a client and negotiates protocol capabilities.\n\nThis method is called once at the beginning of the connection to:\n- Negotiate the protocol version to use\n- Exchange capability information between client and agent\n- Determine available authentication methods\n\nThe agent should respond with its supported protocol version and capabilities.\n\nSee protocol docs: [Initialization](https://agentclientprotocol.com/protocol/initialization)",
        }),
        Schema.suspend((): Schema.Codec<AuthenticateRequest> => AuthenticateRequest).annotate({
          title: "AuthenticateRequest",
          description:
            "Authenticates the client using the specified authentication method.\n\nCalled when the agent requires authentication before allowing session creation.\nThe client provides an authentication method ID that was advertised during\ninitialization and whose type defines the `authenticate` flow.\n\nAfter successful authentication, the client can proceed to create sessions with\n`new_session` without receiving an `auth_required` error.\n\nSee protocol docs: [Initialization](https://agentclientprotocol.com/protocol/initialization)",
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
        Schema.suspend((): Schema.Codec<LogoutRequest> => LogoutRequest).annotate({
          title: "LogoutRequest",
          description:
            "Logs out of the current authenticated state.\n\nAfter a successful logout, all new sessions will require authentication.\nThere is no guarantee about the behavior of already running sessions.",
        }),
        Schema.suspend((): Schema.Codec<NewSessionRequest> => NewSessionRequest).annotate({
          title: "NewSessionRequest",
          description:
            "Creates a new conversation session with the agent.\n\nSessions represent independent conversation contexts with their own history and state.\n\nThe agent should:\n- Create a new session context\n- Connect to any specified MCP servers\n- Return a unique session ID for future requests\n\nMay return an `auth_required` error if the agent requires authentication.\n\nSee protocol docs: [Session Setup](https://agentclientprotocol.com/protocol/session-setup)",
        }),
        Schema.suspend((): Schema.Codec<LoadSessionRequest> => LoadSessionRequest).annotate({
          title: "LoadSessionRequest",
          description:
            "Loads an existing session to resume a previous conversation.\n\nThis method is only available if the agent advertises the `loadSession` capability.\n\nThe agent should:\n- Restore the session context and conversation history\n- Connect to the specified MCP servers\n- Stream the entire conversation history back to the client via notifications\n\nSee protocol docs: [Loading Sessions](https://agentclientprotocol.com/protocol/session-setup#loading-sessions)",
        }),
        Schema.suspend((): Schema.Codec<ListSessionsRequest> => ListSessionsRequest).annotate({
          title: "ListSessionsRequest",
          description:
            "Lists existing sessions known to the agent.\n\nThis method is only available if the agent advertises the `sessionCapabilities.list` capability.\n\nThe agent should return metadata about sessions with optional filtering and pagination support.",
        }),
        Schema.suspend((): Schema.Codec<DeleteSessionRequest> => DeleteSessionRequest).annotate({
          title: "DeleteSessionRequest",
          description:
            "Deletes an existing session from `session/list`.\n\nThis method is only available if the agent advertises the `sessionCapabilities.delete` capability.",
        }),
        Schema.suspend((): Schema.Codec<ForkSessionRequest> => ForkSessionRequest).annotate({
          title: "ForkSessionRequest",
          description:
            "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nForks an existing session to create a new independent session.\n\nThis method is only available if the agent advertises the `session.fork` capability.\n\nThe agent should create a new session with the same conversation context as the\noriginal, allowing operations like generating summaries without affecting the\noriginal session's history.",
        }),
        Schema.suspend((): Schema.Codec<ResumeSessionRequest> => ResumeSessionRequest).annotate({
          title: "ResumeSessionRequest",
          description:
            "Resumes an existing session without returning previous messages.\n\nThis method is only available if the agent advertises the `sessionCapabilities.resume` capability.\n\nThe agent should resume the session context, allowing the conversation to continue\nwithout replaying the message history (unlike `session/load`).",
        }),
        Schema.suspend((): Schema.Codec<CloseSessionRequest> => CloseSessionRequest).annotate({
          title: "CloseSessionRequest",
          description:
            "Closes an active session and frees up any resources associated with it.\n\nThis method is only available if the agent advertises the `sessionCapabilities.close` capability.\n\nThe agent must cancel any ongoing work (as if `session/cancel` was called)\nand then free up any resources associated with the session.",
        }),
        Schema.suspend((): Schema.Codec<SetSessionModeRequest> => SetSessionModeRequest).annotate({
          title: "SetSessionModeRequest",
          description:
            'Sets the current mode for a session.\n\nAllows switching between different agent modes (e.g., "ask", "architect", "code")\nthat affect system prompts, tool availability, and permission behaviors.\n\nThe mode must be one of the modes advertised in `availableModes` during session\ncreation or loading. Agents may also change modes autonomously and notify the\nclient via `current_mode_update` notifications.\n\nThis method can be called at any time during a session, whether the Agent is\nidle or actively generating a response.\n\nSee protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)',
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
            "Processes a user prompt within a session.\n\nThis method handles the whole lifecycle of a prompt:\n- Receives user messages with optional context (files, images, etc.)\n- Processes the prompt using language models\n- Reports language model content and tool calls to the Clients\n- Requests permission to run tools\n- Executes any requested tool calls\n- Returns when the turn is complete with a stop reason\n\nSee protocol docs: [Prompt Turn](https://agentclientprotocol.com/protocol/prompt-turn)",
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
            "Handles extension method requests from the client.\n\nExtension methods provide a way to add custom functionality while maintaining\nprotocol compatibility.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
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
        | WriteTextFileResponse
        | ReadTextFileResponse
        | RequestPermissionResponse
        | CreateTerminalResponse
        | TerminalOutputResponse
        | ReleaseTerminalResponse
        | WaitForTerminalExitResponse
        | KillTerminalResponse
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
      Schema.suspend((): Schema.Codec<WriteTextFileResponse> => WriteTextFileResponse).annotate({
        title: "WriteTextFileResponse",
        description: "Successful result returned for a `fs/write_text_file` request.",
      }),
      Schema.suspend((): Schema.Codec<ReadTextFileResponse> => ReadTextFileResponse).annotate({
        title: "ReadTextFileResponse",
        description: "Successful result returned for a `fs/read_text_file` request.",
      }),
      Schema.suspend(
        (): Schema.Codec<RequestPermissionResponse> => RequestPermissionResponse,
      ).annotate({
        title: "RequestPermissionResponse",
        description: "Successful result returned for a `session/request_permission` request.",
      }),
      Schema.suspend((): Schema.Codec<CreateTerminalResponse> => CreateTerminalResponse).annotate({
        title: "CreateTerminalResponse",
        description: "Successful result returned for a `terminal/create` request.",
      }),
      Schema.suspend((): Schema.Codec<TerminalOutputResponse> => TerminalOutputResponse).annotate({
        title: "TerminalOutputResponse",
        description: "Successful result returned for a `terminal/output` request.",
      }),
      Schema.suspend((): Schema.Codec<ReleaseTerminalResponse> => ReleaseTerminalResponse).annotate(
        {
          title: "ReleaseTerminalResponse",
          description: "Successful result returned for a `terminal/release` request.",
        },
      ),
      Schema.suspend(
        (): Schema.Codec<WaitForTerminalExitResponse> => WaitForTerminalExitResponse,
      ).annotate({
        title: "WaitForTerminalExitResponse",
        description: "Successful result returned for a `terminal/wait_for_exit` request.",
      }),
      Schema.suspend((): Schema.Codec<KillTerminalResponse> => KillTerminalResponse).annotate({
        title: "KillTerminalResponse",
        description: "Successful result returned for a `terminal/kill` request.",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA content block appended to the retained summary of an in-progress\ncompaction. Agents send chunks only after an `in_progress` update and before\nthe terminal update for the same ID. Agents MUST only send this update when\nthe Client advertised [`ClientSessionCapabilities::compaction`].",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA context compaction upsert. The first update fixes the compaction's\ntimeline position. Later updates with the same ID patch that entity in place.\nAgents MUST only send this update when the Client advertised\n[`ClientSessionCapabilities::compaction`].\n\n`summary`, `error`, and `_meta` have patch semantics: omission leaves the\nstored value unchanged, `null` clears it, and a concrete value replaces it.\n`summary: []` also clears the retained summary. A non-empty summary is only\nvalid with `completed`; `error` is only valid with `failed`.",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "Standard content block (text, images, resources)." });

export type ContentChunk = {
  readonly content: ContentBlock;
  readonly messageId?: MessageId | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ContentChunk = Schema.Struct({
  content: Schema.suspend((): Schema.Codec<ContentBlock> => ContentBlock).annotate({
    description: "A single item of content",
  }),
  messageId: Schema.optionalKey(
    Schema.Union([MessageId, Schema.Null]).annotate({
      description:
        "A unique identifier for the message this chunk belongs to.\n\nAll chunks belonging to the same message share the same `messageId`.\nA change in `messageId` indicates a new message has started.",
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
}).annotate({ description: "A streamed item of content" });

export type CurrentModeUpdate = {
  readonly currentModeId: SessionModeId;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const CurrentModeUpdate = Schema.Struct({
  currentModeId: Schema.suspend((): Schema.Codec<SessionModeId> => SessionModeId).annotate({
    description: "The ID of the current mode",
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
    "The current mode of the session has changed\n\nSee protocol docs: [Session Modes](https://agentclientprotocol.com/protocol/session-modes)",
});

export type Diff = {
  readonly path: string;
  readonly oldText?: string | null;
  readonly newText: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const Diff = Schema.Struct({
  path: Schema.String.annotate({ description: "The absolute file path being modified." }),
  oldText: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "The original content (None for new files)." }),
      Schema.Null,
    ]),
  ),
  newText: Schema.String.annotate({ description: "The new content after modification." }),
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
    "A diff representing file modifications.\n\nShows changes to files in a format suitable for display in the client UI.\n\nSee protocol docs: [Content](https://agentclientprotocol.com/protocol/tool-calls#content)",
});

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
  readonly annotations?: Annotations | null;
  readonly resource: EmbeddedResourceResource;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const EmbeddedResource = Schema.Struct({
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
});

export type ImageContent = {
  readonly annotations?: Annotations | null;
  readonly data: string;
  readonly mimeType: string;
  readonly uri?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ImageContent = Schema.Struct({
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
}).annotate({ description: "An image provided to or from an LLM." });
