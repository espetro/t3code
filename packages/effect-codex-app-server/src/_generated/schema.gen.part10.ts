import * as Schema from "effect/Schema";
import {
  V2ThreadReadResponse__ByteRange,
  V2ThreadReadResponse__CollabAgentStatus,
  V2ThreadReadResponse__ImageDetail,
  V2ThreadReadResponse__LegacyAppPathString,
  V2ThreadReadResponse__McpAppDisplayMode,
  V2ThreadReadResponse__MemoryCitationEntry,
  V2ThreadReadResponse__MisalignmentSteer,
  V2ThreadReadResponse__NonSteerableTurnKind,
  V2ThreadReadResponse__PatchChangeKind,
  V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeBemItemPresentation,
  V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeSessionOutcome,
  V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeTranscriptRole,
  V2ThreadRealtimeItemStartedNotification__ThreadRealtimeBemItemPresentation,
  V2ThreadRealtimeItemStartedNotification__ThreadRealtimeSessionOutcome,
  V2ThreadRealtimeItemStartedNotification__ThreadRealtimeTranscriptRole,
  V2ThreadResumeParams__ImageDetail,
  V2ThreadResumeParams__ReasoningEffort,
  V2ThreadResumeResponse__AbsolutePathBuf,
  V2ThreadResumeResponse__AgentPath,
  V2ThreadResumeResponse__ByteRange,
  V2ThreadResumeResponse__CollabAgentStatus,
  V2ThreadResumeResponse__ImageDetail,
  V2ThreadResumeResponse__LegacyAppPathString,
  V2ThreadResumeResponse__McpAppDisplayMode,
  V2ThreadResumeResponse__MemoryCitationEntry,
  V2ThreadResumeResponse__MisalignmentSteer,
  V2ThreadResumeResponse__NetworkAccess,
  V2ThreadResumeResponse__NonSteerableTurnKind,
  V2ThreadResumeResponse__PatchChangeKind,
  V2ThreadResumeResponse__ReasoningEffort,
  V2ThreadResumeResponse__ThreadActiveFlag,
  V2ThreadResumeResponse__ThreadId,
  V2ThreadResumeResponse__ThreadSectionAppearance,
  V2ThreadRevertResponse__AgentPath,
  V2ThreadRevertResponse__ByteRange,
  V2ThreadRevertResponse__CollabAgentStatus,
  V2ThreadRevertResponse__ImageDetail,
  V2ThreadRevertResponse__LegacyAppPathString,
  V2ThreadRevertResponse__McpAppDisplayMode,
  V2ThreadRevertResponse__MemoryCitationEntry,
  V2ThreadRevertResponse__MisalignmentSteer,
  V2ThreadRevertResponse__NonSteerableTurnKind,
  V2ThreadRevertResponse__PatchChangeKind,
  V2ThreadRevertResponse__ThreadActiveFlag,
  V2ThreadRevertResponse__ThreadId,
  V2ThreadRevertResponse__ThreadSectionAppearance,
} from "./schema.gen.part4.ts";
import {
  V2ThreadSectionCreateResponse__ThreadSectionAppearance,
  V2ThreadSectionListResponse__ThreadSectionAppearance,
  V2ThreadSectionUpdateResponse__ThreadSectionAppearance,
  V2ThreadSettingsUpdatedNotification__AbsolutePathBuf,
  V2ThreadSettingsUpdatedNotification__NetworkAccess,
  V2ThreadSettingsUpdatedNotification__ReasoningEffort,
  V2ThreadStartResponse__AbsolutePathBuf,
  V2ThreadStartResponse__AgentPath,
  V2ThreadStartResponse__ByteRange,
  V2ThreadStartResponse__CollabAgentStatus,
  V2ThreadStartResponse__ImageDetail,
  V2ThreadStartResponse__LegacyAppPathString,
  V2ThreadStartResponse__McpAppDisplayMode,
  V2ThreadStartResponse__MemoryCitationEntry,
  V2ThreadStartResponse__MisalignmentSteer,
  V2ThreadStartResponse__NetworkAccess,
  V2ThreadStartResponse__NonSteerableTurnKind,
  V2ThreadStartResponse__PatchChangeKind,
  V2ThreadStartResponse__ThreadActiveFlag,
  V2ThreadStartResponse__ThreadId,
  V2ThreadStartResponse__ThreadSectionAppearance,
  V2ThreadStartedNotification__AgentPath,
  V2ThreadStartedNotification__ByteRange,
  V2ThreadStartedNotification__CollabAgentStatus,
  V2ThreadStartedNotification__ImageDetail,
  V2ThreadStartedNotification__LegacyAppPathString,
  V2ThreadStartedNotification__McpAppDisplayMode,
  V2ThreadStartedNotification__MemoryCitationEntry,
  V2ThreadStartedNotification__MisalignmentSteer,
  V2ThreadStartedNotification__NonSteerableTurnKind,
  V2ThreadStartedNotification__PatchChangeKind,
  V2ThreadStartedNotification__ThreadActiveFlag,
  V2ThreadStartedNotification__ThreadId,
  V2ThreadStartedNotification__ThreadSectionAppearance,
  V2ThreadStatusChangedNotification__ThreadActiveFlag,
  V2ThreadTokenUsageUpdatedNotification__TokenUsageBreakdown,
} from "./schema.gen.part5.ts";

export type V2ThreadReadResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadReadResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadReadResponse__CodexErrorInfo = Schema.Union(
  [
    Schema.String,
    Schema.Struct({
      httpConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({ title: "HttpConnectionFailedCodexErrorInfo" }),
    Schema.Struct({
      responseStreamConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamConnectionFailedCodexErrorInfo",
      description: "Failed to connect to the response SSE stream.",
    }),
    Schema.Struct({
      responseStreamDisconnected: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamDisconnectedCodexErrorInfo",
      description:
        "The response SSE stream disconnected in the middle of a turn before completion.",
    }),
    Schema.Struct({
      responseTooManyFailedAttempts: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseTooManyFailedAttemptsCodexErrorInfo",
      description: "Reached the retry limit for responses.",
    }),
    Schema.Struct({
      activeTurnNotSteerable: Schema.Struct({
        turnKind: V2ThreadReadResponse__NonSteerableTurnKind,
      }),
    }).annotate({
      title: "ActiveTurnNotSteerableCodexErrorInfo",
      description:
        "Returned when `turn/start` or `turn/steer` is submitted while the current active turn cannot accept same-turn steering, for example `/review` or manual `/compact`.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "This translation layer make sure that we expose codex error code in camel case.\n\nWhen an upstream HTTP status is available (for example, from the Responses API or a provider), it is forwarded in `httpStatusCode` on the relevant `codexErrorInfo` variant.",
  identifier: "V2ThreadReadResponse__CodexErrorInfo",
});

export type V2ThreadReadResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadReadResponse__MisalignmentSteer | null;
};
export const V2ThreadReadResponse__MisalignmentErrorDetails = Schema.Struct({
  detailedExplanation: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "A substantive localized explanation is required before offering continuation.",
      }),
      Schema.Null,
    ]),
  ),
  errorType: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Open-ended classification; clients must accept categories added by Responses.",
      }),
      Schema.Null,
    ]),
  ),
  steer: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadReadResponse__MisalignmentErrorDetails" });

export type V2ThreadReadResponse__TextElement = {
  readonly byteRange: V2ThreadReadResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadReadResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadReadResponse__ByteRange> => V2ThreadReadResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadReadResponse__TextElement" });

export type V2ThreadReadResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadReadResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadReadResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadReadResponse__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadReadResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadReadResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdFunctionCallOutputContentItem" }),
    ]).annotate({ title: "InputImageFunctionCallOutputContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({
        title: "InputAudioFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioFunctionCallOutputContentItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "EncryptedContentFunctionCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Responses API compatible content items that can be returned by a tool call. This is a subset of ContentItem with the types we support as function call outputs.",
  identifier: "V2ThreadReadResponse__FunctionCallOutputContentItem",
});

export type V2ThreadReadResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadReadResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadReadResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadReadResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadReadResponse__MemoryCitation" });

export type V2ThreadReadResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadReadResponse__LegacyAppPathString;
      readonly type: "read";
    }
  | { readonly command: string; readonly path?: string | null; readonly type: "listFiles" }
  | {
      readonly command: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly command: string; readonly type: "unknown" };
export const V2ThreadReadResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadReadResponse__LegacyAppPathString,
      type: Schema.Literal("read").annotate({ title: "ReadCommandActionType" }),
    }).annotate({ title: "ReadCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("listFiles").annotate({ title: "ListFilesCommandActionType" }),
    }).annotate({ title: "ListFilesCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchCommandActionType" }),
    }).annotate({ title: "SearchCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownCommandActionType" }),
    }).annotate({ title: "UnknownCommandAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadReadResponse__CommandAction" });

export type V2ThreadReadResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadReadResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadReadResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadReadResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadReadResponse__FileUpdateChange" });

export type V2ThreadReadResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadReadResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadReadResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadReadResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadReadResponse__McpAppUi",
});

export type V2ThreadReadResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadReadResponse__CollabAgentStatus;
};
export const V2ThreadReadResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadReadResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadReadResponse__CollabAgentState" });

export type V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeItem =
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly type: "realtimeSessionStarted";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly role: V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeTranscriptRole;
      readonly text: string;
      readonly type: "transcriptSegment";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly item_id: string;
      readonly presentation: V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeBemItemPresentation;
      readonly turn_id: string;
      readonly type: "bemItemPromoted";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly outcome: V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeSessionOutcome;
      readonly type: "realtimeSessionClosed";
    };
export const V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeItem = Schema.Union(
  [
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      type: Schema.Literal("realtimeSessionStarted").annotate({
        title: "RealtimeSessionStartedThreadRealtimeItemType",
      }),
    }).annotate({ title: "RealtimeSessionStartedThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      role: V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeTranscriptRole,
      text: Schema.String,
      type: Schema.Literal("transcriptSegment").annotate({
        title: "TranscriptSegmentThreadRealtimeItemType",
      }),
    }).annotate({ title: "TranscriptSegmentThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      item_id: Schema.String,
      presentation: V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeBemItemPresentation,
      turn_id: Schema.String,
      type: Schema.Literal("bemItemPromoted").annotate({
        title: "BemItemPromotedThreadRealtimeItemType",
      }),
    }).annotate({ title: "BemItemPromotedThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      outcome: V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeSessionOutcome,
      type: Schema.Literal("realtimeSessionClosed").annotate({
        title: "RealtimeSessionClosedThreadRealtimeItemType",
      }),
    }).annotate({ title: "RealtimeSessionClosedThreadRealtimeItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "EXPERIMENTAL - a thread-scoped realtime item in the canonical timeline.",
  identifier: "V2ThreadRealtimeItemCompletedNotification__ThreadRealtimeItem",
});

export type V2ThreadRealtimeItemStartedNotification__ThreadRealtimeItem =
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly type: "realtimeSessionStarted";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly role: V2ThreadRealtimeItemStartedNotification__ThreadRealtimeTranscriptRole;
      readonly text: string;
      readonly type: "transcriptSegment";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly item_id: string;
      readonly presentation: V2ThreadRealtimeItemStartedNotification__ThreadRealtimeBemItemPresentation;
      readonly turn_id: string;
      readonly type: "bemItemPromoted";
    }
  | {
      readonly id: string;
      readonly realtimeSessionId: string;
      readonly outcome: V2ThreadRealtimeItemStartedNotification__ThreadRealtimeSessionOutcome;
      readonly type: "realtimeSessionClosed";
    };
export const V2ThreadRealtimeItemStartedNotification__ThreadRealtimeItem = Schema.Union(
  [
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      type: Schema.Literal("realtimeSessionStarted").annotate({
        title: "RealtimeSessionStartedThreadRealtimeItemType",
      }),
    }).annotate({ title: "RealtimeSessionStartedThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      role: V2ThreadRealtimeItemStartedNotification__ThreadRealtimeTranscriptRole,
      text: Schema.String,
      type: Schema.Literal("transcriptSegment").annotate({
        title: "TranscriptSegmentThreadRealtimeItemType",
      }),
    }).annotate({ title: "TranscriptSegmentThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      item_id: Schema.String,
      presentation: V2ThreadRealtimeItemStartedNotification__ThreadRealtimeBemItemPresentation,
      turn_id: Schema.String,
      type: Schema.Literal("bemItemPromoted").annotate({
        title: "BemItemPromotedThreadRealtimeItemType",
      }),
    }).annotate({ title: "BemItemPromotedThreadRealtimeItem" }),
    Schema.Struct({
      id: Schema.String,
      realtimeSessionId: Schema.String,
      outcome: V2ThreadRealtimeItemStartedNotification__ThreadRealtimeSessionOutcome,
      type: Schema.Literal("realtimeSessionClosed").annotate({
        title: "RealtimeSessionClosedThreadRealtimeItemType",
      }),
    }).annotate({ title: "RealtimeSessionClosedThreadRealtimeItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "EXPERIMENTAL - a thread-scoped realtime item in the canonical timeline.",
  identifier: "V2ThreadRealtimeItemStartedNotification__ThreadRealtimeItem",
});

export type V2ThreadResumeParams__ConfigurationReasoning = {
  readonly effort: V2ThreadResumeParams__ReasoningEffort;
};
export const V2ThreadResumeParams__ConfigurationReasoning = Schema.Struct({
  effort: V2ThreadResumeParams__ReasoningEffort,
}).annotate({
  description: "Reasoning settings interpreted by the backend for the routed model.",
  identifier: "V2ThreadResumeParams__ConfigurationReasoning",
});

export type V2ThreadResumeParams__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadResumeParams__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadResumeParams__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadResumeParams__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadResumeParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadResumeParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdFunctionCallOutputContentItem" }),
    ]).annotate({ title: "InputImageFunctionCallOutputContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({
        title: "InputAudioFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioFunctionCallOutputContentItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "EncryptedContentFunctionCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Responses API compatible content items that can be returned by a tool call. This is a subset of ContentItem with the types we support as function call outputs.",
  identifier: "V2ThreadResumeParams__FunctionCallOutputContentItem",
});

export type V2ThreadResumeParams__ContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadResumeParams__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadResumeParams__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly text: string; readonly type: "output_text" };
export const V2ThreadResumeParams__ContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({ title: "InputTextContentItemType" }),
    }).annotate({ title: "InputTextContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadResumeParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({ title: "InputImageContentItemType" }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadResumeParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({ title: "InputImageContentItemType" }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdContentItem" }),
    ]).annotate({ title: "InputImageContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({ title: "InputAudioContentItemType" }),
    }).annotate({ title: "InputAudioContentItem" }),
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("output_text").annotate({ title: "OutputTextContentItemType" }),
    }).annotate({ title: "OutputTextContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeParams__ContentItem" });

export type V2ThreadResumeResponse__Settings = {
  readonly developer_instructions?: string | null;
  readonly model: string;
  readonly reasoning_effort?: V2ThreadResumeResponse__ReasoningEffort | null;
};
export const V2ThreadResumeResponse__Settings = Schema.Struct({
  developer_instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  model: Schema.String,
  reasoning_effort: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__ReasoningEffort, Schema.Null]),
  ),
}).annotate({
  description: "Settings for a collaboration mode.",
  identifier: "V2ThreadResumeResponse__Settings",
});

export type V2ThreadResumeResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadResumeResponse__LegacyAppPathString;
      readonly type: "read";
    }
  | { readonly command: string; readonly path?: string | null; readonly type: "listFiles" }
  | {
      readonly command: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly command: string; readonly type: "unknown" };
export const V2ThreadResumeResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadResumeResponse__LegacyAppPathString,
      type: Schema.Literal("read").annotate({ title: "ReadCommandActionType" }),
    }).annotate({ title: "ReadCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("listFiles").annotate({ title: "ListFilesCommandActionType" }),
    }).annotate({ title: "ListFilesCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchCommandActionType" }),
    }).annotate({ title: "SearchCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownCommandActionType" }),
    }).annotate({ title: "UnknownCommandAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeResponse__CommandAction" });

export type V2ThreadResumeResponse__SandboxPolicy =
  | { readonly type: "dangerFullAccess" }
  | { readonly networkAccess?: boolean; readonly type: "readOnly" }
  | {
      readonly networkAccess?: V2ThreadResumeResponse__NetworkAccess;
      readonly type: "externalSandbox";
    }
  | {
      readonly excludeSlashTmp?: boolean;
      readonly excludeTmpdirEnvVar?: boolean;
      readonly networkAccess?: boolean;
      readonly type: "workspaceWrite";
      readonly writableRoots?: ReadonlyArray<V2ThreadResumeResponse__AbsolutePathBuf>;
    };
export const V2ThreadResumeResponse__SandboxPolicy = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("dangerFullAccess").annotate({
        title: "DangerFullAccessSandboxPolicyType",
      }),
    }).annotate({ title: "DangerFullAccessSandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("readOnly").annotate({ title: "ReadOnlySandboxPolicyType" }),
    }).annotate({ title: "ReadOnlySandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<V2ThreadResumeResponse__NetworkAccess> =>
            V2ThreadResumeResponse__NetworkAccess,
        ).annotate({ default: "restricted" }),
      ),
      type: Schema.Literal("externalSandbox").annotate({
        title: "ExternalSandboxSandboxPolicyType",
      }),
    }).annotate({ title: "ExternalSandboxSandboxPolicy" }),
    Schema.Struct({
      excludeSlashTmp: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      excludeTmpdirEnvVar: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("workspaceWrite").annotate({ title: "WorkspaceWriteSandboxPolicyType" }),
      writableRoots: Schema.optionalKey(
        Schema.Array(V2ThreadResumeResponse__AbsolutePathBuf).annotate({ default: [] }),
      ),
    }).annotate({ title: "WorkspaceWriteSandboxPolicy" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeResponse__SandboxPolicy" });

export type V2ThreadResumeResponse__ThreadSection = {
  readonly appearance?: V2ThreadResumeResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadResumeResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadResumeResponse__ThreadSection",
});

export type V2ThreadResumeResponse__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadResumeResponse__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadResumeResponse__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadResumeResponse__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadResumeResponse__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadResumeResponse__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeResponse__SubAgentSource" });

export type V2ThreadResumeResponse__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadResumeResponse__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadResumeResponse__ThreadStatus = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("notLoaded").annotate({ title: "NotLoadedThreadStatusType" }),
    }).annotate({ title: "NotLoadedThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("idle").annotate({ title: "IdleThreadStatusType" }),
    }).annotate({ title: "IdleThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("systemError").annotate({ title: "SystemErrorThreadStatusType" }),
    }).annotate({ title: "SystemErrorThreadStatus" }),
    Schema.Struct({
      activeFlags: Schema.Array(V2ThreadResumeResponse__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeResponse__ThreadStatus" });

export type V2ThreadResumeResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadResumeResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadResumeResponse__CodexErrorInfo = Schema.Union(
  [
    Schema.String,
    Schema.Struct({
      httpConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({ title: "HttpConnectionFailedCodexErrorInfo" }),
    Schema.Struct({
      responseStreamConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamConnectionFailedCodexErrorInfo",
      description: "Failed to connect to the response SSE stream.",
    }),
    Schema.Struct({
      responseStreamDisconnected: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamDisconnectedCodexErrorInfo",
      description:
        "The response SSE stream disconnected in the middle of a turn before completion.",
    }),
    Schema.Struct({
      responseTooManyFailedAttempts: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseTooManyFailedAttemptsCodexErrorInfo",
      description: "Reached the retry limit for responses.",
    }),
    Schema.Struct({
      activeTurnNotSteerable: Schema.Struct({
        turnKind: V2ThreadResumeResponse__NonSteerableTurnKind,
      }),
    }).annotate({
      title: "ActiveTurnNotSteerableCodexErrorInfo",
      description:
        "Returned when `turn/start` or `turn/steer` is submitted while the current active turn cannot accept same-turn steering, for example `/review` or manual `/compact`.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "This translation layer make sure that we expose codex error code in camel case.\n\nWhen an upstream HTTP status is available (for example, from the Responses API or a provider), it is forwarded in `httpStatusCode` on the relevant `codexErrorInfo` variant.",
  identifier: "V2ThreadResumeResponse__CodexErrorInfo",
});

export type V2ThreadResumeResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadResumeResponse__MisalignmentSteer | null;
};
export const V2ThreadResumeResponse__MisalignmentErrorDetails = Schema.Struct({
  detailedExplanation: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "A substantive localized explanation is required before offering continuation.",
      }),
      Schema.Null,
    ]),
  ),
  errorType: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Open-ended classification; clients must accept categories added by Responses.",
      }),
      Schema.Null,
    ]),
  ),
  steer: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadResumeResponse__MisalignmentErrorDetails" });

export type V2ThreadResumeResponse__TextElement = {
  readonly byteRange: V2ThreadResumeResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadResumeResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadResumeResponse__ByteRange> => V2ThreadResumeResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadResumeResponse__TextElement" });

export type V2ThreadResumeResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadResumeResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadResumeResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadResumeResponse__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadResumeResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadResumeResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdFunctionCallOutputContentItem" }),
    ]).annotate({ title: "InputImageFunctionCallOutputContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({
        title: "InputAudioFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioFunctionCallOutputContentItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "EncryptedContentFunctionCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Responses API compatible content items that can be returned by a tool call. This is a subset of ContentItem with the types we support as function call outputs.",
  identifier: "V2ThreadResumeResponse__FunctionCallOutputContentItem",
});

export type V2ThreadResumeResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadResumeResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadResumeResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadResumeResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadResumeResponse__MemoryCitation" });

export type V2ThreadResumeResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadResumeResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadResumeResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadResumeResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadResumeResponse__FileUpdateChange" });

export type V2ThreadResumeResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadResumeResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadResumeResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadResumeResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadResumeResponse__McpAppUi",
});

export type V2ThreadResumeResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadResumeResponse__CollabAgentStatus;
};
export const V2ThreadResumeResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadResumeResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadResumeResponse__CollabAgentState" });

export type V2ThreadRevertResponse__ThreadSection = {
  readonly appearance?: V2ThreadRevertResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadRevertResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadRevertResponse__ThreadSection",
});

export type V2ThreadRevertResponse__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadRevertResponse__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadRevertResponse__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadRevertResponse__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadRevertResponse__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadRevertResponse__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadRevertResponse__SubAgentSource" });

export type V2ThreadRevertResponse__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadRevertResponse__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadRevertResponse__ThreadStatus = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("notLoaded").annotate({ title: "NotLoadedThreadStatusType" }),
    }).annotate({ title: "NotLoadedThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("idle").annotate({ title: "IdleThreadStatusType" }),
    }).annotate({ title: "IdleThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("systemError").annotate({ title: "SystemErrorThreadStatusType" }),
    }).annotate({ title: "SystemErrorThreadStatus" }),
    Schema.Struct({
      activeFlags: Schema.Array(V2ThreadRevertResponse__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadRevertResponse__ThreadStatus" });

export type V2ThreadRevertResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadRevertResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadRevertResponse__CodexErrorInfo = Schema.Union(
  [
    Schema.String,
    Schema.Struct({
      httpConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({ title: "HttpConnectionFailedCodexErrorInfo" }),
    Schema.Struct({
      responseStreamConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamConnectionFailedCodexErrorInfo",
      description: "Failed to connect to the response SSE stream.",
    }),
    Schema.Struct({
      responseStreamDisconnected: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamDisconnectedCodexErrorInfo",
      description:
        "The response SSE stream disconnected in the middle of a turn before completion.",
    }),
    Schema.Struct({
      responseTooManyFailedAttempts: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseTooManyFailedAttemptsCodexErrorInfo",
      description: "Reached the retry limit for responses.",
    }),
    Schema.Struct({
      activeTurnNotSteerable: Schema.Struct({
        turnKind: V2ThreadRevertResponse__NonSteerableTurnKind,
      }),
    }).annotate({
      title: "ActiveTurnNotSteerableCodexErrorInfo",
      description:
        "Returned when `turn/start` or `turn/steer` is submitted while the current active turn cannot accept same-turn steering, for example `/review` or manual `/compact`.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "This translation layer make sure that we expose codex error code in camel case.\n\nWhen an upstream HTTP status is available (for example, from the Responses API or a provider), it is forwarded in `httpStatusCode` on the relevant `codexErrorInfo` variant.",
  identifier: "V2ThreadRevertResponse__CodexErrorInfo",
});

export type V2ThreadRevertResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadRevertResponse__MisalignmentSteer | null;
};
export const V2ThreadRevertResponse__MisalignmentErrorDetails = Schema.Struct({
  detailedExplanation: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "A substantive localized explanation is required before offering continuation.",
      }),
      Schema.Null,
    ]),
  ),
  errorType: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Open-ended classification; clients must accept categories added by Responses.",
      }),
      Schema.Null,
    ]),
  ),
  steer: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadRevertResponse__MisalignmentErrorDetails" });

export type V2ThreadRevertResponse__TextElement = {
  readonly byteRange: V2ThreadRevertResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadRevertResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadRevertResponse__ByteRange> => V2ThreadRevertResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadRevertResponse__TextElement" });

export type V2ThreadRevertResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadRevertResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadRevertResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadRevertResponse__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadRevertResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadRevertResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdFunctionCallOutputContentItem" }),
    ]).annotate({ title: "InputImageFunctionCallOutputContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({
        title: "InputAudioFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioFunctionCallOutputContentItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "EncryptedContentFunctionCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Responses API compatible content items that can be returned by a tool call. This is a subset of ContentItem with the types we support as function call outputs.",
  identifier: "V2ThreadRevertResponse__FunctionCallOutputContentItem",
});

export type V2ThreadRevertResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadRevertResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadRevertResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadRevertResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadRevertResponse__MemoryCitation" });

export type V2ThreadRevertResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadRevertResponse__LegacyAppPathString;
      readonly type: "read";
    }
  | { readonly command: string; readonly path?: string | null; readonly type: "listFiles" }
  | {
      readonly command: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly command: string; readonly type: "unknown" };
export const V2ThreadRevertResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadRevertResponse__LegacyAppPathString,
      type: Schema.Literal("read").annotate({ title: "ReadCommandActionType" }),
    }).annotate({ title: "ReadCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("listFiles").annotate({ title: "ListFilesCommandActionType" }),
    }).annotate({ title: "ListFilesCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchCommandActionType" }),
    }).annotate({ title: "SearchCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownCommandActionType" }),
    }).annotate({ title: "UnknownCommandAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadRevertResponse__CommandAction" });

export type V2ThreadRevertResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadRevertResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadRevertResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadRevertResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadRevertResponse__FileUpdateChange" });

export type V2ThreadRevertResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadRevertResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadRevertResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadRevertResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadRevertResponse__McpAppUi",
});

export type V2ThreadRevertResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadRevertResponse__CollabAgentStatus;
};
export const V2ThreadRevertResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadRevertResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadRevertResponse__CollabAgentState" });

export type V2ThreadSectionCreateResponse__ThreadSection = {
  readonly appearance?: V2ThreadSectionCreateResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadSectionCreateResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadSectionCreateResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadSectionCreateResponse__ThreadSection",
});

export type V2ThreadSectionListResponse__ThreadSection = {
  readonly appearance?: V2ThreadSectionListResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadSectionListResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadSectionListResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadSectionListResponse__ThreadSection",
});

export type V2ThreadSectionUpdateResponse__ThreadSection = {
  readonly appearance?: V2ThreadSectionUpdateResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadSectionUpdateResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadSectionUpdateResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadSectionUpdateResponse__ThreadSection",
});

export type V2ThreadSettingsUpdatedNotification__Settings = {
  readonly developer_instructions?: string | null;
  readonly model: string;
  readonly reasoning_effort?: V2ThreadSettingsUpdatedNotification__ReasoningEffort | null;
};
export const V2ThreadSettingsUpdatedNotification__Settings = Schema.Struct({
  developer_instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  model: Schema.String,
  reasoning_effort: Schema.optionalKey(
    Schema.Union([V2ThreadSettingsUpdatedNotification__ReasoningEffort, Schema.Null]),
  ),
}).annotate({
  description: "Settings for a collaboration mode.",
  identifier: "V2ThreadSettingsUpdatedNotification__Settings",
});

export type V2ThreadSettingsUpdatedNotification__SandboxPolicy =
  | { readonly type: "dangerFullAccess" }
  | { readonly networkAccess?: boolean; readonly type: "readOnly" }
  | {
      readonly networkAccess?: V2ThreadSettingsUpdatedNotification__NetworkAccess;
      readonly type: "externalSandbox";
    }
  | {
      readonly excludeSlashTmp?: boolean;
      readonly excludeTmpdirEnvVar?: boolean;
      readonly networkAccess?: boolean;
      readonly type: "workspaceWrite";
      readonly writableRoots?: ReadonlyArray<V2ThreadSettingsUpdatedNotification__AbsolutePathBuf>;
    };
export const V2ThreadSettingsUpdatedNotification__SandboxPolicy = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("dangerFullAccess").annotate({
        title: "DangerFullAccessSandboxPolicyType",
      }),
    }).annotate({ title: "DangerFullAccessSandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("readOnly").annotate({ title: "ReadOnlySandboxPolicyType" }),
    }).annotate({ title: "ReadOnlySandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<V2ThreadSettingsUpdatedNotification__NetworkAccess> =>
            V2ThreadSettingsUpdatedNotification__NetworkAccess,
        ).annotate({ default: "restricted" }),
      ),
      type: Schema.Literal("externalSandbox").annotate({
        title: "ExternalSandboxSandboxPolicyType",
      }),
    }).annotate({ title: "ExternalSandboxSandboxPolicy" }),
    Schema.Struct({
      excludeSlashTmp: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      excludeTmpdirEnvVar: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("workspaceWrite").annotate({ title: "WorkspaceWriteSandboxPolicyType" }),
      writableRoots: Schema.optionalKey(
        Schema.Array(V2ThreadSettingsUpdatedNotification__AbsolutePathBuf).annotate({
          default: [],
        }),
      ),
    }).annotate({ title: "WorkspaceWriteSandboxPolicy" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadSettingsUpdatedNotification__SandboxPolicy" });

export type V2ThreadStartedNotification__ThreadSection = {
  readonly appearance?: V2ThreadStartedNotification__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadStartedNotification__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadStartedNotification__ThreadSection",
});

export type V2ThreadStartedNotification__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadStartedNotification__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadStartedNotification__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadStartedNotification__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadStartedNotification__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadStartedNotification__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartedNotification__SubAgentSource" });

export type V2ThreadStartedNotification__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadStartedNotification__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadStartedNotification__ThreadStatus = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("notLoaded").annotate({ title: "NotLoadedThreadStatusType" }),
    }).annotate({ title: "NotLoadedThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("idle").annotate({ title: "IdleThreadStatusType" }),
    }).annotate({ title: "IdleThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("systemError").annotate({ title: "SystemErrorThreadStatusType" }),
    }).annotate({ title: "SystemErrorThreadStatus" }),
    Schema.Struct({
      activeFlags: Schema.Array(V2ThreadStartedNotification__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartedNotification__ThreadStatus" });

export type V2ThreadStartedNotification__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadStartedNotification__NonSteerableTurnKind;
      };
    };
export const V2ThreadStartedNotification__CodexErrorInfo = Schema.Union(
  [
    Schema.String,
    Schema.Struct({
      httpConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({ title: "HttpConnectionFailedCodexErrorInfo" }),
    Schema.Struct({
      responseStreamConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamConnectionFailedCodexErrorInfo",
      description: "Failed to connect to the response SSE stream.",
    }),
    Schema.Struct({
      responseStreamDisconnected: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamDisconnectedCodexErrorInfo",
      description:
        "The response SSE stream disconnected in the middle of a turn before completion.",
    }),
    Schema.Struct({
      responseTooManyFailedAttempts: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseTooManyFailedAttemptsCodexErrorInfo",
      description: "Reached the retry limit for responses.",
    }),
    Schema.Struct({
      activeTurnNotSteerable: Schema.Struct({
        turnKind: V2ThreadStartedNotification__NonSteerableTurnKind,
      }),
    }).annotate({
      title: "ActiveTurnNotSteerableCodexErrorInfo",
      description:
        "Returned when `turn/start` or `turn/steer` is submitted while the current active turn cannot accept same-turn steering, for example `/review` or manual `/compact`.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "This translation layer make sure that we expose codex error code in camel case.\n\nWhen an upstream HTTP status is available (for example, from the Responses API or a provider), it is forwarded in `httpStatusCode` on the relevant `codexErrorInfo` variant.",
  identifier: "V2ThreadStartedNotification__CodexErrorInfo",
});

export type V2ThreadStartedNotification__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadStartedNotification__MisalignmentSteer | null;
};
export const V2ThreadStartedNotification__MisalignmentErrorDetails = Schema.Struct({
  detailedExplanation: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "A substantive localized explanation is required before offering continuation.",
      }),
      Schema.Null,
    ]),
  ),
  errorType: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Open-ended classification; clients must accept categories added by Responses.",
      }),
      Schema.Null,
    ]),
  ),
  steer: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadStartedNotification__MisalignmentErrorDetails" });

export type V2ThreadStartedNotification__TextElement = {
  readonly byteRange: V2ThreadStartedNotification__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadStartedNotification__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadStartedNotification__ByteRange> =>
      V2ThreadStartedNotification__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadStartedNotification__TextElement" });

export type V2ThreadStartedNotification__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadStartedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadStartedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadStartedNotification__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdFunctionCallOutputContentItem" }),
    ]).annotate({ title: "InputImageFunctionCallOutputContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({
        title: "InputAudioFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioFunctionCallOutputContentItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "EncryptedContentFunctionCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Responses API compatible content items that can be returned by a tool call. This is a subset of ContentItem with the types we support as function call outputs.",
  identifier: "V2ThreadStartedNotification__FunctionCallOutputContentItem",
});

export type V2ThreadStartedNotification__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadStartedNotification__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadStartedNotification__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadStartedNotification__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadStartedNotification__MemoryCitation" });

export type V2ThreadStartedNotification__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadStartedNotification__LegacyAppPathString;
      readonly type: "read";
    }
  | { readonly command: string; readonly path?: string | null; readonly type: "listFiles" }
  | {
      readonly command: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly command: string; readonly type: "unknown" };
export const V2ThreadStartedNotification__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadStartedNotification__LegacyAppPathString,
      type: Schema.Literal("read").annotate({ title: "ReadCommandActionType" }),
    }).annotate({ title: "ReadCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("listFiles").annotate({ title: "ListFilesCommandActionType" }),
    }).annotate({ title: "ListFilesCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchCommandActionType" }),
    }).annotate({ title: "SearchCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownCommandActionType" }),
    }).annotate({ title: "UnknownCommandAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartedNotification__CommandAction" });

export type V2ThreadStartedNotification__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadStartedNotification__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadStartedNotification__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadStartedNotification__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadStartedNotification__FileUpdateChange" });

export type V2ThreadStartedNotification__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadStartedNotification__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadStartedNotification__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadStartedNotification__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadStartedNotification__McpAppUi",
});

export type V2ThreadStartedNotification__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadStartedNotification__CollabAgentStatus;
};
export const V2ThreadStartedNotification__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadStartedNotification__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadStartedNotification__CollabAgentState" });

export type V2ThreadStartResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadStartResponse__LegacyAppPathString;
      readonly type: "read";
    }
  | { readonly command: string; readonly path?: string | null; readonly type: "listFiles" }
  | {
      readonly command: string;
      readonly path?: string | null;
      readonly query?: string | null;
      readonly type: "search";
    }
  | { readonly command: string; readonly type: "unknown" };
export const V2ThreadStartResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadStartResponse__LegacyAppPathString,
      type: Schema.Literal("read").annotate({ title: "ReadCommandActionType" }),
    }).annotate({ title: "ReadCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("listFiles").annotate({ title: "ListFilesCommandActionType" }),
    }).annotate({ title: "ListFilesCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      query: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("search").annotate({ title: "SearchCommandActionType" }),
    }).annotate({ title: "SearchCommandAction" }),
    Schema.Struct({
      command: Schema.String,
      type: Schema.Literal("unknown").annotate({ title: "UnknownCommandActionType" }),
    }).annotate({ title: "UnknownCommandAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartResponse__CommandAction" });

export type V2ThreadStartResponse__SandboxPolicy =
  | { readonly type: "dangerFullAccess" }
  | { readonly networkAccess?: boolean; readonly type: "readOnly" }
  | {
      readonly networkAccess?: V2ThreadStartResponse__NetworkAccess;
      readonly type: "externalSandbox";
    }
  | {
      readonly excludeSlashTmp?: boolean;
      readonly excludeTmpdirEnvVar?: boolean;
      readonly networkAccess?: boolean;
      readonly type: "workspaceWrite";
      readonly writableRoots?: ReadonlyArray<V2ThreadStartResponse__AbsolutePathBuf>;
    };
export const V2ThreadStartResponse__SandboxPolicy = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("dangerFullAccess").annotate({
        title: "DangerFullAccessSandboxPolicyType",
      }),
    }).annotate({ title: "DangerFullAccessSandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("readOnly").annotate({ title: "ReadOnlySandboxPolicyType" }),
    }).annotate({ title: "ReadOnlySandboxPolicy" }),
    Schema.Struct({
      networkAccess: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<V2ThreadStartResponse__NetworkAccess> =>
            V2ThreadStartResponse__NetworkAccess,
        ).annotate({ default: "restricted" }),
      ),
      type: Schema.Literal("externalSandbox").annotate({
        title: "ExternalSandboxSandboxPolicyType",
      }),
    }).annotate({ title: "ExternalSandboxSandboxPolicy" }),
    Schema.Struct({
      excludeSlashTmp: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      excludeTmpdirEnvVar: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      networkAccess: Schema.optionalKey(Schema.Boolean.annotate({ default: false })),
      type: Schema.Literal("workspaceWrite").annotate({ title: "WorkspaceWriteSandboxPolicyType" }),
      writableRoots: Schema.optionalKey(
        Schema.Array(V2ThreadStartResponse__AbsolutePathBuf).annotate({ default: [] }),
      ),
    }).annotate({ title: "WorkspaceWriteSandboxPolicy" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartResponse__SandboxPolicy" });

export type V2ThreadStartResponse__ThreadSection = {
  readonly appearance?: V2ThreadStartResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadStartResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadStartResponse__ThreadSection",
});

export type V2ThreadStartResponse__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadStartResponse__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadStartResponse__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadStartResponse__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadStartResponse__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadStartResponse__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartResponse__SubAgentSource" });

export type V2ThreadStartResponse__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadStartResponse__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadStartResponse__ThreadStatus = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("notLoaded").annotate({ title: "NotLoadedThreadStatusType" }),
    }).annotate({ title: "NotLoadedThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("idle").annotate({ title: "IdleThreadStatusType" }),
    }).annotate({ title: "IdleThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("systemError").annotate({ title: "SystemErrorThreadStatusType" }),
    }).annotate({ title: "SystemErrorThreadStatus" }),
    Schema.Struct({
      activeFlags: Schema.Array(V2ThreadStartResponse__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartResponse__ThreadStatus" });

export type V2ThreadStartResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadStartResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadStartResponse__CodexErrorInfo = Schema.Union(
  [
    Schema.String,
    Schema.Struct({
      httpConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({ title: "HttpConnectionFailedCodexErrorInfo" }),
    Schema.Struct({
      responseStreamConnectionFailed: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamConnectionFailedCodexErrorInfo",
      description: "Failed to connect to the response SSE stream.",
    }),
    Schema.Struct({
      responseStreamDisconnected: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseStreamDisconnectedCodexErrorInfo",
      description:
        "The response SSE stream disconnected in the middle of a turn before completion.",
    }),
    Schema.Struct({
      responseTooManyFailedAttempts: Schema.Struct({
        httpStatusCode: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({ format: "uint16" })
              .check(Schema.isInt().annotate({ expected: "an integer" }))
              .check(
                Schema.isGreaterThanOrEqualTo(0).annotate({
                  expected: "a value greater than or equal to 0",
                }),
              ),
            Schema.Null,
          ]),
        ),
      }),
    }).annotate({
      title: "ResponseTooManyFailedAttemptsCodexErrorInfo",
      description: "Reached the retry limit for responses.",
    }),
    Schema.Struct({
      activeTurnNotSteerable: Schema.Struct({
        turnKind: V2ThreadStartResponse__NonSteerableTurnKind,
      }),
    }).annotate({
      title: "ActiveTurnNotSteerableCodexErrorInfo",
      description:
        "Returned when `turn/start` or `turn/steer` is submitted while the current active turn cannot accept same-turn steering, for example `/review` or manual `/compact`.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "This translation layer make sure that we expose codex error code in camel case.\n\nWhen an upstream HTTP status is available (for example, from the Responses API or a provider), it is forwarded in `httpStatusCode` on the relevant `codexErrorInfo` variant.",
  identifier: "V2ThreadStartResponse__CodexErrorInfo",
});

export type V2ThreadStartResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadStartResponse__MisalignmentSteer | null;
};
export const V2ThreadStartResponse__MisalignmentErrorDetails = Schema.Struct({
  detailedExplanation: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "A substantive localized explanation is required before offering continuation.",
      }),
      Schema.Null,
    ]),
  ),
  errorType: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Open-ended classification; clients must accept categories added by Responses.",
      }),
      Schema.Null,
    ]),
  ),
  steer: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadStartResponse__MisalignmentErrorDetails" });

export type V2ThreadStartResponse__TextElement = {
  readonly byteRange: V2ThreadStartResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadStartResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadStartResponse__ByteRange> => V2ThreadStartResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadStartResponse__TextElement" });

export type V2ThreadStartResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadStartResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadStartResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadStartResponse__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdFunctionCallOutputContentItem" }),
    ]).annotate({ title: "InputImageFunctionCallOutputContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({
        title: "InputAudioFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputAudioFunctionCallOutputContentItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      type: Schema.Literal("encrypted_content").annotate({
        title: "EncryptedContentFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "EncryptedContentFunctionCallOutputContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Responses API compatible content items that can be returned by a tool call. This is a subset of ContentItem with the types we support as function call outputs.",
  identifier: "V2ThreadStartResponse__FunctionCallOutputContentItem",
});

export type V2ThreadStartResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadStartResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadStartResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadStartResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadStartResponse__MemoryCitation" });

export type V2ThreadStartResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadStartResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadStartResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadStartResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadStartResponse__FileUpdateChange" });

export type V2ThreadStartResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadStartResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadStartResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadStartResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadStartResponse__McpAppUi",
});

export type V2ThreadStartResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadStartResponse__CollabAgentStatus;
};
export const V2ThreadStartResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadStartResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadStartResponse__CollabAgentState" });

export type V2ThreadStatusChangedNotification__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadStatusChangedNotification__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadStatusChangedNotification__ThreadStatus = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("notLoaded").annotate({ title: "NotLoadedThreadStatusType" }),
    }).annotate({ title: "NotLoadedThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("idle").annotate({ title: "IdleThreadStatusType" }),
    }).annotate({ title: "IdleThreadStatus" }),
    Schema.Struct({
      type: Schema.Literal("systemError").annotate({ title: "SystemErrorThreadStatusType" }),
    }).annotate({ title: "SystemErrorThreadStatus" }),
    Schema.Struct({
      activeFlags: Schema.Array(V2ThreadStatusChangedNotification__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStatusChangedNotification__ThreadStatus" });

export type V2ThreadTokenUsageUpdatedNotification__ThreadTokenUsage = {
  readonly last: V2ThreadTokenUsageUpdatedNotification__TokenUsageBreakdown;
  readonly modelContextWindow?: number | null;
  readonly total: V2ThreadTokenUsageUpdatedNotification__TokenUsageBreakdown;
};
export const V2ThreadTokenUsageUpdatedNotification__ThreadTokenUsage = Schema.Struct({
  last: V2ThreadTokenUsageUpdatedNotification__TokenUsageBreakdown,
  modelContextWindow: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  total: V2ThreadTokenUsageUpdatedNotification__TokenUsageBreakdown,
}).annotate({ identifier: "V2ThreadTokenUsageUpdatedNotification__ThreadTokenUsage" });
