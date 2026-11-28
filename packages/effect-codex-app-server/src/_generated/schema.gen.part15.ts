/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  V2ThreadForkResponse__AbsolutePathBuf,
  V2ThreadForkResponse__AgentMessageDelivery,
  V2ThreadForkResponse__AsyncUserInputQuestion,
  V2ThreadForkResponse__CollabAgentTool,
  V2ThreadForkResponse__CollabAgentToolCallStatus,
  V2ThreadForkResponse__CommandExecutionSource,
  V2ThreadForkResponse__CommandExecutionStatus,
  V2ThreadForkResponse__DynamicToolCallOutputContentItem,
  V2ThreadForkResponse__DynamicToolCallStatus,
  V2ThreadForkResponse__HookPromptFragment,
  V2ThreadForkResponse__ImageGenerationFailure,
  V2ThreadForkResponse__LegacyAppPathString,
  V2ThreadForkResponse__McpToolCallAppContext,
  V2ThreadForkResponse__McpToolCallError,
  V2ThreadForkResponse__McpToolCallResult,
  V2ThreadForkResponse__McpToolCallStatus,
  V2ThreadForkResponse__MessagePhase,
  V2ThreadForkResponse__PatchApplyStatus,
  V2ThreadForkResponse__ReasoningEffort,
  V2ThreadForkResponse__SubAgentActivityKind,
  V2ThreadForkResponse__WebSearchAction,
  V2ThreadItemsListResponse__AbsolutePathBuf,
  V2ThreadItemsListResponse__AgentMessageDelivery,
  V2ThreadItemsListResponse__AsyncUserInputQuestion,
  V2ThreadItemsListResponse__CollabAgentTool,
  V2ThreadItemsListResponse__CollabAgentToolCallStatus,
  V2ThreadItemsListResponse__CommandExecutionSource,
  V2ThreadItemsListResponse__CommandExecutionStatus,
  V2ThreadItemsListResponse__DynamicToolCallOutputContentItem,
  V2ThreadItemsListResponse__DynamicToolCallStatus,
  V2ThreadItemsListResponse__HookPromptFragment,
  V2ThreadItemsListResponse__ImageGenerationFailure,
  V2ThreadItemsListResponse__LegacyAppPathString,
  V2ThreadItemsListResponse__McpToolCallAppContext,
  V2ThreadItemsListResponse__McpToolCallError,
  V2ThreadItemsListResponse__McpToolCallResult,
  V2ThreadItemsListResponse__McpToolCallStatus,
  V2ThreadItemsListResponse__MessagePhase,
  V2ThreadItemsListResponse__PatchApplyStatus,
  V2ThreadItemsListResponse__ReasoningEffort,
  V2ThreadItemsListResponse__SubAgentActivityKind,
  V2ThreadItemsListResponse__WebSearchAction,
  V2ThreadListResponse__AbsolutePathBuf,
  V2ThreadListResponse__AgentMessageDelivery,
  V2ThreadListResponse__AsyncUserInputQuestion,
  V2ThreadListResponse__CommandExecutionSource,
  V2ThreadListResponse__CommandExecutionStatus,
  V2ThreadListResponse__HookPromptFragment,
  V2ThreadListResponse__LegacyAppPathString,
  V2ThreadListResponse__McpToolCallAppContext,
  V2ThreadListResponse__McpToolCallError,
  V2ThreadListResponse__MessagePhase,
  V2ThreadListResponse__PatchApplyStatus,
  V2ThreadListResponse__ReasoningEffort,
} from "./schema.gen.part3.ts";
import {
  V2ThreadListResponse__CollabAgentTool,
  V2ThreadListResponse__CollabAgentToolCallStatus,
  V2ThreadListResponse__DynamicToolCallOutputContentItem,
  V2ThreadListResponse__DynamicToolCallStatus,
  V2ThreadListResponse__ImageGenerationFailure,
  V2ThreadListResponse__McpToolCallResult,
  V2ThreadListResponse__McpToolCallStatus,
  V2ThreadListResponse__SubAgentActivityKind,
  V2ThreadListResponse__WebSearchAction,
  V2ThreadMetadataUpdateResponse__AbsolutePathBuf,
  V2ThreadMetadataUpdateResponse__AgentMessageDelivery,
  V2ThreadMetadataUpdateResponse__AsyncUserInputQuestion,
  V2ThreadMetadataUpdateResponse__CollabAgentTool,
  V2ThreadMetadataUpdateResponse__CollabAgentToolCallStatus,
  V2ThreadMetadataUpdateResponse__CommandExecutionSource,
  V2ThreadMetadataUpdateResponse__CommandExecutionStatus,
  V2ThreadMetadataUpdateResponse__DynamicToolCallOutputContentItem,
  V2ThreadMetadataUpdateResponse__DynamicToolCallStatus,
  V2ThreadMetadataUpdateResponse__HookPromptFragment,
  V2ThreadMetadataUpdateResponse__ImageGenerationFailure,
  V2ThreadMetadataUpdateResponse__LegacyAppPathString,
  V2ThreadMetadataUpdateResponse__McpToolCallAppContext,
  V2ThreadMetadataUpdateResponse__McpToolCallError,
  V2ThreadMetadataUpdateResponse__McpToolCallResult,
  V2ThreadMetadataUpdateResponse__McpToolCallStatus,
  V2ThreadMetadataUpdateResponse__MessagePhase,
  V2ThreadMetadataUpdateResponse__PatchApplyStatus,
  V2ThreadMetadataUpdateResponse__ReasoningEffort,
  V2ThreadMetadataUpdateResponse__SubAgentActivityKind,
  V2ThreadMetadataUpdateResponse__WebSearchAction,
  V2ThreadReadResponse__AbsolutePathBuf,
  V2ThreadReadResponse__AgentMessageDelivery,
  V2ThreadReadResponse__AsyncUserInputQuestion,
  V2ThreadReadResponse__CollabAgentTool,
  V2ThreadReadResponse__CollabAgentToolCallStatus,
  V2ThreadReadResponse__CommandExecutionSource,
  V2ThreadReadResponse__CommandExecutionStatus,
  V2ThreadReadResponse__DynamicToolCallOutputContentItem,
  V2ThreadReadResponse__DynamicToolCallStatus,
  V2ThreadReadResponse__HookPromptFragment,
  V2ThreadReadResponse__ImageGenerationFailure,
  V2ThreadReadResponse__LegacyAppPathString,
  V2ThreadReadResponse__McpToolCallAppContext,
  V2ThreadReadResponse__McpToolCallError,
  V2ThreadReadResponse__McpToolCallResult,
  V2ThreadReadResponse__McpToolCallStatus,
  V2ThreadReadResponse__MessagePhase,
  V2ThreadReadResponse__PatchApplyStatus,
  V2ThreadReadResponse__ReasoningEffort,
  V2ThreadReadResponse__SubAgentActivityKind,
  V2ThreadReadResponse__WebSearchAction,
} from "./schema.gen.part4.ts";
import {
  V2ThreadForkResponse__CollabAgentState,
  V2ThreadForkResponse__CommandAction,
  V2ThreadForkResponse__FileUpdateChange,
  V2ThreadForkResponse__McpAppUi,
  V2ThreadForkResponse__MemoryCitation,
  V2ThreadItemsListResponse__CollabAgentState,
  V2ThreadItemsListResponse__CommandAction,
  V2ThreadItemsListResponse__FileUpdateChange,
  V2ThreadItemsListResponse__McpAppUi,
  V2ThreadItemsListResponse__MemoryCitation,
  V2ThreadListResponse__CollabAgentState,
  V2ThreadListResponse__CommandAction,
  V2ThreadListResponse__FileUpdateChange,
  V2ThreadListResponse__McpAppUi,
  V2ThreadListResponse__MemoryCitation,
  V2ThreadMetadataUpdateResponse__CollabAgentState,
  V2ThreadMetadataUpdateResponse__CommandAction,
  V2ThreadMetadataUpdateResponse__FileUpdateChange,
  V2ThreadMetadataUpdateResponse__McpAppUi,
  V2ThreadMetadataUpdateResponse__MemoryCitation,
} from "./schema.gen.part9.ts";
import {
  V2ThreadReadResponse__CollabAgentState,
  V2ThreadReadResponse__CommandAction,
  V2ThreadReadResponse__FileUpdateChange,
  V2ThreadReadResponse__McpAppUi,
  V2ThreadReadResponse__MemoryCitation,
} from "./schema.gen.part10.ts";
import {
  V2ThreadForkResponse__FunctionCallOutputBody,
  V2ThreadForkResponse__UserInput,
  V2ThreadItemsListResponse__FunctionCallOutputBody,
  V2ThreadItemsListResponse__UserInput,
  V2ThreadListResponse__FunctionCallOutputBody,
  V2ThreadListResponse__UserInput,
  V2ThreadMetadataUpdateResponse__FunctionCallOutputBody,
  V2ThreadMetadataUpdateResponse__UserInput,
} from "./schema.gen.part12.ts";
import {
  V2ThreadReadResponse__FunctionCallOutputBody,
  V2ThreadReadResponse__UserInput,
} from "./schema.gen.part13.ts";

export type V2ThreadForkResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadForkResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadForkResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadForkResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadForkResponse__MemoryCitation | null;
      readonly phase?: V2ThreadForkResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadForkResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadForkResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadForkResponse__CommandAction>;
      readonly cwd: V2ThreadForkResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadForkResponse__CommandExecutionSource;
      readonly status: V2ThreadForkResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadForkResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadForkResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadForkResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadForkResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadForkResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadForkResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadForkResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadForkResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadForkResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadForkResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadForkResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadForkResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadForkResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadForkResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadForkResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadForkResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadForkResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadForkResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadForkResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadForkResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadForkResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadForkResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadForkResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2ThreadForkResponse__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(V2ThreadForkResponse__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadForkResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadForkResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadForkResponse__LegacyAppPathString> =>
          V2ThreadForkResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadForkResponse__CommandExecutionSource> =>
            V2ThreadForkResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadForkResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadForkResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadForkResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadForkResponse__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ThreadForkResponse__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ThreadForkResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadForkResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadForkResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadForkResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadForkResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, V2ThreadForkResponse__CollabAgentState).annotate({
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
        Schema.Union([V2ThreadForkResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadForkResponse__CollabAgentToolCallStatus> =>
          V2ThreadForkResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadForkResponse__CollabAgentTool> =>
          V2ThreadForkResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadForkResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadForkResponse__WebSearchAction, Schema.Null]),
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
      path: V2ThreadForkResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadForkResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadForkResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadForkResponse__ThreadItem" });

export type V2ThreadItemsListResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadItemsListResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadItemsListResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadItemsListResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadItemsListResponse__MemoryCitation | null;
      readonly phase?: V2ThreadItemsListResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadItemsListResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadItemsListResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadItemsListResponse__CommandAction>;
      readonly cwd: V2ThreadItemsListResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadItemsListResponse__CommandExecutionSource;
      readonly status: V2ThreadItemsListResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadItemsListResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadItemsListResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadItemsListResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadItemsListResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadItemsListResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadItemsListResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadItemsListResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadItemsListResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadItemsListResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadItemsListResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadItemsListResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadItemsListResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadItemsListResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadItemsListResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadItemsListResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadItemsListResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadItemsListResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadItemsListResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadItemsListResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadItemsListResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadItemsListResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadItemsListResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadItemsListResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2ThreadItemsListResponse__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadItemsListResponse__AsyncUserInputQuestion),
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
      output: V2ThreadItemsListResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadItemsListResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadItemsListResponse__LegacyAppPathString> =>
          V2ThreadItemsListResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadItemsListResponse__CommandExecutionSource> =>
            V2ThreadItemsListResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadItemsListResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadItemsListResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadItemsListResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadItemsListResponse__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ThreadItemsListResponse__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ThreadItemsListResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadItemsListResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadItemsListResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadItemsListResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadItemsListResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2ThreadItemsListResponse__CollabAgentState,
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
        Schema.Union([V2ThreadItemsListResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadItemsListResponse__CollabAgentToolCallStatus> =>
          V2ThreadItemsListResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadItemsListResponse__CollabAgentTool> =>
          V2ThreadItemsListResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadItemsListResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadItemsListResponse__WebSearchAction, Schema.Null]),
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
      path: V2ThreadItemsListResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadItemsListResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadItemsListResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadItemsListResponse__ThreadItem" });

export type V2ThreadListResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadListResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadListResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadListResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadListResponse__MemoryCitation | null;
      readonly phase?: V2ThreadListResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadListResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadListResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadListResponse__CommandAction>;
      readonly cwd: V2ThreadListResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadListResponse__CommandExecutionSource;
      readonly status: V2ThreadListResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadListResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadListResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadListResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadListResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadListResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadListResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadListResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadListResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadListResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadListResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadListResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadListResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadListResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadListResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadListResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadListResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadListResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadListResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadListResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadListResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadListResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadListResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadListResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2ThreadListResponse__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(V2ThreadListResponse__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadListResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadListResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadListResponse__LegacyAppPathString> =>
          V2ThreadListResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadListResponse__CommandExecutionSource> =>
            V2ThreadListResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadListResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadListResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadListResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadListResponse__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ThreadListResponse__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ThreadListResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadListResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadListResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadListResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadListResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, V2ThreadListResponse__CollabAgentState).annotate({
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
        Schema.Union([V2ThreadListResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadListResponse__CollabAgentToolCallStatus> =>
          V2ThreadListResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadListResponse__CollabAgentTool> =>
          V2ThreadListResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadListResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadListResponse__WebSearchAction, Schema.Null]),
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
      path: V2ThreadListResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadListResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadListResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadListResponse__ThreadItem" });

export type V2ThreadMetadataUpdateResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadMetadataUpdateResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadMetadataUpdateResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadMetadataUpdateResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadMetadataUpdateResponse__MemoryCitation | null;
      readonly phase?: V2ThreadMetadataUpdateResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadMetadataUpdateResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadMetadataUpdateResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadMetadataUpdateResponse__CommandAction>;
      readonly cwd: V2ThreadMetadataUpdateResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadMetadataUpdateResponse__CommandExecutionSource;
      readonly status: V2ThreadMetadataUpdateResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadMetadataUpdateResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadMetadataUpdateResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadMetadataUpdateResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadMetadataUpdateResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadMetadataUpdateResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadMetadataUpdateResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadMetadataUpdateResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadMetadataUpdateResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadMetadataUpdateResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: {
        readonly [x: string]: V2ThreadMetadataUpdateResponse__CollabAgentState;
      };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadMetadataUpdateResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadMetadataUpdateResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadMetadataUpdateResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadMetadataUpdateResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadMetadataUpdateResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadMetadataUpdateResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadMetadataUpdateResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadMetadataUpdateResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadMetadataUpdateResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadMetadataUpdateResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadMetadataUpdateResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadMetadataUpdateResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadMetadataUpdateResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2ThreadMetadataUpdateResponse__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadMetadataUpdateResponse__AsyncUserInputQuestion),
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
      output: V2ThreadMetadataUpdateResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadMetadataUpdateResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadMetadataUpdateResponse__LegacyAppPathString> =>
          V2ThreadMetadataUpdateResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadMetadataUpdateResponse__CommandExecutionSource> =>
            V2ThreadMetadataUpdateResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadMetadataUpdateResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadMetadataUpdateResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadMetadataUpdateResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadMetadataUpdateResponse__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ThreadMetadataUpdateResponse__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ThreadMetadataUpdateResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadMetadataUpdateResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadMetadataUpdateResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadMetadataUpdateResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadMetadataUpdateResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2ThreadMetadataUpdateResponse__CollabAgentState,
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
        Schema.Union([V2ThreadMetadataUpdateResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadMetadataUpdateResponse__CollabAgentToolCallStatus> =>
          V2ThreadMetadataUpdateResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadMetadataUpdateResponse__CollabAgentTool> =>
          V2ThreadMetadataUpdateResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadMetadataUpdateResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadMetadataUpdateResponse__WebSearchAction, Schema.Null]),
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
      path: V2ThreadMetadataUpdateResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadMetadataUpdateResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadMetadataUpdateResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__ThreadItem" });

export type V2ThreadReadResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ThreadReadResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ThreadReadResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ThreadReadResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ThreadReadResponse__MemoryCitation | null;
      readonly phase?: V2ThreadReadResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ThreadReadResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ThreadReadResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ThreadReadResponse__CommandAction>;
      readonly cwd: V2ThreadReadResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ThreadReadResponse__CommandExecutionSource;
      readonly status: V2ThreadReadResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ThreadReadResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ThreadReadResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ThreadReadResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ThreadReadResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ThreadReadResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ThreadReadResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ThreadReadResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ThreadReadResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ThreadReadResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ThreadReadResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ThreadReadResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ThreadReadResponse__CollabAgentToolCallStatus;
      readonly tool: V2ThreadReadResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ThreadReadResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ThreadReadResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ThreadReadResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ThreadReadResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ThreadReadResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ThreadReadResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ThreadReadResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ThreadReadResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ThreadReadResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ThreadReadResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2ThreadReadResponse__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(V2ThreadReadResponse__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ThreadReadResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ThreadReadResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ThreadReadResponse__LegacyAppPathString> =>
          V2ThreadReadResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ThreadReadResponse__CommandExecutionSource> =>
            V2ThreadReadResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ThreadReadResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ThreadReadResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ThreadReadResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ThreadReadResponse__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ThreadReadResponse__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ThreadReadResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ThreadReadResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ThreadReadResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ThreadReadResponse__DynamicToolCallOutputContentItem),
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
      status: V2ThreadReadResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, V2ThreadReadResponse__CollabAgentState).annotate({
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
        Schema.Union([V2ThreadReadResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ThreadReadResponse__CollabAgentToolCallStatus> =>
          V2ThreadReadResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ThreadReadResponse__CollabAgentTool> =>
          V2ThreadReadResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ThreadReadResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ThreadReadResponse__WebSearchAction, Schema.Null]),
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
      path: V2ThreadReadResponse__LegacyAppPathString,
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
        Schema.Union([V2ThreadReadResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ThreadReadResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ThreadReadResponse__ThreadItem" });
