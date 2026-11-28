/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  V2ItemCompletedNotification__AbsolutePathBuf,
  V2ItemCompletedNotification__AgentMessageDelivery,
  V2ItemCompletedNotification__AsyncUserInputQuestion,
  V2ItemCompletedNotification__CollabAgentTool,
  V2ItemCompletedNotification__CollabAgentToolCallStatus,
  V2ItemCompletedNotification__CommandExecutionSource,
  V2ItemCompletedNotification__CommandExecutionStatus,
  V2ItemCompletedNotification__DynamicToolCallOutputContentItem,
  V2ItemCompletedNotification__DynamicToolCallStatus,
  V2ItemCompletedNotification__HookPromptFragment,
  V2ItemCompletedNotification__ImageGenerationFailure,
  V2ItemCompletedNotification__LegacyAppPathString,
  V2ItemCompletedNotification__McpToolCallAppContext,
  V2ItemCompletedNotification__McpToolCallError,
  V2ItemCompletedNotification__McpToolCallResult,
  V2ItemCompletedNotification__McpToolCallStatus,
  V2ItemCompletedNotification__MessagePhase,
  V2ItemCompletedNotification__PatchApplyStatus,
  V2ItemCompletedNotification__ReasoningEffort,
  V2ItemCompletedNotification__SubAgentActivityKind,
  V2ItemCompletedNotification__WebSearchAction,
  V2ItemGuardianApprovalReviewCompletedNotification__FileSystemAccessMode,
  V2ItemGuardianApprovalReviewStartedNotification__FileSystemAccessMode,
  V2ItemStartedNotification__AbsolutePathBuf,
  V2ItemStartedNotification__AgentMessageDelivery,
  V2ItemStartedNotification__AsyncUserInputQuestion,
  V2ItemStartedNotification__CollabAgentTool,
  V2ItemStartedNotification__CollabAgentToolCallStatus,
  V2ItemStartedNotification__CommandExecutionSource,
  V2ItemStartedNotification__CommandExecutionStatus,
  V2ItemStartedNotification__DynamicToolCallOutputContentItem,
  V2ItemStartedNotification__DynamicToolCallStatus,
  V2ItemStartedNotification__HookPromptFragment,
  V2ItemStartedNotification__ImageGenerationFailure,
  V2ItemStartedNotification__LegacyAppPathString,
  V2ItemStartedNotification__McpToolCallAppContext,
  V2ItemStartedNotification__McpToolCallError,
  V2ItemStartedNotification__McpToolCallResult,
  V2ItemStartedNotification__McpToolCallStatus,
  V2ItemStartedNotification__MessagePhase,
  V2ItemStartedNotification__PatchApplyStatus,
  V2ItemStartedNotification__ReasoningEffort,
  V2ItemStartedNotification__SubAgentActivityKind,
  V2ItemStartedNotification__WebSearchAction,
  V2PluginInstalledResponse__PluginAuthPolicy,
  V2PluginInstalledResponse__PluginAvailability,
  V2PluginInstalledResponse__PluginDisabledReason,
  V2PluginInstalledResponse__PluginInstallPolicy,
  V2PluginInstalledResponse__PluginInstallPolicySource,
  V2PluginListResponse__PluginAuthPolicy,
  V2PluginListResponse__PluginAvailability,
  V2PluginListResponse__PluginDisabledReason,
  V2PluginListResponse__PluginInstallPolicy,
  V2PluginListResponse__PluginInstallPolicySource,
} from "./schema.gen.part2.ts";
import {
  V2PluginReadResponse__PluginAuthPolicy,
  V2PluginReadResponse__PluginAvailability,
  V2PluginReadResponse__PluginDisabledReason,
  V2PluginReadResponse__PluginInstallPolicy,
  V2PluginReadResponse__PluginInstallPolicySource,
  V2PluginShareListResponse__PluginAuthPolicy,
  V2PluginShareListResponse__PluginAvailability,
  V2PluginShareListResponse__PluginDisabledReason,
  V2PluginShareListResponse__PluginInstallPolicy,
  V2PluginShareListResponse__PluginInstallPolicySource,
  V2RawResponseItemCompletedNotification__AgentMessageInputContent,
  V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
  V2RawResponseItemCompletedNotification__LocalShellAction,
  V2RawResponseItemCompletedNotification__LocalShellStatus,
  V2RawResponseItemCompletedNotification__MessagePhase,
  V2RawResponseItemCompletedNotification__ReasoningItemContent,
  V2RawResponseItemCompletedNotification__ReasoningItemReasoningSummary,
  V2RawResponseItemCompletedNotification__ResponsesApiWebSearchAction,
  V2ReviewStartResponse__AbsolutePathBuf,
  V2ReviewStartResponse__AgentMessageDelivery,
  V2ReviewStartResponse__AsyncUserInputQuestion,
  V2ReviewStartResponse__CollabAgentTool,
  V2ReviewStartResponse__CollabAgentToolCallStatus,
  V2ReviewStartResponse__CommandExecutionSource,
  V2ReviewStartResponse__CommandExecutionStatus,
  V2ReviewStartResponse__DynamicToolCallOutputContentItem,
  V2ReviewStartResponse__DynamicToolCallStatus,
  V2ReviewStartResponse__HookPromptFragment,
  V2ReviewStartResponse__ImageGenerationFailure,
  V2ReviewStartResponse__LegacyAppPathString,
  V2ReviewStartResponse__McpToolCallAppContext,
  V2ReviewStartResponse__McpToolCallError,
  V2ReviewStartResponse__McpToolCallResult,
  V2ReviewStartResponse__McpToolCallStatus,
  V2ReviewStartResponse__MessagePhase,
  V2ReviewStartResponse__PatchApplyStatus,
  V2ReviewStartResponse__ReasoningEffort,
  V2ReviewStartResponse__SubAgentActivityKind,
  V2ReviewStartResponse__WebSearchAction,
  V2SkillsListResponse__SkillErrorInfo,
} from "./schema.gen.part3.ts";
import {
  V2ItemCompletedNotification__CollabAgentState,
  V2ItemCompletedNotification__CommandAction,
  V2ItemCompletedNotification__FileUpdateChange,
  V2ItemCompletedNotification__McpAppUi,
  V2ItemCompletedNotification__MemoryCitation,
  V2ItemStartedNotification__CollabAgentState,
  V2ItemStartedNotification__CommandAction,
  V2ItemStartedNotification__FileUpdateChange,
  V2ItemStartedNotification__McpAppUi,
  V2ItemStartedNotification__MemoryCitation,
  V2PluginInstalledResponse__PluginInterface,
  V2PluginInstalledResponse__PluginSource,
  V2PluginListResponse__PluginInterface,
  V2PluginListResponse__PluginSource,
} from "./schema.gen.part8.ts";
import {
  V2PluginReadResponse__PluginInterface,
  V2PluginReadResponse__PluginSource,
  V2PluginShareListResponse__PluginInterface,
  V2PluginShareListResponse__PluginSource,
  V2RawResponseItemCompletedNotification__ConfigurationReasoning,
  V2RawResponseItemCompletedNotification__ContentItem,
  V2ReviewStartResponse__CollabAgentState,
  V2ReviewStartResponse__CommandAction,
  V2ReviewStartResponse__FileUpdateChange,
  V2ReviewStartResponse__McpAppUi,
  V2ReviewStartResponse__MemoryCitation,
} from "./schema.gen.part9.ts";
import {
  V2ItemCompletedNotification__FunctionCallOutputBody,
  V2ItemCompletedNotification__UserInput,
  V2ItemGuardianApprovalReviewCompletedNotification__FileSystemPath,
  V2ItemGuardianApprovalReviewStartedNotification__FileSystemPath,
  V2ItemStartedNotification__FunctionCallOutputBody,
  V2ItemStartedNotification__UserInput,
  V2PluginInstalledResponse__PluginShareContext,
  V2PluginListResponse__PluginShareContext,
  V2PluginReadResponse__PluginShareContext,
  V2PluginShareListResponse__PluginShareContext,
  V2RawResponseItemCompletedNotification__FunctionCallOutputBody,
  V2ReviewStartResponse__FunctionCallOutputBody,
  V2ReviewStartResponse__UserInput,
  V2SkillsListResponse__SkillMetadata,
} from "./schema.gen.part12.ts";

export type V2ItemCompletedNotification__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ItemCompletedNotification__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ItemCompletedNotification__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ItemCompletedNotification__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ItemCompletedNotification__MemoryCitation | null;
      readonly phase?: V2ItemCompletedNotification__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ItemCompletedNotification__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ItemCompletedNotification__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ItemCompletedNotification__CommandAction>;
      readonly cwd: V2ItemCompletedNotification__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ItemCompletedNotification__CommandExecutionSource;
      readonly status: V2ItemCompletedNotification__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ItemCompletedNotification__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ItemCompletedNotification__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ItemCompletedNotification__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ItemCompletedNotification__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ItemCompletedNotification__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ItemCompletedNotification__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ItemCompletedNotification__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ItemCompletedNotification__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ItemCompletedNotification__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: {
        readonly [x: string]: V2ItemCompletedNotification__CollabAgentState;
      };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ItemCompletedNotification__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ItemCompletedNotification__CollabAgentToolCallStatus;
      readonly tool: V2ItemCompletedNotification__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ItemCompletedNotification__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ItemCompletedNotification__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ItemCompletedNotification__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ItemCompletedNotification__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ItemCompletedNotification__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ItemCompletedNotification__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ItemCompletedNotification__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ItemCompletedNotification__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ItemCompletedNotification__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ItemCompletedNotification__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2ItemCompletedNotification__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ItemCompletedNotification__AsyncUserInputQuestion),
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
      output: V2ItemCompletedNotification__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ItemCompletedNotification__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ItemCompletedNotification__LegacyAppPathString> =>
          V2ItemCompletedNotification__LegacyAppPathString,
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
          (): Schema.Codec<V2ItemCompletedNotification__CommandExecutionSource> =>
            V2ItemCompletedNotification__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ItemCompletedNotification__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ItemCompletedNotification__FileUpdateChange),
      id: Schema.String,
      status: V2ItemCompletedNotification__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ItemCompletedNotification__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ItemCompletedNotification__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ItemCompletedNotification__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ItemCompletedNotification__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ItemCompletedNotification__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ItemCompletedNotification__DynamicToolCallOutputContentItem),
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
      status: V2ItemCompletedNotification__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2ItemCompletedNotification__CollabAgentState,
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
        Schema.Union([V2ItemCompletedNotification__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ItemCompletedNotification__CollabAgentToolCallStatus> =>
          V2ItemCompletedNotification__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ItemCompletedNotification__CollabAgentTool> =>
          V2ItemCompletedNotification__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ItemCompletedNotification__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ItemCompletedNotification__WebSearchAction, Schema.Null]),
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
      path: V2ItemCompletedNotification__LegacyAppPathString,
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
        Schema.Union([V2ItemCompletedNotification__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ItemCompletedNotification__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ItemCompletedNotification__ThreadItem" });

export type V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSandboxEntry = {
  readonly access: V2ItemGuardianApprovalReviewCompletedNotification__FileSystemAccessMode;
  readonly path: V2ItemGuardianApprovalReviewCompletedNotification__FileSystemPath;
};
export const V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSandboxEntry =
  Schema.Struct({
    access: V2ItemGuardianApprovalReviewCompletedNotification__FileSystemAccessMode,
    path: V2ItemGuardianApprovalReviewCompletedNotification__FileSystemPath,
  }).annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__FileSystemSandboxEntry",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__FileSystemSandboxEntry = {
  readonly access: V2ItemGuardianApprovalReviewStartedNotification__FileSystemAccessMode;
  readonly path: V2ItemGuardianApprovalReviewStartedNotification__FileSystemPath;
};
export const V2ItemGuardianApprovalReviewStartedNotification__FileSystemSandboxEntry =
  Schema.Struct({
    access: V2ItemGuardianApprovalReviewStartedNotification__FileSystemAccessMode,
    path: V2ItemGuardianApprovalReviewStartedNotification__FileSystemPath,
  }).annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__FileSystemSandboxEntry",
  });

export type V2ItemStartedNotification__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ItemStartedNotification__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ItemStartedNotification__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ItemStartedNotification__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ItemStartedNotification__MemoryCitation | null;
      readonly phase?: V2ItemStartedNotification__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ItemStartedNotification__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ItemStartedNotification__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ItemStartedNotification__CommandAction>;
      readonly cwd: V2ItemStartedNotification__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ItemStartedNotification__CommandExecutionSource;
      readonly status: V2ItemStartedNotification__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ItemStartedNotification__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ItemStartedNotification__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ItemStartedNotification__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ItemStartedNotification__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ItemStartedNotification__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ItemStartedNotification__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ItemStartedNotification__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ItemStartedNotification__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ItemStartedNotification__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ItemStartedNotification__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ItemStartedNotification__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ItemStartedNotification__CollabAgentToolCallStatus;
      readonly tool: V2ItemStartedNotification__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ItemStartedNotification__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ItemStartedNotification__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ItemStartedNotification__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ItemStartedNotification__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ItemStartedNotification__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ItemStartedNotification__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ItemStartedNotification__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ItemStartedNotification__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ItemStartedNotification__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ItemStartedNotification__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2ItemStartedNotification__MessagePhase, Schema.Null]),
      ),
      questions: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ItemStartedNotification__AsyncUserInputQuestion),
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
      output: V2ItemStartedNotification__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ItemStartedNotification__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ItemStartedNotification__LegacyAppPathString> =>
          V2ItemStartedNotification__LegacyAppPathString,
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
          (): Schema.Codec<V2ItemStartedNotification__CommandExecutionSource> =>
            V2ItemStartedNotification__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ItemStartedNotification__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ItemStartedNotification__FileUpdateChange),
      id: Schema.String,
      status: V2ItemStartedNotification__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ItemStartedNotification__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ItemStartedNotification__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ItemStartedNotification__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ItemStartedNotification__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ItemStartedNotification__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ItemStartedNotification__DynamicToolCallOutputContentItem),
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
      status: V2ItemStartedNotification__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(
        Schema.String,
        V2ItemStartedNotification__CollabAgentState,
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
        Schema.Union([V2ItemStartedNotification__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ItemStartedNotification__CollabAgentToolCallStatus> =>
          V2ItemStartedNotification__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ItemStartedNotification__CollabAgentTool> =>
          V2ItemStartedNotification__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ItemStartedNotification__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ItemStartedNotification__WebSearchAction, Schema.Null]),
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
      path: V2ItemStartedNotification__LegacyAppPathString,
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
        Schema.Union([V2ItemStartedNotification__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ItemStartedNotification__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ItemStartedNotification__ThreadItem" });

export type V2PluginInstalledResponse__PluginSummary = {
  readonly authPolicy: V2PluginInstalledResponse__PluginAuthPolicy;
  readonly availability?: V2PluginInstalledResponse__PluginAvailability;
  readonly disabledReason?: V2PluginInstalledResponse__PluginDisabledReason | null;
  readonly eligiblePlanTypes?: ReadonlyArray<string> | null;
  readonly enabled: boolean;
  readonly id: string;
  readonly installPolicy: V2PluginInstalledResponse__PluginInstallPolicy;
  readonly installPolicySource?: V2PluginInstalledResponse__PluginInstallPolicySource | null;
  readonly installed: boolean;
  readonly installedAt?: number | null;
  readonly interface?: V2PluginInstalledResponse__PluginInterface | null;
  readonly keywords?: ReadonlyArray<string>;
  readonly localVersion?: string | null;
  readonly mustShowInstallationInterstitial?: boolean | null;
  readonly name: string;
  readonly remotePluginId?: string | null;
  readonly shareContext?: V2PluginInstalledResponse__PluginShareContext | null;
  readonly source: V2PluginInstalledResponse__PluginSource;
  readonly version?: string | null;
};
export const V2PluginInstalledResponse__PluginSummary = Schema.Struct({
  authPolicy: V2PluginInstalledResponse__PluginAuthPolicy,
  availability: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2PluginInstalledResponse__PluginAvailability> =>
        V2PluginInstalledResponse__PluginAvailability,
    ).annotate({
      description: "Availability state for installing and using the plugin.",
      default: "AVAILABLE",
    }),
  ),
  disabledReason: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__PluginDisabledReason, Schema.Null]).annotate({
      description: "Why the remote plugin is unavailable, when provided by plugin-service.",
    }),
  ),
  eligiblePlanTypes: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description: "Raw plugin-service plan identifiers eligible to install the plugin.",
      }),
      Schema.Null,
    ]),
  ),
  enabled: Schema.Boolean,
  id: Schema.String,
  installPolicy: V2PluginInstalledResponse__PluginInstallPolicy,
  installPolicySource: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__PluginInstallPolicySource, Schema.Null]),
  ),
  installed: Schema.Boolean,
  installedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Unix timestamp in seconds when the remote plugin was installed, when available.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  interface: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__PluginInterface, Schema.Null]),
  ),
  keywords: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
  localVersion: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version of the locally materialized plugin package when available.",
      }),
      Schema.Null,
    ]),
  ),
  mustShowInstallationInterstitial: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  name: Schema.String,
  remotePluginId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Backend remote plugin identifier when available." }),
      Schema.Null,
    ]),
  ),
  shareContext: Schema.optionalKey(
    Schema.Union([V2PluginInstalledResponse__PluginShareContext, Schema.Null]).annotate({
      description: "Remote sharing context associated with this plugin when available.",
    }),
  ),
  source: V2PluginInstalledResponse__PluginSource,
  version: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version advertised by the remote marketplace backend when available.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2PluginInstalledResponse__PluginSummary" });

export type V2PluginListResponse__PluginSummary = {
  readonly authPolicy: V2PluginListResponse__PluginAuthPolicy;
  readonly availability?: V2PluginListResponse__PluginAvailability;
  readonly disabledReason?: V2PluginListResponse__PluginDisabledReason | null;
  readonly eligiblePlanTypes?: ReadonlyArray<string> | null;
  readonly enabled: boolean;
  readonly id: string;
  readonly installPolicy: V2PluginListResponse__PluginInstallPolicy;
  readonly installPolicySource?: V2PluginListResponse__PluginInstallPolicySource | null;
  readonly installed: boolean;
  readonly installedAt?: number | null;
  readonly interface?: V2PluginListResponse__PluginInterface | null;
  readonly keywords?: ReadonlyArray<string>;
  readonly localVersion?: string | null;
  readonly mustShowInstallationInterstitial?: boolean | null;
  readonly name: string;
  readonly remotePluginId?: string | null;
  readonly shareContext?: V2PluginListResponse__PluginShareContext | null;
  readonly source: V2PluginListResponse__PluginSource;
  readonly version?: string | null;
};
export const V2PluginListResponse__PluginSummary = Schema.Struct({
  authPolicy: V2PluginListResponse__PluginAuthPolicy,
  availability: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2PluginListResponse__PluginAvailability> =>
        V2PluginListResponse__PluginAvailability,
    ).annotate({
      description: "Availability state for installing and using the plugin.",
      default: "AVAILABLE",
    }),
  ),
  disabledReason: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__PluginDisabledReason, Schema.Null]).annotate({
      description: "Why the remote plugin is unavailable, when provided by plugin-service.",
    }),
  ),
  eligiblePlanTypes: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description: "Raw plugin-service plan identifiers eligible to install the plugin.",
      }),
      Schema.Null,
    ]),
  ),
  enabled: Schema.Boolean,
  id: Schema.String,
  installPolicy: V2PluginListResponse__PluginInstallPolicy,
  installPolicySource: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__PluginInstallPolicySource, Schema.Null]),
  ),
  installed: Schema.Boolean,
  installedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Unix timestamp in seconds when the remote plugin was installed, when available.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  interface: Schema.optionalKey(Schema.Union([V2PluginListResponse__PluginInterface, Schema.Null])),
  keywords: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
  localVersion: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version of the locally materialized plugin package when available.",
      }),
      Schema.Null,
    ]),
  ),
  mustShowInstallationInterstitial: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  name: Schema.String,
  remotePluginId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Backend remote plugin identifier when available." }),
      Schema.Null,
    ]),
  ),
  shareContext: Schema.optionalKey(
    Schema.Union([V2PluginListResponse__PluginShareContext, Schema.Null]).annotate({
      description: "Remote sharing context associated with this plugin when available.",
    }),
  ),
  source: V2PluginListResponse__PluginSource,
  version: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version advertised by the remote marketplace backend when available.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2PluginListResponse__PluginSummary" });

export type V2PluginReadResponse__PluginSummary = {
  readonly authPolicy: V2PluginReadResponse__PluginAuthPolicy;
  readonly availability?: V2PluginReadResponse__PluginAvailability;
  readonly disabledReason?: V2PluginReadResponse__PluginDisabledReason | null;
  readonly eligiblePlanTypes?: ReadonlyArray<string> | null;
  readonly enabled: boolean;
  readonly id: string;
  readonly installPolicy: V2PluginReadResponse__PluginInstallPolicy;
  readonly installPolicySource?: V2PluginReadResponse__PluginInstallPolicySource | null;
  readonly installed: boolean;
  readonly installedAt?: number | null;
  readonly interface?: V2PluginReadResponse__PluginInterface | null;
  readonly keywords?: ReadonlyArray<string>;
  readonly localVersion?: string | null;
  readonly mustShowInstallationInterstitial?: boolean | null;
  readonly name: string;
  readonly remotePluginId?: string | null;
  readonly shareContext?: V2PluginReadResponse__PluginShareContext | null;
  readonly source: V2PluginReadResponse__PluginSource;
  readonly version?: string | null;
};
export const V2PluginReadResponse__PluginSummary = Schema.Struct({
  authPolicy: V2PluginReadResponse__PluginAuthPolicy,
  availability: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2PluginReadResponse__PluginAvailability> =>
        V2PluginReadResponse__PluginAvailability,
    ).annotate({
      description: "Availability state for installing and using the plugin.",
      default: "AVAILABLE",
    }),
  ),
  disabledReason: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__PluginDisabledReason, Schema.Null]).annotate({
      description: "Why the remote plugin is unavailable, when provided by plugin-service.",
    }),
  ),
  eligiblePlanTypes: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description: "Raw plugin-service plan identifiers eligible to install the plugin.",
      }),
      Schema.Null,
    ]),
  ),
  enabled: Schema.Boolean,
  id: Schema.String,
  installPolicy: V2PluginReadResponse__PluginInstallPolicy,
  installPolicySource: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__PluginInstallPolicySource, Schema.Null]),
  ),
  installed: Schema.Boolean,
  installedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Unix timestamp in seconds when the remote plugin was installed, when available.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  interface: Schema.optionalKey(Schema.Union([V2PluginReadResponse__PluginInterface, Schema.Null])),
  keywords: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
  localVersion: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version of the locally materialized plugin package when available.",
      }),
      Schema.Null,
    ]),
  ),
  mustShowInstallationInterstitial: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  name: Schema.String,
  remotePluginId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Backend remote plugin identifier when available." }),
      Schema.Null,
    ]),
  ),
  shareContext: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__PluginShareContext, Schema.Null]).annotate({
      description: "Remote sharing context associated with this plugin when available.",
    }),
  ),
  source: V2PluginReadResponse__PluginSource,
  version: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version advertised by the remote marketplace backend when available.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2PluginReadResponse__PluginSummary" });

export type V2PluginShareListResponse__PluginSummary = {
  readonly authPolicy: V2PluginShareListResponse__PluginAuthPolicy;
  readonly availability?: V2PluginShareListResponse__PluginAvailability;
  readonly disabledReason?: V2PluginShareListResponse__PluginDisabledReason | null;
  readonly eligiblePlanTypes?: ReadonlyArray<string> | null;
  readonly enabled: boolean;
  readonly id: string;
  readonly installPolicy: V2PluginShareListResponse__PluginInstallPolicy;
  readonly installPolicySource?: V2PluginShareListResponse__PluginInstallPolicySource | null;
  readonly installed: boolean;
  readonly installedAt?: number | null;
  readonly interface?: V2PluginShareListResponse__PluginInterface | null;
  readonly keywords?: ReadonlyArray<string>;
  readonly localVersion?: string | null;
  readonly mustShowInstallationInterstitial?: boolean | null;
  readonly name: string;
  readonly remotePluginId?: string | null;
  readonly shareContext?: V2PluginShareListResponse__PluginShareContext | null;
  readonly source: V2PluginShareListResponse__PluginSource;
  readonly version?: string | null;
};
export const V2PluginShareListResponse__PluginSummary = Schema.Struct({
  authPolicy: V2PluginShareListResponse__PluginAuthPolicy,
  availability: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2PluginShareListResponse__PluginAvailability> =>
        V2PluginShareListResponse__PluginAvailability,
    ).annotate({
      description: "Availability state for installing and using the plugin.",
      default: "AVAILABLE",
    }),
  ),
  disabledReason: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__PluginDisabledReason, Schema.Null]).annotate({
      description: "Why the remote plugin is unavailable, when provided by plugin-service.",
    }),
  ),
  eligiblePlanTypes: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description: "Raw plugin-service plan identifiers eligible to install the plugin.",
      }),
      Schema.Null,
    ]),
  ),
  enabled: Schema.Boolean,
  id: Schema.String,
  installPolicy: V2PluginShareListResponse__PluginInstallPolicy,
  installPolicySource: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__PluginInstallPolicySource, Schema.Null]),
  ),
  installed: Schema.Boolean,
  installedAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description:
          "Unix timestamp in seconds when the remote plugin was installed, when available.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  interface: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__PluginInterface, Schema.Null]),
  ),
  keywords: Schema.optionalKey(Schema.Array(Schema.String).annotate({ default: [] })),
  localVersion: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version of the locally materialized plugin package when available.",
      }),
      Schema.Null,
    ]),
  ),
  mustShowInstallationInterstitial: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  name: Schema.String,
  remotePluginId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Backend remote plugin identifier when available." }),
      Schema.Null,
    ]),
  ),
  shareContext: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__PluginShareContext, Schema.Null]).annotate({
      description: "Remote sharing context associated with this plugin when available.",
    }),
  ),
  source: V2PluginShareListResponse__PluginSource,
  version: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Version advertised by the remote marketplace backend when available.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2PluginShareListResponse__PluginSummary" });

export type V2RawResponseItemCompletedNotification__ResponseItem =
  | {
      readonly content: ReadonlyArray<V2RawResponseItemCompletedNotification__ContentItem>;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly phase?: V2RawResponseItemCompletedNotification__MessagePhase | null;
      readonly role: string;
      readonly type: "message";
    }
  | {
      readonly author: string;
      readonly content: ReadonlyArray<V2RawResponseItemCompletedNotification__AgentMessageInputContent>;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly recipient: string;
      readonly type: "agent_message";
    }
  | {
      readonly content?: ReadonlyArray<V2RawResponseItemCompletedNotification__ReasoningItemContent> | null;
      readonly encrypted_content?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly summary: ReadonlyArray<V2RawResponseItemCompletedNotification__ReasoningItemReasoningSummary>;
      readonly type: "reasoning";
    }
  | {
      readonly action: V2RawResponseItemCompletedNotification__LocalShellAction;
      readonly call_id?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly status: V2RawResponseItemCompletedNotification__LocalShellStatus;
      readonly type: "local_shell_call";
    }
  | {
      readonly arguments: string;
      readonly call_id: string;
      readonly encrypted_function_args?: ReadonlyArray<string> | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly name: string;
      readonly namespace?: string | null;
      readonly type: "function_call";
    }
  | {
      readonly arguments: Schema.Json;
      readonly call_id?: string | null;
      readonly execution: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly status?: string | null;
      readonly type: "tool_search_call";
    }
  | {
      readonly call_id?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly name?: string | null;
      readonly namespace?: string | null;
      readonly output: V2RawResponseItemCompletedNotification__FunctionCallOutputBody;
      readonly type: "function_call_output";
    }
  | {
      readonly call_id: string;
      readonly id?: string | null;
      readonly input: string;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly name: string;
      readonly namespace?: string | null;
      readonly status?: string | null;
      readonly type: "custom_tool_call";
    }
  | {
      readonly call_id: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly name?: string | null;
      readonly output: V2RawResponseItemCompletedNotification__FunctionCallOutputBody;
      readonly type: "custom_tool_call_output";
    }
  | {
      readonly call_id?: string | null;
      readonly execution: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly status: string;
      readonly tools: ReadonlyArray<Schema.Json>;
      readonly type: "tool_search_output";
    }
  | {
      readonly action?: V2RawResponseItemCompletedNotification__ResponsesApiWebSearchAction | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly status?: string | null;
      readonly type: "web_search_call";
    }
  | {
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly result: string;
      readonly revised_prompt?: string | null;
      readonly status: string;
      readonly type: "image_generation_call";
    }
  | {
      readonly encrypted_content: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly type: "compaction";
    }
  | {
      readonly reasoning: V2RawResponseItemCompletedNotification__ConfigurationReasoning;
      readonly type: "configuration_update";
    }
  | { readonly type: "compaction_trigger" }
  | {
      readonly encrypted_content?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough | null;
      readonly type: "context_compaction";
    }
  | { readonly type: "other" };
export const V2RawResponseItemCompletedNotification__ResponseItem = Schema.Union(
  [
    Schema.Struct({
      content: Schema.Array(V2RawResponseItemCompletedNotification__ContentItem),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      phase: Schema.optionalKey(
        Schema.Union([V2RawResponseItemCompletedNotification__MessagePhase, Schema.Null]),
      ),
      role: Schema.String,
      type: Schema.Literal("message").annotate({ title: "MessageResponseItemType" }),
    }).annotate({ title: "MessageResponseItem" }),
    Schema.Struct({
      author: Schema.String,
      content: Schema.Array(V2RawResponseItemCompletedNotification__AgentMessageInputContent),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      recipient: Schema.String,
      type: Schema.Literal("agent_message").annotate({ title: "AgentMessageResponseItemType" }),
    }).annotate({ title: "AgentMessageResponseItem" }),
    Schema.Struct({
      content: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2RawResponseItemCompletedNotification__ReasoningItemContent),
          Schema.Null,
        ]),
      ),
      encrypted_content: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      summary: Schema.Array(V2RawResponseItemCompletedNotification__ReasoningItemReasoningSummary),
      type: Schema.Literal("reasoning").annotate({ title: "ReasoningResponseItemType" }),
    }).annotate({ title: "ReasoningResponseItem" }),
    Schema.Struct({
      action: V2RawResponseItemCompletedNotification__LocalShellAction,
      call_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Set when using the Responses API." }),
          Schema.Null,
        ]),
      ),
      id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "Legacy id field retained for compatibility with older payloads.",
          }),
          Schema.Null,
        ]),
      ),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      status: V2RawResponseItemCompletedNotification__LocalShellStatus,
      type: Schema.Literal("local_shell_call").annotate({
        title: "LocalShellCallResponseItemType",
      }),
    }).annotate({ title: "LocalShellCallResponseItem" }),
    Schema.Struct({
      arguments: Schema.String,
      call_id: Schema.String,
      encrypted_function_args: Schema.optionalKey(
        Schema.Union([Schema.Array(Schema.String), Schema.Null]),
      ),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("function_call").annotate({ title: "FunctionCallResponseItemType" }),
    }).annotate({ title: "FunctionCallResponseItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      call_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      execution: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      status: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("tool_search_call").annotate({
        title: "ToolSearchCallResponseItemType",
      }),
    }).annotate({ title: "ToolSearchCallResponseItem" }),
    Schema.Struct({
      call_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2RawResponseItemCompletedNotification__FunctionCallOutputBody,
      type: Schema.Literal("function_call_output").annotate({
        title: "FunctionCallOutputResponseItemType",
      }),
    }).annotate({ title: "FunctionCallOutputResponseItem" }),
    Schema.Struct({
      call_id: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      input: Schema.String,
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      status: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("custom_tool_call").annotate({
        title: "CustomToolCallResponseItemType",
      }),
    }).annotate({ title: "CustomToolCallResponseItem" }),
    Schema.Struct({
      call_id: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2RawResponseItemCompletedNotification__FunctionCallOutputBody,
      type: Schema.Literal("custom_tool_call_output").annotate({
        title: "CustomToolCallOutputResponseItemType",
      }),
    }).annotate({ title: "CustomToolCallOutputResponseItem" }),
    Schema.Struct({
      call_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      execution: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      status: Schema.String,
      tools: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
      type: Schema.Literal("tool_search_output").annotate({
        title: "ToolSearchOutputResponseItemType",
      }),
    }).annotate({ title: "ToolSearchOutputResponseItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__ResponsesApiWebSearchAction,
          Schema.Null,
        ]),
      ),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      status: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("web_search_call").annotate({ title: "WebSearchCallResponseItemType" }),
    }).annotate({ title: "WebSearchCallResponseItem" }),
    Schema.Struct({
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      result: Schema.String,
      revised_prompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      status: Schema.String,
      type: Schema.Literal("image_generation_call").annotate({
        title: "ImageGenerationCallResponseItemType",
      }),
    }).annotate({ title: "ImageGenerationCallResponseItem" }),
    Schema.Struct({
      encrypted_content: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("compaction").annotate({ title: "CompactionResponseItemType" }),
    }).annotate({ title: "CompactionResponseItem" }),
    Schema.Struct({
      reasoning: V2RawResponseItemCompletedNotification__ConfigurationReasoning,
      type: Schema.Literal("configuration_update").annotate({
        title: "ConfigurationUpdateResponseItemType",
      }),
    }).annotate({
      title: "ConfigurationUpdateResponseItem",
      description: "A durable input control interpreted by the backend at its position in history.",
    }),
    Schema.Struct({
      type: Schema.Literal("compaction_trigger").annotate({
        title: "CompactionTriggerResponseItemType",
      }),
    }).annotate({ title: "CompactionTriggerResponseItem" }),
    Schema.Struct({
      encrypted_content: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([
          V2RawResponseItemCompletedNotification__InternalChatMessageMetadataPassthrough,
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("context_compaction").annotate({
        title: "ContextCompactionResponseItemType",
      }),
    }).annotate({ title: "ContextCompactionResponseItem" }),
    Schema.Struct({
      type: Schema.Literal("other").annotate({ title: "OtherResponseItemType" }),
    }).annotate({ title: "OtherResponseItem" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2RawResponseItemCompletedNotification__ResponseItem" });

export type V2ReviewStartResponse__ThreadItem =
  | {
      readonly clientId?: string | null;
      readonly content: ReadonlyArray<V2ReviewStartResponse__UserInput>;
      readonly id: string;
      readonly type: "userMessage";
    }
  | {
      readonly fragments: ReadonlyArray<V2ReviewStartResponse__HookPromptFragment>;
      readonly id: string;
      readonly type: "hookPrompt";
    }
  | {
      readonly delivery?: V2ReviewStartResponse__AgentMessageDelivery | null;
      readonly id: string;
      readonly memoryCitation?: V2ReviewStartResponse__MemoryCitation | null;
      readonly phase?: V2ReviewStartResponse__MessagePhase | null;
      readonly questions?: ReadonlyArray<V2ReviewStartResponse__AsyncUserInputQuestion> | null;
      readonly text: string;
      readonly type: "agentMessage";
    }
  | {
      readonly id: string;
      readonly name: string;
      readonly namespace?: string | null;
      readonly output: V2ReviewStartResponse__FunctionCallOutputBody;
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
      readonly commandActions: ReadonlyArray<V2ReviewStartResponse__CommandAction>;
      readonly cwd: V2ReviewStartResponse__LegacyAppPathString;
      readonly durationMs?: number | null;
      readonly exitCode?: number | null;
      readonly id: string;
      readonly pluginId?: string | null;
      readonly processId?: string | null;
      readonly scriptPath?: string | null;
      readonly source?: V2ReviewStartResponse__CommandExecutionSource;
      readonly status: V2ReviewStartResponse__CommandExecutionStatus;
      readonly type: "commandExecution";
    }
  | {
      readonly changes: ReadonlyArray<V2ReviewStartResponse__FileUpdateChange>;
      readonly id: string;
      readonly status: V2ReviewStartResponse__PatchApplyStatus;
      readonly type: "fileChange";
    }
  | {
      readonly appContext?: V2ReviewStartResponse__McpToolCallAppContext | null;
      readonly arguments: Schema.Json;
      readonly durationMs?: number | null;
      readonly error?: V2ReviewStartResponse__McpToolCallError | null;
      readonly id: string;
      readonly mcpAppResourceUri?: string | null;
      readonly mcpAppUi?: V2ReviewStartResponse__McpAppUi | null;
      readonly pluginId?: string | null;
      readonly readOnlyHint?: boolean | null;
      readonly result?: V2ReviewStartResponse__McpToolCallResult | null;
      readonly server: string;
      readonly status: V2ReviewStartResponse__McpToolCallStatus;
      readonly tool: string;
      readonly type: "mcpToolCall";
    }
  | {
      readonly arguments: Schema.Json;
      readonly contentItems?: ReadonlyArray<V2ReviewStartResponse__DynamicToolCallOutputContentItem> | null;
      readonly durationMs?: number | null;
      readonly id: string;
      readonly namespace?: string | null;
      readonly status: V2ReviewStartResponse__DynamicToolCallStatus;
      readonly success?: boolean | null;
      readonly tool: string;
      readonly type: "dynamicToolCall";
    }
  | {
      readonly agentsStates: { readonly [x: string]: V2ReviewStartResponse__CollabAgentState };
      readonly id: string;
      readonly model?: string | null;
      readonly prompt?: string | null;
      readonly reasoningEffort?: V2ReviewStartResponse__ReasoningEffort | null;
      readonly receiverThreadIds: ReadonlyArray<string>;
      readonly senderThreadId: string;
      readonly status: V2ReviewStartResponse__CollabAgentToolCallStatus;
      readonly tool: V2ReviewStartResponse__CollabAgentTool;
      readonly type: "collabAgentToolCall";
    }
  | {
      readonly agentPath: string;
      readonly agentThreadId: string;
      readonly id: string;
      readonly kind: V2ReviewStartResponse__SubAgentActivityKind;
      readonly type: "subAgentActivity";
    }
  | {
      readonly action?: V2ReviewStartResponse__WebSearchAction | null;
      readonly id: string;
      readonly query: string;
      readonly results?: ReadonlyArray<Schema.Json> | null;
      readonly type: "webSearch";
    }
  | {
      readonly id: string;
      readonly path: V2ReviewStartResponse__LegacyAppPathString;
      readonly type: "imageView";
    }
  | { readonly durationMs: number; readonly id: string; readonly type: "sleep" }
  | {
      readonly failure?: V2ReviewStartResponse__ImageGenerationFailure | null;
      readonly id: string;
      readonly result?: string;
      readonly revisedPrompt?: string | null;
      readonly savedPath?: V2ReviewStartResponse__AbsolutePathBuf | null;
      readonly status: string;
      readonly transparentBackground?: boolean | null;
      readonly type: "imageGeneration";
      readonly fileId?: string;
    }
  | { readonly id: string; readonly review: string; readonly type: "enteredReviewMode" }
  | { readonly id: string; readonly review: string; readonly type: "exitedReviewMode" }
  | { readonly id: string; readonly type: "contextCompaction" };
export const V2ReviewStartResponse__ThreadItem = Schema.Union(
  [
    Schema.Struct({
      clientId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      content: Schema.Array(V2ReviewStartResponse__UserInput),
      id: Schema.String,
      type: Schema.Literal("userMessage").annotate({ title: "UserMessageThreadItemType" }),
    }).annotate({ title: "UserMessageThreadItem" }),
    Schema.Struct({
      fragments: Schema.Array(V2ReviewStartResponse__HookPromptFragment),
      id: Schema.String,
      type: Schema.Literal("hookPrompt").annotate({ title: "HookPromptThreadItemType" }),
    }).annotate({ title: "HookPromptThreadItem" }),
    Schema.Struct({
      delivery: Schema.optionalKey(
        Schema.Union([V2ReviewStartResponse__AgentMessageDelivery, Schema.Null]),
      ),
      id: Schema.String,
      memoryCitation: Schema.optionalKey(
        Schema.Union([V2ReviewStartResponse__MemoryCitation, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([V2ReviewStartResponse__MessagePhase, Schema.Null])),
      questions: Schema.optionalKey(
        Schema.Union([Schema.Array(V2ReviewStartResponse__AsyncUserInputQuestion), Schema.Null]),
      ),
      text: Schema.String,
      type: Schema.Literal("agentMessage").annotate({ title: "AgentMessageThreadItemType" }),
    }).annotate({ title: "AgentMessageThreadItem" }),
    Schema.Struct({
      id: Schema.String,
      name: Schema.String,
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: V2ReviewStartResponse__FunctionCallOutputBody,
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
      commandActions: Schema.Array(V2ReviewStartResponse__CommandAction).annotate({
        description:
          "A best-effort parsing of the command to understand the action(s) it will perform. This returns a list of CommandAction objects because a single shell command may be composed of many commands piped together.",
      }),
      cwd: Schema.suspend(
        (): Schema.Codec<V2ReviewStartResponse__LegacyAppPathString> =>
          V2ReviewStartResponse__LegacyAppPathString,
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
          (): Schema.Codec<V2ReviewStartResponse__CommandExecutionSource> =>
            V2ReviewStartResponse__CommandExecutionSource,
        ).annotate({ default: "agent" }),
      ),
      status: V2ReviewStartResponse__CommandExecutionStatus,
      type: Schema.Literal("commandExecution").annotate({
        title: "CommandExecutionThreadItemType",
      }),
    }).annotate({ title: "CommandExecutionThreadItem" }),
    Schema.Struct({
      changes: Schema.Array(V2ReviewStartResponse__FileUpdateChange),
      id: Schema.String,
      status: V2ReviewStartResponse__PatchApplyStatus,
      type: Schema.Literal("fileChange").annotate({ title: "FileChangeThreadItemType" }),
    }).annotate({ title: "FileChangeThreadItem" }),
    Schema.Struct({
      appContext: Schema.optionalKey(
        Schema.Union([V2ReviewStartResponse__McpToolCallAppContext, Schema.Null]),
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
        Schema.Union([V2ReviewStartResponse__McpToolCallError, Schema.Null]),
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
        Schema.Union([V2ReviewStartResponse__McpAppUi, Schema.Null]).annotate({
          description:
            "Presentation captured from the invoked descriptor; absent in older history.",
        }),
      ),
      pluginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      readOnlyHint: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      result: Schema.optionalKey(
        Schema.Union([V2ReviewStartResponse__McpToolCallResult, Schema.Null]),
      ),
      server: Schema.String,
      status: V2ReviewStartResponse__McpToolCallStatus,
      tool: Schema.String,
      type: Schema.Literal("mcpToolCall").annotate({ title: "McpToolCallThreadItemType" }),
    }).annotate({ title: "McpToolCallThreadItem" }),
    Schema.Struct({
      arguments: Schema.Json.annotate({ expected: "JSON value" }),
      contentItems: Schema.optionalKey(
        Schema.Union([
          Schema.Array(V2ReviewStartResponse__DynamicToolCallOutputContentItem),
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
      status: V2ReviewStartResponse__DynamicToolCallStatus,
      success: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
      tool: Schema.String,
      type: Schema.Literal("dynamicToolCall").annotate({ title: "DynamicToolCallThreadItemType" }),
    }).annotate({ title: "DynamicToolCallThreadItem" }),
    Schema.Struct({
      agentsStates: Schema.Record(Schema.String, V2ReviewStartResponse__CollabAgentState).annotate({
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
        Schema.Union([V2ReviewStartResponse__ReasoningEffort, Schema.Null]).annotate({
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
        (): Schema.Codec<V2ReviewStartResponse__CollabAgentToolCallStatus> =>
          V2ReviewStartResponse__CollabAgentToolCallStatus,
      ).annotate({ description: "Current status of the collab tool call." }),
      tool: Schema.suspend(
        (): Schema.Codec<V2ReviewStartResponse__CollabAgentTool> =>
          V2ReviewStartResponse__CollabAgentTool,
      ).annotate({ description: "Name of the collab tool that was invoked." }),
      type: Schema.Literal("collabAgentToolCall").annotate({
        title: "CollabAgentToolCallThreadItemType",
      }),
    }).annotate({ title: "CollabAgentToolCallThreadItem" }),
    Schema.Struct({
      agentPath: Schema.String,
      agentThreadId: Schema.String,
      id: Schema.String,
      kind: V2ReviewStartResponse__SubAgentActivityKind,
      type: Schema.Literal("subAgentActivity").annotate({
        title: "SubAgentActivityThreadItemType",
      }),
    }).annotate({ title: "SubAgentActivityThreadItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([V2ReviewStartResponse__WebSearchAction, Schema.Null]),
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
      path: V2ReviewStartResponse__LegacyAppPathString,
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
        Schema.Union([V2ReviewStartResponse__ImageGenerationFailure, Schema.Null]),
      ),
      id: Schema.String,
      result: Schema.optionalKey(Schema.String),
      revisedPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      savedPath: Schema.optionalKey(
        Schema.Union([V2ReviewStartResponse__AbsolutePathBuf, Schema.Null]),
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
).annotate({ identifier: "V2ReviewStartResponse__ThreadItem" });

export type V2SkillsListResponse__SkillsListEntry = {
  readonly cwd: string;
  readonly errors: ReadonlyArray<V2SkillsListResponse__SkillErrorInfo>;
  readonly skills: ReadonlyArray<V2SkillsListResponse__SkillMetadata>;
};
export const V2SkillsListResponse__SkillsListEntry = Schema.Struct({
  cwd: Schema.String,
  errors: Schema.Array(V2SkillsListResponse__SkillErrorInfo),
  skills: Schema.Array(V2SkillsListResponse__SkillMetadata),
}).annotate({ identifier: "V2SkillsListResponse__SkillsListEntry" });
