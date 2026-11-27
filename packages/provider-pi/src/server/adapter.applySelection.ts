// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of adapter.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as NodeUtil from "node:util";
import { AgentScope } from "@t3tools/shared/AgentScope";
import { getModelSelectionStringOptionValue } from "@t3tools/shared/model";
import { readToolOutputImage } from "@t3tools/shared/toolOutput";
import { isWorkspaceImagePreviewPath } from "@t3tools/shared/filePreview";
import * as Predicate from "effect/Predicate";
import {
  ProviderDriverKind,
  type ChatAttachment,
  type ModelSelection,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  type OrchestrationV2ProviderRef,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2Subagent,
  type OrchestrationV2TurnItem,
  type OrchestrationV2UserInputQuestion,
  type ProviderApprovalDecision,
  type ProviderInstanceId,
  type MessageId,
  type OrchestrationV2ProviderTurnTokenUsage,
} from "@t3tools/contracts";
import { PiSettings } from "../settings.ts";
import * as Cause from "effect/Cause";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Exit from "effect/Exit";
import * as Scope from "effect/Scope";
import * as Fiber from "effect/Fiber";
import * as Queue from "effect/Queue";
import * as Schema from "effect/Schema";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";

import * as ProviderHost from "@t3tools/provider-core/server/ProviderHost";
import { providerMessageTextWithAttachmentPaths } from "@t3tools/provider-core/server/attachmentPrompt";
import { mcpToolPresentation } from "@t3tools/provider-core/server/mcpToolPresentation";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import { parsePiCompactCommand, type PiCompactCommand } from "./commands.ts";
import { mergeProviderInstanceEnvironment } from "@t3tools/provider-core/server/instanceEnvironment";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  ProviderAdapterDriverCreateError,
  type ProviderAdapterDriver,
  type ProviderAdapterDriverCreateInput,
} from "@t3tools/provider-core/server/adapterDriver";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
} from "@t3tools/provider-core/server/failure";
import { turnScopedSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import {
  findReportedPiModel,
  makePiRpcConnection,
  resolvePiModelSlug,
  piRecordField as recordField,
  piRecordNumber as recordNumber,
  piRecordString as recordString,
  type PiRpcConnection,
  type PiRpcError,
  type PiRpcRecord,
} from "./rpc.ts";
import {
  buildPiRpcLaunch,
  materializePiT3McpExtension,
  resolvePiLaunchArgs,
} from "./mcpInjection.ts";
import { PI_FILE_CHANGE_TOOLS, PI_T3_SERVICE_TIER_COMMAND } from "./mcpExtensionSource.ts";
import { PI_STANDARD_SERVICE_TIER } from "./modelCapabilities.ts";
import { bindHandleSessionEvent } from "./adapter.handleSessionEvent.ts";
import { bindHandleExtensionUiRequest } from "./adapter.handleExtensionUiRequest.ts";
import { bindFinalizeTurn } from "./adapter.finalizeTurn.ts";
import { bindEmitToolItem } from "./adapter.emitToolItem.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindApplySelection = (ctx: any) =>
Effect.fnUntraced(function* (modelSelection: ModelSelection) {
    const {
      PI_INHERIT_MODEL_SLUG,
      PI_PROVIDER,
      PI_THINKING_LEVELS,
      appliedModel,
      appliedThinking,
      baselineModel,
      baselineThinking,
      contextWindow,
      discoverModels,
      discoveredModels,
      emit,
      event,
      id,
      message,
      model,
      modelId,
      models,
      now,
      protocolError,
      provider,
      rememberModelContextWindow,
      request,
      serviceTierMayBeSet,
      sessionEntity,
      to,
      updated
    } = pickScriptcBindCtx(ctx);

        const thinking = getModelSelectionStringOptionValue(modelSelection, "thinking");
        // pi.setModel and /preset can change the model without an RPC event.
        // Confirm cached selections against Pi before skipping them.
        const modelCached =
          modelSelection.model !== PI_INHERIT_MODEL_SLUG && modelSelection.model === appliedModel;
        let modelDrifted = false;
        if (modelCached || (thinking !== undefined && thinking === appliedThinking)) {
          const state = yield* request({ type: "get_state" });
          const stateModel = recordField(state, "model");
          const piModel = `${recordString(stateModel, "provider")}/${recordString(stateModel, "id")}`;
          modelDrifted = modelCached && piModel !== appliedModel;
          appliedThinking = recordString(state, "thinkingLevel") ?? null;
        }
        if (modelSelection.model === PI_INHERIT_MODEL_SLUG) {
          if (appliedModel !== null && baselineModel !== null) {
            const restoredModel = yield* request({ type: "set_model", ...baselineModel });
            appliedThinking = null;
            contextWindow = rememberModelContextWindow(restoredModel);
            appliedModel = null;
            const updatedAt = yield* DateTime.now;
            sessionEntity = { ...sessionEntity, model: PI_INHERIT_MODEL_SLUG, updatedAt };
            yield* emit({
              type: "provider_session.updated",
              driver: PI_PROVIDER,
              providerSession: sessionEntity,
            });
          }
          if (
            thinking === undefined &&
            baselineThinking !== null &&
            appliedThinking !== baselineThinking
          ) {
            yield* request({ type: "set_thinking_level", level: baselineThinking });
            appliedThinking = baselineThinking;
          }
        } else if (modelDrifted || modelSelection.model !== appliedModel) {
          // Extensions and models.json edits can add providers after the first discovery.
          if (findReportedPiModel(modelSelection.model, discoveredModels) === undefined) {
            yield* discoverModels();
          }
          const parsed = resolvePiModelSlug(modelSelection.model, discoveredModels);
          if (parsed === null) {
            return yield* protocolError(
              `Pi model '${modelSelection.model}' must use provider/model format`,
            );
          }
          const selectedModel = yield* request({
            type: "set_model",
            provider: parsed.provider,
            modelId: parsed.modelId,
          });
          // Pi resets thinking to the target model's configured default on set_model.
          appliedThinking = null;
          contextWindow = rememberModelContextWindow(selectedModel);
          appliedModel = modelSelection.model;
          const updatedAt = yield* DateTime.now;
          sessionEntity = { ...sessionEntity, model: modelSelection.model, updatedAt };
          yield* emit({
            type: "provider_session.updated",
            driver: PI_PROVIDER,
            providerSession: sessionEntity,
          });
        }
        if (
          thinking !== undefined &&
          thinking !== appliedThinking &&
          PI_THINKING_LEVELS.has(thinking)
        ) {
          yield* request({ type: "set_thinking_level", level: thinking });
          appliedThinking = thinking;
        }
        const requestedTier = getModelSelectionStringOptionValue(modelSelection, "serviceTier");
        const serviceTier =
          requestedTier === undefined || requestedTier === PI_STANDARD_SERVICE_TIER
            ? null
            : requestedTier;
        if (serviceTier !== null || serviceTierMayBeSet) {
          serviceTierMayBeSet = true;
          const result = yield* request({
            type: "prompt",
            message: `/${PI_T3_SERVICE_TIER_COMMAND} ${serviceTier ?? ""}`.trimEnd(),
          });
          // Pi before 0.99 acknowledges a handled extension command without a disposition.
          const disposition = recordString(result, "disposition");
          if (disposition !== undefined && disposition !== "handled") {
            return yield* protocolError("T3 Code's Pi extension did not apply the service tier");
          }
          serviceTierMayBeSet = serviceTier !== null;
        }
      });
