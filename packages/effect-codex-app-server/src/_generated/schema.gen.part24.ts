import * as Schema from "effect/Schema";
import {
  V2TurnStartParams__AdditionalContextKind,
  V2TurnStartParams__ApprovalsReviewer,
  V2TurnStartParams__AskForApproval,
  V2TurnStartParams__LegacyAppPathString,
  V2TurnStartParams__ModeKind,
  V2TurnStartParams__Personality,
  V2TurnStartParams__ReasoningEffort,
  V2TurnStartParams__ReasoningSummary,
  V2TurnSteerParams__AdditionalContextKind,
  V2WindowsSandboxReadinessResponse__WindowsSandboxReadiness,
  V2WindowsSandboxSetupCompletedNotification__WindowsSandboxSetupMode,
  V2WindowsSandboxSetupStartParams__AbsolutePathBuf,
  V2WindowsSandboxSetupStartParams__WindowsSandboxSetupMode,
} from "./schema.gen.part6.ts";
import {
  V2TurnStartParams__SandboxPolicy,
  V2TurnStartParams__Settings,
} from "./schema.gen.part11.ts";
import { V2TurnStartParams__UserInput, V2TurnSteerParams__UserInput } from "./schema.gen.part13.ts";
import { V2TurnStartParams__TurnToolOutput } from "./schema.gen.part17.ts";
import { V2TurnStartResponse__Turn } from "./schema.gen.part18.ts";

export type V2TurnStartParams = {
  readonly approvalPolicy?: V2TurnStartParams__AskForApproval | null;
  readonly approvalsReviewer?: V2TurnStartParams__ApprovalsReviewer | null;
  readonly clientUserMessageId?: string | null;
  readonly cwd?: string | null;
  readonly disabledPluginIds?: ReadonlyArray<string> | null;
  readonly effort?: V2TurnStartParams__ReasoningEffort | null;
  readonly input: ReadonlyArray<V2TurnStartParams__UserInput>;
  readonly model?: string | null;
  readonly outputSchema?: Schema.Json;
  readonly personality?: V2TurnStartParams__Personality | null;
  readonly sandboxPolicy?: V2TurnStartParams__SandboxPolicy | null;
  readonly serviceTier?: string | null;
  readonly serviceTierForTurn?: string | null;
  readonly summary?: V2TurnStartParams__ReasoningSummary | null;
  readonly threadId: string;
  readonly toolOutput?: V2TurnStartParams__TurnToolOutput | null;
  readonly turnTrigger?: string | null;
};
export const V2TurnStartParams = Schema.Struct({
  approvalPolicy: Schema.optionalKey(
    Schema.Union([V2TurnStartParams__AskForApproval, Schema.Null]).annotate({
      description: "Override the approval policy for this turn and subsequent turns.",
    }),
  ),
  approvalsReviewer: Schema.optionalKey(
    Schema.Union([V2TurnStartParams__ApprovalsReviewer, Schema.Null]).annotate({
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
    Schema.Union([V2TurnStartParams__ReasoningEffort, Schema.Null]).annotate({
      description: "Override the reasoning effort for this turn and subsequent turns.",
    }),
  ),
  input: Schema.Array(V2TurnStartParams__UserInput),
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
    Schema.Union([V2TurnStartParams__Personality, Schema.Null]).annotate({
      description:
        "@deprecated `friendly` and `pragmatic` no longer select a style. Changing this does not rewrite the thread's existing instructions.",
    }),
  ),
  sandboxPolicy: Schema.optionalKey(
    Schema.Union([V2TurnStartParams__SandboxPolicy, Schema.Null]).annotate({
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
    Schema.Union([V2TurnStartParams__ReasoningSummary, Schema.Null]).annotate({
      description: "Override the reasoning summary for this turn and subsequent turns.",
    }),
  ),
  threadId: Schema.String,
  toolOutput: Schema.optionalKey(Schema.Union([V2TurnStartParams__TurnToolOutput, Schema.Null])),
  turnTrigger: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional source classification for the caller that starts this turn. Ignored when this request steers an already-active turn.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "TurnStartParams" });

export type V2TurnStartParams__AdditionalContextEntry = {
  readonly kind: V2TurnStartParams__AdditionalContextKind;
  readonly value: string;
};
export const V2TurnStartParams__AdditionalContextEntry = Schema.Struct({
  kind: V2TurnStartParams__AdditionalContextKind,
  value: Schema.String,
});

export type V2TurnStartParams__CollaborationMode = {
  readonly mode: V2TurnStartParams__ModeKind;
  readonly settings: V2TurnStartParams__Settings;
};
export const V2TurnStartParams__CollaborationMode = Schema.Struct({
  mode: V2TurnStartParams__ModeKind,
  settings: V2TurnStartParams__Settings,
}).annotate({ description: "Collaboration mode for a Codex session." });

export type V2TurnStartParams__CyberAccessProgram = "standard" | "daybreakBlue" | "daybreakRed";
export const V2TurnStartParams__CyberAccessProgram = Schema.Literals([
  "standard",
  "daybreakBlue",
  "daybreakRed",
]).annotate({
  description:
    "Requested cyber treatment for a ChatGPT-authenticated Codex turn. Authorization and model-tier restrictions remain server-owned.",
});

export type V2TurnStartParams__MultiAgentMode =
  | "explicitRequestOnly"
  | "proactive"
  | { readonly custom: string };
export const V2TurnStartParams__MultiAgentMode = Schema.Union(
  [
    Schema.Literals(["explicitRequestOnly", "proactive"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomMultiAgentMode" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Controls the effective multi-agent delegation instructions for a turn. `custom` means the configured mode hint defines the policy instead of a built-in policy.",
});

export type V2TurnStartParams__TurnEnvironmentParams = {
  readonly cwd: V2TurnStartParams__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots?: ReadonlyArray<V2TurnStartParams__LegacyAppPathString> | null;
};
export const V2TurnStartParams__TurnEnvironmentParams = Schema.Struct({
  cwd: V2TurnStartParams__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2TurnStartParams__LegacyAppPathString).annotate({
        description: "Environment-native runtime workspace roots. Omitted defaults to `cwd`.",
      }),
      Schema.Null,
    ]),
  ),
});

export type V2TurnStartResponse = { readonly turn: V2TurnStartResponse__Turn };
export const V2TurnStartResponse = Schema.Struct({ turn: V2TurnStartResponse__Turn }).annotate({
  title: "TurnStartResponse",
});

export type V2TurnSteerParams = {
  readonly clientUserMessageId?: string | null;
  readonly expectedTurnId: string;
  readonly input: ReadonlyArray<V2TurnSteerParams__UserInput>;
  readonly threadId: string;
};
export const V2TurnSteerParams = Schema.Struct({
  clientUserMessageId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  expectedTurnId: Schema.String.annotate({
    description:
      "Required active turn id precondition. The request fails when it does not match the currently active turn.",
  }),
  input: Schema.Array(V2TurnSteerParams__UserInput),
  threadId: Schema.String,
}).annotate({ title: "TurnSteerParams" });

export type V2TurnSteerParams__AdditionalContextEntry = {
  readonly kind: V2TurnSteerParams__AdditionalContextKind;
  readonly value: string;
};
export const V2TurnSteerParams__AdditionalContextEntry = Schema.Struct({
  kind: V2TurnSteerParams__AdditionalContextKind,
  value: Schema.String,
});

export type V2TurnSteerResponse = { readonly turnId: string };
export const V2TurnSteerResponse = Schema.Struct({ turnId: Schema.String }).annotate({
  title: "TurnSteerResponse",
});

export type V2WarningNotification = { readonly message: string; readonly threadId?: string | null };
export const V2WarningNotification = Schema.Struct({
  message: Schema.String.annotate({ description: "Concise warning message for the user." }),
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional thread target when the warning applies to a specific thread.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "WarningNotification" });

export type V2WindowsSandboxReadinessResponse = {
  readonly status: V2WindowsSandboxReadinessResponse__WindowsSandboxReadiness;
};
export const V2WindowsSandboxReadinessResponse = Schema.Struct({
  status: V2WindowsSandboxReadinessResponse__WindowsSandboxReadiness,
}).annotate({ title: "WindowsSandboxReadinessResponse" });

export type V2WindowsSandboxSetupCompletedNotification = {
  readonly error?: string | null;
  readonly mode: V2WindowsSandboxSetupCompletedNotification__WindowsSandboxSetupMode;
  readonly success: boolean;
};
export const V2WindowsSandboxSetupCompletedNotification = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  mode: V2WindowsSandboxSetupCompletedNotification__WindowsSandboxSetupMode,
  success: Schema.Boolean,
}).annotate({ title: "WindowsSandboxSetupCompletedNotification" });

export type V2WindowsSandboxSetupStartParams = {
  readonly cwd?: V2WindowsSandboxSetupStartParams__AbsolutePathBuf | null;
  readonly mode: V2WindowsSandboxSetupStartParams__WindowsSandboxSetupMode;
};
export const V2WindowsSandboxSetupStartParams = Schema.Struct({
  cwd: Schema.optionalKey(
    Schema.Union([V2WindowsSandboxSetupStartParams__AbsolutePathBuf, Schema.Null]),
  ),
  mode: V2WindowsSandboxSetupStartParams__WindowsSandboxSetupMode,
}).annotate({ title: "WindowsSandboxSetupStartParams" });

export type V2WindowsSandboxSetupStartResponse = { readonly started: boolean };
export const V2WindowsSandboxSetupStartResponse = Schema.Struct({
  started: Schema.Boolean,
}).annotate({ title: "WindowsSandboxSetupStartResponse" });

export type V2WindowsWorldWritableWarningNotification = {
  readonly extraCount: number;
  readonly failedScan: boolean;
  readonly samplePaths: ReadonlyArray<string>;
};
export const V2WindowsWorldWritableWarningNotification = Schema.Struct({
  extraCount: Schema.Number.annotate({ format: "uint" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  failedScan: Schema.Boolean,
  samplePaths: Schema.Array(Schema.String),
}).annotate({ title: "WindowsWorldWritableWarningNotification" });
