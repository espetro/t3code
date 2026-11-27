import * as Schema from "effect/Schema";
import {
  V2ThreadResumeResponse__AbsolutePathBuf,
  V2ThreadResumeResponse__AgentMessageDelivery,
  V2ThreadResumeResponse__AsyncUserInputQuestion,
  V2ThreadResumeResponse__CollabAgentTool,
  V2ThreadResumeResponse__CollabAgentToolCallStatus,
  V2ThreadResumeResponse__CommandExecutionSource,
  V2ThreadResumeResponse__CommandExecutionStatus,
  V2ThreadResumeResponse__DynamicToolCallOutputContentItem,
  V2ThreadResumeResponse__DynamicToolCallStatus,
  V2ThreadResumeResponse__HookPromptFragment,
  V2ThreadResumeResponse__ImageGenerationFailure,
  V2ThreadResumeResponse__LegacyAppPathString,
  V2ThreadResumeResponse__McpToolCallAppContext,
  V2ThreadResumeResponse__McpToolCallError,
  V2ThreadResumeResponse__McpToolCallResult,
  V2ThreadResumeResponse__McpToolCallStatus,
  V2ThreadResumeResponse__MessagePhase,
  V2ThreadResumeResponse__PatchApplyStatus,
  V2ThreadResumeResponse__ReasoningEffort,
  V2ThreadResumeResponse__SubAgentActivityKind,
  V2ThreadResumeResponse__WebSearchAction,
  V2ThreadRevertResponse__AbsolutePathBuf,
  V2ThreadRevertResponse__AgentMessageDelivery,
  V2ThreadRevertResponse__AsyncUserInputQuestion,
  V2ThreadRevertResponse__CollabAgentTool,
  V2ThreadRevertResponse__CollabAgentToolCallStatus,
  V2ThreadRevertResponse__CommandExecutionSource,
  V2ThreadRevertResponse__CommandExecutionStatus,
  V2ThreadRevertResponse__DynamicToolCallOutputContentItem,
  V2ThreadRevertResponse__DynamicToolCallStatus,
  V2ThreadRevertResponse__HookPromptFragment,
  V2ThreadRevertResponse__LegacyAppPathString,
  V2ThreadRevertResponse__McpToolCallAppContext,
  V2ThreadRevertResponse__McpToolCallError,
  V2ThreadRevertResponse__McpToolCallResult,
  V2ThreadRevertResponse__McpToolCallStatus,
  V2ThreadRevertResponse__MessagePhase,
  V2ThreadRevertResponse__PatchApplyStatus,
  V2ThreadRevertResponse__ReasoningEffort,
  V2ThreadRevertResponse__SubAgentActivityKind,
} from "./schema.gen.part4.ts";
import {
  V2ThreadRevertResponse__ImageGenerationFailure,
  V2ThreadRevertResponse__WebSearchAction,
  V2ThreadSettingsUpdatedNotification__AbsolutePathBuf,
  V2ThreadSettingsUpdatedNotification__ActivePermissionProfile,
  V2ThreadSettingsUpdatedNotification__ApprovalsReviewer,
  V2ThreadSettingsUpdatedNotification__AskForApproval,
  V2ThreadSettingsUpdatedNotification__Personality,
  V2ThreadSettingsUpdatedNotification__ReasoningEffort,
  V2ThreadSettingsUpdatedNotification__ReasoningSummary,
  V2ThreadStartResponse__AbsolutePathBuf,
  V2ThreadStartResponse__AgentMessageDelivery,
  V2ThreadStartResponse__AsyncUserInputQuestion,
  V2ThreadStartResponse__CollabAgentTool,
  V2ThreadStartResponse__CollabAgentToolCallStatus,
  V2ThreadStartResponse__CommandExecutionSource,
  V2ThreadStartResponse__CommandExecutionStatus,
  V2ThreadStartResponse__DynamicToolCallOutputContentItem,
  V2ThreadStartResponse__DynamicToolCallStatus,
  V2ThreadStartResponse__HookPromptFragment,
  V2ThreadStartResponse__ImageGenerationFailure,
  V2ThreadStartResponse__LegacyAppPathString,
  V2ThreadStartResponse__McpToolCallAppContext,
  V2ThreadStartResponse__McpToolCallError,
  V2ThreadStartResponse__McpToolCallResult,
  V2ThreadStartResponse__McpToolCallStatus,
  V2ThreadStartResponse__MessagePhase,
  V2ThreadStartResponse__PatchApplyStatus,
  V2ThreadStartResponse__ReasoningEffort,
  V2ThreadStartResponse__SubAgentActivityKind,
  V2ThreadStartResponse__WebSearchAction,
  V2ThreadStartedNotification__AbsolutePathBuf,
  V2ThreadStartedNotification__AgentMessageDelivery,
  V2ThreadStartedNotification__AsyncUserInputQuestion,
  V2ThreadStartedNotification__CollabAgentTool,
  V2ThreadStartedNotification__CollabAgentToolCallStatus,
  V2ThreadStartedNotification__CommandExecutionSource,
  V2ThreadStartedNotification__CommandExecutionStatus,
  V2ThreadStartedNotification__DynamicToolCallOutputContentItem,
  V2ThreadStartedNotification__DynamicToolCallStatus,
  V2ThreadStartedNotification__HookPromptFragment,
  V2ThreadStartedNotification__ImageGenerationFailure,
  V2ThreadStartedNotification__LegacyAppPathString,
  V2ThreadStartedNotification__McpToolCallAppContext,
  V2ThreadStartedNotification__McpToolCallError,
  V2ThreadStartedNotification__McpToolCallResult,
  V2ThreadStartedNotification__McpToolCallStatus,
  V2ThreadStartedNotification__MessagePhase,
  V2ThreadStartedNotification__PatchApplyStatus,
  V2ThreadStartedNotification__ReasoningEffort,
  V2ThreadStartedNotification__SubAgentActivityKind,
  V2ThreadStartedNotification__WebSearchAction,
  V2ThreadTurnsListResponse__AbsolutePathBuf,
  V2ThreadTurnsListResponse__AgentMessageDelivery,
  V2ThreadTurnsListResponse__AsyncUserInputQuestion,
  V2ThreadTurnsListResponse__CollabAgentTool,
  V2ThreadTurnsListResponse__CollabAgentToolCallStatus,
  V2ThreadTurnsListResponse__CommandExecutionSource,
  V2ThreadTurnsListResponse__CommandExecutionStatus,
  V2ThreadTurnsListResponse__DynamicToolCallOutputContentItem,
  V2ThreadTurnsListResponse__DynamicToolCallStatus,
  V2ThreadTurnsListResponse__HookPromptFragment,
  V2ThreadTurnsListResponse__ImageGenerationFailure,
  V2ThreadTurnsListResponse__LegacyAppPathString,
  V2ThreadTurnsListResponse__McpToolCallAppContext,
  V2ThreadTurnsListResponse__McpToolCallError,
  V2ThreadTurnsListResponse__McpToolCallResult,
  V2ThreadTurnsListResponse__McpToolCallStatus,
  V2ThreadTurnsListResponse__MessagePhase,
  V2ThreadTurnsListResponse__PatchApplyStatus,
  V2ThreadTurnsListResponse__ReasoningEffort,
  V2ThreadTurnsListResponse__SubAgentActivityKind,
  V2ThreadTurnsListResponse__WebSearchAction,
} from "./schema.gen.part5.ts";
import {
  V2ThreadResumeResponse__CollabAgentState,
  V2ThreadResumeResponse__CommandAction,
  V2ThreadResumeResponse__FileUpdateChange,
  V2ThreadResumeResponse__McpAppUi,
  V2ThreadResumeResponse__MemoryCitation,
  V2ThreadRevertResponse__CollabAgentState,
  V2ThreadRevertResponse__CommandAction,
  V2ThreadRevertResponse__FileUpdateChange,
  V2ThreadRevertResponse__McpAppUi,
  V2ThreadRevertResponse__MemoryCitation,
  V2ThreadSettingsUpdatedNotification__SandboxPolicy,
  V2ThreadStartResponse__CollabAgentState,
  V2ThreadStartResponse__CommandAction,
  V2ThreadStartResponse__FileUpdateChange,
  V2ThreadStartResponse__McpAppUi,
  V2ThreadStartResponse__MemoryCitation,
  V2ThreadStartedNotification__CollabAgentState,
  V2ThreadStartedNotification__CommandAction,
  V2ThreadStartedNotification__FileUpdateChange,
  V2ThreadStartedNotification__McpAppUi,
  V2ThreadStartedNotification__MemoryCitation,
} from "./schema.gen.part10.ts";
import {
  V2ThreadTurnsListResponse__CollabAgentState,
  V2ThreadTurnsListResponse__CommandAction,
  V2ThreadTurnsListResponse__FileUpdateChange,
  V2ThreadTurnsListResponse__McpAppUi,
  V2ThreadTurnsListResponse__MemoryCitation,
} from "./schema.gen.part11.ts";
import {
  V2ThreadResumeResponse__FunctionCallOutputBody,
  V2ThreadResumeResponse__UserInput,
  V2ThreadRevertResponse__FunctionCallOutputBody,
  V2ThreadRevertResponse__UserInput,
  V2ThreadSettingsUpdatedNotification__CollaborationMode,
  V2ThreadStartResponse__FunctionCallOutputBody,
  V2ThreadStartResponse__UserInput,
  V2ThreadStartedNotification__FunctionCallOutputBody,
  V2ThreadStartedNotification__UserInput,
  V2ThreadTurnsListResponse__FunctionCallOutputBody,
  V2ThreadTurnsListResponse__UserInput,
} from "./schema.gen.part13.ts";

export type V2ThreadResumeResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadResumeResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadResumeResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadResumeResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadResumeResponse__MemoryCitation | null;
      readonly phase?: V2ThreadResumeResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadResumeResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadResumeResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadResumeResponse__CommandAction>;
      readonly cwd: V2ThreadResumeResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadResumeResponse__CommandExecutionSource;
      readonly status: V2ThreadResumeResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadResumeResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadResumeResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadResumeResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadResumeResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadResumeResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadResumeResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadResumeResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadResumeResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadResumeResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadResumeResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadResumeResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadResumeResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadResumeResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadResumeResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadResumeResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadResumeResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadResumeResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadResumeResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadResumeResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadResumeResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadResumeResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadResumeResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadResumeResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2ThreadResumeResponse__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(V2ThreadResumeResponse__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadResumeResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadResumeResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadResumeResponse__LegacyAppPathString> =>
          V2ThreadResumeResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadResumeResponse__CommandExecutionSource> =>
            V2ThreadResumeResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadResumeResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadResumeResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadResumeResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadResumeResponse__McpToolCallAppContext, Schema.Null]),
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
      error: Schema.optionalKey(
        Schema.Union([V2ThreadResumeResponse__McpToolCallError, Schema.Null]),
      ),
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
        Schema.Union([V2ThreadResumeResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadResumeResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadResumeResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadResumeResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadResumeResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, V2ThreadResumeResponse__CollabAgentState).annotate(
        { description: "Last known status of the target agents, when available." },
      ),
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
        Schema.Union([V2ThreadResumeResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadResumeResponse__CollabAgentToolCallStatus> =>
          V2ThreadResumeResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadResumeResponse__CollabAgentTool> =>
          V2ThreadResumeResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadResumeResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadResumeResponse__WebSearchAction, Schema.Null]),
      ),
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
      path: V2ThreadResumeResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadResumeResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadResumeResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadResumeResponse__ThreadItem" });

export type V2ThreadRevertResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadRevertResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadRevertResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadRevertResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadRevertResponse__MemoryCitation | null;
      readonly phase?: V2ThreadRevertResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadRevertResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadRevertResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadRevertResponse__CommandAction>;
      readonly cwd: V2ThreadRevertResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadRevertResponse__CommandExecutionSource;
      readonly status: V2ThreadRevertResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadRevertResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadRevertResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadRevertResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadRevertResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadRevertResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadRevertResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadRevertResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadRevertResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadRevertResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadRevertResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadRevertResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadRevertResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadRevertResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadRevertResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadRevertResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadRevertResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadRevertResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadRevertResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadRevertResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadRevertResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadRevertResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadRevertResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadRevertResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2ThreadRevertResponse__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(V2ThreadRevertResponse__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadRevertResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadRevertResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadRevertResponse__LegacyAppPathString> =>
          V2ThreadRevertResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadRevertResponse__CommandExecutionSource> =>
            V2ThreadRevertResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadRevertResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadRevertResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadRevertResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadRevertResponse__McpToolCallAppContext, Schema.Null]),
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
      error: Schema.optionalKey(
        Schema.Union([V2ThreadRevertResponse__McpToolCallError, Schema.Null]),
      ),
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
        Schema.Union([V2ThreadRevertResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadRevertResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadRevertResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadRevertResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadRevertResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, V2ThreadRevertResponse__CollabAgentState).annotate(
        { description: "Last known status of the target agents, when available." },
      ),
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
        Schema.Union([V2ThreadRevertResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadRevertResponse__CollabAgentToolCallStatus> =>
          V2ThreadRevertResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadRevertResponse__CollabAgentTool> =>
          V2ThreadRevertResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadRevertResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadRevertResponse__WebSearchAction, Schema.Null]),
      ),
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
      path: V2ThreadRevertResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadRevertResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadRevertResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadRevertResponse__ThreadItem" });

export type V2ThreadSettingsUpdatedNotification__ThreadSettings = {
  readonly activePermissionProfile?: V2ThreadSettingsUpdatedNotification__ActivePermissionProfile | null;
  readonly approvalPolicy: V2ThreadSettingsUpdatedNotification__AskForApproval;
  readonly approvalsReviewer: V2ThreadSettingsUpdatedNotification__ApprovalsReviewer;
  readonly collaborationMode: V2ThreadSettingsUpdatedNotification__CollaborationMode;
  readonly cwd: V2ThreadSettingsUpdatedNotification__AbsolutePathBuf;
  readonly disabledPluginIds?: ReadonlyArray<string>;
  readonly effort?: V2ThreadSettingsUpdatedNotification__ReasoningEffort | null;
  readonly model: string;
  readonly modelProvider: string;
  readonly personality?: V2ThreadSettingsUpdatedNotification__Personality | null;
  readonly sandboxPolicy: V2ThreadSettingsUpdatedNotification__SandboxPolicy;
  readonly serviceTier?: string | null;
  readonly summary?: V2ThreadSettingsUpdatedNotification__ReasoningSummary | null;
};
export const V2ThreadSettingsUpdatedNotification__ThreadSettings = Schema.Struct({
  activePermissionProfile: Schema.optionalKey(
    Schema.Union([V2ThreadSettingsUpdatedNotification__ActivePermissionProfile, Schema.Null]),
  ),
  approvalPolicy: V2ThreadSettingsUpdatedNotification__AskForApproval,
  approvalsReviewer: V2ThreadSettingsUpdatedNotification__ApprovalsReviewer,
  collaborationMode: V2ThreadSettingsUpdatedNotification__CollaborationMode,
  cwd: V2ThreadSettingsUpdatedNotification__AbsolutePathBuf,
  disabledPluginIds: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "Saved list of disabled plugin IDs. Does not yet filter plugin capabilities.",
      default: [],
    }),
  ),
  effort: Schema.optionalKey(
    Schema.Union([V2ThreadSettingsUpdatedNotification__ReasoningEffort, Schema.Null]),
  ),
  model: Schema.String,
  modelProvider: Schema.String,
  personality: Schema.optionalKey(
    Schema.Union([V2ThreadSettingsUpdatedNotification__Personality, Schema.Null]).annotate({
      description:
        "@deprecated Reports the saved setting; `friendly` and `pragmatic` no longer select a style.",
    }),
  ),
  sandboxPolicy: V2ThreadSettingsUpdatedNotification__SandboxPolicy,
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  summary: Schema.optionalKey(
    Schema.Union([V2ThreadSettingsUpdatedNotification__ReasoningSummary, Schema.Null]),
  ),
}).annotate({ identifier: "V2ThreadSettingsUpdatedNotification__ThreadSettings" });

export type V2ThreadStartedNotification__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadStartedNotification__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadStartedNotification__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadStartedNotification__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadStartedNotification__MemoryCitation | null;
      readonly phase?: V2ThreadStartedNotification__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadStartedNotification__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadStartedNotification__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadStartedNotification__CommandAction>;
      readonly cwd: V2ThreadStartedNotification__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadStartedNotification__CommandExecutionSource;
      readonly status: V2ThreadStartedNotification__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadStartedNotification__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadStartedNotification__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadStartedNotification__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadStartedNotification__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadStartedNotification__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadStartedNotification__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadStartedNotification__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadStartedNotification__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadStartedNotification__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: {
        readonly [x: string]: V2ThreadStartedNotification__CollabAgentState;
      };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadStartedNotification__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadStartedNotification__CollabAgentToolCallStatus;
      readonly tool: V2ThreadStartedNotification__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadStartedNotification__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadStartedNotification__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadStartedNotification__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadStartedNotification__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadStartedNotification__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadStartedNotification__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadStartedNotification__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadStartedNotification__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadStartedNotification__AsyncUserInputQuestion),
          Schema.Null,
        ]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadStartedNotification__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadStartedNotification__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadStartedNotification__LegacyAppPathString> =>
          V2ThreadStartedNotification__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadStartedNotification__CommandExecutionSource> =>
            V2ThreadStartedNotification__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadStartedNotification__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadStartedNotification__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadStartedNotification__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__McpToolCallAppContext, Schema.Null]),
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
      error: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__McpToolCallError, Schema.Null]),
      ),
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
        Schema.Union([V2ThreadStartedNotification__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadStartedNotification__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadStartedNotification__DynamicToolCallOutputContentItem),
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
      status: V2ThreadStartedNotification__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2ThreadStartedNotification__CollabAgentState,
      ).annotate({ description: "Last known status of the target agents, when available." }),
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
        Schema.Union([V2ThreadStartedNotification__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadStartedNotification__CollabAgentToolCallStatus> =>
          V2ThreadStartedNotification__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadStartedNotification__CollabAgentTool> =>
          V2ThreadStartedNotification__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadStartedNotification__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__WebSearchAction, Schema.Null]),
      ),
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
      path: V2ThreadStartedNotification__LegacyAppPathString,
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
        Schema.Union([V2ThreadStartedNotification__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadStartedNotification__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadStartedNotification__ThreadItem" });

export type V2ThreadStartResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadStartResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadStartResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadStartResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadStartResponse__MemoryCitation | null;
      readonly phase?: V2ThreadStartResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadStartResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadStartResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadStartResponse__CommandAction>;
      readonly cwd: V2ThreadStartResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadStartResponse__CommandExecutionSource;
      readonly status: V2ThreadStartResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadStartResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadStartResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadStartResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadStartResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadStartResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadStartResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadStartResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadStartResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadStartResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadStartResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadStartResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadStartResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadStartResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadStartResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadStartResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadStartResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadStartResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadStartResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadStartResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadStartResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadStartResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadStartResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadStartResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2ThreadStartResponse__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(V2ThreadStartResponse__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadStartResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadStartResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadStartResponse__LegacyAppPathString> =>
          V2ThreadStartResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadStartResponse__CommandExecutionSource> =>
            V2ThreadStartResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadStartResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadStartResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadStartResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadStartResponse__McpToolCallAppContext, Schema.Null]),
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
      error: Schema.optionalKey(
        Schema.Union([V2ThreadStartResponse__McpToolCallError, Schema.Null]),
      ),
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
        Schema.Union([V2ThreadStartResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadStartResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadStartResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadStartResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadStartResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, V2ThreadStartResponse__CollabAgentState).annotate({
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
        Schema.Union([V2ThreadStartResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadStartResponse__CollabAgentToolCallStatus> =>
          V2ThreadStartResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadStartResponse__CollabAgentTool> =>
          V2ThreadStartResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadStartResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadStartResponse__WebSearchAction, Schema.Null]),
      ),
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
      path: V2ThreadStartResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadStartResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadStartResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadStartResponse__ThreadItem" });

export type V2ThreadTurnsListResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadTurnsListResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadTurnsListResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadTurnsListResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadTurnsListResponse__MemoryCitation | null;
      readonly phase?: V2ThreadTurnsListResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadTurnsListResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadTurnsListResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadTurnsListResponse__CommandAction>;
      readonly cwd: V2ThreadTurnsListResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadTurnsListResponse__CommandExecutionSource;
      readonly status: V2ThreadTurnsListResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadTurnsListResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadTurnsListResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadTurnsListResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadTurnsListResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadTurnsListResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadTurnsListResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadTurnsListResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadTurnsListResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadTurnsListResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadTurnsListResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadTurnsListResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadTurnsListResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadTurnsListResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadTurnsListResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadTurnsListResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadTurnsListResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadTurnsListResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadTurnsListResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadTurnsListResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadTurnsListResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadTurnsListResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadTurnsListResponse__AsyncUserInputQuestion),
          Schema.Null,
        ]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadTurnsListResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadTurnsListResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadTurnsListResponse__LegacyAppPathString> =>
          V2ThreadTurnsListResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadTurnsListResponse__CommandExecutionSource> =>
            V2ThreadTurnsListResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadTurnsListResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadTurnsListResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadTurnsListResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__McpToolCallAppContext, Schema.Null]),
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
      error: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__McpToolCallError, Schema.Null]),
      ),
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
        Schema.Union([V2ThreadTurnsListResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadTurnsListResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadTurnsListResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadTurnsListResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2ThreadTurnsListResponse__CollabAgentState,
      ).annotate({ description: "Last known status of the target agents, when available." }),
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
        Schema.Union([V2ThreadTurnsListResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadTurnsListResponse__CollabAgentToolCallStatus> =>
          V2ThreadTurnsListResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadTurnsListResponse__CollabAgentTool> =>
          V2ThreadTurnsListResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadTurnsListResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__WebSearchAction, Schema.Null]),
      ),
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
      path: V2ThreadTurnsListResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadTurnsListResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadTurnsListResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadTurnsListResponse__ThreadItem" });
