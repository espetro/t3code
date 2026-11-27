import * as Schema from "effect/Schema";
import {
  CommandExecutionRequestApprovalParams__FileSystemAccessMode,
  PermissionsRequestApprovalParams__FileSystemAccessMode,
  PermissionsRequestApprovalResponse__FileSystemAccessMode,
  ServerNotification__AbsolutePathBuf,
  ServerNotification__AgentMessageDelivery,
  ServerNotification__AsyncUserInputQuestion,
  ServerNotification__CollabAgentTool,
  ServerNotification__CollabAgentToolCallStatus,
  ServerNotification__CommandExecutionSource,
  ServerNotification__CommandExecutionStatus,
  ServerNotification__DynamicToolCallOutputContentItem,
  ServerNotification__DynamicToolCallStatus,
  ServerNotification__HookPromptFragment,
  ServerNotification__ImageGenerationFailure,
  ServerNotification__LegacyAppPathString,
  ServerNotification__McpToolCallAppContext,
  ServerNotification__McpToolCallError,
  ServerNotification__McpToolCallResult,
  ServerNotification__McpToolCallStatus,
  ServerNotification__MessagePhase,
  ServerNotification__PatchApplyStatus,
  ServerNotification__ReasoningEffort,
  ServerNotification__SubAgentActivityKind,
  ServerNotification__WebSearchAction,
} from "./schema.gen.part0.ts";
import {
  ServerNotification__ActivePermissionProfile,
  ServerNotification__ApprovalsReviewer,
  ServerNotification__AskForApproval,
  ServerNotification__FileSystemAccessMode,
  ServerNotification__Personality,
  ServerNotification__ReasoningSummary,
  ServerRequest__FileSystemAccessMode,
  V2ConfigReadResponse__AllowDenyRequirement,
  V2ConfigRequirementsReadResponse__AllowDenyRequirement,
} from "./schema.gen.part1.ts";
import {
  V2ThreadReadResponse__ImageDetail,
  V2ThreadResumeResponse__ImageDetail,
  V2ThreadResumeResponse__ModeKind,
  V2ThreadRevertResponse__ImageDetail,
} from "./schema.gen.part4.ts";
import {
  V2ThreadSettingsUpdatedNotification__ModeKind,
  V2ThreadStartResponse__ImageDetail,
  V2ThreadStartedNotification__ImageDetail,
  V2ThreadTurnsListResponse__ImageDetail,
  V2ThreadUnarchiveResponse__ImageDetail,
  V2TurnCompletedNotification__ImageDetail,
} from "./schema.gen.part5.ts";
import {
  V2TurnStartParams__ImageDetail,
  V2TurnStartResponse__ImageDetail,
  V2TurnStartedNotification__ImageDetail,
  V2TurnSteerParams__ImageDetail,
} from "./schema.gen.part6.ts";
import {
  ServerNotification__CollabAgentState,
  ServerNotification__CommandAction,
  ServerNotification__FileUpdateChange,
  ServerNotification__McpAppUi,
  ServerNotification__MemoryCitation,
  ServerNotification__SandboxPolicy,
  V2ConfigReadResponse__ComputerUseMacosConfig,
} from "./schema.gen.part7.ts";
import { V2ConfigRequirementsReadResponse__ComputerUseMacosRequirements } from "./schema.gen.part8.ts";
import {
  V2ThreadReadResponse__CodexErrorInfo,
  V2ThreadReadResponse__FunctionCallOutputContentItem,
  V2ThreadReadResponse__MisalignmentErrorDetails,
  V2ThreadReadResponse__TextElement,
  V2ThreadResumeParams__FunctionCallOutputContentItem,
  V2ThreadResumeResponse__CodexErrorInfo,
  V2ThreadResumeResponse__FunctionCallOutputContentItem,
  V2ThreadResumeResponse__MisalignmentErrorDetails,
  V2ThreadResumeResponse__Settings,
  V2ThreadResumeResponse__SubAgentSource,
  V2ThreadResumeResponse__TextElement,
  V2ThreadRevertResponse__CodexErrorInfo,
  V2ThreadRevertResponse__FunctionCallOutputContentItem,
  V2ThreadRevertResponse__MisalignmentErrorDetails,
  V2ThreadRevertResponse__SubAgentSource,
  V2ThreadRevertResponse__TextElement,
  V2ThreadSettingsUpdatedNotification__Settings,
  V2ThreadStartResponse__CodexErrorInfo,
  V2ThreadStartResponse__FunctionCallOutputContentItem,
  V2ThreadStartResponse__MisalignmentErrorDetails,
  V2ThreadStartResponse__SubAgentSource,
  V2ThreadStartResponse__TextElement,
  V2ThreadStartedNotification__CodexErrorInfo,
  V2ThreadStartedNotification__FunctionCallOutputContentItem,
  V2ThreadStartedNotification__MisalignmentErrorDetails,
  V2ThreadStartedNotification__SubAgentSource,
  V2ThreadStartedNotification__TextElement,
} from "./schema.gen.part10.ts";
import {
  ClientRequest__ExternalAgentConfigImportHistoryRecordTypeResultParams,
  ClientRequest__ExternalAgentConfigMigrationItem,
  ClientRequest__FunctionCallOutputBody,
  ClientRequest__UserInput,
  CommandExecutionRequestApprovalParams__FileSystemPath,
  McpServerElicitationRequestParams__McpElicitationTitledMultiSelectEnumSchema,
  McpServerElicitationRequestParams__McpElicitationUntitledMultiSelectEnumSchema,
  PermissionsRequestApprovalParams__FileSystemPath,
  V2ThreadTurnsListResponse__CodexErrorInfo,
  V2ThreadTurnsListResponse__FunctionCallOutputContentItem,
  V2ThreadTurnsListResponse__MisalignmentErrorDetails,
  V2ThreadTurnsListResponse__TextElement,
  V2ThreadUnarchiveResponse__CodexErrorInfo,
  V2ThreadUnarchiveResponse__FunctionCallOutputContentItem,
  V2ThreadUnarchiveResponse__MisalignmentErrorDetails,
  V2ThreadUnarchiveResponse__SubAgentSource,
  V2ThreadUnarchiveResponse__TextElement,
  V2TurnCompletedNotification__CodexErrorInfo,
  V2TurnCompletedNotification__FunctionCallOutputContentItem,
  V2TurnCompletedNotification__MisalignmentErrorDetails,
  V2TurnCompletedNotification__TextElement,
  V2TurnStartParams__FunctionCallOutputContentItem,
  V2TurnStartParams__TextElement,
  V2TurnStartResponse__CodexErrorInfo,
  V2TurnStartResponse__FunctionCallOutputContentItem,
  V2TurnStartResponse__MisalignmentErrorDetails,
  V2TurnStartResponse__TextElement,
  V2TurnStartedNotification__CodexErrorInfo,
  V2TurnStartedNotification__FunctionCallOutputContentItem,
  V2TurnStartedNotification__MisalignmentErrorDetails,
  V2TurnStartedNotification__TextElement,
  V2TurnSteerParams__TextElement,
} from "./schema.gen.part11.ts";
import {
  PermissionsRequestApprovalResponse__FileSystemPath,
  ServerNotification__AppInfo,
  ServerNotification__CollaborationMode,
  ServerNotification__ExternalAgentConfigImportTypeResult,
  ServerNotification__FileSystemPath,
  ServerNotification__FunctionCallOutputBody,
  ServerNotification__HookRunSummary,
  ServerNotification__TurnError,
  ServerNotification__UserInput,
  ServerRequest__FileSystemPath,
  ServerRequest__McpElicitationTitledMultiSelectEnumSchema,
  ServerRequest__McpElicitationUntitledMultiSelectEnumSchema,
  V2ConfigReadResponse__ComputerUseWindowsConfig,
  V2ConfigRequirementsReadResponse__ComputerUseWindowsRequirements,
  V2ConfigWriteResponse__ConfigLayerMetadata,
} from "./schema.gen.part12.ts";

export type V2ThreadReadResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadReadResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadReadResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadReadResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadReadResponse__TurnError" });

export type V2ThreadReadResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadReadResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadReadResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadReadResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadReadResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadReadResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadReadResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadReadResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadReadResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2ThreadReadResponse__ImageDetail, Schema.Null])),
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
).annotate({ identifier: "V2ThreadReadResponse__UserInput" });

export type V2ThreadReadResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadReadResponse__FunctionCallOutputContentItem>;
export const V2ThreadReadResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadReadResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadReadResponse__FunctionCallOutputBody" });

export type V2ThreadResumeParams__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadResumeParams__FunctionCallOutputContentItem>;
export const V2ThreadResumeParams__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadResumeParams__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadResumeParams__FunctionCallOutputBody" });

export type V2ThreadResumeResponse__CollaborationMode = {
  readonly mode: V2ThreadResumeResponse__ModeKind;
  readonly settings: V2ThreadResumeResponse__Settings;
};
export const V2ThreadResumeResponse__CollaborationMode = Schema.Struct({
  mode: V2ThreadResumeResponse__ModeKind,
  settings: V2ThreadResumeResponse__Settings,
}).annotate({
  description: "Collaboration mode for a Codex session.",
  identifier: "V2ThreadResumeResponse__CollaborationMode",
});

export type V2ThreadResumeResponse__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadResumeResponse__SubAgentSource };
export const V2ThreadResumeResponse__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadResumeResponse__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadResumeResponse__SessionSource" });

export type V2ThreadResumeResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadResumeResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadResumeResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadResumeResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadResumeResponse__TurnError" });

export type V2ThreadResumeResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadResumeResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadResumeResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadResumeResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadResumeResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadResumeResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadResumeResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadResumeResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadResumeResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2ThreadResumeResponse__ImageDetail, Schema.Null])),
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
).annotate({ identifier: "V2ThreadResumeResponse__UserInput" });

export type V2ThreadResumeResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadResumeResponse__FunctionCallOutputContentItem>;
export const V2ThreadResumeResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadResumeResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadResumeResponse__FunctionCallOutputBody" });

export type V2ThreadRevertResponse__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadRevertResponse__SubAgentSource };
export const V2ThreadRevertResponse__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadRevertResponse__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadRevertResponse__SessionSource" });

export type V2ThreadRevertResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadRevertResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadRevertResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadRevertResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadRevertResponse__TurnError" });

export type V2ThreadRevertResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadRevertResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadRevertResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadRevertResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadRevertResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadRevertResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadRevertResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadRevertResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadRevertResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2ThreadRevertResponse__ImageDetail, Schema.Null])),
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
).annotate({ identifier: "V2ThreadRevertResponse__UserInput" });

export type V2ThreadRevertResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadRevertResponse__FunctionCallOutputContentItem>;
export const V2ThreadRevertResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadRevertResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadRevertResponse__FunctionCallOutputBody" });

export type V2ThreadSettingsUpdatedNotification__CollaborationMode = {
  readonly mode: V2ThreadSettingsUpdatedNotification__ModeKind;
  readonly settings: V2ThreadSettingsUpdatedNotification__Settings;
};
export const V2ThreadSettingsUpdatedNotification__CollaborationMode = Schema.Struct({
  mode: V2ThreadSettingsUpdatedNotification__ModeKind,
  settings: V2ThreadSettingsUpdatedNotification__Settings,
}).annotate({
  description: "Collaboration mode for a Codex session.",
  identifier: "V2ThreadSettingsUpdatedNotification__CollaborationMode",
});

export type V2ThreadStartedNotification__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadStartedNotification__SubAgentSource };
export const V2ThreadStartedNotification__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadStartedNotification__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartedNotification__SessionSource" });

export type V2ThreadStartedNotification__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadStartedNotification__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadStartedNotification__MisalignmentErrorDetails | null;
};
export const V2ThreadStartedNotification__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadStartedNotification__TurnError" });

export type V2ThreadStartedNotification__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadStartedNotification__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadStartedNotification__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadStartedNotification__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadStartedNotification__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadStartedNotification__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadStartedNotification__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__ImageDetail, Schema.Null]),
      ),
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
).annotate({ identifier: "V2ThreadStartedNotification__UserInput" });

export type V2ThreadStartedNotification__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadStartedNotification__FunctionCallOutputContentItem>;
export const V2ThreadStartedNotification__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadStartedNotification__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadStartedNotification__FunctionCallOutputBody" });

export type V2ThreadStartResponse__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadStartResponse__SubAgentSource };
export const V2ThreadStartResponse__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadStartResponse__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadStartResponse__SessionSource" });

export type V2ThreadStartResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadStartResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadStartResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadStartResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadStartResponse__TurnError" });

export type V2ThreadStartResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadStartResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadStartResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadStartResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadStartResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadStartResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadStartResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2ThreadStartResponse__ImageDetail, Schema.Null])),
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
).annotate({ identifier: "V2ThreadStartResponse__UserInput" });

export type V2ThreadStartResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadStartResponse__FunctionCallOutputContentItem>;
export const V2ThreadStartResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadStartResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadStartResponse__FunctionCallOutputBody" });

export type V2ThreadTurnsListResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadTurnsListResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadTurnsListResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadTurnsListResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadTurnsListResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadTurnsListResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadTurnsListResponse__TurnError" });

export type V2ThreadTurnsListResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadTurnsListResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadTurnsListResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadTurnsListResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadTurnsListResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadTurnsListResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadTurnsListResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadTurnsListResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadTurnsListResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__ImageDetail, Schema.Null]),
      ),
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
).annotate({ identifier: "V2ThreadTurnsListResponse__UserInput" });

export type V2ThreadTurnsListResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadTurnsListResponse__FunctionCallOutputContentItem>;
export const V2ThreadTurnsListResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadTurnsListResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadTurnsListResponse__FunctionCallOutputBody" });

export type V2ThreadUnarchiveResponse__SessionSource =
  | "cli"
  | "vscode"
  | "exec"
  | "appServer"
  | "unknown"
  | { readonly custom: string }
  | { readonly subAgent: V2ThreadUnarchiveResponse__SubAgentSource };
export const V2ThreadUnarchiveResponse__SessionSource = Schema.Union(
  [
    Schema.Literals(["cli", "vscode", "exec", "appServer", "unknown"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomSessionSource" }),
    Schema.Struct({ subAgent: V2ThreadUnarchiveResponse__SubAgentSource }).annotate({
      title: "SubAgentSessionSource",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadUnarchiveResponse__SessionSource" });

export type V2ThreadUnarchiveResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2ThreadUnarchiveResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2ThreadUnarchiveResponse__MisalignmentErrorDetails | null;
};
export const V2ThreadUnarchiveResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2ThreadUnarchiveResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2ThreadUnarchiveResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2ThreadUnarchiveResponse__TurnError" });

export type V2ThreadUnarchiveResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2ThreadUnarchiveResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2ThreadUnarchiveResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2ThreadUnarchiveResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2ThreadUnarchiveResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2ThreadUnarchiveResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2ThreadUnarchiveResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadUnarchiveResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadUnarchiveResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2ThreadUnarchiveResponse__ImageDetail, Schema.Null]),
      ),
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
).annotate({ identifier: "V2ThreadUnarchiveResponse__UserInput" });

export type V2ThreadUnarchiveResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2ThreadUnarchiveResponse__FunctionCallOutputContentItem>;
export const V2ThreadUnarchiveResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2ThreadUnarchiveResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2ThreadUnarchiveResponse__FunctionCallOutputBody" });

export type V2TurnCompletedNotification__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2TurnCompletedNotification__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2TurnCompletedNotification__MisalignmentErrorDetails | null;
};
export const V2TurnCompletedNotification__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2TurnCompletedNotification__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2TurnCompletedNotification__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2TurnCompletedNotification__TurnError" });

export type V2TurnCompletedNotification__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2TurnCompletedNotification__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2TurnCompletedNotification__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2TurnCompletedNotification__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2TurnCompletedNotification__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2TurnCompletedNotification__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2TurnCompletedNotification__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2TurnCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2TurnCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2TurnCompletedNotification__ImageDetail, Schema.Null]),
      ),
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
).annotate({ identifier: "V2TurnCompletedNotification__UserInput" });

export type V2TurnCompletedNotification__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2TurnCompletedNotification__FunctionCallOutputContentItem>;
export const V2TurnCompletedNotification__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2TurnCompletedNotification__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2TurnCompletedNotification__FunctionCallOutputBody" });

export type V2TurnStartedNotification__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2TurnStartedNotification__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2TurnStartedNotification__MisalignmentErrorDetails | null;
};
export const V2TurnStartedNotification__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2TurnStartedNotification__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2TurnStartedNotification__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2TurnStartedNotification__TurnError" });

export type V2TurnStartedNotification__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2TurnStartedNotification__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2TurnStartedNotification__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2TurnStartedNotification__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2TurnStartedNotification__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2TurnStartedNotification__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2TurnStartedNotification__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2TurnStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2TurnStartedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(
        Schema.Union([V2TurnStartedNotification__ImageDetail, Schema.Null]),
      ),
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
).annotate({ identifier: "V2TurnStartedNotification__UserInput" });

export type V2TurnStartedNotification__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2TurnStartedNotification__FunctionCallOutputContentItem>;
export const V2TurnStartedNotification__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2TurnStartedNotification__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2TurnStartedNotification__FunctionCallOutputBody" });

export type V2TurnStartParams__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2TurnStartParams__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2TurnStartParams__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2TurnStartParams__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2TurnStartParams__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2TurnStartParams__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2TurnStartParams__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnStartParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnStartParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2TurnStartParams__ImageDetail, Schema.Null])),
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
).annotate({ identifier: "V2TurnStartParams__UserInput" });

export type V2TurnStartParams__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2TurnStartParams__FunctionCallOutputContentItem>;
export const V2TurnStartParams__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2TurnStartParams__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2TurnStartParams__FunctionCallOutputBody" });

export type V2TurnStartResponse__TurnError = {
  readonly additionalDetails?: string | null;
  readonly codexErrorInfo?: V2TurnStartResponse__CodexErrorInfo | null;
  readonly message: string;
  readonly misalignment?: V2TurnStartResponse__MisalignmentErrorDetails | null;
};
export const V2TurnStartResponse__TurnError = Schema.Struct({
  additionalDetails: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  codexErrorInfo: Schema.optionalKey(
    Schema.Union([V2TurnStartResponse__CodexErrorInfo, Schema.Null]),
  ),
  message: Schema.String,
  misalignment: Schema.optionalKey(
    Schema.Union([V2TurnStartResponse__MisalignmentErrorDetails, Schema.Null]).annotate({
      description:
        "Optional public explanation and continuation instruction for a misalignment block.",
    }),
  ),
}).annotate({ identifier: "V2TurnStartResponse__TurnError" });

export type V2TurnStartResponse__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2TurnStartResponse__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2TurnStartResponse__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2TurnStartResponse__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2TurnStartResponse__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2TurnStartResponse__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2TurnStartResponse__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2TurnStartResponse__ImageDetail, Schema.Null])),
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
).annotate({ identifier: "V2TurnStartResponse__UserInput" });

export type V2TurnStartResponse__FunctionCallOutputBody =
  | string
  | ReadonlyArray<V2TurnStartResponse__FunctionCallOutputContentItem>;
export const V2TurnStartResponse__FunctionCallOutputBody = Schema.Union([
  Schema.String,
  Schema.Array(V2TurnStartResponse__FunctionCallOutputContentItem),
]).annotate({ identifier: "V2TurnStartResponse__FunctionCallOutputBody" });

export type V2TurnSteerParams__UserInput =
  | {
      readonly text: string;
      readonly text_elements?: ReadonlyArray<V2TurnSteerParams__TextElement>;
      readonly type: "text";
    }
  | {
      readonly detail?: V2TurnSteerParams__ImageDetail | null;
      readonly type: "image";
      readonly url: string;
    }
  | {
      readonly detail?: V2TurnSteerParams__ImageDetail | null;
      readonly type: "image";
      readonly fileId: string;
    }
  | {
      readonly detail?: V2TurnSteerParams__ImageDetail | null;
      readonly path: string;
      readonly type: "localImage";
    }
  | { readonly type: "audio"; readonly url: string }
  | { readonly path: string; readonly type: "localAudio" }
  | { readonly name: string; readonly path: string; readonly type: "skill" }
  | { readonly name: string; readonly path: string; readonly type: "mention" };
export const V2TurnSteerParams__UserInput = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      text_elements: Schema.optionalKey(
        Schema.Array(V2TurnSteerParams__TextElement).annotate({
          description: "UI-defined spans within `text` used to render or persist special elements.",
          default: [],
        }),
      ),
      type: Schema.Literal("text").annotate({ title: "TextUserInputType" }),
    }).annotate({ title: "TextUserInput" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnSteerParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        url: Schema.String,
      }).annotate({ title: "UrlUserInput" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2TurnSteerParams__ImageDetail, Schema.Null])),
        type: Schema.Literal("image").annotate({ title: "ImageUserInputType" }),
        fileId: Schema.String,
      }).annotate({ title: "FileIdUserInput" }),
    ]).annotate({ title: "ImageUserInput" }),
    Schema.Struct({
      detail: Schema.optionalKey(Schema.Union([V2TurnSteerParams__ImageDetail, Schema.Null])),
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
).annotate({ identifier: "V2TurnSteerParams__UserInput" });

export type ClientRequest__TurnSteerParams = {
  readonly clientUserMessageId?: string | null;
  readonly expectedTurnId: string;
  readonly input: ReadonlyArray<ClientRequest__UserInput>;
  readonly threadId: string;
};
export const ClientRequest__TurnSteerParams = Schema.Struct({
  clientUserMessageId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  expectedTurnId: Schema.String.annotate({
    description:
      "Required active turn id precondition. The request fails when it does not match the currently active turn.",
  }),
  input: Schema.Array(ClientRequest__UserInput),
  threadId: Schema.String,
}).annotate({ identifier: "ClientRequest__TurnSteerParams" });

export type ClientRequest__TurnToolOutput = {
  readonly name: string;
  readonly namespace?: string | null;
  readonly output: ClientRequest__FunctionCallOutputBody;
};
export const ClientRequest__TurnToolOutput = Schema.Struct({
  name: Schema.String,
  namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  output: ClientRequest__FunctionCallOutputBody,
}).annotate({ identifier: "ClientRequest__TurnToolOutput" });

export type ClientRequest__ExternalAgentConfigImportParams = {
  readonly migrationItems: ReadonlyArray<ClientRequest__ExternalAgentConfigMigrationItem>;
  readonly migrationSource?: string | null;
  readonly providerId?: string | null;
  readonly source?: string | null;
};
export const ClientRequest__ExternalAgentConfigImportParams = Schema.Struct({
  migrationItems: Schema.Array(ClientRequest__ExternalAgentConfigMigrationItem),
  migrationSource: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Migration-source selector used to produce the migration items. Pass the same value to detection and import; missing or unrecognized values use the default source.",
      }),
      Schema.Null,
    ]),
  ),
  providerId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque provider identifier supplied by the caller for analytics attribution and import history display. This does not select the migration source.",
      }),
      Schema.Null,
    ]),
  ),
  source: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional identifier for the product that initiated the import.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ClientRequest__ExternalAgentConfigImportParams" });

export type ClientRequest__ExternalAgentConfigImportHistoryRecordParams = {
  readonly itemTypeResults: ReadonlyArray<ClientRequest__ExternalAgentConfigImportHistoryRecordTypeResultParams>;
  readonly providerId: string;
};
export const ClientRequest__ExternalAgentConfigImportHistoryRecordParams = Schema.Struct({
  itemTypeResults: Schema.Array(
    ClientRequest__ExternalAgentConfigImportHistoryRecordTypeResultParams,
  ).annotate({ description: "Completed results grouped by imported item type." }),
  providerId: Schema.String.annotate({
    description: "Opaque provider identifier for the externally completed import.",
  }),
}).annotate({ identifier: "ClientRequest__ExternalAgentConfigImportHistoryRecordParams" });

export type CommandExecutionRequestApprovalParams__FileSystemSandboxEntry = {
  readonly access: CommandExecutionRequestApprovalParams__FileSystemAccessMode;
  readonly path: CommandExecutionRequestApprovalParams__FileSystemPath;
};
export const CommandExecutionRequestApprovalParams__FileSystemSandboxEntry = Schema.Struct({
  access: CommandExecutionRequestApprovalParams__FileSystemAccessMode,
  path: CommandExecutionRequestApprovalParams__FileSystemPath,
}).annotate({ identifier: "CommandExecutionRequestApprovalParams__FileSystemSandboxEntry" });

export type McpServerElicitationRequestParams__McpElicitationMultiSelectEnumSchema =
  | McpServerElicitationRequestParams__McpElicitationUntitledMultiSelectEnumSchema
  | McpServerElicitationRequestParams__McpElicitationTitledMultiSelectEnumSchema;
export const McpServerElicitationRequestParams__McpElicitationMultiSelectEnumSchema = Schema.Union([
  McpServerElicitationRequestParams__McpElicitationUntitledMultiSelectEnumSchema,
  McpServerElicitationRequestParams__McpElicitationTitledMultiSelectEnumSchema,
]).annotate({
  identifier: "McpServerElicitationRequestParams__McpElicitationMultiSelectEnumSchema",
});

export type PermissionsRequestApprovalParams__FileSystemSandboxEntry = {
  readonly access: PermissionsRequestApprovalParams__FileSystemAccessMode;
  readonly path: PermissionsRequestApprovalParams__FileSystemPath;
};
export const PermissionsRequestApprovalParams__FileSystemSandboxEntry = Schema.Struct({
  access: PermissionsRequestApprovalParams__FileSystemAccessMode,
  path: PermissionsRequestApprovalParams__FileSystemPath,
}).annotate({ identifier: "PermissionsRequestApprovalParams__FileSystemSandboxEntry" });

export type PermissionsRequestApprovalResponse__FileSystemSandboxEntry = {
  readonly access: PermissionsRequestApprovalResponse__FileSystemAccessMode;
  readonly path: PermissionsRequestApprovalResponse__FileSystemPath;
};
export const PermissionsRequestApprovalResponse__FileSystemSandboxEntry = Schema.Struct({
  access: PermissionsRequestApprovalResponse__FileSystemAccessMode,
  path: PermissionsRequestApprovalResponse__FileSystemPath,
}).annotate({ identifier: "PermissionsRequestApprovalResponse__FileSystemSandboxEntry" });

export type ServerNotification__ErrorNotification = {
  readonly error: ServerNotification__TurnError;
  readonly threadId: string;
  readonly turnId: string;
  readonly willRetry: boolean;
};
export const ServerNotification__ErrorNotification = Schema.Struct({
  error: ServerNotification__TurnError,
  threadId: Schema.String,
  turnId: Schema.String,
  willRetry: Schema.Boolean,
}).annotate({ identifier: "ServerNotification__ErrorNotification" });

export type ServerNotification__ThreadSettings = {
  readonly activePermissionProfile?: ServerNotification__ActivePermissionProfile | null;
  readonly approvalPolicy: ServerNotification__AskForApproval;
  readonly approvalsReviewer: ServerNotification__ApprovalsReviewer;
  readonly collaborationMode: ServerNotification__CollaborationMode;
  readonly cwd: ServerNotification__AbsolutePathBuf;
  readonly disabledPluginIds?: ReadonlyArray<string>;
  readonly effort?: ServerNotification__ReasoningEffort | null;
  readonly model: string;
  readonly modelProvider: string;
  readonly personality?: ServerNotification__Personality | null;
  readonly sandboxPolicy: ServerNotification__SandboxPolicy;
  readonly serviceTier?: string | null;
  readonly summary?: ServerNotification__ReasoningSummary | null;
};
export const ServerNotification__ThreadSettings = Schema.Struct({
  activePermissionProfile: Schema.optionalKey(
    Schema.Union([ServerNotification__ActivePermissionProfile, Schema.Null]),
  ),
  approvalPolicy: ServerNotification__AskForApproval,
  approvalsReviewer: ServerNotification__ApprovalsReviewer,
  collaborationMode: ServerNotification__CollaborationMode,
  cwd: ServerNotification__AbsolutePathBuf,
  disabledPluginIds: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "Saved list of disabled plugin IDs. Does not yet filter plugin capabilities.",
      default: [],
    }),
  ),
  effort: Schema.optionalKey(Schema.Union([ServerNotification__ReasoningEffort, Schema.Null])),
  model: Schema.String,
  modelProvider: Schema.String,
  personality: Schema.optionalKey(
    Schema.Union([ServerNotification__Personality, Schema.Null]).annotate({
      description:
        "@deprecated Reports the saved setting; `friendly` and `pragmatic` no longer select a style.",
    }),
  ),
  sandboxPolicy: ServerNotification__SandboxPolicy,
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  summary: Schema.optionalKey(Schema.Union([ServerNotification__ReasoningSummary, Schema.Null])),
}).annotate({ identifier: "ServerNotification__ThreadSettings" });

export type ServerNotification__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<ServerNotification__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<ServerNotification__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: ServerNotification__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: ServerNotification__MemoryCitation | null;
      readonly phase?: ServerNotification__MessagePhase | null;
      readonly questions?: ReadonlyArray<ServerNotification__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: ServerNotification__FunctionCallOutputBody;
      readonly type: "functionCallOutput";
    }
  | { readonly id: string; readonly text: string; readonly type: "plan" }
  | {
      readonly content?: ReadonlyArray<string>;
      readonly id: string;
      readonly summary?: ReadonlyArray<string>;
      readonly type: "reasoning";
    }
  | {
      readonly aggregatedOutput?: string | null;
      readonly command: string;
      readonly commandActions: ReadonlyArray<ServerNotification__CommandAction>;
      readonly cwd: ServerNotification__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: ServerNotification__CommandExecutionSource;
      readonly status: ServerNotification__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<ServerNotification__FileUpdateChange>;
      readonly id: string;
      readonly status: ServerNotification__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: ServerNotification__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: ServerNotification__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: ServerNotification__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: ServerNotification__McpToolCallResult | null;
      readonly server: string;
      readonly status: ServerNotification__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<ServerNotification__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: ServerNotification__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: ServerNotification__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: ServerNotification__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: ServerNotification__CollabAgentToolCallStatus;
      readonly tool: ServerNotification__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: ServerNotification__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: ServerNotification__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: ServerNotification__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: ServerNotification__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: ServerNotification__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const ServerNotification__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(ServerNotification__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(ServerNotification__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([ServerNotification__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([ServerNotification__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([ServerNotification__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(ServerNotification__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: ServerNotification__FunctionCallOutputBody,
      type: Schema.Literal("functionCallOutput").annotate({
        title: "FunctionCallOutputThreadItemType",
      }),
    }).annotate({ title: "FunctionCallOutputThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      text: Schema.String,
      type: Schema.Literal("plan").annotate({ title: "PlanThreadItemType" }),
    }).annotate({
      title: "PlanThreadItem",
      description:
        "EXPERIMENTAL - proposed plan item content. The completed plan item is authoritative and may not match the concatenation of `PlanDelta` text.",
    }),
    Schema.Struct({
      content: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
      id: Schema.String,
      summary: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
      type: Schema.Literal("reasoning").annotate({ title: "ReasoningThreadItemType" }),
    }).annotate({ title: "ReasoningThreadItem" }),
    Schema.Struct({
      aggregatedOutput: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The command's output, aggregated from stdout and stderr.",
          }),
          Schema.Null,
        ]),
      ),
      command: Schema.String.annotate({ description: "The command to be executed." }),
      commandActions: Schema.Array(ServerNotification__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<ServerNotification__LegacyAppPathString> =>
          ServerNotification__LegacyAppPathString,
      ).annotate({ description: "The command's working directory." }),
      durationMs: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The duration of the command execution in milliseconds.",
            format: "int64",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      exitCode: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The command's exit code.",
            format: "int32",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      id: Schema.String,
      pluginId: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Trusted first-party plugin id when this command resolves to one plugin script.",
          }),
          Schema.Null,
        ]),
      ),
      processId: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Identifier for the underlying PTY process (when available).",
          }),
          Schema.Null,
        ]),
      ),
      scriptPath: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Safe plugin-relative path when this command resolves to one plugin script.",
          }),
          Schema.Null,
        ]),
      ),
      source: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<ServerNotification__CommandExecutionSource> =>
            ServerNotification__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: ServerNotification__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(ServerNotification__FileUpdateChange),
      id: Schema.String,
      status: ServerNotification__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([ServerNotification__McpToolCallAppContext, Schema.Null]),
      ),
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      durationMs: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The duration of the MCP tool call in milliseconds.",
            format: "int64",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      error: Schema.optionalKey(Schema.Union([ServerNotification__McpToolCallError, Schema.Null])),
      id: Schema.String,
      mcpAppResourceUri: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Legacy compatibility field; prefer `mcpAppUi.resourceUri` when available.",
          }),
          Schema.Null,
        ]),
      ),
      mcpAppUi: Schema.optionalKey(
        Schema.Union([ServerNotification__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([ServerNotification__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: ServerNotification__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(ServerNotification__DynamicToolCallOutputContentItem),
          Schema.Null,
        ]),
      ),
      durationMs: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "The duration of the dynamic tool call in milliseconds.",
            format: "int64",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      id: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      status: ServerNotification__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, ServerNotification__CollabAgentState).annotate({
        description: "Last known status of the target agents, when available.",
      }),
      id: Schema.String.annotate({ description: "Unique identifier for this collab tool call." }),
      model: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Model requested for the spawned agent, when applicable.",
          }),
          Schema.Null,
        ]),
      ),
      prompt: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Prompt text sent as part of the collab tool call, when available.",
          }),
          Schema.Null,
        ]),
      ),
      reasoningEffort: Schema.optionalKey(
        Schema.Union([ServerNotification__ReasoningEffort, Schema.Null]).annotate({
          description: "Reasoning effort requested for the spawned agent, when applicable.",
        }),
      ),
      receiverThreadIds: Schema.Array(Schema.String).annotate({
        description:
          "Thread ID of the receiving agent, when applicable. In case of spawn operation, this corresponds to the newly spawned agent.",
      }),
      senderThreadId: Schema.String.annotate({
        description: "Thread ID of the agent issuing the collab request.",
      }),
      status: Schema.suspend(
        (): Schema.Codec<ServerNotification__CollabAgentToolCallStatus> =>
          ServerNotification__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<ServerNotification__CollabAgentTool> =>
          ServerNotification__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: ServerNotification__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(Schema.Union([ServerNotification__WebSearchAction, Schema.Null])),
      id: Schema.String,
      query: Schema.String,
      results: Schema.optionalKey(
        Schema.Union([
          Schema.Array(Schema.Json.annotate({ expected: "JSON value" })).annotate({
            description:
              "Structured search results returned out-of-band by standalone web search.\n\nThese stay as opaque JSON at the extension/app-server boundary so new result fields and result types can pass through without a Codex release.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("webSearch").annotate({ title: "WebSearchThreadItemType" }),
    }).annotate({ title: "WebSearchThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      path: ServerNotification__LegacyAppPathString,
      type: Schema.Literal("imageView").annotate({ title: "ImageViewThreadItemType" }),
    }).annotate({ title: "ImageViewThreadItem" }),
    Schema.Struct({
      durationMs: Schema.Number.annotate({ format: "uint64" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      id: Schema.String,
      type: Schema.Literal("sleep").annotate({ title: "SleepThreadItemType" }),
    }).annotate({
      title: "SleepThreadItem",
      description: "Display item emitted by the interruptible `clock.sleep` tool.",
    }),
    Schema.Struct({
      failure: Schema.optionalKey(
        Schema.Union([ServerNotification__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([ServerNotification__AbsolutePathBuf, Schema.Null]),
      ),
      status: Schema.String,
      transparentBackground: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      type: Schema.Literal("imageGeneration").annotate({ title: "ImageGenerationThreadItemType" }),
      fileId: Schema.optionalKey(Schema.String),
    }).annotate({ title: "ImageGenerationThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      review: Schema.String,
      type: Schema.Literal("enteredReviewMode").annotate({
        title: "EnteredReviewModeThreadItemType",
      }),
    }).annotate({ title: "EnteredReviewModeThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      review: Schema.String,
      type: Schema.Literal("exitedReviewMode").annotate({
        title: "ExitedReviewModeThreadItemType",
      }),
    }).annotate({ title: "ExitedReviewModeThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      type: Schema.Literal("contextCompaction").annotate({
        title: "ContextCompactionThreadItemType",
      }),
    }).annotate({ title: "ContextCompactionThreadItem" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__ThreadItem" });

export type ServerNotification__FileSystemSandboxEntry = {
  readonly access: ServerNotification__FileSystemAccessMode;
  readonly path: ServerNotification__FileSystemPath;
};
export const ServerNotification__FileSystemSandboxEntry = Schema.Struct({
  access: ServerNotification__FileSystemAccessMode,
  path: ServerNotification__FileSystemPath,
}).annotate({ identifier: "ServerNotification__FileSystemSandboxEntry" });

export type ServerNotification__HookStartedNotification = {
  readonly run: ServerNotification__HookRunSummary;
  readonly threadId: string;
  readonly turnId?: string | null;
};
export const ServerNotification__HookStartedNotification = Schema.Struct({
  run: ServerNotification__HookRunSummary,
  threadId: Schema.String,
  turnId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__HookStartedNotification" });

export type ServerNotification__HookCompletedNotification = {
  readonly run: ServerNotification__HookRunSummary;
  readonly threadId: string;
  readonly turnId?: string | null;
};
export const ServerNotification__HookCompletedNotification = Schema.Struct({
  run: ServerNotification__HookRunSummary,
  threadId: Schema.String,
  turnId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "ServerNotification__HookCompletedNotification" });

export type ServerNotification__AppListUpdatedNotification = {
  readonly data: ReadonlyArray<ServerNotification__AppInfo>;
};
export const ServerNotification__AppListUpdatedNotification = Schema.Struct({
  data: Schema.Array(ServerNotification__AppInfo),
}).annotate({
  description: "EXPERIMENTAL - notification emitted when the app list changes.",
  identifier: "ServerNotification__AppListUpdatedNotification",
});

export type ServerNotification__ExternalAgentConfigImportProgressNotification = {
  readonly importId: string;
  readonly itemTypeResults: ReadonlyArray<ServerNotification__ExternalAgentConfigImportTypeResult>;
};
export const ServerNotification__ExternalAgentConfigImportProgressNotification = Schema.Struct({
  importId: Schema.String,
  itemTypeResults: Schema.Array(ServerNotification__ExternalAgentConfigImportTypeResult),
}).annotate({ identifier: "ServerNotification__ExternalAgentConfigImportProgressNotification" });

export type ServerNotification__ExternalAgentConfigImportCompletedNotification = {
  readonly importId: string;
  readonly itemTypeResults: ReadonlyArray<ServerNotification__ExternalAgentConfigImportTypeResult>;
};
export const ServerNotification__ExternalAgentConfigImportCompletedNotification = Schema.Struct({
  importId: Schema.String,
  itemTypeResults: Schema.Array(ServerNotification__ExternalAgentConfigImportTypeResult),
}).annotate({ identifier: "ServerNotification__ExternalAgentConfigImportCompletedNotification" });

export type ServerRequest__FileSystemSandboxEntry = {
  readonly access: ServerRequest__FileSystemAccessMode;
  readonly path: ServerRequest__FileSystemPath;
};
export const ServerRequest__FileSystemSandboxEntry = Schema.Struct({
  access: ServerRequest__FileSystemAccessMode,
  path: ServerRequest__FileSystemPath,
}).annotate({ identifier: "ServerRequest__FileSystemSandboxEntry" });

export type ServerRequest__McpElicitationMultiSelectEnumSchema =
  | ServerRequest__McpElicitationUntitledMultiSelectEnumSchema
  | ServerRequest__McpElicitationTitledMultiSelectEnumSchema;
export const ServerRequest__McpElicitationMultiSelectEnumSchema = Schema.Union([
  ServerRequest__McpElicitationUntitledMultiSelectEnumSchema,
  ServerRequest__McpElicitationTitledMultiSelectEnumSchema,
]).annotate({ identifier: "ServerRequest__McpElicitationMultiSelectEnumSchema" });

export type V2ConfigReadResponse__ComputerUseConfig = {
  readonly default_app_access?: V2ConfigReadResponse__AllowDenyRequirement | null;
  readonly macos?: V2ConfigReadResponse__ComputerUseMacosConfig | null;
  readonly windows?: V2ConfigReadResponse__ComputerUseWindowsConfig | null;
};
export const V2ConfigReadResponse__ComputerUseConfig = Schema.Struct({
  default_app_access: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  macos: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__ComputerUseMacosConfig, Schema.Null]),
  ),
  windows: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__ComputerUseWindowsConfig, Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigReadResponse__ComputerUseConfig" });

export type V2ConfigRequirementsReadResponse__ComputerUseRequirements = {
  readonly allowLockedComputerUse?: boolean | null;
  readonly allowPersistentApproval?: boolean | null;
  readonly defaultAppAccess?: V2ConfigRequirementsReadResponse__AllowDenyRequirement | null;
  readonly macos?: V2ConfigRequirementsReadResponse__ComputerUseMacosRequirements | null;
  readonly windows?: V2ConfigRequirementsReadResponse__ComputerUseWindowsRequirements | null;
};
export const V2ConfigRequirementsReadResponse__ComputerUseRequirements = Schema.Struct({
  allowLockedComputerUse: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  allowPersistentApproval: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  defaultAppAccess: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__AllowDenyRequirement, Schema.Null]),
  ),
  macos: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__ComputerUseMacosRequirements, Schema.Null]),
  ),
  windows: Schema.optionalKey(
    Schema.Union([V2ConfigRequirementsReadResponse__ComputerUseWindowsRequirements, Schema.Null]),
  ),
}).annotate({ identifier: "V2ConfigRequirementsReadResponse__ComputerUseRequirements" });

export type V2ConfigWriteResponse__OverriddenMetadata = {
  readonly effectiveValue: Schema.Json;
  readonly message: string;
  readonly overridingLayer: V2ConfigWriteResponse__ConfigLayerMetadata;
};
export const V2ConfigWriteResponse__OverriddenMetadata = Schema.Struct({
  effectiveValue: Schema.Json.annotate({ expected: "JSON value" }),
  message: Schema.String,
  overridingLayer: V2ConfigWriteResponse__ConfigLayerMetadata,
}).annotate({ identifier: "V2ConfigWriteResponse__OverriddenMetadata" });
