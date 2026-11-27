import * as Schema from "effect/Schema";
import {
  ClientRequest__ApprovalsReviewer,
  ClientRequest__AskForApproval,
  ClientRequest__Personality,
  ClientRequest__ReasoningEffort,
  ClientRequest__ReasoningSummary,
  CommandExecutionRequestApprovalParams__LegacyAppPathString,
  PermissionsRequestApprovalParams__LegacyAppPathString,
  PermissionsRequestApprovalResponse__LegacyAppPathString,
  ServerNotification__LegacyAppPathString,
  ServerNotification__TurnItemsView,
  ServerNotification__TurnStatus,
} from "./schema.gen.part0.ts";
import { ServerRequest__LegacyAppPathString } from "./schema.gen.part1.ts";
import {
  V2ThreadUnarchiveResponse__AbsolutePathBuf,
  V2ThreadUnarchiveResponse__AgentMessageDelivery,
  V2ThreadUnarchiveResponse__AsyncUserInputQuestion,
  V2ThreadUnarchiveResponse__CollabAgentTool,
  V2ThreadUnarchiveResponse__CollabAgentToolCallStatus,
  V2ThreadUnarchiveResponse__CommandExecutionSource,
  V2ThreadUnarchiveResponse__CommandExecutionStatus,
  V2ThreadUnarchiveResponse__DynamicToolCallOutputContentItem,
  V2ThreadUnarchiveResponse__DynamicToolCallStatus,
  V2ThreadUnarchiveResponse__HookPromptFragment,
  V2ThreadUnarchiveResponse__ImageGenerationFailure,
  V2ThreadUnarchiveResponse__LegacyAppPathString,
  V2ThreadUnarchiveResponse__McpToolCallAppContext,
  V2ThreadUnarchiveResponse__McpToolCallError,
  V2ThreadUnarchiveResponse__McpToolCallResult,
  V2ThreadUnarchiveResponse__McpToolCallStatus,
  V2ThreadUnarchiveResponse__MessagePhase,
  V2ThreadUnarchiveResponse__PatchApplyStatus,
  V2ThreadUnarchiveResponse__ReasoningEffort,
  V2ThreadUnarchiveResponse__SubAgentActivityKind,
  V2ThreadUnarchiveResponse__WebSearchAction,
  V2TurnCompletedNotification__AgentMessageDelivery,
  V2TurnCompletedNotification__AsyncUserInputQuestion,
  V2TurnCompletedNotification__CommandExecutionSource,
  V2TurnCompletedNotification__CommandExecutionStatus,
  V2TurnCompletedNotification__HookPromptFragment,
  V2TurnCompletedNotification__LegacyAppPathString,
  V2TurnCompletedNotification__MessagePhase,
} from "./schema.gen.part5.ts";
import {
  ClientRequest__SandboxPolicy,
  V2TurnCompletedNotification__AbsolutePathBuf,
  V2TurnCompletedNotification__CollabAgentTool,
  V2TurnCompletedNotification__CollabAgentToolCallStatus,
  V2TurnCompletedNotification__DynamicToolCallOutputContentItem,
  V2TurnCompletedNotification__DynamicToolCallStatus,
  V2TurnCompletedNotification__ImageGenerationFailure,
  V2TurnCompletedNotification__McpToolCallAppContext,
  V2TurnCompletedNotification__McpToolCallError,
  V2TurnCompletedNotification__McpToolCallResult,
  V2TurnCompletedNotification__McpToolCallStatus,
  V2TurnCompletedNotification__PatchApplyStatus,
  V2TurnCompletedNotification__ReasoningEffort,
  V2TurnCompletedNotification__SubAgentActivityKind,
  V2TurnCompletedNotification__WebSearchAction,
  V2TurnStartResponse__AbsolutePathBuf,
  V2TurnStartResponse__AgentMessageDelivery,
  V2TurnStartResponse__AsyncUserInputQuestion,
  V2TurnStartResponse__CollabAgentTool,
  V2TurnStartResponse__CollabAgentToolCallStatus,
  V2TurnStartResponse__CommandExecutionSource,
  V2TurnStartResponse__CommandExecutionStatus,
  V2TurnStartResponse__DynamicToolCallOutputContentItem,
  V2TurnStartResponse__DynamicToolCallStatus,
  V2TurnStartResponse__HookPromptFragment,
  V2TurnStartResponse__ImageGenerationFailure,
  V2TurnStartResponse__LegacyAppPathString,
  V2TurnStartResponse__McpToolCallAppContext,
  V2TurnStartResponse__McpToolCallError,
  V2TurnStartResponse__McpToolCallResult,
  V2TurnStartResponse__McpToolCallStatus,
  V2TurnStartResponse__MessagePhase,
  V2TurnStartResponse__PatchApplyStatus,
  V2TurnStartResponse__ReasoningEffort,
  V2TurnStartResponse__SubAgentActivityKind,
  V2TurnStartResponse__WebSearchAction,
  V2TurnStartedNotification__AbsolutePathBuf,
  V2TurnStartedNotification__AgentMessageDelivery,
  V2TurnStartedNotification__AsyncUserInputQuestion,
  V2TurnStartedNotification__CollabAgentTool,
  V2TurnStartedNotification__CollabAgentToolCallStatus,
  V2TurnStartedNotification__CommandExecutionSource,
  V2TurnStartedNotification__CommandExecutionStatus,
  V2TurnStartedNotification__DynamicToolCallOutputContentItem,
  V2TurnStartedNotification__DynamicToolCallStatus,
  V2TurnStartedNotification__HookPromptFragment,
  V2TurnStartedNotification__ImageGenerationFailure,
  V2TurnStartedNotification__LegacyAppPathString,
  V2TurnStartedNotification__McpToolCallAppContext,
  V2TurnStartedNotification__McpToolCallError,
  V2TurnStartedNotification__McpToolCallResult,
  V2TurnStartedNotification__McpToolCallStatus,
  V2TurnStartedNotification__MessagePhase,
  V2TurnStartedNotification__PatchApplyStatus,
  V2TurnStartedNotification__ReasoningEffort,
  V2TurnStartedNotification__SubAgentActivityKind,
  V2TurnStartedNotification__WebSearchAction,
} from "./schema.gen.part6.ts";
import {
  McpServerElicitationRequestParams__McpElicitationLegacyTitledEnumSchema,
  ServerRequest__McpElicitationLegacyTitledEnumSchema,
} from "./schema.gen.part7.ts";
import {
  ClientRequest__UserInput,
  McpServerElicitationRequestParams__McpElicitationSingleSelectEnumSchema,
  V2ThreadUnarchiveResponse__CollabAgentState,
  V2ThreadUnarchiveResponse__CommandAction,
  V2ThreadUnarchiveResponse__FileUpdateChange,
  V2ThreadUnarchiveResponse__McpAppUi,
  V2ThreadUnarchiveResponse__MemoryCitation,
  V2TurnCompletedNotification__CollabAgentState,
  V2TurnCompletedNotification__CommandAction,
  V2TurnCompletedNotification__FileUpdateChange,
  V2TurnCompletedNotification__McpAppUi,
  V2TurnCompletedNotification__MemoryCitation,
  V2TurnStartResponse__CollabAgentState,
  V2TurnStartResponse__CommandAction,
  V2TurnStartResponse__FileUpdateChange,
  V2TurnStartResponse__McpAppUi,
  V2TurnStartResponse__MemoryCitation,
  V2TurnStartedNotification__CollabAgentState,
  V2TurnStartedNotification__CommandAction,
  V2TurnStartedNotification__FileUpdateChange,
  V2TurnStartedNotification__McpAppUi,
  V2TurnStartedNotification__MemoryCitation,
} from "./schema.gen.part11.ts";
import {
  ServerNotification__TurnError,
  ServerRequest__McpElicitationSingleSelectEnumSchema,
} from "./schema.gen.part12.ts";
import {
  ClientRequest__TurnToolOutput,
  CommandExecutionRequestApprovalParams__FileSystemSandboxEntry,
  McpServerElicitationRequestParams__McpElicitationMultiSelectEnumSchema,
  PermissionsRequestApprovalParams__FileSystemSandboxEntry,
  PermissionsRequestApprovalResponse__FileSystemSandboxEntry,
  ServerNotification__FileSystemSandboxEntry,
  ServerNotification__ThreadItem,
  ServerNotification__ThreadSettings,
  ServerRequest__FileSystemSandboxEntry,
  ServerRequest__McpElicitationMultiSelectEnumSchema,
  V2ThreadUnarchiveResponse__FunctionCallOutputBody,
  V2ThreadUnarchiveResponse__UserInput,
  V2TurnCompletedNotification__FunctionCallOutputBody,
  V2TurnCompletedNotification__UserInput,
  V2TurnStartParams__FunctionCallOutputBody,
  V2TurnStartResponse__FunctionCallOutputBody,
  V2TurnStartResponse__UserInput,
  V2TurnStartedNotification__FunctionCallOutputBody,
  V2TurnStartedNotification__UserInput,
} from "./schema.gen.part13.ts";

export type V2ThreadUnarchiveResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadUnarchiveResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadUnarchiveResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadUnarchiveResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadUnarchiveResponse__MemoryCitation | null;
      readonly phase?: V2ThreadUnarchiveResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadUnarchiveResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadUnarchiveResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadUnarchiveResponse__CommandAction>;
      readonly cwd: V2ThreadUnarchiveResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadUnarchiveResponse__CommandExecutionSource;
      readonly status: V2ThreadUnarchiveResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadUnarchiveResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadUnarchiveResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadUnarchiveResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadUnarchiveResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadUnarchiveResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadUnarchiveResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadUnarchiveResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadUnarchiveResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadUnarchiveResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadUnarchiveResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadUnarchiveResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadUnarchiveResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadUnarchiveResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadUnarchiveResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadUnarchiveResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadUnarchiveResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadUnarchiveResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadUnarchiveResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadUnarchiveResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadUnarchiveResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadUnarchiveResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadUnarchiveResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadUnarchiveResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2ThreadUnarchiveResponse__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadUnarchiveResponse__AsyncUserInputQuestion),
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
      output: V2ThreadUnarchiveResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadUnarchiveResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadUnarchiveResponse__LegacyAppPathString> =>
          V2ThreadUnarchiveResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadUnarchiveResponse__CommandExecutionSource> =>
            V2ThreadUnarchiveResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadUnarchiveResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadUnarchiveResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadUnarchiveResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadUnarchiveResponse__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ThreadUnarchiveResponse__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ThreadUnarchiveResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadUnarchiveResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadUnarchiveResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadUnarchiveResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadUnarchiveResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2ThreadUnarchiveResponse__CollabAgentState,
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
        Schema.Union([V2ThreadUnarchiveResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadUnarchiveResponse__CollabAgentToolCallStatus> =>
          V2ThreadUnarchiveResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadUnarchiveResponse__CollabAgentTool> =>
          V2ThreadUnarchiveResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadUnarchiveResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadUnarchiveResponse__WebSearchAction, Schema.Null]),
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
      path: V2ThreadUnarchiveResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadUnarchiveResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadUnarchiveResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadUnarchiveResponse__ThreadItem" });

export type V2TurnCompletedNotification__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2TurnCompletedNotification__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2TurnCompletedNotification__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2TurnCompletedNotification__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2TurnCompletedNotification__MemoryCitation | null;
      readonly phase?: V2TurnCompletedNotification__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2TurnCompletedNotification__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2TurnCompletedNotification__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2TurnCompletedNotification__CommandAction>;
      readonly cwd: V2TurnCompletedNotification__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2TurnCompletedNotification__CommandExecutionSource;
      readonly status: V2TurnCompletedNotification__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2TurnCompletedNotification__FileUpdateChange>;
      readonly id: string;
      readonly status: V2TurnCompletedNotification__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2TurnCompletedNotification__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2TurnCompletedNotification__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2TurnCompletedNotification__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2TurnCompletedNotification__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2TurnCompletedNotification__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2TurnCompletedNotification__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2TurnCompletedNotification__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: {
        readonly [x: string]: V2TurnCompletedNotification__CollabAgentState;
      };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2TurnCompletedNotification__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2TurnCompletedNotification__CollabAgentToolCallStatus;
      readonly tool: V2TurnCompletedNotification__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2TurnCompletedNotification__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2TurnCompletedNotification__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2TurnCompletedNotification__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2TurnCompletedNotification__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2TurnCompletedNotification__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2TurnCompletedNotification__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2TurnCompletedNotification__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2TurnCompletedNotification__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2TurnCompletedNotification__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2TurnCompletedNotification__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2TurnCompletedNotification__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2TurnCompletedNotification__AsyncUserInputQuestion),
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
      output: V2TurnCompletedNotification__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2TurnCompletedNotification__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2TurnCompletedNotification__LegacyAppPathString> =>
          V2TurnCompletedNotification__LegacyAppPathString,
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
          (): Schema.Codec<V2TurnCompletedNotification__CommandExecutionSource> =>
            V2TurnCompletedNotification__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2TurnCompletedNotification__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2TurnCompletedNotification__FileUpdateChange),
      id: Schema.String,
      status: V2TurnCompletedNotification__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2TurnCompletedNotification__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2TurnCompletedNotification__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2TurnCompletedNotification__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2TurnCompletedNotification__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2TurnCompletedNotification__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2TurnCompletedNotification__DynamicToolCallOutputContentItem),
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
      status: V2TurnCompletedNotification__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2TurnCompletedNotification__CollabAgentState,
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
        Schema.Union([V2TurnCompletedNotification__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2TurnCompletedNotification__CollabAgentToolCallStatus> =>
          V2TurnCompletedNotification__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2TurnCompletedNotification__CollabAgentTool> =>
          V2TurnCompletedNotification__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2TurnCompletedNotification__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2TurnCompletedNotification__WebSearchAction, Schema.Null]),
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
      path: V2TurnCompletedNotification__LegacyAppPathString,
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
        Schema.Union([V2TurnCompletedNotification__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2TurnCompletedNotification__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2TurnCompletedNotification__ThreadItem" });

export type V2TurnStartedNotification__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2TurnStartedNotification__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2TurnStartedNotification__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2TurnStartedNotification__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2TurnStartedNotification__MemoryCitation | null;
      readonly phase?: V2TurnStartedNotification__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2TurnStartedNotification__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2TurnStartedNotification__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2TurnStartedNotification__CommandAction>;
      readonly cwd: V2TurnStartedNotification__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2TurnStartedNotification__CommandExecutionSource;
      readonly status: V2TurnStartedNotification__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2TurnStartedNotification__FileUpdateChange>;
      readonly id: string;
      readonly status: V2TurnStartedNotification__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2TurnStartedNotification__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2TurnStartedNotification__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2TurnStartedNotification__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2TurnStartedNotification__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2TurnStartedNotification__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2TurnStartedNotification__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2TurnStartedNotification__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2TurnStartedNotification__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2TurnStartedNotification__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2TurnStartedNotification__CollabAgentToolCallStatus;
      readonly tool: V2TurnStartedNotification__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2TurnStartedNotification__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2TurnStartedNotification__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2TurnStartedNotification__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2TurnStartedNotification__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2TurnStartedNotification__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2TurnStartedNotification__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2TurnStartedNotification__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2TurnStartedNotification__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2TurnStartedNotification__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2TurnStartedNotification__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2TurnStartedNotification__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2TurnStartedNotification__AsyncUserInputQuestion),
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
      output: V2TurnStartedNotification__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2TurnStartedNotification__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2TurnStartedNotification__LegacyAppPathString> =>
          V2TurnStartedNotification__LegacyAppPathString,
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
          (): Schema.Codec<V2TurnStartedNotification__CommandExecutionSource> =>
            V2TurnStartedNotification__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2TurnStartedNotification__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2TurnStartedNotification__FileUpdateChange),
      id: Schema.String,
      status: V2TurnStartedNotification__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2TurnStartedNotification__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2TurnStartedNotification__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2TurnStartedNotification__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2TurnStartedNotification__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2TurnStartedNotification__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2TurnStartedNotification__DynamicToolCallOutputContentItem),
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
      status: V2TurnStartedNotification__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2TurnStartedNotification__CollabAgentState,
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
        Schema.Union([V2TurnStartedNotification__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2TurnStartedNotification__CollabAgentToolCallStatus> =>
          V2TurnStartedNotification__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2TurnStartedNotification__CollabAgentTool> =>
          V2TurnStartedNotification__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2TurnStartedNotification__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2TurnStartedNotification__WebSearchAction, Schema.Null]),
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
      path: V2TurnStartedNotification__LegacyAppPathString,
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
        Schema.Union([V2TurnStartedNotification__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2TurnStartedNotification__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2TurnStartedNotification__ThreadItem" });

export type V2TurnStartParams__TurnToolOutput = {
  readonly name: string;
  readonly namespace?: string | null;
  readonly output: V2TurnStartParams__FunctionCallOutputBody;
};
export const V2TurnStartParams__TurnToolOutput = Schema.Struct({
  name: Schema.String,
  namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  output: V2TurnStartParams__FunctionCallOutputBody,
}).annotate({ identifier: "V2TurnStartParams__TurnToolOutput" });

export type V2TurnStartResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2TurnStartResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2TurnStartResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2TurnStartResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2TurnStartResponse__MemoryCitation | null;
      readonly phase?: V2TurnStartResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2TurnStartResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2TurnStartResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2TurnStartResponse__CommandAction>;
      readonly cwd: V2TurnStartResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2TurnStartResponse__CommandExecutionSource;
      readonly status: V2TurnStartResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2TurnStartResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2TurnStartResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2TurnStartResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2TurnStartResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2TurnStartResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2TurnStartResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2TurnStartResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2TurnStartResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2TurnStartResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2TurnStartResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2TurnStartResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2TurnStartResponse__CollabAgentToolCallStatus;
      readonly tool: V2TurnStartResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2TurnStartResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2TurnStartResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2TurnStartResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2TurnStartResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2TurnStartResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2TurnStartResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2TurnStartResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2TurnStartResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2TurnStartResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2TurnStartResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2TurnStartResponse__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(V2TurnStartResponse__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2TurnStartResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2TurnStartResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2TurnStartResponse__LegacyAppPathString> =>
          V2TurnStartResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2TurnStartResponse__CommandExecutionSource> =>
            V2TurnStartResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2TurnStartResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2TurnStartResponse__FileUpdateChange),
      id: Schema.String,
      status: V2TurnStartResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2TurnStartResponse__McpToolCallAppContext, Schema.Null]),
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
      error: Schema.optionalKey(Schema.Union([V2TurnStartResponse__McpToolCallError, Schema.Null])),
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
        Schema.Union([V2TurnStartResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2TurnStartResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2TurnStartResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2TurnStartResponse__DynamicToolCallOutputContentItem),
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
      status: V2TurnStartResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, V2TurnStartResponse__CollabAgentState).annotate({
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
        Schema.Union([V2TurnStartResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2TurnStartResponse__CollabAgentToolCallStatus> =>
          V2TurnStartResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2TurnStartResponse__CollabAgentTool> =>
          V2TurnStartResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2TurnStartResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(Schema.Union([V2TurnStartResponse__WebSearchAction, Schema.Null])),
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
      path: V2TurnStartResponse__LegacyAppPathString,
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
        Schema.Union([V2TurnStartResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2TurnStartResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2TurnStartResponse__ThreadItem" });

export type ClientRequest__TurnStartParams = {
  readonly approvalPolicy?: ClientRequest__AskForApproval | null;
  readonly approvalsReviewer?: ClientRequest__ApprovalsReviewer | null;
  readonly clientUserMessageId?: string | null;
  readonly cwd?: string | null;
  readonly disabledPluginIds?: ReadonlyArray<string> | null;
  readonly effort?: ClientRequest__ReasoningEffort | null;
  readonly input: ReadonlyArray<ClientRequest__UserInput>;
  readonly model?: string | null;
  readonly outputSchema?: Schema.Json;
  readonly personality?: ClientRequest__Personality | null;
  readonly sandboxPolicy?: ClientRequest__SandboxPolicy | null;
  readonly serviceTier?: string | null;
  readonly serviceTierForTurn?: string | null;
  readonly summary?: ClientRequest__ReasoningSummary | null;
  readonly threadId: string;
  readonly toolOutput?: ClientRequest__TurnToolOutput | null;
  readonly turnTrigger?: string | null;
};
export const ClientRequest__TurnStartParams = Schema.Struct({
  approvalPolicy: Schema.optionalKey(
    Schema.Union([ClientRequest__AskForApproval, Schema.Null]).annotate({
      description: "Override the approval policy for this turn and subsequent turns.",
    }),
  ),
  approvalsReviewer: Schema.optionalKey(
    Schema.Union([ClientRequest__ApprovalsReviewer, Schema.Null]).annotate({
      description:
        "Override where approval requests are routed for review on this turn and subsequent turns.",
    }),
  ),
  clientUserMessageId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Override the working directory for this turn and subsequent turns.",
      }),
      Schema.Null,
    ]),
  ),
  disabledPluginIds: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Replace this thread's disabled plugin IDs. Omitted/null preserves the list; [] clears it.",
      }),
      Schema.Null,
    ]),
  ),
  effort: Schema.optionalKey(
    Schema.Union([ClientRequest__ReasoningEffort, Schema.Null]).annotate({
      description: "Override the reasoning effort for this turn and subsequent turns.",
    }),
  ),
  input: Schema.Array(ClientRequest__UserInput),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Override the model for this turn and subsequent turns.",
      }),
      Schema.Null,
    ]),
  ),
  outputSchema: Schema.optionalKey(
    Schema.Json.annotate({
      expected: "JSON value",
      description:
        "Optional JSON Schema used to constrain the final assistant message for this turn.",
    }),
  ),
  personality: Schema.optionalKey(
    Schema.Union([ClientRequest__Personality, Schema.Null]).annotate({
      description:
        "@deprecated `friendly` and `pragmatic` no longer select a style. Changing this does not rewrite the thread's existing instructions.",
    }),
  ),
  sandboxPolicy: Schema.optionalKey(
    Schema.Union([ClientRequest__SandboxPolicy, Schema.Null]).annotate({
      description: "Override the sandbox policy for this turn and subsequent turns.",
    }),
  ),
  serviceTier: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Override the service tier for this turn and subsequent turns.",
      }),
      Schema.Null,
    ]),
  ),
  serviceTierForTurn: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Override the service tier only when this request starts a new turn. Use \"default\" for standard speed. Omitted or null inherits the thread's tier. Does not change the thread's tier or a turn being steered.",
      }),
      Schema.Null,
    ]),
  ),
  summary: Schema.optionalKey(
    Schema.Union([ClientRequest__ReasoningSummary, Schema.Null]).annotate({
      description: "Override the reasoning summary for this turn and subsequent turns.",
    }),
  ),
  threadId: Schema.String,
  toolOutput: Schema.optionalKey(Schema.Union([ClientRequest__TurnToolOutput, Schema.Null])),
  turnTrigger: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional source classification for the caller that starts this turn. Ignored when this request steers an already-active turn.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ClientRequest__TurnStartParams" });

export type CommandExecutionRequestApprovalParams__AdditionalFileSystemPermissions = {
  readonly entries?: ReadonlyArray<CommandExecutionRequestApprovalParams__FileSystemSandboxEntry> | null;
  readonly globScanMaxDepth?: number | null;
  readonly read?: ReadonlyArray<CommandExecutionRequestApprovalParams__LegacyAppPathString> | null;
  readonly write?: ReadonlyArray<CommandExecutionRequestApprovalParams__LegacyAppPathString> | null;
};
export const CommandExecutionRequestApprovalParams__AdditionalFileSystemPermissions = Schema.Struct(
  {
    entries: Schema.optionalKey(
      Schema.Union([
        Schema.Array(CommandExecutionRequestApprovalParams__FileSystemSandboxEntry),
        Schema.Null,
      ]),
    ),
    globScanMaxDepth: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({ format: "uint" })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(1).annotate({
              expected: "a value greater than or equal to 1",
            }),
          ),
        Schema.Null,
      ]),
    ),
    read: Schema.optionalKey(
      Schema.Union([
        Schema.Array(CommandExecutionRequestApprovalParams__LegacyAppPathString).annotate({
          description: "This will be removed in favor of `entries`.",
        }),
        Schema.Null,
      ]),
    ),
    write: Schema.optionalKey(
      Schema.Union([
        Schema.Array(CommandExecutionRequestApprovalParams__LegacyAppPathString).annotate({
          description: "This will be removed in favor of `entries`.",
        }),
        Schema.Null,
      ]),
    ),
  },
).annotate({
  identifier: "CommandExecutionRequestApprovalParams__AdditionalFileSystemPermissions",
});

export type McpServerElicitationRequestParams__McpElicitationEnumSchema =
  | McpServerElicitationRequestParams__McpElicitationSingleSelectEnumSchema
  | McpServerElicitationRequestParams__McpElicitationMultiSelectEnumSchema
  | McpServerElicitationRequestParams__McpElicitationLegacyTitledEnumSchema;
export const McpServerElicitationRequestParams__McpElicitationEnumSchema = Schema.Union([
  McpServerElicitationRequestParams__McpElicitationSingleSelectEnumSchema,
  McpServerElicitationRequestParams__McpElicitationMultiSelectEnumSchema,
  McpServerElicitationRequestParams__McpElicitationLegacyTitledEnumSchema,
]).annotate({ identifier: "McpServerElicitationRequestParams__McpElicitationEnumSchema" });

export type PermissionsRequestApprovalParams__AdditionalFileSystemPermissions = {
  readonly entries?: ReadonlyArray<PermissionsRequestApprovalParams__FileSystemSandboxEntry> | null;
  readonly globScanMaxDepth?: number | null;
  readonly read?: ReadonlyArray<PermissionsRequestApprovalParams__LegacyAppPathString> | null;
  readonly write?: ReadonlyArray<PermissionsRequestApprovalParams__LegacyAppPathString> | null;
};
export const PermissionsRequestApprovalParams__AdditionalFileSystemPermissions = Schema.Struct({
  entries: Schema.optionalKey(
    Schema.Union([
      Schema.Array(PermissionsRequestApprovalParams__FileSystemSandboxEntry),
      Schema.Null,
    ]),
  ),
  globScanMaxDepth: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "uint" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        ),
      Schema.Null,
    ]),
  ),
  read: Schema.optionalKey(
    Schema.Union([
      Schema.Array(PermissionsRequestApprovalParams__LegacyAppPathString).annotate({
        description: "This will be removed in favor of `entries`.",
      }),
      Schema.Null,
    ]),
  ),
  write: Schema.optionalKey(
    Schema.Union([
      Schema.Array(PermissionsRequestApprovalParams__LegacyAppPathString).annotate({
        description: "This will be removed in favor of `entries`.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "PermissionsRequestApprovalParams__AdditionalFileSystemPermissions" });

export type PermissionsRequestApprovalResponse__AdditionalFileSystemPermissions = {
  readonly entries?: ReadonlyArray<PermissionsRequestApprovalResponse__FileSystemSandboxEntry> | null;
  readonly globScanMaxDepth?: number | null;
  readonly read?: ReadonlyArray<PermissionsRequestApprovalResponse__LegacyAppPathString> | null;
  readonly write?: ReadonlyArray<PermissionsRequestApprovalResponse__LegacyAppPathString> | null;
};
export const PermissionsRequestApprovalResponse__AdditionalFileSystemPermissions = Schema.Struct({
  entries: Schema.optionalKey(
    Schema.Union([
      Schema.Array(PermissionsRequestApprovalResponse__FileSystemSandboxEntry),
      Schema.Null,
    ]),
  ),
  globScanMaxDepth: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "uint" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        ),
      Schema.Null,
    ]),
  ),
  read: Schema.optionalKey(
    Schema.Union([
      Schema.Array(PermissionsRequestApprovalResponse__LegacyAppPathString).annotate({
        description: "This will be removed in favor of `entries`.",
      }),
      Schema.Null,
    ]),
  ),
  write: Schema.optionalKey(
    Schema.Union([
      Schema.Array(PermissionsRequestApprovalResponse__LegacyAppPathString).annotate({
        description: "This will be removed in favor of `entries`.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "PermissionsRequestApprovalResponse__AdditionalFileSystemPermissions" });

export type ServerNotification__ThreadSettingsUpdatedNotification = {
  readonly threadId: string;
  readonly threadSettings: ServerNotification__ThreadSettings;
};
export const ServerNotification__ThreadSettingsUpdatedNotification = Schema.Struct({
  threadId: Schema.String,
  threadSettings: ServerNotification__ThreadSettings,
}).annotate({ identifier: "ServerNotification__ThreadSettingsUpdatedNotification" });

export type ServerNotification__Turn = {
  readonly completedAt?: number | null;
  readonly durationMs?: number | null;
  readonly error?: ServerNotification__TurnError | null;
  readonly id: string;
  readonly items: ReadonlyArray<ServerNotification__ThreadItem>;
  readonly itemsView?: ServerNotification__TurnItemsView;
  readonly startedAt?: number | null;
  readonly status: ServerNotification__TurnStatus;
};
export const ServerNotification__Turn = Schema.Struct({
  completedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn completed.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  durationMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Duration between turn start and completion in milliseconds, if known.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  error: Schema.optionalKey(
    Schema.Union([ServerNotification__TurnError, Schema.Null]).annotate({
      description: "Error associated with a failed or interrupted turn.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this turn. Codex-generated turn IDs are UUIDv7.",
  }),
  items: Schema.Array(ServerNotification__ThreadItem).annotate({
    description: "Thread items currently included in this turn payload.",
  }),
  itemsView: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<ServerNotification__TurnItemsView> => ServerNotification__TurnItemsView,
    ).annotate({
      description: "Describes how much of `items` has been loaded for this turn.",
      default: "full",
    }),
  ),
  startedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) when the turn started.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  status: ServerNotification__TurnStatus,
}).annotate({ identifier: "ServerNotification__Turn" });

export type ServerNotification__ItemStartedNotification = {
  readonly item: ServerNotification__ThreadItem;
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__ItemStartedNotification = Schema.Struct({
  item: ServerNotification__ThreadItem,
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this item lifecycle started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__ItemStartedNotification" });

export type ServerNotification__ItemCompletedNotification = {
  readonly completedAtMs: number;
  readonly item: ServerNotification__ThreadItem;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__ItemCompletedNotification = Schema.Struct({
  completedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this item lifecycle completed.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  item: ServerNotification__ThreadItem,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerNotification__ItemCompletedNotification" });

export type ServerNotification__AdditionalFileSystemPermissions = {
  readonly entries?: ReadonlyArray<ServerNotification__FileSystemSandboxEntry> | null;
  readonly globScanMaxDepth?: number | null;
  readonly read?: ReadonlyArray<ServerNotification__LegacyAppPathString> | null;
  readonly write?: ReadonlyArray<ServerNotification__LegacyAppPathString> | null;
};
export const ServerNotification__AdditionalFileSystemPermissions = Schema.Struct({
  entries: Schema.optionalKey(
    Schema.Union([Schema.Array(ServerNotification__FileSystemSandboxEntry), Schema.Null]),
  ),
  globScanMaxDepth: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "uint" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        ),
      Schema.Null,
    ]),
  ),
  read: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ServerNotification__LegacyAppPathString).annotate({
        description: "This will be removed in favor of `entries`.",
      }),
      Schema.Null,
    ]),
  ),
  write: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ServerNotification__LegacyAppPathString).annotate({
        description: "This will be removed in favor of `entries`.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ServerNotification__AdditionalFileSystemPermissions" });

export type ServerRequest__AdditionalFileSystemPermissions = {
  readonly entries?: ReadonlyArray<ServerRequest__FileSystemSandboxEntry> | null;
  readonly globScanMaxDepth?: number | null;
  readonly read?: ReadonlyArray<ServerRequest__LegacyAppPathString> | null;
  readonly write?: ReadonlyArray<ServerRequest__LegacyAppPathString> | null;
};
export const ServerRequest__AdditionalFileSystemPermissions = Schema.Struct({
  entries: Schema.optionalKey(
    Schema.Union([Schema.Array(ServerRequest__FileSystemSandboxEntry), Schema.Null]),
  ),
  globScanMaxDepth: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "uint" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        ),
      Schema.Null,
    ]),
  ),
  read: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ServerRequest__LegacyAppPathString).annotate({
        description: "This will be removed in favor of `entries`.",
      }),
      Schema.Null,
    ]),
  ),
  write: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ServerRequest__LegacyAppPathString).annotate({
        description: "This will be removed in favor of `entries`.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "ServerRequest__AdditionalFileSystemPermissions" });

export type ServerRequest__McpElicitationEnumSchema =
  | ServerRequest__McpElicitationSingleSelectEnumSchema
  | ServerRequest__McpElicitationMultiSelectEnumSchema
  | ServerRequest__McpElicitationLegacyTitledEnumSchema;
export const ServerRequest__McpElicitationEnumSchema = Schema.Union([
  ServerRequest__McpElicitationSingleSelectEnumSchema,
  ServerRequest__McpElicitationMultiSelectEnumSchema,
  ServerRequest__McpElicitationLegacyTitledEnumSchema,
]).annotate({ identifier: "ServerRequest__McpElicitationEnumSchema" });
