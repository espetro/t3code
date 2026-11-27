import * as Schema from "effect/Schema";
import {
  AbsolutePath,
  ElicitationSchemaType,
  EnumOption,
  Implementation,
  LlmProtocol,
  MediaType,
  NesDiagnosticSeverity,
  NesEditHistoryEntry,
  NesRecentFile,
  NesSuggestionId,
  PlanId,
  Position,
  PositionEncodingKind,
  ProtocolVersion,
  ProviderId,
  ReplayFrom,
  SessionConfigGroupId,
  SessionConfigId,
  SessionConfigOptionCategory,
  SessionConfigValueId,
  SessionId,
  SessionListCursor,
  StringFormat,
  TerminalId,
} from "./schema.gen.part0.ts";
import {
  Annotations,
  AuthCapabilities,
  ClientNesCapabilities,
  DiffChange,
  DiffPatch,
  ElicitationCapabilities,
  EmbeddedResourceResource,
  Icon,
  McpServer,
  MultiSelectItems,
  NesContextCapabilities,
  NesDocumentEventCapabilities,
  NesRelatedSnippet,
  NesUserAction,
  PlanEntry,
  PromptCapabilities,
  ProviderCurrentConfig,
  Range,
  RequestPermissionOutcome,
  SessionConfigSelectOption,
  SessionInfo,
} from "./schema.gen.part1.ts";

export type ListSessionsResponse = {
  readonly sessions: ReadonlyArray<SessionInfo>;
  readonly nextCursor?: SessionListCursor | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ListSessionsResponse = Schema.Struct({
  sessions: Schema.Array(SessionInfo).annotate({
    description: "Array of session information objects.",
  }),
  nextCursor: Schema.optionalKey(
    Schema.Union([SessionListCursor, Schema.Null]).annotate({
      description:
        "Opaque cursor token. If present, pass this in the next request's cursor parameter\nto fetch the next page. If absent, there are no more results.",
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
}).annotate({ description: "Response from listing sessions.", identifier: "ListSessionsResponse" });

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
    }
  | ({ readonly type: string; readonly planId: PlanId } & { readonly [x: string]: Schema.Json });
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({ description: "A plan represented as structured entries." }),
  Schema.Struct({
    type: Schema.Literal("file"),
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
            "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
        }),
        Schema.Null,
      ]),
    ),
  }).annotate({
    description:
      "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nA plan represented as raw markdown content.",
  }),
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Custom or future plan update content type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp("^(?!(?:\\x69tems|\\x66ile|\\x6darkdown)$)[\\s\\S]*$"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x69tems|\\x66ile|\\x6darkdown)$)[\\s\\S]*$",
        }),
      ),
      planId: Schema.suspend((): Schema.Codec<PlanId> => PlanId).annotate({
        description: "The plan ID to update.",
      }),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future plan update content.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nReceivers that do not understand this content type should preserve the\nraw payload when storing, replaying, proxying, or forwarding plans, and\notherwise ignore it or display it generically.",
  }),
]).annotate({ description: "Updated content for a plan.", identifier: "PlanUpdateContent" });

export type SessionConfigSelectGroup = {
  readonly groupId: SessionConfigGroupId;
  readonly name: string;
  readonly options: ReadonlyArray<SessionConfigSelectOption>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const SessionConfigSelectGroup = Schema.Struct({
  groupId: Schema.suspend((): Schema.Codec<SessionConfigGroupId> => SessionConfigGroupId).annotate({
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  description: "Response to a permission request.",
  identifier: "RequestPermissionResponse",
});

export type ElicitationPropertySchema =
  | {
      readonly type: "string";
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
    }
  | {
      readonly type: "number";
      readonly title?: string | null;
      readonly description?: string | null;
      readonly minimum?: number | null;
      readonly maximum?: number | null;
      readonly default?: number | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "integer";
      readonly title?: string | null;
      readonly description?: string | null;
      readonly minimum?: number | null;
      readonly maximum?: number | null;
      readonly default?: number | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "boolean";
      readonly title?: string | null;
      readonly description?: string | null;
      readonly default?: boolean | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "array";
      readonly title?: string | null;
      readonly description?: string | null;
      readonly minItems?: number | null;
      readonly maxItems?: number | null;
      readonly items: MultiSelectItems;
      readonly default?: ReadonlyArray<string> | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly type: string } & { readonly [x: string]: Schema.Json });
export const ElicitationPropertySchema = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("string"),
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
          .check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          ),
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
          .check(
            Schema.isMinLength(1).annotate({ expected: "a value with a length of at least 1" }),
          ),
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
  }),
  Schema.Struct({
    type: Schema.Literal("number"),
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
  }),
  Schema.Struct({
    type: Schema.Literal("integer"),
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
  }).annotate({ description: "Schema for integer properties in an elicitation form." }),
  Schema.Struct({
    type: Schema.Literal("boolean"),
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
  }).annotate({ description: "Schema for boolean properties in an elicitation form." }),
  Schema.Struct({
    type: Schema.Literal("array"),
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
  }).annotate({
    description: "Schema for multi-select (array) properties in an elicitation form.",
  }),
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Custom or future elicitation property schema type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp("^(?!(?:\\x73tring|\\x6eumber|\\x69nteger|\\x62oolean|\\x61rray)$)[\\s\\S]*$"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x73tring|\\x6eumber|\\x69nteger|\\x62oolean|\\x61rray)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future elicitation property schema.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nClients that do not understand this property schema type should preserve\nthe raw schema when storing, replaying, proxying, or forwarding\nelicitation requests. They MUST NOT render it as a known input control.",
  }),
]).annotate({
  description:
    'Property schema for elicitation form fields.\n\nEach variant corresponds to a JSON Schema `"type"` value.\nSingle-select enums use the `String` variant with `enum` or `oneOf` set.\nMulti-select enums use the `Array` variant.',
  identifier: "ElicitationPropertySchema",
});

export type ProviderInfo = {
  readonly providerId: ProviderId;
  readonly supported: ReadonlyArray<LlmProtocol>;
  readonly required: boolean;
  readonly current?: ProviderCurrentConfig | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ProviderInfo = Schema.Struct({
  providerId: Schema.suspend((): Schema.Codec<ProviderId> => ProviderId).annotate({
    description: 'Provider identifier, for example "main" or "openai".',
  }),
  supported: Schema.Array(LlmProtocol).annotate({
    description: "Supported protocol types for this provider.",
  }),
  required: Schema.Boolean.annotate({
    description:
      "Whether this provider is mandatory and cannot be disabled via `providers/disable`.\nIf true, clients must not call `providers/disable` for this provider ID.",
  }),
  current: Schema.optionalKey(
    Schema.Union([ProviderCurrentConfig, Schema.Null]).annotate({
      description:
        "Current effective non-secret routing config.\nNull or omitted means provider is disabled.",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nInformation about a configurable LLM provider.",
  identifier: "ProviderInfo",
});

export type NesTextEdit = {
  readonly range: Range;
  readonly newText: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesTextEdit = Schema.Struct({
  range: Schema.suspend((): Schema.Codec<Range> => Range).annotate({
    description: "The range to replace.",
  }),
  newText: Schema.String.annotate({ description: "The replacement text." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A text edit within a suggestion.", identifier: "NesTextEdit" });

export type TextDocumentContentChangeEvent = {
  readonly range?: Range | null;
  readonly text: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const TextDocumentContentChangeEvent = Schema.Struct({
  range: Schema.optionalKey(
    Schema.Union([Range, Schema.Null]).annotate({
      description:
        "The range of the document that changed. If `None`, the entire content is replaced.",
    }),
  ),
  text: Schema.String.annotate({
    description: "The new text for the range, or the full document content if `range` is `None`.",
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
    "A content change event for a document.\n\nWhen `range` is `None`, `text` is the full content of the document.\nWhen `range` is `Some`, `text` replaces the given range.",
  identifier: "TextDocumentContentChangeEvent",
});

export type DidFocusDocumentNotification = {
  readonly sessionId: SessionId;
  readonly uri: string;
  readonly version: number;
  readonly position: Position;
  readonly visibleRange: Range;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DidFocusDocumentNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  uri: Schema.String.annotate({ description: "The URI of the focused document.", format: "uri" }),
  version: Schema.Number.annotate({
    description: "The version number of the document.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  position: Schema.suspend((): Schema.Codec<Position> => Position).annotate({
    description: "The current cursor position.",
  }),
  visibleRange: Schema.suspend((): Schema.Codec<Range> => Range).annotate({
    description: "The portion of the file currently visible in the editor viewport.",
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
  description: "Notification sent when a file becomes the active editor tab.",
  identifier: "DidFocusDocumentNotification",
});

export type NesOpenFile = {
  readonly uri: string;
  readonly languageId: string;
  readonly visibleRange?: Range | null;
  readonly lastFocusedMs?: number | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesOpenFile = Schema.Struct({
  uri: Schema.String.annotate({ description: "The URI of the file.", format: "uri" }),
  languageId: Schema.String.annotate({ description: "The language identifier." }),
  visibleRange: Schema.optionalKey(
    Schema.Union([Range, Schema.Null]).annotate({
      description: "The visible range in the editor, if any.",
    }),
  ),
  lastFocusedMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Timestamp in milliseconds since epoch of when the file was last focused.",
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
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "An open file in the editor.", identifier: "NesOpenFile" });

export type NesDiagnostic = {
  readonly uri: string;
  readonly range: Range;
  readonly severity: NesDiagnosticSeverity;
  readonly message: string;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesDiagnostic = Schema.Struct({
  uri: Schema.String.annotate({
    description: "The URI of the file containing the diagnostic.",
    format: "uri",
  }),
  range: Schema.suspend((): Schema.Codec<Range> => Range).annotate({
    description: "The range of the diagnostic.",
  }),
  severity: Schema.suspend(
    (): Schema.Codec<NesDiagnosticSeverity> => NesDiagnosticSeverity,
  ).annotate({ description: "The severity of the diagnostic." }),
  message: Schema.String.annotate({ description: "The diagnostic message." }),
  _meta: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" })).annotate({
        description:
          "The _meta property is reserved by ACP to allow clients and agents to attach additional\nmetadata to their interactions. Implementations MUST NOT make assumptions about values at\nthese keys.\n\nSee protocol docs: [Extensibility](https://agentclientprotocol.com/protocol/v2/draft/extensibility)",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "A diagnostic (error, warning, etc.).", identifier: "NesDiagnostic" });

export type ClientCapabilities = {
  readonly auth?: AuthCapabilities | null;
  readonly elicitation?: ElicitationCapabilities | null;
  readonly nes?: ClientNesCapabilities | null;
  readonly positionEncodings?: ReadonlyArray<PositionEncodingKind>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ClientCapabilities = Schema.Struct({
  auth: Schema.optionalKey(
    Schema.Union([AuthCapabilities, Schema.Null]).annotate({
      description:
        "Authentication capabilities supported by the client.\nDetermines which authentication method types the agent may include\nin its `InitializeResponse`.\n\nOptional. Omitted or `null` both mean the client does not advertise any\nauthentication-method extensions.",
    }),
  ),
  elicitation: Schema.optionalKey(
    Schema.Union([ElicitationCapabilities, Schema.Null]).annotate({
      description:
        "Elicitation capabilities supported by the client.\nDetermines which elicitation modes the agent may use.\n\nOptional. Omitted or `null` both mean the client does not advertise\nelicitation support.",
    }),
  ),
  nes: Schema.optionalKey(
    Schema.Union([ClientNesCapabilities, Schema.Null]).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nNES (Next Edit Suggestions) capabilities supported by the client.\n\nOptional. Omitted or `null` both mean the client does not advertise any\nNES suggestion-kind extensions.",
    }),
  ),
  positionEncodings: Schema.optionalKey(
    Schema.Array(PositionEncodingKind).annotate({
      description:
        "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nThe position encodings supported by the client, in order of preference.",
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
    "Capabilities supported by the client.\n\nAdvertised during initialization to inform the agent about\navailable features and methods.\n\nSee protocol docs: [Client Capabilities](https://agentclientprotocol.com/protocol/v2/draft/initialization#client-capabilities)",
  identifier: "ClientCapabilities",
});

export type NewSessionRequest = {
  readonly cwd: AbsolutePath;
  readonly additionalDirectories?: ReadonlyArray<AbsolutePath>;
  readonly mcpServers?: ReadonlyArray<McpServer>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NewSessionRequest = Schema.Struct({
  cwd: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
    description: "The working directory for this session. Must be an absolute path.",
  }),
  additionalDirectories: Schema.optionalKey(
    Schema.Array(AbsolutePath).annotate({
      description:
        "Additional workspace roots for this session. Each path must be absolute.\n\nThese expand the session's workspace scope without changing `cwd`, which\nremains the base for relative paths. When omitted or empty, no\nadditional roots are activated for the new session.",
    }),
  ),
  mcpServers: Schema.optionalKey(
    Schema.Array(McpServer).annotate({
      description: "List of MCP (Model Context Protocol) servers the agent should connect to.",
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
    "Request parameters for creating a new session.\n\nSee protocol docs: [Creating a Session](https://agentclientprotocol.com/protocol/v2/draft/session-setup#creating-a-session)",
  identifier: "NewSessionRequest",
});

export type ForkSessionRequest = {
  readonly sessionId: SessionId;
  readonly cwd: AbsolutePath;
  readonly additionalDirectories?: ReadonlyArray<AbsolutePath>;
  readonly mcpServers?: ReadonlyArray<McpServer>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ForkSessionRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the session to fork.",
  }),
  cwd: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
    description: "The working directory for this session. Must be an absolute path.",
  }),
  additionalDirectories: Schema.optionalKey(
    Schema.Array(AbsolutePath).annotate({
      description:
        "Additional workspace roots to activate for this session. Each path must be absolute.\n\nWhen omitted or empty, no additional roots are activated. When non-empty,\nthis is the complete resulting additional-root list for the forked\nsession.",
    }),
  ),
  mcpServers: Schema.optionalKey(
    Schema.Array(McpServer).annotate({
      description: "List of MCP servers to connect to for this session.",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nRequest parameters for forking an existing session.\n\nCreates a new session based on the context of an existing one, allowing\noperations like generating summaries without affecting the original session's history.\n\nOnly available if the Agent supports the `session.fork` capability.",
  identifier: "ForkSessionRequest",
});

export type ResumeSessionRequest = {
  readonly sessionId: SessionId;
  readonly cwd: AbsolutePath;
  readonly additionalDirectories?: ReadonlyArray<AbsolutePath>;
  readonly mcpServers?: ReadonlyArray<McpServer>;
  readonly replayFrom?: ReplayFrom | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ResumeSessionRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the session to resume.",
  }),
  cwd: Schema.suspend((): Schema.Codec<AbsolutePath> => AbsolutePath).annotate({
    description: "The working directory for this session. Must be an absolute path.",
  }),
  additionalDirectories: Schema.optionalKey(
    Schema.Array(AbsolutePath).annotate({
      description:
        "Additional workspace roots to activate for this session. Each path must be absolute.\n\nWhen omitted or empty, no additional roots are activated. When non-empty,\nthis is the complete resulting additional-root list for the resumed\nsession. It may differ from any previously used or reported list as long as\nthe request `cwd` matches the session's `cwd`.",
    }),
  ),
  mcpServers: Schema.optionalKey(
    Schema.Array(McpServer).annotate({
      description: "List of MCP servers to connect to for this session.",
    }),
  ),
  replayFrom: Schema.optionalKey(
    Schema.Union([ReplayFrom, Schema.Null]).annotate({
      description:
        'Inclusive cursor describing where conversation replay should begin.\n\nOptional. Omitted or `null` both mean the Agent should resume without\nreplaying previous conversation history. Replay cursors are inclusive:\nreplay includes the position identified by the cursor. Supplying\n`{ "type": "start" }` means the Agent should replay the whole\nconversation before responding.',
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
    "Request parameters for resuming an existing session.\n\nResumes an existing session and optionally replays prior conversation\nhistory according to `replayFrom`.",
  identifier: "ResumeSessionRequest",
});

export type NesEventCapabilities = {
  readonly document?: NesDocumentEventCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesEventCapabilities = Schema.Struct({
  document: Schema.optionalKey(
    Schema.Union([NesDocumentEventCapabilities, Schema.Null]).annotate({
      description: "Document event capabilities.",
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
  description: "Event capabilities the agent can consume.",
  identifier: "NesEventCapabilities",
});

export type ContentBlock =
  | {
      readonly type: "text";
      readonly text: string;
      readonly annotations?: Annotations | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "image";
      readonly data: string;
      readonly mimeType: MediaType;
      readonly uri?: string | null;
      readonly annotations?: Annotations | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "audio";
      readonly data: string;
      readonly mimeType: MediaType;
      readonly annotations?: Annotations | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "resource_link";
      readonly name: string;
      readonly uri: string;
      readonly title?: string | null;
      readonly description?: string | null;
      readonly icons?: ReadonlyArray<Icon> | null;
      readonly mimeType?: MediaType | null;
      readonly size?: number | null;
      readonly annotations?: Annotations | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "resource";
      readonly resource: EmbeddedResourceResource;
      readonly annotations?: Annotations | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly type: string } & { readonly [x: string]: Schema.Json });
export const ContentBlock = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("text"),
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
  }).annotate({ description: "Text provided to or from an LLM." }),
  Schema.Struct({
    type: Schema.Literal("image"),
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
  }).annotate({ description: "An image provided to or from an LLM." }),
  Schema.Struct({
    type: Schema.Literal("audio"),
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
  }).annotate({ description: "Audio provided to or from an LLM." }),
  Schema.Struct({
    type: Schema.Literal("resource_link"),
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
          description:
            "Optional set of sized icons that the client can display in a user interface.",
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
  }),
  Schema.Struct({
    type: Schema.Literal("resource"),
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
  }),
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Custom or future content block type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp(
            "^(?!(?:\\x74ext|\\x69mage|\\x61udio|\\x72esource_link|\\x72esource)$)[\\s\\S]*$",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x74ext|\\x69mage|\\x61udio|\\x72esource_link|\\x72esource)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future content block.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nReceivers that do not understand this content block type should preserve\nthe raw payload when storing, replaying, proxying, or forwarding content,\nand otherwise ignore it or display it generically.",
  }),
]).annotate({
  description:
    "Content blocks represent displayable information in the Agent Client Protocol.\n\nThey provide a structured way to handle various types of user-facing content—whether\nit's text from language models, images for analysis, or embedded resources for context.\n\nContent blocks appear in:\n- User prompts sent via `session/prompt`\n- Language model output reported through `session/update` notifications as\n  message updates or streamed chunks\n- Progress updates and results from tool calls\n\nThis structure is compatible with the Model Context Protocol (MCP), enabling\nagents to seamlessly forward content from MCP tool outputs without transformation.\n\nSee protocol docs: [Content](https://agentclientprotocol.com/protocol/v2/draft/content)",
  identifier: "ContentBlock",
});

export type SessionConfigSelectOptions =
  | ReadonlyArray<SessionConfigSelectOption>
  | ReadonlyArray<SessionConfigSelectGroup>;
export const SessionConfigSelectOptions = Schema.Union([
  Schema.Array(SessionConfigSelectOption).annotate({
    title: "Ungrouped",
    description: "A flat list of options with no grouping.",
  }),
  Schema.Array(SessionConfigSelectGroup).annotate({
    title: "Grouped",
    description: "A list of options grouped under headers.",
  }),
]).annotate({
  description: "Possible values for a session configuration option.",
  identifier: "SessionConfigSelectOptions",
});

export type ElicitationSchema = {
  readonly type?: ElicitationSchemaType;
  readonly title?: string | null;
  readonly properties?: { readonly [x: string]: ElicitationPropertySchema };
  readonly required?: ReadonlyArray<string> | null;
  readonly description?: string | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ElicitationSchema = Schema.Struct({
  type: Schema.optionalKey(
    Schema.suspend((): Schema.Codec<ElicitationSchemaType> => ElicitationSchemaType).annotate({
      description: 'Type discriminator. Always `"object"`.',
      default: "object",
    }),
  ),
  title: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional title for the schema.\n\nOptional. Omitted and `null` are equivalent and mean no title is provided.",
      }),
      Schema.Null,
    ]),
  ),
  properties: Schema.optionalKey(
    Schema.Record(Schema.String, ElicitationPropertySchema).annotate({
      description: "Property definitions (must be primitive types).",
      default: {},
    }),
  ),
  required: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "List of required property names.\n\nOptional. Omitted and `null` are equivalent and mean no property names are required.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional description of what this schema represents.\n\nOptional. Omitted and `null` are equivalent and mean no schema description is provided.",
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
}).annotate({
  description:
    "Type-safe elicitation schema for requesting structured user input.\n\nThis represents a JSON Schema object with primitive-typed properties,\nas required by the elicitation specification.",
  identifier: "ElicitationSchema",
});

export type ListProvidersResponse = {
  readonly providers: ReadonlyArray<ProviderInfo>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const ListProvidersResponse = Schema.Struct({
  providers: Schema.Array(ProviderInfo).annotate({
    description: "Configurable providers with current routing info suitable for UI display.",
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
    "**UNSTABLE**\n\nThis capability is not part of the spec yet, and may be removed or changed at any point.\n\nResponse to `providers/list`.",
  identifier: "ListProvidersResponse",
});

export type NesSuggestion =
  | {
      readonly kind: "edit";
      readonly suggestionId: NesSuggestionId;
      readonly uri: string;
      readonly edits: ReadonlyArray<NesTextEdit>;
      readonly cursorPosition?: Position | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly kind: "jump";
      readonly suggestionId: NesSuggestionId;
      readonly uri: string;
      readonly position: Position;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly kind: "rename";
      readonly suggestionId: NesSuggestionId;
      readonly uri: string;
      readonly position: Position;
      readonly newName: string;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly kind: "searchAndReplace";
      readonly suggestionId: NesSuggestionId;
      readonly uri: string;
      readonly search: string;
      readonly replace: string;
      readonly isRegex?: boolean | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly kind: string; readonly suggestionId: NesSuggestionId } & {
      readonly [x: string]: Schema.Json;
    });
export const NesSuggestion = Schema.Union([
  Schema.Struct({
    kind: Schema.Literal("edit"),
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
  }).annotate({ description: "A text edit suggestion." }),
  Schema.Struct({
    kind: Schema.Literal("jump"),
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
  }).annotate({ description: "A jump-to-location suggestion." }),
  Schema.Struct({
    kind: Schema.Literal("rename"),
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
  }).annotate({ description: "A rename symbol suggestion." }),
  Schema.Struct({
    kind: Schema.Literal("searchAndReplace"),
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
  }).annotate({ description: "A search-and-replace suggestion." }),
  Schema.StructWithRest(
    Schema.Struct({
      kind: Schema.String.annotate({
        description:
          "Custom or future NES suggestion kind.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp("^(?!(?:\\x65dit|\\x6aump|\\x72ename|\\x73earchAndReplace)$)[\\s\\S]*$"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x65dit|\\x6aump|\\x72ename|\\x73earchAndReplace)$)[\\s\\S]*$",
        }),
      ),
      suggestionId: Schema.suspend((): Schema.Codec<NesSuggestionId> => NesSuggestionId).annotate({
        description: "Unique identifier for accept/reject tracking.",
      }),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future NES suggestion.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nReceivers that do not understand this suggestion kind should preserve\nthe raw payload when storing, replaying, proxying, or forwarding\nsuggestions, and otherwise ignore it or display it generically.",
  }),
]).annotate({ description: "A suggestion returned by the agent.", identifier: "NesSuggestion" });

export type DidChangeDocumentNotification = {
  readonly sessionId: SessionId;
  readonly uri: string;
  readonly version: number;
  readonly contentChanges: ReadonlyArray<TextDocumentContentChangeEvent>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const DidChangeDocumentNotification = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The session ID for this notification.",
  }),
  uri: Schema.String.annotate({ description: "The URI of the changed document.", format: "uri" }),
  version: Schema.Number.annotate({
    description: "The new version number of the document.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  contentChanges: Schema.Array(TextDocumentContentChangeEvent).annotate({
    description: "The content changes.",
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
  description: "Notification sent when a file is edited.",
  identifier: "DidChangeDocumentNotification",
});

export type NesSuggestContext = {
  readonly recentFiles?: ReadonlyArray<NesRecentFile> | null;
  readonly relatedSnippets?: ReadonlyArray<NesRelatedSnippet> | null;
  readonly editHistory?: ReadonlyArray<NesEditHistoryEntry> | null;
  readonly userActions?: ReadonlyArray<NesUserAction> | null;
  readonly openFiles?: ReadonlyArray<NesOpenFile> | null;
  readonly diagnostics?: ReadonlyArray<NesDiagnostic> | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesSuggestContext = Schema.Struct({
  recentFiles: Schema.optionalKey(
    Schema.Union([
      Schema.Array(NesRecentFile).annotate({ description: "Recently accessed files." }),
      Schema.Null,
    ]),
  ),
  relatedSnippets: Schema.optionalKey(
    Schema.Union([
      Schema.Array(NesRelatedSnippet).annotate({ description: "Related code snippets." }),
      Schema.Null,
    ]),
  ),
  editHistory: Schema.optionalKey(
    Schema.Union([
      Schema.Array(NesEditHistoryEntry).annotate({ description: "Recent edit history." }),
      Schema.Null,
    ]),
  ),
  userActions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(NesUserAction).annotate({
        description: "Recent user actions (typing, navigation, etc.).",
      }),
      Schema.Null,
    ]),
  ),
  openFiles: Schema.optionalKey(
    Schema.Union([
      Schema.Array(NesOpenFile).annotate({ description: "Currently open files in the editor." }),
      Schema.Null,
    ]),
  ),
  diagnostics: Schema.optionalKey(
    Schema.Union([
      Schema.Array(NesDiagnostic).annotate({
        description: "Current diagnostics (errors, warnings).",
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
  description: "Context attached to a suggestion request.",
  identifier: "NesSuggestContext",
});

export type InitializeRequest = {
  readonly protocolVersion: ProtocolVersion;
  readonly info: Implementation;
  readonly capabilities?: ClientCapabilities;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const InitializeRequest = Schema.Struct({
  protocolVersion: Schema.suspend((): Schema.Codec<ProtocolVersion> => ProtocolVersion).annotate({
    description: "The latest protocol version supported by the client.",
  }),
  info: Schema.suspend((): Schema.Codec<Implementation> => Implementation).annotate({
    description: "Information about the implementation sending this initialize request.",
  }),
  capabilities: Schema.optionalKey(
    Schema.suspend((): Schema.Codec<ClientCapabilities> => ClientCapabilities).annotate({
      description: "Capabilities supported by the client.",
      default: {},
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
    "Request parameters for the initialize method.\n\nSent by the client to establish connection and negotiate capabilities.\n\nSee protocol docs: [Initialization](https://agentclientprotocol.com/protocol/v2/draft/initialization)",
  identifier: "InitializeRequest",
});

export type NesCapabilities = {
  readonly events?: NesEventCapabilities | null;
  readonly context?: NesContextCapabilities | null;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const NesCapabilities = Schema.Struct({
  events: Schema.optionalKey(
    Schema.Union([NesEventCapabilities, Schema.Null]).annotate({
      description: "Events the agent wants to receive.",
    }),
  ),
  context: Schema.optionalKey(
    Schema.Union([NesContextCapabilities, Schema.Null]).annotate({
      description: "Context the agent wants attached to each suggestion request.",
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
    "NES capabilities advertised by the agent during initialization.\n\nSupplying `{}` means the agent supports the NES method surface. Omitted or\n`null` both mean the agent does not advertise support for `nes/*` methods.",
  identifier: "NesCapabilities",
});

export type ToolCallContent =
  | {
      readonly type: "content";
      readonly content: ContentBlock;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "diff";
      readonly changes: ReadonlyArray<DiffChange>;
      readonly patch?: DiffPatch | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | {
      readonly type: "terminal";
      readonly terminalId: TerminalId;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
    }
  | ({ readonly type: string } & { readonly [x: string]: Schema.Json });
export const ToolCallContent = Schema.Union([
  Schema.Struct({
    type: Schema.Literal("content"),
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
  }).annotate({ description: "Standard content block (text, images, resources)." }),
  Schema.Struct({
    type: Schema.Literal("diff"),
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
  }),
  Schema.Struct({
    type: Schema.Literal("terminal"),
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
  }),
  Schema.StructWithRest(
    Schema.Struct({
      type: Schema.String.annotate({
        description:
          "Custom or future tool call content type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(
          new RegExp("^(?!(?:\\x63ontent|\\x64iff|\\x74erminal)$)[\\s\\S]*$"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(?!(?:\\x63ontent|\\x64iff|\\x74erminal)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future tool call content.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nReceivers that do not understand this content type should preserve the\nraw payload when storing, replaying, proxying, or forwarding tool call\noutput, and otherwise ignore it or display it generically.",
  }),
]).annotate({
  description:
    "Content produced by a tool call.\n\nTool calls can produce different types of content including standard\ncontent blocks (text, images), file diffs, or display-only terminals.\n\nSee protocol docs: [Content](https://agentclientprotocol.com/protocol/v2/draft/tool-calls#content)",
  identifier: "ToolCallContent",
});

export type PromptRequest = {
  readonly sessionId: SessionId;
  readonly prompt: ReadonlyArray<ContentBlock>;
  readonly _meta?: { readonly [x: string]: Schema.Json } | null;
};
export const PromptRequest = Schema.Struct({
  sessionId: Schema.suspend((): Schema.Codec<SessionId> => SessionId).annotate({
    description: "The ID of the session to send this user message to",
  }),
  prompt: Schema.Array(ContentBlock).annotate({
    description:
      "The blocks of content that compose the user's message.\n\nAs a baseline, the Agent MUST support [`ContentBlock::Text`] and [`ContentBlock::ResourceLink`],\nwhile other variants are optionally enabled via [`PromptCapabilities`].\n\nThe Client MUST adapt its interface according to [`PromptCapabilities`].\n\nThe client MAY include referenced pieces of context as either\n[`ContentBlock::Resource`] or [`ContentBlock::ResourceLink`].\n\nWhen available, [`ContentBlock::Resource`] is preferred\nas it avoids extra round-trips and allows the message to include\npieces of context from sources the agent may not have access to.",
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
    "Request parameters for sending a user prompt to the agent.\n\nContains the user's message and any additional context.\n\nSee protocol docs: [User Message](https://agentclientprotocol.com/protocol/v2/draft/prompt-lifecycle#1-user-message)",
  identifier: "PromptRequest",
});

export type SessionConfigOption =
  | {
      readonly configId: SessionConfigId;
      readonly name: string;
      readonly description?: string | null;
      readonly category?: SessionConfigOptionCategory | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly type: "select";
      readonly currentValue: SessionConfigValueId;
      readonly options: SessionConfigSelectOptions;
    }
  | {
      readonly configId: SessionConfigId;
      readonly name: string;
      readonly description?: string | null;
      readonly category?: SessionConfigOptionCategory | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly type: "boolean";
      readonly currentValue: boolean;
    }
  | ({
      readonly configId: SessionConfigId;
      readonly name: string;
      readonly description?: string | null;
      readonly category?: SessionConfigOptionCategory | null;
      readonly _meta?: { readonly [x: string]: Schema.Json } | null;
      readonly type: string;
    } & { readonly [x: string]: Schema.Json });
export const SessionConfigOption = Schema.Union([
  Schema.Struct({
    configId: Schema.suspend((): Schema.Codec<SessionConfigId> => SessionConfigId).annotate({
      description: "Unique identifier for the configuration option.",
    }),
    name: Schema.String.annotate({ description: "Human-readable label for the option." }),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Optional description for the Client to display to the user.",
        }),
        Schema.Null,
      ]),
    ),
    category: Schema.optionalKey(
      Schema.Union([SessionConfigOptionCategory, Schema.Null]).annotate({
        description: "Optional semantic category for this option (UX only).",
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
    type: Schema.Literal("select"),
    currentValue: Schema.suspend(
      (): Schema.Codec<SessionConfigValueId> => SessionConfigValueId,
    ).annotate({ description: "The currently selected value." }),
    options: Schema.suspend(
      (): Schema.Codec<SessionConfigSelectOptions> => SessionConfigSelectOptions,
    ).annotate({ description: "The set of selectable options." }),
  }).annotate({
    description: "A single-value selector (dropdown) session configuration option payload.",
  }),
  Schema.Struct({
    configId: Schema.suspend((): Schema.Codec<SessionConfigId> => SessionConfigId).annotate({
      description: "Unique identifier for the configuration option.",
    }),
    name: Schema.String.annotate({ description: "Human-readable label for the option." }),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "Optional description for the Client to display to the user.",
        }),
        Schema.Null,
      ]),
    ),
    category: Schema.optionalKey(
      Schema.Union([SessionConfigOptionCategory, Schema.Null]).annotate({
        description: "Optional semantic category for this option (UX only).",
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
    type: Schema.Literal("boolean"),
    currentValue: Schema.Boolean.annotate({
      description: "The current value of the boolean option.",
    }),
  }).annotate({ description: "A boolean on/off toggle session configuration option payload." }),
  Schema.StructWithRest(
    Schema.Struct({
      configId: Schema.suspend((): Schema.Codec<SessionConfigId> => SessionConfigId).annotate({
        description: "Unique identifier for the configuration option.",
      }),
      name: Schema.String.annotate({ description: "Human-readable label for the option." }),
      description: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Optional description for the Client to display to the user.",
          }),
          Schema.Null,
        ]),
      ),
      category: Schema.optionalKey(
        Schema.Union([SessionConfigOptionCategory, Schema.Null]).annotate({
          description: "Optional semantic category for this option (UX only).",
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
      type: Schema.String.annotate({
        description:
          "Custom or future session configuration option type.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.",
      }).check(
        Schema.isPattern(new RegExp("^(?!(?:\\x73elect|\\x62oolean)$)[\\s\\S]*$")).annotate({
          expected: "a string matching the RegExp ^(?!(?:\\x73elect|\\x62oolean)$)[\\s\\S]*$",
        }),
      ),
    }),
    [Schema.Record(Schema.String, Schema.Json.annotate({ expected: "JSON value" }))],
  ).annotate({
    title: "other",
    description:
      "Custom or future session configuration option payload.\n\nValues beginning with `_` are reserved for implementation-specific\nextensions. Unknown values that do not begin with `_` are reserved for\nfuture ACP variants.\n\nClients that do not understand this option type should preserve the raw\npayload when storing, replaying, proxying, or forwarding configuration\ndata, and otherwise ignore the option or display it generically.",
  }),
]).annotate({ identifier: "SessionConfigOption" });
