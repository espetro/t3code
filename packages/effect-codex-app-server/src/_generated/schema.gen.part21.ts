/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  ServerNotification__LegacyAppPathString,
  ServerNotification__ThreadArchivedNotification,
  ServerNotification__ThreadDeletedNotification,
  ServerNotification__ThreadUnarchivedNotification,
} from "./schema.gen.part0.ts";
import {
  ServerNotification__AgentMessageDeltaNotification,
  ServerNotification__AuthRecoveryNotification,
  ServerNotification__CommandExecutionOutputDeltaNotification,
  ServerNotification__ContextCompactedNotification,
  ServerNotification__DeprecationNoticeNotification,
  ServerNotification__EnvironmentConnectionNotification,
  ServerNotification__FileChangeOutputDeltaNotification,
  ServerNotification__FuzzyFileSearchSessionCompletedNotification,
  ServerNotification__GuardianWarningNotification,
  ServerNotification__McpServerOauthLoginCompletedNotification,
  ServerNotification__McpToolCallProgressNotification,
  ServerNotification__ModelSafetyBufferingUpdatedNotification,
  ServerNotification__PlanDeltaNotification,
  ServerNotification__ProcessExitedNotification,
  ServerNotification__ReasoningSummaryPartAddedNotification,
  ServerNotification__ReasoningSummaryTextDeltaNotification,
  ServerNotification__ReasoningTextDeltaNotification,
  ServerNotification__SkillsChangedNotification,
  ServerNotification__StrictReviewRequiredNotification,
  ServerNotification__TerminalInteractionNotification,
  ServerNotification__ThreadClosedNotification,
  ServerNotification__ThreadGoalClearedNotification,
  ServerNotification__ThreadNameUpdatedNotification,
  ServerNotification__ThreadProjectUpdatedNotification,
  ServerNotification__ThreadQueueChangedNotification,
  ServerNotification__ThreadRealtimeClosedNotification,
  ServerNotification__ThreadRealtimeErrorNotification,
  ServerNotification__ThreadRealtimeItemAddedNotification,
  ServerNotification__ThreadRealtimeItemTranscriptDeltaNotification,
  ServerNotification__ThreadRealtimeSdpNotification,
  ServerNotification__ThreadRealtimeTranscriptDeltaNotification,
  ServerNotification__ThreadRealtimeTranscriptDoneNotification,
  ServerNotification__ThreadRevertedNotification,
  ServerNotification__TurnDiffUpdatedNotification,
  ServerNotification__TurnModerationMetadataNotification,
  ServerNotification__WarningNotification,
  ServerNotification__WindowsWorldWritableWarningNotification,
  ServerRequest__AdditionalNetworkPermissions,
  ServerRequest__AttestationGenerateParams,
  ServerRequest__DynamicToolCallParams,
  ServerRequest__FileChangeRequestApprovalParams,
  ServerRequest__RequestId,
  ToolRequestUserInputResponse__ToolRequestUserInputAnswer,
  V1InitializeParams__ClientInfo,
  V1InitializeParams__InitializeCapabilities,
  V1InitializeResponse__AbsolutePathBuf,
  V2AccountLoginCompletedNotification__DesktopOnboardingEntrypoint,
  V2AccountUpdatedNotification__AuthMode,
  V2AccountUpdatedNotification__PlanType,
  V2AppsInstalledResponse__InstalledApp,
  V2CancelLoginAccountResponse__CancelLoginAccountStatus,
  V2CommandExecOutputDeltaNotification__CommandExecOutputStream,
  V2CommandExecParams__CommandExecTerminalSize,
  V2CommandExecResizeParams__CommandExecTerminalSize,
  V2ConfigReadResponse__AppLinksConfig,
  V2ConfigReadResponse__AppToolApproval,
  V2ConfigReadResponse__AppToolsConfig,
  V2ConfigReadResponse__ApprovalsReviewer,
  V2ConfigReadResponse__ToolExposureSurface,
} from "./schema.gen.part1.ts";
import {
  ServerNotification__AccountLoginCompletedNotification,
  ServerNotification__AccountUpdatedNotification,
  ServerNotification__CommandExecOutputDeltaNotification,
  ServerNotification__FsChangedNotification,
  ServerNotification__GatewayOAuthChangedNotification,
  ServerNotification__McpServerEventStreamNotification,
  ServerNotification__McpServerStatusUpdatedNotification,
  ServerNotification__ModelReroutedNotification,
  ServerNotification__ModelVerificationNotification,
  ServerNotification__ProcessOutputDeltaNotification,
  ServerNotification__ProjectChangedNotification,
  ServerNotification__RemoteControlStatusChangedNotification,
  ServerNotification__ServerRequestResolvedNotification,
  ServerNotification__ThreadAttachmentUpdatedNotification,
  ServerNotification__ThreadRealtimeOutputAudioDeltaNotification,
  ServerNotification__ThreadRealtimeStartedNotification,
  ServerNotification__WindowsSandboxSetupCompletedNotification,
  ServerRequest__ApplyPatchApprovalParams,
  ServerRequest__ChatgptAuthTokensRefreshParams,
  ServerRequest__ExecCommandApprovalParams,
  ServerRequest__NetworkPolicyAmendment,
  ToolRequestUserInputParams__ToolRequestUserInputQuestion,
  V2AccountRateLimitsUpdatedNotification__RateLimitSnapshot,
  V2AppsReadResponse__ConnectorMetadata,
  V2CommandExecParams__SandboxPolicy,
  V2ConfigBatchWriteParams__ConfigEdit,
} from "./schema.gen.part7.ts";
import {
  ServerNotification__AccountRateLimitsUpdatedNotification,
  ServerNotification__ConfigWarningNotification,
  ServerNotification__FileChangePatchUpdatedNotification,
  ServerNotification__FuzzyFileSearchSessionUpdatedNotification,
  ServerNotification__ThreadGoalUpdatedNotification,
  ServerNotification__ThreadRealtimeItemCompletedNotification,
  ServerNotification__ThreadRealtimeItemStartedNotification,
  ServerNotification__ThreadStatusChangedNotification,
  ServerNotification__ThreadTokenUsageUpdatedNotification,
  ServerNotification__TurnPlanUpdatedNotification,
  ServerRequest__CommandExecutionRequestApprovalParams,
  ServerRequest__ToolRequestUserInputParams,
  V2AppListUpdatedNotification__AppInfo,
  V2AppsListResponse__AppInfo,
  V2ConfigReadResponse__ConfigLayer,
  V2ConfigReadResponse__ConfigLayerMetadata,
} from "./schema.gen.part12.ts";
import {
  ServerNotification__AppListUpdatedNotification,
  ServerNotification__ErrorNotification,
  ServerNotification__ExternalAgentConfigImportCompletedNotification,
  ServerNotification__ExternalAgentConfigImportProgressNotification,
  ServerNotification__HookCompletedNotification,
  ServerNotification__HookStartedNotification,
} from "./schema.gen.part13.ts";
import {
  ServerNotification__ItemCompletedNotification,
  ServerNotification__ItemStartedNotification,
  ServerNotification__ThreadSettingsUpdatedNotification,
  ServerRequest__AdditionalFileSystemPermissions,
} from "./schema.gen.part17.ts";
import {
  ServerNotification__TurnCompletedNotification,
  ServerNotification__TurnStartedNotification,
  V2ConfigReadResponse__Config,
} from "./schema.gen.part18.ts";
import {
  ServerNotification__ItemGuardianApprovalReviewCompletedNotification,
  ServerNotification__ItemGuardianApprovalReviewStartedNotification,
  ServerNotification__ThreadStartedNotification,
  ServerRequest__McpServerElicitationRequestParams,
  ServerRequest__PermissionsRequestApprovalParams,
} from "./schema.gen.part19.ts";

export type ServerNotification =
  | {
      readonly emittedAtMs?: number;
      readonly method: "error";
      readonly params: ServerNotification__ErrorNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/started";
      readonly params: ServerNotification__ThreadStartedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/status/changed";
      readonly params: ServerNotification__ThreadStatusChangedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/archived";
      readonly params: ServerNotification__ThreadArchivedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/deleted";
      readonly params: ServerNotification__ThreadDeletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/unarchived";
      readonly params: ServerNotification__ThreadUnarchivedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/closed";
      readonly params: ServerNotification__ThreadClosedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/reverted";
      readonly params: ServerNotification__ThreadRevertedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "skills/changed";
      readonly params: ServerNotification__SkillsChangedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/name/updated";
      readonly params: ServerNotification__ThreadNameUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/attachment/updated";
      readonly params: ServerNotification__ThreadAttachmentUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/goal/updated";
      readonly params: ServerNotification__ThreadGoalUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/goal/cleared";
      readonly params: ServerNotification__ThreadGoalClearedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/queue/changed";
      readonly params: ServerNotification__ThreadQueueChangedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "project/changed";
      readonly params: ServerNotification__ProjectChangedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/project/updated";
      readonly params: ServerNotification__ThreadProjectUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/environment/connected";
      readonly params: ServerNotification__EnvironmentConnectionNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/environment/disconnected";
      readonly params: ServerNotification__EnvironmentConnectionNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/settings/updated";
      readonly params: ServerNotification__ThreadSettingsUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/tokenUsage/updated";
      readonly params: ServerNotification__ThreadTokenUsageUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "turn/started";
      readonly params: ServerNotification__TurnStartedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "hook/started";
      readonly params: ServerNotification__HookStartedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "turn/completed";
      readonly params: ServerNotification__TurnCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "hook/completed";
      readonly params: ServerNotification__HookCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "turn/diff/updated";
      readonly params: ServerNotification__TurnDiffUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "turn/plan/updated";
      readonly params: ServerNotification__TurnPlanUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/started";
      readonly params: ServerNotification__ItemStartedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/autoApprovalReview/started";
      readonly params: ServerNotification__ItemGuardianApprovalReviewStartedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/autoApprovalReview/completed";
      readonly params: ServerNotification__ItemGuardianApprovalReviewCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "autoApprovalReview/strictReviewRequired";
      readonly params: ServerNotification__StrictReviewRequiredNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/completed";
      readonly params: ServerNotification__ItemCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/agentMessage/delta";
      readonly params: ServerNotification__AgentMessageDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/plan/delta";
      readonly params: ServerNotification__PlanDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "command/exec/outputDelta";
      readonly params: ServerNotification__CommandExecOutputDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "process/outputDelta";
      readonly params: ServerNotification__ProcessOutputDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "process/exited";
      readonly params: ServerNotification__ProcessExitedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/commandExecution/outputDelta";
      readonly params: ServerNotification__CommandExecutionOutputDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/commandExecution/terminalInteraction";
      readonly params: ServerNotification__TerminalInteractionNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/fileChange/outputDelta";
      readonly params: ServerNotification__FileChangeOutputDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/fileChange/patchUpdated";
      readonly params: ServerNotification__FileChangePatchUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "serverRequest/resolved";
      readonly params: ServerNotification__ServerRequestResolvedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/mcpToolCall/progress";
      readonly params: ServerNotification__McpToolCallProgressNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "mcpServer/oauthLogin/completed";
      readonly params: ServerNotification__McpServerOauthLoginCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "mcpServer/startupStatus/updated";
      readonly params: ServerNotification__McpServerStatusUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "mcpServer/event/stream/notification";
      readonly params: ServerNotification__McpServerEventStreamNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "account/updated";
      readonly params: ServerNotification__AccountUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "account/gatewayOAuth/changed";
      readonly params: ServerNotification__GatewayOAuthChangedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "account/rateLimits/updated";
      readonly params: ServerNotification__AccountRateLimitsUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "app/list/updated";
      readonly params: ServerNotification__AppListUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "remoteControl/status/changed";
      readonly params: ServerNotification__RemoteControlStatusChangedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "externalAgentConfig/import/progress";
      readonly params: ServerNotification__ExternalAgentConfigImportProgressNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "externalAgentConfig/import/completed";
      readonly params: ServerNotification__ExternalAgentConfigImportCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "fs/changed";
      readonly params: ServerNotification__FsChangedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/reasoning/summaryTextDelta";
      readonly params: ServerNotification__ReasoningSummaryTextDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/reasoning/summaryPartAdded";
      readonly params: ServerNotification__ReasoningSummaryPartAddedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "item/reasoning/textDelta";
      readonly params: ServerNotification__ReasoningTextDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/compacted";
      readonly params: ServerNotification__ContextCompactedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "model/rerouted";
      readonly params: ServerNotification__ModelReroutedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "model/verification";
      readonly params: ServerNotification__ModelVerificationNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "modelProvider/authRecoveryStarted";
      readonly params: ServerNotification__AuthRecoveryNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "modelProvider/authRecoveryCompleted";
      readonly params: ServerNotification__AuthRecoveryNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "turn/moderationMetadata";
      readonly params: ServerNotification__TurnModerationMetadataNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "model/safetyBuffering/updated";
      readonly params: ServerNotification__ModelSafetyBufferingUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "warning";
      readonly params: ServerNotification__WarningNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "guardianWarning";
      readonly params: ServerNotification__GuardianWarningNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "deprecationNotice";
      readonly params: ServerNotification__DeprecationNoticeNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "configWarning";
      readonly params: ServerNotification__ConfigWarningNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "fuzzyFileSearch/sessionUpdated";
      readonly params: ServerNotification__FuzzyFileSearchSessionUpdatedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "fuzzyFileSearch/sessionCompleted";
      readonly params: ServerNotification__FuzzyFileSearchSessionCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/started";
      readonly params: ServerNotification__ThreadRealtimeStartedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/itemAdded";
      readonly params: ServerNotification__ThreadRealtimeItemAddedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/item/started";
      readonly params: ServerNotification__ThreadRealtimeItemStartedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/item/transcript/delta";
      readonly params: ServerNotification__ThreadRealtimeItemTranscriptDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/item/completed";
      readonly params: ServerNotification__ThreadRealtimeItemCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/transcript/delta";
      readonly params: ServerNotification__ThreadRealtimeTranscriptDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/transcript/done";
      readonly params: ServerNotification__ThreadRealtimeTranscriptDoneNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/outputAudio/delta";
      readonly params: ServerNotification__ThreadRealtimeOutputAudioDeltaNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/sdp";
      readonly params: ServerNotification__ThreadRealtimeSdpNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/error";
      readonly params: ServerNotification__ThreadRealtimeErrorNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "thread/realtime/closed";
      readonly params: ServerNotification__ThreadRealtimeClosedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "windows/worldWritableWarning";
      readonly params: ServerNotification__WindowsWorldWritableWarningNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "windowsSandbox/setupCompleted";
      readonly params: ServerNotification__WindowsSandboxSetupCompletedNotification;
    }
  | {
      readonly emittedAtMs?: number;
      readonly method: "account/login/completed";
      readonly params: ServerNotification__AccountLoginCompletedNotification;
    };
export const ServerNotification = Schema.Union(
  [
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("error").annotate({ title: "ErrorNotificationMethod" }),
      params: ServerNotification__ErrorNotification,
    }).annotate({ title: "ErrorNotification", description: "NEW NOTIFICATIONS" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/started").annotate({
        title: "Thread/startedNotificationMethod",
      }),
      params: ServerNotification__ThreadStartedNotification,
    }).annotate({ title: "Thread/startedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/status/changed").annotate({
        title: "Thread/status/changedNotificationMethod",
      }),
      params: ServerNotification__ThreadStatusChangedNotification,
    }).annotate({ title: "Thread/status/changedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/archived").annotate({
        title: "Thread/archivedNotificationMethod",
      }),
      params: ServerNotification__ThreadArchivedNotification,
    }).annotate({ title: "Thread/archivedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/deleted").annotate({
        title: "Thread/deletedNotificationMethod",
      }),
      params: ServerNotification__ThreadDeletedNotification,
    }).annotate({ title: "Thread/deletedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/unarchived").annotate({
        title: "Thread/unarchivedNotificationMethod",
      }),
      params: ServerNotification__ThreadUnarchivedNotification,
    }).annotate({ title: "Thread/unarchivedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/closed").annotate({
        title: "Thread/closedNotificationMethod",
      }),
      params: ServerNotification__ThreadClosedNotification,
    }).annotate({ title: "Thread/closedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/reverted").annotate({
        title: "Thread/revertedNotificationMethod",
      }),
      params: ServerNotification__ThreadRevertedNotification,
    }).annotate({ title: "Thread/revertedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("skills/changed").annotate({
        title: "Skills/changedNotificationMethod",
      }),
      params: ServerNotification__SkillsChangedNotification,
    }).annotate({ title: "Skills/changedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/name/updated").annotate({
        title: "Thread/name/updatedNotificationMethod",
      }),
      params: ServerNotification__ThreadNameUpdatedNotification,
    }).annotate({ title: "Thread/name/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/attachment/updated").annotate({
        title: "Thread/attachment/updatedNotificationMethod",
      }),
      params: ServerNotification__ThreadAttachmentUpdatedNotification,
    }).annotate({ title: "Thread/attachment/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/goal/updated").annotate({
        title: "Thread/goal/updatedNotificationMethod",
      }),
      params: ServerNotification__ThreadGoalUpdatedNotification,
    }).annotate({ title: "Thread/goal/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/goal/cleared").annotate({
        title: "Thread/goal/clearedNotificationMethod",
      }),
      params: ServerNotification__ThreadGoalClearedNotification,
    }).annotate({ title: "Thread/goal/clearedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/queue/changed").annotate({
        title: "Thread/queue/changedNotificationMethod",
      }),
      params: ServerNotification__ThreadQueueChangedNotification,
    }).annotate({ title: "Thread/queue/changedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("project/changed").annotate({
        title: "Project/changedNotificationMethod",
      }),
      params: ServerNotification__ProjectChangedNotification,
    }).annotate({ title: "Project/changedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/project/updated").annotate({
        title: "Thread/project/updatedNotificationMethod",
      }),
      params: ServerNotification__ThreadProjectUpdatedNotification,
    }).annotate({ title: "Thread/project/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/environment/connected").annotate({
        title: "Thread/environment/connectedNotificationMethod",
      }),
      params: ServerNotification__EnvironmentConnectionNotification,
    }).annotate({ title: "Thread/environment/connectedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/environment/disconnected").annotate({
        title: "Thread/environment/disconnectedNotificationMethod",
      }),
      params: ServerNotification__EnvironmentConnectionNotification,
    }).annotate({ title: "Thread/environment/disconnectedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/settings/updated").annotate({
        title: "Thread/settings/updatedNotificationMethod",
      }),
      params: ServerNotification__ThreadSettingsUpdatedNotification,
    }).annotate({ title: "Thread/settings/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/tokenUsage/updated").annotate({
        title: "Thread/tokenUsage/updatedNotificationMethod",
      }),
      params: ServerNotification__ThreadTokenUsageUpdatedNotification,
    }).annotate({ title: "Thread/tokenUsage/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("turn/started").annotate({ title: "Turn/startedNotificationMethod" }),
      params: ServerNotification__TurnStartedNotification,
    }).annotate({ title: "Turn/startedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("hook/started").annotate({ title: "Hook/startedNotificationMethod" }),
      params: ServerNotification__HookStartedNotification,
    }).annotate({ title: "Hook/startedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("turn/completed").annotate({
        title: "Turn/completedNotificationMethod",
      }),
      params: ServerNotification__TurnCompletedNotification,
    }).annotate({ title: "Turn/completedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("hook/completed").annotate({
        title: "Hook/completedNotificationMethod",
      }),
      params: ServerNotification__HookCompletedNotification,
    }).annotate({ title: "Hook/completedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("turn/diff/updated").annotate({
        title: "Turn/diff/updatedNotificationMethod",
      }),
      params: ServerNotification__TurnDiffUpdatedNotification,
    }).annotate({ title: "Turn/diff/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("turn/plan/updated").annotate({
        title: "Turn/plan/updatedNotificationMethod",
      }),
      params: ServerNotification__TurnPlanUpdatedNotification,
    }).annotate({ title: "Turn/plan/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/started").annotate({ title: "Item/startedNotificationMethod" }),
      params: ServerNotification__ItemStartedNotification,
    }).annotate({ title: "Item/startedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/autoApprovalReview/started").annotate({
        title: "Item/autoApprovalReview/startedNotificationMethod",
      }),
      params: ServerNotification__ItemGuardianApprovalReviewStartedNotification,
    }).annotate({ title: "Item/autoApprovalReview/startedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/autoApprovalReview/completed").annotate({
        title: "Item/autoApprovalReview/completedNotificationMethod",
      }),
      params: ServerNotification__ItemGuardianApprovalReviewCompletedNotification,
    }).annotate({ title: "Item/autoApprovalReview/completedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("autoApprovalReview/strictReviewRequired").annotate({
        title: "AutoApprovalReview/strictReviewRequiredNotificationMethod",
      }),
      params: ServerNotification__StrictReviewRequiredNotification,
    }).annotate({ title: "AutoApprovalReview/strictReviewRequiredNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/completed").annotate({
        title: "Item/completedNotificationMethod",
      }),
      params: ServerNotification__ItemCompletedNotification,
    }).annotate({ title: "Item/completedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/agentMessage/delta").annotate({
        title: "Item/agentMessage/deltaNotificationMethod",
      }),
      params: ServerNotification__AgentMessageDeltaNotification,
    }).annotate({ title: "Item/agentMessage/deltaNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/plan/delta").annotate({
        title: "Item/plan/deltaNotificationMethod",
      }),
      params: ServerNotification__PlanDeltaNotification,
    }).annotate({
      title: "Item/plan/deltaNotification",
      description: "EXPERIMENTAL - proposed plan streaming deltas for plan items.",
    }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("command/exec/outputDelta").annotate({
        title: "Command/exec/outputDeltaNotificationMethod",
      }),
      params: ServerNotification__CommandExecOutputDeltaNotification,
    }).annotate({
      title: "Command/exec/outputDeltaNotification",
      description:
        "Stream base64-encoded stdout/stderr chunks for a running `command/exec` session.",
    }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("process/outputDelta").annotate({
        title: "Process/outputDeltaNotificationMethod",
      }),
      params: ServerNotification__ProcessOutputDeltaNotification,
    }).annotate({
      title: "Process/outputDeltaNotification",
      description:
        "Stream base64-encoded stdout/stderr chunks for a running `process/spawn` session.",
    }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("process/exited").annotate({
        title: "Process/exitedNotificationMethod",
      }),
      params: ServerNotification__ProcessExitedNotification,
    }).annotate({
      title: "Process/exitedNotification",
      description: "Final exit notification for a `process/spawn` session.",
    }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/commandExecution/outputDelta").annotate({
        title: "Item/commandExecution/outputDeltaNotificationMethod",
      }),
      params: ServerNotification__CommandExecutionOutputDeltaNotification,
    }).annotate({ title: "Item/commandExecution/outputDeltaNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/commandExecution/terminalInteraction").annotate({
        title: "Item/commandExecution/terminalInteractionNotificationMethod",
      }),
      params: ServerNotification__TerminalInteractionNotification,
    }).annotate({ title: "Item/commandExecution/terminalInteractionNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/fileChange/outputDelta").annotate({
        title: "Item/fileChange/outputDeltaNotificationMethod",
      }),
      params: ServerNotification__FileChangeOutputDeltaNotification,
    }).annotate({
      title: "Item/fileChange/outputDeltaNotification",
      description: "Deprecated legacy apply_patch output stream notification.",
    }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/fileChange/patchUpdated").annotate({
        title: "Item/fileChange/patchUpdatedNotificationMethod",
      }),
      params: ServerNotification__FileChangePatchUpdatedNotification,
    }).annotate({ title: "Item/fileChange/patchUpdatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("serverRequest/resolved").annotate({
        title: "ServerRequest/resolvedNotificationMethod",
      }),
      params: ServerNotification__ServerRequestResolvedNotification,
    }).annotate({ title: "ServerRequest/resolvedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/mcpToolCall/progress").annotate({
        title: "Item/mcpToolCall/progressNotificationMethod",
      }),
      params: ServerNotification__McpToolCallProgressNotification,
    }).annotate({ title: "Item/mcpToolCall/progressNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("mcpServer/oauthLogin/completed").annotate({
        title: "McpServer/oauthLogin/completedNotificationMethod",
      }),
      params: ServerNotification__McpServerOauthLoginCompletedNotification,
    }).annotate({ title: "McpServer/oauthLogin/completedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("mcpServer/startupStatus/updated").annotate({
        title: "McpServer/startupStatus/updatedNotificationMethod",
      }),
      params: ServerNotification__McpServerStatusUpdatedNotification,
    }).annotate({ title: "McpServer/startupStatus/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("mcpServer/event/stream/notification").annotate({
        title: "McpServer/event/stream/notificationNotificationMethod",
      }),
      params: ServerNotification__McpServerEventStreamNotification,
    }).annotate({ title: "McpServer/event/stream/notificationNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("account/updated").annotate({
        title: "Account/updatedNotificationMethod",
      }),
      params: ServerNotification__AccountUpdatedNotification,
    }).annotate({ title: "Account/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("account/gatewayOAuth/changed").annotate({
        title: "Account/gatewayOAuth/changedNotificationMethod",
      }),
      params: ServerNotification__GatewayOAuthChangedNotification,
    }).annotate({ title: "Account/gatewayOAuth/changedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("account/rateLimits/updated").annotate({
        title: "Account/rateLimits/updatedNotificationMethod",
      }),
      params: ServerNotification__AccountRateLimitsUpdatedNotification,
    }).annotate({ title: "Account/rateLimits/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("app/list/updated").annotate({
        title: "App/list/updatedNotificationMethod",
      }),
      params: ServerNotification__AppListUpdatedNotification,
    }).annotate({ title: "App/list/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("remoteControl/status/changed").annotate({
        title: "RemoteControl/status/changedNotificationMethod",
      }),
      params: ServerNotification__RemoteControlStatusChangedNotification,
    }).annotate({ title: "RemoteControl/status/changedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("externalAgentConfig/import/progress").annotate({
        title: "ExternalAgentConfig/import/progressNotificationMethod",
      }),
      params: ServerNotification__ExternalAgentConfigImportProgressNotification,
    }).annotate({ title: "ExternalAgentConfig/import/progressNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("externalAgentConfig/import/completed").annotate({
        title: "ExternalAgentConfig/import/completedNotificationMethod",
      }),
      params: ServerNotification__ExternalAgentConfigImportCompletedNotification,
    }).annotate({ title: "ExternalAgentConfig/import/completedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("fs/changed").annotate({ title: "Fs/changedNotificationMethod" }),
      params: ServerNotification__FsChangedNotification,
    }).annotate({ title: "Fs/changedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/reasoning/summaryTextDelta").annotate({
        title: "Item/reasoning/summaryTextDeltaNotificationMethod",
      }),
      params: ServerNotification__ReasoningSummaryTextDeltaNotification,
    }).annotate({ title: "Item/reasoning/summaryTextDeltaNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/reasoning/summaryPartAdded").annotate({
        title: "Item/reasoning/summaryPartAddedNotificationMethod",
      }),
      params: ServerNotification__ReasoningSummaryPartAddedNotification,
    }).annotate({ title: "Item/reasoning/summaryPartAddedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("item/reasoning/textDelta").annotate({
        title: "Item/reasoning/textDeltaNotificationMethod",
      }),
      params: ServerNotification__ReasoningTextDeltaNotification,
    }).annotate({ title: "Item/reasoning/textDeltaNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/compacted").annotate({
        title: "Thread/compactedNotificationMethod",
      }),
      params: ServerNotification__ContextCompactedNotification,
    }).annotate({
      title: "Thread/compactedNotification",
      description: "Deprecated: Use `ContextCompaction` item type instead.",
    }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("model/rerouted").annotate({
        title: "Model/reroutedNotificationMethod",
      }),
      params: ServerNotification__ModelReroutedNotification,
    }).annotate({ title: "Model/reroutedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("model/verification").annotate({
        title: "Model/verificationNotificationMethod",
      }),
      params: ServerNotification__ModelVerificationNotification,
    }).annotate({ title: "Model/verificationNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("modelProvider/authRecoveryStarted").annotate({
        title: "ModelProvider/authRecoveryStartedNotificationMethod",
      }),
      params: ServerNotification__AuthRecoveryNotification,
    }).annotate({ title: "ModelProvider/authRecoveryStartedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("modelProvider/authRecoveryCompleted").annotate({
        title: "ModelProvider/authRecoveryCompletedNotificationMethod",
      }),
      params: ServerNotification__AuthRecoveryNotification,
    }).annotate({ title: "ModelProvider/authRecoveryCompletedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("turn/moderationMetadata").annotate({
        title: "Turn/moderationMetadataNotificationMethod",
      }),
      params: ServerNotification__TurnModerationMetadataNotification,
    }).annotate({ title: "Turn/moderationMetadataNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("model/safetyBuffering/updated").annotate({
        title: "Model/safetyBuffering/updatedNotificationMethod",
      }),
      params: ServerNotification__ModelSafetyBufferingUpdatedNotification,
    }).annotate({ title: "Model/safetyBuffering/updatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("warning").annotate({ title: "WarningNotificationMethod" }),
      params: ServerNotification__WarningNotification,
    }).annotate({ title: "WarningNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("guardianWarning").annotate({
        title: "GuardianWarningNotificationMethod",
      }),
      params: ServerNotification__GuardianWarningNotification,
    }).annotate({ title: "GuardianWarningNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("deprecationNotice").annotate({
        title: "DeprecationNoticeNotificationMethod",
      }),
      params: ServerNotification__DeprecationNoticeNotification,
    }).annotate({ title: "DeprecationNoticeNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("configWarning").annotate({
        title: "ConfigWarningNotificationMethod",
      }),
      params: ServerNotification__ConfigWarningNotification,
    }).annotate({ title: "ConfigWarningNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("fuzzyFileSearch/sessionUpdated").annotate({
        title: "FuzzyFileSearch/sessionUpdatedNotificationMethod",
      }),
      params: ServerNotification__FuzzyFileSearchSessionUpdatedNotification,
    }).annotate({ title: "FuzzyFileSearch/sessionUpdatedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("fuzzyFileSearch/sessionCompleted").annotate({
        title: "FuzzyFileSearch/sessionCompletedNotificationMethod",
      }),
      params: ServerNotification__FuzzyFileSearchSessionCompletedNotification,
    }).annotate({ title: "FuzzyFileSearch/sessionCompletedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/started").annotate({
        title: "Thread/realtime/startedNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeStartedNotification,
    }).annotate({ title: "Thread/realtime/startedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/itemAdded").annotate({
        title: "Thread/realtime/itemAddedNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeItemAddedNotification,
    }).annotate({ title: "Thread/realtime/itemAddedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/item/started").annotate({
        title: "Thread/realtime/item/startedNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeItemStartedNotification,
    }).annotate({ title: "Thread/realtime/item/startedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/item/transcript/delta").annotate({
        title: "Thread/realtime/item/transcript/deltaNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeItemTranscriptDeltaNotification,
    }).annotate({ title: "Thread/realtime/item/transcript/deltaNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/item/completed").annotate({
        title: "Thread/realtime/item/completedNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeItemCompletedNotification,
    }).annotate({ title: "Thread/realtime/item/completedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/transcript/delta").annotate({
        title: "Thread/realtime/transcript/deltaNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeTranscriptDeltaNotification,
    }).annotate({ title: "Thread/realtime/transcript/deltaNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/transcript/done").annotate({
        title: "Thread/realtime/transcript/doneNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeTranscriptDoneNotification,
    }).annotate({ title: "Thread/realtime/transcript/doneNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/outputAudio/delta").annotate({
        title: "Thread/realtime/outputAudio/deltaNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeOutputAudioDeltaNotification,
    }).annotate({ title: "Thread/realtime/outputAudio/deltaNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/sdp").annotate({
        title: "Thread/realtime/sdpNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeSdpNotification,
    }).annotate({ title: "Thread/realtime/sdpNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/error").annotate({
        title: "Thread/realtime/errorNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeErrorNotification,
    }).annotate({ title: "Thread/realtime/errorNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("thread/realtime/closed").annotate({
        title: "Thread/realtime/closedNotificationMethod",
      }),
      params: ServerNotification__ThreadRealtimeClosedNotification,
    }).annotate({ title: "Thread/realtime/closedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("windows/worldWritableWarning").annotate({
        title: "Windows/worldWritableWarningNotificationMethod",
      }),
      params: ServerNotification__WindowsWorldWritableWarningNotification,
    }).annotate({
      title: "Windows/worldWritableWarningNotification",
      description:
        "Notifies the user of world-writable directories on Windows, which cannot be protected by the sandbox.",
    }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("windowsSandbox/setupCompleted").annotate({
        title: "WindowsSandbox/setupCompletedNotificationMethod",
      }),
      params: ServerNotification__WindowsSandboxSetupCompletedNotification,
    }).annotate({ title: "WindowsSandbox/setupCompletedNotification" }),
    Schema.Struct({
      emittedAtMs: Schema.optionalKey(
        Schema.Number.annotate({
          description:
            "Unix timestamp (in milliseconds) when app-server emitted this notification.",
          format: "int64",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      ),
      method: Schema.Literal("account/login/completed").annotate({
        title: "Account/login/completedNotificationMethod",
      }),
      params: ServerNotification__AccountLoginCompletedNotification,
    }).annotate({ title: "Account/login/completedNotification" }),
  ],
  { mode: "oneOf" },
).annotate({
  title: "ServerNotification",
  description: "Notification sent from the server to the client.",
});

export type ServerNotification__MultiAgentMode =
  | "explicitRequestOnly"
  | "proactive"
  | { readonly custom: string };
export const ServerNotification__MultiAgentMode = Schema.Union(
  [
    Schema.Literals(["explicitRequestOnly", "proactive"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomMultiAgentMode" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Controls the effective multi-agent delegation instructions for a turn. `custom` means the configured mode hint defines the policy instead of a built-in policy.",
});

export type ServerNotification__ThreadEnvironment = {
  readonly cwd: ServerNotification__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots: ReadonlyArray<ServerNotification__LegacyAppPathString>;
};
export const ServerNotification__ThreadEnvironment = Schema.Struct({
  cwd: ServerNotification__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.Array(ServerNotification__LegacyAppPathString),
}).annotate({
  description: "An environment selected by a loaded thread, independent of connection status.",
});

export type ServerNotification__ThreadExtra = { readonly [x: string]: Schema.Json };
export const ServerNotification__ThreadExtra = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ description: "Extra app-server data for a thread." });

export type ServerRequest =
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "item/commandExecution/requestApproval";
      readonly params: ServerRequest__CommandExecutionRequestApprovalParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "item/fileChange/requestApproval";
      readonly params: ServerRequest__FileChangeRequestApprovalParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "item/tool/requestUserInput";
      readonly params: ServerRequest__ToolRequestUserInputParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "mcpServer/elicitation/request";
      readonly params: ServerRequest__McpServerElicitationRequestParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "item/permissions/requestApproval";
      readonly params: ServerRequest__PermissionsRequestApprovalParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "item/tool/call";
      readonly params: ServerRequest__DynamicToolCallParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "account/chatgptAuthTokens/refresh";
      readonly params: ServerRequest__ChatgptAuthTokensRefreshParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "attestation/generate";
      readonly params: ServerRequest__AttestationGenerateParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "applyPatchApproval";
      readonly params: ServerRequest__ApplyPatchApprovalParams;
    }
  | {
      readonly id: ServerRequest__RequestId;
      readonly method: "execCommandApproval";
      readonly params: ServerRequest__ExecCommandApprovalParams;
    };
export const ServerRequest = Schema.Union(
  [
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("item/commandExecution/requestApproval").annotate({
        title: "Item/commandExecution/requestApprovalRequestMethod",
      }),
      params: ServerRequest__CommandExecutionRequestApprovalParams,
    }).annotate({
      title: "Item/commandExecution/requestApprovalRequest",
      description:
        "NEW APIs Sent when approval is requested for a specific command execution. This request is used for Turns started via turn/start.",
    }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("item/fileChange/requestApproval").annotate({
        title: "Item/fileChange/requestApprovalRequestMethod",
      }),
      params: ServerRequest__FileChangeRequestApprovalParams,
    }).annotate({
      title: "Item/fileChange/requestApprovalRequest",
      description:
        "Sent when approval is requested for a specific file change. This request is used for Turns started via turn/start.",
    }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("item/tool/requestUserInput").annotate({
        title: "Item/tool/requestUserInputRequestMethod",
      }),
      params: ServerRequest__ToolRequestUserInputParams,
    }).annotate({
      title: "Item/tool/requestUserInputRequest",
      description: "EXPERIMENTAL - Request input from the user for a tool call.",
    }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("mcpServer/elicitation/request").annotate({
        title: "McpServer/elicitation/requestRequestMethod",
      }),
      params: ServerRequest__McpServerElicitationRequestParams,
    }).annotate({
      title: "McpServer/elicitation/requestRequest",
      description: "Request input for an MCP server elicitation.",
    }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("item/permissions/requestApproval").annotate({
        title: "Item/permissions/requestApprovalRequestMethod",
      }),
      params: ServerRequest__PermissionsRequestApprovalParams,
    }).annotate({
      title: "Item/permissions/requestApprovalRequest",
      description: "Request approval for additional permissions from the user.",
    }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("item/tool/call").annotate({ title: "Item/tool/callRequestMethod" }),
      params: ServerRequest__DynamicToolCallParams,
    }).annotate({
      title: "Item/tool/callRequest",
      description: "Execute a dynamic tool call on the client.",
    }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("account/chatgptAuthTokens/refresh").annotate({
        title: "Account/chatgptAuthTokens/refreshRequestMethod",
      }),
      params: ServerRequest__ChatgptAuthTokensRefreshParams,
    }).annotate({ title: "Account/chatgptAuthTokens/refreshRequest" }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("attestation/generate").annotate({
        title: "Attestation/generateRequestMethod",
      }),
      params: ServerRequest__AttestationGenerateParams,
    }).annotate({
      title: "Attestation/generateRequest",
      description: "Generate a fresh upstream attestation result on demand.",
    }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("applyPatchApproval").annotate({
        title: "ApplyPatchApprovalRequestMethod",
      }),
      params: ServerRequest__ApplyPatchApprovalParams,
    }).annotate({
      title: "ApplyPatchApprovalRequest",
      description:
        "DEPRECATED APIs below Request to approve a patch. This request is used for Turns started via the legacy APIs (i.e. SendUserTurn, SendUserMessage).",
    }),
    Schema.Struct({
      id: ServerRequest__RequestId,
      method: Schema.Literal("execCommandApproval").annotate({
        title: "ExecCommandApprovalRequestMethod",
      }),
      params: ServerRequest__ExecCommandApprovalParams,
    }).annotate({
      title: "ExecCommandApprovalRequest",
      description:
        "Request to exec a command. This request is used for Turns started via the legacy APIs (i.e. SendUserTurn, SendUserMessage).",
    }),
  ],
  { mode: "oneOf" },
).annotate({
  title: "ServerRequest",
  description: "Request initiated from the server and sent to the client.",
});

export type ServerRequest__AdditionalPermissionProfile = {
  readonly fileSystem?: ServerRequest__AdditionalFileSystemPermissions | null;
  readonly network?: ServerRequest__AdditionalNetworkPermissions | null;
};
export const ServerRequest__AdditionalPermissionProfile = Schema.Struct({
  fileSystem: Schema.optionalKey(
    Schema.Union([ServerRequest__AdditionalFileSystemPermissions, Schema.Null]),
  ),
  network: Schema.optionalKey(
    Schema.Union([ServerRequest__AdditionalNetworkPermissions, Schema.Null]).annotate({
      description: "Partial overlay used for per-command permission requests.",
    }),
  ),
});

export type ServerRequest__CommandExecutionApprovalDecision =
  | "accept"
  | "acceptForSession"
  | {
      readonly acceptWithExecpolicyAmendment: {
        readonly execpolicy_amendment: ReadonlyArray<string>;
      };
    }
  | {
      readonly applyNetworkPolicyAmendment: {
        readonly network_policy_amendment: ServerRequest__NetworkPolicyAmendment;
      };
    }
  | "decline"
  | "cancel";
export const ServerRequest__CommandExecutionApprovalDecision = Schema.Union(
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
        network_policy_amendment: ServerRequest__NetworkPolicyAmendment,
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
);

export type ThreadSettingsUpdateParams = {
  readonly threadId: string;
  readonly serviceTier?: string | null;
};
export const ThreadSettingsUpdateParams = Schema.Struct({
  threadId: Schema.String,
  serviceTier: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "ThreadSettingsUpdateParams" });

export type ThreadSettingsUpdateResponse = { readonly [x: string]: Schema.Json };
export const ThreadSettingsUpdateResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({ title: "ThreadSettingsUpdateResponse" });

export type ToolRequestUserInputParams = {
  readonly autoResolutionMs?: number | null;
  readonly isBlocking: boolean;
  readonly itemId: string;
  readonly questions: ReadonlyArray<ToolRequestUserInputParams__ToolRequestUserInputQuestion>;
  readonly threadId: string;
  readonly turnId: string;
};
export const ToolRequestUserInputParams = Schema.Struct({
  autoResolutionMs: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "@deprecated Use `isBlocking` to decide whether the request should block.",
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
  isBlocking: Schema.Boolean,
  itemId: Schema.String,
  questions: Schema.Array(ToolRequestUserInputParams__ToolRequestUserInputQuestion),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({
  title: "ToolRequestUserInputParams",
  description: "EXPERIMENTAL. Params sent with a request_user_input event.",
});

export type ToolRequestUserInputResponse = {
  readonly answers: {
    readonly [x: string]: ToolRequestUserInputResponse__ToolRequestUserInputAnswer;
  };
};
export const ToolRequestUserInputResponse = Schema.Struct({
  answers: Schema.Record(Schema.String, ToolRequestUserInputResponse__ToolRequestUserInputAnswer),
}).annotate({
  title: "ToolRequestUserInputResponse",
  description: "EXPERIMENTAL. Response payload mapping question ids to answers.",
});

export type V1InitializeParams = {
  readonly capabilities?: V1InitializeParams__InitializeCapabilities | null;
  readonly clientInfo: V1InitializeParams__ClientInfo;
};
export const V1InitializeParams = Schema.Struct({
  capabilities: Schema.optionalKey(
    Schema.Union([V1InitializeParams__InitializeCapabilities, Schema.Null]),
  ),
  clientInfo: V1InitializeParams__ClientInfo,
}).annotate({ title: "InitializeParams" });

export type V1InitializeResponse = {
  readonly codexHome: V1InitializeResponse__AbsolutePathBuf;
  readonly platformFamily: string;
  readonly platformOs: string;
  readonly userAgent: string;
};
export const V1InitializeResponse = Schema.Struct({
  codexHome: Schema.suspend(
    (): Schema.Codec<V1InitializeResponse__AbsolutePathBuf> =>
      V1InitializeResponse__AbsolutePathBuf,
  ).annotate({ description: "Absolute path to the server's $CODEX_HOME directory." }),
  platformFamily: Schema.String.annotate({
    description:
      'Platform family for the running app-server target, for example `"unix"` or `"windows"`.',
  }),
  platformOs: Schema.String.annotate({
    description:
      'Operating system for the running app-server target, for example `"macos"`, `"linux"`, or `"windows"`.',
  }),
  userAgent: Schema.String,
}).annotate({ title: "InitializeResponse" });

export type V2AccountLoginCompletedNotification = {
  readonly error?: string | null;
  readonly loginId?: string | null;
  readonly onboardingEntrypoint?: V2AccountLoginCompletedNotification__DesktopOnboardingEntrypoint | null;
  readonly success: boolean;
};
export const V2AccountLoginCompletedNotification = Schema.Struct({
  error: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  loginId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  onboardingEntrypoint: Schema.optionalKey(
    Schema.Union([V2AccountLoginCompletedNotification__DesktopOnboardingEntrypoint, Schema.Null]),
  ),
  success: Schema.Boolean,
}).annotate({ title: "AccountLoginCompletedNotification" });

export type V2AccountRateLimitsUpdatedNotification = {
  readonly rateLimits: V2AccountRateLimitsUpdatedNotification__RateLimitSnapshot;
};
export const V2AccountRateLimitsUpdatedNotification = Schema.Struct({
  rateLimits: V2AccountRateLimitsUpdatedNotification__RateLimitSnapshot,
}).annotate({
  title: "AccountRateLimitsUpdatedNotification",
  description:
    "Sparse rolling rate-limit update.\n\nClients should merge available values into the most recent `account/rateLimits/read` response or refetch that snapshot. Nullable account metadata may be unavailable in a rolling update and does not clear a previously observed value.",
});

export type V2AccountUpdatedNotification = {
  readonly authMode?: V2AccountUpdatedNotification__AuthMode | null;
  readonly planType?: V2AccountUpdatedNotification__PlanType | null;
};
export const V2AccountUpdatedNotification = Schema.Struct({
  authMode: Schema.optionalKey(Schema.Union([V2AccountUpdatedNotification__AuthMode, Schema.Null])),
  planType: Schema.optionalKey(Schema.Union([V2AccountUpdatedNotification__PlanType, Schema.Null])),
}).annotate({ title: "AccountUpdatedNotification" });

export type V2AgentMessageDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2AgentMessageDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "AgentMessageDeltaNotification" });

export type V2AppListUpdatedNotification = {
  readonly data: ReadonlyArray<V2AppListUpdatedNotification__AppInfo>;
};
export const V2AppListUpdatedNotification = Schema.Struct({
  data: Schema.Array(V2AppListUpdatedNotification__AppInfo),
}).annotate({
  title: "AppListUpdatedNotification",
  description: "EXPERIMENTAL - notification emitted when the app list changes.",
});

export type V2AppsInstalledParams = {
  readonly forceRefresh?: boolean;
  readonly threadId?: string | null;
};
export const V2AppsInstalledParams = Schema.Struct({
  forceRefresh: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true and Apps are permitted, refresh and publish the hosted connector runtime tool snapshot first.",
    }),
  ),
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional loaded thread id used to evaluate effective app configuration.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  title: "AppsInstalledParams",
  description: "Read the committed installed connector runtime snapshot.",
});

export type V2AppsInstalledResponse = {
  readonly apps: ReadonlyArray<V2AppsInstalledResponse__InstalledApp>;
};
export const V2AppsInstalledResponse = Schema.Struct({
  apps: Schema.Array(V2AppsInstalledResponse__InstalledApp),
}).annotate({
  title: "AppsInstalledResponse",
  description: "The installed connectors in one committed runtime snapshot.",
});

export type V2AppsListParams = {
  readonly cursor?: string | null;
  readonly forceRefetch?: boolean;
  readonly limit?: number | null;
  readonly threadId?: string | null;
};
export const V2AppsListParams = Schema.Struct({
  cursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Opaque pagination cursor returned by a previous call.",
      }),
      Schema.Null,
    ]),
  ),
  forceRefetch: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "When true, bypass app caches and fetch the latest data from sources.",
    }),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({
        description: "Optional page size; defaults to a reasonable server-side value.",
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
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional thread id used to evaluate app feature gating from that thread's config.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  title: "AppsListParams",
  description: "EXPERIMENTAL - list available apps/connectors.",
});

export type V2AppsListResponse = {
  readonly data: ReadonlyArray<V2AppsListResponse__AppInfo>;
  readonly nextCursor?: string | null;
};
export const V2AppsListResponse = Schema.Struct({
  data: Schema.Array(V2AppsListResponse__AppInfo),
  nextCursor: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Opaque cursor to pass to the next call to continue after the last item. If None, there are no more items to return.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "AppsListResponse", description: "EXPERIMENTAL - app list response." });

export type V2AppsReadParams = {
  readonly appIds: ReadonlyArray<string>;
  readonly includeTools?: boolean;
  readonly threadId?: string | null;
};
export const V2AppsReadParams = Schema.Struct({
  appIds: Schema.Array(Schema.String).annotate({
    description:
      "App ids to read. The server accepts at most 100 ids and deduplicates repeated ids while preserving their first-request order.",
  }),
  includeTools: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "When true, include display-only public tool summaries in the returned metadata.",
    }),
  ),
  threadId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional loaded thread id used to evaluate effective app configuration.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({
  title: "AppsReadParams",
  description: "EXPERIMENTAL - read metadata for specific apps/connectors.",
});

export type V2AppsReadResponse = {
  readonly apps: ReadonlyArray<V2AppsReadResponse__ConnectorMetadata>;
  readonly missingAppIds: ReadonlyArray<string>;
};
export const V2AppsReadResponse = Schema.Struct({
  apps: Schema.Array(V2AppsReadResponse__ConnectorMetadata),
  missingAppIds: Schema.Array(Schema.String),
}).annotate({ title: "AppsReadResponse", description: "EXPERIMENTAL - app/read response." });

export type V2AuthRecoveryNotification = {
  readonly message: string;
  readonly provider: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2AuthRecoveryNotification = Schema.Struct({
  message: Schema.String,
  provider: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "AuthRecoveryNotification" });

export type V2CancelLoginAccountParams = { readonly loginId: string };
export const V2CancelLoginAccountParams = Schema.Struct({ loginId: Schema.String }).annotate({
  title: "CancelLoginAccountParams",
});

export type V2CancelLoginAccountResponse = {
  readonly status: V2CancelLoginAccountResponse__CancelLoginAccountStatus;
};
export const V2CancelLoginAccountResponse = Schema.Struct({
  status: V2CancelLoginAccountResponse__CancelLoginAccountStatus,
}).annotate({ title: "CancelLoginAccountResponse" });

export type V2CommandExecOutputDeltaNotification = {
  readonly capReached: boolean;
  readonly deltaBase64: string;
  readonly processId: string;
  readonly stream: V2CommandExecOutputDeltaNotification__CommandExecOutputStream;
};
export const V2CommandExecOutputDeltaNotification = Schema.Struct({
  capReached: Schema.Boolean.annotate({
    description:
      "`true` on the final streamed chunk for a stream when `outputBytesCap` truncated later output on that stream.",
  }),
  deltaBase64: Schema.String.annotate({ description: "Base64-encoded output bytes." }),
  processId: Schema.String.annotate({
    description:
      "Client-supplied, connection-scoped `processId` from the original `command/exec` request.",
  }),
  stream: Schema.suspend(
    (): Schema.Codec<V2CommandExecOutputDeltaNotification__CommandExecOutputStream> =>
      V2CommandExecOutputDeltaNotification__CommandExecOutputStream,
  ).annotate({ description: "Output stream for this chunk." }),
}).annotate({
  title: "CommandExecOutputDeltaNotification",
  description:
    "Base64-encoded output chunk emitted for a streaming `command/exec` request.\n\nThese notifications are connection-scoped. If the originating connection closes, the server terminates the process.",
});

export type V2CommandExecParams = {
  readonly command: ReadonlyArray<string>;
  readonly cwd?: string | null;
  readonly disableOutputCap?: boolean;
  readonly disableTimeout?: boolean;
  readonly env?: { readonly [x: string]: string | null } | null;
  readonly outputBytesCap?: number | null;
  readonly processId?: string | null;
  readonly sandboxPolicy?: V2CommandExecParams__SandboxPolicy | null;
  readonly size?: V2CommandExecParams__CommandExecTerminalSize | null;
  readonly streamStdin?: boolean;
  readonly streamStdoutStderr?: boolean;
  readonly timeoutMs?: number | null;
  readonly tty?: boolean;
};
export const V2CommandExecParams = Schema.Struct({
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
    Schema.Union([V2CommandExecParams__SandboxPolicy, Schema.Null]).annotate({
      description:
        "Optional sandbox policy for this command.\n\nUses the same shape as thread/turn execution sandbox configuration and defaults to the user's configured policy when omitted. Cannot be combined with `permissionProfile`.",
    }),
  ),
  size: Schema.optionalKey(
    Schema.Union([V2CommandExecParams__CommandExecTerminalSize, Schema.Null]).annotate({
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
  title: "CommandExecParams",
  description:
    "Run a standalone command (argv vector) in the server sandbox without creating a thread or turn.\n\nThe final `command/exec` response is deferred until the process exits and is sent only after all `command/exec/outputDelta` notifications for that connection have been emitted.",
});

export type V2CommandExecResizeParams = {
  readonly processId: string;
  readonly size: V2CommandExecResizeParams__CommandExecTerminalSize;
};
export const V2CommandExecResizeParams = Schema.Struct({
  processId: Schema.String.annotate({
    description:
      "Client-supplied, connection-scoped `processId` from the original `command/exec` request.",
  }),
  size: Schema.suspend(
    (): Schema.Codec<V2CommandExecResizeParams__CommandExecTerminalSize> =>
      V2CommandExecResizeParams__CommandExecTerminalSize,
  ).annotate({ description: "New PTY size in character cells." }),
}).annotate({
  title: "CommandExecResizeParams",
  description: "Resize a running PTY-backed `command/exec` session.",
});

export type V2CommandExecResizeResponse = { readonly [x: string]: Schema.Json };
export const V2CommandExecResizeResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "CommandExecResizeResponse",
  description: "Empty success response for `command/exec/resize`.",
});

export type V2CommandExecResponse = {
  readonly exitCode: number;
  readonly stderr: string;
  readonly stdout: string;
};
export const V2CommandExecResponse = Schema.Struct({
  exitCode: Schema.Number.annotate({ description: "Process exit code.", format: "int32" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  stderr: Schema.String.annotate({
    description:
      "Buffered stderr capture.\n\nEmpty when stderr was streamed via `command/exec/outputDelta`.",
  }),
  stdout: Schema.String.annotate({
    description:
      "Buffered stdout capture.\n\nEmpty when stdout was streamed via `command/exec/outputDelta`.",
  }),
}).annotate({
  title: "CommandExecResponse",
  description: "Final buffered result for `command/exec`.",
});

export type V2CommandExecTerminateParams = { readonly processId: string };
export const V2CommandExecTerminateParams = Schema.Struct({
  processId: Schema.String.annotate({
    description:
      "Client-supplied, connection-scoped `processId` from the original `command/exec` request.",
  }),
}).annotate({
  title: "CommandExecTerminateParams",
  description: "Terminate a running `command/exec` session.",
});

export type V2CommandExecTerminateResponse = { readonly [x: string]: Schema.Json };
export const V2CommandExecTerminateResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "CommandExecTerminateResponse",
  description: "Empty success response for `command/exec/terminate`.",
});

export type V2CommandExecutionOutputDeltaNotification = {
  readonly delta: string;
  readonly itemId: string;
  readonly threadId: string;
  readonly turnId: string;
};
export const V2CommandExecutionOutputDeltaNotification = Schema.Struct({
  delta: Schema.String,
  itemId: Schema.String,
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "CommandExecutionOutputDeltaNotification" });

export type V2CommandExecWriteParams = {
  readonly closeStdin?: boolean;
  readonly deltaBase64?: string | null;
  readonly processId: string;
};
export const V2CommandExecWriteParams = Schema.Struct({
  closeStdin: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Close stdin after writing `deltaBase64`, if present.",
    }),
  ),
  deltaBase64: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Optional base64-encoded stdin bytes to write." }),
      Schema.Null,
    ]),
  ),
  processId: Schema.String.annotate({
    description:
      "Client-supplied, connection-scoped `processId` from the original `command/exec` request.",
  }),
}).annotate({
  title: "CommandExecWriteParams",
  description: "Write stdin bytes to a running `command/exec` session, close stdin, or both.",
});

export type V2CommandExecWriteResponse = { readonly [x: string]: Schema.Json };
export const V2CommandExecWriteResponse = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).annotate({
  title: "CommandExecWriteResponse",
  description: "Empty success response for `command/exec/write`.",
});

export type V2ConfigBatchWriteParams = {
  readonly edits: ReadonlyArray<V2ConfigBatchWriteParams__ConfigEdit>;
  readonly expectedVersion?: string | null;
  readonly filePath?: string | null;
  readonly reloadUserConfig?: boolean;
};
export const V2ConfigBatchWriteParams = Schema.Struct({
  edits: Schema.Array(V2ConfigBatchWriteParams__ConfigEdit),
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
}).annotate({ title: "ConfigBatchWriteParams" });

export type V2ConfigReadParams = { readonly cwd?: string | null; readonly includeLayers?: boolean };
export const V2ConfigReadParams = Schema.Struct({
  cwd: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Optional working directory to resolve project config layers. If specified, return the effective config as seen from that directory (i.e., including any project layers between `cwd` and the project/repo root).",
      }),
      Schema.Null,
    ]),
  ),
  includeLayers: Schema.optionalKey(Schema.Boolean),
}).annotate({ title: "ConfigReadParams" });

export type V2ConfigReadResponse = {
  readonly config: V2ConfigReadResponse__Config;
  readonly layers?: ReadonlyArray<V2ConfigReadResponse__ConfigLayer> | null;
  readonly origins: { readonly [x: string]: V2ConfigReadResponse__ConfigLayerMetadata };
};
export const V2ConfigReadResponse = Schema.Struct({
  config: V2ConfigReadResponse__Config,
  layers: Schema.optionalKey(
    Schema.Union([Schema.Array(V2ConfigReadResponse__ConfigLayer), Schema.Null]),
  ),
  origins: Schema.Record(Schema.String, V2ConfigReadResponse__ConfigLayerMetadata),
}).annotate({ title: "ConfigReadResponse" });

export type V2ConfigReadResponse__AppConfig = {
  readonly approvals_reviewer?: V2ConfigReadResponse__ApprovalsReviewer | null;
  readonly default_tools_approval_mode?: V2ConfigReadResponse__AppToolApproval | null;
  readonly default_tools_enabled?: boolean | null;
  readonly destructive_enabled?: boolean | null;
  readonly enabled?: boolean;
  readonly links?: V2ConfigReadResponse__AppLinksConfig | null;
  readonly omit_tools_from?: ReadonlyArray<V2ConfigReadResponse__ToolExposureSurface> | null;
  readonly open_world_enabled?: boolean | null;
  readonly tools?: V2ConfigReadResponse__AppToolsConfig | null;
};
export const V2ConfigReadResponse__AppConfig = Schema.Struct({
  approvals_reviewer: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__ApprovalsReviewer, Schema.Null]),
  ),
  default_tools_approval_mode: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AppToolApproval, Schema.Null]),
  ),
  default_tools_enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  destructive_enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  enabled: Schema.optionalKey(Schema.Boolean.annotate({ default: true })),
  links: Schema.optionalKey(
    Schema.Union([V2ConfigReadResponse__AppLinksConfig, Schema.Null]).annotate({
      description: "Per-account approval settings keyed by link ID.",
    }),
  ),
  omit_tools_from: Schema.optionalKey(
    Schema.Union([
      Schema.Array(V2ConfigReadResponse__ToolExposureSurface).annotate({
        description: "Additional model-facing surfaces omitted for this connector's tools.",
      }),
      Schema.Null,
    ]),
  ),
  open_world_enabled: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  tools: Schema.optionalKey(Schema.Union([V2ConfigReadResponse__AppToolsConfig, Schema.Null])),
});
