/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  ApplyPatchApprovalParams__FileChange,
  ApplyPatchApprovalParams__ThreadId,
  ChatgptAuthTokensRefreshParams__ChatgptAuthTokensRefreshReason,
  McpServerElicitationRequestParams__McpElicitationObjectType,
  ServerNotification__AbsolutePathBuf,
  ServerNotification__LegacyAppPathString,
} from "./schema.gen.part0.ts";
import {
  ServerNotification__AutoReviewDecisionSource,
  ServerNotification__GuardianCommandSource,
  ServerNotification__NetworkApprovalProtocol,
  ServerRequest__LegacyAppPathString,
  ServerRequest__McpElicitationObjectType,
} from "./schema.gen.part1.ts";
import {
  V2ItemGuardianApprovalReviewCompletedNotification__AbsolutePathBuf,
  V2ItemGuardianApprovalReviewCompletedNotification__GuardianCommandSource,
  V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
  V2ItemGuardianApprovalReviewCompletedNotification__NetworkApprovalProtocol,
  V2ItemGuardianApprovalReviewStartedNotification__AbsolutePathBuf,
  V2ItemGuardianApprovalReviewStartedNotification__GuardianCommandSource,
  V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
  V2ItemGuardianApprovalReviewStartedNotification__NetworkApprovalProtocol,
} from "./schema.gen.part2.ts";
import {
  V2ThreadResumeResponse__AbsolutePathBuf,
  V2ThreadResumeResponse__GitInfo,
  V2ThreadResumeResponse__ReasoningEffort,
  V2ThreadResumeResponse__ThreadHistoryMode,
  V2ThreadResumeResponse__ThreadSource,
  V2ThreadRevertResponse__AbsolutePathBuf,
  V2ThreadRevertResponse__GitInfo,
  V2ThreadRevertResponse__ReasoningEffort,
  V2ThreadRevertResponse__ThreadHistoryMode,
  V2ThreadRevertResponse__ThreadSource,
} from "./schema.gen.part4.ts";
import {
  V2ThreadStartResponse__AbsolutePathBuf,
  V2ThreadStartResponse__GitInfo,
  V2ThreadStartResponse__ReasoningEffort,
  V2ThreadStartResponse__ThreadHistoryMode,
  V2ThreadStartResponse__ThreadSource,
  V2ThreadStartedNotification__AbsolutePathBuf,
  V2ThreadStartedNotification__GitInfo,
  V2ThreadStartedNotification__ReasoningEffort,
  V2ThreadStartedNotification__ThreadHistoryMode,
  V2ThreadStartedNotification__ThreadSource,
  V2ThreadUnarchiveResponse__AbsolutePathBuf,
  V2ThreadUnarchiveResponse__GitInfo,
  V2ThreadUnarchiveResponse__ReasoningEffort,
  V2ThreadUnarchiveResponse__ThreadHistoryMode,
  V2ThreadUnarchiveResponse__ThreadSource,
} from "./schema.gen.part5.ts";
import { ServerNotification__GuardianApprovalReview } from "./schema.gen.part7.ts";
import {
  V2ThreadResumeResponse__ThreadSection,
  V2ThreadResumeResponse__ThreadStatus,
  V2ThreadRevertResponse__ThreadSection,
  V2ThreadRevertResponse__ThreadStatus,
  V2ThreadStartResponse__ThreadSection,
  V2ThreadStartResponse__ThreadStatus,
  V2ThreadStartedNotification__ThreadSection,
  V2ThreadStartedNotification__ThreadStatus,
} from "./schema.gen.part10.ts";
import {
  ApplyPatchApprovalResponse__ReviewDecision,
  V2ThreadUnarchiveResponse__ThreadSection,
  V2ThreadUnarchiveResponse__ThreadStatus,
} from "./schema.gen.part11.ts";
import {
  V2ThreadResumeResponse__SessionSource,
  V2ThreadRevertResponse__SessionSource,
  V2ThreadStartResponse__SessionSource,
  V2ThreadStartedNotification__SessionSource,
  V2ThreadUnarchiveResponse__SessionSource,
} from "./schema.gen.part13.ts";
import {
  McpServerElicitationRequestParams__McpElicitationPrimitiveSchema,
  ServerNotification__RequestPermissionProfile,
  ServerNotification__Thread,
  ServerRequest__McpElicitationPrimitiveSchema,
  ServerRequest__RequestPermissionProfile,
  V2ItemGuardianApprovalReviewCompletedNotification__RequestPermissionProfile,
  V2ItemGuardianApprovalReviewStartedNotification__RequestPermissionProfile,
  V2ThreadResumeResponse__Turn,
  V2ThreadRevertResponse__Turn,
  V2ThreadStartResponse__Turn,
  V2ThreadStartedNotification__Turn,
  V2ThreadUnarchiveResponse__Turn,
} from "./schema.gen.part18.ts";

export type V2ThreadResumeResponse__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadResumeResponse__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadResumeResponse__GitInfo | null;
  readonly historyMode?: V2ThreadResumeResponse__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadResumeResponse__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadResumeResponse__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadResumeResponse__SessionSource;
  readonly status: V2ThreadResumeResponse__ThreadStatus;
  readonly threadSource?: V2ThreadResumeResponse__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadResumeResponse__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadResumeResponse__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadResumeResponse__AbsolutePathBuf> =>
      V2ThreadResumeResponse__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadResumeResponse__ThreadHistoryMode> =>
        V2ThreadResumeResponse__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadResumeResponse__SessionSource> =>
      V2ThreadResumeResponse__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadResumeResponse__ThreadStatus> => V2ThreadResumeResponse__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadResumeResponse__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadResumeResponse__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadResumeResponse__Thread" });

export type V2ThreadRevertResponse__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadRevertResponse__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadRevertResponse__GitInfo | null;
  readonly historyMode?: V2ThreadRevertResponse__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadRevertResponse__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadRevertResponse__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadRevertResponse__SessionSource;
  readonly status: V2ThreadRevertResponse__ThreadStatus;
  readonly threadSource?: V2ThreadRevertResponse__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadRevertResponse__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadRevertResponse__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadRevertResponse__AbsolutePathBuf> =>
      V2ThreadRevertResponse__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadRevertResponse__ThreadHistoryMode> =>
        V2ThreadRevertResponse__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadRevertResponse__SessionSource> =>
      V2ThreadRevertResponse__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadRevertResponse__ThreadStatus> => V2ThreadRevertResponse__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadRevertResponse__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadRevertResponse__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadRevertResponse__Thread" });

export type V2ThreadStartedNotification__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadStartedNotification__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadStartedNotification__GitInfo | null;
  readonly historyMode?: V2ThreadStartedNotification__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadStartedNotification__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadStartedNotification__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadStartedNotification__SessionSource;
  readonly status: V2ThreadStartedNotification__ThreadStatus;
  readonly threadSource?: V2ThreadStartedNotification__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadStartedNotification__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadStartedNotification__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadStartedNotification__AbsolutePathBuf> =>
      V2ThreadStartedNotification__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadStartedNotification__ThreadHistoryMode> =>
        V2ThreadStartedNotification__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadStartedNotification__SessionSource> =>
      V2ThreadStartedNotification__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadStartedNotification__ThreadStatus> =>
      V2ThreadStartedNotification__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadStartedNotification__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadStartedNotification__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadStartedNotification__Thread" });

export type V2ThreadStartResponse__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadStartResponse__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadStartResponse__GitInfo | null;
  readonly historyMode?: V2ThreadStartResponse__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadStartResponse__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadStartResponse__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadStartResponse__SessionSource;
  readonly status: V2ThreadStartResponse__ThreadStatus;
  readonly threadSource?: V2ThreadStartResponse__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadStartResponse__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadStartResponse__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadStartResponse__AbsolutePathBuf> =>
      V2ThreadStartResponse__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadStartResponse__ThreadHistoryMode> =>
        V2ThreadStartResponse__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadStartResponse__SessionSource> => V2ThreadStartResponse__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadStartResponse__ThreadStatus> => V2ThreadStartResponse__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadStartResponse__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadStartResponse__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadStartResponse__Thread" });

export type V2ThreadUnarchiveResponse__Thread = {
  readonly agentNickname?: string | null;
  readonly agentRole?: string | null;
  readonly cliVersion: string;
  readonly createdAt: number;
  readonly cwd: V2ThreadUnarchiveResponse__AbsolutePathBuf;
  readonly ephemeral: boolean;
  readonly forkedFromId?: string | null;
  readonly gitInfo?: V2ThreadUnarchiveResponse__GitInfo | null;
  readonly historyMode?: V2ThreadUnarchiveResponse__ThreadHistoryMode;
  readonly id: string;
  readonly model?: string | null;
  readonly modelProvider: string;
  readonly name?: string | null;
  readonly originator?: string | null;
  readonly parentThreadId?: string | null;
  readonly path?: string | null;
  readonly preview: string;
  readonly projectId: string | null;
  readonly reasoningEffort?: V2ThreadUnarchiveResponse__ReasoningEffort | null;
  readonly recencyAt?: number | null;
  readonly section?: V2ThreadUnarchiveResponse__ThreadSection | null;
  readonly sectionEnteredAt?: number | null;
  readonly sessionId: string;
  readonly source: V2ThreadUnarchiveResponse__SessionSource;
  readonly status: V2ThreadUnarchiveResponse__ThreadStatus;
  readonly threadSource?: V2ThreadUnarchiveResponse__ThreadSource | null;
  readonly turns: ReadonlyArray<V2ThreadUnarchiveResponse__Turn>;
  readonly updatedAt: number;
};
export const V2ThreadUnarchiveResponse__Thread = Schema.Struct({
  agentNickname: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional random unique nickname assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  agentRole: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional role (agent_role) assigned to an AgentControl-spawned sub-agent.",
      }),
      Schema.Null,
    ]),
  ),
  cliVersion: Schema.String.annotate({
    description: "Version of the CLI that created the thread.",
  }),
  createdAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was created.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  cwd: Schema.suspend(
    (): Schema.Codec<V2ThreadUnarchiveResponse__AbsolutePathBuf> =>
      V2ThreadUnarchiveResponse__AbsolutePathBuf,
  ).annotate({ description: "Working directory captured for the thread." }),
  ephemeral: Schema.Boolean.annotate({
    description: "Whether the thread is ephemeral and should not be materialized on disk.",
  }),
  forkedFromId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Source thread id when this thread was created by forking another thread.",
      }),
      Schema.Null,
    ]),
  ),
  gitInfo: Schema.optionalKey(
    Schema.Union([V2ThreadUnarchiveResponse__GitInfo, Schema.Null]).annotate({
      description: "Optional Git metadata captured when the thread was created.",
    }),
  ),
  historyMode: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<V2ThreadUnarchiveResponse__ThreadHistoryMode> =>
        V2ThreadUnarchiveResponse__ThreadHistoryMode,
    ).annotate({
      description: "Persisted thread history contract selected when this thread was created.",
      default: "legacy",
    }),
  ),
  id: Schema.String.annotate({
    description: "Identifier for this thread. Codex-generated thread IDs are UUIDv7.",
  }),
  model: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Current configured model when loaded, otherwise the latest persisted model. Null when unavailable. This is not per-turn execution telemetry.",
      }),
      Schema.Null,
    ]),
  ),
  modelProvider: Schema.String.annotate({
    description: "Model provider used for this thread (for example, 'openai').",
  }),
  name: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional user-facing thread title." }),
      Schema.Null,
    ]),
  ),
  originator: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Originator recorded when the thread was created, independent of its current client or executor. Null when the recorded originator is unavailable.",
      }),
      Schema.Null,
    ]),
  ),
  parentThreadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "The ID of the parent thread. This will only be set if this thread is a subagent.",
      }),
      Schema.Null,
    ]),
  ),
  path: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "[UNSTABLE] Path to the thread on disk." }),
      Schema.Null,
    ]),
  ),
  preview: Schema.String.annotate({
    description: "Usually the first user message in the thread, if available.",
  }),
  projectId: Schema.Union([
    Schema.String.annotate({
      description: "Canonical project assignment owned by app-server, if any.",
    }),
    Schema.Null,
  ]),
  reasoningEffort: Schema.optionalKey(
    Schema.Union([V2ThreadUnarchiveResponse__ReasoningEffort, Schema.Null]).annotate({
      description:
        "Current configured reasoning effort when loaded, otherwise the latest persisted effort. Null when unset or unavailable. This is not per-turn execution telemetry.",
    }),
  ),
  recencyAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp (in seconds) used for thread recency ordering.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  section: Schema.optionalKey(
    Schema.Union([V2ThreadUnarchiveResponse__ThreadSection, Schema.Null]).annotate({
      description: "The independently persisted section selected for this thread, if any.",
    }),
  ),
  sectionEnteredAt: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Unix timestamp in seconds when the thread entered its current section.",
        format: "int64",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      Schema.Null,
    ]),
  ),
  sessionId: Schema.String.annotate({
    description: "Session id shared by threads that belong to the same session tree.",
  }),
  source: Schema.suspend(
    (): Schema.Codec<V2ThreadUnarchiveResponse__SessionSource> =>
      V2ThreadUnarchiveResponse__SessionSource,
  ).annotate({
    description: "Origin of the thread (CLI, VSCode, codex exec, codex app-server, etc.).",
  }),
  status: Schema.suspend(
    (): Schema.Codec<V2ThreadUnarchiveResponse__ThreadStatus> =>
      V2ThreadUnarchiveResponse__ThreadStatus,
  ).annotate({ description: "Current runtime status for the thread." }),
  threadSource: Schema.optionalKey(
    Schema.Union([V2ThreadUnarchiveResponse__ThreadSource, Schema.Null]).annotate({
      description: "Optional analytics source classification for this thread.",
    }),
  ),
  turns: Schema.Array(V2ThreadUnarchiveResponse__Turn).annotate({
    description:
      "Only populated on `thread/resume`, `thread/fork`, and `thread/read` (when `includeTurns` is true) responses. For all other responses and notifications returning a Thread, the turns field will be an empty list.",
  }),
  updatedAt: Schema.Number.annotate({
    description: "Unix timestamp (in seconds) when the thread was last updated.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
}).annotate({ identifier: "V2ThreadUnarchiveResponse__Thread" });

export type McpServerElicitationRequestParams__McpElicitationSchema = {
  readonly $schema?: string | null;
  readonly properties: {
    readonly [x: string]: McpServerElicitationRequestParams__McpElicitationPrimitiveSchema;
  };
  readonly required?: ReadonlyArray<string> | null;
  readonly type: McpServerElicitationRequestParams__McpElicitationObjectType;
};
export const McpServerElicitationRequestParams__McpElicitationSchema = Schema.Struct({
  $schema: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  properties: Schema.Record(
    Schema.String,
    McpServerElicitationRequestParams__McpElicitationPrimitiveSchema,
  ),
  required: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  type: McpServerElicitationRequestParams__McpElicitationObjectType,
}).annotate({
  description:
    "Typed form schema for MCP `elicitation/create` requests.\n\nThis matches the `requestedSchema` shape from the MCP 2025-11-25 `ElicitRequestFormParams` schema.",
  identifier: "McpServerElicitationRequestParams__McpElicitationSchema",
});

export type ServerNotification__ThreadStartedNotification = {
  readonly thread: ServerNotification__Thread;
};
export const ServerNotification__ThreadStartedNotification = Schema.Struct({
  thread: ServerNotification__Thread,
}).annotate({ identifier: "ServerNotification__ThreadStartedNotification" });

export type ServerNotification__GuardianApprovalReviewAction =
  | {
      readonly command: string;
      readonly cwd: ServerNotification__LegacyAppPathString;
      readonly source: ServerNotification__GuardianCommandSource;
      readonly type: "command";
    }
  | {
      readonly argv: ReadonlyArray<string>;
      readonly cwd: ServerNotification__AbsolutePathBuf;
      readonly program: string;
      readonly source: ServerNotification__GuardianCommandSource;
      readonly type: "execve";
    }
  | {
      readonly approvalId: string;
      readonly cwd: ServerNotification__LegacyAppPathString;
      readonly processId: string;
      readonly stdin: string;
      readonly type: "writeStdin";
    }
  | {
      readonly cwd: ServerNotification__LegacyAppPathString;
      readonly files: ReadonlyArray<ServerNotification__LegacyAppPathString>;
      readonly type: "applyPatch";
    }
  | {
      readonly host: string;
      readonly port: number;
      readonly protocol: ServerNotification__NetworkApprovalProtocol;
      readonly target: string;
      readonly type: "networkAccess";
    }
  | {
      readonly connectorId?: string | null;
      readonly connectorName?: string | null;
      readonly server: string;
      readonly toolName: string;
      readonly toolTitle?: string | null;
      readonly type: "mcpToolCall";
    }
  | {
      readonly permissions: ServerNotification__RequestPermissionProfile;
      readonly reason?: string | null;
      readonly type: "requestPermissions";
    };
export const ServerNotification__GuardianApprovalReviewAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      cwd: ServerNotification__LegacyAppPathString,
      source: ServerNotification__GuardianCommandSource,
      type: Schema.Literal("command").annotate({
        title: "CommandGuardianApprovalReviewActionType",
      }),
    }).annotate({ title: "CommandGuardianApprovalReviewAction" }),
    Schema.Struct({
      argv: Schema.Array(Schema.String),
      cwd: ServerNotification__AbsolutePathBuf,
      program: Schema.String,
      source: ServerNotification__GuardianCommandSource,
      type: Schema.Literal("execve").annotate({ title: "ExecveGuardianApprovalReviewActionType" }),
    }).annotate({ title: "ExecveGuardianApprovalReviewAction" }),
    Schema.Struct({
      approvalId: Schema.String,
      cwd: ServerNotification__LegacyAppPathString,
      processId: Schema.String,
      stdin: Schema.String,
      type: Schema.Literal("writeStdin").annotate({
        title: "WriteStdinGuardianApprovalReviewActionType",
      }),
    }).annotate({
      title: "WriteStdinGuardianApprovalReviewAction",
      description: "A child approval for input to an existing command execution item.",
    }),
    Schema.Struct({
      cwd: ServerNotification__LegacyAppPathString,
      files: Schema.Array(ServerNotification__LegacyAppPathString),
      type: Schema.Literal("applyPatch").annotate({
        title: "ApplyPatchGuardianApprovalReviewActionType",
      }),
    }).annotate({ title: "ApplyPatchGuardianApprovalReviewAction" }),
    Schema.Struct({
      host: Schema.String,
      port: Schema.Number.annotate({ format: "uint16" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      protocol: ServerNotification__NetworkApprovalProtocol,
      target: Schema.String,
      type: Schema.Literal("networkAccess").annotate({
        title: "NetworkAccessGuardianApprovalReviewActionType",
      }),
    }).annotate({ title: "NetworkAccessGuardianApprovalReviewAction" }),
    Schema.Struct({
      connectorId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      connectorName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      server: Schema.String,
      toolName: Schema.String,
      toolTitle: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("mcpToolCall").annotate({
        title: "McpToolCallGuardianApprovalReviewActionType",
      }),
    }).annotate({ title: "McpToolCallGuardianApprovalReviewAction" }),
    Schema.Struct({
      permissions: ServerNotification__RequestPermissionProfile,
      reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("requestPermissions").annotate({
        title: "RequestPermissionsGuardianApprovalReviewActionType",
      }),
    }).annotate({ title: "RequestPermissionsGuardianApprovalReviewAction" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerNotification__GuardianApprovalReviewAction" });

export type ServerRequest__PermissionsRequestApprovalParams = {
  readonly cwd: ServerRequest__LegacyAppPathString;
  readonly environmentId?: string | null;
  readonly itemId: string;
  readonly permissions: ServerRequest__RequestPermissionProfile;
  readonly reason?: string | null;
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerRequest__PermissionsRequestApprovalParams = Schema.Struct({
  cwd: ServerRequest__LegacyAppPathString,
  environmentId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  itemId: Schema.String,
  permissions: ServerRequest__RequestPermissionProfile,
  reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this approval request started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ identifier: "ServerRequest__PermissionsRequestApprovalParams" });

export type ServerRequest__McpElicitationSchema = {
  readonly $schema?: string | null;
  readonly properties: { readonly [x: string]: ServerRequest__McpElicitationPrimitiveSchema };
  readonly required?: ReadonlyArray<string> | null;
  readonly type: ServerRequest__McpElicitationObjectType;
};
export const ServerRequest__McpElicitationSchema = Schema.Struct({
  $schema: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  properties: Schema.Record(Schema.String, ServerRequest__McpElicitationPrimitiveSchema),
  required: Schema.optionalKey(Schema.Union([Schema.Array(Schema.String), Schema.Null])),
  type: ServerRequest__McpElicitationObjectType,
}).annotate({
  description:
    "Typed form schema for MCP `elicitation/create` requests.\n\nThis matches the `requestedSchema` shape from the MCP 2025-11-25 `ElicitRequestFormParams` schema.",
  identifier: "ServerRequest__McpElicitationSchema",
});

export type V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewAction =
  | {
      readonly command: string;
      readonly cwd: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString;
      readonly source: V2ItemGuardianApprovalReviewCompletedNotification__GuardianCommandSource;
      readonly type: "command";
    }
  | {
      readonly argv: ReadonlyArray<string>;
      readonly cwd: V2ItemGuardianApprovalReviewCompletedNotification__AbsolutePathBuf;
      readonly program: string;
      readonly source: V2ItemGuardianApprovalReviewCompletedNotification__GuardianCommandSource;
      readonly type: "execve";
    }
  | {
      readonly approvalId: string;
      readonly cwd: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString;
      readonly processId: string;
      readonly stdin: string;
      readonly type: "writeStdin";
    }
  | {
      readonly cwd: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString;
      readonly files: ReadonlyArray<V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString>;
      readonly type: "applyPatch";
    }
  | {
      readonly host: string;
      readonly port: number;
      readonly protocol: V2ItemGuardianApprovalReviewCompletedNotification__NetworkApprovalProtocol;
      readonly target: string;
      readonly type: "networkAccess";
    }
  | {
      readonly connectorId?: string | null;
      readonly connectorName?: string | null;
      readonly server: string;
      readonly toolName: string;
      readonly toolTitle?: string | null;
      readonly type: "mcpToolCall";
    }
  | {
      readonly permissions: V2ItemGuardianApprovalReviewCompletedNotification__RequestPermissionProfile;
      readonly reason?: string | null;
      readonly type: "requestPermissions";
    };
export const V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewAction =
  Schema.Union(
    [
      Schema.Struct({
        command: Schema.String,
        cwd: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
        source: V2ItemGuardianApprovalReviewCompletedNotification__GuardianCommandSource,
        type: Schema.Literal("command").annotate({
          title: "CommandGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "CommandGuardianApprovalReviewAction" }),
      Schema.Struct({
        argv: Schema.Array(Schema.String),
        cwd: V2ItemGuardianApprovalReviewCompletedNotification__AbsolutePathBuf,
        program: Schema.String,
        source: V2ItemGuardianApprovalReviewCompletedNotification__GuardianCommandSource,
        type: Schema.Literal("execve").annotate({
          title: "ExecveGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "ExecveGuardianApprovalReviewAction" }),
      Schema.Struct({
        approvalId: Schema.String,
        cwd: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
        processId: Schema.String,
        stdin: Schema.String,
        type: Schema.Literal("writeStdin").annotate({
          title: "WriteStdinGuardianApprovalReviewActionType",
        }),
      }).annotate({
        title: "WriteStdinGuardianApprovalReviewAction",
        description: "A child approval for input to an existing command execution item.",
      }),
      Schema.Struct({
        cwd: V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString,
        files: Schema.Array(V2ItemGuardianApprovalReviewCompletedNotification__LegacyAppPathString),
        type: Schema.Literal("applyPatch").annotate({
          title: "ApplyPatchGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "ApplyPatchGuardianApprovalReviewAction" }),
      Schema.Struct({
        host: Schema.String,
        port: Schema.Number.annotate({ format: "uint16" })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          ),
        protocol: V2ItemGuardianApprovalReviewCompletedNotification__NetworkApprovalProtocol,
        target: Schema.String,
        type: Schema.Literal("networkAccess").annotate({
          title: "NetworkAccessGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "NetworkAccessGuardianApprovalReviewAction" }),
      Schema.Struct({
        connectorId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        connectorName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        server: Schema.String,
        toolName: Schema.String,
        toolTitle: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.Literal("mcpToolCall").annotate({
          title: "McpToolCallGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "McpToolCallGuardianApprovalReviewAction" }),
      Schema.Struct({
        permissions: V2ItemGuardianApprovalReviewCompletedNotification__RequestPermissionProfile,
        reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.Literal("requestPermissions").annotate({
          title: "RequestPermissionsGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "RequestPermissionsGuardianApprovalReviewAction" }),
    ],
    { mode: "oneOf" },
  ).annotate({
    identifier: "V2ItemGuardianApprovalReviewCompletedNotification__GuardianApprovalReviewAction",
  });

export type V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewAction =
  | {
      readonly command: string;
      readonly cwd: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString;
      readonly source: V2ItemGuardianApprovalReviewStartedNotification__GuardianCommandSource;
      readonly type: "command";
    }
  | {
      readonly argv: ReadonlyArray<string>;
      readonly cwd: V2ItemGuardianApprovalReviewStartedNotification__AbsolutePathBuf;
      readonly program: string;
      readonly source: V2ItemGuardianApprovalReviewStartedNotification__GuardianCommandSource;
      readonly type: "execve";
    }
  | {
      readonly approvalId: string;
      readonly cwd: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString;
      readonly processId: string;
      readonly stdin: string;
      readonly type: "writeStdin";
    }
  | {
      readonly cwd: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString;
      readonly files: ReadonlyArray<V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString>;
      readonly type: "applyPatch";
    }
  | {
      readonly host: string;
      readonly port: number;
      readonly protocol: V2ItemGuardianApprovalReviewStartedNotification__NetworkApprovalProtocol;
      readonly target: string;
      readonly type: "networkAccess";
    }
  | {
      readonly connectorId?: string | null;
      readonly connectorName?: string | null;
      readonly server: string;
      readonly toolName: string;
      readonly toolTitle?: string | null;
      readonly type: "mcpToolCall";
    }
  | {
      readonly permissions: V2ItemGuardianApprovalReviewStartedNotification__RequestPermissionProfile;
      readonly reason?: string | null;
      readonly type: "requestPermissions";
    };
export const V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewAction =
  Schema.Union(
    [
      Schema.Struct({
        command: Schema.String,
        cwd: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
        source: V2ItemGuardianApprovalReviewStartedNotification__GuardianCommandSource,
        type: Schema.Literal("command").annotate({
          title: "CommandGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "CommandGuardianApprovalReviewAction" }),
      Schema.Struct({
        argv: Schema.Array(Schema.String),
        cwd: V2ItemGuardianApprovalReviewStartedNotification__AbsolutePathBuf,
        program: Schema.String,
        source: V2ItemGuardianApprovalReviewStartedNotification__GuardianCommandSource,
        type: Schema.Literal("execve").annotate({
          title: "ExecveGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "ExecveGuardianApprovalReviewAction" }),
      Schema.Struct({
        approvalId: Schema.String,
        cwd: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
        processId: Schema.String,
        stdin: Schema.String,
        type: Schema.Literal("writeStdin").annotate({
          title: "WriteStdinGuardianApprovalReviewActionType",
        }),
      }).annotate({
        title: "WriteStdinGuardianApprovalReviewAction",
        description: "A child approval for input to an existing command execution item.",
      }),
      Schema.Struct({
        cwd: V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString,
        files: Schema.Array(V2ItemGuardianApprovalReviewStartedNotification__LegacyAppPathString),
        type: Schema.Literal("applyPatch").annotate({
          title: "ApplyPatchGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "ApplyPatchGuardianApprovalReviewAction" }),
      Schema.Struct({
        host: Schema.String,
        port: Schema.Number.annotate({ format: "uint16" })
          .check(Schema.isInt().annotate({ expected: "an integer" }))
          .check(
            Schema.isGreaterThanOrEqualTo(0).annotate({
              expected: "a value greater than or equal to 0",
            }),
          ),
        protocol: V2ItemGuardianApprovalReviewStartedNotification__NetworkApprovalProtocol,
        target: Schema.String,
        type: Schema.Literal("networkAccess").annotate({
          title: "NetworkAccessGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "NetworkAccessGuardianApprovalReviewAction" }),
      Schema.Struct({
        connectorId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        connectorName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        server: Schema.String,
        toolName: Schema.String,
        toolTitle: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.Literal("mcpToolCall").annotate({
          title: "McpToolCallGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "McpToolCallGuardianApprovalReviewAction" }),
      Schema.Struct({
        permissions: V2ItemGuardianApprovalReviewStartedNotification__RequestPermissionProfile,
        reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        type: Schema.Literal("requestPermissions").annotate({
          title: "RequestPermissionsGuardianApprovalReviewActionType",
        }),
      }).annotate({ title: "RequestPermissionsGuardianApprovalReviewAction" }),
    ],
    { mode: "oneOf" },
  ).annotate({
    identifier: "V2ItemGuardianApprovalReviewStartedNotification__GuardianApprovalReviewAction",
  });

export type ServerNotification__ItemGuardianApprovalReviewStartedNotification = {
  readonly action: ServerNotification__GuardianApprovalReviewAction;
  readonly review: ServerNotification__GuardianApprovalReview;
  readonly reviewId: string;
  readonly startedAtMs: number;
  readonly targetItemId?: string | null;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__ItemGuardianApprovalReviewStartedNotification = Schema.Struct({
  action: ServerNotification__GuardianApprovalReviewAction,
  review: ServerNotification__GuardianApprovalReview,
  reviewId: Schema.String.annotate({ description: "Stable identifier for this review." }),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this review started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  targetItemId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Identifier for the reviewed item or tool call when one exists.\n\nIn most cases, one review maps to one target item. The exceptions are - execve reviews, where a single command may contain multiple execve calls to review (only possible when using the shell_zsh_fork feature) - stdin reviews, which refer to the existing parent command item and have a separate approval ID in the action payload - network policy reviews, where there is no target item\n\nA network call is triggered by a CommandExecution item, so having a target_item_id set to the CommandExecution item would be misleading because the review is about the network call, not the command execution. Therefore, target_item_id is set to None for network policy reviews.",
      }),
      Schema.Null,
    ]),
  ),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  description:
    "[UNSTABLE] Temporary notification payload for approval auto-review. This shape is expected to change soon.",
  identifier: "ServerNotification__ItemGuardianApprovalReviewStartedNotification",
});

export type ServerNotification__ItemGuardianApprovalReviewCompletedNotification = {
  readonly action: ServerNotification__GuardianApprovalReviewAction;
  readonly completedAtMs: number;
  readonly decisionSource: ServerNotification__AutoReviewDecisionSource;
  readonly review: ServerNotification__GuardianApprovalReview;
  readonly reviewId: string;
  readonly startedAtMs: number;
  readonly targetItemId?: string | null;
  readonly threadId: string;
  readonly turnId: string;
};
export const ServerNotification__ItemGuardianApprovalReviewCompletedNotification = Schema.Struct({
  action: ServerNotification__GuardianApprovalReviewAction,
  completedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this review completed.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  decisionSource: ServerNotification__AutoReviewDecisionSource,
  review: ServerNotification__GuardianApprovalReview,
  reviewId: Schema.String.annotate({ description: "Stable identifier for this review." }),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this review started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  targetItemId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Identifier for the reviewed item or tool call when one exists.\n\nIn most cases, one review maps to one target item. The exceptions are - execve reviews, where a single command may contain multiple execve calls to review (only possible when using the shell_zsh_fork feature) - stdin reviews, which refer to the existing parent command item and have a separate approval ID in the action payload - network policy reviews, where there is no target item\n\nA network call is triggered by a CommandExecution item, so having a target_item_id set to the CommandExecution item would be misleading because the review is about the network call, not the command execution. Therefore, target_item_id is set to None for network policy reviews.",
      }),
      Schema.Null,
    ]),
  ),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  description:
    "[UNSTABLE] Temporary notification payload for approval auto-review. This shape is expected to change soon.",
  identifier: "ServerNotification__ItemGuardianApprovalReviewCompletedNotification",
});

export type ServerRequest__McpServerElicitationRequestParams =
  | {
      readonly serverName: string;
      readonly threadId: string;
      readonly turnId?: string | null;
      readonly _meta?: Schema.Json;
      readonly message: string;
      readonly mode: "form";
      readonly requestedSchema: ServerRequest__McpElicitationSchema;
    }
  | {
      readonly serverName: string;
      readonly threadId: string;
      readonly turnId?: string | null;
      readonly _meta?: Schema.Json;
      readonly message: string;
      readonly mode: "openai/form";
      readonly requestedSchema: Schema.Json;
    }
  | {
      readonly serverName: string;
      readonly threadId: string;
      readonly turnId?: string | null;
      readonly _meta?: Schema.Json;
      readonly message: string;
      readonly mode: "openaiForm";
      readonly requestedSchema: Schema.Json;
    }
  | {
      readonly serverName: string;
      readonly threadId: string;
      readonly turnId?: string | null;
      readonly _meta?: Schema.Json;
      readonly elicitationId: string;
      readonly message: string;
      readonly mode: "url";
      readonly url: string;
    };
export const ServerRequest__McpServerElicitationRequestParams = Schema.Union(
  [
    Schema.Struct({
      serverName: Schema.String,
      threadId: Schema.String,
      turnId: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Active Codex turn when this elicitation was observed, if app-server could correlate one.\n\nThis is nullable because MCP models elicitation as a standalone server-to-client request identified by the MCP server request id. It may be triggered during a turn, but turn context is app-server correlation rather than part of the protocol identity of the elicitation itself.",
          }),
          Schema.Null,
        ]),
      ),
      _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
      message: Schema.String,
      mode: Schema.Literal("form"),
      requestedSchema: ServerRequest__McpElicitationSchema,
    }),
    Schema.Struct({
      serverName: Schema.String,
      threadId: Schema.String,
      turnId: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Active Codex turn when this elicitation was observed, if app-server could correlate one.\n\nThis is nullable because MCP models elicitation as a standalone server-to-client request identified by the MCP server request id. It may be triggered during a turn, but turn context is app-server correlation rather than part of the protocol identity of the elicitation itself.",
          }),
          Schema.Null,
        ]),
      ),
      _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
      message: Schema.String,
      mode: Schema.Literal("openai/form"),
      requestedSchema: Schema.Json.annotate({ expected: "JSON value" }),
    }),
    Schema.Struct({
      serverName: Schema.String,
      threadId: Schema.String,
      turnId: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Active Codex turn when this elicitation was observed, if app-server could correlate one.\n\nThis is nullable because MCP models elicitation as a standalone server-to-client request identified by the MCP server request id. It may be triggered during a turn, but turn context is app-server correlation rather than part of the protocol identity of the elicitation itself.",
          }),
          Schema.Null,
        ]),
      ),
      _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
      message: Schema.String,
      mode: Schema.Literal("openaiForm"),
      requestedSchema: Schema.Json.annotate({ expected: "JSON value" }),
    }),
    Schema.Struct({
      serverName: Schema.String,
      threadId: Schema.String,
      turnId: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Active Codex turn when this elicitation was observed, if app-server could correlate one.\n\nThis is nullable because MCP models elicitation as a standalone server-to-client request identified by the MCP server request id. It may be triggered during a turn, but turn context is app-server correlation rather than part of the protocol identity of the elicitation itself.",
          }),
          Schema.Null,
        ]),
      ),
      _meta: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
      elicitationId: Schema.String,
      message: Schema.String,
      mode: Schema.Literal("url"),
      url: Schema.String,
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "ServerRequest__McpServerElicitationRequestParams" });

export type ApplyPatchApprovalParams = {
  readonly callId: string;
  readonly conversationId: ApplyPatchApprovalParams__ThreadId;
  readonly fileChanges: { readonly [x: string]: ApplyPatchApprovalParams__FileChange };
  readonly grantRoot?: string | null;
  readonly reason?: string | null;
};
export const ApplyPatchApprovalParams = Schema.Struct({
  callId: Schema.String.annotate({
    description:
      "Use to correlate this with [codex_protocol::protocol::PatchApplyBeginEvent] and [codex_protocol::protocol::PatchApplyEndEvent].",
  }),
  conversationId: ApplyPatchApprovalParams__ThreadId,
  fileChanges: Schema.Record(Schema.String, ApplyPatchApprovalParams__FileChange),
  grantRoot: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "When set, the agent is asking the user to allow writes under this root for the remainder of the session (unclear if this is honored today).",
      }),
      Schema.Null,
    ]),
  ),
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional explanatory reason (e.g. request for extra write access).",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "ApplyPatchApprovalParams" });

export type ApplyPatchApprovalResponse = {
  readonly decision: ApplyPatchApprovalResponse__ReviewDecision;
};
export const ApplyPatchApprovalResponse = Schema.Struct({
  decision: ApplyPatchApprovalResponse__ReviewDecision,
}).annotate({ title: "ApplyPatchApprovalResponse" });

export type AttestationGenerateParams = { readonly [x: string]: Schema.Json };
export const AttestationGenerateParams = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "AttestationGenerateParams" });

export type AttestationGenerateResponse = { readonly token: string };
export const AttestationGenerateResponse = Schema.Struct({
  token: Schema.String.annotate({ description: "Opaque client attestation token." }),
}).annotate({ title: "AttestationGenerateResponse" });

export type ChatgptAuthTokensRefreshParams = {
  readonly previousAccountId?: string | null;
  readonly reason: ChatgptAuthTokensRefreshParams__ChatgptAuthTokensRefreshReason;
};
export const ChatgptAuthTokensRefreshParams = Schema.Struct({
  previousAccountId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Workspace/account identifier that Codex was previously using.\n\nClients that manage multiple accounts/workspaces can use this as a hint to refresh the token for the correct workspace.\n\nThis may be `null` when the prior auth state did not include a workspace identifier (`chatgpt_account_id`).",
      }),
      Schema.Null,
    ]),
  ),
  reason: ChatgptAuthTokensRefreshParams__ChatgptAuthTokensRefreshReason,
}).annotate({ title: "ChatgptAuthTokensRefreshParams" });

export type ChatgptAuthTokensRefreshResponse = {
  readonly accessToken: string;
  readonly chatgptAccountId: string;
  readonly chatgptPlanType?: string | null;
};
export const ChatgptAuthTokensRefreshResponse = Schema.Struct({
  accessToken: Schema.String,
  chatgptAccountId: Schema.String,
  chatgptPlanType: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "ChatgptAuthTokensRefreshResponse" });

export type ClientNotification = { readonly method: "initialized" };
export const ClientNotification = Schema.Union(
  [
    Schema.Struct({
      method: Schema.Literal("initialized").annotate({ title: "InitializedNotificationMethod" }),
    }).annotate({ title: "InitializedNotification" }),
  ],
  { mode: "oneOf" },
).annotate({ title: "ClientNotification" });
