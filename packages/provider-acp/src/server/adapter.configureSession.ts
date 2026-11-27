// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of adapter.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
import { pickBindCtx } from "./adapter.bindCtx.ts";
// @effect-diagnostics nodeBuiltinImport:off

import {
  type ChatAttachment,
  type ModelSelection,
  type OrchestrationV2ConversationMessage,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2PlanArtifact,
  type OrchestrationV2PlanStep,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderThreadNativeMetadata,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2Subagent,
  type OrchestrationV2TurnItem,
  type OrchestrationV2UserInputQuestion,
  type OrchestrationV2WebSearchResult,
  type ProviderApprovalDecision,
  type ProviderApprovalOption,
  type ProviderInstanceId,
  type ProviderInteractionMode,
  type ProviderDriverKind,
  type ProviderRequestKind,
  type ProviderThreadId,
  type ProviderUserInputAnswers,
  type RuntimeMode,
  type RuntimeRequestId,
  type ThreadTokenUsageSnapshot,
  type ThreadId,
  isRuntimeModeAbove,
  type TurnTokenUsage,
} from "@t3tools/contracts";
import { AgentScope, AgentScopeThreadId } from "@t3tools/shared/AgentScope";
import { parseGrepOutput } from "@t3tools/shared/grepOutput";
import * as HostProcess from "@t3tools/shared/HostProcess";
import { HTML_RENDER_TOOL_NAME } from "@t3tools/shared/htmlRender";
import { modelSelectionsEqual } from "@t3tools/shared/model";
import { type SelfInvocation, selfInvocationArgs } from "@t3tools/shared/nodeRuntime";
import { resolveT3McpToolId } from "@t3tools/shared/t3McpToolPresentation";
import {
  compactDynamicToolOutput,
  compactT3McpToolOutput,
  htmlRenderFromToolItem,
  mcpToolResultOutput,
} from "@t3tools/shared/toolOutput";
import { FILE_HEADERS_ONLY, formatPatch, structuredPatch } from "diff";
import * as Cause from "effect/Cause";
import * as Clock from "effect/Clock";
import * as SecureRandom from "effect/crypto/SecureRandom";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Equal from "effect/Equal";
import * as Exit from "effect/Exit";
import * as FileSystem from "effect/FileSystem";
import * as Fiber from "effect/Fiber";
import * as Option from "effect/Option";
import * as Queue from "effect/Queue";
import * as Ref from "effect/Ref";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as Scope from "effect/Scope";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import * as SubscriptionRef from "effect/SubscriptionRef";
import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";
import * as EffectAcpErrors from "effect-acp/errors";
import type * as EffectAcpProtocol from "effect-acp/protocol";
import type * as EffectAcpSchema from "effect-acp/compat";

import {
  formatReadToolLabel,
  formatSearchToolLabel,
  searchToolLabelParts,
} from "@t3tools/shared/toolActivity";
import { isWorkspaceImagePreviewPath } from "@t3tools/shared/mediaPreview";
import * as ProviderHost from "@t3tools/provider-core/server/ProviderHost";
import { makeAcpMcpOverAcpBridge, type AcpMcpOverAcpBridge } from "./mcpOverAcpBridge.ts";
import { mcpToolPresentation } from "@t3tools/provider-core/server/mcpToolPresentation";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import * as McpProviderSession from "@t3tools/provider-core/server/mcpSession";
import {
  applyAcpAgentTerminalUpdate,
  MAX_AGENT_TERMINAL_OUTPUT_CHARS,
  acpContentBlockDisplayText,
  embeddedTerminalIdsFromSessionUpdate,
  extractMcpToolCallIdentity,
  findModelConfigOption,
  makeAcpUnreadToolCalls,
  mergeToolCallState,
  parsePermissionRequest,
  parseSessionUpdateEvent,
  sessionUpdateIsReplay,
  toolCallVisibleOutputChanged,
  unreadToolCallUpdate,
  withTrackedChangedPaths,
  withUnknownChangedPaths,
  withTrackedPermissionToolCall,
  type AcpPlanUpdate,
  type AcpAgentTerminalState,
  type AcpSessionModeState,
  type AcpToolCallState,
} from "./runtimeModel.ts";
import {
  acpClientExecuteDisposition,
  acpMcpToolApprovalElicitationDisposition,
  acpChangedPathsOfToolCall,
  acpPermissionDisposition,
  mergeAcpChangedPaths,
  type AcpPermissionDisposition,
  makeAcpClientPolicyGrants,
  unknownRecord,
} from "./clientPolicy.ts";
import {
  parseElicitationForm,
  withOptionalChoices,
  type ElicitationQuestionForm,
} from "./elicitationForm.ts";
import {
  makeAcpClientTerminals,
  resolveEmbeddedTerminalContent,
  type AcpClientTerminals,
} from "./clientTerminals.ts";
import {
  ACP_EMPTY_OPTION_VALUE,
  ACP_SESSION_MODE_OPTION_ID,
  flattenSelectChoices,
} from "./sessionConfig.ts";
import * as AcpSessionRuntime from "./AcpSessionRuntime.ts";
import {
  t3AcpPromptWithInstructions,
  type T3AcpInstructionState,
} from "@t3tools/provider-core/server/orchestrationInstructions";
import { buildRuntimeInstructions } from "@t3tools/provider-core/server/runtimeInstructions";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import type * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  type BackgroundWork,
  type BackgroundWorkReport,
  backgroundWorkNotification,
} from "@t3tools/provider-core/server/notification";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
} from "@t3tools/provider-core/server/failure";
import { acpSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import {
  isProviderNativeImageAttachment,
  providerMessageTextWithAttachmentPaths,
} from "@t3tools/provider-core/server/attachmentPrompt";
import {
  makeSubagentChildThread,
  makeSubagentConversationArtifacts,
  subagentThreadTitle,
} from "@t3tools/provider-core/server/subagentProjection";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";

import { AcpModelSelectionError, isAcpPlanModeId } from "./adapter.helpers.ts";

export const bindConfigureSession = (ctx: any): any =>
  Effect.fnUntraced(function* (
    startResult: AcpSessionRuntime.AcpSessionRuntimeStartResult,
    modelSelection: ModelSelection,
    runtimePolicy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
    unsetOptionDefaults: NonNullable<ModelSelection["options"]> = [],
  ) {
    const {
      activeSelection,
      activeSessionSetup,
      configureSession,
      configuredModes,
      configuredRuntimeMode,
      driver,
      flavor,
      nativeBuildConfigurationBySessionId,
      options,
      publishSessionConfiguration,
      readModes,
      runtime,
      validateModelSelection,
    } = pickBindCtx(ctx);

    yield* Ref.set(activeSelection, null);
    yield* validateModelSelection(modelSelection);
    const requestedModel = flavor.resolveModelId?.(modelSelection) ?? modelSelection.model;
    // Invalid params is the agent refusing the value, and the runtime
    // raises the same code when the session's model option does not offer
    // it. Other failures, such as sign-in or a lost connection, keep their
    // own error.
    const rejectedModel = (error: EffectAcpErrors.AcpError) =>
      error._tag === "AcpRequestError" && error.code === -32602
        ? new AcpModelSelectionError({ model: modelSelection.model, cause: error })
        : error;
    let appliedModel: string | undefined;
    if (flavor.applyModelSelection !== undefined) {
      appliedModel = yield* flavor
        .applyModelSelection({
          runtime,
          startResult,
          modelSelection,
        })
        .pipe(Effect.mapError(rejectedModel));
    } else if (requestedModel.length > 0) {
      // Stored catalog choices can expire; explicitly configured custom IDs
      // are validated by the agent instead.
      const isCustomModel = flavor.customModels?.includes(requestedModel) === true;
      const modelOption = findModelConfigOption(yield* runtime.getConfigOptions);
      const modelState = startResult.sessionSetupResult.models;
      if (modelOption?.type === "select") {
        if (
          isCustomModel ||
          flattenSelectChoices(modelOption.options).some(
            (choice) => choice.value === requestedModel,
          )
        ) {
          yield* runtime
            .setConfigOption(modelOption.id, requestedModel, {
              resendCurrentValue: flavor.alwaysSetModel === true,
            })
            .pipe(Effect.mapError(rejectedModel));
          appliedModel = requestedModel;
        }
      } else if (
        modelState != null &&
        (isCustomModel ||
          modelState.availableModels.some((model) => model.modelId === requestedModel))
      ) {
        if (modelState.currentModelId !== requestedModel) {
          yield* runtime.setSessionModel(requestedModel).pipe(Effect.mapError(rejectedModel));
        }
        appliedModel = requestedModel;
      }
    }
    if (appliedModel !== undefined) {
      const applied = appliedModel;
      yield* Ref.update(activeSessionSetup, (setup) => {
        if (setup === null) {
          return setup;
        }
        const models = setup.sessionSetupResult.models;
        if (models == null || models.currentModelId === applied) {
          return setup;
        }
        return {
          ...setup,
          sessionSetupResult: {
            ...setup.sessionSetupResult,
            models: { ...models, currentModelId: applied },
          },
        };
      });
    }
    const configOptions = yield* runtime.getConfigOptions;
    // A picked mode applies only when the flavor places it within the bound; an unknown mode
    // could be the agent's own skip-approval mode. Modes known to be permission levels are
    // also bounded by the thread's runtime mode, so model options cannot widen it.
    const ceiling =
      flavor.runtimeModeForSessionMode === undefined ||
      (runtimePolicy.maxRuntimeMode !== undefined &&
        isRuntimeModeAbove(runtimePolicy.runtimeMode, runtimePolicy.maxRuntimeMode))
        ? runtimePolicy.maxRuntimeMode
        : runtimePolicy.runtimeMode;
    const isModeChoice = (id: string) =>
      id === ACP_SESSION_MODE_OPTION_ID ||
      configOptions.some(
        (option) =>
          option.id === id &&
          (option.category === "mode" || option.category === "collaboration_mode"),
      );
    const withinCeiling = (selection: { readonly id: string; readonly value: unknown }) => {
      if (ceiling === undefined || ceiling === "full-access" || !isModeChoice(selection.id)) {
        return true;
      }
      const granted =
        typeof selection.value === "string"
          ? flavor.runtimeModeForSessionMode?.(selection.value)
          : undefined;
      return granted !== undefined && !isRuntimeModeAbove(granted, ceiling);
    };
    const explicitSelections = modelSelection.options ?? [];
    const implicitSelections = unsetOptionDefaults.filter(
      (implicit) => !explicitSelections.some((selection) => selection.id === implicit.id),
    );
    const optionSelections = [...explicitSelections, ...implicitSelections].flatMap((selection) => {
      if (flavor.ownedModelOptionIds?.includes(selection.id) === true) return [];
      if (!withinCeiling(selection)) return [];
      return [selection.value === ACP_EMPTY_OPTION_VALUE ? { ...selection, value: "" } : selection];
    });
    const availableConfigIds = new Set(configOptions.map((option) => option.id));
    const hasNativeConfigWithSyntheticModeId = availableConfigIds.has(ACP_SESSION_MODE_OPTION_ID);
    const modeSelection = hasNativeConfigWithSyntheticModeId
      ? undefined
      : optionSelections.find((selection) => selection.id === ACP_SESSION_MODE_OPTION_ID);
    const configSelections = hasNativeConfigWithSyntheticModeId
      ? optionSelections
      : optionSelections.filter((selection) => selection.id !== ACP_SESSION_MODE_OPTION_ID);
    // Probe descriptors union models; skip options absent from the live session and use agent defaults.
    const unsupportedConfigIds = configSelections
      .map((selection) => selection.id)
      .filter((id) => !availableConfigIds.has(id));
    if (unsupportedConfigIds.length > 0) {
      yield* Effect.logWarning("ACP session does not expose requested configuration option(s)", {
        driver,
        sessionId: startResult.sessionId,
        optionIds: unsupportedConfigIds,
      });
    }
    for (const selection of configSelections) {
      if (!availableConfigIds.has(selection.id)) continue;
      // Advertised values union models; skip per-model rejections instead of failing session open.
      const option = configOptions.find((candidate) => candidate.id === selection.id);
      if (option !== undefined && option.type === "select" && typeof selection.value === "string") {
        const advertisedValues = option.options.flatMap((entry) =>
          "value" in entry ? [entry.value] : entry.options.map((choice) => choice.value),
        );
        if (!advertisedValues.includes(selection.value)) continue;
      }
      yield* runtime.setConfigOption(selection.id, selection.value).pipe(
        Effect.catchTags({
          AcpRequestError: (error) =>
            error.code === -32602
              ? Effect.logWarning("ACP session rejected a configuration option value", {
                  optionId: selection.id,
                  value: selection.value,
                  detail: error.message,
                })
              : Effect.fail(error),
        }),
      );
    }
    for (const selection of flavor.sessionConfigForPolicy?.(runtimePolicy) ?? []) {
      const option = (yield* runtime.getConfigOptions).find(
        (candidate) => candidate.id === selection.id,
      );
      if (option?.type !== "select" || option.currentValue === selection.value) continue;
      const advertisedValues = option.options.flatMap((entry) =>
        "value" in entry ? [entry.value] : entry.options.map((choice) => choice.value),
      );
      if (!advertisedValues.includes(selection.value)) continue;
      yield* runtime.setConfigOption(selection.id, selection.value);
    }
    const policyMode = flavor.sessionModeForPolicy?.(runtimePolicy);
    const modeLocked = flavor.lockSessionModeToPolicy && policyMode !== undefined;
    if (policyMode !== undefined) {
      yield* runtime.setMode(policyMode);
    }
    const modeState = yield* runtime.getModeState;
    if (
      !modeLocked &&
      modeSelection !== undefined &&
      typeof modeSelection.value === "string" &&
      modeState?.availableModes.some((mode) => mode.id === modeSelection.value) === true &&
      modeState.currentModeId !== modeSelection.value
    ) {
      yield* runtime.setMode(modeSelection.value);
    }
    const effectiveModeState = yield* runtime.getModeState;
    const effectiveConfigOptions = yield* runtime.getConfigOptions;
    const planSensitiveOptions = effectiveConfigOptions.filter(
      (
        option,
      ): option is Extract<EffectAcpSchema.SessionConfigOption, { readonly type: "select" }> =>
        option.type === "select" &&
        (option.category === "mode" || option.category === "collaboration_mode"),
    );
    if (runtimePolicy.interactionMode === "plan") {
      if (!nativeBuildConfigurationBySessionId.has(startResult.sessionId)) {
        nativeBuildConfigurationBySessionId.set(startResult.sessionId, {
          ...(effectiveModeState === undefined ? {} : { modeId: effectiveModeState.currentModeId }),
          configOptions: planSensitiveOptions.map((option) => ({
            id: option.id,
            value: option.currentValue,
          })),
        });
      }
      const planMode = effectiveModeState?.availableModes.find((mode) => isAcpPlanModeId(mode.id));
      if (planMode !== undefined && effectiveModeState?.currentModeId !== planMode.id) {
        yield* runtime.setMode(planMode.id);
      }
      for (const option of planSensitiveOptions) {
        const choices = option.options.flatMap((entry) =>
          "value" in entry ? [entry.value] : entry.options.map((choice) => choice.value),
        );
        const requested = choices.find(isAcpPlanModeId);
        if (requested !== undefined && option.currentValue !== requested) {
          yield* runtime.setConfigOption(option.id, requested);
        }
      }
    } else {
      const nativeBuild = nativeBuildConfigurationBySessionId.get(startResult.sessionId);
      if (nativeBuild !== undefined) {
        if (
          policyMode === undefined &&
          nativeBuild.modeId !== undefined &&
          effectiveModeState?.currentModeId !== nativeBuild.modeId &&
          effectiveModeState?.availableModes.some((mode) => mode.id === nativeBuild.modeId) === true
        ) {
          yield* runtime.setMode(nativeBuild.modeId);
        }
        for (const saved of nativeBuild.configOptions) {
          const option = effectiveConfigOptions.find(
            (candidate) => candidate.type === "select" && candidate.id === saved.id,
          );
          if (
            option === undefined ||
            option.type !== "select" ||
            (policyMode !== undefined && option.category === "mode")
          )
            continue;
          const choices = option.options.flatMap((entry) =>
            "value" in entry ? [entry.value] : entry.options.map((choice) => choice.value),
          );
          if (option.currentValue !== saved.value && choices.includes(saved.value)) {
            yield* runtime.setConfigOption(option.id, saved.value);
          }
        }
        nativeBuildConfigurationBySessionId.delete(startResult.sessionId);
      }
    }
    yield* validateModelSelection(modelSelection);
    yield* Ref.set(configuredModes, yield* readModes);
    yield* Ref.set(configuredRuntimeMode, runtimePolicy.runtimeMode);
    yield* publishSessionConfiguration(runtime);
  });
