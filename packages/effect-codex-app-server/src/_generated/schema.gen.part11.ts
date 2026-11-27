import * as Schema from "effect/Schema";
import {
  ClientRequest__AbsolutePathBuf,
  ClientRequest__CommandExecTerminalSize,
  ClientRequest__ExternalAgentConfigMigrationItemType,
  ClientRequest__ImageDetail,
  ClientRequest__PluginShareDiscoverability,
  ClientRequest__PluginShareUpdateDiscoverability,
  ClientRequest__SortDirection,
  CommandExecutionRequestApprovalParams__LegacyAppPathString,
  McpServerElicitationRequestParams__McpElicitationArrayType,
  PermissionsRequestApprovalParams__LegacyAppPathString,
} from "./schema.gen.part0.ts";
import {
  V2ThreadTurnsListResponse__ByteRange,
  V2ThreadTurnsListResponse__CollabAgentStatus,
  V2ThreadTurnsListResponse__ImageDetail,
  V2ThreadTurnsListResponse__LegacyAppPathString,
  V2ThreadTurnsListResponse__McpAppDisplayMode,
  V2ThreadTurnsListResponse__MemoryCitationEntry,
  V2ThreadTurnsListResponse__MisalignmentSteer,
  V2ThreadTurnsListResponse__NonSteerableTurnKind,
  V2ThreadTurnsListResponse__PatchChangeKind,
  V2ThreadUnarchiveResponse__AgentPath,
  V2ThreadUnarchiveResponse__ByteRange,
  V2ThreadUnarchiveResponse__CollabAgentStatus,
  V2ThreadUnarchiveResponse__ImageDetail,
  V2ThreadUnarchiveResponse__LegacyAppPathString,
  V2ThreadUnarchiveResponse__McpAppDisplayMode,
  V2ThreadUnarchiveResponse__MemoryCitationEntry,
  V2ThreadUnarchiveResponse__MisalignmentSteer,
  V2ThreadUnarchiveResponse__NonSteerableTurnKind,
  V2ThreadUnarchiveResponse__PatchChangeKind,
  V2ThreadUnarchiveResponse__ThreadActiveFlag,
  V2ThreadUnarchiveResponse__ThreadId,
  V2ThreadUnarchiveResponse__ThreadSectionAppearance,
  V2TurnCompletedNotification__ByteRange,
  V2TurnCompletedNotification__ImageDetail,
  V2TurnCompletedNotification__LegacyAppPathString,
  V2TurnCompletedNotification__MemoryCitationEntry,
  V2TurnCompletedNotification__MisalignmentSteer,
  V2TurnCompletedNotification__NonSteerableTurnKind,
  V2TurnCompletedNotification__PatchChangeKind,
} from "./schema.gen.part5.ts";
import {
  ApplyPatchApprovalResponse__NetworkPolicyAmendment,
  ClientRequest__FunctionCallOutputContentItem,
  ClientRequest__PluginShareTarget,
  ClientRequest__SandboxPolicy,
  ClientRequest__TextElement,
  ClientRequest__ThreadItemsListCursor,
  V2TurnCompletedNotification__CollabAgentStatus,
  V2TurnCompletedNotification__McpAppDisplayMode,
  V2TurnPlanUpdatedNotification__TurnPlanStepStatus,
  V2TurnStartParams__AbsolutePathBuf,
  V2TurnStartParams__ByteRange,
  V2TurnStartParams__ImageDetail,
  V2TurnStartParams__NetworkAccess,
  V2TurnStartParams__ReasoningEffort,
  V2TurnStartResponse__ByteRange,
  V2TurnStartResponse__CollabAgentStatus,
  V2TurnStartResponse__ImageDetail,
  V2TurnStartResponse__LegacyAppPathString,
  V2TurnStartResponse__McpAppDisplayMode,
  V2TurnStartResponse__MemoryCitationEntry,
  V2TurnStartResponse__MisalignmentSteer,
  V2TurnStartResponse__NonSteerableTurnKind,
  V2TurnStartResponse__PatchChangeKind,
  V2TurnStartedNotification__ByteRange,
  V2TurnStartedNotification__CollabAgentStatus,
  V2TurnStartedNotification__ImageDetail,
  V2TurnStartedNotification__LegacyAppPathString,
  V2TurnStartedNotification__McpAppDisplayMode,
  V2TurnStartedNotification__MemoryCitationEntry,
  V2TurnStartedNotification__MisalignmentSteer,
  V2TurnStartedNotification__NonSteerableTurnKind,
  V2TurnStartedNotification__PatchChangeKind,
  V2TurnSteerParams__ByteRange,
} from "./schema.gen.part6.ts";
import {
  ClientRequest__ConfigEdit,
  ClientRequest__ExternalAgentConfigImportHistoryRecordSuccessParams,
  ClientRequest__ExternalAgentConfigImportItemTypeFailure,
  ClientRequest__MigrationDetails,
  CommandExecutionRequestApprovalParams__FileSystemSpecialPath,
  CommandExecutionRequestApprovalResponse__NetworkPolicyAmendment,
  ExecCommandApprovalResponse__NetworkPolicyAmendment,
  McpServerElicitationRequestParams__McpElicitationTitledEnumItems,
  McpServerElicitationRequestParams__McpElicitationTitledSingleSelectEnumSchema,
  McpServerElicitationRequestParams__McpElicitationUntitledEnumItems,
  McpServerElicitationRequestParams__McpElicitationUntitledSingleSelectEnumSchema,
  PermissionsRequestApprovalParams__FileSystemSpecialPath,
} from "./schema.gen.part7.ts";

export type V2ThreadTurnsListResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadTurnsListResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadTurnsListResponse__CodexErrorInfo = Schema.Union(
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
        turnKind: V2ThreadTurnsListResponse__NonSteerableTurnKind,
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
  identifier: "V2ThreadTurnsListResponse__CodexErrorInfo",
});

export type V2ThreadTurnsListResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadTurnsListResponse__MisalignmentSteer | null;
};
export const V2ThreadTurnsListResponse__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2ThreadTurnsListResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadTurnsListResponse__MisalignmentErrorDetails" });

export type V2ThreadTurnsListResponse__TextElement = {
  readonly byteRange: V2ThreadTurnsListResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadTurnsListResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadTurnsListResponse__ByteRange> => V2ThreadTurnsListResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadTurnsListResponse__TextElement" });

export type V2ThreadTurnsListResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadTurnsListResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadTurnsListResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadTurnsListResponse__FunctionCallOutputContentItem = Schema.Union(
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
          Schema.Union([V2ThreadTurnsListResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadTurnsListResponse__ImageDetail, Schema.Null]),
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
  identifier: "V2ThreadTurnsListResponse__FunctionCallOutputContentItem",
});

export type V2ThreadTurnsListResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadTurnsListResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadTurnsListResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadTurnsListResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadTurnsListResponse__MemoryCitation" });

export type V2ThreadTurnsListResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadTurnsListResponse__LegacyAppPathString;
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
export const V2ThreadTurnsListResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadTurnsListResponse__LegacyAppPathString,
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
).annotate({ identifier: "V2ThreadTurnsListResponse__CommandAction" });

export type V2ThreadTurnsListResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadTurnsListResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadTurnsListResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadTurnsListResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadTurnsListResponse__FileUpdateChange" });

export type V2ThreadTurnsListResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadTurnsListResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadTurnsListResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadTurnsListResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadTurnsListResponse__McpAppUi",
});

export type V2ThreadTurnsListResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadTurnsListResponse__CollabAgentStatus;
};
export const V2ThreadTurnsListResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadTurnsListResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadTurnsListResponse__CollabAgentState" });

export type V2ThreadUnarchiveResponse__ThreadSection = {
  readonly appearance?: V2ThreadUnarchiveResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadUnarchiveResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadUnarchiveResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadUnarchiveResponse__ThreadSection",
});

export type V2ThreadUnarchiveResponse__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadUnarchiveResponse__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadUnarchiveResponse__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadUnarchiveResponse__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadUnarchiveResponse__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadUnarchiveResponse__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadUnarchiveResponse__SubAgentSource" });

export type V2ThreadUnarchiveResponse__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadUnarchiveResponse__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadUnarchiveResponse__ThreadStatus = Schema.Union(
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
      activeFlags: Schema.Array(V2ThreadUnarchiveResponse__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadUnarchiveResponse__ThreadStatus" });

export type V2ThreadUnarchiveResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadUnarchiveResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadUnarchiveResponse__CodexErrorInfo = Schema.Union(
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
        turnKind: V2ThreadUnarchiveResponse__NonSteerableTurnKind,
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
  identifier: "V2ThreadUnarchiveResponse__CodexErrorInfo",
});

export type V2ThreadUnarchiveResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadUnarchiveResponse__MisalignmentSteer | null;
};
export const V2ThreadUnarchiveResponse__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2ThreadUnarchiveResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadUnarchiveResponse__MisalignmentErrorDetails" });

export type V2ThreadUnarchiveResponse__TextElement = {
  readonly byteRange: V2ThreadUnarchiveResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadUnarchiveResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadUnarchiveResponse__ByteRange> => V2ThreadUnarchiveResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadUnarchiveResponse__TextElement" });

export type V2ThreadUnarchiveResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadUnarchiveResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadUnarchiveResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadUnarchiveResponse__FunctionCallOutputContentItem = Schema.Union(
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
          Schema.Union([V2ThreadUnarchiveResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadUnarchiveResponse__ImageDetail, Schema.Null]),
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
  identifier: "V2ThreadUnarchiveResponse__FunctionCallOutputContentItem",
});

export type V2ThreadUnarchiveResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadUnarchiveResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadUnarchiveResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadUnarchiveResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadUnarchiveResponse__MemoryCitation" });

export type V2ThreadUnarchiveResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadUnarchiveResponse__LegacyAppPathString;
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
export const V2ThreadUnarchiveResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadUnarchiveResponse__LegacyAppPathString,
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
).annotate({ identifier: "V2ThreadUnarchiveResponse__CommandAction" });

export type V2ThreadUnarchiveResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadUnarchiveResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadUnarchiveResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadUnarchiveResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadUnarchiveResponse__FileUpdateChange" });

export type V2ThreadUnarchiveResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadUnarchiveResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadUnarchiveResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadUnarchiveResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadUnarchiveResponse__McpAppUi",
});

export type V2ThreadUnarchiveResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadUnarchiveResponse__CollabAgentStatus;
};
export const V2ThreadUnarchiveResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadUnarchiveResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadUnarchiveResponse__CollabAgentState" });

export type V2TurnCompletedNotification__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2TurnCompletedNotification__NonSteerableTurnKind;
      };
    };
export const V2TurnCompletedNotification__CodexErrorInfo = Schema.Union(
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
        turnKind: V2TurnCompletedNotification__NonSteerableTurnKind,
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
  identifier: "V2TurnCompletedNotification__CodexErrorInfo",
});

export type V2TurnCompletedNotification__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2TurnCompletedNotification__MisalignmentSteer | null;
};
export const V2TurnCompletedNotification__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2TurnCompletedNotification__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2TurnCompletedNotification__MisalignmentErrorDetails" });

export type V2TurnCompletedNotification__TextElement = {
  readonly byteRange: V2TurnCompletedNotification__ByteRange;
  readonly placeholder?: string | null;
};
export const V2TurnCompletedNotification__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2TurnCompletedNotification__ByteRange> =>
      V2TurnCompletedNotification__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2TurnCompletedNotification__TextElement" });

export type V2TurnCompletedNotification__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2TurnCompletedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2TurnCompletedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2TurnCompletedNotification__FunctionCallOutputContentItem = Schema.Union(
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
          Schema.Union([V2TurnCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2TurnCompletedNotification__ImageDetail, Schema.Null]),
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
  identifier: "V2TurnCompletedNotification__FunctionCallOutputContentItem",
});

export type V2TurnCompletedNotification__MemoryCitation = {
  readonly entries: ReadonlyArray<V2TurnCompletedNotification__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2TurnCompletedNotification__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2TurnCompletedNotification__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2TurnCompletedNotification__MemoryCitation" });

export type V2TurnCompletedNotification__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2TurnCompletedNotification__LegacyAppPathString;
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
export const V2TurnCompletedNotification__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2TurnCompletedNotification__LegacyAppPathString,
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
).annotate({ identifier: "V2TurnCompletedNotification__CommandAction" });

export type V2TurnCompletedNotification__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2TurnCompletedNotification__PatchChangeKind;
  readonly path: string;
};
export const V2TurnCompletedNotification__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2TurnCompletedNotification__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2TurnCompletedNotification__FileUpdateChange" });

export type V2TurnCompletedNotification__McpAppUi = {
  readonly preferredModelDisplayMode: V2TurnCompletedNotification__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2TurnCompletedNotification__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2TurnCompletedNotification__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2TurnCompletedNotification__McpAppUi",
});

export type V2TurnCompletedNotification__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2TurnCompletedNotification__CollabAgentStatus;
};
export const V2TurnCompletedNotification__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2TurnCompletedNotification__CollabAgentStatus,
}).annotate({ identifier: "V2TurnCompletedNotification__CollabAgentState" });

export type V2TurnPlanUpdatedNotification__TurnPlanStep = {
  readonly status: V2TurnPlanUpdatedNotification__TurnPlanStepStatus;
  readonly step: string;
};
export const V2TurnPlanUpdatedNotification__TurnPlanStep = Schema.Struct({
  status: V2TurnPlanUpdatedNotification__TurnPlanStepStatus,
  step: Schema.String,
}).annotate({ identifier: "V2TurnPlanUpdatedNotification__TurnPlanStep" });

export type V2TurnStartedNotification__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2TurnStartedNotification__NonSteerableTurnKind;
      };
    };
export const V2TurnStartedNotification__CodexErrorInfo = Schema.Union(
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
        turnKind: V2TurnStartedNotification__NonSteerableTurnKind,
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
  identifier: "V2TurnStartedNotification__CodexErrorInfo",
});

export type V2TurnStartedNotification__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2TurnStartedNotification__MisalignmentSteer | null;
};
export const V2TurnStartedNotification__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2TurnStartedNotification__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2TurnStartedNotification__MisalignmentErrorDetails" });

export type V2TurnStartedNotification__TextElement = {
  readonly byteRange: V2TurnStartedNotification__ByteRange;
  readonly placeholder?: string | null;
};
export const V2TurnStartedNotification__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2TurnStartedNotification__ByteRange> => V2TurnStartedNotification__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2TurnStartedNotification__TextElement" });

export type V2TurnStartedNotification__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2TurnStartedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2TurnStartedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2TurnStartedNotification__FunctionCallOutputContentItem = Schema.Union(
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
          Schema.Union([V2TurnStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2TurnStartedNotification__ImageDetail, Schema.Null]),
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
  identifier: "V2TurnStartedNotification__FunctionCallOutputContentItem",
});

export type V2TurnStartedNotification__MemoryCitation = {
  readonly entries: ReadonlyArray<V2TurnStartedNotification__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2TurnStartedNotification__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2TurnStartedNotification__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2TurnStartedNotification__MemoryCitation" });

export type V2TurnStartedNotification__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2TurnStartedNotification__LegacyAppPathString;
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
export const V2TurnStartedNotification__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2TurnStartedNotification__LegacyAppPathString,
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
).annotate({ identifier: "V2TurnStartedNotification__CommandAction" });

export type V2TurnStartedNotification__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2TurnStartedNotification__PatchChangeKind;
  readonly path: string;
};
export const V2TurnStartedNotification__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2TurnStartedNotification__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2TurnStartedNotification__FileUpdateChange" });

export type V2TurnStartedNotification__McpAppUi = {
  readonly preferredModelDisplayMode: V2TurnStartedNotification__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2TurnStartedNotification__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2TurnStartedNotification__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2TurnStartedNotification__McpAppUi",
});

export type V2TurnStartedNotification__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2TurnStartedNotification__CollabAgentStatus;
};
export const V2TurnStartedNotification__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2TurnStartedNotification__CollabAgentStatus,
}).annotate({ identifier: "V2TurnStartedNotification__CollabAgentState" });

export type V2TurnStartParams__Settings = {
  readonly developer_instructions?: string | null;
  readonly model: string;
  readonly reasoning_effort?: V2TurnStartParams__ReasoningEffort | null;
};
export const V2TurnStartParams__Settings = Schema.Struct({
  developer_instructions: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  model: Schema.String,
  reasoning_effort: Schema.optionalKey(
    Schema.Union([V2TurnStartParams__ReasoningEffort, Schema.Null]),
  ),
}).annotate({
  description: "Settings for a collaboration mode.",
  identifier: "V2TurnStartParams__Settings",
});

export type V2TurnStartParams__TextElement = {
  readonly byteRange: V2TurnStartParams__ByteRange;
  readonly placeholder?: string | null;
};
export const V2TurnStartParams__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2TurnStartParams__ByteRange> => V2TurnStartParams__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2TurnStartParams__TextElement" });

export type V2TurnStartParams__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2TurnStartParams__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2TurnStartParams__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2TurnStartParams__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnStartParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnStartParams__ImageDetail, Schema.Null])),
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
  identifier: "V2TurnStartParams__FunctionCallOutputContentItem",
});

export type V2TurnStartParams__SandboxPolicy =
  | { readonly type: "dangerFullAccess" }
  | { readonly networkAccess?: boolean; readonly type: "readOnly" }
  | { readonly networkAccess?: V2TurnStartParams__NetworkAccess; readonly type: "externalSandbox" }
  | {
      readonly excludeSlashTmp?: boolean;
      readonly excludeTmpdirEnvVar?: boolean;
      readonly networkAccess?: boolean;
      readonly type: "workspaceWrite";
      readonly writableRoots?: ReadonlyArray<V2TurnStartParams__AbsolutePathBuf>;
    };
export const V2TurnStartParams__SandboxPolicy = Schema.Union(
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
          (): Schema.Codec<V2TurnStartParams__NetworkAccess> => V2TurnStartParams__NetworkAccess,
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
        Schema.Array(V2TurnStartParams__AbsolutePathBuf).annotate({ default: [] }),
      ),
    }).annotate({ title: "WorkspaceWriteSandboxPolicy" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2TurnStartParams__SandboxPolicy" });

export type V2TurnStartResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2TurnStartResponse__NonSteerableTurnKind;
      };
    };
export const V2TurnStartResponse__CodexErrorInfo = Schema.Union(
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
        turnKind: V2TurnStartResponse__NonSteerableTurnKind,
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
  identifier: "V2TurnStartResponse__CodexErrorInfo",
});

export type V2TurnStartResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2TurnStartResponse__MisalignmentSteer | null;
};
export const V2TurnStartResponse__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2TurnStartResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2TurnStartResponse__MisalignmentErrorDetails" });

export type V2TurnStartResponse__TextElement = {
  readonly byteRange: V2TurnStartResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2TurnStartResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2TurnStartResponse__ByteRange> => V2TurnStartResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2TurnStartResponse__TextElement" });

export type V2TurnStartResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2TurnStartResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2TurnStartResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2TurnStartResponse__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnStartResponse__ImageDetail, Schema.Null])),
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
  identifier: "V2TurnStartResponse__FunctionCallOutputContentItem",
});

export type V2TurnStartResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2TurnStartResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2TurnStartResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2TurnStartResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2TurnStartResponse__MemoryCitation" });

export type V2TurnStartResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2TurnStartResponse__LegacyAppPathString;
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
export const V2TurnStartResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2TurnStartResponse__LegacyAppPathString,
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
).annotate({ identifier: "V2TurnStartResponse__CommandAction" });

export type V2TurnStartResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2TurnStartResponse__PatchChangeKind;
  readonly path: string;
};
export const V2TurnStartResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2TurnStartResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2TurnStartResponse__FileUpdateChange" });

export type V2TurnStartResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2TurnStartResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2TurnStartResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2TurnStartResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2TurnStartResponse__McpAppUi",
});

export type V2TurnStartResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2TurnStartResponse__CollabAgentStatus;
};
export const V2TurnStartResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2TurnStartResponse__CollabAgentStatus,
}).annotate({ identifier: "V2TurnStartResponse__CollabAgentState" });

export type V2TurnSteerParams__TextElement = {
  readonly byteRange: V2TurnSteerParams__ByteRange;
  readonly placeholder?: string | null;
};
export const V2TurnSteerParams__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2TurnSteerParams__ByteRange> => V2TurnSteerParams__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2TurnSteerParams__TextElement" });

export type ApplyPatchApprovalResponse__ReviewDecision =
  | "approved"
  | {
      readonly approved_execpolicy_amendment: {
        readonly proposed_execpolicy_amendment: ReadonlyArray<string>;
      };
    }
  | "approved_for_session"
  | "approved_mcp_policy_amendment"
  | {
      readonly network_policy_amendment: {
        readonly network_policy_amendment: ApplyPatchApprovalResponse__NetworkPolicyAmendment;
      };
    }
  | { readonly denied: { readonly rejection: string } }
  | "timed_out"
  | "abort";
export const ApplyPatchApprovalResponse__ReviewDecision = Schema.Union(
  [
    Schema.Literal("approved").annotate({
      description: "User has approved this command and the agent should execute it.",
    }),
    Schema.Struct({
      approved_execpolicy_amendment: Schema.Struct({
        proposed_execpolicy_amendment: Schema.Array(Schema.String),
      }),
    }).annotate({
      title: "ApprovedExecpolicyAmendmentReviewDecision",
      description:
        "User has approved this command and wants to apply the proposed execpolicy amendment so future matching commands are permitted.",
    }),
    Schema.Literal("approved_for_session").annotate({
      description:
        "User has approved this request and wants future prompts in the same session-scoped approval cache to be automatically approved for the remainder of the session.",
    }),
    Schema.Literal("approved_mcp_policy_amendment").annotate({
      description:
        "User has approved this MCP tool call and wants to amend its policy so matching future calls are automatically approved across sessions.",
    }),
    Schema.Struct({
      network_policy_amendment: Schema.Struct({
        network_policy_amendment: ApplyPatchApprovalResponse__NetworkPolicyAmendment,
      }),
    }).annotate({
      title: "NetworkPolicyAmendmentReviewDecision",
      description:
        "User chose to persist a network policy rule (allow/deny) for future requests to the same host.",
    }),
    Schema.Struct({ denied: Schema.Struct({ rejection: Schema.String }) }).annotate({
      title: "DeniedReviewDecision",
      description:
        "User has denied this command and the agent should not execute it, but it should continue the session and try something else.",
    }),
    Schema.Literal("timed_out").annotate({
      description: "Automatic approval review timed out before reaching a decision.",
    }),
    Schema.Literal("abort").annotate({
      description:
        "User has denied this command and the agent should not do anything until the user's next command.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "User's decision in response to an ExecApprovalRequest.",
  identifier: "ApplyPatchApprovalResponse__ReviewDecision",
});

export type ClientRequest__ThreadItemsListParams = {
  readonly cursor?: ClientRequest__ThreadItemsListCursor | null;
  readonly limit?: number | null;
  readonly sortDirection?: ClientRequest__SortDirection | null;
  readonly threadId: string;
  readonly turnId?: string | null;
};
export const ClientRequest__ThreadItemsListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([ClientRequest__ThreadItemsListCursor, Schema.Null]).annotate({
      description:
        "Opaque continuation cursor or an exclusive item anchor in the requested visible turn. An item anchor requires a non-empty `turnId`; ascending (the default) returns items after it, and descending returns items before it. Continue with the returned string cursor.",
    }),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ description: "Optional item page size.", format: "uint32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      Schema.Null,
    ]),
  ),
  sortDirection: Schema.optionalKey(
    Schema.Union([ClientRequest__SortDirection, Schema.Null]).annotate({
      description: "Optional item pagination direction; defaults to ascending.",
    }),
  ),
  threadId: Schema.String,
  turnId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional turn id to filter by. When omitted, returns items across the thread.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ClientRequest__ThreadItemsListParams" });

export type ClientRequest__PluginShareSaveParams = {
  readonly discoverability?: ClientRequest__PluginShareDiscoverability | null;
  readonly pluginPath: ClientRequest__AbsolutePathBuf;
  readonly remotePluginId?: string | null;
  readonly shareTargets?: ReadonlyArray<ClientRequest__PluginShareTarget> | null;
};
export const ClientRequest__PluginShareSaveParams = Schema.Struct({
  discoverability: Schema.optionalKey(
    Schema.Union([ClientRequest__PluginShareDiscoverability, Schema.Null]),
  ),
  pluginPath: ClientRequest__AbsolutePathBuf,
  remotePluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  shareTargets: Schema.optionalKey(
    Schema.Union([Schema.Array(ClientRequest__PluginShareTarget), Schema.Null]),
  ),
}).annotate({ identifier: "ClientRequest__PluginShareSaveParams" });

export type ClientRequest__PluginShareUpdateTargetsParams = {
  readonly discoverability: ClientRequest__PluginShareUpdateDiscoverability;
  readonly remotePluginId: string;
  readonly shareTargets: ReadonlyArray<ClientRequest__PluginShareTarget>;
};
export const ClientRequest__PluginShareUpdateTargetsParams = Schema.Struct({
  discoverability: ClientRequest__PluginShareUpdateDiscoverability,
  remotePluginId: Schema.String,
  shareTargets: Schema.Array(ClientRequest__PluginShareTarget),
}).annotate({ identifier: "ClientRequest__PluginShareUpdateTargetsParams" });

export type ClientRequest__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<ClientRequest__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: ClientRequest__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: ClientRequest__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: ClientRequest__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const ClientRequest__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(ClientRequest__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ClientRequest__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([ClientRequest__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([ClientRequest__ImageDetail, Schema.Null])),
      path: Schema.String,
      type: Schema.Literal("localImage").annotate({ title: "LocalImageUserInputType" }),
    }).annotate({ title: "LocalImageUserInput" }),
    Schema.Struct({
      type: Schema.Literal("audio").annotate({ title: "AudioUserInputType" }),
      url: Schema.String,
    }).annotate({ title: "AudioUserInput" }),
    Schema.Struct({
      path: Schema.String,
      type: Schema.Literal("localAudio").annotate({ title: "LocalAudioUserInputType" }),
    }).annotate({ title: "LocalAudioUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("skill").annotate({ title: "SkillUserInputType" }),
    }).annotate({ title: "SkillUserInput" }),
    Schema.Struct({
      name: Schema.String,
      path: Schema.String,
      type: Schema.Literal("mention").annotate({ title: "MentionUserInputType" }),
    }).annotate({ title: "MentionUserInput" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ClientRequest__UserInput" });

export type ClientRequest__FunctionCallOutputBody =
  | string
  | ReadonlyArray<ClientRequest__FunctionCallOutputContentItem>;
export const ClientRequest__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(ClientRequest__FunctionCallOutputContentItem),
]).annotate({ identifier: "ClientRequest__FunctionCallOutputBody" });

export type ClientRequest__CommandExecParams = {
  readonly command: ReadonlyArray<string>;
  readonly cwd?: string | null;
  readonly disableOutputCap?: boolean;
  readonly disableTimeout?: boolean;
  readonly env?: { readonly [x: string]: string | null } | null;
  readonly outputBytesCap?: number | null;
  readonly processId?: string | null;
  readonly sandboxPolicy?: ClientRequest__SandboxPolicy | null;
  readonly size?: ClientRequest__CommandExecTerminalSize | null;
  readonly streamStdin?: boolean;
  readonly streamStdoutStderr?: boolean;
  readonly timeoutMs?: number | null;
  readonly tty?: boolean;
};
export const ClientRequest__CommandExecParams = Schema.Struct({
  command: Schema.Array(Schema.String).annotate({
    description: "Command argv vector. Empty arrays are rejected.",
  }),
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional working directory. Defaults to the server cwd.",
      }),
      Schema.Null,
    ]),
  ),
  disableOutputCap: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Disable stdout/stderr capture truncation for this request.\n\nCannot be combined with `outputBytesCap`.",
    }),
  ),
  disableTimeout: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Disable the timeout entirely for this request.\n\nCannot be combined with `timeoutMs`.",
    }),
  ),
  env: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.Union([Schema.String, Schema.Null])).annotate({
        description:
          "Optional environment overrides merged into the server-computed environment.\n\nMatching names override inherited values. Set a key to `null` to unset an inherited variable.",
      }),
      Schema.Null,
    ]),
  ),
  outputBytesCap: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Optional per-stream stdout/stderr capture cap in bytes.\n\nWhen omitted, the server default applies. Cannot be combined with `disableOutputCap`.",
        format: "uint",
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
  processId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional client-supplied, connection-scoped process id.\n\nRequired for `tty`, `streamStdin`, `streamStdoutStderr`, and follow-up `command/exec/write`, `command/exec/resize`, and `command/exec/terminate` calls. When omitted, buffered execution gets an internal id that is not exposed to the client.",
      }),
      Schema.Null,
    ]),
  ),
  sandboxPolicy: Schema.optionalKey(
    Schema.Union([ClientRequest__SandboxPolicy, Schema.Null]).annotate({
      description:
        "Optional sandbox policy for this command.\n\nUses the same shape as thread/turn execution sandbox configuration and defaults to the user's configured policy when omitted. Cannot be combined with `permissionProfile`.",
    }),
  ),
  size: Schema.optionalKey(
    Schema.Union([ClientRequest__CommandExecTerminalSize, Schema.Null]).annotate({
      description: "Optional initial PTY size in character cells. Only valid when `tty` is true.",
    }),
  ),
  streamStdin: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Allow follow-up `command/exec/write` requests to write stdin bytes.\n\nRequires a client-supplied `processId`.",
    }),
  ),
  streamStdoutStderr: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Stream stdout/stderr via `command/exec/outputDelta` notifications.\n\nStreamed bytes are not duplicated into the final response and require a client-supplied `processId`.",
    }),
  ),
  timeoutMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Optional timeout in milliseconds.\n\nWhen omitted, the server default applies. Cannot be combined with `disableTimeout`.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  tty: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Enable PTY mode.\n\nThis implies `streamStdin` and `streamStdoutStderr`.",
    }),
  ),
}).annotate({
  description:
    "Run a standalone command (argv vector) in the server sandbox without creating a thread or turn.\n\nThe final `command/exec` response is deferred until the process exits and is sent only after all `command/exec/outputDelta` notifications for that connection have been emitted.",
  identifier: "ClientRequest__CommandExecParams",
});

export type ClientRequest__ExternalAgentConfigMigrationItem = {
  readonly cwd?: string | null;
  readonly description: string;
  readonly details?: ClientRequest__MigrationDetails | null;
  readonly itemType: ClientRequest__ExternalAgentConfigMigrationItemType;
};
export const ClientRequest__ExternalAgentConfigMigrationItem = Schema.Struct({
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Null or empty means home-scoped migration; non-empty means repo-scoped migration.",
      }),
      Schema.Null,
    ]),
  ),
  description: Schema.String,
  details: Schema.optionalKey(Schema.Union([ClientRequest__MigrationDetails, Schema.Null])),
  itemType: ClientRequest__ExternalAgentConfigMigrationItemType,
}).annotate({ identifier: "ClientRequest__ExternalAgentConfigMigrationItem" });

export type ClientRequest__ExternalAgentConfigImportHistoryRecordTypeResultParams = {
  readonly failures: ReadonlyArray<ClientRequest__ExternalAgentConfigImportItemTypeFailure>;
  readonly itemType: ClientRequest__ExternalAgentConfigMigrationItemType;
  readonly successes: ReadonlyArray<ClientRequest__ExternalAgentConfigImportHistoryRecordSuccessParams>;
};
export const ClientRequest__ExternalAgentConfigImportHistoryRecordTypeResultParams = Schema.Struct({
  failures: Schema.Array(ClientRequest__ExternalAgentConfigImportItemTypeFailure),
  itemType: ClientRequest__ExternalAgentConfigMigrationItemType,
  successes: Schema.Array(ClientRequest__ExternalAgentConfigImportHistoryRecordSuccessParams),
}).annotate({
  identifier: "ClientRequest__ExternalAgentConfigImportHistoryRecordTypeResultParams",
});

export type ClientRequest__ConfigBatchWriteParams = {
  readonly edits: ReadonlyArray<ClientRequest__ConfigEdit>;
  readonly expectedVersion?: string | null;
  readonly filePath?: string | null;
  readonly reloadUserConfig?: boolean;
};
export const ClientRequest__ConfigBatchWriteParams = Schema.Struct({
  edits: Schema.Array(ClientRequest__ConfigEdit),
  expectedVersion: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  filePath: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Path to the config file to write; defaults to the user's `config.toml` when omitted.",
      }),
      Schema.Null,
    ]),
  ),
  reloadUserConfig: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true, hot-reload updated runtime settings into loaded threads after writing. Session-static model, reasoning-effort, Plan-mode reasoning-effort, and service-tier defaults are not reloaded. The deprecated personality setting is also not reloaded.",
    }),
  ),
}).annotate({ identifier: "ClientRequest__ConfigBatchWriteParams" });

export type CommandExecutionRequestApprovalParams__FileSystemPath =
  | {
      readonly path: CommandExecutionRequestApprovalParams__LegacyAppPathString;
      readonly type: "path";
    }
  | { readonly pattern: string; readonly type: "glob_pattern" }
  | {
      readonly type: "special";
      readonly value: CommandExecutionRequestApprovalParams__FileSystemSpecialPath;
    };
export const CommandExecutionRequestApprovalParams__FileSystemPath = Schema.Union(
  [
    Schema.Struct({
      path: CommandExecutionRequestApprovalParams__LegacyAppPathString,
      type: Schema.Literal("path").annotate({ title: "PathFileSystemPathType" }),
    }).annotate({ title: "PathFileSystemPath" }),
    Schema.Struct({
      pattern: Schema.String,
      type: Schema.Literal("glob_pattern").annotate({ title: "GlobPatternFileSystemPathType" }),
    }).annotate({ title: "GlobPatternFileSystemPath" }),
    Schema.Struct({
      type: Schema.Literal("special").annotate({ title: "SpecialFileSystemPathType" }),
      value: CommandExecutionRequestApprovalParams__FileSystemSpecialPath,
    }).annotate({ title: "SpecialFileSystemPath" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "CommandExecutionRequestApprovalParams__FileSystemPath" });

export type CommandExecutionRequestApprovalResponse__CommandExecutionApprovalDecision =
  | "accept"
  | "acceptForSession"
  | {
      readonly acceptWithExecpolicyAmendment: {
        readonly execpolicy_amendment: ReadonlyArray<string>;
      };
    }
  | {
      readonly applyNetworkPolicyAmendment: {
        readonly network_policy_amendment: CommandExecutionRequestApprovalResponse__NetworkPolicyAmendment;
      };
    }
  | "decline"
  | "cancel";
export const CommandExecutionRequestApprovalResponse__CommandExecutionApprovalDecision =
  Schema.Union(
    [
      Schema.Literal("accept").annotate({ description: "User approved the command." }),
      Schema.Literal("acceptForSession").annotate({
        description:
          "User approved the command and future prompts in the same session-scoped approval cache should run without prompting.",
      }),
      Schema.Struct({
        acceptWithExecpolicyAmendment: Schema.Struct({
          execpolicy_amendment: Schema.Array(Schema.String),
        }),
      }).annotate({
        title: "AcceptWithExecpolicyAmendmentCommandExecutionApprovalDecision",
        description:
          "User approved the command, and wants to apply the proposed execpolicy amendment so future matching commands can run without prompting.",
      }),
      Schema.Struct({
        applyNetworkPolicyAmendment: Schema.Struct({
          network_policy_amendment: CommandExecutionRequestApprovalResponse__NetworkPolicyAmendment,
        }),
      }).annotate({
        title: "ApplyNetworkPolicyAmendmentCommandExecutionApprovalDecision",
        description: "User chose a persistent network policy rule (allow/deny) for this host.",
      }),
      Schema.Literal("decline").annotate({
        description: "User denied the command. The agent will continue the turn.",
      }),
      Schema.Literal("cancel").annotate({
        description: "User denied the command. The turn will also be immediately interrupted.",
      }),
    ],
    { mode: "oneOf" },
  ).annotate({
    identifier: "CommandExecutionRequestApprovalResponse__CommandExecutionApprovalDecision",
  });

export type ExecCommandApprovalResponse__ReviewDecision =
  | "approved"
  | {
      readonly approved_execpolicy_amendment: {
        readonly proposed_execpolicy_amendment: ReadonlyArray<string>;
      };
    }
  | "approved_for_session"
  | "approved_mcp_policy_amendment"
  | {
      readonly network_policy_amendment: {
        readonly network_policy_amendment: ExecCommandApprovalResponse__NetworkPolicyAmendment;
      };
    }
  | { readonly denied: { readonly rejection: string } }
  | "timed_out"
  | "abort";
export const ExecCommandApprovalResponse__ReviewDecision = Schema.Union(
  [
    Schema.Literal("approved").annotate({
      description: "User has approved this command and the agent should execute it.",
    }),
    Schema.Struct({
      approved_execpolicy_amendment: Schema.Struct({
        proposed_execpolicy_amendment: Schema.Array(Schema.String),
      }),
    }).annotate({
      title: "ApprovedExecpolicyAmendmentReviewDecision",
      description:
        "User has approved this command and wants to apply the proposed execpolicy amendment so future matching commands are permitted.",
    }),
    Schema.Literal("approved_for_session").annotate({
      description:
        "User has approved this request and wants future prompts in the same session-scoped approval cache to be automatically approved for the remainder of the session.",
    }),
    Schema.Literal("approved_mcp_policy_amendment").annotate({
      description:
        "User has approved this MCP tool call and wants to amend its policy so matching future calls are automatically approved across sessions.",
    }),
    Schema.Struct({
      network_policy_amendment: Schema.Struct({
        network_policy_amendment: ExecCommandApprovalResponse__NetworkPolicyAmendment,
      }),
    }).annotate({
      title: "NetworkPolicyAmendmentReviewDecision",
      description:
        "User chose to persist a network policy rule (allow/deny) for future requests to the same host.",
    }),
    Schema.Struct({ denied: Schema.Struct({ rejection: Schema.String }) }).annotate({
      title: "DeniedReviewDecision",
      description:
        "User has denied this command and the agent should not execute it, but it should continue the session and try something else.",
    }),
    Schema.Literal("timed_out").annotate({
      description: "Automatic approval review timed out before reaching a decision.",
    }),
    Schema.Literal("abort").annotate({
      description:
        "User has denied this command and the agent should not do anything until the user's next command.",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  description: "User's decision in response to an ExecApprovalRequest.",
  identifier: "ExecCommandApprovalResponse__ReviewDecision",
});

export type McpServerElicitationRequestParams__McpElicitationUntitledMultiSelectEnumSchema = {
  readonly default?: ReadonlyArray<string> | null;
  readonly description?: string | null;
  readonly items: McpServerElicitationRequestParams__McpElicitationUntitledEnumItems;
  readonly maxItems?: number | null;
  readonly minItems?: number | null;
  readonly title?: string | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationArrayType;
};
export const McpServerElicitationRequestParams__McpElicitationUntitledMultiSelectEnumSchema =
  Schema.Struct({
    default: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    items: McpServerElicitationRequestParams__McpElicitationUntitledEnumItems,
    maxItems: Schema.optionalKey(
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
    minItems: Schema.optionalKey(
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
    title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    type: McpServerElicitationRequestParams__McpElicitationArrayType,
  }).annotate({
    identifier: "McpServerElicitationRequestParams__McpElicitationUntitledMultiSelectEnumSchema",
  });

export type McpServerElicitationRequestParams__McpElicitationSingleSelectEnumSchema =
  | McpServerElicitationRequestParams__McpElicitationUntitledSingleSelectEnumSchema
  | McpServerElicitationRequestParams__McpElicitationTitledSingleSelectEnumSchema;
export const McpServerElicitationRequestParams__McpElicitationSingleSelectEnumSchema = Schema.Union(
  [
    McpServerElicitationRequestParams__McpElicitationUntitledSingleSelectEnumSchema,
    McpServerElicitationRequestParams__McpElicitationTitledSingleSelectEnumSchema,
  ],
).annotate({
  identifier: "McpServerElicitationRequestParams__McpElicitationSingleSelectEnumSchema",
});

export type McpServerElicitationRequestParams__McpElicitationTitledMultiSelectEnumSchema = {
  readonly default?: ReadonlyArray<string> | null;
  readonly description?: string | null;
  readonly items: McpServerElicitationRequestParams__McpElicitationTitledEnumItems;
  readonly maxItems?: number | null;
  readonly minItems?: number | null;
  readonly title?: string | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationArrayType;
};
export const McpServerElicitationRequestParams__McpElicitationTitledMultiSelectEnumSchema =
  Schema.Struct({
    default: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
    description: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    items: McpServerElicitationRequestParams__McpElicitationTitledEnumItems,
    maxItems: Schema.optionalKey(
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
    minItems: Schema.optionalKey(
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
    title: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
    type: McpServerElicitationRequestParams__McpElicitationArrayType,
  }).annotate({
    identifier: "McpServerElicitationRequestParams__McpElicitationTitledMultiSelectEnumSchema",
  });

export type PermissionsRequestApprovalParams__FileSystemPath =
  | { readonly path: PermissionsRequestApprovalParams__LegacyAppPathString; readonly type: "path" }
  | { readonly pattern: string; readonly type: "glob_pattern" }
  | {
      readonly type: "special";
      readonly value: PermissionsRequestApprovalParams__FileSystemSpecialPath;
    };
export const PermissionsRequestApprovalParams__FileSystemPath = Schema.Union(
  [
    Schema.Struct({
      path: PermissionsRequestApprovalParams__LegacyAppPathString,
      type: Schema.Literal("path").annotate({ title: "PathFileSystemPathType" }),
    }).annotate({ title: "PathFileSystemPath" }),
    Schema.Struct({
      pattern: Schema.String,
      type: Schema.Literal("glob_pattern").annotate({ title: "GlobPatternFileSystemPathType" }),
    }).annotate({ title: "GlobPatternFileSystemPath" }),
    Schema.Struct({
      type: Schema.Literal("special").annotate({ title: "SpecialFileSystemPathType" }),
      value: PermissionsRequestApprovalParams__FileSystemSpecialPath,
    }).annotate({ title: "SpecialFileSystemPath" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "PermissionsRequestApprovalParams__FileSystemPath" });
