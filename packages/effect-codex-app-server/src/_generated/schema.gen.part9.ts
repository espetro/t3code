import * as Schema from "effect/Schema";
import {
  V2PluginReadResponse__AbsolutePathBuf,
} from "./schema.gen.part2.ts";
import {
  V2PluginReadResponse__PluginSharePrincipalRole,
  V2PluginReadResponse__PluginSharePrincipalType,
  V2PluginReadResponse__ScheduledTaskWeekday,
  V2PluginShareListResponse__AbsolutePathBuf,
  V2PluginShareListResponse__PluginSharePrincipalRole,
  V2PluginShareListResponse__PluginSharePrincipalType,
  V2PluginShareSaveParams__PluginSharePrincipalType,
  V2PluginShareSaveParams__PluginShareTargetRole,
  V2PluginShareUpdateTargetsParams__PluginSharePrincipalType,
  V2PluginShareUpdateTargetsParams__PluginShareTargetRole,
  V2PluginShareUpdateTargetsResponse__PluginSharePrincipalRole,
  V2PluginShareUpdateTargetsResponse__PluginSharePrincipalType,
  V2RawResponseItemCompletedNotification__ImageDetail,
  V2RawResponseItemCompletedNotification__ReasoningEffort,
  V2ReviewStartResponse__ByteRange,
  V2ReviewStartResponse__CollabAgentStatus,
  V2ReviewStartResponse__ImageDetail,
  V2ReviewStartResponse__LegacyAppPathString,
  V2ReviewStartResponse__McpAppDisplayMode,
  V2ReviewStartResponse__MemoryCitationEntry,
  V2ReviewStartResponse__MisalignmentSteer,
  V2ReviewStartResponse__NonSteerableTurnKind,
  V2ReviewStartResponse__PatchChangeKind,
  V2SkillsListResponse__AbsolutePathBuf,
  V2SkillsListResponse__SkillToolDependency,
  V2ThreadForkResponse__AbsolutePathBuf,
  V2ThreadForkResponse__AgentPath,
  V2ThreadForkResponse__ByteRange,
  V2ThreadForkResponse__CollabAgentStatus,
  V2ThreadForkResponse__ImageDetail,
  V2ThreadForkResponse__LegacyAppPathString,
  V2ThreadForkResponse__McpAppDisplayMode,
  V2ThreadForkResponse__MemoryCitationEntry,
  V2ThreadForkResponse__MisalignmentSteer,
  V2ThreadForkResponse__NetworkAccess,
  V2ThreadForkResponse__NonSteerableTurnKind,
  V2ThreadForkResponse__PatchChangeKind,
  V2ThreadForkResponse__ThreadActiveFlag,
  V2ThreadForkResponse__ThreadId,
  V2ThreadForkResponse__ThreadSectionAppearance,
  V2ThreadGoalGetResponse__ThreadGoalStatus,
  V2ThreadGoalSetResponse__ThreadGoalStatus,
  V2ThreadGoalUpdatedNotification__ThreadGoalStatus,
  V2ThreadItemsListParams__ThreadItemsListAnchor,
  V2ThreadItemsListResponse__ByteRange,
  V2ThreadItemsListResponse__CollabAgentStatus,
  V2ThreadItemsListResponse__ImageDetail,
  V2ThreadItemsListResponse__LegacyAppPathString,
  V2ThreadItemsListResponse__McpAppDisplayMode,
  V2ThreadItemsListResponse__MemoryCitationEntry,
  V2ThreadItemsListResponse__PatchChangeKind,
  V2ThreadListResponse__AgentPath,
  V2ThreadListResponse__ByteRange,
  V2ThreadListResponse__ImageDetail,
  V2ThreadListResponse__LegacyAppPathString,
  V2ThreadListResponse__McpAppDisplayMode,
  V2ThreadListResponse__MemoryCitationEntry,
  V2ThreadListResponse__MisalignmentSteer,
  V2ThreadListResponse__NonSteerableTurnKind,
  V2ThreadListResponse__PatchChangeKind,
  V2ThreadListResponse__ThreadActiveFlag,
  V2ThreadListResponse__ThreadId,
  V2ThreadListResponse__ThreadSectionAppearance,
} from "./schema.gen.part3.ts";
import {
  V2ThreadListResponse__CollabAgentStatus,
  V2ThreadMetadataUpdateResponse__AgentPath,
  V2ThreadMetadataUpdateResponse__ByteRange,
  V2ThreadMetadataUpdateResponse__CollabAgentStatus,
  V2ThreadMetadataUpdateResponse__ImageDetail,
  V2ThreadMetadataUpdateResponse__LegacyAppPathString,
  V2ThreadMetadataUpdateResponse__McpAppDisplayMode,
  V2ThreadMetadataUpdateResponse__MemoryCitationEntry,
  V2ThreadMetadataUpdateResponse__MisalignmentSteer,
  V2ThreadMetadataUpdateResponse__NonSteerableTurnKind,
  V2ThreadMetadataUpdateResponse__PatchChangeKind,
  V2ThreadMetadataUpdateResponse__ThreadActiveFlag,
  V2ThreadMetadataUpdateResponse__ThreadId,
  V2ThreadMetadataUpdateResponse__ThreadSectionAppearance,
  V2ThreadReadResponse__AgentPath,
  V2ThreadReadResponse__ThreadActiveFlag,
  V2ThreadReadResponse__ThreadId,
  V2ThreadReadResponse__ThreadSectionAppearance,
} from "./schema.gen.part4.ts";

export type V2PluginReadResponse__PluginInterface = {
  readonly brandColor?: string | null;
  readonly capabilities: ReadonlyArray<string>;
  readonly category?: string | null;
  readonly composerIcon?: V2PluginReadResponse__AbsolutePathBuf | null;
  readonly composerIconUrl?: string | null;
  readonly defaultPrompt?: ReadonlyArray<string> | null;
  readonly developerName?: string | null;
  readonly displayName?: string | null;
  readonly logo?: V2PluginReadResponse__AbsolutePathBuf | null;
  readonly logoDark?: V2PluginReadResponse__AbsolutePathBuf | null;
  readonly logoUrl?: string | null;
  readonly logoUrlDark?: string | null;
  readonly longDescription?: string | null;
  readonly privacyPolicyUrl?: string | null;
  readonly screenshotUrls: ReadonlyArray<string>;
  readonly screenshots: ReadonlyArray<V2PluginReadResponse__AbsolutePathBuf>;
  readonly shortDescription?: string | null;
  readonly termsOfServiceUrl?: string | null;
  readonly websiteUrl?: string | null;
};
export const V2PluginReadResponse__PluginInterface = Schema.Struct({
  brandColor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  capabilities: Schema.Array(Schema.String),
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  composerIcon: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local composer icon path, resolved from the installed plugin package.",
    }),
  ),
  composerIconUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote composer icon URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  defaultPrompt: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Starter prompts for the plugin. Capped at 3 entries with a maximum of 128 characters per entry.",
      }),
      Schema.Null,
    ]),
  ),
  developerName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logo: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local logo path, resolved from the installed plugin package.",
    }),
  ),
  logoDark: Schema.optionalKey(
    Schema.Union([V2PluginReadResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local dark-mode logo path, resolved from the installed plugin package.",
    }),
  ),
  logoUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote logo URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  logoUrlDark: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote dark-mode logo URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  longDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  privacyPolicyUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  screenshotUrls: Schema.Array(Schema.String).annotate({
    description: "Remote screenshot URLs from the plugin catalog.",
  }),
  screenshots: Schema.Array(V2PluginReadResponse__AbsolutePathBuf).annotate({
    description: "Local screenshot paths, resolved from the installed plugin package.",
  }),
  shortDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  termsOfServiceUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  websiteUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginReadResponse__PluginInterface" });

export type V2PluginReadResponse__PluginSource =
  | { readonly path: V2PluginReadResponse__AbsolutePathBuf; readonly type: "local" }
  | {
      readonly path?: string | null;
      readonly refName?: string | null;
      readonly sha?: string | null;
      readonly type: "git";
      readonly url: string;
    }
  | {
      readonly package: string;
      readonly registry?: string | null;
      readonly type: "npm";
      readonly version?: string | null;
    }
  | { readonly type: "remote" };
export const V2PluginReadResponse__PluginSource = Schema.Union(
  [
    Schema.Struct({
      path: V2PluginReadResponse__AbsolutePathBuf,
      type: Schema.Literal("local").annotate({ title: "LocalPluginSourceType" }),
    }).annotate({ title: "LocalPluginSource" }),
    Schema.Struct({
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      refName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("git").annotate({ title: "GitPluginSourceType" }),
      url: Schema.String,
    }).annotate({ title: "GitPluginSource" }),
    Schema.Struct({
      package: Schema.String,
      registry: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Optional HTTPS registry URL. Authentication stays in the user's npm config.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("npm").annotate({ title: "NpmPluginSourceType" }),
      version: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Optional npm version or version range." }),
          Schema.Null,
        ]),
      ),
    }).annotate({ title: "NpmPluginSource" }),
    Schema.Struct({
      type: Schema.Literal("remote").annotate({ title: "RemotePluginSourceType" }),
    }).annotate({
      title: "RemotePluginSource",
      description:
        "The plugin is available in the remote catalog. Download metadata is kept server-side and is not exposed through the app-server API.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginReadResponse__PluginSource" });

export type V2PluginReadResponse__ScheduledTaskSchedule =
  | {
      readonly days?: ReadonlyArray<V2PluginReadResponse__ScheduledTaskWeekday> | null;
      readonly intervalHours: number;
      readonly type: "hourly";
    }
  | { readonly time: string; readonly type: "daily" }
  | { readonly time: string; readonly type: "weekdays" }
  | {
      readonly days: ReadonlyArray<V2PluginReadResponse__ScheduledTaskWeekday>;
      readonly time: string;
      readonly type: "weekly";
    };
export const V2PluginReadResponse__ScheduledTaskSchedule = Schema.Union(
  [
    Schema.Struct({
      days: Schema.optionalKey(
        Schema.Union([Schema.Array(V2PluginReadResponse__ScheduledTaskWeekday), Schema.Null]),
      ),
      intervalHours: Schema.Number.annotate({ format: "uint32" })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
      type: Schema.Literal("hourly").annotate({ title: "HourlyScheduledTaskScheduleType" }),
    }).annotate({ title: "HourlyScheduledTaskSchedule" }),
    Schema.Struct({
      time: Schema.String,
      type: Schema.Literal("daily").annotate({ title: "DailyScheduledTaskScheduleType" }),
    }).annotate({ title: "DailyScheduledTaskSchedule" }),
    Schema.Struct({
      time: Schema.String,
      type: Schema.Literal("weekdays").annotate({ title: "WeekdaysScheduledTaskScheduleType" }),
    }).annotate({ title: "WeekdaysScheduledTaskSchedule" }),
    Schema.Struct({
      days: Schema.Array(V2PluginReadResponse__ScheduledTaskWeekday),
      time: Schema.String,
      type: Schema.Literal("weekly").annotate({ title: "WeeklyScheduledTaskScheduleType" }),
    }).annotate({ title: "WeeklyScheduledTaskSchedule" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginReadResponse__ScheduledTaskSchedule" });

export type V2PluginReadResponse__PluginSharePrincipal = {
  readonly name: string;
  readonly principalId: string;
  readonly principalType: V2PluginReadResponse__PluginSharePrincipalType;
  readonly role: V2PluginReadResponse__PluginSharePrincipalRole;
};
export const V2PluginReadResponse__PluginSharePrincipal = Schema.Struct({
  name: Schema.String,
  principalId: Schema.String,
  principalType: V2PluginReadResponse__PluginSharePrincipalType,
  role: V2PluginReadResponse__PluginSharePrincipalRole,
}).annotate({ identifier: "V2PluginReadResponse__PluginSharePrincipal" });

export type V2PluginShareListResponse__PluginInterface = {
  readonly brandColor?: string | null;
  readonly capabilities: ReadonlyArray<string>;
  readonly category?: string | null;
  readonly composerIcon?: V2PluginShareListResponse__AbsolutePathBuf | null;
  readonly composerIconUrl?: string | null;
  readonly defaultPrompt?: ReadonlyArray<string> | null;
  readonly developerName?: string | null;
  readonly displayName?: string | null;
  readonly logo?: V2PluginShareListResponse__AbsolutePathBuf | null;
  readonly logoDark?: V2PluginShareListResponse__AbsolutePathBuf | null;
  readonly logoUrl?: string | null;
  readonly logoUrlDark?: string | null;
  readonly longDescription?: string | null;
  readonly privacyPolicyUrl?: string | null;
  readonly screenshotUrls: ReadonlyArray<string>;
  readonly screenshots: ReadonlyArray<V2PluginShareListResponse__AbsolutePathBuf>;
  readonly shortDescription?: string | null;
  readonly termsOfServiceUrl?: string | null;
  readonly websiteUrl?: string | null;
};
export const V2PluginShareListResponse__PluginInterface = Schema.Struct({
  brandColor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  capabilities: Schema.Array(Schema.String),
  category: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  composerIcon: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local composer icon path, resolved from the installed plugin package.",
    }),
  ),
  composerIconUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote composer icon URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  defaultPrompt: Schema.optionalKey(
    Schema.Union([
      Schema.Array(Schema.String).annotate({
        description:
          "Starter prompts for the plugin. Capped at 3 entries with a maximum of 128 characters per entry.",
      }),
      Schema.Null,
    ]),
  ),
  developerName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  logo: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local logo path, resolved from the installed plugin package.",
    }),
  ),
  logoDark: Schema.optionalKey(
    Schema.Union([V2PluginShareListResponse__AbsolutePathBuf, Schema.Null]).annotate({
      description: "Local dark-mode logo path, resolved from the installed plugin package.",
    }),
  ),
  logoUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote logo URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  logoUrlDark: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote dark-mode logo URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  longDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  privacyPolicyUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  screenshotUrls: Schema.Array(Schema.String).annotate({
    description: "Remote screenshot URLs from the plugin catalog.",
  }),
  screenshots: Schema.Array(V2PluginShareListResponse__AbsolutePathBuf).annotate({
    description: "Local screenshot paths, resolved from the installed plugin package.",
  }),
  shortDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  termsOfServiceUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  websiteUrl: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2PluginShareListResponse__PluginInterface" });

export type V2PluginShareListResponse__PluginSource =
  | { readonly path: V2PluginShareListResponse__AbsolutePathBuf; readonly type: "local" }
  | {
      readonly path?: string | null;
      readonly refName?: string | null;
      readonly sha?: string | null;
      readonly type: "git";
      readonly url: string;
    }
  | {
      readonly package: string;
      readonly registry?: string | null;
      readonly type: "npm";
      readonly version?: string | null;
    }
  | { readonly type: "remote" };
export const V2PluginShareListResponse__PluginSource = Schema.Union(
  [
    Schema.Struct({
      path: V2PluginShareListResponse__AbsolutePathBuf,
      type: Schema.Literal("local").annotate({ title: "LocalPluginSourceType" }),
    }).annotate({ title: "LocalPluginSource" }),
    Schema.Struct({
      path: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      refName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      sha: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
      type: Schema.Literal("git").annotate({ title: "GitPluginSourceType" }),
      url: Schema.String,
    }).annotate({ title: "GitPluginSource" }),
    Schema.Struct({
      package: Schema.String,
      registry: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Optional HTTPS registry URL. Authentication stays in the user's npm config.",
          }),
          Schema.Null,
        ]),
      ),
      type: Schema.Literal("npm").annotate({ title: "NpmPluginSourceType" }),
      version: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Optional npm version or version range." }),
          Schema.Null,
        ]),
      ),
    }).annotate({ title: "NpmPluginSource" }),
    Schema.Struct({
      type: Schema.Literal("remote").annotate({ title: "RemotePluginSourceType" }),
    }).annotate({
      title: "RemotePluginSource",
      description:
        "The plugin is available in the remote catalog. Download metadata is kept server-side and is not exposed through the app-server API.",
    }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2PluginShareListResponse__PluginSource" });

export type V2PluginShareListResponse__PluginSharePrincipal = {
  readonly name: string;
  readonly principalId: string;
  readonly principalType: V2PluginShareListResponse__PluginSharePrincipalType;
  readonly role: V2PluginShareListResponse__PluginSharePrincipalRole;
};
export const V2PluginShareListResponse__PluginSharePrincipal = Schema.Struct({
  name: Schema.String,
  principalId: Schema.String,
  principalType: V2PluginShareListResponse__PluginSharePrincipalType,
  role: V2PluginShareListResponse__PluginSharePrincipalRole,
}).annotate({ identifier: "V2PluginShareListResponse__PluginSharePrincipal" });

export type V2PluginShareSaveParams__PluginShareTarget = {
  readonly principalId: string;
  readonly principalType: V2PluginShareSaveParams__PluginSharePrincipalType;
  readonly role: V2PluginShareSaveParams__PluginShareTargetRole;
};
export const V2PluginShareSaveParams__PluginShareTarget = Schema.Struct({
  principalId: Schema.String,
  principalType: V2PluginShareSaveParams__PluginSharePrincipalType,
  role: V2PluginShareSaveParams__PluginShareTargetRole,
}).annotate({ identifier: "V2PluginShareSaveParams__PluginShareTarget" });

export type V2PluginShareUpdateTargetsParams__PluginShareTarget = {
  readonly principalId: string;
  readonly principalType: V2PluginShareUpdateTargetsParams__PluginSharePrincipalType;
  readonly role: V2PluginShareUpdateTargetsParams__PluginShareTargetRole;
};
export const V2PluginShareUpdateTargetsParams__PluginShareTarget = Schema.Struct({
  principalId: Schema.String,
  principalType: V2PluginShareUpdateTargetsParams__PluginSharePrincipalType,
  role: V2PluginShareUpdateTargetsParams__PluginShareTargetRole,
}).annotate({ identifier: "V2PluginShareUpdateTargetsParams__PluginShareTarget" });

export type V2PluginShareUpdateTargetsResponse__PluginSharePrincipal = {
  readonly name: string;
  readonly principalId: string;
  readonly principalType: V2PluginShareUpdateTargetsResponse__PluginSharePrincipalType;
  readonly role: V2PluginShareUpdateTargetsResponse__PluginSharePrincipalRole;
};
export const V2PluginShareUpdateTargetsResponse__PluginSharePrincipal = Schema.Struct({
  name: Schema.String,
  principalId: Schema.String,
  principalType: V2PluginShareUpdateTargetsResponse__PluginSharePrincipalType,
  role: V2PluginShareUpdateTargetsResponse__PluginSharePrincipalRole,
}).annotate({ identifier: "V2PluginShareUpdateTargetsResponse__PluginSharePrincipal" });

export type V2RawResponseItemCompletedNotification__ContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2RawResponseItemCompletedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2RawResponseItemCompletedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly text: string; readonly type: "output_text" };
export const V2RawResponseItemCompletedNotification__ContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({ title: "InputTextContentItemType" }),
    }).annotate({ title: "InputTextContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2RawResponseItemCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({ title: "InputImageContentItemType" }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2RawResponseItemCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({ title: "InputImageContentItemType" }),
        file_id: Schema.String,
      }).annotate({ title: "FileIdContentItem" }),
    ]).annotate({ title: "InputImageContentItem" }),
    Schema.Struct({
      audio_url: Schema.String,
      type: Schema.Literal("input_audio").annotate({ title: "InputAudioContentItemType" }),
    }).annotate({ title: "InputAudioContentItem" }),
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("output_text").annotate({ title: "OutputTextContentItemType" }),
    }).annotate({ title: "OutputTextContentItem" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2RawResponseItemCompletedNotification__ContentItem" });

export type V2RawResponseItemCompletedNotification__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2RawResponseItemCompletedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2RawResponseItemCompletedNotification__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2RawResponseItemCompletedNotification__FunctionCallOutputContentItem = Schema.Union(
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
          Schema.Union([V2RawResponseItemCompletedNotification__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2RawResponseItemCompletedNotification__ImageDetail, Schema.Null]),
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
  identifier: "V2RawResponseItemCompletedNotification__FunctionCallOutputContentItem",
});

export type V2RawResponseItemCompletedNotification__ConfigurationReasoning = {
  readonly effort: V2RawResponseItemCompletedNotification__ReasoningEffort;
};
export const V2RawResponseItemCompletedNotification__ConfigurationReasoning = Schema.Struct({
  effort: V2RawResponseItemCompletedNotification__ReasoningEffort,
}).annotate({
  description: "Reasoning settings interpreted by the backend for the routed model.",
  identifier: "V2RawResponseItemCompletedNotification__ConfigurationReasoning",
});

export type V2ReviewStartResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ReviewStartResponse__NonSteerableTurnKind;
      };
    };
export const V2ReviewStartResponse__CodexErrorInfo = Schema.Union(
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
        turnKind: V2ReviewStartResponse__NonSteerableTurnKind,
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
  identifier: "V2ReviewStartResponse__CodexErrorInfo",
});

export type V2ReviewStartResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ReviewStartResponse__MisalignmentSteer | null;
};
export const V2ReviewStartResponse__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2ReviewStartResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ReviewStartResponse__MisalignmentErrorDetails" });

export type V2ReviewStartResponse__TextElement = {
  readonly byteRange: V2ReviewStartResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ReviewStartResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ReviewStartResponse__ByteRange> => V2ReviewStartResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ReviewStartResponse__TextElement" });

export type V2ReviewStartResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ReviewStartResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ReviewStartResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ReviewStartResponse__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ReviewStartResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ReviewStartResponse__ImageDetail, Schema.Null])),
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
  identifier: "V2ReviewStartResponse__FunctionCallOutputContentItem",
});

export type V2ReviewStartResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ReviewStartResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ReviewStartResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ReviewStartResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ReviewStartResponse__MemoryCitation" });

export type V2ReviewStartResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ReviewStartResponse__LegacyAppPathString;
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
export const V2ReviewStartResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ReviewStartResponse__LegacyAppPathString,
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
).annotate({ identifier: "V2ReviewStartResponse__CommandAction" });

export type V2ReviewStartResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ReviewStartResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ReviewStartResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ReviewStartResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ReviewStartResponse__FileUpdateChange" });

export type V2ReviewStartResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ReviewStartResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ReviewStartResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ReviewStartResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ReviewStartResponse__McpAppUi",
});

export type V2ReviewStartResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ReviewStartResponse__CollabAgentStatus;
};
export const V2ReviewStartResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ReviewStartResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ReviewStartResponse__CollabAgentState" });

export type V2SkillsListResponse__SkillDependencies = {
  readonly tools: ReadonlyArray<V2SkillsListResponse__SkillToolDependency>;
};
export const V2SkillsListResponse__SkillDependencies = Schema.Struct({
  tools: Schema.Array(V2SkillsListResponse__SkillToolDependency),
}).annotate({ identifier: "V2SkillsListResponse__SkillDependencies" });

export type V2SkillsListResponse__SkillInterface = {
  readonly brandColor?: string | null;
  readonly defaultPrompt?: string | null;
  readonly displayName?: string | null;
  readonly iconLarge?: V2SkillsListResponse__AbsolutePathBuf | null;
  readonly iconLargeUrl?: string | null;
  readonly iconSmall?: V2SkillsListResponse__AbsolutePathBuf | null;
  readonly iconSmallUrl?: string | null;
  readonly shortDescription?: string | null;
};
export const V2SkillsListResponse__SkillInterface = Schema.Struct({
  brandColor: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  defaultPrompt: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  displayName: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  iconLarge: Schema.optionalKey(Schema.Union([V2SkillsListResponse__AbsolutePathBuf, Schema.Null])),
  iconLargeUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote large icon URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  iconSmall: Schema.optionalKey(Schema.Union([V2SkillsListResponse__AbsolutePathBuf, Schema.Null])),
  iconSmallUrl: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({ description: "Remote small icon URL from the plugin catalog." }),
      Schema.Null,
    ]),
  ),
  shortDescription: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
}).annotate({ identifier: "V2SkillsListResponse__SkillInterface" });

export type V2ThreadForkResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadForkResponse__LegacyAppPathString;
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
export const V2ThreadForkResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadForkResponse__LegacyAppPathString,
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
).annotate({ identifier: "V2ThreadForkResponse__CommandAction" });

export type V2ThreadForkResponse__SandboxPolicy =
  | { readonly type: "dangerFullAccess" }
  | { readonly networkAccess?: boolean; readonly type: "readOnly" }
  | {
      readonly networkAccess?: V2ThreadForkResponse__NetworkAccess;
      readonly type: "externalSandbox";
    }
  | {
      readonly excludeSlashTmp?: boolean;
      readonly excludeTmpdirEnvVar?: boolean;
      readonly networkAccess?: boolean;
      readonly type: "workspaceWrite";
      readonly writableRoots?: ReadonlyArray<V2ThreadForkResponse__AbsolutePathBuf>;
    };
export const V2ThreadForkResponse__SandboxPolicy = Schema.Union(
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
          (): Schema.Codec<V2ThreadForkResponse__NetworkAccess> =>
            V2ThreadForkResponse__NetworkAccess,
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
        Schema.Array(V2ThreadForkResponse__AbsolutePathBuf).annotate({ default: [] }),
      ),
    }).annotate({ title: "WorkspaceWriteSandboxPolicy" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadForkResponse__SandboxPolicy" });

export type V2ThreadForkResponse__ThreadSection = {
  readonly appearance?: V2ThreadForkResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadForkResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadForkResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadForkResponse__ThreadSection",
});

export type V2ThreadForkResponse__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadForkResponse__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadForkResponse__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadForkResponse__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadForkResponse__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadForkResponse__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadForkResponse__SubAgentSource" });

export type V2ThreadForkResponse__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadForkResponse__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadForkResponse__ThreadStatus = Schema.Union(
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
      activeFlags: Schema.Array(V2ThreadForkResponse__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadForkResponse__ThreadStatus" });

export type V2ThreadForkResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadForkResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadForkResponse__CodexErrorInfo = Schema.Union(
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
        turnKind: V2ThreadForkResponse__NonSteerableTurnKind,
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
  identifier: "V2ThreadForkResponse__CodexErrorInfo",
});

export type V2ThreadForkResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadForkResponse__MisalignmentSteer | null;
};
export const V2ThreadForkResponse__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2ThreadForkResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadForkResponse__MisalignmentErrorDetails" });

export type V2ThreadForkResponse__TextElement = {
  readonly byteRange: V2ThreadForkResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadForkResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadForkResponse__ByteRange> => V2ThreadForkResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadForkResponse__TextElement" });

export type V2ThreadForkResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadForkResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadForkResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadForkResponse__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadForkResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadForkResponse__ImageDetail, Schema.Null])),
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
  identifier: "V2ThreadForkResponse__FunctionCallOutputContentItem",
});

export type V2ThreadForkResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadForkResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadForkResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadForkResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadForkResponse__MemoryCitation" });

export type V2ThreadForkResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadForkResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadForkResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadForkResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadForkResponse__FileUpdateChange" });

export type V2ThreadForkResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadForkResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadForkResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadForkResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadForkResponse__McpAppUi",
});

export type V2ThreadForkResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadForkResponse__CollabAgentStatus;
};
export const V2ThreadForkResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadForkResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadForkResponse__CollabAgentState" });

export type V2ThreadGoalGetResponse__ThreadGoal = {
  readonly createdAt: number;
  readonly objective: string;
  readonly status: V2ThreadGoalGetResponse__ThreadGoalStatus;
  readonly threadId: string;
  readonly timeUsedSeconds: number;
  readonly tokenBudget?: number | null;
  readonly tokensUsed: number;
  readonly updatedAt: number;
};
export const V2ThreadGoalGetResponse__ThreadGoal = Schema.Struct({
  createdAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  objective: Schema.String,
  status: V2ThreadGoalGetResponse__ThreadGoalStatus,
  threadId: Schema.String,
  timeUsedSeconds: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  tokenBudget: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  tokensUsed: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  updatedAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
}).annotate({ identifier: "V2ThreadGoalGetResponse__ThreadGoal" });

export type V2ThreadGoalSetResponse__ThreadGoal = {
  readonly createdAt: number;
  readonly objective: string;
  readonly status: V2ThreadGoalSetResponse__ThreadGoalStatus;
  readonly threadId: string;
  readonly timeUsedSeconds: number;
  readonly tokenBudget?: number | null;
  readonly tokensUsed: number;
  readonly updatedAt: number;
};
export const V2ThreadGoalSetResponse__ThreadGoal = Schema.Struct({
  createdAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  objective: Schema.String,
  status: V2ThreadGoalSetResponse__ThreadGoalStatus,
  threadId: Schema.String,
  timeUsedSeconds: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  tokenBudget: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  tokensUsed: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  updatedAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
}).annotate({ identifier: "V2ThreadGoalSetResponse__ThreadGoal" });

export type V2ThreadGoalUpdatedNotification__ThreadGoal = {
  readonly createdAt: number;
  readonly objective: string;
  readonly status: V2ThreadGoalUpdatedNotification__ThreadGoalStatus;
  readonly threadId: string;
  readonly timeUsedSeconds: number;
  readonly tokenBudget?: number | null;
  readonly tokensUsed: number;
  readonly updatedAt: number;
};
export const V2ThreadGoalUpdatedNotification__ThreadGoal = Schema.Struct({
  createdAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  objective: Schema.String,
  status: V2ThreadGoalUpdatedNotification__ThreadGoalStatus,
  threadId: Schema.String,
  timeUsedSeconds: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  tokenBudget: Schema.optionalKey(
    Schema.Union([
      Schema.Number.annotate({ format: "int64" }).check(
        Schema.isInt().annotate({ expected: "an integer" }),
      ),
      Schema.Null,
    ]),
  ),
  tokensUsed: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
  updatedAt: Schema.Number.annotate({ format: "int64" }).check(
    Schema.isInt().annotate({ expected: "an integer" }),
  ),
}).annotate({ identifier: "V2ThreadGoalUpdatedNotification__ThreadGoal" });

export type V2ThreadItemsListParams__ThreadItemsListCursor =
  | string
  | V2ThreadItemsListParams__ThreadItemsListAnchor;
export const V2ThreadItemsListParams__ThreadItemsListCursor = Schema.Union([
  Schema.String,
  V2ThreadItemsListParams__ThreadItemsListAnchor,
]).annotate({
  description: "Starting position for an item-history page.",
  identifier: "V2ThreadItemsListParams__ThreadItemsListCursor",
});

export type V2ThreadItemsListResponse__TextElement = {
  readonly byteRange: V2ThreadItemsListResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadItemsListResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadItemsListResponse__ByteRange> => V2ThreadItemsListResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadItemsListResponse__TextElement" });

export type V2ThreadItemsListResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadItemsListResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadItemsListResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadItemsListResponse__FunctionCallOutputContentItem = Schema.Union(
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
          Schema.Union([V2ThreadItemsListResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadItemsListResponse__ImageDetail, Schema.Null]),
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
  identifier: "V2ThreadItemsListResponse__FunctionCallOutputContentItem",
});

export type V2ThreadItemsListResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadItemsListResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadItemsListResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadItemsListResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadItemsListResponse__MemoryCitation" });

export type V2ThreadItemsListResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadItemsListResponse__LegacyAppPathString;
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
export const V2ThreadItemsListResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadItemsListResponse__LegacyAppPathString,
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
).annotate({ identifier: "V2ThreadItemsListResponse__CommandAction" });

export type V2ThreadItemsListResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadItemsListResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadItemsListResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadItemsListResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadItemsListResponse__FileUpdateChange" });

export type V2ThreadItemsListResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadItemsListResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadItemsListResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadItemsListResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadItemsListResponse__McpAppUi",
});

export type V2ThreadItemsListResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadItemsListResponse__CollabAgentStatus;
};
export const V2ThreadItemsListResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadItemsListResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadItemsListResponse__CollabAgentState" });

export type V2ThreadListResponse__ThreadSection = {
  readonly appearance?: V2ThreadListResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadListResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadListResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadListResponse__ThreadSection",
});

export type V2ThreadListResponse__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadListResponse__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadListResponse__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadListResponse__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadListResponse__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadListResponse__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadListResponse__SubAgentSource" });

export type V2ThreadListResponse__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadListResponse__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadListResponse__ThreadStatus = Schema.Union(
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
      activeFlags: Schema.Array(V2ThreadListResponse__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadListResponse__ThreadStatus" });

export type V2ThreadListResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadListResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadListResponse__CodexErrorInfo = Schema.Union(
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
        turnKind: V2ThreadListResponse__NonSteerableTurnKind,
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
  identifier: "V2ThreadListResponse__CodexErrorInfo",
});

export type V2ThreadListResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadListResponse__MisalignmentSteer | null;
};
export const V2ThreadListResponse__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2ThreadListResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadListResponse__MisalignmentErrorDetails" });

export type V2ThreadListResponse__TextElement = {
  readonly byteRange: V2ThreadListResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadListResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadListResponse__ByteRange> => V2ThreadListResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadListResponse__TextElement" });

export type V2ThreadListResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadListResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadListResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadListResponse__FunctionCallOutputContentItem = Schema.Union(
  [
    Schema.Struct({
      text: Schema.String,
      type: Schema.Literal("input_text").annotate({
        title: "InputTextFunctionCallOutputContentItemType",
      }),
    }).annotate({ title: "InputTextFunctionCallOutputContentItem" }),
    Schema.Union([
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadListResponse__ImageDetail, Schema.Null])),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(Schema.Union([V2ThreadListResponse__ImageDetail, Schema.Null])),
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
  identifier: "V2ThreadListResponse__FunctionCallOutputContentItem",
});

export type V2ThreadListResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadListResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadListResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadListResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadListResponse__MemoryCitation" });

export type V2ThreadListResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadListResponse__LegacyAppPathString;
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
export const V2ThreadListResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadListResponse__LegacyAppPathString,
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
).annotate({ identifier: "V2ThreadListResponse__CommandAction" });

export type V2ThreadListResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadListResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadListResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadListResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadListResponse__FileUpdateChange" });

export type V2ThreadListResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadListResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadListResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadListResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadListResponse__McpAppUi",
});

export type V2ThreadListResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadListResponse__CollabAgentStatus;
};
export const V2ThreadListResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadListResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadListResponse__CollabAgentState" });

export type V2ThreadMetadataUpdateResponse__ThreadSection = {
  readonly appearance?: V2ThreadMetadataUpdateResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadMetadataUpdateResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadMetadataUpdateResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadMetadataUpdateResponse__ThreadSection",
});

export type V2ThreadMetadataUpdateResponse__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadMetadataUpdateResponse__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadMetadataUpdateResponse__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadMetadataUpdateResponse__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadMetadataUpdateResponse__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadMetadataUpdateResponse__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__SubAgentSource" });

export type V2ThreadMetadataUpdateResponse__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadMetadataUpdateResponse__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadMetadataUpdateResponse__ThreadStatus = Schema.Union(
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
      activeFlags: Schema.Array(V2ThreadMetadataUpdateResponse__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__ThreadStatus" });

export type V2ThreadMetadataUpdateResponse__CodexErrorInfo =
  | string
  | { readonly httpConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamConnectionFailed: { readonly httpStatusCode?: number | null } }
  | { readonly responseStreamDisconnected: { readonly httpStatusCode?: number | null } }
  | { readonly responseTooManyFailedAttempts: { readonly httpStatusCode?: number | null } }
  | {
      readonly activeTurnNotSteerable: {
        readonly turnKind: V2ThreadMetadataUpdateResponse__NonSteerableTurnKind;
      };
    };
export const V2ThreadMetadataUpdateResponse__CodexErrorInfo = Schema.Union(
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
        turnKind: V2ThreadMetadataUpdateResponse__NonSteerableTurnKind,
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
  identifier: "V2ThreadMetadataUpdateResponse__CodexErrorInfo",
});

export type V2ThreadMetadataUpdateResponse__MisalignmentErrorDetails = {
  readonly detailedExplanation?: string | null;
  readonly errorType?: string | null;
  readonly steer?: V2ThreadMetadataUpdateResponse__MisalignmentSteer | null;
};
export const V2ThreadMetadataUpdateResponse__MisalignmentErrorDetails = Schema.Struct({
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
    Schema.Union([V2ThreadMetadataUpdateResponse__MisalignmentSteer, Schema.Null]).annotate({
      description:
        "Instruction to submit as the next turn's user input if continuation is confirmed.",
    }),
  ),
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__MisalignmentErrorDetails" });

export type V2ThreadMetadataUpdateResponse__TextElement = {
  readonly byteRange: V2ThreadMetadataUpdateResponse__ByteRange;
  readonly placeholder?: string | null;
};
export const V2ThreadMetadataUpdateResponse__TextElement = Schema.Struct({
  byteRange: Schema.suspend(
    (): Schema.Codec<V2ThreadMetadataUpdateResponse__ByteRange> =>
      V2ThreadMetadataUpdateResponse__ByteRange,
  ).annotate({ description: "Byte range in the parent `text` buffer that this element occupies." }),
  placeholder: Schema.optionalKey(
    Schema.Union([
      Schema.String.annotate({
        description: "Optional human-readable placeholder for the element, displayed in the UI.",
      }),
      Schema.Null,
    ]),
  ),
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__TextElement" });

export type V2ThreadMetadataUpdateResponse__FunctionCallOutputContentItem =
  | { readonly text: string; readonly type: "input_text" }
  | {
      readonly detail?: V2ThreadMetadataUpdateResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly image_url: string;
    }
  | {
      readonly detail?: V2ThreadMetadataUpdateResponse__ImageDetail | null;
      readonly type: "input_image";
      readonly file_id: string;
    }
  | { readonly audio_url: string; readonly type: "input_audio" }
  | { readonly encrypted_content: string; readonly type: "encrypted_content" };
export const V2ThreadMetadataUpdateResponse__FunctionCallOutputContentItem = Schema.Union(
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
          Schema.Union([V2ThreadMetadataUpdateResponse__ImageDetail, Schema.Null]),
        ),
        type: Schema.Literal("input_image").annotate({
          title: "InputImageFunctionCallOutputContentItemType",
        }),
        image_url: Schema.String,
      }).annotate({ title: "ImageUrlFunctionCallOutputContentItem" }),
      Schema.Struct({
        detail: Schema.optionalKey(
          Schema.Union([V2ThreadMetadataUpdateResponse__ImageDetail, Schema.Null]),
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
  identifier: "V2ThreadMetadataUpdateResponse__FunctionCallOutputContentItem",
});

export type V2ThreadMetadataUpdateResponse__MemoryCitation = {
  readonly entries: ReadonlyArray<V2ThreadMetadataUpdateResponse__MemoryCitationEntry>;
  readonly threadIds: ReadonlyArray<string>;
};
export const V2ThreadMetadataUpdateResponse__MemoryCitation = Schema.Struct({
  entries: Schema.Array(V2ThreadMetadataUpdateResponse__MemoryCitationEntry),
  threadIds: Schema.Array(Schema.String),
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__MemoryCitation" });

export type V2ThreadMetadataUpdateResponse__CommandAction =
  | {
      readonly command: string;
      readonly name: string;
      readonly path: V2ThreadMetadataUpdateResponse__LegacyAppPathString;
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
export const V2ThreadMetadataUpdateResponse__CommandAction = Schema.Union(
  [
    Schema.Struct({
      command: Schema.String,
      name: Schema.String,
      path: V2ThreadMetadataUpdateResponse__LegacyAppPathString,
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
).annotate({ identifier: "V2ThreadMetadataUpdateResponse__CommandAction" });

export type V2ThreadMetadataUpdateResponse__FileUpdateChange = {
  readonly diff: string;
  readonly kind: V2ThreadMetadataUpdateResponse__PatchChangeKind;
  readonly path: string;
};
export const V2ThreadMetadataUpdateResponse__FileUpdateChange = Schema.Struct({
  diff: Schema.String,
  kind: V2ThreadMetadataUpdateResponse__PatchChangeKind,
  path: Schema.String,
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__FileUpdateChange" });

export type V2ThreadMetadataUpdateResponse__McpAppUi = {
  readonly preferredModelDisplayMode: V2ThreadMetadataUpdateResponse__McpAppDisplayMode;
  readonly resourceUri: string;
};
export const V2ThreadMetadataUpdateResponse__McpAppUi = Schema.Struct({
  preferredModelDisplayMode: V2ThreadMetadataUpdateResponse__McpAppDisplayMode,
  resourceUri: Schema.String,
}).annotate({
  description:
    "UI resource and display preference for model invocations, captured from the tool descriptor.",
  identifier: "V2ThreadMetadataUpdateResponse__McpAppUi",
});

export type V2ThreadMetadataUpdateResponse__CollabAgentState = {
  readonly message?: string | null;
  readonly status: V2ThreadMetadataUpdateResponse__CollabAgentStatus;
};
export const V2ThreadMetadataUpdateResponse__CollabAgentState = Schema.Struct({
  message: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
  status: V2ThreadMetadataUpdateResponse__CollabAgentStatus,
}).annotate({ identifier: "V2ThreadMetadataUpdateResponse__CollabAgentState" });

export type V2ThreadReadResponse__ThreadSection = {
  readonly appearance?: V2ThreadReadResponse__ThreadSectionAppearance | null;
  readonly id: string;
  readonly name: string;
};
export const V2ThreadReadResponse__ThreadSection = Schema.Struct({
  appearance: Schema.optionalKey(
    Schema.Union([V2ThreadReadResponse__ThreadSectionAppearance, Schema.Null]).annotate({
      description: "Optional appearance synchronized across clients.",
    }),
  ),
  id: Schema.String.annotate({
    description: "Opaque UUIDv7 identity that remains stable when the section is renamed.",
  }),
  name: Schema.String.annotate({ description: "The current user-visible section name." }),
}).annotate({
  description: "An independently persisted, user-visible thread section.",
  identifier: "V2ThreadReadResponse__ThreadSection",
});

export type V2ThreadReadResponse__SubAgentSource =
  | "review"
  | "compact"
  | "memory_consolidation"
  | {
      readonly thread_spawn: {
        readonly agent_nickname?: string | null;
        readonly agent_path?: V2ThreadReadResponse__AgentPath | null;
        readonly agent_role?: string | null;
        readonly depth: number;
        readonly parent_thread_id: V2ThreadReadResponse__ThreadId;
      };
    }
  | { readonly other: string };
export const V2ThreadReadResponse__SubAgentSource = Schema.Union(
  [
    Schema.Literals(["review", "compact", "memory_consolidation"]),
    Schema.Struct({
      thread_spawn: Schema.Struct({
        agent_nickname: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        agent_path: Schema.optionalKey(
          Schema.Union([V2ThreadReadResponse__AgentPath, Schema.Null]),
        ),
        agent_role: Schema.optionalKey(Schema.Union([Schema.String, Schema.Null])),
        depth: Schema.Number.annotate({ format: "int32" }).check(
          Schema.isInt().annotate({ expected: "an integer" }),
        ),
        parent_thread_id: V2ThreadReadResponse__ThreadId,
      }),
    }).annotate({ title: "ThreadSpawnSubAgentSource" }),
    Schema.Struct({ other: Schema.String }).annotate({ title: "OtherSubAgentSource" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadReadResponse__SubAgentSource" });

export type V2ThreadReadResponse__ThreadStatus =
  | { readonly type: "notLoaded" }
  | { readonly type: "idle" }
  | { readonly type: "systemError" }
  | {
      readonly activeFlags: ReadonlyArray<V2ThreadReadResponse__ThreadActiveFlag>;
      readonly type: "active";
    };
export const V2ThreadReadResponse__ThreadStatus = Schema.Union(
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
      activeFlags: Schema.Array(V2ThreadReadResponse__ThreadActiveFlag),
      type: Schema.Literal("active").annotate({ title: "ActiveThreadStatusType" }),
    }).annotate({ title: "ActiveThreadStatus" }),
  ],
  { mode: "oneOf" },
).annotate({ identifier: "V2ThreadReadResponse__ThreadStatus" });
