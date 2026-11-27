/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */
import * as Schema from "effect/Schema";
import {
  ClientRequest__AbsolutePathBuf,
  ClientRequest__AdditionalContextKind,
  ClientRequest__AgentMessageInputContent,
  ClientRequest__AppsInstalledParams,
  ClientRequest__AppsListParams,
  ClientRequest__AppsReadParams,
  ClientRequest__CancelLoginAccountParams,
  ClientRequest__CapabilityRootLocation,
  ClientRequest__CommandExecTerminateParams,
  ClientRequest__CommandExecWriteParams,
  ClientRequest__ConfigReadParams,
  ClientRequest__ConsumeAccountRateLimitResetCreditParams,
  ClientRequest__ConversationTextRole,
  ClientRequest__DynamicToolNamespaceTool,
  ClientRequest__ExperimentalFeatureEnablementSetParams,
  ClientRequest__ExperimentalFeatureListParams,
  ClientRequest__ExternalAgentConfigDetectParams,
  ClientRequest__FeedbackUploadParams,
  ClientRequest__FsUnwatchParams,
  ClientRequest__FuzzyFileSearchParams,
  ClientRequest__GetAccountParams,
  ClientRequest__GetAccountRateLimitsParams,
  ClientRequest__GetAccountTokenUsageParams,
  ClientRequest__HooksListParams,
  ClientRequest__InternalChatMessageMetadataPassthrough,
  ClientRequest__LegacyAppPathString,
  ClientRequest__LocalShellAction,
  ClientRequest__LocalShellStatus,
  ClientRequest__MarketplaceAddParams,
  ClientRequest__MarketplaceRemoveParams,
  ClientRequest__MarketplaceUpgradeParams,
  ClientRequest__McpServerToolCallParams,
  ClientRequest__MessagePhase,
  ClientRequest__ModeKind,
  ClientRequest__ModelListParams,
  ClientRequest__ModelProviderCapabilitiesReadParams,
  ClientRequest__PermissionProfileListParams,
  ClientRequest__PluginReconcileParams,
  ClientRequest__PluginShareCheckoutParams,
  ClientRequest__PluginShareDeleteParams,
  ClientRequest__PluginShareListParams,
  ClientRequest__PluginSkillReadParams,
  ClientRequest__PluginUninstallParams,
  ClientRequest__ReasoningItemContent,
  ClientRequest__ReasoningItemReasoningSummary,
  ClientRequest__RequestId,
  ClientRequest__ResponsesApiWebSearchAction,
  ClientRequest__SkillsListParams,
  ClientRequest__SortDirection,
  ClientRequest__ThreadApproveGuardianDeniedActionParams,
  ClientRequest__ThreadArchiveParams,
  ClientRequest__ThreadAttachmentAddParams,
  ClientRequest__ThreadAttachmentListParams,
  ClientRequest__ThreadAttachmentRemoveParams,
  ClientRequest__ThreadCompactStartParams,
  ClientRequest__ThreadDeleteParams,
  ClientRequest__ThreadGoalClearParams,
  ClientRequest__ThreadGoalGetParams,
  ClientRequest__ThreadInjectItemsParams,
  ClientRequest__ThreadLoadedListParams,
  ClientRequest__ThreadReadParams,
  ClientRequest__ThreadRevertParams,
  ClientRequest__ThreadSectionDeleteParams,
  ClientRequest__ThreadSectionListParams,
  ClientRequest__ThreadSectionMoveParams,
  ClientRequest__ThreadSetNameParams,
  ClientRequest__ThreadShellCommandParams,
  ClientRequest__ThreadUnarchiveParams,
  ClientRequest__ThreadUnsubscribeParams,
  ClientRequest__TurnInterruptParams,
  ClientRequest__TurnItemsView,
  CommandExecutionRequestApprovalParams__AdditionalNetworkPermissions,
  CommandExecutionRequestApprovalParams__CommandExecutionApprovalKind,
  CommandExecutionRequestApprovalParams__LegacyAppPathString,
  DynamicToolCallResponse__DynamicToolCallOutputContentItem,
  ExecCommandApprovalParams__ParsedCommand,
  ExecCommandApprovalParams__ThreadId,
  FileChangeRequestApprovalResponse__FileChangeApprovalDecision,
  JSONRPCError__JSONRPCErrorError,
  JSONRPCError__RequestId,
  JSONRPCMessage__JSONRPCNotification,
  JSONRPCRequest__RequestId,
  JSONRPCRequest__W3cTraceContext,
  JSONRPCResponse__RequestId,
  McpServerElicitationRequestResponse__McpServerElicitationAction,
  PermissionsRequestApprovalParams__LegacyAppPathString,
  PermissionsRequestApprovalResponse__PermissionGrantScope,
} from "./schema.gen.part0.ts";
import {
  ClientRequest__CommandExecResizeParams,
  ClientRequest__ConfigurationReasoning,
  ClientRequest__ContentItem,
  ClientRequest__FsCopyParams,
  ClientRequest__FsCreateDirectoryParams,
  ClientRequest__FsGetMetadataParams,
  ClientRequest__FsReadDirectoryParams,
  ClientRequest__FsReadFileParams,
  ClientRequest__FsRemoveParams,
  ClientRequest__FsWatchParams,
  ClientRequest__FsWriteFileParams,
  ClientRequest__InitializeParams,
  ClientRequest__ListMcpServerStatusParams,
  ClientRequest__LoginAccountParams,
  ClientRequest__McpResourceReadParams,
  ClientRequest__McpServerOauthLoginParams,
  ClientRequest__PluginInstallParams,
  ClientRequest__PluginInstalledParams,
  ClientRequest__PluginListParams,
  ClientRequest__PluginReadParams,
  ClientRequest__ReviewStartParams,
  ClientRequest__SendAddCreditsNudgeEmailParams,
  ClientRequest__Settings,
  ClientRequest__SkillsConfigWriteParams,
  ClientRequest__SkillsExtraRootsSetParams,
  ClientRequest__ThreadForkParams,
  ClientRequest__ThreadGoalSetParams,
  ClientRequest__ThreadListParams,
  ClientRequest__ThreadMetadataUpdateParams,
  ClientRequest__ThreadResumeParams,
  ClientRequest__ThreadSectionCreateParams,
  ClientRequest__ThreadSectionUpdateParams,
  ClientRequest__ThreadStartParams,
  ClientRequest__ThreadTurnsListParams,
  ClientRequest__WindowsSandboxSetupStartParams,
} from "./schema.gen.part6.ts";
import {
  ClientRequest__ConfigValueWriteParams,
  CommandExecutionRequestApprovalParams__CommandAction,
  CommandExecutionRequestApprovalParams__NetworkApprovalContext,
  CommandExecutionRequestApprovalParams__NetworkPolicyAmendment,
  FuzzyFileSearchResponse__FuzzyFileSearchResult,
  FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchResult,
  JSONRPCMessage__JSONRPCError,
  JSONRPCMessage__JSONRPCRequest,
  JSONRPCMessage__JSONRPCResponse,
} from "./schema.gen.part7.ts";
import {
  ClientRequest__CommandExecParams,
  ClientRequest__ConfigBatchWriteParams,
  ClientRequest__FunctionCallOutputBody,
  ClientRequest__PluginShareSaveParams,
  ClientRequest__PluginShareUpdateTargetsParams,
  ClientRequest__ThreadItemsListParams,
  CommandExecutionRequestApprovalResponse__CommandExecutionApprovalDecision,
  ExecCommandApprovalResponse__ReviewDecision,
} from "./schema.gen.part11.ts";
import {
  ClientRequest__ExternalAgentConfigImportHistoryRecordParams,
  ClientRequest__ExternalAgentConfigImportParams,
  ClientRequest__TurnSteerParams,
} from "./schema.gen.part13.ts";
import {
  ClientRequest__TurnStartParams,
  CommandExecutionRequestApprovalParams__AdditionalFileSystemPermissions,
} from "./schema.gen.part17.ts";
import {
  PermissionsRequestApprovalParams__RequestPermissionProfile,
  PermissionsRequestApprovalResponse__GrantedPermissionProfile,
} from "./schema.gen.part18.ts";
import { McpServerElicitationRequestParams__McpElicitationSchema } from "./schema.gen.part19.ts";

export type ClientRequest =
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "initialize";
      readonly params: ClientRequest__InitializeParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/start";
      readonly params: ClientRequest__ThreadStartParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/resume";
      readonly params: ClientRequest__ThreadResumeParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/fork";
      readonly params: ClientRequest__ThreadForkParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/archive";
      readonly params: ClientRequest__ThreadArchiveParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/delete";
      readonly params: ClientRequest__ThreadDeleteParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/unsubscribe";
      readonly params: ClientRequest__ThreadUnsubscribeParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/name/set";
      readonly params: ClientRequest__ThreadSetNameParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/goal/set";
      readonly params: ClientRequest__ThreadGoalSetParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/goal/get";
      readonly params: ClientRequest__ThreadGoalGetParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/goal/clear";
      readonly params: ClientRequest__ThreadGoalClearParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/metadata/update";
      readonly params: ClientRequest__ThreadMetadataUpdateParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/attachment/add";
      readonly params: ClientRequest__ThreadAttachmentAddParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/attachment/list";
      readonly params: ClientRequest__ThreadAttachmentListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/attachment/remove";
      readonly params: ClientRequest__ThreadAttachmentRemoveParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/section/move";
      readonly params: ClientRequest__ThreadSectionMoveParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/unarchive";
      readonly params: ClientRequest__ThreadUnarchiveParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/compact/start";
      readonly params: ClientRequest__ThreadCompactStartParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/shellCommand";
      readonly params: ClientRequest__ThreadShellCommandParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/approveGuardianDeniedAction";
      readonly params: ClientRequest__ThreadApproveGuardianDeniedActionParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/revert";
      readonly params: ClientRequest__ThreadRevertParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/list";
      readonly params: ClientRequest__ThreadListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "threadSection/list";
      readonly params: ClientRequest__ThreadSectionListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "threadSection/create";
      readonly params: ClientRequest__ThreadSectionCreateParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "threadSection/update";
      readonly params: ClientRequest__ThreadSectionUpdateParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "threadSection/delete";
      readonly params: ClientRequest__ThreadSectionDeleteParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/loaded/list";
      readonly params: ClientRequest__ThreadLoadedListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/read";
      readonly params: ClientRequest__ThreadReadParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/turns/list";
      readonly params: ClientRequest__ThreadTurnsListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/items/list";
      readonly params: ClientRequest__ThreadItemsListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "thread/inject_items";
      readonly params: ClientRequest__ThreadInjectItemsParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "skills/list";
      readonly params: ClientRequest__SkillsListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "skills/extraRoots/set";
      readonly params: ClientRequest__SkillsExtraRootsSetParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "hooks/list";
      readonly params: ClientRequest__HooksListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "marketplace/add";
      readonly params: ClientRequest__MarketplaceAddParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "marketplace/remove";
      readonly params: ClientRequest__MarketplaceRemoveParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "marketplace/upgrade";
      readonly params: ClientRequest__MarketplaceUpgradeParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/list";
      readonly params: ClientRequest__PluginListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/installed";
      readonly params: ClientRequest__PluginInstalledParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/reconcile";
      readonly params: ClientRequest__PluginReconcileParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/read";
      readonly params: ClientRequest__PluginReadParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/skill/read";
      readonly params: ClientRequest__PluginSkillReadParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/share/save";
      readonly params: ClientRequest__PluginShareSaveParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/share/updateTargets";
      readonly params: ClientRequest__PluginShareUpdateTargetsParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/share/list";
      readonly params: ClientRequest__PluginShareListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/share/checkout";
      readonly params: ClientRequest__PluginShareCheckoutParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/share/delete";
      readonly params: ClientRequest__PluginShareDeleteParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "app/read";
      readonly params: ClientRequest__AppsReadParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "app/list";
      readonly params: ClientRequest__AppsListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "app/installed";
      readonly params: ClientRequest__AppsInstalledParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/readFile";
      readonly params: ClientRequest__FsReadFileParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/writeFile";
      readonly params: ClientRequest__FsWriteFileParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/createDirectory";
      readonly params: ClientRequest__FsCreateDirectoryParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/getMetadata";
      readonly params: ClientRequest__FsGetMetadataParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/readDirectory";
      readonly params: ClientRequest__FsReadDirectoryParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/remove";
      readonly params: ClientRequest__FsRemoveParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/copy";
      readonly params: ClientRequest__FsCopyParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/watch";
      readonly params: ClientRequest__FsWatchParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fs/unwatch";
      readonly params: ClientRequest__FsUnwatchParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "skills/config/write";
      readonly params: ClientRequest__SkillsConfigWriteParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/install";
      readonly params: ClientRequest__PluginInstallParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "plugin/uninstall";
      readonly params: ClientRequest__PluginUninstallParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "turn/start";
      readonly params: ClientRequest__TurnStartParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "turn/steer";
      readonly params: ClientRequest__TurnSteerParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "turn/interrupt";
      readonly params: ClientRequest__TurnInterruptParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "review/start";
      readonly params: ClientRequest__ReviewStartParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "model/list";
      readonly params: ClientRequest__ModelListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/gatewayOAuth/read";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/gatewayOAuth/login";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/gatewayOAuth/cancel";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "modelProvider/capabilities/read";
      readonly params: ClientRequest__ModelProviderCapabilitiesReadParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "experimentalFeature/list";
      readonly params: ClientRequest__ExperimentalFeatureListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "permissionProfile/list";
      readonly params: ClientRequest__PermissionProfileListParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "experimentalFeature/enablement/set";
      readonly params: ClientRequest__ExperimentalFeatureEnablementSetParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "mcpServer/oauth/login";
      readonly params: ClientRequest__McpServerOauthLoginParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "config/mcpServer/reload";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "mcpServerStatus/list";
      readonly params: ClientRequest__ListMcpServerStatusParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "mcpServer/resource/read";
      readonly params: ClientRequest__McpResourceReadParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "mcpServer/tool/call";
      readonly params: ClientRequest__McpServerToolCallParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "windowsSandbox/setupStart";
      readonly params: ClientRequest__WindowsSandboxSetupStartParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "windowsSandbox/readiness";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/login/start";
      readonly params: ClientRequest__LoginAccountParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/login/cancel";
      readonly params: ClientRequest__CancelLoginAccountParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/logout";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/rateLimits/read";
      readonly params?: ClientRequest__GetAccountRateLimitsParams | null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/rateLimitResetCredit/consume";
      readonly params: ClientRequest__ConsumeAccountRateLimitResetCreditParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/usage/read";
      readonly params?: ClientRequest__GetAccountTokenUsageParams | null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/workspaceMessages/read";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/sendAddCreditsNudgeEmail";
      readonly params: ClientRequest__SendAddCreditsNudgeEmailParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "feedback/upload";
      readonly params: ClientRequest__FeedbackUploadParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "command/exec";
      readonly params: ClientRequest__CommandExecParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "command/exec/write";
      readonly params: ClientRequest__CommandExecWriteParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "command/exec/terminate";
      readonly params: ClientRequest__CommandExecTerminateParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "command/exec/resize";
      readonly params: ClientRequest__CommandExecResizeParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "config/read";
      readonly params: ClientRequest__ConfigReadParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "externalAgentConfig/detect";
      readonly params: ClientRequest__ExternalAgentConfigDetectParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "externalAgentConfig/import";
      readonly params: ClientRequest__ExternalAgentConfigImportParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "externalAgentConfig/import/recordHistory";
      readonly params: ClientRequest__ExternalAgentConfigImportHistoryRecordParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "externalAgentConfig/import/readHistories";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "config/value/write";
      readonly params: ClientRequest__ConfigValueWriteParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "config/batchWrite";
      readonly params: ClientRequest__ConfigBatchWriteParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "configRequirements/read";
      readonly params?: null;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "account/read";
      readonly params: ClientRequest__GetAccountParams;
    }
  | {
      readonly id: ClientRequest__RequestId;
      readonly method: "fuzzyFileSearch";
      readonly params: ClientRequest__FuzzyFileSearchParams;
    };
export const ClientRequest = Schema.Union(
  [
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("initialize").annotate({ title: "InitializeRequestMethod" }),
      params: ClientRequest__InitializeParams,
    }).annotate({ title: "InitializeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/start").annotate({ title: "Thread/startRequestMethod" }),
      params: ClientRequest__ThreadStartParams,
    }).annotate({ title: "Thread/startRequest", description: "NEW APIs" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/resume").annotate({ title: "Thread/resumeRequestMethod" }),
      params: ClientRequest__ThreadResumeParams,
    }).annotate({ title: "Thread/resumeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/fork").annotate({ title: "Thread/forkRequestMethod" }),
      params: ClientRequest__ThreadForkParams,
    }).annotate({ title: "Thread/forkRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/archive").annotate({ title: "Thread/archiveRequestMethod" }),
      params: ClientRequest__ThreadArchiveParams,
    }).annotate({ title: "Thread/archiveRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/delete").annotate({ title: "Thread/deleteRequestMethod" }),
      params: ClientRequest__ThreadDeleteParams,
    }).annotate({ title: "Thread/deleteRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/unsubscribe").annotate({
        title: "Thread/unsubscribeRequestMethod",
      }),
      params: ClientRequest__ThreadUnsubscribeParams,
    }).annotate({ title: "Thread/unsubscribeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/name/set").annotate({ title: "Thread/name/setRequestMethod" }),
      params: ClientRequest__ThreadSetNameParams,
    }).annotate({ title: "Thread/name/setRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/goal/set").annotate({ title: "Thread/goal/setRequestMethod" }),
      params: ClientRequest__ThreadGoalSetParams,
    }).annotate({ title: "Thread/goal/setRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/goal/get").annotate({ title: "Thread/goal/getRequestMethod" }),
      params: ClientRequest__ThreadGoalGetParams,
    }).annotate({ title: "Thread/goal/getRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/goal/clear").annotate({
        title: "Thread/goal/clearRequestMethod",
      }),
      params: ClientRequest__ThreadGoalClearParams,
    }).annotate({ title: "Thread/goal/clearRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/metadata/update").annotate({
        title: "Thread/metadata/updateRequestMethod",
      }),
      params: ClientRequest__ThreadMetadataUpdateParams,
    }).annotate({ title: "Thread/metadata/updateRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/attachment/add").annotate({
        title: "Thread/attachment/addRequestMethod",
      }),
      params: ClientRequest__ThreadAttachmentAddParams,
    }).annotate({ title: "Thread/attachment/addRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/attachment/list").annotate({
        title: "Thread/attachment/listRequestMethod",
      }),
      params: ClientRequest__ThreadAttachmentListParams,
    }).annotate({ title: "Thread/attachment/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/attachment/remove").annotate({
        title: "Thread/attachment/removeRequestMethod",
      }),
      params: ClientRequest__ThreadAttachmentRemoveParams,
    }).annotate({ title: "Thread/attachment/removeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/section/move").annotate({
        title: "Thread/section/moveRequestMethod",
      }),
      params: ClientRequest__ThreadSectionMoveParams,
    }).annotate({ title: "Thread/section/moveRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/unarchive").annotate({
        title: "Thread/unarchiveRequestMethod",
      }),
      params: ClientRequest__ThreadUnarchiveParams,
    }).annotate({ title: "Thread/unarchiveRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/compact/start").annotate({
        title: "Thread/compact/startRequestMethod",
      }),
      params: ClientRequest__ThreadCompactStartParams,
    }).annotate({ title: "Thread/compact/startRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/shellCommand").annotate({
        title: "Thread/shellCommandRequestMethod",
      }),
      params: ClientRequest__ThreadShellCommandParams,
    }).annotate({ title: "Thread/shellCommandRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/approveGuardianDeniedAction").annotate({
        title: "Thread/approveGuardianDeniedActionRequestMethod",
      }),
      params: ClientRequest__ThreadApproveGuardianDeniedActionParams,
    }).annotate({ title: "Thread/approveGuardianDeniedActionRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/revert").annotate({ title: "Thread/revertRequestMethod" }),
      params: ClientRequest__ThreadRevertParams,
    }).annotate({ title: "Thread/revertRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/list").annotate({ title: "Thread/listRequestMethod" }),
      params: ClientRequest__ThreadListParams,
    }).annotate({ title: "Thread/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("threadSection/list").annotate({
        title: "ThreadSection/listRequestMethod",
      }),
      params: ClientRequest__ThreadSectionListParams,
    }).annotate({ title: "ThreadSection/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("threadSection/create").annotate({
        title: "ThreadSection/createRequestMethod",
      }),
      params: ClientRequest__ThreadSectionCreateParams,
    }).annotate({ title: "ThreadSection/createRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("threadSection/update").annotate({
        title: "ThreadSection/updateRequestMethod",
      }),
      params: ClientRequest__ThreadSectionUpdateParams,
    }).annotate({ title: "ThreadSection/updateRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("threadSection/delete").annotate({
        title: "ThreadSection/deleteRequestMethod",
      }),
      params: ClientRequest__ThreadSectionDeleteParams,
    }).annotate({ title: "ThreadSection/deleteRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/loaded/list").annotate({
        title: "Thread/loaded/listRequestMethod",
      }),
      params: ClientRequest__ThreadLoadedListParams,
    }).annotate({ title: "Thread/loaded/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/read").annotate({ title: "Thread/readRequestMethod" }),
      params: ClientRequest__ThreadReadParams,
    }).annotate({ title: "Thread/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/turns/list").annotate({
        title: "Thread/turns/listRequestMethod",
      }),
      params: ClientRequest__ThreadTurnsListParams,
    }).annotate({ title: "Thread/turns/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/items/list").annotate({
        title: "Thread/items/listRequestMethod",
      }),
      params: ClientRequest__ThreadItemsListParams,
    }).annotate({ title: "Thread/items/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("thread/inject_items").annotate({
        title: "Thread/injectItemsRequestMethod",
      }),
      params: ClientRequest__ThreadInjectItemsParams,
    }).annotate({
      title: "Thread/injectItemsRequest",
      description:
        "Append raw Responses API items to the thread history without starting a user turn.",
    }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("skills/list").annotate({ title: "Skills/listRequestMethod" }),
      params: ClientRequest__SkillsListParams,
    }).annotate({ title: "Skills/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("skills/extraRoots/set").annotate({
        title: "Skills/extraRoots/setRequestMethod",
      }),
      params: ClientRequest__SkillsExtraRootsSetParams,
    }).annotate({ title: "Skills/extraRoots/setRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("hooks/list").annotate({ title: "Hooks/listRequestMethod" }),
      params: ClientRequest__HooksListParams,
    }).annotate({ title: "Hooks/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("marketplace/add").annotate({ title: "Marketplace/addRequestMethod" }),
      params: ClientRequest__MarketplaceAddParams,
    }).annotate({ title: "Marketplace/addRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("marketplace/remove").annotate({
        title: "Marketplace/removeRequestMethod",
      }),
      params: ClientRequest__MarketplaceRemoveParams,
    }).annotate({ title: "Marketplace/removeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("marketplace/upgrade").annotate({
        title: "Marketplace/upgradeRequestMethod",
      }),
      params: ClientRequest__MarketplaceUpgradeParams,
    }).annotate({ title: "Marketplace/upgradeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/list").annotate({ title: "Plugin/listRequestMethod" }),
      params: ClientRequest__PluginListParams,
    }).annotate({ title: "Plugin/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/installed").annotate({
        title: "Plugin/installedRequestMethod",
      }),
      params: ClientRequest__PluginInstalledParams,
    }).annotate({ title: "Plugin/installedRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/reconcile").annotate({
        title: "Plugin/reconcileRequestMethod",
      }),
      params: ClientRequest__PluginReconcileParams,
    }).annotate({ title: "Plugin/reconcileRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/read").annotate({ title: "Plugin/readRequestMethod" }),
      params: ClientRequest__PluginReadParams,
    }).annotate({ title: "Plugin/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/skill/read").annotate({
        title: "Plugin/skill/readRequestMethod",
      }),
      params: ClientRequest__PluginSkillReadParams,
    }).annotate({ title: "Plugin/skill/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/share/save").annotate({
        title: "Plugin/share/saveRequestMethod",
      }),
      params: ClientRequest__PluginShareSaveParams,
    }).annotate({ title: "Plugin/share/saveRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/share/updateTargets").annotate({
        title: "Plugin/share/updateTargetsRequestMethod",
      }),
      params: ClientRequest__PluginShareUpdateTargetsParams,
    }).annotate({ title: "Plugin/share/updateTargetsRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/share/list").annotate({
        title: "Plugin/share/listRequestMethod",
      }),
      params: ClientRequest__PluginShareListParams,
    }).annotate({ title: "Plugin/share/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/share/checkout").annotate({
        title: "Plugin/share/checkoutRequestMethod",
      }),
      params: ClientRequest__PluginShareCheckoutParams,
    }).annotate({ title: "Plugin/share/checkoutRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/share/delete").annotate({
        title: "Plugin/share/deleteRequestMethod",
      }),
      params: ClientRequest__PluginShareDeleteParams,
    }).annotate({ title: "Plugin/share/deleteRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("app/read").annotate({ title: "App/readRequestMethod" }),
      params: ClientRequest__AppsReadParams,
    }).annotate({ title: "App/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("app/list").annotate({ title: "App/listRequestMethod" }),
      params: ClientRequest__AppsListParams,
    }).annotate({ title: "App/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("app/installed").annotate({ title: "App/installedRequestMethod" }),
      params: ClientRequest__AppsInstalledParams,
    }).annotate({ title: "App/installedRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/readFile").annotate({ title: "Fs/readFileRequestMethod" }),
      params: ClientRequest__FsReadFileParams,
    }).annotate({ title: "Fs/readFileRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/writeFile").annotate({ title: "Fs/writeFileRequestMethod" }),
      params: ClientRequest__FsWriteFileParams,
    }).annotate({ title: "Fs/writeFileRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/createDirectory").annotate({
        title: "Fs/createDirectoryRequestMethod",
      }),
      params: ClientRequest__FsCreateDirectoryParams,
    }).annotate({ title: "Fs/createDirectoryRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/getMetadata").annotate({ title: "Fs/getMetadataRequestMethod" }),
      params: ClientRequest__FsGetMetadataParams,
    }).annotate({ title: "Fs/getMetadataRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/readDirectory").annotate({
        title: "Fs/readDirectoryRequestMethod",
      }),
      params: ClientRequest__FsReadDirectoryParams,
    }).annotate({ title: "Fs/readDirectoryRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/remove").annotate({ title: "Fs/removeRequestMethod" }),
      params: ClientRequest__FsRemoveParams,
    }).annotate({ title: "Fs/removeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/copy").annotate({ title: "Fs/copyRequestMethod" }),
      params: ClientRequest__FsCopyParams,
    }).annotate({ title: "Fs/copyRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/watch").annotate({ title: "Fs/watchRequestMethod" }),
      params: ClientRequest__FsWatchParams,
    }).annotate({ title: "Fs/watchRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fs/unwatch").annotate({ title: "Fs/unwatchRequestMethod" }),
      params: ClientRequest__FsUnwatchParams,
    }).annotate({ title: "Fs/unwatchRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("skills/config/write").annotate({
        title: "Skills/config/writeRequestMethod",
      }),
      params: ClientRequest__SkillsConfigWriteParams,
    }).annotate({ title: "Skills/config/writeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/install").annotate({ title: "Plugin/installRequestMethod" }),
      params: ClientRequest__PluginInstallParams,
    }).annotate({ title: "Plugin/installRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("plugin/uninstall").annotate({
        title: "Plugin/uninstallRequestMethod",
      }),
      params: ClientRequest__PluginUninstallParams,
    }).annotate({ title: "Plugin/uninstallRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("turn/start").annotate({ title: "Turn/startRequestMethod" }),
      params: ClientRequest__TurnStartParams,
    }).annotate({ title: "Turn/startRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("turn/steer").annotate({ title: "Turn/steerRequestMethod" }),
      params: ClientRequest__TurnSteerParams,
    }).annotate({ title: "Turn/steerRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("turn/interrupt").annotate({ title: "Turn/interruptRequestMethod" }),
      params: ClientRequest__TurnInterruptParams,
    }).annotate({ title: "Turn/interruptRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("review/start").annotate({ title: "Review/startRequestMethod" }),
      params: ClientRequest__ReviewStartParams,
    }).annotate({ title: "Review/startRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("model/list").annotate({ title: "Model/listRequestMethod" }),
      params: ClientRequest__ModelListParams,
    }).annotate({ title: "Model/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/gatewayOAuth/read").annotate({
        title: "Account/gatewayOAuth/readRequestMethod",
      }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "Account/gatewayOAuth/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/gatewayOAuth/login").annotate({
        title: "Account/gatewayOAuth/loginRequestMethod",
      }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "Account/gatewayOAuth/loginRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/gatewayOAuth/cancel").annotate({
        title: "Account/gatewayOAuth/cancelRequestMethod",
      }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "Account/gatewayOAuth/cancelRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("modelProvider/capabilities/read").annotate({
        title: "ModelProvider/capabilities/readRequestMethod",
      }),
      params: ClientRequest__ModelProviderCapabilitiesReadParams,
    }).annotate({ title: "ModelProvider/capabilities/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("experimentalFeature/list").annotate({
        title: "ExperimentalFeature/listRequestMethod",
      }),
      params: ClientRequest__ExperimentalFeatureListParams,
    }).annotate({ title: "ExperimentalFeature/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("permissionProfile/list").annotate({
        title: "PermissionProfile/listRequestMethod",
      }),
      params: ClientRequest__PermissionProfileListParams,
    }).annotate({ title: "PermissionProfile/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("experimentalFeature/enablement/set").annotate({
        title: "ExperimentalFeature/enablement/setRequestMethod",
      }),
      params: ClientRequest__ExperimentalFeatureEnablementSetParams,
    }).annotate({ title: "ExperimentalFeature/enablement/setRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("mcpServer/oauth/login").annotate({
        title: "McpServer/oauth/loginRequestMethod",
      }),
      params: ClientRequest__McpServerOauthLoginParams,
    }).annotate({ title: "McpServer/oauth/loginRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("config/mcpServer/reload").annotate({
        title: "Config/mcpServer/reloadRequestMethod",
      }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "Config/mcpServer/reloadRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("mcpServerStatus/list").annotate({
        title: "McpServerStatus/listRequestMethod",
      }),
      params: ClientRequest__ListMcpServerStatusParams,
    }).annotate({ title: "McpServerStatus/listRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("mcpServer/resource/read").annotate({
        title: "McpServer/resource/readRequestMethod",
      }),
      params: ClientRequest__McpResourceReadParams,
    }).annotate({ title: "McpServer/resource/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("mcpServer/tool/call").annotate({
        title: "McpServer/tool/callRequestMethod",
      }),
      params: ClientRequest__McpServerToolCallParams,
    }).annotate({ title: "McpServer/tool/callRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("windowsSandbox/setupStart").annotate({
        title: "WindowsSandbox/setupStartRequestMethod",
      }),
      params: ClientRequest__WindowsSandboxSetupStartParams,
    }).annotate({ title: "WindowsSandbox/setupStartRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("windowsSandbox/readiness").annotate({
        title: "WindowsSandbox/readinessRequestMethod",
      }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "WindowsSandbox/readinessRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/login/start").annotate({
        title: "Account/login/startRequestMethod",
      }),
      params: ClientRequest__LoginAccountParams,
    }).annotate({ title: "Account/login/startRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/login/cancel").annotate({
        title: "Account/login/cancelRequestMethod",
      }),
      params: ClientRequest__CancelLoginAccountParams,
    }).annotate({ title: "Account/login/cancelRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/logout").annotate({ title: "Account/logoutRequestMethod" }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "Account/logoutRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/rateLimits/read").annotate({
        title: "Account/rateLimits/readRequestMethod",
      }),
      params: Schema.optionalKey(
        Schema.Union([ClientRequest__GetAccountRateLimitsParams, Schema.Null]),
      ),
    }).annotate({ title: "Account/rateLimits/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/rateLimitResetCredit/consume").annotate({
        title: "Account/rateLimitResetCredit/consumeRequestMethod",
      }),
      params: ClientRequest__ConsumeAccountRateLimitResetCreditParams,
    }).annotate({ title: "Account/rateLimitResetCredit/consumeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/usage/read").annotate({
        title: "Account/usage/readRequestMethod",
      }),
      params: Schema.optionalKey(
        Schema.Union([ClientRequest__GetAccountTokenUsageParams, Schema.Null]),
      ),
    }).annotate({ title: "Account/usage/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/workspaceMessages/read").annotate({
        title: "Account/workspaceMessages/readRequestMethod",
      }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "Account/workspaceMessages/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/sendAddCreditsNudgeEmail").annotate({
        title: "Account/sendAddCreditsNudgeEmailRequestMethod",
      }),
      params: ClientRequest__SendAddCreditsNudgeEmailParams,
    }).annotate({ title: "Account/sendAddCreditsNudgeEmailRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("feedback/upload").annotate({ title: "Feedback/uploadRequestMethod" }),
      params: ClientRequest__FeedbackUploadParams,
    }).annotate({ title: "Feedback/uploadRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("command/exec").annotate({ title: "Command/execRequestMethod" }),
      params: ClientRequest__CommandExecParams,
    }).annotate({
      title: "Command/execRequest",
      description: "Execute a standalone command (argv vector) under the server's sandbox.",
    }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("command/exec/write").annotate({
        title: "Command/exec/writeRequestMethod",
      }),
      params: ClientRequest__CommandExecWriteParams,
    }).annotate({
      title: "Command/exec/writeRequest",
      description: "Write stdin bytes to a running `command/exec` session or close stdin.",
    }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("command/exec/terminate").annotate({
        title: "Command/exec/terminateRequestMethod",
      }),
      params: ClientRequest__CommandExecTerminateParams,
    }).annotate({
      title: "Command/exec/terminateRequest",
      description: "Terminate a running `command/exec` session by client-supplied `processId`.",
    }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("command/exec/resize").annotate({
        title: "Command/exec/resizeRequestMethod",
      }),
      params: ClientRequest__CommandExecResizeParams,
    }).annotate({
      title: "Command/exec/resizeRequest",
      description:
        "Resize a running PTY-backed `command/exec` session by client-supplied `processId`.",
    }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("config/read").annotate({ title: "Config/readRequestMethod" }),
      params: ClientRequest__ConfigReadParams,
    }).annotate({ title: "Config/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("externalAgentConfig/detect").annotate({
        title: "ExternalAgentConfig/detectRequestMethod",
      }),
      params: ClientRequest__ExternalAgentConfigDetectParams,
    }).annotate({ title: "ExternalAgentConfig/detectRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("externalAgentConfig/import").annotate({
        title: "ExternalAgentConfig/importRequestMethod",
      }),
      params: ClientRequest__ExternalAgentConfigImportParams,
    }).annotate({ title: "ExternalAgentConfig/importRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("externalAgentConfig/import/recordHistory").annotate({
        title: "ExternalAgentConfig/import/recordHistoryRequestMethod",
      }),
      params: ClientRequest__ExternalAgentConfigImportHistoryRecordParams,
    }).annotate({ title: "ExternalAgentConfig/import/recordHistoryRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("externalAgentConfig/import/readHistories").annotate({
        title: "ExternalAgentConfig/import/readHistoriesRequestMethod",
      }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "ExternalAgentConfig/import/readHistoriesRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("config/value/write").annotate({
        title: "Config/value/writeRequestMethod",
      }),
      params: ClientRequest__ConfigValueWriteParams,
    }).annotate({ title: "Config/value/writeRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("config/batchWrite").annotate({
        title: "Config/batchWriteRequestMethod",
      }),
      params: ClientRequest__ConfigBatchWriteParams,
    }).annotate({ title: "Config/batchWriteRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("configRequirements/read").annotate({
        title: "ConfigRequirements/readRequestMethod",
      }),
      params: Schema.optionalKey(Schema.Null),
    }).annotate({ title: "ConfigRequirements/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("account/read").annotate({ title: "Account/readRequestMethod" }),
      params: ClientRequest__GetAccountParams,
    }).annotate({ title: "Account/readRequest" }),
    Schema.Struct({
      id: ClientRequest__RequestId,
      method: Schema.Literal("fuzzyFileSearch").annotate({ title: "FuzzyFileSearchRequestMethod" }),
      params: ClientRequest__FuzzyFileSearchParams,
    }).annotate({ title: "FuzzyFileSearchRequest" }),
  ],
  { mode: "oneOf" },
).annotate({ title: "ClientRequest", description: "Request from the client to the server." });

export type ClientRequest__AdditionalContextEntry = {
  readonly kind: ClientRequest__AdditionalContextKind;
  readonly value: string;
};
export const ClientRequest__AdditionalContextEntry = Schema.Struct({
  kind: ClientRequest__AdditionalContextKind,
  value: Schema.String,
});

export type ClientRequest__CodexResponseHandoffMode = "thinking" | "commentary" | "bemTags";
export const ClientRequest__CodexResponseHandoffMode = Schema.Literals([
  "thinking",
  "commentary",
  "bemTags",
]);

export type ClientRequest__CollaborationMode = {
  readonly mode: ClientRequest__ModeKind;
  readonly settings: ClientRequest__Settings;
};
export const ClientRequest__CollaborationMode = Schema.Struct({
  mode: ClientRequest__ModeKind,
  settings: ClientRequest__Settings,
}).annotate({ description: "Collaboration mode for a Codex session." });

export type ClientRequest__CyberAccessProgram = "standard" | "daybreakBlue" | "daybreakRed";
export const ClientRequest__CyberAccessProgram = Schema.Literals([
  "standard",
  "daybreakBlue",
  "daybreakRed",
]).annotate({
  description:
    "Requested cyber treatment for a ChatGPT-authenticated Codex turn. Authorization and model-tier restrictions remain server-owned.",
});

export type ClientRequest__DynamicToolSpec =
  | {
      readonly deferLoading?: boolean;
      readonly description: string;
      readonly inputSchema: Schema.Json;
      readonly name: string;
      readonly type: "function";
    }
  | {
      readonly description: string;
      readonly name: string;
      readonly tools: ReadonlyArray<ClientRequest__DynamicToolNamespaceTool>;
      readonly type: "namespace";
    };
export const ClientRequest__DynamicToolSpec = Schema.Union(
  [
    Schema.Struct({
      deferLoading: Schema.optionalKey(Schema.Boolean),
      description: Schema.String,
      inputSchema: Schema.Json.annotate({ expected: "JSON value" }),
      name: Schema.String,
      type: Schema.Literal("function").annotate({ title: "FunctionDynamicToolSpecType" }),
    }).annotate({ title: "FunctionDynamicToolSpec" }),
    Schema.Struct({
      description: Schema.String,
      name: Schema.String,
      tools: Schema.Array(ClientRequest__DynamicToolNamespaceTool),
      type: Schema.Literal("namespace").annotate({ title: "NamespaceDynamicToolSpecType" }),
    }).annotate({ title: "NamespaceDynamicToolSpec" }),
  ],
  { mode: "oneOf" },
);

export type ClientRequest__MultiAgentMode =
  | "explicitRequestOnly"
  | "proactive"
  | { readonly custom: string };
export const ClientRequest__MultiAgentMode = Schema.Union(
  [
    Schema.Literals(["explicitRequestOnly", "proactive"]),
    Schema.Struct({ custom: Schema.String }).annotate({ title: "CustomMultiAgentMode" }),
  ],
  { mode: "oneOf" },
).annotate({
  description:
    "Controls the effective multi-agent delegation instructions for a turn. `custom` means the configured mode hint defines the policy instead of a built-in policy.",
});

export type ClientRequest__PluginSearchScope = "global" | "workspace" | "personal";
export const ClientRequest__PluginSearchScope = Schema.Literals([
  "global",
  "workspace",
  "personal",
]);

export type ClientRequest__ProcessTerminalSize = { readonly cols: number; readonly rows: number };
export const ClientRequest__ProcessTerminalSize = Schema.Struct({
  cols: Schema.Number.annotate({
    description: "Terminal width in character cells.",
    format: "uint16",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  rows: Schema.Number.annotate({
    description: "Terminal height in character cells.",
    format: "uint16",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
}).annotate({ description: "PTY size in character cells for `process/spawn` PTY sessions." });

export type ClientRequest__ProjectRoot = { readonly path: ClientRequest__AbsolutePathBuf };
export const ClientRequest__ProjectRoot = Schema.Struct({ path: ClientRequest__AbsolutePathBuf });

export type ClientRequest__ProjectSortKey = "position" | "recencyAt";
export const ClientRequest__ProjectSortKey = Schema.Literals(["position", "recencyAt"]);

export type ClientRequest__RealtimeConversationVersion = "v1" | "v2" | "v3";
export const ClientRequest__RealtimeConversationVersion = Schema.Literals(["v1", "v2", "v3"]);

export type ClientRequest__RealtimeOutputModality = "text" | "audio";
export const ClientRequest__RealtimeOutputModality = Schema.Literals(["text", "audio"]);

export type ClientRequest__RealtimeVoice =
  | "alloy"
  | "arbor"
  | "ash"
  | "ballad"
  | "breeze"
  | "cedar"
  | "coral"
  | "cove"
  | "echo"
  | "ember"
  | "juniper"
  | "maple"
  | "marin"
  | "sage"
  | "shimmer"
  | "sol"
  | "spruce"
  | "vale"
  | "verse";
export const ClientRequest__RealtimeVoice = Schema.Literals([
  "alloy",
  "arbor",
  "ash",
  "ballad",
  "breeze",
  "cedar",
  "coral",
  "cove",
  "echo",
  "ember",
  "juniper",
  "maple",
  "marin",
  "sage",
  "shimmer",
  "sol",
  "spruce",
  "vale",
  "verse",
]);

export type ClientRequest__RemoteControlDisableParams = { readonly ephemeral?: boolean };
export const ClientRequest__RemoteControlDisableParams = Schema.Struct({
  ephemeral: Schema.optionalKey(Schema.Boolean),
});

export type ClientRequest__RemoteControlEnableParams = { readonly ephemeral?: boolean };
export const ClientRequest__RemoteControlEnableParams = Schema.Struct({
  ephemeral: Schema.optionalKey(Schema.Boolean),
});

export type ClientRequest__ResponseItem =
  | {
      readonly content: ReadonlyArray<ClientRequest__ContentItem>;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly phase?: ClientRequest__MessagePhase | null;
      readonly role: string;
      readonly type: "message";
    }
  | {
      readonly author: string;
      readonly content: ReadonlyArray<ClientRequest__AgentMessageInputContent>;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly recipient: string;
      readonly type: "agent_message";
    }
  | {
      readonly content?: ReadonlyArray<ClientRequest__ReasoningItemContent> | null;
      readonly encrypted_content?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly summary: ReadonlyArray<ClientRequest__ReasoningItemReasoningSummary>;
      readonly type: "reasoning";
    }
  | {
      readonly action: ClientRequest__LocalShellAction;
      readonly call_id?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly status: ClientRequest__LocalShellStatus;
      readonly type: "local_shell_call";
    }
  | {
      readonly arguments: string;
      readonly call_id: string;
      readonly encrypted_function_args?: ReadonlyArray<string> | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly name: string;
      readonly namespace?: string | null;
      readonly type: "function_call";
    }
  | {
      readonly arguments: Schema.Json;
      readonly call_id?: string | null;
      readonly execution: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly status?: string | null;
      readonly type: "tool_search_call";
    }
  | {
      readonly call_id?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly name?: string | null;
      readonly namespace?: string | null;
      readonly output: ClientRequest__FunctionCallOutputBody;
      readonly type: "function_call_output";
    }
  | {
      readonly call_id: string;
      readonly id?: string | null;
      readonly input: string;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly name: string;
      readonly namespace?: string | null;
      readonly status?: string | null;
      readonly type: "custom_tool_call";
    }
  | {
      readonly call_id: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly name?: string | null;
      readonly output: ClientRequest__FunctionCallOutputBody;
      readonly type: "custom_tool_call_output";
    }
  | {
      readonly call_id?: string | null;
      readonly execution: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly status: string;
      readonly tools: ReadonlyArray<Schema.Json>;
      readonly type: "tool_search_output";
    }
  | {
      readonly action?: ClientRequest__ResponsesApiWebSearchAction | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly status?: string | null;
      readonly type: "web_search_call";
    }
  | {
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly result: string;
      readonly revised_prompt?: string | null;
      readonly status: string;
      readonly type: "image_generation_call";
    }
  | {
      readonly encrypted_content: string;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly type: "compaction";
    }
  | {
      readonly reasoning: ClientRequest__ConfigurationReasoning;
      readonly type: "configuration_update";
    }
  | { readonly type: "compaction_trigger" }
  | {
      readonly encrypted_content?: string | null;
      readonly id?: string | null;
      readonly internal_chat_message_metadata_passthrough?: ClientRequest__InternalChatMessageMetadataPassthrough | null;
      readonly type: "context_compaction";
    }
  | { readonly type: "other" };
export const ClientRequest__ResponseItem = Schema.Union(
  [
    Schema.Struct({
      content: Schema.Array(ClientRequest__ContentItem),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      phase: Schema.optionalKey(Schema.Union([ClientRequest__MessagePhase, Schema.Null])),
      role: Schema.String,
      type: Schema.Literal("message").annotate({ title: "MessageResponseItemType" }),
    }).annotate({ title: "MessageResponseItem" }),
    Schema.Struct({
      author: Schema.String,
      content: Schema.Array(ClientRequest__AgentMessageInputContent),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      recipient: Schema.String,
      type: Schema.Literal("agent_message").annotate({ title: "AgentMessageResponseItemType" }),
    }).annotate({ title: "AgentMessageResponseItem" }),
    Schema.Struct({
      content: Schema.optionalKey(
        Schema.Union([Schema.Array(ClientRequest__ReasoningItemContent), Schema.Null]),
      ),
      encrypted_content: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      summary: Schema.Array(ClientRequest__ReasoningItemReasoningSummary),
      type: Schema.Literal("reasoning").annotate({ title: "ReasoningResponseItemType" }),
    }).annotate({ title: "ReasoningResponseItem" }),
    Schema.Struct({
      action: ClientRequest__LocalShellAction,
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
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      status: ClientRequest__LocalShellStatus,
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
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
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
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
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
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: ClientRequest__FunctionCallOutputBody,
      type: Schema.Literal("function_call_output").annotate({
        title: "FunctionCallOutputResponseItemType",
      }),
    }).annotate({ title: "FunctionCallOutputResponseItem" }),
    Schema.Struct({
      call_id: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      input: Schema.String,
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
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
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      name: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      output: ClientRequest__FunctionCallOutputBody,
      type: Schema.Literal("custom_tool_call_output").annotate({
        title: "CustomToolCallOutputResponseItemType",
      }),
    }).annotate({ title: "CustomToolCallOutputResponseItem" }),
    Schema.Struct({
      call_id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      execution: Schema.String,
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      status: Schema.String,
      tools: Schema.Array(Schema.Json.annotate({ expected: "JSON value" })),
      type: Schema.Literal("tool_search_output").annotate({
        title: "ToolSearchOutputResponseItemType",
      }),
    }).annotate({ title: "ToolSearchOutputResponseItem" }),
    Schema.Struct({
      action: Schema.optionalKey(
        Schema.Union([ClientRequest__ResponsesApiWebSearchAction, Schema.Null]),
      ),
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      status: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("web_search_call").annotate({ title: "WebSearchCallResponseItemType" }),
    }).annotate({ title: "WebSearchCallResponseItem" }),
    Schema.Struct({
      id: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      internal_chat_message_metadata_passthrough: Schema.optionalKey(
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
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
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
      ),
      type: Schema.Literal("compaction").annotate({ title: "CompactionResponseItemType" }),
    }).annotate({ title: "CompactionResponseItem" }),
    Schema.Struct({
      reasoning: ClientRequest__ConfigurationReasoning,
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
        Schema.Union([ClientRequest__InternalChatMessageMetadataPassthrough, Schema.Null]),
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
);

export type ClientRequest__SelectedCapabilityRoot = {
  readonly id: string;
  readonly location: ClientRequest__CapabilityRootLocation;
};
export const ClientRequest__SelectedCapabilityRoot = Schema.Struct({
  id: Schema.String.annotate({
    description: "Stable identifier supplied by the capability selection platform.",
  }),
  location: Schema.suspend(
    (): Schema.Codec<ClientRequest__CapabilityRootLocation> =>
      ClientRequest__CapabilityRootLocation,
  ).annotate({ description: "Where the selected root can be resolved." }),
}).annotate({
  description: "A user-selected root that can expose one or more runtime capabilities.",
});

export type ClientRequest__ThreadHistoryMode = "legacy" | "paginated";
export const ClientRequest__ThreadHistoryMode = Schema.Literals(["legacy", "paginated"]);

export type ClientRequest__ThreadMemoryMode = "enabled" | "disabled";
export const ClientRequest__ThreadMemoryMode = Schema.Literals(["enabled", "disabled"]);

export type ClientRequest__ThreadRealtimeAudioChunk = {
  readonly data: string;
  readonly itemId?: string | null;
  readonly numChannels: number;
  readonly sampleRate: number;
  readonly samplesPerChannel?: number | null;
};
export const ClientRequest__ThreadRealtimeAudioChunk = Schema.Struct({
  data: Schema.String,
  itemId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  numChannels: Schema.Number.annotate({ format: "uint16" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  sampleRate: Schema.Number.annotate({ format: "uint32" })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(0).annotate({ expected: "a value greater than or equal to 0" }),
    ),
  samplesPerChannel: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "uint32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      Schema.Null,
    ]),
  ),
}).annotate({ description: "EXPERIMENTAL - thread realtime audio chunk." });

export type ClientRequest__ThreadRealtimeInitialItem = {
  readonly role: ClientRequest__ConversationTextRole;
  readonly text: string;
};
export const ClientRequest__ThreadRealtimeInitialItem = Schema.Struct({
  role: ClientRequest__ConversationTextRole,
  text: Schema.String,
}).annotate({
  description: "EXPERIMENTAL - role-bearing text item included when a realtime V3 session starts.",
});

export type ClientRequest__ThreadRealtimeStartTransport =
  | { readonly type: "websocket" }
  | { readonly sdp: string; readonly type: "webrtc" }
  | { readonly callId: string; readonly type: "existingCall" };
export const ClientRequest__ThreadRealtimeStartTransport = Schema.Union(
  [
    Schema.Struct({
      type: Schema.Literal("websocket").annotate({
        title: "WebsocketThreadRealtimeStartTransportType",
      }),
    }).annotate({ title: "WebsocketThreadRealtimeStartTransport" }),
    Schema.Struct({
      sdp: Schema.String.annotate({
        description:
          "SDP offer generated by a WebRTC RTCPeerConnection after configuring audio and the realtime events data channel.",
      }),
      type: Schema.Literal("webrtc").annotate({ title: "WebrtcThreadRealtimeStartTransportType" }),
    }).annotate({ title: "WebrtcThreadRealtimeStartTransport" }),
    Schema.Struct({
      callId: Schema.String.annotate({
        description: "Identifier of a realtime call already created and negotiated by the client.",
      }),
      type: Schema.Literal("existingCall").annotate({
        title: "ExistingCallThreadRealtimeStartTransportType",
      }),
    }).annotate({ title: "ExistingCallThreadRealtimeStartTransport" }),
  ],
  { mode: "oneOf" },
).annotate({ description: "EXPERIMENTAL - transport used by thread realtime." });

export type ClientRequest__ThreadResumeInitialTurnsPageParams = {
  readonly itemsView?: ClientRequest__TurnItemsView | null;
  readonly limit?: number | null;
  readonly sortDirection?: ClientRequest__SortDirection | null;
};
export const ClientRequest__ThreadResumeInitialTurnsPageParams = Schema.Struct({
  itemsView: Schema.optionalKey(
    Schema.Union([ClientRequest__TurnItemsView, Schema.Null]).annotate({
      description: "How much item detail to include for each returned turn; defaults to summary.",
    }),
  ),
  limit: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ description: "Optional turn page size.", format: "uint32" })
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
      description: "Optional turn pagination direction; defaults to descending.",
    }),
  ),
});

export type ClientRequest__ThreadSearchSortKey = "created_at" | "updated_at" | "recency_at";
export const ClientRequest__ThreadSearchSortKey = Schema.Literals([
  "created_at",
  "updated_at",
  "recency_at",
]);

export type ClientRequest__TurnEnvironmentParams = {
  readonly cwd: ClientRequest__LegacyAppPathString;
  readonly environmentId: string;
  readonly runtimeWorkspaceRoots?: ReadonlyArray<ClientRequest__LegacyAppPathString> | null;
};
export const ClientRequest__TurnEnvironmentParams = Schema.Struct({
  cwd: ClientRequest__LegacyAppPathString,
  environmentId: Schema.String,
  runtimeWorkspaceRoots: Schema.optionalKey(
    Schema.Union([
      Schema.Array(ClientRequest__LegacyAppPathString).annotate({
        description: "Environment-native runtime workspace roots. Omitted defaults to `cwd`.",
      }),
      Schema.Null,
    ]),
  ),
});

export type CommandExecutionRequestApprovalParams = {
  readonly approvalId?: string | null;
  readonly command?: string | null;
  readonly commandActions?: ReadonlyArray<CommandExecutionRequestApprovalParams__CommandAction> | null;
  readonly cwd?: CommandExecutionRequestApprovalParams__LegacyAppPathString | null;
  readonly environmentId?: string | null;
  readonly itemId: string;
  readonly kind?: CommandExecutionRequestApprovalParams__CommandExecutionApprovalKind;
  readonly networkApprovalContext?: CommandExecutionRequestApprovalParams__NetworkApprovalContext | null;
  readonly proposedExecpolicyAmendment?: ReadonlyArray<string> | null;
  readonly proposedNetworkPolicyAmendments?: ReadonlyArray<CommandExecutionRequestApprovalParams__NetworkPolicyAmendment> | null;
  readonly reason?: string | null;
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const CommandExecutionRequestApprovalParams = Schema.Struct({
  approvalId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "Unique identifier for this specific approval callback.\n\nFor regular shell/unified_exec approvals, this is null.\n\nFor zsh-exec-bridge subcommand approvals, multiple callbacks can belong to one parent `itemId`, so `approvalId` is a distinct opaque callback id (a UUID) used to disambiguate routing. Stdin approvals also use a distinct callback id; inspect `kind` to distinguish them.",
      }),
      Schema.Null,
    ]),
  ),
  command: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "The command to be executed." }),
      Schema.Null,
    ]),
  ),
  commandActions: Schema.optionalKey(
    Schema.Union([
      Schema.Array(CommandExecutionRequestApprovalParams__CommandAction).annotate({
        description: "Best-effort parsed command actions for friendly display.",
      }),
      Schema.Null,
    ]),
  ),
  cwd: Schema.optionalKey(
    Schema.Union([
      CommandExecutionRequestApprovalParams__LegacyAppPathString,
      Schema.Null,
    ]).annotate({ description: "The command's working directory." }),
  ),
  environmentId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Environment in which the command will run." }),
      Schema.Null,
    ]),
  ),
  itemId: Schema.String,
  kind: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<CommandExecutionRequestApprovalParams__CommandExecutionApprovalKind> =>
        CommandExecutionRequestApprovalParams__CommandExecutionApprovalKind,
    ).annotate({
      description: "Kind of action under review. Defaults to `command` for older servers.",
      default: "command",
    }),
  ),
  networkApprovalContext: Schema.optionalKey(
    Schema.Union([
      CommandExecutionRequestApprovalParams__NetworkApprovalContext,
      Schema.Null,
    ]).annotate({ description: "Optional context for a managed-network approval prompt." }),
  ),
  proposedExecpolicyAmendment: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Optional proposed execpolicy amendment to allow similar commands without prompting.",
      }),
      Schema.Null,
    ]),
  ),
  proposedNetworkPolicyAmendments: Schema.optionalKey(
    Schema.Union([
      Schema.Array(CommandExecutionRequestApprovalParams__NetworkPolicyAmendment).annotate({
        description:
          "Optional proposed network policy amendments (allow/deny host) for future requests.",
      }),
      Schema.Null,
    ]),
  ),
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional explanatory reason (e.g. request for network access).",
      }),
      Schema.Null,
    ]),
  ),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this approval request started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "CommandExecutionRequestApprovalParams" });

export type CommandExecutionRequestApprovalParams__AdditionalPermissionProfile = {
  readonly fileSystem?: CommandExecutionRequestApprovalParams__AdditionalFileSystemPermissions | null;
  readonly network?: CommandExecutionRequestApprovalParams__AdditionalNetworkPermissions | null;
};
export const CommandExecutionRequestApprovalParams__AdditionalPermissionProfile = Schema.Struct({
  fileSystem: Schema.optionalKey(
    Schema.Union([
      CommandExecutionRequestApprovalParams__AdditionalFileSystemPermissions,
      Schema.Null,
    ]),
  ),
  network: Schema.optionalKey(
    Schema.Union([
      CommandExecutionRequestApprovalParams__AdditionalNetworkPermissions,
      Schema.Null,
    ]).annotate({ description: "Partial overlay used for per-command permission requests." }),
  ),
});

export type CommandExecutionRequestApprovalParams__CommandExecutionApprovalDecision =
  | "accept"
  | "acceptForSession"
  | {
      readonly acceptWithExecpolicyAmendment: {
        readonly execpolicy_amendment: ReadonlyArray<string>;
      };
    }
  | {
      readonly applyNetworkPolicyAmendment: {
        readonly network_policy_amendment: CommandExecutionRequestApprovalParams__NetworkPolicyAmendment;
      };
    }
  | "decline"
  | "cancel";
export const CommandExecutionRequestApprovalParams__CommandExecutionApprovalDecision = Schema.Union(
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
        network_policy_amendment: CommandExecutionRequestApprovalParams__NetworkPolicyAmendment,
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

export type CommandExecutionRequestApprovalResponse = {
  readonly decision: CommandExecutionRequestApprovalResponse__CommandExecutionApprovalDecision;
};
export const CommandExecutionRequestApprovalResponse = Schema.Struct({
  decision: CommandExecutionRequestApprovalResponse__CommandExecutionApprovalDecision,
}).annotate({ title: "CommandExecutionRequestApprovalResponse" });

export type DynamicToolCallParams = {
  readonly arguments: Schema.Json;
  readonly callId: string;
  readonly namespace?: string | null;
  readonly threadId: string;
  readonly tool: string;
  readonly turnId: string;
};
export const DynamicToolCallParams = Schema.Struct({
  arguments: Schema.Json.annotate({ expected: "JSON value" }),
  callId: Schema.String,
  namespace: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  threadId: Schema.String,
  tool: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "DynamicToolCallParams" });

export type DynamicToolCallResponse = {
  readonly contentItems: ReadonlyArray<DynamicToolCallResponse__DynamicToolCallOutputContentItem>;
  readonly success: boolean;
};
export const DynamicToolCallResponse = Schema.Struct({
  contentItems: Schema.Array(DynamicToolCallResponse__DynamicToolCallOutputContentItem),
  success: Schema.Boolean,
}).annotate({ title: "DynamicToolCallResponse" });

export type ExecCommandApprovalParams = {
  readonly approvalId?: string | null;
  readonly callId: string;
  readonly command: ReadonlyArray<string>;
  readonly conversationId: ExecCommandApprovalParams__ThreadId;
  readonly cwd: string;
  readonly parsedCmd: ReadonlyArray<ExecCommandApprovalParams__ParsedCommand>;
  readonly reason?: string | null;
};
export const ExecCommandApprovalParams = Schema.Struct({
  approvalId: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Identifier for this specific approval callback." }),
      Schema.Null,
    ]),
  ),
  callId: Schema.String.annotate({
    description:
      "Use to correlate this with [codex_protocol::protocol::ExecCommandBeginEvent] and [codex_protocol::protocol::ExecCommandEndEvent].",
  }),
  command: Schema.Array(Schema.String),
  conversationId: ExecCommandApprovalParams__ThreadId,
  cwd: Schema.String,
  parsedCmd: Schema.Array(ExecCommandApprovalParams__ParsedCommand),
  reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ title: "ExecCommandApprovalParams" });

export type ExecCommandApprovalResponse = {
  readonly decision: ExecCommandApprovalResponse__ReviewDecision;
};
export const ExecCommandApprovalResponse = Schema.Struct({
  decision: ExecCommandApprovalResponse__ReviewDecision,
}).annotate({ title: "ExecCommandApprovalResponse" });

export type FileChangeRequestApprovalParams = {
  readonly grantRoot?: string | null;
  readonly itemId: string;
  readonly reason?: string | null;
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const FileChangeRequestApprovalParams = Schema.Struct({
  grantRoot: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description:
          "[UNSTABLE] When set, the agent is asking the user to allow writes under this root for the remainder of the session (unclear if this is honored today).",
      }),
      Schema.Null,
    ]),
  ),
  itemId: Schema.String,
  reason: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional explanatory reason (e.g. request for extra write access).",
      }),
      Schema.Null,
    ]),
  ),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this approval request started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "FileChangeRequestApprovalParams" });

export type FileChangeRequestApprovalResponse = {
  readonly decision: FileChangeRequestApprovalResponse__FileChangeApprovalDecision;
};
export const FileChangeRequestApprovalResponse = Schema.Struct({
  decision: FileChangeRequestApprovalResponse__FileChangeApprovalDecision,
}).annotate({ title: "FileChangeRequestApprovalResponse" });

export type FuzzyFileSearchParams = {
  readonly cancellationToken?: string | null;
  readonly query: string;
  readonly roots: ReadonlyArray<string>;
};
export const FuzzyFileSearchParams = Schema.Struct({
  cancellationToken: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  query: Schema.String,
  roots: Schema.Array(Schema.String),
}).annotate({ title: "FuzzyFileSearchParams" });

export type FuzzyFileSearchResponse = {
  readonly files: ReadonlyArray<FuzzyFileSearchResponse__FuzzyFileSearchResult>;
};
export const FuzzyFileSearchResponse = Schema.Struct({
  files: Schema.Array(FuzzyFileSearchResponse__FuzzyFileSearchResult),
}).annotate({ title: "FuzzyFileSearchResponse" });

export type FuzzyFileSearchSessionCompletedNotification = { readonly sessionId: string };
export const FuzzyFileSearchSessionCompletedNotification = Schema.Struct({
  sessionId: Schema.String,
}).annotate({ title: "FuzzyFileSearchSessionCompletedNotification" });

export type FuzzyFileSearchSessionUpdatedNotification = {
  readonly files: ReadonlyArray<FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchResult>;
  readonly query: string;
  readonly sessionId: string;
};
export const FuzzyFileSearchSessionUpdatedNotification = Schema.Struct({
  files: Schema.Array(FuzzyFileSearchSessionUpdatedNotification__FuzzyFileSearchResult),
  query: Schema.String,
  sessionId: Schema.String,
}).annotate({ title: "FuzzyFileSearchSessionUpdatedNotification" });

export type GetAuthStatusParams = {
  readonly includeToken?: boolean | null;
  readonly refreshToken?: boolean | null;
};
export const GetAuthStatusParams = Schema.Struct({
  includeToken: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
  refreshToken: Schema.optionalKey(Schema.Union([Schema.Boolean, Schema.Null])),
}).annotate({ title: "GetAuthStatusParams" });

export type GetAuthStatusResponse = {
  readonly authMethod: Schema.Json | null;
  readonly authToken: string | null;
  readonly requiresOpenaiAuth: boolean | null;
};
export const GetAuthStatusResponse = Schema.Struct({
  authMethod: Schema.Union([Schema.Json.annotate({ expected: "JSON value" }), Schema.Null]),
  authToken: Schema.Union([Schema.String, Schema.Null]),
  requiresOpenaiAuth: Schema.Union([Schema.Boolean, Schema.Null]),
}).annotate({ title: "GetAuthStatusResponse" });

export type GetConversationSummaryParams =
  | { readonly rolloutPath: string }
  | { readonly conversationId: string };
export const GetConversationSummaryParams = Schema.Union(
  [Schema.Struct({ rolloutPath: Schema.String }), Schema.Struct({ conversationId: Schema.String })],
  { mode: "oneOf" },
).annotate({ title: "GetConversationSummaryParams" });

export type GetConversationSummaryResponse = { readonly summary: Schema.Json };
export const GetConversationSummaryResponse = Schema.Struct({
  summary: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({ title: "GetConversationSummaryResponse" });

export type GitDiffToRemoteParams = { readonly cwd: string };
export const GitDiffToRemoteParams = Schema.Struct({ cwd: Schema.String }).annotate({
  title: "GitDiffToRemoteParams",
});

export type GitDiffToRemoteResponse = { readonly sha: string; readonly diff: string };
export const GitDiffToRemoteResponse = Schema.Struct({
  sha: Schema.String,
  diff: Schema.String,
}).annotate({ title: "GitDiffToRemoteResponse" });

export type JSONRPCError = {
  readonly error: JSONRPCError__JSONRPCErrorError;
  readonly id: JSONRPCError__RequestId;
};
export const JSONRPCError = Schema.Struct({
  error: JSONRPCError__JSONRPCErrorError,
  id: JSONRPCError__RequestId,
}).annotate({
  title: "JSONRPCError",
  description: "A response to a request that indicates an error occurred.",
});

export type JSONRPCErrorError = {
  readonly code: number;
  readonly data?: Schema.Json;
  readonly message: string;
};
export const JSONRPCErrorError = Schema.Struct({
  code: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  data: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  message: Schema.String,
}).annotate({ title: "JSONRPCErrorError" });

export type JSONRPCMessage =
  | JSONRPCMessage__JSONRPCRequest
  | JSONRPCMessage__JSONRPCNotification
  | JSONRPCMessage__JSONRPCResponse
  | JSONRPCMessage__JSONRPCError;
export const JSONRPCMessage = Schema.Union([
  JSONRPCMessage__JSONRPCRequest,
  JSONRPCMessage__JSONRPCNotification,
  JSONRPCMessage__JSONRPCResponse,
  JSONRPCMessage__JSONRPCError,
]).annotate({
  title: "JSONRPCMessage",
  description:
    "Refers to any valid JSON-RPC object that can be decoded off the wire, or encoded to be sent.",
});

export type JSONRPCNotification = { readonly method: string; readonly params?: Schema.Json };
export const JSONRPCNotification = Schema.Struct({
  method: Schema.String,
  params: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
}).annotate({
  title: "JSONRPCNotification",
  description: "A notification which does not expect a response.",
});

export type JSONRPCRequest = {
  readonly id: JSONRPCRequest__RequestId;
  readonly method: string;
  readonly params?: Schema.Json;
  readonly trace?: JSONRPCRequest__W3cTraceContext | null;
};
export const JSONRPCRequest = Schema.Struct({
  id: JSONRPCRequest__RequestId,
  method: Schema.String,
  params: Schema.optionalKey(Schema.Json.annotate({ expected: "JSON value" })),
  trace: Schema.optionalKey(
    Schema.Union([JSONRPCRequest__W3cTraceContext, Schema.Null]).annotate({
      description: "Optional W3C Trace Context for distributed tracing.",
    }),
  ),
}).annotate({ title: "JSONRPCRequest", description: "A request that expects a response." });

export type JSONRPCResponse = {
  readonly id: JSONRPCResponse__RequestId;
  readonly result: Schema.Json;
};
export const JSONRPCResponse = Schema.Struct({
  id: JSONRPCResponse__RequestId,
  result: Schema.Json.annotate({ expected: "JSON value" }),
}).annotate({
  title: "JSONRPCResponse",
  description: "A successful (non-error) response to a request.",
});

export type McpServerElicitationRequestParams =
  | {
      readonly serverName: string;
      readonly threadId: string;
      readonly turnId?: string | null;
      readonly _meta?: Schema.Json;
      readonly message: string;
      readonly mode: "form";
      readonly requestedSchema: McpServerElicitationRequestParams__McpElicitationSchema;
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
export const McpServerElicitationRequestParams = Schema.Union(
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
      requestedSchema: McpServerElicitationRequestParams__McpElicitationSchema,
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
).annotate({ title: "McpServerElicitationRequestParams" });

export type McpServerElicitationRequestResponse = {
  readonly _meta?: Schema.Json;
  readonly action: McpServerElicitationRequestResponse__McpServerElicitationAction;
  readonly content?: Schema.Json;
};
export const McpServerElicitationRequestResponse = Schema.Struct({
  _meta: Schema.optionalKey(
    Schema.Json.annotate({
      expected: "JSON value",
      description: "Optional client metadata for form-mode action handling.",
    }),
  ),
  action: McpServerElicitationRequestResponse__McpServerElicitationAction,
  content: Schema.optionalKey(
    Schema.Json.annotate({
      expected: "JSON value",
      description:
        "Structured user input for accepted elicitations, mirroring RMCP `CreateElicitationResult`.\n\nThis is nullable because decline/cancel responses have no content.",
    }),
  ),
}).annotate({ title: "McpServerElicitationRequestResponse" });

export type PermissionsRequestApprovalParams = {
  readonly cwd: PermissionsRequestApprovalParams__LegacyAppPathString;
  readonly environmentId?: string | null;
  readonly itemId: string;
  readonly permissions: PermissionsRequestApprovalParams__RequestPermissionProfile;
  readonly reason?: string | null;
  readonly startedAtMs: number;
  readonly threadId: string;
  readonly turnId: string;
};
export const PermissionsRequestApprovalParams = Schema.Struct({
  cwd: PermissionsRequestApprovalParams__LegacyAppPathString,
  environmentId: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  itemId: Schema.String,
  permissions: PermissionsRequestApprovalParams__RequestPermissionProfile,
  reason: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  startedAtMs: Schema.Number.annotate({
    description: "Unix timestamp (in milliseconds) when this approval request started.",
    format: "int64",
  }).check(Schema.isInt().annotate({ expected: "an integer" })),
  threadId: Schema.String,
  turnId: Schema.String,
}).annotate({ title: "PermissionsRequestApprovalParams" });

export type PermissionsRequestApprovalResponse = {
  readonly permissions: PermissionsRequestApprovalResponse__GrantedPermissionProfile;
  readonly scope?: PermissionsRequestApprovalResponse__PermissionGrantScope;
  readonly strictAutoReview?: boolean | null;
};
export const PermissionsRequestApprovalResponse = Schema.Struct({
  permissions: PermissionsRequestApprovalResponse__GrantedPermissionProfile,
  scope: Schema.optionalKey(
    Schema.suspend(
      (): Schema.Codec<PermissionsRequestApprovalResponse__PermissionGrantScope> =>
        PermissionsRequestApprovalResponse__PermissionGrantScope,
    ).annotate({ default: "turn" }),
  ),
  strictAutoReview: Schema.optionalKey(
    Schema.Union([
      Schema.Boolean.annotate({
        description:
          "Review every subsequent command in this turn before normal sandboxed execution.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ title: "PermissionsRequestApprovalResponse" });

export type RequestId = string | number;
export const RequestId = Schema.Union([
  Schema.String,
  Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
]).annotate({ title: "RequestId" });
